/**
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* any later version.

* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
* GNU General Public License for more details.

* You should have received a copy of the GNU General Public License
* along with this program. If not, see <http://www.gnu.org/licenses/>.
*/

/**
* @version 0.0.5
* @package Facebook Zoo Autoplayer
* @author JankoR
* @author Created on March 23, 2009
*/
// ==UserScript==
// @name        Facebook Zoo Autoplayer
// @namespace   zoo
// @description Autoplayer for the facebook application - zoo
// @include     http://apps.facebook.com/playzoo/*
// @version     0.1.0
// ==/UserScript==




// Reload in case that something go wrong!
setTimeout('location.reload(true)',1000*60*11);

var MaxBreedingCages=3;
var Debug=false;

var SecondsToReloadMin = GM_getValue( "SecondsToReloadMin",120) // Min No of sec between 2 reloads
var SecondsToReloadMax = GM_getValue( "SecondsToReloadMax",480) // Max No of sec between 2 reloads
var AutoPlayerOnOff    = GM_getValue( "AutoPlayerOnOff","checked") // Max No of sec between 2 reloads
var AutoBreedOnOff     = GM_getValue( "AutoBreedOnOff","checked") // Max No of sec between 2 reloads
var NextToBreedName    = GM_getValue( "NextToBreedName","") // Max No of sec between 2 reloads
var NextToBreedID      = GM_getValue( "NextToBreedID","") // Max No of sec between 2 reloads

var links = Array()
links.push("home.php?fb_force_mode=fbml")
// links.push("visitZoo.php?fb_force_mode=fbml") -- Slow page - just avoiding it
//links.push("giftAnimals.php?fb_force_mode=fbml")
//links.push("recruitZookeepers.php?fb_force_mode=fbml")
links.push("visitFriends.php?fb_force_mode=fbml")
links.push("breed.php?fb_force_mode=fbml")
links.push("shop.php?fb_force_mode=fbml")
//links.push("wildlifeFund.php?fb_force_mode=fbml") -- No menu
//links.push("help.php?fb_force_mode=fbml")



var Link=links[Math.floor(Math.random()*links.length)];
var Sec= SecondsToReloadMin*1000+Math.floor(Math.random()*(SecondsToReloadMax-SecondsToReloadMin)*1000);
var ReloadTimer
ReloadTimer = window.setTimeout(ReloadTo, Sec,[Link+"&sec="+Sec]);


function ReloadTo(lnk)
{
 if (document.getElementById("AutoPlayerOnOffCb")==null) {location.href=lnk;}
 if (document.getElementById("AutoPlayerOnOffCb").checked)
  {
  location.href=lnk;
  }
  else
  {
   ReloadTimer = window.setTimeout(ReloadTo, Sec,[Link+"&sec="+Sec]);
  }
}




function MakeValueTr(Label,InputName,InputValue)
{
  var tr=document.createElement("tr");
  var td1=document.createElement("td");
  var td2=document.createElement("td");

  td1.innerHTML= Label;
  td1.setAttribute("align","left")

  td2.innerHTML= "<input id="+InputName+" value='"+InputValue+"'  size=5 style='text-align:right' align=right  onkeypress=\"btn=document.getElementById('btnAutoPlayerSave');btn.value='Save';btn.disabled=false;\" />"
  td1.setAttribute("align","right")

  tr.appendChild(td1)
  tr.appendChild(td2)
  return tr
}

function MakeSaveTr()
{
  var TrAPSave=document.createElement("tr");
  var TdAPSave1=document.createElement("td");
  var TdAPSave2=document.createElement("td");
  TdAPSave2.innerHTML=  "<input align=right type=button value='Saved' disabled id=btnAutoPlayerSave onClick=\"this.value='Saving';this.disabled=true;\" />";
  TdAPSave2.setAttribute("align","center")
  TrAPSave.appendChild(TdAPSave1);
  TrAPSave.appendChild(TdAPSave2);
  return TrAPSave
}

