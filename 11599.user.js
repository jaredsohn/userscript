// ==UserScript==
// @name           OWA Message Preview
// @namespace      http://www.dp.cx.com/userscripts
// @include        http://*/exchange/*/*/?Cmd=contents
// @include        http://*/exchange/*/*/?Cmd=contents*
// ==/UserScript==

const RULES = [ 
  ".PV_bubble {position: absolute; width: 600px; border: solid 2px #000; " +
    "background: #fff; font-size: 12px; margin: 0; padding: 0;}",
  ".PV_bubble.PV_loading {width: auto; height: auto;}",
  ".PV_bubble.PV_loading .PV_scroller {text-align: center; color: #999; " +
    "font-style: italic; padding: 2em; }",
  ".PV_bubble .PV_scroller {overflow: auto; padding: 5px; margin: 0;}",
  // Hide quoted portions, signatures and other non-essential bits
  ".PV_bubble .q, .PV_bubble .ea, .PV_bubble .sg, .PV_bubble .gmail_quote, " +
    ".PV_bubble .ad {display: none}",
  ".PV_bubble h1 {font-size: 12px; font-weight: normal; margin: 0;}",
  ".PV_bubble h1 .sender {font-weight: bold}",
  ".PV_bubble .PV_message {border-bottom: solid 2px #ccc; margin: 0;}",
  ".PV_bubble .PV_message:last-child {border-bottom: 0}",
  ".PV_bubble .PV_message .PV_message-body {margin: 0; padding: 0}",
  ".PV_bubble .PV_point {position: absolute; top: 10px; " + 
    "left: 0; margin-left: -31px; width: 31px; height: 45px;}",
  ".PV_bubble .PV_buttons {padding: 6px; border-bottom: solid 1px #616c7f; " +
    "border-left: solid 1px #616c7f; white-space: nowrap; margin: 0 0 0 7px; " +
    "background: #c3d9ff; -moz-border-radius: 0 0 0 7px;}",
  ".PV_bubble .PV_subject {padding: 3px; border-bottom: solid 1px #616c7f; " +
    "border-left: solid 1px #616c7f; margin: 0 0 0 7px; font-size: 10pt;" +
    "background: #ffffff; -moz-border-radius: 0 0 0 7px;}",
  ".PV_bubble .PV_button {padding: 3px 5px 3px 5px; margin-right: 4px; " +
     "border-right: solid 1px #616c7f}",
  ".PV_bubble span.PV_button:last-child {border-right: 0;}"
];

var DISPLAY_DELAY = GM_getValue('DISPLAY_DELAY', 1)*1000;
var HIDE_DELAY = GM_getValue('HIDE_DELAY', 5)*1000;
var ALLOW_CACHE = GM_getValue('ALLOW_CACHE', 0);

initializeStyles();

this.bubbleNode = document.createElement("div");
this.bubbleNode.id = "bubbleNodePreviewer";
unsafeWindow.document.body.appendChild(this.bubbleNode);

var links = $x("//html/body/form/table/tbody/tr/td/table[3]/tbody/tr/td/font/a[count(font/img) = 0 and count(font/text()) = 1]");

var timerOver; var timerOut;
for(var lid = 0; lid < links.length; lid++) {
	var node = links[lid];
	node.addEventListener('mouseover', function() {
		var tthis = this;
		window.clearTimeout(timerOut);
		timerOver = window.setTimeout(function() {
			previewmessage(tthis);	
		}, DISPLAY_DELAY);
	}, false);
	node.addEventListener('mouseout', function() {
		timerOut = window.setTimeout(function() {
			window.clearTimeout(timerOver);
			if (document.getElementById('bubbleNodePreviewer')) {
				document.getElementById('bubbleNodePreviewer').innerHTML = "";
				document.getElementById('bubbleNodePreviewer').style.display = "none";
			}
		}, HIDE_DELAY);
	}, false);
}

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function previewmessage(nodeinfo) {
	GM_xmlhttpRequest({
	  method:  'GET',
	  url:     nodeinfo.href + (ALLOW_CACHE ? ('&c=' + genCache()) : ''),
	  headers: {
		'User-agent': 'GM_agent',
	  },
	  overrideMimeType: 'text/html; charset=' + document.characterSet,
	  onload:  function(responseDetails) {
		if (responseDetails.status == 200) {
			// bubble
			this.bubbleNode = document.getElementById('bubbleNodePreviewer');
			this.bubbleNode.style.display = "none";
			this.bubbleNode.className = "PV_bubble";

			var conversationRow = nodeinfo.parentNode.parentNode.parentNode;
			var conversationPosition = getAbsolutePosition(conversationRow);
			this.bubbleNode.style.top = (conversationPosition.top - conversationRow.offsetHeight/2 - 30) + "px";
			var peopleNode = conversationRow.getElementsByTagName("td")[5];
			var peopleNodePosition = getAbsolutePosition(peopleNode);
			this.bubbleNode.style.left = (peopleNodePosition.left + peopleNode.offsetWidth * 0.1) + "px";

			this.bubbleNode.innerHTML = responseDetails.responseText;
			this.bubbleNode.style.display = "block";
		}
	  },
	  onerror: function(responseDetails) {
	  	GM_log(responseDetails.responseText);
	  }
	});
}

function getAbsolutePosition(node) {
  var top = node.offsetTop;
  var left = node.offsetLeft;
  
  for (var parent = node.offsetParent; parent; parent = parent.offsetParent) {
    top += parent.offsetTop;
    left += parent.offsetLeft;
  }

  return {top: top, left: left};
}

function initializeStyles() {
  var styleNode = document.createElement("style");
  
  document.body.appendChild(styleNode);

  var styleSheet = document.styleSheets[document.styleSheets.length - 1];

  for (var i=0; i < RULES.length; i++) {
    styleSheet.insertRule(RULES[i], 0);
  }  
}

function genCache() {
	var curdate = new Date();
	return curdate.getFullYear()+''+(curdate.getMonth()+1)+''+curdate.getDate()+''+curdate.getHours()+''+curdate.getMinutes()+''+curdate.getSeconds();
}
