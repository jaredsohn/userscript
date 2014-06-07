// ==UserScript==
// @name           iso mailto-link to clear Text
// @namespace      jm
// @description    changes mailto links from iso-ISO8859-1 (Thunderbird don't like) format to clear Text
// @include        example.com
// ==/UserScript==




var links = document.getElementsByTagName('a');
var x;

        function SuchenUndErsetzen(QuellText, SuchText, ErsatzText)
        {  // Erstellt von Ralf Pfeifer (www.arstechnica.de)
           // Fehlerpruefung
                if ((QuellText == null) || (SuchText == null))            { return null; }
            if ((QuellText.length == 0) || (SuchText.length == 0))  { return QuellText; }

            // Kein ErsatzText ?
                if ((ErsatzText == null) || (ErsatzText.length == 0))   { ErsatzText = ""; }

            var LaengeSuchText = SuchText.length;
                var LaengeErsatzText = ErsatzText.length;
            var Pos = QuellText.indexOf(SuchText, 0);

                while (Pos >= 0)
            {
                    QuellText = QuellText.substring(0, Pos) + ErsatzText + QuellText.substring(Pos + LaengeSuchText);
                Pos = QuellText.indexOf(SuchText, Pos + LaengeErsatzText);
            }
            return QuellText;
        } // -->
 

for(x in links) 
{
	var href = links[x].href;
	if(href != null && href.substring(0,7) == "mailto:") 
	{
		try {
			ErgebnisTexteins = SuchenUndErsetzen(href, "%0A", "*ZeilenUmbruch*") //convert line breaks
			ErgebnisTextzwei =  unescape(ErgebnisTexteins)
			links[x].href = SuchenUndErsetzen(ErgebnisTextzwei, "*ZeilenUmbruch*", "%0A") //and back
			} catch (e) {}
	}
}
