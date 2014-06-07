// ====================================================================================================
// Namn: DSClean + shiny
// Beskrivning: Greasemonkey-extension till Mozilla Firefox 1.0
// Uppgift: att rensa DSC-forumet fr?n o?nskade inl?gg + att ge forumet en ny layout
// Version: 0.1
// Skapare: kotscho (DSClean) + TUT-R?VEN (shiny)
// Licens: fildela inte JavaScript!
// ====================================================================================================

// ----------------------------------------------------------------------------------------------------
// INST?LLNING 1: HUR M?NGA OCH VILKA ?R PERSONERNA VARS INL?GG DU VILL SLIPPA?
// ----------------------------------------------------------------------------------------------------
var antal_puckos = 1; // eller 2, eller 3, eller 4, ...
var puckos = new Array(antal_puckos);
puckos[0] = "Wunderkind";

// ... i s? fall, l?gg till eller ?ndra ovan s? h?r:
// puckos[1] = "kotscho";
// puckos[2] = "Gecko"
// o s v


// ----------------------------------------------------------------------------------------------------
// INST?LLNING 2: HUR SKA INL?GGEN D?LJAS?
// var dolj_helt = 0;
// inl?gget d?ljs inte helt, utan inl?gget g?rs bara "osynligt" - du ser fortfarande postarens namn och
// du kan l?sa inl?gget genom att markera texten med musen
//
// var dolj_helt = 1;
// hela inl?gget g?ms, inklusive postarens namn - det blir bara en tom rad.
// ----------------------------------------------------------------------------------------------------
var dolj_helt = 1;

// ----------------------------------------------------------------------------------------------------
// INST?LLNING 3: HUR M?NGA OCH VILKA ?R PERSONERNA VARS INL?GG DU VILL SE EXTRA G?RNA?
// ----------------------------------------------------------------------------------------------------

var antal_idoler = 1; // eller 2, eller 3, eller 4, ...
var idoler = new Array(antal_idoler);
idoler[0] = "maxim";

// den f?rg du vill ge dina idoler
var idolcolor ="E8E8E8";
// ----------------------------------------------------------------------------------------------------
// INST?LLNING 4: F?RGER
// ----------------------------------------------------------------------------------------------------
//bakgrundsf?rg till boxar, och i ramen till diskussioner
var boxcolor ="#CFCFCF"; 
// t.ex. orange: var boxcolor ="#DDDDDD";
//bakgrundsf?rg p? diskussioner
var bgcolor ="#FFFFFF";

// ====================================================================================================
// Nu kan du sluta pilla om du inte vet vad du g?r
// Om du vet lite vad du g?r kan du byta recensions-s?kningen mot forum-s?kning. Se nedan!
// ====================================================================================================


