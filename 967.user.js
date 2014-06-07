// ==UserScript==
// @name          Flickr Related Tags Display
// @namespace	  http://www.kokogiak.com/webtools
// @description	  Flickr Related Tags
// @include       http://flickr.com/photos/upload*
// @include       http://www.flickr.com/photos/upload*
// ==/UserScript==

if(typeof HTMLElement!="undefined" && !HTMLElement.prototype.insertAdjacentElement){
	HTMLElement.prototype.insertAdjacentElement=function(where,parsedNode){
		switch (where){
		case 'beforeBegin':
			this.parentNode.insertBefore(parsedNode,this)
			break;
		case 'afterBegin':
			this.insertBefore(parsedNode,this.firstChild);
			break;
		case 'beforeEnd':
			this.appendChild(parsedNode);
			break;
		case 'afterEnd':
			if (this.nextSibling) this.parentNode.insertBefore(parsedNode,this.nextSibling);
			else this.parentNode.appendChild(parsedNode);
			break;
		}
	}
	HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr){
		var docRange = this.ownerDocument.createRange();
		docRange.setStartBefore(this);
		var parsedHTML = docRange.createContextualFragment(htmlStr);
		this.insertAdjacentElement(where,parsedHTML)
	}
}

function kAppend(x,y){
	x.insertAdjacentHTML('afterEnd',y);
}
var ktmpStr = "";
var kAgStr = "";
var kTagCount = 1;
var kCurrTag = 0;
var kTagLimit = 10;
var kRelDiv;

function kGetEl(x){return document.getElementById(x)};
window.kGetNm = function(x){return document.getElementsByName(x)};
function kGetVal(x,y,z){ if((x.getElementsByTagName(y)[z])&&(x.getElementsByTagName(y)[z].firstChild)){ return x.getElementsByTagName(y)[z].firstChild.nodeValue } };

function kRscMonitor(){
    if (kObjHTTP.readyState == 4) {
        if (kObjHTTP.status == 200) {
        	kObjXML = kObjHTTP.responseXML;
        	if(kObjXML.getElementsByTagName("tag").length>0){
			kObjXML.getElementsByTagName("tag").length<15 ? kLen=kObjXML.getElementsByTagName("tag").length : kLen=15;
       			if(kLen==1){kLen=0}
       			ktmpStr=("<b>" + kTagArr[kCurrTag] + "</b>: <a class='tagrsUnUsed' href='#' onClick='window.kGetNm(\"tags\")[0].value=\"" + kGetVal(kObjXML,"tag",0) + " \"+kGetNm(\"tags\")[0].value;return false;'>" + kGetVal(kObjXML,"tag",0) + "</a>")
       			for (i=1;i<kLen;i++){
       				if(kGetVal(kObjXML,"tag",i)){
       					linkVal = kGetVal(kObjXML,"tag",i)
  							ktmpStr+=(", <a class='tagrsUnUsed' href='#' onClick='window.kGetNm(\"tags\")[0].value=\"" + linkVal + " \"+kGetNm(\"tags\")[0].value;return false;'>" + linkVal + "</a>")
					}
				}
				kAgStr+=ktmpStr+"<br/>";
				if(kTagCount>=kCurrTag){
					if(kCurrTag<kTagCount){
						kCurrTag++;
						kFetchRel(kTagArr[kCurrTag])
					}
				}
			}else{
				if((kTagArr[kCurrTag]!=" ")&&(kTagArr[kCurrTag]!="")){
					kAgStr+=("<b>" + kTagArr[kCurrTag] + "</b>: (no tags found)<br/>")
				}				
				if(kTagCount>=kCurrTag){
					if(kCurrTag<kTagCount){
						kCurrTag++;
						kFetchRel(kTagArr[kCurrTag])
					}
				}
			}
		}else{ alert("Sorry, error retrieving Flickr XML: " + kObjHTTP.statusText + ".")}
    }
}

window.kGetRel = function(){
	kCurrTag = 0; kAgStr = "";
	kTmpTags = kGetNm("tags")[0].value
	for(i=4;i<document.getElementsByTagName("DIV").length;i++){
		if(document.getElementsByTagName("DIV")[i].id=="kRelDiv"){
			kRelDiv = document.getElementsByTagName("DIV")[i];
			kRelDiv.style.display="";
		}
	}
	if(kTmpTags!=""){
		kRelDiv.innerHTML="Loading related tags...";
		kTmpTags = kGetNm("tags")[0].value
		kTmpTags = kTmpTags.replace(',','');
		kTagArr = kTmpTags.split(" ")
		if(kGetNm("tags")[0].value.indexOf('"')!=-1){
			kTmpStr2 = ""; var ct = 0;
			for(i=0;i<(kTagArr.length);i++){
				if((kTagArr[i].indexOf('"')==-1) && (ct==0)){ kTmpStr2 += " " + kTagArr[i] }
				else{
					if(kTagArr[i].indexOf('"')==0){ ct=1; kTmpStr2 += " " + kTagArr[i].replace('"','') }
					else{
						if(kTagArr[i].indexOf('"')!=0){ ct=0; kTmpStr2 += kTagArr[i].replace('"','') }
						else{ kTmpStr2 += kTagArr[i] }
					}
				}
			}
			if (kTmpStr2.indexOf(' ')==0){kTmpStr2 = kTmpStr2.slice(1)}
			kTagArr = kTmpStr2.split(" ")
		}
		kTagCount = kTagArr.length;
		kFetchRel(kTagArr[0])
	}else{ kRelDiv.innerHTML="Please type a tag in the field above first" }
}

function kFetchRel(x){
	if((kCurrTag!=kTagCount)&&(kCurrTag<kTagLimit)){
		kObjHTTP = new XMLHttpRequest();
		kObjHTTP.onreadystatechange = kRscMonitor;
		kObjHTTP.open("GET", "/services/rest/?method=flickr.tags.getRelated&api_key=a566b99e84383930d2593044067856ed&per_page=10&tag=" + x, true);
		kObjHTTP.setRequestHeader("Content-Type", "text/xml; charset=utf-8");
		kObjHTTP.send(null);
	}else{ kRelDiv.innerHTML = kAgStr }
}

kAppend(kGetNm("tags")[0],"<p/><a class='tagrsUnUsed' href='#' onclick='window.kGetRel();return false;'>See Related Tags >></a> &nbsp; <span style='font-size: 11px;'>(Popular tags related to your entry above)</span><div id='kRelDiv' style='padding:4px;display:none;border:1px solid #ccc;width:350px;'></div>");
