// ==UserScript==
// @name          Vatan Bilgisayar Hesap Yardımcısı
// @description   VatanBilgisayar üzerinde gezinirken seçiminiz doğrultusunda indirimli fiyatları görmenizi sağlar.
// @author        RevoLand
// @version 	  1.0.5
// @include       *vatanbilgisayar.com/*
// @require       http://code.jquery.com/jquery-1.11.0.min.js
// @require       https://raw.github.com/sizzlemctwizzle/GM_config/master/gm_config.js
// ==/UserScript==
/*
	-- 1.0.5 (Kemal Sunal)
		[+] Ürün stoklarda olmasa bile artık sepete ekleyebilirsiniz.
		[*] Vatan Bilgisayar'ın yeni tasarımı ile uyumlu hâle getirildi.
		[-] Yeni site tasarımında olmayan özellikler çıkarıldı.
		
	-- 1.0.4 ()
		[*] Katalog sayfaları düzeltildi.

	-- 1.0.3 (Barış Manço)
		[+] Kullanıcı için ayarlar eklendi ve aktif/pasif edilen bir sürü yeni fonksiyon.
		[*] Sepet sayfası baştan yazıldı.
		
	İletişim
		Mail: revoland [at] windowslive.com / Skype: revolutionland
*/

GM_config.init(
{
  'id': 'Script_Ayarlari',
  'title': 'Vatan Bilgisayar Hesap Yardımcısı (1.0.5 - <a href="http://tr.wikipedia.org/wiki/Kemal_Sunal" title="Rahmetli Kemal Sunal\' saygıyla anıyoruz.">Kemal Sunal</a>)',
  'fields':
  {
	// Ana Sayfa Ayarları
	'Anasayfa_indirimAktif':
	{
		'section': GM_config.create('Ana Sayfa Ayarları'),
        'label': 'Ana sayfa üzerinde indirimli fiyatların gösterilmesini aktif et? ',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': true
    },
    'Anasayfa_indirimMiktari':
    {
		'label': 'Gösterilecek indirim miktarı (yüzde): ',
		'labelPos': 'above',
		'type': 'unsigned int',
		'title': 'Gösterilecek indirim miktarını belirtin, örneğin 30 yazarsanız %30 indirimli fiyatlar gösterilecektir.',
		'default': '30'
    },
	
	// Katalog ayarları
	'Katalog_indirimAktif':
	{
		'section': GM_config.create('Katalog Ayarları'),
        'label': 'Katalog üzerinde indirimli fiyatların gösterilmesini aktif et? ',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': true
    },
    'Katalog_indirimMiktari':
    {
		'label': 'Gösterilecek indirim miktarı (yüzde): ',
		'labelPos': 'above',
		'type': 'unsigned int',
		'title': 'Gösterilecek indirim miktarını belirtin, örneğin 30 yazarsanız %30 indirimli fiyatlar gösterilecektir.',
		'default': '30'
    },
	
	// Ürün görüntüleme sayfası ayarları
	'Urun_indirimAktif':
	{
		'section': GM_config.create('Ürün görüntüleme sayfası ayarları'),
        'label': 'Ürün görüntüleme sayfası üzerinde indirimli fiyatların gösterilmesini aktif et? ',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': true
    },
    'Urun_indirimMiktari':
    {
		'label': 'Gösterilecek indirim miktarı (yüzde): ',
		'labelPos': 'above',
		'type': 'unsigned int',
		'title': 'Gösterilecek indirim miktarını belirtin, örneğin 30 yazarsanız %30 indirimli fiyatlar gösterilecektir.',
		'default': '30'
    },
	'Urun_sinirliStok':
	{
        'label': 'Ürün sınırlı stok indirimine girmiş olsa da indirimli fiyatları göster? ',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': false
    },
	
	// Sepet sayfası ayarları
	'Sepet_indirimAktif':
	{
		'section': GM_config.create('Sepet sayfası ayarları'),
        'label': 'Sepet üzerinde indirimli fiyatların gösterilmesini aktif et? ',
        'labelPos': 'above',
        'type': 'checkbox',
        'default': true
    },
    'Sepet_indirimMiktari':
    {
		'label': 'Gösterilecek indirim miktarı (yüzde): ',
		'labelPos': 'above',
		'type': 'unsigned int',
		'title': 'Gösterilecek indirim miktarını belirtin, örneğin 30 yazarsanız %30 indirimli fiyatlar gösterilecektir.',
		'default': '30'
    },
  }
});

