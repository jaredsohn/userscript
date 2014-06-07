// ==UserScript==
// @name           Türkçe Facebook
// @namespace      http://www.itusozluk.com/userinfo.php?user=togisama
// @include        http://www.facebook.com*
// @desription     Facebook'u Türkçe kullanmak için bir betik. Gün geçtikçe güncellenecektir. Eliram'ın ibranice betiğinden yola çıkılmıştır (This script is based on Eliram's Hebrew Facebook)
// ==/UserScript==

function r(dd,s,t) 
{ // Replace search string with translation
	if (s==t) 
		return (dd); 
	
	else 
	{
		var RegExpr = new RegExp(s,"g");
		return (dd.replace(RegExpr,t));
    }
}

d=document.body.innerHTML;

// Main menu
d=r(d,'>Profile<','>Profil<');
d=r(d,'>edit<','>Düzenle<');
d=r(d,'>Friends<','>Arkadaşlar<');
d=r(d,'>Networks<','>Ağlar<');
d=r(d,'>Inbox<','>Posta<');
d=r(d,'>home<','>Evim<');
d=r(d,'>account<','>Hesabım<');
d=r(d,'>Privacy<','>Gizlilik<');
d=r(d,'>privacy<','>Gizlilik<');
d=r(d,'>logout<','>Çıkış<');
d=r(d,'>About<','>Hakkında<');

d=r(d,'>Message<','>Posta<');
d=r(d,'>Poke<','>Dürtükle<');


// Sub Menus
d=r(d,'>Message Inbox<','> Posta Kutusu <');
d=r(d,'>Sent Messages<','> Gönderilen Postalar <');
d=r(d,'>Notifications<','> Uyarılar <');
d=r(d,'>Updates<','>Güncellemeler<');
d=r(d,'>Compose Message<','>Posta Yaz<');
d=r(d,'>Browse All Networks<','>Bütün Ağları Güncelle<');
d=r(d,'>Join a Network<','>Bir Ağa Katıl<');
d=r(d,'>Status Updates<','>Durum Güncellemeleri<');
d=r(d,'>Online Now<','>Çevrim İçi Olanlar<');
d=r(d,'>Recently Updated<','>Yeni Güncellenmişler<');
d=r(d,'>Recently Added<','>Yeni Eklenmişler<');
d=r(d,'>All Friends<','>Tüm Arkadaşlar<');
d=r(d,'>Invite Friends<','>Arkadaşlar<');
d=r(d,'>Find Friends<','>Arkadaş Bul<');

// Left Column
d=r(d,'>Search<','>Ara<');
d=r(d,'>Applications<','>Uygulamalar<');
d=r(d,'>more<','>Daha Çoğu<');
d=r(d,'>Less<','>Daha Azı<');
d=r(d,'>Photos<','>Fotoğraflar<');
d=r(d,'>Groups<','>Gruplar<');
d=r(d,'>Events<','>Olaylar<');
d=r(d,'>Marketplace<','>Pazar Yeri<');
d=r(d,'>My Questions<','>Sorularım<');
d=r(d,'>Developer<','>Geliştiren<');
d=r(d,'>Posted Items<','>Postalanan Öğeler<');
d=r(d,' of <','\'nın<');
d=r(d,'posted items<','Postalanan Öğeler<');
d=r(d,'>Notes<','>Notlar<');
d=r(d,'>Video<','>Video<');

// Right Column
d=r(d,'>hide friend updates<','>Arkadaş Güncellemelerini Kapat<');
d=r(d,'>show friend updates<','>Arkadaş Güncellemelerini Göster<');
d=r(d,'>Birthdays<','>Doğum Günleri<');
d=r(d,'>Invite Your Friends<','>Arkadaşlarını Davet Et<');
d=r(d,'>New Stuff<','>Yeni Zımbırtılar<');
d=r(d,'>The Next Step<','>Bir Sonraki Adım<');
d=r(d,'>Find Your Friends<','>Arkadaşlarını Bul<');
d=r(d,'>see all<','>Hepsini Gör<');
d=r(d,'>hide<','>Gizle<');
d=r(d,'>close<','>Kapat<');

// Bottom line
d=r(d,'>About Facebook<','>Facebook Hakkında<');
d=r(d,'>Facebook<','>Facebook<');
d=r(d,'>Advertisers<','>Reklamlar<');
d=r(d,'>Businesses<','>İş Güç<');
   d=r(d,'>Developers<','>Geliştirenler<');
   d=r(d,'>Terms<','>Şartlar<');
   d=r(d,'>Help<','>Yardım<');
  
  // Profile Page
  d=r(d,'>Networks:<','>Ağlar:<');
  d=r(d,'>Hello ','>Merhaba ');
  d=r(d,'>Hometown:<','>Memleket:<');
  d=r(d,'>Send<','>Gönder<');
  d=r(d,'>Cancel<','>Boşver<');
  d=r(d,'>Today<','>Bugün<');
  d=r(d,'>Yesterday<','>Dün<');
  d=r(d,'>Sex:<','>Cinsiyet:<');
  d=r(d,'>Interested In:<','>İlgilendiği:<');
	d=r(d,'>Political Views:<','>Politik Görüşü:<');
	d=r(d,'>Religious Views:<','>Dini Görüşü:<');
  d=r(d,'>Relationship Status:<','>İlişkisel Vaziyet:<');
  d=r(d,'>Birthday:<','>Doğum Günü:<');
 
  d=r(d,'>Mini-Feed<','>Olan-Biten<');
  d=r(d,'>Displaying ','>Gösteriliyor ');
  d=r(d,' stories<',' hikaye<');
  d=r(d,' wrote on the wall for the group ',' duvarına yazdı ');
  d=r(d,' joined the group ',' gruba katıldı ');
  d=r(d,' wrote on the wall for the event ',' duvarına olay için yazdı ');
  d=r(d,' and ',' ve ');
  d=r(d,' are now friends.',' artık arkadaş');
  d=r(d,'  has received a new ',' yeni bir  ');
  d=r(d,' commented on ',' yorumladı ');
 
  d=r(d,'>See All<','>Hepsini Gör<');
  d=r(d,'>Updated ','>Güncellendi ');
  d=r(d,'just a moment ago','az önce');
  d=r(d,'> is (?=[??????????????????????])','> ');
  d=r(d,'>Information<','>Bilgi<');
  d=r(d,'>Contact Info<','>Bağlantı Bilgileri<');
  d=r(d,'>Email:<','>E-posta:<');
  d=r(d,'>Current Town:<','>İkametgah:<');
  d=r(d,'>Website:<','>Web Sayfası:<');
  d=r(d,'>Personal Info<','>Kafa Kağıdı:<');
  d=r(d,'>Activities<','>Aktiviteleri<');
  d=r(d,'>You are online now.<','>Şimdi Çevrim i.i durumdasınız.<');
 
