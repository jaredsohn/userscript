var scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           Travian T4 tools
// @namespace      timer
// @description    Extra Tools for travian version 4 (T4)
// @author         hotzu
// @version        1.04.03
// @lastchanges    Elephant finder shows animal numbers, coordinates are links, bug fix on spy send, you can save and load data for the elephant scanner, the neighbour reports now not autorefresh
// @include        http://ts*.travian.*/*
// @include        http://ts*.travian.*.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

GM_registerMenuCommand("Travian T4 Tools Settings",showSet);
var StyleSheet=['base','black-tie','blitzer','cupertino','dark-hive','dot-luv','eggplant','excite-bike','flick','hot-sneaks','humanity','le-frog','mint-choc','overcast','pepper-grinder','redmond','smoothness','south-street','start','sunny','swanky-purse','trontastic','ui-darkness','ui-lightness','vader'];

GM_addStyle('@import "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/'+StyleSheet[parseInt(getCookie("Used_Style_Sheet","18"))]+'/jquery-ui.css";');
GM_addStyle('.dialogFixed {position: absolute !important;} .dialogFixed table tbody tr td,.dialogFixed table tbody tr,.dialogFixed table tbody,.dialogFixed table,.dialogFixed table tbody td{background:inherit !important;padding:0px;font:1em;} ');

var SettingsButtonImageLink='http://icons.iconarchive.com/icons/aha-soft/blue/48/configuration-icon.png';
var SettingsFrameBackgroundColor='#5c9ccc';
var SettingsFrameTextColor='#FFF';

var lang=(document.location.href.split('/')[2].split('.')[3])?document.location.href.split('/')[2].split('.')[3]:document.location.href.split('/')[2].split('.')[2];
var texts=Array();

//var texts
//var availableTags = [];
//Settings
/**
 * Set a coockie value
 */