function MakeHr()
{
  var tr=document.createElement("tr");
  var td=document.createElement("td");
  td.setAttribute("colspan","2")
  td.innerHTML=  "<hr>";
  tr.appendChild(td);
  return tr
}

function MakeText(Text)
{
  var tr=document.createElement("tr");
  var td=document.createElement("td");
  td.setAttribute("colspan","2")
  td.innerHTML=  Text;
  tr.appendChild(td);
  return tr
}

function MakeCbTr(Label,InputName,InputValue)
{

  var tr=document.createElement("tr");
  var td=document.createElement("td");
  td.setAttribute("colspan","2")
  td.innerHTML=  "<input type='checkbox' id="+InputName+" "+GM_getValue(InputValue, "")+" /> "+Label
  tr.appendChild(td);
  return tr

}



// Finding adds and replacing them with Control Panel
var SidebarAds = document.getElementById("sidebar_ads")
while(SidebarAds.lastChild) {SidebarAds.removeChild(SidebarAds.lastChild)}
var stats = SidebarAds

SetupTable=document.createElement("table")
SetupTableBody =document.createElement("tbody")
SetupTable.appendChild(SetupTableBody)

SetupTableBody.appendChild(MakeCbTr("Auto player","AutoPlayerOnOffCb","AutoPlayerOnOff"));

if (Debug)
 {
  SetupTableBody.appendChild(MakeText("<a href=# style='color:black' onClick=\"dt=document.getElementById('DebugTable');if(dt.style.display=='none'){dt.style.display='block'}else{dt.style.display='none'}\">Debug</a>"));
 }
SetupTableBody.appendChild(MakeHr());
SetupTableBody.appendChild(MakeValueTr("Min reload time","SecondsToReloadMinValue",SecondsToReloadMin));
SetupTableBody.appendChild(MakeValueTr("Max reload time","SecondsToReloadMaxValue",SecondsToReloadMax));
SetupTableBody.appendChild(MakeHr());

SetupTableBody.appendChild(MakeCbTr("Auto breeding","AutoBreedingOnOffCb","AutoBreedingOnOff"));
var text="<input id=NextToBreedName value='"+NextToBreedName+"' readonly disabled><br><input type=hidden id=NextToBreedID value='"+NextToBreedID+"'>";
SetupTableBody.appendChild(MakeText(text));

SetupTableBody.appendChild(MakeHr());
SetupTableBody.appendChild(MakeSaveTr());


SetupTable.setAttribute("style","width:100%;background-color:#a0a0a0; border: 1px solid; border-color:black;")


SidebarAds.appendChild(SetupTable);

function WriteDebug(Text)
{
 if (Debug)
 {
  DebugTableBody.appendChild(MakeText(Text));
 }
}

if (Debug)
 {
  var DebugTable=document.createElement("table")
  DebugTable.setAttribute("id","DebugTable")
  var DebugTableBody =document.createElement("tbody")
  DebugTableBody.setAttribute("id","DebugTableBody")
  DebugTable.appendChild(DebugTableBody)
  DebugTable.setAttribute("style","width:100%;background-color:#a0a0a0; border: 1px solid; border-color:black;display:block")
  SidebarAds.appendChild(DebugTable);

  WriteDebug("Debug:");
  WriteDebug("Next page :"+Link.split(".")[0]);
}



//alert(SetupTable.innerHTML);

function APSync()
{
 if (document.getElementById("AutoPlayerOnOffCb")!=null)
  {
    GM_setValue( "AutoPlayerOnOff",document.getElementById("AutoPlayerOnOffCb").checked?"checked":"")
  }

 if (document.getElementById("AutoBreedingOnOffCb")!=null)
  {
    GM_setValue( "AutoBreedingOnOff",document.getElementById("AutoBreedingOnOffCb").checked?"checked":"")
  }
  
 var btn=document.getElementById("btnAutoPlayerSave")
 if ((btn!=null)&&(btn.value=='Saving'))
  {
    GM_setValue( "SecondsToReloadMin",document.getElementById("SecondsToReloadMinValue").value)
    GM_setValue( "SecondsToReloadMax",document.getElementById("SecondsToReloadMaxValue").value)
    GM_setValue( "NextToBreedName",document.getElementById("NextToBreedName").value)
    GM_setValue( "NextToBreedID",document.getElementById("NextToBreedID").value)
    btn.value='Saved'
  }
  APSyncTimer=window.setTimeout(APSync,1000)
}
var APSyncTimer=window.setTimeout(APSync,3000)

