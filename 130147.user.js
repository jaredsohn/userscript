// ==UserScript==
// @name           Merge forvo.com and lingvopro.abbyyonline.com
// @namespace      runkit.ru
// @description    Merge forvo.com and lingvopro.abbyyonline.com
// @include        http://www.forvo.com/*
// @include        http://forvo.com/*
// @include        http://*.forvo.com/*
// @include        http://lingvopro.abbyyonline.com/*
// ==/UserScript==

var loc = document.location.href;

if( (loc.search(/\/\/lingvopro.abbyyonline.com/) != -1) && (loc.search(/\?gm_helper$/) != -1) ){

    var objDiv = xpathfirst("//div[@class='data card']");

    document.body.innerHTML = objDiv.innerHTML;

    return 0;
}

if( document.documentElement.lastChild.getAttribute("class") != "ltr" ){
    return 0;
}

var expr = /\/([A-Za-z]+)/g;
                  
var result = loc.match(expr);

var url_part = result[result.length - 1];

var objDivForLingvo = xpathfirst("//div[@class='col_search_right']");
objDivForLingvo.innerHTML = "";
objDivForLingvo.style.padding = "0";
objDivForLingvo.style.height = "600px";

var objDiv = xpathfirst("//div[@class='col_search']");
frame_height = objDiv.clientHeight;

var url_full = "http://lingvopro.abbyyonline.com/ru/Translate/fr-ru/" + url_part + "?gm_helper";

var myFrame = new LoadDom(url_full, objDivForLingvo, frame_height-40);

myFrame.run();

/**
 * Загрузка страницы во фрейм
 **/
function LoadDom(url, obj, height)
{
        this.dom_url = url;

        var m_this = this;

        this.id = Math.floor( Math.random() * 1000 );

        this.element_id = "frame_" + this.id;

        this.run = function(){
                this.frame = document.createElement("iframe");
                this.frame.setAttribute("id", this.element_id);
                this.frame.setAttribute("name", this.element_id);
                this.frame.setAttribute("type", "content");
                this.frame.setAttribute("frameborder", "no");
                this.frame.setAttribute("height", height);
                this.frame.setAttribute("scrolling", "no");
                this.frame.style.visibility = "visible";
                objDivForLingvo.appendChild(this.frame);
                this.frame.contentDocument.location.href = this.dom_url;
        }
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



