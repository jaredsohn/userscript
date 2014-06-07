// ==UserScript==
// @name           AutoExpoFleet 256 LCs
// @namespace      userscripts.org
// @description    Auto expo 256 LCs
// @version        1.0.0
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// ==/UserScript==

(function() 
{
    var shipsNoSat = new Array();
    shipsNoSat.push({id:203, name:"203", n:0, c:0, expo:47});   //Большой транспорт
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
        clearUseShip(202);
        calcUseShip(202, null); 
    }
    
    function calcExp(variant)
    {
        evaluemax = evalue;
        calcUseShip(203, null);

    }

    function fillexpofleet ()
    {
        var text = 'ExpoPoints: '+ countEvalue () + '|';
        var sOncl = 'setMaxIntInput ({ ';
        var s1ncl = 'setMaxIntInput ({ ';
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
            expofleet.innerHTML =    '<table cellspacing="5px" style="position: relative; left: 12px; top: 0px">' +
                            '<tr align="right">' +
                                '<td><img src="img/layout/icon-expedition.gif" id="sendexpo" ></td>' +
                                '<td><a href="#" id="eflbut12k"> <b>Экспа 256БТ</b> </a></td>' +
                            '</tr>' +
                        '</table>';
            var i9k = i12k = 0;
            var e12k = 12000;
            for (var i = 1; i <= 7; i++)
            {
                evalue = 12000;
                fillShips ();
                calcExp (i);
                if(Math.abs(evalue) <= e12k) {i12k = i; e12k = Math.abs(evalue);}
            }
            if(i12k == 0) i12k = 7;

            document.getElementById ('buttonz').insertBefore (expofleet, document.getElementById ('allornone'));


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
