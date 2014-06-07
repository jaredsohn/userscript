// ==UserScript==
// @name        Comunio - Club 2 Image - Bundesliga
// @description Ersetzt den Vereinsnamen durch dessen Vereinswappen der Bundesliga.
// @include     http://www*.comunio.de/*
// @include     http://comunio.de/*
// @include	http://comduo.comunio.de/
// @include	http://*comduo.comunio.de/*
// @copyright 	Yannic Schnetz
// @version	1.0.1
// ==/UserScript==
var b=document.getElementsByTagName("body")[0];
b.innerHTML = (b.innerHTML).replace( />VfB Stuttgart/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=14" border="0"><img src="http://www.comunio.de/clubImg.phtml/14.gif" alt="VfB Stuttgart"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Bayern München/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=1" border="0"><img src="http://www.comunio.de/clubImg.phtml/1.gif" alt="FC Bayern München"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Nürnberg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=2" border="0"><img src="http://www.comunio.de/clubImg.phtml/2.gif" alt="1. FC Nürnberg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia M'gladbach/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=3" border="0"><img src="http://www.comunio.de/clubImg.phtml/3.gif" alt="Borussia M\'gladbach"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hamburger SV/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=4" border="0"><img src="http://www.comunio.de/clubImg.phtml/4.gif" alt="Hamburger SV"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia Dortmund/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=5" border="0"><img src="http://www.comunio.de/clubImg.phtml/5.gif" alt="Borussia Dortmund"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SV Werder Bremen/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=6" border="0"><img src="http://www.comunio.de/clubImg.phtml/6.gif" alt="SV Werder Bremen"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hertha BSC/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=7" border="0"><img src="http://www.comunio.de/clubImg.phtml/7.gif" alt="Hertha BSC"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Bayer 04 Leverkusen/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=8" border="0"><img src="http://www.comunio.de/clubImg.phtml/8.gif" alt="Bayer 04 Leverkusen"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Schalke 04/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=10" border="0"><img src="http://www.comunio.de/clubImg.phtml/10.gif" alt="FC Schalke 04"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Kaiserslautern/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=11" border="0"><img src="http://www.comunio.de/clubImg.phtml/11.gif" alt="1. FC Kaiserslautern"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Köln/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=13" border="0"><img src="http://www.comunio.de/clubImg.phtml/13.gif" alt="1. FC Köln"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Augsburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=68" border="0"><img src="http://www.comunio.de/clubImg.phtml/68.gif" alt="FC Augsburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SC Freiburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=21" border="0"><img src="http://www.comunio.de/clubImg.phtml/21.gif" alt="SC Freiburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />VfL Wolfsburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=12" border="0"><img src="http://www.comunio.de/clubImg.phtml/12.gif" alt="VfL Wolfsburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1899 Hoffenheim/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=62" border="0"><img src="http://www.comunio.de/clubImg.phtml/62.gif" alt="1899 Hoffenheim"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hannover 96/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=17" border="0"><img src="http://www.comunio.de/clubImg.phtml/17.gif" alt="Hannover 96"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FSV Mainz 05/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=18" border="0"><img src="http://www.comunio.de/clubImg.phtml/18.gif" alt="1. FSV Mainz 05"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Eintracht Frankfurt/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=9" border="0"><img src="http://www.comunio.de/clubImg.phtml/9.gif" alt="Eintracht Frankfurt"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />VfL Bochum/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=15" border="0"><img src="http://www.comunio.de/clubImg.phtml/15.gif" alt="VfL Bochum"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Arminia Bielefeld/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=16" border="0"><img src="http://www.comunio.de/clubImg.phtml/16.gif" alt="Arminia Bielefeld"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />MSV Duisburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=16" border="0"><img src="http://www.comunio.de/clubImg.phtml/16.gif" alt="Arminia Bielefeld"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1899 Hoffenheim/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=62" border="0"><img src="http://www.comunio.de/clubImg.phtml/62.gif" alt="1899 Hoffenheim"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Eintracht Braunschweig/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=80" border="0"><img src="http://www.comunio.de/clubImg.phtml/80.gif" alt="Eintracht Braunschweig"></a><br />' );
