// ==UserScript==
// @name        PPM 2 Easy Shopper
// @namespace   popmundo
// @description What were we doing before google ? Supports only US English and Turkish for now.
// @match       http://*.popmundo.com/World/Popmundo.aspx/Character/ShoppingAssistant
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.4
// ==/UserScript==
function shoplibrary_tr () {
	shop_tr = new Array();
	shop_tr.push('["1. Enstr\xFCmanlar", "199.Akordiyon", "1.Akustik Gitar", "194.Gayda", "159.Banjo", "23.Bas Gitar", "748.\xC7an", "196.\xC7ello", "913.Chapman Gitar\u0131", "192.Klarnet", "197.Kontrbas", "161.DJ \u0130kiz-Turntable Sistemi", "188.Dobro Gitar", "14.Davul", "202.Santur", "476.Elektro Gitar", "155.Fl\xFCt", "191.Darbuka", "160.M\u0131z\u0131ka", "186.Harp", "190.Klavsen", "146.Klavye", "189.Ud", "185.Mandolin", "18.Mikrofon", "198.Obua", "200.Pan Fl\xFCt", "162.Piyano", "150.Saksafon", "502.Trombon", "15.Trompet", "195.Tuba", "193.Ukulele", "151.Keman", "187.Ksilofon", "201.Kanun"]');
	shop_tr.push('["2. K\u0131yafet", "1107.\xD6nl\xFCk (Tam)", "1108.\xD6nl\xFCk (Bel)", "1322.Balerin ete\u011Fi", "557.Bornoz", "561.Kemer", "1066.Yang\u0131n tulumu", "1070.Papyon", "300.Gelinlik", "1296.H\u0131rka", "1339.\xC7ocuk kost\xFCm\xFC", "568.Pelerin", "558.Palto", "1343.Kost\xFCm", "685.Elbise", "1354.Elbise g\xF6mlek", "20.Eldiven", "64.Kap\xFC\u015Fonlu Ceket", "590.\u0130sko\xE7 ete\u011Fi", "1050.Kimono", "44.Mini etek", "1299.Gecelik", "563.Ceket", "279.Polo G\xF6mlek", "940.Popmundo T-Shirt\xFC", "1298.Pijama \xFCst\xFC", "1065.Yar\u0131\u015F tulumu", "1182.C\xFCbbe", "562.Atk\u0131", "564.Etek", "1179.\xC7oraplar", "690.Turistik Hediyelik Ti\u015F\xF6rt", "1051.Tak\u0131m ceket", "588.S\xFCveter", "569.Ask\u0131l\u0131 T-Shirt", "559.Kravat", "39.Dar Bayan \xDCst", "684.Havlu", "565.T-Shirt", "560.T\xFCnik", "955.Bo\u011Fazl\u0131 Kazak", "1231.Smokin cekedi", "1053.Yelek"]');
	shop_tr.push('["6. Kitaplar", "629.\u0130leri M\xFChendislik", "671.Geli\u015Ftirilmi\u015F Havai Fi\u015Fek G\xF6sterileri", "697.\u0130leri Pedagoji", "612.\u0130leri Farmakoloji", "626.\u0130leri Fen", "637.Aikido Ustal\u0131\u011F\u0131", "674.Seyirci Bilinci", "496.Geri Vokal", "1079.Pastac\u0131l\u0131\u011F\u0131n Kutsal El Kitab\u0131", "545.Temel Oyunculuk", "935.Temel Hayvan E\u011Fitimi", "541.Temel Sanat ve Dizayn", "645.Temel Astroloji", "509.Temel Botanik", "171.Temel Bak\u0131r \xDCflemeli \xC7alg\u0131lar", "101.Temel Sahne Duru\u015Fu ", "677.Temel Kimya", "455.Temel Komedi", "110.Temel Bestecilik ", "676.Temel Bilgisayar Bilgisi", "99.Temel Dans\xE7\u0131l\u0131k ", "499.Temel Dedektiflik", "936.Temel K\u0131l\u0131k De\u011Fi\u015Ftirme", "139.Temel Ekonomi ", "163.Temel Elektronik Enstr\xFCmanlar", "628.Temel M\xFChendislik", "97.Temel Moda ", "926.Temel Ate\u015Fli Silahlar", "661.Temel \u0130tfaiyecilik", "604.Temel \u0130ll\xFCzyonizm ", "131.Temel Kama Sutra", "172.Temel Klavye Enstr\xFCmanlar\u0131 ", "140.Temel Hukuk ", "623.Temel Liderlik", "100.Temel S\xF6z Yaz\u0131m\u0131 ve \u015Eairlik", "89.Temel Makyaj", "462.Temel D\xF6v\xFC\u015F Sanatlar\u0131", "88.Temel Medya Y\xF6netimi ", "141.Temel T\u0131p ", "96.Temel Mankenlik ", "91.Temel Vurmal\u0131 Enstr\xFCmanlar", "524.Temel Foto\u011Fraf\xE7\u0131l\u0131k", "938.Temel Politika", "939.Temel Psikoloji", "106.Temel Alb\xFCm Yap\u0131mc\u0131l\u0131\u011F\u0131 ", "454.Temel Din", "415.Hitabet Temelleri", "625.Temel Fen", "751.Temel Diki\u015F", "102.Temel Seksapel", "95.Temel \u015Eovmenlik", "157.Temel \u015Eark\u0131 S\xF6yleme ", "670.Temel \xD6zel Efektler", "464.Temel Sokak Bilgisi", "170.Temel Telli Enstr\xFCmanlar ", "696.Temel \xD6\u011Fretmenlik", "169.Temel Tahta \xDCflemeli \xC7alg\u0131lar", "453.Temel Yoga", "929.Motorlu El Aletleri Kullanman\u0131n Temeli", "1226.Biyokimya 101", "669.Profesyoneller i\xE7in Breakdans", "666.Ejderha gibi Ate\u015F P\xFCsk\xFCrtmek", "1227.Peynircili\u011Fin \xD6z\xFC", "472.Mar\u015F Besteleme", "468.T\xFCrk\xFC Besteleme ", "473.Halk\u0131 Co\u015Fturan M\xFCzik Besteleme", "471.Kolay Dinlenen M\xFCzik Besteleme ", "470.Dans M\xFCzi\u011Fi Besteleme ", "475.M\xFCzisyenlere Hitap Eden M\xFCzik Besteleme", "474.Basit M\xFCzik Besteleme ", "469.Dile Dolanan M\xFCzik Besteleme", "533.Yemek Kitab\u0131", "971.Distilasyon 101", "597.DNA Analizi", "799.Herkes i\xE7in B\xF6cekbilim", "680.\xC7evre M\xFChendisli\u011Fi", "1024.G\xFCn\xFCm\xFCz \xC7ift\xE7ili\u011Fi", "598.Parmakizi Tan\u0131ma", "1220.Bal\u0131k\xE7\u0131l\u0131k", "638.Yumruk D\xF6v\xFC\u015F\xFCn\xFCn Temelleri", "675.Halk Oyunlar\u0131", "549.Graffiti Boyama ", "1353.\u015Eapkac\u0131n\u0131n Kutsal Kitab\u0131", "543.Afrika M\xFCzi\u011Fi Tarihi", "409.Blues tarihi", "410.Klasik M\xFCzik tarihi", "183.Country &amp; Western tarihi", "177.Elektronika tarihi", "544.Flamenko Tarihi", "175.Heavy Metal tarihi", "179.Hip Hop tarihi", "184.Caz tarihi", "542.Latin M\xFCzik Tarihi", "174.Modern Rock tarihi", "178.Pop tarihi", "176.Punk Rock tarihi", "180.R&amp;B tarihi", "181.Reggae tarihi", "173.Rock tarihi", "182.World Music tarihi", "596.G\xF6r\xFCnt\xFC Analizi", "640.Kung Fu Ustal\u0131\u011F\u0131", "495.Solist Vokal ", "672.I\u015F\u0131k B\xFCy\xFCs\xFC", "722.Yeni Ba\u015Flayanlar i\xE7in Dilbilim", "1040.Puro \xFCretimi", "463.Jujutsu Ustal\u0131\u011F\u0131", "668.Dans\xE7\u0131lar i\xE7in Moonwalk", "546.Sinemac\u0131l\u0131k", "667.Do\u011Fa\xE7lama M\xFCzik Kitab\u0131", "927.Paranormal Takip Cihazlar\u0131", "1156.Ebeveynin El Kitab\u0131", "660.Parti D\xFCzenleme", "505.Farmakoloji", "519.Akordiyon \xC7al", "477.Gayda \xC7al", "164.Banjo \xE7al", "167.Bas Gitar \xE7al", "480.\xC7ello \xC7al ", "914.Chapman Gitar\u0131 \xC7al", "479.Klarnet \xC7al ", "481.Kontrbas \xC7al ", "478.Dobro \xC7al ", "482.Davul \xC7al ", "483.Santur \xC7al", "494.Elektro Gitar \xC7al ", "156.Fl\xFCt \xE7al", "484.Darbuka \xC7al ", "90.Akustik gitar \xE7al", "165.M\u0131z\u0131ka \xE7al", "485.Harp \xC7al ", "486.Ud \xC7al ", "487.Mandolin \xC7al ", "488.Obua \xC7al ", "489.Pan Fl\xFCt \xC7al ", "92.Piyano \xE7al", "166.Saksafon \xE7al", "503.Trombon \xC7al", "94.Trompet \xE7al", "490.Tuba \xC7al ", "491.Ukulele \xC7al ", "93.Keman \xE7al", "492.Ksilofon \xC7al ", "493.Kanun \xC7al ", "448.Profesyonel Muhasebecilik", "634.Profesyonel Komedi", "949.Profesyonel Dans\xE7\u0131l\u0131k", "950.Profesyonel G\xF6rg\xFC Kurallar\u0131", "606.Profesyonel \u0130ll\xFCzyonizm", "501.Profesyonel T\u0131p", "643.Profesyonel \u015Eairlik", "456.Profesyonel Halkla \u0130li\u015Fkiler", "624.Profesyonel Hitabet", "951.Profesyonel \u015Eovmenlik", "547.Profesyonel Veterinerlik", "458.D\xFCzg\xFCn Alkol Kullanma", "551.Rap\xE7ilik", "673.\xC7a\u011F\u0131rma Rit\xFCeli", "665.Erotik Dans\u0131n S\u0131rlar\u0131", "691.\xD6zel Silahlar ve Taktikler", "664.Sahne Dal\u0131\u015F\u0131", "709.Yeni Ba\u015Flayanlar i\xE7in Gizlilik", "630.Sokak Bilimi", "1072.Kaz\u0131ma Sanat\u0131", "1076.T\xFCt\xFCn Kimyas\u0131", "948.Turntable Teknikleri", "693.Gizli operasyonlar"]');
	shop_tr.push('["7. M\xFCcevherat", "581.Bilezik", "912.Ni\u015Fan y\xFCz\xFC\u011F\xFC", "580.Kolye", "575.Y\xFCz\xFCk, B\xFCy\xFCk", "576.Y\xFCz\xFCk, K\xFC\xE7\xFCk", "573.Saat"]');
	shop_tr.push('["10. Ayakkab\u0131lar", "1324.Bale ayakkab\u0131s\u0131", "584.Bot", "704.Diz boyu \xE7izme", "236.Kovboy \xE7izmeleri", "235.Disko ayakkab\u0131lar\u0131", "603.Parmakaras\u0131 Terlik", "1376.Makosen ayakkab\u0131", "48.Asker botlar\u0131", "287.Maymun Terlikler", "365.Ay botlar\u0131", "1067.Yar\u0131\u015F ayakkab\u0131lar\u0131", "583.Sandalet", "585.Ayakkab\u0131", "60.Y\xFCksek topuklu ayakkab\u0131", "582.Ba\u011Fc\u0131kl\u0131 ayakkab\u0131", "65.Spor ayakkab\u0131", "1335.Lastik \xE7izme"]');
	shop_tr.push('["13. Oyuncaklar", "283.Beyzbol Topu", "280.Basket topu", "133.CD Alb\xFCm", "134.CD Single", "1181.Palya\xE7o burnu", "1046.Boyama kitab\u0131", "1045.Pastel boya", "312.\u0130skambil ka\u011F\u0131tlar\u0131", "311.Oyuncak Bebek", "281.Amerikan Futbol Topu", "282.Futbol Topu", "1259.Parlayan \xE7ubuk", "168.Halloween Canavar Maskesi", "1377.Hulahop", "302.Karaoke", "1348.P\u0130NG! diye ses \xE7\u0131karan cihaz", "555.B\xFCy\xFCte\xE7", "720.Maske", "297.MP3 \xE7alar", "250.Piknik sepeti", "657.Pinyata", "591.Paten", "1375.Rubik K\xFCp\xFC", "306.Kaykay", "206.K\xFC\xE7\xFCk havai fi\u015Fek kutusu", "305.Snowboard", "1351.Sahne makyaj seti", "689.Kalitesiz Hediyelik Minyat\xFCr", "310.Ay\u0131c\u0131k", "304.Oyuncak kelep\xE7e", "1356.Oyuncak tabanca", "1355.Oyuncak k\u0131l\u0131\xE7", "956.Sevgililer G\xFCn\xFC Kart\u0131", "303.Kam\xE7\u0131", "646.Bur\xE7"]');
	shop_tr.push('["22. K\u0131yafet (\u015Fapka)", "1084.\u015Eefin \u015Fapkas\u0131", "73.Bandana", "52.Baseball \u015Fapkas\u0131", "1054.Bowler \u015Fapka", "567.\u015Eapka", "531.Kovboy \u015Eapkas\u0131", "371.Frans\u0131z bere", "271.Sa\xE7 band\u0131", "1323.Kask", "1352.\u015Eapka", "1044.Yar\u0131\u015F kask\u0131", "1184.Sombrero", "229.Y\xFCksek \u015Fapka", "708.Peruk", "1360.\xC7elenk"]');
	shop_tr.push('["24. K\u0131yafet (pantolon)", "1327.Tulum", "272.Bisiklet\xE7i \u015Fortu", "1334.\u015Eort mayo", "1183.Ba\u011Fc\u0131kl\u0131 Pantolon", "43.Dar, mini \u015Fort", "25.Kot pantolon", "586.Golf Pantolonu", "587.Pantolon", "566.Pantolon, Bol", "556.Pantolon, Dar", "1297.Pijama alt\u0131", "1052.Tak\u0131m pantolon", "40.Tayt", "1232.Smokin pantolonu"]');
	shop_tr.push('["25. K\u0131yafet (i\xE7 \xE7ama\u015F\u0131r\u0131)", "707.Bikini", "570.Boxer", "705.S\xFCtyen", "571.Slip", "636.Korse", "1068.File \xE7orap", "1359.Jartiyer", "286.Babaanne i\xE7 \xE7ama\u015F\u0131r\u0131", "285.Dede i\xE7 \xE7ama\u015F\u0131r\u0131", "284.G-String \u0130\xE7 \xC7ama\u015F\u0131r\u0131", "1180.K\xFClot", "58.K\xFClotlu \xE7orap"]');
	shop_tr.push('["27. Ev hayvanlar\u0131", "378.Timsah", "389.Kanarya", "375.Kedi", "385.K\xF6pek (Beagle)", "384.K\xF6pek (Chihuahua)", "382.K\xF6pek (Cocker Spaniel)", "374.K\xF6pek (Greyhound)", "383.K\xF6pek (Labrador)", "386.K\xF6pek (Rottweiler)", "589.Fil", "379.Guinea Pig", "376.Hamster", "381.At", "380.Maymun", "695.Panda", "377.Papa\u011Fan", "387.Domuz", "1383.C\xFCce Jerboa", "388.Tav\u015Fan"]');
	shop_tr.push('["31. Ara\xE7 par\xE7alar\u0131", "437.Tamir Tak\u0131m\u0131", "435.Yedek Lastik"]');
	shop_tr.push('["32. Hoparl\xF6rler", "434.Hoparl\xF6r 1000Watt", "432.Hoparl\xF6r 100Watt", "418.Hoparl\xF6r 2000Watt", "433.Hoparl\xF6r 300Watt", "419.Hoparl\xF6r 500Watt"]');
	shop_tr.push('["33. I\u015F\u0131klar", "428.Medium Rack 5000W", "427.Small Rack 2500W", "429.Supersize Rack 7500W"]');
	shop_tr.push('["34. Sahne Dekoru", "425.Grup Logolu Arka Plan", "426.Grup Logolu Arka Plan, Dev"]');
	shop_tr.push('["35. Sahne y\xFCksek teknolojisi", "431.Plazma Ekran", "430.Projekt\xF6r", "416.Stroboskop"]');
	shop_tr.push('["36. Sahne efektleri", "422.Baloncuk makinesi 250W", "424.K\xF6p\xFCk Makinesi 2000W", "438.Duman Makinesi 500W", "421.Thunder Stormer 4000W"]');
	shop_tr.push('["37. Subwooferlar", "22.Subwoofer 1000W", "420.Subwoofer 2000W", "417.Subwoofer 500W"]');
	shop_tr.push('["38. Kontrol sistemleri", "442.\u0130leri I\u015F\u0131k Kontrol Sistemi", "444.\u0130leri Ses Mix Masas\u0131", "445.Deluxe Ses Mix Masas\u0131", "447.B\xFCy\xFCk Monit\xF6r Speaker", "441.Basit I\u015F\u0131k Kontrol Sistemi", "443.Basit Ses Mix Masas\u0131", "446.K\xFC\xE7\xFCk Monit\xF6r Speaker"]');
	shop_tr.push('["42. Elektronik", "523.Foto\u011Fraf Makinesi", "525.Foto\u011Fraf Filmi (35 mm)", "529.Foto\u011Fraf Filmi (80 mm)", "527.Foto\u011Fraf Filmi (Polaroid Makine)", "528.Orta Format Foto\u011Fraf Makinesi (80 mm)", "659.Yang\u0131n alarm\u0131", "526.Polaroid Makine", "1385.Diz\xFCst\xFC bilgisayar", "553.Sessiz H\u0131rs\u0131z Alarm\u0131", "1387.Masa\xFCst\xFC bilgisayar\u0131", "1361.Kamera"]');
	shop_tr.push('["51. Aletler", "1008.Eski f\u0131\xE7\u0131", "783.Hayvan Kafesi", "1060.Biberon", "1285.Sepet", "1026.Ar\u0131 kovan\u0131", "1028.Ar\u0131c\u0131 \u015Fapkas\u0131", "1266.D\xFCrb\xFCn", "1265.P\xFCrm\xFCz", "1025.Tahta", "1312.Bombilla", "1023.Kova", "1143.Kasap b\u0131\xE7a\u011F\u0131", "1089.Ya\u011F g\xFC\u011F\xFCm\xFC", "747.Mum", "744.Baston", "928.Elektrikli Testere", "963.Chaveta", "958.Gezici Kimya Laboratuvar Tak\u0131m\u0131", "1048.Sahan", "1373.Selobant", "1269.Olta", "770.Fener", "1164.T\xFCts\xFC kab\u0131", "1163.Tava", "1254.Izgara", "766.\xC7eki\xE7", "1049.Nargile", "749.T\xFCts\xFC", "789.B\xF6cek A\u011F\u0131", "768.\xDCt\xFC", "1029.Kavanoz", "957.\xC7aydanl\u0131k", "1280.Mutfak \u015F\u0131r\u0131ngas\u0131", "719.B\u0131\xE7ak", "532.Kement", "905.De\u011Firmen", "890.Kazma", "1037.T\u0131rm\u0131k", "1245.K\u0131zart\u0131c\u0131", "1378.Sigara sarma ka\u011F\u0131d\u0131", "767.Tornavida", "759.Diki\u015F makinesi", "970.\u0130mbik", "737.Bavul", "1372.\u0130svi\xE7re Ordu \xC7ak\u0131s\u0131", "1246.Termometre", "764.Ekmek K\u0131zartma Makinesi", "1257.Tuvalet ka\u011F\u0131d\u0131", "738.Sand\u0131k", "1061.\u015Eemsiye", "765.Elektrikli S\xFCp\xFCrge", "1230.\xC7\u0131rp\u0131"]');
	shop_tr.push('["52. Ara\xE7lar", "681.Hava Kirlili\u011Fi Dedekt\xF6r\xFC", "682.Akifer Kapasite Sorgulama Paketi", "683.Akifer Kalite Sondas\u0131", "995.K\xF6m\xFCr", "954.\xD6zel Boyama", "960.Distile su", "920.Kulak T\u0131kac\u0131", "436.Yang\u0131n S\xF6nd\xFCrme T\xFCp\xFC", "678.Benzin bidonu", "746.Bez"]');
	shop_tr.push('["55. Sanat Malzemeleri", "67.Sprey", "71.Bask\u0131 Kal\u0131b\u0131"]');
	shop_tr.push('["56. Makyaj", "59.Basit Makyaj seti"]');
	shop_tr.push('["58. Aksesuarlar", "1059.Battaniye", "578.K\xFCpe, B\xFCy\xFCk", "577.K\xFCpe, K\xFC\xE7\xFCk", "579.K\xFCpe, Pejm\xFCrde", "1195.G\xF6zl\xFCk", "1258.Otri\u015F", "1393.Mendil", "574.Burun M\xFCcevheri", "700.Rozet", "244.Rozet (Say NO to violence)", "277.Dikenli bileklik", "572.G\xFCne\u015F G\xF6zl\xFC\u011F\xFC"]');
	shop_tr.push('["60. Do\u011Fal \xDCr\xFCnler", "1349.T\xFCy"]');
	shop_tr.push('["61. Hayvanlar", "867.Kar\u0131ncayiyen", "1300.Antilop", "877.Armadillo", "742.Yarasa", "740.Kunduz", "1055.Boa y\u0131lan\u0131", "1142.Bo\u011Fa", "881.Deve", "735.\u015Eempanze", "1150.Akbaba", "1149.Puma", "714.\u0130nek", "716.Karga", "781.Geyik", "775.Dingo", "733.Kartal", "785.Emu", "787.\u015Eahin", "1295.Gelincik", "1302.Tilki", "792.Kurba\u011Fa", "736.Jibon", "1139.Teke", "1138.Di\u015Fi Ke\xE7i", "878.Kirpi", "1041.Tavuk", "1151.Sinek ku\u015Fu", "885.Da\u011F Ke\xE7isi", "866.Jaguar", "773.Kanguru", "776.Koala", "882.Lama", "727.Aslan", "1056.Kertenkele", "879.K\xF6stebek", "883.Amerikan Geyi\u011Fi", "1303.Semender", "1057.Ocelot", "1286.Deve ku\u015Fu", "1152.Susamuru", "1239.Erkek domuz", "1238.Di\u015Fi domuz", "786.Ornitorenk", "774.Opossum", "741.Rakun", "743.S\u0131\xE7an", "1043.Horoz", "880.Fok", "1140.Di\u015Fi Koyun", "1141.Ko\xE7", "1058.Tembel hayvan", "784.Sincap", "391.Tapir", "868.Tukan papa\u011Fan\u0131", "1078.Kaplumba\u011Fa", "1321.Kurt", "788.Kutup Porsu\u011Fu"]');
	shop_tr.push('["62. B\xF6cekler", "797.Kar\u0131nca", "897.Kar\u0131ncaaslan\u0131", "796.Ar\u0131", "795.Karab\xF6cek", "802.B\xF6cek", "790.Kelebek", "895.Su kelebe\u011Fi", "804.T\u0131rt\u0131l", "900.K\u0131rkayak", "807.Hamamb\xF6ce\u011Fi", "891.C\u0131rc\u0131r b\xF6ce\u011Fi", "732.Yusuf\xE7uk", "894.Kula\u011Faka\xE7an", "896.Pire", "800.Sinek", "794.\xC7ekirge", "898.Dantelkanat", "806.Bit", "849.Kurt\xE7uk", "899.Mantispidis", "798.Peygamberdevesi", "731.Sivri sinek", "805.G\xFCve", "893.Su biti", "809.Akrep", "892.G\xFCm\xFC\u015F\xE7\xFCn", "791.\xD6r\xFCmcek", "801.Dal B\xF6ce\u011Fi (Phasmatodea)", "808.Termit", "824.Kene", "803.E\u015Fek Ar\u0131s\u0131", "793.Solucan"]');
	shop_tr.push('["63. Bitkiler", "974.Agave", "1091.Badem", "983.Anason", "979.Elma", "1110.Kay\u0131s\u0131", "1256.Patl\u0131can", "1129.Muz", "814.Fesle\u011Fen", "1194.Fasulye", "830.Kay\u0131n", "1187.Kara biber", "1128.Yaban mersini", "1318.Lahana", "820.Kakao", "1016.Karaman kimyonu", "829.Horoz \u0130bik \xC7i\xE7ekli Mercan A\u011Fac\u0131", "855.Papatya", "1014.Kiraz", "839.Kestane", "1278.Nohut", "1196.Ac\u0131 biber", "1304.\xC7in sar\u0131msa\u011F\u0131", "826.Yaban \xFCz\xFCm\xFC (mor)", "1010.Tar\xE7\u0131n", "1148.Karanfil", "833.Yonca", "821.Koka", "1011.Hindistan cevizi", "850.Kahve Tohumu", "1287.Ki\u015Fni\u015F", "843.Peygamber \xC7i\xE7e\u011Fi", "856.Karahindiba", "817.Okaliptus", "869.\xC7uha \xE7i\xE7e\u011Fi", "857.Rezene", "818.E\u011Freltiotu", "819.Sar\u0131msak", "1085.Zencefil", "1134.Ginseng", "975.\xDCz\xFCm", "841.Guava \xC7ile\u011Fi", "836.\xC7an \xC7i\xE7e\u011Fi", "1096.F\u0131nd\u0131k", "835.S\xFCp\xFCrge Otu", "847.Kenevir", "859.Hatmi \xE7i\xE7e\u011Fi", "822.G\xFClhatmi", "1031.\u015Eerbet\xE7iotu", "813.S\xFCmb\xFCl", "853.Nane", "838.S\xFCsen", "860.Yasemin", "861.Ard\u0131\xE7", "852.Defne", "840.Lavanta", "1119.Limon", "862.Limon otu", "782.Zambak", "831.M\xFCge", "1317.Misket limonu", "825.Yaban \xFCz\xFCm\xFC (k\u0131rm\u0131z\u0131)", "863.Meyan k\xF6k\xFC", "828.Nil\xFCfer", "1017.M\u0131s\u0131r", "823.Adamotu", "1268.Yaban keki\u011Fi", "1315.Marula", "1222.Mentha", "1155.\xD6kseotu", "1133.Hardal tohumu", "864.Is\u0131rgan otu", "865.Muskat", "1240.Portakal", "811.Orkide", "1305.Keklikotu", "1224.Maydanoz", "1261.Bezelye", "1087.F\u0131st\u0131k", "1116.Armut", "1121.Pecan", "851.Biber", "827.\xC7am Kozala\u011F\u0131", "1250.\xC7am f\u0131st\u0131\u011F\u0131", "1158.Ananas", "845.Erik", "842.Ha\u015Fha\u015F \xE7i\xE7e\u011Fi", "1125.Bal Kaba\u011F\u0131", "1114.Ahududu", "870.Riberry", "810.G\xFCl", "1293.Ku\u015Fburnu", "837.Sedef Otu", "1260.Safran", "1281.Yosun", "871.Susam", "1035.S\xFCp\xFCrge Dar\u0131s\u0131", "1111.\xC7ilek", "1005.\u015Eekerkam\u0131\u015F\u0131", "815.Ay\xE7i\xE7e\u011Fi", "834.Tabebuia", "872.Soya", "1063.\xC7ay yapraklar\u0131", "812.Devedikeni", "1309.Kekik", "965.T\xFCt\xFCn", "844.Lale", "1253.\u015Ealgam", "873.Kedi otu", "1090.Vanilya", "1102.Ceviz", "874.Wasabi", "875.A\xE7elya"]');
	shop_tr.push('["65. Kimyasallar", "1225.Bakteri k\xFClt\xFCr\xFC", "1288.Bitkisel distilat", "1294.Ka\u015F\u0131nt\u0131 tozu", "1136.Rennet", "888.Sodyum Karbonat"]');
	shop_tr.push('["66. A\u011Fa\xE7lar", "858.Mabet yapra\u011F\u0131", "816.Mersin a\u011Fac\u0131", "832.Me\u015Fe"]');
	shop_tr.push('["67. Silahlar", "694.Av t\xFCfe\u011Fi", "698.T\xFCfek Kovanlar\u0131", "919.Zombi takip cihaz\u0131"]');
	shop_tr.push('["68. Bakkaliye", "1235.Hayvan ba\u011F\u0131rsa\u011F\u0131", "1082.Kabartma tozu", "1021.Arpa", "1100.Ekmek", "1088.Tereya\u011F\u0131", "357.Pasta kremas\u0131", "1137.Peynir", "1171.Pul biber", "1112.\xC7ikolata", "1316.Hindistan cevizi s\xFCt\xFC", "1244.Kahve (kavrulmu\u015F)", "1249.\xC7e\u015Fni", "1042.Yumurta", "1081.Un", "1123.G\u0131da boyas\u0131", "1175.Sar\u0131msak sosu", "1120.Jelatin", "1154.F\u0131nd\u0131kl\u0131 \xC7ikolata Macunu", "1027.Bal", "1241.Re\xE7el", "1237.Domuz ya\u011F\u0131", "1022.Malt", "1105.Badem ezmesi", "1263.Mascarpone", "1229.Mayonez", "1069.S\xFCt", "1135.Hardal", "1172.\u015Eehriye", "1086.Yulaf unu", "1101.Zeytin ya\u011F\u0131", "1248.\u0130talyan makarnas\u0131", "1153.F\u0131st\u0131k ezmesi", "1242.Pektin", "1094.Pi\u015Fi", "1189.Pudra \u015Fekeri", "1331.Konserve bal\u0131k", "1083.Kuru \xFCz\xFCm", "981.Pirin\xE7", "1020.\xC7avdar", "1092.Tuz", "1319.Sauerkraut", "1234.Sosis", "959.Susam Ya\u011F\u0131", "1255.Ek\u015Fi krema", "1330.Ek\u015Fi hamur", "1176.Soya sosu", "1290.Ni\u015Fasta", "1146.\u0130\xE7 ya\u011F\u0131", "973.\u015Eeker", "1047.\u015Eurup", "1174.Tofu", "1122.Sirke", "1019.Bu\u011Fday", "1006.Maya", "1221.Yo\u011Furt"]');
	shop_tr.push('["72. Yemekler", "1161.Elvis sandvi\xE7i", "261.Hamburger", "26.Hotdog", "1185.Yemek", "262.Pizza", "120.Salata", "1131.Sandvi\xE7", "119.Biftek", "315.Tortilla"]');
	shop_tr.push('["73. Mezeler", "771.Bir tomar havu\xE7", "993.Pamko", "990.Kraker", "980.\xC7erez (bir paket)", "1277.Egzotik At\u0131\u015Ft\u0131rmal\u0131k", "989.Kurutulmu\u015F et", "987.Kavrulmu\u015F f\u0131st\u0131k", "986.Tuzlu f\u0131st\u0131k", "988.Popcorn", "992.Fiyonk tuzlu kraker", "408.Rus havyar\u0131", "1301.Abur cubur", "991.Tortilla cipsi"]');
	shop_tr.push('["74. \u015Eekerleme", "1093.Baklava", "314.Do\u011Fum g\xFCn\xFC pastas\u0131", "1188.Bisk\xFCvi", "1190.Brioche", "1104.Brownie", "1109.Kek", "1289.\u015Eekerleme", "1159.Karamelli \u015Eeker", "1077.Sak\u0131z", "1157.\xC7ikolata", "1314.Noel yeme\u011Fi", "1080.Kurabiye", "1264.Tatl\u0131", "1117.Meyveli pasta", "1099.Zencefilli kurabiye", "207.Kalp \u015Feklinde kutulanm\u0131\u015F \xE7ikolata", "760.Dondurma", "1127.Muffin", "1267.\xC7\xF6rek", "1098.Peksimet", "1103.Strudel", "1118.Tatl\u0131 tart", "1124.Tart"]');
	shop_tr.push('["76. Sert Alkoller", "1015.Akvavit", "1095.Amaretto", "1036.Baijiu", "512.Absinthe", "253.Brandy", "407.Stolichnaya votka", "1018.Burbon", "1160.Cacha\xE7a", "1032.Calvados", "978.Eau-de-vie", "997.Cin", "1233.\xDCz\xFCml\xFC Brandy", "976.Grappa", "1009.J\xE4germeister", "994.Jenever", "1243.Lik\xF6r", "1012.Malibu Rom", "1033.Metaxa", "972.Ka\xE7ak i\xE7ki", "1247.Ouzo", "1115.P\xE1linka", "984.Rak\u0131", "1007.Rom", "982.Sake", "985.Sambuca", "1013.Schnaps", "1034.Slivovitz", "969.Tekila", "996.Vodka"]');
	shop_tr.push('["77. \u015Earap ve Bira", "403.6l\u0131k bira", "257.\u015Eampanya", "1236.En M\xFCkemmel \u015Eampanya", "109.K\u0131rm\u0131z\u0131 \u015Farap", "256.Beyaz \u015Farap", "264.Breezer", "977.Elma \u015Farab\u0131", "1145.Eggnog", "1144.Gl\xFChwein", "1030.Bal \u015Earab\u0131", "10.Bardak bira"]');
	shop_tr.push('["78. Me\u015Frubatlar", "258.Limonata", "260.Soda", "259.Pembe gazoz", "1000.Diet Cola", "999.Meyve suyu", "1002.Melvin Cola", "1291.Alkols\xFCz i\xE7ecek", "1001.Pop Cola", "1003.Soda", "998.Tonik"]');
	shop_tr.push('["79. \u0130\xE7ecekler (s\u0131cak)", "1313.S\u0131cak i\xE7ecek", "1062.S\u0131cak \xE7ikolata", "1064.\xC7ay"]');
	shop_tr.push('["81. T\xFCt\xFCn \xDCr\xFCnleri", "964.Puro", "1374.Sigara", "1071.Nargile t\xFCt\xFCn\xFC", "1292.Snus"]');
	shop_tr.push('["83. Et", "1162.Domuz past\u0131rmas\u0131", "1167.S\u0131\u011F\u0131r Eti", "1168.Tavuk eti", "1251.Terbiyeli et", "1130.Jambon", "1186.Kuzu eti", "1191.S\u0131\u011F\u0131r eti k\u0131ymas\u0131", "1252.Sakatat", "1166.Domuz eti", "1165.Quorn", "1279.Tav\u015Fan eti", "1262.S\xFCt dana eti"]');
	shop_tr.push('["84. Meyve ve Sebzeler", "1223.Salatal\u0131k", "1193.Marul", "1173.So\u011Fan", "1192.Patates", "1177.Soya fasulyesi", "937.Bir torba domates"]');
	shop_tr.push('["85. Bal\u0131k", "1200.Hamsi", "1201.Aynal\u0131 Sazan", "1202.Kedi Bal\u0131\u011F\u0131", "1219.Kobia", "1203.Morina", "1308.Kerevit", "1199.Kalamar", "1204.Y\u0131lan Bal\u0131\u011F\u0131", "1272.Orfoz", "1205.Tavuk Bal\u0131\u011F\u0131", "1211.Pisi Bal\u0131\u011F\u0131", "1206.Ringa", "1207.Uskumru", "1218.Fenerbal\u0131\u011F\u0131", "1198.Midye", "1275.Tatl\u0131su levre\u011Fi", "1271.Turna bal\u0131\u011F\u0131", "1212.K\xF6m\xFCr Bal\u0131\u011F\u0131", "1169.Somon", "1208.Sardalye", "1273.Levrek", "1282.Denizkestanesi", "1197.Karides", "1213.G\xFCm\xFC\u015F Mezgit", "1209.Mercan Bal\u0131\u011F\u0131", "1214.Mersinbal\u0131\u011F\u0131", "1216.K\u0131l\u0131\xE7 Bal\u0131\u011F\u0131", "1274.Kadife bal\u0131\u011F\u0131", "1217.Tilefish", "1210.Alabal\u0131k", "1170.Ton bal\u0131\u011F\u0131", "1215.Kalkan Bal\u0131\u011F\u0131", "1283.Sar\u0131 kuyruk", "1270.Sudak bal\u0131\u011F\u0131"]');
	shop_tr.push('["87. Giyecekler", "1344.Boncuk", "1346.Bir top ince kuma\u015F", "1325.Bir top kuma\u015F", "1340.Bir top \xF6zel kuma\u015F", "1341.Toka", "1328.D\xFC\u011Fme", "1228.\xC7aput", "1337.K\xFCrk", "1347.Dantel", "1342.Deri", "1345.Kurdele", "750.Diki\u015F tak\u0131m\u0131", "1358.P\xFCsk\xFCl", "1329.\u0130plik", "1357.\xD6r\xFClm\xFC\u015F kam\u0131\u015F"]');
	shop_tr.push('["93. Bebek E\u015Fyalar\u0131", "614.\xC7ocuk Bezi"]');
	shop_tr.push('["94. Do\u011Fum Kontrol\xFC ve Korunma", "130.Prezervatif kutusu"]');
	return(shop_tr);
}
function shoplibrary_us () {
	shop_en = new Array();
	shop_en.push('["1. Musical Instrument", "199.Accordion", "1.Acoustic Guitar", "194.Bagpipes", "159.Banjo", "23.Bass Guitar", "748.Bell", "196.Cello", "913.Chapman Stick", "192.Clarinet", "197.Contrabass", "161.DJ Twin-Turntable System", "188.Dobro Guitar", "14.Drums", "202.Dulcimer", "476.Electric Guitar", "155.Flute", "191.Goblet Drum", "160.Harmonica", "186.Harp", "190.Harpsichord", "146.Keyboard", "189.Lute", "185.Mandolin", "18.Microphone", "198.Oboe", "200.Pan-Pipes", "162.Piano", "150.Saxophone", "502.Trombone", "15.Trumpet", "195.Tuba", "193.Ukulele", "151.Violin", "187.Xylophone", "201.Zither"]');
	shop_en.push('["2. Clothes", "1107.Apron (Full-length)", "1108.Apron (Waist)", "1322.Ballet tutu", "557.Bathrobe", "561.Belt", "1066.Coveralls", "1070.Bow tie", "300.Bridal dress", "1296.Cardigan", "1339.Children\'s costume", "568.Cloak", "558.Coat", "1343.Costume", "685.Dress", "1354.Dress shirt", "20.Gloves", "64.Hooded Jacket", "590.Kilt", "1050.Kimono", "44.Mini skirt", "1299.Nightgown", "563.Outdoor jacket", "279.Polo Shirt", "940.Popmundo T-Shirt", "1298.Pajama shirt", "1065.Racing overall", "1182.Robe", "562.Scarf", "564.Skirt", "1179.Socks", "690.Souvenir T-shirt", "1051.Suit jacket", "588.Sweater", "569.Tank top", "559.Tie", "39.Tight Women\'s Top", "684.Towel", "565.T-Shirt", "560.Tunic", "955.Turtle Neck", "1231.Tuxedo jacket", "1053.Vest"]');
	shop_en.push('["6. Books", "629.Advanced Engineering", "671.Advanced Fireworks", "697.Advanced Pedagogy", "612.Advanced Pharmacology", "626.Advanced Science", "637.Aikido Mastery", "674.Audience Awareness", "496.Backup Vocals", "1079.Baking - The Ultimate Guide", "545.Basic Acting", "935.Basic Animal Training", "541.Basic Art &amp; Design", "645.Basic Astrology", "509.Basic Botany", "171.Basic Brass Instruments", "101.Basic Catwalking", "677.Basic Chemistry", "455.Basic Comedy", "110.Basic Composing", "676.Basic Computers", "99.Basic Dancing", "499.Basic Detective", "936.Basic Disguise", "139.Basic Economics", "163.Basic Electronic Instruments", "628.Basic Engineering", "97.Basic Fashion", "926.Basic Fire Arms", "661.Basic Fire Fighting", "604.Basic Illusionism", "131.Basic Kama Sutra", "172.Basic Keyboard Instruments", "140.Basic Law", "623.Basic Leadership", "100.Basic Lyrics &amp; Poetry", "89.Basic Make Up", "462.Basic Martial Arts", "88.Basic Media Manipulation", "141.Basic Medicine", "96.Basic Modeling", "91.Basic Percussion Instruments", "524.Basic Photography", "938.Basic Politics", "939.Basic Psychology", "106.Basic Record Production", "454.Basic Religion", "415.Fundamentals of Rhetoric", "625.Basic Science", "751.Basic Sewing", "102.Basic Sex Appeal", "95.Basic Showmanship", "157.Basic Singing", "670.Basic Special Effects", "464.Basic Street-smartness", "170.Basic String Instruments", "696.Basic Teaching", "169.Basic Woodwind Instruments", "453.Basic Yoga", "929.Basics of Power Tools", "1226.Biochemistry 101", "669.Breakdancing for Professionals", "666.Breathing Fire like a Dragon", "1227.Cheesemaking Explained", "472.Composing Anthems", "468.Composing Ballads", "473.Composing Crowdpleasers", "471.Composing Easy Listening", "470.Composing Floorfillers", "475.Composing Music for Musicians", "474.Composing Simplistic Music", "469.Composing Singalongs", "533.Cookbook", "971.Distillation 101", "597.DNA analysis", "799.Entomology for Everyone", "680.Environmental Engineering", "1024.Farming Today", "598.Fingerprint recognition", "1220.Fishing for Everyone", "638.Fist Fighting Fundamentals", "675.Folk Dancing", "549.Graffiti Painting", "1353.Hatter\'s Bible", "543.History of African Music", "409.History of Blues", "410.History of Classical Music", "183.History of Country &amp; Western", "177.History of Electronica", "544.History of Flamenco", "175.History of Heavy Metal", "179.History of Hip Hop", "184.History of Jazz", "542.History of Latin Music", "174.History of Modern Rock", "178.History of Pop", "176.History of Punk Rock", "180.History of R&amp;B", "181.History of Reggae", "173.History of Rock", "182.History of World Music", "596.Image analysis", "640.Kung Fu Mastery", "495.Lead Vocals", "672.Lighting Wizardry", "722.Linguistics for Beginners", "1040.Making Cigars", "463.Mastering Jujutsu", "668.Moonwalking for Dancers", "546.Motion Picture Photography", "667.Music Improvisation", "927.Paranormal Tracking Devices", "1156.Parent\'s Handbook", "660.Party Planning", "505.Pharmacology", "519.Play the Accordion", "477.Play the Bag Pipes", "164.Play the Banjo", "167.Play the Bass Guitar", "480.Play the Cello", "914.Play the Chapman Stick", "479.Play the Clarinet", "481.Play the Contrabass", "478.Play the Dobro", "482.Play the Drums", "483.Play the Dulcimer", "494.Play the Electric Guitar", "156.Play the Flute", "484.Play the Goblet Drums", "90.Play the Acoustic Guitar", "165.Play the Harmonica", "485.Play the Harp", "486.Play the Lute", "487.Play the Mandolin", "488.Play the Oboe", "489.Play the Pan Pipes", "92.Play the Piano", "166.Play the Saxophone", "503.Play the Trombone", "94.Play the Trumpet", "490.Play the Tuba", "491.Play the Ukulele", "93.Play the Violin", "492.Play the Xylophone", "493.Play the Zither", "448.Professional Accounting", "634.Professional Comedy", "949.Professional Dancing", "950.Professional Etiquette", "606.Professional Illusionism", "501.Professional Medicine", "643.Professional Poetry", "456.Professional Public Relations", "624.Professional Rhetoric", "951.Professional Showmanship", "547.Professional Veterinary ", "458.Proper Drinking Habits", "551.Rapping", "673.Ritual Summoning", "665.Secrets of Erotic Dancing", "691.Special Weapons And Tactics", "664.Stage Diving", "709.Stealth for Beginners", "630.Street Lore", "1072.The Art of Engraving", "1076.Tobacco Chemistry", "948.Turntable Techniques", "693.Undercover Operations"]');
	shop_en.push('["7. Jewelry", "581.Bracelet", "912.Engagement ring", "580.Necklace", "575.Ring, large", "576.Ring, small", "573.Watch"]');
	shop_en.push('["10. Shoes", "1324.Ballet shoes", "584.Boots", "704.Boots, knee-high", "236.Cowboy boots", "235.Disco shoes", "603.Flip-flops", "1376.Loafers", "48.Military boots", "287.Monkey Slippers", "365.Moon Boots", "1067.Racing boots", "583.Sandals", "585.Shoes", "60.Shoes, high heel", "582.Shoes, laced", "65.Sneakers", "1335.Rain Boots"]');
	shop_en.push('["13. Toys", "283.Baseball", "280.Basketball", "133.CD Album", "134.CD Single", "1181.Clown nose", "1046.Coloring book", "1045.Crayon", "312.Deck of cards", "311.Doll (cute)", "281.Football (American)", "282.Football (Soccer)", "1259.Glow stick", "168.Halloween Monster Mask", "1377.Hula hoop", "302.Karaoke kit", "1348.Machine that goes PING!", "555.Magnifying glass", "720.Mask", "297.MP3 player", "250.Picnic basket", "657.Pi\xF1ata", "591.Roller skates", "1375.Rubik\'s Cube", "306.Skateboard", "206.Small Set of Fireworks", "305.Snowboard", "1351.Stage Make-up kit", "689.Tacky Souvenir Miniature", "310.Teddy-bear", "304.Toy handcuffs", "1356.Toy handgun", "1355.Toy sword", "956.Valentine\'s Day Card", "303.Whip", "646.Zodiac"]');
	shop_en.push('["22. Clothes (headwear)", "1084.Baker\'s hat", "73.Bandanna", "52.Baseball cap", "1054.Bowler hat", "567.Cap", "531.Cowboy hat", "371.French Beret", "271.Hairband", "1323.Hard hat", "1352.Hat", "1044.Racing helmet", "1184.Sombrero", "229.Top Hat", "708.Wig", "1360.Wreath"]');
	shop_en.push('["24. Clothes (pants)", "1327.Bib Overall", "272.Biker shorts", "1334.Board Shorts", "1183.Bondage pants", "43.Hotpants", "25.Jeans", "586.Knickers", "587.Pants", "566.Pants, baggy", "556.Pants, slim fit", "1297.Pajama pants", "1052.Suit pants", "40.Tights", "1232.Tuxedo pants"]');
	shop_en.push('["25. Clothes (underwear)", "707.Bikini", "570.Boxer shorts", "705.Bra", "571.Briefs", "636.Corset", "1068.Fishnet stockings", "1359.Garter belt", "286.Grandma style underwear", "285.Grandpa style underwear", "284.G-String Underwear", "1180.Panties", "58.Pantyhose"]');
	shop_en.push('["27. Pets", "378.Alligator", "389.Canary Bird", "375.Cat", "385.Dog (Beagle)", "384.Dog (Chihuahua)", "382.Dog (Cocker Spaniel)", "374.Dog (Greyhound)", "383.Dog (Labrador)", "386.Dog (Rottweiler)", "589.Elephant", "379.Guinea Pig", "376.Hamster", "381.Horse", "380.Monkey", "695.Panda", "377.Parrot", "387.Pig", "1383.Pygmy Jerboa", "388.Rabbit"]');
	shop_en.push('["31. Vehicle Parts", "437.Repair Kit", "435.Spare Tire"]');
	shop_en.push('["32. Loudspeakers", "434.Loudspeaker 1000W", "432.Loudspeaker 100W", "418.Loudspeaker 2000W", "433.Loudspeaker 300W", "419.Loudspeaker 500W"]');
	shop_en.push('["33. Lights", "428.Medium Rack 5000W", "427.Small Rack 2500W", "429.Supersize Rack 7500W"]');
	shop_en.push('["34. Stage Decor", "425.Backdrop with Band Logo", "426.Backdrop with Band Logo - Supersize"]');
	shop_en.push('["35. Stage Hightech", "431.Plasmascreen", "430.Projector with canvas", "416.Stroboscope"]');
	shop_en.push('["36. Stage FX", "422.Bubble Machine 250W", "424.Foam Cannon 2000W", "438.Smoke Machine 500W", "421.Thunder Stormer 4000W"]');
	shop_en.push('["37. Subwoofers", "22.Subwoofer 1000W", "420.Subwoofer 2000W", "417.Subwoofer 500W"]');
	shop_en.push('["38. Control Systems", "442.Advanced Light Control System", "444.Advanced Sound Mixing Table", "445.Deluxe Sound Mixing Table", "447.Large Monitor Speaker", "441.Simple Light Control System", "443.Simple Sound Mixing Table", "446.Small Monitor Speaker"]');
	shop_en.push('["42. Electronics", "523.Camera", "525.Camera Film (35 mm)", "529.Camera Film (80 mm)", "527.Camera Film (Instant Camera)", "528.Camera Medium Format (80 mm)", "659.Fire detector", "526.Instant Camera", "1385.Laptop Computer", "553.Silent burglar alarm", "1387.Desktop computer", "1361.Video Camera"]');
	shop_en.push('["51. Tools ", "1008.Aging Barrel", "783.Animal Cage", "1060.Baby Bottle", "1285.Basket", "1026.Beehive", "1028.Beekeeper\'s hat", "1266.Binoculars", "1265.Blow torch", "1025.Board", "1312.Bombilla", "1023.Bucket", "1143.Butcher\'s knife", "1089.Butter churn", "747.Candle", "744.Cane", "928.Chainsaw", "963.Chaveta", "958.Chemistry Lab Travel Kit", "1048.Cooking pot", "1373.Duct tape", "1269.Fishing Pole", "770.Flashlight", "1164.Food smoker", "1163.Frying pan", "1254.Grill", "766.Hammer", "1049.Hookah", "749.Incense", "789.Insect Net", "768.Iron", "1029.Jar", "957.Kettle", "1280.Kitchen syringe", "719.Knife", "532.Lasso", "905.Mill", "890.Pickaxe", "1037.Pitchfork", "1245.Roaster", "1378.Rolling paper", "767.Screwdriver", "759.Sewing machine", "970.Still", "737.Suitcase", "1372.Swiss Army Knife", "1246.Thermometer", "764.Toaster", "1257.Toilet paper", "738.Trunk", "1061.Umbrella", "765.Vacuum Cleaner", "1230.Whisk"]');
	shop_en.push('["52. Utilities", "681.Air Pollution Detector", "682.Aquifer Capacity Survey Kit", "683.Aquifer Quality Probe", "995.Charcoal", "954.Custom Paint", "960.Distilled water", "920.Ear plugs", "436.Fire Extinguisher", "678.Gas can", "746.Rag"]');
	shop_en.push('["55. Art Supplies", "67.Can of spraypaint", "71.Screen print template"]');
	shop_en.push('["56. Make-up", "59.Basic Make-up kit"]');
	shop_en.push('["58. Accessories", "1059.Blanket", "578.Earrings, large", "577.Earrings, small", "579.Earrings, tacky", "1195.Eyeglasses", "1258.Feather boa", "1393.Handkerchief", "574.Nose jewelry", "700.Pin", "244.Say NO to violence pin", "277.Spiked Bracers", "572.Sunglasses"]');
	shop_en.push('["60. Natural products", "1349.Eagle Feather"]');
	shop_en.push('["61. Animals", "867.Anteater", "1300.Antelope", "877.Armadillo", "742.Bat", "740.Beaver", "1055.Boa constrictor", "1142.Bull", "881.Camel", "735.Chimpanzee", "1150.Condor", "1149.Cougar", "714.Cow", "716.Crow", "781.Deer", "775.Dingo", "733.Eagle", "785.Emu", "787.Falcon", "1295.Ferret", "1302.Fox", "792.Frog", "736.Gibbon", "1139.Goat buck", "1138.Goat doe", "878.Hedgehog", "1041.Hen", "1151.Hummingbird", "885.Ibex", "866.Jaguar", "773.Kangaroo", "776.Koala", "882.Llama", "727.Lion", "1056.Lizard", "879.Mole", "883.Moose", "1303.Newt", "1057.Ocelot", "1286.Ostrich", "1152.Otter", "1239.Pig hog", "1238.Pig sow", "786.Platypus", "774.Possum", "741.Raccoon", "743.Rat", "1043.Rooster", "880.Seal", "1140.Sheep ewe", "1141.Sheep ram", "1058.Sloth", "784.Squirrel", "391.Tapir", "868.Toucan", "1078.Turtle", "1321.Wolf", "788.Wolverine"]');
	shop_en.push('["62. Insects", "797.Ant", "897.Antlion", "796.Bee", "795.Beetle", "802.Bug", "790.Butterfly", "895.Caddisfly", "804.Caterpillar", "900.Centipede", "807.Cockroach", "891.Cricket", "732.Dragonfly", "894.Earwig", "896.Flea", "800.Fly", "794.Grasshopper", "898.Lacewing", "806.Louse", "849.Maggot", "899.Mantidfly", "798.Mantis", "731.Mosquito", "805.Moth", "893.Rock crawler", "809.Scorpion", "892.Silverfish", "791.Spider", "801.Stick insect", "808.Termite", "824.Tick", "803.Wasp", "793.Worm"]');
	shop_en.push('["63. Plants", "974.Agave", "1091.Almond", "983.Anise", "979.Apple", "1110.Apricot", "1256.Eggplant", "1129.Banana", "814.Basil", "1194.Bean", "830.Birch", "1187.Black pepper", "1128.Blueberry", "1318.Cabbage", "820.Cocoa", "1016.Caraway", "829.Ceibo", "855.Chamomile", "1014.Cherry", "839.Chestnut", "1278.Chickpea", "1196.Chili Pepper", "1304.Chives", "826.Chokeberry", "1010.Cinnamon", "1148.Clove", "833.Clover", "821.Coca", "1011.Coconut", "850.Coffee Bean", "1287.Coriander", "843.Cornflower", "856.Dandelion", "817.Eucalyptus", "869.Evening primrose", "857.Fennel", "818.Fern", "819.Garlic", "1085.Ginger", "1134.Ginseng", "975.Grape", "841.Guava", "836.Harebell", "1096.Hazelnut", "835.Heather", "847.Hemp", "859.Hibiscus", "822.Holly", "1031.Hops", "813.Hyacinth", "853.Hyssop", "838.Iris", "860.Jasmine", "861.Juniper", "852.Laurel", "840.Lavender", "1119.Lemon", "862.Lemongrass", "782.Lily", "831.Lily of the Valley", "1317.Lime", "825.Lingonberry", "863.Liquorice", "828.Lotus", "1017.Maize", "823.Mandrake", "1268.Marjoram", "1315.Marula", "1222.Mentha", "1155.Mistletoe", "1133.Mustard seed", "864.Nettle", "865.Nutmeg", "1240.Orange", "811.Orchid", "1305.Oregano", "1224.Parsley", "1261.Pea", "1087.Peanut", "1116.Pear", "1121.Pecan", "851.Pepper", "827.Pine cone", "1250.Pine nut", "1158.Pineapple", "845.Plum", "842.Poppy", "1125.Pumpkin", "1114.Raspberry", "870.Riberry", "810.Rose", "1293.Rose hip", "837.Rue", "1260.Saffron", "1281.Seaweed", "871.Sesame", "1035.Sorghum", "1111.Strawberry", "1005.Sugarcane", "815.Sunflower", "834.Tabebuia", "872.Tamarind", "1063.Tea leaves", "812.Thistle", "1309.Thyme", "965.Tobacco", "844.Tulip", "1253.Turnip", "873.Valerian", "1090.Vanilla", "1102.Walnut", "874.Wasabi", "875.Yarrow"]');
	shop_en.push('["65. Chemicals", "1225.Bacteria culture", "1288.Herbal distillate", "1294.Itching powder", "1136.Rennet", "888.Sodium Carbonate"]');
	shop_en.push('["66. Trees", "858.Ginkgo", "816.Myrtle", "832.Oak"]');
	shop_en.push('["67. Weapons", "694.Shotgun", "698.Shotgun rounds", "919.Zombie Tracker"]');
	shop_en.push('["68. Groceries", "1235.Animal intestine", "1082.Baking powder", "1021.Barley", "1100.Bread", "1088.Butter", "357.Can of whipped cream", "1137.Cheese", "1171.Chili powder", "1112.Chocolate", "1316.Coconut milk", "1244.Coffee (roasted)", "1249.Condiment", "1042.Egg", "1081.Flour", "1123.Food coloring", "1175.Garlic powder", "1120.Gelatin", "1154.Nutella", "1027.Honey", "1241.Jam", "1237.Lard", "1022.Malt", "1105.Marzipan", "1263.Mascarpone", "1229.Mayonnaise", "1069.Milk", "1135.Mustard", "1172.Noodles", "1086.Oatmeal", "1101.Olive Oil", "1248.Pasta", "1153.Peanut Butter", "1242.Pectin", "1094.Phyllo", "1189.Powdered sugar", "1331.Preserved fish", "1083.Raisin", "981.Rice", "1020.Rye", "1092.Salt", "1319.Sauerkraut", "1234.Sausage", "959.Sesame Oil", "1255.Sour cream", "1330.Sourdough", "1176.Soy sauce", "1290.Starch", "1146.Suet", "973.Sugar", "1047.Syrup", "1174.Tofu", "1122.Vinegar", "1019.Wheat", "1006.Yeast", "1221.Yogurt"]');
	shop_en.push('["72. Meals", "1161.Elvis sandwich", "261.Hamburger", "26.Hotdog", "1185.Meal", "262.Pizza", "120.Salad", "1131.Sandwich", "119.Steak", "315.Tortilla"]');
	shop_en.push('["73. Snacks", "771.Bunch of carrots", "993.Cheese puffs", "990.Cracker", "980.Potato Chips", "1277.Exotic snack", "989.Jerky", "987.Peanuts (roasted)", "986.Peanuts (salted)", "988.Popcorn", "992.Pretzel", "408.Russian Caviar", "1301.Snack", "991.Tortilla chips"]');
	shop_en.push('["74. Confectionery", "1093.Baklava", "314.Birthday cake", "1188.Biscuit", "1190.Brioche", "1104.Brownie", "1109.Cake", "1289.Candy", "1159.Caramel candy", "1077.Chewing gum", "1157.Chocolate bar", "1314.Christmas dish", "1080.Cookie", "1264.Dessert", "1117.Fruitcake", "1099.Gingerbread", "207.Heart Shaped Box of Chocolates", "760.Ice Cream", "1127.Muffin", "1267.Pastry", "1098.Shortbread", "1103.Strudel", "1118.Sweet Pie", "1124.Tart"]');
	shop_en.push('["76. Liquor", "1015.Akvavit", "1095.Amaretto", "1036.Baijiu", "512.Bottle of Absinthe", "253.Bottle of Brandy", "407.Bottle of Stolichnaya", "1018.Bourbon", "1160.Cacha\xE7a", "1032.Calvados", "978.Eau-de-vie", "997.Gin", "1233.Grape Brandy", "976.Grappa", "1009.J\xE4germeister", "994.Jenever", "1243.Liqueur", "1012.Malibu Rum", "1033.Metaxa", "972.Moonshine", "1247.Ouzo", "1115.P\xE1linka", "984.Raki", "1007.Rum", "982.Sake", "985.Sambuca", "1013.Schnapps", "1034.Slivovitz", "969.Tequila", "996.Vodka"]');
	shop_en.push('["77. Wine and Beer", "403.6-pack of Beer", "257.Bottle of Champagne", "1236.Bottle of Finest Champagne", "109.Bottle of Red Wine", "256.Bottle of White Wine", "264.Breezer", "977.Cider", "1145.Eggnog", "1144.Gl\xFChwein", "1030.Mead", "10.Pint of Beer"]');
	shop_en.push('["78. Soft drinks", "258.Bottle of Lemonade", "260.Bottle of Mineral Water", "259.Bottle of Pink Soda", "1000.Diet Cola", "999.Juice", "1002.Melvin Cola", "1291.Non-alcoholic drink", "1001.Pop Cola", "1003.Soda", "998.Tonic water"]');
	shop_en.push('["79. Beverages (hot)", "1313.Hot beverage", "1062.Hot chocolate", "1064.Tea"]');
	shop_en.push('["81. Tobacco Products", "964.Cigar", "1374.Cigarette", "1071.Shisha tobacco", "1292.Snus"]');
	shop_en.push('["83. Meat", "1162.Bacon", "1167.Beef", "1168.Chicken meat", "1251.Cured meat", "1130.Ham", "1186.Lamb meat", "1191.Ground Beef", "1252.Offal", "1166.Pork", "1165.Quorn", "1279.Rabbit meat", "1262.Veal"]');
	shop_en.push('["84. Fruit and Vegetables", "1223.Cucumber", "1193.Lettuce", "1173.Onion", "1192.Potato", "1177.Soybean", "937.Bag of Tomatoes"]');
	shop_en.push('["85. Fish", "1200.Anchovy", "1201.Carp", "1202.Catfish", "1219.Cobia", "1203.Cod", "1308.Crayfish", "1199.Cuttlefish", "1204.Eel", "1272.Grouper", "1205.Haddock", "1211.Halibut", "1206.Herring", "1207.Mackerel", "1218.Monkfish", "1198.Mussel", "1275.Perch", "1271.Pike", "1212.Pollock", "1169.Salmon", "1208.Sardine", "1273.Sea bass", "1282.Sea urchin", "1197.Shrimp", "1213.Sillaginid", "1209.Snapper", "1214.Sturgeon", "1216.Swordfish", "1274.Tench", "1217.Tilefish", "1210.Trout", "1170.Tuna", "1215.Turbot", "1283.Yellowtail", "1270.Zander"]');
	shop_en.push('["87. Garment materials", "1344.Beads", "1346.Bolt of exquisite cloth", "1325.Bolt of simple cloth", "1340.Bolt of special cloth", "1341.Buckle", "1328.Button", "1228.Cloth", "1337.Fur", "1347.Lace", "1342.Leather", "1345.Ribbon", "750.Sewing kit", "1358.Tassel", "1329.Thread", "1357.Woven straw"]');
	shop_en.push('["93. Baby Supplies", "614.Diaper"]');
	shop_en.push('["94. Birth Control &amp; Protection", "130.Condom pack"]');
	return(shop_en);
}

