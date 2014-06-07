// ==UserScript==

// @name           Newgrounds: Christmas Theme All-in-1

// @include        *.newgrounds.com/*

// @description    Created for SirWolfy.

// @version        1

// @author         iAmGrimReaper

// @date           2010-4-2 17:03

// ==/UserScript==


var loc = document.location.href;

var itemColor = '#9EBBFF';
var selectColor = '#BBD9FF';
var whiteColor = '#FFFFFF';
var goldColor = '#FF9900';
var blackColor = '#000000';
var brightColor = '#C8DEFF';

document.body.innerHTML = document.body.innerHTML + "<style>#center {background: #000 url(http://ngarchive.aksumka.com/Archive/logos/09winter_bg.gif) top center no-repeat;}</style>";
document.body.innerHTML = document.body.innerHTML + "<style>#nav-main dd a {background: url(http://img.ngfiles.com/holiday/20091200_winter/nav.gif) no-repeat;}</style>";
document.body.innerHTML = document.body.innerHTML + "<style>.inputfield {background: #9EBBFF url(http://img.ngfiles.com/holiday/20091200_winter/form-input.gif) top left repeat-x;}</style>";
document.body.innerHTML = document.body.innerHTML + "<style>#formstuff textarea.altheight {background: #9EBBFF url(http://img.ngfiles.com/holiday/20091200_winter/form-buttonL.gif) 0 0 scroll repeat-x; }</style>";
document.body.innerHTML = document.body.innerHTML + "<style>#formstuff textarea.altbacktop {background: #9EBBFF url(url(http://img.ngfiles.com/skyline.gif) no-repeat scroll 0 0 #FFCC00) 0 0 scroll no-repeat; }</style>";
document.body.innerHTML = document.body.innerHTML + "<style>#formstuff textarea.altbackbot {background: #9EBBFF url(url(http://img.ngfiles.com/skyline.gif) no-repeat scroll 0 0 #FFCC00) 0 -64px scroll no-repeat; }</style>";
document.body.innerHTML = document.body.innerHTML + "<style>form#search {background: url(http://img.ngfiles.com/holiday/20091200_winter/form-mag.gif) top left no-repeat;}</style>";
document.body.innerHTML = document.body.innerHTML + "<style>.pulldown2 {background-color: #9EBBFF;}</style>";
document.body.innerHTML = document.body.innerHTML + "<style>#main {background: url(http://img.ngfiles.com/headerbg.jpg) top center no-repeat;}</style>";

var formButtonL = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-buttonL.gif)';
var formButtonR = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-buttonR.gif)';
var formInput = 'url(http://img.ngfiles.com/holiday/20091200_winter/form-input.gif)';



if(loc.indexOf('newgrounds.com') != -1)
{
var links = document.getElementsByTagName('a');

for(var l=0; l<links.length; l++)
{
var link = links[l];
var linkParent = link.parentNode.className;
if(linkParent != 'btn' && linkParent != 'btn bbs_search' && linkParent != 'btn col' && linkParent != 'btn kill' && linkParent != 'fin' && linkParent != 'link' && linkParent !='game' && linkParent != 'movie' && link.className != 'moderator' && link.className != 'administrator')
{
link.style.color = itemColor;
}
if(linkParent == 'movie')
{
link.style.color = whiteColor;
link.style.backgroundImage = greenBackground;
link.style.backgroundRepeat = 'repeat-y';
}
if(linkParent == 'game')
{
link.style.color = goldColor;
link.style.backgroundImage = redBackground;
link.style.backgroundRepeat = 'repeat-y';
}
}

var ftitles = document.getElementsByClassName('ftitle');

for(var ft=0; ft<ftitles.length; ft++)
{
var ftitle = ftitles[ft];
ftitle.style.color = itemColor;
ftitle.parentNode.style.color = whiteColor;
}

var fblurbs = document.getElementsByClassName('fblurb');

for(var fb=0; fb<fblurbs.length; fb++)
{
var fblurb = fblurbs[fb];
fblurb.style.color = itemColor;
}

var h1s = document.getElementsByTagName('h1');

for(var he1=0; he1<h1s.length; he1++)
{
var h1 = h1s[he1];
h1.style.color = itemColor;
}

var h2s = document.getElementsByTagName('h2');

for(var he2=0; he2<h2s.length; he2++)
{
var h2 = h2s[he2];
h2.style.color = itemColor;
}

var h3s = document.getElementsByTagName('h3');

for(var he3=0; he3<h3s.length; he3++)
{
var h3 = h3s[he3];
h3.style.color = itemColor;
}

var h4s = document.getElementsByTagName('h4');

for(var he4=0; he4<h4s.length; he4++)
{
var h4 = h4s[he4];
h4.style.color = brightColor;
}

var buttons = document.getElementsByTagName('span');

for(var btn=0; btn<buttons.length; btn++)
{
var button = buttons[btn];
if(button.className == 'btn' || button.className == 'btn bbs_search' || button.className == 'btn col' && button.className != 'button')
{
var blink = button.getElementsByTagName('a')[0];
blink.style.backgroundImage = formButtonL;
button.style.backgroundImage = formButtonR;
}
}

var inputs = document.getElementsByTagName('input');

for(var i=0; i<inputs.length; i++)
{
var input = inputs[i];
input.style.backgroundImage = formInput;
}

var selects = document.getElementsByTagName('select');

for(var s=0; s<selects.length; s++)
{
var select = selects[s];
// select.className = '';
select.style.backgroundColor = selectColor;
select.style.color = blackColor;
// select.style.float = 'left';
}

var yellows = document.getElementsByClassName('yellow');

for(var y=0; y<yellows.length; y++)
{
var yellow = yellows[y];
yellow.style.color = brightColor;
}

var forums = document.getElementsByClassName('link');

for(var fo=0; fo<forums.length; fo++)
{
var forum = forums[fo];
var head = forum.getElementsByTagName('a')[0].getElementsByTagName('strong')[0];
head.style.color = itemColor;
}

var textareas = document.getElementsByTagName('textarea');

for(var ta=0; ta<textareas.length; ta++)
{
var textarea = textareas[ta];
textarea.style.backgroundImage = textAreaBackground;
textarea.style.backgroundColor = itemColor;
}

var flashbbs = document.getElementsByClassName('fbbsline1');

for(var flb=0; flb<flashbbs.length; flb++)
{
var flashdisplay = flashbbs[flb];
flashdisplay.getElementsByTagName('strong')[0].style.color = itemColor;
flashdisplay.getElementsByTagName('strong')[1].style.color = itemColor;
}
}

