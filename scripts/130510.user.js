// ==UserScript==
// @name           Drag & DropZones +
// @namespace      https://userscripts.org/users/347021
// @version        2.0.0
// @description    選択した文字列などをドラッグし、ページ上に表示される半透明の枠内にドロップすることで、Web検索などを実行する / Drag selected character strings or image and drop to the semitransparent box displayed on web page to open search result.
// @include        main
// @author         100の人 https://userscripts.org/users/347021
// @contributor    HADAA
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

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



// L10N
setLocalizedTexts({
	'en': {
		'検索エンジン名': 'Search engine name',
		'他と重複しないエンジン名を入力してください。': 'Please input search engine names without repetition.',
		'URL・POSTパラメータ': 'URL, POST parameters',
		'POSTパラメータの設定': 'Setting POST parameters',
		'名前': 'name',
		'値': 'value',
		'メソッド': 'Method',
		'データの種類': 'Data type',
		'文字列': 'String',
		'画像': 'Image',
		'音声': 'Audio',
		'文字符号化方式': 'Character encoding scheme',
		'キャンセル': 'Cancel',
		'OK': 'OK',

		'行を追加': 'Add row',
		'行を削除': 'Delete row',
		'上に新しい行を挿入': 'Insert new row above',
		'下に新しい行を挿入': 'Insert new row below',
		'上に新しい行を挿入します。': 'Insert new row above.',
		'下に新しい行を挿入します。': 'Insert new row below.',
		'上の行に移動します。': 'Move focus to above row.',
		'下の行に移動します。': 'Move focus to below row.',
		'行をドラッグ & ドロップで、順番を変更できます。': 'Drag and drop row to change order.',

		'アイコンボタンのポップアップメニューから、アイコンを変更できます。検索窓のエンジンのアイコンは変更できません。':
			'You can change icon via the icon button pop-up menu. You cannot modify the search engine icon in the search bar.',
		'アイコンを変更': 'Modify icon',
		'元のアイコンに戻す': 'Restore to default icon',
		'ローカルファイルからアイコンを設定': 'Set icon from local file',
		'画像ファイルを選択してください。': 'Please choose image file.',
		'Webページ、または画像ファイルのURLからアイコンを設定': 'Set icon by URL of Web page or image file',
		'Webページ、または画像ファイルのURLを入力してください。': 'Please input URL of Web page or image file.',
		'アイコンの設定に失敗しました。約 %s KiB までの画像を設定できます。': 'Setting icon failed. Image up to about %s KiB can be set.',
		'クリップボードのURL、または画像データからアイコンを設定': 'Set icon by URL or image data on clipboard',
		'クリップボードからデータを取得できませんでした。': 'Could not get data from clipboard.',
		'指定されたURLに接続できませんでした。': 'Connection to specified URL failed.',
		'http:// などで始まるURLを入力してください。': 'Specify URL starting with "http://" etc.',
		'アイコンを取得できませんでした。WebページのURLであれば、一度ブラウザでページを表示してみてください。':
			'Could not get icon. If you have input a URL of a Web page, please open that page in your browser once.',
		'アイコンを一括取得': 'Collectively get icons',
		'アイコン未取得の検索エンジンについて、URLを基にアイコンを取得します。アイコンボタンのポップアップメニューの「元のアイコンに戻す」から、個別に取得することもできます。':
			'Get icons from URL for search engines without an icon. You can choose "Restore to default icon" from the icon button pop-up menu to get individual ones.',
		'アイコンの取得が完了しました。': 'Completed getting icons.',

		'検索窓のエンジンの追加': 'Add engine in Search Bar',
		'選択してください': 'Choose',
		'検索結果を開く場所': 'Where to open search result',
		'現在のタブ。Ctrl、Shiftキーを押していれば、それぞれ新しいタブ、ウィンドウ': 'Current tab. If Ctrl or Shift key is pressed, it will open in a new tab or window, respectively',
		'新しいタブ': 'New tab',
		'新しいウィンドウ': 'New window',
		'検索窓に新しい検索エンジンが追加されたとき、自動的にドロップゾーンとしても追加する。（※すでに同名のユーザー定義エンジンが存在した場合は何もしない）':
			'When new engine is added to Search Bar, a dropzone will also be automatically created. (* Does nothing if a user defined engine with the same name already exists)',
		'テキスト入力欄のキーボードショートカット': 'Keyboard Shortcuts in input box',
		'または': 'or',

		'インポートとエクスポート': 'Import and export',
		'インポート': 'Import',
		'現在の設定をすべて削除し、XMLファイルから設定をインポートします。ブラウザの検索エンジンサービスに同名の検索エンジンが存在する場合は、そちらを優先します。':
			'Delete all settings, then import settings from XML file. If the browser search service with the same name already exists, the existing one takes priority.',
		'%s からのインポートに失敗しました。': 'Import from "%s" failed.', // %sはファイル名
		'XMLパースエラーです。': 'XML parse error occured.',
		'検索エンジンが一つも見つかりませんでした。': 'Not even one search engine was found.',
		'%s からのインポートが完了しました。': 'Import from "%s" completed.', // %sはファイル名
		'エクスポート': 'Export',
		'現在の設定をファイルへエクスポートします。保存していない設定は反映されません。': 'Export current settings to file. Not yet saved settings are not reflected.',
		'%s へ設定をエクスポートしました。': 'Export to "%s" completed.', // %sはファイルパス
		'追加インポート': 'Additional import',
		'XMLファイルから検索エンジンを追加します。同名の検索エンジンがすでに存在する場合は上書きします。':
			'Add search engine from XML file. If a search engine with the same name already exists, overwrite it.',
		'インポートした設定を保存するには、「OK」ボタンをクリックしてください。': 'Click "OK" button to save import data.',
		'JSON文字列から追加インポート': 'Additional import from JSON string',
		'本スクリプトのバージョン1でエクスポートしたJSON文字列から、検索エンジンを追加します。':
			'Add search engine from JSON string exported by version 1 of this script.',
		'JSON文字列を貼り付けてください。': 'Please paste JSON string.',
		'JSON文字列からのインポートに失敗しました。': 'Import from JSON string failed.',
		'JSONパースエラーです。': 'JSON parse error occured.',
		'JSON文字列からのインポートが完了しました。': 'Import form JSON string completed.',

		'その他': 'Others',
		'設定を初期化': 'Initialize the settings',
		'すべての設定を削除し、初回起動時の状態に戻します。': 'Delete all settings, then restore to first starting state.',
		'本当に、『%s』のすべての設定を削除してもよろしいですか？':
			'Are you sure you want to delete all settings of "%s" ?', // %sは当スクリプト名
		'設定の初期化が完了しました。': 'Settings initialization completed.',
		'すべての設定を削除': 'Delete all settings',
		'すべての設定を削除し、スクリプトを停止します。': 'Delete all settings, and stop this script.',
		'設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまた設定が作成されます。':
			'Completed deleting all settings. If you don\'t delete this script, settings will be created again when you start your browser next time.',

		'Google 画像で検索': 'Google search by image',
	},
});



Cu.import('resource://gre/modules/FileUtils.jsm');

let ScriptableUnicodeConverter = Cc['@mozilla.org/intl/scriptableunicodeconverter'].createInstance(Ci.nsIScriptableUnicodeConverter);
let NativeJSON = Cc['@mozilla.org/dom/json;1'].createInstance(Ci.nsIJSON);
let DOMSerializer = Cc['@mozilla.org/xmlextras/xmlserializer;1'].createInstance(Ci.nsIDOMSerializer);

let TextToSubURI = Cc['@mozilla.org/intl/texttosuburi;1'].getService(Ci.nsITextToSubURI);
let MIMEService = Cc['@mozilla.org/mime;1'].getService(Ci.nsIMIMEService);
let FaviconService = Cc['@mozilla.org/browser/favicon-service;1'].getService(Ci.nsIFaviconService);
let ImgTools = Cc['@mozilla.org/image/tools;1'].getService(Ci.imgITools);

let StringInputStream = Components.Constructor('@mozilla.org/io/string-input-stream;1', 'nsIStringInputStream', 'setData');
let MultiplexInputStream = Components.Constructor('@mozilla.org/io/multiplex-input-stream;1', 'nsIMultiplexInputStream');
let MIMEInputStream = Components.Constructor('@mozilla.org/network/mime-input-stream;1', 'nsIMIMEInputStream');
let ArrayBufferInputStream = Components.Constructor('@mozilla.org/io/arraybuffer-input-stream;1', 'nsIArrayBufferInputStream', 'setData');
let FileInputStream = Components.Constructor('@mozilla.org/network/file-input-stream;1', 'nsIFileInputStream', 'init');
let BinaryInputStream = Components.Constructor('@mozilla.org/binaryinputstream;1', 'nsIBinaryInputStream', 'setInputStream');
let FilePicker = Components.Constructor('@mozilla.org/filepicker;1', 'nsIFilePicker', 'init');
let Transferable = Components.Constructor('@mozilla.org/widget/transferable;1', 'nsITransferable', 'addDataFlavor');

const NS_ERROR_UCONV_NOCONV = 0x80500001;
const SEARCH_ENGINE_TOPIC = 'browser-search-engine-modified';
const SEARCH_ENGINE_REMOVED = 'engine-removed';
const SEARCH_ENGINE_CHNAGED = 'engine-changed';
const SEARCH_ENGINE_ADDED = 'engine-added';

// getBrowserSelectionの150文字制限を回避
let getBrowserSelection = eval('(' + window.getBrowserSelection.toString().replace(/(kMaxSelectionLen = )[0-9]+/, '$1Number.POSITIVE_INFINITY') + ')');



/**
 * id属性値などに利用する識別子。
 * @type {string}
 */
const ID = 'drag-and-drop-search-347021';

/**
 * エクスポートするXMLファイルで使用する名前空間。
 * @type {string}
 */
const NS = 'https://userscripts.org/scripts/show/130510';

/**
 * スクリプト名。
 * @type {string}
 */
const NAME = 'Drag & DropZones +';

/**
 * 設定画面を開くコマンドを表す要素のアイコンなどに利用するURL。
 * @type {string}
 */
const MENUITEM_ICON = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAACSVBMVEX////////////////////////////////////////////////r8PTu8vby9fju8fbw8/f09vn////////////////////8/f38/v79/v6kvdSkvtelyeClyeK0x9q0yd210eW10ebE1OPE1eXF3OvF3OzO2ubV4Orf5+/P2+jP2+nX4evX4e3g6PDg6PHU4Ova5e7j6/K4x9rE0ODR2+e5ydu5ytvF0eHF0+HS3OjS3ejAz+DK1+XW4Ou4zuC4z+K50uW51ObE1eXE1+bF2enF2urR3+vR4OzS4u7S4+9ykLWOpMGkt89HeahJgLBMjr5Mk8NukrdvmL1yo8lypsyIqMeJrcyLttWLudhGf7Btl72HrMw/cqVpjrWDpMUqa6QterNaiLRck8B1n8R3qc4dXpsid7NSf6xVkcBtl75wp84ALnQ4XY9SeKUAP4MAT5YAWp8AZKo7aZo9dKk/e7A/g7hVg69XjbtZlMFZm8gAMHUANXwAO4A2XpA2YpU3ZphQeaZQfKpRgK0APIU1Z5xPgbAAHGYtUYRFbJwAHGgAH2sAJXEAMH0qUYYqU4grV4wsXpZCbJ1Cbp9DcqNEeasAKHUpWZBBdKYAGmwANYgARpkfUIkiYp4jbas1a6A4fLI6h70AAAAABVgACV0AD2MAFmkAHHEAJHcAKn8AMIUANosAO5AAP5QbQnobRX4cSYIcTYcdUYwdVpEeWpcfXpwfY6AfZqQgaacvXZMvYJYwZJoxaJ4ybKMycaczdaw0ebA1fbQ1gLc2g7rS/SeDAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfeAwQBGiXWyX7TAAAAd0lEQVQY02NgwAEiKhdURiDxsw6BQBacH34wxZPBM+VgOEyg4oAHkPQ4UAETmL8fTO2fDxMo3+cOJN33lcMEovcmuzG4Je8Ng/INW6fsAYFMmIKm3dPjyuaVhcL4jbsm2yI7smHnJCtkfu6OiZYovvDpMGEgCQAArSEnE6lZL7YAAAAASUVORK5CYII=';

/**
 * 設定されていない場合に表示するアイコンのURL。
 * @type {string}
 */
const DEFAULT_ICON = FaviconService.defaultFavicon.spec;

/**
 * {@link DEFAULT_ICON}のDataURL。
 * @type {string}
 */
const DEFAULT_ICON_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVR42t2TQQrCMBBFe4HqungBV8USjC01iKt2UVBcuPAwHkAKRSwFN141zi/DULpKiCsXL8kw/3+SkETW2iDGQZeHdabL+2ZbfKiOMYPL9bYDXEsPWngkQOX7Zz+8T7Q2EGFmVoyZ9qCFRwI4PYHAkQQeCZB0P8xsB34B8AQF/PYIdXOufAPg+aM7CN9Bbo4vevPa1QwtPBLwaLvxbbt+JmjhkQBiQaSE4loxS0bNeil7oi+lcro7fpDjUgAAAABJRU5ErkJggg==';

/**
 * prefs.jsの一項目の容量制限。（UTF-16のコードユニット数）
 * @type {number}
 */
const MAX_PREFERENCE_VALUE_LENGTH = 1 * 1024 * 1024;

/**
 * 設定を保存するprefs.jsの枝。（末尾にピリオド必須）
 * @type {string}
 */
const PREF_ROOT = 'extensions.' + ID + '.';

/**
 * HTML名前空間。
 * @type {string}
 */
const HTML_NS = 'http://www.w3.org/1999/xhtml';

/**
 * XML名前空間。
 * @type {string}
 */
const XML_NS = 'http://www.w3.org/XML/1998/namespace';

/**
 * XMLNS名前空間。
 * @type {string}
 */
const XMLNS_NS = 'http://www.w3.org/2000/xmlns/';

/**
 * XUL名前空間。
 * @type {string}
 */
const XUL_NS = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul';

/**
 * XMLパースエラーを示す要素の名前空間。
 * @type {string}
 */
const PARSE_ERROR_NS = 'http://www.mozilla.org/newlayout/xml/parsererror.xml';

/**
 * [Encoding Standard]{@link http://encoding.spec.whatwg.org/}が要求する標準の文字符号化方式。
 * @type {string}
 */
const THE_ENCODING = 'UTF-8';

/**
 * Base64に変換したとき、データが何倍になるか。
 * @type {number}
 */
const BASE64_SIZE_RATIO = 4 / 3;



/**
 * 一つの検索エンジンを表す。
 * @typedef {Object} SearchEngine
 * @property {number} [index] - prefs.jsに保存されている場合のインデックス。
 * @property {string} [icon] - 検索エンジンを表す16px×16pxのアイコンのDataURL。
 * @property {string} name - 検索エンジン名。
 * @property {boolean} browserSearchEngine - ブラウザの検索エンジンの情報ならtrue。
 * @property {string} url - 検索エンジンに結果をリクエストするときのURL。
 * @property {string} [method] - 検索エンジンが受け入れるHTTPメソッド。GETメソッドかPOSTメソッド。
 * @property {FormDataEntry[]} [params] - 検索エンジンがPOSTメソッドを受け入れる場合のPOSTパラメータ。
 * @property {string} [accept] - 検索エンジンが受け入れるデータの種類。text/*、image/*、audio/*のいずれか。
 * @property {string} [encoding] - 検索エンジンが受け入れる文字コード文字符号化方式。
 */

/**
 * 検索エンジンに関する操作群。
 * @type {Object}
 */
