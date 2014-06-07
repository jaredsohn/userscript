// ==UserScript==
// @name           DMv3 - Dolphins Part1
// @description    DMv3 - Dolphins Part1 - Pages 1 - 8
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
		checkTank(129681,false);//
		checkTank(5160659,false);//
		checkTank(525167,false);//
		checkTank(2589943,false);//
		checkTank(283827,false);//
		checkTank(272693,false);//
		checkTank(1321785,false);//
		checkTank(879213,false);//
		checkTank(4106681,false);//
		checkTank(6331407,false);//
		checkTank(5757429,false);//
		checkTank(6331399,false);//
		checkTank(1223397,false);//
		checkTank(6331405,false);//
		checkTank(5470577,false);//
		checkTank(1801075,false);//
		checkTank(2742765,false);//
		checkTank(45629,false);//
		checkTank(284237,false);//
		checkTank(180353,false);//
		checkTank(784247,false);//
		checkTank(2442245,false);//
		checkTank(3718013,false);//
		checkTank(3395315,false);//
		checkTank(5251933,false);//
		checkTank(3159931,false);//
		checkTank(5793797,false);//
		checkTank(5478203,false);//
		checkTank(993111,false);//
		checkTank(5481899,false);//
		checkTank(4049625,false);//
		checkTank(6181245,false);//
		checkTank(1102491,false);//
		checkTank(2472719,false);//
		checkTank(5781643,false);//
		checkTank(5418595,false);//
		checkTank(1877507,false);//
		checkTank(3069463,false);//
		checkTank(1129505,false);//
		checkTank(898461,false);//
		checkTank(2956983,false);//
		checkTank(294145,false);//
		checkTank(3007631,false);//
		checkTank(1349869,false);//
		checkTank(1618437,false);//
		checkTank(827211,false);//
		checkTank(3135737,false);//
		checkTank(3089157,false);//
		checkTank(6511303,false);//
		checkTank(3036071,false);//
		checkTank(2976477,false);//
		checkTank(3511537,false);//
		checkTank(5418481,false);//
		checkTank(5058393,false);//
		checkTank(4259225,false);//
		checkTank(5008889,false);//
		checkTank(274247,false);//
		checkTank(4694943,false);//
		checkTank(4156973,false);//
		checkTank(399609,false);//
		checkTank(3166459,false);//
		checkTank(6150659,false);//
		checkTank(598971,false);//
		checkTank(413353,false);//
		checkTank(1993,false);//
		checkTank(3783219,false);//
		checkTank(4183247,false);//
		checkTank(828439,false);//
		checkTank(3287,false);//
		checkTank(188293,false);//
		checkTank(664399,false);//
		checkTank(4532167,false);//
		checkTank(4497965,false);//
		checkTank(188929,false);//
		checkTank(6008457,false);//
		checkTank(5195275,false);//
		checkTank(6186551,false);//
		checkTank(52095,false);//
		checkTank(,false);//
		checkTank(,false);//
		checkTank(,false);//
		checkTank(,false);//
		checkTank(,false);//
		checkTank(,false);//


	}
}
checkTanks();
setTimeout(checkTanks,1);