// ==UserScript==
// @name           BBC news cleaner WIDE
// @namespace     www.bbc.co.uk
// @description    cleans up the new bbc layout
// @include    http://www.bbc.co.uk/news/*

// ==/UserScript==

// 1 August 2010
// Andrew Leach after Tom Veil
// 1.86: Fixed another video positioning issue and stopped autoplay;
//       cleared up more related links, special reports
// 1.85: Fixed version-handling
// 1.84: Fixed problem with moving Related links
// 1.83: Fixed problem with moving video/audio

var fontFamily='Candara,Arial,sans-serif;';

function cleanup() {

	createTable();
	kill(window.document,document.getElementById('av-stories-best'),null,null,null);
	kill(window.document,document.getElementById('special-event-promotion-best-promo-module-hyper'),null,null,null);
	kill(window.document,document.getElementById('features'),null,null,null);
	kill(window.document,document.getElementById('promotional-content'),null,null,null);
	kill(window.document,document.getElementById('page-bookmark-links-head'),null,null,null);
	kill(window.document,document.getElementById('container-programme-promotion'),null,null,null);
	kill(window.document,document.getElementById('nav'),null,null,null);
	kill(window.document,document.getElementById('sub-nav'),null,null,null);
	if (document.getElementsByClassName)
		{
		var hyperpuff = document.getElementsByClassName('hyperpuff')
		var numpuffs = hyperpuff.length;
//		for (loop=0;loop<numpuffs;loop++)
//			{ kill(window.document,hyperpuff[loop]) }
		}
	kill(window.document,document.getElementById('page-bookmark-links-foot'));
	stopVideo();
	cleanNarrowStoryRelated();
	cleanGeographicNewsDigests();
	cleanServicesIcons();
	moveAlsoInTheNews();
	moveStoryRelated();
	moveVideos();
	cleanFeaturesAndAnalysis();

	removeimages('special-reports');
	removeimages('more-from-bbc-news');
	removeimages('more-from-business');
	removeimages('more-from-technology');
	removeimages('more-from-entertainment');
	removeimages('category-digests');

	moveafter('more-from-bbc-news', 'container-top-stories-with-splash',true);
	moveafter('special-reports', 'more-from-bbc-news_2',true);
	moveafter('most-popular-promotion','promo-best',true);
	moveafter('more-from-business', 'other-top-stories',true);	
	moveafter('more-from-technology', 'other-top-stories',true);
	moveafter('more-from-entertainment', 'other-top-stories',true);
	moveafter('category-digests', 'other-top-stories',true);

addGlobalStyle(
'.ticker-warning .bg_bar {background-color:#800010}'
);

addGlobalStyle(
'.blq-gvl-3 #blq-container-inner {'+
'background:none repeat scroll 0 0 transparent;'+
'margin-right:50px;'+
'position:absolute;'+
'left:175px;'+
'top:-40px;'+
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
'background:none repeat scroll 0 0 rgba(0, 0, 0, 0.4);'+
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
'  color:#1F4F82;' +
'}' );

addGlobalStyle(
'.geo-digest-section ul {'+
'padding:0;'+
'}'
)
addGlobalStyle(
'.geo-digest-section li {'+
'margin:0;'+
'}'
)
addGlobalStyle(
'#UKNews,#WorldNews,#LocalNews { padding: 0 8px 8px }'
)

addGlobalStyle(
'#special-reports .top-report {' +
'padding-bottom:8px;' +
'padding-right:0;'+
'padding-left:12px;'+
'}' );
addGlobalStyle(
'#special-reports .top-report p {' +
'color:#505050;'+
'}' );
addGlobalStyle(
'.special-reports-component .more-special-reports {' +
'position:relative;'+
'width:304px;'+
'}' );
addGlobalStyle(
'.special-reports-wrapper {' + 
'background-color:#EDEDED;' +
'padding-left:0px;' + 
'}'
);

addGlobalStyle(
'#special-reports .top-report h3 a {' +
'color:#1F4F82; '+
'padding:3px 8px 0 0;' +
'}'
);

//media player
addGlobalStyle(
'.container-av-best .av-live-streams {' +
'margin-bottom:16px;' +
'margin-top:0;' +
'padding-top:5px;' +
'position:relative;' +
'}'
);


//features and analysis
addGlobalStyle(
'.feature-generic, .container-features-and-analysis {' +
'background:none repeat scroll 0 0 #EDEDED;' +
'margin:20px 0 16px;' +
'overflow:visible;' +
'padding-bottom:8px;' +
'position:relative;' +
'width:336px;' +
'}'
);

addGlobalStyle(
'#top-story .top-story-header a {' +
'font-size:0.8em;' +
'line-height:1;' +
'}'
);

addGlobalStyle(
'.special-reports .top-report p {' +
'color:#000000;' +
'margin:4px 8px 8px 0;' +
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
'}'
);

addGlobalStyle(
'.feature-generic li.medium-image, .container-features-and-analysis li.medium-image {' +
'margin-bottom:-2px;' +
'padding:0 0 0 0;' +
'position:relative;' +
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
'}'
);

addGlobalStyle(
'.also-in-news .small-image {' +
'padding-bottom:10px;' +
'padding-left:128px;' +
'width:495px;' +
'}'
);


addGlobalStyle(
'.digest-double .medium-image, .expert-even .medium-image {' +
'margin-left:-160px;' +
'padding-bottom:14px;' +
'width:144px;' +
'}'
);


//move the header down
addGlobalStyle(
'#header {'+
'clear:both;'+
'margin-top:40px;'+
'overflow:hidden;'+
'padding:14px 0 16px;'+
'position:relative;'+
'width:976px;'+
'}'
)

addGlobalStyle(
'.blq-gvl-3 #blq-mast {'+
'background:none repeat scroll 0 0 rgba(0, 0, 0, 0.4);'+
'height:40px;'+
'left:auto;'+
'margin-right:145px;'+
//'margin-top:40px;'+
'right:0;'+
'top:0;'+
'width:976px;'+
'}'
)


addGlobalStyle(
'#navList {'+
'font-size: 1.1em;'+
'display:block;'+
'font-weight:normal;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
'position:absolute;'+
'top:156px;'+
'left:30px;'+
'}'
)

addGlobalStyle(
'.oldMenuTable {'+
'list-style:disc outside none;'+
'}'
);
addGlobalStyle(
'.oldMenuTable ul {'+
'list-style:circle inside none;'+
'}'
);
addGlobalStyle(
'.oldMenuTable li.selected {'+
'background-color:#E8E8E8;'+
'}'
);
addGlobalStyle(
'.oldMenuTable ul li.selected {'+
'background-color:#D0D0D0;'+
'}'
);


addGlobalStyle(
'.lhsb, .lhsl {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'font-size: 1.1em;'+
'display:block;'+
'font-weight:bold;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
'}'
)

addGlobalStyle(
'#content-wrapper {'+
'background:none repeat scroll 0 0 #FFFFFF;'+
'clear:both;'+
'margin:34px auto 0;'+
'overflow:hidden;'+
'position:relative;'+
'width:976px;'+
'}'
)

addGlobalStyle(
'.gvl3-icon-wrapper { display:none }'
)

//ACL Livestats panel
//top line
addGlobalStyle(
'.livestats .panel li.first-child a {'+
'padding-top:4px;'+
'}'
);
//subsequent lines
addGlobalStyle(
'.livestats .panel li a {'+
'padding:4px 29px 4px 8px;'+
'}'
);
//banishes numbers
addGlobalStyle(
'.livestats .livestats-icon {'+
'display:none;'+
'}'
);
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

addGlobalStyle(
'.story-body p, .story-wide p {'+
'margin:0 0 0.5em;'+
'}'
);

addGlobalStyle(
'.story-body p, .story-body li, .story-wide li, .media-asset .emp-decription p {'+
'font-size:1em;'+
'line-height:1.2em;'+
'}'
);

addGlobalStyle(
'#main-content h1.story-header {'+
'font-size:1.8em;'+
'}'
);

//Fonts
addGlobalStyle(
'* {'+
'font-family:'+fontFamily+';'+
'}'
);
addGlobalStyle(
'.story-body p, .story-body li, .story-wide li, .media-asset .emp-decription p {'+
'font-family:'+fontFamily+';'+
'}'
);
addGlobalStyle(
'.story-body .story-feature .caption {' +
'margin:16px 0 0;' +
'}'
);
addGlobalStyle(
'.from-external-source, .see-also span.section, .see-also span.timestamp {'+
'font-family:'+fontFamily+';'+
'}'
);

addGlobalStyle(
'.other-top-stories-stories h2 a.from-external-source, .other-top-stories-stories h3 a.from-external-source {'+
'display:inline;'+
'}'
);

// Checks for new version last so the page is complete and
// it doesn't matter how long this takes
checkForNewVersion();

};

