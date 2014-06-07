// ==UserScript==
// @name           Save Friends Com Center
// @namespace      SaveComCenterBattlelog
// @author         sharkiller
// @include        http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

var unsafeWindow = this['unsafeWindow'];
if(/Opera|Chrome|Chromium/.test(navigator.userAgent)) {
	unsafeWindow = window;
	if(/Chrome|Chromium/.test(navigator.userAgent)){
		var div = document.createElement("div");
		div.setAttribute("onclick", "return window;");
		unsafeWindow = div.onclick();
	}
}

var $ = unsafeWindow.jQuery;

String.prototype.format = function() {
    var s = this,
        i = arguments.length;
    while (i--) {
        s = s.replace(new RegExp('\\{'+i+'\\}','gm'), arguments[i]);
    }
    return s;
};


$(document).ready(function() {
	$('#comcenter-tab-friends-content').prepend('<div id="GM_ImportFriends" style="cursor: pointer;"><img src="http://i.imgur.com/sKEgI.png" title="Importar" style="vertical-align: middle;"/> <b>Importar</b></div>');
	$('#comcenter-tab-friends-content').prepend('<div id="GM_ExportFriends" style="cursor: pointer;"><img src="http://i.imgur.com/ZJWeY.png" title="Exportar" style="vertical-align: middle;"/> <b>Exportar</b></div>');
	$('#GM_ExportFriends').click(function(){
		var list = $('.comcenter-username-link');
		var username_list = "";
		list.each(function(index){
			username_list += $(this).text()+","+
				$(this).parent().parent().attr('rel')+';';
		});
		prompt('Guarda el siguiente texto:',username_list);
	});
	
	$('#GM_ImportFriends').click(function(){
		postchecksum = $('#base-header-search-form input[name="post-check-sum"]').val();
		text = prompt('Ingrese el texto:');
		var usernames = text.split(';');
		alert('Hay '+(usernames.length-1)+' amigos. ');
		requesthtml = '<div class="profile-username">\
			<div id="profile-interact">\
				<div class="profile-add-friend">\
					<form class="friendship profile-friendship" method="post" action="/bf3/friend/requestFriendship/{1}/">\
						<input type="hidden" value="{2}" name="post-check-sum">\
						<input type="submit" value="Agregar como amigo" class="base-button-addfriend-wide allow-add">\
					</form>\
				</div>\
			</div>\
			<h1 class="profile-username-eaid">{0}</h1>\
		</div>';
		var fullhtml = '';
		for(var i=0; i<usernames.length-1;i++){
			user = usernames[i].split(',');
			fullhtml += requesthtml.format(user[0],user[1],postchecksum);
		}
		$('#content .base-middle').attr('style','padding:20px').html(fullhtml);
	});
});
