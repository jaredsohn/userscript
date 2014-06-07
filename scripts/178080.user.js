// ==UserScript==
// @name        DobroMage
// @namespace   http://dobrochan.com/
// @description Show your powers!
// @include     http://dobrochan.com/frame.xhtml
// @version     3
// @grant       unsafeWindow 
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
} catch (e) {
    return false;
  }
}

if(supports_html5_storage()){
    var magehpmax = parseInt(localStorage.getItem("magehpmax"));
    var magemanamax = parseInt(localStorage.getItem("magemanamax"));
    var magestaminamax = parseInt(localStorage.getItem("magestaminamax"));
    var mageothermax = parseInt(localStorage.getItem("mageothermax"));
    if(isNaN(magehpmax)) magehpmax = 0;
    if(isNaN(magemanamax)) magemanamax = 0;
    if(isNaN(magestaminamax)) magestaminamax = 0;
    if(isNaN(mageothermax)) mageothermax = 0;
}else{
    var magehpmax = 0;
    var magemanamax = 0;
    var magestaminamax = 0;
    var mageothermax = 0;
}

function mage_update_board_stats()
{
  setTimeout(mage_update_board_stats, 30000);

  $.get('/api/chan/stats/diff.json', {}, function(data) {for (b in data)
    {
      var bcs = document.getElementById('count_'+b);
      if (bcs)
        $(bcs).html('['+data[b]+']');
    } 
    
    var magehp = data['b']+data['u']+data['rf']+data['dt']+data['vg']+data['r']+data['cr']+data['lor']+data['mu']+data['oe']+data['s']+data['w']+data['hr'];
    var magemana = data['a']+data['ma']+data['sw']+data['hau']+data['azu'];
    var magestamina = data['tv']+data['cp']+data['gf']+data['bo']+data['di']+data['vn']+data['ve']+data['wh']+data['fur']+data['to']+data['bg']+data['wn']+data['slow']+data['mad'];
    var mageother = data['d']+data['news'];
    

    
    if(magehpmax < magehp){
        magehpmax = magehp;               
    }
    
    if(magemanamax < magemana){
        magemanamax = magemana;        
    }
    
    if(magestaminamax < magestamina){
        magestaminamax = magestamina;       
    }
    
    if(mageothermax < mageother){
        mageothermax = mageother;       
    }

    if(supports_html5_storage()){
        localStorage.setItem("magehpmax", magehpmax);
        localStorage.setItem("magemanamax", magemanamax);
        localStorage.setItem("magestaminamax", magestaminamax); 
        localStorage.setItem("mageothermax", mageothermax); 
    }

    
    $('span#magehp').width(Math.floor(100 * magehp / magehpmax) + '%');
    $('span#magemana').width(Math.floor(100 * magemana / magemanamax) + '%');
    $('span#magestamina').width(Math.floor(100 * magestamina / magestaminamax) + '%');
    $('span#mageother').width(Math.floor(100 * mageother / mageothermax) + '%');
    
    $('span#magehpval').text(magehp +'/'+ magehpmax);
    $('span#magemanaval').text(magemana +'/'+ magemanamax);
    $('span#magestaminaval').text(magestamina +'/'+ magestaminamax);
    $('span#mageotherval').text(mageother +'/'+ mageothermax);
    
    $('b#magelevel').text('Lvl '+ Math.floor(Math.sqrt((magehpmax+magemanamax+magestaminamax+mageothermax)/20)));
   
    },'json');
}

$( window ).load(function() {
    unsafeWindow.setTimeout(function(){
        var interval_id = unsafeWindow.setTimeout(function(){return true}, 9999); 
        for (var i = 1; i < interval_id; i++)unsafeWindow.clearTimeout(i);
        mage_update_board_stats();
    }, 999);
    
    
    
    $('div.logo').after('<hr>'+
        '<div id="mageinfo" style="font-size: 10px; font-family: verdana;">'+
        '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAA0BAMAAAAQ+IcwAAAAD1BMVEUwFTQAAQAHAgQnebL/vVBodYZOAAAAAXRSTlMAQObYZgAAAJZJREFUKJGN0MERwCAIRFFa+C2khW1h+68pB9CJRk04OOMTEYkIiDnehD3jmmy+qIw/ZF8cqZkBqsCB6uAPLS4yPml6x29iTlkRvU2zJQoMfnxnJGxUBGJNQUpFpr0pUAYg7Ym2lcSWcnMhCfs6EiCRkz6QPZff0fihJ5Vl+Q9qy47oNAxnJDJfqqMl0QfT5r2iYIpY0A1N3mtRQfYFrwAAAABJRU5ErkJggg==" style="float: left;">'+
        '<div style="float: left; width: 120px;height: 52px;padding-left:10px;">'+
        '	<div style="height: 13px; position: relative;">'+
        '		<span id="magehp" style="float:left; display: block; height: 11px; width: 0%; background: #e9e;margin: 1px;border-radius: 4px;"></span>'+
        '		<span id="magehpval"style="position: absolute; top: 0; left:0; line-height: 13px; z-index:2; text-align: center; width: 100%;text-shadow: 0 0 2px #fff;color: #000;font-size: 8px;">0/0</span></div>'+
        '	<div style="height: 13px; position: relative;">'+
        '		<span id="magemana"style="float:left; display: block; height: 11px; width: 0%; background: #ee9;margin: 1px;border-radius: 4px;"></span>'+
        '		<span id="magemanaval" style="position: absolute; top: 0; left:0; line-height: 13px; z-index:2; text-align: center; width: 100%;text-shadow: 0 0 2px #fff;color: #000;font-size: 8px;">0/0</span></div>'+
        '	<div style="height: 13px; position: relative;">'+
        '		<span id="magestamina"style="float:left; display: block; height: 11px; width: 0%; background: #9ee;margin: 1px;border-radius: 4px;"></span>'+
        '		<span  id="magestaminaval"style="position: absolute; top: 0; left:0; line-height: 13px; z-index:2; text-align: center; width: 100%;text-shadow: 0 0 2px #fff;color: #000;font-size: 8px;">0/0</span></div>'+
        '	<div style="height: 13px; position: relative;">'+
        '		<span id="mageother"style="float:left; display: block; height: 11px; width: 0%; background: #e99;margin: 1px;border-radius: 4px;"></span>'+
        '		<span  id="mageotherval"style="position: absolute; top: 0; left:0; line-height: 13px; z-index:2; text-align: center; width: 100%;text-shadow: 0 0 2px #fff;color: #000;font-size: 8px;">0/0</span></div>'+
        '</div>'+
        '  <br style="clear:both;">'+
        '  <b id="magelevel">Lvl ?</b>  '+
        '</div>');
});

