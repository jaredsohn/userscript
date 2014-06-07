// ==UserScript==
// @name          ICHC Mass Whateverer
// @description	  Run mass commands at your discretion
// @credits       Original by lithium, modifications by nk
// @include       http://icanhazchat.com/*
// @include       http://www.icanhazchat.com/*
// @version       1.5
// ==/UserScript==


LoadKicker();

var msgModfail = "/me fapped just before and fails to get it up. ";
var msgIntro = "/me unzips..";
var msgStartAnnounce = "/me hasn't fapped for NUM days! NAME uses Super Fap!";
var msgKickSelfFail = "/me has just attempted to jizz on himself. NAME fails at life. (but wins most fapping games)";
var msgFinish = "/me runs out of jizz, time for a nap...";
var msgNoTargets = "/me can't find anyone to jizz on, in the bucket it goes..";
var msgActive = false;

var button;
var arrpos = 0;
var timer;
var array = [];
var myname = "";
var amimod = false;
var amount = 0;
var whitelist = new Array();
var white = "lithium";
var larray = 0;


/// HAX
function pausecomp(millis) {
var date = new Date();
var curDate = null;

do { curDate = new Date(); }
while(curDate-date < millis);
}

function LoadKicker() {
    button = document.createElement('span');
    button.setAttribute('style', 'cursor:pointer;margin-left:10px;text-decoration:underline;font-weight:bold;color:black');
    button.innerHTML = "Run The Whateverer";
    document.getElementById("lblDynamicFootLink").appendChild(button);
    button.addEventListener("click", RunKicker,true);
    myname = document.getElementById('hdnUserName').value;

}

function RunKicker() {
    kickorban = prompt('Enter command to run:', '/kick *');
    amount = prompt('How many people?', '25');
    oncam = prompt('Who is on cam or immune from this?', "a,b,c");
    immune = oncam.split(",");
    for (var i=0;i<immune.length;i++) whitelist.push(immune[i]);

    findMods();
    clearInterval(timer);
    document.getElementById("txtMsg").value = "ping";
    document.getElementById("btn").click();
    pausecomp(1000);

    doMsg(msgIntro);

    refresh();
    setTimeout(RunKick2,2000);
}

function RunKick2() {
        array = document.getElementById("activeUserList").getElementsByTagName('a');
        amimod = count(myname) == 2;

    if (amount == "idle") {
        array = collectionToArray(document.getElementById("activeUserList").getElementsByTagName('strike'));
    } else {
        array = collectionToArray(document.getElementById("activeUserList").getElementsByTagName('a'));
        array.splice(0, 1);
    }

    myname = document.getElementById('hdnUserName').value;
    larray = array.length;

    if ((amount != "all") && (amount != "idle")) {
        while (array.length > amount) {
            removed = array.splice((Math.round((Math.random() * (larray - 1)) + 1)), 1);
        }
    }

    larray = array.length;

    if (amimod == false) {
        doMsg(msgModfail, array.length);
    }

    else {
        if (array.length > 0) {
            doMsg(msgStartAnnounce,array.length);
            timer = setInterval(KickNext, 1200);
        }
        else {
            doMsg(msgNoTargets,array.length);
        }
    }
}

function doMsg(msg,num) {
    if (msgActive == true) {
        message = msg;
        command = message.replace('CURNUM', num);
        command = command.replace('NUM', larray+'');
        command = command.replace('NAME', myname);
        document.getElementById("txtMsg").value = command;
        document.getElementById("btn").click();
    }
}

function collectionToArray(collection) {
    var ary = [];
    for (var i = 0, len = collection.length; i < len; i++) {
        ary.push(collection[i]);
    }
    return ary;
}

function count(name) {
    var c=0;
    for (var i = 0;i<array.length; i++) { 
        if (array[i].innerHTML == name) { c++; }
     }
        return c;
    }

 function match(name) {
    var c = false;
    for (var i = 0;i<whitelist.length; i++) {
        if (whitelist[i] == name) { c = true; }
        if (name in oncam.split(",")) { c = true; }
    }
    return c;
}

function KickNext() {

    try {

        if (match(array[arrpos].innerHTML)) {
            arrpos++; return;
        }
        if (array[arrpos].innerText == white) {
            arrpos++; return; 
        }
        if (array[arrpos].innerText in oncam.split(",")) {
            arrpos++; return; 
        }

        if (array[arrpos].innerText == myname) {
            doMsg(msgKickSelfFail, array.length);
            
        } else {
            kickname = array[arrpos].innerText;
            command = kickorban.replace('*', kickname);
            document.getElementById("txtMsg").value = command;	
            document.getElementById("btn").click();
        }
    }
    catch (err) {
        //alert(err + " " + arrpos + " " + array.length);
    }

    arrpos++;
    if ( arrpos >= array.length ) { 
    clearInterval(timer); arrpos = 0; whitelist = new Array(); array=new Array();
    refresh();
    pausecomp(1200);
    doMsg(msgFinish, array.length);
    }

}

function findMods() {
    modarray = document.getElementById("activeUserList").getElementsByTagName('a');
    modarrayl = modarray.length;
    for (var i = 0; i < modarray.length; i++) 
    {
        if (modarray[i].parentNode.tagName == "B") 
        {
                whitelist.push(modarray[i].innerText);
        }
    }

}


function refresh() {
    document.getElementById("activeUserList").innerHTML = "";
    location.assign("javascript:updateMembers(true);void(0)");
}
