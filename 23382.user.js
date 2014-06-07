// ==UserScript==
// @name           IkariamOtomatikGiris
// @namespace      Ikariam
// @include        *ikariam.net/
// ==/UserScript==

var DUNYA = "xx.ikariam.net"; //xx yazan yere oynadığınız dunyayi belirtin s1= alpha, s2= betha, diye gidiyor.. 
var KULLANICIADI = "kullanici adınızı yazın";        //Kullanıcı adınızı buraya yazın
var SIFRE = "şifrenizi yazın";    //Buraya da şifrenizi yazıyorsunuz


document.getElementById("universe").value = DUNYA;

document.getElementById("login").value = KULLANICIADI;

document.getElementById("pwd").value = SIFRE;

var url = "http://" + document.getElementById("universe").value + "/index.php?action=loginAvatar&function=login";
			
document.getElementById('loginForm').action = url;

document.getElementById("loginForm").submit();	
