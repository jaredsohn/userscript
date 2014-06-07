// ==UserScript==
// @name           SUM search fix
// @description    fix sum search form option
// @include        http://www.sum.com.tw/result1_all.php*
// ==/UserScript==

var model = document.getElementById('select3');
model.innerHTML="";
var model_opt = document.createElement('option');
var opt_txt = document.createTextNode('選擇車型');
model_opt.setAttribute('value', '');
model_opt.appendChild(opt_txt);
model.appendChild(model_opt); 
document.getElementById('button').setAttribute('onClick', 'this.form.submit()');
