// ==UserScript==
// @name           Imperion.Org EN-ID Translate
// @namespace      edited to 'Bahasa Indonesia' by frnkstsx250
// @description    This script will translate Imperion to Bahasa Indonesia
// @version        0.17 Alpha+
// @include        http://*.imperion.*/
// @include        http://u1.imperion.org/*
// ==/UserScript==
var strings = {

//標準格式"" : "",


//Terran buildings （Bangunan Terran）

//Resources（Sumberdaya）

"Metal mine" : "Pertambangan Logam",
"The metal mine produces metal. With each upgrade of the metal mine, metal production increases." : "Pertambangan Logam memproduksi logam. Setiap upgrade pertambangan logam, produksi logam akan meningkat",
"Crystal mine" : "Pertambangan Kristal",
"The crystal mine produces crystal. With each upgrade of the crystal mine, crystal production increases." : "Pertambangan Kristal memproduksi kristal. Setiap upgrade pertambangan kristal, produksi kristal akan meningkat",
"Deuterium rig" : "Prosessor Deuterium",
"The deuterium rig distills the very rare isotope deuterium from water. With each upgrade of the deuterium rig, production of deuterium increases." : "Prosesor Deuterium memproses isotop terlangka dari air. Setiap upgrade prosesor deuterium, produksi deuterium akan meningkat",
"Furnace" : "Perapian",
"The furnace increases metal production by 5% per level." : "Perapian akan meningkatkan produksi logam 5% per levelnya",
"Crystal grinder" : "Penggilingan Kristal",
"The crystal worker increases crystal production by 5% per level." : "Pekerja kristal akan meningkatkan produksi kristal 5% per levelnya",
"The crystal grinder increases crystal production by 5% per level." : "Penggilingan kristal akan meningkatkan produksi kristal 5% per levelnya",
"The crystal mill increases crystal production by 5% per level." : "Pabrik kristal akan meningkatkan produksi kristal per 5% levelnya",
"Deuterium filter" : "Penyaringan Deuterium",
"The deuterium filter increases deuterium production by 5% per level." : "Penyaringan Deuterium akan meningkatkan produksi deuterium 5% per levelnya",
"The deuterium synthesizer increases deuterium production by 5% per level." :"Penyaring Deuterium akan meningkatkan produksi deuterium 5% per levelnya",

//Power plants（發電廠）

"Solar power plant" : "Pembangkit Tenaga Surya",
"Solar farm" : "Lahan Pembangkit Surya",
"The solar farm generates energy from the light of the sun. On desert planets, solar farms are especially efficient." : "Lahan Pembangkit Surya menghasilkan energi dari sinar matahari. Pada planet gurun, Lahan Pembangkit Surya sangat efisien",
"The solar power plant generates energy from the light of the sun. On desert planets, solar power plants are especially efficient." : "Pembangkit Tenaga Surya menghasilkan energi dari sinar matahari. Pada planet gurun, Pembangkit Tenaga Surya sangat efisien",
"Wind farm" : "Pembangkit Tenaga Angin",
"The wind farm generates energy from wind. Ice planets are subject to especially strong winds, which leads to an increase in energy production." : "Pembangkit Tenaga Angin menghasilkan energi dari energi kinetik angin. Planet es cendering memiliki angin yang kencang, sehingga meningkatkan produksi energi",
"Hydropower plant" : "Pembangkit Tenaga Air",
"Hydro power plant" : "Pembangkit Tenaga Air",
"The hydropower plant generates energy from flowing water. Aquatic planets with their large amount of precipitation are especially suited for hydropower plants." : "Pembangkit Tenaga Air menghasilkan energi dari air yang mengalir. Planet air dengan presipitasi yang besar sangat cocok untuk Pembangkit Tenaga Air",
"Fusion power plant" : "Pembangkit Tenaga Fusi Nuklir",
"The fusion power plant generates energy from the fusion of deuterium to helium. With each upgrade, the fusion power plant increases its deuterium capacity." : "Pembangkit Fusi Nulkir menghasilkan energi dari fusi deuterium menjadi helium. Setiap upgradenya, Pembangkit Fusi Nuklir akan memperbesar kapasitas deuterium",
"The Titan fusion power plant generates energy from the fusion of tritium to helium. With each upgrade, the fusion power plant increases its tritium capacity." : "Pembangkit Tenaga Fusi Nuklir Titan menghasilkan energi dari fusi Tritium menjadi Helium. Dengan setiap upgradenya, Pembangkit Tenaga Fusi Nuklir akan meningkatkan kapasitas tritium",
"AEC" : "Alien Energy Chamber",
"This monument is thought to be the relic of an alien civilization. The AEC (Alien Energy Chamber) acts as an initial source of energy for each home world." : "Monumen ini merupakan peninggalan pada peradaban alien. The AEC (Alien Energy Chamber) merupakan sumber energi utama pada setiap Rumah Dunia",

//Stockyards（Gudang Penyimpan）

"Metal stockyard" : "Gudang Penyimpanan Logam",
"The metal stockyard stocks metal. Each upgrade of the stockyard increases the storage capacity for metal." : "Gudang Penyimpanan Logam menyimpan persediaan logam. Setiap upgradenya akan memperbesar kapasitas penyimpanan logam",
"Crystal stockyard" : "Gudang Penyimpanan Kristal",
"The crystal stockyard stocks crystal. Each upgrade of the stockyard increases the storage capacity for crystal." : "Gudang Penyimpanan Kristal menyimpan persediaan logam. Setiap upgradenya akan memperbesar kapasitas penyimpanan logam",
"Deuterium stockyard" : "Gudang Penyimpanan Deuterium",
"The deuterium stockyard stocks deuterium. Each upgrade of the stockyard increases the deuterium stockyard capacity." : "Gudang Penyimpanan Deuterium menyimpan persediaan deuterium. Setiap upgradenya akan memperbesar kapasitas Deuterium yang tersimpan",


//Military buildings（軍事建築）

"Shipyard" : "Shipyard（軍用造船廠）",
"Ship yard" : "Ship yard（軍用造船廠）",
"The ship yard serves to build military vessels. Each upgrade decreases construction time for ships." : "The ship yard serves to build military vessels. Each upgrade decreases construction time for ships.（生產軍事類的船艦。）",
"Arms factory" : "Arms factory（武器工廠）",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.) " : "The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.) （製造＆修理防禦砲台，每次升級增加生產與修理的速度，而被火箭摧毀的設施則無法修復。）",
"The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.)" : "The arms factory produces planetary defense systems. After an attack, it repairs a part of the defense systems (between 30% and 80%, depending on the repair quota already researched.)（製造＆修理防禦砲台，每次升級增加生產與修理的速度，而被火箭摧毀的設施則無法修復。）",
"Rocket silo" : "Rocket silo（飛彈發射井）",
"The rocket silo builds and stores defense and attack missiles. Each upgrade increases storage capacity for missiles and decreases missile construction time." : "The rocket silo builds and stores defense and attack missiles. Each upgrade increases storage capacity for missiles and decreases missile construction time.（儲存防禦跟攻擊飛彈，每次升級可以增加飛彈存放容量，與減少飛彈建造時間。）",
"Fleet base" : "Fleet base（艦隊基地）",
"The fleet base provides an overview of all fleets deployed, arriving and present. From here, all fleet movements are governed." : "The fleet base provides an overview of all fleets deployed, arriving and present. From here, all fleet movements are governed.（派船出兵的必要設施，可以操控所有的艦隊派遣。）",
"Impulse scanner" : "Impulse scanner（脈衝掃描器）",
"The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 10 fields." : "The Terran Impulse Scanner serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Impulse Scanner, the scan radius increases by 1 field, the maximum range is 10 fields.（於一定距離內能偵測到任何船艦，每升級可增加偵測距離。）",
"Hangar" : "Hangar（停機坪）",
"The hangar allows part of the fleet to be hidden and thus safe from possible attacks. Each upgrade of the hangar allows you to protect more ships." : "The hangar allows part of the fleet to be hidden and thus safe from possible attacks. Each upgrade of the hangar allows you to protect more ships.（可以把船艦停放在停機坪避免受到攻擊，以電力做為存放單位。）",


