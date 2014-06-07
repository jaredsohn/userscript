// ==UserScript==
// @name           eRepublik Türkçe
// @namespace      http://www.erepublik.com/en/citizen/profile/1278224
// @description    eRepublik isimli oyunun Türkceleştirme scripti / Turkish translation for eRepublik
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
	"6-30 characters max" : "Azami 6-30 karakter",
	"A newspaper is an efficient way to communicate your news to the Erepublik world. Read more on the Erepublik wiki. Create your own newspaper." : "Haberlerinizi Erepublik dünyasına iletmenin en etkili yolu gazetedir. Daha fazlasını Erepublik wiki'den okuyun. Kendi gazetenizi kurun.",
	"ACCEPTED" : "KABUL EDİLDİ",
	"Select All" : "Tümünü Seç",
	"President election day" : "Başkanlık Seçim Günü",
	"Former party member" : "Eski Parti Üyesi",
	"Status:" : "Durum: ",
	"Create a party" : "Parti Kur",
	"Party founder" : "Parti Kurucusu",
	"Party president" : "Parti Başkanı",
	"candidate" : "Aday",
	"Create a newspaper" : "Gazete Kur",
	"Minimum 1 day of work" : "En Az Bir Gün Çalış",
	"Minimum 1 fight" : "En Az 1 Kavga Yap",
	"Become a soldier" : "Asker Ol",
	"Voter" : "Seçmen",
	"Media mogul" : "Medya Adamı",
	"Create a company" : "Şirket Kur",
	"builder" : "Yapıcı",
	"hero" : "Kahraman",
	"soldier" : "Asker",
	"Ranked" : "Rütbeli",
	"leader" : "Lider",
	"Resistance" : "İsyan",
	"Battle hero" : "Savaş Kahramanı",
	"Super soldier" : "Süper Asker",
	"Soldier" : "Asker",
	"Experience level:" : "Tecrübe Seviyesi:",
	"Find a job" : "İş Ara",
	"Recruit" : "Er",
	"Requirements:" : "Gereksinimler:",
	"Hard worker" : "Hamarat İşçi",
	"manager" : "Müdür",
	"Unlock Features" : "Geleceği Aç",
	"Continue" : "Devam Et",
	"Vote" : "Oy Ver",
	"% of votes" : "Oy Oranı(%)",
	"No. of votes" : "Oy Sayısı",
	"Back" : "Geri",
	"BACK" : "GERİ",
	"CONTINUE" : "DEVAM ET",
	" Citizen permanently suspended for properties obtained through an illegal or unjust method. " : "Bu vatandaş kalıcı bir suç işledi ve ASILDI!",
	"North Korea" : "Kuzey Kore",
	"All countries" : "Tüm Ülkeler",
	"Latest events" : "Güncel Olaylar",
	"Latest news" : "Güncel Haberler",
	"Top rated news" : "En Popüler Haberler",
	"Yesterday" : "Dün",
	"Today" : "Bugün",
	"Minimum country wage :" : "Asgari Ücret :",
	"Last presence" : "Son Çalışma",
	"Skill" : "Beceri",
	"You are now an employee of this company" : "Şimdi Bu Şirkette Çalışıyorsun!",
	"( Average Experience )" : "( Ortalama Tecrübe )",
	"No. of newspapers" : "Gazete Sayısı",
	"No. of companies" : "Şirket Sayısı",
	"Imports" : "İthalat",
	"Exports" : "İhracat",
	"Unemployment rate" : "İşsizlik Oranı",
	"Population number" : "Nüfus Sayısı",
	"You are not a president or a congress member in this country." : "Bu ülkede millet vekili veya ülke başkanı değilsiniz.",
	"Show all law proposals" : "Tüm Kanun Taslaklarını Göster",
	"Only congress members and country presidents have the right to vote." : "Sadece millet vekilleri ve ülke başkanı oy verebilir.",
	"Monthly exports" : "Aylık İhracat",
	"Monthly imports" : "Aylık İthalat",
	"Inflation" : "Enflasyon",
	"VAT" : "KDV",
	"Approved by" : "Onaylayan",
	"Approved on" : "Onaylanan Tarih",
	"Approved" : "Onaylananlar",
	"Apply for citizenship" : "Vatandaşlık için başvur",
	"You don't have any citizenship request for this country. Do you wish to apply for citizenship?" : "Senin bu milletten vatandaşlık isteğin yok. Başvurmak ister misin?",
	"My citizenship request" : "Vatandaşlık İsteklerim",
	"Details" : "Detaylar",
	"Citizen" : "Vatandaş",
	"view requests" : "İsteklere Bak",
	"Citizen fee" : "Asgari Ücret",
	"Citizenship requests" : "Vatandaşlık İstekleri",
	"Presidential candidates" : "Başkan Adayları",
	"Supporting parties" : "Destekleyen Partiler",
	"Unsubscribe" : "Aboneliği Bitir",
	"show example" : "ÖRNEK",
	"Turn OFF" : "KAPALI",
	"Turn ON" : "AÇIK",
	"Weekly news" : "Haftalık Haberler",
	"Older" : "Eskiler",
	"Newer" : "Yeniler",
	"Select all" : "Tümünü Seç",
	"After 5 days the alerts are automatically deleted" : "Uyarılar 5 gün sonra otomatik silinir.",
	"Party elections" : "Parti Seçimleri",
	"Congressional elections" : "Meclis Seçimleri",
	"Presidential elections" : "Başkanlık Seçimleri",
	"Weak fight, Private!" : "Gelişmen Lazım",
	"Weak fight, Corporal!" : "Biraz Daha...",
	"Colonel" : "Albay",
	"Captain" : "Yarbay",
	"Lieutenant" : "Binbaşı",
	"Corporal" : "Üsteğmen",
	"You have not worked today." : "Bugün Çalışmadın.",
	"Invite 10 people to eRepublik and help them reach level 6" : "10 kişiyi eRepublik'e davet et ve seviye 6'ya ulaşmalarına yardım et",
	"Advance 5 strength levels" : "5 Dayanıklılık Seviyesi İlerle",
	"Reach the highest total damage in one battle" : "Bir Savaşta En Yüksek Toplam Hasara Ulaş",
	"Work for 30 days in a row" : "30 Gün Kesintisiz Çalış",
	"Get Wellness" : "Sağlık Al",
	"Skills" : "Beceriler",
	" You have not created any organization yet. " : "Henüz Hiç Organizasyon Oluşturmadın.",
	"Organizations created by you:" : "Oluşturduğun Organizasyonlar",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Vatandaşlık Hesabından Çıkıp Organizasyon Kullanıcı Adı ve Şifresi ile Organizasyon Hesabına Girmeniz Lazım!",
	"Logout" : "Çıkış",
	"My Organizations" : "Organizasyonlarım",
	"Register" : "Kaydol",
	"Complete the challenge:" : "Boşluğu Doldurunuz:",
	"only JPG files allowed" : "Sadece JPG Dosyaları İçindir!",
	"Organization logo" : "Organizasyon Logosu",
	"eRepublik region" : "eRepublik Bölgesi",
	"Retype password" : "Şifreyi Tekrarla",
	"Password" : "Şifre",
	"Your email address:" : "e-Posta Adresiniz:",
	"Organization name" : "Organizasyon İsmi",
	"Organization details" : "Organizasyon Detayları",
	"Start a resistance war" : "Direniş(İsyan) Başlat",
	"more" : "Daha",
	"New feature" : "Yeni Özellik",
	"World Map" : "Dünya Haritası",
	"Exchange rate" : "Takas Oranı",
	"You do not have any active job offers" : "Aktif İş Teklifi Yok",
	"The company offers no products in this market" : "Bu Şirketin Markette Malı Yok",
	"Work" : "Çalış",
	"Rec exchange rate" : "Döviz Kuru",
	"Accepted" : "Kabul Edildi",
	"Accounts" : "Hesaplar",
	"Achievements" : "Başarılar",
	"Active wars list" : "Aktif savaşlar listesi",
	"Add a job offer" : "İş teklifi ekle",
	"Add as a friend" : "Arkadaş olarak ekle",
	"Administration" : "Yönetim",
	"Alerts" : "Uyarılar",
	"All accounts" : "Tüm hesaplar",
	"All Alliances" : "Tüm İttifaklar",
	"All donations" : "Tüm bağışlar",
	"All levels" : "Tüm seviyeler",
	"All resistance wars" : "Tüm direniş savaşları",
	"All wars" : "Tüm savaşlar",
	"Alliance" : "İttifak",
	"Alliances" : "İttifaklar",
	"Amount" : "Miktar",
	"Anarchist" : "Anarşist",
	"Argentina" : "Arjantin",
	"Army" : "Ordu",
	"Article RSS" : "Makale RSS",
	"Assets" : "Varlıklar",
	"Attackable on President's decision" : "Başkanın kararıyla saldırılabilir",
	"Attention: NO VAT tax for Raw materials" : "Dikkat: Hammaddeler için KDV yoktur",
	"Australia" : "Avusturalya",
	"Austria" : "Avusturya",
	"Average" : "Ortalama",
	"Average citizen level" : "Ortalama Vatandaş Seviyesi",
	"Average strength" : "Ortalama dayanıklılık",
	"Back" : "Geri",
	"Back to battlefield" : "Savaş alanına geri dön",
	"Battle Hero" : "Savaş Kahramanı",
	"Battle History" : "Savaş Geçmişi",
	"Battle history" : "Savaş Geçmişi",
	"Belgium" : "Belçika",
	"Bio" : "Yaşam",
	"Bosnia and Herzegovina" : "Bosna Hersek",
	"Brazil" : "Brezilya",
	"Bulgaria" : "Bulgaristan",
	"Buy" : "Satın Al",
	"Buy Constructions" : "Yapı Satın Alımı",
	"Buy Constructions: Defense System" : "Yapı Satın Alımı: Savunma Sistemi",
	"Buy Constructions: Hospital" : "Yapı Satın Alımı: Hastane",
	"Buy export license" : "Ihracat Lisansı Satın Al",
	"Buy extra storage" : "Ekstra Depo Al",
	"Buy from market" : "Marketten Satın Al",
	"Buy market license" : "Pazar lisansı al",
	"Buy raw materials" : "Hammadde satın al",
	"Buy wellness" : "Sağlık al",
	"Canada" : "Kanada",
	"Candidate" : "Aday",
	"Career" : "Kariyer",
	"Career path" : "Kariyer basamakları",
	"Center" : "Merkez",
	"Change password" : "Şifre değiştir",
	"Change residence" : "Mekan değiştir",
	"Check your unlocked features" : "Açılmış özelliklerini kontrol et",
	"Chile" : "Şili",
	"China" : "Çin",
	"Citizen Avatar" : "Vatandaş Resmi",
	"Citizens" : "Vatandaşlar",
	"Collect" : "Topla",
	"Come back tomorrow." : "Yarın tekrar gelin.",
	"Companies" : "Şirketler",
	"Companies for sale" : "Satılık şirketler",
	"Company" : "Şirket", 
	"Company accounts" : "Şirket hesapları", 
	"Company page" : "Şirket sayfası", 
	"Congress" : "Meclis",
	"Congress Elections" : "Meclis Seçimleri",
	"Congress Member" : "Meclis Üyesi",
	"Constructions": "Yapı",
	"Contact": "İrtibat",
	"Cost" : "Maliyet", 
	"Country" : "Ülke",
	"Country Administration" : "Ülke Yönetimi",
	"Country administration" : "Ülke Yönetimi",
	"Country Presidency" : "Ülke Başkanlığı",
	"Country President" : "Ülke Başkanı",
	"Country trading embargoes" : "Ülke ticaret ambargoları",
	"Create new" : "Yeni kur",
	"Croatia" : "Hırvatistan",
	"Current location" : "Şimdiki Mekan",
	"Czech Republic" : "Çek Cumhuriyeti",
	"Debate Area" : "Tartışma Alanı",
	"Declare War" : "Savaş İlanı",
	"Defense Points" : "Savunma Puanı",
	"Defense System" : "Savunma Sistemi",
	"defense system" : "Savunma Sistemi",
	"Delete" : "Sil",
	"Denmark" : "Danimarka",
	"details" : "Detaylar",
	"Diamonds" : "Elmas",
	"diamonds" : "Elmas",
	"Donate" : "Bağış",
	"Donate Gold" : "Gold Bağışla",
	"Donate raw materials" : "Hammadde bağışla",
	"Donation" : "Bağış",
	"Donations list" : "Bağış listesi",
	"Drag and drop items from your inventory to the donation area" : "Eşyaları envanterinden bağış alanına doğru sürükle ve bırak",
	"Economic stats" : "Ekonomik istatistikler",
	"Economy" : "Ekonomi",
	"Edit details" : "Detayları düzenle",
	"Edit profile" : "Profili Düzenle",
	"Edit Profile" : "Profili Düzenle",
	"Election results" : "Seçim Sonuçları",
	"Election" : "Seçim",
	"Elections" : "Seçimler",
	"Email must be valid for registration, so don't cheat" : "Kayıt için eposta geçerli olmalıdır, bu yüzden hile yapmayınız",
	"Employee" : "Çalışan",
	"Employees" : "Çalışanlar",
	"Erepublik Age" : "Erepublik Yaşı",
	"Estonia" : "Estonya",
	"Experience" : "Tecrübe",
	"Experience points" : "Tecrübe puanları",
	"Expires tomorrow" : "Yarın Sona Eriyor",
	"Field Marshal" : "Mareşal",
	"Fight" : "Savaş",
	"Fights" : "Savaşlar",
	"Fight Again" : "Tekrar Savaş",
	"Fight bonus" : "Savaş bonusu",
	"Finances" : "Mali durum",
	"Find out more" : "Daha fazlasını öğren",
	"Finland" : "Finlandiya",
	"Food" : "Gıda",
	"food" : "Gıda",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "Yasanın kabul edilebilmesi için 2/3 Meclis oyu gereklidir",
	"Force" : "Güç",
	"Forum" : "Forum",
	"France" : "Fransa",
	"Friends" : "Arkadaşlar",
	"General Manager" : "Genel Müdür",
	"Germany" : "Almanya",
	"Get Gold" : "Altın elde et",
	"Get Gold &amp; Extras" : "Altın &amp; ekstra al",
	"Gift" : "Hediye",
	"gift" : "Hediye",
	"Go to Battlefield" : "Savaş alanına git",
	"Go to marketplace" : "Pazaryerine git",
	"GOLD" : "ALTIN",
	"Gold" : "Altın",
	"Grain" : "Tahıl",
	"grain" : "Tahıl",
	"Greece" : "Yunanistan",
	"Guest" : "Ziyaretçi",
	"Hard Worker" : "Hamarat İşçi",
	"Heal" : "İyileştir",
	"Hero" : "Kahraman",
	"High": "Yüksek",
	"Home" : "Anasayfa",
	"Hospital" : "Hastane",
	"hospital" : "Hastane",
	"House" : "Ev",
	"house" : "Ev",
	"Human Resources" : "İnsan Kaynakları",
	"Hungary" : "Macaristan",
	"Import Tax" : "İthalat Vergisi",
	"Inbox" : "Gelen Kutusu",
	"Income Tax" : "Gelir Vergisi",
	"India" : "Hindistan",
	"Indonesia" : "Endonezya",
	"International" : "Uluslararası",
	"Inventory" : "Envanter",
	"Invest" : "Yatır",
	"Invite friends" : "Arkadaşlarını davet et",
	"Invite 10 people to Erepublik and make sure they reach level 6" : "Erepublik'e 10 arkadaşını davet et ve seviye 6'ya ulaştıklarından emin ol",
	"Iran" : "İran",
	"Ireland" : "İrlanda",
	"Iron" : "Demir",
	"iron" : "Demir",
	"Israel" : "İsrail",
	"Issue Money" : "Para Basımı",
	"Italy" : "İtalya",
	"Items" : "Eşya",
	"items" : "eşya",
	"Japan" : "Japonya",
	"Jobs" : "İş İmkanları",
	"Jobs available in this company" : "Bu şirketteki iş imkanları:",
	"Join" : "Katıl",
	"Join a party" : "Bir partiye katıl",
	"Land" : "Arazi",
	"Latest Events" : "Son Olaylar",
	"Latvia" : "Letonya",
	"Law proposals" : "YASA TEKLİFLERİ",
	"Level 1" : "Seviye 1",
	"Level" : "Seviye",
	"Level 2" : "Seviye 2",
	"Level 3" : "Seviye 3",
	"Level 4" : "Seviye 4",
	"Level 5" : "Seviye 5",
	"Lithuania" : "Litvanya",
	"Login" : "Giriş",
	"logout" : "çıkış",
	"Make changes" : "Değişiklikleri uygula",
	"Malaysia" : "Malezya",
	"Manufacturing" : "İmalat",
	"Market" : "Pazar",
	"Market offers" : "Pazar teklifleri",
	"Market place" : "Pazar yeri",
	"Marketplace" : "Pazaryeri",
	"Media Mogul" : "Medya Baronu",
	"Medium" : "Orta",
	"Members"  : "Üyeler",
	"Mexico" : "Meksika",
	"Military" : "Askeri",
	"Military achievements" : "Askeri başarılar",
	"Military force" : "Askeri güç",
	"Military rank" : "Askeri rütbe",
	"Military stats" : "Askeri istatistikler",
	"Minimum" : "Asgari",
	"Minimum Wage" : "Asgari Ücret",
	"Moldavia" : "Moldavya",
	"Monetary market" : "Para Piyasası",
	"Money" : "Para",
	"Month/Year" : "Ay/Yıl",
	"more events" : "daha fazla olay",
	"more than a year" : "bir yıldan fazla",
	"Moving Tickets" : "Bilet",
	"moving tickets" : "Bilet",
	"Mutual Protection Pact" : "Ortak Koruma Paktı",
	"Name" : "İsim",
	"National" : "Ulusal",
	"National Rank" : "Ulusal Sıra",
	"Neighbors" : "Komşular",
	"Netherlands" : "Hollanda",
	"New" : "Yeni",
	"new article" : "yeni makale",
	"New Citizen Fee" : "Yeni Vatandaşlık Ücreti",
	"New Citizen Message" : "Yeni Vatandaş Mesajı",
	"New citizens today" : "Bugünkü Yeni Vatandaşlar",
	"New location:" : "Yeni mekan:",
	"News" : "Haberler",
	"Newspaper" :"Gazete",
	"Newspaper Avatar" :"Gazete Resmi",
	"Newspaper details" :"Gazete detayları",
	"Newspaper name" :"Gazete ismi",
	"Next" : "Sonraki",
	"Next elections" : "Sonraki seçimler",
	"No" : "Hayır",
	"no allies" : "Müttefik Yok",
	"No political activity" : "Politik aktivite yok",
	"No products in this market" : "Bu pazarda ürün yok",
	"No shouts posted by this Citizen yet" : "Bu Vatandaş tarafından henüz seslenme yapılmadı",
	"Norway" : "Norveç",
	"Offer a gift" : "Hediye ver",
	"Office" : "Ofis",
	"Oil"  : "Petrol",
	"oil"  : "Petrol",
	"Ok, thanks, next tip" : "Tamam, teşekkürler, diğer ipucu",
	"Old"  : "Eski",
	"On the Map" : "Haritada",
	"one hour ago" : "bir saat önce",
	"one minute ago" : "bir dakika önce",
	"one month ago" : "bir ay önce",
	"online": "çevrimiçi",
	"Online now": "Şimdi çevrimiçi",
	"only ": "sadece ", " pictures allowed": " resimler kullanılabilir",
	"only .jpeg pictures allowed": "sadece .jpeg resimler kullanılabilir",
	"Only congressmen and country presidents have the right to vote" : "Sadece milletvekilleri ve ülke başkanları oy kullanabilir",
	"Organization Avatar": "Organizasyon Resmi",
	"Organizations" : "Organizasyonlar",
	"Orientation" : "Eğilim",
	"Pakistan" : "Pakistan",
	"Parties" : "Partiler",
	"Party" : "Parti",
	"Party Elections" : "Parti Seçimleri", 
	"Party Presidency" : "Parti Başkanlığı",
	"Party President" : "Parti Başkanı",
	"Peace Proposal" : "Barış Teklifi",
	"Pending" : "Görüşülenler",
	"Philippines" : "Filipinler",
	"Place your Congress candidature" : "Meclis adaylığını koy",
	"Please choose a country you want to live in." : "Yaşamak için bir ülke seçin.",
	"Please choose the region you want to live in." : "Yaşamak istediğiniz bölgeyi seçin.",
	"Please choose the country you want to live in." : "Yaşamak istediğiniz ülkeyi seçin.",
	"Please select an Industry to see the marketplace offers" : "Pazaryeri tekliflerini görmek için lütfen bir Endüstri seçin",
	"Poland" : "Polonya",
	"Politic stats" : "Politik istatistikler",
	"Politics" : "Politika",
	"Population": "Nüfus",
	"Portugal" : "Portekiz",
	"Post a comment" : "Yorum gönder",
	"President" : "Başkan",
	"President Elections" : "Başkan Seçimleri",
	"President Impeachment" : "Başkan Suçlaması",
	"Press" : "Basın",
	"Press director" : "Basın direktörü",
	"Prev" : "Önceki",
	"Price" : "Fiyat",
	"Price with taxes" : "Vergi dahil fiyat",
	"Privacy" : "Gizlilik",
	"Private" : "Teğmen",
	"Productivity" : "Üretkenlik",
	"Products" : "Ürünler",
	"Profile":"Profil",
	"Proposed by":"Teklif eden: ",
	"Provider" : "Tedarikçi",
	"Quality" : "Kalite",
	"Quality Level" : "Kalite Seviyesi",
	"Rank" : "Rütbe",
	"Rankings" : "Sıralamalar",
	"Raw materials" : "Hammaddeler",
	"Reach 1000 subscribers to your newspaper" : "Gazetende 1000 aboneye ulaş",
	"Reached 1000 subscribers to your newspaper" : "Gazetende 1000 aboneye ulaştı",
	"Reached strength level 5" : "Seviye 5 dayanıklılığa ulaştı",
	"Reached the highest total damage in one battle" : "Bir savaşta en yüksek toplam hasara ulaştı",
	"REJECTED" : "REDDEDİLDİ",
	"Rejected" : "Reddedildi",
	"Report abuse" : "Susitimali bildir",
	"Requirements" : "Gereksinimler",
	"Resign" : "İstifa",
	"Resistance Hero" : "Direniş Kahramanı",
	"Resistance War" : "Direniş Savaşı",
	"Resistance War Active" : "Direniş Savası Aktif",
	"Romania" : "Romanya",
	"Russia" : "Rusya",
	"Salary" : "Ücret",
	"See all donations" : "Tüm bağışları gör",
	"See all employees" : "Tüm çalışanları gör",
	"See all law proposals" : "Tüm yasa tekliflerini gör",
	"See all members" : "Tüm üyeleri gör",
	"see finished battles" : "bitmiş savaşları gör",
	"See results" : "Sonuçları gör",
	"Select" : "Seç",
	"Sell company" : "Şirketi sat",
	"Send message" : "Mesaj gönder",
	"Sent" : "Gönderilen",
	"Serbia" : "Sırbistan",
	"Sergeant" : "Yüzbaşı",
	"Shop" : "Mağaza",
	"Singapore" : "Singapur",
	"Skills:" : "Beceriler:",
	"Slovakia" : "Slovakya",
	"Slovenia" : "Slovenya",
	"Social stats" : "Toplumsal Istatistikler",
	"Society" : "Toplum",
	"Society Builder" : "Toplum Kurucu",
	"South Africa" : "Güney Afrika",
	"South Korea" : "Güney Kore",
	"Spain" : "İspanya",
	"Start a resistance war and liberate that region" : "Bir direniş başlat ve o bölgeyi özgürlüğüne kavuştur",
	"Started a resistance war and liberated " : "Bir direniş başlattı ve ",  " regions." : " bölgeyi özgürlüğüne kavuşturdu.",
	"Started by" : "Başlatan:",
	"started by" : "başlatan: ",
	"Stock" : "Stok",
	"Strength" : "Dayanıklılık",
	"Subscribe" : "Abone ol",
	"Subscribe to comments" : "Yorumlara abone ol",
	"Subscriptions" : "Abonelikler",
	"Super Soldier" : "Süper Asker",
	"Sweden" : "İsveç",
	"Switzerland" : "İsviçre",
	"Tax change: Diamonds" : "Vergi değişikliği: Elmas",
	"Tax change: Food" : "Vergi değişikliği: Gıda",
	"Tax change: Gift" : "Vergi değişikliği: Hediye",
	"Tax change: Grain" : "Vergi değişikliği: Tahıl",
	"Tax change: House" : "Vergi değişikliği: Konut",
	"Tax change: Iron" : "Vergi değişikliği: Demir",
	"Tax change: Moving Tickets" : "Vergi değişikliği: Bilet",
	"Tax change: Weapon" : "Vergi değişikliği: Silah",
	"Tax change: Wood" : "Vergi değişikliği: Odun",
	"Taxes" : "Vergiler",
	"Terms of Service" : "Hizmet Koşulları",
	"Thailand" : "Tayland",
	"The law voting process takes 24 hours." : "Oylama işlemi 24 saat sürer.",
	"There are no resistance wars in this country." : "Bu ülkede şu anda direniş savaşı yok.",
	"This citizen does not have any donations sent or received." : "Bu vatandaş henüz bağış almadı ya da yollamadı (dediğime bakma, sen yukarıdaki adresi satırındaki linkin sonunda bulunan 0'ı 1 olarak değiştir :) ).",
	"today" : "Bugün",
	"Tools" : "Araçlar",
	"Total citizens" : "Bütün Vatandaş",
	"Total damage:" : "Toplam hasar:",
	"Treasury" : "Hazine",
	"Turkey" : "Türkiye",
	"Ukraine" : "Ukrayna",
	"Unemployed" : "İşsiz",
	"United Kingdom" : "Birleşik Krallık",
	"Unsubscribe" : "Abonelikten çık",
	"Unsubscribe to comments" : "Yorumlara abonelikten çık",
	"until the region can be occupied or secured" : "saat sonra bölge ele geçirilebilir veya korunabilir",
	"Update" : "Güncelle",
	"Upgrade quality level" : "Kalite seviyesini artır",
	"USA" : "ABD",
	"Value added tax (VAT)" : "Katma Değer Vergisi (KDV)",
	"View all comments" : "Tüm yorumları gör",
	"War" : "Savaş",
	"Wars" : "Savaşlar",
	"Wars list" : "Savaşlar listesi",
	"Weapon" : "Silah",
	"weapon" : "Silah",
	"Wellness" : "Sağlık",
	"Who" : "Kim",
	"Win the Congress elections": "Meclis seçimlerini kazan",
	"Won the Congress elections": "Meclis seçimlerini kazandı",
	"Win the Presidential elections": "Başkanlık seçimlerini kazan",
	"Won the Presidential elections": "Başkanlık seçimlerini kazandı",
	"Wood" : "Odun",
	"wood" : "Odun",
	"Worked 30 days in a row" : "Kesintisiz 30 gün çalıştı",
	"World" : "Dünya",
	"xp points" : "xp puanı",
	"Yes" : "Evet",
	"yesterday" : "Dün",
	"You are not a member of a party" : "Herhangi bir partinin üyesi değilsiniz",
	"You are not a President or a Congress Member in this country" : "Bu ülkede Başkan ya da Milletvekili değilsiniz",
	"You can exchange money at the" : "Para takası yapmak için: ",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Bu bölgede direniş savaşı başlatamazsınız çünkü bölge şu anda orjinal sahibi olan ülkeye ait",
	"You cannot trade with this country as you are at war with it" : "Bu ülke ile savaştayken ticaret yapamazsınız",
	"You didn't specify the amount of products you wish to buy" : "Satın almak istediğiniz ürün miktarını belirlemediniz",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Bilet sahibi değilsiniz. Pazaryerinden bilet alabilirsiniz",
	"You don't have a newspaper" : "Gazeteniz yok",
	"You don't have any active job offers" : "Aktif iş teklifiniz yok",
	"You have already worked today." : "Bugün zaten çalıştınız.",
	"You have succesfully edited your profile" : "Profilinizi başarıyla düzenlediniz",
	"You have trained today. You can train again tomorrow." : "Bugünlük eğitiminizi yaptınız. Yarın tekrardan eğitim yapabilirsiniz.",
	"Your account" : "Hesabınız",
	"Your accounts" : "Hesaplarınız",
	"Your birthday" : "Doğum gününüz",
	"Your comment" : "Yorumunuz",
	"Your companies" : "Şirketleriniz",
	"Your email here" : "E-postanız buraya",
	"Your inventory" : "Envanteriniz",
	"Your offer has been updated" : "Teklifiniz güncellendi",
        "Shouts" : "Yazilar",
        "News" : "Haberler",
        "Latest" : "En Yeni",
        "Top rated" : "En Popüler",
        "Edit Profile" : "Profilini Duzenle",
        "Shout something" : "Bir şeyler Söyle",
        "Top Rated" : "En Popüler",
        "Official" : "Ülke İçi",
        "Everyone" : "Herkese",
        "News" : "Haberler",
        "more news" : "Daha fazla haber",
        "Advertising Department" : "Reklam Departmani",
        "Job market" : "Iş Teklifleri",
        "Get Gold & Extras" : "Altin ve Ekstra Ozellikler",
        "Tutorials" : "Rehberler",
        "Political stats" : "Politik istatistikler",
        "Erepublik Shop" : "Erepublik Dukkani",
        "Daily salary" : "Yevmiye",
        "Apply" : "Kabul",
        "Show all donations" : "Tüm Bağışları Göster",
        "Show all employees" : "Tüm Çalışanları Göster",
        "Industry" : "Endustri",
        "Provider" : "Teklif sahibi",
        "Amount" : "Miktar",
        "Exchange rate" : "Takas Oranı",
        "Amount to buy" : "Satın Alınacak Miktar",
        "all donations" : "Tüm Bağışlar",
        "Party Member" : "Parti Üyesi",
        "Forfeit points" : "Ceza Puanlari",
        "Get Extra Storage" : "Ekstra Envanter Al",
        "Change" : "Degistir",
        "edit profile" : "Profili Duzenle",
        "Show active wars" : "Aktif Savaşlari Göster",
        "You are in the right place at the right time to take advantage of your opportunities." : "Vakit Geçirmek İçin En Doğru Yerdesin.",
        "You should train today" : "İdman Yapmalısın",
        "Your strength can make you a hero on the battlefield." : "Antreman seni savas alaninda kahraman yapabilir.",
        "Skip" : "Geç",
        "You should work today" : "İşe gitmelisin",
        "Train Bonus" : "Bonus",
        "Search citizen" : "Vatandaş Ara",
        "eRepublik Laws" : "Erepublik Yasaları",
        "for 10 shouts/day and more" : "Günde 10 shout daha atabilirsin!",
        "I have nothing more to say at the moment" : "Şu anlık her şey yolunda ;)",
        "Get Gold & Extras" : "Gold ve Özelliklere Sahip Ol",
        "The proposal for a minimum wage change was rejected" : "Minimum Maas Hakkindaki Yasa Tasarisi Rededildi.",
        "eRepublik Shop" : "eRepublik Dükkanı",
        "Location" : "Bölge",
        "Citizenship" : "Uyruk",
        "show finished battles" : "Bitmiş savaşlar",
        "Still active" : "Hala aktif",
        "War types" : "Savaş Tipleri",
        "Conquest wars" : "Hüküm Savaşları",
        "Resistance wars" : "Direniş Savaşları",
        "Active Wars" : "Aktif Savaşlar",
        "Ended wars" : "Bitmiş Savaşlar",
        "The proposal for a new citizen fee was rejected" : "Yeni baslangic parasi hakkindaki yasası rededildi.",
        "Tax proposal of tax changes for food were rejected" : "Ekmek hakkındaki Vergi değişimi yasası rededildi.",
        "New taxes for food were proposed" : "Ekmek hakkında vergi değişimi önerisi sunuldu.",
        "A new minimum wage was proposed" : "Yeni minimum maaş önerisi sunuldu.",
        "A new citizen fee was proposed" : "Yeni başlangıc parası önerisi sunuldu.",
        "Tax proposal of tax changes for gift were rejected" : "Hediye hakkındaki vergi değişimi yasası rededildi.",
        "Ended wars" : "Bitmiş Savaşlar",
        "Ended wars" : "Bitmiş Savaşlar",















};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 Müttefik";
regexps["^Active wars in (.*)$"] = "$1 'daki aktif savaşlar";
regexps["^(.*) attacked (.*), (.*)$"] = "$1 - $2, $3 Saldırdı!";
regexps["^(.*) was secured by (.*) in the war versus (.*)$"] = "$2 - $3 Savaşında $1, $2 Savunuldu!";
regexps["^Active resistance wars in (.*)$"] = "$1'daki aktif direniş savaşları";
regexps["^Weekly mail presenting the top rated news, active wars, military events and top five countries in eRepublik (.*)$"] = "Haftalık posta abone olduğun gazetelerin yeni sayısı çıktığında buradan görmeni sağlar. $1";
regexps["(\\s*)Expires in (\\d*) days"] = "$2 gün içinde sona eriyor";
regexps["^You worked (\\d*) days in a row.You have (\\d*) more days until you receive a 'Hard Worker' Medal"] = "$1 gün kesintisiz çalıştın. $2 gün daha devam edersen 'Hamarat İşçi' madalyasını alacaksın!";
regexps["^(\\d*) comments$"] = "$1 yorum";
regexps["^(\\d*) hours ago$"] = "$1 saat önce";
regexps["^(\\d*) minutes ago$"] = "$1 dakika önce";
regexps["^(\\d*) days ago$"] = "$1 gün önce";
regexps["^(\\d*) months ago$"] = "$1 ay önce";
regexps["^Regions \\((\\d*)\\)"] = "Bölge ($1)";
regexps["^All employees \\((\\d*)\\)"] = "Tüm Çalışanlar ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Arkadaş ($1)";
regexps["^(\\d*) months"] = "$1 ay";
regexps["^Comments(.*)"] = "Yorumlar$1";
regexps["^Trackbacks(.*)"] = "Geri izleme$1";
regexps["^supported by (.*) parties"] = "$1 Parti Destekliyor";
regexps["^A money issuing of (\\d*) (.*) was proposed"] = "$1 $2 Basılması Önerildi!";
regexps["^A congress donation to National Bank of (.*) was proposed"] = "Meclis, $1 Millet Bankasına Bağış Önerdi!";
regexps["^President of (.*) donation to National Bank of (.*) was proposed"] = "$1 Başkanı, $1 Millet Bankasına Bağış Önerdi!";
regexps["^(.*) made a donation to National Bank of (.*)"] = "$1, $2 Millet Bankasına Bağış Yaptı!";
regexps["^Do you agree to transfer (\\d*) (.*) from the country accounts to National Bank of (.*)"] = "$3 Millet Bankası'na $1 $2 nakledilmesini kabul ediyor musun ?";
regexps["^President of (.*) proposed an alliance with (.*)."] = "$1 Başkanı, $2 ile Müttefik Olmayı Önerdi!";
regexps["^A congress proposed an alliance with (.*)."] = "Meclis, $2 ile Müttefik Olmayı Önerdi!";
regexps["^President of (.*) proposed a mutual protection pact with (.*)"] = "$1 Başkanı $2 ile Ortak Korumada Anlaşmayı Önerdi";


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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":""
//  "a":"" 
};


