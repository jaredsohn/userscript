// ==UserScript==
// @name          FDZone Customization V2
// @namespace     mailto:novemliu@gmail.com
// @description   Just hidden the unnecessary items of the site
// @include       http://*.fdzone.org/*		
// ==/UserScript==


//---------------------- Simple configurations ----------------------
var seldomVisitedZone = new Array(2,4,3,194,5,124,106,69); //hide the zones (category IDs) where you seldomly visited
var fIds = new Array(11,9,7,8,12,10); //set these zones at top first (according to this order)
//-------------------------------------------------------------------

hideHeader();
hideForumStat();
hideMenu();
hideOnlineItem();
hideAdText();
hideSeldomVisitedZone();
addIdsToMainBox();
moveFavouriteZoneToTop();

//For Browsing content
hideRuleBox();
hideFootFilter();


// -------------------------------------------------------------------
function hideHeader(){
	if(document.getElementById('header') != undefined){
		document.getElementById('header').style.display = 'none';
	}	
}

function hideForumStat(){
	if(document.getElementById('forumstats') != undefined){
		document.getElementById('forumstats').style.display = 'none';
	}
}

function hideMenu(){
	if(document.getElementById('menu') != undefined){
		document.getElementById('menu').style.display = 'none';
	}
}

function hideOnlineItem(){
	if(document.getElementById('online') != undefined){
		document.getElementById('online').style.display = 'none';
	}
}

function hideAdText(){
	adTextClassName = 'ad_text';
	var adTextClass = getElementsByClass(adTextClassName,null,'div');
	for(i=0;i<adTextClass.length;i++){
		adTextClass[i].setAttribute('style', 'display:none');
	}
	var overture_ads_top = document.getElementById('overture_ads_top');
	if(overture_ads_top){
		overture_ads_top.setAttribute('style', 'display: none');
	}
}

function hideSeldomVisitedZone(){
	for(i=0;i<seldomVisitedZone.length;i++){
		if(document.getElementById('category_'+seldomVisitedZone[i]) != undefined){
			document.getElementById('category_'+seldomVisitedZone[i]).style.display = 'none';
		}
	}
}

function addIdsToMainBox(){
	var mainBoxDiv = getElementsByClass('mainbox',null,'div');
	for(i=0;i<mainBoxDiv.length;i++){
		mainBoxDiv[i].setAttribute('id', 'zone'+i);
	}
}

function moveFavouriteZoneToTop(){
	if(window.location.href.indexOf('viewthread.php') < 0){
		var firstZone = document.getElementById('zone0');
		var favoritesAtTop = new Array();
		
		if(firstZone){
			for(i=0;i<fIds.length;i++){
				var tempElement = document.getElementById('zone'+fIds[i]);
				if(tempElement){
					favoritesAtTop[i] = document.createElement('div');
					favoritesAtTop[i].setAttribute('id', 'zone'+fIds[i]);
					favoritesAtTop[i].setAttribute('class', 'mainbox forumlist');
					favoritesAtTop[i].innerHTML = tempElement.innerHTML;
					tempElement.parentNode.removeChild(tempElement);
					firstZone.parentNode.insertBefore(favoritesAtTop[i],firstZone);
					firstZone.parentNode.insertBefore(document.createElement('hr'),firstZone);
				}
			}
		}
	}
}
	
function hideRuleBox(){
	var ruleBox = document.getElementById('rules');
	if(ruleBox){
		ruleBox.setAttribute('style', 'display: none');
	}
}

function hideFootFilter(){
	var footFilter = document.getElementById('footfilter');
	if (footFilter){
		footFilter.setAttribute('style', 'display: none');
	}
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}