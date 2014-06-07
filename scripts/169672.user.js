// ==UserScript==
// @name        TW map alpha
// @namespace   TribalWars map by MikroMann.no
// @description Some good map functions
// @updateURL      https://userscripts.org/scripts/source/169672.meta.js
// @downloadURL    https://userscripts.org/scripts/source/169672.user.js
// @include     http*://*.tribalwars.no.com/*
// @version     0.3.3
// @grant       none
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

version = '0.3.3';
$ = win.jQuery;

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

game_data = win.game_data;
image_base = win.image_base;

var mundo = game_data.world;
var market = game_data.market;
var csrf = game_data.csrf;

if (game_data.player.premium == false) {

    var TWMap_size=getCookie("TWMap_size");
    var TWMiniMap_size=getCookie("TWMiniMap_size");
    
    if (TWMap_size==null || TWMap_size==""){
        setCookie("TWMap_size",10,365*99);
    }
    if (TWMiniMap_size==null || TWMiniMap_size==""){
        setCookie("TWMiniMap_size",50,365*99);
    }

    if (location.href.indexOf('map') > location.href.indexOf('screen=')) {
		window.location = 'javascript:TWMap.resize('+TWMap_size+')';
		window.location = 'javascript:TWMap.resizeMinimap('+TWMiniMap_size+')';
		
		var ConfigDIV = $('#map_config');
		if (ConfigDIV != null) {
	       ConfigDIV.append('<br><table class="vis" width="100%"><tbody><tr><th colspan="2">Endre størrelse på kart</th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">Kart:</td><td><select id="map_chooser_select" onchange="TWMap.resize(parseInt($(\'#map_chooser_select\').val()), true); TWMap.notifySavedChanges()"><option id="current-map-size" value="7x7" style="display:none;">7x7</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="11">11x11</option><option value="13" selected="selected">13x13</option><option value="15">15x15</option><option value="20">20x20</option><option value="30">30x30</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">Mini kart:</td><td colspan="2"><select id="minimap_chooser_select" onchange="TWMap.resizeMinimap(parseInt($(\'#minimap_chooser_select\').val()), true); TWMap.notifySavedChanges()"><option id="current-minimap-size" value="50x50" style="display:none;">50x50</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option><option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90">90x90</option><option value="100">100x100</option><option value="110">110x110</option><option value="120" selected="selected">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr></tbody></table>');
		}
		$('#map_chooser_select').change(function () {
		  setCookie("TWMap_size",$(this).val(),365*99);  
	    });
	    $('#minimap_chooser_select').change(function () {
		  setCookie("TWMiniMap_size",$(this).val(),365*99);  
	    });
	    
	    setWarIcons();
	    
	}
	if (location.href.indexOf('confirm') > location.href.indexOf('try=')) {
	   var goal = $('.village_anchor').attr('data-id');
	   /*var arrival = $('#date_arrival').html().split(" ").pop();*/
	   var timeToWar;
	   var CommandTime = new Date()
	   var TimeStart = Math.round(CommandTime.getTime()/1000);
	   
	   $('table').find('td:contains("Varighet:")').each(function(){
            timeToWar = $(this).siblings('td').text();
        });
	   
        $('form').submit(function() {
            SaveRoute(goal, timeToWar, TimeStart);
        });
	}
}
var menyDIV = $('#menu_row2');
menyDIV.append("<td class='firstcell box-item'><a href='http://no14.tribalwars.no.com/game.php?id=672&screen=info_ally'><span class='icon header no_new_post'></span> Kontinent 53</a> | <a href='http://no14.tribalwars.no.com/game.php?mode=forum&screen=ally'>Til forum</a></td>");


