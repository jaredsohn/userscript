// ==UserScript==
// @name           OGame Redesign: EasyExpoFleet
// @namespace      userscripts.org
// @description   Fake of "OGame Redesign: EasyExpoFleet" script. Set fleet for expedition
// @version        0.2.1
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// @include        http://*.ogame.*/game/index.php?page=showmessage*
// ==/UserScript==

(function() 
{
// Малый транспорт 12        --> 20
// Большой транспорт 47      --> 60
// Легкий истребитель 12     --> 20
// Тяжёлый истребитель 110   --> 50
// Шпионский зонд 1          --> 5
// Уничтожитель 110          --> 550
// Переработчик 16           --> 80
// Крейсер 47                --> 135
// Линкор 160                --> 300
// Колонизатор 16            --> 150
// Бомбардировщик 75         --> 375
// Линейный крейсер 70       --> 350
// ЗС 9000

	var shipsNoSat = new Array();
    shipsNoSat.push({id:202, name:"202", n:0, c:0, expo:20});  
    shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:60});
    shipsNoSat.push({id:204, name:"204", n:0, c:0, expo:20});
    shipsNoSat.push({id:205, name:"205", n:0, c:0, expo:50});
    shipsNoSat.push({id:206, name:"206", n:0, c:0, expo:135});
    shipsNoSat.push({id:207, name:"207", n:0, c:0, expo:300});
    shipsNoSat.push({id:208, name:"208", n:0, c:0, expo:30});
    shipsNoSat.push({id:209, name:"209", n:0, c:0, expo:150});
    shipsNoSat.push({id:210, name:"210", n:0, c:0, expo:5});  
    shipsNoSat.push({id:211, name:"211", n:0, c:0, expo:375}); 
    shipsNoSat.push({id:213, name:"213", n:0, c:0, expo:550});
    shipsNoSat.push({id:214, name:"214", n:0, c:0, expo:9000});
    shipsNoSat.push({id:215, name:"215", n:0, c:0, expo:350});

    var evalue = 9000;
    
	getCoordsFromPlanet = function(planet)
	{
		if (!planet) return { galaxy:0, system:0, planet:0, type:0, name:'' };

		var name = planet.children[1].textContent;
		var coords = planet.children[2].textContent;
		var type = 1;
		coords = coords.replace(/[\[\]]/g,'').split(':');
		var res = {
            galaxy: parseInt(coords[0],10),
			system: parseInt(coords[1],10),
			planet: parseInt(coords[2],10),
			type: type,
			name: name
			}
		return res;
	}

    function isEmpty(str) {
        for (var i = 0; i < str.length; i++)
            if (" " != str.charAt(i))
                return false;
        return true;
    }
    
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

    function fillShips()
    {
        for(var i = 0; i < shipsNoSat.length; i++) {
            var ele = document.getElementById('button' + shipsNoSat[i].id.toString());
            shipsNoSat[i].n     = parseInt(ele.getElementsByClassName('textlabel')[0].nextSibling.textContent,10);
            shipsNoSat[i].c     = 0;
            shipsNoSat[i].name  = ele.getElementsByClassName('textlabel')[0].textContent;
        }
    }
	try {
        if (document.location.href.indexOf('page=fleet3') > -1) 
        {
            if(localStorage.getItem("transfleet")) {
                var myEvent = document.createEvent ("MouseEvents");
                myEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                var theMaxes = document.getElementsByClassName ("max");
                for (var i = theMaxes.length; i >= 1 ; i--)
                    theMaxes [i - 1].dispatchEvent (myEvent);
                localStorage.removeItem("transfleet");
            }
            localStorage.removeItem("cargos");
        }

        if (document.location.href.indexOf('page=showmessage') > -1) 
        {
            localStorage.removeItem("cargos");
            var elements = document.getElementsByTagName( '*' );
            for( var i = 0; i < elements.length; i++ )
                if(elements[ i ].className == "fragment spy2") {
                    var tables = elements[ i ];
                    var metal = parseInt(tables.firstElementChild.rows[0].cells[1].textContent.replace(/\D/g, ''),10);
                    var crystal = parseInt(tables.firstElementChild.rows[0].cells[3].textContent.replace(/\D/g, ''),10);
                    var deuterium = parseInt(tables.firstElementChild.rows[1].cells[1].textContent.replace(/\D/g, ''),10);
                    plunder_metal =  Math.ceil(metal / 2);
                    plunder_crystal = Math.ceil(crystal / 2);
                    plunder_deuterium = Math.ceil(deuterium / 2);
                    var total = metal + crystal + deuterium;

                    var capacity_needed =
                        Math.max(	plunder_metal + plunder_crystal + plunder_deuterium,
                                    Math.min(	(2 * plunder_metal + plunder_crystal + plunder_deuterium) * 3 / 4,
                                                (2 * plunder_metal + plunder_deuterium)
                                            )
                                );

                    var small_cargos = Math.ceil(capacity_needed/5000);
                    var large_cargos = Math.ceil(capacity_needed/25000);
                    localStorage.setItem('cargos',JSON.stringify([small_cargos,large_cargos]));
            }
		}

        if (document.location.href.indexOf('page=fleet1') > -1) 
        {
            localStorage.removeItem("transfleet");
            //Лёгкий истребитель 12
            var name204 = document.getElementById('button204').getElementsByClassName('textlabel')[0].textContent;
            //Тяжёлый истребитель 110
            var name205 = document.getElementById('button205').getElementsByClassName('textlabel')[0].textContent;
            //Крейсер 47
            var name206 = document.getElementById('button206').getElementsByClassName('textlabel')[0].textContent;
            //Линкор 160
            var name207 = document.getElementById('button207').getElementsByClassName('textlabel')[0].textContent;
            //Линейный крейсер 70
            var name215 = document.getElementById('button215').getElementsByClassName('textlabel')[0].textContent;
            //Бомбардировщик 75
            var name211 = document.getElementById('button211').getElementsByClassName('textlabel')[0].textContent;
            //Уничтожитель 110
            var name213 = document.getElementById('button213').getElementsByClassName('textlabel')[0].textContent;
            //Звезда смерти 9000
            var name214 = document.getElementById('button214').getElementsByClassName('textlabel')[0].textContent;

            //Малый транспорт 12
            var name202 = document.getElementById('button202').getElementsByClassName('textlabel')[0].textContent;
            //Большой транспорт 47
            var name203 = document.getElementById('button203').getElementsByClassName('textlabel')[0].textContent;
            //Колонизатор 30
            var name208 = document.getElementById('button208').getElementsByClassName('textlabel')[0].textContent;
            //Переработчик 16
            var name209 = document.getElementById('button209').getElementsByClassName('textlabel')[0].textContent;
            //Шпионский зонд 1
            var name210 = document.getElementById('button210').getElementsByClassName('textlabel')[0].textContent;
            
            var tit01='|'+name203+' : 199<br />'+name210+' : 12<br />';
            var tit02='|'+name203+' : 190<br />'+name210+' : 10<br />'+name213+' : 1';
            var tit03='|'+name203+' : 200<br />';
            var tit04='|'+name203+' : 193<br />'+name211+' : 1<br />'+name210+' : 9';
            var tit05='|'+name203+' : 199<br />'+name205+' : 1<br />'+name210+' : 2<br />';
            var tit06='|'+name203+' : 189<br />'+name205+' : 1<br />'+name210+' : 12<br />'+name213+' : 1';
            var tit1='|'+name203+' : 187<br />'+name205+' : 1<br />'+name210+' : 1<br />'+name213+' : 1';
            var tit2='|'+name203+' : 37<br />'+name205+' : 67<br />'+name210+' : 1<br />'+name213+' : 1';
            var tit3='|'+name203+' : 190<br />'+name210+' : 1<br />'+name213+' : 1';
            var tit4='|'+name203+' : 190<br />'+name205+' : 1<br />'+name210+' : 1 ';
            var tit5='|'+name203+' : 192<br />'+name210+' : 1';
            var tit6='|'+name203+' : 190<br />'+name210+' : 1<br />'+name211+' : 1';
            
            var expofleet = document.createElement('div');
            expofleet.id = 'expofleet';
            expofleet.innerHTML =   '<table><tr>'+
                                    '<td><img src="http://gf1.geo.gfsrv.net/cdnf7/892b08269e0e0bbde60b090099f547.gif" style="position: relative; left: 17px; top: 3px" id="sendexpo" ></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut0"  style="position: relative; left: 24px; top: 2px" class="tipsStandard" title="'+tit01+'"> 199/0/12/0</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut01" style="position: relative; left: 28px; top: 2px" class="tipsStandard" title="'+tit02+'"> 190/0/10/1</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut02" style="position: relative; left: 32px; top: 2px" class="tipsStandard" title="'+tit03+'"> 200/0/0/0</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut03" style="position: relative; left: 36px; top: 2px" class="tipsStandard" title="'+tit04+'"> 193/0/B/9</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut04" style="position: relative; left: 40px; top: 2px" class="tipsStandard" title="'+tit05+'"> 199/1/0/2</BUTTON></td>'+
                                    '<td><BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="efbut05" style="position: relative; left: 44px; top: 2px" class="tipsStandard" title="'+tit06+'"> 189/1/1/12</BUTTON></td>'+
                                    '</tr></table>';
            
            document.getElementById('inhalt').appendChild(expofleet);

            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut0').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 12;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
                    "document.getElementById('ship_213').value = 0;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_205').value = 0;\n"+
                    "document.getElementById('ship_205').onchange();\n"+
                    "document.getElementById('ship_203').value = 199;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut0').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut01').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 10;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
                    "document.getElementById('ship_213').value = 1;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_205').value = 0;\n"+
                    "document.getElementById('ship_205').onchange();\n"+
                    "document.getElementById('ship_203').value = 190;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut01').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut02').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 0;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
                    "document.getElementById('ship_213').value = 0;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_205').value = 0;\n"+
                    "document.getElementById('ship_205').onchange();\n"+
                    "document.getElementById('ship_203').value = 200;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut02').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut03').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 9;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
                    "document.getElementById('ship_213').value = 0;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_211').value = 1;\n"+
                    "document.getElementById('ship_211').onchange();\n"+
                    "document.getElementById('ship_203').value = 193;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut03').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut04').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 2;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
	      "document.getElementById('ship_211').value = 0;\n"+
                    "document.getElementById('ship_211').onchange();\n"+
                    "document.getElementById('ship_213').value = 0;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_205').value = 1;\n"+
                    "document.getElementById('ship_205').onchange();\n"+
                    "document.getElementById('ship_203').value = 199;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut04').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut05').onclick=function(){\n"+
                    "document.getElementById('ship_210').value = 12;\n"+
                    "document.getElementById('ship_210').onchange();\n"+
                    "document.getElementById('ship_211').value = 0;\n"+
                    "document.getElementById('ship_211').onchange();\n"+
                    "document.getElementById('ship_205').value = 1;\n"+
                    "document.getElementById('ship_205').onchange();\n"+
                    "document.getElementById('ship_213').value = 1;\n"+
                    "document.getElementById('ship_213').onchange();\n"+
                    "document.getElementById('ship_203').value = 189;\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut05').appendChild(expscript);
 
            fillShips();
			evalue = 9000;
			var evaluemax = evalue;

			calcUseShip(210, 1);
			calcUseShip(203, 72); 

			if (calcUseShip(213, 1) == false)
				if (calcUseShip(211, 1) == false)
					if (calcUseShip(215, 1) == false)
						if (calcUseShip(207, 1) == false)
							calcUseShip(206, 1);
                            
            calcUseShip(205, 1);
            
			calcUseShip(203, null); 
            calcUseShip(202, null);
			calcUseShip(210, null);
			calcUseShip(207, null); 
            calcUseShip(205, null); 
			calcUseShip(213, null); 
            calcUseShip(211, null); 
            calcUseShip(215, null);
			calcUseShip(206, null); 
			calcUseShip(204, null); 
 
 			var text = '';
            var stxt = '';
			for (var i = 0; i < shipsNoSat.length; i++)
				if (shipsNoSat[i].c > 0)
                {
					text += shipsNoSat[i].name + ': ' + shipsNoSat[i].c + '<br />';
                    stxt += "document.getElementById('ship_"+shipsNoSat[i].id+"').value ="+shipsNoSat[i].c+";\n";
                    stxt += "document.getElementById('ship_"+shipsNoSat[i].id+"').onchange();\n";
                }
            document.getElementById('efbuta').className = 'tipsStandard';
            document.getElementById('efbuta').title = "|ExpoPoints: "+(evalue * -1 + evaluemax) + '<br />' + text;
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbuta').onclick=function(){\n"+
                    stxt+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbuta').appendChild(expscript);

            fillShips();
			evalue = 12000;
			var evaluemax = evalue;

			calcUseShip(210, 1);
			calcUseShip(203, 96); 

			if (calcUseShip(213, 1) == false)
				if (calcUseShip(211, 1) == false)
					if (calcUseShip(215, 1) == false)
						if (calcUseShip(207, 1) == false)
							calcUseShip(206, 1);
                            
            calcUseShip(205, 1);
            
			calcUseShip(203, null); 
            calcUseShip(202, null);
			calcUseShip(210, null);
			calcUseShip(207, null); 
            calcUseShip(205, null); 
			calcUseShip(213, null); 
            calcUseShip(211, null); 
            calcUseShip(215, null);
			calcUseShip(206, null); 
			calcUseShip(204, null); 
 
 			var text = '';
            var stxt = '';
			for (var i = 0; i < shipsNoSat.length; i++)
				if (shipsNoSat[i].c > 0)
                {
					text += shipsNoSat[i].name + ': ' + shipsNoSat[i].c + '<br />';
                    stxt += "document.getElementById('ship_"+shipsNoSat[i].id+"').value ="+shipsNoSat[i].c+";\n";
                    stxt += "document.getElementById('ship_"+shipsNoSat[i].id+"').onchange();\n";
                }
            document.getElementById('efbut0a').className = 'tipsStandard';
            document.getElementById('efbut0a').title = "|ExpoPoints: "+(evalue * -1 + evaluemax) + '<br />' + text;
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('efbut0a').onclick=function(){\n"+
                    stxt+
                    "document.getElementsByName('mission')[0].value = 15;\n"+
                    "document.getElementsByName('position')[0].value = 16;\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('efbut0a').appendChild(expscript);

			var slinks = [];
            var sl_select = "";
            var MT0 = MT = BT0 = BT = 0;
            var s_sl = localStorage.getItem("coordstf");
            var elements = document.getElementsByTagName( '*' );
            for( var i = 0; i < elements.length; i++ )
                if(elements[ i ].className == "smallplanet") {
                    var div = elements[ i ];
                    var s = getCoordsFromPlanet(div.children[0]) ;
                    if(s_sl) {
                        if(s_sl == (s.galaxy+'#'+s.system+'#'+s.planet))
                            sl_select += '<option selected value="'+s.galaxy+'#'+s.system+'#'+s.planet+'">'+s.name+' ('+s.galaxy+':'+s.system+':'+s.planet+')</option>\n';
                    } else
                        sl_select += '<option value="'+s.galaxy+'#'+s.system+'#'+s.planet+'">'+s.name+' ('+s.galaxy+':'+s.system+':'+s.planet+')</option>\n';
                }
            if(isEmpty(sl_select)) sl_select = '<option value="---"> --- </option>';
            
            var res = parseInt(document.getElementById('resources_metal').textContent.replace(/\D/g, ''),10) +
                        parseInt(document.getElementById('resources_crystal').textContent.replace(/\D/g, ''),10) +
                        parseInt(document.getElementById('resources_deuterium').textContent.replace(/\D/g, ''),10);
            MT0 = MT = Math.ceil(res / 5000);
            BT0 = Math.ceil(res / 25000);
            var eckeMT = parseInt(document.getElementById('button202').getElementsByClassName('textlabel')[0].nextSibling.textContent,10);
            var nameMT = document.getElementById('button202').getElementsByClassName('textlabel')[0].textContent;
            var eckeBT = parseInt(document.getElementById('button203').getElementsByClassName('textlabel')[0].nextSibling.textContent,10);
            var nameBT = document.getElementById('button203').getElementsByClassName('textlabel')[0].textContent;
            if(MT > eckeMT) {
                MT = eckeMT;
                var res0 = res - MT * 5000;
                BT = Math.ceil(res0 / 25000);
                if(BT > eckeBT) BT = eckeBT;
            }
            var transfleet = document.createElement('div');
            transfleet.id = 'transfleet';
            transfleet.innerHTML =  '<img src="img/layout/icon-transport.gif" style="position: relative; left: 17px; top: 4px" id="sendtrans" >'+
                                    '<select id="trans_sl" style="position: relative; left: 20px; top: 1px">'+sl_select+'</select>'+
                                    '<BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="tfbut" style="position: relative; left: 24px; top: 1px">'+nameMT+":"+MT0.toString()+'</BUTTON>\n'+
                                    '<BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="tfbut1" style="position: relative; left: 24px; top: 1px">'+nameBT+":"+BT0.toString()+'</BUTTON>\n'+
                                    '<BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="tfbut2" style="position: relative; left: 24px; top: 1px">'+MT.toString()+'/'+BT.toString()+'</BUTTON>';
            document.getElementById('inhalt').appendChild(transfleet);
            
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('tfbut').onclick=function(){\n"+
                    "localStorage.setItem('transfleet', '100');\n"+
                    "var selplan = document.getElementById('trans_sl');\n"+
                    "if ( selplan.selectedIndex != -1)\n"+
                    "{\n"+
                        'var coords = selplan.options[selplan.selectedIndex].value.split("#");\n'+
                        'localStorage.setItem("coordstf",selplan.options[selplan.selectedIndex].value);\n'+
                        "document.getElementsByName('mission')[0].value = 3;\n"+
                        "document.getElementsByName('position')[0].value = coords[2];\n"+
                        "document.getElementsByName('system')[0].value = coords[1];\n"+
                        "document.getElementsByName('galaxy')[0].value = coords[0];\n"+
                    "}\n"+
                    "document.getElementById('ship_202').value ="+MT0.toString()+";\n"+
                    "document.getElementById('ship_202').onchange();\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('tfbut').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('tfbut1').onclick=function(){\n"+
                    "localStorage.setItem('transfleet', '100');\n"+
                    "var selplan = document.getElementById('trans_sl');\n"+
                    "if ( selplan.selectedIndex != -1)\n"+
                    "{\n"+
                        'var coords = selplan.options[selplan.selectedIndex].value.split("#");\n'+
                        'localStorage.setItem("coordstf",selplan.options[selplan.selectedIndex].value);\n'+
                        "document.getElementsByName('mission')[0].value = 3;\n"+
                        "document.getElementsByName('position')[0].value = coords[2];\n"+
                        "document.getElementsByName('system')[0].value = coords[1];\n"+
                        "document.getElementsByName('galaxy')[0].value = coords[0];\n"+
                    "}\n"+
                    "document.getElementById('ship_203').value ="+BT0.toString()+";\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('tfbut1').appendChild(expscript);
            var expscript = document.createElement('script');
            expscript.innerHTML = '\n'+
                "document.getElementById('tfbut2').onclick=function(){\n"+
                    "localStorage.setItem('transfleet', '100');\n"+
                    "var selplan = document.getElementById('trans_sl');\n"+
                    "if ( selplan.selectedIndex != -1)\n"+
                    "{\n"+
                        'var coords = selplan.options[selplan.selectedIndex].value.split("#");\n'+
                        'localStorage.setItem("coordstf",selplan.options[selplan.selectedIndex].value);\n'+
                        "document.getElementsByName('mission')[0].value = 3;\n"+
                        "document.getElementsByName('position')[0].value = coords[2];\n"+
                        "document.getElementsByName('system')[0].value = coords[1];\n"+
                        "document.getElementsByName('galaxy')[0].value = coords[0];\n"+
                    "}\n"+
                    "document.getElementById('ship_202').value ="+MT.toString()+";\n"+
                    "document.getElementById('ship_202').onchange();\n"+
                    "document.getElementById('ship_203').value ="+BT.toString()+";\n"+
                    "document.getElementById('ship_203').onchange();\n"+
                    "document.getElementById('continue').onclick();};\n";
            document.getElementById('tfbut2').appendChild(expscript);
            
            var cargos = localStorage.getItem("cargos");
            if(cargos) {
                cargos = JSON.parse(cargos);
                var atackfleet = document.createElement('div');
                atackfleet.id = 'atackfleet';
                atackfleet.innerHTML =  '<img src="img/layout/icon-angriff.gif" style="position: relative; left: 17px; top: 4px" id="sendatack" >'+
                                        '<BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="cbut"  style="position: relative; left: 20px; top: 1px">'+nameMT+":"+cargos[0].toString()+'</BUTTON>\n'+
                                        '<BUTTON TYPE="SUBMIT" ONCLICK="alert(0); return false;"  id="cbut1" style="position: relative; left: 20px; top: 1px">'+nameBT+":"+cargos[1].toString()+'</BUTTON>\n';
                document.getElementById('inhalt').appendChild(atackfleet);
                var expscript = document.createElement('script');
                expscript.innerHTML = '\n'+
                    "document.getElementById('cbut').onclick=function(){\n"+
                        "localStorage.removeItem('cargos');\n"+
                        "document.getElementById('ship_202').value ="+cargos[0]+";\n"+
                        "document.getElementById('ship_202').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n";
                document.getElementById('cbut').appendChild(expscript);
                var expscript = document.createElement('script');
                expscript.innerHTML = '\n'+
                    "document.getElementById('cbut1').onclick=function(){\n"+
                        "localStorage.removeItem('cargos');\n"+
                        "document.getElementById('ship_203').value ="+cargos[1]+";\n"+
                        "document.getElementById('ship_203').onchange();\n"+
                        "document.getElementById('continue').onclick();};\n";
            document.getElementById('cbut1').appendChild(expscript);
            }
        }
	}
	catch (e) {}
    
}) ()

