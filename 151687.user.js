// ==UserScript==
// @author        Awesomolocity
// @namespace *   http://awesomolocity.info/gate.user.js
// @description  Checks for glowing tanks
// @name         Is it glowing?
// @include *
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
function checkTank(tankId, open, thread, username){
    var vs=120;
    if(!open){
        open=false;
    }
    GM_xmlhttpRequest({
        method: "GET",
        url: 'http://www.gaiaonline.com/chat/gsi/index.php?'+'v=json&m=[[6500,[1]],[6510,["'+tankId+'",0,1]],[6511,["'+tankId+'",0]],[6512,["'+tankId+'",0]],[107,["null"]]]&X='+(new Date().getTime().toString().substring(0, 10)),
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
                                if(thread){
                                    GM_openInTab(thread);
                                }
                                else{
                                    GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/');
                                }
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
                            if(thread){
                                GM_openInTab(thread);
                            }
                            else{
                                GM_openInTab('http://www.gaiaonline.com/forum/compose/topic/new/?f=393');
                            }
                        }
                    }
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
    checkTank(8446079, false, 'http://www.gaiaonline.com/forum/t.78920481/', 'ME!!!');
    checkTank(122493, false, 'http://www.gaiaonline.com/forum/t.74176525/', 'jupiter');
    checkTank(8259163, false, 'http://www.gaiaonline.com/forum/t.77042375/', 'awlwyn');
    checkTank(236535, false, 'http://www.gaiaonline.com/forum/t.53976313/', 'hirome');
    checkTank(379719, false, 'http://www.gaiaonline.com/forum/t.57759993/', 'robots');
    checkTank(14571, false, 'http://www.gaiaonline.com/forum/t.55442731/', 'fyora');
    checkTank(2912355, false, 'http://www.gaiaonline.com/forum/t.72800127/', 'glacies');
    checkTank(4802263, false, 'http://www.gaiaonline.com/forum/t.77820505/', 'katie!');
    checkTank(2250019, false, 'http://www.gaiaonline.com/forum/t.76996951/', 'you lol');
    /**********
    ** Format: checkTank(tankId, open tank, thread, username);
    ** Tankid: number used in analysis
    ** Open tank: true / false. If true, the tank will open. If false, the bump thread will open.
    ** Username: Must be in quotes. (either '' or "")
    ** Thread: Thread link (must be in quotes. If left out, it will open a new topic)
    **********/
}