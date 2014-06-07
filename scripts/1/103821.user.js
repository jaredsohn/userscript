// ==UserScript==
// @name           Nexus Clash Add Drop Item Safety Check Box.
// @namespace      http://userscripts.org/users/125692
// @description    Make it a tad harder to drop things.
// @include        http://nexusclash.com/modules.php?name=Game*
// @include        http://www.nexusclash.com/modules.php?name=Game*
// @exclude        http://nexusclash.com/modules.php?name=Game&op=disconnect
// @exclude        http://www.nexusclash.com/modules.php?name=Game&op=disconnect
// @grant none
// @version     1.1.0
// ==/UserScript==
//for nexus clash. this script adds a checkbox for each drop button and disables the button until the checkbox is checked.
(function() {

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('td.MageNoWrap { white-space: nowrap ! important; }');
addGlobalStyle('a.MageHide { display: none ! important; }');

var newbox;
var acell;
var loc=location+'';//lol cludgy

//1 - drop buttons
//if (loc.match(/buyskills/)){
//do the item drop first by assuming we are on the right page and just looking for things with the item_drop class
    var elementsDropButtons = document.getElementsByClassName('item_drop');
    var elementDropButton;
    for (i=0;i<elementsDropButtons.length;i++){
        elementDropButton=elementsDropButtons[i];
        if (!elementDropButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementDropButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    targetbutton.style.visibility='visible';
                }
                else{
                    //targetbutton.style.display='None';
                    targetbutton.style.visibility='hidden';
                
                }
            }
            newbox.addEventListener("click",rchange,false);
            acell=elementDropButton.parentNode
            acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            acell.align='left';
            acell.insertBefore(newbox,elementDropButton);
            //elementDropButton.style.display='None';
            elementDropButton.style.visibility='hidden';
            
            
        }
    }
//2 - learn spell gem buttons 
//now we do the spellgem learn buttons
    elementsDropButtons = document.getElementsByClassName('item_use');
   // elementDropButton;
    for (i=0;i<elementsDropButtons.length;i++){
        elementDropButton=elementsDropButtons[i];
        if (!elementDropButton.innerHTML.match(/Learn/)){
        continue;
        }
        if (!elementDropButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementDropButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    targetbutton.style.visibility='visible';
                }
                else{
                    //targetbutton.style.display='None';
                    targetbutton.style.visibility='hidden';
                
                }
            }
            newbox.addEventListener("click",rchange,false);
            acell=elementDropButton.parentNode
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            acell.align='center';
            acell.insertBefore(newbox,elementDropButton);
            //elementDropButton.style.display='None';
            elementDropButton.style.visibility='hidden';
            
            
        }
    }

//3- craft button
//and now we do craft button
    //elementsDropButtons = document.getElementsByClassName('item_use');
    var elementsCraftButtons = document.getElementsByTagName('input')//get all input   
    var elementCraftButton;
    for (i=0;i<elementsCraftButtons.length;i++){
        elementCraftButton=elementsCraftButtons[i];
        if (elementCraftButton.type!="submit"||elementCraftButton.value!="Craft"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementCraftButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementCraftButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    //targetbutton.style.visibility='visible';
                    targetbutton.disabled=false;    
                }
                else{
                    //targetbutton.style.display='None';
                    //targetbutton.style.visibility='hidden';
                    targetbutton.disabled=true;
                }
            }
            newbox.addEventListener("click",rchange,false);
            acell=elementCraftButton.parentNode
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            //acell.align='center';
            acell.insertBefore(newbox,elementCraftButton);
            //elementCraftButton.style.display='None';
            //elementCraftButton.style.visibility='hidden';
            elementCraftButton.disabled=true;
            
            
        }
    }
//}

