// ==UserScript==
// @name          GC35EM2
// @namespace     http://cacherstats.de
// @description   A mystery-cache
// @author        Markus Hildebrandt
// @version       0.4
// @license       GPLv3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @include       http://www.geocaching.com/seek/cache_details.aspx?guid=be49f26d-e48f-4f7f-9e6e-8392ec629a84
// @include       http://www.geocaching.com/seek/cache_details.aspx?wp=GC35EM2
// ==/UserScript==

function SuchenUndErsetzen(QuellText, SuchText, ErsatzText)
        {   // Erstellt von Ralf Pfeifer (pfeifer@arstechnica.de, http://www.arstechnica.de)
            // Fehlerpruefung
            if ((QuellText == null) || (SuchText == null))           { return null; }
            if ((QuellText.length == 0) || (SuchText.length == 0))   { return QuellText; }

            // Kein ErsatzText ?
            if ((ErsatzText == null) || (ErsatzText.length == 0))    { ErsatzText = ""; }

            var LaengeSuchText = SuchText.length;
            var LaengeErsatzText = ErsatzText.length;
            var Pos = QuellText.indexOf(SuchText, 0);

            while (Pos >= 0)
            {
                QuellText = QuellText.substring(0, Pos) + ErsatzText + QuellText.substring(Pos + LaengeSuchText);
                Pos = QuellText.indexOf(SuchText, Pos + LaengeErsatzText);
            }
            return QuellText;
        }

var Loca = 'On Melee Island';
var contentdiv = '\
<div id="alles" style="border-style: dotted;border-color: black;width: 410px;border-width: 2px;">\
<div id="Ueberschrift" style="font-family:Arial, Helvetica, sans-serif; letter-spacing: -0.5px;font-weight: bold;background-color: #BBBBBB;width: 400px;padding:5px;border-bottom-style: solid;">\
Super. Dann beantworte mir nur noch vier Fragen.<br \>\
L&ouml;sungen einfach klein alle direkt hintereinander weg.<br \>\
Bsp. hundkatzemaustisch\
</div>\
<div id="fragen" style="font-family:Arial, Helvetica, sans-serif; letter-spacing: -0.5px;background-color: #DDDDDD;width: 400px;padding:5px">\
&nbsp;<br \>\
1. Was fehlt hier?<br \><img src="http://46.38.235.226/userscript/frage1.png" border="0"><br \>\<br \>\
2. Was braucht man aus dem Topf?<br \><img src="http://46.38.235.226/userscript/frage2.png" border="0"><br \>\<br \>\
3. Auf dem Plakat fehlt ein Wort.<br \><img src="http://46.38.235.226/userscript/frage3.png" border="0"><br \>\<br \>\
4. Wann spielt Jojo hier (nur Zahl)?<br \>\<img src="http://46.38.235.226/userscript/frage4.png" border="0"><br \>\<br \>\
</div>\
<div style="text-align:center;padding:5px;">\
<form action="http://46.38.235.226/userscript/check.php" name="form1" method="POST" target="frame1">\
<input name="antwort" id="antwort" type="text" style="width:220px;font:normal 18px Arial;color: #999999;padding:3px 5px 3px 19px;" \>\
<input type="submit" name="submit" value="absenden" style="background: #e3e3db;font-size:12px;color: #989070;padding: 6px 14px;border-width: 2px;border-style: solid;border-color: #fff #d8d8d0 #d8d8d0 #fff;text-decoration: none;text-transform:uppercase;font-weight:bold;"/>\
</form>\
</div>\
</div>\
&nbsp;<br \>\
<div style="border-style: dotted;border-color: black;width: 410px;height:200px;border-width: 2px;text-align:center;">\
<iframe name="frame1" src="http://46.38.235.226/userscript/check.php" width="100%" height="100%" style="border:none;">\
</div>';
var details = document.getElementById('cacheDetails').innerHTML;
var stard = document.getElementById('ctl00_ContentBody_uxLegendScale').innerHTML;
var startt = document.getElementById('ctl00_ContentBody_Localize12').innerHTML;
//var derheader

//Suchen und ersetzen
details = SuchenUndErsetzen(details,'src="/images/WptTypes/8.gif"','src="http://a1.twimg.com/profile_images/77173546/guybrush_pixel_normal.jpg"');
details = SuchenUndErsetzen(details,'32','48');
stard = SuchenUndErsetzen(stard,'src="http://www.geocaching.com/images/stars/stars4.gif"','src="http://46.38.235.226/userscript/skull_ranks1a_4.gif"');
startt = SuchenUndErsetzen(startt,'src="http://www.geocaching.com/images/stars/stars2.gif"','src="http://46.38.235.226/userscript/skull_ranks1a_2.gif"');

document.getElementById('ctl00_ContentBody_Location').innerHTML=Loca;	
document.getElementById('ctl00_ContentBody_LongDescription').innerHTML=contentdiv;
document.getElementById('cacheDetails').innerHTML = details;
document.getElementById('ctl00_ContentBody_uxLegendScale').innerHTML = stard;
document.getElementById('ctl00_ContentBody_Localize12').innerHTML = startt;
GM_addStyle("footer{background:#60713c url(http://46.38.235.226/userscript/footer.jpg) no-repeat center top;}");