// Anasayfa Ayarları
var vAnasayfa_indirimAktif = GM_config.get('Anasayfa_indirimAktif');
var vAnasayfa_indirimMiktari = GM_config.get('Anasayfa_indirimMiktari');

// Katalog Ayarları
var vKatalog_indirimAktif = GM_config.get('Katalog_indirimAktif');
var vKatalog_indirimMiktari = GM_config.get('Katalog_indirimMiktari');

// Ürün Görüntüleme Sayfası Ayarları
var vUrun_indirimAktif = GM_config.get('Urun_indirimAktif');
var vUrun_indirimMiktari = GM_config.get('Urun_indirimMiktari');
var vUrun_sinirliStok = GM_config.get('Urun_sinirliStok');

// Sepet Sayfası Ayarları
var vSepet_indirimAktif = GM_config.get('Sepet_indirimAktif');
var vSepet_indirimMiktari = GM_config.get('Sepet_indirimMiktari');

// Mevcut Dizin
var mevcutDizin = window.location.pathname; // Bulunduğumuz dizini öğrenelim, buna bağlı olarak scriptimizi çalıştıralım ki alakasız sayfalarda saçma sapan sonuçlar ile karşılaşmayalım. :)


if (mevcutDizin.search('sepetim.aspx') != '-1') // Eğer şuanda alışveriş sepetinde isek aşağıdaki kodlar aktif olsun
{
	if (vSepet_indirimAktif)
	{
		$("div[class='fiyat']").filter(":first").after('<div class="fiyat"><span>%'+ vSepet_indirimMiktari +' İndirimli Tutar</span></div>');
		$("div[class='row clearfix']").each(function () { // Tablo içerisindeki ana fiyatımızın olduğu sütunları seçelim
			var indirimsizFiyat = $(this).find('.brutFiyatVrg').filter(":first").text() // Orijinal fiyat
				indirimsizFiyat = indirimsizFiyat.replace(/\s+/g, '') // Boşlukları temizleyelim
												.replace('TL', '') // TL yazısını kaldıralım
												.replace('.', '') // Fiyat içerisindeki noktayı kaldıralım
												.replace(',', '.'); // ve virgül'ü nokta ile değiştirelim
				indirimsizFiyat = Math.round(indirimsizFiyat); // Ve son olarak yuvarlayalım
			var indirimliFiyat = indirimsizFiyat * 30 / 100;
				indirimliFiyat = Math.round(indirimsizFiyat - indirimliFiyat); // Bulduğumuz kâr'ı indirimsiz fiyat üzerinden çıkartalım
			
			$(this).find('.fiyat').filter(":last").after('<div class="fiyat2"><span><font class="netFiyatVrg">'+ indirimliFiyat +' TL</font></span></div>'); // Orijinal fiyatımızın bulunduğu sütunun içine indirimli fiyatımızı yazalım
		});

		var toplamTutar = $(".prd1").filter(":first").text();
			toplamTutar = toplamTutar.replace(' ', '').replace('Fiyat', '').replace('TL', '').replace('.', '').replace(',', '.');
		var indirimliToplamTutar = Math.round(toplamTutar * vSepet_indirimMiktari / 100); // İndirimsiz toplam tutarımız üzerinden %30 indirim miktarını hesaplayalım
			indirimliToplamTutar = Math.round(toplamTutar - indirimliToplamTutar); // İndirimsiz tutar üzerinden bulduğumuz miktarı çıkaralım ve %30 indirimli fiyatımız ortaya çıksın
			$(".pnlDipToplam_sipToplam").after('<tr class="pnlDipToplam_sipToplam"><th align="right"><span class="pageSepetToplam_lbfSip_NetToplam">%'+ vSepet_indirimMiktari +' İndirimli</span></th><td align="right"><span class="pageSepetToplam_lblSip_NetToplam">'+ indirimliToplamTutar +' TL</span></td></tr>');
	}
}
else if(mevcutDizin.search('.html') != '-1') // Eğer şuanda ürün detay sayfasında isek aşağıdaki kodlar aktif olsun
{
	if (vUrun_indirimAktif)
	{
		var stokSinirli	= $( "i[class='stokDurum']" ).text(); // Aynı şekilde stoklarla sınırlı olup olmadığı için de böyle bir çağrı yapalım
		if (vUrun_sinirliStok)
		{
				var indirimsizFiyat = $( ".prd1 span" ).filter(":first").text(); // Vatan tarafından gizlenmiş inputlar içerisinde indirimsiz fiyatı içerisinde barındıran inputu seçelim
					indirimsizFiyat = Math.round(indirimsizFiyat.replace('  TL', '').replace('.', '').replace(',', '.')); // noktaları kaldıralım ve virgülü nokta ile değiştirelim
				var indirimliFiyat = indirimsizFiyat * vUrun_indirimMiktari / 100;
					indirimliFiyat = Math.round(indirimsizFiyat - indirimliFiyat); // Bulduğumuz bu miktarı indirimsiz fiyat üzerinden çıkartalım
				var kazanc = indirimsizFiyat - indirimliFiyat;
					
				$( "div[class='block one clearfix']").find(".floatFixer").filter(":last").after('<span class="urunDetay_KazancOran" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblKazancOran">%'+ vUrun_indirimMiktari +'</span><span class="urunDetay_lbfKazancFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfKazancFiyat">Kazanç</span><span class="urunDetay_KazancFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblKazancFiyat">'+ kazanc +'<span class="d">,00</span><span class="pb1">  TL</span></span><div class="floatFixer"></div><div class="divL"><span class="urunDetay_lbfSatisIlkFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisIlkFiyat">Fiyat</span><span class="urunDetay_lbfSatisIlkFiyatIcon" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisIlkFiyatIcon"><i class="icon1 tl3"></i></span>'+ indirimsizFiyat +'<span class="d">,00</span><span class="pb1">  TL</span>&nbsp;<span id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfURN_KDVDAHILSATISILK"></span></div><div class="divR"><span class="urunDetay_lbfSatisFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisFiyat">Satış Fiyatı <i class="iconText lansmanUrun"></i></span><span class="urunDetay_satisFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblSatisFiyat">'+ indirimliFiyat +'<span class="d">,00</span><span class="pb1">  TL</span>&nbsp;<span id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfURN_KDVDAHILSATIS"><span class="kdv1">KDV Dahil</span> <span class="kdv5">KDV BİZDEN</span></span></span></div><div class="floatFixer"></div>'); // İndirimli fiyat ile ilgili bilgilerimizi tablo hâlinde kullanıcılara sunalım
		}
		else
		{
			if (stokSinirli.length == '0') // Ve eğer ürün stoklarla sınırlı ya da internete özel fiyat değil ise indirim hesaplaması için kodlarımızı çalıştıralım
			{
				var indirimsizFiyat = $( ".prd1 span" ).filter(":first").text(); // Vatan tarafından gizlenmiş inputlar içerisinde indirimsiz fiyatı içerisinde barındıran inputu seçelim
					indirimsizFiyat = Math.round(indirimsizFiyat.replace('  TL', '').replace('.', '').replace(',', '.')); // noktaları kaldıralım ve virgülü nokta ile değiştirelim
				var indirimliFiyat = indirimsizFiyat * vUrun_indirimMiktari / 100;
					indirimliFiyat = Math.round(indirimsizFiyat - indirimliFiyat); // Bulduğumuz bu miktarı indirimsiz fiyat üzerinden çıkartalım
				var kazanc = indirimsizFiyat - indirimliFiyat;
					
				$( "div[class='block one clearfix']").find(".floatFixer").filter(":last").after('<span class="urunDetay_KazancOran" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblKazancOran">%'+ vUrun_indirimMiktari +'</span><span class="urunDetay_lbfKazancFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfKazancFiyat">Kazanç</span><span class="urunDetay_KazancFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblKazancFiyat">'+ kazanc +'<span class="d">,00</span><span class="pb1">  TL</span></span><div class="floatFixer"></div><div class="divL"><span class="urunDetay_lbfSatisIlkFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisIlkFiyat">Fiyat</span><span class="urunDetay_lbfSatisIlkFiyatIcon" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisIlkFiyatIcon"><i class="icon1 tl3"></i></span>'+ indirimsizFiyat +'<span class="d">,00</span><span class="pb1">  TL</span>&nbsp;<span id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfURN_KDVDAHILSATISILK"></span></div><div class="divR"><span class="urunDetay_lbfSatisFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfSatisFiyat">Satış Fiyatı <i class="iconText lansmanUrun"></i></span><span class="urunDetay_satisFiyat" id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lblSatisFiyat">'+ indirimliFiyat +'<span class="d">,00</span><span class="pb1">  TL</span>&nbsp;<span id="ctl00_u13_ascUrunDetay_dtUrunDetay_ctl00_lbfURN_KDVDAHILSATIS"><span class="kdv1">KDV Dahil</span> <span class="kdv5">KDV BİZDEN</span></span></span></div><div class="floatFixer"></div>'); // İndirimli fiyat ile ilgili bilgilerimizi tablo hâlinde kullanıcılara sunalım
			}
		}
		$(".pnlSepetGrup").css("display", "");
		$(".pnlSepetGrup").after("<br />");
	}
}
else if(mevcutDizin == '/' || mevcutDizin.search('index.aspx') != '-1')
{
	if (vAnasayfa_indirimAktif)
	{
		$(".urunListe_pnlIndirimOran").css("display", "");
		$("div[class='product clearfix']").each(function () { // ID'sinde PriceTL2 bulunan tüm span'ları döndürelim
			var indirimYuzdesi = $(this).find(".iconText").text().replace('%', '');
			var indirimsizFiyat = $(this).find("div[class='urunListe_satisFiyat']").text().replace(' ', '').replace('TL', '').replace('.', '').replace(',', '.');
				indirimsizFiyat = Math.round(indirimsizFiyat * 100 / (100 - indirimYuzdesi)); // indirimsiz fiyatımız üzerinden indirimli fiyatı bulalım
				
			var indirimliFiyat = indirimsizFiyat * vAnasayfa_indirimMiktari / 100; // indirimsiz fiyatımız üzerinden indirimli fiyatı bulalım
				indirimliFiyat = Math.round(indirimsizFiyat - indirimliFiyat); // hesapladığımız fiyatı indirimsiz fiyat üzerinden düşürelim ve ne olur ne olmaz diye yuvarlayalım
			
			$(this).find("div[class='priceHolder clearfix']").after('<div class="priceHolder clearfix"><span id="ctl00_u16_ascUrunList_rptDestUrun_ctl02_lblKdv"><span><div class="kdvDahil">%'+ vAnasayfa_indirimMiktari +' İndirim</div></span></span><div class="urunListe_satisFiyat" id="ctl00_u16_ascUrunList_rptDestUrun_ctl02_pnlIndirim">'+ indirimliFiyat +'<span class="d">,00</span><span class="pb1">  TL</span></div></div>');
		});
	}
}
else
{
	if (vKatalog_indirimAktif)
	{
		$(".urunListe_pnlIndirimOran").css("display", "");
		$("div[class='product clearfix']").each(function () { // ID'sinde PriceTL2 bulunan tüm span'ları döndürelim
			var indirimYuzdesi = $(this).find(".iconText").text().replace('%', '');
			var indirimsizFiyat = $(this).find("div[class='urunListe_satisFiyat']").text().replace(' ', '').replace('TL', '').replace('.', '').replace(',', '.');
				indirimsizFiyat = Math.round(indirimsizFiyat * 100 / (100 - indirimYuzdesi)); // indirimsiz fiyatımız üzerinden indirimli fiyatı bulalım
				
			var indirimliFiyat = indirimsizFiyat * vKatalog_indirimMiktari / 100; // indirimsiz fiyatımız üzerinden indirimli fiyatı bulalım
				indirimliFiyat = Math.round(indirimsizFiyat - indirimliFiyat); // hesapladığımız fiyatı indirimsiz fiyat üzerinden düşürelim ve ne olur ne olmaz diye yuvarlayalım
			
			$(this).find("div[class='priceHolder clearfix']").after('<div class="priceHolder clearfix"><span id="ctl00_u16_ascUrunList_rptDestUrun_ctl02_lblKdv"><span><div class="kdvDahil">%'+ vKatalog_indirimMiktari +' İndirim</div></span></span><div class="urunListe_satisFiyat" id="ctl00_u16_ascUrunList_rptDestUrun_ctl02_pnlIndirim">'+ indirimliFiyat +'<span class="d">,00</span><span class="pb1">  TL</span></div></div>');
		});
	}
}
	$(".pageLink li").filter(":last").after('<li id="ScriptAyarlari"><a rel="nofollow" href="#">Hesap Yardımcısı Ayarları</a></li>');
	
	$("#ScriptAyarlari").click(function() {
		GM_config.open();
		return false;
	});