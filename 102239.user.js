// ==UserScript==
// @name		Google Expert Search
// @namespace	http://googlescript.blogspot.com
// @description	Add many other hidden (only available in text) functionality to the basic search: file extension filter (video, text document, presentation, datasheets, audio search ...), site filter (video streaming, file share sites, anime streaming sites ...) and all popular file share link search, customizable categories and many more improvements. Check the site for tips and more information: http://googlescript.blogspot.com Contact: pogisti@gmail.com
// @version		1.2c

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.5.2/jquery-ui.min.js

// @include		http://www.google.*
// @include		https://www.google.*
// @exclude		http://www.google.*/imghp*
// @exclude		http://www.google.*/analytics*
// @exclude		http://www.google.*/search*
// @exclude		http://www.google.*/preferences*
// @exclude		http://www.google.*/advanced_search*
// @exclude		http://www.google.*/language_tools*
// @exclude		http://www.google.*/ig*
// @exclude		http://www.google.*/#*
// @exclude		http://www.google.com/#q=*
// @exclude		http://www.google.*/support*
// @exclude		https://www.google.*/imghp*
// @exclude		https://www.google.*/analytics*
// @exclude		https://www.google.*/search*
// @exclude		https://www.google.*/preferences*
// @exclude		https://www.google.*/advanced_search*
// @exclude		https://www.google.*/language_tools*
// @exclude		https://www.google.*/ig*
// @exclude		https://www.google.*/#*
// @exclude		https://www.google.com/#q=*
// @exclude		https://www.google.*/support*
// @exclude		http://www.google.*/webhp*
// @exclude		http://*maps.google.*
// @exclude		*google.*/maps*
// @exclude		http://*translate.google.*
// @exclude		*google*/ig*
// @exclude		*.google.com/webhp?rls=ig

// @grant		GM_log
// @grant		GM_addStyle
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_getResourceText

// ==/UserScript==

//(multiple/redundant include because of browser compatibility)
// WARNING!
// - Possible issues with other scripts which add checkboxes to the Google main site
// - I had compatibility issues regarding .tld in exclude/include so I should use * but be careful, this includes not only top-level domains!
// - please don't use this script and Google Instant feature together. But why would you use it, anyway? :D

//Settings:
// - you can change https url's 'exclude' to 'include' if you want to use this script with encrypted connection, however this is not recommended
// - more categories in url/link/extension (just uncomment the category - delete // - in Url/link/extension array categories and in the initUrls/initLinks/initExtensions functions
// - custom text color (change 'var useCustomFontColor=false' to 'var useCustomFontColor=true', colorCode is the RGB code of font color)
// - debug mode (change 'var debugMode=false' to 'var debugMode=true', check the error console)
// - you can edit the categories at url/link/ext arrays, just delete '<url/link/ext>' elements what you don't need and add your own after , character in '<your element>' format, before the end ] character
// - add your own custom category

//Steps to add custom category:
// 1. Add url, link or extension category what you want (for example: if you want to make hello kitty url group, you should add "var helloKittyUrl = ['hellokitty.com','hellokittyagain.com'];" line without quotes after another Url categories)
// 2. Add category to the array (in the previous case, you should add in initUrls() this line: "urls.push(helloKittyUrl, 'Hello Kitty sites',false);" without quotes)
// 3. Save it and you're done! (script will generate text and checkbox and manage everything else ;) )


var searchString = '';

