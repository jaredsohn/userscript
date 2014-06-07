// ==UserScript==
// @name           Highlight Certain Text
// @include        *
// @namespace      http://userscripts.org/users/86496
// @description    Highlight pre-determined keywords with a lightweight script.
// @version        1.41a
// ==/UserScript==


// hzhbest， 20091215, 20100107, 20100304, 20100524
// my notes--
/*
Credit for
Selected Text Highlighter by Volkan Unsal
and
Word Highlighter by Zeb
*/
/* 
本脚本参考了多个文本高亮脚本而最终写成，遵循简单至上的原则，最优化性能。
参考鸣谢：Selected Text Highlighter by Volkan Unsal，我用了他的高亮函数但稍微简化了；
Word Highlighter by Zeb，我借用了他高亮多组关键词的思路，但换了相对更容易编辑的方式；
*/

(function(){
var HCT = 'HiLiCerText', HCS = 'HiLiSwitch';
var text = GM_getValue(HCT, ''), swch = GM_getValue(HCS, true);
var hilited = false;
var cl, wordArray = [];
var cssNode, notice, noticeTimer;
var notZhLocale = !!(navigator.userAgent.toLowerCase().indexOf('zh-') == -1);
var menuText = (notZhLocale)?'Highlight What Text?':'要高亮什么？';
var promptText = (notZhLocale)?'Please input your keywords separated by commas:':'请输入关键词，用逗号分隔：';
var NoticeText = (notZhLocale)?['Highlight is ON.','Highlight is OFF.']:['已开启高亮。','已关闭高亮。'];

GM_registerMenuCommand(menuText, editKeyword);

if (swch) ini_hili();
document.addEventListener('keydown', keyHandle, false);
	
function ini_hili() {
	var offmark = text.replace(/，/g, ',').indexOf(',,');
	if (offmark == -1) var _word = text;
	else if (offmark == 0) return;
	else var _word = text.substring(0, offmark);

	wordArray = _word.replace(/，/g, ',').toLowerCase().split(',').filter(function(_t){return !!_t;});
	if (wordArray.length == 0) return;
	//GM_log(wordArray);
	// ## Colors used:
	// ## 使用到的颜色列表：
	var colorArray = ["#FFBBBB", "#BBFFBB", "#BBBBFF", "#F9FFBB", "#FFDCBB", "#FFBBEB", "#EEBBFF", "#BBC6FF", "#BBDDFF"];
	cl = colorArray.length;

	// Insert CSS
	var headID = document.getElementsByTagName("head")[0];         
	cssNode = document.createElement('style');
	cssNode.type = 'text/css';
	cssNode.innerHTML = '.T_HiLi0 {background-color: ' + colorArray[0]+ ';} .T_HiLi1 {background-color: ' + colorArray[1]+ ';} .T_HiLi2 {background-color: ' + colorArray[2]+ ';} .T_HiLi3 {background-color: ' + colorArray[3]+ ';} .T_HiLi4 {background-color: ' + colorArray[4]+ ';} .T_HiLi5 {background-color: ' + colorArray[5]+ ';} .T_HiLi6 {background-color: ' + colorArray[6]+ ';} .T_HiLi7 {background-color: ' + colorArray[7]+ ';} .T_HiLi8 {background-color: ' + colorArray[8]+ ';}[class^="T_HiLi"]{font: inherit !important;}.T_Notice{position:fixed;bottom:0;right:10px;z-index:10001;border:1px solid black;border-bottom-width:0;width:120px;text-align:center;}';
	headID.appendChild(cssNode);
	// Watch for AutoPagerize
	window.addEventListener('AutoPagerize_DOMNodeInserted', function(e){if (hilited) HighLightAll(e.target);}, false);

	HighLightAll();
}

function HighLightAll(node) {
// console.time('HighLightAll');
	var doc = node || document;
	for (l = 0; l < (wordArray.length); l++) {
		var allText = document.evaluate( "//text()", doc, null, XPathResult. ORDERED_NODE_SNAPSHOT_TYPE , null);
		var allTextLen = allText.snapshotLength;
		var cword = wordArray[l];      //GM_log(cword);
		for(var i = 0; i < allTextLen; i++)
		{
			var cur = allText.snapshotItem(i);
			var par = cur.parentNode;
			var parName = par.nodeName.toLowerCase();
			var textInd;
				// Avoid some elements
			if (parName == "layer" || parName == "title" || parName == "style" || parName == "script" || parName.indexOf("textarea") == 0 || parName.indexOf("input") == 0 || parName.indexOf("select") == 0){
				continue;
			} else {
			do
				{
				var curText = cur.nodeValue;
				textInd = curText.toLowerCase().indexOf(cword);
				if(textInd != -1){
					var before = document.createTextNode(curText.substring(0, textInd));
					var highlight = document.createElement("layer");
						highlight.setAttribute("class","T_HiLi" + (l%cl));

					highlight.innerHTML = curText.substring(textInd, textInd + cword.length) ;
					var after = document.createTextNode(curText.substring(textInd + cword.length));
					par.insertBefore(before, cur);
					par.insertBefore(highlight, cur);
					par.insertBefore(after, cur);
					par.removeChild(cur);
					cur = after;
				}
				} while(textInd != -1)
			}	

	}
	}
	hilited = true;
// console.timeEnd('HighLightAll');
}

function removeHilite() {
	var hililayers = document.getElementsByTagName('layer');
	for (i=hililayers.length-1;i>=0;i--) {
		if (hililayers[i].className.indexOf('T_HiLi') != -1) {
			var nodetext = document.createTextNode(hililayers[i].textContent);
			hililayers[i].parentNode.insertBefore(nodetext, hililayers[i]);
			hililayers[i].parentNode.removeChild(hililayers[i]);
		}
	}
	hilited = false;
}

function keyHandle(e) {
	if (/^(?:input|textarea)$/i.test(e.target.localName)) return;
	var k1 = e.ctrlKey? '1':'0';
	var k2 = (e.metaKey || e.altKey)? '1':'0';
	var k3 = e.shiftKey? '1':'0';
	var k4 = String.fromCharCode(e.which);
	var keycom = k1+k2+k3+k4;
	
	switch (keycom) {
	case '110H':	toggleHili(); break;
	case '011H':	editKeyword(); break;
	case '000H':	if (hilited) removeHilite(); ini_hili();
	}
}

function toggleHili() {
	swch = !swch;
	GM_setValue(HCS, swch);
	if (hilited) removeHilite();
	else ini_hili();
	visualNotice();
}

function editKeyword() {
	_text = prompt(promptText, text);
	if (_text == null) return;
	if (_text != text) {
		text = _text;
		GM_setValue(HCT, text);
		if (text) {
			if (hilited) removeHilite();
			swch = true;
			GM_setValue(HCS, swch);
			ini_hili();
		}
	}
}

function visualNotice() {
	clearTimeout(noticeTimer);
	if (!notice) {
		notice = document.body.appendChild(document.createElement('div'));
		notice.setAttribute('class', 'T_Notice');
	}
	notice.style.display = 'block';
	notice.innerHTML = (hilited)? NoticeText[0] : NoticeText[1];
	notice.style.backgroundColor = (hilited)? '#8ECF63' : '#CF8E63';
	noticeTimer = setTimeout(function(){notice.style.display = 'none';}, 3000);
}

})();	