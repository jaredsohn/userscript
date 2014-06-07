  // ==UserScript==
// @name           JavaScriptBot
// @namespace      JavaScriptBot
// @author         FoxyLEgend
// @OtherInfo      Eh
// @include        http://m.xat.com:10049/
// ==/UserScript==
  //Origional by 3nvisi0n, edited by Legendfoxy
    var cmdChar = "@"; //Character that starts all commands
    var num = 1;
    var BUFFER_TIME = 3;//How long to wait before parsing messages(so we don't parse old ones)
    var users=new Array();//Users that're allowed to use the bot
    users[0]=260070834;
     
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
    if(inArray(id,users)) {
        words = argu.split(" ");
        switch(cmd.toLowerCase()) {
           
                    case "null":
                    sendMessage('Goodbye');
                    die();
                    break;
                    case "not":
                    sendMessage('Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour Kosomk Ya Nour');
                    break;
                   
                    case "listowners":
                    b='';
                    for(var i in users)
                    {
                            b=b+' '+i;
                    }
                    sendPM(b,id);
                    break;
                   
                    case "credits":
                    sendMessage('Origional script by 3nvisi0n, modified by Legendfoxy');
                    break;
                   
                    case "add":
                    ident = argu.between("[","]");
                    users[num]=ident;
                    num=num+1;
                    sendMessage(ident+" is now a bot owner!");
                    break;
                   
            case "yell":
            case "say":
                    respond(argu);
                    break;
                   
            case "kick":
                    kick(id,"Requested.");
                    break;
                   
            case "ban":
                    ban(id,"Requested", argu[1]);
                    break;
                   
            case "member":
                    member(id);
                    break;
                   
            case "guest":
                    guest(id);
                    break;
                   
                    case "pc":
                    message=argu.between("[","]");
                    ident=argu.between("(",")");
                    sendPC(message,ident);
                    break;
                   
            case "mod":
                    mod(id);
                    break;
                   
                    default: sendPC('That is not a command!',id);break;
        }
    }}
     
    unsafeWindow.AddMess = function AddMess(tab, s)
    {
        curTime = time();
        last = s.between("(",")");
        if(curTime >= startTime+BUFFER_TIME) {
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
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
    function inArray(needle, haystack) {
        var length = haystack.length;
        for(var i = 0; i < length; i++) {
            if(haystack[i] == needle) return true;
        }
        return false;
    }
    function del(ide, array) {
        var length = array.length;
        for(var i = 0; i < length; i++) {
            if(array[i] == ide) return true;
        }
        return false;
    }
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
    function respond(message) {
        if(lastTab==0) {
            sendMessage(message);    
        } else {
            sendPC(message,lastTab);
        }
    }
    function sendMessage(message) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?m='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function sendPC(message,id) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?u='+id+'&t='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);      
    }
