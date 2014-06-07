// ==UserScript==
// @name           Bot_Test
// @namespace      Bot_Test
// @include        http://www.physik09.de/Forum/adm/index.php*
// ==/UserScript==

if(!location.href.match(/i=users&.*?mode=overview.*/)){return;}
var ev = new XPathEvaluator();
var ip= ev.evaluate("id('user_overview')/fieldset/dl[3]/dd[1]/a", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);
if(!ip.singleNodeValue){ip= ev.evaluate("id('user_overview')/fieldset/dl[4]/dd[1]/a", document.documentElement, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null);}
if(ip.singleNodeValue){
GM_xmlhttpRequest({
		  method: "GET",
		  url: "http://www.stopforumspam.com/ipcheck/"+ip.singleNodeValue.innerHTML,
		  onload: function(response) {
			var spam="";
			var ma = response.responseText.match(/[\d\.]+ appears in our database (\d+) times/);
			if(!ma){window.open("http://www.stopforumspam.com/ipcheck/"+ip.singleNodeValue.innerHTML, 'tab1');}
			if(ma[1]=="0"){spam="No Bot";
			ip.singleNodeValue.parentNode.innerHTML+="&nbsp;&nbsp;&nbsp; - "+spam+"</a>"
			}else{
			spam="That's a Bot";
			ip.singleNodeValue.parentNode.innerHTML+="&nbsp;&nbsp;&nbsp;<a href='http://www.stopforumspam.com/ipcheck/"+ip.singleNodeValue.innerHTML+"'>"+response.responseText.match(/ class="imgnopadb" alt="([^"]+)"/)[1]+ " - "+spam+"</a>"
			}
			
		  }
		});
}