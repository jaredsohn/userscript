// ==UserScript==
// @name           Auto login
// @namespace      n\a
// @include        *.travian*.*
// ==/UserScript==

//Random Farm selection
//No more tribe selection prompt, now auto detect :)

//set global variables
var server = location.hostname;
var rootPath = "http://" + server + "/";
var suffixLocal, suffixGlobal;
var lang = new Array();
var image = new Array();
var farmList = new Array();
var dom = new DOMUtils();
var user_race = 1; //Default Romans :|
var minWait = 4000; //Don't make it smaller then 5000ms!
var maxWait = 2 * minWait;
var globalInt = -1, totalTroops = new Array(); //for temporary value passing between functions
var runningDiv;

var fque = new Array(); //farm queue.
var prioque = new Array(); //priority queue.
var skipcounter = 0;
priorityAttack = false;


var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPListO = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;
var XPIter = XPathResult.UNORDERED_NODE_ITERATOR_TYPE;


function loginCheck()
{
if (document.getElementsByName('login'))
{
var ex = ".//input[@value='login']";
tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

var ex = ".//input[@type='password' and contains(@value, '*')]";
tag2 = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);
    if(tag.snapshotLength && tag2.snapshotLength)
    {
    loginButton = tag.snapshotItem(0);
    loginButton.click();
    }
}
}
loginCheck();

function GoToUrl()
{
if (GM_getValue("Active_" + suffixGlobal, -1) > -1)
{
setTimeout(function(){window.location.replace(rootPath+"a2b.php");}, 120000);
}

	var html = document.body.innerHTML; // In case 'Unable to load site' is showed, try to Refresh the page.
	if (html.indexOf(" <!-- ERROR ITEM CONTAINER") != -1) {
		window.location.replace(rootPath+"a2b.php");
	}
	if (document.URL.indexOf("berichte.php") == -1 && GM_getValue("Active_" + suffixGlobal, -1) > -1 )
	{

	newreport = document.getElementsByTagName('html')[0].innerHTML.indexOf("m1.gif")+document.getElementsByTagName('html')[0].innerHTML.indexOf("m3.gif");
	if ( newreport != -2 ) 
  { 
	window.open("/berichte.php", "_self");
	return;
	}
	}
	
	GM_log("Main function called");
	suffixGlobal = server + '_' + getPlayerId();
	suffixLocal = suffixGlobal + '_' + getActiveVillageId();
	setLanguage();
	loadImage();
	loadStyle();
	var url = document.URL;
	url = url.substring(url.lastIndexOf("/") + 1);
	user_race = GM_getValue('Tribe_' + suffixGlobal, -1);
	if (user_race != -1) {
		user_race = GM_getValue('Tribe_' + suffixGlobal, 0);
		user_race = parseInt(user_race);
	} else {		
		if(url.indexOf("a2b.php")!=-1){
			user_race = 1+10*getPlayerTribe();
			GM_setValue('Tribe_' + suffixGlobal, user_race);
			alert(T('SCRIPT_NAME')+" Installation complete\n"+T('INSTALL_M1')+"\n"+T('INSTALL_M2')+" :)\n-sowrov");
			window.location.replace(rootPath+"build.php?id=39");
		}else{
			window.location.replace(rootPath+"a2b.php");
		}
		
	}
	if (GM_getValue("Maximize_" + suffixGlobal, false) === false) {
		GM_setValue("Maximize_" + suffixGlobal, 1);
	}
	if (GM_getValue("StartIndex_" + suffixLocal, false) === false) {
		GM_setValue("StartIndex_" + suffixLocal, 0);
	}
	if (GM_getValue("EndIndex_" + suffixLocal, false) === false) {
		GM_setValue("EndIndex_" + suffixLocal, -1);
	}
	
	//insert village selector
	rp_villageSelector();
	//alert (url);
	if (url.indexOf("build.php?") > -1
			&& (url.indexOf("gid=16") > -1 || url.indexOf("id=39") > -1)) {
		if (isReallyRallyPoint()) {
			rp_mainPage();
		}
		 
		activeMain();
	} else if (url.indexOf("a2b.php") > -1) {
	
		activeMain();
	} else if (url.indexOf("karte.php?") > -1 && url.indexOf("d=") > -1
			&& url.indexOf("c=") > -1) { //if user profile page
		foundNewFarm();
	}
       if(document.URL.match('karte.php') && !document.URL.match('d=') )
       {
               var ex = "//area[contains(@id,'ma_n')]";
               tag = document.evaluate(ex,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

               for(var i=1; i<=tag.snapshotLength;i++)
              {
                   tag.snapshotItem(i-1).addEventListener("click", function(){setTimeout(function(){getXYtoFarms()},1000)}, true); // so that it will check again when scrolling.
              }
GoToUrl();