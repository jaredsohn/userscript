// ==UserScript==
// @name        Slim Listings for KickassTorrents
// @namespace   75e24e576c44bd401537a32a877362ed
// @icon        https://monkeyguts.com/icon/87.png
// @include     http*://*kat.ph/*
// @include     http*://*kickass.to/*
// @include     http*://*ka.tt/*
// @include     http*://*kickassunblock.info/*
// @include     http*://*katproxy.com/*
// @version     3.2.5
// @description Several useful features for KickassTorrents.
// @require     http://code.jquery.com/jquery-latest.min.js 
// @require     http://yui.yahooapis.com/3.8.0/build/yui/yui-min.js
// @updateURL   https://monkeyguts.com/87.meta.js?c
// @downloadURL https://monkeyguts.com/87.user.js?c
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @homepageURL https://monkeyguts.com/code.php?id=87
// ==/UserScript==

$(document).ready(function(){

//Declare globals
var cSlimmed, cTags, cSide, cExpanded, cFloated, cOpen, pageType, logged, fspace, headSize, bmType, sel, buffer = 0;

//Load prerequisites **************
loadJQcookies(); //jQuery cookies (this must load prior to jQuery cookie use for Chrome support).
loadJQregex(); //jQuery regex selector.
loadJCSS(); //JS -> CSS definition. 

//Execute **************
cookieInit();
readState();
removeAds();
addToggles();
loadSlim();
attachSpacer();
forceHomeLinks();

if (pageType == "torrent") setCollapse();

if (logged){
	$('#navstyle').appendTo('header');
}
	
if (pageType == "home"){
	fixTagCloud();
	loadTog();
	if (cFloated) setFloatSpacer();
}

if (!logged){
	appendSidebar();
	sidebarInit();
}

if (cFloated){
	loadFloat();
	$('.float').text('unfloat').click(function(){
		$.cookie('float','0', { expires: 730, path: '/' });
		location.reload(); 
	});
} else {
	$('.float').text('float').click(function(){
		$.cookie('float','1', { expires: 730, path: '/' });
		location.reload(); 
	});
}

// End execute ********************************************

function forceHomeLinks(){
	//KAT disabled torrent download links directly from the home page, so re-create them.
	if (pageType == "home"){
		$('.torrentnameCell').each(function(){
			var linkHtml = $(this).find('a.torType').attr('href');
			var linkTorrent = '/torrents' + linkHtml.replace('.html','/');
			$(this).find('.iaconbox.floatright').append('<a class="idownload icon16 askFeedbackjs" href="' + linkTorrent + '" title="Download torrent file"><span></span></a>');
		});
	}
}

function attachSpacer(){
	//Empty DIV that forces content down while Float is enabled, so floating banner doesn't overlap content.
	//setFloatSpacer() sets its height.
	$('.mainpart').before('<div class="fspace"></div>');
	fspace = $('.fspace');
}

function addToggles(){
	//Add toggle links to banner
	$('div.headmenu ul').append('<li><a class="float" href="#" style="width:60px;"></a></li><li><a class="slim" href="#"></a></li>'); 
}

function cookieInit(){
	//Expire old cookies with paths set to individual pages (clears out deprecated cookies left by previous versions of this script)
	if (!location.pathname == "/"){
		var past=new Date();
		past.setDate(past.getDate()-5);
		pathName = location.pathname;
		$.cookie('side', '1', { expires: past, path: pathName }); 
		$.cookie('tags', '1', { expires: past, path: pathName }); 
		$.cookie('slimmed', '1', { expires: past, path: pathName }); 
	}

	//If our cookies don't exist yet, create them
	if ($.cookie('slimmed') == null) $.cookie('slimmed', '1', { expires: 730, path: '/' }); 
	if ($.cookie('tags') == null) $.cookie('tags', '1', { expires: 730, path: '/' }); 
	if ($.cookie('side') == null) $.cookie('side', '1', { expires: 730, path: '/' }); 
	if ($.cookie('expanded') == null) $.cookie('expanded', '0', { expires: 730, path: '/' });
	if ($.cookie('float') == null) $.cookie('float', '1', { expires: 730, path: '/' });
	if ($.cookie('open') == null) $.cookie('open', '0', { expires: 730, path: '/' });
}

function readState(){

	//Read cookies
	cSlimmed = ($.cookie('slimmed') == 1) ? true : false;
	cTags = ($.cookie('tags') == 1) ? true : false;
	cSide = ($.cookie('side') == 1) ? true : false;
	cExpanded = ($.cookie('expanded') == 1) ? true : false;
	cFloated = ($.cookie('float') == 1) ? true : false;
	cOpen = ($.cookie('open') == 1) ? true : false;
	
	//Determine login state
	logged = ($('a[href="/auth/logout/"]').length > 0) ? true : false; 
	
	//Determine page type
	if (location.pathname == "/"){
		pageType = "home";
	} else if (location.pathname.search('/usearch') > -1){
		pageType = "search";
	} else if (location.pathname.search('/bookmarks') > -1){
		pageType = "bookmarks";
		bmType = $('a.selectedTab span').text().toLowerCase(); // Determine the Bookmark page sub-type
	} else if (($('h2:contains("results")').length > 0) || ($('h1:contains("results")').length > 0) && (location.pathname.search('/usearch') < 0) && (location.pathname != "/") && (location.pathname.search('.html') < 0) && (location.pathname != "/browse/") && (location.pathname.search('/upload') < 0) && (location.pathname.search('/blog') < 0) && (location.pathname.search('/community') < 0) && (location.pathname.search('/faq') < 0)){
		pageType = "browse";
	} else if (($('.magnetlinkButton').length > 0) && (location.pathname.search('.html') > -1) && ($('h2:contains("Sharing Widget")').length > 0)){
		pageType = "torrent";
	} else {
		pageType = "other";
	} 
}

function removeAds(){
	$('a.partner1Button').remove(); //Remove fake blue promo download links
	$('div.advertising').attr('hidden',''); //Hide some ad fields
	$('div.tabs:contains("Sponsored")').remove(); //Remove "Sponsored" tab from search results ('hidden' doesn't work for this)
	$('div.vuze').remove(); $('div a:contains("Torrentz")').parent('div').remove(); //Remove torrentz.eu ads
	$('div:regex(id,_[A-Za-z0-9]{32})').attr('hidden',''); //Hide divs with 128-bit IDs (32 hex chars, eg. "_39ecb76dd457e5ac33776fdf11500d56")

	//Sabotage Torch advert bar by creating its "already shown recently" cookie beforehand
	$.cookie('_spc', '1', { expires: 730, path: '/' });

	//Sabotage popups by redefining the window.open method used to generate popup windows
	unsafeWindow.open = function(url){
		return {
			blur: function() {return false;},
			focus: function() {return false;}
		}
	}
	
	//Remove "RealPlexor" iFrame, also disabling its Ajax calls every 60 seconds for live push notices. 
	//It's either for ads, stats, or unused, and created large empty spaces at page ends.
	$('iframe[src^="https://notify.kat.ph"]').remove();
	$('iframe[src^="https://notify.kickass.to"]').remove();
	$('iframe[src^="http://notify.kickass.to"]').remove();
	
	//When using kickassunblock.info, remove its ads and excess whitespace
	if (location.hostname == "kickassunblock.info"){
		$('body br:lt(2)').remove();
		$('body center:first').remove();
		$('div[id^="footer"]').remove();
	}
}

function fixTagCloud(){ 
	//Remove login link from tag cloud hider, <a> to <div> (prevents odd error), add .tcTog/.tcTogChar classes for easier referencing
	if (logged){
		$('a.line50perc.showmore.botmarg0')
			.replaceWith('<div class="line50perc showmore botmarg0 tcTog"><span class="font80perc tcTogChar">▼</span></div>');
	} else {
		$('a.line50perc.showmore.botmarg0.ajaxLink')
		.replaceWith('<div class="line50perc showmore botmarg0 ajaxLink tcTog"><span class="font80perc tcTogChar">▼</span></div>');
	}
}

//Tag cloud hide and show functions
function tcShow(initial){
	$('#tagcloud').removeAttr('hidden');
	$('.tcTogChar').html('▲');
	$('.tcTog').click(function(){tcHide(false)});
	if (!initial) $.cookie('tags', '1', { expires: 730, path: '/' });
	if (cFloated) setFloatSpacer();
}

function tcHide(initial){
	$('#tagcloud').attr('hidden','');
	$('.tcTogChar').html('▼');
	$('.tcTog').click(function(){tcShow(false)});
	if (!initial) $.cookie('tags', '0', { expires: 730, path: '/' });
	if (cFloated) setFloatSpacer();
}

//Do the tag cloud stuff
function loadTog(){

	//Move the tag cloud and its toggle strip into the <header> element (simplifies floating)
	$('#tagcloud').appendTo('header');
	$('.tcTog').appendTo('header');
	
	//Load tag cloud display preference from cookie
	if (cTags){
		tcShow(true);
	} else {
		tcHide(true);
	}
	
	//Set tag cloud toggle click function
	$('.tcTog').click(function(){
		if (cTags){
			tcHide(false);
		} else {
			tcShow(false);
		}
	});
}

//Sidebar hide/show functions
function sbHide(){
	$("#sidebar").hide();
	$("#hidesidebar").hide();
	$("#showsidebar").show();
}

function sbShow(){
	$("#sidebar").show();
	$("#hidesidebar").show();
	$("#showsidebar").hide();
}

function appendSidebar(){
	//Append the sidebar hider and shower if we're logged out (both hidden initially, sidebarInit() will unhide one).
	if ($('a#showsidebar').length == 0){
		$('td.sidebarCell').prepend('<a class="showSidebar" id="showsidebar" style="display:none;"></a>');
		$('div#sidebar').addClass('sidebarLogged').addClass('font11px');
	}

	if ($('a#hidesidebar').length == 0){
		$('td.sidebarCell').prepend('<a class="hideSidebar" id="hidesidebar" style="display:none;"></a>');
		$('div#sidebar').addClass('sidebarLogged').addClass('font11px');
	}
	
	//Set the sidebar toggle function
	$('.showSidebar').click(function(){
		$.cookie('side', '1', { expires: 730, path: '/' });
		sbShow();
	});

	$('.hideSidebar').click(function(){
		$.cookie('side', '0', { expires: 730, path: '/' });
		sbHide();
	});
}

function sidebarInit(){
	//Load sidebar preference from cookie on page load
	if (cSide){
		sbShow();
	} else {
		sbHide();
	}
}

function setFloatSpacer(){ 
	headSize = parseInt($('header').css('height').replace('px',''));
	fspace.css('height', (headSize + buffer) + 'px');
}

function loadFloat(){
	setFloatSpacer();
	$('header').css('position','fixed').css('width','100%').css('z-index','50');
}

function loadSlim(){
	//Load slim preference from cookie on page load
	if (cSlimmed){ 
		$('.slim').html('unslim');
		slimify(true);
	} else {
		$('.slim').html('slimify');
	}

	//Set toggle link's click function
	$('.slim').click(function(){ 
		if (cSlimmed){
			$.cookie('slimmed', '0', { expires: 730, path: '/' });
			deslim();
		} else {
			$.cookie('slimmed', '1', { expires: 730, path: '/' });
			$('.slim').html('unslim');
			slimify(false);
		}
	})
}

function deslim(){
	location.reload(); 
} 

function toggleFiles(){
	if ($('table#ul_top').css('display') == "table"){
		$('div.torrent_files span.folderopen').removeClass('folderopen').addClass('folder');
		$('table#ul_top').css('display','none');
		$.cookie('open', '0', { expires: 730, path: '/' });
	} else {
		$('div.torrent_files span.folder').removeClass('folder').addClass('folderopen');
		$('table#ul_top').css('display','table');
		$.cookie('open', '1', { expires: 730, path: '/' });
	}
}

function setCollapse(){
	$('div.torrent_files a.dotted').removeAttr('onclick').attr('href','#null');
	if (cOpen){
		$('div.torrent_files span.folder').removeClass('folder').addClass('folderopen');
		$('table#ul_top').css('display','table');
	} else {
		$('div.torrent_files span.folderopen').removeClass('folderopen').addClass('folder');
		$('table#ul_top').css('display','none');
	}
	$('div.torrent_files a.dotted').click(function(){
		toggleFiles();
	});
}

function slimify(initial){
	
	//Reduce header sizes
	$('h1').css('font-size','18px').css('font-weight','bold');
	$('h2').css('font-size','16px').css('font-weight','bold');

	//Reduce the top bar's various elements
	$('a.logo').css('background-size','98px'); //logo size
	$('div.headmainpart').css('height','50px'); //height of the bar itself
	$('div.toppad10px').css('padding-top','3px'); //search wrapper (contains bar, button, "advanced" link) top padding
	$('#search_box').css('margin','0px 0px 0px -2px').css('font-size','14px'); //search box size
	$('.headmainpart a.logo').css('height','75px'); //reduce logo field
	
	//If this is the result of a SLIMIFY click, reload tag cloud, float, change slim toggle 
	if (!initial){
		if (pageType == "home") loadTog();
		if (cFloated) loadFloat();
		$('.slim').click(function(){ 
			$.cookie('slimmed', '0', { expires: 730, path: '/' });
			deslim();
		});
	}
	
	//Misc display tweaks for various scenarious. This part is still messy... **************
	//$('table.data:first').css('margin-top','##px') moves main content up/down independent of sidebar
	//On pages with tabs (like search), tabs may also need tweaking, use $('.tabs').css('margin-top','##px')
	if ((logged) && (cFloated)){
		//Attach logged-in nav bar to floated header element
		if (pageType == "home"){
			$('#navstyle').insertBefore($('#tagcloud'));
		} else { 
			$('#navstyle').appendTo($('header'));
		}
		$('.tabs').css('margin-top','-10px');
		if (pageType == "browse") $('table.data:first').css('margin-top','-20px');
		if (pageType == "search") $('table.data:first').css('margin-top','-8px');
		if (pageType == "home")	$('table.data:first').css('margin-top','-5px');
	} else {
		if (!cFloated && logged){
			$('.tabs').css('margin-top','-10px');
			if (pageType == "home") $('table.data:first').css('margin-top','0px');
		} else {
			$('.tabs').css('margin-top','-40px'); 
		}
	}
	
	if (!logged && pageType == "torrent") $('.tabs').css('margin-top','-25px');
	if (logged && pageType == "bookmarks") $('div.tabs').css('margin-top','-5px');
	
	if (logged){
		if (pageType != "other") $('div.lightgrey.font11px').appendTo($('#navstyle')).css({'color':'white','padding':'5px 0px 0px 5px'});
		if (pageType == "torrent"){
			//Make author/download count into a single line, tweak colors for contrast with new location in logged-in nav bar
			$('div.lightgrey.font11px.line160perc:contains("Downloaded") br').replaceWith('|');
			$('div.lightgrey.font11px.line160perc:contains("Downloaded")').removeClass('lightgrey');
			$('div.font11px.line160perc:contains("Downloaded") a.plain').css('color','white');
			$('div.font11px.line160perc a').css('color','white');
			//Remove big thumbs
			$('div.floatRight.inlineblock span.block.relative').remove();
			$('div.floatLeft.inlineblock span.block.relative').remove();
		}
		if (pageType == "browse") $('table.data:first').css('margin-top','-10px');
		if (pageType == "search") $('table.data:first').css('margin-top','-5px');
	} else {
		$('div.floatRight.inlineblock span.block.relative').remove();
		$('div.floatLeft.inlineblock span.block.relative').remove();
		$('div.lightgrey.font11px.line160perc:contains("Downloaded") br').replaceWith('|');
	}
	//End misc display tweaks*************
	
	//Reduce header real-estate for homepage and listings
	if ((pageType == "home") || (pageType == "browse") || (pageType == "search")){
		$('nav.searchTags').remove();
		var header = ((pageType == "home") && (!logged)) ? 'h2' : 'h2';
		var th = $('th:first-of-type'); //Grab first column header from each table (will be "torrent name")
		if ($(header).length < 1) header = 'h1';
		$(header).each(function(i,val){  //Grab/loop through each H1
			var h2content = $(this).html(); //Grab H2 content
			//Replace corresponding column header (from "th" array grabbed just before loop) with H2 content
			var thFont = 'font-family:Tahoma,Verdana,Arial,Helvetica,sans-serif; font-size:16px; color:#99742E; font-weight:bold; letter-spacing:0; position:static;';
			h2content = h2content.replace('class="plain"', 'class="plain nopad" style="' + thFont + '" '); 
			$(th[i]).replaceWith('<th class="plain width100perc nopad" style="' + thFont + 'text-transform:none; line-height:30px; top:0px;">' + h2content + '</th>');  
			$(this).remove();  //Remove the H1
		});	
		$('.rsssign').css('margin-left','3px').css('padding','0').css('position','static'); //Re-space the RSS icon away from the header text
		if (pageType == "home") //Fix homepage user bookmarks
			$('table.data tr.firstr a:contains("Users bookmarks")').parents('th').removeClass('width100perc');
	} else if (pageType == "torrent"){
		var th = $('th:first-of-type');
		$('h1:contains("Related Torrents"):first').each(function(i,val){  //Grab/loop through each H1
			var h2content = $(this).html(); //Grab H2 content
			//Replace corresponding column header (from "th" array grabbed just before loop) with H2 content
			$(th[i]).replaceWith('<th class="width100perc nopad" style="font-size:14px;text-transform:none;font-weight:normal;line-height:25px;top:25px;">' + h2content + '</th>');  
			$(this).remove();  //Remove the H1
		});	
	} else if (pageType == "bookmarks"){
		if (bmType != "users") $('table.data').css('margin-top','-10px');
		if (bmType == "torrents"){
			var h2 = $(header + ':contains("results")');
			var th = $('th.width100perc.nopad');
			var h2content = $(h2).html(); 
			$(th).replaceWith('<th class="width100perc nopad" style="font-size:19px;text-transform:none;font-weight:normal;line-height:25px;top:25px;">' + h2content + '</th>');  
			$(h2).remove();  
			$('.rsssign').css('margin-left','10px');
		} else if (bmType == "community"){
			var h2 = $(header);
			var th = $('th.width100perc');
			$(h2).each(function(i,val){
				var h2content = $(this).html();
				$(th[i]).replaceWith('<th class="width100perc"  style="font-size:19px;text-transform:none;font-weight:normal;line-height:25px;top:25px;">' + h2content + '</th>'); 
				$(this).remove();
			});
		}
	} else { //On other pages, just reduce the H2 size
		$('h1').css('font-size','20px');
	}
	
	//Reduce table spacing everywhere
	if (!logged) $('table.data:first').css('margin-top','-3px');
	if (bmType != "users") $('table.data:gt(0)').css('margin-top','-8px');
	
	//Single-line browse/search/bookmarks
	if ((pageType == "browse") || (pageType == "search") || (bmType == "users") || (bmType == "torrents") || (bmType == "community")){
		//Get & loop through table rows, exclude first (column headers)
		if (bmType == "users") {
			sel = 'tr[id^="torrent_"]';
		} else if (bmType == "torrents"){
			sel = 'table.data.width100perc.clear tr';
		} else {
			sel = 'tr[id^="torrent_"]';
		}
		$(sel).each(function(){
			var katVer = $('span.font11px.lightgrey.block', this) //Verified uploader?
				.html().search('verifup.png') < 0 ?  "" : "\u2605"; //Add star character if yes
				
			var katCatAuth = //Start constructing second line of tooltip
				'\n[' + //+line break/bracket before
				$('span.font11px.lightgrey.block', this) //Get category/author
					.text() //Limit to text (not code)
					.replace('\n','') //Remove existing line break
					.trim() //Trim trailing spaces
					.replace('&nbsp;','') //Remove nbsp's
					.replace(/\s+/g, ' ') //Remove consecutive spaces
					.replace(' in ', katVer + ' in Category: ') + //Insert some text
				']'; //Add closing bracket
			
			$('span.font11px.lightgrey.block', this).attr('hidden','').removeClass('block'); //Hide second line
			
			//Tweak margins to prevent mysterious icon clipping -- apparently no longer an issue, so this is now commented out
			//$('a.torType', this) 
				//.css('margin-left', '-18px')
				//.css('margin-right', '5px'); 
			
			//Grab torrent name
			var katName = $('div.torrentname', this).find('a.normalgrey.font12px.plain.bold').text(); 
			
			//Truncate torrent link instead of breaking to new line
			$('div.torrentname', this)
				.css('font-size', '10px') 
				.css('text-overflow', 'ellipsis')
				.css('overflow', 'hidden')
				.css('white-space', 'nowrap'); 
			
			//Set main torrent link's tooltip
			$('a.normalgrey.font12px.plain.bold', this) 
				.attr('title', katName + katCatAuth).css('font-size', '12px'); 
		});
		
		// Set listing tables to truncate long titles
		$('table.data').css('table-layout','fixed').css('width','100%')
			.find('tr.firstr th.width100perc').removeClass('width100perc').css('width','80%');
		$('table.data th.center a').css('position','static');
		$('table.data th.center:contains("size")').css('width','70px');
		$('table.data th.center:contains("files")').css('width','40px').find('span.files').css('margin-left','-5px');
		$('table.data th.center:contains("age")').css('width','70px');
		$('table.data th.center:contains("seed")').css('width','50px');
		$('table.data th.center:contains("leech")').css('width','50px');
		$('table.data tr th').css('padding','0');

		// Re-space RSS icon away from header on certain pages
		if ((bmType != "users") && (bmType != "torrents") && (bmType != "community")){
			$('.rsssign').css('margin-right','20px');
		}
		
		var secTogLink = '<span style="font-family:verdana;font-size:12px;text-align:center;">[<a style="font-weight:bold;text-align:center;position:static;" class="plain secTog nopad" href="#aza"></a>]</span>';
		
		// Messy -- "Users" Bookmark page adjustments & other [Expand] link insertions
		if (bmType == "users"){
		
			// [expand] link for Users bookmark page
			$('h1:contains("Bookmarked Users")').append(secTogLink);
			
			// Slim down bookmarks for users with no torrents: 
			// remove big "Empty" sign and whitespace, replace with little [no torrents] tag on user badge
			$('center h3:contains("Empty")').parents('center').prev().prev().children('div.badge')
				.children('div.badgeInfo').children('span.font10px.lightgrey.aclColor_1')
				.append(' <b>[no torrents]</b>');
			var center = $('center h3:contains("Empty")').text('');
			$('div.floatleft.center br').remove();
			
			// Smaller "remove" buttons; that and "added" notices moved into tidy user badge area
			var added = $('small.lightgrey.inlineblock.toppad5px');
			var remLinks = $('a.iremfrombook.icon16.textButton.ajaxLink');
			$('div.badgeInfo').each(function(i,val){
				$(this).append(remLinks[i]);
				$(remLinks[i], this).text('remove').prepend('<span></span>').css('z-index','100');
				$(remLinks[i]).children('span').css('z-index','0').css('display','inline').css('padding-left','16px');
				$(this).append(added[i]);
			});
			$('div.floatleft.center').parent().children('br').remove();
		} else if (pageType == "search"){
			//Find a place to put the [expand] link on search pages, which don't always contain the same elements
			if ($('.rsssign').length > 0){
				$('.rsssign').after(secTogLink);
			} else if ($('tr.firstr a.plain').length > 0){
				$('tr.firstr a.plain').after(secTogLink);
			}
		} else if ((bmType != "torrents") && (bmType != "community")){
			$('.rsssign').after(secTogLink);
		} else {
			$('h2').append(' ' + secTogLink);
		}
			
		// Remove excess whitespace/tone down giant Bookmark button on search results with media info 
		$('div.torrentMediaInfo').prev('br').remove();
		$('div.torrentMediaInfo').next('div.tabs').css('margin-top','-15px');
		if (!logged) $('div.torrentMediaInfo').css('margin-top','-20px');

		if (pageType == "search") {
			$('table.data a.ajaxLink.siteButton.giantButton')
				.removeClass('giantButton')
				.css('font-size','12px')
				.css('padding','3px')
				.css('vertical-align','middle')
				.insertAfter('tr.firstr a.plain[href^="/"]').before('&nbsp; '); 
			$('div.buttonsline').remove();
		}
		
		// Set expanded state based on cookie
		if (cExpanded){
			$('.secTog').text('slimmer');
			$('span.font11px.lightgrey').removeAttr('hidden').addClass('block');
		} else {
			$('.secTog').text('expand');
			$('span.font11px.lightgrey.block').attr('hidden','').removeClass('block');
		}
		$('.secTog').click(function(){
			toggleExpand();
		});
	}	
}

function toggleExpand(){
	cExpanded = ($.cookie('expanded') == 1) ? true : false;
	if (cExpanded){
		$('span.font11px.lightgrey.block').attr('hidden','').removeClass('block');
		$.cookie('expanded', '0', { expires: 730, path: '/' })
		$('.secTog').text('expand');
	} else {
		$('span.font11px.lightgrey').removeAttr('hidden').addClass('block');
		$.cookie('expanded', '1', { expires: 730, path: '/' })
		$('.secTog').text('slimmer');
	}
}

// Add jQuery cookie functions: Makes the cookie functions above work. This must load above function use for Chrome/Tampermonkey support. 
// From https://github.com/carhartl/jquery-cookie. Compressed with http://closure-compiler.appspot.com/home
function loadJQcookies(){var e=jQuery,h=document,k=function(b){return b},m=function(b){return decodeURIComponent(b.replace(l," "))},
l=/\+/g,d=e.cookie=function(b,c,a){if(void 0!==c){a=e.extend({},d.defaults,a);null===c&&(a.expires=-1);if("number"===typeof a.expires){
var f=a.expires,g=a.expires=new Date;g.setDate(g.getDate()+f)}c=d.json?JSON.stringify(c):String(c);return h.cookie=[encodeURIComponent(b),
"=",d.raw?c:encodeURIComponent(c),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+ a.path:"",a.domain?"; domain="+
a.domain:"",a.secure?"; secure":""].join("")}c=d.raw?k:m;a=h.cookie.split("; ");f=0;for(g=a.length;f<g;f++){var j=a[f].split("=");
if(c(j.shift())===b)return b=c(j.join("=")),d.json?JSON.parse(b):b}return null};d.defaults={};e.removeCookie=function(b,c){
return null!==e.cookie(b)?(e.cookie(b,null,c),!0):!1}}

// Initialize JS -> CSS Stylesheet definition (Yahoo plugin, included via @require line above). 
// For sidebar hide button.
function loadJCSS(){
	YUI().use('stylesheet', function (Y) { 
		var css = 
		".hideSidebar {background:url(//kastatic.com/images/sidebarVis.png) no-repeat 0 -24px;" +
			"display:block; width:219px; height:21px;" + 
			"margin:0 0 -16px 0; float:right; cursor:pointer; cursor:hand;" + 
			"color:#fff; text-decoration:none; border:2px solid #fff}" +
		".showSidebar {background:url(//kastatic.com/images/sidebarVis.png) no-repeat 0 -54px;" + 
			"display:block; width:31px; height:126px;" + 
			"margin:2px 10px 0 5px; float:right; cursor:pointer; cursor:hand}" +
		".hideSidebar:hover {background:url(//kastatic.com/images/sidebarVis.png) no-repeat 0 0}" +
		".showSidebar:hover {background:url(//kastatic.com/images/sidebarVis.png) no-repeat -32px -54px}";
		sheet = new Y.StyleSheet(css);
	});
}

//Add jQuery regex selector. From http://james.padolsey.com/javascript/regex-selector-for-jquery
function loadJQregex(){
	jQuery.expr[':'].regex = function(elem, index, match) {
		var matchParams = match[3].split(','),
			validLabels = /^(data|css):/,
			attr = {
				method: matchParams[0].match(validLabels) ? 
							matchParams[0].split(':')[0] : 'attr',
				property: matchParams.shift().replace(validLabels,'')
			},
			regexFlags = 'ig',
			regex = new RegExp(matchParams.join('').replace(/^\s+|\s+$/g,''), regexFlags);
		return regex.test(jQuery(elem)[attr.method](attr.property));
	}
}

}); 