// ==UserScript==
// @name       Lighthouse reply
// @match      *://*.lighthouseapp.com/projects/*/tickets/*
// ==/UserScript==

var parent = null;
var url = document.location.href.replace(/#.*/, "");

new Ajax.Request(url + '.json', {
  method: "GET",
    contentType: "application/json",
    requestHeaders: { "Accept": "application/json" },
    onSuccess: function(data) {
      var versions = data.responseJSON.ticket.versions;

      for (var i=0; i < versions.length; i++) {
        var v = versions[i];

        if (i == 0) {
          parent = $$("#page-top .greet.clear")[0];
        } else {
          parent = $("ticket-"+v.number+"-"+v.version);
        }

        if (v.body && v.body.length > 0) {
          var body = v.body.replace(/^/gm,"> ");
          var a = document.createElement('a');
          a.appendChild(document.createTextNode("Reply"));
          a.setAttribute("href", "#");
          a.setStyle({
            "display": "block",
            "text-align": "right"
          });
          a.observe("click", (function() {
            $("ticket-body").setValue(this);
            return false;
          }).bind(body));
          parent.appendChild(a);
        }
      }
    }
});
