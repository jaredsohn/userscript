// ==UserScript==
// @name           Forum Helper Gold
// @namespace      http://adamanagrammichaud.tripod.com/ForumWarz
// @description    Version 1.7.2 - Replaces forum names with clickable links, adds a tally of held forums, adds Klan shortforms.
// @include        http://*forumwarz.com/domination/vanilla
// @include        http://forumwarz.com/domination/vanilla
// ==/UserScript==
  
//  ForumHelper was originally written by Adam "Invariel" Michaud of the klan Brainfreeze.
//  ForumWarz player and klanmate Westside Wizard has contributed optimization code, helpful suggestions and benchmarking.
//  Special thanks to Kittiejenn, who came up with some awesome forum difficulty bars for levels 1 to 10.
  
GM_setValue ("scriptVer", "1.7.2");                     // Version
GM_setValue ("scriptName", "Forum Helper Gold");        // Name
GM_setValue ("scriptURL", "http://adamanagrammichaud.tripod.com/ForumWarz/forumhelperlitegold.user.js");    // Where it is.
GM_setValue ("checkURL", "http://adamanagrammichaud.tripod.com/ForumWarz/forumhelperlitegold.txt");            // Which version.
  
var where = GM_getValue ("FH_OpenLink");
if (!where)
{
  GM_setValue ("FH_OpenLink", "_self");
  where = "_self";
}

var myName, server;
var forumsHeld = new Array ();

