// ==UserScript==
// @name           envato
// @namespace      envato
// @description    envato
// @include        http://themeforest.net/*
// @include        http://*.themeforest.net/*
// @include		   http://graphicriver.net/*
// @include		   http://*.graphicriver.net/*
// @include		   http://activeden.net/*
// @include		   http://*.activeden.net/*
// @include		   http://videohive.net/*
// @include		   http://*.videohive.net/*
// @include		   http://3docean.net/*
// @include		   http://*.3docean.net/*
// @include		   http://marketplace.tutplus.com/*
// @include		   http://codecanyon.net/*
// @include		   http://*.codecanyon.net/*
// @include		   http://photodune.net/*
// @include		   http://*.photodune.net/*
// ==/UserScript==
function _replace_thumbs()
{
	jQuery(".item-list li .thumbnail a img").each(function()
	{
		var $this = jQuery(this);
		$this.attr("src",$this.attr("data-preview-url")).css({"max-width":"none", "height":"auto","width":"auto"});
	});
}

$(document).ajaxComplete(function() {
  _replace_thumbs();
});

_replace_thumbs();
