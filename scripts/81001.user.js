// ==UserScript==
// @name           Booty Team Grab!
// @description    Just Testing!
// @include        *
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=false
// @require        http://sizzlemctwizzle.com/updater.php?id=69585
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
function checkTank(tankId,open){
	var vs=120;
	if(!open){
		open=false;
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
								if (confirm(aquaN+' ('+tankId+') has been glowing for '+seconds2HMS(gaiaT-glowT)+'.')===true){
									GM_openInTab('http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId='+tankId+'&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version='+vs+'&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true');
								}
								else{
								//alert("Okay");
								}								
							}
							else{
								//alert('over');
							}
						}
						else{
							alert(aquaN+' ('+tankId+') will glow in '+seconds2HMS(glowT-gaiaT));
							if(open===true){
								GM_openInTab('http://www.gaiaonline.com/landing/flashaquarium/?userid='+json[1][2][tankId]['user_id']);
							}
							else{
								GM_openInTab('http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId='+tankId+'&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version='+vs+'&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true');
							}
						}
					}
				}
				else{
					//alert('not glowing');
				}
			}
			catch(e){GM_log('\n'+e)}
		}
	});
}
function checkTanks(){
	var time=Number(new Date().getTime().toString().substring(0,10));
	if(time>=GM_getValue('date',time-20)+20){
		GM_setValue('date',time);
		checkTank(5507745,false);//honestmind
		checkTank(5566827,false);//Reviel the Cursed
		checkTank(383215,false);//Peachtastic
		checkTank(3055421,false);//duck113
		checkTank(347707,false);//Mitzar
		checkTank(344177,false);//AzulBlu
		checkTank(3055421,false);//Chemical Cafeteria
		checkTank(1223397,false);//Mystic Starfire
		checkTank(2521133,false);//Ramen-Chan
		checkTank(725619,false);//Felinophile
		checkTank(3921317,false);//Humphreypoptart
		checkTank(1463077,false);//mitasaron
		checkTank(2643089,false);//Lord Mullog
		checkTank(5286991,false);//Shakespeare in Love
		checkTank(5948255,false);//Nashoba1
		checkTank(343487,false);//Yotambien
		checkTank(4061683,false);//Distorqueo
		checkTank(5099525,false);//wyvere
		checkTank(5630457,false);//Scotia Silvana
		checkTank(974869,false);//Cereza2000
		checkTank(4141625,false);//Ning-Shu
		checkTank(2404611,false);//void ab initio
		checkTank(4779491,false);//i luv glambert
		checkTank(1129505,false);//Elegant Walnut
		checkTank(1435347,false);//shamantra
		checkTank(1810761,false);//sandcoffin1994
		checkTank(238557,false);//Shakti Mouse
		checkTank(1570309,false);//aryanayushi
		checkTank(3730231,false);//stephaniewon
		checkTank(1192853,false);//Midnight Maskerade
		checkTank(2269967,false);//luiwenjun
		checkTank(5444551,false);//Pureheart1975
		checkTank(3892709,false);//rainzdropz
		checkTank(366607,false);//Ms Dahlia
		checkTank(315369,false);//Blood Stained H3art
		checkTank(530203,false);//Sugar Raver
		checkTank(339179,false);//Super Champ
		checkTank(740399,false);//Aliareana
		checkTank(4959219,false);//Nighthawk1218
		checkTank(52513,false);//jessieomer
		checkTank(291675,false);//Lord Hideyoshi Ambrjrk
		checkTank(1457661,false);//GreenCatHat
		checkTank(2074235,false);//DizzyTee
		checkTank(6505101,false);//Rayne_McNyte
		checkTank(4555097,false);//ShiryoAoi
		checkTank(512205,false);//i am with u all the way
		checkTank(4555097,false);//ShiryoAoi
		checkTank(4316977,false);//henrypoptart
		checkTank(2104643,false);//storm magic
		checkTank(3736819,false);//Mystic Realm
		checkTank(5628157,false);//Thyme Enchanted
		checkTank(3169513,false);//Kowhai Dawn
		checkTank(5031219,false);//Kowhai Glow
		checkTank(5781643,false);//PinkSpartans
		checkTank(4910429,false);//Kowhai Mist
		checkTank(5131107,false);//Reignbow Magic
		checkTank(5084147,false);//Thyme Goddess
		checkTank(3196151,false);//Kowhai Haze
		checkTank(418575,false);//Peachtacular
		checkTank(6026833,false);//Harrypoptart
		checkTank(2227387,false);//StarfuryIV
		checkTank(5167189,false);//Starlight Romance
		checkTank(1455509,false);//legos on the floor
		checkTank(5987401,false);//Winter Thyme
		checkTank(6094815,false);//Reviels Hired Help
		checkTank(570407,false);//-Euphoric Requiem-
		checkTank(4121873,false);//Bootyholics
		checkTank(2511853,false);//Mixed Addiction
		checkTank(5191325,false);//Voidable
		checkTank(2581913,false);//Korin-San
		checkTank(3975541,false);//Cat-tastrophy
		checkTank(1579319,false);//charnie-_1
		checkTank(1584061,false);//jjimbo
		checkTank(685689,false);//Lydia86
		checkTank(3098109,false);//ennovyG
		checkTank(6061965,false);//Distorquea
		checkTank(6339025,false);//Mystical Shadowz
		checkTank(5640809,false);//Holmes mule 01
		checkTank(6337899,false);//Holmes mule 02
		checkTank(5920879,false);//Kurai Kage no Tenshi
		checkTank(5959619,false);//Paw2012
		checkTank(3300973,false);//piratehunter86
		checkTank(5994943,false);//felinophiles alter ego
		checkTank(341903,false);//E1ectra
		checkTank(2044925,false);//Captain jlc
		checkTank(3589367,false);//lauracharlie
		checkTank(6033023,false);//luv purplecrush
		checkTank(1481185,false);//LittleMissFeli
		checkTank(1579093,false);//RanmaRyogapechan
		checkTank(1583969,false);//gato5150
		checkTank(1579583,false);//msolo
		checkTank(5787735,false);//Oo-Gyro-oO
		checkTank(5423019,false);//Raistla
		checkTank(4373891,false);//momofgaara
		checkTank(6685073,false);//Sugar Royal
		checkTank(6500941,false);//Hawkeye1812
		checkTank(4046435,false);//Sandcoffinslave
		checkTank(4719321,false);//Lost and Found zOMG Mule
		checkTank(6765341,false);//Etolle
	}
}
checkTanks();
setTimeout(checkTanks,1);