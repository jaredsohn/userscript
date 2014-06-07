// ==UserScript==
// @name           plug.dj Türkiye Dil Dosyası
// @namespace      Plug.dj Türkiye
// @include        http://www.plug.dj/
// @include        http://plug.dj/
// @include        www.plug.dj/d
// @include        plug.dj/
// @include        socketio.plug.dj
// @include        http://socketio.plug.dj/
// @version        1.0
// ==/UserScript==

// Plug.dj Türkce Javascript Koduna Hoşgeldiniz Bir cok Yeri Türkce Yaptık Tabi Tamamen Türkce olmadı ama Bir Cok Yer Türkce Ayarlar Kısmında Tekrar inject
// Ederseniz Yani Tekrar Girerseniz Türkce olur. Cok Yakında Tamamen Türkce olucak.


var words = {
///////////////////////////////////////////////////////
"Woot!" : "Dans!",
"Meh" : "Gec",
"Grab" : "Ekle",
"this will play on your next turn" : "Bir daha Turda Calıcagınız Şarkı",
"Welcome to the plug.dj beta. Version 0.9.805" : "Plug.dj Beta Versiyon 0.9.805 Hoşgeldiniz. Türkce Calışmaları Devam ediyor. Türkiye Sorumlusu Byramklc",
"Hosted by:" : "Oda Kurucusu",
"current dj" : "Şu an ki DJ",
"Wait List Full" : "Liste Dolu",
"Join Wait List" : "Listeye Gir",
"Leave Wait List" : "Listeden Cık",
"POINTS" : "Puan",
"Avatars" : "Avatarlar",
"Fans" : "Fan",
"Dj History" : "Dj Gecmişi",
"Your Playlists" : "Şarkı Listen",
"Import" : "ekle",
"Create" : "Oluştur",
"Communities" : "Odalar",
"Settings" : "Ayarlar",
"Support" : "Destek",
"About" : "Hakkında",
"Blog" : "Blog",
"API" : "Kodlar",
"Terms" : "Terms",
"Privacy" : "Gizlilik",
"Logout" : "Çıkış",
"Performance" : "Performans",
"Dancing Avatarlar (High CPU)" : "Avatarlar Dans Etsin",
"Avatar Rollovers (Medium CPU)" : "Avatar Haraketleri",
"Background Animation (Low CPU)" : "Arkaplan Animasyon",
"Cap Avatarlar (Low to High CPU)" : "Ekranda Avatar Sayısı",
"Behavior" : "Davranışlar",
"Auto Join Wait List" : "Otomatik Listeye Gir",
"Video/Audio Enabled" : "Video/Ses Ac",
"Show Tooltips" : "İpucuları Göster",
"Notifications" : "Bildirimler",
"Dj Announcements" : "Dj Durumları",
"Dj Score After Play" : "Biten Dj Skoru",
"Fan/Friend Join" : "Fan/Arkadaş Girince",
"Share Video" : "Video Paylaş",
"Invite Friends" : "Davet Et",
"Chat" : "Sohbet",
"DJ Wait List" : "DJ Bekleme Listesi",
"Quit Djing" : "DJ Cık",
"decided to skip." : "Kendisi Gecti",
///////////////////////////////////////////////////////
"":""};
///////////////////////////////////////////////////////
String.prototype.prepareRegex = function() {
	return this.replace(/([\[\]\^\&\$\.\(\)\?\/\\\+\{\}\|])/g, "\\$1");
};
function isOkTag(tag) {
	return (new RegExp("(," + tag + ",) | (," + tag + "$)", "g").test(",pre,blockquote,code,input,button,textarea")) == false;
}
var regexs=new Array(),
	replacements=new Array();
for(var word in words) {
	if(word != "") {
		regexs.push(new RegExp(word.prepareRegex().replace(/(\\)?\*/g, function(e) {return ((e !== "\\*") ? "[^ ]*" : "*");}), "gi"));
		replacements.push(words[word]);
	}
}
var texts = document.evaluate(".//text()[normalize-space(.)!='']",document.body,null,6,null), text="", len=regexs.length;
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName) && (text=this_text.textContent)) {
		for(var x=0; x<len; x++) text = this_text.textContent = text.replace(regexs[x], replacements[x]);
	}
}
var path   = "css";
var style   = document.createElement( 'link' );
style.rel   = 'stylesheet';
style.type  = 'text/css';
style.href  = 'http://takimoyuncu.net/plug.css';
document.getElementsByTagName( 'head' )[0].appendChild( style );
///////////////////////////////////////////////////////
function BassPlugLite(){
bpl = {
    autowoot: true,
    clicks: 0,
    version: 3.03,
    close: function(){ API.off(API.DJ_ADVANCE, bpl.djAdvance); API.off(API.CHAT, bpl.chat); $('#woot').unbind('click', bpl.doubleClick); },
    djAdvance: function() { if (bpl.autowoot) { setTimeout(function(){ $("#woot").click() }, 2000); }},
    chat: function(data) { if (data.message == '!whosrunning' && data.fromID == "50aeb07e96fba52c3ca04ca8") API.sendChat('@' + data.from + ' I am running BassPlugLite V. ' + bpl.version)},
    doubleClick: function() { bpl.clicks++; if (bpl.clicks == 2) { bpl.autowoot = !bpl.autowoot; bpl.clicks = 0; require('app/base/Context').trigger('notify', 'icon-woot', bpl.autowoot ? 'AutoWoot is now on' : 'AutoWoot is now off'); } setTimeout(function() { bpl.clicks = 0 }, 600)}
    }
    
    API.on(API.DJ_ADVANCE, bpl.djAdvance, this);
    API.on(API.CHAT, bpl.chat, this); 
    $("#woot").bind('click', bpl.doubleClick); 
        
    API.chatLog("Plug.dj Türkce V. "+bpl.version);
    $('#woot').click();
}

if(typeof bpl !== "undefined") bpl.close();

BassPlugLite();
///////////////////////////////////////////////////////