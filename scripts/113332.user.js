// ==UserScript==
// @name        Gamblercomunio
// @description Optimierungen
// @include     http://www*.comunio.de/*
// @include     http://comunio.de/*
// @copyright 	Gamblercomunio
// @version	1.7
// ==/UserScript==
var b=document.getElementsByTagName("body")[0];
b.innerHTML = (b.innerHTML).replace( />1. FC Kaiserslautern/g, '><a href="http://www.comstats.de/squad.php?clubid=11" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/11.gif" title="1. FC Kaiserslautern - bei comstats" alt="1. FC Kaiserslautern"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Köln/g, '><a href="http://www.comstats.de/squad.php?clubid=13" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/13.gif" title="1. FC Köln - bei comstats" alt="1. FC Köln"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FC Nürnberg/g, '><a href="http://www.comstats.de/squad.php?clubid=2" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/2.gif" title="1. FC Nürnberg - bei comstats" alt="1. FC Nürnberg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1. FSV Mainz 05/g, '><a href="http://www.comstats.de/squad.php?clubid=18" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/18.gif" title="1. FSV Mainz 05 - bei comstats" alt="1. FSV Mainz 05"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />1899 Hoffenheim/g, '><a href="http://www.comstats.de/squad.php?clubid=62" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/62.gif" title="1899 Hoffenheim - bei comstats" alt="1899 Hoffenheim"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Bayer 04 Leverkusen/g, '><a href="http://www.comstats.de/squad.php?clubid=8" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/8.gif" title="Bayer 04 Leverkusen - bei comstats" alt="Bayer 04 Leverkusen"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia Dortmund/g, '><a href="http://www.comstats.de/squad.php?clubid=5" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/5.gif" title="Borussia Dortmund - bei comstats" alt="Borussia Dortmund"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Borussia M'gladbach/g, '><a href="http://www.comstats.de/squad.php?clubid=3" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/3.gif" title="Borussia M\'gladbach - bei comstats" alt="Borussia M\'gladbach"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Augsburg/g, '><a href="http://www.comstats.de/squad.php?clubid=68" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/68.gif" title="FC Augsburg - bei comstats" alt="FC Augsburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Bayern München/g, '><a href="http://www.comstats.de/squad.php?clubid=1" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/1.gif" title="FC Bayern München - bei comstats" alt="FC Bayern München"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />FC Schalke 04/g, '><a href="http://www.comstats.de/squad.php?clubid=10" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/10.gif" title="FC Schalke 04 - bei comstats" alt="FC Schalke 04"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hamburger SV/g, '><a href="http://www.comstats.de/squad.php?clubid=4" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/4.gif" title="Hamburger SV - bei comstats" alt="Hamburger SV"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hannover 96/g, '><a href="http://www.comstats.de/squad.php?clubid=17" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/17.gif" title="Hannover 96 - bei comstats" alt="Hannover 96"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Hertha BSC/g, '><a href="http://www.comstats.de/squad.php?clubid=7" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/7.gif" title="Hertha BSC - bei comstats" alt="Hertha BSC"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SV Werder Bremen/g, '><a href="http://www.comstats.de/squad.php?clubid=6" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/6.gif" title="SV Werder Bremen - bei comstats" alt="SV Werder Bremen"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />SC Freiburg/g, '><a href="http://www.comstats.de/squad.php?clubid=21" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/21.gif" title="SC Freiburg - bei comstats" alt="SC Freiburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />VfB Stuttgart/g, '><a href="http://www.comstats.de/squad.php?clubid=14" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/14.gif" title="VfB Stuttgart - bei comstats" alt="VfB Stuttgart"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />VfL Wolfsburg/g, '><a href="http://www.comstats.de/squad.php?clubid=12" target="_blank" border="0"><img src="http://www.comunio.de/clubImg.phtml/12.gif" title="VfL Wolfsburg - bei comstats" alt="VfL Wolfsburg"></a><br />' );
b.innerHTML = (b.innerHTML).replace( />Computer/g, '><img src="http://www.greensmilies.com/smile/smiley_emoticons_fred_zocker.gif" title="Computer" "alt="Computer"><br />' );
b.innerHTML = (b.innerHTML).replace( /value=\"Abbrechen und zum Transfermarkt\" \x2F\x3E\x3C\x2Fnoscript\x3E/g, 'value="Abbrechen und zum Transfermarkt" /></noscript><script type="text/javascript"><!-- document.write("<input type=\"checkbox\" id=\"Checkall\" name=\"Checkall\" value=\"Checkall\" align=\"bottom\" onclick=\"CheckAll(\'takeOff\');\" style=\"margin-left:7px;margin-bottom:0px;\"></td><td colspan=\"9\">Alle"); //--></script><input id="Checkall" name="Checkall" value="Checkall" onclick="CheckAll(\'takeOff\');" style="margin-left: 7px; margin-bottom: 0px;" align="bottom" type="checkbox">' );

