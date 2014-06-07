// ==UserScript==
// @name           Oni Martinez Check for glowing tanks.5
// @description    Checks tank/s Oni Martinez wanted for if they are glowing to help him stalk his tank.
// @include        *
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
	var vs=117;
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
								alert(aquaN+' ('+tankId+') has been glowing for '+seconds2HMS(gaiaT-glowT)+'.');
								if(open===true){
									GM_openInTab('http://www.gaiaonline.com/aquariumViewer/FishTankViewer.html?userEnvironmentId='+tankId+'&gsiUrl=www&isInEdit=false&firstTime=&location=popUp&quality=low&version='+vs+'&graphicsServer=http://s.cdn.gaiaonline.com/images/Gaia_Flash/aquarium/&isGameActive=true');
								}
								else{
									GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393');
									GM_openInTab('http://www.gaiaonline.com/forum/compose/entry/new/52637583/');
									GM_openInTab('http://absol.site88.net/gtools/glowTime.php?id=3069983');
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
								GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393');
								GM_openInTab('http://www.gaiaonline.com/forum/compose/entry/new/52637583/');
								GM_openInTab('http://absol.site88.net/gtools/glowTime.php?id=3069983');
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
		checkTank(3069983,false);//Oni Martinez
	}
}
checkTanks();
setTimeout(checkTanks,1);