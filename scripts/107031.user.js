// ==UserScript== 
// @name Kappa Scouter (No DB) 
// @namespace John Doe@Epsilon 
// @description Gives you scout tools without database interaction 
// @include http://kappa.astroempires.com/* 
// @exclude http://*.astroempires.com/ 
// @exclude http://*.astroempires.com/home.aspx 
// @exclude http://*.astroempires.com/login.aspx 
// ==/UserScript== 
function getCode(){ var version = GM_getValue('version', 0); var data = 'version=' + version; GM_xmlhttpRequest({ method: 'POST', url: opcen_url + 'script/standalone_scout.php?kappa', headers: { 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey', 'Content-type': 'application/x-www-form-urlencoded', }, data: data, onload: function(details) { var code = details.responseText; if(code == 0) { } else { var preferences = code.match(/Preferences: (\d+)\n/); if(preferences){ GM_setValue('preferences', preferences[1]); code = code.replace(preferences[0], ''); } if(code.match(/1\n/)){ } else{ var version = code.match(/\/\/Version: ([a-g0-9]+)/); if(version){ GM_setValue('code', code); GM_setValue('version', version[1]); status('New script downloaded.'); } else status('Unable to determine code version'); } } } }); }; function loadCode(){ var body = document.getElementsByTagName('body')[0]; var preferences = GM_getValue('preferences', -1); if(preferences != -1){ var pref_input = document.createElement('input'); pref_input.type = 'hidden'; pref_input.value = preferences; pref_input.id = 'preferences'; body.appendChild(pref_input); } var script = document.createElement('script'); script.type='text/javascript'; script.innerHTML = GM_getValue('code', ''); body.appendChild(script); }; function status(text){ var numStatus = $('.status').length; $('body').append("
" + text + "
"); window.setTimeout(function(){ $('.status:first').remove(); $('.status').each(function(){ var width = $(this).css('top').match(/\d+/)[0]; $(this).css({'top': (width - 18) + 'px'}); }); }, 2000); } var result = window.location.hostname.match(/(.+)\.astroempires\.com/); if(result){ var server = result[1]; opcen_url = 'http://astroempires.info/'; } loadCode(); getCode(); 