// ==UserScript==
// @name           eRepublik Indonesia Translation v0.1
// @namespace      http://userscripts.org/users/
// @description    untuk seluruh warga eIndonesia
// @include        http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// menu
	"Home" : "Halaman Utama",
	"Donate" : "Sumbang",
	"Rank" : "Peringkat",
	"Company" : "Perusahaan", 
	"Profile" : "Profil", 
	"Party" : "Partai", 
	"Newspaper" :"Koran",
	"Army" : "Angkatan bersenjata",
	"Country administration" : "Administrasi negara",
        "Organizations" : "Organisasi",
	"Market place" : "Pasar",
	"Monetary market" : "Bursa valuta",
	"Job market" : "Lapangan kerja",
        "Companies for sale" : "Perusahaan untuk dijual",
        "Get gold &amp; extras" : "Dapatkan emas &amp; lainnya",
	"Rankings" : "Peringkat",
	"Social stats" : "Statistik Sosial",
	"Economic stats" : "Statistik Ekonomi",
	"Political stats" : "Statistik Politik",
	"Military stats" : "Statistik Militer",
	"Tools" : "Peralatan",
	"Forum" : "Forum",
	"News" : "Berita",
	"Invite friends" : "Undang teman",
	"eRepublik Shop" : "Toko eRepublik",
	"Career path" : "Perjalanan karir",
	"Ok, thanks, next tip" : "Ok, terima kasih, tips selanjutnya",
	"I have nothing more to say at the moment" : "Tak ada yang ingin kukatakan saat ini",
	"Select" : "Pilih",

	"Marketplace" : "Pasar",
	"Wars" : "Perang",

// country page
	"On the Map" : "Lihat Peta",
	"Total citizens" : "Jumlah warga",
	"New citizens today" : "Warga baru hari ini",
	"Average citizen level" : "Rata-rata level warga",
	"Online now": "Warga yang online",
	"Citizens" : "Warga",
	"Who" : "Siapa",
	"details" : "detail",
	"Society" : "Sosial",
	"Economy" : "Ekonomi",
	"Politics" : "Politik",
	"Military" : "Militer",
	"Administration" : "Administrasi",
	
// countries
	"Argentina" : "Argentina",
	"Australia" : "Australia",
	"Austria" : "Austria",
	"Bosnia and Herzegovina" : "Bosnia dan Herzegovina",
	"Brazil" : "Brazil",
	"Bulgaria" : "Bulgaria",
	"China" : "Cina",
	"Croatia" : "Kroasia",
	"Canada" : "Kanada",
	"Czech Republic" : "Republik Ceko",
	"Denmark" : "Denmark",
	"Estonia" : "Estonia",
	"Finland" : "Finlandia",
	"France" : "Perancis",
	"Germany" : "Jerman",
	"Greece" : "Yunani",
	"Hungary" : "Hungaria",
	"Indonesia" : "Indonesia",
	"Ireland" : "Irlandia",
	"Israel" : "Israel",
	"Italy" : "Italia",
	"Iran" : "Iran",
	"Japan" : "Jepang",
	"Latvia" : "Latvia",
	"Lithuania" : "Lithuania",
	"Malaysia" : "Malaysia",
	"Mexico" : "Meksiko",
	"Moldavia" : "Moldovia",
	"Netherlands" : "Belanda",
	"Norway" : "Norwegia",
	"Pakistan" : "Pakistan",
	"Philippines" : "Filipina",
	"Poland" : "Polandia",
	"Portugal" : "Portugal",
	"Romania" : "Romania",
	"Serbia" : "Serbia",
	"Singapore" : "Singapura",
	"South Africa" : "Afrika Selatan",
	"South Korea" : "Korea Utara",
	"Slovakia" : "Slovakia",
	"Slovenia" : "Slovenia",
	"Switzerland" : "Swiss",
	"Spain" : "Spanyol",
	"Sweden" : "Swedia",
	"Russia" : "Rusia",
	"Thailand" : "Thailand",
	"United Kingdom" : "Britania Raya",
	"Ukraine" : "Ukrania",
	"USA" : "Amerika Serikat",
	"Turkey" : "Turki",
	"World" : "Dunia",
// economy
	"GOLD" : "EMAS",
	"Gold" : "emas",
	"Treasury" : "Kas negara",
	"All accounts" : "Semua mata uang",
	"Country trading embargoes" : "Embargo",
	"Taxes" : "Pajak",
	"food" : "makanan",
	"gift" : "hadiah",
	"weapon" : "senjata",
	"moving tickets" : "tiket",
	"grain" : "gandum",
	"diamonds" : "permata",
	"iron" : "besi",
	"oil"  : "minyak bumi",
	"wood" : "kayu",
	"house" : "rumah",
	"hospital" : "rumah sakit",
	"defense system" : "sistem pertahanan",

	"Salary" : "Upah",
	"Minimum" : "Minimum",
	"Average" : "Rata-rata",

	"Gross domestic product (GDP)" : "Produk domestik bruto (PDB)",
	"Monthly exports" : "Ekspor bulanan",
	"Monthly imports" : "Impor bulanan",
	"Inflation" : "Inflasi",
