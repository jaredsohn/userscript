// ==UserScript==
// @name        Tektek Emotes + Autoformat
// @description Adds Tektek Emotes/gaiArch to gaia post (works in Chrome also) also adds Tektek Autoformat (Firefox only)
// @include     http://www.gaiaonline.com/forum/compose/*
// @include     http://www.gaiaonline.com/profiles/?*mode=addcomment*
// @include     http://www.gaiaonline.com/profiles?*mode=addcomment*
// @include     http://www.gaiaonline.com/p/?*mode=addcomment*
// @include     http://www.gaiaonline.com/p?*mode=addcomment*
// @include     http://www.gaiaonline.com/profiles/*?*mode=addcomment*
// @include     http://www.gaiaonline.com/p/*?*mode=addcomment*
// @include     http://www.gaiaonline.com/p/*/?*mode=addcomment*
// @include     http://www.gaiaonline.com/guilds/posting.php*
// @include     http://www.gaiaonline.com/forum/*/t.*
// @include     http://www.gaiaonline.com/profile/privmsg.php*
// @include     http://www.gaiaonline.com/j/*mode=*
// @include     http://www.gaiaonline.com/j/
// @include     http://www.gaiaonline.com/journal/*mode=*
// @include     http://www.gaiaonline.com/journal/
// @include     http://www.gaiaonline.com/marketplace/editstore*
// @include     http://www.gaiaonline.com/account/about*
// @include     http://www.gaiaonline.com/account/signature*
// @include     http://www.gaiaonline.com/p?*mode=edit*
// @include     http://www.gaiaonline.com/p/?*mode=edit*
// @include     http://www.gaiaonline.com/profiles?*mode=edit*
// @include     http://www.gaiaonline.com/profiles/?*mode=edit*
// @include     http://www.gaiaonline.com/profiles/*/*?mode=edit
// @include     http://www.gaiaonline.com/guilds/admin/masspm/id.*
// @resource    background http://i48.tinypic.com/2lbj9et.png
// @resource    format1img http://i46.tinypic.com/142bozs.gif
// @resource    format2img http://i46.tinypic.com/16iwakz.gif
// @resource    format3img http://i48.tinypic.com/w9is7n.gif
// @resource    format4img http://i46.tinypic.com/1rx0nr.gif
// @resource    format5img http://i32.tinypic.com/w9w6k5.gif
// @require     http://sizzlemctwizzle.com/updater.php?id=68957
// @namespace   http://userscripts.org/users/62850
// @version     4.5.0
// ==/UserScript==

var gArch=true;// this is for google chrome (true means gaiArch emotes will appear, false means they will not)
var emote5=false// gaia's non Normal emots sets option for chrome

var json=[// tektek emotes
{ "name": "Domokun", "code": ":domokun:", "loc": "domokun", "menuloc": "domokun", "size": 15 },
{ "name": "DomoKing", "code": ":domoking:", "loc": "domoking", "menuloc": "domokingeye", "size": 15 },
{ "name": "Heartbroken", "code": ":heartbroken:", "loc": "heartbroken", "menuloc": "heartbroken", "size": 18 },
{ "name": "Hyper", "code": ":hyper:", "loc": "hyper", "menuloc": "hyper", "size": 15 },
{ "name": "o_O", "code": ":O_o:", "loc": "o_O", "menuloc": "o_O", "size": 15 },
{ "name": "Sick", "code": ":sick:", "loc": "sick", "menuloc": "sick", "size": 15 },
{ "name": "x_x", "code": ":X_X:", "loc": "x_x", "menuloc": "x_x", "size": 15 },
{ "name": "Worried", "code": ":worried:", "loc": "worried", "menuloc": "worried", "size": 15},
{ "name": "^_^", "code": ":^_^:", "loc": "tek", "menuloc": "tek", "size": 15 },
{ "name": "Dizzy", "code": ":dizzy:", "loc": "dizzy", "menuloc": "dizzy", "size": 15 },
{ "name": "Oh Dear...", "code": ":ohdear:", "loc": "ohdear", "menuloc": "ohdear", "size": 15 },
{ "name": "Unwilling", "code": ":unwilling:", "loc": "unwilling", "menuloc": "unwilling", "size": 15 },
{ "name": "Mr. Yellow", "code": ":mryellow:", "loc": "mryellow", "menuloc": "mryellow", "size": 15 },
{ "name": "Red Ninja", "code": ":ninjared:", "loc": "ninjared", "menuloc": "ninjared", "size": 15 },
{ "name": "Green Ninja", "code": ":ninjagreen:", "loc": "ninjagreen", "menuloc": "ninjagreen", "size": 15 },
{ "name": "Blue Ninja", "code": ":ninjablue:", "loc": "ninjablue", "menuloc": "ninjablue", "size": 15 },
{ "name": "Square", "code": ":square:", "loc": "square", "menuloc": "square", "size": 15 },
{ "name": "Grunny", "code": ":grunny:", "loc": "grunny", "menuloc": "grunny", "size": 15 },
{ "name": "Grunny Ninja", "code": ":grunnyninja:", "loc": "grunnyninja", "menuloc": "grunnyninja", "size": 15 },
{ "name": "GBot", "code": ":gbot:", "loc": "gb", "menuloc": "gb", "size": 17 },
{ "name": "Ugh", "code": ":ugh:", "loc": "ugh", "menuloc": "ugh", "size": 18 },
{ "name": "Tired", "code": ":tired:", "loc": "tired", "menuloc": "tired", "size": 24 },
{ "name": "Cow", "code": ":moo:", "loc": "cow", "menuloc": "cow", "size": 26 },
{ "name": "Angel", "code": ":angel:", "loc": "angel", "menuloc": "angel", "size": 35 }
];// If you are reordering theses watch the comma at the end of the line.

var json2=[// gaiArch emotes
{ "name": "Angelic", "code": ":angel2:", "loc": "Angel.gif", "size": 27 },
{ "name": "Angelic :3", "code": ":angel3:", "loc": "angelsmiley.jpg", "size": 41 },
{ "name": "Left arrow", "code": ":leftarrow:", "loc": "0011ar.gif", "size": 15 },
{ "name": "Up arrow", "code": ":uparrow:", "loc": "0011ars.gif", "size": 15 },
{ "name": "Down arrow", "code": ":downarrow:", "loc": "0011arsy.gif", "size": 15 },
{ "name": "Eek", "code": ":eek:", "loc": "001WTh.gif", "size": 15 },
{ "name": "Classy :3", "code": ":B3:", "loc": "001cool_shite.gif", "size": 15 },
{ "name": ";3 Wink", "code": ";3:", "loc": "001grosss.gif", "size": 15 },
{ "name": "Purple whee", "code": ":purplewhee:", "loc": "001noair.gif", "size": 15 },
{ "name": "Mweh", "code": ":mweh:", "loc": "002appease.gif", "size": 15 },
{ "name": "Meh...", "code": ":meh:", "loc": "002fgape.gif", "size": 15 },
{ "name": "Twisted :3", "code": ">:3", "loc": "00EVIL.jpg", "size": 15 },
{ "name": "Angry stare", "code": ">__>;;", "loc": "00angrystaree.gif", "size": 15 },
{ "name": "Classy :D", "code": "8D", "loc": "00hoshiz.gif", "size": 15 },
{ "name": "Classy D:", "code": "D8", "loc": "00mycool.gif", "size": 15 },
{ "name": "Confused devil", "code": ">:?", "loc": "01oopp.jpg", "size": 15 },
{ "name": "Staring devil", "code": "'>__>'", "loc": "01pissoff.jpg", "size": 15 },
{ "name": "Freaky drool", "code": "*v*", "loc": "01whhoo.gif", "size": 15 },
{ "name": "Big nod", "code": ":bignod:", "loc": "0BIGnod.gif", "size": 15 },
{ "name": "Twisted whee", "code": ":twistedwhee:", "loc": "0LAUGH.jpg", "size": 15 },
{ "name": "Looking around :3", "code": ":lookaround:", "loc": "0gassy.gif", "size": 15 },
{ "name": "Looking below", "code": ":lookbelow:", "loc": "0icon_eek3.gif", "size": 15 },
{ "name": "Sad no", "code": ":no:", "loc": "0nyt.gif", "size": 15 },
{ "name": "Unsure no", "code": ":no?:", "loc": "0ohnoes.gif", "size": 15 },
{ "name": "Hesitant nod", "code": ":hesitantnod:", "loc": "0sheepish.gif", "size": 15 },
{ "name": "Lost", "code": ":lost:", "loc": "0sheepishno.gif", "size": 15 },
{ "name": "Angry nod", "code": ":angrynod:", "loc": "0snarl.gif", "size": 15 },
{ "name": "Look around :3", "code": ":3lookaround:", "loc": "0whereis.gif", "size": 15 },
{ "name": "Shy nod", "code": ":shynod:", "loc": "0whimpyes.gif", "size": 15 },
{ "name": "Shy no", "code": ":shyno:", "loc": "0whimpyno.gif", "size": 15 },
{ "name": "Nod", "code": ":nod:", "loc": "1atouch_of_gas.gif", "size": 15 },
{ "name": "Disgusted XP", "code": ":xpdisgust:", "loc": "1dun_like_et.gif", "size": 15 },
{ "name": "Frowning", "code": ":frown:", "loc": "1grr.gif", "size": 16 },
{ "name": "Erm...", "code": ":erm:", "loc": "1heheh3.jpg", "size": 15 },
{ "name": "Cute smile", "code": ":cutesmile:", "loc": "1mree.gif", "size": 16 },
{ "name": "Mustache", "code": ":mustache:", "loc": "1mustache.gif", "size": 15 },
{ "name": "Angry no", "code": ":angryno:", "loc": "1never.gif", "size": 15 },
{ "name": "Big :3 nod", "code": ":3bignod:", "loc": "1nodnodchap.gif", "size": 15 },
{ "name": "Confused look around", "code": ":lookaround?:", "loc": "1notso.gif", "size": 15 },
{ "name": "XP No", "code": ":xpno:", "loc": "1noways.gif", "size": 15 },
{ "name": "Erm... (down)", "code": ":downerm:", "loc": "1ohh.gif", "size": 15 },
{ "name": "Pleeeease ?", "code": ":please:", "loc": "1ooo.gif", "size": 16 },
{ "name": "Erm... (Right)", "code": ":righterm:", "loc": "1oy2.jpg", "size": 15 },
{ "name": "Cute stare", "code": ":cute|:", "loc": "1poo.gif", "size": 16 },
{ "name": "Shocked nod", "code": ":shocknod:", "loc": "1scary.gif", "size": 15 },
{ "name": "Erm... (Up)", "code": ":uperm:", "loc": "1sigh4.jpg", "size": 15 },
{ "name": "Pervert", "code": ":perv:", "loc": "1smile.gif", "size": 15 },
{ "name": "Crying nod", "code": ":T_Tnod:", "loc": "1sob.gif", "size": 15 },
{ "name": "Buck teeth", "code": ":B", "loc": "1teeth.gif", "size": 15 },
{ "name": "Desperate", "code": ":desperate:", "loc": "1pleaseno.gif", "size": 15 },
{ "name": "Gonking nod", "code": ":gonknod:", "loc": "1uhhu.gif", "size": 15 },
{ "name": "Cute laugh", "code": ":3laugh:", "loc": "1weeoo.gif", "size": 16 },
{ "name": "Smirk", "code": ":smirk:", "loc": "1whistle5.jpg", "size": 15 },
{ "name": "Shocked :o", "code": ":shocko:", "loc": "1wo.gif", "size": 15 },
{ "name": "Shocked drool", "code": ":shockdrool:", "loc": "1yeah.gif", "size": 15 },
{ "name": "No no no...", "code": ":nonono:", "loc": "5oxks1.gif", "size": 15 },
{ "name": "Angry eye twitch", "code": ":angryeyetwitch:", "loc": "5oxkxk.gif", "size": 15 },
{ "name": "Suspicious stare", "code": ">__>?", "loc": "5oxl49.gif", "size": 15 },
{ "name": "Eyebleed", "code": ":eyebleed:", "loc": "5oxlba.gif", "size": 15 },
{ "name": "o:", "code": ":o:", "loc": "5oxlco.gif", "size": 15 },
{ "name": "Zombie drool", "code": ":zombiedrool:", "loc": "5oxldu.gif", "size": 15 },
{ "name": "Happy", "code": ":happy:", "loc": "5oxlhk.gif", "size": 15 },
{ "name": "Shiny eyes", "code": ":shiny:", "loc": "5oxlio.gif", "size": 15 },
{ "name": "o_O stare", "code": ":o_O:", "loc": "5oxlkg.gif", "size": 15 },
{ "name": "Pirate grin", "code": ":pirateD:", "loc": "5oxllf.gif", "size": 15 },
{ "name": "Exasperated", "code": "-.-;", "loc": "5oxlp4.gif", "size": 15 },
{ "name": "^_^;", "code": "^_^;", "loc": "5oxlr8.gif", "size": 15 },
{ "name": "Dead", "code": "X_X", "loc": "5oxlqa.gif", "size": 15 },
{ "name": "Suspicious look", "code": "O.o?", "loc": "5oxls2.gif", "size": 15 },
{ "name": "Happy happy !", "code": "^-^", "loc": "5oxlvl.gif", "size": 15 },
{ "name": "Feline", "code": ":feline:", "loc": "5ozcb9.gif", "size": 15 },
{ "name": "Huge grin", "code": ":hugegrin:", "loc": "5ozi3d.gif", "size": 15 },
{ "name": "Eww", "code": ":eww:", "loc": "5ozic6.gif", "size": 15 },
{ "name": "Twitch", "code": ":twitch:", "loc": "5p0dqe.gif", "size": 15 },
{ "name": "Yawn", "code": ":yawn:", "loc": "5pl7yb.gif", "size": 19 },
{ "name": "Sick", "code": ":sick2:", "loc": "5plb92.gif", "size": 15 },
{ "name": "Sleeping", "code": ":sleeping:", "loc": "5pn2hu.gif", "size": 20 },
{ "name": "@_@ Confused", "code": "@_@", "loc": "5vzt7a.gif", "size": 15 },
{ "name": "Umpf !", "code": ":umpf:", "loc": "twitchy5rv.gif", "size": 17 },
{ "name": "Enraged", "code": ":rage:", "loc": "die.gif", "size": 16 },
{ "name": "Shocked pout", "code": ":shock(:", "loc": "eww.gif", "size": 15 },
{ "name": "Shocked look around", "code": ":shocklookaround:", "loc": "icon_eekpeek.gif", "size": 15 },
{ "name": "Sly", "code": ":sly:", "loc": "hmm.jpg", "size": 15 },
{ "name": "Neko :3 nod", "code": ":neko3:", "loc": "DkFoxyEmo.gif", "size": 17 },
{ "name": "Heart stare", "code": ":heartstare:", "loc": "smi_hearts.gif", "size": 15 },
{ "name": "Heart whee", "code": ":heartwhee:", "loc": "mreeheart.gif", "size": 17 },
{ "name": "Heart whee (blinking)", "code": ":heartwhee2:", "loc": "singlemree.gif", "size": 17 },
{ "name": "Triple heart", "code": ":heartwhee3:", "loc": "luffsmrees.gif", "size": 17 },
{ "name": "Triple heart whee (+Bounce)", "code": ":heartwheebounce:", "loc": "squishmree.gif", "size": 17 },
{ "name": "Demonic heart", "code": ":demonicheart:", "loc": "bloufla.gif", "size": 39 },
{ "name": "Hellish heart", "code": ":hellishheart:", "loc": "flamewin.gif", "size": 39 },
{ "name": "Winged heart", "code": ":wingedheart:", "loc": "n20qwh.gif", "size": 30 },
{ "name": "Winged yin yang heart", "code": ":wingedyinyangheart:", "loc": "Half.gif", "size": 30 },
{ "name": "Broken heart", "code": ":</3:", "loc": "brokeman.gif", "size": 16 },
{ "name": "Heart", "code": ":<3:", "loc": "darkreh.gif", "size": 15 },
{ "name": "Red heart (Shiny)", "code": ":redheartshiny:", "loc": "thred.gif", "size": 15 },
{ "name": "Pink heart", "code": ":pinkheart:", "loc": "lightpink.gif", "size": 15 },
{ "name": "Purple heart", "code": ":purpleheart:", "loc": "purple3.gif", "size": 15 },
{ "name": "Mauve heart", "code": ":mauveheart:", "loc": "purplehearty.gif", "size": 15 },
{ "name": "Darkblue heart", "code": ":darkblueheart:", "loc": "drableuh.gif", "size": 15 },
{ "name": "Blue heart", "code": ":blueheart:", "loc": "blooheart.gif", "size": 15 },
{ "name": "Light blue heart", "code": ":lightblueheart:", "loc": "LightBlueHeart.gif", "size": 15 },
{ "name": "Orange heart", "code": ":orangeheart:", "loc": "heartorange.gif", "size": 15 },
{ "name": "Green heart", "code": ":greenheart:", "loc": "greenhar.gif", "size": 15 },
{ "name": "Light green heart", "code": ":lightgreenheart:", "loc": "s2hart.gif", "size": 15 },
{ "name": "Lime heart", "code": ":limeheart:", "loc": "sabiha.gif", "size": 15 },
{ "name": "Black heart", "code": ":blackheart:", "loc": "thblackk.gif", "size": 11 },
{ "name": "Black heart (Shiny)", "code": ":blackheartshiny:", "loc": "thicon_heart.gif", "size": 15 },
{ "name": "Skull heart", "code": ":skullheart:", "loc": "skullhea.gif", "size": 15 },
{ "name": "Ninja heart!", "code": ":ninjaheart:", "loc": "ninhr.gif", "size": 15 },
{ "name": "Ninja heart (still)", "code": ":ninjaheartstill:", "loc": "slowerninjie.gif", "size": 15 },
{ "name": "Ninja heart (quick)", "code": ":ninjaheartquick:", "loc": "stillninj.gif", "size": 15 },
{ "name": "Rose", "code": ":rose:", "loc": "rose.gif", "size": 12 },
{ "name": "Sun", "code": ":sun:", "loc": "fastersun.gif", "size": 15 },
{ "name": "Sun (still)", "code": ":stillsun:", "loc": "ridiculous_sun_X3.gif", "size": 17 },
{ "name": "Sun (slow)", "code": ":sunslow:", "loc": "slowsun.gif", "size": 15 },
{ "name": "Unsatisfied", "code": ":unsatisfied:", "loc": "thcranky.gif", "size": 17 },
{ "name": "Angry cat", "code": ":angrycat:", "loc": "thenraged.gif", "size": 17 },
{ "name": "!!! cat", "code": ":!!!cat:", "loc": "thshocked.gif", "size": 17 },
{ "name": "Pee", "code": ":pee:", "loc": "thpiss.gif", "size": 17 },
{ "name": "Happy cat", "code": ":happycat:", "loc": "thkisses.gif", "size": 17 },
{ "name": "Potion", "code": ":potion:", "loc": "chemicalbubble.gif", "size": 9 },
{ "name": "Poo", "code": ":pco:", "loc": "suspiciouspoo.gif", "size": 28 },
{ "name": "World", "code": ":world:", "loc": "terre-01.gif", "size": 15 },
{ "name": "Globe", "code": ":globe:", "loc": "terre-29.gif", "size": 17 },
{ "name": "Blue giftbox", "code": ":bluegiftbox:", "loc": "giftbbox.gif", "size": 24 },
{ "name": "Pink giftbox", "code": ":pinkgiftbox:", "loc": "giftboxpi.gif", "size": 24 },
{ "name": "Santa robot", "code": ":santarobot:", "loc": "santa_ani.gif", "size": 17 },
{ "name": "Badger badger badger !", "code": ":badger:", "loc": "badger.gif", "size": 17 },
{ "name": "Easter bunny", "code": ":easterbunny:", "loc": "easter_bunny_ani.gif", "size": 16 },
{ "name": "Carrot", "code": ":carrot:", "loc": "Carrotbullet.gif", "size": 18 },
{ "name": "Green apple", "code": ":greenapple:", "loc": "5oyyz7.gif", "size": 15 },
{ "name": "Grunny domo", "code": ":grunnydomo:", "loc": "thgrunny.gif", "size": 15 },
{ "name": "Green domo", "code": ":greendomo:", "loc": "GreenDomoGIF.gif", "size": 15 },
{ "name": "Pink domo", "code": ":pinkdomo:", "loc": "pinkdomo.gif", "size": 15 },
{ "name": "Domogod", "code": ":domogod:", "loc": "f4el28.gif", "size": 15 },
{ "name": "O rlmente?", "code": ":orlmente:", "loc": "orlmente.jpg", "size": 17 },
{ "name": ">{)> owl", "code": ">{)>", "loc": "OwlStarecar.jpg", "size": 15 },
{ "name": "Buttsecks", "code": ":buttsecks:", "loc": "lol.jpg", "size": 19 },
{ "name": "Demonic ghost", "code": ":demonicghost:", "loc": "demon.gif", "size": 25 },
{ "name": "Angelic ghost", "code": ":angelghost:", "loc": "Ghost1.gif", "size": 60 }
];// If you are reordering theses watch the comma at the end of the line.


