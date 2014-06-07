// ==UserScript==
// @name       MyDealz Blacklist
// @namespace  http://use.i.E.your.homepage/
// @version    0.2
// @description  Entfernt Dealz aus HUKD, die bestimmte Begriffe im Titel enthalten. Ich verwende es, um lokale Deals auszublenden.
// @match      http://hukd.mydealz.de/*
// @exclude http://hukd.mydealz.de/profile/*
// @copyright  2013+, bootsmaat
// Die folgende Zeile soll verhindern, dass das Script sich automatisch updatet und die Blacklist dabei zurückgesetzt wird
// @updateURL about:blank
// ==/UserScript==

// Hier die Begriffe ergänzen, nach denen gefiltert werden soll.
// Deals, die diese Begriffe im Titel enthalten, werden ausgeblendet.
// Groß- und Kleinschreibung wird nicht berücksichtigt.
// Sonderzeichen müssen mit Backslash "\" escaped werden.
var pattern = /(lokal|steam|Berlin|Hamburg|München|Köln|Frankfurt|Stuttgart|Düsseldorf|Dortmund|Essen|Bremen|Dresden|Leipzig|Hannover|Nürnberg|Duisburg|Bochum|Wuppertal|Bonn|Bielefeld|Mannheim|Münster|Wiesbaden|Augsburg|Aachen|Mönchengladbach|Gelsenkirchen|Braunschweig|Chemnitz|Kiel|Krefeld|Halle|Magdeburg|Freiburg|Oberhausen|Lübeck|Erfurt|Rostock|Mainz|Kassel|Hagen|Hamm|Saarbrücken|Mülheim|Herne|Ludwigshafen am Rhein|Osnabrück|Oldenburg|Leverkusen|Solingen|Potsdam|Neuss|Heidelberg|Paderborn|Darmstadt|Regensburg|Würzburg|Ingolstadt|Heilbronn|Ulm|Wolfsburg|Göttingen|Offenbach|Pforzheim|Recklinghausen|Bottrop|Fürth|Bremerhaven|Reutlingen|Remscheid|Koblenz|Gladbach|Erlangen|Moers|Trier|Jena|Siegen|Hildesheim|Salzgitter|Cottbus)/gi;
var counter = 0;
$$('a.thread-tl-lnk').forEach(function (l) {

    if(l.textContent.match(pattern)) {
        var li = l.parentNode.parentNode.parentNode.parentNode;
    	if (li) {
  			li.parentNode.removeChild(li);
            counter++;
		}
    }
});

console.log(counter + " Dealz ausgeblendet");
    
function $$(xpath,root) { 
  xpath = xpath
    .replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3')
    .replace(/\.([\w-]+)(?!([^\]]*]))/g, '[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]')
    .replace(/#([\w-]+)/g, '[@id="$1"]')
    .replace(/\/\[/g,'/*[');
  str = '(@\\w+|"[^"]*"|\'[^\']*\')';
  xpath = xpath
    .replace(new RegExp(str+'\\s*~=\\s*'+str,'g'), 'contains($1,$2)')
    .replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'), 'starts-with($1,$2)')
    .replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'), 'substring($1,string-length($1)-string-length($2)+1)=$2');
  var got = document.evaluate(xpath, root||document, null, 5, null);
  var result=[];
  while (next = got.iterateNext())
    result.push(next);
  return result;
}