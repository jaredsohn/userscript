// ==UserScript==
// @name             Sind Rank [GW]
// @namespace        http://ganjascript.ucoz.com/
// @description      Всплывающая подсказка над синдикатными погонами. Подсказка показывает информацию о текущем звании.
// @include          http://*ganjawars.ru/*
// @version          1.1
// @author           W_or_M(edited by Julja__90)
// ==/UserScript==

(function() {
    
// НАСТРОЙКИ
//------------------
// режим отображения званий.
//1 - показывает все, 0 - показывает только активное
var stateShowRank = 0;  
//------------------


var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

function addCss(cssCode) {
    
    var styleElement = root.document.createElement("style");
    styleElement.type = "text/css";
    
    if (styleElement.styleSheet) {
        
        styleElement.styleSheet.cssText = cssCode;
        
    } else {
        
        styleElement.appendChild(document.createTextNode(cssCode));
        
    }
    root.document.getElementsByTagName("head")[0].appendChild(styleElement);
}

// тултип
function ToolTip(obj, rankId) {
    
    obj.onmouseover = function(e) {
        
        
        for (var i = 0; i <= 9; i++) {
            
            if (i == rankId) {
                
                root.document.getElementById('tt_rank'+ i).firstChild.className = 'title';
                root.document.getElementById('tt_rank'+ i).childNodes[1].className = '';
                
            } else {
                
                root.document.getElementById('tt_rank'+ i).firstChild.className = stateShowRank ? 'opacity' : 'hidden';
                root.document.getElementById('tt_rank'+ i).childNodes[1].className = stateShowRank ? 'opacity' : 'hidden';
                
            }
            
        }
        
    }
    
    obj.onmouseout = function(e) {
        
        tooltip.style.visibility = "hidden";
        
    };
    
    obj.onmousemove=function(e) {
        
        oCanvas = document.getElementsByTagName(
			(document.compatMode && document.compatMode == "CSS1Compat") ? "HTML" : "BODY"
			)[0];
		x = window.event ? event.clientX + oCanvas.scrollLeft : e.pageX;
		y = window.event ? event.clientY + oCanvas.scrollTop : e.pageY;
		
        w_width = oCanvas.clientWidth ? oCanvas.clientWidth + oCanvas.scrollLeft : window.innerWidth + window.pageXOffset;
		w_height = window.innerHeight ? window.innerHeight + window.pageYOffset : oCanvas.clientHeight + oCanvas.scrollTop; 
        
        c_height = document.compatMode=='CSS1Compat' && !window.opera?document.documentElement.clientHeight:document.body.clientHeight;
        
		t_width = tooltip.offsetWidth;
		t_height = tooltip.offsetHeight;
        
        tooltip.style.left = x + 15 + "px";
		tooltip.style.top =  y - parseInt(t_height / 2) + "px";
      
		if (x + t_width > w_width) tooltip.style.left = w_width - t_width + "px";
        if (y - parseInt(t_height / 2) < w_height - c_height) tooltip.style.top = w_height - c_height + "px";
		if (y + parseInt(t_height / 2) > w_height) tooltip.style.top = w_height - t_height + "px";
                
        tooltip.style.visibility = "visible";
        
    }
}



// подключаем классы
addCss('.title { background-color: #d0eed0; font-weight: bold; } ');
addCss('.center { text-align: center }');
addCss('.rank_name { color: #700; font-weight: bold;}');
addCss('#rank_table td {border: 1px solid #393; font-size: 11px; border-collapse: collapse;}');
addCss('.opacity { filter:alpha(opacity=50); -moz-opacity: 0.5; -khtml-opacity: 0.5; opacity: 0.5; }');
addCss('.hidden { display: none; }');


// создаем тултип
//images
//ranks
var rank0_img = "http://images.ganjawars.ru/img/rank0.gif";
var rank1_img = "http://images.ganjawars.ru/img/rank1.gif";
var rank2_img = "http://images.ganjawars.ru/img/rank2.gif";
var rank3_img = "http://images.ganjawars.ru/img/rank3.gif";
var rank4_img = "http://images.ganjawars.ru/img/rank4.gif";
var rank5_img = "http://images.ganjawars.ru/img/rank5.gif";
var rank6_img = "http://images.ganjawars.ru/img/rank6.gif";
var rank7_img = "http://images.ganjawars.ru/img/rank7.gif";
var rank8_img = "http://images.ganjawars.ru/img/rank8.gif";
var rank9_img = "http://images.ganjawars.ru/img/rank9.gif";
//ranks
//=================================================================================
//bonuses
var rank1_bonus = '+4% тепловизора, +2 меткости, +2 выносливости, +1 бонус сапера.';
var rank2_bonus = '+4% маскировки, +6% тепловизора, +4 меткости, +2 здоровья, +2 бонуса сапера, +1 бонус устойчивости.';
var rank3_bonus = '+6% маскировки, +8% тепловизора, +4 меткости, +4 выносливости, +2 здоровья, +3 бонуса сапера, +1 бонус опыта.';
var rank4_bonus = '+9% маскировки, +9% тепловизора, +6 меткости, +6 выносливости, +4 здоровья, +4 бонуса сапера, +1 бонус второго шага.';
var rank5_bonus = '+9% маскировки, +10% тепловизора, +6 меткости, +6 выносливости, +6 здоровья, +5 бонуса сапера, +1 бонус второго шага, +1 бонус ярости, +1 крепкий орешек.';
var rank6_bonus = '+11% маскировки, +11% тепловизора, +7 меткости, +7 выносливости, +7 здоровья, +5 бонуса сапера, +2 бонус второго шага, +2 бонус ярости, +1 крепкий орешек, +1 бонус снайпера, +1 бонус Маклауда.';
var rank7_bonus = '+12% маскировки, +11% тепловизора, +8 меткости, +7 выносливости, +8 здоровья, +5 бонуса сапера, +1 бонус второго шага, +2 бонус ярости, +2 крепкий орешек, +2 бонус снайпера, +1 бонус Маклауда.';
var rank8_bonus = '+13% маскировки, +12% тепловизора, +9 меткости, +8 выносливости, +8 здоровья, +5 бонуса сапера, +1 бонус второго шага, +2 бонус ярости, +3 крепкий орешек, +3 бонус снайпера, +1 бонус Маклауда.';
var rank9_bonus = '+14% маскировки, +14% тепловизора, +10 меткости, +10 выносливости, +10 здоровья, +5 бонуса сапера, +2 бонус второго шага, +2 бонус ярости, +4 крепкий орешек, +4 бонус снайпера.';
//bonuses
//images
var tooltip = root.document.createElement('div');
tooltip.id = 'rank_tooltip';
tooltip.innerHTML = '<table id="rank_table"><tr><td colspan="2" class="title center">Синдикатные звания</td></tr><tr id="tt_rank0"><td class="title" valign="middle"><img class="nott" src='+rank0_img+' width="23" height="13"></td><td><span class="rank_name">Private</span><br>Стоимость: <b>0 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>0</b><br></td></tr><tr id="tt_rank1"><td class="title" valign="middle"><img class="nott" src='+rank1_img+' width="23" height="13"></td><td><span class="rank_name">Lieutenant</span><br>Стоимость: <b>75 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>15</b><br>Бонусы: '+rank1_bonus+'<br></td></tr><tr id="tt_rank2"><td class="title" valign="middle"><img class="nott" src='+rank2_img+' width="23" height="13"></td><td><span class="rank_name">Captain</span><br>Стоимость: <b>150 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>18</b><br>Бонусы: '+rank2_bonus+'<br></td></tr><tr id="tt_rank3"><td class="title" valign="middle"><img class="nott" src='+rank3_img+' width="23" height="13"></td><td><span class="rank_name">Major</span><br>Стоимость: <b>300 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>24</b><br>Бонусы: '+rank3_bonus+'<br></td></tr><tr id="tt_rank4"><td class="title" valign="middle"><img class="nott" src='+rank4_img+' width="23" height="13"></td><td><span class="rank_name">Colonel</span><br>Стоимость: <b>400 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>30</b><br>Бонусы: '+rank4_bonus+'<br></td></tr><tr id="tt_rank5"><td class="title" valign="middle"><img class="nott" src='+rank5_img+' width="23" height="13"></td><td><span class="rank_name">Brigadier</span><br>Стоимость: <b>500 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>34</b><br>Бонусы: '+rank5_bonus+'<br></td></tr><tr id="tt_rank6"><td class="title" valign="middle"><img class="nott" src='+rank6_img+' width="23" height="13"></td><td><span class="rank_name">Major General</span><br>Стоимость: <b>550 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>37</b><br>Бонусы: '+rank6_bonus+'<br></td></tr><tr id="tt_rank7"><td class="title" valign="middle"><img class="nott" src='+rank7_img+' width="23" height="13"></td><td><span class="rank_name">Lieutenant General</span><br>Стоимость: <b>600 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>40</b><br>Бонусы: '+rank7_bonus+'<br></td></tr><tr id="tt_rank8"><td class="title" valign="middle"><img class="nott" src='+rank8_img+' width="23" height="13"></td><td><span class="rank_name">Colonel General</span><br>Стоимость: <b>650 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>42</b><br>Бонусы: '+rank8_bonus+'<br></td></tr><tr id="tt_rank9"><td class="title" valign="middle"><img class="nott" src='+rank9_img+' width="23" height="13"></td><td><span class="rank_name">Syndicate General</span><br>Стоимость: <b>700 PTS</b> в месяц █ Минимальный синдикатный уровень: <b>45</b><br>Бонусы: '+rank9_bonus+'<br></td></tr></table>';
// стили тултипа
with (tooltip.style) {
    
    top = 0;
    left = 0;
    position = 'absolute';
    visibility = 'hidden';
    zIndex = 5;
    backgroundColor = '#f5fff5';
    padding = '1px';
    textAlign = 'center';
    width = '490px';
    fontSize = '8px';
	
    
}
tooltip.className = 'wb';
root.document.body.appendChild(tooltip);


// ищем значки званий и присобачиваем к ним события
var img = root.document.getElementsByTagName('img');
for (var i = 0, l = img.length; i < l; i++) {
    
    var rankId = /^http:\/\/images\.ganjawars\.ru\/img\/rank(\d+)\.gif$/.exec(img[i].src);
    if (rankId != null && img[i].className != 'nott') {
      
        ToolTip(img[i], rankId[1]);
        
    }
    
}
    
    
})();