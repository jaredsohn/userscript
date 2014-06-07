// ==UserScript==
// @name           Wedata Login Utility
// @namespace      http://endflow.net/
// @include        http://wedata.net/login
// ==/UserScript==

(function(){
    var url = 'http://path/to/your/openid/url/';
    var input = document.getElementById('openid_url');
    if(input){
        input.value = url;
    }
})();