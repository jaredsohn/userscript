    // ==UserScript==
    // @name           JSXatBot
    // @namespace      JSBot
    // @author         3nvisi0n & edited by TwiN
    // @include        http://m.xat.com:10049/*
    // ==/UserScript==

//////////////////////////////////////////    
// Don't know how to set it up? 	//
// Here's my tut on how to set it up:	//
// http://pastebin.com/tk65hifC		//
//////////////////////////////////////////

    //////////////////
    //---SETTINGS---//
    //////////////////
    var cmdChar = "!"; //Character that starts all commands
    var BUFFER_TIME = 3; //How long to wait before parsing messages(so we don't parse old ones)
    onload=autoWelcome;
    var startMilliseconds = jQuery.now();
    var startSeconds = startMilliseconds / 1000;
     
    document.getElementById("msg").style.color = "red";
    document.getElementById("tabs").style.color = "green";
    document.getElementById("fillMe").style.color = "gold"; 
    document.body.style.background = "#A4A4A4"; 
     
    AddMessB = unsafeWindow.AddMess;//don't change this is needed for overload
    var startTime = time(); //Used so we don't parse old messages
    var lastTab = 0;
     
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

        switch(cmd.toLowerCase()) 

        case "yell":
        case "say": respond(argu); break;

	case "info": respond("Originally made by 3nvisi0n and edited by TwiN"); break;	

	case "cookie": //not this will execute the same thing as the case under
	case "cookies": respond("Twin likes cookies.."); break;  
// ^ if somebody says "!cookies", answer will be "Twin likes cookies.."

        case "kick": kick(argu,"Because Twin decided so."); break;
        case "ban": ban(argu,"Because Twin decided so.", args[1]); break;
        case "member": member(argu);  break;
        case "guest": guest(argu);  break;
        case "mod": mod(argu);  break;
        case "unban": unban(argu); break;

	case "dice": dice(id); break;
