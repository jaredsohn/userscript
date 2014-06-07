// ==UserScript==
// @name           収益率計算
// @namespace      収益率計算
// @include        http://kabistrike.ddo.jp/ny/management/*
// ==/UserScript==
d = document;
cnum = 2;
err = d.getElementsByClassName('alert-message block-message error').item(0);
if(err != null){
	cnum = 3;
}
cont = d.getElementsByClassName('container').item(cnum);
td = cont.getElementsByTagName('td');
tx = "";
num = 0;
rates = new Array(10);
for(var i=1;i<td.length;i++){
	a = td.item(i-1).innerHTML;
	b = td.item(i).innerHTML;
	if(a.match(/\$/)&& b.match(/\$/)){
		cost = parseInt(a.replace(/\$|\,/g,""));
		gain = parseInt(b.replace(/\$|\,/g,""));
		rate = gain*100/cost;

		tx = " (収益率 = "+rate+" %)";
		tNode = d.createTextNode(tx);
		td.item(i-2).appendChild(tNode);

		rates[num] = new Array(rate,i);
		num++;
	}
}
function desc(x,y){ return y[0]-x[0]; }
rates.sort(desc);

fst = d.createElement("a");
fst.setAttribute("name","top");
jump = rates[0][1]-5;
if(jump>0){
	td.item(jump).appendChild(fst);
}
div = d.createElement("div");
div.setAttribute("class","nav secondary-nav");
hash = d.createElement("a");
hash.setAttribute("href","#top");
gostar = d.createTextNode("★");
hash.appendChild(gostar);
div.appendChild(hash);
d.getElementsByTagName('h2').item(0).appendChild(div);



sn=0;
for(var t=0;t<rates.length;t++){
	switch(sn){
		case 0:
			stars5 = d.createTextNode("★★★★★");
			td.item(rates[t][1]-3).appendChild(stars5);
			break;
		case 1:
			stars4 = d.createTextNode("☆☆☆☆");
			td.item(rates[t][1]-3).appendChild(stars4);
			break;
		case 2: 
			stars3 = d.createTextNode("☆☆☆");
			td.item(rates[t][1]-3).appendChild(stars3);
			break;
		case 3:
			stars2 = d.createTextNode("☆☆");
			td.item(rates[t][1]-3).appendChild(stars2);
			break;
		case 4:
			stars1 = d.createTextNode("☆");
			td.item(rates[t][1]-3).appendChild(stars1);
			break;
	}
	if(rates[t][0] != rates[t+1][0]){sn++;}
}