// ==UserScript==
// @name           Newgrounds Royal Aura
// @namespace      http://Jolly.newgrounds.com
// @include        http://*.newgrounds.com/*
// @description    Changes your aura to the Royal Aura. Credit to this script goes to Jolly, Oldsage10, Erty, and EJR.
// ==/UserScript==

var THIS_URL = document.location.href;
var NG_USERNAME = document.getElementById('loginbox_username').textContent;
var USERPAGE_URL = getUserpageURL(NG_USERNAME);
var BBS_PAGE = 'http://www.newgrounds.com/bbs/topic/';
var PAGE_TYPE = getPageType();

/*

*/
var LEVEL_BASE_URL = 'https://sites.google.com/site/jollynewgrounds/scripts/newgrounds/purple-aura/Level';


// MAKES ALL THE MAGIC HAPPEN RIGHT HERE //
kickStart();
///////////////////////////////////////////

function getUserpageURL(userin)
{
var urlout = userin.toLowerCase();
urlout = 'http://'+urlout+'.newgrounds.com';
return urlout;
}

function getPageType()
{
var typeout = '';
if(THIS_URL.indexOf(USERPAGE_URL) != -1)
{
typeout = 'TYPE_USERPAGE';
}else if(THIS_URL.indexOf(BBS_PAGE) != -1)
{
typeout = 'TYPE_BBS';
}else
{
typeout = 'TYPE_NONE';
}
return typeout;
}

function getRoyalLevelURL(levelin)
{
levelin = parseFloat(levelin);
var level_name = levelin+'.png';
var urlout = LEVEL_BASE_URL+level_name;
return urlout;
}

function stripNonIntegers(strin)
{
var strout = new String(strin);
strout = strout.replace(/[^0-9]/g, '');

return strout;
}

function getBBSPosts()
{
var userposts = new Array();
var bbsposts = document.getElementsByClassName('box title post');
for(var b=0; b<bbsposts.length; b++)
{
var post = bbsposts[b];
var posthead = post.getElementsByClassName('heading')[0];
var author = posthead.getElementsByTagName('h3')[0].textContent;
if(author == NG_USERNAME)
{
userposts.push(post);
}
}
return userposts;
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
lvlsrc = getRoyalLevelURL(getBBSPostLevel(lvlsrc));
lvlicon.src = lvlsrc;
var auraLabel = userstats.getElementsByClassName('right')[0];
auraLabel.innerHTML = 'ROYAL';
}
}

function getUserpageLevel()
{
var ulevelurl = document.getElementById('ulevel').style.backgroundImage;
var levelout = stripNonIntegers(ulevelurl);
return levelout;
}

function setUserpageLevel()
{
var royal_url = getRoyalLevelURL(getUserpageLevel());
royal_url = 'url('+royal_url+')';
var ulevel = document.getElementById('ulevel');
ulevel.style.backgroundImage = royal_url;
var auraLabel = ulevel.getElementsByTagName('strong')[3];
auraLabel.innerHTML = 'Royal';
}

/*
#   KICKSTARTER FUNCTION
*/

function kickStart()
{
if(PAGE_TYPE == 'TYPE_USERPAGE')
{
setUserpageLevel();
}else if(PAGE_TYPE == 'TYPE_BBS')
{
setBBSPostLevel();
}
}