function colorSearchboxBackground () {
	if (colorSearchboxBackground.color == undefined) colorSearchboxBackground.color = colorToHex(getComputedStyle(document.getElementById('ctl00_cphLeftColumn_ctl00_ddlShopItemCategories')).backgroundColor);
	return colorSearchboxBackground.color;
}
function colorSuggestlistBackground () {
	if (colorSuggestlistBackground.color == undefined) colorSuggestlistBackground.color = colorToHex(getComputedStyle(document.getElementById("ctl00_cphLeftColumn_ctl00_ddlShopItemCategories")).backgroundColor);
	return colorSuggestlistBackground.color;
}
function colorSearchboxMatch () {
	return "none repeat scroll 0 0 #FF0000 !important"; //this doesn't work because !important in css
}
function colorHighlight () {
	if (colorHighlight.color == undefined) colorHighlight.color = colorToHex(getComputedStyle(document.querySelector("body")).backgroundColor);
	return colorHighlight.color;
}
function colorSuggestlistBorder () {
	if (colorSuggestlistBorder.color == undefined) colorSuggestlistBorder.color = colorToHex(getComputedStyle(document.getElementById("ctl00_cphLeftColumn_ctl00_ddlShopItemCategories"),null).getPropertyValue("border-bottom-color"));
	return colorSuggestlistBorder.color;
}