let SearchUtils = {
	/**
	 * 保存可能なドロップゾーンの最大数。
	 * @constant {number}
	 */
	MAX_DROPZONE_LENGTH: 32,

	/**
	 * prefs.jsからドロップゾーンの検索エンジン数を取得する。（歯抜けインデックスを含む）
	 * @returns {number}
	 */
	getDropzoneLength: function () {
		let indexes = [];
		for (let prefName of this.enginesBranch.getChildList('')) {
			let [index, property] = prefName.split('.');
			if (property !== undefined && /^(?:0|[1-9][0-9]*)$/.test(index) && index < this.MAX_DROPZONE_LENGTH) {
				indexes.push(index);
			} else {
				// 壊れた設定なら、削除する
				this.enginesBranch.clearUserPref(prefName);
			}
		}
		return indexes.length > 0 ? Math.max.apply(null, indexes) + 1 : 0;
	},

	/**
	 * prefs.jsに検索窓のエンジンを登録する。
	 */
	initializeDropzones: function () {
		let engines = Services.search.getVisibleEngines().map(function (engine) {
			return {
				name: engine.name,
			};
		});

		// POST検索例
		engines.push({
			icon: 'data:image/vnd.microsoft.icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAABILAAASCwAAAAAAAAAAAAD0hUJK9IVC5/SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQuT0hUJK9IVC5vSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC5/SFQv/0hUL/9IVC//SFQv/1jU7/+sir//7v5//95df/+9S9//vPtf/3oW7/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+9jC//3s4f/1lFn/9IVC//SFQv/0iEb//NvH//eibv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//3u5f/5u5b/9IVC//SFQv/0hUL/9IVC//m6lP/707r/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/5vpv//N7M//SIR//0hUL/9IVC//WSV//97OH/+8+0//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//epev/6yKr/+byW//nCoP/+9O7//e3j//WSVv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SHRv/+9vH//OLT//WPUf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//aeaf/5uZL////+//iwhf/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//m4kf//+/n/96h5//WNT//7zbL/9p9q//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/+9fD/+86z//SFQv/0hUL/96Rx//3r4P/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL//vby//iwhf/0hUL/9IVC//izif//+/j/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqf/5vJf/9IVC//SGRP/95NX/+9a///SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hkT/+bqU//m7lv/84dD///79//rLr//3p3f/9IVC//SFQv/0hUL/9IVC//SFQub0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQub0hUJJ9IVC5vSFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQub0hUJJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
			name: _('Google 画像で検索'),
			url: 'https://www.google.com/searchbyimage/upload',
			method: 'POST',
			params: [['encoded_image', '{searchTerms}']],
			accept: 'image/*',
			encoding: THE_ENCODING,
		});

		SearchUtils.setEngines(engines);
	},

	/**
	 * 検索エンジン名からブラウザに登録されているエンジンを取得する。
	 * @param {string} name
	 * @returns {?SearchEngine} - encodingプロパティを含まない。
	 */
	getBrowserEngineByName: function (name) {
		let browserEngine = Services.search.getEngineByName(name);
		return browserEngine ? this.convertEngineFromBrowser(browserEngine) : null;
	},

	/**
	 * {@link Ci.nsISearchEngine}を{@link SearchEngine}に変換する。
	 * @param {Ci.nsISearchEngine} browserEngine
	 * @returns {SearchEngine} - encodingプロパティを含まない。
	 */
	convertEngineFromBrowser: function (browserEngine) {
		let engine = {
			browserSearchEngine: true,
			name: browserEngine.name,
			accept: 'text/plain',
		};
		if (browserEngine.iconURI) {
			engine.icon = browserEngine.iconURI.spec;
		}
		let searchTerms = String(Math.random()).replace('.', '');
		let submission = browserEngine.getSubmission(searchTerms);
		if (submission.postData) {
			// POSTメソッドなら
			engine.method = 'POST';
			engine.url = submission.uri.spec;
			let postData = NetUtil.readInputStreamToString(submission.postData, submission.postData.available());
			engine.params = parseXWwwFormUrlencoded(postData.split('\r\n\r\n')[1].replace(searchTerms, '{searchTerms}'));
		} else {
			// GETメソッドなら
			engine.method = 'GET';
			engine.url = submission.uri.spec.replace(new RegExp(searchTerms, 'g'), '{searchTerms}');
		}
		return engine;
	},

	/**
	 * インデックスからprefs.jsに保存されているユーザー定義のエンジンを取得する。
	 * @param {number} index
	 * @returns {?SearchEngine}
	 */
	getCustomEngineByIndex: function (index) {
		let engine = null;
		let branchName = PREF_ROOT + 'engines.' + index + '.';
		let name = Application.prefs.getValue(branchName + 'name', null);
		if (name) {
			engine = {
				index: index,
				browserSearchEngine: false,
				name: name,
				url: Application.prefs.getValue(branchName + 'url', ''),
				method: Application.prefs.getValue(branchName + 'method', 'GET'),
				accept: Application.prefs.getValue(branchName + 'accept', 'text/plain'),
				encoding: Application.prefs.getValue(branchName + 'encoding', THE_ENCODING),
			};
			let icon = Application.prefs.getValue(branchName + 'icon', null);
			if (icon) {
				engine.icon = icon;
			}
			if (engine.method === 'POST') {
				// POSTメソッドなら
				let params;
				try {
					params = JSON.parse(Application.prefs.getValue(branchName + 'params', '[]'));
				} catch (e) {
					if (!(e instanceof SyntaxError)) {
						throw e;
					}
				}
				engine.params = [];
				if (Array.isArray(params)) {
					for (let param of params) {
						if (Array.isArray(param)) {
							engine.params.push([param[0] || '', param[1] || '']);
						}
					}
				}
			}
		}
		return engine;
	},

	/**
	 * インデックスからエンジンを取得する。
	 * @param {number} index
	 * @returns {?SearchEngine}
	 */
	getEngineByIndex: function (index) {
		let branchName = PREF_ROOT + 'engines.' + index + '.';
		return Application.prefs.getValue(branchName + 'url', null)
				? this.getCustomEngineByIndex(index)
				: this.getBrowserEngineByName(Application.prefs.getValue(branchName + 'name', null));
	},

	/**
	 * prefs.jsに保存されている検索エンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getEngines: function () {
		let encodings = this.getBrowserEngineEncodings();
		let engines = [];
		for (let i = 0, l = this.getDropzoneLength(); i < l; i++) {
			let branchName = PREF_ROOT + 'engines.' + i + '.';
			if (Application.prefs.getValue(branchName + 'url', null)) {
				// ユーザー定義のエンジンなら
				engines.push(this.getCustomEngineByIndex(i));
			} else {
				// ブラウザのエンジンなら
				let name = Application.prefs.getValue(branchName + 'name', null);
				let engine = this.getBrowserEngineByName(name);
				if (engine) {
					engine.index = i;
					engine.encoding = encodings[name] || THE_ENCODING;
					engines.push(engine);
				}
			}
		}
		return engines;
	},

	/**
	 * ブラウザに登録されている検索エンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getBrowserEngines: function () {
		let encodings = this.getBrowserEngineEncodings();
		return Services.search.getVisibleEngines().map(browserEngine => {
			let engine = this.convertEngineFromBrowser(browserEngine);
			engine.encoding = encodings[engine.name] || THE_ENCODING;
			return engine;
		});
	},

	/**
	 * prefs.jsに保存されているユーザー定義のエンジンをすべて取得する。
	 * @returns {SearchEngine[]}
	 */
	getCustomEngines: function () {
		let engines = [];
		for (let i = 0, l = this.getDropzoneLength(); i < l; i++) {
			let branchName = PREF_ROOT + 'engines.' + i + '.';
			if (Application.prefs.getValue(branchName + 'url', null)) {
				// ユーザー定義のエンジンなら
				engines.push(this.getCustomEngineByIndex(i));
			}
		}
		return engines;
	},

	/**
	 * 検索エンジンの一覧が保存されているprefs.jsのブランチ
	 * @type {Ci.nsIPrefBranch}
	 */
	enginesBranch: gPrefService.getBranch(PREF_ROOT + 'engines.'),

	/**
	 * prefs.jsに保存されている検索エンジンをすべて削除し、指定したエンジンリストと置き換える
	 * @param {SearchEngine[]} engines
	 */
	setEngines: function (engines) {
		let oldEngineLength = this.getDropzoneLength();
		engines.forEach((engine, index) => {
			this.setEngine(index, engine);
		});
		for (let i = engines.length; i < oldEngineLength; i++) {
			this.enginesBranch.deleteBranch(i + '.');
		}
	},

	/**
	 * prefs.jsのブランチの指定した位置に検索エンジンを追加する。
	 * @param {number} index
	 * @param {SearchEngine} engine
	 */
	setEngine: function (index, engine) {
		// 古い設定の削除
		this.enginesBranch.deleteBranch(index + '.');

		let branchName = PREF_ROOT + 'engines.' + index + '.';

		Application.prefs.setValue(branchName + 'name', engine.name);

		if (!Services.search.getEngineByName(engine.name)) {
			// 同名の検索エンジンがブラウザに存在しなければ
			if (engine.icon) {
				Application.prefs.setValue(branchName + 'icon', engine.icon);
			}
			Application.prefs.setValue(branchName + 'url', engine.url);
			if (engine.method !== 'GET') {
				// POSTメソッドなら
				Application.prefs.setValue(branchName + 'method', engine.method);
				Application.prefs.setValue(branchName + 'params', JSON.stringify(engine.params));
				if (engine.accept !== 'text/plain') {
					Application.prefs.setValue(branchName + 'accept', engine.accept);
				}
			}
			if (engine.encoding !== THE_ENCODING) {
				Application.prefs.setValue(branchName + 'encoding', engine.encoding);
			}
		}
	},

	/**
	 * search.jsonから、ブラウザの検索エンジンの文字符号化方式を取得する。
	 * @returns {Object} プロパティ名に検索エンジン名、値に文字符号化方式をもつオブジェクト。
	 */
	getBrowserEngineEncodings: function () {
		let encodings = {};
		let file = FileUtils.getFile('ProfD', ['search.json']);
		if (file.exists()) {
			let stream = new FileInputStream(file, -1, -1, 0);
			try {
				let searchJson = NativeJSON.decodeFromStream(stream, -1);
				if (searchJson && searchJson.directories) {
					for (let directory in searchJson.directories) {
						if (directory && Array.isArray(directory.engines)) {
							for (let engine of directory.engines) {
								encodings[engine._name] = engine.queryCharset;
							}
						}
					}
				}
			} catch (e) {
				if (!(e instanceof SyntaxError)) {
					throw e;
				}
			} finally {
				stream.close();
			}
		}
		return encodings;
	},

	/**
	 * 長すぎる値を切り詰める。
	 * @param {SearchEngine} engine
	 * @returns {SearchEngine}
	 */
	trimValues: function (engine) {
		for (let name in engine) {
			switch (name) {
				case 'icon':
					delete engine[name];
					break;
				case 'params':
					while (JSON.stringify(engine[name]) > MAX_PREFERENCE_VALUE_LENGTH) {
						engine[name].pop();
					}
					break;
				default:
					if (typeof engine[name] === 'string' && engine[name] > MAX_PREFERENCE_VALUE_LENGTH) {
						engine[name] = engine[name].substr(0, MAX_PREFERENCE_VALUE_LENGTH);
					}
			}
		}
		return engine;
	},
};

/**
 * OpenSearchに関する操作群。
 * @type {Object}
 */
