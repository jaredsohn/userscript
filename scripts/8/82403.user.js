// ==UserScript==
// @name           Türkçe Twitter
// @namespace      http://www.forumgezegeni.com
// @description    Twitter sitesini Türkçeleştirme / Turkish translation of twitter
// @include        http://www.twitter.com/*
// @include        https://www.twitter.com/*
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

// Twitter username
var metas = document.getElementsByTagName('meta'), twitterName;
for(var i=0,il=metas.length;i<il;i++)
  if(metas[i].name == 'session-user-screen_name') twitterName = metas[i].content;

var strings = {
// translations
  "Home" : "Anasayfa",
  "Profile" : "Profil",
  "Find People" : "İnsanları bul",
  "Settings" : "Ayarlar",
  "Help" : "Yardım",
  "Sign out" : "Çıkış",
  "What’s happening?" : "Neler oluyor ?",
  "(You can also add Twitter to your site here )" : "(Eğer siteniz varsa,sitenize Twitter eklentisini ekliyebilirsiniz)",
  "Change" : "Değiştir",
  "Latest:" : "Son durum:",
  "from" : "kaynak: ",
  "more" : "devam",
  "from web by" : "kaynak: web - uygulama: ",
  "from web" : "kaynak: web",
  "tweets" : " tweet",
  "Follow" : "Takip Et",
  "Following" : "takipte",
  "Followers" : "takipçi",
  "Listed" : "listelenen",
  "Direct Messages" : "Direkt mesajlar",
  "Favorites" : "Favoriler",
  "Retweets" : "Tekrar tweetler",
  "Lists" : "Listeler",
  "Retweeted by" : "Tekrar tweetleyen ",
  "Reply" : "Cevapla",
  "Retweet" : "Tekrar tweetle",
  "New list" : "Yeni liste",
  "View all" : "Hepsini göster",
  "Trending Topics" : "Tırmanan konular",
  "RSS feed" : "RSS Beslemesi",
  "About Us" : "Hakkımızda",
  "Contact" : "İletişim",
  "Status" : "Durum",
  "Goodies" : "Araçlar",
  "Business" : "İş",
  "Jobs" : "İK",
  "Terms" : "Kurallar",
  "Privacy" : "Gizlilik",
  "View all..." : "Hepsini gör...",
  "Search" : "Ara",
  "Name" : "İsim",
  "Location" : "Konum",
  "Bio" : "Biyo",
  "Tweets" : "Tweetler",
  "Actions" : "İşlemler",
  "message" : "mesaj",
  "block" : "engelle",
  "report for spam" : "spam olarak raporla",
  "Mention" : "Bahset ",
  "Direct message" : "Direkt mesaj ",
  "English" : "İngilizce",
  "Select Language..." : "Dil Seçiniz",
  "Spanish - Español" : "İspanyolca",
  "Only let people whom I approve follow my tweets.If this is checked, your future tweets will not be available publicly. Tweets posted previously may still be publicly visible in some places." : "Bu seçeneği seçerseniz twitleriniz sizi takip etmeyenler tarafından görülmez",
  "Save" : "Kaydet",
  "Change image" : "Resmi Değiştir",
  "Change" : "Değiştir",
  " a list of verified baseball greats." : "Onaylı beyzbolcuların lisetesidir.",
  "Delete this image" : "Resmi Sil",
  "n." : " ",
  "Ver·i·fied Base·ball" : "Onaylı Beyzbolcular",
  "Turkey" : "Türkiye",
  "Local" : "Yerel",
  " a place that highlights forces of good in the Twitterverse." : "Yardım severlerin bulunduğu bir yer.",
  "New Follower Emails:" : "Yeni Takipçi Mail'i",
  "Email when someone starts following me" : "Biri beni takip ederse Email olarak bildir.",
  "Direct Text Emails:" : "Direkt Mesajlar Mail'i",
  "Email Newsletter:" : "E-posta Haber Bülteni:",
  "These settings control how much we bug you about various things." : "Sana Email olarak hangilerinin gelebileceğini burdan ayarlayabilirsin",
  "Nudge only works if you have a registered device and it is on." : "Rahatsız edilmek istemiyorsanız ayarlarınızı düzenleyiniz",
  "Be sure your email is correct in " : "E-posta adresinizin doğru olduğundan emin olun.",
  "account settings" : "Profil ayarları",
  " to receive emails." : "'ından Mail adresinizi düzenleyebilirsiniz.",
  "I want the inside scoop—please send me email updates!" : "Haber bültenini bana Email olarak gönder",
  "Thanks, your settings have been saved." : "Teşekkürler,ayarlarınız başarılı bir şekilde kaydedildi.",
  "Retweet to your followers?" : "Tekrar tweetlemeye eminmisiniz ?",
  "You can change your name on your " : "Adınızı değiştirmek için tıklayınız:",
  "Deactivate my account." : "Hesabımı Sil",
  "View all…" : "Hepsini Gör...",
  "n. a thrifty bird that lays golden eggs." : "Altın yumurtlayan bir kuş...",
  "profile settings." : "Profil Ayarları",
  "Your public profile:" : "Herkese açık profil:",
  "Note: email will not be publicly displayed" : "Not:E-postanız herkese görünmez.",
  "From here you can change your basic account info, language settings, and your tweet privacy and location settings." : "Burdan kullanıcı adınızı, konum bilginizi, dil ve gizlilik ayarlarınızı değiştirebilirsiniz.",
  "Follow" : "Takip et ",
  "Unfollow" : "Takibi kes ",
  "That\'s you!" : "Bu sensin!",
  "Find accounts and follow them." : "Hesapları bul ve takip et.",
  "Find on Twitter" : "Twitter'da bul",
  "Find on other networks" : "Diğer ağlarda bul",
  "Suggested Users" : "Önerilen kullanıcılar",
  "You can find people, organizations, or companies you know that already have a Twitter account." : "Bir Twitter hesabına sahip olduğunu bildiğiniz kişileri, organizasyonları ve firmaları bulabilirsiniz.",
  "Lists are timelines you build yourself, consisting of friends, family, co-workers, sports teams, you name it." : "Listeleri,arkadaşlar,aile,eş,spor takımlar vb. şekilde oluşturabilirsiniz.",
  "What account are you looking for?" : "Ne arıyorsunuz?",
  "search" : "ara",
  "Search for a username, first or last name, business or brand" : "Bir kullanıcı adı, ad ya da soyad, şirket ya da marka arayın",
  "We can check if folks on other services already have a Twitter account. " : "Sizin için diğer servislerde yer alan arkadaşlarınızın Twitter hesabı olup olmadığını kontrol edebiliriz.",
  "Choose a service" : "Bir servis seçin ",
  "from the list on the left." :  "Soldaki listeyi kullanabilirsiniz.",
  "Maybe you\'ve heard of these Twitter users? Select the people you\'d like to start following." : "Belki bu Twitter kullanıcılarını duymuş olabilirsiniz. Takip etmek istediklerinizi işaretleyin",
  "Select All" : "Tümünü işaretle",
  "Your Email" : "Eposta hesabınız",
  "Email Password" : "Eposta parolanız",
  "We don\'t store your login and your password is submitted securely.We store email addresses from this import to help you connect with other Twitter users. We won\'t email these addresses without your permission." : "Biz güvenli bir şekilde gönderilen giriş bilgilerinizi ve parolanızı hiç bir yerde saklamıyoruz. Eposta adresinizi diğer kullanıcılar ile daha kolay bağlantı kurabilmeniz için saklıyoruz. Bu eposta adresinizi sizin izniniz olmadan kullanmıyoruz.",
  "Email Security" : "Eposta güvenliği",
  "Learn more" : "Daha fazlasını öğrenin",
  "Account" : "Hesap",
  "Password" : "Parola",
  "Mobile" : "Mobil",
  "Notices" : "Bildirimler",
  "Picture" : "Fotoğraf",
  "Design" : "Tasarım",
  "Connections" : "Bağlantılar",
  "Continue" : "Devam et",
  "View all…" : "Tümünü göster…",
  "Username" : "Kullanıcı adı",
  "Enter your real name, so people you know can recognize you." : "Gerçek adınızı girin ki millet sizi tanıyabilsin.",
  "Your URL: http://twitter.com/": "Adresiniz: http://twitter.com/",
  "No spaces, please." : "Lütfen boşluk kullanmayın",
  "Email" : "Eposta",
  "Time Zone" : "Zaman dilimi",
  "More Info URL" : "Daha fazla bilgi adresi",
  "One Line Bio" : "Bir satır biyografi",
  "Have a homepage or a blog? Put the address here." : "Bir siteniz ya da blogunuz mu var? Adresini buraya yazın.",
  "(You can also add Twitter to your site here)" : "Buradan da sitenize Twitter'ı ekleyebilirsiniz.",
  "About yourself in fewer than 160 chars." : "160 karakterden daha azı ile kendiniz hakkında bir şeyler yazın",
  "Where in the world are you?" : "Nerelisin?",
  "Enable geotagging" : "Geo etiketlemeyi etkinleştir",
  "What is Geotagging?" : "Geo etiketleme nedir?",
  "Allow third party applications to annotate your tweets with location information." : "Üçüncü parti yazılımların gönderdiğiniz twitlere yer bilgisi ekleyebilmesine olanak sağlar.",
  "Delete all historical location data from your tweets. The process can take up to 30 minutes." : "Twitlerinizdeki tüm yer bilgilerini silin. Bu işlem 30 dakika kadar sürebilir.",
  "What language would you like to Twitter in?" : "Twitter'ı hangi dilde kullanmak istersiniz?",
  "Protect my tweets" : "Twitlerimi koru",
  "Only let people whom I approve follow my tweets.  If this is checked, you WILL NOT be on the " : "Sadece izin verdiğim kişiler twitlerimi görebilsin. Bu seçenek seçiliyse ",
  "public timeline" : "genel zaman çizgisi",
  ".  Tweets posted previously may still be publicly visible in some places." : "nde gözükmeyecektir. Daha önceden gönderilen twitler hala bazı yerlerde görüntülenebilir.",
  "Delete my account." : "Hesabımı sil",
  "From here you can change your basic account info, fill in your profile data, and set whether you want to be private or public." : "Bu kısımda, basit hesap bilgilerinizi değiştirebilir, profil bilgilerinizi doldurabilir ve gizlilik ayarlarınızı yapabilirsiniz.",
  "Tips" : "İpuçları",
  "Filling in your profile information will help people find you on Twitter. For example, you'll be more likely to turn up in a Twitter search if you've added your location or your real name." : "Profil bilgilerinizi doldurmanız, insanların sizi daha kolay bulmasına olanak sağlar. Örneğin gerçek isminizi ya da lokasyon bilginizi girdiyseniz Twitter aramalarında çıkma şansınız artar.",
  "Change your Twitter user name anytime without affecting your existing tweets, @replies, direct messages, or other data. After changing it, make sure to let your followers know so you'll continue receiving all of your messages with your new user name." : "Var olan twitlerinizi, @cevaplarınızı, direkt mesajlarınızı ve diğer verileri etkilemeden istediğiniz zaman kullanıcı adınızı değiştirebilirsiniz. Değiştirdikten sonra takipçilerinize bildirmeyi unutmayın ki yeni mesajları yeni kullanıcı adınızla alabilesiniz.",
  "Protect your account to keep your tweets private. Approve who can follow you and keep your tweets out of search results." : "Twitlerinizi gizlemek için hesabınızı koruyun. Kimlerin sizi takip edebileceğine karar verin ve twitlerinizi arama sonuçlarının dışında tutun.",
  "Current Password:" : "Şu anki parolanız:",
  "Forgot your password?" : "Parolanızı mı unuttunuz?",
  "New Password:" : "Yeni parolanoz:",
  "Verify New Password:" : "Yeni parolanızı doğrulayın:",
  "Be tricky! Your password should be at least 6 characters and not a dictionary word or common name. Change your password on occasion." : "Kurnaz olun! Parolanız en az 6 karakterden oluşmalı ve genel bir kelime ya da sözlüklerde yer alan kelimeler olmamalıdır. Fırsat buldukça parolanızı değiştirin.",
  "Note:" : "Not:",
  " If you have trusted a third-party Twitter service or software with your password and you change it here, you'll need to re-authenticate to make that software work. (Never enter your password in a third-party service or software that looks suspicious.)" :  " Eğer üçüncü parti bir yazılıma ya da servise güvenip parolanızı verdiyseniz, burada parola değiştirdiğinizde ilgili uygulamada yeniden doğrulama yapmalısınız. (Şüpheli görünen üçüncü parti yazılım ya da servislere hiç bir zaman parolanızı girmeyin.)",
  "Twitter is more fun when used through your mobile phone. Set yours up!" : "Twitter mobil telefonunuzdan kullanılınca çok daha eğlenceli. Telefonunuzu ayarlayın!",
  "Use Twitter with Text Messaging!" : "Metin mesajlar ile twitter kullanın",
  "Send a message with the word " : "İçinde sadece ",
  "START" : "START",
  " to one of Twitter's local short codes:   " : " yazan bir kısa mesajı Twitter'ın yerel telefonlarından birine gönderin:",
  "(note that some carriers do not yet support Twitter)" : "(Bazı servis sağlayıcıların henüz Twitter'ı desteklemediklerini unutmayın.)",
  "US: " : "ABD: ",
  "Canada: " : "Kanada: ",
  "UK: " : "İngiltere: ",
  " (Vodafone, Orange, 3 and O2 customers)" : " (Vodafone, Orange, 3 ve O2 müşterileri)",
  "India: " : "Hindistan: ",
  " (Bharti Airtel customers)" : " (Bharti Airtel müşterileri)",
  "Indonesia: " : "Endonezya: ",
  " (AXIS and 3 customers)" : " (AXIS ve 3 müşterileri)",
  "Ireland: " : "İrlanda: ",
  " (O2 customers)" : " (O2 müşterileri)",
  "Australia: " : "Avustralya: ",
  " (Telstra customers)" : " (Telstra müşterileri)",
  "New Zealand: " : "Yeni Zelanda: ",
  " (Vodafone and Telecom NZ customers)" : " (Vodafone ve Telecom NZ müşterileri)",
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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"", "label":"", "h1":"", "title":"", "button":"", "li":"","small":"","h3":""
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
  setTimeout(500, translateWholePage)
}, false);