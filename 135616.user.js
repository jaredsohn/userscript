// ==UserScript==
// @name         TereChan user script
// @version      0.2.0.1
// @namespace    http://www.trchan.org/g
// @description  Bu eklenti trchan.org için gönüllü olarak bir anon kardeşiniz tarafından yapılmıştır.
// @updateURL    http://userscripts.org/scripts/source/135616.meta.js
// @downloadURL  http://userscripts.org/scripts/source/135616.user.js
// @include      http://www.trchan.org/*
// @include      http://*.trchan.org/*
// @include      http://trchan.org/*
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @run-at	     document-end
// @icon         http://i.imgur.com/sKIfs.png

// @history 0.2.0.1 Düzeltme: Çalışmayan update, çalışır hale geldi. Yazım hatası yüzünden düzgün çalşımayan youtube embed düzledi.
// @history 0.2.0.0 Yeni: Yeni post sorgulama değiştirilip yeniden yazıldı.
// @history 0.1.9.8 Yeni: Sağ alttaki buton artık yenilendi, gerektiği zaman gözükecek, ve yeni bir buton eklendi(en yukarı git butonu)
// @history 0.1.9.4 Düzeltme: update linkinde basit bir hata yapmışım, o düzeltildi
// @history 0.1.9.3 Düzeltme: google chrome için css hatası düzeltildi
// @history 0.1.9.2 Yeni: Trchan 48x48pixel ikon eklendi
// @history 0.1.9.1 Yeni: Klavyesi bozuk olan bir anon kardeşimiz için kolaylık sağlayacak özellik eklendi
// ==/UserScript==
/*
	trhan.org/* için css
*/
var css='<style type="text/css" media="screen">';
css+='/* youtube embed */';
css+='.youtubeEmbed{display:block;}';
css+='.youtubeEmbedButon{';
css+='	text-decoration:none;';
css+='	color:red;';
css+='	font-weight:bold;';
css+='}';
css+='/* posta atilan cevaplar */';
css+='.opCevaplarDiv{';
css+='	padding: 5px;';
css+='	margin-top: 5px;';
css+='	display: inline-block;';
css+='	font-size:8pt;';
css+='}';
css+='.opCevaplarDiv a{';
css+='	display: inline-block;';
css+='	margin-left: 5px;';
css+='}';
css+='.cevaplarDiv{';
css+='	padding: 5px;';
css+='	margin-top: 15px;';
css+='	display: inline-block;';
css+='	float:right;';
css+='	font-size:8pt;';
css+='}';
css+='.cevaplarDiv a{';
css+='	display: inline-block;';
css+='	margin-left:5px;';
css+='	clear:both;';
css+='}';
css+='/* Canlı Thread */';
css+='#enSonCevaplar{display:none;}';
css+='.yeniPost{border:2px dashed red;}';
css+='/* Tool Bar */';
css+='.toolBar{font-size:13px; text-align:left;}';
css+='.toolBar a{';
css+='	background-color: #474747;';
css+='	border: 2px solid #858585;';
css+='	color: #FFFFFF;';
css+='	display: inline-block;';
css+='	font-weight: bold;';
css+='	opacity: 0.8;';
css+='	padding: 3px 8px;';
css+='	text-decoration: none;';
css+='	border-radius:5px;';
css+='	margin-right:15px;';
css+='	box-shadow:0px 0px 2px #333;';
css+='}';
css+='.toolBar a:hover {';
css+='	color: #333333;';
css+='	background-color:#ffd;';
css+='	box-shadow:0px 0px 10px #333;';
css+='	border:2px solid #474747;';
css+='}';
css+='/* top butonu */';
css+='.sagAltButon {';
css+='	-moz-transition: all 0.5s ease-in 0s;';
css+='	-webkit-transition: opacity 0.5s ease-in 0s;';
css+='	-o-transition: all 0.5s ease-in 0s;';
css+='	-ms-transition: all 0.5s ease-in 0s;';
css+='	transition: all 0.5s ease-in 0s;';
css+='	background-color: #333333;';
css+='	border-radius: 5px 5px 5px 5px;';
css+='	color: #DDDDDD;';
css+='	display: block;';
css+='	float: left;';
css+='	height: 14px;';
css+='	opacity: 0.4;';
css+='	overflow: hidden;';
css+='	padding: 4px 15px 8px;';
css+='	line-height:19px;';
css+='	margin-left: 5px;';
css+='	text-decoration: none;';
css+='	width: 25px;';
css+='}';
css+='.sagAltButon:hover {';
css+='	color: #FFFFFF;';
css+='	opacity: 1;';
css+='	text-decoration: none;';
css+='	width: auto;';
css+='}';
css+='</style>';
$('head').append(css);
/*
	trchan.org/* için js
*/
$(function(){
/*
	Genel Değişkenler
*/
// sayfa url
var url = document.URL;
url = url.split("/");
var threadId, $postlar, $opPost;
// sayfa yuksekligi
var sayfaYuksekligi = $(document).height();
// table elemanına post id'sini data olarak ata
function postlaraData(postlar){
	$(postlar).each(function(){
		$(this).attr('class','').attr('class',$(this).find('a').first().attr('name'));
	});
}
// youtube linkerini embedle
youtube();
// eğer thread cevap sayfasında isek
if(url[4]=="res"){
	// sayfa postlar
	threadId = $('input[name="replythread"]').attr('value');
	$postlar = $('#thread'+threadId+url[3]).find('table');
	postlaraData($postlar);
	$opPost = $('div#thread'+threadId+url[3]).find('blockquote').first(); // url[3] --> thread başlığı (b, a, mu, tv vs.)
	// cevaplari irdele
	$postlar.each(function(){
		cevapBelirle($(this));
	});
	// sağ alt butonlar
	$('<div class="sagAltButonlar" style="position:fixed;bottom:10px;right:20px;"></div>').appendTo('body');
	var $sagAltButonlar=$('.sagAltButonlar');
	// top butonunu ekle
	top();
	// pencere başlığı
	var pencereBasligi=$('title').text();
	// tool bar
	var toolBar='<div class="toolBar"></div>';
	$(toolBar).appendTo('.logo');
	var $toolBar = $('.toolBar');
	// div#enSonCevaplar elemanını yarat
	$('<div id="enSonCevaplar"></div>').appendTo('body');
	var $enSonCevaplar = $('#enSonCevaplar');
	// canli thread dongu tekrarlama süresi
	var sure=2000; // default
	// canli thread butonlar
	$('<a href="javascript:void(0)">yeni postlar sorgula</a>').on('click',function(){
		canliThread();
	}).appendTo($toolBar);
	$('<a href="javascript:void(0)">2snde bir sorgula</a>').on('click',function(){
		canliThreadBaslat();
	}).appendTo($toolBar);
	$('<a href="javascript:void(0)">sürekli sorgulamayı durdur</a>').on('click',function(){
		canliThreadDur();
	}).appendTo($toolBar);
	// kullanıcıya bilgi verme
	$('<strong></strong>').ajaxStart(function(){
		$(this).text('Yükleniyor...');
	}).ajaxSuccess(function(){
		$(this).text('Sorgulama tamamlandı');
	}).appendTo($toolBar);
}
/*
	Youtube Linklerini Sayfada Embedle
*/
function youtube(){
	var linkId, $youtubeLinki, $youtubeLinkiKisa, $iframe;	
	// sayfadaki youtube linklerini tespit et
	$youtubeLinki = $(
		'a[href^="http://www.youtube.com/watch?v="],'+
		'a[href^="https://www.youtube.com/watch?v="],'+
		'a[href^="http://youtube.com/watch?v="]'		
	);
	$youtubeLinkiKisa = $('a[href^="http://youtu.be/"]');
	$youtubeLinki.each(function(){
		// linki analiz et
		linkId=$(this).attr('href');
		linkId=linkId.split("?v=");
		linkId=linkId[1].split("&");
		linkId=linkId[0];
		// bulunan linkId'yi data olarak link elemanına ata
		$(this).removeData().data('linkId',linkId);
	});
	$youtubeLinkiKisa.each(function(){
		// linki analiz et
		linkId=$(this).attr('href');
		linkId=linkId.split(".be/");
		linkId=linkId[1];
		// bulunana linkId'yi data olarak link elemanına ata
		$(this).removeData().data('linkId',linkId);
	});
	// tüm youtube linklerini seç
	$($youtubeLinki).add($youtubeLinkiKisa).each(function(){
		// eğer buton yok ise
		if(!$(this).prev().hasClass('youtubeEmbedButon')){
			$('<a class="youtubeEmbedButon" href="javascript:void(0)"> Göster </a>').insertBefore(this);
		}
		// oluşturulan butona basıldığında
		$(this).prev().off().on('click',function(){
			linkId=$(this).next().data('linkId');
			$iframe=$(this).next().next();
			// eğer iframe bulunmuyor ise
			if(!$iframe.hasClass('youtubeEmbed')){
				$('<iframe class="youtubeEmbed" width="420" height="315" src="http://www.youtube.com/embed/'+
					linkId+'" frameborder="0" allowfullscreen></iframe>').insertAfter($(this).next());
				$(this).text(" Gizle ");
				$iframe=$(this).next().next();
			}
			// eğer iframe görünür konumda ise
			else if($iframe.css('display')=='block'){
				$iframe.css('display','none');
				$(this).text(" Göster ");
			}
			// eğer iframe gizli konumda ise
			else if($iframe.css('display')=='none'){
				$iframe.css('display','block');
				$(this).text(" Gizle ");
			}
			// rapor
			console.log(linkId+' youtube linkli tetiklendi');
		});
	});
	// rapor
	console.log($youtubeLinki.size()+$youtubeLinkiKisa.size()+' adet youtbe linki tespit edildi;');
	//console.log($youtubeLinki,$youtubeLinkiKisa);
}
/*
	Posta cevap verenler
*/
function cevapBelirle(post){
	var cevapVerilenPostId, cevapVerenPostId;
	function cevapVereninLinkiniOlustur(cevapVerenPostId){
		var link =  '<a '+
					'href="#'+cevapVerenPostId+'" '+
					'onClick="return highlight(\''+cevapVerenPostId+'\', true);">'+
					'>>'+cevapVerenPostId+
					'</a>';
		return link;
	}
	// post içindeki cevapları tespit et
	var $cevaplar = $('a[class^="ref"]');
	$(post).find($cevaplar).each(function(){
		// cevap verilen post idsinin belirlenmesi
		cevapVerilenPostId=$(this).attr('class');
		cevapVerilenPostId=cevapVerilenPostId.split("|");
		cevapVerilenPostId=cevapVerilenPostId[3];
		// cevap veren postu kısca vir değere ata
		cevapVerenPostId=$(this).parents('table').attr('class');
		// eğer cevap op'ye gelmiş ise
		if(threadId==cevapVerilenPostId){
			// eğer div.opCevaplarDiv elemanı yok ise yarat
			if(!$opPost.next().hasClass('opCevaplarDiv')){
				$('<div class="opCevaplarDiv">Cevaplar: </div>').insertAfter($opPost);
			}
			// cevap verenin post linkini oluştur ve div.opCevaplarDiv elemanına ekle
			$opPost.next().append(cevapVereninLinkiniOlustur(cevapVerenPostId));
		}
		// cevap op'ye değil ise
		else{
			// cevap verilen postu seç
			$('table.'+cevapVerilenPostId).each(function(){
				// eğer div.cevaplarDiv elemanı yok ise yarat
				if(!$(this).find('td').filter('.reply').children().last().hasClass('cevaplarDiv')){
					$('<div class="cevaplarDiv">Cevaplar: </div>').appendTo($(this).find('td').filter('.reply'));
				}
				// cevap verenin post linkini oluştur ve div.cevaplarDiv elemanına ekle
				$(this).find('div').filter('.cevaplarDiv').append(cevapVereninLinkiniOlustur(cevapVerenPostId));
			});
		}
		// rapor
		console.log(cevapVerenPostId+' postu '+cevapVerilenPostId+' postuna cevaptır');
	});
};
/*
	Canlı thread
*/
function canliThread(){
	$enSonCevaplar.empty().load(threadId+'.html #thread'+threadId+url[3],null,function(response, status, xhr){
		// eğer hata var ise
		if(status=="error"){
			alert(
				'Eyvah bir şey ters gitti!\n'
				+xhr.status
			);
		}
		// postlara class ata
		postlaraData($enSonCevaplar.find('table'));
		// rapor
		console.log('en son cevap ',$enSonCevaplar.find('table').last().attr('class'));
		console.log($postlar.size());
		console.log($enSonCevaplar.find('table').size());
		// eğer hiç cevap yokken cevap gelmiş ise
		if($postlar.size()<=0 && $enSonCevaplar.find('table').size()>0){
			// yeni postları op sonrasına ekle
			$enSonCevaplar.find('table').addClass('yeniPost').insertAfter($opPost.next());
			$('title').text("Yeni Cevaplar Var!");
		}
		// eğer en son atılan post id eski posttan büyük ise
		else if($postlar.last().attr('class')<$enSonCevaplar.find('table').last().attr('class')){
			$enSonCevaplar.find('table').each(function(){
				// $postlar elemanında $enSonCevaplardaki eleman var mı kontrol et
				if(!$postlar.is('.'+$(this).attr('class'))){
					// eğer yok ise ekle
					$(this).addClass('yeniPost').insertAfter($postlar);
				}
			});
			$('title').text("Yeni Cevaplar Var!");
		}
		$('.yeniPost').on('mausemove',function(){
			$(this).removeClass('yeniPost');
			$('title').text(pencereBasligi);	
		});
	});
	// rapor
	console.log($enSonCevaplar);
}
// belli süre aralığında tekar tekrar çalıştır
var dongu;
function canliThreadBaslat(){
	canliThread();
	dongu=setTimeout(canliThreadBaslat,sure);
}
function canliThreadDur(){
	clearTimeout(dongu);
}
/*
	Sayfayı en üstte götür butonu
*/
function top(){
	// sayfayı en üste kaydır
	$('<a class="sagAltButon" href="javascript:void(0)">Top :En yukarı git</a>').on('click',function(){
		$(window).scrollTop(0);
	}).hide().appendTo($sagAltButonlar);
	$(window).scroll(function(){
		// eğer sayfanın 10da 7si kaydırdık ise
		if(window.pageYOffset>(sayfaYuksekligi*(7/10))){
			if($('.sagAltButon:eq(0)').css('display')=='none') $('.sagAltButon:eq(0)').fadeIn('fast');
		}
		else{
			if($('.sagAltButon:eq(0)').css('display')!='none') $('.sagAltButon:eq(0)').fadeOut('fast');
		}
	});
}
/*
	klavyesi bozuk anon kardeşimiz için tamir "9s"-->"s"
*/
var cevap,cevapTamir;
$('<li><a href="javascript:void(0)">"9s" klavye hatısını düzelt</a></li>').appendTo('.rules ul')
.on('click',function(){
	cevap = $('textarea[name="message"]').eq(0);
	console.log('onceki',cevap[0].value);
	cevap = cevap[0].value;
	cevapTamir = cevap.replace(/9s/gi,"s");
	console.log('sonraki',cevapTamir);
	$('textarea[name="message"]').eq(0).attr('value',cevapTamir);	
});
/*
	Editlerim	

// ayarlar
$('<a class="ayarlar" href="javascript:void(0)">TereChan Ayarlar</a>').on('click',function(e){
	console.log(e);
}).prependTo('.adminbar');
// gönderme olayını pasifize et
$('#postform').bind('submit',function(e){
	console.log(e);
	return false;
});
*/
});// jQuery son