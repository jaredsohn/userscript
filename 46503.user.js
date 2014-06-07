scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Advanced Image Search
// @namespace      Created by sahil
// @description    Adds advanced features to Google Image Search.
// @version        1.4
// @include        http://images.google.*/images?*
// ==/UserScript==
]]></>;

// Modified and released by: Sahil

addFilter("as_filetype",["File type","JPG|JPG","GIF|GIF","PNG|PNG","BMP|BMP"]);
addFilter("imgc",["Image type","Black & White|Mono","Grayscale|Gray","Full Color|Color"]);
addFilter("safe",["SafeSearch","Strict|Active","No filter|Off"]);

function addFilter(param,values)
{
	var re=new RegExp("(\\?|&)"+param+"=(\\w*)(&|$)","img");		//regexp to extract the parameter from the search string
	var pv=re.exec(location.search)?RegExp.$2.toLowerCase():"";		//extracting parameter value
	var url=location.pathname+location.search.replace(re,function(){return arguments[3]?arguments[1]:"";});	//search string without parameter
	
	//creating dropdown
	var s=document.createElement("select");
	s.name=param;
	s.setAttribute("onchange","_isr_load(this);");
	
	//adding options
	s.options[0]=new Option(values.shift(),url);
	url+="&"+param+"=";
	values.forEach(function(v){var a,n;if(v.match(/\|/)){a=v.split("|");n=a[0];v=a[1];}else{n=v;}
	(s.options[s.options.length]=new  Option(n,url+v.toLowerCase())).selected=v.toLowerCase()==pv;});
	
	//appending dropdown
	s.style.margin='0px 0px 0px 8px'; 
	document.forms[1].appendChild(s);
}

var one = document.getElementsByName('imagesize')[0];
var two = document.getElementsByName('imagetype')[0];

for (var i = 0; i <= one.options.length - 1; i++) 
{
	if (one.options[i].innerHTML == "All image sizes") one.options[i].innerHTML = "Size";
	if (one.options[i].innerHTML == "Extra Large images") one.options[i].innerHTML = "X Large"; 
	if (one.options[i].innerHTML == "Large images") one.options[i].innerHTML = "Large";
	if (one.options[i].innerHTML == "Medium images") one.options[i].innerHTML = "Medium";
	if (one.options[i].innerHTML == "Small images") one.options[i].innerHTML = "Small";
}


for (var i = 0; i <= two.options.length - 1; i++) 
{
	if (two.options[i].innerHTML == "Any content") two.options[i].innerHTML = "Content";
	if (two.options[i].innerHTML == "News content") two.options[i].innerHTML = "News";
	if (two.options[i].innerHTML == "Line drawings") two.options[i].innerHTML = "Lines";
	if (two.options[i].innerHTML == "Photo content") two.options[i].innerHTML = "Photos";
}

aaus_38017={
i:'45825', // Script id on Userscripts.org
d:2, // Days to wait between update checks
n:/\/\/\s*@name\s*(.*)\s*\n/i.exec(scr_meta)[1],v:/\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1],t:new Date().getTime()|0,ca:function(r){GM_xmlhttpRequest({method:'GET',url:'https://userscripts.org/scripts/source/'+this.i+'.meta.js',headers:{'User-agent':window.navigator.userAgent,'Accept':'application/atom+xml,application/xml,text/xml'},onload:function(x){aaus_38017.co(x,r)}})},co:function(x,r){this.xv=/\/\/\s*@version\s*(.*)\s*\n/i.exec(x.responseText)[1];this.xn=/\/\/\s*@name\s*(.*)\s*\n/i.exec(x.responseText)[1];if(this.xv!=this.v&&confirm('A new version of the '+this.xn+' user script is available. Do you want to update?')){GM_setValue('updated',this.t);GM_openInTab('http://userscripts.org/scripts/source/'+this.i+'.user.js')}else if(this.xv&&this.xv!=this.v){if(confirm('Do you want to turn off auto updating for this script?')){GM_setValue('updated','off');GM_registerMenuCommand("Auto Update "+this.n,function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca('return')});alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.')}else{GM_setValue('updated',this.t)}}else{if(r)alert('No updates available for '+this.n);GM_setValue('updated',this.t)}},ch:function(){if(GM_getValue('updated',0)==0)GM_setValue('updated',this.t);if(GM_getValue('updated',0)!='off'&&+this.t>+GM_getValue('updated',0)+86400000*this.d){this.ca()}else if(GM_getValue('updated',0)=='off'){GM_registerMenuCommand("Enable "+this.n+" updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}else{GM_registerMenuCommand("Check "+this.n+" for updates",function(){GM_setValue('updated',new Date().getTime()|0);aaus_38017.ca(true)})}}};if(self.location==top.location&&GM_xmlhttpRequest)aaus_38017.ch();