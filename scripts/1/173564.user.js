// ==UserScript==
// @name           Imobs Functions
// @namespace      Dr. Drity Joe
// @include        http://im.storm8.com/*
// ==/UserScript==

// Don't edit anything var below this line
//----------------------------------------
var autobank      = GM_getValue("autobank", false);
var autoheal      = GM_getValue("autoHeal", false);
var healthLimit   = parseInt(GM_getValue("healthLimit",60));
var healthTimer   = parseInt(GM_getValue("healthTimer", 10));
var healing       = GM_getValue("healing", false);
var currentPage   = GM_getValue("currentPage", "home.php");
var bounty        = GM_getValue("bounty", false);
var bountyLevel   = GM_getValue("bountyLevel",1);
var bountyAmmo    = GM_getValue("bountyAmmo",1);
var autosancNum   = GM_getValue("autosancNum",0);
var resanc        = GM_getValue("resanc",false);
var csearch       = GM_getValue("csearch", "");
var dosearch      = GM_getValue("dosearch",false);
var autoAttack    = GM_getValue("autoAttack",false);
var PUID          = GM_getValue("PUID", "");
var cleanWall     = GM_getValue('cleanWall', false);
var messageBox    = GM_getValue('messageBox', true);
var missionId     = GM_getValue('missionId', "");
var amount   = parseInt(GM_getValue("amount",10000));

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","imfixermenu");
var bchecked = "";
var ichecked = "";
var dchecked = "";
var hchecked = "";
var schecked = "";
var zchecked = "";
var achecked = "";
var cchecked = "";
var rchecked = "";
var mchecked = messageBox ? " checked" : "";

if (autobank)
   bchecked = " checked";
if (autoheal)
   hchecked = " checked";
if (bounty)
   schecked = " checked";
if (dosearch)
   zchecked = " checked";
if (autoAttack)
   achecked = " checked";
if (cleanWall)
   cchecked = " checked";
   
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" /> Auto Bank \
<input type=\"checkbox\" id=\"autoAttack\" "+achecked+" /> Auto Attack </BR> \
<input type=\"checkbox\" id=\"autoheal\" "+hchecked+" /> Auto Heal <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"healthlimit\" value=\""+healthLimit+"\" /> <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"healthtimer\" value=\""+healthTimer+"\" /> </BR> \
<input type=\"checkbox\" id=\"bounty\" "+schecked+" /> Auto Kill <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"bountylevel\" value=\""+bountyLevel+"\" />  <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"bountyammo\" value=\""+bountyAmmo+"\" /> &nbsp;&nbsp; </BR> \
<input type=\"checkbox\" id=\"cleanWall\" "+cchecked+" /> Clean Wall \
<input type=\"checkbox\" id=\"messageBox\" "+mchecked+" /> Message Box <BR/> \
Auto List <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"autosancNum\" value=\""+autosancNum+"\" /> times for <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"amount\" value=\""+amount+"\" /> <br> \
PUID <input type=\"text\" style=\"border: 1px solid green; width: 6em; color: #00ff00; background: black; text-align: center;\" id=\"textboxPUID\" onchange=\"document.getElementById('btnSETPUID').disabled=false;\" value=\""+PUID+"\" />     <INPUT type=\"button\" value=\"GET\" input id=\"btnGETPUID\" \>    <INPUT type=\"button\" value=\"SET\" input id=\"btnSETPUID\" \>    <INPUT type=\"button\" value=\"CLR\" input id=\"btnCLRPUID\" \> <br>\
<input type=\"checkbox\" id=\"dosearch\" "+zchecked+" /> Search <input type=\"text\" style=\"border: 1px solid green; width: 8em; color: #00ff00; background: black; text-align: center;\" id=\"csearch\" value=\""+csearch+"\" /> <BR/> \
<div id=\"imfixernextbuilding\" style=\"margin-top: 4px;\"></div>";

