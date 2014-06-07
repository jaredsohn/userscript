// ==UserScript==
// @name           anuntul
// @namespace      anuntul
// @description    anuntul
// @include        http://www.anuntul.ro/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
jQuery("#lista_anunturi  tr > td > a > img").each(function()
{
	this.src = this.src.replace("thumb", "large");
	//this.width = "250";
	jQuery(this).removeAttr("width").removeAttr("height").removeClass("thumb");
});