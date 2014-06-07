// ==UserScript==
// @description    Рисуем рамочки вокруг моих коментов и коментов, которые адресованы мне. Синиие рамочки вокруг моих коментов, зелёные -- которые для меня.
// @name           myComments
// @namespace      ru.zagrebelin.lepra
// @include        http://leprosorium.ru/comments/*
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://www.leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/my/inbox/*
// @exclude        http://leprosorium.ru/my/inbox/
// @exclude        http://www.leprosorium.ru/my/inbox/
// ==/UserScript==
// Несколько функций ниже были спизжены из кода лепры. Витенька молодец [x]
function $(id){return document.getElementById(id)}
function addGlobalStyle(css) { var head, style; head = document.getElementsByTagName('head')[0];if (!head) { return; } style = document.createElement('style');    style.type = 'text/css';    style.innerHTML = css;    head.appendChild(style);} 
function addClass(objNode, strNewClass ) {    replaceClass( objNode, strNewClass, '' );}
function replaceClass(objNode, strNewClass, strCurrClass) { var strOldClass = strNewClass; if ( strCurrClass && strCurrClass.length ){ strCurrClass = strCurrClass.replace( /s+(S)/g, '|$1' ); if ( strOldClass.length ) strOldClass += '|'; strOldClass += strCurrClass; } objNode.className = objNode.className.replace( new RegExp('(^|\s+)(' + strOldClass + ')($|\s+)', 'g'), '$1' ); objNode.className += ( (objNode.className.length)? ' ' : '' ) + strNewClass;}
function removeClass(objNode, strCurrClass ){replaceClass( objNode, '', strCurrClass );}
function  xPathAll(s, parent){return document.evaluate(s, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)}
function xPathSingle(xpath, parent){return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;}

function createStyleSheet(){
    addGlobalStyle("div.u"+user.id+" {display:block!important}\n div.u"+user.id+" div.dt{border:1px dotted blue;}\n"+
                   "div.r"+user.id+" {display:block!important}\n div.r"+user.id+" div.dt{border:1px dotted green;}\n");
}

function findMyComments(){
    var divs = xPathSingle("//div[contains(@class, 'u"+user.id+"')]", document);
    if(divs!=null)
        needButton = true;
    return (divs!=null);
}

function findReply(){
    var rcNewStyle=findReplyNewStyle(user);
    var rcOldStyle=findReplyOldStyle(user);
    return rcNewStyle || rcOldStyle;
}

function findReplyNewStyle(){
    var rc=false;
    var pids = xPathAll("//a[contains(@class, 'show_parent')]", document);
    for(idx=0; idx<pids.snapshotLength; idx++){
        var pid = pids.snapshotItem(idx);
        var id = pid.getAttribute("replyto");
        var postThis = pid.parentNode.parentNode.parentNode;
        
        var postParent = document.getElementById(id);
        if(postParent!=null){
            pid=/u(\d+)/.exec(postParent.getAttribute("class"))[1]
            if(pid==user.id){
                addClass(postThis, "r"+user.id);
                needButton=true;
                rc=true;
            }
        }
    }
    return rc;
}
function findReplyOldStyle(){
    divs = xPathAll("//div[@class='dt'][contains(text(), '"+user.name+":')]", document)
    for(idx=0; idx<divs.snapshotLength; idx++){
        div = divs.snapshotItem(idx);
        addClass(div.parentNode, "r"+user.id);
        needButton=true;
        rc=true;
    }
    return divs.snapshotLength>0;
}

function getUserData(){
    var userid = /uid=(\d+)/.exec(document.cookie)[1];
    var xpath = "//a[contains(@href, '/users/"+userid+"')]";
    var username = xPathSingle( xpath, document).innerHTML;
    return {id: userid, name: username};
}

function createButton(buttonName, css){
        var td = xPathSingle("//td[@class='system']", document);
        var span = document.createElement("span");
        span.appendChild(document.createTextNode(buttonName));
        span.addEventListener("click", 
            function(e){
                addGlobalStyle(css);
                e.target.parentNode.removeChild(e.target);
            }, true);
        td.appendChild(span);
        addGlobalStyle("td.system span {cursor:pointer}");
}

function createButtons(){
    if(findReply()){
        createButton("Тут есть для меня?", "div.r"+user.id+" {display:block!important}\n div.r"+user.id+" div.dt{border:1px dotted green;}\n");
    }
    if(findMyComments()){
        createButton("А где моё?", "div.u"+user.id+" {display:block!important}\n div.u"+user.id+" div.dt{border:1px dotted blue;}\n");
    }
}
user = getUserData();
createButtons();