//Url arrays (using 'site' filter)
var fileshareUrl = ['4shared.com','zippyshare.com','uploading.com','minus.com','filestube.com','filecrop.com','2shared.com'];
var videostreamUrl = ['youtube.com', 'dailymotion.com','metacafe.com','veoh.com','vimeo.com','liveleak.com','streetfire.net'];
var blogUrl = ['blogspot.com','blogster.com','wordpress.com','blogger.com','livejournal.com','blog.com','insanejournal.com','tumblr.com','twitter.com','blogsome.com','blog.co.uk','blogomonster.com','blogetery.com','bravejournal.com','blogdrive.com'];
var animestreamUrl = ['kumby.com','animeratio.com','waoanime.tv','animeseed.com','anilinkz.com','animefreak.tv','freeanime.com','animeget.com','animehike.com','anime-media.com','animeplus.tv','animecrave.com','animefave.net','streamanime.tv','gogoanime.com','animeavenue.net'];
var onlineshoppingUrl = ['amazon.com','bestbuy.com','walmart.com','ecrater.com','shopping.com','pikaba.com','shopzilla.com','pricegrabber.com','samsclub.com'];
var auctionUrl = ['ebay.com','craiglist.org','ebid.net','overstock.com','onlineauction.com','webidz.com','bidstart.com','webstore.com','propertyroom.com','ubid.com','shopgoodwill.com'];
var torrentUrl = ['thepiratebay.ac','torlock.com','isohunt.to','extratorrent.com','torrentportal.com','btloft.org','torrentbit.net','torrentreactor.net','torrentz.eu','kickass.to','torrentdownloads.net','limetorrents.com','seedpeer.me','torrenthound.com','torrentcrazy.com','rarbg.com','take.fm'];
//var gwUrl = ['wiki.guildwars.com','guildwars.wikia.com','pvx.wikia.com','guildwiki.org','gwpvx.com/PvX_wiki'];
var xvideoUrl = ['badjojo.com','tube8.com','xhamster.com','xvideos.com','cliphunter.com','youporn.com','pornhub.com','redtube.com','tnaflix.com','keezmovies.com','timtube.com','yuvutu.com','homemadefuckvideos.com','pornerbros.com','stolenvideos.net','worldsex.com','apetube.com','perfectgirls.net'];
var pcShopHuUrl = ['pcx.hu','edigital.hu','ipon.hu/?product_id=','aqua.hu','cellcom.hu','compker.hu','szamitogepalkatreszbolt.hu','iway.hu','landcomputer.hu','a4team.hu','pcmaster.hu','acomp.hu','qwerty.hu'];
var auctionHuUrl = ['teszvesz.hu','vatera.hu','apronet.hu','expressz.hu','zsibvasar.hu','jofogas.hu','hardverapro.hu','forum.hwsw.hu/forum/46-bolhapiac/','pcbonto.hu','aprod.hu'];
var blogHuUrl = ['blog.hu','blogter.hu','blogger.hu','wpress.hu','b13.hu','blogol.hu','freeblog.hu','nolblog.hu'];
var fileshareHuUrl = ['data.hu','addat.hu','toldacuccot.hu','send2u.hu'];
var jobHuUrl = ['jobline.hu','jobinfo.hu','topjob.hu','workania.hu','www.expressz.hu/allas-munka','profession.hu','cvonline.hu','jobpilot.hu','http://www.munka.org/allasajanlatok','allasok.monster.hu'];
var videoStreamHuUrl = ['http://videa.hu/','http://indavideo.hu/','http://www.pixter.hu/','http://www.mommo.hu/','http://www.freevlog.hu/'];
//var newcategoryUrl = ['url1','url2', 'url3'];

//link arrays (exactly "<link>" search on all site)
var audioLink = ['mp3skull.com/mp3','www.fileserve.com/file/','zippyshare.com/','soundcloud.com','4shared.com/file','depositfiles.com/file'];
var fileshareLink = ['mediafire.com/?','rapidshare.com/files','4shared.com/file','zippyshare.com/','uploaded.net/file','filestube.com/','depositfiles.com/file','minus.com/'];
var flashgameLink = ['newgrounds.com/game','armorgames.com/play','addictinggames.com','kongregate.com/games','miniclip.com/games'];
//var newcategoryLink = ['link1','link2','link3'];

//extension arrays (using 'extension' filter)
var datasheetExt = ['xls','ods','xlsx','csv','slk','dbf'];
var documentExt = ['doc','docx','rtf','txt','odt','pdf'];
var presentationExt = ['ppt','pps','odp','otp','sxi','pot'];
var csharpSourceExt = ['cs'];
var javaSourceExt = ['java'];
var cppSourceExt = ['c','cpp','cc','cxx','h','hpp'];
var basicSourceExt = ['bas'];
var perlSourceExt = ['pl'];
var pythonSourceExt = ['py'];
var xmlExt = ['xml'];
//var newcategoryExt = ['ext1','ext2','ext3'];

//category arrays
var urls = new Array(0);
var links = new Array(0);
var extensions = new Array(0);

//option array
var options = [urls,links,extensions];

//form variables
var textbox = document.getElementsByName('q')[0];
var buttons;
var body = document.getElementsByTagName('body')[0];
var form = document.getElementsByTagName('form')[0];

var checkboxes = new Array(3);
var cbSearchRemember;

//settings
var useCustomFontColor = false;
var colorCode = "#FFFFF0";
var rememberSearch = false;
var defaultCheckRemember = false;
var defaultSearchRemember = false;
var enableHunCategories = false;

