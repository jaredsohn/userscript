// ==UserScript==
// @name           Vast Universe Disable Buttons Until Confirm
// @namespace      http://userscripts.org/users/125692
// @description    Disables buttons requiring checkbox confirmation until confirmation given
// @include        http://www.humugus.com/ds.php/f/move/index/*
// @include        http://www.humugus.com/ds.php/fleet/index/*
// @include        http://www.humugus.com/ds.php/c/spaceport/index/*
// @include        http://www.humugus.com/ds.php/c/spaceport/trade/*
// @include        http://www.humugus.com/ds.php/c/spaceport/systrade/*
// @include        http://www.humugus.com/ds.php/c/spaceport/treasury/*
// @include        http://www.humugus.com/ds.php/fed/*
// @include        http://www.humugus.com/ds.php/councelor.hum
// @include        http://www.humugus.com/ds.php/c/command/index/*
// ==/UserScript==

//on ship move page and on spaceport page disables launch and send buttons until the confirmation checkbox is ticked
//probably wont work on IE due to the addEventListener
//also changes colour of the fleet lauch button text depending on orders
// kiwimage 23 mar 2010
(function() {
//here we check which page type we got so to add extra features to the fleet move page

var fleetpage=false;
var loc=""+location;
if (loc.match(/\/f\/move\/index/)){//try match for '/f/move/index' 
    fleetpage=true;
}
//and here we do the disabling of the button and add event listener to checkbox so we dont ge the error page.
var elementsTickboxs = document.getElementsByName('confirm')
var elementTickbox;
for (i=0;i<elementsTickboxs.length;i++){
    elementTickbox=elementsTickboxs[i];
    if (!elementTickbox.hasAttribute('mageconfirmflag')){//see if flag not set
    elementTickbox.setAttribute('mageconfirmflag',1);//set flag
    var targetbutton= elementTickbox.nextElementSibling;//button should be next element
                if (targetbutton.type!='submit'){//but sometimes isn't
                    targetbutton=targetbutton.nextElementSibling;//try the next element
                    if (targetbutton.type!='submit'){
                        return;//well we tried to find it but couldn't so abort it all.
                    }
                }
    targetbutton.disabled=true;//disable button
    var rchange;
    if (fleetpage){
       rchange=function(e) {//set up event listener and anon function
            e.target.nextElementSibling.disabled = !e.target.checked;
            if (e.target.checked){
                var buts=document.getElementsByName('task')    
                if (buts.length>0){
                    if (buts[0].checked){//orbiting
                        e.target.nextElementSibling.setAttribute("class","bgreen")
                    }
                    else if(buts[1].checked){//orbiting
                        e.target.nextElementSibling.setAttribute("class","bmagenta")//as bblue not blue? wtf humugus
                    }
                    else if(buts[2].checked){//orbiting
                        e.target.nextElementSibling.setAttribute("class","bred")
                    }
                }
            }
            else{
            e.target.nextElementSibling.setAttribute("class","")
            }
        }
    }
    else{//we want plain rchange for all but fleet move page
        
        rchange=function(e) {
                var targetbutton=e.target.nextElementSibling;//button should be next element
                if (targetbutton.type!='submit'){//but sometimes isn't
                    targetbutton=targetbutton.nextElementSibling;//try the next element
                    if (targetbutton.type!='submit'){
                        return;//well we tried to find it.
                    }
                }
                targetbutton.disabled = !e.target.checked;
            } 
    }
    
    elementTickbox.addEventListener("click",rchange,false);
 }
 //here we set up the event listener for the orders radio button group
    if (fleetpage){//we should try
        
        rchange = function(e) {//set up event listener and anon function
                    var elementTickbox = document.getElementById('confirm')
                    var but=elementTickbox.nextElementSibling//get target button
                    var theValue =""+e.target.value;
                    //alert(theValue)
                    if(!but.disabled && theValue=="orbit"){
                        but.setAttribute("class","bgreen")
                    }
                    else if(!but.disabled&&theValue=="scout"){
                        but.setAttribute("class","bmagenta")//as bblue not blue? wtf humugus
                    }
                    else if(!but.disabled&&theValue=="attack"){
                        but.setAttribute("class","bred")
                    }
                }
        var buts=document.getElementsByName('task')    
            if (buts.length>0){
                for(i=0;i<buts.length;i++){
                    buts[i].addEventListener("change",rchange,false);
                }   
            }
    }
}


})();
