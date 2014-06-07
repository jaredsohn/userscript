// ==UserScript==
// @name           My Anime List Türkçe
// @namespace      http://userscripts.org/users/DonkanShinigami
// @description    Türkçe My Anime List
// @include        http://www.myanimelist.net/*
// @include        http://myanimelist.net/*
// ==/UserScript==

function pagehref(a)
{
var pageloc = window.location;
var match = a.exec(pageloc);
if (match != null) {
    return true;
} else {
    return false;
}
}

var translations ={
	// menu elements
	"Reviews":		"İncelemeler",
	"Community":	"Topluluk",
	"Recommendations": "Öneriler",
	"Top Anime":	"En İyiler",
	"Fansub Groups":"Fansub Grupları",
	"Top Manga":	"En İyiler",
	"Join":			"Kaydol",
	"Login":		"Giriş",
	"People":		"Kişiler",
	"Characters":	"Karakterler",
	"News":			"Haberler",
	"Top Favorites":"En Favoriler",
	"Search":	"Ara...",
	"Clubs":	"Kulüpler",
	"Users":	"Üyeler",	
	"Welcome to MyAnimeList.net!": "MyAnimeList.net'e Hoşgeldiniz!",
	"Profile":	"Profil ",
	"Friends": "Arkadaşlar",
	"Edit":	"Düzenle",
	"Logout": "Çıkış",
	"Welcome,": "Hoşgeldin, ",
	"View List": "Liste",
	"Messages": "Mesajlar",
	"Blogs": "Bloglar",
	
	"edit": "düzenle",
	
	//error
	"Error: You must first login to see this page.": "Hata: Bu sayfayı görmek için giriş yapmak zorundasınız.",
	

	
	//profile settings
	"Edit My Profile": "Profilimi Düzenle",
	"Personal": "Kişisel",
	"Forum Settings": "Forum Ayarları",
	"My Favorites": "Favorilerim",
	"My Signature": "İmza",
	"Options and Colors": "Seçenekler ve Renkler",
	"Image Type": "Resim Türü",
	"Update Settings": "Ayarları Güncelle",

	//login form
	"Login to MyAnimeList": "MyAnimeList'e Giriş",
	"Username:":		"Kullanıcı adı:",
	"Password:":		"Şifre:",
	"Stay logged in?":	"Beni hatırla",
	"Register":			"Üye Ol",
	"Always stay logged in?": "Beni hatırla",
	"Forget Your Password?": "Parolamı Unuttum?",
	

	

	
}

if(pagehref(/panel.php/))
{ 
var pagetrans ={
			//panel
	"Panel Settings": "Panel Ayarları",
	"My Statistics": "İstatistiklerim",
	"My friends":	"Arkadaşlarım",
	"Add Anime & Manga": "Anime & Manga Ekle",
	"My Manga List": "Manga Listem",
	"My Anime List": "Anime Listem",
	"MyAnimeList Announcements": "MyAnimeList Duyuruları",
	"Announcements":	"Duyurular",
	"Picture": "Resim",
	"Current Picture": "Varolan Resim",
	"Upload a Picture": "Resim Yükle",
	"Must be jpg, gif or png format. No nudity allowed. No copyrighted images.":  "jpg, gif yada png formatında olmalı, erotik içerik ve telif hakkı bulunmamalı.",
	"Maximum of 225 x 350 pixels (resized automatically). ": "En fazla 225 x 350 piksel (otomatik boyutlandırılacaktır)",
	"Remove Picture": "Resmi Sil",
	"Options": "Seçenekler",
	"My Last List Updates": "Son Güncellemelerim",
	"More recs": "Dahası",
	"Latest Recommendations": "Son Önerilenler",
	"Anime Entries": "Animeler",
	"Manga Entries": "Mangalar",
	"Add entries": "Ekle",
	"My Profile": "Profilim",
	"What would you like to do? ": "Ne yapmak istersin?",
	

}
}


else if(pagehref(/profile/))
{ 
var pagetrans ={
			//panel
	"Anime List": "Anime Listesi",
	"Manga List": "Manga Listesi",
	"My friends":	"Arkadaşlarım",
	"Gender": "Cinsiyet",
	"Join Date": "Üyelik Tarihi",
	"Write a Comment": "Yorum Yap",
	"Submit Comment": "Yorumu Gönder",
	"s Comments ": "nin Yorumları",
	

}
}

