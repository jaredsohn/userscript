// ==UserScript==
// @name   templates
// @namespace templates
// @include  http://*/my/s3/data/menu/edit.php*
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

window.onload=function(){
document.body.innerHTML = document.body.innerHTML.replace(/style="width: 16%; float: left; background: #f2f2f2; border-radius: 3px; padding: 10px;"/g, 'id="my_templates"');

$('body').append('<style>#my_templates {width: 16%; position:fixed; top:100px; right:20px; background: #EBEADB;border:2px solid #CBC7B8; border-radius: 3px; padding: 10px;}</style>');
}

