// ==UserScript==
    // @name           Pokemon Vortex Auto-Move/Auto-Battle Bot
    // @namespace      PVAB
    // @author         Hugo Pi
    // @description    Auto Move and battle on pokemon-vortex.com
    // @homepage            http://userscripts.org/scripts/show/156315
    // @include        http://*.pokemon-vortex.com/map.php?map=*
    // @include        http://*.pokemon-vortex.com/wildbattle.php*
    // @include        http://*.pokemon-vortex.com/battle_select.php?type=member*
    // @include        http://*.pokemon-vortex.com/battle.php*
    // @exclude        http://*.pokemon-vortex.com/adv.php*
    // @require        http://code.jquery.com/jquery-1.8.3.js
    // @run-at        document-end
    // @grant        GM_getValue
    // @grant        GM_setValue
    // @version        2.0.0
    // @licence        Public Domain!
    // ==/UserScript==
     
   
                    if($('div#ajax > form#battleForm > div.errorMsg').length){
                            if($('div#ajax > form > div.errorMsg').html()!=undefined){
                                    if($('div#ajax > form > div.errorMsg').html().toString().indexOf('It seems as though you have already completed this battle')!=-1){
                                            newMap();
                                            return(false);
                                    }
                            }
                    }
     
                    if($('div#ajax > div.errorMsg').length){
                            if($('div#ajax >  div.errorMsg').html()!=undefined){
                                    if($('div#ajax > div.errorMsg').html().toString().indexOf('It seems as though you have already completed this battle')!=-1){
                                            newMap();
                                            return(false);
                                    }
                            }
                    }
                   
                    if($('div#ajax > form#battleForm > h2').html()=='Your Pok'+String.fromCharCode(233)+'mon Team:'.toString()){
                            setTimeout(function(){
                                    $("form#battleForm").submit();
                                    isWildBattle();
                            },150)
                            return(false);
                    }
                   
                    if($('div#ajax > form#battleForm > h2').html()=='Choose an attack'){
                            $('#attack'+rndFrom(1,4)).attr('checked', true);
                            //$('#attack4').attr('checked', true);
                            isWildBattle();
                            $("form#battleForm").submit();
                            return(false);
                    }
                   
                    if($('div#ajax > form#battleForm > h2').html()=='Attack results'){
                            isWildBattle();
                            $("form#battleForm").submit();
                            return(false);
                    }
     
                    if($('div#ajax > p:eq(1) > a:eq(0)').html()=='Return to the Map'){
                            clearTimeout(timeOuts.session);
                            setTimeout(function(){
                                    GM_setValue('new_session',true)
                                    $('div#ajax > p:eq(1) > a:eq(0)').get(0).click();
                            },6000)
                            return(false);
                    }
     
                    //when the 'You have already completed a battle within the last 10 seconds. This is in effect to prevent cheating of any kind.' error shows up
                    if($('div#ajax > p:eq(0) > a:eq(0)').html()=='Return to the Map'){
                            clearTimeout(timeOuts.session);
                            setTimeout(function(){
                                    GM_setValue('new_session',true)
                                    $('div#ajax > p:eq(0) > a:eq(0)').get(0).click();
                            },6000)
                            return(false);
                    }
            }
     
            function isLoading(){
                    var ml=$('div#mapLoading').length; //map
                    var bl=$('div#loading').length; //battle
     
                    if(bl!=0) {
                            bl=$('div#loading').css('visibility');
                            if(bl=='hidden'){
                                    return(false);
                            }else{
                                    return(true);
                            }
                    }
     
                    if(ml!=0) {
                            ml=$('div#mapLoading').css('visibility');
                            if(ml=='hidden'){
                                    return(false);
                            }else{
                                    return(true);
                            }
                    }
                   
                    return(true);
            }      
     
            function isWildBattle(){
                    //checks for wildbattle.php
                    var enabled=GM_getValue('battle_enabled',false);
                    if(enabled){
                            if(dlh.indexOf('wildbattle')!=-1){
                                    GM_setValue('new_session',true)
                                    timeOuts.battleLoop=setTimeout(doBattleLoop,50);
                            }
                    }
            }
           
            function moveMe(){
                    clearTimeout(timeOuts.moveAround);
                    var en=GM_getValue('move_enabled',true)
                    if(en==false) {
                            clearTimeout(timeOuts.session);
                            return(false);
                    }
                    var t=250;
                    var iloading=isLoading;
                    if(iloading==true){
                            timeOuts.moveAround=setTimeout(moveMe,t);
                            return(false);
                    }
                   
                    direction.moves++;
                    var lm=direction.randDir;
                    doMove();
                    if(lm!=direction.randDir) doMove();
                    if(direction.moves>100) {
                            //it has not found any pokemon to battle
                            clearTimeout(timeOuts.session);
                            clearTimeout(timeOuts.battleButton);
                            newMap();
                            return(false);
                    }
                    timeOuts.battleButton=setTimeout(findBattleBTN,t);
            }      
     
            function findBattleBTN(){
                    if(dlh.indexOf('wildbattle')!=-1) return(false);
                    var t=250;
                    clearTimeout(timeOuts.battleButton);
                    clearTimeout(timeOuts.moveAround);
                    var iloading=isLoading();
                   
                    if(iloading==true){
                            timeOuts.battleButton=setTimeout(findBattleBTN,t);
                            return(false);
                    }
                   
                    if($('div#pkmnappearomega > form > p > input:eq(1)').length){
                            //clearTimeout(timeOuts.session);
                            var h=$('div#pkmnappearomega > form').html().toLowerCase();
                            if((h.indexOf('unown')==-1)){
                                    savePokemon();
                                    var h=$('div#alert').html();
                                    if(h.length>2) {
                                            newMap();
                                            return(false);
                                    }
                                    setTimeout(function(){
                                            GM_setValue('new_session',true)
                                            $('div#pkmnappearomega > form')[0].submit();
                                    },500);
                                    //timeOuts.moveAround=setTimeout(moveMe,175);
                                    return(false);
                            }else{
                                    timeOuts.moveAround=setTimeout(moveMe,t);
                            }
                           
                    }else{
                            timeOuts.moveAround=setTimeout(moveMe,t);
                    }
            }
           
           
            function savePokemon(){
                            //dont save just return;
                            return;
                           
                            var tbattles=GM_getValue('tbattles',0);
                            tbattles++;
                            GM_setValue('tbattles',tbattles);
                            var image=$('div#pkmnappearomega > form > center > img').attr('src');
                            var pokemon;
                            var st='';
                            if($('div#pkmnappearomega > form > center > p > img').length){
                                    //when you own it, grab whats in the strong tag
                                    st=' > strong'
                            }
                            pokemon=$('div#pkmnappearomega > form > center > p ' +st).html().replace(' appeared','').toString().trim();
                           
                            var map=dlh.split('=');
                            map=map[1];
                            var p=new Object();
                            p.i=image.replace('http://static.pokemon-vortex.com/images/pokemon/','')
                            p.n=pokemon.trim();
                            p.m=map;
                            p.c=0;
                            var ls=GM_getValue('plist','[]')
                            try{
                                    PokemonList=JSON.parse(ls);
                            }catch(e){}
     
                            if(!pexist(pokemon.trim())) {
                                    PokemonList.push(p);
                                    GM_setValue('plist',JSON.stringify(PokemonList));
                            }
                            GM_log(ctime(Date.now()) + ' = ' +PokemonList.length);
            }
           
     
           
            function doMove(){
                    if(direction.randDir==0) direction.up();
                    if(direction.randDir==1) direction.upright();
                    if(direction.randDir==2) direction.right();
                    if(direction.randDir==3) direction.downright();
                    if(direction.randDir==4) direction.down();
                    if(direction.randDir==5) direction.downleft();
                    if(direction.randDir==6) direction.left();
                    if(direction.randDir==7) direction.leftup();   
            }      
     
            function createButtons(){
                   
                    var enabled=GM_getValue('move_enabled',false);
                   
                    var btn=document.createElement('input');
                    btn.value='Auto-move Enabled';
                    btn.id='DAFDS';
                    btn.type='button';
                    btn.style.cssText='position:fixed;top:5px;left:5px;';
                    if(!enabled) btn.value='Auto-move Disabled';
                   
                    btn.addEventListener('click', function (e) {
                            var isenabled=GM_getValue('move_enabled',false);
                            if(!isenabled){
                                    doEnableMove();
                            }else{
                                    doDisableMove();
                            }
                   
                    },false);
                   
                    document.body.appendChild(btn);
                    if(enabled)doEnableMove();
                   
                    enabled=GM_getValue('battle_enabled',false)
                    btn=document.createElement('input');
                    btn.value='Auto-battle Enabled'
                    btn.id='DDDDERE'
                    btn.type='button';
                    btn.style.cssText='position:fixed;top:35px;left:5px;';
                    if(!enabled) btn.value='Auto-battle Disabled';
                   
                    btn.addEventListener('click', function (e) {
                            var isenabled=GM_getValue('battle_enabled',false);
                            if(!isenabled){
                                    doEnableBattle();                              
                            }else{
                                    doDisableBattle();
                            }
                   
                    },false);              
                    document.body.appendChild(btn);
            }
           
            function sessionTimeout(){
                    clearTimeout(timeOuts.battleButton);
                    clearTimeout(timeOuts.moveAround);
                    clearTimeout(timeOuts.session);
                    if(dlh.indexOf('wildbattle.php')!=-1) return(false);
                    timeOuts.session=setTimeout(sessionTimeout,10000);
                    if(dlh.indexOf('wildbattle.php')==-1) timeOuts.battleButton=setTimeout(findBattleBTN,75);
            }
           
     
            function doDisableBattle(){
                    GM_setValue('battle_enabled',false);
                    $('#DDDDERE').attr('value','Auto-battle Disabled')
                    clearTimeout(timeOuts.battleLoop);
            }
     
            function doEnableBattle(){
                    GM_setValue('battle_enabled',true);
                    $('#DDDDERE').attr('value','Auto-battle Enabled')
                    if(dlh.indexOf('wildbattle')!=-1){
                            timeOuts.battleLoop=setTimeout(doBattleLoop,rndFrom(1000,1250))
                    }
            }
           
           
            function doDisableMove(){
                    GM_setValue('move_enabled',false);
                    clearTimeout(timeOuts.battleButton);
                    clearTimeout(timeOuts.moveAround);
                    clearTimeout(timeOuts.session);
                    $('#DAFDS').attr('value','Auto-move Disabled')
            }      
           
            function doEnableMove(){
                    StartTime=Date.now()
                    //sessionTimeout();
                   
                    GM_setValue('move_enabled',true);
                    $('#DAFDS').attr('value','Auto-move Enabled')
                    if(dlh.indexOf('wildbattle.php')==-1) timeOuts.battleButton=setTimeout(findBattleBTN,75);
            }      
           
            function rndFrom(from,to){
                    return Math.floor(Math.random()*(to-from+1)+from);
            }
           
            function newMap(){
     
                    var map=dlh.split('=');
                    map=map[1];
                   
                    var nmap=rndFrom(1,25)
                    while (nmap==map)       {
                            nmap=rndFrom(1,25)
                    }
                   
                    setTimeout(function(){
                            document.location.href='http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+nmap;
                    },2000);
            }
           
        function ctime(d) {
            if (d==0) return ('Not Set');
            var time=new Date(d);
            var hr=time.getHours();
            var min=time.getMinutes();
            var sec=time.getSeconds();
            var mon=time.getMonth()+1;
            var day=time.getDate();
            var msec=time.getMilliseconds();
            var ampm=' PM ';
            if (hr < 12) {
                ampm=' AM ';
            }
            if (hr > 12) {
                hr -=12;
            }
            if (hr==0) {
                hr=12;
            }
            if (hr < 10) {
                hr=' '+hr;
            }
            if (min < 10) {
                min='0'+min;
            }
            if (sec < 10) {
                sec='0'+sec;
            }
            var ct=mon+'/'+day+' '+hr+':'+min+':'+sec+ampm;
            if (ct.indexOf('NaN')!=-1) ct=d;
            return (ct)
        }
           
            function getServerName(){
                    var urlParms=document.location.href.toString().split('.');             
                    var server=urlParms[0].replace('http://','');
                    return(server);
            }
     
            function pexist(n){
                    if(PokemonList==null) return(false);
                    for(var i=0;i<PokemonList.length;i++){
                            if(PokemonList[i].n==n){
                                    GM_log("Pokemon - " +n+ " Exists!")
                                    return(true);
                            }
                    }
                    GM_log("Pokemon - " +n+ " Does Not Exists!")
                    return(false);
            }      
           
            function iwindowOpen(){
                    return;
                    var win=window.open('http://'+getServerName()+'.pokemon-vortex.com/map.php?map='+rndFrom(1,25));
                    $('div#scrollContent').html('<b>Leave this window open, <br>it administrates the session timeout and window loading errors of the new window</b>'.toUpperCase());
                    windowsessionTimeout();
                    return(false);
            }
           
    })();