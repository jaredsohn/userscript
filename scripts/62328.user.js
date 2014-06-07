// ==UserScript==
// @name           home
// @namespace      home.myspace.com
// @description    home
// @include        http://home.myspace.com/index.cfm?fuseaction=home*
// @include        http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

function _(x) { return document.getElementById(x); }

var a = [ "row0", "module14" ];

for (var i in a) _(a[i]).style.display = 'none';

// move user links below apps
_("module4").appendChild(_("module2"));
_("squareAd").innerHTML = "";

// move the status update form to the third column
_("squareAd").appendChild(_("module7"));
// move the status update form up and back little
_("module7").style.margin = "-3px 0px 0px 0px";
// move pymk up a little
_("module12").style.margin = "-20px 0px 0px 0px";

// nuke the profile photo
_("module2").childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[1].innerHTML = '';

// move the stream options up and to the left
_("module8").childNodes[1].childNodes[0].childNodes[0].childNodes[3].childNodes[1].style.margin = "-28px 0px 0px 225px";

