// ==UserScript==
// @name       CI book Index
// @namespace  cibook
// @version    0.1
// @description  get Index of ci book h2 header
// @match      http://codeigniter.org.cn/user_guide/*
// @copyright  2012+, You
// @updateURL https://userscripts.org/scripts/source/165696.meta.js
// @downloadURL https://userscripts.org/scripts/source/165696.user.js
// ==/UserScript==

var u = document.createElement('ul');
u.id='nav-list';
document.body.appendChild(u);

var nav_c='';
h2 = document.getElementsByTagName('h2');
for(i in h2){
	txt = h2[i].innerHTML;
    h2[i].id=i;
    if(i>0||i==0) nav_c += "<li><a href='#"+i+"'>"+txt+"</a></li>"; 
}
u.innerHTML = nav_c;

with(u){ 
    style['position']='fixed';
    style['top']='12%';
    style['right']='1%';
    style['width']='220px';
    style['border']='solid 1px #333';
    style['border-radius']='5px';
    style['box-shadow']='0px 0px 5px #ccc';
    style['padding']='5px 9px';
    style['list-style-position']='inside';
    style['background-color']='#fafafa';
    style['opacity']='0.8';
    style['-moz-opacity']='0.8';
}
document.getElementById('content').style['width']='75%';