//AL <input type=\"text\" style=\"border: 1px solid green; width: 2em; color: #00ff00; background: black; text-align: center;\" id=\"autosancNum\" value=\""+autosancNum+"\" /> times for <input type=\"text\" style=\"border: 1px solid white; width: 4em; color: #00ff00; background: black; text-align: center;\" id=\"amount\" value=\""+amount+"\" /> <br> \

menu.style.padding = '10px';
var x = 1;
if (document.body.children[1].id == "imhelpermenu")
   x = 2;
document.body.insertBefore(menu, document.body.children[x]);

var page = String(location).split('/')[3].split('.php')[0];

var vPUID = "";

if (page == "profile")
{
    var st = document.getElementById("sectionTabs");
    var purl = String(st.getElementsByTagName("a")[0]);
    vPUID = getQueryVariable(purl, 'puid');
}

var ibutton = document.getElementById("btnGETPUID");
ibutton.addEventListener('click', Get_PUID, true);
if (vPUID=="" || vPUID==null)
    ibutton.disabled=true; else ibutton.disabled=false;

var ibutton1 = document.getElementById("btnSETPUID");
ibutton1.addEventListener('click', Set_PUID, true);
ibutton1.disabled=true;

var ibutton2 = document.getElementById("btnCLRPUID");
ibutton2.addEventListener('click', Clr_PUID, true);
if (document.getElementById("textboxPUID").value!="" || PUID!="")
    ibutton2.disabled=false; else ibutton2.disabled=true;    

function getQueryVariable(query, variable) {
    var qm = query.indexOf('?');
    if (qm >= 0) query=query.substring(qm+1);
    var vars = query.split("&"); 
    for (var i=0;i<vars.length;i++) { 
        var pair = vars[i].split("="); 
        if (pair[0] == variable) return pair[1]; 
    } 
}

function Get_PUID()
{
    var upbox = document.getElementById("textboxPUID");
    upbox.value = vPUID;
    GM_setValue("PUID", vPUID);
    ibutton.disabled=true;
    ibutton1.disabled=true
    ibutton2.disabled=false;
    ibutton2A.disabled=false;
}

function Set_PUID()
{
    var upbox = document.getElementById("textboxPUID");
    GM_setValue("PUID", upbox.value);
    ibutton1.disabled=true;
    ibutton2.disabled=false;
}

function Clr_PUID()
{
    var upbox = document.getElementById("textboxPUID");
    upbox.value = "";
    GM_setValue("PUID", "");
    ibutton2.disabled=true;    
}

function fixNum(n)
{
    n += '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(n)) {
        n = n.replace(rgx, '$1' + ',' + '$2');
    }
    return n;
}

