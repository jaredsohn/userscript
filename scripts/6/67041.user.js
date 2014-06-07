// ==UserScript==
// @name             eRepublik in Indonesian language
// @namespace        Newest edition
// @description      Install and enjoy
// @version          1
// @include          http://www.erepublik.com/*
// ==/UserScript==

var strings = {
// translations
	"+10 Wellness / 2 Gold" : "+10 Wellness / 2 Gold",
	"% of votes" : "% suara",
	"6-30 characters max" : "maksimum 6-30 karakter",
	"A newspaper is an efficient way to communicate your news to the Erepublik world. Read more on the Erepublik wiki. Create your own newspaper." : "Suratkabar adalah cara yang efisien untuk menyebarkan berita Anda ke dunia eRepublik. Baca lebih lanjut di eRepublik wiki. Buat suratkabarmu sendiri.",
	"ACCEPTED" : "DITERIMA",
	"Accepted" : "Diterima",
	"Accounts" : "Akun",
	"Achievements" : "Penghargaan",
	"active battles" : "Perang yang sedang berlangsung",
	"Active wars list" : "Daftar perang yang sedang berlangsung",
	"Add a job offer" : "Tambah lowongan pekerjaan",
	"Add as a friend" : "Daftarkan sebagai teman",
    	"Ambient on/off" : "Atur latar belakang",
	"Administration" : "Administrasi",
   	"Amount" : "Jumlah",
	"ADMINISTARATION CENTER" : "PUSAT ADMINISTRASI",
	"Advanced 5 strength levels" : "Mencapai 5 tingkat strength",
	"Advertising Department" : "Departemen Periklanan",
	"Affiliates" : "Afiliasi",
	"Alerts" : "Peringatan",
	"All accounts" : "Semua mata uang",
	"All Alliances" : "Semua aliansi",
	"All countries" : "Semua negara",
	"All donations" : "Semua sumbangan",
	"all donations" : "semua sumbangan",
	"All employees" : "Semua pekerja",
	"All levels" : "Semua tingkatan",
	"All resistance wars" : "Semua perang kemerdekaan",
	"All skills" : "Semua skill",
	"All wars" : "Semua perang",
	"Alliance" : "Aliansi",
	"Alliances" : "Aliansi",
	"Amazing fight" : "Luar biasa",
	"Ambassador" : "Duta Besar",
	"Amount" : "Jumlah",
	"Amount to buy" : "Jumlah beli",
	"Anarchist" : "Anarkis",
	"Apply" : "Daftar",
	"Argentina" : "Argentina",
	"Army" : "Tentara",
	"Article RSS" : "Artikel RSS",
	"Assets" : "Aset",
	"Attackable on President's decision" : "Dapat diserang dengan persetujuan Presiden",
	"Attention: NO VAT tax for Raw materials" : "Keterangan: Tidak ada PPN untuk Bahan Baku",
	"August" : "Agustus",
	"Australia" : "Australia",
	"Austria" : "Austria",
	"Average" : "Rata-rata",
	"Average Citizen level" : "Rata-rata Level Penduduk",
	"Average citizen level" : "Rata-rata level penduduk",
	"Average strength" : "Rata-rata strength",
	"Back" : "Kembali",
	"Back to battlefield" : "Kembali ke peperangan",
	"Basic damage" : "Damage dasar",
	"Battle Hero" : "Pahlawan Perang",
	"Battle History" : "Histori Perang",
	"Battle history" : "Histori perang",
    	"Battles you can fight in" : "Peperangan yang bisa Anda ikuti",
	"Belgium" : "Belgia",
	"Bio" : "Bio",
	"Bolivia" : "Bolivia",
	"BORDER AREA" : "WILAYAH BATAS",
	"Bosnia and Herzegovina" : "Bosnia dan Herzegovina",
	"Brazil" : "Brazil",
	"Bulgaria" : "Bulgaria",
	"Buy" : "Beli",
	"Buy Constructions" : "Beli Bangunan",
	"Buy Constructions: Defense System" : "Beli Bangunan: Sistem Pertahanan",
	"Buy Constructions: Hospital" : "Beli Bangunan: Rumah Sakit",
	"Buy export license" : "Beli izin ekspor",
	"Buy extra storage" : "Beli penyimpanan ekstra",
	"Buy from market" : "Beli dari pasar",
	"Buy market license" : "Beli izin penjualan",
	"Buy raw materials" : "Beli bahan baku",
	"Buy wellness" : "Beli wellness",
	"Buy Wellness Box" : "Beli Wellness Box",
	"Canada" : "Kanada",
	"Candidate" : "Kandidat",
	"CAPITAL" : "IBUKOTA",
    	"Captain" : "Kapten",
	"CAPTURED" : "DIKUASAI",
	"Career" : "Karir",
	"Career path" : "Titian Karir",
	"Center" : "Pusat",
        "Change" : "Ubah",
	"Change password" : "Ubah password",
	"Change residence" : "Ubah tempat tinggal",
        "check current status" : "cek status sekarang",
	"Check your unlocked features" : "cek fitur yang telah terbuka",
	"Chat rooms" : "Ruang chat",
        "Chat room details" : "Detail ruang chat",
	"Chile" : "Chili",
	"China" : "China",
	"Citizen Avatar" : "Avatar",
	"Citizen fee" : "Biaya penduduk",
        "Citizen name" : "Nama penduduk",
	"Citizens" : "Penduduk",
        "citizens" : "penduduk",
	"Citizenship" : "Kewarganegaraan",
        "Citizenship requests" : "Permintaan Kewarganegaraan",
	"CITY" : "WILAYAH KOTA",
	"Collect" : "Ambil",
	"Colombia" : "Kolombia",
        "Colonel" : "Kolonel",
	"Come back tomorrow." : "Kembali besok.",
	"Companies" : "Perusahaan",
	"Companies for sale" : "Perusahaan dijual",
	"Company" : "Perusahaan", 
	"Company accounts" : "Akun perusahaan", 
	"Company page" : "Halaman perusahaan",
	"Community" : "Komunitas",
	"Conquer" : "Menguasai",
	"Congress" : "Kongres",
	"Congress Elections" : "Pemilihan Kongres",
	"Congress Member" : "Anggota Kongres",
	"Constructions": "Konstruksi",
	"Contact": "Hubungi",
	"Copyright" : "Hak Cipta",
	"Corporal" : "Kopral",
	"Corporate career" : "Karir Perusahaan",
	"Cost" : "Biaya", 
	"Countries" : "Negara",
	"Country" : "Negara",
	"Country - Society" : "Negara - Sosial",
	"Country Administration" : "Administrasi Negara",
	"Country administration" : "Administrasi negara",
	"Country Presidency" : "Kepresidenan",
	"Country President" : "Presiden",
	"Country stats" : "Statistik negara",
	"Country trading embargoes" : "Embargo dagang negara",
	"Create" : "Buat",
        "Create chat room" : "Buat ruang chat",
	"Create new" : "Buat baru",
	"Create new company" : "Buat perusahaan baru",
        "Create room " : "Buat ruang",
	"Croatia" : "Kroasia",
        "Current Damage" : "Damage saat ini",
	"Current location" : "Lokasi saat ini",
        "Current national goals" : "Tujuan nasional saat ini",
	"Czech Republic" : "Republik Ceko",
	"Day" : "Tanggal ",
	"days ago" : "hari yang lalu",
	"Daily salary" : "Gaji harian",
	"Debate Area" : "Area Debat",
	"December" : "Desember",
	"Declare War" : "Nyatakan Perang",
	"Defense Points" : "Nilai Pertahanan",
	"Defense System" : "Sistem Pertahanan",
	"Defense system" : "Sistem pertahanan",
	"defense system" : "sistem pertahanan",
	"Delete" : "Hapus",
	"Denmark" : "Denmark",
        "Description" : "Penjelasan",
	"details" : "detail",
	"Diamonds" : "Diamond",
	"diamonds" : "Diamond",
	"Disscusion area" : "Area diskusi",
	"Donate" : "Sumbang",
	"Donate Gold" : "Sumbang Gold",
	"Donate raw materials" : "Sumbang bahan baku",
	"Donation" : "Sumbangan",
	"Donations list" : "Daftar sumbangan",
	"Drag and drop items from your inventory to the donation area" : "Seret dan drop barang dari penyimpanan Anda ke area sumbangan",
	"Economic stats" : "Statistik ekonomi",
	"Economical orientation" : "Orientasi ekonomi",
	"Economy" : "Ekonomi",
	"Edit details" : "Sunting detail",
	"Edit profile" : "Sunting profil",
	"edit profile" : "sunting profil",
	"Election results" : "Hasil pemungutan suara",
	"Election" : "Pemungutan suara",
	"Elections" : "Pemungutan suara",
	"Email must be valid for registration, so don't cheat" : "Email harus benar untuk registrasi, jangan mengisi alaman email yang salah.",
	"Employee" : "Pekerja",
	"Employees" : "Pekerja",
	"eRepublik Birthday" : "Hari lahir eRepublik",
	"Erepublik Age" : "Umur eRepublik",
	"eRepublik Laws" : "Hukum eRepublik",
	"Estonia" : "Estonia",
	"Everyone" : "Semua orang",
	"Exchange rate" : "Kurs",
	"Experience" : "Experience",
	"Experience points" : "Jumlah experience",
	"Expires tomorrow" : "Habis esok",
	"Field Marshal" : "Field Marshal",
	"Fight" : "Berperang",
	"Fights" : "Perang",
	"Fight Again" : "Berperang lagi",
	"Fight bonus" : "Bonus perang",
	"Finances" : "Keuangan",
	"Final Results" : "Hasil Akhir",
	"Find out more" : "Ketahui lebih lanjut",
	"Finland" : "Finlandia",
	"Follow us" : "Ikuti kami",
	"Food" : "Makanan",
	"food" : "makanan",
	"For the law to be considered accepted it needs 66% of the Congress votes" : "Butuh 2/3 dukungan kongres agar hukum diterima",
	"for 10 shouts/day and more" : "untuk 10 shout per hari dan lebih banyak",
	"Force" : "Kekuatan",
	"Forfeit points" : "Nilai pelanggaran",
        "Forgot password?" : "Lupa password ?",
	"forum" : "forum",
	"Forum" : "Forum",
        "Forum discussions" : "Forum diskusi",
	"France" : "Prancis",
	"Friends" : "Teman",
	"General Manager" : "General Manager",
	"Germany" : "Jerman",
	"Get Extra Storage" : "Dapatkan penyimpanan ekstra",
	"Get Gold" : "Dapatkan Gold",
	"Get gold & extras" : "Mendapatkan Gold dan lainnya",
	"Gift" : "Hadiah",
	"gift" : "hadiah",
	"Go to Battlefield" : "Ke Peperangan",
	"Go to marketplace" : "ke pasar",
	"GOLD" : "GOLD",
	"Gold" : "Gold",
        "golds" : "gold",
	"Grain" : "Gandum",
	"grain" : "gandum",
	"Great fight" : "Bagus",
	"Greece" : "Yunani",
	"Gross domestic product (GDP)" : "Produk Domestik Bruto (PDB)",
	"Guest" : "Tamu",
	"Hard Worker" : "Pekerja Keras",
	"Heal" : "Heal",
	"Hero" : "Pahlawan",
	"High": "Tinggi",
	"Home" : "Beranda",
	"Hospital" : "Rumah Sakit",
	"hospital" : "rumah sakit",
	"House" : "Rumah",
	"house" : "rumah",
	"Hungary" : "Hungaria",
	"I have nothing more to say at the moment" : "Tidak ada lagi yang bisa saya sampaikan saat ini.",
	"Import Tax" : "Pajak Impor",
	"In order to log in as an organization you have to log out from your citizen account and log in again with your organization username and password." : "Untuk login sebagai organisasi, Anda harus log out dari akun Anda dan login dengan akun organisasi Anda.",
	"Inbox" : "Kotak Masuk",
	"Income Tax" : "Pajak Pendapatan",
	"India" : "India",
	"Indonesia" : "Indonesia",
	"Industry" : "Industri",
	"Inflation" : "Inflasi",
	"International" : "Internasional",
	"Inventory" : "Penyimpanan",
	"Invest" : "Invest",
	"Invite friends" : "Mengajak Teman",
	"Invite 10 people to eRepublik and help them reach level 6" : "Ajak 10 teman Anda ke eRepublik dan bantu mereka mencapai level 6",
	"Iran" : "Iran",
	"Ireland" : "Irlandia",
	"Iron" : "Besi",
	"iron" : "besi",
	"Israel" : "Israel",
	"Issue Money" : "Cetak Uang",
	"Italy" : "Italia",
	"Items" : "Barang",
	"items" : "barang",
        "It will help you increase both your skill and savings" : "Akan membantu Anda, meningkatkan tabungan dan kemampuan Anda",
	"Japan" : "Jepang",
	"Job market" : "Bursa kerja",
	"Jobs" : "Pekerjaan",
	"Jobs available in this company" : "Pekerjaan yang tersedia pada perusahaan ini",
	"Join" : "Daftar",
	"Join a party" : "Daftar partai",
        "Your job offer has been successfully updated" : "Lowongan pekerjaan Anda berhasil diupdate",
	"Jul" : "Juli ",
	"Land" : "Pertanahan",
	"Last presence" : "Kehadiran terakhir",
	"Latest" : "Terbaru",
	"Latest Events" : "Kejadian Terbaru",
	"Latvia" : "Latvia",
	"Law proposals" : "Pengajuan hukum",
	"Level 1" : "Level 1",
	"Level" : "Level",
	"Level 2" : "Level 2",
	"Level 3" : "Level 3",
	"Level 4" : "Level 4",
	"Level 5" : "Level 5",
        "Lieutenant" : "Letnan",
	"Lithuania" : "Lituania",
	"Login" : "Login",
        "login" : "login",
	"Logout" : "Logout",
        "logout" : "logout",
	"Location" : "Lokasi",
	"Make changes" : "Ubah",
	"Malaysia" : "Malaysia",
	"Manufacturing" : "Manufaktur",
	"Market" : "Pasar",
	"Markets" : "Pasar",
	"Market offers" : "Tawaran di Pasar",
	"Market place" : "Pasar",
	"Marketplace" : "Pasar",
	"Media career" : "Karir media",
	"Media Mogul" : "Media Mogul",
	"Medium" : "Sedang",
	"Member of" : "Anggota dari",
	"Members"  : "Anggota",
	"Mexico" : "Meksiko",
	"Military" : "Militer",
	"Military achievements" : "Penghargaan Militer",
	"Military career" : "Karir militer",
	"Military force" : "Kekuatan militer",
	"Military rank" : "Rank militer",
	"Military stats" : "Statistik militer",
	"Minimum" : "Minimum",
	"Minimum country wage :" : "Gaji minimum negara",
	"Minimum skill" : "Skill minimum",
	"Minimum Wage" : "Gaji Minimum",
	"Moldavia" : "Moldovia",
	"Monetary Market" : "Pasar Valuta Asing",
        "Monetary market" : "Pasar Valuta Asing",
	"Money" : "Uang",
	"Month/Year" : "Bulan/Tahun",
	"Monthly exports" : "Ekspor bulanan",
	"Monthly imports" : "Impor bulanan",
	"more events" : "kejadian lainnya",
	"more news" : "berita lainnya",
	"more than a year" : "lebih dari setahun",
	"Moving Tickets" : "Tiket",
	"moving tickets" : "tiket",
	"Mutual Protection Pact" : "Pakta Pertahanan Bersama",
	"My Organizations" : "Organisasi saya",
	"My places" : "Tempat saya",
	"My Chat Rooms" : "Ruang Chat saya",
	"Name" : "Nama",
	"National" : "Nasional",
        "National Goals" : "Tujuan Nasional",
	"National Rank" : "Rank Nasional",
	"Neighbors" : "Tetangga",
	"Netherlands" : "Belanda",
	"New" : "Baru",
	"new article" : "artikel baru",
	"New Citizen Fee" : "Biaya Penduduk Baru",
	"New Citizen Message" : "Pesan Penduduk Baru",
	"New Citizens today" : "Penduduk Baru hari ini",
	"New citizens today" : "Penduduk baru hari ini",
	"New location:" : "Lokasi baru:",
	"news" : "berita",
	"News" : "Berita",
	"Newspaper" :"Suratkabar",
	"Newspaper Avatar" :"Avatar suratkabar",
	"Newspaper details" :"Detail suratkabar",
	"Newspaper name" :"Nama suratkabar",
	"Newspapers" : "Suratkabar",
	"Next" : "Berikut",
	"Next elections" : "Pemilihan berikutnya",
	"No" : "Tidak",
	"No." : "No.",
	"no active battles" : "tidak ada peperangan yang sedang berlangsung",
	"No activity" : "Tidak ada aktivitas",
	"no allies" : "tidak ada sekutu",
	"NO MAN'S LAND" : "WILAYAH BEBAS",
	"No chat rooms" : "Tidak memiliki ruang chat",
	"No. of votes" : "Jumlah vote",
	"No political activity" : "Tidak memiliki aktivitas politik",
	"No products in this market" : "Tidak ada produk di pasar ini",
	"No shouts posted by this Citizen yet" : "Penduduk belum mempost shout",
	"North Korea" : "Korea Utara",
	"Norway" : "Norwegia",
	"Not qualified" : "Tidak lolos",
	"November" : "November",
	"Now you can visit the " : "Sekarang Anda bisa mengunjungi ",
	"October" : "Oktober ",
	"of the New World" : " New World",
	"Offer a gift" : "Suntik",
	"Office" : "Kantor",
	"Official" : "Resmi",
	"Official candidates" : "Kandidat resmi",
	"Oil"  : "Minyak Bumi",
	"oil"  : "minyak bumi",
	"Ok, thanks, next tip" : "Terima kasih, saran selanjutnya",
	"Old"  : "Tua",
	"On the Map" : "Di Peta",
	"one hour ago" : "satu jam yang lalu",
	"one minute ago" : "satu menit yang lalu",
	"one month ago" : "sebulan lalu",
	"online": "online",
	"Online now": "Online sekarang",
	"only ": "hanya ", " pictures allowed": " gambar yang diizinkan",
	"only .jpeg pictures allowed": "hanya .jpeg yang diizinkan",
	"Only congress members and country presidents have the right to vote." : "Hanya kongres dan presiden yang dapat memilih",
	"or read the" : "atau bacalah",
	"Organization Avatar": "Avatar organisasi",
	"Organizations created by you:" : "Organisasi yang Anda buat:",
	"Organizations" : "Organisasi",
	"Orientation" : "Orientasi",
        "Password" : "Password",
	"Pakistan" : "Pakistan",
	"Paraguay" : "Paraguay",
	"Parties" : "Partai",
	"Party" : "Partai",
	"Party details" : "Detail partai",
	"Party Elections" : "Pemilihan Partai",
	"Party logo" : "Logo partai",
	"Party name" : "Nama partai",
	"Party Presidency" : "Kepresidenan Partai",
	"Party President" : "Presiden Partai",
	"Peace Proposal" : "Proposal Damai",
	"Pending" : "Pending",
	"Philippines" : "Filipina",
	"Place your Congress candidature" : "Daftarkan Kandidat Kongres Anda",
	"Please choose a country you want to live in." : "Pilih negara dimana Anda ingin tinggal.",
	"Please choose the region you want to live in." : "Pilih wilayah dimana Anda ingin tinggal.",
	"Please select an Industry to see the marketplace offers" : "Silahkan pilih salah satu jenis industri untuk melihat penawaran pasar",
        "Please type the the chat room name" : "Silahkan isi nama ruang chat",
        "Please type the description of the chat room" : "Silahkan isi deskripsi ruang chat", 
        "points" : "poin",
	"Poland" : "Polandia",
	"Politic stats" : "Statistik politik",
	"Political career" : "Karir politik",
	"Political stats" : "Statisitik politik",
	"Politics" : "Politik",
	"Population": "Populasi",
        "Population number" : "Jumlah populasi",
	"Portugal" : "Portugal",
	"Post" : "Post",
	"Post a comment" : "Post komentar",
	"Post new offers" : "Daftarkan penawaran Anda",
	"Presence:" : "Prisutnost",
	"President" : "Presiden",
	"President Elections" : "Pemilihan Presiden",
	"President Impeachment" : "Impeach Presiden",
	"Press" : "Press",
	"Press director" : "Direktur Press",
	"Prev" : " Sebelumnya",
	"Price" : "Harga",
	"Price with taxes" : "Harga setelah pajak",
	"Privacy" : "Privasi",
	"Private" : "Pribadi",
	"Productivity" : "Produktivitas",
	"Products" : "Produk",
	"Profile":"Profil",
	"Proposed by":"Diajukan oleh",
	"Provider" : "Penyedia",
        "Public" : "Publik",
	"Quality" : "Kualitas",
	"Quality Level" : "Tingkat Kualitas",
	"Rank" : "Rank",
	"Rankings" : "Ranking",
	"Raw materials" : "Bahan Baku",
	"Raw materials can be bought only using your company account (select it in the upper right side of the page if you have a company) or if you are logged in as an organization" : "Bahan baku hanya dapat dibeli dengan akun perusahaan (pilih di kanan atas halaman jika Anda memiliki perusahaan) atau jika Anda log in sebagai organisasi",
	"Reach 1000 subscribers to your newspaper" : "Mendapatkan 1000 pelanggan surat kabar Anda.",
	"Reach the highest total damage in one battle" : "Mencapai total damage terbesar pada satu peperangan",
	"Reached 1000 subscribers to your newspaper" : "Memiliki 1000 pelanggan surat kabar",
	"Reached strength level 5" : "Mencapai tingkat strength 5",
	"Reached the highest total damage in one battle" : "Mencapai total damage terbesar pada satu peperangan",
	"Rec exchange rate" : "Kurs Tukar yang direkomendasikan",
	"REJECTED" : "DITOLAK",
	"Rejected" : "Ditolak",
        "Remember me" : "Ingat saya",
	"Remove" : "Hapus",
        "remove" : "hapus",
	"Remove friend" : "Hapus teman",
	"Report abuse" : "Lapor penyalahgunaan",
        "Report law" : "Lapor hukum",
	"Represent your country (or eNation) in the real world" : "Wakilkan negara (atau eNegara) Anda di dunia nyata",
	"Requirements" : "Membutuhkan",
	"Resign" : "Keluar",
	"Resistance Hero" : "Pahlawan Pemberontakan",
	"Resistance War" : "Perang Pemberontakan",
	"Resistance War Active" : "Perang Pemberontakan yang sedang berlangsung",
        "Room name" : "Nama room",
        "Room type" : "Tipe room",
	"Romania" : "Rumania",
	"RURAL AREA" : "WILAYAH PINGGIRAN KOTA",
	"Russia" : "Rusia",
	"Salary" : "Gaji",
	"See all donations" : "Lihat seluruh sumbangan",
	"See all employees" : "Lihat seluruh pegawai",
	"See all law proposals" : "Lihat seluruh proposal hukum",
	"See all members" : "Lihat seluruh anggota",
	"see finished battles" : "Lihat peperangan terdahulu",
	"See results" : "Lihat hasil",
        "Select" : "Pilih",
	"Secure" : "Aman",
        "Select" : "Pilih",
	"Sell" : "Jual",
	"Sell company" : "Jual perusahaan",
        "Selling Price" : "Harga Jual",
	"Send message" : "Kirim pesan",
	"Sent" : "Terkirim",
	"September" : "Septembar",
	"Serbia" : "Serbia",
	"Sergeant" : "Sersan",
	"Shop" : "Toko",
	"Shout" : "Shout",
	"Shout something:" : "Shout sesuatu",
	"Show active wars" : "Tampilkan perang yang sedang aktif",
        "show all accounts" : "Tampilkan seluruh akun",
	"Show all donations" : "Tampilkan seluruh sumbangan",
	"Show all employees" : "Tampilkan seluruh pegawai",
        "Show all law proposals" : "Tampilkan seluruh pengajuan hukum",
	"show finished battles" : "Tampilkan perang terdahulu",
        "show less" : "sembunyikan",
	"Show my offers" : "Tampilkan permintaan saya",
	"Singapore" : "Singapura",
	"Skill" : "Skill",
	"Skill level" : "Tingkat skill",
	"Skills:" : "Skill:",
	"Skills" : "Skill",
	"Slovakia" : "Slovakia",
	"Slovenia" : "Slovenia",
	"Social orientation" : "Orientasi sosial",
	"Social stats" : "Statistik sosial",
	"Society" : "Masyarakat",
	"Society Builder" : "Pembangunan Masyarakat",
	"South Africa" : "Afrika Selatan",
	"South Korea" : "Korea Selatan",
	"Spain" : "Španyol",
        "Start a resistance war" : "Mulai peang pemberontakan",
	"Start a resistance war and liberate that region" : "Mulai perang pemberontakan dan bebaskan wilayah tersebut",
	"Started a resistance war and liberated " : "Perang pemberontakan telah selesai dan membebaskan ",  
        "regions." : "wilayah.",
	"Started by" : "Dimulai oleh:",
	"started by" : "Dimulai oleh: ",
	"started on" : "dimulai saat",
	"Still active" : "masih aktif",
	"Stock" : "Stok",
	"Strength" : "Strength",
	"Subscribe" : "Berlangganan",
	"Subscribe to comments" : "Berlangganan komentar",
	"Subscriptions" : "Pelanggan",
	"SUBURBIA" : "WILAYAH SUB URBAN",
	"Super Soldier" : "Prajurit Super",
	"supported by" : "didukung oleh",
	"Supporting parties" : "Partai pendukung",
	"Sweden" : "Swedia",
	"Switzerland" : "Swiss",
	"Tax change: Diamonds" : "Perubahan Pajak: Permata",
	"Tax change: Food" : "Perubahan Pajak: Makanan",
	"Tax change: Gift" : "Perubahan Pajak: Hadiah",
	"Tax change: Grain" : "Perubahan Pajak: Gandum",
        "Tax change: Hospital" : "Perubahan Pajak: Rumah Sakit",
	"Tax change: House" : "Perubahan Pajak: Rumah",
	"Tax change: Iron" : "Perubahan Pajak: Besi",
	"Tax change: Moving Tickets" : "Perubahan Pajak: Tiket",
	"Tax change: Weapon" : "Perubahan Pajak: Senjata",
	"Tax change: Wood" : "Perubahan Pajak: Kayu",
	"Taxes" : "Pajak",
	"Terms of Service" : "Terms of Service",
	"Thailand" : "Thailand",
	"The company offers no products in this market" : "Perusahaan ini tidak menawarkan produknya ke pasar",
	"The law voting process takes 24 hours." : "Proses pemungutan suara untuk hukum ini memakan waktu 24 jam.",
        "The offer is no longer valid." : "Penawaran ini sudah hangus.",
        "The skill of producing food, weapons, gifts and moving tickets." : "Kemampuan untuk memproduksi makanan, senjata, hadiah, dan tiket.",
        "The skill of gathering raw materials like grains, iron, wood, diamonds, and oil." : "Kemampuan untuk mengumpulkan bahan baku, seperti gandum, besi, kayu, permata, dan minyak bumi.",
        "The skill of building houses, hospitals and defense systems." : "Kemampuan untuk mendirikan rumah, rumah sakit, dan sistem pertahanan.",
	"There are no resistance wars in this country." : "Tidak ada perang pemberontakan di negara ini.",
	"This citizen does not have any donations sent or received." : "Penduduk ini tidak mempunyai daftar sumbangan terkirim atau diterima.",
	"This country can trade with any other country in eRepublik." : "Negara ini dapat berdagang dengan negara apa saja di eRepublik.",
	" to stay in touch with what happens on eRepublik." : " untuk tetap mengetahui apa saja yang terjadi di eRepublik.",
	"today" : "hari ini",
	"Today" : "Hari ini",
	"Tools" : "Peralatan",
        "Top countries in eRepublik" : "Negara terbaik di eRepublik",
        "top countries in eRepublik" : "negara terbaik di eRepublik",
	"Top Rated" : "Peringkat Teratas",
	"Total Citizens" : "Total Penduduk",
	"Total citizens" : "Total penduduk",
	"Total damage:" : "Total damage:",
	"Total votes:" : "Total suara:",
	"Treasury" : "Kas",
	"Training grounds" : "Pusat pelatihan",
        "Training improves your strength, thus increasing basic damage." : "Berlatih meningkatkan strength Anda, sehingga meningkatkan damage dasar Anda.",
        "Trainings to next medal:" : "Latihan sampai penghargaan selanjutnya:",
	"Turkey" : "Turki",
	"Tutorials" : "Tutorial",
	"Ukraine" : "Ukraina",
	"UNDERGROUND" : "WILAYAH BAWAH TANAH",
	"Unemployed" : "Menganggur",
	"United Kingdom" : "Inggris Raya",
	"Unsubscribe" : "Brhenti berlangganan",
	"Unsubscribe to comments" : "Berhenti berlangganan komentar",
	"until the region can be occupied or secured" : "hingga region dapat direbut atau diamankan",
	"Update" : "Update",
	"Upgrade quality level" : "Tingkatkan kualitas",
	"Uruguay" : "Uruguay",
	"USA" : "USA",
	"Value added tax (VAT)" : "Pajak Pertambahan Nilai (VAT)",
	"Venezuela" : "Venezuela",
	"View all comments" : "Tampilkan semua komentar",
        "View requests" : "Tampilkan permintaan",
	"Vote" : "Pilih",
        "VS" : "VS",
	"War" : "Perang",
	"wars" : "perang",
        "Wars" : "Perang",
	"Wars list" : "Daftar perang",
	"Weapon" : "Senjata",
	"weapon" : "senjata",
	"Weapon quality" : "Kualitas senjata",
	"Wellness" : "Wellness",
	"Who" : "Siapa",
	"Wildcards" : "Wildcard",
	"Win the Congress elections": "Memenangkan pemilihan kongres",
	"Won the Congress elections": "Telah memenangkan pemilihan kongres",
	"Win the Presidential elections": "Memenangkan pemilihan presiden",
	"Won the Presidential elections": "Telah memenangkan pemilihan presiden",
	"Wood" : "Kayu",
	"wood" : "kayu",
        "Work" : "Kerja",
	"Worked 30 days in a row" : "berkerja 30 hari berturut-turut",
	"World" : "Dunia",
	"World Map" : "Peta Dunia",
	"xp points" : "Poin experience",
	"Yes" : "Ya",
        "You have not worked today." : "Anda belum bekerja hari ini.",
	"yesterday" : "kemarin",
        " yesterday" : " kemarin",
	"You are not a member of a party" : "Anda belum menjadi anggota partai",
	"You are not a president or a congress member in this country." : "Anda bukan anggota kongres atau presiden negara ini.",
	"You can exchange money at the" : "Anda dapat menukar uang Anda di",
	"You can get wellness from:" : "Anda bisa meningkatkan wellness dari:",
	"You can join a party from it's presentation page or you can create your own party if you cannot find the right one for you. Being a member of a party could give you the chance to become a Congress Member or even the President." : "Anda dapat bergabung dengan partai tertentu dari halaman presentasi partai tersebut atau Anda dapat membuat partai sendiri jika tidak ada partai yang cocok dengan Anda. Menjadi anggota partai memberikan Anda kesempatan untuk menjadi Anggota Kongres, bahkan Presiden.",
	"You can't start a resistance war in this region because it already belongs to its original owner country" : "Anda tidak bisa memulai perang pemberontakan di wilayah ini karena wilayah ini dimiliki negara asalnya",
	"You cannot start a resistance war in this region because it already belongs to its original owner country." : "Anda tidak bisa memulai perang pemberontakan di wilayah ini karena wilayah ini dimiliki negara asalnya.",
	"You cannot trade with this country as you are at war with it" : "Anda tidak dapat berdagang dengan negara ini karena Anda sedang terlibat perang dengan negara ini",
	"You didn't specify the amount of products you wish to buy" : "Anda tidak memberikan jumlah produk yang ingin Anda beli",
	"You do not own a moving ticket. You can buy moving tickets from Marketplace" : "Anda tidak memiliki tiket. Belilah tiket di Pasar",
	"You do not have a newspaper" : "Anda tidak memiliki suratkabar",
	"You don't have a newspaper" : "Anda tidak memiliki suratkabar",
	"You don't have any active job offers" : "Anda tidak memiliki lowongan kerja aktif",
	"You do not have any active job offers" : "Anda tidak memiliki lowongan kerja aktif",
	"You have worked today. You have 15 more days until you receive a 'Hard Worker' Medal." : "Anda telah bekerja hari ini. Anda harus bekerja 15 hari berturut-turut untuk mendapatkan penghargaan Pekerja Keras ",
	"You have succesfully edited your profile" : "Profil Anda telah disunting",
	"You have trained today. You can train again tomorrow." : "Anda sudah berlatih hari ini. Anda dapat berlatih lagi esok.",
	"Your account" : "Tabungan Anda",
	"Your accounts" : "Tabungan Anda",
	"Your birthday" : "Hari lahir Anda",
	"Your comment" : "Komentar Anda",
	"Your companies" : "Perusahaan Anda",
	"Your email here" : "E-mail Anda",
	"Your inventory" : "Penyimpanan Anda",
	"Your offer has been updated" : "Penawaran Anda telah diupdate",
        "You should work today" : "Anda harus bekerja hari ini.",

};

trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};

var regexps = {};
regexps["^(\\d*) allies(\\s*)$"] = "$1 sekutu";
regexps["^Active wars in (.*)$"] = "Perang aktif di $1";
regexps["^Active resistance wars in (.*)$"] = "Perang pemberontakan aktif di $1";
regexps["(\\s*)Expires in (\\d*) days"] = "Hangus dalam $2 hari";
regexps["^(\\d*) comments$"] = "$1 komentar";
regexps["^(\\d*) hours ago$"] = "$1 jam yang lalu";
regexps["^(\\d*) minutes ago$"] = "$1 menit yang lalu";
regexps["^(\\d*) days ago$"] = "$1 hari yang lalu";
regexps["^(\\d*) months ago$"] = "$1 bulan yang lalu";
regexps["^Regions \\((\\d*)\\)"] = "Wilayah ($1)";
regexps["^Friends \\((\\d*)\\)"] = "Teman ($1)";
regexps["^(\\d*) months"] = "$1 bulan";
regexps["^Comments(.*)"] = "Komentar $1";
regexps["^Trackbacks(.*)"] = "Trackback $1";


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


// v1.0.1:
// - Neke sitnice koje život znace !!!