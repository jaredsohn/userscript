// ==UserScript==
// @name                        vampireWarst
// @namespace           Facebook
// @description         Please don't use this... just a test
// @version                     2.3.9.r62
// @include                     http://apps.facebook.com/vampiresgame/*
// @include                     http://apps.new.facebook.com/vampiresgame/*
// @author                      blannie
// @contributor         IEF
// @contributor         Zorkfour (G.L. Cadogan)
// ==/UserScript==

var settingsOpen = false;
var logOpen      = false;
var delay = 3000;
var blood2Update = 120000;

var SCRIPT = {
        url: 'http://userscripts.org/scripts/source/36917.user.js',
        version: '2.3.9.r42',
        name: 'vampiresgame',
        appID: 'app25287267406',
        presentationurl: 'http://userscripts.org/scripts/show/36917'
};

var level;
var clan;
var td;
var blood;
var health;
var energy;
var rage;
var bankpopup;
var bank;
var lottery;
var gameVersion;

var missions = new Array(
        ["Feast on a Human's Blood",1,0],
        ["Destroy a Renegade Vampire",3,0],      
        ["Eliminate a Street Gang",5,0],
        ["Raid a Blood Bank",7,0],
        ["Fight a Sewer Wererat",1,0],
        ["Kill a Drug Dealer",2,0],
        ["Rescue an Ally From an Insane Asylum",2,0],
        ["Fight Ghouls in the Deep Woods",3,1],
        ["Destroy a Circle of Warlocks",3,1],
        ["Tame a Shadow Demon",4,1],
        ["Feed in Central Park",10,1],
        ["Attack a Vampiric Lair",15,1],        
        ["Sneak into Vampires' Nest",5,1],
        ["Fight a Vampire Slayer",5,1],
        ["End the Unlife of a Lich",5,1],
        ["Challenge a Haitian Voodoo Gang",6,2],
        ["Fight a Pack of Werewolves",18,2],
        ["Retrieve a Lost Relic From the High Desert",7,2],
        ["Fight Another Vampire For Mental Dominance",8,2],
        ["Take Control of a Neighborhood",25,2],
        ["Save a Vampire From Hunters",10,2],
        ["Clear a Laboratory of Hideous Mutants",13,2],
        ["Battle a Werewolf Lord",30,3], //23
        ["Rescue an Ally from the Underworld",15,2], //24      
        ["Fight Government Agents in Foundry",25,3],
        ["Banish Summoned Demon",25,3],
        ["Face a Rival Clan Alone",35,3],
        ["Destroy a Demonic Lord",40,3],
        ["Exterminate A Rival Clan",40,3],
        ["Foresee a Traitor in the Midst",60,4],
        ["Interrogate a Traitorous Minion",70,4],
        ["Investigate the Lair of Acanthus",74,4],
        ["Create a Diversion",78,4],
        ["Assault Acanthus's Lair",85,4],
        ["Stand-Off with Acanthus",100,4],
        ["Uncover Draven's Catacombs",80,5],
        ["Navigate the Labyrinth",85,5],
        ["Investigate the Chapel",92,5],
        ["Clear the Rotting Meat Locker",98,5],
        ["Meet with Lord Draven",110,5],
        ["Uncover the Truth",150,5],
        ["Disperse of Lord Draven",175,5]
        );
       
var attributes  = new Array(
        ["Animalistic Frenzy",4,0],
        ["Bat Form",15,0],
        ["Blood Shield",26,1],
        ["Blood to Ashes",5,1],
        ["Bloodletting",129,1],
        ["Bloody Mess",34,1],
        ["Bone Spikes",14,1],
        ["Cat's Grace",31,1],
        ["Cause Madness",3,1],
        ["Claws of the Demon",19,1],
        ["Command Rat Swarm",1,1],
        ["Command a Wolf Pack",4,1],
        ["Control Bear Clans",30,1],
        ["Control Mall Santas",37,1],
        ["Corrosion",115,1]
        // ToDo: add rest of attributes
        );

var menuItems = new Array(
        [["News",null],["Stats",UpdateStats],["Comments",null],["Edit Avatar",null], ["Trophies",null]], // Coffin
        [["Invite",null],["My Clan",null],["Clan Comment",UpdateGroupWall]], // Clan
        [["Fledging",DoMissions],["Neophyte",DoMissions],["Adept",DoMissions],["Savant",DoMissions],["Deathbringer",DoMissions]], //Mission
        [["Fight",DoFights],["Hitlist",null],["Leaderboards",null]], // Combat
        [["Abilities",UpdateAbilityPage],["Minions",UpdateMinionPage],["Shop",null]], // Bazaar
        [["Council",null],["Blood Magic",DoBloodMagic],["Crypt",null]], //Elders
        [["Terms",null],["Forum",null],["Support",null]], //Help
        [["Stats",UpdatePlayerPage],["Comments",UpdatePlayerPage]] //Help
);
       
var XMLHttpFactories = [
    function () {return new XMLHttpRequest()},
    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
];

String.prototype.toInt = function(){ return parseInt(this.replace(/,/g, ''));}

function getPositionLeft(This){
var el = This;var pL = 0;
while(el){pL+=el.offsetLeft;el=el.offsetParent;}
return pL
}

function getPositionTop(This){
var el = This;var pT = 0;
while(el){pT+=el.offsetTop;el=el.offsetParent;}
return pT
}
var giftbox = 'data:image/gif;base64,R0lGODlhFgAWAPcAAI6BgnBiZJWIilpNUIJwdId1eqOUmFdJTV9SVraqrnpnbq2fpMC1uWZUW7CgplZHTWdWXV9QVsW7v1hFTmFQWFpIUV1LVI10g11FVZd3joptgnZMbE8zSEwyRl8/V1k7UnRRbGxDY1I1TF8/WFA1Sn5VdamMo3ZEbVQzTls4VGxEZFMwTXtJc4hZgHVObodbgIhfgZBnio9qimAsWl0vV0cWQk8bSnhCc3dFcqN1n0sUR0kVRVEbTWYqYmMqX3c4c3lLdohchSoCKDEDL0EFPkMHQEUIQikGJ0kLRnEwbX42e4VAgWMwYbCArkYAREIAQEEAPzIAMTEAMDcBNkUDQ1gGVkgFRkQFQj8FPT0FOz0GPDsGOUQLQlIOUEsNSUQMQmwlaoBAfmIAYWEAYVYAVT4APkMBQmEGYVIFUUoFSUsJS3QQdG4TbmwYa2AbYIApf3gnd4AugIs8ip9NnqxtrOfS52sAbWIAZWEAYloAW1EAUk0ATkoAS0QARnMCdmQCZUkCSlkDWlcGWVEHUoIchHgae5Etk5k3nHMqdJQ9lY07jpJClKUArp4Ap5UAnI8Al44AlIwAk4EAh38AhHIAdnEAdW0Ac2gAbWUAamQAaVwAYKIBq3kBf3cBe2sBb5UCnY0ClGUCaXUDeoYGjXcFfVQEV58Ip2gGbJoKoX8Ig3wJgZALlpMMmmwKcIoNj6EVp3gQfYYSi48clYcsjLA6tqM5qZlHnKUAsJ8ArLE0uqwOurkyxstz07SxrHpybYV6eV1RUX1tbWNXV2xfX2ZaWmVZWWldXWFWVmBVVV9UVFhOToh5eX9xcXZpaXVoaHNmZmxgYGtfX1pQUIN1dYFzc3ptbXFlZW9jY2dcXGZbW1xSUlVMTH1wcGleXlZNTYt9fYR3d3dra2NZWVlQUFFJSYh7e4Z5eVdPT5aJiZ6RkYJ3d5OHh6mdnaaampyRkZuQkJqPj56Tk6ecnJ+VlZ2Tk7OpqbaursW9vb21tcO8vMC5ubu0tMrDw8nCwuXi4v///yH5BAEAAP8ALAAAAAAWABYAAAj/AP8JHEiQYCNJlwoqXMhoE6U+CyMKFCUJj5QoEh2BGhXrx5tXqzABUgNLYidIkThRCrVn0iZPgvyoMjRHoQs9d9zgABOoDB9LmjKlcoXK1CdZOQQ+U+Djy5EhW6YIKfWI1ClEQWLIUERnwbd/14YFoIEmT6tZQOAwosVrly5ctUysC8YMLDRsO6B00bCv15Jbuer4a7JmzAlqzcL9w5bNmI0nNYBFUxeH1SET8y60+cNiGrSB2pCtMKPjmLQDSUBcEJAuA5szIbqdGyhN2wMsXCwkG4DAl7x27WBU4TFBGrKByY5V0JKFhDZtwn6xiwdghpMU3bCJGyiumAUsWTp4ovMmDBy6cgR6kFHhbBhBYtgoGCHCwRs5bczQ0TOgRMyGatcQJI4xDSBxhQjjbJMMAPXYk4AcdpRAjTMEHUMMBF5Y8YE22yADzz36MLBIJS8sYw1BwCQTgRdpeCCMMsi8w08+EtjSSQvcYKMQBkVQMUI3yQjzTj80JmLHDRIVMggK3QiTDT394ONAGIRINBATyBwTTTz4uFOAlQppk40560gUEAA7';

