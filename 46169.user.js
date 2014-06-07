// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           West ATM Toolbar Mundo 5 by: fujis
// @namespace      www.the-west.com.pt/*
// @description    West ATM Toolbar Mundo 5
// @include        http://pt5.the-west.com.pt/*
// @version        1.2
// ==/UserScript==

tableIdIndex = 0;
trIdIndex = 0;
tdIdIndex = 0;

if(String(document.location).indexOf("javascript:AjaxWindow.show('forum');") > -1){
    window.setTimeout(function(){
	var adDiv = document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	 if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		document.body.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	 }
	}, 500);
}
else{
window.setTimeout(function() {
//Werbung entfernen (muss als erstes gemacht werden, dass "Hauptframe" definiert werden kann):
if(document.getElementsByTagName("frameset")[0]){
 if(document.getElementsByTagName("frameset")[0].cols){
 	document.getElementsByTagName("frameset")[0].cols = "*, 1";
	Hauptframe = frames[0].document;
 }
 else if(document.getElementsByTagName("frameset")[0].rows){
	document.getElementsByTagName("frameset")[0].rows = "1, *";
	Hauptframe = frames[1].document;
 }
 else Hauptframe = document;
}else Hauptframe = document;
//Village-Id holen
 var rawVillId = String(Hauptframe.location);
 VillId = rawVillId.substring(rawVillId.indexOf("village=")+8, rawVillId.indexOf("&"));
//Quickbar erstellen
 createQuickbarTable();
 createQuickbarShortcuts();
//Werbung im Forum entfernen
 deleteForumAds();
}, 500);
}

//Werbung im Forum l?schen:
window.deleteForumAds = function(){
  if(Hauptframe.getElementsByTagName('iframe')[0]){
	var forumFrame = Hauptframe.getElementsByTagName('iframe')[0];
	var doc = forumFrame.contentDocument;
	var docBody = doc.getElementsByTagName('body')[0];
	var adDiv = docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].childNodes[5];
	if(adDiv.childNodes[1] == "[object XPCNativeWrapper [object HTMLIFrameElement]]"){
		docBody.childNodes[5].childNodes[1].childNodes[0].childNodes[1].removeChild(adDiv);
	}
  }
}

window.newShortcut = function(imgSrc, aHref, text){
	var newImg = document.createElement("img");
	newImg.setAttribute("src", imgSrc);
	var newA = document.createElement("a");
	newA.setAttribute("href", aHref);
	newA.appendChild(newImg);
	var newText = document.createTextNode(text);
	newA.appendChild(newText);
	var newTd = document.createElement("td");
	newTd.setAttribute("id", "myQuickbarTd"+tdIdIndex);
	if(tdIdIndex == 0){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-right-style:none; background-color:#141E24; padding-left:4px; padding-right:4px; border-spacing:1px;"); 
	}
	else if(tdIdIndex == 5){
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-left-style:none; background-color:#141E24; padding-left:4px; padding-right:4px; border-spacing:1px;"); 
	}
	else{
		newTd.setAttribute("style", "border-width:1px; border-style:solid; border-left-style:none; border-right-style:none; background-color:#141E24; padding-left:4px; padding-right:4px; border-spacing:1px;");
	} 
	Hauptframe.getElementById("myQuickbarTr"+trIdIndex).appendChild(newTd);
	Hauptframe.getElementById("myQuickbarTd"+tdIdIndex).appendChild(newA);
	tdIdIndex++;
}
window.createQuickbarTable = function() {
	var firstHR = Hauptframe.getElementsByTagName("hr")[0];
	var newTable = document.createElement("table");
	newTable.setAttribute("id", "myQuickbarTable"+tableIdIndex);
	newTable.setAttribute("align", "center");
	newTable.setAttribute("style", "margin-top:5px;border-collapse:collapse;");
	var newTr = document.createElement("tr");
	newTr.setAttribute("id", "myQuickbarTr0");
	Hauptframe.getElementsByTagName("body")[0].insertBefore(newTable, firstHR);
	Hauptframe.getElementById("myQuickbarTable"+tableIdIndex).appendChild(newTr);
}

