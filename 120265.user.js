// ==UserScript==
// @name          BDWM Mathematics 1.0
// @namespace     http://www.yeshiwei.com
// @description   (La)TeX support for BDWM 
// @include       http*://www.bdwm.net/bbs/*board=Mathematics*
// @include       http*://notes.yeshiwei.com/*
// ==/UserScript==

/*************************************************************
 *
 *  GmailChatTeX
 *  http://alexeev.org/gmailchattex.html
 *
 *  Works in Gmail's internal Chat, after you pop out (maximize the window)
 *  Important: edit the variable pathToMathJax !
 *
 *  Written by (C) Valery Alexeev <va.email.tex@gmail.com>
 *  Version 1.0 June 23, 2010
 *  Version 1.2 Marhc 12, 2011
 *  License: http://creativecommons.org/licenses/by-nc-sa/3.0/
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 **************************************************************
 */

var path_to_mathjax ="http://lab.yeshiwei.com/m/mathjax/MathJax.js?config=TeX-AMS_HTML";

configMathjax = 
 'MathJax.Hub.Config({\'HTML-CSS\': '+
 '{ preferredFont: \'TeX\','+
 'availableFonts: [\'STIX\',\'TeX\'] },\n'+
 'tex2jax: {'+
 'inlineMath: [ [\'$\', \'$\'], ["\\\\\\\\(","\\\\\\\\)"] ],'+
 'displayMath: [ [\'$$\',\'$$\'],[ "\\\\[", "\\\\]"] ],'+
 'processEscapes: true,'+ 
 'ignoreClass: \'tex2jax_ignore\|dno\' },'+
 'TeX: { noUndefined: { attributes: { '+
 'mathcolor: \'red\', mathbackground: \'#FFEEEE\',mathsize: \'90%\' } } },'+
 'messageStyle: \'none\''+
    '});';

// End of configurable variables for loading MathJax


var script1 = document.createElement("script");
script1.type = "text/x-mathjax-config";
var config = configMathjax;

if (window.opera) {script1.innerHTML = config} else {script1.text = config}
document.getElementsByTagName('center')[0].appendChild(script1);

var script = document.createElement("script");
script.type = "text/javascript";
script.src = path_to_mathjax;

document.getElementsByTagName('center')[0].appendChild(script);