function Breeding(breed_action, app_id, animal_id)
{
 WriteDebug("<hr>Breeding<hr>");
 WriteDebug(breed_action);
 WriteDebug(app_id);
 WriteDebug(animal_id);
 //  return false;
 for (j=0;j<document.forms.length;j++)
  {
   if (document.forms[j].action.indexOf('breed.php')>0)
    {
     document.getElementById(app_id+'_animal_id').value=animal_id
     document.getElementById(app_id+'_breed_action').value=breed_action
     document.forms[j].submit()
    }
  }
}

function DoBreeding()
{
 var breeding=document.getElementsByClassName("breeding")
 var breedingcages=0;
 var AlreadyBreeding = Array()
 for (var i=0;i<breeding.length;i++)
  {
  
   if(breeding[i].style.display=='block')
    {

     breedingcages++;
     var animalstatus=breeding[i].lastChild;
     var statustext=animalstatus.firstChild.innerHTML;

     AlreadyBreeding[animalstatus.firstChild.id.split("_")[2]]=true
     if(statustext.indexOf('can now be moved to zoo')>1)
      {
       Breeding("move",animalstatus.firstChild.id.split("_")[0],animalstatus.firstChild.id.split("_")[2])
       return;
      }
     if(statustext.indexOf('Feed your')>1)
      {
       Breeding("feed",animalstatus.firstChild.id.split("_")[0],animalstatus.firstChild.id.split("_")[2])
       return;
      }
     if(statustext.indexOf('upgrade to move')>1)
      {
       Breeding("upgrade",animalstatus.firstChild.id.split("_")[0],animalstatus.firstChild.id.split("_")[2])
       return;
      }
    }
 }

 if (document.getElementById("animal"))

 WriteDebug("Breeding: nothing to do");

 var animals=document.getElementsByClassName("animal")
 for (var i=0;i<animals.length;i++)
  {
   SetForNextBreed=document.createElement("input")
   SetForNextBreed.setAttribute("type","button")
   SetForNextBreed.setAttribute("value","Set to breed next")

   var animalname=animals[i].children[1].innerHTML;
   var animalid=animals[i].id.split("_")[2];
   SetForNextBreed.setAttribute("onclick","javascript:document.getElementById('NextToBreedName').value='"+animalname+"';document.getElementById('NextToBreedID').value='"+animalid+"';document.getElementById('btnAutoPlayerSave').value='Saving';return false;")
   SetForNextBreed.setAttribute("style","width:100%;background-color:#a0a0a0; border: 1px solid; border-color:black;display:block")
   animals[i].appendChild(SetForNextBreed)
  }
 WriteDebug("Breeding cages ocupied:"+breedingcages+"("+MaxBreedingCages+")");
 
 if(breedingcages<MaxBreedingCages)
  {
    WriteDebug("Checking AutoBreeding" + GM_getValue('AutoBreedingOnOff',''));
    WriteDebug("AutoBreedingAnimalID" + GM_getValue('NextToBreedID',''));
     if (GM_getValue('AutoBreedingOnOff')=='checked')
      {
       if (GM_getValue('NextToBreedID')>'')
        {
         WriteDebug("Going to breed animal id="+GM_getValue('NextToBreedID'));
         if (AlreadyBreeding[GM_getValue('NextToBreedID')])
          {
           WriteDebug("Already Breeding "+GM_getValue('NextToBreedName'));
           return false;
          }
         Breeding("breed",breeding[0].lastChild.firstChild.id.split("_")[0],GM_getValue('NextToBreedID'))
        }
      }
  }
}


if (location.href.indexOf('breed.php')>0)
 {
  DoBreeding()
 }


;
