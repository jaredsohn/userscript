// ==UserScript==
// @name        ultimatefighter
// @include     http://*.erepublik.com/*
// @include     https://*.erepublik.com/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @version     1.02
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// @grant       unsafeWindow
// ==/UserScript==

var engine = {
    prefix : 'ultimatefighter_',
    timer : null,
    timer2 : null,
    limithp : 50,
    lasthp : 0,
    hpiter : 0,
    
    startFight : function()
    {
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').hide();
        $('#'+this.prefix+'disable').show();
        engine.timer = setInterval(function()
        {
            engine.cycleFight();
        }, 550);
        engine.timer2 = setInterval(function()
        {
            engine.recoverHP();
        }, 1500);
        GM_setValue(this.prefix+'enabled', true);
    },
    
    recoverHP : function()
    {
        var en = unsafeWindow.erepublik.citizen.energy;
        if(en < engine.limithp)
        {
            unsafeWindow.smallestFood.use = 1;
            unsafeWindow.energy.eatFood();
        }
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
	   else if(link.indexOf('q10.') > 0) q = my ? -1 : 100;
	   return q;
	},
    
    cycleFight : function()
    {
        var myweapon = engine.getfirepower($('#scroller img').attr('src'), false);
        if(myweapon == 0)
        {
            //engine.stopFight();
        }
        
        var en = unsafeWindow.erepublik.citizen.energy;
        if($('div.notifier').is(':visible'))
        {
            setTimeout(function()
            {
                unsafeWindow.window.location = unsafeWindow.window.location;
            }, 15 * 1000);
            engine.tempStopFight();
        }
        else if(en >= engine.limithp)
        {
            unsafeWindow.shoot();
        }
        
        if(engine.lasthp == en)
        {
            engine.hpiter++;
            if(engine.hpiter > 9 && 0)
            {
                engine.tempStopFight();
                unsafeWindow.window.location = unsafeWindow.window.location;
            }
        }
        else
        {
            engine.lasthp = en;
            engine.hpiter = 0;
        }
    },
    
    tempStopFight : function()
    {
        clearTimeout(engine.timer);
        engine.timer = null;
        clearTimeout(engine.timer2);
        engine.timer2 = null;
    },
    
    stopFight : function()
    {
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').hide();
        $('#'+this.prefix+'enable').show();
        clearTimeout(engine.timer);
        engine.timer = null;
        clearTimeout(engine.timer2);
        engine.timer2 = null;
        GM_setValue(this.prefix+'enabled', false);
    },
    
    chooseSide : function()
    {
        var obj = $('a.reversed').attr('href');
        unsafeWindow.window.location = obj;
    },
    
    toggle : function()
    {
        if(engine.timer == null) engine.startFight();
        else engine.stopFight();
    },
    
    setHTML : function()
    {
        var code = '<div style="position: fixed; bottom: 0px; right: 160px; width: 150px; text-align: center; background: white; border: 1px solid black;">';
        code += '<div id="'+this.prefix+'enable" style="cursor: pointer; padding: 5px 15px;">Włącz ultimatefighter</div>';
        code += '<div id="'+this.prefix+'disable" style="cursor: pointer; padding: 5px 15px; display: none;">Wyłącz ultimatefighter</div>';
        code += '</div>';
        $('body').append(code);
        $('#'+this.prefix+'enable, #'+this.prefix+'disable').click(function() { engine.toggle(); });
    },
    
    checkStart : function()
    {
        GM_setValue(this.prefix+'enabled', false);
        //if(GM_getValue(this.prefix+'enabled', false)) this.startFight();
    },
    
    init : function()
    {
        if(unsafeWindow.window.location.toString().indexOf('military/battlefield') > -1)
        {
            this.setHTML();
            this.checkStart();
        }
        else if(unsafeWindow.window.location.toString().indexOf('wars/show') > -1)
        {
            //this.chooseSide();
        }
    }
};

$(function()
{
    engine.init();
});