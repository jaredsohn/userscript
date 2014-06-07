// ==UserScript==
// @name           Truppensummen-Helfer
// @namespace      All
// @version        1.1
// @include        http://s5.kingsage.de/game.php?*&s=overview_villages&m=1
// ==/UserScript==

abfrage=confirm("Bist du im Truppensummentool eingeloggt ?")
		if(abfrage) {
			try {
				headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
				span=headtable.colSpan
				if(span > 5) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<th></th><th></th>";
					var i=2
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<th></th><th></th>";
					var i=1
				}
				do {
					i++
					var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
						name=result.getAttribute("title")
						vil_name=result.firstChild.firstChild.firstChild.innerHTML
						
						regex=/\((\d{3})\|(\d{3})\)/
						if(regex.exec(name)) {
							x=RegExp.$1
							y=RegExp.$2
							templer=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[6]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							knappe=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[7]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							berserker=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[8]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							langbogen=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[9]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							spy=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[10]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							kreuz=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[11]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							black=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[12]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							ram=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[13]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							kata=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[14]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							graf=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[15]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML
							if(isNaN(templer)) {templer=0}
							if(isNaN(knappe)) {knappe=0}
							if(isNaN(berserker)) {berserker=0}
							if(isNaN(langbogen)) {langbogen=0}
							if(isNaN(spy)) {spy=0}
							if(isNaN(kreuz)) {kreuz=0}
							if(isNaN(black)) {black=0}
							if(isNaN(ram)) {ram=0}
							if(isNaN(kata)) {kata=0}
							url="http://bitzones.net/adelsplaner/truppensummentool.php?submit=add&x="+x+"&y="+y+"&vil_name="+vil_name+"&templer="+templer+"&knappe="+knappe+"&berserker="+berserker+"&langbogen="+langbogen+"&kundschafter="+spy+"&kreuzritter="+kreuz+"&schwarze_ritter="+black+"&sturmbock="+ram+"&tribock="+kata+"&graf="+graf+""
							url2="http://bitzones.net/adelsplaner/truppensummentool.php?submit=update&x="+x+"&y="+y+"&vil_name="+vil_name+"&templer="+templer+"&knappe="+knappe+"&berserker="+berserker+"&langbogen="+langbogen+"&kundschafter="+spy+"&kreuzritter="+kreuz+"&schwarze_ritter="+black+"&sturmbock="+ram+"&tribock="+kata+"&graf="+graf+""
							
							document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td><a href='"+url+"' target='_blank'>Eintragen</a></td>"+"<td><a href='"+url2+"' target='_blank'>Updaten</a></td>";
						}
					} else
					{
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td></td><td></td>";
						break;
					}
				} while(result!=null);
			} catch(e) {}
		}