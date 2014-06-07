// ==UserScript==
// @name           Facebook Kita Like Semua
// @namespace      OtomatisLikeCuy Ver 2.0
// @description    Kita Like Semua OK, special dedicated for jempolers
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==For My Lovely==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+123px";
	div.style.left = "+6px";
	div.style.width = "125px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px dashed #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.facebook.com/Warnet.boss.net'><img src='http://img819.imageshack.us/img819/7640/1111ty.jpg' alt='Loading...' width=100 hight=75></a></center>"
	
	div2 = document.createElement("div");
	div2.setAttribute('id','spoiler');
	div2.style.position = "fixed";
	div2.style.opacity= 0.90;
	div2.style.bottom = "+204px";
	div2.style.left = "+6px";
	div2.style.backgroundColor = "#CCD3E3";
	div2.style.border = "1px dashed #555";
	div2.style.padding = "2px";
	div.style.width = "125px";
	div2.innerHTML = "<div style='background-color: #2E5392; color: #FFFFFF; 	border: 1px dashed #333333;'><center><a style='color: #FFFFFF;' onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a style='color: #FFFFFF;' onclick='alert(\'Anggun, kamu adalah wanita terindah yang pernah menemani hidupu, Kulakukan semuanya untuk melindungi dan menyayangimu, trimakasih tlah singgah dihidupku ini\');'>Boss.Net Fan Page</a></center></div> "
	
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a title='Anggun, kamu adalah wanita terindah yang pernah menemani hidupu, Kulakukan semuanya untuk melindungi dan menyayangimu, trimakasih tlah singgah dihidupku ini'>TAI LEDIK         </a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&raquo;</a></center>"
		}
	}
	};
}







