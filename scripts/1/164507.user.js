// ==UserScript==
// @name		Enworld Prefixfixer
// @author		Nytmare
// @description	Replaces fancy Enworld thread prefix images with plain old boring text.
// @include		http://www.enworld.org/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant		GM_addStyle
// @version		1.2	
// @thankyou		SciFiWiz and Brock Adams!
// ==/UserScript==



// ================= The many flavors of D&D =================

var alldndImg = $("img[src*='smilies/alldnd.jpg']");
alldndImg.replaceWith ("<b><font color=#FF9900>[ALL D&D]</font></b>");

var dndredImg = $("img[src*='smilies/dndred.jpg']");
dndredImg.replaceWith ("<b><font color=#FF9900>[OD&D/BECMI]</font></b>");

var adndImg = $("img[src*='smilies/1e.jpg']");
adndImg.replaceWith ("<b><font color=#FF9900>[AD&D 1E]</font></b>");

var adndtwoImg = $("img[src*='smilies/2e.jpg']");
adndtwoImg.replaceWith ("<b><font color=#FF9900>[AD&D 2E]</font></b>");

var thirdImg = $("img[src*='smilies/3.5.jpg']");
thirdImg.replaceWith ("<b><font color=#FF9900>[3/3.5]</font></b>");

var ddImg = $("img[src*='smilies/dd.jpg']");
ddImg.replaceWith ("<b><font color=#FF9900>[4E]</font></b>");

var dndpfImg = $("img[src*='smilies/dd-pf.jpg']");
dndpfImg.replaceWith ("<b><font color=#FF9900>[D&D AND PATHFINDER]</font></b>");

var pathfinderImg = $("img[src*='smilies/pathfinder.jpg']");
pathfinderImg.replaceWith ("<b><font color=#FF9900>[PATHFINDER]</font></b>");

var dndnextImg = $("img[src*='smilies/dndnext.jpg']");
dndnextImg.replaceWith ("<b><font color=#FF9900>[D&D NEXT]</font></b>");



// ================= Media =================

var artImg = $("img[src*='smilies/art.jpg']");
artImg.replaceWith ("<b><font color=#FF9900>[ART]</font></b>");

var booksImg = $("img[src*='smilies/books.jpg']");
booksImg.replaceWith ("<b><font color=#FF9900>[BOOKS]</font></b>");

var moviesImg = $("img[src*='smilies/movies.jpg']");
moviesImg.replaceWith ("<b><font color=#FF9900>[MOVIES]</font></b>");

var musicImg = $("img[src*='smilies/music.jpg']");
musicImg.replaceWith ("<b><font color=#FF9900>[MUSIC]</font></b>");

var ootsImg = $("img[src*='smilies/oots.jpg']");
ootsImg.replaceWith ("<b><font color=#FF9900>[OOTS]</font></b>");

var podcastImg = $("img[src*='smilies/podcast.jpg']");
podcastImg.replaceWith ("<b><font color=#FF9900>[PODCAST]</font></b>");

var tvImg = $("img[src*='smilies/tv.jpg']");
tvImg.replaceWith ("<b><font color=#FF9900>[TELEVISION]</font></b>");



// ================= Publishing =================

var ENPubthreadtagImg = $("img[src*='smilies/ENPub-threadtag.gif']");
ENPubthreadtagImg.replaceWith ("<b><font color=#FF9900>[ENWORLD PUBLISHING]</font></b>");

var santiagoImg = $("img[src*='smilies/Santiago-threadtag.gif']");
santiagoImg.replaceWith ("<b><font color=#FF9900>[SANTIAGO]</font></b>");

var wotbsImg = $("img[src*='smilies/wotbs.jpg']");
wotbsImg.replaceWith ("<b><font color=#FF9900>[WAR OF THE BURNING SKY]</font></b>");

var zeitsmilieImg = $("img[src*='smilies/zeit_smilie.jpg']");
zeitsmilieImg.replaceWith ("<b><font color=#FF9900>[ZEITGEIST]</font></b>");



// ================= Misc Thread Prefixes =================

var boardImg = $("img[src*='smilies/board.jpg']");
boardImg.replaceWith ("<b><font color=#FF9900>[BOARDGAMES]</font></b>");

var cartographyImg = $("img[src*='smilies/cartography.jpg']");
cartographyImg.replaceWith ("<b><font color=#FF9900>[CARTOGRAPHY]</font></b>");

var convImg = $("img[src*='smilies/conv.jpg']");
convImg.replaceWith ("<b><font color=#FF9900>[CONVENTION]</font></b>");

var cthulhuImg = $("img[src*='smilies/cthulhu.jpg']");
cthulhuImg.replaceWith ("<b><font color=#FF9900>[CTHULHU]</font></b>");

var enniesImg = $("img[src*='smilies/ennies.jpg']");
enniesImg.replaceWith ("<b><font color=#FF9900>[ENNIES]</font></b>");

var enwImg = $("img[src*='smilies/enw.jpg']");
enwImg.replaceWith ("<b><font color=#FF9900>[ENWORLD]</font></b>");

var fancreationImg = $("img[src*='smilies/fancreation.jpg']");
fancreationImg.replaceWith ("<b><font color=#FF9900>[FAN CREATION]</font></b>");

var generalImg = $("img[src*='smilies/general.jpg']");
generalImg.replaceWith ("<b><font color=#FF9900>[GENERAL]</font></b>");

var kickstartImg = $("img[src*='smilies/kickstart.jpg']");
kickstartImg.replaceWith ("<b><font color=#FF9900>[KICKSTARTER]</font></b>");

var minisImg = $("img[src*='smilies/minis.jpg']");
minisImg.replaceWith ("<b><font color=#FF9900>[MINIATURES]</font></b>");

var personalImg = $("img[src*='smilies/personal.jpg']");
personalImg.replaceWith ("<b><font color=#FF9900>[PERSONAL]</font></b>");

var plotsplacesImg = $("img[src*='smilies/plotsplaces.jpg']");
plotsplacesImg.replaceWith ("<b><font color=#FF9900>[PLOTS AND PLACES]</font></b>");

var propsImg = $("img[src*='smilies/props.jpg']");
propsImg.replaceWith ("<b><font color=#FF9900>[PROPS]</font></b>");

var rpgsImg = $("img[src*='smilies/rpgs.png']");
rpgsImg.replaceWith ("<b><font color=#FF9900>[RPGS]</font></b>");

var startrekImg = $("img[src*='smilies/startrek.jpg']");
startrekImg.replaceWith ("<b><font color=#FF9900>[STAR TREK]</font></b>");

var swImg = $("img[src*='smilies/sw.jpg']");
swImg.replaceWith ("<b><font color=#FF9900>[STAR WARS]</font></b>");

var techImg = $("img[src*='smilies/tech.jpg']");
techImg.replaceWith ("<b><font color=#FF9900>[TECHNOLOGY]</font></b>");

var vgamesImg = $("img[src*='smilies/vgames.jpg']");
vgamesImg.replaceWith ("<b><font color=#FF9900>[VIDEOGAMES]</font></b>");

var wfrpImg = $("img[src*='smilies/wfrp.jpg']");
wfrpImg.replaceWith ("<b><font color=#FF9900>[WARHAMMER FANTASY]</font></b>");

var whoImg = $("img[src*='smilies/who.jpg']");
whoImg.replaceWith ("<b><font color=#FF9900>[DR WHO]</font></b>");

var wotcImg = $("img[src*='smilies/wotc.jpg']");
wotcImg.replaceWith ("<b><font color=#FF9900>[WOTC]</font></b>");


