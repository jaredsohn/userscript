// ==UserScript==
// @name           Booty Grab on Dolphin Tanks. The Newest Way!
// @description    The Newest way to play booty grab.
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
    checkTank(4423249,false);//Awesomolocity
    checkTank(2313,false);//ChaosTrooper
    checkTank(1398005,false);//Jeegoo
    checkTank(1593233,false);//iinglourious-basterd
    checkTank(1640599,false);//shikamaru awh
    checkTank(2450213,false);//1-800-OMG-GTFO
    checkTank(9811,false);//Lady Kayura
    checkTank(2937121,false);//therealmrspadalecki
    checkTank(3397339,false);//Sun and Moon Goddess
    checkTank(533439,false);//hotbakerygirl
    checkTank(5058393,false);//Lord Uesugi Kagetora
    checkTank(1493671,false);//Fishy Demon
    checkTank(5418595,false);//Not Your Toy
    checkTank(3718013,false);//Clair - Flirts
    checkTank(5175269,false);//
    checkTank(2485485,false);//
    checkTank(283827,false);//
    checkTank(2843889,false);//
    checkTank(305307,false);//
    checkTank(539187,false);//
    checkTank(789151,false);//
    checkTank(1698831,false);//
    checkTank(3166459,false);//
    checkTank(2878545,false);//
    checkTank(248465,false);//
    checkTank(116111,false);//
    checkTank(3229431,false);//
    checkTank(45629,false);//
    checkTank(13859,false);//
    checkTank(134865,false);//
    checkTank(4106681,false);//
    checkTank(397671,false);//
    checkTank(2351845,false);//
    checkTank(5470577,false);//
    checkTank(305919,false);//
    checkTank(59567,false);//
    checkTank(2872789,false);//
    checkTank(2589943,false);//
    checkTank(457777,false);//
    checkTank(140293,false);//
    checkTank(3649607,false);//
    checkTank(5489095,false);//
    checkTank(3570923,false);//
    checkTank(326807,false);//
    checkTank(3461745,false);//
    checkTank(303589,false);//
    checkTank(2761205,false);//
    checkTank(5418481,false);//
    checkTank(5258405,false);//
    checkTank(4072873,false);//
    checkTank(5263999,false);//
    checkTank(5478207,false);//
    checkTank(1950209,false);//
    checkTank(2686009,false);//
    checkTank(4047571,false);//
    checkTank(4768617,false);//
    checkTank(5490403,false);//
    checkTank(4740491,false);//
    checkTank(1102491,false);//
    checkTank(3800723,false);//
    checkTank(139587,false);//
    checkTank(828439,false);//
    checkTank(5058393,false);//
    checkTank(1835301,false);//
    checkTank(4106681,false);//
    checkTank(1102491,false);//
    checkTank(4072873,false);//
    checkTank(5258405,false);//
    checkTank(3783219,false);//
    checkTank(4183247,false);//
    checkTank(828439,false);//
    checkTank(740399,false);//
    checkTank(345991,false);//
    checkTank(388041,false);//
    checkTank(1579583,false);//
    checkTank(2843889,false);//
    checkTank(4992713,false);//
    checkTank(1054649,false);//
    checkTank(55095,false);//
    checkTank(5027917,false);//
    checkTank(3892709,false);//
    checkTank(6568555,false);//
    checkTank(5263999,false);//
    checkTank(539187,false);//
    checkTank(139587,false);//
    checkTank(2485485,false);//
    checkTank(272693,false);//
    checkTank(1579093,false);//
    checkTank(879213,false);//
    checkTank(6331399,false);//
    checkTank(1223397,false);//
    checkTank(6331405,false);//
    checkTank(1801075,false);//
    checkTank(2742765,false);//
    checkTank(45629,false);//
    checkTank(5793797,false);//
    checkTank(993111,false);//
    checkTank(5781643,false);//
    checkTank(1129505,false);//
    checkTank(5799551,false);//
    checkTank(232067,false);//
    checkTank(4259225,false);//
    checkTank(5008889,false);//
    checkTank(188293,false);//
    checkTank(664399,false);//
    checkTank(6186551,false);//
    checkTank(52095,false);//
    checkTank(3343729,false);//
    checkTank(5817359,false);//
    checkTank(6008457,false);//
    checkTank(51179,false);//
    checkTank(5622851,false);//
    checkTank(1442579,false);//
    checkTank(195371,false);//
    checkTank(1180237,false);//
    checkTank(136021,false);//
    checkTank(2053701,false);//
    checkTank(3748299,false);//
    checkTank(383083,false);//
    checkTank(5175269,false);//
    checkTank(868471,false);//
    checkTank(2589943,false);//
    checkTank(5418481,false);//
    checkTank(284237,false);//
    checkTank(180353,false);//
    checkTank(3624217,false);//
    checkTank(2442245,false);//
    checkTank(3395315,false);//
    checkTank(5251933,false);//
    checkTank(3159931,false);//
    checkTank(6635463,false);//
    checkTank(2558151,false);//
    checkTank(827211,false);//
    checkTank(6511303,false);//
    checkTank(6150659,false);//
    checkTank(598971,false);//
    checkTank(413353,false);//
    checkTank(1993,false);//
    checkTank(2976477,false);//
    checkTank(119637,false);//
    checkTank(422955,false);//
  }
}
checkTanks();
setTimeout(checkTanks,1);