//Civilian buildings（民用建築）

"Research facility" : "Fasilitas Penelitian",
"The research facility serves to discover knowledge. Each upgrade of the building increases the generation speed of research points and thus quickens research." : "Fasilitas Penelitian berfungsi untuk menggali pengetahuan. Setiap upgrade-nya akan meningkatkan kecepatan generasi poin riset dan jadi mempercepat riset",
"Embassy" : "Kedutaan",
"The embassy is necessary to join leagues, or to found your own once the building reaches level 3. An embassy also protects you from invasions!" : "Kedutaan diperlukan untuk bergabung dengan aliansi, atau untuk membuatnya sendiri dikala bangunan telah mencapai lv.3. Kedutaan juga memproteksi kamu dari invasi!",
"Building yard" : "Building yard（建築工廠）",
"The building yard decreases construction time for buildings and it also harbors the function to pull buildings down." : "The building yard decreases construction time for buildings and it also harbors the function to pull buildings down.（提昇建築工廠可以減少建築時間；並且能降低其他建築等級。）",
"Recycling yard" : "Recycling yard（資源回收場）",
"The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris." : "The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris.（人類特有建築，會自動搜尋宇宙中的可以回收的資源，升級可增加回收資源量以及回收範圍。）",
"Resource cache" : "Resource cache（資源暫存區）",
"The resource cache protects a certain amount of the planet's resources from being raided." : "The resource cache protects a certain amount of the planet's resources from being raided.（行星受攻擊時，保護資源不被掠奪，每升一級可以提高保護量。）",
"Trade center" : "Pusat Perdagangan",
"The trade center serves to send out resources and to publish and accept trade offers. With each upgrade of the trade center, more traders become available." : "Pusat Perdagangan berfungsi untuk mengirim sumberdaya dan untuk membuat dan menerima tawaran sumberdaya. Dengan setiap upgradenya, akan tersedia lebih banyak pedagang.",
"Colonization Center" : "Pusat kolonisasi",
"Colonization center" : "Pusat kolonisasi",
"The colonization center allows you to build drop ships to colonize and invade other planets." : "Pusat kolonisasi menyediakan "Drop Ship" untuk berkoloni dan menyerang planet lain.",
"Civilian shipyard" : "Civilian shipyard（民用造船廠）",
"The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships." : "The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships.（生產非軍事類的船艦。）",
"Robot factory" : "Pabrik Robot",
"The robot factory decreases construction time for ships, missiles and defense systems." : "The robot factory decreases construction time for ships, missiles and defense systems.（減少船舶、導彈及防禦系統的建造時間。）",
"The robot factory decreases construction time for ships and defense systems." : "The robot factory decreases construction time for ships and defense systems.（減少船舶、導彈及防禦系統的建造時間。）",