/*Functions*/
function setWarIcons(){
    var MyWars=getCookie("CityAction");
    console.log(MyWars);
    if (MyWars != null || MyWars != ''){
        
        var CityArray = createArray(MyWars);

        var IkonToWar = 'http://cdn2.tribalwars.net/graphic/command/attack.png';
        var IkonFromWar = 'http://cdn2.tribalwars.net/graphic/command/return.png';

        $('#map').one('mousemove', function(){
            
            var count = CityArray.length;
            for( var i = 0; i < count; i++ ) {

                var imgIKON, run=1;
                var Time = new Date();
                var TimeNow = Math.round(Time.getTime()/1000);
                var WarTime = CityArray[i]['timeToWar'];
                var startTime = CityArray[i]['TimeStart'];
                
                
                 
                if(TimeNow<(parseInt(WarTime)+parseInt(startTime))){
                    imgIKON = IkonToWar;
                }
                else if(TimeNow<((2*parseInt(WarTime))+parseInt(startTime))){
                    imgIKON = IkonFromWar;
                }      
                else{
                    Delete(i, CityArray);
                    run = 0;
                 }
                 
                if(run == 1){
                
                var imgID = $('#map_village_'+CityArray[i]['City']);
               
                var bg = $(this).find(imgID).attr('src');
                var css = $(this).find(imgID).attr('style');
                

                $(this).find(imgID).attr('style', 'position: absolute; right: 5px; top:2px; background-color:#FFF; padding:2px;');
                $(this).find(imgID).attr('src', imgIKON).wrap('<div id="'+CityArray[i]['City']+'" style="'+css+'; background-image:url('+bg+'); height:38px; width:58px; " />');
                }
            } 
        });
        $('#map').on('mouseup', function(){
            var count = CityArray.length;
                for( var i = 0; i < count; i++ ) {
                    
                    
                    if(!$(this).find('#'+CityArray[i]['City']).attr('id')){

                        var imgIKON, run=1;
                        var Time = new Date();
                        var TimeNow = Math.round(Time.getTime()/1000);
                        var WarTime = CityArray[i]['timeToWar'];
                        var startTime = CityArray[i]['TimeStart'];
                        
                        
                         
                        if(TimeNow<(parseInt(WarTime)+parseInt(startTime))){
                            imgIKON = IkonToWar;
                        }
                        else if(TimeNow<((2*parseInt(WarTime))+parseInt(startTime))){
                            imgIKON = IkonFromWar;
                        }      
                        else{
                            Delete(i, CityArray);
                            run = 0;
                         }

                        if(run == 1){
                        var imgID = $('#map_village_'+CityArray[i]['City']);
                       
                        var bg = $(this).find(imgID).attr('src');
                        var css = $(this).find(imgID).attr('style');
                        
                        $(this).find(imgID).attr('style', 'position: absolute; right: 5px; top:2px; background-color:#FFF; padding:2px;');
                        $(this).find(imgID).attr('src', imgIKON).wrap('<div id="'+CityArray[i]['City']+'" style="'+css+'; background-image:url('+bg+'); height:38px; width:58px; " />');
                        }  
                    }
                } 
        });
    }  
}

function Delete(nr, array){

    //array.splice( $.inArray(nr, array), 1 );
    var index= $.inArray(nr, array);
    array.splice(index,1);
    //delete array[''+nr+''];
    var count = array.length;
    var MyWars;
    
    if(count == 1){
        setCookie("CityAction",'',-1);
    }
    else {
    
        for( var i = 0; i < count; i++ ) {
            
            //SaveRoute(array[i]['City'], array[i]['timeToWar'], array[i]['TimeStart']);
            var city = '(City:'+array[i]['City']+',timeToWar:'+array[i]['timeToWar']+',TimeStart:'+ array[i]['TimeStart']+')';
            
            if (MyWars ==null || MyWars ==""){       
                MyWars = city;
            }
            else {
                MyWars = MyWars+'-'+city;
        }
        setCookie("CityAction",MyWars,365*99);
             
        }
    }
    
}

function createArray(MyWars){
    var CityData = MyWars.split("-");
    
    var CityDataArray = [];
    $.each(CityData, function(index, item) {
        var InnerArray = [];
        var data = item.replace(/[\(\)]/g, '').split(',');
        $.each(data, function(index, item) {
            var intoArray = item.split(':');
            InnerArray[intoArray[0]] = intoArray[1];
        });
        CityDataArray.push(InnerArray);
    });

    return  CityDataArray;
}
function  SaveRoute(goal, timeToWar, CommandTime){
   
    //TimeStart = clock(CommandTime);
    var TimeToWar = convertToSeconds(timeToWar);
    
    //console.log(TimeStart+' '+TimeToWar);
    /*
    var TimeToSplitt = timeToWar.split(":");
    var TimeAddSplitt = TimeStart.split(":");
    var TimeAtack = addTimeTogheter(TimeToSplitt, TimeAddSplitt);
    */
    
    var city = '(City:'+goal+',timeToWar:'+TimeToWar+',TimeStart:'+TimeStart+')';
    //console.log(city);
 
    var MyWars=getCookie("CityAction");
    if (MyWars ==null || MyWars ==""){       
        MyWars = city;
    }
    else {
        MyWars = MyWars+'-'+city;
    }
    setCookie("CityAction",MyWars,365*99);
}
function convertToSeconds(time){
    var converting = time.split(":")
    var HoursToSec = converting[0]*60*60;
    var MinutesToSec = converting[1]*60;
    var TotSeconds = parseInt(HoursToSec)+parseInt(MinutesToSec)+parseInt(converting[2]);
    return TotSeconds;  
} 
/*
function addTimeTogheter(TimeOne, TimeTwo){
    var seconds = TimeOne[2]+TimeTwo[2];
    var AddToMinutes = Math.floor(seconds/60);  
    var seconds = seconds % 60;
    
    var minutes = TimeOne[1]+TimeTwo[1]+AddToMinutes;
    var AddToHours = Math.floor(minutes/60); 
    var minutes = minutes % 60;
    
    var Hours = TimeOne[0]+TimeTwo[0]+AddToHours;
    
    var timeWar = Hours+':'+minutes+':'+seconds;
    return timeWar;
}  
function clock(date) {
   	//var outStr = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();
	var dformat =[
					date.getHours(),
              		date.getMinutes().padLeft(),
               		date.getSeconds().padLeft()
				].join(':');
   	return dformat;
} 
Number.prototype.padLeft = function(base,chr){
    var  len = (String(base || 10).length - String(this).length)+1;
    return len > 0? new Array(len).join(chr || '0')+this : this;
}
*/
function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name){
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++){
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name){
            return unescape(y);
        }
    }
}