//if command is "!dice", function dice() is called, and the id of the user also.

	case "reboot": Reb00t(); break;

        case "md5": crypto( argu, "MD5" ); break;
	case "sha1": crypto( argu, "SHA1" ); break;
	case "sha256": crypto( argu, "SHA256" ); break;
	case "sha384": crypto( argu, "SHA384" ); break;
	case "sha512": crypto( argu, "SHA512" ); break;
	case "md2": crypto( argu, "MD2" ); break;

        case "time":
        case "date": datetime(); break;

        case "i":
        case "insult": insult( argu ); break;

	case "myspace": respond("http://www.myspace.com/"); break;
	case "xat": respond("http://xat.com/"); break;
	case "mypastebin": respond("http://pastebin.com/u/TwinProduction"); break;
	case "facebook": respond("http://www.facebook.com"); break;
	case "twitter": respond("http://www.twitter.com/"); break;

	case "bottut": respond("http://pastebin.com/tk65hifC"); break;
	case "botpublicrelease": respond("http://pastebin.com/kPQcekcS"); break;
	

	case "xatbotautologin":
        case "mobilebotautologin":
        case "mbal":
        case "mbautologin":
        case "autologin": respond("http://pastebin.com/s8dr4MXG"); break;
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
    function unban(id) {
	   unsafeWindow.DoMessage(id, "/u", '');
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
    function dice(id)
    {
            var randomNumber = Math.floor( Math.random() * 6 ) + 1;
            if( randomNumber == 1 ) sendMessage( "[" + id + "] 1." );
            else if( randomNumber == 2 ) sendMessage( "[" + id + "] 2." );
            else if( randomNumber == 3 ) sendMessage( "[" + id + "] 3." );
            else if( randomNumber == 4 ) sendMessage( "[" + id + "] 4." );
            else if( randomNumber == 5 ) sendMessage( "[" + id + "] 5." );
            else if( randomNumber == 6 ) sendMessage( "[" + id + "] 6." )
    }

	function crypto( arg, alg ) //encryption..
{
	setTimeout( function() // unsafeWindow cannot call GM_cryptoHash()
	{
		var hashed = GM_cryptoHash( arg, alg );
		if( alg == "SHA512" ) setTimeout( function() { sendMessage( hashed ); }, 1750 );
		else if( alg == "SHA384" || alg == "SHA256" ) setTimeout( function() { sendMessage( hashed ); }, 1500 );
		else setTimeout( function() { sendMessage( hashed ); }, 1000 );
	}, 1);
}

function datetime()         //date & time
{
    var currentDate = new Date()            //reset date
    var day = currentDate.getDate()         //dd
    var month = currentDate.getMonth() + 1  //mm
    var year = currentDate.getFullYear()    //yyyy
    var hr = currentDate.getHours()         //hh
    var min = currentDate.getMinutes()      //mm
    var sec = currentDate.getSeconds()      //ss
    sendMessage( "Date: " + day + "/" + month + "/" + year + " Time: " + hr + "h:" + min + "m:" + sec + "s" );
}

function Reb00t() {
sendMessage("Rebooting TwinBot1337..");
setTimeout(function() {
history.go(-1)
},2000);
}

function autoWelcome() {
sendMessage("TwinBot1337 is now connected!"); 
}

            function insult( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
        {
                var randomNumber = Math.floor( Math.random() * 32 ) + 1;
                if( randomNumber == 1 ) sendMessage( argu + ", get the fuck out of this chatroom, faggot." );
                else if( randomNumber == 2 ) sendMessage( argu + ", would you please shut the fucking fuck up?" );
                else if( randomNumber == 3 ) sendMessage( argu + ", you are a retard." );
                else if( randomNumber == 4 ) sendMessage( argu + ", you are the worste skid I have ever seen." );
                else if( randomNumber == 5 ) sendMessage( argu + ", you are pathetic" );
                else if( randomNumber == 6 ) sendMessage( argu + ", since you have joined this room, our IQ have lowered by 3, I hope you are proud, and may God have mercy on you." );
                else if( randomNumber == 7 ) sendMessage( argu + ", even if you were twice as smart, you would still be stupid." );
                else if( randomNumber == 8 ) sendMessage( argu + ", fuck off." );
                else if( randomNumber == 9 ) sendMessage( argu + ", you are unwanted in this chat, please leave by clicking sign out." );
                else if( randomNumber == 11 ) sendMessage( argu + ", I would slap you, but that would be animal abuse." );
                else if( randomNumber == 12 ) sendMessage( argu + ", shock me, say something intelligent. " );
                else if( randomNumber == 13 ) sendMessage( argu + ", you are so fat that you download cheats for Wii Fit." );
                else if( randomNumber == 14 ) sendMessage( argu + ", you are the reason God created the middle finger." );
                else if( randomNumber == 15 ) sendMessage( argu + ", you are a cunt" );
                else if( randomNumber == 16 ) sendMessage( argu + ", yo momma is so poor, I saw her chasing the garbage truck with a shopping list." );
                else if( randomNumber == 17 ) sendMessage( argu + ", you are like a light switch, even a little kid can turn you on." );
                else if( randomNumber == 18 ) sendMessage( argu + ", you are a noob" );
                else if( randomNumber == 19 ) sendMessage( argu + ", insert insult here (redface)" );
                else if( randomNumber == 20 ) sendMessage( argu + ", nobody loves you" );
                else if( randomNumber == 21 ) sendMessage( argu + ", I could compare you to shit, but that would be an insult for the word shit." );
                else if( randomNumber == 22 ) sendMessage( argu + ", you are as smart as a plank" );
                else if( randomNumber == 23 ) sendMessage( argu + ", I hope a airplane crashes on you while you sleep." );
                else if( randomNumber == 24 ) sendMessage( argu + ", error is the only word I can use to define how nowhere you are." );
                else if( randomNumber == 25 ) sendMessage( argu + ", gtfo (d)" );
                else if( randomNumber == 26 ) sendMessage( argu + ", you are not cool :( " );
                else if( randomNumber == 27 ) sendMessage( argu + ", you are not smart." );
                else if( randomNumber == 28 ) sendMessage( argu + ", stfu please" );
                else if( randomNumber == 29 ) sendMessage( argu + ", you are a tool" );
                else if( randomNumber == 30 ) sendMessage( argu + ", I wish cancer on you and all your family." );
                else if( randomNumber == 31 ) sendMessage( argu + ", out of over 1,000,000 sperm, you were the fastest?" );
                else if( randomNumber == 32 ) sendMessage( argu + ", I would ask how old you are, but I know you cant count that high." );      
        }






//SaveTheKiwis TwiN (IChrisI [164025917] was here
//SaveTheKiwis TwiN (IChrisI [164025917] was here
//SaveTheKiwis TwiN (IChrisI [164025917] was here
//SaveTheKiwis TwiN (IChrisI [164025917] was here
//SaveTheKiwis TwiN (IChrisI [164025917] was here
//SaveTheKiwis TwiN (IChrisI [164025917] was here