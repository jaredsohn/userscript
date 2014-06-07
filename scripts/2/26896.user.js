// ==UserScript==
// @name          Bgu.ac.il firefox helper 2 ---BETA---
// @namespace amirrima
// @description   adds a button in grades report thats enables you to view your grades as a table so you could open it with excel. ---BETA----
// @include  http://aristo4stu1.campus.ad.bgu.ac.il/reports/rwservlet
// ==/UserScript==

if (document.body.innerHTML.indexOf("תקציר&nbsp;רשומה&nbsp;אקדמי")>=0){	//checks if this is grades chart 
var a = document.getElementsByTagName('div');
var i=0;
var ar = new Array;
var tmptop=0;
var tmpright=0;
var tmpinnerhtml="";
var tmprightar = new Array;

var elem = document.createElement("input");
elem.setAttribute("value", "הצג דף בתור טבלה שאפשר לפתוח באקסל");
elem.setAttribute("alt", "view this page as a table so you could open it with excel");
elem.setAttribute("type", "button");
elem.addEventListener('click',viewastable,true);
document.getElementsByTagName("body")[0].appendChild(elem);
};
function sortNumber(a,b)
{
	return a - b;
}

function sortarray(a,b)
{
	return a[0] - b[0];
}

//adds instance to tmprightar
function addtmprightinstance(num)
{
	var j=0;
	for (j=0;j<tmprightar.length;j++)
		{
			if (tmprightar[j]==num){return};
		};
	tmprightar.push(num);
}

//returns tmpright's order number
function tmprighttonum(tmpright)
{
	var j=0;
	for (j=0;j<tmprightar.length;j++)
		{
			if (tmprightar[j]==tmpright){return j+1;};
		};
	return j;
}

function addtoarray(tmptop, tmpright, tmpinnerhtml)
{
	var j=0;
	var p=-1;
	var tmparray1 = new Array;
	var tmppp=0;
	// search if the array contains tmptop
	for (j=0;j<ar.length;j++){
		if (ar[j][0]==tmptop){
			p=j;
		};
	};
	tmppp=tmprighttonum(tmpright);
	if (p>=0) //the height exists in the array
	{
		ar[p][tmppp]=tmpinnerhtml;
	}
	else{
		tmparray1[0]=tmptop;
		tmparray1[tmppp]=tmpinnerhtml;
		ar.push(tmparray1);
	};

}

function viewastable()
{
//first run to arrange the tmprightar array
for (i=0;i<a.length;i++){
	var tmp = a[i].getElementsByTagName('span');
	if (tmp[0]){
		if (tmp[0].className=="f5"){
			tmpright=parseInt(a[i].style.right.split("pt")[0]);
			addtmprightinstance(tmpright);
		};
	};
};
//sort the tmprightar array
tmprightar.sort(sortNumber);

for (i=0;i<a.length;i++){
	var tmp = a[i].getElementsByTagName('span');
	if (tmp[0]){
		if (tmp[0].className=="f5")
		{
			tmptop=parseInt(a[i].style.top.split("pt")[0]);
			tmpright=parseInt(a[i].style.right.split("pt")[0]);
			tmpinnerhtml=tmp[0].innerHTML;
			addtoarray(tmptop,tmpright,tmpinnerhtml);
		};
	};
};
ar.sort(sortarray);
var outputstr="<table>";
var j=0;
var tmps="";
for (i=0;i<ar.length;i++)
{
	outputstr=outputstr+"<tr>"
	for (j=1;j<ar[i].length;j++){
		tmps=ar[i][j];
		if (!tmps){tmps=""}
		outputstr=outputstr+"<td>"+tmps+"</td>";
	};
	outputstr=outputstr+"</tr>"
}
outputstr=outputstr+"</table>";

document.body.innerHTML=outputstr;
};
