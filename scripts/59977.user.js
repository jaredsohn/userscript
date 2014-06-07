// ==UserScript==
// @name           tk script 01
// @namespace      lintabá
// @include        http://*thrillion.hu/*
// ==/UserScript==
var config={
	weapornType:"C",
};


var x=document.querySelectorAll("select[name=trick]>option");
for(var i=0;i<x.length;i++){
	var t=x[i].innerHTML.split(" [")[1].split("]")[0];
	if(t!=config.weapornType){
		x[i].parentNode.removeChild(x[i]);
	}
}
if(x.length!=0){
	document.querySelector("select[name=tactic]").selectedIndex=3;
}
if(location.href.match("char.php")!=null){
	var stats=[];
	var qs=document.querySelectorAll("body>table>tbody>tr>td>table>tbody>tr>td>table>tbody>tr>td>table>tbody>tr>td>ul>table>tbody>tr");
	for(var i=1;i<5;i++){
		stats.push(qs[i].cells[2].textContent)
	}
	if(stats.length==4){
		GM_setValue("stats",stats.join(","));
	}
}
var x=document.querySelectorAll("form");
for(var i=0;i<x.length;i++){
	if(x[i].action.match("work.php")!=null){
		var y=x[i].getElementsByTagName("tr");
		var max=0;
		var maxn=-1;
		for(var j=0;j<y.length;j++){
			var q=y[j].cells[1].innerHTML.split(" ");
			var stats=GM_getValue("stats","0,0,0,0").split(",");
			var van=-1;
			switch(q[1]){
				case "Ügyesség":van=stats[1];break;
				case "Egészség":van=stats[2];break;
				case "Észlelés":van=stats[3];break;
			}
			if(q[1].length<4){van=stats[0];}
			if(van<q[2]){
				y[j].cells[0].childNodes[1].disabled=true;
				continue;
			}
			var fizet=parseInt(y[j].cells[2].textContent.split(": ")[1]);
			if(max<fizet){max=fizet;maxn=j;}
		}
		if(maxn!=-1){
			y[maxn].getElementsByTagName("input")[0].checked=true;
			y[maxn].getElementsByTagName("td")[0].style.backgroundColor="#050";
		}
	}
}