d=r(d,'>Education and Work<','>Eğitim ve İş<');
d=r(d,'>Friends in Other Networks<','>Başka Ağlardaki Arkadaşlar<');
  d=r(d,'>Networks with the most friends<','>En Çok Arkadaşın Bulunduğu Ağ<');
  d=r(d,'>Networks you belong to<','>Dahil Olduğunuz Ağlar<');
  d=r(d,'>Show All Networks<','>Bütün Ağları Göster<');
  d=r(d,'>View All Friends<','>Bütün Arkadaşları Göster<');
  d=r(d,'> Friends<','> Arkadaşlar<');
  d=r(d,' friends<',' arkadaşlar<');
 
  d=r(d,'>Education and Work<','>Eğitim ve İş<');
  d=r(d,'>Education Info<','>Eğitim Durumu<');
  d=r(d,'>Grad Schools:<','>Yüksekokullar:<');
  d=r(d,'>Work Info<','>İş Durumu<');
  d=r(d,'>Employer:<','>İşveren:<');
  d=r(d,'>Position:<','>Görevi:<');
  d=r(d,'>Time Period:<','>Çalışma Süresi:<');
  d=r(d,'>Description:<','>Tanımı:<');
  d=r(d,' groups<',' gruplar<');
 
  d=r(d,'>Feedheads<','>Olan-Biten Başlıkları<');
  d=r(d,'>your shared items<','>Paylaşılan Öğeleriniz<');
  d=r(d,'>Update Shared Items<','>Paylaşılan Öğeleri Güncelle<');
  d=r(d,'>App Profile<','>Uygulama Profili<');
  d=r(d,'>Top Shared<','>En Çok Paylaşılan<');
 
  d=r(d,'>Gifts<','>Hediyeler<');
 
  // Photos
  d=r(d,'>Created ','>Tasarlandı');
  d=r(d,'>Back to Album','>Albüme Geri Dön');
  d=r(d,'>From the album:','>Hangi Albümden');
  // Wall
  d=r(d,'>Back to ','>Geri Dün ');
  d=r(d,'>Displaying the only post.<','>Olan Tek Postayı Gösteriyor.<');
  d=r(d,'>Delete<','>Sil<');
 
  // News Feed
  d=r(d,'>News Feed<','>Haberler<');
  d=r(d,'>Preferences<','>Tercihler<');
  d=r(d,'>I like this<','>Cici<');
  d=r(d,'>I don\'t like this<','>Kaka<');
  d=r(d,' is attending ',' katılıyor ');
  d=r(d,' attended ',' katıldı ');

  d=r(d,'>You ignored a request from ','>Gelen isteği reddettiniz ');
 d=r(d,'>Updated:','>Güncellendi:');
 d=r(d,' of your ',' of your ');
 d=r(d,' added the ',' ekledi ');
 d=r(d,' application.<',' uygulaması.<');

// Mail page
 d=r(d,'>next<','>Sonraki<');
d=r(d,'>From: ','>Kimden: ');

d=r(d,'Facebook','Facebook');
 

 // Months
 d=r(d,'January','Ocak');
 d=r(d,'February','Şubat');
  d=r(d,'March','Mart');
  d=r(d,'April','Nisan');
d=r(d,'May','Mayıs');
d=r(d,'June','Haziran');
d=r(d,'July','Temmuz');
d=r(d,'August','Ağustos');
d=r(d,'September','Eylül');
d=r(d,'October','Ekim');
d=r(d,'November','Kasım');
d=r(d,'December','Aralık');

d=r(d,'Monday','Pazartesi');
d=r(d,'Tuesday','Salı');
d=r(d,'Wednesday','Çarşamba');
d=r(d,'Thursday','Perşembe');
d=r(d,'Friday','Cuma');
d=r(d,'Saturday','Cumartesi');
d=r(d,'Sunday','Pazar');

d=r(d,'Male','Erkek');
d=r(d,'Female','Dişi');
d=r(d,'Women','Kadınlar');
d=r(d,'Men','Erkekler');

d=r(d,'In a Relationship','İlişkisi Var');
d=r(d,'Single','Yalnız');
d=r(d,'Engaged','Nişanlı');
d=r(d,'Married','Evli');
d=r(d,'It\'s Complicated','İşleri Karışık');
d=r(d,'In an Open Relationship','Açık İlişkide');

document.body.innerHTML=d;