// ==UserScript==
// @name           quaz movie2k
// @description    displays 2 additional links to IMDb on movie2k, the rating links to the ratings page
// @namespace      http://userscripts.org/users/quaz
// @include        http://www.movie2k.to/*
// @require    	   http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js
// ==/UserScript==

l=$('a[href*="www.imdb."]').clone()[0];
l2=l.cloneNode();
l.text='                              IMDb:';
l2.text='   ' + l2.text;
l2.href=l2.href + '/ratings';
$('#tdmoviesheader h1').append(l);
$('#tdmoviesheader h1').append(l2);