// ==UserScript==
// @name          Scrapbook Searcher
// @namespace     Zamaan
// @description	  Search Your Scrap Book Easily !
// @include       http://www.orkut.com/*
window.addEventListener("load", function(e) {
divTags=document.getElementsByTagName('div');
var divElement = document.createElement('div');
if(document.location.href.indexOf("Scrapbook.aspx")>=0)
{
	var scriptStr='';
	scriptStr+='function searchScrap()';
	scriptStr+='{';
	scriptStr+='var searchText=document.getElementById(\'searchText\').value;';
	scriptStr+='if(searchText=="") { alert("Please enter a search text!"); return; }';
	scriptStr+='document.location.href=document.location.href.split("&searchText=")[0]+"&searchText="+searchText;}';
	var scriptElement=document.createElement('script');
	scriptElement.language='Javascript';
	scriptElement.innerHTML=scriptStr;
	document.getElementsByTagName('head')[0].appendChild(scriptElement);
	var str='';
	str+='  <table class="panel" border="0" cellpadding="0" cellspacing="0" width="100%" >';
	str+='  <tr><td class="panel">';
	str+='  <table align="center">';
	str+='  <tr>';
	str+='  <td>';
	str+='  <input id="searchText" name="searchText" type="text" size="40" class="textbox" value="">';
	str+='  <\/td>';
	str+='  <td>';
	str+='  <table class="btn" border="0" cellpadding="0" cellspacing="0" onmouseover="this.className=\'btnHover\'" onmouseout="this.className=\'btn\'">';
	str+='  <tr style="cursor: pointer;" onclick="searchScrap();">';
	str+='  <td><img src="http:\/\/images3.orkut.com\/img\/bl.gif" alt="" \/><\/td>';
	str+='  <td nowrap style="background: url(http:\/\/images3.orkut.com\/img\/bm.gif)">';
	str+='  search scrapbook';
	str+='  <\/td>';
	str+='  <td><img src="http:\/\/images3.orkut.com\/img\/br.gif" alt="" \/><\/td>';
	str+='  <\/tr>';
	str+='  <\/table>';
	str+='  <\/td>';
	str+='  <\/tr>';
	str+='  <\/table>';
	str+='  <\/td><\/tr>';
	str+='  <\/table>';
	str+='  <img src="img/b.gif" alt="" height="10" width="10" />';
	divElement.setAttribute('id','scrapbookSearch');
	divElement.innerHTML=str;
	document.body.insertBefore(divElement,document.getElementsByTagName('table').item(2));
}
if(document.location.href.indexOf("Scrapbook.aspx")>=0&&(GM_getValue("search",false)||document.location.href.indexOf("searchText")>=0))
{	
	if(document.location.href.indexOf("searchText")>=0)
	{
		var x=document.location.href.split("searchText=")[1];
		while(x.indexOf("%20")>=0){x=x.replace("%20"," ");}
		GM_setValue("searchText",x);
		GM_setValue("search",true);
	}
	var searchText = GM_getValue("searchText","default_text_1231232");
	var l=0;
	for(var i=0;i<divTags.length;i++)
	{
		if(divTags[i].innerHTML.indexOf('Profile.aspx')>=0)
		{
			var j=divTags[i].innerHTML.indexOf(searchText);
			if(j>=0)
			{
				var splitted=divTags[i].innerHTML.split(searchText);
				var finalString = '';
				for(var k=0;k<splitted.length-1;k++)
				{
				 finalString += divTags[i].innerHTML.split(searchText)[k]+'<font color="red"><b>'+searchText+"</b></font>";
				}
				finalString+=divTags[i].innerHTML.split(searchText)[k];
				divTags[i].innerHTML=finalString;
				l++;
			}
		}
	}
	if(l==0)
	{
		var anchorTags=document.getElementsByTagName('a');
		for(var i=0;i<anchorTags.length;i++)
		{
			if(anchorTags[i].innerHTML.indexOf('next &gt;')>=0)
			{
				document.location.href=anchorTags[i].href;
			}
		}
	}
}
if(document.location.href.indexOf("Home.aspx")>=0)
{
	GM_setValue("search",false);
	GM_setValue("searchText","default_text_1231232");
}
}, false);