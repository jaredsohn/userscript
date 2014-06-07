// ==UserScript==
// @name           BBC news cleaner
// @namespace     www.bbc.co.uk
// @description    cleans up the new bbc layout
// @include    http://www.bbc.co.uk/news*

// ==/UserScript==

// Author - Tom Veil

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

	'<div class="lhsb">'+
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
'}'
);


addGlobalStyle(
'.blq-gvl-3 #blq-container-inner {'+
'background:none repeat scroll 0 0 transparent;'+
'position:absolute;'+
'left:175px;'+
'top:-40px;'+
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
'}'
);

addGlobalStyle(
'.story-body {'+
'margin-top:10px;'+
'width:464px;'+
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
'  color: black;' +
'}' );

addGlobalStyle(
'.special-reports .top-report {' +
'padding-bottom:55px;' +
'padding-right:0;' +
'color:black' +
'}' );

addGlobalStyle(
'.special-reports-wrapper {' + 
'background-color:#EDEDED;' +
'padding-left:0px;' + 
'}'
);

addGlobalStyle(
'.special-reports .top-report h3 a {' +
'color:#000000; '+
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
'font-size:20px;' +
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

addGlobalStyle(
'.se-promo-now-inc-header, #main-content h1.story-header, #top-story .top-story-header, .story-wide h1 {' +
'font-size:2em;' +
'font-weight:bold;' +
'letter-spacing:-1px;' +
'line-height:20px;' +
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
'.oldMenuTable {'+
'border-collapse:collapse;'+
'border-spacing:0;'+
'font-size: 1.1em;'+
'display:block;'+
'font-weight:bold;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
'margin-top:0px'+
'}'
)






addGlobalStyle(
'.lhsb, .lhsl {'+
'background:none repeat scroll 0 0 #E5E5E5;' +
'border-bottom:2px solid #FFFFFF;' +
'border-right:20px solid #FFFFFF;' +
'border-collapse:collapse;'+
'border-spacing:0;'+
'font-size: 1.1em;'+
'display:block;'+
'font-color:#1E52A1;' +
'font-weight:bold;'+
'line-height:15px;'+
'padding:2px 0 2px 5px;'+
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