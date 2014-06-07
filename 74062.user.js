// ==UserScript==
// @name           	Gamma Scouter (No DB)
// @namespace      	JD
// @description    	Gives you scout tools without database interaction
// @include        	http://gamma.astroempires.com/*
// @exclude        	http://*.astroempires.com/
// @exclude        	http://*.astroempires.com/home.aspx
// @exclude        	http://*.astroempires.com/login.aspx
// @exclude             http://gamma.astroempires.com/account.aspx*
// ==/UserScript==


function getCode(){
	var version = GM_getValue('version', 0);
	var username = GM_getValue('username', 0);
	var password = GM_getValue('password', 0);
	var data = 'version=' + version;
	if(username != 0 && password != 0){
		data += '&username=' + encodeURIComponent(username);
		data += '&md5password=' + encodeURIComponent(password);
	}
	GM_xmlhttpRequest({
		method: 'POST',
		url: opcen_url + 'script/standalone_scout.php?gamma',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded',
		},	
		data: data,
		onload: function(details) {
			var code = details.responseText;
			if(code == 0)
				login();
			else {
				var preferences = code.match(/Preferences: (\d+)\n/);
				if(preferences){
					GM_setValue('preferences', preferences[1]);
					code = code.replace(preferences[0], '');
				}
				if(code.match(/1\n/)){
				}
				else{
					var version = code.match(/\/\/Version: ([a-g0-9]+)/);
					if(version){
						GM_setValue('code', code);
						GM_setValue('version', version[1]);
						status('New script downloaded.');
					}
					else
						status('Unable to determine code version');
				}
			}
		}
	});
};
function login(){
	var username = prompt('AE Account ID: ', '');
	var password = prompt('DB Password: ', '');
	GM_xmlhttpRequest({
		method: 'POST',
		url: opcen_url + 'script/standalone_scout.php',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded',
		},
		data: 'check_login=1&username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password),
		onload: function(details) {
			if(details.responseText == 0)
				status('Unable to log in. Refresh the screen to try again.');
			else{
				var data = details.responseText.split("\n");
				if(data.length == 2){
					GM_setValue('username', data[0]);
					GM_setValue('password', data[1]);
					getCode();
					status('Login Successful');
				}
				else
					status('Invalid response from DB: \n\n' + details.responseText + '\n\nPlease contact an officer.');
			}
		}
	});	
};
function loadCode(){
	
	var body = document.getElementsByTagName('body')[0];
	var username = GM_getValue('username', 0);
	var password = GM_getValue('password', 0);
	
	if(username != 0 && password != 0){
		var username_input = document.createElement('input');
		username_input.type = 'hidden';
		username_input.value = username;
		username_input.id = 'username';
		var pw_input = document.createElement('input');
		pw_input.type = 'hidden';
		pw_input.value = password;
		pw_input.id = 'password';
		body.appendChild(username_input);
		body.appendChild(pw_input);
	}
	
	var preferences = GM_getValue('preferences', -1);
	if(preferences != -1){
		var pref_input = document.createElement('input');
		pref_input.type = 'hidden';
		pref_input.value = preferences;
		pref_input.id = 'preferences';
		body.appendChild(pref_input);	
	}
	
	var script = document.createElement('script');
	script.type='text/javascript';
	script.innerHTML = GM_getValue('code', '');
	body.appendChild(script);
};
function status(text){
	var numStatus = $('.status').length;
	$('body').append("<div class='status' style='background: gray; width: " + text.length * 8 + "; height: 16; position: fixed; top: " + (18 * numStatus) + "px; bottom: 0px; left: 0px; right: 0px;'>" + text + "</div>");
	window.setTimeout(function(){
		$('.status:first').remove();
		$('.status').each(function(){
			var width = $(this).css('top').match(/\d+/)[0];
			$(this).css({'top': (width - 18) + 'px'});
		});
	}, 2000);
}

var result = window.location.hostname.match(/(.+)\.astroempires\.com/);
if(result){
	var server = result[1];
	opcen_url = 'http://astroempires.info/';
}
loadCode();
getCode();
