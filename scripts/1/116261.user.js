// ==UserScript==
// @name           Firefox ブックマーク振り分け
// @namespace      http://userscripts.org/users/347021
// @version        4.0.1
// @description    [userChromeJS] 新しくブックマークしたとき、URLによって設定したフォルダに振り分ける / Automatically places a newly bookmarked page in the matching folder based on its URL.
// @include        main
// @author         100の人 https://greasyfork.org/users/137-100%E3%81%AE%E4%BA%BA
// @contributor    HADAA
// @license        Creative Commons Attribution 4.0 International Public License; http://creativecommons.org/licenses/by/4.0/
// ==/UserScript==

(function () {
'use strict';

/**
 * L10N
 * @type {LocalizedTexts}
 */
let localizedTexts = {
	'en': {
		'Firefox ブックマーク振り分け': 'Firefox Bookmarks Assigner',
		'振り分け先のフォルダ <%s> は存在しません。': 'The folder <%s> doesn\'t exist.', // %s はフォルダ名をスラッシュ区切りでつなげたルートフォルダからのパス

		// 振り分けルール一覧
		'有効': 'Enabled',
		'URLパターン（大文字小文字同一視）': 'URL Pattern (case-insensitive)',
		'振り分け先のフォルダ': 'Destination folder',
		'未選択': 'not set',
		'フォルダを開閉する': 'Open/close folder',
		'行を削除': 'Delete row',
		'行を追加': 'Add row',
		'キャンセル': 'Cancel',
		'OK': 'OK',

		// URLパターンについて
		'正規表現': 'Regular Expression',
		'ホスト': 'Host',
		'ワイルドカード': 'Wildcard',
		'“/”（スラッシュ）で始まり“/”で終わる場合': 'If it starts with "/" (forward slash) and ends with "/"',
		'正規表現として扱われます。': 'It is interpreted as a regular expression.',
		'ホスト（先頭・末尾がピリオドでない）、またはホストとポート': 'Host (be sure not to begin or end with a period), or host and port',
		'ホスト、またはホストとポートとして扱われます。ホストがIPアドレスでない場合、そのサブドメインにも一致します。': 'Will be treated as host, or host and port. If the host is not in the form of IP address, also include its subdomains.',
		'それ以外': 'Otherwise',
		'ワイルドカード（“*”のみ）を含む文字列として扱われます。': 'It is interpreted as a string containing wildcards ("*" only).',

		// インポートやエクスポート
		'インポートとエクスポート': 'Import and export',
		'エクスポート': 'Export',
		'現在の設定をファイルへエクスポートします。保存していない設定は反映されません。': 'Export current settings to file. Not yet saved settings are not reflected.',
		'インポート': 'Import',
		'現在の設定をすべて削除し、ファイルから設定をインポートします。': 'Delete all settings, then import settings from file.',
		'追加インポート': 'Additional import',
		'ファイルから振り分けルールを追加します。': 'Add assign rules from file.',
		'その他': 'Others',
		'すべての設定を削除': 'Delete all settings',
		'すべての設定を削除し、スクリプトを停止します。': 'Delete all settings, and stop this script.',

		'<%s> へ設定をエクスポートしました。': 'Export to <%s> completed.', // %s はファイルパス
		'「%s」からのインポートに失敗しました。': 'Import from "%s" failed.', // %s はファイル名
		'「%s」からのインポートが完了しました。': 'Import from "%s" completed.', // %s はファイル名
		'インポートした設定を保存するには、「OK」ボタンをクリックしてください。': 'Click "OK" button to save import data.',
		'本当に、『%s』のすべての設定を削除してもよろしいですか？': 'Are you sure you want to delete all settings of "%s" ?', // %s は当スクリプト名
		'設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまたスクリプトが起動します。': 'Completed deleting all settings. If you don\'t delete this script, it will run again when you start your browser next time.',
		'JSON ファイル': 'JSON Files',
		'JSONパースエラーです。': 'JSON parse error occured.',
		'振り分けルールが一つも見つかりませんでした。': 'Not a single assign rule was found.',
	},
};



Cu.import('resource://gre/modules/FileUtils.jsm');
let NativeJSON = Cc['@mozilla.org/dom/json;1'].createInstance(Ci.nsIJSON);
let FileInputStream = Components.Constructor('@mozilla.org/network/file-input-stream;1', 'nsIFileInputStream', 'init');
let FilePicker = Components.Constructor('@mozilla.org/filepicker;1', 'nsIFilePicker', 'init');
let ConverterOutputStream = Components.Constructor('@mozilla.org/intl/converter-output-stream;1', 'nsIConverterOutputStream', 'init');



// i18n
let _, gettext, setlang, setLocalizedTexts;
{
	/**
	 * 翻訳対象文字列 (msgid) の言語。
	 * @constant {string}
	 */
	let ORIGINAL_LOCALE = 'ja';

	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか。
	 * @constant {string}
	 */
	let DEFAULT_LOCALE = 'en';

	/**
	 * 以下のような形式の翻訳リソース。
	 * {
	 *     'IETF言語タグ': {
	 *         '翻訳前 (msgid)': '翻訳後 (msgstr)',
	 *         ……
	 *     },
	 *     ……
	 * }
	 * @typedef {Object} LocalizedTexts
	 */

	/**
	 * クライアントの言語。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let langtag = 'ja';

	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される。
	 * @type {string}
	 * @access private
	 */
	let language = 'ja';

	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される。
	 * @type {LocalizedTexts}
	 * @access private
	 */
	let multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};

	/**
	 * テキストをクライアントの言語に変換する。
	 * @param {string} message - 翻訳前。
	 * @returns {string} 翻訳後。
	 */
	_ = gettext = function (message) {
		// クライアントの言語の翻訳リソースが存在すれば、それを返す
		return langtag in multilingualLocalizedTexts && multilingualLocalizedTexts[langtag][message]
				// 地域下位タグを取り除いた言語タグの翻訳リソースが存在すれば、それを返す
				|| language in multilingualLocalizedTexts && multilingualLocalizedTexts[language][message]
				// デフォルト言語の翻訳リソースが存在すれば、それを返す
				|| DEFAULT_LOCALE in multilingualLocalizedTexts && multilingualLocalizedTexts[DEFAULT_LOCALE][message]
				// そのまま返す
				|| message;
	};

	/**
	 * {@link gettext}から参照されるクライアントの言語を設定する。
	 * @param {string} lang - IETF言語タグ。（「language」と「language-REGION」にのみ対応）
	 */
	setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};

	/**
	 * {@link gettext}から参照される翻訳リソースを追加する。
	 * @param {LocalizedTexts} localizedTexts
	 */
	setLocalizedTexts = function (localizedTexts) {
		var localizedText, lang, language, langtag, msgid;
		for (lang in localizedTexts) {
			localizedText = localizedTexts[lang];
			lang = lang.split('-');
			language = lang[0].toLowerCase();
			langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');

			if (langtag in multilingualLocalizedTexts) {
				// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば上書き）
				for (msgid in localizedText) {
					multilingualLocalizedTexts[langtag][msgid] = localizedText[msgid];
				}
			} else {
				multilingualLocalizedTexts[langtag] = localizedText;
			}

			if (language !== langtag) {
				// 言語タグに地域下位タグが含まれていれば
				// 地域下位タグを取り除いた言語タグも翻訳リソースとして追加する
				if (language in multilingualLocalizedTexts) {
					// すでに該当言語の翻訳リソースが存在すれば、統合する（同じmsgidがあれば無視）
					for (msgid in localizedText) {
						if (!(msgid in multilingualLocalizedTexts[language])) {
							multilingualLocalizedTexts[language][msgid] = localizedText[msgid];
						}
					}
				} else {
					multilingualLocalizedTexts[language] = localizedText;
				}
			}

			// msgidの言語の翻訳リソースを生成
			for (msgid in localizedText) {
				multilingualLocalizedTexts[ORIGINAL_LOCALE][msgid] = msgid;
			}
		}
	};
}

setLocalizedTexts(localizedTexts);

setlang(window.navigator.language);



/**
 * スクリプトの中核。
 */
