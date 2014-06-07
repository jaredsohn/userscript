// ==UserScript==
// @name           ScoreHero - RB2 All Star Cutoffs
// @version        1.37
// @namespace      http://userscripts.org/users/86247
// @description    Adds a field to show the each star cutoff on Scorehero: RockBand 2.
// @description    Song dated updated to DLC release of 30 June 2009 (Foreigner, et al.)
// @include        http://rockband.scorehero.com/manage_scores.php?*
// @include        http://rockband.scorehero.com/scores.php?*
// @include        http://rockband.scorehero.com/compare.php?*
// @author         based on original code of Jason MacLean
// @author         modified by qirex
// @author         modified by GuestWednesday
// @author		   maintained by de1337ed
// @author         updated by NoahTheDuke
// @author		   updated by Kajota  15 Feb 2009 - updated whichever songs will updated automatically
// ==/UserScript==
// 


var num_close_to_cutoff_songs_to_keep = 5;	// this is the total number of scores for 4/5/6 star cut-offs to keep. 5 keeps 15 total.	
var num_gold_close_to_cutoff_to_show = 5;   // must be less than or equal to num_close_to_cutoff_songs_to_keep
											// this is the number of scores to highlight that are close to gold
var num_five_close_to_cutoff_to_show = 0;	// must be less than or equal to num_close_to_cutoff_songs_to_keep
											// this is the number of scores to highlight that are close to five
var num_four_close_to_cutoff_to_show = 0;	// must be less than or equal to num_close_to_cutoff_songs_to_keep
											// this is the number of scores to highlight that are close to four


// Replace all non numeric characters with empty strings
var base_scores = new Array();
function removeNonNumbers(strValue) 
{
   return strValue.replace(/[^0-9]/g,'');
}

function showCloseToGold()
{

	alert("button works");


}