function setCookie(c_name,value)
{
var expiredays=365;
var exdate=new Date();

exdate.setDate(exdate.getDate()+expiredays);
document.cookie=c_name+ "=" +escape(value)+
((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

/**
 * Get a coockie value
 */
function getCookie(c_name,def)
{
if (document.cookie.length>0)
  {
  c_start=document.cookie.indexOf(c_name + "=");
  if (c_start!=-1)
    {
    c_start=c_start + c_name.length+1;
    c_end=document.cookie.indexOf(";",c_start);
    if (c_end==-1) c_end=document.cookie.length;
    return unescape(document.cookie.substring(c_start,c_end));
    }
  }
return def;
}
/**
 * Save local data
*/
function save(variable_name,variable_value)
{
    vn='http://'+document.location.href.split('/')[2]+":"+variable_name;
    GM_setValue(vn,escape(variable_value));
}
/** 
 *Load local data
 */
function load(variable_name,variable_value)
{
    vn='http://'+document.location.href.split('/')[2]+":"+variable_name;
    return unescape(GM_getValue(vn, variable_value));
}

/**
 * Save settings button action
 */
function saveSet(){
    setCookie("Used_Style_Sheet",$('#style_sheet').val());
    setCookie("timer_interv",$('#timer_interv').val());
    setCookie("timer_offset",$('#timer_offset').val());
    setCookie("CropFinder",$('#CropFinder').val());
    setCookie("ElephantFinder",$('#ElephantFinder').val());
    setCookie("Warehouse",$('#warehouse_stat').val());
    setCookie("VillageLinks",$('#villagelinks').val());
    setCookie("NeighbourReports",$('#NReports').val())
    $('#Settings_div').remove();
}

/**
 * Settings window cancel button action
 */
function cancelSet(){
    $('#Settings_div').remove();
}

function genOptions(arr,sel)
{
    var str='';
    for (i in arr)
    {
        str+='<option value="'+i+'" '+((sel==i)?'selected':'')+'>'+arr[i]+'</option>';
    }
    return str;
}
/**
 * Show the settings div
 */
function showSet()
{
    var s='';
    var str = document.createElement('div');
    str.setAttribute('id', 'Settings_div');
    str.setAttribute('align', 'center');
    str.setAttribute('style', 'position: absolute;border: 1px solid #5c9ccc;padding: 5px;background-color: '+SettingsFrameBackgroundColor+';color: '+SettingsFrameTextColor+';opacity: 0.95;-webkit-border-radius: 5px;-moz-border-radius: 5px;width: 600px;height: 600px;text-align: center;z-index: 100000;top:'+((window.innerHeight/2)-(600/2))+'px;left:'+((window.innerWidth/2)-(600/2))+'px;color:#000;');
    tab=document.createElement('table');
    tab.setAttribute('style','background:none;');
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+texts[6]+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[7]+'</td><td style="background:none;"><select id="style_sheet">'+genOptions(StyleSheet,parseInt(getCookie("Used_Style_Sheet","18")))+'</select></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+texts[0]+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[1]+'</td><td style="background:none;"><input type="text" id="timer_interv" value="'+getCookie("timer_interv","500")+'" /></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[2]+'</td><td style="background:none;"><input type="text" id="timer_offset" value="'+getCookie("timer_offset","1")+'" /></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+texts[3]+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[4]+'</td><td style="background:none;"><select id="CropFinder"><option value="0" '+((parseInt(getCookie("CropFinder","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("CropFinder","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[10]+'</td><td style="background:none;"><select id="ElephantFinder"><option value="0" '+((parseInt(getCookie("ElephantFinder","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ElephantFinder","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[13]+'</td><td style="background:none;"><select id="warehouse_stat"><option value="0" '+((parseInt(getCookie("Warehouse","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("Warehouse","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[14]+'</td><td style="background:none;"><select id="villagelinks"><option value="0" '+((parseInt(getCookie("VillageLinks","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("VillageLinks","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+texts[8]+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+texts[9]+'</td><td style="background:none;"><select id="NReports"><option value="0" '+((parseInt(getCookie("NeighbourReports","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("NeighbourReports","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td colspan="2" style="background:none;"><center><input type="button" id="save_set_but" value="Save"/> <input type="button" id="cancel_set_but" value="Cancel"/></center></td></tr>';
    
    
    tab.innerHTML=s;
    str.appendChild(tab);
    document.getElementsByTagName('body')[0].appendChild(str);
    
    document.getElementById('save_set_but').addEventListener('click',saveSet,true);
    document.getElementById('cancel_set_but').addEventListener('click',cancelSet,true);    
    return str;
}

//settings done

/**
 *add settings button to the menu
*/
function SetBut()
{
    if($('#logoutContainer'))
    {
        var im=document.createElement('img');
        im.setAttribute('src', SettingsButtonImageLink);
        im.setAttribute('title', 'T4 Script settings by hotzu');
        im.setAttribute('style', 'border:none;height: 24px;position: absolute;right: 42px;top: 0;width: 24px;z-index: 1;');
        im.addEventListener('click',showSet,true);
        $('#logoutContainer').append(im);
    }
}

jQuery.fn.extend({
	everyTime: function(interval, label, fn, times) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, times);
		});
	},
	oneTime: function(interval, label, fn) {
		return this.each(function() {
			jQuery.timer.add(this, interval, label, fn, 1);
		});
	},
	stopTime: function(label, fn) {
		return this.each(function() {
			jQuery.timer.remove(this, label, fn);
		});
	}
});

