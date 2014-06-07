// ==UserScript==
// @name	Skype-линкификатор
// @version	1.2
// @namespace	http://userscripts.org/scripts/show/88068
// @include     http://*
// @exclude	http://acid3.acidtests.org/*
// ==/UserScript==

document.addEventListener('DOMContentLoaded',function(){
// Регэксп для телефонов - первые два общие, последний для слитных номеров в РФ 
// надеюсь никто не смотрит странички про сложение 11 значных чисел и текстовые url с +№ в них? :)
const numberRegex = /(\+?\d{1,3}[\s\-]*\(\s*\d{2,4}\s*\)([\s\-]*\d{2,4}){2,3})|(\+?\d{0,3}[\s\(]+\d{2,3}[\s\)]+((\d{2,3}\-\d{2}\-\d{2})|(\d{2,3}\-\d{4})))|((\+7|^8)[\s\-\(]{0,2}\d{3}[\)\s\-]{0,2}\d{2,3}\-?\d{2}-?\d{2})/g;

function skypeURL(t) {
	// Замена кода межгорода 8 на префикс страны +7 или добавление + к коду страны
	var fixedNum;
	if (String(t).charAt(0) == '(') t = '+7' + t; 
	fixedNum = (String(t).replace(/[\-\s\/\(\)\.]/g, ''));
	if (String(fixedNum).charAt(0) != '+') { 
		fixedNum = String(fixedNum).replace( /^8/, '7' );
		fixedNum = '+' + fixedNum; 
	}
	return 'skype:' + fixedNum + '?call';
}

// теги, в содержимом которых может быть номер телефона
var allowedParents = [ 'abbr', 'acronym', 'address', 'b', 'bdo', 'big', 'blockquote', 'body', 'caption', 'center', 'cite', 'dd', 'del', 'div', 'dfn', 'dt', 'em', 'fieldset', 'font', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'i', 'iframe', 'ins', 'kdb', 'li', 'nobr', 'object', 'pre', 'p', 'q', 'samp', 'small', 'span', 'strike', 's', 'strong', 'sub', 'sup', 'td', 'th', 'tt', 'u', 'var' ];

// иконка Skype
var skypeImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hJREFUeNo8k92LG1UYxp/zMTOZJJM02bjpdrfb1uqytF1LsWJVbKmKpSBe1F71ooJe6IV44Y32QrSgiGL/gl6ISAWxFUWhVCsLtWCtu25bFttK3N2yGxOTbDaTj/nIzDnHkygOHBhmznne9/09zyH3lIIpgVK9e+SO67+xEsppi/L6hEUu2kz1AtBRCX5t+yZrbrPNlixIUGXANABKAFKWCjfLzbfmWuKDrRkHnFBsRBK32zFqgYAfK3QEBVNxuMvBhRe3macns+k/BPlP4Hqt9+Slamf2kbER5sdAsw+seQIKAgkK+FKi7FEsdiRWfYlR+M0PZzIn9o/bl7Q++I1G+6Wc4+jDBPVQoerF2OMIHC5ayBkMg2cg8mMlwEclhflOKv/yr62vLljqmftziZ9pU8lRg3Fs9CWqvsDOtMCxCRuxHu2zez7OLgVY6UR4btzGxzMmMkxgDcnkmd/d96SMwBORapQ9iQKnaPVjPFDQg4Hg85UuPlljoJTji3If705LeFp00iaYdAwsuOFTC5XeQb7b4Ze/3AhP5vMcjFK0hRq2fXxrEjkrxlIgcbfD8drNEE1NzuYcUkhUYgO/1XpHeZ8lulQjGwArJhjm2wITyRDTusrJ7da/DESE63WFNxcD/LKhO2R6adirntzBo1hyqq1zONEOSCy0gHN69ocyIfZkGZ4YYdiXpTi0OY1vNpl4bLaL5UDDpTodFIJvMeI//9Y2XV2PcNuNMZUCXtjCcaYkcW5V+6RC7MtI/HDQ0R1qgTzD8qoahkAIbtDxJLvL+tGdORdoaBuPjXG8syuFU1MUaa6DocdjnMGgbPje7IshZMDAvIe9NGWq3pGR+NNa2wPlBs6XQ3hRjFPTSZSeTeHW00lcPZRFxmT47i8P11yCdAKwrUE+kCWV9TpMSPvtG+7lWTX2eFHTHNWVjxYZdjsMKa7zERBcaca4WBvUpnp2go4imBG1RdL2KsMPLTcqvn/L//onkTuws5BGSoNliPUdGISaQO+HRQeHAUENlBoNvJr1ThO3VxlaxSVF6Ivs+WXv9Sst+UqX2uPUNPUfCZ1kjOUdFFImukGM6vo6DrD29yemCs//L6A0rziiiCKlV5BbavcPV335sJRUWlyxhbbY26PGfVkZ+vsz/NtHH8ydRdJw/xFgAH1MlPmzQ5cxAAAAAElFTkSuQmCC';

var xpath = '//text()[(parent::' + allowedParents.join(' or parent::') + ')]';
var candidates = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var cnd = null, i = 0; (cnd = candidates.snapshotItem(i)); i++) {
	if (numberRegex.test(cnd.nodeValue)) {
		var span = document.createElement('span');
		var source = cnd.nodeValue;
		
		cnd.parentNode.replaceChild(span, cnd);
	
		numberRegex.lastIndex = 0;
		for (var match = null, lastLastIndex = 0; (match = numberRegex.exec(source)); ) {
			span.appendChild(document.createTextNode(source.substring(lastLastIndex, match.index)));
			
			var img = document.createElement('img');
			img.setAttribute('alt','Skype');
			img.setAttribute('title', 'Skype');
			img.setAttribute('style', 'vertical-align:middle; margin-right: 4px;');
			img.setAttribute('src', skypeImage);

			var a = document.createElement('a');
			a.setAttribute('href', skypeURL(match[0]));
			a.setAttribute('style', 'vertical-align:middle;');
			a.appendChild(document.createTextNode(match[0]));

			span.appendChild(img);
			span.appendChild(a);
	
			lastLastIndex = numberRegex.lastIndex;
		}
	
		span.appendChild(document.createTextNode(source.substring(lastLastIndex)));
		span.normalize();
	}
}
}, false);