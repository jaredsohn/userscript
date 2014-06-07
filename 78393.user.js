// ==UserScript==
// @name IMDB Improver
// @namespace [173166]-[IMDBImprover]-v1.1.0
// @description Add links to search in NZBmatrix, BinSearch.info, NZBindex.nl, Trailers, & Subtitles. And show a popup window when moving the mouse over any movie page link with the movie info.
// @include http*://*.imdb.com/*
// @include http*://imdb.com/*
// @CodedBy AyoobAli
// @website http://www.AyoobAli.com
// @userScripts http://UserScripts.org/users/AyoobAli
// @license Free
// @version 1.1.0
// ==/UserScript==


	//===[Settings]===\\
        var NZBtext = "NZBm";
        var NZBlink = "http://nzbmatrix.com/nzb-search.php?search=--Search";
        var BinStext = "BinSearch";
        var BinSlink = "http://binsearch.info/?adv_age=&q=--Search";
        var NZBItext = "NZBindex";
        var NZBIlink = "http://nzbindex.nl/search/?age=&max=25&sort=agedesc&hidespam=1&q=--Search";
        var Trailertext = "Trailers";
        var Trailerlink = "http://www.youtube.com/results?search_type=videos&search_query=--Search+trailer";
        var Subtitletext = "Subtitles";
        var Subtitlelink = "http://subscene.com/filmsearch.aspx?q=--Search";
        
        var Actortext = "NZBm";
		var Actorlink = "http://nzbmatrix.com/nzb-search.php?search=--Search";
        var AutoHidePopup = false;  //--[true or false]
	//===[/Settings]===\\

	//===[Add Links]===\\
