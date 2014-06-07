// ==UserScript==
// @name           pixiv 検索オプションを追加
// @namespace      http://loda.jp/script/
// @id             pixiv-search-box-347021
// @version        2.4.0
// @description    検索オプションを、以前のようにラジオボタンで選択出来るようにする / This is a search option add-on script for pixiv. Enables you to select search mode by radio buttons (legacy feature)
// @match          http://www.pixiv.net/*
// @exclude        http://www.pixiv.net/member_illust.php?*mode=manga*
// @exclude        http://www.pixiv.net/member_illust.php?*mode=big*
// @exclude        http://www.pixiv.net/apps.php*
// @domain         www.pixiv.net
// @run-at         document-start
// @grant          dummy
// @updateURL      https://userscripts.org/scripts/source/104822.meta.js
// @icon           data:image/vnd.microsoft.icon;base64,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
// @author         100の人 https://userscripts.org/users/347021
// @license        Creative Commons Attribution 3.0 Unported License
// ==/UserScript==

(function () {
'use strict';

polyfill();

// L10N
setLocalizedTexts({
	'en': {
		'完全一致': 'Exact match',
		'部分一致': 'Partial match',
		'タイトル・キャプション': 'Title/Description',
		'小説': 'Novels',
		'タグ': 'Tags',
		'キーワード': 'Keyword',
		'本文': 'Content',
		'ユーザー': 'User',
		'グループ': 'Groups',
		'マーケット': 'Market',
		'全て': 'All',
		'検索': 'Search',
		'小説検索': 'Search novel',
		'ユーザー検索': 'Search user',
		'グループ検索': 'Search group',
		'マーケット検索': '',
	},
	'fr': {
		'完全一致': 'Concordance parfaite',
		'部分一致': 'Concordance partielle',
		'タイトル・キャプション': 'Titre, Légende',
		'小説': 'Roman',
		'タグ': 'Mots-clés',
		'キーワード': 'Mots-clés',
		'本文': 'Contenu',
		'ユーザー': 'Utilisateur',
		'グループ': 'Groups',
		'マーケット': '',
		'全て': 'Tout',
		'検索': 'Rechercher',
		'小説検索': 'Rechercher un roman',
		'ユーザー検索': '',
		'グループ検索': 'Rechercher un groupe',
		'マーケット検索': '',
	},
	'ko': {
		'完全一致': '완전 일치',
		'部分一致': '부분 일치',
		'タイトル・キャプション': '제목・캡션',
		'小説': '소설',
		'タグ': '태그',
		'キーワード': '키워드',
		'本文': '본문',
		'ユーザー': '유저',
		'マーケット': '',
		'グループ': '그룹',
		'全て': '전체',
		'検索': '검색',
		'小説検索': '소설 검색',
		'ユーザー検索': '유저 검색',
		'グループ検索': '그룹 검색',
		'マーケット検索': '',
	},
	'ru': {
		'完全一致': 'Полное совпадение',
		'部分一致': 'Частичное совпадение',
		'タイトル・キャプション': 'Заголовок',
		'小説': 'Рассказы',
		'タグ': 'Метка',
		'キーワード': 'Ключевые слова',
		'本文': 'Текст',
		'ユーザー': 'Пользователь',
		'グループ': 'Группа',
		'マーケット': '',
		'全て': 'Все',
		'検索': 'Поиск',
		'小説検索': 'Искать рассказ',
		'ユーザー検索': 'Искать пользователя',
		'グループ検索': 'Искать группу',
		'マーケット検索': '',
	},
	'th': {
		'完全一致': '',
		'部分一致': '',
		'タイトル・キャプション': 'ชื่อและคำบรรยาย',
		'小説': 'นิยาย',
		'タグ': 'แท็ก',
		'キーワード': 'คีย์เวิร์ด',
		'本文': '',
		'ユーザー': 'ผู้ใช้',
		'グループ': '',
		'マーケット': '',
		'全て': 'ทั้งหมด',
		'検索': 'ค้นหา',
		'小説検索': '',
		'ユーザー検索': '',
		'グループ検索': '',
		'マーケット検索': '',
	},
	'zh': {
		'完全一致': '完全相同',
		'部分一致': '部分相同',
		'タイトル・キャプション': '题目／简述',
		'小説': '小说',
		'タグ': '标签',
		'キーワード': '关键词',
		'本文': '内容',
		'ユーザー': '用户',
		'グループ': '群组',
		'マーケット': '',
		'全て': '全部',
		'検索': '搜索',
		'小説検索': '搜索小说',
		'ユーザー検索': '搜索用户',
		'グループ検索': '搜索群组',
		'マーケット検索': '',
	},
	'zh-tw': {
		'完全一致': '完全相同',
		'部分一致': '部分相同',
		'タイトル・キャプション': '題目／簡述',
		'小説': '小說',
		'タグ': '標籤',
		'キーワード': '關鍵詞',
		'本文': '內容',
		'ユーザー': '用戶',
		'グループ': '群組',
		'マーケット': '',
		'全て': '全部',
		'検索': '搜索',
		'小説検索': '搜索小說',
		'ユーザー検索': '搜索用戶',
		'グループ検索': '搜索群組',
		'マーケット検索': '',
	},
	'es': {
		'完全一致': 'Coincidencia exacta',
		'部分一致': 'Coincidencia parcial',
		'タイトル・キャプション': 'Título/Descripción',
		'小説': 'Novelas',
		'タグ': 'Etiquetas',
		'キーワード': 'Palabra clave',
		'本文': 'Mensaje',
		'ユーザー': 'Usuarios',
		'グループ': 'Grupo',
		'マーケット': '',
		'全て': 'Todos',
		'検索': 'Buscar',
		'小説検索': 'Buscar novela',
		'ユーザー検索': 'Buscar usuario',
		'グループ検索': 'Buscar grupo',
		'マーケット検索': '',
	},
});



startScript(main,
	function (parent) { return parent.localName === 'body'; },
	function (target) { return target.id === 'wrapper'; },
	function () { return document.getElementById('wrapper'); },
	{});

function main() {
	var loggedin = !document.body.classList.contains('not-logged-in'),
		form, submitButton, word = document.getElementById('suggest-input'), mode, subMode,
		smallForm, container, clear, input, element, isSearchResult, searchParams, wrapper, styleSheet, cssRules;

	// 言語の設定
	setlang(document.documentElement.lang);

	// スタイルの設定
	styleSheet = document.head.appendChild(document.createElement('style')).sheet;
	cssRules = styleSheet.cssRules;
	[
		// 検索フォーム
		'.search-form {'
				+ 'position: relative;'
				+ 'display: flex;'
				+ 'align-items: center;'
				+ 'width: initial;'
				+ 'background: #FFFFFF;'
				+ 'padding: 0.4em 2em;'
				+ 'border: solid 1px #D6DEE5;'
				+ 'border-radius: 5px;'
				+ 'margin-bottom: 10px;'
				// 通知が検索窓に隠れる問題の修正
				+ 'z-index: 98;'
				+ '}',
		'.not-logged-in .search-form,' +
		'html:not(._type-slim-header) .search-form {'
				// 仕様変更前
				+ 'border-top: initial;'
				+ 'border-top-left-radius: initial;'
				+ 'border-top-right-radius: initial;'
				+ '}',

		// 検索窓
		'.search-form #suggest-input {'
				+ 'width: 147px;'
				+ 'height: 26px;'
				+ 'flex-grow: 1;'
				+ 'flex-shrink: 0;'
				+ 'font-size: 14px;'
				+ 'background: #FFFFFF;'
				// 仕様変更前
				+ 'border: solid 1px #BECAD7;'
				+ 'padding: 0 4px;'
				+ '}',
		'.search-form .clear {'
				+ 'display: none;'
				+ '}',

		// 送信ボタン
		'.search-form .submit {'
				+ 'position: static !important;'
				+ 'width: 28px;'
				+ 'height: 28px;'
				+ 'background-color: #BECAD7;'
				+ 'border: none;'
				+ 'margin-right: 1em;'
				+ '}',
		'.search-form input.submit {'
				// 仕様変更前
				+ 'padding: 6px;'
				+ 'border-radius: initial !important;'
				+ 'background-position: -10px -53px;'
				+ 'background-image: url("http://source.pixiv.net/www/images/sprites-s42f3140950.png"), none;'
				+ 'background-clip: content-box, border-box;'
				+ 'background-origin: content-box;'
				+ '}',

		// 検索オプション
		'.search-form label {'
				+ 'padding: 0 0.7em;'
				+ 'display: flex;'
				+ 'align-items: center;'
				+ 'white-space: nowrap;'
				+ '}',
		'.search-form label input {'
				+ 'margin-right: 0.3em;'
				// 仕様変更前
				+ 'width: initial;'
				+ '}',

		// 副検索モード
		'.sub-options label:not(:first-of-type) {'
				+ 'display: none;'
				+ 'position: absolute;'
				+ 'z-index: 1;'
				+ 'width: 13em;'
				+ 'height: 2em;'
				+ 'border: solid 1px #D6DEE5;'
				+ 'border-top: none;'
				+ 'border-bottom: none;'
				+ 'background: #FFFFFF;'
				+ '}',
		'.sub-options::after {'
				+ 'content: "";'
				+ 'padding: 0 0.7em;'
				+ 'display: none;'
				+ 'position: absolute;'
				+ 'z-index: 1;'
				+ 'width: 13em;'
				+ 'height: 13px;'
				+ 'border: solid 1px #FFFFFF;'
				+ 'border-top: none;'
				+ 'border-bottom: none;'
				+ 'bottom: 0;'
				+ '}',
		'.sub-options label:nth-of-type(3) {'
				+ 'margin-top: 2em;'
				+ '}',
		'.sub-options label:nth-of-type(4) {'
				+ 'margin-top: 4em;'
				+ '}',
		'.sub-options label:nth-of-type(5) {'
				+ 'margin-top: 6em;'
				+ '}',
		'.sub-options label:last-of-type {'
				+ 'border-bottom: 1px solid #D6DEE5;'
				+ 'border-radius: 0 0 5px 5px;'
				+ '}',
		':nth-last-child(-n+2).sub-options label:not(:first-of-type) {'
				+ 'right: -1px;'
				+ '}',
		':nth-last-child(-n+2).sub-options::after {'
				+ 'right: -1px;'
				+ 'border-right-color: transparent;'
				+ '}',
		'.sub-options:hover label {'
				+ 'display: flex;'
				+ '}',
		'.sub-options:hover::after {'
				+ 'display: block;'
				+ '}',

		// ページ本体
		'#wrapper {'
				+ 'margin-top: initial;'
				+ '}',
	].forEach(function (rule) {
		styleSheet.insertRule(rule, cssRules.length);
	});

	if (loggedin) {
		form = word.form;
		submitButton = form.getElementsByClassName('submit')[0];

		if (form.classList.contains('search-form')) {
			// 仕様変更後のヘッダなら、検索フォームのラッパーを削除する
			document.getElementsByClassName('search-container')[0].remove();
		} else {
			// 仕様変更前のヘッダなら
			form.classList.add('search-form');
			// 検索窓のラッパーを削除する
			form.replaceChild(word, form.getElementsByClassName('container')[0]);
		}
	} else {
		// ログイン前なら、検索フォームを構築する
		form = document.createElement('form');
		form.classList.add('search-form');
		if (!word) {
			word = document.createElement('input');
			word.id = 'suggest-input';
			word.placeholder = _('検索');
		}
		form.appendChild(word);
		submitButton = document.createElement('button');
		element = document.createElement('i');
		element.classList.add('_icon');
		element.classList.add('sprites-search');
		submitButton.appendChild(element);
		submitButton.classList.add('submit');
		form.appendChild(submitButton);

		// 検索語句の設定
		searchParams = new URLSearchParams(window.location.search.replace('?', ''));
		smallForm = document.getElementsByClassName('search-small')[0];
		word.value = smallForm ? smallForm.word.value : searchParams.get('word') || '';
		if (smallForm) {
			smallForm.remove();
		}
	}
	
	word.required = true;

	// 移動
	wrapper = document.getElementById('wrapper');
	wrapper.insertBefore(form, wrapper.firstChild);

	// デフォルトの検索オプションを取得・削除
	input = (smallForm || form).s_mode || (smallForm || form).mode;
	subMode = mode = input ? input.value : 's_tag';
	if (!smallForm && input) {
		input.remove();
	}

	switch (window.location.pathname.split('/')[1]) {
		case 'novel':
			mode = 's_novel';
			if (!loggedin) {
				word.placeholder = _('小説検索');
				if (!isSearchResult) {
					subMode = 's_tag';
				}
			}
			break;
		case 'group':
			mode = 's_group';
			if (!loggedin) {
				word.placeholder = _('グループ検索');
				input = document.createElement('input');
				input.name = 'order';
				input.value = searchParams.get('order');
				input.type = 'hidden';
				form.appendChild(input);
				if (!isSearchResult) {
					subMode = 'keyword_all';
				}
			}
			break;
	}
	form.action = '/search.php';
	word.name = 'word';

	// 検索オプションを設定するラジオボタンの追加
	[
		{
			label: _('完全一致'),
			value: 's_tag_full',
			placeholder: _('検索'),
		},
		{
			label: _('部分一致'),
			value: 's_tag',
			placeholder: _('検索'),
		},
		{
			label: _('タイトル・キャプション'),
			value: 's_tc',
			placeholder: _('検索'),
		},
		{
			label: _('小説'),
			value: 's_novel',
			formAction: '/novel/search.php',
			placeholder: _('小説検索'),
			sub: [
				{
					label: _('タグ'),
					value: 's_tag_full',
					formAction: '/novel/tags.php',
					wordName: 'tag',
					modeName: '',
				},
				{
					label: _('キーワード'),
					value: 's_tag',
				},
				{
					label: _('本文'),
					value: 's_tc',
				},
			],
		},
		{
			label: _('ユーザー'),
			value: 's_usr',
			formAction: '/search_user.php',
			wordName: 'nick',
			placeholder: _('ユーザー検索'),
		},
		{
			label: _('グループ'),
			value: 's_group',
			formAction: '/group/search_group.php',
			modeName: 'mode',
			placeholder: _('グループ検索'),
			sub: [
				{
					label: _('全て'),
					value: 'keyword_all',
				},
				{
					label: _('完全一致'),
					value: 'tag_full',
				},
				{
					label: _('部分一致'),
					value: 'tag',
				},
				{
					label: _('タイトル・キャプション'),
					value: 'keyword',
				},
			],
		},
		{
			label: _('マーケット'),
			value: 's_market',
			formAction: '/market/search.php',
			modeName: '',
			placeholder: _('マーケット検索'),
		},
	].forEach(function (option) {
		if (!loggedin && option.value === 's_usr') {
			return;
		}

		// 作成
		var label = document.createElement('label'),
			input = document.createElement('input'),
			subOptions;
		input.type = 'radio';
		input.name = 's_mode';
		input.value = option.value;
		['formAction', 'wordName', 'modeName', 'placeholder'].forEach(function (key) {
			if (key in option) {
				input.dataset[key] = option[key];
			}
		});

		// 追加
		label.appendChild(input);
		label.appendChild(new Text(option.label));
		form.appendChild(label);

		// 現在の検索モードを取得・設定
		if (mode === input.value) {
			input.checked = true;
		}

		// 副検索モードの追加
		if (option.sub) {
			subOptions = document.createElement('div');
			subOptions.appendChild(label);

			subOptions.classList.add('sub-options');
			subOptions.id = option.value;
			option.sub.forEach(function (subOption) {
				// 作成
				var label = document.createElement('label'),
					subInput = document.createElement('input');
				subInput.type = 'radio';
				subInput.name = 's_sub_mode';
				subInput.value = subOption.value;
				['formAction', 'wordName', 'modeName'].forEach(function (key) {
					if (key in subOption) {
						subInput.dataset[key] = subOption[key];
					}
				});

				// 追加
				label.appendChild(subInput);
				label.appendChild(new Text(_(subOption.label)));
				subOptions.appendChild(label);

				// 現在の検索モードを取得・設定
				if (input.checked && subMode === subInput.value) {
					subInput.checked = true;
				}
			});
			form.appendChild(subOptions);
		}
	});

	// 小説タグ検索
	if (window.location.pathname === '/novel/tags.php') {
		form.querySelector('[name="s_sub_mode"]:checked').parentNode.parentNode.querySelector('[value="s_tag"]').checked = true;
	}

	// ユーザー検索を選択していた時のクエリ変更
	form.addEventListener('submit', function (event) {
		var searchMode, subOption, hiddenParams, i, l;
		
		if (!/\S/.test(word.value)) {
			// 空白以外の文字が入力されていなければ
			word.value = '';
			return;
		}

		searchMode = form.querySelector('[name="s_mode"]:checked');
		subOption = form.querySelector('[name="s_sub_mode"]:checked');

		if ((subOption || searchMode).value.endsWith('tag_full') && /[^ 　][ 　]+[^ 　]/.test(word.value)) {
			// 完全一致タグ検索で、先頭・末尾以外に半角スペース・全角スペースが含まれていれば
			if (subOption) {
				searchMode.checked = false;
				searchMode.click();
			} else {
				// イラスト
				searchMode.value = 's_tag';
			}
		}

		if (searchMode.dataset.formAction) {
			form.action = searchMode.dataset.formAction;
		}
		if (searchMode.dataset.wordName) {
			word.name = searchMode.dataset.wordName;
		}
		if (searchMode.dataset.modeName) {
			searchMode.name = searchMode.dataset.modeName;
		} else if (searchMode.dataset.modeName === '') {
			searchMode.removeAttribute('name');
		}

		if (subOption) {
			// 副検索モードが存在すれば
			searchMode.value = subOption.value;
			subOption.removeAttribute('name');
			if (subOption.dataset.formAction) {
				form.action = subOption.dataset.formAction;
			}
			if (subOption.dataset.wordName) {
				word.name = subOption.dataset.wordName;
			}
			if (subOption.dataset.modeName) {
				searchMode.name = subOption.dataset.modeName;
			} else if (subOption.dataset.modeName === '') {
				searchMode.removeAttribute('name');
			}
		}

		// サービス間をまたぐ場合、不要なパラメーターは送信しない
		if (form.getAttribute('action').split('/')[1] !== window.location.pathname.split('/')[1]) {
			Array.prototype.forEach.call(form.querySelectorAll('[type="hidden"]'), function (hiddenParam) {
				hiddenParam.disabled = true;
			});
		}
	});

	// 副検索モードの選択
	form.addEventListener('change', function (event) {
		var subOptions = event.target.parentElement.parentElement, subOption;
		if (event.target.name === 's_mode') {
			// 検索モードの選択なら
			if (subOptions.classList.contains('sub-options')) {
				// 副検索モードが存在すれば
				subOptions.querySelector('[value="s_tag"], [value="keyword_all"]').checked = true;
			} else {
				subOption = form.querySelector('[name="s_sub_mode"]:checked');
				if (subOption) {
					subOption.checked = false;
				}
			}
			word.placeholder = event.target.dataset.placeholder;
		} else if (event.target.name === 's_sub_mode') {
			// 副検索モードの選択なら
			subOption = subOptions.firstElementChild.firstElementChild;
			subOption.checked = true;
			word.placeholder = subOption.dataset.placeholder;
		}
	});

	form.addEventListener('dblclick', function (event) {
		if (event.target.localName === 'label' || event.target.type === 'radio') {
			// 検索オプションをダブルクリックしたとき
			submitButton.click();
		}
	});
}



/**
 * 挿入された節の親節が、目印となる節の親節か否かを返すコールバック関数
 * @callback isTargetParent
 * @param {(Document|Element)} parent
 * @returns {boolean}
 */

/**
 * 挿入された節が、目印となる節か否かを返すコールバック関数
 * @callback isTarget
 * @param {(DocumentType|Element)} target
 * @returns {boolean}
 */

/**
 * 目印となる節が文書に存在するか否かを返すコールバック関数
 * @callback existsTarget
 * @returns {boolean}
 */

/**
 * 目印となる節が挿入された直後に関数を実行する
 * @param {Function} main - 実行する関数
 * @param {isTargetParent} isTargetParent
 * @param {isTarget} isTarget
 * @param {existsTarget} existsTarget
 * @param {Object} [callbacksForFirefox] - DOMContentLoaded前のタイミングで1回だけスクリプトを起動させる場合に設定
 * @param {isTargetParent} [callbacksForFirefox.isTargetParent] - FirefoxにおけるisTargetParent
 * @param {isTarget} [callbacksForFirefox.isTarget] - FirefoxにおけるisTarget
 * @version 2013-09-23
 */
function startScript(main, isTargetParent, isTarget, existsTarget, callbacksForFirefox) {
	var observer, flag;

	// FirefoxのDOMContentLoaded前のMutationObserverは、要素をまとめて挿入したと見なすため、isTargetParent、isTargetを変更
	if (callbacksForFirefox && window.navigator.userAgent.contains(' Firefox/')) {
		if (callbacksForFirefox.isTargetParent) {
			isTargetParent = callbacksForFirefox.isTargetParent;
		}
		if (callbacksForFirefox.isTarget) {
			isTarget = callbacksForFirefox.isTarget;
		}
	}

	// 指定した節が既に存在していれば、即実行
	startMain();
	if (flag) {
		return;
	}

	observer = new MutationObserver(mutationCallback);
	observer.observe(document, {
		childList: true,
		subtree: true,
	});

	if (callbacksForFirefox) {
		// DOMContentLoadedまでにスクリプトを実行できなかった場合、監視を停止（指定した節が存在するか確認し、存在すれば実行）
		document.addEventListener('DOMContentLoaded', function stopScript(event) {
			event.target.removeEventListener('DOMContentLoaded', stopScript);
			if (observer) {
				observer.disconnect();
			}
			startMain();
			flag = true;
		});
	}

	/**
	 * 目印となる節が挿入されたら、監視を停止し、{@link checkExistingTarget}を実行する
	 * @param {MutationRecord[]} mutations - a list of MutationRecord objects
	 * @param {MutationObserver} observer - the constructed MutationObserver object
	 */
	function mutationCallback(mutations, observer) {
		var mutation, target, nodeType, addedNodes, addedNode, i, j, l, l2;
		for (i = 0, l = mutations.length; i < l; i++) {
			mutation = mutations[i];
			target = mutation.target;
			nodeType = target.nodeType;
			if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE) && isTargetParent(target)) {
				// 子が追加された節が要素節か文書節で、かつそのノードについてisTargetParentが真を返せば
				addedNodes = Array.prototype.slice.call(mutation.addedNodes);
				for (j = 0, l2 = addedNodes.length; j < l2; j++) {
					addedNode = addedNodes[j];
					nodeType = addedNode.nodeType;
					if ((nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_TYPE_NODE) && isTarget(addedNode)) {
						// 追加された子が要素節か文書型節で、かつそのノードについてisTargetが真を返せば
						observer.disconnect();
						checkExistingTarget(0);
						return;
					}
				}
			}
		}
	}

	/**
	 * {@link startMain}を実行し、スクリプトが開始されていなければ再度実行
	 * @param {number} count - {@link startMain}を実行した回数
	 */
	function checkExistingTarget(count) {
		var LIMIT = 500, INTERVAL = 10;
		startMain();
		if (!flag && count < LIMIT) {
			window.setTimeout(checkExistingTarget, INTERVAL, count + 1);
		}
	}

	/**
	 * 指定した節が存在するか確認し、存在すれば監視を停止しスクリプトを実行
	 */
	function startMain() {
		if (!flag && existsTarget()) {
			flag = true;
			main();
		}
	}
}

