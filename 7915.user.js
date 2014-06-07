// ==UserScript==
// @name          ImageShack Proxification
// @namespace     http://loucypher.wordpress.com/
// @include       *
// @description	  Replace ImageShack images and links to a proxy server
// ==/UserScript==

/* Changelog:
 * 2007-03-22: cleaned up, added more proxies
 * 2007-03-19: added Proxy Doll
 * 2007-03-13: GM_registerMenuCommand
 * 2007-03-12: first init
 */


GM_registerMenuCommand("ImageShack Proxification", function() {
  var num = imgShack.proxy;
  var msg = "Enter number (0-9)\n" +
            "0 - Coral CDN (default)\n" +
            "1 - Anonymouse\n" +
            "2 - ProxyMod\n" +
            "3 - Proxy Doll\n" +
            "4 - ProxyJoy\n" +
            "5 - Proxyretro\n" +
            "6 - Proxybowl\n" +
            "7 - Proxyds\n" +
            "8 - ByPassLink\n" +
            "9 - SpecterSurf";
  var proxy = prompt(msg, num, "ImageShack Proxification");
  if (!proxy || !proxy.match(/\d/) || proxy < 0 || proxy > 9) return;
  imgShack.setProxy(parseInt(proxy));
});


var imgShack = {
  get prefBranch() {
    return "imageshack.proxyServer";
  },

  get proxy() {
    return GM_getValue(this.prefBranch, 0);
  },

  setProxy: function(aNum) {
    GM_setValue(this.prefBranch, aNum);
  },

  isLink: function(aImage) {
    return aImage.parentNode &&
           aImage.parentNode.nodeName.toLowerCase() == "a" &&
           aImage.parentNode.hasAttribute("href") &&
           aImage.parentNode.href.indexOf("imageshack.us") >= 0;
  },

  nphProxy: function(aDomain, aURL, aLang, aDir) {
    return "http://" + aDomain + (aDir ? aDir : "") +
           "/nph-proxy." + aLang +
           "/111100A/" + aURL.replace(/\:\/\//, "/");
  },

  proxify: function(aURL) {
    var proxy_server = this.proxy;

    switch(proxy_server) {
      case 1:
        return "http://anonymouse.org/cgi-bin/anon-www.cgi/" + aURL;
      case 2:
        return this.nphProxy("proxymod.com", aURL, "cgi", "/cgi-bin");
      case 3:
        return "http://proxydoll.com/index.php?hl=3e5&q=" +
                 encodeURIComponent(aURL);
      case 4:
        return this.nphProxy("proxyjoy.com", aURL, "pl",
                             "/cgi-bin/cgiproxy");
      case 5:
        return this.nphProxy("proxyretro.com", aURL, "pl",
                             "/cgi-bin/cgiproxy");
      case 6:
        return this.nphProxy("proxybowl.com", aURL, "pl",
                             "/cgi-bin/cgiproxy");
      case 7:
        return this.nphProxy("proxyds.com", aURL, "pl",
                             "/cgi-bin/cgiproxy");
      case 8:
        return this.nphProxy("bypasslink.com", aURL, "pl");
      case 9:
        return this.nphProxy("spectersurf.com", aURL, "pl");
      default:
        return aURL.replace(/imageshack\.us/,
                            "imageshack.us.nyud.net:8080");
    }
    return null;
  }
}


var xpath = "//img[contains(@src, 'imageshack.us')]";
var imgs = document.evaluate(xpath, document, null, 6, null);

if (!imgs.snapshotLength) return;

for (var i = 0; i < imgs.snapshotLength; i++) {
  var img = imgs.snapshotItem(i);
  img.src = imgShack.proxify(img.src);
  if (imgShack.isLink(img)) {
    img.parentNode.href = imgShack.proxify(img.parentNode.href);
  }  
}

