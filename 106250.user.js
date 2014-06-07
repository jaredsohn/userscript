// ==UserScript==
// @name            TW Pro2
// @namespace       http://userscripts.org/scripts/show/92414
// @description     TW Pro2
// @author          TW Pro2
// @website         http://scripts-o-maniacs.leforum.eu
// @include         http://*.the-west.*/game.php*
// @include         http://*.the-west.*/forum.php*
// @include         http://userscripts.org/scripts/source/92414.meta.js
// @version         3.0.0.4
// @history         Kodlar güncellendi. - Codes uptated.
// @history         Kodlar güncellendi. - Codes uptated.
// @history         3.0.0.3 Versiyon dil değişiklikleri yapıldı. - 3.0.0.3 version language changed.
// @history         3.0.0.4 Versiyon dil değişiklikleri yapıldı. - 3.0.0.4 version language changed.
// @history         Kodlar güncellendi. - Codes uptated.
// @history         Kodlar güncellendi. - Codes uptated.


twpro_lp_custom = {
info: ['1.31', '1.31 Uyumlu Türkçe Çeviri 3.0.0.1', 121212, '.w1.'],
		AUTHOR: 'Yazarlar',
		TRANSLATOR: 'Çevirmen',
		TWPRO_DISABLED: 'Script Kapatıldı: The Westin kaynak kodu degiştiği için scriptin güncellenmesi gerekiyor.',
		SORTBYNAME: '<b>İsime</b> göre sırala.',
		SORTBYXP: '<b>Tecrübeye</b> göre sırala.',
		SORTBYWAGES: '<b>Ücrete</b> göre sırala.',
		SORTBYLUCK: '<b>Şansa</b> göre sırala.',
		SORTBYCOMB: '<b>Çalışma seviyesine</b> göre sırala.',
		SORTBYDANGER: '<b>Tehlikeye</b> göre sırala.',
		SORTBYLABORP: '<b>Çalışma Puanina</b> göre sırala.',
		FILTERJOBS: "Yapamadığım çalışmalarımı gizle !",
		FILTERCLOTHING: 'Sadece seçili çalışma için en iyi giysileri göster',
		CHOOSEJOB: 'Çalışma seçiniz...',
		CALCJOB: 'Veriler hesaplanıyor, lütfen bekleyiniz...',
		INVENTSTATS: 'Envanter İstatistigi',
		SELLVALUE: 'Satış Degeri',
		OBJECTS: 'Eşyalar',
		PRODUCTS: 'Ürünler',
		TOTAL: 'Toplam',
		QUANTITIES: 'Miktar',
		LABORP: 'ÇP',
		CONSTRUCTION: ' \u25B7 Kurma',
		HPTOTAL: 'Toplam Hayat Puanı',
		STARTCALC: 'Veriler hesaplanıyor , lütfen bekleyiniz...',
		CONVERT: 'Dönüştür !',
		MULTISEL: 'Birden fazla eşya sat...',
		SELL: 'Seçili olanı sat',
		CONFIRMSELL: 'Gerçekten %1 satmak istiyor musunuz ?',
		SELLING: 'Satılıyor...',
		SALEDONE: 'Seçili eşyalar satıldı !',
		NONESELECTED: 'En az bir esya seçmeniz gerekiyor !',
		JOBRANKSETTINGS: 'Çalışma Seviyesi Ayarları',
		SEARCHINVENTORY: 'Envanterde Ara',
		NOSEARCHRESULT: 'Aradığınız %1 için hiç sonuç bulunamadı.%2Tüm eşyaları göster%3',
		DISABLEBESTFORJOB: 'Seçili aktivite için değersiz eşyalarin gizlenmesini iptal et.',
		SEARCHHELP: 'Envanteri ara. (* sifir veya daha fazla karakter için, ? bir karakter için)',
		DUELSHOOTINGATT: ' \u25B7 Atış Düellocusu (saldiran)',
		DUELSHOOTINGDEF: ' \u25B7 Atış Düellocusu (savunan)',
		DUELVIGOR: ' \u25B7 Vuruş Düellocusu',
		FORTATTACK: ' \u25B7 Kale savaşı (saldıran)',
		FORTDEFEND: ' \u25B7 Kale savaşı (savunan)',
		FORTMESSAGE: 'Katılımcılara Telgraf Gönder',
		FORTMESSAGERCP: 'Katılımcıların Sayısı',
		HIDEJOBS: 'Aktiviteler & Eşya Setleri Yönetim Merkezi',
		CONFIRM: 'Onayla !',
		HIDEJOBDESC: 'Çalışmalar buradan kapatılabilir. Otomatik hesaplanmayacak tüm aktiviteleri işaretle, ve onayla butonuna tıklamalısınız.',
		SHOWN: 'Etkin',
		HIDDEN: 'Pasif',
		SETTINGSSAVED: 'TW Pro Gelişmiş Envanter ayarları uygulandı !',
		SETTINGSSAVEDSESSION: 'TW Pro Gelişmiş Envanter ayarları uygulandı ! (Sadece bu oturum için)',
		PERSISTSETTINGS: 'Bu ayarları daha sonraki oturumları için kaydet.',
		CANNOTWEAR: 'Bu seti giyemezsiniz, ya da bu setin hesaplanmış aktivite için bir etkisi yoktur !',
		SETSETTINGS: 'Daha hızlı hesaplama için setleri kapatabilirsiniz. Özel ve gereksinim olmayan setler kapatılmıştır !',
		CUSTOMNAME: 'Aktivite için istediginiz bir isim verin !',
		CUSTOMCALCULATION: 'Geçerli TW Pro Gelişmiş Envanter hesaplamasını buraya girin.',
		CUSTOMENABLED: 'Aktiviteyi etkinleştirmek için seçili hale getirin !',
		NEW: 'Yeni',
		SPEED: ' \u25B7 Hız',
		REGENERATION: ' \u25B7 Max Hayat Puanı',
		SETSINFO: "Setler",
		WITHSETITEMS: '%1 Eşyalar ile bonus',
		LABORPOINTS: 'Çalışma Puanı',
		USEFULITEM: 'Bu sayı hesaplamada kullanılan eşya miktarını gösterir !',
		PERCREGENERATION: 'Yenilenme',
		LUCK: 'Şans',
		PRAYING: 'Dua etme',
		NOITEMSETS: "Bu set için eşyan yok !",
		AVERAGEDAMAGE: "Ortalama Hasar",
		PREFERENCES: "Seçenekler",
		DEFAULTSORTING: " \u25B7 Varsayılan Sınıflandırma",
		FBHEALTHPRIORITY: "Hayat Puanı Öncelik",
		FBHEALTHPRIORITYZERO: "Hiç",
		FBHEALTHPRIORITYLOW: "Düşük",
		FBHEALTHPRIORITYMEDIUM: "Orta",
		FBHEALTHPRIORITYHIGH: "Yüksek",
		FBHEALTHPRIORITYAUTO: "Otomatik",
		FBBATTLEUNIT: "Savaş Birim Tipi",
		FBBATTLEUNITSKIRMISHER: "Çatışan (Savulmak) | Ön Hat",
		FBBATTLEUNITLINEINFANTRYMAN: "Piyade (Çok değerli) | Orta Hat",
		FBBATTLEUNITMARKSMAN: "Nişanci (Nisan almak) | Arka Hat",
		DMGMIN: "Min",
		DMGMAX: "Mak",
		DMGAVG: "Ort",
		CHATWHISPER: "* Fısılda *\n\nOyuncu ismi giriniz",
		CHATCOLOR: "* Varsayilan renk (000-999) *\n\nRenk kodu giriniz",
		USEFULITEMS : "Etkin aktivite için tüm uygun esyalari vurgula !",
		USEFULITEMSPOPUP : " \u25B7 Kutu | Detayları ile vurgula",
		USEFULITEMSPOPUPDESC : "Bonuses by activities will be displayed on each useful item (process is a little longer).",
		SHOWALLJOBS : " \u25B7 Haritada tüm çalışmaları göster.",
		SHOWALLJOBSDESC : "Aktifleştirmek için yenileyin (F5)",
		COLLECTORMODE : " \u25B7 Toplayıcı Mod",
		COLLECTORMODEDESC : "Sahip olmadığınız eşyalar tüccarda mavi olarak gösterilir.",
		HELP : "YARDIM",
		WEBSTORAGEQUOTAEXCEEDED : "Web Depolama kotası aşıldı!\n\n- Geçerli veriler eksiklik olacaktır.\n- Önbellek otomatik olarak devredışı edildi.\n- Lütfen bu sunucudaki bazı hesapların önbelliğini boşaltın, Yerel Depolama kotası limitini arttırın. (Firefox ve Opera'da mümkündür !).",
		CACHEGENERATE : "Önbellek oluştur...",
		CACHEGENERATENOW : "Şimdi önbellek oluşturmak istiyor musunuz?",
		CACHEINVENTORYCHANGES : "Envanter değişikliği tespit edildi.",
		CACHEGENERATECLICK : "Yeni önbellek oluşturmak için tıklayınız.",
		CACHENEWITEMS : "Yeni Eşyalar",
		CACHEDELETEDITEMS : "Silinen Eşyalar",
		CACHESKILLSCHANGES : "Yetenek değişiklikleri tespit edildi.",
		CACHEJOBSAFFECTED : "Çalışmalar Etkilendi !",
		CACHEISEMPTY : "Önbellek boş.",
		CACHEINITIALIZE : "Başlatmak için buraya tıklayınız.",
		CACHEOK : "Önbellek TAMAM.",
		CACHEREWRITE : "Gerektiğinde buraya tıklayarak verileri yeniden yazabilirsiniz.",
		CACHEEMPTYING : "Önbellek boşaltılıyor...",
		CACHENORMALMODE : "TW Pro Normal mod aşamasında.",
		CACHEDISABLED : "Önbellek devredışı.",
		CACHEOPENSETTINGS : "TW Pro Ayarlarını etkinleştirme açık.",
                CACHENEWJOBDETECTED : "Yeni çalışma tespit edildi: %1<br>Veritabanını güncellemek için yeniden oluşturun.",     /*Kırmızı mesaj kutusu için de gösterilir oyuna yeni çalışmalar eklendi.*/
		CACHEENABLE : " \u25B7 TW Pro önbellek açık.",
		CACHEINDEXEDDBNOT : "IndexedDB tarayıcın tarafından desteklenmiyor !",
		CACHEINDEXEDDBDESC : "Ultra hızlı işlem. Firefox 4+ sürümler ve Chrome 11+ sürümler tavsiye edilir.",
		CACHECOMPATIBILITY : "Uyumluluk Bilgileri",
		CACHEQUOTAS : "Kota Bilgileri",
		CACHEQUOTASDESC : "<b>Tarayıcının Web Depolama (Yerel Depolama) limitlerini bilmek için 'Kota Bilgilerine' tıklayın.<br>"
				  +"<br>Yerel Depolama limitlerini nasıl arttırırsın?</b><br>"
				  +"<b>- Mozilla Firefox :</b><br>"
				  +"Adres çubuğuna 'about:config' yazıp giriniz ve 'dom.storage.default_quota' seçeneğini arayınız.<br>"
				  +"Bu kilobyte değeridir, onu değiştirebilirsiniz. Saklama alanı sunucu dili tarafından paylaşılır,<br>"
				  +"aynı sunucu üzerindeki hesap başına 1500 kB gerekir.<br>"
				  +"<b>- Chrome:</b><br>"
				  +"Kotaları ayarlamak mümkün değildir !<br>"
				  +"<b>- Opera:</b><br>"
				  +"Varsayılan olarak tarayıcın gerektiğinde limitleri arttırmak isteyecektir. Ancak yapabilirsin<br>"
				  +"adres çubuğuna 'opera:webstorage' yazıp giriniz ve her alan için ayarları elle değiştirin.<br>"
				  +"Bu kilobyte değeridir.Saklama dünya tarafından paylaşılır (alan bazlı), 3000 kB gerekir<br>"
				  +"aynı dünya üzerindeki hesap başına.<br>"
				  +"<b>- Safari:</b><br>"
				  +"Kotaları ayarlamak mümkün değildir !",
		CACHEEMPTY : "TW Pro önbelliğini boşalt.",
		CACHEEMPTYDESC : "Kurtarma aracı. Veri tutarsızlığı durumunda ağırlıklı kullanılacak.",
		CACHEWEBSTORAGEDESC : "Hızlı işlem. Kota depolama limitleri ancak en güncel tarayıcılar tarafından desteklenir.",
		CACHEEMPTYNOW : "Bu önbelleği şimdi boşaltmak istiyor musunuz?",
		CACHERECORDS : "kayıtlar",
		CACHEEMPTIED : "Önbellek boşaltıldı!",
		CACHERECORDSDELETED : "kayıtlar silindi.",
		CACHEEMPTYSLOWDESC : "İşlem esnasında oynayabilirsiniz.",
		CACHEEMPTYFASTDESC : "Daha hızlı ama tarayıcı işlem esnasında takılabilir.",
		CACHEFASTMODE : "Hızlı Mod",
		NORMALMODE : "Normal Mod",
		FBCOMBOFAVORITE : "Favori",
		FBCOMBOGENERATE : "Tüm kale savaşı kombinasyonlarını oluştur.",
		FBCOMBODESC : "Bu açılır menüye 30 çalışma ekleyecek, ancak daha sonra bu sekmeden bunları yönetmek mümkün:",
		FBCOMBONORMALDESC : "Açılır menüde normal çalışma kombinasyonlarını göster.",
		FBCOMBOSUBMENUS : "Alt menü modu",
		FBCOMBOSUBMENUSDESC : "Başlıca kale savaşı çalışmalarının kombinasyonlarını alt menü olarak göster.",
		FBCOMBOHELPDESC : "<b>Açılır menü açık olduğunda:</b><br>- Saldırı kombinasyonlarının alt menüsünü genişletmek için [1] e basın.<br>- Savunma kombinasyonlarının alt menüsünü genişletmek için [2] ye basın.<br>- Her iki alt menüyü genişletmek için [Space] e basın.",
		FBCOMBOMOZTIP : "Firefox kullanıcıları başlıca Kale Savaşı çalışmalarını açılan menüdeki<br>ilgili alt menüye sağ tıklayarak genişletebilirsiniz.",
		SAFEMODE : " \u25B7 Güvenli modu etkin yap",
		SAFEMODEDESC : "Tarayıcınız için hesaplama işlemi yavaşlar fakat askıya alma, takılma ve tarayıcınızın çökme gibi durum sorunu olmaz.",
		SAFEMODEFBEXCL : "Kale savaşı ayarlarını elle kullanırken ve ayarlarken güvenli modu çalıştırmayınız.",
		SAFEMODERUNNING : "Güvenli mod etkinleşiyor...",
		SAFEMODERUNNINGDESC : ["Bu işlem sırasında:", "- Envanterinizi kapatmayınız ve herhangi bir yenileme yapmayınız.", "- Eşya alımı ve satımı yapmayınız", "- Eşyanızı karakterinizin üstüne giydirmeyiniz veya çıkarmayınız", "- Yetenekler de herhangi bir değişiklik yapmayınız", "Tamam, dikkate alacağım. Şimdi envanterimizi görebiliriz..."],
                SAFEMODECOMPLETED : "Güvenli mod tamamlandı!",     /*Yeşil mesaj kutusu olarak gösterilir at the end of the Safe mode process. Also visible in the blinking browser tab.*/
		ACTIVITIES : "Çalışmalar",
		ITEMS : "Eşyalar",
		ITEMSETSCOMBI : "Set kombinasyonları",
		TESTSRUN : "Yapılan testlerin sayısı.",
		CALCTIME : "Hesaplama süresi",
		AREYOUSURE : "Bunu yapmak istediğinizden emin misiniz?",
};
// ==/UserScript==