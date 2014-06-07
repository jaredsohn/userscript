// Asmody.forum.mista.ru !!!
// version 1.0 BETA!
// 2009-06-15
// Copyright (c) 2007-2009 , 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "-----", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Asmody.forum.mista.ru !!!
// @namespace     http://www.forum.mista.ru/
// @description   Asmody's changes for the Mista.ru forum
// @include       http://www.forum.mista.ru/index.php*
// @exclude       
// @require 	  http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// ==/UserScript==

function addHeadBlock(blockContent, blockType) {
    var head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    var _type;
    switch (blockType) {
        case 'style' :
            _type = 'text/css';
            break;
        case 'script' :
            _type = 'text/javascript';
            break;
        default : return; 
    }
    var block = document.createElement(blockType);
    block.type = _type;
    block.innerHTML = blockContent;
    head.appendChild(block);
}

function addGlobalStyle(css) {
    addHeadBlock(css, 'style');
}

function addScript(script) {
    addHeadBlock(script, 'script');
}

document.__cookie={};
getCookie = unsafeWindow.getCookie = function(name) {
    if(!document.__cookie || !document.__cookie.__ok__) { 
        document.__cookie.__ok__=true;
        cc=document.cookie.split(';');
        for(var c in cc){d=cc[c].split('='); document.__cookie[$.trim(d[0])]=unescape($.trim(d[1]));}
    }
    return document.__cookie[name];
}
setCookie = unsafeWindow.setCookie = function(name, value) {
    if(!document.__cookie || !document.__cookie.__ok__) { 
        document.__cookie.__ok__=true;
        cc=document.cookie.split(';');
        for(var c in cc)
            {d=cc[c].split('='); document.__cookie[$.trim(d[0])]=unescape($.trim(d[1]));}
    }
    document.__cookie[name]=value;
    document.cookie = name+"="+escape(value);
}

getSetting = function(id) {return (getCookie(id) != 'no' ? 'checked' : '');}

