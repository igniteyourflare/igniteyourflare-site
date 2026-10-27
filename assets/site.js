/* Ignite Your Flare — tracking setup
   This is the ONLY file you edit to turn on tracking. It loads after the page is
   visible, so it never slows the first paint.

   1. GA4: paste your Measurement ID (looks like G-ABC123XYZ) between the quotes.
   2. Google Ads: paste your conversion ID (looks like AW-123456789) if you use one.
   Leave a value blank to switch that tag off. */

var IYF_GA4_ID = "G-Y3RP7TK56Z";        // e.g. "G-ABC123XYZ"
var IYF_GOOGLE_ADS_ID = "AW-972924998"; // e.g. "AW-123456789"
var IYF_TAG_GATEWAY_PATH = "/nnbh"; // Google tag gateway measurement path in Cloudflare (blank = load from Google)
var IYF_META_PIXEL_ID = "511726753214490"; // Meta (Facebook/Instagram) Pixel — blank = off

/* Cookie consent (Google Consent Mode v2).
   US opt-out model: tags run unless the visitor declines or their browser sends
   Global Privacy Control (GPC), which we treat as an opt-out of ad cookies. */
var IYF_CONSENT_KEY = "iyf_consent"; // "all" | "essential"

function iyfGetConsent() { try { return localStorage.getItem(IYF_CONSENT_KEY); } catch (e) { return null; } }
function iyfConsentState(choice) {
  var gpc = !!navigator.globalPrivacyControl;
  var ads = choice === "essential" || gpc ? "denied" : "granted";
  var analytics = choice === "essential" ? "denied" : "granted";
  return { ad_storage: ads, ad_user_data: ads, ad_personalization: ads, analytics_storage: analytics };
}

(function () {
  var first = IYF_GOOGLE_ADS_ID || IYF_GA4_ID; // gateway is set up for the Ads tag
  if (!first) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("consent", "default", iyfConsentState(iyfGetConsent()));
  gtag("js", new Date());
  if (IYF_GA4_ID) gtag("config", IYF_GA4_ID);
  if (IYF_GOOGLE_ADS_ID) gtag("config", IYF_GOOGLE_ADS_ID);
  // Load through Google tag gateway (first-party path on Cloudflare); fall back to Google if it fails.
  var s = document.createElement("script");
  s.async = true;
  s.src = IYF_TAG_GATEWAY_PATH ? IYF_TAG_GATEWAY_PATH + "/?id=" + first : "https://www.googletagmanager.com/gtag/js?id=" + first;
  s.onerror = function () {
    var f = document.createElement("script"); f.async = true;
    f.src = "https://www.googletagmanager.com/gtag/js?id=" + first; document.head.appendChild(f);
  };
  document.head.appendChild(s);

  // Count taps on phone, text and email links as GA4 events.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href");
    var kind = h.indexOf("tel:") === 0 ? "call" : h.indexOf("sms:") === 0 ? "text" : h.indexOf("mailto:") === 0 ? "email" : null;
    if (kind) gtag("event", "contact_" + kind, { link_url: h });
  });
})();

/* Meta Pixel — follows the same cookie choice: off if the visitor declines or sends GPC. */
function iyfAdsAllowed() { return iyfConsentState(iyfGetConsent()).ad_storage === "granted"; }
(function () {
  if (!IYF_META_PIXEL_ID) return;
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
  fbq("consent", iyfAdsAllowed() ? "grant" : "revoke");
  fbq("init", IYF_META_PIXEL_ID);
  fbq("track", "PageView");
  if (location.pathname.replace(/\/$/, "") === "/thank-you") fbq("track", "Lead");
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var h = a.getAttribute("href");
    if (/^(tel|sms|mailto):/.test(h)) fbq("track", "Contact");
  });
})();

/* Cookie banner + "Cookie settings" link (any element with data-cookie-settings). */
(function () {
  function save(choice) {
    try { localStorage.setItem(IYF_CONSENT_KEY, choice); } catch (e) {}
    if (window.gtag) gtag("consent", "update", iyfConsentState(choice));
    if (window.fbq) fbq("consent", iyfConsentState(choice).ad_storage === "granted" ? "grant" : "revoke");
    var b = document.getElementById("iyf-cookie"); if (b) b.remove();
  }
  function show() {
    if (document.getElementById("iyf-cookie")) return;
    var gpc = navigator.globalPrivacyControl ? '<p class="ck-gpc">Your browser sent a Global Privacy Control signal, so ad cookies are already off.</p>' : "";
    var d = document.createElement("div");
    d.id = "iyf-cookie"; d.className = "cookie-bar"; d.setAttribute("role", "dialog"); d.setAttribute("aria-label", "Cookie choices");
    d.innerHTML = '<div class="ck-text"><strong>Cookies on this site</strong><p>We use cookies to see how families use our site and to measure our ads. You can accept them or keep only what the site needs to work. <a href="/about/privacy-policy#cookies">Privacy Policy</a></p>' + gpc + '</div>' +
      '<div class="ck-btns"><button type="button" class="btn btn-ghost btn-small" data-c="essential">Decline</button><button type="button" class="btn btn-primary btn-small" data-c="all">Accept</button></div>';
    d.addEventListener("click", function (e) { var c = e.target.getAttribute && e.target.getAttribute("data-c"); if (c) save(c); });
    document.body.appendChild(d);
  }
  function init() {
    if (!iyfGetConsent()) show();
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-cookie-settings]");
      if (t) { e.preventDefault(); show(); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
