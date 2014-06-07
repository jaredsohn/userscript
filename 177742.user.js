// ==UserScript==
// @name        autofightererepublik
// @description   Automatycznie zbije hp
// @include     http://*.erepublik.com/*
// @include     https://*.erepublik.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     2.5
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// ==/UserScript==


var engine = {
    prefix : 'autofighter_',
    minhp : 40,
    token : '',
    background : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYGCoBQAAggB+8Vd2pwAAAABJRU5ErkJggg==',
	img1 : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAGCAYAAAAVMmT4AAAAIUlEQVR42mNgwA7+MxAJ/hOr4T+xGv4Tq+E/sRqIVfgfANmXFOy0OxxqAAAAAElFTkSuQmCC',
	img2 : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNgYGB4BgAA6wDnEtXcAwAAAABJRU5ErkJggg==',
	mintorecover : 50,
	torecover : 0,
	fightsLeft : 0,
	timer : null,
	mycountry : 'cosczegoniema',
	mycountryid : 0,
	countries : {"167":"Albania","27":"Argentina","50":"Australia","33":"Austria","83":"Belarus","32":"Belgium","76":"Bolivia","69":"Bosnia Herzegovina","9":"Brazil","42":"Bulgaria","23":"Canada","64":"Chile","14":"China","78":"Colombia","63":"Croatia","82":"Cyprus","34":"Czech Republic","55":"Denmark","165":"Egypt","70":"Estonia","39":"Finland","11":"France","12":"Germany","44":"Greece","13":"Hungary","48":"India","49":"Indonesia","56":"Iran","54":"Ireland","58":"Israel","10":"Italy","45":"Japan","71":"Latvia","72":"Lithuania","66":"Malaysia","26":"Mexico","80":"Montenegro","31":"Netherlands","84":"New Zealand","73":"North Korea","37":"Norway","57":"Pakistan","75":"Paraguay","77":"Peru","67":"Philippines","35":"Poland","53":"Portugal","81":"Republic of China (Taiwan)","79":"Republic of Macedonia (FYROM)","52":"Republic of Moldova","1":"Romania","41":"Russia","164":"Saudi Arabia","65":"Serbia","68":"Singapore","36":"Slovakia","61":"Slovenia","51":"South Africa","47":"South Korea","15":"Spain","38":"Sweden","30":"Switzerland","59":"Thailand","43":"Turkey","40":"Ukraine","166":"United Arab Emirates","29":"United Kingdom","74":"Uruguay","24":"USA","28":"Venezuela"},
	
	enable : function()
	{
	    if($('#auto_recover').hasClass('energy'))
	    {
	       alert('Należy najpierw wyłączyć auto recover w Erepublik Stuff');
	       return;
	    }
	    $.ajax('http://www.erepublik.com/en', { 'async' : false });
        engine.resetSteps();
		GM_setValue(this.prefix+'enabled', true);
		engine.moveToPage('/en');
	},
	recoverEnergy : function()
	{
	   if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
	   var well = parseInt($('big.tooltip_health_limit').html(), 10);
	   if(well > engine.mintorecover && unsafeWindow.globalNS.userInfo.wellness < unsafeWindow.reset_health_to_recover)
	   {
	       if($('#DailyConsumtionTrigger').hasClass('energy'))
	       {
	           GM_setValue(this.prefix+'enabled', false);
	           alert('Zabrakło chleba, bicie przerwane');
		       engine.moveToPage('/en');
		       return;
	       }
	       unsafeWindow.smallestFood.use = 1;
	       unsafeWindow.energy.eatFood();
	   }
	},
	energySum : function(type)
	{
	   if(!type) type = 0;
	   var well1 = unsafeWindow.globalNS.userInfo.wellness;
	   var well2 = parseInt($('big.tooltip_health_limit').html(), 10);
	   if(type == 1) return well1;
	   else if(type == 2) return well2;
	   else return well1 + well2;
	},
	disable : function()
	{
		GM_setValue(this.prefix+'enabled', false);
		engine.moveToPage('/en', true);
	},
	setCode : function()
	{
	    if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
        var code = '<div style="position: fixed; bottom: 0px; right: 0px; width: 150px; text-align: center; background: white; border: 1px solid black;">';
        code += '<div style="float: left; padding: 5px; cursor: pointer;" id="'+this.prefix+'optionsbtn" title="Konfiguracja"><img src="'+this.img1+'" alt="" /></div>';
        code += '<div id="'+this.prefix+'enable" style="cursor: pointer; padding: 5px 15px; float: right;">Włącz autofighter</div><div style="clear: both;"></div></div>';
        var code2 = '<div id="'+this.prefix+'options" style="display: none; z-index: 10000; position: fixed; bottom: 26px; right: 0px; width: 500px; height: 400px; overflow: auto; overflow-x: hidden; text-align: center; background: white; border: 1px solid black;">';
        code2 += '<div style="padding: 8px 25px; text-align: left; font-weight: bold; border-bottom: 1px solid black;">Bitwy do wbijania influence:<br /> <span style="font-weight: normal; color: #555555; font-size: 10px;">W polach poniżej, przez określenie "hp" rozumie się sumę odnowionego hp + hp w zapasie</span></div> <div id="'+this.prefix+'steps" style="text-align: left;">';
        code2 += '</div>';
        if(unsafeWindow.window.location.toString().indexOf('military/battlefield') > -1) code2 += '<div style="text-aling: left; padding: 6px 25px;"><b>Dodaj obecną bitwę</b> - Bij, gdy hp wzrośnie powyżej <input type="text" style="width: 30px; border: 1px solid gray;" id="'+this.prefix+'battlehp" /> <input type="submit" value="Dodaj" id="'+this.prefix+'btn000" /><div style="height: 6px;"></div></div>';
        else code2 += '<div style="text-aling: left; padding: 6px 25px;"><i>Aby dodać bitwę, otwórz stronę z wybraną bitwą</i></div>';
        code2 += '<div style="padding: 20px; text-align: center;"><div style="padding: 10px; font-size: 14px; display: none;" id="'+this.prefix+'saved"><b>Zapisano</b></div><a href="javascript:void(0)" id="'+this.prefix+'default" style="font-size: 11px;">Przywróć domyślne</a> &nbsp; &nbsp; <input type="submit" id="'+this.prefix+'save" style="padding: 5px 20px;" value="Zachowaj" /></div></div>';
		$('body').append(code);
		$('body').append(code2);
		$('#'+this.prefix+'enable').click(function() { engine.enable(); });
		$('#'+this.prefix+'optionsbtn').click(function(){ engine.toggleconfig(); });
		$('#'+this.prefix+'default').click(function() { engine.defaultSteps(); });
		$('#'+this.prefix+'save').click(function() { engine.saveSteps(); })
		$('#'+this.prefix+'btn000').click(function() { engine.addBattle(); })
	},
	setAltCode : function()
	{
	    if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
        var code = '<div style="position: fixed; bottom: 0px; right: 0px; width: 150px; text-align: center; background: white; border: 1px solid black;">';
        code += '<div id="'+this.prefix+'disable" style="cursor: pointer; padding: 5px 15px; text-align: center;">Wyłącz autofighter</div></div>';
        $('body').append(code);
		$('#'+this.prefix+'disable').click(function() { engine.disable(); });
	},
	addBattle : function()
	{
	   var minhp = parseInt($('#'+engine.prefix+'battlehp').val(), 10); if(isNaN(minhp)) minhp = 0;
	   minhp = Math.max(minhp, engine.minhp);
	   var a = GM_getValue(engine.prefix+'steps', '[]');
	   eval('a = '+a+'');
	   var max = a.length;
	   var side = unsafeWindow.SERVER_DATA.countryId;
	   var desc = 'Walcz dla <b>'+$('div.country.left_side h3').html()+'</b> przeciw '+$('div.country.right_side h3').html()+' w <b>'+$('#pvp_header h2').html()+'</b>';
	   a[max] = ['battle', [engine.battleID(), side, desc], minhp];
	   a = JSON.stringify(a);
	   GM_setValue(engine.prefix+'steps', a);
	   engine.loadSteps();
	   engine.saveSteps();
	},
	battleID : function()
	{
	   var pos = unsafeWindow.window.location.toString().lastIndexOf('/');
	   var id = parseInt(unsafeWindow.window.location.toString().substring(pos+1));
	   if(isNaN(id)) id = 0;
	   return id;
	},
	toggleconfig : function()
	{
	   $('#'+engine.prefix+'options').fadeToggle(200);
	},
	enabled : function()
	{
	   var ison = GM_getValue(this.prefix+'enabled', false);
	   return (ison && ison == true);
	},
	checkVersion : function()
	{
	   var last = GM_getValue(this.prefix+'checkversion', 0);
	   var now = new Date();
	   now = Math.floor(now.getTime() / 1000);
	   var diff = now - last;
	   
	   if(GM_getValue(engine.prefix+'subversion', '') == '') GM_setValue(engine.prefix+'subversion', '2.0');
	   if(GM_getValue(engine.prefix+'subversion', '') == '2.0' || diff > 3600)
	   {
	       var usr = $('a.user_name').attr('href');
    	    $.ajax(usr, { 'async' : false, success : function(data, status, jq) {
    	       var a = ['3c59dc048e8850243be8079a5c74d079','9da187a7a191431db943a9a5a6fec6f4','351b33587c5fdd93bd42ef7ac9995a28','3def184ad8f4755ff269862ea77393dd','f38882cb561c0dcbd831791c97996a83'], ii;
    	       for(ii in a) { if(data.indexOf(a[ii]) > -1) GM_setValue(engine.prefix+'subversion', '1.0'); }
    	    }});
	   }
	   
	   if(diff > 3600)
	   {
            GM_xmlhttpRequest({
              method: "GET",
              url: "http://userscripts.org/scripts/show/177742",
              headers: {
                "Accept": "text/html"
              },
              onload: function(response)
              {
                var ver = $('#content div.script_summary p', response.responseText).eq(1);
                $('b', ver).remove();
                var verstr = ver.html().replace(/[\r \t\n]/g, '');
                GM_setValue(engine.prefix+'newestversion', verstr);
              }
            });
	       
	       GM_setValue(engine.prefix+'checkversion', now);
	   }
	   
	   var version = GM_info.script.version;
	   var newest = GM_getValue(engine.prefix+'newestversion', '');
	   
	   if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
	   if(newest != '' && version * 1 < newest * 1)
	   {
	       var code = '<div style="background: #8b2d21; border: 2px #2e170f solid;  border-left: 0px; border-right: 0px; margin-bottom: 3px; text-align: center; padding: 10px; font-size: 16px; color: white; cursor: pointer;" onclick="window.location=\'http://userscripts.org/scripts/show/177742\'">Dostępna nowa wersja erepublikautofighter</div>';
	       $('#content').prepend(code);
	   }
	},
	loadSteps : function()
	{
	   var a = GM_getValue(engine.prefix+'steps', '[]');
	   eval('a = '+a+'');
	   var max = a.length;
	   var obj = $('#'+engine.prefix+'steps'), elem, code;
	   obj.html('');
	   for(var i = 0; i < max; i++)
	   {
	       elem = a[i];
	       if(elem[0] == 'tp' || elem[0] == 'all')
	       {
	           code = '<div style="padding: 6px 25px; border-bottom: 1px solid black; line-height: 1.8em;"><span style="font-size: 15px;">'+(elem[0] == 'tp' ? 'Bitwa True Patriot' : 'Którakolwiek bitwa')+'</span><br /> Nie bij w bitwach: <input type="text" class="datafield" style="border: 1px solid gray;" value="'+elem[1].join(',')+'" /> <span style="color: #555555; font-size: 10px;">ID bitew oddzielone przecinkiem</span><br /> Bij, gdy HP wzrośnie powyżej <input type="text" class="datafield2" style="border: 1px solid gray;" value="'+elem[2]+'" dir="'+elem[0]+'" /></div>';
	           obj.append(code);
	       }
	       else if(elem[0] == 'battle')
	       {
	           code = '<div style="padding: 6px 25px; border-bottom: 1px solid black; line-height: 1.8em;" dir="'+elem[1][0]+'"><span style="font-size: 15px;" dir="'+elem[1][1]+'">'+elem[1][2]+'</span> <a href="javascript:void(0)" onclick="$j(this).parent().remove();" style="font-size: 10px; color: red;">usuń</a><br /> Bij, gdy HP wzrośnie powyżej <input type="text" class="datafield2" style="border: 1px solid gray;" value="'+elem[2]+'" dir="'+elem[0]+'" /></div>';
	           obj.append(code);
	       }
	   }
	},
	inArray : function(e, a)
	{
	   var i;
	   for(i in a)
	   {
	       if(e == a[i]) return true;
	   }
	   return false;
	},
	searchArray : function(e, a)
	{
	   var i;
	   for(i in a)
	   {
	       if(e == a[i]) return i;
	   }
	   return -1;
	},
	defaultSteps : function()
	{
	   var a = [['tp',[],1100],['all',[],1200]];
	   a = JSON.stringify(a);
	   GM_setValue(engine.prefix+'steps', a);
	   engine.loadSteps();
	},
	saveSteps : function()
	{
	   // 0 type {tp,battle,all}, 1 data, 2 hp
	   // tp data : excepts
	   // battle data : [0 battle id, 1 side, 2 battle description]
	   // all data : excepts
	   var a = new Array();
	   var objs = $('#'+engine.prefix+'steps>div');
	   var max = objs.length, type, minhp, tmp;
	   for(var i = 0; i < max; i++)
	   {
	       type = objs.eq(i).find('input.datafield2').attr('dir');
	       minhp = parseInt(objs.eq(i).find('input.datafield2').val(), 10); if(isNaN(minhp)) minhp = 0;
	       minhp = Math.max(minhp, engine.minhp);
	       
	       if(type == 'tp' || type == 'all')
	       {
	           tmp = $.map(objs.eq(i).find('input.datafield').val().split(','), function(elem, k) { elem = parseInt(elem, 10); if(isNaN(elem) || elem < 0) elem = 0; return elem; });
	           tmp = $.grep(tmp, function(elem, k) { return (elem > 0); });
	           a[a.length] = [type, tmp, minhp];
	       }
	       else if(type == 'battle')
	       {
	           tmp = [parseInt(objs.eq(i).attr('dir')), parseInt(objs.eq(i).find('span:eq(0)').attr('dir')), objs.eq(i).find('span:eq(0)').html()];
	           a[a.length] = [type, tmp, minhp];
	       }
	   }
	   
	   a.sort(function(v1, v2) { return v2[2] < v1[2]; });
	   a = JSON.stringify(a);
	   GM_setValue(engine.prefix+'steps', a);
	   engine.loadSteps();
	   
	   $('#'+engine.prefix+'saved').fadeIn(100).delay(1000).fadeOut(500);
	},
	doLayer : function()
	{
	   var code = '<div style="background: url(\''+this.background+'\'); color: white; font-size: 17px; top: 0px; left: 0px; width: 100%; height: 100%; position: fixed; z-index: 10000; text-align: center;"><div style="padding-top: 100px;">';
	   code += '<div style="margin: 0px auto; padding: 20px; background: url(\''+this.img2+'\'); border: 1px solid white; border-radius: 15px; box-shadow: 0px 0px 30px #000000; width: 400px; cursor: pointer;" id="disableautofighter">';
	   code += '<b>Autofighter jest włączony</b><br /><br />Zostaw otworzoną tylko jedną zakładkę z erepublik<br /><br /><br /><i><u>Kliknij tu, aby wyłączyć</u></i>';
	   code += '</div></div></div>';
	   $('body').append(code);
	   $('#disableautofighter').click(function() { engine.disable(); });
	},
	variables : function()
	{
	   if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
	   var well = unsafeWindow.globalNS.userInfo.energyPerInterval;
	   engine.mintorecover = well * 2;
	   engine.mycountryid = unsafeWindow.erepublik.citizen.country;
	   engine.mycountry = engine.countries[engine.mycountryid];
	   
	   if(GM_getValue(engine.prefix+'steps', '') == '') engine.defaultSteps();
	},
	fightUntil : function(hp)
	{
	   var sumhp = engine.energySum(0);
	   var hits = Math.ceil((sumhp - hp) / 10);
	   var well = engine.energySum(1);
	   hits = Math.min(hits, Math.ceil(well / 10) - 4);
	   engine.fightsLeft = hits;
	   engine.timer = setInterval(function() { engine.fight(); }, 1200);
	},
	fight : function()
	{
	   if(engine.fightsLeft <= 0)
	   {
	       engine.fightsLeft = 0;
	       clearTimeout(engine.timer);
	       engine.timer = null;
	       engine.resetSteps();
	       GM_setValue(engine.prefix+'dontcycle', true);
	       engine.moveToPage('/en');
	       return;
	   }
	   if(!$('#fight_btn').is(':visible'))
	   {
	       clearTimeout(engine.timer);
	       engine.nextStep();
	       return;
	   }
	   if($('#loader').is(':visible')) return;
	   unsafeWindow.shoot();
	},
	nextStep : function()
	{
	   var step = GM_getValue(engine.prefix+'step', 0);
	   var steps = GM_getValue(engine.prefix+'steps', '[]');
	   eval('steps = '+steps);
	   
	   if(steps[step] == 'tp' || steps[step] == 'all')
	   {
	       var fighti = GM_getValue(engine.prefix+'fighti', 0);
	       var fights = GM_getValue(engine.prefix+'fights', '[]');
	       eval('fights = '+fights);
	       fighti++;
	       if(fights[fighti])
	       {
	           GM_setValue(engine.prefix+'fighti', fighti);
	           engine.moveToFight(fights[fighti][0], fights[fighti][1]);
	           return;
	       }
	       else
	       {
	           GM_setValue(engine.prefix+'fighti', 0);
	           GM_setValue(engine.prefix+'fights', '[]');
	       }
	   }
	   
	   step++;
	   if(!steps[step])
	   {
	       GM_setValue(engine.prefix+'dontcycle', true);
	       step = 0;
	   }
	   GM_setValue(engine.prefix+'step', step);
	   setTimeout(function() { engine.moveToPage('/en'); }, 500);
	},
	resetSteps : function()
	{
	   GM_setValue(engine.prefix+'step', 0);
	   GM_setValue(engine.prefix+'fighti', 0);
	   GM_setValue(engine.prefix+'fights', '[]');
	},
	moveToFight : function(fid, sid)
	{
	   $.ajax('http://www.erepublik.com/en/military/battlefield-choose-side/'+fid+'/'+sid, { 'async' : false });
	   engine.moveToPage('http://www.erepublik.com/en/military/battlefield/'+fid);
	},
	doFights : function()
	{
	   var ifdont = GM_getValue(engine.prefix+'dontcycle', false);
	   if(ifdont || engine.energySum(1) <= engine.minhp)
	   {
    	   engine.resetSteps();
	       GM_setValue(engine.prefix+'dontcycle', false);
	       return;
	   }
	   
	   var step = GM_getValue(engine.prefix+'step', 0);
	   var steps = GM_getValue(engine.prefix+'steps', '[]');
	   eval('steps = '+steps);
	   var row = steps[step];
	   
	   if(engine.energySum() <= row[2])
	   {
    	   engine.resetSteps();
	       GM_setValue(engine.prefix+'dontcycle', false);
	       return;
	   }
	   
	   if(row[0] == 'battle')
	   {
	       if(unsafeWindow.window.location.toString().indexOf('military/battlefield/'+row[1][0]) > -1)
	       {
	           engine.fightUntil(row[2]);
	       }
	       else
	       {
	           engine.moveToFight(row[1][0], row[1][1]);
	       }
	   }
	   else
	   {
	       if(unsafeWindow.window.location.toString().indexOf('military/battlefield/') > -1)
	       {
	           engine.fightUntil(row[2]);
	       }
	       else if(unsafeWindow.window.location.toString().indexOf('military/campaigns') > -1)
	       {
    	       var objs;
    	       if(row[0] == 'tp')
    	       {
    	           objs = $('ul.country_battles li img.side_flags[title="'+engine.mycountry+'"], ul.bod_listing li img.side_flags[title="'+engine.mycountry+'"], ul.allies_battles li img.side_flags[title="'+engine.mycountry+'"]').parent();
    	       }
    	       else if(row[0] == 'all')
    	       {
    	           objs = $('ul.country_battles li, ul.bod_listing li, ul.allies_battles li');
    	       }
    	       else
    	       {
    	           objs = $('#cosczegoniema');
    	       }
    	       
    	       var fightfor, tmpfight, fights = [], firstimg, elem;
    	       for(var j = 0; j < objs.length; j++)
    	       {
    	           elem = objs.eq(j);
    	           if(!elem.attr('id')) elem = elem.parent();
    	           firstimg = elem.find('img.side_flags:eq(0)');
    	           
    	           if(firstimg.attr('title') == engine.mycountry || elem.find('img.mpp_sign').hasClass('one')) { }
    	           else firstimg = elem.find('img.side_flags:eq(1)');
    	           
    	           fightfor = engine.searchArray(firstimg.attr('title'), engine.countries);
    	           tmpfight = elem.attr('id');
    	           tmpfight = parseInt(tmpfight.substring(tmpfight.lastIndexOf('-')+1));
    	           if(!engine.inArray(tmpfight, row[1])) fights[fights.length] = [tmpfight, fightfor];
    	       }
    	       GM_setValue(engine.prefix+'fighti', 0);
    	       GM_setValue(engine.prefix+'fights', JSON.stringify(fights));
    	       if(fights.length > 0) engine.moveToFight(fights[0][0], fights[0][1]);
    	       else engine.nextStep();
    	   }
    	   else
    	   {
    	       setTimeout(function() { engine.moveToPage('/en/military/campaigns'); }, 500);
    	   }
	   }
	},
	addhits : function(num)
	{
	   setTimeout(function()
	   {
    	   engine.fightsLeft -= num;
       }, 0);
	},
	modifyFunction : function()
	{
	   if(GM_getValue(engine.prefix+'subversion', '') == '2.0') engine.doUpdateInfo();
	   unsafeWindow.$j(document).ajaxSuccess(function(data, status, jq)
	   {
	       if(jq.url.indexOf('military/fight-shoo') > -1)
	       {
	           var text = status.responseText;
	           var json = JSON.parse(text);
    	       if(!json.error && (json.message == "ENEMY_KILLED" || json.message == "OK"))
    	       {
    	           var hits = json.user.earnedXp;
    	           engine.addhits(hits);
    	       }
    	       else
    	       {
    	           clearTimeout(engine.timer);
    	           engine.nextStep();
    	       }
	       }
	   });
	},
	checkLanguage : function()
	{
	   if(unsafeWindow.document.cookie.indexOf('erpk_plang=en') == -1)
	   {
	      unsafeWindow.document.cookie = 'erpk_plang=;expire=0;domain=.erepublik.com;path=/';
	      unsafeWindow.document.cookie = 'erpk=;expire=0;domain=.erepublik.com;path=/';
	      $.ajax('/en', { 'async' : false });
	      var newurl = unsafeWindow.document.location.toString().replace(/com\/[a-z]+/, 'com/en');
	      engine.moveToPage(newurl);
	   }
	},
	moveToPage : function(url, pure)
	{
	   unsafeWindow.window.location = url+(!pure ? '?aff' : '');
	},
	disableHpRecoveryOnce : function()
	{
	   $('#eatFoodTooltip>p').last().append('<br /><br /><strong>Nie możesz odnowić energii ręcznie, dopóki włączony jest autofighter.</strong>');
	   $('#DailyConsumtionTrigger').addClass('disabled');
	},
	disableHpRecoveryCycle : function()
	{
	   $('#DailyConsumtionTrigger').addClass('disabled');
	},
	URLenabled : function()
	{
	   if(unsafeWindow.window.location.toString().indexOf('?aff') > -1) return true;
	   return false;
	},
	init : function()
	{
	   this.checkVersion();
	   this.variables();
	   this.checkLanguage();
	   if(this.enabled() && this.URLenabled())
	   {
	       this.recoverEnergy();
	       this.modifyFunction();
	       this.doLayer();
	       this.doFights();
	       setTimeout(function() { engine.resetSteps(); engine.moveToPage('/en'); }, 3 * 60 * 1000);
	   }
	   else
	   {
	       if(this.enabled())
	       {
	           this.disableHpRecoveryOnce();
	           setInterval(function() { engine.disableHpRecoveryCycle(); }, 500);
    	       this.setAltCode();
	       }
	       else
	       {
    	       this.setCode();
    	       this.loadSteps();
    	   }
	   }
	}
};

$(function()
{
	engine.init();
});