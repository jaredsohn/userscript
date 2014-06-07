// ==UserScript==
// @name		login http://www.freelancer.com/
// @namespace	http://use.i.E.your.homepage/
// @version		0.1
// @description	login http://www.freelancer.com/
// @match		https://www.freelancer.com/
// @match		http://www.freelancer.com/
// @match		https://www.freelancer.com/dashboard/
// @match		http://www.freelancer.com/dashboard/
// @require		https://cdn.jsdelivr.net/jquery.cookie/1.3.1/jquery.cookie.js
// @copyright	2012+, You
// ==/UserScript==

var userParentSelector = 'body';
var userSelectionId = "user";
var userSelector = '#' + userSelectionId;
var userLinkSelector = '.user-name-link';
var logoutSelector = 'a:contains(Logout)';
var userSelectedCookie = 'selectedUser';
var autoLoginCookie = 'autoLogin';

setTimeout(function() {
	jQuery('.login-btn').click(function(){
		loginUser(jQuery(userSelector));
	});

	var loginElement = 'select';
	jQuery(userParentSelector).append('<' + loginElement + '/>');
	jQuery(loginElement + ':last').attr('id', userSelectionId);
	for(var login in logins) {
		jQuery(userSelector).append('<option ' + '' +'>' + logins[login].user + '</option>');
		if (logins[login].user == jQuery.cookie(userSelectedCookie)) {
			jQuery(userSelector + ' option:last').attr('selected', true);
		}
		jQuery(userSelector + ' option:last').attr('value', logins[login].user);
	}

	jQuery(userSelector).css("position", "fixed").css("top", 50).css("left", 0);
	
	jQuery(userSelector).change(switchUser);

	if (jQuery('.login-btn').length>0 && jQuery.cookie(autoLoginCookie) != null) {
		jQuery.removeCookie(autoLoginCookie);
		loginUser(jQuery(userSelector));
	}

}, 3000);

function loginUser(loginSelect) {
	jQuery.cookie(userSelectedCookie, loginSelect.val(), {path: '/'});
	jQuery('.username').val(loginSelect.val());
	for(login in logins) {
		if (logins[login].user == loginSelect.val()) {
			jQuery('.password').val(logins[login].password);
			break;
		}
	}
	jQuery('#login-bt').click();
}

function switchUser(){
	jQuery.cookie(autoLoginCookie, '', {path: '/'});

	if (jQuery('.login-btn').length > 0) {
		jQuery('.login-btn').click();
		loginUser(jQuery(this));
	}
	else {
		jQuery.cookie(userSelectedCookie, jQuery(userSelector).val(), {path: '/'});
		if (jQuery(logoutSelector).length == 0) {
			jQuery(userLinkSelector).click();
		}
		if (jQuery(logoutSelector).length > 0) {
			jQuery(logoutSelector)[0].click();
		}
	}
}

logins = 
[
	{
		user: "rbahuguna",
		password: 'password'
	},
	{
		user: "rbahugunadev",
		password: 'password'
	},
	{
		user: "rajeevbqa",
		password: 'password'
	},
	{
		user: "rbahugunajs",
		password: 'password'
	},
	{
		user: "rajeevdeveloper",
		password: 'password'
	},
];