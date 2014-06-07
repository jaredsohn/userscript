// ==UserScript==
// @name           Automatic Link/Image Coder.
// @namespace      http://userscripts.org/users/120212
// @description    Adds an 'Auto Code' button on w-bb text editor toolbar ( although It'll work on other forums ) that once pressed will automatically code all links or images
// @include        http://www.warez-bb.org/*
// @include        http://warez-bb.org/*
// ==/UserScript==

var curWord="",checkC=true,curLetter="",content="",txtLen="",tc="";
var mergeLinks=false;
function trim(str) {while (str.substring(0,1)==' ') str=str.substring(1,str.length);while(str.substring(str.length-1,str.length)==' ') str=str.substring(0,str.length-1);return str;} 
function run(){for(i=0;i<txtLen;i++){curLetter=tc.substring(i,i+1);if(curLetter==" "){validURL(curWord)&&rText(curWord);curWord=""}else curWord+=curLetter}
checkC=/\[\/code\]\s*\n*\[code\]/gi;
checkC.compile(/\[\/code\]\s*\n*\[code\]/gi);
checkC=checkC.test(content);
if(checkC){mergeLinks=confirm("Should I merge the code tags?");}
if(mergeLinks==true){var a=/\[\/code\]\s*\n*\[code\]/gi;content=content.replace(a,"\n")}content=content.replace(new RegExp("@@","gi"),"?");content=content.replace(new RegExp("\\s\\s","g"),"\n");content=trim(content);document.getElementById("message").value=content;}

function validURL(a){
a=a.toLowerCase();
k=a.substring(0,4);
if(k=="http"||k=="ftp:"||k=="www."){
return true;}else{
checkC=/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi;
checkC.compile(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b/gi);
if(checkC=checkC.test(a)){return true;}else{return false;}}}
function rText(a){
oldURLtest=a.substring(a.length-1,a.length);
if(oldURLtest=="/"){
oldURLp=a.substring(0,a.length-1);
newURL=' [code]'+oldURLp+'[/code] ';}else{
oldURLtest=a.substring(a.length-4,a.length);
if(oldURLtest==".gif"||oldURLtest==".png"||oldURLtest=="jpeg"||oldURLtest==".jpg"||oldURLtest==".bmp"){
newURL=' [img]'+a+'[/img] ';}
else{newURL= ' [code]'+a+ '[/code] ';}}
content=content.replace(new RegExp("\\s"+a+"\\s", "g"),newURL);}
function start(){content=document.getElementById("message").value;if(content.length>0){content=content.replace(new RegExp("\n","g")," "+" ");
if(content.substring(0,1)!=' ')
content=" "+content;
if(content.substring(content.length-1,content.length)!=' ')
content=content+" ";
var a=/\[\/code\]|\[code\]|\[img\]|\[\/img\]/gi;content=content.replace(a,"");tc=content=content.replace(new RegExp("\\?","gi"),"@@");txtLen=tc.length;document.getElementById("message").value="---\nMass Link Coder v1.1\nWritten by ownage1337\n---";run();}else{alert("Please type something first.");}}
if(document.getElementById("message")!=null){var autoCodeB=document.createElement("input");autoCodeB.type="button";autoCodeB.value="Auto Code";autoCodeB.id="autoCodeB";autoCodeB.setAttribute("class","button");autoCodeB.setAttribute("style","margin-left:5px;color:red;");autoCodeB.addEventListener("click",start,false);
document.body.appendChild(autoCodeB);if(document.getElementById("box_distort_min")!=null){posObj=document.getElementById("box_distort_min");}else{posObj=document.getElementById("addbbcode2");}posObj.parentNode.insertBefore(autoCodeB,posObj.nextSibling)};