/**
 * 国際化・地域化関数の読み込み、ECMAScriptとWHATWG仕様のPolyfill
 */
function polyfill() {

// i18n
(function () {
	/**
	 * 翻訳対象文字列 (msgid) の言語
	 * @constant {string}
	 */
	var ORIGINAL_LOCALE = 'ja';

	/**
	 * クライアントの言語の翻訳リソースが存在しないとき、どの言語に翻訳するか
	 * @constant {string}
	 */
	var DEFAULT_LOCALE = 'en';

	/**
	 * 以下のような形式の翻訳リソース
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
	 * クライアントの言語。{@link setlang}から変更される
	 * @type string
	 * @access private
	 */
	var langtag = 'ja';

	/**
	 * クライアントの言語のlanguage部分。{@link setlang}から変更される
	 * @type string
	 * @access private
	 */
	var language = 'ja';

	/**
	 * 翻訳リソース。{@link setLocalizedTexts}から変更される
	 * @type LocalizedTexts
	 * @access private
	 */
	var multilingualLocalizedTexts = {};
	multilingualLocalizedTexts[ORIGINAL_LOCALE] = {};

	/**
	 * テキストをクライアントの言語に変換する
	 * @param {string} message - 翻訳前
	 * @returns {string} 翻訳後
	 */
	window._ = window.gettext = function (message) {
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
	 * {@link gettext}から参照されるクライアントの言語を設定する
	 * @param {string} lang - IETF言語タグ（「language」と「language-REGION」にのみ対応）
	 */
	window.setlang = function (lang) {
		lang = lang.split('-', 2);
		language = lang[0].toLowerCase();
		langtag = language + (lang[1] ? '-' + lang[1].toUpperCase() : '');
	};

	/**
	 * {@link gettext}から参照される翻訳リソースを追加する
	 * @param {LocalizedTexts} localizedTexts
	 */
	window.setLocalizedTexts = function (localizedTexts) {
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
})();


// Polyfill for Blink
if (!String.prototype.hasOwnProperty('startsWith')) {
	/**
	 * Determines whether a string begins with the characters of another string, returning true or false as appropriate.
	 * @param {string} searchString - The characters to be searched for at the start of this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.startswith 21.1.3.18 String.prototype.startsWith (searchString [, position ] )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith String.startsWith - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.startsWith
	 */
	Object.defineProperty(String.prototype, 'startsWith', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			var position = arguments[1];
			return this.indexOf(searchString, position) === Math.max(Math.floor(position) || 0, 0);
		},
	});
}

// Polyfill for Blink
if (!String.prototype.hasOwnProperty('contains')) {
	/**
	 * Determines whether one string may be found within another string, returning true or false as appropriate.
	 * @param {string} searchString - A string to be searched for within this string.
	 * @param {number} [position=0] - The position in this string at which to begin searching for searchString.
	 * @returns {boolean}
	 * @see {@link http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.contains 21.1.3.6 String.prototype.contains (searchString, position = 0 )}
	 * @see {@link https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String/contains String.contains - JavaScript | MDN}
	 * @version polyfill-2013-11-05
	 * @name String.prototype.contains
	 */
	Object.defineProperty(String.prototype, 'contains', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function (searchString) {
			return this.indexOf(searchString, arguments[1]) !== -1;
		},
	});
}

