// ==UserScript==
// @name           NAS UB ByuAutologin
// @namespace      http://ba.yuah.web.id/
// @copyright      Copyright 2013 Bayu Aditya H (htp://ba.yuah.web.id/)
// @license        Creative Commons - Attribution-ShareAlike 3.0 Unported or later; http://creativecommons.org/licenses/by-sa/3.0/
// @description    IND: Otomatis masuk-log di Network Authentication System, Universitas Brawijaya, Malang, Indonesia. Melakukan pemeriksaan status NAS UB berkala dan otomatis masuk-log bila telah keluar-log.
// @description    Automatic login on the Network Authentication System, University of Brawijaya, Malang, Indonesia. UB NAS status checks periodically and automatically login when you have been logout.
// @version        1.1.1
// @grant          none
// @UpdateURL      http://userscripts.org/scripts/source/155737.meta.js
// @downloadURL    http://userscripts.org/scripts/source/155737.user.js
// @include        http://nas.ub.ac.id/*
// @include        https://nas.ub.ac.id/*
// @include        http://175.45.189.132/*
// @include        https://175.45.189.132/*
// @include        http://127.0.0.1:30080/*
// @icon data:image/png;base64,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
// ==/UserScript==
/*Pengaturan*/
var aturan_durasi_periksa=15;//dalam detik

/*Gambar*/
var gambar_ajaxload='data:image/png;base64,R0lGODlhEAALAPQAAP///wAAANra2tDQ0Orq6gYGBgAAAC4uLoKCgmBgYLq6uiIiIkpKSoqKimRkZL6+viYmJgQEBE5OTubm5tjY2PT09Dg4ONzc3PLy8ra2tqCgoMrKyu7u7gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCwAAACwAAAAAEAALAAAFLSAgjmRpnqSgCuLKAq5AEIM4zDVw03ve27ifDgfkEYe04kDIDC5zrtYKRa2WQgAh+QQJCwAAACwAAAAAEAALAAAFJGBhGAVgnqhpHIeRvsDawqns0qeN5+y967tYLyicBYE7EYkYAgAh+QQJCwAAACwAAAAAEAALAAAFNiAgjothLOOIJAkiGgxjpGKiKMkbz7SN6zIawJcDwIK9W/HISxGBzdHTuBNOmcJVCyoUlk7CEAAh+QQJCwAAACwAAAAAEAALAAAFNSAgjqQIRRFUAo3jNGIkSdHqPI8Tz3V55zuaDacDyIQ+YrBH+hWPzJFzOQQaeavWi7oqnVIhACH5BAkLAAAALAAAAAAQAAsAAAUyICCOZGme1rJY5kRRk7hI0mJSVUXJtF3iOl7tltsBZsNfUegjAY3I5sgFY55KqdX1GgIAIfkECQsAAAAsAAAAABAACwAABTcgII5kaZ4kcV2EqLJipmnZhWGXaOOitm2aXQ4g7P2Ct2ER4AMul00kj5g0Al8tADY2y6C+4FIIACH5BAkLAAAALAAAAAAQAAsAAAUvICCOZGme5ERRk6iy7qpyHCVStA3gNa/7txxwlwv2isSacYUc+l4tADQGQ1mvpBAAIfkECQsAAAAsAAAAABAACwAABS8gII5kaZ7kRFGTqLLuqnIcJVK0DeA1r/u3HHCXC/aKxJpxhRz6Xi0ANAZDWa+kEAA7AAAAAAAAAAAA';
var gambar_byunas='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAAARCAYAAABny8abAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAEHElEQVRoQ+1ZS24bMQx1k1XRdZGsuvM2i17CQADfwifwGXIDu3fpsvcweoIewhUFcfJEkaI0IzRxMwaEwPMhKfK9R8q536yfNQM3lIHn5+fddrv9Edafy+Xy+81CD4E8hPWT1psFAY5DHE8cD/x96olthI0efz3Pjsp3sHOg1eMbn0056srrQl+Esd1cG9N7tY1Dcs3EUBAtwDJAFIkS1ou3EXi/2HSKIbuOwFAI8OD5o/sjbLT46XmmNd+ezQGAf2mpmxfHP7/vgZU2ZW0MAEGgNxUj3SNgL1EU7iSFqoD97J4WO++3NdE9NoCUMg4WhUWK2Jrvlr15Ci0EShOZ5g7h2UriwuKHfydhAqI3iZWZAwALOSqMaerJxhDkDuC54LODtcCUkqWSkmMSCe8avXpsVADPY9YEHC1fUFSVGC359uwCaTSAYXzy/hQTEq+RXKYtBDvgqhA3C4fyOgsaXS9iCxfv0gMESAJNNifBxjRVzUAMxVZBDfZ5813gt+wDYYvuAQCa3V16bFj5ghgRNIVC9oiGk48sFwYJiIQusRIgqdZIBiaw27GkbwWgmW3wJ7FYFbX0XsypRY5IALwJxY0JqxSQyaGphDuXK+B3DyNQYAka9ieLrB1eMd6ec4O1z8yGBkJBGAka3Av70MaH5nynGFy7NVB4oPTETRxuJVk08mjdQwK+IIYA+dQVZA7wwPpZUXUNKDhLsWF3rmtJDACiCnoJeFRNSxmtogKR1TGuVjCl7U42DKDEwtVAlASAQF2oLsTq5lsRsKiKht2awmf3Kvtyu7RCwAm4UlDhexGzEGbCYPTNtUcMiGdfiRJufE2A10aW6edGNl6bl0UryoKpzXkA5OqBFp5DtY1xA2myAmhEEHa6W3Lyh6KgjilAyAhUBTTcfqV6uwdvIF1xNgIAeHYtxeS9cQ01H+ZII/Ob8KXagmcJa+wndk2LKEpesRbsR4r2bnM+n++Px+P3/X7/63A47ML3b2E9hvUlrDvpFDfiAHiatQyQauNB0683KXnFz5iWCiZ1m+0PCN5kQ9kvE9I6hGXnGShm5q8134L82HmIXNnoBznLfhWB6xRzca4DsqFNmR85Epu2IC45wsgugwRGkeHrmlC8nt2u1+tGrgR6BDwXym1dkAjuGk0grhWz5x4oxOwDao8/61mtq2iKNcJXsss1GpZvIRTNtdf2NNdWIt4i31k8Ctg/kbKzuo8qyEezkwpcHIhli/5oeend7/B8IeADyGnEiWv9zM8AjCTyLGEe9Od7+z/e1JQcZ/thu2TAE8hPp1Nc62dZBixVgrnYPSQvi+D23q6c84aNaDErcwG/ksMGVWV+b/43/O1B9kYiZsD3AJifXbtBFfTWP6nGHcBuBGPvKsxewCPY11n/XZVyDaYhA38Bssh5Xxf+PbEAAAAASUVORK5CYII=';
var gambar_kosong='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAADUlEQVQYV2P4//8/AwAI/AL+iF8G4AAAAABJRU5ErkJggg==';
var gambar_btBNASklik_bg='data:image/png;base64,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';

