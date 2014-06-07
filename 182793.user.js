// ==UserScript==
// @name          WaniKani Lesson Order
// @namespace     https://www.wanikani.com
// @description   WaniKani Lesson Order by Alucardeck
// @version 0.04
// @include       https://www.wanikani.com/lesson/session
// @include       http://www.wanikani.com/lesson/session
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
    t.innerHTML = '<div id="divSt">Not Ordered!</div><button id="reorderBtn" type="button" onclick="window.dispatchEvent(new Event(\'reorderWK\'));">Reorder!</button></div>';
    window.addEventListener('reorderWK',reorder); 
    console.log('init() end');
}

function reorder(){
    console.log('reorder() start');
    var divSt = get("divSt");
    var reorderBtn = get("reorderBtn");
    reorderBtn.style.visibility="hidden";
    divSt.innerHTML = 'Reordering.. please wait!';
	var actList = $.jStorage.get("l/activeQueue");
	var lesList = $.jStorage.get("l/lessonQueue");
    
    var removedCount = 0;
    for(var i=1;i<actList.length;i++){
        var it = actList[i];
        actList.splice(i--,1);
        lesList.push(it);
        removedCount++;
    }
    console.log('Items removed from ActiveQueue: '+removedCount);
    
    for(var i=lesList.length-1;i>=0;i--){
        var it=lesList[i];
        if(it.kan){
           lesList.splice(i,1);
           lesList.push(it);
        }
    }
    for(var i=lesList.length-1;i>=0;i--){
        var it=lesList[i];
        if(it.rad){
           lesList.splice(i,1);
           lesList.push(it);
        }
    }
    
    for(var i=0;i<removedCount;i++){
        actList.push(lesList.pop());
    }
        
    console.log('Ordered LessonQueue:');
    for(var i=0;i<lesList.length;i++){
        var it=lesList[i];
        if(it.rad)
        	console.log('rad '+it.rad);
        else if(it.kan)
           	console.log('kan '+it.kan);
        else if(it.voc)
            console.log('voc '+it.voc);
    }
    
    $.jStorage.set("l/lessonQueue",lesList);
    $.jStorage.set("l/activeQueue",actList);
    divSt.innerHTML = 'Done!';
    console.log('reorder() end');
}

init();
console.log('script load end');