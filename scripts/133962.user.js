// ==UserScript==
// @name           Taraf Yonlendirici
// @namespace      taraf.yonlendirici
// @description    Taraf Gazetesindeki makalelerin Düzce Yerel Haber sitesindeki ilgili kopyasından alarak tam metni gösterir.
// @author		   sanilunlu
// @version		   1.4
// 
// @include        http://www.taraf.com.tr/*/*.htm
// @include        http://taraf.com.tr/*/*.htm
// ==/UserScript==

var yazarDonusum = {
	'muratbelge': 'Murat_BELGE',
	'ahmetaltan': 'Ahmet_ALTAN',
	'alpergormus': 'Alper_GoRMus',
	'sezinoney': 'Sezin_oNEY',
	'melihaltinok': 'Melih_ALTINOK',
	'kurtulustayiz': 'Kurtulus_TAYiZ',
//	'fatihuraz': 'Fatih_URAZ',
//	'barbarosaltug': 'Barbaros_ALTUG',
	'akinozcer': 'Akin_oZcER',
//	'alifikriisik': 'Ali_FIKRI-ISIK',
	'yasemincongar': 'Yasemin_cONGAR',
	'neseduzel': 'Nese_Duzel',
	'etyenmahcupyan': 'Etyen_MAHcUPYAN',
//	'amberinzaman': 'Amberin_ZAMAN',
	'aysehur': 'Ayse_HuR',
	'cemilertem': 'Cemil_ERTEM',
	'cihanaktas': 'Cihan_AKTAs',
	'demirayoral': 'Demiray_ORAL',
	'drsivilaygenc': 'DrSivilay_GENc',
//	'fundaozgur': 'Funda_OZGUR',
	'halilberktay': 'Halil_BERKTAY',
	'lalekemal': 'Lale_KEMAL',
	'orhanmiroglu': 'Orhan_MiROgLU',
	'onderaytacemreuslu': 'Emre_USLU',
//	'pakizebarista': 'Pakize_BARISTA',
//	'renginsoysal': 'Rengin_SOYSAL',
//	'temeliskit': 'Temel_ISKIT',
	'yildirayogur': 'Yildiray_OgUR',
	'umitkivanc': 'umit_KIVANc',
//	'alimurathamarat': 'Ali_MURAT-HAMARAT',
//	'canbelge': 'Can_BELGE',
//	'fikretdogan': 'Fikret_DOGAN',
//	'elifcakir': 'Elif_CAKIR',
//	'suzansamanci': 'Suzan_SAMANCI',
//	'ayhanaktar': 'Ayhan_AKTAR',
//	'profdrkemalhkarpat': 'Prof_DR-KEMAL-H-KARPAT',
//	'hidirgevis': 'Hidir_GEVIS',
//	'gokhanozgun': 'Gokhan_OZGUN',
//	'umitizmen': 'Umit_IZMEN',
//	'zekicoskun': 'Zeki_COSKUN',
	'markaresayan': 'Markar_ESAYAN',
	'leylaipekci': 'Leyla_iPEKCi',
//	'rasimozankutahyali': 'Rasim_OZAN-KUTAHYALI',
//	'mehmetgureli': 'Mehmet_GURELI',
//	'sevannisanyan': 'Sevan_NISANYAN',
//	'aesrayalazan': 'A_ESRA-YALAZAN',
//	'suleymanyasar': 'Suleyman_YASAR',
	'mithatsancar': 'Mithat_SANCAR',
	'cemsey': 'Cem_SEY',
	'oyabaydar': 'Oya_BAYDAR',
	'erolkatircioglu': 'Erol_KATIRCIOgLU',
//	'pelincengiz': 'Pelin_CENGIZ',
//	'aliabaday': 'Ali_ABADAY',
//	'janetbaris': 'Janet_BARIS',
//	'aydancelik': 'Aydan_CELIK',
	'ronimargulies': 'Roni_MARGULIES',
	'nabiyagci': 'Nabi_YAgCI',
//	'onderaytac': 'Onder_AYTAC',
	'emreuslu': 'Emre_USLU',
//	'cahitkoytak': 'Cahit_KOYTAK',
//	'aycaorer': 'Ayca_ORER',
//	'ramazancanakkaleli': 'Ramazan_CANAKKALELI',
//	'gulengulaltinsay': 'Gulengul_ALTINSAY',
	'hilalkaplan': 'Hil%E2l_KAPLAN',
	'ferhatkentel': 'Ferhat_KENTEL',
//	'evrimalatas': 'Evrim_ALATAS',
//	'tugbatekerek': 'Tugba_TEKEREK',
//	'abdullahkaratash': 'Abdullah_KARATASH',
//	'adriennewoltersdorf': 'Adrienne_WOLTERSDORF',
//	'alierden': 'Ali_ERDEN',
//	'alimurathamarat2': 'Ali_MURAT-HAMARAT-2',
//	'andrewfinkel': 'Andrew_FINKEL',
//	'ardaalan': 'Arda_ALAN',
//	'aycasen': 'Ayca_SEN',
//	'barbarosaltug2': 'Barbaros_ALTUG-2',
//	'barisyarsel': 'Baris_YARSEL',
//	'berkgulener': 'Berk_GULENER',
//	'beyduhankenarci': 'Beyduhan_KENARCI',
//	'bulentsirin': 'Bulent_SIRIN',
//	'cengizaktar': 'Cengiz_AKTAR',
	'cerenkenar': 'Ceren_KENAR',
//	'daghanirak': 'Daghan_IRAK',
//	'erdemozgur': 'Erdem_OZGUR',
//	'ertanaltan': 'Ertan_ALTAN',
//	'esmeray': '_ESMERAY',
//	'evrimbunn': 'Evrim_BUNN',
//	'fatihuraz2': 'Fatih_URAZ-2',
//	'ferhatuludere': 'Ferhat_ULUDERE',
//	'fikriturkel': 'Fikri_TURKEL',
//	'gokhanerkus': 'Gokhan_ERKUS',
//	'gokhankarabulut': 'Gokhan_KARABULUT',
	'gurbuzozaltinli': 'Gurbuz_oZALTINLI',
	'hadiuluengin': 'hadi_uluengin',
//	'halukcetin': 'Haluk_CETIN',
	'hidayetsefkatlituksal': 'hidayet_sefkatli_tuksal',
	'ioannisngrigoriadis': 'ioannis_N_Grigoriadis',
//	'keremaltan': 'Kerem_ALTAN',
//	'leventyilmaz': 'Levent_YILMAZ',
	'mehmetbaransu-2': 'Mehmet_BARANSU',
	'mehmetbaransu': 'Mehmet_BARANSU',
//	'msefikoncu': 'M_SEFIK-ONCU',
//	'muratcetin': 'Murat_CETIN',
	'namikcinar': 'Namik_cINAR',
//	'niluferkuyas': 'Nilufer_KUYAS',
//	'numanturer': 'Numan_TURER',
//	'nurullahozturk': 'Nurullah_OZTURK',
//	'ozlemertan': 'Ozlem_ERTAN',
	'perihanmagden': 'Perihan_MAgDEN',
	'ramazanrasim': 'Ramazan_RASiM',
//	'rifattahiroglu': 'Rifat_TAHIROGLU',
//	'sedattunali': 'Sedat_TUNALI',
	'serdarkaya': 'Serdar_KAYA',
//	'sibeloral': 'Sibel_ORAL',
//	'solmazkamuran': 'Solmaz_KAMURAN',
//	'tanoral': 'Tan_ORAL',
//	'tayfunserttas': 'Tayfun_SERTTAS',
//	'tuncerkoseoglu': 'Tuncer_KOSEOGLU',
//	'ymeryemeroglu': 'Y_MERYEM-EROGLU',
};

