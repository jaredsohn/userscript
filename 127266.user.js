// ==UserScript==
// @name           e-Sim Turkce Ceviri
// @namespace      http://userscripts.org/users/438669/scripts
// @author         HMK
// @include        http://e-sim.org/*
// @version	   1.06
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// 	           HMK
// ==/UserScript==

var strings = {
// translations
	
	"My places" : "Yerlerim",
	"Work" : "Is",
	"Train" : "Antreman",
	"Companies" : "Sirketler",
	"Newspaper" : "Gazete",
	"Party" : "Parti",
	"Contracts" : "Sözlesmeler",
	"Invite friends" : "Arkadaslarini davet et",
	"Military unit" : "Askeri birlik",
	"Premium account" : "Premium hesap",
	
	"Market" : "Market",
	"Product market" : "Urun pazari",
	"Job market" : " Is pazari",
	"Monetary market" : "Para piyasasi",
	"Companies for sale" : "Satilik sirketler",
	
	"Statistics" : "Istatistikler",
	"Country statistics" : "Ulke istatistikleri",
	"Party statistics" : "Parti istatistikleri",
	"Newspaper statistics" : "Gazete istatistikleri",
	"Citizen statistics" : "Vatandas istatistikleri",
	"Military unit stats" : "Askeri birlik istatistik",
	"Donations" : "Bagislar",
	
	"News" : "Haberler",
	"Top articles" : "En iyi makaleler",
	"Latest articles" : "Son cikan makaleler",
	"Military events" : "Askeri olaylar",
	"Political events" : "Politik olaylar",
	
	"Country" : "Ulke",
	"Battles" : "Savaslar",
	"War and politics" : "Savas ve politika",
	"Economy" : "Ekonomi",
	"Laws" : "Yasalar",
	"Party elections" : "Parti secimleri",
	"Congress elections" : "Milletvekili secimleri",
	"Presidential elections" : "Baskanlik secimleri",
	"Citizenship" : "Vatandaslik",
	"Map" : "Harita",
	
	"Rank:" : "Rutbe:",
	"Next rank:" : "Sonraki rutbe: ",
	"Eat food" : "Ekmek kullan",
	"Use gifts" : "Hediye kullan",
	"Travel" : "Tasin",
	"change" : "degistir",
	"Your money" : "Paran",
	"Your inventory" : "Envanterin",
	"Your messages" : "Mesajlarin",
	
	
	"Birthday:" : "Dogun tarihi: ",
	"Write a new shout:" : "Ulkeye seslen:",
	"Shout!" : "Seslen",
	"Send to channels:" : ",Su kanallara gonder:",
	
	"Your today's tasks:" : "Gunluk gorevlerin",
	
	// Work
	
	"Employer" : "Isveren",
	"Leave job" : "Isten Ayril",
	"Salary:" : "Maas:",
	"Today work results" : "Bugun ki calisma sonuclari",
	"Your Gross salary" : "Brut Maasin",
	"Your Net salary" : "Net Maasin",
	"Income tax paid" : "Vergi icin kesilen",
	"Worked at" : "Calistigin yer",
	"XP gained" : "Kazandigin XP",
	"Economy skill gained" : "Kazandigin ekonomik yetenek",
	"Working days in a row" : "Ara vermeden calistigin gun sayisi",
	"Your base productivity" : "Temel uretimin",
	"Productivity modifiers" : "Uretim bonusu",
	"Total productivity" : "Toplam uretilen urun",
	"Units produced" : "Adet uretildi",
	"You have not worket today" : "Bugun calismadin",
	
	"+20% Raw company quality " : "+20% Sirket seviyesi",
	"+40% Raw company quality " : "+40% Sirket seviyesi",
	"+60% Raw company quality " : "+60% Sirket seviyesi",
	"+80% Raw company quality " : "+80% Sirket seviyesi",
	
	// Train
	
	"You have already trained today. Please come back tomorrow." : "Bugun zaten calistin. Lutfen yarin gel.",
	"Strength gained:" : "Guc kazandin:",
	"Military details" : "Askeri detaylar",
	"Total training sessions:" : "Toplam antreman gunu:",
	"Military rank:" : "Askeri rutbe:",
	"Total damage done:" : "Toplam yapilan hasar:",
	"Damage with no weapon:" : "Silahsiz hasar:",
	"Damage with Q1 weapon:" : "Q1 silah hasari:",
	"Damage with Q2 weapon:" : "Q2 silah hasari:",
	"Damage with Q3 weapon:" : "Q3 silah hasari:",
	"Damage with Q4 weapon:" : "Q4 silah hasari:",
	"Damage with Q5 weapon:" : "Q5 silah hasari:",
	
	// Sirket
	
	"Company" : "Sirket",
	"Product" : "Urun",
	"Location" : "Bolge",
	"Employees" : "Isciler",
	"Create new company:" : "Yeni sirket ac:",
	"Company name:" : "Sirket ismi:",
	"Product type:" : "Urun tipi",
	"Company avatar:" : "Sirket resmi:",
	
	//Urun Marketi
	"Marketplace" : "Market",
	"Show Offers:" : "Teklifleri goster:",
	"Show my offers/post new offer" : "Benim tekliflerimi goster/Yeni teklif oner",
	"Seller" : "Satici",
	"Stock" : "Stok",
	"Price" : "Fiyat",
	"Buy" : "Satin al",
	
	// MM
	
	"Buy currency:" : "Al:",
	"Sell currency:" : "Sat:",
	"Exchange rate:" : "Degisim orani:",
	"Ratio" : "Oran",
	"Amount" : "Miktar",
	"Delete" : "Sil",
	"No offers" : "Teklif yok",
	"Current offers" : "Teklifler",
	"Your offers" : "Teklifin",
	"Post your Offer:" : "Teklif sun:",
	"Monetary Market" : "Para Piyasasi",
	
	// Job Market
	
	"Minimal skill" : "Asgari yetenek",
	"Apply" : "Basvur",
	"Salary" : "Maas",
	"Selection criteria:" : "Kriterleri belirle:",
	"Job Market" : "Is Pazari",
	
	// Alert
	
	"Other alert" : "Diger bildirimler",
	"Donation" : "Bagis",
	"Congress alert" : "Milletvekili bildirimi", 
	"Citizen progress alert" : "Vatandas ilerleme bildirimi",
	"Election alert" : "Secim bildirimi",
	"Medal alert" : "Madalya bildirimi",
	"Donation reason:" : "Bagis sebebi:",
	"Tutorial" : "Egitim",
	
	
	"Congratulations! You have reached level 3." : "Tebrikler! 3 levele ulastin.",
	"Congratulations! You have reached level 4." : "Tebrikler! 4 levele ulastin.",
	"Congratulations! You have reached level 5." : "Tebrikler! 5 levele ulastin.",
	"Congratulations! You have reached level 6." : "Tebrikler! 6 levele ulastin.",
	"Congratulations! You have reached level 7." : "Tebrikler! 7 levele ulastin.",	
	"Congratulations! You have reached level 8." : "Tebrikler! 8 levele ulastin.",
	"Congratulations! You have reached level 9." : "Tebrikler! 9 levele ulastin.",
	"Congratulations! You have reached level 10." : "Tebrikler! 10 levele ulastin.",
	"Congratulations! You have reached level 11." : "Tebrikler! 11 levele ulastin.",
	"Congratulations! You have reached level 12." : "Tebrikler! 12 levele ulastin.",
	"Congratulations! You have reached level 13." : "Tebrikler! 13 levele ulastin.",
	"Congratulations! You have reached level 14." : "Tebrikler! 14 levele ulastin.",
	"Congratulations! You have reached level 15." : "Tebrikler! 15 levele ulastin.",
	"Congratulations! You have reached level 16." : "Tebrikler! 16 levele ulastin.",
	"Congratulations! You have reached level 17." : "Tebrikler! 17 levele ulastin.",
	"Congratulations! You have reached level 18." : "Tebrikler! 18 levele ulastin.",
	"Congratulations! You have reached level 19." : "Tebrikler! 19 levele ulastin.",
	"Congratulations! You have reached level 20." : "Tebrikler! 20 levele ulastin.",
	"Congratulations! You have reached level 21." : "Tebrikler! 21 levele ulastin.",
	"Congratulations! You have reached level 22." : "Tebrikler! 22 levele ulastin.",
	"Congratulations! You have reached level 23." : "Tebrikler! 23 levele ulastin.",
	"Congratulations! You have reached level 24." : "Tebrikler! 24 levele ulastin.",
	"Congratulations! You have reached level 25." : "Tebrikler! 25 levele ulastin.",
	
	"Congratulations! You have reached level 6. You have been awarded with 5 Gold" : 
	"Tebrikler! 6 levele ulastin. Odul olarak 5 gold kazandin.",
	"Congratulations! You have reached level 7. You have been awarded with 5 Gold" : 
	"Tebrikler! 7 levele ulastin. Odul olarak 5 gold kazandin.",
	
	"7 days ago" : "7 gun once",
	 
	 "Friends" : "Arkadaslar",
	 
	 //Mesajlar
	 
	 "Author" : "Yazan",
	 "Message" : "Mesaj",
	 "Date" : "Tarih",
	 "Remove" : "Kaldir",
	 
	 "Sent messages" : "Gonderilen mesajlar",
	 "Compose message" : "Mesaj gonder",
	 "Inbox messages" : "Gelen mesajlar",
	 "Compose Message" : "Mesaj gonder",
	 
	 "New message" : "Yeni mesaj",
	 "Receiver:" : "Alici:",
	 "Title:" : "Baslik:",
	 "Message:" : "Mesaj:",
	 "Reply" : "Cevapla",
	 "Previous messages" : "Onceki mesajlar",
	 "Quick reply" : "Hizli cevapla",
	 "Report" : "Rapor et",
	 
	 // savas
	 
	 "Resistance war" : "Isyan savasi",
	 "Defenders\' total damage:" : "Savunanin verdigi hasar:",
	 "Attackers\' total damage:" : "Saldiranin verdigi hasar:",
	 "Your military unit orders:" : "Askeri birliginin emirleri:",
};

	
trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};




matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
//	GM_log("check '"+key+"'");
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
//		GM_log("match "+reg+" -> "+ rrrr+ " : "+result);
		if (key.match(rrrr)!==null) {
//			GM_log("match "+reg+" in "+key);
			return key.replace(rrrr,regexps[reg]);
		}
	}
	return undefined;
};

translate = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return undefined;
};

translateWithRegexp = function(key) {
	if (strings[key]!==undefined) {
	    return strings[key];
	} else {
	    var key2 = trim(key);
	    if (strings[key2]!==undefined) {
		return strings[key2];
	    }
	}
	return matchRegexps(key);
};


var allTrans = {
    "span":"" , "label":"", "input":"", "form":"", "body":"", "b":"", "a":"", "h1":"", "h2":"", "h3":"", "h4":"", "h5":"", "h6":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};




translateWholePage = function(e) {
  
  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if (node.childNodes.length==1) {
        var translation = translateWithRegexp(node.innerHTML);
//		GM_log("node : "+node.innerHTML + " -> "+translation);
        if (translation!==undefined) {
          node.innerHTML = translation;
        }
      } else {
        if (node.childNodes.length<=3) {
          for (var i=0;i<node.childNodes.length;i++) {
            if (node.childNodes[i].nodeName=="#text") {
//GM_log("node "+i+" : "+node.nodeName+" value: "+node.childNodes[i].nodeValue);
              translation = translateWithRegexp(node.childNodes[i].nodeValue);
              if (translation!==undefined) {
                node.childNodes[i].nodeValue = translation;
              }
            }
          }
        }
      }
    }
  }
}
//	document.querySelector('meta[http-equiv="Content-Type"]').setAttribute('content', 'text/html; charset=iso-8859-9');
	
	
	
	$(document).ready(function(){
	// İşlemler buraya
		
	//$('head').append('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-9"/>');

//	$('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-9"/>').appendTo('head');
	
		// Reklamları Kaldırmak icin
	$("#aswift_0_anchor").remove();
	$("#aswift_1_anchor").remove();
	$(".embedFooter").remove();	
		// Savas Ekranına Uyarı
	savasEkraniUyari();
	
		// Duyuru
	$('<div id = "duyuru" style = "position: absolute; top:-20px; left: 300px;"><iframe src="http://pastebin.com/embed_iframe.php?i=uMt5SvvL" style="border:none;width:480px; height:128px;"></iframe></div>').insertAfter('tr#headerRow');;
	
	
		// Yararlı Makaleler ve Chat Sayfası icin
	$('<div id = "duyuru"> <a style= "color: rgb(55, 135, 234); font-size: 15px;" target = _blank href="http://e-sim.org/article.html?id=18553"> Yararli Makaleler</a> <br> <a style= "color:  rgb(55, 135, 234); font-size: 15px;" target = _blank href="http://cbe005.chat.mibbit.com/?server=rizon.mibbit.org&channel=%23esim.tr" target = _blank >Chat kanalina girmek icin tiklayin</a></div>').insertAfter('div#topArticles.newsTab');
	});
	
	// Savas Ekranına Uyarı
	function savasEkraniUyari(){
	var link = document.URL;
	var savasLinki = link.indexOf('/battle.html');
	
	if(savasLinki > 0){
		$('<div style = "color:red;font-size: 13px;" >Hangi Tarafta Vurdugunuza Dikkat Edin</div>').insertAfter('#weaponQuality');
		
	}
	}
	
	
	
		

window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  setTimeout(5, translateWholePage)
}, false);