jQuery.extend({
	timer: {
		global: [],
		guid: 1,
		dataKey: "jQuery.timer",
		regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
		powers: {
			// Yeah this is major overkill...
			'ms': 1,
			'cs': 10,
			'ds': 100,
			's': 1000,
			'das': 10000,
			'hs': 100000,
			'ks': 1000000
		},
		timeParse: function(value) {
			if (value == undefined || value == null)
				return null;
			var result = this.regex.exec(jQuery.trim(value.toString()));
			if (result[2]) {
				var num = parseFloat(result[1]);
				var mult = this.powers[result[2]] || 1;
				return num * mult;
			} else {
				return value;
			}
		},
		add: function(element, interval, label, fn, times) {
			var counter = 0;
			
			if (jQuery.isFunction(label)) {
				if (!times) 
					times = fn;
				fn = label;
				label = interval;
			}
			
			interval = jQuery.timer.timeParse(interval);

			if (typeof interval != 'number' || isNaN(interval) || interval < 0)
				return;

			if (typeof times != 'number' || isNaN(times) || times < 0) 
				times = 0;
			
			times = times || 0;
			
			var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});
			
			if (!timers[label])
				timers[label] = {};
			
			fn.timerID = fn.timerID || this.guid++;
			
			var handler = function() {
				if ((++counter > times && times !== 0) || fn.call(element, counter) === false)
					jQuery.timer.remove(element, label, fn);
			};
			
			handler.timerID = fn.timerID;
			
			if (!timers[label][fn.timerID])
				timers[label][fn.timerID] = window.setInterval(handler,interval);
			
			this.global.push( element );
			
		},
		remove: function(element, label, fn) {
			var timers = jQuery.data(element, this.dataKey), ret;
			
			if ( timers ) {
				
				if (!label) {
					for ( label in timers )
						this.remove(element, label, fn);
				} else if ( timers[label] ) {
					if ( fn ) {
						if ( fn.timerID ) {
							window.clearInterval(timers[label][fn.timerID]);
							delete timers[label][fn.timerID];
						}
					} else {
						for ( var fn in timers[label] ) {
							window.clearInterval(timers[label][fn]);
							delete timers[label][fn];
						}
					}
					
					for ( ret in timers[label] ) break;
					if ( !ret ) {
						ret = null;
						delete timers[label];
					}
				}
				
				for ( ret in timers ) break;
				if ( !ret ) 
					jQuery.removeData(element, this.dataKey);
			}
		}
	}
});

jQuery(window).bind("unload", function() {
	jQuery.each(jQuery.timer.global, function(index, item) {
		jQuery.timer.remove(item);
	});
});

$.fn.column = function(i) {
    return $('tr td:nth-child('+(i+1)+')', this);
}

function getErkezesiIdo()
{
    return $('#tp2').html();name
}

function makeTimerFields()
{
    eh=parseInt(getErkezesiIdo().split(':')[0]);
    em=parseInt(getErkezesiIdo().split(':')[1]);
    es=parseInt(getErkezesiIdo().split(':')[2]);
    
    var sor='<tbody class="infos"><tr><td id="ido">'+texts[0]+'</td><td align="right" colspan="'+$('.at').parent().attr('colspan')+'">';
    sor+=texts[5]+': ';
    sor+='<select id="h">';
    for(i=0;i<24;i++)
        sor+='<option value="'+i+'" '+(i==eh?'selected':'')+'>'+((i<10)?('0'+i):i)+'</option>';
    sor+='</select>:';
    sor+='<select id="m">';
    for(i=0;i<60;i++)
        sor+='<option value="'+i+'" '+(i==em?'selected':'')+'>'+((i<10)?('0'+i):i)+'</option>';
    sor+='</select>:';
    sor+='<select id="s">';
    for(i=0;i<60;i++)
        sor+='<option value="'+i+'" '+(i==es?'selected':'')+'>'+((i<10)?('0'+i):i)+'</option>';
    sor+='</select>&nbsp;';
    sor+='<input type="button" value="Start" id="start_ti"/>&nbsp;<input type="button" value="Stop" id="stop_ti" disabled/>';
    sor+='</td>';
    return sor;
}

