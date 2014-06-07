// ==UserScript==
// @name           RFL orders II (eRepublik)
// @namespace      ;)
// @author         jang (xlvxjang)
// @version        0.14b
// @releasedate	070320101448
// @include        http://www.erepublik.com/en*
// @include        http://www.erepublik.com/ru*
// @include        http://www.erepublik.com/de*
// @include        http://www.erepublik.com/hu*
// @include        http://www.erepublik.com/ru*
// @description    RFL orders for eRepublik from www.erespublika.ru. 
// ==/UserScript==

CurrentReleaseDate = "070320101448";
var ordersurl = "http://www.erespublika.ru/forum/index.php/topic,3000.3000.html";

if(document.getElementById("shouts"))
{
 GM_xmlhttpRequest({
  method: "GET",
  url: ordersurl,
  onload:function(response){
   orders = response.responseText;
   var log = orders;

		log = log.split('<title>')[1];
		log = log.split('</title>')[0];
		str = log.search("ORDERS FOR");
		if (str == 0)
		{
		parts = orders.split('class="bbc_size">');
		arr_length = parts.length;
		day = parts[arr_length - 1].split("<br")[0];		
		orders = parts[arr_length - 1].split('<div class="moderatorbar">')[0];
		}
		else
		{
			day = "";
			orders = "<B>LOG IN TO <A href='http://www.erespublika.ru/'>www.erespublika.ru</A></B>!";
		}				

			 box = document.createElement("div");
			 box.className = "box";
			 box.id = "orderbox";
			 title = document.createElement("div");
			 title.className = "btitle";
			 title.innerHTML = '<embed class="sIFR-flash" width="250" height="28" src="/flash/delicious.swf" quality="best" flashvars="txt=RFL '+day+' orders&&textcolor=#737373&hovercolor=null&linkcolor=null&w=250&h=28" wmode="transparent" bgcolor="transparent" sifr="true" type="application/x-shockwave-flash" style="width: 250px; height: 28px;"/>'
			 box.appendChild(title);

				/* // не надо таб
			 tabs = document.createElement("ul");
			 tabs.className = "tabs";
             tabs.id = "orderstabs";
			  newtab = document.createElement("li");
			  newtab.id = "tab_1";
			  newtab.className = "last";
			  newlink = document.createElement("a");
			  newlink.innerHTML = "<span>RFL</span>";
			  newlink.href = "#";
			  newlink.className = "on";			  
			  newtab.appendChild(newlink);
			  tabs.appendChild(newtab);
			 box.appendChild(tabs);
			 */
				
			 ordersdiv = document.createElement("div");				
			 ordersdiv.innerHTML = orders;							 
			 ordersdiv.id = "ordersdiv";
			 ordersdiv.style.cssFloat = "left";
			 ordersdiv.style.padding = "10px";
			 ordersdiv.style.width = "313px";
			 ordersdiv.style.fontSize = "14px";
			 ordersdiv.style.background = "#E9F5FA";
				linkdiv = document.createElement("div");
				//linkdiv.style.margin-top = "20px";
				linkdiv.setAttribute("align", "center");
				linkdiv.setAttribute("style", "margin-top: 20px;");
				linkdiv.innerHTML = "<HR><A HREF='http://www.erespublika.ru/forum/index.php/topic,3000.3000.html#lastPost' target='_blank'>Check orders in forum</A>";	
				ordersdiv.appendChild(linkdiv);	
			 box.appendChild(ordersdiv);
			 shouts = document.getElementById("shouts");
			 shouts.parentNode.insertBefore(box,shouts);
			 GM_addStyle("#orderstabs {margin: 0px;} #orderstabs li a {padding-left:20px;} #orderstabs li a span {padding-right:20px;padding-left:0px;}#content #ordersbox.box .btitle {border-bottom:0 none; margin-bottom:0px;}")		
			 updateCheck();
  }
 });
 
var updateCheck = function (){		
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/source/70270.meta.js',
			
			onload:function(updateDetails){
				var updateText = updateDetails.responseText.match(/@releasedate\s*\d+/);
				if (updateText[0].match(/\d+/) > CurrentReleaseDate) {					
					updateel = document.createElement("ul");
					 updateel.className = "tabs";
					 updateel.id = "UpdateYesNo";					 
					var updatehere = '<br><hr><a href="http://userscripts.org/scripts/show/70270" target="_blank">';
					var updatehere = updatehere +'<center><strong>UPDATE!</strong></center></a><hr>';
					updateel.innerHTML = updatehere;
					box.appendChild(updateel);					
				}
			}
		});
	
}

}

