// ==UserScript==
// @name        去除神来一句
// @namespace   test
// @include     http://tieba.baidu.com/*
// @version     1
// ==/UserScript==
var $=unsafeWindow.$;
$('.BDE_Smiley2').each(function() {
$(this).replaceWith('<p>' + $(this).attr('text') + '</p>');
});
$('.BDE_Smiley').each(function() {
var pic = $(this).attr('src').match(/.*(qw_cat_\d*)\.gif.*/);
if (pic) {
$(this).replaceWith('<p>' + toString(pic[1]) + '</p>');
}
});
function toString(pic){
var s = null;
switch(pic){
case 'qw_cat_0001':
s = '直到我膝盖中了一箭';break;
case 'qw_cat_0002':
s = '我擦';break;
case 'qw_cat_0003':
s = '你懂的';break;
case 'qw_cat_0004':
s = '这真是极好的';break;
case 'qw_cat_0005':
s = '给力！';break;
case 'qw_cat_0006':
s = '你妹';break;
case 'qw_cat_0007':
s = '感觉不会再爱了';break;
case 'qw_cat_0008':
s = '楼下怎么看？';break;
case 'qw_cat_0009':
s = '呵呵';break;
}
return s;
}