function checkOptions()
{
   // autobanking
   if (document.getElementById('autobank').checked)
       GM_setValue("autobank",true);
   else
       GM_setValue("autobank",false);

   // comment search
   if (document.getElementById('dosearch').checked)
       GM_setValue("dosearch", true);
   else
       GM_setValue("dosearch", false);
   var strSearch = document.getElementById('csearch').value;
   GM_setValue("csearch", strSearch);

   // auto healing
   if (document.getElementById('autoheal').checked)
       GM_setValue("autoHeal", true);
   else
       GM_setValue("autoHeal", false);
   var oldhealth = healthLimit;
   var newhealth = document.getElementById('healthlimit').value;
   if (oldhealth != newhealth)
   {
       healthLimit = newhealth;
       GM_setValue("healthLimit",parseInt(healthLimit));
   }
   var oldtimer = healthTimer;
   var newtimer = document.getElementById('healthtimer').value;
   if (oldtimer != newtimer)
   {
       healthTimer = newtimer;
       GM_setValue("healthTimer",parseInt(newtimer));
   }
       
   // autokill bounty
   if (document.getElementById('bounty').checked)
       GM_setValue("bounty",true);
   else
       GM_setValue("bounty",false);
   var oldsanc = bountyLevel;
   var newsanc = document.getElementById('bountylevel').value;
   if (oldsanc != newsanc)
   {
       bountyLevel = newsanc;
       GM_setValue("bountyLevel",parseInt(bountyLevel));
   }
   var oldammo = bountyAmmo;
   var newammo = document.getElementById('bountyammo').value;
   if (oldammo != newammo)
   {
       bountyAmmo = newammo;
       GM_setValue("bountyAmmo",parseInt(bountyAmmo));
   }

   // autosanc
   var oldNum = autosancNum;
   var newNum = document.getElementById('autosancNum').value;
   if (oldNum != newNum)
   {
       autosancNum = newNum;
       GM_setValue("autosancNum",parseInt(autosancNum));
   }

   var oldbounty = amount;
   var newbounty = document.getElementById('amount').value;
   if (oldbounty != newbounty)
   {
    	amount = newbounty;
		GM_setValue("amount",parseInt(amount));
   }

   // auto re-attack
   if (document.getElementById('autoAttack').checked)
       GM_setValue("autoAttack", true);
   else
       GM_setValue("autoAttack", false);

   // auto clean-wall
   if (document.getElementById('cleanWall').checked)
       GM_setValue("cleanWall", true);
   else
       GM_setValue("cleanWall", false);

   // show message-box?
   GM_setValue("messageBox", document.getElementById('messageBox').checked);

}

// autohealing
if (autoheal)
{
   var healthCurrent = parseInt(document.getElementById('healthCurrent').innerHTML);
   var healthMax = parseInt(document.getElementById('healthMax').innerHTML);

   if (window.name=='HospitalWin') {
      if (healthCurrent < healthLimit) {
         var elememtHealBtn = document.getElementsByClassName('tac healBtn')[0];
         if (elememtHealBtn!=null)
            // document.location = elememtHealBtn.getElementsByTagName('a')[0].href;
             document.location = document.getElementsByClassName('healBtn')[0].getElementsByTagName('a')[0].href;
      } else {
         GM_setValue('healing', false);
         window.opener.document.location.reload();
         window.close();
      }
   } else {
      // set page refresh timer
      if (healthTimer > 0) {
         if (page == "hospital") {
            //alert (t);
             setTimeout('document.location.reload();', healthTimer * 500);
             // document.location.reload();
             //setTimeout('document.location.reload();', healthTimer * (t));
         } else
         if (page == "home" && resanc == false) {
            // console.log('page='+page);
            setTimeout('document.location.reload();', healthTimer * 60 * 1000);
            // document.location.reload();
         }
      }

      // if ((healthCurrent < healthLimit || healthCurrent < healthLimitMax) && healthCurrent < healthMax)) {
      if (healthCurrent < healthLimit && healthCurrent < healthMax) {
         if (!healing) {
            launch("http://im.storm8.com/hospital.php", "HospitalWin", "", "MainWin");
            GM_setValue('healing', true);
            healing = true;
         }
      } else {
        if (healing) {
            GM_setValue('healing', false);
            healing = false;
         }
      }
   }
}


// auto clean wall
if (cleanWall)
{
   var postComment = document.getElementsByClassName('btnMed btnPostComment');
   if (page == "profile" && postComment != null && postComment.length > 0)
   {
       var messages = document.getElementsByClassName('newsFeedItemMsg');
       if (messages.length > 0)
       {
           var lnks = messages[0].getElementsByTagName("a");
           var mPuid = getQueryVariable(lnks[0].href, 'puid');
           if (PUID==mPuid || (PUID=='' && mPuid==null))
           {
               cleanWall = false;
               GM_setValue('cleanWall', false);
           }
           else
           {
               if (lnks.length>1)
                   document.location = lnks[1];
               else
                   document.location = lnks[0];
           }
       } else {
           cleanWall = false;
           GM_setValue('cleanWall', false);
       }
   }
}


