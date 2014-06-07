// ==UserScript==
// @name       Fancy redditp
// @namespace  http://userscripts.org/users/538894
// @version    0.21
// @description  A fancy alternative skin for redditp
// @copyright  2013+, R.S.
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.js
// @include       http://redditp.com/*
// @include       https://redditp.com/*
// @include       http://*.redditp.com/*
// @include       https://*.redditp.com/*
// @grant         GM_addStyle
// ==/UserScript==
(function() {
    var css = ['body {color:#111; font-family: "Volkhov", "Times New Roman";}',
               '.navbox {opacity: 1; background-color: rgba(255,255,255,1); overflow: visible; box-shadow: 2px 0px 2px rgba(0,0,0,0.3); min-height: 40px; padding: 10px 0;}',
               '.collapser {font-family: sans-serif; border: none; color:#111; text-align: center; vertical-align: middle; line-height: 40px; width: 20px; height: 40px; background-color: #fff; margin-right: -41px; border-radius: 0 10px 10px 0;}',
               '.navbox h2 {font: italic 20px "Volkhov", "Times New Roman"; color:#111; padding: 0 20px; line-height:40px; max-height: 140px; overflow-y: auto;}',
               '.prevArrow {opacity: 0.1; border-left: 10px solid transparent; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-right: 30px solid white; border-radius: 3px;}',
               '.nextArrow {opacity: 0.1; border-right: 10px solid transparent; border-top: 20px solid transparent; border-bottom: 20px solid transparent; border-left: 30px solid white; border-radius: 3px;}',
               '.prevArrow:hover {opacity: 1;}',
               '.nextArrow:hover {opacity: 1;}',
               '[data-openstate=closed].collapser {opacity: 0.1;}',
               '[data-openstate=open].collapser {opacity: 0.3;}',
               '.collapser:hover {opacity: 1; background-color: #fff; color:#111}',
               '.nbmenu {font-family: "Volkhov", "Times New Roman";}',
               '.numberButton {color:#111; font-family: "Volkhov", "Times New Roman";}',
               '.numberButtonList ul li a:hover {color:#111; background-color: #fff;}',
               '.numberButtonList ul li a.active {color:#16d; background-color: #fff;}',
               'a {color: #138;}',
               '.hideBtns {visibility: hidden;}'
              ].join('\n');
    
    if (typeof GM_addStyle != "undefined") {
    	GM_addStyle(css);
    } else if (typeof PRO_addStyle != "undefined") {
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
    };

    $("html").keypress(function( e ){
        var code = e.keyCode || e.which;
        
        if(code == 104) {
            if ($("#prevButton, #nextButton, .collapser").hasClass("hideBtns")) {
                $("#prevButton, #nextButton, .collapser").removeClass("hideBtns");
            } else {
                $("#prevButton, #nextButton, .collapser").addClass("hideBtns");
            }
        }
    });

})();
