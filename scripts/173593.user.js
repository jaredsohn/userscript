// ==UserScript==
// @name			H K G a l d e n member stat
// @namespace		galdenson
// @version			0.0.1
// @description		Count stat
// @match			https://hkgalden.com/member/profile/*
// @match			http://hkgalden.com/member/profile/*
// @exclude         https://hkgalden.com/member/profile/3794
// @exclude         http://hkgalden.com/member/profile/3794

// ==/UserScript==

var $ = function (selector) {
	return document.querySelector(selector);
}

var $$ = function (selector) {
	return document.querySelectorAll(selector);
}

var win=this.unsafeWindow;
win.mainfunction = function (json) {
	
var datastring = $('#hkga-pftb').innerHTML;
if ( datastring.indexOf('1970') != -1 ){
	setTimeout(function (t){window.location.reload()}, 300000);
}
else{
	var memberid = $(".usrinfo").innerHTML;
	memberid = memberid.substr(memberid.indexOf('td')+3,4);
	
	var membername;
	if ($(".unm.bro"))
	 membername = $(".unm.bro").innerHTML;
	if ($(".unm.sis"))
	 membername = $(".unm.sis").innerHTML;

	
	var docURL = 'https://docs.google.com/forms/d/1zjsgxnIt-pHfT6bxe0LkI4Ra5Qe5VGSQgqPTnWChfYQ/formResponse?ifq&entry.1161154684=' +memberid+ '&entry.1510931663='+membername+'&submit=Submit';

    var request = new XMLHttpRequest();
	request.open("GET", docURL, true);
	request.send(null);
    setTimeout(function (s){
        
        var newURL;
		if (document.URL.indexOf('https') != -1)
			newURL = 'https://hkgalden.com/member/profile/'+(parseInt(memberid)+1).toString();
		else
			newURL = 'http://hkgalden.com/member/profile/'+(parseInt(memberid)+1).toString();
	//alert(newURL);
		//window.location.load(newURL);
		window.open (newURL,'_self',false)
    	}, 3000);
	
}

}
var jsonapi = document.createElement('script');
jsonapi.src = 'https://spreadsheets.google.com/feeds/list/0ApEyQph2NSyNdGViVXk3T0o3RTQ2c1lvMVo1WmluTnc/od6/public/values?alt=json-in-script&callback=mainfunction';
var doc = $('head');
doc.appendChild(jsonapi);