// search in comments or bounty Board
if (dosearch || PUID != "")
{
   var postComment = document.getElementsByClassName('btnMed btnPostComment');

   if (page == "profile" && postComment != null && postComment.length > 0 && cleanWall==false)
   {
       var lnks = document.links;
       var wasfound = false;
       var mystring = csearch;
       for (i=0; i<lnks.length; i++)
       {
           var tPuid = getQueryVariable(lnks[i].href, 'puid');
           if (tPuid == null) continue;
           //alert(tPuid);
           var test = lnks[i].innerHTML; 
           if ((dosearch && test.indexOf(csearch)>=0) || (PUID!="" && PUID==tPuid))
           {
               wasfound = true;
               // alert("Found a link that may belong to that chump!");
               document.location = lnks[i];
               break;
           }
       }
       if (!wasfound)
       {
           for (j=lnks.length-1; j>=0; j--)
           {
               var test2 = lnks[j].innerHTML; 
               if (test2.indexOf("Next") == 0)
               {
                   document.location = lnks[j];
                   break;
               }
           
           }
       }
   }
   if (page == "hitlist")
   {
       // AK?
       if (GM_getValue("bounty",false) || PUID!="") {
           // var lnks = document.links;
           var wasfound = false;
           var mystring = csearch;
           var ammo = parseInt(document.getElementById('staminaCurrent').innerHTML);
       
       if (!healing) {
           // still alive?
       
           var alive = document.getElementsByClassName('doAgainTxt');
           if (alive.length > 0)
           {
               var next = alive[0].getElementsByTagName('input')[0];
               if (ammo >= bountyAmmo) click(next);            
               return;
           }
         
           var sancList = document.getElementsByClassName('fightTable');
           
           // for (i=0; i<lnks.length; i++)
           
           for (i=0; i<sancList.length; i++)
           {        
               var fields = sancList[i].getElementsByTagName('td');
               var name = fields[0].getElementsByTagName('a')[0].innerHTML;
               if (PUID != "") {
                   var tPuid = getQueryVariable(String(fields[0].getElementsByTagName('a')[0]), 'puid');
                   if (PUID == tPuid) 
                      {
                       wasfound = true;
                      }
               } else 
               
               if (name.indexOf(csearch) >= 0) {
                   var level = parseInt(fields[0].getElementsByTagName('div')[1].innerHTML.substr(6));
                                           
                   if (GM_getValue("bounty",false)) {
                       if (level == GM_getValue('bountyLevel',1))                           
                       {
                           wasfound = true;
                       }
                   } else
                       wasfound = true;
               }

               if (wasfound)
               {
                   var AttackButton = fields[4].getElementsByTagName('a')[0];
                   // document.location = lnks[i+1];
                   if (ammo >= bountyAmmo)
                       // click(lnks[i+1]);
                      click(AttackButton);
                   break;
               }
           }
           if (!wasfound)
           {
               var tabs = document.getElementById('sectionTabs');
//             console.log(tabs.getElementsByTagName("a")[1]);
               document.location = tabs.getElementsByTagName("a")[1];

//             document.location = 'http://im.storm8.com/hitlist.php?';
           }
         }
       }
       else
       {
           // hit list search
           var lnks = document.links;
           var wasfound = false;
           var mystring = csearch;
           for (i=0; i<lnks.length; i++)
           {
               var test = lnks[i].innerHTML; 
               if (test.indexOf(csearch) >= 0)
               {
                   wasfound = true;
                   document.location = lnks[i];
                   //alert("found him");
                   break;
               }
           }
           if (!wasfound)
           {
               document.location = 'http://im.storm8.com/hitlist.php?';
           }
       }
   }
}


function launch(newURL, newName, newFeatures, orgName) {
   var remote = open(newURL, newName, newFeatures);
   if (remote.opener == null)
      remote.opener = window;
   remote.opener.name = orgName;
   return remote;
}

