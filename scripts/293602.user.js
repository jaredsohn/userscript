// ==UserScript==
// @name        DinoRPG Fast Discussions, Merguez + Charms Automation
// @namespace   DinoRPG
// @description Making DinoRPG faster
// @include     http://en.dinorpg.com/*
// @include     http://www.dinorpg.com/*
// @include     http://es.dinorpg.com/*
// @include     http://www.dinorpg.de/*
// @version     1.8
// @author      LazyBastard (based on sunn0's script)
// ==/UserScript==

// Create array contains function
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

/* Show answers directly */
if(document.getElementById("answers")){
    document.getElementById("answers").style.display = 'block';
}

/* Hide View Image */
var views = document.getElementsByClassName("view");
if(views.length){
    views[0].style.display = "none";
}

/* Hide notifications */
var notification = document.getElementById( "notification" );
if ( notification )
{
	document.body.removeChild( notification );
}

/* Water charm script */

var baofanaction = document.getElementById("act_dialog_wcharm");

if(baofanaction && baofanaction.id) {
   var wnode=baofanaction.cloneNode(true);
   wnode.id = "act_dialog_wcharm2";
    wnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Water charm\n		";
    var btr = wnode.children[0].children[0];
    var onclick =  btr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/wcharm/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        btr.setAttribute("onClick", "");
        btr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                btr.style.cursor = "wait";
                var tds = btr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = btr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/wcharm?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Uh... Yes, I suppose!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Wow, that is impressive!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=wah;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Ok!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=yes;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Did you mean spiritual?";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=spirit;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                label.innerHTML = "Have to go!";
                res = performAction(dinoId, 'act/dialog/wcharm?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/wcharm');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        btr.children[0].children[0].setAttribute("src","/img/icons/elem_2.gif");
    }
   baofanaction.parentNode.appendChild(wnode); 

   var focusaction = document.getElementById("act_dialog_bob");
   var cnode=focusaction.cloneNode(true);
   cnode.id = "act_dialog_bob2";
   cnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Focus!\n		";
   var ctr = cnode.children[0].children[0];
   var onclick =  ctr.getAttribute("onClick");
   var re = /\/(\d+)\/act\/dialog\/bob/.exec(onclick);
   if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ctr.setAttribute("onClick", "");
        ctr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                ctr.style.cursor = "wait";
                var tds = ctr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = ctr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/bob?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "I've got a question for you";
                res = performAction(dinoId, 'act/dialog/bob?goto=question;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "What about my question?";
                res = performAction(dinoId, 'act/dialog/bob?goto=quest3;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Where?";
                res = performAction(dinoId, 'act/dialog/bob?goto=where;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "What do I need to do?";
                res = performAction(dinoId, 'act/dialog/bob?goto=how;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "I want my dinoz to focus!";
                res = performAction(dinoId, 'act/dialog/bob?goto=concen;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Ok";
                res = performAction(dinoId, 'act/dialog/bob?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/bob');
                label.innerHTML = "Focusing";
                //res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId;
            }, 
            false
        );
        ctr.children[0].children[0].setAttribute("src","/img/icons/act_default.gif");
    }
    focusaction.parentNode.appendChild(cnode); 

}

/* Fire charm script */
// Won't give you charm unless you unlocked it at the Venerable
var shamanaction = document.getElementById("act_dialog_shaman");

if(shamanaction && shamanaction.id) {
   var fnode=shamanaction.cloneNode(true);
   fnode.id = "act_dialog_shaman2";
    fnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Fire charm\n		";
    var htr = fnode.children[0].children[0];
    var onclick =  htr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/shaman/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        htr.setAttribute("onClick", "");
        htr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                htr.style.cursor = "wait";
                var tds = htr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = htr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/shaman?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Someone told me...";
                res = performAction(dinoId, 'act/dialog/shaman?goto=charm;sk=' + userId, 'dino/' + dinoId + '/act/dialog/shaman');
                label.innerHTML = "Accept the charm";
                res = performAction(dinoId, 'act/dialog/shaman?goto=boost;sk=' + userId, 'dino/' + dinoId + '/act/dialog/shaman');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        htr.children[0].children[0].setAttribute("src","/img/icons/elem_0.gif");
    }
   shamanaction.parentNode.appendChild(fnode); 
}