// company
	"Office" : "Kantor",
	"You have already worked today." : "Anda telah bekerja hari ini.",
	"Come back tomorrow." : "Kembali lagi besok.",
	"Resign" : "Keluar",
	"Employees" : "Karyawan",
	"Raw materials" : "Bahan baku",
	"Show all employees" : "Lihat semua karyawan",
	"Show all donations" : "Lihat semua sumbangan",
	"Go to marketplace" : "Ke pasar",
	"Products" : "Produk",

	"Grain" : "Gandum",
	"Food" : "Makanan",
	"Gift" : "Hadiah",
	"Weapon" : "Senjata",
	"Moving Tickets" : "Tiket",
	"Diamonds" : "Permata",
	"Iron" : "Besi",
	"Oil"  : "Minyak Bumi",
	"Wood" : "Kayu",
	"House" : "Rumah",
	"Hospital" : "Rumah Sakit",
	"Defense System" : "Sistem Pertahanan",
// market
	"Quality Level" : "Tingkat Kualitas",
	"All levels" : "Semua tingkat",
	"Level 1" : "Tingkat 1",
	"Level 2" : "Tingkat 2",
	"Level 3" : "Tingkat 3",
	"Level 4" : "Tingkat 4",
	"Level 5" : "Tingkat 5",

	"Provider" : "Penyedia",
	"Quality" : "Kualitas",
	"Stock" : "Stok",
	"Buy" : "Beli",
	"Market" : "Pasar",

	"Market offers" : "Penawaran pasar",
	"Amount" : "Jumlah",
	"Price" : "Harga",
	"Next" : "Selanjut",
	"Prev" : "Sebelum",
	"No products in this market" : "Tidak ada produk di pasar ini",
	"Jobs available in this company" : "Pekerjaan yang tersedia di perusahaan ini",
	"You don't have any active job offers" : "Perusahaan ini tidak menerima pekerja",
	"You didn't specify the amount of products you wish to buy" : 
		"Anda tidak memasukan jumlah produk yang ingin dibeli",
	"You cannot trade with this country as you are at war with it" :
		"Anda tidak bisa berdagang dengan negara ini karena negara Anda sedang berperang",

// region
        "Heal" : "Sembuhkan",
	"Constructions": "Konstruksi",
	"Population": "Populasi",
	"Productivity" : "Produktifitas",
	"Resistance War" : "Perang Kemerdekaan",
	"Resistance War Active" : "Perang Kemerdekaan yang Aktif",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Anda tidak dapat memulai perang kemerdekaan di region 

ini karena region ini merupakan region asli negara pemiliknya.",
	"Medium" : "Sedang",
	"High": "Tinggi",
	"Neighbors" : "Tetangga",
// marketplace
	"Please select an Industry to see the marketplace offers" :
		"Pilih industri untuk melihat penawaran pasar",
	"Skill Level" : "Tingkat keahlian",
	"All skills" : "Semua",
	"All" : "Semua",
// politics
	"Country Administration" : "Administrasi Negara",
	"Accepted" : "Diterima",
	"Rejected" : "Ditolak",
	"Pending" : "Menunggu",
	"Congress" : "Kongres",
	"Issue Money" : "Cetak Uang",
	"Law proposals" : "Rancangan Undang-undang",
	"Minimum Wage" : "Upah Minimum",
	"Mutual Protection Pact" : "Perjanjian Perlindungan Bersama",
	"Peace Proposal" : "Perjanjian Damai",
	"President" : "Presiden",
	"Yes" : "Ya",
	"No" : "Tidak",
	"Show all law proposals" : "Lihat semua rancangan undang-undang",
	"The law voting process takes 24 hours." : "Proses persetujuan RUU membutuhkan waktu 24 jam.",
	"Only congress members and country presidents have the right to vote." : "Hanya kongres dan presiden negara ini yang boleh memilih.",
	"You are not a president or a congress member in this country." : "Anda bukan presiden atau kongres negara ini.",
// wars
	"no allies" : "tak ada sekutu.",
	"All wars" : "Semua perang",
	"All resistance wars" : "Semua perang kemerdekaan",
	"All Alliances" : "Semua Aliansi",
	"Alliances" : "Aliansi",
	"Military force" : "Kekuatan militer",
	"Average strength" : "Rata-rata kekuatan",
// army
	"You have trained today. You can train again tomorrow." : "Anda sudah berlatih hari ini. Anda bisa berlatih lagi besok.",
	"Force" : "Jumlah",
	"Military rank" : "Pangkat",
	"Military achievements" : "Penghargaan militer",
	"Active wars list" : "Daftar perang aktif",
	"Sergeant" : "Sersan",
	"Corporal" : "Kopral",
	"Private" : "Prajurit",
	"Show active wars" : "Lihat perang aktif",
	"Start a resistance war" : "Mulai perang kemerdekaan",

	"You cannot join this fight because your country is not involved in the war" : "Anda tidak bisa ikut bertempur karena negara Anda tidak terlibat dalam perang ini",
	"There are no resistance wars in this country." : "Tidak ada perang kemerdekaan di negara ini.",
	"until the region can be occupied or secured" : "hingga region ini dapat dikuasai atau dipertahankan",
	"Attackable on President's decision" : "Dapat diserang sesuai pilihan Presiden",
	"Defense Points" : "Poin Pertahanan",
	"Go to Battlefield" : "Pergi ke medan perang",
	"see finished battles" : "lihat pertempuran yang sudah selesai",
	"Wars list" : "Daftar perang",
	"War" : "Perang",
	"Battle history" : "Sejarah pertempuran",
	"Fight" : "Bertempur",
	"Hero" : "Pahlawan",
	"no active battles" : "tak ada perang yang aktif",
	"Started by" : "Dimulai oleh ",
