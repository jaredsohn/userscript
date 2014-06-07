// ==UserScript==
// @name           ggrks
// @namespace      anon21
// @include        http://www.google.co.jp/search?*
// ==/UserScript==

(function() {
	/***************************************************************************
	 * ヘッダ
	 */
	var header = document.createElement("div");
	header.style.position = "fixed";
	header.style.left = "0px";
	header.style.top = "0px";
	header.style.width = "100%";
	header.style.padding = "2px";
	header.style.backgroundColor = "#f0ebff";
	header.style.fontSize = "12px";
	header.style.zIndex = "2";
	
	var text = document.createTextNode("Google:");
	header.appendChild(text);
	
	document.body.insertBefore(header, document.body.firstChild);
	document.body.style.paddingTop = "18px";
	
	/***************************************************************************
	 * 検索フォーム
	 */
	var searchForm = document.createElement("form");
	searchForm.action = "/search";
	searchForm.method = "GET";
	header.appendChild(searchForm);
	
	var defaultSearchInputs = document.getElementById("sff")
		.firstChild.firstChild.firstChild.firstChild;
	
	var i;
	for(i = 0; i < defaultSearchInputs.childNodes.length; ++i) {
		if( defaultSearchInputs.childNodes[i].type != "hidden" )
			break
		
		var paramInput = document.createElement("input");
		paramInput.type = "hidden";
		paramInput.name = defaultSearchInputs.childNodes[i].name;
		paramInput.value = defaultSearchInputs.childNodes[i].value;
		
		searchForm.appendChild(paramInput);
	}
	
	var searchInput = document.createElement("input");
	searchInput.type = "text";
	searchInput.maxlength = "2084";
	searchInput.size = "41";
	searchInput.setAttribute("autocomplete", "off");
	searchInput.name = defaultSearchInputs.childNodes[i].name;
	searchInput.value = defaultSearchInputs.childNodes[i].value;
	//searchInput.class = "lst";
	searchInput.style.marginLeft = "1em";
	searchInput.style.height = "14px";
	searchInput.style.border = "1px solid #c0c0c0"
	
	//searchInput.addEventListener("keypress", defaultSearchInputs.childNodes[i].onkeypress, false);
	
	searchForm.appendChild(searchInput);
	
	/***************************************************************************
	 * サイトの追加
	 */
	var appendSiteButton = document.createElement("span");
	appendSiteButton.style.marginLeft = "1em";
	appendSiteButton.style.border = "1px solid #f0ebff";
	appendSiteButton.style.cursor = "pointer";
	appendSiteButton.appendChild(document.createTextNode("サイトの追加"));
	
	header.appendChild(appendSiteButton);
	
	var appendSiteBox = null;
	var patternInput = null;
	var blockInput = null;
	var backgroundColorInput = null;
	
	function showAppendSiteBox(b) {
		if( appendSiteBox == null ) {
			// サイトの追加ボックス
			appendSiteBox = document.createElement("div");
			appendSiteBox.style.position = "fixed";
			appendSiteBox.style.left = "0px";
			appendSiteBox.style.top = "22px";
			appendSiteBox.style.width = "100%";
			appendSiteBox.style.padding = "2px";
			appendSiteBox.style.backgroundColor = "#f0ebff";
			appendSiteBox.style.fontSize = "12px";
			appendSiteBox.style.display = "none";
			appendSiteBox.style.zIndex = "1";
			document.body.insertBefore(appendSiteBox, header.nextSibling);
			
			// サイト情報テーブル
			var siteInfoTable = document.createElement("table");
			siteInfoTable.style.display = "block";
			appendSiteBox.appendChild(siteInfoTable);
			
			// 対象サイト
			var patternRow = document.createElement("tr");
			siteInfoTable.appendChild(patternRow);
			
			var patternLabel = document.createElement("td");
			patternLabel.appendChild(document.createTextNode("対象サイト(正規表現)"));
			patternRow.appendChild(patternLabel);
			
			var patternCell = document.createElement("td");
			patternRow.appendChild(patternCell);
			
			patternInput = document.createElement("input");
			patternInput.type = "text";
			patternInput.size = "64";
			patternInput.style.height = "14px";
			patternInput.style.border = "1px solid #c0c0c0";
			patternCell.appendChild(patternInput);
			
			// ブロック
			var blockRow = document.createElement("tr");
			siteInfoTable.appendChild(blockRow);
			
			var blockLabel = document.createElement("td");
			blockLabel.appendChild(document.createTextNode("ブロック"));
			blockRow.appendChild(blockLabel);
			
			var blockCell = document.createElement("td");
			blockRow.appendChild(blockCell);
			
			blockInput = document.createElement("input");
			blockInput.type = "checkbox";
			blockCell.appendChild(blockInput);
			blockCell.appendChild(document.createTextNode("このサイトをブロックする"));
			
			// 背景色
			var backgroundColorRow = document.createElement("tr");
			siteInfoTable.appendChild(backgroundColorRow);
			
			var backgroundColorLabel = document.createElement("td");
			backgroundColorLabel.appendChild(document.createTextNode("背景色"));
			backgroundColorRow.appendChild(backgroundColorLabel);
			
			var backgroundColorCell = document.createElement("td");
			backgroundColorRow.appendChild(backgroundColorCell);
			
			backgroundColorInput = document.createElement("input");
			backgroundColorInput.type = "text";
			backgroundColorInput.size = "64";
			backgroundColorInput.style.height = "14px";
			backgroundColorInput.style.border = "1px solid #c0c0c0";
			backgroundColorCell.appendChild(backgroundColorInput);
			
			// 追加ボタン
			var appendButton = document.createElement("button");
			appendButton.appendChild(document.createTextNode("追加"));
			appendButton.addEventListener("click", applyAppendSiteInputs, false);
			appendSiteBox.appendChild(appendButton);
			
			// クリアボタン
			var clearButton = document.createElement("button");
			clearButton.appendChild(document.createTextNode("クリア"));
			clearButton.addEventListener("click", clearAppendSiteInputs, false);
			appendSiteBox.appendChild(clearButton);
		}
		
		if( b ) {
			appendSiteBox.style.display = "block";
			appendSiteButton.style.border = "1px solid #c0c0c0";
			appendSiteButton.style.backgroundColor = "#f0f0f0";
		} else {
			appendSiteBox.style.display = "none";
			appendSiteButton.style.border = "1px solid #f0ebff";
			appendSiteButton.style.backgroundColor = "";
		}
	}
	
	function toggleAppendSiteButton() {
		if( appendSiteBox == null || appendSiteBox.style.display == "none" ) {
			showAppendSiteBox(true);
			showSiteListBox(false);
			showHiddenPagesBox(false);
		} else {
			showAppendSiteBox(false);
		}
	}
	
	appendSiteButton.addEventListener("click", toggleAppendSiteButton, false);
	
	// 追加ボタンを押したとき，サイト情報に追加
	function applyAppendSiteInputs() {
		if( patternInput.value.length == 0 )
			return;
		
		var newInfo = {
			"pattern" : patternInput.value,
			"block" : blockInput.checked,
			"backgroundColor" : backgroundColorInput.value,
		};
		
		var siteInfo = JSON.parse(GM_getValue("siteInfo", "[]"));
		var i;
		
		for(i = 0; i < siteInfo.length; ++i) {
			if( newInfo.pattern == siteInfo[i].pattern )
				break;
		}
		
		siteInfo[i] = newInfo;
		GM_setValue("siteInfo", JSON.stringify(siteInfo));
		
		clearAppendSiteInputs();
	}
	
	// クリアボタンを押したとき，入力をクリアする
	function clearAppendSiteInputs() {
		patternInput.value = "";
		blockInput.checked = false;
		backgroundColorInput.value = "";
	}
	
	/***************************************************************************
	 * サイト一覧
	 */
	var siteListButton = document.createElement("span");
	siteListButton.style.marginLeft = "1em";
	siteListButton.style.border = "1px solid #f0ebff";
	siteListButton.style.cursor = "pointer";
	siteListButton.appendChild(document.createTextNode("サイト一覧"));
	header.appendChild(siteListButton);
	
	var siteListBox = null;
	var siteListUl = null;
	var selectedSite = null;
	
	function showSiteListBox(b) {
		// サイト一覧ボックス
		if( siteListBox == null ) {
			siteListBox = document.createElement("div");
			siteListBox.style.position = "fixed";
			siteListBox.style.left = "0px";
			siteListBox.style.top = "22px";
			siteListBox.style.width = "100%";
			siteListBox.style.padding = "2px";
			siteListBox.style.backgroundColor = "#f0ebff";
			siteListBox.style.fontSize = "12px";
			siteListBox.style.display = "none";
			siteListBox.style.zIndex = "1";
			document.body.insertBefore(siteListBox, header.nextSibling);
			
			// 編集ボタン
			var editButton = document.createElement("button");
			editButton.appendChild(document.createTextNode("編集"));
			editButton.addEventListener("click", editSelectedSite, false);
			
			siteListBox.appendChild(editButton);
			
			// 削除ボタン
			var removeButton = document.createElement("button");
			removeButton.appendChild(document.createTextNode("削除"));
			removeButton.addEventListener("click", removeSelectedSite, false);
			
			siteListBox.appendChild(removeButton);
		}
		
		if( b ) {
			// サイトリストを表示
			siteListBox.style.display = "block";
			
			// ボタンを押した状態にする
			siteListButton.style.border = "1px solid #c0c0c0";
			siteListButton.style.backgroundColor = "#f0f0f0";
			
			// サイト情報からリストを作成
			updateSiteList();
		} else {
			siteListBox.style.display = "none";
			siteListButton.style.border = "1px solid #f0ebff";
			siteListButton.style.backgroundColor = "";
		}
	}
	
	function toggleSiteListButton() {
		if( siteListBox == null || siteListBox.style.display == "none" ) {
			showAppendSiteBox(false);
			showSiteListBox(true);
			showHiddenPagesBox(false);
		} else {
			showSiteListBox(false);
		}
	}
	
	siteListButton.addEventListener("click", toggleSiteListButton, false);
	
	// サイト情報に登録されているサイトをリストにして表示する
	function updateSiteList() {
		// 選択を解除
		selectedSite = null;
		
		// 既存のリストを削除
		if( siteListUl != null )
			siteListBox.removeChild(siteListUl);
		
		// サイト情報からリストを作成
		siteListUl = document.createElement("ul");
		siteListUl.style.paddingLeft = "0px";
		siteListUl.style.listStyleType = "none";
		
		siteListBox.insertBefore(siteListUl, siteListBox.firstChild);
		
		var siteInfo = JSON.parse(GM_getValue("siteInfo", "[]"));
		
		for(var i = 0; i < siteInfo.length; ++i) {
			var siteListLi = document.createElement("li");
			siteListLi.style.border = "1px solid #f0ebff";
			siteListLi.style.cursor = "pointer";
			siteListLi.appendChild(document.createTextNode(siteInfo[i].pattern));
			siteListLi.addEventListener("click", function(e) {
				if( selectedSite != null ) {
					selectedSite.style.border = "1px solid #f0ebff";
					selectedSite.style.backgroundColor = "";
				}
				
				if( e.target == selectedSite ) {
					selectedSite = null;
				} else {
					selectedSite = e.target;
					selectedSite.style.border = "1px solid #c0c0c0";
					selectedSite.style.backgroundColor = "#f0f0f0";
				}
			}, false);
			siteListUl.appendChild(siteListLi);
		}
	}
	
	// 編集ボタンを押したとき，選択されたサイト情報をサイトの追加ボックスの入力にする
	function editSelectedSite() {
		if( selectedSite == null )
			return;
		
		toggleAppendSiteButton();
		
		var siteInfo = JSON.parse(GM_getValue("siteInfo", "[]"));
		
		for(var i = 0; i < siteInfo.length; ++i) {
			if( siteInfo[i].pattern == selectedSite.textContent ) {
				patternInput.value = siteInfo[i].pattern;
				blockInput.checked = ( siteInfo[i].block != null ) ?
					siteInfo[i].block : false;
				backgroundColorInput.value = ( siteInfo[i].backgroundColor != null ) ?
					siteInfo[i].backgroundColor : "";
				break;
			}
		}
	}
	
	// 削除ボタンを押したとき，選択されたサイト情報を削除
	function removeSelectedSite() {
		if( selectedSite == null )
			return;
		
		// サイト情報から該当サイトを削除して保存する
		var siteInfo = JSON.parse(GM_getValue("siteInfo", "[]"));
		
		for(var i = 0; i < siteInfo.length; ++i) {
			if( siteInfo[i].pattern == selectedSite.textContent ) {
				siteInfo.splice(i, 1);
				break;
			}
		}
		
		GM_setValue("siteInfo", JSON.stringify(siteInfo));
		
		// リストを更新
		updateSiteList();
	}
	
	/***************************************************************************
	 * 非表示のページ
	 */
	
	// 「非表示のページ」メニューボタン
	var hiddenPagesButton = document.createElement("span");
	hiddenPagesButton.style.marginLeft = "1em";
	hiddenPagesButton.style.border = "1px solid #f0ebff";
	hiddenPagesButton.style.cursor = "pointer";
	hiddenPagesButton.appendChild(document.createTextNode("非表示のページ"));
	
	header.appendChild(hiddenPagesButton);
	
	// 非表示のページテーブル
	var hiddenPagesTable = document.createElement("table");
	hiddenPagesTable.style.display = "block";
	hiddenPagesTable.style.borderCollapse = "collapse";
	
	// 非表示のページボックス
	var hiddenPagesBox = null;
	
	function showHiddenPagesBox(b) {
		if( hiddenPagesBox == null ) {
			hiddenPagesBox = document.createElement("div");
			hiddenPagesBox.style.position = "fixed";
			hiddenPagesBox.style.left = "0px";
			hiddenPagesBox.style.top = "22px";
			hiddenPagesBox.style.width = "100%";
			hiddenPagesBox.style.maxHeight = "300px";
			hiddenPagesBox.style.overflow = "auto";
			hiddenPagesBox.style.padding = "2px";
			hiddenPagesBox.style.backgroundColor = "#f0ebff";
			hiddenPagesBox.style.fontSize = "12px";
			hiddenPagesBox.style.display = "none";
			hiddenPagesBox.style.zIndex = "1";
			
			if( hiddenPagesTable.childNodes.length == 0 ) {
				hiddenPagesBox.appendChild(
					document.createTextNode("ブロックされているページはありません。"));
			} else {
				hiddenPagesBox.appendChild(hiddenPagesTable);
			}
			
			document.body.insertBefore(hiddenPagesBox, header.nextSibling);
		}
		
		if( b ) {
			hiddenPagesBox.style.display = "block";
			hiddenPagesButton.style.border = "1px solid #c0c0c0";
			hiddenPagesButton.style.backgroundColor = "#f0f0f0";
		} else {
			hiddenPagesBox.style.display = "none";
			hiddenPagesButton.style.border = "1px solid #f0ebff";
			hiddenPagesButton.style.backgroundColor = "";
		}
	}
	
	function toggleHiddenPagesButton() {
		if( hiddenPagesBox == null || hiddenPagesBox.style.display == "none" ) {
			showAppendSiteBox(false);
			showSiteListBox(false);
			showHiddenPagesBox(true);
		} else {
			showHiddenPagesBox(false);
		}
	}
	
	hiddenPagesButton.addEventListener("click", toggleHiddenPagesButton, false);
	
	/***************************************************************************
	 * ボーダーの調整
	 */
	var gbh = document.getElementsByClassName("gbh");
	gbh[0].style.top = "42px";
	gbh[1].style.top = "42px";
	
	/***************************************************************************
	 * 検索結果の非表示・装飾
	 */
	// サイト情報を元に検索結果をブロック・装飾を行う
	function blockAndPrettifyResults(target) {
		var siteInfo = JSON.parse(GM_getValue("siteInfo", "[]"));
		var results = target.getElementsByClassName("g");
		
		for(var i = 0; i < results.length; ++i) {
			if( results[i].firstChild.tagName != "H3" )
				continue;
			
			var url = results[i].firstChild.firstChild.href;
			
			for(var j = 0; j < siteInfo.length; ++j) {
				if( url.match(siteInfo[j].pattern) ) {
					if( siteInfo[j].block ) {
						// 検索結果を非表示にする
						results[i].style.display = "none";
						
						// 非表示ページテーブルに追加
						var hiddenPageRow = document.createElement("tr");
						hiddenPageRow.style.border = "1px solid #c0c0c0";
						hiddenPagesTable.appendChild(hiddenPageRow);
						
						var hiddenPageTitle = document.createElement("td");
						hiddenPageRow.appendChild(hiddenPageTitle);
						
						var hiddenPageLink = document.createElement("a");
						hiddenPageLink.href = results[i].firstChild.firstChild.href;
						hiddenPageLink.innerHTML = results[i].firstChild.firstChild.innerHTML;
						hiddenPageTitle.appendChild(hiddenPageLink);
						
						var hiddenPageContent = document.createElement("td");
						hiddenPageContent.innerHTML = results[i].childNodes[1].innerHTML;
						hiddenPageRow.appendChild(hiddenPageContent);
					} else {
						// 検索結果を装飾する
						if( siteInfo[j].backgroundColor != null )
							results[i].style.backgroundColor = siteInfo[j].backgroundColor;
					}
					
					break;
				}
			}
		}
	}
	
	// 読み込んだ分のページのブロック・装飾を行う
	blockAndPrettifyResults(document.body);
	
	// AutoPagerizeで次のページを読んだときに，ページのブロック・装飾を行う
	document.addEventListener("GM_AutoPagerizeNextPageLoaded", function() {
		var seps = document.getElementsByClassName("autopagerize_page_separator");
		var target = seps[seps.length - 1].nextSibling.nextSibling;
		
		blockAndPrettifyResults(target);
	}, false);
})();
