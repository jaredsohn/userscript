// ==UserScript==
// @name           Forvo download
// @namespace      runkit.ru
// @description    Download pronounce from forvo.com
// @include        http://www.forvo.com/*
// @include        http://*.forvo.com/*
// ==/UserScript==


//alert("adf");

var PATH = 'http://forvo.com/player-mp3Handler.php?path=';

run();

function run()
{
    res = xpath("//img[@width='23' and @height='23' and @src='/_presentation/img/ico_play.gif']");

    len = res.snapshotLength;

    if( len < 1 )
    {
        return 0;
    }

    for(var i = 0; i < len; i++){

        var objLink = res.snapshotItem(i).parentNode;
        
        var strLink = getMP3Link(objLink);

        objLink.parentNode.innerHTML = objLink.parentNode.innerHTML + strLink;
    }

    return 0;
}

function getMP3Link(obj)
{
    var str = obj.getAttribute('onclick');

    var expr = new RegExp(",'(.+)','");

    var code = expr.exec(str)[1];

    return '<a href="' + PATH + code + '">download</a>';
}

/**
 * Возращает первый результат xpath запроса query
 */
function xpathfirst(query, startingPoint){

    var res = xpath(query, startingPoint);

    if (res.snapshotLength == 0){return false;}

    return res.snapshotItem(0);
}
/**
 * Обертка для xpath запроса
 */
function xpath(query, startingPoint){

    if (startingPoint == null) {
        startingPoint = document;
    }
    var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    return retVal;
}
/**
 * Обертка для getElementsByTagName
 */
function _gt(e){return document.getElementsByTagName(e);}
/**
 * Обертка для getElementsByTagName
 */
function _gi(e){return document.getElementById(e);}
/**
 * Возращает целое случайное число.
 */
function getRandomInt(min, max)
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getFormatDate(format){

    var cur_time = new Date();

    return cur_time.getHours() + ":" + cur_time.getMinutes() + ":" + cur_time.getSeconds();
}

