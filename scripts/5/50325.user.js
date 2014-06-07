// ==UserScript==
// @name           twitter create and follow v2
// @namespace      *.twitter.com
// @include https://twitter.com/*
// @include http://twitter.com/*
// ==/UserScript==

// Editor's note
// Source for this is
// http://userscripts.org/scripts/show/46820
// no namefagging

var	p1=["mega","duck","rick","dur","fart"],
	p2=["roll","rock","durr","bob","clown"],
	  nicewords=["happy", "grateful", "determined", "professional", "swell", "helpful", "sincere", "authentic", "content", "focused", "extraordinary", "delightful", "imaginative", "reverent", "successful", "heroic", "cheerful", "inventive", "unique", "upright", "tidy", "openminded", "blissful", "tough", "glad", "reposed", "desirable", "valiant", "fairminded", "modest", "ingenious", "solid", "courageous", "profound", "adaptable", "worthy", "colorful", "joyful", "laudable", "cute", "delectable", "dependable", "remarkable", "confident", "forbearing", "funny", "ready", "lenient", "magnetic", "enlightened", "authoritative", "enterprising", "righteous", "luminous", "exact", "cognizant", "ecstatic", "lovely", "entertaining", "inspired", "thorough", "decent", "helpful", "pragmatic", "witty", "convincing", "beautiful", "resplendent", "sexy", "assured", "competent", "progressive", "comedic", "felicitous", "accessible", "commendable", "sensual", "sublime", "sympathetic", "compatible", "discrete", "influential", "efficient", "humorous", "engaging", "civil", "merciful", "believable", "gentle", "lucky", "knowledgeable", "serene", "earnest", "adroit", "faithful", "exultant", "hospitable", "gleeful", "sparkling", "cordial", "soulful", "appreciative", "spontaneous", "fascinating", "brilliant", "impartial", "constant", "natural", "keen", "merry", "eloquent", "sensible", "comfortable", "relaxed", "softspoken", "casual", "loyal", "stable", "alive", "charming", "receptive", "good", "looking", "good", "mannered", "shrewd", "liberal", "grounded", "truthful", "gorgeous", "practical", "industrious", "brave", "perfect", "hardy", "innocent", "upright", "enchanted", "athletic", "noble", "diligent", "gregarious", "responsive", "precious", "satisfied", "deep", "cozy", "lawabiding", "agile", "restrained", "healthy", "just", "creative", "gentile", "meritorious", "learned", "right", "approachable", "harmonious", "kissable", "benevolent", "lucid", "conciliatory", "eventempered", "nice", "fun", "bold", "rich", "accommodating", "tender", "fantastic", "jolly", "whimsical", "defined", "immaculate", "diplomatic", "bright", "chatty", "mild", "proper", "vigorous", "wonderful", "alluring", "companionable", "reflective", "credible", "punctual", "elated", "impressive", "playful", "intelligent", "superb", "original", "devoted", "pleasant", "warm", "", "powerful", "convulsive", "fabulous", "gracious", "altruistic", "affirmative", "direct", "goodhearted", "chaste", "wise", "philanthropic", "robust", "convivial", "consistent", "dedicated", "persuasive", "amazing", "calm", "nimble", "desirable", "good", "studious", "neighborly", "confident", "decisive", "subtle", "personable", "peaceful", "brainy", "stylish", "hopeful", "bighearted", "affable", "excellent", "chic", "intuitive", "heedful", "courteous", "disarming", "caring", "fine", "logical", "tranquil", "virtuous", "attentive", "provident", "thoughtful", "cerebral", "jubilant", "affectionate", "forgiving", "mindful", "understanding", "fruitful", "winsome", "sociable", "elegant", "masterly", "fertile", "great", "tolerant", "free", "daring", "deserving", "polished", "real", "admirable", "blessed", "congenial", "godly", "openhanded", "independent", "compassionate", "consummate", "artistic", "genuine", "amorous", "blissful", "smooth", "spry", "complex", "scholarly", "easygoing", "autonomous", "accomplished", "seemly", "astute", "rejoicing", "philosophical", "beneficent", "privileged", "established", "sagacious", "grand", "important", "resolute", "radiant", "", "genial", "candid", "", "deliberate", "flexible", "reliable", "terrific", "sharp", "democratic", "impressive", "sweet", "charitable", "productive", "goodnatured", "saintly", "willing", "awesome", "sincere", "clearheaded", "dependable", "prompt", "splendid", "sophisticated", "prolific", "worldly", "energetic", "amicable", "discerning", "generous", "sunny", "fashionable", "mature", "light", "reasonable", "priceless", "suave", "forthright", "hilarious", "respectful", "comely", "spiritual", "appreciative", "precious", "steady", "spirited", "selfreliant", "nourishing", "thankful", "positive", "airy", "systematic", "handy", "considerate", "valiant", "romantic", "likeable", "appropriate", "adorable", "refined", "poetic", "attractive", "sentimental", "ambitious", "visionary", "lively", "prudent", "vivacious", "ethical", "tender", "dignified", "agreeable", "heavenly", "dutiful", "encouraging", "rosy", "gallant", "versatile", "amiable", "thrifty", "moral", "speedy", "balanced", "concise", "wellrounded", "purposeful", "enthusiastic", "passionate", "benign", "accountable", "moderate", "captivating", "strong", "sprite", "active", "distinctive", "responsible", "discriminating", "special"],
	  separator=["","","","","","_",],
	  mailseparator=["","_",".","-"];

