// ==UserScript==
// @name            lide.cz
// @identifier      http://userscripts.org/scripts/source/66058.user.js
// @description     Počet přátel (muži a ženy). Odkazy na vyhledávání podle e-mailové adresy na Facebook.com, Google.cz, Pipl.com. Odkaz na profil ICQ. Odkaz na hledání na Google podle ICQ. Profilové foto z ICQ. Odkaz na volání, chat, informace o uživateli na Skype.
// @namespace       http://userscripts.org/users/125537
// @include         http://*.lide.cz/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @require         http://buzzy.hostoi.com/AutoUpdater.js
// @author          http://www.dotek.info
// @copyright       2010, Dotek.info
// @date            2010-01-10
// @license         Creative Commons CC-BY-SA; http://creativecommons.org/licenses/by-sa/3.0/
// @version         0.6
// @unwrap
// ==/UserScript==

var script_id = 66058;
var script_version = '0.6';

var aBoy = ["muž","muži","mužů"];
var aGirl = ["žena","ženy","žen"];
var aFriends = ["přítel","přátelé","přátel"];
var sSearch = 'Najdi na';
var sProfile = 'Profil na';
var sUserInfo = 'Informace o uživateli';

if($("#friend-actions")) {
    var iGirl = $("#friend-list .girl").length;
    var iBoy = $("#friend-list .boy").length;
    var iCount = iGirl + iBoy;

    var sInfo = '';
    sInfo += gFormulation(iGirl, aGirl);
    if(iGirl > 0 && iBoy > 0) {
        sInfo += ' a ';
    }
    sInfo += gFormulation(iBoy, aBoy);
    if(iCount > 1) {
        if(iCount > 1 && iCount < 5){sFriends = aFriends[1];}
        else {sFriends = aFriends[2];}
        sInfo = iCount+' '+sFriends+' ('+sInfo+')';
    }

    if(sInfo) {
        $("#friend-actions").after('<p style="text-align:center"><br>'+sInfo+'</p>');
    }


    $("h3.username a").each(function (i) {
        var sHtml = gLinks($(this).text());
        $(this).parent('h3').after(sHtml);
    });
}

if($("#aboutMe")) {
	var sSpan = $("#profileTitle h2 span").text();
    $("#profileTitle h2 span").text('');
    var sHtml = gLinks($("#profileTitle h2").text());
    $("#profileTitle h2 span").text(sSpan);
    $(".age").after(sHtml);

	// Skype
    var oSkype = $('#contacts .status img[src^="http://mystatus.skype.com"]');
    oSkype.parent().next('span,div').text('');
    var sSkype = $.trim(oSkype.parent().parent('li').text());
    if(sSkype) {
        sHtml = '<div></div><span>Skype:</span> ';
		sHtml += '<a rel="me" title="Zavolat '+sSkype+'" href="skype:'+sSkype+'?call"><img src="http://mystatus.skype.com/smallicon/'+sSkype+'" height="16" width="16"></a> ';
		sHtml += '<a rel="me" title="'+sUserInfo+' '+sSkype+'" href="skype:'+sSkype+'?userinfo"><img src="http://c.skype.com/i/images/icons/info_128x128_alpha.png" height="16" width="16"></a> ';
		sHtml += '<a rel="me" title="Napsat '+sSkype+'" href="skype:'+sSkype+'?chat"><img src="http://c.skype.com/i/images/icons/chat_48x48_alpha.png" height="16" width="16"></a> ';
		sHtml += '<a rel="me" title="Přidat do kontaktů '+sSkype+'" href="skype:'+sSkype+'?add"><img src="http://c.skype.com/i/images/icons/addcontact_48x48_alpha.png" height="16" width="16"></a> ';


		sHtml += sSkype;
		oSkype.parent().parent().html(sHtml);
	}

	// ICQ
    var oICQ = $('#contacts .status img[src^="http://web.icq.com"]');
    oICQ.parent().next('span').text('');
    var iICQ = $.trim(oICQ.parent().parent('li').text()).replace('-','').replace('-','').replace('-','');
    if(iICQ) {
        // ICQ link
		sHtml = '<div></div><span>ICQ:</span> ';
        sHtml += gAnchor('ICQ.com','http://web.icq.com/'+iICQ,'http://web.icq.com/whitepages/online?icq='+iICQ+'&img=5');
        sHtml += gAnchor('Google.cz','http://www.google.cz/search?hl=cs&q='+iICQ,'http://www.google.com/favicon.ico');
		sHtml += ' '+iICQ;
        oICQ.parent().parent().html(sHtml);
		// ICQ avatar
		sHtml = '&nbsp;<span style="float:right">';
        sHtml += '<a rel="me" target="_blank" href="http://web.icq.com/'+iICQ+'" title="'+sProfile+' ICQ.com">';
        sHtml += '<img src="http://c.icq.com/people/img/show_photo.phpc?uin='+iICQ+'" alt="'+sProfile+' ICQ.com"></a>';
        sHtml += '</span>';
        $(".avatar").append(sHtml);
    }

}

function gFormulation(i,a) {
    si = '';
    if(i > 0) {
        if(i == 1) {s = a[0];}
        else if(i > 1 && i < 5) {s = a[1];}
        else {s = a[2];}
        si += i+' '+s;
    }
    return si;
}

function gLinks(address) {
    address = $.trim(address);
    var sEmail = '';
    if(address.indexOf("@") != -1) {
        sEmail = address;
    }
    else {
        sEmail = address+'@seznam.cz';
    }
    sHtml = '<p>';
    sHtml += gAnchor('Facebook.com','http://www.facebook.com/search/?q='+sEmail,'http://www.facebook.com/favicon.ico');
    sHtml += gAnchor('Google.cz','http://www.google.cz/search?hl=cs&q=%22'+sEmail+'%22','http://www.google.com/favicon.ico');
    sHtml += gAnchor('Pipl.com','http://pipl.com/search/?CategoryID=4&Interface=1&Email='+sEmail,'http://pipl.com/favicon.ico');
    sHtml += ' <a href="mailto:'+sEmail+'">'+sEmail+'</a></p>';
    return sHtml;
}


function gAnchor(sName,sHref,sSrc) {
    var sHtml = '';
    sHtml += '<a title="'+sSearch+' '+sName+'" target="_blank" href="'+sHref+'">';
    sHtml += '<img src="'+sSrc+'" width="16" height="16" alt="'+sSearch+' '+sName+'"></a> ';
    return sHtml;
}