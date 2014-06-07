// ==UserScript==
// @name       AAA AutoBuyer
// @namespace  carter.co.nf
// @version    1.0
// @description  Almost Abandoned Attic Auto-Buyer 
// @include      http://www.neopets.com/halloween/garage.phtml*
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require    http://github.com/cowboy/jquery-dotimeout/raw/master/jquery.ba-dotimeout.min.js
// @copyright  Carter 'Siren' June 2013
// ==/UserScript==
//GUI appendage:
var appendage = document.createElement('div');
appendage.innerHTML = "<html><div class='sidebarModule'><table border='1' class='sidebarTable'><tbody>" 
+ "<tr> <th class='sidebarHeader medText' id='aaagui'><u><center><b>AAA AutoBuyer</u></b></center></th></tr>"
+ "<tr><td><center><input id='startbtn' name='startbtn' type='button' value='Start' size='1' style='height:60px; width:60px'><br><hr>" 
+ "<i>delays in seconds</i><br>min refresh delay:<input id='mindelaytxt' name='mindelaytxt' type='text' size='1'><br>"
+ "max refresh delay: <input id='maxdelaytxt' name='maxdelaytxt' type='text' size='1'><br>"
+ "min buy delay:<input id='minbuydelaytxt' name='mindelaybuytxt' type='text' size='1'><br>"
+ "max buy delay: <input id='maxbuydelaytxt' name='maxdelaybuytxt' type='text' size='1'><br><hr>"
+ "<input name='pausecb' id='pausecb' type='checkbox' value='pausecb'>pause every: <input id='minrefreshpausetxt' name='minrefreshpausetxt' type='text' size='1'> to <input id='maxrefreshpausetxt' name='maxrefreshpausetxt' type='text' size='1'> refreshes<br>"
+ "Buy List:<textarea id='txtlist' rows='8'></textarea><br><br>"
+ "<input id='savebtn' name='savebtn' type='button' value='Save Preferences'><hr>"
+ "<br>Log: <input id='clearlog' type='button' value='Clear Log'><br><textarea id='txtlog' rows='10' size='1'></textarea><br><hr>"
+ "</center></td></tr>"
document.getElementsByClassName('sidebar')[0].appendChild(appendage);

//vars
var list = String(GM_getValue("list", "")); 
var refreshes = GM_getValue("refreshes", 1) + 1;
if (typeof refreshes == 'undefined'){
    GM_setValue("refreshes", 1);
}
GM_setValue("refreshes", GM_getValue("refreshes") + 1); //refreshes = refreshes + 1 on each pageload
console.log(GM_getValue("refreshes"));
console.log(refreshes);

GM_getValue("minpr", 80);
GM_getValue("maxpr", 120);
console.log(GM_getValue("minpr") + " <-minpr : maxpr-> " + GM_getValue("maxpr"));
var log = GM_getValue("log", "");
var listarrays = list.split( '\n' );
console.log(listarrays + " : listarrays");
var newdate = new Date();
var timenow = String(newdate.getHours()) + ":" + String(newdate.getMinutes()) + ":" + String(newdate.getSeconds()) + " hr:min:sec";
var timenowshort = String(newdate.getHours()) + ":" + String(newdate.getMinutes()) + ":" + String(newdate.getSeconds());
var running = GM_getValue("running", true); 
var randNumMin = GM_getValue("mindelay", 7); //min refresh delay in seconds
var randNumMax = GM_getValue("maxdelay", 10); //max refresh delay in seconds
var randdelay = (Math.random() * (randNumMax - randNumMin + 1) + randNumMin) * 1000; //in ms, not floor'd
var minbuydelay = GM_getValue("minbuydelay", ".2");
var maxbuydelay = GM_getValue("maxbuydelay", ".4");
var randbuydelay = (Math.random() * (maxbuydelay - minbuydelay + 1) + minbuydelay) * 1000; //in ms, not floor'd
console.log(randbuydelay + " : randbuydelay (onload)"); 
document.getElementById('startbtn').value = running ? 'Stop!' : 'Start';


//click handles
document.getElementById('startbtn').addEventListener('click', function(event){
    if (running){
        GM_setValue("running", false); 
    } else {
        GM_setValue("running", true); 
    }
    document.getElementById('startbtn').value = running ? 'Stop' : 'Start';
    location.reload(); 
    console.log(GM_getValue("running") + " : running"); 
},true)

document.getElementById('clearlog').addEventListener('click', function(event){
    GM_setValue("log", "");
    location.reload();
},true)

