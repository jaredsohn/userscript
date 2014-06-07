var scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name           travian T4 Extra tools
// @namespace      timer
// @description    Extra Tools for travian version 4 (T4)
// @author         hotzu
// @version        1.05.00
// @lastchanges    Player informations on alliance page, market total
// @include        http://ts*.travian.*/*
// @include        http://ts*.travian.*.*/*
// @include        http://tx*.travian.*/*
// @include        http://tx*.travian.*.*/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// @require        https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js
// ==/UserScript==
]]></>.toString(); // Make sure to copy this line right below

function check_update() {
  data='version='+scr_meta.split('@version')[1].split('\n')[0].replace(/^\s+|\s+$/g,"");
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://data.game-alerter.info/travian_extra/check_update.php",
    headers: {'Content-type':'application/x-www-form-urlencoded'},
    data: encodeURI(data),
    onload: function(msg) {
		if(msg.responseText!="")
		{
			if(confirm("New version available for Travian Extra Tools (New version: "+msg.responseText+")! Click OK to install new version!"))
			{
				window.location.href='http://data.game-alerter.info/travian_extra/'+msg.responseText+'/travian_t4_extra_tools.user.js';
			}
		}
		else
		{
			alert("You have the latest version...");	
		}
    }
   });
}

function check_auto_update() {
  data='version='+scr_meta.split('@version')[1].split('\n')[0].replace(/^\s+|\s+$/g,"");
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://data.game-alerter.info/travian_extra/check_update.php",
    headers: {'Content-type':'application/x-www-form-urlencoded'},
    data: encodeURI(data),
    onload: function(msg) {
		if(msg.responseText!="")
		{
			var str = document.createElement('div');
			str.setAttribute('style', 'position: fixed;border: 1px solid #000;padding: 5px;background-color:#C0C0C0;-webkit-border-radius: 5px;-moz-border-radius: 5px;width: 240px;height: 85px;text-align: center;z-index: 100000;left:'+(window.innerWidth-270)+'px;top:'+(window.innerHeight-100)+'px;');
			str.innerHTML='<span>New version available for Travian Extra Tools (New version: '+msg.responseText+')!<br/></br>Click <a href="http://data.game-alerter.info/travian_extra/'+msg.responseText+'/travian_t4_extra_tools.user.js" target="_blank">HERE</a> to install new version!</span>';
			$('body').append(str);
		}
    }
   });
}

function go_to_bugs()
{
	window.location.href='http://bugs.game-alerter.info/index.php?string=&project=2&type[]=&sev[]=&pri[]=&due[]=&reported[]=&cat[]=22&status[]=&percent[]=&opened=&dev=&closed=&duedatefrom=&duedateto=&changedfrom=&changedto=&openedfrom=&openedto=&closedfrom=&closedto=&do=index';
}

function go_to_forum()
{
	window.location.href='http://forum.game-alerter.info/';
}

function donate()
{
	window.location.href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YTXWR6A4Y3CLS&submit=';
}

var tr; // Translation array.

GM_registerMenuCommand("T4 ExtraTools Settings",showSet);
GM_registerMenuCommand("Check for new version",check_update);
GM_registerMenuCommand("Report a bug",go_to_bugs);
GM_registerMenuCommand("Need a new feature",go_to_bugs);
GM_registerMenuCommand("Discuss Script",go_to_forum);
GM_registerMenuCommand("Donate",donate);


var StyleSheet=['base','black-tie','blitzer','cupertino','dark-hive','dot-luv','eggplant','excite-bike','flick','hot-sneaks','humanity','le-frog','mint-choc','overcast','pepper-grinder','redmond','smoothness','south-street','start','sunny','swanky-purse','trontastic','ui-darkness','ui-lightness','vader'];

GM_addStyle('@import "http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/'+StyleSheet[parseInt(getCookie("Used_Style_Sheet","18"))]+'/jquery-ui.css";');
GM_addStyle('.dialogFixed {position: absolute !important;} .dialogFixed table tbody tr td,.dialogFixed table tbody tr,.dialogFixed table tbody,.dialogFixed table,.dialogFixed table tbody td{background:inherit !important;padding:0px;font:1em;} ');

var SettingsButtonImageLink='data:image/png;base64,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';

var analyser_icon='data:image/png;base64,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';

