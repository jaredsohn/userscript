// ==UserScript==
// @name		Userscripts.org Expand Main Content Area
// @author		Erik Vold
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated	2009-10-22
// @lastupdated	2009-10-24
// @namespace	usoExpandMain
// @include		http://userscripts.org/*
// @version		0.1.1
// @homepageURL http://userscripts.org/scripts/show/60446
// @description	This userscript will expand the #main content field at userscripts.org
// ==/UserScript==

(function(){
	var usoExpandMain={
		init:function(){
			GM_addStyle((<><![CDATA[
				body.home #main {
					margin-left:150px;
					padding-left:20px;
					display:block;
					float:none;
					width:auto;
				}
			]]></>).toString());
		}
	}
	usoExpandMain.init();
})();