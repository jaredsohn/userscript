// ==UserScript==
// @name           bann_preview
// @namespace      banninations
// @include        http://www.bannination.com/*
// @include        http://www.bannination.com/?skip*

// ==/UserScript==
var spanArray = document.getElementsByTagName('td');
var tagArray = document.getElementsByTagName('tr');
var j=3;var k=0;var idnum=1;var b=spanArray.length/3-1;
var taggit=" ";var hl=1;
var imgdir="http://webmonkees.com/img/f/f";
var formdir="<form action=http://webmonkees.com/baNNers/frontimg.php method=post><input type=hidden value=";
var cu=0; var en=99; var baggit=" ";
var thread=""; var posty=""; var what="neat!";
//The magic cheeseburger numberz
var loc=new Array(34,35,48,84,85,92,93);
var mloc=new Array(34,35,48,84,85,92,93);
var pur=0; var paste=""; var ladle="";var reba="";var baggit="";
//e-76
//per line processing
for (lo = 0; lo < b; lo++){k=j+3;
	//can I has cheezeburger comment number?
	for (r=0; r<8; r++){
		if (taggit.slice(0,2) !=50){
		taggit=tagArray[hl].innerHTML;
		cu=taggit.length-loc[r];en=taggit.length-loc[r]+7;
		
	//	baggit=" Tot:"+taggit.slice(cu-83,en-85);
	//	reba=" Rel "+taggit.slice(cu-100,en-102);
	//	ladle=" Rec "+taggit.slice(cu-117,en-119);
	//	paste=" Act "+taggit.slice(cu-135,en-137);
		taggit=taggit.slice(cu,en);
		pur=Math.random()*72;
		};
						};
//thanks I has cheeseburger
thread=taggit;
thread=Math.round(pur);

taggit=taggit.slice(5,7);
if (taggit.slice(0,1)==0){taggit=taggit.slice(1,2);};
posty=formdir+thread+" name=thread><input type=hidden value="+what+" name=what><input type=image src=";
spanArray[j].innerHTML=paste+ladle+reba+baggit+posty+imgdir+thread+".gif width=54 height=11 border=0 alt="+taggit+" title="+taggit+">&nbsp;&nbsp;"+spanArray[j].innerHTML+"";
j=j+3; hl=hl+1;}