function getCash()
{
   var cfield = document.getElementById('cashCurrent');
   var cash = 0;
   if (cfield.getElementsByTagName('a').length > 0)
       return parseInt(cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g,''));
   else
       return parseInt(cfield.innerHTML.replace(/,/g,''));
}

// autobanking
function bankIt()
{
   if (GM_getValue("autobank",false))
   {
       var cash = getCash();
       if (cash > 0)
           postwith("bank.php", ['depositAmount', cash, 'action', 'Deposit']);
   }
}

function postwith (to,p) {
    var myForm = document.createElement("form");
    myForm.method="post" ;
    myForm.action = to ;
    for (var k=0; k<p.length; k+=2) {
        var myInput = document.createElement("input") ;
        myInput.setAttribute("name", p[k]) ;
        myInput.setAttribute("value", p[k+1]);
        myForm.appendChild(myInput) ;
    }
    document.body.appendChild(myForm) ;
    myForm.submit() ;
    document.body.removeChild(myForm) ;
}

function removeElement(id) {
    var element = document.getElementById(id);
    element.parentNode.removeChild(element);
} 


// remove AD and messageBox?
if (messageBox == false)
{
    // remove messageBox
    var messageBox = document.getElementsByClassName('messageBox infoBox');
    if (messageBox.length > 0)
    {
        for (i=messageBox.length-1; i>=0; i--)
        {
            messageBox[i].parentNode.removeChild(messageBox[i]);
        }
    }

    // remove AD
    var successMsg = document.getElementsByClassName('messageBoxSuccess')[0];
    if (successMsg != null)
    {
        var installAction = successMsg.getElementsByClassName('installAction')[0];
        if (installAction != null)
        {
            successMsg.parentNode.removeChild(successMsg);
        }
    }
}


// show ID of missions
if (page == "missions")
{
    var missions = document.getElementsByClassName('missionTable');
    for (i=0; i<missions.length; i++)
    {
        var missionName = missions[i].getElementsByClassName('missionName ')[0];
        var missionLink = missions[i].getElementsByTagName('a')[0];
        var jId = getQueryVariable(missionLink.href, 'jid');
        missionName.innerHTML = jId+'.'+missionName.innerHTML;
    }
}

if (autoAttack) {
   if (page == "profile")
   {
      var profileName = document.getElementsByClassName('profileRight')[0].getElementsByTagName('b')[0].innerHTML;
      if (dosearch && csearch.indexOf(profileName)>=0) {
         var elementBtnMed = document.getElementsByClassName('btnMed')[0];
         if (elementBtnMed!=null) {
            click(elementBtnMed);
         }
      }
   } else
   if (page == "fight" && autoAttack)
   {
      var elementBtnMed = document.getElementsByClassName('btnMed')[2];
      if (elementBtnMed!=null) {
          var d = new Date();
          var n = d.getSeconds(); 
          var t = parseInt(n);
        //  if (t < 10)
        //      {           
        //      t = t*1000;
        //      }
        //  else
        //      {
        //      t = t*100;
        //      }
        //  wait(t);   
          click(elementBtnMed);        
      }
   }
}

// autokill bountys
if (page == "hitlist")
{
   // check if search is enabled
   if (dosearch)
       return;
   else
   if (GM_getValue("bounty",false))
      attackSanc();
}

