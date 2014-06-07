// ==UserScript==
// @name        Google Black Bar Returns
// @description Naredite Google crno navigacijsko vrstico nazaj. Vse kar je bilo v opciji "Vec" je sedaj na vidnem mestu. Prevedel Bostyan87
// @include     https://www.google.*/
// @include     *plus.google.*
// @include     https://www.google.*/search*
// @include     https://www.google.*/web*
// @include     http://www.google.*/img*
// @include     https://play.google.*
// @include     https://news.google.*
// @include     https://mail.google.*
// @include     https://drive.google.*
// @include     https://www.google.*/calendar*
// @include     https://groups.google.*
// @include     https://productforums.google.*
// @version     1.05 Slovenski
// @grant       none
// ==/UserScript==


var newStyle = document.createElement('style');
newStyle.type = 'text/css';
newStyle.innerHTML = '\
.gb_e.gb_f {left:-1000px!important;position:fixed!important;}\
.gb_o.gb_p,.gb_q.gb_eb,.gb_o.gb_v[aria-hidden=true]{display:inline!important;visibility:visible!important;top:-1000px!important;}\
#mngb,#gb{padding-top:22px!important;}\
#gb{height:0px!important;}\
#gb119.gb_a{position:fixed!important;left:10px!important;display:inline!important;visibility:visible!important;position:fixed!important;top:-8px!important;color:rgb(187,187,187)!important;font-weight:bold!important;z-index:99999999!important;border-top:2px solid transparent;padding:2px 6px 4px 6px!important;}\
.gb_a .gb_c,.gb_g .gb_b{display:none!important;}\
.gb_m .gb_n{width:100%!important;background-color:rgb(45,45,45)!important;height:29px!important;width:2800px!important;background-image:none!important;position:fixed!important;top:0px!important;left:0px!important;opacity:1!important;float:left!important;}\
.gb_d{width:auto!important;}\
.gb_c,#gbq1{z-index:100!important;}\
a.gb_b[data-pid="2"]{left:949px!important;top:-2px!important;height:22px!important;border-top:4px solid transparent;padding:0px 6px 4px 6px!important;}\
#gb119:hover{color:white!important;background-color:rgb(76,76,76)!important;border-top-color:rgb(221, 75, 57) !important;color:#fff!important;text-decoration:none!important;}\
.action-bar,.nav-container{top:21px!important;}\
.kd-appbar{margin-top:21px!important;}\
.no{margin-top:10px!important;}\
.fixed-margin div.viewpane-toolbar,.fixed-margin div.product-logo{margin-top:25px!important;}\
#viewpane{background-color:transparent!important;}\
#mainnav{margin-top:72px!important;}\
.VPc,.Ev,.VJc,.OLa.OTa .PTa{margin-top:29px!important;}\
div.Dea:nth-child(1) > a:nth-child(1){margin-top:29px!important;}\
.gb_gbsh .gb_qa{top:60px!important;}\
.GJHYW0UCK0B{margin-top:22px!important;}\
.be{margin-top:22px!important;}\
.g-section{margin-top:22px!important;}\
a[href="http://www.google.com/intl/en/about/products/"]:hover,a[href="https://www.google.com/search"]:hover,a[href="http://www.google.com/imghp"]:hover,a[href="https://www.google.com/maps"]:hover,a[href="https://play.google.com/"]:hover,a[href="http://www.youtube.com/"]:hover,a[href="https://news.google.com/"]:hover,a[href="https://mail.google.com/"]:hover,a[href="http://www.google.com/drive/"]:hover,a[href="https://www.google.com/calendar"]:hover,a[href="https://translate.google.com/"]:hover,a[href="http://www.google.com/mobile/"]:hover,a[href="http://books.google.com/"]:hover,a[href="https://www.google.com/offers"]:hover,a[href="https://wallet.google.com/"]:hover,a[href="http://www.google.com/shopping"]:hover,a[href="https://www.blogger.com/"]:hover,a[href="https://www.google.com/finance"]:hover,a[href="https://plus.google.com/u/0/photos"]:hover,a[href="http://video.google.com/"]:hover{background-color:rgb(76,76,76)!important;border-top-color:rgb(221, 75, 57) !important;color:#fff!important;}\
a[href="http://www.google.com/intl/en/about/products/"],a[href="https://www.google.com/search"],a[href="http://www.google.com/imghp"],a[href="https://www.google.com/maps"],a[href="https://play.google.com/"],a[href="http://www.youtube.com/"],a[href="https://news.google.com/"],a[href="https://mail.google.com/"],a[href="http://www.google.com/drive/"],a[href="https://www.google.com/calendar"],a[href="https://translate.google.com/"],a[href="http://www.google.com/mobile/"],a[href="http://books.google.com/"],a[href="https://www.google.com/offers"],a[href="https://wallet.google.com/"],a[href="http://www.google.com/shopping"],a[href="https://www.blogger.com/"],a[href="https://www.google.com/finance"],a[href="https://plus.google.com/u/0/photos"],a[href="http://video.google.com/"]{position:fixed!important;z-index:99999999!important;top:0px!important;color:rgb(187,187,187)!important;border-top:2px solid transparent;padding:4px 6px 6px 6px!important;text-decoration:none!important;font: bold 13px Arial,sans-serif!important;}\
a[href="https://www.google.com/search"]{left:80px!important;}\
a[href="http://www.google.com/imghp"]{left:131px!important;}\
a[href="https://www.google.com/maps"]{left:169px!important;}\
a[href="https://play.google.com/"]{left:240px!important;}\
a[href="http://www.youtube.com/"]{left:324px!important;}\
a[href="https://news.google.com/"]{left:383px!important;}\
a[href="https://mail.google.com/"]{left:431px!important;}\
a[href="http://www.google.com/drive/"]{left:473px!important;}\
a[href="https://www.google.com/calendar"]{left:511px!important;}\
a[href="https://translate.google.com/"]{left:565px!important}\
a[href="http://www.google.com/mobile/"]{left:642px!important}\
a[href="http://books.google.com/"]{left:694px!important}\
a[href="https://www.google.com/offers"]{left:740px!important}\
a[href="https://wallet.google.com/"]{left:802px!important}\
a[href="http://www.google.com/shopping"]{left:872px!important}\
a[href="https://www.blogger.com/"]{left:960px!important}\
a[href="https://www.google.com/finance"]{left:1015px!important}\
a[href="https://plus.google.com/u/0/photos"]{left:1071px!important}\
a[href="http://video.google.com/"]{left:1145px!important}\
a[href="http://www.google.com/intl/en/about/products/"]{left:1547px!important}\
';
	document.getElementsByTagName('head')[0].appendChild(newStyle)

	var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.google.com/search';
	elmFacebook.appendChild(document.createTextNode('Iskanje'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.google.com/imghp';
	elmFacebook.appendChild(document.createTextNode('Slike'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.google.com/maps';
	elmFacebook.appendChild(document.createTextNode('Zemljevidi'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://play.google.com/';
	elmFacebook.appendChild(document.createTextNode('Googla Play'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.youtube.com/';
	elmFacebook.appendChild(document.createTextNode('YouTube'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://news.google.com/';
	elmFacebook.appendChild(document.createTextNode('Novice'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://mail.google.com/';
	elmFacebook.appendChild(document.createTextNode('Gmail'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.google.com/drive/';
	elmFacebook.appendChild(document.createTextNode('Drive'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
			var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.google.com/calendar';
	elmFacebook.appendChild(document.createTextNode('Koledar'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);


	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://translate.google.com/';
	elmFacebook.appendChild(document.createTextNode('Prevajalnik'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.google.com/mobile/';
	elmFacebook.appendChild(document.createTextNode('Mobilni'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://books.google.com/';
	elmFacebook.appendChild(document.createTextNode('Knjige'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.google.com/offers';
	elmFacebook.appendChild(document.createTextNode('Ponudbe'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://wallet.google.com/';
	elmFacebook.appendChild(document.createTextNode('Denarnica'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.google.com/shopping';
	elmFacebook.appendChild(document.createTextNode('Nakupovanje'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.blogger.com/';
	elmFacebook.appendChild(document.createTextNode('Blogger'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
		var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://www.google.com/finance';
	elmFacebook.appendChild(document.createTextNode('Finance'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
			var elmFacebook = document.createElement('a');
	elmFacebook.href = 'https://plus.google.com/u/0/photos';
	elmFacebook.appendChild(document.createTextNode('Fotografije'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
				var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://video.google.com/';
	elmFacebook.appendChild(document.createTextNode('Video Posnetki'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
					var elmFacebook = document.createElement('a');
	elmFacebook.href = 'http://www.google.com/intl/en/about/products/';
	elmFacebook.appendChild(document.createTextNode('Vec'));
	var elmFoo = document.getElementById('gb');
	elmFoo.parentNode.insertBefore(elmFacebook, elmFoo);
	
	
	
	