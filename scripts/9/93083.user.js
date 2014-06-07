// ==UserScript==
// @name		Google Referrer Anonymizer
// @namespace		http://www5.atpages.jp/rabbitbelly/
// @author		Jankokutou
// @version		0.2.0
// @description		Anonymizes your HTTP referrers when you visit web pages from Google's search results. / Googleの検索結果からWebページを訪問する際にHTTPリファラを匿名化する。
// @include		http://www.google.*
// ==/UserScript==

/* ****************************************************************

	Last Update:
		2010-01-10

**************************************************************** */

(function () {

var _anonym;
var _timer_id;
var _reg_include, _reg_exclude;
var _icon_style;
var _anonymize_checkbox;
var _log_name = "GRA_LOG";
var _log_data;
var _checkresult_timerID;
var _div_constructor = document.createElement("div").constructor;

/* **************** MAIN FUNCTIONS **************** */

function enableAnonymizer() {
	var keyword_node = document.getElementsByName("q")[0];

	_timer_id = 0;
	window.addEventListener("DOMContentLoaded", applyToIresNode, false);
	window.addEventListener("DOMNodeInserted", applyToIresNode, false);
	if (keyword_node) {
		keyword_node.addEventListener("unfocus", applyToIresNode, false);
	}
	if (document.getElementById("main")) {
		_checkresult_timerID = setInterval(checkResultsChange, 1000);
	}
	_anonym = true;
	saveLog();
	applyToIresNode();
	_AUTOPAGER.applyToEachNodes();
	showIcon();
}

function disableAnonymizer() {
	var keyword_node = document.getElementsByName("q")[0];

	if (_checkresult_timerID) {
		clearInterval(_checkresult_timerID);
		delete _checkresult_timerID;
	}
	window.removeEventListener("DOMContentLoaded", applyToIresNode, false);
	window.removeEventListener("DOMNodeInserted", applyToIresNode, false);
	if (keyword_node) {
		keyword_node.addEventListener("unfocus", applyToIresNode, false);
	}
	_anonym = false;
	saveLog();
	hideIcon();
}

function checkResultsChange() {
	var ires_node = document.getElementById("ires");
	if (ires_node && !ires_node.getElementsByClassName("x_gmjct_gglrefanonym").length && document.getElementById("x_gmjct_gglrefanonym_menu")) {
		applyToIresNode();
	}
}

function applyToIresNode() {
	var ires_node;
	var timer_id = new Date();

	if (_timer_id < timer_id - 200 && (_timer_id = timer_id) && (ires_node = document.getElementById("ires"))) {
		applyAnonymizer(ires_node);
	}
}

function applyAnonymizer(node) {
	var link_nodes, link_node;
	var link_href;
	var added_className = "x_gmjct_gglrefanonym";
	var str;
	var i, link_count;

	str = " " + added_className;
	link_nodes = node.getElementsByTagName("a");
	for (link_count = link_nodes.length, i = 0; i < link_count; i++) {
		link_node = link_nodes[i];
		link_href = link_node.href;
		if (link_href && _reg_include.test(link_href) && !_reg_exclude.test(link_href)) {
			link_node.addEventListener("mouseup", anonymizeLink, false);
			link_node.addEventListener("keypress", anonymizeLink, false);
			if (link_node.className) {
				if (link_node.className.indexOf(added_className) == -1) {
					link_node.className += str;
				}
			}
			else {
				link_node.className = added_className;
			}
		}
	}
}

function anonymizeLink(event) {
	var link_node;
	var link_href;
	var CER;
	if (_anonym && (event.type == "keypress" ? (event.keyCode == 13) : true)) {
		link_node = event.currentTarget;
		link_href = link_node.href;
		CER = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"};
		link_node.href = "data:text/html;charset=utf-8," + encodeURIComponent("<meta http-equiv=\"refresh\" content=\"0; url=" + link_href.replace(/[&<>"]/g, function(c){return CER[c];}) + "\">");
		setTimeout(function () {link_node.href = link_href;}, 1);
	}
}

function showIcon() {
	if (_icon_style) {
		_icon_style.cssRules[0].style.cssText = "margin-right: 16px !important;";
		_icon_style.cssRules[1].style.cssText = "margin: 0 -14px 0 2px; padding: 0; border: 0; vertical-align: bottom; content: url(\"data:image/gif;base64,R0lGODlhDgAOAMwAAP/4///w//HJ///g///q//nR/7iQ///Z/4pi/2A42OjA/7KK/1AoyJBo/21F5XlR8aB4/+G5/9Kq/9iw/ygAoMGZ/5hw/4FZ+c+n/0cfv6iA/wAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAOAA4AAAWIICAGxGAWQyCuA7ECCia4IhFhlSIWjaG4AYGhkdABAgiEQRAYSCwOR+AwAWgSEMmgYEAwLIBFAhBhKAuCxSVTTVAIgcRjIUg/Eq5DQQVx0AsVDxAAAwIFBWQPFSgTDToIFBQMJFkpAhIBARcMDA6IEUxHLw0ILy8kAwcGBgcmKi8EB3V1BzQAIQA7\");";
	}
}

function hideIcon() {
	if (_icon_style) {
		_icon_style.cssRules[0].style.cssText = "";
		_icon_style.cssRules[1].style.cssText = "";
	}
}

/* **************** /MAIN FUNCTIONS **************** */
/* **************** MENU FUNCTIONS **************** */

function getLog() {
	var log;

	if (log = GM_getValue(_log_name)) {
		_log_data = readQuery(log);
		return Number(_log_data.enable) ? true : false;
	}
	else {
		_log_data = null;
		return false;
	}
}

function saveLog() {
	var query_str;
	if (_anonymize_checkbox) {
		if (_anonymize_checkbox.checked) {
			if (_log_data) {
				_log_data.enable = 1;
			}
			else {
				_log_data = {enable: 1};
			}
			query_str = toQuery(_log_data);
			GM_setValue(_log_name, query_str);
		}
		else {
			if (_log_data) {
				delete _log_data.enable;
				query_str = toQuery(_log_data);
				if (query_str) {
					GM_setValue(_log_name, query_str);
				}
				else {
					GM_deleteValue(_log_name);
				}
			}
			else {
				GM_deleteValue(_log_name);
			}
		}
	}
}

function checkGoogleType() {
	if (document.getElementById("main")) {
		return 1;
	}
	else {
		return 2;
	}
}

function enableMenuAdition() {
	window.addEventListener("DOMNodeInserted", createMenu, false);
}

function createMenu() {
	var div_node, checkbox_node, label_node;
	var page_type;
	var target_node, reference_node;

	if (target_node = document.getElementById("center_col")) {
		window.removeEventListener("DOMNodeInserted", enableMenuAdition, false);
		if (!document.getElementById("x_gmjct_gglrefanonym_checkbox")) {
			page_type = checkGoogleType();
			div_node = document.createElement("div");
			div_node.id = "x_gmjct_gglrefanonym_menu";
			div_node.className = "x_gmjct_gglrefanonym_style" + page_type;
	
			checkbox_node = document.createElement("input");
			checkbox_node.id = "x_gmjct_gglrefanonym_checkbox";
			checkbox_node.setAttribute("type", "checkbox");
			if (_anonym) {
				checkbox_node.setAttribute("checked", "checked");
			}
			checkbox_node.setAttribute("title", "Anonymize Referrer");
			setCheckboxEvent(checkbox_node);
			_anonymize_checkbox = checkbox_node;
	
			label_node = document.createElement("label");
			label_node.id = "x_gmjct_gglrefanonym_checkboxlabel";
			label_node.setAttribute("for", checkbox_node.id);
			label_node.setAttribute("title", "Anonymize Referrer");
			label_node.appendChild(document.createTextNode("Anonymize"));
	
			div_node.appendChild(checkbox_node);
			div_node.appendChild(label_node);
	
			reference_node = target_node.parentNode;
			target_node = reference_node.parentNode
			target_node.insertBefore(div_node, reference_node);
			setMenuRemovedEvent(div_node);
		}
	}
}

function setCheckboxEvent(node) {
	var listener = function () {
			if (node.checked) {
				enableAnonymizer();
			}
			else {
				disableAnonymizer();
			}
		};
	node.addEventListener("change", listener, false);
}

function setMenuRemovedEvent(node) {
	node.addEventListener("DOMNodeRemovedFromDocument", enableMenuAdition, false);
	node.addEventListener("DOMNodeRemovedFromDocument", createMenu, false);
}

/* **************** /MENU FUNCTIONS **************** */
/* **************** AUTOPAGER **************** */

var _AUTOPAGER = {
		init: function (event) {
				window.addEventListener("AutoPagerAfterInsert", _AUTOPAGER.onNodeInserted, false);	// AutoPager (Add-on)
				window.addEventListener("AutoPagerize_DOMNodeInserted", _AUTOPAGER.onNodeInserted, false);	// AutoPagerize (Add-on)
			},
		nodes: [],
		onNodeInserted: function (event) {
				var autopagerize_nodes = _AUTOPAGER.nodes;
				var node = event.target;
				if (_anonym) {
					applyAnonymizer(node);
				}
				else {
					autopagerize_nodes[autopagerize_nodes.length] = node;
				}
			},
		applyToEachNodes: function () {
				var autopagerize_nodes = _AUTOPAGER.nodes;
				var i;
				for (i = 0; i < autopagerize_nodes.length; i++) {
					applyAnonymizer(autopagerize_nodes[i]);
				}
				autopagerize_nodes.length = 0;
			}
	};

/* **************** /AUTOPAGER **************** */
/* **************** SUB FUNCTIONS **************** */

function readQuery(str) {
	var obj = {};
	var query = str.split("&");
	var matched;
	var i, count;

	for (count = query.length, i = 0; i < count; i++) {
		if (matched = query[i].match(/^([^=]+)=([\s\S]*)$/)) {
			obj[decodeURIComponent(matched[1])] = decodeURIComponent(matched[2]);
		}
	}
	return obj;
}

function toQuery(obj) {
	var query = [];
	var key;
	var value

	for (key in obj) {
		if (obj.hasOwnProperty(key) && (value = obj[key]) !== null && value !== undefined) {
			query[query.length] = encodeURIComponent(key) + "=" + encodeURIComponent(String(value));
		}
	}
	return query.join("&");
}

/* **************** /SUB FUNCTIONS **************** */
/* **************** INIT FUNCTIONS **************** */

function setMenuCSS() {
	GM_addStyle([
			"#x_gmjct_gglrefanonym_menu {font-size: 0.9em; line-height; 0.9em; border: 0;}",
			"#x_gmjct_gglrefanonym_menu input {margin: 0 5px; vertical-align: bottom; padding: 0;}",
			".x_gmjct_gglrefanonym_style1 {text-align: right; width: 894px; margin: 0; padding: 0 287px 0 0;}",
			".x_gmjct_gglrefanonym_style2 {text-align: right; width: 841px; margin: 0 0 3px 0; padding: 0;}"
		].join("\n"));
}

function addIconStyle() {
	var stylesheet = document.createElement("style");
	var head = document.getElementsByTagName("head")[0];

	if (head) {
		stylesheet.setAttribute("type", "text/css");
		head.appendChild(stylesheet);
		stylesheet.sheet.insertRule("#ires a.x_gmjct_gglrefanonym {}", 0);
		stylesheet.sheet.insertRule("#ires a.x_gmjct_gglrefanonym:after {}", 1);
		_icon_style = stylesheet.sheet;
	}
}

function init() {
	var matched;
	if (matched = location.hostname.match(/^www\.google\.(co\.(?:ao|bw|ck|cr|id|il|in|jp|ke|kr|ls|ma|mz|nz|th|tz|ug|uk|uz|ve|vi|za|zm|zw)|com(?:\.(?:af|ag|ai|ar|au|bd|bh|bn|bo|br|by|bz|co|cu|do|ec|eg|et|fj|gh|gi|gt|hk|jm|kh|kw|lb|ly|mt|mx|my|na|nf|ng|ni|np|om|pa|pe|ph|pk|pr|py|qa|sa|sb|sg|sl|sv|tj|tr|tw|ua|uy|vc|vn))?|it\.ao|cat|ad|ae|am|as|at|az|ba|be|bf|bg|bi|bj|bs|by|ca|cd|cf|cg|ch|ci|cl|cm|cn|cz|de|dj|dk|dm|dz|ee|es|fi|fm|fr|ga|ge|gg|gl|gm|gp|gr|gy|hn|hr|ht|hu|ie|im|is|it|je|jo|kg|ki|kz|la|li|lk|lt|lu|lv|md|me|mg|mk|ml|mn|ms|mu|mv|mw|ne|nl|no|nr|nu|pl|pn|ps|pt|ro|rs|ru|rw|sc|se|sh|si|sk|sm|sn|st|td|tg|tk|tl|tm|to|tt|vg|vu|ws)$/)) {
		_reg_include = /^https?\:/;
		_reg_exclude = RegExp("^http://(?:webcache\\.googleusercontent\\.com/search|" + location.hostname.replace(/\./g, "\\.") + "/(?:search|imgres|images)|translate\\.google\\.(?:com|" + matched[1].replace(/\./g, "\\.") + ")/translate)\\?");

		_AUTOPAGER.init();
		setMenuCSS();
		addIconStyle();
		if (getLog()) {
			enableAnonymizer();
		}
		else {
			disableAnonymizer();
		}
		enableMenuAdition();
		createMenu();
	}
}

/* **************** /INIT FUNCTIONS **************** */

init();

})();