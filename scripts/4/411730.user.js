// ==UserScript==
// @name       Fuck400gb
// @version    1.2
// @description  解决城通网盘检查广告屏蔽插件的问题 群44697406
// @match      http://www.400gb.com/file/*
// @match      http://www.bego.cc/file/*
// @match      http://www.pipipan.com/file/*
// @copyright  不能说の秘密7Pro 2014+
// ==/UserScript==

var hash_info = document.getElementById("hash_info").value;

var text = hash_info;
var Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
var result = [];
var bin = 0x00;
var last = 0x00;
 
var IdxArray = {};
for (var i = 0; i < Chars.length; i++) IdxArray[Chars[i]] = i;

for (var i = 0, l = text.length; i < l; i++)
{
    bin = IdxArray[text.charAt(i)];
    var f = i % 4;
    var m = (f + 1) * 2;
    var x = 8 - m;
    if (f == 0)
    {
        last = bin;
        continue;
    }
    if (bin == null) continue;
    var chr = ((last & (0x3f >> (m - 4))) << (m - 2)) | ((bin & (0x3f >> x << x)) >> x);
    result.push(String.fromCharCode(chr));
    last = bin;
}

var hash_key = result.join("-");;
document.getElementById("hash_key").value = hash_key.replace(/-/g,"");
document.getElementsByName("user_form")[0].setAttribute("onsubmit","");
document.getElementsByTagName("button")[0].innerHTML = "<i class=\"icon-cloud-download\"></i>已开启反-反屏蔽广告插件 点我下载";