window.createQuickbarShortcuts = function() {
	"<tr>   " + 
	newShortcut("", "javascript:AjaxWindow.show('building_cityhall',{town_id:5},'5');", "Ed. Municipal");
newShortcut("", "javascript:AjaxWindow.show('building_bank',{town_id:5},'5');", "Banco");
newShortcut("", "javascript:AjaxWindow.show('building_hotel',{town_id:5},'5');", "Hotel");
newShortcut("", "javascript:AjaxWindow.show('building_gunsmith',{town_id:5},'5');", "Loja de Armas");
newShortcut("", "javascript:AjaxWindow.show('building_tailor',{town_id:5},'5');", "Alfaiate");
newShortcut("", "javascript:AjaxWindow.show('building_general',{town_id:5},'5');", "Loja");
newShortcut("", "javascript:AjaxWindow.show('building_mortician',{town_id:5},'5');", "Coveiro");

tableIdIndex++;
	trIdIndex++;
}
//inventory functions - TheWest++
function inv_updateTotalSellPrice (inv)
{
    var inv_TotalSellPrice = document.getElementById("inv_TotalSellPrice");
	if (!inv_TotalSellPrice)
	{
		inv_TotalSellPrice = document.createElement('div');
		inv_TotalSellPrice.setAttribute('id','inv_TotalSellPrice');
		inv.appendChild(inv_TotalSellPrice);
	}
	var equipworth=0;
	var bagworth=0; 
	var productworth=0; 
	var otherworth=0; 
	var bagInstance = unsafeWindow.Bag.getInstance();
	for(var p in bagInstance.items) 
	{ 
		var v = bagInstance.items[p].get_sell_price() * bagInstance.items[p].get_count_value();
		bagworth = bagworth + v;
		if (bagInstance.items[p].get_type()=='yield')
			productworth = productworth + v;
		else
			otherworth = otherworth + v;
	} 
	var w = unsafeWindow.Wear.wear;
	if (w.head) equipworth = equipworth + w .head.get_sell_price();
	if (w .body) equipworth = equipworth + w .body.get_sell_price();
	if (w .neck) equipworth = equipworth + w .neck.get_sell_price();
	if (w .right_arm) equipworth = equipworth + w .right_arm.get_sell_price();
	if (w .foot) equipworth = equipworth + w .foot.get_sell_price();
	if (w .yield) equipworth = equipworth + w .yield.get_sell_price();
	if (w .animal) equipworth = equipworth + w .animal.get_sell_price();
	if (w .yield) productworth = productworth + w .yield.get_sell_price();
	var total = equipworth + bagworth;
	inv_TotalSellPrice.innerHTML = 'ValorTotalVenda: $'+total+ ' Items para Vestir: $'+equipworth+ ', Mochila: $'+bagworth+'<br>'+ '(Produtos: $'+productworth+ ', Outros: $'+otherworth+')';
}
function checkWindows_ToAddFeatures ( )
{
  var inv = document.getElementById("window_inventory_content");
  if (inv)
  {
	inv_updateTotalSellPrice(inv);	
  }  
  setTimeout ( checkWindows_ToAddFeatures, 2000 );
}
//start up
setTimeout ( checkWindows_ToAddFeatures, 2000 );

