// ==UserScript==
// @name           BotOFFICIAL
// @namespace      JSBot
// @author         3nvisi0n, j3d, Hundrea and Lycanthropo
// @include        http://m.xat.com:10049/*
// @icon         https://mo-bot.googlecode.com/hg/icons/Mo-Bot.png
// @icon64       https://mo-bot.googlecode.com/hg/icons/Mo-Bot.png
// ==/UserScript==
var cmdChar = "!"; //Character that starts all commands
var BUFFER_TIME = 2;//How long to wait before parsing messages(so we don't parse old ones)
var Outlaw = new Array();
var copy;
var owner= new Array();
AddMessB = unsafeWindow.AddMess;//don't change this is needed for overload
var startTime = time(); //Used so we don't parse old messages
var lastTab = 0;
var cuss;
//onload = autowelcome;

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

function monitering(cmd,argu,id)
{
    words = argu.split(" ");
    var args = argu.split(" ");
    for (var i=0;i<6;i++)
    {
        if(id==Outlaw[i])
        {
            kick(id,"Outlawed from talking/typing!");
        }
    }
    
    var allwords=cmd+argu;
    if(cuss)
    {
        var cussword=new Array();
        cussword[0]="fuck";
        cussword[1]="shit";
        cussword[2]="damit";
        cussword[3]="dick";
        cussword[4]="cum";
        cussword[5]="pussy";
        cussword[6]="asshole";
        cussword[7]="bitch";
        cussword[8]="penis";
        cussword[9]="vagina";
        cussword[10]="fag";
        cussword[11]="boobs";
        cussword[12]="porn";
        cussword[13]="anal";
        cussword[14]="whore";
        cussword[15]="nigger";
        cussword[16]="nigga";
        cussword[17]="cunt";
        cussword[18]="slut";
        cussword[19]="horny";
        cussword[20]="cock";
        cussword[21]="ass";
        cussword[22]="fucking";
        cussword[23]="dildo";
        cussword[24]="asshole";
        cussword[25]="boner";
        cussword[26]="milf";
        cussword[27]="damn";
        cussword[28]="anus";
        cussword[29]="blowjob";
        cussword[30]="sex";
        cussword[31]="condom";
        cussword[32]="rape";
        cussword[33]="anal";
        cussword[34]="oral";
        cussword[35]="merda";
        cussword[36]="sexo";
        cussword[37]="puta";
        cussword[38]="foda-se";
        cussword[39]="viado";
        cussword[40]="corno";
        for(var akl=0;akl<33;a
            kl++){
            var searchwordc=cussword[akl];
            var cussresult2=cmd.toLowerCase().search(searchwordc);
            var cussresult=argu.toLowerCase().search(searchwordc);
            if(cussresult!=-1||cussresult2!=-1)
            {
                sendPC("(i) Sem palavrões/inapropriado, por favor!",id);
                kick(id,"Inapropriado! :o");
            }
        }
    }
    
    if(id==copy)
    {
        respond(allwords);
    }
    // switch(cmd.toLowerCase()) {
    
    //}
}
//Big switch for all cmd handling
function handleCommand(cmd,argu,id) {
    words = argu.split(" ");
    var args = argu.split(" ");
    
    
    
    if (id == "274087409" || id==owner[0]) {
        admincontrols(cmd,argu,id);
    }
    
    else if(id==owner[1] || id==owner[2])
    {
        admincontrols(cmd,argu,id);
    }
        
        else if(id==owner[3] || id==owner[4])
        {
            admincontrols(cmd,argu,id);
        }
        else if(id=="274087409"||id=="Anyone else's id (if you want)")
        {
            admincontrols(cmd,argu,id);
        }
            if(cmd.toLowerCase()=="pokedex")
            {
                switch(argu.toLowerCase()) {
                    case "pikachu ": sendMessage("Pikachu, o primeiro Pokemon apanhado por um treinador gay. Porque a Nintendo deu um nome desses? (no)"); break;
                    case "bidoof ": sendMessage("Bidoof, o escravo de HMs, conhecido como Justin Bieber."); break;
                    case "ditto ": sendMessage("Ditto, Pokemon Fail, quando apanhado por Brock,(type /pokedex ditto2)");break;
                    case "ditto2 ": sendMessage("Ele vai se transformar na Enfermeira Joy, depois disso nao olhe para o que Brock vai fazer, confie em mim.");break;
                    case "steelix ": sendMessage("Steelix, o macho duro Pokemon, nãao aproxime-se dele se voce e menina."); break;
                    case " ": sendMessage("Escreva !pokedex (NomePokemon) para ver suas informacoes. (smile)");break;
                    default: sendMessage(argu+" nao existe no meu cerebro");break;
                }}
    
    
    
    
    function admincontrols(cmd,argu,id)
    {switch(cmd.toLowerCase()) {
            //reboot
        case "reboot":reb00t(); break;
        case "off":shutdown();break;
        case "test": setTimeout( function() { respond("(i) jsBOT está online!"); },1000); break;
        case "off": shutdown(); break;
        case "argutest": respond("sadas"+args[0]+"aa");break;
        case "goto": gotoChat(argu); break;
        case "adv": setInterval( function() { sendMessage(argu); },40000); break;
        case "kick": kick(parseInt(args[0]),"Requisitado por admin(274087409)"); break;
        case "ban": ban(parseInt(args[0]),"Requisitado por admin (274087409)", parseInt(args[1])); break;
        case "g":
        case "guest": guest(parseInt(args[0]));  break;
        case "m":
        case "member": member(parseInt(args[0]));  break;
        case "mod": mod(parseInt(args[0]));  break;
        case "owner": owner(parseInt(args[0])); break;
        case "unban": unban(parseInt(args[0])); break;
        case "spam": setInterval( function() {sendMessage(argu); },1000); setTimeout( function() {history.go(-1);},20000); break;
        case "spampc": var message593=argu.replace(args[0],""); setInterval( function() {sendPC(message593.replace(args[1],""),args[0]);},1000); respond("(i) Spam de PC começou!"); setTimeout( function() {history.go(-1);},args[1]); break;
        case "cussfilter":if(args[0]=="on"){cuss=true; respond("(i) O filtro de palavrões está ON!");} else{cuss=false; respond("(i) O filtro de palavrões esta OFF!");}break;
        case "outlaw": respond("Para formar um Outlaw, escreva outlaw1(ou outlaw2, etc) e depois o ID da pessoa."); break;
        case "outlaw1": Outlaw[0] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "outlaw2": Outlaw[2] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "outlaw3": Outlaw[3] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "outlaw4": Outlaw[4] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "outlaw5": Outlaw[5] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "outlaw6": Outlaw[6] = parseInt(args[0]); respond("Outlaw "+argu+" Added"); break;
        case "owner1":owner[0]=parseInt(args[0]); respond("Owner "+argu+" Added"); break;
        case "owner2":owner[1]=parseInt(args[0]); respond("Owner "+argu+" Added"); break;
        case "owner3":owner[2]=parseInt(args[0]); respond("Owner "+argu+" Added"); break;
        case "owner4":owner[3]=parseInt(args[0]); respond("Owner "+argu+" Added"); break;
        case "copy":copy=parseInt(args[0]);respond("(I) Agora vou copiar essa pessoa! :)");break;
        case "ignore":iglist[args[0]]=args[1]; respond("ignoring "+args[1]); break;
    }}
    var argu1=parseInt(args[1]);
    switch(cmd.toLowerCase()) {
        case "yomama":yomama( argu );break;
        case "yomamapc":yomama2(args[0],args[1]); break;
        case "kill": kill( argu ); break;
        case "sm":
        case "secretmessage": sendMessage("[Secret]" + argu); break;
        case "comp":
        case "flirt":comp( argu ); break;
        case "rape":rape( argu ); break;
        case "fuck":
        case "fuckyou": respond("Eu sei que voce quer isso fazer comigo. (hello)"); break;
        case "safado": respond("Eu sei que voce quer isso fazer comigo. (hello)"); break;
        case "answer": respond("(i) The answers for the jokes are located here: http://pastebin.com/WpMp0DXt"); break;
        case "8b":
        case "8ball": eightBall( id ); break;
        case "joke": joke( id ); break;
        case "yell":
        case "talk":
        case "say":respond(argu); break; 
        case "admin":respond("(i) O administrador principal do bot e: 274087409"); break;
        case "kickme": kick(id,"Requisitado pelo usuario.");  break;
        case "banme": ban(id,"Requisitado pelo usuario.", argu[1]);
        case "memberme": member(id);  break;
        case "guestme": guest(id);  break;
        case "SUPERSECRETMESSAGE":
        case "sss": sendMessage( argu ); break;
        case "funfact": funfacts(); break;
        case "insult": insult( argu ); break;
        case "update":respond("(i) Last updated: Saturday July 6th, 2013"); break;
        case "exit":kick(id,"Adeus! (bye)"); break;
        case "die": kick(id,"!die Como voce gosta disso(un)"); break;
        case "cmds":respond("(i) You could see all the commands for this bot at: http://pastebin.com/Jjham2bx "); break;
        case "info":respond("Created By: 3nv, Updated by: Jed and Hundrea, and Translated to Brazilian Portuguese by: Lycanthropo");break;
        case "date":datetime(); break;
        case "pc":setTimeout( function() { sendPC(argu.replace(args[0],""),args[0]);},1000); respond("(i) Mensagem Privada Enviada!");
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
            if(true) {
                var cmd2 = msg.substring(0,msg.indexOf(" "));
                monitering(cmd2,msg.substring(msg.indexOf(" ")+1),id);
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
function gotoChat(argu) {
    unsafeWindow.DoMessage('/go', argu);
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

function eightBall( id )
{
    var randomNumber = Math.floor( Math.random() * 42 ) + 1;
    if( randomNumber == 1 ) sendMessage( "[" + id + "] Esta certo." );
    else if( randomNumber == 2 ) sendMessage( "[" + id + "] E uma probabilidade." );
        else if( randomNumber == 3 ) sendMessage( "[" + id + "] Definitivamente nao." );
        else if( randomNumber == 4 ) sendMessage( "[" + id + "] Outlook nao e tao bom." );
            else if( randomNumber == 5 ) sendMessage( "[" + id + "] Nao entendi. Tente de novo!" );
            else if( randomNumber == 6 ) sendMessage( "[" + id + "] Eu nao sei. (shrug)" );
                else if( randomNumber == 7 ) sendMessage( "[" + id + "] O mundo pode nao saber! (evil)" );
                else if( randomNumber == 8 ) sendMessage( "[" + id + "] Talvez..." );
                    else if( randomNumber == 9 ) sendMessage( "[" + id + "] Ah, nao! (wt)" );
                    else if( randomNumber == 10 ) sendMessage( "[" + id + "] Eu adivinho que sim... (hmm)" );
                        else if( randomNumber == 11 ) sendMessage( "[" + id + "] LOL ISSO NUNCA VAI ACONTECER! (HEHE)" );
                        else if( randomNumber == 12 ) sendMessage( "[" + id + "] Continue sonhando... (yawn)" );
                            else if( randomNumber == 13 ) sendMessage( "[" + id + "] SIM!!! :D" );
                            else if( randomNumber == 14 ) sendMessage( "[" + id + "] NAO!!! :P" );
                                else if( randomNumber == 15 ) sendMessage( "[" + id + "] Oh, esta e dificil. (hmm)" );
                                else if( randomNumber == 16 ) sendMessage( "[" + id + "] Isso e uma pergunta estupida. (omg)" );
                                    else if( randomNumber == 17 ) sendMessage( "[" + id + "] Isso e uma resposta facil. (un)" );
                                    else if( randomNumber == 18 ) sendMessage( "[" + id + "] Boa pergunta, mas nao sei a resposta. (hmm)" );
                                        else if( randomNumber == 19 ) sendMessage( "[" + id + "] Ah, sim! :D" );
                                        else if( randomNumber == 20 ) sendMessage( "[" + id + "] Nao tenho a certeza... (hmm)" );
                                            else if( randomNumber == 21 ) sendMessage( "[" + id + "] Duvido muito. >_<" );
                                            else if( randomNumber == 22 ) sendMessage( "[" + id + "] Estou com certeza disso!" );
                                                else if( randomNumber == 23 ) sendMessage( "[" + id + "] NO WAY!!! (XD)" );
                                                else if( randomNumber == 24 ) sendMessage( "[" + id + "] Vamos dizer talvez... (shrug)" );
                                                    else if( randomNumber == 25 ) sendMessage( "[" + id + "] Lol nao." );
                                                    else if( randomNumber == 26 ) sendMessage( "[" + id + "] Lol sim." );
                                                        else if( randomNumber == 27 ) sendMessage( "[" + id + "] yesh... (nod)" );
                                                        else if( randomNumber == 28 ) sendMessage( "[" + id + "] idk, voce diz isso para mim? (chew) " );
                                                            else if( randomNumber == 29 ) sendMessage( "[" + id + "] Vai acontecer algum dia!" );
                                                            else if( randomNumber == 30 ) sendMessage( "[" + id + "] duhhh.... (crazy)" );
                                                                else if( randomNumber == 31 ) sendMessage( "[" + id + "] Nao. (no)" );
                                                                else if( randomNumber == 32 ) sendMessage( "[" + id + "] Quem sabe?(shrug)" );
                                                                    else if( randomNumber == 33 ) sendMessage( "[" + id + "] I have faith in that." );
                                                                    else if( randomNumber == 34 ) sendMessage( "[" + id + "] Nao vou tentar responder a isso..." );
                                                                        else if( randomNumber == 35 ) sendMessage( "[" + id + "] (no)" );
                                                                        else if( randomNumber == 36 ) sendMessage( "[" + id + "] (nod)" );
                                                                            else if( randomNumber == 37 ) sendMessage( "[" + id + "] Yep. (wink)" );
                                                                            else if( randomNumber == 38 ) sendMessage( "[" + id + "] Nao respondendo a isso. (d)" );
                                                                                else if( randomNumber == 39 ) sendMessage( "[" + id + "] A resposta e facil. (yawn)" );
                                                                                else if( randomNumber == 40 ) sendMessage( "[" + id + "] Isso e uma boa pergunta... (hmm)" );
                                                                                    else if( randomNumber == 41 ) sendMessage( "[" + id + "] Sim senhor." );
                                                                                    else if( randomNumber == 42 ) sendMessage( "[" + id + "] Nao senhor." );
                                                                                        }

function yomama( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.

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
function yomama2(argu,argu2) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
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

function comp( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
{
    var randomNumber = Math.floor( Math.random() * 29 ) + 1;
    if( randomNumber == 1 ) sendMessage( argu + ", You have a nice ass. :o" );
    else if( randomNumber == 2 ) sendMessage( argu + ", voce e sexy demais para esse xat. (cool)");
        else if( randomNumber == 3 ) sendMessage( argu + ", voce esta bom hoje. :)" );
        else if( randomNumber == 4 ) sendMessage( argu + ", wow, estou fascinado com voce. (hello)" );
            else if( randomNumber == 5 ) sendMessage( argu + ", MMM, eu desejo que tivesse voce. :(" );
            else if( randomNumber == 6 ) sendMessage( argu + ", voce e demais! :D" );
                else if( randomNumber == 7 ) sendMessage( argu + ", posso casar-me com voce? (pray)" );
                else if( randomNumber == 8 ) sendMessage( argu + ", voce e bonito/a! (REDFACE)" );
                    else if( randomNumber == 9 ) sendMessage( argu + ", voce nao e assim estupido." );
                    else if( randomNumber == 11 ) sendMessage( argu + ", eu desejo um feliz natal atrasado a voce." );
                        else if( randomNumber == 12 ) sendMessage( argu + ", voce e tao... quente..." );
                        else if( randomNumber == 13 ) sendMessage( argu + ", voce... (yum)" );
                            else if( randomNumber == 14 ) sendMessage( argu + ", uh, eu gostei de voce... (hello)" );
                            else if( randomNumber == 15 ) sendMessage( argu + ", voce e fofo..." );
                                else if( randomNumber == 16 ) sendMessage( argu + ", por favor olhe para voce." );
                                else if( randomNumber == 17 ) sendMessage( argu + ", please come cuddle with me. (pray)" ); 
                                    else if( randomNumber == 18 ) sendMessage( argu + ", porque voce tem de ter esse olhar bom?" );
                                    else if( randomNumber == 19 ) sendMessage( argu + ", tao quente!!!..." );
                                        else if( randomNumber == 20 ) sendMessage( argu + ", voce cheira bem. (goo)" );
                                        else if( randomNumber == 21 ) sendMessage( argu + ", voce e a pessoa mais quente que conheci na vida." );
                                            else if( randomNumber == 22 ) sendMessage( argu + ", eu desejaria que fosse como voce." );
                                            else if( randomNumber == 23 ) sendMessage( argu + ", voce e perfeito! (wink)" );
                                                else if( randomNumber == 24 ) sendMessage( argu + " just broke my scale. (l)" );
                                                else if( randomNumber == 25 ) sendMessage( argu + ", you're nice. (wink)" );
                                                    else if( randomNumber == 26 ) sendMessage( argu + ", you're too good for me." );
                                                    else if( randomNumber == 27 ) sendMessage( argu + ", por favor va ao xat comentar se voce quer dizer como voce e bonita. (redface)" );
                                                        else if( randomNumber == 28 ) sendMessage( argu + ", me de um abraco. (hug)" );
                                                        else if( randomNumber == 29 ) sendMessage( argu + ", give it to me babe. (hello)" );
                                                            }

function insult( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
{
    var randomNumber = Math.floor( Math.random() * 32 ) + 1;
    if( randomNumber == 1 ) sendMessage( argu + ", sai desse xat." );
    else if( randomNumber == 2 ) sendMessage( argu + ", voce pode calar a boca por um momento? -.-");
        else if( randomNumber == 3 ) sendMessage( argu + ", seu retardado." );
        else if( randomNumber == 4 ) sendMessage( argu + ", voce e a pior crianca que conheci na minha vida." );
            else if( randomNumber == 5 ) sendMessage( argu + ", voce e patetico." );
            else if( randomNumber == 6 ) sendMessage( argu + ", desde que voce entrou neste xat, nosso QI desceu em 3, espero que esteja orgulhoso, e que Deus te abencoa." );
                else if( randomNumber == 7 ) sendMessage( argu + ", mesmo que voce fosse o dobro como esperto, voce continuaria estupido." );
                else if( randomNumber == 8 ) sendMessage( argu + ", sai, por favor. '-'" );
                    else if( randomNumber == 9 ) sendMessage( argu + ", voce nao e bem-vindo neste xat, por favor saia clicando em Sair." );
                    else if( randomNumber == 11 ) sendMessage( argu + ", eu gostaria de bater, mas isso e considerado abuso animal. (mad)" );
                        else if( randomNumber == 12 ) sendMessage( argu + ", me choque, diz qualquer coisa... inteligente. (no) " );
                        else if( randomNumber == 13 ) sendMessage( argu + ", voce e tao gordo que faz download de cheats para Wii Fit." );
                            else if( randomNumber == 14 ) sendMessage( argu + ", voce e a razao de porque Deus criou o dedo medio. (flip)" );
                            else if( randomNumber == 15 ) sendMessage( argu + ", SAIA DAQUI!" );
                                else if( randomNumber == 16 ) sendMessage( argu + ", sua mae e tao pobre, vi ela seguindo o caixote do lixo com uma lista de compras." );
                                else if( randomNumber == 17 ) sendMessage( argu + ", voce e pobre." );
                                    else if( randomNumber == 18 ) sendMessage( argu + ", voce e um n00b!" );
                                    else if( randomNumber == 19 ) sendMessage( argu + ", voce nao e legal (redface)" );
                                        else if( randomNumber == 20 ) sendMessage( argu + ", ninguem gosta de voce." );
                                        else if( randomNumber == 21 ) sendMessage( argu + ", gostaria de dizer um palavrao, mas, se dissesse, ia ser banido do xat." );
                                            else if( randomNumber == 22 ) sendMessage( argu + ", voce e esperto como um burro." );
                                            else if( randomNumber == 23 ) sendMessage( argu + ", desejo que um aviao caia em cima de voce enquanto voce dorme. (6)" );
                                                else if( randomNumber == 24 ) sendMessage( argu + ", erro e a unica palavra que posso usar como voce nao esta indo em lado nenhum." );
                                                else if( randomNumber == 25 ) sendMessage( argu + ", SAIA!11ONZE!1 (d)" );
                                                    else if( randomNumber == 26 ) sendMessage( argu + ", voce nao e legal. :( " );
                                                    else if( randomNumber == 27 ) sendMessage( argu + ", voce nao e esperto." );
                                                        else if( randomNumber == 28 ) sendMessage( argu + ", shut the windows up, por favor." );
                                                        else if( randomNumber == 29 ) sendMessage( argu + ", voce e uma ferramenta neutralizada!" );
                                                            else if( randomNumber == 30 ) sendMessage( argu + ", desejo cancer em voce e na sua familia.");
                                                            else if( randomNumber == 31 ) sendMessage( argu + ", depois de 10 caracois numa corrida de 2 minutos, voce foi o mais lento?" );
                                                                else if( randomNumber == 32 ) sendMessage( argu + ", eu gostaria de pedir a sua idade, mas sei que voce nao consegue contar isso tao alto. (sad)" );
                                                                else if( randomNumber == 33 ) sendMessage( argu + ", quantos anos tens, crianca? (chew)" );
                                                                    }
function rape( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
{
    var randomNumber = Math.floor( Math.random() * 5 ) + 1;
    if( randomNumber == 1 ) sendMessage( "Me and my botfriend had a threesome with "+argu);
    else if( randomNumber == 2 ) sendMessage("I just fucked "+argu);
        else if( randomNumber == 3 ) sendMessage(argu +" just gave me a blowjob");
        else if( randomNumber == 4 ) sendMessage("I just did it with " +argu);
            else if( randomNumber == 5 ) sendMessage("i just beep beeped " +argu );
            }
function funfacts() {
    var randomNumber = Math.floor( Math.random() * 21 ) + 1;
    if( randomNumber == 1 ) sendMessage("Se voce gritar por 8 anos, 7 meses e 6 dias, voce produzia energia suficiente para aquecer um copo de cafe.");
    else if( randomNumber == 2 ) sendMessage("O musculo mais forte em porprocao do tamanho do corpo e a lingua.");
        else if( randomNumber == 3 ) sendMessage("Toda vez que voce lambe um selo, voce esta consumindo suas calorias.");
        else if( randomNumber == 4 ) sendMessage("O coracao humano cria energia suficiente para esguichar sangue a mais de 30 centimetros!");
            else if( randomNumber == 5 ) sendMessage("Atirando sua cabeca contra uma parede gasta 150 calorias por hora.");
            else if( randomNumber == 6 ) sendMessage("A pessoa adormece em sete minutos.");
                else if( randomNumber == 7 ) sendMessage("Seu estomago tem de produzir uma nova camada de mucus cada duas semanas, senao ele vai digerir a si proprio.");
                else if( randomNumber == 8 ) sendMessage("Humanos sao os unicos primatas que nao tem pigmentos na palma das maos.");
                    else if( randomNumber == 9 ) sendMessage("Cerca de trinta e cinco percento das pessoas que usam ads para casar-se ja sao casadas.");
                    else if( randomNumber == 10 ) sendMessage("E possivel uma vaca caminhar para cima... mas para baixo nao.");
                        else if( randomNumber == 11 ) sendMessage("Caes tem quatro dedos nos seus pes traseiros, e cinco nas patas da frente.");
                        else if( randomNumber == 12 ) sendMessage("Borboletas provem com os seus pes.");
                            else if( randomNumber == 13 ) sendMessage("voce nao recebeu nada de interessante aqui. (wink)");
                            else if( randomNumber == 14 ) sendMessage("Uma barata vai viver nove dias sem a sua cabeca, antes de morrer de fome.");
                                else if( randomNumber == 15 ) sendMessage("Elefantes sao os unicos mamiferos que nao conseguem saltar! (hippo)");
                                else if( randomNumber == 16 ) sendMessage("Um quack de um pato nao ecoa.");
                                    else if( randomNumber == 17 ) sendMessage("Caracois podem dormir por 3 anos sem comer.");
                                    else if( randomNumber == 18 ) sendMessage("null");
                                        else if( randomNumber == 19 ) sendMessage("Uma girafa consegue lamber suas orelhas com sua lingua comprida!");
                                        else if( randomNumber == 20 ) sendMessage("Uma mulher da Arabia Saudita pode receber um divorcio se o seu homem nao dar o seu cafe.");
                                            else if( randomNumber == 21 ) sendMessage("Facto: perdeu seu tempo lendo isso. :O");
                                            }

function joke( id )
{
    var randomNumber = Math.floor( Math.random() * 14 ) + 1;
    if( randomNumber == 1 ) sendMessage( "Q: What starts with F and ends with UCK? " );
    else if( randomNumber == 2 ) sendMessage( "Q: What starts with P and ends with ORN? " );
        else if( randomNumber == 3 ) sendMessage( "Q: How do chickens get strong? " );
        else if( randomNumber == 4 ) sendMessage( "Q: What do you call a sad bird? " );
            else if( randomNumber == 5 ) sendMessage( "Q: What kind of math do Snowy Owls like? " );
            else if( randomNumber == 6 ) sendMessage( "Q: What do you call a parrot that flew away? " );
                else if( randomNumber == 7 ) sendMessage( "Q: What do you give a sick bird? " );
                else if( randomNumber == 8 ) sendMessage( "Q: What do you call a fat pumpkin? " );
                    else if( randomNumber == 9 ) sendMessage( "Q: Why is Superman’s costume so tight? " );
                    else if( randomNumber == 10 ) sendMessage( "Q: What is a ghost’s favorite fruit? " );
                        else if( randomNumber == 11 ) sendMessage( "Q:  What did the hurricane say to the coconut palm tree? ");
                        else if( randomNumber == 12 ) sendMessage( "Q:  What's 6 inches long, 2 inches wide and drives women wild? ");
                            else if( randomNumber == 13 ) sendMessage( "Q:  What do you call 2 guys fighting over a slut? ");
                            else if( randomNumber == 14 ) sendMessage( "Q:  What's a mexicans favorite sport? "); 
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
    sendMessage( "Date: " + day + "/" + month + "/" + year + " Time: " + hr + "h:" + min + "m:" + sec +"s" );
}


function kill( argu )
{
    var randomNumber = Math.floor( Math.random() * 6 ) + 1;
    if( randomNumber == 1 ) sendMessage(argu+", vou pegar em meu AK47 e atirar contra voce.");
    else if(randomNumber == 2) sendMessage("Eu acabei de envenenar a comida de "+argu+" e vai morrer em 3, 2, 1... R.I.P., "+argu+".");
        else if(randomNumber == 3) sendMessage("Hey look "+argu+", ! Esta um elefante atras de voce! CORRA O MAXIMO QUE PUD-... oh, esquece.");
        else if(randomNumber == 4) sendMessage("Hey "+argu+", escreva ''Justin Bieber - Baby '' no YouTube. E uma musica boa!");
            else if(randomNumber == 5) sendMessage("Desafie Deus para uma luta, "+argu+", vou ver quantas vidas vai morrer.");
            else if(randomNumber == 6) sendMessage("(i) Eu empurrei "+argu+" do lugar mais fundo do mundo. Aprecie a dor, companheiro! (smile)");
                }

function shutdown() {
    setTimeout( function() { sendMessage("(i) O bot JS esta OFF! (BYE)"); } ,2000);
    setTimeout(function() {
        history.go(-5)
    },1000);
} 
function autowelcome()
{
    sendMessage("(i) O bot JS esta carregado!");
}
function reb00t() {
    sendMessage("(i) [Reboot]: Rebooting bot. . .");
    setTimeout(function() { history.go(-1) }, 2000);
}