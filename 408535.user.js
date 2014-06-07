// ==UserScript==
// @name          WaniKani Lesson Ordering II
// @namespace     https://www.wanikani.com
// @description   This allows you to sort the items in your WaniKani lessons, either putting the Radicals and Kanji first, or the Vocabulary first. By RhosVeedcy, based on scripts originally by Alucardeck.
// @version 1.3.3
// @downloadURL   https://userscripts.org/scripts/source/408535.user.js
// @updateURL     https://userscripts.org/scripts/source/408535.meta.js
// @include       http://www.wanikani.com/lesson/session
// @include       https://www.wanikani.com/lesson/session
// @run-at	  document-end
// @grant         none
// ==/UserScript==


function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}



function simulateKeyPressA() {
	var f4Event = document.createEvent("KeyboardEvent");
	var evtTarget = get("lesson");
	f4Event.initKeyEvent(
		"keydown", // event type
		true, // if your event can bubble
		true, // if your event is cancelable
		window, // abstract view (an obscure DOM requirement)
		false, // if ctrlKey is down
		false, // if altKey is down
		false, // if shiftKey is down
		false, // if the "meta" key is down (usually, the Windows key)
		65, // the keyCode -- 65 is keyCode for “a”
		65 // the charCode 
	);
	evtTarget.dispatchEvent(f4Event);
	console.log('simulateKeyPressA() keydown');
	var f4Event2 = document.createEvent("KeyboardEvent");
	f4Event2.initKeyEvent(
		"keyup", // event type
		true, // if your event can bubble
		true, // if your event is cancelable
		window, // abstract view (an obscure DOM requirement)
		false, // if ctrlKey is down
		false, // if altKey is down
		false, // if shiftKey is down
		false, // if the "meta" key is down (usually, the Windows key)
		65, // the keyCode -- 65 is keyCode for “a”
		65 // the charCode 
	);
	evtTarget.dispatchEvent(f4Event2);
	console.log('simulateKeyPressA() keyup');
}


function cancelOffer() {

	console.log("cancelOffer()");
	
 	var divSt = get("divSt");
	hideButtons();
	divSt.innerHTML = '';
	clearInterval(cancelInt);
}


function checkForMovement(){

    console.log('checkForMovement()');

    var lastRead = $.jStorage.get("l/lastRead", -1);
    
    if (lastRead >= 0) {

	cancelOffer(); 
    }
}



function init(){

    console.log('init() start');

/*
    $.jStorage.flush();
    $.jStorage.reInit();

    var rads = $.jStorage.get("l/count/rad", 1);  -- can't rely on these being inited properly... commenting out this block for now
    var kans = $.jStorage.get("l/count/kan", 1);
    var vocs = $.jStorage.get("l/count/voc", 1);

    // if all three are zero, it means WK just hasn't initialized them yet
    
    if ((rads || kans || vocs) && ((vocs == 0 && (rads == 0 || kans == 0)) || (vocs > 0 && rads == 0 && kans == 0))) {

	return false;  // no need for reordering
    }
*/

    var stats = $("#stats")[0];
    var t = document.createElement('div');
    var t2 = document.createElement('div');
    stats.appendChild(t);
    stats.appendChild(t2);

    t.innerHTML = '<div id="divSt">Click below to reorder lesson items</div>'+
        '<button id="reorderBtn" type="button" onclick="window.dispatchEvent(new Event(\'reorderRKevt\'));">Radicals and Kanji first</button>'+
        '</div>';
    t2.innerHTML = '<button id="reorderVBtn" type="button" onclick="window.dispatchEvent(new Event(\'reorderVevt\'));">Vocabulary items first</button>'+
        '</div>';

    window.addEventListener('reorderRKevt',reorder); 
    window.addEventListener('reorderVevt',reorderV); 

/*
    var theElem;

    if (rads == 0) {   -- can't rely on these being inited properly... commenting out this block for now

	theElem = get("reorderBtn");
	theElem.innerHTML = "Kanji first";
	theElem = get("reorderVBtn");
	theElem.innerHTML = "Vocabulary first";
    }

    if (kans == 0) {

	theElem = get("reorderBtn");
	theElem.innerHTML = "Radicals first";
	theElem = get("reorderVBtn");
	theElem.innerHTML = "Vocabulary first";
    }

    if (vocs == 0) {

	theElem = get("reorderBtn");
	theElem.innerHTML = "Radicals first";

	theElem = get("reorderVBtn");
	theElem.style.visibility="hidden";
    }
*/

    console.log('init() end');
    return true;
}

function hideButtons(){
    var reorderBtn = get("reorderBtn");
    var reorderVBtn = get("reorderVBtn");
    reorderBtn.style.visibility="hidden";
    reorderVBtn.style.visibility="hidden";
}

function reorder(){
    console.log('reorder() start');
    var divSt = get("divSt");
    hideButtons();
    divSt.innerHTML = 'Reordering.. please wait!';

	var f4Event = document.createEvent("KeyboardEvent");
	var strt = 0;
    if (! f4Event.initKeyEvent) { strt++; }

    var actList = $.jStorage.get("l/activeQueue");
    var lesList = $.jStorage.get("l/lessonQueue");
    
    var removedCount = 0;
    for(var i=strt;i<actList.length;i++){
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

    lesList.reverse();
        
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
    
    if (strt == 0) {
    	for(var i=0;i<actList.length;i++){
			simulateKeyPressA();
    	}
    }
    
    divSt.innerHTML = 'Ordered: radicals and kanji first';
    clearInterval(cancelInt);

    console.log('reorder() end');
}

function reorderV(){
    console.log('reorderV() start');
    var divSt = get("divSt");
    hideButtons();
    divSt.innerHTML = 'Reordering.. please wait!';

	var f4Event = document.createEvent("KeyboardEvent");
	var strt = 0;
    if (! f4Event.initKeyEvent) { strt++; }

    var actList = $.jStorage.get("l/activeQueue");
    var lesList = $.jStorage.get("l/lessonQueue");
    
    var removedCount = 0;
    for(var i=strt;i<actList.length;i++){
        var it = actList[i];
        actList.splice(i--,1);
        lesList.push(it);
        removedCount++;
    }
    console.log('Items removed from ActiveQueue: '+removedCount);
    
    for(var i=lesList.length-1;i>=0;i--){
        var it=lesList[i];
        if(it.voc){
           lesList.splice(i,1);
           lesList.push(it);
        }
    }
    
    for(var i=0;i<removedCount;i++){
        actList.push(lesList.pop());
    }
        
    lesList.reverse();

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
    
    if (strt == 0) {
    	for(var i=0;i<actList.length;i++){
			simulateKeyPressA();
    	}
    }
    
    divSt.innerHTML = 'Ordered: vocabulary first';
    clearInterval(cancelInt);

    console.log('reorderV() end');
}


function main() {

	if (init()) {
		cancelInt = setInterval(function(){checkForMovement()},100);
	}
}



console.log('WK Lesson Ordering II script load start');

var cancelInt;

window.addEventListener("load", main, false);

console.log('WK Lesson Ordering II script load end');