let BookmarksAssigner = {
	/**
	 * id属性値などに利用する識別子。
	 * @constant {string}
	 */
	ID: 'bookmarks-assigner-347021',

	/**
	 * スクリプト名。
	 * @constant {string}
	 */
	NAME: _('Firefox ブックマーク振り分け'),

	/**
	 * ブックマーク時の親フォルダのIDが、未指定「未整理のブックマーク」「ブックマークメニュー」のいずれかで合った場合に、振り分けを実行する。
	 * @constant {(undefined|number)[]}
	 */
	TARGET_PARENT_IDS: [undefined, Application.bookmarks.unfiled.id, Application.bookmarks.menu.id],

	/**
	 * ウィンドウが開いたときに実行する処理。
	 */
	main: function () {
		let earliestWindow = FUELUtils.getChromeWindow(Application.windows[0]);
		if (earliestWindow !== window && !earliestWindow.document.getElementById(this.ID + '-menuitem')) {
			// 新しいウィンドウを開いたとき、最初に開かれたウィンドウでスクリプトが実行されていなければ
			// 終了
			return;
		}

		ObserverUtils.init(this.ID);
		UninstallObserver.init();
		SettingsObserver.init();

		SettingsScreen.addToMenu();

		if (Application.prefs.has(Version3Settings.PREF_NAME)) {
			// 古い形式の設定が存在すれば
			Version3Settings.addConvertedRules();
		}

		this.generateRegExpMatchesAny();
		this.hookBookmarkCurrentPage();
	},

	/**
	 * 振り替え規則のURLパターンのいずれかにマッチする正規表現。
	 * @type {RegExp}
	 */
	matchesAny: null,

	/**
	 * {@link BookmarksAssigner.matchesAny}のキャプチャ番号とフォルダ名のリストを対応させた配列。
	 * キャプチャ番号は1から始まるため、この配列の0番目は使われない。
	 * @type {Array[]}
	 */
	folderNamesList: [],

	/**
	 * {@link BookmarksAssigner.matchesAny}と{@link BookmarksAssigner.folderNamesList}を更新する。
	 */
	generateRegExpMatchesAny: function () {
		this.folderNamesList = [null];
		let sources = [];
		for (let rule of SettingsUtils.getRules().filter(rule => rule.enabled)) {
			// URLパターンを正規表現文字列に
			let source = SettingsUtils.convertToRegExp(rule.pattern).source;
			sources.push('(' + source + ')');

			// 全体のキャプチャ番号に対応するインデックスにフォルダ名リストを挿入する
			this.folderNamesList.push(rule.folder);
			// キャプチャの数だけインデックスを飛ばす
			for (let i = 0, captureCount = new RegExp('|' + source).exec('').length - 1; i < captureCount; i++) {
				this.folderNamesList.push(null);
			}
		}
		this.matchesAny = new RegExp(sources.join('|'), 'i');
	},

	/**
	 * URLから、振り分け先のフォルダ名リストを取得する。
	 * @param {string} url
	 * @returns {?string[]}
	 */
	getFolderNamesForURL: function (url) {
		let result = this.matchesAny.exec(url);
		// Firefox 24 ESRにはArray#findIndexが実装されていない
		if (result) {
			// 振り分け規則のいずれかのパターンに一致していれば
			for (let i = 1, l = result.length; i < l; i++) {
				if (result[i] !== undefined) {
					// 一致したキャプチャに対応するフォルダ名リストを返す
					return this.folderNamesList[i];
				}
			}
		}
		return null;
	},

	/**
	 * URLから、振り分け先のフォルダIDを取得する。
	 * @param {string} url
	 * @returns {?number}
	 */
	getFolderIdForURL: function (url) {
		let folderNames = this.getFolderNamesForURL(url);
		if (folderNames) {
			// ブックマークされるURLに対応する振り分け規則が存在すれば
			let id = BookmarkFolderUtils.getIdByNameList(folderNames);
			if (id) {
				// 振り分け先のフォルダが存在すれば
				return id;
			} else {
				let folderPath = '/' + folderNames.join('/').replace(folderNames[0], Application.bookmarks[folderNames[0]].title);
				showPopupNotification(_('振り分け先のフォルダ <%s> は存在しません。').replace('%s', folderPath), Application.activeWindow.activeTab, 'warning');
			}
		}
		return null;
	},

	/**
	 * {@link PlacesCommandHook#bookmarkCurrentPage}に関数呼び出し時のプロキシを設定する。
	 */
	hookBookmarkCurrentPage: function () {
		PlacesCommandHook.bookmarkCurrentPage = new Proxy(PlacesCommandHook.bookmarkCurrentPage, {
			apply: (PCH_bookmarkCurrentPage, PlacesCommandHook, argumentList) => {
				if (!UninstallObserver.uninstalled && this.folderNamesList.length > 1
						&& this.TARGET_PARENT_IDS.indexOf(argumentList[1]) !== -1) {
					// 当スクリプトが稼働中、かつ振り分け規則が一つでも存在し、
					// 第2引数(aParent)が振り分け実行対象のフォルダIDなら
					let uri = FUELUtils.getFUELWindow().activeTab.uri;
					if (!PlacesUtils.bookmarks.isBookmarked(uri)) {
						// ブックマークされていないURLなら
						let id = this.getFolderIdForURL(uri.spec);
						if (id) {
							argumentList[1] = id;
						}
					}
				}
				PCH_bookmarkCurrentPage.apply(PlacesCommandHook, argumentList);
			},
		});
	},

	/**
	 * 設定を削除、スクリプトを停止する。
	 */
	uninstall: function () {
		SettingsUtils.deleteAll();
		UninstallObserver.notify();
	},
};



/**
 * 設定の変更が完了したときのオブザーバ。
 */
let SettingsObserver = {
	/**
	 * 通知の種類。
	 * @constant {string}
	 */
	TYPE: 'settingsUpdated',

	/**
	 * オブザーバを登録。
	 */
	init: function () {
		ObserverUtils.register(this.TYPE, this);
	},

	/**
	 * オブザーバ。
	 */
	observe: function () {
		BookmarksAssigner.generateRegExpMatchesAny();
	},

	/**
	 * 通知。
	 */
	notify: function () {
		ObserverUtils.notify(this.TYPE);
	},
};



/**
 * 設定画面。
 */