// party
	"You are not a member of a party" : "Anda bukan seorang anggota partai",
	"Join a party" : "Masuk partai",
	"Create new" : "Buat baru",
	"Join" : "Masuk",
	"See all members" : "Lihat semua anggota",
	"Donate Gold" : "Sumbang gold",
	"Members"  : "Anggota",
	"Orientation" : "Orientasi",
	"Show all members" : "Lihat semua anggota",

	"Center" : "Tengah",
	"Anarchist" : "Anarkis",
	"Accounts" : "Akun",
	"Elections" : "Pemilu",
	"Election results" : "Hasil pemilu",
	"Next elections" : "Pemilu selanjutnya",

	"Country Presidency" : "Presiden Negara",
	"Party Presidency" : "Ketua Partai",
	"Party President" : "Ketua Partai",
	"See results" : "Lihat hasil",
	"Expires tomorrow" : "Berakhir besok",
        "No presentation" : "Tak ada presentasi",
        "Presentation" : "Presentasi",
        "Congress member candidates" : "Calon anggota kongres",

// articles
	"Report abuse" : "Lapor penyalahgunaan",
	"today" : "hari ini",
	"yesterday" : "kemarin",
	"one hour ago" : "satu jam yang lalu",
	"Unsubscribe" : "Berhenti",
	"Subscribe" : "Langganan",
	"Article RSS" : "Artikel RSS",
	"Your comment" : "Komentarmu",
	"View all comments" : "Lihat semua komentar",
	"Subscribe to comments" : "Pantau komentar",
	"Unsubscribe to comments" : "Berhenti pantau komentar",
	"Post a comment" : "Beri komentar",
// news
	"You do not have a newspaper" : "Anda tidak memiliki sebuah koran",
	"A newspaper is an efficient way to communicate your news to the eRepublik world. Read more on the eRepublik Wiki. Create your own newspaper." : 
		"Koran adalah cara mudah untuk mengkomunikasikan suatu berita terhadap dunia eRepublik. Lihat lebih lanjut di Wiki eRepublik. Buat koran Anda 

sendiri!",
// profiles
	"Friends" : "Teman",
	"Assets" : "Aset",
	"Press director" : "Direktur Pers",
	"Inventory" : "Tempat barang",
	"Get Gold" : "Beli Emas",
	"Career" : "Karir",
	"Bio" : "Bio",
	"Employee" : "Karyawan",
	"No political activity" : "Tak ada aktifitas",
	"Wellness" : "Kesehatan",
	"Level" : "Level",
	"Strength" : "Kekuatan",
	"Experience" : "Pengalaman",
	"Skills:" : "Keahlian",
	"Land" : "Lahan",
	"Manufacturing" : "Manufaktur",
	"Erepublik Age" : "Umur eRepublik",
	"Get Extra Storage" : "Penyimpanan Ekstra",
	"Party Member" : "Anggota Partai",
	"No activity" : "Tak ada aktifitas",
	"Total damage:" : "Jumlah serangan:",
	"Hard Worker" : "Pekerja Keras",
	"Work for 30 days in a row" : "Bekerja 30 hari berturut-turut",
	"Congress Member" : "Anggota Kongres",
	"Country President" : "Presiden Negara",
	"Win the Presidential elections" : "Memenangkan pemilihan Presiden",
	"Media Mogul" : "Media Mogul",
	"Reach 1000 subscribers to your newspaper" : "Mempunyai 1000 pelanggan di koranmu",
	"Battle Hero" : "Pahlawan Perang",
	"Reach the highest total damage in one battle" : "Mencapai jumlah damage terbesar dalam suatu pertempuran",
	"Resistance Hero" : "Pahlawan Kemerdekaan",
	"Start a resistance war and liberate that region" : "Memulai perang kemerdekaan dan membebaskan wilayah tersebut",
	"Super Soldier" : "Tentara Super",
	"Advance 5 strength levels" : "Memiliki kekuatan 5 atau kelipatannya",
	"Society Builder" : "Pembangun Komunitas",
	"Invite 10 people to eRepublik and help them reach level 6" : "Undang 10 orang ke eRepublik dan bantu mereka mencapai level 6",
	"Check your unlocked features" : "Periksa fitur yang terbuka",
	"Achievements" : "Penghargaan",
	"Edit profile" : "Ubah profil",
	"Edit Profile" : "Ubah Profil",
        "Send message" : "Kirim pesan",
        "Offer a gift" : "Berikan hadiah",
        "Add as a friend" : "Tambah sebagai teman",
 	"Change residence" : "Pindah wilayah",
	"Donations list" : "Daftar sumbangan",
	
	"Your email here" : "Emailmu",
	"Your birthday" : "Ulangtahunmu",
	"Citizen Avatar" : "Avatar",
	"Change password" : "Ganti sandi",


	"Worked 30 days in a row" : "Telah bekerja 30 hari berturut-turut",
	"Win the Congress elections": "Memenangkan pemilihan Kongres",
