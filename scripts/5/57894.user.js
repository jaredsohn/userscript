// ==UserScript==
// @name           Trukz Türkçe
// @namespace      Trukz
// @description    Trukz Translate For Turkish / Trukz oyunu Türkçeleştirme
// @include        http://www.trukz.com/*
// @copyright      serkanay
// @version        1.0.2
// @license        Freeware
// ==/UserScript==

var words = {
///////////////////////////////////////////////////////
// Syntax: 'Search word' : 'Replace word',
'Trukz - A Trucking Simulation Game' : 'Trukz Kamyon Simulasyonu - Türkçe',
'My Menu' : 'Menüm',
'Home' : 'Ana Sayfa',
'About Trukz' : 'Hakkında',
'Forums' : 'Forum ',
'My Inbox' : 'Gelen Kutusu',
'Sent Messages' : 'Gönderilen Mesajlar',
'Logout' : 'Çıkış',
'Driver Menu' : 'Sürücü Menü',
'Donate (for in-game cash)' : 'Bağış Yap (Oyun Parası Satın Al)',
'Select A Route' : 'Sefer Seç',
'Route Dashboard' : 'Rota Kontrol Paneli',
'My Driver' : 'Sürücü Detayı',
'Driver Achievements' : 'Sürücü Ödülleri',
'Purchase Items' : 'Parça Dükkanı',
'CB Radio' : 'Telsiz',
'Edit Sürücü Detayı' : 'Sürücü Ayarları',
'View My Company' : 'Şirketimi Göster',
'Company Achievements' : 'Şirket Ödülleri',
'Company Contracts' : 'Şirket Kontratları',
'My Company Paychecks' : 'Çekler',
'Banking' : 'Bankacılık',
'Newspaper' : 'Gazete',
'Saved Drivers' : 'Arkadaşlarım',
'View All Drivers' : 'Tüm Sürücüleri Göster',
'View All Companies' : 'Tüm Şirketleri Göster',
'Game Statistics' : 'Oyun Bilgileri',
'Get Trukz Toolbar' : 'Toolbar indir',
'Search ' : 'Arama',
'Everything' : 'Herşey',
'City Name' : 'Şehir Adi',
'Company' : 'Şirket',
'Driver Name' : 'Sürücü Adı',
'Continent' : 'Kıta',
' For: ' : ' içinde',
'Page Top' : 'Yukarı Git',
'Terms' : 'Şartlar',
'Privacy' : 'Gizlilik',
'Support' : 'Destek',
'Report a bug' : 'Hata Bildir',
'Beta 1.0' : 'Türkçe Trukz Beta 1.0.1',
'current visitors.' : 'Ziyaretci.',
'Thank you for logging in ' : 'Türkce Trukz-a Hosgeldin ',
'Enter MPH:' : 'Hızını Gir MPH',
'Route Information' : 'Sefer Bilgileri',
'Speed Limit' : 'Hız Limiti',
'Top Truck Speed:' : 'Kamyonun Max. Hızı',
'Top Weather Speed:' : 'Hava Şartlarinda En Yüksek Hız',
'Truck Condition:' : 'Kamyonun Durumu ',
'Game Time:' : 'Oyun Saati:',
'Miles Per Gallon:' : 'Yakıt Tüketimi (Galon başına Mil)',
'Cargo Type:' : 'Kargo Tipi',
'Cargo Weight:' : 'Kargo Kapasitesi',
'Current Temperature:' : 'Sıcaklık:',
'Current Weather:' : 'Hava Durumu:',
'Origin City:' : 'Kalkiş Şehri',
'Destination:' : 'Varış Şehri',
'Departed Date:' : 'Sefer Başlangıç Tarihi',
'Expected Arrival:' : 'Sefer Son Bitiş Tarihi',
'You are feeling:' : 'Sürücü Durumu',
'Fatigue Points:' : 'Yorgunluk Puani',
'Fuel Costs:' : 'Mazot Ücreti',
'Fuel Level:' : 'Yakıt Depo Durumu',
'Estimated Trip Legs:' : 'Tahmini Yol Süresi',
'Route Legs Taken:' : 'Katedilen Yol',
'Route Distance:' : 'Sefer Uzunluğu',
'Route Odometer:' : 'Katedilen Mesafe',
'Miles To Go:' : 'Kalan Mesafe',
'Cash on hand:' : 'Para Durumu',
'Ticket Fines:' : 'Trafik Cezaları',
'Collect on time:' : 'Kazanılacak Para',
'Late penalty:' : 'Gecikme Cezası',
' Daily' : ' Günlük',
'Last Activity:' : 'Son Hareket',
'Driver Display' : 'Sürücüyü Göster',
'General Announcements' : 'Genel Duyurular',
'View Routes' : 'Rotayı Göster',
'View Tickets' : 'Trafik Cezalarını Göster',
'Achievements' : 'Başarılarım',
'Driver Information' : 'Sürücü Bilgileri',
'Driver ID:' : 'Sürücü Adı:',
'Created:' : 'Oyuna Başlama Tarihi:',
'Joined Sirket:' : 'Şirkete Katılma Tarihi:',
'Member Title:' : 'Görevi:',
'Member Wage:' : 'Ücreti:',
'Last Donation' : 'Son Bağış',
'Rating' : 'Sıralama Puanı:',
'Driver Rank:' : 'Sürücü Sıralaması:',
'Efficiency' : 'Performans Puanı:',
'Current City:' : 'Bulundugu Şehir:',
'Fatigue Points' : 'Yorgunluk Puanı:',
'Money:' : 'Para:',
'Driver Odometer:' : 'Yaptığı Toplam Yol:',
'Tons Hauled:' : 'Taşıdığı Toplam Yük',
'Gameplay Style' : 'Oyun Stili:',
'Driver Items:' : 'Kullandığı Parçalar:',
'CB Channel:' : 'Telsiz Kanalı:',
'Truck Details' : 'Kamyon Bilgileri',
'Truck Image:' : 'Kamyon Resmi',
'Date Purchased:' : 'Satın Alındığı Tarih',
'Year:' : 'Model:',
'Make:' : 'Marka:',
'Purchase Cost:' : 'Fiyatı:',
'Current Value:' : 'Su Anki Fiyatı:',
'Odometer:' : 'Yaptığı Mil:',
'Legal Load Limit:' : 'Yasal Yükleme Kapasitesi:',
'Truck Load Limit:' : 'Kamyonun Yükleme Kapasitesi',
'Top Speed:' : 'Max. Hızı:',
'Miles Per Gallon:' : 'Yakıt Tüketimi:',
'Fuel Capacity:' : 'Depo Kapasitesi',
'Current Fuel:' : 'Şu Anki Depo Durumu:',
'Refuel Option:' : 'Depoyu Doldurma Seçeneği:',
'Recent 30 Day Routes' : 'Son 30 Gün İçindeki Seferler',
'Number of Routes:' : 'Sefer Sayısı',
'30 Day Route Earnings:' : 'Aylık Ortalama Kazanç:',
'Average Route Earnings:' : 'Ortalama Sefer Basşıa Kazanç:',
'Driver 30 Day Route History' : 'Son 30 Gün İçindeki Sefer Listesi',
'Dates' : 'Tarihler',
'Cities' : 'Şehirler',
'Cargo' : 'Yük',
'Driver 90 Day Ticket Information' : '90 Gün İçindeki Trafik Cezaları',
'Number of Tickets:' : 'Trafik Cezası Sayısı:',
'Driver 90 Day Ticket History' : '90 Günlük Trafik Cezası Listesi',
'What are Basarilarim?' : 'Başarılarım Nedir?',
'Basarilarim status' : 'Başarılarım',
'Recent Basarilarim' : 'En Son Başarılarım',
'More...' : 'Genişlet...',
'...Less' : '...Daralt',
'GPS Navigation' : 'GPS Navigasyon',
'Radar Detector' : 'Radar Dedektörü',
'Tool Box' : 'Alet Cantasi',
'New Air Filter' : 'Yeni Hava Filtresi',
'New Fuel Filter' : 'Yeni Yakıt Filtresi',
'New Fuel Injectors' : 'Yeni Yakıt Enjektörü',
'Warning Lights' : 'Uyarı Lambaları',
'Tire Chains' : 'Lastik Zincirleri',
'Fog Lights' : 'Sis Farları',
'New Tires' : 'Yeni Lastikler',
'Aluminum Wheels' : 'Aluminyum Jantlar',
'Extra Fuel Tank' : 'Extra Yakıt Deposu',
'Appliances' : 'Appliances*',
'Automobiles' : 'Otomobil',
'Beer' : 'Bira-Yeni Rakı',
'Books' : 'Kitap',
'Cardboard' : 'Karton',
'Clothing' : 'Giyim',
'Construction Equipment' : 'İnşaat Malzemesi',
'Cotton' : 'Pamuk',
'Electronics' : 'Elektronik',
'Fruit' : 'Meyve',
'Furniture' : 'Mobilya',
'Yük Type' : 'Yük Tipi',
'Supply' : 'Tedarik',
'Demand' : 'Talep',
'Late Fees' : 'Gecikme Cezası',
'Gasoline' : 'Benzin',
'Gems' : 'Mücevher',
'General Merchandise' : 'General Merchandise*',
'Glass' : 'Cam',
'Grain' : 'Tahıl',
'Groceries' : 'Bakkaliye',
'Hazardous Waste' : 'Tehlikeli Atık',
'Iron Ore' : 'Demir Cevheri',
'Livestock' : 'Hayvancılık',
'Lumber' : 'Kereste',
'Mail' : 'Posta',
'Medical Supplies' : 'Tıbbi Malzeme',
'Milk' : 'Süt',
'Mobile Ana Sayfas' : 'Taşınabilir Ev',
'Nuclear Waste' : 'Nükleer Atık',
'Oil' : 'Yag',
'Paper' : 'Kağıt',
'Plastic' : 'Plastik',
'Rock' : 'Kaya',
'Sea Food' : 'Deniz Mahsülleri',
'Steel' : 'Celik',
'Timber' : 'Timber*',
'Tires' : 'Lastik',
'Vegetables' : 'Sebze',
'Currently talking on CB Channel' : 'Su an kullandığınız Telsiz Kanalı:',
'Click the CB Icon to change your CB Channel. ' : 'Hoparlöre tıklayarak kanal değiştirebilirsiniz.',
'New Message:' : 'Mesaj yaz:',
'Exhausted!' : 'Tükenmiş!',
'Having trouble with the map? Select your destination in the drop down below.' : 'Aşağıdan gitmek istediğiniz şehri seçiniz.',
'Select Destination City:' : 'Gidilecek şehri seçin:',
'Select A City' : 'Bir şehir Seç',
'Australia' : 'Avusturalya',
'Europe' : 'Avrupa',
'North America' : 'Amerika',
'Configure Route to' : 'Rota Düzenleyici:',
'Select Yük:' : 'Yük Seç:',
'Enter Yük Weight:' : 'Taşınacak Tonajı Gir:',
'Route Details' : 'Rota Detayları',
'Fatigue Points:' : 'Yorgunluk Puanı:',
'Trip Distance:' : 'Mesafe:',
'Siralama Puani: Increase:' : 'Sıralama Puanı Artışı:',
'Expected Arrival:' : 'Son Teslimat Tarihi:',
'Origin City Supplies:' : 'Kalkış Şehrindeki Mallar:',
'Origin City Temperature:' : 'Kalkış Şehrindeki Sıcaklık:',
'Origin City Precipitation:' : 'Kalkış şehrindeki Yağış İhtimali',
'Destination City:' : 'Varış şehri:',
'Destination City Taleps:' : 'Varış Şehrindeki Talep Edilen Mallar:',
'Destination City Temperature:' : 'Varış Şehrindeki Sıcaklık',
'Destination City Precipitation:' : 'Varış şehrindeki Yağış İhtimali',
'Destination Terminal Bonus:' : 'Varış Şehrindeki Ambar Bonusu:',
'Tired' : 'Yorgun',
'Clear and Calm' : 'Açık ve Rüzgarsız',
'Fatigued' : 'Aşırı Yorgun',
'Clear with Moderate Headwind' : 'Açık, Orta Şiddette Rüzgarlı',
'Miles' : 'Mil',
'tons' : 'ton',
'You successfully drove' : '',
'with no issues' : 'kazasız, belasız geldin.',
'on your last leg.' : '',
'Change Password:' : 'Şifre değiştir:',
'Old Password' : 'Eski Şifre',
'New Password' : 'Yeni Şifre',
'Confirm Yeni Şifre' : 'Yeni şifre tekrar',
'Change my ePosta address' : 'email adresimi değiştir',
'Nick Name:' : 'Takma Ad:',
'Driver BIO:' : 'Sürücü BIO:',
'Ana Sayfatown City' : 'Memleket',
'Channel' : 'Kanal',
'Dashboard Display Option:' : 'Kontrol Paneli Gösterim Seçeneği:',
'Clock Type:' : 'Saat Tipi:',
'E-Posta Address:' : 'Email Adresi:',
'- You are currently in-route and cannot change your Memleket.' : 'Şu an yoldasın ve Memleket değiştiremezsin.',
'Manage Your Driver Profile' : 'Sürücü Ayarlarını Değiştir',
'- Currently in route.' : '- Şu an yoldasın.',
'Main Display' : 'Şirket Ana Sayfa',
'Forum URL:' : 'Şirket Forumu',
'Preferred' : 'Terci Edilen',
'Collection Percentage:' : 'Komisyon',
'Repair Assistance:' : 'Tamirat Yardımı',
'Fuel Assistance:' : 'Mazot Yardımı',
'Ticket Assistance:' : 'Trafik Cezası Yardımı',
'Members:' : 'Üyeler:',
'Total' : 'Toplam',
'Active' : 'Aktif',
'Terminals:' : 'Terminaller:',
'Contracts Completed:' : 'Tamamlanan Kontatlar:',
'Şirket Items' : 'Şirket Destekleri',
'Truck Purchase Discount' : 'Kamyon Satınalma İskontosu',
'Fuel Purchase Discount' : 'Mazot İskontosu',
'Full Member Views' : 'Tüm Üyeleri Göster',
'Activity' : 'Aktif Olduğu Tarih',
'Title' : 'Görevi',
'Collect' : 'Collect*',
'Repair' : 'Tamirat',
'Fuel' : 'Mazot',
'Ticket' : 'Ceza',
'Wage' : 'Maaş',
'Vice President ' : 'Başkan Yardımcısı',
'Communications Manager ' : 'Halkla İlişkiler Müdürü',
'Contract Manager' : 'Kontrat Danışmanı',
'HR Manager' : 'İnsan Kaynakları Müdürü',
'Terminals' : 'Ambarlar',
'Ledger' : 'Şirket Kasası',
'Şirket Şirket Kasası Summary' : 'Kasa Defteri',
'Day' : 'Gün',
'Income' : 'Gelir',
'Expenses' : 'Giderler',
'Bulletin' : 'Şirket Bülteni',
' to ' : '-',
'News Date' : 'Haber Tarihi',
'Details' : 'Ayrıntı',
'Page:' : 'Sayfa:',
'Pages)' : 'Sayfa)',
'Jump-Sayfa' : 'Sayfaya Git',
'Creation' : 'Kayıt Tarihi',
'Date' : '',
'Last' : 'Son',
'Actions' : 'Eylemler',
'All Drivers Display' : 'Tüm Sürücüler',
'Serving' : 'Göster',
'Drivers' : 'Sürücü',
'Created' : 'Kayıt Oldu',
'Money' : 'Para',
'None' : 'Yok',
'All Companies Display' : 'Tüm Şirketler',
'Companies' : 'Şirketler',
'Name' : 'Adı',
'Main Oyun Bilgileri Screen' : 'Oyun Bilgileri',
'Yük Statistics' : 'Taşınacak Yük Bilgileri',
'City Statistics' : 'Şehir Bilgileri',
'City Distance Calculator' : 'Şehirlerarası Mesafe Hesaplayıcı',
'Flight Cost Calculator' : 'Uçak Ücreti Hesaplayıcı',
'Game Map' : 'Oyun Haritası',
'Truck Lot' : 'Kamyon Bilgileri',
'Top Rated Sürücü' : 'En İyi Sürücüler Listesi',
'Most Mil Logged' : 'En Çok Yol Yapmış Sürücüler Listesi',
'Most ton Hauled' : 'En Çok Yük taşıyon Sürücler Listesi',
'Most Para' : 'En Zengin Sürücüler Listesi',
'Game Demographics' : 'Demografi',
'Item Purchase Stats' : 'Parça Satınalma İstatistikleri',
'Game Up Log' : 'Oyun Update Bilgileri',
'New Player Guide' : 'Başlangıç Rehberi (İngilizce)',
'Trukz Link Offer' : 'Trukz Link Paylaşımı',
'Gallons' : 'Galon',
'Switch Telsiz Kanalı:' : 'Telsiz Kanalını Seç:',
'Donation Offer' : 'Bağış Yap',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',
'' : '',

///////////////////////////////////////////////////////
'':''};

