// ==UserScript==
// @id             LootCount
// @name           LootCount
// @version        1.0
// @namespace      
// @author         
// @description    
// @include        http://*.ogame.*/game/*
// @exclude        http://*.ogame.ru/game/*
// @run-at         document-end
// ==/UserScript==
function contentEval(source) {
    source = '(' + source + ')();'
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
}

contentEval(function () {

	var strPattrMsgWarSubj = 'Combat Report';
	var dateLimit; // Временное ограничение статистики
	var prefix = 'loot_' + getByName("ogame-universe") +"_"+ getByName("ogame-player-id");

function $id(obj){
	return document.getElementById(obj);
}
    // Форматирует числовую строку в требуемый формат
    // Format a numeric string in the required format
    function number_format(number, decimals, dec_point, thousands_sep) {	// Format a number with grouped thousands
        //
        // +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +	 bugfix by: Michael White (http://crestidg.com)

        var i, j, kw, kd, km;

        // input sanitation & defaults
        if( isNaN(decimals = Math.abs(decimals)) ){
            decimals = 2;
        }
        if( dec_point == undefined ){
            dec_point = ",";
        }
        if( thousands_sep == undefined ){
            thousands_sep = ".";
        }

        i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

        if( (j = i.length) > 3 ){
            j = j % 3;
        } else{
            j = 0;
        }

        km = (j ? i.substr(0, j) + thousands_sep : "");
        kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
        //kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");
        kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).replace(/-/, 0).slice(2) : "");


        return km + kw + kd;
    }

    function getByName(nam) {
        var d=document.getElementsByName(nam)[0];
        if(d) return d.content;
        return undefined;
    }

    if (typeof GM_getValue === 'undefined') {
        GM_getValue = function(key, defaultValue) {
            var retValue = localStorage.getItem(key);
            if (!retValue) {
                retValue = defaultValue;
            }
            return retValue;
        }
    }

    if (typeof GM_setValue === 'undefined') {
        GM_setValue = function(key, value) {
            localStorage.setItem(key, value);
        }
    }
    if (typeof GM_deleteValue === 'undefined') {
        GM_deleteValue = function(key) {
            localStorage.removeItem(key);
        }
    }

    // Перезаписываем все логи экспедиций в браузере
    // Overwrite all logs expeditions in the browser storage
    function saveLogs(Logs) {
        var str = JSON.stringify(Logs);
        GM_setValue(prefix + "logs", str);
    }
   
    function getMsgTime(message) {
        var msgDateTime;
        var msgRow = message.find('.infohead table tr:eq(3) td');
        // Проверяем, изменят ли дату Antigame
        var original = $(msgRow).attr('original')
        if (original)
            msgDateTime = original.split(' ');
        else
            msgDateTime = $(msgRow).text().split(' ');

        var date_part = msgDateTime[0].split('.');
        var time_part = msgDateTime[1].split(':');

        var msg_year = (parseInt(date_part[2]));
        var msg_month = (parseInt(date_part[1]));
        var msg_day = (parseInt(date_part[0]));
        var msg_hour = (parseInt(time_part[0]));
        var msg_min = (parseInt(time_part[1]));
        var msg_sec = (parseInt(time_part[2]));

        var dt = new Date(msg_year, msg_month-1, msg_day, msg_hour, msg_min, msg_sec, 0);
        return dt;
    }

    // Возвращает все логи экспедиций, сохранённых в браузере
    // Return all logs expeditions stored in the browser
    function getLogs() {
        var Logs = GM_getValue(prefix + "logs", null);
        if (Logs === null) {
            Logs = [];
        } else {
            try {
                Logs = JSON.parse(Logs);
            } catch(e) {
                saveLogs([]);
                Logs = [];
            }
        }

        return Logs;
    }

    // Возвращает все данные о потерях в экспедициях, сохранённых в браузере
    // Returns all the data on the losses in the expeditions that are stored in your browser
    function getFleetLoots() {
        var loots = GM_getValue(prefix + "loots", null);
        if (loots === null) {
            loots = [];
        } else {
            try {
                loots = JSON.parse(loots);
            } catch(e) {
                saveFleetloots([]);
                loots = [];
            }
        }
        return loots;
    }

    // Перезаписывает данных о потерях в экспедициях
    // Overwrites the data on losses in expeditions
    function saveFleetLoots(loots) {
        var str = JSON.stringify(loots);
        GM_setValue(prefix + "loots", str);
    }
	
	function renderInfo () {
		var metall = 0; // Количество металла
        var crystall = 0; // Количество кристалла
        var deuteruim = 0; // КОличество дейтерия
        // Получаем сохранённый ранее временой диапазон статистики
        var DateRange = GM_getValue(prefix + "date_range", null);
        if (DateRange === null) {
            GM_setValue(prefix + "date_range", 0);
            DateRange = 0;
        }

        var curDate = parseInt(getByName("ogame-timestamp")) * 1000;
        // Высчитываем временной диапазон
        if (DateRange > 0) {
            dateLimit = curDate - DateRange;
        }
        var stat_since = curDate;

        // Считываем все потери флота от пиратов и чужих
        var allLoots = getFleetLoots();
        if (allLoots.length>0) {
            for (var ls = 0; ls < allLoots.length;  ls++) {
                // Проверяем чтобы дата была в указанном диапазоне
                if ((allLoots[ls].date < dateLimit))
                    continue; // Переходим к следующему результату
                else {
                        metall = metall + allLoots[ls].metall;
                        crystall = crystall+ allLoots[ls].crystall;
                        deuteruim = deuteruim + allLoots[ls].deuteruim;
                }
            }
        }
        var totalLoots = metall + crystall + deuteruim;
		alert('Всего добыто : ' +number_format(metall, 0, ',', '.')+' металла, '+number_format(crystall, 0, ',', '.')+' кристалла, '+number_format(deuteruim, 0, ',', '.')+' дейтерия\n Итого: '+number_format(totalLoots, 0, ',', '.'));
	}
	
	function CreateMenuButton() {
		var strHTML = document.getElementsByTagName("html")[0].innerHTML;
	    var icone = '';
	    var objButton = document.getElementById('menuTable');
	    if (!objButton) return;
	    var item = document.createElement('li');
	    item.className = 'menubutton_table';
	    item.innerHTML = '<span class="menu_icon"><a href="#" target="_blank"><img class="mouseSwitch" src="'+icone+'" height="27" width="27"></a></span><a class="menubutton" href="#" target="_blank"><span class="textlabel">lootView</span></a>';
	    item.innerHTML = '<a class="menubutton" href="#" target="_self"><span class="textlabel">lootView</span></a>';
	    item.firstChild.addEventListener("click", renderInfo, false);
	    objButton.appendChild(item);
	}

