// ==UserScript==
// @name           NardoLoopa's TH Re-Buff
// @namespace      http://www.ghostmanonfirst.com/
// @include        *.twilightheroes.com/nav.php
// @include        *.twilightheroes.com/skills.php
// @description    Twilight Heroes Re-up Buff from Nav Pane
// @version        0.3.0
// @license        (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @author         NardoLoopa
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
//
// ==/UserScript==

/*************************** Description ***************************
NardoLoopa's TH Re-Buff
Copyright NardoLoopa 2010

Adds links to cast buffs from the nav pane.

If you like this script consider donating Silver Starts to encourage
the developer.

*******************************************************************/

/*************************** Change Log ***************************
Latest Update:
0.1.0:    Initial release
0.1.1:    Removed skill detection due because of multi-skills.
          Now user responsibility to know which buffs they can re-up.
          This is probably more useful than doing it the other way
          for the time being.
0.1.2:    Refresh pwdhash cookie each time you see the skills page
0.2.0:    added Med-Kit skill to heal HP.  Later I'll add others.
0.3.0:    multi-cast (contribution from TeKRunneR).

*******************************************************************/

var PwdHash       = GM_getValue("PwdHash");
var CharacterName = GM_getValue("CharacterName");
var Skills        = GM_getValue("Skills") ? GM_getValue("Skills").split(";") : null;

// Number of times each link will cast the spell
const NUM_CASTS_1 = 1;
const NUM_CASTS_2 = 2;
const NUM_CASTS_5 = 5;
const HEAL_SKILL  = 104; //First Aid

//looking for the Skills page form cookie to persist for later
//get PwdHash
function getPwdHash () {
   if (document.location.pathname=="/skills.php") {
      var snapHidden = document.evaluate("//input[@name='pwd']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if (!snapHidden.snapshotLength > 0) {
         GM_Log("Couldn't find the cookie on the skills page.");
      }
      else {
         var pwd = snapHidden.snapshotItem(0);
         //GM_log("Setting 'PwdHash' => '" +  pwd.getAttribute('value') + "'");
         GM_setValue("PwdHash", pwd.getAttribute('value'));
         if (!PwdHash) {
            reloadNavFrame();
         }
         PwdHash = pwd.getAttribute('value');
      }
   }
}

