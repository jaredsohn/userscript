// ==UserScript==
// @name           MegaUpload Downloader
// @namespace      tag:asad78611@googlemail.com,1992-07-23:Megaupload
// @include        *.megaupload.com/*
// @include        megaupload.com/*
// ==/UserScript==

// Check Location
location	=	document.location.href
if((location.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?\?d=[0-9A-Z]+$/))||(location.match(/^http:\/\/(www\.)?megaupload\.com\/(?:[a-z]+\/)?$/)&&document.body.innerHTML.match(/>Please enter </))){
	// Get Variables
	captcha		=	"http://www.megaupload.com/" + document.body.innerHTML.split('<img src="\/')[1].split('">')[0];
	Filename	=	document.body.innerHTML.split("<b>Filename:</b> ")[1].split("</div>")[0];
	Filesize	=	document.body.innerHTML.split("<b>Filesize:</b> ")[1].split("</div>")[0];
	Description	=	document.body.innerHTML.split("<b>Description:</b> ")[1].split("</div>")[0];
	d		=	document.getElementById("downloadbutton").childNodes[1].childNodes[1].value;
	imagecode	=	document.getElementById("downloadbutton").childNodes[1].childNodes[3].value;
	megavar		=	document.getElementById("downloadbutton").childNodes[1].childNodes[5].value;
	loginuser	=	document.getElementById("topobject").innerHTML.split("document.write('<div style=\"position:absolute")[5].split("color:black;\">")[1].split("</div>")[0];
	if(loginuser=='Nickname: <input type="text" name="login" class="text" style="height:16px; font-size:11px; width:80px;">'){loginpass=true} else {loginpass=false}
	// Page Changing Code
	document.title = "MEGAUPLOAD - "+Filename+" - "+Filesize;
	// Check if logged in
	if(loginpass){htmlvalue='<div align=center><form action="" method="post">Nickname: <input type="text" name="login" style="height:16px; font-size:11px; width:80px;" class=text> Password: <input type="password" name="password" class=text style="height:16px; font-size:11px; width:80px;">&nbsp;&nbsp;&nbsp;<input type=submit value=login class=text></form><br>' } else {htmlvalue='<div align=center>'+loginuser+'</span><br><br>'}
	htmlvalue += '<span style="font-size:24px"><form action="http://www.megaupload.com/" method="post">Please Enter: <img src="'+captcha+'" class="text" height="24" style="position:relative; top:5px;"> Here: <input style="width:50" type="text" class=text name="imagestring">'
	htmlvalue += '<input type="hidden" name="d" value="'+d+'"><input type="hidden" name="imagecode" value="'+imagecode+'"><input type="hidden" name="megavar" value="'+megavar+'">     <input type="submit" class="text" value="Get Your Download"></form></span><br>'
	htmlvalue += '<table style="font-size:11px"><tr><td>Filename:</td><td>'+Filename+'</td></tr><tr><td>Filesize:</td><td>'+Filesize+'</td></tr><tr><td>Description:</td><td>'+Description+'</td></tr></table>'
	document.body.innerHTML=htmlvalue
}
if (location.match(/^http:\/\/(www\.)?megaupload.com\/(?:[a-z]+\/)?$/)){
	loginuser	=	document.getElementById("topobject").innerHTML.split("document.write('<div style=\"position:absolute")[5].split("color:black;\">")[1].split("</div>")[0];
	if(loginuser=='Nickname: <input type="text" name="login" class="text" style="height:16px; font-size:11px; width:80px;">'){loginpass=true} else {loginpass=false}
	div	=	document.getElementById('downloadbutton').innerHTML
	if(loginpass){htmlvalue='<div align=center><form action="" method="post">Nickname: <input type="text" name="login" style="height:16px; font-size:11px; width:80px;" class=text> Password: <input type="password" name="password" class=text style="height:16px; font-size:11px; width:80px;">&nbsp;&nbsp;&nbsp;<input type=submit value=login class=text></form><br>' } else {htmlvalue='<div align=center>'+loginuser+'</span><br><br>'}
	htmlvalue +=div
	document.body.innerHTML=htmlvalue
	clicklink();
}
function clicklink(){
	var div=document.getElementById('download_html');
	if (div && div.firstChild && div.firstChild.href) {
		window.location.href=div.firstChild.href;
		return;
	}
	window.setTimeout(clicklink, 1000);
}