let SettingsScreen = {
	/*
	 * XUL名前空間。
	 * @constant {string}
	 */
	XUL_NS: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul',

	/**
	 * 設定画面タブのアイコン。
	 * @constant {string}
	 */
	ICON: 'data:image/x-icon;base64,AAABAAEAEBAAAAEAIADiAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAqlJREFUOI2NUWlIVFEYPfe+95zdbTQLS9Emo2jSKI2I6kdEQVF/ogixxVCjpIUWWqBAAqkgojIksIgiItQKpIiEUCqimQpLbZJRK1wox2m2N8285d5+OWgqdP7dyzmHc75DMA1cdU5KJTEfAJjG+or3d7DpuNNi8O1hz8Cbys7/FnxsWE76W8skznX64gQKtXAzV3wX+PPjyQv1vnVi76MV0oeGZWS8JvHouLOSUEHMIJRuT811lpjSsjal5+elQPFi1PN+NOr3P/49HHdTiTfqKv9dtMfNAUAcM6CSRKMjQ1mLd1RfM6bOUKEERMR6CZRh2GfBbs8y7c6YKVR0tIXbLSlCEIA+IQEAfLy1VAwOjhQWl21xm2wSiBYEVD94PIJoQIGrNbgkOU3qWlrpUidVGAPXygVvi/eSY9XMasiyBE0BCFO97sh1R5HxOJnXpo/n038Naq6UMHOKWMQjYQpdAZgOxFVYbcT5r3jCDcZgsdlEg5ms+NkrCz1dvMpIo3LuPOmuaCCrp1puUoJjVaXqM/eS1/e9+1xpybHbJit9eK//YO3TrxsCAHD2Yt3UMwLArgOnpd7ud8KWbWXdjJFGCnZSZRyqphWk2izNETl26syh8idTJmh5cFoqyNYzNm/dOcA5/anrWlYwFHKEgwFy7kiF509MYYJIjtZcvtk+ycD7co84N31k/t71wQpNiQYY08A5zzl/6mCPojB27sKNeqOkGyxJylxw3gkAP16XCxMq/Ppy/ZMlfbbj6SufaTQEOJXa4m9k46fSyqsKADQ11fNgzMxyMlVaOCeAzAVHyYQKuk41gYwmZdtllK4N4PtQMskz9ydmW1MoIiczQq2GEFjcl6iQmFH2eeyCQgSHTcMfn4YkwQo9zhPE8PBnLLJzgKmQ/XLi/y8QmSbXiWe3rgAAAABJRU5ErkJggg==',

	/**
	 * メニューバーの「ブックマーク」に、設定画面を開くオプションを追加。
	 */
	addToMenu: function () {
		let menuItem = document.createElementNS(this.XUL_NS, 'menuitem');
		menuItem.id = BookmarksAssigner.ID + '-menuitem';
		menuItem.setAttribute('label', BookmarksAssigner.NAME);
		menuItem.setAttribute('image', this.ICON);
		menuItem.classList.add('menuitem-iconic');
		menuItem.addEventListener('command', () => this.open());
		// Bug 911477 – Implement DOM4 methods: prepend(), append(), before(), after() and replace() <https://bugzilla.mozilla.org/show_bug.cgi?id=911477>
		let organizeBookmarksSeparator = document.getElementById('organizeBookmarksSeparator');
		organizeBookmarksSeparator.parentNode.insertBefore(menuItem, organizeBookmarksSeparator);
		
		this.blockDetachment();
	},

	/**
	 * 設定画面を開く。
	 */
	open: function () {
		if (this.tab && this.tab.document) {
			// すでに同じウィンドウで開いていれば
			this.tab.focus();
		} else {
			let fuelTab = Application.storage.get(BookmarksAssigner.ID + '_settingsTab', null);
			if (fuelTab) {
				// すでに別にウィンドウで開いていれば
				fuelTab.focus();
				FUELUtils.getChromeWindow(fuelTab.window).focus();
			} else {
				window.test = this.tab = FUELUtils.getFUELWindow().open(NetUtil.newURI('about:blank'));
				this.tab.events.addListener('load', this.show = this.show.bind(this));
				this.tab.focus();
			}
		}
	},

	/**
	 * イベントが発生したタブに設定画面を描画する。
	 * @param {Ci.extIEventItem} event - loadイベント。
	 */
	show: function showSettings(event) {
		if (this.tab.uri.spec !== 'about:blank') {
			// 同じタブで別のページが開かれたら
			this.tab.events.removeListener(event.type, showSettings);
			this.tab = null;
			return;
		}

		let doc = this.tab.document, win = doc.defaultView;

		Application.storage.set(BookmarksAssigner.ID + '_settingsTab', this.tab);
		win.addEventListener('beforeunload', function () {
			Application.storage.set(BookmarksAssigner.ID + '_settingsTab', null);
		});

		this.printStatic();
		BookmarkFolderTree.init(doc);
		doc.addEventListener('click', this);
		doc.addEventListener('change', this);
		doc.addEventListener('submit', this);

		// 設定を表示
		for (let rule of SettingsUtils.getRules()) {
			this.insertRule(rule);
		}

		// 空行を追加
		this.insertRule();
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 */
	handleEvent: function (event) {
		let target = event.target;
		switch (event.type) {
			case 'click':
				switch (target.name) {
					case 'delete':
						// 行の削除
						this.deleteRule(target);
						break;

					case 'add-row':
						// 行の追加
						this.insertRule();
						break;

					case 'up':
					case 'down':
						// 行の移動
						this.moveRule(target.name, target);
						break;

					case 'cancel':
						// キャンセル
						this.close();
						break;

					case 'export':
						// エクスポート
						SettingsUtils.exportToFile(
								this.tab.document.defaultView,
								path => showPopupNotification(_('<%s> へ設定をエクスポートしました。').replace('%s', path), this.tab));
						break;

					case 'import':
						// インポート
						SettingsUtils.importFromFile(this.tab.document.defaultView, (fileName, errorMessage) => {
							if (errorMessage) {
								showPopupNotification(_('「%s」からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, this.tab, 'warning');
							} else {
								this.tab.document.defaultView.location.reload();
								showPopupNotification(_('「%s」からのインポートが完了しました。').replace('%s', fileName), this.tab);
							}
						});
						break;

					case 'additional-import':
						// 追加インポート
						this.addRulesFromFile((fileName, errorMessage) => {
							if (errorMessage) {
								showPopupNotification(_('「%s」からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, this.tab, 'warning');
							} else {
								showPopupNotification(_('「%s」からのインポートが完了しました。').replace('%s', fileName) + '\n'
										+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'), this.tab);
							}
						});
						break;

					case 'uninstall':
						// アンインストール
						if (this.tab,document.defaultView.confirm('本当に、『%s』のすべての設定を削除してもよろしいですか？'.replace('%s', BookmarksAssigner.NAME))) {
							this.close();
							BookmarksAssigner.uninstall();
							showPopupNotification(_('設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまたスクリプトが起動します。'), this.tab);
						}
						break;
				}
				break;

			case 'change':
				switch (target.name) {
					case 'pattern':
						// パターンの種類
						this.showPatternType(target);
						break;

					case 'toggle-folder-tree-show':
						// フォルダツリーの表示・非表示
						if (target.checked) {
							this.showFolderTree(target);
						}
						break;

					default:
						if (target.mozMatchesSelector('.folder-tree [type=radio]')) {
							// フォルダが選択されたとき
							let button = getParentElementByTagName(target, 'td').querySelector('[name=folder]');
							button.textContent = target.parentElement.querySelector('label:last-of-type').textContent;
							button.value = JSON.stringify(BookmarkFolderTree.getFolderNameList(target));
						}
				}
				break;

			case 'submit':
				event.preventDefault();
				this.save();
				this.close();
				break;
		}
	},

	/**
	 * 設定タブ。
	 * @type {Ci.fuelIBrowserTab}
	 * @access protected
	 */
	tab: null,

	/**
	 * ファイルから設定を追加する。
	 * @param {Function} [callback] - 追加が完了したときのコールバック関数。第1引数にファイル名。
	 * @access protected
	 */
	addRulesFromFile: function (callback = function () { }) {
		let doc = this.tab.document;
		SettingsUtils.getRulesFromFile(doc.defaultView, (rules, fileName, errorMessage) => {
			if (errorMessage) {
				callback(fileName, errorMessage);
			} else {
				let lastRule = doc.querySelector('tbody tr:last-of-type');
				let child = lastRule.querySelector('[name=pattern]').value.trim() === '' || lastRule.querySelector('[name=folder]').value === ''
						? lastRule
						: null;
				for (let rule of rules) {
					this.insertRule(rule, child);
				}
				callback(fileName);
			}
		});
	},

	/**
	 * 設定を保存する。
	 * @access protected
	 */
	save: function () {
		let rules = [];
		for (let row of this.tab.document.getElementsByTagName('tbody')[0].rows) {
			let pattern = row.querySelector('[name=pattern]').value.trim();
			let folder = row.querySelector('[name=folder]').value;
			if (pattern && folder) {
				rules.push({
					enabled: row.querySelector('[name=enabled]').checked,
					pattern: pattern,
					folder: folder,
				});
			}
		}
		ArrayPrefUtils.setAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', rules);
		SettingsObserver.notify();
	},

	/**
	 * 設定画面を閉じる。
	 * @access protected
	 */
	close: function () {
		let fuelWindow = this.tab.window;
		if (fuelWindow.tabs.length === 1) {
			// 設定画面以外のタブが存在しなければ
			if (Application.windows.length === 1) {
				// 他にウィンドウが存在しなければ、ホームページに移動する
				let homePage = gHomeButton.getHomePage();
				this.tab.document.defaultView.location.assign(homePage === 'about:blank' ? 'about:home' : homePage);
			} else {
				FUELUtils.getChromeWindow(this.tab.window).close();
			}
		} else {
			this.tab.close();
		}
	},

	/**
	 * 行を移動する。
	 * @param {string} direction - 上に移動するなら"up"、下に移動するなら"down"。
	 * @param {HTMLButtonElement} button - 移動ボタン。
	 * @access protected
	 */
	moveRule: function (direction, button) {
		let row = getParentElementByTagName(button, 'tr');
		row.parentElement.insertBefore(row, row[(direction === 'up' ? 'previous' : 'next') + 'ElementSibling']);
	},

	/**
	 * 行を削除する。
	 * @param {HTMLButtonElement} deleteButton - 削除ボタン。
	 * @access protected
	 */
	deleteRule: function (deleteButton) {
		getParentElementByTagName(deleteButton, 'tr').remove();
	},

	/**
	 * 指定された位置に行を挿入する。
	 * @param {object} [rule] - 指定しなかった場合は空行を挿入する。
	 * @param {HTMLTableRowElement} [child] - 指定しなかった場合は表本体の末尾に追加する。
	 * @access protected
	 */
	insertRule: function (rule = null, child = null) {
		let tbody = this.tab.document.getElementsByTagName('tbody')[0];
		let row = tbody.querySelector('tbody > template').content.cloneNode(true);

		let enabled = row.querySelector('[name=enabled]');

		let patternTextBox = row.querySelector('[name=pattern]');
		patternTextBox.id = Math.random();
		patternTextBox.nextElementSibling.htmlFor.add(patternTextBox.id);

		let checkbox = row.querySelector('[name=toggle-folder-tree-show]');
		checkbox.id = Math.random();
		let folderButton = row.querySelector('[name=folder]');
		folderButton.parentElement.htmlFor = checkbox.id;

		tbody.insertBefore(row, child);

		if (rule) {
			// 有効
			enabled.checked = rule.enabled;
			// URLパターン
			patternTextBox.value = rule.pattern;
			this.showPatternType(patternTextBox);
			// フォルダ
			folderButton.value = JSON.stringify(rule.folder);
			// ボタンの表示
			folderButton.textContent = rule.folder.length === 1
					? Application.bookmarks[rule.folder[0]].title
					: rule.folder[rule.folder.length - 1];
		}
	},

	/**
	 * URLパターンがどの種類の文字列として認識されているか表示する。
	 * @param {HTMLInputElement} input
	 * @access protected
	 */
	showPatternType: function (input) {
		let output = this.tab.document.querySelector('output[for~="' + input.id + '"]');
		if (input.value) {
			switch (SettingsUtils.getPatternType(input.value)) {
				case 'regexp':
					output.value = _('正規表現');
					break;
				case 'domain':
				case 'ipaddr':
					output.value = _('ホスト');
					break;
				case 'wildcard':
					output.value = _('ワイルドカード');
					break;
			}
		} else {
			output.value = '';
		}
	},

	/**
	 * フォルダツリー内のフォルダノードの選択を、ボタンに反映する。
	 * @param {HTMLInputElement} radioButton - 選択されたフォルダ。
	 * @access protected
	 */
	reflectSelectingFolder: function (radioButton) {
		let button = getParentElementByTagName(radioButton, 'td').getElementsByTagName('button')[0];
		button.value = JSON.stringify(BookmarkFolderTree.getFolderNameList(radioButton));
		button.textContent = radioButton.parentElement.querySelector('label:last-of-type').textContent;
	},

	/**
	 * フォルダツリーを表示する。
	 * @param {HTMLInputElement} checkbox - 表示状態を保持するチェックボックス。
	 * @access protected
	 */
	showFolderTree: function (currentCheckbox) {
		let cell = currentCheckbox.parentElement;

		// 他の行のツリーを非表示に
		for (let checkbox of currentCheckbox.form.querySelectorAll('[name=toggle-folder-tree-show]:checked')) {
			if (checkbox !== currentCheckbox) {
				checkbox.checked = false;
			}
		}

		if (!cell.getElementsByClassName('folder-tree')[0]) {
			// フォルダツリーが未作成なら
			let ol = cell.appendChild(BookmarkFolderTree.createRootNode());
			let value = cell.querySelector('[name=folder]').value;
			if (value) {
				// フォルダを選択する
				BookmarkFolderTree.selectDeepFolder(ol, JSON.parse(value));
			}
		}
	},

	/**
	 * 設定画面の静的部分を描画。
	 * @access protected
	 */
	printStatic: function () {
		let doc = this.tab.document;

		// Favicon
		let link = doc.createElement('link');
		link.rel = 'icon';
		link.href = this.ICON;
		doc.head.appendChild(link);

		// タイトル
		doc.title = BookmarksAssigner.NAME;

		// スタイルシート
		let styleSheet = doc.head.appendChild(doc.createElement('style')).sheet;
		let cssRules = styleSheet.cssRules;
		// Bug 906353 – Add support for css4 selector :matches(), the standard of :-moz-any(). <https://bugzilla.mozilla.org/show_bug.cgi?id=906353>
		[
			':root {'
					+ 'height: 100%;'
					+ 'color: -moz-DialogText;'
					+ 'background: -moz-Dialog;'
					+ '}',

			// 表全体、および各行
			'table {'
					+ 'border-collapse: collapse;'
					+ 'width: 100%;'
					+ '}',
			'thead {'
					// 表全体を囲む枠線
					+ 'border-top: solid 1px gray;'
					+ 'border-left: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ '}',
			'tbody {'
					// 表全体を囲む枠線
					+ 'border-left: solid 1px gray;'
					+ 'border-bottom: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ '}',

			'thead th {'
					// ヘッダ行の各セル
					+ '-moz-appearance: treeheadercell;'
					+ 'font-weight: normal;'
					+ '}',
			'tbody > tr {'
					// 奇数行の背景色
					+ 'background: whitesmoke;'
					+ '}',
			'tbody > tr:nth-of-type(2n) {'
					// 偶数行の背景色
					+ 'background: gainsboro;'
					+ '}',

			'tbody tr:hover {'
					// マウスが載っている行
					+ 'box-shadow: 0 0 0.5em lightblue, inset 0 0 0.3em lightblue;'
					+ '}',

			// 列：有効・無効選択ボックス
			'colgroup.enabled {'
					+ 'width: 4em;'
					+ '}',
			'td.enabled {'
					+ 'text-align: center;'
					+ 'height: 100%;'
					+ '}',
			'td.enabled label {'
					+ 'display: block;'
					+ 'height: 100%;'
					+ '}',

			// 列：振り分け先フォルダ選択ボタン
			'colgroup.folder {'
					+ 'width: 40%;'
					+ '}',

			// 列：各種操作
			'colgroup.operation {'
					+ 'width: 8em;'
					+ '}',
			'td.operation {'
					+ 'text-align: right;'
					+ '}',

			// 各セル
			'th, td {'
					+ 'padding: 3px;'
					+ '}',
			'td {'
					// 内容を上寄せ
					+ 'vertical-align: top;'
					+ '}',

			// URLパターン
			'td.pattern {'
					+ 'display: flex;'
					+ '}',
			'[name=pattern] {'
					+ 'flex-grow: 1;'
					+ '}',
			'[name=pattern] ~ output {'
					+ 'display: inline-block;'
					+ 'width: 10em;'
					+ 'background: lightsteelblue;'
					+ 'text-align: center;'
					+ '}',

			// 行を移動するボタン
			'[name=up],' +
			'[name=bottom] {'
					+ 'font-weight: bold;'
					+ 'padding: 0.3em 0.5em;'
					+ 'border: solid 1px gray;'
					+ 'border-radius: 0.3em;'
					+ 'background: linear-gradient(whitesmoke, gainsboro);'
					+ 'position: relative;'
					+ '}',
			'[name=up]:hover,' +
			'[name=up]:focus,' +
			'[name=bottom]:hover,' +
			'[name=bottom]:focus {'
					+ 'background: linear-gradient(aliceblue, lavender);'
					+ '}',
			'[name=up]:active,' +
			'[name=bottom]:active {'
					+ 'background: linear-gradient(lavender, aliceblue);'
					+ '}',

			'tr:not(:last-of-type) > td > [name=up] {'
					// 上へ移動
					+ 'border-bottom-right-radius: 0;'
					+ '}',
			'[name=up] {'
					+ 'color: darkblue;'
					+ 'left: 1px;'
					+ 'top: -0.2em;'
					+ '}',
			'tr:not(:first-of-type) > td > [name=bottom] {'
					// 下へ移動
					+ 'border-top-left-radius: 0;'
					+ '}',
			'[name=bottom] {'
					+ 'color: darkred;'
					+ 'top: 0.1em;'
					+ '}',

			'tr:first-of-type [name=up],' +
			'tr:last-of-type [name=bottom] {'
					// 一番上の行では上へ移動ボタンは表示しない、一番下の行では下へ移動ボタンは表示しない
					+ 'visibility: hidden;'
					+ '}',

			// 行の削除ボタン
			'[name=delete] {'
					+ 'border: none;'
					+ '-moz-box-sizing: initial;'
					+ 'box-sizing: unset;'
					+ 'width: 16px;'
					+ 'height: 16px;'
					+ 'overflow: hidden;'
					+ 'text-indent: 30px;'
					+ 'white-space: nowrap;'
					+ 'background: url(resource://gre/chrome/toolkit/skin/classic/global/icons/close.png) content-box;'
					+ 'padding: 0.4em;'
					+ 'margin-left: 1em;'
					+ '}',
			'[name=delete]:hover,' +
			'[name=delete]:focus {'
					+ 'background-position: -16px 0;'
					+ '}',
			'[name=delete]:active {'
					+ 'background-position: -32px 0;'
					+ '}',
			'tr:only-of-type [name=delete] {'
					// 行が一つだけなら、削除ボタンは表示しない
					+ 'visibility: hidden;'
					+ '}',

			// フォルダアイコン
			'[name=folder]::before,' +
			'.folder-tree label:last-of-type::before {'
					+ 'content: "";'
					+ 'display: inline-block;'
					+ 'width: 16px;'
					+ 'height: 16px;'
					+ 'background: url(resource://gre/chrome/toolkit/skin/classic/global/icons/folder-item.png) 16px 0;'
					+ 'margin-right: 0.2em;'
					+ '}',
			'[name=folder][value="[\\"menu\\"]"]::before,' +
			'.folder-tree > li > [value=menu] ~ label:last-of-type::before {'
					// ブックマークメニュー
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/bookmarksMenu.png);'
					+ '}',
			'[name=folder][value="[\\"toolbar\\"]"]::before,' +
			'.folder-tree > li > [value=toolbar] ~ label:last-of-type::before {'
					// ブックマークツールバー
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/bookmarksToolbar.png);'
					+ '}',
			'[name=folder][value="[\\"unfiled\\"]"]::before,' +
			'.folder-tree > li > [value=unfiled] ~ label:last-of-type::before {'
					// 未整理のブックマーク
					+ 'background: url(resource:///chrome/browser/skin/classic/browser/places/unsortedBookmarks.png);'
					+ '}',

			// 行の追加ボタン
			'tfoot td {'
					+ 'padding: 0;'
					+ '}',
			'[name=add-row]::before {'
					+ 'content: url(resource:///chrome/browser/skin/classic/browser/tabbrowser/newtab.png);'
					+ 'margin-right: 0.5em;'
					+ 'vertical-align: -4px;'
					+ '}',
			'[name=add-row] {'
					+ 'border-top: none;'
					+ 'border-left: solid 1px gray;'
					+ 'border-bottom: solid 1px gray;'
					+ 'border-right: solid 1px gray;'
					+ 'border-radius: 0 0 0.2em 0.2em;'
					+ 'background: linear-gradient(lightgrey, silver);'
					+ 'position: relative;'
					+ 'top: -1px;'
					+ 'left: -1px;'
					+ '}',
			'[name="add-row"]:not([disabled]):hover,' +
			'[name="add-row"]:not([disabled]):focus,' +
			'[name="add-row"]:not([disabled]):active {'
					+ 'background: gainsboro;'
					+ '}',

			// フォルダツリーを閉じているとき
			'[name=toggle-folder-tree-show]:not(:checked) ~ ol {'
					+ 'display: none;'
					+ '}',
			'[name=toggle-folder-tree-show] {'
					// チェックボックスを非表示
					+ 'display: none;'
					+ '}',

			// 未選択のフォルダ
			'[name=folder]:not([value]),' +
			'[name=folder][value=""] {'
					+ 'color: gray;'
					+ 'font-style: oblique;'
					+ '}',
			'[name=folder]:not([value])::before,' +
			'[name=folder][value=""]::before {'
					+ 'display: none;'
					+ '}',

			// キャンセル・OKボタン
			'#submit-buttons {'
					+ 'text-align: right;'
					+ '}',
			'#submit-buttons button {'
					+ 'margin-left: 1em;'
					+ '}',
			'button:not([type]), button[type=submit] {'
					+ 'font-size: 2em;'
					+ '}',

			// パターンについて
			'#about dl {'
					+ 'float: left;'
					+ '}',
			'#about dt {'
					+ 'float: left;'
					+ 'background: burlywood;'
					+ 'padding: 0.1em;'
					+ '}',
			'#about dd {'
					+ 'clear: both;'
					+ 'border: solid burlywood;'
					+ 'border-width: 0 0 0.2em 0.4em;'
					+ 'padding: 0.3em 1em 0 0.2em;'
					+ 'margin-bottom: 0.7em;'
					+ '}',
			'#about::after {'
					+ 'content: "";'
					+ 'display: block;'
					+ 'clear: both;'
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});

		let row, cell, input, checkbox, label, select, option, menu, button, img, div, label, section, kbd, key, li, dl;

		let form = doc.createElement('form');
		let table = doc.createElement('table');
		if(!('createTBody' in table)){
			// Firefox 24 ESR
			table.createTBody = function () {
				var tBodies = this.tBodies;
				var tBodiesLength = tBodies.length;
				return this.insertBefore(doc.createElement('tbody'), tBodiesLength > 0 ? tBodies[tBodiesLength - 1].nextSibling : null);
			}
		}

		// 見出し
		let thead = table.createTHead();
		let headRow = thead.insertRow();

		// 本体
		let tbody = table.createTBody();
		let template = doc.createElement('template');
		row = doc.createElement('tr');

		// 有効
		headRow.appendChild(doc.createElement('th')).textContent = _('有効');
		cell = row.insertCell();
		label = doc.createElement('label');
		checkbox = doc.createElement('input');
		checkbox.name = 'enabled';
		checkbox.type = 'checkbox';
		checkbox.defaultChecked = true;
		label.appendChild(checkbox);
		cell.appendChild(label);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(checkbox.name);
		cell.classList.add(checkbox.name);

		// URLパターン
		headRow.appendChild(doc.createElement('th')).textContent = _('URLパターン（大文字小文字同一視）');
		cell = row.insertCell();
		input = doc.createElement('input');
		input.name = 'pattern';
		cell.appendChild(input);

		let output = doc.createElement('output');
		cell.appendChild(output);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(input.name);
		cell.classList.add(input.name);

		// フォルダ
		headRow.appendChild(doc.createElement('th')).textContent = _('振り分け先のフォルダ');
		cell = row.insertCell();
		cell.classList.add('folder');

		checkbox = doc.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.name = 'toggle-folder-tree-show';
		cell.appendChild(checkbox);

		label = doc.createElement('label');
		button = doc.createElement('button');
		button.type = 'button';
		button.name = 'folder';
		button.textContent = _('未選択');
		label.appendChild(button);
		cell.appendChild(label);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add(button.name);
		cell.classList.add(button.name);

		// 各種操作ボタン
		headRow.appendChild(doc.createElement('th'));
		cell = row.insertCell();

		button = doc.createElement('button');
		button.name = 'up';
		button.type = 'button';
		button.textContent = '↑';
		cell.appendChild(button);

		button = doc.createElement('button');
		button.name = 'bottom';
		button.type = 'button';
		button.textContent = '↓';
		cell.appendChild(button);

		button = doc.createElement('button');
		button.name = 'delete';
		button.type = 'button';
		button.textContent = button.title = _('行を削除');
		cell.appendChild(button);

		table.insertBefore(doc.createElement('colgroup'), thead).classList.add('operation');
		cell.classList.add('operation');

		template.content.appendChild(row);
		tbody.appendChild(template);

		// 行追加ボタン
		let tfoot = table.createTFoot();
		let cell = tfoot.insertRow().insertCell();
		cell.colSpan = row.cells.length;
		button = doc.createElement('button');
		button.name = 'add-row';
		button.type = 'button';
		button.textContent = _('行を追加');
		cell.appendChild(button);

		form.appendChild(table);

		div = doc.createElement('div');
		div.id = 'submit-buttons';

		// キャンセルボタン
		button = doc.createElement('button');
		button.name = 'cancel';
		button.type = 'button';
		button.textContent = _('キャンセル');
		div.appendChild(button);

		// OKボタン
		button = doc.createElement('button');
		button.name = 'ok';
		button.textContent = _('OK');
		div.appendChild(button);

		form.appendChild(div);
		doc.body.appendChild(form);

		// パターンについて
		section = doc.createElement('section');
		section.id = 'about';
		let dl = doc.createElement('dl');
		dl.appendChild(doc.createElement('dt')).textContent = _('“/”（スラッシュ）で始まり“/”で終わる場合');
		dl.appendChild(doc.createElement('dd')).textContent = _('正規表現として扱われます。');
		dl.appendChild(doc.createElement('dt')).textContent = _('ホスト（先頭・末尾がピリオドでない）、またはホストとポート');
		dl.appendChild(doc.createElement('dd')).textContent = _('ホスト、またはホストとポートとして扱われます。ホストがIPアドレスでない場合、そのサブドメインにも一致します。');
		dl.appendChild(doc.createElement('dt')).textContent = _('それ以外');
		dl.appendChild(doc.createElement('dd')).textContent = _('ワイルドカード（“*”のみ）を含む文字列として扱われます。');
		section.appendChild(dl);
		doc.body.appendChild(section);

		// インポートとエクスポート
		section = doc.createElement('section');
		section.appendChild(doc.createElement('h1')).textContent = _('インポートとエクスポート');
		dl = doc.createElement('dl');

		button = doc.createElement('button');
		button.name = 'export';
		button.type = 'button';
		button.textContent = _('エクスポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('現在の設定をファイルへエクスポートします。保存していない設定は反映されません。');

		button = doc.createElement('button');
		button.name = 'import';
		button.type = 'button';
		button.textContent = _('インポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('現在の設定をすべて削除し、ファイルから設定をインポートします。');

		button = doc.createElement('button');
		button.name = 'additional-import';
		button.type = 'button';
		button.textContent = _('追加インポート');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('ファイルから振り分けルールを追加します。');

		section.appendChild(dl);
		doc.body.appendChild(section);

		// アンインストール
		section = doc.createElement('section');
		section.appendChild(doc.createElement('h1')).textContent = _('その他');
		let dl = doc.createElement('dl');

		button = doc.createElement('button');
		button.name = 'uninstall';
		button.type = 'button';
		button.textContent = _('すべての設定を削除');
		dl.appendChild(doc.createElement('dt')).appendChild(button);
		dl.appendChild(doc.createElement('dd')).textContent = _('すべての設定を削除し、スクリプトを停止します。');

		section.appendChild(dl);
		doc.body.appendChild(section);
	},

	/**
	 * 設定画面タブを切り離せないようにする。
	 * @access protected
	 */
	blockDetachment: function () {
		gBrowser.swapBrowsersAndCloseOther = new Proxy(gBrowser.swapBrowsersAndCloseOther, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && !this.tab) {
					// アンインストール済みでなく、同じウィンドウで設定画面が開いていなければ
					let settingsTab = Application.storage.get(BookmarksAssigner.ID + '_settingsTab', null);
					if (settingsTab) {
						// 別のウィンドウで設定画面が開いていれば
						let [blankTab, targetTab] = argumentList;
						if (targetTab.linkedBrowser.contentDocument === settingsTab.document) {
							// 設定画面タブが移動されて来ようとしていれば
							if (tabbrowser.tabs.length === 1) {
								window.close();
							} else {
								tabbrowser.removeTab(blankTab);
							}
							return;
						}
					}
				}
				func.apply(tabbrowser, argumentList);
			},
		});

		gBrowser.duplicateTab = new Proxy(gBrowser.duplicateTab, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
				// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let [tab] = argumentList;
					if (tab.linkedBrowser.contentDocument === this.tab.document) {
						// 設定画面タブが複製されようとしていれば
						return tab;
					}
				}
				return func.apply(tabbrowser, argumentList);
			},
		});

		gBrowser.moveTabTo = new Proxy(gBrowser.moveTabTo, {
			apply: (func, tabbrowser, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
					// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let [tab, index] = argumentList;
					if (tab.linkedBrowser.contentDocument === this.tab.document && tab.ownerGlobal !== window) {
						// 設定画面タブが移動されようとしていれば
						return;
					}
				}
				func.apply(tabbrowser, argumentList);
			},
		});

		PlacesControllerDragHelper.onDrop = new Proxy(PlacesControllerDragHelper.onDrop, {
			apply: (func, helper, argumentList) => {
				if (!UninstallObserver.uninstalled && this.tab) {
					// アンインストール済みでない、かつ同じウィンドウで設定画面が開いていれば
					let [insertionPoint, dataTransfer] = argumentList;
					let tab = dataTransfer.mozGetDataAt('application/x-moz-tabbrowser-tab', 0);
					if (tab && tab.linkedBrowser.contentDocument === this.tab.document) {
						// 設定画面タブがドロップされようとしていれば
						return;
					}
				}
				func.apply(helper, argumentList);
			},
		});
	},
};