// TheWest Reporter
(function(){
	var doc = document;
	var console = unsafeWindow.console;
	function $(id) { return(doc.getElementById(id)); }
	function xp1(x, p) {
		var r = doc.evaluate(x, p, null, 9, null).singleNodeValue;
		return(r);
	}
	function xp(x, p) {
		var r = doc.evaluate(x, p, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var len = r.snapshotLength;
		var ar = new Array(len);
		for(var i=0; i<len; i++) {
			ar[i] = r.snapshotItem(i);
		}
		return(ar);
	}
	function __tf(template, name) {
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				if (elName == name)
					return(p);
				if (p.children)
				{
					var q = __tf(p.children, name);
					if (q)
						return(q);
				}
			}
		}
		return(null);
	}
	function dc(template, parent)
	{
		// { thead: { el:null, attrs:{}, children: {} } }
		for(var elName in template)
		{
			if (template.hasOwnProperty(elName))
			{
				var p = template[elName];
				p.el = doc.createElement(p.tag);
				if (parent)
					parent.appendChild(p.el);
				
				if (p.attrs)
				{
					for(var atName in p.attrs)
					{
						if (p.attrs.hasOwnProperty(atName))
						{
							var atValue = p.attrs[atName];
							if (atName == "text")
								p.el.textContent = atValue;
							else if (atName == "html")
								p.el.innerHTML = atValue;
							else
								p.el.setAttribute(atName, atValue);
						}
					}
				}
				
				if (p.children)
				{
					dc(p.children, p.el);
				}
			}
		}
		template.find = function(name) {
			return(__tf(template, name));
		};
		return(template);
	}
	
	function repeat(c, n) {
		var s = "";
		for(var i=0; i<n; i++)
			s += c;
		return(s);
	}
	function padLeft(s, len, c) {
		c = c || " ";
		s = s.toString();
		if (s.length < len)
			s = repeat(c, len - s.length) + s;
		return(s);
	}
	function padRight(s, len, c) {
		c = c || " ";
		s = s.toString();
		if (s.length < len)
			s += repeat(c, len - s.length);
		return(s);
	}
	
	function convertDuelReport(div) {
		var x = {};
		x.p1 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[1]', div);
		x.loc = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[3]', div);
		x.p2 = xp1('./table/tbody/tr[2]/td[2]/div/div/table[1]/tbody/tr/td[5]', div);
		x.hitsBody = xp1('./table/tbody/tr[2]/td[2]/div/div/table[2]/tbody', div);
		x.p1injuries = xp('./tr/td[1]/span', x.hitsBody);
		x.p2injuries = xp('./tr/td[3]/span', x.hitsBody);
		x.outcome = xp1('./table/tbody/tr[2]/td[2]/div/div/h4', div);
		
		var rex, m;
	
		rex = /[\n\t\r]+([^\n\t\r]+)[\n\t\r]+Level\s(\d+)[\n\t\r]+Dueling\slevel\s(\d+)/i;
		m = x.p1.textContent.match(rex);
		var p1 = { name: m[1], level: m[2], dlevel: m[3] };
		m = x.p2.textContent.match(rex);
		var p2 = { name: m[1], level: m[2], dlevel: m[3] };
		
		rex = /[\n\t\r]+Duel\slocation[\n\t\r]+([^\n\t\r]+)/i;
		m = x.loc.textContent.match(rex);
		var location = m[1];

		function getHits(pinj) {
			var rex1 = /Strike:\s(.+)/i;
			var rex2 = /-\s(\d+)\sHP/i;
			var rex3 = /(Total)\shealth/i;
			
			var injuries = [];
			var hit = null;
			
			for(var i=0; i<pinj.length; i++) {
				var t = pinj[i].textContent;
				m = t.match(rex1);
				if (m) {
					hit = { pos: m[1], damage: "" };
				} else {
					m = t.match(rex3);
					if (m) {
						hit = { pos: "Total", damage: "" };
					} else {
						m = t.match(rex2);
						if (m) {
							hit.damage = m[0];
							injuries.push(hit);
							hit = null;
						} else {
							hit = { pos: t, damage: "" };
							injuries.push(hit);
							hit = null;
						}
					}
				}
			}
			return(injuries);
		}
		
		p1.injuries = getHits(x.p1injuries);
		p2.injuries = getHits(x.p2injuries);
		
		var outcome = x.outcome.textContent;

		var fs = 25;
		var code = "[code]\n";
		code += "+-------------------------------------------------------+\n";
		code += "| " + padRight("Location: " + location, 53) + " |\n";
		code += "+-------------------------------------------------------+\n";
		code += "| " + padRight(p1.name, fs) + " | " + padRight(p2.name, fs) + " |\n";
		code += "| " + padRight("Level: " + p1.level, fs) + " | " + padRight("Level: " + p2.level, fs) + " |\n";
		code += "| " + padRight("Dueling level: " + p1.dlevel, fs) + " | " + padRight("Dueling level: " + p2.dlevel, fs) + " |\n";
		code += "+---------------------------+---------------------------+\n";
		for(var i=0; i<p1.injuries.length; i++) {
			var h1 = p1.injuries[i];
			var h2 = p2.injuries[i];
			if (i == p1.injuries.length - 1)
		code += "+---------------------------+---------------------------+\n";
			code += "| " + padRight(h1.pos, 15) + padLeft(h1.damage, 10) + " | " + padRight(h2.pos, 15) + padLeft(h2.damage, 10) +" |\n";
		}
		code += "+-------------------------------------------------------+\n";
		code += "[/code]\n\n";
		code += outcome;
		
		div.innerHTML = '<textarea style="width:100%;height:100%;">' + code + '</textarea>';
		div.childNodes[0].select();
	}
	
	function hookReport(div) {
		var titleRow = xp1('./table/tbody/tr[2]/td[2]/div/table/tbody/tr', div);
		if (!titleRow) return;

		if (!titleRow.textContent.match(/Duel:/))
			return;
		
		var t = dc({
			"th": { 
				tag: "th", 
				children: {
					"btn": {
						tag: "button",
						attrs: {
							text: "Convert",
							title: "Convert to forum code"
						}
					}
				}
			}
		});
		titleRow.appendChild(t["th"].el);
		t.find("btn").el.addEventListener("click", function() { convertDuelReport(div); }, false);
	}
	
	//
	// Start up
	//
	var loc = doc.location;
	var o_show = unsafeWindow.AjaxWindow.setJSHTML;
	var f = function(div, content) {
		if (!div) return;
		var ret = o_show(div, content);
		hookReport(div);
		return(ret);
	};
	for(var o in o_show) {
		f[o] = o_show[o];
	}
	unsafeWindow.AjaxWindow.setJSHTML = f;
	
})();