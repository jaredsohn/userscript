// ==UserScript==
// @name          BBC news fix to awful new website
// @namespace     www.bbc.co.uk
// @description   cleans up the new bbc layout
// @include       http://www.bbc.co.uk/news*

// ==/UserScript==



function cleanup() {

	changeBackgroundSize();
	createLeftSideMenu();
	createClickMap();
	kill(window.document,document.getElementById('av-stories-best'),null,null,null);
	kill(window.document,document.getElementById('special-event-promotion-best-promo-module-hyper'),null,null,null);
	kill(window.document,document.getElementById('features'),null,null,null);
	kill(window.document,document.getElementById('promotional-content'),null,null,null);
	kill(window.document,document.getElementById('page-bookmark-links-head'),null,null,null);
	kill(window.document,document.getElementById('container-programme-promotion'),null,null,null);
	kill(window.document,document.getElementById('nav'),null,null,null);
	kill(window.document,document.getElementById('sub-nav'),null,null,null);
	kill(window.document,document.getElementById('promo-best'),null,null,null);



	cleanGeographicNewsDigests();

	
	removeimages('special-reports');
	removeimages('more-from-bbc-news');
	removeimages('more-from-business');
	removeimages('more-from-technology');
	removeimages('more-from-entertainment');
	removeimages('category-digests');


	move('also-in-the-news', 'most-popular-promotion',true);
	move('more-from-bbc-news', 'container-top-stories-with-splash',true);
	move('special-reports', 'more-from-bbc-news_2',true);

	move('more-from-business', 'other-top-stories',true);	
	move('more-from-technology', 'other-top-stories',true);
	move('more-from-entertainment', 'other-top-stories',true);
	move('category-digests', 'other-top-stories',true);


};

function changeBackgroundSize(){
	var bgDiv = document.createElement('div');
	var bgImg = document.createElement('img');
	
	bgImg.id = 'background';
	bgImg.src = 'http://news.bbcimg.co.uk/view/1_0_6_2/cream/hi/news/img/red-masthead.png';
	bgDiv.appendChild(bgImg);
	document.getElementsByTagName("body")[0].appendChild(bgDiv);
	
};

function createLeftSideMenu() {
	var mainTable = document.createElement('div');
	mainTable.id = 'mytable';
	mainTable.innerHTML = createMenuTable();
	document.getElementsByTagName("body")[0].appendChild(mainTable);
};

function getSubItems(parentNodeName, itemType, newClassName)
{
	var resultItems = document.createElement('div');
	
	var parentNode = document.getElementById(parentNodeName);
	if (parentNode === null )
	{
		return ' ';	
	}
	var childItems = parentNode.getElementsByTagName(itemType);
	var childItemsLenght = childItems.length;
	console.log(parentNodeName + '.childItemsLenght  - ' + childItemsLenght);
	
	//for (var loop=childItemsLenght - 1 ;loop > - 1;loop--)
	for (var loop=0 ;loop<childItemsLenght;loop++)
	{	
		childItems[0].className =newClassName;
		resultItems.appendChild(childItems[0]);
	}
	console.log('resultItems.innerHTML = '  + resultItems.innerHTML);
	return resultItems.innerHTML;
};


function createMenuTable()
{

return '  <table class="oldMenuTable" cellspacing="0" cellpadding="0" border="0" width="200">'+
'    <tbody><tr>'+
'      <td width="275" valign="top">'+
'<div class="lhs">'+

	'<div class="o">'+
	'<img border="0" width="92" height="54" usemap="#world_map" alt="" src="http://news.bbcimg.co.uk/nol/shared/img/nav/v3_map_world_rb.gif">'+
	'</div>'+
			getSubItems('nav', 'li','lhsb') + 
			'<div class="lhsdl">-----------------</div>'+
			getSubItems('sub-nav', 'li','lhsb') +

'<div class="relatedbbcsites">'+
'<h3>Related BBC sites</h3>'+
'<ul>'+
'	<li class="lhsl"><a title="Home of BBC Sport on the internet" href="http://news.bbc.co.uk/sport1/hi/default.stm">Sport</a></li>'+
'	<li class="lhsl"><a title="Weather information from around the world" href="http://www.bbc.co.uk/weather/">Weather</a></li>'+
'	<li class="lhsl"><a title="BBC On This Day" href="http://www.bbc.co.uk/onthisday">On This Day</a></li>'+
'	<li class="lhsl"><a title="Editors Blog" href="http://www.bbc.co.uk/blogs/theeditors/">Editors Blog</a></li>'+
'	<li class="lhsl"><a title="BBC World Service" href="http://www.bbc.co.uk/worldservice/">BBC World Service</a></li>'+
'</ul>'+
'</div>'+
'		<!-- SiteVersions -->'+
'	<img src="http://stats.bbc.co.uk/o.gif?~RS~s~RS~News~RS~t~RS~HighWeb_Index~RS~i~RS~0~RS~p~RS~45249~RS~a~RS~International~RS~u~RS~/2/hi/talking_point/default.stm~RS~r~RS~http://www.bbc.co.uk/news/~RS~q~RS~~RS~z~RS~43~RS~" id="livestats" alt="">'+
'</td><td width="14" valign="top" class="gffffff"><img border="0" width="14" vspace="0" hspace="0" height="1" alt="" src="http://news.bbcimg.co.uk/shared/img/o.gif"></td>'+

'    </tr>'+
'  </tbody></table>';
		
};



