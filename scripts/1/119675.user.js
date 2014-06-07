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
	checkTank(320821,true,"EmperorZensekai");
	checkTank(3921317,true,"Humphreypoptart");
	checkTank(326341,true,"HellsHollywood");
	checkTank(6183545,true,"Mikeguin8");
	checkTank(4144421,true,"bronxbigred");
	checkTank(345515,true,"Aislanaire");
	checkTank(5498815,true,"Princess Uesugi Girly");
	checkTank(5599775,true,"Princess Uesugi Yuli");
	checkTank(2485485,true,"purrfectly yours");
	checkTank(3548509,true,"Uesugi Clan Accountant");
	checkTank(2976477,true,"smartalaku2");
	checkTank(5981765,true,"stargategate");
	checkTank(4681343,true,"Cocoa208");
	checkTank(4487235,true,"-Wings of Tranquility-");
	checkTank(6396299,true,"NipsterJoe");
	checkTank(4362839,true,"HollywoodNobody");
	checkTank(49687,true,"Sagebomb");
    checkTank(2987811,true,"Boycotting love");
	checkTank(3476453,true,"sparkling chardonnay");
	checkTank(2962041,true,"Shiraz cabernet");
	checkTank(995533,true,"la tromperie");
	checkTank(2913521,true,"ll Mystique ll");
	checkTank(46847,true,"Absol - Ruler of Chaos");
	checkTank(6035123,true,"toxic010");
	checkTank(5153919,true,"toxic008");
	checkTank(6032853,true,"toxic009");
	checkTank(5470577,true,"O Righteous Overseer");
	checkTank(4434021,true,"c0ke-sakt0");
	checkTank(5891173,true,"Illustria");
	checkTank(443791,true,"Eternalized Oath");
	checkTank(725619,true,"Felinophile");
	checkTank(868471,true,"Fukii");
	checkTank(393729,true,"cutester");
	checkTank(5152433,true,"TaylorGS");
	checkTank(5320045,true,"GarnetGS");
	checkTank(3859011,true,"Wind Silver Dragon");
	checkTank(2368127,true,"Absol-Ruler of ChaosMule2");
	checkTank(5994943,true,"felinophiles alter ego");
	checkTank(708237,true,"Absol-Ruler of Chaos Mule");
	checkTank(7414659,true,"-Tranquil Wings-");
	checkTank(3792457,true,"Boogies With Sabers");
	checkTank(6339777,true,"Koyado");
	checkTank(3973891,true,"SS2-SITH LORD");
	checkTank(6443,true,"My Styles Of Poetry");
	checkTank(3182491,true,"ralphy71889");
	checkTank(7549599,true,"NicQii");
	checkTank(85791,true,"Call me Ginge");
	checkTank(737043,true,"Ekkusu_X");
	checkTank(333893,true,"Ranchi ");
	checkTank(393995,true,"shellsmachine");
	checkTank(388041,true,"yorabbit");
	checkTank(6816715,true,"KawaiiKareshiV2");
	checkTank(8134021,true,"GetRichOrDieTryn");
	checkTank(676889,true,"Podium");
	checkTank(6547463,true,"Abeldemon");
	checkTank(2558151,true,"Dances With Scissors");
	checkTank(5753759,true,"Kinky Rei");
	checkTank(7338651,true,"Lord Vicmorn");
	checkTank(4876513,true,"Sweet Moonbeam");
	checkTank(577169,true,"Sweet Moonbeam");
	checkTank(5052655,true,"Vilhelmina");
	checkTank(8138261,true,"Milk_Chocolate21");
	checkTank(1018817,true,"PV=nRT");
	checkTank(4473001,true,"Peachy_Girl_Momo");
	checkTank(8124301,true,"JuicyInDaSkull");
	checkTank(284237,true,"Lex Joseph Luthor");
	checkTank(1819725,true,"The Omnitrix King");
	checkTank(6331405,true,"69 Degrees and Sunny");
	checkTank(142693,true,"JoanTheDark");
	checkTank(8067275,true,"butterfly dream spirit");
	checkTank(83179,true,"Aleetheeuh");
	checkTank(6918863,true,"kAiRii_10");
	checkTank(6547463,true,"Abeldemon");
	checkTank(7338651,true,"Lord Vicmorn");
	checkTank(5052655,true,"Vilhelmina");
	
	
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