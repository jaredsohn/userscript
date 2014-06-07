// ==UserScript==
// @name           LoU BoS Turkiye Versiyon
// @description    BoS TooLs scripti bir bakan kadar işinize yarayacaktır.Yazılımın tamamen yasal olup LoU için yazılmış en iyi ücretsiz yazılımdır.
// @namespace      BoS
// @author         Urthadar
// @include        http://prodgame*.lordofultima.com/*/index.aspx*
// @version        1.0.1
// @Düzenleme      Alpayx33 - MertGM
// ==/UserScript==

(function wholeBosScriptFunc(){

var main = function bosMainFunc() {
2000000
function bosStartIfQooxoodoIsAvailable() {
	if (qx === undefined) {
		window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);
	} else {
		bosScript();		
	}
}

window.setTimeout(bosStartIfQooxoodoIsAvailable, 5000);

var bosScript = function() {

qx.Class.define("bos.Const", {
	statics: {	
		DEBUG_VERSION: true,
	
		TRADE_TRANSPORT_CART: 1,
		TRADE_TRANSPORT_SHIP: 2,
		TRADE_TRANSPORT_CART_FIRST: 3,
		TRADE_TRANSPORT_SHIP_FIRST: 4,
		
		CART_CAPACITY: 1000,
		SHIP_CAPACITY: 10000,
		
		TRADE_STATE_TRANSPORT: 1,
		TRADE_STATE_RETURN: 2,

		GOLD: 0,
		WOOD: 1,
		STONE: 2,
		IRON: 3,
		FOOD: 4,

		ORDER_ATTACK: 0,
		ORDER_DEFEND: 1,
		ORDER_SUPPORT: 2,

		MOONSTONE_COST: 1000,
		
		TABLE_SUMMARY_ROW_BORDER: "2px solid #E8D3AE",
		TABLE_BORDER: "1px dotted rgb(77, 79, 70)",
		TABLE_DEFAULT_COLOR: "#F3D298",
		RESOURCE_GREEN: "#40C849",
		RESOURCE_YELLOW: "#FFE400",
		RESOURCE_RED: "#FF0000",
		
		INF: 1000000000,
		
		REGION_CITY: 0,
		REGION_CASTLE: 1,
		REGION_LAWLESS_CITY: 2,
		REGION_LAWLESS_CASTLE: 3,
		REGION_RUINS: 4,
		REGION_UNKNOWN: 5,

		EXTRA_WIDE_OVERLAY: 999,
		
		FAKE_ATTACK_TS: 4000,
		
		//flood control
		MIN_SEND_COMMAND_INTERVAL: 500,
		
		//server peridically sends new data with new resource levels, updated city orders -> it causes summary to refresh but better not to refresh if very recently there was another refresh
		MIN_INTERVAL_BETWEEN_AUTO_REFRESHES: 5000,
		
		MAX_POPUPS: 10
	}
});

var server;
var locale = qx.locale.Manager.getInstance().getLocale();

var bosLocalizedStrings = {
  "en": {
	"summary": "Genel Bakış",
	"combat calculator": "Savaş Hesaplama",
	"food calculator": "Yiyecek hesabı",
	"recruitment speed calculator": "Askeri hesaplama",
	"jump to coords": "Koordinata git",
	"jump to city": "Şehir incele",
	"please enter city coordinates": "Şehir koordinatı giriniz (örnek 12:34) :",
	"jump to player": "Kullanıcı incele",
	"please enter player name:": "Oyuncu adı giriniz:",
	"jump to alliance": "İttifak incele",
	"please enter alliance name:": "İttifak adı giriniz:",
	"error during BOS Tools menu creation: ": "BOS Araçlar menüsünü oluşturma sırasında hata: ",
	"id": "Id", 
	"cityId": "Şehir Id", 
	"from": "Buraya", 
	"type": "Tip", 
	"transport": "Nakliye", 
	"state": "Durum", 
	"start": "Başlat", 
	"end": "Bitti", 
	"position": "Pozisyon", 
	"target": "Hedef", 
	"lastUpdated": "Son Güncelleme", 
	"resources": "Kaynaklar",
	"filter by trade type": "Filtre tipi: <b>ticari tip</b>",
	"filter by: transport type": "Filtre tipi: <b>ulaşım tipi</b>",
	"filter by: resources receiver": "Filtre tipi: <b>kaynak alıcısı</b>",
	"you": "Sen",
	"someone else": "Başkası",
	"filter by: state": "Filtre tipi: <b>konum</b>",
	"trade route": "Ticaret yolu",
	"OK": "Tamam",
	"clear": "Temizle",
	"max": "Max",
	"please enter some resources amount": "Kaynak miktarını giriniz",
	"invalid destination": "Geçersiz hedef",
	"to": "Buraya",
	"ships then carts": "Gemiler daha sonra arabalar",
	"carts then ships": "Arabalar daha sonra gemiler",
	"only carts": "Sadece Arabalar",
	"only ships": "Sadece Gemiler",
	"group": "Grup",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Ticaret Yolları",
	"fromTo": "Buradan/Buraya",
	"action": "Eylem",
	"status": "Durum",
	"wood": "Odun", 
	"stone": "Taş", 
	"iron": "Demir", 
	"food": "Yiyecek", 
	"land/sea": "Kara/Deniz", 
	"edit": "Düzenle",	
	"options": "Ayarlar",
	"table settings": "Tablo ayarları",
	"load table settings at start": "Tablo ayarları yükle ve başlat",
	"table name": "Tablo ismi",
	"cities": "Şehirler",
	"military": "Askeri",
	"btnLoadTableSettings": "Tablo ayarlarını yükle",
	"btnLoadTableSettings_toolTip": "Önceki ayarları yükle(sütun sırasını, genişlikleri, görünürlük, sıralama)",
	"btnSaveTableSettings": "Tablo ayarlarını kaydet",
	"btnSaveTableSettings_toolTip": "Tablo ayarlarını kaydet: sütun sırasını, genişlikleri, görünürlük, sıralama",
	"saving cities data": "Şehir verilerini kaydet",
	"cbPersistCities": "Şehir verilerini kaydet",
	"cbPersistCities_toolTip": "Bir sonraki şehre geçtiğinizde bir önceki şehir tarayıcınız hafızasına kayıt edilir.",
	"cbLoadPersistedCitiesAtStart": "Kayıt edilen şehirlerin verilerini oyun başladığında yükler",
	"btnLoadCities": "Manuel kayıtı şehire yükler",
	"btnLoadCities_toolTip": "Sehirlerin bir önceki oyun oturumu sırasında kaydedilen verileri yükler",
	"btnDeleteAllSavedData": "Kaydedilmiş tüm veriyi sil",
	"btnDeleteAllSavedData_confirmation": "Kayıtlı tüm verileri yaktın kül ettin reyis",
	"persistHelp": "Web tarayıcısının oturumu sona erdiğinde ziyaret edilen tüm şehirlerin verileri kaybolur.Bu nedenle bir sonraki ultimaya girişinizde şehirlerin özet bilgisi yani şehir verilerini içermez.Daha iyi bir oyun deneyimi için ziyaret ettiğiniz şehirlerin verilerini kaydetmeniz önerilir manuel kayıt ya da otomatik kayıt etmek size kalmış,'Kaynakları yenile' butonu ile bu özellik uyum içinde çalışır.",	
	"all": "Tümü",
	"building": "Binalar",
	"castles": "Kaleler",
	"defensive": "Savunma",
	"warehouses": "Depolar",
	"moonstones": "Ay taşları",
	"gold": "Altın",
	"name": "İsim",
	"reference": "Referans",
	"btnRefreshResources": "Kaynakları yenile",
	"btnRefreshResources_toolTip": "'Kaynakları Sorgula' fonksiyonu şehirlerin kaynak düzeyleri hakkında bilgi sağlar.<br/>Şehirler hakkında bir bilgi olmadan bu mümkün olmayacaktır <b>Mevcut</b> Pazar ya da liman<br/>İşlem başladığında serverın yanıt vermesiyle alakalı biraz zaman alabilir<br>Kaynaklar yenilendiğinde: basma yanarsın ",	
	"purify resources": "Saflaştırılan kaynaklar",
	"btnPurifyAll": "Hepsini saflaştır",
	"btnPurifyAll_toolTip": "Saflaştırılmış kaynaklar üretidiği şehirler <b>işaretlenmi Moonglow Kulelerinin olduğu şehirlerdir</b>.<br/>Kaleleriniz için dikkat edin yiyecek dengesi negatif düzeyde ise kesinlikle saflaştırma için kaledi moonglow kulesini işaretlmeyin yoksa sonunuz mustafa topal oğlu gibi olur askerlerimi uzaylılar kaçırdı reis diye gelmeyin hahaha:D<br/>Kısaca kaleleri es geçin saflaştırmada.",
	"confirmation": "Doğrula",
	"are you sure?": "Dönüşü olmayan yola girmeye hazırmısın ?",
	"btnMarkMoonglowTower": "Moonglow kulesini işaretle ",
	"btnMarkMoonglowTower_toolTip": "Bulunduğunuz şehirdeki <b>Moonglow kulesini işaretler</b> ve daha sonra kullanmak üzere hafızaya alır",
	"btnUnmarkMoonglowTower": "Moonglow kulesi işaretleme",
	"btnUnmarkMoonglowTower_toolTip": "Daha önce işaretlediğiniz <b>Şehirdeki moonglow kulesini</b> hafızadan siler",
	"help": "Yardım",	
	"_minimumResLevelInput_toolTip": "% Max depolama oranını belirleyin kalanı saflaştırılır<br/>Elle saflaştırma bu ayardan etkilenmez",
	"_minimumResLevelInput_absolute_toolTip": "Toplu saflaştırma sonrası her şehrinde kalmasını istediğin miktar<br/>Elle saflaştırma bu ayardan etkilenmez",
	"purificationHelp": "1. Şehir referansına *M* yazın<br/>2. Şehirdeki Moonglow Kulesini işaretleyin<br/>3. Hepsini Saflaştır butonuna tıklayın <br /> <center><b>Çeviri: Alpayx33 - MertGM</b></center>",
	"purifiable": "Saflaştırma",
	"darkwood": "Kara Tahta",
	"runestone": "Rune Taşı",
	"veritum": "Veritum",
	"trueseed": "Büyülü Tohum",
	"refresh": "Yenile",
	"sbSourceContinent_toolTip": "Filtre tipi: <b>kaynak kıta</b>",
	"sbDestinationContinent_toolTip": "Filtre tipi: <b>hedef kıta</b>",
	"defender": "Savunma",
	"attacker": "Saldırı",
	"btnUpdateView_toolTip": "Yenile Göster",
	"cbShowFakeAttacks": "Sahte saldırıları göster",
	"cbShowFakeAttacks_toolTip": "Sahte saldırı: yağma, kuşatma veya saldırı ile TS < 4000",
	"unit orders": "Sipariş birimleri",
	"incoming attacks": "Gelen saldırı",
	"btnCsvExport": "Csv dışa aktar",
	"you need to be in city": "Şehrinde ihtiyacın",
	"food calculator": "Yiyecek hesaplama",
	"mass recruitment": "Toplu alım",
	"bos.gui.MassRecruitmentPage.help": "Toplu askere alım özelliği inşaat bakanı ve savaş bakanı gerektirir.Var olan şehirlerinizde sistemi etkinleştirerek bakanlar sayesinde kullanmaya başlayabilirsiniz.Toplu işe alım için yeniden şehir sağladığınızda yine etkinleştirme yapmalısınız.<b>Çeviri: Alpayx33 - MertGM (Kerraneciler)</b>Hataların listesi ve anlamları:<br />", 
	"bos.gui.MassRecruitmentPage.help2": "<br />I - Geçersiz, R - Yeterli kaynak yok, Q - Askere alım sırasında yer yok, T - Maksimum asker limitine ulaştın, B - İstenilen binadan yok, G - Fakirsin altının yok",
	"city/order": "Şehir / Siparişler",
	"missing": "Missing",
	"resourcesFor": "Gerekli kaynak",
	"recruiting": "İşe alım",
	"available": "Kullanılabir",
	"btnEnableMassRecruitment": "Etkinleştir",
	"btnEnableMassRecruitment_toolTip": "Toplu işe alımlar için bulunduğu şehri etkinleştirir",
	"btnDisableMassRecruitment": "Devre dışı",
	"btnDisableMassRecruitment_toolTip": "Toplu işe alımlar için bulunduğu şehri devre dışı bırakır",
	"recruitmentTime": "İşe Alım Zamanı [s]",
	"btnRefreshView": "Yenile",
	"btnRefreshView_toolTip": "Yenile Göster",
	"btnRecruitAll": "Hepsini topla",
	"btnRecruitAll_toolTip": "Mümkün olan tüm birimler",
	"filter by: city types": "Filtre tipi: <b>şehir türleri</b>",
	"purify": "Saflaştır",
	"recruitment": "Askere alım",
	"carts": "Pazar",
	"orders": "Emirler",
	"wood/h": "Odun/S",
	"woodMax": "Odun max",
	"woodFree": "Odun free",					
	"woodIncoming": "Gelen odun",
	"woodFullAt": "Odun tam",
	"stone/h": "Taş/S",
	"stoneMax": "Taş max",
	"stoneFree": "Taş free",					
	"stoneIncoming": "Gelen taş",
	"stoneFullAt": "Taş tam",
	"iron/h": "Demir/S",
	"ironMax": "Demir max",
	"ironFree": "Demir free",					
	"ironIncoming": "Gelen demir",
	"ironFullAt": "Demir tam",
	"food/h": "Yiyecek/S",
	"foodMax": "Yiyecek max",
	"foodFree": "Yiyecek free",					
	"foodIncoming": "Gelen yiyecek",
	"foodFullAt": "Yiyecek tam",
	"gold/h": "Altın/S",
	"ships": "Gemiler",
	"buildQueue": "Kuyruk Oluştur",
	"unitQueue": "Birlik Kuyruğu",	
	"cbTweakReportAtStart": "Tweak reports at start",
	"cbTweakReportAtStart_toolTip": "When option is checked reports are tweaked at start",
	"recruit": "Topla",
	"in city:": "işe : ",
	"add city units": "Şehre birim ekle",
	"purify options": "Saflaştırma Ayarları",
	"cbIncludeCastles": "Kaleler dahil",
	"cbIncludeCastles_toolTip": "Toplu saflaştırma kaleleride kapsar<br/>Bakan olmadan kalelerinizde saflaştırmayı elle yapın ne yaptığınızı görün eğer tahıl negatif düzeye inmişse saflaştırma yapmaktan kaçının",
	"cbUseRecruitmentData": "Askere alım verileri",
	"cbUseRecruitmentData_toolTip": "<strong>Askere alma</strong> verilerini kullanır.Bazı kaynakların kaleye askere alım için gerekli olup olmadığını kontrol eder",
	"btnPurifyOptions": "Ayarlar",
	
	"role": "Ünvan",
	"lastLogin": "Son giriş",
	"title": "Başlık",
	"rank": "Sıralama",
	"score": "Skor",
	"continent": "Kıta",
	"player name": "Oyuncu ismi",
	"land": "Kara",
	"water": "Su",
	"palaces": "Saraylar",
	"player": "Oyuncu",
	"my alliance": "İttifağım",
	"extra summary": "Ekstra Genel Bakış",
	"minScoreInput_toolTip": "En düşük Skor",
	"alliance": "İttifak",
	"zoom in": "Yakınlaş",
	"zoom out": "Uzaklaş",
	"jump to continent": "Kıta ya Git",
	"btnExportSettings": "Ayarları Dışa aktar", 
	"btnExportSettings_toolTip": "Ayarlarını txt olarak alırsınız.",
	"btnImportSettings": "Ayarları içe al",			
	"btnImportSettings_toolTip": "Ayarları içe alır. Şu anda kaydedilen ayarları atılır",	
	"fetching resources, please wait": "Kaynakları alınıyor, lütfen bekleyin",
	"btnFetchCities": "Veri Topla.",
	"btnFetchCities_toolTip": "BoS Tolls şehirleri gezerek verilerini hafızaya alır.Ortalama her şehir için 0.5 sn süre gerekir",
	"btnTxtExport": "Text Çıktısı",
	
	"btnMarkAllMoonglowTowers": "MKS işaretle",
	"btnMarkAllMoonglowTowers_toolTip": "Tüm Şehirlerdeki Moonglow Kulelerini işaretle",
	
	"btnAddIntel": "İzci raporunu ekle",
	"btnAddIntel_toolTip": "Düşman şehirle bağlantılı izci raporunu ekle",
	"isLandlocked": "Karadamı?",
	"hasCastle": "Kale?",
	"intelligence": "İstihbarat",
	"delete": "Sil",
	"owner": "Sahip",
	
	"fill with": "Doldur ",
	"fill with resources": "Kaynakları Pompala",
	"resource type": "Seç",
	"max resources to send": "Maksimum kaynak seçimi",
	"max travel time": "Maksimum Zaman (h)",
	"cbAllowSameContinent": "Ayni kıtanın şehirlerini de kapsayacak",
	"cbAllowOtherContinent": "Diğer kıtalardan gelen şehir nakliyelerini de kapsayacak",
	"cbPalaceSupport": "Saraya Teslim Et",
	"cbPalaceSupport_toolTip": "Saray kaynakları gönderir (sadece odun ve taş)",
	"current city": "Bulunduğun Şehir",
	"search": "Ara",
	"request resources": "Kaynakları Yolla",
	
	"defenders": "Savunmam",
	"btnSaveAllCities": "Tüm şehirleri kaydet",
	"save summary position": "Özetleri kaydet",
	
	"targetCityName": "Hedef Şehir",
	"targetPosition": "Hedefin Koordinatı",
	"attackerCityName": "Saldıran Şehir",
	"attackerPosition": "Saldıranın Koordinatı",
	"playerName": "Saldıran",
	"allianceName": "İttifak",
	"attackerTS": "Saldıran TS",
	"attackerUnits": "Saldıran Ünite",
	"spotted": "Puanlı", 
	"claim": "Taleb",
	"show intel": "İstihbaratı göster",
	
	"": ""
  },
"de": {
	"summary": "Übersicht",
	"combat calculator": "Kampf Kalkulator",
	"food calculator": "Nahrungsberechner",
	"recruitment speed calculator": "Rekrutiergeschwinigkeitsberechnung",
	"jump to coords": "Gehe zu",
	"jump to city": "Gehe zu City",
	"please enter city coordinates": "Bitte gebe Stadtkoordinaten (z.B.: 12:34) ein",
	"jump to player": "Gehe zu Spieler",
	"please enter player name:": "Bitte gebe einen Spielernamen ein",
	"jump to alliance": "Gehe zu Allianz",
	"please enter alliance name:": "Bitte gib den Namen der Allianz ein",
	"error during BOS Tools menu creation: ": "Error bei der Erstellung des BOS-Tool Menüs:",
	"id": "Id", 
	"cityId": "Stadt Id", 
	"from": "von", 
	"type": "Handelstyp", 
	"transport": "Transporttyp", 
	"state": "Status", 
	"start": "Aufbruchszeit", 
	"end": "Ankunft", 
	"position": "Pos", 
	"target": "Ziel", 
	"lastUpdated": "Zuletzt aktualisiert", 
	"resources": "Ressourcen",
	"filter by trade type": "Filtere nach <b>Transportart</b> ",
	"filter by: transport type": "Filtere nach <b>Transporttyp</b>",
	"filter by: resources receiver": "Filtere nach <b>Ressourcenempfänger</b>",
	"you": "Du",
	"someone else": "Jemand andres",
	"filter by: state": "Filtere nach <b>Status</b>",
	"trade route": "Handelsroute",
	"OK": "OK",
	"clear": "Löschen",
	"max": "Max",
	"please enter some resources amount": "Bitte gib die Anzahl der Ressourcen ein",
	"invalid destination": "Ungültiges Ziel",
	"to": "zu",
	"ships then carts": "Schiffe über Karren", /* 100% accurate translation would be "erst Handelschiffe, dann Marktkarren" there was soneone else who  
	translated things too maybe you should let him check what to do*/
	"carts then ships": "Karren vor Schiffen", /*same as above just inversed*/
	"only carts": "Nur Karren",
	"only ships": "Nur Schiffe",
	"group": "Gruppe",
	"resourceMultiplierNotice": "if resourceCount < 10000 then resourceCount = resourceCount * 1000",
	"trade routes": "Handelsrouten",
	"fromTo": "Von/Zu",
	"action": "Aktion",
	"status": "Status",
	"wood": "Holz", 
	"stone": "Stein", 
	"iron": "Eisen", 
	"food": "Nahrung", 
	"land/sea": "Land/See", 
	"edit": "Bearbeiten",
	
	"options": "Optionen",
	"table settings": "Tabelleneinstellungen",
	"load table settings at start": "Lade Tabelleneinstellungen beim Start",
	"table name": "Tabellenname",
	"cities": "Städte",
	"military": "Militär",
	"btnLoadTableSettings": "Lade Tabelleneinstellungen",
	"btnLoadTableSettings_toolTip": "Lädt die (vorher) gespeicherten Einstellungen für die Tabelle (Spaltenordnung, Spaltenbreite, angezeigte Felder, Sortierordnung",
	"btnSaveTableSettings": "Speichern der Tabelleneigenschaften",
	"btnSaveTableSettings_toolTip": "Speichert die Tabelleneigenschaften: Spaltenordnung, Spaltenbreite, Angezeigte Spalten, Sortierordnung",
	"saving cities data": "Speichern der Stadtdaten",
	"cbPersistCities": "Speicher Stadtdaten",
	"cbPersistCities_toolTip": "Wenn du zur nächsten Stadt wechselst, werden die Daten der vorherigen im lokalen Speicher des Browers gespeichert.",
	"cbLoadPersistedCitiesAtStart": "Lade gespeicherte Stadtdaten beim Start des Spieles",
	"btnLoadCities": "Lade gespeicherte Stadtdaten manuell",
	"btnLoadCities_toolTip": "Läd manuell die Stadtdaten einer verherigen LoU-Session ",
	"btnDeleteAllSavedData": "Lösche alle gespeicherten Daten",
	"btnDeleteAllSavedData_confirmation": "Alle gespeicherten Daten wurden gelöscht!",
	"persistHelp": "Wenn Lord of Ultima beendet wird gehen alle Daten der besuchten Städte verloren. Deswegen sind beim nächsten Start von LoU nicht viele bzw. keine Daten im der Tabelle. Dies kann man verhindern, indem man die Daten der Städte im lokalen Speicher des Browsers speichert und sie automatisch oder manuell laden lässt. Diese Einstellung funktioniert am besten, wenn sie zusammen mit `Ressourcen aktualisieren` verwendet wird.",	
	"all": "Alle",
	"building": "In Bau/Aufbau",
	"castles": "Burgen",
	"defensive": "Defensive",
	"warehouses": "Lager",
	"moonstones": "Mondsteine",
	"gold": "Geld",
	"name": "Name",
	"reference": "Referenz",
	"btnRefreshResources": "Ressourcen aktualisieren",
	"btnRefreshResources_toolTip": "Benutzt die 'Request resources' Funktion umd die momentanen Ressourcen der Städte zu bekommen.<br/>Dies funktioniert nur bei Städten mit <b>vorhandenen</b> Marktkarren oder Handelsschiffen.<br/>Das sammeln aller Ressourcen kann einige Zeit dauern, da immer auf Antwort des Servers gewartet wird.<br/>Ressourcen wurden aktualisiert am: nie",	
	"purify resources": "Ressourcen veredeln",
	"btnPurifyAll": "Veredele alle",
	"btnPurifyAll_toolTip": "Veredelt Ressurcen in Städten mit <b>markiertem Mondschein-Turm</b>.<br/>Falls ein Bauminister aktiv ist, so wird versucht keine Ressurcen zu veredeln in Städten/Burgen mit negativer Nahrungbalance.<br/>Wenn kein Bauminister aktiv ist werden Burgen übersprungen.",
	"confirmation": "Bestätigung",
	"are you sure?": "Bist du sicher?",
	"btnMarkMoonglowTower": "Markiere einen Mondschein-Turm",
	"btnMarkMoonglowTower_toolTip": "Sucht in der Stadt nach einem <b>Mondschein-Turm</b> und speichert die ID für die weitere Benutzung",
	"btnUnmarkMoonglowTower": "Lösche Mondstein-Turm Markierung",
	"btnUnmarkMoonglowTower_toolTip": "Löscht alle markierten<b>Mondstein-Türme</b> in dieser Stadt<br/>",
	
	"_minimumResLevelInput_toolTip": "% der max. Lagerkapzität, welche in jeder Stadt nach der Massenveredlung bestehen bleiben muss.<br/>Manuelle Veredlung ist hiervon nicht betroffen",
	"_minimumResLevelInput_absolute_toolTip": "Anzahl der Ressurcen,  welche in jeder Stadt nach der Massenveredlung bestehen bleiben muss.<br/>Manuelle Veredlung ist hiervon nicht betroffen",
	"purificationHelp": "1. schreibe *M* in die Stadtreferenz, damit die Stadt in der Veredelungstabelle angezeigt wird.<br/>2. Markiere den Monddstein-Turm in der Stadt umd diese Stadt für die Massenveredelung freizuschalten<br/>3. Klicke den Veredele alle \"Button\" oder klicke in das Kästchen des zuveredelnden Ressourcentypes",
	"purifiable": "veredeDunkelholzDarkwood",
	"runestone": "Runensteine",
	"veritum": "Veritum",
	"trueseed": "Trueseed",	
	"refresh": "Aktualisieren",
	"sbSourceContinent_toolTip": "Filtern nach: <b>Herrkunftskontinent</b>",
	"sbDestinationContinent_toolTip": "Filtern nach: <b>Zielkontinent</b>",
	"defender": "Verteidiger",
	"attacker": "Angreifer",
	"btnUpdateView_toolTip": "Ansicht aktualisieren",
	"cbShowFakeAttacks": "Zeige Fake-Angriffe",
	"cbShowFakeAttacks_toolTip": "Fake-Angriffe sind: Plünderungen/Überfälle/Belagerungen mit einer TS < 1000",	
	"unit orders": "Einheitenbefehle",
	"incoming attacks": "Eingehende Angriffe",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!", 
	"food calculator": "Nahrungsberechner",
	"mass recruitment": "Massrekrutierung",
	"bos.gui.MassRecruitmentPage.help": "Benötigt zur Zeit einen Bau- und Kiegsminister. Persisting of cities and 'Lade bei Start' muss aktiviert werden oder es werden Popups erscheinen, welche bvesagen, dass eine Stadt besucht werden soll. Rekruierzeiten werden aktualiesiert wenn die Massenrekrutierung für die jeweilige Stadt aktiviert wird, falls die Zeiten sich ändern, aktiviere die Massenrekrutierung erneut. Liste der Errormeldungen:",
	"bos.gui.MassRecruitmentPage.help2": "I - Ungültig (Invalid), R - nicht genügend Resourcen, Q - Rekrutierliste ist voll (recruitment Queue), T - Truppenlimit erreicht, B - Fehlendes Einheitengebäude, G - nicht genug Gold",	
	"city/order": "Stadt / Befehle",
	"missing": "Fehlend",
	"resourcesFor": "Ressourcen für",
	"recruiting": "Rekrutiert",
	"available": "Verfügbar",
	"btnEnableMassRecruitment": "Aktivieren",
	"btnEnableMassRecruitment_toolTip": "Schaltet die momentane Stadt für Massenrekrutierung",
	"btnDisableMassRecruitment": "Deaktivierung",
	"btnDisableMassRecruitment_toolTip": "Deaktiviert Massenrekrutierung für die momentane Stadt",	
	"recruitmentTime": "Rekrutierzeit [s]",
	"btnRefreshView": "Aktualisieren",
	"btnRefreshView_toolTip": "Ansicht aktualisieren",
	"btnRecruitAll": "Rekrutiere alle",
	"btnRecruitAll_toolTip": "Rekrutiert alle Verfügbaren Einheiten",
	"filter by: city types": "Filtern nach: <b>Stadttyp</b>",
	"purify": "Veredeln",
	"recruitment": "Rekrutieren",
	"carts": "Karren",
	"orders": "Orders",
	"wood/h": "Holz/h",
	"woodMax": "max. Holz",
	"woodFree": "freie Holzkapazität",					
	"woodIncoming": "eintreffendes Holz",
	"woodFullAt": "Holz voll am/um",
	"stone/h": "Stein/h",
	"stoneMax": "max. Stein",
	"stoneFree": "freie Steinkapazität",					
	"stoneIncoming": "eintreffende Steine",
	"stoneFullAt": "Stein voll am/um",
	"iron/h": "Eisen/h",
	"ironMax": "max. Eisen",
	"ironFree": "freie Eisenkapazität",					
	"ironIncoming": "eiintreffendes Eisen",
	"ironFullAt": "Eisen voll am/um",
	"food/h": "Nahrung/h",
	"foodMax": "max. Nahrung",
	"foodFree": "freie Nahrungskapazität",					
	"foodIncoming": "eintreffende Nahrung",
	"foodFullAt": "Nahrung voll am/um",
	"gold/h": "Gold/h",
	"ships": "Handelsschiffe",
	"buildQueue": "Bauliste",
	"unitQueue": "Rekrutierliste",
	"cbTweakReportAtStart": "Tweak Report beim Start",
	"cbTweakReportAtStart_toolTip": "Läd die Tweak-Reports beim Start",
	"recruit": "Rekrutiere",
	"in city:": "Rekrutiert: ",
	"add city units": "Füge Einheiten dieser Stadt hinzu",
	"purify options": "Veredelungsoptionen",
	"cbIncludeCastles": "Schließe Burgen mit ein",
	"cbIncludeCastles_toolTip": "Schließt Burgen in die Massenveredelung ein.<br/>Ohne Bauminister wird keine Nahrung ist Burgen veredelt. Falls vorhanden wird Nahrung nur in Burgen mit positiver Nahrungsbalance veredelt",
	"cbUseRecruitmentData": "Uses Recruitment tab data",
	"cbUseRecruitmentData_toolTip": "Benutzt die <strong>Rekrutiertab</strong>-Daten um zu kontrollieren ob Ressourcen für die fehlenden Einheiten in der Burg benötigt werden",
	"btnPurifyOptions": "Optionen",
	
	"role": "Role",
	"lastLogin": "Last Login",
	"title": "Title",
	"rank": "Rank",
	"score": "Score",
	"continent": "Continent",
	"player name": "Player name",
	"land": "Land",
	"water": "Water",
	"palaces": "Palaces",
	"player": "Player",
	"my alliance": "My Allianz",	
	"extra summary": "Extra Summary",
	"minScoreInput_toolTip": "Minimum score",
	"alliance": "Allianz",
	"zoom in": "Zoom in",
	"zoom out": "Zoom out",
	"btnExportSettings": "Export settings", 
	"btnExportSettings_toolTip": "Exports settings to text form",
	"btnImportSettings": "Import settings",			
	"btnImportSettings_toolTip": "Imports settings. Currently saved settings will be discarded",	
	"fetching resources, please wait": "Lade Ressourcen..",
	"btnFetchCities": "Fetch cities",
	"btnFetchCities_toolTip": "Simulates visiting city to fetch it's data. Function is called every 0.5s so it's slow",
	"btnTxtExport": "Text Export",
	
	"": ""
  },
  "pl": {
	"summary": "BOS Przegląd",
	"combat calculator": "Kalkulator bitew",
	"food calculator": "Kalkulator jedzenia",
	"recruitment speed calculator": "Kalkulator szybkości rekrutacji",
	"jump to coords": "Skocz do współrzędnych",
	"jump to city": "Skocz do miasta",
	"please enter city coordinates": "Wprowadź współrzędne (np. 12:34) :",
	"jump to player": "Skocz do gracza",
	"please enter player name:": "Wprowadź nazwę gracza:",
	"jump to alliance": "Skocz do sojuszu",
	"please enter alliance name:": "Wprowadź nazwę sojuszu:",
	"error during BOS Tools menu creation: ": "Błąd podczas tworzenia BOS Tools: ",
	"id": "Id", 
	"cityId": "Miasto Id", 
	"from": "Skąd", 
	"type": "Typ", 
	"transport": "Transport", 
	"state": "Stan", 
	"start": "Start", 
	"end": "Koniec", 
	"position": "Pozycja", 
	"target": "Cel", 
	"lastUpdated": "Ost. Aktualizacja", 
	"resources": "Zasoby",
	"filter by trade type": "Filtruj po: <b>typie handlu</b>",
	"filter by: transport type": "Filtruj po: <b>typie transportu</b>",
	"filter by: resources receiver": "Filtruj po: <b>odbiorcy zasobów</b>",
	"you": "Ty",
	"someone else": "Ktoś inny",
	"filter by: state": "Filtruj po: <b>stanie</b>",
	"trade route": "Szlak handlowy",
	"OK": "OK",
	"clear": "Wyczyść",
	"max": "Max",
	"please enter some resources amount": "Wprowadź liczbę surowców",
	"invalid destination": "Nieprawidłowe miejsce docelowe",
	"to": "Do",
	"ships then carts": "Statki później wozy",
	"carts then ships": "Wozy później statki",
	"only carts": "Tylko wozy",
	"only ships": "Tylko statki",
	"group": "Grupa",
	"resourceMultiplierNotice": "jeżeli liczbaZasobów < 10000 to liczbaZasobów = liczbaZasobów * 1000",
	"trade routes": "Szlaki Handlowe",
	"fromTo": "Skąd/Dokąd",
	"action": "Akcja",
	"status": "Status",
	"wood": "Drewno", 
	"stone": "Kamień", 
	"iron": "Żelazo", 
	"food": "Jedzenie", 
	"land/sea": "Ląd/Morze", 
	"edit": "Edycja",	
	"options": "Opcje",
	"table settings": "Ustawienia tabel",
	"load table settings at start": "Ładuj ustawienia tabel przy starcie",
	"table name": "Nazwa tabeli",
	"cities": "Miasta",
	"military": "Wojsko",
	"btnLoadTableSettings": "Wczytaj ustawienia tabeli",
	"btnLoadTableSettings_toolTip": "Ładuje poprzednio zapisane ustawienia tabel (porządek kolumn, szerokości, widoczność, porządek sortowania)",
	"btnSaveTableSettings": "Zapisz ustawienia tabeli",
	"btnSaveTableSettings_toolTip": "Zapisuje ustawienia tabeli: porządek kolumn, szerokości, widoczność, porządek sortowania.<br/>Ciągle musisz kliknąć przycisk <b>Zapisz</b> celem zapisania tego na stałe",
	"saving cities data": "Zapisuje dane miast",
	"cbPersistCities": "Zapisz dane miast",
	"cbPersistCities_toolTip": "Po udaniu się do kolejnego miasta stan poprzedniego miasta zapisany jest w local storage przeglądarki.",
	"cbLoadPersistedCitiesAtStart": "Załaduj zapisane miasta przy starcie gry",
	"btnLoadCities": "Manualnie załaduj dane miast",
	"btnLoadCities_toolTip": "Manualnie ładuje dane miast zapisane podczas poprzednich sesji z grą",
	"btnDeleteAllSavedData": "Skasuj wszystkie zapisane dane",
	"btnDeleteAllSavedData_confirmation": "Wszystkie dane zostały skasowane",
	"persistHelp": "Normalnie kiedy sesja przeglądarki zostaje zakończona wszystkie informacje o odwiedzonych miastach są tracone. Z tego powodu podsuwanie nie będzie zawierać wielu danych. Z tego powodu możliwe jest zapisanie informacji o odwiedzonych miastach w lokalnej bazie danych dostępnej w nowoczesnej przeglądarce internetowej.",	
	"all": "Wszystko",
	"building": "W budowie",
	"castles": "Zamki",
	"defensive": "Defensywne",
	"warehouses": "Składy",
	"moonstones": "Moonstones",
	"gold": "Złoto",
	"name": "Nazwa",
	"reference": "Uwagi",
	"btnRefreshResources": "Odśwież surowce",
	"btnRefreshResources_toolTip": "Używa funkcjonalności 'Poproś o surowce' celem otrzymania aktualnych ilości surowców.<br/>Nie będzie w stanie poobrać informacji dla miast nie posiadających żadnych <b>dostępnych</b> statków lub wozów.<br/>Przetwarzanie żądania może zabrać trochę czasu z uwagi na czas odpowiedzi serwera.<br>Zasoby odświeżono: nigdy",	
	"purify resources": "Oczyszczanie zasobów",
	"btnPurifyAll": "Oczyść wszystko",
	"btnPurifyAll_toolTip": "Oczyszcza zasoby w miastach posiadających <b>oznaczoną Wieżę Księżycową</b>.<br/>Gdy dostępny jest Minister Budownictwa jedzenie nie zostanie oczywszczone w miastach o ujemnym bilansie jedzenia oraz w zamkach.<br/>Jeżeli gracz nie posiada Ministra Budownictwa podczas oczyszczania pominięte zostaną zamki.",
	"confirmation": "Potwierdzenie",
	"are you sure?": "Czy jesteś pewien?",
	"btnMarkMoonglowTower": "Oznacz Wieżę Księżycową",
	"btnMarkMoonglowTower_toolTip": "Znajduje w aktualnym mieście <b>Wieżę Księżycową</b> i zapisuje ją celem późniejszego użycia",
	"btnUnmarkMoonglowTower": "Odznacz Wieżę Księżycową",
	"btnUnmarkMoonglowTower_toolTip": "Dla aktualnego miasta odznacza uprzednio zaznaczoną <b>Wieżę Księżycową<b>",
	"help": "Pomoc",	
	"_minimumResLevelInput_toolTip": "% of max storage that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"_minimumResLevelInput_absolute_toolTip": "number of resources that has to remain in each city after mass purification<br/>Manual purification is not affected by this setting",
	"purificationHelp": "1. umieść *M* uwagach dotyczących miasta dzięki czemu miasto będzie widoczne w poniżej tabeli<br/>2. Oznacz Wieżę Księżycową dla miast mających brać udział w 'Oczyść wszystko'<br/>3. Użyj przycisku 'Oczyść wszystko' lub kliknij w komórce odpowiadającej oczyszczonym typom surowców",
	"purifiable": "Oczyszczalne",
	"darkwood": "Ciemnolas",
	"runestone": "Kamień runiczny",
	"veritum": "Veritum",
	"trueseed": "Magiczny pokarm",
	"refresh": "Odśwież",
	"sbSourceContinent_toolTip": "Filtruj po: <b>kontynencie źródłowym</b>",
	"sbDestinationContinent_toolTip": "Filtruj po: <b>kontynencie docelowym</b>",
	"defender": "Obrońca",
	"attacker": "Atakujący",
	"btnUpdateView_toolTip": "Odśwież widok",
	"cbShowFakeAttacks": "Pokazuj ataki pozorowane",
	"cbShowFakeAttacks_toolTip": "Atak pozorowany to: grabież, oblężenie lub szturm o SO < 1000",
	"unit orders": "Rozkazy",
	"incoming attacks": "Nadchodzące ataki",
	"btnCsvExport": "Export Csv",
	"you need to be in city": "Musisz być w mieście",
	"food calculator": "Kalkulator jedzenia",
	"mass recruitment": "Masowa rekrutacja",
	"bos.gui.MassRecruitmentPage.help": "Aktualnie wymaga Ministra Budownictwa i Ministra Wojny. Zapisywane miast i ładowanie ich na stracie musi być załączone. W przyciwnym razie będą wyskakiwać błędu nakazujące odwiedzić jakieś miasto. Czas rekrutacji jest aktualizowany podczas załączania miasta miasto do masowej rekrutacji, jeśli ulegnie zmianie - dodaj miasto raz jeszcze. Lista kodów błędu:", 
	"bos.gui.MassRecruitmentPage.help2": "I - Nieprawidłowy, R - za mało surowców, Q - kolejka rekrutacji jest pełna, T - przekroczono SO, B - brakuje budynku, G - za mało złota",
	"city/order": "Miasto / Rozkazy",
	"missing": "Brakuje",
	"resourcesFor": "Surowców dla",
	"recruiting": "Rekrutuje",
	"available": "Dostępne",
	"btnEnableMassRecruitment": "Załącz",
	"btnEnableMassRecruitment_toolTip": "Załącza miasto do masowej rekrutacji",
	"btnDisableMassRecruitment": "Wyłącz",
	"btnDisableMassRecruitment_toolTip": "Wyłącza miasto z masowej rekrutacji",
	"recruitmentTime": "Czas rekrutacji [s]",
	"btnRefreshView": "Odśwież",
	"btnRefreshView_toolTip": "Odśwież widok",
	"btnRecruitAll": "Rekrutuj Wszystko",
	"btnRecruitAll_toolTip": "Rekrutuje wszystkie możliwe jednostki",
	"filter by: city types": "Filtruj po: <b>typach miast</b>",
	"purify": "Oczyść",
	"recruitment": "Rekrutacja",
	"carts": "Wozy",
	"orders": "Rozkazy",
	"wood/h": "Drewno/h",
	"woodMax": "Drewno max",
	"woodFree": "Drewno wolne",					
	"woodIncoming": "Drewno nadchodzi",
	"woodFullAt": "Drewno pełne",
	"stone/h": "Kamień/h",
	"stoneMax": "Kamień max",
	"stoneFree": "Kamień wolne",					
	"stoneIncoming": "Kamień nadchodzi",
	"stoneFullAt": "Kamień pełne",
	"iron/h": "Żelazo/h",
	"ironMax": "Żelazo max",
	"ironFree": "Żelazo wolne",					
	"ironIncoming": "Żelazo nadchodzi",
	"ironFullAt": "Żelazo pełne",
	"food/h": "Jedzenie/h",
	"foodMax": "Jedzenie max",
	"foodFree": "Jedzenie wolne",					
	"foodIncoming": "Jedzenie nadchodzi",
	"foodFullAt": "Jedzenie pełne",
	"gold/h": "Złoto/h",
	"ships": "Statki",
	"buildQueue": "Kolejka Budowy",
	"unitQueue": "Kolejka Rekrutacji",	
	"cbTweakReportAtStart": "Podrasuj raporty na starcie",
	"cbTweakReportAtStart_toolTip": "Gdy załączone raporty są podrasowane na starcie",
	"recruit": "Rekrutuj",
	"in city:": "Zrekrutowano: ",
	"add city units": "Dodaj jednostki miasta",
	"purify options": "Opcje Oczyszczania",
	"cbIncludeCastles": "Załącz zamki",
	"cbIncludeCastles_toolTip": "Załącza zamki do masowego oczyszczania.<br/>Bez Ministra Handlu nie oczyści jedzenia w zamku, z ministrem zrobi to o ile bilans jedzenia jest dodatni",
	"cbUseRecruitmentData": "Używaj masową rekrutację",
	"cbUseRecruitmentData_toolTip": "Używa zakładki <strong>Rekrutacja</strong> do sprawdzenia jakie typy surowców są potrzebne celem rekrutacji brakujących jednostek",
	"btnPurifyOptions": "Opcje",
	
	"role": "Rola",
	"lastLogin": "Ostatnie Logowanie",
	"title": "Tytuł",
	"rank": "Ranga",
	"score": "Punkty",
	"continent": "Kontynent",
	"player name": "Nazwa gracza",
	"land": "Ląd",
	"water": "Woda",
	"palaces": "Pałace",
	"player": "Gracz",
	"my alliance": "Mój sojusz",
	"extra summary": "Extra Przegląd",
	"minScoreInput_toolTip": "Minimalna liczba punktów",
	"alliance": "Sojusz",
	"zoom in": "Przybliż",
	"zoom out": "Oddal",
	"jump to continent": "Skocz do kontynentu",
	"btnExportSettings": "Eksportuj ustawienia", 
	"btnExportSettings_toolTip": "Eksportuje ustawienia do postaci tekstowej",
	"btnImportSettings": "Importyj ustawienia",			
	"btnImportSettings_toolTip": "Importuje ustawienia. Aktualne ustawienia zostaną usunięte",	
	"fetching resources, please wait": "Pobieram zasoby, proszę czekać",
	"btnFetchCities": "Pobierz miasta",
	"btnFetchCities_toolTip": "Symuluje odwiedziny miast, aby pobrać ich dane. Funkcja wywoływan jest co 0.5s tak więc jest to wolne przy dużej liczbie miast",
	"btnTxtExport": "Eksport tekstowy",
	
	"": ""
  }
  
};

function tr(messageId) {
	var locale = qx.locale.Manager.getInstance().getLocale();
	
	if (bosLocalizedStrings[locale] != undefined && bosLocalizedStrings[locale][messageId] != undefined) {
		return bosLocalizedStrings[locale][messageId];
	}
	
	if (bosLocalizedStrings["en"][messageId] != undefined) {
		return bosLocalizedStrings["en"][messageId];
	}
	
	return messageId;
}

qx.Class.define("bos.gui.ResourcesFillerWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		this.setLayout(new qx.ui.layout.Dock());
		
		this.set({
			width: 500,
			minWidth: 200,
			maxWidth: 600,
			height: 350,
			minHeight: 200,
			maxHeight: 600,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("fill with resources")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {flex: true});
		
		scroll.add(this.createForm());		

		container.add(this.createFooter());
		
		this.add(container);
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);

	}, 
	members: {
		toX: null,
		toY: null,
		sbResType: null,
		maxResourcesInput: null,
		maxTravelTimeInput: null,
		cbAllowSameContinent: null,
		cbAllowOtherContinent: null,
		cbPalaceSupport: null,
		lblTarget: null,
		cityInfos: {},
		activateOverlay: function(activated) {
			//nothing
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button(tr("request resources"));
			btnAdd.setWidth(160);					
			container.add(btnAdd);
			btnAdd.addListener("click", this.fillResources, this);
			
			return container;
		}, 
		fillResources: function() {

			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			if (toX == 0 && toY == 0) {
				bos.Utils.handleWarning(tr("invalid destination"));
				return;					
			}			
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			if (this.cityInfos[cityId] == undefined || this.cityInfos[cityId] == null) {
				alert("Please click search button");
				return;
			}			
			var targetCityInfo = this.cityInfos[cityId];			
						
			var req = {
				maxResourcesToBeSent: parseInt(this.maxResourcesInput.getValue()),
				cityId: cityId,
				maxTravelTime: parseInt(this.maxTravelTimeInput.getValue()),
				targetPlayer: targetCityInfo.pn,
				palaceSupport: this.cbPalaceSupport.getValue(),
				resType: parseInt(this.sbResType.getSelection()[0].getModel()),
				allowSameContinent: this.cbAllowSameContinent.getValue(),
				allowOtherContinent: this.cbAllowOtherContinent.getValue()
			}
			bos.ResourcesFiller.getInstance().populateCityWithResources(req);
						
			//this.close();			
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			var selectWidth = 320;		
			var row = 0;
			
			container.add(new qx.ui.basic.Label(tr("resource type")), {
				row: row, 
				column : 0
			});					
			this.sbResType = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});				
			this.sbResType.add(new qx.ui.form.ListItem(tr("wood"), null, bos.Const.WOOD));
			this.sbResType.add(new qx.ui.form.ListItem(tr("stone"), null, bos.Const.STONE));
			this.sbResType.add(new qx.ui.form.ListItem(tr("iron"), null, bos.Const.IRON));
			this.sbResType.add(new qx.ui.form.ListItem(tr("food"), null, bos.Const.FOOD));
			container.add(this.sbResType, {
				row: row,
				column: 1
			});
			row++;

			container.add(new qx.ui.basic.Label(tr("to")), {
				row: row, 
				column : 0
			});	
			var containerXY = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			
			this.toX = new qx.ui.form.TextField("");
			this.toX.setWidth(40);			
			containerXY.add(this.toX);
			this.toY = new qx.ui.form.TextField("");
			this.toY.setWidth(40);			
			containerXY.add(this.toY);
			
			var btnSearchTarget = new qx.ui.form.Button(tr("search"));
			btnSearchTarget.setWidth(80);					
			container.add(btnSearchTarget);
			btnSearchTarget.addListener("click", this.searchTarget, this);
			containerXY.add(btnSearchTarget);
			
			var btnCurrentCity = new qx.ui.form.Button(tr("current city"));
			btnCurrentCity.setWidth(120);					
			container.add(btnCurrentCity);
			btnCurrentCity.addListener("click", this.setCurrentCityAsTarget, this);
			containerXY.add(btnCurrentCity);			
			
			container.add(containerXY, {
				row: row, 
				column : 1
			});
			row++;
			
			/*
			this.lblTarget = new qx.ui.basic.Label("");
			container.add(this.lblTarget, {
				row: row, 
				column : 1
			});			
			row++;
			*/
			
			container.add(new qx.ui.basic.Label(tr("max resources to send")), {
				row: row, 
				column : 0
			});
			
			var resContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxResourcesInput = new webfrontend.gui.SpinnerInt(0, 0, 100000000);
			this.maxResourcesInput.setWidth(100);
			resContainer.add(this.maxResourcesInput);
			
			resContainer.add(this._createIncreaseAmountBtn("500k", 500000));
			resContainer.add(this._createIncreaseAmountBtn("1M", 1000000));
			resContainer.add(this._createIncreaseAmountBtn("5M", 5000000));
			resContainer.add(this._createIncreaseAmountBtn("10M", 10000000));		
			
			container.add(resContainer, {
				row: row,
				column: 1
			});		
			row++;
			
			container.add(new qx.ui.basic.Label(tr("max travel time")), {
				row: row, 
				column : 0
			});
			var timeContainer = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			this.maxTravelTimeInput = new webfrontend.gui.SpinnerInt(24, 1, 96);
			this.maxTravelTimeInput.setWidth(100);
			timeContainer.add(this.maxTravelTimeInput);
			
			timeContainer.add(this._createMaxTravelTimeBtn("24h", 24));
			timeContainer.add(this._createMaxTravelTimeBtn("48h", 48));
			timeContainer.add(this._createMaxTravelTimeBtn("96h", 96));
			
			container.add(timeContainer, {
				row: row,
				column: 1
			});		
			row++;			

			this.cbAllowSameContinent = new qx.ui.form.CheckBox(tr("cbAllowSameContinent"));
			this.cbAllowSameContinent.setToolTipText(tr("cbAllowSameContinent_toolTip"));
			this.cbAllowSameContinent.setValue(true);
			container.add(this.cbAllowSameContinent, {
				row: row,
				column: 1
			});
			row++;
			
			this.cbAllowOtherContinent = new qx.ui.form.CheckBox(tr("cbAllowOtherContinent"));
			this.cbAllowOtherContinent.setToolTipText(tr("cbAllowOtherContinent_toolTip"));
			this.cbAllowOtherContinent.setValue(true);
			container.add(this.cbAllowOtherContinent, {
				row: row,
				column: 1
			});	
			row++;

			this.cbPalaceSupport = new qx.ui.form.CheckBox(tr("cbPalaceSupport"));
			this.cbPalaceSupport.setToolTipText(tr("cbPalaceSupport_toolTip"));
			this.cbPalaceSupport.setValue(false);
			container.add(this.cbPalaceSupport, {
				row: row,
				column: 1
			});	
			row++;			
					
			return box;
		}, 
		_createMaxTravelTimeBtn: function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting", 
				font: "bold",
				width: 50
			});
			
			btn.addListener("click", function(event) {
				this.maxTravelTimeInput.setValue(amount);
			}, this);
			return btn;
		},
		_createIncreaseAmountBtn: function(label, amount) {
			var btn = new qx.ui.form.Button(label).set({
				appearance: "button-recruiting", 
				font: "bold",
				width: 50
			});
			
			btn.addListener("click", function(event) {
				this.maxResourcesInput.setValue(this.maxResourcesInput.getValue() + amount);
			}, this);
			return btn;
		},
		searchTarget: function() {
			
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
				id: cityId
			}, this, this._onCityInfo, cityId);
		},
		_onCityInfo: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.cityInfos[cityId] = result;
			}
		},
		setCurrentCityAsTarget: function() {
			this.editedRoute = null;
			var city = webfrontend.data.City.getInstance();
			var coords = bos.Utils.convertIdToCoordinatesObject(city.getId());
			this.toX.setValue("" + coords.xPos);
			this.toY.setValue("" + coords.yPos);
			this.cityInfos[city.getId()] = {
				pn: webfrontend.data.Player.getInstance().getName()
			}			
			
			var resType = parseInt(this.sbResType.getSelection()[0].getModel());
			
			var server = bos.Server.getInstance();
			var bosCity = server.cities[city.getId()];
			if (bosCity != null) {			
				var freeSpace = Math.max(0, parseInt(bosCity.getResourceMaxStorage(resType)) - parseInt(bosCity.getTradeIncomingResources(resType)) - parseInt(bosCity.getResourceCount(resType)));			
				this.maxResourcesInput.setValue(freeSpace);			
			}
		}
	}
});

qx.Class.define("bos.BatchResourcesFiller", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		this.timer = new qx.event.Timer(1000);
		this.timer.addListener("interval", this._sendPendingFillRequest, this);	
	},
	properties: {

	},
	members: {
		timer: null,
		_progressDialog: null,
		fillRequests: new Array(),
		fillCitiesWithResources: function(cities, resType) {
			var server = bos.Server.getInstance();
			for (var i = 0, count = cities.length; i < count; i++) {
				var cityId = cities[i];
				var city = server.cities[cityId];
				if (city == null) {
					continue;
				}
				this.fillRequests.push({
					city: city,
					resType: resType
				});
			}
			
			this._disposeProgressDialog();

			this._progressDialog = new webfrontend.gui.ConfirmationWidget();
			this._progressDialog.showInProgressBox(tr("cities to be filled: ") + this.fillRequests.length);
			qx.core.Init.getApplication().getDesktop().add(this._progressDialog, {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			});
			this._progressDialog.show();
			this.timer.start();
		},
		_sendPendingFillRequest: function() {
			if (this.fillRequests.length == 0) {
				this.timer.stop();
				this._disposeProgressDialog();
				return;
			}
			if (bos.net.CommandManager.getInstance().getNumberOfPendingCommands() == 0) {
				this._progressDialog.showInProgressBox(tr("cities to be filled: ") + this.fillRequests.length);
				
				var req = this.fillRequests[0];
				this.fillRequests.splice(0, 1);
				this.fillCityWithResources(req.city, req.resType);				
			}
		},
		fillCityWithResources: function(city, resType) {
				
			var cityId = city.getId();
			var playerName = webfrontend.data.Player.getInstance().getName();			
			
			var freeSpace = Math.max(0, parseInt(city.getResourceMaxStorage(resType)) - parseInt(city.getTradeIncomingResources(resType)) - parseInt(city.getResourceCount(resType)));
			if (freeSpace < bos.Const.SHIP_CAPACITY) {
				return;
			}
			
			var req = {
				maxResourcesToBeSent: freeSpace,
				cityId: cityId,
				maxTravelTime: 48,
				targetPlayer: playerName,
				palaceSupport: false,
				resType: resType,
				allowSameContinent: true,
				allowOtherContinent: true
			}
			bos.ResourcesFiller.getInstance().populateCityWithResources(req);			
		},
		_disposeProgressDialog: function() {
			if (this._progressDialog != null) {
				this._progressDialog.disable();
				this._progressDialog.destroy();
				this._progressDialog = null;
			}
		}	
	}
});

qx.Class.define("bos.ResourcesFiller", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		
	},
	properties: {

	},
	members: {
		lastStatus: null,
		populateCityWithResources: function(request) {			
			bos.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
				cityid: request.cityId,
				resType: request.resType,
				minResource: bos.Const.SHIP_CAPACITY,
				maxTime: request.maxTravelTime * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
			}, this, this._processTradeSearchResources, request);
		}, 
		_processTradeSearchResources: function(result, n, request) {
			if (result == false || n == null) return;

			var cities = new Array();
			var transports = new Array();
			
			var destCoords = bos.Utils.convertIdToCoordinatesObject(request.cityId);

			for (var i = 0; i < n.length; i++) {
				var city = n[i];
				var srcCoords = bos.Utils.convertIdToCoordinatesObject(city.i);
				
				if (city.i == request.cityId || city.sg) {
					continue;
				}
				if (destCoords.cont == srcCoords.cont && !request.allowSameContinent) {
					continue;
				} else if (destCoords.cont != srcCoords.cont && !request.allowOtherContinent) {
					continue;
				}
				
				if (request.resType == bos.Const.FOOD) {
					var playerCities = webfrontend.data.Player.getInstance().cities;					
					var type = bos.CityTypes.getInstance().parseReference(playerCities[city.i].reference);
					if (type.isCastle) {
						continue;
					}
				}
				
				cities.push(city);
				
				if (city.lt > 0) {
					transports.push({
						cityIndex: cities.length - 1,
						capacity: city.la,
						travelTime: city.lt,
						land: true
					});
				}
				if (city.st > 0) {
					transports.push({
						cityIndex: cities.length - 1,
						capacity: city.sa,
						travelTime: city.st,
						land: false
					});					
				}

			}

			transports.sort(function(a, b) {
				if (a.travelTime > b.travelTime) {
					return 1;
				} else if (a.travelTime < b.travelTime) {
					return -1;
				} else {
					return 0;
				}
			});

			var toBeSent = request.maxResourcesToBeSent;			
			for (var i = 0, count = transports.length; i < count; i++) {
				var transport = transports[i];
				var city = cities[transport.cityIndex];
				var srcCoords = bos.Utils.convertIdToCoordinatesObject(city.i);
				
				if (toBeSent <= 0) {
					break;
				}
				
				var resCount = Math.min(city.rc, transport.capacity, toBeSent);				
				if (resCount <= 0) {
					continue;
				}
								
				var trade = {
					cityid: city.i,
					tradeTransportType: transport.land ? 1 : 2,
					targetPlayer: request.targetPlayer,
					targetCity: destCoords.xPos + ":" + destCoords.yPos,
					palaceSupport: request.palaceSupport,
					res: new Array()
				};
				
				trade.res.push({
					t: request.resType,
					c: resCount					
				});				
				
				city.rc -= resCount;
				toBeSent -= resCount;
				
				bos.net.CommandManager.getInstance().sendCommand("TradeDirect", trade, this, this._onTradeDirectSendDone, trade);	
			}

		},
		_onTradeDirectSendDone: function(isOk, result, param) {
			this.lastStatus = result;
			//console.log(isOk + " " + result + " " + param);
		}		
	}
});


qx.Class.define("bos.Server", {
	extend: qx.core.Object,
	type: "singleton",
	construct: function() {
		//webfrontend.base.Timer.getInstance().addListener("uiTick", this.updateCity, this);
		//webfrontend.data.City.getInstance().addListener("changeCity", this.onCityChanged, this);
		webfrontend.data.City.getInstance().addListener("changeVersion", this.updateCity, this);
				
		this.persistCityTimer = new qx.event.Timer(5500);
		this.persistCityTimer.addListener("interval", this._persistPendingCity, this);	
		this.persistCityTimer.start();

		this._pollCityTimer = new qx.event.Timer(bos.Const.MIN_SEND_COMMAND_INTERVAL);
		this._pollCityTimer.addListener("interval", this._pollNextCity, this);		
	}, 
	properties: {
		lastUpdatedCityId: {
			init: false,
			event: "bos.data.changeLastUpdatedCityId"
		}, 
		lastUpdatedCityAt: {
			init: false
		}, 
		cityResourcesUpdateTime: {
			init: null,
			event: "bos.data.changeCityResourcesUpdateTime"
		}
	}, 
	members: {
		cities: new Object(),
		cityResources: new Object(),
		como: new Object(),
		_citiesToPoll: new Array(),
		_citiesToPersist: new Array(),
		_dirtyCities: new Object(),
		persistCityTimer: null,
		_pollCitiesProgressDialog: null,
		sectors: new Object(),
		onCityChanged: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}
			this.markCityDirty(city.getId());			
		},
		markCityDirty: function(s) {
			var cityId = parseInt(s, 10);
			var dirty = this._dirtyCities[cityId] || false;
			if (!dirty) {
				this._dirtyCities[cityId] = true;
				this._citiesToPersist.push(cityId);
			}
		},
		_persistPendingCity: function() {
			if (this._citiesToPersist.length == 0) {
				return;
			}
			var cityId = this._citiesToPersist[0];
			this._dirtyCities[cityId] = false;
			this._citiesToPersist.splice(0, 1);
			this.persistCity(cityId);
			return;
		},
		persistCity: function(cityId) {
			if (!bos.Storage.getInstance().getPersistingCitiesEnabled()) {
				return;
			}
			var prevCity = this.cities[cityId];
			if (prevCity != null) {
				try {
					bos.Storage.getInstance().saveCity(prevCity);
				} catch (e) {
					bos.Storage.getInstance().setPersistingCitiesEnabled(false);
					bos.Utils.handleError("Error when trying to persist city " + prevCity.getName() + ". Persisting has been disabled. Error: " + e);
				}
			}
		},
		persistAllPendingCities: function() {
			if (confirm("there are " + this._citiesToPersist.length + " cities to be saved, continue?")) {
				var count = 0;
				while (this._citiesToPersist.length > 0) {
					this._persistPendingCity();
					count++;
				}
				alert("Persisted " + count + " cities");
			}
		},
		pollCities: function(citiesToPoll) {
			this._citiesToPoll = citiesToPoll;
			
			this._disposePollCitiesProgressDialog();
			this._pollCitiesProgressDialog = new webfrontend.gui.ConfirmationWidget();
			this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch: ") + this._citiesToPoll.length);
			qx.core.Init.getApplication().getDesktop().add(this._pollCitiesProgressDialog, {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0
			});
			this._pollCitiesProgressDialog.show();
		
			this._pollCityTimer.start();
		},
		pollAllCities: function() {
			var citiesToPoll = [];		
		
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				if (qx.lang.Type.isNumber(cityId)) {
					citiesToPoll.push(cityId);
				}
			}
			
			this.pollCities(citiesToPoll);
		},
		_disposePollCitiesProgressDialog: function() {
			if (this._pollCitiesProgressDialog != null) {
				this._pollCitiesProgressDialog.disable();
				this._pollCitiesProgressDialog.destroy();
				this._pollCitiesProgressDialog = null;
			}
		}, 		
		_pollNextCity: function() {
			if (this._citiesToPoll.length > 0) {
				var cityId = this._citiesToPoll[0];
				this._citiesToPoll.splice(0, 1);
				bos.net.CommandManager.getInstance().pollCity(cityId);
				
				this._pollCitiesProgressDialog.showInProgressBox(tr("cities to fetch: ") + this._citiesToPoll.length);
			} else {
				this._pollCityTimer.stop();
				this._disposePollCitiesProgressDialog();
			}
		},
		updateCity: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getId() == -1) {
				return;
			}

//bos.Utils.handleError(city.getId() + " " + city.getVersion());			
			
			//do not update the same city too often
			/*
			if (this.getLastUpdatedCityId() != null && this.getLastUpdatedCityId() == city.getId()) {
				var diff = new Date() - this.getLastUpdatedCityAt();
				if (diff < 10) {
					return;
				}
			}
*/
			var c = new bos.City();
			c.populate(city);
			if (this.cities[c.getId()] != undefined) {
				//alert("DELETE");
				this.cities[c.getId()].dispose();
				//this._disposeObjects(this.cities[c.getId()]);
				//delete this.cities[c.getId()];
			}
			this.cities[c.getId()] = c;

			this.setLastUpdatedCityId(c.getId());
			this.setLastUpdatedCityAt(new Date());
			
			this.markCityDirty(city.getId());
		},
		addCOMOItem: function(item) {
			this.como[item.i] = item;
			this.updateCityFromCOMOItem(item);
		},
		updateCityFromCOMOItem: function(item) {
			if (this.cities[item.i] == undefined) {
				return;
			}
			var city = this.cities[item.i];
			city.units = new Object();
			city.unitOrders = new Array();
			
			for (var i = 0; i < item.c.length; i++) {
				var command = item.c[i];
				var units = new Array();
				for (var j = 0; j < command.u.length; j++) {
					var unit = command.u[j];
					
					if (command.i == 0) {						
						city.units[unit.t] = {
							count: unit.c,
							total: unit.c,
							speed: -1
						};
					} else {
						var cityUnits = city.units[unit.t];
						if (cityUnits == undefined) {
							city.units[unit.t] = {
								count: 0,
								total: 0,
								speed: -1							
							}
							cityUnits = city.units[unit.t];
						}
						if (command.d == 0) {
							//delayed order cannot increase troop count
							cityUnits.total += unit.c;
						}
					}
					
					units.push({
						type: unit.t,
						count: unit.c
					});
				}
				
				if (command.i != 0) {
				//{"i":26722474,"t":8,"s":2,"cn":"Mountain:9","c":7995428,"pn":"","p":0,"e":19024467,"d":0,"q":0,"r":1,"u":[{"t":6,"c":129237}]}]},
				
					var order = {
						id: command.i,
						type: command.t,
						state: command.s,
						//start: command.ss,
						start: null,
						end: command.e,
						city: command.c,
						cityName: command.cn,
						player: command.p,
						playerName: command.pn,
						//alliance: command.a,
						//allianceName: command.an,
						units: units,
						isDelayed: command.d,
						recurringType: command.r,
						//recurringEndStep: command.rs,
						quickSupport: command.q
					};
					city.unitOrders.push(order);				
				}
			}			
		}		
	}
});

qx.Class.define("bos.Storage", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		try {
			qx.Bootstrap.setDisplayName(this, "bos.Storageoooo");
			this._player = webfrontend.data.Player.getInstance().getId();
			
			var options = this._loadOptions();
			if (options != null) {
				if (options.optionsFormatVersion != bos.Storage.OPTIONS_FORMAT_VERSION) {
					bos.Utils.handleError("This script version requires options to be in new format. Default values has been applied. Please set options again. Sorry for inconvenience");
					this.deleteAllSavedData();
					this.saveOptions(); //force saving defaults
				} else {
					this._applyOptions(options);
				}
			}

			var saved = this.getSavedCities();
			this._savedCities = [];
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];

				this._savedCities["c" + cityId] = cityId;
			}			
		} catch (e) {
			bos.Utils.handleError("Error loading LoU BOS settings: " + e + ".\nIt may mean that you browser has disabled local storage.\nTo turn local storage on - in Firefox please open page 'about:config' and make sure that in 'dom.storage.enabled' you have true value. For Firefox please make sure that you have cookies enabled");
		}
	}, 
	statics: {
		OPTIONS_FORMAT_VERSION: 0
	}, 
	properties: {
		persistingCitiesEnabled: {
			init: true
		}, 
		loadPersistedCitiesAtStart: {
			init: true
		}, 
		optionsFormatVersion: {
			init: 0
		}, 
		loadTableSettingsAtStart: {
			init: false
		}, 
		citiesTableSettings: {
			init: null
		}, 
		militaryTableSettings: {
			init: null
		}, 
		moonstonesTableSettings: {
			init: null
		}, 
		moonglowTowers: {
			init: []
		}, 
		customCityTypes: {
			init: []
		}, 
		summaryPosition: {
			init: null
		}, 
		tradeRoutesVersion: {
			init: 0,
			event: "changeTradeRoutesVersion"
		},
		recruitmentOrdersVersion: {
			init: 0,
			event: "changeRecruitmentOrdersVersion"
		},
		intelligenceVersion: {
			init: 0,
			event: "changeIntelligenceVersion"
		},
		customCityTypesVersion: {
			init: 0,
			event: "changeCustomCityTypesVersion"
		},		
		tweakReportAtStart: {
			init: false	
		}, 
		tweakChatAtStart: {
			init: false
		}, 
		startRefreshingResourcesAtStart: {
			init: false
		}
	}, members: {
		_savedCities: null,		
		_citiesWithMooglowTower: null,
		_tradeRoutes: null,
		_recruitmentOrders: null,
		_intelligence: null,
		_player: "",
		_getValue: function(key, namespace) {
			var result = GM_getValue(this._calculateKey(key, namespace, true));
			if (result == null) {
				result = GM_getValue(this._calculateKey(key, namespace, false));
			}
			return result;
		}, 
		_setValue: function(key, value, namespace) {
			GM_setValue(this._calculateKey(key, namespace, true), value);		
		}, 
		_calculateKey: function(key, namespace, withPlayer) {
			if (namespace == undefined) {
				namespace = "Storage";
			}		
			if (withPlayer == undefined) {
				withPlayer = true;
			}
			if (withPlayer) {
				return "bos." + this._player + "." + namespace + "." + key;				
			} else {
				return "bos." + namespace + "." + key;
			}
		}, 
		_loadOptions: function() {
			var json = this._getValue("options");
			var options = null;
			if (json != null) {
				options = qx.util.Json.parse(json);
			}
			return options;
		}, 
		_applyOptions: function(options) {
			this.setOptionsFormatVersion(options.optionsFormatVersion);
			this.setPersistingCitiesEnabled(options.persistingCitiesEnabled);
			this.setLoadPersistedCitiesAtStart(options.loadPersistedCitiesAtStart);
			this.setCitiesTableSettings(options.citiesTableSettings);
			this.setMilitaryTableSettings(options.militaryTableSettings);
			if (options.moonstonesTableSettings != undefined) {
				this.setMoonstonesTableSettings(options.moonstonesTableSettings);
			}
			if (options.loadTableSettingsAtStart != undefined) {
				this.setLoadTableSettingsAtStart(options.loadTableSettingsAtStart);
			}
			if (options.moonglowTowers != undefined) {
				this.setMoonglowTowers(options.moonglowTowers);
			}
			if (options.customCityTypes != undefined) {
				this.setCustomCityTypes(options.customCityTypes);
			}
			if (options.summaryPosition != undefined) {
				this.setSummaryPosition(options.summaryPosition);
			}
			if (options.tweakReportAtStart != undefined) {
				this.setTweakReportAtStart(options.tweakReportAtStart);
			}
			if (options.tweakChatAtStart != undefined) {
				this.setTweakChatAtStart(options.tweakChatAtStart);
			}
			if (options.startRefreshingResourcesAtStart != undefined) {
				this.setStartRefreshingResourcesAtStart(options.startRefreshingResourcesAtStart);
			}						
		}, 
		saveCity: function(city) {
			var simple = city.toSimpleObject();
			var json = qx.util.Json.stringify(simple);
			this._setValue(city.getId(), json, "City");

			this._savedCities["c" + city.getId()] = city.getId();
			this._saveSavedCities();
		}, 
		loadCity: function(cityId) {
			var json = this._getValue(cityId, "City");
			if (json == null)
				return null;
			var parsed = qx.util.Json.parse(json);
			var city = bos.City.createFromSimpleObject(parsed);
			return city;
		}, 
		_calculateCityKey: function(cityId) {			
			return "bos.City." + cityId;			
		}, 
		getSavedCities: function() {
			var s = this._getValue("index", "City");
			var cities = [];
			if (s != null) {
				cities = qx.util.Json.parse(s);
			}
			return cities;
		}, 
		_saveSavedCities: function() {
			var cities = [];
			for (var key in this._savedCities) {
				var cityId = parseInt(key.substring(1));
				if (!isNaN(cityId)) {
					cityId = parseInt(this._savedCities[key]);
					if (!isNaN(cityId)) {
							cities.push(cityId);
					}
				}
			}

			var json = qx.util.Json.stringify(cities);
			this._setValue("index", json, "City");
		}, 
		deleteAllSavedData: function() {
			var saved = this.getSavedCities();
			for (var i = 0; i < saved.length; i++) {
				var cityId = saved[i];
				GM_deleteValue(this._calculateKey(cityId, "City"));
			}
			GM_deleteValue(this._calculateKey("index", "City"));

			this._savedCities = [];
		}, 
		saveOptions: function() {
			var o = {
				persistingCitiesEnabled: this.getPersistingCitiesEnabled(),
				loadPersistedCitiesAtStart: this.getLoadPersistedCitiesAtStart(),
				tweakChatAtStart: this.getTweakChatAtStart(),				
				tweakReportAtStart: this.getTweakReportAtStart(),
				startRefreshingResourcesAtStart: this.getStartRefreshingResourcesAtStart(),
				
				loadTableSettingsAtStart: this.getLoadTableSettingsAtStart(),							
				citiesTableSettings: this.getCitiesTableSettings(),
				militaryTableSettings: this.getMilitaryTableSettings(),
				moonstonesTableSettings: this.getMoonstonesTableSettings(),
				summaryPosition: this.getSummaryPosition(),
									
				moonglowTowers: this.getMoonglowTowers(),
				customCityTypes: this.getCustomCityTypes(),
				optionsFormatVersion: bos.Storage.OPTIONS_FORMAT_VERSION
			}
			var json = qx.util.Json.stringify(o);
			this._setValue("options", json);
						
		}, 
		setTableSettings: function(settings, tableName) {
			//not the best way to do it
			switch (tableName) {
				case "cities":
					this.setCitiesTableSettings(settings);
					break;
				case "military":
					this.setMilitaryTableSettings(settings);
					break;
				case "moonstones":
					this.setMoonstonesTableSettings(settings);
					break;
				default:
					bos.Utils.handleError("Unknown table name " + tableName);
					break;
			}
		}, 
		addMoonglowTower: function(cityId, towerId) {		
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					o.towerId = towerId;
					this.saveOptions();
					return;
				}
			}
			var t = {
				cityId: cityId,
				towerId: towerId
			};
			this.getMoonglowTowers().push(t);
			this._citiesWithMooglowTower = null;
			this.saveOptions();
		}, 
		removeMoonglowTower: function(cityId) {
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {
					this.getMoonglowTowers().splice(i, 1);
					this._citiesWithMooglowTower = null;
					this.saveOptions();
					return;
				}
			}								
		}, 
		findMoonglowTowerId: function(cityId) {
			var withMoonglow = this.getCitiesWithMooglowTower();
			if (withMoonglow["c" + cityId] == undefined) {
				return -1;
			} else {
				return withMoonglow["c" + cityId];
			}
			/*
			for (var i = 0; i < this.getMoonglowTowers().length; i++) {
				var o = this.getMoonglowTowers()[i];
				if (o.cityId == cityId) {											
					return o.towerId;
				}
			}
			return -1;
			*/
		}, 
		getCitiesWithMooglowTower: function() {
			if (this._citiesWithMooglowTower == null) {
				this._citiesWithMooglowTower = [];
				for (var i = 0; i < this.getMoonglowTowers().length; i++) {
					var o = this.getMoonglowTowers()[i];
					this._citiesWithMooglowTower["c" + o.cityId] = o.towerId;
				}										
			}
			return this._citiesWithMooglowTower;
		}, 
		addCustomCityType: function(letter, description) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					o.description = description;
					return;
				}
			}
			var t = {
				letter: letter,
				description: description
			};
			this.getCustomCityTypes().push(t);

			this.setCustomCityTypesVersion(this.getCustomCityTypesVersion() + 1);			
		}, 
		removeCustomCityType: function(letter) {
			for (var i = 0; i < this.getCustomCityTypes().length; i++) {
				var o = this.getCustomCityTypes()[i];
				if (o.letter == letter) {
					this.getCustomCityTypes().splice(i, 1);							
					return;
				}
			}

			this.setCustomCityTypesVersion(this.getCustomCityTypesVersion() + 1);			
		}, 
		loadTradeRoutes: function() {
			this._tradeRoutes = [];
			var json = this._getValue("tradeRoutes");			
			if (json != null) {
				this._tradeRoutes = qx.util.Json.parse(json);
			}
			return this._tradeRoutes;
		}, 
		getTradeRoutes: function() {
			if (this._tradeRoutes == null) {
				this.loadTradeRoutes();
			}
			return this._tradeRoutes;		
		}, 
		saveTradeRoutes: function() {
			var json = qx.util.Json.stringify(this._tradeRoutes);
			this._setValue("tradeRoutes", json);			
		}, 
		addTradeRoute: function(route) {
			route.id = this._tradeRoutes.length + 1;
			this._tradeRoutes.push(route);
			this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
			this.saveTradeRoutes();
			return route.id;
		}, 
		removeTradeRoute: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {
					this._tradeRoutes.splice(i, 1);
					this.setTradeRoutesVersion(this.getTradeRoutesVersion() + 1);
					this.saveTradeRoutes();
					return true;
				}
			}
			return false;
		},
		findTradeRouteById: function(routeId) {
			for (var i = 0; i < this._tradeRoutes.length; i++) {
				var r = this._tradeRoutes[i];
				if (r.id == routeId) {					
					return r;
				}
			}
			return null;			
		},
		importTradeRoutes: function(json) {
			try {
				var required = ["from", "to", "wood", "stone", "iron", "food", "transport", "group"];
				var orders = qx.util.Json.parse(json);
				for (var i = 0; i < orders.length; i++) {
					var order = orders[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!order.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(order);
							return;
						}
					}
				}				
				
				this._tradeRoutes = orders;
				this.saveTradeRoutes();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},		
		loadRecruitmentOrders: function() {
			this._recruitmentOrders = [];
			var json = this._getValue("recruitmentOrders");			
			if (json != null) {
				this._recruitmentOrders = qx.util.Json.parse(json);
			}
			return this._recruitmentOrders;
		}, 
		getRecruitmentOrders: function() {
			if (this._recruitmentOrders == null) {
				this.loadRecruitmentOrders();
			}
			return this._recruitmentOrders;		
		}, 
		saveRecruitmentOrders: function() {
			var json = qx.util.Json.stringify(this._recruitmentOrders);
			this._setValue("recruitmentOrders", json);			
		}, 
		addRecruitmentOrder: function(order) {			
			this._recruitmentOrders.push(order);
			this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
			this.saveRecruitmentOrders();
		}, 
		removeRecruitmentOrder: function(cityId) {
			for (var i = 0; i < this._recruitmentOrders.length; i++) {
				var o = this._recruitmentOrders[i];
				if (o.cityId == cityId) {
					this._recruitmentOrders.splice(i, 1);
					this.setRecruitmentOrdersVersion(this.getRecruitmentOrdersVersion() + 1);
					this.saveRecruitmentOrders();
					return true;
				}
			}
			return false;
		},
		findRecruitmentOrderById: function(cityId) {
			for (var i = 0; i < this.getRecruitmentOrders().length; i++) {
				var o = this.getRecruitmentOrders()[i];
				if (o.cityId == cityId) {					
					return o;
				}
			}
			return null;			
		},
		importRecruitmentOrders: function(json) {
			try {
				var required = ["cityId", "units"];
				var orders = qx.util.Json.parse(json);
				for (var i = 0; i < orders.length; i++) {
					var order = orders[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!order.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(order);
							return;
						}
					}
				}				
				
				this._recruitmentOrders = orders;
				this.saveRecruitmentOrders();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},

		loadIntelligence: function() {
			this._intelligence = [];
			var json = this._getValue("intelligence");			
			if (json != null) {
				this._intelligence = qx.util.Json.parse(json);
			}
			return this._intelligence;
		}, 
		getIntelligence: function() {
			if (this._intelligence == null) {
				this.loadIntelligence();
			}
			return this._intelligence;		
		}, 
		saveIntelligence: function() {
			var json = qx.util.Json.stringify(this._intelligence);
			this._setValue("intelligence", json);			
		}, 
		addIntelligence: function(intel) {			
			this.getIntelligence().push(intel);
			this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
			this.saveIntelligence();
		}, 
		removeIntelligence: function(cityId) {
			for (var i = 0; i < this._intelligence.length; i++) {
				var o = this._intelligence[i];
				if (o.cityId == cityId) {
					this._intelligence.splice(i, 1);
					this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
					this.saveIntelligence();
					return true;
				}
			}
			return false;
		},
		findIntelligenceById: function(cityId) {
			for (var i = 0; i < this.getIntelligence().length; i++) {
				var o = this.getIntelligence()[i];
				if (o.cityId == cityId) {					
					return o;
				}
			}
			return null;			
		},
		mergeIntelligence: function(json) {
			try {
				var required = ["cityId", "name", "isLandlocked", "hasCastle", "owner", "description", "lastModified", "modifiedBy"];
				var intelligence = qx.util.Json.parse(json);
				for (var i = 0; i < intelligence.length; i++) {
					var intel = intelligence[i];
					for (var j = 0; j < required.length; j++) {
						var prop = required[j];
						if (!intel.hasOwnProperty(prop)) {
							bos.Utils.handleError("Element " + i + " is missing required property " + prop);
							dumpObject(intel);
							return;
						}
					}
				}

				for (var i = 0; i < intelligence.length; i++) {
					var intel = intelligence[i];
					var old = this.findIntelligenceById(intel.cityId);
					if (old == null) {
						this.addIntelligence(intel);
					} else if (intel.lastModified > old.lastModified) {
						if (confirm("Would you like to replace intel for '" + old.name + "' - '" + old.description + "' with '" + intel.description + "'?")) {
							for (var j = 0; j < this.getIntelligence().length; j++) {
								var o = this.getIntelligence()[j];
								if (o.cityId == intel.cityId) {					
									this.getIntelligence()[j] = intel;								
									break;
								}
							}
						}						
					}
				}
				
				this.saveIntelligence();
				this.setIntelligenceVersion(this.getIntelligenceVersion() + 1);
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},		
		getPurifyOptions: function() {
			var json = this._getValue("purifyOptions");
			var options;
			if (json != null) {
				options = qx.util.Json.parse(json);
			} else {
				options = {					
					includeCastles: false,
					useRecruitmentData: false,
					ministerBuildPresent: webfrontend.data.Player.getInstance().getMinisterTradePresent()
				};
				
				if (options.ministerBuildPresent) {
					options.minimumResLevels = [0, 20, 20, 20, 20];
				} else {
					options.minimumResLevels = [0, 50000, 50000, 50000, 50000];
				}
			}
			return options;
		},
		savePurifyOptions: function(options) {
			options.ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			var json = qx.util.Json.stringify(options);
			this._setValue("purifyOptions", json);
		}
	}
});

qx.Class.define("bos.net.CommandManager", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		this._sendTimer = new qx.event.Timer(bos.Const.MIN_SEND_COMMAND_INTERVAL);
		this._sendTimer.addListener("interval", this.sendPendingCommand, this);	
		this._sendTimer.start();		
	},
	properties: {
		lastSendCommand: {
			init: 0
		}
	},
	members: {
		_toSend: [],
		_sendTimer: null,
		sendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			if (now - this.getLastSendCommand() >= bos.Const.MIN_SEND_COMMAND_INTERVAL) {
				this.forcedSendCommand(endPoint, request, context, onSendDone, extraValue);
			} else {
				this._toSend.push({
					endPoint: endPoint, 
					request: request, 
					context: context, 
					onSendDone: onSendDone, 
					extraValue: extraValue
				});
			}
		},
		getNumberOfPendingCommands: function() {
			return this._toSend.length;
		},
		forcedSendCommand: function(endPoint, request, context, onSendDone, extraValue) {
			var now = (new Date()).getTime();
			webfrontend.net.CommandManager.getInstance().sendCommand(endPoint, request, context, onSendDone, extraValue);			
			this.setLastSendCommand(now);		
		}, 
		sendPendingCommand: function() {
			if (this._toSend.length > 0) {
				var o = this._toSend[0];
				this._toSend.splice(0, 1);
				this.forcedSendCommand(o.endPoint, o.request, o.context, o.onSendDone, o.extraValue);
			}
		},
		pollCity: function(cityId) {
			var sb = new qx.util.StringBuilder(2048);
			sb.add("CITY", ":", cityId, '\f');
			this.poll(sb.get(), cityId);
		},
		pollWorld: function(sectorIds) {
			var sb = new qx.util.StringBuilder(2048);
			sb.add("WORLD", ":");
			
			for (var i = 0; i < sectorIds.length; i++) {
				var sectorId = sectorIds[i];
				var s = I_KEB_MEB(sectorId) + I_KEB_REB(0);
				sb.add(s);
			}
			
			sb.add('\f');
			this.poll(sb.get(), sectorIds);
		},
		poll: function(requests, callbackArg) {
			this.requestCounter = 0;
			
			var updateManager = webfrontend.net.UpdateManager.getInstance();
			
			var data = new qx.util.StringBuilder(2048);
			data.add('{"session":"', updateManager.getInstanceGuid(), '","requestid":"', updateManager.requestCounter, '","requests":', qx.util.Json.stringify(requests), "}");
			updateManager.requestCounter++;			
			
			var req = new qx.io.remote.Request(updateManager.getUpdateService() + "/Service.svc/ajaxEndpoint/Poll", "POST", "application/json");
			req.setProhibitCaching(false);
			req.setRequestHeader("Content-Type", "application/json");
			req.setData(data.get());
			req.setTimeout(10000);
			req.addListener("completed", function(e) {
				this.completeRequest(e, callbackArg);
			}, this);
			req.addListener("failed", this.failRequest, this);
			req.addListener("timeout", this.timeoutRequest, this);
			req.send();			
		},
		completeRequest: function(e, obj) {
		
			if (e.getContent() == null) return;
			
			for (var i = 0; i < e.getContent().length; i++) {
				var item = e.getContent()[i];
				var type = item.C;
				if (type == "CITY") {
					this.parseCity(obj, item.D);
				} else if (type == "WORLD") {
					this.parseWorld(item.D);
				} else if (type == "OA") {
					this.parseOA(item.D);
				}
			}
		}, 
		failRequest: function(e) {
			
		}, 
		timeoutRequest: function(e) {
			
		},
		parseOA: function(data) {
			if (data == null || data.a == null) {
				return;
			}
			try {
				var sum = 0;
				for (var i = 0; i < data.a.length; i++) {
					var a = data.a[i];
					sum += a.ta;					
				}
				console.log(sum);
			} catch (e) {
				bos.Utils.handleError(e);
			}			
		},
		parseWorld: function(data) {
			if (data == null || data.s == null) {
				return;
			}
			try {
				var server = bos.Server.getInstance();
				for (var i = 0; i < data.s.length; i++) {
					var d = data.s[i];
					
					var sector;
					if (server.sectors[d.i] != null) {
						sector = server.sectors[d.i];
					} else {
						sector = new bosSector();
					}
					sector.init(d);

					server.sectors[d.i] = sector;
				}
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},
		parseCity: function(cityId, data) {
			try {
				var server = bos.Server.getInstance();
				var city = server.cities[cityId];
				var store = false;
				if (city == undefined) {
					city = new bos.City();
					store = true;
				}
				city.dispatchResults(data);
				if (store) {
					city.setId(cityId);
					server.cities[cityId] = city;
				}
				server.markCityDirty(cityId);
			} catch (e) {
				bos.Utils.handleError(e);
			}
		}
	}
});


qx.Class.define("bos.Tweaks", {
	type: "singleton",
	extend: qx.core.Object,
	members: {
		gameStarted: function() {
			trace("In gameStarted");

			this.tweakErrorReporting();
			var res = webfrontend.res.Main.getInstance();		

			try {
				var container = a.title.reportButton.getLayoutParent();
				var btnSummary = new qx.ui.form.Button(tr("summary")).set({
					marginLeft: 10
				});
				btnSummary.setWidth(78);
				btnSummary.setHeight(32);
				container._add(btnSummary, {
					row: 0,
					column: 11
				});
				btnSummary.addListener("click", function (event) {
					bos.Tweaks.getInstance().showSummary();
				}, this);			

				var menu = new qx.ui.menu.Menu();

				var btnCombatCalc = new qx.ui.menu.Button(tr("combat calculator"), null);
				btnCombatCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showCombatCalc();
				});

				var btnFoodCalc = new qx.ui.menu.Button(tr("food calculator"), null);
				btnFoodCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showFoodCalc();
				});
				
				var btnRecruitmentSpeedCalc = new qx.ui.menu.Button(tr("recruitment speed calculator"), null);
				btnRecruitmentSpeedCalc.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showRecruitmentSpeedCalc();
				});								

				var btnJumpCoords = new qx.ui.menu.Button(tr("jump to coords"), null);
				btnJumpCoords.addListener("execute", function(event) {
					bos.Tweaks.getInstance().showJumpToCoordsDialog();
				});

				var btnJumpToCity = new qx.ui.menu.Button(tr("jump to city"), null);
				btnJumpToCity.addListener("execute", function(event) {
					var s = prompt(tr("please enter city coordinates"), "");
					if (s != null && s != "") {
						s.match(/^(\d{1,3}):(\d{1,3})$/);
						var x = parseInt(RegExp.$1, 10);
						var y = parseInt(RegExp.$2, 10);
						webfrontend.gui.Util.openCityProfile(x, y);
					}
				});

				var btnJumpPlayer = new qx.ui.menu.Button(tr("jump to player"), null);
				btnJumpPlayer.addListener("execute", function(event) {
					var name = prompt(tr("please enter player name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openPlayerProfile(name);					        
						a.showInfoPage(a.getPlayerInfoPage(), {
							name: name
						});
					}
				});

				var btnJumpAlliance = new qx.ui.menu.Button(tr("jump to alliance"), null);
				btnJumpAlliance.addListener("execute", function(event) {
					var name = prompt(tr("please enter alliance name:"), "");
					if (name != null && name != "") {
						//webfrontend.gui.Util.openAllianceProfile(name);
				        a.showInfoPage(a.getAllianceInfoPage(), {
							name: name
						});
					}
				});
				
				var btnJumpContinent = new qx.ui.menu.Button(tr("jump to continent"), null);
				btnJumpContinent.addListener("execute", function(event) {
					var s = prompt(tr("kıta numarası girin:"), "");
					if (s != null && s != "") {
						var cont = parseInt(s, 10);
						var col = Math.floor(cont % 10);
						var row = Math.floor(cont / 10);						
						var srv = webfrontend.data.Server.getInstance();
						var height = srv.getContinentHeight();
						var width = srv.getContinentWidth();
						
						var x = Math.floor(col * width + 0.5 * width);
						var y = Math.floor(row * height + 0.5 * height);
						
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				});
				
				var btnExtraSummary = new qx.ui.menu.Button(tr("extra summary"), null);
				btnExtraSummary.addListener("execute", this.extraSummary);
				
				menu.add(btnCombatCalc);
				menu.add(btnFoodCalc);
				menu.add(btnRecruitmentSpeedCalc);
				menu.addSeparator();
				menu.add(btnJumpCoords);
				menu.add(btnJumpToCity);
				menu.add(btnJumpPlayer);
				menu.add(btnJumpAlliance);
				menu.add(btnJumpContinent);
				
				menu.addSeparator();
				menu.add(btnExtraSummary);
				menu.addSeparator();
				
				var btnZoomOut = new qx.ui.menu.Button(tr("zoom out"), null);
				btnZoomOut.addListener("execute", function(event) {
					this.setZoom(0.5);					
				}, this);				
				
				menu.add(btnZoomOut);
				
				var btnZoomIn = new qx.ui.menu.Button(tr("zoom in"), null);
				btnZoomIn.addListener("execute", function(event) {				
					this.setZoom(1.0);
				}, this);								
				menu.add(btnZoomIn);
				
				menu.addSeparator();
				
				var btnFillWithResources = new qx.ui.menu.Button(tr("fill with resources"), null);
				btnFillWithResources.addListener("execute", function(event) {
					bos.gui.ResourcesFillerWidget.getInstance().open();
					bos.gui.ResourcesFillerWidget.getInstance().setCurrentCityAsTarget();
				}, this);
				menu.add(btnFillWithResources);				
												
				var btnMenu = new qx.ui.form.MenuButton("BOS Araçları", null, menu).set({
					marginLeft: 10
				});
				container._add(btnMenu, {
					row: 0,
					column: 12
				});
								
				var zoomSlider = new qx.ui.form.Slider().set({
					minimum: 25,
					maximum: 200,
					singleStep: 5,
					pageStep: 1,
					value: 100,
					width: 200
				});
				zoomSlider.addListener("changeValue", function(e) {
					this.setZoom(zoomSlider.getValue() / 100.0);
				}, this);
				
				var btnZoomReset = new qx.ui.form.Button("R");
				btnZoomReset.addListener("execute", function(e) {
					this.setZoom(1);
					zoomSlider.setValue(100);
				}, this);
				
				var zoomBox = new qx.ui.container.Composite().set({
					width: 250,
					height: 28
				});
				zoomBox.setLayout(new qx.ui.layout.HBox(0));
				zoomBox.add(zoomSlider);
				zoomBox.add(btnZoomReset);
				
				qx.core.Init.getApplication().getDesktop().add(zoomBox, {
					  left: 400 + 300,
					  top: 70,
					  right: null
				});
						
			} catch (e) {
				bos.Utils.handleError(tr("error during BOS Tools menu creation: ") + e);
			}

			a.overlaySizes[bos.Const.EXTRA_WIDE_OVERLAY] = {
					width: 0,
					height: 0
			};

			var pos = a.overlayPositions[0];
			a.overlayPositions[bos.Const.EXTRA_WIDE_OVERLAY] = {
				left: pos.left,
				top: pos.top,
				bottom: pos.bottom
			};

			server = bos.Server.getInstance();
			
			try {
				this.applyPersistedTweaks();
			} catch (e) {
				bos.Utils.handleError("applyPersistedTweaks failed " + e);
			}
			
			trace("after gameStarted");
			
		},
		sentResourcesCounter: {},
		countSentResources: function(x, y) {
			this.sentResourcesCounter = new Object();
			var cityId = bos.Utils.convertCoordinatesToId(x, y);
			bos.net.CommandManager.getInstance().sendCommand("ReportGetCount", {
				"folder": 0,
				"city": cityId,
				"mask": 197119
			}, this, this.processReportGetCount, cityId);
		},
		processReportGetCount: function(isOk, result, cityId) {
			if (isOk && result != null) {
				var count = result;
				
				bos.net.CommandManager.getInstance().sendCommand("ReportGetHeader", {
					"folder": 0,
					"city": cityId,
					"start": 0,
					"end": count, 
					"sort": 0,
					"ascending": false,
					"mask": 197119
				}, this, this.processReportGetHeader, cityId);				
								
			}
		},
		processReportGetHeader: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.sentResourcesCounter = {
					reports: 0,
					ok: 0,
					errors: 0,
					players: {}
				};
				for (var i = 0; i < result.length; i++) {
					var report = result[i];
					if (report.t == "02010" || report.t == "02110") {
						//resources arrived
						this.sentResourcesCounter.reports++;
						bos.net.CommandManager.getInstance().sendCommand("GetReport", {
							"id": report.i,
						}, this, this.processGetReport, {cityId: cityId, state: this.sentResourcesCounter});						
					}
				}			
			}
		},
		processGetReport: function(isOk, result, params) {
			if (isOk && result != null) {
				params.state.ok++;
				var players = params.state.players;
				if (players[result.h.p] == undefined) {
					players[result.h.p] = {
						1: 0,
						2: 0,
						3: 0,
						4: 0
					};
				}
				var res = players[result.h.p];
				
				for (var i = 0; i < result.r.length; i++) {
					var item = result.r[i];
					res[item.t] += item.v;
				}
			} else {
				params.state.errors++;
			}
			
			if (params.state.errors + params.state.ok >= params.state.reports) {
				var json = qx.util.Json.stringify(params);
				bos.Utils.displayLongText(json);
			}
		},
		setZoom: function(zoom) {
			//for region and world
			var visMain = ClientLib.Vis.VisMain.GetInstance();
			visMain.set_ZoomFactor(zoom);
			
			//for city view
			try {
				if (qx.bom.client.Engine.GECKO) {
					a.visMain.scene.domRoot.style.MozTransform = "scale(" + zoom + ")";
					a.visMain.scene.domRoot.style["overflow"] = "hidden";
				} else {
					a.visMain.scene.domRoot.style["zoom"] = zoom;
				}
			} catch (ex) {
				//ignore any exception
			}
		},
		extraSummary: function() {
			var widget = bos.gui.ExtraSummaryWidget.getInstance();
			widget.open();
		},
		tweakErrorReporting: function() {
			if (bos.Const.DEBUG_VERSION) {
				//qx.event.GlobalError.setErrorHandler(null, this);
				//window.onerror = null;
				qx.event.GlobalError.setErrorHandler(handleError, this);
				//qx.event.GlobalError.setErrorHandler(null, this);
			}
		}, 
		bosTest: function() {
			//webfrontend.net.UpdateManager.getInstance().completeRequest = this.test_completeRequest;
		},
		tweakReports: function() {

			if (reportsTweaked) {
				return;
			}

			trace("in tweakReports");
			//a.title.reportButton.removeListener(a.title.reportButton, reportsBtnListener);

			//webfrontend.gui.ReportListWidget
			var rep = a.title.report;
			if (rep == null) {
				debug("rep is NULL");
				return;
			}

			rep.selectAllBtn.set({
				width: 90
			});

			rep.deleteBtn.set({
				width: 90
			});

			var left = 110;
			var step = 35;
			var bottom = 7;

			var selectDropdown = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});

			var locale = qx.locale.Manager.getInstance().getLocale();
			if (locale == "de") {
				selectDropdown.add(new qx.ui.form.ListItem("Keine", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("Alle", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Spionage", null, "Spionage: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plünderung", null, "Plünderung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Überfall", null, "Überfall: "));
				selectDropdown.add(new qx.ui.form.ListItem("Belagerung", null, "Belagerung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Unterstützung", null, "Unterstützung: "));
				selectDropdown.add(new qx.ui.form.ListItem("Waren", null, "Waren: "));
				selectDropdown.add(new qx.ui.form.ListItem("Handel", null, "Handel: "));
				selectDropdown.add(new qx.ui.form.ListItem("Jagd", null, "Jagd: "));
				selectDropdown.add(new qx.ui.form.ListItem("Schatzsuche", null, "Schatzsuche: "));
			} else {
				selectDropdown.add(new qx.ui.form.ListItem("None", null, null));
				selectDropdown.add(new qx.ui.form.ListItem("All", null, ""));
				selectDropdown.add(new qx.ui.form.ListItem("Assault", null, "Assault: |: Assaulted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Goods", null, "Goods: "));
				selectDropdown.add(new qx.ui.form.ListItem("Plunder", null, "Plunder: |: Plundered by "));
				selectDropdown.add(new qx.ui.form.ListItem("Raids", null, "Raid: "));
				selectDropdown.add(new qx.ui.form.ListItem("Scout", null, "Scout: |: Scouted by "));
				selectDropdown.add(new qx.ui.form.ListItem("Siege", null, "Siege: |: Siege canceled by |: Sieged by |Reinforcement: Joins Siege vs."));
				selectDropdown.add(new qx.ui.form.ListItem("Support", null, ": Support sent for your city |: Support from |Support: Your troops arrived at |: Support retreat by |Support: Sent home by "));
				selectDropdown.add(new qx.ui.form.ListItem("Trade", null, "Trade: "));
			}

			selectDropdown.addListener("changeSelection", function onReportSelectFilter() {
				var sel = selectDropdown.getSelection()[0].getModel();
				selectReports(sel);
			}, false);


			rep.clientArea.add(selectDropdown, {
				bottom: 1,
				right: 1
			});
			//right = 100 + 1;

			var btnExport = new qx.ui.form.Button("Export");
			btnExport.set({width: 60, appearance: "button-text-small", toolTipText: locale =="de" ? "Exportieren den ausgewählten Report" : "Export selected reports."});
			btnExport.addListener("click", exportSelectedReports, false);
			rep.clientArea.add(btnExport, {
				bottom: 1,
				right: 110
			});
			//right += step;

			var tcm = rep.headers.getTableColumnModel();
			var behavior = tcm.getBehavior();
			behavior.setWidth(2, 90);

			//webfrontend.gui.ReportPage
			var reportPage = a.getReportPage();
			var widgets = reportPage.getChildren();
			var container = widgets[widgets.length - 1];
			var btnExportThisReport = new qx.ui.form.Button("Export");
			btnExportThisReport.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, this, parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportThisReport);
			
			var btnExportToCombatCalc = new qx.ui.form.Button(locale == "de" ? "Zum Kampfkalk hinzuf." : "To Combat calc");
			btnExportToCombatCalc.setToolTipText(locale == "de" ? "Fügt den Spionage Report zum Kampfkalkulator hinzu." : "Adds <b>scout</b> report to combat calculator");
			btnExportToCombatCalc.addListener("execute", function(event) {
					//XXX after maintaince search for "checkAttackersLeft: function(" and look below in private method, to get name of private field with id
					var id = reportPage.__AV;
					onCombatCalc();
					var combat = getCombatCalculatorWidget();
					combat.addDefendersFromReport = true;
					var counter = 1;
					bos.net.CommandManager.getInstance().sendCommand("GetReport", {
						id: id
					}, combat, combat.parseReport, counter);
					counter++;
			}, this);
			container.add(btnExportToCombatCalc);						
			
			trace("after tweakReports");

			reportsTweaked = true;
			
		}, 
		applyPersistedTweaks: function() {
			var storage = bos.Storage.getInstance();
						
			if (storage.getTweakReportAtStart()) {
				this.tweakReport();
			}
			
			if (storage.getTweakChatAtStart()) {
				this.tweakChat();
			}	
			
		}, 
		tweakChat: function() {		
			var cls = a.chat;
			if (cls.oldOnNewMessage != undefined) {
				//already applied
				return;
			}
			
			a.chat.tabView.addListener("changeSelection", this._onChatChangeTab, this);
			a.chat.tabView.setSelection([a.chat.tabView.getChildren()[1]]);
			
			this._onChatChangeTab();
			
			cls.oldOnNewMessage = cls._onNewMessage;			
					
		}, 
		_onChatChangeTab: function(event) {
			var chatId = a.chat.tabView.getSelection()[0].getUserData("ID");
			var ch = a.chat.chatLine;
			
			switch (chatId) {
				case 0:
					ch.setBackgroundColor("red");
					break;
				case 1:
					ch.setBackgroundColor("");
					break;
				case 99:
					ch.setBackgroundColor("");
					break;
			}
									
		},
		showJumpToCoordsDialog: function() {
			var cwac = jumpCoordsDialog();
			cwac.askCoords();
			a.allowHotKey = false;
			qx.core.Init.getApplication().getDesktop().add(cwac, {left: 0, right: 0, top: 0, bottom: 0});
			cwac.show();
		},
		showSummary: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			
			var summary = getSummaryWidget();
			if (summary.isVisible()) {
			  summary.close();
			} else {
			  summary.open();
			  summary.updateView();
			}
		},		
		showCombatCalc: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getCombatCalculatorWidget();
			//widget.updateView();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget, bos.Const.EXTRA_WIDE_OVERLAY);
			}
		},
		showFoodCalc: function() {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getFoodCalculatorWidget();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget);
			}
		},
		showRecruitmentSpeedCalc: function () {
			var server = bos.Server.getInstance();
			server.updateCity();
			var widget = this.getRecruitmentSpeedCalculatorWidget();
			if (a.getCurrentOverlay() == widget) {
				a.switchOverlay(null);
			} else {
				a.switchOverlay(widget);
			}
		},	
		getCombatCalculatorWidget: function() {
			if (this.combatCalculatorWidget == null) {
				this.combatCalculatorWidget = new bos.gui.CombatCalculatorWidget();
			}
			return this.combatCalculatorWidget;
		},
		getFoodCalculatorWidget: function() {
			if (this.foodCalculatorWidget == null) {
				this.foodCalculatorWidget = new bos.gui.FoodCalculatorWidget();
			}
			return this.foodCalculatorWidget;
		},
		getRecruitmentSpeedCalculatorWidget: function () {
			if (this.recruitmentSpeedCalculatorWidget == null) {
				this.recruitmentSpeedCalculatorWidget = new bos.gui.RecruitmentSpeedCalculatorWidget();
			}
			return this.recruitmentSpeedCalculatorWidget;
		}		
	}
});

/** code by XyFreak and Secusion */
qx.Class.define("bos.SharestringConverter", {
	type: "singleton",
	extend: qx.core.Object,
	statics: {
		fieldmask:"########################-------#-------#####--------#--------###---------#---------##---------#---------##------#######------##-----##-----##-----##----##-------##----##----#---------#----##----#---------#----#######----T----#######----#---------#----##----#---------#----##----##-------##----##-----##-----##-----##------#######--VV--##---------#----V--V-##---------#----V---V###--------#-----V-######-------#------V########################",
		fcp: new Array("B","A","C","D","2","3","5","O","J","4","K","N","1","L","M","E","P","S","Q","U","V","Y","Z","X","T","R","W","","0","F","G","H","I"),
		ncp: new Array(":",".",",",";","2","3","1","C","P","4","L","M","H","A","D","U","B","K","G","E","Y","V","S","X","R","J","Z","#","-","W","Q","I","F")

	},
	construct: function(inputstring) {
		raw = this._convert(inputstring);
	},
	members: {
		raw: null,
		_convert: function(inputstring) {
			var letter = inputstring[0];

			if (letter =="h") {
				var tmp = inputstring.split("=");
				var raw = tmp[1];
			
				if (raw.length == 294){
					return this.fcp2ncp(raw);
				} else {
					throw new Exception("Incorrect length of raw string " + raw.length);
				}
			} else if (letter=="[") {
				var pos = inputstring.indexOf("]");
				var raw = inputstring.slice(pos + 1, pos + 443);					
				return this.ncp2fcp(raw);
			}	
				
			throw new Exception("Incorrect sharestring format");			
		},
		fcp2ncp: function(str) {

			var watercity;
						
			if (str.length != 294) {
				throw new Exception("Incorrect sharestring length");
			}
			
			var out  = "[ShareString.1.3]";
			if (str[0] == 'W') {
				out += ";";
				watercity = true;
			} else if (str[0] == 'L') {
				out += ":";
				watercity = false;
			} else {
				throw new Exception("Incorrect sharestring format");
			}
			
			var i,j, iswater = false;
			for (i = 0, j = 1; i < bos.SharestringConverter.fieldmask.length; i++ ) {
				var mask = bos.SharestringConverter.fieldmask[i];
				if (watercity && mask == 'V') {
					iswater = !iswater;
				}

				if (mask == '#') {
					out += "#";
					iswater = false;
				} else if (mask == 'T') {
					j++;
					out += "T";
				} else if (watercity && str[j] == '0' && mask == 'V' ) {
					j++;
					out += '_';
				} else if(watercity && iswater && str[j] == '0') {
					j ++;
					out += "#";
				} else {
					out += this._convertFCPtoNCPchar(str[j++]);
				}
			}			
			return out;
		},
		_convertFCPtoNCPchar: function(str) {
			for(var i = 0; i < fcp.length; i ++) {
				if(fcp[i] == str) {
					return ncp[i];
				}
			}
			return "@";
		},
		ncp2fcp: function(rawstring){		
			var watercity = false;
			var tempstring = "http://www.lou-fcp.co.uk/map.php?map=";
			for(var i = 1; i < 442; i++) {
				if(i==1 && rawstring.charAt(0) == ";"){
					tempstring = tempstring + "W";
					watercity = true;
				}
				if(i==1 && rawstring.charAt(0)==":"){
					tempstring=tempstring+"L";
				}

				if(i==221 && watercity){
					tempstring+="0";
					continue;
				}
				else if(i==353 && watercity){
					tempstring+="0";
					continue;
				} 
				else if(i==354 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==374 && watercity){
					tempstring+="0"; 
					continue;
				}
				else if(i==375 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==376 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==396 && watercity){
					tempstring+="0"; 
					continue;
				} 
				else if(i==397 && watercity){
					tempstring+="0"; 
					continue;
				}
				else if(rawstring[i]='T'){
					tempstring+="0";
					continue;
				}
				for(var a=0; a < ncp.length; a++){
					if(rawstring[i] == ncp[a]) {
						tempstring += fcp[a];
					}
				}
					
			}
				
			return tempstring;
		}		
	}
});

qx.Class.define("bos.Utils", {
	type: "singleton",
	extend: qx.core.Object,
	statics: {
		_popupsCount: 0,
		convertCoordinatesToId: function(x, y) {
			var id = parseInt(x, 10) | (parseInt(y, 10) << 16);
			return id;
		},
		convertIdToCoodrinates: function(id) {
			var o = this.convertIdToCoordinatesObject(id);
			return o.xPos + ":" + o.yPos;
		},
		convertIdToCoordinatesObject: function(id) {
			var o = {
				xPos: (id & 0xFFFF),
				yPos: (id >> 16),				
			}
			o.cont = webfrontend.data.Server.getInstance().getContinentFromCoords(o.xPos, o.yPos);
			return o;
		},
		extractCoordsFromClickableLook: function(pos) {
			if (pos == null)
				return null;

			if (pos.substring != undefined) {
				var startPos = pos.indexOf("\">");
				var endPos = pos.indexOf("</div>");
				if (startPos < endPos) {
					var coords = pos.substring(startPos + 2, endPos);
					var spacePos = pos.indexOf(" ");
					if (spacePos > 0) {
						coords = coords.substring(spacePos);
					}
					return coords;
				} else {
					return pos;
				}
			}
			return pos;
		}, 
		translateOrderType: function(type) {
			switch(type) {
				case 0:
					return qx.locale.Manager.tr("tnf:unknown");
				case 1:
					return qx.locale.Manager.tr("tnf:scout");
				case 2:
					return qx.locale.Manager.tr("tnf:plunder");
				case 3:
					return qx.locale.Manager.tr("tnf:assult");
				case 4:
					return qx.locale.Manager.tr("tnf:support");
				case 5:
					return qx.locale.Manager.tr("tnf:siege");
				case 8:
					return qx.locale.Manager.tr("tnf:raid");
				case 9:
					return qx.locale.Manager.tr("tnf:settle");
				case 10:
					return qx.locale.Manager.tr("tnf:boss raid");
				case -2:
					return "PvP";
			}
			return "??? " + type;
		}, 
		translateArray: function(arr) {
			var translated = [];
			for (var i = 0; i < arr.length; i++) {
				translated.push(tr(arr[i]));
			}
			return translated;
		},
		createCitiesTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});

			sb.setToolTipText(tr("filter by: city types"));
				
			return sb;
		}, 
		populateCitiesTypesSelectBox: function(sb, onlyMilitary) {					
			if (sb == null) {
				return;
			}
			
			if (onlyMilitary == undefined) {
				onlyMilitary = false;
			}
			
			sb.removeAll();

			sb.add(new qx.ui.form.ListItem(tr("all"), null, "A"));
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("building"), null, "B"));
			}
			sb.add(new qx.ui.form.ListItem(tr("castles"), null, "C"));
			sb.add(new qx.ui.form.ListItem(tr("defensive"), null, "D"));
			
			if (!onlyMilitary) {
				sb.add(new qx.ui.form.ListItem(tr("warehouses"), null, "W"));
				sb.add(new qx.ui.form.ListItem(tr("moonstones"), null, "M"));
				sb.add(new qx.ui.form.ListItem(tr("gold"), null, "G"));
				var list = bos.Storage.getInstance().getCustomCityTypes();
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					sb.add(new qx.ui.form.ListItem(item.description, null, item.letter));
				}
			}
		},
		shouldCityBeIncluded: function(city, selectedCityType, selectedContinent) {

			if (selectedCityType != null && selectedCityType != "A") {
				var type = bos.CityTypes.getInstance().parseReference(city.reference);
				switch (selectedCityType) {
					case 'C':
						if (!type.isCastle) return false;
						break;
					case 'B':
						if (!type.isBuildInProgress) return false;
						break;
					case 'W':
						if (!type.isWarehouse) return false;
						break;
					case 'M':
						if (!type.hasMoonglowTower) return false;
						break;
					case 'G':
						if (!type.isGold) return false;
						break;
					case 'D':
						if (!type.isDefensive) return false;
						break;
					default:
						if (type.customTypes.indexOf(selectedCityType) < 0) return false;
						break;
				}
			}
			
			if (selectedContinent != null && selectedContinent != "A") {
				var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
				if (parseInt(selectedContinent) != cont) {
					return false;
				}
			}

			return true;
		},
		createCitiesContinentsSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			var cities = webfrontend.data.Player.getInstance().cities;

			sb.setToolTipText("Filtre tipi: <b>kıtalar</b>");

			var continents = [];
			for (var cityId in cities) {
				var city = cities[cityId];

				var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(city.xPos, city.yPos);
				continents["c" + cont] = true;
			}

			var list = [];
			for (var key in continents) {
				if (key.substring != undefined && qx.lang.Type.isString(key)) {
					var cont = parseInt(key.substring(1), 10);
					if (!isNaN(cont)) {
						list.push(cont);
					}
				}
			}
			list.sort();

			sb.add(new qx.ui.form.ListItem(tr("all"), null, "A"));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}

			return sb;
		},		
		makeClickable: function(msg, color) {
			return qx.lang.String.format("<div style=\"cursor:pointer;color:%1\">%2</div>", [color, msg]);			
		},
		makeColorful: function(msg, color) {
			return qx.lang.String.format("<font color=\"%1\">%2</font>", [color, msg]);			
		},
		handleError: function(message) {
			//TODO make it nicer than alert box (webfrontend.gui.ConfirmationWidget)
			bos.Utils._alert(message);
		},
		handleWarning: function(message) {
			bos.Utils._alert(message);
		},
		handleInfo: function(message) {
			alert(message);
		},
		_alert: function(message) {
			if (bos.Utils._popupsCount < bos.Const.MAX_POPUPS) {
				alert(message);
				bos.Utils._popupsCount++;
			}
		},
		displayLongText: function(body) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			//dialog.setZIndex(100000);
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea(body).set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable();}, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});	
			dialog.show();
		},
		inputLongText: function(callback) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			//dialog.setZIndex(100000);
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
			dialog.dialogBackground._add(bgImg, {left: 0, top: 0});
			var shrStr = new qx.ui.form.TextArea("").set({allowGrowY: true, tabIndex: 303});
			dialog.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
			shrStr.selectAllText();
			var okButton = new qx.ui.form.Button("OK");
			okButton.setWidth(120);
			okButton.addListener("click", function(){dialog.disable(); callback(shrStr.getValue()) }, false);
			dialog.dialogBackground._add(okButton, {left: 445, top: 190});
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
		},
		getDistance: function(x1, y1, x2, y2) {
			var diffX = Math.abs(x1 - x2);
			var diffY = Math.abs(y1 - y2);
			return Math.sqrt(diffX * diffX + diffY * diffY);
		},
		getDistanceUsingIds: function(id1, id2) {
			var c1 = this.convertIdToCoodrinates(id1);
			var c2 = this.convertIdToCoodrinates(id2);
			return this.getDistance(c1.xPos, c1.yPos, c2.xPos, c2.yPos);
		},		
		summaryWidget: function() { 
			return summaryWidget; 
		}		
	}
});

qx.Class.define("bos.CityTypes", {
	type: "singleton",
	extend: qx.core.Object,
	construct: function() {
		//nothing to do
	}, 
	members: {
		parseReference: function(ref) {
			var result = {
				isCastle: false,
				isBuildInProgress: false,
				isWarehouse: false,
				hasMoonglowTower: false,
				isGold: false,
				isDefensive: false,
				customTypes: new qx.data.Array([])
			};

			if (ref == null) {
				return result;
			}

			var insideOptions = false;
			for (var i = 0; i < ref.length; i++) {
				var c = ref.charAt(i);
				if (c == '*') {
					insideOptions = !insideOptions;
				} else if (insideOptions) {
					switch (c) {
						case 'C':
							result.isCastle = true;
							break;
						case 'B':
							result.isBuildInProgress = true;
							break;
						case 'W':
							result.isWarehouse = true;
							break;
						case 'M':
							result.hasMoonglowTower = true;
							break;
						case 'G':
							result.isGold = true;
							break;
						case 'D':
							result.isDefensive = true;
							break;
						default:
							result.customTypes.push(c);
							break;
					}
				}
			}

			return result;

		}, 
		getCastles: function() {
			return this._getCitiesByType("isCastle");
		}, 
		getCitiesWithMoonglowTower: function() {
			return this._getCitiesByType("hasMoonglowTower");
		}, 
		getCitiesBuildInProgress: function() {
			return this._getCitiesByType("isBuildInProgress");
		}, _getCitiesByType: function(typeName) {
			var list = [];

			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];

				var types = this.parseReference(city.reference);
				if (types[typeName]) {
					list.push(cityId);
				}
			}

			return list;
		}, 
		isReservedLetter: function(letter) {
			switch (letter) {
				case 'A':
				case 'C':
				case 'B':
				case 'W':
				case 'M':
				case 'G':
				case 'D':
					return true;
			}
			return false;
		}
	}
});

/** most of code of this class is taken from game source code */
qx.Class.define("bos.City", {
	extend: qx.core.Object,
	construct: function() {
		qx.Bootstrap.setDisplayName(this, "bos.City");
		this.resources = new Object();
		this.setId(-1);
		//this.setRequestId(-1);
	}, destruct: function() {
		//alert("Destroying " + this.getId());
	
		delete this.resources;
		delete this.buildQueue;
		delete this.units;
		delete this.traders;

		delete this.unitOrders;
		delete this.tradeOrders;
		
		delete this.unitQueue;
		delete this.recruitingSpeed;
		delete this.incomingUnitOrders;
		delete this.supportOrders, 
		delete this.tradeIncoming; 

	}, 
	statics: {
		SERIALIZABLE_MEMBERS: ["resources", "units", "buildQueue", "unitQueue", "recruitingSpeed", "unitOrders", "incomingUnitOrders", "supportOrders", "traders" /*XXX trades are useless to save, "tradeOrders", "tradeIncoming"*/],
		createFromSimpleObject: function(o) {
			var c = new bos.City();
			var props = qx.Class.getProperties(c.constructor);

			o["lastUpdated"] = new Date(o["lastUpdated"]);

			for (var prop in props) {
				var name = props[prop];
				try {
					if (o[name] != undefined) {
							c.set(name, o[name]);
					}
				} catch (e) {
						debug(name + " " + e);
				}
			}

			var members = bos.City.SERIALIZABLE_MEMBERS;
			for (var key in members) {
				var m = members[key];
				c[m] = o[m];
			}

			return c;
		}
	}, properties: {
		id: {
			init: -1
		},
		lastUpdated: {
			init: null
		},
		requestId: {
			init: -1
		}, 
		version: {
			init: -1
		},
		//id: {
		//        event: bK
		// }, version: {
		//        init: -1,
		//        event: ba
		onWater: {
				init: false
		}, unitCount: {
				init: 0
		}, unitLimit: {
				init: 0
		}, unitsInQueue: {
				init: 0
		}, buildingCount: {
				init: 0
		}, buildingLimit: {
				init: 0
		}, buildingsInQueue: {
				init: 0
		}, strongHold: {
				init: false
		}, sieged: {
				init: false
		}, canRecruit: {
				init: false
		}, canCommand: {
				init: false
		}, orderLimit: {
				init: 0
		}, barracksLevel: {
				init: 0
		}, townhallLevel: {
				init: 0
		}, marketplaceLevel: {
				init: 0
		}, harborLevel: {
				init: 0
		}, wallLevel: {
				init: 0
		}, hideoutSize: {
				init: 0
		}, foodConsumption: {
				init: 0
		}, foodConsumptionSupporter: {
				init: 0
		}, foodConsumptionQueue: {
				init: 0
		}, buildTimeAbsMod: {
				init: 0
		}, buildTimePercentMod: {
				init: 0
		}, plunderProtection: {
				init: 0
		}, goldProduction: {
				init: 0
		}, name: {
				init: ""
		}, reference: {
				reference: ""
		}, text: {
				init: ""
		}
	}, members: {
		resources: null,
		units: null,
		buildQueue: null,
		unitQueue: null,
		recruitingSpeed: null,
		unitOrders: null,
		incomingUnitOrders: null,
		tradeOrders: null,
		tradeIncoming: null,
			//----------------
		toSimpleObject : function() {
				var o = new Object();

				var props = qx.Class.getProperties(this.constructor);
				for (var prop in props) {
					var name = props[prop];
					try {
						if (qx.lang.Type.isString(name) && name.indexOf("function ") != 0) {
							o[name] = this.get(name);
						}
					} catch (e) {
						debug(name + " " + e);
					}
				}

				//qx does strange things for date object when serializing to JSON, below is workaround
				o["lastUpdated"] = this.getLastUpdated().getTime();

				var members = bos.City.SERIALIZABLE_MEMBERS;
				for (var key in members) {
					var m = members[key];
					o[m] = this[m];
				}

				return o;
			},
			//----------------
			populate: function(other) {

					this.setLastUpdated(new Date());

					this.resources = new Object();
					this.setId(-1);
					//this.setRequestId(-1);

					var props = qx.Class.getProperties(this.constructor);
					for (var prop = 0; prop < props.length; prop++) {
					//for (var prop in props) {
						var name = props[prop];
						try {
							if (qx.lang.Type.isString(name)) {
									this.set(name, other.get(name));
							}
						} catch (e) {
							//debug(name + " " + e);
						}
					}

					this.setId(parseInt(this.getId()));

					for (var res = 1; res <= 4; res++) {

						this.resources[res] = {
							step: 0,
							base: 0,
							delta: 0,
							max: 0
						};

						if (other.resources.hasOwnProperty(res)) {
							var thisRes = this.resources[res];
							var otherRes = other.resources[res];
							thisRes.step = otherRes.step;
							thisRes.base = otherRes.base;
							thisRes.delta = otherRes.delta;
							thisRes.max = otherRes.max;
						}
					}

					this.buildQueue = new Array();

					if (other.hasBuildQueue()) {
						for (var i = 0; i < other.buildQueue.length; i++) {
							var item = other.buildQueue[i];
							this.buildQueue[i] = {
								id: item.id,
								building: item.building,
								state: item.state,
								start: item.start,
								end: item.end,
								type: item.type,
								level: item.level,
								x: item.x,
								y: item.y,
								isPaid: item.isPaid
							};
						}
					}

					this.units = new Object();
					if (other.getUnits() != null) {
						for (var key in other.getUnits()) {
							var item = (other.getUnits())[key];
							this.units[key] = {
								count: item.count,
								total: item.total,
								speed: item.speed
							};
						}
					}

					this.unitQueue = new Array();
					if (other.hasUnitQueue()) {
						for (var i = 0; i < other.unitQueue.length; i++) {
							var item = other.unitQueue[i];
							this.unitQueue[i] = {
								id: item.id,
								type: item.type,
								count: item.count,
								batch: item.batch,
								left: item.left,
								start: item.start,
								end: item.end,
								isPaid: item.isPaid
							};
						}
					}

					this.traders = new Object();
					if (other.traders != null) {
						for (var key in other.traders) {
							var item = other.traders[key];
							this.traders[key] = {
								count: item.count,
								total: item.total,
								order: item.order
							};
						}
					}


					this.unitOrders = new Array();
					if (other.unitOrders != null) {
						for (var i = 0; i < other.unitOrders.length; i++) {
							var item = other.unitOrders[i];
							this.unitOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: item.units,
								isDelayed: item.isDelayed,
								recurringType: item.recurringType,
								recurringEndStep: item.recurringEndStep,
								quickSupport: item.quickSupport
							};
						}
					}

					this.supportOrders = new Array();
					if (other.supportOrders != null) {
						for (var i = 0; i < other.supportOrders.length; i++) {
							var item = other.supportOrders[i];

							this.supportOrders[i] = {
								id: item.id,
								type: item.type,
								state: item.state,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								units: new Array(),
								quickSupport: item.quickSupport
							};

							for (var u = 0; u < item.units.length; u++) {
								this.supportOrders[i].units[u] = {
									type: item.units[u].type,
									count: item.units[u].count
								};
							}
						}
					}

					this.tradeOrders = new Array();
					if (other.tradeOrders != null) {
						for (var i = 0; i < other.tradeOrders.length; i++) {
							var item = other.tradeOrders[i];
						
							this.tradeOrders[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeOrders[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}
					
					this.tradeIncoming = new Array();
					if (other.tradeIncoming != null) {
						for (var i = 0; i < other.tradeIncoming.length; i++) {
							var item = other.tradeIncoming[i];
						
							this.tradeIncoming[i] = {
								id: item.id,
								type: item.type,
								transport: item.transport,
								state: item.state,
								start: item.start,
								end: item.end,
								city: item.city,
								cityName: item.cityName,
								player: item.player,
								playerName: item.playerName,
								alliance: item.alliance,
								allianceName: item.allianceName,
								resources: new Array()
							};
							for (var u = 0; u < item.resources.length; u++) {
								this.tradeIncoming[i].resources[u] = {
									type: item.resources[u].type,
									count: item.resources[u].count
								};
							}					
						}
					}		
			},
			//----------------
			
			dispatchResults: function(K) {
			
			  this.setLastUpdated(new Date());
			
			  var bh = "changeVersion",
				bg = "",
				bf = "CITY",
				be = "s",
				bd = "m",
				bc = "psr",
				bb = "at",
				ba = "bl",
				Y = "hrl",
				X = "rs",
				ch = "to",
				cg = "v",
				cf = "iuo",
				ce = "t",
				cd = "nr",
				cc = "changeCity",
				cb = "r",
				ca = "singleton",
				bY = "f",
				bX = "sh",
				bo = "q",
				bp = "btam",
				bm = "d",
				bn = "tl",
				bk = "ts",
				bl = "webfrontend.data.City",
				bi = "bc",
				bj = "pl",
				bu = "b",
				bv = "pp",
				bD = "mtl",
				bB = "ae",
				bL = "su",
				bG = "n",
				bT = "mpl",
				bQ = "wl",
				bx = "btpm",
				bW = "uq",
				bV = "_applyId",
				bU = "ol",
				bw = "st",
				bz = "cpr",
				bA = "i",
				bC = "fc",
				bE = "cr",
				bH = "w",
				bN = "pd",
				bS = "bbl",
				bq = "tf",
				br = "u",
				by = "ul",
				bK = "pwr",
				bJ = "g",
				bI = "uo",
				bP = "et",
				bO = "uc",
				bF = "fcs",
				bM = "ns",
				W = "hs",
				bR = "fcq",
				bs = "ad",
				bt = "ti";			
			
				var O = webfrontend.res.Main.getInstance();
				var P = webfrontend.data.Server.getInstance();
				if (K.hasOwnProperty(bz)) {
				  //this.setCanPurifyResources(K.cpr);
				}
				if (K.hasOwnProperty(bA)) {
				  //if (this.getRequestId() != K.i) return;
				}
				if (K.hasOwnProperty(bG)) this.setName(K.n);
				if (K.hasOwnProperty(cb) && K.r != null) {
				  for (var i = 0; i < K.r.length; i++) {
					var M = K.r[i].i;
					if (!this.resources.hasOwnProperty(M)) this.resources[M] = {
					  step: 0,
					  base: 0,
					  delta: 0,
					  max: 0
					};
					if (K.r[i].hasOwnProperty(be)) this.resources[M].step = K.r[i].s;
					if (K.r[i].hasOwnProperty(bu)) this.resources[M].base = K.r[i].b;
					if (K.r[i].hasOwnProperty(bm)) this.resources[M].delta = K.r[i].d;
					if (K.r[i].hasOwnProperty(bd)) this.resources[M].max = K.r[i].m;
				  }
				}
				//if (K.hasOwnProperty(bK)) this.palaceWoodResources = K.pwr;
				//if (K.hasOwnProperty(bc)) this.palaceStoneResources = K.psr;
				if (K.hasOwnProperty(W)) this.setHideoutSize(K.hs);
				if (K.hasOwnProperty(bC)) this.setFoodConsumption(K.fc);
				if (K.hasOwnProperty(bF)) this.setFoodConsumptionSupporter(K.fcs);
				if (K.hasOwnProperty(bR)) this.setFoodConsumptionQueue(K.fcq);
				if (K.hasOwnProperty(bH)) this.setOnWater(K.w != 0);
				if (K.hasOwnProperty(bJ)) this.setGoldProduction(K.g);
				//if (K.hasOwnProperty(bk)) this.setTypeSlots(K.ts);
				var R = 0;
				if (K.hasOwnProperty(bo)) {
				  if (K.q != null && K.q.length > 0) {
					if (this.buildQueue == null) this.buildQueue = new Array();
					else qx.lang.Array.removeAll(this.buildQueue);
					for (var i = 0; i < K.q.length; i++) {
					  this.buildQueue[i] = {
						id: K.q[i].i,
						building: K.q[i].b,
						state: K.q[i].s,
						ss: K.q[i].ss,
						es: K.q[i].es,
						type: K.q[i].t,
						l: K.q[i].l,
						x: K.q[i].x,
						y: K.q[i].y,
						isPaid: K.q[i].p,
						warnings: K.q[i].w,
						time: -1
					  };
					  if (K.q[i].l == 1 && K.q[i].s == 1) R++;
					}
				  } else {
					if (this.buildQueue != null) delete this.buildQueue;
				  }
				  this.setBuildingsInQueue(R);
				}
				R = 0;
				if (K.hasOwnProperty(bW)) {
				  if (K.uq != null && K.uq.length > 0) {
					if (this.unitQueue == null) this.unitQueue = new Array();
					else qx.lang.Array.removeAll(this.unitQueue);
					for (var i = 0; i < K.uq.length; i++) {
					  this.unitQueue[i] = {
						id: K.uq[i].i,
						type: K.uq[i].t,
						count: K.uq[i].o,
						batch: K.uq[i].c,
						left: K.uq[i].l,
						start: K.uq[i].ss,
						end: K.uq[i].es,
						isPaid: K.uq[i].p
					  };
					  R += K.uq[i].l * O.units[K.uq[i].t].uc;
					}
				  } else {
					if (this.unitQueue != null) delete this.unitQueue;
				  }
				  this.setUnitsInQueue(R);
				}
				if (K.hasOwnProperty(br)) {
				  if (K.u != null && K.u.length > 0) {
					if (this.units == null) this.units = new Object();
					else qx.lang.Object.empty(this.units);
					for (var i = 0; i < K.u.length; i++) this.units[K.u[i].t] = {
					  count: K.u[i].c,
					  total: K.u[i].tc,
					  speed: K.u[i].s
					};
				  } else {
					if (this.units != null) delete this.units;
				  }
				}
				if (K.hasOwnProperty(cf)) {
				  if (K.iuo != null && K.iuo.length > 0) {
					if (this.incomingUnitOrders == null) this.incomingUnitOrders = new Array();
					else qx.lang.Array.removeAll(this.incomingUnitOrders);
					for (var i = 0; i < K.iuo.length; i++) {
					  this.incomingUnitOrders[i] = {
						id: K.iuo[i].i,
						type: K.iuo[i].t,
						state: K.iuo[i].s,
						end: K.iuo[i].es,
						city: K.iuo[i].c,
						cityName: K.iuo[i].cn,
						player: K.iuo[i].p,
						playerName: K.iuo[i].pn,
						alliance: K.iuo[i].a,
						allianceName: K.iuo[i].an
					  };
					}
				  } else {
					if (this.incomingUnitOrders != null) delete this.incomingUnitOrders;
				  }
				}
				if (K.hasOwnProperty(ce)) {
				  if (K.t != null && K.t.length > 0) {
					if (this.traders == null) this.traders = new Object();
					else qx.lang.Object.empty(this.traders);
					for (var i = 0; i < K.t.length; i++) this.traders[K.t[i].t] = {
					  count: K.t[i].c,
					  total: K.t[i].tc,
					  order: 0
					};
				  } else {
					if (this.traders != null) delete this.traders;
				  }
				}
				if (K.hasOwnProperty(bI)) {
				  if (K.uo != null && K.uo.length > 0) {
					if (this.unitOrders == null) this.unitOrders = new Array();
					else qx.lang.Array.removeAll(this.unitOrders);
					for (var i = 0; i < K.uo.length; i++) {
					  var U = null;
					  if (K.uo[i].u != null && K.uo[i].u.length > 0) {
						U = new Array();
						for (var j = 0; j < K.uo[i].u.length; j++) U.push({
						  type: K.uo[i].u[j].t,
						  count: K.uo[i].u[j].c
						});
					  }
					  this.unitOrders[i] = {
						id: K.uo[i].i,
						type: K.uo[i].t,
						state: K.uo[i].s,
						start: K.uo[i].ss,
						end: K.uo[i].es,
						city: K.uo[i].c,
						cityName: K.uo[i].cn,
						player: K.uo[i].p,
						playerName: K.uo[i].pn,
						alliance: K.uo[i].a,
						allianceName: K.uo[i].an,
						units: U,
						isDelayed: K.uo[i].d,
						recurringType: K.uo[i].rt,
						recurringEndStep: K.uo[i].rs,
						quickSupport: K.uo[i].q
					  };
					}
				  } else {
					if (this.unitOrders != null) delete this.unitOrders;
				  }
				}
				if (K.hasOwnProperty(bL)) {
				  if (K.su != null && K.su.length > 0) {
					if (this.supportOrders == null) this.supportOrders = new Array();
					else qx.lang.Array.removeAll(this.supportOrders);
					for (var i = 0; i < K.su.length; i++) {
					  var U = null;
					  if (K.su[i].u != null && K.su[i].u.length > 0) {
						U = new Array();
						for (var j = 0; j < K.su[i].u.length; j++) U.push({
						  type: K.su[i].u[j].t,
						  count: K.su[i].u[j].c
						});
					  }
					  this.supportOrders[i] = {
						id: K.su[i].i,
						type: K.su[i].t,
						state: K.su[i].s,
						end: K.su[i].es,
						city: K.su[i].c,
						cityName: K.su[i].cn,
						player: K.su[i].p,
						playerName: K.su[i].pn,
						alliance: K.su[i].a,
						allianceName: K.su[i].an,
						units: U,
						quickSupport: K.su[i].q
					  };
					}
				  } else {
					if (this.supportOrders != null) delete this.supportOrders;
				  }
				}
				if (K.hasOwnProperty(ch)) {
				  if (K.to != null && K.to.length > 0) {
					if (this.tradeOrders == null) this.tradeOrders = new Array();
					else qx.lang.Array.removeAll(this.tradeOrders);
					for (var i = 0; i < K.to.length; i++) {
					  var U = null;
					  var T = 0;
					  if (K.to[i].r != null && K.to[i].r.length > 0) {
						var O = new Array();
						for (var j = 0; j < K.to[i].r.length; j++) {
						  O.push({
							type: K.to[i].r[j].t,
							count: K.to[i].r[j].c
						  });
						  T += K.to[i].r[j].c;
						}
						this.traders[K.to[i].tt].order += Math.ceil(T / P.getTradeCapacity(K.to[i].tt));
					  }
					  this.tradeOrders[i] = {
						id: K.to[i].i,
						type: K.to[i].t,
						transport: K.to[i].tt,
						state: K.to[i].s,
						start: K.to[i].ss,
						end: K.to[i].es,
						city: K.to[i].c,
						cityName: K.to[i].cn,
						player: K.to[i].p,
						playerName: K.to[i].pn,
						alliance: K.to[i].a,
						allianceName: K.to[i].an,
						resources: O
					  };
					}
				  } else {
					if (this.tradeOrders != null) delete this.tradeOrders;
				  }
				}
				if (K.hasOwnProperty(bq)) {
				  if (K.tf != null && K.tf.length > 0) {
					if (this.tradeOffers == null) this.tradeOffers = new Array();
					else qx.lang.Array.removeAll(this.tradeOffers);
					for (var i = 0; i < K.tf.length; i++) {
					  this.tradeOffers[i] = {
						id: K.tf[i].i,
						transport: K.tf[i].t,
						deliverTime: K.tf[i].d,
						price: K.tf[i].p,
						resourceType: K.tf[i].r,
						amountTradeUnit: K.tf[i].a
					  };
					}
				  } else {
					if (this.tradeOffers != null) delete this.tradeOffers;
				  }
				}
				if (K.hasOwnProperty(bt)) {
				  if (K.ti != null && K.ti.length > 0) {
					if (this.tradeIncoming == null) this.tradeIncoming = new Array();
					else qx.lang.Array.removeAll(this.tradeIncoming);
					for (var i = 0; i < K.ti.length; i++) {
					  if (K.ti[i].r != null && K.ti[i].r.length > 0) {
						var O = new Array();
						for (var j = 0; j < K.ti[i].r.length; j++) O.push({
						  type: K.ti[i].r[j].t,
						  count: K.ti[i].r[j].c
						});
					  }
					  this.tradeIncoming[i] = {
						id: K.ti[i].i,
						type: K.ti[i].t,
						transport: K.ti[i].tt,
						state: K.ti[i].s,
						start: K.ti[i].ss,
						end: K.ti[i].es,
						city: K.ti[i].c,
						cityName: K.ti[i].cn,
						player: K.ti[i].p,
						playerName: K.ti[i].pn,
						alliance: K.ti[i].a,
						allianceName: K.ti[i].an,
						resources: O
					  };
					}
				  } else {
					if (this.tradeIncoming != null) delete this.tradeIncoming;
				  }
				}
				if (K.hasOwnProperty(X)) {
				  if (K.rs != null && K.rs.length > 0) {
					if (this.recruitingSpeed == null) this.recruitingSpeed = new Object();
					else qx.lang.Object.empty(this.recruitingSpeed);
					for (var i = 0; i < K.rs.length; i++) this.recruitingSpeed[K.rs[i].t] = {
					  abs: K.rs[i].a,
					  percent: K.rs[i].p
					};
				  } else {
					if (this.recruitingSpeed != null) delete this.recruitingSpeed;
				  }
				}
				if (K.hasOwnProperty(by)) this.setUnitLimit(K.ul);
				if (K.hasOwnProperty(bO)) this.setUnitCount(K.uc);
				if (K.hasOwnProperty(ba)) this.setBuildingLimit(K.bl);
				if (K.hasOwnProperty(bU)) this.setOrderLimit(K.ol);
				if (K.hasOwnProperty(bi)) this.setBuildingCount(K.bc);
				if (K.hasOwnProperty(bX)) this.setStrongHold(K.sh);
				if (K.hasOwnProperty(be)) this.setSieged(K.s);
				if (K.hasOwnProperty(bE)) this.setCanRecruit(K.cr);
				if (K.hasOwnProperty(bn)) this.setTownhallLevel(K.tl);
				if (K.hasOwnProperty(bS)) this.setBarracksLevel(K.bbl);
				if (K.hasOwnProperty(bT)) this.setMarketplaceLevel(K.mpl);
				if (K.hasOwnProperty(Y)) this.setHarborLevel(K.hrl);
				//if (K.hasOwnProperty(bD)) this.setMageTowerLevel(K.mtl);
				if (K.hasOwnProperty(bp)) this.setBuildTimeAbsMod(K.btam);
				if (K.hasOwnProperty(bx)) this.setBuildTimePercentMod(K.btpm);
				if (K.hasOwnProperty(bQ)) this.setWallLevel(K.wl);
				if (K.hasOwnProperty(bv)) this.setPlunderProtection(K.pp);
				if (K.hasOwnProperty(cd)) {
				/*
				  if (this.getReference() != K.nr && this.getRequestId() == K.i) {
					var Q = webfrontend.data.Player.getInstance();
					var S = this.getRequestId();
					if (Q.cities.hasOwnProperty(S)) {
					  Q.cities[S].reference = K.nr;
					  Q.fireDataEvent(bh, Q.getVersion());
					}
				  }
				  */
				  this.setReference(K.nr);
				}
				if (K.hasOwnProperty(bM)) this.setText(K.ns);
				//if (K.hasOwnProperty(bs)) this.setAutoBuildOptionDefense(K.ad);
				//if (K.hasOwnProperty(bB)) this.setAutoBuildOptionEconomy(K.ae);
				//if (K.hasOwnProperty(bb)) this.setAutoBuildTypeFlags(K.at);
				//if (K.hasOwnProperty(bN)) this.setPalaceDamage(K.pd);
				//if (K.hasOwnProperty(bP)) this.setEnlightenmentTime(K.et);
				//if (K.hasOwnProperty(bw)) this.setShrineType(K.st);
				this.setCanCommand(this.getCanRecruit() && this.getBarracksLevel() > 0 || this.getUnitCount() > 0);
				//if (K.hasOwnProperty(bY)) this.setFaith(K.f);
				//if (K.hasOwnProperty(bj)) this.setPalaceLevel(K.pl);
				this.calculateBuildingQueueTimes();
				var N = false;
				if (this.getId() != this.getRequestId()) {
				  this.setId(this.getRequestId());
				  N = true;
				}
				if (K.hasOwnProperty(cg)) {
				  if (this.getVersion() != K.v) {
					this.setVersion(K.v);
					N = false;
				  }
				} else N = true;
				
				/*
				if (N) {
				  var v = this.getVersion();
				  var V = qx.event.Registration;
				  if (V.hasListener(this, bh)) V.fireEvent(this, bh, qx.event.type.Data, [v, v]);
				}
				*/
				var L = webfrontend.data.TradeMinister.getInstance();
			
			},
			
			calculateBuildingQueueTimes: function() {
				if (this.buildQueue == null) return false;
				var cn = false;
				var cj = webfrontend.res.Main.getInstance();
				var cm = new Object();
				for (var i = 0; i < this.buildQueue.length; i++) {
				  if (this.buildQueue[i].BuildingX == -1 || this.buildQueue[i].BuildingY == -1) {
					if (i > 0) this.buildQueue[i].start = this.buildQueue[i - 1].end;
					this.buildQueue[i].end = this.buildQueue[i].start;
					continue;
				  }
				  var ci;
				  var ck = this.buildQueue[i].building;
				  if (cm.hasOwnProperty(ck)) ci = cm[ck];
				  else ci = this.buildQueue[i].l;
				  switch (this.buildQueue[i].state) {
				  case 1:
					ci++;
					cm[ck] = ci;
					this.buildQueue[i].level = ci;
					break;
				  case 2:
					cm[ck] = ci - 1;
					this.buildQueue[i].level = ci - 1;
					break;
				  case 5:
					cm[ck] = 0;
					this.buildQueue[i].level = 0;
					break;
				  }
				  if ((i == 0) && (this.buildQueue[i].ss != 0) && (this.buildQueue[i].es != 0)) {
					if (this.buildQueue[i].state == 5) {
					  this.buildQueue[i].start = this.buildQueue[i].ss;
					  this.buildQueue[i].end = this.buildQueue[i].start + cj.buildingGetDemolishTime(this.buildQueue[i].type, ci);
					} else {
					  this.buildQueue[i].start = this.buildQueue[i].ss;
					  this.buildQueue[i].end = this.buildQueue[i].es;
					}
				  } else {
					var cl = 0;
					if (this.buildQueue[i].state == 5) cl = cj.buildingGetDemolishTime(this.buildQueue[i].type, ci);
					else cl = cj.buildingGetBuildTime(this.buildQueue[i].type, ci, this.buildQueue[i].state);
					if (i > 0) {
					  if (this.buildQueue[i - 1].start == 0) this.buildQueue[i].start = 0;
					  else this.buildQueue[i].start = this.buildQueue[i - 1].end;
					} else this.buildQueue[i].start = 0;
					this.buildQueue[i].end = this.buildQueue[i].start + cl;
				  }
				  if ((this.buildQueue[i].end - this.buildQueue[i].start) != this.buildQueue[i].time) {
					cn = true;
					this.buildQueue[i].time = (this.buildQueue[i].end - this.buildQueue[i].start);
				  }
				}
				return cn;
			},
			//----------------
			getIncomingUnitOrders: function() {
				return this.incomingUnitOrders;
			}, getUnitTypeInfo: function(g) {
				if (this.units != null && this.units.hasOwnProperty(g)) return this.units[g];
				return {
					count: 0,
					total: 0,
					speed: -1
				};
			}, getBuildQueue: function() {
					return this.buildQueue;
			}, hasBuildQueue: function() {
					return this.buildQueue != null;
			}, getUnitQueue: function() {
					return this.unitQueue;
			}, hasUnitQueue: function() {
					return this.unitQueue != null;
			}, getAvailableUnitQueueSpace: function() {
					var e = webfrontend.data.Player.getInstance().getMaxUnitQueueSize();
					if (this.unitQueue != null) {
							e -= this.unitQueue.length;
					}
					return e;
			}, getUnitOrders: function() {
					return this.unitOrders;
			}, getSupportOrders: function() {
					return this.supportOrders;
			}, getRecruitingSpeed: function() {
					return this.recruitingSpeed;
			}, getIncomingUnitOrders: function() {
					return this.incomingUnitOrders;
			}, getUnits: function() {
					return this.units;
			}, getTraders: function() {
					return this.traders;
			}, getTradeOrders: function() {
					return this.tradeOrders;
			}, getTradeOffers: function() {
					return this.tradeOffers;
			}, getTradeIncoming: function() {
					return this.tradeIncoming;
			}, getOrder: function(d) {
					if (this.unitOrders != null) {
					for (var i = 0; i < this.unitOrders.length; i++) if (this.unitOrders[i].id == d) return this.unitOrders[i];
					}
					if (this.incomingUnitOrders != null) {
					for (var i = 0; i < this.incomingUnitOrders.length; i++) if (this.incomingUnitOrders[i].id == d) return this.incomingUnitOrders[i];
					}
					if (this.supportOrders != null) {
					for (var i = 0; i < this.supportOrders.length; i++) if (this.supportOrders[i].id == d) return this.supportOrders[i];
					}
					return null;
			}, getResourceCount: function(F) {
					if (!this.resources.hasOwnProperty(F)) return 0;
					var G = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (G == 0) return 0;
					var I = G - this.resources[F].step;
					var H = this.resources[F].delta;
					if (F == 4) {
					H -= this.getFoodConsumption() + this.getFoodConsumptionSupporter();
					}
					var J = I * H + this.resources[F].base;
					J = Math.max(0, Math.min(J, this.resources[F].max));
					return J;
			}, getResourceGrowPerHour: function(a) {
					if (!this.resources.hasOwnProperty(a)) return 0;
					return this.resources[a].delta * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, getResourceMaxStorage: function(f) {
					if (!this.resources.hasOwnProperty(f)) return 0;
					return this.resources[f].max;
			}, getResourceStorageFullTime: function(K) {
					if (!this.resources.hasOwnProperty(K)) return new Date(0);
					var L = this.getResourceGrowPerHour(K);
					if (L <= 0) return new Date(0);
					var M = this.resources[K].step + (this.resources[K].max - this.resources[K].base) / this.resources[K].delta;
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= M) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(M);
			}, getResourceStorageEmptyTime: function(l, m) {
					if (!this.resources.hasOwnProperty(l)) return new Date(0);
					var n = this.resources[l].step + this.resources[l].base / -(this.resources[l].delta - m);
					if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) return new Date(0);
					return webfrontend.data.ServerTime.getInstance().getStepTime(n);
			}, getResourceCountTime: function(o, p) {
					if (!this.resources.hasOwnProperty(o)) return new Date(0);
					if (this.resources[o].delta <= 0) return new Date(0);
					var q = this.resources[o].step + (p - this.resources[o].base) / this.resources[o].delta;
					return webfrontend.data.ServerTime.getInstance().getStepTime(q);
			}, countDefenders: function() {
					if (this.units == null || this.units.length == 0) return 0;
					var c = 0;
					for (var b in this.units) c += this.units[b].count;
					return c;
			}, getGoldGrowPerHour: function() {
					return this.getGoldProduction() * webfrontend.data.ServerTime.getInstance().getStepsPerHour();
			}, _applyId: function(O, P) {
					if (O != -1 && P == -1) webfrontend.net.UpdateManager.getInstance().addConsumer(Y, this);
					if (O == -1 && P != -1) {
							webfrontend.net.UpdateManager.getInstance().removeConsumer(Y);
							this.setId(-1);
					}
			}, getSupportMoving: function(r) {
					r = r || false;
					var u = [];
					var t = this.getUnitOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4) {
							if (t[i].state == 1 || t[i].state == 2) {
									u[u.length] = [t[i], 0];
							}
							}
					}
					}
					var t = this.getSupportOrders();
					if (t) {
					var s = t.length;
					for (var i = 0; i < s; i++) {
							if (t[i].quickSupport && r) {
							continue;
							}
							if (t[i].type == 4 && t[i].state == 1) {
							u[u.length] = [t[i], 1];
							}
					}
					}
					return u;
			},
			//MINE
			buildQueueOcuppied: function() {
					if (this.buildQueue == null || this.buildQueue.length == 0) {
							return null;
					}
					return (this.buildQueue[this.buildQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			unitQueueOcuppied: function() {
					if (this.unitQueue == null || this.unitQueue.length == 0) {
							return null;
					}
					return (this.unitQueue[this.unitQueue.length - 1].end - webfrontend.data.ServerTime.getInstance().getServerStep());
			},
			setResourceCount: function(res, count) {
					if (!this.resources.hasOwnProperty(res)) {
							return;
					}

					var serverStep = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (serverStep == 0) return;

					this.resources[res].step = serverStep;
					this.resources[res].base = count;
			},
			getFoodBalance: function() {
					var steps = webfrontend.data.ServerTime.getInstance().getStepsPerHour();
					var foodGrow = Math.floor(this.getResourceGrowPerHour(bos.Const.FOOD) + 0.5);
					var foodCons = Math.round(this.getFoodConsumption() * steps);
					var foodConsQueue = Math.round(this.getFoodConsumptionQueue() * steps);
					var foodConsSupport = Math.round(this.getFoodConsumptionSupporter() * steps);

					var foodBalance = foodGrow - foodCons - foodConsQueue - foodConsSupport;
					return foodBalance;
			}, 
			getTradeIncomingResources: function(resType) {
				var totalRes = 0;
				if (this.tradeIncoming == null) {
					return totalRes;
				}
				var now = webfrontend.data.ServerTime.getInstance().getServerStep();
				for (var i = 0; i < this.tradeIncoming.length; i++) {
					var order = this.tradeIncoming[i];
					if (order.end >= now) {
						for (var j = 0; j < order.resources.length; j++) {
							var r = order.resources[j];
							if (r.type == resType) {
								totalRes += r.count;
							}
						}
					}
				}
				return totalRes;
			}
	}
});

//webfrontend.Application
var a;

var summaryWidget = null;

var reportsTweaked = false;

window.setTimeout(bosCheckIfLoaded, 1000);

function bosCheckIfLoaded() {
	if (/*qx.$$domReady == */true) {
		a = qx.core.Init.getApplication();
		if (a && a.chat && a.cityInfoView && a.title.reportButton) {
			bos.Tweaks.getInstance().gameStarted();
		} else {
			window.setTimeout(bosCheckIfLoaded, 1000);
		}
	} else {
		window.setTimeout(bosCheckIfLoaded, 1000);
	}
}



function getSummaryWidget() {
	if (summaryWidget == null) {
		summaryWidget = new bos.gui.SummaryWidget();
		if (bos.Storage.getInstance().getLoadPersistedCitiesAtStart()) {
			summaryWidget.loadPersistedCities();
		}
		if (bos.Storage.getInstance().getLoadTableSettingsAtStart()) {
			summaryWidget.loadPersistedTableSettings();
		}
	}
	return summaryWidget;
}

qx.Class.define("bos.gui.SummaryPage", {
	extend: qx.ui.tabview.Page,
	construct: function() {
		qx.ui.tabview.Page.call(this);
	}, 
	members: {
		_table: null,
		_tableModel: null,
		_addBlankValuesToRow: function(row, tableModel) {
			//it seems that case insensitive doesnt handle well null values so it's safer to populate row with empty values
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				row[tableModel.getColumnId(col)] = "";
			}
		}, 
		updateView: function() {
			if (!this.isSeeable()) {
				//console.log("Some view is hidden, nothing to update");
				return;
			}
		
			if (this._tableModel == null) {
				return;
			}
			var prevSortColumnIndex = this._tableModel.getSortColumnIndex();
			var isSortAscending = this._tableModel.isSortAscending();
			this._tableModel.setDataAsMapArray(this.createRowData(), false);
			if (prevSortColumnIndex >= 0) {
				this._tableModel.sortByColumn(prevSortColumnIndex, isSortAscending);
			}	
		}, 
		_setupSorting: function(tableModel) {
			tableModel.setCaseSensitiveSorting(false);

			var compare = {
				ascending  : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveAscending,
				descending : bos.gui.SummaryWidget._defaultSortComparatorInsensitiveDescending
			};

			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				tableModel.setSortMethods(col, compare);
			}
		}
	}
});

qx.Class.define("bos.ui.table.Table", {
	extend: qx.ui.table.Table,
	construct: function(tableModel, custom) {
		//this.base(arguments);
		qx.ui.table.Table.call(this, tableModel, custom);
		this._setupTableLookAndFeel();
	}, 
	members:  {
		_setupTableLookAndFeel: function() {
			this.setStatusBarVisible(false)
			var focusedRowBGColor = "#555555";
			var rowBGColor = "#373930";
			this.setDataRowRenderer(new webfrontend.gui.RowRendererCustom(this, focusedRowBGColor, focusedRowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor, rowBGColor));
			this.setHeaderCellHeight(22);
			var tcm = this.getTableColumnModel();
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {								
				tcm.setDataCellRenderer(col, new bos.ui.table.cellrenderer.Default());
			}										
				
		}, 
		applyTableSettings: function(settings, tableName) {
			if (settings == null) {
				return;
			}
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			if (tcm.getOverallColumnCount() != settings.columns.length) {
				if(locale == "de"){
					bos.Utils.handleError("Die gespeicherten Werte sind für eine Tabelle mit " + settings.columns.length + "Spalten, diese Tabelle hat jedoch " + tcm.getOverallColumnCount() );
				} else {
					bos.Utils.handleError("Saved settings are for table with " + settings.columns.length + " but table has " + tcm.getOverallColumnCount() + " columns. Please save your '" + tableName + "' table layout again");
				}
				return;
			}

			var colOrder = [];
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {
				var c = settings.columns[col];
				tcm.setColumnVisible(col, c.visible);
				tcm.setColumnWidth(col, c.width);

				colOrder.push(c.columnAt);
			}
			tcm.setColumnsOrder(colOrder);

			if (settings.sortColumnIndex >= 0 && settings.sortColumnIndex < tcm.getOverallColumnCount()) {
					tm.sortByColumn(settings.sortColumnIndex, settings.sortAscending);
			}

		}, 
		saveTableSettings: function(tableName) {
			var tcm = this.getTableColumnModel();
			var tm = this.getTableModel();

			var settings = {
				sortColumnIndex: tm.getSortColumnIndex(),
				sortAscending: tm.isSortAscending(),
				columns: []
			};
			for (var col = 0; col < tcm.getOverallColumnCount(); col++) {

				var c = {
					visible: tcm.isColumnVisible(col),
					width: tcm.getColumnWidth(col),
					columnAt: tcm.getOverallColumnAtX(col)
				};
				settings.columns.push(c);
			}

			bos.Storage.getInstance().setTableSettings(settings, tableName);

		}, 
		exportToCsv: function() {
			var tableModel = this.getTableModel();
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\t";
			for (var col = 0; col < tableModel.getColumnCount(); col++) {
				if (col > 0) {
					sb.add(sep);
				}
				sb.add(tableModel.getColumnName(col));
			}
			sb.add("\n");
			
			var labels = new qx.data.Array(["position", "targetPosition", "attackerPosition"]);

			for (var row = 0; row < tableModel.getRowCount(); row++) {
				var rowData = tableModel.getRowData(row);
				for (var col = 0; col < tableModel.getColumnCount(); col++) {
					if (col > 0) {
						sb.add(sep);
					}
					var s = bos.Utils.extractCoordsFromClickableLook(rowData[col]);
					if (labels.indexOf(tableModel.getColumnId(col)) >= 0) {
						s = "'" + s;
					}
					sb.add('"', s, '"');
				}
				sb.add("\n");
			}

			bos.Utils.displayLongText(sb.get());
		}	
	}
});

qx.Class.define("bos.gui.TradeOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("carts"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnIds = ["id", "cityId", "from", "type", "transport", "state", "start", "end", "position", "target",   
					"lastUpdated", "resources"];		
					
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		columnModel.setColumnWidth(5, 70);		
		
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(9, 125);
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 80);
		columnModel.setDataCellRenderer(10, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(11, 180);
		
		this.add(this.table, {flex: 1});
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var sel;
			
			var filterTypeId = -1;
			sel = this.sbTradeTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}	

			var filterTransportTypeId = -1;
			sel = this.sbTransportTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTransportTypeId = sel[0].getModel();
			}

			var filterTargetTypeId = -1;
			sel = this.sbTargetTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTargetTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}						
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var now = serverTime.getServerStep();
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.tradeOrders == null) {
					continue;
				}
				
				for (var i = 0; i < city.tradeOrders.length; i++) {
					var item = city.tradeOrders[i];

					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					if (filterTransportTypeId != -1 && filterTransportTypeId != item.transport) {
						continue;
					}
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					if (filterTargetTypeId != -1) {
						if (filterTargetTypeId == 1 && item.player != playerId) {
							continue;
						} else if (filterTargetTypeId == 2 && item.player == playerId) {
							continue;
						}
					}
					
					var timeSpan = item.end - item.start;
					if (item.end + timeSpan < now) {
						continue;
					}					
				
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);

					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = this.translateType(item.type);
					row["state"] = this.translateState(item.state);
					row["transport"] = this.translateTransport(item.transport);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["resources"] = "";
					
					if (item.resources != null) {					
						for (var u = 0; u < item.resources.length; u++) {
							var trade = item.resources[u];
							if (u > 0) {
								row["resources"] += ", ";
							}
							var resource = res.resources[trade.type];
							row["resources"] += trade.count + " " + resource.dn;
						}
					}


					row["lastUpdated"] = city.getLastUpdated();
					
					rowData.push(row);
				}

			}
			
			return rowData;
		}, 
		translateState: function(state) {
			switch (state) {
				case bos.Const.TRADE_STATE_TRANSPORT:
					return "transport";
				case bos.Const.TRADE_STATE_RETURN:
					return this.tr("tnf:returns");			
			}

			return "??? " + state;			
		}, 
		translateType: function(type) {
			switch (type) {
				case 1:
					return this.tr("tnf:trade");
				case 2:
					return tr("transfer");
				case 3:
					return tr("minister");
			}

			return "??? " + type;
		}, 
		translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("Gemi");
			}
	

			return "??? " + type;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos));
						var y = parseInt(coords.substring(sepPos + 1));
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbTradeTypes = this._createTradeTypesSelectBox();
			this.sbTradeTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTradeTypes);
			
			this.sbStates = this._createStatesSelectBox();
			this.sbStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbStates);			
			
			this.sbTransportTypes = this._createTransportTypesSelectBox();
			this.sbTransportTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTransportTypes);
			
			this.sbTargetTypes = this._createTargetTypesSelectBox();
			this.sbTargetTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbTargetTypes);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}, 
		_createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by trade type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, 
		_createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: transport type"));

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, 
		_createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("filter by: resources receiver");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(tr("you"), null, 1));
			sb.add(new qx.ui.form.ListItem(tr("someone else"), null, 2));

			return sb;		
		}, 
		_createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText(tr("filter by: state"));
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}
	}
});


qx.Class.define("bos.gui.TradeRouteWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		this.setLayout(new qx.ui.layout.Dock());
		
		this.set({
			width: 440,
			minWidth: 200,
			maxWidth: 600,
			height: 440,
			minHeight: 200,
			maxHeight: 600,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("trade route")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		var container = new qx.ui.container.Composite();
		container.setLayout(new qx.ui.layout.VBox(5));

		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		container.add(scroll, {flex: true});
		
		scroll.add(this.createForm());		

		container.add(this.createFooter());
		
		this.add(container);
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);

	}, 
	members: {
		sbTo: null,
		sbFrom: null,	
		sbTransport: null,
		sbGroup: null,			
		woodInput: null,
		stoneInput: null,
		ironInput: null,
		foodInput: null,
		editedRoute: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.woodInput.setValue(0);
			this.stoneInput.setValue(0);
			this.ironInput.setValue(0);
			this.foodInput.setValue(0);				
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnAdd = new qx.ui.form.Button(tr("OK"));
			btnAdd.setWidth(70);					
			container.add(btnAdd);
			btnAdd.addListener("click", this.addTradeRoute, this);

			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnMax = new qx.ui.form.Button(tr("max"));
			btnMax.setWidth(70);
			container.add(btnMax);
			btnMax.addListener("click", this.maxResources, this);				

			return container;
		}, 
		addTradeRoute: function() {

			var route = {};

			route.from = parseInt(this.sbFrom.getSelection()[0].getModel());
			route.to = parseInt(this.sbTo.getSelection()[0].getModel());
			
			route.wood = parseInt(this.woodInput.getValue(), 10);
			route.stone = parseInt(this.stoneInput.getValue(), 10);
			route.iron = parseInt(this.ironInput.getValue(), 10);
			route.food = parseInt(this.foodInput.getValue(), 10);
			
			if (route.wood < bos.Const.SHIP_CAPACITY) {
				route.wood *= 1000;
			}
			if (route.stone < bos.Const.SHIP_CAPACITY) {
				route.stone *= 1000;
			}
			if (route.iron < bos.Const.SHIP_CAPACITY) {
				route.iron *= 1000;
			}
			if (route.food < bos.Const.SHIP_CAPACITY) {
				route.food *= 1000;
			}				
			
			route.transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			route.group = this.sbGroup.getSelection()[0].getModel();				
			
			var sum = route.wood + route.stone + route.iron + route.food;
			if (sum == 0) {
				bos.Utils.handleWarning(tr("please enter some resources amount"));
				return;
			}
			
			if (route.from == route.to) {
				bos.Utils.handleWarning(tr("invalid destination"));
				return;					
			}
			
			var storage = bos.Storage.getInstance();
			if (this.editedRoute == null) {					
				storage.addTradeRoute(route);
			} else {
				this.editedRoute.from = route.from;
				this.editedRoute.to = route.to;
				
				this.editedRoute.wood = route.wood;
				this.editedRoute.stone = route.stone;
				this.editedRoute.iron = route.iron;
				this.editedRoute.food = route.food;				
			
				this.editedRoute.transport = route.transport;
				this.editedRoute.group = route.group
				//refactor it later
				storage.saveTradeRoutes();
				storage.setTradeRoutesVersion(storage.getTradeRoutesVersion() + 1);
			}
			
			this.editedRoute == null;
			
			this.close();
			
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			container.add(new qx.ui.basic.Label(tr("from")), {
				row: 1, 
				column : 0
			});	

			var selectWidth = 320;
			
			this.sbFrom = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbFrom);
			container.add(this.sbFrom, {
				row: 1,
				column: 1
			});

			container.add(new qx.ui.basic.Label(tr("to")), {
				row: 2, 
				column : 0
			});					
			this.sbTo = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});
			this._populateCitiesSelectBox(this.sbTo);
			container.add(this.sbTo, {
				row: 2,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:wood")), {
				row: 3, 
				column : 0
			});
			this.woodInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.woodInput.setWidth(120);
			container.add(this.woodInput, {
				row: 3,
				column: 1
			});					
		
			container.add(new qx.ui.basic.Label(this.tr("tnf:stone")), {
				row: 4, 
				column : 0
			});
			this.stoneInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.stoneInput.setWidth(120);
			container.add(this.stoneInput, {
				row: 4,
				column: 1
			});

			container.add(new qx.ui.basic.Label(this.tr("tnf:iron")), {
				row: 5, 
				column : 0
			});
			this.ironInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.ironInput.setWidth(120);
			container.add(this.ironInput, {
				row: 5,
				column: 1
			});	
			
			container.add(new qx.ui.basic.Label(this.tr("tnf:food")), {
				row: 6, 
				column : 0
			});
			this.foodInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.foodInput.setWidth(120);
			container.add(this.foodInput, {
				row: 6,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("transport")), {
				row: 7, 
				column : 0
			});					
			this.sbTransport = new qx.ui.form.SelectBox().set({
				width: selectWidth,
				height: 28
			});	
			
			this.sbTransport.add(new qx.ui.form.ListItem(tr("ships then carts"), null, bos.Const.TRADE_TRANSPORT_SHIP_FIRST));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("carts then ships"), null, bos.Const.TRADE_TRANSPORT_CART_FIRST));							
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only carts"), null, bos.Const.TRADE_TRANSPORT_CART));
			this.sbTransport.add(new qx.ui.form.ListItem(tr("only ships"), null, bos.Const.TRADE_TRANSPORT_SHIP));
			
			container.add(this.sbTransport, {
				row: 7,
				column: 1
			});
			
			container.add(new qx.ui.basic.Label(tr("group")), {
				row: 8, 
				column : 0
			});	
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 200,
				height: 28
			});	
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			container.add(this.sbGroup, {
				row: 8,
				column: 1
			});	

			container.add(new qx.ui.basic.Label(tr("resourceMultiplierNotice")), {
				row: 9, 
				column : 0,
				colSpan: 2
			});					
		
			return box;
		}, 
		_populateCitiesSelectBox: function(sb) {

			sb.removeAll();
			
			var list = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			for (var cityId in cities) {
				var city = cities[cityId];
				var name = city.name;
				if (city.reference != null && city.reference != "") {
					name += " [" + city.reference + "]";
				}
				list.push({
					id: parseInt(cityId),
					name: name
				});
			}
			
			
			list.sort(function(a, b) {
				var n1 = a.name.toLowerCase();
				var n2 = b.name.toLowerCase();
				if (n1 > n2) {
					return 1;
				} else if (n1 < n2) {
					return -1;
				} else if (a.id > b.id) {
					return 1;
				} else if (a.id < b.id) {
					return -1;
				} else {
					return 0;
				}
			});
			
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				sb.add(new qx.ui.form.ListItem(item.name, null, item.id));
			}

		}, 
		editRoute: function(route) {
			this.editedRoute = route;
			
			this.sbFrom.setModelSelection([route.from]);
			this.sbTo.setModelSelection([route.to]);
			
			this.woodInput.setValue(route.wood);
			this.stoneInput.setValue(route.stone);
			this.ironInput.setValue(route.iron);
			this.foodInput.setValue(route.food);
			
			this.sbTransport.setModelSelection([route.transport]);
			this.sbGroup.setModelSelection([route.group]);
							
		}, 
		addNewRoute: function() {
			this.editedRoute = null;
			var city = webfrontend.data.City.getInstance();
			this.sbFrom.setModelSelection([parseInt(city.getId())]);
		}, 
		maxResources: function() {
			var from = parseInt(this.sbFrom.getSelection()[0].getModel());
			var server = bos.Server.getInstance();
			var city = server.cities[from];
			if (city == undefined) {
				bos.Utils.handleError("Don't have data about selected 'from' city");
				return;
			}
						
			var wood = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
			var stone = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
			var iron = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
			var food = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
			/* TODO do it later, not so important
			var totalRes = wood + stone + iron + food;
			
			var transport = parseInt(this.sbTransport.getSelection()[0].getModel());
			
			var dg = city.getTraders();
			if (dg != null) {
				var carts = dg[bos.Const.TRADE_TRANSPORT_CART].total;
				var ships = dg[bos.Const.TRADE_TRANSPORT_SHIP].total;				

				var amountLand = carts * bos.Const.CART_CAPACITY;
				var amountSea = ships * bos.Const.SHIP_CAPACITY;
				
				var totalTransportable;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						totalTransportable = amountLand;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						totalTransportable = amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						totalTransportable = amountLand + amountSea;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						totalTransportable = amountLand + amountSea;
						break;						
				}				

				if (totalTransportable < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						//wood = Math.min(wood, Math.floor(amountCurrent * woodPart));
						resources[i] = Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i]));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {							
								var left = Math.min(step, diff, ri.from.resources[i] - resources[i]);
								if (left > 0) {
									resources[i] += left;
									diff -= left;
									noIncrement = false;
								}								
							}						
						}
					}
					//COPY & PASTE END
				}					
				
			}
			*/
			
			this.woodInput.setValue(wood);
			this.stoneInput.setValue(stone);
			this.ironInput.setValue(iron);
			this.foodInput.setValue(food);
		}
	}
});

qx.Class.define("bos.gui.PurifyOptionsWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 300,
			minWidth: 200,
			maxWidth: 700,
			height: 280,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("purify options")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(10, 10));	

		var storage = bos.Storage.getInstance();
		var purifyOptions = storage.getPurifyOptions();

		var container = new qx.ui.groupbox.GroupBox();
		container.setLayout(new qx.ui.layout.VBox(10, 10));
		this.add(container);
		
		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(10, 10));
		container.add(box);
		
		this._inputs = new Array();
		this._inputs.push(null);
		var row = 0;		
		var purifiedRes = ["", "darkwood", "runestone", "veritum", "trueseed"];
		for (var i = 1; i <= 4; i++) {
			var name = purifiedRes[i];
			var lbl = new qx.ui.basic.Label(tr(name));
			var input = this._createMinimumResLevelInput();
			this._inputs.push(input);
			input.setValue(purifyOptions.minimumResLevels[i]);			
			
			box.add(lbl, {row: row, column: 1});
			box.add(input, {row: row, column: 0});
			
			row++;
		}
		
		this.cbIncludeCastles = new qx.ui.form.CheckBox(tr("cbIncludeCastles"));
		this.cbIncludeCastles.setToolTipText(tr("cbIncludeCastles_toolTip"));
		this.cbIncludeCastles.setValue(purifyOptions.includeCastles);
		container.add(this.cbIncludeCastles);	
		
		row++;
		
		this.cbUseRecruitmentData = new qx.ui.form.CheckBox(tr("cbUseRecruitmentData"));
		this.cbUseRecruitmentData.setToolTipText(tr("cbUseRecruitmentData_toolTip"));
		this.cbUseRecruitmentData.setValue(purifyOptions.useRecruitmentData);
		container.add(this.cbUseRecruitmentData);			
		
		row++;

		var btnSave = new qx.ui.form.Button(tr("save"));
		btnSave.setWidth(60);
		this.add(btnSave);
		btnSave.addListener("execute", this.confirm, this);

		row++;		
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);	
	},
	members: {
		_inputs: null,
		cbIncludeCastles: null,
		_createMinimumResLevelInput: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (ministerBuildPresent) {
				var _minimumResLevelInput = new webfrontend.gui.SpinnerInt(0, 20, 90);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_toolTip"));
				_minimumResLevelInput.setWidth(60);	
				return _minimumResLevelInput;
			} else {
				_minimumResLevelInput = new webfrontend.gui.SpinnerInt(0, 50000, 50000000);
				_minimumResLevelInput.setToolTipText(tr("_minimumResLevelInput_absolute_toolTip"));
				_minimumResLevelInput.setWidth(100);
				return _minimumResLevelInput;
			}
		},
		confirm: function() {
						
			purifyOptions = {
				includeCastles: this.cbIncludeCastles.getValue(),
				useRecruitmentData: this.cbUseRecruitmentData.getValue()				
			};
			purifyOptions.minimumResLevels = new Array();
			purifyOptions.minimumResLevels.push(0);
			
			for (var i = 1; i <= 4; i++) {
				var input = this._inputs[i];
				var val = parseInt(input.getValue(), 10);
				purifyOptions.minimumResLevels.push(val);
			}
			
			var storage = bos.Storage.getInstance();
			storage.savePurifyOptions(purifyOptions);
			
			this.close();			
		}
	}
});

qx.Class.define("bos.gui.PurifyResourcesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("purify"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "name", "position", "reference", "wood", "woodMax", "woodFree", "stone", "stoneMax", "stoneFree", "iron", "ironMax", "ironFree", "food", "foodMax", "foodFree", "purifiable", "darkwood", "runestone", "veritum", "trueseed"];
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(16, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", function(event) {
			this._handleCellClick(event, this._tableModel);
		}, this);		
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 100);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		var index = 4;
		for (var res = 1; res <= 4; res++) {
			columnModel.setColumnWidth(index++, 90);
			columnModel.setColumnVisible(index++, false);
			columnModel.setColumnVisible(index++, false);
		}

		var woodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "woodMax", "woodFree");
		columnModel.setDataCellRenderer(4, woodRenderer);

		var stoneRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "stoneMax", "stoneFree");
		columnModel.setDataCellRenderer(7, stoneRenderer);

		var ironRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "ironMax", "ironFree");
		columnModel.setDataCellRenderer(10, ironRenderer);

		var foodRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", "foodMax", "foodFree");
		columnModel.setDataCellRenderer(13, foodRenderer);
		
		columnModel.setColumnWidth(16, 70);
		
		for (var i = 0; i < 4; i++) {
			columnModel.setDataCellRenderer(17 + i, new bos.ui.table.cellrenderer.ClickableLook());
			columnModel.setColumnWidth(17 + i, 50);
		}

		this.add(this.table, {flex: 1});
			
	}, members: {		
		_purifyOptionsWidget: null,
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			var btnPurifyAll = new qx.ui.form.Button(tr("btnPurifyAll"));
			btnPurifyAll.setToolTipText(tr("btnPurifyAll_toolTip"));
			btnPurifyAll.setWidth(120);
			toolBar.add(btnPurifyAll);
			btnPurifyAll.addListener("execute", function(evt) {
				webfrontend.gui.MessageBox.messageBox({
					title: tr("confirmation"),
					text: tr("are you sure?"),
					textRich: true,
					executeOk: function() {
						this._purifyAllResources(this._tableModel);
					},
					callbackContext: this
				});										
			}, this);
			
			var btnPurifyOptions = new qx.ui.form.Button(tr("btnPurifyOptions"));
			btnPurifyOptions.setToolTipText(tr("btnPurifyOptions_toolTip"));
			btnPurifyOptions.setWidth(120);
			toolBar.add(btnPurifyOptions);
			btnPurifyOptions.addListener("execute", function(evt) {
				var widget = this._getPurifyOptionsWidget();
				widget.open();
			}, this);

			var btnMarkMoonglowTower = new qx.ui.form.Button(tr("btnMarkMoonglowTower"));
			btnMarkMoonglowTower.setToolTipText(tr("btnMarkMoonglowTower_toolTip"));
			btnMarkMoonglowTower.setWidth(180);
			btnMarkMoonglowTower.addListener("execute", this.markMoonglowTower, this);										
			toolBar.add(btnMarkMoonglowTower);
			
			var btnUnmarkMoonglowTower = new qx.ui.form.Button(tr("btnUnmarkMoonglowTower"));
			btnUnmarkMoonglowTower.setToolTipText(tr("btnUnmarkMoonglowTower_toolTip"));
			btnUnmarkMoonglowTower.setWidth(180);
			btnUnmarkMoonglowTower.addListener("execute", this.unmarkMoonglowTower, this);										
			toolBar.add(btnUnmarkMoonglowTower);

			var btnMarkMoonglowTower = new qx.ui.form.Button(tr("btnMarkAllMoonglowTowers"));
			btnMarkMoonglowTower.setToolTipText(tr("btnMarkAllMoonglowTowers_toolTip"));
			btnMarkMoonglowTower.setWidth(180);
			btnMarkMoonglowTower.addListener("execute", this.markAllMoonglowTowers, this);										
			toolBar.add(btnMarkMoonglowTower);			
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("purificationHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");						
				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);						
			
			return toolBar;
		}, 
		markMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			if (buildings.length == 0) {
				bos.Utils.handleWarning(tr("you need to be in city"));
				return;
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if (bType == 36 && b.level == 10) {
					var towerId = b.visId;
					var cityId = city.getId();
					bos.Storage.getInstance().addMoonglowTower(cityId, towerId);
					this.updateView();
					return;
				}
			}

			bos.Utils.handleWarning("Couldn't find Moonglow Tower at level 10");

		}, 
		markAllMoonglowTowers: function() {
			var withMoonglow = bos.CityTypes.getInstance().getCitiesWithMoonglowTower();

			var cities = webfrontend.data.Player.getInstance().cities;

			for (var key in withMoonglow) {
				var cityId = parseInt(withMoonglow[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}
				
				var towerId = bos.Storage.getInstance().findMoonglowTowerId(cityId);
				if (towerId > 0) {
					continue;
				}
				
				towerId = 1;
				bos.Storage.getInstance().addMoonglowTower(cityId, towerId);
			}
			this.updateView();
		},
		unmarkMoonglowTower: function() {
			var city = webfrontend.data.City.getInstance();
			var cityId = city.getId();
			bos.Storage.getInstance().removeMoonglowTower(cityId);
			this.updateView();
		}, 
		_purifyAllResources: function() {
			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (ministerBuildPresent) {
				this._purifyAllResourcesImpl();
			} else {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				
				var server = bos.Server.getInstance();
				server.addListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);				
				
				summary.fetchResources();
			}			
		},
		_resourcesRefreshed: function() {
			var server = bos.Server.getInstance();
			server.removeListener("bos.data.changeCityResourcesUpdateTime", this._resourcesRefreshed, this);
			this._purifyAllResourcesImpl();
		},
		_purifyAllResourcesImpl: function() {

			var storage = bos.Storage.getInstance();
			var purifyOptions = storage.getPurifyOptions();
			var towers = storage.getMoonglowTowers();
																									
			var rowData = this.createRowData();
			
			var totalCreated = 0;
			
			var types = ["", "darkwood", "runestone", "veritum", "trueseed"];
			var rawTypes = ["", "wood", "stone", "iron", "food"];
			
			var totalDelay = 0;	

			var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			
			for (var i = 0; i < rowData.length; i++) {
				var row = rowData[i];	

				var cityInfo = bos.CityTypes.getInstance().parseReference(row["reference"]);
				if (cityInfo.isCastle && !purifyOptions.includeCastles) {
					continue;
				}
				
				var res = [];
				
				for (var r = 1; r <= 4; r++) {
					var resType = types[r];
					var purify = row[resType] * bos.Const.MOONSTONE_COST;
					if (purify == 0) {
						continue;
					}
					
					if (r == 4) {
						if (row["food/h"] != undefined && row["food/h"] < 0) {
							continue;
						}
						if (!ministerBuildPresent && cityInfo.isCastle) {
							continue;
						}
					}
					
					var minimumResLevel = purifyOptions.minimumResLevels[r];
					
					if (minimumResLevel > 0) {
						var rawType = rawTypes[r];
						if (ministerBuildPresent) {
							var max = row[rawType + "Max"];
							if (max > 0) {
								var keepRes = Math.floor(max * minimumResLevel / 100.0);
								purify -= keepRes;
							}
						} else {
							purify -= minimumResLevel;
						}
					}
					
					if (purify < bos.Const.MOONSTONE_COST) {
						continue;
					}
					
					res.push({
						t: r,
						c: purify
					});
				}
				if (res.length > 0) {
					var created = this._purifyResources(storage, row, res);
					totalCreated += created;
					
					totalDelay += bos.Const.MIN_SEND_COMMAND_INTERVAL;
				}				
			}
				
			bos.Utils.handleInfo("It will take " + Math.floor(totalDelay / 1000) + " seconds to refine " + totalCreated + " resources");
		}, 
		_purifyResources: function(storage, row, res) {
			var created = 0;
			var cityId = row["id"];
			if (res.length == 0) {
				return 0;
			}
			var towerId = storage.findMoonglowTowerId(cityId);
			if (towerId >= 0) {
			
				bos.net.CommandManager.getInstance().sendCommand("ResourceToVoid", {
					cityid: parseInt(cityId),
					res: res
				}, this, this._onResourcesPurified);
				
				for (var i = 0; i < res.length; i++) {
					created += res[i].c;
				}
			}
			return created;
		}, 
		_onResourcesPurified: function(result) {
			//do nothing
		},
		createRowData: function() {
			var rowData = [];

			var withMoonglow = bos.CityTypes.getInstance().getCitiesWithMoonglowTower();

			var cities = webfrontend.data.Player.getInstance().cities;
			
			var summary = getSummaryWidget();
			
			var unknownValue = "";
			
			var server = bos.Server.getInstance();

			for (var key in withMoonglow) {
				var cityId = parseInt(withMoonglow[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}				

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;

				if (server.cities[cityId] == undefined) {

					var resCity = server.cityResources["c" + cityId];
					if (resCity != null) {
						summary._updateRowFromResCity(resCity, row);
					}

				} else {
					var city = server.cities[cityId];

					row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
					row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
					row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
					row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));

					row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
					row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
					row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
					row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));

					row["woodFree"] = row["woodMax"] - row["wood"];
					row["stoneFree"] = row["stoneMax"] - row["stone"];
					row["ironFree"] = row["ironMax"] - row["iron"];
					row["foodFree"] = row["foodMax"] - row["food"];					
				}
								
				summary._populateResources(row, cityId);

				if (!(row["wood"] === unknownValue && row["stone"] === unknownValue && row["iron"] === unknownValue && row["food"] === unknownValue)) {
					var wood = Math.floor(row["wood"] / bos.Const.MOONSTONE_COST);
					var stone = Math.floor(row["stone"] / bos.Const.MOONSTONE_COST);
					var iron = Math.floor(row["iron"] / bos.Const.MOONSTONE_COST);
					var food = Math.floor(row["food"] / bos.Const.MOONSTONE_COST);
					
					row["purifiable"] = wood + stone + iron + food;
					
					if (row["purifiable"] > 0) {
						var towerId = bos.Storage.getInstance().findMoonglowTowerId(cityId);
						if (towerId > 0) {
							//"darkwood", "runestone", "veritum", "trueseed"
							row["darkwood"] = wood;
							row["runestone"] = stone;
							row["veritum"] = iron;
							row["trueseed"] = food;										
						}
					}
				}

				rowData.push(row);
			}

			return rowData;
		},
		_getPurifyOptionsWidget: function() {
			if (this._purifyOptionsWidget == null) {
				this._purifyOptionsWidget = new bos.gui.PurifyOptionsWidget();
			}
			return this._purifyOptionsWidget;
		},
		_handleCellClick: function(event, tableModel) {
		
			var row = event.getRow();
			var rowData = tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			var cityInfo = bos.CityTypes.getInstance().parseReference(rowData["reference"]);			
			
			var storage = bos.Storage.getInstance();
			var towerId = storage.findMoonglowTowerId(cityId);

			var resources = [];
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var x = parseInt(city["xPos"]);
					var y = parseInt(city["yPos"]);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;						
			case 17:
				resources.push({
					t: bos.Const.WOOD,
					c: rowData["darkwood"] * bos.Const.MOONSTONE_COST
				});
				break;
			case 18:
				resources.push({
					t: bos.Const.STONE,
					c: rowData["runestone"] * bos.Const.MOONSTONE_COST
				});					
				break;
			case 19:
				resources.push({
					t: bos.Const.IRON,
					c: rowData["veritum"] * bos.Const.MOONSTONE_COST
				});						
				break;
			case 20:
				if (cityInfo.isCastle) {
					bos.Utils.handleWarning("purifing food in castles is prohibited");
					return;
				}	
				resources.push({
					t: bos.Const.FOOD,
					c: rowData["trueseed"] * bos.Const.MOONSTONE_COST
				});					
				break;
			};
			
			if (towerId < 0) {
				return;
			}			

			if (resources.length > 0) {
				var ministerBuildPresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
				if (!ministerBuildPresent) {
					bos.Utils.handleWarning("Currently only mass purification is enabled for players without Trade Minister");
					return;
				}
			
				if (this._waitingForFullMessage) {
					bos.Utils.handleWarning("Resource auto refresh has to be turned on (which requires Trade Minister)");
					return;
				}
			
				this._purifyResources(storage, rowData, resources);
			}
		}
	}
});

qx.Class.define("bos.gui.TradeRoutesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("trade routes"));
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();		
		var columnIds = ["id", "group", "fromToIds", "fromTo", "position", "action", "status", "wood", "stone", "iron", "food", "land/sea", "edit"];				
		
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);
		for (var i = 0; i < columnIds.length; i++) {
			this._tableModel.setColumnSortable(i, false);
		}		

		this._setupSorting(this._tableModel);
		//this._tableModel.sortByColumn(1, false); 

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		this.table.setColumnVisibilityButtonVisible(false);
		
		var columnModel = this.table.getTableColumnModel();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 40);
		columnModel.setColumnVisible(2, false);
		
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());		
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(5, 70);
		columnModel.setColumnWidth(6, 70);		
		
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnWidth(8, 70);
		columnModel.setColumnWidth(9, 70);
		columnModel.setColumnWidth(10, 70);
		
		columnModel.setColumnWidth(11, 70);	
		columnModel.setColumnWidth(12, 70);	
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
		
		bos.Storage.getInstance().addListener("changeTradeRoutesVersion", this.updateView, this);
			
	}, members: {
		sbTradeTypes: null,
		sbTransportTypes: null,
		sbTargetTypes: null,
		sbStates: null,
		_tradeRouteWidget: null,
		_sendingStatuses: {},
		_usedCarts: {},
		_showErrors: false,
		_pendingRequests: [],
		_sendingRequest: -1,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();
			var playerId = webfrontend.data.Player.getInstance().getId();

			var sel;
			
			var filterGroup = "";
			sel = this.sbGroup.getSelection();
			if (sel != null && sel.length > 0) {
				filterGroup = sel[0].getModel();
			}			
			
			var storage = bos.Storage.getInstance();
			var routes = storage.getTradeRoutes();
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var now = new Date();
			
			for (var i = 0; i < routes.length; i++) {
				var r = routes[i];
			
				if (filterGroup != "" && r.group != filterGroup) {
					continue;
				}
				
				var row = [];
				var secondRow = [];				
				
				row["id"] = r.id;
				secondRow["id"] = -r.id;
				
				row["group"] = r.group;
				secondRow["group"] = "";
								
				var fromCity = cities[r.from];
				var toCity = cities[r.to];
				
				var skip = false;
				if (fromCity == undefined) {
					row["fromTo"] = "invalid";
					row["fromToIds"] = -1;
					skip = true;
				} else {
					row["fromTo"] = fromCity.name;
					row["position"] = fromCity.xPos + ":" + fromCity.yPos;
					row["fromToIds"] = r.from;
				}
				
				row["wood"] = r.wood;
				row["stone"] = r.stone;
				row["iron"] = r.iron;
				row["food"] = r.food;
				
				if (toCity == undefined) {
					secondRow["fromTo"] = "invalid";
					secondRow["fromToIds"] = -1;
					skip = true;
				} else {
					secondRow["fromTo"] = toCity.name;
					secondRow["position"] = toCity.xPos + ":" + toCity.yPos;
					secondRow["fromToIds"] = r.to;
				}				

				row["action"] = "";
				secondRow["action"] = "";
				if (!skip) {
					var ri = this.createRouteInfo(r);
					
					if (ri.from.reqRes != null) {
														
						if (r.transport != bos.Const.TRADE_TRANSPORT_SHIP)
							row["land/sea"] = ri.from.carts;
						else
							row["land/sea"] = "disabled";
						
						if (r.transport != bos.Const.TRADE_TRANSPORT_CART)
							secondRow["land/sea"] = ri.from.ships;
						else
							secondRow["land/sea"] = "disabled";
					}				
					
					if (ri.to.serverRes != null) {
						
						secondRow["wood"] = ri.to.freeResources[1];
						secondRow["stone"] = ri.to.freeResources[2];
						secondRow["iron"] = ri.to.freeResources[3];
						secondRow["food"] = ri.to.freeResources[4];
					}
					
					if (this.canBeSend(r, false, ri)) {
						row["action"] = this.tr("tnf:send");
					}
					if (this.canBeSend(r, true, ri)) {
						secondRow["action"] = "Send max";
					}
				}
				
				if (server.cities[r.from] == undefined) {
					
					//continue;
				} else {								
					var city = server.cities[r.from];
					
				/*
					var route = {
						from: parseInt(this.sbFrom.getSelection()[0].getModel()),
						to: parseInt(this.sbTo.getSelection()[0].getModel()),
						wood: parseInt(this.woodInput.getValue()),
						stone: parseInt(this.stoneInput.getValue()),
						iron: parseInt(this.ironInput.getValue()),
						food: parseInt(this.foodInput.getValue()),
						transport: parseInt(this.sbTransport.getSelection()[0].getModel())
					};
*/					
				}
				
				var status = this._getStatus(r.id);
				if (status != null) {
					row["status"] = this.translateStatus(status.status);
					secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));
				}
								
				row["edit"] = "Edit";
				secondRow["edit"] = this.tr("tnf:delete");
									
				rowData.push(row);				
				rowData.push(secondRow);
			}
			
			return rowData;
		}, 
		createRouteInfo: function(route) {
			var result = {
				from: {
					reqRes: null,
					serverRes: null,
					carts: 0,
					ships: 0,
					resources: [0, 0, 0, 0, 0]
				}, to: {
					reqRes: null,
					serverRes: null,
					freeResources: [bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF, bos.Const.INF]
				}
			};

			var server = bos.Server.getInstance();
			var resCity = server.cityResources["c" + route.from];
			if (resCity != null) {
				result.from.reqRes = resCity;
				//it's impossible to get exact number of carts because when there are 1 cart and city has 1k wood and 1k stone for both resources it will return amountLand = 1000, the would be if city had 1000carts, we take lower bound here
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					result.from.resources[r] = res.count;
					if (res.amountLand < res.count) {
						result.from.carts = Math.ceil(res.amountLand / bos.Const.CART_CAPACITY);
						break;
					} else {
						result.from.carts = Math.max(result.from.carts, Math.ceil(res.count / bos.Const.CART_CAPACITY));
					}
				}
				
				for (var r = 1; r <= 4; r++) {
					var res = resCity.resources[r];
					if (res == null || res.count == 0) {
						continue;
					}
					if (res.amountSea < res.count) {
						result.from.ships = Math.ceil(res.amountSea / bos.Const.SHIP_CAPACITY);
						break;
					} else {
						result.from.ships = Math.max(result.from.ships, Math.ceil(res.count / bos.Const.SHIP_CAPACITY));
					}
				}

				var usedCarts = this._usedCarts["c" + route.from];				
				if (usedCarts != null) {
					result.from.carts = Math.max(0, result.from.carts - usedCarts.carts);
					result.from.ships = Math.max(0, result.from.ships - usedCarts.ships);
				}				
			}
			
			resCity = server.cityResources["c" + route.to];
			if (resCity != null) {
				result.to.reqRes = resCity;
			}
			
			var summary = getSummaryWidget();
			
			var row = [];				
			if (summary._populateResources(row, route.from)) {
				result.from.serverRes = row;
				
				result.from.resources[1] = row["wood"];
				result.from.resources[2] = row["stone"];
				result.from.resources[3] = row["iron"];
				result.from.resources[4] = row["food"];
			}
			row = [];
			if (summary._populateResources(row, route.to)) {
				result.to.serverRes = row;
				
				result.to.freeResources[1] = row["woodFree"] - row["woodIncoming"];
				result.to.freeResources[2] = row["stoneFree"] - row["stoneIncoming"];
				result.to.freeResources[3] = row["ironFree"] - row["ironIncoming"];
				result.to.freeResources[4] = row["foodFree"] - row["foodIncoming"];
			}		
			
			return result;
		}, 
		translateStatus: function(status) {
			var s = "";
			if (status == -1) {
				s = "Comm. err";
			} else if (status == 0) {
				s = "OK";
			} else {
				if (status & (1 << 0)) {
					s += "I";
				}
				if (status & (1 << 1)) {
					s += "C";
				}
				if (status & (1 << 2)) {
					s += "T";
				}
				if (status & (1 << 3)) {
					s += "R";
				}
			}
			return s;
		}, 
		translateTransport: function(transport) {
			switch (transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					return this.tr("tnf:carts");
				case bos.Const.TRADE_TRANSPORT_SHIP:
					return this.tr("Gemi");
			}
	

			return "??? " + type;
		}, 
		_handleCellClick: function(event) {
			
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
						
			var id = Math.abs(rowData["id"]);
			var isFirstRow = rowData["id"] >= 0;
			var route = bos.Storage.getInstance().findTradeRouteById(id);
			
			switch (event.getColumn()) {
			case 2:
			case 3:
				var cityId = parseInt(rowData["fromToIds"]);
				a.setMainView("c", cityId, -1, -1);
				break;
			case 4:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;				
			case 5:
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (this._sendingRequest != -1) {
						bos.Utils.handleWarning("Please wait, waiting for response for last trade");
					} else {
						this._showErrors = true;
						this.sendTrade(route, !isFirstRow, false);
					}
				}
				break;
			case 12:
				
				if (route == null) {
					bos.Utils.handleError("Route not found");
				} else {
					if (isFirstRow) {											
						var widget = this._getTradeRouteWidget();
						widget.editRoute(route);
						widget.open();
					} else {
						webfrontend.gui.MessageBox.messageBox({
							title: "Confirmation",
							text: "Are you sure?",
							textRich: true,
							executeOk: function() {
								var storage = bos.Storage.getInstance();
								storage.removeTradeRoute(route.id);	
								
								this.updateView();
							},
							callbackContext: this
						});						
					}
				}
				
				break;
			}
		}, 
		canBeSend: function(route, maxMode, ri) {

			var totalRes = route.wood + route.stone + route.iron + route.food;	
			
			var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
			var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;
			
			//var transportType;
			var totalTransportable;
			switch (route.transport) {
				case bos.Const.TRADE_TRANSPORT_CART:
					totalTransportable = amountLand;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP:
					totalTransportable = amountSea;
					//transportType = route.transport;
					break;
				case bos.Const.TRADE_TRANSPORT_CART_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_CART;
					break;
				case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
					totalTransportable = amountLand + amountSea;
					//transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					break;						
			}
			
			if (totalTransportable == 0 || (totalTransportable < totalRes && !maxMode)) {
				return;
			}
			
			if (!maxMode) {
							
				if (ri.from.resources[1] < route.wood) {
					return false;
				}
				if (ri.from.resources[2] < route.stone) {
					return false;
				}
				if (ri.from.resources[3] < route.iron) {
					return false;
				}
				if (ri.from.resources[4] < route.food) {
					return false;
				}				
			} else {
				var total = 0;
				if (route.wood > 0) {
					total += ri.from.resources[1];
				}
				if (route.stone > 0) {
					total += ri.from.resources[2];
				}
				if (route.iron > 0) {
					total += ri.from.resources[3];
				}
				if (route.food > 0) {
					total += ri.from.resources[4];
				}

				if (total < bos.Const.SHIP_CAPACITY) {
					return false;
				}
			}
			return true;
		}, sendAll: function(maxMode) {
			var rows = this.createRowData();
			var storage = bos.Storage.getInstance();
			
			this._pendingRequests = [];
			
			for (var i = 0; i < rows.length; i += 2) {
				var rowData = rows[i];
				
				var id = Math.abs(rowData["id"]);			
				var route = storage.findTradeRouteById(id);
				
				this.sendTrade(route, maxMode, true);
			}
			
			this.sendPendingTrades();
			
		}, 
		sendTrade: function(route, maxMode, onlyQueue) {
			try {
		
				var player = webfrontend.data.Player.getInstance();
				var targetPlayer = player.getName();
				var targetCity = bos.Utils.convertIdToCoodrinates(route.to);				
			
				var ri = this.createRouteInfo(route);
				
				//dumpObject(route);
				//dumpObject(ri);

				if (!this.canBeSend(route, maxMode, ri)) {
					return;
				}

				var resTypes = ["gold", "wood", "stone", "iron", "food"];
				var routeRes = [0, route.wood, route.stone, route.iron, route.food];
				var totalRouteRes = route.wood + route.stone + route.iron + route.food;
				var routeResPart = [0, 0, 0, 0, 0];
				
				for (var i = 1; i <= 4; i++) {
					routeResPart[i] = routeRes[i] / totalRouteRes;
				}
				
				//to be transported resources
				var resources = [0, 0, 0, 0, 0];

				//var reserved = [0, 0, 0, 0, 0];
																		
				if (maxMode) {
				/*
					for (var i = 1; i <= 4; i++) {
						if (ri.to.serverRes != null) {
							var type = resTypes[i];
							reserved[i] += serverRes[type + "Incoming"];
							//TODO reserve: trade time * production/h
						}
					}
				*/
					for (var i = 1; i <= 4; i++) {
						if (routeRes[i] > 0) {
							
							resources[i] = ri.from.resources[i];
							if (ri.to.serverRes != null) {
								//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
								resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
							}
							
						}
					}
				} else {
					for (var i = 1; i <= 4; i++) {
						resources[i] = routeRes[i];
					}						
				}
							
				var totalRes = 0;
				for (var i = 1; i <= 4; i++) {
					totalRes += resources[i];
				}
				
				if (totalRes == 0) {
					return;
				}
										
				var amountLand = ri.from.carts * bos.Const.CART_CAPACITY;
				var amountSea = ri.from.ships * bos.Const.SHIP_CAPACITY;				
				
				var useSecondTransportType = false;
				var transportType;
				switch (route.transport) {
					case bos.Const.TRADE_TRANSPORT_CART:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP:
						transportType = route.transport;
						break;
					case bos.Const.TRADE_TRANSPORT_CART_FIRST:
						if (amountLand > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_CART;						
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;	
						}
						break;
					case bos.Const.TRADE_TRANSPORT_SHIP_FIRST:
						if (amountSea > 0) {
							transportType = bos.Const.TRADE_TRANSPORT_SHIP;
							useSecondTransportType = true;
						} else {
							transportType = bos.Const.TRADE_TRANSPORT_CART;
						}
						break;						
				}
						
				var amountCurrent = 0;						
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					amountCurrent = amountLand;
				} else {
					amountCurrent = amountSea;
				}
				
				if (amountCurrent < totalRes) {
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}				
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {	
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}
							}						
						}
					}
					//COPY & PASTE END
				} else {
					//all resources fits in current transport type, there is no need for use other type
					useSecondTransportType = false;
				}				
				
				if (!onlyQueue) {
					this._pendingRequests = [];
				}
				var req1 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
				this._pendingRequests.push({
					route: route,
					request: req1
				});

				//make resources scheduled to send unavailable for other transport type
				for (var i = 1; i <= 4; i++) {
					ri.from.resources[i] -= resources[i];
					ri.to.freeResources[i] -= resources[i];
				}
				
				if (transportType == bos.Const.TRADE_TRANSPORT_CART) {
					transportType = bos.Const.TRADE_TRANSPORT_SHIP;
					amountCurrent = amountSea;
				} else {
					transportType = bos.Const.TRADE_TRANSPORT_CART;
					amountCurrent = amountLand;
				}
				
				if (amountCurrent == 0) {
					useSecondTransportType = false;
				}

				if (useSecondTransportType) {	
		
					if (!maxMode) {
						for (var i = 1; i <= 4; i++) {
							resources[i] = routeRes[i] - resources[i];
						}
					} else {
						for (var i = 1; i <= 4; i++) {
							if (routeRes[i] > 0) {
								
								resources[i] = ri.from.resources[i];
								if (ri.to.serverRes != null) {
									//min(target city free space - incoming transfers - trade time * production/h, min(max trade capacity, available resources)).				
									resources[i] = Math.max(0, Math.min(resources[i], ri.to.freeResources[i]));
								}
								
							} else {
								resources[i] = 0;
							}
						}																		
					}
						
					//COPY & PASTE START
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						resources[i] = Math.max(0, Math.min(resources[i], Math.floor(amountCurrent * routeResPart[i])));
						totalRes += resources[i];
					}		
									
					if (maxMode && totalRes < amountCurrent) {
						var diff = amountCurrent - totalRes;
						var step = 10000;
						
						var noIncrement = false;
						while (diff > 0 && !noIncrement) {
																	
							noIncrement = true;
														
							for (var i = 1; i <= 4; i++) {
								if (routeRes[i] > 0) {
									var left = Math.min(step, diff, ri.from.resources[i] - resources[i], ri.to.freeResources[i]);
									if (left > 0) {
										resources[i] += left;
										diff -= left;
										noIncrement = false;
									}
								}								
							}						
						}
					}
					//COPY & PASTE END
					
					totalRes = 0;
					for (var i = 1; i <= 4; i++) {
						totalRes += resources[i];
					}								
						
					if (totalRes > 0) {
						var req2 = this._createTradeDirectRequest(route.from, resources, transportType, targetPlayer, targetCity);
						this._pendingRequests.push({
							route: route,
							request: req2
						});
					}
				}
				
				if (!onlyQueue) {					
					this.sendPendingTrades();
				}
							
			} catch (ex) {
				this._sendingRequest = -1;
				bos.Utils.handleError("Sending resources failed: " + ex);
			}
		}, 
		sendPendingTrades: function() {
			if (this._pendingRequests.length == 0) {
				this._sendingRequest = -1;
				this._showErrors = false;
				this.updateView();
				return;
			}
			this._sendingRequest = 0;
			var req = this._pendingRequests[this._sendingRequest];
			bos.net.CommandManager.getInstance().sendCommand("TradeDirect", req.request, this, this._onSendDone, new Date());
		}, 
		_createTradeDirectRequest: function(from, resToBeSend, tradeTransportType, targetPlayer, targetCity) {
			var resources = [];
			if (resToBeSend[1] > 0) {
				resources.push({
					t: bos.Const.WOOD,
					c: resToBeSend[1]										
				});
			}
			if (resToBeSend[2] > 0) {
				resources.push({
					t: bos.Const.STONE,
					c: resToBeSend[2]					
				});
			}
			
			if (resToBeSend[3] > 0) {
				resources.push({
					t: bos.Const.IRON,
					c: resToBeSend[3]
				});
			}

			if (resToBeSend[4] > 0) {
				resources.push({
					t: bos.Const.FOOD,
					c: resToBeSend[4]					
				});
			}				
			var req = {
				cityid: from,
				res: resources,
				tradeTransportType: tradeTransportType,
				targetPlayer: targetPlayer,
				targetCity: targetCity
			}
			return req;
		}, 
		_onSendDone: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(-1);
				} else {
					this._setStatus(parseInt(errorCode));
				}	
			} catch (e) {
				bos.Utils.handleError(e);
			}
		}, 
		_setStatus: function(status) {
			var req = this._pendingRequests[this._sendingRequest];
		
			var prevStatus = this._sendingStatuses["r" + req.route.id];						
		
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["r" + req.route.id] = newStatus;
			var usedCarts = this._usedCarts["c" + req.route.from];
			
			if (usedCarts == null) {
				usedCarts = {
					carts: 0,
					ships: 0
				};
				this._usedCarts["c" + req.route.from] = usedCarts;
			}
			
			if (status == 0) {
				//OK
				var totalRes = 0;
				for (var i = 0; i < req.request.res.length; i++) {
					var res = req.request.res[i];
					totalRes += res.c; 
				}
				
				if (req.request.tradeTransportType == bos.Const.TRADE_TRANSPORT_CART) {
					var carts = Math.ceil(totalRes / bos.Const.CART_CAPACITY);
					usedCarts.carts += carts;
				} else {
					var ships = Math.ceil(totalRes / bos.Const.SHIP_CAPACITY);
					usedCarts.ships += ships;				
				}
			}
			
			/* because of user req disabled showing errors
			if (this._showErrors) {
				if (status != 0) {
					this._showErrorMessage(req, status);
				}
			}
*/			
			
			this._pendingRequests.splice(0, 1);
			this.sendPendingTrades();
			
		}, 
		_showErrorMessage: function(req, status) {
			
			var s = "";
			if (status == -1) {
				s = this.tr("tnf:communication error_1");
			} else if (status == 0) {
				s = "OK";
			} else {
				var sep = "<br/>"
				if (status & (1 << 0)) {
					s += this.tr("tnf:invalid!") + sep;
				}
				if (status & (1 << 1)) {
					s += this.tr("tnf:not enough traders!") + sep;
				}
				if (status & (1 << 2)) {
					s += this.tr("tnf:target cannot be reached!") + sep;
				}
				if (status & (1 << 3)) {
					s += this.tr("tnf:not enough resource!") + sep;
				}
			}

			if (s == "") {
				return;
			}
			
			var dialog = new webfrontend.gui.ConfirmationWidget();
			dialog.showGenericNotice("Error", s, s, "webfrontend/ui/bgr_popup_survey.gif");

			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
			
		}, 
		_getStatus: function(routeId) {
			return this._sendingStatuses["r" + routeId];
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbGroup = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});	
			this.sbGroup.setToolTipText("Filtre tipi <b>grup</b>");
			this.sbGroup.addListener("changeSelection", this.updateView, this);
			
			this.sbGroup.add(new qx.ui.form.ListItem("Tüm gruplar", null, ""));
			
			for (var group = 0; group < 26; group++) {
				var c = String.fromCharCode(65 + group);
				this.sbGroup.add(new qx.ui.form.ListItem(c, null, c));				
			}
			toolBar.add(this.sbGroup);			
			
			this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
			this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
			this.btnRefreshResources.setWidth(120);
			if (locale == "de") {				
				this.btnRefreshResources.setWidth(150);
			}
			
			toolBar.add(this.btnRefreshResources);

			this.btnRefreshResources.addListener("execute", function(evt) {
				var summary = getSummaryWidget();
				summary._requestedResourceRefreshView = true;
				summary.fetchResources();
				this._sendingStatuses = {};
				this._usedCarts = {};
			}, this);			
			
			var btnAddRoute = new qx.ui.form.Button(locale == "de" ? "Add route" : "Rota ekle");			
			btnAddRoute.setWidth(100);
			toolBar.add(btnAddRoute);
			btnAddRoute.addListener("execute", function(evt) {
				var widget = this._getTradeRouteWidget();
				widget.addNewRoute();
				widget.open();
			}, this);

			var btnSendAll = new qx.ui.form.Button(tr("Tümünü yolla"));			
			btnSendAll.setWidth(100);
			toolBar.add(btnSendAll);
			btnSendAll.addListener("execute", function(evt) {
				this.sendAll(false);
			}, this);
			
			var btnSendAllMax = new qx.ui.form.Button(tr("Max yolla"));			
			btnSendAllMax.setWidth(100);
			toolBar.add(btnSendAllMax);
			btnSendAllMax.addListener("execute", function(evt) {
				this.sendAll(true);
			}, this);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice("Ticaret yolları yardım", "inşaat bakanı gerektirir,bazı hatalar olabilir.İlk önce kaynaları otomatik yenilemeyi etkinleştirmek gerekirli kaynak yenileye tıklayın(mevcut bulunan el arabası ve gemiler bağlı işlemler).<br /><center><b>Kerraneciler ittifakından Saygılar. (Dünya 1)</b></center>Hataların listesi:", "<br />I - Geçersiz hedef, C - Yeterli araba veya gemi yok, T - Hedef geçerli değil, R - yeterli kaynak yok", "webfrontend/ui/bgr_popup_survey.gif");

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);		

			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);			
						
			return toolBar;
		}, 
		_createTradeTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>ticari tip</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateType(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateType(2), null, 2));

			return sb;		
		}, 
		_createTransportTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>ulaşım tipi</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(1), null, 1));
			sb.add(new qx.ui.form.ListItem(this.translateTransport(2), null, 2));

			return sb;			
		}, 
		_createTargetTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>kaynakları alan</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem("someone else", null, 2));

			return sb;		
		}, 
		_createStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>konum</b>");
			
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_TRANSPORT), null, bos.Const.TRADE_STATE_TRANSPORT));
			sb.add(new qx.ui.form.ListItem(this.translateState(bos.Const.TRADE_STATE_RETURN), null, bos.Const.TRADE_STATE_RETURN));

			return sb;				
		}, 
		_getTradeRouteWidget: function() {
			if (this._tradeRouteWidget == null) {
				this._tradeRouteWidget = new bos.gui.TradeRouteWidget();
			}
			return this._tradeRouteWidget;
		},
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getTradeRoutes();
			
			var json = qx.util.Json.stringify(orders);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.importTradeRoutes(json);
			});
		}		
	}
});

qx.Class.define("bos.gui.MyAlliancePage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("my alliance"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "rank", "status", "name", "title", "score", "cities", "role", "lastLogin"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(3, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(1, 64);
		columnModel.setColumnWidth(2, 64);
				
		columnModel.setColumnWidth(3, 120);
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		columnModel.setColumnWidth(5, 100);
		columnModel.setColumnWidth(6, 64);
		
		columnModel.setColumnWidth(7, 100);
		columnModel.setColumnWidth(8, 120);
		
		//var dateRenderer = new qx.ui.table.cellrenderer.Date();
		//dateRenderer.setDateFormat(qx.util.format.DateFormat.getDateTimeInstance());
		//columnModel.setDataCellRenderer(8, dateRenderer);		
		
		this.add(this.table, { flex : 1 });
			
	}, members: {
		allianceInfo: null,
		createRowData: function() {
			var rowData = [];
					
			if (this.allianceInfo == null) {
				return rowData;
			}
			
			var roles = webfrontend.data.Alliance.getInstance().getRoles();
			
			var statuses = [tr("offline"), tr("online"), tr("afk"), tr("hidden")];
			
			var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
			
			var titles = webfrontend.res.Main.getInstance().playerTitles;
			
			for (var i = 0; i < this.allianceInfo.length; i++) {
				var item = this.allianceInfo[i];
				
				//{"c":494,"i":247863,"l":"01\/08\/2011 13:43:16","n":"Urthadar","o":3,"os":0,"p":4756785,"r":312856,"ra":5,"t":10},

				var row = [];
				row["id"] = item.i;
				row["rank"] = item.ra;
				row["status"] = statuses.hasOwnProperty(item.o) ? statuses[item.o] : item.o;
				row["name"] = item.n;
				row["title"] = titles[item.t].dn;
				row["score"] = item.p;
				row["cities"] = item.c;
				row["role"] = roles != null ? roles[item.r].Name : item.r;
				//row["lastLogin"] = qx.util.format.DateFormat.getDateTimeInstance("short").format(new Date(item.l));
				row["lastLogin"] = dateFormat.format(new Date(item.l));
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var name = rowData["name"];
			if (name != null) {
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: name
				});
			}
			
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
				
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {				
				bos.net.CommandManager.getInstance().sendCommand("AllianceGetMemberInfos", {}, this, this.parseAllianceInfo);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
					
			return toolBar;
		},
		parseAllianceInfo: function(isOk, result) {
			if (isOk == false || result == null) {
				alert("Not found");
				return;
			}
			
			this.allianceInfo = result;
			this.updateView();			
		}		
	}
});

qx.Class.define("bos.gui.IntelligenceOptionsWidget", {
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 420,
			minWidth: 200,
			maxWidth: 700,
			height: 200,
			minHeight: 200,
			maxHeight: 400,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("intelligence")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(5));
		
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.add(scroll, {flex: true});

		scroll.add(this.createForm());
		
		this.add(this.createFooter());
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
	}, 
	members: {
		editedIntel: null,
		description: null,
		toX: null,
		toY: null,
		lblCityInfo: null,
		cityInfos: new Object(),
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnOk = new qx.ui.form.Button(tr("OK"));
			btnOk.setWidth(150);
			container.add(btnOk);
			btnOk.addListener("click", this.confirm, this);
			
			return container;
		}, 
		createForm: function() {
			var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		
			var container = new qx.ui.groupbox.GroupBox();
			container.setLayout(new qx.ui.layout.Grid(20, 10));
			
			box.add(container);
			
			var row = 1;
			
			container.add(new qx.ui.basic.Label(tr("position")), {
				row: row, 
				column : 0
			});	

			var containerXY = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
			
			this.toX = new qx.ui.form.TextField("");
			this.toX.setWidth(40);			
			containerXY.add(this.toX);
			this.toY = new qx.ui.form.TextField("");
			this.toY.setWidth(40);			
			containerXY.add(this.toY);
			
			var btnSearchTarget = new qx.ui.form.Button(tr("Search"));
			btnSearchTarget.setWidth(80);					
			container.add(btnSearchTarget);
			btnSearchTarget.addListener("click", this.searchTarget, this);
			containerXY.add(btnSearchTarget);
			
			this.lblCityInfo = new qx.ui.basic.Label("");
			containerXY.add(this.lblCityInfo);
			
			container.add(containerXY, {
				row: row, 
				column : 1
			});

			row++;

			container.add(new qx.ui.basic.Label(this.tr("description")), {
				row: row, 
				column : 0
			});
			this.description = new qx.ui.form.TextField("");
			this.description.setWidth(320);
			a.setElementModalInput(this.description);			
			container.add(this.description, {
				row: row, 
				column : 1
			});			
								
			return box;
		}, 
		clearAll: function() {
			this.toX.setValue("");
			this.toY.setValue("");
			this.description.setValue("");			
		},
		searchTarget: function() {
			
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicCityInfo", {
				id: cityId
			}, this, this._onCityInfo, cityId);
		},
		_onCityInfo: function(isOk, result, cityId) {
			if (isOk && result != null) {
				this.cityInfos[cityId] = result;
				this.lblCityInfo.setValue(result.pn + " - " + result.n);
			}
		},	
		confirm: function() {
		
			var toX = parseInt(this.toX.getValue(), 10);
			var toY = parseInt(this.toY.getValue(), 10);
			
			var cityId = bos.Utils.convertCoordinatesToId(toX, toY);

			if (this.cityInfos[cityId] == undefined) {
				bos.Utils.handleError("Click search first");
				return;
			}
			
			var info = this.cityInfos[cityId];
			
			var intel = {
				cityId: cityId,
				name: info.n, 
				isLandlocked: info.w != 1,
				hasCastle: info.s == 1, 
				owner: info.pn, 
				description: this.description.getValue(), 
				lastModified: (new Date()).getTime(), 
				modifiedBy: webfrontend.data.Player.getInstance().getName()
			};
			
			var storage = bos.Storage.getInstance();
			if (this.editedIntel == null) {	
				storage.addIntelligence(intel);
			} else {
				storage.removeIntelligence(cityId);
				storage.addIntelligence(intel);				
			}
			storage.setIntelligenceVersion(storage.getIntelligenceVersion() + 1);
			
			this.editedIntel == null;

			this.close();			
		},
		updateView: function() {

		},
		prepareView: function(cityId) {		
			this.clearAll();			
			var storage = bos.Storage.getInstance();
			this.editedIntel = storage.findIntelligenceById(cityId);
			if (this.editedIntel != null) {
				var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
				this.toX.setValue("" + coords.xPos);
				this.toY.setValue("" + coords.yPos);
				this.description.setValue("" + this.editedIntel.description);
			}
			this.updateView();
		}
	}
});


qx.Class.define("bos.gui.IntelligencePage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("intelligence"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["cityId", "name", "position", "isLandlocked", "hasCastle", "owner", "description", "lastModified", "modifiedBy", "edit", "delete"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(3, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);		
		columnModel.setColumnWidth(1, 100);			
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(3, 64);
		columnModel.setDataCellRenderer(3, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setColumnWidth(4, 64);
		columnModel.setDataCellRenderer(4, new qx.ui.table.cellrenderer.Boolean());
		columnModel.setColumnWidth(5, 100);
		columnModel.setColumnWidth(6, 160);
		columnModel.setColumnVisible(7, false);
		columnModel.setColumnVisible(8, false);
		columnModel.setColumnWidth(9, 64);
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setColumnWidth(10, 64);
		columnModel.setDataCellRenderer(10, new bos.ui.table.cellrenderer.ClickableLook());	
		
		this.add(this.table, { flex : 1 });
		
		bos.Storage.getInstance().addListener("changeIntelligenceVersion", this.updateWholeView, this);
		this.updateWholeView();
			
	}, members: {
		_optionsWidget: null,
		sbLandOrWater: null,
		sbOwnerName: null,
		sbCityType: null,
		sbContinent: null,
		_sbContinentAsList: "_",
		_sbOwnerNameAsList: "_",
		createRowData: function() {
			var rowData = [];
			
			var sel;

			var landOrWater = "";			
			sel = this.sbLandOrWater.getSelection();
			if (sel != null && sel.length > 0) {
				landOrWater = sel[0].getModel();
			}
			
			var cityType = "";
			sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				cityType = sel[0].getModel();
			}
			
			var continent = -1;
			sel = this.sbContinent.getSelection();
			if (sel != null && sel.length > 0) {
				continent = parseInt(sel[0].getModel(), 10);
			}
			
			var ownerName = "";
			sel = this.sbOwnerName.getSelection();
			if (sel != null && sel.length > 0) {
				ownerName = sel[0].getModel();
			}			
			
			var storage = bos.Storage.getInstance();
			var intelligence = storage.getIntelligence();
			
			var dateFormat = new qx.util.format.DateFormat("yyyy.MM.dd HH:mm");
						
			for (var i = 0; i < intelligence.length; i++) {
				var item = intelligence[i];				
				
				if (landOrWater == "L" && !item.isLandlocked) {
					continue;
				} else if (landOrWater == "W" && item.isLandlocked) {
					continue;
				}
				
				if (cityType == "C" && !item.hasCastle) {
					continue;
				} else if (cityType == "T" && item.hasCastle) {
					continue;
				}
				
				var pos = bos.Utils.convertIdToCoordinatesObject(item.cityId);
				if (continent != -1 && continent != pos.cont) {
					continue;
				}
				
				if (ownerName != "" && ownerName != item.owner) {
					continue;
				}
				
				var row = [];
				row["cityId"] = item.cityId;
				row["name"] = item.name;
				row["position"] = bos.Utils.convertIdToCoodrinates(item.cityId);
				row["isLandlocked"] = item.isLandlocked;
				row["owner"] = item.owner;
				row["description"] = item.description;
				row["hasCastle"] = item.hasCastle;
				row["lastModified"] = item.lastModified;
				row["modifiedBy"] = item.modifiedBy;
				row["edit"] = this._createActionButton(tr("edit"));
				row["delete"] = this._createActionButton(tr("delete"));
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var cityId = parseInt(rowData["cityId"], 10);
			
			switch (event.getColumn()) {
				case 0:
				case 1:
				case 2:
					var pos = rowData["position"];
					if (pos != null) {
						var coords = bos.Utils.extractCoordsFromClickableLook(pos);
						var sepPos = coords.indexOf(":");
						if (sepPos > 0) {
							var x = parseInt(coords.substring(0, sepPos), 10);
							var y = parseInt(coords.substring(sepPos + 1), 10);
							a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
					}
					break;
				case 5:
					a.showInfoPage(a.getPlayerInfoPage(), {
						name: rowData["owner"]
					});
					break;				
				case 9:
					var widget = this._getOptionsWidget();
					widget.prepareView(cityId);
					widget.open();
					break;
				case 10:
					
					if (confirm(tr("are you sure?"))) {
						var storage = bos.Storage.getInstance();
						storage.removeIntelligence(cityId);
					}
					break;
			}
			
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
						
			this.sbOwnerName = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			this.sbOwnerName.setToolTipText(tr("filter by: owner name"));
			this.sbOwnerName.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOwnerName);
			
			this.sbCityType = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});			
			this.sbCityType.setToolTipText(tr("filter by: city type"));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("any"), null, ""));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("castle"), null, "C"));
			this.sbCityType.add(new qx.ui.form.ListItem(tr("city"), null, "T"));
			this.sbCityType.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbCityType);

			this.sbLandOrWater = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbLandOrWater.setToolTipText(tr("filter by: land or water"));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("any"), null, ""));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("land"), null, "L"));
			this.sbLandOrWater.add(new qx.ui.form.ListItem(tr("water"), null, "W"));
			this.sbLandOrWater.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbLandOrWater);

			this.sbContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbContinent.setToolTipText(tr("filter by: continent"));
			this.sbContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinent);			
			
			var btnAddIntel = new qx.ui.form.Button(tr("btnAddIntel"));
			btnAddIntel.setToolTipText(tr("btnAddIntel_toolTip"));
			btnAddIntel.setWidth(100);
			btnAddIntel.addListener("execute", this.addIntel, this);										
			toolBar.add(btnAddIntel);
												
			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);
					
			return toolBar;
		},
		_createActionButton: function(caption, color) {
			var format = "<div style=\"background-image:url(%1);color:%3;cursor:pointer;margin-left:-6px;margin-right:-6px;margin-bottom:-3px;font-size:11px;height:19px\" align=\"center\">%2</div>";
			if (color == undefined) {
				color = "#f3d298";
			}
			return qx.lang.String.format(format, [this.buttonActiveUrl, caption, color]);
		},			
		addIntel: function() {
			var widget = this._getOptionsWidget();
			widget.prepareView(-1);
			widget.open();
		},
		_getOptionsWidget: function() {
			if (this._optionsWidget == null) {
				this._optionsWidget = new bos.gui.IntelligenceOptionsWidget();
			}
			return this._optionsWidget;
		},		
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var intel = storage.getIntelligence();
			
			var json = qx.util.Json.stringify(intel);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {			
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.mergeIntelligence(json);
			});
		},
		_populateContinentsSelectBox: function(sb, list) {
			list.sort();
			var newValues = list.join(",");				
			if (newValues == this._sbContinentAsList) {
				return;
			}
			this._sbContinentAsList = newValues;
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},
		_populateOwnersSelectBox: function(sb, list) {
			list.sort();
			var newValues = list.join(",");			
			if (newValues == this._sbOwnerNameAsList) {
				return;
			}
			this._sbOwnerNameAsList = newValues;
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, ""));
			for (var i = 0; i < list.length; i++) {
				var name = list[i];
				sb.add(new qx.ui.form.ListItem(name, null, name));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},		
		updateWholeView: function() {

			var storage = bos.Storage.getInstance();
			var intelligence = storage.getIntelligence();
			
			var continents = new Array();
			var addedContinents = new Object();
			var owners = new Array();
			var addedOwners = new Object();
			
			for (var i = 0; i < intelligence.length; i++) {
				var item = intelligence[i];
				
				var pos = bos.Utils.convertIdToCoordinatesObject(item.cityId);
				if (addedContinents[pos.cont] == undefined) {
					addedContinents[pos.cont] = true;
					continents.push(pos.cont);
				}
				
				if (addedOwners[item.owner] == undefined) {
					addedOwners[item.owner] = true;
					owners.push(item.owner);
				}
			}
			
			this._populateContinentsSelectBox(this.sbContinent, continents);
			this._populateOwnersSelectBox(this.sbOwnerName, owners);			
		
			this.updateView();
		}
	}
});


qx.Class.define("bos.gui.PlayerInfoPage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("player"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "type", "name", "continent", "position", "score"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(5, 64);
		
		this.add(this.table, { flex : 1 });
			
	}, 
	members: {
		cbLand: null,
		cbWater: null,
		cbCities: null,
		cbCastles: null,
		cbPalaces: null,
		minScoreInput: null,
		playerInfo: null,
		createRowData: function() {

			var rowData = [];
			
			if (this.playerInfo == null) {
				return rowData;
			}
			
			var minScore = parseInt(this.minScoreInput.getValue());
					
			for (var i = 0; i < this.playerInfo.c.length; i++) {
				var city = this.playerInfo.c[i];
				
				if (city.s == 0 && !this.cbCities.getValue()) {
					continue;
				}
				if (city.s == 1 && !this.cbCastles.getValue()) {
					continue;
				}
				if (city.s == 2 && !this.cbPalaces.getValue()) {
					continue;
				}
				if (city.w == 1) {
					if (!this.cbWater.getValue()) {
						continue;
					}
				} else {
					if (!this.cbLand.getValue()) {
						continue;
					}
				}
				
				if (city.p < minScore) {
					continue;
				}
				
				var row = [];

				row["id"] = city.i;
				
				var type = (city.w == 1) ? tr("water") : tr("land");
				type += " ";
 			    switch (city.s) {
				  case 0:
					type += tr("city");
					break;
				  case 1:
					type += tr("castle");
					break;
				  case 2:
					type += tr("palace");
					break;
				}
				row["type"] = type;
				
				row["name"] = city.n;
				row["continent"] = webfrontend.data.Server.getInstance().getContinentFromCoords(city.x, city.y);
				row["position"] = city.x + ":" + city.y;
				row["score"] = city.p;
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			

			var pos = rowData["position"];
			if (pos != null) {
				var coords = bos.Utils.extractCoordsFromClickableLook(pos);
				var sepPos = coords.indexOf(":");
				if (sepPos > 0) {
					var x = parseInt(coords.substring(0, sepPos), 10);
					var y = parseInt(coords.substring(sepPos + 1), 10);
					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.playerName = new qx.ui.form.TextField("");
			this.playerName.setToolTipText(tr("player name"));
			this.playerName.setWidth(120);
			a.setElementModalInput(this.playerName);
			toolBar.add(this.playerName);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				var name = this.playerName.getValue();
				bos.net.CommandManager.getInstance().sendCommand("GetPublicPlayerInfoByName", {
					name: name
				}, this, this.parsePublicPlayerInfo, name);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
			
			var btnTxtExport = new qx.ui.form.Button(tr("btnTxtExport"));			
			btnTxtExport.setWidth(100);
			toolBar.add(btnTxtExport);
			btnTxtExport.addListener("execute", function(evt) {
				this._exportToTxt();								
			}, this);			
			
			this.minScoreInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			this.minScoreInput.setToolTipText(tr("minScoreInput_toolTip"));
			this.minScoreInput.setWidth(60);			
			this.minScoreInput.addListener("changeValue", this.updateView, this);
			toolBar.add(this.minScoreInput);
		
			this.cbLand = new qx.ui.form.CheckBox(tr("land"));			
			this.cbLand.setValue(true);
			this.cbLand.addListener("execute", this.updateView, this);
			toolBar.add(this.cbLand);			

			this.cbWater = new qx.ui.form.CheckBox(tr("water"));			
			this.cbWater.setValue(true);
			this.cbWater.addListener("execute", this.updateView, this);
			toolBar.add(this.cbWater);
			
			this.cbCities = new qx.ui.form.CheckBox(tr("cities"));			
			this.cbCities.setValue(true);
			this.cbCities.addListener("execute", this.updateView, this);
			toolBar.add(this.cbCities);

			this.cbCastles = new qx.ui.form.CheckBox(tr("castles"));			
			this.cbCastles.setValue(true);
			this.cbCastles.addListener("execute", this.updateView, this);
			toolBar.add(this.cbCastles);

			this.cbPalaces = new qx.ui.form.CheckBox(tr("palaces"));			
			this.cbPalaces.setValue(true);
			this.cbPalaces.addListener("execute", this.updateView, this);
			toolBar.add(this.cbPalaces);			
			
			return toolBar;
		},
		_exportToTxt: function() {
			var sb = new qx.util.StringBuilder(2048);
			var sep = " - ";
			var rows = this.createRowData();
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				sb.add(row["continent"], " ", row["position"], sep);
				sb.add(row["type"], sep, row["name"], sep);
				sb.add("\n");
			}
			bos.Utils.displayLongText(sb.get());
		},
		parsePublicPlayerInfo: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found " + name);
				return;
			}
			
			this.playerInfo = result;
			this.updateView();		
		}		
	}
});

qx.Class.define("bos.gui.AllianceInfoPage", {
	extend: bos.gui.SummaryPage,
    construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("alliance"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "rank", "name", "score", "cities"];		
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		//this._tableModel.sortByColumn(2, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		
		columnModel.setColumnWidth(1, 64);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		
		this.add(this.table, { flex : 1 });
			
	}, 
	members: {
		allianceInfo: null,
		playerInfo: null,
		createRowData: function() {

			var rowData = [];
			
			//{"c":353,"i":102497,"n":"Danzie","p":3402087,"r":11}
			
			if (this.allianceInfo == null || this.playerInfo == null) {
				return rowData;
			}
					
			for (var i = 0; i < this.playerInfo.length; i++) {
				var item = this.playerInfo[i];
				
				var row = [];

				row["id"] = item.i;			
				row["rank"] = item.r;				
				row["name"] = item.n;
				row["score"] = item.p;
				row["cities"] = item.c;
				
				rowData.push(row);
			}

			return rowData;
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			var name = rowData["name"];
			if (name != null) {
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: name
				});
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.allianceName = new qx.ui.form.TextField("");
			this.allianceName.setToolTipText(tr("alliance name"));
			this.allianceName.setWidth(120);
			a.setElementModalInput(this.allianceName);
			toolBar.add(this.allianceName);
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.playerInfo = null;
				this.allianceInfo = null;
				var name = this.allianceName.getValue();
				bos.net.CommandManager.getInstance().sendCommand("GetPublicAllianceInfoByNameOrAbbreviation", {
					name: name
				}, this, this.parsePublicAllianceInfoByNameOrAbbreviation, name);				
			}, this);
					
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
					
			return toolBar;
		},
		parsePublicAllianceInfoByNameOrAbbreviation: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found " + name);
				return;
			}
			
			this.allianceInfo = result;
			
			bos.net.CommandManager.getInstance().sendCommand("GetPublicAllianceMemberList", {
				id: result.i
			}, this, this.parsePublicAllianceMemberList, name);				
		},
		parsePublicAllianceMemberList: function(isOk, result, name) {
			if (isOk == false || result == null) {
				alert("Not found (2)" + name);
				return;
			}
			
			this.playerInfo = result;
			this.updateView();		
		}		
	}
});

qx.Class.define("bos.gui.IncomingAttacksPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("incoming attacks"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();
		
		var columnIds = ["id", "targetCityId", "targetCityName", "targetPosition", "targetTS", "lastUpdated", //5
			"type", "state", "start", "end", 
			"attackerCityId", "attackerCityName", "attackerPosition", "player", "playerName", "alliance", "allianceName", "attackerTS", "attackerUnits", "spotted", "claim"];
				
		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 70);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setDataCellRenderer(3, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(4, 64);
		
		columnModel.setColumnWidth(5, 80);
		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(2));		
		
		columnModel.setColumnWidth(6, 70);
		columnModel.setColumnWidth(7, 70);
		columnModel.setColumnVisible(7, false);
		columnModel.setColumnWidth(8, 120);
		columnModel.setColumnVisible(8, false);
		columnModel.setColumnWidth(9, 120);

		columnModel.setColumnVisible(10, false);
		columnModel.setColumnWidth(11, 70);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(12, 64);
		columnModel.setDataCellRenderer(12, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnVisible(13, false);
		columnModel.setDataCellRenderer(14, new bos.ui.table.cellrenderer.ClickableLook());
		
		//allianceId
		columnModel.setColumnVisible(15, false);
		//alliance name
		columnModel.setDataCellRenderer(16, new bos.ui.table.cellrenderer.ClickableLook());
				
		columnModel.setColumnWidth(17, 64);
		columnModel.setColumnVisible(17, true);
		
		columnModel.setColumnWidth(18, 120);
		columnModel.setColumnVisible(18, true);
		
		columnModel.setColumnWidth(20, 40);
		
		this.add(this.table, { flex : 1 });
		
		this.updateIcon();
		
		if (webfrontend.data.AllianceAttack != undefined) {
			webfrontend.data.AllianceAttack.getInstance().addListener("changeVersion", this.updateIcon, this);
		}
			
	}, 
	members: {
		sbOrderTypes: null,
		sbDefenderTypes: null,
		attacksInfo: new Object(),
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var player = webfrontend.data.Player.getInstance();
			var playerId = player.getId();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			var storage = bos.Storage.getInstance();

			var addedAttacks = {};
			
			var filterTypeId = -1;
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var defenderTypeId = -1;
			var sel = this.sbDefenderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				defenderTypeId = sel[0].getModel();
			}			
			
			var server = bos.Server.getInstance();
			var list = player.getIncomingUnitOrders();
			if (list != null && defenderTypeId != 2) {

				for (var i = 0, iCount = list.length; i < iCount; i++) {
					var item = list[i];
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					var cityId = item.targetCity;
				
					addedAttacks["a" + item.id] = true;
				
					row["id"] = item.id;
					row["targetCityId"] = cityId;
					row["targetCityName"] = item.targetCityName;
					if (cityId >= 0) {
						row["targetPosition"] = bos.Utils.convertIdToCoodrinates(cityId);
						row["targetTS"] = item.ts_defender;
						var city = server.cities[cityId];
						if (city != undefined) {							
							row["lastUpdated"] = city.getLastUpdated();
						}
					}
					
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					
					row["spotted"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.detectionStep));
					row["claim"] = (item.hasBaron) ? item.claim : "";
					
					row["attackerCityId"] = item.city;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.city);
					row["attackerCityName"] = item.cityName;
									
					row["player"] = item.player;
					row["playerName"] = item.playerName;
					row["alliance"] = item.alliance;
					row["allianceName"] = item.allianceName;
										
					row["attackerUnits"] = "";
					row["attackerTS"] = item.ts_attacker;
					if (item.units != null) {
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["attackerUnits"] += ", ";
							}
							row["attackerUnits"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							//var space = unit.count * getUnitRequiredSpace(unit.type);
							//row["attackerTS"] += space;
						}
					} else {
						var intel = storage.findIntelligenceById(item.city);					
						row["attackerUnits"] = (intel == null) ? "?" : "intel: " + intel.description;						
					}

					rowData.push(row);
				}
			}
			
			if (webfrontend.data.AllianceAttack != undefined) {
				list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			} else {
				list = null;
			}
			if (list != null && defenderTypeId != 1) {
				for (var i = 0; i < list.length; i++) {
					var item = list[i];
					
					if (addedAttacks["a" + item.id] != undefined || (defenderTypeId == -1 && item.tp == playerId)) {
						//dont add twice the same attack and dont show play attacks and alliance attacks for the same city
						continue;
					}
					
					if (filterTypeId != -1 && filterTypeId != item.type) {
						continue;
					}					
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
								/*
			                    "i": 22697776,
                    "t": 0,
                    "ss": 0,
                    "es": 13812688,
                    "s": 0,
                    "c": 15400977,
                    "cn": "D08 Sieniawa",
                    "p": 247863,
                    "pn": "Urthadar",
                    "a": 8508,
                    "an": "Brotherhood_Of_Steel",
                    "tc": 15400978,
                    "tcn": "Theramore2",
                    "tp": 248055,
                    "tpn": "Cudgel"
			*/
				
					row["id"] = item.i;
					row["targetCityId"] = item.tc;
					row["targetCityName"] = item.tpn + ": " + item.tcn;
					row["targetPosition"] = bos.Utils.convertIdToCoodrinates(item.tc);
					
					row["type"] = bos.Utils.translateOrderType(item.t);
					row["state"] = this.translateState(item.s);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.ss));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.es));
					
					row["attackerCityId"] = item.c;
					row["attackerPosition"] = bos.Utils.convertIdToCoodrinates(item.c);
					row["attackerCityName"] = item.cn;
									
					row["player"] = item.p;
					row["playerName"] = item.pn;
					row["alliance"] = item.a;
					row["allianceName"] = item.an;
										
					var intel = storage.findIntelligenceById(item.c);					
					row["attackerUnits"] = (intel == null) ? "?" : "intel: " + intel.description;
					row["attackerTS"] = "?";

					rowData.push(row);
				}			
			
			}

			this.updateIcon();
			
			return rowData;
		}, 
		updateIcon: function() {
			var attacked = false;
			var list;

			if (webfrontend.data.AllianceAttack != undefined) {
				list = webfrontend.data.AllianceAttack.getInstance().getAttacks();
			} else {
				list = null;
			}
			if (list != null && list.length > 0) {
				attacked = true;
			} else {
				var player = webfrontend.data.Player.getInstance();
				list = player.getIncomingUnitOrders();
				if (list != null && list.length > 0) {
					attacked = true;
				}
			}
			
			if (attacked) {				
				var img = webfrontend.config.Config.getInstance().getUIImagePath("ui/icons/icon_attack_warning.gif");
				this.setIcon(img);
			} else {
				this.setIcon("");
			}
		}, 
		translateState: function(state) {
		/*
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");

			}
			*/
			return "??? " + state;			
		}, 
		_handleCellClick: function(event) {

			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:				
				var cityId = parseInt(rowData["targetCityId"]);
				if (!isNaN(cityId)) {
					a.setMainView("c", cityId, -1, -1);
					break;
				}
				//yes, I dont want break here
			case 3:
				var pos = rowData["targetPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 10:
			case 11:
			case 12:
				var pos = rowData["attackerPosition"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						if (event.getColumn() != 12) {
							webfrontend.gui.Util.openCityProfile(x, y);
						} else {
							a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
						}
						
					}
				}				
				break;
			case 13:
			case 14:
				a.showInfoPage(a.getPlayerInfoPage(), {
					name: rowData["playerName"]
				});
				break;				
			case 15:
			case 16:				
				a.showInfoPage(a.getAllianceInfoPage(), {
					name: rowData["allianceName"]
				});
				break;				
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbDefenderTypes = this._createDefenderTypesSelectBox();
			this.sbDefenderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDefenderTypes);

			var btnExport = new qx.ui.form.Button(tr("Aktar"));
			btnExport.setToolTipText(tr("Saldırıları text biçiminde dışa aktarır"));
			btnExport.setWidth(100);
			toolBar.add(btnExport);
			btnExport.addListener("execute", function(evt) {
				this.exportInTextFormat();								
			}, this);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));
			btnCsvExport.setToolTipText(tr("btnCsvExport_toolTip"));
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			var btnShowIntel = new qx.ui.form.Button(tr("show intel"));
			btnShowIntel.setWidth(100);			
			toolBar.add(btnShowIntel);
			btnShowIntel.addListener("execute", function(evt) {
				var widget = bos.gui.ExtraSummaryWidget.getInstance();
				widget.open();
				widget.switchToIntelligenceTab();
			}, this);			
			
			return toolBar;
		}, 
		exportInTextFormat: function() {
			var sb = new qx.util.StringBuilder(2048);
			var sep = "\n";
			
			var rows = this.createRowData();
			
			var date = new Date();
			sb.add("Attacked cities list generated at ", qx.util.format.DateFormat.getDateTimeInstance().format(date), sep, sep);
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				if (i > 0) {
					sb.add(sep);
				}
				
				sb.add(row["targetCityName"], " (", row["targetPosition"], ")");
				if (["targetTS"] != null) {
					sb.add(" total def: ", row["targetTS"], " TS");
				}
				sb.add(sep);
				sb.add(row["type"], " attack at: ", row["end"], sep);
				sb.add("Attacks: ", row["playerName"], " (", row["allianceName"], ") from city: ", row["attackerCityName"], " (", row["attackerPosition"], ") ", sep);
				if (row["attackerUnits"] != "?") {
					sb.add("Attack strength: ", row["attackerTS"], "TS", sep);
					sb.add("Attacker units: ", row["attackerUnits"], sep);
				}
								
			}
			
			bos.Utils.displayLongText(sb.get());
			
		}, 
		_createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>emir türü</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:siege"), null, 5));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:unknown"), null, 0));

			return sb;		
		}, 
		_createDefenderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>defans tipi</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			sb.add(new qx.ui.form.ListItem("you", null, 1));
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:alliance members"), null, 2));

			return sb;		
		}
	}
});

qx.Class.define("bos.gui.MassRecruitmentOptionsWidget", {
	extend: qx.ui.window.Window,
	construct: function() {
		qx.ui.window.Window.call(this);
		
		this.set({
			width: 640,
			minWidth: 200,
			maxWidth: 700,
			height: 540,
			minHeight: 200,
			maxHeight: 700,
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: (tr("mass recruitment")),
			resizeSensitivity: 7,
			contentPadding: 0
		});

		this.setLayout(new qx.ui.layout.VBox(5));
		
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer, key);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.lblUnitsInCity = new qx.ui.basic.Label(tr("in city:"));
		this.unitContainer.add(this.lblUnitsInCity, {
			left: 2,
			top: maxUnitsPerColumn * unitHeight + 10
		});
		
		this.add(this.createFooter());
		
		webfrontend.gui.Util.formatWinClose(this);
		
		this.moveTo(400, 200);
		
	}, 
	members: {
		units: null,
		unitContainer: null,
		lblUtilisation: null,
		editedOrder: null,
		productionInfo: null,
		lblUnitsInCity: null,
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container, unitType) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			
			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			lblUnitName.setRich(true);			
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.addListener("changeValue", this.updateView, this);
			countInput.setWidth(100);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);
			
			var btnMax = new qx.ui.form.Button("Max");
			btnMax.setWidth(50);
			container.add(btnMax, {
				left: x + 230,
				top: y + 6
			});						
			btnMax.addListener("click", function(event) {
				this._toMax(unitType);
			}, this);

			var result = {
				'image': img,
				'count': countInput,
				'label': lblUnitName,
				'name': unit.dn
			};
			return result;
		},  
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var btnOk = new qx.ui.form.Button(tr("OK"));
			btnOk.setWidth(150);
			container.add(btnOk);
			btnOk.addListener("click", this.confirm, this);
			
			var btnClear = new qx.ui.form.Button(tr("clear"));
			btnClear.setWidth(70);
			container.add(btnClear);
			btnClear.addListener("click", this.clearAll, this);
			
			var btnAddCityUnits = new qx.ui.form.Button(tr("add city units"));
			btnAddCityUnits.setWidth(110);
			container.add(btnAddCityUnits);
			btnAddCityUnits.addListener("click", this.addCityUnits, this);			

			this.lblUtilisation = new qx.ui.basic.Label("");
			container.add(this.lblUtilisation);

			return container;
		}, 
		confirm: function() {
			var city = webfrontend.data.City.getInstance();
		
			var order = {
				cityId: city.getId(),
				units: new Array()
			};
			
			var res = webfrontend.res.Main.getInstance();
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					var info = this._findProductionInfo(key);
					if (info == null) {
						bos.Utils.handleError("Couldn't find production info for unit type " + key);
						return;
					}
					totalTS += count * getUnitRequiredSpace(key);
					var u = {
						type: key,
						count: count,
						time: info.ti
					};
					order.units.push(u);
				}
			}
			
			if (totalTS == 0) {
				bos.Utils.handleWarning(tr("please enter some unit count"));
				return;
			}			
			
			if (totalTS > city.getUnitLimit()) {
				bos.Utils.handleWarning("You have entered " + totalTS + "TS while max for this city is " + city.getUnitLimit());
				return;
			}			

			var storage = bos.Storage.getInstance();
			if (this.editedOrder == null) {					
				storage.addRecruitmentOrder(order);
			} else {
				this.editedOrder.units = order.units;
				
				storage.saveRecruitmentOrders();
				storage.setRecruitmentOrdersVersion(storage.getRecruitmentOrdersVersion() + 1);
			}
			
			this.editedOrder == null;

			this.close();
			
		},
		_calculateTS: function() {
			var res = webfrontend.res.Main.getInstance();
			
			var totalTS = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];
				
				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					totalTS += count * getUnitRequiredSpace(key);
				}
			}		
			return totalTS;
		},
		_toMax: function(unitType) {
			var inputs = this.units[unitType];
			var count = parseInt(inputs.count.getValue(), 10);
			
			var ts = this._calculateTS();
			var city = webfrontend.data.City.getInstance();
			var max = city.getUnitLimit();
			
			var heads = getUnitRequiredSpace(unitType);
			var c = max - ts + count * heads;
			if (heads > 1) {
				c = Math.floor(c / heads);
			}
			inputs.count.setValue(c);
		},
		updateView: function() {
			var city = webfrontend.data.City.getInstance();
			var current = this._calculateTS();
			var max = city.getUnitLimit();
			this.lblUtilisation.setValue(current + " / " + max + " TS");
		},
		prepareView: function() {
			var city = webfrontend.data.City.getInstance();
			
			this.clearAll();			
			var storage = bos.Storage.getInstance();
			this.editedOrder = storage.findRecruitmentOrderById(city.getId());
			if (this.editedOrder != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var i = 0; i < this.editedOrder.units.length; i++) {
					var o = this.editedOrder.units[i];
					var inputs = this.units[o.type];
					inputs.count.setValue(o.count);
				}
			}
			
			var inCity = "";
			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];
					if (inCity.length > 0) {
						inCity += ", ";
					}					
					inCity += unit.total + " " + formatUnitType(key, unit.total);
				}			
			}
			this.lblUnitsInCity.setValue(tr("in city:") + inCity);			
			
			this.requestProductionInfo();
			this.updateView();
		},
		addCityUnits: function() {
			var city = webfrontend.data.City.getInstance();

			if (city.getUnits() != null) {
				for (var key in city.getUnits()) {
					var unit = (city.getUnits())[key];					
					if (this.units.hasOwnProperty(key)) {
						this.units[key].count.setValue(unit.total);
					}
				}			
			}			
		},
		requestProductionInfo: function() {
			this.productionInfo = null;
			webfrontend.net.CommandManager.getInstance().sendCommand("GetUnitProductionInfo", {
				cityid: webfrontend.data.City.getInstance().getId()
			}, this, this._onProductionInfo);
		},
		_onProductionInfo: function(isOk, result) {
			if (!isOk || result == null) {
				return;
			}
			this.productionInfo = result;
			
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (this.units.hasOwnProperty(info.t) && info.r != null && info.r.length > 0) {
					var u = this.units[info.t];
					if (info.r[0].b == 0) {
						u.label.setValue("<strong>" + u.name + "</strong>");
					} else {
						u.label.setValue(u.name);
					}
				}
			}
		},
		_findProductionInfo: function(unitType) {
			if (this.productionInfo == null) {
				return null;
			}
			for (var i = 0; i < this.productionInfo.u.length; i++) {
				var info = this.productionInfo.u[i];
				if (info.t == unitType) {
					return info;
				}
			}
			return null;
		}
	}
});


qx.Class.define("bos.gui.MassRecruitmentPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("recruitment"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.buttonActiveUrl = webfrontend.config.Config.getInstance().getImagePath("ui/btn_army_overview.gif");
		
		this.add(this._createToolBar());
		
		this.cityIdColumn = 8;
		this.typeColumn = 9;
		var columnNames = [tr("city/order"), tr("action"), tr("status"), tr("missing"), tr("resourcesFor"), tr("recruiting"), tr("available"), tr("recruitmentTime"), tr("cityId"), tr("type")];
		
		this.tree = new qx.ui.treevirtual.TreeVirtual(columnNames, {
			tableColumnModel: function(d) {
				return new qx.ui.table.columnmodel.Basic(d);
			}
		});
		this.tree.addListener("cellClick", this._handleCellClick, this);
		this.tree.setStatusBarVisible(false);
		this.tree.setAlwaysShowOpenCloseSymbol(false);
		this.tree.set({
			rowHeight: 19,
			headerCellHeight: 22,
			focusCellOnMouseMove: false,
			columnVisibilityButtonVisible: false			
		});
        var eU = "#564d48";
        var fi = "#c9ae7c";
        var eY = "#70645d";
        var fa = "#f3d298";      
        var fm = "#373930";
        var eQ = "#4d4f46";
        var eP = "#4f5245"; 		
		
		var eE = {
			sBgcolFocusedSelected: eY,
			sBgcolFocused: eY,
			sBgcolSelected: eU,
			sBgcolEven: eU,
			sBgcolOdd: eU,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: fi,
			sStyleHorLine: "1px solid "
		};
		var eF = {
			sBgcolFocusedSelected: eP,
			sBgcolFocused: eP,
			sBgcolSelected: fm,
			sBgcolEven: fm,
			sBgcolOdd: fm,
			sColSelected: fa,
			sColNormal: fa,
			sColHorLine: eQ,
			sStyleHorLine: "1px dotted "
		};		
		this.tree.setDataRowRenderer(new webfrontend.gui.TreeRowRendererCustom(this.tree, eE, eF));
				
		var tcm = this.tree.getTableColumnModel();
		tcm.setDataCellRenderer(0, new webfrontend.data.TreeDataCellRendererCustom({
			leafIcon: false
		}));		
		tcm.setColumnVisible(this.cityIdColumn, false);		
		tcm.setColumnVisible(this.typeColumn, false);
		
		this.tree.setMetaColumnCounts([-1]);		

		tcm.setColumnWidth(0, 150);
		tcm.setColumnWidth(1, 75);
		tcm.setColumnWidth(2, 60);
		
		for (var i = 3; i <= 7; i++) {
			tcm.setColumnWidth(i, 100);
			//tcm.setColumnSortable(i, true);
		}
		/*
		tcm.setDataCellRenderer(1, new webfrontend.gui.CellRendererHtmlCustom({
			sBorderRCol: "#4d4f46"
		}));
		*/
		
		for (var i = 1; i <= 7; i++) {
			tcm.setDataCellRenderer(i, new webfrontend.gui.CellRendererHtmlCustom({
				sBorderRCol: "#4d4f46"
			}));
		}
		
				
		tcm.addListener("widthChanged", this._treeWidthChanged, this)
		
		this.add(this.tree, { flex: 1 } );
		
		bos.Storage.getInstance().addListener("changeRecruitmentOrdersVersion", this.updateWholeView, this);
	}, 
	members: {
		tree: null,
		cityIdColumn: null,
		typeColumn: null,
		_optionsWidget: null,
		sbCityType: null,
		_sendingStatuses: {},
		buttonActiveUrl: null,
		sbMissingCount: null,
		cities: {},
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, true);
			
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType, true);
			}, this);
			
			this.sbCityType.addListener("changeSelection", this.updateWholeView, this);						
			toolBar.add(this.sbCityType);

			this.sbMissingCount = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			this.sbMissingCount.setToolTipText(tr("missing"));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr("Any"), null, -1));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">0"), null, 0));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">10k"), null, 10000));
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">30k"), null, 30000));	
			this.sbMissingCount.add(new qx.ui.form.ListItem(tr(">100k"), null, 100000));			
			this.sbMissingCount.addListener("changeSelection", this.updateWholeView, this);						
			toolBar.add(this.sbMissingCount);			
			
			var btnRecruitAll = new qx.ui.form.Button(tr("btnRecruitAll"));
			btnRecruitAll.setToolTipText(tr("btnRecruitAll_toolTip"));
			btnRecruitAll.setWidth(100);
			btnRecruitAll.addListener("execute", this.recruitAll, this);										
			toolBar.add(btnRecruitAll);
			
			var btnEnableMassRecruitment = new qx.ui.form.Button(tr("btnEnableMassRecruitment"));
			btnEnableMassRecruitment.setToolTipText(tr("btnEnableMassRecruitment_toolTip"));
			btnEnableMassRecruitment.setWidth(100);
			btnEnableMassRecruitment.addListener("execute", this.enableMassRecruitment, this);										
			toolBar.add(btnEnableMassRecruitment);
			
			var btnDisableMassRecruitment = new qx.ui.form.Button(tr("btnDisableMassRecruitment"));
			btnDisableMassRecruitment.setToolTipText(tr("btnDisableMassRecruitment_toolTip"));
			btnDisableMassRecruitment.setWidth(100);
			btnDisableMassRecruitment.addListener("execute", this.disableMassRecruitment, this);										
			toolBar.add(btnDisableMassRecruitment);
			
			var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
			btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
			btnRefreshView.setWidth(100);
			btnRefreshView.addListener("execute", this.updateWholeView, this);
			toolBar.add(btnRefreshView);
			
			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				dialog.showGenericNotice(tr("help"), tr("bos.gui.MassRecruitmentPage.help"), tr("bos.gui.MassRecruitmentPage.help2"), "webfrontend/ui/bgr_popup_survey.gif");

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);
			
			var btnExportSettings = new qx.ui.form.Button(tr("btnExportSettings"));
			btnExportSettings.setToolTipText(tr("btnExportSettings_toolTip"));
			btnExportSettings.setWidth(120);
			btnExportSettings.addListener("execute", this.exportSettings, this);
			toolBar.add(btnExportSettings);
			
			var btnImportSettings = new qx.ui.form.Button(tr("btnImportSettings"));
			btnImportSettings.setToolTipText(tr("btnImportSettings_toolTip"));
			btnImportSettings.setWidth(120);
			btnImportSettings.addListener("execute", this.importSettings, this);
			toolBar.add(btnImportSettings);	

			var btnDefenceMinisterSetTargetArmy = new qx.ui.form.Button(tr("Savunma Bakanı"));
			btnDefenceMinisterSetTargetArmy.setToolTipText(tr("Hedef ordu ayarlayın"));
			btnDefenceMinisterSetTargetArmy.setWidth(120);
			btnDefenceMinisterSetTargetArmy.addListener("execute", this.defenceMinisterSetTargetArmy, this);
			toolBar.add(btnDefenceMinisterSetTargetArmy);	
			
			return toolBar;
		},
		defenceMinisterSetTargetArmy: function() {
			//SetTargetArmy
			//"cityid":"3670229","units":[{"t":"17","c":780}]}
			//{"cityId":"10354721","units":[{"type":"7","count":168500,"time":6}	
			
			var cities = webfrontend.data.Player.getInstance().cities;
			
			var orders = bos.Storage.getInstance().getRecruitmentOrders();
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				
				var units = new Array();
				for (var u = 0; u < order.units.length; u++) {
					var o = order.units[u];
					units.push({
						t: o.type,
						c: o.count
					});
				}
				
				var request = {
					cityid: order.cityId,
					units: units
				};
				
				bos.net.CommandManager.getInstance().sendCommand("SetTargetArmy", request, this, this._parseSetTargetArmyResponse, request);
			}			
		},
		_parseSetTargetArmyResponse: function(isOk, result, context) {
			
		},
		enableMassRecruitment: function() {
			var widget = this._getOptionsWidget();
			widget.prepareView();
			widget.open();
		},
		disableMassRecruitment: function() {
			var city = webfrontend.data.City.getInstance();
			var storage = bos.Storage.getInstance();
			var order = storage.findRecruitmentOrderById(city.getId());
			if (order != null) {
				if (confirm(tr("are you sure?"))) {
					storage.removeRecruitmentOrder(city.getId());
				}
			}
		},
		_shouldCityBeIncluded: function(city, order) {
		
			var sel = this.sbCityType.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var reqType = sel[0].getModel();
			if (reqType != "A") {
				var type = bos.CityTypes.getInstance().parseReference(city.reference);
				switch (reqType) {
					case 'C':
						if (!type.isCastle) return false;
						break;
					case 'D':
						if (!type.isDefensive) return false;
						break;
				}
			}
			
			var minimalMissing = parseInt(this.sbMissingCount.getSelection()[0].getModel());
			if (minimalMissing != -1) {
				var res = webfrontend.res.Main.getInstance();
				
				var server = bos.Server.getInstance();
				var storedCity = server.cities[order.cityId];
				if (storedCity == undefined) {
					return true;
				}
				
				var totalMissing = 0;				
				for (var j = 0; j < order.units.length; j++) {
					var unit = order.units[j];					
					
							
					var details = this._calculateUnitDetails(unit, storedCity);				
					var heads = res.units[unit.type].uc;
					
					if (heads > 1) {
						totalMissing += details.missing * heads;
					} else {
						totalMissing += details.missing;
					}					
				}
								
				if (totalMissing < minimalMissing) {
					return false;
				}
			}

			return true;
		},
		_treeWidthChanged: function(e) {
			var ed = e.getData();
			if (ed.col == 1 && ed.newWidth != 75) {
				var tcm = this.tree.getTableColumnModel();
				tcm.setColumnWidth(ed.col, 75);
			}
        },
		_getOptionsWidget: function() {
			if (this._optionsWidget == null) {
				this._optionsWidget = new bos.gui.MassRecruitmentOptionsWidget();
			}
			return this._optionsWidget;
		},
		updateWholeView: function() {
			this.cities.reset = true;
			this.updateView();
		},
		updateView: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getRecruitmentOrders();
			
			var model = this.tree.getDataModel();
			
			if (this.cities.hasOwnProperty("reset")) {
				model.clearData();
				this.cities = {};
			}
			
			var cities = webfrontend.data.Player.getInstance().cities;
			var res = webfrontend.res.Main.getInstance();			
			var server = bos.Server.getInstance();		
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city, order)) {
					continue;
				}
				
				var storedCity = server.cities[order.cityId];
				var unitLimit = 0;
				var unitCount = new Object();
				if (storedCity != undefined) {
					unitLimit = storedCity.getUnitLimit();
					
					//var h = f.getUnitLimit() - f.getUnitCount() - f.getUnitsInQueue();
				} else {					
					bos.Utils.handleError("No data about city. Please visit " + bos.Utils.convertIdToCoodrinates(order.cityId));
					continue;
				}
				
				var currentTS = this._currentTSInCity(storedCity);
				var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
				var bid;
				if (!this.cities.hasOwnProperty(order.cityId)) {				
					bid = model.addBranch(null, city.name, true);
					this.cities[order.cityId] = {
						bid: bid,
						leafs: []
					}
					model.setState(bid, {
						icon: "",
						iconSelected: ""
					});
				} else {
					bid = this.cities[order.cityId].bid;
				}
				var treeData = this.cities[order.cityId];
				
				var totalMissing = 0;
				var totalResourcesFor = 0;
				var totalRecruited = 0;
				var totalCount = 0;
				var ordersAvailableForRecruitment = 0;
				
				var textColor = bos.Const.TABLE_DEFAULT_COLOR;
				for (var j = 0; j < order.units.length; j++) {
					var unit = order.units[j];					
					
					var lid;
					if (treeData.leafs.length <= j) {
						lid = model.addLeaf(bid, unit.count + " " + formatUnitType(unit.type, unit.count));
						treeData.leafs.push(lid);
					} else {
						lid = treeData.leafs[j];
					}								
					var details = this._calculateUnitDetails(unit, storedCity);
					
					var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
					var availableSpace = freeSpaceInBarracks;
					var heads = res.units[unit.type].uc;
					if (heads > 1) {
						availableSpace = Math.floor(availableSpace / heads);
					}
					
					if (details.missing > 0 && details.resourcesFor > 0 && availableSpace >= heads) {
						model.setColumnData(lid, 1, this._createActionButton(tr("recruit")));
						ordersAvailableForRecruitment++;
					} else {
						model.setColumnData(lid, 1, "");
					}
					var status = this._getStatus(order.cityId, j);
					if (status != undefined) {
						model.setColumnData(lid, 2, this.translateStatus(status.status));
						//secondRow["status"] = human_time(Math.floor((now - status.date) / 1000));						
					} else {
						model.setColumnData(lid, 2, "");
					}
					model.setColumnData(lid, 3, bos.Utils.makeColorful(details.missing, textColor));
					model.setColumnData(lid, 4, bos.Utils.makeColorful(details.resourcesFor, textColor));
					model.setColumnData(lid, 5, bos.Utils.makeColorful(details.recruited, textColor));					
					model.setColumnData(lid, 6, bos.Utils.makeColorful(details.currentCount, textColor));
					model.setColumnData(lid, 7, bos.Utils.makeColorful(unit.time, textColor));
					model.setColumnData(lid, this.cityIdColumn, order.cityId);
					model.setColumnData(lid, this.typeColumn, j);					
					
					totalMissing += details.missing;
					totalResourcesFor += details.resourcesFor;
					totalRecruited += details.recruited;
					totalCount += details.currentCount;
				}
								
				if (ordersAvailableForRecruitment > 0) {
					model.setColumnData(bid, 1, this._createActionButton(tr("recruit")));
				} else {
					model.setColumnData(bid, 1, "");
				}
				model.setColumnData(bid, 3, bos.Utils.makeColorful(totalMissing, textColor));
				model.setColumnData(bid, 4, bos.Utils.makeColorful(totalResourcesFor, textColor));
				model.setColumnData(bid, 5, bos.Utils.makeColorful(totalRecruited, textColor));
				model.setColumnData(bid, 6, bos.Utils.makeColorful(totalCount, textColor));
				model.setColumnData(bid, this.cityIdColumn, order.cityId);
				model.setColumnData(bid, this.typeColumn, -1);
				
			}
			
			model.setData();
		},
		_createActionButton: function(caption, color) {
			var format = "<div style=\"background-image:url(%1);color:%3;cursor:pointer;margin-left:-6px;margin-right:-6px;margin-bottom:-3px;font-size:11px;height:19px\" align=\"center\">%2</div>";
			if (color == undefined) {
				color = "#f3d298";
			}
			return qx.lang.String.format(format, [this.buttonActiveUrl, caption, color]);
		},
		_calculateTotalRecruitingUnits: function(storedCity) {
			if (storedCity.unitQueue == null) {
				return 0;
			}
			var res = webfrontend.res.Main.getInstance();
			var recruiting = 0;
			for (var k = 0; k < storedCity.unitQueue.length; k++) {
				var uq = storedCity.unitQueue[k];
				if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {					
					recruiting += uq.left * res.units[uq.type].uc;					
				}
			}
			return recruiting;
		},
		_currentTSInCity: function(storedCity) {			
			var ts = 0;			
			if (storedCity.getUnits() != null) {
				var res = webfrontend.res.Main.getInstance();
				for (var key in storedCity.getUnits()) {
					var item = (storedCity.getUnits())[key];
					
					var unit = res.units[key];
					ts += item.total * unit.uc;
				}
			}
			return ts;
		},
		_calculateUnitDetails: function(unit, storedCity) {
			var o = {
				currentCount: 0,
				recruited: 0,
				missing: 0,
				resourcesFor: 0
			};
		
			var currentItem = (storedCity.getUnits())[unit.type];
			if (currentItem != undefined) {						
				o.currentCount = currentItem.total;
			}
			
			if (storedCity.unitQueue != null) {
				for (var k = 0; k < storedCity.unitQueue.length; k++) {
					var uq = storedCity.unitQueue[k];
					if (uq.end >= webfrontend.data.ServerTime.getInstance().getServerStep()) {
						if (uq.type == unit.type) {
							o.recruited += uq.left;
						}
					}
				}
			}
			
			o.missing = Math.max(0, unit.count - o.currentCount - o.recruited);
						
			var resources = new Array();
			resources[0] = webfrontend.data.Player.getInstance().getGold();
			var row = [];
			var summary = getSummaryWidget();			
			if (summary._populateResources(row, storedCity.getId())) {				
				resources[1] = row["wood"];
				resources[2] = row["stone"];
				resources[3] = row["iron"];
				resources[4] = row["food"];
			}
			
			var maxRecruitable = [0, -1, -1, -1, -1];
			if (resources.length >= 5) {
				var res = webfrontend.res.Main.getInstance();
				var u = res.units[unit.type];	
				if (u.g == 0) {
					maxRecruitable[0] = -1;
				} else {
					maxRecruitable[0] = Math.floor(resources[0] / u.g);
				}
				
				for (var resType in u.res) {
					var req = u.res[resType];
					maxRecruitable[resType] = Math.floor(resources[resType] / req);
				}
				
				o.resourcesFor = bos.Const.INF;
				
				for (var i = 0; i <= 4; i++) {
					var min = maxRecruitable[i];
					if (min != -1) {
						o.resourcesFor = Math.min(o.resourcesFor, min);
					}
				}
			}			
			
			return o;
		},
		recruitAll: function() {
			var cities = webfrontend.data.Player.getInstance().cities;
			var orders = bos.Storage.getInstance().getRecruitmentOrders();
			this._sendingStatuses = {};
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				if (!cities.hasOwnProperty(order.cityId)) {
					//city has different owner, skip it
					continue;
				}
				var city = cities[order.cityId];
				if (!this._shouldCityBeIncluded(city, order)) {
					continue;
				}				
				this.recruit(order.cityId, -1, false);
			}
		},
		_handleCellClick: function(e) {
			
			var row = this.tree.getDataModel().getRowData(e.getRow());
			var cityId = row[this.cityIdColumn];
			
			switch (e.getColumn()) {
				case 0:
					a.setMainView("c", cityId, -1, -1);
					break;
				case 1:
					//action
					this.recruit(cityId, row[this.typeColumn], true);					
					break;
			}
		},
		recruit: function(cityId, type, manual) {
			//type = -1 whole city, else index in units
			
			var order = bos.Storage.getInstance().findRecruitmentOrderById(cityId);
			if (order == null) {
				bos.Utils.handleError("Couldnt find recruitment order for cityId=" + cityId);
				return;
			}
			
			var server = bos.Server.getInstance();
			var storedCity = server.cities[cityId];
			if (storedCity == null) {
				bos.Utils.handleError("Couldnt find saved city data for cityId=" + cityId);
				return;
			}
			
			var recruitingInCity = this._calculateTotalRecruitingUnits(storedCity);
			var currentTS = this._currentTSInCity(storedCity);
			var freeSpaceInBarracks = storedCity.getUnitLimit() - currentTS - recruitingInCity;
			if (freeSpaceInBarracks <= 0) {
				if (manual) {
					bos.Utils.handleWarning("No free space in barracks");
				}
				return;
			}
			
			var res = webfrontend.res.Main.getInstance();
			
			for (var i = 0; i < order.units.length; i++) { 
				if (type != -1 && type != i) {
					continue;
				}
				var unit = order.units[i];
				
				var availableSpace = freeSpaceInBarracks;
				var heads = res.units[unit.type].uc;
				if (heads > 1) {
					availableSpace = Math.floor(availableSpace / heads);
				}				
				
				var details = this._calculateUnitDetails(unit, storedCity);
				
				var count = Math.min(details.missing, details.resourcesFor, availableSpace);
				if (count <= 0) {
					continue;
				}
				
				var units = new Array();
				units.push({
					t: unit.type,
					c: count
				});
				
				var context = { 
					order: order,
					orderIndex: i,
					units: units
				};
			
				bos.net.CommandManager.getInstance().sendCommand("StartUnitProduction", {
					cityid: cityId,
					units: units,
					isPaid: true
				}, this, this._parseResponse, context);
				
				freeSpaceInBarracks -= count * heads;				
			}
		},
		_parseResponse: function(isOk, errorCode, context) {
			try {
				if (isOk == false || errorCode == null) {
					//comm error					
					this._setStatus(context, -1);
				} else {
					this._setStatus(context, parseInt(errorCode));
				}
				this.updateView();
			} catch (e) {
				bos.Utils.handleError(e);
			}
		},
		_setStatus: function(context, status) {
					
			var newStatus = {
				status: status,
				date: new Date()
			};
			
			this._sendingStatuses["o" + context.order.cityId + "_" + context.orderIndex] = newStatus;
			
			if (status == 0) {
				var server = bos.Server.getInstance();
				var storedCity = server.cities[context.order.cityId];
				if (storedCity != undefined) {
					if (storedCity.unitQueue == null) {
						storedCity.unitQueue = new Array();
					}
					
					var start = webfrontend.data.ServerTime.getInstance().getServerStep();
					if (storedCity.unitQueue.length > 0) {
						var lastOrder = storedCity.unitQueue[storedCity.unitQueue.length - 1];
						if (lastOrder.end > start) {
							start = lastOrder.end;
						}						
					}
				
					var unit = context.units[0];
					
					var usedRecruitmentOrder = context.order.units[context.orderIndex];

					var end = start + usedRecruitmentOrder.time * unit.c;
					
					var uq = {
						id: -1,
						type: unit.t,
						count: unit.c,
						batch: 1,
						left: unit.c,
						start: start,
						end: end,
						isPaid: true
					};
					
					storedCity.unitQueue.push(uq);
					storedCity.unitsInQueue += unit.c;
					
					server.markCityDirty(storedCity.getId());
				}
			}
		},
		_getStatus: function(cityId, orderIndex) {
			return this._sendingStatuses["o" + cityId + "_" + orderIndex];
		},
		translateStatus: function(status) {
			if (status == 0) {
				return "OK";
			}
			if (status == -1) {
				return "Comm. err";
			}
			var errors = "";
			if ((status & 0x01) != 0) errors += "I";
			if ((status & 0x02) != 0) errors += "R";
			if ((status & 0x04) != 0) errors += "Q";
			if ((status & 0x08) != 0) errors += "T";
			if ((status & 0x10) != 0) errors += "B";
			if ((status & 0x20) != 0) errors += "G";
			return errors;
		},
		_sortCities: function(tcm) {
			var data = tcm.getData();
			if (data.length == 0 || data[0].children.length == 0) {
				return;
			}
			
			data[0].children.sort(function(a, b) {
				var o1 = data[a].label.toLowerCase();
				var o2 = data[b].label.toLowerCase();
				if (o1 < o2) return -1;
				if (o1 > o2) return 1;
				return 0;
			});
		},
		exportSettings: function() {
			var storage = bos.Storage.getInstance();
			var orders = storage.getRecruitmentOrders();
			
			var json = qx.util.Json.stringify(orders);
			bos.Utils.displayLongText(json);
		},
		importSettings: function() {			
			bos.Utils.inputLongText(function (json) {
				var storage = bos.Storage.getInstance();
				storage.importRecruitmentOrders(json);
			});
		}
	}
});


qx.Class.define("bos.gui.UnitOrdersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("orders"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		
		if(locale == "de") {
			columnNames = ["id", "StadtId", "Ausgehende Stadt", "Angriffstyp", "State", "Abreise", "Ankunft", "Rückkehr", "Pos", "Ziel",   
					"periodischer Angriffstyp?", "zuletzt Aktualisiert", "TS", "Einheiten"];
		} else {
			columnNames = ["id", "City Id", "From", "Type", "State", "Departure", "Arrival", "Back at home", "Pos", "Target",   
					"Recurring type", "Last visited", "TS", "Units"];
		}
		
		var columnIds = ["id", "cityId", "from", "type", "state", "start", "end", "recurringEndStep", "position", "target",   
					"recurringType", "lastUpdated", "ts", "units"];		
					
		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(2, false);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();				

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnVisible(1, false);
		
		columnModel.setColumnWidth(2, 120);
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 70);
		
		columnModel.setColumnWidth(5, 120);
		columnModel.setColumnWidth(6, 120);
		columnModel.setColumnWidth(7, 120);
		
		columnModel.setColumnWidth(8, 64);
		columnModel.setDataCellRenderer(8, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(9, new bos.ui.table.cellrenderer.ClickableLook());
		
		columnModel.setColumnWidth(10, 125);
		
		columnModel.setColumnWidth(11, 80);
		columnModel.setDataCellRenderer(11, new bos.ui.table.cellrenderer.HumanTime(2));
		
		columnModel.setColumnWidth(12, 50);
		
		columnModel.setColumnWidth(13, 180);
		
		var ministerMilitaryPresent = webfrontend.data.Player.getInstance().getMinisterMilitaryPresent();	
		
		if (ministerMilitaryPresent) {
			columnModel.setColumnVisible(5, false);
			columnModel.setColumnVisible(7, false);
			columnModel.setColumnVisible(11, false);
		}

		this.add(this.table, { flex: 1 } );		
			
	}, members: {
		sbOrderTypes: null,
		sbOrderStates: null,
		sbSourceContinent: null,
		_sbSourceContinentAsList: "",
		sbDestinationContinent: null,
		_sbDestinationContinentAsList: "",
		cbShowFakeAttacks: null,
		receivedFirstCOMO: false,
		createRowData: function() {
			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var playerId = webfrontend.data.Player.getInstance().getId();
			
			var filterTypeId = -1;
			
			var sel = this.sbOrderTypes.getSelection();
			if (sel != null && sel.length > 0) {
				filterTypeId = sel[0].getModel();
			}
			
			var filterStateId = -1;
			sel = this.sbOrderStates.getSelection();
			if (sel != null && sel.length > 0) {
				filterStateId = sel[0].getModel();
			}

			var filterSourceContinent = -1;
			sel = this.sbSourceContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterSourceContinent = sel[0].getModel();
			}

			var filterDestinationContinent = -1;
			sel = this.sbDestinationContinent.getSelection();
			if (sel != null && sel.length > 0) {
				filterDestinationContinent = sel[0].getModel();
			}

			var showFakeAttacks = this.cbShowFakeAttacks.getValue();
			
			var serverTime = webfrontend.data.ServerTime.getInstance();
			
			var sourceContinents = [];
			var destContinents = [];
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (server.cities[key] == undefined) {
					continue;
				}
								
				var city = server.cities[key];

				if (city.unitOrders == null) {
					continue;
				}
						
				for (var i = 0; i < city.unitOrders.length; i++) {
					var item = city.unitOrders[i];
					
					var cont = webfrontend.data.Server.getInstance().getContinentFromCoords(c.xPos, c.yPos);
					sourceContinents["c" + cont] = true;
					
					var destCoords = bos.Utils.convertIdToCoordinatesObject(item.city);
					var destCont = webfrontend.data.Server.getInstance().getContinentFromCoords(destCoords.xPos, destCoords.yPos);
					destContinents["c" + destCont] = true;					
					
										
					if (filterTypeId != -1) {
						if (filterTypeId == -2) {
							if (!(item.type == 1 || item.type == 2 || item.type == 3 || item.type == 5)) {
								continue;
							}
						} else if (filterTypeId != item.type) {
							continue;
						}
					}
					
					if (filterStateId != -1 && filterStateId != item.state) {
						continue;
					}
					
					if (filterSourceContinent != -1 && filterSourceContinent != cont) {
						continue;
					}
					
					if (filterDestinationContinent != -1 && filterDestinationContinent != destCont) {
						continue;
					}
					
					var row = [];
					this._addBlankValuesToRow(row, this._tableModel);
				
					row["id"] = item.id;
					row["cityId"] = key;
					row["from"] = city.getName();
					row["type"] = bos.Utils.translateOrderType(item.type);
					row["state"] = this.translateState(item.state);
					row["start"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.start));
					row["end"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.end));
					row["position"] = bos.Utils.convertIdToCoodrinates(item.city);									
					row["target"] = item.cityName;
					if (item.player != playerId) {
						if (item.player > 0) {
							row["target"] += " - " + item.playerName;
						}
						if (item.alliance > 0) {
							row["target"] += " (" + item.allianceName + ")";
						}
					}
					row["player"] = item.player;
					row["units"] = "";
					row["ts"] = 0;
					
					if (item.units != null) {					
						for (var u = 0; u < item.units.length; u++) {
							var unit = item.units[u];
							if (u > 0) {
								row["units"] += ", ";
							}
							row["units"] += unit.count + " " + formatUnitType(unit.type, unit.count);
							var space = unit.count * getUnitRequiredSpace(unit.type);
							row["ts"] += space;							
						}
					}
					//row["isDelayed"] = item.isDelayed;
					row["recurringType"] = this.translateRecurringType(item.recurringType);
					if (item.recurringEndStep > 0) {
						row["recurringEndStep"] = webfrontend.Util.getDateTimeString(serverTime.getStepTime(item.recurringEndStep));
					}
					row["lastUpdated"] = city.getLastUpdated();
					
					if (!showFakeAttacks && row["ts"] < bos.Const.FAKE_ATTACK_TS && (item.type == 2 || item.type == 3 || item.type == 5)) {
						//plunder, siege, assault
						continue;
					}					
										
					rowData.push(row);
				}
			}
			
			this._populateContinentsSelectBox(this.sbSourceContinent, sourceContinents, true);
			this._populateContinentsSelectBox(this.sbDestinationContinent, destContinents, false);
			
			return rowData;
		}, 
		translateState: function(state) {
			switch (state) {
				case 0:
					return "scheduled";
				case 1:
					return this.tr("tnf:to");					
				case 2:
					return this.tr("tnf:returns");
				case 4:
					return this.tr("tnf:on support");
				case 5:
					return this.tr("tnf:on siege");
			}
			return "??? " + state;			
		}, 
		translateRecurringType: function(recurringType) {
			switch (recurringType) {
				case 0:
					return this.tr("tnf:once");
				case 1:
					return this.tr("tnf:dungeon completed");
				case 2:
					return this.tr("tnf:latest return time");
			}
			return "??? " + recurringType;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);			
			switch (event.getColumn()) {
			case 1:
			case 2:
				var cityId = parseInt(rowData["cityId"]);
				a.setMainView("c", cityId, -1, -1);
				break;				
			case 8:
			case 9:
				var pos = rowData["position"];
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbOrderTypes = this._createOrderTypesSelectBox();
			this.sbOrderTypes.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderTypes);
			
			this.sbOrderStates = this._createOrderStatesSelectBox();
			this.sbOrderStates.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbOrderStates);
			
			this.sbSourceContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbSourceContinent.setToolTipText(tr("sbSourceContinent_toolTip"));
			//this.sbSourceContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbSourceContinent);

			this.sbDestinationContinent = new qx.ui.form.SelectBox().set({
				width: 60,
				height: 28
			});
			this.sbDestinationContinent.setToolTipText(tr("sbDestinationContinent_toolTip"));
			//this.sbDestinationContinent.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbDestinationContinent);			
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setToolTipText(tr("btnUpdateView_toolTip"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);
			
			this.cbShowFakeAttacks = new qx.ui.form.CheckBox(tr("cbShowFakeAttacks"));
			this.cbShowFakeAttacks.setToolTipText(tr("cbShowFakeAttacks_toolTip"));
			this.cbShowFakeAttacks.setValue(true);
			toolBar.add(this.cbShowFakeAttacks);
			this.cbShowFakeAttacks.addListener("execute", function(event) {
				this.updateView();
			}, this);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);
			
			return toolBar;
		}, 
		_createOrderTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>emir türü</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [1, 2, 3, 4, 5, 8, 9, 10, -2];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(bos.Utils.translateOrderType(t), null, t));
			}					

			return sb;		
		}, 
		_createOrderStatesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});			

			sb.setToolTipText("Filtre tipi: <b>emir tipi</b>");

			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			
			var types = [0, 1, 2, 4, 5];
			
			for (var i = 0; i < types.length; i++) {
				var t = types[i];
				sb.add(new qx.ui.form.ListItem(this.translateState(t), null, t));
			}

			return sb;				
		},
		_populateContinentsSelectBox: function(sb, continents, isSource) {

			var list = [];
			for (var key in continents) {
				if (key.substring != undefined && qx.lang.Type.isString(key)) {
					var cont = parseInt(key.substring(1), 10);
					if (!isNaN(cont)) {
						list.push(cont);
					}
				}
			}
			list.sort();
			
			var newValues = list.join(",");
			
			if (isSource) {				
				if (newValues == this._sbSourceContinentAsList) {
					return;
				}
				this._sbSourceContinentAsList = newValues;
			} else {
				if (newValues == this._sbDestinationContinentAsList) {
					return;
				}
				this._sbDestinationContinentAsList = newValues;			
			}
			
			var previouslySelected = -1;
			var sel = sb.getSelection();
			if (sel != null && sel.length > 0) {
				previouslySelected = sel[0].getModel();
			}			
			
			sb.removeListener("changeSelection", this.updateView, this);
			
			sb.removeAll();
			sb.add(new qx.ui.form.ListItem(this.tr("tnf:all"), null, -1));
			for (var i = 0; i < list.length; i++) {
				var cont = list[i];
				sb.add(new qx.ui.form.ListItem(sprintf("C%02d", cont), null, cont));
			}
			
			sb.addListener("changeSelection", this.updateView, this);

			if (previouslySelected != -1) {
				sb.setModelSelection([previouslySelected]);				
			}
		},
		startRefreshingFromServer: function() {
			receivedFirstCOMO = false;
			webfrontend.net.UpdateManager.getInstance().addConsumer("COMO", this);			
		},
		getRequestDetails: function(dt) {
			if (!this.receivedFirstCOMO) {				
				return "a";
			} else {
				return "";
			}
		}, 
		dispatchResults: function(r) {
			if (r == null || r.length == 0) return;
			
			this.receivedFirstCOMO = true;			
			try {
				var server = bos.Server.getInstance();
				for (var i = 0; i < r.length; i++) {
					var item = r[i];		
					server.addCOMOItem(item);
				}
			} catch (e) {
				bos.Utils.handleError(e);
			}
			if (this.isSeeable()) {
				//console.log("UnitOrders view is displayed -> updating");
				this.updateView();
			} else {
				//console.log("UnitOrders view is hidden, nothing to update");
			}
		}
	}
});

qx.Class.define("bos.gui.RegionPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Region");
		this.setLayout(new qx.ui.layout.VBox(10));

		this.add(this._createToolBar());
		
		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if(locale == "de") {
			columnNames = [ "Type", "Name", "Pos", "Punkte", "Besitzer", "Spieler Id", "Allianz", "Allianz Id", "Entfernung" ];
		} else {
			columnNames = [ "City type", "Name", "Pos", "Points", "Owner", "Player Id", "Alliance", "Alliance Id", "Distance"];
		}

		var columnIds = ["id", "name", "position", "points", "owner", "playerId", "allianceName", "allianceId", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(4, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
		
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		//columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setColumnWidth(3, 64);
		columnModel.setColumnWidth(4, 180);
		columnModel.setColumnVisible(5, false);
		columnModel.setColumnWidth(6, 140);
		columnModel.setColumnVisible(7, false);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(4, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(6, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});
			
	}, 
	members: {
		createRowData: function() {
			var rowData = [];
			if (a.visMain.getMapMode() == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof webfrontend.vis.WorldCity) {
						if (entity.progress < 0) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = this.translateCityType(entity.id) + " (" + entity.id + ")";

						row["name"] = entity.getCityName();
						row["position"] = entity.getCoordinates();
						row["points"] = entity.getCityPoints();
						row["playerId"] = entity.getPlayerId();
						row["owner"] = entity.getPlayerName() + " (" + entity.getPlayerPoints() + ")";
						if (row["owner"] != " (0)") {
							row["owner"] = row["owner"];
						}
						row["allianceName"] = entity.getAllianceName();
						row["allianceId"] = entity.getAllianceId();

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
						rowData.push(row);
					}
				}		
			}
			return rowData;
		}, 
		processRegionItem: function(city, entity) {
			if (entity instanceof ClientLib.Vis.Region.RegionCity) {
				if (entity.get_PalaceLevel() == 0) {
					return null;
				}
			
				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				//row["id"] = this.translateCityType(entity.id) + " (" + entity.id + ")";

				var xPos = entity.get_Coordinates() & 0xFFFF;
				var yPos = entity.get_Coordinates() >> 16;
				
				row["name"] = entity.get_Name();
				row["position"] = bos.Utils.convertIdToCoodrinates(entity.get_Coordinates());
				row["points"] = entity.get_Points();
				row["playerId"] = entity.get_PlayerId();
				row["owner"] = entity.get_PlayerName() + " (" + entity.get_PlayerPoints() + ")";
				if (row["owner"] != " (0)") {
					row["owner"] = row["owner"];
				}
				row["allianceName"] = entity.get_AllianceName();
				row["allianceId"] = entity.get_AllianceId();

				var diffX = Math.abs(city.xPos - xPos);
				var diffY = Math.abs(city.yPos - yPos);
				row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);
				
				return row;
			} else {
				return null;
			}
		},
		calculateCityType: function(cityType) {
			if (cityType >= 0 && cityType <= 7) {
				return bos.Const.REGION_CITY;
			}
			if (cityType >= 8 && cityType <= 15) {
				return bos.Const.REGION_CASTLE;
			}
			if (cityType >= 16 && cityType <= 23) {
				return bos.Const.REGION_LAWLESS_CITY;
			}
			if (cityType >= 24 && cityType <= 34) {
				return bos.Const.REGION_LAWLESS_CASTLE;
			}
			if (cityType >= 40 && cityType <= 40) {
				return bos.Const.REGION_RUINS;
			}
			return bos.Const.REGION_UNKNOWN;
		}, 
		translateCityType: function(cityType) {
			var ct = this.calculateCityType(cityType);
			switch (ct) {						
			case bos.Const.REGION_CITY:
				return this.tr("tnf:city");
			case bos.Const.REGION_CASTLE:
				return "Castle";			
			case bos.Const.REGION_LAWLESS_CITY:
				return this.tr("tnf:lawless city");			
			case bos.Const.REGION_LAWLESS_CASTLE:
				return "Lawless Castle";
			case bos.Const.REGION_RUINS:
				return "Ruins";			
			default:
				return "???";
			}
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}
				}
				break;
			case 4:
				if (rowData["playerId"]) {
						var app = qx.core.Init.getApplication();
						app.showInfoPage(app.getPlayerInfoPage(), {
							id: rowData["playerId"]
						});
				}
			break;
			case 6:
				if (rowData["allianceId"]) {
					var app = qx.core.Init.getApplication();
					app.showInfoPage(app.getAllianceInfoPage(), {
							id: rowData["allianceId"]
					});
				}
				break;
			}

		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
					
			var btnCsvExport = new qx.ui.form.Button(locale == "de" ? "Export csv" : "Export csv");
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);	

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);			
			
			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.DungeonsPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel("Dungeons");
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());

		this._tableModel = new qx.ui.table.model.Simple();

		var columnNames;
		if( locale == "de") {
			columnNames = [ "Id", "Name", "Pos", "Level", "Fortschritt", "Entfernung" ];
		} else {
			columnNames = [ "Id", "Name", "Pos", "Level", "Progress", "Distance" ];
		}

		var columnIds = ["id", "name", "position", "level", "progress", "distance"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(5, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);
	
		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(1, 180);
		columnModel.setColumnWidth(2, 64);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		this.add(this.table, {flex: 1});		
			
	}, 
	members: {
		sbDungeonTypes: null,
		sbBossTypes: null,
		createRowData: function() {
			var rowData = [];

			if (a.visMain.getMapMode() == "r") {
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = webfrontend.data.City.getInstance();
				var c = cities[city.getId()];

				var res = webfrontend.res.Main.getInstance();
				var se = a.visMain.selectableEntities;
				
				for (var s in se) {
					var entity = se[s];
					if (entity != null && entity instanceof ClientLib.Vis.Region.RegionDungeon) {
						if (!this._shouldBeIncluded(entity)) {
							continue;
						}
						var row = [];
						this._addBlankValuesToRow(row, this._tableModel);
						row["id"] = entity.id;
						var dungeonType = Math.abs(entity.id);
						row["name"] = res.dungeons[dungeonType].dn + " (" + entity.get_Level() + ")";
						row["position"] = entity.get_Coordinates();
						row["level"] = entity.get_Level();
						row["progress"] = entity.get_Progress();

						var diffX = Math.abs(c.xPos - entity.getPosX());
						var diffY = Math.abs(c.yPos - entity.getPosY());
						row["distance"] = Math.sqrt(diffX * diffX + diffY * diffY);;
						rowData.push(row);
					}
				}
			}
			return rowData;

		}, 
		_shouldBeIncluded: function(dungeon) {
			if (dungeon.get_Progress() < 0) {
				return false;
			}
		
			var sel = this.sbDungeonTypes.getSelection();
			if (sel == null || sel.length == 0) {
				return false;
			}
			var dungeonType = Math.abs(dungeon.id);
			var reqType = sel[0].getModel();
			if (reqType != "A") {

				switch (reqType) {
				case "M":
					if (dungeonType != 4 && dungeonType != 8) {
						return false;
					}					
					break;								
				case "F":
					if (dungeonType != 5 && dungeonType != 6) {
						return false;
					}					
					break;				
				case "H":
					if (dungeonType != 3 && dungeonType != 7) {
						return false;
					}					
					break;				
				case "S":
					if (dungeonType != 2 && dungeonType != 12) {
						return false;
					}					
					break;	
				}
			}
			
			var bossType = this.sbBossTypes.getSelection()[0].getModel();
			if (bossType != "A") {
				if (bossType == "B") {
					if (dungeonType <= 5) {
						return false;
					}
				} else if (bossType == "D") {
					if (dungeonType > 5) {
						return false;
					}					
				}
			}			

			return true;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var pos = rowData["position"];
			switch (event.getColumn()) {
			case 1:
			case 2:
				if (pos != null) {
					var coords = bos.Utils.extractCoordsFromClickableLook(pos);
					var sepPos = coords.indexOf(":");
					if (sepPos > 0) {
						var x = parseInt(coords.substring(0, sepPos), 10);
						var y = parseInt(coords.substring(sepPos + 1), 10);
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());									
					}
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbDungeonTypes = this._createDungeonTypesSelectBox();
			this.sbDungeonTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbDungeonTypes);

			this.sbBossTypes = this._createBossTypesSelectBox();
			this.sbBossTypes.addListener("changeSelection", this.updateView, this);	
			toolBar.add(this.sbBossTypes);			

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}, 
		_createDungeonTypesSelectBox: function() {
			var dungeonTypes = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			dungeonTypes.setToolTipText("Filtre tipi: <b>dehliz tipi</b>");									
			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Hepsi"), null, "A"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Dağ"), null, "M"));			
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Orman"), null, "F"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Tepe"), null, "H"));
			dungeonTypes.add(new qx.ui.form.ListItem(tr("Deniz"), null, "S"));

			return dungeonTypes;			
		}, 
		_createBossTypesSelectBox: function() {
			var sb = new qx.ui.form.SelectBox().set({
				width: 120,
				height: 28
			});
			sb.setToolTipText("Filtre tipi: <b>boss tipi</b>");									
			
			sb.add(new qx.ui.form.ListItem(tr("Hepsi"), null, "A"));
			sb.add(new qx.ui.form.ListItem(tr("Boss"), null, "B"));			
			sb.add(new qx.ui.form.ListItem(tr("Dehliz"), null, "D"));	

			return sb;
		}
	}
});

qx.Class.define("bos.gui.CastlesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("castles"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames;
		if( locale == "de") {
			columnNames = [ "Id", "Name", "Pos", "Nahrung", "Nahrung: Lagerkapazität", "Keine Nahrung mehr am", "Einheiten", "Rekutierungsliste", "Orders", "TS der Einheiten die z.Z. verfügbar sind", "Holz: Lagerkapazität", "Eisen: Lagerkapazität", "Verteidiger (Doppelklicken zum Auswählen)"];
		} else {
			columnNames = [ "Id", "İsim", "Pozisyon", "Tahıl", "Tahıl: Depo kapasitesi", "Tahıl bitiş zamanı", "Birlikler", "Birlik sırası", "Emirler", "Yağmalamayan", "Odun: Depo kapasitesi", "Demir:Depo kapasitesi", "Savunmalar (dbl Tıkla seç)"];
		}
		var columnIds = ["id", "name", "position", "foodLevel", "foodFree", "foodEmptyAt", "unitsLevel", "unitQueue", "activeOrders", "unitsAtHome", "woodFree", "ironFree", "summary_defenders"];

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(5, true);
		this._tableModel.setColumnEditable(12, true);

		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		this.table = new bos.ui.table.Table(this._tableModel, custom);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		var res = webfrontend.res.Main.getInstance();

		columnModel.setColumnVisible(0, false);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());
		
		var foodRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		foodRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
		foodRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
		foodRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
		foodRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(3, foodRenderer);

		columnModel.setDataCellRenderer(5, new bos.ui.table.cellrenderer.HumanTime(true));
		columnModel.setDataCellRenderer(7, new bos.ui.table.cellrenderer.HumanTime());
		
		var unitsRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		unitsRenderer.addNumericCondition("<", 25, null, bos.Const.RESOURCE_RED, null, null);
		unitsRenderer.addNumericCondition(">=", 25, null, bos.Const.TABLE_DEFAULT_COLOR, null, null);
		unitsRenderer.addNumericCondition(">=", 50, null, bos.Const.RESOURCE_YELLOW, null, null);
		unitsRenderer.addNumericCondition(">=", 75, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(6, unitsRenderer);

		var tcm = this.table.getTableColumnModel();
		var resizeBehavior = tcm.getBehavior();
		resizeBehavior.setWidth(1, 100);
		resizeBehavior.setWidth(2, 64);
		resizeBehavior.setWidth(3, 50);
		resizeBehavior.setWidth(4, 120);
		resizeBehavior.setWidth(5, 100);
		resizeBehavior.setWidth(6, 50);
		resizeBehavior.setWidth(7, 100);
		resizeBehavior.setWidth(8, 50);
		resizeBehavior.setWidth(9, 80);
		resizeBehavior.setWidth(10, 90);
		resizeBehavior.setWidth(11, 90);
		resizeBehavior.setWidth(12, "1*");
		resizeBehavior.setMinWidth(12, 100);	
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		fillRequests: new Array(),
		createRowData: function() {
			var rowData = [];

			var castles = bos.CityTypes.getInstance().getCastles();

			var cities = webfrontend.data.Player.getInstance().cities;
			var server = bos.Server.getInstance();
			
			for (var key in castles) {
				var cityId = parseInt(castles[key]);
				var c = cities[cityId];

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
			
				var city = server.cities[cityId];
				if (city != undefined) {
					
					var wood = parseInt(city.getResourceCount(bos.Const.WOOD));
					var iron = parseInt(city.getResourceCount(bos.Const.IRON));
					var food = parseInt(city.getResourceCount(bos.Const.FOOD));

					var maxFood = city.getResourceMaxStorage(bos.Const.FOOD);

					row["woodFree"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD)) - wood;
					row["ironFree"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON)) - iron;
					row["foodFree"] = maxFood - food;
					
					if (maxFood > 0) {
						row["foodLevel"] = parseInt(100 * food / maxFood);
						row["foodLevel"] = row["foodLevel"];
					}

					if (city.getUnitLimit() > 0) {
						var totalUnits = city.getUnitCount() + city.getUnitsInQueue();
						row["unitsLevel"] = parseInt(100 * totalUnits / city.getUnitLimit());
						row["unitsLevel"] = row["unitsLevel"];
					}

					var foodBallance = city.getFoodBalance();
					if (foodBallance >= 0) {
						row["foodEmptyAt"] = "food positive";
					} else {
						var totalConsumption = city.getFoodConsumption() + city.getFoodConsumptionSupporter() + city.getFoodConsumptionQueue();
						var emptyAt = city.getResourceStorageEmptyTime(bos.Const.FOOD, totalConsumption);
						var timeDiff = emptyAt - new Date();
						row["foodEmptyAt"] = parseInt(timeDiff / 1000);
					}

					row["unitQueue"] = city.unitQueueOcuppied();
					row["activeOrders"] = city.getUnitOrders() != null ? city.getUnitOrders().length : 0;
					
					var sum = [];
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}
				
				if (getSummaryWidget()._populateResources(row, cityId)) {
					if (row["foodMax"] > 0) {
						row["foodLevel"] = parseInt(100 * row["food"] / row["foodMax"]);
						row["foodLevel"] = row["foodLevel"];														
					}												
				}												

				rowData.push(row);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			return true;
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var x = parseInt(city["xPos"], 10);
					var y = parseInt(city["yPos"], 10);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			var fillMenu = new qx.ui.menu.Menu();
			
			var fillWithWood = new qx.ui.menu.Button(tr("wood"), null);
			fillWithWood.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.WOOD);		
			}, this);
			fillMenu.add(fillWithWood);
			
			var fillWithStone = new qx.ui.menu.Button(tr("stone"), null);
			fillWithStone.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.STONE);		
			}, this);
			fillMenu.add(fillWithStone);

			var fillWithIron = new qx.ui.menu.Button(tr("iron"), null);
			fillWithIron.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.IRON);		
			}, this);
			fillMenu.add(fillWithIron);	

			var fillWithFood = new qx.ui.menu.Button(tr("food"), null);
			fillWithFood.addListener("execute", function(event) {
				var cities = bos.CityTypes.getInstance().getCastles();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.FOOD);		
			}, this);
			fillMenu.add(fillWithFood);

			var btnFillWith = new qx.ui.form.MenuButton(tr("fill with"), null, fillMenu);
			toolBar.add(btnFillWith);			
			
			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.CitiesPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("cities"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
				
		var columnIds = ["id", "name", "position", "reference", "wood", "wood/h", "woodMax", "woodFree", "woodIncoming", "woodFullAt", "stone", "stone/h", "stoneMax", "stoneFree", "stoneIncoming", "stoneFullAt", "iron", "iron/h", "ironMax", "ironFree", "ironIncoming", "ironFullAt", "food", "food/h", "foodMax", "foodFree", "foodIncoming", "foodFullAt", "gold/h", "buildQueue", "unitQueue", "carts", "ships", "lastUpdated"];

		this._tableModel.setColumns(bos.Utils.translateArray(columnIds), columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);		
		
		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();
		
		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);
		columnModel.setColumnWidth(3, 160);

		//hide all "*/h", "*Max", "*Free", "*Incoming", "*FullAt" columns
		var columnsPerRes = 6;
		var columnsBeforeWood = 4;
		for (var res = 1; res <= 4; res++) {
			var col = columnsBeforeWood + (res - 1) * columnsPerRes;
			col++; //skip resource count column
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
			columnModel.setColumnVisible(col++, false);
		}					
		
		//gold/h
		var goldColumn = columnsBeforeWood + 4 * columnsPerRes;
		columnModel.setColumnVisible(goldColumn, false);

		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setDataCellRenderer(goldColumn + 1, new bos.ui.table.cellrenderer.HumanTime());
		columnModel.setDataCellRenderer(goldColumn + 2, new bos.ui.table.cellrenderer.HumanTime());
		columnModel.setDataCellRenderer(goldColumn + 5, new bos.ui.table.cellrenderer.HumanTime(2));
		
		var resTypes = ["gold", "wood", "stone", "iron", "food"];
		for (var res = 1; res <= 4; res++) {
			var col = columnsBeforeWood + (res - 1) * columnsPerRes;
			var resType = resTypes[res];
			var resRenderer = new bos.ui.table.cellrenderer.Resource("right", "", "", "", resType + "Max", resType + "Free");
			columnModel.setDataCellRenderer(col, resRenderer);
		}

		var foodPerHourRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
		foodPerHourRenderer.addNumericCondition("<", 0, null, bos.Const.RESOURCE_RED, null, null);
		foodPerHourRenderer.addNumericCondition(">=", 0, null, bos.Const.RESOURCE_GREEN, null, null);
		columnModel.setDataCellRenderer(columnsBeforeWood + (4 - 1) * columnsPerRes + 1, foodPerHourRenderer);					
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		sbCityType: null,
		sbContinents: null,
		createRowData: function() {

			var rowData = [];
			var cities = webfrontend.data.Player.getInstance().cities;
			var unknownValue = "";

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			
			var resTypes = ["wood", "stone", "iron", "food"];
			for (var i = 0; i < resTypes.length; i++) {
				var res = resTypes[i];
				sum[res] = 0;
				sum[res + "/h"] = 0;
				sum[res + "Max"] = 0;
				sum[res + "Free"] = 0;
				sum[res + "Incoming"] = 0;
			}

			sum["ts"] = 0;
			sum["gold/h"] = 0;
			sum["summary_defenders_ts"] = 0;
			
			var totalCarts = 0;
			var availableCarts = 0;
			var totalShips = 0;
			var availableShips = 0;
			
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();

			var summary = getSummaryWidget();
			var server = bos.Server.getInstance();
			for (var key in cities) {

				var c = cities[key];

				if (!bos.Utils.shouldCityBeIncluded(c, selectedCityType, selectedContinent)) {
					continue;
				}			

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = key;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["lastUpdated"] = "";

				row["reference"] = c.reference;

				if (server.cities[key] == undefined) {

					var resCity = server.cityResources["c" + key];
					if (resCity != null) {
						this._updateRowFromResCity(resCity, row);
					}
				} else {
					var city = server.cities[key];

					row["wood"] = parseInt(city.getResourceCount(bos.Const.WOOD));
					row["wood/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.WOOD));
					row["woodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.WOOD));
					row["woodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.WOOD));
					row["woodFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.WOOD));
					row["stone"] = parseInt(city.getResourceCount(bos.Const.STONE));
					row["stone/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.STONE));
					row["stoneMax"] = parseInt(city.getResourceMaxStorage(bos.Const.STONE));
					row["stoneIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.STONE));
					row["stoneFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.STONE));
					row["iron"] = parseInt(city.getResourceCount(bos.Const.IRON));
					row["iron/h"] = parseInt(city.getResourceGrowPerHour(bos.Const.IRON));
					row["ironMax"] = parseInt(city.getResourceMaxStorage(bos.Const.IRON));
					row["ironIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.IRON));
					row["ironFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.IRON));
					row["food"] = parseInt(city.getResourceCount(bos.Const.FOOD));
					row["food/h"] = parseInt(city.getFoodBalance());
					row["foodMax"] = parseInt(city.getResourceMaxStorage(bos.Const.FOOD));
					row["foodIncoming"] = parseInt(city.getTradeIncomingResources(bos.Const.FOOD));
					row["foodFullAt"] = parseInt(city.getResourceStorageFullTime(bos.Const.FOOD));

					row["woodFree"] = row["woodMax"] - row["wood"];
					row["stoneFree"] = row["stoneMax"] - row["stone"];
					row["ironFree"] = row["ironMax"] - row["iron"];
					row["foodFree"] = row["foodMax"] - row["food"];

					row["buildQueue"] = city.buildQueueOcuppied();
					row["unitQueue"] = city.unitQueueOcuppied();

					row["lastUpdated"] = city.getLastUpdated();

					var dg = city.getTraders();
					if (dg != null) {
						row["carts"] = dg[bos.Const.TRADE_TRANSPORT_CART].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_CART].total;
						row["ships"] = dg[bos.Const.TRADE_TRANSPORT_SHIP].count.toString() + "/" + dg[bos.Const.TRADE_TRANSPORT_SHIP].total;

						totalCarts += dg[bos.Const.TRADE_TRANSPORT_CART].total;
						availableCarts += dg[bos.Const.TRADE_TRANSPORT_CART].count;
						totalShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].total;
						availableShips += dg[bos.Const.TRADE_TRANSPORT_SHIP].count;
					} else {
						row["carts"] = "0/0";
						row["ships"] = "0/0";
					}

				}
				
				summary._populateResources(row, key);
				
				for (var i = 0; i < resTypes.length; i++) {
					var t = resTypes[i];
					
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "/h";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "Max";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
					t = resTypes[i] + "Free";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];

					t = resTypes[i] + "Incoming";	
					if (qx.lang.Type.isNumber(row[t]))
						sum[t] += row[t];
						
				}
				
				if (qx.lang.Type.isNumber(row["gold/h"])) {
					sum["gold/h"] += row["gold/h"];
				}
				
				rowData.push(row);
			}

			sum["carts"] = availableCarts + "/" + totalCarts;
			sum["ships"] = availableShips + "/" + totalShips;

			rowData.push(sum);

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}			
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {

					var x = parseInt(city["xPos"], 10);
					var y = parseInt(city["yPos"], 10);

					a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				}
				break;
			}
		},
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));

			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);					
			this.sbCityType.addListener("changeSelection", this.updateView, this);						
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			this.btnRefreshResources = new qx.ui.form.Button(tr("btnRefreshResources"));
			this.btnRefreshResources.setToolTipText(tr("btnRefreshResources_toolTip"));
			this.btnRefreshResources.setWidth(120);
			if (locale == "de") {
				this.btnRefreshResources.setWidth(150);
			}
			
			var btnRefreshView = new qx.ui.form.Button(tr("btnRefreshView"));
			btnRefreshView.setToolTipText(tr("btnRefreshView_toolTip"));
			btnRefreshView.setWidth(120);
			btnRefreshView.addListener("execute", this.updateView, this);					
			
			var ministerTradePresent = webfrontend.data.Player.getInstance().getMinisterTradePresent();
			if (!ministerTradePresent) {
				toolBar.add(this.btnRefreshResources);
				toolBar.add(btnRefreshView);
			}
			this.btnRefreshResources.addListener("execute", function(evt) {
				this._requestedResourceRefreshView = true;
				this.fetchResources();
			}, this);
						
			var btnFetchCities = new qx.ui.form.Button(tr("btnFetchCities"));
			btnFetchCities.setToolTipText(tr("btnFetchCities_toolTip"));
			btnFetchCities.setWidth(100);
			btnFetchCities.addListener("execute", this.fetchCities, this);
			toolBar.add(btnFetchCities);
			
			var fillMenu = new qx.ui.menu.Menu();
			
			var fillWithWood = new qx.ui.menu.Button(tr("wood"), null);
			fillWithWood.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.WOOD);		
			}, this);
			fillMenu.add(fillWithWood);
			
			var fillWithStone = new qx.ui.menu.Button(tr("stone"), null);
			fillWithStone.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.STONE);		
			}, this);
			fillMenu.add(fillWithStone);

			var fillWithIron = new qx.ui.menu.Button(tr("iron"), null);
			fillWithIron.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.IRON);		
			}, this);
			fillMenu.add(fillWithIron);	

			var fillWithFood = new qx.ui.menu.Button(tr("food"), null);
			fillWithFood.addListener("execute", function(event) {
				var cities = this._createCitiesIds();
				bos.BatchResourcesFiller.getInstance().fillCitiesWithResources(cities, bos.Const.FOOD);		
			}, this);
			fillMenu.add(fillWithFood);

			var btnFillWith = new qx.ui.form.MenuButton(tr("fill with"), null, fillMenu);
			toolBar.add(btnFillWith);
			
			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));
			btnCsvExport.setToolTipText(tr("btnCsvExport_toolTip"));
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();								
			}, this);

			var btnHelp = new qx.ui.form.Button(tr("help"));
			btnHelp.setWidth(120);
			toolBar.add(btnHelp);
			btnHelp.addListener("execute", function(evt) {
				var dialog = new webfrontend.gui.ConfirmationWidget();
				if (locale == "de"){
					dialog.showGenericNotice("Summary Hilfe", "Die Städte werden nach speziellen Zeichen in den Referenzen sortiert.Diese Zeichen werden durch *Zeichen* makiert und können an einer beliebigen Stelle in der Referenz stehen. Als Beispiel: 'Kont 23_3 *CM*'würde eine Burg darstellen, welche auch Mondsteine herstellen kann.", "C - Burg (Castle), M - Mondstein, W - Lager(Warehouse), B - In Bau/Aufbau, D - Defensive, G - Gold", "webfrontend/ui/bgr_popup_survey.gif");
				}
				else {
					dialog.showGenericNotice("Genel bakış yardım", "Şehirlerin referansına özel kodlar yazarak şehirlerimizi kategorize edebiliriz misal *CM* bu hem bir kale hemde saflaştırma yapan bir şehir anlamı taşır. <br /><center><b>Kerraneciler ittifakından Saygılar (Dünya 1)</b></center>", "C - Kale, M - Saflaştırma Şehri, W - Depo , B - İnşa ediliyor, D - Savunma, G - Altın", "webfrontend/ui/bgr_popup_survey.gif");
				}

				qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
				dialog.show();
			}, this);

			return toolBar;
		},
		_createCitiesIds: function() {
			var rows = this.createRowData();
			
			var citiesIds = [];
			
			for (var i = 0; i < rows.length; i++) {
				var row = rows[i];
				var cityId = row["id"];
				if (cityId != "Total") {
					citiesIds.push(cityId);
				}
			}
			return citiesIds;
		},
		fetchCities: function() {				
			var citiesIds = this._createCitiesIds();
			var server = bos.Server.getInstance();
			server.pollCities(citiesIds);
		}		
	}
});

qx.Class.define("bos.gui.OptionsPage", {
	extend: qx.ui.tabview.Page,
	construct: function() {
		qx.ui.tabview.Page.call(this);
		this.setLabel(tr("options"));
		this.setLayout(new qx.ui.layout.Dock());
						
		var scrollable = new qx.ui.container.Scroll();						
		this.add(scrollable);
		
		var scroll = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
		scrollable.add(scroll);
		
		var container;

		container = new qx.ui.groupbox.GroupBox(tr("table settings"));
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		
		var storage = bos.Storage.getInstance();

		this.cbLoadTableSettingsAtStart = new qx.ui.form.CheckBox(tr("load table settings at start"));
		this.cbLoadTableSettingsAtStart.setValue(bos.Storage.getInstance().getLoadTableSettingsAtStart());
		this.cbLoadTableSettingsAtStart.addListener("execute", function(event) {
			storage.setLoadTableSettingsAtStart(this.cbLoadTableSettingsAtStart.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbLoadTableSettingsAtStart);

		this.sbTableName = new qx.ui.form.SelectBox().set({
			width: 120,
			height: 28
		});
		this.sbTableName.setToolTipText(tr("table name"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("cities"), null, "cities"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("Military"), null, "military"));
		this.sbTableName.add(new qx.ui.form.ListItem(tr("purify resources"), null, "moonstones"));
		container.add(this.sbTableName);

		var btnLoadTableSettings = new qx.ui.form.Button(tr("btnLoadTableSettings"));
		btnLoadTableSettings.setToolTipText(tr("btnLoadTableSettings_toolTip"));
		btnLoadTableSettings.setWidth(140);
		container.add(btnLoadTableSettings);
		btnLoadTableSettings.addListener("execute", function(evt) {
			var tableName = this.sbTableName.getSelection()[0].getModel();
			var storage = bos.Storage.getInstance();
			var tbl = null;
			var settings = null;
			var summary = getSummaryWidget();
			switch (tableName) {
				case "cities":
					tbl = summary.citiesTab.table;
					settings = storage.getCitiesTableSettings();
					break;
				case "military":
					tbl = summary.militaryTab.table;
					settings = storage.getMilitaryTableSettings();
					break;
				case "moonstones":
					tbl = summary.moonstonesTable;
					settings = storage.getMoonstonesTableSettings();
					break;
			}
			if (tbl != null && settings != null) {
				tbl.applyTableSettings(settings, tableName);
				storage.saveOptions();
			}

		}, this);

		var btnSaveTableSettings = new qx.ui.form.Button(tr("btnSaveTableSettings"));
		btnSaveTableSettings.setToolTipText(tr("btnSaveTableSettings_toolTip"));
		btnSaveTableSettings.setWidth(140);
		container.add(btnSaveTableSettings);
		btnSaveTableSettings.addListener("execute", function(evt) {
			var tableName = this.sbTableName.getSelection()[0].getModel();
			var tbl = null;
			var summary = getSummaryWidget();
			switch (tableName) {
				case "cities":
					tbl = summary.citiesTab.table;
					break;
				case "military":
					tbl = summary.militaryTab.table;
					break;
				case "moonstones":
					tbl = summary.moonstonesTable;
					break;
			}
			if (tbl != null) {
				tbl.saveTableSettings(tableName);
				storage.saveOptions();
			}
		}, this);

		container = new qx.ui.groupbox.GroupBox(tr("saving cities data"));
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);

		this.cbPersistCities = new qx.ui.form.CheckBox(tr("cbPersistCities"));
		this.cbPersistCities.setToolTipText(tr("cbPersistCities_toolTip"));
		this.cbPersistCities.setValue(storage.getPersistingCitiesEnabled());
		this.cbPersistCities.addListener("execute", function(event) {
			bos.Storage.getInstance().setPersistingCitiesEnabled(this.cbPersistCities.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbPersistCities);

		this.cbLoadPersistedCitiesAtStart = new qx.ui.form.CheckBox(tr("cbLoadPersistedCitiesAtStart"));
		this.cbLoadPersistedCitiesAtStart.setValue(storage.getLoadPersistedCitiesAtStart());
		this.cbLoadPersistedCitiesAtStart.addListener("execute", function(event) {
			storage.setLoadPersistedCitiesAtStart(this.cbLoadPersistedCitiesAtStart.getValue());
			storage.saveOptions();
		}, this);
		container.add(this.cbLoadPersistedCitiesAtStart);

		var btnLoadCities = new qx.ui.form.Button(tr("btnLoadCities"));
		btnLoadCities.setToolTipText("Sehirlerin bir önceki oyun oturumu sırasında kaydedilen verileri yükler");
		btnLoadCities.setWidth(220);
		btnLoadCities.addListener("execute", this.loadPersistedCities, this);
		container.add(btnLoadCities);

		var btnDeleteAllSavedData = new qx.ui.form.Button(tr("btnDeleteAllSavedData"));
		btnDeleteAllSavedData.addListener("execute", function(event) {
			storage.getInstance().deleteAllSavedData();			
			bos.Utils.handleInfo(tr("btnDeleteAllSavedData_confirmation"));
		}, this);
		container.add(btnDeleteAllSavedData);
		
		var btnSaveAllCities = new qx.ui.form.Button(tr("btnSaveAllCities"));
		btnSaveAllCities.addListener("execute", function(event) {
			var server = bos.Server.getInstance();
			server.persistAllPendingCities();						
		}, this);
		container.add(btnSaveAllCities);

		var btnPersistHelp = new qx.ui.form.Button(tr("help"));
		btnPersistHelp.addListener("execute", function(event) {
			var dialog = new webfrontend.gui.ConfirmationWidget();
			dialog.showGenericNotice(tr("help"), tr("persistHelp"), "", "webfrontend/ui/bgr_popup_survey.gif");								
			qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
			dialog.show();
		}, this);
		btnPersistHelp.setWidth(60);
		container.add(btnPersistHelp);
		
		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		this.sbCustomCityTypes = new qx.ui.form.SelectBox().set({
			width: 120,
			height: 28
		});
		this.sbCustomCityTypes.setToolTipText(locale == "de" ? "Eigene Stadt-Typen" : "Custom City Types");
		container.add(this.sbCustomCityTypes);
		this._populateCustomCityTypes();
		
		var btnAddCustomCityType = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" :"Add");
		btnAddCustomCityType.addListener("execute", this._addCustomCityType, this);
		container.add(btnAddCustomCityType);
		
		var btnRemoveCustomCityType = new qx.ui.form.Button(locale == "de" ? "Löschen" :"Remove");
		btnRemoveCustomCityType.addListener("execute", this._removeCustomCityType, this);
		container.add(btnRemoveCustomCityType);
		
		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Chat" : "Chat");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		
		this.cbTweakChatAtStart = new qx.ui.form.CheckBox(locale == "de" ? "Tweak chat at start" : "Tweak Sohbeti Başlat");
		this.cbTweakChatAtStart.setToolTipText("Seçeneği işaretlendiğinde tweak sohbeti kontrol eder  ");
		this.cbTweakChatAtStart.setValue(bos.Storage.getInstance().getTweakChatAtStart());
		this.cbTweakChatAtStart.addListener("execute", function(event) {
			storage.setTweakChatAtStart(this.cbTweakChatAtStart.getValue());
			storage.saveOptions();
		}, this);					
		container.add(this.cbTweakChatAtStart);					

		var btnTweakChat = new qx.ui.form.Button("Tweak sohbet");
		btnTweakChat.addListener("execute", function(event) {						
			bos.Tweaks.getInstance().tweakChat();
			btnTweakChat.hide();
		}, this);
		container.add(btnTweakChat);					

		container = new qx.ui.groupbox.GroupBox(locale == "de" ? "Sonstiges" : "Diğer");
		container.setLayout(new qx.ui.layout.Flow(10, 10));
		scroll.add(container);
		/*
		this.cbTweakReportAtStart = new qx.ui.form.CheckBox(tr("cbTweakReportAtStart"));
		this.cbTweakReportAtStart.setToolTipText(tr("cbTweakReportAtStart_toolTip"));
		this.cbTweakReportAtStart.setValue(bos.Storage.getInstance().getTweakReportAtStart());
		this.cbTweakReportAtStart.addListener("execute", function(event) {
			storage.setTweakReportAtStart(this.cbTweakReportAtStart.getValue());
			storage.saveOptions();
		}, this);					
		container.add(this.cbTweakReportAtStart);
		
		var btnTweakReports = new qx.ui.form.Button("Tweak reports");
		btnTweakReports.setToolTipText("Tweaks reports, it may not work when EA will publish next patch. That's the reason why it's not automatic like in previous versions");
		btnTweakReports.addListener("execute", function(event) {
			bos.Tweaks.getInstance().tweakReports();
		}, this);
		container.add(btnTweakReports);										
		*/
		var btnSaveSummaryPosition = new qx.ui.form.Button(tr("özet konumunu kaydet"));
		btnSaveSummaryPosition.addListener("execute", function(event) {
			var storage = bos.Storage.getInstance();
			var summary = getSummaryWidget();
			var props = summary.getLayoutProperties();
			var pos = {
				left: props.left,
				top: props.top,
				width: summary.getWidth(),
				height: summary.getHeight()
			};
			storage.setSummaryPosition(pos);
			storage.saveOptions();
		}, this);
		container.add(btnSaveSummaryPosition);	
	}, 
	members: {
		sbCustomCityTypes: null,			
		cbTweakChatAtStart: null,				
		cbTweakReportAtStart: null,
		sbCityType: null,
		sbContinents: null,
		sbTableName: null,
		cbPersistCities: null,
		cbLoadPersistedCitiesAtStart: null,
		btnRefreshResources: null,
		cbLoadTableSettingsAtStart: null,
		_addCustomCityType: function() {
			var letter = prompt(locale=="de"? "Bitte geb einen Buchstaben ein" : "Bir harf girin");
			if (letter == null || letter.length != 1) {
				return;
			}
			if (bos.CityTypes.getInstance().isReservedLetter(letter)) {
				bos.Utils.handleWarning(locale=="de"? "Dieser Buchstabe ist schon in Benutzung" : "Rezerve edilmiştir");
				return;
			}
			
			var description = prompt(locale=="de"? "Bitte gebe eine Beschreibung ein" : "Açıklamasını girin");
			if (description == null || description.length == 0) {
				return;
			}
			
			bos.Storage.getInstance().addCustomCityType(letter, description);
			
			this._populateCustomCityTypes();
		}, 
		_removeCustomCityType: function() {
			
			var sel = this.sbCustomCityTypes.getSelection();
			if (sel == null || sel.length == 0) {
				return;
			}
			var letter = sel[0].getModel();
			
			bos.Storage.getInstance().removeCustomCityType(letter);
			
			this._populateCustomCityTypes();
		}, 
		_populateCustomCityTypes: function() {
			var storage = bos.Storage.getInstance();
			var list = storage.getCustomCityTypes();
			this.sbCustomCityTypes.removeAll();
			for (var i = 0; i < list.length; i++) {
				var item = list[i];
				this.sbCustomCityTypes.add(new qx.ui.form.ListItem(item.letter + " - " + item.description, null, item.letter));
			}
		}		
	}
});

qx.Class.define("bos.gui.MilitaryPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("military"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames = [ tr("id"), tr("name"), tr("position"), tr("reference")];
		var columnIds = ["id", "name", "position", "reference"];
		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;
			var unitName = formatUnitType(i, 2);
			columnNames.push(unitName);
			columnIds.push("unit_" + i);
		}
		columnNames.push("TS");
		columnIds.push("ts");

		columnNames.push("Özet (dbl tıkla ve seç)");
		columnIds.push("summary_military");

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);
		this._tableModel.setColumnEditable(23, true);

		this.table = new bos.ui.table.Table(this._tableModel);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);

		var res = webfrontend.res.Main.getInstance();

		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;

			var col = i + 3;
			if (i == 19) {
				col--;
			}

			columnModel.setColumnWidth(col, 60);
		}

		columnModel.setColumnWidth(20, 50);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setColumnWidth(23, 400);					
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		sbCityType: null,
		sbContinents: null,
		createRowData: function() {
			var rowData = [];

			var cities = webfrontend.data.Player.getInstance().cities;

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			sum["ts"] = 0;
			sum["summary_defenders_ts"] = 0;			
			
			var server = bos.Server.getInstance();
			for (var cityId in cities) {
				var c = cities[cityId];

				if (!this._shouldBeIncluded(c)) {
					continue;
				}

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;
			
				var city = server.cities[cityId];
				if (city != undefined) {										
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}	

				rowData.push(row);
			}
			
			if (rowData.length > 0) {
				rowData.push(sum);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
					a.setMainView('r', 0, coords.xPos * a.visMain.getTileWidth(), coords.yPos * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			this.sbCityType.addListener("changeSelection", this.updateView, this);	
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);			
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});

qx.Class.define("bos.gui.DefendersPage", {
	extend: bos.gui.SummaryPage,
	construct: function() {
		bos.gui.SummaryPage.call(this);
		this.setLabel(tr("defenders"));
		this.setLayout(new qx.ui.layout.VBox(10));
		
		this.add(this._createToolBar());		
		
		this._tableModel = new qx.ui.table.model.Simple();
		var columnNames = [ tr("id"), tr("name"), tr("position"), tr("reference")];
		var columnIds = ["id", "name", "position", "reference"];
		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;
			var unitName = formatUnitType(i, 2);
			columnNames.push(unitName);
			columnIds.push("unit_def_" + i);
		}
		columnNames.push("TS");
		columnIds.push("summary_defenders_ts");

		columnNames.push("Summary (dbl click to select)");
		columnIds.push("summary_defenders");

		this._tableModel.setColumns(columnNames, columnIds);

		this._setupSorting(this._tableModel);
		this._tableModel.sortByColumn(1, true);
		this._tableModel.setColumnEditable(23, true);

		var custom = {
			tableColumnModel : function(obj) {
				return new qx.ui.table.columnmodel.Resize(obj);
			}
		};

		this.table = new bos.ui.table.Table(this._tableModel, custom);
		this.table.addListener("cellClick", this._handleCellClick, this);

		var columnModel = this.table.getTableColumnModel();

		columnModel.setColumnVisible(0, false);
		columnModel.setColumnWidth(2, 64);

		var res = webfrontend.res.Main.getInstance();

		for (var i = 1; i <= 19; i++) {
			if (i == 18) continue;

			var col = i + 3;
			if (i == 19) {
				col--;
			}

			columnModel.setColumnWidth(col, 60);
			columnModel.setColumnVisible(col, false);
		}

		columnModel.setColumnWidth(20, 60);
		columnModel.setDataCellRenderer(1, new bos.ui.table.cellrenderer.ClickableLook());
		columnModel.setDataCellRenderer(2, new bos.ui.table.cellrenderer.ClickableLook());

		columnModel.setColumnWidth(23, 400);

		var resizeBehavior = columnModel.getBehavior();
		resizeBehavior.setWidth(1, 100);
		resizeBehavior.setWidth(2, 60);
		resizeBehavior.setWidth(22, 60);
		resizeBehavior.setWidth(23, "1*");
		resizeBehavior.setMinWidth(23, 100);		
		
		this.add(this.table, {flex: 1});					
	}, 
	members: {
		table: null,
		_tableModel: null,
		createRowData: function() {
			var rowData = [];

			var cities = webfrontend.data.Player.getInstance().cities;

			var sum = [];
			this._addBlankValuesToRow(sum, this._tableModel);
			sum["id"] = "Total";
			sum["name"] = "Total";
			sum["ts"] = 0;
			sum["summary_defenders_ts"] = 0;			
			
			var server = bos.Server.getInstance();
			for (var cityId in cities) {
				var c = cities[cityId];

				if (!this._shouldBeIncluded(c)) {
					continue;
				}
				var c = cities[cityId];

				if (c == null) {
					continue;
				}

				var unknownValue = "";

				var row = [];
				this._addBlankValuesToRow(row, this._tableModel);
				row["id"] = cityId;
				row["name"] = c.name;
				row["position"] = c.xPos + ":" + c.yPos;
				row["reference"] = c.reference;
			
				var city = server.cities[cityId];
				if (city != undefined) {										
					getSummaryWidget()._addDefendersToRow(city, row, sum);
				}	

				rowData.push(row);
			}
			
			if (rowData.length > 0) {
				rowData.push(sum);
			}

			return rowData;
		}, 
		_shouldBeIncluded: function(city) {
			var selectedCityType = null;
			var sel = this.sbCityType.getSelection();
			if (sel != null && sel.length > 0) {
				selectedCityType = sel[0].getModel();
			}
			
			var selectedContinent = this.sbContinents.getSelection()[0].getModel();
					
			return bos.Utils.shouldCityBeIncluded(city, selectedCityType, selectedContinent);
		}, 
		_handleCellClick: function(event) {
			var row = event.getRow();
			var rowData = this._tableModel.getRowDataAsMap(row);
			var cityId = rowData["id"];
			if (cityId == "Total") {
				return;
			}
			switch (event.getColumn()) {
			case 1:
				a.setMainView("c", cityId, -1, -1);
				break;
			case 2:
				var cities = webfrontend.data.Player.getInstance().cities;
				var city = cities[cityId];
				if (city != null) {
					var coords = bos.Utils.convertIdToCoordinatesObject(cityId);
					a.setMainView('r', 0, coords.xPos * a.visMain.getTileWidth(), coords.yPos * a.visMain.getTileHeight());
				}
				break;
			}
		}, 
		_createToolBar: function() {
			var toolBar = new qx.ui.groupbox.GroupBox();
			toolBar.setLayout(new qx.ui.layout.Flow(10, 10));
			
			this.sbCityType = bos.Utils.createCitiesTypesSelectBox();
			bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			this.sbCityType.addListener("changeSelection", this.updateView, this);
			bos.Storage.getInstance().addListener("changeCustomCityTypesVersion", function(event) {
				bos.Utils.populateCitiesTypesSelectBox(this.sbCityType);
			}, this);			
			toolBar.add(this.sbCityType);

			this.sbContinents = bos.Utils.createCitiesContinentsSelectBox();
			this.sbContinents.addListener("changeSelection", this.updateView, this);
			toolBar.add(this.sbContinents);

			var btnCsvExport = new qx.ui.form.Button(tr("btnCsvExport"));			
			btnCsvExport.setWidth(100);
			toolBar.add(btnCsvExport);
			btnCsvExport.addListener("execute", function(evt) {
				this.table.exportToCsv();
			}, this);

			var btnUpdateView = new qx.ui.form.Button(tr("refresh"));
			btnUpdateView.setWidth(80);			
			toolBar.add(btnUpdateView);
			btnUpdateView.addListener("execute", function(evt) {
				this.updateView();								
			}, this);

			return toolBar;
		}
	}
});


qx.Class.define("bos.gui.ExtraSummaryWidget", {
	type: "singleton",
	extend: qx.ui.window.Window,		
	construct: function() {
		qx.ui.window.Window.call(this);				
		this.setLayout(new qx.ui.layout.Dock());

		var maxWidth = qx.bom.Viewport.getWidth(window);
		var maxHeight = qx.bom.Viewport.getHeight(window);			
					
		pos = {
			left: 400,
			top: 150,
			width: 600,
			height: 500
		}		
		
		this.set({
			width: pos.width,
			minWidth: 200,
			maxWidth: parseInt(maxWidth * 0.9),
			height: pos.height,
			minHeight: 200,
			maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
			allowMaximize: false,
			allowMinimize: false,
			showMaximize: false,
			showMinimize: false,
			showStatusbar: false,
			showClose: false,
			caption: tr("extra summary"),
			resizeSensitivity: 7,
			contentPadding: 0,
			zIndex: 100000 - 1
		});				

		this.moveTo(pos.left, pos.top);

		this.tabView = new qx.ui.tabview.TabView().set({
			contentPadding: 5
		});
		this.tabView.setAppearance("tabview");
					
		this.playerInfoTab = new bos.gui.PlayerInfoPage();
		this.tabView.add(this.playerInfoTab);
		
		this.allianceInfoTab = new bos.gui.AllianceInfoPage();
		this.tabView.add(this.allianceInfoTab);
		
		this.myAllianceTab = new bos.gui.MyAlliancePage();
		this.tabView.add(this.myAllianceTab);
		
		this.intelligenceTab = new bos.gui.IntelligencePage();
		this.tabView.add(this.intelligenceTab);
		
		this.tabView.addListener("changeSelection", this.onChangeTab, this);		
		this.add(this.tabView);

		webfrontend.gui.Util.formatWinClose(this);
					
	}, 
	members: {
		tabView: null,
		playerInfoTab: null,
		allianceInfoTab: null,
		myAllianceTab: null,
		intelligenceTab: null,
		onChangeTab: function() {
			this.updateView();
		},
		updateView: function() {
			if (this.tabView.isSelected(this.playerInfoTab)) {
				this.playerInfoTab.updateView();
			} else if (this.tabView.isSelected(this.allianceInfoTab)) {
				this.allianceInfoTab.updateView();
			} else if (this.tabView.isSelected(this.myAllianceTab)) {
				this.myAllianceTab.updateView();
			} else if (this.tabView.isSelected(this.intelligenceTab)) {
				this.intelligenceTab.updateView();
			}	
		},
		switchToIntelligenceTab: function() {
			this.tabView.setSelection([this.intelligenceTab]);
		}
	}
});

qx.Class.define("bos.gui.SummaryWidget", {
		type: "singleton",
		extend: qx.ui.window.Window,
		implement: [webfrontend.net.IUpdateConsumer],
		construct: function() {

			qx.ui.window.Window.call(this);				
			this.setLayout(new qx.ui.layout.Dock());

			var maxWidth = qx.bom.Viewport.getWidth(window);
			var maxHeight = qx.bom.Viewport.getHeight(window);			
			
			var pos = bos.Storage.getInstance().getSummaryPosition();
			if (pos == null) {
				pos = {
					left: 400,
					top: 150,
					width: Math.max(600, qx.bom.Viewport.getWidth(window) - 420),
					height: 500
				}
			} else {
				if (pos.left >= maxWidth) {
					pos.left = 0;
				}
				if (pos.top >= maxHeight) {
					pos.top = 0;
				}
			}
			
			this.set({
				width: pos.width,
				minWidth: 200,
				maxWidth: parseInt(maxWidth * 0.9),
				height: pos.height,
				minHeight: 200,
				maxHeight: parseInt(qx.bom.Viewport.getWidth(window) * 0.9),
				allowMaximize: false,
				allowMinimize: false,
				showMaximize: false,
				showMinimize: false,
				showStatusbar: false,
				showClose: false,
				caption: ("Genel Bakış"),
				resizeSensitivity: 7,
				contentPadding: 0
				
			});				

			this.moveTo(pos.left, pos.top);

			this.tabView = new qx.ui.tabview.TabView().set({
				contentPadding: 5
			});
			this.tabView.setAppearance("tabview");
			
			this.citiesTab = new bos.gui.CitiesPage();
			this.tabView.add(this.citiesTab);
			
			this.militaryTab = new bos.gui.MilitaryPage();
			this.tabView.add(this.militaryTab);
			
			this.defendersTab = new bos.gui.DefendersPage();
			this.tabView.add(this.defendersTab);			

			this.castlesTab = new bos.gui.CastlesPage();
			this.tabView.add(this.castlesTab);			
						
			this.purifyResourcesTab = new bos.gui.PurifyResourcesPage();
			this.tabView.add(this.purifyResourcesTab);
			
			this.massRecruitmentTab = new bos.gui.MassRecruitmentPage();
			this.tabView.add(this.massRecruitmentTab);
			
			if (false) {
				//disabled
				this.dungeonsTab = new bos.gui.DungeonsPage();
				this.tabView.add(this.dungeonsTab);
				
				this.regionTab = new bos.gui.RegionPage();
				this.tabView.add(this.regionTab);					
			}
			
			this.tradeOrdersTab = new bos.gui.TradeOrdersPage();
			this.tabView.add(this.tradeOrdersTab);
			
			this.tradeRoutesTab = new bos.gui.TradeRoutesPage();
			this.tabView.add(this.tradeRoutesTab);

			this.unitOrdersTab = new bos.gui.UnitOrdersPage();
			this.tabView.add(this.unitOrdersTab);

			this.incomingAttacksTab = new bos.gui.IncomingAttacksPage();
			this.tabView.add(this.incomingAttacksTab);

			this.optionsTab = new bos.gui.OptionsPage();
			this.tabView.add(this.optionsTab);
			
			this.tabView.addListener("changeSelection", this.onChangeTab, this);
			
			this.add(this.tabView);

			this.cities = new Array();
			webfrontend.gui.Util.formatWinClose(this);
			
			this.guardianTimer = new qx.event.Timer(10500);
			this.guardianTimer.addListener("interval", this.checkAndReattachConsumers, this);	
			this.guardianTimer.start();	

			if (webfrontend.data.Player.getInstance().getMinisterTradePresent()) {
				this.startCosumingRESO();
			}
			
			if (webfrontend.data.Player.getInstance().getMinisterMilitaryPresent()) {
				this.unitOrdersTab.startRefreshingFromServer();
			}
			
		}, 
		statics: {
			_defaultSortComparatorInsensitiveAscending : function(row1, row2) {
				//summary row always at the bottom
				if (row1[0] == "Total") {
					return 1;
				}

				if (row2[0] == "Total") {
					return -1;
				}

				var obj1 = null;
				if (row1[arguments.callee.columnIndex] != null)
						obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
								row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

				var obj2 = null;
				if (row2[arguments.callee.columnIndex] != null)
						obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
								row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

				var n1 = qx.lang.Type.isNumber(obj1);
				var n2 = qx.lang.Type.isNumber(obj2);
				if (n1 && n2) {
					var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
					if (result != null) {
						if (result == 0) {
							return row1[0] > row2[0] ? 1 : -1;
						}
						return result;
					}
				}

				if (n1 && !n2) {
					return -1;
				}

				if (!n1 && n2) {
					return 1;
				}

				if (obj1 > obj2) {
					return 1;
				} else if (obj1 < obj2) {
					return -1;
				}
				
				return row1[0] > row2[0] ? 1 : -1;
			}, 
			_defaultSortComparatorInsensitiveDescending : function(row1, row2) {
				//summary row always at the bottom
				if (row1[0] == "Total") {
					return 1;
				}
				if (row2[0] == "Total") {
					return -1;
				}

				var obj1 = null;
				if (row1[arguments.callee.columnIndex] != null)
						obj1 = (row1[arguments.callee.columnIndex].toLowerCase ?
								row1[arguments.callee.columnIndex].toLowerCase() : row1[arguments.callee.columnIndex]);

				var obj2 = null;
				if (row2[arguments.callee.columnIndex] != null)
						obj2 = (row2[arguments.callee.columnIndex].toLowerCase ?
								row2[arguments.callee.columnIndex].toLowerCase() : row2[arguments.callee.columnIndex]);

				var n1 = qx.lang.Type.isNumber(obj1);
				var n2 = qx.lang.Type.isNumber(obj2);
				if (n1 && n2) {
					var result = isNaN(obj1) ? isNaN(obj2) ?  0 : 1 : isNaN(obj2) ? -1 : null;
					if (result != null) {
						if (result == 0) {
							return row1[0] < row2[0] ? 1 : -1;
						}
					}
				}

				if (n1 && !n2) {
					return -1;
				}

				if (!n1 && n2) {
					return 1;
				}
				
				if (obj1 < obj2)
					return 1;
				if (obj1 > obj2)
					return -1;

				return row1[0] > row2[0] ? 1 : -1;
			}
		}, 
		members: {
				tabView: null,
				citiesTab: null,
				militaryTab: null,
				defendersTab: null,
				dungeonsTab: null,
				regionTab: null,
				unitOrdersTab: null,
				tradeOrdersTab: null,
				tradeRoutesTab: null,
				incomingAttacksTab: null,
				castlesTab: null,
				purifyResourcesTab: null,
				optionsTab: null,
				
				_requestedResourceType: 1,
				_requestedResourceCity: 0,
				_requestedResourceFetchedCities: null,
				_requestedResourceRefreshView: false,								
				_requestResourcesProgressDialog: null,
				_waitingForFullMessage: true,
				
				cities: null,
				resfHandlerAdded: false,

				updateManagerConsumers: [],
				guardianTimer: null,
				lastUpdateViewTime: 0,
				getRequestDetails: function(dt) {
					if (this._waitingForFullMessage) {
						return "a";
					} else {
						return "";
					}
				}, 
				dispatchResults: function(du) {
					if (this._waitingForFullMessage) {
						this._waitingForFullMessage = false;
					}
					if (du == null || du.length == 0) return;
					
					for (var i = 0, count = du.length; i < count; i++) {
						var dv = du[i];
						this.cities[dv.i] = dv;
					}
					
					this.updateView(true);					
				}, 
				startCosumingRESO: function() {
					if (!this.resfHandlerAdded) {
						webfrontend.net.UpdateManager.getInstance().addConsumer("RESO", this);
						this.updateManagerConsumers.push("RESO");																				
						this.resfHandlerAdded = true;
					}
				},
				checkAndReattachConsumers: function() {
					var manager = webfrontend.net.UpdateManager.getInstance();					
					for (var c = 0; c < this.updateManagerConsumers.length; c++) {
						var code = this.updateManagerConsumers[c];
						var attached = false;
						for (var i = 0; i < manager.reciever.length; i++) {	
							var item = manager.reciever[i];
							if (item != null && item.code == code && item.consumer == this) {
								attached = true;
								break;
							}
						}
						if (!attached) {
							manager.addConsumer(code, this);
						}
					}
				}, 
				onTick: function() {

				}, 
				onChangeTab: function() {
					
					if ((this.dungeonsTab != null && this.tabView.isSelected(this.dungeonsTab)) || (this.regionTab != null && this.tabView.isSelected(this.regionTab))) {
						this._forceRegionMap();
					}			

					this.updateView();
				}, 
				activateOverlay: function(show) {
					var server = bos.Server.getInstance();
					if (show) {
						server.addListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					} else {
						server.removeListener("bos.data.changeLastUpdatedCityId", this.updateView, this);
					}
				},  
				_createExportButton: function() {
					var btnExport = new qx.ui.form.Button(locale == "de" ? "Exportiere zu csv" : "csv çıktı al");
					btnExport.setToolTipText(locale == "de" ? "Exportiert die Tabelle ins csv Format" : "csv formatında çıktısını alırsın");
					btnExport.setWidth(120);
					return btnExport;
				}, 
				loadPersistedCities: function() {
					var savedCities = bos.Storage.getInstance().getSavedCities();
					var cities = webfrontend.data.Player.getInstance().cities;

					var server = bos.Server.getInstance();
					
					var count = 0;
					for (var key in savedCities) {
						var cityId = parseInt(savedCities[key]);
						if (server.cities[cityId] == undefined && cities[cityId] != undefined && !isNaN(cityId)) {
							var loaded = bos.Storage.getInstance().loadCity(cityId);
							server.cities[cityId] = loaded;
							count++;
						}
					}
					
					this.updateView();

				}, 
				loadPersistedTableSettings: function() {
					var storage = bos.Storage.getInstance();

					if (storage.getCitiesTableSettings() != null) {
						this.citiesTab.table.applyTableSettings(storage.getCitiesTableSettings(), "Şehirler");
					}
					if (storage.getMilitaryTableSettings() != null) {
						this.militaryTab.table.applyTableSettings(storage.getMilitaryTableSettings(), "Askerler");
					}
					if (storage.getMoonstonesTableSettings() != null) {
						this.purifyResourcesTab.table.applyTableSettings(storage.getMoonstonesTableSettings(), "Ay Taşı");
					}
				}, 
				_disposeRequestResourcesProgressDialog: function() {
					if (this._requestResourcesProgressDialog != null) {
						this._requestResourcesProgressDialog.disable();
						this._requestResourcesProgressDialog.destroy();
						this._requestResourcesProgressDialog = null;
					}
				}, 
				fetchResources: function() {
					this._disposeRequestResourcesProgressDialog();

					this._requestResourcesProgressDialog = new webfrontend.gui.ConfirmationWidget();
					this._requestResourcesProgressDialog.showInProgressBox(tr("Lütfen bekleyin"));
					qx.core.Init.getApplication().getDesktop().add(this._requestResourcesProgressDialog, {
						left: 0,
						right: 0,
						top: 0,
						bottom: 0
					});
					this._requestResourcesProgressDialog.show();
					
					this._requestedResourceCity = webfrontend.data.City.getInstance().getId();
					this._requestedResourceType = bos.Const.WOOD;
					this._requestedResourceFetchedCities = [];
					
					var server = bos.Server.getInstance();
					server.cityResources = {};
					this._fetchResourcesImpl();
				}, 
				_fetchResourcesImpl: function() {
					this._requestedResourceFetchedCities["c" + this._requestedResourceCity] = true;
					bos.net.CommandManager.getInstance().sendCommand("TradeSearchResources", {
						cityid: this._requestedResourceCity,
						resType: this._requestedResourceType,
						minResource: 0,
						maxTime: 24 * webfrontend.data.ServerTime.getInstance().getStepsPerHour()
					}, this, this._processTradeSearchResources);
				}, 
				_processTradeSearchResources: function(r, n) {
					if (r == false || n == null) return;

					//[{"i":7667741,"la":140698,"lt":2400,"n":"041 Wroclaw","rc":140698,"sa":0,"sg":false,"st":4800}
					//al = land capacity
					//as = sea capacity
					//i = cityId
					//n = cityName
					//rc = resources count
					//sg = sieged?
					//tl = land transport time, if < 0 then city not reachable
					//ts = sea transport time, if < 0 then city not reachable

					var resourceType = this._requestedResourceType;
					var lastUpdated = new Date();
					
					var server = bos.Server.getInstance();
					for (var i = 0; i < n.length; i++) {

						var c = {
							cityId: n[i].i,
							//city: n[i].n,
							timeLand: n[i].lt,								
							timeSea: n[i].st,
							seaTransportTime: n[i].st,
							landTransportTime: n[i].lt,
							sieged: n[i].sg,
							resources: [null, null, null, null, null],
							lastUpdated: lastUpdated
						};

						var prevCity = server.cityResources["c" + c.cityId];
						if (prevCity != null) {
							for (var res = 1; res <= 4; res++) {
								c.resources[res] = prevCity.resources[res];
							}
							prevCity.resources = null;
						}
						
						var resCount = n[i].rc;

						c.resources[resourceType] = {							
							count: resCount,
							amountLand: n[i].la,
							amountSea: n[i].sa
						}
						server.cityResources["c" + c.cityId] = c;

						var realCity = server.cities[c.cityId];
						if (realCity != null && realCity.resources.hasOwnProperty(resourceType)) {
							realCity.setResourceCount(resourceType, resCount);

							/*
							var diff = Math.abs(realCity.getResourceCount(resourceType) - resCount);
							if (diff > 5000) {
									//big diff means city storage has been changed
									alert("city " + realCity.getName() + " res=" + resourceType + " good: " + resCount + " bad: " + realCity.getResourceCount(resourceType));
							}
							*/
						}

					}

					if (this._requestedResourceType < 4) {
						this._requestedResourceType++;
						this._fetchResourcesImpl();
					} else {
						this._prepareNextTradeSearchResourcesBatch();
					}

				}, 
				_prepareNextTradeSearchResourcesBatch: function() {
					var cities = webfrontend.data.Player.getInstance().cities;
					
					var server = bos.Server.getInstance();
					for (var key in cities) {
						var cacheKey = "c" + key;
						var resCity = server.cityResources[cacheKey];
						if (resCity == null && this._requestedResourceFetchedCities[cacheKey] == null) {
							this._requestedResourceCity = parseInt(key);
							this._requestedResourceType = bos.Const.WOOD;
							this._fetchResourcesImpl();
							return;
						}
					}

					//details about every city has been already fetched or there was some error during fetching
					server.setCityResourcesUpdateTime(new Date());
					if (this._requestedResourceRefreshView) {
						this._requestedResourceRefreshView = false;
						this.updateView();
						this._disposeRequestResourcesProgressDialog();
					}

				}, 
				_updateRowFromResCity: function(resCity, row) {
					if (resCity.resources[1] != null) {
						row["wood"] = resCity.resources[1].count;
					}
					if (resCity.resources[2] != null) {
						row["stone"] = resCity.resources[2].count;
					}
					if (resCity.resources[3] != null) {
						row["iron"] = resCity.resources[3].count;
					}
					if (resCity.resources[4] != null) {
						row["food"] = resCity.resources[4].count;
					}
				}, 
				_populateResources: function(row, cityId) {
					if (!this.cities.hasOwnProperty(cityId)) {
						return false;
					}
					
					var st = webfrontend.data.ServerTime.getInstance();
					var serverStep = st.getServerStep();
					var stepsPerHour = st.getStepsPerHour();
											
					var c = this.cities[cityId];
					
					var resTypes = ["", "wood", "stone", "iron", "food"];
					
					var gold = Math.round(c.g * stepsPerHour);
					row["gold/h"] = gold;
					
					for (var i = 0; i < c.r.length; i++) {
						var res = c.r[i];
						var timeDiff = serverStep - res.s;
						var delta = res.d;
						var count = timeDiff * delta + res.b;
						count = Math.max(0, Math.min(count, res.m));
						
						var key = resTypes[res.i];
						row[key] = Math.floor(count);
						row[key + "/h"] = Math.round(delta * stepsPerHour);
						row[key + "Max"] = res.m;
						row[key + "Free"] = res.m - row[key];
						row[key + "Offers"] = res.o;
						row[key + "Incoming"] = res.t;
						
						if (res.i == 4) {
							var foodBallance = row[key + "/h"]
							if (foodBallance >= 0) {
								row["foodEmptyAt"] = "food positive";
							} else {
								//var n = res.s + r.b / -(foodBallance);
								var n = Math.floor(serverStep + count / -delta);
								var emptyAt;
								if (webfrontend.data.ServerTime.getInstance().getServerStep() >= n) {
									emptyAt = 0;
									row["foodEmptyAt"] = "storage empty";
								} else {												
									emptyAt = webfrontend.data.ServerTime.getInstance().getStepTime(n);	
									row["foodEmptyAt"] = parseInt((emptyAt - new Date()) / 1000);													
								}
							}																							
						}
					}
				
					return true;
				}, 
				_addDefendersToRow: function(city, row, sum) {
					row["ts"] = 0;
					row["summary_military"] = "";
					row["unitsAtHome"] = 0;
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_" + i;
						if (i == 18) continue;
						var unit = city.getUnitTypeInfo(i);
						row[unitKey] = unit.total;
						row["unit_def_" + i] = unit.count;
						row["unitsAtHome"] += unit.count;
						if (sum[unitKey] == null || sum[unitKey] == "") {
							sum[unitKey] = 0;
						}
						sum[unitKey] += unit.total;

						var space = unit.total * getUnitRequiredSpace(i);
						row["ts"] += space;
						sum["ts"] += space;

						if (unit.total > 0) {
							if (row["summary_military"].length > 0) {
								row["summary_military"] += ", ";
							}
							row["summary_military"] += unit.total + " " + formatUnitType(i, unit.total);
						}
					}

					if (city.getSupportOrders() != null) {
						for (var i = 0; i < city.getSupportOrders().length; i++) {
							var order = city.getSupportOrders()[i];
							if (order.state = 4 && order.units != null) {
								for (var u = 0; u < order.units.length; u++) {
									var unit = order.units[u];
									row["unit_def_" + unit.type] += unit.count;
								}
							}
						}
					}

					row["summary_defenders_ts"] = 0;
					row["summary_defenders"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_def_" + i;
						if (i == 18) continue;
						if (row[unitKey] != "0" && row[unitKey] != null) {
							if (row["summary_defenders"].length > 0) {
								row["summary_defenders"] += ", ";
							}
							row["summary_defenders"] += row[unitKey] + " " + formatUnitType(i, row[unitKey]);

							if (sum[unitKey] == null || sum[unitKey] == "") {
								sum[unitKey] = 0;
							}
							sum[unitKey] += row[unitKey];
							var space = row[unitKey] * getUnitRequiredSpace(i);
							row["summary_defenders_ts"] += space;
							sum["summary_defenders_ts"] += space;
						}
					}


					sum["summary_military"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_" + i;
						if (i == 18) continue;
						if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
							if (sum["summary_military"].length > 0) {
									sum["summary_military"] += ", ";
							}
							sum["summary_military"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
						}
					}

					sum["summary_defenders"] = "";
					for (var i = 1; i <= 19; i++) {
						var unitKey = "unit_def_" + i;
						if (i == 18) continue;
						if (sum[unitKey] != "0" && sum[unitKey] != null && sum[unitKey] != "") {
							if (sum["summary_defenders"].length > 0) {
									sum["summary_defenders"] += ", ";
							}
							sum["summary_defenders"] += sum[unitKey] + " " + formatUnitType(i, sum[unitKey]);
						}
					}
				},
				_forceRegionMap: function() {
					if (a.visMain.getMapMode() != "r") {
						var cityId = webfrontend.data.City.getInstance().getId();
						var city = webfrontend.data.Player.getInstance().cities[cityId];
						var x = city.xPos;
						var y = city.yPos;
						a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
					}	
				}, 
				updateView: function(isAutoRefreshed) {
					
					var startTime = (new Date()).getTime();
					
					if (!this.isSeeable()) {
						//console.log("Main summary view is hidden, nothing to update");
						return;
					}
					
					if (isAutoRefreshed === true && startTime - this.lastUpdateViewTime <= bos.Const.MIN_INTERVAL_BETWEEN_AUTO_REFRESHES) {
						//console.log("summary was recently auto updated skipping update");
						return;
					}

					if (this.tabView.isSelected(this.citiesTab)) {
						this.citiesTab.updateView();
					} else if (this.tabView.isSelected(this.militaryTab)) {
						this.militaryTab.updateView();
					} else if (this.tabView.isSelected(this.defendersTab)) {
						this.defendersTab.updateView();
					} else if (this.dungeonsTab != null && this.tabView.isSelected(this.dungeonsTab)) {
						this.dungeonsTab.updateView();
					} else if (this.regionTab != null && this.tabView.isSelected(this.regionTab)) {
						this.regionTab.updateView();
					} else if (this.tabView.isSelected(this.unitOrdersTab)) {
						this.unitOrdersTab.updateView();
					} else if (this.tabView.isSelected(this.tradeOrdersTab)) {
						this.tradeOrdersTab.updateView();
					} else if (this.tabView.isSelected(this.tradeRoutesTab)) {
						this.tradeRoutesTab.updateView();
					} else if (this.tabView.isSelected(this.incomingAttacksTab)) {
						this.incomingAttacksTab.updateView();
					} else if (this.tabView.isSelected(this.purifyResourcesTab)) {
						this.purifyResourcesTab.updateView();
					} else if (this.tabView.isSelected(this.massRecruitmentTab)) {
						this.massRecruitmentTab.updateView();
					} else if (this.tabView.isSelected(this.castlesTab)) {
						this.castlesTab.updateView();
					}

					var server = bos.Server.getInstance();
					if (this.citiesTab.btnRefreshResources != null && server.getCityResourcesUpdateTime() != null) {
						this.citiesTab.btnRefreshResources.setToolTipText("Resources refreshed at: " + qx.util.format.DateFormat.getDateTimeInstance().format(server.getCityResourcesUpdateTime()));
					}

					this.optionsTab.cbPersistCities.setValue(bos.Storage.getInstance().getPersistingCitiesEnabled());
					
					var finishTime = (new Date()).getTime();
					//console.log("summary.updateView took " + (finishTime - startTime) + "ms , previous update ended " + (startTime - this.lastUpdateViewTime) + "ms before current one started");
					this.lastUpdateViewTime = finishTime;
				}
		}
});

function handleError(dp) {
	try {	
		var dq = dp.toString();
		var cx = " ";
		if (dp.hasOwnProperty("fileName")) dq += cx + dp.fileName;
		if (dp.getUri != null) dq += cx + dp.getUri();
		if (dp.hasOwnProperty("lineNumber")) dq += cx + dp.lineNumber;
		if (dp.getLineNumber != null) dq += cx + dp.getLineNumber();
		if (dp.hasOwnProperty("stack")) dq += cx + dp.stack;

		dq = qx.util.Json.stringify(dq);

		var msg = "{error:" + dq + "}";
		
		if (console.log != undefined) {
			console.log(msg);
		} else {
			alert(msg);
		}
	} catch (e) {
		alert("Error in error handler " + e);
	}
}

function selectReports(startsWith) {
	var rep = a.title.report;

	var select = startsWith != null;

	var parts;

	if (startsWith != null) {
		parts = startsWith.split("|");
	} else {
		parts = [];
		parts.push(null);
	}

	rep.headerData.iterateCachedRows(_changeCheckState, {
		s: select,
		parts: parts
	});

	rep.headerData.fireDataEvent("dataChanged", {
		firstColumn: 0,
		lastColumn: 0,
		firstRow: 0,
		lastRow: rep.headerData.getRowCount()
	});
	rep._updateButtonState();
}

function _changeCheckState(D, E) {
	var rep = a.title.report;
	for (var key in this.parts) {
		var part = this.parts[key];
		if (part == null || part == "" || (E.s != null && E.s.indexOf(part) > 0)) {
			E.c = this.s;
			rep.headerData.setSelected(E.i, this.s);
			break;
		}
	}
}

function exportSelectedReports() {
	var rep = a.title.report;
	var ids = rep.headerData.getSelectedIds();

	if (ids.length == 0 || (ids.length == 1 && ids[0] == 0)) {
		return;
	}

	if (ids.length > 5) {
		if (locale == "de"){
			bos.Utils.handleWarning("Bitte wähle nicht mehr als 5 Berichte aus");
		}
		else{
			bos.Utils.handleWarning("Please do not select more than 5 reports");
		}

		return;
	}

	var counter = 1;
	for (key in ids) {
		var id = ids[key];
		bos.net.CommandManager.getInstance().sendCommand("GetReport", {
				id: id
		}, this, parseReport, counter);
		counter++;
	}
}

function parseReport(r, data, eh) {

	if (r == false || data == null) return;

	var date = new Date(data.h.d); 
	var header = data.h.l + " on " + qx.util.format.DateFormat.getDateTimeInstance().format(date) + ".";

	var result = new Array();
	result["short"] = header;
	result["onlyDef"] = header;
	result["csv"] = "TODO";

	if (data.a != null && data.a.length > 0) {

		var totalAtt = [];
		var totalDef = [];

		for (var i = 0; i < data.a.length; i++) {
				var army = data.a[i];

				for (var key in army.u) {
						var total = army.r == bos.Const.ORDER_ATTACK ? totalAtt : totalDef;

						var unit = army.u[key];
						var totalKey = unit.t;
						if (total[totalKey] == undefined) {
								total[totalKey] = {o: 0, l: 0, t: unit.t};
						}

						total[totalKey].o += unit.o;
						total[totalKey].l += unit.l;
				}
		}

		result["short"] += "\nAttackers: " + formatUnits(totalAtt) + ".";

		var tmp = "\nTotal Defenders: " + formatUnits(totalDef) + ".";
		result["onlyDef"] += tmp;
		result["short"] += tmp;
	}

	result["full"] = result["short"];
	if (data.rs != null && data.rs.length > 0) {
			result["full"] += "\nRes: ";
			for (var i = 0; i < data.rs.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.rs[i]);
			}
			result["full"] += ".";
	}

	if (data.r != null && data.r.length > 0) {
			result["full"] += "\nRes looted: ";
			for (var i = 0; i < data.r.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatResource(data.r[i]);
			}
			result["full"] += ".";
	}

	if (data.cp != undefined && data.cpo != undefined && data.cp >= 0) {
			result["full"] += "\nPower of claim: ";
			if (data.cp > data.cpo) {
					result["full"] += "increased from " + data.cpo + "% to " + data.cp + "%";
			} else if (data.cp == data.cpo) {
					result["full"] += "stays at " + data.cp + "%";
			} else {
					result["full"] += "decreased from " + data.cpo + "% to " + data.cp + "%";
			}
	}

	if (data.b != undefined && data.b.m != undefined && data.b.n != undefined) {
			result["full"] += "\nMorale: " + Math.round(100 * (data.b.m - 1)) + "%";
			result["full"] += "\nAttack reduction: " + Math.round(100 * (data.b.n - 1)) + "%";
	}

	if (data.s != null && data.s.length > 0) {
			result["full"] += "\nBuildings: ";
			for (var i = 0; i < data.s.length; i++) {
					if (i > 0) {
							result["full"] += ", ";
					}
					result["full"] += formatBuilding(data.s[i]);
			}
			result["full"] += ".";
	}

	showReport(result);
}

function formatResource(rs) {
	if (rs.t == bos.Const.GOLD) {
		return rs.v + " " + "gold";
	} else {
		var res = webfrontend.res.Main.getInstance();
		var resource = res.resources[rs.t];
		return rs.v + " " + resource.n.toLowerCase();
	}
}

function formatBuilding(s) {
	var res = webfrontend.res.Main.getInstance();
	var building = res.buildings[s.t];

	var res = "";
	if (s.a > 1) {
			res += s.a + " x ";
	}
	res += "lvl " + s.l + " " + building.dn.toLowerCase();
	return res;
}

function showReport(report) {
	var dialog = shareReportWindow();
	dialog.show(report);
	qx.core.Init.getApplication().getDesktop().add(dialog, {left: 0, right: 0, top: 0, bottom: 0});
	dialog.show();
}

function shareReportWindow() {
	var dialog = new webfrontend.gui.ConfirmationWidget();

	dialog.show = function(report) {

		var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_survey.gif");
		this.dialogBackground._add(bgImg, {left: 0, top: 0});

		var la = new qx.ui.basic.Label("Exported report");
				la.setFont("font_subheadline_sidewindow");
				la.setTextColor("text-gold");
				la.setTextAlign("left");
		this.dialogBackground._add(la, {left: 17, top: 5});


		var shrStr = new qx.ui.form.TextArea(report["short"]).set({allowGrowY: true, tabIndex: 303});
		this.dialogBackground._add(shrStr, {left: 30, top: 50, width: 90, height: 45});
		shrStr.selectAllText();

		var shwStr = function(type) {
				shrStr.setValue(report[type]);
				shrStr.selectAllText();
		}

		var top = 175;
		var btnShort = new qx.ui.form.Button(locale == "de" ? "Kurz" : "Short").set({width: 125, appearance: "button-text-small"});
		btnShort.addListener("click", function(){shwStr("short");}, false);
		this.dialogBackground._add(btnShort, {left: 30, top: top});

		var btnOnlyDef = new qx.ui.form.Button(locale == "de" ? "Nur Verteidiger" : "Only defender").set({width: 125, appearance: "button-text-small"});
		btnOnlyDef.addListener("click", function(){shwStr("onlyDef");}, false);
		this.dialogBackground._add(btnOnlyDef, {left: 160, top: top});

		var btnFull = new qx.ui.form.Button(locale == "de" ? "Komplett" : "Full").set({width: 125, appearance: "button-text-small"});
		btnFull.addListener("click", function(){shwStr("full");}, false);
		this.dialogBackground._add(btnFull, {left: 290, top: top});


		var okButton = new qx.ui.form.Button("OK");
				okButton.setWidth(120);
				okButton.addListener("click", function(){dialog.disable();}, false);
		this.dialogBackground._add(okButton, {left: 445, top: 190});
	}
	return dialog;
}


function formatUnits(units) {
	var s = "";

	for (var key in units) {
		if (key == undefined) continue;

		var unit = units[key];

		if (unit == undefined || unit.o == undefined || unit.t == undefined || unit.l == undefined) {
			continue;
		}

		if (s != "") {
			s += ", ";
		}

		//var lost = unit.o - unit.l;
		//s += unit.o + "-" + lost + "=" + unit.l + " ";
		/* old format */
		s += unit.o + " ";
		if (unit.l != unit.o) {
				s += "(" + unit.l + ") ";
		}

		s += formatUnitType(unit.t, unit.o);
	}

	if (s == "") {
		s = "none";
	}

	return s;
}

function formatUnitType(unitType, count) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
		return "UNKNOWN_" + unitType;
	}
	var name = unit.dn.toLowerCase();
	var locale = qx.locale.Manager.getInstance().getLocale();
	if (locale == "en") {
		if (name != null && name.length > 0 && name.charAt(name.length - 1) != 's' && count > 1) {
			name += 's';
			if (name == "crossbowmans") {
				name = "crossbowmen";
			}
		}
	} else {
		if (name != null && name.length > 0 && count > 1) {
			switch (name) {
				case "stadtwächter":
				name = "Stadtwächter";
				break;
				case "balliste":
				name = "Baliste(n)";
				break;
				case "jäger":
				name = "Jäger";
				break;
				case "pikenier":
				name = "Pikenier(e)";
				break;
				case "templer":
				name = "Templer";
				break;
				case "beserker":
				name = "Berserker";
				break;
				case "magier":
				name = "Magier";
				break;
				case "kundschafter":
				name = "Kundschafter";
				break;
				case "armbrustschütze":
				name = "Armbrustschütze(n)";
				break;
				case "paladin":
				name = "Paladin(e)";
				break;
				case "ritter":
				name = "Ritter";
				break;
				case "hexenmeister":
				name = "Hexenmeister";
				break;
				case "rammbock":
				name = "Rammböcke";
				break;
				case "katapult":
				name = "Katapult(e)";
				break;
				case "fregatte":
				name = "Fregatte(n)";
				break;
				case "schaluppe":
				name = "Schaluppe(n)";
				break;
				case "kriegsgaleone":
				name = "Kriegsgaleone(n)";
				break;
				case "baron":
				name = "Baron(e)";
				break;
			}
		}
	}
	return name;
}

function getUnitAttackType(unitId) {
	var unitId = parseInt(unitId);
	var infantry = new qx.data.Array([1, 3, 4, 5, 6, 19]);
	var cavalery = new qx.data.Array([8, 9, 10, 11]);
	var magic = new qx.data.Array([7, 12]);
	var artilery = new qx.data.Array([2, 13, 14, 15, 16, 17]);

	if (infantry.indexOf(unitId) >= 0) {
		//return "infantry";
		return 1;
	}
	if (cavalery.indexOf(unitId) >= 0) {
		//return "cavalery";
		return 2;
	}
	if (magic.indexOf(unitId) >= 0) {
		//return "magic";
		return 4;
	}
	if (artilery.indexOf(unitId) >= 0) {
		//return "artilery";
		return 3;
	}
	//return "unknown";
	bos.Utils.handleError("Unknown attack type for unit " + unitId);
	return 0;
}

function getUnitRequiredSpace(unitType) {
	var res = webfrontend.res.Main.getInstance();
	var unit = res.units[unitType];
	if (unit == null) {
		return 0;
	}
	return unit.uc;
}

function human_time(val) {
	if (val <= 0)
		return "00:00:00";

	var seconds = val % 60;
	var minutes = Math.floor(val / 60) % 60;
	var hours = Math.floor(val / 3600) % 24;
	var days = Math.floor(val / 86400);

	var str = sprintf("%02d:%02d:%02d", hours, minutes, seconds);

	if (days > 0)
		str = sprintf( "%dd %s", days, str);

	return str;
}

function debug(sMsg) {
	if (bos.Const.DEBUG_VERSION) {
/*
	if (window.JS_log != undefined)
		window.JS_log(sMsg);
	else
	*/
		alert(sMsg);
	}
}

function dumpObject(obj) {
	debug(qx.util.Json.stringify(obj));
}

function trace(sMsg) {
	//alert(sMsg);
}
				
qx.Class.define("bos.gui.FoodCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(tr("food calculator"));
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box);

		this.unitContainer = new qx.ui.groupbox.GroupBox();
		this.unitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.unitContainer, {row: 0, column: 0});

		this.units = new Object;

		var maxUnitsPerColumn = 9;
		var unitHeight = 42;
		for (var key in res.units) {
			var u = res.units[key];
			if (u.x < 0 || u.y < 0) continue;
			var x = u.x * 560;
			var y = u.y * unitHeight;
			if (u.y >= maxUnitsPerColumn) {
				x += 292;
				y = (u.y - maxUnitsPerColumn) * unitHeight;
			}
			this.units[key] = this.createUnitSlot(x, y, u, this.unitContainer);
		}
		this.unitContainer.setMinHeight((maxUnitsPerColumn + 1) * unitHeight);

		this.clientArea.add(this.createFooter());

	}, 
	members: {
		units: null,
		unitContainer: null,
		summary: null,
		sbAdd: null,
		addDefendersFromReport: false,
		lblFoodConsumption: null,
		btnClear: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing
		}, 
		clearAll: function() {
			this.clear(this.units);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
			}
		}, 
		createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(29);
				img.setHeight(29);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}

			var lblUnitName = new qx.ui.basic.Label(unit.dn);
			container.add(lblUnitName, {
				left: x + 40,
				top: y + 10
			});

			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(120);
			container.add(countInput, {
				left: x + 120,
				top: y + 6
			});
			a.setElementModalInput(countInput);

			var result = {
				'image': img,
				'count': countInput
			};
			return result;
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();					
			container.setLayout(new qx.ui.layout.Flow(5, 5));

			var label;

			this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Einheiten zu Nahrung" : "Asker başı yiyecek");
			this.btnCalc.setWidth(150);
			this.btnCalc.setToolTipText(locale == "de" ? "Berechnet den Nahrungsbedarf pro Stunde der aufgelisteten Einheiten" : "Seçilen birimler için gıda tüketimini /h hesaplar");
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateFoodConsumption, this);
			
			this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Nahrung zu Einheiten" : "Askerlerin yiyeceği");
			this.btnRevCalc.setToolTipText(locale == "de" ? "Berechnet die maximale Einheitenzahl für die eingegebene Nahrungsmenge" : "Maksimum hesap. Girilen gıda karşılığı birim");
			this.btnRevCalc.setWidth(150);
			container.add(this.btnRevCalc);
			this.btnRevCalc.addListener("click", this.calculateUnitsPerConsumption, this);					

			this.btnClear = new qx.ui.form.Button(tr("clear"));
			this.btnClear.setWidth(70);
			container.add(this.btnClear);
			this.btnClear.addListener("click", this.clearAll, this);

			label = new qx.ui.basic.Label(locale == "de" ? "Nahrungsbedarf:" : "Tüketim:");
			label.setMarginLeft(20);
			container.add(label);

			this.lblFoodConsumption = new qx.ui.basic.Label("");
			container.add(this.lblFoodConsumption);

			return container;
		}, 
		onAdd: function() {

		}, 
		calculateFoodConsumption: function() {

			var res = webfrontend.res.Main.getInstance();
			var sum = 0;
			for (var key in this.units) {
				var u = res.units[key];
				var inputs = this.units[key];

				var count = parseInt(inputs.count.getValue(), 10);
				if (count > 0) {
					sum += count * u.f;
				}
			}
			var perH = Math.round(sum / 24.0);
			this.lblFoodConsumption.setValue(perH + "/h");
		}, 
		calculateUnitsPerConsumption: function() {
			var s = prompt(locale == "de" ? "Bitte gebe das Nahrungseinkommen pro Stunde ein" : "Saatlik yiyecek girin.");
			if (s != null && s != "") {
				var foodPerHoour = parseInt(s, 10);
				var res = webfrontend.res.Main.getInstance();
				
				
				for (var key in this.units) {
					var u = res.units[key];
					var inputs = this.units[key];

					var count = Math.round(24.0 * foodPerHoour / u.f);
					inputs.count.setValue(count);
				}
				this.lblFoodConsumption.setValue("N/A");
			}
		}
	}
});


qx.Class.define("bos.gui.RecruitmentSpeedCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.VBox(5));

		this.setTitle(locale == "de" ? "Rekutiergeschwindigkeits Kalkulator" : "Hız hesap makinesi");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {flex: true});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Dock());
		scroll.add(box, {flex: true});

		this.mainContainer = new qx.ui.groupbox.GroupBox();
		this.mainContainer.setLayout(new qx.ui.layout.Grid(10, 10));
		box.add(this.mainContainer, {edge: "center"});
			
		this.config = [
			{buildingId: "15", units: ["1"], times: [50]},
			{buildingId: "16", units: ["6", "3", "4"], times: [200, 250, 300]},
			{buildingId: "36", units: ["7", "12"], times: [600, 1300]},			
			{buildingId: "17", units: ["8", "11", "9"], times: [300, 500, 600]},			
			{buildingId: "18", units: ["13", "2", "14"], times: [2500, 3500, 4000]},
			{buildingId: "19", units: ["16", "15", "17"], times: [25000, 40000, 80000]},			
			{buildingId: "37", units: ["5", "10", "19"], times: [350, 700, 60000]}			
		];
		
		for (var row = 0; row < this.config.length; row++) {
			var o = this.config[row];
			o.result = this._addRow(row + 1, o.buildingId, o.units);
		}

		this.mainContainer.setMinHeight(100);

		this.clientArea.add(this.createFooter());
		
		this.calculate();
	}, 
	members: {
			mainContainer: null,
			sbUnitTypes: null,
			btnClear: null,
			btnCalc: null,
			btnReverseCalc: null,
			activateOverlay: function(activated) {
					//nothing
			}, 
			clearAll: function() {
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					inputs.speed.setValue(100);
				}
				this.calculate();
				
			}, 
			_addRow: function(row, buildingId, units) {
				var res = webfrontend.res.Main.getInstance();
				var result = new Object();
						
				var label;
			
				label = new qx.ui.basic.Label(res.buildings[buildingId].dn);
				this.mainContainer.add(label, {
					row: row, 
					column: 0
				});

				result.speed = new webfrontend.gui.SpinnerInt(0, 100, 1000000);
				result.speed.setWidth(80);
				this.mainContainer.add(result.speed, {
					row: row,
					column: 1
				});
				
				result.units = [];
				for (var i = 0; i < units.length; i++) {
					var unit = units[i];
					label = new qx.ui.basic.Label(res.units[unit].dn);
					this.mainContainer.add(label, {
						row: row, 
						column: i + 2
					});
					result.units.push(label);
				}
				
				return result;
			}, 
			createFooter: function() {
				var box = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				var label;

				this.btnCalc = new qx.ui.form.Button(locale == "de" ? "Berechne" :"Hesap makinesi");
				this.btnCalc.setWidth(120);
				container.add(this.btnCalc);
				this.btnCalc.addListener("click", this.calculate, this);
				
				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.sbUnitTypes = new qx.ui.form.SelectBox().set({
					width: 120,
					height: 28
				});
				
				var res = webfrontend.res.Main.getInstance();
				for (var key in res.units) {
					var u = res.units[key];
					if (parseInt(key) > 19) {
						break;
					}
					this.sbUnitTypes.add(new qx.ui.form.ListItem(u.dn, null, key));					
				}	
				container.add(this.sbUnitTypes);
				
				this.btnRevCalc = new qx.ui.form.Button(locale == "de" ? "Zeit zu Prozentsatz" : "Hız");
				this.btnRevCalc.setWidth(120);
				container.add(this.btnRevCalc);
				this.btnRevCalc.addListener("click", this.timeToSpeedCalculate, this);					

				var container = new qx.ui.groupbox.GroupBox();
				container.setLayout(new qx.ui.layout.Flow(5, 5));
				box.add(container);
				
				this.btnClear = new qx.ui.form.Button(tr("clear"));
				this.btnClear.setWidth(120);
				container.add(this.btnClear);
				this.btnClear.addListener("click", this.clearAll, this);

				return box;
			}, 
			timeToSpeedCalculate: function() {
				var reqUnitId = this.sbUnitTypes.getSelection()[0].getModel();					
				var s = prompt(locale == "de" ? "Bitte gebe die Rekrutierzeit in Sekunden an." : "Lütfen gidilecek süreyi giriniz:");
				if (s != null && s != "") {
					var unitEvery = parseInt(s, 10);
					if (unitEvery <= 0) {
						bos.Utils.handleWarning("Geçersiz değer");
						return;
					}
					
					for (var i = 0; i < this.config.length; i++) {
						var c = this.config[i];
						var inputs = c.result;
						
						for (var j = 0; j < c.units.length; j++) {
							var unitId = c.units[j];
							if (reqUnitId == unitId) {
								
								var speed = Math.round((c.times[j] * 100) / (unitEvery + 0.4999999)) + 1;
								inputs.speed.setValue(speed)
								
								i = this.config.length;
								break;
							}
						}
					
					}						
					
					this.calculate();
				}
			}, 
			calculate: function() {

				var res = webfrontend.res.Main.getInstance();
				
				for (var i = 0; i < this.config.length; i++) {
					var c = this.config[i];
					var inputs = c.result;
					var speed = parseInt(inputs.speed.getValue());
					
					for (var j = 0; j < c.units.length; j++) {
						var unitId = c.units[j];
						var label = inputs.units[j];
						var unitEvery = Math.max(1, Math.round((c.times[j] * 100) / speed));
						label.setValue(res.units[unitId].dn + ": " + unitEvery + "s");
						label.setToolTipText(webfrontend.Util.getTimespanString(unitEvery));
					}
				
				}
			}
		}
});


qx.Class.define("bos.gui.CombatCalculatorWidget", {
	type: "singleton",
	extend: webfrontend.gui.OverlayWidget,
	construct: function() {
		webfrontend.gui.OverlayWidget.call(this);

		this.clientArea.setLayout(new qx.ui.layout.Canvas());
		this.setWidth(790);
		
		this.setTitle(locale == "de" ? "Kampf Kalkulator" : "Savaş Hesaplama");
		var res = webfrontend.res.Main.getInstance();
		var scroll = new qx.ui.container.Scroll();
		this.clientArea.add(scroll, {
			left: 0,
			top: 2,
			right: 0,
			bottom: 2
		});

		var box = new qx.ui.container.Composite(new qx.ui.layout.Grid(5, 20));
		scroll.add(box);

		this.attUnitContainer = new qx.ui.groupbox.GroupBox();
		this.attUnitContainer.setLegend(locale == "de" ? "Angreifer" : "Saldırı");
		this.attUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.attUnitContainer, {row: 0, column: 0});

		this.defUnitContainer = new qx.ui.groupbox.GroupBox();
		this.defUnitContainer.setLegend(locale == "de" ? "Verteidiger" : "Defans");
		this.defUnitContainer.setLayout(new qx.ui.layout.Basic());
		box.add(this.defUnitContainer, {row: 0, column: 1});

		this.defUnits = new Object();
		this.attUnits = new Object();

		var lblAttScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Puan");
		this.attUnitContainer.add(lblAttScore, {
			left: 0,
			top: 6
		});
		this.attScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.attUnitContainer.add(this.attScore, {
			left: 40,
			top: 6
		});

		var lblDefScore = new qx.ui.basic.Label(locale == "de" ? "Punkte" : "Puan");
		this.defUnitContainer.add(lblDefScore, {
			left: 0,
			top: 6
		});
		this.defScore = new qx.ui.form.TextField(webfrontend.data.Player.getInstance().getPoints().toString());
		this.defUnitContainer.add(this.defScore, {
			left: 40,
			top: 6
		});

		var cT = 0;
		for (var key in res.units) {
			var cY = res.units[key];
			if (cY.x < 0 || cY.y < 0) continue;
			this.defUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.defUnitContainer);
			this.attUnits[key] = this.createUnitSlot(cY.x * 560, cY.y * 31 + 31, cY, this.attUnitContainer);
			if (key == "1") {
				this.attUnits[key].count.setEditable(false);
			}
			if (cY.y > cT) cT = cY.y;
		}
		this.defUnitContainer.setMinHeight((cT + 1) * 31);
		this.attUnitContainer.setMinHeight((cT + 1) * 31);		

		box.add(this.createDefences(), {row: 0, column: 2});
		
		var rightColumn = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
		box.add(rightColumn, {row: 0, column: 3});
		
		rightColumn.add(this.createSummary());
		rightColumn.add(this.createFooter());		
/*
		this.clientArea.add(this.createFooter(), {
			bottom: 0,
			left: 0,
			right: 250
		});
*/

/*
		this.clientArea.add(this.createSummary(), {
			bottom: 0,
			left: 450,
			right: 0
		});
		*/

	}, 
	members: {
		defUnits: null,
		defUnitContainer: null,
		attUnits: null,
		attUnitContainer: null,
		defences: null,
		summary: null,
		sbAdd: null,
		hourInput: null,
		minuteInput: null,
		addDefendersFromReport: false,
		btnSubstractLosses: null,
		sbCombatType: null,
		btnClearAll: null,
		btnCalc: null,
		activateOverlay: function(activated) {
			//nothing to do
		}, 
		createFooter: function() {
			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Eylemler");
			//container.setHeight(120);
			container.setLayout(new qx.ui.layout.VBox(5));
			
			var typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);			
			
			this.hourInput = new webfrontend.gui.SpinnerInt(0, 0, 23);
			this.hourInput.setValue(10);
			this.hourInput.setWidth(40);
			typeContainer.add(this.hourInput);

			var separatorLabel = new qx.ui.basic.Label(":");
			typeContainer.add(separatorLabel);

			this.minuteInput = new webfrontend.gui.SpinnerInt(0, 0, 59);
			this.minuteInput.setValue(0);
			this.minuteInput.setWidth(40);
			typeContainer.add(this.minuteInput);

			this.sbCombatType = new qx.ui.form.SelectBox().set({
				width: 100,
				height: 28
			});
			if (locale == "de") {
				this.sbCombatType.add(new qx.ui.form.ListItem("Überfall", null, "Saldırı"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Belagerung", null, "Kuaştma"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plünderung", null, "Yağma"));
			} else {
				this.sbCombatType.add(new qx.ui.form.ListItem("Assault", null, "Saldırı"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Siege", null, "Kuşatma"));
				this.sbCombatType.add(new qx.ui.form.ListItem("Plunder", null, "Yağma"));
			}

			container.add(this.sbCombatType, {
				row: 1,
				column: 0
			});

			this.btnCalc = new qx.ui.form.Button("Hesap");
			this.btnCalc.setWidth(50);
			container.add(this.btnCalc);
			this.btnCalc.addListener("click", this.calculateLosses, this);
			
			this.btnClearAll = new qx.ui.form.Button(locale == "de" ? "Alles Löschen" : "Tümünü temizle");
			this.btnClearAll.setWidth(90);
			container.add(this.btnClearAll);
			this.btnClearAll.addListener("click", this.clearAll, this);
			
			this.btnSubstractLosses = new qx.ui.form.Button(locale == "de" ? "Substract losses" : "Kayıpları çıkar");
			this.btnSubstractLosses.setWidth(90);
			container.add(this.btnSubstractLosses);
			this.btnSubstractLosses.addListener("click", this.substractLosses, this);			
			
			typeContainer = new qx.ui.container.Composite(new qx.ui.layout.Flow(5, 5));
			container.add(typeContainer);
			this.sbAdd = new qx.ui.form.SelectBox().set({
				width: 160,
				height: 28
			});
			if (locale == "de") {
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger & Verteidigung", null, "Savunucular&Defanscı"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidiger", null, "Savunucular"));
				this.sbAdd.add(new qx.ui.form.ListItem("Verteidigung", null, "Savunucular"));
				this.sbAdd.add(new qx.ui.form.ListItem("Angreifer", null, "Saldırganlar"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Alle", null, "İzci raporu: Tümü"));
				this.sbAdd.add(new qx.ui.form.ListItem("Spionage Report: Verteidigung", null, "İzci raporu: Defanscı"));
			} else {
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders & Defences", null, "Savunucular&Defanscı"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defenders", null, "Savunucular"));
				this.sbAdd.add(new qx.ui.form.ListItem("Defences", null, "Savunucular"));
				this.sbAdd.add(new qx.ui.form.ListItem("Attackers", null, "Saldırganlar"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: All", null, "İzci raporu: Tümü"));
				this.sbAdd.add(new qx.ui.form.ListItem("Scout Report: Defences", null, "İzci raporu: Defanscı"));
			}

			typeContainer.add(this.sbAdd);

			this.btnAdd = new qx.ui.form.Button(locale == "de" ? "Hinzufügen" : "Ekle");
			this.btnAdd.setWidth(50);
			typeContainer.add(this.btnAdd);
			this.btnAdd.addListener("execute", this.onAdd, this);

			return container;
		}, 
		onAdd: function() {
			var add = this.sbAdd.getSelection()[0].getModel();
			if (add == "Saldırganlar") {
				this.addAttackers();
			} else if (add == "Defanscı") {
				this.addDefences();
			} else if (add == "Savunucular") {
				this.addDefenders();
			} else if (add == "Savunucular & Defanscı") {
				this.addDefences();
				this.addDefenders();
			} else if (add == "İzci raporu: Tümü") {
				this.addReport(true);
			} else if (add == "İzci raporu: Defanscı") {
				this.addReport(false);
			}

		}, 
		calculateLosses: function() {
			var attStrength = this.calculateAttackStrength(this.attUnits, this.defences);
			var defStrength = this.calculateDefenceStrength(this.defUnits, this.defences);

			//dumpObject(attStrength);
			//dumpObject(defStrength);

			var str;

			var attackerForcesTypes = 0;
			var totalAttackerStrength = 0;
			var totalDefenderStrength = 0;

			str = 0;
			if (attStrength[1] != null) {
				str = attStrength[1].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[1].setValue(str);

			str = 0;
			if (attStrength[2] != null) {
				str = attStrength[2].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[2].setValue(str);

			str = 0;
			if (attStrength[3] != null) {
				str = attStrength[3].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[3].setValue(str);

			str = 0;
			if (attStrength[4] != null) {
				str = attStrength[4].strength;
				if (str > 0) {
					attackerForcesTypes++;
					totalAttackerStrength += str;
				}
			}
			this.summary.att[4].setValue(str);

			str = 0;
			if (defStrength[1] != null) {
				str = defStrength[1].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[1].setValue(str);

			str = 0;
			if (defStrength[2] != null) {
				str = defStrength[2].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[2].setValue(str);

			str = 0;
			if (defStrength[3] != null) {
				str = defStrength[3].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[3].setValue(str);

			str = 0;
			if (defStrength[4] != null) {
				str = defStrength[4].strength;
				totalDefenderStrength += str;
			}
			this.summary.def[4].setValue(str);

			this.clearLosses(this.defUnits);
			this.clearLosses(this.attUnits);

			
			//Mixed attacks are resolved as single type attacks where defensing forces are divided as proportions of attack strength. 
			//Example attacker: 100 zerks and 100 mages. Total attack is 12000. 
			//Defender is divided 41,7% (50*100/12000) against zerks and 58,3% (70*100/12000) against mages.
			var totalDefenderStrength = 0;
			for (var i = 1; i <= 4; i++) {
				
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					
					var def = defStrength[i].strength * attackPart;
					//alert(def + " = " + defStrength[i].strength + " * " + attackPart);
					totalDefenderStrength += def;
				}
			}
			
			//alert("totalAttackerStrength: " + totalAttackerStrength);
			//alert("totalDefenderStrength: " + totalDefenderStrength);
			
			for (var i = 1; i <= 4; i++) {
				if (attStrength[i] != null && attStrength[i].strength > 0 && defStrength[i] != null) {
					var attackPart = attStrength[i].strength / totalAttackerStrength;
					var defAgainstThatGroup = defStrength[i].strength * attackPart;
					var attackerLosses = (defAgainstThatGroup / totalAttackerStrength) * this.getAttackerMultiplier();
					
					this.applyAttackerLosses(i, attackerLosses);
				}
			}
			
			if (totalDefenderStrength > 0) {
				var defenderLosses = (totalAttackerStrength / totalDefenderStrength) * this.getDefenderMultiplier();
				this.applyDefenderLosses(0, defenderLosses);
			}


		}, 
		clearLosses: function(units) {

			for (var key in units) {
				var inputs = units[key];
				inputs.losses.setValue("");
			}

		}, 
		getAttackerMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Saldırı") {
				return 0.5;
			} else if (mode == "Kuşatma") {
				return 0.1;
			} else if (mode == "Yağma") {
				return 0.1;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, 
		getDefenderMultiplier: function() {
			var mode = this.sbCombatType.getSelection()[0].getModel();
			if (mode == "Saldırı") {
				return 0.5;
			} else if (mode == "Kuşatma") {
				return 0.1;
			} else if (mode == "Yağma") {
				return 0.02;
			} else {
				bos.Utils.handleError("Unknown mode=" + mode);
			}
		}, 
		substractLosses: function() {
			this._substractLossesImpl(this.attUnits);
			this._substractLossesImpl(this.defUnits);

			var hour = parseInt(this.hourInput.getValue());
			hour++;
			if (hour >= 24) {
				hour = 0;
			}
			this.hourInput.setValue(hour);
		}, 
		_substractLossesImpl: function(units) {
			for (var key in units) {				
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());				

				var s = inputs.losses.getValue();
				if (s != null && s != "") {
					inputs.losses.setValue("");
					var lost = parseInt(s);
					if (qx.lang.Type.isNumber(lost) && !isNaN(lost)) {
						count = Math.max(0, count - lost);
						inputs.count.setValue(count);
					}
				}
			}
		}, 
		applyAttackerLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.attUnits) {
				var unit = res.units[key];
				var inputs = this.attUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0 || attackType != type) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);

			}

		}, 
		applyDefenderLosses: function(type, losses) {
			var res = webfrontend.res.Main.getInstance();
			for (var key in this.defUnits) {
				var unit = res.units[key];
				var inputs = this.defUnits[key];
				var count = parseInt(inputs.count.getValue());
				var attackType = getUnitAttackType(key);
				if (count <= 0) {
					continue;
				}

				var lost = Math.min(count, Math.round(count * losses));
				inputs.losses.setValue(lost);
			}
		}, 
		calculateAttackStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];
			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				if (result[attackType] == null) {
					result[attackType] = {count: 0, strength: 0, neutralized: 0};
				}
				result[attackType].count += count;
			}

			for (var key in units) {
				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var attackType = getUnitAttackType(key);
				var r = result[attackType];
				var trapId = this.getTrapAgainst(attackType);

				var maxNeutralized = 0;
				if (defences[trapId] != null) {
					maxNeutralized = parseInt(defences[trapId].count.getValue());
				}

				maxNeutralized -= r.neutralized;

				if (maxNeutralized > 0) {
					maxNeutralized = Math.min(maxNeutralized, parseInt(r.count / 2) - r.neutralized);
					if (count <= maxNeutralized) {
						r.neutralized += count;
						count = 0;
					} else {
						r.neutralized += maxNeutralized;
						count -= maxNeutralized;
					}
				}

				var attack = unit.av * count;
				r.strength += attack;
			}

			var hour = parseInt(this.hourInput.getValue(), 10);
			var minute = parseInt(this.minuteInput.getValue(), 10);
			var attackReduction = this.calculateAttackReduction(hour, minute);
			this.summary.attackReduction.setValue(attackReduction + "%");

			if (attackReduction != 0) {
				for (var attackType in result) {
					var attack = result[attackType];
					attack.strength = Math.round(attack.strength * (1 + attackReduction / 100.0));
				}
			}
			return result;
		}, 
		calculateDefenceStrength: function(units, defences) {
			var res = webfrontend.res.Main.getInstance();
			var result = [];

			var totalBoosted = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "8": 0};

			for (var key in units) {
				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}
					result[u].count += count;
					//var defValue = unit.def[u];
					//result[u].strength += defValue * count;
				}
			}

			var cityWallsLevel = parseInt(defences[23].count.getValue());

			for (var key in units) {

				if (key == "1")
				continue;

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = 0;
				var towerId = this.getTowerFor(key);

				if (towerId >= 0) {
					var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];
					if (maxBoosted >= count) {
						boosted = count;
						count = 0;
					} else {
						boosted = maxBoosted;
						count -= boosted;
					}

					totalBoosted[key] += boosted;
				}

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}
			}

			//dumpObject(totalBoosted);

			for (var key in units) {

				if (key != "1")
				continue;

				var unit = res.units[key];

				var boostableGuards = 0;
				for (var b in totalBoosted) {

					var towerId = this.getTowerFor(b);
					if (towerId > 0) {
						var maxBoosted = parseInt(defences[towerId].count.getValue()) - totalBoosted[key];

						var guardsPerUnit = this.getAffectedGuardsPerUnit(towerId);

						boostableGuards += guardsPerUnit * maxBoosted;
					}
				}

				var unit = res.units[key];
				var inputs = units[key];
				var count = parseInt(inputs.count.getValue());

				var boosted = Math.min(boostableGuards, count);
				count -= boosted;

				for (var u in unit.def) {
					if (result[u] == null) {
						result[u] = {count: 0, strength: 0};
					}

					var defValue = unit.def[u];

					var unitsDef = defValue * count + 2 * defValue * boosted;
					if (!this.isNavalUnit(key)) {
						//walls bonus not for naval units
						var bonus = this.getCityWallsBonus(cityWallsLevel);
						unitsDef = parseInt(unitsDef * (1 + bonus));
					}

					result[u].strength += unitsDef;
				}

			}

			var moraleBoost = this.calculateMoraleBoost();
			if (moraleBoost > 0) {
				var factor = (1 + moraleBoost / 100.0);
				for (var u in result) {
					result[u].strength = parseInt(result[u].strength * factor);
				}
			}

			this.summary.moraleBonus.setValue("+" + moraleBoost.toString() + "%");

			return result;
		}, 
		calculateAttackReduction: function(hour, minute) {
			/* some test data:
				22:00:01 -0
				22:10:00 -3
				22:20:00 -7
				22:26:35 -9%
				22:27:53 -9%
				22:30    -10
				22:40    -13
				22:50    -17
				23:00    -20
				23:10    -23
				23:20:27 -27%
				23:26:35 -29
				23:27:53 -29
				23:30    -30
				23:40    -33
				23:50    -37
				00:26:35 -40
				07:27:52 -40
				08:26:35 -31
				09:26:35 -11
				*/
			if (hour >= 10 && hour <= 21) {
				return 0;
			}
			if (hour >= 0 && hour <= 7) {
				return -40;
			}
			var m = hour * 60 + minute;
			if (hour >= 22) {
				var result = (-1.0/3.0) * m + 440;
				return Math.round(result);
			}
			if (hour >= 8) {
				var result = (1.0/3.0) * m - 200;
				return Math.round(result);
			}
			bos.Utils.handleError("It shouldn't happend " + hour + ":" + minute);
			return 0;
		}, 
		calculateMoraleBoost: function() {
			var a = parseInt(this.attScore.getValue());
			var d = parseInt(this.defScore.getValue());

			if (a == 0 || d == 0) {
				return 0;
			}

			var factor = a / d;
			if (factor <= 4) {
				return 0;
			}

			if (factor >= 40) {
				return 300;
			}

			if (factor < 10) {
				var y = (100 / 6) * factor - 200 / 3;
				return parseInt(y);
			}

			var y = 10 * factor;
			return parseInt(y);

		}, 
		getCityWallsBonus: function(level) {
			var bonusses = [0, 0.01, 0.03, 0.06, 0.1, 0.15, 0.2, 0.26, 0.33, 0.41, 0.5];
			if (bonusses[level] != null) {
				return bonusses[level];
			} else {
				return 0;
			}
		}, 
		isNavalUnit: function(unitType) {
			var t = parseInt(unitType);
			if (t >= 15 && t <= 17) {
				return true;
			} else {
				return false;
			}
		}, 
		addReport: function(addDefenders) {

			var rep = a.title.report;
			if (rep == null) {
				if (locale == "de"){
					bos.Utils.handleWarning("Der Reportframe ist nicht geöffnet, bitte klicke auf den Report-Button");
				} else {
					bos.Utils.handleWarning("Raporları Widget bulamıyor. Raporlar düğmesine tıklayınız");
				}
				return;
			}

			var rep = a.title.report;
			var ids = rep.headerData.getSelectedIds();

			if (ids.length == 0 || (ids.length == 1 && ids[0] == 0) || ids.length != 1) {
				if (locale == "de"){
					bos.Utils.handleWarning("Bitte markiere einen Spionage Report");
				} else {
					bos.Utils.handleWarning("Lütfen bir gözcü raporu seçin");
				}

				return;
			}

			this.addDefendersFromReport = addDefenders;
			var counter = 1;
			for (key in ids) {
				var id = ids[key];
				bos.net.CommandManager.getInstance().sendCommand("GetReport", {
					id: id
				}, this, this.parseReport, counter);
				counter++;
			}

		}, 
		parseReport: function(r, data, eh) {

			if (r == false || data == null) return;

			this.clear(this.defences);

			if (this.addDefendersFromReport) {
				this.clear(this.defUnits);
			}

			if (data.a != null && data.a.length > 0 && this.addDefendersFromReport) {

				var totalDef = new Array();

				for (var i = 0; i < data.a.length; i++) {
					var def = data.a[i];
					if (def.r == bos.Const.ORDER_ATTACK) {
						continue;
					}

					for (var key in def.u) {

						var unit = def.u[key];
						if (totalDef[unit.t] == undefined) {
							totalDef[unit.t] = {o: 0, l: 0, t: unit.t};
						}

						totalDef[unit.t].o += unit.o;
						totalDef[unit.t].l += unit.l;
					}

				}

				for (var i = 1; i <= 19; i++) {
					if (i == 18) continue;
					var inputs = this.defUnits[i];

					if (totalDef[i] != null) {
						var unit = totalDef[i];
						inputs.count.setValue(unit.l);
					}
				}

			}

			if (data.s != null && data.s.length > 0) {
				for (var i = 0; i < data.s.length; i++) {
					var building = data.s[i];

					var bt = parseInt(building.t);
					if (this.defences[bt] != null) {
						//dumpObject(building);
						if (bt == 23) {
							//walls
							this.defences[bt].count.setValue(building.l);
						} else {
							//tower
							var count = parseInt(this.defences[bt].count.getValue());


							var affected = this._getAffectedTroops(bt, parseInt(building.l));

							this.defences[bt].count.setValue(count + parseInt(building.a) * affected.affected);
						}
					}
				}
			}

		}, 
		clearAll: function() {
			this.clear(this.defences);
			this.clear(this.defUnits);
			this.clear(this.attUnits);
		}, 
		clear: function(list) {
			for (var key in list) {
				var inputs = list[key];
				inputs.count.setValue(0);
				if (inputs.losses) {
					inputs.losses.setValue("");
				}
			}

		}, 
		addDefenders: function() {
			var server = bos.Server.getInstance();
			var city = webfrontend.data.City.getInstance();
			for (var i = 1; i <= 19; i++) {
				if (i == 18) continue;
				var inputs = this.defUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.count);
			}

			if (city.getSupportOrders() != null) {
				for (var i = 0; i < city.getSupportOrders().length; i++) {
					var order = city.getSupportOrders()[i];
					if (order.state = 4 && order.units != null) {
						for (var u = 0; u < order.units.length; u++) {
							var unit = order.units[u];
							var inputs = this.defUnits[unit.type];
							var current = parseInt(inputs.count.getValue());
							inputs.count.setValue(current + unit.count);
						}
					}
				}
			}
		}, 
		addAttackers: function() {
			var server = bos.Server.getInstance();
			var city = webfrontend.data.City.getInstance();
			for (var i = 2; i <= 19; i++) {
				if (i == 18) continue;
				//var unitKey = "unit_" + i;
				var inputs = this.attUnits[i];

				var unit = server.cities[city.getId()].getUnitTypeInfo(i);
				inputs.count.setValue(unit.total);
				inputs.losses.setValue("");
			}

		}, 
		addDefences: function() {
			var city = webfrontend.data.City.getInstance();
			var buildings = a.visMain.getBuildings();

			for (var key in this.defences) {
				this.defences[key].count.setValue(0);
			}

			var affectedTroops = {};

			if (buildings.length == 0) {
				if (locale == "de"){
					bos.Utils.handleWarning("Du musst in der Stadt sein um die Verteidigung und die Verteidiger zu erhalten!");
				} else {
					bos.Utils.handleWarning("Savunma almak için şehirde olması gerekir!");
				}
			}

			for (var i = 0; i < buildings.length; i++) {
				var b = buildings[i];
				var bType = parseInt(b.getType());

				if ((bType >= 38 && bType <= 46)) {
					var count = parseInt(this.defences[bType].count.getValue());

					var affected = this.getAffectedTroops(b);

					this.defences[bType].count.setValue(count + affected.affected);
				}

			}

			this.defences[23].count.setValue(city.getWallLevel());

		}, 
		getTowerFor: function(unitType) {
			var t = parseInt(unitType);
			if (t == 2) {
				return 39;
			} else if (t == 3) {
				return 41;
			} else if (t == 4) {
				return 40;
			} else if (t == 5) {
				return 42;
			} else if (t == 8) {
				return 38;
			}
			return -1;
		}, 
		_getAffectedTroops: function(type, level) {
			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap
			var stats = [];
			//0 index = guards multiplier
			stats[38] = [2, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[39] = [10, 4, 8, 15, 25, 40, 60, 88, 125, 175, 250];
			stats[40] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[41] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[42] = [1, 30, 60, 120, 200, 320, 480, 700, 1000, 1400, 2000];
			stats[43] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[44] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[45] = [0, 16, 26, 50, 100, 150, 240, 350, 500, 700, 1000];
			stats[46] = [0, 20, 30, 50, 100, 160, 240, 350, 500, 700, 1000]

			var result = {affected: 0, guards: 0};

			var bType = parseInt(type);

			if (stats[bType] != null) {
				result.affected = stats[bType][level];
				result.guards = result.affected * stats[bType][0];
			}

			return result;

		}, 
		getAffectedTroops: function(b) {
			return this._getAffectedTroops(b.getType(), b.getLevel());
		}, 
		getAffectedGuardsPerUnit: function(towerId) {
			var id = parseInt(towerId);
			switch (id) {
			case 38: return 2;
			case 39: return 10;
			case 40: return 1;
			case 41: return 1;
			case 42: return 1;
			default:
				return 0;
			}
		}, 
		getTrapAgainst: function(attackType) {
			if (attackType == 1) {
				return 43;
			} else if (attackType == 2) {
				return 44;
			} else if (attackType == 3) {
				return 45;
			} else if (attackType == 4) {
				return 46;
			} else {
				bos.Utils.handleError("Unknown attackType: " + attackType);
				return 0;
			}
		}, 
		createSummary: function() {

			var container = new qx.ui.groupbox.GroupBox();
			container.setLegend("Özet");
			container.setLayout(new qx.ui.layout.Grid(5, 5));

			this.summary = {att: [], def: [], attackReduction: 0, moraleBonus: 0};
			var label;

			var att = new qx.ui.basic.Label(tr("attacker"));
			container.add(att, {
				row: 0,
				column: 1
			});

			var def = new qx.ui.basic.Label(tr("defender"));
			container.add(def, {
				row: 0,
				column: 2
			});

			var inf = new qx.ui.basic.Label("Inf.");
			container.add(inf, {
				row: 1,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 1
			});
			this.summary.att[1] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 1,
				column: 2
			});
			this.summary.def[1] = label;

			var cav = new qx.ui.basic.Label(locale == "de" ? "Kavallerie" : "Cavalry");
			container.add(cav, {
				row: 2,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 1
			});
			this.summary.att[2] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 2,
				column: 2
			});
			this.summary.def[2] = label;

			var mag = new qx.ui.basic.Label(locale == "de" ? "Magie" : "Magic");
			container.add(mag, {
				row: 3,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 1
			});
			this.summary.att[4] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 3,
				column: 2
			});
			this.summary.def[4] = label;

			var siege = new qx.ui.basic.Label(locale == "de" ? "Artilery" : "Siege");
			container.add(siege, {
				row: 4,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 1
			});
			this.summary.att[3] = label;

			label = new qx.ui.basic.Label("0");
			container.add(label, {
				row: 4,
				column: 2
			});
			this.summary.def[3] = label;

			var siege = new qx.ui.basic.Label("Modifier");
			container.add(siege, {
				row: 5,
				column: 0
			});

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Angriffsverringerung  durch den Nachtschutz" : "Night protection attack reduction");
			container.add(label, {
				row: 5,
				column: 1
			});
			this.summary.attackReduction = label;

			label = new qx.ui.basic.Label("0");
			label.setToolTipText(locale == "de" ? "Maloral Bonus" : "Morale bonus");
			container.add(label, {
				row: 5,
				column: 2
			});
			this.summary.moraleBonus = label;

			return container;
		}, 
		createDefences: function() {
			var walls = new qx.ui.groupbox.GroupBox();
			walls.setLegend(locale == "de" ? "Verteidigung (des Verteidigers)" : "Defanscı (etkilenen)");
			walls.setLayout(new qx.ui.layout.Basic());

			this.defences = new Object();

			var x = 0;
			var y = 0;
			var margin = 36;

			var res = webfrontend.res.Main.getInstance();

			var building = res.buildings[23];
			this.defences[23] = this.createBuildingSlot(x, y, building, walls, 10);
			y += margin;

			// 38 - lookout tower
			// 39 - ballista tower
			// 40 - guardian tower
			// 41 - ranger tower
			// 42 - templar tower
			// 43 - pitfall trap
			// 44 - barricade
			// 45 - arcane trap
			// 46 - camouflage trap

			for (var i = 38; i <= 46; i++) {
				var building = res.buildings[i];
				this.defences[i] = this.createBuildingSlot(x, y, building, walls, 48000);
				y += margin;
			}

			return walls;
		}, 
		createBuildingSlot: function(x, y, building, container, max) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (building.mimg >= 0) {
				var fi = res.getFileInfo(building.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(32);
				img.setHeight(32);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(building.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x + 8 - 4,
					top: y + 6
				});
			}
			var countInput = new webfrontend.gui.SpinnerInt(0, 0, max);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 50 - 4,
				top: y + 10
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var result = {
				image: img,
				count: countInput
			};
			//countInput.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);

			return result;
		}, 
		createUnitSlot: function(x, y, unit, container) {
			var res = webfrontend.res.Main.getInstance();
			var img = null;
			if (unit.mimg >= 0) {
				var fi = res.getFileInfo(unit.mimg);
				img = new qx.ui.basic.Image(webfrontend.config.Config.getInstance().getUIImagePath(fi.url));
				img.setWidth(22);
				img.setHeight(22);
				img.setScale(true);

				var tt = new qx.ui.tooltip.ToolTip(unit.dn);
				img.setToolTip(tt);
				container.add(img, {
					left: x,
					top: y + 6
				});
			}
			var countInput = new webfrontend.gui.SpinnerInt(0, 0, 10000000);
			countInput.setWidth(70);
			//countInput.getChildControl("textfield").setLiveUpdate(true);
			container.add(countInput, {
				left: x + 40,
				top: y + 4
			});
			//XXX countInput.addListener("changeValue", this.updateResValue, this);
			a.setElementModalInput(countInput);

			var losses = new qx.ui.basic.Label("");
			container.add(losses, {
				left: x + 40 + 75,
				top: y + 4
			});

			var result = {
				'image': img,
				'count': countInput,
				'losses': losses
			};
			//cj.getChildControl("textfield").addListener("changeValue", this.spinnerTextUpdate, cq);
			//cn.addListener("click", this._onMax, cq);
			return result;
		}, 
		spinnerTextUpdate: function(e) {
			if (e.getData().length == 0) this.buildCount.setValue(0);
		}, 
		clearSelections: function() {
			for (var bG in this.units) {
				this.units[bG].buildCount.setValue(0);
			}
		}
	}
});

function jumpCoordsDialog() {
	var wdg = new webfrontend.gui.ConfirmationWidget();
		wdg.askCoords = function() {
			var bgImg = new qx.ui.basic.Image("webfrontend/ui/bgr_popup_castle_warning.gif");
			this.dialogBackground._add(bgImg, {left: 0, top: 0});

			var f20 = new qx.bom.Font(20);
			var f25 = new qx.bom.Font(25);

			var la = new qx.ui.basic.Label("Koordinatlar");
			la.setFont("font_subheadline_sidewindow");
			la.setTextColor("text-gold");
			la.setTextAlign("left");
			this.dialogBackground._add(la, {left: 17, top: 5});

			var lb = new qx.ui.basic.Label(locale == "de" ? "Gebe die Koordinaten in das Textfeld ein" : "Koordinatı metin alanına yerleştirin.");

			lb.setFont(f20);
			this.dialogBackground._add(lb, {left: 275, top: 65});

			var lc = new qx.ui.basic.Label(locale == "de" ? "Koordinaten(0-699) müssen mit einem Doppelpunkt getrennt werden! <br />Beispiel: 432:231 " : "Değerler (0-699), iki nokta üst üste ayrılmalıdır<br />Örnek: 432:231<br /> <center><b>Kerraneciler (Dünya 1)</b></center>");
			lc.setRich(true);
			lc.setTextAlign("center");
			this.dialogBackground._add(lc, {left: 305, top: 90});

			var crds = new qx.ui.form.TextField("").set({width: 120, maxLength: 7, font: f25});
					crds.setTextAlign("center");
			this.dialogBackground._add(crds, {left: 360, top: 137});

			var ok = new qx.ui.form.Button("Tamam").set({width: 120});
			ok.addListener("click", function(){
				crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				var x = parseInt(RegExp.$1, 10);
				var y = parseInt(RegExp.$2, 10);

				a.setMainView('r', 0, x * a.visMain.getTileWidth(), y * a.visMain.getTileHeight());
				wdg.disable();
			}, true);
			ok.setEnabled(false);
			this.dialogBackground._add(ok, {left: 295, top: 205});

			var c = new qx.ui.form.Button("Kapat").set({width: 120});
			c.addListener("click", function(){a.allowHotKey = true; wdg.disable();}, true);
			this.dialogBackground._add(c, {left: 445, top: 205});

			var validateCoords = function() {
				tfc = crds.getValue().match(/^(\d{1,3}):(\d{1,3})$/);
				if (tfc == null) {
						ok.setEnabled(false);
						return;
				}
				if (!/[^\d]/.test(tfc[1]) && !/[^\d]/.test(tfc[2])) {
						if (tfc[1] >= 0 && tfc[1] <= 699 && tfc[2] >= 0 && tfc[2] <= 699) {
								ok.setEnabled(true);
						} else {
								ok.setEnabled(false);
						}
				}
			}
			crds.addListener("input", validateCoords, false);
			crds.focus();
		}
	return wdg;
}

qx.Class.define("bos.ui.table.cellrenderer.Default", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.TABLE_DEFAULT_COLOR;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		
	}, 
	members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			} else if (qx.lang.Type.isNumber(id) && id < 0) {
				style["border-bottom"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});				
				
qx.Class.define("bos.ui.table.cellrenderer.HumanTime", {
	extend: bos.ui.table.cellrenderer.Default,
	construct: function(mode){
		this.base(arguments);
		this._mode = mode || 0;
	}, members: {
		_mode: 0,
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else if (value instanceof Date) {
				var diff = new Date() - value;
				cellInfo.value = human_time(Math.floor(diff / 1000));
			} else if (qx.lang.Type.isNumber(cellInfo.value)) {
				cellInfo.value = human_time(cellInfo.value);
			}
			return qx.bom.String.escape(this._formatValue(cellInfo));
		}, 
		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();
			var value = cellInfo.value;
			var color = bos.Const.TABLE_DEFAULT_COLOR;
			
			var seconds = -1;
			if (value instanceof Date) {
				var diff = new Date() - value;
				seconds = Math.floor(diff / 1000);
			} else if (qx.lang.Type.isNumber(value)) {
				seconds = (value);
			} else if (qx.lang.Type.isString(value)) {
				color = bos.Const.RESOURCE_GREEN;
			}
			
			if (seconds >= 0) {					
				if (this._mode == 1) {
					//food
					if (seconds >= 3600 * 24 * 2) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 3600 * 12) {
						color = bos.Const.RESOURCE_YELLOW;
					} else {
						color = bos.Const.RESOURCE_RED;
					}					
				} else if (this._mode == 0) {
					//build queue, unit queue
					if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_GREEN;
					} else if (seconds >= 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;						
					} else if (seconds > 0) {
						color = bos.Const.RESOURCE_YELLOW;
					} else if (seconds <= 0) {
						color = bos.Const.RESOURCE_RED;
					}
				} else if (this._mode == 2) {
					//last visited
					if (seconds >= 3600 * 24 * 3) {
						color = bos.Const.RESOURCE_RED;
					} else if (seconds >= 3600 * 24) {
						color = bos.Const.RESOURCE_YELLOW;						
					} else if (seconds > 3600 * 8) {
						color = bos.Const.TABLE_DEFAULT_COLOR;
					} else {
						color = bos.Const.RESOURCE_GREEN;
					}						
				}					
			}
			
			var border = bos.Const.TABLE_BORDER;
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				border = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}
			
			return "color: " + color + ";" + "border-top:" + border;
		}
	}
});

qx.Class.define("bos.ui.table.cellrenderer.ClickableLook", {
	extend: bos.ui.table.cellrenderer.Default,
	members: {			
		_getContentHtml: function(cellInfo) {
			var value = cellInfo.value;
			if (value === null) {
				cellInfo.value = "";
			} else {
				cellInfo.value = this.clickableLook(cellInfo.value);
			}
			return this._formatValue(cellInfo);
		}, 
		clickableLook: function(s) {
			//return "<div style=\"cursor: pointer; color: rgb(45, 83, 149);\">" + s + "</div>";
			return bos.Utils.makeClickable(s, "#81adff");
		}/*, // overridden
		_getCellClass : function(cellInfo) {
		  return "qooxdoo-table-cell";
		}*/
	}
});

qx.Class.define("bos.ui.table.cellrenderer.Resource", {
	extend : qx.ui.table.cellrenderer.Default,

	construct: function(align, color, style, weight, maxColumn, freeColumn, warningLevel, errorLevel){
		this.base(arguments);
		this.__defaultTextAlign = align || "";
		this.__defaultColor = color || bos.Const.RESOURCE_GREEN;
		this.__defaultFontStyle = style || "";
		this.__defaultFontWeight = weight || "";
		this._maxColumn = maxColumn;
		this._freeColumn = freeColumn;
		this._warningLevel = warningLevel;
		this._errorLevel = errorLevel;
	}, 
	members: {
		__defaultTextAlign : null,
		__defaultColor : null,
		__defaultFontStyle : null,
		__defaultFontWeight : null,
		_maxColumn: null,
		_freeColumn: null,
		_warningLevel: null,
		_errorLevel: null,

		_getCellStyle : function(cellInfo) {
			var tableModel = cellInfo.table.getTableModel();

			var style = {
				"text-align": this.__defaultTextAlign,
				"color": this.__defaultColor,
				"font-style": this.__defaultFontStyle,
				"font-weight": this.__defaultFontWeight,
				"border-top": bos.Const.TABLE_BORDER
			};

			var maxValue = tableModel.getValueById(this._maxColumn, cellInfo.row);
			var freeValue = tableModel.getValueById(this._freeColumn, cellInfo.row);

			if (freeValue != null && maxValue != null && maxValue > 0) {
				if (freeValue <= 0) {
					style["color"] = bos.Const.RESOURCE_RED;
				} else {
					var mod = freeValue / maxValue;
					if (mod < 0.2) {
						style["color"] = bos.Const.RESOURCE_YELLOW;
					}
				}
			}
			
			var id = tableModel.getValueById("id", cellInfo.row);
			if (id == "Total") {
				style["border-top"] = bos.Const.TABLE_SUMMARY_ROW_BORDER;
			}			

			var styleString = [];
			for(var key in style) {
				if (style[key]) {
					styleString.push(key, ":", style[key], ";");
				}
			}
			return styleString.join("");
		}
	}
});

//------------------------------------------------------------------------------------------------------------
//taken from http://userscripts.org/topics/41177
// @copyright      2009, 2010 James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
if (typeof GM_deleteValue == 'undefined') {
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}

	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
				return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
					return value == 'true';
			case 'n':
					return Number(value);
			default:
					return value;
		}
	}

	GM_log = function(message) {
		console.log(message);
	}

	GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}

				/**
sprintf() for JavaScript 0.5

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
	* Redistributions of source code must retain the above copyright
	notice, this list of conditions and the following disclaimer.
	* Redistributions in binary form must reproduce the above copyright
	notice, this list of conditions and the following disclaimer in the
	documentation and/or other materials provided with the distribution.
	* Neither the name of sprintf() for JavaScript nor the
	names of its contributors may be used to endorse or promote products
	derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL Alexandru Marasteanu BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


Changelog:
2007.04.03 - 0.1:
- initial release
2007.09.11 - 0.2:
- feature: added argument swapping
2007.09.17 - 0.3:
- bug fix: no longer throws exception on empty paramenters (Hans Pufal)
2007.10.21 - 0.4:
- unit test and patch (David Baird)
2010.05.09 - 0.5:
- bug fix: 0 is now preceeded with a + sign
- bug fix: the sign was not at the right position on padded results (Kamal Abdali)
- switched from GPL to BSD license
**/

function str_repeat(i, m) {
	for (var o = []; m > 0; o[--m] = i);
	return(o.join(""));
}

function sprintf() {
	var i = 0, a, f = arguments[i++], o = [], m, p, c, x, s = '';
	while (f) {
		if (m = /^[^\x25]+/.exec(f)) {
			o.push(m[0]);
		}
		else if (m = /^\x25{2}/.exec(f)) {
			o.push("%");
		}
		else if (m = /^\x25(?:(\d+)\$)?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(f)) {
			if (((a = arguments[m[1] || i++]) == null) || (a == undefined)) {
				throw("Too few arguments.");
			}
			if (/[^s]/.test(m[7]) && (typeof(a) != "number")) {
				throw("Expecting number but found " + typeof(a));
			}
			switch (m[7]) {
				case 'b': a = a.toString(2); break;
				case 'c': a = String.fromCharCode(a); break;
				case 'd': a = parseInt(a); break;
				case 'e': a = m[6] ? a.toExponential(m[6]) : a.toExponential(); break;
				case 'f': a = m[6] ? parseFloat(a).toFixed(m[6]) : parseFloat(a); break;
				case 'o': a = a.toString(8); break;
				case 's': a = ((a = String(a)) && m[6] ? a.substring(0, m[6]) : a); break;
				case 'u': a = Math.abs(a); break;
				case 'x': a = a.toString(16); break;
				case 'X': a = a.toString(16).toUpperCase(); break;
			}
			if (/[def]/.test(m[7])) {
				s = (a >= 0 ? (m[2] ? '+' : '') : '-');
				a = Math.abs(a);
			}
			c = m[3] ? m[3] == '0' ? '0' : m[3].charAt(1) : ' ';
			x = m[5] - String(a).length - s.length;
			p = m[5] ? str_repeat(c, x) : '';
			o.push(s + (m[4] ? a + p : p + a));
		}
		else {
			throw("Huh ?!");
		}
		f = f.substring(m[0].length);
	}
	return o.join("");
}



//---------------------- END OF INJECTED PART -----------------------------------
}
};

window.setTimeout(injectBoSScript, 15000);

function injectBoSScript() {
	GM_log("Injecting LoU BoS script");

	var script = document.createElement("script");
	script.innerHTML = "(" + main.toString() + ")();";
	script.type = "text/javascript";
	document.getElementsByTagName("head")[0].appendChild(script);		
}
		
})();
