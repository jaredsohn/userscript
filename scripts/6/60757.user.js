// ==UserScript==
// @name           RapidShare Account Manager
// @namespace      quanganhdo.rapidshare.multiacc edited by Freakz
// @description    Manage all your RapidShare accounts in one place (latest version fixed by tofuwizard)
// @version        1.2
// @include        http://rapidshare.com/
// @include        http://rapidshare.com/*
// @include        http://*rapidshare.com/*
// @include        https://*rapidshare.com/*
// @include        https://ssl.rapidshare.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// @originalsource http://userscripts.org/scripts/show/42356
// ==/UserScript==

// nav
var menu = document.getElementsByClassName("navigation")[0].getElementsByTagName('ul')[0];
menu.innerHTML = menu.innerHTML + '<li style="border-right: 0px none"><a href="http://rapidshare.com/checkfiles.html?manage">Manage Accounts</a></li>';
var num = menu.getElementsByTagName('li');
num[num.length-2].style.border = "";
//$('.hauptmenue ul.dropdown li:has(a[href="http://rapidshare.com/rapidshare.html"])').removeAttr('style');
//$('.hauptmenue ul.dropdown').append('<li style="border-right: 0px none"><a href="http://rapidshare.com/checkfiles.html?manage">Manage Accounts</a></li>');
//$('.hauptmenue').css({width: '800px'});

