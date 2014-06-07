// ==UserScript==
// @name		Autofill openid text fields
// @version	1.0
// @date		2008-06-21
// @author	Artemy Tregubenko <me@arty.name>
// @description 	Click or otherwise focus openid text field to automatically put your openid in it. When installing, replace 'http://arty.name/' with your openid.
// ==/UserScript==


document.addEventListener('load', function(){
    var openid = 'http://arty.name/';
    var inputs = document.getElementsByName('openid_url');
    for (var index = 0; index < inputs.length; index++) {
        inputs[index].addEventListener('focus', function(){ this.value = this.value || openid }, false);
    }
    inputs = document.getElementsByName('openid_identifier');
    for (var index = 0; index < inputs.length; index++) {
        inputs[index].addEventListener('focus', function(){ this.value = this.value || openid }, false);
    }
}, false);


