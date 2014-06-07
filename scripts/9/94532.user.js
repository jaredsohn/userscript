// ==UserScript==
// @name           Newgrounds X-Mas Level Converter
// @namespace      com.oldsage10.scripts.ng
// @include        http://*.newgrounds.com/*
// @description    ALL CREDIT GOES TO OLDSAGE. Converts your level to its Winter counterpart.
// ==/UserScript==

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
auraLabel.innerHTML = '';
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