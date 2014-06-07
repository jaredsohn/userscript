// ==UserScript==
// @name           Chatzy LOTS Extension by Squash
// @namespace      LOTS
// @description    Formats LOTS raid links in chatzy-space
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://us5.chatzy.com/AurorasEdge
// ==/UserScript==


function main() {
	window.CLES = {
		formatRaid: function(url){
			var i;
			var r = {diff: '', hash: '', boss: '', id: ''};
			var reg = /[?&]([^=]+)=([^?&]+)/ig;
			var p = url.replace(/&amp;/gi,"&");
			while ((i = reg.exec(p)) != null) {
				if (!r.diff && i[1] == 'kv_difficulty'){
					r.diff=parseInt(i[2])
				}
				else if (!r.hash && i[1] == 'kv_hash'){
					r.hash=i[2]
				}
				else if (!r.boss && i[1] == 'kv_raid_boss'){
					r.boss=i[2]
				}
				else if (!r.id && i[1] == 'kv_raid_id'){
					r.id=i[2]
				}
				else if (i[1] != 'kv_action_type'){
					return
				}
			}
			var stats = CLES.raids[r.boss];
			var health = CLES.getHealth(stats.health, r.diff, r.boss);
			var fairshare = CLES.getFairShare(health, stats.size, r.boss);
			var optshare = CLES.getOptShare(health, stats.size, fairshare, r.boss);
			var returnstring = "<span>" + stats.name + " - " + CLES.getDifficultyString(r.diff) + " - " + CLES.getShortNum(fairshare) + "/" + CLES.getShortNum(optshare) + "</span>";
			return returnstring;
		},
		getHealth: function(health, diff, name) {
			switch (name) {
				case "wahsh":
					return health * (diff == 1?1:(diff == 2?2.4:(diff == 3?6.25:15.625)));
					break;
				case "space_pox":
					return health * (diff == 1?1:(diff == 2?5:(diff == 3?10:15)));
					break;
				default:
					return health * (diff == 1?1:(diff == 2?1.25:(diff == 3?1.6:2)));
					break;
			}
		},
		getFairShare: function(health, size, name) {
			switch (name) {
				case "space_pox":
					return health/10;
					break;
				default:
					return health/size;
					break;
			}
		},
		getOptShare: function(health, size, fairshare, name) {
			switch (name) {
				case "wahsh":
					return health/size;
					break;
				case "space_pox":
					return fairshare * 1.9;
					break;
				default:
					return fairshare * {"10":1.25, "12":2, "50": 2.2, "100":2.3, "250": 1, "500": 1.5}[size];
					break;
			}
		},
		getDifficultyString: function(diff) {
			switch (diff) {
				case 1:
					return "N";
					break;
				case 2:
					return "H";
					break;
				case 3:
					return "L";
					break;
				case 4:
					return "NM";
					break;
			}
		},
		getShortNum: function (num) {
			if (isNaN(num) || num < 0){return num}
			else if (num>=1000000000000){return (num/1000000000000).toFixed(3)/1+"T"}
			else if (num>=1000000000){return (num/1000000000).toFixed(2)/1+"B"}
			else if (num>=1000000){return (num/1000000).toFixed(2)/1+"M"}
			else if (num>=1000){return (num/1000).toFixed(1)/1+"K"}
			else if (num>0){return num+""}
		},
		raids: {
			advocate_tulk:{name: "Advocate Tulk",id: "advocate_tulk",stat: "S",size: 50,duration: 72,health: 45000000},
			agony_and_ecstasy:{name: "Agony and Ecstasy",id: "agony_and_ecstasy",stat: "S",size: 100,duration: 72,health: 95000000},
			assasin:{name: "Kelovar Assassin",id: "assasin",stat: "S",size: 100,duration: 72,health: 65000000},
			besalaad_warmaster:{name: "Besalaad Warmaster",id: "besalaad_warmaster",stat: "S",size: 500,duration: 168,health: 700000000},
			carnifex:{name: "Carnifex Prime",id: "carnifex",stat: "S",size: 100,duration: 120,health:35000000},
			caligula:{name: "Caligula",id: "caligula",stat: "S",size: 50,duration: 72,health:55000000},
			carnus:{name: "Carnus 9000",id: "carnus",stat: "S",size: 50,duration: 120,health:15000000},
			centurian_sentinel:{name: "CC Sentinel",id: "centurian_sentinel",stat: "S",size: 250,duration: 168,health:550000000},
			china:{name: "Blood Alley Gang",id: "china",stat: "S",size: 50,duration: 72,health:35000000},
			colonel:{name: "Psychic Colonel",id: "colonel",stat: "S",size: 250,duration: 168,health:150000000},
			colonel_mustard:{name: "Colonel Mustard",id: "colonel_mustard",stat: "H",size: 10,duration: 120,health:12000000},
			commander:{name: "CC Commander",id: "commander",stat: "S",size: 10,duration: 168,health:150000},
			commander_veck:{name: "CC Storm Commander",id: "commander_veck",stat: "S",size: 250,duration: 168,health:900000000},
			contest_winners:{name: "Shadows of the Void",id: "contest_winners",stat: "H",size: 250,duration: 168,health: 500000000},
			crossbones_squadron:{name: "Crossbones Squadron",id: "crossbones_squadron",stat: "H",size: 10,duration: 120,health:8000000},
			cruiser:{name: "CC Cruiser",id: "cruiser",stat: "S",size: 50,duration: 72,health:25000000},
			cybertollahs:{name: "Supreme Cybertollahs",id: "cybertollahs",stat: "S",size: 10,duration: 72,health:4000000},
			dule_warmaster:{name: "CC Councilor", id: "dule_warmaster",stat: "S",size: 500,duration: 24,health: 2500000000},
			flora:{name: "Ruomyes' Death Flora",id: "flora",stat: "H",size: 50,duration: 144,health:35000000},
			generalrahn:{name: "CC Rahn",id: "generalrahn",stat: "S",size: 250,duration: 168,health:350000000},
			general_skorzeny:{name: "General Skorzeny",id: "general_skorzeny",stat: "?",	size: 5000,duration: 120,health:250000000000},
			genesis:{name: "Genesis",id: "genesis",stat: "H",size: 250,duration: 168,health: 1000000000},
			grislak:{name: "Grislak",id: "grislak",stat: "H",size: 50,duration: 144,health:55000000},
			hultex_quibberath:{name: "Guldax Quibberath",id: "hultex_quibberath",stat: "S",size: 250,duration: 168,health:800000000},
			infection:{name: "Infected Squad",id: "infection",stat: "H",size: 50,duration: 144,health:30000000},
			inf_colony:{name: "Infested Colony",id: "inf_colony",stat: "SEH",size: 90000,duration: 100,health:"Unlimited"},
			inf_lair:{name: "Alien Lair",id: "inf_lair",stat: "SEH",size: 90000,duration: 100,health:"Unlimited"},
			inf_ship:{name: "Python",id: "inf_ship",stat: "SEH",size: 90000,duration: 100,health:"Unlimited"},
			kaltharan_devourer:{name: "Kaltharan Devourer",id: "kaltharan_devourer",stat: "H",size: 100,duration: 168,health:175000000},
			kang:{name: "Kang",id: "kang",stat: "H",size: 10,duration: 120,health:5000000},
			krakak:{name: "Krakak Swarm",id: "krakak",stat: "H",size: 10,duration: 120,health:4500000},
			legacy_bot:{name: "Legacy Bot",id: "legacy_bot",stat: "H",size: 100,duration: 168,health:250000000},
			lieutenant_targe:{name: "Lieutenant Targe",id: "lieutenant_targe",stat: "S",size: 10,duration: 120,health:14000000},
			luna:{name: "Luna",id: "luna",stat: "H",size: 50,duration: 120,health:50000000},
			lupin:{name: "Lupin",id: "lupin",stat: "S",size: 10,duration: 72,health:12000000},
			lurking_horror:{name: "Lurking Horror",id: "lurking_horror",stat: "H",size: 250,duration: 168,health:250000000},
			mecha_wyrm:{name: "Mecha-Wyrm",id: "mecha_wyrm",stat: "H",size: 250,duration: 168,health:350000000},
			mercury:{name: "Mercury Thor",id: "mercury",stat: "S",size: 250,duration: 168,health:700000000},
			mermara:{name: "Mermara",id: "mermara",stat: "S",size: 500,duration: 168,health:800000000},
			natasha:{name: "Natasha Cybersmash",id: "natasha",stat: "S",size: 250,duration: 168,health:450000000},
			nemo:{name: "Nemo",id: "nemo",stat: "S",size: 500,duration: 168,health:1000000000},
			peacemaker_500:{name: "Peacemaker 500",id: "peacemaker_500",stat: "H",size: 100,duration: 168,health:140000000},
			purple_lion:{name: "Purple Lion",id: "purple_lion",stat: "S",size: 10,duration: 72,health:8000000},
			professor_squid:{name: "Professor Squid",id: "professor_squid",stat: "H",size: 10,duration: 120,health:18000000},
			psychic_cyborg:{name: "Mr. Justice",id: "psychic_cyborg",stat: "H",size: 50,duration: 144,health:45000000},
			qin_legion:{name: "Qin Legion",id: "qin_legion",stat: "H",size: 50,duration: 144,health:65000000},
			ragebeasts:{name: "Garlax Ragebeasts",id: "ragebeasts",stat: "S",size: 10,duration: 120,health:2000000},
			rautha:{name: "Commander Rautha",id: "rautha",stat: "S",size: 100,duration: 72,health:50000000},
			reaver:{name: "Galactic Reaver",id: "reaver",stat: "S", size: 250,duration: 72,health: 1000000000},
			robotic_rautha:{name: "Robotic Rautha",id: "robotic_rautha",stat: "S",size: 100,duration: 72,health:80000000},
			rylattu_exterminator:{name: "Rylattu Exterminator",id: "rylattu_exterminator",stat: "H",size: 100,duration: 168,health:100000000},
			saucers:{name: "Saucers",id: "saucers",stat: "H",size: 100,duration: 168,health:55000000},
			scarlet_harlet:{name: "The Scarlet Harlot",id: "scarlet_harlet",stat: "S",size: 10,duration: 72,health:10000000},
			seth:{name: "Nathaniel Vorden",id: "seth",stat: "S",size: 10,duration: 72,health:6000000},
			ship_of_the_damned:{name: "Ship of the Damned",id: "ship_of_the_damned",stat: "H",size: 250,duration: 168,health:300000000},
			sigurd:{name: "Sigurd Spinebreaker", id: "sigurd", stat: "S", size: 10,duration: 72,health: 16000000},
			sludge_serpent:{name: "Sludge Serpent",id: "sludge_serpent",stat: "S",size: 100,duration: 72,health:120000000},
			sun_xi:{name: "Sun Xi's Echo",id: "sun_xi",stat: "S",size: 100,duration: 72,health:100000000},
			telemachus:{name: "Telemachus",id: "telemachus",stat: "S",size: 100,duration: 168,health:20000000},
			terminus_death_squad:{name: "Terminus Death Squad",id: "terminus_death_squad",stat: "H",size: 10,duration: 120,health:24000000},
			terminus_interceptor_squadron:{name: "Terminus Interceptor Squadron",id: "terminus_interceptor_squadron",stat: "H",size: 50,duration: 144,health:75000000},
			terminus_juggernaut:{name: "Terminus Juggernaut",id: "terminus_juggernaut",stat: "H",size: 100,duration: 168,health:200000000},
			the_emperor:{name: "Dule's Robot",id: "the_emperor",stat: "S",size: 500,duration: 168,health:5000000000},
			trashmaster:{name: "Trashmaster Colby",id: "trashmaster",stat: "H",size: 50,duration: 144,health:100000000},
			tourniquet:{name: "Tourniquet 7",id: "tourniquet",stat: "H",size: 100,duration: 168,health:60000000},
			vince_vortex:{name: "Vince Vortex",id: "vince_vortex",stat: "E",size: 500,duration: 72,health:600000000},
			vespasia:{name: "Vespasia's Android",id: "vespasia",stat: "S",size: 250,duration: 168,health:250000000},
			void:{name: "CC Void Killer",id: "void",stat: "S",size: 50,duration: 168,health:5000000},
			vulture_gunship:{name: "Vulture Gunship",id: "vulture_gunship",stat: "S",size: 50,duration: 72,health:65000000},
			warden_ramiro:{name: "Warden Ramiro",id: "warden_ramiro",stat: "S",size: 50,duration: 72,health:60000000},
			xarpa:{name: "CC Fleet Commander", id: "xarpa",stat: "S", size: 50,duration: 72, health: 70000000},
			space_pox:{name: "Space Pox", id: "space_pox",stat: "S", size: 12,duration: 5, health: 100000000},
			wahsh:{name: "Wahsh Al-Sahraa", id: "wahsh",stat: "H", size: 100,duration: 84, health: 500000000},
		},

		formatAll: function() {
			var chatframe = document.getElementById('X165');
			chatframe.removeEventListener("DOMSubtreeModified", CLES.formatAll, true);
			var posts = chatframe.getElementsByClassName('a');
			for (var i = 0;i<posts.length;i++) {
				post = posts[i].innerHTML;
				if (post.indexOf('<a href="http://www.kongregate.com') != -1 && post.indexOf('kv_raid_boss') != -1) {
					var links = posts[i].getElementsByTagName("a");
					for (var j = 0;j<links.length;j++) {
						var raid = CLES.formatRaid(links[j].href);
						links[j].innerHTML = raid;
					}
				}
			}
			var posts = chatframe.getElementsByClassName('c');
			for (var i = 0;i<posts.length;i++) {
				post = posts[i].innerHTML;
				if (post.indexOf('<a href="http://www.kongregate.com') != -1 && post.indexOf('kv_raid_boss') != -1) {
					var links = posts[i].getElementsByTagName("a");
					for (var j = 0;j<links.length;j++) {
						var raid = CLES.formatRaid(links[j].href);
						links[j].innerHTML = raid;
					}
				}
			}
			chatframe.addEventListener("DOMSubtreeModified", CLES.formatAll, true);
			
		}
		
	}
	
	CLES.formatAll();
	

}

var script2 = document.createElement("script");
script2.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js";
(document.head || document.body || document.documentElement).appendChild(script2);
console.log("[CLES] Initializing....");
var script = document.createElement("script");
script.appendChild(document.createTextNode('('+main+')()'));
(document.head || document.body || document.documentElement).appendChild(script);


