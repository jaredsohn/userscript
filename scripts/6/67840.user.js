// ==UserScript==
// @name           Google Reader NG Filter
// @description    ルールにマッチするアイテムを既読にして取り除きます。ルールは正規表現で記述でき、複数のルールをツリー状に組み合わせることができます。
// @include        http://www.google.tld/reader/view/*
// @include        https://www.google.tld/reader/view/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_unregisterMenuCommand
// @grant          GM_log
// @charset        utf-8
// @compatibility  Firefox
// @run-at         document-start
// @jsversion      1.8
// @priority       1
// @homepage       http://userscripts.org/scripts/show/67840
// @updateURL      https://userscripts.org/scripts/source/67840.meta.js
// @supportURL     http://twitter.com/?status=%40xulapp+
// @icon           http://s3.amazonaws.com/uso_ss/icon/67840/large.png
// @screenshot     http://s3.amazonaws.com/uso_ss/14504/large.png http://s3.amazonaws.com/uso_ss/14504/thumb.png
// @namespace      http://twitter.com/xulapp
// @author         xulapp
// @license        MIT License
// @version        2012/09/05 19:20 +09:00
// ==/UserScript==


(function googleReaderNGFilter() {
	const CSS_STYLE_TEXT = '' +
		'.grng-menu-button-container > .goog-menu-button {' +
			'margin-left: -2px;' +
		'}' +
		'.grng.goog-menu {' +
			'position: absolute;' +
			'z-index: 2147483646;' +
		'}' +
		'.grng .goog-menuitem:hover {' +
			'background-color: #eeeeee;' +
		'}' +
		'#grng-open-panel {' +
			'float: left;' +
		'}' +
		'.grng-panel {' +
			'position: fixed;' +
			'background-color: #ffffff;' +
			'color: #333333;' +
			'box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);' +
			'z-index: 2147483646;' +
		'}' +
		'.grng-panel :-moz-any(label, legend) {' +
			'cursor: default;' +
		'}' +
		'.grng-panel input[type="text"] {' +
			'padding: 2px;' +
			'border: 1px solid #b2b2b2;' +
		'}' +
		'.grng-panel-body {' +
			'margin: 8px;' +
		'}' +
		'.grng-panel-body > fieldset {' +
			'margin: 8px 0;' +
		'}' +
		'.grng-panel.root > .grng-panel-body > :-moz-any(.grng-panel-name, fieldset) {' +
			'display: none;' +
		'}' +
		'.grng-panel-terms {' +
			'border-spacing: 2px;' +
		'}' +
		'.grng-panel-terms > tbody > tr > td {' +
			'padding: 0;' +
			'white-space: nowrap;' +
		'}' +
		'.grng-panel-terms :-moz-any(input, label) {' +
			'margin: 0;' +
			'vertical-align: middle;' +
		'}' +
		'@-moz-keyframes error {' +
			'0% {' +
				'background-color: #ffff00;' +
				'border-color: #ff0000;' +
			'}' +
		'}' +
		'.grng-panel-terms-textbox.error {' +
			'-moz-animation: error 1s;' +
		'}' +
		'.grng-panel-terms-textbox-label {' +
			'display: block;' +
			'text-align: right;' +
		'}' +
		'.grng-panel-terms-textbox-label:after {' +
			'content: ":";' +
		'}' +
		'.grng-panel-terms-checkbox-label {' +
			'padding: 0 8px;' +
		'}' +
		'.grng-panel-rules {' +
			'display: table;' +
		'}' +
		'.grng-panel-rule {' +
			'display: table-row;' +
		'}' +
		'.grng-panel-rule:hover {' +
			'background-color: #eeeeee;' +
		'}' +
		'.grng-panel-rule > div {' +
			'display: table-cell;' +
			'white-space: nowrap;' +
		'}' +
		'.grng-panel-rule-name {' +
			'width: 100%;' +
			'padding-left: 16px;' +
			'cursor: default;' +
		'}' +
		'.grng-panel-rule-count {' +
			'padding: 0 8px;' +
			'font-weight: bold;' +
			'cursor: default;' +
		'}' +
		'.grng-panel-buttons {' +
			'margin: 8px;' +
			'text-align: right;' +
			'white-space: nowrap;' +
		'}' +
		'.grng-panel-addfilter {' +
			'float: left;' +
			'margin-right: 8px;' +
		'}' +
		'.grng-panel-pastefilter {' +
			'float: left;' +
			'margin-right: 16px;' +
		'}' +
		'.grng-panel-ok {' +
			'margin-right: 8px;' +
		'}' +
		'.grng-panel-cancel {' +
			'margin-right: 0;' +
		'}';

	var Locale = {
		data: Object.create(null, {
			_default: {
				get: function() this[navigator.language] || this['en-US'],
			},
		}),
		get: function(p, name) {
			return this.data[this.selectedLanguage][name];
		},
		get languages() Object.keys(this.data),
		select: function select(lang) {
			this.selectedLanguage = lang || '_default';
		},
		createReference: function createReference() {
			return Proxy.create(this);
		},
	};
	Locale.data['en-US'] = {
		__proto__: null,
		app_name: 'Google Reader NG Filter',
		ok: 'OK',
		cancel: 'Cancel',
		add: 'Add',
		copy: 'Copy',
		paste: 'Paste',
		new_filter: 'New Filter',
		rules: ' Rules',
		title: 'Title',
		url: 'URL',
		source_title: 'Feed Title',
		source_url: 'Feed URL',
		author: 'Author',
		body: 'Contents',
		ignore_case: 'Ignore Case',
		edit: 'Edit',
		delete: 'Delete',
		ng_setting: 'NG Setting',
		setting: 'Setting',
		import_setting: 'Import Configuration',
		allow_json_str: 'JSON object literal form as ({key1: value1, key2: value2...})',
		import_success: 'Preferences were successfully imported.',
		export_setting: 'Export Configuration',
		language: 'Language',
		ng_setting_modified: 'NG Settings were modified. New filters take effect after next refresh.',
	};
	Locale.data['ja'] = {
		__proto__: Locale.data['en-US'],
		cancel: 'キャンセル',
		add: '追加',
		copy: 'コピー',
		paste: '貼り付け',
		new_filter: '新しいフィルタ',
		rules: 'のルール',
		title: 'タイトル',
		source_title: 'フィードのタイトル',
		source_url: 'フィードの URL',
		author: '著者',
		body: '本文',
		ignore_case: '大/小文字を区別しない',
		edit: '編集',
		delete: '削除',
		ng_setting: 'NG 設定',
		setting: '設定',
		import_setting: '設定をインポート',
		allow_json_str: 'JSON のようなオブジェクトリテラル形式で入力してください。\n例: ({key1: value1, key2: value2...})',
		import_success: '設定をインポートしました',
		export_setting: '設定をエクスポート',
		language: '言語',
		ng_setting_modified: 'NG 設定を更新しました。新しいフィルタは次回読み込み時から有効になります。',
	};
	Locale.select();
	var $str = Locale.createReference();

	function Class(sup, pro) {
		if (sup && typeof sup === 'object')
			pro = sup, sup = Object;

		var con = Object.getOwnPropertyDescriptor(pro, 'constructor');
		if (!con)
			con = {value: Function(), writable: true, configurable: true};

		if (con.configurable) {
			con.enumerable = false;
			Object.defineProperty(pro, 'constructor', con);
		}

		con = pro.constructor;
		con.prototype = pro;
		con.superclass = sup;
		con.__proto__ = Class.prototype;
		pro.__proto__ = sup && sup.prototype;

		return Proxy.createFunction(con, function() con.createInstance(arguments));
	}
	Class = Class(Function, {
		constructor: Class,
		$super: function $super() {
			var sup = this.superclass;
			var method = sup.prototype[$super.caller === this ? 'constructor' : $super.caller.name];
			return Function.prototype.call.apply(method, arguments);
		},
		isSubClass: function isSubClass(cls) {
			return this.prototype instanceof cls;
		},
		createInstance: function createInstance(args) {
			var instance = Object.create(this.prototype);
			var result = this.apply(instance, args || []);
			return result instanceof Object ? result : instance;
		},
		toString: function toString() {
			var arr = [];
			var cls = this;
			do {
				arr.push(cls.name);
			} while (cls = cls.superclass);
			return '[object Class [class ' + arr.join(', ') + ']]';
		},

		getOwnPropertyDescriptor: function(name) Object.getOwnPropertyDescriptor(this, name),
		getPropertyDescriptor: function(name) Object.getPropertyDescriptor(this, name),
		getOwnPropertyNames: function(name) Object.getOwnPropertyNames(this, name),
		getPropertyNames: function(name) Object.getPropertyNames(this, name),
		defineProperty: function(name) Object.defineProperty(this, name),
		delete: function(name) delete this[name],
		fix: function() {
			if (!Object.isFrozen(this))
				return void 0;

			var res = {};
			Object.getOwnPropertyNames(this).forEach(function(name) {
				res[name] = Object.getOwnPropertyDescriptor(this, name);
			}, this);

			return res;
		},
		has: function(name) name in this,
		hasOwn: function(name) Object.prototype.hasOwnProperty.call(this, name),
		get: function(receiver, name) {
			if (name in this)
				return this[name];

			var method = this.prototype[name];
			if (typeof method === 'function')
				return Function.prototype.call.bind(method);

			return void 0;
		},
		set: function(receiver, name, val) this[name] = val,
		enumerate: function() [name for (name in this)],
		keys: function() Object.keys(this),
	});

	var Subject = Class({
		constructor: function Subject() {
			this.listeners = {};
		},
		on: function on(type, listener) {
			if (!(type in this.listeners))
				this.listeners[type] = [];

			var arr = this.listeners[type];
			var index = arr.indexOf(listener);
			if (index === -1)
				arr.push(listener);
		},
		once: function once(type, listener) {
			function onetimeListener() {
				this.removeListener(onetimeListener);
				return listener.apply(this, arguments);
			};
			this.on(type, onetimeListener);
			return onetimeListener;
		},
		removeListener: function removeListener(type, listener) {
			if (!(type in this.listeners))
				return;

			var arr = this.listeners[type];
			var index = arr.indexOf(listener);
			if (index !== -1)
				arr.splice(index, 1);
		},
		removeAllListeners: function removeAllListeners(type) {
			delete this.listeners[type];
		},
		dispatchEvent: function dispatchEvent(event) {
			event.timeStamp = Date.now();
			if (event.type in this.listeners) {
				this.listeners[event.type].concat().forEach(function(listener) {
					try {
						if (typeof listener === 'function')
							listener.call(this, event);

						else
							listener.handleEvent(event);

					} catch (e) {
						setTimeout(function() { throw e; }, 0);
					}
				}, this);
			}
			return !event.canceled;
		},
		notify: function notify(type, data) {
			var event = this.createEvent(type);
			if (data && typeof data === 'object')
				extend(event, data);

			return this.dispatchEvent(event);
		},
		createEvent: function createEvent(type) {
			return new Event(type, this);
		},
	});

	var Event = Class({
		constructor: function Event(type, target) {
			this.type = type;
			this.target = target;
		},
		canceled: false,
		timeStamp: null,
		preventDefault: function preventDefault() {
			this.canceled = true;
		},
	});

	var Counter = Class(Subject, {
		constructor: function Counter() {
			Counter.$super(this);
			this.count = 0;
		},
		plus: function plus(n) {
			n |= 0;
			if (n) {
				this.count += n;
				this.notify('change', {diff: n});
			}
			return this.count;
		},
		inc: function inc() {
			return this.plus(1);
		},
		dec: function dec(n) {
			return this.plus(-1);
		},
	});

	var DataTransfer = Class(Subject, {
		constructor: function DataTransfer() {
			DataTransfer.$super(this);
		},
		set: function set(type, data) {
			this.purge();
			this.type = type;
			this.data = data;
			this.notify(type, {data: data});
		},
		purge: function purge() {
			this.notify('purge', {data: this.data});
			delete this.data;
		},
		setForCut: function setForCut(data) {
			this.set('cut', data);
		},
		setForCopy: function setForCopy(data) {
			this.set('copy', data);
		},
		receive: function receive() {
			var data = this.data;
			if (this.type === 'cut')
				this.purge();

			return data;
		},
	});

	var MenuCommand = Class({
		constructor: function MenuCommand(label, fn, disabled) {
			this.uuid = GM_registerMenuCommand(label, fn);
			if (disabled)
				this.disable();
		},
		remove: function remove() {
			if (typeof GM_unregisterMenuCommand === 'function')
				GM_unregisterMenuCommand(this.uuid);
		},
		disable: function disable() {
			if (typeof GM_disableMenuCommand === 'function')
				GM_disableMenuCommand(this.uuid);
		},
		enable: function enable() {
			if (typeof GM_enableMenuCommand === 'function')
				GM_enableMenuCommand(this.uuid);
		},
	});

	var Preference = Class(Subject, {
		constructor: let (instance) function Preference() {
			if (instance)
				return instance;

			if (!(this instanceof Preference))
				return Preference.createInstance(arguments);

			Preference.$super(this);
			this.dict = {};
			window.addEventListener('unload', this.write.bind(this), false);

			instance = this;
		},
		has: function has(key) key in this.dict,
		get: function get(key, def) this.has(key) ? this.dict[key] : def,
		set: function set(key, value) {
			var prev = this.dict[key];
			if (value !== prev) {
				this.dict[key] = value;
				this.notify('change', {
					propertyName: key,
					prevValue: prev,
					newValue: value,
				});
			}
			return value;
		},
		del: function del(key) {
			if (!this.has(key))
				return;

			var prev = this.dict[key];
			delete this.dict[key];

			this.notify('delete', {
				propertyName: key,
				prevValue: prev,
			});
		},
		load: function load(str) {
			if (!str)
				str = GM_getValue('settings', Preference.defaultPref || '({})');

			var obj = eval('(' + str + ')');
			if (!obj || typeof obj !== 'object')
				return;

			this.dict = {};
			for (let [key, value] in Iterator(obj))
				this.set(key, value);

			this.notify('load');
		},
		write: function write() {
			GM_setValue('settings', this.toSource());
		},
		exportToTab: function exportToTab() {
			var enc = encodeURIComponent(this.toSource());
			GM_openInTab('data:text/plain;utf-8,' + enc);
		},
		importFromString: function importFromString(str) {
			try {
				this.load(str);
			} catch (e if e instanceof SyntaxError) {
				alert(e);
				return false;
			}
			return true;
		},
		importFromFile: function importFromFile() {
			var self = this;
			var input = document.createElement('input');
			input.type = 'file';
			input.addEventListener('change', function() {
				if (!input.files.length)
					return;

				var r = FileReader();
				r.addEventListener('load', function() {
					self.importFromString(r.result);
				}, false);
				r.readAsText(input.files[0]);
			}, false);
			input.click();
		},
		toString: function toString() '[object Preference]',
		toSource: function toSource() this.dict.toSource(),
	});

	var draggable = Class({
		constructor: function draggable(element) {
			if (!(this instanceof draggable))
				return draggable.createInstance(arguments);

			this.element = element;
			element.addEventListener('mousedown', this, false, false);
		},
		isDraggableTarget: let (formCtrlExp) function isDraggableTarget(target) {
			if (!target) return false;
			if (target === this.element) return true;
			if (!formCtrlExp)
				formCtrlExp = document.createExpression('ancestor-or-self::*[contains(" select button input textarea ", concat(" ", local-name(), " ")) or @*[local-name()="tabindex"]]', null);

			return !formCtrlExp.evaluate(target, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		},
		detatch: function detatch() {
			this.element.removeEventListener('mousedown', this, false);
		},
		handleEvent: function handleEvent(event) {
			if (event.type in this)
				this[event.type](event);
		},
		mousedown: function onMouseDown(event) {
			if (event.button !== 0)
				return;

			if (!this.isDraggableTarget(event.target))
				return;

			event.preventDefault();

			var focused = this.element.querySelector(':focus');
			if (focused)
				focused.blur();

			this.offsetX = event.pageX - this.element.offsetLeft;
			this.offsetY = event.pageY - this.element.offsetTop;
			document.addEventListener('mousemove', this, true, false);
			document.addEventListener('mouseup', this, true, false);
		},
		mousemove: function onMouseMove(event) {
			event.preventDefault();

			this.element.style.left = event.pageX - this.offsetX + 'px';
			this.element.style.top = event.pageY - this.offsetY + 'px';
		},
		mouseup: function onMouseUp(event) {
			if (event.button !== 0)
				return;

			event.preventDefault();

			document.removeEventListener('mousemove', this, true);
			document.removeEventListener('mouseup', this, true);
		},
	});

	var Filter = Class({
		constructor: function Filter(filter) {
			if (!(this instanceof Filter))
				return Filter.createInstance(arguments);

			extend(this, filter || {
				name: '',
				regexp: {},
				children: [],
			});
			this.regexp = extend({}, this.regexp || {});
			this.children = this.children ? this.children.map(Filter) : [];
		},
		test: function test(entry) {
			for (var [name, reg] in Iterator(this.regexp))
				if (!reg.test(entry[name] || ''))
					return false;

			if (!this.children.length)
				return !!name;

			return this.children.some(function(filter) filter.test(entry));
		},
		appendChild: function appendChild(filter) {
			if (!(filter instanceof this.constructor))
				return null;

			this.removeChild(filter);
			this.children.push(filter);
			this.sortChildren();
			return filter;
		},
		removeChild: function removeChild(filter) {
			if (!(filter instanceof this.constructor))
				return null;

			var index = this.children.indexOf(filter);
			if (index !== -1)
				this.children.splice(index, 1);

			return filter;
		},
		sortChildren: function sortChildren() {
			return this.children.sort(function(a, b) b.name < a.name);
		},
	});

	var Entry = Class(let (div = document.createElement('div')) ({
		constructor: function Entry(data) {
			this.data = data;
		},
		get title() {
			div.innerHTML = this.data.title || '';
			Object.defineProperty(this, 'title', {configurable: true, value: div.textContent});
			return this.title;
		},
		get url()         ((this.data.alternate || 0)[0] || 0).href,
		get sourceTitle() this.data.origin.title,
		get sourceURL()   this.data.origin.streamId.replace(/^[^/]+\//, ''),
		get body()        (this.data.content || this.data.summary || 0).content,
		get author()      this.data.author,
		get crawlTime()   +this.data.crawlTimeMsec.slice(0, -3),
		get published()   this.data.published,
		get updated()     this.data.updated,
		get tags()        [
			cat.substring(cat.lastIndexOf('/') + 1)
				for each (cat in this.data.categories)
					if (cat.lastIndexOf('user/', 0) === 0)
		],
	}));

	var Panel = Class(Subject, {
		constructor: function Panel() {
			Panel.$super(this);
			var self = this;

			var panel = document.createElement('form');
			panel.classList.add('grng-panel');
			draggable(panel);
			panel.addEventListener('submit', function(event) {
				event.preventDefault();
				event.stopPropagation();
				self.apply();
			}, false);

			var submit = document.createElement('input');
			submit.type = 'submit';
			submit.style.display = 'none';

			var body = document.createElement('div');
			body.classList.add('grng-panel-body');

			var buttons = document.createElement('div');
			buttons.classList.add('grng-panel-buttons');

			var ok = createGoogButton($str.ok, function() self.apply());
			ok.classList.add('grng-panel-ok');

			var cancel = createGoogButton($str.cancel, function() self.close());
			cancel.classList.add('grng-panel-cancel');

			panel.appendChild(submit);
			panel.appendChild(body);
			panel.appendChild(buttons);
			buttons.appendChild(ok);
			buttons.appendChild(cancel);

			this.dom = {
				element: panel,
				body: body,
				buttons: buttons,
			};
		},
		get opened() !!this.dom.element.parentNode,
		open: function open(anchorElement) {
			if (this.opened)
				return;

			if (!this.notify('showing'))
				return;

			if (!anchorElement || anchorElement.nodeType !== 1)
				anchorElement = null;

			document.body.appendChild(this.dom.element);
			this.snapTo(anchorElement);

			if (anchorElement) {
				let onWindowResize = this.snapTo.bind(this, anchorElement);
				window.addEventListener('resize', onWindowResize, false);
				this.on('hidden', window.removeEventListener.bind(window, 'resize', onWindowResize, false), false);
			}

			var focused = document.querySelector(':focus');
			if (focused)
				focused.blur();

			var tab = Array.slice(this.dom.element.querySelectorAll(':not(.grng-panel) > :-moz-any(button, input, select, textarea, *[tabindex])'))
				.sort(function(a, b) (b.tabIndex || 0) < (a.tabIndex || 0))[0];

			if (tab) {
				tab.focus();
				if (tab.select)
					tab.select();
			}

			this.notify('shown');
		},
		apply: function apply() {
			if (this.notify('apply'))
				this.close();
		},
		close: function close() {
			if (!this.opened)
				return;

			if (!this.notify('hiding'))
				return;

			document.adoptNode(this.dom.element);

			this.notify('hidden');
		},
		toggle: function toggle(anchorElement) {
			if (this.opened)
				this.close();

			else
				this.open(anchorElement);
		},
		moveTo: function moveTo(x, y) {
			this.dom.element.style.left = x + 'px';
			this.dom.element.style.top = y + 'px';
		},
		snapTo: function snapTo(anchorElement) {
			var pad = 5;
			var x = pad;
			var y = pad;
			if (anchorElement) {
				var {left, bottom: top} = anchorElement.getBoundingClientRect();
				left += pad;
				top += pad;

				var {width, height} = this.dom.element.getBoundingClientRect();
				var right = left + width + pad;
				var bottom = top + height + pad;

				var {innerWidth, innerHeight} = window;
				if (innerWidth < right)
					left -= right - innerWidth;

				if (innerHeight < bottom)
					top -= bottom - innerHeight;

				x = Math.max(x, left);
				y = Math.max(y, top);
			}
			this.moveTo(x, y);
		},
		getFormData: function getFormData(asElement) {
			var data = {};
			Array.slice(this.dom.body.querySelectorAll('*[name]')).forEach(function(elem) {
				var value;
				if (asElement) {
					value = elem;

				} else {
					if (elem.localName.toLowerCase() === 'input' && (elem.type === 'checkbox' || elem.type === 'radio'))
						value = elem.checked;

					else
						value = 'value' in elem ? elem.value : elem.getAttribute('value');
				}

				var path = elem.name.split('.');
				var leaf = path.pop();
				var cd = path.reduce(function(parent, dirName) {
					if (!(dirName in parent))
						parent[dirName] = {};

					return parent[dirName];
				}, data);

				var reg = /\[\]$/;
				if (reg.test(leaf)) {
					leaf = leaf.replace(reg, '');
					if (!(leaf in cd))
						cd[leaf] = [];

					cd[leaf].push(value);

				} else {
					cd[leaf] = value;
				}
			});
			return data;
		},
		appendContent: function appendContent(element) {
			if (element instanceof Array)
				return element.map(appendContent, this);

			return this.dom.body.appendChild(element);
		},
		removeContents: function removeContents() {
			var range = node.ownerDocument.createRange();
			range.selectNodeContents(this.dom.body);
			range.deleteContents();
			range.detach();
		},
	});

	var FilterListPanel = Class(Panel, {
		constructor: function FilterListPanel(filter, isRoot) {
			FilterListPanel.$super(this);
			this.filter = filter;

			var self = this;

			if (isRoot)
				this.dom.element.classList.add('root');

			var add = createGoogButton($str.add, function() {
				var f = new Filter();
				f.name = $str.new_filter;
				self.on('apply', function() {
					self.filter.appendChild(f);
				}, false);
				self.appendFilter(f);
			});
			add.classList.add('grng-panel-addfilter');
			this.dom.buttons.insertBefore(add, this.dom.buttons.firstChild);

			var paste = createGoogButton($str.paste, function() {
				if (!clipboard.data)
					return;

				var f = new Filter(clipboard.receive());
				self.on('apply', function() {
					self.filter.appendChild(f);
				}, false);
				self.appendFilter(f);
			});
			paste.classList.add('grng-panel-pastefilter');
			this.dom.buttons.insertBefore(paste, add.nextSibling);

			this.on('showing', this.initContents, false);
			this.on('apply', this, false);
		},
		initContents: function initContents() {
			var filter = this.filter;

			var nameTextbox = document.createElement('input');
			nameTextbox.classList.add('grng-panel-name');
			nameTextbox.type = 'text';
			nameTextbox.name = 'name';
			nameTextbox.size = '32';
			nameTextbox.autocomplete = 'off';
			nameTextbox.value = filter.name;

			var terms = document.createElement('fieldset');
			var legend = document.createElement('legend');
			legend.textContent = filter.name + $str.rules;

			var table = document.createElement('table');
			table.classList.add('grng-panel-terms');

			var tbody = document.createElement('tbody');
			for (let [type, labelText] in Iterator({
				title:       $str.title,
				url:         $str.url,
				sourceTitle: $str.source_title,
				sourceURL:   $str.source_url,
				author:      $str.author,
				body:        $str.body,
			})) {
				let row = document.createElement('tr');

				let left = document.createElement('td');
				let center = document.createElement('td');
				let right = document.createElement('td');

				let textbox = document.createElement('input');
				textbox.classList.add('grng-panel-terms-textbox');
				textbox.type = 'text';
				textbox.name = 'regexp.' + type + '.source';
				textbox.size = '32';
				textbox.autocomplete = 'off';
				if (type in filter.regexp)
					textbox.value = filter.regexp[type].source.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=\/)/g, '$1');

				let label = createLabel(textbox, labelText);
				label.classList.add('grng-panel-terms-textbox-label');

				let ic = document.createElement('input');
				ic.classList.add('grng-panel-terms-checkbox');
				ic.type = 'checkbox';
				ic.name = 'regexp.' + type + '.ignoreCase';
				if (type in filter.regexp)
					ic.checked = filter.regexp[type].ignoreCase;

				let icl = createLabel(ic, 'i');
				icl.classList.add('grng-panel-terms-checkbox-label');
				icl.title = $str.ignore_case;

				tbody.appendChild(row);
					row.appendChild(left);
						left.appendChild(label);
					row.appendChild(center);
						center.appendChild(textbox);
					row.appendChild(right);
						right.appendChild(ic);
						right.appendChild(icl);
			}

			var rules = document.createElement('div');
			rules.classList.add('grng-panel-rules');

			terms.appendChild(legend);
			terms.appendChild(table);
			table.appendChild(tbody);
			this.appendContent([nameTextbox, terms, rules]);

			this.dom.rules = rules;
			filter.children.forEach(this.appendFilter, this);
		},
		appendFilter: function appendFilter(filter) {
			var self = this;
			var panel;

			var rule = document.createElement('div');
			rule.classList.add('grng-panel-rule');
			if (filter.children.length)
				rule.classList.add('parent');

			var name = document.createElement('div');
			name.classList.add('grng-panel-rule-name');
			name.addEventListener('dblclick', onEdit, true);

			var count = document.createElement('div');
			count.classList.add('grng-panel-rule-count');

			var buttons = document.createElement('div');
			buttons.classList.add('grng-panel-rule-buttons');

			var edit = createGoogMenuButton($str.edit, onEdit, [[$str.copy, onCopy], [$str.delete, onDelete]]);
			edit.classList.add('grng-panel-rule-edit');

			updateRow();

			rule.appendChild(name);
			rule.appendChild(count);
			rule.appendChild(buttons);
			buttons.appendChild(edit);
			this.dom.rules.appendChild(rule);

			function updateRow() {
				name.textContent = filter.name;
				count.textContent = filter.children.length || '';
			}
			function onEdit() {
				if (panel) {
					panel.close();
					return;
				}
				panel = new FilterListPanel(filter);
				panel.on('shown', function() {
					edit.querySelector('.jfk-button').classList.add('jfk-button-checked');
				}, false);
				panel.on('hidden', function() {
					edit.querySelector('.jfk-button').classList.remove('jfk-button-checked');
					panel = null;
				}, false);
				panel.on('apply', setTimeout.bind(null, updateRow, 0), false);
				panel.open(this);
			}
			function onCopy() {
				clipboard.setForCopy(filter);
			}
			function onDelete() {
				document.adoptNode(rule);
				self.on('apply', function() {
					self.filter.removeChild(filter);
				}, false);
			}
		},
		handleEvent: function handleEvent(event) {
			if (event.type !== 'apply')
				return;

			var data = this.getFormData(true);
			var filter = this.filter;
			filter.name = data.name.value;

			var regexp = {};
			for (let [type, {source, ignoreCase}] in Iterator(data.regexp)) {
				if (!source.value)
					continue;

				try {
					regexp[type] = RegExp(source.value, ignoreCase.checked ? 'i' : '');
				} catch (e if e instanceof SyntaxError) {
					event.preventDefault();
					source.classList.remove('error');
					source.offsetWidth;
					source.classList.add('error');
				}
			}
			filter.regexp = regexp;
			filter.sortChildren();
		},
	});

	var GoogMenu = Class({
		constructor: function GoogMenu(anchorElement, items) {
			this.items = items;
			this.anchorElement = anchorElement;
			anchorElement.addEventListener('mousedown', this, false);
		},
		get opened() !!((this.dom || 0).element|| 0).parentNode,
		init: function init() {
			var menu = document.createElement('div');
			menu.className = 'grng goog-menu goog-menu-vertical';
			menu.addEventListener('click', this, false);
			this.items.forEach(function(item) {
				var menuitem = document.createElement('div');
				if (typeof item === 'string') {
					if (/^-+$/.test(item))
						menuitem.className = 'goog-menuseparator';

				} else {
					var [label, fn] = item;
					menuitem.className = 'goog-menuitem';
					var content = document.createElement('div');
					content.className = 'goog-menuitem-content';
					content.textContent = label;
					menuitem.appendChild(content);
					if (fn)
						menuitem.addEventListener('click', fn, false);
				}
				menu.appendChild(menuitem);
			});

			this.dom = {
				element: menu,
			};
		},
		open: function open() {
			if (this.opened)
				return;

			var {right, bottom} = this.anchorElement.getBoundingClientRect();
			var menu = this.dom.element;
			document.body.appendChild(menu);
			menu.style.left = right - menu.offsetWidth + 'px';
			menu.style.top = bottom + 'px';
			this.anchorElement.classList.add('goog-flat-menu-button-open');
			document.addEventListener('mousedown', this, true);
			document.addEventListener('blur', this, true);
		},
		close: function close() {
			document.removeEventListener('mousedown', this, true);
			document.removeEventListener('blur', this, true);
			document.adoptNode(this.dom.element);
			this.anchorElement.classList.remove('goog-flat-menu-button-open');
		},
		handleEvent: function handleEvent({type, target, currentTarget}) {
			switch (type) {
			case 'blur':
				if (target === document)
					this.close();

				return;
			case 'click':
				if (target.mozMatchesSelector('.goog-menuitem, .goog-menuitem *'))
					this.close();

				return;
			case 'mousedown':
				var pos = this.anchorElement.compareDocumentPosition(target);
				if (currentTarget === document && (!pos || pos & target.DOCUMENT_POSITION_CONTAINED_BY))
					return;

				if (this.opened) {
					if (!target.mozMatchesSelector('.goog-menu *'))
						this.close();

				} else {
					if (!this.dom)
						this.init();

					this.open();
				}
				return;
			}
		},
	});

	Preference.defaultPref = {
		filter: {
			name: '',
			regexp: {},
			children: [
				{
					name: 'AD',
					regexp: {
						title: /^\W?(?:ADV?|PR)\b/,
					},
					children: [],
				},
			],
		},
	}.toSource();

	evalInContent('' +
		'(function() {' +
			'var XHR = XMLHttpRequest;' +
			'var uniqueId = 0;' +

			'XMLHttpRequest = function XMLHttpRequest() {' +
				'var req = new XHR();' +
				'req.open = open;' +
				'req.addEventListener("readystatechange", onReadyStateChange, false);' +
				'return req;' +
			'};' +
			'function open(method, url, async) {' +
				'this.__url__ = url;' +
				'return XHR.prototype.open.apply(this, arguments);' +
			'}' +
			'function onReadyStateChange() {' +
				'if (this.readyState < 4 || this.status !== 200)' +
					'return;' +

				'if (!/^\\/reader\\/api\\/0\\/stream\\/(?:items\\/)?contents\\b/.test(this.__url__))' +
					'return;' +

				'var pongEventType = "streamcontentloaded_callback" + uniqueId++;' +

				'var event = document.createEvent("MessageEvent");' +
				'event.initMessageEvent(' +
					'"streamcontentloaded", true, false,' +
					'JSON.stringify({' +
						'type: pongEventType,' +
						'text: this.responseText,' +
					'}),' +
					'"GoogleReaderNGFilter", "", null' +
				');' +

				'var self = this;' +
				'function onPong({data}) {' +
					'Object.defineProperty(self, "responseText", {configurable: true, value: data});' +
				'}' +
				'document.addEventListener(pongEventType, onPong, false);' +
				'document.dispatchEvent(event);' +
				'document.removeEventListener(pongEventType, onPong, false);' +
			'}' +
		'})();'
	);

	var xhrCounter = new Counter();
	xhrCounter.on('change', function({diff}) {
		if (0 < diff) {
			if (this.count === 1)
				clearTimeout(this.timer);

		} else if (!this.count) {
			this.timer = setTimeout(function() {
				document.getElementById('sub-tree-header').click();
			}, 3000);
		}
	});

	document.addEventListener('streamcontentloaded', function(event) {
		var {type: pongEventType, text} = JSON.parse(event.data);
		var data = JSON.parse(text);
		var token = unsafeWindow._COMMAND_TOKEN;
		var readTag = 'user/' + unsafeWindow._USER_ID + '/state/com.google/read';

		var length = data.items.length;
		var logging = pref.get('logging', true);
		var filter = pref.get('filter');
		var onload = xhrCounter.dec.bind(xhrCounter);
		data.items = data.items.filter(function(item) {
			var entry = new Entry(item);
			if (!filter.test(entry))
				return true;

			if (logging)
				GM_log('filtered: "' + (entry.title || '') + '" ' + entry.url);

			var unread = item.categories.indexOf(readTag) === -1;
			if (unread) {
				xhrCounter.inc();
				xhr({
					url: '/reader/api/0/edit-tag',
					data: {
						T: token,
						a: readTag,
						async: 'true',
						i: item.id,
						s: item.origin.streamId,
						client: 'ngfilter',
					},
					onload: onload,
				});
			}
			return false;
		});

		if (data.items.length === length)
			return;

		var ev = document.createEvent('MessageEvent');
		ev.initMessageEvent(pongEventType, true, false, JSON.stringify(data), 'GoogleReaderNGFilter', '', null);
		document.dispatchEvent(ev);
	}, false);

	var prefMenuCommand = menuCommand($str.setting + '...', togglePrefPanel, true);
	var langMenuCommand = menuCommand($str.language + '...', function() {
		var langField = document.createElement('fieldset');

		var title = document.createElement('legend');
		title.textContent = $str.language;

		var select = document.createElement('select');
		Locale.languages.forEach(function(lang) {
			var option = document.createElement('option');
			option.value = lang;
			option.textContent = lang;
			if (lang === Locale.selectedLanguage)
				option.selected = true;

			select.appendChild(option);
		});

		langField.appendChild(title);
		langField.appendChild(select);

		var p = new Panel();
		p.appendContent(langField);
		p.on('apply', function() {
			pref.set('language', select.value);
		});
		p.open();
	}, true);

	menuCommand($str.import_setting + '...', function() {
		var str = prompt($str.allow_json_str, '');
		if (str && pref.importFromString(str))
			alert($str.import_success);
	});
	menuCommand($str.export_setting, function() pref.exportToTab());

	document.addEventListener('DOMContentLoaded', GRNG_onDOMContentLoaded, false);

	var pref;
	var rootFilterPanel;
	var openPrefButton;
	var clipboard = new DataTransfer();

	function GRNG_onDOMContentLoaded() {
		prefMenuCommand.enable();
		langMenuCommand.enable();

		GM_addStyle(CSS_STYLE_TEXT);

		openPrefButton = createGoogButton($str.ng_setting, onNGSettingCommand);
		openPrefButton.id = 'grng-open-panel';
		addViewerControl(openPrefButton);

		pref = new Preference();
		pref.on('change', function({propertyName, newValue}) {
			switch (propertyName) {
			case 'filter':
				if (!(newValue instanceof Filter))
					this.set('filter', new Filter(newValue));

				break;
			case 'language':
				Locale.select(newValue);
				openPrefButton.textContent = $str.ng_setting;
				break;
			}
		}, false);
		pref.load();

		addSettingsMenuCommand($str.ng_setting, onNGSettingCommand);
	}

	function togglePrefPanel(anchorElement) {
		if (rootFilterPanel) {
			rootFilterPanel.close();
			return;
		}
		rootFilterPanel = new FilterListPanel(pref.get('filter'), true);
		rootFilterPanel.on('apply', function() {
			showMessage($str.ng_setting_modified);
		});
		rootFilterPanel.on('hidden', function() {
			clipboard.purge();
			openPrefButton.classList.remove('jfk-button-checked');
			rootFilterPanel = null;
		});
		openPrefButton.classList.add('jfk-button-checked');
		rootFilterPanel.open(anchorElement);
	}
	function onNGSettingCommand({target}) {
		togglePrefPanel(target);
	}
	function createGoogButton(text, fn) {
		var button = document.createElement('div');
		button.className = 'goog-inline-block jfk-button jfk-button-standard unselectable';
		button.tabIndex = 0;
		button.textContent = text;
		if (fn) {
			button.addEventListener('click', fn, false);
			button.addEventListener('keydown', function({which}) {
				if (which === 13)
					fn.apply(this, arguments);
			}, false);
		}

		return button;
	}
	function createGoogMenuButton(text, fn, arr) {
		var container = document.createElement('div');
		container.className = 'goog-inline-block';

		var button = createGoogButton(text, fn);
		button.classList.add('jfk-button-collapse-right');

		var options = document.createElement('div');
		options.className = 'goog-inline-block goog-flat-menu-button goog-flat-menu-button-collapse-left unselectable';
		options.tabIndex = 0;

		var label = document.createElement('div');
		label.className = 'goog-inline-block goog-flat-menu-button-caption';

		var marker = document.createElement('div');
		marker.className = 'goog-inline-block goog-flat-menu-button-dropdown';

		container.appendChild(button);
		container.appendChild(options);
		options.appendChild(label);
		options.appendChild(marker);

		new GoogMenu(options, arr);

		return container;
	}
	function showMessage(str) {
		var messageArea = document.getElementById('message-area');
		messageArea.textContent = str;

		var observer = new MutationObserver(function mutationCallback() {
			this.disconnect();
			clearTimeout(timer);
		});
		observer.observe(messageArea, {
			childList: true,
		});
		messageArea.classList.remove('jfk-butterBar-promo');
		messageArea.classList.remove('jfk-butterBar-error');
		messageArea.classList.remove('jfk-butterBar-warning');
		messageArea.classList.add('jfk-butterBar-info');
		messageArea.classList.add('jfk-butterBar-shown');

		var timer = setTimeout(function() {
			observer.disconnect();
			messageArea.classList.remove('jfk-butterBar-shown');
		}, 7000);
	}
	function addViewerControl(button) {
		var buttons = document.querySelectorAll('#viewer-top-controls > .goog-button');
		var lastButton = buttons[buttons.length - 1];
		if (lastButton)
			lastButton.parentNode.insertBefore(button, lastButton.nextSibling);
	}
	function addSettingsMenuCommand(label, fn) {
		var settingsButtonMenu = document.getElementById('settings-button-menu');
		if (!settingsButtonMenu)
			return;

		var item = document.createElement('div');
		item.id = 'grng-settings-menu-item';
		item.className = 'goog-menuitem';
		item.setAttribute('role', 'menuitem');
		item.setAttribute('style', '-moz-user-select: none;');
		item.addEventListener('mouseup', fn, false);
		item.addEventListener('mouseenter', function(event) {
			this.classList.add('goog-menuitem-highlight');
			settingsButtonMenu.setAttribute('aria-activedescendant', this.id);
		});
		item.addEventListener('mouseleave', function(event) {
			this.classList.remove('goog-menuitem-highlight');
			settingsButtonMenu.setAttribute('aria-activedescendant', '');
		});

		var content = document.createElement('div');
		content.className = 'goog-menuitem-content';
		content.textContent = $str.ng_setting;

		item.appendChild(content);
		settingsButtonMenu.appendChild(item);
	}
	function menuCommand(label, fn) {
		return new MenuCommand($str.app_name + ' - ' + label, fn);
	}
	function xhr(details) {
		var opt = Object.create(details);
		var {data} = opt;

		if (!opt.method)
			opt.method = data ? 'POST' : 'GET';

		if (data && typeof data === 'object') {
			opt.data = [pair.map(encodeURIComponent).join('=') for (pair in Iterator(data))].join('&');
			if (!opt.headers)
				opt.headers = {};

			opt.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		}

		setTimeout(GM_xmlhttpRequest, 0, opt);
	}
	function evalInContent(code) {
		var script = document.createElement('script');
		script.type = 'text/javascript;version=1.8';
		script.textContent = code;

		try {
			document.adoptNode(document.appendChild(script));
		} catch (e) {
			document.adoptNode(document.documentElement.appendChild(script));
		}
	}
	function createLabel(element, text) {
		var label = document.createElement('label');
		if (1 < arguments.length)
			label.textContent = text;

		var id = element.id;
		if (!id) {
			if (!('id' in createLabel))
				createLabel.id = 0;

			id = 'id_for_label_' + createLabel.id++;
			element.id = id;
		}
		label.htmlFor = id;
		return label;
	}
	function extend(dst, src) {
		for (var [key, value] in Iterator(src))
			dst[key] = value;

		return dst;
	}
	function $TEXT(fn) {
		if (fn.length)
			throw {};

		return String.replace(fn, /^[^{]+\{\/\*|\*\/}$/g, '');
	}
})();
