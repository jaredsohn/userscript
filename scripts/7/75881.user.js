// ==UserScript==
// @name           eRepublik Login Switcher
// @namespace      ereploginswitcher
// @description Tired of having to logout/login to switch between your citizen and organization accounts? No more! Just enter your login information once and then it's just the click of a button! This script will then automatically log you off and log you back into the account you selected. Warning: Your account password(s) will be saved in plaintext (in about:config somewhere) - so don't use this on computers that are publicly available!
// @include        http://*.erepublik.com/*
// @require		http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// @version 2.0
// ==/UserScript==

var version = "2.0";

var logins = [];
GM_addStyle("div.logins { height: auto !important; float: left; background-color: #FFFFFF; padding: 2px !important; margin: 2px 0px 2px 0px;  width: 66px; color: #808080; overflow:hidden; }");
GM_addStyle("div.logins:hover { float: left; color: white; background-color: #53B3D3; padding: 2px !important; cursor:pointer; margin: 2px 0px 2px 0px; overflow:visible; width:auto; min-width:66px; }");
GM_addStyle("div.logins2 { float: left; color: white; background-color: #53B3D3; padding: 2px !important; cursor:pointer; margin: 2px 0px 2px 0px; }");
flip = 0;


(function($) {
	$.fn.ellipsis = function(enableUpdating){
		var s = document.documentElement.style;
		if (!('textOverflow' in s || 'OTextOverflow' in s)) {
			return this.each(function(){
				var el = $(this);
				if(el.css("overflow") == "hidden"){
					var originalText = el.html();
					var w = el.width();
					
					var t = $(this.cloneNode(true)).hide().css({
                        'position': 'absolute',
                        'width': 'auto',
                        'overflow': 'visible',
                        'max-width': 'inherit'
                    });
					el.after(t);
					
					var text = originalText;
					while(text.length > 0 && t.width() > el.width()){
						text = text.substr(0, text.length - 1);
						t.html(text + "...");
					}
					el.html(t.html());
					
					t.remove();
					
					if(enableUpdating == true){
						var oldW = el.width();
						setInterval(function(){
							if(el.width() != oldW){
								oldW = el.width();
								el.html(originalText);
								el.ellipsis();
							}
						}, 200);
					}
				}
			});
		} else return this;
	};
})(jQuery);

function deserialize(name, def) {
  return eval(GM_getValue(name, (def || '({})')));
}

function serialize(name, val) {
  GM_setValue(name, uneval(val));
}

unsafeWindow.loginswitcher = true;

logins = deserialize("logins",[]);

function AddUser(object, i, user, pass) {
			object.before('<div class="lss" sid="'+i+'">User: <input class="lsu" type="text" value="'+user+'" style="width: 100px;"><span>&nbsp;&nbsp;&nbsp;Pass: <input class="lsp" type="password" style="width: 100px;"></span><input class="lsr" sid="'+i+'" type="button" value="X"></div>');
			$(".lss[sid=" + i + "] .lsp").attr("value",pass);
			$(".lss[sid=" + i + "] .lsr").click(function(ev) {
				$(ev.target).parent().remove();
			});
}

function Save() {
	logins = [];
	$(".lss").each(function() {
		logins.push({user: $(this).find(".lsu").val(), pass: $(this).find(".lsp").val()});
	});
	serialize("logins",logins);
	ToggleSettings();
}

function ToggleSettings() {
	$('#login_switch').attr("class","logins");
	if (flip % 2 == 0) {
		$('#login_switch').attr("class","logins2");
	}
	$('#login_settings').toggle( flip++ % 2 == 0 );
}

function Main() {
	var loginid = GM_getValue("ls_login", -1);
	if (loginid >= 0 && $("#citizen_password").length > 0) {
		$("#citizen_name").attr('value',logins[loginid].user);
		$("#citizen_password").attr('value',logins[loginid].pass);
		$('#remember').attr('checked', true);
		GM_setValue("ls_login",-1);
		document.getElementsByTagName('form')[0].submit();
	}
	else {
		$('<div id="login_switch" class="logins">LS Settings</div>').insertBefore(".logout").click(function(ev) {
			ToggleSettings();
		});
		$("#login_settings").append("Accounts:");
		
		$("#login_switch").before('<div style="float: left; height: 0px;"><div id="login_settings" style="position: relative; left: 85px; background: none repeat scroll 0% 0% rgb(255, 255, 255); z-index: 999; border: 1px solid black; overflow: auto; display: none; padding: 5px; width: 310px;"></div><div>');
		$('<input id="lsadd" type="button" value="add another user" />').appendTo("#login_settings").click(function() {
			AddUser($('#lsadd'), ++usercount, "", "");
		});
		$('<input type="button" value="Save!" />').appendTo("#login_settings").click(Save);
		$('<input type="button" value="Cancel" />').appendTo("#login_settings").click(ToggleSettings);
		$('<div style="float: right; margin-top: 10px;"><a href="http://userscripts.org/scripts/show/75881" target="_blank">' + version + '</a></div>').appendTo("#login_settings");
		
		var usercount = 0;
		for (var i = 0; i < logins.length; i++) {
			AddUser($('#lsadd'), i, logins[i].user, logins[i].pass);
			usercount = i;
		}
		
		$('.logout').attr("style",'margin-top: 12px;');
		for (var i = 0; i < logins.length; i++) {
			if ($('.citizen_name').html() != null && $.trim($('.citizen_name').html().toLowerCase()) == logins[i].user.toLowerCase())
				continue;
			$('<div class="logins" lsid="'+i+'">'+ logins[i].user +'</div>').insertBefore(".logout").click(function(ev) {
				GM_setValue("ls_login",parseInt($(ev.target).attr('lsid')));
				if (GM_getValue("ls_login", -1) >= 0)
					window.location.href = "http://www.erepublik.com/en/logout";
			});
			$("div[sid=" + i + "]").ellipsis();
		}
	}
}

Main();