function makeNavigation() {

var navigation="<ul id='menu'>";
// блок "Пользователь"
navigation += "<li>";
if($('a#me').length>0) {
var user_id=$('a#me').attr('href').match(/id=(\d+)/)[1];
navigation += "<a id='me' href='"+$('a#me').attr('href')+"'>"+$('a#me').html()+"</a>"+
"<ul><li><a href='users.php?action=edit'>Личные настройки</a>" +
"    <li><a href='index.php?user_id="+user_id+"'>Мои темы</a>" +
"    <li><a href='mytopics.php?user_id="+user_id+"'>Темы с моим участием</a>" +
"    <li><a href='users.php?&amp;action=exit'>Выход</a></ul>"; 
} else {
navigation += "<a href='users.php?&action=register'>Регистрация</a>"+
"<ul><li><form name='enterform' method='post' action='users.php?'>" +
"<label for='user_name'>Имя:</label><br>" +
"<input class='fieldbasic' name='user_name' type='text' id='user_name' size='10' maxlength='20'><br>" +
"<label for='user_name'>Пароль:</label><br>" +
"<input class='fieldbasic' name='user_password' id='user_password'  type='password' size='10' maxlength='20'>" +
"<input type='hidden' name='action' value='do_enter'><br>" +
"<input class='sendbutton' type='submit' name='Submit' value='Вход'>" +
"</form>" +
"<li><a href='users.php?action=remember'>Забыли пароль?</a>" +
"</ul>";
}

// блок "Разделы"
navigation +=
"<li><a href='index.php?show_life=1'>Разделы</a>" +
'<ul class="divisions"><li><a href="index.php?forum=1c">1C</a>' +
'    <li><input name="show_v8" type="checkbox" id="show_v8" onclick="onMenuSetingChange(\'show_v8\');" '+getSetting('show_v8')+'><a href="index.php?forum=1c&amp;v8=1">&nbsp;v8</a>' +
'    <li><input name="show_v7" type="checkbox" id="show_v7" onclick="onMenuSetingChange(\'show_v7\');" '+getSetting('show_v7')+'><a href="index.php?forum=1c&amp;v7=1">&nbsp;v7</a>' +
'    <li><input name="show_it" type="checkbox" id="show_it" onclick="onMenuSetingChange(\'show_it\');" '+getSetting('show_it')+'><a href="index.php?forum=it">IT</a>' +
'    <li><input name="show_life_new" type="checkbox" id="show_life_new" onclick="onMenuSetingChange(\'show_life_new\');" '+getSetting('show_life_new')+'><a href="index.php?forum=life">LIFE</a>' +
'    <li><a href="index.php?forum=moder">MODER</a>' +
'</ul>'; 
'<li><a href="index.php?show_life=1">Секции</a>' + 
'<ul>';

// блок "Секции"
navigation += '<li><a href="index.php?show_life=1">Секции</a>' + 
'<ul class="sections">' +
   $('#section_selector').children('OPTGROUP').map(function() {
        return '<li>'+$(this).attr('label')+'<ul>' + 
               $(this).children().map(function(){
                    return "<li><a href='index.php?"+$(this).val()+"'>"+$(this).html()+"</a>";
               }).get().join('')+"</ul>";
    }).get().join('') + "</ul>";
    
// блок "Модерация"
navigation += 
'<li><a href="/moderated.php">Действия модераторов</a>'+
'<ul>'+
'<li><a href="/ban_list.php">Бан-лист</a>'+
'<li><a href="/users_list.php">Новые пользователи</a>'+
'<li><a href="/forum_settings.php">Настройки форума</a>'+
'</ul>';

// блок "Новая тема"
navigation += 
"<li><a href='#' id='new_topic' id='new_topic'>Новая тема</a>";

navigation += '</ul>';

$("#user-td").parent().html("<td id='new-navigation-td' colspan=2>"+navigation+"</td>");
$('#new_topic').click(showTopicForm);
// "Накидываем" стиль

addGlobalStyle(
"#menu, #menu ul {list-style: none;margin: 0;padding: 0;border: 0;float: left;   width: 100%;   font-size: 90%;}\n"+ 
"#menu li {   float: left;text-align:center;   position: relative;   background: #ccc;margin-right:10px;   border-right:0;}\n"+
"#menu li ul {   display: none;   position: absolute;   padding:0;   width: 198px;border:1px solid #888;}\n"+
"#menu li li {    width: 198px;}\n"+
"#menu a {   color: #000;  text-decoration: none;   display: block;   width: 180px;   padding: 2px 10px; }\n"+
"#menu a:hover {   color: #fff;   background: #888; }\n"+
"#menu li:hover {   background: #888; }\n"+
"#menu li li a {   width: 178px;   background: none; text-align:left; }\n"+ 
"#menu li .divisions li input {   float: left; }\n"+ 
"#menu li:hover ul {   display: block; }\n"+ 
"#menu li:hover li ul {   display: none;   width: 198px;   top: 0px;   left: 194px; }\n"+
"#menu li:hover li:hover ul {   display: block; }\n"+
"#menu li form { margin:0 10px; }\n"+
"#menu li:hover li:hover label { color: #fff; }\n"+
"");
} //makeNavigation()

onMenuSetingChange = unsafeWindow.onMenuSetingChange = function (id) {
    setCookie(id, getCookie(id)=='no' ? 'yes' : 'no');
    window.location=document.URL;
}

showTopicForm = unsafeWindow.showTopicForm = function () {
    if($('div#vual').length==0){
    var vual=document.createElement('div');
    vual.id='vual';
    vual.style.cssText='z-index:9999; position:absolute; background-color:#808080; left:0; top:0; width:100%; height:1000; opacity: 0.5';
    var body=document.getElementsByTagName('body')[0];
    if (!body) {alert('Fuck!'); return false; }
    body.appendChild(vual);
    }else{$('div#vual').show();}
    $('div#F').show(); 
    return false;
}

hideForm = unsafeWindow.hideForm = function(name){$(name).hide(); $('div#vual').hide(); return false;}