function idozito_init(){
    var what = $('.troop_details .units tr:eq(1)');	//Get troops table
    
    var catapults = $('.troop_details .cata tr');	//Get catapults form
    //Replace table content with inputs
    $(what).addClass('attack');
    $(catapults).addClass('catas');
    $('td',what).each(function(index){
            $(this).html('<input type="text" maxlength="6" value="'+$(this).text()+'" class="text temp">');
    });

    //Add controll buttons
    $('#btn_ok').remove();	//Remove old button
    $('form').submit(function(){return false;}).append('<p class="btn"><input type="button" alt="less" id="btn_back1" value="<<< Less" /> <input type="button" alt="More" id="btn_forward1" value="More >>" /></p><p class="btn"><input type="button" alt="OK" id="btn_ok1" value="Send" /></p>');

        
function createCropDivContent()
{
    var s='Scanned <span id="crop_done">0</span> from <span id="crop_tot">0</span><br/>';
    s+='X:<input type="text" id="crop_x" maxsize="4" size="4" value="0"/>&nbsp;Y:<input type="text" id="crop_y" maxsize="4" size="4" value="0"/>&nbsp;R:<input type="text" id="rad" maxsize="4" size="4" value="10"/><br/><table id="crop_fields"></table>';
    return s;
}

function createElephantDivContent()
{
    var s='Scanned <span id="ele_done">0</span> from <span id="ele_tot">0</span><br/>';
    s+='<input type="checkbox" id="croc_check"/>Scan for crocodiles too. <br/>';
    s+='X:<input type="text" id="elep_x" maxsize="4" size="4" value="0"/>&nbsp;Y:<input type="text" id="elep_y" maxsize="4" size="4" value="0"/>&nbsp;R:<input type="text" id="rad_elep" maxsize="4" size="4" value="10"/><br/><table id="elep_fields"></table>';
    return s;
}

function createCropDiv()
{
    if(parseInt(getCookie("CropFinder","1")))
    {
        var div1=document.createElement('div');
        div1.setAttribute('id', 'draggable');
        div1.setAttribute('style', 'position:inherited;height:'+getCookie("Crop_finder_window_height","300")+';width:'+getCookie("Crop_finder_window_width","250")+';');
        div1.innerHTML=createCropDivContent();
        document.getElementsByTagName('body')[0].appendChild(div1);
    }
}

function createElephantDiv()
{
    if(parseInt(getCookie("ElephantFinder","1")))
    {
        var div1=document.createElement('div');
        div1.setAttribute('id', 'draggable3');
        div1.setAttribute('style', 'position:inherited;height:'+getCookie("Elephant_finder_window_height","300")+';width:'+getCookie("Elephant_finder_window_width","250")+';');
        div1.innerHTML=createElephantDivContent();
        document.getElementsByTagName('body')[0].appendChild(div1);
    }
}

function createReportsDiv()
{
    if(parseInt(getCookie("NeighbourReports","1")))
    {
        var div1=document.createElement('div');
        div1.setAttribute('id', 'draggable2');
        div1.setAttribute('style', 'position:inherited;height:'+getCookie("reports_window_height","300")+';width:'+getCookie("reports_window_width","250")+';font:1em;');
        div1.innerHTML='<table id="nreports"></table>';
        document.getElementsByTagName('body')[0].appendChild(div1);
    }
}

function RefreshNeighbourData()
{
    if(parseInt(getCookie("NeighbourReports","1"))){
        var raw="";
        $.get('berichte.php?t=5', function(raw){
            raw=$(raw).find("table").html();
            raw.replace(/\n/g,' ');
            $(raw).find("table td").each(function(){
                if($(this).attr("class")=="dist")
                    $(this).remove();
                $(this).removeClass('sub');
            });
            save("RTable_data",raw);
            $("#nreports").html(raw);
        });
    }
}

/**
 * Function edited, and used from the "Crop Finder T4" : http://userscripts.org/scripts/show/93230
 */
function getMap(x, y) {
    var tserver='http://'
    tserver+=document.location.href.split('/')[2];
    tserver+='/ajax.php';
    //alert('x:'+x+';y:'+y);
	$.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]=1&", function(data) {
                //alert('Kell {k.f1}'+data.data.tiles[49].c+' => '+data.data.tiles[49].t);
		//$(data.data.tiles).each(function(index) {
			if (typeof data.data.tiles[49].c != 'undefined') {
				if (data.data.tiles[49].c.match("{k.f1}")) {
					$('<tr><td>Crop 9</td><td>' + data.data.tiles[49].t + '</td></tr>').appendTo('#crop_fields');
				} else if (data.data.tiles[49].c.match("{k.f6}")) {
 					$('<tr><td>Crop 15</td><td>' + data.data.tiles[49].t + '</td></tr>').appendTo('#crop_fields');
				}	
			}	
                        $('#crop_done').html(parseInt($('#crop_done').html())+1);
		//});  
	});
}

