// ==UserScript==
// @name           OpenSubtitleDirectDownload
// @namespace      bitsscream
// @description    Directly downloads from opensubtitles.org
// @include        http://www.opensubtitles.org/*
// ==/UserScript==
var util={
	docProcessor: {
		getElementsByPropName: function (parent, tagName, prop){
			object=parent.getElementsByTagName(tagName);
			propName=prop.split("=")[0];
			propValue=prop.split("=")[1];
			propValue=propValue.substring(1,propValue.length-1);
			var j=0;
			var retArr=new Array();
			for(i=0;i<object.length;i++){
				if(object[i].getAttribute(propName)==propValue){
					retArr[j++]=object[i];
				}
			}
			return retArr;
		}
	}
}


function convertLinks(){
	a=util.docProcessor.getElementsByPropName(document,"a",'class="bnone"');
	for(i=0;i<a.length;i++){
		var id=a[i].href.split("/")[5];
		a[i].setAttribute("onclick","");
		a[i].href="http://dl.opensubtitles.org/en/download/sub/"+id;
		a[i].parentNode.parentNode.parentNode.setAttribute("onclick","");
	}
}

function setDefLan(){
	document.getElementById('SubLanguageID').value = "eng";
	fullurl = window.location.href.split("/"); 
	var loc = window.location.href.replace("sublanguageid-all","sublanguageid-eng");
	for(i=0;i<=fullurl.length;i++)
	{
	  if(fullurl[i]=="sublanguageid-all")
	  	  window.location.href = loc;
	}
}

function main(){
	setDefLan();
	fullurl = window.location.href.split("/");
	if(fullurl[4]=="search"){
		convertLinks();
	}
}
main();