/**
 * 指定した局所名を持つ直近の親を返す。
 * @param {Node} childNode
 * @param {string} localName
 * @returns {?Element}
 */
let getParentElementByTagName = (function () {
	let _localName;
	let treeWalkers = new WeakMap();
	return function (childNode, localName) {
		if (childNode.localName === localName) {
			return childNode;
		} else {
			let doc = childNode.ownerDocument;
			let treeWalker = treeWalkers.get(doc);
			if (!treeWalker) {
				treeWalker = doc.createTreeWalker(doc, NodeFilter.SHOW_ELEMENT, function (node) {
					return node.localName === _localName ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
				});
				treeWalkers.set(doc, treeWalker);
			}
			_localName = localName;
			treeWalker.currentNode = childNode;
			return treeWalker.parentNode();
		}
	};
})();



/**
 * prefs.jsなどの設定を読み書きする。
 */
let SettingsUtils = {
	/**
	 * 設定を保存するブランチ名。（末尾にピリオドを含む）
	 * @constant {string}
	 */
	ROOT_BRANCH_NAME: 'extensions.' + BookmarksAssigner.ID + '.',

	/**
	 * [Encoding Standard]{@link http://encoding.spec.whatwg.org/}が要求する標準の文字符号化方式。
	 * @constant {string}
	 */
	THE_ENCODING: 'UTF-8',

	/**
	 * すべての設定を削除する。
	 */
	deleteAll: function () {
		gPrefService.getBranch(this.ROOT_BRANCH_NAME).deleteBranch('');
	},

	/**
	 * ファイルに設定をエクスポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - 保存が完了したときのコールバック関数。第1引数にファイルのフルパス。
	 */
	exportToFile: function (win, callback = function () { }) {
		// ファイル保存ダイアログを開く
		let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeSave);
		filePicker.appendFilter(_('JSON ファイル'), '*.json');
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.defaultString = BookmarksAssigner.ID + '.json';
		filePicker.open(result => {
			if (result === Ci.nsIFilePicker.returnOK || result === Ci.nsIFilePicker.returnReplace) {
				// 「保存」ボタンが押されていれば
				let stream = FileUtils.openSafeFileOutputStream(filePicker.file);
				let converterOutputStream = new ConverterOutputStream(stream, this.THE_ENCODING, 0, 0x0000);
				converterOutputStream.writeString(JSON.stringify({
					rules: ArrayPrefUtils.getAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.').map(function (rule) {
						rule.folder = JSON.parse(rule.folder);
						return rule;
					}),
				}, null, '\t'));
				FileUtils.closeSafeFileOutputStream(stream);
				converterOutputStream.close();
				callback(filePicker.file.path);
			}
		});
	},

	/**
	 * ファイルから設定をインポートする。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} [callback] - インポートが成功、または失敗したときのコールバック関数。第1引数にファイル名。インポートに失敗していれば、第2引数にエラーメッセージ。
	 */
	importFromFile: function (win, callback = function () { }) {
		this.getRulesFromFile(win, (rules, fileName, errorMessage) => {
			if (errorMessage) {
				callback(fileName, errorMessage);
			} else {
				ArrayPrefUtils.setAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', rules.map(function (rule) {
					rule.folder = JSON.stringify(rule.folder);
					return rule;
				}));
				SettingsObserver.notify();
				callback(fileName);
			}
		});
	},

	/**
	 * ファイル選択ダイアログを表示し、選択されたJSONファイルのルールを返す。
	 * @param {Window} win - ダイアログの親となるウィンドウ。
	 * @param {Function} callback - 第1引数にルールリスト、第2引数にファイル名。エラーが起こった場合は、第3引数にエラーメッセージ。
	 */
	getRulesFromFile: function (win, callback) {
		let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
		filePicker.appendFilter(_('JSON ファイル'), '*.json');
		filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
		filePicker.open((result) => {
			if (result === Ci.nsIFilePicker.returnOK) {
				let rules = [], errorMessage;
				let file = filePicker.file;
				let stream = new FileInputStream(file, -1, -1, 0);
				try {
					let settings = NativeJSON.decodeFromStream(stream, -1);
					if (settings && Array.isArray(settings.rules)) {
						rules = settings.rules.filter(rule => this.isValid(rule));
					}
				} catch (e) {
					if (e instanceof SyntaxError) {
						errorMessage = _('JSONパースエラーです。') + '\n' + e.message;
					} else {
						throw e;
					}
				} finally {
					FileUtils.closeSafeFileOutputStream(stream);
				}

				if (rules.length === 0) {
					errorMessage = _('振り分けルールが一つも見つかりませんでした。');
				}

				if (errorMessage) {
					callback(null, file.leafName, errorMessage);
				} else {
					callback(rules, file.leafName);
				}
			}
		});
	},

	/**
	 * パターンの種類を表す文字列を返す。
	 * @param {string} pattern
	 * @returns {string} regexp, domain, ipaddr, wildcard のいずれか。
	 */
	getPatternType: function (pattern) {
		let type;
		let result = /^\/(.+)\/$/.exec(pattern);
		if (result) {
			try {
				new RegExp(result[1]);
				type = 'regexp';
			} catch (e) {
				if (!(e instanceof SyntaxError)) {
					throw e;
				}
			}
		}
		return type || getHostType(pattern) || 'wildcard';
	},

	/**
	 * URLパターンを正規表現インスタンスに変換する。
	 * @param {string} pattern
	 * @returns {RegExp}
	 * @see [JavaScript の正規表現のメタ文字をエスケープ](http://subtech.g.hatena.ne.jp/cho45/20090513/1242199703 "JavaScript の正規表現のメタ文字をエスケープ - 冬通りに消え行く制服ガールは✖夢物語にリアルを求めない。 - subtech")
	 */
	convertToRegExp: function (pattern) {
		let source;
		let patternType = this.getPatternType(pattern);
		switch (patternType) {
			case 'regexp':
				source = pattern.replace(/^\/(.+)\/$/, '$1');
				break;
			case 'domain':
			case 'ipaddr':
				source = '^[-+.a-z]+://' + (patternType === 'domain' ? '(?:(?!-)[-0-9a-z]*[0-9a-z]\\.)*' : '') + pattern.replace(/[\s\S]/g, function (_) {
					return '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1);
				}) + '/';
				break;
			case 'wildcard':
				source = '^' + pattern.replace(/[\s\S]/g, function (_) {
					return _ === '*' ? '.*' : '\\u' + (0x10000 + _.charCodeAt(0)).toString(16).slice(1);
				}) + '$';
				break;
		}
		return new RegExp(source, 'i');
	},

	/**
	 * prefs.jsからルールを取得する。
	 * @returns {Object[]}
	 */
	getRules: function () {
		return ArrayPrefUtils.getAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.').map(function (rule) {
			rule.folder = JSON.parse(rule.folder);
			return rule;
		});
	},

	/**
	 * 与えられた振り分けルールが有効なものか検査する。
	 * @param {Object} rule
	 * @returns	{boolean}
	 * @access protected
	 */
	isValid: function (rule) {
		return typeof rule === 'object' && rule !== null
				&& typeof rule.enabled === 'boolean'
				&& typeof rule.pattern === 'string' && rule.pattern.trim() !== ''
				&& Array.isArray(rule.folder) && rule.folder.every(name => typeof name === 'string' && name !== '');
	},
};



