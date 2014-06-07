// ==UserScript==
// @name       My Fancy New Userscript
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==

var bigBarbs = "516@677 508@680 515@673 501@679 503@669 508@672 498@671 509@676 526@683 520@674";
var spikedBarbs = "";

String.prototype.contains = function(string, from){
    return this.indexOf(string, from) >= 0;
}

function simulatedClick(target, options) {
    var event = target.ownerDocument.createEvent('MouseEvents');
    event.initMouseEvent('click',true,true,target.ownerDocument.defaultView,1,0,0,0,0,false,false,false,false,0,null);    
    target.dispatchEvent(event);
}

function pausecomp(millis) 
{
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); } 
    while(curDate-date < millis);
} 

function clickButtons(){
    for (var i=1;i<document.getElementsByClassName("farm_icon_b").length;i++)
    {
        var reports = document.getElementsByTagName("tbody")[document.getElementsByTagName("tbody").length-1].querySelectorAll(".row_a,.row_b")[i-1];
        if(reports.innerHTML.search("attack.png") == -1 && reports.innerHTML.search("dots/green.png") != -1){
            pausecomp((Math.floor((Math.random()*100) + 250)));
            var coordinates = reports.cells[3].textContent.substring(2,5) + "@" + reports.cells[3].textContent.substring(6,9);
            if(spikedBarbs.search(coordinates) != -1){
                // no-op
            }
            else if(bigBarbs.search(coordinates) != -1){
                simulatedClick(document.getElementsByClassName("farm_icon_a")[i]);
            }
            else{
                simulatedClick(document.getElementsByClassName("farm_icon_b")[i]);
            }
        }		
    }
}

if(window.location.href=="http://en73.tribalwars.net/game.php?village=35196&screen=am_farm" && document.getElementById("light").textContent > 3){
    if(confirm("Run Script?")){
        clickButtons();
        pausecomp(1000);
        simulatedClick(document.getElementsByClassName("paged-nav-item")[0]);
    }
}

if(window.location.href.contains("http://en73.tribalwars.net/game.php?village=35196&order=distance&dir=asc&Farm_page") && document.getElementById("light").textContent > 3){
	var page_loc = window.location.href.search("Farm_page")+10;
	var pageNum = parseInt(window.location.href.substring(page_loc,page_loc+3));
	pausecomp(200);
    clickButtons();
    if(pageNum>5) pageNum = 3; // Only if you have 20 pages or higher
	simulatedClick(document.getElementsByClassName("paged-nav-item")[pageNum]); 
}