/* Shovel automation */
var mineaction = document.getElementById("act_dialog_mine");

if(mineaction && mineaction.id) {
   var mnode=mineaction.cloneNode(true);
   mnode.id = "act_dialog_mine2";
    mnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Get/Repair Shovel\n		";
    var itr = mnode.children[0].children[0];
    var onclick =  itr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/mine/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        itr.setAttribute("onClick", "");
        itr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                itr.style.cursor = "wait";
                var tds = itr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = itr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/mine?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Yes";
                res = performAction(dinoId, 'act/dialog/mine?goto=repair;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                res = performAction(dinoId, 'act/dialog/mine?goto=yes;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                label.innerHTML = "Thanks";
                res = performAction(dinoId, 'act/dialog/mine?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mine');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=map';
            }, 
            false
        );
        itr.children[0].children[0].setAttribute("src","/img/icons/act_dig.gif");
    }
   mineaction.parentNode.appendChild(mnode); 
}


/* Merguez automation */

var merguezaction = document.getElementById("act_dialog_merguez");

if(merguezaction && merguezaction.id) {
    var gnode=merguezaction.cloneNode(true);
    gnode.id = "act_dialog_merguez2";
    gnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Get Merquez\n		";
    //var trs = merguezaction.getElementsByTagName("tr");
    var mtr = gnode.children[0].children[0];
    var onclick =  mtr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/merguez/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        mtr.setAttribute("onClick", "");
        mtr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                mtr.style.cursor = "wait";
                var tds = mtr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = mtr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!";
                var res = performAction(dinoId, 'act/dialog/merguez', 'dino/' + dinoId);
                label.innerHTML = "Ah!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=ah;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                label.innerHTML = "Ok!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=ok;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                label.innerHTML = "Thanks!";
                res = performAction(dinoId, 'act/dialog/merguez?goto=thanks;sk=' + userId, 'dino/' + dinoId + '/act/dialog/merguez');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=inv';
            }, 
            false
        );
        mtr.children[0].children[0].setAttribute("src","/img/icons/obj_mergz.gif");
    }
   merguezaction.parentNode.appendChild(gnode); 
}
    
/* Double skill script */
// Won't give you double skill unless you've actually unlocked it

var madamxaction = document.getElementById("act_dialog_mmex");
if(madamxaction && madamxaction.id) {
   var xnode=madamxaction.cloneNode(true);
   xnode.id = "act_dialog_mmex2";
    xnode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Double skill\n		";
    var xtr = xnode.children[0].children[0];
    var onclick =  xtr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/mmex/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        xtr.setAttribute("onClick", "");
        xtr.addEventListener("click", function(){
                if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
                }
                xtr.style.cursor = "wait";
                var tds = xtr.getElementsByTagName("td");
                for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
                }
                var label = xtr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!"; 
                var res = performAction(dinoId, 'act/dialog/mmex?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Talk to her";
                res = performAction(dinoId, 'act/dialog/mmex?goto=talk;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "...";
                res = performAction(dinoId, 'act/dialog/mmex?goto=talk2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "But who are you?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=question;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "So who are you?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=question2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Oh?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Yes!";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "!!!";
                res = performAction(dinoId, 'act/dialog/mmex?goto=double3;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "How do I learn it?";
                res = performAction(dinoId, 'act/dialog/mmex?goto=learn;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                label.innerHTML = "Huh???";
                res = performAction(dinoId, 'act/dialog/mmex?goto=learn1;sk=' + userId, 'dino/' + dinoId + '/act/dialog/mmex');
                res = performAction(dinoId, 'dialogCancel', 'dino/' + dinoId + '/');
                document.location = '/dino/' + dinoId + '/setTab?t=details';
            }, 
            false
        );
        xtr.children[0].children[0].setAttribute("src","/img/icons/elem_5.gif");
    }
   madamxaction.parentNode.appendChild(xnode); 
}

/* To Nimbao script */
// Will get you to Nimboa from Klutz's workshop without fail

var klutzaction = document.getElementById("act_dialog_broc__2");
if(klutzaction && klutzaction.id) {
   var knode=klutzaction.cloneNode(true);
   knode.id = "act_dialog_broc__3";
    knode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Go to Nimbao!\n		";
    var ktr = knode.children[0].children[0];
    var onclick =  ktr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/broc__2/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ktr.setAttribute("onClick", "");
        ktr.addEventListener("click", function(){
               if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
               }
               ktr.style.cursor = "wait";
               var tds = ktr.getElementsByTagName("td");
               for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
               }
               var label = ktr.getElementsByClassName("label")[0];
               label.innerHTML = "Clicked!" ; 
             var res = performAction(dinoId, 'act/dialog/broc__2?sk=' + userId, 'dino/' + dinoId);
               label.innerHTML = "Could you take us to Nimbao?";
               res = performAction(dinoId, 'act/dialog/broc__2?goto=voyage2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/broc__2');
               label.innerHTML = "Nimbao here we come!";
//               res = performAction(dinoId, 'act/dialog/broc__2?goto=depart_5;sk=' + userId, 'dino/' + dinoId + '/act/dialog/broc__2');
            
               //document.location = '/dino/' + dinoId + '/setTab?t=map';
               document.location = '/dino/' + dinoId + '/act/dialog/broc__2?goto=depart_5;sk=' + userId;
            }, 
            false
        );
        ktr.children[0].children[0].setAttribute("src","/img/icons/elem_4.gif");
    }
   klutzaction.parentNode.appendChild(knode); 
}