function showOptionsBox() {
	var OB = $id("vlOptionBox");
	if ( OB != null ) {
		closeOpts();
		return;
	}
	OB = document.createElement("div");
	OB.setAttribute("style", "position:absolute;left:50%;top:50%;z-index:999;");
	OB.setAttribute("id", "vlOptionBox");
	//OB.innerHTML = "<table cellspacing='0' cellpadding='0'><tbody><tr><td><span style='margin:0px 0px 0px -2px;'>┌</span></td><td id='oaOptsTitle' style='text-align:center;font-weight:bold;background-color:#000030;cursor:move;padding:2px;border-radius:5px;' title='Click and Drag to Move' onmouseover='this.style.backgroundColor=\"#000040\";return false;' onmouseup='this.style.backgroundColor=\"#000020\";' onmouseout='this.style.backgroundColor=\"#000030\";return false;' onclick='return false;' colspan=2>123123123</td><td><span id='oaCloseOptsDiv' title='Cancel and Close' style='float:right;background-color:#BB0000;color:white;border-style:solid;border-width:1px;border-color:#999999;padding:0px 2px 1px 2px;cursor:pointer;' onmouseover='this.style.backgroundColor=\"#FF0000\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.style.backgroundColor=\"#BB0000\";this.style.borderColor=\"#999999\";return false;' onmousedown='this.style.backgroundColor=\"#550000\";this.style.borderColor=\"#444444\";return false;' onmouseup='this.style.backgroundColor=\"#BB0000\";this.style.borderColor=\"#FFFFFF\";return false;'>X</span></td></tr></tbody></table>"
	OB.innerHTML = "<table><tbody><tr><td><table border=1><tbody><tr><th colspan=4>Ресурсов захвачено</th></tr><tr><td>Дата</td><td>Металла</td><td>Кристалла</td><td>Дейтерия</td><tr></td></tr></tbody></table><tr><td align=right><button>Закрыть</button><td></tr></tbody></table>"

	/*OB.innerHTML = "<table cellspacing='0' cellpadding='0'><tbody><tr><td><span style='margin:0px 0px 0px -2px;'>┌</span></td><td id='oaOptsTitle' style='text-align:center;font-weight:bold;background-color:#000030;cursor:move;padding:2px;border-radius:5px;' title='Click and Drag to Move' onmouseover='this.style.backgroundColor=\"#000040\";return false;' onmouseup='this.style.backgroundColor=\"#000020\";' onmouseout='this.style.backgroundColor=\"#000030\";return false;' onclick='return false;' colspan=2>"+aLang[24]+"</td><td><span id='oaCloseOptsDiv' title='Cancel and Close' style='float:right;background-color:#BB0000;color:white;border-style:solid;border-width:1px;border-color:#999999;padding:0px 2px 1px 2px;cursor:pointer;' onmouseover='this.style.backgroundColor=\"#FF0000\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.style.backgroundColor=\"#BB0000\";this.style.borderColor=\"#999999\";return false;' onmousedown='this.style.backgroundColor=\"#550000\";this.style.borderColor=\"#444444\";return false;' onmouseup='this.style.backgroundColor=\"#BB0000\";this.style.borderColor=\"#FFFFFF\";return false;'>X</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[31]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><select id='oaLanguage' style='visibility:visible;border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;'><option value='org' selected>English (default)</option><option value='de'>Deutsch</option><option value='dk'>Danske</option><option value='pt'>Português</option><option value='es'>Español</option><option value='nl'>Dutch</option><option value='fr'>Français</option></select></td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[29]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><select id='oaReloadType' style='visibility:visible;border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;'><option value=0 selected>"+aLang[45]+"</option><option value=1>window.reload()</option></select></td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[25]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><input type='text' id='oaMinInput' size='5' style='border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;' value='"+MIN+"'> "+aLang[30]+".</td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[26]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><input type='text' id='oaMaxInput' size='5' style='border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;' value='"+MAX+"'> "+aLang[30]+".</td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[27]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><input type='text' id='oaAlarmDelayInput' size='5' style='border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;' value='"+AlarmCheckPeriod+"'> "+aLang[30]+".</td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px 2px 2px 5px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[22]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px 5px 2px 2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'><input id='oaEmail' size='30' type='text' value='"+getValS("email","none@none.com")+"' onfocus='this.value=\"\";' style='border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;'/><span id='oaEmailTest' title='Send a test email' style='margin:0px 0px 0px 5px;border-width:1px;border-style:outset;border-color:#AAAAAA;background-color:#555555;cursor:pointer;border-radius:5px;padding:2px;' onmouseover='this.parentNode.overButton=1;this.style.borderColor=\"#EEEEEE\";this.style.backgroundColor=\"#777777\";return false;' onmouseout='this.parentNode.overButton=0;this.style.borderColor=\"#AAAAAA\";this.style.backgroundColor=\"#555555\";return false;' onmousedown='this.style.borderColor=\"#777777\";this.style.backgroundColor=\"#333333\";'>"+aLang[23]+"</span></td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -1px;'>│</span></td><td style='text-align:right;border-style:solid;border-width:1px 1px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:5px 0px 0px 5px;' onmouseover='this.nextSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\";return false;' onmouseout='this.nextSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[47]+":</td><td style='text-align:left;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;padding:2px;border-radius:0px 5px 5px 0px;' onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) { this.previousSibling.style.backgroundColor = \"#182018\";this.style.backgroundColor = \"#182018\"; } else { this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\"; } return false;' onmouseout='this.previousSibling.style.backgroundColor = \"#102010\";this.style.backgroundColor = \"#102010\";return false;'>"+aLang[48]+" <input type='text' id='oaAlarmRepeatInput' size='3' style='border-width:1px;border-style:solid;border-color:#999999;padding:2px;background-color:#111111;color:#DDDDDD;border-radius:5px;' onmouseover='this.parentNode.overButton=1;this.style.backgroundColor=\"#000000\";this.style.color=\"#FFFFFF\";this.style.borderColor=\"#FFFFFF\";return false;' onmouseout='this.parentNode.overButton=0;this.style.backgroundColor=\"#111111\";this.style.color=\"#DDDDDD\";this.style.borderColor=\"#999999\";return false;' value='"+AlarmRepeatPeriod+"'> "+aLang[30]+". "+aLang[49]+"</td><td><span style='margin:0px 0px 0px 1px;'>│</span></td></tr>"
		+"<tr><td><span style='margin:0px 0px 0px -2px;'>└</span></td><td style='padding:5px;border-style:solid;border-width:1px 0px 0px 0px;background-color:#102010;border-color:#333333;border-radius:5px;' colspan=2 onmouseover='if ( this.overButton != 1 ) this.overButton = 0; if ( this.overButton == 0 ) this.style.backgroundColor = \"#182018\";else this.style.backgroundColor = \"#102010\";return false;' onmouseout='this.style.backgroundColor = \"#102010\";return false;'><span id='oaReset' style='float:left;border-width:1px;border-style:outset;border-color:#AAAAAA;background-color:#555555;cursor:pointer;border-radius:5px;padding:2px;' onmouseover='this.parentNode.overButton=1;this.style.borderColor=\"#EEEEEE\";this.style.backgroundColor=\"#777777\";return false;' onmouseout='this.parentNode.overButton=0;this.style.borderColor=\"#AAAAAA\";this.style.backgroundColor=\"#555555\";return false;' onmousedown='this.style.borderColor=\"#777777\";this.style.backgroundColor=\"#333333\";return false;'>"+aLang[35]+"</span><span id='oaSaveOpts' style='float:left;margin:0px 0px 0px 190px;border-width:1px;border-style:outset;border-color:#AAAAAA;background-color:#555555;cursor:pointer;border-radius:5px;padding:2px;' onmouseover='this.parentNode.overButton=1; this.style.borderColor=\"#EEEEEE\";this.style.backgroundColor=\"#777777\";return false;' onmouseout='this.parentNode.overButton=0;this.style.borderColor=\"#AAAAAA\";this.style.backgroundColor=\"#555555\";return false;' onmousedown='this.style.borderColor=\"#777777\";this.style.backgroundColor=\"#333333\";return false;'>"+aLang[28]+"</span><a target='_blank' id='oaDonate' style='float:right;color:#FFFFFF;border-width:1px;border-style:solid;border-color:#102010;border-radius:5px;padding:2px;' onmouseover='this.parentNode.overButton=1;this.style.borderColor=\"#AAAAAA\";return false;' onmouseout='this.parentNode.overButton=0;this.style.borderColor=\"#102010\";return false;' href='https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7T4RNTNWMWSNL&submit='>"+aLang[32]+"</a><a target='_blank' style='float:right;color:#FFFFFF;border-width:1px;border-style:solid;border-color:#102010;border-radius:5px;padding:2px;' onmouseover='this.parentNode.overButton=1;this.style.borderColor=\"#AAAAAA\";return false;' onmouseout='this.parentNode.overButton=0;this.style.borderColor=\"#102010\";return false;' href='http://www.pimptrizkit.com/ogawc/node/115'>WIKI</a></td><td>┘</td></tr></tbody></table>";
*/
	document.body.appendChild(OB);
}	

