// ==UserScript==
// @name           Ask.Fm Auto Liker
// @version	       V 12
// @description	   Ask.fm - Auto Liker
// @include        http://ask.fm/*
// @icon	       http://s3.amazonaws.com/uso_ss/icon/166317/large.jpg
// @author	       Luna Bent
// @copyright	   Luna Bent
// ==/UserScript==
// ==VAR==
var values = [
    '<a href="http://file1scriptz.funpic.de/url.html?=npage" target="_blank"><img src="http://www.npage.de/banner/728x90-npage_02.gif" border=0></a>',
    '<a href="http://file1scriptz.funpic.de/url.html?=npage" target="_blank"><img src="http://www.npage.de/banner/728x90-npage_01.gif" border=0></a>'
],
setads = values[Math.floor(Math.random() * values.length)];
document.getElementById('leaderboard') .innerHTML = setads;
// ==============
// ==Settings==
body = document.body;
if (body != null) {
    div2 = document.createElement('div');
    div2.setAttribute('id', 'set');
    div2.style.position = 'fixed';
    div2.style.width = '125px';
    div2.style.top = '+7px';
    div2.style.right = '+2px';
    div2.style.zIndex = '9999';
    div2.innerHTML = '<div id='settings'><img onclick='set()' height='15' width='15' src='http://file1scriptz.funpic.de/pic/settings.png' alt='Settings'></div>';
    body.appendChild(div2);
}
body = document.body;
if (body != null) {
    div2 = document.createElement('div');
    div2.setAttribute('id', 'checkbox');
    div2.innerHTML = '<div><form name="settings">Show Ads: <input type="checkbox" onclick="AdsCookie();" checked></form><br><br><a href="javascript:close();">Close</a></div>';
    body.appendChild(div2);
    document.getElementById('checkbox') .style.visibility = 'hidden';
}
unsafeWindow.set = function () {
    document.getElementById('checkbox') .style.visibility = 'visible';
    GM_addStyle('#checkbox {visibility : hidden;position : fixed;left : 0;top : 0;width : 100%;height : 100%;text-align : center;z-index : 9999;}#checkbox div {width : 300px;margin : 100px auto;background-color : #fff;border : #000 solid 1px;padding : 15px;text-align : center;}');
}
unsafeWindow.close = function () {
    document.getElementById('checkbox') .style.visibility = 'hidden';
}
// ==============
// ==Cookies==

unsafeWindow.AdsCookie = function () {
    var a = new Date();
    a = new Date(a.getTime() + 1000 * 60 * 60 * 24 * 365);
    document.cookie = 'Ads=No; path=/; expires=' + a.toGMTString() + ';';
    ;
    GM_addStyle('#leaderboard{height: 0px;width: 0px;border-radius: 0px;-moz-border-radius: 0px;-webkit-border-radius: 0px;padding: 0px;margin: 0px;}');
}
if (document.cookie.indexOf('Ads=No') >= 0) {
    GM_addStyle('#leaderboard{height: 0px;width: 0px;border-radius: 0px;-moz-border-radius: 0px;-webkit-border-radius: 0px;padding: 0px;margin: 0px;}');
    document.getElementById('checkbox') .style.visibility = 'hidden';
    document.getElementById('checkbox') .innerHTML = '<div><form name="settings">Show Ads: <input type="checkbox" onclick="DelAdsCookie()"></form><br><br><a href="javascript:close();">Close</a></div>';
}
unsafeWindow.DelAdsCookie = function () {
    document.cookie = 'Ads=No; path=/; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    GM_addStyle('#leaderboard{display:block;position:relative;overflow:hidden;width:728px;height:90px;padding:3px;margin:0 auto 10px;background-color:#FFF;border:0;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px}div.bSlot{display:block;width:468px;height:60px;margin:0 auto;padding:0;border:0;text-decoration:none}');
}
// ==============
// ==Profile==

body = document.body;
if (body != null) {
    div2 = document.createElement('div');
    div2.setAttribute('id', 'spoiler');
    div2.style.position = 'fixed';
    div2.style.width = '125px';
    div2.style.opacity = 0.9;
    div2.style.bottom = '+65px';
    div2.style.left = '+6px';
    div2.style.backgroundColor = '#ff00ae';
    div2.style.border = '1px solid #555';
    div2.style.padding = '2px';
    div2.innerHTML = '<div style='background-color: #00a2ff; color: #FFFFFF; border: 1px solid #00a2ff;'><a style='color: #FFFFFF;' onclick='spoiler()' title='Click to hide'>&laquo;</a> &#8226; <a href='http://ask.fm/MikeMeyer' title='Mein Ask.fm' style='color: #FFFFFF;'>Mein Ask.fm</a></div> '
    body.appendChild(div2);
    unsafeWindow.spoiler = function () {
        var i;
        for (i = 1; i <= 20; i++) {
            var x = document.getElementById('like' + i);
            if (x.style.display == 'none') {
                x.style.display = 'block';
                div2.innerHTML = '<a onclick='spoiler()' title='Ask Me'>&laquo;</a> &#8226; <a href='http://ask.fm/MikeMeyer'>Fragt Mich</a>'
            } 
            else {
                x.style.display = 'none';
                div2.innerHTML = '<a onclick='spoiler()' title='Alles Like´n'> Auto like page &raquo;</a>'
            }
        }
    };
}
// ==============
// ==Like All==

body = document.body;
if (body != null) {
    div = document.createElement('div');
    div.setAttribute('id', 'like2');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '125px';
    div.style.opacity = 0.9;
    div.style.bottom = '+42px';
    div.style.left = '+6px';
    div.style.backgroundColor = '#eceff5';
    div.style.border = '1px solid #94a3c4';
    div.style.padding = '2px';
    div.innerHTML = '<img src='https://lh4.googleusercontent.com/-D1HYuLwPnNQ/TxPK6cm_THI/AAAAAAAAAIE/ynATGaxGbv0/s16/Facebook%252520Like%252520Small.jpg' width='16' height='14' align='absmiddle' />&nbsp;&nbsp;<a onclick='LikeAll()'>Alles Like´n</a>'
    body.appendChild(div);
    unsafeWindow.LikeAll = function () {
        document.getElementsByClassName('submit-button-more') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        document.getElementsByClassName('like hintable') [0].click();
        buttons = document.getElementsByTagName('button');
        for (i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute('class');
            if (myClass != null && myClass.indexOf('like') >= 0)
            if (buttons[i].getAttribute('name') == 'likern false;')
            buttons[i].click();
        }
    };
}
// ==Follow==

body = document.body;
if (body != null) {
    div = document.createElement('div');
    div.setAttribute('id', 'Follow');
    div.style.position = 'fixed';
    div.style.display = 'block';
    div.style.width = '125px';
    div.style.opacity = 0.9;
    div.style.bottom = '+18px';
    div.style.left = '+6px';
    div.style.backgroundColor = '#eceff5';
    div.style.border = '1px solid #94a3c4';
    div.style.padding = '2px';
    div.innerHTML = '+ &nbsp;&nbsp;<a onclick='followone()'>Folgen!</a>'
    body.appendChild(div);
    unsafeWindow.followone = function () {
        document.getElementsByClassName('link-green') [0].click();
        buttons = document.getElementsByTagName('button');
        for (i = 0; i < buttons.length; i++) {
            myClass = buttons[i].getAttribute('class');
            if (myClass != null && myClass.indexOf('like') >= 0)
            if (buttons[i].getAttribute('name') == 'likern false;')
            buttons[i].click();
        }
    };
}
// ==============