var cross_icon='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAD7UlEQVR42tWVf0xbVRTHz3237UrbR1coKxRIzf5ZZhTdMHHhh2EDpJTXZYuZBONCdL/EiBnxx1ycuojT+cdcWMc0gy0mJrhkJTraPpaWH3NsDjERXaJTEwMbGwu/BFukhd77rhcMCWpX6uL+8CQv97177zmfc8/93vsQ3GND/xvA9gqHmiJkbPH6xhMC7Ni6WWPAkAUMHhQQkKPuNl88QE2Fo4EApDb55KdjAiRJehghVIABHuCfORoB1jykw6YCPYbhWTp7LUzz33Z7vokV/AVH+c4tNHKyH6nJDSQ86mo/3/8PgNPpnA/s5Y9tm1kDpSIGHVMAogoQQuHdCXpVZGzDwc994aXB99rLCmxM8VeHQ0lXkQqOG4ztbp/PEbNEHGIFYOcy1ELugTQVMioKYzw4EAVdiyisOSI0nPL46hbnv2gvs/G69x4ITlpWRCmaowqrs6QDL1XxWVnujrkHW5ySyJuWTBWS9hsYM1AO4M6MKOwjolaGFFR2wid37rLbddMYX3xtamJ9VmSOJ/HnnCZzKnwpGr5iAPler1eJuclPOCU1b1zZAtuzD8+BdmEVFCYJg9c14nUjoY+MY3ysMhis2hQKLYzNl3JUEOBIthVGVmh+BcZyPV7v4B1V9KRTQnxwXzZT6l+OTqs0Ucrmszyv0rIzOsPgunD4vtrRMa4v3s+DX1er0VFbJgupcEBg7NnPfL5bcWW6aM9UOJ6yKrS5Njil1XBAlJfBtdIEO0fGwDBLFgA/JGmh0ZY5zafv5z0ftsqysuw5+IsM7faiNELcNePjqQJfiUIU4C1wAaCvk0X2SbalT09odXPA/9PffRM+yQeLNq41Utq9fXjUwlUFjCrQaTZFLphXHtIo7PCxrg4Syy9hwJuPFZXkTwbl9VNBFZ135DJpybIM8VrkvNR7+bc7+SUEeC+vMCslSvq23h7L6DcaoNW6CmoGboFICDTZrMff/6K79q4Bh/MK1WEsdO8eHM4LrEpBnnTzFTFKXERArr2/DKVySZJek3FTfc+FnrsC1G0s/mDHjdt1belm+r2ob9RS+sqpgH+u+vGyHIaQ/PzATWtnWsqPXD3r3rp0cfZfAfaUlG6rGJn4tCvNFJwR8K6THf7WpePPFZeujmBBrro5suZchvmdE50dbyQMqLKXr71/eubKYJL2Z551ZWNXx0CseRximVFhT+5UKOe7ZP2G0wH/t8sCNkuSXsXYZbXCegyEvMpLEoY4trukNDmCcStmTAxhXOhul6NxAU5JauDNJX6XnF1ujxatsrw8KYzxx/y1r83rPRIXwH8+On4TziQafElimB+PQzxoPU/u97h78F/ZPQf8AdnYuCiLnWEfAAAAAElFTkSuQmCC';

var add_icon='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADXklEQVR42qWWXUgUURSA753ZdbbVtbBknDbxpygo+rNfKPpZEaLtz4SykuiPoozoISp6jKgIH0IqDLIe6iEfJEwkqR56qReTyrCfB1M3XadaLH9ydmbn3tuZO25YjC4yw17O2XPvPd89Z+45DEYpnm3X6rFYuOoMQ8g31o4RMtJ+dVfVHVlDJtqPUwFO1j6Ri4s3qgHv36UMYHgowVjLuw/Kle1F31wBTt1rlivCxWphQEDU9s4BXwYJa37drlzcstQd4MSdJ/LecKgvPyByzxaEguwcJOhZa7v7CI7ebpJ3bQ6peQEPd0wgApC4a8hkLwBQVbbcHeDgrUa5dFNIzc3wgHOGCLUBkWHCXr5pV6p3r3QH2FfdIIdLQn1KupiMgI/osIla2j4oNftWuwTcfSWvK5qvygCA0/MUwcDff5usraNHqd29MDWg/FHvZa9XKCgI+tDOORkoC65kfdcIet89gnSN+Jbm+HZk+ZMAxghluF8j7FPMaDAZik/L9KL1BX40oFPUEhlBw78JEjDqfFgavMAB556r2nS/KIERYYzhtjCUAGcJOKoJefF5BJQmYgCw5HtAcZPCgHBGT+m15uGPYdprYJ9eEw5O4YCzT6ParKleCYyYn5JaabB0NkZHtnOgU4owl8yS/NqCjWHKr/GonbL4g7I8G3D8cUTL9nsk/gLHnNIAgwFKAmwmSQIQj9BylnyYc/r1+j2FNqDiYYeW6RMlSAnWElbolFn6qJNkFsb6w//ZnfR444G5NmBr7UcNhGSYFLPxN0wa8PTYAhuwofotB6TYMGnAi1NLbMCy8/WLxquJtEx5BvZKz5zmGDFLjF/R2DglwFqvlrWlLLR5h27IgYIi1SkC7UeX0l69110lz664LmfkL3EExGMR5XPNfneAvPIqOT13cZ/TnN4fUTpqD7sDBHdelf25ixwjMPq/Kt33j7kD5Gy9JE8JLnQG/OxReusq3QGyQ6dzpPy1Uac5I/p25vfmS+pE+zlAmpptSeurwSeIHgnDGJVpon96jm9FZRN0wX+DgJ/WcjNMR2IqJabOTNOgJBFnlOgYYS0+8EP/JwKACNBJBXAqYkEUBQ/0R9EjCKIlRbB5BCwIfL3V2aAGCKMmpSY0FdDBOUhCwGD1O6IPxHhT+AOLg/cotPB3MAAAAABJRU5ErkJggg==';

