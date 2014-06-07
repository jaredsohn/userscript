// ==UserScript==
// @name        zdtb_fqjyy_tb
// @namespace   zdtb
// @include     www.fqjyy.com/ons/----------------
// @version     1
// @grant       none
// ==/UserScript==
function wb()
{
  inputs = document.getElementsByTagName('textarea');
  for(var i=0;i<inputs.length;i++)
  {
    inputs[i].value+= "tb";
  }
}

function randomTest(sl)
{
//document.getElementById('username').value='test';
if (sl<=6)  sl=8;
/*
var a = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c",
"d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
*/
var a = new Array("d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
"A", "B", "C", "D", "E", "F", "G", "H", "I", "Z", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
var b = "", c;
for(i = 1; i <= sl; i ++ )
{
//alert(i);
c = Math.floor(Math.random() * a.length);
//alert(c);
b = b + a[c];
//alert(b);
//a = a.del(c);
}
//alert(b);
//document.getElementById('username').value=b;
return b;
} 


function randomTest_qq(sl)
{
//document.getElementById('username').value='test';
//if (sl<=4)  sl=6;
sl=10;
var b = "1", c;
var sza = new Array(  "2", "3", "4", "5", "6", "7", "8", "9");
//var b = "", c;
for(i = 1; i <= sl; i ++ )
{
//alert(i);
c = Math.floor(Math.random() * sza.length);
//alert(c);
b = b + sza[c];
//alert(b);
//a = a.del(c);
}
//alert(b);
//document.getElementById('username').value=b;

return b;
} 

function randomTest_cs()
{
//document.getElementById('username').value='test';
//if (sl<=4)  sl=6;

var b = "", c;
var sza = new Array("北京", "上海", "天津", "厦门", "重庆", "南京", "武汉", "杭州", "福州", "昆明","成都","山东","浙江","江苏","黑龙江","大连");
//var b = "", c;
c = Math.floor(Math.random() * sza.length);
b = sza[c];
return b;
} 



function tb()
{
yx = ['sohu.com', '163.com', 'yahoo.com', 'yahoo.com.cn','gamil.com', 'hotmail.com', '126.com', 'yahoo.com.cn', 'sina.com','sohu.com', '163.com'];
zm = ['a', 'b', 'c', 'd','e','f','g','h','j'];
sl=Math.round(Math.random()*10);
yh=randomTest(sl);
mm=randomTest(sl);
//alert(Math.round(Math.random()*10));

yxm=yx[Math.round(Math.random()*10)];

document.getElementsByName('regusername')[0].value=yh;
document.getElementsByName('regpassword')[0].value="p123456";
document.getElementsByName('regpassword2')[0].value="p123456";
//document.getElementById('email').value=yh+'@'+yxm;
//document.getElementById('agreebbrule').checked=true; 
//document.getElementById('secanswer').focus();
//document.getElementById('secanswer').value='www.leqi.ca';
//document.getElementsByName('field_5new')[0].value=randomTest_qq(12);
//document.getElementsByName('field_6new')[0].value=randomTest_cs();
//document.getElementById('agreebbrule').checked="checked";
//document.getElementById('agreebbrule').setAttribute("checked", true);
document.getElementsByName('submit1')[0].click();

//document.forms[0].submit();

}
 window.setTimeout(function(){tb()}, 2 * 1000);
//tb();
//window.addEventListener('load', function(){tb()}, true);