json4=[// gaia emotes
{"class": "biggrin", "text": "Very Happy", "code": ":D"},
{"class": "smile", "text": "Smile", "code": ":)"},
{"class": "embarassed", "text": "Embarassed", "code": ":oops:"},
{"class": "crying", "text": "Crying", "code": "T_T"},
{"class": "stare", "text": "Stare", "code": ":stare:"},
{"class": "xd", "text": "XD", "code": ":XD"},
{"class": "nodding", "text": ":3 Nodding", "code": ":3nod:"},
{"class": "biglaugh", "text": "Big Laugh", "code": ":big:"},
{"class": "gonk", "text": "Gonk", "code": ":gonk:"},
{"class": "scream", "text": "Scream", "code": ":scream:"},
{"class": "stressed", "text": "Stressed", "code": ":vein:"},
{"class": "sweat", "text": "Sweat", "code": ":sweat:"},
{"class": "heart", "text": "Heart", "code": ":heart:"},
{"class": "xp", "text": "XP", "code": ":xp:"},
{"class": "whee", "text": "Whee!", "code": ":whee:"},
{"class": "wink", "text": "Wink", "code": ":wink:"},
{"class": "sad", "text": "Sad", "code": ":("},
{"class": "surprised", "text": "Surprised", "code": ":o"},
{"class": "shocked", "text": "Shocked", "code": ":shock:"},
{"class": "confused", "text": "Confused", "code": ":?"},
{"class": "cool", "text": "Cool", "code": "8)"},
{"class": "laughing", "text": "Laughing", "code": ":lol:"},
{"class": "mad", "text": "Mad", "code": ":x"},
{"class": "razz", "text": "Razz", "code": ":P"},
{"class": "verysad", "text": "Very sad", "code": ":cry:"},
{"class": "evil", "text": "Evil", "code": ":evil:"},
{"class": "twisted", "text": "Twisted evil", "code": ":twisted:"},
{"class": "rolleyes", "text": "Rolling eyes", "code": ":roll:"},
{"class": "exclaim", "text": "Exclamation!", "code": ":!:"},
{"class": "question", "text": "Question?", "code": ":?:"},
{"class": "idea", "text": "Idea", "code": ":idea:"},
{"class": "arrow", "text": "Arrow", "code": ":arrow:"},
{"class": "neutral", "text": "Neutral", "code": ":|"},
{"class": "mrgreen", "text": "Mr. Green", "code": ":mrgreen:"},
{"class": "ninja", "text": "Ninja", "code": ":ninja:"},
{"class": "cutelaugh", "text": "Cute laugh", "code": ":cute:"},
{"class": "rofl", "text": "ROFL", "code": ":rofl:"},
{"class": "pirate", "text": "Pirate", "code": ":pirate:"},
{"class": "talk2hand", "text": "Talk to the hand", "code": ":talk2hand:"},
{"class": "burning", "text": "AUGH! My eyes!", "code": ":burning:"},
{"class": "cheese", "text": "Cheese and whine", "code": ":cheese:"},
{"class": "dramallama", "text": "Drama llama", "code": ":dramallama:"},
{"class": "wahmbulance", "text": "Wahhhhhmbulance", "code": ":wahmbulance:"},
{"class": "emo", "text": "Emo", "code": ":emo:"}
];