// guncel
yazarDonusum = {
	'ahmetaltan': 'ahmet-altan',
	'akinozcer': 'akin-ozcer',
	'alpergormus': 'alper-gormus',
	'aysehur': 'ayse-hur-taraf-yazilari',
	'cemilertem': 'cemil-ertem',
	'cemsey': 'ceren-kenar',
	'cerenkenar': 'cihan-aktas',
	'cihanaktas': 'demiray-oral',
	'demirayoral': 'dogan-akin',
	'drsivilaygenc': 'drsivilay-genc',
	'emreuslu': 'emre-uslu',
	'erolkatircioglu': 'erol-katircioglu',
	'etyenmahcupyan': 'etyen-mahcupyan',
	'ferhatkentel': 'ferhat-kentel',
	'gurbuzozaltinli': 'gurbuz-ozaltinli',
	'hadiuluengin': 'hadi-uluengin',
	'halilberktay': 'halil-berktay',
	'hidayetsefkatlituksal': 'hidayet-sefkatli-tuksal',
	'hilalkaplan': 'hill-kaplan',
	'ioannisngrigoriadis': 'ioannis-n-grigoriadis',
	'kurtulustayiz': 'kurtulus-tayiz',
	'lalekemal': 'lale-kemal',
	'leylaipekci': 'leyla-ipekci',
	'markaresayan': 'markar-esayan',
	'mehmetbaransu': 'mehmet-baransu',
	'melihaltinok': 'melih-altinok',
	'mithatsancar': 'mithat-sancar',
	'muratbelge': 'murat-belge',
	'nabiyagci': 'nabi-yagci--taraf-yazilari',
	'namikcinar': 'namik-cinar',
	'neseduzel': 'nese-duzel',
	'orhanmiroglu': 'orhan-miroglu-',
	'oyabaydar': 'oya-baydar',
	'perihanmagden': 'perihan-magden',
	'ramazanrasim': 'ramazan-rasim',
	'ronimargulies': 'roni-margulies',
	'serdarkaya': 'serdar-kaya',
	'sezinoney': 'sezin-oney',
	'umitkivanc': 'umit-kivanc',
	'yasemincongar': 'yasemin-congar',
	'yildirayogur': 'yildiray-ogur'
};

