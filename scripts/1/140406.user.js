// ==UserScript==
// @name           No ads outlook.com
// @namespace      http://
// @description    (v1.0) Quita los ads de outlook.com
// @include        *mail.live.com*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

/*******************************************************************************
***************     Creado por BuNKeR << www.n00bs.com.ar >>     ***************
*******************************************************************************/

var j = jQuery.noConflict();
j(document).ready(function(){
	if (j("#adbarContainer").length){
		j("#adbarContainer").remove();
	}
});	