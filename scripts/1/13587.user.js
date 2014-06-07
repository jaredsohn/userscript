// ==UserScript==
// @name hatena_account_switcher
// @namespace http://b.hatena.ne.jp/tcns
// @include *
// @version 1.5
// ==/UserScript==
//
// ChangeLog
//   2007-11-10 tcns
//     * Add: full scratching.
//
//     * Add: minibuffer command hatenaaccount-login-name
//

/// === Utility v1.0 === ///
function XMLHttpRequestASync(method, url, func, opts) {
	if (!method || !url || !func) {
		return null;
	}

	var onerror = function () {
		alert('!!!ERROR!!!');
	}

	GM_xmlhttpRequest({
		method: method,
		url: url,
		headers: opts ? opts.headers ? opts.headers : '' : '',
		data: opts ? opts.data ? opts.data : '' : '',
		onreadystatechange: function (res) {
			if (res.readyState == 4 && res.status == 200) {
				func(res);
			}
		},
		onerror: opts ? opts.onerror ? opts.onerror : onerror : onerror
	});
};

function $x(exp, context) {
	if (!context) {
		context = document;
	}

	var ret = [];
	var evaluator = new XPathEvaluator();
	var expression = evaluator.createExpression(exp, null);
	var nodes = expression.evaluate(context, XPathResult.ORDERED_NODE_TYPE, null);
	for (var node = nodes.iterateNext(); node; node = nodes.iterateNext()) {
		ret.push(node);
	}

	return ret;
}

function keys(obj) {
	var ret = [];
	for (var prop in obj) {
		ret.push(prop);
	}
	return ret;
}

var Element = {
	create: function (elem, text, klass, id) {
		if (!text) {
			return document.createElement(elem);
		}
		var obj = this.create(elem);
		if (klass && klass.length) {
			obj.className = klass;
		}
		if (id && id.length) {
			obj.id = id;
		}

		obj.innerHTML = text;
		return obj;
	}/*,
	remove: function (target) {
		document.body.removeChild(target);
	},

	removeById: function (id) {
		this.remove($(id));
	}
*/
};

var MessageBox = {
	elements: [],
	if_style: false,

	create: function (html, id, flag) {
		var box = Element.create('div', html, '', id);
		this.elements.push(box);
		if (id) {
			this.if_style = true;
		}

		if (flag) {
			this.popup(3000);
		}
	},

	popup: function (time) {
		var obj = this.elements.pop();
		document.body.appendChild(obj);
		this.elements.push(obj);
		if (time) {
			this.popdown(time);
		}
	},

	popdown: function (time) {
		var self = this;
		if (!self.elements) {
			return null;
		}

		window.setTimeout(function () {
			var obj = self.elements.pop();
			document.body.removeChild(obj);
			if (self.if_style) {
				StyleSheet.remove();
			}
		}, time);
	}
};

var StyleSheet = {
	elements: [],

	add: function (style, id) {
		GM_addStyle(style);
		var styles = $x('//head/style');
		this.elements.push(styles[styles.length - 1]);
	},

	remove: function (id) {
		var elements = this.elements.pop();
		var head = $x('//head')[0];
		head.removeChild(elements);
	}/*,

	parse: function (text) {
		var ret = [];
		var style = {};
		var raw = text.split(/:|;/);
		raw.forEach(function (e, i) {
			style[e] = e[i + 1];
		});

		return ret;
	},

	apply: function (obj, style) {
		style.forEach(function (e) {
			var property = keys(e);
			obj.style[property] = e[property];
		});
	}
*/
};

/// === main === ///
var HatenaAccount = function () {
	this.endpoint = 'https:/www.hatena.ne.jp/';
	this.checkpoint = 'http://b.hatena.ne.jp/';
	this.evalpoint = 5;

	this.accounts = [
	/*
	{
		'user-name': 'password'
	},
	 */
	];

	StyleSheet.add(<><![CDATA[
		#FLASH_KEYS {
			position: fixed;
			font-size: 600%;
			z-index: 10000;

			width: 600px;
			padding: 50px;
			left: 50%;
			top: 50%;
			margin-top: -150px;
			margin-left: -350px;

			background-color: #444;
			color: #fff;
			-moz-border-radius: 0.3em;
			min-width: 1em;
			text-align: center;

			opacity: 0.8;
		}
	]]></>, 'FLASH_KEYS');
};

HatenaAccount.prototype.login = function (account) {
	var self = this;
	var backurl = document.location.href;
	var user = keys(account);

	XMLHttpRequestASync('POST', self.endpoint + 'login', function (res) {
		var box = MessageBox.create([
			'<span class="message">Logging in '+user+'</span>'
		].join('\n'), 'FLASH_KEYS', true);

		if (backurl.match(/http:\/\/.*\.hatena\.(ne\.jp|com)\//)) {
			document.location.href = backurl;
		}
		return;
	}, {
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		data: 'name='+user+'&password='+account[user]+'&location='+backurl
	});
};

HatenaAccount.prototype.logout = function (callback) {
	var self = this;
	XMLHttpRequestASync('GET', self.endpoint + 'logout', callback);
};

HatenaAccount.prototype.getLoginName = function (callback) {
	var self = this;
	XMLHttpRequestASync('GET', self.checkpoint, function (res) {
		var doc = Element.create('html', res.responseText);
		var scripts = doc.getElementsByTagName('script');
		if (!scripts) {
			self.login(self.accounts[0]);
		}

		var user = eval(scripts[self.evalpoint].innerHTML);
		if (!user) {
			callback(null);
		}

		callback(user);
	});
}

HatenaAccount.prototype.change = function () {
	var self = this;
	self.getLoginName(function (user) {
		if (!user) {
			self.login(self.accounts[0]);
		}

		var account;
		self.accounts.forEach(function (e, i) {
			if (e.hasOwnProperty(user)) {
				account = (i == (self.accounts.length - 1)) ? self.accounts[0] : self.accounts[i + 1];
			}
		})
		self.logout(function () {
			self.login(account);
		});
	});
};

HatenaAccount.prototype.createAccount = function (user, password) {
	var account = {};
	account[user] = password;
	return account;
};

var error = function () {
	var box = MessageBox.create([
		'<span class="error_message">Require accounts set.</span>'
	].join('\n'), 'FLASH_KEYS', true);
	return;
}

var test = function () {
	var hatena = new HatenaAccount();
	if (!hatena.accounts.length) {
		error();
		return;
	}
	hatena.change();
}

GM_registerMenuCommand('Hatena - switch account', test);

/// === Minibuffer command === ///
with (window.Minibuffer) {
	addCommand({
		'hatenaaccount-add-account': function () {
			var args = this.args;
			if (args.length < 2) {
				return 'Error: require arguments.';
			}

			var user = args.shift();
			var password = args.shift();
			hatena.accounts.push([hatena.createAccount(user, password)]);
		}
	});

	addCommand({
		'hatenaaccount-switch-account': test
	});

	addCommand({
		'hatenaaccount-login-name': function () {
			var hatena = new HatenaAccount();
			if (!hatena.accounts.length) {
				error();
				return false;
			}

			hatena.getLoginName(function (user) {
				var msg = user
					? 'You are logging in as '+user
					: 'You are not logging in';
				var box = MessageBox.create([
					'<span class="login_message">'+msg+'</span>'
				].join('\n'), 'FLASH_KEYS', true);
			});
			return true;
		}
	});
}