//Titan buildings（泰坦建築）


//Resources（資源類）

"Tritium rigs" : "Tritium rig（超重氫鑽台）",
"Tritium filter" : "Tritium filter（超重氫過濾器）",
"The tritium synthesizer increases tritium production by 5%." : "The tritium synthesizer increases tritium production by 5%.（超重氫過濾器，等級越高產能越高。）",


//Stockyards（儲存設備）

"Metal stockyard" : "Metal stockyard（金屬儲存廠）",
"Crystal stockyard" : "Crystal stockyard（水晶儲存廠）",
"Tritium stockyard" : "Tritium stockyard（超重氫儲存槽）",
"The tritium stockyard stocks tritium. Each upgrade of the stockyard increases the tritium stockyard capacity." : "The tritium stockyard stocks tritium. Each upgrade of the stockyard increases the tritium stockyard capacity.（超重氫儲存槽，等級越高存量也越高。）",
"Subspace cache" : "Subspace cache（子空間儲藏所）",
"The subspace cache in theory allows unlimited storage of the resources metal, crystal and tritium, depending on the amount of available energy." : "The subspace cache in theory allows unlimited storage of the resources metal, crystal and tritium, depending on the amount of available energy.（可儲存三種類的資源，缺點是耗電量大。）",
"Energy accumulator" : "Energy accumulator（能源累加器）",
"The energy accumulator stores unneeded energy and emits it as needed. It can also transform energy into resources. With each upgrade of the energy accumulator, the energy storage capacity increases." : "The energy accumulator stores unneeded energy and emits it as needed. It can also transform energy into resources. With each upgrade of the energy accumulator, the energy storage capacity increases.（可以儲存平時沒用的能源，必要時能把儲存的能源換成資源。）",