json5=[// new gaia emotes
{"class": "cat_biggrin", "text": "Very Happy", "code": ":cat_biggrin:"},
{"class": "cat_smile", "text": "Smile", "code": ":cat_smile:"},
{"class": "cat_embarassed", "text": "Embarassed", "code": ":cat_oops:"},
{"class": "cat_crying", "text": "Crying", "code": ":cat_crying:"},
{"class": "cat_stare", "text": "Stare", "code": ":cat_stare:"},
{"class": "cat_xd", "text": "XD", "code": ":cat_XD:"},
{"class": "cat_nodding", "text": ":3 Nodding", "code": ":cat_3nod:"},
{"class": "cat_biglaugh", "text": "Big Laugh", "code": ":cat_big:"},
{"class": "cat_gonk", "text": "Gonk", "code": ":cat_gonk:"},
{"class": "cat_scream", "text": "Scream", "code": ":cat_scream:"},
{"class": "cat_stressed", "text": "Stressed", "code": ":cat_vein:"},
{"class": "cat_sweat", "text": "Sweat", "code": ":cat_sweat:"},
{"class": "cat_xp", "text": "XP", "code": ":cat_xp:"},
{"class": "cat_whee", "text": "Whee!", "code": ":cat_whee:"},
{"class": "cat_wink", "text": "Wink", "code": ":cat_wink:"},
{"class": "cat_sad", "text": "Sad", "code": ":cat_sad:"},
{"class": "cat_surprised", "text": "Surprised", "code": ":cat_aie:"},
{"class": "cat_shocked", "text": "Shocked", "code": ":cat_eek:"},
{"class": "cat_confused", "text": "Confused", "code": ":cat_???:"},
{"class": "cat_cool", "text": "Cool", "code": ":cat_cool:"},
{"class": "cat_laughing", "text": "Laughing", "code": ":cat_lol:"},
{"class": "cat_mad", "text": "Mad", "code": ":cat_mad:"},
{"class": "cat_razz", "text": "Razz", "code": ":cat_razz:"},
{"class": "cat_verysad", "text": "Very sad", "code": ":cat_cry:"},
{"class": "cat_evil", "text": "Evil", "code": ":cat_evil:"},
{"class": "cat_twisted", "text": "Twisted evil", "code": ":cat_twisted:"},
{"class": "cat_rolleyes", "text": "Rolling eyes", "code": ":cat_roll:"},
{"class": "cat_exclaim", "text": "Exclamation!", "code": ":cat_!:"},
{"class": "cat_question", "text": "Question?", "code": ":cat_?:"},
{"class": "cat_idea", "text": "Idea", "code": ":cat_idea:"},
{"class": "cat_arrow", "text": "Arrow", "code": ":cat_arrow:"},
{"class": "cat_neutral", "text": "Neutral", "code": ":cat_neutral:"},
{"class": "cat_mrgreen", "text": "Mr. Green", "code": ":cat_mrgreen:"},
{"class": "cat_ninja", "text": "Ninja", "code": ":cat_ninja:"},
{"class": "cat_cutelaugh", "text": "Cute laugh", "code": ":cat_cute:"},
{"class": "cat_rofl", "text": "ROFL", "code": ":cat_rofl:"},
{"class": "cat_pirate", "text": "Pirate", "code": ":cat_pirate:"},
{"class": "cat_talk2hand", "text": "Talk to the hand", "code": ":cat_talk2hand:"},
{"class": "cat_burning", "text": "AUGH! My eyes!", "code": ":cat_burning:"},
{"class": "cat_emo", "text": "Emo", "code": ":cat_emo:"},
{"class": "yum_burger", "text": "Burger", "code": ":burger:"},
{"class": "yum_cupcake", "text": "Cupcake", "code": ":cupcake:"},
{"class": "yum_donut", "text": "Donut", "code": ":donut:"},
{"class": "yum_hotdog", "text": "Hotdog", "code": ":hotdog:"},
{"class": "yum_onigiri", "text": "Onigiri", "code": ":onigiri:"},
{"class": "yum_pie", "text": "Pie", "code": ":pie:"},
{"class": "yum_pizza", "text": "Pizza", "code": ":pizza:"},
{"class": "yum_puddi", "text": "Puddi", "code": ":puddi:"},
{"class": "yum_strawberry", "text": "Strawberry", "code": ":strawberry:"},
{"class": "yum_tea", "text": "Tea", "code": ":tea:"},
{"class": "yum_bacon", "text": "Bacon", "code": ":bacon:"},
{"class": "yum_coldone", "text": "Cold One", "code": ":coldone:"},
{"class": "yum_icecreampie", "text": "Ice Cream Pie", "code": ":icecreampie:"},
{"class": "yum_pumpkinpie", "text": "Pumpkin Pie", "code": ":pumpkinpie:"},
{"class": "yum_salmon", "text": "Salmon", "code": ":salmon:"},
{"class": "yum_sausage", "text": "Sausage", "code": ":sausage:"},
{"class": "yum_shrimp", "text": "Shrimp", "code": ":shrimp:"},
{"class": "yum_strawberrypie", "text": "Strawberry Pie", "code": ":strawberrypie:"},
{"class": "yum_tamago", "text": "Tamago", "code": ":tamago:"},
{"class": "yum_tuna", "text": "Tuna", "code": ":tuna:"},
{"class": "yum_wasabipie", "text": "Wasabi Pie", "code": ":wasabipie:"},
{"class": "emotion_awesomeface", "text": "Awesomeface", "code": ":awesome:"},
{"class": "emotion_dealwithit", "text": "Deal with it", "code": ":dealwithit:"},
{"class": "emotion_facepalm", "text": "Facepalm", "code": ":facepalm:"},
{"class": "emotion_bigheart", "text": "Big heart", "code": ":bigheart:"},
{"class": "emotion_jawdrop", "text": "Jawdrop", "code": ":jawdrop:"},
{"class": "emotion_kirakira", "text": "Kira kira", "code": ":kirakira:"},
{"class": "emotion_omnomnom", "text": "Omnomnom", "code": ":omnomnom:"},
{"class": "emotion_puke", "text": "Puke", "code": ":puke:"},
{"class": "emotion_sweatdrop", "text": "Sweatdrop", "code": ":sweatdrop:"},
{"class": "emotion_bigvein", "text": "Big vein", "code": ":bigvein:"},
{"class": "emotion_yatta", "text": "Yatta", "code": ":yatta:"},
{"class": "emotion_0A0", "text": "0A0", "code": ":0a0:"},
{"class": "emotion_8c", "text": "8C", "code": ":8c:"},
{"class": "emotion_bandaid", "text": "Bandaid", "code": ":bandaid:"},
{"class": "emotion_brofist", "text": "Brofist", "code": ":brofist:"},
{"class": "emotion_c8", "text": "C8", "code": ":c8:"},
{"class": "emotion_donotwant", "text": "Do Not Want", "code": ":donotwant:"},
{"class": "emotion_dowant", "text": "Do Want", "code": ":dowant:"},
{"class": "emotion_drool", "text": "Drool", "code": ":drool:"},
{"class": "emotion_eyebrow", "text": "Eyebrow", "code": ":eyebrow:"},
{"class": "emotion_hug", "text": "Hug", "code": ":hug:"},
{"class": "emotion_zombie", "text": "Zombie", "code": ":zombie:"},
{"class": "emotion_zzz", "text": "Zzz", "code": ":zzz:"},
{"class": "gaia_angelleft", "text": "Angel wing left", "code": ":angelleft:"},
{"class": "gaia_angelright", "text": "Angel wing right", "code": ":angelright:"},
{"class": "gaia_crown", "text": "Crown", "code": ":crown:"},
{"class": "gaia_gaiagold", "text": "Gaia Gold", "code": ":gaiagold:"},
{"class": "gaia_nitemareleft", "text": "Nitemare left", "code": ":nitemareleft:"},
{"class": "gaia_nitemareright", "text": "Nitemare right", "code": ":nitemareright:"},
{"class": "gaia_spoons", "text": "Spoons", "code": ":spoons:"},
{"class": "gaia_star", "text": "Star", "code": ":star:"},
{"class": "gaia_kittenstar", "text": "Kittenstar", "code": ":kittenstar:"},
{"class": "gaia_diamond", "text": "Diamond", "code": ":diamond:"}
];
if(typeof GM_setValue != 'undefined' && typeof GM_getResourceURL != 'undefined'){
	if(GM_getValue('fakeValue','isFake')=='isFake'){
		var isFF=true;
		gArch=GM_getValue("GA_support",true);
		emote5=GM_getValue("GFE_support",false);
		if(typeof JSON=='object'){
			var json3=JSON.parse(GM_getValue('emotes','[]'));
		}
	}
	else{
		var isFF=false;
		var json3=[//custom emotes for old versions of Firefox
			//{ "name": "I ? Firefox", "code":":i<3ff:", "loc":"http://i251.photobucket.com/albums/gg311/OoTLink/1523015719438d778f7ac51.gif", "size": 41 }
		];
	}
}
else{
	var isFF=false;
	var json3=[//custom emotes for Google Chrome
		//{ "name": "I ? Firefox", "code":":i<3ff:", "loc":"http://i251.photobucket.com/albums/gg311/OoTLink/1523015719438d778f7ac51.gif", "size": 41 }
	];
}
function getId(id){
	return document.getElementById(id);
}
function getClass(c){
	return document.getElementsByClassName(c)[0];
}
function getName(n){
	return document.getElementsByName(n)[0];
}
function getTag(t){
	return document.getElementsByTagName(t)[0];
}
function getEle(tag,attr,val){
	return document.evaluate('.//'+tag+'[@'+attr+'="'+val+'"]', document, null, 9, null).singleNodeValue;
}
function sendEvent(ele,e){
	var evt = document.createEvent("HTMLEvents");
	evt.initEvent(e, true, true);
	ele.dispatchEvent(evt);
}
function inArray(arr,val){
	if((arr.constructor==Array)===false){
		if(arr.toString().indexOf(',')!=-1){
			arr=arr.split(',');
		}
		else{
			if(arr==val){
				return true;
			}
			else{
				return false;
			}
		}
	}
	for(var i=0;i<arr.length;i++){
		if(arr[i]==val){
			return true;
		}
	}
	return false;
}
function objectsCount(obj){
	if(typeof obj.length=='number'){
		return obj.length;
	}
	var ct=0;
	for(var i in obj){
		ct++;
	}
	return ct;
}
function relocate(p,t,b){
	if(b){
		p.insertBefore(t,b);
	}
	else{
		p.appendChild(t);
	}
}
function toTitleCase(str){
	if(str.indexOf(' ')!=-1){
		var arr=str.split(' ');
		var newStr='';
		var end;
		for(var i=0;i<arr.length;i++){
			end=arr[i].slice(1).toLowerCase()+' ';
			if(end.indexOf(']')!=-1){
				end=toTitleCaseCode(end);
			}
			newStr+=arr[i].substr(0,1).toUpperCase()+end;
		}
		return newStr.slice(0,newStr.length-1);
	}
	else if(str.indexOf(']')!=-1){
		return toTitleCaseCode(str);
	}
	else if(str.length>1){
		return str.slice(0,1).toUpperCase()+str.slice(1).toLowerCase();
	}
	else{
		return str.toUpperCase();
	}
}
function toTitleCaseCode(str){
	if(str.indexOf(']')){
		var arr=str.split(']');
		var newStr='';
		for(var i=0;i<arr.length;i++){
			newStr+=arr[i].substr(0,1).toUpperCase()+arr[i].slice(1).toLowerCase()+']';
		}
		return newStr.slice(0,newStr.length-1);
	}
	else{
		return str;
	}
}
// I hope people don't abuse this function
function toAlternateCase(str){// function credit http://userscripts.org/topics/35015#posts-168534
	var newStr="";
	for(var i=0;i<str.length;i++){
		newStr+=str.charAt(i)["to"+(i&1?"Upp":"Low")+"erCase"]();
	}
	return newStr;
}
function str2regExStr(str){
	return str.replace(/([\[\]/()$\\\|\.\+?^\*])/g,"\\$1");
	/*var needles='\\,/,^,?,|,(,),$,*,+,[,]'.split(',');
	for(var i=0;i<needles.length;i++){
		if(str.indexOf(needles[i])!=-1){
			str=str.replace(new RegExp('\\'+needles[i],'g'),'\\'+needles[i]);
		}
	}
	return str;*/
}
function autoFormat(styleNum,textBox,btnClk){
	var tta=getId('tektek_skipauto');
	if(tta&&btnClk==false){
		if(tta.offsetHeight>0){
			var stat=tta.checked;
			GM_setValue('skip',stat);
		}
		else{
			var stat=false;
		}
	}
	else if(btnClk==false){
		var stat=true;
	}
	else{
		var stat=false;
	}
	if(styleNum>0&&!stat){
		var pText=textBox.value;
		if(pText.length==0){
			if(btnClk){
				alert('You can not format empty space.');
			}
			return '';
		}
		var endQuote=pText.toLowerCase().lastIndexOf("[/quote]")+8;
		if(endQuote!=7){
			if(pText.substr(endQuote,1)=='\n'){
				endQuote++;
			}
			var quote=pText.substr(0,endQuote);
			var post=pText.substr(endQuote);
			if(post.length==0){
				if(pText.substr(0,7)!='[quote='||pText.substr(0,7)!='[quote]'){
					var startQuote=pText.toLowerCase().indexOf("[quote=");
					if(startQuote==-1){
						startQuote=pText.toLowerCase().indexOf("[quote]");
					}
					if(pText.substr(startQuote-1,1)=='\n'){
						startQuote--;
					}
					post=pText.substr(0,startQuote);
					quote=pText.substr(startQuote);
					var afterQuote=false;
				}
				if(post.length==0){
					if(btnClk){
						alert('You can not format empty space.');
					}
					return pText;
				}
			}
			else{
				var afterQuote=true;
			}
		}
		else{
			var quote='';
			var post=pText;
		}
		var formats=getFormats();
		try{
			var basTyp=getEle('select','name','basic_type');
			if(basTyp.value==0){
				if(formats[styleNum]['style']==6){
					if(loc.indexOf('gaiaonline.com/guilds')!=-1){
						basTyp.selectedIndex=formats[styleNum]['style'];
					}
				}
				else{
					basTyp.selectedIndex=formats[styleNum]['style'];
				}
			}
		}
		catch(e){}
		if(formats[styleNum]['case']!=0){
			if(formats[styleNum]['case']==1){
				post=post.toUpperCase();
			}
			else if(formats[styleNum]['case']==2){
				post=post.toLowerCase();
			}
			else if(formats[styleNum]['case']==3){
				post=toTitleCase(post);
			}
			else if(formats[styleNum]['case']==4){
				post=toAlternateCase(post);
			}
		}
		if(afterQuote){
			return quote+unescape(formats[styleNum]['start'])+post+unescape(formats[styleNum]['end']);
		}
		else{
			return unescape(formats[styleNum]['start'])+post+unescape(formats[styleNum]['end'])+quote;
		}
	}
	else{
		return textBox.value;
	}
}
function getFormats(){
	var formats=GM_getValue('formats',false);
	if(formats){
		try{
			formats=eval('('+formats+')');
		}
		catch(e){
			formats=eval('('+unescape(formats)+')');
		}
	}
	return formats;
}
function stripFormat(styleNum,textBox){
	if(styleNum>0){
		var pText=textBox.value;
		if(pText.length==0){
			return pText;
		}
		var formats=getFormats();
		var start=unescape(formats[styleNum]['start']);
		if(formats[styleNum]['start']){
			while(pText.indexOf(start)!=-1){
				pText=pText.replace(start,'');
			}
		}
		var end=unescape(formats[styleNum]['end']);
		if(formats[styleNum]['end']){
			while(pText.indexOf(end)!=-1){
				pText=pText.replace(end,'');
			}
		}
		return pText;
	}
	else{
		return textBox.value;
	}
}
function scarasticNotice(textBox){
	var pText=textBox.value;
	var endQuote=pText.toLowerCase().lastIndexOf("[/quote]")+8;
	if(endQuote!=7){
		if(pText.substr(endQuote,1)=='\n'){
			endQuote++;
		}
		var quote=pText.substr(0,endQuote);
		var post=pText.substr(endQuote);
		if(post.length==0){
			return false;
		}
	}
	if(pText!=0){
		alert('Congratulations:\n\tYou double clicked a button now you have to edit you post.\n\t\tHint:\n\t\t\tClick the post then press \'\'[crtl]+[z]\'\'');
	}
}
function insertformatButtons(textBox,source,ff,loc){
	if(ff){
		var settingsBtn=true;
		if(source==1){
			if(loc.indexOf('/profile/privmsg.php')!=-1){
				var btn=document.createElement('a');
				btn.id='tekSettings';
				btn.className='info_button';
				btn.setAttribute('onclick','return false;');
				btn.innerHTML='<span class="button_cap"></span><span class="button_text">Settings</span>';
				getId('btn_send').parentNode.appendChild(btn);
				GM_addStyle('#gaia_content a#tekSettings{float:right;margin-left:10px;font-size:10px;}#tekformatbutons .tekformat{margin-right:0px;cursor:pointer;}#tektek_isauto #tektek_skipauto{margin-top:3px;}');
			}
			else{
				var btn=document.createElement('button');
				btn.innerHTML='<span>Settings</span>';
				btn.className='cta-button-sm gray-button';
				btn.type='button';
				btn.addEventListener('click',function(){formatDialog(textBox,loc,source);},false);
				var t=document.getElementsByClassName('form_buttons');
				t[0].insertBefore(btn,t[0].childNodes[0]);
				btn=btn.cloneNode(true);
				t[1].insertBefore(btn,t[1].childNodes[0]);
				GM_addStyle('#tekformatbutons .tekformat{margin-right:6px;cursor:pointer;}#tekformatbutons,#tektek_isauto{margin-left:70px;}');
			}
			btn.addEventListener('click',function(){formatDialog(textBox,loc,source);},false);
			settingsBtn=false;
		}
		else if(source==2){
			if(loc.indexOf('/guilds/')==-1){
				var t=getClass('journal-commentbox-button');
				if(!t){
					t=getClass('journal-entrybox-button');
				}
				var btn=document.createElement('td');
				btn.className='journal-entrybox-button';
				btn.innerHTML='<button title="Settings" alt="Settings" class="cta-button-xsm gray-button" type="button"><span>Settings</span></button>';
				btn.childNodes[0].addEventListener('click',function(){formatDialog(textBox,loc,source);},false);

				t.parentNode.insertBefore(btn,t);
				settingsBtn=false;
			}
			GM_addStyle('#tekformatbutons{padding-bottom:3px;}#tekformatbutons .tekformat{margin-right:4px;cursor:pointer;}a#tekSettings{display:inline;float:right;}'+((loc.indexOf('journal')==-1)?'':'textarea#entrybox,textarea#commentbox,input.helpline[type="text"]{width:100%!important;}'));
			textBox.parentNode.appendChild(document.createElement('br'));
		}
		else if(source==3){
			var btn=document.createElement('input');
			btn.type='button';
			btn.value='Settings';
			btn.addEventListener('click',function(){formatDialog(textBox,loc,source);},false);
			textBox.parentNode.appendChild(btn);
			settingsBtn=false;
			GM_addStyle('#tekformatbutons .tekformat{margin-left:3px;margin-right:3px;cursor:pointer;position:relative;top:3px;}#content .info_button .button_cap {background:url("http://'+((ff)?unsafeWindow.GAIA_config('graphics_server'):GAIA_config('graphics_server'))+'/images/gaia_global/body/buttons/bn_silver_button.gif") no-repeat scroll left top transparent;display:block;float:left;font-size:0;height:21px;width:8px;}#content .info_button .button_text{background:url("http://'+((ff)?unsafeWindow.GAIA_config('graphics_server'):GAIA_config('graphics_server'))+'/images/gaia_global/body/buttons/bn_silver_button.gif") no-repeat scroll right top transparent;color:#000000;display:block;float:left;height:17px;padding:4px 8px 0 0;vertical-align:middle;white-space:nowrap;}#content .info_button{cursor:pointer;font-size:92%;font-weight:bold;text-decoration:none;}');
		}
		var span=document.createElement('span');
		span.id="tekformatbutons";
		span.innerHTML=
			'<img id="tekformat1img" class="tekformat" src="'+GM_getResourceURL("format1img")+'">'+
			'<img id="tekformat2img" class="tekformat" src="'+GM_getResourceURL("format2img")+'">'+
			'<img id="tekformat3img" class="tekformat" src="'+GM_getResourceURL("format3img")+'">'+
			'<img id="tekformat4img" class="tekformat" src="'+GM_getResourceURL("format4img")+'">'+
			'<img id="tekformat5img" class="tekformat" src="'+GM_getResourceURL("format5img")+'">'+
			((settingsBtn)?'<br/><a onclick="return false;" href="#" class="cta-button-sm gray-button" id="tekSettings"><span>Settings</span></a>':'');
		span.childNodes[0].addEventListener('click',function(){textBox.value=autoFormat(1,textBox,true);},false);
		span.childNodes[1].addEventListener('click',function(){textBox.value=autoFormat(2,textBox,true);},false);
		span.childNodes[2].addEventListener('click',function(){textBox.value=autoFormat(3,textBox,true);},false);
		span.childNodes[3].addEventListener('click',function(){textBox.value=autoFormat(4,textBox,true);},false);
		span.childNodes[4].addEventListener('click',function(){textBox.value=autoFormat(5,textBox,true);},false);
		span.childNodes[0].addEventListener('dblclick',function(){scarasticNotice(textBox);},false);
		span.childNodes[1].addEventListener('dblclick',function(){scarasticNotice(textBox);},false);
		span.childNodes[2].addEventListener('dblclick',function(){scarasticNotice(textBox);},false);
		span.childNodes[3].addEventListener('dblclick',function(){scarasticNotice(textBox);},false);
		span.childNodes[4].addEventListener('dblclick',function(){scarasticNotice(textBox);},false);
		if(settingsBtn){
			span.childNodes[6].addEventListener('click',function(){formatDialog(textBox,loc,source);},false);
		}
		if(source==4){
			getId('tek_stuff').childNodes[1].appendChild(span);
		}
		else if(source==2){
			textBox.parentNode.appendChild(span);
			if(loc.indexOf('/j/')==-1&&loc.indexOf('/journal/')==-1){
				span.insertBefore(document.createElement('br'),span.childNodes[4]);
			}
		}
		else{
			textBox.parentNode.insertBefore(span,textBox.nextSibling);
		}
		var type,formats=getFormats();
		if(formats){
			if(loc.indexOf('/forum/compose/')!=-1 || (loc.indexOf('/forum/')!=-1&&loc.indexOf('/t.')!=-1)){
				type='FF';
			}
			else if(loc.indexOf('/guilds/posting.php')!=-1){
				type='GF';
			}
			else if(loc.indexOf('/profile/privmsg.php')!=-1){
				type='PM';
			}
			else if(loc.indexOf('/j/')!=-1||loc.indexOf('/journal/')!=-1){
				type='JC';
			}
			else{
				type='PC';
			}
			if(formats['auto'][type]){
				if(formats['auto'][type]==0){
					type=0;
				}
			}
			else{
				type=0;
			}
		}
		else{
			type=0;
		}
		var div=document.createElement('div');
		if(type==0){
			div.style.display='none';
		}
		div.innerHTML='<div><span style="font-size:80%;" id="tektek_isauto">(Auto-Format is <strong>enabled</strong> -- &nbsp; <input style="position:relative;top:3px;" type="checkbox" id="tektek_skipauto"> Skip)</span></div>';
		textBox.parentNode.appendChild(div);
		if(source==4){
			div.childNodes[0].setAttribute('style',"position:absolute;padding-top:8px;margin:6px;");
		}
		getId('tektek_skipauto').checked=((type==0)?true:GM_getValue('skip',false));
	}
}
function insertCaseChanger(loc,source,textBox){// http://i47.tinypic.com/20ivzgz.gif storing link here incase I need it again
	var ad=getId('grid_ad');
	if(ad){
		ad.style.display='none';
	}
	if(source==1){
		var holder=document.createElement('div');
		if(loc.indexOf('/profile/privmsg.php')!=-1){
			holder.setAttribute('style','margin-left:50px;width:300px;height:300px;margin-top:133px;border:1px solid #999999;padding-left:5px;padding-right:5px;padding-bottom:50px;background-color:#C3CDD5;');
			ad.parentNode.appendChild(holder);
		}
		else{
			holder.id="changeCaseHolder";
			holder.className='gaia-info justhd';
			getId('post_action').parentNode.appendChild(holder);
		}
	}
	else if(source==-2){
		var holder=document.createElement('div');
		holder.style.marginLeft='30px';
		holder.innerHTML='<h1 style="width:420px;">Case Changer</h1><div style="width:400px;padding:10px;height:350px;border:1px solid #999999;background-color:#C3CDD5;" id="changeCaseHolder"></div>';
		if(loc.indexOf('account/about')!=-1){
			textBox.parentNode.insertBefore(holder,textBox.parentNode.childNodes[0]);
			holder.setAttribute('style','width:420px;position:absolute;right:0px;top:-12px;');
		}
		else{
			ad.parentNode.appendChild(holder);
		}
		var holder=holder.childNodes[1];
	}
	else if(source==3){
		var holder=document.createElement('div');
		holder.setAttribute('style','position:absolute;top:0;right:0;width:24%;height:180px;border:1px solid #999999;padding-bottom:70px;background-color:#C3CDD5;');
		textBox.parentNode.appendChild(holder);
	}
	else if(source==2){
		var holder=textBox.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('tbody')[0];
		holder.innerHTML='<tr><td></td></tr>';
		holder.parentNode.parentNode.setAttribute('style','padding:5px!important;width:25%;');
		holder=holder.childNodes[0].childNodes[0];
		holder.setAttribute('style','border:1px solid #999999!important;background-color:#C3CDD5;padding:5px!important;');
	}
	if(loc.indexOf('/profile/privmsg.php')!=-1||source==-2||source==2||source==3){
		holder.innerHTML=((!holder.id&&(source==1||source==3||source==2))?'<h3 style="text-align:center;">Case Changer</h3>':'')+
			'<textarea id="changeCaseInput" style="width:98%;height:39%;" rows="7"></textarea>'+
			'<p style="margin:0;text-align:center;font-size:100%;">Change case to <select id="changeCaseSelect" style="margin-top:5%;margin-bottom:5%;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select></p>'+
			'<textarea id="changeCaseOutput" style="width:98%;height:39%;" rows="7" readonly="readonly" onclick="this.select();"></textarea>';
	}
	else{
		holder.innerHTML='<div class="hd"><div class="rc_top_left">&nbsp;</div><div class="rc_top_right">&nbsp;</div><h3>Case Changer</h3><a style="position:absolute;right:5px;top:6px;" class="icon_expand closed" onclick="if(this.className.indexOf(\'closed\')==-1){this.className=\'icon_expand closed\';this.parentNode.parentNode.className=\'gaia-info justhd\';}else{this.className=\'icon_expand expand\';this.parentNode.parentNode.className=\'gaia-info nofooter\';}return false;" href="#"><span class="accessAid">Expand Case Changer</span></a></div><div class="bd"><textarea id="changeCaseInput" style="width:99%;height:100px;"></textarea><p style="margin:0;text-align:center;">Change case to <select id="changeCaseSelect" style="margin-top:5%;margin-bottom:5%;"></p><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select><textarea id="changeCaseOutput" style="width:99%;height:100px;" readonly="readonly" onclick="this.select();"></textarea></div><div class="ft"><div class="rc_bottom_left">&nbsp;</div><div class="rc_bottom_right">&nbsp;</div></div></div>';
	}
	getId('changeCaseSelect').addEventListener('change',function(e){
		var index=getId('changeCaseSelect').value;
		var input=getId('changeCaseInput').value;
		if(index==1){
			input=input.toUpperCase();
		}
		else if(index==2){
			input=input.toLowerCase();
		}
		else if(index==3){
			input=toTitleCase(input);
		}
		else if(index==4){
			input=toAlternateCase(input);
		}
		getId('changeCaseOutput').value=input;
	},false);
	getId('changeCaseInput').addEventListener('keyup',function(e){
		sendEvent(getId('changeCaseSelect'),"change");
	},false);
}
function formatDialogSetDefault(x){
	var ele=getId('formatRow');
	var eles=ele.getElementsByTagName('textarea');
	eles[0].value='[color=red]Text to go before each message';
	eles[1].value='Text at the end of each message[/color]';

	eles[2].value='[b]';
	eles[3].value='[/b]';

	eles[4].value='[size=9]';
	eles[5].value='[/size]';

	eles[6].value='[align=left]Look at me, I am default text[/align]\n[center][color=blue]';
	eles[7].value='[/color][/center]\n[align=right]Yes, that is the best I can think of :stare:[/align]';

	eles[8].value='[imgleft]http://i26.tinypic.com/ao2ele.png[/imgleft][imgright]http://i32.tinypic.com/immbyg.png[/imgright][center]';
	eles[9].value='[/center]';
	if(x==1){
		eles=ele.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('select');
		for(var i=0;i<eles.length-1;i++){
			eles[i].selectedIndex=0;
		}
		eles[eles.length-1].selectedIndex=1;
	}
}
function formatDialog(textBox,loc,source){
	unsafeWindow.GM_TIMEOUT_STOP=false;
	unsafeWindow.GM_TIMEOUT;
	var form=document.createElement('form');
	form.onsubmit='return false;';
	form.setAttribute('style','height:100%;width:100%;position:fixed;top:0px;left:0px;background-color:gray;background-color:-moz-dialog;z-index:1000;margin:0;');
	form.id="GM_autoformatForm";
	form.innerHTML='<style type="text/css">body{overflow:hidden;}</style>'+
		'<center><a id="GM_FORM_CLOSE" style="text-decoration:none;width:61px;display:inline;position:absolute;top:0;left:0;" class="info_button" onclick="return false;" href="#"><span class="button_cap"></span><span class="button_text">Save</span></a><input type="button" style="display:none;"/><a id="GM_FORM_RESET" style="display:table;margin-left:'+(window.innerWidth/2-21)+'px;width:100%;" title="Single Click to restore defaults. Double Click to clear everything." class="info_button" href="#" onclick="if(!GM_TIMEOUT_STOP){GM_TIMEOUT=setTimeout(\'document.getElementById(\\\'GM_FORM_RESET\\\').previousSibling.click();GM_TIMEOUT_STOP=false;\',500);GM_TIMEOUT_STOP=true;}return false;" ondblclick="clearTimeout(GM_TIMEOUT);GM_TIMEOUT_STOP=false;this.nextSibling.click();"><span class="button_cap"></span><span class="button_text">Reset</span></a><input onclick="return confirm(\'Are you sure you want to clear everything?\\nThis will blank out everything.\');" type="reset" style="display:none;"/><a style="text-decoration:none;width:61px;display:inline;position:absolute;top:0;right:0;" class="info_button" onclick="this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);return false;" href="#"><span class="button_cap"></span><span class="button_text">Cancel</span></a></center>'+
		'<div style="margin-top:5px;overflow:auto;height:500px;max-height:'+(window.innerHeight-25)+'px">'+
			'<table border="0" style="min-width:1300px;width:100%;">'+
				'<tbody>'+
					'<tr>'+
						'<td colspan="5">'+
							'<table border="0" style="width:'+(window.innerWidth-20)+'px;margin-left:5px;min-width:1300px;">'+
								'<tbody>'+
									'<tr id="formatRow">'+
										'<td width="20%">'+
											'<span>Format-Style 1:</span><br/>'+
												'<span style="padding-left:10px;">Start of post:</span><br/>'+
													'<textarea id="format1-1" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea><br/>'+
												'<span style="padding-left:10px;">End of post:</span><br/>'+
													'<textarea id="format1-2" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea>'+
										'</td>'+
										'<td width="20%">'+
											'<span>Format-Style 2:</span><br/>'+
												'<span style="padding-left:10px;">Start of post:</span><br/>'+
													'<textarea id="format2-1" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea><br/>'+
												'<span style="padding-left:10px;">End of post:</span><br/>'+
													'<textarea id="format2-2" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea>'+
										'</td>'+
										'<td width="20%">'+
											'<span>Format-Style 3:</span><br/>'+
												'<span style="padding-left:10px;">Start of post:</span><br/>'+
													'<textarea id="format3-1" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea><br/>'+
												'<span style="padding-left:10px;">End of post:</span><br/>'+
													'<textarea id="format3-2" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea>'+
										'</td>'+
										'<td width="20%">'+
											'<span>Format-Style 4:</span><br/>'+
												'<span style="padding-left:10px;">Start of post:</span><br/>'+
													'<textarea id="format4-1" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea><br/>'+
												'<span style="padding-left:10px;">End of post:</span><br/>'+
													'<textarea id="format4-2" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea>'+
										'</td>'+
										'<td width="20%">'+
											'<span>Format-Style 5:</span><br/>'+
												'<span style="padding-left:10px;">Start of post:</span><br/>'+
													'<textarea id="format5-1" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea><br/>'+
												'<span style="padding-left:10px;">End of post:</span><br/>'+
													'<textarea id="format5-2" style="margin-left:20px;width:0;height:100px;">'+
													'</textarea>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td width="20%">'+
							'<span style="padding-left:10px;">Format Style:</span>'+
							'<span style="padding-left:15px;">Case Style:</span><br/>'+
								'<select id="format1-3" style="margin-left:20px;width:80px;"><option value="0">Say</option><option value="1">Whisper</option><option value="2">Shout</option><option value="3">Think</option><option value="4">Document</option><option value="5">Ornate</option><option value="6">Honey (Guilds Only)</option></select>'+
								'<select id="format1-4" style="margin-left:25px;width:135px;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select>'+
						'</td>'+
						'<td width="20%">'+
							'<span style="padding-left:10px;">Format Style:</span>'+
							'<span style="padding-left:15px;">Case Style:</span><br/>'+
								'<select id="format2-3" style="margin-left:20px;width:80px;"><option value="0">Say</option><option value="1">Whisper</option><option value="2">Shout</option><option value="3">Think</option><option value="4">Document</option><option value="5">Ornate</option><option value="6">Honey (Guilds Only)</option></select>'+
								'<select id="format2-4" style="margin-left:25px;width:135px;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select>'+
						'</td>'+
						'<td width="20%">'+
							'<span style="padding-left:10px;">Format Style:</span>'+
							'<span style="padding-left:15px;">Case Style:</span><br/>'+
								'<select id="format3-3" style="margin-left:20px;width:80px;"><option value="0">Say</option><option value="1">Whisper</option><option value="2">Shout</option><option value="3">Think</option><option value="4">Document</option><option value="5">Ornate</option><option value="6">Honey (Guilds Only)</option></select>'+
								'<select id="format3-4" style="margin-left:25px;width:135px;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select>'+
						'</td>'+
						'<td width="20%">'+
							'<span style="padding-left:10px;">Format Style:</span>'+
							'<span style="padding-left:15px;">Case Style:</span><br/>'+
								'<select id="format4-3" style="margin-left:20px;width:80px;"><option value="0">Say</option><option value="1">Whisper</option><option value="2">Shout</option><option value="3">Think</option><option value="4">Document</option><option value="5">Ornate</option><option value="6">Honey (Guilds Only)</option></select>'+
								'<select id="format4-4" style="margin-left:25px;width:135px;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select>'+
						'</td>'+
						'<td width="20%">'+
							'<span style="padding-left:10px;">Format Style:</span>'+
							'<span style="padding-left:15px;">Case Style:</span><br/>'+
								'<select id="format5-3" style="margin-left:20px;width:80px;"><option value="0">Say</option><option value="1">Whisper</option><option value="2">Shout</option><option value="3">Think</option><option value="4">Document</option><option value="5">Ornate</option><option value="6">Honey (Guilds Only)</option></select>'+
								'<select id="format5-4" style="margin-left:25px;width:135px;"><option value="0">Normal case</option><option value="1">UPPER CASE</option><option value="2">lower case</option><option value="3">Title Case</option><option value="4">aLtErNaTeInG CaSe</option></select>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="5">'+
							'<table border="0" width="100%">'+
								'<tbody>'+
									'<tr>'+
										'<td colspan="4">Auto-Format:</td>'+
									'</tr>'+
									'<tr>'+
										'<td>'+
											'<span style="margin-left:10px;">Forums:</span><br/>'+
												'<select id="Forum_Format" style="margin-left:20px;width:135px;"><option value="0">None</option><option value="1">Format-Style 1</option><option value="2">Format-Style 2</option><option value="3">Format-Style 3</option><option value="4">Format-Style 4</option><option value="5">Format-Style 5</option></select><br/>'+
										'</td>'+
										'<td>'+
											'<span style="margin-left:10px;">Guilds:</span><br/>'+
												'<select id="Guild_Format" style="margin-left:20px;width:135px;"><option value="0">None</option><option value="1">Format-Style 1</option><option value="2">Format-Style 2</option><option value="3">Format-Style 3</option><option value="4">Format-Style 4</option><option value="5">Format-Style 5</option></select><br/>'+
										'<td>'+
											'<span style="margin-left:10px;">Private Messages:</span><br/>'+
												'<select id="PM_Format" style="margin-left:20px;width:135px;"><option value="0">None</option><option value="1">Format-Style 1</option><option value="2">Format-Style 2</option><option value="3">Format-Style 3</option><option value="4">Format-Style 4</option><option value="5">Format-Style 5</option></select><br/>'+
										'</td>'+
										'<td>'+
											'<span style="margin-left:10px;">Profile Comments:</span><br/>'+
												'<select id="PC_Format" style="margin-left:20px;width:135px;"><option value="0">None</option><option value="1">Format-Style 1</option><option value="2">Format-Style 2</option><option value="3">Format-Style 3</option><option value="4">Format-Style 4</option><option value="5">Format-Style 5</option></select>'+
										'</td>'+
										'<td>'+
											'<span style="margin-left:10px;">Journal Comments:</span><br/>'+
												'<select id="JC_Format" style="margin-left:20px;width:135px;"><option value="0">None</option><option value="1">Format-Style 1</option><option value="2">Format-Style 2</option><option value="3">Format-Style 3</option><option value="4">Format-Style 4</option><option value="5">Format-Style 5</option></select>'+
										'</td>'+
									'</tr>'+
								'</tbody>'+
							'</table>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="2">'+
							'<span><b>Note</b>:</span><br/>'+
								'<span style="margin-left:10px;">Please use lower case tag names in your BB Code.</span><br/>'+
									'<span style="margin-left:20px;">Example:</span><br/>'+
										'<span style="margin-left:30px;">Use <i>[img]</i> not <i>[IMG]</i></span><br/>'+
								'<span style="margin-left:10px;">Case changeing settings are not applied to you auto-format code.</span><br/>'+
								'<span style="margin-left:10px;">Case changeing settings will break some emotes, images, and links.</span>'+
						'</td>'+
						'<td colspan="1" style="text-align:center;">'+
							'Auto-Format is currently<br/>'+
								'<select id="tekFormatCheck" title="Determins weather the skip auto-foramt box is cheked or not"><option value="false">Enabled</option><option value="true">Disabled</option></select>'+
						'</td>'+
						'<td colspan="1" style="text-align:center;">'+
							'gaiArch emote support is<br/>'+
								'<select id="GA_Support" title="gaiArch Support adds '+objectsCount(json2)+' emotes"><option value="true">Enabled</option><option value="false">Disabled</option></select><br/>'+
							'Always use all Gaia\'s emotes<br/>'+
								'<select id="GFE_Support" title="This adds support for gaia\'s emotes sets for Cats, Yummies, Emotions, and  Gaia totaling '+objectsCount(json5)+' emotes enjoy the hunt ;)"><option value="true">Enabled</option><option value="false">Disabled</option></select>'+
						'</td>'+
						'<td colspan="1" style="text-align:center;">'+
							'Place a scrollbar on the emote boxes<br/>'+
								'<select id="largeEmoteBox" title="Prevents oversized emote boxes"><option value="false">Enabled</option><option value="true">Disabled</option></select>'+
						'</td>'+
					'</tr>'+
				'</tbody>'+
			'</table>'+
		'</div>';
	try{
		getId('content-padding').appendChild(form);
	}
	catch(e){
		try{
			getId('gaia_content').appendChild(form);
		}
		catch(e){
			getId('content').appendChild(form);
		}
	}
	var tAreas=getId('formatRow').getElementsByTagName('textarea');
	for(var i=0;i<tAreas.length;i+=2){
		var w=tAreas[i].parentNode.offsetWidth-20+'px';
		tAreas[i].style.width=w;
		tAreas[i+1].style.width=w;
	}
	for(var i=0;i<tAreas.length;i++){
		tAreas[i].addEventListener('focus',function(){
			for(var i=0;i<tAreas.length;i+=2){
				tAreas[i].parentNode.setAttribute('width','15%');
				tAreas[i].style.width='0';
				tAreas[i+1].style.width='0';
			}
			this.parentNode.setAttribute('width','40%');
			for(var i=0;i<tAreas.length;i+=2){
				var w=tAreas[i].parentNode.offsetWidth-20+'px';
				tAreas[i].style.width=w;
				tAreas[i+1].style.width=w;
			}
		},false);
		tAreas[i].addEventListener('blur',function(){
			for(var i=0;i<tAreas.length;i+=2){
				tAreas[i].parentNode.setAttribute('width','20%');
				tAreas[i].style.width='0';
				tAreas[i+1].style.width='0';
			}
			for(var i=0;i<tAreas.length;i+=2){
				var w=tAreas[i].parentNode.offsetWidth-20+'px';
				tAreas[i].style.width=w;
				tAreas[i+1].style.width=w;
			}
		},false);
	}
	getId('tekFormatCheck').selectedIndex=(GM_getValue('skip',false))?1:0;
	var lb=GM_getValue('lb',true);
	getId('largeEmoteBox').selectedIndex=(lb)?1:0;
	var GAS=getId('GA_Support');
	GAS.selectedIndex=(gArch)?0:1;
	var GFE=getId("GFE_Support");
	GFE.selectedIndex=(emote5)?0:1;
	var formats=getFormats();
	if(formats){
		getId("Forum_Format").selectedIndex=formats['auto']['FF'];
		getId("Guild_Format").selectedIndex=formats['auto']['GF'];
		getId("PM_Format").selectedIndex=formats['auto']['PM'];
		getId("PC_Format").selectedIndex=formats['auto']['PC'];
		getId("JC_Format").selectedIndex=formats['auto']['JC'];

		getId("format1-1").value=unescape(formats[1]['start']);
		getId("format1-2").value=unescape(formats[1]['end']);
		getId("format1-3").value=formats[1]['style'];
		getId("format1-4").value=formats[1]['case'];

		getId("format2-1").value=unescape(formats[2]['start']);
		getId("format2-2").value=unescape(formats[2]['end']);
		getId("format2-3").value=formats[2]['style'];
		getId("format2-4").value=formats[2]['case'];

		getId("format3-1").value=unescape(formats[3]['start']);
		getId("format3-2").value=unescape(formats[3]['end']);
		getId("format3-3").value=formats[3]['style'];
		getId("format3-4").value=formats[3]['case'];

		if(formats[4]){
			getId("format4-1").value=unescape(formats[4]['start']);
			getId("format4-2").value=unescape(formats[4]['end']);
			getId("format4-3").value=formats[4]['style'];
			getId("format4-4").value=formats[4]['case'];
		}

		if(formats[5]){
			getId("format5-1").value=unescape(formats[5]['start']);
			getId("format5-2").value=unescape(formats[5]['end']);
			getId("format5-3").value=formats[5]['style'];
			getId("format5-4").value=formats[5]['case'];
		}
	}
	else{
		formatDialogSetDefault(0);
	}
	getId('GM_FORM_RESET').previousSibling.addEventListener('click',function(){
		if(confirm('Are you sure you want to set everything to default?\nThis will set everything to its default value. (example settings)')){
			formatDialogSetDefault(1);
		}
	},false);
	getId('GM_FORM_CLOSE').addEventListener('click',function(){
		var f1p1=escape(getId("format1-1").value);
		var f1p2=escape(getId("format1-2").value);
		var f1p3=getId("format1-3").value;
		var f1p4=getId("format1-4").value;

		var f2p1=escape(getId("format2-1").value);
		var f2p2=escape(getId("format2-2").value);
		var f2p3=getId("format2-3").value;
		var f2p4=getId("format2-4").value;

		var f3p1=escape(getId("format3-1").value);
		var f3p2=escape(getId("format3-2").value);
		var f3p3=getId("format3-3").value;
		var f3p4=getId("format3-4").value;

		var f4p1=escape(getId("format4-1").value);
		var f4p2=escape(getId("format4-2").value);
		var f4p3=getId("format4-3").value;
		var f4p4=getId("format4-4").value;

		var f5p1=escape(getId("format5-1").value);
		var f5p2=escape(getId("format5-2").value);
		var f5p3=getId("format5-3").value;
		var f5p4=getId("format5-4").value;

		var FF=Number(getId("Forum_Format").value);
		var GF=Number(getId("Guild_Format").value);
		var PM=Number(getId("PM_Format").value);
		var PC=Number(getId("PC_Format").value);
		var JC=Number(getId("JC_Format").value);

		var GAs=eval(getId("GA_Support").value);
		var GFe=eval(getId("GFE_Support").value);

		var skip=eval(getId('tekFormatCheck').value);
		GM_setValue('skip',skip);
		if(source!=-1){
			var tek=getId('tektek_skipauto');
			tek.checked=skip;
			if(tek.offsetWidth>0){
				if(source==1){
					if(PM==0&&FF==0){
						tek.parentNode.parentNode.parentNode.style.display='none';
						tek.checked=true;
					}
					else if(FF==0&&PM>0){
						if(loc.indexOf('/forum/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='none';
							tek.checked=true;
						}
					}
					else if(PM==0&&FF>0){
						if(loc.indexOf('/profile/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='none';
							tek.checked=true;
						}
					}
				}
				else if(source==2){
					if(JC==0&&GF==0){
						tek.parentNode.parentNode.parentNode.style.display='none';
						tek.checked=true;
					}
					else if(GF==0&&JC>0){
						if(loc.indexOf('/guilds/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='none';
							tek.checked=true;
						}
					}
					else if(JC==0&&GF>0){
						if(loc.indexOf('/guilds/')==-1){
							tek.parentNode.parentNode.parentNode.style.display='none';
							tek.checked=true;
						}
					}
				}
				else if(source==3){
					if(PC==0){
						tek.parentNode.parentNode.parentNode.style.display='none';
						tek.checked=true;
					}
				}
				else if(source==4){
					if(FF==0){
						tek.parentNode.parentNode.parentNode.style.display='none';
						tek.checked=true;
					}
				}
			}
			else{
				if(source==1){
					if(PM>0&&FF>0){
						tek.parentNode.parentNode.parentNode.style.display='';
						tek.checked=false;
					}
					else if(FF>0&&PM==0){
						if(loc.indexOf('/forum/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='';
							tek.checked=false;
						}
					}
					else if(PM>0&&FF==0){
						if(loc.indexOf('/profile/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='';
							tek.checked=false;
						}
					}
				}
				else if(source==2){
					if(JC>0&&GF>0){
						tek.parentNode.parentNode.parentNode.style.display='';
						tek.checked=false;
					}
					else if(GF>0&&JC==0){
						if(loc.indexOf('/guilds/')!=-1){
							tek.parentNode.parentNode.parentNode.style.display='';
							tek.checked=false;
						}
					}
					else if(JC>0&&GF==0){
						if(loc.indexOf('/guilds/')==-1){
							tek.parentNode.parentNode.parentNode.style.display='';
							tek.checked=false;
						}
					}
				}
				else if(source==3){
					if(PC>0){
						tek.parentNode.parentNode.parentNode.style.display='';
						tek.checked=false;
					}
				}
				else if(source==4){
					if(FF>0){
						tek.parentNode.parentNode.parentNode.style.display='';
						tek.checked=false;
					}
				}
			}
		}
		GM_setValue('formats','{"1":{"start":"'+f1p1+'","end":"'+f1p2+'","style":'+f1p3+',"case":'+f1p4+'},"2":{"start":"'+f2p1+'","end":"'+f2p2+'","style":'+f2p3+',"case":'+f2p4+'},"3":{"start":"'+f3p1+'","end":"'+f3p2+'","style":'+f3p3+',"case":'+f3p4+'},"4":{"start":"'+f4p1+'","end":"'+f4p2+'","style":'+f4p3+',"case":'+f4p4+'},"5":{"start":"'+f5p1+'","end":"'+f5p2+'","style":'+f5p3+',"case":'+f5p4+'},"auto":{"FF":'+FF+',"GF":'+GF+',"PM":'+PM+',"PC":'+PC+',"JC":'+JC+'}}');
		GM_setValue('GA_support',GAs);
		GM_setValue('GFE_support',GFe);

		var lb=eval(getId('largeEmoteBox').value);
		GM_setValue('lb',lb);

		var div=getId('GM_autoformatForm');
		div.parentNode.removeChild(div);
		if(GAs!=gArch){
			var holder=getId('emoticons');
			if(!GAs){
				if(holder){
					if(typeof unsafeWindow.YAHOO.gaia.Emotes!='object'){
						var eles=holder.getElementsByClassName('gArchEmote');
						for(var i=eles.length-1;i>-1;i--){
							holder.removeChild(eles[i]);
						}
					}
					else{
						delete(unsafeWindow.YAHOO.gaia.Emotes["GaiArch"]);
						var e=getId('emoticon_set');
						if(e.value=='GaiArch'){
							e.selectedIndex=0;
							sendEvent(e,"change");
						}
						unsafeWindow.YAHOO.gaia.Emotes.reload();
					}
					var q=getId('qr_container');
					if(q){
						q.removeAttribute('class');
					}
				}
				else{
					var eles=document.getElementsByClassName('gArchEmote');
					for(var i=eles.length-1;i>-1;i--){
						eles[i].parentNode.removeChild(eles[i]);
					}
				}
				textBox.value=gArchEmoteConversion(textBox.value,2);
			}
			else{
				if(holder){
					if(loc.indexOf('account/signature')!=-1||loc.indexOf('account/about')!=-1){
						insertGaiArchEmote(holder,2,(getId('about_content')?0:1));
					}
					else{
						insertGaiArchEmote(holder,(getId('qr_container')?2:0),0);
					}
				}
				else{
					insertGaiArchEmote(getClass('gensmall').parentNode.parentNode,1,0);
				}
				if(loc.indexOf('account/signature')==-1){
					textBox.value=gArchEmoteConversion(textBox.value,1);
				}
			}
			gArch=GAs;
		}
		if(GFe!=emote5){// todo emote5 strip/replace
			var holder=getId('qr_container');
			if(holder){
				var holder2=getId('emoticons');
				if(!GFe){
					var eles=holder.getElementsByClassName('catsPlus');
					for(var i=eles.length-1;i>-1;i--){
						holder2.removeChild(eles[i]);
					}
				}
				else{
					for(var i in json5){
						var li=document.createElement('li');
						li.className="catsPlus";
						li.innerHTML='<a title="'+json5[i]['text']+' - '+json5[i]['code']+'" class="emoticon '+json5[i]['class']+'" href="#" onclick="emoticon2(this.title.slice(this.title.indexOf(\' - \')+3));return false;">'+json5[i]['text']+'</a>';
						holder2.appendChild(li);
					}
				}
			}
			emote5=GFe;
		}
		var edit=getId('editor');
		if(!edit&&loc.indexOf('mode=addcomment')!=-1&&loc.indexOf('/p')){
			edit=textBox.previousSibling;
		}
		if(edit&&!lb&&(gArch||objectsCount(json3)>0)){
			edit.className='scroll';
		}
		else if(edit){
			edit.removeAttribute('class');
		}
	},false);
}
function emotionEditorDialog(textBox,m){
	var div=document.createElement('div');
	div.setAttribute('style','position:fixed;top:0;left:0;width:100%;height:100%;background-color:gray;background-color:-moz-dialog;z-index:1000;');
	div.id="GM_EMOTE_CONFIG";
	div.innerHTML=
		'<table style="width:91%;margin:auto;height:100%;" border="0">'+
			'<tbody>'+
				'<tr>'+
					'<td colspan="3">'+
						'<span>Seperate your emotes with a line break or a comma.</span>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<td colspan="3">'+
						'<textarea id="customEmoteJSON" style="width:100%;height:100%;"></textarea>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<td colspan="1" >'+
						'<a id="GM_EMOTE_SAVE" style="float:left;text-decoration:none;width:51px;display:inline;" class="info_button" onclick="return false;" href="#"><span class="button_cap"></span><span class="button_text">Save</span></a>'+
					'</td>'+
					'<td colspan="1" width="105">'+
						'<a id="GM_EMOTE_ADD" title="You will have to answer 4 simple questions." style="text-decoration:none;width:105px;display:inline;" class="info_button" onclick="return false;" href="#"><span class="button_cap"></span><span class="button_text">Add Emotion</span></a>'+
					'</td>'+
					'<td colspan="1">'+
						'<a id="GM_EMOTE_CANCEL" style="float:right;text-decoration:none;width:61px;display:inline;" class="info_button" onclick="this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode.parentNode.parentNode);return false;" href="#"><span class="button_cap"></span><span class="button_text">Cancel</span></a>'+
					'</td>'+
				'</tr>'+
				'<tr>'+
					'<td colspan="3">'+
						'<div>'+
							'Notes:<br/>'+
							'<div style="margin-left:10px">'+
								'If you can not figure out what is wrong with you code <a target="_blank" href="http://www.jsonlint.com/">this</a> will help you.<br/.>'+
								'You will need to place your code in side of brackets (<code>[]</code>) when you do this.<br/>'+
								'You will also need to replace all of you line breaks (<code>enter key</code>) with commas.'+
							'</div>'+
							'FAQs:<span style="float:right;font-weight:bold;">Scroll bar here ?&nbsp;</span><br/>'+
							'<div style="margin-left:10px;max-height:175px;overflow-y:auto;">'+
								'Q: How can I change my line breaks to commas quicky?<br/>'+
								'A: Just click <a onclick="var tb=document.getElementById(\'customEmoteJSON\');tb.value=tb.value.replace(/\\n/g,\',\');return false;" href="#">here</a>.<br/>'+
								'Q: Can I use the validated code from <a target="_blank" href="http://www.jsonlint.com">www.jsonlint.com</a> in the above text box?<br/>'+
								'A: Yes.<br/>'+
								'Q: Is there a way I can easly figure out the size my emotion\'s is?<br/>'+
								'A: Yes, click <a id="imageSizer" target="_blank">here</a> for a simple tool.<br/>'+
								'Q: How can I put a double quote (<code>"</code>) in my emote code?<br/>'+
								'A: Put a backslash (<code>\\</code>) infront of it.<br/>'+
								'Q: Why the [censored] does one of my emotes have the wrong image when I post it?<br/>'+
								'A: Because you used an emotion code that is beening used by another emotion.<br/>'+
								'Q: Is there some where I can get/share custom emotion codes?<br/>'+
								'A: Yes, right <a target="_blank" href="http://userscripts.org/topics/57315">here</a>.<br/>'+
								'Q: What should a line look like in the text box?<br/>'+
								'A: Like this:<br/>'+
								'<code style="margin-left:20px;">{"name":"<i>Emote Name</i>","code":"<i>Emote Code</i>", "loc":"<i>Emote URL</i>","size":<i>Emote width (height is scaled to 17 pixles)</i>}</code><br/>'+
								'Q: Can I see a sample?<br/>'+
								'A: Yes.<br/>'+
								'<code style="margin-left:20px;">{ "name": "Domokun", "code": ":domokun:", "loc": "http://public.tektek.org/img/emotes/domokun.gif", "size": 15 }</code>'+
							'</div>'+
						'</div>'+
					'</td>'+
				'</tr>'+
			'</tbody>'+
		'</table>';
	try{
		getId('content-padding').appendChild(div);
	}
	catch(e){
		try{
			getId('gaia_content').appendChild(div);
		}
		catch(e){
			getId('content').appendChild(div);
		}
	}
	getId('imageSizer').href='data:text/html;charset=utf-8,<html><head><script type="text/javascript">function sendChange(){var evt=document.createEvent("HTMLEvents");evt.initEvent(\'change\',true,true);document.getElementById(\'width\').dispatchEvent(evt);}</script></head><body>Image URL:<input size="100" title="Link to picture goes here" onblur="document.getElementById(\'img\').style.backgroundImage=\'url(\'+this.value+\')\'" type="text"/><br/>Width:<input size="3" title="A number goes here" onchange="document.getElementById(\'img\').style.width=this.value+\'px\';" value="15" id="width" type="text"/><input onclick="document.getElementById(\'width\').value--;sendChange()" type="button" value="-"/><input type="button" onclick="document.getElementById(\'width\').value++;sendChange()" value="+"/><br/><div id="img" style="height:17px;-moz-background-size:contain;background-size:contain;background-repeat:no-repeat;width:15px;"></div></body></html>';
	var box=getId('customEmoteJSON');
	box.value=GM_getValue('emotes','[{"name":"I ? Firefox","code":":i<3ff:","loc":"http://i251.photobucket.com/albums/gg311/OoTLink/1523015719438d778f7ac51.gif","size":41}]').slice(1,-1).replace(/},/g,'}\n');
	var h=window.innerHeight;
	var eles=box.parentNode.parentNode.parentNode.childNodes;
	for(var i=0;i<eles.length;i++){
		if(i!=1&&i!=eles.length-1){
			h-=eles[i].offsetHeight;
		}
		else if(i!=1){
			h-=eles[i].childNodes[0].childNodes[0].offsetHeight;
		}
	}
	box.style.height=h+'px';
	getId('GM_EMOTE_ADD').addEventListener('click',function(){
		try{
			var emotes=box.value;
			try{
				if(emotes.charAt(0)!='['&&emotes.charAt(objectsCount(emotes)-1)!=']'){
					emotes=JSON.parse('['+emotes+']');
				}
				else{
					emotes=JSON.parse(emotes);
				}
			}
			catch(e){
				emotes=JSON.parse('['+emotes.replace(/\n/g,',')+']');
			}
			emotes[objectsCount(emotes)]={"name":prompt('What is the emotion\'s name?'),"code":prompt('What is the emotion\'s code?'),"loc":prompt('What is the emotion\'s web addess (URL)?'),"size":Number(prompt('What is the emotion\'s width?'))};
			box.value=JSON.stringify(emotes).replace(/},/g,'}\n').slice(1,-1);
		}
		catch(e){
			alert('The current code is not in an acceptable foramt.\nHint: Look for something out of place.');
		}

	},false);
	getId('GM_EMOTE_SAVE').addEventListener('click',function(){
		try{
			var emotes=JSON.stringify(JSON.parse(box.value));
		}
		catch(e){
			var emotes=box.value.replace(/\n/g,',');
		}
		try{
			if(emotes.charAt(0)!='['&&emotes.charAt(emotes.length-1)!=']'){
				var x=JSON.parse('['+emotes+']');
			}
			else{
				var x=JSON.parse(emotes);
			}
			for(var i in x){
				if(!x[i]["size"]||!x[i]["name"]||!x[i]["loc"]||!x[i]["code"]){
					alert('Unable to save emotions.\nCustom emotion '+(i+1)+' is missing something.'+((objectsCount(x[i])==4)?'\nProbally a typo.':''));
					throw new Error(i);
				}
			}
			GM_setValue('emotes',JSON.stringify(x));
			var e=getId('emoticons');
			if(typeof unsafeWindow.YAHOO.gaia.Emotes!='object'){
				var eles=e.getElementsByClassName('customEmote');
				for(var i=eles.length-1;i>-1;i--){
					e.removeChild(eles[i]);
				}
			}
			var moded=false;
			var text=textBox.value;
			for(var i in json3){
				var str=json3[i]["code"];
				if(text.indexOf(str)!=-1){
					moded=true;
					str=str2regExStr(str);
					var regEx=new RegExp(str,'g');
					text=text.replace(regEx,'[img]'+json3[i]["loc"]+'[/img]');
				}
			}
			json3=x;
			for(var i in json3){
				var str='[img]'+json3[i]["loc"]+'[/img]';
				if(text.indexOf(str)!=-1){
					moded=true;
					str='\\[img\\]'+str2regExStr(json3[i]["loc"])+'\\[\\/img\\]';
					text=text.replace(new RegExp(str,'g'),json3[i]["code"]);
				}
			}
			if(moded){
				textBox.value=text;
			}
			insertStandardEmoticons(e,m,2);
			sendEvent(getId('GM_EMOTE_CANCEL'),'click');
		}
		catch(e){
			e=e.toString().substr(7);
			if(e!=Number(e)){
				alert('Unable to save emotions.\nThere is an error in your code.\nRead the FAQs for help.');
			}
		}
	},false);
}
function imgCode2EmoteCode(textBox){
	var moded=false;
	var formats=getFormats();
	if(formats){
		if(loc.indexOf('/forum/compose/')!=-1||(loc.indexOf('/forum/')!=-1&&loc.indexOf('/t.')!=-1)){
			var type='FF';
		}
		else if(loc.indexOf('/guilds/posting.php')!=-1){
			var type='GF';
		}
		else if(loc.indexOf('/profile/privmsg.php')!=-1){
			var type='PM';
		}
		else if(loc.indexOf('/j/')!=-1||loc.indexOf('/journal/')!=-1){
			var type='JC';
		}
		else{
			var type='PC';
		}
		var text=stripFormat(formats['auto'][type],textBox);
		moded=true;
	}
	else{
		var text=textBox.value;
	}
	for(var i in json){
		var str='[img]http://public.tektek.org/img/emotes/'+json[i]["loc"]+'.gif[/img]';
		if(text.indexOf(str)!=-1){
			moded=true;
			str='\\[img\\]http:\\/\\/public.tektek.org\\/img\\/emotes\\/'+json[i]["loc"]+'.gif\\[\\/img\\]';
			text=text.replace(new RegExp(str,'g'),json[i]["code"]);
		}
	}
	if(gArch){
		tmp=gArchEmoteConversion(text,1);
		if(tmp!=text){
			text=tmp;
			moded=true;
		}
	}
	for(var i in json3){
		var str='[img]'+json3[i]["loc"]+'[/img]';
		if(text.indexOf(str)!=-1){
			moded=true;
			str='\\[img\\]'+str2regExStr(json3[i]["loc"])+'\\[\\/img\\]';
			text=text.replace(new RegExp(str,'g'),json3[i]["code"]);
		}
	}
	if(moded){
		textBox.value=text;
	}
	return;
}
function emoteCode2ImgCode(form,textBox,e){
	form.addEventListener(e,function(){
		moded=false;
		var formats=getFormats();
		if(formats){
			if(loc.indexOf('/forum/compose/')!=-1 || (loc.indexOf('/forum/')!=-1&&loc.indexOf('/t.')!=-1)){
				var type='FF';
			}
			else if(loc.indexOf('/guilds/posting.php')!=-1){
				var type='GF';
			}
			else if(loc.indexOf('/profile/privmsg.php')!=-1){
				var type='PM';
			}
			else if(loc.indexOf('/j/')!=-1||loc.indexOf('/journal/')!=-1){
				var type='JC';
			}
			else{
				var type='PC';
			}
			var text=autoFormat(formats['auto'][type],textBox,false);
			moded=true;
		}
		else{
			var text=textBox.value;
		}
		for(var i in json){
			var str=json[i]["code"];
			if(text.indexOf(str)!=-1){
				moded=true;
				str=str2regExStr(str);
				var regEx=new RegExp(str,'g');
				text=text.replace(regEx,'[img]http://public.tektek.org/img/emotes/'+json[i]["loc"]+'.gif[/img]');
			}
		}
		if(gArch){
			var tmp=gArchEmoteConversion(text,2);
			if(tmp!=text){
				text=tmp;
				moded=true;
			}
		}
		for(var i in json3){
			var str=json3[i]["code"];
			if(text.indexOf(str)!=-1){
				moded=true;
				str=str2regExStr(str);
				var regEx=new RegExp(str,'g');
				text=text.replace(regEx,'[img]'+json3[i]["loc"]+'[/img]');
			}
		}
		if(moded){
			textBox.value=text;
		}
	},false);
}
function gArchEmoteConversion(text,mode){
	if(mode==2){
		for(var i in json2){
			var str=json2[i]["code"];
			if(text.indexOf(str)!=-1){
				str=str2regExStr(str);
				var regEx=new RegExp(str,'g');
				text=text.replace(regEx,'[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]["loc"]+'[/img]');
			}
		}
	}
	else{
		for(var i in json2){
			var str='[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]["loc"]+'[/img]';
			if(text.indexOf(str)!=-1){
				str='\\[img\\]http:\\/\\/i5.photobucket.com\\/albums\\/y176\\/absobloodylutely\\/'+json2[i]["loc"]+'\\[\\/img\\]';
				text=text.replace(new RegExp(str,'g'),json2[i]["code"]);
			}
			str='[img]http://gaiarch.gaiatools.com/emotes/'+json2[i]["loc"]+'[/img]';
			if(text.indexOf(str)!=-1){
				str='\\[img\\]http:\\/\\/gaiarch.gaiatools.com\\/emotes\\/'+json2[i]["loc"]+'\\[\\/img\\]';
				text=text.replace(new RegExp(str,'g'),json2[i]["code"]);
			}
		}
	}
	return text;
}
function insertScript(){
	var script=document.createElement('script');
	script.type="text/javascript";// got this function from http://s.cdn.gaiaonline.com/src/bbcode_editor-rev2.js made minor adjustments
	script.src='data:text/javascript;charset=utf-8,function emoticon2(text){var txtarea=document.getElementsByClassName("bbcodable")[0];if(!txtarea){var txtarea=document.getElementById("qr_text");};if(txtarea.createTextRange&&txtarea.caretPos){var caretPos=txtarea.caretPos;caretPos.text=caretPos.text.charAt(caretPos.text.length-1)===" "?caretPos.text+text+(" "):caretPos.text+text;txtarea.focus();}else{txtarea.value+=text;txtarea.focus();}return false;}';
	getTag('head').appendChild(script);
}
function insertEmoteStuff(){
	GM_addStyle('#emoticons {margin:0;padding4px 0 0 0;list-style:none;}#emoticons li{margin-bottom:4px;margin-right:6px;float:left;list-style:none;}#emoticons li a {display:block;text-decoration:none;width:15px;height:17px;border:0;overflow:hidden;background:url(http://public.tektek.org/img/emotes/ic_emote_sprite.gif) left top no-repeat;text-indent:-5000em;}#emoticons .biggrin {background-position:-315px;}#emoticons .smile {background-position:-330px;}#emoticons .embarassed {background:url(http://public.tektek.org/img/emotes/icon_redface.gif) left top no-repeat;}#emoticons .crying {background:url(http://public.tektek.org/img/emotes/icon_crying.gif) left top no-repeat;}#emoticons .stare {background-position:-195px;}#emoticons .xd {background-position:-285px;}#emoticons .nodding {background:url(http://public.tektek.org/img/emotes/icon_nodding.gif) left top no-repeat;}#emoticons .biglaugh {background-position:-405px;}#emoticons .gonk {background-position:-135px;}#emoticons .scream {background-position:-90px;}#emoticons .stressed {background-position:-120px;}#emoticons .sweat {background:url(http://public.tektek.org/img/emotes/icon_sweatdrop.gif) left top no-repeat;}#emoticons .heart {background:url(http://public.tektek.org/img/emotes/icon_heart.gif) left top no-repeat;}#emoticons .domokun {background:url(http://public.tektek.org/img/emotes/icon_domokun.gif) left top no-repeat;}#emoticons .xp {background-position:-150px;}#emoticons .whee {background-position:-345px;}#emoticons .wink {background-position:-375px;}#emoticons .sad {background-position:-165px;}#emoticons .surprised {background-position:-300px;}#emoticons .shocked {background-position:-210px;}#emoticons .confused {background-position:-225px;}#emoticons .cool {background-position:-390px;}#emoticons .laughing {background:url(http://public.tektek.org/img/emotes/icon_lol.gif) left top no-repeat;}#emoticons .mad {background-position:-105px;}#emoticons .razz {background-position:-420px;}#emoticons .verysad {background:url(http://public.tektek.org/img/emotes/icon_verysad.gif) left top no-repeat;}#emoticons .evil {background-position:-75px;}#emoticons .twisted {background-position:-60px;}#emoticons .rolleyes {background:url(http://public.tektek.org/img/emotes/icon_rolleyes.gif) left top no-repeat;}#emoticons .exclaim {background-position:-15px;}#emoticons .question {background-position:-435px;}#emoticons .idea {background-position:0;}#emoticons .arrow {background-position:-30px;}#emoticons .neutral {background-position:-240px;}#emoticons .mrgreen {background-position:-270px;}#emoticons .ninja {background:url(http://public.tektek.org/img/emotes/icon_ninja.gif) left top no-repeat;}#emoticons .cutelaugh {background-position:-255px;}#emoticons .rofl {background:url(http://public.tektek.org/img/emotes/icon_rofl.gif) left top no-repeat;}#emoticons .pirate {background:url(http://public.tektek.org/img/emotes/icon_pirate.gif) left top no-repeat;}#emoticons .talk2hand {background:url(http://public.tektek.org/img/emotes/icon_talk2hand.gif) left top no-repeat;}#emoticons .burning {background:url(http://public.tektek.org/img/emotes/icon_burning.gif) left top no-repeat;}#emoticons .cheese {background:url(http://public.tektek.org/img/emotes/icon_cheese.gif) left top no-repeat;}#emoticons .dramallama {background:url(http://public.tektek.org/img/emotes/icon_dramallama.gif) left top no-repeat;}#emoticons .wahmbulance {background:url(http://public.tektek.org/img/emotes/icon_wahmbulance.gif) left top no-repeat;}#emoticons .emo {background:url(http://public.tektek.org/img/emotes/icon_emo.gif) left top no-repeat;}');
	GM_addStyle('#emoticons .cat_biggrin{background:url(/images/common/cat_smilies/icon_biggrin.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_smile{background:url(/images/common/cat_smilies/icon_smile.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_embarassed{background:url(/images/common/cat_smilies/icon_redface.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_crying{background:url(/images/common/cat_smilies/icon_crying.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_stare{background:url(/images/common/cat_smilies/icon_stare.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_xd{background:url(/images/common/cat_smilies/icon_xd.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_nodding{background:url(/images/common/cat_smilies/icon_nodding.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_biglaugh{background:url(/images/common/cat_smilies/icon_blaugh.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_gonk{background:url(/images/common/cat_smilies/icon_gonk.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_scream{background:url(/images/common/cat_smilies/icon_scream.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_stressed{background:url(/images/common/cat_smilies/icon_stressed.gif)no-repeat;width:19px;height:19px;}#emoticons .cat_sweat{background:url(/images/common/cat_smilies/icon_sweatdrop.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_heart{background:url(/images/common/cat_smilies/icon_heart.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_domokun{background:url(/images/common/cat_smilies/icon_domokun.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_xp{background:url(/images/common/cat_smilies/icon_xp.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_whee{background:url(/images/common/cat_smilies/icon_whee.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_wink{background:url(/images/common/cat_smilies/icon_wink.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_sad{background:url(/images/common/cat_smilies/icon_sad.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_surprised{background:url(/images/common/cat_smilies/icon_surprised.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_shocked{background:url(/images/common/cat_smilies/icon_eek.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_confused{background:url(/images/common/cat_smilies/icon_confused.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_cool{background:url(/images/common/cat_smilies/icon_cool.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_laughing{background:url(/images/common/cat_smilies/icon_lol.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_mad{background:url(/images/common/cat_smilies/icon_mad.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_razz{background:url(/images/common/cat_smilies/icon_razz.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_verysad{background:url(/images/common/cat_smilies/icon_cry.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_evil{background:url(/images/common/cat_smilies/icon_evil.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_twisted{background:url(/images/common/cat_smilies/icon_twisted.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_rolleyes{background:url(/images/common/cat_smilies/icon_rolleyes.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_exclaim{background:url(/images/common/cat_smilies/icon_exclaim.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_question{background:url(/images/common/cat_smilies/icon_question.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_idea{background:url(/images/common/cat_smilies/icon_idea.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_arrow{background:url(/images/common/cat_smilies/icon_arrow.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_neutral{background:url(/images/common/cat_smilies/icon_neutral.gif)no-repeat;width:19px;height:19px;}#emoticons .cat_mrgreen{background:url(/images/common/cat_smilies/icon_mrgreen.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_ninja{background:url(/images/common/cat_smilies/icon_ninja.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_cutelaugh{background:url(/images/common/cat_smilies/icon_4laugh.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_rofl{background:url(/images/common/cat_smilies/icon_rofl.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_pirate{background:url(/images/common/cat_smilies/icon_pirate.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_talk2hand{background:url(/images/common/cat_smilies/icon_talk2hand.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_burning{background:url(/images/common/cat_smilies/icon_burning.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_cheese{background:url(/images/common/cat_smilies/icon_cheese.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_dramallama{background:url(/images/common/cat_smilies/icon_dramallama.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_wahmbulance{background:url(/images/common/cat_smilies/icon_wahmbulance.gif) no-repeat;width:19px;height:19px;}#emoticons .cat_emo{background:url(/images/common/cat_smilies/icon_emo.gif) no-repeat;width:19px;height:19px;}#emoticons .yum_burger{background:url(/images/common/yummy_smilies/icon_burger.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_cupcake{background:url(/images/common/yummy_smilies/icon_cupcake.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_donut{background:url(/images/common/yummy_smilies/icon_donut.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_hotdog{background:url(/images/common/yummy_smilies/icon_hotdog.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_onigiri{background:url(/images/common/yummy_smilies/icon_onigiri.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_pie{background:url(/images/common/yummy_smilies/icon_pie.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_pizza{background:url(/images/common/yummy_smilies/icon_pizza.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_puddi{background:url(/images/common/yummy_smilies/icon_puddi.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_strawberry{background:url(/images/common/yummy_smilies/icon_strawberry.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_tea{background:url(/images/common/yummy_smilies/icon_tea.gif) left top no-repeat;width:19px;height:19px;}#emoticons .yum_bacon{background:url(/images/common/yummy_smilies/icon_bacon.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_coldone{background:url(/images/common/yummy_smilies/icon_coldone.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_icecreampie{background:url(/images/common/yummy_smilies/icon_creampie.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_pumpkinpie{background:url(/images/common/yummy_smilies/icon_pumpkinpie.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_salmon{background:url(/images/common/yummy_smilies/icon_salmon.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_sausage{background:url(/images/common/yummy_smilies/icon_sausage.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_shrimp{background:url(/images/common/yummy_smilies/icon_shrimp.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_strawberrypie{background:url(/images/common/yummy_smilies/icon_strawberrypie.png) left top no-repeat;font-size:19px;}#emoticons .yum_tamago{background:url(/images/common/yummy_smilies/icon_tamago.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_tuna{background:url(/images/common/yummy_smilies/icon_tuna.png) left top no-repeat;width:19px;height:19px;}#emoticons .yum_wasabipie{background:url(/images/common/yummy_smilies/icon_wasabipie.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_awesomeface{background:url(/images/common/emotion_smilies/icon_awesomeface.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_dealwithit{background:url(/images/common/emotion_smilies/icon_dealwithit.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_facepalm{background:url(/images/common/emotion_smilies/icon_facepalm.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_bigheart{background:url(/images/common/emotion_smilies/icon_heart.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_jawdrop{background:url(/images/common/emotion_smilies/icon_jawdrop.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_kirakira{background:url(/images/common/emotion_smilies/icon_kirakira.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_omnomnom{background:url(/images/common/emotion_smilies/icon_omnomnom.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_puke{background:url(/images/common/emotion_smilies/icon_puke.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_sweatdrop{background:url(/images/common/emotion_smilies/icon_sweatdrop.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_bigvein{background:url(/images/common/emotion_smilies/icon_vein.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_yatta{background:url(/images/common/emotion_smilies/icon_yatta.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_0A0{background:url(/images/common/emotion_smilies/icon_0A0.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_8c{background:url(/images/common/emotion_smilies/icon_8C.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_bandaid{background:url(/images/common/emotion_smilies/icon_bandaid.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_brofist{background:url(/images/common/emotion_smilies/icon_brofist.gif) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_c8{background:url(/images/common/emotion_smilies/icon_C8.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_donotwant{background:url(/images/common/emotion_smilies/icon_donotwant.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_dowant{background:url(/images/common/emotion_smilies/icon_dowant.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_drool{background:url(/images/common/emotion_smilies/icon_drool.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_eyebrow{background:url(/images/common/emotion_smilies/icon_eyebrow.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_hug{background:url(/images/common/emotion_smilies/icon_hug.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_zombie{background:url(/images/common/emotion_smilies/icon_zombie.png) left top no-repeat;width:19px;height:19px;}#emoticons .emotion_zzz{background:url(/images/common/emotion_smilies/icon_zzz.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_angelleft{background:url(/images/common/gaia_smilies/icon_angelicwing_left.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_angelright{background:url(/images/common/gaia_smilies/icon_angelicwing_right.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_crown{background:url(/images/common/gaia_smilies/icon_crown.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_gaiagold{background:url(/images/common/gaia_smilies/icon_gaiagold.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_nitemareleft{background:url(/images/common/gaia_smilies/icon_nitemarewing_left.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_nitemareright{background:url(/images/common/gaia_smilies/icon_nitemarewing_right.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_spoons{background:url(/images/common/gaia_smilies/icon_spoons.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_star{background:url(/images/common/gaia_smilies/icon_star.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_kittenstar{background:url(/images/common/gaia_smilies/icon_starkitten.gif) left top no-repeat;width:19px;height:19px;}#emoticons .gaia_diamond{background:url(/images/common/gaia_smilies/icon_diamond.png) left top no-repeat;width:19px;height:19px;}');
	var emotes='';
	for(var i in json4){
		emotes+='<li><a title="'+json4[i]['text']+' - '+json4[i]['code']+'" class="emoticon '+json4[i]['class']+'" href="#" onclick="emoticon2(this.title.slice(this.title.indexOf(\' - \')+3));return false;">'+json4[i]['text']+'</a></li>';
	}
	if(emote5){
		for(var i in json5){
			emotes+='<li class="catsPlus"><a title="'+json5[i]['text']+' - '+json5[i]['code']+'" class="emoticon '+json5[i]['class']+'" href="#" onclick="emoticon2(this.title.slice(this.title.indexOf(\' - \')+3));return false;">'+json5[i]['text']+'</a></li>';
		}
	}
	return '<ul id="emoticons">'+emotes+'</ul>';
}
function insertStandardEmoticons(ele,m,s){
	var tek=[],cust=[],css='#editor #emoticons.tektek li a,#editor #emoticons.gaiarch li a,#editor #emoticons.custom li a{background-repeat:no-repeat;background-position:center center;}#editor #emoticons.gaiarch li a,#editor #emoticons.custom li a{-moz-background-size:contain;background-size:contain;-webkit-background-size:contain;}',sizes=[];
	if(s==1){
		for(var i in json){
			if(m==4||m==3){
				var li=document.createElement('li');
				li.className='tektekEmote';
				li.innerHTML='<a '+((m==2||m==3||m==4)?'onclick="return emoticon2(\''+((m==3)?'[img]http://public.tektek.org/img/emotes/'+json[i]['loc']+'.gif[/img]':json[i]['code'])+'\')"':'rel="emoticon-control"')+' title="'+json[i]['name']+' - '+((m==0||m==3||m==4)?json[i]['code']:'[img]http://public.tektek.org/img/emotes/'+json[i]['loc']+'.gif[/img]')+'" style="background-image:url(\'http://public.tektek.org/img/emotes/'+json[i]['menuloc']+'.gif\');width:'+json[i]['size']+'px" href="#"></a>';
				ele.appendChild(li);
			}
			else{
				tek.push({"text":json[i]["name"],"code":json[i]["code"],"class":json[i]["menuloc"]});
				css+="#editor #emoticons.tektek ."+json[i]["menuloc"]+"{background-image:url('http://public.tektek.org/img/emotes/"+json[i]["menuloc"]+".gif');width:"+json[i]["size"]+"px;}";
			}
		}
		if(m!=4&&m!=3){
			unsafeWindow.YAHOO.gaia.Emotes["Tektek"]=tek;
		}
		if(gArch){
			css+=insertGaiArchEmote(ele,2,m);
		}
	}
	for(var i in json3){
		if(m==4||m==3){
			var li=document.createElement('li');
			li.className='customEmote';
			li.innerHTML='<a '+((m==2||m==3||m==4)?'onclick="return emoticon2(\''+((m==3)?'[img]'+json3[i]['loc']+'[/img]':json3[i]['code'])+'\')"':'rel="emoticon-control"')+' title="'+json3[i]['name']+' - '+((m==0||m==3||m==4)?json3[i]['code']:'[img]'+json[i]['loc']+'[/img]')+'" style="-moz-background-size:contain;background-size:contain;background-image:url(\''+json3[i]['loc']+'\');width:'+json3[i]['size']+'px" href="#"></a>';
			ele.appendChild(li);
		}
		else{
			var name="emote-"+json3[i]["loc"].slice(json3[i]["loc"].lastIndexOf('/')+1,json3[i]["loc"].lastIndexOf('.'));
			cust.push({"text":json3[i]["name"],"code":json3[i]["code"],"class":name});
			css+="#editor #emoticons.custom ."+name+"{background-image:url('"+json3[i]["loc"]+"');width:"+json3[i]["size"]+"px;}";
		}
	}
	if(m!=4&&m!=3){
		if(s==2&&cust.length==0){
			delete(unsafeWindow.YAHOO.gaia.Emotes["Custom"]);
		}
		else if(cust.length>0){
			unsafeWindow.YAHOO.gaia.Emotes["Custom"]=cust;
		}
		GM_addStyle(css);
		if(s==2){
			var e=getId('emoticon_set');
			if(e.value=="Custom"){
				if(cust.length==0){
					e.selectedIndex=0;
				}
				sendEvent(getId('emoticon_set'),"change");
			}
		}
		unsafeWindow.YAHOO.gaia.Emotes.reload();
	}
}
function insertGaiArchEmote(ele,mode,m){
	var q=getId('qr_container');
	var html="";
	if(q){
		q.className='gArch';
	}
	var arch=[],css='';
	for(var i in json2){
		if(!q&&m!=3){
			var name="emote-"+json2[i]['loc'].substr(0,json2[i]['loc'].indexOf('.'));// class names apparently do not work in css if they start with numbers O.o
			arch.push({"text":json2[i]['name'],"class":name,"code":json2[i]["code"]});
			css+="#editor #emoticons.gaiarch ."+name+"{background-image:url('http://i5.photobucket.com/albums/y176/absobloodylutely/"+json2[i]["loc"]+"');width:"+json2[i]["size"]+"px;}";
		}
		else{
			var li=document.createElement('li');
			li.className='gArchEmote';
			li.innerHTML='<a '+((m==2||m==3||m==4)?'onclick="return emoticon2(\''+((m==3)?'[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'[/img]':json2[i]['code'])+'\')"':'rel="emoticon-control"')+' title="'+json2[i]['name']+' - '+((m==0||m==3||m==4)?json2[i]['code']:'[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'[/img]')+'" style="-moz-background-size:contain;background-size:contain;-webkit-background-size:contain;background-repeat:no-repeat;background-image:url(\'http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'\');width:'+json2[i]['size']+'px" href="#"></a>';
			ele.appendChild(li);
			//html+='<a '+((m==2||m==3||m==4)?'onclick="return emoticon2(\''+((m==3)?'[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'[/img]':json2[i]['code'])+'\')"':'rel="emoticon-control"')+' title="'+json2[i]['name']+' - '+((m==0||m==3||m==4)?json2[i]['code']:'[img]http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'[/img]')+'" style="-moz-background-size:contain;background-size:contain;-webkit-background-size:contain;background-repeat:no-repeat;background-image:url(\'http://i5.photobucket.com/albums/y176/absobloodylutely/'+json2[i]['loc']+'\');width:'+json2[i]['size']+'px" href="#"></a>';
		}
	}
	if(!q&&m!=3){
		unsafeWindow.YAHOO.gaia.Emotes["GaiArch"]=arch;
		if(mode==0&&m==0){
			unsafeWindow.YAHOO.gaia.Emotes.reload();
			GM_addStyle(css);
		}
		else{
			return css;
		}
	}
}

/* My mod of Mindset's code http://userscripts.org/scripts/review/84591 */
function preview(){//this function has had a code over haul
	var thread = loc.substring(loc.lastIndexOf(".")+1,loc.lastIndexOf("/"));
	if (thread.indexOf("_") != -1 ){
		thread = thread.substring(0,thread.lastIndexOf("_"));
	}
	var ele=document.createElement('form');
	ele.style.display='none';
	ele.setAttribute('action','/forum/compose/entry/new/'+thread+'/');
	ele.setAttribute('method','post');
	ele.innerHTML='<textarea name="message">'+getId('qr_text').value+'</textarea><input type="text" value="preview" name="action_preview"/>';
	document.body.appendChild(ele);
	emoteCode2ImgCode(ele,ele.childNodes[0],'submit');
	sendEvent(ele,'submit');// WTF ele.submit() does not trigger event
}
function importMindsets_QuickReplyExtra(){
	var previewButton = document.createElement('a');
	previewButton.href="javascript:{}";
	previewButton.id="qr_preview";
	previewButton.className="cta-button-sm gray-button";
	previewButton.setAttribute('tabindex',"4");
	previewButton.setAttribute('style','float: right; margin: 10px 15px 0 0;');
	previewButton.innerHTML='<span class="button_text">Preview</span>';
	var formatbar=document.createElement('div');
	formatbar.id='editor';
	formatbar.innerHTML='<div id="format_controls"><ul class="format-text"><li><a href="javascript:{}" id="format-bold" class="bold" title="Bold text - [b][/b]">Bold text</a></li><li><a href="javascript:{}" id="format-italics" class="italics" title="Italicize text - [i][/i]">Italicize text</a></li><li><a href="javascript:{}" id="format-underline" class="underline" title="Underline text - [u][/u]">Underline text</a></li><li><a href="javascript:{}" id="format-strike" class="strike" title="Strike text - [strike][/strike]">Strike text</a></li></ul><ul class="format-elements"><li><a href="javascript:{}" id="format-quote" class="quote" title="Quote - [quote][/quote]">Quote</a></li><li><a href="javascript:{}" id="format-code" class="code" title="Code - [code][/code]">Code</a></li></ul><ul class="format-links"><li><a href="javascript:{}" id="format-url" class="url" title="Add URL - [url=http://restofurl]Webpage Title[/url]">Add URL</a></li><li><a href="javascript:{}" id="format-image" class="image" title="Add image - [img]http://restofurl[/img]">Add Image</a></li></ul></div>';
	var ele=getId("qr_submit");
	ele.parentNode.insertBefore(previewButton,ele.nextSibling);
	ele=getId("qr_text");
	ele.parentNode.insertBefore(formatbar,ele);
	previewButton.addEventListener('click',preview,false);
	getId("format-bold").addEventListener('click',function(){format("b");},false);
	getId("format-italics").addEventListener('click',function(){format("i");},false);
	getId("format-underline").addEventListener('click',function(){format("u");},false);
	getId("format-strike").addEventListener('click',function(){format("strike");},false);
	getId("format-quote").addEventListener('click',function(){format("quote");},false);
	getId("format-code").addEventListener('click',function(){format("code");},false);
	getId("format-url").addEventListener('click',insert_link,false);
	getId("format-image").addEventListener('click',insert_img,false);
	GM_addStyle("/* FORMAT TOOLS */ \n\
		#editor #format_controls {padding:13px 8px 0 0;} \n\
		#editor #format_controls ul{margin:0 20px 0 0;} \n\
		/* The buttons have an on/off state and use a sprite to save on http requests */ \n\
		#editor #format_controls li {float:left;margin-right:2px;list-style-type:none;} \n\
		#editor #format_controls li a { height:19px; width:23px; display:block; \n\
		background:url(/src/js/gaia/widgets/editor/btn_editor_toolbar_new.gif) no-repeat; \n\
		text-indent:-9999em; overflow:hidden; line-height:100%; padding: 0; } \n\
		#editor #format_controls #format-bold{background-position:left 0;width:23px;} \n\
		#editor #format_controls #format-bold:hover{background-position:left bottom;} \n\
		#editor #format_controls #format-italics{background-position:-23px 0;} \n\
		#editor #format_controls #format-italics:hover{background-position:-23px bottom;} \n\
		#editor #format_controls #format-underline{background-position:-46px 0;} \n\
		#editor #format_controls #format-underline:hover{background-position:-46px bottom;} \n\
		#editor #format_controls #format-strike{background-position:-69px 0;} \n\
		#editor #format_controls #format-strike:hover{background-position:-69px bottom;} \n\
		#editor #format_controls #format-quote{background-position:-220px 0;width:43px;} \n\
		#editor #format_controls #format-quote:hover{background-position:-220px bottom;} \n\
		#editor #format_controls #format-code{background-position:-263px 0;width:36px;} \n\
		#editor #format_controls #format-code:hover{background-position:-263px bottom;} \n\
		#editor #format_controls #format-url{background-position:-299px 0;width:36px;} \n\
		#editor #format_controls #format-url:hover{background-position:-299px bottom;} \n\
		#editor #format_controls #format-image{background-position:-335px 0;width:36px;} \n\
		#editor #format_controls #format-image:hover{background-position:-335px bottom;} \n\
	");
}
function format(tag){ // insert format tags
	if(typeof textBox.selectionStart != "undefined"){
		var before, after, selection;
		before = textBox.value.substring(0, textBox.selectionStart);
		str = textBox.value.substring(textBox.selectionStart, textBox.selectionEnd);
		after = textBox.value.substring(textBox.selectionEnd, textBox.value.length);
		textBox.value = String.concat(before, "[" + tag + "]", str, "[/" + tag + "]", after);
	}
	textBox.focus();
}
function insert_link(){ // insert a link
	var link = prompt("Enter your URL","http://");
	var title;
	if(link != null){
		if(typeof textBox.selectionStart != "undefined"){
			var before, after, selection;
			before = textBox.value.substring(0, textBox.selectionStart);
			str = textBox.value.substring(textBox.selectionStart, textBox.selectionEnd);
			after = textBox.value.substring(textBox.selectionEnd, textBox.value.length);
			if (!str){ // no text selected
				title = prompt("Enter the webpage title","Webpage Title");
			}
			else{
				title = prompt("Enter the webpage title",str);
			}
			var newstr = "[url=" + link + "]" + title + "[/url]";
			textBox.value = String.concat(before, newstr, after);
		}
	}
	textBox.focus();
}
function insert_img(){ // insert an image
	var image = prompt("Enter your image URL","http://");
	if(image != null){
		if(typeof textBox.selectionStart != "undefined"){ //all other browsers
			var before, after, selection;
			before = textBox.value.substring(0, textBox.selectionStart);
			str = textBox.value.substring(textBox.selectionStart, textBox.selectionEnd);
			after = textBox.value.substring(textBox.selectionEnd, textBox.value.length);
			var newstr = "[img]" + image + "[/img] " + str;
			textBox.value = String.concat(before, newstr, after);
		}
	}
	textBox.focus();
}
/* end Mindset's code */
var source,m,loc;
loc=document.location.href;
if(loc.indexOf('/forum/compose/')!=-1||loc.indexOf('/profile/privmsg.php')!=-1){
	source=1;
	m=0;
}
else if(loc.indexOf('/guilds/posting.php')!=-1||loc.indexOf('/j/')!=-1||loc.indexOf('/journal/')!=-1){
	source=2;
	m=0;
}
else if((loc.indexOf('/profiles/')!=-1||loc.indexOf('/p/')!=-1||loc.indexOf('/profiles?')!=-1||loc.indexOf('/p?')!=-1)&&loc.indexOf('mode=addcomment')!=-1){
	source=3;
	m=0;
}
else{
	source=-1;
	m=(loc.indexOf('account/signature')!=-1)?1:0;
}
var textBox=getClass('bbcodable');
if(textBox){
	GM_addStyle('#editor ul#emoticons{width:100%!important;}#editor.scroll #emoticons{height:auto;max-height:84px;overflow-y:auto;}#editor #format_controls .emotion-editor{position:absolute;top:8px;right:-15px;}#editor #format_controls .emotion-editor a{background-position:-545px 0}#editor #format_controls .emotion-editor a:hover{background-position:-545px -19px;}#GM_EMOTE_CONFIG code{background-color:lightgray;font-family:monospace;}#gaia_content .admin_content #editor li{margin-left:0;}');
	if(isFF){
		var lb=GM_getValue('lb',true);
		if(source==2){
			var sigs=eval('('+GM_getValue('attachSig','{"guild":true,"journal":false}')+')');
			getName('attach_sig').checked=((loc.indexOf('/guilds/posting.php')!=-1)?sigs['guild']:sigs['journal']);
		}
		else if(source==1){
			if(loc.indexOf('/profile/privmsg.php')!=-1){
				var sigs=eval('('+GM_getValue('attachSig','{"pm":false}')+')');
				getName('attach_sig').checked=sigs['pm'];
			}
		}
		unsafeWindow.YAHOO.util.Event.onAvailable('emoticons', function(){
			textBox.style.marginTop='';
			this.parentNode.style.position='';
			relocate(textBox.parentNode,this.parentNode,textBox);
			insertStandardEmoticons(this,m,1);
			if(source==3){
				this.style.width='75%';
			}
			else if(source==2){//prevent the unstopable growing editor
				textBox.style.maxWidth=textBox.offsetWidth+'px';
			}
			else if(loc.indexOf('guilds/admin/masspm/id.')!=-1){
				this.parentNode.style.marginLeft='73px';
				textBox.style.marginLeft='73px';
				var btn=document.createElement('a');
				btn.innerHTML='<span>Settings</span>';
				btn.setAttribute('onclick','return false;');
				btn.setAttribute('style','margin-left:5px;');
				btn.className='cta-button-sm gray-button';
				btn.href='#';
				getEle('button','name','btn_cancel').parentNode.appendChild(btn);
				btn.addEventListener('click',function(){formatDialog(textBox,loc,-1);},false);
			}
			if(!lb&&(gArch||objectsCount(json3)>0)){
				textBox.previousSibling.className='scroll';
			}
			if(m==1){
				this.addEventListener('click',function(){
					setTimeout(function(){sendEvent(textBox,'keyup');},0);
				},false);
			}
			var ul=document.createElement('ul');
			if(typeof JSON=='object'){
				ul.className='emotion-editor';
				ul.setAttribute('style','position:absolute;top:8px;right:-15px;');
				ul.innerHTML='<li><a href="#" id="GM_customEmotes" title="Custom Emotein Editor">Emotion Editor</a></li>';
				getId('format_controls').appendChild(ul);
				ul.childNodes[0].childNodes[0].addEventListener('click',function(){
					emotionEditorDialog(textBox,m);
				},false);
			}
			getId('emoticon_set').addEventListener('change',function(){
				getId("emoticons").className=this.value.toLowerCase();
			},false);
		},this);
	}
	else{//make google chrome work
		var wm=getId('emoticons');
		textBox.style.marginTop='';
		wm.parentNode.style.position='';
		if(source==3){
			wm.parentNode.style.width='75%';
		}
		relocate(textBox.parentNode,wm.parentNode,textBox);
		insertStandardEmoticons(wm,m,1);
		if(m==1){
			wm.addEventListener('click',function(){
				sendEvent(textBox,'keyup');
			},false);
		}
	}
	var form=textBox.parentNode;
	while(form.tagName!='FORM'){
		form=form.parentNode;
	}
	if(source==3){
		textBox.setAttribute('style','width:75%;margin-right:25%;');
		insertCaseChanger(loc,source,textBox);
		form.setAttribute('style','position:relative;');
	}
	if(source!=-1){
		imgCode2EmoteCode(textBox);
		emoteCode2ImgCode(form,textBox,'submit');
		insertformatButtons(textBox,source,isFF,loc);
		if(source==1||source==2){
			insertCaseChanger(loc,source,textBox);
		}
	}
}
else if(loc.indexOf('/forum/')!=-1&&loc.indexOf('/t.')!=-1){
	source=4;
	insertScript();
	var textBox=getId('qr_text');
	emoteCode2ImgCode(getId('qr_submit'),textBox,'click');
	var backgroundImg=((isFF)?GM_getResourceURL("background"):'http://i48.tinypic.com/2lbj9et.png');
	GM_addStyle('#qr_container{background-position:100px 0;}#tek_stuff li{list-style:none;}#tek_stuff .emotionsHolder>ul{max-height:100%;overflow-y:auto;}#tek_stuff .emotionsHolder{height:130px;}.gArch #tek_stuff .emotionsHolder{height:150px;}a#tekSettings{margin-left:-7px;width:75px;position:relative;top:-15px;left:100px;}div#qr_container form{width:421px;}div#qr_container form #qr_text{width:389px;}div#qr_container{width:700px;}#tekformatbutons .tekformat{margin:3px;cursor:pointer;}div#tek_stuff{width:278px;position:absolute;top:0px;left:414px;height:100%;padding-left:6px;background-image:url(\''+backgroundImg+'\');background-repeat:no-repeat;background-position:top left;}.gArch a#tekSettings{margin-left:0;position:static;}div#qr_container.gArch{width:1000px;}.gArch div#tek_stuff{width:580px;}');
	var div=document.createElement('div');
	div.innerHTML='<div class="emotionsHolder">'+insertEmoteStuff()+'</div><div style="width:100%;text-align:center;margin-top:2px;"></div>';
	div.id="tek_stuff";
	textBox.parentNode.parentNode.appendChild(div);
	insertStandardEmoticons(div.childNodes[0].childNodes[0],source,1);
	insertformatButtons(textBox,source,isFF,loc);
	importMindsets_QuickReplyExtra();
}
else if(loc.indexOf('guilds/admin/masspm/id.')!=-1){
	var btn=document.createElement('a');
	btn.innerHTML='<span>Settings</span>';
	btn.setAttribute('onclick','return false;');
	btn.setAttribute('style','margin-left:5px;');
	btn.className='cta-button-sm gray-button';
	btn.href='#';
	getEle('button','name','btn_cancel').parentNode.appendChild(btn);
	btn.addEventListener('click',function(){formatDialog(textBox,loc,-1);},false);
}
if(source==-1){
	if(m==1){
		if(textBox){
			if(isFF){
				var btn=document.createElement('a');
				btn.innerHTML='<span>Settings</span>';
				btn.setAttribute('onclick','return false;');
				btn.setAttribute('style','margin-left:5px;');
				btn.className='cta-button-sm gray-button';
				btn.href='#';
				form.insertBefore(btn,getEle('button','class','cta-button-sm').nextSibling);
				btn.addEventListener('click',function(){formatDialog(textBox,loc,-1);},false);
				var sigPreview=getId('signature-preview-fieldset');
				var h1=document.createElement('h1');
				h1.textContent='Signature Options';
				sigPreview.parentNode.insertBefore(h1,sigPreview);
				var sigs=eval('('+GM_getValue('attachSig','{"pm":false,"guild":true,"journal":false}')+')');
				var span=document.createElement('span');
				span.innerHTML='<input style="position:relative;top:3px;" type="checkbox"'+(sigs['pm']?' checked="checked"':'')+' id="attach2pms"/> Always attach signature in Private Messages.';
				form.insertBefore(span,sigPreview);
				form.insertBefore(document.createElement('br'),sigPreview);
				var span=document.createElement('span');
				span.innerHTML='<input style="position:relative;top:3px;" type="checkbox"'+(sigs['journal']?' checked="checked"':'')+' id="attach2journals"/> Always attach signature in Journals.';
				form.insertBefore(span,sigPreview);
				form.insertBefore(document.createElement('br'),sigPreview);
				var span=document.createElement('span');
				span.innerHTML='<input style="position:relative;top:3px;" type="checkbox"'+(sigs['guild']?' checked="checked"':'')+' id="attach2guilds"/> Always attach signature in Guilds.';
				form.insertBefore(span,sigPreview);
				form.addEventListener('submit',function(){
					GM_setValue('attachSig','{"pm":'+getId('attach2pms').checked+',"guild":'+getId('attach2guilds').checked+',"journal":'+getId('attach2journals').checked+'}');
				},false);
			}
			insertCaseChanger(loc,-2,textBox);
		}
	}
	else if(loc.indexOf('account/about')!=-1){
		form.setAttribute('style','position:relative;');
		var a=getId('preview_about').parentNode.getElementsByTagName('a')[0];
		emoteCode2ImgCode(a,textBox,'click');
		a.addEventListener('click',function(){
			setTimeout(function(){
				imgCode2EmoteCode(textBox);
			},100);
		},false);
		insertCaseChanger(loc,-2,textBox);
		textBox.style.marginRight='450px';
		imgCode2EmoteCode(textBox);
		emoteCode2ImgCode(form,textBox,'submit');
		if(isFF){
			var btn=document.createElement('a');
			btn.innerHTML='<span class="button_cap"></span><span class="button_text">Add Emoticon!</span>';
			btn.setAttribute('onclick',"return false;");
			btn.setAttribute('style','float:right;');
			btn.className='info_button';
			btn.href='#';
			textBox.parentNode.appendChild(btn);
			btn.addEventListener('click',function(){formatDialog(textBox,loc,-1);},false);
		}
	}
	else if(loc.indexOf('mode=edit')!=-1&&(loc.indexOf('/profiles?')!=-1||loc.indexOf('/profiles/?')!=-1||loc.indexOf('/p/?')!=-1||loc.indexOf('/p?')!=-1)||(loc.indexOf('/profiles/')!=-1&&loc.indexOf('mode=edit')!=-1)){
		textBox=getId('edit_custom_content');
		if(textBox){
			textBox.className='bbcodable';
			insertScript();
			var div=document.createElement('div');
			div.innerHTML='<span>Emotions:</span><br/>'+insertEmoteStuff();
			var a=textBox.parentNode.getElementsByTagName('a')[0];
			GM_addStyle('#emoticons>li{padding:1px;float:left!important;}#emoticons{max-height:82px;overflow-y:auto;}');
			insertStandardEmoticons(div.childNodes[2],3,1);
			textBox.parentNode.appendChild(div);
			getId('emoticons').addEventListener('click',function(){
				sendEvent(textBox,'change');
			},false);
		}
	}
}