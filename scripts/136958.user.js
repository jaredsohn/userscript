// ==UserScript==
// @name        Youtube - No Adds
// @namespace   http://taringa.net/perfil/gonx_666
// @include     *.youtube.com/*
// @version     1
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

var id = $('link[rel="canonical"]').attr('href').split('=')[1]
$("#watch-video").html('<iframe width="640" height="390" frameborder="0" src="http://www.youtube.com/embed/'+id+'?wmode=transparent&autoplay=1" allowfullscreen></iframe>');