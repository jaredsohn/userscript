// ==UserScript==
// @name          Flood
// @namespace     http://userscripts.org/users/88933
// @author        Velocity
// @description	  test of description here
// @version       1.01
// @include       http://teenchat.com
// @include       http://chat.optichat.com/optichat.html?oc_room=Cyber%20Chat&oc_dyn=1&oc_id=*
// ==/UserScript==


void(parent.main.control.document.body.innerHTML="<div class='counter'><span id='counter'>5000 Characters left</span></div><div class='functions'> AutoScroll <input class='checkbox' type='checkbox' id='autoscroll' checked='1' /> ----- <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.oc_code.q.refresh();' Value='Clear Chat' /> ------ <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.oc_code.recall_last();' Value='Recall Line' /> ------ <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.spam();' Value='Spam' /> ----- <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.stop();' Value='Stop' /> ----- <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.sendiftalk(parent.parent.getindexdiv());' Value='Auto-respond' /> ----- <input style='background-color:#282828;color:white;border:1px solid black;' type='button' onClick='parent.parent.view_log(parent.parent.post_array);' Value='View Chat Log' /></div><textarea name='oc_input' id='oc_input' class='maininput' onkeyup='count(this,5000);'onkeydown='count(this, 5000); return getKey(event, this);'></textarea>");


function getindexdiv() {
	for (u=0;u<50000;u++) {
		if (typeof(parent.main.chat.document.getElementsByTagName('div')[u]) == "undefined") {
			break;
			}
		}
	return u;
	}
