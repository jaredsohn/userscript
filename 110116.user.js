// ==UserScript==
// @name       AddPresets
// @namespace  http://www.mage.net
// @version    0.7
// @description adds useful presets to Dxcalc
// @include    http://dxcalc.com/age1/*
// @include    http://www.dxcalc.com/age1/*
// @copyright  2011+, Michael Ventura
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
var shortcuts ={
    wo:'worker',
    w:'warrior',
    s:'scout',
    p:'pike',
    sw:'sword',
    a:'archer',
    t:'cart',
    c:'cav',
    cata:'phrac',
    b:'ball',
    r:'br',
    cp:'pult'
};
var fortCuts = {
    at:'at',
    tra:'trap',
    ab:'abatis',
    r:'rl',
    rock:'dt'
};

function toMap(army,forts)
{
    var map = {};
    var type = forts ? 'd' : 'a';  
    var troops = army.split(',');
    for (t in troops)
    {
        var pair = troops[t].split(':');
        map[type+'_troopCount_'+shortcuts[pair[0]]]=pair[1].replace('k','000');
    }
    if(forts)
    {
        var def = forts.split(',');
        for (t in def)
        {
            var pair = def[t].split(':');
            map['d_fortCount_'+fortCuts[pair[0]]]=pair[1].replace('k','000');
        }
    }
    return map;
}

// All your GM code must be inside this function
    function letsJQuery() {
        
        unsafeWindow.setArmies["cd"] = toMap('wo:50k,w:125k,p:125k,sw:125k,a:400k,c:30k,cata:10k,b:30k,r:10k,cp:10k','at:18k,r:200,tra:0,ab:0,rock:0');
        unsafeWindow.setArmies["5k"] = toMap('wo:50k,w:100k,p:1k,sw:1k,a:700k,c:1k,cata:1k,b:30k,r:10k,cp:10k','at:17k,tra:1k,ab:1k,rock:100,r:0');
        unsafeWindow.setArmies["Trebs"] = toMap('wo:0,w:0,p:0,sw:0,a:0,c:0,cata:0,b:0,r:0,cp:0','at:0,tra:0,ab:0,rock:11k,r:0');
        unsafeWindow.setArmies["trade"] = toMap('wo:0,w:0,s:0,sw:0,p:0,a:99k,c:1k,cata:0,cp:0,r:0,b:0');
        unsafeWindow.setArmies["jaq"] = toMap('c:80k,cata:19997,s:1,a:1,b:1,wo:0,w:0,sw:0,p:0,r:0,cp:0,t:0');
        unsafeWindow.setArmies["smack"] = toMap('c:99999,s:1,wo:0,w:0,sw:0,p:0,a:0,b:0,cp:0,r:0,cata:0,t:0');
        unsafeWindow.setArmies["phract"] = toMap('cata:90k,s:500,wo:0,w:0,sw:0,p:0,a:500,b:0,cp:0,r:0,c:9k,t:0');
        unsafeWindow.setArmies["30/30"] = toMap('cp:30k,b:30k,r:500,w:500,wo:500,sw:500,p:500,a:500,c:500,s:36000,cata:500,t:0');
        unsafeWindow.setArmies["30/30h"] = toMap('cp:30k,b:30k,r:500,w:500,wo:500,sw:500,p:500,a:500,c:0,s:37000,cata:0,t:0');
        unsafeWindow.setArmies["40/30"] = toMap('cp:30k,b:40k,r:500,w:500,wo:500,sw:500,p:500,a:500,c:500,s:26000,cata:500,t:0');
        unsafeWindow.setArmies["40/30h"] = toMap('cp:30k,b:40k,r:500,w:500,wo:500,sw:500,p:500,a:500,c:0,s:27000,cata:0,t:0');
        unsafeWindow.setArmies["40/30a"] = toMap('cp:30k,b:40k,r:500,w:500,wo:500,sw:500,p:500,a:27500,c:0,s:0,cata:0,t:0');
        unsafeWindow.setArmies["40/40"] = toMap('cp:40k,b:40k,r:500,w:500,wo:500,sw:500,p:500,a:500,c:500,s:16000,cata:500,t:0');
        unsafeWindow.setArmies["50/40"] = toMap('cp:40k,b:50k,r:0,w:0,wo:0,sw:0,p:0,a:0,c:0,s:10k,cata:0,t:0');
        unsafeWindow.setArmies["MSB"] = toMap('cp:10k,b:10k,s:76000,wo:500,w:500,sw:500,p:500,a:500,c:500,cata:500,t:0,r:500');
        unsafeWindow.setArmies["SB"] = toMap('s:100k,wo:0,w:0,p:0,sw:0,a:0,c:0,cata:0,b:0,r:0,cp:0,t:0');
        unsafeWindow.setArmies["ASB"] = toMap('cp:0,b:0,s:77000,wo:500,w:500,sw:500,p:500,a:20k,c:500,cata:500,t:0,r:0');
        unsafeWindow.setArmies["BSB"] = toMap('cp:0,b:5k,s:94300,wo:100,w:100,sw:100,p:100,a:100,c:100,cata:100,t:0,r:0');
        $('input[name="a_item_horn"],input[name="a_item_corselet"]').attr('checked','checked');
        $('input[name="d_item_horn"],input[name="d_item_corselet"]').attr('checked','checked');
        $('select[name="d_troopCount_set"]').append($('<option>', { value : 'cd' }).text('Light CD'));
        $('select[name="d_troopCount_set"]').append($('<option>', { value : '5k' }).text('5k'));
        $('select[name="d_troopCount_set"]').append($('<option>', { value : 'Trebs' }).text('Trebs'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'trade' }).text('Tradefire'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'jaq' }).text('Jaq'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'smack' }).text('Smack'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '30/30' }).text('30/30 Layered'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '30/30h' }).text('30/30 Horseless'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '40/30' }).text('40/30 Layered'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '40/30h' }).text('40/30 Horseless'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '40/30a' }).text('40/30 Arch Pad'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '40/40' }).text('40/40 Layered'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : '50/40' }).text('50/40 Naked'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'MSB' }).text('MSB'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'ASB' }).text('ASB'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'BSB' }).text('BSB'));
        $('select[name="a_troopCount_set"]').append($('<option>', { value : 'SB' }).text('SB'));
    }