// ==UserScript==
// @name         Wall Street Journal Ad Remover
// @namespace    wsjAdRemover
// @include      http://*.wsj.com/*
// @include      http://wsj.com/*
// @include      https://*.wsj.com/*
// @include      https://wsj.com/*
// @match        http://*.wsj.com/*
// @match        http://wsj.com/*
// @match        https://*.wsj.com/*
// @match        https://wsj.com/*
// @datecreated  2010-03-12
// @lastupdated  2010-03-13
// @version      0.1
// @author       Erik Vergobbi Vold
// @license      GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @description  This userscript removes ads from the Wall Street Journal, if it misses any let me know.
// ==/UserScript==

(function(d){
	var adRemoverFunc = function(){
		var classNameAry = ['advertisement', 'adSummary', 'specialAdvertising', 'emailSignUp', 'ad_artBottomCircMarketing'],
			tempEle, tempEles;

		// remove known ad class names
		for (var i = 0; i < classNameAry.length; i++) {
			tempEles = d.getElementsByClassName(classNameAry[i]);
			for (var j = 0; j < tempEles.length; j++) {
				tempEles[j].parentNode.removeChild(tempEles[j]);
			}
		}
	}
	window.addEventListener( "load", adRemoverFunc, false );
	adRemoverFunc();
	setTimeout( adRemoverFunc, 2000 );
})(document);