function getElephant(x,y)
{
    var tserver='http://'
    tserver+=document.location.href.split('/')[2];
    var server_link=tserver;
    tserver+='/ajax.php';
            $.ajax({
              url: tserver,
              data: "cmd=viewTileDetails&x="+x+"&y="+y,
              dataType:"html",
              success: function(data){
                           var obj = jQuery.parseJSON(data);
                           data=obj.data.html;
                           if(data.split('u40')[1])
                           {
                               if((data.split('u38')[1])&&($("#croc_check").attr('checked')))
                               {    
                                   tr=$(data).find('img[class="unit u38"]').parent().parent();
                                   num1=parseInt($('.val',tr).html());
                                   tr=$(data).find('img[class="unit u40"]').parent().parent();
                                   num2=parseInt($('.val',tr).html());
                                   $('<tr><td>Elep&Croc</td><td><a href="'+server_link+'/position_details.php?x='+x+'&y='+y+'" target="_blank">('+x+'|'+y+')</a>('+num2+'/'+num1+')</td></tr>').appendTo('#elep_fields');
                               }
                               else
                               {
                                   tr=$(data).find('img[class="unit u40"]').parent().parent();
                                   num=parseInt($('.val',tr).html());
                                   $('<tr><td>Elephants</td><td><a href="'+server_link+'/position_details.php?x='+x+'&y='+y+'" target="_blank">('+x+'|'+y+')</a>('+num+')</td></tr>').appendTo('#elep_fields');
                               }
                           }
                           else
                               if((data.split('u38')[1])&&($("#croc_check").attr('checked')))
                               {
                                   tr=$(data).find('img[class="unit u38"]').parent().parent();
                                   num=parseInt($('.val',tr).html());
                                   $('<tr><td>Crocodile</td><td><a href="'+server_link+'/position_details.php?x='+x+'&y='+y+'" target="_blank">('+x+'|'+y+')</a>('+num+')</td></tr>').appendTo('#elep_fields');
                               }
                            $('#ele_done').html(parseInt($('#ele_done').html())+1);
                        }
            });
}

function SearchCropFields()
{
    $("#crop_fields").empty();
    var originalX = parseInt($("#crop_x").val());
    var originalY = parseInt($("#crop_y").val());
    var radius = parseInt($("#rad").val());
    var minX=(originalX-radius);
    var maxX=originalX+radius;
    var minY=(originalY-radius);
    var maxY=originalY+radius;
    $("#crop_tot").html((2*radius+1)*(2*radius+1));
    $("#crop_done").html(0);
    y=minY;
    while(y<=maxY){
        x=minX;
        while(x<=maxX){
            getMap(x, y);
            x++;
        }
        y++;
    }
}

function SearchElephants()
{
    $("#elep_fields").empty();
    var originalX = parseInt($("#elep_x").val());
    var originalY = parseInt($("#elep_y").val());
    var radius = parseInt($("#rad_elep").val());
    var minX=(originalX-radius);
    var maxX=originalX+radius;
    var minY=(originalY-radius);
    var maxY=originalY+radius;
    $("#ele_tot").html((2*radius+1)*(2*radius+1));
    $("#ele_done").html(0);
    y=minY;
    while(y<=maxY){
        x=minX;
        while(x<=maxX){
            getElephant(x,y,maxX*maxY);
            x++;
        }
        y++;
    }
}

/**
 * Save elephant finder data to coockies
 */
function save_Elep_data()
{
    alert(escape($('#elep_fields').html()));
    setCookie("Elep_saved_data",escape($('#elep_fields').html()));
}
/**
 * Load elephant finder data from coockies
 */