var SettingsFrameBackgroundColor='#5c9ccc';
var SettingsFrameTextColor='#FFF';

var lang=(document.location.href.split('/')[2].split('.')[3])?document.location.href.split('/')[2].split('.')[3]:document.location.href.split('/')[2].split('.')[2];

function meta_Content_Language()
{
    metaCollection = document.getElementsByTagName('meta');
    for( i = 0; i < metaCollection.length; i++)
    {
        nameAttribute = metaCollection[i].name.search(/content-language/);
        if (nameAttribute!= -1)
        {
            return metaCollection[i].content;
        }
    }
}

function setLC()
{// By Qusai Abu Hilal arabiz
    var con_lang = meta_Content_Language();
    switch( con_lang )
    {
        case 'sy':
        case 'ae':
        case 'eg':
        case 'sa':
        {
            return 'ar';
        }
        case 'ir':
        {
            return 'fa';
        }
        case 'fr':
        {
            return 'fr';
        }
        case 'ir':
        {
            return 'ar';
        }
        default:
        {
            return con_lang;
        }
    }
} 

loadTranslations(setLC());

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
    setCookie("NeighbourReports",$('#NReports').val());
	setCookie("PlayerInfo",$('#PlayerInfo').val());
	setCookie("AnalyzerLink",$('#analyzer').val());
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
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+tr.script_settings+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.stylesheet+'</td><td style="background:none;"><select id="style_sheet">'+genOptions(StyleSheet,parseInt(getCookie("Used_Style_Sheet","18")))+'</select></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+tr.troop_timer+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.refresh_rate+'</td><td style="background:none;"><input type="text" id="timer_interv" value="'+getCookie("timer_interv","500")+'" /></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.send_delay+'</td><td style="background:none;"><input type="text" id="timer_offset" value="'+getCookie("timer_offset","1")+'" /></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+tr.tools+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.c_finder+'</td><td style="background:none;"><select id="CropFinder"><option value="0" '+((parseInt(getCookie("CropFinder","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("CropFinder","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.e_finder+'</td><td style="background:none;"><select id="ElephantFinder"><option value="0" '+((parseInt(getCookie("ElephantFinder","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("ElephantFinder","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.warehouse+'</td><td style="background:none;"><select id="warehouse_stat"><option value="0" '+((parseInt(getCookie("Warehouse","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("Warehouse","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.show_troop_resc_button+'</td><td style="background:none;"><select id="villagelinks"><option value="0" '+((parseInt(getCookie("VillageLinks","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("VillageLinks","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
    s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+tr.n_reports+'</strong></center></th></tr>';
    s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.show_n_report+'</td><td style="background:none;"><select id="NReports"><option value="0" '+((parseInt(getCookie("NeighbourReports","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("NeighbourReports","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
	s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.player_info+'</td><td style="background:none;"><select id="PlayerInfo"><option value="0" '+((parseInt(getCookie("PlayerInfo","1"))==0)?'selected="selected"':'')+'>OFF</option><option value="1" '+((parseInt(getCookie("PlayerInfo","1"))==1)?'selected="selected"':'')+'>ON</option></select></td></tr>';
	s+='<tr><th colspan="2" style="background-color:#d6d6d6;"><center><strong>'+tr.parameters+'</strong></center></th></tr>';
	s+='<tr><td style="background:none;color:'+SettingsFrameTextColor+';">'+tr.analyzer_link+'</td><td style="background:none;"><input type="text" id="analyzer" value="'+getCookie("AnalyzerLink","http://travian.ws/analyser.pl?s=hu6")+'" /></td></tr>';
	
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
    
    var sor='<tbody class="infos"><tr><td id="ido">'+tr.troop_timer+'</td><td align="right" colspan="'+$('.at').parent().attr('colspan')+'">';
    sor+=tr.arrives+': ';
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

/**
 * Thanx for the "Attack builder" by: FDisk
 * Script link: http://userscripts.org/scripts/show/98664
 * Catapult function added by: hotzu
 */
function _new_attack() {
    var i=0;
	var spy= $('input[name="spy"]:checked').val();
	//alert(spy);
	$('.attack').each(function(index){
                var cata= $('.catas:eq('+i+') select[name="kata"]').val();
                var cata2= $('.catas:eq('+i+') select[name="kata2"]').val();
                //alert("cata1:"+cata+"\ncata2:"+cata2);
                i++;
		inputs = $('input',$(this));
		$.ajax({
			type: 'GET',
			url: 'a2b.php',
			data: 'z='+$('input:hidden[name="kid"]').val(),
			async: false,
			success: function(msg) {
				//Fill form
				var forma = $('form',msg);
				$(inputs).each(function(index){
					$('input[name="t'+(index+1)+'"]',forma).val($(this).val());
				});

				//Atack type:2- deffend, 3- atack, 4 - raid
				$('input:radio[name="c"]', forma).eq($('input:hidden[name="c"]').val()-2).attr("checked", "checked");
				var url = $(forma).serialize()+'&s1=ok&s1.x='+(Math.floor(Math.random()*47)+1)+'&s1.y='+(Math.floor(Math.random()*19)+1);

				$.ajax({
					type: 'POST',
					url: $(forma).attr('action'),
					data: url,
					async: false,
                                        //datatype : "html",
					success: function(msg){
                                            var adatok=$('form',msg).serialize();
                                            var adatok2='';
                                            if(adatok.split('kata=')[1])
                                            {
                                                adatok2+=adatok.split('kata=')[0]+'kata='+cata;
                                                if(adatok.split('kata2=')[1])
                                                {
                                                    adatok2+='&kata2='+cata2+'&timestamp=';
                                                    adatok2+=adatok.split('kata2=')[1].split('&timestamp=')[1];
                                                }
                                                else
                                                    adatok2+='&timestamp='+adatok.split('kata=')[1].split('&timestamp=')[1];
                                            }
                                            else
											{
												if(adatok.split('spy=')[1])
												{
													adatok2+='spy='+spy+'&timestamp='+adatok.split('spy=')[1].split('&timestamp=')[1];
												}
												else
													adatok2=adatok;
											}  
                                            //alert('serialize:'+adatok+'\nUj adatok:'+adatok2);
						$.ajax({
							type: $('form',msg).attr('method'),
							url: $('form',msg).attr('action'),
							data: adatok2,
							async: false,
							success: function(msg){
							}
						});
                                            
					}
				});
			}
		});
		$(this).remove();
	});
	window.location = "/build.php?gid=16";
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

    //Add wave
    $('#btn_forward1').click(function(){
            //i++;	//Count waves
            $(what).clone().insertAfter(what)/*.addClass('attack_'+i);*/
            if(catapults.html())
                $(catapults).clone().insertAfter(catapults)
    });
    //Remove wave
    $('#btn_back1').click(function(){
            if ($('.attack').length > 1)
                    $('.attack').last().remove();
    });
    $('#btn_ok1').click(function(){
            _new_attack();
    })
    
    $(document).ready(function(){
        $('.troop_details').append(makeTimerFields());

        $('#start_ti').click(function(){
            $(this).everyTime(parseInt(getCookie("timer_interv","500")),"idozito", function() {
                eido=getErkezesiIdo();
                eh=parseInt(eido.split(':')[0]);
                if(eh==$('#h').val())
                {
                    em=parseInt(eido.split(':')[1]);
                    if(em==$('#m').val())
                    {
                        es=parseInt(eido.split(':')[2]);
                        if((es-$('#s').val())>=-parseInt(getCookie("timer_offset","1")))
                            $('#btn_ok1').trigger('click');
                            //document.forms[0].submit();
                    }
                }
            });
            $("#stop_ti").removeAttr("disabled");
            $("#start_ti").attr("disabled", "disabled");
        });

        $('#stop_ti').click(function(){
            $('#start_ti').stopTime("idozito");
            $("#stop_ti").attr("disabled", "disabled");
            $("#start_ti").removeAttr("disabled");
        });
    });
}

function createCropDivContent()
{
    var s='Scanned <span id="crop_done">0</span> from <span id="crop_tot">0</span><br/>';
    s+='X:<input type="text" id="crop_x" maxsize="4" size="4" value="0"/>&nbsp;Y:<input type="text" id="crop_y" maxsize="4" size="4" value="0"/><br/>R:<select id="rad"><option value="4" selected>4</option><option value="8">8</option><option value="100">100</option></select><br/><table id="crop_fields"></table>';
    return s;
}

function createElephantDivContent()
{
    var s='Scanned <span id="ele_done">0</span> from <span id="ele_tot">0</span><br/>';
    s+='<input type="checkbox" id="croc_check"/>Scan for crocodiles too. <br/>';
    s+='X:<input type="text" id="elep_x" maxsize="4" size="4" value="0"/>&nbsp;Y:<input type="text" id="elep_y" maxsize="4" size="4" value="0"/><br/>R:<select id="rad_elep"><option value="4" selected>4</option><option value="8">8</option><option value="100">100</option></select><br/><table id="elep_fields"></table>';
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
        $.get('berichte.php?t=5', function(raw){
            raw=$(raw).find("table").html();
            raw.replace(/\n/g,' ');
            $(raw).find("table td").each(function(){
                if($(this).attr("class")=="dist")
                    $(this).remove();
                $(this).removeClass('sub');
            });
            //setCookie("ReportsTableData",raw);
            $("#nreports").html(raw);
        });
    }
}

/**
 * Function edited, and used from the "Crop Finder T4" : http://userscripts.org/scripts/show/93230
 */
function getMap(x, y, rad) {
    var tserver='http://'
	var zoom=1;
    tserver+=document.location.href.split('/')[2];
    tserver+='/ajax.php?cmd=mapPositionData';
    
	switch(rad)
	{
		case 4: zoom=1;
		break;
		case 8: zoom=2;
		break;
		default: zoom=3;
		break;
	}

	$.getJSON(tserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]="+zoom+"&", function(data) {
		$(data.data.tiles).each(function(index,elem) {
			if (elem.c) {
				if (elem.c.match("{k.f1}")) {
					$('<tr><td>Crop 9</td><td>' + elem.t + '</td></tr>').appendTo('#crop_fields');
				} else if (elem.c.match("{k.f6}")) {
 					$('<tr><td>Crop 15</td><td>' + elem.t + '</td></tr>').appendTo('#crop_fields');
				}	
			}	
            $('#crop_done').html(parseInt($('#crop_done').html())+1);
		});  
	});
}

function getElephant(x,y,rad)
{
    var tserver='http://';
	var zoom=1;
	tserver+=document.location.href.split('/')[2];
	mserver=tserver;
	mserver+='/ajax.php?cmd=mapPositionData';
	tserver+='/ajax.php';
	
	switch(rad)
	{
		case 4: zoom=1;
		break;
		case 8: zoom=2;
		break;
		default: zoom=3;
		break;
	}
	
	$.getJSON(mserver, "cmd=mapPositionData&data[x]=" + x + "&data[y]=" + y + "&data[zoomLevel]="+zoom+"&", function(data) {
		$(data.data.tiles).each(function(index,elem) {
			if (elem.c) {
				if (elem.c.match("{k.fo}")) {
					$.ajax({
						  url: tserver,
						  data: "cmd=viewTileDetails&x="+elem.x+"&y="+elem.y,
						  dataType:"text",
						  success: function(data){
									   if(data.split('u40')[1])
										   $('<tr><td>Elephants</td><td>'+elem.t.split('</span></span>')[0]+'</span></span></td></tr>').appendTo('#elep_fields');
									   if((data.split('u38')[1])&&($("#croc_check").attr('checked')))
										   $('<tr><td>Crocodile</td><td>'+elem.t.split('</span></span>')[0]+'</span></span></td></tr>').appendTo('#elep_fields');
									}
						});
				}	
			}
			$('#ele_done').html(parseInt($('#ele_done').html())+1);	
		});  
	});
}

function SearchCropFields()
{
    $("#crop_fields").empty();
    var originalX = parseInt($("#crop_x").val());
    var originalY = parseInt($("#crop_y").val());
    var radius = parseInt($("#rad").val());
	var tot=0;
	switch(radius)
	{
		case 4: tot=99;
		break;
		case 8: tot=357;
		break;
		default: tot=961;
		break;
	}
    $("#crop_tot").html(tot);
    $("#crop_done").html(0);
    getMap(originalX, originalY, radius);
}

function SearchElephants()
{
    $("#elep_fields").empty();
    var originalX = parseInt($("#elep_x").val());
    var originalY = parseInt($("#elep_y").val());
    var radius = parseInt($("#rad_elep").val());
    var tot=0;
	switch(radius)
	{
		case 4: tot=99;
		break;
		case 8: tot=357;
		break;
		default: tot=961;
		break;
	}
    $("#ele_tot").html(tot);
    $("#ele_done").html(0);
    getElephant(originalX, originalY, radius);
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

function village_links()
{
    if(parseInt(getCookie("VillageLinks","1"))){
        $(".entry a").each(function(){
            var str=$(this).attr('title');
            $(this).css('display','inline');
            $(this).css('margin-left','0px');
            x=str.split('class="coordinateX">(')[1].split('</span><span class="coordinatePipe">')[0];
            y=str.split('<span class="coordinateY">')[1].split(')</span></span>')[0];
            var kuldo_link='http://'+document.location.href.split('/')[2]+'/build.php?gid=17&x='+x+'&y='+y;
            var egyseg_link='http://'+document.location.href.split('/')[2]+'/a2b.php?x='+x+'&y='+y;
            gomb=document.createElement('a');
            gomb.setAttribute('href', egyseg_link);
            gomb.setAttribute('style', 'display:inline;margin-left:0px;');
            gomb.setAttribute('title', tr.send_troops);
            kep=document.createElement('img');
            kep.setAttribute('style', 'display:inline;margin-left:0px;');
            kep.setAttribute('src', 'img/x.gif');
            kep.setAttribute('class', 'def2');
            gomb.appendChild(kep);
            gomb2=document.createElement('a');
            gomb2.setAttribute('href', kuldo_link);
            gomb2.setAttribute('style', 'display:inline;margin-left:0px;');
            gomb2.setAttribute('title', tr.send_resources);
            kep2=document.createElement('img');
            kep2.setAttribute('style', 'display:inline;margin-left:0px');
            kep2.setAttribute('src', 'img/x.gif');
			kep2.setAttribute('class','reportInfo carry full');
            gomb2.appendChild(kep2);
            $(this).parent().append(gomb);
            $(this).parent().append(gomb2);
        })
        $(".entry a").css('margin-left','0px');
    }
}

function add_numbers_to_table(table_id)
{
	$('#'+table_id+' tr').each(function(i){
		$(this).prepend(('<td width="15px" style="text-align:right !important;">'+(i>0?i:'')+'</td>'));
	});
}

function ShowAgentStat(table_id)
{
    $('#'+table_id+' a[href*="spieler.php?uid="]').each(function(i,e)
        {
            $(this).bind('mouseover',{elem:e},function(event){
				//alert($(event.data.elem).html());
				var str = document.createElement('div');
				str.setAttribute('id', 'AStat');
				str.setAttribute('style', 'position: fixed;border: 1px solid #000;padding: 5px;background-color:#C0C0C0;-webkit-border-radius: 5px;-moz-border-radius: 5px;width: 240px;height: 85px;text-align: center;z-index: 100000;left:'+(window.innerWidth-270)+'px;top:'+(window.innerHeight-100)+'px;');
				str.innerHTML=get_player_data(event.data.elem);
				//str.innerHTML="Lassam";
				$('body').append(str);
				});
            $(this).bind('mouseout',function(){
					$('#AStat').remove();
				});
			var $sor=$(this).parent();
			player_profile=$(this).attr('href');
			player_id=parseInt(player_profile.split('=')[1]);
			$sor.append('<a href="http://travian.ws/analyser.pl?s=hu6&uid='+player_id+'" title="'+tr.Analyzer+'" target="_blank"><img src="'+analyser_icon+'" width="16" height="16" style="vertical-align: bottom;"></a>');
			info='';
			
			$.ajax({
              url: player_profile,
              dataType:"html",
			  //async:false,
              success: function(data){
				  			var max_dny=0;
							var max_dk=0;
							var max_eny=0;
							var max_ek=0;
							
                            $(data).find('.coordinates').each(function(){
							    x=parseInt($(this).find('.coordinateX').html().split('(')[1]);
								y=parseInt($(this).find('.coordinateY').html().split(')')[0]);
								if((x<0)&&(y<0))
									max_dny++;
								if((x>0)&&(y<0))
									max_dk++;
								if((x<0)&&(y>0))
									max_eny++;
								if((x>0)&&(y>0))
									max_ek++;
							});
							
							max_pos=Math.max(max_dny,max_dk,max_eny,max_ek);
							map_segment='';
							if(max_dny==max_pos)
								map_segment+=' '+tr.SW+'(-/-)';// DNY
							if(max_dk==max_pos)
								map_segment+=' '+tr.SE+'(+/-)';// DK
							if(max_eny==max_pos)
								map_segment+=' '+tr.NW+'(-/+)';// ENY
							if(max_ek==max_pos)
								map_segment+=' '+tr.NE+'(+/+)';// EK
							$sor.parent().append('<td>'+map_segment+'</td>');
                        }
        });
		$
        });
}

function get_player_data(elem)
{
	
		var player=$(elem).html();
		var player_profile=$(elem).attr('href');
		var attack_rank=0;
		var defence_rank=0;
		var map_segment='<table>';
		/*
		map_segment+='<tr><td>Village Position(s)</td><td>';
		$.ajax({
              url: player_profile,
              dataType:"html",
			  async:false,
              success: function(data){
				  			var max_dny=0;
							var max_dk=0;
							var max_eny=0;
							var max_ek=0;
							
                            $(data).find('.coordinates').each(function(){
							    x=parseInt($(this).find('.coordinateX').html().split('(')[1]);
								y=parseInt($(this).find('.coordinateY').html().split(')')[0]);
								if((x<0)&&(y<0))
									max_dny++;
								if((x>0)&&(y<0))
									max_dk++;
								if((x<0)&&(y>0))
									max_eny++;
								if((x>0)&&(y>0))
									max_ek++;
							});
							
							max_pos=Math.max(max_dny,max_dk,max_eny,max_ek);
							if(max_dny==max_pos)
								map_segment+=' '+tr.SW+'(-/-)';// DNY
							if(max_dk==max_pos)
								map_segment+=' '+tr.SE+'(+/-)';// DK
							if(max_eny==max_pos)
								map_segment+=' '+tr.NW+'(-/+)';// ENY
							if(max_ek==max_pos)
								map_segment+=' '+tr.NE+'(+/+)';// EK
                        }
        });
		map_segment+='</td></tr>';*/
		map_segment+='<tr><td>Attack rank</td><td>';
		$.ajax({
              url: "statistiken.php?id=31",
			  data: {name:player},
              dataType:"html",
			  async:false,
              success: function(data){
				  attack_rank=parseInt($(data).find('input[name="rank"]').val());
				  map_segment+=attack_rank;
			  }
		});
		map_segment+='</td></tr><tr><td>Deffender rank</td><td>';
		$.ajax({
              url: "statistiken.php?id=32",
			  data: {name:player},
              dataType:"html",
			  async:false,
              success: function(data){
				  defence_rank=parseInt($(data).find('input[name="rank"]').val());
				  map_segment+=defence_rank;
			  }
		});		
		map_segment+='</td></tr></table>';		
	
	return map_segment;
}

function piac()
{
    piac=document.getElementById('send_select');
    if(piac)
    {
        agyag=0;
        fa=0;
        vas=0;
        buza=0;

        user=document.getElementsByClassName('wrap')[0].innerHTML;
        nyersik=document.getElementsByClassName('traders');
        for(i=0;i<nyersik.length;i++)
        {
            a=nyersik[i].getElementsByTagName('a');
            if(a[0].innerHTML != user)
            {
                //hozzaad;
                chil=nyersik[i].getElementsByTagName('span')[1].childNodes;
                fa+=parseInt(chil[1].nodeValue);
                agyag+=parseInt(chil[3].nodeValue);
                vas+=parseInt(chil[5].nodeValue);
                buza+=parseInt(chil[7].nodeValue);
            }
        }
        
        //alert('Fa: '+fa+'\n'+'Agyag:'+agyag+'\n'+'Vas:'+vas+'\n'+'Buza:'+buza);
        adattabla = document.createElement('table');
        adattabla.setAttribute('class', 'traders');
        adattabla.setAttribute('cellpadding', '1');
        adattabla.setAttribute('cellspacing', '1');
        adattabla.innerHTML='<tbody><tr class="res"><th>'+tr.Total+'</th><td colspan="2"><span><img class="r1" src="img/x.gif" alt="Fa" title="Fa" /> '+fa+'&nbsp;&nbsp;<img class="r2" src="img/x.gif" alt="Agyag" title="Agyag" /> '+agyag+'&nbsp;&nbsp;<img class="r3" src="img/x.gif" alt="Vasérc" title="Vasérc" /> '+vas+'&nbsp;&nbsp;<img class="r4" src="img/x.gif" alt="Búza" title="Búza" /> '+buza+'&nbsp;&nbsp;</td></tr></tbody>';
		if(document.getElementsByClassName('spacer')[0])
        	document.getElementsByClassName('spacer')[0].appendChild(adattabla);
    }
}

function post_rep(data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: "http://travian-reports.net/convert",
    headers: {'Content-type':'application/x-www-form-urlencoded'},
    data: encodeURI(data),
    onload: function(msg) {
		$("#rep_link").val($(msg.responseText).find("#link").val());
    }
   });
}

