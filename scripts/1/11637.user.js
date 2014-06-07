// ==UserScript==
// @name           toggleTreeComment
// @namespace      ru.zagrebelin.lepra
// @include        http://leprosorium.ru/comments/*
// @include        http://leprosorium.ru/my/inbox/*
// @include        http://www.leprosorium.ru/comments/*
// @include        http://www.leprosorium.ru/my/inbox/*
// @description   Добавляет кнопку "показывать коменты деревом." или "списком". Работаает так, как будто бы комментарии сортируются 
//         "По умолчанию, удобно, приятно, радует взгляд. Выбор большинства."
// ==/UserScript==

function removeIndent(objNode){
    s="(\\bindent_[012345678]+\\b)"
    objNode.className = objNode.className.replace( new RegExp(s, 'gi'), '' );
}
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
function addClass( objNode, strNewClass ) {
    replaceClass( objNode, strNewClass, '' );
}
function replaceClass( objNode, strNewClass, strCurrClass ) {
    var strOldClass = strNewClass;
    if ( strCurrClass && strCurrClass.length ){
        strCurrClass = strCurrClass.replace( /\s+(\S)/g, '|$1' );
        if ( strOldClass.length ) strOldClass += '|';
        strOldClass += strCurrClass;
    }
    objNode.className = objNode.className.replace( new RegExp('(^|\\s+)(' + strOldClass + ')($|\\s+)', 'g'), '$1' );
    objNode.className += ( (objNode.className.length)? ' ' : '' ) + strNewClass;
}
function  xPathAll(s, parent){
    return document.evaluate(s, parent, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
}
function xPathSingle(xpath, parent){
    return document.evaluate(xpath, parent, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function toggleTree(){
    // тут надо как бы найти все коменты.
    // расставить class indent_0, indent_1, indent_2...
    // выстроить их в вертикальном порядке 
    
    // сначала делаем, как будто они все top level/
    dts = xPathAll("//div[@class='dt']", document)
    for(idx=0; idx<dts.snapshotLength; idx++){
        dt = dts.snapshotItem(idx);
        dt.parentNode.setAttribute("indent", "0");
    }
    
    // теперь расставляем по уровням вложенности.
    pids = xPathAll("//a[contains(@class, 'show_parent')]", document);
    for(idx=0; idx<pids.snapshotLength; idx++){
        pid = pids.snapshotItem(idx);
        id = pid.getAttribute("replyto");
        postThis = pid.parentNode.parentNode.parentNode;

        // На какой пост отвечаем? Вот на этот.
        postParent = document.getElementById(id);
        
        // а какой глубины ставить ноду? Разумеется, как у parent, но +1. И не больше 8-ми.
        indent = postParent.getAttribute("indent");
        indent = parseInt(indent)+1;
        if(indent==9)
            indent=8;
        removeIndent(postThis);
        addClass(postThis, "indent_"+indent);
        postThis.setAttribute("indent", indent);
    }
    // а теперь расставить по порядку. Как-то нужно предусмотреть, чтобы обрабатывать ситуацию "Странно, непривычно, может вызывать головокружение".
    for(idx=0; idx<pids.snapshotLength; idx++){
        pid = pids.snapshotItem(idx);
        id = pid.getAttribute("replyto");
        postParent = document.getElementById(id);
        postThis = pid.parentNode.parentNode.parentNode;
        indent = postParent.getAttribute("indent");
        //Куда втыкать? Нужно найти div, что идёт после parent'a и имеет indent<=parent. Если нифига не нашли, то втыкаем сразу за parent
        s="./following-sibling::div[number(@indent)<="+(indent)+"]";
        postInsert = xPathSingle(s, postParent);
        if(postInsert==null){
            postInsert = postParent.nextSibling;
        }
        postParent.parentNode.insertBefore(postThis, postInsert);
    }
    $('lepra.comments.setPlain').style.display = "inline"
    $('lepra.comments.setTree').style.display = "none"
    return false;
}

function togglePlain(){
    // тут надо как бы найти все коменты.
    // выстроить их в вертикальном порядке по ID'ам
    // расставить class indent_0
    dts = xPathAll("//div[contains(@class, 'tree')]/div[@class='dt']", document)
    ids=new Array();
    // сейчас их делает ровненько, заодно собираем id'ы
    for(idx=0; idx<dts.snapshotLength; idx++){
        dt = dts.snapshotItem(idx);
        dt.parentNode.setAttribute("indent", "0");
        removeIndent(dt.parentNode);
        addClass(dt.parentNode, "indent_0");
        ids.push( dt.parentNode.getAttribute("id") );
    }
    // сортируем id'ы. Возможно, потребуется добавить ids.reverse(), если надо чтобы кружилась голова.
    ids = ids.sort();
    // расставляем посты по порядку. Нужно уточнить место, куда втыкать. 
    for(var idx in ids){
        id = ids[idx];
        thisPost = document.getElementById(id);
        thisPost.parentNode.appendChild(thisPost);
    }
    // Получилась такая штука, что форма коммента стала наверху. Надо её опустить вниз.
//    replyForm = document.getElementById("reply_form");
    $('content_left_inner').appendChild($("reply_form"));
    $('lepra.comments.setPlain').style.display = "none"
    $('lepra.comments.setTree').style.display = "inline"
    return false;
}
function $(id){
    return document.getElementById(id)
}
function createButton(){
    td = xPathSingle("//td[@class='system']", document);
    span = document.createElement("span");
    span.appendChild(document.createTextNode("Деревом"));
    span.addEventListener("click", function(e){return toggleTree();}, true);
    span.setAttribute("id", "lepra.comments.setTree");
    td.appendChild(span);
    span = document.createElement("span");
    span.appendChild(document.createTextNode("Списком"));
    span.addEventListener("click", function(e){return togglePlain();}, true);
    span.setAttribute("id", "lepra.comments.setPlain");
    span.style.display="none";
    td.appendChild(span);
    addGlobalStyle("td.system span {cursor:pointer}");
}


createButton();