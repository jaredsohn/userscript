// ==UserScript==
// @name           Vkontakte 2.0  Refresh
// @description    Reloads Inbox Automatically thru ajax request
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*

// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==
// Copyright Nagaev Maksim  <nagaev.maksim@gmail.com>
var cntold = 0;
var pagetitle = document.title;
var mydiv = document.createElement('div');
mydiv.width = "10";
mydiv.height = "10";
mydiv.id = "mydiv";
mydiv.style.display = "none";
document.body.appendChild(mydiv);

// Refresh Settings
var reload = GM_getValue("reload", 30); // Amount of seconds between reloads
GM_registerMenuCommand("Set Refresh Time", function(){
    var time = prompt("Seconds between refreshes:\n(must be greater than 1)", reload / 1000);
    window.location.reload();
    if (time >= 1) {
        GM_setValue("reload", time);
        reload = GM_getValue("reload", 30);
    }
    else 
        if (time < 1) {
            alert('The number must be greater than 1!');
        }
        else {
            alert('Must be a number!');
        }
});
reload = reload * 1000;

function VKRefresh(){
	
	var counterElement = jQuery("#nav a[href*='mail.php'] b");
	var allMessagesElement = jQuery("#nav a[href*='mail.php']");
	var href = window.location.host;
	var site = (href.indexOf("vk.com") != -1 ? 'com' : 'ru');
	var setNewIcon = function () {
		if (site == 'ru') {
			jQuery("link[href='/images/favicon.ico']").replaceWith("<link href='http://img527.imageshack.us/img527/9803/faviconiq1.gif' rel='shortcut icon'/>");
		} else if(site == 'com'){
			jQuery("link[href='/images/faviconvk.ico']").replaceWith("<link href='http://img402.imageshack.us/img402/6467/faviconvk.gif' rel='shortcut icon'/>");
		}
	}
	var setStdIcon = function () {
		if (site == 'ru') {
			jQuery("link[href='http://img527.imageshack.us/img527/9803/faviconiq1.gif']").replaceWith("<link href='http://vkontakte.ru/images/favicon.ico' rel='shortcut icon'/>");
		} else if(site == 'com'){
			jQuery("link[href='http://img402.imageshack.us/img402/6467/faviconvk.gif']").replaceWith("<link href='/images/faviconvk.ico' rel='shortcut icon'/>");
		}
	}
    //make sure there is no conflict between jQuery and other libraries

    jQuery.getJSON("mail.php", function(data){
        var patt = /<table.*class="inbox">[\s\S]*<\/table>/i
        var result = patt.exec(data.content).toString();

        // Т.к. при добавлении html в innerHTML происходит разбор html, то подгружаются все
        // указанные в документе ресурсы, надо это каким то образом предотвращать...
        // например заменой атрибутов href, src, import, data на не валидные
        
        result = result.replace(/\bhref=/gi, "_href=");
        result = result.replace(/\bsrc=/gi, "_src=");
        result = result.replace(/\bimport=/gi, "_import=");
        result = result.replace(/\bdata=/gi, "_data=");
        
        //Таблицу делаем валидной
        var tblcontent = result.replace(/<table.*class="inbox">/, '').replace(/<\/table>/, '')
        jQuery("#mydiv").html('<table><thead><tr><th></th></tr></thead><tbody>' + tblcontent + '</tbody><tfoot><tr><th></th></tr></tfoot></table>');
        var cnt = jQuery("#mydiv .newRow .messageSnippet .messageBody").length;

        if (cnt) {
            if (counterElement.length) {
				counterElement.html(cnt);	
            } else {
                allMessagesElement.html('Мои Сообщения (<b>' + cnt + '</b>)');
            }
            setNewIcon()
            document.title = cnt + " New " + pagetitle;
        } else {
            setStdIcon();
            document.title = pagetitle;
			allMessagesElement.html('Мои Сообщения');
        }
        cntold = cnt;
        var random_num = (Math.round((Math.random() * 9000) + 1000))
        setTimeout(function(){
            VKRefresh();
        }, reload + random_num);
    }, 'JSON');
}

VKRefresh();
