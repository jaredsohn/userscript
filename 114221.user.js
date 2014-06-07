// ==UserScript==
// @name           Megaupload
// @namespace      Vinicius W
// @include        http://www.megaupload.com/*
// ==/UserScript==

//feel free to edit and giveme sugestions , this is just a simple prototype


if(location.href.indexOf("http://megaupload.com") != -1){
	location.href = location.href.replace("http://megaupload.com", "http://www.megaupload.com");
}

//	location.href.replace("http://www.megaupload.com/?d=", "")
if(document.location.href == 'http://www.megaupload.com/?c=premium&l=1'){
	settheTimic();
	window.history.back();
}/* else {
	var tmp;
	getCookie("dwnload",tmp,15);
	if("" + tmp + "" == "NaN" || tmp == "" || !tmp) { tmp="|"; }
	if(indexOf(location.href) != -1){
		setCookie("dwnload",tmp+"|",15);
	}
}*/

var filesize=(1000*60*2.5); //ms * sec * min // equal at 
var urlLink;
var xpath;
var IntervalIDdwnld;
var fileinfo;
var informationfile;

xpath = "//div/div[@class='download_file_size']";
fileinfo = getFirstResult(xpath, document);
if (fileinfo){
	var fsize = fileinfo.innerHTML;
	fileinfo=0;
	var multyby=1;
	if(fsize.indexOf("KB") != -1) multyby=1000; //isnt 1024 beacauase i see its show tha same in my computer
	if(fsize.indexOf("MB") != -1) multyby=1000*1000;
	if(fsize.indexOf("GB") != -1) multyby=1000*1000*1000;
	if(fsize.indexOf("TB") != -1) multyby=1000*1000*1000*1000;
	if(fsize.indexOf("PB") != -1) multyby=1000*1000*1000*1000*1000; //what the fuck?
	if(fsize.indexOf("HB") != -1) multyby=1000*1000*1000*1000*1000*1000; //holy crap man,what the fuck?
	filesize = parseFloat(fsize)*multyby;
	
	showmessage(1,"Filesize dectected:" + filesize + "");

}
IntervalIDdwnld = setTimeout(startdonwloading,1000);

if(isdwnloaded())showmessage(3,"<b>You Have alrealdy Downloaded this File.</b>"); else showmessage(3,"Not Yet Downloaded");

function startdonwloading(){
	if(IntervalIDdwnld != 0) clearInterval(IntervalIDdwnld);
	
	var asfg=CheckTimic();
	xpath = "//div/a[@id='dlbutton']";
	if(!urlLink) urlLink = getFirstResult(xpath, document);
	if(asfg > 1000*80){ // if asfg return a number bigger then that zero its indicate that you can download a file but it waits 80 seconds before try
		if (urlLink) {
			settheTimic();
			showmessage(2,"The Download has Beginning download!");
			location.href = urlLink.href;
			setTimeout(filedownloaded,10000);
		} else {
		if(document.getElementById('countdown_txt').innerHTML){
		
		}
		}
	} else {
		IntervalIDdwnld = setTimeout(startdonwloading, 1000);
	}
	showmessage(1,"Filesize" + filesize);
	showmessage(2,"downloading in:" + (asfg - 1000*80)*-1 + ".");
}
			
function filedownloaded(){
	var d=new Date();
	var t=d.getTime();
	Setdwnloaded(t);
	settheTimic(filesize/80.4); // kbps / sec
	setlastTimic();
	showmessage(2,"The Download has Begun!");
}
			
var msg1;
var msg2;
var msg3;
function showmessage(a,message){
	var tmp = informationfile + "<br><center>";
	if(a == 1)msg1=message;
	if(a == 2)msg2=message;
	if(a == 3)msg3=message;
	tmp+=msg1 + "<br>";
	tmp+=msg2 + "<br>";
	tmp+=msg3 + "<br></center>";
	
	if(!fileinfo){
		xpath = "//div/div[@class='download_file_block description']";
		fileinfo = getFirstResult(xpath, document);
		if (fileinfo){
			informationfile=fileinfo.innerHTML;
			showmessage(1,"|");
			showmessage(2,"|");
			showmessage(3,"|");
		}
	}
	if (fileinfo)
			fileinfo.innerHTML=tmp;
}

function CheckTimic(){
	var d=new Date();
	var t=d.getTime();
	var str = getCookie("timic");	
	if("" + str + "" == "NaN" || str == "" || !str){
		setCookie("timic",t-filesize-1,1);
		str = getCookie("timic");	
	}
	var t2=parseInt(str);
	var diff=(t - t2);
	if(diff > 0)
		return diff; // for sure it won´t send a negative value, for some fag like my brother who is awesome to fuck with my projects
	else showmessage(3,"WARNING VAULE BELOW ZERO: CheckTimic():" + diff);
	return 0;
}
function settheTimic(timea){
	var d=new Date();
	var t=d.getTime();
	if(!timea) timea=0;
	setCookie("timic",t+timea,1);
}
function getlastTimic(){
	var d=new Date();
	var t=d.getTime();
	var str = getCookie("lasttimic");	
	if("" + str + "" == "NaN" || str == "" || !str){
		setCookie("lasttimic",t-filesize-1,1);
		str = getCookie("lasttimic");	
	}
	var t2=parseInt(str);
	var diff=(t - t2);
	if(diff > 0) return diff; // for sure it won´t send a negative value, for some fag like my brother who is awesome to fuck with my projects
	return 0;
}
function setlastTimic(){
	var d=new Date();
	var t=d.getTime();
	setCookie("lasttimic",t,1);
}
function Setdwnloaded(newvaule){
		if(newvaule > 0)
			setCookie("D_" + location.href.replace("http://www.megaupload.com/?d=", ""),newvaule,15);
		else
			setCookie("D_" + location.href.replace("http://www.megaupload.com/?d=", ""),0,15);
}
function isdwnloaded(){
	var str = getCookie("timic");	
	if("" + str + "" == "NaN" || str == "" || !str){
		setCookie("D_" + location.href.replace("http://www.megaupload.com/?d=", ""),0,15);
	}
	return parseInt(getCookie("D_" + location.href.replace("http://www.megaupload.com/?d=", "")));
}



if(!getCookie("megauploadtoolbar_visibility"))
	setCookie('megauploadtoolbar_visibility', 'yes', 7);
if(!getCookie("megauploadtoolbar_id"))
	setCookie('megauploadtoolbar_id', '197A9F07D8724E438DEBE1C11EBBE405', 7);
/************************************************\
|extras :
\************************************************/

function getCookie(c_name){
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++){
		x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
		if (x==c_name){
			return unescape(y);
		}
	}
}

function setCookie(c_name,value,exdays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function getFirstResult(expr, node){
    // if no node provided, default to document
    if (!node) {node = document;}
	var result = document.evaluate(expr, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    return result.singleNodeValue;
}
function $id(id) {
	var elem;
	try {
		elem = document.getElementById(id);
	} catch(e) {}
	return elem;
}