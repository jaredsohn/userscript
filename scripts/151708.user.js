// ==UserScript==
// @name VK-Download
// @description Script for downloading audio files from the vk.com.
// @author Ilya Snegirev
// @version 0.9 beta
// @homepage http://vk-download.ru/
// @include http://*vk.com/*
// @include http://*vk.com/search*
// @include http://*vk.com/audio*
// @include http://vk.com/audio*
// ==/UserScript==

window.addEventListener('load', test, false);



function filya(){

timeout();

if(location.href.replace('http://').split('/')[1].substring(0,5)=='audio'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link; 
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style='position:absolute;left:30px;top:9px'; 
document.getElementById(linkid).appendChild(alink);
namedow.style="padding-left:25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}


if(location.href.replace('http://').split('/')[1].substring(0,6)=='search'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[0].children[0].children[0].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link;
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style='position:absolute;left:30px;top:6px'; 
document.getElementById(linkid).appendChild(alink);
namedow.style="padding-left:25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}

if(location.href.replace('http://').split('/')[1].substring(0,6)!='search' && location.href.replace('http://').split('/')[1].substring(0,5)!='audio'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[0].children[0].children[0].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link;
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style='position:absolute;left:30px;top:6px'; 
document.getElementById(linkid).appendChild(alink);
namedow.style="padding-left:25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}
} 



function timeout(){
setTimeout(filya,500);
}




function nf(){

timeout2();

if(location.href.replace('http://').split('/')[1].substring(0,5)=='audio'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link; 
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style.position="absolute"; 
alink.style.left="30px";
alink.style.top="9px";
document.getElementById(linkid).appendChild(alink);
namedow.style.paddingLeft="25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}


if(location.href.replace('http://').split('/')[1].substring(0,6)=='search'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[0].children[0].children[0].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link;
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style.position="absolute"; 
alink.style.left="30px";
alink.style.top="6px";
document.getElementById(linkid).appendChild(alink);
namedow.style.paddingLeft="25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}

if(location.href.replace('http://').split('/')[1].substring(0,6)!='search' && location.href.replace('http://').split('/')[1].substring(0,5)!='audio'){

for(var a=0;a<=5000;a++){ 
if(document.getElementsByTagName('input').item(a).id.substr(0,10)=='audio_info'){ 
if(document.getElementsByTagName('input').item(a).name=='n'){ continue; } 
var linkid=document.getElementsByTagName('input').item(a).id.replace('_info',''); 
var namedow=document.getElementById(linkid).children[1].children[0].children[0].children[0].children[1].children[0].children[0];
var link=document.getElementsByTagName('input').item(a).value.split(',')[0];
var alink=document.createElement('a');
alink.href="http://vk-download.ru/download.html?a="+link;
alink.target='_blank';
alink.innerHTML='<img src="http://spishigdz.3dn.ru/download.png" title="Download" width="16px" height="16px">';
alink.style.position="absolute"; 
alink.style.left="30px";
alink.style.top="6px";
document.getElementById(linkid).appendChild(alink);
namedow.style.paddingLeft="25px";
document.getElementsByTagName('input').item(a).name='n';
}
}

}
} 



function timeout2(){
setTimeout(nf,500);
}





function test(){
if(navigator.appName=='Netscape'){
timeout2();
}

if(navigator.appName=='Opera'){

timeout();
}

}