militaryPage = function() {
  var _nodes = document.getElementsByTagName("p");
  var _node;
  for (var _key in _nodes) {
    if (_nodes[_key]!==null) {
      _node = _nodes[_key];
      if (_node.childNodes.length==2 && _node.childNodes[1].tagName=="A") {
        var tr = matchRegexps(_node.childNodes[0].nodeValue);
        if (tr!==undefined) {
          _node.childNodes[0].nodeValue = tr;
        }
      }
    }
  }
};

fixFlash = function() {
  var tags = document.getElementsByTagName("embed");
  for (var key in tags) {
    var node = tags[key];
    if (node.src.indexOf("delicious.swf")!=-1) {
      var flashVars = node.attributes.getNamedItem("flashvars").nodeValue;
      var txtValue = flashVars.replace(/txt=(.*)&&(.*)/,"$1");
      var trValue = translateWithRegexp(txtValue);
      if (trValue!==undefined) {
        /* sajnos nem mukodik ...
        var newVal = flashVars.replace(/txt=(.*)&&(.*)/,"txt="+trValue+"&&$2");
        alert("flashvars = "+flashVars + " -> "+txtValue + " -> "+trValue+ " : "+newVal);
        node.attributes.getNamedItem("flashvars").nodeValue = newVal;*/
        node.parentNode.innerHTML = "<span class='x' style='letter-spacing:0px'>"+trValue+"</span>";
      }
    }
  }
}


translateWholePage = function(e) {
  if (document.location.toString().indexOf("/country/military")!=-1) {
    militaryPage();
  }

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



window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
  setTimeout(500, translateWholePage)
}, false);


