// ==UserScript==
// @name           Bitbucket Issue Jump
// @namespace      http://blog.endflow.net/
// @description    Adds textfield to jump the issue page directly.
// @include        http://bitbucket.org/*/*/issues/*
// @include        http://bitbucket.org/*/*/issue/*
// @version        0.1.0
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2010-02-04] 0.1.0 initial version

(function(){
GM_addStyle(<><![CDATA[
#search form {
    margin-left: 6px;
    float: left;
}
]]></>);
var uiHTML = <><![CDATA[
<form id="jumpto" onsubmit="return false;">
    <fieldset>
        <span class="text-hl">Issue:</span>
        <input id="issuenum" type="search" size="8">
    </fieldset>
</form>
]]></>;
var search = document.getElementById('search');
search.innerHTML = uiHTML + search.innerHTML;
var jumpTo = document.getElementById('jumpto');
jumpTo.addEventListener('submit', function(){
    var num = document.getElementById('issuenum').value;
    if(num.length == 0) return;
    var cur = location.href.toString();
    var m = cur.match(/^http:\/\/bitbucket\.org\/[^\/]+\/[^\/]+\//);
    location.href = m[0] + 'issue/' + num + '/';
}, false);

function $x(x,c){c=c||document;var res=c.evaluate(x,c,null,4,null);
for(var i,nodes=[];i=res.iterateNext();nodes.push(i));return nodes}
})();