//names from http://www.physionet.org/physiotools/deid/
  var first=["Albert","Bob","Richard","Paul","John","Jon","Mary","Peter","Jesus", "George","Tina","Loree","James","John","Robert","Michael","William","David","Charles","Joseph","Thomas","Christopher","Daniel","Paul","Mark","Donald","Kenneth","Steven","Edward","Brian","Anthony","Kevin","Jason","Matthew","Gary","Timothy","Jose","Larry","Jeffrey","Frank","Scott","Eric","Stephen","Andrew","Mary","Patricia","Linda","Barbara","Elizabeth","Jennifer","Maria","Susan","Margaret","Dorothy","Lisa","Nancy","Karen","Betty","Helen","Sandra","Donna","Carol","Martha","Amanda","Stephanie","Carolyn","Judy","Nicole","Kelly","Janice","Rose","Agnes","Andrew","Anita","Ann","Anthony","Arthur","Barbara","Bea","Bernard","Bertha","Bob","Carol","Carole","Dan","Dick","Dorothy","Earl","Edward","Emily","Ferdinand","Florence","Florencia","Frances","Francis","George","Grace","Helen","Herman","Ilene","Irene","Janice","Jean","Jen","John","Jon","Joyce","Karen","Katie","Leslie","Lindsey","Lucie","Maria","Marie","Mary","Muriele","Nancy","Patricia","Peter","Richard","Robert","Sarah","Susan","Sweeney","Van","Virginia","Warren"],
  last = ["Abrams","Andersen","Anderson","Anne","Ayoub","Babson","Bakaitis","Ballou","Bastarache","Benson","Bertha","Berz","Billy","Bowman","Boyle","Brule","Burke","Camarda","Capuano","Cardarelli","Carol","Chang","Chen","Chiotelis","Christensen","Chung","Clancy","Clifford","Cole","Cooke","Cozzi","Cronin","Crowley","Cucchiara","Culhane","Cuscuna","Daley","Dan","Darcy","David","Dean","Degiorgio","Denapoli","Depari","Devaux","Disangro","Djuric","Dobroth","Dolan","Domenico","Dominico","Donahue","Douglass","Drinkwater","Dudak","Dutter","Emano","Emperatrice","Enos","Falco","Falvey","Ferullo","Finn","Forman","Frost","Gabriele","Galini","Gannon","Garison","Garrison","Garvey","Gateman","Gaylord","Gertrude","Giggey","Gill","Gillan","Gogots","Golini","Grandone","Griffin","Grimes","Grogan","Halfpenny","Hanley","Hayes","Healey","Hillman","Hoard","Holden","Holmes","Hudson","Hughes","Hulse","Imbornone","Jacobson","Jenks","John","Jones","Joseph","Kargas","Kaufman","Kavaliunas","Kearns","Kenney","Kenny","Kerle","Kiezulas","King","Kinn","Klein","Knight","Kochevar","Koh","Kozicki","Lally","Lander","Lange","Lansdowne","Lapidus","Lavely","Laverne","Leclair","Lee","Leeuwen","Levine","Lindquist","Lipper","Loreck","Lowell","Lutherville","Macdonald","Madden","Mahn","Mahoney","Manning","Manookian","Marchant","Marchese","Marder","Marotta","Martyn","Mary","Masci","Mccloud","Mcdonald","Mclaughlin","Medelsohn","Merrick","Mesite","Miller","Mimmo","Morris","Munroe","Muriele","Murphy","Murray","Muse","Nessenson","Nicol","Nieds","Nolan","Noone","O'Brien","Olsen","Painter","Parke","Parrilli","Patty","Peppler","Peruzzi","Phelps","Phyl","Piantedosi","Pica","Powell","Preissner","Price","Przybylo","Radochia","Raefferty","Rafferty","Rakusin","Rand","Reid","Renna","Retterer","Ridlon","Rizzo","Robbinson","Robert","Roberto","Rockwood","Rodrigues","Rogers","Ronayne","Ross","Rothman","Rothmann","Rowe","Russo","Ruth","Ruuska","Saeed","Sallese","Sawtelle","Schwartz","Schwarz","Shaughnessy","Sheridan","Silva","Smith","Smolarek","Snell","Souza","Sparkes","Spears","Stord","Stronczek","Sullivan","Suzette","Swackhamer","Taggart","Tomasek","Toolis","Toscano","Tranfaglia","Tupper","Tura","Tyro","Vaquez","Vascuez","Vasquez","Viner","Vining","Vosolo","Wedgeworth","Weiser","Welsh","William","Williams","Wilson","Wisniewski","Wlodyka","Wolfe","Wong","Woodrum","Wright","Wyman","Wynn","Yanulis","Yi","Yout","Zimla"];

