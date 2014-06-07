// ==UserScript==
// @name           Zoomed Colbert
// @namespace      http://userscripts.org/people/26481
// @description    Sets up page for zoom viewing of Colbert.
// @source         http://userscripts.org/scripts/show/22234
// @version        0.4
// @date           2008-04-27
// @creator        Ryan Williams <ryanbot at gmail>
// @include        http://www.comedycentral.com/colbertreport/*
// ==/UserScript==

// Changelog
// ---------
// v0.4     27-Apr-2008 - should have the CollectionID working properly (current videos should automatically play one after the other)
// v0.3     07-Mar-2008 - modified to work with new Colbert Report page
// v0.2     03-Feb-2008 - fixed an issue with auto update
// v0.1     03-Feb-2008 - initial release

// Based on Fat Knowledge's http://userscripts.org/scripts/show/9100

// Autoupdate...
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
    // Note: Version numbers must be in x.y float format
    try {
    if (!GM_getValue) return;
         // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage and a script with * includes
        var DoS_PREVENTION_TIME = 2 * 60 * 1000;
        var isSomeoneChecking = GM_getValue('CHECKING', null);
        var now = new Date().getTime();
        GM_setValue('CHECKING', now.toString());
        if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;
        var lastChecked = GM_getValue('LAST_CHECKED', null);

        var ONE_DAY = 24 * 60 * 60 * 1000;
        if (lastChecked && (now - lastChecked) < ONE_DAY) return;
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: SCRIPT.checkURL, // don't increase the 'installed' count just for checking
            onload: function(result)
            {
                if (!result.responseText.match(/@version\s+([\d.]+)/)) return;
                var theOtherVersion = parseFloat(RegExp.$1);
                if (theOtherVersion <= parseFloat(SCRIPT.version)) return;
                if (window.confirm('A new version (' + theOtherVersion + ') of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n'))
                {
                    GM_openInTab(SCRIPT.url);
                }
            }
        });
        GM_setValue('LAST_CHECKED', now.toString());
    }    catch (ex){}
}

// Check for an update
autoUpdateFromUserscriptsDotOrg(
{    
    name: 'Zoomed Colbert',
    checkURL: 'http://userscripts.org/scripts/review/22234?format=txt',
    url: 'http://userscripts.org/scripts/source/22234.user.js',
    version: '0.4'
});


var intSize = 1080

if (GM_getValue)
{
       intSize = GM_getValue('videoSize', '1080'); 
}


var currVidCollectonID;

currVidCollectionID = document.body.innerHTML;


var searchWord = '"autostart=false&amp;collectionId=';

var intStartB = currVidCollectionID.indexOf(searchWord);

currVidCollectionID = (currVidCollectionID.substring(intStartB + searchWord.length, intStartB + searchWord.length + 6));

var videoIDs = new Array();

video_option_nodes = get_video_option_nodes();

var intCurrentVid = 0

function doThings()
{
	intCurrentVid = intCurrentVid +1;

	insert_flash_player(videoIDs[intCurrentVid]);
		
	newButton = document.getElementById('___Next');
	newButton.addEventListener('click', doThings, false);
	
	btn880size = document.getElementById('880size');
	btn880size.addEventListener('click', set880, false);

	btn1080size = document.getElementById('1080size');
	btn1080size.addEventListener('click', set1080, false);

	btn1200size = document.getElementById('1200size');
	btn1200size.addEventListener('click', set1200, false);
}

function set1200()
{
	if (GM_setValue)
	{
		GM_setValue('videoSize', 1200);
		intSize = 1200;
		//Leave it on the same video
		intCurrentVid = intCurrentVid - 1;
		doThings();
	}
	
}

function set1080()
{
	if (GM_setValue)
	{
		GM_setValue('videoSize', 1080);
		intSize = 1080;
		intCurrentVid = intCurrentVid - 1;
		doThings();
	}
	
}

function set880()
{
	if (GM_setValue)
	{
		GM_setValue('videoSize', 880);
		intSize = 880;
		intCurrentVid = intCurrentVid - 1;
		doThings();
	}
	
}