var minSearchLength = 2;

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}
function shop_languages() {
	if (!document.getElementById("ctl00_ucMenu_lnkCharacter")) return false;
	if (document.getElementById("ctl00_ucMenu_lnkCharacter").textContent.indexOf("Karakter") >-1) {
		this.shoplibrary = function () {
			return shoplibrary_tr();
		};
		this.searchButtonText="Ara";
	}
	/*else if (.indexOf("Karaktär")>-1) {
		this.shoplibrary = function () {
			return shoplibrary_swe();
		};
		this.searchButtonText="Sök";
	}
	else if (.indexOf("Empresa")>-1) {
		this.shoplibrary = function () {
			return shoplibrary_por();
		};
		this.searchButtonText="CR7";
	}
	else if (.innerHTML.indexOf("Cia")>-1) {
		this.shoplibrary = function () {
			return shoplibrary_bra();
		};
		this.searchButtonText="EHUE";
	}*/
	else {
		this.shoplibrary = function () {
			return shoplibrary_us();
		};
		this.searchButtonText="Search";
	}
	return true;
}

//if (document.body) { if (shop_languages()) phoneshop();	}
//else { window.addEventListener('DOMContentLoaded',function() { if (shop_languages()) phoneshop(); },true); }
if (shop_languages()) phoneshop();

