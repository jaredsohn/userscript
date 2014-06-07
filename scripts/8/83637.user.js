// ==UserScript==
// @name           DMv3 - Minis Part1
// @description    DMv3 - Minis Part1 - Pages 1 - 9
// @include        *
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=false
// @require        http://sizzlemctwizzle.com/updater.php?id=69585
// @version        6
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

		checkTank(4319363,false);//
		checkTank(284843,false);//
		checkTank(6224915,false);//
		checkTank(5556713,false);//
		checkTank(6084327,false);//
		checkTank(3756873,false);//
		checkTank(6098665,false);//
		checkTank(3991587,false);//
		checkTank(5298881,false);//
		checkTank(326341,false);//
		checkTank(2538117,false);//
		checkTank(4785731,false);//
		checkTank(6187761,false);//
		checkTank(6114927,false);//
		checkTank(4812347,false);//
		checkTank(2708905,false);//
		checkTank(3921317,false);//
		checkTank(6114983,false);//
		checkTank(389973,false);//
		checkTank(5520745,false);//
		checkTank(95297,false);//
		checkTank(6496009,false);//
		checkTank(4143687,false);//
		checkTank(2620601,false);//
		checkTank(4681343,false);//
		checkTank(5908647,false);//
		checkTank(6094471,false);//
		checkTank(6840457,false);//
		checkTank(5145115,false);//
		checkTank(1637279,false);//
		checkTank(1892361,false);//
		checkTank(9967,false);//
		checkTank(676889,false);//
		checkTank(1803503,false);//
		checkTank(922159,false);//
		checkTank(1824117,false);//
		checkTank(1684435,false);//
		checkTank(5289921,false);//
		checkTank(3070103,false);//
		checkTank(3359569,false);//
		checkTank(4144421,false);//
		checkTank(470071,false);//
		checkTank(1130419,false);//
		checkTank(6050783,false);//
		checkTank(6050423,false);//
		checkTank(6879189,false);//
		checkTank(5550675,false);//
		checkTank(4823767,false);//
		checkTank(5222177,false);//
		checkTank(6545003,false);//
		checkTank(2173031,false);//
		checkTank(1102473,false);//
		checkTank(1042993,false);//
		checkTank(582553,false);//
		checkTank(6873281,false);//
		checkTank(4051585,false);//
		checkTank(577169,false);//
		checkTank(6183545,false);//
		checkTank(6443,false);//
		checkTank(1630547,false);//
		checkTank(2404611,false);//
		checkTank(5191325,false);//
		checkTank(4077463,false);//
		checkTank(6687191,false);//
		checkTank(6402697,false);//
		checkTank(6611905,false);//
		checkTank(5152433,false);//
		checkTank(5320045,false);//
		checkTank(166275,false);//
		checkTank(6516563,false);//
		checkTank(5263,false);//
		checkTank(6155097,false);//
		checkTank(120583,false);//

	}
}
checkTanks();
setTimeout(checkTanks,1);