m_sendMessage = unsafeWindow.m_sendMessage = function(_k) {
    if($('div#messageForm'+_k).length==0) {alert('Fuck!');return false;}
    _prm={};
    if(_prm.message_text=$('div#messageForm > #message_text').val()) {
        _prm.action = 'new';
        _prm.user_name=$('div#messageForm > #user_name').val();
        topic_id=_prm.topic_id=$('div#messageForm > #__msg_topic_id').val();
        _prm.as_admin=true;
        _prm.rnd=Math.floor(Math.random()*100000000);
        _k=$('div#messageForm > #__msg_k').val();
        _prm.message_text=_prm.message_text.replace(/\+/g,"___plus___");
        __prm="";for(_pp in _prm){__prm+=_pp+"="+escape(_prm[_pp])+"&"}
        //alert(__prm);
        $.ajax({
            type:'POST',
            url: 'ajax_newmessage.php',
            data: __prm,
            contentType: "text/plain",
            success: function(){getmessage(_k,topic_id,1,+2); hideForm('div#messageForm');}
        });
    }else{return hideForm('div#messageForm');}
}

showMessageForm = unsafeWindow.showMessageForm = function (_k, topic_id) {
    var messageForm=$("<div id='messageForm"+_k+"''></div>");
    messageForm.css({borderWidth:'medium',marginLeft:'40px',marginTop:'13px'});
    messageForm.append('<textarea name="message_text" id="message_text" cols=80 rows=10 wrap="PHYSICAL" class="fieldbasic"></textarea><br><input name="Submit" type="button"  class="sendbutton" id="submit_message" value="Отправить">&nbsp;<input class="sendbutton" type="reset" value="Отменить" id="cancel_message"><input type="hidden" id="__msg_topic_id" name="topic_id" value='+topic_id+'><input type="hidden" id="__msg_k" name="_k" value='+_k+'>');
    $($("#msg" + _k).children()[0]).replaceWith(messageForm);
    $("#submit_message",messageForm).click(function(){m_sendMessage(_k);return false;});
    $("#cancel_message",messageForm).click(function(){m_sendMessage(_k);return false;});
    return false;
}


//unsafeWindow.getmsg=unsafeWindow.getmessage;
// своя функция getmessage
getmessage = unsafeWindow.getmessage = function(_k, _topic_id, _message_n, _direction) {
    $("#msg" + _k).css({visibility:''});
    $.ajax({
        type: 'POST',
        url:  'ajax_getmessage.php',
        data: "k="+_k+"&topic_id="+_topic_id+"&message_n="+_message_n+"&direction="+_direction,
        contentType: "text/plain",
        success: function(json) {
            json = eval('('+json.replace(/[^\{]*/,"").replace(/[^\}]*$/,"")+')');
            message_html = json.message_html;
            if(message_html) {
                // наконец сделаем то, ради чего затевалась эта бадяга!
                message_html = message_html.replace("&rarr;", "&rarr;]</span>&nbsp;&nbsp;<span style='cursor:pointer; color:gray' onmouseover='this.style.color=\"red\"' onmouseout='this.style.color=\"gray\"' onclick='showMessageForm("+_k+","+_topic_id+")'>[+");
                $("#msg" + _k).html("<blockquote style='font-size:10pt; background-color:#F0F0D0;'>" + message_html + "<\/blockquote>").show();
			    $("#tmsg" + _k).html('&minus;');
			}
		}
    });
}

// All your GM code must be inside this function
function letsJQuery() {
    // 1. Вместо верхнего баннера ставим форму поиска
    var search_form = $("form[name='findform']").parent();
    $('#banner-td').html(search_form.html());
    search_form.html("&nbsp;");
    
    // 3. Переделываем навигацию
    makeNavigation();
    // 2. Прифодим в порядок форму топика
    
    $('div#F').css({zIndex:10000, position: 'absolute', top: 120, backgroundColor: '#808080', padding:'1em', borderWidth: 'medium'}).hide();
    $('input#Submit').after("&nbsp;<input class='sendbutton' type='reset' value='Отменить' id='btn_cancel'>");
    $('div#F').css({left: ($('body').width()-$('div#F').width())/2, });
    $('#newtopic_form').submit(function(){ hideForm('div#F');return true;});
    $('#btn_cancel').click(function(){hideForm("div#F");});
}


// подключение jQuery
if(typeof unsafeWindow.jQuery == 'undefined'){
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);
}
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,5); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();



