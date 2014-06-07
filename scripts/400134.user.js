// ==UserScript==
// @name        Userscripts.org Scam Filter
// @description Filters out scam scripts at Userscripts.org.
// @namespace   http://userscripts.org/scripts/review/163038
// @icon        http://s3.amazonaws.com/uso_ss/icon/163038/large.png?1365299642
// @updateURL   https://userscripts.org/scripts/source/163038.meta.js
// @downloadURL https://userscripts.org/scripts/source/163038.user.js
// @homepageURL https://userscripts.org/scripts/show/163038
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http*://userscripts.org/
// @include     http*://userscripts.org/scripts*
// @include     http*://userscripts.org/tags/*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @version     5.207
// ==/UserScript==

$(document).ready(function(){

// Load jQuery cookie functions and viewport visibility selectors
loadJQcookies();
loadJQViewport();

/* The following 5 arrays comprise the blacklist. They are divided by type for possible future auto-review features.
Note that clear scammers are placed in the Scammers array, even if they might fit one of the other categories. */

// IDs of known scam/spam authors
var scammers = [
	505511,509293,509378,510850,513541,510672,480097,510116,500038,512571,442265,513430,507472,513409,505429,
	513357,512124,507498,506735,500300,511244,510309,511328,497384,513364,513355,511676,487511,511415,507901,
	507089,513264,510605,512529,511674,511989,510527,512972,513188,512212,509425,512669,512668,512519,472464,
	513030,508237,509455,445861,505765,505775,490174,505107,504907,475448,439139,489768,427958,500250,475874,
	500010,501687,441113,477783,477939,469787,480448,490444,507032,507280,506308,511070,414793,512674,510630,
	507732,510588,512779,512759,512752,512179,512061,512725,500430,505802,378054,509405,510729,100713,510389,
	504342,512514,506181,509046,512362,511138,511847,512226,511439,511386,509806,512154,510785,502394,513843,
	511333,511604,511998,511984,505329,471739,511959,497739,508301,496647,511856,511598,511852,508789,509003,
	511640,506401,511558,511543,510077,506307,511319,511367,511401,426758,511160,505130,511129,500403,511060,
	511004,510975,509376,510881,508826,510788,510790,510609,510487,510565,504495,507700,474473,508083,508770,
	436783,503959,501839,508952,510181,510183,496061,502509,434378,319859,509709,445145,506323,509541,509477,
	509401,509102,507765,440600,507395,493603,469852,504611,508929,504955,508885,507596,492463,508839,502511,
	505519,507645,508665,507767,508322,507927,508149,505864,508437,506372,501446,507756,479455,508339,508327,
	508228,508224,439396,486100,484490,483252,477018,469610,474749,475548,469791,471187,469618,469741,469778,
	469780,469784,469809,469886,428875,464299,440810,442036,238348,441298,440800,441085,437719,420155,409280,
	403145,342242,329565,139742,511861,314407,473973,322218,503485,471931,502003,353460,507208,512693,501361,
	512259,511888,511170,511127,291772,510918,503054,510750,510611,509950,427026,507649,507934,508452,471736,
	507729,507614,507751,507753,508147,507588,507142,492379,507486,507485,508087,507183,479194,507094,507093,
	507082,499556,507041,507861,507870,507861,507870,426361,506908,506898,506748,505764,506542,506547,507776,
	506324,428623,507651,507659,506107,271918,504188,507554,505267,506223,507471,504831,290748,503800,507340,
	507232,342061,468969,507199,507215,507166,498865,497933,507014,506995,505950,439843,467890,506668,506119,
	501773,504380,503586,392894,288247,503614,503108,418280,513678,487207,492564,513638,513429,289792,289964,
	435713,151070,512412,431803,484943,473044,508774,497119,327303,492799,208735,498726,505617,413570,513804,
	482213,513968,513981,502217,507365,508594,504474,512915,512525,502367,513487,513002,512606,512442,512570,
	512387,512085,511795,512089,510382,511475,505926,511188,511093,510847,510691,510422,509275,509241,509157,
	509083,508882,508057,508849,508673,508103,507510,507260,507241,506729,506697,506689,506430,505845,505607,
	504993,504988,504327,504005,503775,503709,503590,503498,503334,503206,503298,283470,501668,502362,502190,
	501444,501345,500825,500637,500843,500630,500190,500078,499802,498950,498417,498115,497795,495883,497163,
	495995,490808,476102,476758,514045,505250,514143,514332,507958,514409,426481,432055,428693,440592,509598,
	514445,514517,514637,514412,445056,473740,488376,510780,514863,514894,515078,512570,510946,507241,506729,
	515107,515223,514725,515272,515299,515313,470172,515268,515446,515440,515489,515465,515540,420148,515577,
	515862,506824,501137,503837,516035,516034,516152,508693,516334,481002,256842,516431,09657,509657,433419,
	434590,516272,516540,516568,516582,516589,516725,516873,516825,507877,516910,364693,493181,516616,517317,
	517309,503846,480097,517450,516957,513803,517439,509427,445156,517512,517534,515469,515049,518433,519964,
	518237,509037,519871,518070,520930
];

/* IDs of useless authors. These include authors who only post unexplained copies of existing scripts and   
scripts that primarily do nothing. */
var useless = [
	513573,484405,513621,422292,478814,513746,494425,508578,498070,500894,514046,514258,512116,466803,506234,
	182070,154802,210716,326372,142623,479344,412017,195004,209847,483188,515140,506391,502722,497223,516057,
	498655,516795,477924,133792,517272
];

/* IDs of accounts that haven't posted scripts (yet) but are clearly operated by scam authors 
(ie. they post dummy reviews for scams, etc) */
var scamHelpers = [
	505792,505791,505782,505352,505300,502220,442199,442192,502618,513557,196818,498788,501053,513390,513028,
	509806,434587
];

/* IDs of authors who post Packer and other obfuscated (hidden) code, and privately-hosted remote code, 
that can not be easily verified. */
var obfuscated = [
	506312,482708,426106,469018,422222,442786,422223,422224,422226,422227,473813,505802,505802,512195,511096,
	434917,292807,398936,199618,485411,308463,437023,507118,506973,250955,469976,474262,439208,433063,130901,
	360083,401264,286875,301639,126265,85357,76302,508036,365484,471746,179136,511801,499040,507524,470746,
	507881,507267,484532,484441,412918,505444,493299,503861,469860,470394,331170,442420,511090,489916,369106,
	514114,440592,514408,489669,514396,514718,320677,515026,509312,486160,516124,395734,515898,516107,516309,
	516474,513448,515836,516655,492507,490659,517417,516518,517249,516040
];

/* Misc. suspicious: IDs of authors of suspicious scripts that are not confirmed scams but exhibit highly 
suspicious behavior. This is currently populated primarily by Ultoo.com script authors. */
var suspicious = [
	512776,505330,509760,508814,507726,511000,513360,511118,513246,509798,416110,505078,513216,513490,512836,
	507909,505314,509298,513106,506607,512750,512842,506195,513236,508667,501009,505326,509690,508422,506068,
	470374,505168,512743,512685,505778,423469,417384,512178,201391,511758,510350,510972,509965,508299,505635,
	504693,508121,509729,511015,510766,507604,510191,510582,509360,507832,507466,509694,506866,505770,507854,
	508794,506958,508725,470697,508401,507876,505912,505945,506579,505689,506680,508333,505434,506731,505035,
	500679,506741,506998,506512,505247,505401,505047,513812,234423,513836,514361,514276,514231,514399,514231,
	514448,503630,514493,513984,514728,514873,169798,513360,514911,514768,514953,503846,514658,515321,504962,
	515176,510636,515832,10072,516079,516201,516225,516460,516468,516650,516502,517312,517404,516502
];

/* IDs below belong to scripts rather than authors. Used to block scripts that the author doesn't intend as malicious, but nevertheless are -- 
such as scripts advertised as "pranks". Though authors who ONLY post pranks (and similar) will probably be added to the scammer list. */
var pranks = [124287,165241,142050,165892,165889];

// Ignore the following script authors. This is to prevent known false-positive detections
var whitelist = [
	501553,19916,297645,86416,103626,169575,386991,36967,110547
];

// Settings *************************************************

// If our settings cookies don't exist yet, create them
if (GM_getValue('cont',-5) == -5) GM_setValue('cont','0');
if (GM_getValue('update',-5) == -5) GM_setValue('update','1');

// Append Settings checkboxes and set their tooltip text
var updateTip = 'Checks for Scam Filter updates a maximum of 3 times per day.';
var contTip = 'Automatically displays more results when you scroll to the end of a list.';

var checkboxParams = 'type="checkbox" style="font-weight:bold;color:white;vertical-align:middle;"';
var labelParams = 'style="font-weight:bold;color:white;;vertical-align:middle;"';

$('div#top div.container').prepend('<div style="vertical-align:middle;font-size:11px;color:white;float:left;padding-top:4px;">' + 
'<label class="filterSettingsToggle" style="cursor:pointer;color:white;font-weight:bold;">Scam Filter Settings</label>' + 
'<div class="filterSettings" hidden="" style="padding-bottom:3px;font-weight:bold;">' + ': ' +
'<input title="' + contTip + '" class="setCont" '+ checkboxParams +' />' + 
'<label title="' + contTip + '" class="setCont" '+ labelParams +'>Continuous Scroll</label> &nbsp;' + 
'<input title="' + updateTip + '" class="setUpdate" '+ checkboxParams +' />' + 
'<label title="' + updateTip + '" class="setUpdate" '+ labelParams +'>Update Check</label> &nbsp;' + 
//'<label ' + labelParams + '>• &nbsp;v' + GM_info.script.version + ' &nbsp;• &nbsp;<span class="tally"></span> Authors Blocked</label>' +
'<label ' + labelParams + '>• <span class="tally"></span> Authors Blocked</label>' +
'</div>' +
'</div>');

// Set initial state of checkboxes
if (GM_getValue('cont') == '1') $('input.setCont').prop('checked', true);
if (GM_getValue('update') == '1') $('input.setUpdate').prop('checked', true);

// Save settings
var setCont;
var setUpdate;
$('input.setCont').change(function(){setCont = $(this).prop('checked') ? '1' : '0';GM_setValue('cont',setCont);location.reload(); });
$('input.setUpdate').change(function(){setUpdate = $(this).prop('checked') ? '1' : '0';GM_setValue('update',setUpdate);location.reload(); });

// Toggle checkboxes when their labels are clicked
$('label.setCont').click(function(){toggleCheck('setCont')});
$('label.setUpdate').click(function(){toggleCheck('setUpdate')});

// Toggle settings display when label is clicked
$('label.filterSettingsToggle').click(function(){
	if ($('div.filterSettings').attr('hidden')){
		$('div.filterSettings').removeAttr('hidden').css('display','inline');
	} else {
		$('div.filterSettings').attr('hidden','').css('display','');
	}
});

function toggleCheck(className){
	if ($('input.'+className).prop('checked')){
		$('input.'+className).prop('checked', false);
		if (className == 'setCont') GM_setValue('cont','0');
		if (className == 'setUpdate') GM_setValue('update','0');
		location.reload();
	} else {
		$('input.'+className).prop('checked', true);
		if (className == 'setCont') GM_setValue('cont','1');
		if (className == 'setUpdate') GM_setValue('update','1');
		location.reload();
	}
}

// Read settings
var cCont = (GM_getValue('cont') == '1') ? true : false;
var cUpdate = (GM_getValue('update') == '1') ? true : false;

// *** Set update info ***

// Tell auto-updater this script's description page URL, for the update notification link
var thisScriptURL = location.protocol + '//userscripts.org/scripts/show/163038'; 

// Tell auto-updater this script's meta data URL, for checking the script's latest version number
var thisScriptMetaURL = location.protocol + '//userscripts.org/scripts/source/163038.meta.js'; 

// *** End update info ***

// ********************* Continuous scroll **********************
if ((cCont) && ($('span.loading.done').length < 1) && (location.pathname.search('/show') < 0) && (location.pathname.search('/review') < 0) && (location.pathname.search('/fans') < 0) && (location.pathname.search('/issues') < 0) && (location.pathname.search('/discuss') < 0) && (location.pathname != '/') && (location.pathname.search('/review') < 0) && (location.pathname.search('/versions') < 0) && (location.pathname.search('/diff') < 0) && (location.pathname.search('/upload') < 0) && (location.pathname.search('/admin') < 0) && (location.pathname.search('/edit') < 0) && (location.pathname.search('/images') < 0)){

	// Remove the page links to avoid confusion in continuous mode 
	$('div.pagination').remove();
	
	var pageOffset = 0;
	
	// Get the current page number
	if (location.href.search('page=') > -1){
		// If the URL contains page=, read page number from there
		var page = parseInt(location.href.substr(location.href.search('page=') + 5,4));
	} else {
		// Otherwise assume we're on page 1
		var page = 1;
	}

	// Clone the table header for use in our "floater" fixed info bar
	var info = $('table.wide.forums th.la').clone();
	info.addClass('floated');
	
	// Create a div and table to contain the cloned table header 
	var floater = '<div style="width:950px;position:fixed;left: 50%;margin-left:-475px;z-index:50;"  hidden="" class="floater"><table class="wide forums"></div>';
	
	// Insert the floater div into the page...
	$('body').prepend(floater); 
	
	// ...and insert the cloned table header into that div
	$('.floater table').prepend(info);
	
	// Hide or show the floater based on whether or not the original table header is in view (:in-viewport selector from a plugin)
	if (($('table.wide.forums th.la:not(.floated):in-viewport').length < 1) && ($('.floater[hidden]').length > 0)) {
		$('.floater').removeAttr('hidden');
	} else if (($('table.wide.forums th.la:not(.floated):in-viewport').length > 0) && ($('.floater[hidden]').length < 1)) {
		$('.floater').attr('hidden','');
	}

	// Scrolling should trigger a check to see if the floater needs to be shown, and whether we need to fetch more content
	$(window).scroll(function(){
		scroll();
	});
}

function scroll(){
	// Again, hide or show the floater as appropriate
	if (($('table.wide.forums th.la:not(.floated):in-viewport').length < 1) && ($('.floater[hidden]').length > 0)) {
		$('.floater').removeAttr('hidden');
	} else if (($('table.wide.forums th.la:not(.floated):in-viewport').length > 0) && ($('.floater[hidden]').length < 1)) {
		$('.floater').attr('hidden','');
	}
	
	// If the page footer is in view, we've hit the bottom of the page, so fetch more content...
	if ($('div#root_footer:in-viewport').length > 0){
	
		// ...But don't fetch more content if a fetch is already in progress
		if (!($('table.wide.forums tbody.active').length > 0)){
			
			// Tell upcoming scroll triggers that a fetch is in progress
			$('table.wide.forums tbody').addClass('active');
			
			// Keep track of which results page we're up to
			pageOffset++;
			var nextPage = page + pageOffset;
			
			// Start constructing the URL to fetch. Strip out any anchor data from the current URL
			var urlFixed = location.href.replace(/\#.*/i,'');
			
			// Set the URL to fetch the next page. Must be done in different ways depending on the current URL's tokens
			if (urlFixed.search(/page\=/i) > -1) {
				var nextUrl = urlFixed.replace(/page\=\d+/i,'page=' + nextPage); 
			} else if (urlFixed.search(/\?/) > -1) {
				var nextUrl = urlFixed + '&page=' + nextPage; 
			} else {
				var nextUrl = urlFixed + '?page=' + nextPage; 
			}
			
			// Display "Fetching" message
			$('span.loading').text(' [Fetching More Results...]').css('color','lightblue');
			
			// Retrieve the next page
			$.ajax({
				url: nextUrl,
				dataType: 'html',
				success: addContent,
				error: ajaxError
			});
		}
	}
}

function ajaxError(){
	$('table.wide.forums tbody').removeClass('active');
	pageOffset--;
	setTimeout(errorHandoff, 500);
}

function errorHandoff(){
	scroll();
}

function addContent(data){
	if (data.search('No results. Sorry!') > -1){
		$('span.loading').addClass('done').text(' No more results!');
	} else {
		// From the retrieved page, strip out everything above and below the rows of the results table
		var newData = data.replace(/\!DOCTYPE[\s\S]*?\<tr id\='scripts\-/i,'tr id=\'scripts-')
			.replace(/\<\/table\>[\s\S]*\<div class\="pagination[\s\S]*\<\/html\>/i,'');
			
		// Debug new table row extraction
		//document.open('text/plain');document.write(newData);
		
		// Append the new table rows to our current table
		$('table.wide.forums tbody').append(newData);
		
		// Tell upcoming scroll triggers that a fetch is no longer in progress
		$('table.wide.forums tbody').removeClass('active');
		
		// Clear "Fetching" text
		$('span.loading').text('');
		
		// Run the filter again to check for scams in the new content
		filter();		
	}
}
// ************************* End Continuous **********************

// Combine all author blacklist arrays into one
var blacklist = scammers.concat(useless).concat(suspicious).concat(obfuscated).concat(scamHelpers);

// Display blacklist total in settings
$('span.tally').text(blacklist.length);

// *************************** For individual script pages *****************************
// If we're on a particular script page, any tab, check it and display a warning if it's suspect
if ((location.pathname.search('/show') > -1) || (location.pathname.search('/review') > -1) || (location.pathname.search('/fans') > -1) || (location.pathname.search('/issues') > -1) || (location.pathname.search('/discuss') > -1)){

	// Set the warning to use on individual scam script pages
	var pageWarning = '<div class="aboutWarning" style="width:80%; border:2px red solid; line-height:20px; color:darkred; font-size:14px; font-weight:bold;' +
		'padding:3px; margin:5px 5px -3px 5px; text-align:center;">' +
		'This script is a suspected scam. Use caution before installing it.' +
		'</div>';

	// Extract author ID from author link
	var author = parseInt($('a[user_id]').attr('user_id'));
	
	// Extract script ID from the URL
	var urlSplit = location.pathname.split('/');
	var id = urlSplit[(urlSplit.length-1)];
	
	// Check the author ID against our whitelist and scammer list
	if (whitelist.indexOf(author) > -1){
		return false;
	} else if (blacklist.indexOf(author) > -1){
		tagScamPage();
	} else if (pranks.indexOf(parseInt(id)) > -1){
		tagScamPage();
	// If the author wasn't found in any list, retrieve the script code for scanning
	} else {
		$.ajax({
			url: location.protocol + '//userscripts.org/scripts/source/' + id + '.user.js', 
			dataType: 'text', 
			cache: false,
			success: function(data){
				checkScript(data,false);
			}
		});
	}
}// ************************************** End individual script pages *****************************************

// Declare some variables as global
var cScamHide;
var suspects = [];

/* Check for an existing session cookie: Ajax Range header for bandwidth reduction measure doesn't work without a session cookie.
If one is not found, retrieve the login page once (without logging in), which creates the session cookie for us */

if (!$.cookie('_uso_session')) {
	$.ajax({
		url: location.protocol + '//userscripts.org/login', 
		dataType: 'text', 
		async: false
	});
}

// If toggle cookie doesn't exist yet, create it, so our toggle state can be saved
if (GM_getValue('hide',-5) == -5) GM_setValue('hide','1');

// Create a function to read toggle cookie
function readCookie(){cScamHide = (GM_getValue('hide') == 1) ? true : false;}

// Set the text to use when tagging suspected scam scripts
var tag = '<span style="color:darkred;font-weight:bold;line-height:50%;">' +
	'[SUSPECTED SCAM]' + 
	'</span>&nbsp; ';

// Set the expanded warning to be placed in the descriptions of suspected scam scripts
var caution = '<span style="line-height:100%;color:darkred;font-weight:bold;margin-bottom:-10px;display:block;">' + 
	'Warning: This script is a suspected scam. Use caution before installing it. <span class="authorWarn"></span>' + 
	'<br /><span class="reason" style="color:red;font-weight:bold;font-family:verdana;font-size:90%;line-height:150%;" hidden=""></span></span><br />' +
	'<span style="font-style:italic;line-height:110%;">Author\'s description:</span> ';
	
// Set update notice
var notify = ' <a style="font-size:80%" class="notify" target="_blank" href="' + thisScriptURL + '">' +
	'Filter Update Available!</a>';
	
// Insert our toggle link, along with fields to show # of detected scams and the auto-update notice
var toggleLink = "Toggle Scam Filter";
if (location.pathname == '/') toggleLink = "Scam Toggle"; 
$('th.la:contains("Name"):lt(2)')
	.append('&nbsp; ' +
	'<a href="#a" class="autoToggle">'+ toggleLink +'</a>&nbsp;(' + 
	'<span class="working" style="color:orange;text-shadow:0px 0px 5px #yellow;">[Working]</span>' + ': ' +
	'<span class="total">0</span> ' + 
	'<span class="tog"></span>' + ')' +
	'<span class="loading"></span>' +
	'<span class="upd"></span>');
	
// Set toggle link hover effect
$('a.autoToggle').hover(
	function(){
		$(this).css('color','#FFDD11');
	},
	function(){
		$(this).css('color','white');
	}
);

// Read our cookie to determine toggle state
readCookie();

// Set toggle text based on cookie
if (cScamHide){
	$('span.tog').text('hidden');
} else {
	$('span.tog').text('shown');
}

// Determine login status, which effects the location of elements on the page
var loggedIn = ($('a.mail').length > 0) ? true : false; 

// Loop through each list row
function filter(){

// Working
$('span.working').text('[Working]').css('color','orange').css('text-shadow','0px 0px 5px #yellow');
var loopsLength = $('tr[id^="scripts-"]:not(.checked)').length;

$('tr[id^="scripts-"]:not(.checked)').each(function(i,val){

	$(this).addClass('checked');

	// Extract script ID from row ID
	id = $(this).attr('id').replace('scripts-','');
	suspects[i] = id;
	

	// Get title length so we can determine where author code will be on the retrieved page 
	var offset = $('tr[id="scripts-' + id + '"] a.title').attr('title').length;
	
	// Author code is further down for logged-in users, so add to the offset if we're logged in
	offset = (loggedIn) ? (offset + 100) : offset; 
	
	offset = offset + 100;
	
	// Retrieve that section of the script's "fans" page
	$.ajax({
		url: location.protocol + '//userscripts.org/scripts/fans/' + suspects[i], 
		dataType: 'text', 
		headers: {Range: "bytes=" + (offset + 1600) + "-" + (offset + 2300)},
		cache: false,
		success: handOff1
	});
	
	function handOff1(data){
		// Hand off the retrieved description page to the checkScriptAuthor function
		checkScriptAuthor(data, suspects[i]);
			
		// Debug author offset:
		//alert(data);
		
		// If this was the last loop iteration, change "Working" text to "Done" and hide/show scams based on toggle
		if (i == loopsLength-1) $('span.working').text('Done').css('color','white').css('text-shadow','');
		toggleScams(false);
	}
});
}

// Run the filter initially
filter();

function checkScriptAuthor(data, id){
	var uid = id;
	
	// Get script author's ID from the retrieved script description page
	var auth = data.match(/;s=80&amp;default=identicon" rel="nofollow" user_id="(\d*)"\>(.*)\<\/a\>/i);
	var authorID = parseInt(RegExp.$1);
	var authorText = RegExp.$2;
	
	// Debug author offset:
	//$('p.subtitle').append('<br />' + auth + ' ' + authorID + ' ' + authorText);

	// Check if the script is in the pranks list, tag and move on if it is
	if (pranks.indexOf(parseInt(uid)) > -1){
		tagScam('prank', id, authorText, authorID);
	// If the script's author is in our whitelist, move on
	} else if (whitelist.indexOf(authorID) > -1){
		return false;
	// If the script's author matches one of our known scammers, tag the script as a suspected scam
	} else if (blacklist.indexOf(authorID) > -1){
		tagScam('scammer',id,authorText,authorID);
	// Otherwise, retrieve the script code for scanning
	} else {
	
		// Retrieve script meta data, which contains Userscripts.org's unique version stamp
		getMeta(id).success(function(data){
		
			// Extract the version stamp
			var usoVersion = parseInt(data.substr( data.search(/@uso:version/) + 17, 6) );
			
			// Get our cached data for this script, if it exists
			var cache = GM_getValue(id,0);
			
			// If there is cache data for the script, extract the cached version stamp and cached scan result
			if (cache != 0){
				var cacheVersion = cache.split(',')[0];
				var reason = cache.split(',')[1];
			}
				
			// If there is no cache data for this script, or if the cached version stamp doesn't match Userscripts.org's 
			// stamp, retrieve the script code for scanning.
			if ((cacheVersion != usoVersion) || (cache == 0)){

				$.ajax({
					url: location.protocol + '//userscripts.org/scripts/source/' + id + '.user.js', 
					dataType: 'text', 
					cache: false,
					success: function(data){
						handOff2(data, uid, authorText, authorID);
					}
				});
				
				function handOff2(data, id, authorText, authorID){
					// Hand off the retrieved script code to the checkScript function
					checkScript(data, true, id, usoVersion, authorText, authorID);
				}
				
			/* Otherwise, we have cache data that is current (the cached version stamp matches the retrieved version 
			stamp),	AND the script was determined to be a scam (a 'reason' value of '1' means NO scam, all others 
			indicate scams). Tag the scam using the cached reason. */
			} else if (reason != 1){
				tagScam(reason, uid, authorText, authorID);
			}
		});
	}
}

function getMeta(id){
	// Start meta.js retrieval, return a "promise", because JS is too retarded to handle asynchronous returns right now
	return $.ajax({
		url: location.protocol + '//userscripts.org/scripts/source/' + id + '.meta.js', 
		dataType: 'text', 
		cache: false
	});
}

function checkScript(data,isList,id,usoVersion,authorText,authorID){
	//Skip scripts that don't contain at least one instance of the word "facebook", "ultoo", or "ask.fm"
	if ( (data.search(/facebook/i) > -1) || (data.search(/ultoo/i) > -1) || (data.search(/ask\.fm/i))){
	
		// Check the script code for known scam patterns
		if (data.search(/&action\=subscribe/i) > -1){
			if (isList){var reason='&action=subscribe';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/\/ajax\/friends\/lists\/subscribe/i) > -1){
			if (isList){var reason='/ajax/friends/lists/subscribe';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/\/ajax\/follow\/follow_profile\.php/i) > -1){
			if (isList){var reason='/ajax/follow/follow_profile.php';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if ((data.search(/p,a,c,k,e,(d|r)/i) > -1) && (data.search(/eval/i) > -1)){
			if (isList){var reason='packer';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/facebook.com\/plugins\/(like|follow)\.php?href\=/i) > -1){
			if (isList){var reason='facebook.com/plugins/like.php?href=';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/(&|\?)action\=add_friend/i) > -1) {
			if (isList){var reason='paramsAdd';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if ( (data.search(/document\.getElementById\('MobileNos_'\)/i) > -1) && (data.search(/ultoo/i) > -1) ){
			if (isList){var reason='ultooNumber';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if ( (data.search(/document\.getElementsByName\('PollUserName'\)\[0\]/i) > -1) && (data.search(/ultoo/i) > -1) ){
			if (isList){var reason='ultooName';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/\/ajax\/groups\/members\/add_post.php/i) > -1) {
			if (isList){var reason='facebook post';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/iframe.*facebook\.com/i) > -1){
			if (isList){var reason='facebook iframe';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/ask\.fm\/likes.*\/add/i) > -1){ 
			if (isList){var reason='ask.fm /add';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/(facebook|twitter)\.com.*target\=/i) > -1){
			if (isList){var reason='ask.fm spam';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else if (data.search(/(ask\.fm.*(ask|preguntame|pergunt(e|a)s?))|(href\='Skype)/i) > -1){
			if (isList){var reason='ask.fm spam';tagScam(reason, id, authorText, authorID)} else{tagScamPage()}
		} else {
			var reason = 1;
		}
	} else {
		var reason = 1;
	}
	// Store cache data: current version stamp and our scan results. A reason of '1' indicates NO scam.
	GM_setValue(id,usoVersion + ',' + reason);
}

// Display warning on individual scam suspect pages
function tagScamPage(){
	$('h2.title').css('color','darkred').css('font-size','20px');
	$('div#details').append(pageWarning);
}

function tagScam(reason,id,authorText,authorID){
	
	var reasonPre = reason;
	
	// Set row selector
	var row = 'tr[id="scripts-' + id + '"] ';
	
	// Tag the suspected scam's HTML code
	$(row).addClass('scam'); 
	
	// Show reason only on hover
	$(row + 'td.script-meat').css('padding-bottom','0').hover(
		function(){
			$('span.reason', this).removeAttr('hidden');
		},
		function(){
			$('span.reason', this).attr('hidden','');
		}
	);
	
	// Hide the suspected scam if the cookie tells us the toggle is set to hide
	if (cScamHide) $(row).attr('hidden',''); 
	
	// Tag the suspected scam visually using our preset messages
	$(row + 'a.title')
		.css('color','darkred')
		.before(tag)
		.parent().children('p.desc').prepend(caution);
		
	// Set reason text
	if (reason == '&action=subscribe'){
		var reason = 'Contains url subscribe token [&action=subscribe].';
	} else if (reason == '/ajax/friends/lists/subscribe'){
		var reason = 'Contains Facebook ajax subscribe code [/ajax/friends/lists/subscribe].';
	} else if (reason == 'packer'){
		var reason = 'Contains "Packer" hidden eval code [eval(p,a,c,k...)].';
	} else if (reason == '/ajax/follow/follow_profile.php'){
		var reason = 'Contains Facebook ajax profile follow code [/ajax/follow/follow_profile.php]';
	} else if (reason == 'scammer'){
		var reason = 'This script was published by known scam or spam author ' + authorText;
	} else if (reason == 'facebook.com/plugins/like.php?href='){
		var reason = 'Contains Facebook "like" reference to specific pages [like *or* follow.php?href=].';
	} else if (reason == 'paramsAdd'){
		var reason = 'Contains Facebook friend add token for a specific user [&action=add_friend].'; 
	} else if (reason == 'ultooNumber'){
		var reason = 'Contains Ultoo.com code that may procure points for one particular mobile number.';
	} else if (reason == 'ultooName'){
		var reason = 'Contains Ultoo.com code that may procure points for one particular user name.';
	} else if (reason == 'facebook post'){
		var reason = 'Contains ajax post code that may post to a specific Facebook page.';
	} else if (reason == 'facebook iframe'){
		var reason = 'May contain spam/misleading Facebook iFrames or "Like" buttons.';
	} else if (reason == 'prank'){
		var reason = 'This script is advertised as a prank or similar. It is considered malicious even if its author does not intend harm to Userscripts.org users.';
	} else if (reason == 'ask.fm /add'){ 
		var reason = 'Contains code that may automatically add or follow specific Ask.fm pages.';
	} else if (reason == 'ask.fm spam'){ 
		var reason = 'Contains code that is likely duplicated from another script to contain a new author\'s spam links.';
	}
	
	// Append reason text
	if (reasonPre != 'scammer') $(row + 'span.reason').text(' Reason: ' + reason);
	
	// Append author name/ID
	var designation = (reasonPre == 'scammer') ? 'Known Scammer' : 'Author Name';
	$(row + 'span.authorWarn').html('<br /><span style="line-height:20px;font-weight:bold;color:darkred;"> ' + designation + ' • ' + 
		'<span style="color:darkblue">"<a style="color:darkblue;text-decoration:none;" href="' + location.protocol + '//userscripts.org/users/' + authorID + '">' + authorText + 
		'</a>"</span> • ID: <a style="color:darkred;text-decoration:none;" href="' + location.protocol + '//userscripts.org/users/' + authorID + '">' + authorID + '</a></span>');
	
	// Increment the running count of detected scams
	$('span.total').text(parseInt($('span.total:first').text()) + 1);
	
	// If all results were hidden, proceed to following page of results
	if ((!cCont) && ($('tr[id^="scripts-"]').not('[hidden]').length == 0))
		return window.location.href = location.protocol + '//userscripts.org' + $('a.next_page').attr('href');
		
	// In continuous mode, if filter resulted in too few results, fetch more even without a new scroll trigger
	//if ((cCont) && ($('tr[id^="scripts-"]').not('[hidden]').length < 10)) scroll();
	if ((cCont) && ($('div#root_footer:in-viewport').length > 0)) scroll();
}

// Set the toggle link's click function
$('a.autoToggle').click(function(){
	toggleScams(true);
});

// Make sure the toggle setting is in effect in case a toggle click occurred during the loop
toggleScams(false);

function toggleScams(click){
	// Read our cookie to determine the current toggle setting
	readCookie();
	
	/* If toggleScams is running as a result of a toggle link click, toggle hide/show setting and hide or show the scams. 
	If it's running initially (not the result of a click), simply hide/show scams based on the current setting. */
	
	if (cScamHide){
		if (click) {showScams(click)} else {hideScams(click)}
	} else {
		if (click) {hideScams(click)} else {showScams(click)}
	}
}

function hideScams(click){
	$('tr.scam').attr('hidden','');
	$('span.tog').text('hidden');
	if ((cCont) && ($('div#root_footer:in-viewport').length > 0)) scroll();
	
	// If toggleScams is running as a result of a toggle link click, toggle the cookie appropriately
	if (click) GM_setValue('hide','1');
}

function showScams(click){
	$('tr.scam').removeAttr('hidden');
	$('span.tog').text('shown');
	
	// If toggleScams is running as a result of a toggle link click, toggle the cookie appropriately
	if (click) GM_setValue('hide','0');
}

/* Auto-updater: Daily check. 
If an update is found, update notice displays on the current and next two subsequent page loads, 
then stops displaying again until following day. */

// If the auto-update cookie doesn't exist, create it.

if (cUpdate){
	if ($.cookie('ScamFilterUpdate') == null) $.cookie('ScamFilterUpdate', '1', { expires: 1, path: '/' });

	// Convert the cookie's data into a number
	var cUpdater = parseInt($.cookie('ScamFilterUpdate'));

	// If the cookie showed a number less than 4, retrieve Scam Hider's remote meta data, which includes its version number
	if (cUpdater < 4){
		
		// Retrieve the piece
		$.ajax({
			url: thisScriptMetaURL, 
			dataType: 'text', 
			cache: false,
			headers: {Range: 'bytes=-330'},
			success: checkUpdates
		});
	}
}

function checkUpdates(data){
	// Extract Scam Hider's current version number from the retrieved data...
	var currentVersion = parseFloat(data.substr( data.search(/@version/) + 13, 5));
	
	// Debug offset:
	//alert('Installed version: ' + GM_info.script.version + ' Latest version: ' + currentVersion + ' (' + data + ')');
	
	// and compare it to the installed version number.
	if (currentVersion > GM_info.script.version){

		// If the current version number retrieved is greater than the installed version number, show our update notice.
		$('span.upd').html(notify);
		
		// Set the notification link's tooltip to show installed + latest versions
		$('a.notify').attr('title','Installed version: ' + GM_info.script.version + ' Latest version: ' + currentVersion);
		
		/* If the user doesn't update and loads another script listing page, increment the cookie's number.
		This lets the user see the update notice for 3 page loads total, then doesn't bother them again for another day
		(the cookie is set to expire in 24 hours). */
		$.cookie('ScamFilterUpdate', cUpdater + 1, { expires: 1, path: '/' });
	}
}

function loadJQViewport(){
	/* Viewport - jQuery selectors for finding elements in viewport Copyright (c) 2008-2009 Mika Tuupola
	 Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
	 * Project home: http://www.appelsiini.net/projects/viewport 
	 $(":in-viewport") $(":below-the-fold") $(":above-the-top") $(":left-of-screen") $(":right-of-screen") */
	(function($) {
		$.belowthefold = function(element, settings) {
			var fold = $(window).height() + $(window).scrollTop();
			return fold <= $(element).offset().top - settings.threshold;
		};
		$.abovethetop = function(element, settings) {
			var top = $(window).scrollTop();
			return top >= $(element).offset().top + $(element).height() - settings.threshold;
		};
		$.rightofscreen = function(element, settings) {
			var fold = $(window).width() + $(window).scrollLeft();
			return fold <= $(element).offset().left - settings.threshold;
		};
		$.leftofscreen = function(element, settings) {
			var left = $(window).scrollLeft();
			return left >= $(element).offset().left + $(element).width() - settings.threshold;
		};
		$.inviewport = function(element, settings) {
			return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
		};
		$.extend($.expr[':'], {
			"below-the-fold": function(a, i, m) {
				return $.belowthefold(a, {threshold : 0});
			},
			"above-the-top": function(a, i, m) {
				return $.abovethetop(a, {threshold : 0});
			},
			"left-of-screen": function(a, i, m) {
				return $.leftofscreen(a, {threshold : 0});
			},
			"right-of-screen": function(a, i, m) {
				return $.rightofscreen(a, {threshold : 0});
			},
			"in-viewport": function(a, i, m) {
				return $.inviewport(a, {threshold : 0});
			}
		});
	})(jQuery);
}

// Add jQuery cookie functions: Makes the cookie functions above work. 
// This must load above function use for Chrome/Tampermonkey support, so it's wrapped in a function called in the beginning.
/* jQuery Cookie Plugin v1.3.1 https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl. Released under the MIT license */ 
function loadJQcookies(){
	(function (factory) {
	if (typeof define === 'function' && define.amd) {
	// AMD. Register as anonymous module.
	define(['jquery'], factory);
	} else {
	// Browser globals.
	factory(jQuery);}
	}(function ($) {
	var pluses = /\+/g;
	function raw(s) {
	return s;}
	function decoded(s) {
	return decodeURIComponent(s.replace(pluses, ' '));}
	function converted(s) {
	if (s.indexOf('"') === 0) {
	// This is a quoted cookie as according to RFC2068, unescape
	s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');}
	try {
	return config.json ? JSON.parse(s) : s;
	} catch(er) {}}
	var config = $.cookie = function (key, value, options) {
	// write
	if (value !== undefined) {
	options = $.extend({}, config.defaults, options);
	if (typeof options.expires === 'number') {
	var days = options.expires, t = options.expires = new Date();
	t.setDate(t.getDate() + days);}
	value = config.json ? JSON.stringify(value) : String(value);
	return (document.cookie = [
	config.raw ? key : encodeURIComponent(key),	'=',
	config.raw ? value : encodeURIComponent(value),
	options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
	options.path ? '; path=' + options.path : '',
	options.domain ? '; domain=' + options.domain : '',
	options.secure ? '; secure' : ''
	].join(''));}
	// read
	var decode = config.raw ? raw : decoded;
	var cookies = document.cookie.split('; ');
	var result = key ? undefined : {};
	for (var i = 0, l = cookies.length; i < l; i++) {
	var parts = cookies[i].split('=');
	var name = decode(parts.shift());
	var cookie = decode(parts.join('='));
	if (key && key === name) {
	result = converted(cookie);
	break;}	if (!key) {
	result[name] = converted(cookie);}}
	return result;};
	config.defaults = {};
	$.removeCookie = function (key, options) {
	if ($.cookie(key) !== undefined) {
	// Must not alter options, thus extending a fresh object...
	$.cookie(key, '', $.extend({}, options, { expires: -1 }));
	return true;}
	return false;};}));
}
// End jQuery Cookie Plugin *************************************************

});