// ==UserScript==
// @name	dscPlus
// @description	Ny layout till dagensskiva.com diskussioner. Tema st?l. Blockerar idioter & highlightar dina idoler.
// @include	http://www.dagensskiva.com/discuss.asp?*
// @include	http://dagensskiva.com/discuss.asp?*
// ==/UserScript==
//      
(function() {
var adShown=true; 

	function xpath(query) {
		return document.evaluate(query, document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
        var divs = xpath("//TR/td[@class='inloggad']");
        var body = xpath("//body").snapshotItem(0);
        var mainmenu = xpath("//TABLE[@WIDTH='120']").snapshotItem(0);
        var maintable = xpath("//TABLE[@WIDTH='720']").snapshotItem(1);
        var newmainmenu = document.createElement("table");
        var newsearch = document.createElement("table");
        //s?kmeny artikelarkiv
newsearch.innerHTML='<tr><td>Recensioner:<form action="search.asp" method="get"> <select name="val"><option value="text">Fritexts&ouml;kning</option><option value="artistnamn">p&aring; artist</option><option value="skivnamn">p&aring; titel</option> <option value="bolag">p&aring; skivbolag</option> <option value="betyg">p&aring; betyg</option> <option value="ar">p&aring; sl&auml;pp&aring;r</option><option value="datum">p&aring; recensions&aring;r</option> <option value="recensent">p&aring; recensent</option></select> <font size="1"><input name="strang" size="20" ></font> <input value="submit" type="image" src="../grafik/sokknapp.gif" border="0">&nbsp;</form></td></tr>';
        newsearch.setAttribute("width","720");
        newmainmenu.setAttribute("width","120");
        newmainmenu.setAttribute("cellpadding","5");
        // ny meny
        newmainmenu.innerHTML='<tr><td><a href ="/index.asp"><b>start</b></a></td> <td><a href ="/discuss.asp"><b>diskutera</b></a></td> <td><a href ="http://dagensskiva.com/rss/chronicles-rss.asp"><b>podradio</b></a></td> <td><a href ="/news.asp"><b>musiknyheter</b></a></td> <td><a href ="/releases.asp"><b>skivsl&auml;pp</b></a></td> <td><a href ="/tenlatest.asp"><b>senaste&nbsp;tio</b></a></td> <td><a href ="/search.asp"><b>skivarkiv</b></a></td> <td><a href ="/artiklar.asp"><b>artikelarkiv</b></a></td><td><a href ="/red.asp"><b>redaktion</b></a></td><td><a href ="/100skivor/"><b>100&nbsp;skivor</b></a></td></tr>';
        var newdiscussionsearch = document.createElement("table");
        //s?kmeny diskussioner
        newdiscussionsearch.innerHTML='<tr><td>Diskussioner:<FORM action="discuss.asp" method="post"> <SELECT NAME="SOKMETOD"><OPTION VALUE="FRITEXT">Fritext</OPTION> <OPTION VALUE="RUBRIK">Rubrik</OPTION> 	<OPTION VALUE="SIGNATUR">Signatur</OPTION> 	</SELECT> <INPUT TYPE="TEXT" NAME="SOKT" SIZE="30"> <input value="submit" type="image" src="../grafik/sokknapp.gif" border="0"> <INPUT TYPE="HIDDEN" NAME="METOD" VALUE="SOKA"></FORM></td></tr>';
        body.insertBefore(newmainmenu, maintable);
        var newsearchbar = document.createElement("table");
        newsearchbar.innerHTML='<tr><td>Diskussioner:<FORM action="discuss.asp" method="post"> <SELECT NAME="SOKMETOD"><OPTION VALUE="FRITEXT">Fritext</OPTION> <OPTION VALUE="RUBRIK">Rubrik</OPTION> 	<OPTION VALUE="SIGNATUR">Signatur</OPTION> 	</SELECT> <INPUT TYPE="TEXT" NAME="SOKT" SIZE="30"> <input value="submit" type="image" src="../grafik/sokknapp.gif" border="0"> <INPUT TYPE="HIDDEN" NAME="METOD" VALUE="SOKA"></FORM></td><td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>Recensioner:<form action="search.asp" method="get"> <select name="val"><option value="text">Fritexts&ouml;kning</option><option value="artistnamn">p&aring; artist</option><option value="skivnamn">p&aring; titel</option> <option value="bolag">p&aring; skivbolag</option> <option value="betyg">p&aring; betyg</option> <option value="ar">p&aring; sl&auml;pp&aring;r</option><option value="datum">p&aring; recensions&aring;r</option> <option value="recensent">p&aring; recensent</option></select> <font size="1"><input name="strang" size="20" ></font> <input value="submit" type="image" src="../grafik/sokknapp.gif" border="0">&nbsp;</form></td></tr>';
        // ====================================================================================================
        // L?gg till dom tv? dom tv? snea strecken f?re body.insertBefore(newdiscussionsearch, maintable); f?r att inaktivera s?kning i diskussionsforumet
        //body.insertBefore(newdiscussionsearch, maintable);
        
          // L?gg till dom tv? snea strecken f?re body.insertBefore(newsearch, maintable); f?r att inaktivera s?kning i recensionsdatabasen.
        //body.insertBefore(newsearch, maintable);
        
        // L?gger till en s?krad med b?da
        body.insertBefore(newsearchbar, maintable);
        // ====================================================================================================
        // ta bort den bl?a menyn
        mainmenu.parentNode.removeChild(mainmenu);
        
        var names = xpath("//TR/td[@class='inloggad']/strong");
        var brs = xpath("//TR/td[@class='inloggad']/br");
        var divz = xpath("//TR/td[@BGCOLOR='#eeeeee']");
        var discusstitle = xpath("//TR/td/b");
        var diskuteratboxtd = xpath("//TD[@WIDTH='197']");
        for (var i = 0; i < diskuteratboxtd.snapshotLength; i++) { 
        diskuteratboxtd.snapshotItem(i).setAttribute("bgcolor",boxcolor);
        }
        

        var headz = xpath("//HEAD").snapshotItem(0);
         var style = document.createElement("style");
        style.setAttribute("type","text/css");
        
        // CSS f?r sidan
        style.innerHTML = 'a:link {text-decoration: none;} a:visited {text-decoration: none; }'
       
        headz.appendChild(style);
        var tables =xpath("//TABLE[@WIDTH='350']");
        for (var i = 0; i < tables.snapshotLength; i++) { 
                var table = tables.snapshotItem(i); 
                table.setAttribute("bgcolor",boxcolor);
        }

        var discusstitletext = discusstitle.snapshotItem(0);
        
         var newtitle = document.createElement("td");
        newtitle.setAttribute("bgcolor",boxcolor);
        newtitle.innerHTML='<b>'+discusstitletext.innerHTML+'<b> ('+divs.snapshotLength+')';
        discusstitletext.parentNode.parentNode.appendChild(newtitle);
        discusstitletext.parentNode.parentNode.removeChild(discusstitletext.parentNode);
        
        // G?r diskuterat-bilden klickbar
        var disklink = document.createElement("a");
       disklink .setAttribute("href","/discuss.asp");
       disklink .setAttribute("alt","Diskuterat");
       diskimg = xpath("//IMG[@ALT='Diskuterat']").snapshotItem(0);
       diskimg.parentNode.insertBefore(disklink, diskimg);
       disklink.appendChild(diskimg);
       
       // G?r musiknyhet-bilden klickbar
        var musiklink = document.createElement("a");
       musiklink .setAttribute("href","/news.asp");
       musiklink .setAttribute("alt","Musiknyheter");
       musikimg = xpath("//IMG[@ALT='Musiknyheter']").snapshotItem(0);
       musikimg.parentNode.insertBefore(musiklink, musikimg);
       musiklink.appendChild(musikimg);
        
       // Fixa till diskussionstr?den
	for (var i = 0; i < divs.snapshotLength; i++) { 
                
		var div = divs.snapshotItem(i); 
                var happy = 1; 
                var entry = divz.snapshotItem(i); 
                var name = names.snapshotItem(i); 
                var br = brs.snapshotItem(i); 
                div.removeChild(name);
                div.removeChild(br);
                var newtd = document.createElement("td");
                newtd.setAttribute("bgcolor",bgcolor); 
                newtd.innerHTML='<b>'+name.innerHTML+'</b> '+div.innerHTML+'<br/>'+entry.innerHTML;
                    for(var j=0; j<antal_puckos; j++) {
      if(name.innerHTML.indexOf(puckos[j])!=-1) {
        if(dolj_helt==1) {
                div.parentNode.removeChild(div);
                entry.parentNode.removeChild(entry);
                happy=0;
        }
        else if(dolj_helt==0) {
                newtd.innerHTML='<b>'+name.innerHTML+'</b> '+div.innerHTML+'<br/><style color="'+bgcolor+'">'+entry.innerHTML+'</style>';
                div.parentNode.appendChild(newtd);
                div.parentNode.removeChild(div);
                entry.parentNode.removeChild(entry);
                happy = 0;
        }

      }
          }
      for(var j=0; j<antal_idoler; j++) {
      if(name.innerHTML.indexOf(idoler[j])!=-1) {
                newtd.innerHTML='<b>'+name.innerHTML+'</b> '+div.innerHTML+'<br/>'+entry.innerHTML;
                newtd.setAttribute("bgcolor", idolcolor);
                div.parentNode.appendChild(newtd);
                div.parentNode.removeChild(div);
                entry.parentNode.removeChild(entry);
                happy = 0;
      }
          }
          
          
              if(happy==1) {
                newtd.innerHTML='<b>'+name.innerHTML+'</b> '+div.innerHTML+'<br/>'+entry.innerHTML;
                div.parentNode.appendChild(newtd);
                div.parentNode.removeChild(div);
                entry.parentNode.removeChild(entry);
        }

                

                
        }
})();



        