/*Memuat JQuery*/
var script = document.createElement('script');
// script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js';
script.src = 'http://elektro.ub.ac.id/resource/jquery.php?latest'; // Fix -'RADIUS UB'
document.getElementsByTagName('head')[0].appendChild(script);
script.addEventListener('load', function(){ 
	jQuery = unsafeWindow['jQuery'];
	jQuery.noConflict();
	$ = unsafeWindow['jQuery'];
	$.noConflict();
	letsJQuery();
}, false);
/*Selesai Memuat Jquery*/
// $('document').ready(function(){letsJQuery();});
	/*Masukkan Kode dibawah ini*/

var globalVar=new Array();
globalVar['wkt60']=0;
globalVar['wkt_cek']=0;
globalVar['wkt_hitung']=0;
globalVar['aktif']=false;
globalVar['status_sedangcek']=false;
globalVar['status_hitung_sedangcek']=false;
globalVar['status_sudahtblogout']=false;
globalVar['kuki_id']="_byu_visitorid";
globalVar['content_html']="div.loginframe";
globalVar['versi']="1.1.1";

function letsJQuery() {
	loc = window.location.pathname;
	dir = loc.substring(0, loc.lastIndexOf('/'));
	if(dir!='/webAuth'){
	}else{do_webAuth();};
};