let OpenSearchUtils = {
	/**
	 * OpenSearchの名前空間。
	 * @constant {string}
	 */
	NS: 'http://a9.com/-/spec/opensearch/1.1/',

	/**
	 * OpenSearch Referrer extensionの名前空間。
	 * @constant {string}
	 */
	REFERRER_NS: 'http://a9.com/-/opensearch/extensions/referrer/1.0/',

	/**
	 * OpenSearch parameter extensionの名前空間。
	 * @constant {string}
	 */
	PARAMETER_NS: 'http://a9.com/-/spec/opensearch/extensions/parameters/1.0/',

	/**
	 * OpenSearch Suggestions extensionの名前空間。
	 * @constant {string}
	 */
	SUGGESTIONS_NS: 'http://www.opensearch.org/specifications/opensearch/extensions/suggestions/1.1',

	/**
	 * OpenSearch Geo extensionの名前空間。
	 * @constant {string}
	 */
	GEO_NS: 'http://a9.com/-/opensearch/extensions/geo/1.0/',

	/**
	 * OpenSearch Time Extensionの名前空間。
	 * @constant {string}
	 */
	TIME_NS: 'http://a9.com/-/opensearch/extensions/time/1.0/',

	/**
	 * OpenSearch Mobile Extensionの名前空間。
	 * @constant {string}
	 */
	M_NS: 'http://a9.com/-/opensearch/extensions/mobile/1.0/',

	/**
	 * OpenSearch SRU Extensionの名前空間。
	 * @constant {string}
	 */
	SRU_NS: 'http://a9.com/-/opensearch/extensions/sru/2.0/',

	/**
	 * OpenSearch Semantic Extensionの名前空間。
	 * @constant {string}
	 */
	SEMANTIC_NS: 'http://a9.com/-/opensearch/extensions/semantic/1.0/',

	/**
	 * InputEncoding要素の既定値。
	 * @type {string}
	 */
	DEFAULT_ENCODING: 'UTF-8',

	/**
	 * itemsPerPage要素が存在しない場合の、countパラメータの既定値。
	 * @constant {number}
	 */
	DEFAULT_ITEMS_PER_PAGE: 20,

	/**
	 * OpenSearch URLテンプレートに含まれるテンプレートパラメータのうち、{searchTerms}以外を置換する。
	 * @param {string} template - OpenSearch URLテンプレート。
	 * @param {Element} element - OpenSearch URLテンプレートが設定されているUrl要素、またはParameter要素。
	 * @returns {string}
	 * @see [OpenSearch URL template syntax]{@link http://www.opensearch.org/Specifications/OpenSearch/1.1#OpenSearch_URL_template_syntax}
	 */
	parseURLTemplate: function (template, element) {
		let description = getParentElementByTagName(element, 'OpenSearchDescription');
		let url = getParentElementByTagName(element, 'Url');
		let searchValue = /{((?:[-a-zA-Z0-9._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})+:)?((?:[-a-zA-Z0-9._~!$&'()*+,;=:@]|%[0-9A-Fa-f]{2})*)(\?)?}/g;
		return template.replace(searchValue, ([parameter, encodedPrefix, encodedLname, modifier]) => {
			let prefix = decodeURIComponent(encodedPrefix), lname = decodeURIComponent(encodedLname);
			let value = null;
			switch (prefix ? element.lookupNamespaceURI(prefix) || this.NS : this.NS) {
				case this.NS:
					switch (lname) {
						case 'searchTerms':
							return '{searchTerms}';
						case 'count':
							if (modifier) {
								value = '';
							} else {
								let itemsPerPage = description.getElementsByTagNameNS(this.NS, 'itemsPerPage');
								value = itemsPerPage ? itemsPerPage.textContent : this.DEFAULT_ITEMS_PER_PAGE;
							}
							break;
						case 'startIndex':
							value = url.getAttribute('indexOffset') || 1;
							break;
						case 'startPage':
							value = url.getAttribute('pageOffset') || 1;
							break;
						case 'language':
							value = window.navigator.language;
							break;
						case 'inputEncoding':
							let encoding = description.getElementsByTagNameNS(this.NS, 'InputEncoding');
							value = encoding ? encoding.textContent : this.DEFAULT_ENCODING;
							break;
						case 'outputEncoding':
							value = THE_ENCODING;
							break;
					}
					break;
				case this.REFERRER_NS:
					switch (lname) {
						case 'source':
							value = ID;
							break;
					}
					break;
				case this.SUGGESTIONS_NS:
					switch (lname) {
						//case 'suggestionPrefix':
						//	break;
						case 'suggestionIndex':
							value = modifier ? '' : 0;
							break;
					}
					break;
				//case this.GEO_NS:
				//	break;
				case this.TIME_NS:
					switch (lname) {
						case 'start':
							value = modifier ? '' : '0000-01-01T00:00:00Z';
							break;
						case 'end':
							value = modifier ? '' : '9999-12-31T23:59:58Z';
							break;
					}
					break;
				case this.M_NS:
					switch (lname) {
						case 'userAgent':
							value = window.navigator.userAgent;
							break;
						//case 'subId':
						//	break;
						//case 'mcc':
						//	break;
						//case 'mnc':
						//	break;
					}
					break;
				case this.SRU_NS:
					switch (lname) {
						case 'queryType':
							value = modifier ? '' : 'searchTerms';
							break;
						case 'query':
							return modifier ? '' : '{searchTerms}';
						case 'startRecord':
							value = modifier ? '' : url.getAttribute('indexOffset') || 1;
							break;
						case 'maximumRecords':
							if (modifier) {
								value = '';
							} else {
								let itemsPerPage = description.getElementsByTagNameNS(this.NS, 'itemsPerPage');
								value = itemsPerPage ? itemsPerPage.textContent : this.DEFAULT_ITEMS_PER_PAGE;
							}
							break;
						case 'recordPacking':
							value = modifier ? '' : 'xml';
							break;
						//case 'recordSchema':
						//	break;
						//case 'resultSetTTL':
						//	break;
						//case 'sortKeys':
						//	break;
						//case 'stylesheet':
						//	break;
						case 'rendering':
							value = 'server';
							break;
						case 'httpAccept':
							value = 'text/html, application/xhtml+xml';
							break;
						case 'httpAcceptCharset':
							value = modifier ? '' : '*';
							break;
						case 'httpAcceptEncoding':
							value = modifier ? '' : '*';
							break;
						case 'httpAcceptLanguage':
							value = modifier ? '' : window.navigator.language + ', *';
							break;
						case 'httpAcceptRanges':
							value = modifier ? '' : 'none';
							break;
						case 'facetLimit':
							value = modifier ? '' : 1;
							break;
						case 'facetSort':
							value = modifier ? '' : 'recordCount';
							break;
						//case 'facetRangeField':
						//	break;
						//case 'facetLowValue':
						//	break;
						//case 'facetHighValue':
						//	break;
						//case 'facetCount':
						//	break;
						//case 'extension':
						//	break;
					}
					break;
				//case this.SEMANTIC_NS:
				//	break;
			}
			return value === null ? (modifier ? '' : parameter) : encodeURIComponent(value);
		});
	},

	/**
	 * {@link SearchEngine}をOpenSearchDescription要素に変換する。
	 * @param {SearchEngine} engine
	 * @param {XMLDocument} doc - 作成するOpenSearchDescription要素のノード文書。
	 * @returns {Element} OpenSearchDescription要素。
	 */
	convertEngineToElement: function (engine, doc) {
		let description = doc.createElementNS(this.NS, 'OpenSearchDescription');
		description.appendChild(doc.createElementNS(this.NS, 'ShortName')).textContent = engine.name;
		description.appendChild(doc.createElementNS(this.NS, 'Description'));
		if (engine.icon) {
			description.appendChild(doc.createElementNS(this.NS, 'Image')).textContent = engine.icon;
		}
		let url = doc.createElementNS(this.NS, 'Url');
		url.setAttribute('template', engine.url);
		url.setAttribute('type', 'text/html');
		if (engine.method === 'POST') {
			// POSTメソッドなら
			url.setAttributeNS(this.PARAMETER_NS, 'parameters:method', engine.method);
			for (let [name, value] of engine.params) {
				let parameter = doc.createElementNS(this.PARAMETER_NS, 'parameters:Parameter');
				parameter.setAttribute('name', name);
				parameter.setAttribute('value', value);
				url.appendChild(parameter);
			}
			if (engine.accept !== 'text/plain') {
				url.setAttributeNS(NS, 'dnd-search:accept', engine.accept);
			}
		}
		description.appendChild(url);
		if (engine.encoding !== this.DEFAULT_ENCODING) {
			description.appendChild(doc.createElementNS(OPEN_SEARCH_NS, 'InputEncoding')).textContent = encoding;
		}
		return description;
	},

	/**
	 * OpenSearchDescription要素を{@link SearchEngine}に変換する。
	 * @param {Element} description - OpenSearchDescription要素。
	 * @returns {?SearchEngine}
	 */
	convertEngineToObject: function (description) {
		let engine = null;
		let shortName = description.getElementsByTagNameNS(this.NS, 'ShortName')[0];
		let url = description.querySelector('Url[template][type="text/html"], Url[template][type="application/xhtml+xml"]') || description.querySelector('Url[template]');
		if (shortName && url) {
			let template = this.parseURLTemplate(url.getAttribute('template'), url);
			let nativeURL;
			try {
				nativeURL = NetUtil.newURI(template).QueryInterface(Ci.nsIURL);
			} catch (e) {
				if (e.result === Cr.NS_ERROR_MALFORMED_URI || e.result === Cr.NS_NOINTERFACE) {
					// 妥当なURLでなければ
					return null;
				} else {
					throw e;
				}
			}
			engine = {
				name: shortName.textContent,
			};
			let image = description.getElementsByTagNameNS(this.NS, 'Image')[0];
			if (image) {
				engine.icon = image.textContent;
			}

			let parameters = url.getElementsByTagNameNS(this.PARAMETER_NS, 'Parameter');

			let method = url.getAttributeNS(this.PARAMETER_NS, 'method');
			if (method && method.toUpperCase() === 'POST') {
				// POSTメソッドなら
				engine.method = 'POST';
				engine.url = template;
				engine.params = [];
				for (let parameter of parameters) {
					engine.params.push([
						parameter.getAttribute('name'),
						this.parseURLTemplate(parameter.getAttribute('value'), parameter)]);
				}
				engine.accept = url.getAttributeNS(NS, 'accept') || 'text/*';
			} else {
				// POSTメソッド以外はGETメソッドとして扱う
				engine.method = 'GET';
				let searchParams = new URLSearchParams(nativeURL.query);
				for (let parameter of parameters) {
					searchParams.append(
						parameter.getAttribute('name'),
						this.parseURLTemplate(parameter.getAttribute('value'), parameter));
				}
				nativeURL.query = searchParams.toString().replace(/%7BsearchTerms%7D/g, '{searchTerms}');
				engine.url = nativeURL.spec;
				engine.accept = 'text/*';
			}
			let inputEncoding = description.getElementsByTagNameNS(this.NS, 'InputEncoding')[0];
			engine.encoding = inputEncoding ? inputEncoding.textContent : this.DEFAULT_ENCODING;
			if (engine.encoding !== this.DEFAULT_ENCODING && engine.encoding.toUpperCase() === this.DEFAULT_ENCODING) {
				engine.encoding = this.DEFAULT_ENCODING;
			}
		}
		return engine || SearchUtils.trimValues(engine);
	},
};

/**
 * アイコンに関する操作群。
 * @type {Object}
 */
let IconUtils = {
	/**
	 * SQLiteのLIKE演算子におけるESCAPE文字。
	 * @constant {string}
	 */
	SQLITE_LIKE_ESCAPE_STRING: '@',

	/**
	 * DataURLに変換する。
	 * @param {(Blob|Array)} icon
	 * @param {Function} callback - 第1引数にDataURL。
	 * @param {string} [type] - iconが配列の場合の、アイコンのMIMEタイプ。
	 */
	convertToDataURL: function (icon, callback, type) {
		if (type) {
			icon = new Blob([new Uint8Array(icon)], { type: type });
		}
		let reader = new FileReader();
		reader.addEventListener('load', function (event) {
			callback(event.target.result);
		});
		reader.readAsDataURL(icon);
	},

	/**
	 * URLから、そのWebサイトのFaviconのDataURLを取得する。
	 * @param {string} url
	 * @param {Function} callback - 第1引数にDataURL。
	 * @param {Function} [errorCallback]
	 */
	getFaviconFromSiteUrl: function (url, callback, errorCallback = function () {}) {
		let nativeURL = NetUtil.newURI(url).QueryInterface(Ci.nsIURL);
		PlacesUtils.favicons.getFaviconDataForPage(nativeURL, (faviconURL, length, data, type) => {
			if (length > 0) {
				// Faviconが存在すれば
				this.convertToDataURL(data, callback, type);
			} else {
				// places.sqliteに接続する
				let places = Services.storage.openDatabase(FileUtils.getFile('ProfD', ['places.sqlite']));

				// 指定されたURLに似た履歴のFaviconを取得するSQL文を構築・実行
				let statement = places.createAsyncStatement('SELECT data, mime_type'
						+ ' FROM moz_places INNER JOIN moz_favicons ON favicon_id = moz_favicons.id'
						+ ' WHERE moz_places.url LIKE :url ESCAPE :escape ORDER BY last_visit_date DESC LIMIT 1');
				statement.params.url = statement.escapeStringForLIKE(nativeURL.prePath + nativeURL.directory, this.SQLITE_LIKE_ESCAPE_STRING) + '%';
				statement.params.escape = this.SQLITE_LIKE_ESCAPE_STRING;
				let favicon;
				statement.executeAsync({
					handleResult: resultSet => {
						let favicon = resultSet.getNextRow();
						statement.finalize();
					},
					handleError: error => {
						this.getFaviconIco(nativeURL.prePath, callback, errorCallback);
					},
					handleCompletion: () => {
						if (favicon) {
							this.convertToDataURL(favicon.getResultByName('data'), callback, favicon.getResultByName('mime_type'));
						} else {
							this.getFaviconIco(nativeURL.prePath, callback, errorCallback);
						}
					},
				});
				places.asyncClose();
			}
		});
	},

	/**
	 * /favicon.ico を取得する。
	 * @param {string} origin
	 * @param {Function} callback - 第1引数にDataURL。
	 * @param {Function} [errorCallback]
	 */
	getFaviconIco: function (origin, callback, errorCallback = function () {}) {
		let client = new XMLHttpRequest();
		client.open('GET', origin + '/' + 'favicon.ico');
		client.responseType = 'blob';
		client.addEventListener('error', errorCallback);
		client.addEventListener('load', event => {
			let client = event.target;
			if (client.status === 200 && client.response.type.startsWith('image/')) {
				this.convertToDataURL(client.response, callback);
			} else {
				errorCallback();
			}
		});
		client.send();
	},

	/**
	 * Faviconを含むWebページのURL、または画像のURLからBlobインスタンスを取得する。
	 * @param {string} url
	 * @param {Function} callback - 第1引数にDataURL。
	 * @param {Function} errorCallback - 第1引数にエラーメッセージ。
	 */
	getFromUrl: function (url, callback, errorCallback) {
		let uri;
		try {
			uri = NetUtil.newURI(url);
		} catch (e) {
			if (e.result === Cr.NS_ERROR_MALFORMED_URI) {
				// 妥当なURLでなければ
				errorCallback(_('http:// などで始まるURLを入力してください。'));
				return;
			} else {
				throw e;
			}
		}
		let client = new XMLHttpRequest();
		try {
			client.open('GET', url);
		} catch (e) {
			if (e.result === Cr.NS_ERROR_UNKNOWN_PROTOCOL) {
				errorCallback(_('http:// などで始まるURLを入力してください。'));
				return;
			} else {
				throw e;
			}
		}
		client.responseType = 'blob';
		client.addEventListener('error', () => {
			this.getFaviconFromSiteUrl(url, callback, function () {
				errorCallback(_('指定されたURLに接続できませんでした。'));
			});
		});
		client.addEventListener('load', event => {
			let client = event.target;
			if (client.status === 200) {
				if (client.response.type.startsWith('image/')) {
					this.convertToDataURL(client.response, callback);
				} else {
					this.getFaviconFromSiteUrl(url, callback, function () {
						errorCallback(_('アイコンを取得できませんでした。WebページのURLであれば、一度ブラウザでページを表示してみてください。'));
					});
				}
			} else {
				this.getFaviconFromSiteUrl(url, callback, function () {
					errorCallback(_('指定されたURLに接続できませんでした。') + '\n' + client.status + ' ' + client.statusText);
				});
			}
		});
		client.send();
	},
};

/**
 * 画像のURLなど。
 * @typedef DragFile
 * @type {Object}
 * @property {?string} type
 * @property {?string} url
 */

/**
 * @typedef DragData
 * @type {Object}
 * @property {?string} text
 * @property {?(Blob|DragFile)} file
 * @property {?boolean} fromOutsideWindow - 外部からの（dragstart,dragイベントが発生しない）ドラッグであればtrue。
 */

let DropzoneUtils = {
	/**
	 * ドロップゾーン専用のスタイルシートを設定するための親要素。
	 * @type {HTMLDivElement}
	 */
	wrapper: null,

	/** @type {?DragData} */
	dragData: null,

	/**
	 * ドラッグ中ならtrue。
	 * @type {boolean}
	 */
	duringDrag: false,

	/**
	 * メニューバーの「ツール」に、設定画面を開くオプションを追加。
	 */
	addOpenSettingsOption: function () {
		let menuItem = document.createElementNS(XUL_NS, 'menuitem');
		menuItem.id = ID + '-menuitem';
		menuItem.setAttribute('label', NAME);
		menuItem.setAttribute('image', MENUITEM_ICON);
		menuItem.classList.add('menuitem-iconic');
		menuItem.addEventListener('command', openSettings);
		document.getElementById('menu_ToolsPopup').appendChild(menuItem);
	},

	/**
	 * 各ドロップゾーンを作成。
	 */
	create: function () {
		this.wrapper = document.createElementNS(HTML_NS, 'div');
		this.wrapper.id = ID;
		this.wrapper.hidden = true;
		let style = document.createElementNS(HTML_NS, 'style');
		style.scoped = true;
		this.wrapper.appendChild(style);
		this.wrapper.appendChild(document.createElementNS(HTML_NS, 'ul'));
		let appContent = document.getElementById('appcontent');
		appContent.insertBefore(this.wrapper, appContent.firstChild);
		this.update();
	},

	/**
	 * ドロップゾーンを初期状態に戻す。
	 * @param {boolean} [forced] - {@link dragData}の確認を行わずに実行するならtrue。
	 */
	resetDropzones: function (forced = false) {
		if (forced || this.dragData) {
			let activeValidDropzone = this.getActiveValidDropzone();
			if (activeValidDropzone) {
				activeValidDropzone.classList.remove('drop-active-valid');
			}

			// ドロップゾーンを隠す
			this.wrapper.hidden = true;
			this.dragData = null;
			this.duringDrag = false;
		}
	},

	/**
	 * drop-active-validクラスが付いた要素を返す。
	 * @returns {?HTMLLIElement}
	 */
	getActiveValidDropzone: null,

	/**
	 * ドロップゾーンに関するスタイルシートとイベントリスナーを設定する。
	 */
	setEventListeners: function () {
		this.getActiveValidDropzone = HTMLCollection.prototype.item.bind(this.wrapper.getElementsByClassName('drop-active-valid'), 0);

		let styleSheet = this.wrapper.getElementsByTagNameNS(HTML_NS, 'style')[0].sheet;
		let cssRules = styleSheet.cssRules;
		[
			// 位置決め用
			'div {'
					+ 'position: relative;'
					+ '}',

			// ドロップゾーン全体
			'ul {'
					+ 'position: absolute;'
					+ 'top: 1.5em;'
					+ 'left: 1.5em;'
					+ 'right: 1.5em;'
					+ 'height: 8em;'
					+ 'display: flex;'
					+ 'border: solid #A0A0A0 1px;'
					+ 'background-color: rgba(100, 200, 255, 0.5);'
					+ 'padding-left: 0;'
					+ '}',

			// 各ドロップゾーン
			'li {'
					+ 'flex: 1;'
					+ 'font-weight: bold;'
					+ 'padding-left: 0.5em;'
					+ 'overflow: hidden;'
					+ 'white-space: nowrap;'
					+ 'line-height: 2em;'
					+ 'position: relative;'
					+ 'z-index: 1;'
					+ '}',

			'li:not(:first-of-type) {'
					+ 'border-left: inherit;'
					+ '}',

			'img {'
					+ 'width: 16px;'
					+ 'height: 16px;'
					+ 'vertical-align: middle;'
					+ 'margin-right: 0.3em;'
					+ '}',

			// ドロップゾーン上部の背景色
			'li::before {'
					+ 'display: block;'
					+ 'content: "";'
					+ 'position: absolute;'
					+ 'top: 0;'
					+ 'left: 0;'
					+ 'right: 0;'
					+ 'height: 2em;'
					+ 'background-color: rgba(50, 100, 200, 0.7);'
					+ 'z-index: -1;'
					+ '}',

			// 各ドロップゾーンにポインタが載っている時
			'li.drop-active-valid::before {'
					+ 'height: initial;'
					+ 'bottom: 0;'
					+ '}',
		].forEach(function (rule) {
			styleSheet.insertRule(rule, cssRules.length);
		});

		// dropzone属性の代替
		// Bug 723008 – Implement dropzone content attribute <https://bugzilla.mozilla.org/show_bug.cgi?id=723008>
		this.wrapper.addEventListener('dragover', event => {
			let activeValidDropzone = this.getActiveValidDropzone();
			if (activeValidDropzone && activeValidDropzone.contains(event.target)) {
				event.preventDefault();
			}
		});

		// イベントリスナーの追加
		for (let type of this.eventTypesForWindow) {
			window.addEventListener(type, this['on' + type] = this['on' + type].bind(this), true);
		}
	},

	/**
	 * windowに追加したイベントリスナーを取り除く。
	 */
	removeEventListeners: function () {
		for (let type of this.eventTypesForWindow) {
			window.addEventListener(type, this['on' + type], true);
		}
	},

	/**
	 * windowに追加するイベントリスナーが補足するイベントの種類。
	 * @type {string[]}
	 */
	eventTypesForWindow: ['dragstart', 'dragenter', 'dragleave', 'dragend', 'drop'],

	ondragstart: function (event) {
		if (!event.isTrusted) {
			// ユーザーによるドラッグでなければ
			return;
		}

		if (this.dragData) {
			// ドロップゾーンが表示されたままなら
			this.resetDropzones();
		}
		this.duringDrag = true;

		let dragText, dragFile;
		let target = event.target;
		if (target.ownerDocument === document) {
			// ロケーションバーや検索窓からのドラッグなら
			dragText = event.dataTransfer.getData('text/plain');
		} else {
			let name = target.localName || target.nodeName;
			switch (name) {
				case 'a':
				case 'img':
				case '#text':
					// ソースノードがリンク・画像・文字列なら
					if (target.ownerDocument.defaultView.getSelection().containsNode(target, true)) {
						// 選択範囲にソースノードが含まれていれば
						dragText = getBrowserSelection();
					} else {
						// 選択範囲でないリンク・画像をドラッグしていれば
						switch (name) {
							case 'a':
								dragText = gatherTextUnder(target);
								break;
							case 'img':
								dragText = target.alt;
								break;
						}
						if (!dragText.trim()) {
							dragText = target.title;
						}
					}
					if (name === 'img' || name === 'a') {
						// 画像かリンクをドラッグしていれば
						let img = name === 'img' ? target : target.getElementsByTagName('img')[0];
						if (img && img.complete && img.naturalWidth > 0) {
							// 画像データが存在すれば
							dragFile = {
								type: 'image/*',
								url: img.src,
							};
						}
					}
					break;
				case 'input':
				case 'textarea':
					// ソースノードがテキスト入力欄なら
					if (target.draggable) {
						// draggable=yesが設定されたテキスト入力欄なら何もしない
						return;
					}
					dragText = event.dataTransfer.getData('text/plain');
					break;
				default:
					return;
			}
		}

		dragText = dragText.trim();
		if (dragText || dragFile) {
			// ドロップゾーンを表示
			this.wrapper.hidden = false;
			this.dragData = {
				text: dragText,
				file: dragFile,
			};
		}
	},

	ondragenter: function (event) {
		if (!event.relatedTarget) {
			// ウィンドウ外からのドラッグ
			if (this.dragData) {
				this.wrapper.hidden = false;
			} else if (!this.duringDrag) {
				// ドラッグ開始
				if (!event.isTrusted) {
					return;
				}
				// ドロップゾーンを表示
				this.wrapper.hidden = false;
				this.dragData = {
					fromOutsideWindow: true,
				};
				this.duringDrag = true;
			}
			return;
		}

		let target = event.target;
		let activeValidDropzone = this.getActiveValidDropzone();
		if (activeValidDropzone && !activeValidDropzone.contains(target)) {
			// 各ドロップゾーンからポインタが外れた時
			activeValidDropzone.classList.remove('drop-active-valid');
		}

		if (this.wrapper.contains(target)) {
			// ドロップゾーン
			if (target.nodeType === Node.TEXT_NODE) {
				return;
			}
			let dropzone = getAttributeAsDOMSettableTokenList(target, 'dropzone');
			if (dropzone.contains('link')) {
				// 各ドロップゾーンにポインタが載った時
				if (this.dragData.fromOutsideWindow
						|| dropzone.contains('string:text/plain') && this.dragData.text
						|| dropzone.contains('file:image/*') && this.dragData.file && this.dragData.file.type.startsWith('image/')) {
					// ドラッグデータの形式がわからなければ、
					// またはドロップゾーンが文字列を受け取ることができ文字列をドラッグしていれば、
					// またはドロップゾーンが画像を受け取ることができ画像をドラッグしていれば
					target.classList.add('drop-active-valid');
				}
			}
		}
	},

	ondragleave: function (event) {
		if (this.dragData && !event.relatedTarget && !this.wrapper.hidden) {
			// ウィンドウ外へドラッグされたとき
			this.wrapper.hidden = true;
			let activeValidDropzone = this.getActiveValidDropzone();
			if (activeValidDropzone) {
				activeValidDropzone.classList.remove('drop-active-valid');
			}
		}
	},

	ondragend: function () {
		this.resetDropzones();
	},

	ondrop: function (event) {
		let target = event.target;
		if (this.wrapper.contains(target)) {
			// 各ドロップゾーンにドロップされた時
			event.preventDefault();
			let {text: dragText, file: dragFile, fromOutsideWindow: fromOutsideWindow} = this.dragData;
			this.resetDropzones();

			let dataset = target.dataset;

			if (fromOutsideWindow) {
				// ウィンドウ外からのドロップ
				if (dataset.method === 'POST') {
					let file = event.dataTransfer.files[0];
					if (file) {
						let fileType = file.type;
						let dropzone = getAttributeAsDOMSettableTokenList(target, 'dropzone');
						if (dropzone.contains('string:text/plain') && mimeTypeIsTextBased(fileType)
								|| dropzone.contains('file:image/*') && fileType.startsWith('image/')
								|| dropzone.contains('file:audio/*') && fileType.startsWith('audio/')) {
							// ドロップゾーンが受け取ることができる形式のファイルをドロップしていれば
							this.searchDropData(file, dataset.engineIndex, event);
						}
					}
				} else {
					let text = event.dataTransfer.getData('text/plain').trim();
					if (text) {
						// 空でない文字列をドラッグしていれば
						let dropzone = getAttributeAsDOMSettableTokenList(target, 'dropzone');
						if (dropzone.contains('string:text/plain')) {
							// ドロップゾーンが文字列を受け取ることができれば
								this.searchDropData(text, dataset.engineIndex, event);
							}
					}
				}
			} else {
				if (getAttributeAsDOMSettableTokenList(target, 'dropzone').contains('file:image/*')) {
					// 画像としてドロップしたとき
					let channel = NetUtil.newChannel(dragFile.url);
					channel.loadFlags |= Ci.nsIRequest.LOAD_FROM_CACHE;
					channel.asyncOpen({
						onDataAvailable: (request, context, stream) => {
							let mimeStream = new MIMEInputStream();
							mimeStream.addHeader('content-type', channel.contentType);
							mimeStream.setData(stream);
							this.searchDropData(mimeStream, dataset.engineIndex, event);
						},
						onStartRequest: function () { },
						onStopRequest: function () { },
					}, null);
				} else {
					// 文字列としてドロップしたとき
					this.searchDropData(dragText, dataset.engineIndex, event);
				}
			}
		} else {
			this.resetDropzones();
		}
	},

	/**
	 * prefs.jsの設定値を元に、各ウィンドウのドロップゾーンを更新する。
	 */
	update: function() {
		// 構築
		let dropzones = new DocumentFragment();
		for (let engine of SearchUtils.getEngines()) {
			dropzones.appendChild(this.convertFromSearchEngine(engine));
		}

		// 置換
		for (let {_window: win} of Application.windows) {
			let ul = win.document.querySelector('#' + ID + ' ul');

			// クリア
			while (ul.hasChildNodes()) {
				ul.firstChild.remove();
			}

			ul.appendChild(dropzones.cloneNode(true));
		}
	},

	/**
	 * ドロップゾーンを削除する。
	 */
	remove: function() {
		this.wrapper.remove();
	},

	/**
	 * prefs.jsの設定値を元に、ドロップゾーンを作成する。
	 * @param {SearchEngine} engine
	 * @returns	{HTMLLIElement}
	 */
	convertFromSearchEngine: function (engine) {
		let li = document.createElementNS(HTML_NS, 'li');

		// インデックス
		li.dataset.engineIndex = engine.index;

		// メソッド
		li.dataset.method = engine.method;

		// dropzone属性
		let dropzone = getAttributeAsDOMSettableTokenList(li, 'dropzone');
		dropzone.add('link');
		dropzone.add((engine.accept.startsWith('text/') ? 'string' : 'file') + ':' + engine.accept);
		li.setAttribute('dropzone', dropzone);

		// アイコン
		let icon = new Image(16, 16);
		icon.src = engine.icon || DEFAULT_ICON;
		li.appendChild(icon);

		// 表示名
		li.appendChild(new Text(engine.name));
		li.dataset.name = engine.name;

		return li;
	},

	/**
	 * ドロップされたデータを、ドロップゾーンに結びつけられたエンジンで検索する。
	 * @param {(string|Blob|nsIMIMEInputStream)} data - 検索する文字列、またはファイル。
	 * @param {number} engineIndex - prefs.jsに保存されているインデックス。
	 * @param {DragEvent} event - どのキーを押しているか取得するためのdropイベント。
	 */
	searchDropData: function (data, engineIndex, event) {
		let mimeType = data.type;
		if (mimeType && mimeTypeIsTextBased(mimeType) && !/^(?:image|audio)\//.test(mimeType)) {
			// ドロップされたデータがテキストファイルなら、文字列に変換しておく
			let fileReader = new FileReader();
			fileReader.addEventListener('load', () => {
				this.searchDropData(fileReader.result, engineIndex, event);
			});
			fileReader.readAsText(data);
			return;
		}

		let engine = SearchUtils.getEngineByIndex(engineIndex);
		if (engine) {
			if (engine.browserSearchEngine) {
				// ブラウザの検索窓のエンジンなら
				let browserSearchEngine = Services.search.getEngineByName(engine.name);
				if (browserSearchEngine) {
					let submission = browserSearchEngine.getSubmission(data);
					this.openSearchResult(submission.uri.spec, event, submission.postData);
				}
			} else {
				// ユーザー定義のエンジンなら
				if (engine.method === 'POST') {
					for (let i = 0, l = engine.params.length; i < l; i++) {
						if (engine.params[i][1].contains('{searchTerms}')) {
							engine.params[i][1] = data;
						}
					}
					encodeMultipartFormData(engine.params, postData => {
						this.openSearchResult(engine.url, event, postData);
					}, engine.encoding);
				} else {
					let encodedString;
					try {
						encodedString = TextToSubURI.ConvertAndEscape(engine.encoding, data);
					} catch(e) {
						if (e.result === NS_ERROR_UCONV_NOCONV) {
							encodedString = TextToSubURI.ConvertAndEscape(THE_ENCODING, data);
						} else {
							throw e;
						}
					}
					this.openSearchResult(engine.url.replace(/{searchTerms}/g, encodedString), event);
				}
			}
		}
	},

	/**
	 * ユーザー設定に基づき、適切な場所で検索結果を開く。
	 * @param {string}	url
	 * @param {DragEvent} event - どのキーを押しているか取得するためのdropイベント。
	 * @param {nsIInputStream} [postData]
	 */
	openSearchResult: function (url, event, postData = null) {
		let where = Application.prefs.getValue(PREF_ROOT + 'where', 'tab');
		if (where === 'current') {
			openUILink(url, event, { postData: postData });
		} else {
			openUILinkIn(url, where, { postData: postData });
		}
	},
};



// 言語の設定
setlang(window.navigator.language);

// ドロップゾーンの作成
let earliestWindow = Application.windows[0]._window;
let earliest = earliestWindow === window;
if (earliest) {
	// Firefox起動時
	// 検索エンジンサービスの初期化を待機
	Services.search.init(function () {
		if (SearchUtils.getDropzoneLength() < 1) {
			// 検索エンジンが1つも登録されていなければ（初回起動なら）、検索窓のエンジンを登録する
			SearchUtils.initializeDropzones();
		}

		DropzoneUtils.create();
		DropzoneUtils.setEventListeners();
		DropzoneUtils.addOpenSettingsOption();
	});

	Services.obs.addObserver(observeBrowserSearchEngine, SEARCH_ENGINE_TOPIC, false);
} else {
	// 新しいウィンドウを開いたとき
	let originalWrapper = earliestWindow.document.getElementById(ID)
	if (!originalWrapper) {
		// 最初に開かれたウィンドウでスクリプトが実行されていなければ、終了
		return;
	}
	DropzoneUtils.wrapper = originalWrapper.cloneNode(true);
	let appContent = document.getElementById('appcontent');
	appContent.insertBefore(DropzoneUtils.wrapper, appContent.firstChild);
	DropzoneUtils.setEventListeners();
	DropzoneUtils.resetDropzones(true);
	DropzoneUtils.addOpenSettingsOption();
}



/**
 * スクリプトが停止していれば真。
 * @type {booelan}
 */
let uninstalled = false;

// 設定画面タブのドラッグ防止
gBrowser.swapBrowsersAndCloseOther = new Proxy(gBrowser.swapBrowsersAndCloseOther, {
	apply: function (func, tabbrowser, argumentList) {
		if (!uninstalled) {
			// アンインストール済みでなければ
			let settingsDocument = Application.storage.get(ID + '_settingsDocument', null);
			if (settingsDocument) {
				// 設定画面が存在すれば
				let [blankTab, targetTab] = argumentList;
				if (targetTab.linkedBrowser.contentDocument === settingsDocument) {
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
	apply: function (func, tabbrowser, argumentList) {
		if (!uninstalled) {
			// アンインストール済みでなければ
			let settingsDocument = Application.storage.get(ID + '_settingsDocument', null);
			if (settingsDocument) {
				// 設定画面が存在すれば
				let [tab] = argumentList;
				if (tab.linkedBrowser.contentDocument === settingsDocument) {
					// 設定画面タブが複製されようとしていれば
					return tab;
				}
			}
		}
		return func.apply(tabbrowser, argumentList);
	},
});

gBrowser.moveTabTo = new Proxy(gBrowser.moveTabTo, {
	apply: function (func, tabbrowser, argumentList) {
		if (!uninstalled) {
			// アンインストール済みでなければ
			let settingsDocument = Application.storage.get(ID + '_settingsDocument', null);
			if (settingsDocument) {
				// 設定画面が存在すれば
				let [tab, index] = argumentList;
				if (tab.linkedBrowser.contentDocument === settingsDocument && tab.ownerGlobal !== window) {
					// 設定画面タブが移動されようとしていれば
					return;
				}
			}
		}
		func.apply(tabbrowser, argumentList);
	},
});

PlacesControllerDragHelper.onDrop = new Proxy(PlacesControllerDragHelper.onDrop, {
	apply: function (func, helper, argumentList) {
		if (!uninstalled) {
			// アンインストール済みでなければ
			let settingsDocument = Application.storage.get(ID + '_settingsDocument', null);
			if (settingsDocument) {
				// 設定画面が存在すれば
				let [insertionPoint, dataTransfer] = argumentList;
				let tab = dataTransfer.mozGetDataAt('application/x-moz-tabbrowser-tab', 0);
				if (tab && tab.linkedBrowser.contentDocument === settingsDocument) {
					// 設定画面タブがドロップされようとしていれば
					return;
				}
			}
		}
		func.apply(helper, argumentList);
	},
});



Services.obs.addObserver(function observe(subject, topic, data) {
	if (data === 'uninstall') {
		// アンインストール時
		uninstalled = true;
		Services.obs.removeObserver(observe, topic);
		document.getElementById(ID + '-menuitem').remove();
		DropzoneUtils.remove();
		DropzoneUtils.removeEventListeners();
		if (earliest) {
			Services.obs.removeObserver(observeBrowserSearchEngine, SEARCH_ENGINE_TOPIC);
		}
	}
}, ID, false);



/**
 * 検索窓のエンジンを追加・削除したときのオブザーバ。
 * @param {Ci.nsISupports} subject
 * @param {string} topic
 * @param {string} data
 */
function observeBrowserSearchEngine(subject, topic, data) {
	let browserEngine = subject.QueryInterface(Ci.nsISearchEngine);
	if (data === SEARCH_ENGINE_ADDED) {
		// 検索窓にエンジンが追加されたとき
		if (Application.prefs.getValue(PREF_ROOT + 'automaticallyReflect', true)) {
			// ドロップゾーンの自動追加が有効なら
			if (SearchUtils.getCustomEngines().every(engine => engine.name !== browserEngine.name)) {
				// 同名のユーザー定義エンジンが登録されていなければ
				let engine = SearchUtils.convertEngineFromBrowser(browserEngine);
				engine.index = SearchUtils.getDropzoneLength();
				SearchUtils.setEngine(engine.index, engine);
				let li = DropzoneUtils.creat(SearchUtils.getBrowserEngineByName(engine.name));
				for (let fuelWindow of Application.windows) {
					fuelWindow._window.document.querySelector('#' + ID + ' ul').appendChild(li.cloneNode(true));
				}
			}
		}
	} else if (data === SEARCH_ENGINE_REMOVED) {
		// 検索窓からエンジンが削除されたとき
		Application.windows.forEach(function (fuelWindow, i) {
			let li = fuelWindow._window.document.querySelector('#' + ID + ' [data-name=' + quoteString(browserEngine.name) + ']');
			if (i === 0) {
				SearchUtils.enginesBranch.deleteBranch(li.dataset.engineIndex + '.');
			}
			li.remove();
		});
	}
}

/**
 * 設定画面を開く。
 */
function openSettings() {
	let settingsDocument = Application.storage.get(ID + '_settingsDocument', null);
	if (settingsDocument) {
		// すでに開いていれば
		if (!Cu.isDeadWrapper(settingsDocument)) {
			let browserTab = getBrowserTab(settingsDocument);
			if (browserTab) {
				// 最前面に
				browserTab.window._window.focus();
				browserTab.focus();
				return;
			}
		}
		Application.storage.set(ID + '_settingsDocument', null);
	}

	let tab = getFuelWindow().open(NetUtil.newURI('about:blank'));
	tab.events.addListener('load', showSettings);
	tab.focus();
}

/**
 * すべてのウィンドウから、指定した文書に対応するブラウザタブを捜す。
 * @param {Document} doc
 * @returns {?Ci.fuelIBrowserTab}
 */
function getBrowserTab(doc) {
	for (let fuelWindow of Application.windows) {
		let index = fuelWindow._window.gBrowser.getBrowserIndexForDocument(doc);
		if (index !== -1) {
			return fuelWindow.tabs[index];
		}
	}
	return null;
}

/**
 * イベントが発生したタブに設定画面を描画する。
 * @param {Ci.extIEventItem} event - loadイベント。
 * @param {Ci.fuelIBrowserTab} event.data
 */
function showSettings(event) {
	let browserTab = event.data;

	if (browserTab.uri.spec !== 'about:blank') {
		// 同じタブで別のページが開かれたら
		browserTab.events.removeListener(event.type, showSettings);
		return;
	}

	let doc = browserTab.document, win = doc.defaultView;
	Application.storage.set(ID + '_settingsDocument', doc);
	doc.title = NAME;

	let link = doc.createElement('link');
	link.rel = 'icon';
	link.href = MENUITEM_ICON;
	doc.head.appendChild(link);

	// スタイルの設定
	let styleSheet = doc.head.appendChild(doc.createElement('style')).sheet;
	let cssRules = styleSheet.cssRules;
	// Bug 906353 – Add support for css4 selector :matches(), the standard of :-moz-any(). <https://bugzilla.mozilla.org/show_bug.cgi?id=906353>
	[
		':root {'
				+ 'height: 100%;'
				+ 'color: -moz-DialogText;'
				+ 'background: -moz-Dialog;'
				+ '}',

		// 行のドラッグ
		'[draggable="true"],' +
		'[draggable="true"] [readonly]:not([name="name"]),' +
		'td table [readonly] {'
				+ 'cursor: move;'
				+ '}',

		'[name="name"] {'
				+ 'width: 150px;'
				+ '}',

		'[name="url"] {'
				+ 'width: 400px;'
				+ '}',

		'input:not([type]), [type="text"], [type="url"] {'
				+ 'width: 100%;'
				+ '}',

		// 検索窓のエンジン
		'.browser-search-engine {'
				+ 'font: -moz-field;'
				+ '}',
		'.browser-search-engine > :not(:first-child):not(:last-child) {'
				+ 'padding-left: 8px;'
				+ '}',
		'.browser-search-engine input {'
				+ 'margin-left: -2px;'
				+ 'background-color: transparent;'
				+ 'border: none;'
				+ 'text-overflow: ellipsis ellipsis;'
				+ '}',

		// 行の背景色・枠線
		'table {'
				+ 'border-collapse: collapse;'
				+ 'width: 100%;'
				+ '}',
		'thead th {'
				+ '-moz-appearance: treeheadercell;'
				+ 'font-weight: normal;'
				+ '}',
		'th, td {'
				+ 'padding: 3px;'
				+ '}',
		'tbody > tr {'
				+ 'background: whitesmoke;'
				+ '}',
		'tbody > tr:nth-child(2n) {'
				+ 'background: gainsboro;'
				+ '}',
		'thead {'
				+ 'border-top: solid 1px gray;'
				+ 'border-left: solid 1px gray;'
				+ 'border-right: solid 1px gray;'
				+ '}',
		'tbody {'
				+ 'border-left: solid 1px gray;'
				+ 'border-bottom: solid 1px gray;'
				+ 'border-right: solid 1px gray;'
				+ '}',

		// 行の追加ボタン
		'tfoot td {'
				+ 'padding: 0;'
				+ '}',
		'[name="add-row"]::before {'
				+ 'content: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAtElEQVR42sXTvwuCQBjG8e7feAkaa2hUorEb+jF1DeJSqFBLiK1Bf/xTj8TLoQ6eIQ0fOE75cveiEwA/GT1gaGhAfKEB8yHTRQz6BkxwYGUdKCRgPGLdBaQB1R2Qpl1SgLqeacA/8my5xjza1GJ7RFJUxLXu8x09UTMQWYdDeq25rERevYhr3Y+8mXRdYe87358grhuk1xBP+QPUb4jtkLisAg3+DrbpDRQeaM9E/vIzqVEDb9gqPHy3H+TDAAAAAElFTkSuQmCC");'
				+ 'margin-right: 0.5em;'
				+ 'vertical-align: -4px;'
				+ '}',
		'[name="add-row"] {'
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
		'[name="add-row"]:not([disabled]):-moz-any(:hover, :focus, :active) {'
				+ 'background: gainsboro;'
				+ '}',

		// キャンセル・OKボタン
		'#submit-buttons {'
				+ 'text-align: right;'
				+ '}',
		'#submit-buttons button {'
				+ 'margin-left: 1em;'
				+ '}',
		'button:not([type]), button[type="submit"] {'
				+ 'font-size: 2em;'
				+ '}',

		// その他の操作
		':not(td) > select {'
				+ 'margin-left: 0.5em;'
				+ '}',
		'form > label {'
				+ 'display: block;'
				+ '}',

		// キーボードショートカット
		'#shortcut-keys ul {'
				+ 'list-style: none;'
				+ 'padding-left: 0;'
				+ '}',
		'#shortcut-keys :not(kbd) > kbd:last-of-type::after {'
				+ 'margin-right: 1em;'
				+ 'content: ":";'
				+ '}',
		'kbd kbd {'
				+ 'font-size: 0.75em;'
				+ 'border-radius: 0.5em;'
				+ 'border-style: solid;'
				+ 'border-width: 0.15em 0.3em 0.45em;'
				+ 'border-color: rgba(0,0,0,0.2) rgba(0,0,0,0.1) rgba(255,255,255,0.2);'
				+ 'background-origin: border-box;'
				+ 'background: gainsboro;'
				+ 'color: black;'
				+ 'display: inline-flex;'
				+ 'align-items: center;'
				+ '-moz-box-sizing: border-box;'
				+ 'box-sizing: border-box;'
				+ 'padding-left: 0.3em;'
				+ 'width: 3em;'
				+ 'height: 3em;'
				+ 'margin-left: 0.2em;'
				+ 'margin-right: 0.2em;'
				+ '}',
		'.control {'
				+ 'width: 4em;'
				+ 'color: transparent;'
				+ '}',
		'.control::before {'
				+ 'content: "Ctrl";'
				+ 'color: black;'
				+ '}',
		'.shift {'
				+ 'width: 5em;'
				+ '}',
		'.shift::before {'
				+ 'content: "⇧";'
				+ 'margin-right: 0.2em;'
				+ '}',
		'.alt {'
				+ 'color: darkcyan;'
				+ '}',
		'.enter {'
				+ 'width: 4.5em;'
				+ 'height: 5em;'
				+ '}',
		'.enter::after {'
				+ 'content: "⏎";'
				+ '}',

		'td {'
				+ 'height: 100%;'	// セル内で高さのパーセント指定が使えるように
				+ '}',

		// アイコン
		'td > img {'
				+ 'display: block;'
				+ 'margin-left: auto;'
				+ 'margin-right: auto;'
				+ '}',
		'[name="icon"] {'
				+ 'width: 100%;'
				+ 'height: 100%;'
				+ '}',

		// 行の削除ボタン
		'[name="delete"] {'
				+ 'border: none;'
				+ 'padding: 0;'
				+ 'background: transparent;'
				+ 'width: 100%;'
				+ 'height: 100%;'
				+ 'overflow: hidden;'
				+ 'border-radius: 0.5em;'
				+ '}',
		'[name="delete"]:not([disabled]):-moz-any(:hover, :focus, :active) {'
				+ 'box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3) inset, -1px 0 2px rgba(0, 0, 0, 0.3) inset, 0 -1px 1px rgba(255, 255, 255, 0.3) inset;'
				+ '}',
		'[name="delete"]:not([disabled]):active {'
				+ 'background-color: lightcoral;'
				+ '}',
		'tbody tr:only-of-type [name="delete"] {'
				// 行が一つだけなら、削除ボタンは表示しない
				+ 'visibility: hidden;'
				+ '}',
		// Bug 895182 – [CSS Filters] Implement parsing for blur, brightness, contrast, grayscale, invert, opacity, saturate, sepia <https://bugzilla.mozilla.org/show_bug.cgi?id=895182>
		'[name="delete"] img {'
				+ 'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABDklEQVQoz3WRv0oDQRCHv93bk4NgaxFtzhQWwUbb9CkECznUIlZp8i6+gY2NVZCAjZUpgg9gYR2DcPoACYTg3e5Y7J4X/82P3WJm+O3sN0oUsH4ApD4GUN8E8iXAhLQO8uGCqBw0UZB3sFgs4CoHTURMvNZQhKfQoWzSQWPS7pOQtPuNSTrAEKHR1ZB6Nj5t3ncPBF67Rw/DMRqFQpQYDDEbJLR6J7fbkL3djJiy4oMCMdSRL+dbmyWLOXmdNAGM4A7PF52zJ8uws796vq45hPLeRZEdP17ewdKMst3y5cq3KIn8L2iR8k4O7NBkxpQSC0o8wb9AWQ8KBBdu+wO1gPGj4BDcr2VJ5QDy37o/ASA8darOg/vVAAAAAElFTkSuQmCC");'
				+ '}',
		'[name="delete"]:active img {'
				+ 'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAABBklEQVQoz32RP0sDQRDFf/vnIAQObAQJgkQhRcBvELAMWEoIWlilyRfwy9hYqySgYGeKYK0WkiKFHsKhYBkICmZvLXYuZw5xHrPFzPD28Z5CwUoD+KItoFYAfgnAylgLQmUCcgaNEQQGh8MBWc6gMUREvw6+5Su0rG3Sn48nPSpUJr35OOljMWh0LlLXRxe1/faDh632zW13hEah8AYdGPi8fG+u7TXWN4bTowGvuCDTUlRanX3ElnhGWgytGOPJ7g/j1vmjodt6+to9K3yQ9fQ46lzfnVxB1R50Xhbbp+FEYUTDDnXeSIFNaiQ8s8Cx9PAvo1wu0pPJ60pW+3JQ5bDk4N+4fwD4m2u8dB+ciAAAAABJRU5ErkJggg==");'
				+ '}',

		// 行の移動
		'.active-dropzone-above {'
				+ 'border-top: solid 0.5em lightblue;'
				+ '}',
		'.active-dropzone-below {'
				+ 'border-bottom: solid 0.5em lightblue;'
				+ '}',

		// POSTパラメータの開閉ボタン
		'td > div {'
				+ 'display: flex;'
				+ 'align-items: flex-start;'
				+ '}',
		'[name="url"] {'
				+ 'flex-grow: 1;'
				+ '}',
		'[name="params"] {'
				+ 'display: none;'
				+ 'white-space: nowrap;'
				+ 'border: 1px solid lightblue;'
				+ 'box-shadow: 0px -2px 0px rgba(204, 223, 243, 0.3) inset, 0px 0px 1px rgba(0, 0, 0, 0.1);'
				+ 'border-radius: 5px;'
				+ 'background: linear-gradient(ghostwhite, aliceblue)  ghostwhite;'
				+ 'vertical-align: middle;'
				+ '}',
		'[name="params"]::after {'
				+ 'content: "";'
				+ 'display: inline-block;'
				+ 'width: 20px;'
				+ 'height: 20px;'
				+ 'background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAADUCAYAAACcYQO5AAAEdElEQVR4nO2avWsbSRjGBQaDQWAwBAyuDAEXwa3BxQVlZwwGVy70F6g6N8YhiqUZCCoC7rawWM37QCAQcKPCYDA4JDj6mCGQ1lXAkMqVwGAwGAQBXeFdZbxaSZvzHtxx84MttDv7aD/ebR5+udx/BiI6JiL4vj+X9pwgCPJEBCI6TgosARgQ0Xel1Nq0MKXUGoDL8JxS4iIAZQADAH2llCwWizPxNcVicYaI3gD4Ga4tT/xnAAfhwgERfa3X68vRsXq9vkxE36LjAA6m3UkU2rBCb4moFG63VlgjVVh0WwCOrJPj21HS45hIrVabBXCaEHZaq9VmpwYQ0Uaj0Vix9/m+PwdAW2E6PlaNRmOFiDZHAgG0iegOwJ/2/iAI8kopCaAcDyOi3fCc9kig7/sLAC7CF3F2eHj4ZNzdKKWWiOgsvOoL3/cXxi6MhhVATym1nbBmG0AvXHOplFoa98e5XG44a1fW2CAIgnz4mb2z9l8FQfB0YlgEgFXrKgYAfoRb9PsawGqqMOvW1mKDPBz0NN/6uFAPQN8K7CulvL8VFgFgK7zSGyLaeFSYw+FwOBwOh8PhcDgc/3eY0MdMaKzvNVP3h4WdVp4JDSb0aH/IqqbEpRkwab57sju1U/Bkd40Lc8mlGbCqSe4PueiWuTQDLk3fE1rmis3RwqzYnGHV7hsu9E8uzYCL7uT+kEt9EIYOmDBfn7/qDPvD5686y0zob9FxLnW6/pAL0xiGSn3LqqbEqqbEpL4dhgmTvj/MFZszXOijX1cS24Q+Snwck3hWbM5yYU5Hw8zps2Jzen/IhNl48frLg/5wfa85x6XW1jPT8bF68frLCqvo0f6QC91mwtzxavdBf1jYaeU9oSUX3XI8jAm9y4S540K3RwLX9z4ucGkuwhdx9ke1O7Y/9OT5EpP6LLzyi/W9j8n9oSfPl6Jh5UL3PKlH+kNP6m0udC98npeePJ/cH97Pmrn6NYsahZ1WvrDTyjOp31kzelWotNL1h3y/szq8ivuX8eN+G77ta77f+b3+0JPdtQeDbA16mm89ObTS8bg0fSuw71U6j+sPuehuMalvuTA3TBjXHzocDofD4XA4HA6Hw/FPAGArdJR6jxZ4MlWMMpWgUmhavdSaVoJI9j4SyQB8sEUyW3ZMJAiCxZSq202kugVBsDjuNudtGW+SExfKeJ8iGQ/AfFJgm4juiGjX3h86iJUxuuDLsbogEW2OERrb1stox0MBrCYKjXFC5fIkQbk8SaVcxslUCs1UWwXw1gp7nFiLLNXfzOXkzPVph8PhcDgcDofD4XA4HOnhorvFpbnmQvceLfBkqhhlKkFN1bSE7qXWtEZFMvM+Esm41B9skcyWHRMplFuL6VQ3cxOpboVyK7k/5Puf520Zb5IT58nzJSb0p0jG4/ufR/vDSBdkQj/oD9f3mnO8aiqJumBVvxyrC7KK3kwUGoVuWy+jHQ/l+53VRKExTqhcniQolyeplMs4mUqhmWqrXOi3mYm1maq/mcvJmevT/1r+Ahtz/abguyZRAAAAAElFTkSuQmCC");'
				+ 'vertical-align: middle;'
				+ '}',
		'[name="params"]:not([disabled]):-moz-any(:hover, :focus, :active)::after {'
				+ 'background-position: 0 -64px;'
				+ '}',

		// データの種類
		'[name="accept"] :not([value="text/plain"]) {'
				+ 'display: none;'
				+ '}',

		// POSTメソッドが選択されているとき
		'.post [name="url"] {'
				+ 'width: auto;'
				+ '}',
		'.post [name="params"] {'
				+ 'display: inline-block;'
				+ '}',
		'.post [name="accept"] option {'
				+ 'display: block;'
				+ '}',

		// POSTパラメータ
		'td table {'
				+ 'display: none;'
				+ 'border: 1px solid lightblue;'
				+ 'border-collapse: separate;'
				+ 'border-radius: 5px 0 5px 5px;'
				+ 'background: linear-gradient(aliceblue, lavender)  aliceblue;'
				+ 'margin-top: -2px;'
				+ '}',
		'td table tr {'
				+ 'background: transparent !important;'
				+ '}',
		'td table td {'
				+ 'padding-left: 0;'
				+ 'padding-right: 0;'
				+ '}',
		'td table [name="add-row"] {'
				+ 'background: linear-gradient(aliceblue, lavender);'
				+ 'border: darkgray solid 1px;'
				+ 'border-radius: 5px;'
				+ '}',
		'td table [name="add-row"]:not([disabled]):-moz-any(:hover, :focus, :active) {'
				+ 'background: aliceblue;'
				+ '}',

		// POSTパラメータ展開時
		'.displaying-post-params > * {'
				+ 'vertical-align: top;'
				+ '}',
		'.displaying-post-params > td > [name="delete"] {'
				+ 'height: 1.6em;'
				+ '}',
		'.displaying-post-params [name="params"] {'
				+ 'border-bottom: none;'
				+ 'border-bottom-left-radius: 0;'
				+ 'border-bottom-right-radius: 0;'
				+ 'box-shadow: none;'
				+ '}',
		'[name="params"]:not([disabled]):-moz-any(:hover, :focus, :active)::after {'
				+ 'background-position: 0 -64px;'
				+ '}',
		'.displaying-post-params [name="params"]::after {'
				+ 'background-position: 0 -128px;'
				+ '}',
		'.displaying-post-params [name="params"]:not([disabled]):-moz-any(:hover, :focus, :active)::after {'
				+ 'background-position: 0 -192px;'
				+ '}',
		'.displaying-post-params table {'
				+ 'display: table;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	let row, cell, input, select, option, menu, button, img, div, label, section, kbd, key, li, dl;

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
	row = template.appendChild(doc.createElement('tr'));

	// アイコン
	headRow.appendChild(doc.createElement('th'));
	cell = row.insertCell();
	cell.draggable = true;
	input = doc.createElement('button');
	input.type = 'menu';
	input.name = 'icon';
	input.title = _('アイコンを変更');
	img = new Image(16, 16);
	img.src = DEFAULT_ICON_DATA;
	img.alt = '';
	input.appendChild(img);
	cell.appendChild(input);

	menu = doc.body.appendChild(createMenu({
		'set-icon-from-local-file': _('ローカルファイルからアイコンを設定'),
		'set-icon-from-url': _('Webページ、または画像ファイルのURLからアイコンを設定'),
		'set-icon-from-clipboard': _('クリップボードのURL、または画像データからアイコンを設定'),
		'restore-default-icon': _('元のアイコンに戻す'),
	}, 'icon-menu'));
	input.setAttribute('menu', menu.id);

	// 検索エンジン名
	headRow.appendChild(doc.createElement('th')).textContent = _('検索エンジン名');
	cell = row.appendChild(doc.createElement('th'));
	input = doc.createElement('input');
	input.name = 'name';
	cell.appendChild(input);

	// URL
	headRow.appendChild(doc.createElement('th')).textContent = _('URL・POSTパラメータ');
	cell = row.insertCell();
	let urlWrapper = doc.createElement('div');
	input = doc.createElement('input');
	input.name = 'url';
	input.type = 'url';
	urlWrapper.appendChild(input);

	// POSTパラメータ開閉ボタン
	let params = doc.createElement('button');
	params.draggable = true;
	params.type = 'button';
	params.name = 'params';
	params.textContent = _('POSTパラメータの設定');
	urlWrapper.appendChild(params);
	cell.appendChild(urlWrapper);

	// POSTパラメータ
	let paramsTable = doc.createElement('table');
	if(!('createTBody' in paramsTable)){
		// Firefox 24 ESR
		paramsTable.createTBody = function () {
			var tBodies = this.tBodies;
			var tBodiesLength = tBodies.length;
			return this.insertBefore(doc.createElement('tbody'), tBodiesLength > 0 ? tBodies[tBodiesLength - 1].nextSibling : null);
		}
	}

	let paramsTbody = paramsTable.createTBody();
	let paramsTemplate = doc.createElement('template');
	let paramsRow = paramsTemplate.appendChild(doc.createElement('tr'));
	input = paramsRow.insertCell().appendChild(doc.createElement('input'));
	input.name = 'post-param-name';
	input.placeholder = _('名前');
	input = paramsRow.insertCell().appendChild(doc.createElement('input'));
	input.name = 'post-param-value';
	input.placeholder = _('値');

	// 行を削除するボタン
	let cellContainingDeleteRowButton = paramsRow.insertCell();
	button = doc.createElement('button');
	button.name = 'delete';
	button.type = 'button';
	img = new Image();
	button.title = img.alt = _('行を削除');
	img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAAxJREFUCNdjYCANAAAAMAABx6qFjgAAAABJRU5ErkJggg==';
	button.appendChild(img);
	cellContainingDeleteRowButton.appendChild(button);
	paramsRow.appendChild(cellContainingDeleteRowButton);

	// 行を追加するボタン
	let tfootContainingAddRowButton = paramsTable.createTFoot();
	button = doc.createElement('button');
	button.name = 'add-row';
	button.type = 'button';
	button.textContent = _('行を追加');
	let paramsCell = tfootContainingAddRowButton.insertRow().insertCell();
	paramsCell.colSpan = paramsRow.cells.length;
	paramsCell.appendChild(button);

	paramsTbody.appendChild(paramsTemplate);
	cell.appendChild(paramsTable);

	// メソッド
	headRow.appendChild(doc.createElement('th')).textContent = _('メソッド');
	cell = row.insertCell();
	cell.draggable = true;
	select = doc.createElement('select');
	select.name = 'method';
	select.add(new Option(_('GET'), 'GET'));
	select.add(new Option(_('POST'), 'POST'));
	cell.appendChild(select);

	// データの種類
	headRow.appendChild(doc.createElement('th')).textContent = _('データの種類');
	cell = row.insertCell();
	cell.draggable = true;
	select = doc.createElement('select');
	select.name = 'accept';
	select.add(new Option(_('文字列'), 'text/plain'), true);
	select.add(new Option(_('画像'), 'image/*'));
	select.add(new Option(_('音声'), 'audio/*'));
	cell.appendChild(select);

	// 文字符号化方式
	headRow.appendChild(doc.createElement('th')).textContent = _('文字符号化方式');
	cell = row.insertCell();
	cell.draggable = true;

	let encodingSelect = document.createElementNS(HTML_NS, 'select');
	encodingSelect.hidden = true;
	encodingSelect.setAttribute('datasources', 'rdf:charset-menu');
	encodingSelect.setAttribute('ref', 'NC:DecodersRoot');
	let encodingTemplate = document.createElementNS(XUL_NS, 'template');
	let option = new Option('', '...');
	option.setAttribute('uri', '...');
	option.label = 'rdf:http://home.netscape.com/NC-rdf#Name';
	encodingTemplate.appendChild(option);
	encodingSelect.appendChild(encodingTemplate);
	document.documentElement.appendChild(encodingSelect);
	Services.obs.notifyObservers(null, 'charsetmenu-selected', 'other');

	select = encodingSelect.cloneNode(true);
	encodingSelect.remove();
	select.hidden = false;
	select.name = 'encoding';
	select.namedItem(THE_ENCODING).defaultSelected = true;
	for (let option of select.options) {
		option.removeAttribute('id');
		// Bug 40545 – (option-label) LABELs don't work for OPTIONs (<option label> in selects) <https://bugzilla.mozilla.org/show_bug.cgi?id=40545>
		option.text = option.label;
		option.removeAttribute('label');
	}
	cell.appendChild(select);

	// 行を削除するボタン
	headRow.appendChild(doc.createElement('th'));
	row.appendChild(cellContainingDeleteRowButton.cloneNode(true)).draggable = true;

	template.appendChild(row);
	tbody.appendChild(template);

	// 行のコンテキストメニュー
	row.setAttribute('contextmenu', doc.body.appendChild(createMenu({
		'add-row-above': _('上に新しい行を挿入'),
		'add-row-below': _('下に新しい行を挿入'),
	}, 'row-contextmenu')).id);

	// 行追加ボタン
	let tfoot = tfootContainingAddRowButton.cloneNode(true);
	tfoot.getElementsByTagName('td')[0].colSpan = paramsRow.cells.length;
	table.insertBefore(tfoot, table.tBodies[0]);

	form.appendChild(table);

	div = doc.createElement('div');
	div.id = 'submit-buttons';

	// アイコン一括取得ボタン
	button = doc.createElement('button');
	button.name = 'get-icons';
	button.type = 'button';
	button.textContent = _('アイコンを一括取得');
	button.title = _('アイコン未取得の検索エンジンについて、URLを基にアイコンを取得します。アイコンボタンのポップアップメニューの「元のアイコンに戻す」から、個別に取得することもできます。');
	div.appendChild(button);

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

	// ブラウザの検索エンジンの追加
	div = doc.createElement('div');
	div.textContent = _('検索窓のエンジンの追加') + ':';
	let addingBrowserEngine = doc.createElement('select');
	addingBrowserEngine.name = 'add-browser-engine';
	addingBrowserEngine.add(new Option(_('選択してください', '', true, true)));
	div.appendChild(addingBrowserEngine);
	form.appendChild(div);
	if (!('selectedOptions' in addingBrowserEngine)) {
		// Firefox 24 ESR
		Object.defineProperty(addingBrowserEngine, 'selectedOptions', {
			enumerable: false,
			configurable: true,
			get: function () {
				return this.querySelectorAll(':checked');
			},
		})
	}

	// 検索結果を開く場所
	label = doc.createElement('label');
	label.textContent = _('検索結果を開く場所') + ':';
	select = doc.createElement('select');
	select.name = 'where';
	select.add(new Option(_('現在のタブ。Ctrl、Shiftキーを押していれば、それぞれ新しいタブ、ウィンドウ'), 'current'));
	select.add(new Option(_('新しいタブ'), 'tab'));
	select.add(new Option(_('新しいウィンドウ'), 'window'));
	select.value = Application.prefs.getValue(PREF_ROOT + 'where', 'tab');
	label.appendChild(select);
	form.appendChild(label);

	// 検索エンジンの自動追加
	label = doc.createElement('label');
	let automaticallyReflect = doc.createElement('input');
	automaticallyReflect.name = 'automatically-reflect';
	automaticallyReflect.type = 'checkbox';
	automaticallyReflect.checked = Application.prefs.getValue(PREF_ROOT + 'automaticallyReflect', true);
	label.appendChild(automaticallyReflect);
	label.appendChild(new Text(_('検索窓に新しい検索エンジンが追加されたとき、自動的にドロップゾーンとしても追加する。（※すでに同名のユーザー定義エンジンが存在した場合は何もしない）')));
	form.appendChild(label);

	doc.body.appendChild(form);

	// 説明
	section = doc.createElement('section');
	let manual = doc.createElement('ul');
	manual.appendChild(doc.createElement('li')).textContent = _('行をドラッグ & ドロップで、順番を変更できます。');
	manual.appendChild(doc.createElement('li')).textContent = _('アイコンボタンのポップアップメニューから、アイコンを変更できます。検索窓のエンジンのアイコンは変更できません。');
	section.appendChild(manual);
	doc.body.appendChild(section);

	// ショートカットの説明
	section = doc.createElement('section');
	section.id = 'shortcut-keys';
	section.appendChild(doc.createElement('h1')).textContent = _('テキスト入力欄のキーボードショートカット');
	let shortcuts = doc.createElement('ul');

	li = doc.createElement('li');
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Shift';
	key.classList.add('shift');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	key = doc.createElement('kbd');
	key.textContent = 'Enter';
	key.classList.add('enter');
	kbd.appendChild(key);
	li.appendChild(kbd);
	li.appendChild(new Text(_('上に新しい行を挿入します。')));
	shortcuts.appendChild(li);

	li = doc.createElement('li');
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Control';
	key.classList.add('control');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	key = doc.createElement('kbd');
	key.textContent = 'Enter';
	key.classList.add('enter');
	kbd.appendChild(key);
	li.appendChild(kbd);
	li.appendChild(new Text(_('または')));
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Alt';
	key.classList.add('alt');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	key = doc.createElement('kbd');
	key.textContent = 'Enter';
	key.classList.add('enter');
	kbd.appendChild(key);
	li.appendChild(kbd);
	li.appendChild(new Text(_('下に新しい行を挿入します。')));
	shortcuts.appendChild(li);

	li = doc.createElement('li');
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Control';
	key.classList.add('control');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	kbd.appendChild(doc.createElement('kbd')).textContent = '↑';
	li.appendChild(kbd);
	li.appendChild(new Text(_('または')));
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Alt';
	key.classList.add('alt');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	kbd.appendChild(doc.createElement('kbd')).textContent = '↑';
	li.appendChild(kbd);
	li.appendChild(new Text(_('上の行に移動します。')));
	shortcuts.appendChild(li);

	li = doc.createElement('li');
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Control';
	key.classList.add('control');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	kbd.appendChild(doc.createElement('kbd')).textContent = '↓';
	li.appendChild(kbd);
	li.appendChild(new Text(_('または')));
	kbd = doc.createElement('kbd');
	key = doc.createElement('kbd');
	key.textContent = 'Alt';
	key.classList.add('alt');
	kbd.appendChild(key);
	kbd.appendChild(new Text('+'));
	kbd.appendChild(doc.createElement('kbd')).textContent = '↓';
	li.appendChild(kbd);
	li.appendChild(new Text(_('下の行に移動します。')));
	shortcuts.appendChild(li);

	section.appendChild(shortcuts);
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
	dl.appendChild(doc.createElement('dd')).textContent = _('現在の設定をすべて削除し、XMLファイルから設定をインポートします。ブラウザの検索エンジンサービスに同名の検索エンジンが存在する場合は、そちらを優先します。');

	button = doc.createElement('button');
	button.name = 'additional-import';
	button.type = 'button';
	button.textContent = _('追加インポート');
	dl.appendChild(doc.createElement('dt')).appendChild(button);
	dl.appendChild(doc.createElement('dd')).textContent = _('XMLファイルから検索エンジンを追加します。同名の検索エンジンがすでに存在する場合は上書きします。');

	button = doc.createElement('button');
	button.name = 'import-from-text';
	button.type = 'button';
	button.textContent = _('JSON文字列から追加インポート');
	dl.appendChild(doc.createElement('dt')).appendChild(button);
	dl.appendChild(doc.createElement('dd')).textContent = _('本スクリプトのバージョン1でエクスポートしたJSON文字列から、検索エンジンを追加します。');

	section.appendChild(dl);
	doc.body.appendChild(section);

	// 初期化やアンインストールについて
	section = doc.createElement('section');
	section.appendChild(doc.createElement('h1')).textContent = _('その他');
	let dl = doc.createElement('dl');

	button = doc.createElement('button');
	button.name = 'initialize';
	button.type = 'button';
	button.textContent = _('設定を初期化');
	dl.appendChild(doc.createElement('dt')).appendChild(button);
	dl.appendChild(doc.createElement('dd')).textContent = _('すべての設定を削除し、初回起動時の状態に戻します。');

	button = doc.createElement('button');
	button.name = 'uninstall';
	button.type = 'button';
	button.textContent = _('すべての設定を削除');
	dl.appendChild(doc.createElement('dt')).appendChild(button);
	dl.appendChild(doc.createElement('dd')).textContent = _('すべての設定を削除し、スクリプトを停止します。');

	section.appendChild(dl);
	doc.body.appendChild(section);

	/**
	 * メニューを作成する
	 * @param {Object} commands - キーがmenuitem要素のid属性値、値がlabel属性値の連想配列
	 * @param {string} id - menu要素のid属性値
	 * @returns {HTMLMenuElement} menu要素
	 */
	function createMenu(commands, id) {
		let menu = document.createElementNS(HTML_NS, 'menu');
		menu.id = id;
		for (let id in commands) {
			let menuitem = document.createElementNS(HTML_NS, 'menuitem');
			menuitem.id = id;
			menuitem.label = commands[id];
			menu.appendChild(menuitem);
		}
		if (menu.type !== 'popup') {
			// Bug 897102 – Update <menu> to spec <https://bugzilla.mozilla.org/show_bug.cgi?id=897102>
			menu.type = 'context';
		}
		return menu;
	}

	////////////////////////////////////////////////
	//////// 以上テンプレートリテラル化予定 ////////
	////////////////////////////////////////////////

	// ブラウザの検索エンジンを追加するセレクトボックス
	for (let engine of SearchUtils.getBrowserEngines()) {
		let option = new Option(engine.name);
		option.label = engine.name;
		option.dataset.engine = JSON.stringify(engine);
		addingBrowserEngine.add(option);
	}

	/**
	 * 指定された位置に行を挿入する。
	 * @param {SearchEngine} [engine] - 指定しなかった場合は空行を挿入する。
	 * @param {SearchEngine} [child] - 指定しなかった場合は表本体の末尾に追加する。
	 */
	let insertEngine = function () {
		let tbody = doc.getElementsByTagName('tbody')[0];
		let rowTemplate = tbody.querySelector('template tr');
		return function (engine, child) {
			let row = rowTemplate.cloneNode(true);
			if (engine) {
				modifyAddingBrowserEngine('disable', engine.name);
				if (engine.browserSearchEngine) {
					// ブラウザの検索エンジンなら
					row.classList.add('browser-search-engine');
				} else {
					if (engine.method === 'POST') {
						// POSTメソッド
						row.classList.add('post');
					}
				}
				for (let input of row.querySelectorAll('[name]')) {
					let name = input.name;
					if (engine[name]) {
						if (name === 'params') {
							// POSTパラメータなら
							if (!engine.browserSearchEngine) {
								let params = engine[name] || [];
								if (engine.browserSearchEngine) {
									// ブラウザの検索エンジンなら
									row.getElementsByTagName('tfoot')[0].remove();
								} else {
									params = params.concat([['', '']]);
								}
								let tbody = row.getElementsByTagName('tbody')[0];
								let rowTemplate = tbody.querySelector('template tr');
								params.forEach(function ([name, value]) {
									let row = rowTemplate.cloneNode(true);
									let nameInput = row.querySelector('[name="post-param-name"]');
									let valueInput = row.querySelector('[name="post-param-value"]');
									nameInput.value = name;
									valueInput.value = value;
									if (engine.browserSearchEngine) {
										// ブラウザの検索エンジンなら
										nameInput.readOnly = true;
										valueInput.readOnly = true;
										row.querySelector('[name="delete"]').remove();
									}
									tbody.appendChild(row);
								});
							}
						} else {
							if (engine[name]) {
								input.value = engine[name];
							}
							if (engine.browserSearchEngine) {
								// ブラウザの検索エンジンなら
								switch (name) {
									case 'name':
										input.readOnly = true;
										break;
									case 'url':
										input.readOnly = true;
										if (engine.method === 'POST') {
											let url;
											try {
												url = NetUtil.newURI(engine[name]).QueryInterface(Ci.nsIURL);
											} catch (e) {
												if (e.result === Cr.NS_ERROR_MALFORMED_URI || e.result === Cr.NS_NOINTERFACE) {
													// 妥当なURLでなければ
													return;
												} else {
													throw e;
												}
											}
											let searchParams = new URLSearchParams(url.query);
											for (let [name, value] of engine.params) {
												searchParams.append(name, value);
											}
											url.query = searchParams.toString().replace(/%7BsearchTerms%7D/g, '{searchTerms}');
											input.value = url.spec;
										}
										break;
									case 'icon':
										let cell = getParentElementByTagName(input, 'td');
										let img = input.firstElementChild;
										cell.replaceChild(img, input);
										img.src = engine[name] || DEFAULT_ICON_DATA;
										break;
									default:
										let value;
										if (input.localName === 'select') {
											if (!('selectedOptions' in input)) {
												// Firefox 24 ESR
												Object.defineProperty(input, 'selectedOptions', {
													enumerable: false,
													configurable: true,
													get: function () {
														return this.querySelectorAll(':checked');
													},
												})
											}
											value = input.selectedOptions[0].text;
										} else {
											value = input.value;
										}
										getParentElementByTagName(input, 'td').textContent = value;
								}
							}
							switch (name) {
								case 'icon':
									if (!engine.browserSearchEngine && engine[name]) {
										input.firstElementChild.src = engine[name];
									}
									break;
								case 'name':
									input.dataset.value = engine[name];
									break;
							}
						}
					}
				}
			}
			tbody.insertBefore(row, child);
		};
	}();

	// 各ドロップゾーンを作成する
	for (let engine of SearchUtils.getEngines().concat([null])) {
		insertEngine(engine);
	}

	/**
	 * 「検索窓のエンジンの追加」プルダウンメニューのエンジンの有効化・無効化。
	 * @param {string} operation - enable または disable。
	 * @param {string} name - 検索エンジン名。
	 */
	function modifyAddingBrowserEngine(operation, name) {
		let option = addingBrowserEngine.querySelector('[label=' + quoteString(name) + ']' + (operation === 'enable' ? '[hidden]' : ':not([hidden])'));
		if (option) {
			option.hidden = operation !== 'enable';
			addingBrowserEngine.disabled = !addingBrowserEngine.querySelector('[label]:not([hidden])');
		}
	}

	/**
	 * 指定したノードを含む行を返す。
	 * @param {Node} childNode
	 * @returns {?HTMLTableRowElement}
	 */
	let getParentRow = (function () {
		let rowsTreeWalker = doc.createTreeWalker(table, NodeFilter.SHOW_ELEMENT, function (node) {
			return node.localName === 'tr' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
		});
		return function (childNode) {
			if (childNode.localName === 'tr') {
				return childNode;
			} else {
				rowsTreeWalker.currentNode = childNode;
				return rowsTreeWalker.parentNode();
			}
		};
	})();

	// コンテキストメニューの動作
	let selectedElement;
	tbody.addEventListener('contextmenu', function (event) {
		// 選択された要素を取得しておく
		selectedElement = event.target;
	});

	/**
	 * 指定した位置に空行を作成。
	 * @param {HTMLElement} target - 挿入位置の基準になる行に含まれる要素、または行を追加するtable要素 。
	 * @param {boolean} [insertingBefore=false] - 基準になる行の上に挿入するならtrue。
	 * @param {boolean} [focus=false] - 新しい行にフォーカスを移すならtrue。
	 */
	function insertEmptyRow(target, insertingBefore = false, focus = false) {
		let table = target.localName === 'table' ? target : getParentElementByTagName(target, 'table');
		let row = table.querySelector('template tr').cloneNode(true);
		if (target.localName === 'table' || target.name === 'add-row') {
			table.tBodies[0].appendChild(row);
		} else {
			target = getParentRow(target);
			target.parentElement.insertBefore(row, insertingBefore ? target : target.nextElementSibling);
			if (focus && /^(?:input|select)$/.test(target.localName)) {
				// 追加した行にフォーカスを移す
				row.querySelector('[name="' + event.target.name + '"]').focus();
			}
		}
	}

	doc.body.addEventListener('keypress', function (event) {
		let key = event.key;
		switch (key) {
			case 'Enter':
				// Enterキーが押されたとき
				// Bug 886308 – Implement Element.matches() <https://bugzilla.mozilla.org/show_bug.cgi?id=886308>
				if (event.target.mozMatchesSelector('tbody tr, tbody tr *')) {
					// 行内でキーが押されたとき
					let shiftKey = event.getModifierState('Shift');
					if (shiftKey || event.getModifierState('Alt') || event.getModifierState('Control')) {
						// Shiftキー、Altキー、Ctrlキーいずれかが押されていれば
						event.preventDefault();
						// 行を追加する
						insertEmptyRow(event.target, shiftKey, true);
					}
				}
				break;

			case 'ArrowUp':
			case 'ArrowDown':
			// Bug 900390 – Replace "Left", "Right", "Up" and "Down" with "ArrowLeft", "ArrowRight", "ArrowUp" and "ArrowDown" <https://bugzilla.mozilla.org/show_bug.cgi?id=900390>
			case 'Up':
			case 'Down':
				// 上矢印キー、または下矢印キーが押されたとき
				let target = event.target;
				if (target.localName === 'input' && (event.getModifierState('Alt') || event.getModifierState('Control'))) {
					// input要素上でAltキーかCtrlキーが押されていれば
					let current = getParentRow(event.target);
					let currentIndex = current.sectionRowIndex + 1;
					let indexes = key === 'ArrowUp' || key === 'Up' ? '-n+' + (currentIndex - 1) : 'n+' + (currentIndex + 1);
					let rows = current.parentElement.querySelectorAll(':not(td) > table > tbody > tr:nth-of-type(' + indexes + '):not(.browser-search-engine)');
					let sibling = key === 'ArrowUp' || key === 'Up' ? rows[rows.length - 1] : rows[0];
					if (sibling) {
						event.preventDefault();
						sibling.querySelector('[name="' + event.target.name + '"]').focus();
					}
				}
				break;
		}
	});

	/**
	 * ブラウザの検索エンジンを追加するセレクトボックスを更新する。
	 * @param {Object} event Description
	 * @returns {Object}  Description
	 */
	let updateAddingBrowserEngine = (function (event) {
		let options = doc.querySelectorAll('[name="add-browser-engine"] option');
		let nameInputs = doc.forms[0].name;
		return function () {
			// Bug 869376 – Nodelist should be ArrayClass <https://bugzilla.mozilla.org/show_bug.cgi?id=869376>
			let names = Array.prototype.map.call(nameInputs, name => name.value);
			for (let option of options) {
				option.hidden = names.indexOf(option.text) !== -1;
			}
		};
	})();

	let engineNameInputs = doc.forms[0].name;
	form.addEventListener('change', function (event) {
		let input = event.target;
		switch (input.name) {
			case 'name':
				// エンジン名が変更されたとき
				let value = input.value;
				let oldValue = input.dataset.value;
				input.dataset.value = value;
				let form = input.form;
				let customError = input.validity.customError;

				if (oldValue) {
					let repeatedsOldValue = form.querySelectorAll('[name="name"][data-value=' + quoteString(oldValue) + ']');
					if (customError && repeatedsOldValue.length === 1) {
						// 変更前の値で重複しており、重複が解消されていれば
						repeatedsOldValue[0].setCustomValidity('');
					}

					if (repeatedsOldValue.length === 0) {
						modifyAddingBrowserEngine('enable', oldValue);
					}
				}

				let repeateds = form.querySelectorAll('[name="name"][data-value=' + quoteString(value) + ']');
				if (repeateds.length > 1) {
					// 重複していれば
					for (let input of repeateds) {
						if (!input.validity.customError) {
							input.setCustomValidity(_('他と重複しないエンジン名を入力してください。'));
						}
					}
				} else {
					if (customError) {
						input.setCustomValidity('');
					}
					modifyAddingBrowserEngine('disable', value);
				}
				break;

			case 'method':
				// メソッドが変更されたとき
				let row = getParentRow(input);
				if (input.value === 'POST') {
					// POSTメソッド
					row.classList.add('post');
				} else {
					// GETメソッド
					row.querySelector('[name="accept"]').value = 'text/plain';
					// Firefox 24 ESR ではremoveメソッドの第2引数以降が無視される
					row.classList.remove('displaying-post-params');
					row.classList.remove('post');
				}
				break;

			case 'url':
				let url = input.value;
				if (url) {
					// URLのバリデート
					let validationMessage = '';
					try {
						NetUtil.newURI(url).QueryInterface(Ci.nsIURL);
					} catch (e) {
						if (e.result === Cr.NS_ERROR_MALFORMED_URI || e.result === Cr.NS_NOINTERFACE) {
							// 妥当なURLでなければ
							validationMessage = _('http:// などで始まるURLを入力してください。');
						} else {
							throw e;
						}
					}
					if (input.validationMessage !== validationMessage) {
						input.setCustomValidity(validationMessage);
					}
				}
				break;

			case 'add-browser-engine':
				// ブラウザの検索エンジンの追加
				insertEngine(JSON.parse(input.selectedOptions[0].dataset.engine));
				input[0].selected = true;
				break;
		}
	});

	form.addEventListener('submit', function (event) {
		// OKボタン
		event.target.querySelector('[type="submit"],button:not([type])').disable = true;
		event.preventDefault();

		let engines = [];
		for (let row of event.target.getElementsByTagName('tbody')[0].rows) {
			let engine = {};
			let name = row.querySelector('[name="name"]');
			if (name.readOnly) {
				// 検索窓のエンジンなら
				engine.browserSearchEngine = true;
			}
			engine.name = name.value;
			if (!engine.browserSearchEngine) {
				engine.url = row.querySelector('[name="url"]').value;
			}
			if (engine.name && (engine.browserSearchEngine ? Services.search.getEngineByName(engine.name) : engine.url)) {
				// 検索エンジン名が空文字列でなければ、
				// かつブラウザのエンジンであればそれが存在するなら、ユーザー定義エンジンであればURLが空文字列でなければ
				if (!engine.browserSearchEngine) {
					// ユーザー定義エンジンであれば
					let icon = row.querySelector('[name="icon"]').value;
					if (icon) {
						engine.icon = icon;
					}
					engine.method = row.querySelector('[name="method"]').value;
					if (engine.method === 'GET') {
						// GETメソッドなら
						if (!engine.url.contains('{searchTerms}')) {
							engine.url += '{searchTerms}';
						}
					} else {
						// POSTメソッドなら
						engine.params = [];
						for (let row of row.querySelectorAll('tbody > tr')) {
							let name = row.querySelector('[name="post-param-name"]').value;
							let value = row.querySelector('[name="post-param-value"]').value;
							if (name || value) {
								// 名前と値どちらかが入力されていれば
								engine.params.push([name, value]);
							}
						}
					}
					engine.accept = row.querySelector('[name="accept"]').value;
					engine.encoding = row.querySelector('[name="encoding"]').value;
				}
				engines.push(engine);
			}
		}

		let prefBranch = gPrefService.getBranch(PREF_ROOT);

		let where = event.target.where.value;
		if (where === 'tab') {
			prefBranch.clearUserPref('where');
		} else {
			Application.prefs.setValue(PREF_ROOT + 'where', where);
		}

		if (event.target['automatically-reflect'].checked) {
			prefBranch.clearUserPref('automaticallyReflect');
		} else {
			Application.prefs.setValue(PREF_ROOT + 'automaticallyReflect', false);
		}

		SearchUtils.setEngines(engines);
		DropzoneUtils.update();
		closeSettings();
	});

	let clickedParamsButton;
	doc.body.addEventListener('click', function (event) {
		let target = event.target;
		let localName = target.localName;
		let name = target.name;
		let parentId = target.parentElement.id;

		if (name === 'icon') {
			// 選択された要素を取得しておく
			selectedElement = target;
			if (target.type !== 'menu') {
				// button[type=menu] の代替
				// Bug 897102 – Update <menu> to spec <https://bugzilla.mozilla.org/show_bug.cgi?id=897102>
				event.preventDefault();
				let menu = doc.getElementById('icon-menu');
				let iconMenupopup = document.createElementNS(XUL_NS, 'menupopup');
				for (let menuitem of menu.getElementsByTagName('menuitem')) {
					let xulMenuitem = document.createElementNS(XUL_NS, 'menuitem');
					xulMenuitem.setAttribute('label', menuitem.label);
					xulMenuitem.setAttribute('value', menuitem.id);
					iconMenupopup.appendChild(xulMenuitem);
				}
				iconMenupopup.addEventListener('click', function (event) {
					doc.getElementById(event.target.value).click();
				});
				iconMenupopup.addEventListener('popuphidden', function (event) {
					event.target.remove();
				});
				document.documentElement.appendChild(iconMenupopup).openPopup(target);
			}
		} else if (name === 'delete') {
			// 行の削除ボタン
			let row = getParentRow(target);
			row.remove();
			let input = row.querySelector('[name="name"]');
			if (input.validity.customError) {
				// エンジン名が他と重複していた行を削除した場合
				let repeateds = form.querySelectorAll('[name="name"][data-value=' + quoteString(input.value) + ']');
				if (repeateds.length === 1) {
					// 重複が解消されていれば
					repeateds[0].setCustomValidity('');
				}
			}
			modifyAddingBrowserEngine('enable', row.querySelector('[name="name"]').value);
		} else if (name === 'add-row') {
			// 行の追加ボタン
			insertEmptyRow(target);
		} else if (name === 'params') {
			// POSTパラメータの開閉ボタン
			getParentRow(target).classList.toggle('displaying-post-params');
		} else if (name === 'export') {
			// エクスポートボタン
			// ファイル保存ダイアログを開く
			let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeSave);
			filePicker.appendFilters(Ci.nsIFilePicker.filterXML);
			filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
			filePicker.defaultString = ID + '.xml';
			filePicker.open(function (result) {
				if (result === Ci.nsIFilePicker.returnOK || result === Ci.nsIFilePicker.returnReplace) {
					let settingsDocument = new Document();
					let settings = settingsDocument.createElementNS(NS, 'settings');
					let engines = settingsDocument.createElementNS(NS, 'engines');

					for (let engine of SearchUtils.getEngines()) {
						engines.appendChild(OpenSearchUtils.convertEngineToElement(engine, settingsDocument));
					}
					settings.appendChild(engines);

					let where = Application.prefs.getValue(PREF_ROOT + 'where', 'tab');
					settings.appendChild(settingsDocument.createElementNS(NS, 'where')).textContent = where;

					let automaticallyReflect = Application.prefs.getValue(PREF_ROOT + 'automaticallyReflect', true);
					if (automaticallyReflect) {
						settings.appendChild(settingsDocument.createElementNS(NS, 'automatically-reflect')).textContent = 'on';
					}

					settingsDocument.appendChild(settings);

					// 保存
					let stream = FileUtils.openSafeFileOutputStream(filePicker.file);
					DOMSerializer.serializeToStream(toPrettyXML(settings), stream, '');
					FileUtils.closeSafeFileOutputStream(stream);
					showPopupNotification(_('%s へ設定をエクスポートしました。').replace('%s', filePicker.file.path));
				}
			});
		} else if (name === 'import') {
			// インポートボタン
			getSearchEnginesFromFile(win, function (engines, settingsDocument, fileName) {
				SearchUtils.setEngines(engines);

				let where = settingsDocument.getElementsByTagNameNS(NS, 'where')[0];
				if (where) {
					let value = where.textContent.trim();
					if (value !== 'tab') {
						Application.prefs.setValue(PREF_ROOT + 'where', value);
					}
				}

				let automaticallyReflect = settingsDocument.getElementsByTagNameNS(NS, 'automatically-reflect')[0];
				if (!automaticallyReflect || automaticallyReflect.textContent.trim() !== 'on') {
					Application.prefs.setValue(PREF_ROOT + 'automaticallyReflect', false);
				}

				win.location.reload();
				showPopupNotification(_('%s からのインポートが完了しました。').replace('%s', fileName));
			}, function (errorMessage, fileName) {
				showPopupNotification(_('%s からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, 'warning');
			});
		} else if (name === 'additional-import') {
			// 追加インポートボタン
			getSearchEnginesFromFile(win, function (engines, settingsDocument, fileName) {
				addEngines(engines);
				showPopupNotification(_('%s からのインポートが完了しました。').replace('%s', fileName) + '\n'
						+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'));
			}, function (errorMessage, fileName) {
				showPopupNotification(_('%s からのインポートに失敗しました。').replace('%s', fileName) + errorMessage, 'warning');
			});
		} else if (name === 'import-from-text') {
			// JSON文字列から追加インポートボタン
			let jsonString = win.prompt(_('JSON文字列を貼り付けてください。'));
			if (jsonString && jsonString.trim()) {
				let errorMessage = _('JSON文字列からのインポートに失敗しました。');
				let settings;
				try {
					settings = JSON.parse(jsonString);
				} catch (e) {
					if (e instanceof SyntaxError) {
						showPopupNotification(errorMessage + '\n' + _('JSONパースエラーです。'), 'warning');
						return;
					} else {
						throw e;
					}
				}
				let engines = [];
				if (Array.isArray(settings)) {
					// ブラウザのエンジン名一覧を取得しておく
					let browserEngineNames = Array.prototype.map.call(doc.querySelectorAll('[name="add-browser-engine"] > [label]'), function (option) {
						return option.label;
					});
					// 利用可能な文字コード一覧を取得しておく
					let encodings = Array.prototype.map.call(doc.querySelectorAll('template [name="encoding"] > option'), function (option) {
						return option.value;
					});

					for (let setting of settings) {
						if (typeof setting === 'object' && setting !== null && setting.title) {
							let engine = {
								name: setting.title,
							};
							if (browserEngineNames.indexOf(engine.name) !== -1) {
								// 同名の検索エンジンがブラウザに存在すれば
								engines.push(engine)
							} else if (setting.query) {
								engine.url = setting.query + '{searchTerms}';
								if (setting.icon && setting.icon !== DEFAULT_ICON_DATA) {
									engine.icon = setting.icon;
								}
								if (setting.encoding && encodings.indexOf(setting.encoding) !== -1) {
									engine.encoding = setting.encoding;
								}
								engines.push(engine);
							}
						}
					}
				}

				if (engines.length > 0) {
					addEngines(engines);
					showPopupNotification(_('JSON文字列からのインポートが完了しました。') + '\n'
							+ _('インポートした設定を保存するには、「OK」ボタンをクリックしてください。'));
				} else {
					showPopupNotification(errorMessage + '\n' + _('検索エンジンが一つも見つかりませんでした。'), 'warning');
				}
			}
		} else if (name === 'cancel') {
			// キャンセルボタン
			closeSettings();
		} else if (name === 'get-icons') {
			// 未取得アイコンの一括取得ボタン
			let emptyIcons = tbody.querySelectorAll('tbody > tr [name="icon"]:not([value]), tbody > tr [name="icon"][value=""]');
			// 進行状況
			let progress = doc.createElement('progress');
			progress.max = emptyIcons.length;
			progress.value = 0;
			target.parentElement.replaceChild(progress, target);

			(function getFavicon() {
				let icon = emptyIcons[progress.value];
				if (icon) {
					let url = getParentRow(icon).querySelector('[name="url"]').value;
					if (url) {
						IconUtils.getFaviconFromSiteUrl(url, function (dataURL) {
							icon.firstElementChild.src = icon.value = dataURL;
							progress.value = Number(progress.value) + 1;
							getFavicon();
						}, function () {
							progress.value = Number(progress.value) + 1;
							getFavicon();
						});
					} else {
						progress.value = Number(progress.value) + 1;
						getFavicon();
					}
				} else {
					// すべてのアイコンを取得し終えたら
					progress.parentElement.replaceChild(target, progress);
					showPopupNotification(_('アイコンの取得が完了しました。'));
				}
			})();
		} else if (name === 'initialize' || name === 'uninstall') {
			if (win.confirm('本当に、『%s』のすべての設定を削除してもよろしいですか？'.replace('%s', NAME))) {
				// すべての設定を削除
				gPrefService.getBranch(PREF_ROOT).deleteBranch('');
				if (name === 'initialize') {
					// 設定の初期化ボタン
					SearchUtils.initializeDropzones();
					DropzoneUtils.update();
					win.location.reload();
					showPopupNotification(_('設定の初期化が完了しました。'));
				} else if (name === 'uninstall') {
					// すべての設定の削除ボタン
					closeSettings();
					Services.obs.notifyObservers(null, ID, 'uninstall');
					showPopupNotification(_('設定の削除が完了しました。当スクリプト自体を削除しなければ、次回のブラウザ起動時にまた設定が作成されます。'));
				}
			}
		} else if (parentId === 'row-contextmenu') {
			// 行のコンテキストメニュー
			// 行の挿入
			insertEmptyRow(selectedElement, target.id === 'add-row-above');
		} else if (parentId === 'icon-menu') {
			// アイコンのメニュー
			let url;
			switch (target.id) {
				case 'set-icon-from-local-file':
					// ファイル選択ダイアログを開く
					let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
					filePicker.appendFilters(Ci.nsIFilePicker.filterImages);
					filePicker.open(function (result) {
						if (result === Ci.nsIFilePicker.returnOK) {
							let file = filePicker.file;
							let type;
							try {
								// 拡張子を元にMIMEタイプを取得
								type = MIMEService.getTypeFromFile(file);
							} catch(e) {
								if (e.result === Cr.NS_ERROR_NOT_AVAILABLE) {
									// 未知の拡張子
									showPopupNotification(_('画像ファイルを選択してください。'), 'warning');
								} else {
									throw e;
								}
							}
							if (type.startsWith('image/')) {
								// Blobインスタンスを取得
								let fileStream = new FileInputStream(file, -1, -1, 0);
								let stream = new BinaryInputStream(fileStream);
								IconUtils.convertToDataURL(stream.readByteArray(stream.available()), showIcon, type);
								stream.close();
								fileStream.close();
							} else {
								showPopupNotification(_('画像ファイルを指定してください。'), 'warning');
							}
						}
					});
					break;
				case 'set-icon-from-url':
					// 入力ダイアログを開く
					url = win.prompt(_('WebページのURL、または画像ファイルのURLを入力してください。'));
					if (url) {
						IconUtils.getFromUrl(url, showIcon, error => showPopupNotification(error, 'warning'));
					}
					break;
				case 'set-icon-from-clipboard':
					// クリップボードのデータを取得する
					if (Services.clipboard.supportsSelectionClipboard()) {
						// 選択クリップボードが有効なOSなら
						let url = getTextFromClipboard(Services.clipboard.kSelectionClipboard);
						if (url) {
							// テキストデータが保持されていれば
							IconUtils.getFromUrl(url, showIcon, getIconFromGlobalClipboard);
						} else {
							getIconFromGlobalClipboard();
						}
					} else {
						getIconFromGlobalClipboard();
					}
					break;
				case 'restore-default-icon':
					// Faviconを取得し設定
					url = getParentRow(selectedElement).querySelector('[name="url"]').value;
					if (url) {
						IconUtils.getFaviconFromSiteUrl(url, showIcon, function () {
							selectedElement.value = '';
							selectedElement.firstElementChild.src = DEFAULT_ICON_DATA;
						});
					} else {
						selectedElement.value = '';
						selectedElement.firstElementChild.src = DEFAULT_ICON_DATA;
					}
					break;
			}
		}

		/**
		 * 取得したアイコンをアイコン設定ボタンに表示する。
		 * @param {string} dataURL - アイコンのDataURL
		 */
		function showIcon(dataURL) {
			if (dataURL.length > MAX_PREFERENCE_VALUE_LENGTH) {
				showPopupNotification(_('アイコンの設定に失敗しました。約 %s KiB までの画像を設定できます。').replace('%s', MAX_PREFERENCE_VALUE_LENGTH / BASE64_SIZE_RATIO / 1024), 'warning');
			} else {
				selectedElement.firstElementChild.src = selectedElement.value = dataURL;
			}
		}

		/**
		 * クリップボード（グローバル）のURL、または画像からDataURLを取得し、対象のinput要素に設定する。
		 */
		function getIconFromGlobalClipboard() {
			let url = getTextFromClipboard(Services.clipboard.kGlobalClipboard);
			if (url) {
				// テキストデータが保持されていれば
				IconUtils.getFromUrl(url, showIcon, message => showPopupNotification(message, 'warning'));
				return;
			} else if (Services.clipboard.hasDataMatchingFlavors(['image/png'], 1, Services.clipboard.kGlobalClipboard)) {
				// 画像データが保持されていれば、PNG画像として取得する（Windowsでは透過部分が黒色になる）
				// <http://mxr.mozilla.org/mozilla-central/source/addon-sdk/source/lib/sdk/clipboard.js#259>を参考
				let transferable = new Transferable('image/png'), data = {};
				Services.clipboard.getData(transferable, Services.clipboard.kGlobalClipboard);
				transferable.getTransferData('image/png', data, {});
				let image = data.value;
				if (image instanceof Ci.nsISupportsInterfacePointer) {
					image = image.data;
				}
				if (image instanceof Ci.imgIContainer) {
					image = ImgTools.encodeImage(image, 'image/png');
				}
				if (image instanceof Ci.nsIInputStream) {
					IconUtils.convertToDataURL(new BinaryInputStream(image).readByteArray(image.available()), showIcon, 'image/png');
					return;
				}
			}
			showPopupNotification(_('クリップボードからデータを取得できませんでした。'), 'warning');
		}

		/**
		 * クリップボードからテキスト情報を取得する。
		 * @param {number} whichClipboard {@link Services.clipboard.kSelectionClipboard}か{@link Services.clipboard.kGlobalClipboard}
		 * @returns {?string}
		 */
		function getTextFromClipboard(whichClipboard) {
			if (Services.clipboard.hasDataMatchingFlavors(['text/unicode'], 1, whichClipboard)) {
				// テキストデータが保持されていれば
				let transferable = new Transferable('text/unicode'), data = {};
				Services.clipboard.getData(transferable, whichClipboard);
				transferable.getTransferData('text/unicode', data, {});
				return data.value.QueryInterface(Ci.nsISupportsString).data;
			} else {
				return null;
			}
		}
	});

	// 行の並び替え

	/**
	 * 行をドラッグ中ならtrue。
	 * @type {boolean}
	 */
	let duringRowDrag = false;

	tbody.addEventListener('dragstart', function (event) {
		let target = event.target;
		if (target.mozMatchesSelector('[draggable], [draggable] *')) {
			let row = getParentRow(target), dataTransfer = event.dataTransfer;
			dataTransfer.setDragImage(row, 0, 0);
			dataTransfer.setData('application/x-sectionrowindex', row.sectionRowIndex);
			duringRowDrag = true;
		}
	});

	table.addEventListener('dragover', function setActiveDropzoneClass(event) {
		if (duringRowDrag) {
			let row = getParentRow(event.target);
			if (row) {
				event.preventDefault();
				resetDropzoneClasses();
				switch (row.parentElement.localName) {
					case 'thead':
						tbody.rows[0].classList.add('active-dropzone-above');
						break;
					case 'tbody':
						let rect = row.getBoundingClientRect();
						if (event.clientY - rect.top < rect.height / 2) {
							// ポインタが行の真ん中より上にあれば
							row.classList.add('active-dropzone-above');
						} else {
							// ポインタが行の真ん中より下にあれば
							row.classList.add('active-dropzone-below');
						}
						break;
					case 'tfoot':
						tbody.rows[tbody.rows.length - 1].classList.add('active-dropzone-below');
						break;
				}
			}
		}
	});

	table.addEventListener('dragleave', function (event) {
		if (duringRowDrag && !table.contains(event.relatedTarget)) {
			resetDropzoneClasses();
		}
	});

	table.addEventListener('drop', function (event) {
		if (duringRowDrag) {
			let refChild = doc.getElementsByClassName('active-dropzone-above')[0];
			if (!refChild) {
				refChild = doc.getElementsByClassName('active-dropzone-below')[0];
				if (refChild) {
					refChild = refChild.nextElementSibling;
				} else {
					return;
				}
			}
			tbody.insertBefore(tbody.rows[event.dataTransfer.getData('application/x-sectionrowindex')], refChild);
			resetDropzones();
		}
	});

	win.addEventListener('dragend', function (event) {
		if (duringRowDrag) {
			resetDropzones();
		}
	});

	/**
	 * 行の並べ替え終了時の処理。
	 */
	function resetDropzones() {
		duringRowDrag = false;
		resetDropzoneClasses();
	}

	/**
	 * 行の並べ替えに関するクラス名の削除。
	 */
	function resetDropzoneClasses() {
		for (let row of tbody.querySelectorAll('.active-dropzone-above, .active-dropzone-below')) {
			// Firefox 24 ESR ではremoveメソッドの第2引数以降が無視される
			row.classList.remove('active-dropzone-above');
			row.classList.remove('active-dropzone-below');
		}
	}

	/**
	 * 表に検索エンジンを追加する。
	 * 同名の検索エンジンがあれば上書きする。
	 * @param {SearchEngine[]} engines
	 */
	function addEngines(engines) {
		let lastRow = tbody.rows[tbody.rows.length - 1];

		for (let engine of engines) {
			let names = form.querySelectorAll('[name="name"][data-value=' + quoteString(engine.name) + ']');
			if (names.length === 0) {
				// 同名の検索エンジンが設定されていなければ
				appendEngine(engine);
			} else if (name.length === 1) {
				// 同名の検索エンジンがすでに設定されていれば
				if (!names[0].readOnly) {
					// ユーザー定義の検索エンジンなら
					appendEngine(engine, getParentRow(names[0]));
				}
			} else {
				// 同名の検索エンジンが重複して設定されていれば
				let browserEngineName;
				for (let name of names) {
					if (name.readOnly) {
						browserEngineName = name;
						break;
					}
				}
				if (browserEngineName) {
					// 同名のブラウザの検索エンジンが設定されていれば、同名のユーザー定義のエンジンは削除する
					for (let name of names) {
						if (!name.readOnly) {
							getParentRow(name).remove();
						}
					}
				} else {
					// 同名のユーザー定義のエンジンしか設定されていなければ
					Array.prototype.forEach.call(names, function (name, index) {
						if (index === 0) {
							appendEngine(engine, getParentRow(name));
						} else {
							// 同名のエンジンのうち、最初の行以外は削除
							getParentRow(name).remove();
						}
					});
				}
			}
		}

		if (!lastRow.querySelector('[name="name"]').value && !lastRow.querySelector('[name="url"]').value) {
			// エンジン追加前の最後の行が空欄なら、表の末尾に移動
			tbody.appendChild(lastRow);
		} else {
			insertEngine();
		}

		/**
		 * 指定したエンジンを追加する。
		 * 同名の検索エンジンがブラウザに存在すれば、それを追加する。
		 * @param {SearchEngine} engine
		 * @param {Object} [oldRow] - 指定されていれば、指定された行と置き換える。
		 */
		function appendEngine(engine, oldRow = null) {
			let option = addingBrowserEngine.querySelector('[label=' + quoteString(engine.name) + ']');
			if (option) {
				// 同名の検索エンジンがブラウザに存在すれば
				insertEngine(JSON.parse(option.dataset.engine), oldRow);
				option.hidden = true;
			} else {
				insertEngine(engine, oldRow);
			}
			if (oldRow) {
				oldRow.remove();
			}
		}
	}

	win.addEventListener('beforeunload', function () {
		Application.storage.set(ID + '_settingsDocument', null);
	});

	/**
	 * 設定画面を閉じる。
	 */
	function closeSettings() {
		let fuelWindow = browserTab.window;
		let tabsLength = fuelWindow.tabs.length;
		if (tabsLength === 1) {
			// 設定画面以外のタブが存在しなければ
			if (Application.windows.length === 1) {
				// 他にウィンドウが存在しなければ、ホームページに移動する
				let homePage = gHomeButton.getHomePage();
				win.location.assign(homePage === 'about:blank' ? 'about:home' : homePage);
			} else {
				fuelWindow._window.close();
			}
		} else {
			browserTab.close();
		}
	}

	/**
	 * ポップアップ通知を表示する。
	 * @param	{string} message - 表示するメッセージ。
	 * @param	{string} [type=information] - メッセージの前に表示するアイコンの種類。"information"、"warning"、"error"、"question" のいずれか。
	 */
	function showPopupNotification(message, type = 'information') {
		if (browserTab.window._window.closed) {
			// 設定画面を含むウィンドウが既に閉じていれば、別ウィンドウの最前面のタブを取得
			for (let fuelWindow of Application.windows) {
				let chromeWindow = fuelWindow._window;
				if (chromeWindow !== window) {
					browserTab = fuelWindow.activeTab;
					chromeWindow.focus();
					break;
				}
			}
		} else if (browserTab.index === -1) {
			// 設定画面が既に閉じていれば、最前面のタブを取得
			let fuelWindow = Application.activeWindow;
			browserTab = fuelWindow.tabs[fuelWindow.activeTab.index];
		}
		browserTab.window._window.PopupNotifications.show(browserTab._browser, ID, message, null, null, null, {
			persistWhileVisible: true,
			removeOnDismissal: true,
			popupIconURL: 'chrome://global/skin/icons/' + type + '-64.png',
		});
	}
}



/**
 * 対応するFUELウィンドウを取得する。
 * @param {ChromeWindow} [win=window]
 * @returns {?Ci.fuelIWindow}
 */
function getFuelWindow(win = window) {
	// Firefox 24 ESRにはArray#findが実装されていない
	for (let fuelWindow of Application.windows) {
		if (fuelWindow._window === win) {
			return fuelWindow;
		}
	}
	return null;
}

/**
 * フォームデータ集合の各エントリ。
 * @typedef FormDataEntry
 * @type {Array}
 * @property {string} 0 - 名前。
 * @property {(string|Blob|nsIMIMEInputStream)} 1 - 値。
 * @see [Interface FormData - XMLHttpRequest Standard]{@link http://xhr.spec.whatwg.org/#interface-formdata}
 */

/**
 * フォームデータ集合を multipart/form-data として{@link nsIInputStream}に変換する。
 * @param {FormDataEntry[]} formDataSet
 * @param {Function} callback - 第1引数に戻り値としての{@link nsIMIMEInputStream}を含むコールバック関数。
 * @param {string} [encoding=THE_ENCODING]
 */
function encodeMultipartFormData(formDataSet, callback, encoding = THE_ENCODING) {
	/**
	 * 境界文字列の前半に用いるハイフンマイナスの数。
	 * @type {number}
	 */
	const BOUNDARY_HYPHEN_LENGTH = 25;

	/**
	 * 境界文字列の後半に用いる乱数値の文字数。
	 * @type {number}
	 */
	const BOUNDARY_RANDOM_STRING_LENGTH = 15;

	// 境界文字列を生成
	let boundary = '-'.repeat(BOUNDARY_HYPHEN_LENGTH) + (Math.random() * Math.pow(10, BOUNDARY_RANDOM_STRING_LENGTH)).toFixed();

	// 要求本体の生成
	let multipartBody = new MultiplexInputStream();
	(function createMultipartBody(i = 0) {
		for (let l = formDataSet.length; i < l; i++) {
			let [name, value] = formDataSet[i];
			multipartBody.appendStream(new StringInputStream((i > 0 ? '\r\n' : '') + '--' + boundary + '\r\n', -1));
			let isMIMEInputStream = value instanceof Ci.nsIMIMEInputStream;
			let isFile = isMIMEInputStream || /^\[object (?:Blob|File)]$/.test(Object.prototype.toString.call(value));
			let bodyPart = isMIMEInputStream ? value : new MIMEInputStream();
			bodyPart.addHeader('content-disposition', 'form-data; name=' + quoteString(convertEncoding(name, encoding))
					+ (isFile ? '; filename=' + quoteString(convertEncoding(value.name || 'blob', encoding)) : ''));
			if (isMIMEInputStream) {
				multipartBody.appendStream(bodyPart);
			} else if (isFile) {
				// エントリの値がファイルなら
				bodyPart.addHeader('content-type', value.type);
				// BlobをArrayBufferに変換する
				let fileReader = new FileReader();
				fileReader.addEventListener('load', function (event) {
					// ArrayBufferをnsIArrayBufferStreamに変換し追加する
					let buffer = event.target.result;
					bodyPart.setData(new ArrayBufferInputStream(buffer, 0, buffer.byteLength));
					multipartBody.appendStream(bodyPart);
					createMultipartBody(i + 1);
				});
				fileReader.readAsArrayBuffer(value);
				return;
			} else {
				bodyPart.setData(convertToInputStream(value, encoding));
				multipartBody.appendStream(bodyPart);
			}
		}
		multipartBody.appendStream(new StringInputStream('\r\n--' + boundary + '--\r\n', -1));

		// 要求ヘッダの設定
		let postData = new MIMEInputStream();
		postData.addHeader('content-type', 'multipart/form-data; boundary=' + boundary);
		postData.addContentLength = true;

		// 要求本体の設定
		postData.setData(multipartBody);

		callback(postData);
	})();
}

/**
 * 文字列を指定した符号化方式の{@link nsIInputStream}として返す。
 * @param {string} str
 * @param {string} [encoding=THE_ENCODING]
 * @returns {nsIInputStream}
 */
function convertToInputStream(str, encoding = THE_ENCODING) {
	try {
		ScriptableUnicodeConverter.charset = encoding;
	} catch(e) {
		if (e.result === NS_ERROR_UCONV_NOCONV) {
			ScriptableUnicodeConverter.charset = THE_ENCODING;
		} else {
			throw e;
		}
	}
	return ScriptableUnicodeConverter.convertToInputStream(str);
}

/**
 * 文字列を指定した符号化方式のバイナリ文字列に変換する。
 * @param {string} str
 * @param {string} [encoding=THE_ENCODING]
 * @returns {string}
 */
function convertEncoding(str, encoding = THE_ENCODING) {
	let stream = convertToInputStream(str, encoding);
	return NetUtil.readInputStreamToString(stream, stream.available());
}

/**
 * 文字列をquoted-string形式に。（", \, CR, LF にバックスラッシュを前置）
 * @param {string} str
 * @returns {string}
 */
function quoteString(str) {
	return '"' + str.replace(/["\\\r\n]/g, '\\$&') + '"';
}

/**
 * application/x-www-form-urlencoded形式の文字列を解析する。
 * @param {string} input
 * @returns {Array[]} [['name', 'value'], ……] のような形式の二次元配列。
 * @see {@link http://url.spec.whatwg.org/#concept-urlencoded-parser The application/x-www-form-urlencoded parser - URL Standard}
 * @version polyfill-2013-12-26-uc-2013-12-30
 */
function parseXWwwFormUrlencoded(input) {
	var strings, string, index, name, value, i, l;
	let _pairs = [];
	strings = input.split('&');
	if (!strings[0].contains('=')) {
		strings[0] = '=' + strings[0];
	}
	for (i = 0, l = strings.length; i < l; i++) {
		string = strings[i];
		if (string === '') {
			continue;
		}
		index = string.indexOf('=');
		if (index !== -1) {
			name = string.slice(0, index);
			value = string.slice(index + 1);
		} else {
			name = string;
			value = '';
		}
		_pairs.push([
			decodeURIComponent(name.replace(/\+/g, ' ')),
			decodeURIComponent(value.replace(/\+/g, ' '))
		]);
	}
	return _pairs;
}

/**
 * 属性値を{@link DOMSettableTokenList}として取得する。
 * @param {Element} element - 要素。
 * @param {string} attributeName - 属性値名。
 * @returns {DOMSettableTokenList}
 * @see {@link http://dom.spec.whatwg.org/#interface-domsettabletokenlist 9.2 Interface DOMSettableTokenList - DOM Standard}
 */
function getAttributeAsDOMSettableTokenList(element, attributeName)	 {
	let htmlElement = document.createElementNS(HTML_NS, 'div');
	htmlElement.itemRef = element.getAttribute(attributeName) || '';
	return htmlElement.itemRef;
}

/**
 * ファイル選択ダイアログを表示し、選択されたXMLファイルの検索エンジンを返す。
 * ファイルが選択されなかった場合は何もしない。
 * @param {Window} win - ダイアログの親となるウィンドウ。
 * @param {Function} callback - 第1引数に{@link SearchEngine[]}、第2引数に{@link Document}。第3引数にファイル名。
 * @param {Function} [errorCallback] - 第1引数にエラーメッセージ。第2引数にファイル名。
 */
function getSearchEnginesFromFile(win, callback, errorCallback = function () {}) {
	let filePicker = new FilePicker(win, null, Ci.nsIFilePicker.modeOpen);
	filePicker.appendFilters(Ci.nsIFilePicker.filterXML);
	filePicker.appendFilters(Ci.nsIFilePicker.filterAll);
	filePicker.open(function (result) {
		if (result === Ci.nsIFilePicker.returnOK) {
			let client = new XMLHttpRequest();
			client.open('GET', NetUtil.newURI(filePicker.file).spec);
			client.responseType = 'document';
			client.addEventListener('load', function (event) {
				let doc = event.target.response;
				let root = doc.documentElement;
				if (root.namespaceURI === PARSE_ERROR_NS && root.localName === 'parseerror') {
					// パースエラーが起きていれば
					errorCallback(_('XMLパースエラーです。') + '\n\n' + root.textContent);
				} else {
					let engines = [];
					for (let description of doc.getElementsByTagNameNS(OpenSearchUtils.NS, 'OpenSearchDescription')) {
						let engine = OpenSearchUtils.convertEngineToObject(description);
						if (engine) {
							engines.push(engine);
						}
					}
					if (engines.length > 0) {
						callback(engines, doc, filePicker.file.leafName);
					} else {
						// 検索エンジンが一つも含まれていなければ
						errorCallback(_('検索エンジンが一つも見つかりませんでした。'), filePicker.file.leafName);
					}
				}
			});
			client.send();
		}
	});
}

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
 * 指定されたノードの子孫要素に、適宜改行とインデントを挿入し読みやすくする。
 * すでに改行やインデントが含まれていることは想定しない。
 * @param {Node} root
 * @returns {Node}
 */
function toPrettyXML(root) {
	let walker = (root.ownerDocument || root).createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
	let indent = 0;
	while (true) {
		if (walker.firstChild()) {
			// 子要素を操作し、存在すればインデントを増やす
			indent++;
		} else {
			// 子要素が存在しなければ、次の同胞要素が存在する親要素を走査する
			while (true) {
				if (walker.nextSibling()) {
					break;
				} else if (walker.parentNode()) {
					indent--;
				} else {
					// すべての要素を走査し終えていれば
					return root;
				}
			}
		}
		// 要素の前に改行とインデントを挿入する
		walker.currentNode.parentNode.insertBefore(new Text('\n' + '\t'.repeat(indent)), walker.currentNode);
		if (!walker.currentNode.nextElementSibling) {
			// 次の同胞要素が存在しなければ、要素の後ろに改行とインデントを追加する
			walker.currentNode.parentNode.appendChild(new Text('\n' + '\t'.repeat(indent - 1)));
		}
	}
}



// Bug 887836 – Implement URLSearchParams <https://bugzilla.mozilla.org/show_bug.cgi?id=887836>
let URLSearchParams;
if ('URLSearchParams' in window) {
	URLSearchParams = window.URLSearchParams;
} else {
	/**
	 * A URLSearchParams object has an associated list of name-value pairs, which is initially empty.
	 * @constructor
	 * @param {string|URLSearchParams} [init=""]
	 * @see {@link http://url.spec.whatwg.org/#interface-urlsearchparams Interface URLSearchParams - URL Standard}
	 * @version polyfill-2014-03-04-uc-2014-03-04
	 * @name URLSearchParams
	 */
	URLSearchParams = function (init) {
		var strings, string, index, name, value, i, l;
		this._pairs = [];
		if (init) {
			if (init instanceof URLSearchParams) {
				for (i = 0, l = init._pairs.length; i < l; i++) {
					this._pairs.push([init._pairs[i][0], init._pairs[i][1]]);
				}
			} else {
				strings = init.split('&');
				if (!strings[0].contains('=')) {
					strings[0] = '=' + strings[0];
				}
				for (i = 0, l = strings.length; i < l; i++) {
					string = strings[i];
					if (string === '') {
						continue;
					}
					index = string.indexOf('=');
					if (index !== -1) {
						name = string.slice(0, index);
						value = string.slice(index + 1);
					} else {
						name = string;
						value = '';
					}
					this._pairs.push([
						decodeURIComponent(name.replace(/\+/g, ' ')),
						decodeURIComponent(value.replace(/\+/g, ' '))
					]);
				}
			}
		}
	};
	/**
	 * Append a new name-value pair whose name is name and value is value, to the list of name-value pairs.
	 * @param {string} name
	 * @param {string} value
	 * @name URLSearchParams#append
	 */
	Object.defineProperty(URLSearchParams.prototype, 'append', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name, value) {
			this._pairs.push([String(name), String(value)]);
		}
	});
	/**
	 * Remove all name-value pairs whose name is name.
	 * @param {string} name
	 * @name URLSearchParams#delete
	 */
	Object.defineProperty(URLSearchParams.prototype, 'delete', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i;
			for (i = 0; i < this._pairs.length; i++) {
				if (this._pairs[i][0] === name) {
					this._pairs.splice(i, 1);
					i--;
				}
			}
		}
	});
	/**
	 * Return the value of the first name-value pair whose name is name, and null if there is no such pair.
	 * @param {string} name
	 * @name URLSearchParams#get
	 * @returns {?string}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'get', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					return this._pairs[i][1];
				}
			}
			return null;
		}
	});
	/**
	 * Return the values of all name-value pairs whose name is name, in list order, and the empty sequence otherwise.
	 * @param {string} name
	 * @name URLSearchParams#getAll
	 * @returns {string[]}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'getAll', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var pairs = [], i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					pairs.push(this._pairs[i][1]);
				}
			}
			return pairs;
		}
	});
	/**
	 * If there are any name-value pairs whose name is name, set the value of the first such name-value pair to value and remove the others.
	 * Otherwise, append a new name-value pair whose name is name and value is value, to the list of name-value pairs.
	 * @param {string} name
	 * @param {string} value
	 * @name URLSearchParams#set
	 */
	Object.defineProperty(URLSearchParams.prototype, 'set', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name, value) {
			var flag, i;
			for (i = 0; i < this._pairs.length; i++) {
				if (this._pairs[i][0] === name) {
					if (flag) {
						this._pairs.splice(i, 1);
						i--;
					} else {
						this._pairs[i][1] = String(value);
						flag = true;
					}
				}
			}
			if (!flag) {
				this.append(name, value);
			}
		}
	});
	/**
	 * Return true if there is a name-value pair whose name is name, and false otherwise.
	 * @param {string} name
	 * @name URLSearchParams#has
	 * @returns {boolean}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'has', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (name) {
			var i, l;
			for (i = 0, l = this._pairs.length; i < l; i++) {
				if (this._pairs[i][0] === name) {
					return true;
				}
			}
			return false;
		}
	});
	/**
	 * Return the serialization of the URLSearchParams object's associated list of name-value pairs.
	 * @name URLSearchParams#toString
	 * @returns {string}
	 */
	Object.defineProperty(URLSearchParams.prototype, 'toString', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function () {
			return this._pairs.map(function (pair) {
				return encodeURIComponent(pair[0]) + '=' + encodeURIComponent(pair[1]);
			}).join('&');
		}
	});
}

})();
