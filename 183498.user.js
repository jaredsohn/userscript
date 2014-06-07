// ==UserScript==
// @name       13/01 SWISS Facebook Login   -> OSX/Ubuntu/Windows
// @namespace  http://userstyles.org
// @description	  <b>!NEW!</b><br>
// @author        wawi_exe
// @homepage      http://userstyles.org/styles/84359
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
    var css = ".fbIndex { \n    background-image: url('http://data2.whicdn.com/images/86991839/large.jpg') !important;\n    background-position:0px -109px !important;\n    background-attachment: fixed !important; \n    background-color: rgba(255,255,255,0) !important }\n\n\n.fbIndex #globalContainer #dropmenu_container,\n.fbIndex #globalContainer #content,\n.fbIndex #globalContainer #pageFooter { display: none !important }\n\n\n.fbIndex .loggedout_menubar_container {\n  position: fixed !important;\n  width: 420px !important;\n  height: 140px !important;\n  min-width: 0 !important;\n  top: 50% !important;\n  left: 50% !important;\n  margin-top: 0px !important;\n  margin-left: -210px !important;\n  z-index: -1 !important;\n\n}\n\n\n\n.fbIndex .loggedout_menubar_container .sp_69c1xs,\n.fbIndex .loggedout_menubar_container .rfloat,\n.fbIndex .loggedout_menubar_container .lfloat,\n.fbIndex .loggedout_menubar_container .lfloat i,\n.fbIndex .loggedout_menubar_container .lfloat img {\n    display: block !important;\n    float: none !important;\n    width: auto !important;\n}\n.fbIndex .loggedout_menubar_container .rfloat{\n    margin: 0px -5px 0px !important;\n}\n.fbIndex .loggedout_menubar_container .lfloat{\n    margin: -10px 10px 0px !important;}\n\n\n.fbIndex .loggedout_menubar_container{\n    background-color: rgba(59,89,152,.5) !important;\n    color: rgba(0,0,0,1) !important;\n}\n.fbIndex .menu_login_container .html7magic label,\n.fbIndex .menu_login_container .login_form_label_field a,\n.fbIndex .menu_login_container .login_form_label_field label{\n    color: rgba(255,255,255,1) !important;\n    \n}\n\n\n\n#SetAsHomepage_Callout {\n  display: none;\n}\n\n\n\n.fbIndex div#blueBar {\n  z-index: 0 !important;\n  border: none !important;\n  box-shadow: none !important;\n}";
    if (typeof GM_addStyle != "black") {
        GM_addStyle(css);
    } else if (typeof PRO_addStyle != "red") {
        PRO_addStyle(css);
    } else if (typeof addStyle != "undefined") {
        addStyle(css);
    } else {
        var node = document.createElement("style");
        node.type = "text/css";
        node.appendChild(document.createTextNode(css));
        var heads = document.getElementsByTagName("head");
        if (heads.length > 0) {
            heads[0].appendChild(node); 
        } else {
            // no head yet, stick it whereever
            document.documentElement.appendChild(node);
        }
    }
})();
