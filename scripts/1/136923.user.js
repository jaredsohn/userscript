// ==UserScript==
// @name        Videobox Direct Downloader
// @namespace   videobox
// @include     http://www.videobox.com/flash/?contentId=*
// @include     http://www.videobox.com/custom-clip?contentId=*
// @version     1
// ==/UserScript==

function deletecookies(){
	var domain      = document.domain;
	var domain2     = document.domain.replace (/^www\./, "");
	var domain3     = document.domain.replace (/^(\w+\.)+?(\w+\.\w+)$/, "$2");
	var cookieList  = document.cookie.split (';');

	for (var J = cookieList.length - 1; J >= 0; --J) {
		if(cookieList[J].indexOf("JSESSIONID") != -1){
			var cookieName = cookieList[J].replace (/\s*(\w+)=.+$/, "$1");
			document.cookie = cookieName + "=;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
			document.cookie = cookieName + "=;path=/;expires=expires=Thu, 01-Jan-1970 00:00:01 GMT;";
			document.cookie = cookieName + "=; path=/; domain=" + domain  + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
			document.cookie = cookieName + "=; path=/; domain=" + domain2 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
			document.cookie = cookieName + "=; path=/; domain=" + domain3 + "; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
		}
	}
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function ajaxsubmit(url)
{
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			if (response.readyState==4){
				if (response.status==200){
					document.location = response.responseText.match("<url>(.*)</url>")[1];
					deletecookies();
					//if (!response.responseXML) {
					//	response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
					//}
					//goparse(response.responseXML);
				}
				else{
					alert("An error has occured making the request");
				}
			}
		}
	});
}

function goparse(xml){
	document.location = xml.getElementsByTagName('url')[0].textContent;
}

var names = ['startTime','startOffset','contentId','countView','isClip','autoPlay','isHD'];
var args = {};
var argslist = "";

for(var i = names.length - 1; i>=0; --i){
	if(document.location.toString().indexOf(names[i]) != -1){
		args[names[i]] = getUrlVars()[names[i]];
	}
	else{
		args[names[i]] = '0';
	}
	var toadd = names[i] + "=" + args[names[i]];
	if(argslist == ""){
		argslist = toadd;
	}
	else{
		argslist += "&" + toadd;
	}
}

var url = "http://www.videobox.com/content/flash/video/?" + argslist + "&shouldCountPreview=true&quality=fh&endTime=%2D1";
ajaxsubmit(url);