function filterNotifications(elt) {
  // Get all beeps (pop-ups about notifications).
  var beeps = document.evaluate(".//div[@class=\'UIBeep_Title\']", elt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < beeps.snapshotLength; i++) {
    var beepElt = beeps.snapshotItem(i);
    if (beepElt && beepElt.innerHTML.indexOf('You sent a notification')) {
      // A notification was sent.
      if ((beepElt.innerHTML.indexOf('fought you')!=-1) || (beepElt.innerHTML.indexOf('fought with your help')!=-1)) {
        var undoElt = document.evaluate(".//a[@class=\'undo_link\']", beepElt, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
       
        if (undoElt) {
          clickElement(undoElt);
          addToLog('Canceled attack notification.');
        }
      }
    }
  }
}

function clickElement(elt) {
  if (!elt) {
    addToLog('BUG DETECTED: Null element passed to clickElement().');
    return;
  }
  // Simulate a mouse click on the element.
  var evt = document.createEvent('MouseEvents');
  evt.initMouseEvent("click", true, true, window,
                     0, 0, 0, 0, 0, false, false, false, false, 0, null);
  elt.dispatchEvent(evt);
}

//add popup listener
var modificationTimer;
//document.addEventListener('DOMSubtreeModified', function(e){ setTimeout(function(){ handleDOMSubtreeModified(e); }, 0);}, false);
//document.addEventListener('DOMNodeInserted', function(e){setTimeout(function(){ nodeInserted(e); }, 0);}, false);

// Add event listeners.
setListenContent(true);
resetModificationTimer();

// Turns on/off the high-level event listener for the game.
function setListenContent(on) {
        var elt = document.getElementById('app_content_25287267406');
        if (!elt)
    return;
       
        if (on) {
                elt.addEventListener('DOMSubtreeModified', handleDOMSubtreeModified, false);
    GM_log('Content Event Listener Added!');

        } else {
                elt.removeEventListener('DOMSubtreeModified', handleDOMSubtreeModified, false);
    GM_log('Content Event Listener Removed!');
   
        }
}
function resetModificationTimer() {
        if (modificationTimer)
                window.clearTimeout(modificationTimer);
       
        modificationTimer = window.setTimeout(handleModificationTimer, 500);

}

function handleModificationTimer() {
        // The timer has gone off, so assume that page updates have finished.
        GM_log('Changes finished.');
       
        RefreshGlobalStats();  
        LogEvents();
        doHighPriority();
       
        // Kick off auto-play.
        if(!handlePages())
                doAutoPlay();  
}


function handleDOMSubtreeModified(e) {
  //consoleLogElement(e.target, 'subtree: ');
  var parentElt = e.target.parentNode;
 
  if (!parentElt)
    return;

  // Exclude changes related to countdowns and logging.
  if (ignoreElement(e.target))
    return;
 
  resetModificationTimer();
}

/*
function nodeInserted(e) {
  var parentElt = e.target.parentNode;
  if (!parentElt) return;

   // Watch for sent notifications and get rid of some of them.
  if (parentElt.className == 'Beeps') {
        filterNotifications(e.target);
  }
}
*/
// reload logic
if((GM_getValue('autoClick', '') == "checked")&& (GM_getValue('paused')==0))
{
    var timeWait = Math.floor(parseFloat(GM_getValue('r1', '6')) + parseFloat((GM_getValue('r2', '11'))-parseFloat(GM_getValue('r1', '6')))*Math.random())*1000;
      setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+ GM_getValue('refreshPage', "/index.php")+"'", timeWait);
}

// page not loaded correctly... just retrun
if(document.getElementById(SCRIPT.appID+'_stats_table') == null)
        return;

function RefreshGlobalStats() {
        GM_log('refreshGlobalStats.');

        try{
                gameVersion = parseInt(document.body.innerHTML.split('facebook5.vampires.static.zynga.com/')[1].split('/graphics')[0]);
                level =  parseInt(document.body.innerHTML.split('Level:')[1]);
                clan =  parseInt(document.body.innerHTML.split('my clan (')[1]);
                td = document.getElementById(SCRIPT.appID+'_stats_table').getElementsByTagName('td');
                blood = document.getElementById( SCRIPT.appID+'_current_cash').innerHTML.toInt();
                health = parseInt(document.getElementById( SCRIPT.appID+'_current_health').innerHTML);
                energy = document.getElementById( SCRIPT.appID+'_current_energy').innerHTML.toInt();
                rage =parseInt(document.getElementById( SCRIPT.appID+'_current_stamina').innerHTML);
                bankpopup = document.getElementById(SCRIPT.appID+'_bank_popup');
                bank = bankpopup.getElementsByTagName('span')[0].innerHTML;
                var bankStat = makeElement('div', document.body);
                bankStat.setAttribute("style", "position: absolute; left: "+(statsLeft+92)+"px; top: "+(statsTop+149)+"px; font-family: Times,serif; font-size: 14px; font-weight: 400; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: white;");
                bankStat.innerHTML = 'Bank: '+bank;
        }
        catch (e)
        {
                GM_log(e);
        }
        //http://facebook5.vampires.static.zynga.com/40602/graphics/loader2mod.gif
       
        //GM_log('Level : ' + level);
        //GM_log('Clan  : ' + clan);
        //GM_log('Blood : ' + blood);
        //GM_log('Health: ' + health);
        //GM_log('Energy: ' + energy);
        //GM_log('Rage  : ' + rage);
       
        if (GM_getValue('paused')==undefined) GM_setValue('paused',1);
}

//Get absolute banner position
bannerTop = getPositionTop(document.getElementById(SCRIPT.appID+'_banner_row')); //140
bannerLeft = getPositionLeft(document.getElementById(SCRIPT.appID+'_banner_row')); // 300
var pauseButton = document.createElement("div");

if (GM_getValue('paused')==0) {
        pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+140)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:green;");
        pauseButton.innerHTML = "Pause Autoplayer";
        pauseButton.addEventListener('click', pausePlayer, false);
        document.body.appendChild(pauseButton);
} else {
        pauseButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+300)+"px; top: "+(bannerTop+140)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color:red;");
        pauseButton.innerHTML = "Resume Autoplayer";
        pauseButton.addEventListener('click', resumePlayer, false);
        document.body.appendChild(pauseButton);
}
   
//Create Bank status
statsTop = getPositionTop(document.getElementById(SCRIPT.appID+'_stats_div'));
statsLeft = getPositionLeft(document.getElementById(SCRIPT.appID+'_stats_div'));
   
// menu logic
var settingsButton =  makeElement('div', document.body);
        settingsButton.innerHTML = "open settings";
        settingsButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+10)+"px; top: "+(bannerTop+10)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer; color: #AA0000;");
        settingsButton.addEventListener('click', toggleSettings, false);

