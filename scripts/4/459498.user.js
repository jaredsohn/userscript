// ==UserScript==
// @name        Kickstarter Early Bird Watcher
// @namespace   kickstarter.earlybird.watcher
// @description Watches Early Bird options, i.e. options with limited availability.
// @include     https://www.kickstarter.com/projects/*
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

const RELOAD_WAIT = 30000;
const alarmURL = 'http://24hoursofhappy.com/';
const projectID = document.URL.split('/')[4];

var rewards = document.getElementsByClassName("backers-limits");
var numRewards = rewards.length;
var toggleBtn;
var timeoutID;
var reloads = getVar("reloads", 0);
watchlist = new Array(numRewards);

init();

function init(){
    initializeWatchlist();
    addCheckboxes();
    addStartStopButtons();
    
    if(getVar("stalking", false)) {
        toggleBtn.innerHTML = "Stop stalking [" + reloads + "]";
        
        for(i = 0; i < numRewards; i++){
            if(watchlist[i] && rewards[i].getElementsByClassName('sold-out').length == 0){
                window.open(alarmURL, '_blank');
                stopStalking();
                return;
            }
        }
        
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function(){
            setVar("reloads", reloads + 1);
            location.reload();
        }, RELOAD_WAIT);
    }
}

function initializeWatchlist(){
    for(i = 0; i < numRewards; i++){
        watchlist[i] = getVar(i.toString(), false);
    }
}

function addCheckboxes(){
    for(i = 0; i < numRewards; i++){
        if(rewards[i].getElementsByClassName("sold-out").length > 0){
            (function(){
                var watchBox = document.createElement('div');
                var j = i;
                watchBox.innerHTML = "<input type='checkbox'" + (watchlist[i] ? " checked" : "") + "> Watch!";
                watchBox.addEventListener("click", function(){ watchBird(j); }, false)
                rewards[i].appendChild(watchBox);
            }())
        }
    }
}

function addStartStopButtons(){
    toggleBtn = document.createElement('a');
    toggleBtn.className = "p2 block grey-dark h5 z6 bold";
    toggleBtn.innerHTML = "Start stalking";
    
    var container = document.createElement('ul');
    container.className = "list no-margin right";
    container.appendChild(toggleBtn);
    container.addEventListener("click", startStalking, false);
    container.style.cursor = 'pointer';

    var meBtn = document.getElementById("menu-sub");
    meBtn.parentNode.insertBefore(container, meBtn.nextSibling);
}

function startStalking(){
    this.removeEventListener("click", startStalking, false);
    
    setVar("reloads", 0);
    setVar("stalking", true);
    toggleBtn.innerHTML = "Stop stalking [0]";
    timeoutID = setTimeout(function(){
        location.reload();
    }, RELOAD_WAIT);
    
    this.addEventListener("click", stopStalking, false);
}

function stopStalking(){
    this.removeEventListener("click", stopStalking, false);
    
    setVar("stalking", false);
    toggleBtn.innerHTML = "Start stalking";
    clearTimeout(timeoutID);
    
    this.addEventListener("click", startStalking, false);
}

function watchBird(i){
    watchlist[i] = !watchlist[i];
    setVar(i.toString(), watchlist[i]);
}

function getVar(key, def){
    var k = projectID + key;

    return GM_getValue(k, def);
}

function setVar(key, value){
    var k = projectID + key;

    setTimeout(function(){
        GM_setValue(k, value);
    }, 0);
}