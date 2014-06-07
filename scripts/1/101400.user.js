// ==UserScript==
// @name           glados@home enhancer
// @namespace      lol
// @include        http://aperturescience.com/glados@home/*
// @include        http://www.aperturescience.com/glados@home/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

// All your GM code must be inside this function
    function letsJQuery() {
		var space = '&nbsp;';
   
var current_pourcent = parseInt($('#overall_progress_bar').css('width').replace('px', '')) * 100 / 494;
		
				
		var now = ( Math.round( new Date().getTime() / 1000 ) );
var g_endTimeLocal = unsafeWindow.g_originalEstimate;
		
		var old_time = g_endTimeLocal;
		g_updatedEstimate = Math.round(now + (3600 * (100 / current_pourcent) * ( ((now + 338400) - g_endTimeLocal) / 3600 ) ));

		var timeArray = new Object();
		timeArray["game_row_18500"] = 450000;
		timeArray["game_row_1250"] = 1200000;
		timeArray["game_row_26500"] = 65000;
		timeArray["game_row_38720"] = 50000;
		timeArray["game_row_38700"] = 50000;
		timeArray["game_row_63700"] = 60000;
		timeArray["game_row_15540"] = 50000;
		timeArray["game_row_12900"] = 300000;
		timeArray["game_row_15500"] = 30000;
		timeArray["game_row_40800"] = 350000;
		timeArray["game_row_57300"] = 300000;
		timeArray["game_row_15520"] = 60000;
		timeArray["game_row_35460"] = 120000;
		
		var playingtotal = 0;
		var hourstotal = 0;
		var hourslefttotal = 0;
		
		var potatoes = parseInt($('#potato_count').text().replace(/\D/g, ''));
		
		$('.game_row').each(function(){
			var playing = parseInt($(this).find('.game_cpus').text().replace(',','').replace(' CURRENT CPUS', ''));
			if(isNaN(playing)) return;
			
			playingtotal += playing;
			
			var hours_elapsed = (((now + 338400) - old_time) / 3600).toFixed(3);
			var spent = playing * hours_elapsed;

			var owners = Math.round(459 / parseInt($(this).find('.game_progress').css('width').replace('px;','')) * playing);
			var total = Math.round(spent * (457/parseInt($(this).find('.game_progress').css('width').replace('px;',''))));
			
			var eta = timeArray[$(this).attr('id')] - ((Math.round(playing*100/owners)/100) * timeArray[$(this).attr('id')]);
			eta = (eta / playing) / (potatoes/100000);
			
			hourstotal += (((playing*100/owners)/100) * timeArray[$(this).attr('id')]);
			hourslefttotal += timeArray[$(this).attr('id')] - (((playing*100/owners)/100) * timeArray[$(this).attr('id')]);
var s_remain = Math.floor(eta.toFixed(3) * 3600);
			 var remainHours = Math.floor( s_remain / 3600 )
    var remainMinutes = Math.floor( ( s_remain % 3600 ) / 60 )
    var remainSeconds = Math.floor ( s_remain % 60 )
    var t_str = (remainHours < 10 ? '0' : '') + remainHours + ':'
	    t_str += (remainMinutes < 10 ? '0' : '') + remainMinutes + ':'
	    t_str += (remainSeconds < 10 ? '0' : '') + remainSeconds

			oldtext = '<br/>' + $(this).find('.game_cpus').text().replace(' CURRENT CPUS', '');
			oldtext += space + '(' + (((playing*100/owners)/100) * timeArray[$(this).attr('id')]).toFixed(2) + space + 'H /' + timeArray[$(this).attr('id')] + '~' + space + 'Hours' + ')' + space + '(' + Math.round(playing*100/owners) + '%)' + space + 'ETA:' + space + t_str + space + 'left @ curr. rate';
			$(this).find('.game_cpus').html(oldtext);
		});
		
				
				
		
	}


















(function() {

  function getElementsByClass( searchClass, domNode, tagName) { 
    if (domNode == null) domNode = document;
    if (tagName == null) tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " "+searchClass+" ";
    for(i=0,j=0; i<tags.length; i++) { 
      var test = " " + tags[i].className + " ";
      if (test.indexOf(tcl) != -1) 
      el[j++] = tags[i];
    } 
    return el;
  }


  var ctn = document.getElementById('overall_progress_ctn')
  var bar = document.getElementById('overall_progress_bar')
  var con = document.getElementById('content')

  var tot = ctn.offsetWidth;
  var now = parseInt(bar.style.width);
  var per = now/tot*100;

  var per_ctn = document.createElement("p");
  var per_sty = "color: #666666; cursor: default; font-family: Consolas,Courier,fixed; font-size: 24px; margin: 0; position: absolute; text-align: center; top: 0; width: 100%;";
      per_ctn.style.cssText = per_sty;
      per_ctn.innerHTML = Math.round(per*100)/100 + "%";
      per_ctn.title = per + "%"
  
  ctn.appendChild(per_ctn);
  

  var rem_ctn2 = document.createElement("p")
  var rem_sty2 = "color: #226F22; font-family: Helvetica,Arial,sans-serif; font-size: 32px; font-weight: bold; left: 525px; margin: 0; position: absolute; text-align: center; top: 481px;"
      rem_ctn2.style.cssText = rem_sty2;

  
  
  var updateETA2 = function() {
    var potatis = document.getElementById("potatoes").innerHTML ;
potatis = potatis .replace(",","")
var s_remain2 = Math.round(parseInt(potatis) / 11.6771584699)
    var remainHours2 = Math.floor( s_remain2 / 3600 )

    var remainMinutes2 = Math.floor( ( s_remain2 % 3600 ) / 60 )
    var remainSeconds2 = Math.floor ( s_remain2 % 60 )
    var t_str2 = (remainHours2 < 10 ? '0' : '') + remainHours2 + ':'
	    t_str2 += (remainMinutes2 < 10 ? '0' : '') + remainMinutes2 + ':'
	    t_str2 += (remainSeconds2 < 10 ? '0' : '') + remainSeconds2
	  
    rem_ctn2.innerHTML = t_str2

  }
  updateETA2()
	  
  window.setInterval( updateETA2, 1000 )

  con.appendChild(rem_ctn2)
  
  var row = getElementsByClass("game_row")
  var el

  var cpu_bar
  var cpu_now
  var cpu_per
  var cpu_sty = "color: #FFFFFF; font-family: Consolas,Courier,fixed; font-size: 12px; left: 156px; margin: 0; position: absolute; text-align: center; top: 0; width: 457px;"
  
  var cpu_tot = 457
  
  for (var i = 0; i < row.length; i++) { 
    el = row[i]
    cpu_bar = el.children[0]
    if (cpu_bar.style.width.length == 0) {
	  cpu_now = cpu_tot
    } else {
      cpu_now = parseInt(cpu_bar.style.width)
	}
	cpu_per = cpu_now/cpu_tot*100;
	if (cpu_per > 100)
	  cpu_per = 100
	
	var cpu_ctn = document.createElement("p")
	    cpu_ctn.style.cssText = cpu_sty
	    cpu_ctn.innerHTML = Math.round(cpu_per*100)/100 + "%";
        cpu_ctn.title = cpu_per + "%"
  
     el.appendChild(cpu_ctn);	
  }
}())