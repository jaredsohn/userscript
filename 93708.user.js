// ==UserScript==
// @name           OGame Redesign: Light Transport
// @namespace      userscripts.org
// @description    Transport all resource to select planet
// @description    Set transport value from spy report on fleet1 page
// @version        0.3.9
// @include        http://*.ogame.*/game/index.php?page=fleet*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==

(function() 
{
	var theHref = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((theHref.indexOf ("/game/index.php?")                  	<  0) ||
	    ((theHref.indexOf ("/game/index.php?page=fleet")      	<  0) &&
	    (theHref.indexOf ("/game/index.php?page=showmessage")   <  0) &&
	    (theHref.indexOf ("/game/index.php?page=messages") 		<  0)))
		return;

	var icon_angriff   = 'data:image/gif;base64,R0lGODlhEQARAPf/AMNRPb1RP/5uVqJHN5hCNJdAMs9YRMpUP8lVQbdOO3c1JplCM7hUQXQxJemCb/3//8dXQshWQshWQcdVQZlBM7hPPblUQZlBMvri3v7///qgkL5WQdGAcaVHNvPPx/qVf/tmS79TP/6FbvHk4PfW1PppUdBZRfxpUIU0JqtDMv7a09VeSshoVYg8LfdqTIs2J/yEb89iUKhENP7k4chXQapGM79NOXgzKKtEMqZIOPiqm8ZaRphBM5M/MNhjTvbk3+pwWsxYQMNTQW4mG/7t68JTP+m8tMt0ZZI4KNxoU/339/mYhd6Je82Jfp1NPe1uVuOEddFbSMVUQcdWQvlsUeWLe7BGMuakl8ZYRb9mVfz+/sFRPapMO/yKcu7a1uzb2PyEbc5dTLZFMdV8bv/9+qtFNPuXgZpCM7VHM+VWPvzSyfzSy7xPO8NUQMZPO300KKlFMvnx761LOqdLOcdSPnQrHfrx79FsWatKN55ENZI9MftnSthiTXgzJb5SP/HIwsxSPqlHOeaBbv1pTchbR7tKOf2Whvnp5OV4ZeJ9af2BaLZTQcx3a/3Vz+Kso8xUQeuqoI09MM55bbhTQPSDbqxEL93Hwd3KyOfTz+7Uz/qSf9RqVvyQe/Xt6tFYQ+/h3dFeR7d/d/pkR/349cpXQ9FdSP3g29y5tKRIN3MxJnUwI8ZsXNRjTuZZRM5VPut4ZuzOyeemnMVaRs2xrcZYR71rWe29tOfFvPz///XPx/r3969HN/2GcadXSpVDNb1JNd5cSMBQRPubhr1PPctbSPza0chOOK5gU7RNPNl7bf39+6lxZ6lHNtNgS/qUgf3EuplPQc5bRbREMtixquFVPuSNfflmSoY2KvXY1II4LIU5LYs1KMNWQ91qUcZMOahTRf3NxPHQytFbR/jY0/nw7rtQPbVPOu+AbJVBMs1jUMZRPLhUQnApHf7//ppCNP38/NJrWvvx76pIN/ZoUp1GNbVRPcdbR9JkULtRP7pQPrlOPNVdScFpV3oyJv///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9BQBABAo0JB0gdQCAhwpQpE/4FM5cvwBZvxGIESRfGGAA/AfAJkYCsiDpPVzqNa5UrDqQVgNqUM2EgAYBoHvytcbaHEzh/2HzQGbZPXAI3ttotAQFDAJgTmsj8ccWGTyk0Yx7osFZsxiAVpqhoyMDkVxJQYoyMmvcMlzBRZt6pcUEknI1uG5glc1DiQxdFjXiJMCSAEpQKzdb1O5ZFSiIgr36ce+IgCota2WRZGDKr065bugSlQUQuU6FPl1QRYsBumb8mtA5hoEYi3j0O/kLVscegwTVLSo6YqAasCit4djDp6bNjUgMU0L74c3Tn0aZYykb02qYAy6JU2l44TJmmxYs0WA9OfUPS4ga3egooDJBRiZ8kfYxWWamRI0+2EFy8wcMAHcgDRwpy4FAGHoGgQk8kc/zjCw8LVEjBGQu4s8AFBaDTAwH/BAQAOw==';
	var LT_ships = new Array();
    LT_ships[202] = {id:202, name:"202", capacity:    5000};   //Малый транспорт
    LT_ships[203] = {id:203, name:"203", capacity:   25000};   //Большой транспорт
    LT_ships[204] = {id:204, name:"204", capacity:      50};   //Лёгкий истребитель
    LT_ships[205] = {id:205, name:"205", capacity:     100};   //Тяжёлый истребитель
    LT_ships[206] = {id:206, name:"206", capacity:     800};   //Крейсер
    LT_ships[207] = {id:207, name:"207", capacity:    1500};   //Линкор
    LT_ships[208] = {id:208, name:"208", capacity:    7500};   //Колонизатор
    LT_ships[209] = {id:209, name:"209", capacity:   20000};   //Переработчик
    LT_ships[210] = {id:210, name:"210", capacity:       0};   //Шпионский зонд
    LT_ships[211] = {id:211, name:"211", capacity:     500};   //Бомбардировщик
    LT_ships[213] = {id:213, name:"213", capacity:    2000};   //Уничтожитель
    LT_ships[214] = {id:214, name:"214", capacity: 1000000};   //Звезда смерти
    LT_ships[215] = {id:215, name:"215", capacity:     750};   //Линейный крейсер

	var isOpera = (window.opera) ? true : false;

	var unsafe = window;
	try {unsafe = unsafeWindow} catch (e) {}
	
	var $ = unsafe.$;
	var session = unsafe.session;

	if ( !$ ) return;

	var lt_qa ='';
	
    var LocalizationStrings = localStorage.getItem('LT_LocalizationStrings');
	if(LocalizationStrings) 
	{
		LocalizationStrings = JSON.parse(LocalizationStrings);
	}
	else
	{
		LocalizationStrings = {"timeunits":{"short":{"year":"\u0433","month":"\u043c","week":"\u043d\u0435\u0434","day":"\u0434","hour":"\u0447","minute":"\u043c","second":"\u0441"}},"status":{"ready":"\u0433\u043e\u0442\u043e\u0432\u043e"},"decimalPoint":".","thousandSeperator":".","unitMega":"\u041c","unitKilo":"\u041a","unitMilliard":"\u0413","error":"\u041e\u0448\u0438\u0431\u043e\u0447\u043a\u0430","loading":"\u0437\u0430\u0433\u0440\u0443\u0437\u043a\u0430...","yes":"\u0434\u0430","no":"\u041d\u0435\u0442","attention":"\u0412\u043d\u0438\u043c\u0430\u043d\u0438\u0435","outlawWarning":"\u0412\u044b \u0441\u043e\u0431\u0438\u0440\u0430\u0435\u0442\u0435\u0441\u044c \u043d\u0430\u043f\u0430\u0441\u0442\u044c \u043d\u0430 \u0441\u0438\u043b\u044c\u043d\u043e\u0433\u043e \u0438\u0433\u0440\u043e\u043a\u0430. \u0415\u0441\u043b\u0438 \u0432\u044b \u043e\u0441\u043c\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u044d\u0442\u043e, \u0437\u0430\u0449\u0438\u0442\u0430 \u043d\u043e\u0432\u0438\u0447\u043a\u0430 \u0431\u0443\u0434\u0435\u0442 \u043e\u0442\u043a\u043b\u044e\u0447\u0435\u043d\u0430 \u0434\u043b\u044f \u0432\u0430\u0441 \u0432 \u0442\u0435\u0447\u0435\u043d\u0438\u0438 7 \u0434\u043d. \u0438 \u0432\u0441\u0435 \u043e\u0441\u0442\u0430\u043b\u044c\u043d\u044b\u0435 \u0438\u0433\u0440\u043e\u043a\u0438 \u0441\u043c\u043e\u0433\u0443\u0442 \u0430\u0442\u0430\u043a\u043e\u0432\u0430\u0442\u044c \u0432\u0430\u0441. \u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b \u0447\u0442\u043e \u0445\u043e\u0442\u0438\u0442\u0435 \u044d\u0442\u043e\u0433\u043e?"};
		if(unsafe.LocalizationStrings) LocalizationStrings = unsafe.LocalizationStrings;
		localStorage.setItem('LT_LocalizationStrings',JSON.stringify(LocalizationStrings));
	}
	
    var myEvent = document.createEvent ("MouseEvents");
    myEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    var txtScript = "var selplan = document.getElementById('lighttrans_sl');\n"+
                    "if ( selplan.selectedIndex != -1)\n"+
                    "{\n"+
						"localStorage.setItem('LT_Target', selplan.options[selplan.selectedIndex].value);\n"+
                        'var coords = selplan.options[selplan.selectedIndex].value.split("#");\n'+
                        "document.getElementsByName('type')[0].value = coords[3];\n"+
                        "document.getElementsByName('mission')[0].value = 3;\n"+
                        "document.getElementsByName('position')[0].value = coords[2];\n"+
                        "document.getElementsByName('system')[0].value = coords[1];\n"+
                        "document.getElementsByName('galaxy')[0].value = coords[0];\n"+
                        '$("'+"form[name='shipsChosen']"+'").each(function(i, e){\n'+
                        "  var action = $(this).attr('action');\n"+
                        "  action += '&sendtrasport=on&type='+coords[3];\n"+
                        "  $(this).attr('action', action);\n"+
                        "});\n";

	var res = 0;
	
	document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
	var stylesheet = document.styleSheets[document.styleSheets.length-1];
	
	stylesheet.insertRule('#speed_plain { list-style-type: none; }',0);
	stylesheet.insertRule('#speed_plain a { text-decoration: none; font-weight:100; }',0);
	stylesheet.insertRule('#speed_plain a { color: #AAAAAA; font-size: 13px;}',0);
	stylesheet.insertRule('#speed_plain a:hover { color: white; }',0);

	stylesheet.insertRule('#lt_queue { margin: 0 auto; width: 90%; border-spacing:0; border:0;}',0);
	stylesheet.insertRule('#fleet1 #buttonz #lt_queue a { text-decoration:none !important; color:#FD8A1C; }',0);
	stylesheet.insertRule('#lt_queue td { border:1px solid grey; border-width:0; padding:1px;}',0);
	stylesheet.insertRule('#buttonz { height:auto !important; }',0);
	// stylesheet.insertRule('',0);
	stylesheet.insertRule('#lighttrans_sl { visibility: visible !important; display: inline !important;}',0);
	stylesheet.insertRule('span.dropdown.currentlySelected.lighttrans_sl  {visibility: hide !important; display: none !important;}',0);

	function tsdpkt(a) {
		r = "";
		vz = "";
		if (a < 0) {
			vz = "-";
		}
		a = Math.abs(a);
		r = a % 1000;
		while (a >= 1000) {
			k1 = "";
			if (a % 1000 < 100) {
				k1 = "0";
			}
			if (a % 1000 < 10) {
				k1 = "00";
			}
			if (a % 1000 == 0) {
				k1 = "00";
			}
			a = Math.abs((a - a % 1000) / 1000);
			r = a % 1000 + LocalizationStrings.thousandSeperator + k1 + r;
		}
		r = vz + r;
		return r;
	}
	
	function LT_showCapacity(node)
	{
			var fleetVal = document.getElementsByClassName('fleetValues');
			var sum_cap = 0, ship, id, capacity=0;
			
			for ( var i=0; i<fleetVal.length; i++ ) {
				ship = fleetVal[i];
				id = ship.id.replace('ship_','');
				if (! (id in LT_ships) ) continue;
				
				capacity = LT_ships[id].capacity;

				if (!isNaN(ship.value) && ship.value>0) {
					sum_cap += ship.value * capacity;
				}
			}

			document.getElementById('LT_capacity').innerHTML = tsdpkt(sum_cap);
			var cap_color = "green";
			if(res > sum_cap) cap_color = "red";
			document.getElementById('LT_capacity').style.color = cap_color;

		return true;
	};

	function mul (txt)
	{
		var pref = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
		if (!txt) return '';
		if(txt.length < 4) return txt;
		var num = parseInt(txt.replace(/\D+/g, ''));
		var se = Math.floor(Math.log(num)/Math.log(1000));
		if(se > 8) return num.toPrecision(3);
		var sb = Math.log(num)/Math.log(1000) - se;
		var sv = Math.pow(1000,sb).toFixed(0);
		var pos = sv.indexOf('.00');
		if(pos > -1) sv=sv.substring(0,pos);
		return sv + pref[se-1];
	};

	function CalcPlunder(container) {
		if(!(document.getElementById('plunder_table'))) {
		
			var LTscript = document.createElement('script');
			LTscript.setAttribute('type','text/javascript');
			LTscript.innerHTML = '\
			function LT_queue_attacks(task)\
			{\
				var LT_queue = localStorage.getItem("LT_Queue");\
				if(!LT_queue) LT_queue = new Array();\
				else LT_queue = JSON.parse(LT_queue);\
				for(var task_idx = 0; task_idx < LT_queue.length; task_idx++) if((LT_queue[task_idx][0] == task[0]) && (LT_queue[task_idx][1] == task[1]) && (LT_queue[task_idx][2] == task[2]) && (LT_queue[task_idx][3] == task[3])) return;\
				LT_queue.push(task);\
				localStorage.setItem("LT_Queue",JSON.stringify(LT_queue));\
			}';
			document.body.appendChild(LTscript);
			var oTab = document.getElementById(container).getElementsByClassName("material spy");
			for (var i=0; i<oTab.length; i++) {
				var resources = oTab[i].getElementsByClassName("item");
				if(resources.length < 3) continue;
				var metal = parseInt(resources[0].nextElementSibling.textContent.replace(/\D/g, ''),10);
				var crystal = parseInt(resources[1].nextElementSibling.textContent.replace(/\D/g, ''),10);
				var deuterium = parseInt(resources[2].nextElementSibling.textContent.replace(/\D/g, ''),10);
				var plunder_metal =  Math.ceil(metal / 2);
				var plunder_crystal = Math.ceil(crystal / 2);
				var plunder_deuterium = Math.ceil(deuterium / 2);
				var target_player = oTab[i].querySelector ("table.material th.area span");
				var target_player_coord = oTab[i].querySelector ("table.material th.area a").textContent.replace(/[\[\]]/g,'').split(':');
				var percent = "50";
				if (target_player)
				{
					if (target_player.className.indexOf ("rank_bandit") >= 0)
					{
						plunder_metal =  metal;
						plunder_crystal = crystal;
						plunder_deuterium = deuterium;
						percent = "100";
					}
					else if (target_player.className.indexOf ("status_abbr_honorableTarget") >= 0)
					{
						plunder_metal =  metal * 3 / 4;
						plunder_crystal = crystal * 3 / 4;
						plunder_deuterium = deuterium * 3 / 4;
						percent = "75";
					}
					else if (target_player.nextElementSibling) if(target_player.nextElementSibling.className.indexOf ("status_abbr_honorableTarget") >= 0)
					{
						plunder_metal =  metal * 3 / 4;
						plunder_crystal = crystal * 3 / 4;
						plunder_deuterium = deuterium * 3 / 4;
						percent = "75";
					}

				}

				//+10% 
				// plunder_metal *=  1.10;
				// plunder_crystal *=  1.10;
				// plunder_deuterium *=  1.10;
				
				var total = metal + crystal + deuterium;
				var loot_procent = percent;

				var capacity_needed =
					Math.max(	plunder_metal + plunder_crystal + plunder_deuterium,
								Math.min(	(2 * plunder_metal + plunder_crystal + plunder_deuterium) * 3 / 4,
											(2 * plunder_metal + plunder_deuterium)
										)
							);
				var small_cargos = Math.ceil(capacity_needed/LT_ships[202].capacity);
				var large_cargos = Math.ceil(capacity_needed/LT_ships[203].capacity);
				var AHref = oTab[i].parentNode.getElementsByClassName("btn_blue")[0].href;
				var TypeTarget = AHref.match(/&type=\d+/).toString().match(/\d+/);
				oTab[i].parentNode.getElementsByClassName("btn_blue")[0].href += '&c_n='+Math.ceil(capacity_needed).toString();

				var plunder_table = document.createElement("table");
				plunder_table.id = 'plunder_table';
				plunder_table.className = 'fleetdefbuildings spy';
				var plunder_table_txt  = '<tr><th class="area" colspan="6">Loot ('+loot_procent.toString()+'%)</th></tr>';
				plunder_table_txt += '<tr><td class="value">Wave</td><td class="value">Loot</td><td class="value">Capacity</td><td class="value">SC</td><td class="value">LC</td><td class="value">Queue</td></tr>';
				total=total*loot_procent/100;

				if(container == 'messageContent') 
				{
					var mobj = oTab[i].parentNode.parentNode.parentNode.previousElementSibling.getElementsByClassName("from")[0];
					mobj.innerHTML = 'Loot:<a style="color: red; font-weight: bolder;"  href="javascript:void(0);" onclick="LT_queue_attacks(['+Math.ceil(capacity_needed).toString()+','+target_player_coord.toString()+','+TypeTarget.toString()+']); this.parentNode.parentNode.style.display = '+"'"+'none'+"'"+'; return false;">'+mul(Math.ceil(total).toString())+'</a>'+
					                   'SC:<a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&sc='+small_cargos+'">'+mul(small_cargos.toString())+'</a>'+
									   'LC:<a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&lc='+large_cargos+'">'+mul(large_cargos.toString())+'</a>';
				}

				plunder_table_txt += '<tr><td class="value">1</td><td class="value">'+tsdpkt(Math.ceil(total))+'</td><td class="value">'+tsdpkt(Math.ceil(capacity_needed))+'</td><td class="value"><a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&sc='+small_cargos+'">'+tsdpkt(small_cargos)+'</a></td><td class="value"><a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&lc='+large_cargos+'">'+tsdpkt(large_cargos)+'</a></td><td class="value"><a href="javascript:void(0);" onclick="LT_queue_attacks(['+Math.ceil(capacity_needed).toString()+','+target_player_coord.toString()+','+TypeTarget.toString()+']); this.parentNode.parentNode.style.display = '+"'"+'none'+"'"+'; return false;" style="color: red; font-weight: bolder;">+</a></td></tr>';
				for(var j=2;j<=4;j++) {
					capacity_needed = capacity_needed*loot_procent/100;
					total=total*loot_procent/100;
					small_cargos = Math.ceil(capacity_needed/LT_ships[202].capacity);
					large_cargos = Math.ceil(capacity_needed/LT_ships[203].capacity);
					plunder_table_txt += '<tr><td class="value">'+j+'</td><td class="value">'+tsdpkt(Math.ceil(total))+'</td><td class="value">'+tsdpkt(Math.ceil(capacity_needed))+'</td><td class="value"><a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&sc='+small_cargos+'">'+tsdpkt(small_cargos)+'</a></td><td class="value"><a style="color: #FD8A1C; font-weight: bolder;" href="'+AHref+'&c_n='+Math.ceil(capacity_needed).toString()+'&lc='+large_cargos+'">'+tsdpkt(large_cargos)+'</a></td><td class="value"><a href="javascript:void(0);" onclick="LT_queue_attacks(['+Math.ceil(capacity_needed).toString()+','+target_player_coord.toString()+','+TypeTarget.toString()+']); this.parentNode.parentNode.style.display = '+"'"+'none'+"'"+'; return false;" style="color: red; font-weight: bolder;">+</a></td></tr>';
				}
				plunder_table.innerHTML  = plunder_table_txt;
				oTab[i].parentNode.insertBefore (plunder_table, oTab[i].nextSibling);
			}
		}
	}

    getCoordsFromPlanet = function(planet)
    {
        if (!planet) return { galaxy:0, system:0, planet:0, type:0, name:'' };

        var name = planet.getElementsByClassName("planet-name")[0].textContent;
        var coords = planet.getElementsByClassName("planet-koords")[0].textContent;
        var type = 1;
        coords = coords.replace(/[\[\]]/g,'').split(':');
        var res = {
            galaxy: parseInt(coords[0],10),
            system: parseInt(coords[1],10),
            planet: parseInt(coords[2],10),
            type: type,
            name: name
        }
        return res;
    }

    function isEmpty(str) {
        for (var i = 0; i < str.length; i++)
            if (" " != str.charAt(i))
                return false;
        return true;
    }
	
	//Antigame
	runScript = function (code)
	{
		if (!code || code=="") return;
		var script = document.createElement('script');
		script.setAttribute('type','text/javascript');
		if (isOpera)
		{
			script.innerText = code;
		}
		else
		{
			script.innerHTML = code;
		}
		document.body.appendChild(script);
		setTimeout(function(){script.parentNode.removeChild(script)}, 0);
	}

	// expandSpeed = function()
	// {
		// var html = '';
		// for (var i=1; i<=10; i++)
			// html += '<a href="javascript:void(0);" rel="'+i+'">' + (i*10) + (i==10?' %':'')+'</a> ';
		// var code = '\
		// $("<li>")\
			// .attr("id","speed_plain")\
			// .html(\'' + html + '\')\
			// .find("a")\
				// .bind("click", function(){ $("#speed").attr("value",this.getAttribute("rel")); updateVariables(); })\
			// .end()\
			// .appendTo("#fleetBriefingPart1")\
		// .parent()\
			// .css("margin-bottom","-3px");\
		// ';
		// runScript(code);
	// }

   try {
        if (document.location.href.indexOf('showmessage') > -1) 
        {
            CalcPlunder("messagebox");
        }
        if ( document.location.href.indexOf('messages') > -1 ) 
        {
            $(document).ajaxSuccess(function(e,xhr,settings){
                   CalcPlunder("messageContent");
            });
        }
        
        if (document.location.href.indexOf('page=fleet3') > -1) {
            if (document.location.href.indexOf('&sendtrasport=on') > -1) {
                try { if(unsafe.returnLink) { unsafe.returnLink += '&sendtrasport=on'; } }
                    catch(e) { if(window.returnLink) { window.returnLink += '&sendtrasport=on'; } }
				runScript('setTimeout(function(){maxAll();updateVariables();},0)');
            } 
			$('#start').bind("click", function(){
				var LT_queue = localStorage.getItem('LT_Queue');
				var LT_qu = localStorage.getItem('LT_Queue_Target');
				if(LT_queue.length > 0  && LT_qu.length > 0) {
					LT_queue = JSON.parse(LT_queue);
					LT_qu = JSON.parse(LT_qu);
					for(var task_idx = 0; task_idx < LT_queue.length; task_idx++) if((LT_queue[task_idx][0] == LT_qu[0]) && (LT_queue[task_idx][1] == LT_qu[1]) && (LT_queue[task_idx][2] == LT_qu[2]) && (LT_queue[task_idx][3] == LT_qu[3])) LT_queue.splice(task_idx,1);
					if(LT_queue.length > 0)	localStorage.setItem('LT_Queue',JSON.stringify(LT_queue));
					else localStorage.removeItem('LT_Queue');
					localStorage.removeItem('LT_Queue_Target'); 
				}
			});
		}

        if ((document.location.href.indexOf('page=fleet2') > -1) && !(document.location.href.indexOf('&cp=') > -1)) {
            if (document.location.href.indexOf('&sendtrasport=on') > -1) {
                $("form[name='details']").each(function(i, e){
                  var action = $(this).attr('action');
                  action += '&sendtrasport=on';
                  $(this).attr('action', action);
                });
                try { if(unsafe.returnLink) { unsafe.returnLink += '&sendtrasport=on'; } }
                catch(e) { if(window.returnLink) { window.returnLink += '&sendtrasport=on'; } }
                // document.getElementById('pbutton').dispatchEvent (myEvent);
                // if (document.location.href.indexOf('&type=3') > -1) {
                    // document.getElementById('mbutton').dispatchEvent (myEvent);
                // }
            }
            // if(!document.getElementById('speed_plain')) 
            // {
				// expandSpeed();
			// }
        }
            
        if ((document.location.href.indexOf('page=fleet1') > -1) || ((document.location.href.indexOf('page=fleet2') > -1) && (document.location.href.indexOf('&cp=') > -1)))
        {
			localStorage.removeItem('LT_Queue_Target'); 
			var parent_div = document.getElementsByClassName('allornonewrap')[0];
			if(!parent_div) 
			{
				parent_div = document.getElementById('warning');
			}

			var sl_target = localStorage.getItem('LT_Target');
			if(!sl_target) sl_target = "";

			lt_qa = localStorage.getItem('LT_Queue');
			if(lt_qa) 
			{
				lt_qa = JSON.parse(lt_qa);
				if(parent_div) 
				{
					var qatack = document.createElement('table');
					qatack.id = 'lt_queue';
					var table_html =	'<tr><th><img src="'+icon_angriff+'" style="background-color:red; outline: thin solid white; height:17px; width:17px"> Queue</th><th colspan="4"></th><th style="text-align:right;"><a id="lt_queue_clear" href="javascript:void(0);" style="color: #FD8A1C;">Clear</a></th></tr>'+
										'<tr><td style="text-align:center; background-color:#23282D;">Coord</td><td style="text-align:center; background-color:#23282D;">Type</td><td style="text-align:right; background-color:#23282D;">Capacity</td><td style="text-align:right; background-color:#23282D;">SC</td><td style="text-align:right; background-color:#23282D;">LC</td><td style="text-align:center; background-color:#23282D;">del</td></tr>';
					var ship202 = qa_script202 = ship203 = qa_script203 = qa_del = '';
					for(var i=0; i < lt_qa.length; i++) {
						ship202 = Math.ceil(lt_qa[i][0]/LT_ships[202].capacity);
						qa_script202 = 'onclick="\
													document.getElementsByName('+"'"+'type'+"'"+')[0].value ='+lt_qa[i][4]+';\
													document.getElementsByName('+"'"+'mission'+"'"+')[0].value = 1;\
													document.getElementsByName('+"'"+'position'+"'"+')[0].value ='+lt_qa[i][3]+';\
													document.getElementsByName('+"'"+'system'+"'"+')[0].value ='+lt_qa[i][2]+';\
													document.getElementsByName('+"'"+'galaxy'+"'"+')[0].value ='+lt_qa[i][1]+';\
													document.getElementById('+"'"+'ship_202'+"'"+').value ='+ship202+';\
													document.getElementById('+"'"+'ship_202'+"'"+').onchange(); \
													localStorage.setItem('+"'"+'LT_Queue_Target'+"'"+','+"'"+JSON.stringify(lt_qa[i])+"'"+');\
													document.getElementById('+"'"+'continue'+"'"+').onclick(); return false;"';
						ship203 = Math.ceil(lt_qa[i][0]/LT_ships[203].capacity);
						qa_script203 = 'onclick="\
													document.getElementsByName('+"'"+'type'+"'"+')[0].value ='+lt_qa[i][4]+';\
													document.getElementsByName('+"'"+'mission'+"'"+')[0].value = 1;\
													document.getElementsByName('+"'"+'position'+"'"+')[0].value ='+lt_qa[i][3]+';\
													document.getElementsByName('+"'"+'system'+"'"+')[0].value ='+lt_qa[i][2]+';\
													document.getElementsByName('+"'"+'galaxy'+"'"+')[0].value ='+lt_qa[i][1]+';\
													document.getElementById('+"'"+'ship_203'+"'"+').value ='+ship203+';\
													document.getElementById('+"'"+'ship_203'+"'"+').onchange(); \
													localStorage.setItem('+"'"+'LT_Queue_Target'+"'"+','+"'"+JSON.stringify(lt_qa[i])+"'"+');\
													document.getElementById('+"'"+'continue'+"'"+').onclick(); return false;"';
						qa_del = 'onclick="\
							this.parentNode.parentNode.style.display = '+"'"+'none'+"'"+';\
							var LT_queue = localStorage.getItem('+"'"+'LT_Queue'+"'"+');\
							if(LT_queue) {\
							LT_queue = JSON.parse(LT_queue);\
							for(var task_idx = 0; task_idx < LT_queue.length; task_idx++) if((LT_queue[task_idx][0] == '+lt_qa[i][0]+') && (LT_queue[task_idx][1] == '+lt_qa[i][1]+') && (LT_queue[task_idx][2] == '+lt_qa[i][2]+') && (LT_queue[task_idx][3] == '+lt_qa[i][3]+')) LT_queue.splice(task_idx,1);\
							if(LT_queue.length > 0)	localStorage.setItem('+"'"+'LT_Queue'+"'"+',JSON.stringify(LT_queue));\
							else {localStorage.removeItem('+"'"+'LT_Queue'+"'"+'); document.getElementById('+"'"+'lt_queue'+"'"+').parentNode.removeChild(document.getElementById('+"'"+'lt_queue'+"'"+'));}\
							}\
							return false;"';

						table_html +=	'<tr><td style="text-align:center;">['+lt_qa[i][1]+':'+lt_qa[i][2]+':'+lt_qa[i][3]+']</td><td style="text-align:center;">'+((lt_qa[i][4] == 3)?'moon':' ')+'</td><td style="text-align:right;">'+tsdpkt(lt_qa[i][0])+'</td><td style="text-align:right;"><a href="javascript:void(0);" style="color: #FD8A1C;"'+qa_script202+'>'+tsdpkt(ship202)+'</a></td><td style="text-align:right;"><a href="javascript:void(0);" style="color: #FD8A1C;"'+qa_script203+'>'+tsdpkt(ship203)+'</a></td><td style="text-align:center;"><a href="javascript:void(0);" style="color: #FD8A1C;" '+qa_del+'> - </a></td></tr>';
					}
						  
					qatack.innerHTML += table_html;
					parent_div.appendChild(qatack);
					$('#lt_queue_clear').bind("click", function(){lt_qu = new Array(); localStorage.removeItem('LT_Queue'); document.getElementById('lt_queue').parentNode.removeChild(document.getElementById('lt_queue'));});
				}
			}

            //No fleet
            if(!document.getElementById('buttonz')) return;
			$('form li')
				.filter( function() {return !isNaN(this.id.replace('button','')) } )
				.each( function(){LT_ships[parseInt(this.id.replace('button',''))].name = this.getElementsByClassName('textlabel')[0].textContent;});
            
            var nameMT = LT_ships[202].name; //document.getElementById('button202').getElementsByClassName('textlabel')[0].textContent;
            var nameBT = LT_ships[203].name; //document.getElementById('button203').getElementsByClassName('textlabel')[0].textContent;
            var carryMT = parseInt(document.getElementById('button202').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var carryBT = parseInt(document.getElementById('button203').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var carryPR = parseInt(document.getElementById('button209').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var namePR = LT_ships[209].name; //document.getElementById('button209').getElementsByClassName('textlabel')[0].textContent;
            var carryZS = parseInt(document.getElementById('button214').getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            var nameZS = LT_ships[214].name; //document.getElementById('button214').getElementsByClassName('textlabel')[0].textContent;

            var vHref = document.location.href;
            var scT = vHref.match(/&sc=\d+/);
            var lcT = vHref.match(/&lc=\d+/);
            var cnT = vHref.match(/&c_n=\d+/);
   
            var slinks = [];
            var sl_select = "";
			var sl_value = "";
            var MT0 = MT = BT0 = BT = PR = PR0 = ZS = ZS0 = 0;
            var elements = document.getElementsByClassName("smallplanet");
            for( var i = 0; i < elements.length; i++ )
				{
                    var div = elements[ i ];
                    var s = getCoordsFromPlanet(div) ;
					sl_value = s.galaxy+'#'+s.system+'#'+s.planet+'#1';
                    sl_select += '<option'+ ((sl_value == sl_target)? ' selected' : '')+' value="'+sl_value+'">'+s.name+' ('+s.galaxy+':'+s.system+':'+s.planet+')</option>\n';
					if(div.getElementsByClassName("moonlink").length > 0) {
						sl_value = s.galaxy+'#'+s.system+'#'+s.planet+'#3';
						sl_select += '<option'+ ((sl_value == sl_target)? ' selected' : '')+' value="'+sl_value+'">'+'Moon'+' ('+s.galaxy+':'+s.system+':'+s.planet+')</option>\n';
					}
                }
            if(isEmpty(sl_select)) sl_select = '<option value="---"> --- </option>';
           
            // res = parseInt(document.getElementById('resources_metal').textContent.replace(/\D/g, ''),10) +
                        // parseInt(document.getElementById('resources_crystal').textContent.replace(/\D/g, ''),10) +
                        // parseInt(document.getElementById('resources_deuterium').textContent.replace(/\D/g, ''),10);
			// $.ajax({
				// url : 'http://' + $('meta[name=ogame-universe]').attr('content')+'/game/index.php?page=fetchResources&ajax=1',
				// dataType : "json",
				// async : false
			// })
			// .done(function (data) {
				// res = data.metal.resources.actual+data.crystal.resources.actual+data.deuterium.resources.actual;
			// });
			var currentResources;
			var newResourcesReloader = unsafe.reloadResources;
			unsafe.reloadResources = function(data) {currentResources = data};
			unsafe.initAjaxResourcebox();
			unsafe.reloadResources = newResourcesReloader;
			res = currentResources.metal.resources.actual+currentResources.crystal.resources.actual+currentResources.deuterium.resources.actual;

            MT0 = Math.ceil(res / LT_ships[202].capacity);
            BT0 = Math.ceil(res / LT_ships[203].capacity);
            PR0 = Math.ceil(res / LT_ships[209].capacity);
            ZS0 = Math.ceil(res / LT_ships[214].capacity);
            
            ZS = Math.ceil(res / LT_ships[214].capacity);
            res0 = 0;
            if(ZS > carryZS) ZS = carryZS;
            res0 = res - ZS * LT_ships[214].capacity;
            if(res0 > 0) {
                BT = Math.ceil(res0 / LT_ships[203].capacity);
                if(BT > carryBT) BT = carryBT;
                res0 -= BT * LT_ships[203].capacity;
                if(res0 > 0) {
                    MT = Math.ceil(res0 / LT_ships[202].capacity);
                    if(MT > carryMT) MT = carryMT;
                    res0 -= MT * LT_ships[202].capacity;
                    if(res0 > 0) {
                        PR = Math.ceil(res0 / LT_ships[209].capacity);
                        if(PR > carryPR) PR = carryPR;
                        res0 = res - ZS * LT_ships[214].capacity - BT * LT_ships[203].capacity - PR * LT_ships[209].capacity;
                        if(res0 > 0) {
                            MT = Math.ceil(res0 / LT_ships[202].capacity);
                            if(MT > carryMT) MT = carryMT;
                        }
                    }
                }
            }

            var expofleet = document.createElement('div');
            expofleet.id = 'lightexpofleet';
                expofleet.innerHTML =   '<center><table cellspacing="7px">'+
										'<tr><td align="right">Capacity need: </td><td align="right">'+tsdpkt(res)+' /</td><td align="left" id="LT_capacity">0</td><td></tr>'+
                                        '<tr><td style="padding: 3px;"><span><select id="lighttrans_sl" class="lighttrans_sl" style="background-color: black !important; color: white !important; height: 20px !important;">'+sl_select+'</select></span></td>'+
                                        '<td style="padding: 3px;" align="right"><a href="#" ONCLICK="alert(0); return false;"  id="lighttfbut">'+nameMT+": "+tsdpkt(MT0)+'</a></td>'+
                                        '<td style="padding: 3px;" align="right"><a href="#" ONCLICK="alert(0); return false;"  id="lighttfbut1">'+nameBT+": "+tsdpkt(BT0)+'</a></td></tr>'+
                                        '<tr><td style="padding: 3px;" align="right"><a href="#" ONCLICK="alert(0); return false;"  id="lighttfbutp">'+namePR+": "+tsdpkt(PR0)+'</a></td>'+
                                        '<td style="padding: 3px;" align="right"><a href="#" ONCLICK="alert(0); return false;"  id="lighttfbutz">'+nameZS+": "+tsdpkt(ZS0)+'</a></td>'+
                                        '<td style="padding: 3px;" align="right"><a href="#" ONCLICK="alert(0); return false;"  id="lighttfbut2" class="tipsTitle" title="Mix|'+nameMT+": "+tsdpkt(MT)+'<br />'+nameBT+": "+tsdpkt(BT)+'<br />'+namePR+": "+tsdpkt(PR)+'<br />'+nameZS+": "+tsdpkt(ZS)+'">Mix : '+tsdpkt(MT)+'/'+tsdpkt(BT)+'/'+tsdpkt(PR)+'/'+tsdpkt(ZS)+'</a></td></tr></table></center>';
         
            document.getElementById ('sendall').parentNode.parentNode.parentNode.insertBefore (expofleet, document.getElementById ('sendall').parentNode.parentNode);
           
            expofleet.style.paddingTop = '0px'; 
            expofleet.style.paddingBottom = '0px';
            
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('lighttfbut').onclick=function(){\n"+txtScript+
                        "document.getElementById('ship_202').value ="+MT0.toString()+";\n"+
                        "document.getElementById('ship_202').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n"+
                    "}\n";
            document.getElementById('lighttfbut').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('lighttfbut1').onclick=function(){\n"+txtScript+
                        "document.getElementById('ship_203').value ="+BT0.toString()+";\n"+
                        "document.getElementById('ship_203').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n"+
                    "}\n";
            document.getElementById('lighttfbut1').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('lighttfbutp').onclick=function(){\n"+txtScript+
                        "document.getElementById('ship_209').value ="+PR0.toString()+";\n"+
                        "document.getElementById('ship_209').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n"+
                    "}\n";
            document.getElementById('lighttfbutp').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('lighttfbut2').onclick=function(){\n"+txtScript+
                        "document.getElementById('ship_202').value ="+MT.toString()+";\n"+
                        "document.getElementById('ship_202').onchange();\n"+
                        "document.getElementById('ship_203').value ="+BT.toString()+";\n"+
                        "document.getElementById('ship_203').onchange();\n"+
                        "document.getElementById('ship_209').value ="+PR.toString()+";\n"+
                        "document.getElementById('ship_209').onchange();\n"+
                        "document.getElementById('ship_214').value ="+ZS.toString()+";\n"+
                        "document.getElementById('ship_214').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n"+
                    "}\n";
            document.getElementById('lighttfbut2').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('lighttfbutz').onclick=function(){\n"+txtScript+
                        "document.getElementById('ship_214').value ="+ZS0.toString()+";\n"+
                        "document.getElementById('ship_214').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n"+
                    "}\n";
            document.getElementById('lighttfbutz').appendChild(expscript);

			unsafe.old_check_Ships = unsafe.checkShips;
			unsafe.checkShips = function(form) { LT_showCapacity(); unsafe.old_check_Ships(form) }
			$('input.fleetValues').bind('focus', function(){ LT_showCapacity() } );

			if(scT) {
				$('#ship_202').val(scT.toString().match(/\d+/)).keyup ();
			} 
			if(lcT) {
				$('#ship_203').val(lcT.toString().match(/\d+/)).keyup ();
			} 
       } 
   }
   catch (e) {alert(e);}
}) ()