// main
if (/checkfiles\.html\?manage/.test(document.location)) {
	// layout
	$('#inhaltbox h1').text('Manage your accounts');
	$('.klappbox').html('<p>Here you can manage more than one RapidShare account.</p><p>To get started, click <a id="add-account" href="#" onclick="javascript:return false">here</a> to add a new account. Don\'t forget to click Save & Reload once you are done.</p><br /><table style="width: 100%;" id="accounts"><tr style="font-weight: bold; text-align: center" id="header"><th style="width: 10%">Login</th><th style="width: 1%">Password</th><th style="width: 10%">Pre?</th><th style="width: 20%">Expiry date</th><th style="width: 20%">RapidPoints</th><th style="width: 10%">Traffic left</th><th style="width:10%">Files</th><th style="width: 10%">Tasks</th></tr></table><div style="padding-top: 40px; text-align: center"><input id="save-accounts" type="button" value="Save &amp; Reload"/><blink style="display: none">*</blink></div>');
	
	// load
	var saved_data = GM_getValue('accounts', '');
	if (saved_data != '') {
		var saved_accounts = saved_data.split('|');
		$.each(saved_accounts, function(i, account) {
			var checked = account.split(':')[2] == 'true' ? 'checked="checked"' : '';
			$('#accounts').append('<tr style="text-align: center" id="r_' + i + '"><td><input type="text" id="eu_' + i + '" value="' + account.split(':')[0] + '" /></td><td><input type="password" id="ep_' + i + '" value="' + account.split(':')[1] + '"></td><td><input type="checkbox" id="pr_' + i + '" ' + checked + ' /></td><td id="e_' + i + '">Checking...</td><td id="p_' + i + '">Checking...</td><td id="t_' + i + '">Checking...</td><td id="f_' + i + '">Checking...</td><td><a id="d_' + i + '" href="#" onclick="javascript:return false">Delete</a></td></tr>');
			if (account.split(':')[2] == 'true') {
				// test premium acc
				GM_xmlhttpRequest({
					method: "POST",
					url: "https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'login=' + $('#eu_' + i).val() + '&password=' + $('#ep_' + i).val(),
					onload: function(r) {
						if (/klapptitel/.test(r.responseText)) { // valid
							$('#e_' + i).html(r.responseText.match(/<td>Expiration date:<\/td><td style="padding-right:20px;"><b>[A-Za-z]{3}, ([^<]*)<\/b>/)[1]);
							$('#p_' + i).html(r.responseText.match(/<td>Free RapidPoints:<\/td><td align=right style="padding-right:20px;"><b><span id="rpo">([^<]*)<\/span><\/b>/)[1] + ' / ' + r.responseText.match(/<td>Premium RapidPoints:<\/td><td align=right style="padding-right:20px;"><b><span id="rppo">([^<]*)<\/span><\/b><\/td>/)[1]);
							$('#t_' + i).html(Math.ceil(r.responseText.match(/Math\.ceil\((-?[0-9]*)\/[0-9]*\)/)[1] / 1000) + ' MB');
							$('#f_' + i).html(r.responseText.match(/<td>Files:<\/td><td align=right><b>([0-9]*)<\/b><\/td>/)[1]);
							$('#d_' + i).after(' / <a id="s_' + i + '" href="#" onclick="javascript:return false">Login</a>');
							$('#s_' + i).click(function() {
								GM_xmlhttpRequest({
									method: "POST",
									url: "https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi",
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									data: 'login=' + $('#eu_' + i).val() + '&password=' + $('#ep_' + i).val(),
									onload: function(r) {
										document.location.replace('https://ssl.rapidshare.com/cgi-bin/premiumzone.cgi');
									}
								});
							});
						} else { // something goes wrong
							$('#e_' + i + ', #t_' + i + ', #p_' + i, '#f_' + i).html(r.responseText.match(/<div class="klappbox">([\s\S]*?)<\/div>/)[1]);
						}
					}
				});
			} else {
				// test collector acc
				GM_xmlhttpRequest({
					method: 'POST',
					url: "https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi",
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data: 'username=' + $('#eu_' + i).val() + '&password=' + $('#ep_' + i).val(),
					onload: function(r) {
						if (/klapptitel/.test(r.responseText)) { // valid
							$('#e_' + i).html('N/A');
							$('#p_' + i).html(r.responseText.match(/<td>Free RapidPoints:<\/td><td align=right style="padding-right:30px;"><b><span id="rpo">([^<]*)<\/span><\/b>/)[1] + ' / ' + r.responseText.match(/<td>Premium RapidPoints:<\/td><td align=right style="padding-right:30px;"><b><span id="rppo">([^<]*)<\/span><\/b><\/td>/)[1]);
							$('#t_' + i).html('N/A');
							$('#f_' + i).html(r.responseText.match(/<td>Files:<\/td><td><b>([0-9]*)<\/b><\/td>/)[1]);
							$('#d_' + i).after(' / <a id="ss_' + i + '" href="#" onclick="javascript:return false">Login</a>');
							$('#ss_' + i).click(function() {
								GM_xmlhttpRequest({
									method: "POST",
									url: "https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi",
									headers: {
										'Content-Type': 'application/x-www-form-urlencoded'
									},
									data: 'username=' + $('#eu_' + i).val() + '&password=' + $('#ep_' + i).val(),
									onload: function(r) {
										document.location.replace('https://ssl.rapidshare.com/cgi-bin/collectorszone.cgi');
									}
								});
							});
						} else { // something goes wrong
							$('#e_' + i + ', #t_' + i + ', #p_' + i, '#f_' + i).html(r.responseText.match(/<div class="klappbox">([\s\S]*?)<\/div>/)[1]);
						}
					}
				});
			}
			// username + password
			$('#eu_' + i + ', #ep_' + i).change(function() {
				$('#e_' + i + ', #t_' + i + ', #p_' + i).html("To be updated");
				$('blink').show();
			});
			// del
			$('#d_' + i).click(function() {
				if (confirm('Are you sure?')) {
					$('#r_' + i).hide();
					$('blink').show();					
				}
			});
		});
	}
	
	// add acc
	$('#add-account').click(function() {
		var i = $('#accounts tr').length - 1;
		$('#accounts').append('<tr style="text-align: center" id="r_' + i + '"><td><input type="text" id="eu_' + i + '" value="dummy username" /></td><td><input type="password" id="ep_' + i + '" value="dummy password" /></td><td><input type="checkbox" checked="checked" id="pr_' + i + '" /></td><td id="e_' + i + '">Not yet checked</td><td id="p_' + i + '">Not yet checked</td><td id="t_' + i + '">Not yet checked</td><td id="f_' + i + '">Not yet checked</td><td><td><a id="d_' + i + '" href="#" onclick="javascript:return false">Delete</a></td></tr>');
		// username + password
		$('#eu_' + i + ', #ep_' + i).change(function() {
			$('#e_' + i + ', #t_' + i + ', #p_' + i).html("To be updated");
			$('blink').show();
		});
		// del
		$('#d_' + i).click(function() {
			if (confirm('Are you sure?')) {
				$('#r_' + i).hide();
			}
		});
	});
	
	// save
	$('#save-accounts').click(function() {
		var data = [];
		$.each($('#accounts tr[id!="header"]:visible'), function(i, item) {
			if ($('input[id^="eu"]', item).val() != 'dummy username' && $('input[id^="ep"]', item).val() != 'dummy password') {
				data.push($('input[id^="eu"]', item).val() + ':' + $('input[id^="ep"]', item).val() + ':' + $('input[type="checkbox"]', item).attr('checked'));
			}
		});
		GM_setValue('accounts', data.join('|'));
		document.location.reload();
	});
}