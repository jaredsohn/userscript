// ==UserScript==
// @name          Mokkels, clean met nwe topbanner (orig. hoogte)
// @namespace     http://userstyles.org
// @description	  Forum weer over de hele breedte van het scherm, zonder reclame, en met een nieuwe topbanner
// @author        splashhh
// @homepage      http://userscripts.org/scripts/show/37968
// @include       http://forum.mokkels.nl/*
// @include       https://forum.mokkels.nl/*
// @include       http://*.forum.mokkels.nl/*
// @include       https://*.forum.mokkels.nl/*
// ==/UserScript==
(function() {
var css = "@namespace url(http://www.w3.org/1999/xhtml); /* Breedte van het forum kun je evt. bij (erna dus..) #wrap, #page en niet verderop in de code!, aanpassen. Origineel staat de waarde van width op 96% van je beeldscherm. Je kan het ook instellen in pixels bijv 900px ipv 96% ------------------------------------------>>>-*/ #wrap, #page { width: 96% !important; } body {background-image:none !important; background-color:#FFFFFF !important; } #head {width:100% !important; padding:0px !important; margin:0px!important; background-image:url(http://i8.tinypic.com/6p70as9.jpg) !important; background-repeat:no-repeat !important; } TD[style=\"border-right: 3px solid white; padding: 3px 4px 0px 0px; background: rgb(243, 242, 241) none repeat scroll 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"] {display:none !important; } TD[style=\"border-right: 3px solid white; padding: 3px 4px 0px 0px; background: rgb(243, 242, 241) none repeat scroll 0% 0%; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;\"] {display:none !important; } #posts TD[class=\"alt2\"] {width:120px !important; } #posts TD[class=\"alt1\"] {width:auto !important; } #navbarmkl {width:97% !important; } #head IMG, #postbannerblock, #head #ad {display:none} #page {width:99% !important; } #wrap{ background:#FFFFFF !important; top: 20px !important; left: 0px !important; } #headlogin A {color:#3F3F3F !important; } #headlogin A:hover {color:#FF6600 !important; } #head {border-bottom:none !important; } #headbar, #headbar ul { width:100% !important; opacity: .90 !important; } #headbar:hover, #headbar ul:hover { opacity:1.00 !important; } #navbarmkl .vbmenu_control {color:#FF6600 !important; } #gallerybanner IFRAME {display:none !important; } .tfootTable {width:100% !important; background-image:none !important;}";
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
})();

headbar = document.getElementById("headbar");

headbarhtml = '<div style="font-weight:bold; position:absolute; left:30px; top:4px;" ><a href="http://www.mokkels.nl/">Mokkels.nl</a>&nbsp|&nbsp<a href="http://forum.mokkels.nl/">Mokkelforum</a>&nbsp|&nbsp<a href="http://www.battleofthebabes.nl/">Battle of the Babes</a></div>';

online = false;
linkarray = document.getElementsByTagName("a");

for (i=0; i < linkarray.length; i++ ) {
h = linkarray[i].href+"";

if (h.indexOf('/private.php') != -1){

online = true; 

  }
}

if (online == false) {			
headbarhtml +='<div style="position:absolute; right:30px; top:4px;"><form action="login.php?do=login" method="post" onsubmit="md5hash(vb_login_password, vb_login_md5password, vb_login_md5password_utf, 0)"><input name="do" value="login" type="hidden"><input name="url" value="/index.php" type="hidden"><input name="vb_login_md5password" type="hidden"><input name="vb_login_md5password_utf" type="hidden"><input name="s" value="" type="hidden"><span class="fieldset">Gebruiker:<input name="vb_login_username" size="7" accesskey="u" tabindex="1" type="text">Wachtwoord:<input name="vb_login_password" size="7" tabindex="1" type="password"><label for="cb_cookieuser"><input name="cookieuser" value="1" id="cb_cookieuser" tabindex="1" type="checkbox">Onthouden</label><input class="button" value="login" accesskey="s" tabindex="1" type="submit"></span></div>'; }

else {
headbarhtml +='<div style="position:absolute; right:20px; top:4px;"><a href ="http://forum.mokkels.nl/usercp.php">Gebruikersvoorkeuren</a>&nbsp|&nbsp<a href="http://forum.mokkels.nl/login.php?do=logout">Uitloggen</a>';
}

headbar.innerHTML = headbarhtml;
