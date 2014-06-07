// ==UserScript==
// @name        DotD Kongregate Forum Raid Link Beautifier 
// @namespace   fpx.dotd.rlb
// @description formats raidlinks posted in kongregate forum
// @author		chairmansteve
// @include     http://www.kongregate.com/forums/137-dawn-of-the-dragons/topics/*
// @version     1.0.0.0
// ==/UserScript==

/*
 *EDIT THIS LINE TO CHANGE THE WAY LINKS ARE DISPLAYED
 */
const raidLinkFormat = "<name> - <diff> - <fs>/<os>";


/*
 *DO NOT EDIT ANYTHING UNDER THIS LINE
 */

const raids = {
			misako:{name: 'Misako', shortname: 'Misako',  id: 'misako', stat: 'S', size:1, duration:48, health: [100000,125000,160000,200000,,]},
			mestr:{name: 'Mestr Rekkr', shortname: 'Mestr',  id: 'mestr', stat: 'S', size:1, duration:48, health: [150000,187500,240000,300000,,]},
			magma_horror:{name: 'Magma Horror', shortname: 'Magma',  id: 'magma_horror', stat: 'S', size:1, duration:24, health: [200000,250000,320000,400000,,]},
			kobold:{name: 'Chieftain Horgrak', shortname: 'Horgrak',  id: 'kobold', stat: 'S', size:10, duration:168, health: [150000,187500,240000,300000,,]},
			rhino:{name: 'Ataxes', shortname: 'Ataxes',  id: 'rhino', stat: 'S', size:10, duration:120, health: [2000000,2500000,3200000,4000000,,]},
			'4ogre':{name: 'Briareus the Butcher', shortname: 'Briareus',  id: '4ogre', stat: 'S', size:10, duration:72, health: [4500000,5625000,7200000,9000000,,]},
			bmane:{name: 'Bloodmane', shortname: 'Bmane',  id: 'bmane', stat: 'S', size:10, duration:72, health: [7000000,8750000,11200000,14000000,,]},
			ironclad:{name: 'Ironclad', shortname: 'Ironclad',  id: 'ironclad', stat: 'S', size:10, duration:48, health: [10000000,12500000,16000000,20000000,,]},
			gunnar:{name: 'Gunnar the Berserk', shortname: 'Gunnar',  id: 'gunnar', stat: 'S', size:10, duration:48, health: [12000000,15000000,19200000,24000000,,]},
			maraak:{name: 'Maraak the Impaler', shortname: 'Maraak',  id: 'maraak', stat: 'S', size:10, duration:48, health: [15000000,18750000,24000000,30000000,,]},
			hargamesh:{name: 'Hargamesh', shortname: 'Hargamesh',  id: 'hargamesh', stat: 'S', size:10, duration:48, health: [18000000,22500000,28800000,36000000,,]},
			harpy:{name: 'Celeano', shortname: 'Cel',  id: 'harpy', stat: 'H', size:10, duration:120, health: [3000000,3750000,4800000,6000000,,]},
			evilgnome:{name: 'Groblar Deathcap', shortname: 'Groblar',  id: 'evilgnome', stat: 'H', size:10, duration:120, health: [6000000,7500000,9600000,12000000,,]},
			gladiators:{name: 'Batiatus’ Gladiators ', shortname: 'Batiatus’ Gladiators ',  id: 'gladiators', stat: 'H', size:10, duration:120, health: [12000000,15000000,19200000,24000000,,]},
			gorgon:{name: 'Tithrasia', shortname: 'Tithrasia',  id: 'gorgon', stat: 'H', size:10, duration:120, health: [18000000,22500000,28800000,36000000,,]},
			slaughterers:{name: 'Slaughterers Six', shortname: 'Slaughterers',  id: 'slaughterers', stat: 'H', size:10, duration:120, health: [24000000,30000000,38400000,48000000,,]},
			fairy_prince:{name: 'Prince Obyron', shortname: 'Obyron',  id: 'fairy_prince', stat: 'H', size:10, duration:120, health: [60000000,75000000,96000000,120000000,,]},
			scorp:{name: 'Mazalu', shortname: 'Mazalu',  id: 'scorp', stat: 'S', size:50, duration:168, health: [5000000,6250000,8000000,10000000,,]},
			alice:{name: 'Bloody Alice', shortname: 'Alice',  id: 'alice', stat: 'S', size:50, duration:120, health: [15000000,18750000,24000000,30000000,,]},
			squid:{name: 'Scylla', shortname: 'Scylla',  id: 'squid', stat: 'S', size:50, duration:72, health: [25000000,31250000,40000000,50000000,,]},
			'3dawg':{name: 'Kerberos', shortname: 'Kerb',  id: '3dawg', stat: 'S', size:50, duration:72, health: [35000000,43750000,56000000,70000000,,]},
			zombiehorde:{name: 'Zombie Horde', shortname: 'Zombies',  id: 'zombiehorde', stat: 'S', size:50, duration:60, health: [45000000,56250000,72000000,90000000,,]},
			nidhogg:{name: 'Nidhogg', shortname: 'Nidhogg',  id: 'nidhogg', stat: 'S', size:50, duration:60, health: [52000000,65000000,83200000,104000000,,]},
			erakka_sak:{name: 'Erakka-Sak', shortname: 'Erakka',  id: 'erakka_sak', stat: 'S', size:50, duration:60, health: [62000000,77500000,99200000,124000000,,]},
			grimsly:{name: 'Headmaster Grimsly', shortname: 'Grimsly',  id: 'grimsly', stat: 'S', size:50, duration:60, health: [72000000,90000000,115200000,144000000,,]},
			spider:{name: 'Arachna', shortname: 'Arachna',  id: 'spider', stat: 'H', size:50, duration:144, health: [22000000,27500000,35200000,44000000,,]},
			basilisk:{name: 'Deathglare', shortname: 'Deathglare',  id: 'basilisk', stat: 'H', size:50, duration:144, health: [45000000,56250000,72000000,90000000,,]},
			chimera:{name: 'Tetrarchos', shortname: 'Tetrarchos',  id: 'chimera', stat: 'H', size:50, duration:144, health: [90000000,112500000,144000000,180000000,,]},
			werewolfpack:{name: 'Black Moon', shortname: 'Black Moon',  id: 'werewolfpack', stat: 'H', size:50, duration:144, health: [135000000,168750000,216000000,270000000,,]},
			lunacy:{name: 'Lunatics', shortname: 'Lunatics',  id: 'lunacy', stat: 'H', size:50, duration:144, health: [180000000,225000000,288000000,360000000,,]},
			war_boar:{name: 'Hammer', shortname: 'Hammer',  id: 'war_boar', stat: 'H', size:50, duration:144, health: [220000000,275000000,352000000,440000000,,]},
			ogre:{name: 'General Grune', shortname: 'Grune',  id: 'ogre', stat: 'S', size:100, duration:172, health: [20000000,25000000,32000000,40000000,,]},
			lurker:{name: 'Lurking Horror', shortname: 'Lurking',  id: 'lurker', stat: 'S', size:100, duration:120, health: [35000000,43750000,56000000,70000000,,]},
			batman:{name: 'Gravlok the Night-Hunter', shortname: 'Grav',  id: 'batman', stat: 'S', size:100, duration:72, health: [50000000,62500000,80000000,100000000,,]},
			hydra:{name: 'Hydra', shortname: 'Hydra',  id: 'hydra', stat: 'S', size:100, duration:72, health: [65000000,81250000,104000000,130000000,,]},
			stein:{name: 'Stein', shortname: 'Stein',  id: 'stein', stat: 'S', size:100, duration:72, health: [80000000,100000000,128000000,160000000,,]},
			kang:{name: 'Kang-Gsod', shortname: 'Kang',  id: 'kang', stat: 'S', size:100, duration:72, health: [95000000,118750000,152000000,190000000,,]},
			wexxa:{name: 'Wexxa the Worm-Tamer', shortname: 'Wexxa',  id: 'wexxa', stat: 'S', size:100, duration:72, health: [110000000,137500000,176000000,220000000,,]},
			rift:{name: 'Rift the Mauler', shortname: 'Rift',  id: 'rift', stat: 'S', size:100, duration:72, health: [125000000,156250000,200000000,250000000,,]},
			djinn:{name: 'Al-Azab', shortname: 'Al-Azab',  id: 'djinn', stat: 'H', size:100, duration:168, health: [55000000,68750000,88000000,110000000,,]},
			roc:{name: 'Ragetalon', shortname: 'Ragetalon',  id: 'roc', stat: 'H', size:100, duration:168, health: [110000000,137500000,176000000,220000000,,]},
			crabshark:{name: 'Scuttlegore', shortname: 'Scuttle',  id: 'crabshark', stat: 'H', size:100, duration:168, health: [220000000,275000000,352000000,440000000,,]},
			blobmonster:{name: 'Varlachleth', shortname: 'Varla',  id: 'blobmonster', stat: 'H', size:100, duration:168, health: [330000000,412500000,528000000,660000000,,]},
			felendis:{name: 'Felendis and Shaoquin', shortname: 'Felendis',  id: 'felendis', stat: 'H', size:100, duration:168, health: [441823718,549238221,707842125,888007007,,]},
			dirthax:{name: 'Dirthax', shortname: 'Dirthax',  id: 'dirthax', stat: 'H', size:100, duration:168, health: [550000000,687500000,880000000,1100000000,,]},
			giantgolem:{name: 'Euphronios', shortname: 'Euphronios',  id: 'giantgolem', stat: 'H', size:100, duration:168, health: [450000000,562500000,720000000,900000000,,]},
			agony:{name: 'Agony', shortname: 'Agony',  id: 'agony', stat: 'H', size:100, duration:168, health: [700000000,875000000,1120000000,1400000000,,]},
			dreadbloom:{name: 'Giant Dreadbloom', shortname: 'Dreadbloom',  id: 'dreadbloom', stat: 'H', size:100, duration:192, health: [900000000,1125000000,1440000000,1800000000,,]},
			rhalmarius_the_despoiler:{name: 'Rhalmarius the Despoiler', shortname: 'Rhal',  id: 'rhalmarius_the_despoiler', stat: 'H', size:100, duration:84, health: [500000000,1250000000,3125000000,7812500000,,]},
			drag:{name: 'Erebus the Black', shortname: 'Erebus',  id: 'drag', stat: 'S', size:250, duration:168, health: [150000000,187500000,240000000,300000000,,]},
			tainted:{name: 'Tainted Erebus', shortname: 'Tainted',  id: 'tainted', stat: 'S', size:250, duration:168, health: [250000000,312500000,400000000,500000000,,]},
			sircai:{name: 'Sir Cai', shortname: 'SirCai',  id: 'sircai', stat: 'S', size:250, duration:168, health: [350000000,437500000,560000000,700000000,,]},
			bogstench:{name: 'Bogstench', shortname: 'Bogstench',  id: 'bogstench', stat: 'S', size:250, duration:96, health: [450000000,562500000,720000000,900000000,,]},
			ulfrik:{name: 'Ulfrik', shortname: 'Ulfrik',  id: 'ulfrik', stat: 'S', size:250, duration:96, health: [500000000,625000000,800000000,1000000000,,]},
			guilbert:{name: 'Guilbert the Mad', shortname: 'Guilbert',  id: 'guilbert', stat: 'S', size:250, duration:96, health: [550000000,687500000,880000000,1100000000,,]},
			sisters:{name: 'Sisters of the Song', shortname: 'Sisters',  id: 'sisters', stat: 'S', size:250, duration:96, health: [600000000,750000000,960000000,1200000000,,]},
			mesyra:{name: 'Mesyra the Watcher', shortname: 'Mesyra',  id: 'mesyra', stat: 'S', size:250, duration:96, health: [1000000000,1250000000,1600000000,2000000000,,]},
			nimrod:{name: 'Nimrod the Hunter', shortname: 'Nimrod',  id: 'nimrod', stat: 'S', size:250, duration:96, health: [1200000000,1500000000,1920000000,2400000000,,]},
			phaedra:{name: 'Phaedra the Deceiver', shortname: 'Phaedra',  id: 'phaedra', stat: 'S', size:250, duration:96, health: [1400000000,1750000000,2240000000,2800000000,,]},
			tyranthius:{name: 'Lord Tyranthius', shortname: 'Tyr',  id: 'tyranthius', stat: 'S', size:500, duration:168, health: [600000000,750000000,960000000,1200000000,,]},
			nalagarst:{name: 'Nalagarst', shortname: 'Nalagarst',  id: 'nalagarst', stat: 'S', size:500, duration:98, health: [700000000,875000000,1120000000,1400000000,,]},
			kalaxia:{name: 'Kalaxia The Far-Seer', shortname: 'Kalaxia',  id: 'kalaxia', stat: 'S', size:500, duration:96, health: [800000000,1000000000,1280000000,1600000000,,]},
			bellarius:{name: 'Bellarius the Guardian', shortname: 'Bellarius',  id: 'bellarius', stat: 'S', size:500, duration:96, health: [900000000,1125000000,1440000000,1800000000,,]},
			mardachus:{name: 'Mardachus the Destroyer', shortname: 'Mardachus',  id: 'mardachus', stat: 'S', size:500, duration:96, health: [1100000000,1375000000,1760000000,2200000000,,]},
			tenebra:{name: 'Tenebra the Shadow-Mistress', shortname: 'Tenebra',  id: 'tenebra', stat: 'S', size:500, duration:128, health: [2000000000,2500000000,3200000000,4000000000,,]},
			valanazes:{name: 'Valanazes the Gold', shortname: 'Valanazes',  id: 'valanazes', stat: 'S', size:500, duration:128, health: [2400000000,3000000000,3840000000,4800000000,,]},
			dragons_lair:{name: 'Dragons Lair', shortname: 'Lair',  id: 'dragons_lair', stat: 'S', size:10, duration:5, health: [100000000,500000000,1000000000,1500000000,,]},
			kessovtowers:{name: 'Kessov Towers', shortname: 'Towers',  id: 'kessovtowers', stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kessovforts:{name: 'Kessov Forts', shortname: 'Forts',  id: 'kessovforts', stat: 'ESH', size:90000, duration:120, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			kessovcastle:{name: 'Kessov Castle', shortname: 'Castle',  id: 'kessovcastle', stat: 'ESH', size:90000, duration:144, health: ['Unlimited','Unlimited','Unlimited','Unlimited','Unlimited','Unlimited']},
			echthros:{name: 'Echthros', shortname: 'Echthros',  id: 'echthros', stat: 'S', size:2000, duration:48, health: [150000000000,,,250000000000,500000000000,10000000000000]},
			tisiphone:{name: 'Tisiphone The Vengeful', shortname: 'Tisiphone',  id: 'tisiphone', stat: 'E', size:50, duration:48, health: [500000000,2500000000,5000000000,7500000000,,]},
			serpina:{name: 'Countess Serpina', shortname: 'Countess',  id: 'serpina', stat: 'E', size:10, duration:5, health: [75000000,112500000,150000000,187500000,,]}
		};
		
		function getRaidLink(msg,ele,user) {
			msg = msg.replace(/[\r\n]/g,"");
			var m = /(?:www\.)?kongregate\.com\/games\/5thPlanetGames\/dawn-of-the-dragons(?:_preview)?(.*kv_raid_boss=.*)/i.exec(msg);
			//alert(m[1]);
			if (m) {
				//alert(m[0]);
				var raid = getRaidDetails(m[1],(user?user:''))
				if (typeof raid != 'undefined' && typeof raid != 'null') {
					ele.textContent=raid.linkText();
				}
			}
		};
		
		function getShortNum (num) {
			if (isNaN(num) || num < 0){return num}
			else if (num>=1000000000000){return (num/1000000000000).toFixed(3)/1+"T"}
			else if (num>=1000000000){return (num/1000000000).toFixed(2)/1+"B"}
			else if (num>=1000000){return (num/1000000).toFixed(2)/1+"M"}
			else if (num>=1000){return (num/1000).toFixed(1)/1+"K"}
			else if (num>0){return num+""}
		};
		
		function getStatText(stat) {
			stat=stat.toLowerCase();
			var r="";
			if (stat=='?'||stat=='Unknown')return 'Unknown';
			if (stat.indexOf("s")>-1)r="Stamina";
			if (stat.indexOf("h")>-1)r+=(r!=''?(stat.indexOf("e")>-1?", ":" and "):"")+"Honor";
			if (stat.indexOf("e")>-1)r+=(r!=''?" and ":"")+"Energy";
			return r;
		};
		
		function getRaidDetails(url,user) {
			user = (user?user:'');
			var i;
			var r = {diff: '', hash: '', boss: '', id: ''};
			var reg = /[?&]([^=]+)=([^?&]+)/ig, p = url.replace(/&amp;/gi,"&");
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
			if (typeof r != 'undefined' && typeof r.diff != 'undefined' && typeof r.hash != 'undefined' && typeof r.boss != 'undefined' && typeof r.id != 'undefined') {
				
				r.diffLongText = ['Normal','Hard','Legendary','Nightmare','Insane','Hell'][r.diff-1];
				r.diffShortText = ['N','H','L','NM','I','HL'][r.diff-1];
				/* r.seen = info.seen;
				r.visited = info.visited; */

				var stats = raids[r.boss];
				if (typeof stats == 'object') {
					r.name = stats.name;
					r.size = stats.size;
					r.dur = stats.duration;
					r.durText = stats.dur + "hrs";
					r.stat = stats.stat;
					r.statText = getStatText(stats.stat);
					if (!isNaN(stats.health[r.diff-1])) {
						r.health = stats.health[r.diff-1];
						r.healthText = getShortNum(r.health);
						r.fairShare = r.health / r.size;
						r.fairShareText = getShortNum(r.fairShare);
						r.optimalShare = r.fairShare * {"10":1.25, "50": 2.2, "100":2.3, "250": 1, "500": 1.5}[r.size];
						r.optimalShareText = getShortNum(r.optimalShare);
						
					}
					else if (stats.health[0] == 'Unlimited') {
						r.health = '';
						r.healthText = 'Unlimited';
						r.fairShare = 1000000000;
						r.fairShareText = getShortNum(r.fairShare);
						r.optimalShare = 1000000000;
						r.optimalShareText = getShortNum(r.optimalShare);
					}
					else {
						r.health = '';
						r.healthText = 'Unknown';
						r.fairShare = '';
						r.fairShareText = 'Unknown';
						r.fairShare = '';
						r.optimalShareText = 'Unknown';
					} 
				}

				r.linkText = function () {
					if (true){
						var txt = raidLinkFormat;
						txt = txt.replace(/<visited:([^>]*)>/gi,(this.visited?"$1":""));
						txt = txt.replace(/<seen:([^>]*)>/gi,(this.seen?"$1":""));
						txt = txt.replace(/<diff>/gi,this.diffShortText);
						txt = txt.replace(/<diff:Num>/gi,this.diff);
						txt = txt.replace(/<diff:Long>/gi,this.diffLongText);
						txt = txt.replace(/<bossId>/gi,this.boss);
						txt = txt.replace(/<raidId>/gi,this.id);
						txt = txt.replace(/<hash>/gi,this.hash);
						txt = txt.replace(/<name>/gi,(!this.name?'Unknown':this.name));
						txt = txt.replace(/<shortname>/gi,(!this.name?'Unknown':raids[this.boss].shortname));
						txt = txt.replace(/<size>/gi,(!this.name?'':this.size));
						txt = txt.replace(/<dur>/gi,(!this.name?'':this.durText));
						txt = txt.replace(/<dur:Num>/gi,(!this.name?'':this.dur));
						txt = txt.replace(/<stat>/gi,(!this.name?'':this.stat));
						txt = txt.replace(/<stat:Long>/gi,(!this.name?'':this.statText));
						txt = txt.replace(/<health>/gi,(!this.name?'':this.healthText));
						txt = txt.replace(/<health:Num>/gi,(!this.name?'':this.health));
						txt = txt.replace(/<fs>/gi,(!this.name?'':this.fairShareText));
						txt = txt.replace(/<fs:Num>/gi,(!this.name?'':this.fairShare));
						txt = txt.replace(/<os>/gi,(!this.name?'':this.optimalShareText));
						txt = txt.replace(/<os:Num>/gi,(!this.name?'':this.optimalShare));	
						txt = txt.replace(/</g,"&lt;").replace(/>/g,"&gt;");
						return txt.replace(/&lt;image&gt;/gi,'<image src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif" style="vertical-align: text-top; float: left;">');
					}
					else {
						return '<image src="http://cdn2.kongregate.com/game_icons/0033/2679/i.gif" style="vertical-align: text-top"> Legacy of a Thousand Suns'
					}
				}
				return r;
			}
		};
		
		function main(){
			var elem = document.getElementsByTagName('a');
			for (var i = 0; i < elem.length; i++) {
				var link =  elem[i].getAttribute("href");
				if(link == null) continue;			
				getRaidLink(link,elem[i],false);
			}
		}
		
		main();