//Military buildings（軍事建築）

"Shield generator" : "Perisai Pembangkit",
"The shield generator generates a planetary protective shield surrounding the entire planet. As long as the shield lasts, the planet is safe from hostile fleets and missiles." : "Perisai pembangkit membuat perisai protektor planet. Selama perisai tersedia, planet aman dari armada dan missil musuh",
"Scan link system" : "Scan link system（掃描連接系統）",
"The Titan Scan Link System serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Scan Link System, the scan radius increases by 1 field, the maximum range is 10 fields." : "The Titan Scan Link System serves to keep an eye on fleet movements in the close vicinity of a particular planet. Depending on the level, hostile fleets on comets and uninhabited planets can be detected. With each upgrade of the Scan Link System, the scan radius increases by 1 field, the maximum range is 10 fields.（能指定行星掃描出入的艦隊，每次升級可增加最大掃描範圍。）",
"Jammer" : "Jammer（干擾發射台）",
"The jammer interferes with signals emitted by espionage units. According to your wishes, you can adjust whether the amount of resources, the number of fleets and the levels of your buildings appear higher or lower than they really are." : "The jammer interferes with signals emitted by espionage units. According to your wishes, you can adjust whether the amount of resources, the number of fleets and the levels of your buildings appear higher or lower than they really are.（可以影響間諜衛星鎖探查資料的正確性。）",
"Transportal" : "Transportal（超空間傳送）",
"The transportal allows you to transport ships between two portals. Each upgrade of the transportal allows larger types of vessel to jump through." : "The transportal allows you to transport ships between two portals. Each upgrade of the transportal allows larger types of vessel to jump through.（允許艦隊瞬間移動在兩個傳送門之間，每次升級能允許更大的船隻通過。）",
"Stealth generator" : "Stealth generator（隱形裝置）",
"The stealth generator allows you to cloak a part of your fleet and protect it from possible fights. With each upgrade of the stealth generator you can hide more ships." : "The stealth generator allows you to cloak a part of your fleet and protect it from possible fights. With each upgrade of the stealth generator you can hide more ships.（能把船艦存放在裡面，不會受到戰鬥波及，每次升級能允許收藏更多的船。）",
"Dimensional modulator" : "Dimensional modulator（維度調幅器）",


//Civilian buildings（民用建築）

"Research lab" : "Laboratorium Riset",
"Research labs serve to research new science - the key to new technology and successful expansion. All laboratories are connected and work together; with each upgrade, these facilities increase their speed in generating research points." : "Research labs serve to research new science - the key to new technology and successful expansion. All laboratories are connected and work together; with each upgrade, these facilities increase their speed in generating research points.（研發各項科技以及各種類的艦隊藍圖。）",
"Teleporter" : "Teleporter（市場）",
"Teleporting resources is an exclusively Titan technology. They use the teleporter for trade and transportation. Goods appear at their target location within seconds. After that, the energy cells need to recharge." : "Teleporting resources is an exclusively Titan technology. They use the teleporter for trade and transportation. Goods appear at their target location within seconds. After that, the energy cells need to recharge.（泰坦無法與蟲族交易，泰坦間交易是即時的，與人類之間要時間，每次升級增加一個運輸槽，沒點研究的話，每次傳送會損失20%資源。）",
"Robot factory" : "Robot factory（機器人工廠）",
"Resource cache" : "Resource cache（資源暫存區）",
"Transmitter" : "Transmitter（能量發射機）",
"The transmitter is responsible for supplying energy to the Titan fleet. All transmitters send to a common energy pool, which can be used by all ships belonging to a single player, regardless of their actual location." : "The transmitter is responsible for supplying energy to the Titan fleet. All transmitters send to a common energy pool, which can be used by all ships belonging to a single player, regardless of their actual location.（提供所有艦隊的能量所需，升級可增加能源的發射量。）",


