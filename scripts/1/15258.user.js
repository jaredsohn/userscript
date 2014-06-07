// ==UserScript==
// @name          former orkut
// @namespace     Rodrigo Wilasco
// @description	  The former colors
// @author        Rodrigo Wilasco
// @homepage      Rodrigo Wilasco

// ==/UserScript==
var css = "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Strict//EN\" \"http://www.w3.org/TR/xhtml2/DTD/xhtml1-strict.dtd\"> <html xmlns=\"http://www.w3.org/1999/xhtml\" xml:lang=\"en\"> <head> <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" /> <title> Stu Nicholls | CSSplay | Professional series #8</title> <style type=\"text/css\"> /*Credits: CSSpplay */ /*URL: http://www.cssplay.co.uk/menus/pro_eight */ .pro8 {padding:0 0 0 32px; margin:0; list-style:none; height:25px; background:#fff url(pro_eight_back.gif); position:relative; border:1px solid #000; border-width:0 1px 1px 1px; border-bottom-color:#444;} .pro8 li {float:left;} .pro8 li a {display:block; float:left; height:25px; line-height:23px; background:url(pro_eight_0.gif); color:#fff; text-decoration:none; font-size:11px; font-family:arial, verdana, sans-serif; font-weight:bold; text-align:center; padding:0 0 0 12px; cursor:pointer;} .pro8 li a b {float:left; display:block; padding:0 12px 0 0; background:url(pro_eight_0.gif) right top;} .pro8 li.current a {color:#fff; background:url(pro_eight_2.gif);} .pro8 li.current a b {background:url(pro_eight_2.gif) right top;} .pro8 li a:hover {color:#000; background:url(pro_eight_1.gif);} .pro8 li a:hover b {background:url(pro_eight_1.gif) right top;} .pro8 li.current a:hover {color:#fff; background:url(pro_eight_2.gif); cursor:default;} .pro8 li.current a:hover b {background:url(pro_eight_2.gif) right top;} </style> </head> <body> <ul class=\"pro8\"> <li><a href=\"3\"><b>Home</b></a></li> <li><a href=\"F\"><b>Privacy Policy</b></a></li> <li class=\"current\"><a href=\"#nogo\"><b>Products</b></a></li> <li><a href=\"#F\"><b>Where to find us</b></a></li> <li><a href=\"#Fo\"><b>Contact us</b></a></li> <li><a href=\"#nogo\"><b>Search</b></a></li> </ul> </body> </html> ";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
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