// ==UserScript==
// @name          Tank Hunter
// @description    tanks, easily obtained!
// @include        *
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true
// @exclude        http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId=*&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version=*&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=false
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
							alert(aquaN+' ('+tankId+')this tank will glow in '+seconds2HMS(glowT-gaiaT));
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
		checkTank(1054649,false);//
		checkTank(1102491,false);//
		checkTank(1093893,false);//
		checkTank(1129505,false);//
		checkTank(1180237,false);//
		checkTank(1223397,false);//
		checkTank(1340161,false);//
		checkTank(1397957,false);//
		checkTank(1570419,false);//
		checkTank(1579093,false);//
		checkTank(1592853,false);//
		checkTank(1593233,false);//
		checkTank(1637253,false);//
		checkTank(1801075,false);//
		checkTank(1835301,false);//
		checkTank(196253,false);//
		checkTank(1962531,false);//
		checkTank(21033,false);//
		checkTank(2145539,false);//
		checkTank(222125,false);//
		checkTank(230743,false);//
		checkTank(2347227,false);//
		checkTank(236535,false);//
		checkTank(2368677,false);//
		checkTank(2472719,false);//
		checkTank(248465,false);//
		checkTank(2485485,false);//
		checkTank(2550589,false);//
		checkTank(2557173,false);//
		checkTank(2558151,false);//
		checkTank(258573,false);//
		checkTank(2589943,false);//
		checkTank(269939,false);//
		checkTank(272693,false);//
		checkTank(2790839,false);//
		checkTank(280611,false);//
		checkTank(284237,false);//
		checkTank(2843889,false);//
		checkTank(2883101,false);//
		checkTank(2914015,false);//
		checkTank(2958495,false);//
		checkTank(2976477,false);//
		checkTank(3059533,false);//
		checkTank(3078921,false);//
		checkTank(3148213,false);//
		checkTank(315477,false);//
		checkTank(322063,false);//
		checkTank(3262705,false);//
		checkTank(3289879,false);//
		checkTank(3308707,false);//
		checkTank(335321,false);//
		checkTank(3410333,false);//
		checkTank(343489,false);//
		checkTank(345991,false);//
		checkTank(347707,false);//
		checkTank(3511537,false);//
		checkTank(354749,false);//
		checkTank(3649607,false);//
		checkTank(3783219,false);//
		checkTank(383083,false);//
		checkTank(3859011,false);//
		checkTank(388041,false);//
		checkTank(3892709,false);//
		checkTank(3897919,false);//
		checkTank(3928411,false);//
		checkTank(4072873,false);//
		checkTank(4080761,false);//
		checkTank(4183247,false);//
		checkTank(4207331,false);//
		checkTank(4253379,false);//
		checkTank(4259225,false);//
		checkTank(430005,false);//
		checkTank(436363,false);//
		checkTank(4459341,false);//
		checkTank(4487235,false);//
		checkTank(4557119,false);//
		checkTank(47095,false);//
		checkTank(479365,false);//
		checkTank(4798656,false);//
		checkTank(4890289,false);//
		checkTank(4949963,false);//
		checkTank(4992713,false);//
		checkTank(5008889,false);//
		checkTank(5017125,false);//
		checkTank(5027917,false);//
		checkTank(5032491,false);//
		checkTank(5072895,false);//
		checkTank(511533,false);//
		checkTank(5160659,false);//
		checkTank(5258405,false);//
		checkTank(526119,false);//
		checkTank(5263999,false);//
		checkTank(5280645,false);//
		checkTank(5444551,false);//
		checkTank(5478203,false);//
		checkTank(5478207,false);//
		checkTank(5507745,false);//
		checkTank(5658639,false);//
		checkTank(5757429,false);//
		checkTank(5770971,false);//
		checkTank(5781643,false);//
		checkTank(5795785,false);//
		checkTank(5799551,false);//
		checkTank(5840793,false);//
		checkTank(5840907,false);//
		checkTank(5841055,false);//
		checkTank(5886049,false);//
		checkTank(5981765,false);//
		checkTank(598971,false);//
		checkTank(6008457,false);//
		checkTank(603613,false);//
		checkTank(6097989,false);//
		checkTank(6186551,false);//
		checkTank(6227793,false);//

	}
}
checkTanks();
setTimeout(checkTanks,1);