// Polyfill for Firefox and Blink
if (typeof URLSearchParams === 'undefined') {
	/**
	 * A URLSearchParams object has an associated list of name-value pairs, which is initially empty.
	 * @constructor
	 * @param {string|URLSearchParams} [init=""]
	 * @see {@link http://url.spec.whatwg.org/#interface-urlsearchparams Interface URLSearchParams - URL Standard}
	 * @version polyfill-2014-02-10
	 * @name URLSearchParams
	 */
	Object.defineProperty(window, 'URLSearchParams', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function(init) {
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
		}
	});
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
		value: function(name, value) {
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
		value: function(name) {
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
		value: function(name) {
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
		value: function(name) {
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
		value: function(name, value) {
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
	 * @returns boolean
	 */
	Object.defineProperty(URLSearchParams.prototype, 'has', {
		writable: true,
		enumerable: false,
		configurable: true,
		value: function(name) {
			var i, l;
			for (i = 0, l = name.length; i < l; i++) {
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
				return serializeXWwwFormUrlencodedByte(pair[0]) + '=' + serializeXWwwFormUrlencodedByte(pair[1]);
			}).join('&');
		}
	});
}

/**
 * URL標準に準拠した{@link encodeURIComponent}
 * @param {string} input
 * @returns {Object}
 * @see {@link http://url.spec.whatwg.org/#concept-urlencoded-byte-serializer The application/x-www-form-urlencoded byte serializer - URL Standard}
 */
function serializeXWwwFormUrlencodedByte(input) {
	return encodeURIComponent(input).replace(/(?:[!~'()]|%20)/g, function (mark) {
		return mark[0] === '%20' ? '+' : '%' + mark[0].charCodeAt();
	});
}
}

})();