function save_battle_report(rep)
{
	var adat='report='+rep+'&step1=Save report&design=1';
	post_rep(adat);
}

function main()
{
    SetBut();
    createCropDiv();
    createElephantDiv();
    createReportsDiv();
    village_links();
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
			if(document.location.href.split('/')[3].split('?id=')[1])
			{
				$("#report_surround").before('<a href="#" id="sub_report">'+tr.battle_rep+'</a></br><input type="text" id="rep_link" value="" style="width:100%; margin-top:5px; margin-bottom:5px;"/>');
				$("#rep_link").bind('focus',function(){ this.select(); });
				$("#sub_report").bind('click',function(){
					var re=$('#report_surround').clone(true);
					$('#report_surround td').prepend('	');
					$('#report_surround tr').prepend('\n');
					$('#report_surround div').append('\n').prepend('	');
					$('#report_surround img').each(function(i,el){
					$(this).parent().prepend($(this).attr('alt'));
					$(this).remove();
					});
					var text=$('#report_surround').text();
					//alert(text);
					save_battle_report(text);
					$('#report_surround').html(re.html());
				});
			}
			else
           		check_all_box();
            break;
        }
        case "nachrichten.php":
        {
			if($('#receiver'))
			{
				$('#receiver').attr('autocomplete','on');
				var img='<button class="icon" tabindex="7" id="add_rec" title="'+tr.new_recp+'" type="button">'+'<img src="'+add_icon+'" height="16" width="16" title="'+tr.new_recp+'"/>'+'</button>';
				$('#receiver').parent().append(img);
			}
            break;
        }
		case "allianz.php":
		{
			if(document.location.href.split('/')[3].split('?')[1].split('&')[0]=="s=2")
			{//forum
				if($(".paginator").html()!="")
				{
					var lep=$(".paginator").clone(true);
					lep.css("margin-top","0px");
					$("#posts").before(lep);
				}
			}
			else
			{
				add_numbers_to_table("member");
				$(function(){
					if(parseInt(getCookie("PlayerInfo","1"))==1)
						ShowAgentStat("member");
				});
			}
		}
		case "statistiken.php":
		{
			$(function(){
				if(parseInt(getCookie("PlayerInfo","1"))==1)
					ShowAgentStat("player");
			});
			break;
		}
		case "build.php":
		{
			piac();
		}
        default:
        {   
            break;   
        }
    }
	check_auto_update();
}

