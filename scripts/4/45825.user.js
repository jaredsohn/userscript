scr_meta=<><![CDATA[
// ==UserScript==
// @name           Google Image Search Advanced
// @namespace      Chris4
// @description    Adds advanced features to Google Image Search.
// @version        1.7
// @include        http://images.google.*/images?*
// ==/UserScript==
]]></>;

// Big thanks to Aaron Russell for writing much of this code!

// Remaking the imagesize dropdown so it uses onclick
var imgszdd = document.createElement('select');
imgszdd.setAttribute('name', 'imgsz');
imgszdd.setAttribute('style', 'margin:0px 0px 0px 8px');

function newoption(nametext, dork){
var newoption = document.createElement('option');
newoption.setAttribute('value', dork);
newoption.setAttribute('onclick', "function c(o){if(window.location.href.search(o)>0){return '&'+o+'='+window.location.href.split(o+'=')[1].split('&')[0];}else{return '';}}window.location.href=window.location.href.split('?')[0]+'?'+c('q')+'&imgsz='+this.value+c('imgtype')+c('as_filetype')+c('imgc')+c('imgcolor')+c('imgar')");
newoption.innerHTML=nametext;
imgszdd.appendChild(newoption);
}

// appending

document.evaluate( '//table[contains(@class, "t bt")]' , document, null, 0, null ).iterateNext().firstChild.firstChild.firstChild.appendChild(imgszdd);

// dropdown options

newoption('Any size', '');
newoption('X Large', 'huge');
newoption('Large', 'xxlarge');
newoption('Medium', 'small|medium|large|xlarge');
newoption('Small', 'icon');

// screen size

var newoption = document.createElement('option');
newoption.setAttribute('value', '');
newoption.setAttribute('onclick', "function c(operator){if(window.location.href.search(operator)>0){return '&'+operator+'='+window.location.href.split(operator+'=')[1].split('&')[0];}else{return '';}}window.location.href=window.location.href.split('?')[0]+'?'+c('q')+'&imgsz='+'&q=imagesize:'+screen.width+'x'+screen.height+c('imgtype')+c('as_filetype')+c('imgc')+c('imgcolor')+c('imgar')");
newoption.innerHTML='Screen Size';
imgszdd.appendChild(newoption);

//Show correct image size option
if(window.location.href.search('imgsz')>0){
function k(){if(window.location.href.split('imgsz=')[1].search('&')>0){
return window.location.href.split('imgsz=')[1].split('&')[0];}else{
return window.location.href.split('imgsz=')[1];}}
var j = document.getElementsByName('imgsz')[0];
if(k() === 'huge'){imgszdd.options[1].defaultSelected='true';}
if(k() === 'xxlarge'){imgszdd.options[2].defaultSelected='true';}
if(k() === 'small|medium|large|xlarge'){imgszdd.options[3].defaultSelected='true';}
if(k() === 'icon'){imgszdd.options[4].defaultSelected='true';}}

if(window.location.href.search('q=imagesize')>0){if(document.getElementsByName('imgsz')[0].type==='hidden'){
document.getElementsByName('imgsz')[1].options[5].defaultSelected='true';}else{
document.getElementsByName('imgsz')[0].options[5].defaultSelected='true';}}

// add new options
addFilter("as_filetype",["Any file","JPG|JPG","GIF|GIF","PNG|PNG","BMP|BMP"]);
addFilter("imgc",["Any color","Black & White|Mono","Grayscale|Gray","Full Color|Color"]);
addFilter("imgar",["Any shape","Square|s","Nr. Square|ns","Tall|t","Wide|w","Panoramic|xw"]);
addFilter("imgsz",["Megapixels","2 MP|2mp","4 MP|4mp","8 MP|8mp","12 MP|12mp"]);

function addFilter(param,values)
{
//regexp to extract the parameter from the search string
var re=new RegExp("(\\?|&)"+param+"=(\\w*)(&|$)","img");

// extracting parameter value
var pv=re.exec(location.search)?RegExp.$2.toLowerCase():"";

// search string without parameter
var url=location.pathname+location.search.replace(re,function(){return arguments[3]?arguments[1]:"";});	
	
// creating dropdown
var s=document.createElement("select");
s.name=param;
s.setAttribute("onchange","_isr_load(this);");
	
// adding options
s.options[0]=new Option(values.shift(),url);
url+="&"+param+"=";
values.forEach(function(v){var a,n;if(v.match(/\|/)){a=v.split("|");n=a[0];v=a[1];}else{n=v;}
(s.options[s.options.length]=new  Option(n,url+v.toLowerCase())).selected=v.toLowerCase()==pv;});
	
// appending dropdown
s.style.margin='0px 0px 0px 8px'; 
document.evaluate( '//table[contains(@class, "t bt")]' , document, null, 0, null ).iterateNext().firstChild.firstChild.firstChild.appendChild(s);
}