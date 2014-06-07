// ==UserScript==
// @name           Google Language Changer
// @namespace      http://endflow.net/
// @description    Add a drop-down list for changing language used Google search.
// @version        0.1.0
// @include        http://*.google.tld/*
// @include        http://google.tld/*
// @include        https://*.google.tld/*
// @include        https://google.tld/*
// @exclude        http://mail.google.tld/*
// @exclude        https://mail.google.tld/*
// @exclude        http://docs.google.tld/*
// @exclude        https://docs.google.tld/*
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-06-19] 0.1.0 initial version

(function(){
var list = ['en', 'ja'];
var form = unsafeWindow.document.forms['tsf'];
if(!form){
    setTimeout(arguments.callee, 200);
    return;
}
var hl = form['hl'];
var select = document.createElement('select');
select.addEventListener('change', function(){
    hl.value = select.value;
    form.submit();
}, false);
list.forEach(function(lang){
    var option = document.createElement('option');
    option.value = lang;
    option.innerHTML = lang;
    select.appendChild(option);
});
select.value = hl.value;
hl.parentNode.appendChild(select);
})();