function attackSanc(noReattack)
{
   // check health
   if (parseInt(document.getElementById('healthCurrent').innerHTML) <= 28)
       return;
   // check ammo
   if (document.getElementById('staminaCurrent').innerHTML == 0)
   {
       // defeat storm8 hacker checks by introducing random delay up to 5 seconds
       var delay = Math.random()*5;
       var time = document.getElementById('staminaType').innerHTML.split(':');
       var seconds = parseInt(time[0]) * 60 + parseInt(time[1]) + delay;    // add 2 seconds to the timer
       // wait to receive bountyAmmo ammo
       bountyAmmo = Math.max(1, bountyAmmo);
       seconds = seconds + 100 * (bountyAmmo - 1);
       setTimeout("document.location = 'http://im.storm8.com/hitlist.php'", Math.floor(1000*seconds));
       document.location = 'http://im.storm8.com/hitlist.php';
       return;
   }

   // check for re-attack
   if (noReattack == null)
   {
 
       var won   = document.getElementsByClassName('lostFight').length;
       var alive = document.getElementsByClassName('doAgainTxt');

       if (won && alive.length > 0)
       {
           var next = alive[0].getElementsByTagName('input')[0];
           click(next); 
           return;
       }
   }
   
   // otherwise find a new person to attack
   var people = document.getElementsByClassName("fightTable");
   var found = false;

   // for (i in people)
   for (i=0; i<people.length; i++)
   {
       var fields = people[i].getElementsByTagName("td");
       var level = parseInt(fields[0].getElementsByTagName("div")[1].innerHTML.substr(6));
             
       //if (level < GM_getValue("BountyLevel",1))
       if (level < bountyLevel)
       {
           var link = fields[4].getElementsByTagName('a')[0];
           click(link);
           clink(link);
           found = true;
           break;
       }
   }
   if (!found)
      document.location = 'http://im.storm8.com/hitlist.php';
}

if (resanc)

{
   if (page == "hitlist")
   { 
       document.location = 'http://im.storm8.com/home.php';
   }
   if (page == "home")
   {
       // settimeout because the links load with JS
       setTimeout(resanc_home, 1000);
   }

   if (page == "profile")
   {
       var buttons = document.getElementsByClassName('buttonHolder')[0].getElementsByTagName('input');
       click (buttons[buttons.length - 1]);
   }   
}

function resanc_home()
{
   var a = document.getElementsByTagName('a');
   var found = false;
   for (i=0; i<a.length; i++)
   {
       if (a[i].innerHTML == resanc)
       {
           found = true;
           break;
       }

   }
   if (!found)
   {
       GM_setValue('resanc', false);
   }
   else
   {
       document.location = a[i];
   }
}

// autobounty
if (page == "bounty")
{  
   GM_setValue("resanc",false);
   var form = document.getElementById('bountyForm');
   
   var minpay = 10000
   var target = document.getElementsByClassName('sectionHeader')[0].innerHTML.split('"')[1];
   //form.getElementsByTagName('input')[0].value = minpay;
   form.getElementsByTagName('input')[0].value = amount;
    
   if (autosancNum > 0)
   { 
       GM_setValue('resanc',target);
       GM_setValue('autosancNum',autosancNum - 1);
       // see if we've just failed to sanc him
       var n = 0;
       var fails = document.getElementsByClassName('messageBoxFail');
       if (fails.length > 0)
       {
           GM_setValue('autosancNum', autosancNum);
           if (fails[0].innerHTML.length == 114 + resanc.length)
           {
               // too many sancs for today
               GM_setValue('resanc', false);
               return;
           }
           n = 1000;
       }
          var d = new Date();
          var n = d.getSeconds(); 
          var t = parseInt(n);
      //    if (t < 10)
      //        {           
      //        t = t*1000;
      //        }
      //    else
      //        {
      //        t = t*100;
      //        }
      //    wait(t);   
       setTimeout(click_sanc, n);
   }
}

function click_sanc()
{
   click(document.getElementById('bountyForm').getElementsByClassName('btnBroadcast')[0]);
}

// Click by JoeSimmons
// Syntax: click(element); // String argument will grab it by id, or you can supply an element
function click(e, type) {
    if(!e) {return;}
    if(typeof e=='string') e=document.getElementById(e);
    var evObj = document.createEvent('MouseEvents');
    evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
    e.dispatchEvent(evObj);
}

if (!window.closed) {
   setInterval(bankIt, 30*1000);
   setInterval(checkOptions,  1000);
}

function wait(msecs)
 {
 var start = new Date().getTime();
 var cur = start
 while(cur - start < msecs)
 {
 cur = new Date().getTime();
 } 
} 
