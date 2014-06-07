// ==UserScript==
// @name       Select Chrome History By Domain
// @namespace  http://uanguei.info/2012/04/delete-chrome-history-by-site/
// @version    0.1
// @description  Google Chrome Helper - (Select History By Domain)
// @include    chrome://history
// ==/UserScript==
/*
ATTENTION: THIS CODE DOESN'T WORK!
This script was written for a special page of Chrome "chrome://history"
But you can not enable any plugin (tampermonkey or greasemonkey) in that page.
If you know how, please let me know.

However,you can copy this block to your javascript console and run it, that will work.
*/
(function(){
    var domain = document.createElement('input');
    domain.type='text';
    domain.id = 'input-domain';
    $('editing-controls').appendChild(domain);
    
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = 'select-by-domain';
    btn.value = 'Select by domain';
    btn.addEventListener('click',function(){
        var targetDomain = $('input-domain').value;
        var entries = document.querySelectorAll('label.entry-box');
        for(var i=0; i<entries.length; i++){
            var ele = entries[i];
            var domainValue = ele.querySelector('div.domain').textContent;
            if(domainValue.match(targetDomain)){
                $(ele.htmlFor).checked='checked';
            }
        }
        historyView.updateRemoveButton();
    });
    $('editing-controls').appendChild(btn);
})();