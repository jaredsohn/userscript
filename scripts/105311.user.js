// ==UserScript==
// @name           OGame Redesign: AutoExpoFleet for Raider
// @namespace      8arlock
// @description    Auto calc expofleet for Raider: 141LC+1DR+1EP/191LC+1DR+1EP
// @version        1.1.7
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=fleet2*cp*
// ==/UserScript==
// Thnx Raicheron for finding the values of the ships on expeditions and the calulation of expeditions 
// http://owiki.de/Exp#Expeditionspunkte
// The original idea of ​​calculating the expedition belongs to Caprica Six 
// http://board.ogame.org/index.php?page=Thread&threadID=650534
// Thnx Vess (bontchev) his ideas and calculations
// http://tinyurl.com/expocosts1

(function() 
{
	var theHref = document.location.href;
	// The following "if" is not really necessary but with it this script will work for Opera too
	if ((theHref.indexOf ("/game/index.php?")                  	<  0) ||
	    (theHref.indexOf ("/game/index.php?page=fleet")      	<  0))
		return;
	var icon_expedition = 'data:image/gif;base64,R0lGODlhEQARAPf/ADlYl017yjNQiUVtt0RprUFkpT1foz1foD1dozhZmDdamTZWkzJOhSU8azRQiP///iY+cENnrjxenz1ipC5KgEFjpEJprT9jp0ZknkBnq0dZgkRpqydCeCtEdzZdqGiS1yc/cDNXmz5kpkJwwUt2xjhgo2yMxsfS5jlirUFnsDtiqkJnqV2CwVN2t+/0+TVTj+Pp8X2YzneNs058zDxdnpGnzEJprsrT4UluslJqmkForDJQijpgoi5IfTpfn6y83TNTlcbV7HKGsTNPijhalUBsvElwukNglz5XkYWdxjBHdpmszCM4aUZutEFmrEBmrj1kqUBhoVJ5wEFmqTFbq5alvk9/0DBMhTFOhkJjqDhcnkRnrSlFfEt4w0FpsEFbkThXlPT5+f/+/jdWkf3+/TZUjqK21TFNiFh3rklzvTpfp/7+/SQ8biY+b0Jor0NprlN/zjliqkt7z0tvsVBpmzRRiUBorUFprPr8/EdtsUJoq1WB0SxIfj5jpmGL0jtfnj9krDZhsF5+vTFXoTFUlp2x1EpwtS1PjkBotH+WxDBMgX+b0EFquEduuPb2+lp+xE1zvVJ0rTtcnqizx0x0woCay5Soyjpdmj5foVd9wuzv9j1cmDFZot/k8TZfo3GX2fn5+naY1kJmrE1rpT5jpHye20BlqEprqLzP7TNRjEJmqkNlrUZttLXG50Zut7zL5mWL0bbH6jBMhzNOhs3a78/a7M3X6WGBvClDeDdWlClEeC1FezhMeE95x0VdiCY/dkVelkx70EhutEl2yPL4+TZYnFN7w5mw2zVVkmmLxkJprDRQijVVjzdXj0VprkVqrDZaoTFPiFl2q09+zkhwvcvU6TtdpCtPkjxenf///ZSozI2lzSY9bFF3wEJork18yjphp0NorVF+zSg+cMvU4Tphqkl6z/39/Ep0wkl0wDNXnnWOuzRQiThYmjtfoOju9Iqav/z+/fn8/PLz+D9lqUdts0BoqzZfqFSB0EdlnUdwt4qk0kFnqjxipP///wAAACH5BAEAAP8ALAAAAAARABEAAAj/AP9lWVVOxZZwEdxY8KZDz50Mff5Z0wJtSRI1ESzYefJGlCkRExAYsEejRI1KiNKke5SMmhFWyugZ8OJMwpQ4rtAN++YnVIBelAbw66cvjw8ogmDQKhVAzrQ9cEgsasEDkrA/gFic85ctyKdgVvCJk1JvQrdG7mwwauXvwQM8qD6Ym9GlyQVjqoikKAKL2AMxYVzEi+VnxAAJhiqwoSONkxl/8sgci3GiUyEMv5wVYOIrB6E582pVW2OCSiR4kzQ4qcCNy5lLHgo5yvQK1K1BhxgoIVCgQY8dCTzh0LQv0I93pw4pavOMVINdWHKtA7fNFop72sgh4QNiQxReuiikTcon6cANNMWuyaiCC8IKTOOiMQPT7oC6RJZCYANy5EUHBM1AIMAYCwCQgAKbCKFAArkgUwYHo/wDzBVDLOOAA+zsIEsdDswyCwVf/BMQADs=';	
	var unsafe;
	try
	{
		unsafe = unsafeWindow;
	}
	catch (e)
	{
		unsafe = window;
	}
	var $ = unsafe.$;
	var versogame = parseInt(document.getElementsByName('ogame-version').item(0).content.split('.')[0],10);
	
	var shipsNoSat = new Array();

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

    var evalue = 12000;
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
        clearUseShip(203);
        calcUseShip(203, null); 
        clearUseShip(202);
        calcUseShip(202, null); 
    }
    
    function AddHeavyShip()
    {
        if (calcUseShip(213, 1) == false)
            if (calcUseShip(211, 1) == false)
				if (calcUseShip(207, 1) == false)
					if (calcUseShip(206, 1) == false)
						if (calcUseShip(205, 1) == false)
							calcUseShip(204, 1);
    }
    
    function calcExp()
    {
        evaluemax = evalue;
        
        calcUseShip(210,   1);
        AddHeavyShip();
        calcUseShip(203, null);
        calcUseShip(202, null); 
        calcUseShip(213, null); 
        calcUseShip(211, null); 
        calcUseShip(207, null); 
        calcUseShip(206, null); 
        calcUseShip(205, null);            
        calcUseShip(204, null); 
        calcUseShip(210, null);
        if(evalue > 0) {
            RecalcUseShip();
        }
    }

    function fillexpofleet ()
    {
        var text = 'ExpoPoints: '+ countEvalue () + '|';
        var sOncl =  'setMaxIntInput (' +((versogame < 5) ? '' : '"form[name=shipsChosen]",')+'{ ';
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

	var expvalue = new val();
		
	try {
        if ((document.location.href.indexOf('page=fleet1') > -1) || ((document.location.href.indexOf('page=fleet2') > -1) && (document.location.href.indexOf('&cp=') > -1)))
        {
            if(document.getElementById ('sendexpo')) return;
            var timestamp = expvalue.get('timestamp');
			if(!timestamp) timestamp = '0';
			timestamp = parseInt(timestamp);
			evalue = expvalue.get('evalue');
			if(!evalue) evalue = '12000';
			evalue = parseInt(evalue);
			var curTime = new Date();
//			if((curTime.getTime()-timestamp) > 86400000)
			{
				ts = '0';
				$.ajax({url: "../api/serverData.xml", 
					dataType: "xml",
					async: false})
					.done(function (data) {
						ts = $("topScore", data).text();
						timestamp = $("serverData", data).attr("timestamp");
					});
				ts = parseInt(ts);
				timestamp = parseInt(timestamp)*1000;
				evalue = (1E5 >= ts ? 2500 : 1E6 >= ts ? 6E3 : 5E6 >= ts ? 9E3 : 12E3);
				expvalue.set('timestamp', timestamp.toString());
				expvalue.set('evalue', evalue.toString());
			}
			evaluemax = evalue;
			
            document.getElementsByTagName('head')[0].appendChild(document.createElement("style"));
			var stylesheet = document.styleSheets[document.styleSheets.length-1];
            var rule = '.expolink {'+
                'color: #5577EE !important;'+
                'padding:0px 10px;'+
                'outline: 1px dotted #5577EE;'+
                'text-decoration: none !important;'+
                '} ';
            stylesheet.insertRule(rule, 0);

            var expofleet = document.createElement('div');
            expofleet.innerHTML =	'<table cellspacing="5px" style="position: relative; left: 12px; top: 0px">' +
                            '<tr align="right">' +
                                '<td><img src="'+icon_expedition+'" id="sendexpo" style="background-color:#3a5f9f; outline: 1px solid #FFFFFF; height:17px; width:17px"></td>' +
                                '<td><a href="#" id="eflbut12k"> <b>'+evalue+'</b> </a></td>' +
                            '</tr>' +
                        '</table>';

            if(versogame < 5 ) document.getElementById ('buttonz').insertBefore (expofleet, document.getElementById ('allornone'));
			else {
				var beforeElement = document.getElementById ('allornone');
				beforeElement.parentNode.insertBefore (expofleet, beforeElement);
			}

            fillShips ();
            calcExp ();
            text = fillexpofleet ();
            element = document.getElementById ("eflbut12k");
            element.setAttribute ("onclick", text.click);
            element.className = "tooltipHTML selected expolink";
            element.title = text.title;
        }
	}
	catch (e) {}
    
}) ()

