// ==UserScript==
// @name           SalesforceDevelopmentLinks
// @description    Salesforceの画面(ApexClass,VisualforcePage)に開発者向けのリンクを追加します。
// @include        *.salesforce.com/*
// ==/UserScript==


(function(pathname, doc){

var Label = {
	test: "テスト",
	page: "ページ",
	pageTarget: "ページを開くID"
};

var ActionSeparator = " | ";

// Apex Class
if ("/01p" === pathname) {
	var cells = document.querySelectorAll(".actionColumn");
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var nsPrefix = getNameSpacePrefix(cell);
		var id = getParameterFromChildlen(cell, "id");
		var apexName = getParameterFromChildlen(cell, "apex_name");
		if (!id || !apexName) {
			continue;
		}
		cell.appendChild(doc.createTextNode(ActionSeparator));
		cell.appendChild(createTestLink(id, apexName, nsPrefix));
	}
}

// Visualforce Page
var pageLinks = [];
var pageTargetInput;
if (pathname in {
	"/066": {},
	"/apexpages/setup/listApexPage.apexp": {}
}) {
	var buttonArea = document.querySelector(".pbHeader");
	pageTargetInput = doc.createElement("input");
	pageTargetInput.type = "text";
	pageTargetInput.addEventListener("input", onOpenIdUpdate, false);
	buttonArea.appendChild(doc.createTextNode(Label.pageTarget + " : "));
	buttonArea.appendChild(pageTargetInput);
	
	if (unsafeWindow.getCookie)
		pageTargetInput.value = unsafeWindow.getCookie("pageTarget");
	
	var cells = document.querySelectorAll(".actionColumn");
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		var pageName = getParameterFromChildlen(cell, "apex_name");
		if (!pageName) {
			continue;
		}
		cell.appendChild(doc.createTextNode(ActionSeparator));
		var link = createApexPageLink(pageName);
		pageLinks.push(link);
		cell.appendChild(link);
	}
	
	onOpenIdUpdate();
}

// ページ一覧画面の表示件数を増やす
var linkToPages = doc.getElementById("ApexPages_font");
if (linkToPages) {
	linkToPages.href = "/066?" + encodeURIComponent("j_id0:theTemplate:j_id8:rowsperpage") + "=100";
}
// クラス一覧画面の表示件数を増やす
var linkToClasses = doc.getElementById("ApexClasses_font");
if (linkToClasses) {
	linkToClasses.href = "/01p?" + encodeURIComponent("all_classes_page:theTemplate:classList:rowsperpage") + "=100";
}

/**
 * リンク対象IDの変更イベント。
 */
function onOpenIdUpdate() {
	var paramEmptyRE = /\?$/;
	if (!pageTargetInput) {
		return;
	}
	var value = pageTargetInput.value,
		length = pageTargetInput.value.length;
	if (length != 15 && length != 18) {
		value = "";
	}
	for (var i = 0; i < pageLinks.length; i++) {
		var link = pageLinks[i];
		var url = removeUrlParameter(link.href, "id");
		if (value) {
			if (paramEmptyRE.test(url)) {
				url += "id=" + value;
			} else {
				url += "&id=" + value;
			}
		}
		link.href = url;
	}
	if (unsafeWindow.setCookie)
		unsafeWindow.setCookie("pageTarget", value);
}

/**
 * 渡されたノードから名前空間プレフィックスを取得します。
 */
function getNameSpacePrefix(srcCell) {
	var nsCell = srcCell.parentNode.querySelector("td.dataCell");
	if (nsCell) {
		return nsCell.textContent.replace(/[\s]/, '');
	}
}

/**
 * 渡されたノード内のa要素のhrefから指定されたパラメータを取得します。
 */
function getParameterFromChildlen(node, name) {
	var links = node.getElementsByTagName("a");
	for (var i = 0, l; i < links.length; i++) {
		l = links[i];
		var param = getUrlParameter(l.href, name);
		if (param) {
			return param;
		}
	}
}

/**
 * URLからGETパラメータを取得します。
 * パラメータが存在しない場合、nullを返します。
 */
function getUrlParameter(url, name) {
	var tail = url.split(name + "=")[1];
	return (tail ? tail.split("&")[0] : null);
}

/**
 * URLからパラメータを削除して返します。
 */
function removeUrlParameter(url, targetName) {
	var urlSplited = url.split("?"),
		path,
		parameterStr,
		parameters,
		paramArray = [];
	path = urlSplited[0];
	parameterStr = urlSplited[1];
	if (parameterStr) {
		parameters = parameterStr.split("&");
		for (var i = 0; i < parameters.length; i++) {
			var pvArr = parameters[i].split("=");
			var name = pvArr[0], value = pvArr[1];
			if (name !== targetName) {
				paramArray.push({name:name,value:value});
			}
		}
	}
	
	return path + "?" + paramArray.map(function(param) {
		return param.name + "=" + param.value;
	}).join("?");
}

/**
 * Apexクラスのテストページへのリンク作成
 */
function createTestLink(id, apexClass, nsPrefix) {
	var elm = doc.createElement("a");
	elm.className = "actionLink";
	elm.href = "/setup/build/runApexTest.apexp?class_id=" + id + "&class_name=" + apexClass + (nsPrefix ? "&ns_prefix=" + nsPrefix : "");
	elm.appendChild(doc.createTextNode(Label.test));
	return elm;
}

/**
 * Apexページへのリンクを作成
 */
function createApexPageLink(name) {
	var link = doc.createElement("a");
	link.className = "actionLink";
	link.href = "/apex/" + name;
	link.textContent = Label.page;
	return link;
}

})(location.pathname, document);