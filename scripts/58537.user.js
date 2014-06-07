// ==UserScript==
// @name          Studi Links zu richtigen Links
// @namespace     
// @description   In Studi VZ werden Links mit Leerzeichen aufgeführt, um zu vermeiden, dass Studi im Referer steht, externe Links für Bots unzugänglich sind, kein Plan... Auf jeden Fall ist es Blödsinn... hiermit geht es eben doch... Sollte es euch den authentischen Studi-Spaß nehmen, schaltet ihr den Grease-Affen einfach aus. ;) viel Spaß!
// @include       http://*studivz*
// @exclude       
// @author        Ralf Jäger
// ==/UserScript==

function getElementsByClass(searchClass,node,tag) {
        var classElements = new Array();
        if ( node == null )
                node = document;
        if ( tag == null )
                tag = '*';
        var els = node.getElementsByTagName(tag);
        var elsLen = els.length;
        var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
        for (i = 0, j = 0; i < elsLen; i++) {
                if ( pattern.test(els[i].className) ) {
                        classElements[j] = els[i];
                        j++;
                }
        }
        return classElements;
}


Elements=getElementsByClass('comment-content',null,'div');

var regex=/((https?):\/\/([A-Za-z0-9\-%=\?&\(\) ]{1,}(\.|\/)){1,}[A-Za-z\?0-9\-%=&\(\) ]{1,}\/?)/g;

function leer_weg(string)
{
string=string.replace(/%20/g,"");
string=string.replace(/ /g,"");

return string;

//return liste;
}

var regex=/((https?):\/\/([A-Za-z0-9\-%=\?&\(\) ]{1,}(\.|\/)){1,}[A-Za-z\?0-9\-%=&\(\) ]{1,}\/?)/g;
var Rette=new Array();

	for ( var s = 0; s < Elements.length; s++)
	{
	    Rette[s]=Elements[s].getElementsByTagName('div')[0].innerHTML;
		Elements[s].innerHTML=Elements[s].innerHTML.replace(regex,"<a href=\"$1\">$1</a>");
	}

for ( var g = 0; g < Elements.length; g++)	
{
for ( var f = 0; f < Elements[g].getElementsByTagName("a").length; f++)
{

if (Elements[g].getElementsByTagName("a")[f].parent==Elements[g])
{

if (!Elements[g].getElementsByTagName("a")[f].innerHTML.search(/eintrag/))
{
Elements[g].getElementsByTagName("a")[f].innerHTML=leer_weg(Elements[g].getElementsByTagName("a")[f].innerHTML);
}
Elements[g].getElementsByTagName("a")[f].href=leer_weg(Elements[g].getElementsByTagName("a")[f].href);
}
}
}


	for ( var s = 0; s < Elements.length; s++)
	{
	    Elements[s].getElementsByTagName('div')[0].innerHTML=Rette[s];		
	}
	
//document.title="TEST";