if (GM_getValue('autoLog', '') == 'checked'){          
    var viewLogButton = makeElement('div', document.body);
        viewLogButton.innerHTML = "View Log";
        viewLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+10)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        viewLogButton.addEventListener('click', toggleLogBox, false);

    var clrLogButton = makeElement('div', document.body);
        clrLogButton.innerHTML = "clear log";
        clrLogButton.setAttribute("style", "position: absolute; left: "+(bannerLeft+450)+"px; top: "+(bannerTop+28)+"px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;color: #AA0000;");
        clrLogButton.addEventListener('click', clearLog, false);

    var logBox = makeElement('div', document.body);
                logBox.innerHTML = GM_getValue('itemLog', 'log empty');
                logBox.setAttribute("style", "position: absolute; overflow: scroll; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 450px; height: 250px; background: black url(http://facebook5.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; color: #FFFFFF; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 999999;");
}

function doHighPriority(){
        //auto-accept gifts
        if (location.href.indexOf(SCRIPT.name+'/landing') != -1){
                var accept = document.evaluate("//input[@value='Accept All']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if(accept.snapshotLength == 1) {
                        accept.snapshotItem(0).click();
                        return;
                }
                var acceptsingle = document.evaluate("//input[@value='Accept']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if (acceptsingle.snapshotLength == 1) {
                        acceptsingle.snapshotItem(0).click();
                        return;
                }
        }

        //autoGamble logic
        if (location.href.indexOf(SCRIPT.name+'/lottery') != -1){
                if((GM_getValue('autoGamble', '') != "checked") || (GM_getValue('paused')!=0))
                        return;
                GM_log('Autoplayer autoGamble');
               
                if(document.body.innerHTML.indexOf("Or come back in")!=-1){
                        LotteryDue =  parseInt(document.body.innerHTML.split('Or come back in ')[1]);
                        //alert(LotteryDue);
                        // ToDo... put this due time into a temp counter
                        document.location = 'http://apps.facebook.com/'+SCRIPT.name+'/index.php';
                }
                else{//Free 24hr gamble
                        if (GM_getValue('rBoxLeft')=='checked') BoxToOpen=1;
                        else if (GM_getValue('rBoxMiddle')=='checked') BoxToOpen=2;
                        else    BoxToOpen=3;
                        addToLog("Free gamble, opening Chest no. "+BoxToOpen+".");
                        document.location = 'http://apps.facebook.com/'+SCRIPT.name+'/lottery.php?viewState=openChest&chest='+BoxToOpen+'&useFP=1';
                }
        }
       
        // auto gifting logic
        if (location.href.indexOf(SCRIPT.name+'/gift') != -1){
                if((GM_getValue('autoGifting', '') != "checked") || (GM_getValue('paused')!=0))
                        return;
                //GM_log('Autoplayer autoGift');
                GM_log("auto gift " + attributes[GM_getValue('selectAttribute', 'nothing')][0] +" to "+ GM_getValue('giftingUser', 'xxxx')+" x "+ GM_getValue('giftingCount', '0'));
                //href="http://apps.facebook.com/vampiresgame/gift_give.php?target_id=1485174595&item_id=44&item_type=1&do_gift=1&hash=5d2ba4b125301d777219973539eae68b3c57e810
                return;
        }
       
        // pause feature... dismiss the rest
        if( (GM_getValue('paused')!=0))
                return;
       
        // autoheal
        if(GM_getValue('autoHeal', '') == "checked" && health<GM_getValue('healthLevel', '')  && rage>GM_getValue('healthRage', '') ){
                GM_log('Autoplayer autoHeal '+health);
                document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
                setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
                return;
        }

        // bank logic here
        if(GM_getValue('autoBank', '') == "checked" && blood>parseInt(GM_getValue('bankConfig', 100000))+10){
                GM_log('Autoplayer autoBank ' + blood);
                document.getElementById(SCRIPT.appID+'_bank_popup').style.display = 'block';
                var sform = document.getElementById(SCRIPT.appID+'_bank_popup').getElementsByTagName('form')[1];
                document.getElementsByName("amount")[1].value = blood-GM_getValue('bankKeep', 50000);
                setTimeout(function(){sform.submit();},delay);
                return;
        }
}

function doAutoPlay (){
        // pause feature... dismiss the rest
        if((GM_getValue('paused', 0) != 0))
                return;

        GM_log('Autoplayer started.');
 
        // buffs logic
        if(GM_getValue('autoBuff', '') == "checked" && Math.floor(new Date().getTime() / 1000) > GM_getValue('spin',0)){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
                return;
        }

        // automission logic here
        if(GM_getValue('autoMission', '') == "checked" && energy>=missions[GM_getValue('selectMission', 1)][1]){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
                return;
        }      


        // autofight
        if(GM_getValue('autoFight', '') == "checked" && rage>GM_getValue('fightKeepRage', 0) &&health>19){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/fight.php";
                return;
        }
       
        // minion cost
        if(GM_getValue('autoMinion', '') == "checked" && blood > GM_getValue('minionCost', 0)*10){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/properties.php";
                return;
        }
       
        // auto gift
        if(GM_getValue('autoGifting', '') == "disabled"){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+ GM_getValue('giftingUser', 'xxxx');
                return;
        }
        GM_log('Autoplayer finished.');
}

