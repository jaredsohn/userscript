// ==UserScript==
// @name           IMDB: Show if movie won the Best Picture
// @version        2.0
// @include        http://www.imdb.com/title/tt0018578/*
// @include        http://www.imdb.com/title/tt0019729/*
// @include        http://www.imdb.com/title/tt0020629/*
// @include        http://www.imdb.com/title/tt0021746/*
// @include        http://www.imdb.com/title/tt0022958/*
// @include        http://www.imdb.com/title/tt0023876/*
// @include        http://www.imdb.com/title/tt0025316/*
// @include        http://www.imdb.com/title/tt0026752/*
// @include        http://www.imdb.com/title/tt0027698/*
// @include        http://www.imdb.com/title/tt0029146/*
// @include        http://www.imdb.com/title/tt0030993/*
// @include        http://www.imdb.com/title/tt0031381/*
// @include        http://www.imdb.com/title/tt0032976/*
// @include        http://www.imdb.com/title/tt0033729/*
// @include        http://www.imdb.com/title/tt0035093/*
// @include        http://www.imdb.com/title/tt0034583/*
// @include        http://www.imdb.com/title/tt0036872/*
// @include        http://www.imdb.com/title/tt0037884/*
// @include        http://www.imdb.com/title/tt0036868/*
// @include        http://www.imdb.com/title/tt0039416/*
// @include        http://www.imdb.com/title/tt0040416/*
// @include        http://www.imdb.com/title/tt0041113/*
// @include        http://www.imdb.com/title/tt0042192/*
// @include        http://www.imdb.com/title/tt0043278/*
// @include        http://www.imdb.com/title/tt0044672/*
// @include        http://www.imdb.com/title/tt0045793/*
// @include        http://www.imdb.com/title/tt0047296/*
// @include        http://www.imdb.com/title/tt0048356/*
// @include        http://www.imdb.com/title/tt0048960/*
// @include        http://www.imdb.com/title/tt0050212/*
// @include        http://www.imdb.com/title/tt0051658/*
// @include        http://www.imdb.com/title/tt0052618/*
// @include        http://www.imdb.com/title/tt0053604/*
// @include        http://www.imdb.com/title/tt0055614/*
// @include        http://www.imdb.com/title/tt0056172/*
// @include        http://www.imdb.com/title/tt0057590/*
// @include        http://www.imdb.com/title/tt0058385/*
// @include        http://www.imdb.com/title/tt0059742/*
// @include        http://www.imdb.com/title/tt0060665/*
// @include        http://www.imdb.com/title/tt0061811/*
// @include        http://www.imdb.com/title/tt0063385/*
// @include        http://www.imdb.com/title/tt0064665/*
// @include        http://www.imdb.com/title/tt0066206/*
// @include        http://www.imdb.com/title/tt0067116/*
// @include        http://www.imdb.com/title/tt0068646/*
// @include        http://www.imdb.com/title/tt0070735/*
// @include        http://www.imdb.com/title/tt0071562/*
// @include        http://www.imdb.com/title/tt0073486/*
// @include        http://www.imdb.com/title/tt0075148/*
// @include        http://www.imdb.com/title/tt0075686/*
// @include        http://www.imdb.com/title/tt0077416/*
// @include        http://www.imdb.com/title/tt0079417/*
// @include        http://www.imdb.com/title/tt0081283/*
// @include        http://www.imdb.com/title/tt0082158/*
// @include        http://www.imdb.com/title/tt0083987/*
// @include        http://www.imdb.com/title/tt0086425/*
// @include        http://www.imdb.com/title/tt0086879/*
// @include        http://www.imdb.com/title/tt0089755/*
// @include        http://www.imdb.com/title/tt0091763/*
// @include        http://www.imdb.com/title/tt0093389/*
// @include        http://www.imdb.com/title/tt0095953/*
// @include        http://www.imdb.com/title/tt0097239/*
// @include        http://www.imdb.com/title/tt0099348/*
// @include        http://www.imdb.com/title/tt0102926/*
// @include        http://www.imdb.com/title/tt0105695/*
// @include        http://www.imdb.com/title/tt0108052/*
// @include        http://www.imdb.com/title/tt0109830/*
// @include        http://www.imdb.com/title/tt0112573/*
// @include        http://www.imdb.com/title/tt0116209/*
// @include        http://www.imdb.com/title/tt0120338/*
// @include        http://www.imdb.com/title/tt0138097/*
// @include        http://www.imdb.com/title/tt0169547/*
// @include        http://www.imdb.com/title/tt0172495/*
// @include        http://www.imdb.com/title/tt0268978/*
// @include        http://www.imdb.com/title/tt0299658/*
// @include        http://www.imdb.com/title/tt0167260/*
// @include        http://www.imdb.com/title/tt0405159/*
// @include        http://www.imdb.com/title/tt0375679/*
// @include        http://www.imdb.com/title/tt0407887/*
// @include        http://www.imdb.com/title/tt0477348/*
// @include        http://www.imdb.com/title/tt1010048/*
// @include        http://www.imdb.com/title/tt0887912/*
// @include        http://www.imdb.com/title/tt1504320/*
// @include        http://www.imdb.com/title/tt1655442/*
// @include        http://www.imdb.com/title/tt1024648/*
// ==/UserScript==

var best_picture_div = document.createElement('div');
	best_picture_div.setAttribute('id', 'best_picture_div');
	best_picture_div.setAttribute('style', 'font-weight:bold; font-size:24px; background-color:#0A8A0A; color:white; width:auto; text-align: center;');
	document.getElementById('pagecontent').insertBefore(best_picture_div, document.getElementById('injected_billboard_wrapper'));
	best_picture_div.innerHTML = "THIS MOVIE WON THE ACADEMY AWARD FOR BEST PICTURE!";