if(String(document.location).indexOf("/title/") > -1){
    
    var MyLinks = document.getElementById('top_center_after');
    if (MyLinks){
        MyLinks.innerHTML += '<a href="' + NZBlink.replace(/--Search/gi,document.title.trim()) + '" target="_blank"><b><font size="2">' + NZBtext + '</font></b></a>&nbsp;&nbsp;&nbsp;';
        MyLinks.innerHTML += '|&nbsp;&nbsp;&nbsp;<a href="' + BinSlink.replace(/--Search/gi,document.title.trim()) + '" target="_blank"><b><font size="2">' + BinStext + '</font></b></a>&nbsp;&nbsp;&nbsp;';
        MyLinks.innerHTML += '|&nbsp;&nbsp;&nbsp;<a href="' + NZBIlink.replace(/--Search/gi,document.title.trim()) + '" target="_blank"><b><font size="2">' + NZBItext + '</font></b></a>&nbsp;&nbsp;&nbsp;';
        MyLinks.innerHTML += '|&nbsp;&nbsp;&nbsp;<a href="' + Trailerlink.replace(/--Search/gi,document.title.trim()) + '" target="_blank"><b><font size="2">' + Trailertext + '</font></b></a>&nbsp;&nbsp;&nbsp;';
        MyLinks.innerHTML += '|&nbsp;&nbsp;&nbsp;<a href="' + Subtitlelink.replace(/--Search/gi,document.title.trim()) + '" target="_blank"><b><font size="2">' + Subtitletext + '</font></b></a>';
    }

} else if(String(document.location).indexOf("/name/") > -1){
    
        var MyLinks = document.getElementById('top_center_after');
    if (MyLinks){
        MyLinks.innerHTML += '<a href="' + Actorlink.replace(/--Search/gi,document.title.split(/[(/[]/gi)[0].trim()) + '" target="_blank"><b><font size="2">' + Actortext + '</font></b></a>';
    }

}
	//===[/Add Links]===\\
    
	//===[Popup Window]===\\
var PopupInfo = document.createElement('div');
PopupInfo.id = "InfoDiv";
document.body.appendChild(PopupInfo);
PopupInfo.style.left = '5px';
PopupInfo.style.bottom = '5px';
PopupInfo.style.display = 'none';
PopupInfo.style.position = 'fixed';
PopupInfo.style.fontSize = "12px";
PopupInfo.style.maxWidth = (window.innerWidth/2.3) + 'px';
PopupInfo.style.fontFamily = 'Tahoma';
PopupInfo.style.padding = '5px 5px 5px 5px';
PopupInfo.style.border = '1px #808080 Dotted';

if (AutoHidePopup) PopupInfo.addEventListener('mouseover',function() { PopupInfo.style.display = 'block'; }, false);
if (AutoHidePopup) PopupInfo.addEventListener('mouseout',function() { PopupInfo.style.display = 'none'; }, false);

var ReqURL = '';
var TitleLinks = '';
var TitleLinks = document.evaluate('.//a[contains(@href,"title/tt")]',document.body,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
while (i=TitleLinks.iterateNext()) {
	i.addEventListener('mouseover',URLreq,false);
    if (AutoHidePopup) i.addEventListener('mouseout',function() { PopupInfo.style.display = 'none'; }, false);
}
document.addEventListener('click',function() { PopupInfo.style.display = 'none'; },false);

function URLreq()
{ 
    ReqURL = this.href;

    var MchText = 'http://www.imdb.com/title/tt';
    var MchText2 = 'http://imdb.com/title/tt';

    if (  ((ReqURL.match("^"+MchText) == MchText) || (ReqURL.match("^"+MchText2) == MchText2)) && (ReqURL.split("/")[5] == '') )
    {
 
	PopupInfo.innerHTML = '<i><font color="#808080">Loading...</font></i>';
    PopupInfo.style.background = '#E9E5E5';
	PopupInfo.style.display = 'block';
    
    
    GM_xmlhttpRequest({
	   url:ReqURL,
       method:'GET',
       onload: function(HTMLsource) {
       
	   var HTMLtext = HTMLsource.responseText;
    
    var SPtemp=HTMLtext.split("<title>");
    if (SPtemp.length > 1) {
        var SPtitle=SPtemp[1].split("</title>");
    } else {
        var SPtitle=new Array("","");
    }
    SPtemp = '';

        var NewHTML = HTMLtext.replace(/[\r\n]/g,'');
        var MyHTMLtext = '<h2><p align="center"><a href="' + ReqURL + '"><font color="#865B14">' + SPtitle[0] + '</font></a></p></h2>';
        
        if (NewHTML.match(/<div class="starbar-meta">/i)) 
        {
            var SPtemp=NewHTML.split('<div class="starbar-meta">');
            var SPtext=SPtemp[1].split('</div>');
            if (SPtext[0].trim() == '') {SPtext[0] = 'No data found';}
            
            MyHTMLtext += '<b>User Rating:</b>&nbsp;&nbsp;</font>' + SPtext[0] + '<br>';
        }
        
        if (NewHTML.match(/<h5>Release Date:<\/h5><div class="info-content">/i)) 
        {
            var SPtemp=NewHTML.split('<h5>Release Date:</h5><div class="info-content">');
            var SPtext=SPtemp[1].split('</div>');
            if (SPtext[0].trim() == '') {SPtext[0] = 'No data found';}
            
            MyHTMLtext += '<b>Release Date:</b>&nbsp;&nbsp;</font>' + SPtext[0] + '<br>';
        }
        
        if (NewHTML.match(/<h5>Genre:<\/h5><div class="info-content">/i)) 
        {
            var SPtemp=NewHTML.split('<h5>Genre:</h5><div class="info-content">');
            var SPtext=SPtemp[1].split('</div>');
            if (SPtext[0].trim() == '') {SPtext[0] = 'No data found';}
            
            MyHTMLtext += '<b>Genre:</b>&nbsp;&nbsp;</font>' + SPtext[0] + '<br>';
        }
        
        if (NewHTML.match(/<h5>Plot:<\/h5><div class="info-content">/i)) 
        {
            var SPtemp=NewHTML.split('<h5>Plot:</h5><div class="info-content">');
            var SPtext=SPtemp[1].split('</div>');
            if (SPtext[0].trim() == '') {SPtext[0] = 'No data found';}
            
            MyHTMLtext += '<b>Plot:</b>&nbsp;&nbsp;</font>' + SPtext[0] + '<br>';
        }
        
                if (NewHTML.match(/<h5>Awards:<\/h5><div class="info-content">/i)) 
        {
            var SPtemp=NewHTML.split('<h5>Awards:</h5><div class="info-content">');
            var SPtext=SPtemp[1].split('</div>');
            if (SPtext[0].trim() == '') {SPtext[0] = 'No data found';}
            
            MyHTMLtext += '<b>Awards:</b>&nbsp;&nbsp;' + SPtext[0] + '<br>';
        }

        // add subtitles, Trailer, And NZBmatrix links
        SPtemp = '<br><B><a target="_blank" href="' + NZBlink.replace(/--Search/gi,SPtitle[0]) + '">' + NZBtext + '</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a target="_blank" href="' + BinSlink.replace(/--Search/gi,SPtitle[0]) + '">' + BinStext + '</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a target="_blank" href="' + NZBIlink.replace(/--Search/gi,SPtitle[0]) + '">' + NZBItext + '</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a target="_blank" href="' + Trailerlink.replace(/--Search/gi,SPtitle[0]) + '">' + Trailertext + '</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a target="_blank" href="' + Subtitlelink.replace(/--Search/gi,SPtitle[0]) + '">' + Subtitletext + '</a></B>';
        
        MyHTMLtext += SPtemp + '<br>';

    	if (MyHTMLtext)
	{
        PopupInfo.style.background = 'white';
        MyHTMLtext = MyHTMLtext.replace(/&nbsp;/ig," ").replace(/\s\s/ig," ").replace(/</ig," <").replace(/\s<\/a>/ig,"</a>").replace(/&/ig," &").replace(/;/ig,"; ").replace(/href="\//gi,"href=\"http://www.imdb.com/").replace(/href="(?!\http:\/\/)/gi,"href=\"" + ReqURL);
        
        PopupInfo.innerHTML = MyHTMLtext;

	}
	else PopupInfo.innerHTML = 'Unknown Error...';
    
       }
       });
    
    }
}

	//===[/Popup Window]===\\