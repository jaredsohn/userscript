// ==UserScript==
// @name           Livejournal - Show Subject Field
// @namespace      http://userscripts.org/scripts/show/122252
// @description    Shows subject field in Livejournal's new default comment pages.
// @include        http://*.livejournal.com/*
// @version        0.3
// ==/UserScript==

(function() {
  if (document.getElementById("tmpl-updateform-link")) {
    var snapHidden = document.evaluate("//input[@name='subject']",
		   document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	   for (var i = snapHidden.snapshotLength - 1; i >= 0; i--) {
		   var subField = snapHidden.snapshotItem(i);
		   subField.type = 'text';
		   subField.title = 'enter your subject here';
                   subField.style.padding = "2px";
                   subField.style.fontSize = "14px";  
                   subField.style.width = "430px"; // I used 430px here and no bigger to keep things from looking too borked in squished comments
		   subField.style.marginBottom = "10px";} 

var subj = document.createElement("div");
subj.innerHTML = "Subject: ";
subj.title = 'subject field';
subj.style.display = "inline" ;
subj.style.marginLeft = "13px" ;
subField.parentNode.insertBefore(subj,subField);

var css = ".b-watering-wrapper { position: relative !important; }\ .b-watering-wrapper div[title=\"subject field\"] { margin-left: 142px !important; }\ .b-watering-wrapper .b-watering-aside { position: relative !important; top: -30px !important;}"
        if (typeof GM_addStyle != "undefined") {
            GM_addStyle(css);
        } else if (typeof PRO_addStyle != "undefined") {
            PRO_addStyle(css);
        } else if (typeof addStyle != "undefined") {
            addStyle(css);
        } else {
            var heads = document.getElementsByTagName("head");
            if (heads.length > 0) {
                var node = document.createElement("style");
                node.type = "text/css";
                node.appendChild(document.createTextNode(css));
                heads[0].appendChild(node);
            }
        }
    }
}());