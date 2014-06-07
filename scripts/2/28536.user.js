// ==UserScript==
// @name           Flickr Set List Sorter
// @namespace      http://endflow.net/
// @description    sort the list of your set when you push "ADD TO SET" button in photo page.
// @include        http://www.flickr.com/photos/*/*/
// @include        http://flickr.com/photos/*/*/
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Flickr: netkuy)
// @version        0.1.1 [2008-06-16]
// @history        [2008-06-16] 0.1.0 first version
// @history        [2008-06-16] 0.1.1 some improvement

(function(){
var cfg = {
    default:'name',
    interval:250,
    retry:20
};
var w = this.unsafeWindow || window;
w.addEventListener('load', function(){
    var btn = $('photo_gne_button_send_to_set');
    btn.addEventListener('click', function(){
        checkUI.retry = 0;
        setTimeout(checkUI, cfg.interval);
    }, false);
}, false);
function checkUI(){
    if(cfg.retry <= arguments.callee.retry) return;
    var divs = $x('id("sendToSetDialogListDiv")/div');
    if(divs.length == 0){
        arguments.callee.retry++;
        setTimeout(checkUI, cfg.interval);
    }else if($('add_to_set_sort_div') == null){
        setupUI();
    }
}
function setupUI(){
    // setup
    GM_addStyle(<><![CDATA[
        div.add_to_set_sort {
            position:absolute;
            right:0px;
            top:0px;
            margin:26px 24px 0 0;
        }
        div.add_to_set_sort ul {
            padding:0px;
            margin:0px;
        }
        li.add_to_set_sort {
            display:inline;
            cursor:pointer;
            margin-left:5px;
        }
    ]]></>);
    var liName = $n('LI');
    liName.setAttribute('id', 'add_to_set_sort_by_name');
    liName.className = 'add_to_set_sort';
    liName.innerHTML = 'name';
    liName.addEventListener('click', function(){sortByName()}, false);
    var liDate = $n('LI');
    liDate.setAttribute('id', 'add_to_set_sort_by_id');
    liDate.className = 'add_to_set_sort';
    liDate.innerHTML = 'date';
    liDate.addEventListener('click', function(){sortById()}, false);
    var ul = $n('UL');
    ul.appendChild(liName);
    ul.appendChild(liDate);
    var cont = $n('DIV');
    cont.setAttribute('id', 'add_to_set_sort_div');
    cont.className = 'add_to_set_sort';
    cont.appendChild(ul);
    var list = $('sendToSetDialogListDiv');
    list.appendChild(cont);
    // init
    sortBy(cfg.default);
}
function sortBy(name){
    switch(name){
        case 'name': sortByName(); break;
        case 'date': case 'id': sortById(); break;
        default: sortByName();
    }
}
function sortByName(){
    var ids = getIDs();
    // create dict
    var dict = {};
    var setNames = ids.map(function(id){
        var tdChild = $('add_to_set_' + id + '_td').firstChild;
        var setName = tdChild.nodeType == 3 ? tdChild.nodeValue : tdChild.firstChild.nodeValue;
        dict[setName] = id;
        return setName;
    });
    // sort 
    setNames.sort(function(a, b){
        if(a.toLowerCase() < b.toLowerCase()){
            return -1;
        }else if(a.toLowerCase() == b.toLowerCase()){
            return 0;
        }
        return 1;
    });
    // replace
    var list = $('sendToSetDialogListDiv');
    setNames.forEach(function(setName){
        var set = list.removeChild($('add_to_set_'+dict[setName]+'_div'));
        list.appendChild(set);
    });
    // hilight button
    hilight('name');
}
function sortById(){
    var ids = getIDs();
    // sort
    ids.sort(function(a, b){return b - a;});
    // replace
    var list = $('sendToSetDialogListDiv');
    ids.forEach(function(id){
        var set = list.removeChild($('add_to_set_'+id+'_div'));
        list.appendChild(set);
    });
    // hilight button
    hilight('id');
}
function getIDs(){
    return $x('id("sendToSetDialogListDiv")/div/@id').map(function(id){
        var id = id.nodeValue.match(/\d+/);
        if(id) return id[0];
    }).filter(function(id){
        return id != null;
    });
}
function hilight(sortOrder){
    $x('//li[@class="add_to_set_sort"]').forEach(function(li){
        li.style.fontWeight = 'normal';
    });
    $('add_to_set_sort_by_'+sortOrder).style.fontWeight = 'bold';
}
function $(id){return w.document.getElementById(id);}
function $n(tagName){return w.document.createElement(tagName);}
function log(msg){w.console.log(msg);}
// THX! XPath util compressed version (original written by cho45 [http://lowreal.net/logs/2006/03/16/1])
function $x(b,c){if(!c)c=document;var d=function(a){var o=document.createNSResolver(c)(a);
return o?o:(document.contentType=="text/html")?"":"http://www.w3.org/1999/xhtml"}
var b=document.createExpression(b,d);var e=b.evaluate(c,XPathResult.ANY_TYPE,null);
switch(e.resultType){case XPathResult.STRING_TYPE:return e.stringValue;
case XPathResult.NUMBER_TYPE:return e.numberValue;case XPathResult.BOOLEAN_TYPE:return e.booleanValue;
case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:{e=b.evaluate(c,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
var f=[];for(var i=0,len=e.snapshotLength;i<len;i++){f.push(e.snapshotItem(i))}return f}}return null}
})();
