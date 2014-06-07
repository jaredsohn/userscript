// ==UserScript==
// @name           Twitter TR
// @namespace      http://www.alidemirtas.tk
// @description    Twitter'ı Türkçe Kullanma / Using Twitter Turkish
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// @include        https://*.twitter.com/
// ==/UserScript==

// Twitter username
var metas = document.getElementsByTagName('meta'), twitterName;
for(var i=0,il=metas.length;i<il;i++)
  if(metas[i].name == 'session-user-screen_name') twitterName = metas[i].content;

var strings = {
// translations
  "Username or email" : "Kullanıcı adı veya e-posta",
  "Forgot?" : "Kayıp?",
  "Remember me" : "Beni hatırla",
  "Sign In" : "Giriş Yap",
  "Join Twitter!" : "Twitter'a Katıl!",
  "So you want to use Twitter on the web…" : "Böylece web üzerinde Twitter kullanmak istiyorum ...",
 "Oh, snap! We couldn’t find you (or your device)." : "Oh,sürpriz! Biz bulamadık siz (veya aygıt).",
 "Give us the phone number you’ve been using to Twitter below." : "Cepten Twitter kullanmak için şu an kullandığın telefonu numaranı ver.",
  "Phone number:" : "Telefon numarası:",
  "Delete" : "Sil",
  "Sure you want to delete this tweet? There is NO undo!" : "Bu cıvıltıyı silmek istediğinizden eminmisiniz? Bunun geri dönüşü yok!",
  "Top Tweets " : "En İyi Cıvıltılar",
  "See who’s here " : "Bak kim burada ",
"Discover what’s happening right now, anywhere in the world" : "Şu an dünyanın her yerinde neler oluyor,keşfet",
 "Search for a keyword or phrase…" : "Ara anahtar kelime ve deyim için...",
  "Have an account?" : "Hesabın var mı?",
 "Sign in" : "Giriş yap",
 "Forgot password?" : "Kayıp parola?",
 "Forgot username?" : "Kayıp kullanıcı adı?",
 "Already using Twitter on your phone?" : "Zaten telefonunuzda Twitter mı kullanıyorsunuz?",
"Twitter is a rich source of instant information. Stay updated. Keep others updated. It's a whole thing." : "Twitter anlık zengin bir bilgi kaynağıdır. Güncel kalın. Diğer güncel tutun. Bunun için ayrı bir şey.",
"Wrong Username/Email and password combination." : "Geçersiz Kullanıcı Adı / E-posta ve şifre kombinasyonu.",
 "Create Your Account" : "Kendi Hesabını Oluştur",
 "Login" : "Giriş",
  "Home" : "Ana Sayfa",
  "Profile" : "Profil",
  "Find People" : "İnsanları Bul",
  "Messages" : "Mesajlar",
  "Who To Follow" : "Takip Et",
  "Thanks, your settings have been saved." : "Teşekkürler, ayarlarınız kaydedildi.",
  "Settings" : "Ayarlar",
  "Help" : "Yardım",
  "Sign out" : "Çıkış yap",
  "What’s happening?" : "Neler oluyor?",
  "Latest:" : "Son durum:",
  "from" : "kaynak ",
  "more" : "devamı",
  "from web by" : "kaynak: web - uygulama: ",
  "from web" : "kaynak: web",
  "Tweet" : " Cıvıltı",
  "Following" : "Takip Ettiklerim",
  "Followers" : "Takipçilerim",
  "Listed" : "Listeler",
  "Direct Messages" : "Direkt Mesajlar",
  "Favorites" : "Favoriler",
  "Retweets" : "Tekrarlanan Cıvıltılar",
  "Searches" : "Aramalar",
  "@Mentions" : "@Bahsedenler",
  "Lists" : "Listeler",
  "Retweeted by" : "Tekrar cıvıltılayan ",
  "Reply" : "Cevapla",
  "Retweet" : "Tekrar Cıvıltıla",
  "New list" : "Yeni liste",
  "View all" : "Hepsini göster",
  "Trending Topics" : "Tırmanan konular",
  "RSS feed" : "RSS Beslemesi",
  "About Us" : "Hakkımızda",
  "Contact" : "İletişim",
  "Status" : "Durum",
  "Goodies" : "Araçlar",
  "Business" : "İş",
  "Jobs" : "İş",
  "Terms" : "Kurallar",
  "Privacy" : "Gizlilik",
  "View all..." : "Hepsini gör...",
  "Name" : "İsim",
  "Location" : "Konum",
  "Bio" : "Biyografi",
  "Tweets" : "Cıvıltılar",
  "Actions" : "İşlemler",
  "message" : "mesaj",
  "block" : "engelle",
  "report for spam" : "spam olarak raporla",
  "Mention" : "Bahset ",
  "Direct message" : "Direkt mesaj ",
  "Follow" : "Takip Et ",
  "Unfollow" : "Takibi Kes ",
  "That\'s you!" : "Bu sensin!",
  "Find accounts and follow them." : "Hesapları bul ve takip et.",
  "Find on Twitter" : "Twitter'da bul",
  "Find on other networks" : "Diğer ağlarda bul",
  "Suggested Users" : "Önerilen kullanıcılar",
  "You can find people, organizations, or companies you know that already have a Twitter account." : "Bir Twitter hesabına sahip olduğunu bildiğiniz kişileri, organizasyonları ve firmaları bulabilirsiniz.",
  "What account are you looking for?" : "Ne arıyorsunuz?",
  "search" : "ara",
  "Search for a username, first or last name, business or brand" : "Bir kullanıcı adı, ad ya da soyad, şirket ya da marka arayın",
  "We can check if folks on other services already have a Twitter account. " : "Sizin için diğer servislerde yer alan arkadaşlarınızın Twitter hesabı olup olmadığını kontrol edebiliriz.",
  "Choose a service" : "Bir servis seçin ",
  "from the list on the left." :  "Soldaki listeyi kullanabilirsiniz.",
  "Maybe you\'ve heard of these Twitter users? Select the people you\'d like to start following." : "Belki bu Twitter kullanıcılarını duymuş olabilirsiniz. Takip etmek istediklerinizi işaretleyin.",
  "Select All" : "Tümünü Seç",
  "Your Email" : "E-posta hesabınız",
  "Email Password" : "E-posta parolanız",
  "We don\'t store your login and your password is submitted securely.We store email addresses from this import to help you connect with other Twitter users. We won\'t email these addresses without your permission." : "Biz güvenli bir şekilde gönderilen giriş bilgilerinizi ve parolanızı hiç bir yerde saklamıyoruz. E-posta adresinizi diğer kullanıcılar ile daha kolay bağlantı kurabilmeniz için saklıyoruz. Bu eposta adresinizi sizin izniniz olmadan kullanmıyoruz.",
  "Email Security" : "E-posta Güvenliği",
  "Learn more" : "Daha fazlasını öğrenin",
  "Account" : "Hesap",
  "Password" : "Parola",
  "Mobile" : "Mobil",
  "Notices" : "Bildirimler",
  "Picture" : "Resim",
  "Change image" : "Resim Seç",
  "Delete this image" : "Resim Sil",
  "Design" : "Tasarım",
  "Select a theme" : "Tasarım seç",
  "Change background image" : "Arkaplan seç",
  "Change design colors" : "Tasarım renkleri seç",
  "background" : "arkaplan",
  "text" : "yazı",
  "links" : "bağlantılar",
  "sidebar" : "kenar çubuğu",
  "sidebar border" : "kenar çubuğu kenarlık",
  "tile background" : "devamsız arkaplan",
  "Don't use a background image" : "Arkaplan resmi kullanma",
  "Connections" : "Bağlantılar",
  "You've allowed the following applications to access your account" : "Hesabınıza erişmesi için izin verilen uygulamalar:",
  "Revoke Access" : "Kaldır",
  "Share photos on Twitter with Twitpic" : "Twitpic ile Twitter'da resim paylaşabilrsiniz...",
  "Developers" : "Geliştiriciler",
  "Continue" : "Devam Et",
  "View all…" : "Tümünü göster…",
  "Username" : "Kullanıcı Adı",
  "Enter your real name, so people you know can recognize you." : "Gerçek adınızı girin ki millet sizi tanıyabilsin.",
  "Your public profile: http://twitter.com/": "Profil adresiniz: http://twitter.com/",
  "No spaces, please." : "Boşuk kullanmayın,lütfen.",
  "Email" : "E-posta",
  "Let others find me by my email address" : "Diğer e-posta adresimde beni bulsun.",
  "Note: email will not be publicly displayed" : "Not: e-posta adresi herkese görünmez.",
  "Time Zone" : "Zaman Dilimi",
  "Tweet Location" : "Cıvıltı Konumu",
  "Add a location to your tweets" : "Cıvıltılarıma bulunduğum konumu ekle",
  "More Info URL" : "Daha Fazla Bilgi",
  "Tweet Privacy" : "Cıvıltı Güvenliği",
  "One Line Bio" : "Bir Satır Biyografi",
  "Save" : "Kaydet",
  "Deactivate my account." : "Hesabımı Sil",
  "Have a homepage or a blog? Put the address here." : "Bir siteniz ya da blogunuz mu var? Adresini buraya yazın.",
  "(You can also add Twitter to your site here)" : "(Buradan da sitenize Twitter'ı ekleyebilirsiniz.)",
  "About yourself in fewer than 160 chars." : "160 karakterden daha az ile kendiniz hakkında bir şeyler yazın",
  "Where in the world are you?" : "Dünyanın üzerinde nerdesiniz?",
  "Enable geotagging" : "Koordinat Etiketleme Etkinleştir",
  "What is Geotagging?" : "Koordinat Etiketleme nedir?",
  "Allow third party applications to annotate your tweets with location information." : "Üçüncü parti yazılımlardan gönderdiğiniz twitlere bulunduğunuz koordinatı ekleyebilmenize olanak sağlar.",
  "Delete all historical location data from your tweets. The process can take up to 30 minutes." : "Cıvıltılarınızdaki tüm yer bilgilerini silin. Bu işlem 30 dakika kadar sürebilir.",
  "What language would you like to Twitter in?" : "Twitter'ı hangi dilde kullanmak istersiniz?",
  "Protect my tweets" : "Cıvıltılarımı koru",
  "Only let people whom I approve follow my tweets." : "Sadece izin verdiğim kişiler cıvıltılarımı görebilsin. ",
  "If this is checked, your future tweets will not be available publicly." : "Ancak daha önceden gönderilen caıvıltılar hala bazı yerlerde görüntülenebilir.",
  "Delete my account." : "Hesabımı Sil",
  "From here you can change your basic account info, fill in your profile data, and set whether you want to be private or public." : "Bu kısımda, basit hesap bilgilerinizi değiştirebilir, profil bilgilerinizi doldurabilir ve gizlilik ayarlarınızı yapabilirsiniz.",
  "Tips" : "İpuçları",
  "Filling in your profile information will help people find you on Twitter. For example, you'll be more likely to turn up in a Twitter search if you've added your location or your real name." : "Profil bilgilerinizi doldurmanız, insanların sizi daha kolay bulmasına olanak sağlar. Örneğin gerçek isminizi ya da lokasyon bilginizi girdiyseniz Twitter aramalarında çıkma şansınız artar.",
  "Change your Twitter user name anytime without affecting your existing tweets, @replies, direct messages, or other data. After changing it, make sure to let your followers know so you'll continue receiving all of your messages with your new user name." : "Var olan cıvıltılarınızı, @cevaplarınızı, direkt mesajlarınızı ve diğer verileri etkilemeden istediğiniz zaman kullanıcı adınızı değiştirebilirsiniz. Değiştirdikten sonra takipçilerinize bildirmeyi unutmayın ki yeni mesajları yeni kullanıcı adınızla alabilesiniz.",
  "Protect your account to keep your tweets private. Approve who can follow you and keep your tweets out of search results." : "Cıvıltılarınızı gizlemek için hesabınızı koruyun. Kimlerin sizi takip edebileceğine karar verin ve cıvıltılarınızı arama sonuçlarının dışında tutun.",
  "Current Password:" : "Şu anki parolanız:",
  "Forgot your password?" : "Parolanızı mı unuttunuz?",
  "New Password:" : "Yeni parolanız:",
  "Verify New Password:" : "Yeni parolanızı doğrulayın:",
  "Be tricky! Your password should be at least 6 characters and not a dictionary word or common name. Change your password on occasion." : "Kurnaz olun! Parolanız en az 6 karakterden oluşmalı ve genel bir kelime ya da sözlüklerde yer alan kelimeler olmamalıdır. Fırsat buldukça parolanızı değiştirin.",
  "Note:" : "Not:",
  " If you have trusted a third-party Twitter service or software with your password and you change it here, you'll need to re-authenticate to make that software work. (Never enter your password in a third-party service or software that looks suspicious.)" :  " Eğer üçüncü parti bir yazılıma ya da servise güvenip parolanızı verdiyseniz, burada parola değiştirdiğinizde ilgili uygulamada yeniden doğrulama yapmalısınız. (Şüpheli görünen üçüncü parti yazılım ya da servislere hiç bir zaman parolanızı girmeyin.)",
  "Twitter is more fun when used through your mobile phone.Set yours up!  It's easy! " : "Twitter'ı cep telefonunda kullanmak çok eğlenceli.Ayarlayın!",
  "Use Twitter with Text Messaging!" : "Metin mesajları ile twitter kullanın",
  "Send a message with the word " : "Kelime ile bir mesaj ",
  "Start" : "Başla",
  "Choose your country" : "Ülkeni seç",
  "Twitter commands" : "Twitter komutları",
  "Text Messaging on Twitter" : "Twitter Metin Mesajı",
  "ON" : "Açık",
  "OFF" : "Kapalı",
  "New Follower Emails:" : "Yeni Takipçi E-posta: ",
  "Email when someone starts following me" : "E-posta ile bildir",
  "Direct Text Emails:" : "Direkt E-posta Yazı: ",
  "Email when I receive a new direct message" : "E-posta ile direkt mesaj gönderilebilsin",
  "Email Newsletter:" : "E-posta Bülteni: ",
  "I want the inside scoop—please send me email updates!" : "Twitter sistem güncellemeleri e-posta istiyorum",
  " to one of Twitter's local short codes:   " : " yazan bir kısa mesajı Twitter'ın yerel telefonlarından birine gönderin:",
  "(note that some carriers do not yet support Twitter)" : "(Bazı servis sağlayıcıların henüz Twitter'ı desteklemediklerini unutmayın.)",
  "Twitter does not charge for this service. It's just like sending and receiving text messages with your friends — your carrier's standard messaging rates apply. " : "Twitter, bu servis için ücret almaz. Aynı arkadaşlarınızla mesaj alıp, gönderdiğiniz zaman olduğu gibi servis sağlayacınız üzerinden ücretlendirilirsiniz.",
  "Learn about the Twitter's Text Messaging commands " : "Twitter'ın metin mesajı ile komut kullanımını öğrenin.",
  "here" : "buradan"  
};
strings[twitterName+"’s settings"] = twitterName + " ayarları";
strings["RSS feed of "+twitterName+"'s tweets"] = twitterName + " için RSS beslemesi";

