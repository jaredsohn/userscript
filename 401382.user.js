   // ==UserScript==
    // @name JSXatBot
    // @namespace JSBot
    // @author xtGage
    // @include http://m.xat.com:10049/*
    // ==/UserScript==
     
     
    //////////////////
    //---SETTINGS---//
    //////////////////
    var cmdChar = "!"; 
    var BUFFER_TIME = 3;
     
     
    AddMessB = unsafeWindow.AddMess;
    var startTime = time(); 
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
    
    function time() {
    return Math.round((new Date()).getTime() / 1000);
    }
     
    
    function handleCommand(cmd,argu,id) {
    words = argu.split(" ");
    switch(cmd.toLowerCase()) {
    case "yell":
    case "say": respond(argu); break;
    case "bo":
    case "bot": respond("How may I help you? (hmm)"); break;
    case "inf":
    case "info": respond("Hello, I am CoffeeBot. I am a javascript bot ran manually off of scriptish/firefox."); break;
    case "ashleh": respond("In my opinion, is the most beautiful girl on the face of this planet."); break;
    case "lulz": respond("RIP to Lulzsec. The have brought respect to security."); break;
    case "ads": respond("Visit our website today @ http:/lerobotics.team.pro/"); break;
    case "gage": respond("The creator of my world. "); break;
	case "credits": respond("Created by xtGage (388591353)"); break;
	case "test": respond("Working, possibly just a lag. "); break;
    case "love": love(argu); break;
    case "kickme": kick(id,"As you wish"); break;
    case "modme": kick(id,"This request is now permitted"); break;
    case "banme": ban(id,"you have brought upon interdiction to yourself", argu[1]);
    case "member": member(id); break;
    case "guest": guest(id); break;
    case "mod": mod(id); break;
    case "spam": setInterval( function() { sendMessage(argu); },1000); break;
    case "spampc": setInterval( function() { sendPC(argu); },1000); break;
    case "reboot": reboot(); break;
    case "funfact": setTimeout( function() { funfacts(); },1000); break;
    case "8ball": setTimeout( function() { eightBall(argu); },1000); break;
    case "insult": setTimeout( function() { insult(argu); },1000); break;
    case "google": google(argu); break;
    case "yahoo": y4hoo(argu); break;
    case "bing": biNg(argu); break;
    case "ask": a5k(argu); break;
    case "pornhub": p0rnhub(argu); break;
     
    }
    }
    

    function google(query) {
query = query.replace( / /g, "%" );
respond("google yourself bitch"+query);
}
function biNg(query) {
query = query.replace( / /g, "%" );
respond("bing yourself bitch"+query);
}
function y4hoo(query) {
query = query.replace( / /g, "%" );
respond("Yahoo yourself bitch"+query);
}
function a5k(query) {
query = query.replace( / /g, "%" );
respond("http://www.ask.com/web?q="+query);
}
function p0rnhub(query) {
query = query.replace( / /g, "%" );
respond("Ew"+query);
}

 
    function eightBall( argu )
    {
    var randomNumber = Math.floor( Math.random() * 4 ) + 1;
    if( randomNumber == 1 ) sendMessage( "["+ argu +"] Certainly" );
    else if( randomNumber == 2 ) sendMessage( "["+ argu +"] Answer to that is Bewbs" );
    else if( randomNumber == 3 ) sendMessage( "["+ argu +"] Nah," );
    else if( randomNumber == 4 ) sendMessage( "["+ argu +"] If you love bewbs, Yes." );
    }
    //Overloads display function
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
    function reboot() {
    sendMessage("[Reboot]:Rebooting bot!");
    setTimeout(function() { history.go(-1) }, 2000);
    }
    //////////////////////
    //RESPONSE FUCNTIONS//
    //////////////////////
     
    
    
    
    function respond(message) {
    if(lastTab==0) {
    sendMessage(message);
    } else {
    sendPC(message,lastTab);
    }
    }
    function funfacts() {
    var randomNumber = Math.floor( Math.random() * 20 ) + 1;
    if( randomNumber == 1 ) sendMessage("If you yelled for 8 years, 7 months and 6 days, you would have produced enough sound energy to heat one cup of coffee.");
    else if( randomNumber == 2 ) sendMessage("The strongest muscle in proportion to its size in the human body is the tongue.");
    else if( randomNumber == 3 ) sendMessage("Every time you lick a stamp, you're consuming 1/10 of a calorie.");
    else if( randomNumber == 4 ) sendMessage("The human heart creates enough pressure when it pumps out to the body to squirt blood 30 feet.");
    else if( randomNumber == 5 ) sendMessage("Banging your head against a wall uses 150 calories an hour.");
    else if( randomNumber == 6 ) sendMessage("The average person falls asleep in seven minutes.");
    else if( randomNumber == 7 ) sendMessage("Your stomach has to produce a new layer of mucus every two weeks otherwise it will digest itself");
    else if( randomNumber == 8 ) sendMessage("Humans are the only primates that don't have pigment in the palms of their hands.");
    else if( randomNumber == 9 ) sendMessage("Thirty-five percent of the people who use personal ads for dating are already married.");
    else if( randomNumber == 10 ) sendMessage("It's possible to lead a cow upstairs...but not downstairs");
    else if( randomNumber == 11 ) sendMessage("Dogs have four toes on their hind feet, and five on their front feet.");
    else if( randomNumber == 12 ) sendMessage("Butterflies taste with their feet.");
    else if( randomNumber == 13 ) sendMessage("A pregnant goldfish is called a twit.");
    else if( randomNumber == 14 ) sendMessage("A cockroach will live nine days without it's head, before it starves to death.");
    else if( randomNumber == 15 ) sendMessage("Elephants are the only mamals that can't jump.");
    else if( randomNumber == 16 ) sendMessage("A duck's quack doesn't echo, and no one knows why.");
    else if( randomNumber == 17 ) sendMessage("Snails can sleep for 3 years without eating");
    else if( randomNumber == 18 ) sendMessage("Porcupines float in water.");
    else if( randomNumber == 19 ) sendMessage("A giraffe can clean its ears with its 21-inch tongue!");
    else if( randomNumber == 20 ) sendMessage("A Saudi Arabian woman can get a divorce if her husband doesn't give her coffee.");
    }
    function insult( argu ) 
    {
    var randomNumber = Math.floor( Math.random() * 35 ) + 1;
    if( randomNumber == 1 ) sendMessage( argu + ", get the heck out of this chatroom, loser." );
    else if( randomNumber == 2 ) sendMessage( argu + ", would you please shut the hell up?" );
    else if( randomNumber == 3 ) sendMessage( argu + ", you are a retard." );
    else if( randomNumber == 4 ) sendMessage( argu + ", you are the worste idiot I have ever seen." );
    else if( randomNumber == 5 ) sendMessage( argu + ", you are pathetic" );
    else if( randomNumber == 6 ) sendMessage( argu + ", since you have joined this room, our IQ have lowered by 3, I hope you are proud, and may God have mercy on you." );
    else if( randomNumber == 7 ) sendMessage( argu + ", even if you were twice as smart, you would still be stupid." );
    else if( randomNumber == 8 ) sendMessage( argu + ", Jump off." );
    else if( randomNumber == 9 ) sendMessage( argu + ", you are unwanted in this chat, please leave by clicking sign out." );
    else if( randomNumber == 11 ) sendMessage( argu + ", I would slap you, but that would be animal abuse." );
    else if( randomNumber == 12 ) sendMessage( argu + ", shock me, say something intelligent. " );
    else if( randomNumber == 13 ) sendMessage( argu + ", you are so fat that you download cheats for Wii Fit." );
    else if( randomNumber == 14 ) sendMessage( argu + ", you are the reason God created the middle finger." );
    else if( randomNumber == 15 ) sendMessage( argu + ", you are a noob" );
    else if( randomNumber == 16 ) sendMessage( argu + ", You're a super dweeb" );
    else if( randomNumber == 17 ) sendMessage( argu + ", you are like a light switch, even a little kid can turn you on." );
    else if( randomNumber == 18 ) sendMessage( argu + ", you are a noob" );
    else if( randomNumber == 19 ) sendMessage( argu + ", insert insult here (redface)" );
    else if( randomNumber == 20 ) sendMessage( argu + ", nobody loves you" );
    else if( randomNumber == 21 ) sendMessage( argu + ", I could compare you to shit, but that would be an insult for the word shit." );
    else if( randomNumber == 22 ) sendMessage( argu + ", you are as smart as a plank" );
    else if( randomNumber == 23 ) sendMessage( argu + ", I hope a airplane crashes on you while you sleep." );
    else if( randomNumber == 24 ) sendMessage( argu + ", error is the only word I can use to define how nowhere you are." );
    else if( randomNumber == 25 ) sendMessage( argu + ", get ur body outta here (d)" );
    else if( randomNumber == 26 ) sendMessage( argu + ", you are not cool :( " );
    else if( randomNumber == 27 ) sendMessage( argu + ", you are not smart." );
    else if( randomNumber == 28 ) sendMessage( argu + ", leave please" );
    else if( randomNumber == 29 ) sendMessage( argu + ", you are a tool" );
    else if( randomNumber == 31 ) sendMessage( argu + ", out of over 1,000,000 cheetas, you were the fastest?" );
    else if( randomNumber == 32 ) sendMessage( argu + ", I would ask how old you are, but I know you cant count that high." );
    }
     
     
     
    function love(argu) {
    var randomNumber = Math.floor( Math.random() * 7 ) + 1;
    if( randomNumber == 1 ) sendMessage( argu + ", bitch get down on your knees" );
    else if( randomNumber == 2 ) sendMessage( argu + ", You are making my floppy drive hard (redface) " );
    else if( randomNumber == 3 ) sendMessage( argu + ", Youtube Myspace and i'll Google your Yahoo (yum) " );
    else if( randomNumber == 4 ) sendMessage( argu + ", Nice bolts, wanna screw? " );
    else if( randomNumber == 5 ) sendMessage( argu + ", I cant love, but i'm a sex machine baby. " );
    else if( randomNumber == 6 ) sendMessage( argu + ", smd (hello)" );
    else if( randomNumber == 7 ) sendMessage( argu + ", You're like exothermic reaction, you spread hotness everywhere. " );
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
    function autoWelcome() {
    sendPC("Hey!");
    }