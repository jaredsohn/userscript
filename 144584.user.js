// ==UserScript==
// @name           DROM posts listener
// @namespace      fnx
// @include        http://forums.drom.ru/*
// @author         Fenex
// @version        1.1.2
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=d9c74d6be48e0163e9e45b54da0b561c&r=PG&s=48&default=identicon
// ==/UserScript==
var div = document.createElement('div');
div.id = 'fnx_hidden';
div.setAttribute('style', 'display:none;');
document.body.appendChild(div);

function sendRequest() {
    //console.log('sendRequest start');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', '/'+location.href.match(/^http:\/\/forums.drom.ru\/([\w\-]+)/)[1]+'/t'+fnx_script.theme+'-p'+fnx_script.page+'.html', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var txt = xmlhttp.responseText;
                txt = txt.substring(txt.toLowerCase().indexOf('<body>')+6, txt.toLowerCase().indexOf('</body>'));
                txt = txt.replace(/\<style[\s\S]+?\<\/style\>/img, "");
                txt = txt.replace(/\<script[\s\S]+?\<\/script\>/img, "");
                txt = txt.replace(/\<noindex[\s\S]+?\<\/noindex\>/img, "");
				txt = txt.replace(/ (?:src|title|action) ?\= ?'?"?(?:http\:\/\/|www\.)(?!(?!(counter|yummy)).*\.drom)[\w\.\/\\\-\?\=]+\'?\"?/img, '');
                document.getElementById('fnx_hidden').innerHTML = txt;
				//console.log(txt);
                next_step();
            } else {
                fnx_script.timer = setTimeout('sendRequest()', fnx_script.timeout);
            }
        }
    };
    xmlhttp.send(null);   
}

function getNumberPage(root) {
	var input = root.getElementsByClassName('pagination_top')[0].getElementsByClassName('popupctrl')[0];
	if(!input)
		return 1;
	else
		input = parseInt(input.innerHTML.match(/\d+$/)[0]);
	if(isNaN(input)) {
		return 0;
	}
	
	return input;
}

function next_step() {
    //console.log('next_step start');
    var postblock = document.getElementById('posts');
    var home = document.getElementById('fnx_hidden');
    var posts = home.getElementsByClassName('posts')[0].getElementsByTagName('li');
    var posts_new = new Array();
    var id_now = 0;
    
    for(var i=0; i<posts.length; i++) {
        if(!posts[i].hasAttribute('id'))
            continue;

		id_now = posts[i].getAttribute('id');
        id_now = parseInt(id_now.replace(/[^\d]/g, ''));
        if(id_now<=fnx_script.message)
            continue;
        
        fnx_script.message = id_now;
        posts_new.push(posts[i]);
    }

    for(var i=0; i<posts_new.length; i++)
        postblock.appendChild(posts_new[i]);
	
    var input = getNumberPage(home);
	if(!input) {
		fnx_script.timer = setTimeout('sendRequest()', fnx_script.timeout);
		return;
	}

    if(input > fnx_script.page) {
        fnx_script.page = input;
        var li = document.createElement('li');
        li.innerHTML = '<div class="posthead" style="text-align:center;font-weight:bold;color:brown;">Страница №'+fnx_script.page+'</div>';
        li.setAttribute('class', 'postbitlegacy postbitim postcontainer');
        postblock.appendChild(li);
    }    

    fnx_script.timer = setTimeout('sendRequest()', fnx_script.timeout);
    return;
}

function init() {
    //console.log('init start');
	fnx_script.theme = location.href.match(/\d+/)[0];
	fnx_script.page = getNumberPage(document);
	if(!fnx_script.page) {
		return false;
	}
	fnx_script.message = last_post_id;
	fnx_script.timeout = 5000;
	fnx_script.timer = setTimeout('sendRequest()', fnx_script.timeout);
	
	var li = document.createElement('li');
	li.innerHTML = '<div class="posthead" style="text-align:center;font-weight:bold;color:white;background:white url(http://forums.drom.ru/includes_drom/images/menu_bar.gif) 0 0 repeat-x;">DROM listener enabled</div>';
	li.setAttribute('class', 'postbitlegacy postbitim postcontainer');
	document.getElementById('posts').appendChild(li);
	
	return true;

}

var script = document.createElement('script');
script.innerHTML = 'var fnx_script = {};' + init + next_step + sendRequest + getNumberPage + ';init();';
document.body.appendChild(script);