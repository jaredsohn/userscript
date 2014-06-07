// ==UserScript==
// @name          WaniKani Review Order
// @namespace     https://www.wanikani.com
// @description   WaniKani Review Order by Alucardeck
// @version 0.35
// @include       https://www.wanikani.com/review/session
// @include       http://www.wanikani.com/review/session
// @grant       none
// ==/UserScript==
function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}

function init(){
	console.log('init() start');
	var stats = $("#stats")[0];
    var t = document.createElement('div');
    stats.appendChild(t);
    
    t.innerHTML = '<div id="wkroStatus"><table align="right"><tbody>'+
        '<tr><td>Rad</td><td align="right"><span id="wkroRadCount"></span></td></tr>'+
        '<tr><td>Kan</td><td align="right"><span id="wkroKanCount"></span></td></tr>'+
        '<tr><td>Voc</td><td align="right"><span id="wkroVocCount"></span></td></tr>'+
        '</tbody></table></div><div id="divSt">Not Ordered!</div>'+
        '<button id="reorderBtn1" type="button" onclick="window.dispatchEvent(new Event(\'reorderWKBulk\'));">Bulk Mode</button>'+
        '<button id="reorderBtn2" type="button" onclick="window.dispatchEvent(new Event(\'reorderWKSingle\'));">Single Mode</button>'+
        '</div>';
    $.jStorage.listenKeyChange("activeQueue",displayUpdate);
	window.addEventListener('reorderWKSingle',reorderSingle); 
	window.addEventListener('reorderWKBulk',reorderBulk); 
    displayUpdate();
	console.log('init() end');
}

function reorderBulk(){
    //Reordering method following original parameters of 10 activeQueue list
    method = "BULK";
    reorder();
}

function reorderSingle(){
    //Reordering method following the 1 activeQueue list, that makes both reading/meaning coming in pairs.
    //method = "SINGLE";
    //reorder();
    try{
        unsafeWindow.Math.random = function() { return 0;  }
    }catch(e){
        Math.random = function() { return 0;  }
    }
    reorderBulk();
}

function reorder(){
    console.log('reorder() start');
    var divSt = get("divSt");
    var reorderBtn1= get("reorderBtn1");
    var reorderBtn2= get("reorderBtn2");
    reorderBtn1.style.visibility="hidden";
    reorderBtn2.style.visibility="hidden";
    divSt.innerHTML = 'Reordering.. please wait!';
        
    var cur = $.jStorage.get("currentItem");
	var qt = $.jStorage.get("questionType");
	var actList = $.jStorage.get("activeQueue");
	var revList = $.jStorage.get("reviewQueue");
    
    console.log('current item: '+cur);
    var curt = cur.kan?'kan':cur.voc?'voc':'rad';
    
    var removedCount = 0;
    for(var i=0;i<actList.length;i++){
        var it = actList[i];
        var itt = cur.kan?'kan':cur.voc?'voc':'rad';
        console.log(it);
        if(!(curt==itt&&cur.id==it.id)){
           actList.splice(i--,1);
           revList.push(it);
           removedCount++;
        }
    }
    console.log('Items removed from ActiveQueue: '+removedCount);
    
    for(var i=revList.length-1;i>=0;i--){
        var it=revList[i];
        if(it.kan){
           revList.splice(i,1);
           revList.push(it);
           //console.log('kan '+it.kan);
        }
    }
    for(var i=revList.length-1;i>=0;i--){
        var it=revList[i];
        if(it.rad){
           revList.splice(i,1);
           revList.push(it);
           //console.log('rad '+it.rad);
        }
    }
    
    if(method=='BULK')
        for(var i=0;i<removedCount;i++)
        	actList.push(revList.pop());
    
    console.log('Ordered ReviewQueue:');
    for(var i=0;i<revList.length;i++){
        var it=revList[i];
        if(it.rad)
        	console.log('rad '+it.rad);
        else if(it.kan)
           	console.log('kan '+it.kan);
        else if(it.voc)
            console.log('voc '+it.voc);
    }
    
    $.jStorage.set("reviewQueue",revList);
    $.jStorage.set("activeQueue",actList);
    
    divSt.innerHTML = 'Done!';
    console.log('reorder() end');
}

function displayUpdate(){
    var radC = 0, kanC = 0, vocC = 0;
    var list = $.jStorage.get("reviewQueue").concat($.jStorage.get("activeQueue"));
    console.log('ReviewQueue ('+$.jStorage.get("reviewQueue").length+') ActiveQueue ('+$.jStorage.get("activeQueue").length+')');
    for(var i=0;i<list.length;i++){
        var it=list[i];
        if(it.rad)
        	radC++;
        else if(it.kan)
           	kanC++;
        else if(it.voc)
           	vocC++;
    }
    console.log('Rad '+radC+' Kan '+kanC+' Voc '+vocC);
    var radSpan = $("#wkroRadCount")[0];
    var kanSpan = $("#wkroKanCount")[0];
    var vocSpan = $("#wkroVocCount")[0];
    radSpan.innerHTML = radC;
    kanSpan.innerHTML = kanC;
    vocSpan.innerHTML = vocC;
}
var method = "";
init();
console.log('script load end');