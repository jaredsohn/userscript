// ==UserScript==
// @name          WaniKani True Result
// @namespace     http://www.wanikani.com
// @description   WaniKani True Result by Alucardeck
// @version 0.22
// @include       http://www.wanikani.com/review
// @include		  http://www.wanikani.com/review/session
// @include		  http://www.wanikani.com/review/session/start
// @grant       none
// ==/UserScript==

//Functions
function get(id) {
    if (id && typeof id === 'string') {
        id = document.getElementById(id);
    }
    return id || null;
}
function setStorageItem(id,value){
	window.localStorage.setItem(storagePrefix+id,value);
}
function getStorageItem(id){
    return window.localStorage.getItem(storagePrefix+id);
}
function formatTime(time, format) {
    var hr  = Math.floor(time/3600000);
    var min = Math.floor((time-hr*3600000)/60000);
    var sec = Math.floor((time-hr*3600000-min*60000)/1000);
    var mili = time%1000;
    if (hr < 10){ hr = "0" + hr; }
    if (min < 10){ min = "0" + min; }
    if (sec < 10){ sec = "0" + sec; }
    var ft = format.replace('hh', hr).replace('mm', min).replace('ss', sec);
    return ft;
}
function applyResult(){
    var perfNode = get('performance');
    var vocabNodes = perfNode.getElementsByClassName('vocabulary');
    var vuCount = 0;
    var vtCount = vocabNodes.length;
    for(var n=0; n<vocabNodes.length; n++){
        var resNode = vocabNodes[n].parentNode.childNodes[1];
        var className = resNode.className;
        if(className == 'up'){
            vuCount++;
        }
    }
    
    var kanjiNodes = perfNode.getElementsByClassName('kanji');
    var kuCount = 0;
    var ktCount = kanjiNodes.length;
    for(var n=0; n<kanjiNodes.length; n++){
        var resNode = kanjiNodes[n].parentNode.childNodes[1];
        var className = resNode.className;
        if(className == 'up'){
            kuCount++;
        }
    }
    
    var radNodes = perfNode.getElementsByClassName('radical');
    var ruCount = 0;
    var rtCount = radNodes.length;
    for(var n=0; n<radNodes.length; n++){
        var resNode = radNodes[n].parentNode.childNodes[1];
        var className = resNode.className;
        if(className == 'up'){
            ruCount++;
        }
    }
    
    var totalDiv = document.createElement('div');
    var rTitle = document.createElement('h2');
    var kTitle = document.createElement('h2');
    var vTitle = document.createElement('h2');
    var tTitle = document.createElement('h2');
    var tpTitle = document.createElement('h1');
    var resTitle = document.createElement('h2');
    var timeTitle = document.createElement('h1');
    totalDiv.appendChild(rTitle);
    totalDiv.appendChild(kTitle);
    totalDiv.appendChild(vTitle);
    totalDiv.appendChild(tTitle);
    totalDiv.appendChild(tpTitle);
    totalDiv.appendChild(resTitle);
    totalDiv.appendChild(timeTitle);
    
    if(rtCount>0){
        var rp = (ruCount/rtCount*100).toFixed(1);
        rTitle.appendChild(document.createTextNode('Radical: '+(ruCount)+'/'+(rtCount)+' - '+rp+'%'));
    }else{
        rTitle.appendChild(document.createTextNode('Radical: -'));
    }
    if(ktCount>0){
        var kp = (kuCount/ktCount*100).toFixed(1);
        kTitle.appendChild(document.createTextNode('Kanji: '+(kuCount)+'/'+(ktCount)+' - '+kp+'%'));
    }else{
        kTitle.appendChild(document.createTextNode('Kanji: -'));
    }
    if(vtCount>0){
        var vp = (vuCount/vtCount*100).toFixed(1);
        vTitle.appendChild(document.createTextNode('Vocabulary: '+(vuCount)+'/'+(vtCount)+' - '+vp+'%'));
    }else{
        vTitle.appendChild(document.createTextNode('Vocabulary: -'));
    }
    var tuCount = ruCount+kuCount+vuCount;
    var ttCount = rtCount+ktCount+vtCount;
    if(ttCount>0){
        var tp = (tuCount/ttCount*100).toFixed(1);
        tTitle.style.fontWeight = 'bold';
        tTitle.appendChild(document.createTextNode('TOTAL: '+tuCount+'/'+ttCount+''));
        tpTitle.style.fontWeight = 'bold';
        tpTitle.appendChild(document.createTextNode(tp+'% success!'));
        var resTxt = '';
        if(tp>=90){
            resTxt = 'おめでとう!! <(^.^)>'
        }else{
            resTxt = 'がんばれ! <(T-T)>'
        }
        var resLbl = document.createTextNode(resTxt);
        resTitle.appendChild(resLbl);
    }else{
        tTitle.appendChild(document.createTextNode('TOTAL: -'));
    }
    
    if(getStorageItem('startTime') && getStorageItem('endTime') && ttCount>0){
        var timemilis = getStorageItem('endTime') - getStorageItem('startTime');
        var str = formatTime(timemilis,'hh:mm:ss');
        var rpm = (ttCount/(timemilis/1000/60)).toFixed(2);
        timeTitle.appendChild(document.createTextNode('Total Time: '+str+' (RPM: '+rpm+')'));
    }
    
    perfNode.insertBefore(totalDiv,perfNode.firstChild);
}

//Vars
var storagePrefix = 'WK.trueResult.';
var path = window.location.pathname;
var storage = window.localStorage;
var ST_WAITING = 0;
var ST_RUNNING = 1;

//Code
if(!getStorageItem('status')){
    setStorageItem('status',ST_WAITING);
}
if(path == '/review/session' || path == '/review/session/start'){
    if(getStorageItem('status') != ST_RUNNING){
        setStorageItem('status',ST_RUNNING);
    	setStorageItem('startTime',Date.now());
    }
}else if(path == '/review'){
    if(getStorageItem('status') == ST_RUNNING){
	  	setStorageItem('status',ST_WAITING);
    	setStorageItem('endTime',Date.now());
    }
    applyResult();
}