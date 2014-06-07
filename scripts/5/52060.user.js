// ==UserScript==
// @name           Bitbucket Disable Issue Following
// @namespace      http://endflow.net/
// @description    Disable issue following option in default on Issue Tracker of my own repository.
// @version        0.1.0
// @include        http://bitbucket.org/*/*/issues/new/
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-20] 0.1.0 initial version

(function(){
var w = this.unsafeWindow || window;
var admin = $x('id("tabs")/ul/li/a/span[text() = "Admin"]');
if(admin.length === 0) return;
var check = w.document.forms[2].follow;
check && check.removeAttribute('checked');
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
