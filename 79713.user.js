// ==UserScript==
// @name		iGoogleConstrast
// @description		A Theme for iGoogle
// @version		1.0.0
// @date		21st June 2010
// @author		PLaCiD
// @namespace		http://userscripts.org/users/156689
// @include		http://*.google.*/*
// @include		http://www.google.com/*
// @exclude		http://*.google.*/custom*
// @exclude		http://www.google.com/cse
// @exclude		http://mail.google.com/mail/
// ==/UserScript==


var css = 	/* Space between boxes */		".modbox{ margin: 1px !important; }" +
		/* Background and tab colour */ 	"#modules, #col2, .rnd2, .rnd3, .leftselectedtab, .modbox {background-color:black !important;} " +
		/* Box title background colour */	".modtitle   {background-color:yellow;}" +
		/* Box title text colour */		".modtitle_text,.mtlink   {color:black !important;}" +
		/* Box header and footer colour */	".rnd_modtitle .rnd2, .rnd_modtitle .rnd3, .rnd_modboxin .rnd2, .rnd_modboxin .rnd3 { background-color:yellow !important;} " +
		/* Box border */			".modboxin, .modboxin_s, .modtitle   {border:1px solid yellow !important; border-top: 0 }" +
		/* Box background colour */		".modboxin { background-color:white !important;}" + 
		/* Rempove footer */			"#footerwrapinner, #footerwrap {display:none !important;} " +
		/* Text background */			"body {background-color: white !important;}"	

// Add Style
if (typeof GM_addStyle != "undefined") 
{
	GM_addStyle(css);
}

else if (typeof addStyle != "undefined") 
{ 
	addStyle(css); 
}
else 
{ 
	var heads = document.getElementsByTagName("head"); 
	if (heads.length > 0) 
	{
		var node = document.createElement("style");
		node.type = "text/css";
		node.innerHTML = css;
		heads[0].appendChild(node); 
	};
};


	