function closeOpts(e){
	var opt = $id("vlOptionBox");
	document.body.removeChild(opt);
}

    //saveFleetLoots([]);
	CreateMenuButton();
	
	
	$(document).ajaxSuccess(function (event, XHR, ajaxOptions) {
    if (ajaxOptions.url.indexOf ("page=showmessage") < 0)
    	return;
    var message = $(".overlayDiv:last > .showmessage");
    message.find('.toolbar').append('<li class="shw_exp_stats"><span class="show_expedition_stat"></span></li>');
    // Получаем ID текущего сообщения. Get message ID
    var msgId = parseInt(message.attr('data-message-id'));
    if (msgId === 'undefined')
    	return;
    var msgSubject = message.find('.infohead table tr:eq(2) td').text();
    // Если сообщение не является экспедиционным или боевым докладом
    if (msgSubject.indexOf(strPattrMsgWarSubj)==-1)
     	return;
     //resLost = parseFloat(message.find('.battlereport table#shortreport tr:eq(1) td:eq(4)').text()) * 1000;
  	
	var loots = new Array();
	var loot = message.find('td.summary table td:eq(2)').html().trim().replace(/\./g,'');
	loot = /(\d+).*?(\d+).*?(\d+)/.exec(loot);
	loots[loot[1]+loot[2]+loot[3]] =  new Array( loot[1], loot[2], loot[3] );
	//alert(msgId+' | '+loot[1]+', '+loot[2]+', '+loot[3]);
	var allLoots = getFleetLoots(); // Ранее сохранённые потери. Old looses from storage
	var isAvaibleLoots = false;
	if (allLoots.length>0)
    	for (var i = 0; i < allLoots.length;  i++) {
        	if (allLoots[i].msgId == msgId) {
            	isAvaibleLoots = true;
                break;
            }
        }

	// Если лога боя не существует - добавляем. If battle report is not already avaible
	if (isAvaibleLoots===false)  {
		allLoots[allLoots.length] = {
			'msgId':msgId,
            'metall':parseInt(loot[1]),
            'crystall':parseInt(loot[2]),
            'deuteruim':parseInt(loot[3]),
            'date':getMsgTime(message).getTime()
         };
		saveFleetLoots(allLoots); // Сохраняем в браузере новую запись о потерях. Save
	}

    return; // Останавливаем дальнейшее изучение сообщения. Break message reseach
 
   })
})