///////////////////////////////////////////////////////////////////////////////
//   begin of page code.                    Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function LogEvents(){  
        if (GM_getValue('autoLog', '') != "checked" || document.body.innerHTML.indexOf('message_body') == -1)
                return;
        var boxes = document.getElementById(SCRIPT.appID+'_content').getElementsByTagName('span');
        if(boxes.length==0)
                return;
        GM_log('Autoplayer autoLog');
        var messagebox = boxes[0];
        // skip this messagebox... for now
        if(messagebox.innerHTML.indexOf('Someone has invited you to join their Clan') != -1){
                if(boxes[1].innerHTML.indexOf('New') != -1)
                        messagebox = boxes[2];
                else
                        messagebox = boxes[1];
        }
        if(messagebox.innerHTML.indexOf('You just bought') != -1){
                var item = messagebox.innerHTML.split('You just bought')[1].split('for')[0];
                addToLog("You just bought " + item);
        }
        else if(messagebox.innerHTML.indexOf('You successfully dominated') != -1){
                var minion = messagebox.innerHTML.split('You successfully dominated ')[1];
                minion = minion.split('.')[0];
                addToLog("You successfully dominated " + minion);
        }
        else if(messagebox.innerHTML.indexOf('Rare Ability') != -1){
                var ability = boxes[1].innerHTML.split('return true;">')[1].split('</a>')[0];
                addToLog("acquired Rare Ability " + ability);
        }
        else if(messagebox.innerHTML.indexOf('You withdrew') != -1){
                var deposit     = messagebox.innerHTML.split('blood.gif">')[1];
                deposit = deposit.replace(",","");
                deposit = deposit.replace(",","");
                deposit = parseInt(deposit);
                addToLog("withrew " + deposit);
        }
        else if(messagebox.innerHTML.indexOf('deposited and stored safely') != -1){
                var deposit     = messagebox.innerHTML.split('blood.gif">')[1];
                deposit = deposit.replace(",","");
                deposit = deposit.replace(",","");
                deposit = parseInt(deposit);
                addToLog("deposit " + deposit);
        }
        else if(messagebox.innerHTML.indexOf('more health') != -1){
                var addHealth = messagebox.innerHTML.split('You get')[1].split('more health')[0];
                var cost = 0;
                if(messagebox.innerHTML.indexOf('blood.gif">') != -1)
                        cost = messagebox.innerHTML.split('blood.gif">')[1];
                cost     = cost.replace(",","");
                cost     = cost.replace(",","");
                cost     = parseInt(cost        );
                addToLog("health +"+ addHealth + " for " + cost );
        }
        else if(messagebox.innerHTML.indexOf('You fought with') != -1){
                if(GM_getValue('freshMeat', '') != "checked"){
                        var user = messagebox.innerHTML.split('href="')[1].split('"')[0];
                        var username = messagebox.innerHTML.split('true;">')[1].split('</a>')[0];
                        user = '<a href="'+user+'">'+username+'</a>';

                        var battleResult = document.evaluate("//span[@class='good']",document,null,9,null).singleNodeValue;
                        if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1){
                                var cost = battleResult.innerHTML.split('blood.gif">')[1];      
                                cost = cost.replace(",","");
                                cost = cost.replace(",","");
                                addToLog("fought "+ user + " WON " +parseInt(cost));
                        }
                        battleResult = document.evaluate("//span[@class='bad']",document,null,9,null).singleNodeValue;
                        if(battleResult!=null && battleResult.innerHTML.indexOf('blood.gif">') != -1)
                        {
                                var cost = battleResult.innerHTML.split('blood.gif">')[1];      
                                cost = cost.replace(",","");
                                cost = cost.replace(",","");
                                addToLog("fought "+ user + " LOST " +parseInt(cost));
                        }
                        for (var i=1;i<boxes.length;i++)
                                if(boxes[i].innerHTML.indexOf('found')!= -1){
                                        addToLog("found "+ boxes[i].innerHTML.split('found ')[1].split('while fighting ')[0]);
                                        i=boxes.length;
                                }
                        if(GM_getValue('rFightList', '') == "checked")
                                CycleFightList();      
                }
        }
        else if(messagebox.innerHTML.indexOf('too weak to fight') != -1){
                if(GM_getValue('rFightList', '') == "checked")
                        CycleFightList();      
        }
        else if(messagebox.innerHTML.indexOf('You cannot fight a member of your Clan') != -1){
                if(GM_getValue('rFightList', '') == "checked"){
                        var opponents = GM_getValue('fightList', '').split("\n");
                        var opponentList="";
                        for (var i=1;i<opponents.length;i++)
                                opponentList = opponentList+ opponents[i]+"\n";
                        GM_setValue('fightList', opponentList);
                }
        }
        else if(messagebox.innerHTML.indexOf('The Wheel and fate has smiled upon you') != -1){
                addToLog(messagebox.innerHTML.split('smiled upon you.<br>')[1].split('Repay the favor')[0]);
        }
        else  if(messagebox.innerHTML.indexOf('The wheel halts suddenly') != -1){
                addToLog(messagebox.innerHTML.split('<br>')[1]);
                setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php", delay);
                return;        
        }
        else if(messagebox.innerHTML.indexOf('hours and') != -1){
                // index page shows crypt timer
                if (location.href.indexOf(SCRIPT.name+'/index') != -1){
                        // do nothing for now
                }
                // buffs page shows buff timer
                if (location.href.indexOf(SCRIPT.name+'/buffs') != -1){
                        var now = Math.floor(new Date().getTime() / 1000);
                        time = 3600 * parseInt(messagebox.innerHTML.split('hours')[0]);
                        time = time + 60 *(1+ parseInt(messagebox.innerHTML.split('hours and')[1]));
                        GM_setValue('spin',now + time );
                }
        }
        else if(messagebox.innerHTML.indexOf('Fresh Meat') != -1){
        // do nothing
        }
        else if(messagebox.innerHTML.indexOf('icon-blood.gif') != -1){
        // do nothing
        }
        else if(messagebox.innerHTML.indexOf('You cannot heal so fast') != -1){
                document.getElementById(SCRIPT.appID+'_health_refill_popup').style.display = 'block';
                setTimeout(function(){document.getElementById(SCRIPT.appID+'_health_refill_popup').getElementsByTagName('form')[0].submit();},delay);
                return;
        }
        else if(messagebox.innerHTML.indexOf('You do not have enough favor points to spin the wheel again') != -1){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php";
                return;
        }
        //else
        //alert(messagebox.innerHTML);
}

