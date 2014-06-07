// ==UserScript==
// @name           OGame Redesign: AutoExpoFleet for Begginer
// @namespace      8arlock
// @description    Auto calc expofleet for Begginer: 72LC+83HF+1DR+1EP/96LC+114HF+1DR+1EP
// @version        1.1.3
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=research*
// ==/UserScript==
// Thnx Raicheron for finding the values of the ships on expeditions and the calulation of expeditions 
// http://owiki.de/Exp#Expeditionspunkte
// The original idea of ​​calculating the expedition belongs to Caprica Six 
// http://board.ogame.org/index.php?page=Thread&threadID=650534
// Thnx Vess (bontchev) his ideas and calculations
// http://tinyurl.com/expocosts1

(function() 
{
	var icon_expedition = 'data:image/gif;base64,R0lGODlhEQARAPf/ADlYl017yjNQiUVtt0RprUFkpT1foz1foD1dozhZmDdamTZWkzJOhSU8azRQiP///iY+cENnrjxenz1ipC5KgEFjpEJprT9jp0ZknkBnq0dZgkRpqydCeCtEdzZdqGiS1yc/cDNXmz5kpkJwwUt2xjhgo2yMxsfS5jlirUFnsDtiqkJnqV2CwVN2t+/0+TVTj+Pp8X2YzneNs058zDxdnpGnzEJprsrT4UluslJqmkForDJQijpgoi5IfTpfn6y83TNTlcbV7HKGsTNPijhalUBsvElwukNglz5XkYWdxjBHdpmszCM4aUZutEFmrEBmrj1kqUBhoVJ5wEFmqTFbq5alvk9/0DBMhTFOhkJjqDhcnkRnrSlFfEt4w0FpsEFbkThXlPT5+f/+/jdWkf3+/TZUjqK21TFNiFh3rklzvTpfp/7+/SQ8biY+b0Jor0NprlN/zjliqkt7z0tvsVBpmzRRiUBorUFprPr8/EdtsUJoq1WB0SxIfj5jpmGL0jtfnj9krDZhsF5+vTFXoTFUlp2x1EpwtS1PjkBotH+WxDBMgX+b0EFquEduuPb2+lp+xE1zvVJ0rTtcnqizx0x0woCay5Soyjpdmj5foVd9wuzv9j1cmDFZot/k8TZfo3GX2fn5+naY1kJmrE1rpT5jpHye20BlqEprqLzP7TNRjEJmqkNlrUZttLXG50Zut7zL5mWL0bbH6jBMhzNOhs3a78/a7M3X6WGBvClDeDdWlClEeC1FezhMeE95x0VdiCY/dkVelkx70EhutEl2yPL4+TZYnFN7w5mw2zVVkmmLxkJprDRQijVVjzdXj0VprkVqrDZaoTFPiFl2q09+zkhwvcvU6TtdpCtPkjxenf///ZSozI2lzSY9bFF3wEJork18yjphp0NorVF+zSg+cMvU4Tphqkl6z/39/Ep0wkl0wDNXnnWOuzRQiThYmjtfoOju9Iqav/z+/fn8/PLz+D9lqUdts0BoqzZfqFSB0EdlnUdwt4qk0kFnqjxipP///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9lWVVOxZZwEdxY8KZDz50Mff5Z0wJtSRI1ESzYefJGlCkRExAYsEejRI1KiNKke5SMmhFWyugZ8OJMwpQ4rtAN++YnVIBelAbw66cvjw8ogmDQKhVAzrQ9cEgsasEDkrA/gFic85ctyKdgVvCJk1JvQrdG7mwwauXvwQM8qD6Ym9GlyQVjqoikKAKL2AMxYVzEi+VnxAAJhiqwoSONkxl/8sgci3GiUyEMv5wVYOIrB6E582pVW2OCSiR4kzQ4qcCNy5lLHgo5yvQK1K1BhxgoIVCgQY8dCTzh0LQv0I93pw4pavOMVINdWHKtA7fNFop72sgh4QNiQxReuiikTcon6cANNMWuyaiCC8IKTOOiMQPT7oC6RJZCYANy5EUHBM1AIMAYCwCQgAKbCKFAArkgUwYHo/wDzBVDLOOAA+zsIEsdDswyCwVf/BMQADs=';	

	var shipsNoSat = new Array();
    // shipsNoSat.push({id:202, name:"202", n:0, c:0, expo:12});   //Малый транспорт
    // shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:47});   //Большой транспорт
    // shipsNoSat.push({id:204, name:"204", n:0, c:0, expo:12});   //Лёгкий истребитель
    // shipsNoSat.push({id:205, name:"205", n:0, c:0, expo:110});  //Тяжёлый истребитель
    // shipsNoSat.push({id:206, name:"206", n:0, c:0, expo:47});   //Крейсер
    // shipsNoSat.push({id:207, name:"207", n:0, c:0, expo:160});  //Линкор
    // shipsNoSat.push({id:208, name:"208", n:0, c:0, expo:30});   //Колонизатор
    // shipsNoSat.push({id:209, name:"209", n:0, c:0, expo:16});   //Переработчик
    // shipsNoSat.push({id:210, name:"210", n:0, c:0, expo:1});    //Шпионский зонд
    // shipsNoSat.push({id:211, name:"211", n:0, c:0, expo:75});   //Бомбардировщик
    // shipsNoSat.push({id:213, name:"213", n:0, c:0, expo:110});  //Уничтожитель
    // shipsNoSat.push({id:214, name:"214", n:0, c:0, expo:9000}); //Звезда смерти
    // shipsNoSat.push({id:215, name:"215", n:0, c:0, expo:70});   //Линейный крейсер

    shipsNoSat.push({id:202, name:"202", n:0, c:0, expo:20});   //Малый транспорт
    shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:60});   //Большой транспорт
    shipsNoSat.push({id:204, name:"204", n:0, c:0, expo:20});   //Лёгкий истребитель
    shipsNoSat.push({id:205, name:"205", n:0, c:0, expo:50});  //Тяжёлый истребитель
    shipsNoSat.push({id:206, name:"206", n:0, c:0, expo:135});   //Крейсер
    shipsNoSat.push({id:207, name:"207", n:0, c:0, expo:300});  //Линкор
    shipsNoSat.push({id:208, name:"208", n:0, c:0, expo:150});   //Колонизатор
    shipsNoSat.push({id:209, name:"209", n:0, c:0, expo:80});   //Переработчик
    shipsNoSat.push({id:210, name:"210", n:0, c:0, expo:5});    //Шпионский зонд
    shipsNoSat.push({id:211, name:"211", n:0, c:0, expo:375});   //Бомбардировщик
    shipsNoSat.push({id:213, name:"213", n:0, c:0, expo:550});  //Уничтожитель
    shipsNoSat.push({id:214, name:"214", n:0, c:0, expo:45000}); //Звезда смерти
    shipsNoSat.push({id:215, name:"215", n:0, c:0, expo:350});   //Линейный крейсер

    var evalue = 9000;
	var evaluemax = evalue;
    var REng = IEng = GEng = 0;
    
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
        clearUseShip(202);
        calcUseShip(202, null); 
    }
    
    function AddHeavyShip()
    {
        if (calcUseShip(213, 1) == false)
            if (calcUseShip(211, 1) == false)
                if (calcUseShip(215, 1) == false)
                    if (calcUseShip(207, 1) == false)
                        calcUseShip(206, 1);
    }
    
    function calcExp()
    {
        evaluemax = evalue;
        
        calcUseShip(210,   1);
        AddHeavyShip();
        var bt_lim = (evaluemax == 9000 ?  72 :  96);
        calcUseShip(203, bt_lim);

        calcUseShip(205, null);  
		if(evalue < (evaluemax / 4)) {
			calcUseShip(203, null); 
			calcUseShip(202, null); 
			calcUseShip(207, null); 
			calcUseShip(213, null); 
			calcUseShip(211, null); 
			calcUseShip(215, null);
			calcUseShip(206, null); 
			calcUseShip(204, null); 
			calcUseShip(210, null);
			if(evalue > 0) {
				RecalcUseShip();
			}
		} else {
			clearUseShip(205);
			clearUseShip(203);
			var bt = n_getById(shipsNoSat, 203);
			var ti = n_getById(shipsNoSat, 205);
			var ti_need = Math.floor(114 * bt / 96);
			if(ti < ti_need) {
				ti_need = ti;
				bt = Math.ceil(ti * 96 / 114);
			}
			calcUseShip(203, bt);
			calcUseShip(205, ti_need);
			if( (evaluemax - evalue) == 1) {
				if (calcUseShip(202, 1) == false)
					if (calcUseShip(203, 1) == false)
						if (calcUseShip(204, 1) == false)
							calcUseShip(205, 1);
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

    if (!(typeof GM_getValue == 'function')) {
        this.GM_getValue=function (key,def) {
            return localStorage[key] || def;
        };
        this.GM_setValue=function (key,value) {
            return localStorage[key]=value;
        };
    }
 
     function getServer() {

       var server = location.href;
       server = server.replace("http://", "").replace("www.", "");
       server = server.substring(0, server.indexOf("."));
       
       return server;
    }
  
    var val = function () {
       this.set = function(key, value) {
          return GM_setValue("autoexp_" + getServer() + "_" + key, value);
       }
       
       this.get = function(key){
             return GM_getValue("autoexp_" + getServer() + "_" + key)
       }
    } 

    var technix = new val();
    
	try {
        if (document.location.href.indexOf('page=research') > -1) 
        {
            REng = document.getElementById ('details115').children[0].children[0].children[0].nextSibling.textContent;
            IEng = document.getElementById ('details117').children[0].children[0].children[0].nextSibling.textContent;
            GEng = document.getElementById ('details118').children[0].children[0].children[0].nextSibling.textContent;
            technix.set('reng', REng);
            technix.set('ieng', IEng);
            technix.set('geng', GEng);
        }
        if (document.location.href.indexOf('page=fleet1') > -1) 
        {
            if(document.getElementById ('sendexpo')) return;
            
            REng = technix.get('reng');
            IEng = technix.get('ieng');
            GEng = technix.get('geng');
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
                                '<td><img src="'+icon_expedition+'" id="sendexpo" style="background-color:#3a5f9f; outline: 1px solid #FFFFFF; height:17px; width:17px"></td>' +
                                '<td><a href="#" id="eflbut9k"> <b>9000</b> </a></td>' +
                                '<td><a href="#" id="eflbut12k"> <b>12000</b> </a></td>' +
                            '</tr>' +
                        '</table>';

            document.getElementById ('buttonz').insertBefore (expofleet, document.getElementById ('allornone'));

            evalue = 9000;
            fillShips ();
            calcExp ();
            var text = fillexpofleet ();
            var element = document.getElementById ("eflbut9k");
            element.setAttribute ("onclick", text.click);
            element.className = "tipsTitle selected expolink1";
            element.title = text.title;

            evalue = 12000;
            fillShips ();
            calcExp ();
            text = fillexpofleet ();
            element = document.getElementById ("eflbut12k");
            element.setAttribute ("onclick", text.click);
            element.className = "tipsTitle selected expolink";
            element.title = text.title;
        }
	}
	catch (e) {}
    
}) ()

