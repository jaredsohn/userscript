// ==UserScript==
// @name             Sind Rank [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Всплывающая подсказка над синдикатными погонами. Подсказка показывает информацию о текущем звании.
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {
    
// НАСТРОЙКИ
//------------------
// режим отображения званий.
//1 - показывает все, 0 - показывает только активное
var stateShowRank = 1;  
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
        
        
        for (var i = 0; i <= 5; i++) {
            
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
addCss('.rank_name { color: #700; font-weight: bold; }');
addCss('#rank_table td { border: 1px solid #393; font-size: 11px; border-collapse: collapse; }');
addCss('.opacity { filter:alpha(opacity=50); -moz-opacity: 0.5; -khtml-opacity: 0.5; opacity: 0.5; }');
addCss('.hidden { display: none; }');


// создаем тултип
var tooltip = root.document.createElement('div');
tooltip.id = 'rank_tooltip';
tooltip.innerHTML = '<table id="rank_table"><tr><td colspan="2" class="title center">Синдикатные звания</td></tr><tr id="tt_rank0"><td class="title" valign="middle"><img class="nott" src="http://images.ganjawars.ru/img/rank0.gif" width="23" height="13"></td><td><span class="rank_name">Private</span><br>Стоимость: <b>0 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>0</b><br></tr><tr id="tt_rank1"><td class="title" valign="middle" ><img class="nott" src="http://images.ganjawars.ru/img/rank1.gif" width="23" height="13"></td><td><span class="rank_name">Lieutenant</span><br>Стоимость: <b>75 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>15</b><br>Бонусы: +4% тепловизора, +2 меткости, +2 выносливости, +1 бонус сапера.<br></td></tr><tr id="tt_rank2"><td class="title" valign="middle"><img class="nott" src="http://images.ganjawars.ru/img/rank2.gif" width="23" height="13"></td><td><span class="rank_name">Captain</span><br>Стоимость: <b>150 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>18</b><br>Бонусы: +4% маскировки, +6% тепловизора, +4 меткости, +2 здоровья, +2 бонуса сапера, +1 бонус устойчивости.<br></td></tr><tr id="tt_rank3"><td class="title" valign="middle"><img  class="nott" src="http://images.ganjawars.ru/img/rank3.gif" width="23" height="13"></td><td><span class="rank_name">Major</span><br>Стоимость: <b>300 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>24</b><br>Бонусы: +6% маскировки, +8% тепловизора, +4 меткости, +4 выносливости, +2 здоровья, +3 бонуса сапера, +1 бонус опыта.<br></td></tr><tr id="tt_rank4"><td class="title" valign="middle"><img  class="nott" src="http://images.ganjawars.ru/img/rank4.gif" width="23" height="13"></td><td><span class="rank_name">Colonel</span><br>Стоимость: <b>400 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>30</b><br>Бонусы: +9% маскировки, +9% тепловизора, +6 меткости, +6 выносливости, +4 здоровья, +4 бонуса сапера, +1 бонус второго шага.<br></td></tr><tr id="tt_rank5"><td class="title" valign="middle"><img  class="nott" src="http://images.ganjawars.ru/img/rank5.gif" width="23" height="13"></td><td><span class="rank_name">Brigadier</span><br>Стоимость: <b>500 PTS</b> в месяц<br>Минимальный синдикатный уровень: <b>34</b><br>Бонусы: +9% маскировки, +10% тепловизора, +6 меткости, +6 выносливости, +6 здоровья, +5 бонуса сапера, +1 бонус второго шага, +1 бонус ярости, +1 крепкий орешек.<br></td></tr></table>';

// стили тултипа
with (tooltip.style) {
    
    top = 0;
    left = 0;
    position = 'absolute';
    visibility = 'hidden';
    zIndex = 1001;
    backgroundColor = '#f5fff5';
    padding = '10px';
    textAlign = 'center';
    width = '400px';
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