function colorToHex(color) {
    if (color.substr(0, 1) === '#' || color == "transparent") {
        return color;
    }
    var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec(color);
    
    var red = parseInt(digits[2]);
    var green = parseInt(digits[3]);
    var blue = parseInt(digits[4]);
    
    var rgb = blue | (green << 8) | (red << 16);
    return digits[1] + '#' + rgb.toString(16);
};

function shop_suggest () {
	document.getElementById('searchbox').style.backgroundColor = colorSearchboxBackground();
	document.getElementById('searchboxP').className = ""; //becase we don't want empty queries
	var shop = new Array();
	shop = shoplibrary();
	var searchText = document.getElementById('searchbox').value;
	var searchTextLow = searchText.toLowerCase();
	document.getElementById('suggestbox').innerHTML = ""; //delete previous list
	var wrapH = parseInt(document.getElementById("main").offsetHeight) - document.getElementById('ctl00_cphLeftColumn_ctl00_ddlShopItemCategories').offsetTop;
	if (searchText.length >= (minSearchLength)) {
		for (i = 0; i < shop.length; i++) {
			var categories = eval(shop[i]);
			if (categories.toString().toLowerCase().indexOf(searchTextLow) >= 0) {		// check category first
				for (j = 1; j < categories.length; j++) {					// find the exact word later
					if (categories[j].toLowerCase().split(".")[1] == searchTextLow) {
						document.getElementById('searchbox').name = categories[j].match(/^(\d+)/ig)[0].toString();	//store itemtypeid
						document.getElementById('searchbox').style.background = colorSearchboxMatch();
						document.getElementById('searchboxP').className = "exactMatch";		//this indicates search has an exact match
					}
					if (categories[j].toLowerCase().split(".")[1].indexOf(searchTextLow) >= 0) {
						if (wrapH-50 < parseInt(parseInt(document.getElementById("suggestbox").offsetTop)+parseInt(document.getElementById("suggestbox").offsetHeight))) return;
						var words = categories[j].split(".")[1].split(" "), suggestionLine = "";
						for (k = 0; k < words.length; k++, suggestionLine+=" ") {
							var txt = words[k];
							if (txt.toLowerCase().indexOf(searchTextLow) >= 0)
								suggestionLine += txt.substr(0,txt.toLowerCase().indexOf(searchTextLow)) + txt.substr(txt.toLowerCase().indexOf(searchTextLow),searchText.length).bold() + txt.substr(txt.toLowerCase().indexOf(searchTextLow) + searchText.length);
							else suggestionLine += txt;
						}
						var div = document.createElement('div');
						var div_id = "shoppingAsistantId" + categories[j].toLowerCase().split(".")[0];
						div.id = div_id;
						div.style.fontWeight = "normal";
						div.style.display = "block";
						div.style.margin = "1px 5px";
						div.style.cursor = "pointer";
						div.style.backgroundColor = colorSuggestlistBackground();
						div.innerHTML = suggestionLine.substr(0,suggestionLine.length-1);
						document.getElementById('suggestbox').appendChild(div);
						document.getElementById('suggestbox').style.display = "block";
						div.addEventListener('mouseover',function() {
							this.style.backgroundColor = colorHighlight();
						},true);
						div.addEventListener('mouseout',function() {
							for (i = 0;i < document.getElementById('suggestbox').childNodes.length; i++)
								document.getElementById('suggestbox').childNodes[i].style.backgroundColor = colorSuggestlistBackground();
						},true);
						div.addEventListener('click',function() {
							document.getElementById("searchbox").value = this.innerHTML.replace(/<(\/)*\w+>/ig,"");
							shop_suggest();
							shop_go();
						},true); //removing bold tags
					}
				}
			}
		}
	}
	document.getElementById('suggestbox').style.display = (document.getElementById('suggestbox').childNodes.length>0) ?"block":"none";
}
function shop_go () {
	if (document.getElementById('searchboxP').className.toString() == "exactMatch") {
		var shop = new Array();
		shop = shoplibrary();
		var selectproduct = document.getElementById('ctl00_cphLeftColumn_ctl00_ddlShopItemCategories');
		var searchboxId = document.getElementById('searchbox').name;
		GM_setValue("lastSearch",searchboxId.toString());
		for (j = 0; j < shop.length; j++) {
			var categoryList = eval(shop[j]);
			if (categoryList.toString().indexOf(searchboxId) > 0) {
				for (k = 0; k < categoryList.length; k++) {							// find the category
					if (categoryList[k].split(".")[0] == searchboxId) {
						var ItemCategoryID = categoryList[0].match(/^(\d+)/ig)[0];	//get categoryid for itemtypeid
						for (i =1;i < selectproduct.options.length;++i) {			//select from dropdown
							if (selectproduct[i].value == ItemCategoryID) {
								selectproduct[i].selected = true;
								var hack = selectproduct.onchange.toString().match(/javascript:(.+)/im);
								if (hack) location.assign("javascript:"+hack[1]+";void(0)"); 	//chrome
								else selectproduct.onchange();
								/*
function onchange(event) {
javascript:
    setTimeout("__doPostBack('ctl00$cphLeftColumn$ctl00$ddlShopItemCategories','')", 0);
}								
								*/
							}
						}
					}
				}
			}
		}
	}
}
function shop_handlekeys (e) {
	if (e.type == "keydown") {	
		if ((e.keyCode == 40) || (e.keyCode == 38)) {
			var sug = document.getElementById('suggestbox');
			var highlightItem = (e.keyCode == 40) ? -1 : 0;
			var j = 0; //item determined by key press
			for (i = sug.childNodes.length-1; -1 < i; --i) {
				if (colorToHex(sug.getElementsByTagName("div")[i].style.backgroundColor).toLowerCase() == colorToHex(colorHighlight()).toLowerCase()) {
					highlightItem = i;
					if ((highlightItem != -1) || (highlightItem != 0)) sug.getElementsByTagName("div")[i].style.backgroundColor = colorSuggestlistBackground();
				}
			}
			if (e.keyCode == 40) {
				j = highlightItem+1;
				if (j >= sug.childNodes.length) j = 0;
			}
			else {
				j = highlightItem-1;
				if (j < 0) j = sug.childNodes.length-1;
			}
			if (highlightItem > -1) sug.getElementsByTagName("div")[highlightItem].style.backgroundColor = colorSuggestlistBackground();
			sug.getElementsByTagName("div")[j].style.backgroundColor = colorHighlight();
			document.getElementById("searchbox").value = sug.getElementsByTagName("div")[j].innerHTML.replace(/<(\/)*\w+>/ig,"");
			document.getElementById("searchbox").style.background = colorSearchboxMatch();
			document.getElementById("searchboxP").className = "exactMatch";
			document.getElementById("searchbox").name = sug.getElementsByTagName("div")[j].id.replace("shoppingAsistantId","");
		}
		else if (e.keyCode == 13) {
			shop_go();
			e.preventDefault();
		}
	}
	else if (e.type == "keyup") {
		if ("403813".indexOf(e.keyCode) % 2 != 0)
			shop_suggest();
	}
}
function phoneshop () {
	if (document.location.href.indexOf("ShoppingAssistant") < 1) return;
	var selectproduct = document.getElementById('ctl00_cphLeftColumn_ctl00_ddlShopItemCategories');
	if (selectproduct != null) {		// inject search interface
		var suggestbox = document.createElement('div');
		suggestbox.id = "suggestbox";
		suggestbox.style.position = "absolute";
		suggestbox.style.zIndex = 1;
		suggestbox.style.display = "block";
		suggestbox.style.borderStyle = "none solid solid solid";
		suggestbox.style.borderWidth = "0px 1px 1px 1px";
		suggestbox.style.borderColor = colorSuggestlistBorder();
		suggestbox.style.backgroundColor = colorSuggestlistBackground();
		suggestbox.style.padding = "0 0 5px 0";
		suggestbox.className = "width250px";
		var searchbox = document.createElement('input');
		searchbox.type = "search";
		searchbox.style.position = "relative";
		searchbox.style.zIndex = 2;
		searchbox.style.textIndent = "5px";
		searchbox.id = "searchbox";
		searchbox.className = "width250px round";
		var boxP = document.createElement("p");
		boxP.id = "searchboxP";
		boxP.appendChild(searchbox);
		var searchbutton = document.createElement("input");
		searchbutton.id = "searchbutton";
		searchbutton.type = "submit";
		searchbutton.value = searchButtonText; //replace me with a transparent search icon
		var searchP = document.createElement("P");
		searchP.className = "actionbuttons";
		searchP.appendChild(searchbutton);
		var p = document.createElement("P");
		p.style.position = 'relative';
		p.appendChild(boxP);
		p.appendChild(suggestbox);
		p.appendChild(searchP);
		var root = selectproduct.parentNode.parentNode;
		root.insertBefore(p,root.lastChild);
		document.getElementById('searchbox').addEventListener('blur',function () { setTimeout( function () { document.getElementById('suggestbox').style.display = "none"; } ,150) },true);
		document.getElementById('searchbox').addEventListener('focus',shop_suggest,true);
		document.getElementById('searchbox').addEventListener('keyup',shop_handlekeys,true);
		document.getElementById('searchbox').addEventListener('keydown',shop_handlekeys,true);
		document.getElementById('searchbutton').addEventListener('click',function (e) { shop_go(); e.preventDefault(); },true);
		//document.getElementById('suggestbox').style.top = (document.getElementById('searchbox').offsetTop+parseInt(document.getElementById('searchbox').offsetHeight))+"px";
		//document.getElementById('suggestbox').style.left = (document.getElementById('searchbox').offsetLeft+((document.getElementById('searchbox').offsetWidth-document.getElementById('suggestbox').offsetWidth)/2))+"px";
		document.getElementById('suggestbox').style.top = document.getElementById('searchbox').offsetHeight + 'px';
		document.getElementById('suggestbox').style.left = (document.getElementById('searchbox').offsetWidth - document.getElementById('suggestbox').offsetWidth) /2 +'px';
		document.getElementById('suggestbox').style.display = "none"; //avoiding offsetWidth=0 on display=none elements
		document.getElementById('searchbox').focus();
		document.getElementsByTagName("form")[0].setAttribute("autocomplete","off");
	}
	var ItemTypeID = document.getElementById('ctl00_cphLeftColumn_ctl00_ddlShopItemTypes');
	if (ItemTypeID != null) {
		/*list = new Array();		//this is for building library manually
		list.push(selectproduct[selectproduct.selectedIndex].value + "." + selectproduct[selectproduct.selectedIndex].innerHTML);
		for (i =1;i < ItemTypeID.options.length;++i) {
			list.push(ItemTypeID[i].value + "." + ItemTypeID[i].innerHTML);
		}
		alert(list.toSource().toString().replace(/'/ig,"\'"));*/
		var lastSearch = "";
		lastSearch = GM_getValue("lastSearch") ? GM_getValue("lastSearch") : "";
		GM_setValue("lastSearch","");
		if ((lastSearch.length > 0) && (ItemTypeID.options.length > 0)) {		//if itemtypeid is set, select it from category listing
			for (i =1;i < ItemTypeID.options.length;++i) {
				if (ItemTypeID[i].value == lastSearch) {
					ItemTypeID[i].selected = true;
					var hack = ItemTypeID.onchange.toString().match(/javascript:(.+)/im);
					if (hack) location.assign("javascript:"+hack[1]+";void(0)"); 	//chrome
					else ItemTypeID.onchange();
				}
			}
		}
	}
}