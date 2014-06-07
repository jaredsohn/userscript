// ==UserScript==
// @name        Comuniotools
// @description Ersetzt die Vereinsnamen durch das Bild
// @include     http://www*.comunio.de/*
// @include     http://comunio.de/*
// @version	0.0.1
// ==/UserScript==
var bs=document.getElementsByClassName("tablecontent03");

for(i=0; i < bs.length; i++) {
b=bs[i];
b.innerHTML = (b.innerHTML).replace( />VfB Stuttgart/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=14" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/14.gif" alt="VfB Stuttgart" title="VfB Stuttgart" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Bayern München/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=1" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/1.gif" alt="FC Bayern München" title="FC Bayern München" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Nürnberg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=2" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/2.gif" alt="1. FC Nürnberg" title="1. FC Nürnberg" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia M'gladbach/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=3" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/3.gif" alt="Borussia M\'gladbach" title="Borussia M\'gladbach" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hamburger SV/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=4" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/4.gif" alt="Hamburger SV" title="Hamburger SV" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia Dortmund/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=5" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/5.gif" alt="Borussia Dortmund" title="Borussia Dortmund" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SV Werder Bremen/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=6" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/6.gif" alt="SV Werder Bremen" title="SV Werder Bremen" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hertha BSC/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=7" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/7.gif" alt="Hertha BSC" title="Hertha BSC" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Bayer 04 Leverkusen/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=8" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/8.gif" alt="Bayer 04 Leverkusen" title="Bayer 04 Leverkusen" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Schalke 04/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=10" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/10.gif" alt="FC Schalke 04" title="FC Schalke 04" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Kaiserslautern/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=11" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/11.gif" alt="1. FC Kaiserslautern" title="1. FC Kaiserslautern" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Köln/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=13" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/13.gif" alt="1. FC Köln" title="1. FC Köln" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Augsburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=68" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/68.gif" alt="FC Augsburg" title="FC Augsburg" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SC Freiburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=21" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/21.gif" alt="SC Freiburg" title="SC Freiburg" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />VfL Wolfsburg/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=12" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/12.gif" alt="VfL Wolfsburg" title="VfL Wolfsburg" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1899 Hoffenheim/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=62" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/62.gif" alt="1899 Hoffenheim" title="1899 Hoffenheim" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hannover 96/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=17" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/17.gif" alt="Hannover 96" title="Hannover 96" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FSV Mainz 05/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=18" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/18.gif" alt="1. FSV Mainz 05" title="1. FSV Mainz 05" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Eintracht Frankfurt/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=9" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/9.gif" alt="Eintracht Frankfurt" title="Eintracht Frankfurt" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Fortuna Düsseldorf/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=77" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/77.gif" alt="Fortuna Düsseldorf" title="Fortuna Düsseldorf" class="vlogo"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SpVgg Greuther Fürth/g, '><a href="http://www.comunio.de/clubInfo.phtml?cid=76" border="0" target="_blank"><img src="http://www.comunio.de/clubImg.phtml/76.gif" alt="SpVgg Greuther Fürth" title="SpVgg Greuther Fürth" ></a><br />' );
}