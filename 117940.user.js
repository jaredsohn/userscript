// ==UserScript==
// @name           JSXatBot
// @namespace      JSBot
// @author         3nvisi0n
// @include        http://m.xat.com:10049/*
// ==/UserScript==
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP

/* Script is free to use edit and modify, heck that is the point
of this release, I have no intention to maintain the code just put
it out so you guys can use it and modify it to fit your needs. Do
not ask me to add stuff, DO NOT ask me HOW to do stuff, read the 
code all the basics you need are here, if you need more do it your
self. */

//////////////////
//---SETTINGS---//
//////////////////
var cmdChar = "!"; //Character that starts all commands
var BUFFER_TIME = 3;//How long to wait before parsing messages(so we don't parse old ones)


AddMessB = unsafeWindow.AddMess;//don't change this is needed for overload
var startTime = time(); //Used so we don't parse old messages
var lastTab = 0;

//Function stolen from somewhere I don't remember
String.prototype.between = function(prefix, suffix) {
  s = this;
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}
//grabs the unix timestamp
function time() {
    return Math.round((new Date()).getTime() / 1000);    
}

//Big switch for all cmd handling
function handleCommand(cmd,argu,id) {
    words = argu.split(" ");
    switch(cmd.toLowerCase()) {
        case "yell":
        case "say": respond(argu); break; 
        case "kick": kick(id,"Requested.");  break;
        case "ban": ban(id,"Requested", argu[1]);
        case "member": member(id);  break;
        case "guest": guest(id);  break;
        case "mod": mod(id);   break;
    }
}

//Overloads display function
unsafeWindow.AddMess = function AddMess(tab, s)
{
    curTime = time();
    last = s.between("(",")");
    if(curTime >= startTime+BUFFER_TIME) { //Don't start parsing until BUFFER_TIME s has passed
        var id = tab;
        if(tab==0) id = s.between("(",")");
        lastTab = tab;
        if(s.indexOf("<B>")>=0) {
            var msg = s.between("<B>","</B>")+" ";
            if(msg.charAt(0) == cmdChar) {
                var cmd = msg.substring(1,msg.indexOf(" "));
                handleCommand(cmd,msg.substring(msg.indexOf(" ")+1),id);
            } 
        }
    }
    AddMessB(tab,s);
}

////////////////////////
//MODERATION FUCNTIONS//
////////////////////////
function kick(id,reason) {
    unsafeWindow.DoMessage(id, '/k', reason);  
}
function ban(id,reason,time) {
    unsafeWindow.DoMessage(id, '/g'+(time*3600), reason);  
}
function guest(id) {
    unsafeWindow.DoMessage(id, '/r', '');    
}
function member(id) {
    unsafeWindow.DoMessage(id, '/e', '');    
}
function mod(id) {
    unsafeWindow.DoMessage(id, '/m', '');    
}
function owner(id) {
    unsafeWindow.DoMessage(id, '/M', '');    
}
//////////////////////
//RESPONSE FUCNTIONS//
//////////////////////

//Responds to whereever the message came from
//in PC/PM(mobile doesn't differentiate) responds via PC
//from main respond to main
function respond(message) {
    if(lastTab==0) {
        sendMessage(message);    
    } else {
        sendPC(message,lastTab);
    }
}
    
//Simply sends a message to main chat
function sendMessage(message) {
    xmlHttp2 = unsafeWindow.getHTTPObject();
    xmlHttp2.open('GET','/Post?m='+message,true);
    xmlHttp2.setRequestHeader("Content-Type", "text/plain");
    xmlHttp2.setRequestHeader("Connection", "close");
    xmlHttp2.send(null);  
}
//Sends a message out to PC
function sendPC(message,id) {
    xmlHttp2 = unsafeWindow.getHTTPObject();
    xmlHttp2.open('GET','/Post?u='+id+'&t='+message,true);
    xmlHttp2.setRequestHeader("Content-Type", "text/plain");
    xmlHttp2.setRequestHeader("Connection", "close");
    xmlHttp2.send(null);       
}

//If you want youtube, google and stuff for commands use GM_xmlhttpRequest to make the GET/POST out to whereever
//Documentation: http://wiki.greasespot.net/GM_xmlhttpRequest
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
//DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP