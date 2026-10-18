/* Ignite Your Flare — tracking setup
   This is the ONLY file you edit to turn on tracking. It loads after the page is
   visible, so it never slows the first paint.

   1. GA4: paste your Measurement ID (looks like G-ABC123XYZ) between the quotes.
   2. Google Ads: paste your conversion ID (looks like AW-123456789) if you use one.
   Leave a value blank to switch that tag off. */

var IYF_GA4_ID = "";        // e.g. "G-ABC123XYZ"
var IYF_GOOGLE_ADS_ID = ""; // e.g. "AW-123456789"

(function () {
  var first = IYF_GA4_ID || IYF_GOOGLE_ADS_ID;
  if (!first) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { dataLayer.push(arguments); };
  gtag("js", new Date());
  if (IYF_GA4_ID) gtag("config", IYF_GA4_ID);
  if (IYF_GOOGLE_ADS_ID) gtag("config", IYF_GOOGLE_ADS_ID);
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + first;
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