function sendiftalk(i) {
if (parent.main.control.document.getElementById('oc_input').value != "stop") {
	for (u=i;u<50000;u++) {
	var pause_between = false;
	var check_new_message = false;
	if (typeof(parent.main.chat.document.getElementsByTagName('div')[u]) != "undefined") {
		if (parent.main.chat.document.getElementsByTagName('div')[u].getAttribute('class') == 'post') { 
			var f = parent.main.chat.document.getElementsByTagName('div')[u];
			if (f.getElementsByTagName('div')[1]) {
				if(f.getElementsByTagName('div')[1].getAttribute('class') == "postdiv highlight_to_me") {
				o= f.getElementsByTagName('div')[1].innerHTML;
				o = o.replace(/<span class=\"private_msg\">Whispers to you: <\/span>/,"");
				o = o.replace(/<span class=\"public_msg\">Says to you: <\/span>/,"");
				o = o.replace(/<\/div>/g,"");
				o = o.replace(/<span class=\"username\">/g,"");
				o = o.replace(/<span class=\"usernumber\">/g,"");
				o = o.replace(/<\/span>/g,"");
				o = o.replace(/<wbr>/g,"");
				o = o.replace(/<i style=\"(.*?);\">(.*?)<\/i>/g,"$2");
				o = o.replace(/<span style=\"(.*?);\">(.*?)/g,"$2");
				o = o.replace(/<i>(.*?)<\/i>/g,"$1");
				o = o.replace(/<a href=\"(.*?)\" target=\"(.*?)\">(.*?)<\/a>/g,"$1");
				o = o.replace(/\&amp;/g, "&");
				o = o.replace(/\&gt;/g, ">");
				o = o.replace(/\&lt;/g, "<");
				parent.parent.oc_code.SendMessage("/"+f.getElementsByTagName('span')[1].innerHTML+" Hello, you either whispered me, or sent me a message, or referenced my user number. The message you said was: "+o);
				pause_between = true;
				break;
					}
				}
			}
		}
		else {
			check_new_message = true;
			break;
			}
	}
	if (check_new_message === true) {
		pause2(u);
		}
	if (pause_between === true) {
	pause(u+2);
	}
}
else {
parent.parent.oc_code.m_add_sysmsg(["You've stopped auto-responding."]);
}
		}

function pause(i) {
	setTimeout(function(){sendiftalk(i)}, 3900);
	}
function pause2(i) {
	setTimeout(function(){sendiftalk(i)}, 3900);
	}
function stop() {
	parent.main.control.document.getElementById('oc_input').value = "stop";
	}
function spam() {
	if (parent.main.control.document.getElementById('oc_input').value != "stop") {
	parent.parent.oc_code.SendMessage(spam_array(parent.main.control.document.getElementById('oc_input').value));
	pause3();
		}
	else {
		parent.parent.oc_code.m_add_sysmsg(["You've stopped spamming."]);
		}
	}
function pause3() {
	setTimeout("spam()", 3800);
	}
function rand() {
	a = "";
	alp = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","Z","Y","Z","1","2","3","4","5","6","7","8","9","0"];
	for (i=0;i<5;i++) {
		r = Math.floor(Math.random()*(alp.length));
		a += alp[r];
		}
	return a;
	}
function color() {
	colors = ["ydm","kwtss","pbjt","tc","smtm","ily","iat","fp","eg","sc","potg","ppp","smh","smb","siap","ktoti","jimp","csb","tob","mcu","fmls","lwtb","bftw","clav","gg", "taco"];
	r = Math.floor(Math.random()*(colors.length));
	return colors[r];
	}
function emote() {
	emotes = ["xD","-.-;","O.O","o.o;;",".___.","^___^","~^_^~","._.",">.>;;","O.o","C:",":3",";D","u_u","n_n","(>^_^>)","=.=",".-.",";o","x3",";3",";_;",";-*"];
	r = Math.floor(Math.random()*(emotes.length));
	return emotes[r];
	}
function number() {
	if (parent.main.control.document.getElementById('oc_input').value.search(/\+/) != -1) {
		a = parent.main.control.document.getElementById('oc_input').value.split("+");
		a = parseInt(a);
		}
	else {
		a = 50;
		}	
	return Math.floor(Math.random()*a)+1;
	}
function swear() {
	swears = ["assbagger","assblaster","assclown","asscowboy","asses","assfuck","assfucker","asshat","asshole","assholes","asshore","assjockey","asskiss","asskisser","assklown","asslick","asslicker","asslover","assman","assmonkey","assmunch","assmuncher","asspacker","asspirate","asspuppies","assranger","asswhore","asswipe","athletesfoot","attack","australian","babe","babies","backdoor","backdoorman","backseat","badfuck","balllicker","balls","ballsack","banging","baptist","barelylegal","barf","barface","barfface","bast","bastard","bazongas","bazooms","beaner","beast","beastality","beastial","beastiality","beatoff","beat-off","beatyourmeat","beaver","bestial","bestiality","bi","biatch","bible","bicurious","bigass","bigbastard","bigbutt","bigger","bisexual","bi-sexual","bitch","bitcher","bitches","bitchez","bitchin","bitching","bitchslap","bitchy","biteme","black","blackman","blackout","blacks","blind","blow","blowjob","boang","bogan","bohunk","bollick","bollock","bomb","bombers","bombing","bombs","bomd","bondage","boner","bong","boob","boobies","boobs","booby","boody","boom","boong","boonga","boonie","booty","bootycall","bountybar","bra","brea5t","breast","breastjob","breastlover","breastman","brothel","bugger","buggered","buggery","bullcrap","bulldike","bulldyke","bullshit","bumblefuck","bumfuck","bunga","bunghole","buried","burn","butchbabes","butchdike","butchdyke","butt","buttbang","butt-bang","buttface","buttfuck","butt-fuck","buttfucker","butt-fucker","buttfuckers","butt-fuckers","butthead","buttman","buttmunch","buttmuncher","buttpirate","buttplug","buttstain","byatch","cacker","cameljockey","cameltoe","canadian","cancer","carpetmuncher","carruth","catholic","catholics","cemetery","chav","cherrypopper","chickslick","children's","chin","chinaman","chinamen","chinese","chink","chinky","choad","chode","christ","christian","church","cigarette","cigs","clamdigger","clamdiver","clit","clitoris","clogwog","cocaine","cock","cockblock","cockblocker","cockcowboy","cockfight","cockhead","cockknob","cocklicker","cocklover","cocknob","cockqueen","cockrider","cocksman","cocksmith","cocksmoker","cocksucer","cocksuck","cocksucked","cocksucker","cocksucking","cocktail","cocktease","cocky","cohee","coitus","color","colored","coloured","commie","communist","condom","conservative","conspiracy","coolie","cooly","coon","coondog","copulate","cornhole","corruption","cra5h","crabs","crack","crackpipe","crackwhore","crack-whore","crap","crapola","crapper","crappy","crash","creamy","crime","crimes","criminal","criminals","crotch","crotchjockey","crotchmonkey","crotchrot","cum","cumbubble","cumfest","cumjockey","cumm","cummer","cumming","cumquat","cumqueen","cumshot","cunilingus","cunillingus","cunn","cunnilingus","cunntt","cunt","cunteyed","cuntfuck","cuntfucker","cuntlick","cuntlicker","cuntlicking","cuntsucker","cybersex","cyberslimer","dago","dahmer","dammit","damn","damnation","damnit","darkie","darky","datnigga","dead","deapthroat","death","deepthroat","defecate","dego","demon","deposit","desire","destroy","deth","devil","devilworshipper","dick","dickbrain","dickforbrains","dickhead","dickless","dicklick","dicklicker","dickman","dickwad","dickweed","diddle","die","died","dies","dike","dildo","dingleberry","dink","dipshit","dipstick","dirty","disease","diseases","disturbed","dive","dix","dixiedike","dixiedyke","doggiestyle","doggystyle","dong","doodoo","doo-doo","doom","dope","dragqueen","dragqween","dripdick","drug","drunk","drunken","dumb","dumbass","dumbbitch","dumbfuck","dyefly","dyke","easyslut","eatballs","eatme","eatpussy","ecstacy","ejaculate","ejaculated","ejaculating","ejaculation","enema","enemy","erect","erection","ero","escort","ethiopian","ethnic","european","evl","excrement","execute","executed","execution","executioner","explosion","facefucker","faeces","fag","fagging","faggot","fagot","failed","failure","fairies","fairy","faith","fannyfucker","fart","farted","farting","farty","fastfuck","fat","fatah","fatass","fatfuck","fatfucker","fatso","fckcum","fear","feces","felatio","felch","felcher","felching","fellatio","feltch","feltcher","feltching","fetish","fight","filipina","filipino","fingerfood","fingerfuck","fingerfucked","fingerfucker","fingerfuckers","fingerfucking","fire","firing","fister","fistfuck","fistfucked","fistfucker","fistfucking","fisting","flange","flasher","flatulence","floo","flydie","flydye","fok","fondle","footaction","footfuck","footfucker","footlicker","footstar","fore","foreskin","forni","fornicate","foursome","fourtwenty","fraud","freakfuck","freakyfucker","freefuck","fu","fubar","fuc","fucck","fuck","fucka","fuckable","fuckbag","fuckbuddy","fucked","fuckedup","fucker","fuckers","fuckface","fuckfest","fuckfreak","fuckfriend","fuckhead","fuckher","fuckin","fuckina","fucking","fuckingbitch","fuckinnuts","fuckinright","fuckit","fuckknob","fuckme","fuckmehard","fuckmonkey","fuckoff","fuckpig","fucks","fucktard","fuckwhore","fuckyou","fudgepacker","fugly","fuk","fuks","funeral","funfuck","fungus","fuuck","gangbang","gangbanged","gangbanger","gangsta","gatorbait","gay","gaymuthafuckinwhore","gaysex","geez","geezer","geni","genital","german","getiton","gin","ginzo","gipp","girls","givehead","glazeddonut","gob","god","godammit","goddamit","goddammit","goddamn","goddamned","goddamnes","goddamnit","goddamnmuthafucker","goldenshower","gonorrehea","gonzagas","gook","gotohell","goy","goyim","greaseball","gringo","groe","gross","grostulation","gubba","gummer","gun","gyp","gypo","gypp","gyppie","gyppo","gyppy","hamas","handjob","hapa","harder","hardon","harem","headfuck","headlights","hebe","heeb","hell","henhouse","heroin","herpes","heterosexual","hijack","hijacker","hijacking","hillbillies","hindoo","hiscock","hitler","hitlerism","hitlerist","hiv","ho","hobo","hodgie","hoes","hole","holestuffer","homicide","homo","homobangers","homosexual","honger","honk","honkers","honkey","honky","hook","hooker","hookers","hooters","hore","hork","horn","horney","horniest","horny","horseshit","hosejob","hoser","hostage","hotdamn","hotpussy","hottotrot","hummer","husky","hussy","hustler","hymen","hymie","iblowu","idiot","ikey","illegal","incest","insest","intercourse","interracial","intheass","inthebuff","israel","israeli","israel's","italiano","itch","jackass","jackoff","jackshit","jacktheripper","jade","jap","japanese","japcrap","jebus","jeez","jerkoff","jesus","jesuschrist","jew","jewish","jiga","jigaboo","jigg","jigga","jiggabo","jigger","jiggy","jihad","jijjiboo","jimfish","jism","jiz","jizim","jizjuice","jizm","jizz","jizzim","jizzum","joint","juggalo","jugs","junglebunny","kaffer","kaffir","kaffre","kafir","kanake","kid","kigger","kike","kill","killed","killer","killing","kills","kink","kinky","kissass","kkk","knife","knockers","kock","kondum","koon","kotex","krap","krappy","kraut","kum","kumbubble","kumbullbe","kummer","kumming","kumquat","kums","kunilingus","kunnilingus","kunt","ky","kyke","lactate","laid","lapdance","latin","lesbain","lesbayn","lesbian","lesbin","lesbo","lez","lezbe","lezbefriends","lezbo","lezz","lezzo","liberal","libido","licker","lickme","lies","limey","limpdick","limy","lingerie","liquor","livesex","loadedgun","lolita","looser","loser","lotion","lovebone","lovegoo","lovegun","lovejuice","lovemuscle","lovepistol","loverocket","lowlife","lsd","lubejob","lucifer","luckycammeltoe","lugan","lynch","macaca","mad","mafia","magicwand","mams","manhater","manpaste","marijuana","mastabate","mastabater","masterbate","masterblaster","mastrabator","masturbate","masturbating","mattressprincess","meatbeatter","meatrack","meth","mexican","mgger","mggor","mickeyfinn","mideast","milf","minority","mockey","mockie","mocky","mofo","moky","moles","molest","molestation","molester","molestor","moneyshot","mooncricket","mormon","moron","moslem","mosshead","mothafuck","mothafucka","mothafuckaz","mothafucked","mothafucker","mothafuckin","mothafucking","mothafuckings","motherfuck","motherfucked","motherfucker","motherfuckin","motherfucking","motherfuckings","motherlovebone","muff","muffdive","muffdiver","muffindiver","mufflikcer","mulatto","muncher","munt","murder","murderer","muslim","naked","narcotic","nasty","nastybitch","nastyho","nastyslut","nastywhore","nazi","necro","negro","negroes","negroid","negro's","nig","niger","nigerian","nigerians","nigg","nigga","niggah","niggaracci","niggard","niggarded","niggarding","niggardliness","niggardliness's","niggardly","niggards","niggard's","niggaz","nigger","niggerhead","niggerhole","niggers","nigger's","niggle","niggled","niggles","niggling","nigglings","niggor","niggur","niglet","nignog","nigr","nigra","nigre","nip","nipple","nipplering","nittit","nlgger","nlggor","nofuckingway","nook","nookey","nookie","noonan","nooner","nude","nudger","nuke","nutfucker","nymph","ontherag","oral","orga","orgasim","orgasm","orgies","orgy","osama","paki","palesimian","palestinian","pansies","pansy","panti","panties","payo","pearlnecklace","peck","pecker","peckerwood","pee","peehole","pee-pee","peepshow","peepshpw","pendy","penetration","peni5","penile","penis","penises","penthouse","period","perv","phonesex","phuk","phuked","phuking","phukked","phukking","phungky","phuq","pi55","picaninny","piccaninny","pickaninny","piker","pikey","piky","pimp","pimped","pimper","pimpjuic","pimpjuice","pimpsimp","pindick","piss","pissed","pisser","pisses","pisshead","pissin","pissing","pissoff","pistol","pixie","pixy","playboy","playgirl","pocha","pocho","pocketpool","pohm","polack","pom","pommie","pommy","poo","poon","poontang","poop","pooper","pooperscooper","pooping","poorwhitetrash","popimp","porchmonkey","porn","pornflick","pornking","porno","pornography","pornprincess","pot","poverty","premature","pric","prick","prickhead","primetime","propaganda","pros","prostitute","protestant","pu55i","pu55y","pube","pubic","pubiclice","pud","pudboy","pudd","puddboy","puke","puntang","purinapricness","puss","pussie","pussies","pussy","pussycat","pussyeater","pussyfucker","pussylicker","pussylips","pussylover","pussypounder","pusy","quashie","queef","queer","quickie","quim","ra8s","rabbi","racial","racist","radical","radicals","raghead","randy","rape","raped","raper","rapist","rearend","rearentry","rectum","redlight","redneck","reefer","reestie","refugee","reject","remains","rentafuck","republican","rere","retard","retarded","ribbed","rigger","rimjob","rimming","roach","robber","roundeye","rump","russki","russkie","sadis","sadom","samckdaddy","sandm","sandnigger","satan","scag","scallywag","scat","schlong","screw","screwyou","scrotum","scum","semen","seppo","servant","sex","sexed","sexfarm","sexhound","sexhouse","sexing","sexkitten","sexpot","sexslave","sextogo","sextoy","sextoys","sexual","sexually","sexwhore","sexy","sexymoma","sexy-slim","shag","shaggin","shagging","shat","shav","shawtypimp","sheeney","shhit","shinola","shit","shitcan","shitdick","shite","shiteater","shited","shitface","shitfaced","shitfit","shitforbrains","shitfuck","shitfucker","shitfull","shithapens","shithappens","shithead","shithouse","shiting","shitlist","shitola","shitoutofluck","shits","shitstain","shitted","shitter","shitting","shitty","shoot","shooting","shortfuck","showtime","sick","sissy","sixsixsix","sixtynine","sixtyniner","skank","skankbitch","skankfuck","skankwhore","skanky","skankybitch","skankywhore","skinflute","skum","skumbag","slant","slanteye","slapper","slaughter","slav","slave","slavedriver","sleezebag","sleezeball","slideitin","slime","slimeball","slimebucket","slopehead","slopey","slopy","slut","sluts","slutt","slutting","slutty","slutwear","slutwhore","smack","smackthemonkey","smut","snatch","snatchpatch","snigger","sniggered","sniggering","sniggers","snigger's","sniper","snot","snowback","snownigger","sob","sodom","sodomise","sodomite","sodomize","sodomy","sonofabitch","sonofbitch","sooty","sos","soviet","spaghettibender","spaghettinigger","spank","spankthemonkey","sperm","spermacide","spermbag","spermhearder","spermherder","spic","spick","spig","spigotty","spik","spit","spitter","splittail","spooge","spreadeagle","spunk","spunky","squaw","stagg","stiffy","strapon","stringer","stripclub","stroke","stroking","stupid","stupidfuck","stupidfucker","suck","suckdick","sucker","suckme","suckmyass","suckmydick","suckmytit","suckoff","suicide","swallow","swallower","swalow","swastika","sweetness","syphilis","taboo","taff","tampon","tang","tantra","tarbaby","tard","teat","terror","terrorist","teste","testicle","testicles","thicklips","thirdeye","thirdleg","threesome","threeway","timbernigger","tinkle","tit","titbitnipply","titfuck","titfucker","titfuckin","titjob","titlicker","titlover","tits","tittie","titties","titty","tnt","toilet","tongethruster","tongue","tonguethrust","tonguetramp","tortur","torture","tosser","towelhead","trailertrash","tramp","trannie","tranny","transexual","transsexual","transvestite","triplex","trisexual","trojan","trots","tuckahoe","tunneloflove","turd","turnon","twat","twink","twinkie","twobitwhore","uck","uk","unfuckable","upskirt","uptheass","upthebutt","urinary","urinate","urine","usama","uterus","vagina","vaginal","vatican","vibr","vibrater","vibrator","vietcong","violence","virgin","virginbreaker","vomit","vulva","wab","wank","wanker","wanking","waysted","weapon","weenie","weewee","welcher","welfare","wetb","wetback","wetspot","whacker","whash","whigger","whiskey","whiskeydick","whiskydick","whit","whitenigger","whites","whitetrash","whitey","whiz","whop","whore","whorefucker","whorehouse","wigger","willie","williewanker","willy","wn","wog","women's","wop","wtf","wuss","wuzzie","xtc","xxx","yankee","yellowman","zigabo","zipperhead"];
	r = Math.floor(Math.random()*(swears.length));
	return swears[r];
	}
function spam_array(a) {
	if (a.search(/\+/) != -1) {
		a = a.split("+");
		a = a[1].split(";");
		}
	else {
		a = a.split(";");
		}
	ra = Math.floor(Math.random()*(a.length-1));
	str = "";
	for (var i in a[ra]) {
		str += a[ra][i].replace(/\*/,swear()).replace(/%/,rand()).replace(/\^/,emote()).replace(/@/,color()).replace(/\$/,number());
		}
	return str;
	}
	

function log_chat(i,arr) {
	if (i > 300) {
		i = 31;
		parent.parent.oc_code.q.refresh();
		}
	for (u=i;u<400;u++) {
	var check_new_message = false;
	if (typeof(parent.main.chat.document.getElementsByTagName('div')[u]) != "undefined") {
		if (parent.main.chat.document.getElementsByTagName('div')[u].getAttribute('class') == 'post') { 
			var f = parent.main.chat.document.getElementsByTagName('div')[u];
			arr.push("<div class=\"post\">"+f.innerHTML+"</div>");
			}
			}
		else {
			check_new_message = true;
			break;
			}
		

	}
		if (check_new_message === true) {
		pause4(u,arr);
		}
}

function pause4(i,arr) {
	setTimeout(function(){log_chat(i,arr)}, 3000);
	}

var post_array = new Array();
log_chat(0,post_array);



function view_log(arr)
{
my_window= window.open ("", "mywindow1","status=1,width=650,height=350");
  my_window.document.write("<html class='chat'><head><style type=\'text/css\'>* { padding: 0; margin: 0; }span.username {    color: #00d8ff;    font-family: Verdana, Arial, sans-serif;    font-size:12px;}span.usernumber {    color: #fbe420;    font-family: Arial, sans-serif, Verdana;    font-size: 10px;    vertical-align:-1px;    padding-left: 1px;    padding-right: 1px;}html.chat {    height: 100%;    overflow-y: scroll;}body.chat {    background-color: #000000;    color: #f6b2f6;    font-family: Arial, sans-serif, Verdana;    font-size: 12px;}body.chat a {    color: #FF00FF;}body.chat div.userin {    color: #FF00FF;    margin-left: 156px;}body.chat div.userout {    color: #e0833b;    margin-left: 156px;}body.chat div.post {    clear: both;    border-bottom: solid 1px #170915;}body.chat div.namediv {    text-align: right;    float: left;    width: 150px;}body.chat div.postdiv {    color: #f6b2f6;    margin-left: 154px;}body.chat div.actiontag {    text-align: right;    float: left;    padding-right: 1px;    width: 150px;    color: #fbe420;}body.chat div.actionline {    color: #f6b2f6;    padding-left: 1px;    margin-left: 156px;}body.chat span.actionborders {    color: #fbe420;}body.chat span.public_msg {    color: #00f506;    padding-right: 3px;    padding-left:2px;}body.chat span.public_msg span {    font-weight:normal;}body.chat span.private_msg {    color: #fbe420;    padding-right: 3px;    padding-left:2px;}body.chat span.private_msg span {    font-weight:normal;}body.chat div.highlight_to_me {    background-color: #22091e;}body.chat div.highlight_from_me {    background-color: #1d0d2d;}span.dan {    color: #00FD00;    font-weight: bold;}span.dan_away {    color: #00A400;    font-weight: normal;}</style>
</head><body class=\'chat\'>");
for (i=0;i<arr.length;i++) {
	my_window.document.write(arr[i]+"\n");
}

my_window.document.write("<br /><h1>Total Posts:"+i+"</h1></body></html>");
}