function getButtons()
{
    var node_list = document.getElementsByTagName('input');
    var buttons = [];
	var i, node;
    
    for (i = 0; i < node_list.length; i++) 
    {
        node = node_list[i];
 
        if (node.getAttribute('type') == 'submit') 
        {
                buttons.push(node);
        }
    } 
 
    return buttons;
}

function initUrls()
{
		urls.push([animestreamUrl,'Anime',false]);
		urls.push([auctionUrl,'Auction',false]);
    	urls.push([onlineshoppingUrl,'Online shops',false]);
		urls.push([blogUrl,'Blog',false]);
		urls.push([fileshareUrl, 'Fileshare', false]);
		urls.push([videostreamUrl, 'Video', false]);
		urls.push([torrentUrl,'Torrent',false]);
		//urls.push([gwUrl,'Guild Wars wiki',false]);
		urls.push([xvideoUrl,'Porn',false]);
		if(enableHunCategories)
		{
			urls.push([pcShopHuUrl,'PC Shop (hu)',false]);
			urls.push([auctionHuUrl,'Auction (hu)',false]);
			urls.push([blogHuUrl,'Blog (hu)',false]);
			urls.push([fileshareHuUrl,'Fileshare (hu)',false]);
			urls.push([jobHuUrl,'Jobs (hu)',false]);
            urls.push([videoStreamHuUrl,'Videostream (hu)',false]);
		}
		//urls.push([newcategoryUrl, 'new category label', false]);
}

function initLinks()
{
		links.push([audioLink, 'Audio', false]);
		links.push([fileshareLink, 'Fileshare link', false]);
		links.push([flashgameLink,'Flashgame',false]);
		//links.push([newcategoryLink,'new category label',false]);
}

function initExtensions()
{
		extensions.push([datasheetExt, 'Datasheet', false]);
		extensions.push([documentExt, 'Text', false]);
		extensions.push([presentationExt, 'Presentation', false]);
		extensions.push([csharpSourceExt, 'C#', false]);
		extensions.push([javaSourceExt, 'Java', false]);
		extensions.push([cppSourceExt, 'C++', false]);
		extensions.push([basicSourceExt, 'Basic', false]);
		extensions.push([perlSourceExt, 'Perl', false]);
		extensions.push([pythonSourceExt, 'Python', false]);
		extensions.push([xmlExt, 'XML', false]);
		//extensions.push(new Array(newcategoryExt, 'new category label', false));
}

function initCheckboxArray()
{
    var i;
	for(i = 0; i < checkboxes.length; i++)
	{
		checkboxes[i] = new Array(options[i].length);
	}
}

function appendCheckbox()
{
	var name;

	GM_addStyle("[id=upperDiv] { font-weight: bold; font-size:80% ! important; }");
	if(useCustomFontColor) {GM_addStyle("body { color: " + colorCode + " !important; }"); }
	
	var oDiv = document.createElement('div');
    oDiv.setAttribute('id', 'upperDiv');
    oDiv.setAttribute('name', 'upperDiv');
	oDiv.setAttribute('align', 'center');
    oDiv.setAttribute('vertical-align', 'middle');
    oDiv.setAttribute('text-align', 'center');
    oDiv.setAttribute('class', 'ui-widget-content');
    oDiv.setAttribute('padding', '15px');
    oDiv.setAttribute('margin-left', 'auto');
    oDiv.setAttribute('margin-right', 'auto');
	
	oDiv.appendChild(document.createElement('BR'));
	var txt1 = document.createTextNode('Press DEL to clear the searchbox!');
	oDiv.appendChild(txt1);
	oDiv.appendChild(document.createElement('BR'));
	var txt3 = document.createTextNode('Remember last searchterm');
	oDiv.appendChild(txt3);
	cbSearchRemember = document.createElement('input');
	cbSearchRemember.type = 'checkbox';
	cbSearchRemember.id = '';
	cbSearchRemember.name = '';
	cbSearchRemember.value = '';
	cbSearchRemember.checked = defaultSearchRemember;
	oDiv.appendChild(cbSearchRemember);
	
	var oDivOpt = document.createElement('div');
    oDivOpt.setAttribute('id', 'optionsDiv');
    oDivOpt.setAttribute('name', 'optionsDiv');
	oDivOpt.setAttribute('align', 'center');
    oDivOpt.setAttribute('vertical-align', 'middle');
    oDivOpt.setAttribute('text-align', 'center');
    oDivOpt.setAttribute('class', 'ui-widget-content');
    oDivOpt.setAttribute('padding', '15px');
    oDivOpt.setAttribute('margin-left', 'auto');
    oDivOpt.setAttribute('margin-right', 'auto');

    oDivOpt.appendChild(oDiv);
    oDivOpt.appendChild(document.createElement('BR'));
	
    var i,j;
	for(i = 0; i < options.length; i++)
	{
		for(j = 0; j < options[i].length; j++)
		{
			name = options[i][j][1];
			var cb = document.createElement('input');
			cb.type = 'checkbox';
			cb.id = 'cb' + i + j;
			cb.name = 'cb' + i + j;
			cb.value = 'cb';
			var text = document.createTextNode(name);
			oDivOpt.appendChild(cb);
			checkboxes[i][j] = cb;
			oDivOpt.appendChild(text);
            var txtLabel = document.createElement('label');
            txtLabel.id = 'label' + i + j;
            txtLabel.name = 'label' + i + j;
            txtLabel.text = '  ' + i + j;
            txtLabel.style['padding'] = '5px';
            oDivOpt.appendChild(txtLabel);
		}
		oDivOpt.appendChild(document.createElement('BR'));
	}
    
    $(function() {
    $( "#optionsDiv" ).draggable();
	});
    $( oDivOpt ).css('border', '3px groove #89C0FA');
    $( oDivOpt ).css('background-color','#D3E3F5');

    $( "#optionsDiv" ).position({
      my: "center",
      at: "center",
      of: "#form"
    });
    
    form.appendChild(oDivOpt);
}

