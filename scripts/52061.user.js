// ==UserScript==
// @name           Bitbucket Admin Menu
// @namespace      http://endflow.net/
// @description    Adds drop-down menu to Admin tab.
// @version        0.1.0
// @include        http://bitbucket.org/*/*/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-21] 0.1.0 initial version

(function(){
var span = $x('id("tabs")/ul/li/a/span[text() = "Admin"]');
if(!span || span.length === 0) return;
span = span[0];
span.innerHTML += ' &#187;';
var admin = span.parentNode.parentNode;
admin.className = 'ui-tabs-nav-issues';
var ul = document.createElement('ul');
var m = location.href.toString().match(/^http:\/\/bitbucket\.org\/([^\/]+)\/([^\/]+)/);
if(m.length !== 3) return;
var sub = function(name)'/' + m[1] + '/' + m[2] + '/admin/' + name + '/';
var menus = [
    ['Issue Tracker Settings', sub('issues')],
    ['Appearance Settings', sub('style')],
    ['Services', sub('services')],
    ['Repository management', sub('strip')]
];
for(var i = 0, l = menus.length; i < l; i++){
    var li = document.createElement('li');
    li.innerHTML = '<a href="' + menus[i][1] + '">' + menus[i][0] + '</a>';
    ul.appendChild(li);
}
admin.appendChild(ul);
function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