video_option_nodes = get_video_option_nodes();

getVideoIDs(video_option_nodes);

insert_first_video(videoIDs[0]);

newButton = document.getElementById('___Next');
newButton.addEventListener('click', doThings, false);

btn880size = document.getElementById('880size');
btn880size.addEventListener('click', set880, false);

btn1080size = document.getElementById('1080size');
btn1080size.addEventListener('click', set1080, false);

btn1200size = document.getElementById('1200size');
btn1200size.addEventListener('click', set1200, false);

//Fix the menu (move it down the page)
var menu = document.getElementById('menudiv');
menu.style.top = (intSize + 300) + "px";
menu.style.position = "absolute";

	
//get all the video option nodes (div with class='m1_holder) and store them in an array
function get_video_option_nodes(){
     var iterator = document.evaluate("//div[@class='vp_entry detail']", document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
     var nodes = new Array();
     var i =0;
     try {
       var thisNode = iterator.iterateNext();
        
         while (thisNode) {
           //GM_log( thisNode.getAttribute('onClick'));
           nodes[i] = thisNode;
           i++;
           thisNode = iterator.iterateNext();
         }   
  
       } catch (e) {
         GM_log( 'Error: Document tree modified during iteraton ' + e );
       }
       return nodes;
   }

   function get_vid_from_onclick(onclick){
       var vid_start = onclick.indexOf("itemId:'")+8;
       var vid_stop = onclick.indexOf('\'',vid_start);
       return onclick.substring(vid_start,vid_stop);
   }
  
   function getVideoIDs(nodes){
		var k = 0
	   for (x in nodes){
           var vid = get_vid_from_onclick(nodes[x].getAttribute('videoid'));
		   
		   videoIDs[k] = vid;
		   k++;
		   
       }
   }
   
function insert_first_video(vid){
   
      var flash_div = document.createElement("div");
       flash_div.innerHTML = "<table><tr><td><embed id='video_player' width='" + intSize + "' height='" + intSize + "' flashvars='collectionId=" + currVidCollectionID + "&videoId=" + vid + "&&testmode=' allowscriptaccess='always' allowfullscreen='true' wmode='opaque' quality='high' bgcolor='#031024' name='video_player' src='/sitewide/video_player/view/colbert_vert/player.swf' type='application/x-shockwave-flash'/></td><td valign='top'><br /><br /><br /><br /><br /><br /><br /><br /><br /><input type='button' id='___Next' value='Next'><br /><input type='button' id='1200size' value='1200'><br /><input type='button' id='1080size' value='1080'><br /><input type='button' id='880size' value='880'</td><tr></table>";
	   
	   flash_div.style.height = intSize;
	   flash_div.style.width = intSize;
       flash_div.setAttribute('id','flash_div');
	   flash_div.style.zindex = 10;
	    
		pageElements = document.getElementsByTagName("div");
		var firstDiv = pageElements[0];
	
		firstDiv.parentNode.insertBefore(flash_div, firstDiv);
  
   }

   function insert_flash_player(vid){
   
      var flash_div = document.getElementById("flash_div");
       flash_div.innerHTML = "<table><tr><td><embed id='video_player' width='" + intSize + "' height='" + intSize + "' flashvars='collectionId=" + currVidCollectionID + "&videoId=" + vid + "&&testmode=' allowscriptaccess='always' allowfullscreen='true' wmode='opaque' quality='high' bgcolor='#031024' name='video_player' src='/sitewide/video_player/view/colbert_vert/player.swf' type='application/x-shockwave-flash'/></td><td valign='top'><br /><br /><br /><br /><br /><br /><br /><br /><br /><input type='button' id='___Next' value='Next'><br /><input type='button' id='1200size' value='1200'><br /><input type='button' id='1080size' value='1080'><br /><input type='button' id='880size' value='880'</td><tr></table>";
	   
	   flash_div.style.height = intSize;
	   flash_div.style.width = intSize;
       flash_div.setAttribute('id','flash_div');
 
   }