// ==UserScript==
// @name           FB add GG
// @namespace      Pikullove
// @description    FB add GG
// @include        http://www.google.com.vn/
// @include        https://www.google.com.vn/
// ==/UserScript==

// ==Tegar Dika==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like5');
	div.style.position = "fixed";
	div.style.display = "block";
	div.style.width = "1024px"; 
	div.style.height = "23px";
	div.style.opacity= 0.90;
	div.style.bottom = "+627px";	
	div.style.backgroundColor = "#212121";
	div.style.border = "1px dashed #212121";
	div.style.padding = "2px";
	div.innerHTML = "<center><a href='http://www.facebook.com/' style='color: #2d56b8;' onclick='alert(\'Thanks for instal this script\');'><big><b>Facebook</b></big></a></center>"
	body.appendChild(div);
	body.appendChild(div2);
	
	unsafeWindow.spoiler = function() {
		var i;
	for(i=1;i<=20;i++) {
		var x=document.getElementById('like'+i);
		if (x.style.display=="none") {
		x.style.display="block";
		div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menyembunyikan Widget'>&laquo;</a> &#8226; <a href='http://www.facebook.com' title='Thanks for instal this script'><b>Facebook</b></a></center> "
		}
		else {
			x.style.display="none";
			div2.innerHTML = "<center><a onclick='spoiler()' title='Klik Untuk Menampilkan Widget'>&raquo;</a></center>"
		}
	}
	};
}