/* To Skully missionslist */
// Will open Skully's missionlist without you misclicking 3 times...

var skullyaction = document.getElementById("act_dialog_skull");
if(skullyaction && skullyaction.id) {
   var ynode=skullyaction.cloneNode(true);
   ynode.id = "act_dialog_skull2";
    ynode.children[0].children[0].children[1].childNodes[0].nodeValue = "\n			Missions list\n		";
    var ytr = ynode.children[0].children[0];
    var onclick =  ytr.getAttribute("onClick");
    var re = /\/(\d+)\/act\/dialog\/skull/.exec(onclick);
    if(re){
        dinoId = re[1];
        userId = onclick.substr(-7,5);
        ytr.setAttribute("onClick", "");
        ytr.addEventListener("click", function(){
               if(document.getElementById("tooltip")){
                    document.getElementById("tooltip").style.display = "none";
               }
               ytr.style.cursor = "wait";
               var tds = ytr.getElementsByTagName("td");
               for(var k = 0; k < tds.length; k++){
                    var td = tds[k];
                    td.style.cursor = "wait";
                    td.style.color = "#ffffff";
                    td.style.backgroundColor = "transparent";
               }
                var label = ytr.getElementsByClassName("label")[0];
                label.innerHTML = "Clicked!" ; 
                var res = performAction(dinoId, 'act/dialog/skull?sk=' + userId, 'dino/' + dinoId);
                label.innerHTML = "Argh! Ah ghost!";
                res = performAction(dinoId, 'act/dialog/skull?goto=arg;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "You!";
                res = performAction(dinoId, 'act/dialog/skull?goto=arg2;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "What's the difference?";
                res = performAction(dinoId, 'act/dialog/skull?goto=diff;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Almost free?";
                res = performAction(dinoId, 'act/dialog/skull?goto=free;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "So you do haunt this place?";
                res = performAction(dinoId, 'act/dialog/skull?goto=haunt;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Like what?";
                res = performAction(dinoId, 'act/dialog/skull?goto=do;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Mmmm...";
                res = performAction(dinoId, 'act/dialog/skull?goto=uhm;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "A curse?";
                res = performAction(dinoId, 'act/dialog/skull?goto=bonne;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "It's not very helpfull is it?";
                res = performAction(dinoId, 'act/dialog/skull?goto=next;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Maybe I can help you.";
                res = performAction(dinoId, 'act/dialog/skull?goto=help;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "Yes! definitely!";
                res = performAction(dinoId, 'act/dialog/skull?goto=accept;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                label.innerHTML = "What should I do now?";
                res = performAction(dinoId, 'act/dialog/skull?goto=missions;sk=' + userId, 'dino/' + dinoId + '/act/dialog/skull');
                document.location = '/dino/' + dinoId + '/act/mission/list?sk=' + userId;
            }, 
            false
        );
    }
   skullyaction.parentNode.appendChild(ynode); 
}


/* Check if double skill is needed */

var skillstable = document.getElementById("dinozDetails");

if(skillstable && skillstable.id) {
    var trs = skillstable.children[0].getElementsByTagName("tr");
    var skill = '';
    var skillsarray = [];
    var getDouble = 0;

    for(var j = 0; j < trs.length; j++){
        var tr = trs[j];
        if (tr.children[1].className == 'type') {
            skill = tr.children[0].childNodes[1].childNodes[2].nodeValue.replace(/\s/g,'');
            skillsarray.push(skill);

        }
    }
 
    if(skillsarray.indexOf("Double-Skill") == -1) {
        if(skillsarray.indexOf("Marsh") != -1 && skillsarray.indexOf("Lightning") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("AbsoluteZero") != -1 && skillsarray.indexOf("Combustion") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Elasticity") != -1 && skillsarray.indexOf("Adrenaline") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("EjectorPalms") != -1 && skillsarray.indexOf("WildInstinct") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("PrimalState") != -1 && skillsarray.indexOf("GaïaPath") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Cocoon") != -1 && skillsarray.indexOf("Waïkikidô") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("KaosPath") != -1 && skillsarray.indexOf("Kamikaze") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Sapper") != -1 && skillsarray.indexOf("VaporousForm") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("Vengeance") != -1 && skillsarray.indexOf("Achilles'Heel") != -1) {
            getDouble = 1;
        }
        if(skillsarray.indexOf("AqueousClone") != -1 && skillsarray.indexOf("MagicResistance") != -1) {
            getDouble = 1;
        }
        if (getDouble == 1){
            var node=trs[trs.length-1].cloneNode(true);
            node.children[0].childNodes[1].childNodes[2].nodeValue = " !!! Get Double Skill !!!";
            node.children[2].childNodes[1].children[0].attributes[0].nodeValue='';
            node.children[2].childNodes[1].attributes[0].nodeValue = '';
            node.children[2].childNodes[1].attributes[1].nodeValue = '';
            //node.setAttribute("class","off");
            trs[1].parentNode.insertBefore(node,trs[1]);
            //node.setAttribute("class","off");
            //trs[1].parentNode.appendChild(node);
        }
    }
    
    /* Check for Invocator */
    if(skillsarray.indexOf("Invocator") == -1) {
        var avatarobj = document.getElementsByClassName("avatar");
        var avatarMO = "" + avatarobj[0].onmouseover;
        var dinozRace = avatarMO.substring(avatarMO.indexOf("<h1>")+4,avatarMO.indexOf("</h1>"));
        //alert(dinozRace);
        var getInovator = 0;
        var getAt = '';
        switch(dinozRace)
        {
            case 'Moueffe':
                if(skillsarray.indexOf("LavaFlow") != -1 && skillsarray.indexOf("DiamondFangs") != -1) {
                    getInovator = 1;
                    getAt = "Venerable's Lair (Lavapit) - Venerable";
                }
                break;
            case 'Softpig':
                if(skillsarray.indexOf("Fireball") != -1 && skillsarray.indexOf("FaroeHeritage") != -1) {
                    getInovator = 1;
                    getAt = 'Lavapit (Lavapit) - Soft Shaman';
                }
                break;
            case 'Winks':
                if(skillsarray.indexOf("MasterFisherman") != -1 && skillsarray.indexOf("Adrenaline") != -1) {
                    getInovator = 1;
                    getAt = 'Mutant Falls (Atlantean Islands) - Atlantean Huard';
                }
                break;
            case 'Glidwings':
                if(skillsarray.indexOf("Lightning") != -1 && skillsarray.indexOf("Elasticity") != -1) {
                    getInovator = 1;
                    getAt = 'Lavapit (Lavapit) - Elemental Master';
                }
                break;
            case 'Castivorous':
                if(skillsarray.indexOf("WildInstinct") != -1 && skillsarray.indexOf("VivaciousWind") != -1) {
                    getInovator = 1;
                    getAt = 'Market Place (Dinoland) - Isabella';
                }
                break;
            case 'Rocky':
                if(skillsarray.indexOf("ElementalFission") != -1 && skillsarray.indexOf("IncandescentAura") != -1) {
                    getInovator = 1;
                    getAt = "King's Citadel (Magnetic Steppes) - Rocky King";
                }
                break;
            case 'Pteroz':
                if(skillsarray.indexOf("BurningBreath") != -1 && skillsarray.indexOf("FetidBreath") != -1) {
                    getInovator = 1;
                    getAt = "University (Dinoland) - Professor Eugene";
                }
                break;
            case 'Cloudoz':
                if(skillsarray.indexOf(" LightningDance") != -1 && skillsarray.indexOf("VacuumDisk") != -1) {
                    getInovator = 1;
                    getAt = "Bruteforce (Dinoland) - Madam X";
                }
                break;
            case 'Sirain':
                if(skillsarray.indexOf("WithoutMercy") != -1 && skillsarray.indexOf("Vengeance") != -1) {
                    getInovator = 1;
                    getAt = "Dinotown Clinic (Dinoplaza) - Anna Tomie";
                }
                break;
            case 'Hippoclamp':
                if(skillsarray.indexOf("MartialArts") != -1 && skillsarray.indexOf("Concentration") != -1 && skillsarray.indexOf("Awakening") != -1) {
                    getInovator = 1;
                    getAt = "Mutant Falls (Atlantean Islands) - Master Hydragol";
                }
                break;
            case 'Gorilloz':
                if(skillsarray.indexOf("PrimalState") != -1 && skillsarray.indexOf("BurningHeart") != -1) {
                    getInovator = 1;
                    getAt = "Dinotown (Dinoland) - Michael The Guide";
                }
                break;
            case 'Wanwan':
                if(skillsarray.indexOf("Gathering") != -1 && skillsarray.indexOf("ForestKeeper") != -1) {
                    getInovator = 1;
                    getAt = "Blacksylva Door (Grumhel Forest) - Forest Warden";
                }
                break;
            case 'Santaz':
                if(skillsarray.indexOf("Tenacity") != -1 && skillsarray.indexOf("FetidBreath") != -1 && skillsarray.indexOf("TrickyHits") != -1) {
                    getInovator = 1;
                    getAt = "Klutz' Workshop (Atlantean Islands) - Klutz";
                }
                break;
            case 'Feroz':
                if((skillsarray.indexOf("BlowtorchPalm") != -1 || skillsarray.indexOf("Vigilance") != -1) && skillsarray.indexOf("FatalHit") != -1) {
                    getInovator = 1;
                    getAt = "Mr Bao Bob's House (Atlantean Islands) - Mr Bao Bob";
                }
                break;
            case 'Kabuki':
                if(skillsarray.indexOf("Awakening") != -1 && skillsarray.indexOf("Combustion") != -1) {
                    getInovator = 1;
                    getAt = "Totem Island (Atlantean Islands) - Yakuzi";
                }
                break;
            case 'Mahamuti':
                if(skillsarray.indexOf("Tornado") != -1 && skillsarray.indexOf("AcidBlood") != -1) {
                    getInovator = 1;
                    getAt = "Grandpa Joe's House (Dinoland) - Grandpa Joe";
                }
                break;
            case 'Tofufu':
                if(skillsarray.indexOf("Charisma") != -1 && skillsarray.indexOf("LightningDance") != -1) {
                    getInovator = 1;
                    getAt = "Bruteforce (Dinoland) - Master Zenith";
                }
                break;
            case 'Etherwasp':
                if(skillsarray.indexOf("PrecociousSpring") != -1 && skillsarray.indexOf("VivaciousWind") != -1) {
                    getInovator = 1;
                    getAt = "Observatory (Nimbao) - Sage Menthos";
                }
                break;
            case 'Smog':
                getInovator = 1;
                getAt = 'Island Head (Nimbao) - Old Robot';
                break;   
        }
        if (getInovator == 1){
            var node=trs[trs.length-1].cloneNode(true);
            node.children[0].childNodes[1].childNodes[1].attributes[1].nodeValue = '/img/icons/elem_5.gif';
            node.children[0].childNodes[1].childNodes[2].nodeValue = " !!! Get Invocator Skill !!!";
            node.children[0].childNodes[1].attributes[1].nodeValue = "mt.js.Tip.show(this,'<div class=\\'header\\'><div class=\\'footer\\'><h1>Invocator</h1> <div class=\\'content\\'>Get Invocator at:<div>\\n<strong>" + getAt + "</strong></div>\\n</div></div></div>',null)";
            node.children[1].childNodes[1].childNodes[0].nodeValue = 'S';
            node.children[1].childNodes[1].attributes[1].nodeValue = "mt.js.Tip.show(this,'<div class=\\'header\\'><div class=\\'footer\\'><h1>Special</h1> <div class=\\'content\\'>This skill has a <strong>particular effect</strong></div></div></div>',null)";
            node.children[2].childNodes[1].children[0].attributes[0].nodeValue='';
            node.children[2].childNodes[1].attributes[0].nodeValue = '';
            node.children[2].childNodes[1].attributes[1].nodeValue = '';
            
            
            //node.setAttribute("class","off");
            trs[1].parentNode.insertBefore(node,trs[1]);
        }
    }
}

/* Tournament opponent info  */

var tournamentheader = document.getElementById("swf_title_BrutForce Tournament");

if(tournamentheader && tournamentheader.id) {
    var tourframe = tournamentheader.parentNode.parentNode;
    var divClear = document.createElement("div");
    divClear.className = 'clear';
    divClear.style.height = '10px';
    var divskills = document.createElement("div");
    divskills.className = 'right';
    
    divskills.appendChild(tourframe.childNodes[5].childNodes[3].childNodes[5].cloneNode(true));
    var dinolevel = divskills.childNodes[0].childNodes[3].innerHTML.slice(-2);
    divskills.childNodes[0].removeChild(divskills.childNodes[0].childNodes[3]);
    
    var skillslist = document.createElement("div");
    skillslist.className = 'help';
    skillslist.innerHTML = '<b>Details:</b> <br/><img src="http://en.dinorpg.com/img/forum/smiley/small_life_en.gif">' 
    
    switch(dinolevel)
        {
            case ' 6':
                 skillslist.innerHTML += ' 120<br/>Focus<br/>'
            break;
            case ' 7':
                 skillslist.innerHTML += ' 100<br/>Mistral<br/>'
            break;
            case ' 8':
                 skillslist.innerHTML += ' 100<br/>Focus<br/>'
            break;
            case ' 9':
                 skillslist.innerHTML += ' 130<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '10':
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '11':
                 skillslist.innerHTML += ' 120<br/>Focus<br/>Korgon Reinforcements<br/>Perception<br/>Wrath<br/>'
            break;
            case '12':
                 skillslist.innerHTML += ' 130<br/>Cold Shower<br/>Focus<br/>Perception<br/>Tricky Hits<br/>Water Cannon<br/>'
            break;
            case '13':
                 skillslist.innerHTML += ' 130<br/>Focus<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '14':
                 skillslist.innerHTML += ' 130<br/>Focus<br/>Mistral<br/>Perception<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '15':
                 skillslist.innerHTML += ' 120<br/>Mistral<br/>Korgon Reinforcement<br/>Water Cannon<br/>'
            break;
            case '16':
                 skillslist.innerHTML += ' 150<br/>Mistral<br/>Korgon Reinforcement<br/>Water Cannon<br/>'
            break;    
            case '17':
                 skillslist.innerHTML += ' 120<br/>Burning Breath<br/>Focus<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '18':
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Fire Ball<br/>Lava Flow<br/>Waïkikidô<br/>Water Cannon<br/>'
            break;
            case '19':
                 skillslist.innerHTML += ' 120<br/>Korgon Reinforcement<br/>Magic Resistance<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '20':
                 skillslist.innerHTML += ' 120<br/>Korgon Reinforcement<br/>Mistral<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '21':
                 skillslist.innerHTML += ' 130<br/>Double Hit<br/>Focus<br/>Wrath<br/>'
            break;
            case '22':
                 skillslist.innerHTML += ' 130<br/>Flight<br/>Focus<br/>Mistral<br/>Water Cannon<br/>'
            break;
            case '23':
                 skillslist.innerHTML += ' 100<br/>Blowtorch Palm<br/>Burning Breath<br/>Mistral<br/>Vengeance<br/>Wrath<br/>'
            break;
            case '24':
                 skillslist.innerHTML += ' 150<br/>Focus<br/>Korgon Reinforcement<br/>Primal State<br/>Vines<br/>Wrath<br/>'
            break;
            case '25':
                 skillslist.innerHTML += ' 130<br/>Focus<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '26':
                 skillslist.innerHTML += ' 130<br/>Burning Breath<br/>Fire Ball<br/>Focus<br/>Nap<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '27':
                 skillslist.innerHTML += ' 130<br/>Cold Shower<br/>Focus<br/>Gel<br/>Mistral<br/>Tricky Hits<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '28':
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Dodge<br/>Flight<br/>Focus<br/>Mistral<br/>Water Cannon<br/>'
            break;
            case '29':
                 skillslist.innerHTML += ' 150<br/>Focus<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '30':
                 skillslist.innerHTML += ' 120<br/>Focus<br/>Mistral<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '31':
                 skillslist.innerHTML += ' 180<br/>Fire Ball<br/>Lava Flow<br/>Mistral<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '32':
                 skillslist.innerHTML += ' 150<br/>Fire Ball<br/>Mistral<br/>Vengeance<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '33':
                 skillslist.innerHTML += ' 150<br/>Dodge<br/>Cold Shower<br/>Flight<br/>Focus<br/>Gel<br/>Mistral<br/>Tricky Hits<br/>Water Cannon<br/>'
            break;
            case '34':
                 skillslist.innerHTML += ' 150<br/>Burning Breath<br/>Cold Shower<br/>Double Hit<br/>Focus<br/>Gel<br/>Jump<br/>Mistral<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '35':
                 skillslist.innerHTML += ' 150<br/>Dodge<br/>Focus<br/>Korgon Reinfocement<br/>Magic Resistance<br/>Mistral<br/>Primal State<br/>Vines<br/>Water Cannon<br/>'
            break;
            case '36':
                 skillslist.innerHTML += ' 140<br/>Blowtorch Palm<br/>Dodge<br/>Flight<br/>Focus<br/>Jump<br/>Korgon Reinforcement<br/>Mistral<br/>Water Cannon<br/>'
            break;
            case '37':
                 skillslist.innerHTML += ' 140<br/>Double Hit<br/>Flight<br/>Focus<br/>Hermetic Aura<br/>Mistral<br/>Saving Puree<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '38':
                 skillslist.innerHTML += ' 130<br/>Cold Shower<br/>Double Hit<br/>Focus<br/>Gel<br/>Mistral<br/>Tricky Hits<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '39':
                  skillslist.innerHTML += ' 200<br/>Blowtorch Palm<br/>Focus<br/>Korgon Reinforcement<br/>Lava Flow</br>Mistral<br/>Vengeance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>';
            break;
            case '40':
                  skillslist.innerHTML += ' ???<br/>Dodge<br/>Gorriloz Spirit<br/>Korgon Reinforcement<br/>Magic Resistance<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '41':
                  skillslist.innerHTML += ' ???<br/>Blowtorch Palm<br/>Cold Shower<br/>Fire Ball<br/>Lava Flow<br/>Torch<br/>'
            break;
            case '42':
                  skillslist.innerHTML += ' ???<br/>Self Control<br/>'
            break;
            case '43':
                  skillslist.innerHTML += ' ???<br/>Focus<br/>Gorilloz Spirit<br/>Korgon Reinforcement<br/>Magic Resistance<br/>Mistral<br/>Primal State<br/>Vines<br/>Water Cannon<br/>Wrath<br/>'
            break;
            case '44':
                  skillslist.innerHTML += ' ???<br/>Dodge<br/>Flight<br/>Focus<br/>Hermetic Aura<br/>Lightning<br/>'
            break;
            case '45':
                  skillslist.innerHTML += ' ???<br/>Cold Shower<br/>Dodge<br/>Double Hit<br/>Flight<br/>Focus<br/>Mistral<br/>Tornado<br/>Tricky Hits<br/>Water Cannon<br/>Wrath<br/>'
            break;
            
        }
    
    divskills.appendChild(skillslist);
    
    tourframe.childNodes[5].appendChild(divClear);
    tourframe.childNodes[5].appendChild(divskills);
    
}


function performAction(dinoId, action, referer){
    var xmlhttp;
    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open('GET','http://' + location.host + '/dino/' + dinoId + '/' + action, false);
    xmlhttp.setRequestHeader('User-agent',window.navigator.userAgent);
    xmlhttp.setRequestHeader('Accept','text/html,application/xhtml+xml,application/xml;');
    xmlhttp.setRequestHeader('Referer','http://' + location.host + '/' + referer);
    xmlhttp.setRequestHeader('Cookie',document.cookie);
    xmlhttp.send();
    return xmlhttp.responseText;
}