//Xen buildings（蟲族建築）


//Power plants（發電廠）

"Photosynthesis power plant" : "Photosynthesis power plant（光合作用發電廠）",
"The photosynthesis power plant uses biochemical processes to generate energy from the light of the sun. On desert planets, photosynthesis power plants are especially efficient." : "The photosynthesis power plant uses biochemical processes to generate energy from the light of the sun. On desert planets, photosynthesis power plants are especially efficient.（蟲族特有的光合作用發電廠，等級越高產能越好。）",
"Thermal power plant" : "Thermal power plant（火力發電廠）",
"The thermal power plant generates energy from the heat of the lower planetary crust. On volcanic planets, thermal power plants are especially efficient." : "The thermal power plant generates energy from the heat of the lower planetary crust. On volcanic planets, thermal power plants are especially efficient.（利用星球上的火山進行火力發電，等級越高產能越好。）",


//Stockyards（儲存設備）

"General stockyard" : "General stockyard（金屬礦及晶體儲存廠）",
"The general stockyard stocks metal and crystal. Each upgrade of the stockyard increases the storage capacity for metal and crystal." : "The general stockyard stocks metal and crystal. Each upgrade of the stockyard increases the storage capacity for metal and crystal.（儲存金屬和水晶，每次升級都可以增加倉儲量。）",


//Military buildings（軍事建築）

"Bioreactor" : "Bioreactor（生物反應器）",
"Inside the bioreactor, Zeks, the base for all units, hatch from their eggs. Each upgrade of the bioreactor decreases the time until further Zek eggs hatch." : "Inside the bioreactor, Zeks, the base for all units, hatch from their eggs. Each upgrade of the bioreactor decreases the time until further Zek eggs hatch.（生產Zek,每生一級減少5%的生產時間。）",
"Small ship yard" : "Small ship yard（小型艦造船廠）",
"The small ship yard serves to produce both military and civilian light units." : "The small ship yard serves to produce both military and civilian light units.（生產民用和軍用的輕型艦。）",
"Large ship yard" : "Large ship yard（大型艦造船廠）",
"The large ship yard serves to produce both military and civilian heavy units." : "The large ship yard serves to produce both military and civilian heavy units.（生產民用和軍用的重型艦。）",
"Zek cave" : "Zek cave（Zek儲藏穴）",
"The Zek cave protects Zeks from attacks and the Terran bionic blast. As long as there is still room inside the Zek cave, Zeks will automatically congregate there." : "The Zek cave protects Zeks from attacks and the Terran bionic blast. As long as there is still room inside the Zek cave, Zeks will automatically congregate there.（保護Zek不被攻擊，每次升級都可增加保護的數量。）",
"Brain" : "Brain（腦蟲）",
"The Brain controls your Zekkon spies. With each upgrade of the building, more Zekkon fleets can be controlled." : "The Brain controls your Zekkon spies. With each upgrade of the building, more Zekkon fleets can be controlled.（Brain控制您的Zekkon間諜並且能找出圍繞您星球旋轉的外星人Zekkon。建築每次升級，有更多Zekkon可以被控制。 大於Brain的容量的外星人Zekkon艦隊不可能被找出。）",


//Civilian buildings（民用建築）

"Development center" : "Development center（研究實驗室）",
"The development center serves to discover knowledge. Each upgrade of the building increases the generation speed of resarch points and thus quickens research." : "The development center serves to discover knowledge. Each upgrade of the building increases the generation speed of resarch points and thus quickens research.（產生研究點數的建築，每次升級可以增加研究點數的產量。）",

