// ==UserScript==
// @name       TransportAll by Kazz
// @namespace  http://yhm.tak.tak.pl/
// @version    1.4
// @description  Transport all resources to one destination (works only with cogame / antigame ) ver. 4.0.0
// @include    http://*.ogame.*/*
// @copyright  2012+, Kazz
// ==/UserScript==


if(GM_getValue("t_lastplanet",null)==null) {GM_setValue("t_lastplanet","-1");}
if(GM_getValue("t_destination",null)==null) {GM_setValue("t_destination","-1");}

        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++) {
            console.log("Klucz w pamieci: ["+ i +"] "+ key + " = " + GM_getValue(key, null));
        }

var transfer = {

    planets:new Array(),
    planetsdone:new Array(),
    createselectbox: function(disp){
        var all_planets = (document.getElementById('myPlanets')==undefined?document.getElementById('myWorlds'):document.getElementById('myPlanets')); 
        var pbox = all_planets.getElementsByClassName('smallplanet');
        var disp_change = disp;
        var x = 0;
        var z = 0;
        for(x in pbox)
        {

            if(isNaN(x)) continue;
                
            if(pbox[x].getElementsByClassName('planet-name')[0].innerHTML != undefined)
            {
            var moon = undefined;
            var moon_name = undefined;
            var planet_name = pbox[x].getElementsByClassName('planet-name')[0].innerHTML;
            //console.log('PLANET : '+planet_name);
            var planet_koords = pbox[x].getElementsByClassName('planet-koords')[0].innerHTML;
            moon = pbox[x].getElementsByClassName('moonlink');
            
            if(moon[0] != undefined)
            {
                var moon_str = moon[0].title;
                moon_str.replace("|","");
                var rex = new RegExp("\\S+[ ]{1}\\S+[ ]{1}([\\S+ ]*)\<\/B\>", "i");
                var moon_split = rex.exec(moon_str);
                //console.log('MOON : '+moon_split[1]);
                moon_name = moon_split[1];
                var mbox = document.createElement('div');
                mbox.className='temp_planet';
                mbox.style.display=disp_change;
                mbox.style.position='absolute';
                mbox.style.width='100%';
                mbox.style.height='50%';
                mbox.style.bottom='0px';
                mbox.style.left='0px';
                mbox.style.backgroundColor='blue';
                mbox.style.textalign='center';
                
            }
            var patt1=new RegExp("([0-9]{1}):([0-9]{1,3}):([0-9]{1,2})");
            var koords_split = patt1.exec(planet_koords);
            var planet_koords = koords_split[1]+'#'+koords_split[2]+'#'+koords_split[3];
            var nbox = document.createElement('div');
            nbox.className='temp_planet';
            nbox.style.display=disp_change;
            nbox.style.position='absolute';
            nbox.style.width='100%';
            nbox.style.height='100%';
            nbox.style.top='0px';
            nbox.style.left='0px';
            nbox.style.backgroundColor='red';
            nbox.style.textalign='center';
            nbox.innerHTML= planet_koords+'#1#'+planet_name;
            
            
            nbox.onclick=function(){transfer.selectdestination(this.innerHTML);};
            pbox[x].appendChild(nbox);
            if( moon_name != undefined && moon_name != null)  
            {
                mbox.innerHTML = planet_koords+'#3#'+moon_name;
                mbox.onclick=function(){transfer.selectdestination(this.innerHTML);};
                pbox[x].appendChild(mbox);
            }
        }
        }
    },
    
    sleep: function (milliseconds) {
              var start = new Date().getTime();
              for (var i = 0; i < 1e7; i++) {
                if ((new Date().getTime() - start) > milliseconds){
                  break;
                }
              }
            },
    
    selectdestination: function(dest) {
        var destination = dest;
        GM_setValue("t_destination",destination);
        console.log('NEW DESTINATION: '+destination);
        transfer.change_createselectbox('none');

    },
    
    createbutton: function(){
        var menu = document.getElementById('menuTable');
        var mt = document.createElement('li');
        var it = document.createElement('span');
        var at = document.createElement('a');
        var sat = document.createElement('span');
        var ico = document.createElement('a');
        ico.innerHTML = '(R)';
        ico.setAttribute('style','width:24px; height:24px; font-size: 12px; background-color:black; color: rgb(52, 55, 57);');
        ico.setAttribute('href','javascript:void(0);');
        ico.onclick=function(){transfer.reset();transfer.change_createselectbox('block');};
        ico.setAttribute('title','Reset script!');
        ico.setAttribute('accesskey',null);
        it.className = 'menu_icon';
        sat.className = 'textlabel';
        sat.innerHTML = 'Transfer All';
       
        at.setAttribute('href','javascript:void(0);');
        at.setAttribute('accesskey',null);
        at.onclick=function(){transfer.getplanetsdiv();transfer.changeplanet();};
        at.className = 'menubutton ';
        
        it.appendChild(ico);
        at.appendChild(sat);
        mt.appendChild(it);
        mt.appendChild(at);
        menu.appendChild(mt);
    },

    change_createselectbox: function (disp)
    {
        var change_display = disp;
        var boxy = document.getElementsByClassName('temp_planet');
        var x = 0;
        for(x in boxy)
        {
            if(isNaN(x)) continue;
                boxy[x].style.display = change_display;
        }
    },
    
    getplanetsdiv: function(){
        var all_planets = (document.getElementById('myPlanets')==undefined?document.getElementById('myWorlds'):document.getElementById('myPlanets')); 
        var pdivs = all_planets.getElementsByClassName('smallplanet');
        var x = 0;
        var z = 0;
        for(x in pdivs)
        {
            if(pdivs[x].innerHTML != undefined) 
            {
                console.log(pdivs[x].getElementsByClassName('temp_planet')[0].innerHTML);
                if(pdivs[x].getElementsByClassName('temp_planet')[0].innerHTML == GM_getValue("t_destination",null))
                {
                    this.planets[z] = null;
                }else{
                    this.planets[z] = pdivs[x].childNodes[1];
                }
            }
            z++;
        }
    },
    
    changeplanet: function(){
        
        var xx = 0;
        var z = GM_getValue("t_lastplanet",null);
        console.log("LAST PLANET: "+z);
        for(xx=0;xx<this.planets.length;xx++)
        {
            console.log("LAST PLANET: "+z+" | NEXT : "+xx);
            if(xx>z){
                if(this.planets[xx] == null) 
                {
                    console.log("THIS IS DESTINATION! NEXT!");
                    continue;   
                }
                 
                this.setlastplanet(xx);
                GM_setValue("t_selected_planet",xx);
                setTimeout(function(){transfer.planetclick(transfer.planets[xx])},3123);
                break;
            }else if((this.planets.length)==xx){
                console.log("ALL DONE - STOP!");
                this.setlastplanet('-1');
                GM_setValue("t_selected_planet",-1);
                setTimeout(function(){transfer.planetclick(transfer.planets[0])},3312);
            }
            else{ continue; }
        }
    },
    
    setlastplanet: function(wart){
        var nowy = wart;
        console.log("Nastepna planeta: "+nowy);
        GM_setValue("t_lastplanet",nowy);
    },
    
    planetclick: function(obj) {
        
        var target=obj;
        if(document.dispatchEvent) { // W3C
            var oEvent = document.createEvent( "MouseEvents" );
            oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
            target.dispatchEvent( oEvent );
        }
        else if(document.fireEvent) { // IE
            target.fireEvent("onclick");
        }    
    },
    selectFleet: function(){
        
        
        GM_setValue("t_selected_planet",-1);
        GM_setValue("t_selected_fleet1",1);
        
        if(window.location.href.indexOf("fleet1")!=-1){
                setTimeout(function(){transfer.fleetstepone();},3155);
        }else{
                var fleet = document.getElementById('menuTable').getElementsByTagName('li')[7].getElementsByClassName('menubutton')[0];
                setTimeout(function(){transfer.planetclick(fleet);},3321);
        }
    },
    fleetstepone: function(){
        GM_setValue("t_selected_fleet1",0);
        GM_setValue("t_selected_fleet2",1);
        setTimeout(function(){
        var buttony = document.getElementById('buttonz');
        var calc = document.getElementById('calc_ships');
        if(calc !== undefined && calc !== null) {
            console.log("ANTIGAME FOUND!");
            var get_dt = calc.getElementsByTagName('a')[1];
            setTimeout(function(){transfer.planetclick(get_dt);},2133);
            setTimeout(function(){transfer.planetclick(document.getElementById('continue'));},2933);
        }else if(buttony !== undefined && buttony !== null && buttony.getElementsByClassName('send_all')[2] !== undefined) 
        {
            console.log("COGAME FOUND!");
            var divall = buttony.getElementsByClassName('send_all')[0].getElementsByTagName('a')[0];
            setTimeout(function(){transfer.planetclick(divall);},3133);
        
        }else{
            GM_setValue("t_change_planet",1);
            GM_setValue("t_selected_fleet2",0);
            setTimeout(function(){transfer.fleetgonext();},2456); 
        }
        },1000);
    },
    fleetsteptwo: function(){
        GM_setValue("t_selected_fleet2",0);
        GM_setValue("t_selected_fleet3",1);
        var cel = GM_getValue("t_destination");
        var lo = document.getElementById('slbox');
        for(var x = 0; x < lo.length; x++)
        {
            if(lo.options[x].value == cel)
            {
                lo.options[x].selected = true;   
                lo.onchange();
            }
        }
        setTimeout(function(){transfer.planetclick(document.getElementById('continue'));},4199);
    },
    fleetsteplast: function(){
        GM_setValue("t_selected_fleet3",0);
        GM_setValue("t_change_planet",1);
        setTimeout(function(){transfer.planetclick(document.getElementById('allresources'));},2511);
        setTimeout(function(){transfer.planetclick(document.getElementById('missionButton3'));},3533);
        setTimeout(function(){transfer.planetclick(document.getElementById('start'));},4431);
    },
    fleetgonext: function(){
        GM_setValue("t_change_planet",0);
        transfer.getplanetsdiv();
        transfer.changeplanet();
    },
    reset: function(){
        
        GM_setValue("t_lastplanet",-1);
        GM_deleteValue("t_change_planet");
        GM_deleteValue("t_selected_planet");
        GM_deleteValue("t_selected_fleet1");
        GM_deleteValue("t_selected_fleet2");
        GM_deleteValue("t_selected_fleet3");
        var keys = GM_listValues();
        for (var i=0, key=null; key=keys[i]; i++) {
            console.log("Klucz w pamieci: ["+ i +"] "+ key + " = " + GM_getValue(key, null));
        }
        console.log("TransportALL: RESET COMPLETE :)");
    }
}

transfer.createselectbox('none');
transfer.createbutton();

if(GM_getValue("t_change_planet")!==undefined   && GM_getValue("t_change_planet")==1)   transfer.fleetgonext();
if(GM_getValue("t_selected_fleet3")!==undefined && GM_getValue("t_selected_fleet3")==1) transfer.fleetsteplast();
if(GM_getValue("t_selected_fleet2")!==undefined && GM_getValue("t_selected_fleet2")==1) transfer.fleetsteptwo();
if(GM_getValue("t_selected_fleet1")!==undefined && GM_getValue("t_selected_fleet1")==1) transfer.fleetstepone();
if(GM_getValue("t_selected_planet")!==undefined && GM_getValue("t_selected_planet")>=0) transfer.selectFleet();
