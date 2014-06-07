// ==UserScript==
// @name           Title Tooltips 2.0
// @namespace      *
// @description    Script that makes fancy tooltips out of standard title attributes!
// @include        *
// ==/UserScript==

/****************************** set variables - config utility will follow! *****************************/
var ttBgColor="#ffffcc";	// tooltip background color
var ttFadeinTime="100";	// tooltip fade in time
var ttFadeoutTime="100";	// tooltip background color
var maxxTTLength=30;	// max line length of title tooltips
var LINKTITLES=true;		// use link address if no titles present on link!
var ALTTITLES=true;		// use alt attribute if no titles present on images!
var titleTypes='*';	// applies to all elements below the document's body tag (change it if you want)

/*************** NO CHANGES BELOW UNLESS YOU KNOW WHAT YOU ARE DOING!!! ***************/
var myTT;
var VERSION=0.20;
var serverURL="http://www.usability-online.com/assets/script/";
var scripts=[			// scripts to inject (if available)
	serverURL+'wz_tooltip.js',
	serverURL+'TT.js',
	'http://www.usability-online.com/assets/script/html-xpath.js'
];
var styles = [];			// styles to inject (if available)

// map real word document to GM's document - *required*!
var  document=unsafeWindow['document'];

/* inject tooltips into specified elements! */
function initTT(){
	if(!unsafeWindow.myTT){	// singleton!
		TT = unsafeWindow['TT'];
		myTT=new TT(ttBgColor,ttFadeinTime,ttFadeoutTime,maxxTTLength,LINKTITLES,ALTTITLES,titleTypes,VERSION);
		unsafeWindow.myTT=myTT;
	}
}

/* Register commands - will implement a config site, but at a later point in time ;)
GM_registerMenuCommand( "Advanced Title Tooltip Settings", function() { tt_settings(); } );*/

// start anonymous function wrapper to do something with the real world
(function() {
	injectCode();
	unsafeWindow.addEventListener("load", initTT, false);
})(); // end anonymous function wrapper

/* inject  external styles and scripts to the current website */
function injectCode(){
	docHead=document.getElementsByTagName("head")[0];
	docBody=document.getElementsByTagName("body")[0];
	if(docHead){
		for (i in styles) {
			var style = document.createElement('link');
			style.setAttribute("rel","stylesheet");
			style.href = styles[i];
			docHead.appendChild(style);
		}
	}
	if(docBody){
		for (i in scripts) {
			var script = document.createElement('script');
			script.src = scripts[i];
			docBody.appendChild(script);
		}
		var protoScript=document.createElement("script");
		protoScript.setAttribute("type","text/javascript");
		protoArr=new Array();
		protoArr.push("<!--\n");
		protoArr.push("window.HTMLElement.prototype.setTT = function() {\n");
		protoArr.push("	if(this.title!=''){\n");
		protoArr.push("		var ttText=this.getAttributeNode('title').cloneNode(false).value;\n");
		protoArr.push("		if(ttText.length>=maxxTTLength)ttText=ttText.splitHTMLText(maxxTTLength);\n");
		protoArr.push("		this.setAttribute('tttitle',ttText);\n");
		protoArr.push("		this.title='';\n");
		protoArr.push("	}\n");
		protoArr.push("}\n");
		protoArr.push("window.String.prototype.splitHTMLText=String.prototype.splitHTMLText = function(length){\n");
		protoArr.push("	var words=this.split(' ');\n");
		protoArr.push("	var chars=this.length;\n");
		protoArr.push("	var line='';\n");
		protoArr.push("	var text='';\n");
		protoArr.push("	for(var i=0;i<words.length;i++){\n");
		protoArr.push("		if(chars>=length){\n");
		protoArr.push("			line+=words[i]+' ';\n");
		protoArr.push("			if(line.length>=length){\n");
		protoArr.push("				text+=line+'\<br/\>';\n");
		protoArr.push("				chars-=line.length;\n");
		protoArr.push("				line='';\n");
		protoArr.push("			}");
		protoArr.push("		}else{\n");
		protoArr.push("			text+=words[i]+' ';\n");
		protoArr.push("		}\n");
		protoArr.push("	}\n");
		protoArr.push("	return text;\n");
		protoArr.push("}\n");
		protoArr.push("-->\n");
		protoScript.innerHTML=protoArr.join("");
		docBody.appendChild(protoScript);
	}
}

/* Cookie-related functions */
unsafeWindow.__proto__.setCookie=function(c_name,value,expiredays,path){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
	( ( path ) ? ";path=" + path : "") +
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
};

unsafeWindow.__proto__.getCookie=function(c_name) {
	if (document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){ 
			c_start=c_start + c_name.length+1; 
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}return "";
};