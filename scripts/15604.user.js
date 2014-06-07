// ==UserScript==
// @name           Craigs Memo
// @namespace      http://sappari.org/
// @description    It allows you to write a memo on each page of Craigslist.
// @include        http://*.craigslist.org/*
// ==/UserScript==

//
// Add jQuery
// http://www.joanpiedra.com/jquery/greasemonkey/
//
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
    if (location.pathname.match(/\/\d+\.html$/)) {
	$("h2").append(createMemoButtonOrLine(location.pathname));
    } else {
	$("p").each(function (i, p) {
	    var pagePath = $("a", p).attr("href");
	    if (pagePath.match(/\/\d+\.html$/)) {
		$(p).append(createMemoButtonOrLine(pagePath));
	    }
	});
    }
}

function createMemoButtonOrLine(pagePath) {
    var memo = getMemo(pagePath);
    return memo
	? createMemoLine(pagePath, memo)
	: createMemoButton(pagePath, memo);
}

function createMemoButton(pagePath, memo) {
    return $('<span>memo</span>').css({
	marginLeft: 5,
	backgroundColor: "white",
	color: "#999",
	textDecoration: "underline",
	fontSize: "10pt",
	cursor: "pointer"
    }).click(function() {
	$(this).replaceWith(createMemoForm(pagePath));
    });
}

function createMemoLine(pagePath, memo) {
    memo = memo.replace(/https?:\/\/\S+/g, function(str) {
	return '<a'
	    + ' href="' + str + '"'
	    + ' target="_blank"'
	    + ' onclick="event.stopPropagation();"'
	    + '>'
	    + str
	    + '</a>';
    }).replace(/(\r\n|\r|\n)/g, "<br />");

    var div = $('<div />').html(memo).css({
	width: "70%",
	backgroundColor: "#EEE",
	margin: "2",
	padding: 5,
	color: "#444",
	fontSize: "10.5pt",
	fontWeight: "normal",
	border: "1px solid #FFF"
    }).click(function() {
	div.replaceWith(createMemoForm(pagePath));
    }).mouseover(function() {
	$(this).css("border-color", "#CCC");
    }).mouseout(function() {
	$(this).css("border-color", "#FFF");
    });
    return div;
}

function countRow(str) {
    return str.replace(
	    /[^(\r\n|\r|\n)]/g, ""
    ).replace(
	    /\r\n|\r|\n/g, "-"
    ).length + 1;
}

function createMemoForm(pagePath) {
    var div = $("<div />").css({
	backgroundColor: "#EEE",
	width: "70%",
	margin: 2,
	padding: 5
    });

    var originalMemo = getMemo(pagePath);
    var row = countRow(originalMemo);
    var textField = $('<textarea />').text(
	originalMemo
    ).attr({
	rows: (row <= 2) ? 2 : row-1
    }).css({
	width: "97%",
	margin: 2,
	padding: 2,
	color: "#444"
    });
    
    var saveButton = $('<input type="button" value="save" />').click(function(event) {
	var memo = textField.get(0).value;
	saveMemo(pagePath, memo);
	div.replaceWith(createMemoButtonOrLine(pagePath));
    }).css({
	margin: 2,
	verticalAlign: "middle"
    });

    textField.change(function(event) {
	saveButton.css("font-weight", "bold");
    });

    var cancelButton = $('<span>cancel</span>').css({
	marginLeft: 3,
	color: "#666",
	textDecoration: "underline",
	fontSize: "10.5pt",
	fontWeight: "normal",
	cursor: "pointer"
    }).click(function() {
	div.replaceWith(createMemoButtonOrLine(pagePath));
    });

    div.append(textField);
    div.append($('<br />'));
    div.append(saveButton);
    div.append(cancelButton);
    setTimeout(function() {
	textField.focus();
    }, 100);
    
    return div;
}

function getMemo(path) {
    return unescape(GM_getValue(getPageKey(path)) || "");
}

function saveMemo(path, str) {
    GM_setValue(getPageKey(path),
		escape(str));
}

function getPageKey(path) {
    return "memo_on_craigslist_" + path;
}