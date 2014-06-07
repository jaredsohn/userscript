// ==UserScript==
// @name        zbiorkowy
// @description   Automat do zbiórek MON
// @include     http://*.erepublik.com/*
// @include     https://*.erepublik.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.02
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// ==/UserScript==

var engine = {
	prefix : 'zbiorkowy_',
	timer : null,
	started : false,
	timer2 : null,
	counthitsen : 0,
	background: 'data:image/png;base64,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GDoAYOgAgKEDgKFLAACGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahi4BABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYugQAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQOAoQMAhg4AGDoAYOgAYOgAgKEDAIYOABg6ABg6AGDoAIChAwCGDgCGDgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AGDoAGDoAIChAwCGDgAYOgAYOgBg6ACAoQMAhg4Ahg4AGDoAYOgAgKEDgKEDAIYOABg6AHCzAAAA//8DAIOSBIHyPvxdAAAAAElFTkSuQmCC',
	
	
	resethits : function()
	{
		GM_setValue(engine.prefix+'hits', 0);
	},
	checkVersion : function()
	{
	   var last = GM_getValue(this.prefix+'checkversion', 0);
	   var now = new Date();
	   now = Math.floor(now.getTime() / 1000);
	   var diff = now - last;
	   
	   if(diff > 3600)
	   {
            GM_xmlhttpRequest({
              method: "GET",
              url: "http://userscripts.org/scripts/show/179631",
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
	   
	   if(newest != '' && version * 1 < newest * 1)
	   {
	       var code = '<div style="background: #8b2d21; border: 2px #2e170f solid; border-left: 0px; border-right: 0px; margin-bottom: 3px; text-align: center; padding: 10px; font-size: 16px; color: white; cursor: pointer;" onclick="window.location=\'http://userscripts.org/scripts/show/179631\'">Dostępna nowa wersja automatu zbiórkowego MON</div>';
	       $('#content').prepend(code);
	   }
	},
	adaptHits : function()
	{
       var wrote = parseInt($('#hityinput').val(), 10);
       if(isNaN(wrote)) wrote = 0;
	   GM_setValue(engine.prefix+'hits', GM_getValue(engine.prefix+'hits', 0) + wrote);
	   $('#hityinput').val('');
	},
	getfirepower : function(link, my)
	{
	   var q = 0;
	   if(link.indexOf('q1.') > 0) q = 20;
	   else if(link.indexOf('q2.') > 0) q = 40;
	   else if(link.indexOf('q3.') > 0) q = 60;
	   else if(link.indexOf('q4.') > 0) q = 80;
	   else if(link.indexOf('q5.') > 0) q = 100;
	   else if(link.indexOf('q6.') > 0) q = 120;
	   else if(link.indexOf('q7.') > 0) q = 200;
	   else if(link.indexOf('q10.') > 0 || link.indexOf('q10_') > 0) q = my ? -1 : 100;
	   return q;
	},
	calchits : function()
	{
	   var enweapon = engine.getfirepower($("#enemy_weapon").attr('src'), false);
	   var myweapon = engine.getfirepower($('#scroller img').last().attr('src'), true);
	   var enstr = parseInt($('#enemy_skill').html().replace(/,/g, ''), 10);
	   var mystr = parseInt($('#fighter_skill').html().replace(/,/g, ''), 10);
	   var enhp = $('#enemy_life').attr('original-title') || $('#enemy_life').attr('title');
	   enhp = parseInt(enhp.substring(enhp.lastIndexOf(' ') + 1), 10);
	   var damage = Math.ceil((60 + ((mystr-enstr)/10)) * (1 + (myweapon-enweapon)/400) / 2 - 0.5);
       var hits = Math.ceil(enhp / damage);
	   if(myweapon == -1) hits = 1;
       return hits;
	},
	fight : function()
	{
	   if(!engine.started) return;
	   var left = GM_getValue(engine.prefix+'hits', 0);
	   var hits = engine.calchits();
	   var hppoints = unsafeWindow.erepublik.citizen.energy;
	   
	   if(left < hits)
	   {
	       engine.stopfightlayer();
	       return;
	   }
	   if(hppoints < 10 || hppoints / 10 < hits)
	   {
	       if($('#DailyConsumtionTrigger').hasClass('energy'))
	       {
	           engine.stopfightlayer();
	           return;
	       }
	       else
	       {
    	       unsafeWindow.smallestFood.use = 1;
               unsafeWindow.energy.eatFood();
               return;
           }
	   }
	   
	   if($('#loader').is(':visible')) return;
	   
	   unsafeWindow.shoot();
	},
	startfight : function()
	{
	   engine.started = true;
	   engine.timer = setInterval(function() { engine.fight(); }, 1200);
	   engine.fight();
	},
	refresh : function()
	{
	   $('#hity_zapas').html(GM_getValue(engine.prefix+'hits', 0));
	},
	stopfight : function()
	{
	   engine.started = false;
	   clearTimeout(engine.timer);
	},
	stopfightlayer : function()
	{
	   $('#cancelfight').hide();
	   $('#fighthity').show();
	   engine.stopfight();
	   engine.refresh();
	},
	addhits : function(num)
	{
	   setTimeout(function()
	   {
    	   var left = GM_getValue(engine.prefix+'hits', 0) - num;
    	   GM_setValue(engine.prefix+'hits', Math.max(0,left));
    	   engine.refresh();
       }, 0);
	},
	modifyfunction : function()
	{
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
    	           if(engine.iscounthits()) engine.addcounthits(hits);
    	       }
    	       else
    	       {
    	           //engine.stopfightlayer();
    	       }
	       }
	   });
	},
	iscounthits : function()
	{
	   return engine.counthitsen;
	},
	iscounthitsbase : function()
	{
	   return GM_getValue(engine.prefix+'counthits', 0);
	},
	startcounthits : function()
	{
	   GM_setValue(engine.prefix+'counthits', 1);
	   engine.counthitsen = 1;
	   $('#zbiorkaoff').show();
	   $('#zbiorkaon').hide();
	   if(engine.timer2 != null) clearTimeout(engine.timer2);
	   engine.timer2 = setInterval(function(){ engine.counthitsrefresh(); }, 100);
	},
	stopcounthits : function()
	{
	   GM_setValue(engine.prefix+'counthits', 0);
	   engine.counthitsen = 0;
	   $('#zbiorkaon').show();
	   $('#zbiorkaoff').hide();
	   if(engine.timer2 != null) clearTimeout(engine.timer2);
	   engine.counthitsrefresh();
	},
	addcounthits : function(c)
	{
	   setTimeout(function(){ GM_setValue(engine.prefix+'counterhits', GM_getValue(engine.prefix+'counterhits', 0) + c); }, 0);
	},
	resetcounthits : function()
	{
	    GM_setValue(engine.prefix+'counterhits', 0);
	    engine.counthitsrefresh();
	},
	counthitsrefresh : function()
	{
	   var text = GM_getValue(engine.prefix+'counterhits', 0)+''
	   if(!engine.iscounthits()) text = '<span style="color: #cccccc;">'+text+'</span>';
	   $('#hity_zbiorka').html(text);
	},
	init : function()
	{
		this.checkVersion();
		if(window.location.toString().indexOf('military/battlefield/') > 0 && $('#fight_btn').is(':visible'))
		{
		  var text = '<div style="width: 200px; line-height: 1.6em; color: white; background: url(\''+engine.background+'\'); border: 0px; -webkit-border-radius: 5px; -moz-border-radius: 5px; z-index: 100; border-radius: 5px; position: absolute; box-shadow: 0px 0px 10px #000000; top: 321px; left: 282px; text-align: center; font-size: 11px;"><div style="padding: 5px;">';
		  text += 'Hity: <input type="text" id="hityinput" value="" style="font-size: 11px; color: black; background: white; border: 1px solid black; width: 26px; padding: 1px 0px; text-align: center;" maxlength="4" /> <input type="submit" value="Fight" id="fighthity" style="padding: 0px; font-size: 11px;" /><input type="submit" value="Stop" id="cancelfight" style="padding: 0px; font-size: 11px;" />';
		  text += ' &nbsp;&nbsp; Zostało: <b id="hity_zapas">0</b> <a href="javascript:void(0);" style="color: #ff4444; font-size: 10px;" id="resethity">reset</a>';
		  text += '<br />Suma hitów: <b id="hity_zbiorka">0</b> <a href="javascript:void(0);" style="color: #44ff44; font-size: 10px;" id="zbiorkaon">zliczaj</a><a href="javascript:void(0);" style="color: #ff4444; font-size: 10px;" id="zbiorkaoff">nie licz</a> <span style="font-size: 10px; color: #999999;">|</span> <a href="javascript:void(0);" style="color: #ff4444; font-size: 10px;" id="resethity2">reset</a>';
		  text += '</div></div>';
		  $('#pvp').append(text);
		  $('#cancelfight').hide();
		  $('#zbiorkaoff').hide();
		  engine.counthitsrefresh();
		  if(engine.iscounthitsbase())
		  {
		      engine.startcounthits();
		  }
		  $('#zbiorkaon').mousedown(function(e)
		  {
		      engine.startcounthits();
		      return false;
		  });
		  $('#zbiorkaoff').mousedown(function(e)
		  {
		      engine.stopcounthits();
		      return false;
		  });
		  $('#resethity2').mousedown(function(e)
		  {
		      engine.resetcounthits();
		      return false;
		  });
		  $('#resethity').mousedown(function(e)
		  {
		      engine.resethits();
		      engine.refresh();
		      return false;
		  });
		  $('#cancelfight').mousedown(function(e)
		  {
		      engine.stopfightlayer();
		      return false;
		  });
		  $('#fighthity').mousedown(function(e)
		  {
		      $('#cancelfight').show();
		      $('#fighthity').hide();
		      engine.adaptHits();
		      engine.startfight();
		      engine.refresh();
		      return false;
		  });
		  engine.refresh();
		  engine.modifyfunction();
		}
	}
};

$(function()
{
	engine.init();
});