/**
 * ブックマークフォルダを選択するためのツリーを描画する。
 */
let BookmarkFolderTree = {
	/**
	 * 文書作成時に実行する処理。
	 * @param {Document} doc - フォルダツリーを挿入する文書。
	 */
	init: function (doc) {
		this.document = doc;

		// キャッシュを削除
		BookmarkFolderUtils.reset();

		this.setStyleSheet();
		this.document.addEventListener('change', this);
	},

	/**
	 * フォルダ名のリストを取得する。
	 * @param {HTMLInputElement} radioButton - 選択されたフォルダ。
	 * @returns {string[]}
	 */
	getFolderNameList: function (radioButton) {
		let root = this.getRootNode(radioButton);
		let names = [];
		for (let li = radioButton.parentElement; root.contains(li); li = li.parentElement.parentElement) {
			names.unshift(li.getElementsByTagName('input')[0].value);
		}
		return names;
	},

	/**
	 * ルートからフォルダを開いていき、目的のフォルダを選択する。
	 * @param {HTMLOListElement} root
	 * @param {string[]} names
	 */
	selectDeepFolder: function (root, names) {
		let ol = root;
		for (let i = 0, l = names.length; i < l; i++) {
			let matchedItem;

			// 子フォルダを走査する。
			for (let li of ol.children) {
				let radioButton = li.getElementsByTagName('input')[0];
				if (radioButton.value === names[i]) {
					matchedItem = li;
					break;
				}
			}

			if (matchedItem) {
				// 一致するフォルダが存在すれば
				if (i + i === l) {
					// フォルダ名リストの末尾なら
					matchedItem.getElementsByTagName('input')[0].click();
				} else {
					let checkbox = matchedItem.querySelector('[name=toggle-open]');
					if (checkbox) {
						// 一致するフォルダに子フォルダが存在すれば
						// フォルダを開いて子フォルダを表示する
						checkbox.checked = true;
						ol = this.openFolder(checkbox);
					} else {
						// フォルダを選択する
						matchedItem.querySelector('[type=radio]').click();
						break;
					}
				}
			} else {
				// 一致するフォルダが存在しなければ、親フォルダを選択する
				ol.parentElement.querySelector('[type=radio]').click();
				break;
			}
		}
	},

	/**
	 * ルート直下のフォルダを含むルートノードを作成する。
	 * @returns {HTMLOListElement}
	 */
	createRootNode: function () {
		let ol = this.document.createElement('ol');
		ol.classList.add('folder-tree');

		// 属性名リストを取得
		let rootNames = BookmarkFolderUtils.getRootNames();

		let name = String(Math.random());
		for (let folder of BookmarkFolderUtils.getChildren()) {
			if (folder.id === Application.bookmarks.tags.id) {
				// 「タグ」フォルダなら除外
				continue;
			}
			let li = this.createFolderTreeNode(folder, name);

			// フォルダを表す属性名を設定
			li.querySelector('[type=radio]').value = rootNames[folder.id];

			ol.appendChild(li);
		}
		return ol;
	},

	/**
	 * フォルダツリーを挿入する文書。
	 * @type {?Document}
	 * @access protected
	 */
	document: null,

	/**
	 * 文書にスタイルシートを設定する。
	 * @access protected
	 */
	setStyleSheet: function () {
		let aero = ['Win32', 'Win64'].indexOf(window.navigator.platform) !== -1;

		let styleSheet = this.document.head.appendChild(this.document.createElement('style')).sheet;
		let cssRules = styleSheet.cssRules;
		[
			'.folder-tree {'
					+ 'background: whitesmoke;'
					+ 'border: solid 1px darkgray;'
					+ 'padding: 0.5em;'
					+ '}',

			// 各フォルダのリストマーカー、チェックボックス、及びラジオボタンの非表示
			'.folder-tree,' +
			'.folder-tree ol {'
					+ 'list-style: none;'
					+ 'padding-left: 1em;'
					+ '}',
			'.folder-tree input {'
					+ 'display: none;'
					+ '}',

			// フォルダ
			'.folder-tree label:last-of-type {'
					+ 'display: block;'
					+ 'padding: 0.2em;'
					+ 'border-radius: 0.2em;'
					+ 'border: solid 1px transparent;'
					+ '}',
			'.folder-tree label:last-of-type:hover {'
					// マウスが重なっているフォルダ
					+ 'border-color: lightblue;'
					+ 'background: linear-gradient(aliceblue, lavender);'
					+ '}',
			'.folder-tree [type=radio]:checked ~ label:last-of-type {'
					// 選択中のフォルダ
					+ 'border-color: cornflowerblue;'
					+ 'background: linear-gradient(lavender, lightsteelblue);'
					+ '}',

			// 開閉ボタン
			'.folder-tree [name=toggle-open] + label {'
					+ 'display: inline-block;'
					+ 'width: 9px;'
					+ 'height: 9px;'
					+ 'line-height: 9px;'
					+ 'padding: 4px;'
					+ 'overflow: hidden;'
					+ 'white-space: nowrap;'
					+ 'position: absolute;'
					+ 'left: -17px;'
					+ 'top: 3px;'
					+ '}',
			'.folder-tree li {'
					+ 'position: relative;'
					+ '}',

			// フォルダを閉じているとき
			'.folder-tree [name=toggle-open]:not(:checked) ~ ol {'
					+ 'display: none;'
					+ '}',
			'.folder-tree [name=toggle-open] + label::before {'
					+ 'content: url(resource://gre/chrome/toolkit/skin/classic' + (aero ? '/aero' : '') + '/global/tree/twisty-clsd.png);'
					+ 'margin-right: 4px;'
					+ '}',
			'.folder-tree [name=toggle-open] + label:hover::before {'
					+ (aero ? 'content: url(resource://gre/chrome/toolkit/skin/classic/aero/global/tree/twisty-clsd-hover.png);' : '')
					+ '}',

			// フォルダを開いているとき
			'.folder-tree [name=toggle-open]:checked + label::before {'
					+ 'content: url(resource://gre/chrome/toolkit/skin/classic' + (aero ? '/aero' : '') + '/global/tree/twisty-open.png);'
					+ '}',
			'.folder-tree [name=toggle-open]:checked + label:hover::before {'
					+ (aero ? 'content: url(resource://gre/chrome/toolkit/skin/classic/aero/global/tree/twisty-open-hover.png);' : '')
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});
	},

	/**
	 * イベントハンドラ。
	 * @param {Event} event
	 * @access protected
	 */
	handleEvent: function (event) {
		let target = event.target;
		switch (event.type) {
			case 'change':
				if (target.name === 'toggle-open') {
					this.toggleOpen(target);
				}
				break;
		}
	},

	/**
	 * 指定した要素を含むツリーを返す。
	 * @param {Node} childNode
	 * @returns {?HTMLOListElement}
	 * @access protected
	 */
	getRootNode: (function () {
		let treeWalker;
		return function (childNode) {
			if (!treeWalker || treeWalker.root !== this.document) {
				treeWalker = this.document.createTreeWalker(this.document, NodeFilter.SHOW_ELEMENT, function (element) {
					return element.classList.contains('folder-tree') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
				});
			}
			treeWalker.currentNode = childNode;
			return treeWalker.parentNode();
		};
	})(),

	/**
	 * フォルダが開いたときに{@link BookmarkFolderTree.openFolder}、閉じたときに{@link BookmarkFolderTree.closeFolder}を実行する。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @access protected
	 */
	toggleOpen: function (checkbox) {
		if (checkbox.checked) {
			this.openFolder(checkbox);
		} else {
			this.closeFolder(checkbox);
		}
	},

	/**
	 * フォルダを開いて子フォルダを表示する。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @returns {HTMLOListElement}
	 * @access protected
	 */
	openFolder: function (checkbox) {
		let parent = checkbox.parentElement;
		let ol = parent.getElementsByTagName('ol')[0];
		if (!ol) {
			ol = parent.appendChild(this.document.createElement('ol'));
			let name = parent.getElementsByTagName('input')[0].name;
			for (let folder of BookmarkFolderUtils.getChildren(checkbox.value)) {
				ol.appendChild(this.createFolderTreeNode(folder, name));
			}
		}
		return ol;
	},

	/**
	 * フォルダを閉じて子フォルダを隠す。
	 * @param {HTMLInputElement} checkbox - フォルダ開閉状態を表すチェックボックス。
	 * @access protected
	 */
	closeFolder: function (checkbox) {
		let parent = checkbox.parentElement;
		if (parent.querySelector('ol :checked')) {
			// 閉じられたフォルダツリー内に選択されているフォルダがあれば
			parent.getElementsByTagName('input')[0].click();
		}
	},

	/**
	 * フォルダからli要素を作成する。
	 * @param {Ci.fuelIBookmarkFolder} folder
	 * @param {string} name - ラジオボタンのname属性値。
	 * @returns {HTMLLIElement}
	 * @access protected
	 */
	createFolderTreeNode: function (folder, name) {
		let li = this.document.createElement('li');

		// フォルダノードを表すラジオボタン
		let radioButton = this.document.createElement('input');
		radioButton.type = 'radio';
		radioButton.value = folder.title;
		radioButton.name = name;
		li.appendChild(radioButton);

		if (BookmarkFolderUtils.getChildren(folder).length > 0) {
			// 子フォルダが存在すれば、開閉ボタンを表示する
			let checkbox = this.document.createElement('input');
			checkbox.type = 'checkbox';
			checkbox.name = 'toggle-open';
			checkbox.value = folder.id;
			li.appendChild(checkbox);

			checkbox.id = Math.random();
			let label = this.document.createElement('label');
			label.textContent = _('フォルダを開閉する');
			label.htmlFor = checkbox.id;
			li.appendChild(label);
		}

		// ラベル
		radioButton.id = Math.random();
		let label = this.document.createElement('label');
		label.textContent = folder.title;
		label.htmlFor = radioButton.id;
		li.appendChild(label);

		return li;
	},
}



