// ==UserScript==
// @name           Check for Glowing AirShark/Coatl Tanks | 37 HQ Tanks!
// @description    Checks for glowing arishark and giant stone coatl tanks glowing. Only these two high trigger fish. May include mixed tanks with other high trigger fish.
// @include        *
// @require        http://sizzlemctwizzle.com/updater.php?id=76781
// @version        2
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
	checkTank(8297017,true,"Nekrowe Mancer");
	checkTank(8359271,true,"pantherwolf27");
	checkTank(5948255,true,"Nashoba1");
    checkTank(5909863,true,"Angeni1");
    checkTank(8355073,true,"TravisTouchdown_rank1 ");
    checkTank(3921317,true,"humphreypoptars");
    checkTank(6183545,true,"Mikeguin8");
    checkTank(2976477,true,"smartalaku2");
    checkTank(2485485,true,"purfectly yours");
    checkTank(6803921,true,"quirky one");
    checkTank(3892709,true,"rainzdropz");
    checkTank(4487235,true,"Wings of Tranquility");
    checkTank(7233399,true,"ll smartalaku2 ll");
    checkTank(7912971,true,"EXI7IUM");
    checkTank(1659533,true,"NocturnalVeil");
    checkTank(3754887,true,"Firstpoke");
    checkTank(6396299,true,"Nipster Joe");
    checkTank(13753,true,"Tsubaki01");
    checkTank(327349,true,"Sana-Cutler");
    checkTank(725619,true,"Phelinophile");
    checkTank(4144421,true,"bronxbigred");
    checkTank(1011611,true,"Razumi Yazura");
    checkTank(393371,true,"iTATCHYAiKAWA");
    checkTank(5152433,true,"TaylorGS");
    checkTank(5320045,true,"GarnetGS");
    checkTank(3621403,true,"Jinglybell");
    checkTank(2475047,true,"Remy Lebeau 1982");
    checkTank(1044195,true,"GTSluvr");
    checkTank(236535,true,"Hirome-Chan");
    checkTank(122493,true,"JupiterGirl125");
    checkTank(4320543,true,"la fleur noire");
    checkTank(5460819,true,"Virtual Earthquake");
    checkTank(8084137,true,"Edyaldi");
    checkTank(1939629,true,"Keira Laoch");
    checkTank(6010387,true,"kitty cross");
    checkTank(5113915,true,"The Bunit");
    checkTank(6295295,true,"goddess aceso");
    checkTank(7008797,true,"xXx_Tinker_Fairy_xXx");
}
function addTank(){
	if(confirm('Would you like to add a tank?')===true){
		GM_openInTab('https://docs.google.com/spreadsheet/embeddedform?formkey=dEtNeVY4d2lxLU9vWS1MUlQzWmItMUE6MQ');
	}
}
GM_registerMenuCommand("Stalk Good Monster Tanks: Add Tank", addTank);
GM_registerMenuCommand("Stalk Good Monster Tanks: Report Tank", reportTank);