// ==UserScript==
// @name        AGRP-LinkFinder
// @namespace   AGRP
// @description 直リンクや埋め込み動画に赤枠を追加して表示します。
// @version     1
// ==/UserScript==

var LinkFinder = function(){
	this.result = [];
	this.setResult=function(){
		var aTags = document.getElementsByTagName('a');
		var objectTags=document.getElementsByTagName('object');
		var iframeTags=document.getElementsByTagName('iframe');
		for(var i=0;i<aTags.length;i++){	
			var hrefAttr=aTags.item(i).href;
			var pattern =/xvideos\.com|video\.fc2\.com|pornhost\.com|tube8\.com|alotporn\.com|xhamster\.com|tnaflix\.com|slutload\.com|megafilex\.com|empflix\.com|tokyo-tube\.com|userporn\.com/i;
			var pattern2=/xvideos-userporn\.com/i;
			if(hrefAttr.search(pattern)!=-1&&hrefAttr.search(pattern2)==-1){
				aTags.item(i).style.border="thick solid blue";
				aTags.item(i).style.padding="3px";
				this.result.push(hrefAttr);
			}
		}
		for(var k=0;k<objectTags.length;k++){
			objectTags.item(k).style.border="15px solid white";
			objectTags.item(k).style.padding="15px";
			objectTags.item(k).style.backgroundColor="blue";
		}
		for(var l=0;l<iframeTags.length;l++){
			iframeTags.item(l).style.border="15px solid white";
			iframeTags.item(l).style.padding="15px";
			iframeTags.item(l).style.backgroundColor="blue";
		}
	}
	this.showResult=function(){
		var bodyTag;
		var divTag;
		var olTag;
		var liTag=[];
		var aTag=[];
		var aText=[];
		bodyTag=document.getElementsByTagName('body');
			divTag=document.createElement('div');
			divTag.style.backgroundColor="#ffffff";
			divTag.style.border="thick solid blue";
			divTag.style.padding="15px";
				olTag=document.createElement('ol')
		for(var i=0;i<this.result.length;i++){
			liTag[i]=document.createElement('li');
			aTag[i]=document.createElement('a');
			aTag[i].href=this.result[i];
			aTag[i].target="_blank";
			aText[i]=document.createTextNode(this.result[i]);
			liTag[i].appendChild(aTag[i]);			
			aTag[i].appendChild(aText[i]);
			olTag.appendChild(liTag[i]);
		}
		divTag.appendChild(olTag);
			bodyTag[0].insertBefore(divTag,bodyTag[0].firstChild);
	}
}
var myLinkFinder=new LinkFinder();
myLinkFinder.setResult();
myLinkFinder.showResult();