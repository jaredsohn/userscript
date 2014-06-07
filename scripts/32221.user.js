// ==UserScript==
// @name           HatenaBookmarkNgUserManager
// @namespace      http://www.madin.jp/
// @include        http://b.hatena.ne.jp/*/config
// ==/UserScript==

function addNgUsersField () {
	var ignoreUserField = document.getElementsByName('ignore_users')[0];
	var ngUsers = (ignoreUserField.value.length>0)?ignoreUserField.value.split('|'):new Array();
	var ngUsersMap = new Array();
	for (var index in ngUsers) {
		ngUsersMap[ngUsers[index]] = true;
	
	}
	// NG user list container
	var container = document.createElement('DIV');
	for (var index in ngUsers) {
		var ngUser = ngUsers[index];
		//illegal user name
		if (ngUser.length<2) continue;
		var ngSpan = document.createElement('DIV');
		var ngIcon = document.createElement('IMG');
		var ngCheck = document.createElement('INPUT');
		var ngLink = document.createElement('A');
		with (ngCheck) {
			type = 'checkbox';
			checked = true;
			value = ngUser;
			addEventListener('change', function(e){
				ngUsersMap[e.target.value] = e.target.checked;
				var tmpStr = '';
				for (var userId in ngUsersMap) {
					if (ngUsersMap[userId]) {
						if (tmpStr!='') tmpStr += '|';
						tmpStr += userId;
					}
				}
				ignoreUserField.value = tmpStr;
			},true);
		}
		with (ngLink) {
			innerHTML = ngUser;
			href = 'http://b.hatena.ne.jp/' + ngUser;
			target = '_blank';
		}
		ngIcon.src = 'http://www.hatena.ne.jp/users/'+ngUser.substring(0,2)+'/' + ngUser + '/profile_s.gif';
		ngSpan.appendChild(ngCheck);
		ngSpan.appendChild(ngIcon);
		ngSpan.appendChild(ngLink);
		container.appendChild(ngSpan);
	}
	ignoreUserField.parentNode.appendChild(container);
}
addNgUsersField();