function handlePages(){
        var menu = document.evaluate("//li[@class='us_tabs'] | //li[@class='selected_tab']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var submenu = document.evaluate("//div[@class='subWrapLeft_active'] | //div[@class='subWrapLeft_inactive']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        if(menu==null || submenu==null ||submenu.snapshotLength == 0)
                return;
        for (var index = 0 ; index < menu.snapshotLength; index++)
                if( menu.snapshotItem(index).getAttribute('class') == "selected_tab")
                        break;
        for (var subindex = 0 ; subindex < submenu.snapshotLength; subindex++)
                if( submenu.snapshotItem(subindex).getAttribute('class') == "subWrapLeft_active")
                        break;

        if(index==0 && submenu.snapshotLength==2)
                index = 7;
        GM_log("found selected tab " + menuItems[index][subindex][0]);
       
        // now we know on what page we are...  trigger a function accoringly
        if( menuItems[index][subindex][1]!=null){
                window.setTimeout(menuItems[index][subindex][1], 500);
                return true;
        }
        return false;
}

function DoBloodMagic(){
        if(GM_getValue('autoBuff', '') != "checked" || GM_getValue('paused')!=0 )
                return;
        var now = Math.floor(new Date().getTime() / 1000);
        if (now > GM_getValue('spin',0)){
                GM_log('Autoplayer Blood Magic');
                var time = document.evaluate("//span[@class='treasure_timer']",document,null,9,null).singleNodeValue;
                if(time==null) // time run out... do the buff
                        window.location = "http://apps.facebook.com/"+SCRIPT.name+"/buffs.php?doBuff=1";
                else{
                        GM_setValue('spin',now + 3600 * parseInt(time.innerHTML.split('hours')[0])+  60 *(1+ parseInt(time.innerHTML.split('hours and')[1])));
                        return;
                }
        }
        /*
        if((GM_getValue('autoTreasure', '') == "checked") &&  (GM_getValue('paused')==0))
        {
                treasurebox = document.getElementById(SCRIPT.appID+'_crypt_hot_tip_treasure_box');
       
                //Check frontpage to see if chest is available to be clicked
                if (treasurebox!=null) {
                        if (treasurebox.innerHTML.indexOf('Click Akem Manah')!=-1) {
                                var treasureform = treasurebox.getElementsByTagName('form')[0];
                                addToLog("Opening Akem Manah Treasurebox.");
                                treasureform.submit();
                        }
                }


                if ((location.href.indexOf('lottery.php')!=-1) && (location.href.indexOf('chest=clicked')!=-1)) {
                        //Opened treasure chest. Log the results.
                        var chestresult = document.getElementById('app25287267406_content').innerHTML;
                        var chestloot = chestresult.substring(chestresult.indexOf('You have obtained'),chestresult.indexOf('Akem Manah eagerly awaits your next visit.'));
                        addToLog(chestloot);
                }
        }
*/
}

function DoMissions(){
        if(GM_getValue('autoMission', '') != "checked" || GM_getValue('paused')!=0 || energy<missions[GM_getValue('selectMission', 1)][1])
                return;
        if (location.href.indexOf(SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2]) == -1){
                window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
                return;
        }

        GM_log('Autoplayer autoMission '+GM_getValue('selectMission', 1) + " "+ energy);
        var missionsList = document.evaluate("//input[@value='Do Mission']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
        for (var index = 0 ; index < missionsList.snapshotLength ; index++){
                var sform = missionsList.snapshotItem(index);
                if(sform.parentNode.getElementsByTagName('input')[sform.parentNode.getElementsByTagName('input').length-4].value == GM_getValue('selectMission', 0)+1){
                        if(GM_getValue('missionMastery', '') == "checked"){
                                GM_log('autoMission missionMastery');
       
                                var masteryList = document.evaluate("//td[@class='job_desc']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                                if(masteryList.snapshotItem(index).innerHTML.indexOf('Mission Mastered') != -1){
                                        if( parseInt(GM_getValue('selectMission', 1))+1 <  missions.length)
                                                GM_setValue('selectMission', parseInt(GM_getValue('selectMission', 1))+1 % missions.length);
                                        else
                                                GM_setValue('missionMastery', '');
                                               
                                        window.location = "http://apps.facebook.com/"+SCRIPT.name+"/jobs.php?currentTier="+missions[GM_getValue('selectMission', 1)][2];
                                        return;
                                }
                        }
                        setTimeout(function(){sform.click();},delay);
                        return;
                }
        }
}

function DoFights(){
        if(GM_getValue('autoFight', '') != "checked" || rage < GM_getValue('fightKeepRage', 0)|| GM_getValue('paused')!=0){
    GM_log('Auto-Fight: ' + GM_getValue('autoFight', ''));      
    GM_log('Fight Keep Rage: ' + GM_getValue('fightKeepRage', 0) + ' of ' + rage);
    GM_log('Paused: ' + GM_getValue('paused'));
                return;
  }

        GM_log('Autoplayer autoFight ' + rage);
        if(health>19){
    GM_log('Autoplayer Health: ' + health);    
                if(GM_getValue('fightRandom', '') == "checked"){
      GM_log('Fighting mode: Random');  
                        var opponents  = document.evaluate("//input[@name='opponent_id']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
                        GM_log('Opponents count: ' + opponents.snapshotLength);
                       
                        for (fightIndex=0; fightIndex<opponents.snapshotLength; fightIndex++) {
        var opponentNode = opponents.snapshotItem(fightIndex);
        //GM_log('Opponent ID: ' + opponentNode.value);
       
        if (opponentNode.value != "x") {
          try {
            var fightNode = opponents.snapshotItem(fightIndex).parentNode.parentNode.parentNode;
            //GM_log('fightNode: ' + fightNode.innerHTML);
            var opponentLevel =  parseInt(fightNode.innerHTML.split('Level ')[1]);
            var opponentRating = fightNode.innerHTML.split('groupsize">')[1];
            opponentRating = parseInt(opponentRating.replace(",", ""));
            var opponentClan = parseInt(fightNode.innerHTML.split('groupsize">')[2]);
            if (opponentLevel <= GM_getValue('fightLevel', '100')
              && opponentClan <= GM_getValue('fightClanSize', '502')
              && opponentRating >= GM_getValue('fightClanRating', '500')        
              && opponentRating <= GM_getValue('fightClanMaxRating', '5000')) {              
              GM_log('Opponent Level : ' +  opponentLevel);    
              GM_log('Opponent Rating: ' +  opponentRating);
              GM_log('Opponent Clan  : ' +  opponentClan);
              GM_log('Opponent ID    : #' +  opponentNode.value);
              setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+opponentNode.value+"&action=attack"+"'", 500);
              return;
            }
          }
          catch (e){}
        }
      }
                        setTimeout("document.location ='" + "http://apps.facebook.com/"+SCRIPT.name+"/fight.php"+"'", delay);
                }
               
                if(GM_getValue('rFightList', '') == "checked")
                        setTimeout("document.location = '"+"http://apps.facebook.com/"+SCRIPT.name+"/fight.php?opponent_id="+parseInt(GM_getValue('fightList', ''))+"&action=attack"+"'", delay);
        }
}

function UpdateStats(){
        if(GM_getValue('autoStats', '') != "checked" || level==GM_getValue('currentlevel', 1) || (GM_getValue('paused')!=0))
                return;
       
        var skillpoints = document.body.innerHTML.split('You have <span class="good">')[1];
        if(skillpoints==null)
                return;

        skillpoints = parseInt(skillpoints);
        GM_log('Autoplayer UpdateStats '+skillpoints);

        var attributes = document.evaluate("//table[@class='main']",document,null,9,null).singleNodeValue;

        var strength = parseInt(attributes.getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML);
        if(GM_getValue('attackStat', 0)>strength && skillpoints>0){
                setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[1].getElementsByTagName('a')[0].href+"'", delay);
                return;
        }
        else if(GM_getValue('attackStat', 0)<strength)
                GM_setValue('attackStat', strength);

        var defence = parseInt(attributes.getElementsByTagName('tr')[2].getElementsByTagName('td')[1].innerHTML);
        if(GM_getValue('defenceStat', 0)>defence && skillpoints>0)              {
                setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[2].getElementsByTagName('a')[0].href+"'", delay);
                return;
        }
        else if(GM_getValue('defenceStat', 0)<defence)
                GM_setValue('defenceStat', defence);

        var energystat = parseInt(attributes.getElementsByTagName('tr')[3].getElementsByTagName('td')[1].innerHTML);
        if(GM_getValue('energyStat', 0)>energystat && skillpoints>0){
                setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[3].getElementsByTagName('a')[0].href+"'", delay);
                return;
        }
        else if(GM_getValue('energyStat', 0)<energystat)
                GM_setValue('energyStat', energystat);

        var healthstat = parseInt(attributes.getElementsByTagName('tr')[4].getElementsByTagName('td')[1].innerHTML);
        if(GM_getValue('healthStat', 0)>healthstat && skillpoints>0){
                setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[4].getElementsByTagName('a')[0].href+"'", delay);
                return;
        }
        else if(GM_getValue('healthStat', 0)<healthstat)
                GM_setValue('healthStat', healthstat);

        var ragestat = parseInt(attributes.getElementsByTagName('tr')[5].getElementsByTagName('td')[1].innerHTML);
        if(GM_getValue('rageStat', 0)>ragestat && skillpoints>1){
                setTimeout("document.location = '"+attributes.getElementsByTagName('tr')[5].getElementsByTagName('a')[0].href+"'", delay);
                return;
        }
        else if(GM_getValue('rageStat', 0)<ragestat)
                GM_setValue('rageStat', ragestat);
               
        GM_setValue('currentlevel', level);
}