function load_Elep_data()
{
    $('#elep_fields').html(unescape(getCookie("Elep_saved_data","")));
}

function check_all_box()
{
    if($(".check:first").attr("name"))
    {
        $("#overview th:first").attr("colspan","1");
        $("#overview th:first").parent().prepend('<th class="sel"><input id="check_all_box" type="checkbox"/></th>');
    }
}

function warehouse()
{
    if(parseInt(getCookie("Warehouse","1")))
    {
        
    $("#res").css("top","75px");
    $(".bar-bg").css("margin-top","2px");
    
    var fa=parseInt($('#l1[class="value "]').parent().parent().attr('title').split(' ')[1]);
    var fak=parseInt($('#l1[class="value "]').html().split('/')[0]);
    var raktar=parseInt($('#l1[class="value "]').html().split('/')[1]);
    var f_ora=Math.floor(((raktar-fak)/fa));    
    var f_min=Math.floor((raktar-(f_ora*fa)-fak)/(fa/60));
    var fa_text= "<p>Full in "+f_ora+":"+f_min+"</p>";
    $('#l1[class="value "]').parent().parent().append(fa_text);
    
    var agyag=parseInt($('#l2[class="value "]').parent().parent().attr('title').split(' ')[1]);
    var agyagok=parseInt($('#l2[class="value "]').html().split('/')[0]);
    var a_ora=Math.floor(((raktar-agyagok)/agyag));    
    var a_min=Math.floor((raktar-(a_ora*agyag)-agyagok)/(agyag/60));
    var a_text= "<p>Full in "+a_ora+":"+a_min+"</p>";
    $('#l2[class="value "]').parent().parent().append(a_text);
    
    var vas=parseInt($('#l3[class="value "]').parent().parent().attr('title').split(' ')[1]);
    var vasak=parseInt($('#l3[class="value "]').html().split('/')[0]);
    var v_ora=Math.floor(((raktar-vasak)/vas));    
    var v_min=Math.floor((raktar-(v_ora*vas)-vasak)/(vas/60));
    var v_text= "<p>Full in "+v_ora+":"+v_min+"</p>";
    $('#l3[class="value "]').parent().parent().append(v_text);
    
    var buza=parseInt($('#l4[class="value "]').parent().parent().attr('title').split(' ')[1]);
    var buzak=parseInt($('#l4[class="value "]').html().split('/')[0]);
    var magtar=parseInt($('#l4[class="value "]').html().split('/')[1]);
    if(buza>0)
    {
    var b_ora=Math.floor(((magtar-buzak)/buza));    
    var b_min=Math.floor((magtar-(b_ora*buza)-buzak)/(buza/60));
    var b_text= "<p>Full in "+b_ora+":"+b_min+"</p>";
    }
    else
    {
        var b_ora=Math.floor(-1*(buzak/buza));    
        var b_min=Math.floor(-1*(buzak+(b_ora*buza))/(buza/60));
        var b_text= "<p>Empty in "+b_ora+":"+b_min+"</p>";
    }
    $('#l4[class="value "]').parent().parent().append(b_text);
    }
}

function main()
{
    SetBut();
    createCropDiv();
    createElephantDiv();
    createReportsDiv();
    warehouse();
    var page=document.location.href.split('/')[3].split('?')[0];
    
    switch(page)
    {
        case "a2b.php":
        {
            if(!document.location.href.split('/')[3].split('?')[1])
                idozito_init()
            break;   
        }
        case "berichte.php":
        {
           check_all_box();
           break;
        }
        case "nachrichten.php":
        {
            check_all_box();
            break;
        }
        default:
        {   
            break;   
        }
    }
}

