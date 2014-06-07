// ==UserScript==
// @name           RC4
// @namespace      rc4 cryp
// @include        http://mobilindo.heliohost.org/*
// ==/UserScript==
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function checkCookie()
{
var username=getCookie("username");
  if (username!=null && username!="")
  {
  alert("Welcome again " + username);
  }
else
  {
  username=prompt("Please enter your name:","");
  if (username!=null && username!="")
    {
    setCookie("username",username,365);
    }
  }
}

function rc4Encrypt(key, pt) {
	s = new Array();
	for (var i=0; i<256; i++) {
		s[i] = i;
	}
	var j = 0;
	var x;
	for (i=0; i<256; i++) {
		j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
	}
	i = 0;
	j = 0;
	var ct = '';
	for (var y=0; y<pt.length; y++) {
		i = (i + 1) % 256;
		j = (j + s[i]) % 256;
		x = s[i];
		s[i] = s[j];
		s[j] = x;
		ct += String.fromCharCode(pt.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
	}
	return ct;
}
function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function hexEncode(data){
	var b16_digits='0123456789abcdef';
	var b16_map=new Array();
	for(var i=0;i<256;i++){
		b16_map[i]=b16_digits.charAt(i>>4)+b16_digits.charAt(i&15);
	}
	
var result=new Array();
for(var i=0;i<data.length;i++){
	result[i]=b16_map[data.charCodeAt(i)];
	}
	
return result.join('');
}

function hexDecode(data){
	var b16_digits='0123456789abcdef';
	var b16_map=new Array();
	for(var i=0;i<256;i++){
		b16_map[b16_digits.charAt(i>>4)+b16_digits.charAt(i&15)]=String.fromCharCode(i);
	}
	
if(!data.match(/^[a-f0-9]*$/i))return false;
if(data.length%2)data='0'+data;
var result=new Array();
var j=0;
for(var i=0;i<data.length;i+=2){
	result[j++]=b16_map[data.substr(i,2)];
	}
return result.join('');}
/**
 * Decrypt given cipher text using the key with RC4 algorithm.
 * All parameters and return value are in binary format.
 *
 * @param string key - secret key for decryption
 * @param string ct - cipher text to be decrypted
 * @return string
*/
function rc4Decrypt(key, ct) {
	return rc4Encrypt(key, ct);
}
//var txt = document.documentElement.innerHTML;
//alert("wooi");
//var txt = document.getElementsByTagName("body")[0].innerHTML;

var txt = document.documentElement.innerHTML;
txt = document.getElementsByTagName("body")[0].innerHTML;
try{
var tanda = document.getElementsByTagName("p")[0].innerHTML;
}finally{

if (tanda=="T") {
        alert("Belum DiEnkrip");
		setCookie("kkey","",1);
}else {

//alert(txt.length);
//var txt = document.documentElement.innerHTML;
//txt =txt.substring(19);
//txt = txt.substring(0,txt.length-7);
//document.write("wworks");
var key;
txt = trim(txt);
key=getCookie("kkey");

if (key==null || key==""){
    alert('wooi');
    key = txt.substr(txt.length-32,32);
	txt = txt.substr(0,txt.length-32);
	setCookie("kkey",key,1);
} 

alert(key);
alert(txt);
var s = hexDecode(txt);
//alert(s);
s = rc4Decrypt(key,s);

//var myDiv = document.createElement('script');
//myDiv.innerHTML = "";
//document.body.appendChild(myDiv);
//document.write(s);
//document.write("www");
document.getElementsByTagName("body")[0].innerHTML=s;


}
//var s = rc4Decrypt("123",txt);
//alert(s);

}