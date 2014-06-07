// ==UserScript==
// @name           OGame Redesign: AutoExpoFleet
// @namespace      userscripts.org
// @description    Auto calc expofleet
// @version        1.0.0
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function() 
{
	var shipsNoSat = new Array();
    shipsNoSat.push({id:202, name:"202", n:0, c:0, expo:12});   //Малый транспорт
    shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:47});   //Большой транспорт
    shipsNoSat.push({id:204, name:"204", n:0, c:0, expo:12});   //Лёгкий истребитель
    shipsNoSat.push({id:205, name:"205", n:0, c:0, expo:110});  //Тяжёлый истребитель
    shipsNoSat.push({id:206, name:"206", n:0, c:0, expo:47});   //Крейсер
    shipsNoSat.push({id:207, name:"207", n:0, c:0, expo:160});  //Линкор
    shipsNoSat.push({id:208, name:"208", n:0, c:0, expo:30});   //Колонизатор
    shipsNoSat.push({id:209, name:"209", n:0, c:0, expo:16});   //Переработчик
    shipsNoSat.push({id:210, name:"210", n:0, c:0, expo:1});    //Шпионский зонд
    shipsNoSat.push({id:211, name:"211", n:0, c:0, expo:75});   //Бомбардировщик
    shipsNoSat.push({id:213, name:"213", n:0, c:0, expo:110});  //Уничтожитель
    shipsNoSat.push({id:214, name:"214", n:0, c:0, expo:9000}); //Звезда смерти
    shipsNoSat.push({id:215, name:"215", n:0, c:0, expo:70});   //Линейный крейсер

    var evalue = 9000;
	var evaluemax = evalue;
    
    function n_getById(o, id) {
        for (var key in o) {
            if(o[key].id == id)
                return o[key].n;
        }
        return null;
    }

    function c_getById(o, id) {
        for (var key in o) {
            if(o[key].id == id)
                return o[key].c;
        }
        return null;
    }

    function e_getById(o, id) {
        for (var key in o) {
            if(o[key].id == id)
                return o[key].expo;
        }
        return null;
    }

    function name_getById(o, id) {
        for (var key in o) {
            if(o[key].id == id)
                return o[key].name;
        }
        return null;
    }

    function n_setById(o, id, v) {
        for (var key in o) {
            if(o[key].id == id)
                o[key].n = v;
        }
    }

    function c_setById(o, id, v) {
        for (var key in o) {
            if(o[key].id == id)
                o[key].c = v;
        }
    }

	function calcUseShip(id, count)
	{
		if (count == null || count > n_getById(shipsNoSat, id))
			count = n_getById(shipsNoSat, id);
		if (evalue - e_getById(shipsNoSat, id) * (count - 1) <= 0)
			count = Math.ceil(evalue / e_getById(shipsNoSat, id));
		if (count > 0)
		{
			evalue = evalue - e_getById(shipsNoSat, id) * count;
			c_setById(shipsNoSat, id, c_getById(shipsNoSat, id) + count);
			n_setById(shipsNoSat, id, n_getById(shipsNoSat, id) - count);
			return true;
		}
		return false;
	}
    
    function clearUseShip(id) {
        var old_s = c_getById(shipsNoSat, id);
        n_setById(shipsNoSat, id, n_getById(shipsNoSat, id) + old_s);
        c_setById(shipsNoSat, id, 0);
        evalue = evaluemax - countEvalue();
    }

    function countEvalue()
    {
        var e_val = 0;
        for(var i = 0; i < shipsNoSat.length; i++) {
            e_val += shipsNoSat[i].c * shipsNoSat[i].expo;
        }
        return e_val;
    }
    
    function fillShips()
    {
        for(var i = 0; i < shipsNoSat.length; i++) {
            var ele = document.getElementById('button' + shipsNoSat[i].id.toString());
            shipsNoSat[i].n     = parseInt(ele.getElementsByClassName('textlabel')[0].nextSibling.textContent.replace(/\D/g, ''),10);
            shipsNoSat[i].c     = 0;
            shipsNoSat[i].name  = ele.getElementsByClassName('textlabel')[0].textContent;
       }
    }

    function RecalcUseShip()
    {
        clearUseShip(205);
        calcUseShip(205, null); 
        clearUseShip(203);
        calcUseShip(203, null); 
    }
    
    function calcExp(variant)
    {
        evaluemax = evalue;
        
        switch (variant) {
            case 7: {
            }
            case 3: {
                calcUseShip(210, 1);
                break;
            }
            default: {
                calcUseShip(210, 1);
                calcUseShip(205, 1); 
            }
        }

        if (calcUseShip(213, 1) == false)
            if (calcUseShip(211, 1) == false)
                if (calcUseShip(215, 1) == false)
                    if (calcUseShip(207, 1) == false)
                        calcUseShip(203, 1);
                        
        switch (variant) {
            case 6: {
                fillShips();
                evalue = evaluemax;
                calcUseShip(210, 1);
                calcUseShip(205, null); 
                calcUseShip(203, null); 
                break;
            }
            case 5: {
                fillShips();
                evalue = evaluemax;
                calcUseShip(210, 1);
                if (calcUseShip(213, 1) == false)
                    if (calcUseShip(211, 1) == false)
                        if (calcUseShip(215, 1) == false)
                            if (calcUseShip(207, 1) == false)
                                    if (calcUseShip(205, 1) == false)
                                        calcUseShip(203, 1);
                calcUseShip(205, null); 
                calcUseShip(203, null); 
                break;
            }
            case 4: {
                var bt_lim = (evaluemax == 9000 ? 37 : 48);
                calcUseShip(203, bt_lim); 
                if(c_getById(shipsNoSat, 203) < bt_lim) calcUseShip(205, (bt_lim-c_getById(shipsNoSat, 205))*5);
                calcUseShip(205, null);            
                calcUseShip(207, null); 
                calcUseShip(213, null); 
                calcUseShip(211, null);  
                if(evalue < (-34)) {
                    clearUseShip(205, null);            
                    clearUseShip(207, null); 
                    clearUseShip(213, null); 
                    clearUseShip(211, null); 
                    if(c_getById(shipsNoSat, 203) < bt_lim) clearUseShip(205, null); 
                    clearUseShip(205, null);
                    calcUseShip(210, 1);
                    if (calcUseShip(211, 1) == false)
                            if (calcUseShip(207, 1) == false)
                                calcUseShip(206, 1);
                    if(c_getById(shipsNoSat, 203) < bt_lim) calcUseShip(205, (bt_lim-c_getById(shipsNoSat, 205))*5);
                    calcUseShip(205, null);            
                    calcUseShip(207, null); 
                    calcUseShip(213, null); 
                    calcUseShip(211, null); 
                }
                if(evalue > 0) {
                    calcUseShip(203, null); 
                    calcUseShip(215, null);
                }

                calcUseShip(205, null);
                break;
            }
            case 3: {
                var bt_lim = (evaluemax == 9000 ? 72 : 96);
                calcUseShip(203, bt_lim); 
                if(c_getById(shipsNoSat, 203) < bt_lim) calcUseShip(205, (bt_lim-c_getById(shipsNoSat, 205))*5);
                calcUseShip(205, null);            
                calcUseShip(207, null); 
                calcUseShip(213, null); 
                calcUseShip(211, null); 
                if(evalue < (-34)) {
                    clearUseShip(205, null);            
                    clearUseShip(207, null); 
                    clearUseShip(213, null); 
                    clearUseShip(211, null); 
                    if(c_getById(shipsNoSat, 203) < bt_lim) clearUseShip(205, null); 
                    clearUseShip(205, null);
                    calcUseShip(210, 1);
                    if (calcUseShip(211, 1) == false)
                            if (calcUseShip(207, 1) == false)
                                calcUseShip(206, 1);
                    if(c_getById(shipsNoSat, 203) < bt_lim) calcUseShip(205, (bt_lim-c_getById(shipsNoSat, 205))*5);
                    calcUseShip(205, null);            
                    calcUseShip(207, null); 
                    calcUseShip(213, null); 
                    calcUseShip(211, null); 
                }
                if(evalue > 0) {
                    calcUseShip(205, null); 
                    calcUseShip(215, null);
                }

                calcUseShip(205, null);
                break;
            }
            case 2: {
                calcUseShip(203, null);
                if(!c_getById(shipsNoSat, 203)) calcUseShip(205, null);
                calcUseShip(205, null);            
                calcUseShip(207, null); 
                calcUseShip(213, null); 
                calcUseShip(211, null); 
                calcUseShip(215, null);
                RecalcUseShip();
                calcUseShip(205, null);
                break;
            }
            case 7: {
                var bt_lim = (evaluemax == 9000 ? 100 : 132);
                calcUseShip(203, bt_lim); 
                var li_lim = (evaluemax == 9000 ? 39 : 52);
                calcUseShip(205, bt_lim); 
            }
            default: {
                calcUseShip(203, null);
                calcUseShip(205, null);            
                calcUseShip(207, null); 
                calcUseShip(213, null); 
                calcUseShip(211, null); 
                calcUseShip(215, null);
                RecalcUseShip();
                calcUseShip(205, null);
            }
        }
    }

    function fillexpofleet ()
    {
        var text = 'ExpoPoints: '+ countEvalue () + '|';
        var sOncl = 'setMaxIntInput ({ ';
        var name = '';
        for (var i = 0; i < shipsNoSat.length; i++)
        {
            if (shipsNoSat [i].c)
            {
                sOncl += "'" + shipsNoSat [i].id + "':" + shipsNoSat [i].c + ',';
                text  += shipsNoSat [i].name + ': ' + shipsNoSat[i].c + '<br />';
                name  += shipsNoSat [i].name.substring (0, 1) + shipsNoSat [i].c;
            }
        }
        sOncl = sOncl.substring (0, sOncl.length - 1) + " }); checkShips ('shipsChosen'); document.getElementsByName ('mission') [0].value = 15; document.getElementsByName ('position') [0].value = 16; document.getElementById ('continue').onclick (); return false;";
        return { click:sOncl, title:text, name:name };
    }
   
	try {

        if (document.location.href.indexOf('page=fleet1') > -1) 
        {
            document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			var stylesheet = document.styleSheets[document.styleSheets.length-1];
            var rule = '.expolink {'+
                'color: #5577EE !important;'+
                'padding:0px 10px;'+
                'outline: 1px dotted #5577EE;'+
                'text-decoration: none !important;'+
                '} ';
            stylesheet.insertRule(rule, 0);

            var rule = '.expolink1 {'+
                'color: #5577EE !important;'+
                'padding:0px 10px;'+
                'outline: none;'+
                'text-decoration: none !important;'+
                '} ';
            stylesheet.insertRule(rule, 0);

            var expofleet = document.createElement('div');
            expofleet.innerHTML =	'<table cellspacing="5px" style="position: relative; left: 12px; top: 0px">' +
                            '<tr align="right">' +
                                '<td><img src="img/layout/icon-expedition.gif" id="sendexpo" ></td>' +
                                '<td><a href="#" id="eflbut9k"> <b>9000</b> </a></td>' +
                                '<td><a href="#" id="eflbut12k"> <b>12000</b> </a></td>' +
                            '</tr>' +
                        '</table>';
            var i9k = i12k = 0;
            var e9k = 9000;
            var e12k = 12000;
            for (var i = 1; i <= 7; i++)
            {
                evalue = 9000;
                fillShips ();
                calcExp (i);
                if(Math.abs(evalue) <= e9k) {i9k = i; e9k = Math.abs(evalue);}
                evalue = 12000;
                fillShips ();
                calcExp (i);
                if(Math.abs(evalue) <= e12k) {i12k = i; e12k = Math.abs(evalue);}
            }
            if(i9k == 0) i9k = 7;
            if(i12k == 0) i12k = 7;

            document.getElementById ('buttonz').insertBefore (expofleet, document.getElementById ('allornone'));

            evalue = 9000;
            fillShips ();
            calcExp (i9k);
            var text = fillexpofleet ();
            var element = document.getElementById ("eflbut9k");
            element.setAttribute ("onclick", text.click);
            element.className = "tipsTitle selected expolink1";
            element.title = text.title;

            evalue = 12000;
            fillShips ();
            calcExp (i12k);
            text = fillexpofleet ();
            element = document.getElementById ("eflbut12k");
            element.setAttribute ("onclick", text.click);
            element.className = "tipsTitle selected expolink";
            element.title = text.title;
        }
	}
	catch (e) {}
    
}) ()

