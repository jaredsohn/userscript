// ==UserScript==
// @name           ogame fast login
// @description    with this script the login form will show up after ogame loaded. this will let your browser fill the login data (if login data is saved).
// @namespace      ogamefl
// @include        http://*ogame.*/*
// @exclude        http://*ogame.*/game/*
// ==/UserScript==

sel = document.getElementById("serverLogin");
if (sel) { // needed this because this script is sometimes executed on wrong pages
	var manage = (location.search == '?manageaccounts');
	if (manage) {
		// settings overlay
		var Manager = {	
			domain: null,
		
			hide: function () {
				document.getElementById('ocalcfastlogin').style.display = 'none';
			},
			
			show: function () {
				var div = document.getElementById('ocalcfastlogin');
				if (div) {
					div.style.display = 'block';
				} else {
					this.domain = FastLogin.getDomain();
				
					var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
					window.ocalcfastloginremove = this.remove;
					window.ocalcfastloginrefresh = this.refreshForm;
					window.ocalcfastloginmove = this.move;
					window.ocalcfastlogindomain = this.domain;
				
					var box = document.createElement('div');
					box.setAttribute('style','position:absolute;z-index:10000;padding: 0 10px;background:url(img/inner-content-bg.png) repeat-x #1E2B39;border:1px solid #000;left:50%;width:350px;margin-left:-150px;top:50%;height:400px;margin-top:-200px;');
					box.setAttribute('id', 'ocalcfastlogin');
					var h2 = document.createElement('h2');
					h2.setAttribute('style', 'color:#619FC8;text-shadow:1px 2px #000000');
					h2.innerHTML = 'Manage your Accounts';
					
					var close = document.createElement('a');
					close.setAttribute('style', 'color:#619FC8;float:right;line-height:27px;');
					close.setAttribute('href', '#');
					close.innerHTML = 'X';
					close.addEventListener('click', this.hide, false);
					
					var contentWrapper = document.createElement('div');
					contentWrapper.setAttribute('style', 'overflow:auto;margin-right: -9px; padding-right: 9px;height: 350px;');
					
					var form = document.createElement('div');
					form.setAttribute('style', 'color:#619FC8;margin-bottom: 15px;');
					form.setAttribute('id', 'ocalcfastloginform');
					
					var buttonWrapper = document.createElement('div');
				
					var newButton = document.createElement('a');
					newButton.setAttribute('class', 'button');
					newButton.setAttribute('href', '#');
					newButton.setAttribute('style', 'margin: 0 2.5px');
					newButton.innerHTML = 'new';
					
					var close2 = newButton.cloneNode(false);
					close2.setAttribute('style', 'float: right; margin: 0 2.5px');
					close2.innerHTML = 'close';
					
					var save = close2.cloneNode(false);
					save.innerHTML = 'save';
					
					
					buttonWrapper.appendChild(close2);
					buttonWrapper.appendChild(save);
					buttonWrapper.appendChild(newButton);
					
					// add event listener for the buttons
					newButton.addEventListener('click', this.newAccount, false);
					save.addEventListener('click', this.save, false);
					close2.addEventListener('click', this.hide, false);
					
					var info = document.createElement('p');
					info.innerHTML = 'Enter your account names and their universes. You can have <span style="color:red;">three</span> favorite accounts that will be selectable directly from the login form.';
					
					box.appendChild(close);		
					box.appendChild(h2);
					box.appendChild(contentWrapper);
					contentWrapper.appendChild(info);
					contentWrapper.appendChild(form);
					contentWrapper.appendChild(buttonWrapper);
				
					document.getElementsByTagName('body')[0].appendChild(box);
				}
				this.initForm();
			},
			
			save: function () {
				var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
				var domain = window.ocalcfastlogindomain;
				
				var name = document.getElementsByName('ocalcfastloginname');
				var sel = document.getElementsByName('ocalcfastloginselect');
				var fav = document.getElementsByName('ocalcfastloginfav');
				var favCount = 0;
				var i = 0;
				for (; i < name.length; i++) {
					var abbr = Manager.getAbbr(sel[i]);
					var item = name[i].value + "+" + sel[i].value + "+" + (favCount++ < 3 && fav[i].checked ? '1' : '') + "+" + abbr;
					GM_setValue('acc' + domain + i, item);
				}
				while (GM_getValue('acc' + domain + i)) {
					GM_deleteValue('acc' + domain + i++);
				}
				location.href = "?manageaccounts";
			},
			
			newAccount: function () {
				var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
				var domain = window.ocalcfastlogindomain;
				
				var i = 0;
				
				while (GM_getValue('acc' + domain + i)) {
					i++;
				}
				GM_setValue('acc' + domain + i, '++1+???');
				
				location.reload();
			},
			
			initForm: function () {
				var domain = this.domain;
				var form = document.getElementById('ocalcfastloginform');
				form.innerHTML = '<div><span style="width: 144px;display:inline-block;">account name</span><span style="width: 122px;display:inline-block;">universe</span><span title="fav: set as favorite - U: move up - D: move down - X: delete">fav/u/d/del</span></div>';
				var i = 0;
				var account;
				
				var del = document.createElement('a');
				del.innerHTML = 'X';
				del.setAttribute('href', '#');
				del.setAttribute('style', 'padding:0;padding-left:5px;');

				while(account = GM_getValue('acc' + domain + i)) {
					var data = account.split('+');
					var div = document.createElement('div');
					div.setAttribute('name', 'ocalcfastloginacc');
					var input = document.createElement('input');
					input.setAttribute('value', data[0]);
					input.setAttribute('style', 'width:125px;margin-right:5px;height:18px;');
					input.setAttribute('name', 'ocalcfastloginname');
					var select = FastLogin.getSelect();
					select = select.cloneNode(true);
					select.setAttribute('onchange', '');
					select.setAttribute('name', 'ocalcfastloginselect');
					select.setAttribute('style', 'background:#8D9AA7;border:2px solid #9EB4CB;color:#30576F;margin-right:5px;');
					select.removeAttribute('id');
					
					var options = select.getElementsByTagName("option");

					for (var j = 0; j < options.length; j++) {
						if (options[j].value == data[1]) {
							options[j].selected = true;
						}
					}
					
					
					var check = document.createElement('input');
					check.setAttribute('type', 'checkbox');
					check.setAttribute('name', 'ocalcfastloginfav');
					if (data[2] == '1') check.setAttribute('checked', 'checked');
					
					var newDel = del.cloneNode(true);
					newDel.setAttribute('name', 'ocalcfastlogindel');
					newDel.setAttribute('onclick', 'window.ocalcfastloginremove(' + i + ')');
					
					var up = del.cloneNode(false);
					up.setAttribute('name', 'ocalcfastloginup');
					up.setAttribute('onlick', 'window.ocalcfastloginmove(' + i + ', 1)');
					up.innerHTML = 'U';
					
					var down = del.cloneNode(false);
					down.setAttribute('name', 'ocalcfastlogindown');
					down.setAttribute('onclick', 'window.ocalcfastloginmove(' + i + ', 0)');
					down.innerHTML = 'D';
					

					div.appendChild(input);
					div.appendChild(select);
					div.appendChild(check);
					div.appendChild(up);
					div.appendChild(down);
					div.appendChild(newDel);
					form.appendChild(div);
					
					i++;
				}
			},
			
			refreshForm: function () {
				var form = document.getElementById('ocalcfastloginform');
				var accdivs = document.getElementsByName('ocalcfastloginacc');
				var delButtons = document.getElementsByName('ocalcfastlogindel');
				var upButtons = document.getElementsByName('ocalcfastloginup');
				var downButtons = document.getElementsByName('ocalcfastlogindown');
				for (var i = 0; i < accdivs.length; i++) {
					delButtons[i].setAttribute('onclick', 'window.ocalcfastloginremove(' + i + ')');
					upButtons[i].setAttribute('onclick', 'window.ocalcfastloginmove(' + i + ', 1)');
					downButtons[i].setAttribute('onclick', 'window.ocalcfastloginmove(' + i + ', 0)');
				}
			},
			
			move: function (id, dir) {
				var newId = id + (dir == 1 ? -1 : 1);
				var accdivs = document.getElementsByName('ocalcfastloginacc');
				if (newId > -1 && newId < accdivs.length) {
					var form = document.getElementById('ocalcfastloginform');
					var div = accdivs[(dir == 1 ? id : newId)];
					var div2 = accdivs[(dir == 1 ? newId : id)];
					form.removeChild(div);
					form.insertBefore(div, div2);
					
					var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
					window.ocalcfastloginrefresh();
				}
			},
			
			remove: function (id) {
				var accdiv = document.getElementsByName('ocalcfastloginacc')[id];
				if (accdiv) {
					var form = document.getElementById('ocalcfastloginform');
					form.removeChild(accdiv);
				}
				var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
				window.ocalcfastloginrefresh();
			},
			
			// get the abbreviation of a universe url
			getAbbr: function (select) {
				var value = select.value;
				var options = select.getElementsByTagName('option');
				var text = options[select.selectedIndex].text;
		
				var uniNumber = parseInt(value.substring(3, value.indexOf('.')+1));
				var res = (uniNumber < 100 ? 'U' + uniNumber : text.substr(0,3).toUpperCase());
				return res;
			},
		}
	}

	// login modification
	var FastLogin = {
		version: 2,
		lastCompatibleVersion: 2,
		domain: null,
		
		Init: function() {
			this.versionCheck();
			
			var window = (typeof unsafeWindow !== 'undefined' ) ? unsafeWindow : window;
			window.ocalcfastloginselect = this.selectAccount;
			
			this.getDomain();
			this.getSelect();
			
			this.addButton();
		},
		
		versionCheck: function () {
			var installedVersion = parseInt(GM_getValue('version'));
			if (installedVersion < this.lastCompatibleVersion) {
				GM_listValues().map(GM_deleteValue);
				GM_setValue('version', this.version);
			}
		},
		
		getDomain: function () {
			if (!this.domain) {
				var select = document.getElementById('serverLogin');
				var options = select.getElementsByTagName('option');
				this.domain = options[0].value.substring(options[0].value.indexOf('.'), options[0].value.length);
			}
			return this.domain;
		},
	
		addButton: function() {
			var domain = this.getDomain();
		
			var form = document.getElementById('loginForm');
			var manageWrap = document.createElement('div');
			manageWrap.setAttribute('id', 'ocalcfastloginmanage');
			var manageButton = document.createElement('a');
			manageButton.setAttribute('style', 'float: right;');
			manageButton.setAttribute('href', '?manageaccounts');
			manageButton.appendChild(document.createTextNode('manage'));
			
			manageWrap.appendChild(manageButton);
			
			var accountData = [];
			
			var account;
			var accCount = 0;
			var favCount = 0;
			var favAcc = '';
			var favUrl = '';
			while (account = GM_getValue('acc' + domain + accCount)) {
				var data = account.split('+');
				accountData.push(data);
				if (data[2] == 1 && favCount++ < 3) {
					if (favCount == 1) {
						favAcc = data[0];
						favUrl = data[1];
					}
				
					var fav = document.createElement('a');
					fav.setAttribute('href', '#');
					fav.setAttribute('style', 'margin-right: 5px;');
					fav.setAttribute('onclick', 'window.ocalcfastloginselect("' + data[1] + '", "' + data[0] + '")');
					fav.innerHTML = data[3];
					
					manageWrap.appendChild(fav);
				}
				accCount++;
			}
			
			if (favCount == 0) manageWrap.innerHTML += '&nbsp';
			
			form.insertBefore(manageWrap, form.firstChild);
			
			this.modifySelect(accountData);
			
			this.selectAccount(favUrl, favAcc);
		},
		
		modifySelect: function (data) {
			var select = document.getElementById('serverLogin');
			select.addEventListener('keypress', this.selectViaKey, false);
			for (var i = data.length - 1; i >= 0; i--) {
				var option = document.createElement('option');
				option.setAttribute('value', data[i][1]);
				option.setAttribute('onclick', 'window.ocalcfastloginselect("", "' + data[i][0] + '")');
				option.setAttribute('onblur', 'alert("test")');
				option.appendChild(document.createTextNode(data[i][3] + ' - ' + data[i][0]));
				
				select.insertBefore(option, select.firstChild);
			}
		},

		select: null,
		getSelect: function () {
			if (!this.select) {
				this.select = document.getElementById('serverLogin').cloneNode(true);
			}
			return this.select;
		},
		
		selectAccount: function(uni, accountName) {
			if (uni && uni.length > 0) {
				var select = document.getElementById('serverLogin');
				var options = select.getElementsByTagName('option');
				for (var i = 0; i < options.length; i++) {
					if (options[i].value == uni) {
						options[i].selected = true;
						break;
					}
				}
			}
			if (accountName != '') setTimeout("document.getElementById('usernameLogin').value = '" + accountName + "'", 1);
			setTimeout("var e=document.getElementById('" + (accountName != '' ? 'passwordLogin' : 'usernameLogin' ) + "');e.focus();e.select()",1);
		},
		
		// if the user scrolls through select with arrows
		selectViaKey: function (e) {
				e = window.event || e;
				e = e.charCode || e.keyCode;
				if (e == 13) {
					var select = document.getElementById('serverLogin');
					var option = select.options[select.selectedIndex].firstChild.nodeValue;
					var p = option.indexOf(' - ');
					if (p > -1) {
						var accountName = option.substring(p+3, option.length);
						if (accountName != '') document.getElementById('usernameLogin').value = accountName;
						var input = document.getElementById((accountName != '' ? 'passwordLogin' : 'usernameLogin' ));
						input.focus();
						input.select();
					}
				}
		},
	}
	
	FastLogin.Init();
	if (manage) Manager.show();
	
	document.getElementById('login').style.display = 'block';
}