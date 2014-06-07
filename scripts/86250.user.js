// ==UserScript==
// @name   OperaFix GyaoYahooDouga 
// @version 0.3
// @description Version 0.3 (OperaFixギャオヤフー)
// @namespace OperaFix GyaoYahoo (cc) http://creativecommons.org/licenses/by-nc/2.1/jp/deed.ja
// @author  Kurojitosan (SpecialThanks hogehoge)
// @include http://player.gyao.yahoo.co.jp/*
// @include http://gyao.yahoo.co.jp/*
// @include http://*.yahoo.co.jp/*
// @exclude http://acid3.acidtests.org/* 
// ==/UserScript==
                            
	if(0<=navigator.userAgent.indexOf('Opera')){
		if(location.hostname=='gyao.yahoo.co.jp') {
			window.opera.defineMagicFunction('isCommonEnvCheck',function(){return(true);});
 			window.opera.defineMagicFunction('isNormalPlayerCheck',function(){return(true);});
		}
	} 