trim = function (str) {
  return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^about (\\d*) hour ago"] = "yaklaşık $1 saat önce";
regexps["^about (\\d*) hours ago"] = "yaklaşık $1 saat önce";
regexps["^(\\d*) minutes ago$"] = "$1 dakika önce";
regexps["^(\\d*) days ago$"] = "$1 gün önce";
regexps["^(\\d*) months ago$"] = "$1 ay önce";
regexps["and (\\d*) others$"] = "ve $1 diğer kişi";

matchRegexps = function(key) {
	if (key===null) {
		return undefined;
	}
	for (var reg in regexps) {
		var rrrr = new RegExp(reg);
		var result = key.match(rrrr);
		if (key.match(rrrr)!==null) {
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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"", "label":"", "h1":"", "title":"", "button":"", "li":"", "small":"", "h3":"", "buttons":"", "geo":"", "layer":"", "h2":"", "placeholder":"", "ul":"", "href":"", "form":"", "frame":""
};

translateWholePage = function(e) {
  var node = undefined;
  for (var tagName in allTrans) {
    var tags = document.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      if(node.childNodes != undefined) {
        if (node.childNodes.length==1) {
          var translation = translateWithRegexp(node.innerHTML);
          if (translation!=undefined) {
            node.innerHTML = translation;
          }
        } else {
          if (node.childNodes.length<=3) {
            for (var i=0;i<node.childNodes.length;i++) {
              if (node.childNodes[i].nodeName=="#text") {
                translation = translateWithRegexp(node.childNodes[i].nodeValue);
                if (translation!=undefined) {
                  node.childNodes[i].nodeValue = translation;
                }
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
  setTimeout(400, translateWholePage)
}, false);