else if(pagehref(/anime.php/) || pagehref(/anime.php/))
{
var pagetrans ={
	//anime & manga
	"Search Anime": "Anime Ara",
	"Advanced Search": "Gelişmiş Arama",
	"Anime Reviews": "Anime İncelemeleri",
	"More reviews": "Daha fazla inceleme",
	"more":	"devamı...",
	"Latest Manga Reviews": "Son Manga İncelemeleri",
	"Manga Recommendations": "Manga Önerileri",
	"read more": "devamını oku",
}
}

else if(pagehref(/reviews.php/))
{
var pagetrans ={
	//anime & manga
	"Anime Reviews": "Anime İncelemeleri",
	"Manga Reviews": "Manga İncelemeleri",
	"I found this review": "Bu inceleme bana",
	"Helpful": "yardımcı oldu",
	"Not Helpful": "yardımcı olmadı",

}
}

else if(pagehref(/register.php/))
{
var pagetrans ={
	//anime & manga
	"Create a MyAnimeList Account": "MyAnimeList Hesabı Oluştur",
	"Confirm Password:": "Şifreyi Doğrula:",
	"Sign Up and Start Using MyAnimeList": "Üye Ol ve MyAnimeList Kullanmaya Başla",
	"We will never share your e-mail with a third party.": "E-mail adresiniz üçüncü bir şahısla paylaşılmayacaktır.",
	"Create Account": "Üye Ol",
}	
}

else
{
var pagetrans ={
		//index
	"add":	"ekle",
	"Add to favorites": "Favorilerime ekle",
	"report":	"Şikayet et",
	"Saving...": "Kaydediliyor...",
	"hours":	"saat",
	"hour":		"saat",
	"ago":		"önce",
	"minutes":	"dakika",
	"minute":	"dakika",
	"hours ago": "saat önce",
	"read more": "devamını oku",
	"Recently Active Clubs": "Aktif Kulüpler",
	"Anime & Manga News": "Anime & Manga Haberleri",
}
}

function defined(v){
	return v!=undefined;
}

function translate(text){
	var numbers=[];
	var no;
	
	if(!defined(text) || !text.match) return undefined;
	
	text=text.replace(/^\s*/,"").replace(/\s*$/,"");

	if(text=="") return undefined;

	while(defined(no=text.match(/\d+/)))
		numbers.push(no[0]),text=text.replace(/\d+/,"[[D]]");

	var translation=translations[text];
	
	if(defined(translation)){
		while(numbers.length)
			translation=translation.replace(/\[\[D\]\]/,numbers.shift());
	}
	
	return translation;
}

function translatepage(text){
	var numbers=[];
	var no;
	
	if(!defined(text) || !text.match) return undefined;
	
	text=text.replace(/^\s*/,"").replace(/\s*$/,"");

	if(text=="") return undefined;

	while(defined(no=text.match(/\d+/)))
		numbers.push(no[0]),text=text.replace(/\d+/,"[[D]]");

	var translation=pagetrans[text];
	
	if(defined(translation)){
		while(numbers.length)
			translation=translation.replace(/\[\[D\]\]/,numbers.shift());
	}
	
	return translation;
}



function translateTree(a){
	var items=document.evaluate("descendant::*",a,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	for(var i=0;i<items.snapshotLength;i++){
		var e=items.snapshotItem(i);
		
		for(var j=0;j<e.childNodes.length;j++){
			var elem=e.childNodes[j];
			if(elem.nodeType==3){
				var text=translate(elem.wholeText);
				var text2=translatepage(elem.wholeText);
				if(defined(text)) elem.replaceWholeText(text);
				if(defined(text2)) elem.replaceWholeText(text2);
			} else{
				var text=translate(elem.value);
				var text2=translatepage(elem.value);
				if(defined(text)) elem.value=text;
				if(defined(text2)) elem.value=text2;
			}
		}
	}
}


function Remove_Ads() {

  	var elements = document.evaluate(
		"//div[contains(@class, 'adHome300')] | //div[contains(@id, 'homeAds')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null
	);

	for (var i = 0; i < elements.snapshotLength; i++) {
		var thisElement = elements.snapshotItem(i);
		//GM_log("Removing Facebook ad element with class='" + thisElement.className + "' and id='" + thisElement.id + "'.");
    	thisElement.parentNode.removeChild(thisElement);
	}

}



var SUC_script_num = 98374;

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime())))
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm(script_name+' eklentisi için yeni bir sürüm mevcut."\nİndirme sayfasına gitmek ister misiniz?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}

GM_addStyle('body{font-family: meiryo,mona}');
GM_addStyle('.ads_value{display: none}');

document.body.addEventListener("DOMNodeInserted",function(a){translateTree(a.relatedNode);},false);
document.addEventListener("DOMNodeInserted", Remove_Ads, true);
translateTree(document);