/**
 * ブックマークフォルダに関する情報を取得する。
 */
let BookmarkFolderUtils = {
	/**
	 * 名前リストを使ってフォルダ階層を下に辿り、フォルダIDを取得する。
	 * @param {string[]} names - 最初の要素は{@link Ci.fuelIBookmarkRoots}のプロパティ名。
	 * @returns {?number}
	 */
	getIdByNameList: function (names) {
		let folder;
		for (let name of names) {
			if (folder) {
				folder = this.getChildByName(name, folder);
			} else {
				// 名前リストの最初の要素なら
				folder = Application.bookmarks[name];
			}
			if (!folder) {
				return null;
			}
		}
		return folder.id;
	},

	/**
	 * キャッシュを削除する。
	 */
	reset: function () {
		BookmarkFolderUtils.childrenList = {};
	},

	/**
	 * 子フォルダのリストを取得する。
	 * @param {Ci.fuelIBookmarkFolder|number} [parent] - 親フォルダ、またはそのID。省略した場合はルートフォルダの子フォルダを返す。
	 * @returns {?Ci.fuelIBookmarkFolder[]} IDを指定した場合、それがキャッシュしていない親フォルダならnullを返す。
	 */
	getChildren: function (parent = PlacesUtils.bookmarks.placesRoot) {
		let parentId = parent.id || parent;
		if (!(parentId in this.childrenList)) {
			// 未取得なら
			if (parentId !== parent) {
				// 親フォルダの指定がIDでなければ
				this.childrenList[parentId] = parent.children.filter(bookmark => bookmark.type === 'folder' && !bookmark.annotations.has('placesInternal/READ_ONLY'));
			} else if (parentId === PlacesUtils.bookmarks.placesRoot) {
				// ルートフォルダなら
				let folders = [];
				for (let key in Application.bookmarks) {
					let bookmark = Application.bookmarks[key];
					if (bookmark.type === 'folder') {
						folders.push(bookmark);
					}
				}
				this.childrenList[parentId] = folders;
			}
		}
		return this.childrenList[parentId] || null;
	},

	/**
	 * {Ci.fuelIBookmarkRoots}のプロパティ名のリストを取得する。
	 * @returns {Object} キーがフォルダID、値がプロパティ名。
	 */
	getRootNames: function () {
		let rootNames = {};
		for (let key in Application.bookmarks) {
			if (key !== 'QueryInterface') {
				rootNames[Application.bookmarks[key].id] = key;
			}
		}
		return rootNames;
	},

	/**
	 * キーにフォルダID、値に{@link Ci.fuelIBookmarkFolder[]}をもつ。
	 * @type {Object}
	 * @access protected
	 */
	childrenList: {},

	/**
	 * 名前から子フォルダを取得する。
	 * @param {string} name
	 * @param {Ci.fuelIBookmarkFolder} parent - 親フォルダ。
	 * @returns {?Ci.fuelIBookmarkFolder}
	 * @access protected
	 */
	getChildByName: function (name, parent) {
		// Firefox 24 ESRにはArray#findが実装されていない
		for (let child of parent.children) {
			if (child.type === 'folder' && child.title === name) {
				// フォルダ、かつ検索するフォルダ名と一致したら
				return child;
			}
		}
		return null;
	},
};