// Format an integer with commas
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) 
	{
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

function removeOddChars(nStr)
{
	if(nStr == 'limelight (original version)')
	{
		return 'limelight2';
	}
	if(nStr == 'snow ((hey oh))')
	{
		return 'snowheyoh';
	}
	if(nStr == 'working man (vault edition)')
	{
		return 'workingman2';
	}
	if(nStr == 'd.o.a')
	{
		return 'doa';
	}
	if(nStr == 'doa')
	{
		return 'doafoos';
	}
	if(nStr == 'working man (vault edition)' )
	{
		return 'workingman2';
	}
	if(nStr == 'tom sawyer (original version)')
	{
		return 'tomsawyer2';
	}
	if(nStr == 'testify (dlc)')
//	if(nStr.indexOf('testify') !=-1 && nStr.indexOf('dlc' ) !=-1)
	{
		return 'testifysrv';
	}
//	if(nStr.indexOf('can\'t let go') !=-1 && nStr.indexOf('dlc' ) !=-1)
	if(nStr == 'can\'t let go (dlc)')
	{
		return 'cantletgolucinda';
	}
	if(nStr == 'alive (live: drop in the park)')
	{
		return 'alivelive';
	}
	if(nStr == 'for those about to rock (we salute you) (live)')
	{
		return 'forthoseabouttorocklive';
	}
	if(nStr == 'the number of the beast (original version)' )
	{
		return 'numberofthebeast2';
	}
	if(nStr.indexOf('hey john') !=-1 && nStr.indexOf('your name again' ) !=-1)
	{
		return 'heyjohnwhatsyournameagain';
	}
	if(nStr.indexOf('powerful') !=-1 && nStr.indexOf('wizard' ) !=-1)
	{
		return 'ididntsayiwas';
	}


	nStr = nStr.split('\'').join('');
	nStr = nStr.split('/').join('');
	nStr = nStr.split('-').join('');
	nStr = nStr.split('&').join('and');
	nStr = nStr.split('*').join('');
	nStr = nStr.split('?').join('');
	nStr = nStr.split('.').join('');
	nStr = nStr.split(',').join('');
	nStr = nStr.split('!').join('');
	nStr = nStr.split('#').join('');
	nStr = nStr.split(']').join('');
	nStr = nStr.split('[').join('');
	nStr = nStr.split('\’').join('');

	if(nStr.indexOf('(live)') == -1)   // if the song has something in parenthesis that's not 'live' remove it
	{
		nStr = nStr.replace(/\(.*?\)/,'');  // remove parenthsis and what's in them.
	}
	else if(nStr.indexOf('(live)') != -1)  // if it's live leave 'live' in and remove the parethesis
	{
		nStr = nStr.split('(live)').join('live');
	}
	nStr = nStr.split(' ').join('');

	return nStr;
}

function songs_closest_to_cutoff(name, diff, score, cutoff)
{
	this.name = name;
	this.diff = diff;
	this.score = score;
	this.cutoff = cutoff;
}

function diff_sort(a,b)
{
	return (b.diff - a.diff);

}

var searchString = document.location.search;
// strip off the leading '?'
searchString = searchString.substring(1);
var nvPairs = searchString.split("&");
for (i = 0; i < nvPairs.length; i++)
{
   var nvPair = nvPairs[i].split("=");
   if (nvPair[0]=='game')
   {
      var game = nvPair[1];
   } 
   else if (nvPair[0]=='group')
   {
      var group = nvPair[1];
   } 
   else if (nvPair[0]=='diff')
   {
      var diff = nvPair[1];
   } 
   else if (nvPair[0]=='size')
   {
      var size = nvPair[1];
   } 
   else if (nvPair[0]=='platform')
   {
      var platform = nvPair[1];
   }
}

GM_log('game = ' + game + ', group = ' + group + ', diff = ' + diff + ', size = ' + size + ', platform = ' + platform);

// Exit if difficulty isn't expert or hard
//if (diff<3) return;
//if(group==4) return;  // this script doesn't support vocals at this time.

// Exit if game isn't Rock Band 2
if (game!=2) return;

var instrument 				= ["","Guitar","Bass","Drums","Vocals"];
var one_star_cuttoff_mult 	= [0, 0.21, 0.21, 0.21, 0.21];
var two_star_cuttoff_mult 	= [0, 0.46, 0.50, 0.46, 0.46];
var three_star_cuttoff_mult = [0, 0.77, 0.90, 0.77, 0.77];
var four_star_cuttoff_mult 	= [0, 1.85, 2.77, 1.85, 1.85];
var five_star_cuttoff_mult 	= [0, 3.08, 4.62, 3.08, 3.08];
var gold_star_cuttoff_mult 	= [0, 4.52, 6.78, 4.29, 4.18];

var one_star_cuttoff_mult_ps2 	= [0, 0.21, 0.32, 0.21, 0.21];
var two_star_cuttoff_mult_ps2 	= [0, 0.46, 0.69, 0.46, 0.46];
var three_star_cuttoff_mult_ps2 = [0, 0.77, 1.15, 0.77, 0.77];
var four_star_cuttoff_mult_ps2 	= [0, 1.86, 2.76, 1.86, 1.86];
var five_star_cuttoff_mult_ps2 	= [0, 3.10, 4.60, 3.10, 3.10];
var gold_star_cuttoff_mult_ps2 	= [0, 4.20, 6.20, 4.20, 4.20];

var songs = ["100000years","21guns","21stcenturydigitalboy","29fingers","2minutestomidnight","3dimesdown","3sand7s","abc","aboutagirl","accidentallyinlove","aceofspades08","aceshighlive","acleanshot","action","adamssong","adaylikethis","aestheticsofhate","afavorhouseatlantic","afterlife","ajaggedgorgeouswinter","alabamagetaway","alexchilton","aliensexist","alive","alivelive","allgoingouttogether","alliwant","allmixedup","allmylife","alloveragain","allrightnow","allthesmallthings","allthethingsthatgotomakeheavenandearth","almosteasy","aloneinmyhead","alookinginview","alotlikeme","amazingjourney","america","americangirl","americanwoman","amongstthewaves","andjusticeforall","andres","andshewas","anotheronebitesthedust","anymanofmine","anywayyouwantit","apacherosepeacock","apunk","aqualung","areyoudeadyet","areyougonnabemygirl","areyougonnagomyway","ashestofire","athingaboutyou","attack","awomaninlovelive","babaoriley","backfromthedead","backinblacklive","badluck","badomen","badreputation","badtothebone","ballroomblitz","bandages","bandontherunlive","bangagong","batcountry","bathwater","battery","beautifulthieves","beerformyhorses","beethovensc","beetlebum","behindblueeyes","thebestdayever","bestofme","bestofyou","better","beverlyhills","bigbottom","billiondollarbabies","black","blackened","blackfriday","blackholesun","blackmagic","blacksunshine","blew","blindedbyfear","blitzkriegbop","blooddoll","bloodstone","bloodsugarsexmagik","bluechristmas","bluecollarman","bluejeans","bluemorningblueday","bluesky","bodhisattva","bodyioccupy","bounce","theboysarebackintownlive","brainpower","brassinpocket","breakdownlive","breakingthegirl","breakmyheart","breakout","breed","bringmetolife","brother","buddyholly","buildabridge","bulletsandguns","bullsonparade","burn","burnrz","burnyoudown","byebyelove","byob","californiauberalles","callingdrlove","callme","callmewhenyouresober","thecameraeye","caniplaywithmadness","cantletgo","cantletgolucinda","cantstandlosingyou","cantstoprockin","capitalg","capricididiablo","carryonwaywardson","caseyjones","catcherintherye","celebrityskin","centurycitylive","charlene","checkmybrain","checkyesjuliet","cheeseburgerinparadise","cherrybomb","cherubrock","chestfeverlive","chinacatsunflower","chinesedemocracy","chiron","chopsuey","christiansinferno","christmasisthetimetosayiloveyou","claudette","clinteastwood","closer","closertotheheart","cloudsovercalifornia","clubfoot","cmoncmon","coldrainandsnow","thecollector","colonyofbirchmen","comeasyouarelive","comeoutandplay","completecontrol","conquerall","constantmotion","conventionallover","coolforcats","countdowntoinsanity","cowboysonglive","crackityjones","crash","crawl","crazylittlething","crazytuesday","creamandbastardsrise","creep","creepinupthebackstairs","criticalacclaim","crocodilerock","crosseyedandpainless","crushcrushcrush","crylonely","cupsandcakes","cuzurnext","dammit","damnationgame","danceepidemic","danicalifornia","databasecorrupted","datewiththenight","dawnpatrol","daylatedollarshort","dead","deadleavesdirtyground","deadonarrival","debaser","deep","deluxe","desperatetimesdesperatemeasures","detroitrockcity","deuce","devilschild","devilsisland","devour","diaryofjane","dieallright","dig","dirtydeedsdonedirtcheaplive","dirtylittlesecret","dirtypool","disposableteens","dissidentaggressorlive","doa","doafoos","dointhatrag","doll","dontchastop","donteasemein","thereaper","dontgoawaymad","dontlookbackinanger","dontmakemewait","dontspeak","dontstop","dontstopbelieving","donttellme","donttellmeyouloveme","down","downatthewhisky","downwiththesickness","doyouwantto","dragula","draintheblood","drainyou","dreamin","dreamingoflove","dreamingofyou","drfeelgood","duality","dunebuggy","eastjesusnowhere","eatmealivelive","electriccrown","electricversion","elscorcho","embedded","eminencefront","empireofthegun","employeeofthemonth","endtransmission","enoughspace","entangled","entersandman","epic","epro","evenflow","eventhelosers","everfalleninlove","everlong","everylittlething","excusememr","exgirlfriend","eyeofthetiger","facedowninthedirt","fakefriends","fatbottomedgirls","fearofthedarklive","featherpluckn","februarystars","feedthetree","feelgoodinc","feelingthis","feelslikethefirsttime","feelthepain","fever","fire","fireonthemountain","fireyourgunslive","firstdate","fivemagics","flathead","flirtinwithdisaster","floaton","flowerpeople","forceofnature","foreplaylongtime","foreplaylongtimeshort","forever","forthoseabouttorocklive","fortunateson","franklinstower","freeandeasy","freedomtrain","freefallin","funk49","funkymonks","funkysexfarm","futures","garden","gasoline","gaybar","geraldine","getclean","getiton","getready2rokk","getupsexmachinept1","getyourrockon","ghostbusters","gimmeshelter","gimmesomemoney","gimmethreesteps","girlfriendisbetter","girlsandboys","girlsnotgrey","girlsonfilm","girlswhoplayguitars","girluwant","girlyouhavenofaith","giveitall","giveitaway","giveittome","givesyouhell","godzilla","goingmobile","goingunderground","gone","gonemg","goneaway","gonnaseemyfriend","goodmourningblackfriday","goodtime","goodtimesroll","gotsome","gougeaway","gowiththeflow","goyourownway","grace","greengrassandhightides","greengrassshort","grind","guerrillaradio","gunpowderandlead","hadadad","hairofthedog","hallowedbethynamelive","hammerhead","hammersmashedface","handlebars","handmedownworld","handsdown","hangar18","hangingonthetelephone","hangyoufromtheheavens","hanukkahblessings","hardtohandle","haypocorocknroll","headknocker","headoverfeet","headphoneson","heartbreaker","heatseekerlive","heavenbesideyou","heavyduty","hellagood","hellaintabadplacetobelive","hellhole","hellinabucket","thehellionelectriceye","hellothere","hellsbellslive","henrietta","herecomesmygirl","herecomesyourman","hereitgoesagain","heroes","hey","heybaby","heydude","heyjohnnypark","heyjohnwhatsyournameagain","hierkommtalex","highvoltagelive","highwaystar","highwaytohelllive","hillbillydeluxe","hitcharide","hitmewithyourbestshot","holidayincambodia","holywars","hongkonggarden","howdoyoulikemenow","hungrylikethewolf","hymn43","hysteria","iaintsuperstitious","iamarock","ibleed","icantkeepmyeyesoffyou","icarus","ickythump","icouldhavelied","idealistictypes","ididntsayiwas","idiotsrule","idontcare","idontlikeyou","idontwanttogotoschool","ifiaintgotyou","ifoughtthelaw","iftheworld","ifyouhavetoask","igetby","iknowwhereyoucamefrom","illstickaround","ilovethisbar","imageoftheinvisible","imcryin","imeighteen","imgoneimgoing","imissyou","imshippingup","imsosick","inbloom","indestructible","indreams","ineedamiracle","insideout","insidethefire","interstatelovesong","intoodeep","imintouchwithyourworld","ipredictariot","ironic","ironmaidenlive","irs","istandalone","ithinkimparanoid","ithurts","itoldyouso","itsmylife","iv","iwannabeyourman","iwantitall","iwanttobreakfree","iwantyouback","iwantyouto","iwaswrong","iwillnotbow","iwontbackdown","jailbreaklive","jailbreaklivethinlizzy","jamminme","janesays","jeremy","jesuschristpose","jetlive","johnnyguitar","jokerandthethief","jukeboxhero","junkiesforfame","justagirl","justbreathe","justwhatineeded","kickstartmyheart","kidsdontfollow","kidsinamerica","killedbydeath","killerqueen","thekillingjar","kingsandqueens","kissthemforme","knightonthetown","knowyourenemy","koolthing","kryptonite","kungfufighting","ladybug","laidtorest","lalaloveyou","last","lastofmykind","lastoftheamerican","lastonetodie","lastresort","lasttraintoclarksville","lazyeye","learntofly","leavinghere","lenny","lesstalkmorerokk","letitallhangout","letloverule","letsdance","letthereberock","letthereberocklive","levitate","liar","lieslieslies","lifeisahighway","lifeisbeautiful","lifeline","likeafool","limelight","limelight2","linger","lisztomania","lithiumlive","littleofyourtime","littlesister","liveforever","livinatthecornerofdudeandcatastrophe","livinonaprayer","lonelyasyou","losingmyreligion","loungeact","lovelikewinter","lovemyway","lovespreads","lovestruckbaby","luciddreams","luckydenvermint","lucretia","lump","madagascar","magicbuslive","magneticbaby","mainoffender","makedamnsure","makemesmile","makesmewonder","maninthebox","manuchao","manyshadesofblack","maps","marchofthepigs","margaritaville","maryhadalittlelamb","maryjane","masterexploder","masterslave","mastersoftheuniverse","meandmygang","meanwomanblues","medicate","megasus","melatonin","mellowshipslinkyinbmajor","messageinabottle","metalonmetal","mica","midnightrider","missindependent","missmurder","mississippiqueen","mollychambers","moneytalkslive","monkeygonetoheaven","monkeywrench","monsoon","monster","monymony","moonagedaydream","morehumanthanhuman","morethanafeeling","morethanmeetstheeye","mountainsong","movealong","movinginstereo","movingtoseattle","mrbrightside","mrcabdriver","mrgrieves","mudonthetires","mybestfriendsgirl","mycurse","mygeneration","myhero","myironlung","mylastwords","mylovelyman","mynameisjonas","myoldschool","myownworstenemy","mypoorbrain","mysharona","naive","nakedeye","nakedintherain","naturaldisaster","nearlylostyou","new","newfang","newkidinschool","newmoonrising","newslang","newwave","newwayhome","nexttoyou","nib","nightlies","nightmare","nightwatchmanlive","nineintheafternoon","nineteenohone","no13baby","noexcuses","nohasslenight","norain","noregrets","notime","thenumberofthebeast","numberofthebeast2","oceanavenue","oceans","oceansize","ohprettywoman","onaplain","once","onceinalifetime","oneofthosenights","onestepcloser","onevision","onewayoranother","ontheroadagain","oobydooby","openingband","orangecrush","originofthespecies","ourlipsaresealed","ourtruth","outhereallnight","outside","painandpleasure","painkiller","panicattack","paranoid","parasitelive","pda","peaceofmind","peacesells","peoplegotalotofnerve","theperfectdrug","perfectinsanity","perfektewelle","pickmeup","pickupthepieces","pieceofmyheart","pigsinzen","pilgrim","pinballwizard","pleasure","pointofknowreturn","poison","poisonwasthecure","policetruck","polly","porch","porkandbeans","powerslave","prayeroftherefugee","precious","prequeltothesequel","pretendweredead","prettyfly","prettyinpink","prettynoose","prideandjoy","promisedland","prophecylive","prostitute","psychokiller","psychosocial","pumpitup","pushit","queenbitch","radioradio","ramblinman","rattlesnakeshake","readysetgo","realgoodlookingboy","realwildchild","realworld","rebelgirl","rebelyell","redbarchetta","reddevil","redtandy","reeducation","refugee","rehash","reinventingyourexit","release","renegade","reptilia","rescueme","reyourbrains","riadnthebedouins","rideawhiteswan","ridethelightning","ridingonthewind","ridinthehook","ridingthestormout","ringoffire","rio","roam","robtheprezodent","rockandrollband","rockandrollcreation","rocknrollstar","rockawaybeach","rockinamerica","rockme","rocknme","rocknrolldream","rocknrollhighschool","rocknrollnightmare","rockrebellion","rockyoursocks","rollwiththechanges","rooftops","rooster","roundandround","roxanne","ruby","rubysoho","rudemood","runnindownadream","running","runninwild","runtothehills","runtothehills2","rustinpeace","sabotage","saintsoflosangeles","saluteyoursolution","sameolsituation","satchboogie","satelliteradio","saucyjack","savior","sayitaintso","school","schoolsout","sciencegeniusgirl","scraped","screamingforvengeance","seaandsand","seeyou","selfesteem","seven","sexonfire","sextypething","shacklersrevenge","shake","shedoes","shegoesdown","shesahandsomewoman","shesagenius","shesahottie","shescountry","shesellssanctuary","shesfetching","shesnotthere","shethinksmytractorssexy","shhh","shimmerandshine","shiningstar","shockwave","shootingstar","shoottherunner","shoottothrilllive","shortandsweet","shouldertotheplow","shouldistayorshouldigo","shouldvebeenacowboy","showmetheway","sicksicksick","silver","simplekindoflife","simpleman","singthechanges","sinwagon","sirpsychosexy","sistereurope","siva","sixsixsix","skullcrushermountain","sleepwalker","sliceofyourpie","smashitup","smellsliketeen","smilelikeyoumeanit","smokin","smoothcriminal","snowheyoh","socold","somebodytolove","somethingaboutyou","somethingintheway","song2","songwithamission","sonsanddaughters","sorrow","sorry","soulsofblack","soundsofsilence","sowhat","sowhatchawant","spacecowboy","spaceman","spacetruckin","speedofsound","spiderwebs","spiritinthesky","spoonman","sprode","standingintheshowerthinking","stateofloveandtrust","stayaway","steadyasshegoes","steadyatthewheel","stickysweet","stillalive","stonehenge","stop","stopstartagain","storyofmylife","streetofdreams","stricken","stumbleandfall","stupify","suckmykiss","suddenlyisee","sudsinabucket","suffragettecity","sugarbaby","sugarmagnolia","sulpher","summerof69","summertimeblues","summertimerolls","sundaymorning","sundial","superbeast","superbowlmedley","supersonic","supersoniclive","supremegirl","surfingwiththealien","swamped","sweetleaf","sweetness","sweetnessandlight","sweettalk","swing","swingswing","synchronicityii","takebackthecity","takeitontherun","takemeout","takemetotheriver","takenoprisoners","takethemoneyandrun","chains","tame","tangledupinblue","tedjustadmitit","teenagelobotomy","teenageriot","tellherno","tellme","tellmebaby","tempted","tenspeed","territorialpissings","testify","testifysrv","texasflood","thankyouboys","thatshowiescapedmycertainfate","thatswhatyouget","thatswhenireachformyrevolver","thebanishment","theclairvoyant","theconjuring","thedownfallofusall","theend2","thefeeling","thefinalcountdown","thefixer","theflood","thegambler","thegreatestmanthateverlived","thegreatsatan","thegreetingsong","thehandthatfeeds","thejacklive","thejoker","thekidsarentalright","thekill","theleavingpt2","themetal","themiddle","thepassenger","thepowerofequality","thepretender","theregoesmygun","theresnootherway","therewasatime","therighteousandthewicked","therockshow","therunningfree","thetimeiswrong","thetrees","thetrooper","thewagon","thewaitinglive","thewaythatitshows","theyreredhot","theysay","thisaintasceneitsanarmsrace","thiscalling","thisilove","thisisacall","thisisexile","thisisit","thisisthirteen","thisiswar","thisonesforthegirls","thrasher","thrashunreal","throughbeingcool","thunder","thunderstrucklive","ticktickboom","tieyourmotherdown","timebomblive","timebomb2","timeforchange","timeisrunningout","timesicksonofagrizzlybear","timeslikethese","timewehad","timmyandthelordsoftheunderworld","tntlive","today","tomsawyer","tomsawyer2","tonightimgonna","toomuchtimeonmyhands","tornadoofsouls","towncalledmalice","toxicity","traininvain","trainkeptarollin","trainkeptarollinshort","transmaniaconmc","treatmelikeyourmother","tribute","troublemaker","truckin","truthhitseverybody","tuttoepossibile","twoprinces","twoweeks","typical","unclejohnsband","uncontrollableurge","undermywheels","underneathitall","underpressure","underthebridge","undone","unthoughtknown","upinarms","upthebeach","useit","useme","usuck","valerie","vasoline","vengeanceismine","visions","vitalsigns","vivalagloria","volcano","wakeupcall","wakeupdead","wakingthedemon","walkingafteryou","walkingonsunshine","walklikeanegyptian","wanteddeadoralive","warmerthanhell","warpigs","warriorsoftime","warzone","wastedagain","wastedyears","waveofmutilation","weaponofchoice","wearethechampions","wearetheroadcrew","wecarealot","wedieyoung","wegotthebeat","weightoftheworld","welcomehome","welcometotheneighborhood","wellthoughtouttwinkles","wewillrockyou1","whatahorriblenight","whatsitfeelliketobeaghost","whatsmyageagain","wheels","whenyouwereyoung","wheredyougo","wheresgary","whiterabbit","whiteunicorn","whitewedding","whoareyou","whoknew","wholelottarosielive","whosgoinghomewithyoutonight","whosyourdaddy","whydoyouloveme","whygo","wilsonlive","windmeup","windup","witchhunt","withoutyou","wolflikeme","woman","wonderwall","wontgetfooledagain","wontgetfooledshort","wordforward","wordup","workingman","workingman2","worldturning","would","yomp","yougiveloveabadname","youvegotanotherthingcomin","yougotit","young","youngerbums","youngmanblues","yououghtaknow","yourdecision","youreallivegottonight","youregonnahearfromme","yourenorocknrollfun","youshookmeallnightlonglive","yyz","zero"];

var song_found = new Array();
var iLoop;
var comparePage = false;

var index_to_check;

var songs_closest_gold = new Array();
var songs_closest_five = new Array();
var songs_closest_four = new Array(); 

for(iLoop=0; iLoop<songs.length; iLoop++)
{
	song_found[iLoop] = false;
}

switch(diff)
{
	case '1': 
		switch(group)
		{
			case '1':  // guitar
				//easy guitar base scores
				var base_scores = [7214,9428,5099,8053,14689,6091,11596,6625,4598,6820,5976,7112,5053,9512,7179,2566,14578,7581,9769,7728,9664,7370,7381,7415,7170,5334,3775,9192,9851,6493,8062,9010,5475,7550,5785,13379,5500,5672,6021,7778,7730,7858,35243,4611,5225,3537,6272,5302,10480,4613,11319,8851,7363,10021,5105,9593,6075,7934,5011,5927,5563,8053,8931,5550,6689,9113,7971,9056,10530,9382,6516,15058,6108,5930,6514,11580,6105,4756,4450,6812,8914,3662,5133,4292,8714,17558,6696,7355,8473,8050,4313,8602,6575,6779,8902,9098,4392,6396,4677,5460,8524,8230,8932,4396,9161,7460,7800,5208,8595,5896,6609,6169,5085,5934,7779,6700,4288,5064,4961,4306,4025,10393,6743,7994,6150,9591,4629,18510,6063,8590,5642,9298,7830,4000,9335,8444,11111,10466,6767,6895,3025,6550,7559,3753,7967,10686,8191,9398,7342,6198,10834,6560,3891,5400,9174,3768,5780,9972,6449,4375,5229,4927,6654,7296,5800,9831,6808,15310,6380,3489,8806,11826,2732,5566,5473,3703,4849,5629,7036,5425,8312,7084,6557,8172,7566,1642,5216,8444,10847,3928,11445,7033,7364,0,8978,3601,4175,8628,7530,9586,6724,7691,8328,6640,9423,10396,6550,7634,6640,5056,7913,11264,12138,6184,5280,9614,7787,6915,1831,7575,5683,11136,7318,12091,3269,11203,4113,5675,6399,9786,3672,7349,7364,6418,7784,6745,5550,6630,5253,5519,7270,7474,5199,7127,9699,10530,8315,6743,8532,9605,8926,6466,6286,5138,8146,20131,8579,4125,9913,6214,9816,8662,6437,5586,7647,8223,7345,5265,5689,10589,4478,6919,6248,5907,4497,6010,7115,14364,4844,6194,6065,5963,11216,7149,13911,4887,4631,6712,15141,9219,13064,10073,6622,11426,6069,5225,8260,7679,8939,6913,4355,10092,7354,5173,5440,5949,6827,6997,13575,4784,7294,12112,3757,13352,10445,5825,5046,6129,5200,5610,5809,7226,7642,5252,4231,5391,7750,6960,7489,6563,5835,5254,12932,8551,8759,5198,3865,9759,6466,4395,24618,11912,7867,5365,4348,5536,6749,9373,8872,10350,6585,4629,5246,11391,4185,4300,7667,7395,12271,5277,7975,5083,5682,5904,8210,7922,4270,7449,4915,12709,11359,3289,5896,5387,6855,5089,6675,15432,6148,6500,6063,8123,7674,11155,16938,20816,6444,8156,8509,4643,10107,13820,4925,6281,7109,6829,7505,5281,4314,4022,4006,12761,4888,5864,7191,8119,4131,6050,5997,4271,4319,8233,8229,5714,11308,4958,7586,8697,6527,5689,4589,6891,7106,3780,6893,6534,10030,5333,7613,7358,7279,7278,5696,8523,7896,5369,5957,6258,7293,6152,11800,8464,7333,5561,5059,5377,5268,4025,4739,7420,5452,5696,14921,11013,7092,10387,9049,11937,6939,5516,15167,8144,6200,6326,4875,11221,9595,5684,7081,7556,3615,6951,8778,5525,5763,6363,12201,8280,5175,4713,6427,4087,8607,8572,4921,4506,3650,10944,11410,9918,5318,8635,12540,4478,6000,5545,8508,16662,6891,6760,12122,9015,7671,7282,5418,8899,8815,5887,4664,6657,3580,7984,10321,4875,7467,7885,6898,4731,3816,5985,8661,5236,6280,5425,8021,3925,6130,12073,4731,7017,6167,6956,4919,8510,8689,7753,6312,5113,6219,5716,5834,4707,4459,14088,5607,4079,9787,6909,6468,7127,11855,8492,6780,5483,5925,5360,3639,5461,6337,3395,8546,10527,6451,6003,7709,4754,11763,7687,5907,12764,9461,4517,5317,7795,3493,5114,7855,10292,7683,6948,13517,9205,6895,5188,9061,4096,5702,16517,5975,6500,6668,5266,8982,8899,6615,5893,6723,6192,6839,9100,8982,11464,7778,7829,7189,3516,5675,7982,9611,3814,7820,3884,6956,15220,10812,7090,4002,7298,4519,9529,7182,5139,6731,5425,5196,9819,3787,3895,6294,6493,5875,4710,6009,7650,16572,8588,8401,19605,9367,6667,9000,16730,7292,4511,11854,8071,6704,14309,7768,6066,6790,10249,6057,10147,6619,7095,5016,6131,5887,6046,4200,14288,7424,7040,8842,6586,4686,9568,7406,5836,5536,8829,8046,6466,8017,6121,6363,8416,5792,12487,7890,6486,4920,5962,7028,4172,9063,10376,8070,17139,6853,7801,4045,8153,9630,4707,9459,6190,4618,6129,4325,19514,8220,6330,7743,8406,8237,15286,4585,8460,6709,18459,6000,9126,5275,9477,6076,4743,5953,12028,7113,9462,9083,8317,10471,8809,6560,5276,8148,10286,4963,7518,14622,8117,11222,6181,7595,6225,7440,7627,8375,2153,8222,6818,5137,7030,6712,5595,16555,8275,4849,6625,17397,6713,10384,7637,13328,4309,9993,4342,5427,6344,6048,8938,6135,2625,6822,8885,5683,4476,10130,10534,4612,9613,12836,9916,4372,7523,8489,18949,3608,6408,10198,7167,6336,8817,6672,10457,8786,7561,12133,7773,5891,12665,8112,15298,6999,13696,8072,7880,10713,10598,3293,8134,7138,6790,13190,6776,3998,5190,4525,7370,5423,8965,4555,8698,9784,6963,9694,6096,7370,7319,5432,4520,8040,7480,6122,4200,6964,14386,5611,6460,5379,7230,4867,4263,9548,10036,4357,9760,7851,6395,6072,7257,9237,5813,7145,20037,6216,7625,5844,8236,7550,15206,5967,10210,5609,5519,6341,12281,6832,5503,7842,6806,6660,3604,6880,3025,19873,10743,8259,16373,3847,4993,7383,5412,10395,4905,6097,7531,7062,1726,4826,7441,7691,11525,9982,8672,6218,4600,3725,7560,6379,7926,6799,5639,6180,7082,7573,7183,4879,7351,9928,5291,3782,5984,8025,7348,9363,3087,5115,12382,6407,6684,8655,6435,9162,8342,10536,6018,11901,1826,4800,8190,5313,3206,7808,7368,5779,10890,6811,6920,13538,6558,7110,7012,8947,5754,6532,6081,5089,6079,4812,8673,9384,7303,5555,5476,6701,8395,6426,5871,6895,12633,7310,6275,8360,16251,11029,7296,7677,6051,4475,14774,7907,9223,5472,10860,6616,7340,7125,6055,7680,4931,6564,9233,6271,4660,4655,6230,6573,5325,5296,11572,5525,6429,8460,5414,5012,3447,8959,6997,6762,9468,6584,8287,6179,15738,8263,6547,6868,9668,5646,6725,3480,4882,9100,5322,4696,4640,14247,3171,6014,5153,12944,6567,5011,8077,8631,6178,6170,4945,8083,7455,6430,6037,9734,6079,6860,11996,6344,4378,4954,4157,6899,6390,5450,5414,11277,16507,15566,6933,4988,17294,16009,7757,6649,7478,5113,12087,8625,4490,5137,7498,5490,6877,9461,7121,4624,4802,8247,7349];
				break;
			case '2': // bass
				//easy bass base scores
				var base_scores = [7493,6589,4825,7843,13322,5107,11036,6200,4380,5826,7158,6472,5390,11827,6121,2617,10991,6863,9594,8515,8119,6651,8025,6548,5452,5469,3975,8648,8700,5993,4836,9140,5700,9162,4717,12370,6350,5597,4421,5394,8658,8127,34060,4400,5275,3725,6783,5400,8835,3458,6855,8430,7654,4728,4135,8830,5314,8286,4571,5462,4248,6680,7976,4975,11225,9020,6451,8409,12452,8620,6418,11604,4211,5390,6589,8803,4927,5116,3676,5571,5525,3419,4986,3715,7635,15350,5825,6280,7866,7979,4600,7966,4400,5882,9431,8215,2874,6438,3378,5476,6809,12478,11549,3146,9545,8800,7404,5911,7197,5618,5715,5752,4415,4904,7800,5613,4325,5021,5725,3925,4600,10205,6311,6870,6875,7849,4689,10408,5775,7720,3733,8713,7478,4820,8758,8985,10860,6051,4825,7268,1887,6118,6605,3236,7401,9777,7143,8383,6459,5653,8727,6525,3777,3825,8743,4586,4998,8934,4729,3625,4779,5850,6576,6196,5725,10359,4090,14305,5072,3200,8399,6573,2218,5123,8492,4035,2475,5950,8592,4050,9779,6550,6075,7865,7487,1548,6416,6996,9342,3975,10660,6993,5762,3345,9345,3275,2220,9073,7751,10526,4313,6764,7356,5754,7225,11138,5425,6602,6172,4699,7463,9301,13576,5325,6289,9690,7097,6742,904,7925,5971,8388,6474,9278,3275,7600,4550,6791,6014,9157,3768,6514,6728,5582,3750,5911,6066,4812,5211,5699,6529,6675,5342,7011,8972,9500,8926,7705,7836,6395,7845,5900,6480,5013,7234,17572,8909,2375,9579,5472,10876,7116,8168,5473,6854,5931,7625,5157,4454,9547,4245,4434,5922,4771,4200,4709,8345,10872,4390,7900,6375,6230,10559,7530,11748,3744,3187,6227,14795,10777,9694,7661,7556,9071,5026,4150,7047,6650,8170,6987,4055,7476,6779,4156,5005,4934,5716,6305,10625,3996,5699,10245,3675,13532,9037,4675,4428,5449,5404,4694,5503,6561,6320,6491,3510,5574,6413,7018,7305,5295,5869,6239,12702,7261,7705,6066,4180,11575,6350,4377,25822,11561,6661,4487,3234,6210,6976,9126,7717,10525,6450,4558,3516,10627,7496,5139,3359,10206,10145,5876,7112,4604,6250,6895,9108,7744,8145,6706,4938,8929,9878,2781,5976,4946,7687,5132,5365,17000,4223,6229,6974,6982,7581,6331,16416,20655,2818,5519,8402,4605,9300,12544,4700,4661,8945,6425,8708,6076,3845,3036,3703,11223,4663,3556,6865,8166,4316,5291,5454,4225,4025,8461,3400,4661,10239,5045,6461,7922,4592,5525,4562,6625,6767,3189,8333,7450,8998,3384,9071,5825,6919,6177,4050,6440,7641,4030,3905,6624,8098,5849,9359,6101,7940,6714,4982,5357,6050,4298,3703,5868,5119,5464,16045,8245,6835,6581,9298,11781,6800,5283,11309,9380,5300,4474,4275,9464,9727,5509,7075,6233,4496,6686,7562,7876,5090,4625,11166,5972,5125,2949,6986,3542,7875,8150,5700,3675,3625,9040,10553,9852,4343,6211,11272,4284,5730,6818,12765,20972,5769,7476,11786,8612,7500,5065,5647,9422,9371,4905,4472,5507,2625,7165,10553,3625,10915,7325,8137,4717,2375,5387,6391,4889,5472,4425,7882,3975,5084,10360,4708,4776,5259,7307,4994,10475,9334,6352,5395,8200,6511,4025,5853,2125,7250,13591,4635,4475,8119,6568,7961,7557,14042,6476,7523,5104,2961,5923,3785,5536,5756,4189,8175,9804,5856,8032,8920,6275,12101,8020,7826,9223,8794,4361,5728,7820,1902,3746,6369,7822,8502,6341,10341,7432,9440,4472,8325,3890,6575,16287,4317,6100,9165,5595,8498,8122,7263,6990,5125,6449,6853,9670,8878,10568,7482,9011,6459,2058,5565,3937,8970,3292,7602,3886,7325,14068,10500,6862,2576,6619,5688,9252,6522,5470,5818,4600,4090,7379,3148,2396,3905,7213,4525,4397,5866,7624,9847,4868,8298,19795,9775,5692,8668,15707,7467,4462,8800,8307,6886,12727,5702,4281,7025,9061,3690,9022,5797,6866,5798,5819,3817,5655,2749,13958,7447,7515,10139,6001,6045,6570,7245,5446,5483,7200,7840,5239,7450,7724,6375,8041,5280,12130,6409,5634,7470,5329,6571,5078,9214,9707,7391,15059,6545,7941,4396,7827,9044,4282,11675,6380,4753,5642,4538,19362,6706,6299,7154,8147,10343,12239,3412,7946,5766,20069,5875,7732,4204,5573,5024,4743,5720,13492,6825,8830,6938,8494,7701,6520,4439,5084,6961,8825,4036,6947,13818,7552,10841,5935,8290,4460,6618,6078,5800,2238,7642,5169,4895,6494,5300,5435,13245,8278,4203,8425,18073,5325,8613,6250,8782,3587,7368,3877,5156,5227,5636,6861,5553,4201,5574,8410,5854,3424,13381,6602,7181,8609,12635,10715,3500,6970,7697,11977,3664,5231,12519,6692,5964,9413,8289,10405,8458,7436,12608,8459,5494,13868,5700,10031,5974,12064,8127,6247,9874,2925,2492,9775,6935,6154,11451,5883,3158,5059,3600,7100,7137,9028,5172,9479,7250,8985,11575,5721,8695,8425,4939,4520,6225,4725,5847,3450,6841,14261,6111,4775,6155,6471,4452,4262,7676,6644,3950,10332,7826,5923,8527,10655,8729,6153,6100,19211,5495,6049,5762,8202,6341,13361,5067,8961,4275,4396,5430,16244,5975,5276,6968,6252,5925,3273,7711,4825,7400,11543,8558,13231,4328,4364,6798,5303,8428,4706,5651,7658,3910,1659,5005,6716,7484,9850,11751,8300,5177,4199,3250,7335,5862,7848,3359,6149,6111,6987,7200,8979,4148,7020,4550,4570,2981,5250,7864,6544,6650,2550,4599,10445,6586,6869,7207,5672,7140,8225,10104,5858,8451,1845,4400,7228,5129,6319,6793,7008,5122,9690,4344,6345,8878,6311,6190,3960,6969,4650,5819,5563,5015,4700,3462,7640,8299,6814,5361,4283,6073,8404,5375,4796,6767,10587,7620,5425,6682,11424,7674,6426,6847,3777,2499,16868,8294,8583,5333,10257,5041,8438,7408,5864,6106,6281,3720,8497,3229,4371,6277,6103,5627,5012,5777,7484,5321,6263,8451,5328,4574,3728,9940,6702,6069,10025,7981,6313,6164,18089,7298,5450,6409,9043,6106,4050,4082,4544,10459,4375,3924,4086,12063,2875,7050,6150,13092,5850,4892,10119,9597,6043,5962,5321,6794,4002,6707,4934,8671,4645,5893,12828,6001,4883,4412,3675,4808,5023,5346,5044,7233,11295,11295,5320,4687,16818,15677,5825,8633,7425,5266,16004,6618,3600,5162,6725,4175,7349,10121,6078,4899,4000,8128,7325];
				break;
			case '3': // drums
				//easy drums base scores
				var base_scores = [22000,13275,12475,11300,24375,19850,13500,11675,14975,12400,18275,17075,13900,11425,12225,6050,21675,14850,26375,14700,16700,15425,14900,18950,15700,12225,11625,20775,15700,12525,21000,13625,13675,22900,15825,23750,17150,11600,9600,16875,14375,16075,46500,16050,21675,17050,15550,12025,18775,7450,20200,16650,14450,12575,9375,21950,12250,24025,11625,13975,13775,21300,13775,16175,18175,22400,14950,18600,19025,22525,13200,22450,12175,16150,13450,14350,4325,5575,11325,16025,14750,12325,12250,12550,14975,34400,13250,12925,20175,16575,12100,16375,13575,12050,17325,14475,12950,14025,12025,10850,19450,33450,19775,12850,17550,11500,13525,12625,18425,12900,14525,11650,11975,12875,11200,8775,12200,12675,23175,9175,10450,20575,17675,14325,18525,15275,11150,43575,12975,13425,16150,12425,19100,13600,17100,20950,19025,17925,9500,17150,5875,13250,17325,11525,11975,19050,21125,15400,11525,14200,16525,16850,7775,9375,23325,9375,8125,20925,11225,9675,11550,14725,19025,15275,15975,16750,14600,31200,17700,12875,12550,16900,6225,12450,15575,9900,9175,14350,14850,13325,19300,14550,29575,11800,17625,1475,11525,16200,20775,14450,22700,13850,9125,5525,19825,12525,6150,19700,15750,11275,11500,14775,18950,15300,17975,21775,15600,13300,15125,10850,15200,12750,14825,13300,9275,19100,17425,17175,1725,14225,13775,24625,18550,19025,14400,14550,12925,13350,14350,20025,8050,15600,17600,12475,19700,13250,12950,13150,11125,12525,20175,15025,9200,15250,18350,24475,14675,14825,15925,23250,18275,12650,20550,9900,20200,27275,20550,14900,17850,13500,12925,15125,17625,16150,14675,17175,17100,13400,9575,27475,9125,12950,15075,16875,10175,11700,13250,20825,11825,7650,13975,14100,20850,15100,23925,12675,7725,15550,37450,28250,16850,15625,13200,23075,11550,7875,15400,13750,17200,11000,13500,11775,14000,10600,14375,19550,15375,13350,23850,10225,18825,21200,9950,18850,22650,11000,14150,12775,14975,13750,14875,15625,18275,14000,11725,13500,12150,13825,14775,19925,20875,12725,26025,20200,14850,13075,12400,15375,18825,8850,53500,24675,19450,17675,11000,12750,18550,28100,20125,20600,9675,14675,11425,22475,10775,11675,14725,12450,20675,11525,20025,12650,13750,16975,23850,15975,19150,13825,13100,21200,19200,7125,14700,13725,19725,19925,13400,30625,11500,9750,20925,16225,14025,14625,39700,31300,11850,13300,17525,13700,16400,29650,9250,15375,18050,13850,15050,10225,8200,9600,5225,22275,8950,10825,15400,17050,9525,13800,13625,11575,11000,13500,17400,10825,25825,13275,17925,26850,12500,13500,15050,16150,18375,7000,9600,15125,17300,12225,15100,11775,15875,11875,14600,7875,17600,11525,15950,16125,12475,12725,13450,20650,16625,15325,14575,12975,15675,6575,13725,14750,13925,13475,34475,16750,25375,12525,16350,16250,14950,11850,18400,18875,16275,19525,17000,16675,17975,8925,15750,16400,7925,12550,19050,18775,16175,12450,17125,18050,13525,9400,16425,15900,19625,16200,12925,11375,11175,11975,30275,18000,13900,8000,16625,12025,18100,20200,30775,44900,17275,16150,22575,20475,10500,14150,14075,17125,16575,13325,14750,12850,9300,15425,20775,15250,17225,16775,21675,9950,11050,20400,23925,7275,10950,15450,14350,10575,14550,33900,12200,11225,11525,17275,19500,20650,11700,16350,13175,9850,21700,16350,21925,5125,8275,24400,14000,10425,17525,16300,15275,15800,20225,14600,13100,10125,14100,12275,9575,10825,14150,14025,17550,16100,15700,18025,16025,18575,24700,19650,13250,14075,18125,13575,16225,15400,5450,11200,20025,16350,20300,11250,17900,18000,25900,16550,24150,10750,13475,26125,11000,27425,16125,16750,17675,19625,17300,13000,18275,13725,12225,23900,14175,18425,14800,17950,16375,8525,12525,19000,14875,7775,12075,11150,15075,20500,16300,15975,4100,13950,15625,9950,10625,21325,14025,10175,15800,16500,6275,8650,10825,17875,12800,14475,12200,18600,15375,12600,31725,45425,13100,15075,18250,29475,18475,9425,17250,17700,12875,26500,14575,15775,16375,19625,6900,12400,12350,16525,13050,12725,100,10175,15050,25275,17250,17400,18700,14450,13550,15025,12400,12725,11150,17325,20050,18125,18675,17250,10550,15825,12500,31750,14700,11825,20725,12525,16000,15325,23500,22675,16525,22225,15200,26225,16375,18750,11500,12075,17875,14550,13475,11275,7500,25225,11925,17025,20175,19250,22975,27850,13000,11475,9400,26875,12200,20100,12075,15450,15025,13775,10400,19500,15225,24775,11450,13600,21775,9325,13050,10975,16650,23575,12400,17400,21775,18650,24900,10550,14300,12750,16700,16375,16775,4450,13125,13600,10700,9925,13550,11825,24875,24425,10700,19075,22750,14150,14275,12975,19550,10725,16925,10125,12575,11300,12550,16500,14450,10000,15100,21050,13875,10875,13350,21750,12450,22200,22225,20750,14200,13325,14650,20750,3275,14700,17825,15125,17375,29850,27600,18125,20125,14325,25150,11800,12175,20275,15225,21850,16025,23625,15225,15650,13425,6425,11225,13475,17775,13950,14450,14025,8950,12600,13600,22100,19250,18350,8225,21800,14975,14325,15600,10625,13600,15675,13325,8800,13600,10225,9250,9325,17725,32250,11025,13700,12300,13375,15975,13950,17225,15825,10350,16100,21350,13125,14750,8875,21525,14225,16550,38350,14025,26050,13425,20075,10675,18600,12875,29350,9950,12400,18425,19475,21900,11450,12400,24075,14675,10325,12300,8400,21850,21675,12675,28075,7600,10400,13000,18600,16475,10675,12650,12400,18225,4375,11550,15400,14875,21150,21625,18650,12075,0,8750,21150,13875,14175,11125,16650,14600,13725,14750,20375,11250,16325,16325,10275,8575,10300,18775,16025,17375,6125,10325,19325,12500,16900,18150,10325,13175,16750,25825,17025,23000,3700,13300,14650,15050,2975,18825,13625,12475,17525,18450,19575,22375,18750,12350,12200,20025,14150,11750,11250,11250,15575,10150,10375,17250,16875,9700,10875,13650,23650,20450,11725,18575,24550,14150,13800,16725,27275,18075,13275,17675,9600,9000,20975,15025,16350,18825,16075,14600,16675,13075,13025,15350,18300,11950,16625,12450,9500,5625,11850,14700,12675,14100,13400,17975,18700,15650,12000,9350,10675,15275,15200,11725,16925,12175,12900,12050,32275,17850,13850,12225,21125,9400,12300,9075,12375,11425,9725,10700,13525,24725,13500,19350,6150,19450,15700,9025,15725,15100,12950,16275,9425,17325,18575,15475,14250,17650,10550,18475,17900,11775,12000,14450,9275,11250,10300,18125,10800,14675,32750,29975,11975,9575,28950,28325,15525,13600,12525,11875,20625,17375,9325,11300,21575,18550,10125,26850,15850,13250,12900,16100,9425];
				break;
			case '4': // vocals
				//easy vocals base scores
				var base_scores = [8400,10400,7000,5275,9600,4850,7975,13000,6300,9600,4650,7600,11900,7600,8000,4800,9825,10200,10900,8600,9350,5775,7400,8425,9200,7500,7200,9700,13800,9525,13600,7700,6125,8725,5400,10600,10600,5025,5200,8175,12775,9200,15200,4600,10600,11000,14000,9950,14400,6525,14175,7000,9600,8400,10600,11125,9400,11725,5675,7400,7400,12525,4800,7600,14600,14000,10600,10600,7800,11200,10600,8150,8600,7000,9000,10425,7250,4800,9800,12600,12600,9900,6200,6600,13600,10625,6100,9800,3600,12675,4800,4600,5600,7200,7125,10000,4400,8200,11000,7000,10500,12900,8800,10000,11075,4400,6200,7600,8400,10600,11000,8400,8000,8200,7000,7200,7600,8800,9400,6400,8800,8775,11400,9600,7500,6325,7000,10675,10700,5600,9200,8600,12600,7200,0,13850,9600,15600,8600,9475,2550,8000,11200,8200,6600,6800,6800,7275,7800,9250,11625,7800,8075,6600,17325,6800,7800,8800,9425,6200,6400,6600,9200,6400,11375,8600,4600,20275,11775,8450,10000,11250,4900,8800,6200,8200,5600,8350,7400,9800,10425,12000,9400,11000,9600,3200,5800,9850,10725,8200,10725,8400,7225,3600,8575,4600,7200,9700,7750,9400,5900,11800,8050,6000,13575,11475,6800,7800,8400,11600,11600,7275,6800,8800,3600,6400,10800,18400,2000,8200,8750,11225,15400,9975,9350,12175,7200,8000,10200,8000,4800,7600,13100,10000,7400,7800,6200,11600,8600,5900,13800,12400,9000,8100,6600,8225,7200,9200,8200,9550,9800,10600,7200,7200,7900,8000,12650,10350,10800,5200,6625,6200,14000,10000,11000,8500,9600,9000,8800,12950,7400,6800,5800,10800,9400,7800,6375,10000,8000,6000,6400,8800,6600,12625,10075,6600,6600,9200,13900,12225,7200,12000,5600,9750,5000,7100,8400,7250,10075,10400,6400,8000,6400,5600,8375,6200,7250,6800,19800,7600,7400,9550,8200,13925,12400,8200,6550,7675,10500,6400,5350,9600,18500,9650,7800,6700,9000,10800,8200,11050,10200,7200,17400,12000,8450,9200,5600,6200,9100,6800,12550,9600,5400,7600,8600,6400,10800,10100,10200,9800,13200,8700,8200,3200,6150,6600,7400,9700,9225,6400,17400,9600,9800,11400,8800,5275,7350,8000,6000,14000,8950,5375,6800,11200,8400,8400,9200,7600,9950,15600,10000,8200,6600,9275,16100,15625,8000,8775,10600,6350,8725,9600,5850,11475,9200,6000,6400,7200,5200,6750,7800,7325,6600,5800,6400,9000,6600,10200,7800,7800,5800,8800,5000,8800,11550,5600,7400,10800,9400,7600,6800,9400,8200,2400,5200,10400,11900,5600,9150,10800,9025,5075,9600,7700,9600,13200,9400,13000,7600,7200,9125,12400,5600,7000,7800,13400,7925,11000,9200,9850,8000,7600,13000,10700,9400,9250,12000,10600,11200,7000,7500,8250,9000,7800,7800,9700,12400,5400,10500,11425,5400,11400,9600,6400,8400,10600,10700,11400,9600,8100,7400,5675,11200,8200,8600,6225,12200,9375,8000,9400,5800,0,10400,10600,9300,6600,13975,9600,10950,8800,10000,13200,8000,6400,10000,7725,8525,10400,13800,11000,8200,5800,10775,16000,10400,11200,9800,7400,6600,6200,15200,6650,8925,7000,4425,6000,6400,13975,9000,4375,10600,9225,9600,7100,10475,11000,7425,4600,8775,3600,7800,4500,0,7950,12600,5800,10000,5600,6450,11400,12400,8400,7200,5200,11400,9600,5200,6600,7000,8000,9000,9400,10650,9875,9725,12100,7725,8600,8325,8800,7625,5800,8600,11025,4800,9725,10150,9700,11000,5800,8000,13175,10000,6600,12050,5400,6900,11250,12000,10600,8800,9000,7650,12400,7000,10600,8000,10775,11800,13450,9400,10550,11075,5800,6800,8800,6800,8650,7200,3400,10200,7400,8200,10825,10250,9000,5200,6200,6400,8400,6400,12200,8600,7800,8800,10175,5000,5200,9200,6950,14400,6600,6750,8400,10125,8950,10800,14300,4600,6000,9900,11050,9000,5600,9200,11300,8600,6200,8050,9800,9950,5400,5400,6550,8000,10000,4800,5200,12400,7400,7400,10450,10600,4600,11000,9000,14400,10900,6600,7300,8375,11000,10400,9500,11200,8000,6400,8800,10000,13175,8450,8600,8700,14000,11800,7200,8000,10750,6800,10675,7800,10400,7050,9800,7800,10000,8925,9175,13000,8200,6850,9450,6600,11200,11875,7000,9300,9125,12600,7800,5400,10575,8200,8400,10200,8200,8100,8600,4550,9175,10600,12400,10400,9400,9825,4600,10800,5200,0,9800,8400,9175,7600,7800,12600,5800,8725,9200,13800,0,9750,4000,13800,6800,5800,6600,7600,7800,10800,13600,6200,12600,12400,5600,7800,9900,11750,5400,12525,6200,8400,9850,9000,11125,5400,7000,9875,16375,8950,6200,6975,11200,7150,11700,9275,8450,7650,9525,9750,7200,4850,9000,11750,6750,7975,16650,7400,6200,8000,12600,17825,9800,6800,9800,5000,8175,14800,15550,7400,11800,7600,8800,4400,9250,11600,4800,12000,6400,6800,11200,11875,10725,13000,10650,5800,13200,9475,9425,9000,9000,9400,11000,8600,6350,10000,7800,7000,6600,3800,16475,10800,12600,5400,16600,11600,10200,12075,10800,9400,9600,10400,9600,6325,8600,10200,6800,7200,20800,6800,8400,8100,0,9200,9975,7800,5550,8200,10000,10400,8850,13600,9650,9200,9800,7000,6000,9100,4400,13950,13600,4400,13600,4600,7050,8800,12400,8025,5000,11200,0,4800,1700,3400,10600,7825,11200,7200,11275,11800,7200,7200,8825,6800,11600,14400,12000,4200,10400,8000,6400,6800,8000,6600,8400,5200,9150,11600,14600,15200,4975,6175,13200,9000,8800,12200,7000,8975,6750,13200,8325,14700,8000,5975,9600,9400,6400,11750,7400,5400,6200,12000,9800,5400,12200,8750,10800,16400,8400,8200,7925,7800,9200,6400,5625,7800,4800,5600,8400,7400,9275,11075,4600,9600,10400,9000,7650,8350,13775,10650,7400,12600,10400,8400,10400,8750,8600,10200,13425,9400,11200,6150,7400,14200,8800,11400,12000,8600,5400,2600,9200,10600,8000,8400,5200,7800,7600,9400,8800,8750,11600,9350,8800,9200,10000,11600,6200,7400,9300,7600,7625,10225,10525,3000,7600,7600,6825,8200,4600,6600,6600,12000,5800,7700,4825,9600,6200,7600,11925,6800,9200,9475,4800,8200,7800,9850,9400,9800,9900,7625,10200,7000,5400,10000,6400,5400,10525,12000,6000,7975,16125,16125,9000,6600,11875,12125,5900,6800,7150,8000,11400,8000,9600,6000,15075,12200,5800,10850,6200,6400,7000,0,7925];
				break;
			default:
				break;
		}
		break;
	case '2': 
		switch(group)
		{
			case '1':  // guitar
				//medium guitar base scores
				var base_scores = [16430,17517,15293,21315,31388,10654,17999,6950,16327,12896,9829,12586,11143,12522,20045,10019,19353,15809,22771,9364,13096,19080,16684,22139,16452,9279,7475,14286,26788,11387,11550,16106,10625,20322,10510,26011,16350,9235,11133,16582,12080,15853,46951,13661,9975,7180,12808,11553,14834,7946,29782,16180,19073,14816,6105,24196,18275,15559,10355,13816,9942,21072,15306,12050,12842,13616,12014,19437,20869,19738,10485,23817,13969,12007,11322,16898,15466,9601,10227,21657,18512,11534,7576,9768,16878,26439,11921,15387,16982,12625,9791,14454,13850,12724,14076,15297,9543,13570,10381,8484,14803,19432,19993,10155,18952,9692,10753,9219,30240,10481,13824,21101,14257,10921,13579,15664,7980,9712,7558,9331,6164,18627,16408,18601,10135,18350,11953,30442,15429,14390,8051,17189,15772,8041,16648,14280,14586,18147,11794,18067,3865,14553,22333,8636,8919,16788,20020,14538,13034,10771,17659,20331,9062,11351,15651,12286,12258,16778,9949,7875,10949,7694,11706,16442,14700,14524,10774,26697,16480,6049,15117,17313,6127,14182,10853,10038,12291,18525,12388,11625,13649,15694,12398,12734,12143,4192,9891,13067,17470,9881,21094,26407,11063,0,14029,6006,10583,18927,10917,16193,15732,13316,12241,12745,11564,18657,15375,12386,17524,12940,17160,17466,30921,9334,12725,14129,21099,12913,3271,11804,9995,18575,14939,13635,9966,22657,5663,7522,16283,20757,9772,11792,18278,9954,14684,11498,19895,19382,14739,10694,15026,11947,12061,12951,19520,18493,17405,9931,14972,19720,20868,17595,12222,9468,14056,28715,12603,7575,19701,14226,17099,25425,16387,17859,13091,11062,22304,11519,12278,21277,8519,12087,9923,11438,11522,7635,18037,21286,8545,9187,10851,11826,21915,12124,19319,9261,14533,15296,20830,15238,23186,15858,8789,16682,14407,10825,20841,15121,13773,13975,9710,14959,13465,11676,9973,11048,14464,13324,27500,10640,13915,25319,6494,20826,25364,15850,11592,11676,9875,9965,17311,13849,11243,14121,10082,9196,12348,16001,11880,15409,17729,16403,24116,15727,15623,10440,9010,16501,16560,10017,38557,19710,10532,8290,10249,12049,11204,21093,22372,20150,14314,15412,13228,22175,7556,9700,13001,10292,24768,12141,20697,12833,16798,12813,18282,15182,6395,17180,11556,17874,16101,6803,12256,18329,15722,9815,12099,17907,9718,12055,15981,20498,19362,17079,27268,32371,13748,13080,13310,7832,16493,24957,13425,9673,11982,10052,13171,8620,9552,6305,8471,20752,11520,12080,11271,20494,11260,14312,16576,7921,13460,12697,14122,11101,16988,10402,22747,17082,13036,11842,10865,11468,20170,13210,21543,12042,17930,12891,10459,15866,14480,9738,15615,11138,14793,15048,14236,12669,16445,10518,18391,17259,10304,10886,8559,10908,13221,10300,17503,15171,10705,14846,24241,21032,17971,25674,14991,19134,12618,13967,22380,12833,14189,12154,12186,13743,13485,10339,24262,16771,5992,15274,15390,19724,13490,15437,17592,14646,17075,7238,14021,7843,14024,15232,11833,12509,10000,14154,24298,20198,9881,13271,21843,9877,16539,12955,19932,31884,13865,21396,20647,19204,12597,15914,13773,15019,14988,14301,10446,21538,5461,14167,12784,9675,13840,18958,18613,12091,8953,17963,17188,15297,14638,11325,14958,9684,9702,22872,9177,8751,13925,22331,12130,15382,23560,17310,8981,7261,18598,11969,13205,8577,4725,28926,11840,9829,18398,14812,16181,11633,17729,16643,16478,7273,12650,11737,5550,11114,11159,5694,23371,17553,16369,11678,13773,11098,18786,17778,11993,25334,16228,8341,12992,18690,6848,8860,12185,17234,12700,13423,17860,15859,12149,16226,18893,12242,16809,23056,12549,15500,13026,11421,17837,18500,9734,10234,10294,17494,10155,18550,16609,14831,12760,12244,13111,7174,15150,15328,25801,5691,13892,12477,10801,20953,20810,18479,7754,15459,13544,24110,17147,11504,9468,10500,10593,15397,6069,5745,15625,8918,10420,9024,11207,17145,31126,15477,18484,29134,16792,12888,24900,25424,14072,9173,17743,13577,17234,27846,12190,12228,15190,22248,9275,14246,14603,14962,8752,10481,9437,14318,12300,25313,14998,16628,18790,13027,6611,15820,19805,16423,12594,20406,16115,17175,22019,12436,11373,14281,16411,23612,13698,12186,16656,12524,11928,11820,18603,17826,14155,23975,16090,18681,12745,20467,11623,11181,13334,10248,16089,12468,10027,40028,9199,14525,16508,26652,11070,16573,8368,13469,11736,24611,15200,16783,13621,17427,13396,12186,13126,17194,13517,19060,24289,16761,13600,11481,10250,17553,18112,18758,9013,16582,16979,15484,26601,14410,12311,11266,15473,11606,11200,5463,19345,11764,11003,12061,8406,10088,23194,16087,10198,15842,35574,14382,16493,12183,19824,8876,13702,6914,16656,8377,10912,10784,13362,8425,13470,14633,9841,8101,15080,16196,7756,20639,22453,14156,9527,11782,13788,20957,5177,24116,15818,16348,10935,22245,11158,14888,20283,14923,26835,12138,11051,19536,17912,17646,16360,32043,16650,14833,16803,18754,9343,12457,20806,16955,19964,10540,8343,13590,7686,12829,8548,14889,7015,19778,14071,10718,13398,14833,16789,11317,13812,9971,15019,13091,12470,10360,16240,25103,13490,14510,14560,15978,9964,14026,14808,18085,9707,11800,15632,12566,11993,11085,15125,11167,10537,45224,9912,14793,10419,11940,13055,17704,22284,19831,9195,13304,16517,17338,17429,10607,15959,13597,14507,12958,10802,6050,31347,23328,15872,38139,9162,9143,12878,10437,15737,14475,12189,16104,14604,3426,15427,13218,19040,22450,14217,19025,16570,12400,10012,20844,13054,20059,17823,16521,12055,12340,14018,12994,9350,16049,14156,11250,7918,13346,24575,13648,19895,6728,13869,20579,9734,14336,16298,13318,18903,18017,24975,11671,22568,6106,17600,15227,13730,5383,21070,11693,12956,14535,11585,11459,19364,19735,9435,14962,21455,17787,11226,15887,18065,9392,10630,13652,21926,13124,12457,8083,14108,11687,11243,10719,13667,25763,16768,11425,14786,19956,13740,11931,11055,13341,13636,20857,13947,15943,16761,16185,16184,19861,16041,12188,12012,10422,16109,19558,17591,8824,7567,13585,12938,16083,10067,15271,8631,12204,19795,15644,13209,7056,14782,12256,13037,21861,8885,13691,12755,20519,15197,9367,14576,15133,10179,15150,6808,9080,13727,11049,9314,11403,24822,10517,16706,6343,19288,13394,10501,19063,18179,16542,17756,10140,20957,15629,15918,16098,17623,13694,9542,19085,10498,10637,10790,9252,12523,9053,11344,13876,25139,21138,20390,15964,9966,21834,23158,12055,12977,8651,9500,20895,21995,10665,12400,15448,12411,12741,14454,14281,9574,12454,14211,10055];
				break;
			case '2': // bass
				//medium bass base scores
				var base_scores = [13032,9814,8575,10393,24322,8646,11386,7825,7830,9691,9209,12797,7905,11827,15623,5092,12416,12337,15261,10623,13678,11007,14567,16847,9978,7669,7875,11314,14925,11333,8806,9140,11000,14862,9217,17861,11125,8955,7449,9945,8695,8731,35410,8700,6773,5950,7858,9925,12260,5283,13440,13250,12554,9128,7010,13971,10442,12931,6235,8788,7248,13112,13580,7150,14050,17176,8063,12596,18402,14445,7196,19158,7395,8334,9539,9312,7638,7206,6401,9371,9725,6269,7546,7065,14947,22449,10912,8383,12512,15204,7425,14912,8075,12389,18831,13070,5181,9927,8338,8256,14190,18283,15124,6332,15751,10200,7551,9052,14797,9518,10315,10993,8032,7032,8800,8413,6825,8893,8075,7624,6750,16587,10942,12026,9419,12624,7623,16483,10563,14298,7308,14888,13593,7328,17382,13524,16915,11190,8050,12120,2801,10152,12655,6736,8940,18636,12703,15108,9465,9678,12027,13050,6827,7233,9224,6636,7334,16634,7654,7200,7104,8925,9698,11371,8975,10436,9046,25284,8447,3824,8399,12373,4136,10023,13060,7685,5500,11150,9532,7450,12099,10825,10375,8595,10112,2583,10494,13271,16312,7115,18206,13765,9474,5254,14874,6200,5024,14182,8280,12776,7613,11305,8780,9212,14300,17388,10525,9625,9422,6674,12204,9401,15916,8512,8295,16482,12472,13032,1409,8300,8696,15024,12170,13178,5475,10924,9050,10242,11177,16006,5968,10702,16055,10988,5750,9486,11338,8062,10198,8579,12154,10960,12322,13198,14985,19197,10216,8764,13203,10445,14790,9271,11705,9313,11586,27938,12936,4300,14554,8268,10876,13391,9375,10214,11874,10387,13625,9307,5752,17472,8462,6537,11147,4964,8350,8370,11904,10897,7283,11400,12000,11434,19353,11555,21191,7086,5110,10852,22151,17227,15355,12666,7531,12603,8226,5275,9672,9975,13388,9762,7905,9386,8904,6781,8605,7781,10163,10950,14200,6096,10024,13651,5500,15997,15237,8626,8753,10874,9916,9553,16935,8561,10460,11641,6306,7624,10878,8337,11155,8970,11569,9867,20634,11877,9131,10883,8180,11987,12137,8308,41276,18655,11880,6496,6034,8903,10689,15622,11697,21025,8572,8187,6473,18023,7896,5627,5672,10496,14795,7841,8563,8974,10000,11937,13603,11280,11004,11980,8999,14400,15152,4510,9588,10221,11296,9282,8415,17000,8044,8920,11031,10618,11992,12448,30635,36115,4793,8804,9581,7462,17100,18814,8522,6786,9220,8515,16758,7823,6126,5811,4978,16839,14226,6480,10804,11173,9022,8916,9610,6412,7775,9679,5676,8626,12235,7303,10486,10667,7621,10375,8793,12240,9667,6214,14358,11200,11947,4991,10966,10139,12469,8837,8371,7427,12304,5448,7255,8614,10878,8724,9464,11851,9340,12124,8250,7756,10325,7273,7253,10450,8533,8114,18870,11346,10731,9390,14072,17618,11345,9679,11873,15705,10495,7599,5340,10526,13750,8157,14175,19954,6558,13386,13632,13151,9222,6661,13541,8021,8625,6149,15315,6757,14850,15009,10950,6875,5900,9004,16028,11901,6689,9285,17222,7059,10001,10830,22918,32647,10128,13256,21011,13252,11725,8927,10686,11563,11510,8994,6993,8757,3900,10865,10553,6175,18268,13050,10655,8229,4425,8387,15873,9364,9309,8825,14644,7118,9224,16644,7683,8668,10209,11808,6844,11825,12959,8953,5395,12200,11659,7875,10433,3675,9025,19616,7905,6000,13094,11728,15667,11708,16014,11543,10904,7103,4892,9373,5441,9478,10431,7435,13925,17383,11196,15054,15070,9275,13436,16120,13747,9223,9701,7405,11305,12970,3498,6396,8668,12187,15743,12938,10541,14363,15696,8622,12200,6840,11600,20988,6532,11300,12319,9745,12435,12400,9229,8665,8970,7874,7360,16795,9199,17685,10008,17994,8736,4007,7640,7937,12303,4774,9527,7629,9785,19508,17164,11137,4126,11946,7880,10423,10669,7378,9218,7200,6275,10810,6148,4108,6580,10556,8125,7722,8519,11574,15667,5592,13922,26647,17425,8960,14393,16167,15034,6046,9020,12822,9914,20218,6989,8187,14321,17495,6252,15178,9013,11737,11022,10706,5917,8459,5374,21309,10296,11813,17054,8725,8452,9645,10989,10521,8694,13267,11450,11861,12773,12155,12050,12061,10030,20434,9409,10309,10913,9915,12886,8103,17944,15909,13437,18170,11820,11911,6721,13281,10433,8225,20675,10484,7953,10206,6713,33010,11768,11699,10126,15772,14499,17480,5987,8937,8591,25860,9500,13695,7709,10148,8294,8583,9235,17728,13445,18921,12788,10709,13236,6520,6659,8463,13747,17625,7636,13700,25549,13202,18412,6949,10296,7719,9999,8903,10575,4166,11855,7190,8445,10350,10575,9473,22100,11266,8328,10000,18147,9260,12913,9775,10993,5725,11766,6252,8826,6798,8961,13011,8207,7376,10873,16210,8935,4661,14775,16857,10305,12463,22933,12505,5000,10145,11121,12677,3664,9097,14982,11858,11359,16602,13126,14361,13859,13736,21938,13456,9544,14709,9650,16926,11560,28559,12138,8478,11518,4689,3988,10525,12584,9279,13001,11166,4333,9484,3600,13150,13562,13686,5981,15179,12825,12827,14450,11543,13445,12525,7788,9357,9037,6675,7959,6290,11866,20710,7976,8150,10830,11141,8502,7587,8876,13069,7400,12103,13558,9910,9127,16766,14922,11003,9425,29384,9532,9661,8343,13017,11010,16077,9692,11711,6700,8146,10305,17976,9775,7238,10818,10375,10525,5998,7919,9575,11750,17818,9058,16196,5902,8564,12415,10362,14436,9077,8381,10970,7500,2312,8080,10996,14450,19950,19835,14600,8895,4962,7850,12910,9566,12791,5609,10933,10392,11969,10350,15997,10916,11891,8850,6238,4487,9959,15664,11716,12725,4875,8774,16079,10579,12744,11163,9376,10694,14575,18941,8877,13087,3526,8800,7228,8354,6429,11291,10858,6131,13084,7533,10626,14578,12436,7340,6575,12986,9250,10544,8288,5807,6857,5377,8736,14924,12284,8782,6452,8623,11426,8778,7996,12792,18822,12271,10350,9061,18447,12766,11576,9675,5477,4899,17433,12305,13233,9904,12982,9321,13284,12292,9542,11837,9766,7750,12722,5954,6599,8740,12038,9327,9398,7696,13834,8886,13296,12676,8078,9370,4616,13704,11527,11198,12400,11380,7241,9908,19769,12448,8089,11459,16418,6142,7275,5479,8479,13460,6600,7774,6700,29974,5900,10950,6150,18892,11110,7809,14022,18309,8195,10887,7846,11650,15060,9515,9740,14571,8901,9710,14920,9493,7158,6505,6175,5792,5417,9176,9561,10777,21855,21855,9446,5947,20552,20115,8775,16383,9544,8329,16147,9051,6000,9162,12303,10550,9814,12239,10774,7999,6812,15581,9475];
				break;
			case '3': // drums
				//medium drums base scores
				var base_scores = [29650,22600,22950,14525,40750,27150,20425,18150,23450,19800,24200,23725,20475,15425,19225,8575,32475,22300,33925,15900,22425,22850,25425,29700,24725,19450,16425,27700,23300,18700,31625,18625,19625,27500,24425,36125,25650,18450,16425,26550,20625,26275,63650,23775,32275,27750,21175,16500,29650,13275,29075,27725,20000,20475,14825,29775,19300,38825,19950,20600,19225,34750,19750,21225,33350,26800,22325,31725,34775,37675,18925,34075,18950,25075,17125,24575,7900,8750,14600,21350,27600,18275,15700,18550,25250,48425,21775,19675,27450,26375,19850,21650,19150,15375,25850,22950,17525,25675,17525,16725,35275,44825,27100,19125,26925,15800,19675,20025,24550,17575,19950,18775,21375,22100,23000,16475,16825,20025,33675,15225,15250,34600,23950,21550,23675,24050,18075,58125,19875,21050,22700,17850,28350,21600,27050,30450,31975,28350,15350,25850,8500,18575,23650,16500,16325,29775,30750,23675,18500,22575,20525,23500,14350,13700,39975,13700,11650,30000,17375,13725,15700,18125,25950,26475,20900,22000,22550,44100,22675,19975,19525,26200,6650,17550,24825,14600,15475,19625,24675,19500,28725,23250,44675,17075,26775,2100,17300,21475,29175,22050,32825,21800,12800,8925,32450,18725,9150,23775,22175,18075,18475,20125,30275,21425,26400,30900,22075,17775,23100,18675,23075,18225,24075,17650,13625,27050,23975,23950,3175,19025,20375,40800,30450,25500,22000,20300,18500,18850,20375,26575,16325,22125,25925,17775,27025,17450,19800,19475,14275,18325,29900,22975,15300,24625,29025,34525,22450,21400,23650,32900,25700,19100,28750,15300,29125,40625,28700,22075,32325,18875,19275,23875,27400,20075,21350,28450,22625,24525,13175,38000,16025,18800,21425,28025,16425,18525,30975,26825,16325,16550,21700,19025,34525,21825,32250,17550,11225,22275,48000,38400,26050,22575,20275,36250,14000,10900,20600,20325,25425,18575,21500,21850,27575,14600,16900,24925,20200,17275,40600,13800,29625,27825,13775,26400,33725,21375,22025,20275,22650,18400,21600,21150,31275,19700,16650,21950,18175,18875,22825,27625,27650,17275,33900,31600,23200,19325,21025,22950,23425,13875,80275,38225,27650,25200,14775,19825,32025,35875,28725,31500,15575,20475,18775,36800,15700,16200,23525,20100,29275,18275,31325,18175,19925,22250,34750,23675,27750,21475,19775,31325,24950,9725,21350,17400,35450,26425,19075,46800,14975,18850,30725,24300,20200,21850,59225,40850,19250,18025,24450,19125,21375,41200,13025,25525,24750,18650,19150,13775,14000,13200,8225,32300,12275,16050,21350,22900,16700,18900,21425,15525,14175,20025,24425,20050,37775,23850,25400,41000,17125,20725,23750,20775,21250,10425,14825,22175,23925,18025,22075,19200,23200,19200,24100,10500,27000,16350,23500,25350,18375,21900,19250,29800,26700,22425,20425,19825,26125,13800,19800,22525,17800,23150,50625,25600,36850,26900,22750,24950,20625,17650,26775,22950,21825,26125,17750,26600,25475,15750,22550,35025,12225,17650,25550,27450,24000,19625,26075,23400,20300,11975,22475,21300,32600,25075,28350,16550,17250,16300,48375,22425,20300,12150,30075,20275,29675,30300,43700,66650,24950,23075,34625,30200,15325,19800,21025,25075,25625,22525,18175,19975,10750,19825,29025,26050,24975,22975,37075,14575,17475,32300,32700,9475,16400,25975,24275,14325,28750,40275,16525,15175,17300,26400,27975,25550,16925,24325,23000,17200,33525,23400,31675,7400,10375,34775,19175,15800,25125,22925,22525,25550,28275,25400,18950,18975,19875,18300,14900,15725,18350,19775,27775,25150,19325,31025,23075,30350,31775,27325,20100,20100,31550,20075,23725,20750,9300,17050,27500,21125,27400,20250,29625,25900,36975,21500,45025,14475,26075,35325,17000,39475,28325,22775,24500,26500,27000,17525,26300,15225,19650,33325,21350,31725,21850,25550,26750,12675,17450,30500,21625,14075,14900,17725,20950,27475,26350,23200,6250,22275,26200,17275,16075,37575,21150,15150,24000,23400,9450,12900,15525,24025,20975,23350,15450,26400,32775,18725,47625,56925,21225,24700,27425,42025,24350,14475,26775,24075,19225,36275,24725,22625,24650,27800,11800,24525,17200,22700,18600,18100,100,16000,23525,43250,22175,26275,29175,20575,17700,22900,20050,20625,16500,26125,38800,22825,27425,24150,15225,26375,17725,39950,21000,19250,30075,17675,22850,16850,37025,30975,24475,29900,20525,39150,24900,27700,20475,19600,22375,18325,16775,16850,8900,46825,18625,25025,26750,31850,32850,37225,19050,22125,17250,38375,19275,28625,18600,24925,18775,18175,16000,28650,19750,33025,19000,17725,30875,21225,21375,18275,19875,32775,17100,23800,33075,26925,37850,14700,19800,16975,23050,21525,26000,6175,18500,19975,15475,15475,26750,16275,37900,32400,12275,30025,33075,21425,22475,18050,28275,12575,28375,17475,16525,16450,18200,22600,19575,12975,21875,29625,19575,17700,20075,33275,15775,31550,29200,30350,23450,20275,21600,29675,3275,21675,26050,28225,20800,43575,39225,26325,26750,20650,34200,17350,18250,32750,25350,32225,22925,32275,20900,25650,23625,8200,16600,20375,23375,20150,25100,21025,14625,19975,22650,35550,27625,27475,18875,28100,22275,20825,18200,19900,19200,21250,22100,14900,17825,14775,15850,12625,24450,47875,17325,22550,20425,22525,24025,18150,25500,22875,15475,22800,31825,21350,22875,14825,27450,20800,24700,54225,18975,38825,17275,29575,15475,28950,19875,36775,15525,18250,29300,32475,28125,19225,17925,35700,20625,17950,19150,12475,27375,32600,18250,43675,13200,16850,21575,27050,24200,16225,19000,19425,29450,5550,15700,23025,23100,33850,30100,30900,18000,0,11925,32700,20000,22225,16000,26375,22925,19650,20350,32125,19525,23600,22775,16875,14200,16300,27000,26875,23175,8650,15150,32900,20575,22450,26975,15425,19275,26025,32225,26200,35000,5825,17650,18750,23225,5850,24775,21325,18750,30875,26850,28750,25525,27525,19325,17600,27175,21900,19525,16075,17950,22425,16050,15300,25475,25775,14000,16725,19475,31250,29400,15925,27350,35425,22500,24200,27525,37350,25000,20125,25025,15050,12925,29175,20625,25075,29325,25925,22850,22400,20875,19050,23200,26275,18425,25325,17100,13750,8750,17700,21025,18850,21850,20750,23825,24375,21625,15950,15525,17575,24875,22550,16300,29925,18075,17900,18750,41975,28525,22150,18575,31075,14575,18650,11500,17600,14200,14300,16050,20425,38175,17800,32675,10250,29100,21750,13175,25625,22250,18800,21350,11200,25575,28325,22925,19250,27600,15825,29000,23175,19475,17825,23050,12700,18275,16225,25075,16050,22200,48550,47050,17775,17425,40050,39750,25975,21700,17550,20325,31400,26650,13150,15900,28075,29750,14875,35950,23050,16125,18125,23625,14975];
				break;
			case '4': // vocals
				//medium vocals base scores
				var base_scores = [14200,20800,14000,9875,17800,7850,13975,26000,11900,19200,8450,15200,23300,15200,16000,9600,16625,20400,19900,17200,17150,10975,14200,15225,18400,13900,14400,17700,27600,17525,24400,13900,11525,16925,10200,21200,21200,9425,10400,13975,23775,18400,23400,9200,21200,22000,28000,18750,28800,11325,26575,14000,17000,13400,21200,20325,18800,22325,9475,14800,14800,20925,9600,15200,25200,25000,21200,21200,15600,22400,21200,15150,17200,14000,18000,19625,14050,9600,19600,25200,25200,19300,12400,13200,27200,19625,11100,19600,7200,23875,9600,9200,11200,14400,13525,20000,8800,16400,22000,14000,15500,17500,17600,20000,18475,8800,12400,14400,14400,21200,22000,16800,16000,16400,14000,14400,15200,17600,18800,12800,17600,15375,22800,19200,13900,11725,14000,16875,19900,11200,17400,17200,25200,14400,0,21850,18600,31200,17200,18275,4550,16000,22400,15800,13200,13600,13600,14275,15600,17050,21625,15600,15075,13200,31725,13600,13600,17600,18225,12400,12200,13200,16800,12800,20175,17200,9200,33475,22575,14450,19600,20250,9300,17600,12400,16400,11200,16350,14800,19600,18825,24000,17400,22000,17600,6400,11600,19050,20325,16400,19725,16800,14025,7200,16375,9200,13000,18500,13350,18800,10900,23600,14250,9200,26375,20275,13600,15600,16800,23200,23200,13875,11400,17600,7200,12800,21600,36800,4000,15200,15950,18225,30800,19375,17950,23975,14400,16000,20400,16000,9600,15200,24900,20000,14800,15600,12400,23200,17200,10900,26800,24800,18000,15100,13200,14025,14400,18400,16400,17550,19600,21200,14400,14400,14500,16000,23250,18550,21600,10400,12625,12400,28000,20000,22000,15700,17800,18000,17600,23550,14800,13600,11600,21600,18800,15600,11175,18400,16000,12000,12800,17600,13200,23625,17675,13200,13200,18400,24300,22625,14400,24000,11200,18750,10000,12100,16800,9650,19275,20800,12800,16000,12800,11200,15375,12400,13450,13600,39600,15200,14800,17350,16400,21325,23000,16400,12750,14675,17500,12800,9750,19200,36500,17250,15600,13100,16200,21600,16400,20850,20400,14400,31000,24000,16450,18400,11000,12400,14900,13600,17350,14600,10800,15200,17200,12800,20400,18700,20000,19600,26400,17100,16400,6400,11950,13200,14800,18500,16625,12800,34800,19200,16800,22800,17600,10075,14350,16000,12000,28000,16750,10375,13600,22400,16800,16800,18400,15200,19550,31200,20000,16400,13200,17675,29700,26625,16000,17175,17200,11950,15725,19200,11050,21475,18000,12000,10400,13600,10400,11950,15600,13725,11200,11600,12800,18000,13200,20400,15600,15600,11600,14800,10000,16800,21950,11200,14800,19800,18800,14600,13600,18800,16400,4800,10400,20800,23100,11200,17550,21600,16625,9875,19200,14500,19200,26400,18800,26000,15200,14400,17725,24800,10600,14000,15600,26800,14725,22000,18400,18450,16000,14400,26000,20300,18800,18250,24000,19000,22400,14000,13900,15650,17200,15600,15600,17900,24800,10800,17900,21625,10800,22800,19200,12800,16800,21200,20100,22800,19200,15900,14800,10475,22400,16400,17200,12025,24400,17975,12800,18800,11200,0,20800,21200,17700,13200,21775,19200,19550,17600,20000,26400,16000,12800,20000,14125,15725,20800,27600,22000,16400,11600,19975,32000,20200,22400,19600,14800,13200,12400,30400,11650,17125,14000,8025,12000,12800,23775,18000,8175,21200,18025,19200,12700,20475,22000,12625,9200,16775,6000,15200,8100,0,10750,25200,11600,20000,11200,12650,22800,24200,16000,13200,9400,22800,19200,9000,13200,14000,15400,18000,18800,20450,19075,15925,20900,13125,17200,15925,17600,11625,11600,17200,18625,9600,18525,19150,17300,15800,11600,16000,25175,20000,13200,19250,10800,13300,17650,24000,21200,17600,18000,14650,24800,14000,20400,16000,21175,23600,25450,18800,17550,18275,10400,13000,17600,13600,14450,14400,6800,20400,14800,16400,18225,19050,18000,10400,12400,12800,16800,12800,24400,17200,15600,17600,19575,10000,9200,18400,12750,28800,12800,12750,16800,18925,17550,17800,21500,9200,9600,19100,19050,17400,11200,18400,22300,17200,12400,10450,19600,18750,10800,10800,11950,16000,20000,9600,10400,24800,14800,14800,20050,21200,9200,20400,18000,28800,19700,13200,13700,16375,22000,20800,17100,22400,14000,12800,17600,20000,18575,16250,17200,16700,28000,23600,14400,16000,18350,13600,15675,15600,17600,13450,19600,15600,19200,16925,17775,26000,16400,13050,16650,12200,22400,21475,14000,17100,17725,25200,15600,10800,19775,16400,16800,20400,16400,15500,17200,8350,16575,21200,22000,20800,18800,17825,9200,21600,10400,0,19600,16800,17375,15200,15600,25200,11600,17125,18200,27600,0,19150,8000,27600,13000,11600,13200,15200,15600,19800,25400,12400,25200,24800,11200,15600,18300,23150,10800,23525,12400,16800,19250,18000,21525,10800,14000,19475,29775,16950,12400,12575,22000,12950,22700,14075,13650,14850,18325,17950,14400,8850,18000,22550,11950,13575,29050,14800,11200,16000,25200,33625,19600,13600,19600,10000,14775,29600,30950,14800,23600,15200,17600,8800,16850,23200,9600,24000,11600,13600,22400,22875,19325,26000,19050,11600,26400,14475,17625,18000,18000,18800,22000,17200,11750,20000,15600,12800,13200,7600,30675,21600,25200,10800,33200,23200,20400,23275,21600,18800,18800,20800,19200,9925,17200,20400,12000,14400,41600,13600,15200,15700,0,18400,18575,15600,9750,16400,20000,20800,16850,27200,18650,17600,19600,14000,12000,17500,8800,26950,27200,8800,26000,9200,12850,17600,24800,14825,10000,22400,0,8400,1900,6800,21200,14625,22400,14400,19475,23600,14400,14400,16225,13600,23200,28800,24000,8400,18600,16000,12800,13600,16000,13200,16800,10400,17550,23200,29200,30400,9375,11375,26400,17000,17600,24400,14000,13175,12750,26400,15725,25100,16000,11575,19200,18200,12800,20750,14800,10800,12400,24000,19600,10800,24400,16750,21600,32800,16800,16400,14525,15600,18400,12800,10425,15600,9600,11200,16800,14800,15475,16875,9200,18600,20800,18000,13250,15750,22975,19850,14800,25200,20800,16800,20800,16750,17200,20400,24225,18800,22400,11350,14800,28400,17600,22800,24000,17200,10800,5200,18400,21200,16000,16800,10400,15600,15200,18800,17600,16950,23200,12750,17600,18400,19800,20800,12400,14800,14100,15200,14025,19625,20125,6000,15200,15200,12825,16400,9200,12600,13200,24000,11000,14500,9025,19200,12400,14800,23125,13600,18400,18275,9600,15200,14800,19450,18800,19600,19100,14025,20400,14000,10800,20000,12800,10800,20325,24000,12000,15175,25925,25925,18000,13200,18675,18925,10300,13600,13550,16000,21600,16000,19200,12000,21475,24400,11600,18050,12400,12000,14000,0,14925];
				break;
			default:
				break;
		}
		break;
	case '3': 
		switch(group)
		{
			case '1':  // guitar
				//hard guitar base scores
				var base_scores = [24946,23872,25335,26635,43281,15660,25762,9650,23835,18050,16632,26701,21045,17913,35146,14925,31688,28191,43297,16090,20706,30518,20554,38201,31491,18735,23783,24020,39878,28037,19381,30906,38150,32478,15771,41279,29400,24818,15540,23438,25834,21922,68303,21993,16836,11093,22167,18624,32060,16242,42374,25211,22597,18549,9078,29859,36475,21510,15368,20161,21168,28162,30086,25700,27768,28812,22370,29686,31576,31400,16122,40048,23753,18592,17255,29133,25222,11530,16872,40156,26282,14331,10161,19357,24486,44001,16365,18230,32161,22104,17916,20759,24650,18244,21560,24146,18146,21448,16879,10500,29643,29591,33589,19315,23220,13754,17029,11989,45494,19480,22905,36662,24400,17419,25215,25212,20365,18550,10164,14272,14165,23960,28380,31347,15346,20570,18608,51440,24623,19103,16021,21864,22806,21253,30817,21706,22825,26951,19119,26659,5186,18778,39777,15382,22904,29286,27906,25266,21667,18882,30372,25664,15824,17618,20962,22058,17657,37148,19649,17525,16591,11704,26603,23047,25725,22364,20716,60402,27654,10402,27242,28534,11940,21402,17709,13953,19391,35027,19573,20000,27888,27011,20571,20323,19206,5752,13534,20472,30313,17990,31166,48966,16374,0,17016,9167,13799,34683,25248,23162,31019,25655,17991,21232,21877,40131,30125,18636,32964,17584,23712,30857,57149,22542,18926,25419,43341,21861,8231,20012,19354,30630,23937,21592,18015,31016,11644,13578,30766,31145,15675,18758,37923,17014,29668,26125,27766,37302,26079,12619,24190,22159,18833,28366,26743,33037,29180,14692,20219,29839,38157,30796,16013,16939,17915,37796,19475,11482,28332,21483,27589,39810,23347,28121,22741,18975,32208,22333,20008,39042,20747,23352,20750,15588,18546,16473,30170,27679,12758,14310,18317,21401,33752,28066,32127,15373,19734,21827,36530,24744,38592,42343,10912,23236,25023,13475,34953,20994,28066,22589,17055,22896,25365,19269,18991,24284,28152,17990,37813,21784,20771,32202,12392,33079,41294,23370,28241,17051,24284,12371,24151,29813,19843,19993,16256,13951,24008,19202,31552,24658,31982,29361,45289,25998,22251,15409,14013,30348,34330,17435,57455,28465,14877,15005,15566,18635,18717,39356,38829,29150,16223,28254,32315,34384,12783,12306,20753,18400,35870,19067,33384,25528,27430,20508,26078,19449,9772,23550,18480,26263,27167,12973,22042,29315,26062,20002,24260,27066,17323,19154,25372,27530,33157,33932,54552,42324,25917,16474,21988,16563,28961,44100,25176,19694,23828,13528,19975,15810,13681,9812,12360,28409,17566,20882,19349,29475,15595,22748,25691,12915,18255,14027,19428,17627,20830,20252,42380,25172,29742,23158,17782,26145,36282,20454,24868,32360,29894,17471,14678,24773,25968,21649,26815,15817,19909,23953,22242,21549,23111,16180,30664,27045,12277,25992,20551,15509,20676,16837,36528,22610,17054,18188,41172,27248,30246,44994,21394,35238,15504,20201,31818,22454,25266,21214,19526,23409,27902,22461,37058,28290,7902,26414,24165,35651,22073,26723,30448,20612,25125,19722,27112,12679,26569,23894,17896,24306,29016,18677,46896,28117,19813,19179,25280,16696,29279,17815,31175,49863,26210,34045,35453,25016,19751,34720,24245,21730,22033,29120,19062,30086,10290,29209,18113,16525,20422,31595,33823,20693,14009,26636,27478,24373,22287,34850,26319,16728,11804,38763,15882,17925,23535,39808,17384,21965,26785,24417,14206,13608,36965,19371,22699,18577,5450,56151,20130,13102,25959,20133,27689,23315,25318,23861,38002,12736,21024,22048,8952,19620,19614,13976,46505,30467,28784,17168,22545,15183,26889,32039,24677,33136,22910,22039,21645,33334,12600,15665,24570,31495,26139,32678,20991,31661,22418,24244,34064,19640,34087,32234,21978,27900,29927,19753,23432,28675,14544,17641,16347,26476,16101,42232,20076,29738,20466,27189,22559,12134,28779,29302,31987,6821,20305,26928,15380,45979,35749,25613,11868,24930,23201,27598,24602,16405,20812,18446,14977,24145,12511,10948,24675,15402,19077,14181,16654,30557,35513,22372,35637,47494,31172,20546,45200,37790,24747,13648,34655,30414,19851,42371,24271,19794,28674,26899,20039,23950,18706,21157,18202,14755,21904,21807,20909,38836,24636,28658,31720,23319,18909,30147,32797,24229,20526,33353,20566,27123,35704,27420,21342,26192,29767,35227,21448,35015,26303,21872,25110,23680,27385,33073,22270,36124,28126,28647,18307,34835,20155,16543,23265,24099,28513,20165,14193,51587,19591,25040,28952,41200,22228,35477,13375,22030,15849,37616,30550,26780,18713,27096,24314,17116,19254,22365,25071,31415,39486,24154,25214,23062,15513,30617,39624,27813,13945,26740,27946,24081,45633,27552,19242,15717,27046,19847,18975,8337,33096,18402,16948,17109,11649,16288,37285,25677,15411,29968,60299,23899,25128,19705,31268,12986,21779,11408,23311,13839,13969,28239,17943,13970,18686,39476,19467,22078,26611,30804,11058,31329,32834,25744,20384,22605,21224,25441,8940,36549,25727,26146,21664,41560,15748,20547,35052,23851,47799,18906,20213,30543,32690,32062,24766,54465,25184,21819,23360,26188,13252,25268,37344,23849,22407,20776,12945,23962,14385,22270,15923,22138,13089,29519,20191,21015,15886,21184,25542,27141,19657,13913,22215,18090,15703,18942,26789,32747,17719,25684,23970,22187,17152,19624,24578,33611,15881,23578,37258,22652,18448,15061,21381,17413,22708,62488,16113,23548,16351,20882,21900,31974,35531,37446,20064,21263,27145,29002,36830,18066,23089,18877,29190,31869,16218,11175,62393,34525,26522,76622,11776,21881,21279,15804,20389,29953,20349,23659,19217,5531,26362,15789,31202,34543,24219,33548,26787,16500,17414,27743,18215,32172,28023,27533,24324,28890,19684,20836,16928,26065,27594,19795,15196,25048,34975,37399,39049,10197,22411,29706,20662,21485,24121,19927,34214,31039,39098,19843,29267,9324,26250,25594,25478,7618,31918,20929,19762,26730,21314,19802,37123,33734,18685,24936,31910,27881,22550,26862,23286,13729,25536,22200,35186,18051,13971,14917,18314,18650,19573,15689,19553,35543,22042,19175,15277,27174,18425,23383,14456,24407,22836,37109,25496,22611,23888,26326,28767,27053,33022,23775,19143,14668,24543,25799,27608,20382,9088,17635,22868,21820,16273,22867,14775,27652,27247,25191,24903,13163,24691,22624,22264,33261,14251,20090,15600,32172,28847,17680,24791,41226,15971,22912,8479,18655,18836,17542,15643,18601,38779,22070,32416,8554,29039,22722,15050,26108,22646,25488,25372,14513,30734,23176,21869,26635,26323,24702,18915,26945,19163,15132,17420,17283,25824,16190,31288,21538,44364,37083,36544,26458,14660,36608,40389,18888,21467,10604,15724,28485,27278,17897,19994,27803,17244,18504,24490,19514,20564,19004,22920,16022];
				break;
			case '2': // bass
				//hard bass base scores
				var base_scores = [21736,12203,13902,17293,37350,12920,16115,10350,12159,13139,20744,20480,13965,22152,27423,7565,20311,22459,28514,22733,25652,18957,15703,21096,18141,10374,10853,16600,20228,16108,13375,23934,18575,26249,15855,29788,17550,12723,11135,12927,14657,11900,53210,11859,11620,8152,9353,16111,17879,9709,18135,21294,15329,11053,10942,16976,20387,18265,9049,11686,10713,20843,22758,12600,22246,21910,11550,17040,23177,23561,10268,28461,12575,12850,12393,14504,10216,8705,10996,17480,13630,6404,10362,12110,19960,35715,20017,12460,18382,22293,12821,22058,15475,13298,19034,22162,8438,13106,12701,9855,19323,27411,23012,12668,23923,13750,14425,12077,23334,14793,14702,18142,13419,12724,15750,13486,13844,13166,8850,12132,10046,18525,18023,20887,13290,12624,10914,24686,18238,19898,7733,16177,19064,9434,30490,18602,21215,17994,13725,16034,3263,15366,23149,9266,13491,26728,17737,19767,13957,16558,18428,16885,11078,8600,12152,11894,12776,30832,10394,10975,11309,9468,15197,16690,12300,16045,17869,42263,15972,6507,14949,18562,8467,17379,20795,10790,8700,21825,12074,12650,17276,16350,14425,12523,16915,3584,13206,19388,32841,10185,23708,24365,14545,8254,21051,10868,6662,19529,15447,17547,15413,19027,11981,15216,21450,29053,19550,14900,17319,9548,24754,16301,20623,10832,13285,23917,25018,18479,2030,15992,14258,24446,18898,16769,8565,12520,17525,15283,19126,24730,11045,21952,21950,15163,9023,16163,18258,15446,16251,11209,19449,18691,18602,17089,25646,36668,16535,10633,19830,14937,26116,14489,18458,12626,14646,29674,17138,5674,20990,13792,19869,23866,11343,16876,16773,11798,21200,14432,8138,38341,23231,8940,15937,5922,13500,9855,19682,12326,10626,15775,18000,18734,33529,17205,33953,8925,6745,18079,23503,18539,27279,22552,14669,15960,12224,6058,11315,12775,19022,13176,9980,12366,15891,11193,17005,13692,21459,13683,22850,12257,16525,21476,6612,24712,21109,12360,17023,17760,15339,13846,23770,13947,16215,18520,7434,9637,16363,16367,18512,16011,19919,14332,31178,16168,13249,17770,16055,23881,23837,12232,50558,22705,13755,11253,10478,14789,15574,28333,22760,26550,9530,14228,12938,32531,13446,7466,6977,15502,25540,12395,10845,16631,15209,22624,19842,14100,17631,21916,13782,25141,15617,8108,19267,15749,17143,14707,11721,33984,12125,11671,21255,16072,14915,22873,46008,43735,5770,9924,14225,8686,31351,36326,14614,9873,16817,12060,23983,12095,8946,10990,6863,20399,18671,7333,18190,15339,13025,12390,15878,10574,11044,12534,6967,12070,13989,8050,20960,19839,13014,18086,13752,20680,14767,9293,21296,18538,17947,5997,11624,11340,21400,13635,12465,7612,16613,7185,15593,12464,14473,12083,16513,17473,13131,19269,14124,10927,16790,10028,14908,15770,12279,13589,27726,17445,16713,11151,18972,34232,17815,14397,14873,19756,16610,13673,7519,18069,22988,13280,22675,36865,8910,23496,19655,16376,13847,11897,19177,11496,13943,11992,26575,13100,25137,26387,16405,11572,11608,10574,30153,17607,9098,11840,21812,12244,15615,14449,40481,56880,16468,19137,33029,16308,22550,16196,15425,18512,18400,10713,10250,14037,5233,16765,14575,9642,23279,22895,12795,13845,6062,12427,26007,14014,16890,15975,22584,15955,11878,30357,13471,10904,18112,17484,9258,16400,14499,13338,9965,18000,13627,13276,15083,6125,12174,26086,12911,9027,24275,16280,29379,19407,19428,14883,16525,10754,5722,15140,8103,13727,18386,12162,24789,29873,15319,22148,18653,19975,19579,30716,25426,15913,11536,17378,19170,20190,6007,8870,12064,19496,20374,22835,18837,27177,23112,12847,21868,10365,20574,25137,7785,20550,23341,15863,18556,17172,16029,12128,13778,10381,11045,27049,18587,23785,15595,21070,11705,6545,16440,13374,15881,6440,13234,14135,15018,37751,28403,16401,7399,17230,10849,17363,15642,7544,14093,9407,9994,17403,7723,7608,7986,14401,10126,11995,14758,21802,17627,7066,27451,44822,19675,12954,28493,27599,27309,8367,18272,25868,10666,27905,10351,15151,22293,19734,9783,17830,10673,16232,20610,15687,9277,13578,9099,36263,19715,15113,24289,17176,12405,16574,27280,15654,14596,23412,12868,17342,23103,17171,14150,15061,15005,25791,13178,15510,14778,17232,16286,15128,26278,22384,22875,27882,21440,19223,12582,20608,13880,10309,24075,18251,10845,15496,8894,42316,22500,16824,18520,25938,26643,24929,10294,16531,12295,30075,17675,20842,10054,17611,15837,12764,17435,21139,19908,25627,18729,16394,21204,9220,10875,12019,27722,33025,12824,25878,25985,23308,34782,19699,16392,9898,16803,12958,16925,5155,18656,10216,14328,15168,14575,13944,24281,18800,9396,19176,33725,16746,18845,20238,19231,6440,21843,8204,12100,9941,10521,22772,10825,10801,16534,28487,13885,7304,24768,23369,12853,23512,27044,22698,9275,13490,18171,19229,3870,14565,22712,19756,11884,28769,16557,18865,25173,14050,36088,17466,14504,22581,17961,24430,17505,34591,16030,12307,17378,4814,6271,16618,20912,18035,14538,21138,6330,15017,7150,23543,21390,17657,7732,24579,12825,17044,22600,17147,20617,21000,12721,14979,9577,7997,9969,10936,16175,32020,12326,15964,16866,15952,12960,13165,12724,21130,11140,19824,28155,16093,18277,20630,17981,16373,14950,38929,16241,19794,15436,24236,14503,20635,15701,17247,10609,10280,18119,34362,18284,10279,14821,16395,18735,8407,13180,15875,17362,24490,13958,19272,8410,16447,20405,16547,16111,14883,10734,19832,18809,2785,12650,15151,20535,30006,34855,29027,14174,6602,10819,23179,14129,20252,6213,17251,20765,16897,14531,18528,13121,16648,13507,10739,8271,18514,23719,18587,19600,7311,13820,19689,15122,21744,20566,16310,17004,30922,32212,14061,16557,5619,13575,13562,15088,6884,19002,18027,10384,19354,12680,14561,25993,22686,10577,9458,20448,15109,17188,11022,12349,13237,12081,13097,23214,14264,10328,9261,12373,14577,11704,9292,20068,23974,15429,16475,10880,24908,16319,14753,12409,8359,6499,24006,18051,19489,14338,17048,19093,18929,22538,15905,15417,15643,10142,16897,10418,11532,11840,18233,16747,12796,13216,14630,13083,25223,22031,12408,12141,5747,21155,20782,13323,20604,16594,8313,12574,27744,20156,14056,20391,29056,11610,12187,6457,17898,18522,12485,12674,10579,33798,11850,21676,6850,27613,17267,12034,16187,19927,12552,15441,9824,16752,27659,11490,14543,26450,15630,11846,22481,15941,10313,12991,11066,8900,6976,16728,16173,14106,34480,34480,15770,8266,34297,34719,16975,24983,12798,12722,31185,11531,10166,13402,19687,15975,12866,15785,15409,14518,9114,22426,15350];
				break;
			case '3': // drums
				//hard drums base scores
				var base_scores = [49850,26025,28900,18600,55100,30600,31950,22125,27350,30625,32675,39075,30575,24625,33000,14700,49150,27100,44525,25375,37650,33750,33975,39850,38575,30625,21275,33275,35125,29525,37200,27300,33150,36200,26475,44575,41875,24825,23050,37200,29225,31775,86000,27450,35200,28375,25925,28500,33025,23925,41725,37175,26450,28850,21375,42125,24725,45950,26000,31825,24075,40150,33350,27025,50250,39650,35450,39025,39825,55475,24075,45075,24575,29800,23875,28025,11025,12900,22200,34250,31425,22200,22900,28000,34025,63800,29925,27700,40350,34725,26725,34300,21325,20125,30850,40600,22300,34900,20600,22750,46375,53500,37275,29450,38225,20600,21650,26175,39100,22550,32725,26900,28300,30000,25725,21325,26875,23275,50800,19050,19300,39600,40925,38775,26425,33475,23475,93200,28375,28950,23850,27125,41400,35950,36975,38100,38300,39000,23325,33650,9675,24550,31650,27450,24750,39875,42650,28350,24800,33025,27350,27550,19000,20900,43525,16000,16600,45050,22700,24225,27775,35500,37325,32275,34700,27275,38550,63825,37750,29275,24300,39875,13800,20800,31775,16875,25300,31900,28400,31475,39200,38250,52725,23950,40025,3600,31475,29850,36425,24600,40100,37175,20000,10850,34425,21800,9575,29225,26725,29175,26025,31975,38125,34475,43950,48425,32325,25225,28550,26800,39600,22400,27925,22750,23650,35575,37150,31800,4000,29600,31025,57400,36625,31325,26750,24950,32625,26300,35225,33350,22750,31300,37475,24225,30250,27600,28600,23250,23925,21175,37125,37600,21075,29800,37800,57925,35100,26850,36675,36825,37800,29550,33450,22200,35125,49850,36900,24700,39625,29175,30400,40175,47850,32250,26850,29400,31025,34475,17625,58175,27625,22425,34100,30525,22325,23000,38200,31325,25150,25950,26425,26025,49725,26950,44600,24325,18000,29525,59150,45075,35225,40400,22100,43175,22350,21975,23050,32350,29825,28525,28050,29850,32525,18450,22525,30950,30175,21400,47650,19425,32875,36175,17925,31275,36475,27675,29300,34675,33275,23500,26550,25825,39700,32825,19850,29450,31150,23725,33225,33025,34725,27500,53325,45800,27225,32900,23325,37850,36725,21825,87900,43750,34750,31525,17650,31625,37400,51175,44575,43500,23725,27325,27025,55200,27275,22075,30275,24375,35800,23425,42025,28850,27175,28025,40425,31200,31600,29750,25275,52350,31150,12025,29450,30650,38975,30950,26175,56300,16775,26350,41100,31075,26950,33575,88950,52225,22250,21875,29975,22725,36750,57200,18950,27150,30900,26525,26375,20250,21275,16925,11125,42925,15825,18475,40600,29800,28500,26325,29175,27125,22425,28700,33450,25000,40150,26050,39500,44150,27525,26775,28200,36600,39800,17025,17500,31525,32900,18625,31875,24700,32725,24425,29275,14100,45300,22525,32925,32575,28550,31425,35350,36750,30300,31225,32175,24850,29775,15775,31600,26475,24750,24500,82225,43175,43700,33900,31775,49050,30525,29975,30525,27875,29125,32075,27000,31225,31475,25175,34800,40650,14450,32425,41200,31250,29950,24700,47075,31775,24275,18375,30350,23575,37850,33825,31825,23175,23775,21300,56650,30125,24250,13200,37225,25725,38200,33900,50300,81775,37525,30525,53500,34100,21350,25350,26925,36100,38050,39150,23600,27150,20100,26250,32225,33475,29400,35525,38075,23675,21100,35100,48700,14325,24150,31550,32400,22650,33575,54600,22500,19600,25575,35525,31925,32300,25025,30225,32025,25550,38375,25600,38475,10300,13300,62475,26625,26850,32125,40575,31075,30500,48150,32900,31750,23200,26050,24400,19525,24350,22275,22025,37050,30125,28725,48225,30000,36600,37400,48300,35600,28250,34600,26025,34600,34725,12425,21625,32450,29475,34125,30650,35550,44950,41550,27100,57775,19600,31925,44600,22525,46575,42750,28975,37725,36800,34825,21350,39925,22975,26000,51675,31800,39400,32800,30675,31050,14625,29075,33875,29775,17750,24175,30450,26525,34250,36100,29350,9325,31175,29725,23125,25250,43675,25825,19200,27900,37200,24750,19350,22175,36025,24975,26025,22025,35725,45225,21200,63675,76225,26625,33200,45275,48600,38975,21800,38250,33175,21400,48525,28925,29550,35375,37350,17400,27375,23425,29550,32700,23350,200,29075,24900,65750,27900,31800,49475,31225,30750,33500,28525,22425,20325,32250,53375,27275,37650,36600,25400,30725,28550,48125,26750,27875,38175,25500,30600,22100,54525,49950,29775,38600,27075,47200,30700,36700,29950,28000,36275,24025,21500,26325,12025,71525,28600,28950,44100,36100,57775,46450,25000,26250,22775,58050,24125,35075,22450,28475,26500,23375,25700,33200,25075,40975,27150,23450,39800,23875,28350,28600,29125,43875,19025,37900,51000,39800,56500,18325,25675,20275,28400,31850,32700,10350,30650,23400,26050,21450,30475,21225,46100,42425,15250,38850,39475,31950,24950,23175,36175,14725,35250,22275,25425,21475,21300,38025,31750,20950,30925,43725,31200,20200,27775,40825,20500,46925,45950,43725,26650,32025,30375,36975,4875,28025,32775,34125,33400,52850,42400,35825,49675,34925,57850,24775,29675,41775,32925,40225,31525,40875,27650,32875,30775,8750,19750,31300,30875,38325,30750,30150,19250,26250,24500,54075,46125,44600,26175,44925,37950,31800,29675,27075,29225,31750,25450,19825,20350,19925,21725,16825,34325,54900,21700,31925,35700,28000,29500,23250,39500,36125,23900,32000,46525,26850,31825,20575,43150,24775,37600,80675,26325,42325,24375,44475,21300,37575,32200,43975,20525,22400,33750,38175,35125,26625,25125,36775,36775,26900,25875,18025,36025,48275,21575,66900,20800,25200,29400,30250,29725,22200,25200,27900,33625,7675,20475,28425,38175,50225,43825,45625,23725,0,18600,40850,33275,30500,17975,32875,40525,28225,27425,40025,22000,28225,29100,22700,21050,24425,35150,33375,29900,14150,21625,46525,25825,28300,33725,22225,27950,40250,41100,31975,41150,10000,21100,25150,34150,6200,32900,34950,22700,38350,39325,33900,34325,38750,20900,20150,41575,28425,32300,26675,26900,27125,19150,23300,37675,29400,19250,25775,26525,39825,38350,20150,38225,47925,27675,33925,30550,45500,30900,32950,33425,18975,22300,56475,29325,30375,41675,33775,31850,36375,26625,29525,40325,29100,21450,29450,23275,18900,12375,25775,26525,21650,30450,26550,30350,36600,36100,22625,23250,21350,39175,37500,23925,39875,22775,24025,27225,56800,40900,29425,30650,48250,19075,31250,13900,27850,18200,17300,24100,30125,45325,21950,41375,12300,48950,34300,20375,30200,28950,30325,35875,16900,33975,43175,36975,33225,35725,22450,35000,34050,27250,27725,27075,18975,23575,19775,44675,22850,27600,65575,65575,28600,20725,58225,61500,28525,27225,24000,23750,48525,30225,21675,24950,38325,35900,18350,44375,31250,25425,28800,38375,18800];
				break;
			case '4': // vocals
				//hard vocals base scores
				var base_scores = [25800,41600,28000,19075,34200,13850,25975,52000,23100,38400,16050,30400,46100,30400,32000,19200,30225,40800,37900,34400,32750,21375,27800,28825,36800,26700,28800,33700,55200,33525,46000,26300,22325,33325,19800,42400,42400,18225,20800,25575,45775,36800,39800,18400,42400,44000,56000,36350,57600,20925,51375,28000,31800,23400,42400,38725,37600,43525,17075,29600,29600,37725,19200,30400,46400,47000,42400,42400,31200,44800,42400,29150,34400,28000,36000,38025,27650,19200,39200,50400,50400,38100,24800,26400,54400,37625,21100,39200,14400,46275,19200,18400,22400,28800,26325,40000,17600,32800,44000,28000,25500,26700,35200,40000,33275,17600,24800,28000,26400,42400,44000,33600,32000,32800,28000,28800,30400,35200,37600,25600,35200,28575,45600,38400,26700,22525,28000,29275,38300,22400,33800,34400,50400,28800,0,37850,36600,62400,34400,35875,8550,32000,44800,31000,26400,27200,27200,28275,31200,32650,41625,31200,29075,26400,60525,27200,25200,35200,35825,24800,23800,26400,32000,25600,37775,34400,18400,59875,44175,26450,38800,38250,18100,35200,24800,32800,22400,32350,29600,39200,35625,48000,33400,44000,33600,12800,23200,37450,39525,32800,37725,33600,27625,14400,31975,18400,24600,36100,24550,37600,20900,47200,26650,15600,51975,37875,27200,31200,33600,46400,46400,27075,20600,35200,14400,25600,43200,73600,8000,29200,30350,32225,61600,38175,35150,47575,28800,32000,40800,32000,19200,30400,48500,40000,29600,31200,24800,46400,34400,20900,52800,49600,36000,29100,26400,25625,28800,36800,32800,33550,39200,42400,28800,28800,27700,32000,44450,34950,43200,20800,24625,24800,56000,40000,44000,30100,34200,36000,35200,44750,29600,27200,23200,43200,37600,31200,20775,35200,32000,24000,25600,35200,26400,45625,32875,26400,26400,36800,45100,43425,28800,48000,22400,36750,20000,22100,33600,14450,37675,41600,25600,32000,25600,22400,29375,24800,25850,27200,79200,30400,29600,32950,32800,36125,44200,32800,25150,28675,31500,25600,18550,38400,72500,32450,31200,25900,30600,43200,32800,40450,40800,28800,58200,48000,32450,36800,21800,24800,26500,27200,26950,24600,21600,30400,34400,25600,39600,35900,39600,39200,52800,33900,32800,12800,23550,26400,29600,36100,31425,25600,69600,38400,30800,45600,35200,19675,28350,32000,24000,56000,32350,20375,27200,44800,33600,33600,36800,30400,38750,62400,40000,32800,26400,34475,56900,48625,32000,33975,30400,23150,29725,38400,21450,41475,35600,24000,18400,26400,20800,22350,31200,26525,20400,23200,25600,36000,26400,40800,31200,31200,23200,26800,20000,32800,42750,22400,29600,37800,37600,28600,27200,37600,32800,9600,20800,41600,45500,22400,34350,43200,31825,19475,38400,28100,38400,52800,37600,52000,30400,28800,34925,49600,20600,28000,31200,53600,28325,44000,36800,35650,32000,28000,52000,39500,37600,36250,48000,35800,44800,28000,26700,30450,33600,31200,31200,34300,49600,21600,32700,42025,21600,45600,38400,25600,33600,42400,38900,45600,38400,31500,29600,20075,44800,32800,34400,23625,48800,35175,22400,37600,22000,0,41600,42400,34500,26400,37375,38400,36750,35200,40000,52800,32000,25600,40000,26925,30125,41600,55200,44000,32800,23200,38375,64000,39800,44800,39200,29600,26400,24800,60800,21650,33525,28000,15225,24000,25600,43375,36000,15775,42400,35625,38400,23900,40475,44000,23025,18400,32775,10800,30000,15300,0,16350,50400,23200,40000,22400,25050,45600,47800,31200,25200,17800,45600,38400,16600,26400,28000,30200,36000,37600,40050,37475,28325,38500,23925,34400,31125,35200,19625,23200,34400,33825,19200,36125,37150,32500,25400,23200,32000,49175,40000,26400,33650,21600,26100,30450,48000,42400,35200,36000,28650,49600,28000,40000,32000,41975,47200,49450,37600,31550,32675,19600,25400,35200,27200,26050,28800,13600,40800,29600,32800,33025,36650,36000,20800,24800,25600,33600,25600,48800,34400,31200,35200,38375,20000,17200,36800,24350,57600,25200,24750,33600,36525,34750,31800,35900,18400,16800,37500,35050,34200,22400,36800,44300,34400,24800,15250,39200,36350,21600,21600,22750,32000,40000,19200,20800,49600,29600,29600,39250,42400,18400,39200,36000,57600,37300,26400,26500,32375,44000,41600,32300,44800,26000,25600,35200,40000,29375,31850,34400,32700,56000,47200,28800,32000,33550,27200,25675,31200,32000,26250,39200,31200,37600,32925,34975,52000,32800,25450,31050,23400,44800,40675,28000,32700,34925,50400,31200,21600,38175,32800,33600,40800,32800,30300,34400,15950,31375,42400,41200,41600,37600,33825,18400,43200,20800,0,39200,33600,33775,30400,31200,50400,23200,33925,36200,55200,0,37950,16000,55200,25400,23200,26400,30400,31200,37800,49000,24800,50400,49600,22400,31200,35100,45950,21600,45525,24800,33600,38050,36000,42325,21600,28000,38675,56575,32950,24800,23775,43600,24550,44700,23675,24050,29250,35925,34350,28800,16850,36000,44150,22350,24775,53850,29600,21200,32000,50400,65225,39200,27200,39200,20000,27975,59200,61750,29600,47200,30400,35200,17600,32050,46400,19200,48000,22000,27200,44800,44875,36525,52000,35850,23200,52800,24475,34025,36000,36000,37600,44000,34400,22550,40000,31200,24400,26400,15200,59075,43200,50400,21600,66400,46400,40800,45675,43200,37600,37200,41600,38400,17125,34400,40800,22400,28800,83200,27200,28800,30900,0,36800,35775,31200,18150,32800,40000,41600,32850,54400,36650,34400,39200,28000,24000,34300,17600,52950,54400,17600,50800,18400,24450,35200,49600,28425,20000,44800,0,15600,2300,13600,42400,28225,44800,28800,35875,47200,28800,28800,31025,27200,46400,57600,48000,16800,35000,32000,25600,27200,32000,26400,33600,20800,34350,46400,58400,60800,18175,21775,52800,33000,35200,48800,28000,21575,24750,52800,30525,45900,32000,22775,38400,35800,25600,38750,29600,21600,24800,48000,39200,21600,48800,32750,43200,65600,33600,32800,27725,31200,36800,25600,20025,31200,19200,22400,33600,29600,27875,28475,18400,36600,41600,36000,24450,30550,41375,38250,29600,50400,41600,33600,41600,32750,34400,40800,45825,37600,44800,21750,29600,56800,35200,45600,48000,34400,21600,10400,36800,42400,32000,33600,20800,31200,30400,37600,35200,33350,46400,19550,35200,36800,39400,39200,24800,29600,23700,30400,26825,38425,39325,12000,30400,30400,24825,32800,18400,24600,26400,48000,21400,28100,17425,38400,24800,29200,45525,27200,36800,35875,19200,29200,28800,38650,37600,39200,37500,26825,40800,28000,21600,40000,25600,21600,39925,48000,24000,29575,45525,45525,36000,26400,32275,32525,19100,27200,26350,32000,42000,32000,38400,24000,34275,48800,23200,32450,24800,23200,28000,0,28925];
				break;
			default:
				break;
		}
		break;
	case '4': 
		switch(group)
		{
			case '1':  // guitar
				//expert guitar base scores
				var base_scores = [34072,30448,31112,30941,58896,20856,29496,11404,33406,22383,22943,34431,28108,22052,41552,19200,51278,34888,54755,24009,22770,32978,34329,43819,45807,23502,26283,26270,49293,30822,24612,31306,42539,38920,19178,55184,56825,27541,18520,39486,30937,26195,80440,25647,21461,14491,28498,23150,45532,27151,53220,33890,28249,26441,12027,42145,37675,29977,19107,28606,24643,36700,42774,30133,35663,33963,26831,34899,49476,44708,20291,53820,34077,23251,22154,35659,27088,13287,21136,52210,36063,16820,12281,26031,35558,55033,23504,22796,55207,30026,23938,29366,28340,21668,28047,32693,23019,25946,25127,13519,36148,44231,45920,23002,37611,14929,21811,13950,54209,25617,31312,48984,32583,31288,26609,39795,23971,24659,18127,20436,16247,25897,51019,37123,18302,22171,24429,62418,38564,25515,19635,24489,32034,29346,53318,29330,24601,34713,23239,34689,6125,22147,42995,20031,23366,39886,37352,27489,29342,33678,42757,35348,17116,19861,27680,26258,20607,47313,20468,22125,18779,13756,42434,30347,30235,25542,30684,87707,37094,12942,29317,37032,19265,25446,26094,16775,22838,39855,24477,32188,35502,35701,31075,23172,22436,7106,27841,30008,48073,23063,37790,51856,24914,0,22203,13700,17540,44381,27532,27027,45544,29928,18599,28704,26829,58171,38779,24764,35034,27043,30346,34419,108417,28673,26842,27953,55868,25957,9232,26054,24722,35216,30897,25570,28234,49498,13588,21791,34227,43188,19045,27191,46785,19706,35192,34808,36464,43714,35974,13720,36740,32453,23167,44739,35279,41367,36402,16773,29902,39585,56927,31906,19736,21844,25158,38590,24945,17007,40147,29547,35273,50347,28906,40086,27203,27136,39317,30119,26722,52450,24776,29585,24452,17802,21125,19085,35916,33697,17175,20406,30987,24301,50074,36282,38391,17949,23453,26349,43581,35358,48549,60100,13572,28315,34781,21098,42553,31074,31126,29022,27285,32733,43233,23544,21731,29091,32939,29646,44838,22855,28478,34602,15735,42644,51519,30796,36488,21019,30505,15011,36918,39123,31127,23684,18627,21085,30527,26786,35348,30930,35800,34100,70610,38368,25433,19203,16016,32820,34936,24650,86914,41074,19061,20155,20138,31314,25306,62002,48577,42518,20148,34936,38528,54126,16169,14650,27536,21713,41249,21552,46386,30290,33364,32643,40755,25378,12334,30238,24203,33649,34337,14581,31332,43055,30508,23208,26319,30585,21346,22259,41312,34710,49688,43361,69553,50356,30721,26019,28871,20301,37254,68024,40947,30277,27427,17787,26567,21752,17466,13570,14961,39687,26626,22154,41220,36726,24926,28060,29714,16700,21203,18971,25400,30898,27333,26163,54445,30411,37067,40884,24491,31353,43337,28504,27018,39911,42316,27045,18309,29411,35184,29204,33974,17818,26877,37399,34175,34070,28065,19078,35214,36295,15382,30986,37754,24972,25042,27402,48103,28944,22064,20451,57093,36935,35812,56454,26693,55778,17831,24063,40523,22832,27059,28891,30004,26610,34935,37002,39745,37601,10680,28549,36872,49476,30935,31121,34182,25991,45025,25207,35496,15224,30106,29943,23582,28072,39199,23728,59880,33411,24155,30236,38268,18814,44544,23105,45950,73803,39238,45810,65777,32457,24119,46886,30188,25949,32450,46020,36152,40401,16123,35186,24998,24289,23305,44522,39665,26068,27059,34644,39739,32157,34243,75975,40010,19998,15984,49536,20004,23845,30250,43071,27300,27944,29708,31412,18087,17739,48073,26882,37027,34032,6025,69215,26440,18897,35667,32542,35334,26545,28705,31198,47422,15699,26141,29573,10294,27266,23494,14368,58478,33178,38005,18643,29458,18101,29974,45748,29037,37586,24262,31033,26870,40677,15818,22687,29748,44435,30618,43730,24075,50153,28154,33019,56085,22247,36012,36490,44034,32800,42479,27760,31802,34891,17759,21976,22401,37088,17999,50425,24919,32913,24643,30038,30317,15219,36204,35155,49577,8802,25139,34915,20597,51646,54440,37004,19723,35226,25923,33471,35868,23013,27414,25758,22162,31144,20944,13388,31674,17252,29576,16231,22164,52256,40436,28490,55907,76676,32998,27537,52622,43982,32413,16335,37553,36473,21651,59379,28917,25189,39522,34576,28494,27260,25321,27490,28687,19569,26811,32582,23851,55285,28217,39915,50820,27469,23859,33109,41945,36802,23141,36914,23337,32556,49309,32441,27673,31138,37156,46449,29756,43506,32859,26845,33081,27349,36627,38750,34629,44424,30911,37363,24938,41129,28669,26183,29450,27488,39655,32315,17443,66348,22613,34337,34041,47131,29632,39935,24431,23671,17926,43733,32050,33974,24352,31246,27706,24691,23279,26310,36430,52484,59585,28993,32884,25111,19045,37415,63349,35049,18345,33222,34075,31380,61012,28654,28244,19302,38706,36644,29015,11915,38916,20527,23259,23893,14238,25834,44877,31989,17733,40719,67004,29256,29295,29167,36004,16016,28256,18776,37101,16084,17840,33005,24734,16424,25363,45597,23156,33324,37011,36345,13798,43780,48594,46308,22732,24245,30103,34357,11746,45866,32453,30232,34115,48753,17452,27849,49838,28418,66382,24921,22968,41522,37589,40585,33184,72609,34420,31643,28920,33815,17371,28118,44240,34573,26730,37092,18407,31053,23133,29004,20685,28707,16518,34026,24717,31415,16561,35019,34497,31999,24200,18181,28152,19545,22264,23928,32798,35967,21738,40413,29231,30382,24980,33552,36905,36716,18868,26264,56430,28744,21904,17545,25433,22022,32871,78760,18796,29681,20041,31392,30817,34755,64206,59533,24670,31291,33913,34441,47325,27873,31471,22237,41559,45783,19748,11700,81743,51144,26331,88312,17233,29333,29039,21424,25119,32314,31820,36649,27827,7163,37899,17054,44002,55017,31787,55881,39842,20600,22911,39080,24135,52824,33648,31626,37831,39464,23211,27395,22010,32402,41664,32777,29467,31158,47927,48028,60100,15041,30187,36535,26800,26996,29235,26392,37156,45018,49198,25712,38448,14531,29418,42374,36461,10935,43445,36069,25589,33646,33858,29506,49484,40025,20432,29113,44978,35426,32122,37838,27511,18382,28174,27067,46688,21693,17021,19691,21713,21220,25483,20964,23151,53274,30344,30915,17500,33619,21600,25985,17378,35483,29310,42790,26650,26535,38269,44586,36992,39022,37412,36787,22067,18879,29149,34053,34736,23182,11450,23412,26199,25543,22398,23711,29079,34403,29561,32235,32555,17349,36878,42634,28749,42611,21278,28194,21456,36683,48316,22792,27970,52788,16868,32561,10388,27480,21941,23976,16308,25970,46197,34799,39123,9718,48145,31612,22445,29383,23399,28996,27902,19784,48545,24973,31831,34984,39604,29782,29274,31178,28632,19254,19450,25887,32627,17700,64863,27287,48689,45609,44654,30830,17583,47255,50715,25817,28617,11910,19761,33249,37213,20852,26353,37493,20701,23409,31041,28577,26346,23167,29173,22765];
				break;
			case '2': // bass
				//expert bass base scores
				var base_scores = [26859,15874,17027,18168,48835,14495,18962,12717,14521,15592,29129,33572,14070,22202,31323,10015,36591,24634,36976,23096,26102,20842,28478,23401,24971,13029,12653,17033,23310,17320,13874,25009,23027,30449,19741,33943,26600,13383,11379,19803,21266,12600,58213,13720,12170,9495,10989,17036,23008,18142,23014,25108,17154,14257,14246,22853,20412,23610,9567,13459,16293,25918,31999,15888,24943,22870,13078,19928,23202,34433,12392,30811,22993,15003,15005,17339,11082,11874,12855,20293,19651,6498,14094,18339,20504,40390,23915,13082,25796,31718,15298,25034,15475,13298,26234,26791,13983,14203,15544,11425,25897,32103,28019,14184,33060,13750,14725,13744,23957,16878,19590,20732,15756,16848,16050,17923,16920,16770,13457,18957,11296,19025,35785,23602,13730,13617,12763,28361,24970,22362,8361,16352,23000,11439,42087,22869,21915,19475,14300,22645,3318,17879,24996,11741,13876,27653,22092,21335,16382,23493,20189,25835,13228,10731,12636,14669,13540,34317,17769,11589,14905,9468,17582,19440,13959,17242,25532,54782,23494,6970,15333,23175,13142,19816,28429,12289,9127,23212,12296,17075,22673,20444,17550,12707,20140,3759,30219,23235,45365,13110,25354,27177,20206,10258,21151,11993,8112,24552,16720,18447,15463,21214,14540,19319,28700,42315,23018,19141,17319,15901,25548,17117,21601,14085,19284,24223,25853,20909,2333,16767,16512,25958,19828,19894,11543,17137,19043,18926,20760,28846,13776,23086,26517,15977,19365,19042,19494,17682,22012,13092,24094,24843,22877,22006,28559,38341,18119,12284,29373,19479,40116,15286,23579,14627,21686,29737,17863,8250,28937,17995,20241,25555,13444,19980,19488,13759,26150,18267,8720,54478,27881,11782,19769,6822,19825,10510,22158,12804,13526,17525,23475,21284,45630,21705,36819,8967,7893,22089,26468,21042,31319,25574,14694,20709,13345,6933,20567,22317,20270,15037,15755,14211,20321,13756,19405,15534,21459,16745,31540,13724,20350,24455,8173,27026,23449,15543,21358,23060,17231,17089,35741,21103,19053,22013,8811,12471,19128,18872,22153,17530,22761,17004,41901,20858,13249,21392,16205,23906,24960,16853,60344,26926,15980,15997,11653,29188,21342,43569,26840,39393,11435,17459,13638,42843,14705,8742,8000,17373,27158,12445,12996,18881,16890,24549,25092,15154,24127,23842,15106,28053,28895,9004,21040,19537,20883,16872,12429,34284,13162,12176,26309,17377,19348,23473,58633,44859,6127,14249,18206,10361,50414,54625,14614,13897,17316,15345,32883,14331,10367,12117,8642,25918,24726,7447,39149,17238,22703,14267,19103,13468,13094,14909,8888,18480,18621,9091,23360,20439,15936,21291,17838,24443,18667,10793,22229,23047,24228,6940,12120,16500,25075,14552,16440,7612,22190,9325,24254,15959,17443,12101,16894,24026,15781,22917,24939,13199,18365,14978,20903,19821,14979,16289,29146,22857,19202,11818,25118,59755,20220,17236,14873,19756,20018,18088,8036,19494,26420,19143,27813,44782,9785,24746,26247,24201,18426,13713,22316,12600,15618,15258,32999,13759,35412,30549,22155,13297,19166,10894,35321,17607,10427,15949,27712,13618,21113,16761,43700,71177,27686,25221,43171,19380,29800,17426,19588,19960,20391,11722,13075,18930,6259,18465,16332,10842,24121,27837,13606,15447,8462,13577,32683,18680,25441,17625,29771,19104,14977,40080,15828,10960,20162,18684,10458,18571,15023,15306,10511,22000,16925,16336,19080,7335,13974,26567,14901,10357,27675,23240,31079,24199,20627,18602,23245,12816,6022,18999,9409,15652,18512,12381,29975,29879,19392,29448,19106,26350,20854,43316,32424,21950,11826,18091,21620,22612,6291,9353,12949,23489,25045,25447,21045,45504,27740,15847,25534,12303,21071,25568,12524,24400,31445,21291,20570,18179,18604,14508,17088,10772,13061,32799,19227,24635,16976,23650,16597,7416,18390,14754,18137,7810,15538,23307,18171,37869,40520,20917,10696,22077,12790,17581,18851,9169,14761,9713,17242,18830,9495,14131,9258,14429,11540,14529,17333,29436,19546,7066,48356,70552,19675,16946,30388,29649,29909,9269,18397,27086,11880,43239,10698,19551,29649,22476,11058,18769,12169,18848,30283,20545,11427,16821,10578,48142,24439,20682,33168,18410,14389,18931,31602,21121,15579,25450,12918,19479,29952,19577,14925,15258,19844,27151,17786,18280,16656,19422,21768,16103,35348,26754,28610,32784,23915,26946,16507,24330,16512,13473,24075,19120,12693,21259,10072,50833,22638,23072,18805,28740,36939,24986,12777,17181,14192,32775,17675,26026,12756,18414,16568,16389,17899,23497,25798,37343,23714,18162,21679,9870,12871,14044,37647,35225,12824,27131,34994,35591,46845,20264,22385,11382,18531,16190,23660,5440,23653,10264,16603,19465,20818,17920,42386,22808,11221,23457,33668,18414,18895,27011,19363,7140,22562,9328,13663,12446,13515,25727,13569,13160,19109,31946,17249,10093,25744,25746,14181,29399,30803,38130,10162,13797,24122,20377,4075,16884,29386,22488,15885,29441,18082,25690,39857,17273,47236,19361,18575,28007,20768,26307,22028,48130,19879,14974,18242,5148,7828,20628,23028,27990,16212,27515,7205,17198,8014,24275,24940,20690,8557,29516,13725,25255,26100,25417,24640,25178,14246,18212,12830,8141,11312,12225,17900,33420,15699,25382,20532,21941,16385,16438,17188,21130,13081,19874,38230,17974,24952,24610,24516,19920,18888,46582,18026,22478,16837,29461,18518,24105,20237,23297,12117,11534,20319,34612,19643,14627,17262,20477,28435,11825,15175,16675,18635,31940,14603,21970,8872,17349,27827,20447,19311,17753,12830,28157,20422,3357,16090,16309,27205,40531,43935,36282,20124,11799,12448,32920,17723,24636,7683,19846,30615,20897,15921,18961,17697,20825,25581,20438,12202,19641,26834,25212,25023,9698,17568,20589,18043,25479,22670,18443,18416,38815,39037,17518,22565,6677,15049,21369,17663,7705,23686,24527,12592,20247,14505,19182,41734,24386,12552,12317,26474,19052,19986,16711,15074,14599,12571,14110,26264,16261,11203,11386,15898,14817,14004,12867,22218,38106,17859,24875,12630,26788,17819,20909,14953,12620,8018,26381,19571,20889,25038,25108,23328,21351,23308,21419,17217,18167,10770,18847,12938,14029,14738,26286,18922,15684,16433,15530,17720,31050,24071,16195,12743,6352,27046,34702,15073,23779,21474,8409,15763,31755,33905,16012,23216,32622,12635,14674,7080,36943,19218,15285,13682,15362,34625,19685,26832,6850,41968,22062,15569,18812,20102,14603,16932,13199,26482,29737,14790,19543,34499,16936,15482,23062,21455,13002,13431,12589,12051,7682,29628,20409,14281,35613,35613,17595,10527,37954,41658,23675,28571,13151,15845,31185,14242,11511,17150,28794,20110,14792,16186,18878,16005,11099,29217,15375];
				break;
			case '3': // drums
				//expert drums base scores
				var base_scores = [74550,29650,37350,20275,78300,34225,35700,24100,31350,35050,39050,52450,39750,30525,41200,16550,63775,33150,54325,32150,45950,39775,47200,52200,51675,33625,32975,37000,41200,34925,43175,32175,37125,47000,27650,52500,50350,33850,31525,44650,40425,36950,95725,31575,35875,32950,29350,34225,36825,32600,51800,49975,28575,31725,29175,47400,28425,52400,32500,39925,26125,49375,49900,42775,57750,45175,41100,43500,46025,69900,29300,68250,31875,32675,31925,29425,15300,16925,24325,43475,35600,24350,29500,38800,38400,77775,45500,32225,62275,48750,31800,48850,28800,20675,33825,45475,25950,47525,24725,28500,64025,62425,45600,36650,54450,21750,25200,32175,45025,27575,40700,34050,32950,36950,27425,28050,31650,29400,65775,21575,22075,43500,55625,52275,31350,41800,27375,116725,34175,34975,30525,32450,44700,51675,45650,46975,46950,47025,28050,41600,11450,27325,35775,33025,29050,48575,51625,36725,28900,45800,32375,38850,22800,23400,45600,17875,20600,65450,31800,31525,35200,40600,53925,37325,39225,31350,61525,84325,42825,34400,27525,48425,17100,29900,37900,23800,29000,36800,30275,36825,53650,40250,56950,27125,42775,3975,40875,43875,48125,28150,43800,46525,28550,11225,40100,26225,9575,37600,34125,41300,32300,46500,44850,47200,53200,64450,40425,29350,39600,30225,48175,25100,32125,31275,31775,46300,48575,38850,4800,34850,36075,71925,42700,38900,36125,31375,46075,33925,41175,39875,30375,38750,45800,33625,36900,32975,36650,25975,30075,21675,42400,51900,26300,38075,45550,65500,42075,30200,64450,41950,54225,32925,37375,28850,41150,52925,47400,37425,49200,34375,41275,60900,58775,41175,37075,34500,39225,44025,21500,74275,32700,27575,37925,30825,31200,28175,44400,36800,35725,41675,38125,36975,65825,34325,54100,30725,24450,35275,67325,49200,49600,53975,23575,52300,33175,27600,25700,40900,35125,37300,33550,35750,36900,23975,25425,36900,36925,27850,55600,23925,39500,41700,21900,37450,41100,30175,38925,50025,38325,37025,28925,31625,45500,36025,23000,34925,42800,35200,38700,38875,42900,36225,76575,58625,28925,39775,25175,42175,49850,25125,99150,50825,36875,38675,20900,43125,41075,64300,56600,68250,28250,30825,39650,66075,31925,28825,33825,27525,36750,31750,58525,33150,33850,38725,43600,39300,37175,34300,32425,64675,37025,14575,35325,38825,44700,35450,29375,62075,20575,42225,52600,39500,35475,36925,94475,58300,24925,25200,37250,25300,48200,79300,24375,29800,39075,34075,31925,28275,29250,23575,13825,53775,17275,18475,49950,39950,36675,39350,37300,30850,25475,34125,49900,34200,46500,28675,49775,48475,38375,38000,32675,44250,43775,24450,20925,40800,45150,21875,36450,31275,44250,27450,33950,17125,52475,30775,46300,38625,35575,31750,46175,47375,32050,40175,38900,29150,32050,17975,35400,30125,30150,24900,88950,58375,46375,36600,38725,70025,38350,35075,37900,30150,33375,37125,35975,36300,42200,35100,44475,50725,16500,41500,57275,41350,35075,29875,58475,38550,31600,28775,41025,27775,47600,44725,35650,28800,28600,26200,66050,36875,38650,14450,51700,28075,40425,39225,86225,115275,49200,43125,73050,39800,27225,29525,36000,45325,48225,43750,28300,30925,21900,35425,37175,40425,32000,43475,40450,27525,23700,36200,71225,25975,36475,39325,37825,26450,41925,68500,27100,22375,30600,43200,36825,38025,27600,36400,42650,29250,43525,26900,43800,13875,15400,75550,31475,29025,42400,55750,36425,41450,57750,45425,40950,36000,37125,28550,24075,27375,23200,24750,50100,32900,38050,56500,32200,55275,41350,63400,46775,42075,35350,32200,44500,36300,14750,29750,34700,36125,42825,46300,38850,64825,56175,34850,72925,22175,38250,51500,27075,57525,51050,32450,48325,52625,47075,25325,49125,28075,36325,61625,36700,46700,39050,33550,37525,15875,36050,38075,36425,22075,26325,37700,33000,42725,49500,42625,10325,37925,34425,29125,30225,55350,30275,23750,35550,43850,31475,27700,26400,50850,33350,32200,27775,47825,72125,22575,80900,95525,31300,48075,55400,55575,50800,25800,49900,44575,22800,57350,35325,37700,49775,44900,22325,29725,26875,35200,40775,32375,200,40100,25900,82275,35200,38975,66025,36800,34825,36275,37550,33650,24525,37250,67625,34350,50575,45375,36700,37100,38825,79925,32250,32600,46750,29175,37350,24875,56375,67975,35475,45600,32600,54650,36100,45475,35350,36850,40600,26250,24200,32725,12025,80625,37300,41750,57225,50525,81300,56025,33175,32850,29500,62975,30025,40250,26650,31325,30925,33625,30650,37175,42250,51400,36150,27125,43950,27325,41275,31300,77775,46125,20600,48125,66800,63775,71875,20750,29775,23250,34075,38275,37225,15700,36825,25075,34375,29875,40125,26750,56150,55350,20275,46700,40375,39075,28300,26600,38400,16875,40900,26575,36000,27600,25625,40150,34950,25375,35675,56350,39600,22300,36250,45625,26275,55000,67000,60975,28675,35600,38475,41325,4875,32075,38725,41250,42900,57025,44000,42450,68875,42575,71325,33925,37550,50800,42675,47375,42525,50150,34675,44450,36075,9975,22550,32625,40900,46775,34225,37950,21175,33450,28000,70400,58250,57350,28750,52100,42675,41550,38300,35700,41450,49625,29200,22350,24300,21550,28200,21225,41800,62950,25450,41725,43875,32550,34925,32400,43275,41275,26100,42950,63900,31750,41850,25825,57050,28550,47275,109925,34125,46925,30775,46150,24900,46525,40200,48125,26725,30750,35425,51050,40175,29425,32625,37625,49875,34625,30325,21875,47575,65750,28925,87400,22825,38100,42825,31175,36050,31200,31650,41950,37400,10000,30925,33450,48825,69400,59325,55375,31850,0,23675,47475,37275,38575,21850,39925,58675,36225,33575,45250,24575,35150,33475,28950,29125,28525,41225,41150,38150,18450,27750,56900,31075,44700,42225,26900,37725,49300,67950,37275,46425,17275,23575,30375,47250,6750,41300,57775,28000,42900,51650,38125,44225,44200,29450,22450,45950,33750,37275,33950,32425,31700,22775,26250,48100,35975,25625,30250,31825,52525,56725,25850,45100,59625,30325,41250,33575,56750,37725,49425,40350,21775,25150,77850,38950,36475,60875,41975,44750,42325,41650,40575,46075,33275,24400,35050,26825,23325,16100,35700,30875,23975,35950,30650,34925,56025,51275,33625,36300,28525,52975,50725,28250,45050,29800,27850,33400,66400,53800,39100,38800,64325,22450,35200,15600,33025,21425,19750,29875,38325,51800,33725,49675,16400,83650,41475,24750,33200,36575,34950,45075,26900,44150,52375,49425,35150,51675,27975,37150,44800,34625,35525,29750,24050,31150,21900,58975,28000,33375,84300,84200,37425,24450,70650,74925,45375,36475,28650,26700,58300,33125,32350,31175,60375,41950,21300,55600,44325,28350,32725,51725,23900];
				break;
			case '4': // vocals
				//expert vocals base scores
				var base_scores = [31600,52000,35000,23675,42400,16850,31975,65000,28700,48000,19850,38000,57500,38000,40000,24000,37025,51000,46900,43000,40550,26575,34600,35625,46000,33100,36000,41700,69000,41525,56800,32500,27725,41525,24600,53000,53000,22625,26000,31375,56775,46000,48000,23000,53000,55000,70000,45150,72000,25725,63775,35000,39200,28400,53000,47925,47000,54125,20875,37000,37000,46125,24000,38000,57000,58000,53000,53000,39000,56000,53000,36150,43000,35000,45000,47225,34450,24000,49000,63000,63000,47500,31000,33000,68000,46625,26100,49000,18000,57475,24000,23000,28000,36000,32725,50000,22000,41000,55000,35000,30500,31300,44000,50000,40675,22000,31000,34800,32400,53000,55000,42000,40000,41000,35000,36000,38000,44000,47000,32000,44000,35175,57000,48000,33100,27925,35000,35475,47500,28000,42000,43000,63000,36000,0,45850,45600,78000,43000,44675,10550,40000,56000,38600,33000,34000,34000,35275,39000,40450,51625,39000,36075,33000,74925,34000,31000,44000,44625,31000,29600,33000,39600,32000,46575,43000,23000,73075,54975,32450,48400,47250,22500,44000,31000,41000,28000,40350,37000,49000,44025,60000,41400,55000,41600,16000,29000,46650,49125,41000,46725,42000,34425,18000,39775,23000,30400,44900,30150,47000,25900,59000,32850,18800,64775,46675,34000,39000,42000,58000,58000,33675,25200,44000,18000,32000,54000,92000,10000,36200,37550,39225,77000,47575,43750,59375,36000,40000,51000,40000,24000,38000,60300,50000,37000,39000,31000,58000,43000,25900,65800,62000,45000,36100,33000,31425,36000,46000,41000,41550,49000,53000,36000,36000,34300,40000,55050,43150,54000,26000,30625,31000,70000,50000,55000,37300,42400,45000,44000,55350,37000,34000,29000,54000,47000,39000,25575,43600,40000,30000,32000,44000,33000,56625,40475,33000,33000,46000,55500,53825,36000,60000,28000,45750,25000,27100,42000,16850,46875,52000,32000,40000,32000,28000,36375,31000,32050,34000,99000,38000,37000,40750,41000,43525,54800,41000,31350,35675,38500,32000,22950,48000,90500,40050,39000,32300,37800,54000,41000,50250,51000,36000,71800,60000,40450,46000,27200,31000,32300,34000,31750,29600,27000,38000,43000,32000,49200,44500,49400,49000,66000,42300,41000,16000,29350,33000,37000,44900,38825,32000,87000,48000,37800,57000,44000,24475,35350,40000,30000,70000,40150,25375,34000,56000,42000,42000,46000,38000,48350,78000,50000,41000,33000,42875,70500,59625,40000,42375,37000,28750,36725,48000,26650,51475,44400,30000,22400,32800,26000,27550,39000,32925,25000,29000,32000,45000,33000,51000,39000,39000,29000,32800,25000,40800,53150,28000,37000,46800,47000,35600,34000,47000,41000,12000,26000,52000,56700,28000,42750,54000,39425,24275,48000,34900,48000,66000,47000,65000,38000,36000,43525,62000,25600,35000,39000,67000,35125,55000,46000,44250,40000,34800,65000,49100,47000,45250,60000,44200,56000,35000,33100,37850,41800,39000,39000,42500,62000,27000,40100,52225,27000,57000,48000,32000,42000,53000,48300,57000,48000,39300,37000,24875,56000,41000,43000,29425,61000,43775,27200,47000,27400,0,52000,53000,42900,33000,45175,48000,45350,44000,50000,66000,40000,32000,50000,33325,37325,52000,69000,55000,41000,29000,47575,80000,49600,56000,49000,37000,33000,31000,76000,26650,41725,35000,18825,30000,32000,53175,45000,19575,53000,44425,48000,29500,50475,55000,28225,23000,40775,13200,37400,18900,0,19150,63000,29000,50000,28000,31250,57000,59600,38800,31200,22000,57000,48000,20400,33000,35000,37600,45000,47000,49850,46675,34525,47300,29325,43000,38725,44000,23625,29000,43000,41425,24000,44925,46150,40100,30200,29000,40000,61175,50000,33000,40850,27000,32500,36850,60000,53000,44000,45000,35650,62000,35000,49800,40000,52375,59000,61450,47000,38550,39875,24200,31600,44000,34000,31850,36000,17000,51000,37000,41000,40425,45450,45000,26000,31000,32000,42000,32000,61000,43000,39000,44000,47775,25000,21200,46000,30150,72000,31400,30750,42000,45325,43350,38800,43100,23000,20400,46700,43050,42600,28000,46000,55300,43000,31000,17650,49000,45150,27000,27000,28150,40000,50000,24000,26000,62000,37000,37000,48850,53000,23000,48600,45000,72000,46100,33000,32900,40375,55000,52000,39900,56000,32000,32000,44000,50000,34775,39650,43000,40700,70000,59000,36000,40000,41150,34000,30675,39000,39200,32650,49000,39000,46800,40925,43575,65000,41000,31650,38250,29000,56000,50275,35000,40500,43525,63000,39000,27000,47375,41000,42000,51000,41000,37700,43000,19750,38775,53000,50800,52000,47000,41825,23000,54000,26000,0,49000,42000,41975,38000,39000,63000,29000,42325,45200,69000,0,47350,20000,69000,31600,29000,33000,38000,39000,46800,60800,31000,63000,62000,28000,39000,43500,57350,27000,56525,31000,42000,47450,45000,52725,27000,35000,48275,69975,40950,31000,29375,54400,30350,55700,28475,29250,36450,44725,42550,36000,20850,45000,54950,27550,30375,66250,37000,26200,40000,63000,81025,49000,34000,49000,25000,34575,74000,77150,37000,59000,38000,44000,22000,39650,58000,24000,60000,27200,34000,56000,55875,45125,65000,44250,29000,66000,29475,41225,45000,45000,47000,55000,43000,27950,50000,39000,30200,33000,19000,73275,54000,63000,27000,83000,58000,51000,56875,54000,47000,46400,52000,48000,20725,43000,51000,27600,36000,104000,34000,35600,38500,0,46000,44375,39000,22350,41000,50000,52000,40850,68000,45650,42800,49000,35000,30000,42700,22000,65950,68000,22000,63200,23000,30250,44000,62000,35225,25000,56000,0,19200,2500,17000,53000,35025,56000,36000,44075,59000,36000,36000,38425,34000,58000,72000,60000,21000,43200,40000,32000,34000,40000,33000,42000,26000,42750,58000,73000,76000,22575,26975,66000,41000,44000,61000,35000,25775,30750,66000,37925,56300,40000,28375,48000,44600,32000,47750,37000,27000,31000,60000,49000,27000,61000,40750,54000,82000,42000,41000,34325,39000,46000,32000,24825,39000,24000,28000,42000,37000,34075,34275,23000,45600,52000,45000,30050,37950,50575,47450,37000,63000,52000,42000,52000,40750,43000,51000,56625,47000,56000,26950,37000,71000,44000,57000,60000,43000,27000,13000,46000,53000,40000,42000,26000,39000,38000,47000,44000,41550,58000,22950,44000,46000,49200,48400,31000,37000,28500,38000,33225,47825,48925,15000,38000,38000,30825,41000,23000,30600,33000,60000,26600,34900,21625,48000,31000,36400,56725,34000,46000,44675,24000,36200,35800,48250,47000,49000,46700,33225,51000,35000,27000,50000,32000,27000,49725,60000,30000,36775,55325,55325,45000,33000,39075,39325,23500,34000,32750,40000,52200,40000,48000,30000,40675,61000,29000,39650,31000,28800,35000,0,35925];
				break;
			default:
				break;
		}
		break;
	default:
		GM_log('return from cuttoff');
		return;
		break;
}

if (document.URL.substr(30,17)=='manage_scores.php') 
{
	scoreCol = 7; songCol = 5; perCol = 9; ratingCol = 8;
} 
else if (document.URL.substr(30,10)=='scores.php') 
{
	scoreCol = 6; songCol = 4; perCol = 8; ratingCol = 7;
}
else if (document.URL.indexOf('compare.php') != -1)
{
	comparePage = true;
	GM_log('comparePage = ' + comparePage);
}
else return;

var trs = document.getElementsByTagName('tr');
var total_number_five_starred_songs=0;
var total_number_four_starred_songs=0;
var total_number_three_starred_songs=0;
var total_number_two_starred_songs=0;
var total_number_songs_with_scores = 0;
var total_numer_of_gold_starred_songs = 0;
var gold_starred_songs = new Array(); 
var gold_starred_diff = new Array();
var total_score=0;
var num100percents = 0;
var gold_starred = false;

if (comparePage == false)
{
	for(i = 0; i < trs.length; i++)
	{
		tds = trs[i].getElementsByTagName('td');
	
		if (tds.length > perCol) 
		{
			var songName = tds[songCol].textContent;
			var gotNumStars = false;

			songName = songName.trim();
			songName = songName.toLowerCase();
			songName = removeOddChars(songName);
			song = songs.indexOf(songName);

			if (song!=-1 && song_found[song] == false) 
			{
				total_number_songs_with_scores++;
				song_found[song] = true;
				scoreCell = tds[scoreCol];
				score = removeNonNumbers(scoreCell.textContent);
				total_score += parseInt(score);
	
				if(tds[perCol].textContent == '100%')
				{
					num100percents++;
				}

				/*var rating = tds[ratingCol].innerHTML;
				if((rating.indexOf("rating_6",0) != -1) && diff >=4)
				{
					total_numer_of_gold_starred_songs++;
					gotNumStars = true;
				}
				else if ((rating.indexOf("rating_5",0) != -1) && diff >=4)
				{
					total_number_five_starred_songs++;
					gotNumStars = true;
				}
				else if(rating.indexOf("rating_4",0) != -1)
				{
					total_number_four_starred_songs++;
					gotNumStars = true;
				}
				else if (rating.indexOf("rating_3",0) != -1)
				{
					total_number_three_starred_songs++;
					gotNumStars = true;
				}
				else if (rating.indexOf("rating_2",0) != -1)
				{
					total_number_two_starred_songs++;
					gotNumStars = true;
				}*/

				var difference = get_score_diff(score, song, group, base_scores, platform);
				var cutt_off = parseInt(score) - parseInt(difference[1]);
				switch(difference[0])
				{
					case 1:
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
					case 2:
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px"><b>(' + addCommas(difference[1]) + ')</b></font>';
						break;
					case 3:   // if the cut-off is at three stars
						//if(gotNumStars == false)
						//{
							total_number_two_starred_songs++;
							tds[ratingCol].innerHTML  = '<img src="/images/rating_2.gif"';
						//}
						 scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
					case 4:// if the cut-off is at four stars
						//if(gotNumStars == false)
						//{
							total_number_three_starred_songs++;
							tds[ratingCol].innerHTML  = '<img src="/images/rating_3.gif"';
							keep_track_of_scores_close_to_cutoff(songs_closest_four,5,score,difference[1],tds[songCol].textContent,difference[2]);
						//}
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
					case 5:// if the cut-off is at five stars
						//if(gotNumStars == false)
						//{
							total_number_four_starred_songs++;
							tds[ratingCol].innerHTML  = '<img src="/images/rating_4.gif"';
							keep_track_of_scores_close_to_cutoff(songs_closest_five,5,score,difference[1],tds[songCol].textContent,difference[2]);
						//}
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="orange" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
					case 6:// if the cut-off is at six stars
						//if(gotNumStars == false)
						//{
							total_number_five_starred_songs++;
							tds[ratingCol].innerHTML  = '<img src="/images/rating_5.gif"';
							keep_track_of_scores_close_to_cutoff(songs_closest_gold,5,score,difference[1],tds[songCol].textContent,difference[2]);
						//}
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="green" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
					case 7:// if the cut-off would be 7 stars
						//if(gotNumStars == false)
						//{
							total_numer_of_gold_starred_songs++;
							tds[ratingCol].innerHTML  = '<img src="/images/rating_6.gif"';
						//}
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="blue" style="font-size:8px">(+' + addCommas(difference[1]) + ')</font>';
						//if(diff < 4)
						//{
						//	tds[ratingCol].innerHTML = '  <img src="/images/rating_6.gif"<br/>';
						//}
						break;
					default:
						scoreCell.innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="blue" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
						break;
				}
			}
		}
	}

	songs_closest_gold.sort(diff_sort);
	songs_closest_five.sort(diff_sort);
	songs_closest_four.sort(diff_sort);

	var gold_percentage = ((total_numer_of_gold_starred_songs/total_number_songs_with_scores) * 100);
	total_number_five_starred_songs += total_numer_of_gold_starred_songs;
	total_number_four_starred_songs += total_number_five_starred_songs;
	total_number_three_starred_songs += total_number_four_starred_songs;
	total_number_two_starred_songs += total_number_three_starred_songs;
	
	var five_star_percentage = ((total_number_five_starred_songs/total_number_songs_with_scores) * 100);
	var FCpercentage = ((num100percents/total_number_songs_with_scores) * 100);
	var four_star_percentage = ((total_number_four_starred_songs/total_number_songs_with_scores) * 100);
	var three_star_percentage = ((total_number_three_starred_songs/total_number_songs_with_scores) * 100);
	var two_star_percentage = ((total_number_two_starred_songs/total_number_songs_with_scores) * 100);



	for(i = 0; i < trs.length; i++)
	{
		tds = trs[i].getElementsByTagName('td');
	
		if(tds.length > 0)
		{
			if(tds[0].textContent == '2-Stars:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">  ' + total_number_two_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + two_star_percentage.toFixed(2) + '%' + ')</font>' ;		
			}
			if(tds[0].textContent == '3-Stars:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">  ' + total_number_three_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + three_star_percentage.toFixed(2) + '%' + ')</font>' ;		
			}
			if(tds[0].textContent == '4-Stars:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">  ' + total_number_four_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + four_star_percentage.toFixed(2) + '%' + ')</font>' ;		
			}
			if(tds[0].textContent == '5-Stars:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">  ' + total_number_five_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + five_star_percentage.toFixed(2) + '%' + ')</font>' ;		
				if(diff==3)
				{
					tds[0].innerHTML += '<br/><font color="green" style="font-size: 12px">6-Stars:</font>';
					Six_Star_Cell.innerHTML += '<br/><font color="green" style="font-size: 10px"> _______ ' + total_numer_of_gold_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + gold_percentage.toFixed(2) + '%' + ')</font>' ;		
				}
			}
			if(tds[0].textContent == '6-Stars:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">  ' + total_numer_of_gold_starred_songs + ' of ' + total_number_songs_with_scores + ' (' + gold_percentage.toFixed(2) + '%' + ')</font>' ;		
			}
			if(tds[0].textContent == '100%:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">   ' + num100percents + ' of ' + total_number_songs_with_scores + ' (' + FCpercentage.toFixed(2) + '%' + ')</font>' ;		
			}
			if(tds[0].textContent == 'Total Score:')
			{
				Six_Star_Cell = tds[1];
				Six_Star_Cell.innerHTML += '<font color="green" style="font-size: 10px">   ' + addCommas(total_score.toString())  + '</font>' ;		
			}
		}
		if (tds.length > perCol) 
		{


			for(n=0;n<num_close_to_cutoff_songs_to_keep;n++)
			{
				if(n<num_gold_close_to_cutoff_to_show)
				{
					if(songs_closest_gold[n].name == tds[songCol].textContent)
					{
						for(c=0;c<tds.length;c++)
						{
							// couldn't figure out how to add or set the class attribute for the row so I'm doing each cell individually.
							tds[c].setAttribute('class','highlight');
						}
					}
				}
				if(n<num_five_close_to_cutoff_to_show)
				{
					if(songs_closest_five[n].name == tds[songCol].textContent)
					{
						for(c=0;c<tds.length;c++)
						{
							// couldn't figure out how to add or set the class attribute for the row so I'm doing each cell individually.
							tds[c].setAttribute('class','highlight');
						}
					}
				}

				if(n<num_four_close_to_cutoff_to_show)
				{
					if(songs_closest_four[n].name == tds[songCol].textContent)
					{
						for(c=0;c<tds.length;c++)
						{
							// couldn't figure out how to add or set the class attribute for the row so I'm doing each cell individually.
							tds[c].setAttribute('class','highlight');
						}
					}
				}
			}
		}
	}

	GM_log('Close to gold Star:');
	for(i=0;i<songs_closest_gold.length;i++)
	{
		GM_log(songs_closest_gold[i].name + ',' + songs_closest_gold[i].diff + ',' + songs_closest_gold[i].score + ',' + songs_closest_gold[i].cutoff);
	}
	GM_log('Close to Five Star:');
	for(i=0;i<songs_closest_five.length;i++)
	{
		GM_log(songs_closest_five[i].name + ',' + songs_closest_five[i].diff + ',' + songs_closest_five[i].score + ',' + songs_closest_five[i].cutoff);
	}
	GM_log('Close to Four Star:');
	for(i=0;i<songs_closest_four.length;i++)
	{
		GM_log(songs_closest_four[i].name + ',' + songs_closest_four[i].diff + ',' + songs_closest_four[i].score + ',' + songs_closest_four[i].cutoff);
	}

}
else  // going to keep the compare page code seperate for now.
{
	songCol = 1; 
	var scoreColl = new Array();
	var scoreCells = new Array();
	var scores = new Array();
	var total_scores = new Array();
	total_scores[0] = 0;
	total_scores[1] = 0;
	scoreColl[0] = 2;
	scoreColl[1] = 4;
	songCol = 0;
	for(i = 0; i < trs.length; i++)
	{
		tds = trs[i].getElementsByTagName('td');

		if (tds.length == 6) 
		{
			var songName = tds[songCol].textContent;
			songName = songName.toLowerCase();
			songName = removeOddChars(songName);
			song = songs.indexOf(songName);
			if (song!=-1) 
			{
				for(ll=0; ll<2; ll++)
				{
					scoreCells[ll] = tds[scoreColl[ll]];
					scores[ll] = removeNonNumbers(scoreCells[ll].textContent);
					total_scores[ll] += parseInt(scores[ll]);
					var difference = get_score_diff(scores[ll], song, group, base_scores, platform);
					var cutt_off = parseInt(scores[ll]) - parseInt(difference[1]);
					switch(difference[0])
					{
						case 1:
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 2:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_1.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 3:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_2.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 4:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_3.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="red" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 5:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_4.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="orange" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 6:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_5.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="green" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
						case 7:
							scoreCells[ll].innerHTML += '    <img src="/images/rating_6.gif"';
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="blue" style="font-size:8px">(+' + addCommas(difference[1]) + ')</font>';
							break;
						default:
							scoreCells[ll].innerHTML += '<br/><font color="#CD7F32" style="font-size: 10px">' + addCommas(cutt_off) + '</font> <font color="blue" style="font-size:8px">(' + addCommas(difference[1]) + ')</font>';
							break;
					}
				}
			}
		}
	}
	for(i = 0; i < trs.length; i++)
	{
		tds = trs[i].getElementsByTagName('td');

		if(tds.length > 0)
		{
			if(tds[0].textContent == 'Total Score:')
			{
				Total_Score_Cell = tds[1];
				Total_Score_Cell.innerHTML += '<font color="green" style="font-size: 10px">   ' + addCommas(total_scores[current_user++].toString())  + '</font>' ;		
			}
		}
	}
}

function keep_track_of_scores_close_to_cutoff(min_cutoff_arry, num_star, score, difference, song_name, cutoff_score)
{
	// if we have less than the number of songs to keep currently in the array
	if(min_cutoff_arry.length < num_close_to_cutoff_songs_to_keep)
	{
		this_song = new songs_closest_to_cutoff(song_name, difference, score, cutoff_score);   // create a new songs object
		min_cutoff_arry[min_cutoff_arry.length] = this_song;								   // add this song to the songs array
		if(min_cutoff_arry.length == num_close_to_cutoff_songs_to_keep)						   // if this song will initially fill the array
		{																					   // then determine the index of the song to compare
			index_to_check = get_index_to_check(min_cutoff_arry)							   // future songs to determine if they go into the array 
		}																					   // (i.e. is the diff for this song closer than the greatest diff in the array)
	}
	else
	{
		if(min_cutoff_arry[index_to_check].diff  <  difference)								  // is this song closer to the cut-off than the one
		{																					  // than the one in the array furtherest from the cut-off?
			//GM_log("new diff");
			this_song = new songs_closest_to_cutoff(song_name, difference, score, cutoff_score);
			min_cutoff_arry[index_to_check] = this_song;									  // replace the old song farthest from cut-off 
			index_to_check = get_index_to_check(min_cutoff_arry)							  // with this one.
			//GM_log("index to check = " + index_to_check);
		}
	}
}

function get_index_to_check(cutoff_array)	// determines which song of the songs stored in the array should be compared against when 
{											// determining if a new song should replace that song. i.e. of the songs stored in the array
	var index_to_check = 0;					// which one is farthest from the cut-off
	var largest_difference = 0;
	for(i=0;i<cutoff_array.length;i++)
	{
		//GM_log(cutoff_array[i].diff + " ? < " + largest_difference + " " + i);
		
		if(cutoff_array[i].diff < largest_difference)
		{
			//GM_log("NEW largest diff = " + cutoff_array[i].diff + ", Old largest diff: " + largest_difference);
			index_to_check = i;
			largest_difference = cutoff_array[i].diff;
		}
	}
	return index_to_check;
}

function get_score_diff(score, song, group, base_scores, plat)
{
	// less than 1 star
	var next_star =0;
	var diff = 0;
	var cutoff_score = 0;
	if(score < Math.ceil(base_scores[song] * one_star_cuttoff_mult[group]))  
	{
		next_star = 1;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * one_star_cuttoff_mult_ps2[group])
			diff = score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * one_star_cuttoff_mult[group])
			diff = score - cutoff_score;
		}
	}
	// between 1 and 2 stars
	else if (score >= Math.ceil(base_scores[song] * one_star_cuttoff_mult[group]) && score < Math.ceil(base_scores[song] * two_star_cuttoff_mult[group]))
	{
		next_star = 2;
		if(plat == 1)
		{
			cutoff_score =  Math.ceil(base_scores[song] * two_star_cuttoff_mult_ps2[group]);
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * two_star_cuttoff_mult[group]);
			diff =  score - cutoff_score;
		}
	}
	// between 2 and 3 stars
	else if (score >= Math.ceil(base_scores[song] * two_star_cuttoff_mult[group]) && score < Math.ceil(base_scores[song] * three_star_cuttoff_mult[group]))
	{
		next_star = 3;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * three_star_cuttoff_mult_ps2[group]);
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * three_star_cuttoff_mult[group]);
			diff =  score - cutoff_score;
		}
	}
	// between 3 and 4 stars
	else if (score >= Math.ceil(base_scores[song] * three_star_cuttoff_mult[group]) && score < Math.ceil(base_scores[song] * four_star_cuttoff_mult[group]))
	{
		next_star = 4;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * four_star_cuttoff_mult_ps2[group]);
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * four_star_cuttoff_mult[group]);
			diff =  score - cutoff_score;
		}
	}
	// between 4 and 5 stars
	else if (score >= Math.ceil(base_scores[song] * four_star_cuttoff_mult[group]) && score < Math.ceil(base_scores[song] * five_star_cuttoff_mult[group]))
	{
		next_star = 5;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * five_star_cuttoff_mult_ps2[group]);
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * five_star_cuttoff_mult[group]);
			diff =  score - cutoff_score;
		}
	}
	// between 5 and 6 stars
	else if (score >= Math.ceil(base_scores[song] * five_star_cuttoff_mult[group]) && score < Math.ceil(base_scores[song] * gold_star_cuttoff_mult[group]))
	{
		next_star = 6;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * gold_star_cuttoff_mult_ps2[group]) ;
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * gold_star_cuttoff_mult[group]) ;
			diff =  score - cutoff_score;
		}
	}
	// greater/equal 6 stars
	else if (score >= Math.ceil(base_scores[song] * gold_star_cuttoff_mult[group]) )
	{
		next_star = 7;
		if(plat == 1)
		{
			cutoff_score = Math.ceil(base_scores[song] * gold_star_cuttoff_mult_ps2[group]);
			diff =  score - cutoff_score;
		}
		else
		{
			cutoff_score = Math.ceil(base_scores[song] * gold_star_cuttoff_mult[group]);
			diff =  score - cutoff_score;
		}
	}
	return [next_star, diff, cutoff_score];


}
