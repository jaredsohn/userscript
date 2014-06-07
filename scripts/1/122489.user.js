// ==UserScript==
// @name           AlliAttackHider
// @namespace      ALL
// @include        http://s*.kingsage.*/game.php?village=*&s=ally&m=attacks*
// ==/UserScript==
var alliregex=/.*~ODT~.*/

if(document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()) 
{
	var toptable=true;
} else
{
	var toptable=false;
}

var i=2
		do {
		i++
		if(toptable) {
			var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td[3]/a[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext();
		}
		if(alliregex.test(result.innerHTML))
		{
			if(toptable) {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","font-size:10px;height:10px;");
			}
		}
	} while(result!=null);