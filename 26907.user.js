// ==UserScript==
// @name           WildgunsOtomatikGiris
// @namespace      Wildguns
// @include        *wildguns.org/
// ==/UserScript==

var DUNYA = "xx.wildguns.org"; //xx yazan yere oynadığınız dunyayi belirtin s1= server 1 , s2= server 2 , diye gidiyor.. 
var KULLANICIADI = "kullanici adınızı yazın";        //Kullanıcı adınızı buraya yazın
var SIFRE = "şifrenizi yazın";    //Buraya da şifrenizi yazıyorsunuz


document.getElementById("universe").value = xx.wildguns.org;

document.getElementById("login").value = Kullanici adi;

document.getElementById("pwd").value = Sifre;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;

document.getElementById("loginForm").submit();	