function remove_row(elem)
{
	elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);
	$("#message").height($("#message").height()+24);
}

function trim(text) {
	return text.replace(/^\s+|\s+$/g,"");
}

function send(to, topic, text){
	var postData = "an=" + to + "&be=" + topic + "&c=" + $('input[name="c"]').val() + "&message=" + trim(text) + "&t=2";
	
	var url = document.location.href.split("?")[0];
	post(url, postData);
}

function post(url, data) {
  GM_xmlhttpRequest({
    method: "POST",
    url: url,
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) {
		alert("Sent: " + data);
    }
   });
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
        buttons: {"Ok": SearchElephants},
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
        RefreshNeighbourData();
     }
    
    $("#nreports").html(getCookie(""));
    
    $("#check_all_box").click(function(){
        if(!check)
            $(".check").attr("checked","checked");
        else
            $(".check").attr("checked","");
        check=!check;
    });
	
	$("#add_rec").bind('click',function(){
		var $rec=$("#recipient").clone(true);
		//$rec.attr('autocomplete','on');
		$rec.find('#add_rec').remove();
		$rec.find('#receiver').val('');
		var img='<button class="icon" tabindex="7" id="remove_recipient" title="Remove" type="button">'+'<img src="'+cross_icon+'" height="16" width="16" title="Remove"/>'+'</button>';
		$rec.find('#receiver').parent().append(img);
		$("#recipient").after($rec);
		
		$("#recipient").each().attr('autocomplete','on');
		$("#message").height($("#message").height()-24);
		
		$('#remove_recipient').bind('click',function(){
			$(this).parent().parent().remove();
			$("#message").height($("#message").height()+24);
		});
	});
	
	$('form[action="nachrichten.php"]').bind('submit',function(){
		var forma=this;
		var total=$('input[name="an"]').size();
		$('input[name="an"]').each(function(i,e){
			if(i<(total-1))
			{
				$.ajax({
					type: 'POST',
					url: "ajax.php?cmd=checkRecipient",
					async: false,
					data: {"cmd" : "checkRecipient","recipient":$(e).val()},
					success: function(msg){
						if(msg.success=='success')
						{
							var row=$(e).parent().parent();
							send( $(e).val(), $('input[name="be"]').val() ,$('#message').val());
							row.remove();
						}
					}
				});
			}
		});
	});
	
});