function createClickMap()
{
	var world_mapHolder = document.createElement('div');
	world_mapHolder.innerHTML = getClickMap();
	var node = document.getElementById('mytable');
	node.appendChild(world_mapHolder);
	

};

function getClickMap()
{
return '<map id="world_map" name="world_map">'+
'  	<area href="http://www.bbc.co.uk/news/world/latin_america/" shape="rect" coords="0,28,33,53" alt="Latin America" />'+
' 	<area href="http://www.bbc.co.uk/news/world/us_and_canada/" shape="rect" coords="0,0,34,26" alt="US & Canada" />'+
'	<area href="/2/hi/africa/default.stm" coords="37,25,37,51,52,51,52,33,48,33,48,31,40,31" shape="poly" alt="Africa">'+
'	<area href="/1/hi/europe/default.stm" coords="35,2,66,2,66,12,56,12,56,20,37,20" shape="poly" alt="Europe">'+
'	<area href="/1/hi/middle_east/default.stm" coords="44,24,57,24,58,50,55,50,55,31,52,28,44,28" shape="poly" alt="Middle East">'+
'	<area href="/1/hi/south_asia/default.stm" coords="60,24,67,49" alt="South Asia">'+
'	<area href="/1/hi/asia-pacific/default.stm" coords="71,2,89,3,88,51,69,51,69,20,62,20,62,16,71,16" shape="poly" alt="Asia Pacific">'+
'</map>';


};


function move(itemToMove, newPosition, removeOld) {

	var source = document.getElementById(itemToMove);
	if (source === null)
	{
		//console.log(itemToMove + ' not found, returning');
		return;
	}

	console.log('move/ ' + source.id + '----' + source.className);
	var dest = document.getElementById(newPosition);
	if (dest === null)
	{
		//console.log(newPosition + ' not found, returning');
		return;
	}
	console.log('move/ dest - ', dest.id);

	var newContent = document.createElement('div');

	newContent.id = source.id;
	newContent.className = source.className;
	newContent.innerHTML = source.innerHTML;
	dest.appendChild(newContent);

	if(removeOld) 
	{	source.id = source.id+'_old';
		kill(window.document,document.getElementById(itemToMove+'_old'));
	}	
};



function cleanGeographicNewsDigests(){
	
	//console.log('about to get geolocations');
	//var geoLocations= document.getElementById('geo-world-news-digest').getElementsByClassName('geo-digest-section-header');
	var geoLocationsNode= document.getElementById('geo-world-news-digest');
	console.log('geoLocationsNode = ' + geoLocationsNode);
	if (geoLocationsNode === null)
	{
		return;
	}
	
	var geoLocations = geoLocationsNode.getElementsByClassName('geo-digest-section-header');
	//console.log('geolocations = ' + geoLocations);

	var geoStories = document.getElementById('geo-world-news-digest').getElementsByTagName('li');
	
	var best = document.getElementById('promo-best');
	

	for (loop=geoLocations.length-1;loop>-1; loop--)
	{
		var counter = geoStories.length - 1;
		
		geoLocations[loop].class= '';
		best.appendChild(geoLocations[loop]);
		for(innerLoop=1;innerLoop>-1;innerLoop--)
		{
			best.appendChild(geoStories[counter]);
			counter --;
		}
		
	}

	kill(window.document,document.getElementById('geographic-news-digests'),null,null,null);
	
};