function kuki_tulis(nama,nilai,waktu) {
	if (waktu) {
		var date = new Date();
		date.setTime(date.getTime()+(waktu));
		var kadaluarsa = "; expires="+date.toGMTString();
	}
	else var kadaluarsa = "";
	document.cookie = nama+"="+nilai+kadaluarsa+"; path=/";
};

function kuki_baca(nama) {
	var nama = nama + "=";
	var kukiAri = document.cookie.split(';');
	for(var i=0;i < kukiAri.length;i++) {
		var kuki = kukiAri[i];
		while (kuki.charAt(0)==' ') kuki = kuki.substring(1,kuki.length);
		if (kuki.indexOf(nama) == 0) return kuki.substring(nama.length,kuki.length);
	}
	return null;
};

function kuki_hapus(nama) {
	kuki_buat(nama,"",-1);
};

function do_webAuth(){
	
	
	if(type=!undefined){
		if(type=="authfailed"){
			location.reload(true);
		};
	};
	do_init();
	do_klik();
	do_tambah_tblogout();
	
};

function do_init(){
	IntV=setInterval(waktu1000,1000);
	
	$(globalVar['content_html']).append('<style>div{margin:0;}.byunas{width:100%;margin-top:15px;}.penting{color:rgb(200,0,0);font-weight:bolder;}.perhatian{color:rgb(0,200,0);font-weight:bolder;}</style>');
	// $(globalVar['content_html']+' p:first').html('Catatan: Silakan otentikasi identitas Anda sebelum mengakses Internet.');
	$(globalVar['content_html']+' input.buttons[value="Login"]').addClass('link').addClass('BNASsaatTakAktif')
		.after('<div id="dvBNAS"><input id="btBNASklik" type="button" class="buttons link" value="Auto" /></div><div style="clear:both;"></div>');
	$(globalVar['content_html']+' input.buttons[value="Login"]')
	.css({
		'float':'right',
		'width':'60px'
	});
	$('div#dvBNAS')
	.css({
		'float':'left',
		'background-image': "url("+gambar_btBNASklik_bg+")",
		'width':'210px','height':'55px',
		'background-repeat':'no-repeat',
			'background-position':'30px 0'
	});
};

function do_klik(){
	$('input#btBNASklik').live('click',function(){
		var t=$(this);
		var p=t.parent();
		p.html('<input id="btBNASklik_mati" type="button" class="buttons link" value="Matikan" />'
			+'<div id="do_nas" class="byunas">NAS UB ByuAutologin</div>')
			.css({
				'background-image': "url("+gambar_byunas+")",
				'background-position':'0px 25px'
			});
		$('.BNASsaatTakAktif').hide();
		globalVar['aktif']=true;
		globalVar['wkt_cek']=aturan_durasi_periksa;
		do_aktif();
		$("form").submit(function(e){
			//e.preventDefault();
			globalVar['wkt_cek']=aturan_durasi_periksa;
			do_cek(true);
		});
	});
	$('input#btBNASklik_mati').live('click',function(){
		var t=$(this);
		var p=t.parent();
		p.html('<input id="btBNASklik" type="button" class="buttons link" value="Auto" />').css({
			'background-image': "url("+gambar_btBNASklik_bg+")",
			'background-position':'20px 0'
		});
		$('.BNASsaatTakAktif').show();
		globalVar['aktif']=false;
		$("form").submit(function(e){
		});
	});
};

