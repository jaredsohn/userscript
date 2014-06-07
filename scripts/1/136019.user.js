// ==UserScript==
// @name           4.GB HV - Orders
// @namespace      Drvinjez
// @version        1.10
// @date           2012-06-13
// @description    eRepublik orders for 4.GB HV 
// @include        *.erepublik.com/*
// ==/UserScript==

var address = 'http://tiny.cc/4GB_Orders';            

var footer = document.getElementById('footer');
if  (footer) {
    var quicklinks = document.createElement("div");
    quicklinks.style.position = "absolute";
	quicklinks.style.left = "10px";
	quicklinks.style.top = "500px";
    quicklinks.innerHTML = '<div class="" id="sidebar_missions"><p style="color:#ffffff; margin: 2px 0 1px 0; padding-top:7px; padding-bottom:7px;">' + 
    '<div style="float:center; width:265px; color: #ffffff; padding-top: 0px; text-align:center; font-size: 16px; text-shadow: 0 0 24px #C00, 0 0 4px #C00, 1px 1px 2px #333;">' + 
         '<b>4.GB HV PAUCI - ZAPOVIJEDI:</b><a href="http://www.erepublik.com/en/main/group-show/548"><b> >>></b></ a><br/>' + 
         '<iframe src="' + address + '" width="265" height="300" frameborder="1" allowTransparency="true" scrolling="auto"></iframe><br />' + 
		 '<div style="float:right; color: #666666; padding-top: 0px; padding-left: 0px; font-size: 8px; text-shadow : 0.0em 0.0em;">' +
		 '<a href="http://www.erepublik.com/en/citizen/profile/3514765">2012 by Drvinjez</ a><br/>' +
	'</div>' + 
    '</div>';
    document.body.insertBefore(quicklinks, document.body.firstChild);
	footer.parentNode.removeChild(footer);

}