var hr = window.location.href;
var yazar = hr.substring(hr.indexOf('tr/')+'tr/'.length, hr.indexOf('/', hr.indexOf('tr/')+'tr/'.length)).replace(/-/g,'');
var htm = document.body.innerHTML;
var baslik = htm.substring(htm.indexOf('<span class="yazi_baslik">') + '<span class="yazi_baslik">'.length, htm.indexOf('</span>', htm.indexOf('<span class="yazi_baslik">'))).trim();

if(yazar == 'serdarkaya') {
	var el = document.getElementsByClassName('yazi')[1];
	
	el.innerHTML = "<img style='padding-left:250px;padding-top:30px' src='http://ajaxload.info/images/exemples/9.gif' /><p style='text-align:center;font-weight:bold'>Yazı DerinSular.com'dan yükleniyor, lütfen bekleyiniz...</p>";
	
	var trf = window.location.href;
	trf = trf.replace('http://www.','');
	trf = trf.replace('https://www.','');
	trf = trf.replace('http://','');
	trf = trf.replace('https://','');
	trf = "http://www." + trf;

	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://serdarkaya.com/taraf/',
		headers: {"User-Agent":"Mozilla/5.0","Accept":"text/html"},
		onload: function(response) {
			var tx = response.responseText;
			var ur = tx.substring(tx.indexOf('href="', tx.indexOf(trf)) + 'href="'.length, tx.indexOf('">html<', tx.indexOf(trf)));

			if (tx.indexOf(trf) == -1) {
				el.innerHTML = "<p style='text-align:center;font-weight:bold'>Yazı <a href='http://www.derinsular.com/'>DerinSular.com</a>'da BULUNAMADI !</p>";
				return;
			}

			GM_xmlhttpRequest({
				method: "GET",
				url: ur,
				headers: {"User-Agent":"Mozilla/5.0","Accept":"text/html"},
				onload: function(response) {
					var tx = response.responseText;
					tx = tx.substring(tx.indexOf('<div class="entry">'), tx.indexOf('<div class="comments">'));
					el.innerHTML = tx;
				},
				onerror: function(response) {
					alert('DERINSULARDAN YUKLENIRKEN HATA OLUSTU!'); //GM_log(response); 
				}
			});
			//console.log(response);
		},
		onerror: function(response) {
			alert('DERINSULARDAN YUKLENIRKEN HATA OLUSTU!'); //GM_log(response); 
		}
	});

	return;
}