function UpdateAbilityPage(){
        if(GM_getValue('autoAbility', '') != "checked" || GM_getValue('paused')!=0 )
                return;
        GM_log('UpdateAbilityPage');

        for (var index = 1 ; index < 18; index++){
                var ability = document.evaluate("//div[@id='app25287267406_improve_ability_"+index+"']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                if(ability.snapshotLength==0)
                        continue;
                var forms = ability.snapshotItem(0).getElementsByTagName('form');              
               
                if(forms.length==2){
                        setTimeout(function(){forms[0].submit();},delay);
                        return;
                }
        }
}

// Auto-purchase minions - AJAX (by Zorkfour)
function UpdateMinionPage(){
        GM_log('UpdateMinionPage');
        var minions = document.evaluate("//tr[@class='darkRow'] | //tr[@class='lightRow']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var minReturn = 9999999;

        // Iterate minions to determine best return on investment
        for (var index = 0 ; index < minions.snapshotLength; index++){
                var hasForm = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[1].getElementsByTagName('form');
                // Ensure minion is purchasable
                if(hasForm.length>0){
                        var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
                        var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
                       
                        if (minionCost / minionIncome < minReturn)
                                minReturn = minionCost / minionIncome;
                }
        }
       
        // Iterate minions to display cost per blood and purchase if able
        for (var index = minions.snapshotLength-1; index >=0 ; index--)
        {
                var hasForm = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[1].getElementsByTagName('form');
                // Ensure minion is purchasable
                if(hasForm.length>0){
                        var minionIncome = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[1].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
                        var minionCost = parseInt(minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[0].getElementsByTagName('span')[0].innerHTML.split('blood.gif">')[1].split(',').join(''),10);
                        var divSpot = minions.snapshotItem(index).getElementsByTagName('td')[1].getElementsByTagName('div')[3];
                        var divbox = document.createElement('div');
                        if (minionCost / minionIncome == minReturn){
                                GM_setValue('minionCost', minionCost);
                                divbox.innerHTML = 'Cost per blood: <strong class="good"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
                                // Auto-purchase minion
                                if(GM_getValue('autoMinion', '') == "checked" && blood > minionCost*10 && (GM_getValue('paused')==0)){
                                        var minionForm = minions.snapshotItem(index).getElementsByTagName('td')[2].getElementsByTagName('td')[1].getElementsByTagName('form')[0];
                                        minionForm.getElementsByTagName('select')[0].value =10;
                                        setTimeout(function(){minionForm.submit();},delay);
                                        return;
                                }
                        }
                        else
                                divbox.innerHTML = 'Cost per blood: <strong class="money"><img src="http://facebook.vampires.static.zynga.com/graphics/icon-blood.gif"/>' + (minionCost / minionIncome).toFixed(2) + '</strong>';
                        divSpot.parentNode.insertBefore(divbox, divSpot.nextSibling);
                }
        }      
}


// Auto-purchase minions - no AJAX  (Zorkfour)
if (location.href.indexOf(SCRIPT.name+'/properties') != -1){
        if(blood==undefined){
                RefreshGlobalStats();
        }
        UpdateMinionPage();
}

function UpdatePlayerPage(){
        GM_log('UpdatePlayerPage');
        var user = document.evaluate("//div[@class='zy_popup_box_bg']",document,null,9,null).singleNodeValue;
        var newImg = document.createElement("img");
        newImg.setAttribute("src", giftbox);
        newImg.addEventListener('click',giftPlayer(location.href.split('user=')[1]), false);
        user.parentNode.insertBefore(newImg,user);
}

function UpdateGroupWall(){
        GM_log('UpdateGroupWall');
        var users = document.evaluate("//td[@class='collapseCell']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var index = 0 ; index < users.snapshotLength ; index++)
        {
                var img = users.snapshotItem(index).getElementsByTagName('img')[0];
                if(img!=null)
                        img.addEventListener('click',statsPlayer(img.getAttribute('uid')), false);
        }
}

///////////////////////////////////////////////////////////////////////////////
//   End of page code.                    Automatic play is kicked off by doAutoPlay().    //
///////////////////////////////////////////////////////////////////////////////

function giftPlayer(mobid){
        return function ()      { window.location = "http://apps.facebook.com/"+SCRIPT.name+"/gift.php?user_id="+mobid; }
}

function statsPlayer(mobid){
        return function ()      { window.location = "http://apps.facebook.com/"+SCRIPT.name+"/comments.php?user="+mobid;}
}

function toggleSettings(){
        var settingsBox = document.getElementById('settingsBox');
        if(!settingsBox)
                settingsBox = createMenu();

        if(settingsOpen == false){
        settingsOpen = true;
        settingsButton.innerHTML = "close settings";
        settingsBox.style.visibility = "visible";
                coffinMenuSelect();
        }
    else{
        settingsOpen = false;
        settingsButton.innerHTML = "open settings";
        settingsBox.style.visibility = "hidden";
                document.getElementById('coffinTab').style.visibility = "hidden";
                document.getElementById('missionTab').style.visibility = "hidden";
                document.getElementById('combatTab').style.visibility = "hidden";
                document.getElementById('bazaarTab').style.visibility = "hidden";
    }
}

function createMenu() {
        var settingsBox = makeElement('div', document.body,{'id':'settingsBox'});
                settingsBox.setAttribute("style", "position: absolute; left: "+bannerLeft+"px; top: "+(bannerTop+28)+"px;  width: 748px; height: 365px; background: black url(http://facebook5.vampires.static.zynga.com/31993/css/ui/border_deco_fb.jpg); font-family: tahoma; font-size: 10pt; text-align: left; padding: 5px; border: 1px dotted; visibility: hidden; z-index: 100;");

        var versionBox = makeElement('div', settingsBox,{'style':'position: absolute; left:40px; color: #FFFFFF;'});
        versionBox.innerHTML  = "<img src='http://www.zynga.com/images/games/gameSmall_vampires.jpg'/><strong> "+SCRIPT.version+" (game r." +gameVersion+") </strong>";

        var coffinMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:240px; color: #FFFFFF;', 'id':'coffinMenu'});
        coffinMenu.innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_se.png'/>";
                coffinMenu.addEventListener('click', coffinMenuSelect, false);

        var missionMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:320px; color: #FFFFFF;', 'id':'missionMenu'});
        missionMenu.innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
                missionMenu.addEventListener('click', missionMenuSelect, false);

        var combatMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:400px; color: #FFFFFF;', 'id':'combatMenu'});
        combatMenu.innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
                combatMenu.addEventListener('click', combatMenuSelect, false);

        var bazaarMenu = makeElement('div', settingsBox,{'style':'position: absolute; left:480px; color: #FFFFFF;', 'id':'bazaarMenu'});
        bazaarMenu.innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
                bazaarMenu.addEventListener('click', bazaarMenuSelect, false);

/* Coffin tab*/        
        var coffinTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; ', 'id':'coffinTab'});
               
        var autoClick = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoClick.innerHTML  = "<input type='checkbox' id='autoClick' value='checked' "+GM_getValue('autoClick', '')+">enable auto-refresh";

        var refreshTimes = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 25px; color: #FFFFFF;'});
                refreshTimes.innerHTML = "refresh every <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r1', '30') + "' id='r1' size='2'>";
                refreshTimes.innerHTML += " to <input type='text' style='border: none; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('r2', '110') + "'id='r2' size='2'> seconds";

        var refreshPage = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 50px; color: #FFFFFF;'});
                refreshPage.innerHTML = "url: <input type='text' style='border: none; width: 270px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('refreshPage', '/index.php') + "' id='refreshPage' size='200'>";

    var autoLog = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        autoLog.innerHTML  = "<input type='checkbox' id='autoLog' value='checked' "+GM_getValue('autoLog', 'checked')+">enable auto logging";
       
    var autoGamble = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 100px; color: #FFFFFF;'});
        autoGamble.innerHTML  = "<input type='checkbox' id='autoGamble' value='checked' "+GM_getValue('autoGamble', 'checked')+">enable auto Akem's Gamble";

        var gamblebox1 = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 125px; color: #FFFFFF;'});
                gamblebox1.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxLeft' value='checked' " + GM_getValue('rBoxLeft', '') + "> Left ";

        var gamblebox2 = makeElement('div', coffinTab,{'style':'position: absolute; left:350px;  top: 125px; color: #FFFFFF;'});
                gamblebox2.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxMiddle' value='checked' " + GM_getValue('rBoxMiddle', '') + "> Middle ";

        var gamblebox3 = makeElement('div', coffinTab,{'style':'position: absolute; left:410px;  top: 125px; color: #FFFFFF;'});
                gamblebox3.innerHTML  = "<input type='radio' name='rBoxes' id='rBoxRight' value='checked' " + GM_getValue('rBoxRight', '') + "> Right ";

    // var autoTreasure = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 150px; color: #FFFFFF;'});
        // autoTreasure.innerHTML  = "<input type='checkbox' id='autoTreasure' value='checked' "+GM_getValue('autoTreasure', 'checked')+">enable opening Treasure Chest";
               
    var autoBank = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 175px; color: #FFFFFF;'});
        autoBank.innerHTML  = "<input type='checkbox' id='autoBank' value='checked' "+GM_getValue('autoBank', '')+">enable auto-Bank";

    var bankConfig = makeElement('div', coffinTab,{'style':'position: absolute; left:40px;  top: 200px; color: #FFFFFF;'});
                bankConfig.innerHTML = "above: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankConfig', '100000') + "' id='bankConfig' size='8'>"+" keep: <input type='text' style='border: none; width: 100px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('bankKeep', '50000') + "' id='bankKeep' size='8'>";

    var autoBuff = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 25px; color: #FFFFFF;'});
        autoBuff.innerHTML  = "<input type='checkbox' id='autoBuff' value='checked' "+GM_getValue('autoBuff', '')+">enable auto-Buff";

    var autoMinion = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 50px; color: #FFFFFF;'});
        autoMinion.innerHTML  = "<input type='checkbox' id='autoMinion' value='checked' "+GM_getValue('autoMinion', '')+">enable auto minion purchase";
               
    var autoAbility = makeElement('div', coffinTab,{'style':'position: absolute; left:300px;  top: 75px; color: #FFFFFF;'});
        autoAbility.innerHTML  = "<input type='checkbox' id='autoAbility' value='checked' "+GM_getValue('autoAbility', '')+">enable auto ability upgrading";
               
    var autoStats = makeElement('div', coffinTab,{'style':'position: absolute; left:500px;  top: 0px; color: #FFFFFF;'});
        autoStats.innerHTML  = "<input type='checkbox' id='autoStats' value='checked' "+GM_getValue('autoStats', '')+">enable auto-Stats";

        var AttackStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 25px; color: #FFFFFF;'});
                AttackStat.innerHTML = "Attack Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('attackStat', '0') + "' id='AttackStat' size='1'>";

        var DefenceStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 50px; color: #FFFFFF;'});
                DefenceStat.innerHTML = "Defense Strength: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('defenceStat', '0') + "' id='DefenceStat' size='1'>";

        var EnergyStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 75px; color: #FFFFFF;'});
                EnergyStat.innerHTML = "Maximum Energy: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('energyStat', '0') + "' id='EnergyStat' size='1'>";

        var HealthStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 100px; color: #FFFFFF;'});
                HealthStat.innerHTML = "Maximum Health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthStat', '0') + "' id='HealthStat' size='1'>";

        var RageStat = makeElement('div', coffinTab,{'style':'position: absolute; left:520px;  top: 125px; color: #FFFFFF;'});
                RageStat.innerHTML = "Maximum Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('rageStat', '0') + "' id='RageStat' size='1'>";

/* Mission tab*/                
        var missionTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'missionTab'});

        var autoMission = makeElement('div', missionTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
         autoMission.innerHTML  = "<input type='checkbox' id='autoMission' value='checked' "+GM_getValue('autoMission', 'checked')+">enable auto-Mission";

        var selectMission = makeElement('select', missionTab, {'style':'position: absolute; top: 25px; left:40px;', 'id':'selectMission'});
                for each (var mission in missions )
                {
                        var choice = document.createElement('option');
                        choice.value = mission[0];
                        choice.appendChild(document.createTextNode(mission[0]));
                        selectMission.appendChild(choice);
                }
                selectMission.selectedIndex = GM_getValue('selectMission', 1);

        var missionMastery = makeElement('div', missionTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
                missionMastery.innerHTML  = "<input type='checkbox' id='missionMastery' value='checked' "+GM_getValue('missionMastery', 'checked')+">Force mission Mastery";
               
/* Combat tab*/
        var combatTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'combatTab'});

    var autoFight = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoFight.innerHTML  = "<input type='checkbox' id='autoFight' value='checked' "+GM_getValue('autoFight', '')+">enable auto-Fight";

    var fightKeepRage = makeElement('div', combatTab,{'style':'position: absolute; left:60px;  top: 25px; color: #FFFFFF;'});
                fightKeepRage.innerHTML = "fight above Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightKeepRage', '0') + "' id='fightKeepRage' size='1'>";

    var autoHeal = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
        autoHeal.innerHTML  = "<input type='checkbox' id='autoHeal' value='checked' "+GM_getValue('autoHeal', 'checked')+">enable auto-Heal";

    var healthLevel = makeElement('div', combatTab,{'style':'position: absolute; left:40px;  top: 100px; color: #FFFFFF;'});
                healthLevel.innerHTML = "min. health: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthLevel', '50') + "' id='healthLevel' size='1'>";

    var healthRage = makeElement('div', combatTab,{'style':'position: absolute; left:160px;  top: 100px; color: #FFFFFF;'});
                healthRage.innerHTML = "max. Rage: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('healthRage', '5') + "' id='healthRage' size='1'>";
               
    var fightRandom = makeElement('div', combatTab,{'style':'position: absolute; left:300px;  top: 0px; color: #FFFFFF;'});
        fightRandom.innerHTML  = "<input type='radio' name='r1' id='fightRandom' value='checked' "+GM_getValue('fightRandom', '')+"> fight random vampires";
       
    var fightLevel = makeElement('div', combatTab,{'style':'position: absolute; left:320px;  top: 25px; color: #FFFFFF;'});
                fightLevel.innerHTML = "max. level: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightLevel', '100') + "' id='fightLevel' size='1'>";

    var fightClanSize = makeElement('div', combatTab,{'style':'position: absolute; left:320px;  top: 50px; color: #FFFFFF;'});
                fightClanSize.innerHTML = "max. clan: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanSize', '502') + "' id='fightClanSize' size='1'>";

    var fightClanRating = makeElement('div', combatTab,{'style':'position: absolute; left:320px;  top: 75px; color: #FFFFFF;'});
                fightClanRating.innerHTML = "min. rating: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanRating', '500') + "' id='fightClanRating' size='1'>";

        var fightClanRatingMax = makeElement('div', combatTab,{'style':'position: absolute; left:320px;  top: 100px; color: #FFFFFF;'});
                fightClanRatingMax.innerHTML = "max. rating:  <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('fightClanMaxRating', '5000') + "' id='fightClanMaxRating' size='1'>";


        var fightList = makeElement('div', combatTab,{'style':'position: absolute; left:500px;  top: 0px; color: #FFFFFF;'});
                fightList.innerHTML  = "<input type='radio' name='r1' id='rFightList' value='checked' " + GM_getValue('rFightList', '') + "> fight list:<br/><textarea style='border: none; background-color: transparent; color: #AA0000; width: 180px; height: 200px;' id='fightList'>" + GM_getValue('fightList', '') + "</textarea>";

/* Bazaar tab*/
        var bazaarTab = makeElement('div', settingsBox,{'style':'position: absolute; top: 100px; width: 748px; height: 365px; color: #FFFFFF; visibility:hidden;', 'id':'bazaarTab'});

        var autoGifting = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 0px; color: #FFFFFF;'});
        autoGifting.innerHTML  = "<input type='checkbox' id='autoGifting' value='checked' "+GM_getValue('autoGifting', '')+">enable auto-Gifting";
       
        var selectAttribute = makeElement('select', bazaarTab, {'style':'position: absolute; top: 25px; left:40px;', 'id':'selectAttribute'});
                for each (var attribute in attributes )
                {
                        var choice = document.createElement('option');
                        choice.value = attribute[0];
                        choice.appendChild(document.createTextNode(attribute[0]));
                        selectAttribute.appendChild(choice);
                }
                selectAttribute.selectedIndex = GM_getValue('selectAttribute', 1);

        var giftingCount = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px; top: 50px; color: #FFFFFF;'});
                giftingCount.innerHTML = "Gift count: <input type='text' style='border: none; width: 30px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('giftingCount', '0') + "' id='giftingCount' size='1'>";
               
        var giftingUser = makeElement('div', bazaarTab,{'style':'position: absolute; left:40px;  top: 75px; color: #FFFFFF;'});
                giftingUser.innerHTML = "Gift to userID: <input type='text' style='border: none; width: 90px; text-align: center; background-color: transparent; color: #AA0000;' value='" + GM_getValue('giftingUser', '0') + "' id='giftingUser' size='3'>";
               
/* other buttons*/      
        var updateButton = makeElement('div', settingsBox,{'style':'position: absolute; left:150px;  top: 335px;'});
        updateButton.innerHTML  = "<button>check for updates</button>";
        updateButton.addEventListener('click', updateScript, false);
       
    var saveButton = makeElement('div', settingsBox,{'style':'position: absolute; left:300px;  top: 335px; color: #FFFFFF;'});
        saveButton.innerHTML  = "<button>save settings</button>";
        saveButton.addEventListener('click', saveSettings, false);

    var saveNotification = makeElement('div', settingsBox,{'id':'saveNotification'});
        saveNotification.innerHTML = "<strong>Settings Saved</strong>";
        saveNotification.setAttribute("style","position: absolute;left:450px;top:335px;color:red;visibility:hidden;font-size:14px;");

        return settingsBox;
}

function coffinMenuSelect(){
        document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_se.png'/>";
        document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
        document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
        document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
        document.getElementById('coffinTab').style.visibility = "visible";
        document.getElementById('missionTab').style.visibility = "hidden";
        document.getElementById('combatTab').style.visibility = "hidden";
        document.getElementById('bazaarTab').style.visibility = "hidden";
}
function missionMenuSelect(){
        document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
        document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_se.png'/>";
        document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
        document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
        document.getElementById('coffinTab').style.visibility = "hidden";
        document.getElementById('missionTab').style.visibility = "visible";
        document.getElementById('combatTab').style.visibility = "hidden";
        document.getElementById('bazaarTab').style.visibility = "hidden";
}
function combatMenuSelect(){
        document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
        document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
        document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_se.png'/>";
        document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_us.png'/>";
        document.getElementById('coffinTab').style.visibility = "hidden";
        document.getElementById('missionTab').style.visibility = "hidden";
        document.getElementById('combatTab').style.visibility = "visible";
        document.getElementById('bazaarTab').style.visibility = "hidden";
}

function bazaarMenuSelect(){
        document.getElementById('coffinMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/coffin_us.png'/>";
        document.getElementById('missionMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/missions_us.png'/>";
        document.getElementById('combatMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/combat_us.png'/>";
        document.getElementById('bazaarMenu').innerHTML  = "<img src='http://facebook5.vampires.static.zynga.com/"+gameVersion+"/graphics/ui/bazaar_se.png'/>";
        document.getElementById('coffinTab').style.visibility = "hidden";
        document.getElementById('missionTab').style.visibility = "hidden";
        document.getElementById('combatTab').style.visibility = "hidden";
        document.getElementById('bazaarTab').style.visibility = "visible";
}


function saveSettings(){
    GM_setValue('autoClick', document.getElementById('autoClick').checked ? 'checked' : '0');
    //GM_setValue('autoClan', document.getElementById('autoClan').checked ? 'checked' : '0');
    GM_setValue('autoMission', document.getElementById('autoMission').checked ? 'checked' : '0');
    GM_setValue('missionMastery', document.getElementById('missionMastery').checked ? 'checked' : '0');
    GM_setValue('autoBank', document.getElementById('autoBank').checked ? 'checked' : '0');
    GM_setValue('autoHeal', document.getElementById('autoHeal').checked ? 'checked' : '0');
    GM_setValue('autoBuff', document.getElementById('autoBuff').checked ? 'checked' : '0');
    GM_setValue('autoFight', document.getElementById('autoFight').checked ? 'checked' : '0');
    GM_setValue('fightRandom', document.getElementById('fightRandom').checked ? 'checked' : '0');
    GM_setValue('rFightList', document.getElementById('rFightList').checked ? 'checked' : '0');
    GM_setValue('autoLog', document.getElementById('autoLog').checked ? 'checked' : '0');
    GM_setValue('autoGamble', document.getElementById('autoGamble').checked ? 'checked' : '0');
 //   GM_setValue('autoTreasure', document.getElementById('autoTreasure').checked ? 'checked' : '0');
        GM_setValue('autoAbility', document.getElementById('autoAbility').checked ? 'checked' : '0');
    GM_setValue('rBoxLeft', document.getElementById('rBoxLeft').checked ? 'checked' : '0');
    GM_setValue('rBoxMiddle', document.getElementById('rBoxMiddle').checked ? 'checked' : '0');
    GM_setValue('rBoxRight', document.getElementById('rBoxRight').checked ? 'checked' : '0');
    GM_setValue('autoStats', document.getElementById('autoStats').checked ? 'checked' : '0');
    GM_setValue('autoMinion', document.getElementById('autoMinion').checked ? 'checked' : '0');
    GM_setValue('refreshPage', document.getElementById('refreshPage').value);
        GM_setValue('selectMission', document.getElementById('selectMission').selectedIndex );
    GM_setValue('bankConfig', document.getElementById('bankConfig').value);
    GM_setValue('bankKeep', document.getElementById('bankKeep').value);
    GM_setValue('r1', document.getElementById('r1').value);
    GM_setValue('r2', document.getElementById('r2').value);
    GM_setValue('fightList', document.getElementById('fightList').value);
    GM_setValue('healthLevel', document.getElementById('healthLevel').value);
    GM_setValue('healthRage', document.getElementById('healthRage').value);
    GM_setValue('fightKeepRage', document.getElementById('fightKeepRage').value);
    GM_setValue('fightLevel', document.getElementById('fightLevel').value);
    GM_setValue('fightClanSize', document.getElementById('fightClanSize').value);
    GM_setValue('fightClanRating', document.getElementById('fightClanRating').value);
    GM_setValue('fightClanMaxRating', document.getElementById('fightClanMaxRating').value);    
    GM_setValue('attackStat', document.getElementById('AttackStat').value);
    GM_setValue('defenceStat', document.getElementById('DefenceStat').value);
    GM_setValue('energyStat', document.getElementById('EnergyStat').value);
    GM_setValue('healthStat', document.getElementById('HealthStat').value);
    GM_setValue('rageStat', document.getElementById('RageStat').value);
       
    GM_setValue('autoGifting',  document.getElementById('autoGifting').checked ? 'checked' : '0');
    GM_setValue('selectAttribute', document.getElementById('selectAttribute').selectedIndex );
    GM_setValue('giftingCount', document.getElementById('giftingCount').value);
    GM_setValue('giftingUser', document.getElementById('giftingUser').value);

        // show settings saved notification
        document.getElementById('saveNotification').style.visibility = "visible";
    setTimeout("document.location = location.href",1000);
}

function pausePlayer(){
        GM_setValue('paused',1);
        document.location = location.href;
}

function resumePlayer(){
        GM_setValue('paused',0);
        document.location = location.href;
}

function addToLog(line){
        var currentTime = new Date()
        var month = 1+ parseInt(currentTime.getMonth());
        var timestamp = currentTime.getDate()+ "/" + month+ "/" +currentTime.getFullYear() +" " +currentTime.getHours() + ":" + currentTime.getMinutes()+" ";
        GM_setValue('itemLog', GM_getValue('itemLog', '') + timestamp + line + "<br/>")
}

function ignoreElement(element){
        if(element.id=='')
                return true;
        if (element.id.indexOf('mainDiv') != -1
        || element.id.indexOf('tab_handle') != -1)
                return false;
        return true;
}

function CycleFightList(){
        var opponents = GM_getValue('fightList', '').split("\n");
        var opponentList="";
        for (var i=1;i<opponents.length;i++)
                opponentList = opponentList+ opponents[i]+"\n";
        opponentList = opponentList + opponents[0];
        GM_setValue('fightList', opponentList);
}

function clearLog(){
    GM_setValue('itemLog', '');
    logBox.innerHTML = "";
}

function toggleLogBox(){
    if(logOpen == false){
        logOpen = true;
        viewLogButton.innerHTML = "Hide Log";
        logBox.style.visibility = "visible";
    }
    else{
        logOpen = false;
        viewLogButton.innerHTML = "View Log";
        logBox.style.visibility = "hidden";
    }
}

function makeElement(type, appendto, attributes, checked, chkdefault) {
  var element = document.createElement(type);
  if (attributes != null) {
    for (var i in attributes) {
      element.setAttribute(i, attributes[i]);
    }
  }
  if (checked != null) {
    if (GM_getValue(checked, chkdefault) == 'checked') {
      element.setAttribute('checked', 'checked');
    }
  }
  if (appendto) {
    appendto.appendChild(element);
  }
  return element;
}


function createXMLHTTPObject() {
    var xmlhttp = false;
    for (var i=0;i<XMLHttpFactories.length;i++) {
        try {
            xmlhttp = XMLHttpFactories[i]();
        }
        catch (e) {
            continue;
        }
        break;
    }
    return xmlhttp;
}

//update the script (by Richard Gibson; changed by ms99 and blannie)
function updateScript() {
        try {
                if (!GM_getValue) return;
                GM_xmlhttpRequest({
                        method: 'GET',
                        url: SCRIPT.url + '?source', // don't increase the 'installed' count; just for checking
                        onload: function(result) {
                                if (result.status != 200) return;
                                if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
                                var theOtherVersion = RegExp.$1;
                                if (theOtherVersion == SCRIPT.version) {
                                        alert('you have the latest version' + ' (v ' + SCRIPT.version + ') !');
                                        return;
                                } else if (theOtherVersion < SCRIPT.version) {
                                        alert('Beta version' + ' (v ' + SCRIPT.version + ') installed ?!');
                                        return;
                                } else {
                                        if (window.confirm('new version ' + ' (v ' + theOtherVersion + ') available!\n\n' + 'Do you want to update?' + '\n')) {
                                                window.location.href = SCRIPT.url;
                                        }
                                }
                        }
                });
        } catch (ex) {
        }
}