/**
 * バージョン3の設定値。
 */
let Version3Settings = window.Version3Settings = {
	/**
	 * prefs.jsの設定名。
	 * @constant {string}
	 */
	PREF_NAME: 'extensions.userchromejs.place-star-button-switcher-347021',

	/**
	 * prefs.jsから古い形式のデータを削除し、新しい形式で保存し直す。
	 */
	addConvertedRules: function () {
		let newSettings = this.getAll().map(oldRule => {
			let newSetting = this.convertToCurrentSettings(oldRule);
			newSetting.folder = JSON.stringify(newSetting.folder);
			return newSetting;
		});
		ArrayPrefUtils.addAll(SettingsUtils.ROOT_BRANCH_NAME + 'rules.', newSettings);
		this.clear();
	},

	/**
	 * 振り分けルールを新しい形式に変換する。
	 * @param {object[]} oldRule
	 * @returns {object}
	 * @access protected
	 */
	convertToCurrentSettings: function (oldRule) {
		let oldPattern = oldRule.URI.trim();
		let newPattern = oldPattern;
		switch (oldRule.condition) {
			case 'domain':
				// ドメイン名（後方一致）
				let host = oldPattern.replace(/^[./]*(.+)[./]*$/, '$1');
				if (getHostType(host)) {
					newPattern = host.toLowerCase();
				}
				break;
			case 'prefix':
			case 'wildcard':
				// 前方一致
				// ワイルドカード（前方一致）
				if (!getHostType(oldPattern) && !oldPattern.startsWith('/')) {
					newPattern = oldPattern + (oldPattern.endsWith('*') ? '' : '*');
				}
				break;
			case 'regexp':
				// 正規表現
				try {
					new RegExp(oldPattern);
					newPattern = '/' + oldPattern + '/';
				} catch (e) { }
				break;
		}

		return {
			pattern: newPattern,
			folder: this.searchBookmarkFolderForName(oldRule.folder) || ['menu', oldRule.folder],
		};
	},

	/**
	 * フォルダ名からブックマークフォルダのパスを取得する。
	 * @param {string} name
	 * @returns	{?string[]} 最初の要素は{@link Ci.fuelIBookmarkRoots}のプロパティ名。
	 * @access protected
	 */
	searchBookmarkFolderForName: function (name) {
		let allFolders = {};
		let unvisitedFolderParents = [PlacesUtils.bookmarks.placesRoot];
		while (unvisitedFolderParents.length > 0) {
			for (let folder of BookmarkFolderUtils.getChildren(unvisitedFolderParents.shift())) {
				allFolders[folder.id] = folder;
				if (folder.title === name) {
					let rootNames = BookmarkFolderUtils.getRootNames();
					let names = [];
					for (let folderId = folder.id ; folderId; folderId = folder.parent) {
						folder = allFolders[folderId];
						names.unshift(rootNames[folderId] || folder.title);
					}
					return names;
				} else {
					unvisitedFolderParents.push(folder);
				}
			}
		}
		return null;
	},

	/**
	 * JSON形式の設定値を配列に変換する。
	 * @param {string} jsonString
	 * @returns	{object[]}
	 * @access protected
	 */
	convertToObject: function (jsonString) {
		let settings;
		try {
			settings = JSON.parse(jsonString);
		} catch (e) {
			if (!(e instanceof SyntaxError)) {
				throw e;
			}
		}
		return Array.isArray(settings) ? settings.filter(this.isValid) : [];
	},

	/**
	 * 与えられた振り分けルールが有効なものか簡易的に検査する。
	 * @param {Object} oldRule
	 * @returns	{boolean}
	 * @access protected
	 */
	isValid: function (oldRule) {
		return typeof oldRule === 'object' && oldRule !== null
				&& typeof oldRule.URI === 'string' && oldRule.URI.trim() !== ''
				&& typeof oldRule.condition === 'string' && ['domain', 'prefix', 'wildcard', 'regexp'].indexOf(oldRule.condition) !== -1
				&& typeof oldRule.folder === 'string' && oldRule.folder !== '';
	},

	/**
	 * prefs.jsから全設定値を取得する。
	 * @returns	{object[]}
	 * @access protected
	 */
	getAll: function () {
		return this.convertToObject(Application.prefs.getValue(this.PREF_NAME, '[]'));
	},

	/**
	 * prefs.jsから削除する。
	 * @access protected
	 */
	clear: function () {
		gPrefService.clearUserPref(this.PREF_NAME);
	},
};



