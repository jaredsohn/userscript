// ==UserScript==
// @name           Feedly NG Filter
// @id             feedlyngfilter
// @description    ルールにマッチするアイテムを既読にして取り除きます。ルールは正規表現で記述でき、複数のルールをツリー状に組み合わせることができます。
// @include        http://feedly.com/*
// @include        https://feedly.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_xmlhttpRequest
// @grant          GM_registerMenuCommand
// @grant          GM_unregisterMenuCommand
// @grant          GM_log
// @charset        utf-8
// @compatibility  Firefox
// @run-at         document-start
// @jsversion      1.8
// @priority       1
// @homepage       http://userscripts.org/scripts/show/172085
// @updateURL      https://userscripts.org/scripts/source/172085.meta.js
// @supportURL     http://twitter.com/?status=%40xulapp+
// @icon           http://s3.amazonaws.com/uso_ss/icon/172085/large.png
// @screenshot     http://s3.amazonaws.com/uso_ss/22105/large.png
// @namespace      http://twitter.com/xulapp
// @author         xulapp
// @license        MIT License
// @version        0.5
// ==/UserScript==


(function feedlyNGFilter() {
	const CSS_STYLE_TEXT = $TEXT(() => {/*
		.unselectable {
			-moz-user-select: none;
		}
		.goog-inline-block {
			display: inline-block;
			position: relative;
		}
		.jfk-button {
			border-radius: 2px 2px 2px 2px;
			cursor: default;
			font-size: 11px;
			font-weight: bold;
			text-align: center;
			white-space: nowrap;
			margin-right: 16px;
			height: 27px;
			line-height: 27px;
			min-width: 54px;
			outline: 0px none;
			padding: 0px 8px;
		}
		.jfk-button-standard {
			background-color: rgb(245, 245, 245);
			background-image: -moz-linear-gradient(center top , rgb(245, 245, 245), rgb(241, 241, 241));
			color: rgb(68, 68, 68);
			border: 1px solid rgba(0, 0, 0, 0.1);
		}
		.jfk-button-standard:hover {
			background-color: #f8f8f8;
			background-image: -moz-linear-gradient(top, #f8f8f8, #f1f1f1);
			border: 1px solid #c6c6c6;
			color: #333;
		}
		.jfk-button-standard:focus {
			border: 1px solid #4d90fe;
		}
		.jfk-button-standard:active {
			box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
		}
		.jfk-button-standard.jfk-button-disabled {
			background: none;
			border: 1px solid rgba(0, 0, 0, 0.05);
			color: rgb(184, 184, 184);
		}
		.goog-flat-menu-button {
			border-radius: 2px 2px 2px 2px;
			background-color: rgb(245, 245, 245);
			background-image: -moz-linear-gradient(center top , rgb(245, 245, 245), rgb(241, 241, 241));
			border: 1px solid rgb(220, 220, 220);
			color: rgb(68, 68, 68);
			cursor: default;
			font-size: 11px;
			font-weight: bold;
			line-height: 27px;
			list-style: none outside none;
			margin: 0px 2px;
			min-width: 46px;
			outline: medium none;
			padding: 0px 18px 0px 6px;
			text-align: center;
			text-decoration: none;
			vertical-align: middle;
		}
		.goog-flat-menu-button-open,
		.goog-flat-menu-button:active {
			-moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);
			box-shadow:inset 0 1px 2px rgba(0, 0, 0, .1);
			background-color: #eee;
			background-image: -moz-linear-gradient(top, #eee, #e0e0e0);
			background-image: linear-gradient(top, #eee, #e0e0e0);
			border: 1px solid #ccc;
			color: #333;
			z-index: 2
		}
		.goog-flat-menu-button-collapse-left {
			margin-left: -1px;
			border-bottom-left-radius: 0px;
			border-top-left-radius: 0px;
			min-width: 0px;
			padding-left: 0px;
			vertical-align: top;
		}
		.jfk-button-collapse-left,
		.jfk-button-collapse-right {
			z-index: 1;
		}
		.jfk-button-collapse-right {
			margin-right: 0px;
			border-top-right-radius: 0px;
			border-bottom-right-radius: 0px;
		}
		.goog-flat-menu-button-caption {
			vertical-align: top;
			white-space: nowrap;
		}
		.goog-flat-menu-button-dropdown {
			border-color: rgb(119, 119, 119) transparent;
			border-style: solid;
			border-width: 4px 4px 0px;
			height: 0px;
			width: 0px;
			position: absolute;
			right: 5px;
			top: 12px;
		}
		.goog-menu {
			-moz-box-shadow:0 2px 4px rgba(0,0,0,0.2);
			box-shadow:0 2px 4px rgba(0,0,0,0.2);
			-moz-transition:opacity .218s;
			transition:opacity .218s;
			background:#fff;
			border:1px solid #ccc;
			border:1px solid rgba(0,0,0,.2);
			cursor:default;
			font-size:13px;
			margin:0;
			outline:none;
			padding:6px 0;
			position:absolute
		}
		.goog-menuitem {
			position: relative;
			color: #333;
			cursor: pointer;
			list-style: none;
			margin: 0;
			padding: 6px 7em 6px 30px;
			white-space: nowrap;
		}
		.goog-menuitem:hover {
			background-color: #eee;
			border-color: #eee;
			border-style: dotted;
			border-width: 1px 0;
			padding-top: 5px;
			padding-bottom: 5px
			color: #333;
		}
		.feedlyng-menu-button-container > .goog-menu-button {
			margin-left: -2px;
		}
		.feedlyng.goog-menu {
			position: absolute;
			z-index: 2147483646;
		}
		.feedlyng .goog-menuitem:hover {
			background-color: #eeeeee;
		}
		#feedlyng-open-panel {
			float: left;
		}
		.feedlyng-panel {
			position: fixed;
			background-color: #ffffff;
			color: #333333;
			box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.5);
			z-index: 2147483646;
		}
		.feedlyng-panel :-moz-any(label, legend) {
			cursor: default;
		}
		.feedlyng-panel input[type="text"] {
			padding: 2px;
			border: 1px solid #b2b2b2;
		}
		.feedlyng-panel-body {
			margin: 8px;
		}
		.feedlyng-panel-body > fieldset {
			margin: 8px 0;
		}
		.feedlyng-panel.root > .feedlyng-panel-body > :-moz-any(.feedlyng-panel-name, fieldset) {
			display: none;
		}
		.feedlyng-panel-terms {
			border-spacing: 2px;
		}
		.feedlyng-panel-terms > tbody > tr > td {
			padding: 0;
			white-space: nowrap;
		}
		.feedlyng-panel-terms :-moz-any(input, label) {
			margin: 0;
			vertical-align: middle;
		}
		@-moz-keyframes error {
			0% {
				background-color: #ffff00;
				border-color: #ff0000;
			}
		}
		.feedlyng-panel-terms-textbox.error {
			-moz-animation: error 1s;
		}
		.feedlyng-panel-terms-textbox-label {
			display: block;
			font-size: 90%;
			text-align: right;
		}
		.feedlyng-panel-terms-textbox-label:after {
			content: ":";
		}
		.feedlyng-panel-terms-checkbox-label {
			padding: 0 8px;
		}
		.feedlyng-panel-rules {
			display: table;
		}
		.feedlyng-panel-rule {
			display: table-row;
		}
		.feedlyng-panel-rule:hover {
			background-color: #eeeeee;
		}
		.feedlyng-panel-rule > div {
			display: table-cell;
			white-space: nowrap;
		}
		.feedlyng-panel-rule-name {
			width: 100%;
			padding-left: 16px;
			cursor: default;
		}
		.feedlyng-panel-rule-count {
			padding: 0 8px;
			font-weight: bold;
			cursor: default;
		}
		.feedlyng-panel-buttons {
			margin: 8px;
			text-align: right;
			white-space: nowrap;
		}
		.feedlyng-panel-addfilter {
			float: left;
			margin-right: 8px;
		}
		.feedlyng-panel-pastefilter {
			float: left;
			margin-right: 16px;
		}
		.feedlyng-panel-ok {
			margin-right: 8px;
		}
		.feedlyng-panel-cancel {
			margin-right: 0;
		}
	*/});

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
			this.selectedLanguage = lang in this.data ? lang : '_default';
		},
		createReference: function createReference() {
			return Proxy.create(this);
		},
	};
	Locale.data['en-US'] = {
		__proto__: null,
		app_name: 'Feedly NG Filter',
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
		hit_count: 'Hit Count',
		last_hit: 'Last Hit',
		ng_setting: 'NG Setting',
		setting: 'Setting',
		import_setting: 'Import Configuration',
		import_success: 'Preferences were successfully imported.',
		export_setting: 'Export Configuration',
		language: 'Language',
		ng_setting_modified: 'NG Settings were modified.\nNew filters take effect after next refresh.',
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
		hit_count: 'ヒット数',
		last_hit: '最終ヒット',
		ng_setting: 'NG 設定',
		setting: '設定',
		import_setting: '設定をインポート',
		import_success: '設定をインポートしました',
		export_setting: '設定をエクスポート',
		language: '言語',
		ng_setting_modified: 'NG 設定を更新しました。\n新しいフィルタは次回読み込み時から有効になります。',
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
			Object.getOwnPropertyNames(this).forEach((name) => res[name] = Object.getOwnPropertyDescriptor(this, name));

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
			type += '';

			if (type.trim().indexOf(' ') !== -1) {
				type.match(/\S+/g).forEach(function(t) this.on(t, listener), this);
				return;
			}

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
		emit: function emit(type, data) {
			var event = this.createEvent(type);
			if (data instanceof Object)
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

	var DataTransfer = Class(Subject, {
		constructor: function DataTransfer() {
			DataTransfer.$super(this);
		},
		set: function set(type, data) {
			this.purge();
			this.type = type;
			this.data = data;
			this.emit(type, {data: data});
		},
		purge: function purge() {
			this.emit('purge', {data: this.data});
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
		constructor: function MenuCommand(label, oncommand, disabled) {
			this.label = label;
			this.oncommand = oncommand;
			this.disabled = !!disabled;

			this.register();
		},
		register: function register() {
			this.uuid = GM_registerMenuCommand(this.label, this.oncommand);

			if (MenuCommand.contextmenu) {
				this.menuitem = document.createElement('menuitem');
				this.menuitem.label = this.label;
				this.menuitem.addEventListener('click', this.oncommand, false);
				MenuCommand.contextmenu.appendChild(this.menuitem);
			}

			if (this.disabled)
				this.disable();
		},
		unregister: function unregister() {
			if (typeof GM_unregisterMenuCommand === 'function')
				GM_unregisterMenuCommand(this.uuid);

			document.adoptNode(this.menuitem);
		},
		disable: function disable() {
			if (typeof GM_disableMenuCommand === 'function')
				GM_disableMenuCommand(this.uuid);

			this.menuitem.disabled = true;
		},
		enable: function enable() {
			if (typeof GM_enableMenuCommand === 'function')
				GM_enableMenuCommand(this.uuid);

			this.menuitem.disabled = false;
		},
	});
	MenuCommand.contextmenu = null;

	var Preference = Class(Subject, {
		constructor: let (instance) function Preference() {
			if (instance)
				return instance;

			Preference.$super(this);
			instance = this;

			this.dict = {};
		},
		has: function has(key) key in this.dict,
		get: function get(key, def) this.has(key) ? this.dict[key] : def,
		set: function set(key, value) {
			var prev = this.dict[key];
			if (value !== prev) {
				this.dict[key] = value;
				this.emit('change', {
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

			this.emit('delete', {
				propertyName: key,
				prevValue: prev,
			});
		},
		load: function load(str) {
			if (!str)
				str = GM_getValue(Preference.prefName, Preference.defaultPref || '({})');

			var obj = eval('(' + str + ')');
			if (!obj || typeof obj !== 'object')
				return;

			this.dict = {};
			for (let [key, value] in Iterator(obj))
				this.set(key, value);

			this.emit('load');
		},
		write: function write() {
			GM_setValue(Preference.prefName, this.toSource());
		},
		autoSave: function autoSave() {
			if (autoSave.reserved)
				return;

			window.addEventListener('unload', () => this.write(), false);
			autoSave.reserved = true;
		},
		exportToFile: function exportToFile() {
			var blob = new Blob([this.toSource()], {
				type: 'application/octet-stream',
			});
			var url = URL.createObjectURL(blob);
			location.href = url;
			URL.revokeObjectURL(url);
		},
		importFromString: function importFromString(str) {
			try {
				this.load(str);
			} catch (e if e instanceof SyntaxError) {
				showMessage(e, 'warning');
				return false;
			}
			showMessage($str.import_success);
			return true;
		},
		importFromFile: function importFromFile() {
			openFilePicker(files => {
				if (!files)
					return;

				var r = FileReader();
				r.addEventListener('load', () => this.importFromString(r.result), false);
				r.readAsText(files[0]);
			});
		},
		toString: function toString() '[object Preference]',
		toSource: function toSource() this.dict.toSource(),
	});
	Preference.prefName = 'settings';

	var draggable = Class({
		constructor: function draggable(element) {
			this.element = element;
			element.addEventListener('mousedown', this, false, false);
		},
		isDraggableTarget: function isDraggableTarget(target) {
			if (!target)
				return false;

			if (target === this.element)
				return true;

			return !target.mozMatchesSelector(':-moz-any(select, button, input, textarea, [tabindex]), :-moz-any(select, button, input, textarea, [tabindex]) *');
		},
		detatch: function detatch() {
			this.element.removeEventListener('mousedown', this, false);
		},
		handleEvent: function handleEvent(event) {
			var name = 'on' + event.type;
			if (name in this)
				this[name](event);
		},
		onmousedown: function onMouseDown(event) {
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
		onmousemove: function onMouseMove(event) {
			event.preventDefault();

			this.element.style.left = event.pageX - this.offsetX + 'px';
			this.element.style.top = event.pageY - this.offsetY + 'px';
		},
		onmouseup: function onMouseUp(event) {
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

			if (!(filter instanceof Object))
				filter = {};

			this.name = filter.name || '';
			this.regexp = extend({}, filter.regexp || {});
			this.children = filter.children ? filter.children.map(Filter) : [];
			this.hitcount = filter.hitcount || 0;
			this.lasthit = filter.lasthit || 0;
		},
		test: function test(entry) {
			for (var [name, reg] in Iterator(this.regexp))
				if (!reg.test(entry[name] || ''))
					return false;

			var hit = this.children.length ? this.children.some(filter => filter.test(entry)) : !!reg;
			if (hit) {
				this.hitcount++;
				this.lasthit = Date.now();
			}

			return hit;
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
			return this.children.sort((a, b) => b.name < a.name);
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
		get id()          this.data.id,
		get url()         ((this.data.alternate || 0)[0] || 0).href,
		get sourceTitle() this.data.origin.title,
		get sourceURL()   this.data.origin.streamId.replace(/^[^/]+\//, ''),
		get body()        (this.data.content || this.data.summary || 0).content,
		get author()      this.data.author,
		get recrawled()   this.data.recrawled,
		get published()   this.data.published,
		get updated()     this.data.updated,
		get keywords()    this.data.keywords,
		get unread()      this.data.unread,
		get tags()        this.data.tags.map(tag => tag.label),
	}));

	var Panel = Class(Subject, {
		constructor: function Panel() {
			Panel.$super(this);

			var panel = document.createElement('form');
			panel.classList.add('feedlyng-panel');
			draggable(panel);
			panel.addEventListener('submit', event => {
				event.preventDefault();
				event.stopPropagation();
				this.apply();
			}, false);

			var submit = document.createElement('input');
			submit.type = 'submit';
			submit.style.display = 'none';

			var body = document.createElement('div');
			body.classList.add('feedlyng-panel-body');

			var buttons = document.createElement('div');
			buttons.classList.add('feedlyng-panel-buttons');

			var ok = createGoogButton($str.ok, () => this.apply());
			ok.classList.add('feedlyng-panel-ok');

			var cancel = createGoogButton($str.cancel, () => this.close());
			cancel.classList.add('feedlyng-panel-cancel');

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

			if (!this.emit('showing'))
				return;

			if (!anchorElement || anchorElement.nodeType !== 1)
				anchorElement = null;

			document.body.appendChild(this.dom.element);
			this.snapTo(anchorElement);

			if (anchorElement) {
				let onWindowResize = this.snapTo.bind(this, anchorElement);
				window.addEventListener('resize', onWindowResize, false);
				this.on('hidden', window.removeEventListener.bind(window, 'resize', onWindowResize, false));
			}

			var focused = document.querySelector(':focus');
			if (focused)
				focused.blur();

			var tab = Array.slice(this.dom.element.querySelectorAll(':not(.feedlyng-panel) > :-moz-any(button, input, select, textarea, [tabindex])'))
				.sort((a, b) => (b.tabIndex || 0) < (a.tabIndex || 0))[0];

			if (tab) {
				tab.focus();
				if (tab.select)
					tab.select();
			}

			this.emit('shown');
		},
		apply: function apply() {
			if (this.emit('apply'))
				this.close();
		},
		close: function close() {
			if (!this.opened)
				return;

			if (!this.emit('hiding'))
				return;

			document.adoptNode(this.dom.element);

			this.emit('hidden');
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
			Array.slice(this.dom.body.querySelectorAll('[name]')).forEach((elem) => {
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
				var cd = path.reduce((parent, dirName) => {
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

			var add = createGoogButton($str.add, () => {
				var f = new Filter();
				f.name = $str.new_filter;
				this.on('apply', () => this.filter.appendChild(f));
				this.appendFilter(f);
			});
			add.classList.add('feedlyng-panel-addfilter');
			this.dom.buttons.insertBefore(add, this.dom.buttons.firstChild);

			var paste = createGoogButton($str.paste, () => {
				if (!clipboard.data)
					return;

				var f = new Filter(clipboard.receive());
				this.on('apply', () => this.filter.appendChild(f));
				this.appendFilter(f);
			});
			paste.classList.add('feedlyng-panel-pastefilter');
			if (!clipboard.data)
				paste.classList.add('jfk-button-disabled');

			clipboard.on('copy', onCopy);
			clipboard.on('purge', onPurge);

			function onCopy() {
				paste.classList.remove('jfk-button-disabled');
			}
			function onPurge() {
				paste.classList.add('jfk-button-disabled');
			}

			this.dom.buttons.insertBefore(paste, add.nextSibling);

			this.on('showing', this.initContents);
			this.on('apply', this);
			this.on('hidden', () => {
				clipboard.removeListener('copy', onCopy);
				clipboard.removeListener('purge', onPurge);
			});
		},
		initContents: function initContents() {
			var filter = this.filter;

			var nameTextbox = document.createElement('input');
			nameTextbox.classList.add('feedlyng-panel-name');
			nameTextbox.type = 'text';
			nameTextbox.name = 'name';
			nameTextbox.size = '32';
			nameTextbox.autocomplete = 'off';
			nameTextbox.value = filter.name;

			var terms = document.createElement('fieldset');
			var legend = document.createElement('legend');
			legend.textContent = filter.name + $str.rules;

			var table = document.createElement('table');
			table.classList.add('feedlyng-panel-terms');

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
				textbox.classList.add('feedlyng-panel-terms-textbox');
				textbox.type = 'text';
				textbox.name = 'regexp.' + type + '.source';
				textbox.size = '32';
				textbox.autocomplete = 'off';
				if (type in filter.regexp)
					textbox.value = filter.regexp[type].source.replace(/((?:^|[^\\])(?:\\\\)*)\\(?=\/)/g, '$1');

				let label = createLabel(textbox, labelText);
				label.classList.add('feedlyng-panel-terms-textbox-label');

				let ic = document.createElement('input');
				ic.classList.add('feedlyng-panel-terms-checkbox');
				ic.type = 'checkbox';
				ic.name = 'regexp.' + type + '.ignoreCase';
				if (type in filter.regexp)
					ic.checked = filter.regexp[type].ignoreCase;

				let icl = createLabel(ic, 'i');
				icl.classList.add('feedlyng-panel-terms-checkbox-label');
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
			rules.classList.add('feedlyng-panel-rules');

			terms.appendChild(legend);
			terms.appendChild(table);
			table.appendChild(tbody);
			this.appendContent([nameTextbox, terms, rules]);

			this.dom.rules = rules;
			filter.children.forEach(this.appendFilter, this);
		},
		appendFilter: function appendFilter(filter) {
			var panel;

			var updateRow = () => {
				var title = $str.hit_count + ':\t' + filter.hitcount;
				if (filter.lasthit)
					title += '\n' + $str.last_hit + ':\t' + new Date(filter.lasthit).toLocaleString();

				rule.title = title;
				name.textContent = filter.name;
				count.textContent = filter.children.length || '';
			};
			var onEdit = () => {
				if (panel) {
					panel.close();
					return;
				}
				panel = new FilterListPanel(filter);
				panel.on('shown', () => edit.querySelector('.jfk-button').classList.add('jfk-button-checked'));
				panel.on('hidden', () => {
					edit.querySelector('.jfk-button').classList.remove('jfk-button-checked');
					panel = null;
				});
				panel.on('apply', setTimeout.bind(null, updateRow, 0));
				panel.open(this);
			};
			var onCopy = () => clipboard.setForCopy(filter);
			var onDelete = () => {
				document.adoptNode(rule);
				this.on('apply', () => this.filter.removeChild(filter));
			}

			var rule = document.createElement('div');
			rule.classList.add('feedlyng-panel-rule');
			if (filter.children.length)
				rule.classList.add('parent');

			var name = document.createElement('div');
			name.classList.add('feedlyng-panel-rule-name');
			name.addEventListener('dblclick', onEdit, true);

			var count = document.createElement('div');
			count.classList.add('feedlyng-panel-rule-count');

			var buttons = document.createElement('div');
			buttons.classList.add('feedlyng-panel-rule-buttons');

			var edit = createGoogMenuButton($str.edit, onEdit, [[$str.copy, onCopy], [$str.delete, onDelete]]);
			edit.classList.add('feedlyng-panel-rule-edit');

			updateRow();

			rule.appendChild(name);
			rule.appendChild(count);
			rule.appendChild(buttons);
			buttons.appendChild(edit);
			this.dom.rules.appendChild(rule);
		},
		handleEvent: function handleEvent(event) {
			if (event.type !== 'apply')
				return;

			var data = this.getFormData(true);
			var filter = this.filter;
			filter.name = data.name.value;

			var regexp = {};
			var error = false;
			for (let [type, {source, ignoreCase}] in Iterator(data.regexp)) {
				if (!source.value)
					continue;

				try {
					regexp[type] = RegExp(source.value, ignoreCase.checked ? 'i' : '');
				} catch (e if e instanceof SyntaxError) {
					error = true;
					event.preventDefault();
					source.classList.remove('error');
					source.offsetWidth;
					source.classList.add('error');
				}
			}
			if (error)
				return;

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
		get opened() !!((this.dom || 0).element || 0).parentNode,
		init: function init() {
			var menu = document.createElement('div');
			menu.className = 'feedlyng goog-menu goog-menu-vertical';
			menu.addEventListener('click', this, false);
			this.items.forEach((item) => {
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

	evalInContent($TEXT(() => {/*
		(() => {
			var XHR = XMLHttpRequest;
			var uniqueId = 0;

			XMLHttpRequest = function XMLHttpRequest() {
				var req = new XHR();
				req.open = open;
				req.setRequestHeader = setRequestHeader;
				req.addEventListener('readystatechange', onReadyStateChange, false);
				return req;
			};
			function open(method, url, async) {
				this.__url__ = url;
				return XHR.prototype.open.apply(this, arguments);
			}
			function setRequestHeader(header, value) {
				if (header === 'Authorization')
					this.__auth__ = value;

				return XHR.prototype.setRequestHeader.apply(this, arguments);
			}
			function onReadyStateChange() {
				if (this.readyState < 4 || this.status !== 200)
					return;

				if (!/^\/\/(?:cloud\.)?feedly\.com\/v3\/streams\/contents\b/.test(this.__url__))
					return;

				var pongEventType = 'streamcontentloaded_callback' + uniqueId++;

				var data = JSON.stringify({
					type: pongEventType,
					auth: this.__auth__,
					text: this.responseText,
				});

				try {
					var event = new MessageEvent('streamcontentloaded', {
						bubbles: true,
						cancelable: false,
						data: data,
						origin: location.href,
						source: null,
					});
				} catch (e) {
					var event = document.createEvent('MessageEvent');
					event.initMessageEvent('streamcontentloaded', true, false, data, location.href, '', null);
				}

				var onPong = ({data}) => Object.defineProperty(this, 'responseText', {configurable: true, value: data});
				document.addEventListener(pongEventType, onPong, false);
				document.dispatchEvent(event);
				document.removeEventListener(pongEventType, onPong, false);
			}
		})();
	*/}));

	document.addEventListener('streamcontentloaded', function(event) {
		var {type: pongEventType, auth, text} = JSON.parse(event.data);
		var data = JSON.parse(text);

		var logging = pref.get('logging', true);
		var filter = pref.get('filter');
		var filteredEntryIds = [];
		var hasUnread = false;

		data.items = data.items.filter((item) => {
			var entry = new Entry(item);
			if (!filter.test(entry))
				return true;

			if (logging)
				GM_log('filtered: "' + (entry.title || '') + '" ' + entry.url);

			filteredEntryIds.push(entry.id);
			if (entry.unread)
				hasUnread = true;

			return false;
		});

		if (!filteredEntryIds.length)
			return;

		var data = JSON.stringify(data);
		try {
			var ev = new MessageEvent(pongEventType, {
				bubbles: true,
				cancelable: false,
				data: data,
				origin: location.href,
				source: window,
			});
		} catch (e if e instanceof TypeError) {
			var ev = document.createEvent('MessageEvent');
			ev.initMessageEvent(pongEventType, true, false, data, location.href, '', null);
		}
		document.dispatchEvent(ev);

		if (!hasUnread)
			return;

		sendJSON({
			url: '/v3/markers',
			headers: {
				Authorization: auth,
			},
			data: {
				action: 'markAsRead',
				entryIds: filteredEntryIds,
				type: 'entries',
			},
		});
	}, false);

	var contextmenu = document.createElement('menu');
	contextmenu.type = 'context';
	contextmenu.id = 'feedlyng-contextmenu';
	MenuCommand.contextmenu = contextmenu;

	var rootFilterPanel;
	var settingsMenuItem;
	var clipboard = new DataTransfer();
	var pref = new Preference();
	pref.on('change', function({propertyName, newValue}) {
		switch (propertyName) {
		case 'filter':
			if (!Filter.prototype.isPrototypeOf(newValue))
				this.set('filter', new Filter(newValue));

			break;

		case 'language':
			Locale.select(newValue);
			break;
		}
	});

	document.addEventListener('DOMContentLoaded', () => {
		GM_addStyle(CSS_STYLE_TEXT);

		pref.load();
		pref.autoSave();

		registerMenuCommands();
		addSettingsMenuItem();
	}, false);

	function registerMenuCommands() {
		menuCommand($str.setting + '...', togglePrefPanel);
		menuCommand($str.language + '...', function() {
			var langField = document.createElement('fieldset');

			var title = document.createElement('legend');
			title.textContent = $str.language;

			var select = document.createElement('select');
			Locale.languages.forEach((lang) => {
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
			p.on('apply', () => pref.set('language', select.value));
			p.open();
		});
		menuCommand($str.import_setting + '...', () => pref.importFromFile());
		menuCommand($str.export_setting, () => pref.exportToFile());
	}
	function togglePrefPanel(anchorElement) {
		if (rootFilterPanel) {
			rootFilterPanel.close();
			return;
		}
		rootFilterPanel = new FilterListPanel(pref.get('filter'), true);
		rootFilterPanel.on('apply', () => showMessage($str.ng_setting_modified));
		rootFilterPanel.on('hidden', () => {
			clipboard.purge();
			rootFilterPanel = null;
		});
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

		container.appendChild(button);
		container.appendChild(options);
		options.insertAdjacentHTML('beforeend', '<div class="goog-inline-block goog-flat-menu-button-caption">&nbsp;</div>');
		options.insertAdjacentHTML('beforeend', '<div class="goog-inline-block goog-flat-menu-button-dropdown"></div>');

		new GoogMenu(options, arr);

		return container;
	}
	function showMessage(str, type) {
		if (typeof GM_notification === 'function')
			GM_notification(str);
	}
	function addSettingsMenuItem() {
		var feedlyTabs = document.getElementById('feedlyTabs');
		if (!feedlyTabs) {
			setTimeout(addSettingsMenuItem, 100);
			return;
		}

		var prefListener;
		var observer = new MutationObserver(function mutationCallback() {
			if (!document.getElementById('feedly-ng-filter-setting'))
				pref.removeListener('change', prefListener);

			var prefItem = document.querySelector('#feedlyTabs .tab > .header[data-uri="preferences"]');
			if (!prefItem)
				return;

			var prefItemTab = prefItem.parentNode;

			var tab = document.createElement('div');
			tab.className = 'tab';
			tab.setAttribute('contextmenu', MenuCommand.contextmenu.id);
			tab.addEventListener('click', onNGSettingCommand, false);

			var target = document.createElement('div');
			target.className = 'header target';
			target.innerHTML = '<div class="icon" width="28" height="28" align="top" style="cursor: pointer;"></div>';

			var label = document.createElement('div');
			label.id = 'feedly-ng-filter-setting';
			label.className = 'label';
			label.textContent = $str.ng_setting;

			tab.appendChild(target).appendChild(label);
			prefItemTab.parentNode.insertBefore(tab, prefItemTab.nextSibling);
			document.body.appendChild(contextmenu);

			prefListener = ({propertyName}) => {
				if (propertyName === 'language')
					label.textContent = $str.ng_setting;
			};
			pref.on('change', prefListener);
		});
		observer.observe(feedlyTabs, {
			childList: true,
		});
	}
	function menuCommand(label, fn) {
		return new MenuCommand($str.app_name + ' - ' + label, fn);
	}
	function xhr(details) {
		var opt = Object.create(details);
		var {data} = opt;

		if (!opt.method)
			opt.method = data ? 'POST' : 'GET';

		if (data instanceof Object) {
			opt.data = [pair.map(encodeURIComponent).join('=') for (pair in Iterator(data))].join('&');
			if (!opt.headers)
				opt.headers = {};

			opt.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8';
		}

		setTimeout(GM_xmlhttpRequest, 0, opt);
	}
	function sendJSON(details) {
		var opt = Object.create(details);
		var {data} = opt;
		if (!opt.headers)
			opt.headers = {};

		opt.method = 'POST';
		opt.headers['Content-Type'] = 'application/json; charset=utf-8';
		opt.data = JSON.stringify(data);

		return xhr(opt);
	}
	function evalInContent(code) {
		var script = document.createElement('script');
		script.type = 'text/javascript;version=1.8';
		script.textContent = code;

		try {
			location.href = 'javascript:' + encodeURIComponent(code) + ';void+0';
//			document.adoptNode(document.appendChild(script));
		} catch (e) {
			document.adoptNode(document.documentElement.appendChild(script));
		}
	}
	function openFilePicker(callback, multiple) {
		var canceled = true;
		var input = document.createElement('input');
		input.type = 'file';
		input.multiple = multiple;
		input.addEventListener('change', () => {
			canceled = false;
			callback(Array.slice(input.files));
		}, false);
		input.click();
		if (canceled)
			setTimeout(callback, 0, null);
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
		for (let [key, value] in Iterator(src))
			dst[key] = value;

		return dst;
	}
	function $TEXT(fn) String.replace(fn, /^\(\) => \{\/\*|\*\/}$/g, '');
})();
