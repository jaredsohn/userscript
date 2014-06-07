// ==UserScript==
// @name           GLCC
// @description    Google Link Color changer
// @include          http://*.*.*/
// @include          http://www.google.com/
// @include          http://google.com/
// @include          https://www.google.com/
// @include          http://www.google.com
// ==/UserScript==
var script_style_div = document.createElement('div');
script_style_div.innerHTML = 
'<style><!-- ' +  
'a:link {ctext-decoration: none;color: #0AADB6 ! important;}' + 
'a:visited {text-decoration: none;color: #0AADB6;}' + 
'a:hover {text-decoration: underline;color: #00CCFF;}' +  
'a:active {text-decoration: none;color: #00CCFF;}' +    
'--></style>';