/**
 * アンインストール時に実行する処理。
 */
let UninstallObserver = {
	/**
	 * 通知の種類。
	 * @constant {string}
	 */
	TYPE: 'uninstall',

	/**
	 * スクリプトが停止していれば真。
	 * @type {booelan}
	 */
	uninstalled: false,

	/**
	 * オブザーバを登録。
	 */
	init: function () {
		ObserverUtils.register(this.TYPE, this);
	},

	/**
	 * オブザーバ。
	 */
	observe: function () {
		this.uninstalled = true;
		document.getElementById(BookmarksAssigner.ID + '-menuitem').remove();
	},

	/**
	 * 通知。
	 */
	notify: function () {
		ObserverUtils.notify(this.TYPE);
	},
};



/**
 * ホスト、またはホストとポートを表す文字列である可能性が高い場合に、ホストの種類を返す。
 * @param {string} host
 * @returns {?string} 'domain' と 'ipaddr' のどちらか。
 */
function getHostType(host) {
	try {
		NetUtil.newURI('http://' + host);
		let result = /^(?:((?!-)[-0-9a-z]*[0-9a-z](?:\.(?!-)[-0-9a-z]*[0-9a-z])*)|(\[[:0-9a-f]+])|([0-9]{1,3}(?:\.[0-9]{1,3}){3}))(?::[1-9][0-9]{,4})?$/i.exec(host);
		if (result) {
			// Firefox 24 ESRにはArray#findIndexが実装されていない
			for (let i = 1, l = result.length; i < l; i++) {
				if (result[i] !== undefined) {
					switch (i) {
						case 1:
						case 2:
							return 'domain';
						case 3:
							return 'ipaddr';
					}
				}
			}
		}
	} catch (e) {
		if (e.result !== Cr.NS_ERROR_MALFORMED_URI) {
			throw e;
		}
	}
	return null;
}



/**
 * オブザーバサービスを利用して、各ウィンドウと通知を送受信する。
 * @version 2014-05-10
 */
let ObserverUtils = {
	/**
	 * オブザーバを追加する。
	 * @param {string} id - 当スクリプトに関する通知のID。
	 */
	init: function (id) {
		this.id = id;
		Services.obs.addObserver(this, this.id, false);
		window.addEventListener('unload', () => {
			Services.obs.removeObserver(this, this.id);
		});
	},

	/**
	 * 通知を受け取る関数を登録する。同じtypeの場合は上書きされる。
	 * @param {string} type
	 * @param {object} observer - observeメソッドを持つオブジェクト。
	 */
	register: function (type, observer) {
		this.observers[type] = observer;
	},

	/**
	 * 通知。
	 * @param {string} type
	 * @param {*} [data]
	 */
	notify: function (type, data = null) {
		Services.obs.notifyObservers(data, this.id, type);
	},

	/**
	 * オブザーバのリスト。
	 * @type {Object}
	 * @access protected
	 */
	observers: {},

	/**
	 * 当スクリプトに関する通知のID。
	 * @type {string}
	 * @access protected
	 */
	id: null,

	/**
	 * 通知を受け取るメソッド。
	 * @param {*} subject
	 * @param {string} topic
	 * @param {string} data
	 * @access protected
	 */
	observe: function (subject, topic, data) {
		if (data in this.observers) {
			// 対応するオブザーバが存在すれば
			this.observers[data].observe(subject);
		}
	},
};



/**
 * prefs.jsについて、オブジェクトの配列を取り扱う。
 * @version 2014-05-10
 */
let ArrayPrefUtils = {
	/**
	 * すべての要素を取得する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @returns {Object[]}
	 */
	getAll: function (branchName) {
		let objects = [];
		let branch = gPrefService.getBranch(branchName);
		for (let prefName of branch.getChildList('')) {
			let [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index)) {
				if (!(index in objects)) {
					objects[index] = {};
				}
				objects[index][property] = Application.prefs.getValue(branchName + prefName, null);
			} else {
				// 壊れた設定なら、削除する
				branch.clearUserPref(prefName);
			}
		}
		return objects;
	},

	/**
	 * 保存されている設定をすべて削除して置き換える。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object[]} objects
	 */
	setAll: function (branchName, objects) {
		let oldLength = this.getLength(branchName);
		objects.forEach((object, index) => {
			this.add(branchName, object, index);
		});

		let branch = gPrefService.getBranch(branchName);
		for (let i = objects.length; i < oldLength; i++) {
			branch.deleteBranch(i + '.');
		}
	},

	/**
	 * 複数の設定を追加する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object[]} objects
	 */
	addAll: function (branchName, objects) {
		let oldLength = this.getLength(branchName);
		objects.forEach((object, index) => {
			this.add(branchName, object, oldLength + index);
		});
	},

	/**
	 * 設定を追加する。
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @param {Object} object
	 * @param {string} [index]
	 */
	add: function (branchName, object, index = this.getLength(branchName)) {
		let root = branchName + index + '.';
		for (let key in object) {
			Application.prefs.setValue(root + key, object[key]);
		}
	},

	/**
	 * 保存されている要素数を取得する。（歯抜けインデックスを含む）
	 * @param {!string} branchName - ブランチ名。末尾にドットが必要。
	 * @returns {number}
	 * @access protected
	 */
	getLength: function (branchName) {
		let indexes = [];
		let branch = gPrefService.getBranch(branchName);
		for (let prefName of branch.getChildList('')) {
			let [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index)) {
				indexes.push(index);
			} else {
				// 壊れた設定なら、削除する
				branch.clearUserPref(prefName);
			}
		}
		return indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
	},
};



/**
 * FUELオブジェクトとDOMオブジェクトの変換等を行う。
 * @version 2014-05-10
 */
let FUELUtils = {
	/**
	 * 対応するFUELウィンドウを取得する。
	 * @param {ChromeWindow} [win=window]
	 * @returns {?Ci.fuelIWindow}
	 */
	getFUELWindow: function (win = window) {
		// Firefox 24 ESRにはArray#findが実装されていない
		for (let fuelWindow of Application.windows) {
			if (this.getChromeWindow(fuelWindow) === win) {
				return fuelWindow;
			}
		}
		return null;
	},

	/**
	 * 対応するChromeウィンドウを取得する。
	 * @param {Ci.fuelIWindow} fuelWindow
	 * @returns {ChromeWindow}
	 */
	getChromeWindow: function (fuelWindow) {
		return fuelWindow._window || fuelWindow.tabs[0].window._window;
	},

	/**
	 * 対応するbrowser要素を取得する。
	 * @param {Ci.fuelIBrowserTab} fuelTab
	 * @returns {XULElement} browser要素。
	 */
	getBrowserElement: function (fuelTab) {
		return fuelTab._browser || fuelTab.window.tabs[fuelTab.index]._browser;
	},

	/**
	 * すべてのウィンドウから、指定した文書に対応するFUELブラウザタブを捜す。
	 * @param {Document} doc
	 * @returns {?Ci.fuelIBrowserTab}
	 */
	getFUELTab: function (doc) {
		for (let fuelWindow of Application.windows) {
			let index = this.getChromeWindow(fuelWindow).gBrowser.getBrowserIndexForDocument(doc);
			if (index !== -1) {
				return fuelWindow.tabs[index];
			}
		}
		return null;
	},

	/**
	 * 確実に開いている最前面のウィンドウを返す。
	 * @returns {Ci.fuelIWindow}
	 */
	getActiveFUELWindow: function () {
		let activeFUELWindow = Application.activeWindow;
		let activeChromeWindow = this.getChromeWindow(activeFUELWindow);
		if (activeChromeWindow.closed) {
			// {@link Ci.extIApplication#activeWindow}が既に閉じているウィンドウを返した場合
			// 別ウィンドウを最前面にしてそれを返す
			// Firefox 24 ESRにはArray#findIndexが実装されていない
			for (let fuelWindow of Application.windows) {
				let chromeWindow = this.getChromeWindow(fuelWindow);
				if (chromeWindow !== activeChromeWindow) {
					activeFUELWindow = fuelWindow;
					chromeWindow.focus();
					break;
				}
			}
		}
		return activeFUELWindow;
	}
};



/**
 * ポップアップ通知を表示する。
 * @param {string} message - 表示するメッセージ。
 * @param {Ci.fuelIBrowserTab} tab - メッセージを表示するタブ。
 * @param {string} [type=information] - メッセージの前に表示するアイコンの種類。"information"、"warning"、"error"、"question" のいずれか。
 * @version 2014-05-10
 */
function showPopupNotification(message, tab, type = 'information') {
	if (FUELUtils.getChromeWindow(tab.window).closed) {
		// 指定されたタブを含むウィンドウが既に閉じていれば、別ウィンドウの最前面のタブを取得
		tab = FUELUtils.getActiveFUELWindow().activeTab;
	} else if (tab.index === -1) {
		// 指定されたタブが既に閉じていれば、最前面のタブを取得
		tab = tab.window.activeTab;
	}
	FUELUtils.getChromeWindow(tab.window).PopupNotifications.show(FUELUtils.getBrowserElement(tab), BookmarksAssigner.ID, message, null, null, null, {
		persistWhileVisible: true,
		removeOnDismissal: true,
		popupIconURL: 'chrome://global/skin/icons/' + type + '-64.png',
	});
}



BookmarksAssigner.main();



})();