// fight
	"Back to battlefield" : "Ke medan tempur",
	"Fight Again" : "Bertempur lagi",
	"Fight bonus" : "Bonus bertempur",
// organizations
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : 
		"Untuk masuk log sebagai organisasi, Anda harus keluar log dari akun Anda dan masuk log dengan nama dan kata kunci organisasi.",
	"My Organizations" : "Organisasiku",
	"Logout" : "Keluar",
	"Organizations created by you:" : "Organisasi yang dibuat olehmu:",
// career-path
	"General manager" : "Pemilik perusahaan",
// ranking
	"No." : "No.",
	"Hard worker" : "Pekerja keras",
// messages
        "Inbox" : "Pesan masuk",
	"Sent" : "Kirim",
	"Alerts" : "Peringatan",
	"Subscriptions" : "Koran langganan",
	"new article" : "artikel baru",
	"Delete" : "Hapus",
	"Read Message" : "Baca Pesan",
	"Reply" : "Balas",
	"From" : "Dari",
// flash menu
	"My places > Army" : "Angkatan bersenjata",
	"My places > Newspaper" : "Koran",
	"My places > Organizations" : "Organisasi",

// from the regexps
 	"started by " : "dimulai oleh: ",
	"Total damage" : "Total serangan",
	"Basic damage" : "Serangan dasar",
	"You can get wellness from: " : "Anda bisa menambahkan kesehatan dari: ",
	"You must be at least" : "Anda setidaknya harus",
	"to be able to train\\. Now, you can:" : "untuk dapat berlatih. Sekarang, anda dapat:",
	"Started a resistance war and liberated" : "Memulai sebuah perang kemerdekaan dan bebaskan",
	"regions\\." : "wilayah.",
	"National Rank" : "Peringkat Nasional",
	"Alliance" : "Alliansi",
	"donations list" : " daftar sumbangan",
	"has retreated from the battlefield" : "telah mundur dari pertempuran",

// 2009.04.21. via_mala added
"Buy extra storage" : "Penyimpanan Ekstra",
"Buy wellness" : "Tambah kesehatan",
"days" : "hari",
"months" : "bulan",
"years" : "tahun",
"online" : "online",
"No shouts posted by this Citizen yet" : "Tidak ada seruan yang di buat Warga ini",
"Fights" : "Bertempur",
"See all donations" : "Lihat semua sumbangan",
"Price with taxes" : "Harga dengan pajak",
"Show candidate list" : "Lihat daftar kandidat",
"Show candidates list" : "Lihat daftar kandidat",
"See candidate list" : "Lihat daftar kandidat",
"No candidate proposed" : "Tak ada kandidat yang diajukan",
"Candidate" : "Kandidat",
"candidates" : "kandidat",
"You haven't worked today." : "Anda belum bekerja hari ini",
"You have not worked today." : "Anda belum bekerja hari ini",
"Skill" : "Keahlian",
"Apply" : "Lamar",
"You are already an employee. To get this job please quit your current job." : "Anda telah menjadi karyawan. Untuk bisa mengambil pekerjaan ini anda harus keluar dari 

perusahaan anda.",
"Work" : "Kerja",
"Back to company" : "Ke perusahaan",
"Back to army" : "Ke angkatan bersenjata",
"You haven't trained today" : "Anda belum berlatih hari ini",
"You have not trained today" : "Anda belum berlatih hari ini",
"Train" : "Latihan",
"Training" : "Berlatih",
"Train bonus" : "Bonus latihan",
"Strength gained" : "Kekuatan naik",
"Show my offers" : "Penawaranku",
"Post new offer" : "Tambah Tawaran",
"Exchange rate" : "Nilai penukaran",
"Get Wellness" : "Tambah Wellness",
"eRepublik Birthday" : "Ulangtahun eRepublik",
"Basic productivity" : "Produktifitas dasar.",
"Total productivity" : "Total Produktifitas.",
"Work Bonus" : "Bonus Bekerja",
"more events" : "peristiwa lainnya",
"National" : "Nasional",
"International" : "Internasional",
"Top rated" : "Terpopuler",
"Latest" : "Terbaru",
"Shouts" : "Seruan",
"Shout" : "Serukan",
"Shout something:" : "Serukan sesuatu:",
"Official" : "Resmi",
"Everyone" : "Semua orang",
"Daily salary" : "Upah harian",
"Last presence" : "Terakhir bekerja",
"Salary / day" : "Upah / hari",
"Never worked" : "Tidak pernah",
"Minimum country wage :" : "Upah minimum negara :",
"Company page" : "Halaman perusahaan",
"Search citizen" : "Cari warga",
"Rec exchange rate" : "Saran nilai penukaran",
"Sell" : "Jual",
"Industry" : "Industri",
"Create new company" : "Buat perusahaan baru",
"Create company" : "Buat perusahaan",
"eRepublik Gold is the main reference point for all the local virtual currencies and it is used to buy additional features within eRepublik." : "eRepublik Gold is the main 

reference point for all the local virtual currencies and it is used to buy additional features within eRepublik.",
"Select amount" : "Pilih jumlah",
"Go to eRepublik" : "Ke eRepublik",
"Citizen fee" : "Citizen fee",
"Gross Domestic Product" : "Produk Domestik Bruto",
"General" : "Umum",
"Remove friend" : "Hapus teman",

