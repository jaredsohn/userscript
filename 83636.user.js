// ==UserScript==
// @name           DMv3 - Dolphins Part2
// @description    DMv3 - Dolphins Part2 - Pages 9 - 16
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
		checkTank(123193,false);//
		checkTank(180037,false);//
		checkTank(443791,false);//
		checkTank(603613,false);//
		checkTank(345991,false);//
		checkTank(2688933,false);//
		checkTank(3343729,false);//
		checkTank(5817359,false);//
		checkTank(388041,false);//
		checkTank(3322441,false);//
		checkTank(51179,false);//
		checkTank(5481363,false);//
		checkTank(5622851,false);//
		checkTank(41831,false);//
		checkTank(2482645,false);//
		checkTank(1579583,false);//
		checkTank(2843889,false);//
		checkTank(1442579,false);//
		checkTank(3897919,false);//
		checkTank(4992713,false);//
		checkTank(336321,false);//
		checkTank(5489545,false);//
		checkTank(195371,false);//
		checkTank(587329,false);//
		checkTank(588043,false);//
		checkTank(3470001,false);//
		checkTank(1805827,false);//
		checkTank(136021,false);//
		checkTank(505273,false);//
		checkTank(2053701,false);//
		checkTank(3748299,false);//
		checkTank(134435,false);//
		checkTank(120223,false);//
		checkTank(4675715,false);//
		checkTank(1054649,false);//
		checkTank(202477,false);//
		checkTank(383083,false);//
		checkTank(3746011,false);//
		checkTank(55095,false);//
		checkTank(5232845,false);//
		checkTank(2914015,false);//
		checkTank(2485485,false);//
		checkTank(5175269,false);//
		checkTank(5471125,false);//
		checkTank(5610091,false);//
		checkTank(5490403,false);//
		checkTank(6333381,false);//
		checkTank(361373,false);//
		checkTank(5459879,false);//
		checkTank(5827719,false);//
		checkTank(5271313,false);//
		checkTank(5027917,false);//
		checkTank(3892709,false);//
		checkTank(6568555,false);//
		checkTank(6569427,false);//
		checkTank(134865,false);//
		checkTank(5387547,false);//
		checkTank(4223663,false);//
		checkTank(2872789,false);//
		checkTank(598971,false);//
		checkTank(3488123,false);//


	}
}
checkTanks();
setTimeout(checkTanks,1);