$(function() {
    var check=0;
    $( "#draggable" ).dialog({
        autoOpen: (getCookie("CropFinder","1")=="1")?true:false,
	title: 'Crop Finder',
        minHeight:100,
        height: parseInt(getCookie("Crop_finder_window_height","300")),
        width: parseInt(getCookie("Crop_finder_window_width","250")),
        position: [parseInt(getCookie("Crop_finder_window_left","100")),parseInt(getCookie("Crop_finder_window_top","100"))],
        buttons: {"Ok": SearchCropFields},
        closeOnEscape: false,
        dragStop: function(event, ui) {
                    var Stoppos = ui.position;
                    setCookie("Crop_finder_window_left",Math.round(Stoppos.left));
                    setCookie("Crop_finder_window_top",Math.round(Stoppos.top));
                    //alert('left:'+Stoppos.left+'top:'+Stoppos.top);
                  },
        resizeStop: function(event,ui){
                    var NewSize=ui.size;
                    setCookie("Crop_finder_window_height",Math.round(NewSize.height));
                    setCookie("Crop_finder_window_width",Math.round(NewSize.width));
                    //alert('height:'+NewSize.height+'width:'+NewSize.width);
                    },
        close: function(event, ui) { 
                setCookie("CropFinder","0");
        },
        dialogClass: 'dialogFixed'
    });
    $( "#draggable2" ).dialog({
        autoOpen: (getCookie("NeighbourReports","1")=="1")?true:false,
	title: 'Reports',
        minHeight:100,
        height: parseInt(getCookie("reports_window_height","300")),
        width: parseInt(getCookie("reports_window_width","250")),
        position: [parseInt(getCookie("reports_window_left","100")),parseInt(getCookie("reports_window_top","100"))],
        //buttons: {"Ok": },
        buttons: {"Refresh": RefreshNeighbourData},
        closeOnEscape: false,
        dragStop: function(event, ui) {
                    var Stoppos = ui.position;
                    setCookie("reports_window_left",Math.round(Stoppos.left));
                    setCookie("reports_window_top",Math.round(Stoppos.top));
                    //alert('left:'+Stoppos.left+'top:'+Stoppos.top);
                  },
        resizeStop: function(event,ui){
                    var NewSize=ui.size;
                    setCookie("reports_window_height",Math.round(NewSize.height));
                    setCookie("reports_window_width",Math.round(NewSize.width));
                    //alert('height:'+NewSize.height+'width:'+NewSize.width);
                    },
        close: function(event, ui) { 
                setCookie("NeighbourReports","0");
        },
        dialogClass: 'dialogFixed'
    });
    $( "#draggable3" ).dialog({
        autoOpen: (getCookie("ElephantFinder","1")=="1")?true:false,
	title: 'Elephant Finder',
        minHeight:100,
        height: parseInt(getCookie("Elephant_finder_window_height","300")),
        width: parseInt(getCookie("Elephant_finder_window_width","250")),
        position: [parseInt(getCookie("Elephant_finder_window_left","100")),parseInt(getCookie("Elephant_finder_window_top","100"))],
        buttons: {"Ok": SearchElephants, "Save":save_Elep_data, "Load":load_Elep_data},
        closeOnEscape: false,
        dragStop: function(event, ui) {
                    var Stoppos = ui.position;
                    setCookie("Elephant_finder_window_left",Math.round(Stoppos.left));
                    setCookie("Elephant_finder_window_top",Math.round(Stoppos.top));
                    //alert('left:'+Stoppos.left+'top:'+Stoppos.top);
                  },
        resizeStop: function(event,ui){
                    var NewSize=ui.size;
                    setCookie("Elephant_finder_window_height",Math.round(NewSize.height));
                    setCookie("Elephant_finder_window_width",Math.round(NewSize.width));
                    //alert('height:'+NewSize.height+'width:'+NewSize.width);
                    },
        close: function(event, ui) { 
                setCookie("ElephantFinder","0");
        },
        dialogClass: 'dialogFixed'
    });
    
     if(parseInt(getCookie("NeighbourReports","1")))
     {
         $("#nreports").html(load("RTable_data",""));
        //RefreshNeighbourData();
     }
    
    $("#check_all_box").click(function(){
        if(!check)
            $(".check").attr("checked","checked");
        else
            $(".check").attr("checked","");
        check=!check;
    });
});
main();