if (yazarDonusum[yazar]) {
	var el = document.getElementsByClassName('yazi')[1];
	
	el.innerHTML = "<img style='padding-left:250px;padding-top:30px' src='http://ajaxload.info/images/exemples/9.gif' /><p style='text-align:center;font-weight:bold'>Yazı DüzceYerelHaber.com'dan yükleniyor, lütfen bekleyiniz...</p>";
	
/*	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.duzceyerelhaber.com/kose-yazarlari.asp',
		headers: {"User-Agent":"Mozilla/5.0","Accept":"text/html"},
		onload: function(response) {
			var tx = response.responseText;
			var ur = tx.substring(tx.lastIndexOf('kose-yazi.asp', tx.indexOf('&' + yazarDonusum[yazar] + '-')), tx.indexOf('"', tx.indexOf('&' + yazarDonusum[yazar] + '-')));
			*/
			GM_xmlhttpRequest({
				method: "GET",
				url: 'http://www.duzceyerelhaber.com/' + yazarDonusum[yazar],
				headers: {"User-Agent":"Mozilla/5.0","Accept":"text/html"},
				onload: function(response) {
					var tx = response.responseText;
					
					var lidx = tx.lastIndexOf('<div class="yazarD-title pull-left" style="width:290px;">' + baslik);
					if (lidx != -1) {
						var baslink = tx.substring(tx.lastIndexOf('<a href="', lidx) + '<a href="'.length, tx.lastIndexOf('" class="columnist_other_news_yazarD"', lidx));
						GM_xmlhttpRequest({
							method: "GET",
							url: baslink,
							headers: {"User-Agent":"Mozilla/5.0","Accept":"text/html"},
							onload: function(response) {
								var tx = response.responseText;
								tx = tx.substring(tx.indexOf('<div class="tab-pane fade in active" id="sonYazi">'), tx.indexOf('<div class="tab-pane fade other-article" id="tumYazi">'));
								tx = tx.replace(new RegExp('kose-yazi.asp', 'gm'), 'http://www.duzceyerelhaber.com/kose-yazi.asp');
								el.innerHTML = tx;
							},
							onerror: function(response) {
								alert('DUZCEYERELHABERDEN YUKLENIRKEN HATA OLUSTU!'); //GM_log(response); 
							}
						});
						return;
					} else {
						el.innerHTML = "<p style='text-align:center;font-weight:bold'>Yazı <a href='http://www.duzceyerelhaber.com/kose-yazarlari.asp'>DuzceYerelHaber.com</a>'da \"" + baslik + "\" yazısı BULUNAMADI !</p>";
						return;
					}
				},
				onerror: function(response) {
					alert('DUZCEYERELHABERDEN YUKLENIRKEN HATA OLUSTU!'); //GM_log(response); 
				}
			});
/*			//console.log(response);
		},
		onerror: function(response) {
			alert('DUZCEYERELHABERDEN YUKLENIRKEN HATA OLUSTU!'); //GM_log(response); 
		}
	});*/
}
