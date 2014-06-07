// ==UserScript==
// @name           w3schoolsBeautifyer
// @namespace      smk
// @description    kills random stuff, widens, etc.
// @include        http://w3schools.com/*
// @include        http://*.w3schools.com/*
// ==/UserScript==

function getTable(){
	var table;
	table=document.evaluate('//td[@align="center"]/div',document,null,9,null).singleNodeValue;
	if(table) table=table.nextSibling;
	if(table) return table;
	table=document.evaluate('//td[@align="center"]/table[@id="topnav"]',document,null,9,null).singleNodeValue;
	if(table) return table;
	return null;
}

function main(){
	var table=getTable();
	if(table){
		while(table.nodeName!='TABLE') table=table.parentNode;
		table.width=(document.body.offsetWidth-250)+"px";
		table.innerHTML=table.innerHTML.replace(/SPOTLIGHTS(.|\n)*?(<\/table>\n<\/td>)/,"ads removed!-->$2");
		
		var rightColAds=document.getElementById('rightcolumn');
		if(rightColAds){
			//remove tables until contains: W3SCHOOLS
			for(var i=0;i<rightColAds.childNodes.length;){
				var node=rightColAds.childNodes[i];
				if(node.nodeName=='#text'){
					i++;
					continue;
				}
				if(node.nodeName!='TABLE') break;
				if(node.innerHTML.indexOf('W3SCHOOLS')!=-1) break;
				node.parentNode.removeChild(node);
			}
		}
		
		var topAd=document.evaluate('//a[@name="top"]',document,null,9,null).singleNodeValue.parentNode.childNodes[6];
		if(topAd) topAd.parentNode.removeChild(topAd);
		
		var rightCol=document.evaluate('./td[@class="right_container"]',table.parentNode.parentNode,null,9,null).singleNodeValue;
		if(!rightCol){
			try{
				rightCol=document.evaluate('//td[contains(@style,"/pagetop_topright.")]',document,null,9,null).singleNodeValue.nextSibling.nextSibling;
			}catch(e){rightCol=null;}
		}
		if(rightCol){
			while(rightCol=rightCol.nextSibling) rightCol.parentNode.removeChild(rightCol.previousSibling);
		}else{
			rightCol=document.getElementById('leftcolumn').nextSibling.nextSibling;
			rightCol.firstChild.nextSibling.removeAttribute('width');
		}	
	}else{
		GM_log('Table not found, please report this error to the userscripts discussion of this script');
	}
}

main();