//all（共用）

"Building" : "Bangunan",
"Duration:" : "Durasi",
"Finished:" : "Selesai",
"Details" : "Detail",
"Selection" : "Seleksi",
"Rank" : "Peringkat",
"Species" : "Spesies",
"League" : "Aliansi",
"Planets" : "Planet",
"Points" : "Populasi",
"Age" : "Umur",
"Sex" : "Kelamin",
"Location" : "Lokasi",
"Planet" : "Planet",
"Coordinates" : "Koordinat",
"per hour" : "per jam",
"Player" : "Pemain",
"Leagues" : "Aliansi",
"Def" : "Bertahan",
"Fights" : "Serangan",
"Support" : "Bantuan",
"Miscelleaneous" : "Lainnya",
"Archive" : "Arsip",
"Subject:" : "Topik",
"Date" : "Hari",
"Inbox" : "Kotak Masuk",
"Write message" : "Tulis Pesan",
"Sent box" : "Terkirim",
"Sender:" : "Pengirim",
"Time" : "Waktu",
"Research" : "Riset",
"Level" : "Level",
"Cost" : "Biaya",
"Action" : "Aksi",


//科技

"Engineering" : "Engineering（工程學）",
"Building lots" : "Tempat Bangunan",
"Building stability" : "Stabilitas bangunan",
"Geologic exploration" : "Explorasi geografis",
"Storage capacity" : "Kapasitas penyimpanan",
"Teleportation" : "Teleportasi",

"Planetary Defense" : "Planetary Defense (行星防禦）",
"Repair quota" : "Repair quota (修理配額-加修復率)",
"Concealment capacity" : "Concealment capacity (隱蔽能力)", 	
"Shield technology" : "Shield technology (護盾技術)",

"Blueprint: Flak battery" : "藍圖：Flak battery (電磁高射砲)",
"Blueprint: Puls laser" : "藍圖：Puls laser (雷射脈衝)",
"Blueprint: Gauss gun" : "藍圖：Gauss gun (高斯槍)",
"Blueprint:Interval artillery" : "藍圖：Interval artillery (區間火砲)",
"Blueprint: Tachyon emitter" : "藍圖：Tachyon emitter (光速粒子發射器)",
"Blueprint: Interceptor Missile 1" : "藍圖：Interceptor Missile 1 (攔截導彈1)",
"Blueprint: Interceptor Missile 2" : "藍圖：Interceptor Missile 1 (攔截導彈2)",
"Blueprint: Bionic Missile" : "藍圖：Bionic Missile (仿生飛彈)",

"Blueprint: Sporok" : "藍圖：Sporok (孢子火砲)",
"Blueprint: Acidor" : "藍圖：Acidor (酸性腐蝕發射器)",
"Blueprint: Kalmanar" : "藍圖：Kalmanar (結縛攻擊者)",
"Blueprint: Zuikon" : "藍圖：Zuikon (自爆詭雷)",
"Blueprint: Paratec" : "藍圖：Paratec (高頻波發射儀)",

"Blueprint: Injector" : "藍圖：Injector (噴射器)",
"Blueprint: Nanoblade" : "藍圖：Nanoblade (奈米利刃)",
"Blueprint: Boson accelerator" : "藍圖：Boson accelerator (環形加速射擊器)",
"Blueprint: Masterblaster" : "藍圖：Masterblaster (能量沖擊波)",
"Blueprint: Disruptor" : "藍圖：Disruptor (黑洞破壞能)",

"Military Space Flight" : "Military Space Flight (軍事飛航學)",
"Propulsion technology" : "Propulsion technology (推進技術-加速用)",
"Fuel consumption" : "Fuel consumption (燃油消耗-減少油耗)", 	
"Cargo capacity" : "Cargo capacity (貨運能力-加運載量)", 	
"Tank capacity" : "Tank capacity (油箱容量-加油槽艦運量)", 	

