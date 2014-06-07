// ==UserScript==
// @name           Stalk Good Monster Tanks - Booty Grab	
// @description    Checks for glowing monster tanks on Gaia for good booty grab.
// @include        *
// @require        http://sizzlemctwizzle.com/updater.php?id=76781
// @version        5
// ==/UserScript==

function seconds2HMS(inputval){
	var hh = Math.floor(inputval / 3600);
	var ss_remaining = (inputval - (hh * 3600));
	var mm = Math.floor(ss_remaining / 60);
	var ss = (ss_remaining - (mm * 60));	
	if(hh<10){
		hh='0'+hh;
	}
	if(mm<10){
		mm='0'+mm;
	}
	if(ss<10){
		ss='0'+ss;
	}
	return hh+':'+mm+':'+ss;
}
function checkTank(tankId,open,username){
	if(!open){
		open=false;
	}
	if(!username){
		var username = "Unknown";
	}
	GM_xmlhttpRequest({
		method: "GET",
		url: 'http://www.gaiaonline.com/chat/gsi/index.php?'+'v=json&m=[[6500%2C[1]]%2C[6510%2C["'+tankId+'"%2C0%2C1]]%2C[6511%2C["'+tankId+'"%2C0]]%2C[6512%2C["'+tankId+'"%2C0]]%2C[107%2C["null"]]]&X='+(new Date().getTime().toString().substring(0, 10)),
		onload: function(r){
			try{
				if(typeof JSON != 'undefined'){
					var json=JSON.parse(r.responseText);
				}
				else{
					var json=eval(r.responseText);
				}
				var gaiaT=json[0][2]['gaia_curr_time'];
				try{
					var glowT=json[1][2][tankId]['game_info'][1]["open_time"];
				}
				catch(e){}
				if(glowT){
					if(json[1][2][tankId]['game_info'][1]["instance_id"]!=GM_getValue('instance_id~'+tankId,0)){
						var aquaN=json[1][2][tankId]['name'];
						if(aquaN=='<undefined string>'||!aquaN){
							aquaN=tankId;
						}
						GM_setValue('instance_id~'+tankId,json[1][2][tankId]['game_info'][1]["instance_id"]);
						if(glowT<=gaiaT){
							if(glowT+720>gaiaT){
								alert(username+' ('+tankId+') has been glowing for '+seconds2HMS(gaiaT-glowT)+'.');
								if(open===true){
									GM_openInTab('http://www.gaiaonline.com/landing/flashaquarium/?userid='+json[1][2][tankId]['user_id']);
								}
								else{
									GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393&tank='+aquaN);
								}
							}
							else{
								//alert('over');
							}
						}
						else{
							alert(username+' ('+tankId+') will glow in '+seconds2HMS(glowT-gaiaT));
							if(open===true){
								GM_openInTab('http://www.gaiaonline.com/landing/flashaquarium/?userid='+json[1][2][tankId]['user_id']);
							}
							else{
								GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393&tank='+aquaN);
							}
						}
						var fish='';
						var fishCt=0;
						var glowCt=0;
						var playCt=json[1][2][tankId]['game_info'][1]["player_count"];
						for(var i in json[2][2]){
							if(json[2][2][i]['in_env']==1){
								fishCt++;
								fish+=json[2][2][i]['item_id']+',';
								if(json[2][2][i]['game_specifics']){
									glowCt++;
								}
							}
						}
						GM_xmlhttpRequest({
							method: "POST",
							headers: {
								"Content-Type": "application/x-www-form-urlencoded"
							},
							data: "tankId="+tankId+"&fishCt="+fishCt+"&glowCt="+glowCt+"&playCt="+playCt+"&glowT="+glowT+"&fish="+fish.substr(0,fish.length-1),
							url: 'http://absol.site88.net/gtools/background/glowRecorder.php',
							onload: function(r){}
						});
					}
				}
				else{
					//alert('not glowing');
				}
			}
			catch(e){GM_log('n'+e)}
		}
	});
}
var time=Number(new Date().getTime().toString().substring(0,10));
if(time>=GM_getValue('date',time-20)+20){
	GM_setValue('date',time);
	checkTank(2223001,true,"Lord Uesugi Kenshin");
	checkTank(3756873,true,"The Infamous Manny Kun");
	checkTank(320821,true,"EmperorZensekai");
	checkTank(3921317,true,"Humphreypoptart");
	checkTank(3991587,true,"HellsAlice");
	checkTank(5298881,true,"HellsBooBoo");
	checkTank(6098665,true,"HellsConfessor");
	checkTank(3744497,true,"AlenaChen");
	checkTank(326341,true,"HellsHollywood");
	checkTank(5195275,true,"HellsMinaj");
	checkTank(6186551,true,"HellsWatchman");
	checkTank(71073,true,"SoyCrudo");
	checkTank(180037,true,"FilthyVirus");
	checkTank(4253379,true,"Tao Blackdragon");
	checkTank(6183545,true,"Mikeguin8");
	checkTank(590021,true,"Jiao Ting");
	checkTank(4144421,true,"bronxbigred");
	checkTank(3538043,true,"iiNote");
	checkTank(5763847,true,"Simply Serendipitous");
	checkTank(345515,true,"Aislanaire");
	checkTank(5401403,true,"Isele");
	checkTank(5690569,true,"Lady Arianias");
	checkTank(5498815,true,"Princess Uesugi Girly");
	checkTank(5599775,true,"Princess Uesugi Yuli");
	checkTank(2485485,true,"purrfectly yours");
	checkTank(5596329,true,"Lord Uesugi Ankit");
	checkTank(3548509,true,"Uesugi Clan Accountant");
	checkTank(3896477,true,"Uesugi Jesus");
	checkTank(2976477,true,"smartalaku2");
	checkTank(5981765,true,"stargategate");
	checkTank(3007631,true,"Hanz Herzog");
	checkTank(4681343,true,"Coco2049");
	checkTank(4487235,true,"-Wings of Tranquility-");
	checkTank(1637253,true,"Holy Doritos");
	checkTank(2956983,true,"Hanz Von Luck");
	checkTank(761223,true,"kins_ferr");
	checkTank(6396299,true,"NipsterJoe");
	checkTank(6570281,true,"oo_fiona_oo");
	checkTank(6973689,true,"Muzetta");
	checkTank(4362839,true,"HollywoodNobody");
	checkTank(1840967,true,"havenne17");
}
function addTank(){
	if(confirm('Would you like to add a tank?')===true){
		GM_openInTab('http://www.awesomolocity.herobo.com/script/addTank.html');
	}
}
function reportTank(){
	if(confirm('Would you like to report a tank?')===true){
		GM_openInTab('http://www.awesomolocity.herobo.com/script/reportTank.html');
	}
}
GM_registerMenuCommand("Stalk Good Monster Tanks: Add Tank", addTank);
GM_registerMenuCommand("Stalk Good Monster Tanks: Report Tank", reportTank);