// ==UserScript==
// @name           leet ratio
// @namespace      http://userscripts.org/scripts/show/47145
// @include        http://what.cd/*
// @include        http://www.what.cd/*
// @include        https://what.cd/*
// @include        https://www.what.cd/*
// ==/UserScript==
function Right(str, n){
    if (n <= 0)
       return "";
    else if (n > String(str).length)
       return str;
    else {
       var iLen = String(str).length;
       return String(str).substring(iLen, iLen - n);
    }
}

function leetRatio() {
var download_str = document.getElementById('userinfo_stats').getElementsByTagName('span')[1].innerHTML;
var download_ext = Right(download_str,2);
var download = parseFloat(download_str);
var upload_n = download * 1337;
var ext_ar = new Array();
ext_ar[0] = 'KB';
ext_ar[1] = 'MB';
ext_ar[2] = 'GB';
ext_ar[3] = 'TB';
ext_ar[4] = 'PB';
//find current index of ext
var ext_i;
for(ext_i = 0; ext_i < 5;ext_i++) {
	if(download_ext == ext_ar[ext_i])
		break;
}
var new_ext;
while(upload_n/1024 > 1) {
	upload_n = upload_n/1000;
	ext_i++;
}
	
document.getElementById('userinfo_stats').getElementsByTagName('span')[0].innerHTML = Math.round(upload_n*100)/100 

+ " " + ext_ar[ext_i];
document.getElementById('userinfo_stats').getElementsByTagName('span')[3].innerHTML = '1337.00';
} 

leetRatio();