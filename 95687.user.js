// ==UserScript==
// @name					LyricWiki Filter WantedCategories
// @namespace			LWChris
// @description		Filter entries in Special:WantedCategories
// @include				http://lyrics.wikia.com/*Special:WantedCategories*
// ==/UserScript==

var URL=location.href;
var F=document.createElement("div");
F.setAttribute("id","cat_filter_list");
var Insert=document.getElementById("WikiaArticle").getElementsByTagName("div")[1];
Insert.insertBefore(F,Insert.getElementsByTagName("ol")[0]);
if(URL.indexOf("&filter=")>-1){
	var Filter=URL.substring(URL.indexOf("&filter=")+8,URL.length);
	Filter=decodeURIComponent((Filter.indexOf("&")==-1)?Filter:Filter.substring(0,Filter.indexOf("&")));
	var Before=URL.substring(0,URL.indexOf("&filter="));
	var After=URL.substring(URL.indexOf("&filter=")+8,URL.length);
	After=(After.indexOf("&")==-1)?"":After.substring(After.indexOf("&"),After.length);
	NewURL=Before+After;
	F.innerHTML='<b>Current filter: </b>"'+Filter+'" <span style="margin-right:1em">[<a title="Remove filter" href="'+NewURL+'" target="_self">x</a>'+']</span>';
}else{
	var Filter="";
	var NewURL=(URL.indexOf(".php")==-1)?"http://lyrics.wikia.com/index.php?title=Special:WantedCategories":URL;
};
var Filters=new Array();
var lis=document.getElementById("WikiaArticle").getElementsByTagName("li");
var linum=0;
for(linum in lis){
	var cat=lis[linum].getElementsByTagName("a")[0].firstChild.nodeValue;
	if(cat.indexOf("/")==-1){
		Filters[Filters.length]=(cat.indexOf(" ")==-1)?cat:cat.substring(0,cat.indexOf(" "));
	}else{
		Filters[Filters.length]=cat.substring(0,cat.indexOf("/"));
	};
	if(Filter!=""){
		if(cat.indexOf(Filter)<0){
			lis[linum].setAttribute("style","display:none");
		};
	};
};
Filters.sort();
var FilterNum=1;
while(FilterNum<Filters.length){
	if(Filters[FilterNum]==Filters[FilterNum-1]){
		Filters.splice(FilterNum,1);
		--FilterNum;
	};
	++FilterNum;
};
var Select=document.createElement("select");
Select.setAttribute("onChange","location.href=this.value");
Select.setAttribute("onKeyUp","location.href=this.value");
var O=document.createElement("option");
O.setAttribute("value",location.href);
var OT=document.createTextNode("Filter suggestions");
O.appendChild(OT); Select.appendChild(O);
for(FilterNum in Filters){
	if(Filters[FilterNum]!=Filter){
		O=document.createElement("option");
		O.setAttribute("value",NewURL+"&filter="+Filters[FilterNum]);
		OT=document.createTextNode(Filters[FilterNum]);
		O.appendChild(OT); Select.appendChild(O);
	};
};
F.appendChild(Select);