"Blueprint: Fighter" : "藍圖：Fighter (戰鬥機)",
"Blueprint: Battleship" : "藍圖：Battleship (戰艦)",
"Blueprint: Destroyer" : "藍圖：Destroyer (驅逐艦)",
"Blueprint: Heavy Cruiser" : "藍圖：Heavy Cruiser (重型巡洋艦)",
"Blueprint: Pulsar" : "藍圖：Pulsar (脈衝星)",
"Blueprint: Bomber" : "藍圖：Bomber (轟炸機)",
"Blueprint: Attack Missile 1" : "藍圖：Attack Missile 1 (攻擊導彈1)",
"Blueprint: Attack Missile 2" : "藍圖：Attack Missile 2 (攻擊導彈2)",
"Blueprint: Attack Missile 3" : "藍圖：Attack Missile 3 (攻擊導彈3)",
"Blueprint: Attack Missile 4" : "藍圖：Attack Missile 4 (攻擊導彈4)",
"Blueprint: Bionic Blast" : "藍圖：Bionic Blast (仿生爆破氣流)",

"Blueprint: Xnair" : "藍圖：Xnair (突擊者)",
"Blueprint: Mylon" : "藍圖：Mylon (麥隆艦)",
"Blueprint: Maxtron" : "藍圖：Maxtron (馬克斯特隆裝甲鑑)",
"Blueprint: Mother ship" : "藍圖：Mother ship (母艦)",
"Blueprint: Suikon" : "藍圖：Suikon (自殺機)",
"Blueprint: Macid" : "藍圖：Macid (侵蝕者)",

"Blueprint: Scout" : "藍圖：Scout (偵察機)",
"Blueprint: Delphi" : "藍圖：Delphi (德爾福防禦機)",
"Blueprint: Corsair" : "藍圖：Corsair (海盜戰機)",
"Blueprint: Terminator" : "藍圖：Terminator (終結者)",
"Blueprint: Carrier" : "藍圖：Carrier (運輸機)",
"Blueprint: Protektor" : "藍圖：Protektor (防衛者)",
"Blueprint: Phoenix" : "藍圖：Phoenix (鳳凰號)",


"Civilian Space Flight" : "Civilian Space Flight :(民用飛航學)",
"Recycling" : "Recycling (回收-減少回收時間)",
"Wormhole physics" : "Wormhole physics (蟲洞原理-星系傳送)",
"Expansion studies" : "Expansion studies (擴展研究)",
"Trade" : "Trade (貿易)", 	
"Espionage" : "Espionage (間諜技術)", 	

"Blueprint: Probe" : "藍圖：Probe (探頭)",
"Blueprint: Tanker" : "藍圖：Tanker (油船)",
"Blueprint: Small transporter" : "藍圖：Small transporter (小型運輸機)",
"Blueprint: Large Recycler" : "藍圖：Large Recycler (大型回收機)",
"Blueprint: Recycler" : "藍圖：Recycler (回收機)",
"Blueprint: Drop ship" : "藍圖：Drop ship (殖民船)",

"Blueprint: Zek" : "藍圖：Zek (幼蟲)",
"Blueprint: Zekkon" : "藍圖：Zekkon (間諜蟲)",
"Blueprint: Psikon" : "藍圖：Psikon (心靈尖嘯者)",
"Blueprint: Octopon" : "藍圖：Octopon (資源採收者)",

"Blueprint: Observer" : "藍圖：Observer (觀察者)",
"Blueprint: Large transporter" : "藍圖：Large transporter (大型運輸機)",

"Energy technology" : "Teknologi Daya",
"AEC energy" : "Alien Energy Chamber",    	
"Fusion power" : "Tenaga Fusi",
"Solar power" : "Tenaga Surya",
"Hydropower" : "Tenaga Air",
"Wind power" : "Tenaga Angin",
"Thermal power" : "Tenaga Panas",
"Qi-Unit Utilization" : "Qi-Unit Utilization: (氣體單位利用率)",

};


trim = function (str) {
    return str!==null ? str.replace(/^\s*/, "").replace(/\s*$/, "") : null;
};


var regexps = {};

//regexps["XXXX"] = "XXXX";

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