function site (num, name, abbrev) {
  var x, newname;
  for (x = 0; x < forumsHeld.length; x ++)
    if (forumsHeld[x] == name)
      return '<strike>' + name + '</strike> [' + abbrev + ']';

  newname = name.replace (/ /gi, "-")
                .replace (/\./gi, "-")
                .replace (/'/gi, "-")
                .replace (/--/gi, "-")
                .toLowerCase ();
  newname = num + "-" + newname;

  return '<a href="/forums/battle/' + newname + '" target=' + where + '>' + name + '</a> [' + abbrev + ']';
}
  
function getKlans (text) {
  return "";	// Remove this formally next version.
}
  
function getPlayers (text) {
  var result = new Array ();
  var curString = "";
  var resultString = "";
  
  text = text.split ("</tr>");
  
  for (i = 1; i < text.length - 1; i ++)
  {
    curString = text [i].split ("<td>")[3];
    if (curString == "-</td>")
      continue;
      
    curString = (/<a .+>(.+)<\/a>/).exec (curString)[1];
    
    if (curString && curString != myName)
      result.splice (result.length, 0, curString);
  }
  
  result = result.sort ();
  
  while (result.length)
  {
    if (result.lastIndexOf (result [0]) != 0)
      resultString += result [0] + ": " + (result.lastIndexOf (result [0]) + 1) + "&nbsp; &nbsp;";
    result.splice (0, result.lastIndexOf (result [0]) + 1);
  }
  
  if (resultString == "")
    resultString = "No players currently have more than 1 forum pwned.";
  
  return resultString;
}
  
window.addEventListener ("load", function (e) {
  var thePage = document.body.innerHTML.replace (/\n/gi, '');
  
  // The following is an ugly hack so that the script doesn't break due to this forum.
  thePage = thePage.replace (/hay did u see thiz\?\?\?/gi, "HAY DID U SEE THIZ");
  
  var myClass, myCount, myName, count, where, altText, newText, theTable, x;
  var splitPage = new Array ();
  var klanNames = new Array ();
  var players = new Array ();
  var klans = new Array ();
  var searchText = new RegExp ("<h1>vanilla helper<\/h1>", "gi");
  var Denture;
  
  if (/<tr class=\"[A-z]+ highlighted\">  <td>Denture Chat<\/td>/gi.exec (thePage))
    Denture = "<strike>Denture Chat</strike> | ";
  else
    Denture = "<a href=\"http://www.forumwarz.com/forums/battle/1\">Denture Chat</a> | ";
  
  var replaceText = "<h1>Vanilla Helper</h1><div class=\"note\">Quick Links: " +
                    Denture +
                    "<a href=\"http://www.forumwarz.com/services/bruce\">Bruce Bear</a> | " +
                    "<a href=\"http://www.forumwarz.com/stores/drugs_fun\">Drugs \"R\" Fun</a> | " +
                    "<a href=\"http://www.forumwarz.com/stores/under_counter\">Drugs \"R\" Fun Backdoor</a> | " +
                    "<a href=\"http://www.forumwarz.com/stores/gods\">Herbal Assault</a> | " +
                    "<a href=\"http://www.forumwarz.com/job_board\">Herschel's Job Board</a></div>" +
                    "<div class=\"note\">";
  
  if (thePage.indexOf ("<b>omg hi ") > -1)
  {
    myClass = "Camwhore";
    where = thePage.indexOf ("<b>omg hi ") + 10;
    myName = thePage.substring (where, thePage.indexOf ("!!1</b>", where)).toLowerCase ();
  }
  else if (thePage.indexOf (" IS A STUPID NAME</b>") > -1)
  {
    myClass = "Troll";
    where = thePage.indexOf (" IS A STUPID NAME</b>");
    myName = thePage.substring (thePage.lastIndexOf ("<b>", where) + 3, where).toLowerCase ();
  }
  else if (thePage.indexOf ("<b>oh ") > -1)
  {
    myClass = "Emo Kid";
    where = thePage.indexOf ("<b>oh ") + 6;
    myName = thePage.substring (where, thePage.indexOf ("</b>", where)).toLowerCase ();
  }
  else if (thePage.indexOf ("<b>gr33tz, ") > -1)
  {
    myClass = "Hacker";
    where = thePage.indexOf ("<b>gr33tz, ") + 11;
    myName = thePage.substring (where, thePage.indexOf ("</b>", where)).toLowerCase();
  }
  else if (thePage.indexOf ("<b>Welcome, ") > -1)
  {
    myClass = "Re-Re";
    where = thePage.indexOf ("<b>Welcome, ") + 12;
    myName = thePage.substring (where, thePage.indexOf (".</b>", where)).toLowerCase ();
  }
  
  var theTable = /<b>full list<\/b> .+<table .+<\/table>/gi.exec (thePage)[0];
  var nameExp = new RegExp (">" + myName + "<\/a>", "i");
   
  if (nameExp.test (theTable) == true)
  {
    splitPage = theTable.split (nameExp);
    myCount = splitPage.length - 1;
    for (x = 0; x < myCount; x ++)
    {
      where = splitPage[x].indexOf ("<td>", splitPage[x].lastIndexOf ("<tr")) + 4;
      forumsHeld[x] = splitPage[x].substring (where, splitPage[x].indexOf ("</td>", where));
    }
  }
  else
    myCount = 0;
  
 /*
    How to add scripts (for fun and profit).
    thePage = thePage.replace (/<the name of the forum, in lower-case letters>/gi, site ("<the forum's number when you actually go there>", "<the forum's name>", "<the short form you want to use>"));
    So, if there was a new forum called "Invariel is Awesome", and it went to forumwarz.com/forums/battle/666. you might add:
    thePage = thePage.replace (/invariel is awesome/gi, site ("666", "Invariel is Awesome", "INVE"));
    and it would display:  "Invariel is Awesome [INVE]" on the Domination page.  It's that easy.
    That's all there is to it.
    */
  thePage = thePage.replace (/denture chat/gi, site ("1", "Denture Chat", "DENTURE"))
                   .replace (/dr. jojo\'s plastic surgery stronghold/gi, site ("7", "Dr. Jojo\'s Plastic Surgery Stronghold", "JOJO"))
                   .replace (/rice, rice, baby/gi, site ("15", "Rice, Rice, Baby", "RICE"))
                   .replace (/fitness faggotry/gi, site ("14", "Fitness Faggotry", "FITFAGS"))
                   .replace (/konservative kristian koalition/gi, site ("20", "Konservative Kristian Koalition", "KKK"))
                   .replace (/south carolina marine fisheries forum/gi, site ("44", "South Carolina Marine Fisheries Forum", "FISHES"))
                   .replace (/that\'s a lot of feces!/gi, site ("13", "That\'s a Lot of Feces!", "FECES"))
                   .replace (/r.p.genius/gi, site ("22", "R.P.Genius", "RPGEN"))
                   .replace (/the furry farm/gi, site ("4", "The Furry Farm", "FURRY"))
                   .replace (/headbanger\'s hellhole...of death/gi, site ("29", "Headbanger\'s Hellhole...of Death", "HHOD"))
                   .replace (/woe is us/gi, site ("36", "Woe is Us", "WOE"))
                   .replace (/coral springs nuclear generating station/gi, site ("46", "Coral Springs Nuclear Generating Station", "NUKE"))

                   .replace (/church of saiyantology/gi, site ("95", "Church of Saiyantology", "CHURCH"))
                   .replace (/trident media: theremin edition/gi, site ("128", "(Theremin)", "THEREMIN"))
                   .replace (/trident media/gi, site ("104", "Trident Media", "MEDIA"))
                   .replace (/\(theremin\)/gi, "Trident Media (Theremin)")
                   .replace (/cuddlenet/gi, site ("106", "CuddleNet", "CUDDLE"))
                   .replace (/amish gone wilde/gi, site ("30", "Amish Gone Wilde", "AMISH"))
                   .replace (/my rifle is this big/gi, site ("105", "MY RIFLE IS THIS BIG", "RIFLE"))
                   .replace (/pua playpen/gi, site ("59", "PUA Playpen", "PUA"))
                   .replace (/gays in recovery/gi, site ("110", "Gays in Recovery", "GAYS"))
                   .replace (/ebony jaguars/gi, site ("107", "Ebony Jaguars", "EBONY"))
                   .replace (/2chin.org fat acceptance forums/gi, site ("34", "2chin.org Fat Acceptance Forums", "CHINS"))
                   .replace (/cyberchondriacs/gi, site ("26", "CyberChondriacs", "CYBER"))
                   .replace (/paranoid panorama/gi, site ("93", "Paranoid Panorama", "PP"))
                   .replace (/traditional childrearing forums/gi, site ("56", "Traditional Childrearing Forums", "KIDS"))
                   .replace (/hear 'em roar!/gi, site ("108", "Hear 'em Roar!", "ROAR"))
                   .replace (/battlethreadz threadconstructr v3.0 gamma/gi, site ("63", "Battlethreadz ThreadConstructr v3.0 Gamma", "BATTLE"))
                   .replace (/schadenfreude.cx/gi, site ("51", "Schadenfreude.cx", "TROLL"))
                   .replace (/cam on my face/gi, site ("49", "Cam on my Face", "CAMWHORE"))
                   .replace (/emosapiens/gi, site ("111", "EmoSapiens", "EMO"))
                   .replace (/the soft hyphen/gi, site ("2", "The Soft Hyphen", "HACKER"))
                   .replace (/hay did u see thiz/gi, site ("112", "HAY DID U SEE THIZ", "NOOB"))
                   .replace (/super secret pentagon forum!!!/gi, site ("47", "SUPER SECRET PENTAGON FORUM!!!", "PENTAGON"))
                   .replace (/li'l pony groomers: kids only!/gi, site ("132", "(Kids)", "PONIES"))
                   .replace (/li'l pony groomers/gi, site ("109", "Li'l Pony Groomers", "PEDOS"))
                   .replace (/\(kids\)/gi, "Li'l Pony Groomers (Kids)")
                   .replace (/geronimo! official forums/gi, site ("52", "Geronimo! Official Forums", "GERONIMO"))
                   
                   .replace (/society for creative historical revisionism/gi, site ("148", "Society For Creative Historical Revisionism", "SCHR"))
                   .replace (/the sweaty handbook for virgins/gi, site ("163", "The Sweaty Handbook for Virgins", "VIRGIN"))
                   .replace (/childhood trauma forgettance forum/gi, site ("168", "Childhood Trauma Forgettance Forum", "TRAUMA"))
                   .replace (/plagiaristic intentions/gi, site ("129", "Plagiaristic Intentions", "PI"))
                   .replace (/the urbane dictionary/gi, site ("99", "The Urbane Dictionary", "URBANE"))
                   .replace (/anarchist\'s playbook/gi, site ("126", "Anarchist's Playbook", "APB"))
                   .replace (/deviousartists/gi, site ("98", "DeviousArtists", "DEVART"))
                   .replace (/the hitchhiker's guide to the internet/gi, site ("157", "The Hitchhiker's Guide to the Internet", "GUIDE"))
                   .replace (/faux news/gi, site ("120", "Faux News", "FAUX"))
                   .replace (/grammar nazis/gi, site ("161", "Grammar Nazis", "NAZI"))
                   .replace (/fathers against pornography/gi, site ("97", "Fathers Against Pornography", "FAP"))
                   .replace (/reincarnation/gi, site ("139", "ReincarNation", "NATION"))
                   .replace (/sensuous seamen/gi, site ("136", "Sensuous Seamen", "SEAMEN"))
                   .replace (/howstuffbreaks/gi, site ("102", "HowStuffBreaks", "BREAKS"))
                   .replace (/ratm: rage against the moderators/gi, site ("121", "RAtM: Rage Against the Moderators", "MODS"))
                   .replace (/gamefags/gi, site ("87", "GameFAGS", "GFAGS"))
                   .replace (/something lawful/gi, site ("116", "Something Lawful", "LAW"))
                   .replace (/world of whorecraft/gi, site ("143", "World of Whorecraft", "WOW"))
                   .replace (/fapquest/gi, site ("147", "FapQuest", "QUEST"))
                   .replace (/rule thirty-fourum/gi, site ("162", "Rule Thirty-Fourum", "R34"))
                   .replace (/mad scientists/gi, site ("131", "Mad Scientists", "MAD"))
                   .replace (/wahoo answers/gi, site ("142", "Wahoo Answers", "WAHOO"))
                   .replace (/extremist survivalist/gi, site ("170", "Extremist Survivalist", "EXTREME"))
                   .replace (/terra online/gi, site ("88", "Terra Online", "TERRA"))
                   .replace (/youboob/gi, site ("96", "YouBoob", "BOOB"))
                   .replace (/cellmates/gi, site ("130", "Cellmates", "CELL"))
                   .replace (/s.p.c.a/gi, site ("140", "S.P.C.A", "SPCA"))
                   .replace (/girls advocating sexual purity/gi, site ("122", "Girls Advocating Sexual Purity", "GASP"))
                   .replace (/the teachings of goa-tse/gi, site ("159", "The Teachings of Goa-Tse", "GOATSE"))
                   .replace (/memebusters/gi, site ("103", "MemeBusters", "MEME"))
                   .replace (/sanctuary for social network rejects/gi, site ("165", "Sanctuary for Social Network Rejects", "REJECT"))
                   .replace (/affluence anonymous/gi, site ("133", "Affluence Anonymous", "AA"))
                   .replace (/wiccapedia/gi, site ("101", "Wiccapedia", "WICCA"))
                   .replace (/internet confessional/gi, site ("135", "Internet Confessional", "IC"))
                   .replace (/veterans of foreign whores/gi, site ("138", "Veterans of Foreign Whores", "VETS"))
                   .replace (/obscure phobia support boards/gi, site ("123", "Obscure Phobia Support Boards", "PHOBIA"))
                   .replace (/craigslust.com/gi, site ("141", "Craigslust.com", "CRAIG"))
                   .replace (/homicide girls/gi, site ("113", "Homicide Girls", "GIRLS"))
                   .replace (/home of male objectors/gi, site ("94", "Home of Male Objectors", "HOMO"))
                   .replace (/god hates facts/gi, site ("100", "God Hates Facts", "FACTS"))
                   .replace (/sexteen/gi, site ("152", "SexTeen", "SEX"))
                   .replace (/society for the preservation of aging memes \(spam\)/gi, site ("167", "Society for the Preservation of Aging Memes (SPAM)", "SPAM"))
                   .replace (/fanfiction freaks/gi, site ("91", "Fanfiction Freaks", "FANFIC"))
                   .replace (/dolphin love/gi, site ("117", "Dolphin Love", "LOVE"))
                   .replace (/jewgrounds/gi, site ("154", "JewGrounds", "JEW"))
                   .replace (/everything sucks now/gi, site ("146", "Everything Sucks Now", "SUCKS"))
                   .replace (/teen mommies/gi, site ("124", "Teen Mommies", "MOMS"))
                   .replace (/atheists' heaven/gi, site ("156", "Atheists' Heaven", "ATHEIST"))
                   .replace (/praypal/gi, site ("115", "PrayPal", "PRAY"))
                   .replace (/stalker central/gi, site ("160", "Stalker Central", "STALKER"))
                   .replace (/baby swap/gi, site ("164", "Baby Swap", "SWAP"))
                   .replace (/fakebook/gi, site ("149", "Fakebook", "FAKE"))
                   .replace (/internet movie douchebags/gi, site ("119", "Internet Movie DoucheBags", "IMDB"))
                   .replace (/national geographic sexplorers/gi, site ("169", "National Geographic Sexplorers", "SEX"))
                   .replace (/wal-martyr/gi, site ("153", "Wal-Martyr", "WALMART"))
                   .replace (/suburban gangsta paradise/gi, site ("92", "Suburban Gangsta Paradise", "SGP"))
                   .replace (/great firewall of china/gi, site ("118", "Great Firewall of China", "CHINA"))
                   .replace (/hall of faded fame/gi, site ("134", "Hall of Faded Fame", "HOFF"))
                   .replace (/zombie armageddon/gi, site ("90", "Zombie Armageddon", "ZOMBIE"))
                   .replace (/densa low iq society/gi, site ("155", "DENSA Low IQ Society", "DENSA"))
                   .replace (/dykea/gi, site ("144", "Dykea", "DYKEA"))
                   .replace (/engrish ressons/gi, site ("158", "Engrish Ressons", "ENGRISH"))
                   .replace (/second wife/gi, site ("114", "Second Wife", "WIFE"))
                   .replace (/engrish ressons/gi, site ("158", "Engrish Ressons", "ENGRE"))
                   .replace (/cosplay central/gi, site ("150", "Cosplay Central", "CC"))
                   .replace (/the extremely specific fetish emporium/gi, site ("151", "The Extremely Specific Fetish Emporium", "FETISH"))
                   .replace (/video game cheaters/gi, site ("166", "Video Game Cheaters", "VGC"))
                   
                   .replace (/<div class=\"note\">.+<div id=\"domination\">/, "<div id=\"domination\">")
                   .replace (/<b>Forums Pwned by Player.+Full List/, "<b>Forum List")
                   ;
  
  count = theTable.split (/<tr class=\"[A-z]+ highlighted\">/).length - 1;    // Total Klan forums pwned.
  
  players = getPlayers (theTable);

  if (myClass == "Camwhore")
  {
    klanNames [0] = "awesome";
    klanNames [1] = "totally awesome";
    klanNames [2] = "all grrrrl";
    klanNames [3] = "rad";
    klanNames [4] = "sexah";
    klanNames [5] = "bodacious";
    klanNames [6] = "sassy";
    klanNames [7] = "flirtatious";
    klanNames [8] = "bodacious";
    klanNames [9] = "bootylicious";
    
    altText = "you liek totally have <b>" + myCount + "</b> ";
    if (myCount == 1)
      altText += "forums";
    else
      altText +=  "forums";
    
    altText += " pwned and your ";
    altText += klanNames [Math.floor (Math.random () * klanNames.length)];
    altText += " klan has <b>" + count + "</b> ";
    
    if (count == 1)
      altText += "forum";
    else
      altText += "forums";
    
     if (count == myCount)
      altText += " too!!1 :) :)";
    else
      altText += " pwnt!!1omg (:";
    
    altText += '</div>';
  }
  else if (myClass == "Troll")
  {
    klanNames [0] = "faggot";
    klanNames [1] = "saggy tit";
    klanNames [2] = "retarded";
    klanNames [3] = "lamer";
    klanNames [4] = "straight as a rainbow";
    klanNames [5] = "limpdick";
    klanNames [6] = "butt-fucking";
    klanNames [7] = "rectally promiscuous";
    
    var insults = new Array ();
    insults [0] = "you suck";
    insults [1] = "fail";
    insults [2] = "omg u suk";
    insults [3] = "ass pirate";
    insults [4] = "loser";
    insults [5] = "assface";

    altText = "<b>you only have <u>" + myCount + "</u> ";
    if (myCount == 1)
      altText += "forums";
    else
      altText +=  "forums";
    
    altText += " pwned and your ";
    altText += klanNames [Math.floor (Math.random () * klanNames.length)];
    altText += " klan has <u>" + count + "</u> ";
    
    if (count == 1)
      altText += "forum ";
    else
      altText += "forums ";
    
    if (count == myCount)
      altText += "too";
    else
      altText += "pwned";
    
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "1";
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "one";
    
    altText += "  " + insults [Math.floor (Math.random () * insults.length)];
    
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "1";
    for (i = 0; i <= Math.floor (Math.random () * 4 + 1); i ++)
      altText += "one";
    
    altText += '</b></div>';
    altText = altText.toUpperCase ();
  }
  else if (myClass == "Emo Kid")
  {
    klanNames [0] = "\"friends\"";
    klanNames [1] = "klan \"mates\"";
    klanNames [2] = "\"crew\"";
    klanNames [3] = "cutbuddies";
    klanNames [4] = "razorpals";
    klanNames [5] = "non-conformist clones";
    
    var insults = new Array ();
    insults [0] = "Go cut yourself.";
    insults [1] = "Sigh.";
    insults [2] = "Nobody understands you.";
    insults [3] = "I don't even understand me.";
    insults [4] = "You could do better.";
    
    altText = "You have <b>" + myCount + "</b> ";
    if (myCount == 1)
      altText += "forums";
    else
      altText +=  "forums";
    
    altText += " pwned for now and your ";
    altText += klanNames [Math.floor (Math.random () * klanNames.length)];
    altText += " have <b>" + count + "</b> ";
    
    if (count == 1)
      altText += "forum";
    else
      altText += "forums";
    
     if (count == myCount)
      altText += " too.";
    else
      altText += " pwned.";
    
    altText += "  " + insults [Math.floor (Math.random () * insults.length)];
    altText += '</div>';
  }
  else if (myClass == "Hacker")
  {
    klanNames [0] = "ate"
    klanNames [1] = new Array ();
    klanNames [1][0] = "ate"
    klanNames [1][1] = "8"
    klanNames [1][2] = "ait"
    klanNames [2] = "you"
    klanNames [3] = new Array ();
    klanNames [3][0] = "you"
    klanNames [3][1] = "u"
    klanNames [3][2] = "joo"
    klanNames [4] = "ough"
    klanNames [5] = new Array ();
    klanNames [5][0] = "ough"
    klanNames [5][1] = "o"
    klanNames [6] = "the"
    klanNames [7] = new Array ();
    klanNames [7][0] = "the"
    klanNames [7][1] = "teh"
    klanNames [8] = "to"
    klanNames [9] = new Array ();
    klanNames [9][0] = "to"
    klanNames [9][1] = "2"
    klanNames [9][2] = "too"
    klanNames [10] = "a"
    klanNames [11] = new Array ();
    klanNames [11][0] = "a"
    klanNames [11][1] = "4"
    klanNames [12] = "e"
    klanNames [13] = new Array ();
    klanNames [13][0] = "e"
    klanNames [13][1] = "3"
    klanNames [14] = "l"
    klanNames [15] = new Array ();
    klanNames [15][0] = "l"
    klanNames [15][1] = "1"
    klanNames [16] = "o"
    klanNames [17] = new Array ();
    klanNames [17][0] = "o"
    klanNames [17][1] = "0"
    klanNames [18] = "!"
    klanNames [19] = new Array ();
    klanNames [19][0] = "!"
    klanNames [19][1] = "1"

    if (myCount > 0 && count > myCount)
      altText = "you have brought the LULZ to <b>" + myCount + "</b> fora and your mates have <b>" + count + "</b> dominated!!!!";
    else if (myCount > 0 && myCount == count)
      altText = "your mates have you doing all the work with your <b>" + myCount + "</b> LULZ brought!!!!"
    else if (count > 0)
      altText = "you need to bring MOAR LULZ!!!! your mates have dominated <b>" + count + "</b> fora!!!!"
    else
      altText = "you and your mates are lazy!!!!"
    
    for (i = 0; i < klanNames.length; i += 2)
    {
      splitText = altText.split (klanNames [i]);
      altText = "";
        for (j = 0; j < splitText.length - 1; j ++)
          altText += splitText [j] + klanNames [i + 1][Math.floor (Math.random () * klanNames [i + 1].length)];
        altText += splitText [splitText.length - 1];
    }

    altText += "</div>"
  }
  else if (myClass == "Re-Re")
  {
    altText = "";
    for (i = 0; i <= Math.floor (Math.random () * 10 + 6); i ++)
        altText += String.fromCharCode (Math.floor (Math.random () * 26 + 97));
    
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "1";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "1";
    
    altText += "You have pwned <b>" + myCount + "</b>";
    altText += " of the <b>" + count + "</b> ";
    
    if (count == 1)
      altText += "forum";
    else
      altText += "forums";
    
    altText += " that your Klan has pwned.  ";
    
    for (i = 0; i <= Math.floor (Math.random () * 10 + 6); i ++)
        altText += String.fromCharCode (Math.floor (Math.random () * 26 + 97));
    
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "1";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "!";
    for (i = 0; i <= Math.floor (Math.random () * 3 + 1); i ++)
      altText += "1";
    
    altText += '</div>';
  }
  
  newText = replaceText + altText +
            "<div class='note'><h2>Player Breakdown:</h2> " + players + "</div>";
  thePage = thePage.replace (searchText, newText);
  
  document.body.innerHTML = thePage;
}, "false");