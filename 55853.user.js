// ==UserScript==
// @name           Burn Before Reading
// @namespace      http://readcycling.com/burnbeforereading
// @description    Gets fucking rid of fucking #readcycling fucking tweets
// @include        http://twitter.com/*
// @author				 mort (manuel@simplelogica.net)	
// @require	    	 http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.1
// ==/UserScript==
$(function() {
		$(":contains('#readcycling')").parent('li.status').hide();
});