function $(e){return document.getElementById(e);}

function any(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}
function some(v) {
  return Math.floor(Math.random()*v).toString(36);
}

function mkfullname() {

  return any(first)+" "+any(last);
}
function mkusername() {
//Deklaration von anderen Variablen in globalen Kontext verschoben!
//You can only have 15 characters for your username at twitter


  return any(nicewords)+any(separator)+any(first)+some(2e9);
}
function mkpassword() {
//Deklaration von anderen Variablen in globalen Kontext verschoben!
  //return mkusername();
  return some(2e32-1);
}
function mkemail() {

     return any(nicewords)+any(mailseparator)+any(first)+some(2e5)+"@"+any(["yahoo.com","gmail.com","msn.com","hotmail.com","comcast.net","aol.com","mail.ru"]);
}

if (location.href=="http://twitter.com/" || location.href=="https://twitter.com/") {
  location.href="https://twitter.com/signup?follow=DarowDolla&commit=Join+today!";
} else if (location.href=="https://twitter.com/signup?follow=DarowDolla&commit=Join+today!") {
  $("header").innerHTML = "Pwn Score: "+(GM_getValue("fuck",0));
  $("user_name").value = mkfullname();
  $("user_screen_name").value=mkusername().substring(0,15).toLowerCase();
  $("user_user_password").value=mkpassword();
  $("user_email").value=mkemail().toLowerCase();
  $("recaptcha_response_field").focus();
} else if (location.href=="https://twitter.com/account/create") {
  // typo
  $("recaptcha_response_field").focus();
} else if (location.href=="https://twitter.com/invitations/find_on_other_networks") {
  GM_setValue("fuck",Number(GM_getValue("fuck",0))+1);
  $("sign_out_form").submit();
}