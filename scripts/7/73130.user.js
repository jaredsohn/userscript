// ==UserScript==
// @name           Teste Script
// @description    Dorgas rairiari
// @include        http://*
// @version        2.0
// ==/UserScript==

s1=document.getElementById('playerbg').innerHTML.toString();
s2=s1.substr(s1.indexOf('flashvars.un'),127);
un = s2.split('un = "');
un = un[1].split('"');
un = un[0];

k1 = s2.split('k1 = "');
k1 = k1[1].split('"');
k1 = k1[0];

k2 = s2.split('k2 = "');
k2 = k2[1].split('"');
k2 = k2[0];

s = s2.split('s = "');
s = s[1].split('"');
s = s[0];

function decrypt(str, key1, key2){
var _loc1 = [];
for (var _loc3 = 0; _loc3 < str.length; ++_loc3)
{
switch (str.charAt(_loc3))
{
case "0":
{
_loc1.push("0000");
break;
}
case "1":
{
_loc1.push("0001");
break;
}
case "2":
{
_loc1.push("0010");
break;
}
case "3":
{
_loc1.push("0011");
break;
}
case "4":
{
_loc1.push("0100");
break;
}
case "5":
{
_loc1.push("0101");
break;
}
case "6":
{
_loc1.push("0110");
break;
}
case "7":
{
_loc1.push("0111");
break;
}
case "8":
{
_loc1.push("1000");
break;
}
case "9":
{
_loc1.push("1001");
break;
}
case "a":
{
_loc1.push("1010");
break;
}
case "b":
{
_loc1.push("1011");
break;
}
case "c":
{
_loc1.push("1100");
break;
}
case "d":
{
_loc1.push("1101");
break;
}
case "e":
{
_loc1.push("1110");
break;
}
case "f":
{
_loc1.push("1111");
break;
}
} // End of switch
} // end of for
_loc1 = _loc1.join("").split("");
var _loc6 = [];
for (var _loc3 = 0; _loc3 < 384; ++_loc3)
{
key1 = (key1 * 11 + 77213) % 81371;
key2 = (key2 * 17 + 92717) % 192811;
_loc6[_loc3] = (key1 + key2) % 128;
} // end of for
for (var _loc3 = 256; _loc3 >= 0; --_loc3)
{
var _loc5 = _loc6[_loc3];
var _loc4 = _loc3 % 128;
var _loc8 = _loc1[_loc5];
_loc1[_loc5] = _loc1[_loc4];
_loc1[_loc4] = _loc8;
} // end of for
for (var _loc3 = 0; _loc3 < 128; ++_loc3)
{
_loc1[_loc3] = _loc1[_loc3] ^ _loc6[_loc3 + 256] & 1;
} // end of for
var _loc12 = _loc1.join("");
var _loc7 = [];
for (var _loc3 = 0; _loc3 < _loc12.length; _loc3 = _loc3 + 4)
{
var _loc9 = _loc12.substr(_loc3, 4);
_loc7.push(_loc9);
} // end of for
var _loc2 = [];
for (var _loc3 = 0; _loc3 < _loc7.length; ++_loc3)
{
switch (_loc7[_loc3])
{
case "0000":
{
_loc2.push("0");
break;
}
case "0001":
{
_loc2.push("1");
break;
}
case "0010":
{
_loc2.push("2");
break;
}
case "0011":
{
_loc2.push("3");
break;
}
case "0100":
{
_loc2.push("4");
break;
}
case "0101":
{
_loc2.push("5");
break;
}
case "0110":
{
_loc2.push("6");
break;
}
case "0111":
{
_loc2.push("7");
break;
}
case "1000":
{
_loc2.push("8");
break;
}
case "1001":
{
_loc2.push("9");
break;
}
case "1010":
{
_loc2.push("a");
break;
}
case "1011":
{
_loc2.push("b");
break;
}
case "1100":
{
_loc2.push("c");
break;
}
case "1101":
{
_loc2.push("d");
break;
}
case "1110":
{
_loc2.push("e");
break;
}
case "1111":
{
_loc2.push("f");
break;
}
} // End of switch
} // end of for
return (_loc2.join(""));
} // End of the function

link = "http://www"+s+".megavideo.com/files/"+decrypt(un,k1,k2)+"/.flv"

a = document.getElementsByTagName("a");
for(i=0;i<=a.length;i++){

if (a[i].href == "javascript:adjustplayer();"){
break;
}
}
a[i].href=link;




dlBox = document.createElement("div");
	b = document.getElementsByTagName("body")[0];
	dlBox.id = 'tube_dlBox';
	dlBox.setAttribute("style", "position: fixed; right: 5px; bottom: 10px; z-index: 100000;");
	
	dlI = document.createElement("img");
	dlI.setAttribute("src", "http://i36.tinypic.com/308uq2s.gif");
	dlI.setAttribute("style", "position: relative; vertical-align:middle; margin-top: -2px; margin-right: 2px;");
	
	dlA = document.createElement("a");
	dlA.setAttribute("href", link);
	dlA.setAttribute("style", "font-family:Arial;font-size:12px;font-weight:bold;color:#333 !important;text-align:center;background-color: #999;border:1px solid #666;padding:5px;");
	
	text = document.createTextNode("Download");
	dlA.appendChild(dlI);
	dlA.appendChild(text);
	dlBox.appendChild(dlA);
	b.appendChild(dlBox);