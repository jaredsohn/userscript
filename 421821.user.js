// ==UserScript==
// @name        Prototype Controller
// @namespace   http://userscripts.org/users/596630
// @description Expose class methods
// @include     http://svn.*Controller.groovy
// @version			0.1
// @copyright		Do what you please
// @grant       none
/*
document.body.childNodes[0].firstChild.nodeValue = document.body.childNodes[0].firstChild.nodeValue.split('\n').map(function (e){ if (e.match(/^\s*def\s[A-Za-z0-9]*\(.*\)/) || e.match(/^class/)) return e + '\n'; else return '';}).join('');
*/
// ==/UserScript==

function cleanUp(string) {
  var METHOD = /^\s*def\s[A-Za-z0-9]*\(.*\)/ ;
  var CLASS = /^class/ ;
  return string.split('\n').map(
        function (e){ 
            if (e.match(METHOD) || e.match(CLASS)) 
                  return e + '\n'; 
            else return '';
            }
        ).join('');
}

var node = document.body.childNodes[0].firstChild;
node.nodeValue = cleanUp (node.nodeValue);