var scriptVersion=1.86; // Don't alter this
function checkForNewVersion() {

GM_xmlhttpRequest({
  method:"GET",
  url:"http://www.acleach.me.uk/neater-news/version.txt?"+Math.random(),
  headers:{
    "User-Agent":"monkeyagent",
    "Accept":"text/monkey,text/xml",
    },
  onload:function(details) {
	currentVersion = parseFloat(details.responseText);
	if (currentVersion > scriptVersion)
	{
	// put new version message
	var versionMessage = document.createElement('div');
	versionMessage.className='feature-generic';
	versionMessage.style.width='100px';
	versionMessage.style.padding='8px';
	versionMessage.style.marginLeft='-12px';
	versionMessage.style.backgroundColor='#EDEDED';
	versionMessage.style.borderStyle='solid 1px #1F4F82';
	versionMessage.innerHTML='<p>A <a href="http://userscripts.org/scripts/show/82319">new version</a> of the News cleaner script is available. <a href="http://www.acleach.me.uk/neater-news/">Details</a></p>';
	document.getElementById('navList').appendChild(versionMessage);
	}
  }
});

}

function createTable() {
	var mainTable = document.createElement('div');
	mainTable.id = 'navList';
	redoMenu(mainTable);
	document.getElementsByTagName("body")[0].appendChild(mainTable);
};

