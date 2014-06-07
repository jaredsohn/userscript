// ==UserScript==
// @name           NetError: Check your router
// @namespace      http://zoolcar9.lhukie.net/greasemonkey
// @include        *
// @description    Add link to your router on Firefox error page
// ==/UserScript==

({
  get isNetError() {
    return document.URL.indexOf("about:neterror") == 0;
  },

  get errorType() {
    return document.URL.substring(17).match(/\w+/).toString();
  },

  get routerIP() {
    return GM_getValue("router_ip", "192.168.1.1");
  },

  setRouterIP: function() {
    var ip = prompt("Your router IP", this.routerIP);
    if (!ip) return;
    GM_setValue("router_ip", ip);
  },

  openRouter: function(aEvent) {
    aEvent.preventDefault();
    GM_openInTab(aEvent.target.href);
  },

  addRouterLink: function(aNode) {
    var link = aNode.appendChild(document.createElement("a"));
    link.href = "http://"+ this.routerIP + "/";
    link.textContent = "Check your router";
    link.addEventListener("click", this.openRouter, false);
  },

  init: function() {
    if (!document.URL) return;

    var netError = this;
    GM_registerMenuCommand("Set your router IP", function() {
      netError.setRouterIP();
    })

    if (!this.isNetError || (this.errorType == "netOffline")) return;

    var div = document.getElementById("errorLongDesc");
    var msg = div.getElementsByTagNameNS("http://www.w3.org/1999/xhtml",
                                         "ul")[0];
    if (msg) {
      var item = msg.appendChild(document.createElement("li"));
      this.addRouterLink(item);
    } else {
      msg.appendChild(document.createTextNode("\n"));
      this.addRouterLink(msg);
    }
  }

}).init()