// ==UserScript==
// @name           HWM_Quick_Class_Change
// @author         Рианти
// @description    Смена класса одним кликом с домашней страницы
// @homepage       http://userscripts.org/scripts/show/486353
// @version        1
// @include        http://www.heroeswm.ru/home.php*
// ==/UserScript==

var _scriptName = 'HWM_Quick_Class_Change';
var _formAction = "http://www.heroeswm.ru/castle.php";
var _ajaxTimeout = 4000;

var _c = new Collection();
_c.addClass(1, 'Рыцарь', 0, 'http://dcdn.heroeswm.ru/i/r1.gif');
_c.addClass(1, 'Рыцарь Света', 1, 'http://dcdn.heroeswm.ru/i/r101.gif');
_c.addClass(2, 'Некромант', 0, 'http://dcdn.heroeswm.ru/i/r2.gif');
_c.addClass(2, 'Некромант Повелитель Смерти', 1, 'http://dcdn.heroeswm.ru/i/r102.gif');
_c.addClass(5, 'Варвар', 0, 'http://dcdn.heroeswm.ru/i/r5.gif');
_c.addClass(5, 'Варвар Крови', 1, 'http://dcdn.heroeswm.ru/i/r105.gif');
_c.addClass(5, 'Варвар Шаман', 2, 'http://dcdn.heroeswm.ru/i/r205.gif');
_c.addClass(7, 'Демон', 0, 'http://dcdn.heroeswm.ru/i/r7.gif');
_c.addClass(7, 'Демон Тьмы', 1, 'http://dcdn.heroeswm.ru/i/r107.gif');

function Collection(){
    var _factionArr = [];

    this.addClass = function(factionId, className, classId, imageSrc){
        var f = getFaction(factionId);
        f.addClass(className, classId, imageSrc);
        _factionArr.push(f);

        function getFaction(id){
            var f, i = -1;
            while((f = _factionArr[++i]) != null){
                if(f.factionId == id) return _factionArr.splice(i, 1)[0];
            }
            return new Faction(id);
        }
    }
    this.getFactions = function(){
        return _factionArr;
    }
    function Faction(factionId){
        var _classArr = [];
        this.factionId = factionId;
        this.addClass = function(className, classId, imageSrc){
            _classArr.push({className: className, classId: classId, imageSrc: imageSrc});
        }
        this.getArr = function(){
            return _classArr;
        }
    }
}

function completeClasses(factions, curClassImage){
    // returns all classes of related faction except the current one
    var f, faction, c, result = null;
    for(f in factions){
        faction = factions[f].getArr();
        for(c in faction){
            if(faction[c].imageSrc == curClassImage){
                faction.splice(c, 1);
                result = faction;
                break;
            }
        }
        if(result) break;
    }
    return result;
}

function postRequest(target, params, ajaxCallback, timeoutHandler)
{
    var xmlhttp;
    if (window.XMLHttpRequest) xmlhttp = new XMLHttpRequest();
    else xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
            ajaxCallback(xmlhttp.responseText);
        }
    }
    xmlhttp.open('POST', target, true);
    xmlhttp.overrideMimeType('text/plain; charset=windows-1251');
    xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlhttp.timeout = _ajaxTimeout;
    xmlhttp.ontimeout = function(){
        timeoutHandler();
    }
    xmlhttp.send(params);
}

function changeClass(newClassId){
    document.body.style.cursor = 'progress';
    postRequest(_formAction, 'classid=' + newClassId,
        function (_){
            setTimeout(function(){location.reload()}, 100);
        },
        function(){
            document.body.style.cursor = 'default';
            alert(_scriptName + ': Ошибка, проверьте связь с интернетом.');
        }
    );
}

function appendEvent(classId){
    document.getElementById('sc' + classId).onclick = function(){changeClass(classId); this.style.cursor = 'progress'};
}

var icons = document.querySelector('.wb > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > center:nth-child(1)').getElementsByTagName('img');
var icon = icons[icons.length - 1];
var changeOptions = completeClasses(_c.getFactions(), icon.src);
if(changeOptions) {
    var o, option, i = 0, content = '(';
    for(o in changeOptions){
        option = changeOptions[o];
        content += (i++?' ':'') + '<img src="' + option.imageSrc + '" title="Изменить на: ' + option.className + '" align="absmiddle" border="0" height="15" width="15" style="cursor: pointer" id="sc' + option.classId + '">';
    }
    icon.parentNode.innerHTML += content + ')';
    for(o in changeOptions){
        appendEvent(changeOptions[o].classId);
    }
}