// 2009.04.28. via_mala added
"ACCEPTED" : "DITERIMA",
"REJECTED" : "DITOLAK",
"War status" : "Status perang",
"Active wars" : "Perang aktif",
"Ended wars" : "Perang yang berakhir",
"Countries involved" : "Negara yang terlibat",
"All countries" : "Semua negara",
"Company market" : "Pasar perusahaan",
"Show results" : "Lihat hasil",
"Final Results" : "Hasil akhir",
"Member of" : "Anggota dari",
"No. of votes" : "Suara",
"Total votes" : "Jumlah suara",
"You cannot work today because the company does not have enough raw materials for products. We have just sent an alert to the general manager about this issue." : 

"Perusahaan tidak mempunyai bahan baku yang cukup untuk membuat produk. Kami akan mengirimkan peringatan kepada pemilik perusahaan. Anda dapat keluar dari 

pekerjaan jika anda mau.",
"You cannot work today because the company does not have enough money to pay you. We have just sent an alert to the general manager about this issue." : "Perusahaan 

tidak mempunyai cukup uang untuk membara anda. Kami akan mengirimkan peringatan kepada pemilik perusahaan. Anda dapat keluar dari pekerjaan jika anda mau.",
"Become a citizen" : "Menjadi warga",
"It's 100% free and only takes a minute or two" : "Ini 100% gratis dan hanya memerlukan beberapa menit",
"It's 100% free and" : "Ini 100% gratis dan",
"only takes a minute or two" : "hanya memerlukan beberapa menit",
"Enter the new world" : "Masuki dunia baru",

// via_mala: temp multiplicity: átmeneti ismétlés a JS kód javításáig
"Citizen name" : "Nama warga",
"Citizen Name" : "Nama Warga",
"4-30 characters" : "4-30 huruf",
"Password" : "Sandi",
"Retype" : "Ulangi sandi",
"Retype password" : "Ulangi sandi",
"Location" : "Lokasi",
"Email must be valid for registration, so do not cheat" : "Email harus benar untuk registrasi, jadi jangan menipu",
"Birthday" : "Ulangtahun",
"Gender" : "Jenis Kelamin",
"Male" : "Pria",
"Female" : "Wanita",
"I agree with the Terms of Service" : "Saya setuju dengan Ketentuan Layanan",
"Sign up for the weekly newsletter" : "Daftar untuk koran mingguan",
"Minimum number of characters is 6" : "Minimum number of characters is 6",
"Forgot password?" : "Lupa sandi?",
"Remember me" : "Ingat saya",
"Land skill" : "Keahlian berlahan",
"Manufacturing skill" : "Keahlian manufaktur",
"Constructions skill" : "Keahlian konstruksi",
"Debate Area" : "Area Debat",
"New" : "Baru",
"Old" : "Lama",
"Day" : "Hari ke ",
"of the New World" : " di Dunia Baru",
"Language:" : "Bahasa: ",
"Value added tax (VAT)" : "Value added tax (VAT)",
"Import Tax" : "Pajak Import",
"Income Tax" : "Income Tax",
"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the 

chance to become a Congress Member or even the President." : "You can join a party from it's presentation page or you can create your own party if you cannot find the 

right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President.",
"Items" : "Barang",
"Money" : "Uang",
"Drag and drop items from your inventory to the donation area" : "Tarik dan lepaskan barang dari tempat barangmu ke area donasi",
"Your inventory" : "Tempat barangmu",
"Donation" : "Sumbangan",
"All donations" : "Semua sumbangan",
"If your citizen account represents an organization (SO) created in the eRepublik beta version, please send us a message using the Contact form (category: Others) so that 

we can officially change it to an organization."
: "",
"After 15th of December 2008 all SO's not transferred to Organizations will be considered fake accounts and will be banned."  : "",
"After 5 days the alerts are automatically deleted" : "Setelah 5 hari, peringatan akan dihapus secara otomatis",
"Select All" : "Pilih Semua",
"change your location" : "ganti lokasimu",
"train" : "latihan",
"send initiations to your friends to join eRepublik" : "kirim undangan ke temanmu untuk bergabung di eRepublik",
"Name" : "Nama",
"Country" : "Negara",
"Experience points" : "Poin Pengalaman",
"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an 

organization" : "Bahan baku hanya dapat dibeli dengan akun perusahaan (ganti akun dengan cara menekan tombol di bagian kanan atas) atau organisasi.",
"There are no offers on the marketplace for this industry" : "Tidak ada penawaran di pasar untuk jenis industri ini",
"Minimum skill" : "Keahlian minimum",
"Minimum Skill" : "Keahlian Minimum",
"You do not have the required skill for this position" : "Anda tidak memiliki cukup keahilan untuk mengambil posisi ini",
"Country - Society" : "Negara - Komunitas",
"There are no discovered resources in this region yet" : "Tidak ada sumber daya ditemukan di daerah ini",
"Defense system" : "Sistem pertahanan",
"Select a party" : "Pilih partai",
"to show it's Candidates" : "untuk melihat Kandidat",
"Permanently banned" : "Meninggal :P",


};

trim = function (str) {
    return str!==null ? str.replace(/^(\s|&nbsp;)*/, "").replace(/(\s|&nbsp;)*$/, "") : null;
};


