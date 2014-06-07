// ==UserScript==
// @name           Imperion 中英對照版　By Web Game @Live - V1.00 
// @namespace      edited by acedia0915 - Web Game @Live
// @description    
// @version        1.00
// @include        http://*.imperion.*/
// @include        http://u1.imperion.org/*
// ==/UserScript==
var strings = {

//標準格式"" : "",


//Terran buildings （人類建築）

//Resources（資源類）

"Metal mine" : "Metal mine（金屬礦）",
"The metal mine produces metal. With each upgrade of the metal mine, metal production increases." : "The metal mine produces metal. With each upgrade of the metal mine, metal production increases.（金屬礦，等級越高產能越高。）",
"Crystal mine" : "Crystal mine（水晶礦）",
"The crystal mine produces crystal. With each upgrade of the crystal mine, crystal production increases." : "The crystal mine produces crystal. With each upgrade of the crystal mine, crystal production increases.（水晶礦，等級越高產能越高。）",
"Deuterium rig" : "Deuterium rig（重氫鑽井）",
"The deuterium rig distills the very rare isotope deuterium from water. With each upgrade of the deuterium rig, production of deuterium increases." : "The deuterium rig distills the very rare isotope deuterium from water. With each upgrade of the deuterium rig, production of deuterium increases.（重氫鑽井，等級越高產能越高。）",
"Furnace" : "Furnace（熔礦爐）",
"The furnace increases metal production by 5% per level." : "The furnace increases metal production by 5% per level.（每級提昇5%金屬礦產量，最高可升到5級。）",
"Crystal grinder" : "Crystal grinder（水晶研磨機）",
"The crystal worker increases crystal production by 5% per level." : "The crystal worker increases crystal production by 5% per level.（每級提昇5%水晶礦產量，最高可升到5級。）",
"The crystal grinder increases crystal production by 5% per level." : "The crystal grinder increases crystal production by 5% per level.（每級提昇5%水晶礦產量，最高可升到5級。）",
"The crystal mill increases crystal production by 5% per level." : "The crystal mill increases crystal production by 5% per level.（每級提昇5%水晶礦產量，最高可升到5級。）",
"Deuterium filter" : "Deuterium filter（重氫過濾器）",
"The deuterium filter increases deuterium production by 5% per level." : "The deuterium filter increases deuterium production by 5% per level.（每級提昇5%重氫產量，最高可升到5級。）",
"The deuterium synthesizer increases deuterium production by 5% per level." :"The deuterium synthesizer increases deuterium production by 5% per level.（每級提昇5%重氫產量，最高可升到5級。）",

//Power plants（發電廠）

"Solar power plant" : "Solar power plant（太陽能發電廠）",
"Solar farm" : "Solar farm（太陽能發電廠）",
"The solar farm generates energy from the light of the sun. On desert planets, solar farms are especially efficient." : "The solar farm generates energy from the light of the sun. On desert planets, solar farms are especially efficient.（太陽能發電設施，等級越高產能越好。）",
"The solar power plant generates energy from the light of the sun. On desert planets, solar power plants are especially efficient." : "The solar power plant generates energy from the light of the sun. On desert planets, solar power plants are especially efficient.（太陽能發電設施，等級越高產能越好。）",
"Wind farm" : "Wind farm（風力發電廠）",
"The wind farm generates energy from wind. Ice planets are subject to especially strong winds, which leads to an increase in energy production." : "The wind farm generates energy from wind. Ice planets are subject to especially strong winds, which leads to an increase in energy production.（利用風力發電的設施，等級越高產能越好。）",
"Hydropower plant" : "Hydropower plant（水力發電廠）",
"Hydro power plant" : "Hydro power plant（水力發電廠）",
"The hydropower plant generates energy from flowing water. Aquatic planets with their large amount of precipitation are especially suited for hydropower plants." : "The hydropower plant generates energy from flowing water. Aquatic planets with their large amount of precipitation are especially suited for hydropower plants.（水力發電設施，等級越高能也會相對提昇。）",
"Fusion power plant" : "Fusion power plant（核融合發電廠）",
"The fusion power plant generates energy from the fusion of deuterium to helium. With each upgrade, the fusion power plant increases its deuterium capacity." : "The fusion power plant generates energy from the fusion of deuterium to helium. With each upgrade, the fusion power plant increases its deuterium capacity.（核融合發電設施，等級越高能也會相對提昇。）",
"The Titan fusion power plant generates energy from the fusion of tritium to helium. With each upgrade, the fusion power plant increases its tritium capacity." : "The Titan fusion power plant generates energy from the fusion of tritium to helium. With each upgrade, the fusion power plant increases its tritium capacity.（核融合發電設施，等級越高能也會相對提昇。）",
"AEC" : "AEC（外星能量發電廠）",
"This monument is thought to be the relic of an alien civilization. The AEC (Alien Energy Chamber) acts as an initial source of energy for each home world." : "This monument is thought to be the relic of an alien civilization. The AEC (Alien Energy Chamber) acts as an initial source of energy for each home world.（外星能量發電廠，等級越高能也會相對提昇。）",

//Stockyards（儲存設備）

"Metal stockyard" : "Metal stockyard（金屬儲存廠）",
"The metal stockyard stocks metal. Each upgrade of the stockyard increases the storage capacity for metal." : "The metal stockyard stocks metal. Each upgrade of the stockyard increases the storage capacity for metal.（金屬儲存廠，等級越高存量也越高。）",
"Crystal stockyard" : "Crystal stockyard（水晶儲存廠）",
"The crystal stockyard stocks crystal. Each upgrade of the stockyard increases the storage capacity for crystal." : "The crystal stockyard stocks crystal. Each upgrade of the stockyard increases the storage capacity for crystal.（水晶儲存廠，等級越高存量也越高。）",
"Deuterium stockyard" : "Deuterium stockyard（重氫儲存槽）",
"The deuterium stockyard stocks deuterium. Each upgrade of the stockyard increases the deuterium stockyard capacity." : "The deuterium stockyard stocks deuterium. Each upgrade of the stockyard increases the deuterium stockyard capacity.（重氫儲存槽，等級越高存量也越高。）",


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

"Research facility" : "Research facility（研究設施）",
"The research facility serves to discover knowledge. Each upgrade of the building increases the generation speed of research points and thus quickens research." : "The research facility serves to discover knowledge. Each upgrade of the building increases the generation speed of research points and thus quickens research.（研發各項科技以及各種類的艦隊藍圖。）",
"Embassy" : "Embassy（大使館）",
"The embassy is necessary to join leagues, or to found your own once the building reaches level 3. An embassy also protects you from invasions!" : "The embassy is necessary to join leagues, or to found your own once the building reaches level 3. An embassy also protects you from invasions!（加入公會＆創造公會就靠他了。）",
"Building yard" : "Building yard（建築工廠）",
"The building yard decreases construction time for buildings and it also harbors the function to pull buildings down." : "The building yard decreases construction time for buildings and it also harbors the function to pull buildings down.（提昇建築工廠可以減少建築時間；並且能降低其他建築等級。）",
"Recycling yard" : "Recycling yard（資源回收場）",
"The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris." : "The recycling yard allows you to recycle your units to get back some of the resources you invested. It also senses fields of debris in your vicinity and automatically recycles part of the resources of a fleet shot down over your planet which did not land in the fields of debris.（人類特有建築，會自動搜尋宇宙中的可以回收的資源，升級可增加回收資源量以及回收範圍。）",
"Resource cache" : "Resource cache（資源暫存區）",
"The resource cache protects a certain amount of the planet's resources from being raided." : "The resource cache protects a certain amount of the planet's resources from being raided.（行星受攻擊時，保護資源不被掠奪，每升一級可以提高保護量。）",
"Trade center" : "Trade center（貿易中心）",
"The trade center serves to send out resources and to publish and accept trade offers. With each upgrade of the trade center, more traders become available." : "The trade center serves to send out resources and to publish and accept trade offers. With each upgrade of the trade center, more traders become available.（進行資源的交易買賣，每次升級後，可獲得更多商人使用。）",
"Colonization Center" : "Colonization Center（殖民中心）",
"Colonization center" : "Colonization center（殖民中心）",
"The colonization center allows you to build drop ships to colonize and invade other planets." : "The colonization center allows you to build drop ships to colonize and invade other planets.（可建造殖民用的船隻。）",
"Civilian shipyard" : "Civilian shipyard（民用造船廠）",
"The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships." : "The civilian ship yard serves to build civilian vessels. Each upgrade decreases construction time for these ships.（生產非軍事類的船艦。）",
"Robot factory" : "Robot factory（機器人工廠）",
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

"Shield generator" : "Shield generator（護盾產生裝置）",
"The shield generator generates a planetary protective shield surrounding the entire planet. As long as the shield lasts, the planet is safe from hostile fleets and missiles." : "The shield generator generates a planetary protective shield surrounding the entire planet. As long as the shield lasts, the planet is safe from hostile fleets and missiles.（產生的護盾可以保護周圍的行星和整個所在星球。）",
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

"Research lab" : "Research lab（研究實驗室）",
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

"Building" : "Building（建築中）",
"Duration:" : "尚須時間:",
"Finished:" : "建築完成時間:",
"Details" : "Details（詳細資料）",
"Selection" : "Selection（選擇）",
"Rank" : "名次",
"Species" : "種族",
"League" : "聯盟",
"Planets" : "行星",
"Points" : "點數",
"Age" : "年齡",
"Sex" : "性別",
"Location" : "所在地",
"Planet" : "行星名稱",
"Coordinates" : "座標",
"per hour" : "每小時產量",
"Player" : "玩家名稱",
"Leagues" : "聯盟",
"Def" : "防禦",
"Fights" : "Att(攻擊)",
"Support" : "Sup(支援)",
"Miscelleaneous" : "Mis(其他)",
"Archive" : "Arc (存檔)",
"Subject:" : "項目",
"Date" : "日期",
"Inbox" : "Inbox (信箱)",
"Write message" : "Write message (寫信息)",
"Sent box" : "Sent box (發信夾)",
"Sender:" : "寄件者",
"Time" : "時間",
"Research" : "研究名稱",
"Level" : "等級",
"Cost" : "花費點數",
"Action" : "執行動作",


//科技

"Engineering" : "Engineering（工程學）",
"Building lots" : "Building lots (建築空地-增加建地)",
"Building stability" : "Building stability (建築穩定性-增加建築HP)",
"Geologic exploration" : "Geologic exploration (地質探勘-加礦產數)",
"Storage capacity" : "Storage capacity (儲存容量-增加倉儲量)",
"Teleportation" : "Teleportation (電子傳送科技-減少漏失)",

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

"Energy technology" : "Energy technology（能源技術）",
"AEC energy" : "AEC energy (AEC能源)",    	
"Fusion power" : "Fusion power (核融合能源)",
"Solar power" : "Solar power (太陽能)",
"Hydropower" : "Hydropower (水力發電)",
"Wind power" : "Wind power (風力發電)",
"Thermal power" : "Thermal power (火力發電)",
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