//4-learn skill buttons 
//if on buy skills page;
//var loc=location+'';//lol cludgy
//well in any event check if we are on the buyskills page and add saftey boxs to skill buttons
//if this works the above code really should have been avoided by having some kind of test i suppose.
if (loc.match(/buyskills/)){
    var elementsSkillButtons = document.getElementsByTagName('input')//get all input   
    var elementSkillButton;
    for (i=0;i<elementsSkillButtons.length;i++){
        elementSkillButton=elementsSkillButtons[i];
        if (elementSkillButton.type!="submit"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementSkillButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementSkillButton.setAttribute('mageconfirmflag',1);//set flag
            newbox=document.createElement('input');
            newbox.type='checkbox';
            newbox.checked=false;
            var rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if(e.target.checked){
                    //targetbutton.style.display='';
                    //targetbutton.style.visibility='visible';
                    targetbutton.disabled=false;
                }
                else{
                    //targetbutton.style.display='None';
                    //targetbutton.style.visibility='hidden';
                    targetbutton.disabled=true;
                }
            }
            newbox.addEventListener("click",rchange,false);
            acell=elementSkillButton.parentNode
            //acell.className='MageNoWrap';//set class for nowrap so doesn't fubar page
            //acell.align='left';
            acell.insertBefore(newbox,elementSkillButton);
            //elementDropButton.style.display='None';
            //elementDropButton.style.visibility='hidden';
            elementSkillButton.disabled=true;
        }
    }
}
//5-leave faction button
//or perhaps we are viewing the faction page
else if (loc.match(/faction&do=view/)){//viewing faction page
var elementsSkillButtons = document.getElementsByTagName('input')//get all input   
    var elementSkillButton;
    for (i=0;i<elementsSkillButtons.length;i++){
        elementSkillButton=elementsSkillButtons[i];
        if (elementSkillButton.type!="submit"){//but sometimes isn't
            continue;//well we tried to find it but couldn't so abort it all.
        }
        if (!elementSkillButton.hasAttribute('mageconfirmflag')){//see if flag not set
            elementSkillButton.setAttribute('mageconfirmflag',1);//set flag
            if (elementSkillButton.value=="Leave Faction"){//just do the one button here. very ineffiecent code i think
                newbox=document.createElement('input');
                newbox.type='checkbox';
                newbox.checked=false;
                var rchange=function(e) {
                    var targetbutton=e.target.nextElementSibling;//button should be next element
                    if(e.target.checked){
                        targetbutton.disabled=false;
                    }
                    else{
                        targetbutton.disabled=true;
                    }
                }
                newbox.addEventListener("click",rchange,false);
                acell=elementSkillButton.parentNode
                acell.insertBefore(newbox,elementSkillButton);
                elementSkillButton.disabled=true;
            }
        }
    }
}
//6- revoke faction button
//do the revoke faction button 
var factionbuttons= document.evaluate("//form[@name='stronghold']", document, null,
	    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

if (factionbuttons.snapshotLength>0){//if we have a faction box
    var factionbutton=factionbuttons.snapshotItem(0).firstElementChild.nextElementSibling;
    if (factionbutton.type=="submit"){//but sometimes isn't
        if (!factionbutton.hasAttribute('mageconfirmflag')){//see if flag not set
            factionbutton.setAttribute('mageconfirmflag',1);//set flag
            if (factionbutton.value.slice(0,17)=="Revoke Stronghold"){//just do the one button here.
                //alert("doing it") 
                var anewbox=document.createElement('input');
                anewbox.type='checkbox';
                anewbox.checked=false;
                var rchange=function(e) {
                    var targetbutton=e.target.nextElementSibling;//button should be next element
                    if(e.target.checked){
                        targetbutton.disabled=false;
                    }
                    else{
                        targetbutton.disabled=true;
                    }
                }
                anewbox.addEventListener("click",rchange,false);
                acell=factionbutton.parentNode
                acell.insertBefore(anewbox,factionbutton);
                factionbutton.disabled=true;
            }
        }
    }
}



//EOF
})();



//style="white-space: nowrap"
/*
var elementsDropButtons = document.getElementsByClassName('item_drop');
var elementDropButton=elementsDropButtons[1];
var acell=elementDropButton.parentNode;



*/