main();

function loadTranslations(language){
	switch(language)
	{
		case 'hu':
		{
			tr = {
				troop_timer : 'Egység Időzítő',
				refresh_rate : 'Frissítési állandó (milisec -ben)',
				send_delay: 'Hamarabb küldeni az egységeket (mp-el)',
				tools: 'Eszközök',
				c_finder: 'Búza kereső',
				arrives: 'Érkezési idő',
				script_settings: 'Script beállítások',
				stylesheet: 'Kinézet',
				n_reports: 'Környezeti jelentések',
				show_n_report: 'Környezeti jelentések mutatása',
				e_finder: 'Elefánt kereső',
				send_troops: 'Egységek küldése', 
				send_resources: 'Nyersanyagok küldése',
				warehouse: 'Raktár telítési idejének mutatása',
				show_troop_resc_button: 'Egység/nyersanyag küldő gombok a falu lsitában',
				SW: 'DNY',
				SE: 'DK',
				NW: 'ÉNY',
				NE: 'ÉK',
				Total: 'Összes',
				Analyzer: 'Fejlődés',
				analyzer_link: 'A "travian world analyzer" link eme szerverhez',
				player_info: 'Játékos információk a klánlapon',
				parameters: 'Paraméterek',
				new_recp: 'Új címzett',
				battle_rep: 'Jelentés mentés (travian-reports.net)'
			}//tr array
			break;
		}//case hu
		case 'ro':
		{
			tr = {
				troop_timer : 'Temporizator',
				refresh_rate : 'Rata de încercare (in ms)',
				send_delay: 'Trimiterea trupelor mai repede cu (secunde)',
				tools: 'Unelte',
				c_finder: 'Caută lan de grâu',
				arrives: 'Timpul sosirii',
				script_settings: 'Setări script',
				stylesheet: 'Skin',
				n_reports: 'Împrejurimi',
				show_n_report: 'Arată dialogul pentru împrejurimi',
				e_finder: 'Căutător de elefanți',
				send_troops: 'Trimiterea trupelor', 
				send_resources: 'Trimiterea resurselor',
				warehouse: 'Arată starea hambarului',
				show_troop_resc_button: 'Se văd butoanele de trimitere trupe/resource în lista de sate',
				SW: 'SV',
				SE: 'SE',
				NW: 'NV',
				NE: 'NE',
				Total: 'Total',
				Analyzer: 'Analizator',
				analyzer_link: 'Linkul "travian world analyzer" pentru acest server',
				player_info: 'Informații jucător pe pagina alianței',
				parameters: 'Parametri',
				new_recp: 'Destinatar Nou',
				battle_rep: 'Salvează raportul (travian-reports.net)'
			}//tr array
			break;
		}//case ro
		default:
		{
			tr = {
				troop_timer : 'Troop Timer',
				refresh_rate : 'Refresh rate (in ms)',
				send_delay: 'Send before time with (in s)',
				tools: 'Tools',
				c_finder: 'Crop finder',
				arrives: 'Arrives at',
				script_settings: 'Script Settings',
				stylesheet: 'StyleSheet',
				n_reports: 'Neighbor Reports',
				show_n_report: 'Show neighbor reports',
				e_finder: 'Elephant finder',
				send_troops: 'Send troops', 
				send_resources: 'Send resources',
				warehouse: 'Show warehouse full time',
				show_troop_resc_button: 'Show send troops/resources button in village list',
				SW: 'SW',
				SE: 'SE',
				NW: 'NW',
				NE: 'NE',
				Total: 'Total',
				Analyzer: 'Analyzer',
				analyzer_link: 'The "Travian world analyzer link for this server"',
				player_info: 'Player informations on the alliance page',
				parameters: 'Parameters',
				new_recp: 'New Recipient',
				battle_rep: 'Submit to Battle reports (travian-reports.net)'
			}//tr array
			break;
		}//case default
	}//switch

} //loadTranslations()