function processOptions()
{	
	var first = true;
	searchString = textbox.value;
	
	if(cbSearchRemember.checked) {GM_setValue("rememberSearch",true); GM_setValue("searchTerm",textbox.value); } else {GM_setValue("rememberSearch",false);}
	
	var i,j,k;
	
	for(i = 0; i < options.length; i++)
	{
			if(options[i] == urls)
			{
				for(j = 0; j < options[i].length; j++)
				{					
					if(checkboxes[i][j].checked)
					{
						for(k = 0; k < options[i][j][0].length; k++)
						{
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;}
							searchString = searchString + ' site:' + options[i][j][0][k];
						}
					}
				}
			}
			else if(options[i] == links)
			{
				for(j = 0; j < options[i].length; j++)
				{
					if(checkboxes[i][j].checked)
					{
						for(k = 0; k < options[i][j][0].length; k++)
						{	
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;}
							searchString = searchString + ' "' + options[i][j][0][k] + '"';
						}
					}
				}
			}
			else if(options[i] == extensions)
			{
				for(j = 0; j < options[i].length; j++)
				{
					if(checkboxes[i][j].checked)
					{
						for(k = 0; k < options[i][j][0].length; k++)
						{	
							if (!first)
							{
								searchString += ' OR';
							}
							else{first = false;}
							searchString = searchString + ' filetype:' + options[i][j][0][k];
						}
					}
				}
			}
	}
	textbox.value = searchString;
    
}

function keyCheck(e)
{
	if(e.keyCode == 13 && e.shiftKey)
    {    
        e.preventDefault();    
        buttons[1].click();			
    }
    else if (e.keyCode == 13)
    {
		processOptions();
    }
	else if(e.keyCode == 46)
	{
		textbox.value = '';
	}
}

function searchButtonModify()
{
    var i;
	for(i=0;i<buttons.length;i++)
	{
		buttons[i].addEventListener('click',processOptions, false);
	}
	
	window.addEventListener('keydown', keyCheck, true);
}

function setToCenterOfParent( obj, parentObj ) {
    var height = obj.height();
    var width = obj.width();
    var heightOffset = 35;
    
    if ( parentObj == window ) {
        obj.css( 'top', ( parentObj.height() / 2 ) - ( height / 2 ) );
        obj.css( 'left', ( parentObj.width() / 2 ) - ( width / 2 ) );
    }
    else {
        obj.css( 'top', ( parentObj.height() / 2 ) - ( height / 2 ) + parentObj.position().top + heightOffset );
        obj.css( 'left', ( parentObj.width() / 2 ) - ( width / 2 ) + parentObj.position().left );
    }
}

function init()
{	 
	initUrls();
	initLinks();
	initExtensions();
	initCheckboxArray();
	buttons = getButtons();
	searchButtonModify();
	appendCheckbox();
	
	if(GM_getValue("rememberSearch") == true) {textbox.value = GM_getValue("searchTerm",""); } else {textbox.value = "";}
}

init();