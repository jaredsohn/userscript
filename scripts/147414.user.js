// ==UserScript==
// @name Xunlei.Any.Player
// @namespace Xunlei.Any.Player
// @description Xunlei.Any.Player, should be working on xlpan.com and can play any url as you wish.
// @match http://vod.xunlei.com/list.html*
// @match http://vod.lixian.xunlei.com/list.html*
// @match http://61.147.76.6/iplay.html?*
// @match http://222.141.53.5/iplay.html?*

// @version 0.37
// ==/UserScript==

(function(){
'use strict';
var CONSTANTS = {
tips: '<div class="tips_container"><div class="tips_close">X</div>Xunlei.Any.Player \u5DF2\u542F\u7528 <a href="http://opengg.me/821/xunlei-any-player/" style="color:blue" target="_blank">\u53CD\u9988</a></div>',
css: '.tips_container{padding:10px 15px;color:green;opacity:0.4;background:#ccc;z-index:99999}.tips_container .tips_close{position:absolute;right:5px;top:0;color:red;cursor:pointer}.tips_index{height:100%;position:absolute;left:20em;}.tips_inner{position:fixed;right:0;bottom:0}.tips_container:hover{opacity:0.9}'
};
var UTILS = {
addCss: function(str){
var style = document.createElement('style');
style.textContent = str;
document.head.appendChild(style);
},
addDom: function(html, parentSelector, callback){
var div = document.createElement('div');
div.innerHTML = html;
var childNodes = div.childNodes;
var parent = (parentSelector&&document.querySelector(parentSelector))||document.body;
for(var i = 0; i<childNodes.length;++i){
if((typeof callback === 'function')&&(childNodes[i].nodeType === 1)){
callback.call(childNodes[i],childNodes[i]); 
}
parent.appendChild(childNodes[i]);
}
},
proxy: function(fn){
var script = document.createElement('script');
script.textContent = '(' + fn.toString() + ')();';
document.body.appendChild(script);
}
};
function tips(fn){
UTILS.addCss(CONSTANTS.css);
UTILS.addDom(CONSTANTS.tips, '.top_bar,.pla_bg', function(parent){
var close = parent.querySelector('.tips_close');
if(close){
close.addEventListener('click', function(){
parent.parentNode.removeChild(parent);
});
}
fn(parent);
});
}
var ROUTER = [{
hostnames: ['61.147.76.6', '222.141.53.5'],
pathnames: ['/iplay.html'],
fn: function(){
tips(function(node){
node.className += ' tips_inner';
});
UTILS.proxy(function(){
function hack(){
var XL_CLOUD_FX_INSTANCE = window.XL_CLOUD_FX_INSTANCE;
if(XL_CLOUD_FX_INSTANCE){
var setFeeParam = XL_CLOUD_FX_INSTANCE.setFeeParam;
if(setFeeParam&&(setFeeParam.toString().indexOf('arguments')===-1)){
XL_CLOUD_FX_INSTANCE.setFeeParam=function(){
//console.log(arguments);
XL_CLOUD_FX_INSTANCE.userType=1;
setFeeParam.apply(XL_CLOUD_FX_INSTANCE,arguments);
};
clearInterval(inter);
}
}
}
var inter = setInterval(hack,100);
});
}
},{
hostnames: ['vod.xunlei.com', 'vod.lixian.xunlei.com'],
pathnames: ['/list.html'],
fn: function(){
tips(function(node){
node.className += ' tips_index';
});
UTILS.proxy(function(){
function hack(){
var Login = window.Login;
if(Login){
var getuserinfo = Login.getuserinfo;
if(getuserinfo&&(getuserinfo.toString().indexOf('arguments')===-1)){
Login.getuserinfo=function(){
var opts = getuserinfo.apply(Login,arguments);
opts.type = 'vodVipUser';
return opts;
};
clearInterval(inter);
}
}
}
var inter = setInterval(hack,100);
});
}
}
];
var hostname = location.hostname;
var pathname = location.pathname;
for(var i=0;i<ROUTER.length;++i){
var item=ROUTER[i];
if(item.hostnames.indexOf(hostname)!==-1 && item.pathnames.indexOf(pathname)!==-1){
item.fn();
}
}
})();