document.getElementById('savebtn').addEventListener( 'click', function(event) {
    if (running == false){
        GM_setValue("mindelay", Number(document.getElementById('mindelaytxt').value));
        console.log(GM_getValue("mindelay") + " : mindelay"); 
        
        GM_setValue("maxdelay", Number(document.getElementById('maxdelaytxt').value));
        console.log(GM_getValue("maxdelay") + " : maxdelay"); 
        
        GM_setValue("minbuydelay", Number(document.getElementById('minbuydelaytxt').value));
        console.log(GM_getValue("minbuydelay") + " : minbuydelay");
        
        GM_setValue("maxbuydelay", Number(document.getElementById('maxbuydelaytxt').value));
        console.log(GM_getValue("maxbuydelay") + " : maxbuydelay");
        
        GM_setValue("minpr", Number(document.getElementById('minrefreshpausetxt').value));
        console.log(GM_getValue("minpr") + " : minpr");
        
        GM_setValue("maxpr", Number(document.getElementById('maxrefreshpausetxt').value));
        console.log(GM_getValue("maxpr") + " : maxpr");
        
        GM_setValue("pauseopt", document.getElementById('pausecb').checked);
        console.log(GM_getValue("pauseopt") + " : pauseopt");
        
        console.log(randdelay);
        console.log(randbuydelay + " : new randbuydelay");
        
        if (document.getElementById('txtlist').value != GM_getValue("list")){
                GM_setValue("list", document.getElementById('txtlist').value); 
                listarrays = GM_getValue("list").split( '\n' );
                console.log("[" + listarrays + "] : new listarrays");
        
        GM_setValue("log", GM_getValue("log") + " |Saved settings!| "); 
         location.reload();
        }} else {
                alert("You can't save settings while the program runs. Please stop the script before saving your preferences.");
            }
    }, true);

document.getElementById('mindelaytxt').value = GM_getValue("mindelay");
document.getElementById('maxdelaytxt').value = GM_getValue('maxdelay');
document.getElementById('minbuydelaytxt').value = GM_getValue("minbuydelay");
document.getElementById('maxbuydelaytxt').value = GM_getValue("maxbuydelay");
document.getElementById('txtlist').value = GM_getValue("list");
document.getElementById('pausecb').checked = GM_getValue("pauseopt");
document.getElementById('minrefreshpausetxt').value = GM_getValue("minpr");
document.getElementById('maxrefreshpausetxt').value = GM_getValue("maxpr");

//refresh pause chance
var minpr = Number(GM_getValue('minpr'));
var maxpr = Number(GM_getValue('maxpr'));
var chances = function(prob)
{
	var rand = Math.random();
	if (rand < prob)
	{
		return true;
	}
	else
	{
		return false;
	}
}
if(chances(.2) && refreshes >= minpr && refreshes <= maxpr){
    running = false; 
}

//script exec:

if (running == true){
//1st page http://www.neopets.com/halloween/garage.phtml
    var pageElmsTagA = document.getElementsByTagName('a');
    var boldedopts2 = document.getElementsByTagName('b');
    if(document.location.href == "http://www.neopets.com/halloween/garage.phtml"){
        for (var i=0; i < listarrays.length; i++){
        	for (var b=0; b < boldedopts2.length; b++){

            	if (boldedopts2[b].parentNode.innerHTML.indexOf(listarrays[i]) != -1){
               		//console.log(typeof(boldedopts2[b].parentNode.children[3].getAttribute('onclick')) !== undefined + " : undefined t/f");
                	console.log(boldedopts2[b]);
                	console.log(b + " b past if");
                	console.log(boldedopts2[b].parentNode.children[3] + "  boldedopts2[b].parentNode.children[3]");
                    
                	//the current item of listarrays (listarrays[i]) has been found on the page
                    
                    //filtering through undefined nodes; they will return errors unless unspecified. 
                    //we can not declare buyonclick as either .children[3] or .getAttribute('onclick') unless they exist (are not undefined)
                    //using typeof() to check type of the input. possible results (outputs) include 'undefined' (undefined), 'object' (null), 'string' (string), etc. 
                    if (typeof(boldedopts2[b].parentNode.children[3]) !== 'undefined' && typeof(boldedopts2[b].parentNode.children[3].getAttribute('onclick')) !== 'undefined') { 
                        var buyonclick = boldedopts2[b].parentNode.children[3].getAttribute('onclick');
                    }
                    console.log(buyonclick + "  buyonclick!");
                    if (buyonclick){
                        var bfinal = String(buyonclick.split("{")[1].split("}")[0]); 
                        console.log(bfinal);
                        bfinal; 
                        b = boldedopts2.length - 1; //ends current loop on next run, since b=b+1 (aka b++)
                        console.log(b + " b past buyonclick");
                        GM_setValue("log", GM_getValue("log") + " BOUGHT ITEM " + listarrays[i] + " @ " + timenowshort + "\r\n");
                        $.doTimeout(randbuydelay, function(){eval(bfinal)});
                        
                    }
                 
                }
        	}
      }
    }
    if(document.documentElement.innerHTML.indexOf("Oops! - We just ran out of items.") != -1){
        GM_setValue("log", GM_getValue("log") + " ran out of items " + timenow);
    }
    
    console.log(randdelay);
    setTimeout("location.reload();", randdelay);
    
    if (document.documentElement.innerHTML.indexOf("Sorry, we don't have any more of those") != -1){
    	console.log("no more of " + listarrays[i] + " left!");
    }
           
}

var logsplit;
logsplit = log.split('\n');
GM_log(GM_getValue("log")); 
GM_log(logsplit);
document.getElementById('txtlog').value = logsplit;