function redoMenu(el)
{
var nav = document.getElementById("nav"); //ul
var subnav = document.getElementById("sub-nav");//ul
var lis = nav.getElementsByTagName("li");
var ul=document.createElement("ul");
el.appendChild(ul);
ul.className="oldMenuTable";
ul.id="myTable";
var l=lis.length;
for (var i=0; i<l; i++)
	{
	var li=lis[0];
	ul.appendChild(li);
	if (li.className.search(/selected/)>-1 && subnav && subnav.hasChildNodes())
		{
		var sli=document.createElement("ul");
		li.appendChild(sli);
		var slis = subnav.getElementsByTagName("li");
		var sl = slis.length;
		for (var si=0;si<sl;si++)
			{
			sli.appendChild(slis[0])
			}
		}
	}
}


function moveafter(itemToMove, newPosition, removeOld) {

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

function cleanFeaturesAndAnalysis() {
	removeimages('features-and-analysis');
	if (document.getElementsByClassName)
	{
		var els = document.getElementById('features-and-analysis').getElementsByClassName('medium-image');
		var num = els.length;
		for (var loop=0;loop<num;loop++)
		{
			els[0].className='no-image';
		}
	}
}

function moveAlsoInTheNews() {
	var market = document.getElementById('market-data-include');
	var features = document.getElementById('features-and-analysis');
	var also = document.getElementById('also-in-the-news');
	if (features && also) { features.parentNode.insertBefore(also,null) }
	if (market && also) { market.parentNode.insertBefore(also,market) }
}

function moveStoryRelated() {
	if (document.getElementsByClassName)
	{
		var related = document.getElementsByClassName('story-related');
		var best = document.getElementById('range-top-stories');
		var num = related.length;
		for (var loop=0;loop<num;loop++)
		{
			best.parentNode.insertBefore(related[loop],best)
		}
		addGlobalStyle(
		'.newstracker-list ul li.even {'+
		'float:left;'+
		'}'
		);
		var rellinks = document.getElementsByClassName('related-internet-links');
		for (var loop=0;loop<rellinks.length;loop++)
		{
			var links = rellinks[loop].getElementsByClassName('column-2');
			var num = links.length;
			for (var loop2=0;loop2<num;loop2++)
			{
				links[0].className='column-1';
			}
		}
		var rellinks = document.getElementsByClassName('hyper-related-assets');
		for (var loop=0;loop<rellinks.length;loop++)
		{
			var links = rellinks[loop].getElementsByClassName('column-2');
			var num = links.length;
			for (var loop2=0;loop2<num;loop2++)
			{
				links[0].className='column-1';
			}
		}
		var narrow = document.getElementsByClassName('story-feature related narrow');
		var num = narrow.length;
		for (var loop=0;loop<num;loop++)
		{
			kill(window.document,narrow[0]);
		}
		var hyper = document.getElementsByClassName('embedded-hyper');
		var num = hyper.length;
		for (var loop=0;loop<num;loop++)
		{
			kill(window.document,hyper[0]);
		}
		addGlobalStyle(
		'.related-links .column-1 {'+
		'width:336px;'+
		'}'
		);
	}

}

function moveVideos(){
	if (document.getElementsByClassName)
	{
		var videos = document.getElementsByClassName('audioInStoryC');
		var num = videos.length;
		for (var loop=0;loop<num;loop++)
		{
			nodeToUse = videos[0].parentNode;
			while (nodeToUse.className !='story-body' && nodeToUse.className != 'layout-block-a')
			{
				nodeToUse = nodeToUse.parentNode
			}
			var place = nodeToUse.getElementsByClassName('comment-introduction');
			nodeToUse.insertBefore(videos[0],place[0])
		}
		var videos = document.getElementsByClassName('videoInStoryB');
		var num = videos.length;
		for (var loop=0;loop<num;loop++)
		{
			nodeToUse = videos[0].parentNode;
			while (nodeToUse.className !='story-body' && nodeToUse.className != 'layout-block-a')
			{
				nodeToUse = nodeToUse.parentNode
			}
			var place = nodeToUse.getElementsByClassName('comment-introduction');
			nodeToUse.insertBefore(videos[0],place[0])
		}
		var videos = document.getElementsByClassName('videoInStoryC');
		var num = videos.length;
		for (var loop=0;loop<num;loop++)
		{
			nodeToUse = videos[0].parentNode;
			while (nodeToUse.className !='story-body' && nodeToUse.className != 'layout-block-a')
			{
				nodeToUse = nodeToUse.parentNode
			}
			var place = nodeToUse.getElementsByClassName('comment-introduction');
			nodeToUse.insertBefore(videos[0],place[0])
		}
	addGlobalStyle(
	'.audioInStoryC,.videoInStoryC,.videoInStoryB {'+
	'float:none;'+
	'margin-left:0px'+
	'}'
	);
	}
}

function cleanNarrowStoryRelated() {
	if (document.getElementsByClassName)
	{
		var features = document.getElementsByClassName('story-feature');
		var num1=features.length;
		for (var loop1=0;loop1<num1;loop1++)
		{
			var related = features[loop1].getElementsByClassName('related');
			var num2 = related.length;
			for (var loop2=0;loop2<num2;loop2++)
			{
				related[loop2].style.display='none';
			}
		}
	}
}

function cleanGeographicNewsDigests(){

	// Localisation for UK users
	var geoLocationsNode=document.getElementById('personalisation');
	if (geoLocationsNode && geoLocationsNode.getElementsByClassName)
	{
	var geoLocations = geoLocationsNode.getElementsByClassName('geo-digest-section');
	if (geoLocationsNode.getElementsByClassName('locator-forms').length==0)
	{
	var best = document.getElementById('promo-best');
	localbox = document.createElement('div');
	localbox.className='feature-generic';
	localbox.id="LocalNews";
	localbox.appendChild(geoLocations[0]);
	// Weather is now child[0]
	var weatherlocation = geoLocations[0].firstChild.firstChild.innerHTML;
	var weatherlink = geoLocations[0].firstChild.nextSibling.nextSibling.firstChild;
	weatherlink.innerHTML = '&bull; ' + weatherlink.innerHTML + ' for ' + weatherlocation;
	localbox.appendChild(weatherlink);
	best.appendChild(localbox);
	}
	}

	// UK News
	var geoLocationsNode= document.getElementById('geo-uk-news-digest');
	if (geoLocationsNode && geoLocationsNode.getElementsByClassName)
	{
	if (document.getElementById('personalisation'))
	{ geoLocationsNode.removeChild(document.getElementById('personalisation')) }
	var geoLocations = geoLocationsNode.getElementsByClassName('geo-digest-section');

	var best = document.getElementById('promo-best');
	UKbox = document.createElement('div');
	UKbox.className='feature-generic';
	UKbox.id="UKNews";
	num = geoLocations.length;
	for (loop=0;loop<num;loop++)
	{
	UKbox.appendChild(geoLocations[0]);
	}
	best.appendChild(UKbox);
	}

/*	// World News
	var geoLocationsNode= document.getElementById('geo-world-news-digest');
	if (geoLocationsNode && geoLocationsNode.getElementsByClassName)
	{
	var geoLocations = geoLocationsNode.getElementsByClassName('geo-digest-section');
	var best = document.getElementById('promo-best');
	worldbox = document.createElement('div');
	worldbox.className='feature-generic';
	worldbox.id="WorldNews";
	num = geoLocations.length;
	for (loop=0;loop<num;loop++)
	{
	worldbox.appendChild(geoLocations[0]);
	}
	best.appendChild(worldbox);
	kill(window.document,document.getElementById('geographic-news-digests'),null,null,null);
	} */
	kill(window.document,document.getElementById('world-map'),null,null,null);
	
	if (document.getElementsByClassName)
	{
	var header = document.getElementsByClassName('geo-digest-solo-header');
	if (header[0])
	{
	header[0].innerHTML = header[0].innerHTML.replace(/More News from Around/i,'More news from around');
	var generic = document.getElementsByClassName('container-geographic-regions-generic ');
	var best = document.getElementById('promo-best');
	var genericbox = document.createElement('div');
	genericbox.className = 'feature-generic';
	genericbox.id='GenericRegions';
	genericbox.appendChild(header[0]);
	for (loop=0;loop<generic.length;loop++)
	{
		var sections = generic[loop].getElementsByClassName('geo-digest-section');
		var num = sections.length;
		for (loop2=0;loop<num;loop++)
		{
			sections[0].className='geo-digest-section column-1';
			genericbox.appendChild(sections[0]);
		}
		kill(window.document,generic[loop]);
	}	
	best.appendChild(genericbox);
	addGlobalStyle(
	'.feature-generic {'+
	'padding:8px;'+
	'}');
	kill(window.document,generic[0]);
	}
	}

	// England
	var geoLocationsNode = document.getElementById('geo-digest-england');
	if (geoLocationsNode)
		{
		kill(window.document,document.getElementById('england-map'));
		}
	// Scotland
	var geoLocationsNode = document.getElementById('geo-scotland-news-digest');
	if (geoLocationsNode)
		{
		kill(window.document,document.getElementById('scotland-map'));
		}
	// Wales
	var geoLocationsNode = document.getElementById('geo-wales-news-digest');
	if (geoLocationsNode)
		{
		kill(window.document,document.getElementById('wales-map'));
		}

	// Black boxes
	if (document.getElementsByClassName)
	{
		var generic = document.getElementsByClassName('container-geographic-regions-generic ');
		var gennum = generic.length;
		for (loop=0;loop<gennum;loop++)
		{
			kill(window.document,generic[loop]);
		}
	}
	
	addGlobalStyle(
	'.blq-js .geo-digest-vertical {'+
	'background:#E8E8E8;'+
	'min-height:500px;'+
	'}'
	);
	addGlobalStyle(
	'.geo-digest-vertical {'+
	'background:none repeat scroll 0 0 #E8E8E8;'+
	'border-color: #E8E8E8;'+
	'text-shadow:none;'+
	'}'
	);	
	addGlobalStyle(
	'.geo-digest-vertical .tab a, .geo-digest-vertical-header {'+
	'color:#505050;'+
	'background-color:#E8E8E8;'+
	'}'
	);
	addGlobalStyle(
	'.blq-js .geo-digest-vertical h3.open {'+
	'color:#505050;'+
	'background-color:#D0D0D0;'+
	'}'
	);
	addGlobalStyle(
	'.blq-js .geo-digest-vertical h3.open a {'+
	'color:#1F4F82;'+
	'background-color:#D0D0D0;'+
	'}'
	);
	addGlobalStyle(
	'.blq-js .geo-digest-vertical div.open {'+
	'background-color:#D0D0D0;'+
	'min-height:492px;'+
	'}'
	);
	addGlobalStyle(
	'.geo-digest-region a {'+
	'text-shadow:none;'+
	'color:#1F4F82;'+
	'}'
	);
	addGlobalStyle(
	'.geo-digest-region .geo-digest-section-header {'+
	'margin-bottom:9px;'+
	'margin-top:-1px;'+
	'}'
	);
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

function stopVideo() {
objects = document.getElementsByTagName('embed');
for (var loop=0;loop<objects.length;loop++)
	{
	var flashVarAttr = objects[loop].getAttribute('flashvars');
	if (flashVarAttr) objects[loop].setAttribute('flashvars',flashVarAttr.replace(/config_settings_autoPlay=true/,'config_settings_autoPlay=false'));
	}
}


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


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
	
}

function cleanServicesIcons() {
	if (document.getElementsByClassName)
	{
		var icons = document.getElementsByClassName('services-icon');
		for (var loop=0;loop<icons.length;loop++)
		{
			kill(window.document,icons[loop]);
		}
	addGlobalStyle('#news-services li{display:block;float:none;padding:0;}');
	}
}

window.addEventListener("load", function() { cleanup() }, false);
