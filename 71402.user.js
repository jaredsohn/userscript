// ==UserScript==
// @name           tribalwars-ranking-Resources-plapl
// @namespace      Die Stämme
// @description    Ermoeglicht es, in der Produktions-Uebersicht die Doerfer nach Rohstoffen zu sortieren
// @include        http://*.tribalwars.*/game.php?*&screen=overview_villages*
// ==/UserScript==

if(!document.getElementsByClassName("selected")[0].innerHTML.match("الانتاج")) return;

var vis = document.getElementsByClassName("vis"), ds_speicherstaende = false;
for(var i=0;i<vis.length;i++){
	if(vis[i].innerHTML.match("الموارد")){
		var table = vis[i];
		var ths = table.getElementsByTagName("th");
		for(var i=0;i<ths.length;i++){
			if(ths[i].firstChild.nodeValue == "الموارد"){
				var th = ths[i];
				break;
			}
		}
		break;
	}
//	ds speicherstände
	else if(vis[i].innerHTML.match("Holz.+Lehm.+Eisen")){
		var table = vis[i];
		var ths = table.getElementsByTagName("th");
		ds_speicherstaende = true;
	}
}
if(!(table && (th || ds_speicherstaende))){
	GM_log("لم يتم العثور على الجدول.");
	return;
}
var links = [], icons = [];
for(var i=0;i<3;i++){
	links[i] = document.createElement("a");
	links[i].setAttribute("href","#");
	links[i].setAttribute("onclick","return false");
	links[i].setAttribute("id","l"+i);
	links[i].addEventListener("click",function(){sort(parseInt(this.id.charAt(1)));},true);
	var name;
	switch(i){ case 0: name="holz"; break; case 1: name="lehm"; break; case 2: name="eisen"; break; }
	if(ds_speicherstaende){
		links[i].innerHTML = name.charAt(0).toUpperCase()+name.substr(1);
		ths[2+2*(i+1)].replaceChild(links[i],ths[2+2*(i+1)].firstChild);
	}
	else{
		icons[i] = new Image(13,13);
		icons[i].src = "graphic/"+name+".png";
		icons[i].title = name;
		links[i].appendChild(icons[i]);
		th.appendChild(document.createTextNode(" "));
		th.appendChild(links[i]);
	}
}

var order = null;

function sort(num){
	var rows = table.getElementsByTagName("tr");
	var ress = [], villages = [], rownum = 1;
	for(var i=1;rows.length>rownum;i++){
		if(rows[rownum].getElementsByTagName("th").length > 3){
			rownum = 2;
			continue;
		}
		if(ds_speicherstaende){
			var rRess = new Array(4);
			rRess[num] = rows[rownum].getElementsByTagName("td")[4+2*num].innerHTML.replace(/\D/g,"");
		}
		else	var rRess = rows[rownum].getElementsByTagName("td")[2].innerHTML.replace(/<img[^>]+>/g,"").replace(/<span class="grey">\.<\/span>/g,"").replace(/<span class="warn">(\d+)<\/span>/g,"$1").split(" ");
		if(rRess.length != 4) continue;
		ress[i] = [i,rRess[num]];
		var len = rows.length;
		villages[i] = table.childNodes[1].removeChild(rows[rownum]);
		if(len == rows.length){
			alert("تم العثور عليه في حلقة لا نهائية. التي من شأنها أن تؤدي إلى انهيار المتصف");
			break;
		}
	}
	ress.shift();
	if(rownum==2) ress.shift();
	ress.sort(function(a,b){ return a[1]-b[1]; });
	if(order !== num) ress.reverse();
	order = (order===num ? null : num);
	for(var i=0;i<ress.length;i++){
		table.childNodes[1].appendChild(villages[ress[i][0]]);
	}
}