// ==UserScript==
// @name           Twitter No Confirm
// @namespace      http://endflow.net/
// @description    kills confirmation dialog on deleting DM.
// @include        http://twitter.com/direct_messages
// ==/UserScript==

(function(){
$x('//img[@alt="Delete"]/..').forEach(function(a){
    a.setAttribute('onclick', /confirm\('[^']+'\)\) \{ (.*)\}/.exec(a.getAttribute('onclick'))[1] + ';return false;');
});
function $x(x,c){c=c||document;var r=document.evaluate(x,c,null,4,null);
for(var i,n=[];i=r.iterateNext();n.push(i));return n}
})();
