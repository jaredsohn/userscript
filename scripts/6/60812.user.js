// ==UserScript==
// @name          	Gmail | Minimalistic

// @namespace		

// @author			Ron Troyer
// @authorWebsite	http://www.ronaldtroyer.com

// @description		Makes gmail much more minimal, yet leaves most core features
// @version			1.0


// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @include       http://*.mail.google.com/*
// @include       https://*.mail.google.com/*
// ==/UserScript==
(function() {
var css  = ".ar.as,\n\n\n";
css		+= ".hR,\n\n\n";
css		+= ".gfqccc>div>div>div:first-child+div,\n\n";
css		+= ".nH.l2.ov,\n\n";
css		+= "a.gb1.qq, a.gb3.qq,\n\n";
css		+= ".a9,\n\n";
css		+= ".z .AP, \n\n";
css 	+= ".nH.qj > div > div:first-child + div,";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV + DIV > DIV:first-child > TABLE TR > TD + TD > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV, \n\n";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV:first-child, \n\n";
css		+= "HTML > BODY > DIV > DIV + DIV > DIV > TABLE > TR > TD + TD > DIV + DIV > DIV > DIV + DIV + DIV + DIV, \n\n"; 
css		+= "HTML > BODY > DIV:first-child > DIV:last-child > DIV > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV > DIV > DIV:first-child + DIV > DIV > DIV > DIV > DIV > DIV:last-child > DIV:last-child > DIV > DIV:first-child > DIV > DIV:first-child > DIV > DIV:first-child + DIV + DIV,\n\n";
css		+= "HTML > BODY > DIV:first-child > DIV:last-child > DIV > DIV:last-child > DIV:first-child > DIV:first-child + DIV + DIV > DIV:first-child > DIV > DIV > DIV:first-child + DIV > DIV > DIV > DIV > DIV > DIV:last-child > DIV:last-child > DIV > DIV:last-child > DIV > DIV:first-child > DIV > DIV:first-child + DIV + DIV\n\n";
css		+= "{display:none !important;}\n\n\n";

css		+= ".mq \n\n";
css		+= "{visibility: hidden; position: absolute; left: -5000px;}\n\n";

css		+= ".N2mZ7b .v0AEPd,.fXNan,#tb tr td.v,.N2mZ7b .n1QcP,.N6cuDc,#tb tr td.t,.AVVDK,.cvoL6c,.qOu2eb,.PnCCYc,.p9zbT,.Kyw04d,.E88Nbb,.lIBrUb,.VzWY9c,.W4Hanb,.E2xfzc, .y4 img, .r2 img, .lHQn1d img, .lHQn1d img \n\n"
css		+= "{ background-image: none!important; }\n\n";

css		+= "HTML > BODY > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV + DIV > DIV:first-child > DIV + DIV > DIV + DIV > DIV:first-child > DIV + DIV > DIV:first-child \n\n";
css		+= "{position: absolute; top: -8px; left: 75px;}\n\n";

css		+= "input.bQ \n\n";
css		+= "{width: 175px;}";

css		+= ".qp \n\n"
css		+= "{height: 30px}\n\n";

css		+= "HTML > BODY > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > DIV:first-child > DIV + DIV > DIV:first-child > DIV:first-child > NOBR > B \n\n";
css		+= "{background-image:url(http://mail.google.com/mail/images/favicon.ico); background-repeat:no-repeat; line-height:25px; padding-left:20px;}\n\n";
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
})();