function cleanFeaturesAndAnalysis()
{
	//console.log('in clean features');
	var myNode=document.getElementById('features-and-analysis');
	if (myNode === null)
	{
		console.log(myNode + ' not found, returning');
		return;
	}
	
	removebytag(myNode,'img');
	
	var itemsToChange=myNode.getElementsByTagName('li');
	var loop=itemsToChange.length - 1;
	for (loop = itemsToChange.length - 1;loop>-1;loop--)
	{
		itemsToChange[loop].className="no-image";
	}
};




function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
'.story-date {'+
'display:block;'+
'float:left;'+
'padding:1px 0 8px;'+
'width:290px;'+
'}'
)

addGlobalStyle(
'#background {'+
'height:90px;'+
'width:100%;'+
'z-index:1;'+
'}'
)

addGlobalStyle(' body {background-image: url(); background-attachment: fixed;} ')


addGlobalStyle(
'#blq-main #main-content {'+
'margin-top:-10px;'+
'position:relative;'+
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

//mast head black menu items
addGlobalStyle(
'.blq-gvl-3 #blq-nav-main {'+
'font-size:.9em;' +
'}'
);


addGlobalStyle(
'.blq-gvl-3 #blq-container-inner {'+
'background:none repeat scroll 0 0 transparent;'+
'position:absolute;'+
'left:175px;'+
'top:-40px;'+
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.blq-gvl-3 #blq-acc-links {'+
'background:none repeat scroll 0 0 transparent;'+
'font-size:0.86em;'+
'margin-left:87px;'+
'position:absolute;'+
'top:40px;'+
'z-index:12;'+
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.story-body {'+
'margin-top:10px;'+
'width:464px;'+
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.blq-gvl-3 #blq-mast-home {'+
'height:40px;'+
'margin-top:40px;'+
'position:absolute;'+
'top:0;'+
'width:auto;'+
'z-index:5;'+
'}'
)
addGlobalStyle(
'.blq-gvl-3 #blq-mast {'+
'height:40px;'+
'left:auto;'+
'margin-right:145px;'+
'margin-top:40px;'+
'right:0;'+
'top:0;'+
'width:976px;'+
'}'
)
addGlobalStyle(
'.geo-digest-region-header, #personalisation h3, .geo-digest-region .geo-digest-section-header, .geo-digest-section-header a.story {' +
'  color: black;' +
'font-family:Verdana,Arial,sans-serif;' +
'}' );

addGlobalStyle(
'.special-reports .top-report {' +
'padding-bottom:55px;' +
'padding-right:0;' +
'color:black' +
'font-family:Verdana,Arial,sans-serif;' +
'}' );

addGlobalStyle(
'.special-reports-wrapper {' +
'background-color:#EDEDED;' +
'padding-left:0px;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.special-reports .top-report h3 a {' +
'color:#000000; '+
'padding:3px 8px 0 0;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

//media player
addGlobalStyle(
'.container-av-best .av-live-streams {' +
'margin-bottom:16px;' +
'margin-top:0;' +
'padding-top:5px;' +
'position:relative;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);


//features and analysis
addGlobalStyle(
'.feature-generic, .container-features-and-analysis {' +
'background:none repeat scroll 0 0 #FFFFFF;' +
'margin:20px 0 16px;' +
'overflow:visible;' +
'padding-bottom:8px;' +
'position:relative;' +
'width:300px;' +
'font-family:Verdana,Arial,sans-serif;' +
'font-size:1em;' +
'}'
);

//features and analysis header, now small and red
addGlobalStyle(
'.container-features-and-analysis .features-header{' +
'font-size:1.1em;' +
'font-weight:normal;' +
'color:#901A1F;' +
'text-transform:uppercase;' +
'}'
);

//features and analysis links, now small
addGlobalStyle(
'.container-features-and-analysis .story {' +
'font-size:.8em;' +
'font-weight:normal;' +
'}'
);

addGlobalStyle(
'.container-features-and-analysis .from-external-source {' +
'font-size:.8em;' +
'font-weight:none;' +
'padding-top:80px;' +
'}'
);


addGlobalStyle(
'.digest-multiple .medium-image a, .digest-multiple .no-image a {' +
'font-weight:normal;' +
'}'
);


//Main article headline
addGlobalStyle(
'#top-story .top-story-header a {' +
'line-height:2;' +
'font-family:Verdana,Arial,sans-serif;' +
'color:#464646;' +
'font-size:1em;' +
'}'
);



addGlobalStyle(
'.story-body p.introduction {' +
'color:#464646;' +
'font-size:1em;' +
'}'
);



addGlobalStyle(
'.story-body p, .story-wide p {' +
'color:#464646;' +
'font-size:1em;' +
'}'
);

addGlobalStyle(
'.special-reports .top-report p {' +
'color:#000000;' +
'margin:4px 8px 8px 0;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.feature-generic li.medium-image img, .container-features-and-analysis li.medium-image img {' +
'display:inline;' +
'float:left;' +
'height:63px;' +
'margin-left:0;' +
'margin-top:1px;' +
'position:relative;' +
'width:0;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.feature-generic li.medium-image, .container-features-and-analysis li.medium-image {' +
'margin-bottom:-2px;' +
'padding:0 0 0 0;' +
'position:relative;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

addGlobalStyle(
'.feature-generic li.large-image img, .container-features-and-analysis li.large-image img {' +
'border-bottom:1px solid #FFFFFF;' +
'display:block;' +
'height:0;' +
'margin:-8px -8px 8px;' +
'position:relative;' +
'width:0;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);

// Also in the news changed width to fit
addGlobalStyle(
'.also-in-news .small-image {' +
'padding-bottom:10px;' +
'padding-left:128px;' +
'width:200px;' +
'}'
);

// Also in the news second item moved to the left so it fits
addGlobalStyle(
'.also-in-news .column-2 {' +
'left:-300px;' +
'}'
);


// Also in the News section header
addGlobalStyle(
'.also-in-news h2 {'+
'font-size:1.0em;' +
'font-weight:normal!important;' +
'color:#901A1F;' +
'text-transform:uppercase;' +
'}'
);


// Also in the News section header
addGlobalStyle(
'.h2 {'+
'font-size:90%;' +
'}'
);


addGlobalStyle(
'.digest-double .medium-image, .expert-even .medium-image {' +
'margin-left:-160px;' +
'padding-bottom:14px;' +
'width:144px;' +
'font-family:Verdana,Arial,sans-serif;' +
'}'
);



addGlobalStyle(
'.special-24, .se-promo-best-inc-header, .top-index-stories .top-index-stories-header, .top-section-stories .top-section-stories-header, .useful-links-header, .also-in-news h2, .av-stories-best .av-best-header, .feature-generic .features-header, .container-features-and-analysis .features-header, .featured-site-top-stories h2, .digest-wrapper-header, .geo-digest-solo-header, .geo-digest-region-header, .geo-digest-vertical-header, .languages h3, .other-top-stories .other-top-stories-header, .podcasts-range-module .podcasts-range-module-header, #site-wide-alert h2, .special-reports-header, .top-stories-range-module .top-stories-range-module-header, .topic-cluster .topic-cluster-header, .market-data h2, .weather-3day h2, .other-site-content-header, .guides-stories-header, .container-hyper-topic-cluster .hyper-depth-header, #personalisation h3, #related-services h2, .media_asset .most-pop h2, .byline h2, .alert h2, tr.heading th h2, .share-help h2, .share-help h3, .story-related h2, .most-watched-list h2, .useful-links h2, .more-stories h2, #personalisation .location-panel h4, #personalisation .we-remembered-panel h4, .have-your-say-inc-header, .have-your-say-inc .contact-number, .container-archived-content-heading, .container-featured-other-site-heading, .feature-digest-header, .weather-4items h2 {' +
'font-size:1.3em;' +
'}'
);



//the page header for content pages beneath main sections
addGlobalStyle(
'.se-promo-now-inc-header, #main-content h1.story-header, #top-story .top-story-header, .story-wide h1 {' +
'font-size:1.7em;' +
'font-weight:bold;' +
'letter-spacing:-1px;' +
'line-height:20px;' +
'font-family:Verdana,Arial,sans-serif;' +
'margin:-15px 0 15px;' +
'}'
)

//move the header down
addGlobalStyle(
'#header {'+
'clear:both;'+
'margin-top:30px;'+
'overflow:hidden;'+
'padding:14px 0 16px;'+
'position:relative;'+
'width:976px;'+
'font-family:Verdana,Arial,sans-serif;' +
'font-size:.9em;' +
'}'
)

//last updated date and time on the white part of the page
addGlobalStyle(
'#full-width .index-date {'+
'font-size:.8em;' +
'}'
)


//secondary header section
addGlobalStyle(
'#header .section-title {' +
'font-family:Verdana,Arial,sans-serif;' +
'font-size:14pt;' +
'}'
);


// main masthead, now black with a thin grey line below
addGlobalStyle(
'.blq-gvl-3 #blq-mast {' +
'background:none repeat scroll 0 0 #1D1D1D;'+
'background: -webkit-gradient(linear, left top, left bottom, from(#595858), to(#000000));' +
'background: -moz-linear-gradient(top,  #595858,  #000000);' +
'border-bottom:1px solid #cccccc;' +
'height:40px;'+
'left:auto;'+
'margin-right:145px;'+
//'margin-top:40px;'+
'right:0;'+
'top:0;'+
'width:976px;'+
'font-family:Verdana,Arial,sans-serif;' +
'}'
)

//addGlobalStyle(
//'.blq-gvl-3 #blq-mast {'+
//'background:none repeat scroll 0 0 rgba(0, 0, 0, 0.4);'+
//'height:40px;'+
//'left:auto;'+
//'margin-right:145px;'+
//'right:0;'+
//'top:0;'+
//'width:976px;'+
//'}'
//)



addGlobalStyle(
' .o {'+
'background: none repeat scroll 0 0 #E5E5E5;'+
'border-bottom:2px solid #FFFFFF;' +
'border-right:20px solid #FFFFFF;' +
'}'
);


//Special extra large headline reduced
addGlobalStyle(
' .special-36, #splash .splash-header .story {'+
'font-size: 1.7em;'+
'}'
);


//Inset extra feature links, hypertabs new width
addGlobalStyle(
' .blq-js .hypertabs {'+
'width:450px;'+
'}'
);



//Inset extra feature links, hypertabs unselected
addGlobalStyle(
' .blq-js .hypertabs ul li {'+
'font-size: .9em;'+
'}'
);

//Inset extra feature links, hypertabs selected
addGlobalStyle(
' .blq-js .hypertabs ul li.selected {'+
'font-size: .9em;'+
'}'
);




addGlobalStyle(
'.oldMenuTable {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'font-size: 1.1em;'+
'display:block;'+
'font-weight:bold;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
'margin-top:0px'+
'font-family:Verdana,Arial,sans-serif;' +
'line-height:15px;' +
'}'
)


//old style menu background
addGlobalStyle(
'.lhsb, .lhsl {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'display:block;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
'background:none repeat scroll 0 0 #E5E5E5;' +
'border-bottom:2px solid #FFFFFF;' +
'border-right:20px solid #FFFFFF;' +
'font-color:#1E52A1;' +
'}'
)

//old style menu hover over darker grey effect
addGlobalStyle(
'.lhsb a:hover {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'display:block;'+
'font-weight:bold;'+
'font-family:Verdana,Arial,sans-serif !important;' +
'background:none repeat scroll 0 0 #d8d8d8;' +
'font-color:#1E52A1;' +
'}'
)

//old style menu active menu grey effect
addGlobalStyle(
'.lhsb a:active {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'display:block;'+
'font-weight:bold;'+
'line-height:15px;'+
'font-family:arial !important;' +
'background:none repeat scroll 0 0 #d8d8d8;' +
'font-color:#FFFFFF;' +
'}'
)

//generally change everything to verdana
addGlobalStyle(
' *  {'+
'font-family:Verdana,Arial,sans-serif !important;' +
'}'
)

addGlobalStyle(
'#content-wrapper {'+
'background:none repeat scroll 0 0 #FFFFFF;'+
'clear:both;'+
'margin:-4px auto 0;'+
'overflow:hidden;'+
'position:relative;'+
'width:976px;'+
'}'
)


// Moves the main article picture to the left
addGlobalStyle(
'.story-body .caption {'+
'float:left;'+
'}'
);

// Moves the main right hand column to the left for the main article removing the huge gap
addGlobalStyle(
'#main-content .layout-block-b {'+
'float:left;'+
'}'
);

// This is the extra embedded link which appears in the middle of the article
// This moves it down underneath the righ hand column
addGlobalStyle(
'.story-body .embedded-hyper {'+
'bottom:-250px;'+
'}'
);


// This is another embedded link Related stories which appears in the middle of the article
// This moves it down underneath the righ hand column
addGlobalStyle(
'#main-content .story-body .story-feature {'+
'bottom:-350px;'+
'width: 150px;'+
'}'
);


//  the byline underline extends right across the screen, cut down width
addGlobalStyle(
'.byline {'+
'margin:-1px -1px 21px 0;' +
'}'
);


//  main article headline width restricted to the article width
addGlobalStyle(
'.se-promo-now-inc-header, #main-content h1.story-header, #top-story .top-story-header, .story-wide h1 {'+
'width:450px;' +
'}'
);



//
addGlobalStyle(
'.audioInStoryC, .videoInStoryC {'+
'float:left;'+
'}'
);


//ACL Livestats panel
//top line
addGlobalStyle(
'.livestats .panel li.first-child a {'+
'padding-top:4px;'+
'}'
);




//Most Popular Heading
addGlobalStyle(
'.livestats .livestats-header {'+
'font-size:1.3em;' +
'font-weight:normal;' +
'color:#901A1F;' +
'text-transform:uppercase;' +
'}'
);

//Most Popular background
addGlobalStyle(
'.livestats {'+
'background: none repeat scroll 0 0 #FFFFFF;' +
'}'
);

//Most Popular Sub-Headings Shared Read Watched/Listened
addGlobalStyle(
'.livestats-tabbed {'+
'font-size:.8em;' +
'}'
);

//Most Popular Sub-Headings Shared Read Watched/Listened
addGlobalStyle(
'.livestats .panel {'+
'font-size:1.2em;' +
'}'
);

//Shared Read Watched/Listened tab box around focussed item
addGlobalStyle(
'.blq-js .livestats-tabbed .open {'+
'border-top:1px solid #DFDFDF;' +
'border-right:1px solid #DFDFDF;' +
'border-left:1px solid #DFDFDF;' +
'}'
);

//uppercase and reduce Shared Read Watched/Listened text
addGlobalStyle(
'.blq-js .livestats-tabbed .tab {'+
'text-transform:uppercase;' +
'font-size:1.1em;' +
'}'
);

//section with focus in Shared Read Watched/Listened
addGlobalStyle(
'.blq-js .livestats-tabbed h3.open a {'+
'color:#1F4F82;' +
'}'
);

//subsequent news links in Shared Read Watched/Listened
addGlobalStyle(
'.livestats .panel li a {'+
'padding:4px 29px 4px 8px;'+
'font-weight:normal;' +
'font-size:9pt;' +
'}'
);

//banishes numbers
addGlobalStyle(
'.livestats .livestats-icon {'+
'display:none;'+
'}'
);


// moves the market data analysis widget to the left
addGlobalStyle(
'.marketdata-widget {'+
'float:left;' +
'}'
);

//.secondary-top-story .secondary-story-header {


//video icon
addGlobalStyle(
'.livestats .gvl3-icon {'+
'top:4px;'+
'}'
);

//ACL World news
addGlobalStyle(
'.extra-padding .column-top {'+
'margin-top:0px;'+
'}'
);




function kill(doc, node) {
  if (doc == null || node == null) return;
  if (!node.parentNode) return;
  node.style.display = "none";
  doc.last_removed_node = node;
};



function removebytag(mynode, tag)
{
	console.log('removebytag ' + mynode);
	if (mynode === null)
	{
		return;
	}
	var itemstoremove=mynode.getElementsByTagName(tag);
	var loop=itemstoremove.length - 1;
	for (loop = itemstoremove.length - 1;loop>-1;loop--)
	{
		itemstoremove[loop].parentNode.removeChild(itemstoremove[loop]);

	}
};

function removeimages(imageName){

	var imageNode = document.getElementById(imageName);
	if (imageNode === null)
	{
		return;
	}
	var imagestoremove=imageNode.getElementsByTagName("img");
	

	
	var loop=imagestoremove.length - 1;
	for (loop = imagestoremove.length - 1;loop>-1;loop--)
	{
		imagestoremove[loop].parentNode.removeChild(imagestoremove[loop]);
	}
	
};







window.addEventListener("load", function() { cleanup() }, false);