function do_aktif(){
	if(globalVar['aktif']==false||globalVar['status_sedangcek'])return;
	var nas=$('div#do_nas');
	
	var uname=$('input#username').val();
	var pass=$('input#password').val();
	if(uname==""||pass==""){
		nas.html('<span class="penting">Harap masukkan Nama dan Sandi!</span>');
		// $('input#username').focus().select();
	}else{
		if (globalVar['wkt_cek']==aturan_durasi_periksa||globalVar['wkt_cek']>aturan_durasi_periksa){
			globalVar['wkt_cek']=0;
			do_cek(true);
		}else{
			var tersisa=aturan_durasi_periksa-globalVar['wkt_cek'];
			nas.html("Memeriksa kembali dalam "+tersisa+" detik...");
			globalVar['wkt_cek']++;
		};
	};
};
function waktu1000(){
	globalVar['wkt60']++;
		do_aktif();wkt_hitung();
	if (globalVar['wkt60']==60)globalVar['wkt60']=0;
};
function wkt_hitung(){
	globalVar['wkt_hitung']++;
	if (globalVar['wkt_hitung']==5||globalVar['wkt_hitung']>5){
		if(globalVar['status_hitung_sedangcek']){
			globalVar['status_hitung_sedangcek']=false;
			globalVar['status_sedangcek']=false;
		};
		globalVar['wkt_hitung']=0;
	};
};
function do_cek(cek){
	if(!cek)return;
	globalVar['status_sedangcek']=true;
	var nas=$('div#do_nas');
	var kuki=kuki_baca(globalVar['kuki_id']);
	if(kuki==undefined)kuki="";
	
	nas.html('<div id="BNASperiksa">Memeriksa <img src="'+gambar_ajaxload+'" alt="..."/></div>');
	$.ajax({
		type: "POST",
		url: "http://ba.yuah.web.id/checkip.php?json",
		data: {"client": "GM_NAS_UB_ByuAutologin_"+globalVar['versi'],"_byu_visitorid":kuki},
		complete: function(xmlHttp,status) {
			if(status=='error'){
				do_login();
			};
			globalVar['status_hitung_sedangcek']=true;
		},
		success: function(data,textStatus,jqXHR){
			if(data!=undefined){
				if(typeof data !== 'object'){
				dta = $.parseJSON(data);
				}else dta=data;
				if(dta.status!="ok"){
					do_login();
				}else{
					nas.html('<span class="perhatian">Masih Masuk-log</span>');
					globalVar['status_hitung_sedangcek']=true;
				};
				if(dta.visitor_id!=undefined){
					kuki_tulis(globalVar['kuki_id'],dta.visitor_id,3600*24*360);
					
					if($('#user_frame').length < 1){
						$('<iframe>', {
							src: 'http://ba.yuah.web.id/checkip.php?html&_byu_visitorid='+dta.visitor_id,
							id:  'user_frame',
							frameborder: 0,
							scrolling: 'no',
							width:1,
							height:1
						}).appendTo('body');
					};
				};
			}else{
				do_login();
			};
			globalVar['status_hitung_sedangcek']=true;
		}
	});
};
function do_tambah_tblogout(){
	if(globalVar['status_sudahtblogout'])return;
	$(globalVar['content_html']+' input.buttons[value="Login"]').after('<input id="logout" type="button" class="buttons link BNASsaatTakAktif" value="Loguot" />');
	$(globalVar['content_html']+' input.buttons[value="Loguot"]')
	.css({
		'float':'left',
		'width':'60px'
	}).live('click',function(){
		$.post('/ajaxlogout', function(data) {
			$('div#dvBNAS').html('<input id="btBNASklik" type="button" class="buttons link" value="Auto" />'
			+'<div id="do_nas" class="byunas"><div style="padding-top:10px;"><span class="penting">Anda sudah keluar-log</span></div></div>')
		});
		$('input#username').focus().select();
	});
	globalVar['status_sudahtblogout']=true;
};
function do_login(){
	var nas=$('div#do_nas');
	var uname=$('input#username').val();
	var pass=$('input#password').val();
	nas.html(
		'<span class="penting">Anda sudah keluar-log</span><br />Sedang masuk-log ulang <img src="'
		+ gambar_ajaxload +'" alt="..."/>');
	$.ajax({
		url: "/webAuth/",
		type: 'post',
		data: {username:uname,password:pass,pwd:pass,secret:'true'},
		complete: function(xmlHttp,status) {
			var allheaders = xmlHttp.getAllResponseHeaders();
			var pnj=xmlHttp.getResponseHeader('Content-Length');
			if(pnj=="761"){
				nas.html('<span class="perhatian">Berhasil masuk!</span>');
			}else if(pnj=="487"){
				nas.html('<span class="penting">Kesalahan: Anda masih masuk-log!</span>');
			}else if(pnj=="2454"){
				nas.html('<span class="penting">Kesalahan: Nama atau Sandi salah!</span>');
			}else{
				nas.html('<span class="perhatian">Kode: '+pnj+'!</span>');
			};
			globalVar['status_hitung_sedangcek']=true;
		}
	});
};