//////////////////////////////////////////////////////////////////////////////
// This is where the real code is
// Don't edit below this
//////////////////////////////////////////////////////////////////////////////

// prepareRegex by JoeSimmons
// Used to take a string and ready it for use in new RegExp()
String.prototype.prepareRegex = function() {
return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};

function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}

var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
regexs.push(new RegExp(word.prepareRegex().replace(/\*/g,'[^ ]*'), 'gi'));
replacements.push(words[word]);
}

var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
	for(var x=0; x<regexs.length; x++) text = text.replace(regexs[x], replacements[x]);
	this_text.textContent = text;
	}
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//
//Google Reklam kaldır.

(function() {

	// First we get rid of Google Toolbar Ad..

    var searchTable = document.evaluate("//a[contains(@href,'http://toolbar.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// ..and now from Google Desktop Search Ad
	
	var searchTable = document.evaluate("//a[contains(@href,'http://desktop.google.com/')]/ancestor::table", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);


    if (searchTable.snapshotLength > 0)
    {
        var innerTable = searchTable.snapshotItem(searchTable.snapshotLength - 1);


        innerTable.parentNode.removeChild(innerTable);}
	
	// Finally we remove the infamous Google AdSense Ads
	
	var RemoveGoogleAds =
    {
        checkPage: function()
        {
            currentDoc = document;

            try {
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(/google_ads_frame/i))
                {
                    this.injectCSS("iframe[name='google_ads_frame'] { display: none; }");
                }
                if (currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead))
                {
                    currentDoc.getElementsByTagName("body")[0].innerHTML.match(pagead).style.display='none'
                    // this.injectCSS("script[src='http://pagead2.googlesyndication.com/pagead/show_ads.js'] { display: none; }");
                }
            }
            catch(e) {}
        },


        injectCSS: function(css)
        {
            head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.setAttribute("type", 'text/css');
            style.innerHTML = css;
            head.appendChild(style);
        }
    }

    RemoveGoogleAds.checkPage();

})();

//
//
//
//
//
//
//

