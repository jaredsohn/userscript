// ==UserScript==
// @name        InstallAllSteamGames
// @namespace   InstallAllSteamGames
// @description Install all Steam Games by the Steam protocol
// @include     http://steamcommunity.com/id/*/games?tab=all#installall
// @version     1
// @grant       none
// ==/UserScript==
// Made by the one and only real Master-Guy
// http://steamcommunity.com/id/Master-Guy/games?tab=all
// How it works:
// 1) Log in into Steam on the computer where you want to download the games.
// 2) Install this script on any computer, it may be the same one, or a different one. I used the same computer myself.
// 3) Go to the following URL, but replace the asterix (*) with your Steam Community name: http://steamcommunity.com/id/*/games?tab=all#installall
//
// For example:
// http://steamcommunity.com/id/Master-Guy/games?tab=all#installall
// 
// The script will wait 5 seconds before starting, and will trigger all game installation with 10 second intervals.
// The build-in download scheduler of Steam will pause the updates while starting the new one, and will only download one at a time.
// This is to optimize your download speed.
// This installed  around 400 games and 150 DLC's onto my computer in 8 hours of time without any further user intervention.
// It might however require you to start the script twice if the internet connection isn't optimal.

var timeBeforeFirstGame = 5000; // 5000 ms = 5 seconds, let the community page load before start!
var timeBetweenChecks = 1000; // 1000 ms = 1 second
var timePerGameTillDownloadStarts = 10000; // 10000 ms = 10 seconds, give games time to start downloading!

function installAll() {
    setInterval(getNextGame, timeBetweenChecks);
}

var myGamesList = document.getElementById('games_list_rows');
var myGames = myGamesList.childNodes;
var i = -1;
var getNext = true;

function getNextGame() {
    if(getNext) {
        i += 1;
        if(i>myGames.length) {
            i = 0;
        }
            if(myGames[i].id !== undefined) {
                if(myGames[i].innerHTML.indexOf("This game cannot be controlled remotely") === -1) {
                    if(myGames[i].innerHTML.indexOf("Ready to play") === -1) {
                        if(myGames[i].innerHTML.indexOf("Downloading") === -1) {
                            myGameImg = myGames[i].getElementsByTagName('img')[1];
                            myGameArr = myGameImg.getAttribute('onclick').split("'");
                            installURL = myGameArr[1] + '?' + myGameArr[3];
                            console.log(installURL);
                            
                            getNext = false;
                            
                            var xhr = new XMLHttpRequest();
                            xhr.open("GET",installURL,true);
                            
                            xhr.addEventListener('load',function(){
                              if(xhr.status === 200){
                                  console.log("We got data: " + installURL + ': ' + xhr.response);
                                  window.setTimeout(allowNext, timePerGameTillDownloadStarts);
                              }
                            },false) 
                            
                            xhr.send();
                        }
                    }
                }
            }
    }
}

function allowNext() {
    getNext = true;
}

window.setTimeout(installAll, timeBeforeFirstGame);
