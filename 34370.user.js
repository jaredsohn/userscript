// ==UserScript==
// @name           RegExp Testing Script (test method)
// @namespace      http://userscripts.org/users/23652
// @description    Test regular expressions on this with the test method
// @include        http://*
// @include        https://*
// @include        file:*
// @exclude        about:*
// @exclude        chrome:*
// @copyright      JoeSimmons
// @version        1.0.2
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

var string = "i have one candy bar and two lollipops"; // string on which to use the regular expression
var RegExp = /(one candy bar).*(two lollipops)/; // Regular Expression

// DON'T EDIT //////////////////
// Get ID
function $(ID) {return document.getElementById(ID);}
// alignCenter by JoeSimmons
// Instructions: Supply an id string or node element as a first argument
function alignCenter(e) {
var node = (typeof e=='string') ? $(e) : ((typeof e=='object') ? e : false);
if(!window || !node) {return;}
var beforeDisplay = node.style.display;
node.style.display = '';
node.style.top = ((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
node.style.left = ((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
node.style.display = beforeDisplay;
node.style.opacity = '1';
}
var box = document.createElement('textarea');
	box.id = 'regexp_test_method';
	box.title = 'Double-Click this area to close it';
	box.setAttribute('style', 'position:fixed; top:'+window.innerHeight/2+'px; left:'+window.innerWidth/2+'px; width:60%; height:35%; opacity:0; border:1px solid #000; -moz-border-radius:4px; padding:15px 4px 4px 99px;');
	box.addEventListener('dblclick', function(){this.style.display='none';}, false);
if(RegExp.test(string)) {
var m_arr = string.match(RegExp),
	matched = '';
for(var i=0; i<m_arr.length; i++)  matched += 'Match['+i+']: '+m_arr[i] + '\n';
box.value = 'The regular expression matches the string.\n\n'+matched+'\n(Double-Click this area to close it).';
}
else box.value = 'The regular expression doesn\'t match the string';

document.body.insertBefore(box, document.body.firstChild);
alignCenter('regexp_test_method');

window.addEventListener('resize', function(){alignCenter('regexp_test_method');}, false);