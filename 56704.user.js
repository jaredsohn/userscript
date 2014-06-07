// ==UserScript==
// @name			Remove Virtual Nights login
// @author			Christian Becker
// @namespace		virtualNights
// @include			http://*.virtualnights.com/picture/*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2009-08-30
// @lastupdated		2009-08-30
// @description		Removes the Login Overlay if you want to view your photos on virtualnights.com
// ==/UserScript==

//function tb_showIframe() {}

var overlay = document.getElementById("TB_overlay");
overlay.style.display = "none";

var loginWindow = document.getElementById("TB_window");
loginWindow.style.display = "none";

var loginIFrame = document.getElementById("TB_iframeContent");
loginIFrame.style.display = "none";
loginIFrame.src = "";

var loginGif = document.getElementById("TB_load");
loginGif.style.display = "none";