var THIS_URL = document.location.href;
var BBS_PAGE = 'http://www.newgrounds.com/bbs/topic/';
var PAGE_TYPE = getPageType();
var LEVEL_BASE_URL = 'http://licon.ngfiles.com/christmas/xmas_icon_';
var FILE_TYPE = '.gif';
var STAFF_NUM_ID = new Array(1411161, 606761, 1013877, 784, 28372, 48551, 81981, 2354350, 7373, 60100, 1, 68);
var STAFF_NAMES = new Array('behemothjosh', 'bob', 'johnnyutah', 'liljim', 'luis', 'mindchamber', 'psychogoldfish', 'rob', 'stamper', 'tim', 'tomfulp', 'wadefulp');

// MAKES ALL THE MAGIC HAPPEN RIGHT HERE //
kickStart();
///////////////////////////////////////////

function getPageType()
{
var typeout = '';
if(THIS_URL.indexOf('.newgrounds.com/') != -1 && THIS_URL.indexOf(BBS_PAGE) == -1 && THIS_URL.indexOf('www.') == -1)
{
typeout = 'TYPE_OTHER';
}else if(THIS_URL.indexOf(BBS_PAGE) != -1)
{
typeout = 'TYPE_BBS';
}
return typeout;
}

function getWinterLevelURL(levelin)
{
levelin = parseFloat(levelin);
var level_name = levelin+FILE_TYPE;
var urlout = LEVEL_BASE_URL+level_name;
return urlout;
}

function getStaffWinterLevelURL(levelin)
{
var urlout = '';
for(var i=0; i<STAFF_NUM_ID.length; i++)
{
if(levelin == STAFF_NUM_ID[i])
{
var level_name = 'staff_'+STAFF_NAMES[i];
urlout = LEVEL_BASE_URL+level_name+FILE_TYPE;
return urlout;
}
}
}

function stripNonIntegers(strin)
{
var strout = new String(strin);
strout = strout.replace(/[^0-9]/g, '');

return strout;
}

function getBBSPosts()
{
var bbsposts = document.getElementsByClassName('box title post');
return bbsposts;
}

function getBBSPostLevel(strin)
{
var lvlout = stripNonIntegers(strin);
return lvlout;
}

function setBBSPostLevel()
{
var bbsposts = getBBSPosts();
for(var p=0; p<bbsposts.length; p++)
{
var post = bbsposts[p];
var userstats = post.getElementsByClassName('userstats')[0];
var lvlicon = userstats.getElementsByTagName('img')[0];
var lvlsrc = lvlicon.src;
if(lvlsrc.indexOf('staff') == -1)
{
lvlsrc = getWinterLevelURL(getBBSPostLevel(lvlsrc));
}else
{
lvlsrc = getStaffWinterLevelURL(getBBSPostLevel(lvlsrc));
}
lvlicon.src = lvlsrc;
var auraLabel = userstats.getElementsByClassName('right')[0];
auraLabel.innerHTML = 'FROST';
}
}

function getUserpageLevel()
{
var ulevelurl = document.getElementById('ulevel').style.backgroundImage;
return ulevelurl;
}

function setUserpageLevel()
{
var frost_url = getUserpageLevel();
if(frost_url.indexOf('staff') == -1)
{
frost_url = stripNonIntegers(frost_url);
frost_url = getWinterLevelURL(frost_url);
}else
{
frost_url = stripNonIntegers(frost_url);
frost_url = getStaffWinterLevelURL(frost_url);
}
frost_url = 'url('+frost_url+')';
var ulevel = document.getElementById('ulevel');
ulevel.style.backgroundImage = frost_url;
var auraLabel = ulevel.getElementsByTagName('strong')[3];
auraLabel.innerHTML = 'Frost';
}

/*
#   KICKSTARTER FUNCTION
*/

function kickStart()
{
if(PAGE_TYPE == 'TYPE_OTHER')
{
setUserpageLevel();
}else if(PAGE_TYPE == 'TYPE_BBS')
{
setBBSPostLevel();
}
}