var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 szövetséges";
regexps["^Active wars in (.*)$"] = "Aktív háborúk $1-ban";
regexps["(\\s*)Expires in (\\d*) days"] = "Lejár $2 napon belül";
regexps["^(\\d*) comments$"] = "$1 megjegyzés";
regexps["^(\\d*) hours ago$"] = "$1 órája";
regexps["^(\\d*) minutes ago$"] = "$1 perce";
regexps["^(\\d*) days ago$"] = "$1 napja";
regexps["^Regions \\((\\d*)\\)"] = "Régiók ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Barátok ($1)";
regexps["^(\\d*) months ago"] = "$1 hónapja";
regexps["^(\\d*) months"] = "$1 hónap";
regexps["^Comments(.*)"] = "Megjegyzések$1";
regexps["^(\\d*) active battles"] = "$1 aktív csata";
// 2009.04.21. via_mala added
regexps["^You worked (\\d*) days in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "Eddig $1 napot dolgoztál egyhuzamban. További $2 

napot kell még dolgoznod, hogy a 'Munka Hose Érdemrendet' megkapd";
regexps["^You worked( +)one day in a row\\.You have (\\d+) more days until you receive a 'Hard Worker' Medal"] = "Eddig egy napot dolgoztál egyhuzamban. További $2 

napot kell még dolgoznod, hogy a 'Munka Hose Érdemrendet' megkapd";
regexps["^Next election in (\\d*) day\\."] = "A következo választás $1 nap múlva esedékes.";
regexps["^(\\d) congress (.*) members"] = "A kongresszus létszáma $1 fo.";
regexps["^(\\d)% of Congress"] = "A kongresszustagok száma: $1";
regexps["^Amount to buy$"] = "Vásárolandó mennyiség";
regexps["(\\d*)\\.(\\d*)\\.(\\d*) - "] = "$3.$2.$1 - ";
regexps["Day (\\d+) of the New World"] = "Az Új Világ $2. napja";
regexps["^All employees \\((\\d*)\\)"] = "Az összes alkalmazott ($1)";
regexps["^Active resistance wars in (.*)"] = "Aktív függetlenségi háborúk $1 -ban/ben/on/en/ön";
regexps["^Official candidates \\((\\d*)\\)"] = "Hivatalos jelölt ($1)";
regexps["^Wildcards \\((\\d*)\\)"] = "Helyettes ($1)";
regexps["^Not qualified \\((\\d*)\\)"] = "Nem alkalmas ($1)";
regexps["Presence:  (\\d*)\\.(\\d*)%"] = "Részvételi arány: $1.$2";
regexps["^(\\d+) candidate(s)?$"] = "$1 jelölt";
regexps["^(\\d+) citizen(s)?$"] = "$1 polgár";
regexps["^You cannot resign from your job until (.*)"] = "$1 -ig nem mondhatsz fel a munkahelyeden";
regexps["^Proposed by (.*), (.*) hours ago"] = "Eloterjesztve $1 által $2 órával ezelott";
regexps["^Tax change:(.*)"] = "Adó változtatás:$1";
regexps["^Successfuly transfered (.*) item\\(s\\) to (.*)\\."] = "Sikeres volt a(z) $1 tárgy átadása $2 -nak/nek.";
regexps["^You have successfuly offered a quality (\\d+) gift\\."] = "Sikeresen felajánlottál egy $1-es/as/ös szintu ajándékot.";
regexps["You have successfully donated (.*)\\. This amount will appear shortly in the citizen/organization account\\."] = "Sikeresen átadtál $1-t. Az összeg hamarosan 

megjelenik a polgár/szervezet számláján.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. Now you have the possibility to (.*)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = 

"Gratulálok, elérted a(z) $2 tapasztalati szintet! Most már van lehetoséged $3 -ra/re. A $4 szint eléréséhez $5 tapasztalati pontra van szükséged.";
regexps["Congratulations, you(r)? have reached experience level (\\d+)\\. To reach level (\\d+) you need (\\d+) experience points\\."] = "Gratulálok, elérted a(z) $2 tapasztalati 

szintet! A $3 szint eléréséhez $4 tapasztalati pontra van szükséged.";
regexps["Congratulations, you(r)? have reached experience level (\\d+) and you have received as a reward (\\d+) Gold\\. To reach level (\\d+) you need (\\d+) experience 

points\\."] = "Gratulálok, elérted a $2 tapasztalati szintet, amiért jutalmul $3 aranyat kaptál. A $4 szint eléréséhez $5 tapasztalati pontra van szükséged.";
regexps["^( *)The General Manager of"] = "A vezérigazgaztója ennek a cégnek:";
regexps["has modified your salary from (.*) to (.*)\\.( *)$"] = "a fizetésedet $1-ról/rol $2-ra/re módosította.";
regexps["We are sorry to inform you that the General Manager of (.*) has decided to fire you! But don't worry, you can get a new job or you can even buy a company\\."] = 

"Sajnálattal közöljük, hogy a $1 vezérigazgatója úgy döntött, hogy elbocsájt. Azonban semmi ok a bánkódásra, mert szerezhetsz új állást, vagy alapíthatsz saját vállalatot 

is.";
regexps["^Inbox \\(d+\\)"] = "Bejövo ($1)";
regexps["There is no more food in your inventory\\. Without food to eat your Citizen loses (\\d+) wellness each day until he dies\\. To avoid death by starvation we advise you 

to buy food from the (.*)"] = "Nincs több élelmiszered. Élelem nélkül a polgárod $1 egészség pontot veszít naponta, amíg végül éhenhal. Ezt elkerülendo javasoljuk, hogy 

vásárolj élelmiszert a piacon -->";
regexps["You have succesfully bought (\\d+) product(s)? for (.*)(\\.)?$"] = "Sikeresen vásároltál $1 terméket $3 -ért.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. Your current wellness is (.*)"] = "Nem szállhatsz be a küzdelembe, mert az egészséged 

nem éri el a $1-et/at/öt. Jelenleg $2 az egészséged.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\."] = "Nem szállhatsz be a küzdelembe, mert az egészséged nem éri el a $1-et/at/öt.";
regexps["You cannot join this fight because your wellness must be at least (\\d+)\\. You can get wellness from (.*)"] = "Nem szállhatsz be a küzdelembe, mert az 

egészséged nem éri el a $1-et/at/öt. Gyógyuláshoz a kórházba kell menned -->";
regexps["(\\d+) Citizens"] = "$1 polgár";
regexps["You received (\\d+) wellness from hospital\\."] = "Aranykezu doktorok összeférceltek és csinos novérkék ápolgattak, úgyhogy $1-t nott az egészséged. :)";
regexps["You need at least (\\d+) Experience Points to join this fight"] = "Még legalább $1 tapasztalati pontra van szükséged, hogy beszállhass a küzdelembe";
regexps["President of (.*) has proposed an alliance with (.*)"] = "$1 miniszterelnöke szövetséget ajánlott $2-nak";
regexps["President of (.*) proposed an alliance with (.*)"] = "$1 miniszterelnöke szövetséget ajánlott $2-nak";
regexps["Citizen fee change from (.*) to (.*)"] = "Az állampolgár költségének megváltoztatása $1-ról/rol $2-ra/re";
regexps["Do you agree to transfer (.*) from the country accounts to (.*)\\?"] = "Egyetértesz-e azzal, hogy az állam pénztára átutaljon $1-t a(z) $2-nak/nek?";
regexps["Do you agree with the proposal to issue (.*) for (.*) GOLD\\?"] = "Egyetértesz-e azzal, hogy $1-ot kibocsássunk $2 aranyért?";
regexps["Do you agree that (.*) should buy a (.*) of quality (\\d+) from (.*) company at the price of (.*) for (.*)\\?"] = "Egyetértesz-e azzal, hogy $1-nak/nek meg kellene 

vennie egy $3 -es/as/ös szintu $2-t $5 -ért a $4 vállalattól $6 számára?";
regexps["Do you agree on the text used by the president to welcome new Citizens in your country\\?"] = "Egyetértesz-e az alábbi szöveggel, amellyel az államelnök 

köszönti az új polgárokat?";
regexps["The President of (.*) offered a sum of (.*) Gold to your National Treasury in return to a peace treaty with (.*)\\. <br><br>"] = "$1 miniszterelnöke $2 aranyat kínált a 

Nemzeti Kincstárnak a $3-i békemegállapodásért cserébe. <br><br>";
regexps["You have received (\\d+) gift of quality (\\d+) from"] = "Kaptál $1 darab $2 szintu ajándékot";
regexps["\\. Your wellness has been increased with (\\d+)\\."] = "-tól/tol. Az egészséged $1 ponttal növekedett.";
regexps["(.*) has accepted your friendship request"] = "$1 elfogadta a barátkozási szándékodat";
regexps["supported by (\\d+) parties"] = "$1 párt által támogatva";
regexps["(\\d+)-(\\d+) characters max"] = "Max. $1-$2 karakter";
regexps[" has transfered (\\d+) product(s)? to your inventory\\. Check your"] = " átadott neked $1 terméket. Ellenorizd az ";
regexps[" has transfered (.*) to your account\\."] = " átutalt $1-t a számládra.";
regexps["(\\d+) active battles"] = "$1 aktív csata";
regexps["eRepublik is about changing the course of history in a huge virtual society\\. As a citizen in this New World of (.*) you have the power to make a difference and 

fulfill your economic, political or military goals like never possible before\\."] = "Az eRebublik arról szól, hogy változtassuk meg a történelem menetét egy hatalmas virtuális 

társadalomban. Az Új Világ $1 tagú társadalmának polgáraként hatalmadban áll változtatni és beteljesíteni gazdasági, politikai avagy katonai ambícióidat, ahogyan eddig 

még soha.";
regexps["Lead your citizens to prosperity as a country president or control the market as a rich company manager\\. With over (\\d+) countries, (.*) businesses, and varied 

country resources, your strategy and know-how can take you to the top\\."] = "Juttasd polgáraidat a jóléthez mint az állam elnöke vagy irányítsd a piacot mint gazdag 

cégvezeto. Több mint $1 ország $2 vállalatával és az ország változatos eroforrásaival a stratégiád és a hozzáértésed a csúcsra juttathat.";
regexps["Become influential with the power of your words, win others over with your ideas, or interview celebrities - the choice is yours. By starting your own newspaper and 

networking with your fellow citizens the impact of your voice is up to you."] = "Válj befolyásossá a szavaid ereje által, gyozz meg másokat az ötleteiddel, vagy interjúvolj 

meg hírességeket - a választás a tied. Saját hírlap alapításával és a polgártársaiddal való kapcsolatok kiépítésével a szavaid hatása rajtad múlik.";
regexps["Diplomacy helps, but when it comes to war you will need to get a weapon and defend your country's borders - or expand them\\. From showing your patriotism to 

being a mercenary, the future of the New World is in your hands\\."] = "A diplomácia sokszor segít, de amikor háborúra kerül a sor, akkor fegyvert kell ragadnod és meg kell 

védened országod határait - vagy ki kell terjesztened azokat. Hazafiasságod kimutatásától kezdve a zsoldosságig bezárólag az Új Világ jövoje a te kezedben nyugszik.";
regexps["Work for (\\d+) days in a row"] = "Dolgozz $1 napig egyhuzamban";
regexps["Worked (\\d+) days in a row"] = "$1 napig dolgozott egyhuzamban";
regexps["Advance (\\d+) strength levels"] = "Lépj $1 ero szintet";
regexps["Advanced (\\d+) strength levels"] = "$1 ero szintet lépett";
regexps["Reach (\\d+) subscribers to your newspaper"] = "Hírlapod érje el a(z) $1 elofizetoszámot";
regexps["Reached (\\d+) subscribers to your newspaper"] = "Hírlapja elérte a(z) $1 elofizetoszámot";
regexps["Invite (\\d+) people to eRepublik and help them reach level (\\d+)"] = "Hívj meg $1 embert az eRepublik-ba és segíts nekik elérni a $2. szintet";
regexps["Invited (\\d+) people to eRepublik and help them reach level (\\d+)"] = "Meghívott $1 embert az eRepublik-ba és segített nekik elérni a $2. szintet";
regexps["wants to add you to (her|his) friends list\\. Will you accept\\?"] = "hozzá akar adni a barátjai listájához. Elfogadod?";
regexps["Sorry, you need to reach experience level (\\d) in order to send invitations\\."] = "Sajnálom, de elobb el kell érned a $1. szintet, hogy meghívót küldhess.";
regexps["The President of (.*) demanded a sum of (.*) Gold from your National Treasury in return to a peace treaty with (.*)\\."] = "$1 államelnöke $2 aranyat követel a 

Nemzeti Kincstáradtól a $3-val/vel kötendo békeszerzodésért cserébe.";
regexps["(P|p)roposed by"] = "Eloterjesztette:";
regexps["(T|t)oday"] = "ma";
regexps["(Y|y)esterday"] = "tegnap";
regexps["Mutual Protection Pact"] = "Kölcsönös védelmi egyezség / megnemtámadási szerzodés";
regexps["Trading Embargo"] = "Kereskedelmi embargó";
regexps["President of (.*) proposes to stop the trade with (.*)"] = "$1 elnöke javasolja a kereskedés beszüntetését $2-val/vel";
regexps["(F|f)ood"] = "élelmiszer";
regexps["(g|G)ift"] = "ajándék";
regexps["(w|W)eapon"] = "fegyver";
regexps["(g|G)rain"] = "búza";
regexps["(d|D)iamonds"] = "gyémántok";
regexps["(i|I)ron"] = "vas";
regexps["(o|O)il" ] = "olaj";
regexps["(w|W)ood"] = "fa";
regexps["(h|H)ouse"] = "ház";
regexps["(h|H)ospital"] = "kórház";
regexps["(d|D)efense system"] = "védelmi rendszer";
regexps["(G|g)(O|o)(L|l)(D|d)"] = "Arany";
regexps["(M|m)oving (T|t)ickets"] = "repülojegyek";



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
    "span":"" , "a":"", "h2":"","th":"", "td":"", "p":"", "strong":"", "div":"",
// 2009.04.28. via_mala added
    "i":"", "b":"", "em":"", "font":"", "h1":"", "li":"", "label":""
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
};


translateDomNode = function(rootNode)  {
  var node = undefined;
  var translation = undefined;
  for (var tagName in allTrans) {
    var tags = rootNode.getElementsByTagName(tagName);
    for (var key in tags) {
      node = tags[key];
      // if ( node.tagName == "INPUT" && node.type == "button" )
      if ( node.tagName.toLowerCase () == "input" && node.type.toLowerCase () == "button" ) {
        translation = translateWithRegexp(node.value);
        if (translation!==undefined) {
          node.value = translation;
        }
      } else if (node.childNodes.length==1) {
        translation = translateWithRegexp(node.innerHTML);
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
};

var blockEvent = false;

translateWholePage = function(e) {
  blockEvent = true;
  translateDomNode(document);
  blockEvent = false;
};

translateNode = function (e) {
  if ( blockEvent ) {
    return;
  }
  blockEvent = true;
  var node = e.relatedNode;
  var translate = translateWithRegexp(node.innerHTML);
  if (translate !== undefined) {
     node.innerHTML = translate;
     blockEvent = false;
     return;
  }
  translateDomNode(node);
  blockEvent = false;
};


window.addEventListener("load", function(e) { 
  translateWholePage(e); 
  fixFlash();
}, false);

document.addEventListener("DOMNodeInserted", translateNode, false);