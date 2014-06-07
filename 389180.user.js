// ==UserScript==
// @name           btGigs-SSL
// @version        2.2.5
// @author         by Upgreydd, mod by jerry1333
// @updateURL      http://userscripts.org/scripts/source/389180.user.js
// @description    wybor miedzy SSL a zwyklymi linkami w browse.php i seedtimelist.php
// @include        http*://btgigs.info/browse.php*
// @include        http*://btgigs.info/seedtimelist.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @require        http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==

if(GM_getValue('SSL')) {
    labelSSL = 'Wyłącz';
} else {
    labelSSL = 'Włącz';
}

if(GM_getValue('WL')) {
    labelWL = 'Wyłącz';
} else {
    labelWL = 'Włącz';
}

if(GM_getValue('THX')) {
    labelTHX = 'Wyłącz';
} else {
    labelTHX = 'Włącz';
}

if(GM_getValue('NoSTD')) {
    labelNoSTD = 'Włącz';
} else {
    labelNoSTD = 'Wyłącz';
}

GM_registerMenuCommand( labelSSL+' ikony SSL', SetSSL);
GM_registerMenuCommand( labelWL+' ikony WishList', SetWL);
GM_registerMenuCommand( labelWL+' ikony THX', SetTHX);
GM_registerMenuCommand( labelNoSTD+' ikony bez SSL', SetNoSTD);

function SetSSL() {
    if(GM_getValue('SSL')) {
        GM_setValue('SSL',false);
    } else {
        GM_setValue('SSL',true);
    }
    location.reload();
}

function SetWL() {
    if(GM_getValue('WL')) {
        GM_setValue('WL',false);
    } else {
        GM_setValue('WL',true);
    }
    location.reload();
}

function SetTHX() {
    if(GM_getValue('THX')) {
        GM_setValue('THX',false);
    } else {
        GM_setValue('THX',true);
    }
    location.reload();
}

function SetNoSTD() {
    if(GM_getValue('NoSTD')) {
        GM_setValue('NoSTD',false);
    } else {
        GM_setValue('NoSTD',true);
    }
    location.reload();
}

unsafeWindow.WLurl = function(id,name) {
    var dataString = 'id='+id+'&bookmark=1';  
    $.ajax({  
        type: "GET",  
        url: "details.php",  
        data: dataString,  
        success: function() {  
            alert('Dodano:  '+name);
        }  
    });  
    return false;  
}

unsafeWindow.THXurl = function(id,name) {
    var dataString = 'submit=Dzięki&torrentid='+id;
    $.ajax({  
        type: "POST",  
        url: "thanks.php",  
        data: dataString,  
        success: function() {  
            alert('Podziękowano za torrent '+name+'!');
        }  
    });  
    return false;  
}

if(GM_getValue('SSL',false)){
    $('a.index').each(function() {
        var url = $(this).attr('href');
        var sslurl = url.replace('download.php','download_ssl.php');
        sslurl = sslurl.replace('download_stm.php','download_ssl.php');
        var sslimage = "http://jerry1333.net/upload/userscript/ssl_free.gif";
        var ssltitle = "(FREE)";
        if($(this).children().attr("src") == "pic/ico_disk2.png") {
            sslimage = "./pic/ssl.gif";
            ssltitle = "(NO FREE)";
        }
        $(this).parent().append("&nbsp;<a href="+sslurl+" align=\"center\" class=\"index-ssl\" title=\"Szybko pobierz torrenta SSL "+ssltitle+"\"><img align=\"center\" border=\"0\" alt=\"Szybko pobierz torrenta SSL\" src=\""+sslimage+"\" /></a>");
    });
} 

if(GM_getValue('WL',false)){
    $('a.index').each(function() {
        var wurl = $(this).parent().parent().children(':nth-child(2)').children(':first-child').attr('href');
        wurl = wurl.replace('details.php?id=','');
        var name = $(this).parent().parent().children(':nth-child(2)').children(':first-child').html();
        name = name.replace('<b>','');
        name = name.replace('</b>','');
        $(this).parent().append('&nbsp;<a title="Dodaj do zakładek: '+name+'" href="javascript:WLurl(\''+wurl+'\',\''+name+'\');void(0)"><img align=\"center\" border=\"0\" alt=\"Dodaj do zakładek\" src=\"./pic/bookmark.png\" /></a>');
    });
}

if(GM_getValue('THX',false)){
    $('a.index').each(function() {
        var wurl = $(this).parent().parent().children(':nth-child(2)').children(':first-child').attr('href');
        var id = wurl.replace('details.php?id=','');
        var name = $(this).parent().parent().children(':nth-child(2)').children(':first-child').html();
        name = name.replace('<b>','');
        name = name.replace('</b>','');
        $(this).parent().append('&nbsp;<input type="button" onClick="THXurl(\''+id+'\',\''+name+'\');void(0)" value="Dzięki!" style="cursor: hand;" />');
    });
}

if(GM_getValue('NoSTD',false)){
    $('a.index').each(function() {
        $(this).remove();
    });
}