//get CharacterName
function getCharacterName () {
   if (document.location.pathname=="/nav.php") {
      var snap = document.evaluate("//a[@href='character.php']",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if (!snap.snapshotLength > 0) {
         GM_Log("Couldn't find the character name on the nav page.");
      }
      else {
         var charName = snap.snapshotItem(0);
         //GM_log("Setting 'CharacterName' => '" +  charName.innerHTML + "'");
         GM_setValue("CharacterName", CharacterName = charName.innerHTML);
      }
   }
}

//get skills you can rebuff
function getCurrentSkills () {
   if (document.location.pathname=="/skills.php") {
      var options = document.evaluate("//option",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if (!options.snapshotLength > 0) {
         GM_Log("Couldn't find any skills on the skills page.");
      }
      else {
         //GM_log("Found " +  options.snapshotLength + " skills on the page");
         Skills = new Array();
         for (var i = 0; i < options.snapshotLength; i++) {
            Skills[i] = options.snapshotItem(i).getAttribute('value');
         }
         GM_setValue("Skills", Skills.join(";"));
      }
  }
}

function reloadNavFrame() {
   document.location.reload();
}

//Call the skill page to re-up the buff
function rebuff (evt, skillNum, numCasts) {
   if (!PwdHash) {
      alert("Visit the Skillpage first, please.");
      return;
   }
   
   // Store the value
   GM_setValue("valSkill"+skillNum, numCasts);
   //GM_log("Set "+numCasts+" as value valSkill"+skillNum);

   //flash it yellow
   evt.target.parentNode.parentNode.firstChild.innerHTML = "<font color='#FFFF00'>"
      + evt.target.parentNode.parentNode.firstChild.innerHTML + "</font>";

   GM_xmlhttpRequest({
      method: "POST",
      url: "http://www.twilightheroes.com/skills.php",
      headers: { "Content-type" : "application/x-www-form-urlencoded" },
      data: encodeURI(
         "pwd=" + PwdHash
         + "&whichskill_cast=" + skillNum
         + "&numtimes=" + numCasts
         + "&bufftarget=" + CharacterName),
      onload: function(e) { processSkillPage(e); },
      onerror: function(e) { alert("Error: " + e.responseText); },
   });
}

//callback for the skillpage
//look for illegal skills and reload the page.
function processSkillPage (e) {
   if (e.responseText.indexOf("You appear to be trying to use a skill you don't have.") > -1) {
      alert ("Nice try; you don't have that skill.");
   }
   reloadNavFrame();
   
}

function incrVal(spValue){
   var currVal = parseInt(spValue.innerText);
   //GM_log("currVal = "+currVal);
   currVal++;
   //GM_log("newVal = "+currVal);
   spValue.innerText = spValue.textContent = currVal;
}

function decrVal(spValue){
   var currVal = parseInt(spValue.innerText);
   //GM_log("currVal = "+currVal);
   if(currVal > 1) { currVal--; }
   //GM_log("newVal = "+currVal);
   spValue.innerText = spValue.textContent = currVal;
}

//add buff up arrow and action
function addBuffUp (itemElement, skillNum, effectName, duration) {
   //GM_log("skill: [" + skillNum + "] for [" + effectName + "] [" + duration + "]");
   var putPlusFirst = 0;
   if (itemElement.nodeName == "DIV") { itemElement.style.display = "inline"; }

   itemElement.innerHTML += ' ';
   
   var spGroup = document.createElement('span');
   //spGroup.id = skillNum;

   $(spGroup).hover(
      function (e) { $(this).children(':last').show();},
      function (e) { $(this).children(':last').hide();}
      );

   var spGo = document.createElement('span');
   var spSub = document.createElement('span');
   var spMinus = document.createElement('span');
   var spValue = document.createElement('span');
   var spPlus = document.createElement('span');
   
   spGo.innerText = spGo.textContent = "\u21e7";

   spMinus.innerText = spMinus.textContent = '-';
   spPlus.innerText = spPlus.textContent = '+';
   
   // Check if we know the value to display, otherwise display 1
   var valSkill = GM_getValue("valSkill"+skillNum);
   if (valSkill == null){
      spValue.innerText = spValue.textContent = '1';
   } else {
      spValue.innerText = spValue.textContent = valSkill;   
   }
   
   spMinus.addEventListener('click', function handler (evt) { decrVal(spValue); }, false);
   spPlus.addEventListener('click', function handler (evt) { incrVal(spValue); }, false);
   
   spGroup.appendChild(spGo);
   spGroup.appendChild(spSub);
   spSub.appendChild(spMinus);
   spSub.appendChild(spValue);
   spSub.appendChild(spPlus);

   spSub.style.border="1px solid white";

   itemElement.parentNode.insertBefore(spGroup, itemElement.nextSibling);
   
   spMinus.style.paddingLeft="3px";
   spMinus.style.paddingRight="1px";
   
   spValue.style.paddingLeft="1px";
   spValue.style.paddingRight="1px";
   
   spPlus.style.paddingLeft="1px";
   spPlus.style.paddingRight="3px";
   
   spSub.style.marginRight="3px";
   
   spMinus.style.cursor="pointer";
   spPlus.style.cursor="pointer";
   spGo.style.cursor="pointer";
   
   
   spSub.style.display="none";

   spGo.addEventListener('click', function handler (evt) {
      rebuff(evt, skillNum, spValue.innerText); }
      , false);
}

//main/////////////////////////////////////////////////////////////////////////
getPwdHash();
getCharacterName();
getCurrentSkills();

//Process the nav page to spruce it up with rebuff decorations
if (document.location.pathname=="/nav.php") {

   //addHP + up
   var hpEl = document.getElementById("tblHPTotal");
   var div = document.createElement("div");
   div.style.display="inline";
   if (!hpEl) hpEl = document.getElementById("hpstring");
   hpEl.parentNode.replaceChild(div, hpEl);
   div.appendChild(hpEl);
   addBuffUp(hpEl, HEAL_SKILL, "First Aid", 0);

   //add Active effects + up
   //GM_log("Got 'PwdHash' => '" + PwdHash + "'");
   var curDivElement;
   var allDivs = document.evaluate(
      '//div[@onclick]',
      document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

   for (var i = 0; i < allDivs.snapshotLength; i++) {
      curDivElement = allDivs.snapshotItem(i);
      //GM_log("Skills: " + Skills.join(":"));

      if ((curDivElement.innerHTML.indexOf("min") != -1)) {
         var effectName = curDivElement.innerHTML.substring(0,curDivElement.innerHTML.indexOf("-")-1);
         var duration = curDivElement.innerHTML.substring(curDivElement.innerHTML.indexOf(">")+1,curDivElement.innerHTML.indexOf(" min"));
         var str = curDivElement.getAttribute("onclick");
         var skillNum = str.substring(str.indexOf("(")+1,str.indexOf(")"));
         //if (Skills.indexOf(skillNum) != -1) {
            addBuffUp(curDivElement, skillNum, effectName, duration);
         //}
      }
   }
}