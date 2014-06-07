// ==UserScript==
// @name          IMDB particulars for torrentleech.org
// @namespace     http://tl.is.awsome.org
// @description   Shows IMDB as the third row for movies with IMDB links
// @include       http://www.torrentleech.org/*
// @include       http://torrentleech.org/*
// ==/UserScript==
/****************************
TorrentLeech IMDB SCRIPT
Author: Silicontoad
February 24 2010
Released under BSD license
-------

Change history:
-------
24/2/2010	Fixed IMDB year deviation which was causing script to break.
		try-catch to enable to script to continue
23/1/2010	Fixed Apple Link - Thanks mafketel for the feedback
		Fixed issue with some movie pages returning null for rating
		Fixed issue with repeated imdb links
		Fixed reverse bug for movie packs
7/1/2010	Fixed IMDB rating deviation 
12/11/2009	Fixed IMDB rating deviation - now more robust
17/10/2009	Add rows for Games (IMDB Games), Add rows for TV shows (tv.com) and rows for anima
17/10/2009	Fixed IMDB URL [3] categories parsed, http://imdb, http://www.imdb, imdb.
17/10/2009	Single instance of (IMDB++) for movie packs
17/10/2009	Fixed table locate problem (should now work for everyone)
27/9/2009	Added "trailer" to YouTube search
26/9/2009 V.2 (Milestone) Beta
		YouTube Trailer in lightbox (for the older movies)
		Apple Trailer in lightbox
		Re-Write of script
		Movie packs all load
		Super fast load - single call to IMDB
		Use TL Imdb link if failed to parse / hide TL row
25/9/2009 v.1.4
24/9/2009 More Fixes for VIP & non-VIP
24/9/2009 Fixed pull back of imdb trailor
24/9/2009 More Fixes for VIP & non-VIP (I don't know if this is variable)
23/9/2009 v.1.3
23/9/2009 Fixed Table Index for non-VIP (it's hard to test when ur VIP)
23/9/2009 v.1.2
23/9/2009 Fixed Zero Vote
23/9/2009 Load IMDB in lightbox
22/9/2009 v.1.1
22/9/2009 Fixed Table Index for non-VIP (sry my bad) thanks markild for the observation
21/9/2009 Fixed rating issue due to IMDB change in HTML
1/9/2009 Load multi links for multi links for multi-pack movies
28/8/2009 V.1

ToDo:
	* Search for movie title if no IMDB link (priority)
	** Description, need an approach to filter torrent name, i.e. stripping title only
	** once this is done work can begin on the next three
	* IMDB links for games
	* animaDB links for anima
	* tv.com links for episodes
	
****************************/

if(unsafeWindow)
	w = unsafeWindow;
else
	w = window;

var global_photos = w.global_photos;

var external = 'data:image/gif;base64,R0lGODlhCgAKAKIFAGaZzDOZzJnM/wBmzABm/////wAAAAAAACH5BAEAAAUALAAAAAAKAAoAAAMlWFrUvgEsNklYZOhBBB5KVwhXxnhCA5gCkIIXOBKFXE+3su1LAgA7';
var open_in = 'data:image/gif;base64,R0lGODlhCgAKAKEDAABmzDOZzJnM/////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBCgADACwAAAAACgAKAAACG4SPIMtrEqIUL4w7AlUW64plGyRFY8MYYZi0BQA7';
var close = 'data:image/gif;base64,R0lGODlhCgAKAKECAABmzFaY2v///////yH+FUNyZWF0ZWQgd2l0aCBUaGUgR0lNUAAh+QQBAAACACwAAAAACgAKAAACGoSPIMtrEsKK4sUrH7xObVopGGVJW9g0yVoAADs=';
var zone_top, zone_iframe, zone_tail;

function _gt(e) { return document.getElementsByTagName(e); }
function _gi(e) { return document.getElementById(e); }
function _ce(e) { return document.createElement(e); }
function _ct(e) { return document.createTextNode(e); }

function lightBox(url,title) {
    var disabledZone = _ce('div');
    disabledZone.id = 'disabledZone';
    disabledZone.setAttribute('style', 'background-color: #1e1f1a; opacity: 0.4');
    disabledZone.style.position = 'absolute';
    disabledZone.style.zIndex = 2500000;
    disabledZone.style.left = '0px';
    disabledZone.style.top = '0px';
    disabledZone.style.width = '100%';
    if( document.body.clientHeight==0 )
		disabledZone.style.height = '300%';
    else//cover entirePage
		disabledZone.style.height = _gt("table")[0].clientHeight+50;
	
	disabledZone.addEventListener('click', function() {
	closeBox();
    }, true);
    
	document.body.appendChild(disabledZone);

    var imgZone = _ce('div');
    imgZone.id = 'imgZone';
    imgZone.style.position = 'fixed';
    imgZone.style.zIndex = 2500001;
    imgZone.style.top = '50px';
    imgZone.style.background = '#ffffff';
    imgZone.style.height = '80%';
    imgZone.style.left = '50px';
    var w = document.body.clientWidth -100;
    var h = document.body.clientHeight-200;
	zone_top = '<div style="text-align:right;padding:4px;background:#1e1f1a;font-size:11px"><span style="float:left"><a href="'+url+'" target="_blank" title="Open in new window"><img src="' +external+ '" border="0" /></a> <a href="'+url+'" title="Open in current window"><img src="' +open_in+ '" border="0" /></a> <a href="javascript:;" onclick="closeBox()" title="Close lightbox"><img src="' +close+ '" border="0" /></a> &nbsp;' + title + '</span>TorrentLeech IMDB Particulars</div>';
    zone_iframe = '<iframe src="'+url+'"  width="100%" height="100%" frameborder="0"></iframe>';
    zone_tail = '<div id="lightbox_toolbar" style="color:#aaa9a9;width:'+w+'px;overflow:hidden;text-align:left;padding:4px 0px 4px 0px;background:#1e1f1a;font-size:9px">&nbsp;&nbsp;<b>'+url+'</b></div>';
	imgZone.innerHTML = zone_top + zone_iframe + '<br />' + zone_tail;
    document.body.appendChild(imgZone);
	document.body.setAttribute('onResize', 'resize()');
}

w.resize = function() {
	var w = document.body.clientWidth -100;
	var h = document.body.clientHeight-200;
	_gi('lightbox_toolbar').style.width = w + 'px';
	zone_tail = '<div id="lightbox_toolbar" style="color:#1393c0;width:'+w+'px;overflow:hidden;text-align:left;padding:4px 0px 4px 0px;background:#ddd;font-size:11px">&nbsp;&nbsp;<b>'+url+'</b></div>';
};
	
w.closeBox = function() {
    document.body.removeChild(_gi('imgZone'));
    document.body.removeChild(_gi('disabledZone'));
}
closeBox = w.closeBox;

function locateTable(){
	var table = new Array();
	table=document.getElementsByTagName("table");

	for(i = 1; i < table.length;i++)
		if(table[i].width == 750){
			return table[i];
		}
}	

function addMovieRow(table,i){                    
    var inner="<span id=\"ttl_"+i+"\">" + "..." + "</span><b><u></u></b> | <span id=\"yr_"+i+"\">" + "..." + "</span> | <span id=\"rt_"+i+"\">" + "..." + "</span> [<span id=\"rtstr_"+i+"\">" + "..." +"</span>]-[<span id=\"vt_"+i+"\">" + "..." + "</span>] | <span id=\"g_"+i+"\">" + "..." + "</span> | <span id=\"prv_"+i+"\">" + "..." + "</span> | <span id=\"prv2_"+i+"\">" + "..." + "</span>";
	
	var theRow = table.insertRow(2+i);
	if(i==0)
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\">IMDB++</td><td width=\"99%\" align=\"left\">"+inner+"</td>";
	else
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\"></td><td width=\"99%\" align=\"left\">"+inner+"</td>";	
}

function addGameRow(table,i){                    
    var inner="Comming Soon ;)";
	
	var theRow = table.insertRow(2+i);
	if(i==0)
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\">IMDB.G</td><td width=\"99%\" align=\"left\">"+inner+"</td>";
	else
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\"></td><td width=\"99%\" align=\"left\">"+inner+"</td>";	
}

function addAnimaRow(table,i){                    
    var inner="Comming Soon ;)";
	
	var theRow = table.insertRow(2+i);
	if(i==0)
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\">AniDB++</td><td width=\"99%\" align=\"left\">"+inner+"</td>";
	else
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\"></td><td width=\"99%\" align=\"left\">"+inner+"</td>";	
}

function addEpisodeRow(table,i){                    
    var inner="Comming Soon ;)";
	
	var theRow = table.insertRow(2+i);
	if(i==0)
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\">tv.com</td><td width=\"99%\" align=\"left\">"+inner+"</td>";
	else
		theRow.innerHTML="<td class=\"rowhead\" width=\"1%\"></td><td width=\"99%\" align=\"left\">"+inner+"</td>";	
}

function addGlobalStyle(css) {
    var head, style;
    head = _gt('head')[0];
    if (!head) { return; }
    style = _ce('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

(function(){
	var table = locateTable();
	var IMDBTL_ROW=2;

	var imdbLinks = new Array();
    var count=0;
	
	var rowCheck = table.rows[4]
						
	if(rowCheck.cells[0].innerHTML == "Type"){
		rowCheck = rowCheck.cells[1].innerHTML;
		var rg = new RegExp("Game");
		if(rowCheck=="Episodes/TV")
			addEpisodeRow(table,0); //temp -> to make them drool :)
		else if(rowCheck=="Anime/Cartoon")
			addAnimaRow(table,0); //temp -> to make them drool :)
		else if(rg.exec(rowCheck) || rowCheck =="Nintendo DS")
			addGameRow(table,0); // temp -> to make them drool :)
	}
	if(1){
        try {
            var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
            var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
                document, null,    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
            var i, el, l, m, p, span, txt, rating, genre, title; 
            var urlRE=/(?:http:\/\/www.imdb.com[^\s]*|(imdb\.-{1}[^\s]*)|(www\.imdb[^\s]*))/gi;
			//nex re results in infinite loop
			//var urlRE=/((?:http:\/\/)(www\.imdb\.com[^\s]*|imdb.com[^\s]*)|(imdb\.com[^\s]*)|(www\.imdb[^\s]*))/;
			var count=0;	
			for (i=0; el=res.snapshotItem(i); i++) {
                //grab the text of this element and be sure it has a URL in it
                txt=el.textContent;
                span=null;
                p=0;
					
                while ( m=urlRE.exec(txt) ) {
                    //get the link without trailing dots
                    l=m[0].replace(/\.*$/, '');	

                    //if no imdb page posted on first page
                    //enhancement - connect to imdb and do a search using the title
                    //or look on the remaining torrent comments pages looking for a link
                    var re = new RegExp("imdb");
                    var x = re.exec(l);	
					
					//avoid imdb trailor link
					var re2 = new RegExp("video");
					var xx =re2.exec(l);					
					
					if( x != null && x != "" && xx==null ){
						l = String(l);
						if(l[0]!='h')
							l = 'http://' + l;
						imdbLinks[count++] = l;
					}
                }				
            }
						
			//(Borrow) == STEAL!!! link from TL if no link could be found
			
			if(count == 0){
				var TLimdb=table.rows[IMDBTL_ROW].cells[1];
				var link = TLimdb.firstChild.href;
				
				imdbLinks[count++] = link;
			}
			
			if(table.rows[IMDBTL_ROW].cells[0].innerHTML == "IMDB")
				table.deleteRow(IMDBTL_ROW);		
			
			if(count > 0)
				process(imdbLinks,table);
        }catch(e) {
            dump('Exception Caught ('+e.lineNumber+'): '+e+'\n');
        }
    }    
})();

function removeRepeat(links){
   var uniqueLinks= new Array;
   for(var i = 0; i < links.length; i++) 
   {
       var xx = true;
       var ArrayVal = links[i];
       for(var j = i+1; j < links.length; j++)
       {
         if(links[j] == ArrayVal) 
          xx = false;
       }
       
	   if(xx == true)
            uniqueLinks.push(ArrayVal)
   }

	return uniqueLinks;
}

function process(links,table){
	//links.reverse();
	links=removeRepeat(links);
	for (var i=0; i < links.length;i++){
		populateRow(links[i],i,table);
	}
}

function populateRow(l,i,table){                          
	if(l){
		addMovieRow(table,i);
		getDetails(l,i);
	}
}

function getDetails(link,i){
	var mTitle, mYear, mRating, mVote, ratio, style, vt;
    GM_xmlhttpRequest({
        method: 'GET',
        url: link,
        onload: function (responseDetails) {		
            if (responseDetails.status == 200) { 
              var reTitle = new RegExp("id=\"tn15title\">\n<h1>[^<]*<","g");
              var reYear = new RegExp(/\((\d{4}){1,2}\)/);
              var reRating = new RegExp(/\d+(?:\.\d{0,2})\/\d\d/);
			  var reVote = new RegExp("class=\"tn15more\">[^>]*>","g");
              var reGenre = new RegExp("<a\\b[^>]*href=\"\/Sections\/Genres\/([A-Za-z-]+)\/\">([A-Za-z-]+)\\w+<\/a>","g");
              var xGenre = new RegExp(">([A-Za-z-]+)");
			  
			  try{
			  mTitle = reTitle.exec(responseDetails.responseText);
			  }catch(e){
			  }
			  try{
			  mYear = reYear.exec(responseDetails.responseText)[1];
			  }catch(e){			  
			  }
			  try{
			  mRating = reRating.exec(responseDetails.responseText);
			  }catch(e){			  
			  }
			  try{
			  mVote = reVote.exec(responseDetails.responseText);
			  }catch(e){
			  }
			  try{
			  mGenre = reGenre.exec(responseDetails.responseText); 
			  }catch(e){
			  }			
			  
              
			  mTitle = new String(mTitle);
              mTitle = mTitle.substr(20, (mTitle.length-(mTitle.indexOf("<",0)))-5);
             
			  ///Title
              if (mTitle == null) {
                mYear = "<span style=\"color:pink;\"><i>Title Error</i></span>";
              }
				//old style
				//_gi("ttl_"+i).innerHTML="<a href=\""+link+"\">"+mTitle.substr(0,mTitle.length-1)+"</a>";
				//LyteBox Style
			  _gi("ttl_"+i).innerHTML="<a href=\"#\">"+mTitle.substr(0,mTitle.length-1)+"</a>";
			  var elmLink = _gi("ttl_"+i);
			  elmLink.addEventListener("click", function(){lightBox(link,mTitle.substr(0,mTitle.length-1));}, true);

			  ///Year
			  if (mYear == null) {
                mYear = "<span style=\"color:pink;\"><i>Year Error</i></span>";
              }
              _gi("yr_"+i).innerHTML=mYear;
				///Rating
				mRating = new String(mRating);
				//deviation in IMDB code detected on 07/01/10
				//reSlash = new RegExp(/\d+(?:\.\d{0,2})\/\d\d/);
				//mRating = reSlash.exec(mRating);
				if(mRating!=null && mRating!="" && mRating!="null"){
                    mRating = new String(mRating);
                    ratio = parseFloat(mRating.substr(0,mRating.indexOf("/")));                    
                    var rt = "<img style=\"vertical-align:text-bottom;\" width=\"130\" height=\"13\" alt=\"Embedded Image\" src=\"data:image/gif;base64,"+star[parseInt(Math.floor(ratio+0.5))]+"\" />";

                    _gi("rt_"+i).innerHTML=rt;

                    if(ratio < 5)
                        _gi("rtstr_"+i).innerHTML="<font color=\"FF0000\>"+mRating+"</font>";
                    else
                        _gi("rtstr_"+i).innerHTML="<font color=\"339900\>"+mRating+"</font>";
                }else{
					var rt = "<img style=\"vertical-align:text-bottom;\" width=\"130\" height=\"13\" alt=\"Embedded Image\" src=\"data:image/gif;base64,"+star[0]+"\" />";

                    _gi("rt_"+i).innerHTML=rt;
                
                    _gi("rtstr_"+i).innerHTML="awaiting 5 votes";
				}
				///Vote				
                mVote = new String(mVote);
				mVote = mVote.substr(mVote.indexOf(">",0)+1, (mVote.length-(mVote.indexOf(">",0)+1))-(mVote.length-mVote.indexOf("<",0)));
                if (mVote != null && mVote != "") {
					mVote = new String(mVote);
					reVote=/[.,\s]/g;

					vt = parseInt((mVote.substr(0,mVote.indexOf("v")-1)).replace(reVote,""));                

					if(vt < 100) // assume family voted for movie :) red
						_gi("vt_"+i).innerHTML="<font color=\"FF0000\>"+mVote+"</font>";
					else if(vt < 1000) //ok orange
						_gi("vt_"+i).innerHTML="<font color=\"FF9900\>"+mVote+"</font>";
					else //thumbs up green
						_gi("vt_"+i).innerHTML="<font color=\"339900\>"+mVote+"</font>";            
					}else{
						_gi("vt_"+i).innerHTML="No Votes";
					}
				///Genre                
				if(mGenre!=null){
					g = new String(xGenre.exec(mGenre)[1]);
                
					while (mGenre != null) {
						mGenre = reGenre.exec(responseDetails.responseText);                    
						if(mGenre != null)
							g += ", " + new String(xGenre.exec(mGenre)[1]);
					}
					_gi("g_"+i).innerHTML=g;
				}else
					_gi("g_"+i).innerHTML="<i>None</i>";
				///Trailer (Apple)
				_gi("prv_"+i).innerHTML="<a href=\"#\" title=\"Apple\");\">Apple</a>";
				var ttl = mTitle;				
				var lick = "http://www.apple.com/search/?q="+ttl+"&sec=downloads";
				//http://www.apple.com/search/?q=alvin&sec=downloads
				var elmLink = _gi("prv_"+i);
				elmLink.addEventListener("click", function(){lightBox(lick,ttl+"- Apple Trailer");}, true);
				///Trailer (YouTube)
				_gi("prv2_"+i).innerHTML="<a href=\"#\" title=\"YouTube\");\">YouTube</a>";				
				var lick2 = "http://www.youtube.com/results?search_query="+ttl+" trailer";
				var elmLink2 = _gi("prv2_"+i);
				elmLink2.addEventListener("click", function(){lightBox(lick2,ttl+"- YouTube Trailer");}, true);
			}            
        }
    });
}

var star = new Array();
star[0]="R0lGODlhqgARANUAAAAAAP///8zMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACMALAAAAACqABEAAAb/QJFwSCwaj8ikcslsOp/QqPRYgVafV2e2uWV2l19lODlGlo0cAceZXjfbbHXczYS/5Xf60l7HMxUCCU6Agk2Eg4GIhX+Jho2Mi0uHjpFJGQKYGUyXmZuYAppLnKCenaKfoUqjqZaopaSnpkkgB58HIEq0triztZi3ub4CwL27wcbFv7xIusrHzsnDy0MYEgsDn9kECxIYQtXX2Z/b3d/W2OIC5N4i4Oji6+bh6fHt5+nq3Ozu+PX89PrkvdMW0N48eAU14Eu3QYjChdkaingIEZNEihUvVvykcaOAjhtBZnTo8SNJjxJFWNh4gcjKii2HvIQYU8jMhTVVsnS5U2ZP/5s/dcLkOZTIBIgUjBxdmLTIUnxNjSJVOtVpValMqWa1uhUr1CMO8DlAEjbdWLBiyaZFa1ZtW7bizhopG9dtXbjZ5BaJgC8CEr7p/B4BLE6wEcLZDO/t+5fxYMeHIS8O3JjyEQb4GCDBnE7z5cybQX/uHJr0aHGejXBGXZr16WypiyCw9QkBktm/at+mjcn2EdzDdP/mLcC3EeDCjMsmrpwIcuHHme/O3RtJAQENOojogNmAdezauQvwfuR69u3dv58XT96I+fDpy4NHP149/Pry18d3P5+9ffrtERHCAx8U4QEEIRgxYIFEHJhgEQsaiKCCBEr4oIAVNjghhBkO4R4ghQx6uCGGIQrxIYclinAiiRZO4eKLMMYo44xTBAEAOw==";
star[1]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkDeWmI+XmpmOm56djCADII4+JD6mqKqpjaetjK+ss66rtbCLCQMLjiwkK72/wcCNvsSMxsPKxcLMx4oXA9IXjDsk1zvV1yTZi9bY2uDe292K39zh6OPi5uSLIgfSAwciikIp2ylC9vjX+vz59iW6FxCgP4GICB40SOLfwH4NER5SGNGQhQ4KCMjbKEBBBwuCdNBoUWKbSRMtaOgIObKkyWsoVbIk+RJmypVERNKsGROnTpcve84EevLm0JokhOZsiVTpz6ZGiWDYSHVjBkE8kNbsgVXrS65EsnrdBlbsWBJlz15Lq5btWbdj/+F6BUukQlWqHwjhOJtDL1+/Y/sO2hsYsFfBgggfNqwVMRHFjRkjdUxkwl1pHgzV8GpDM2fPWjsX2hwaNFLRhEifNl0T9SDVrVm/dD2owd0HiGAghZF7d++avA/pBv77ZXBDw40XN3m8UHLmy7c1JyThrgREM5DOwK6de83th7J/9/4SvCHx5cmbNF8I/Xr129gTcnDXASIXSF3cz7+/pv5D+PnX30v/GRIggQOaVGAhByqY4DYLEoKAPPFIwwEiKuSzjQoYangNh4dk6M+GHY74YYkNkRiihySAaIiIKZ64ooktogiRi4UUMAADGhChAX0GIHICCS/8QMQP+KEgJGyRRiJJgpKHDFnkkUkuOaWTUBoiZZNVRskklU9ayWWYXl7ZpZZfYnnICBCEUMgGEYxgyBAxBFEIEDIMMWedd+a5p52E4KlnIXQCOoigf/Y5KCGFKppooH4Syiekiw7SKKWTZKrpppx26ukkgQAAOw==";
star[2]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPN5CZmJqdnJ+Om40gAyCOpKaNPiQ+jqutqqyusrGwjK+ztou4jQkDC46+wI0sJCuOxcfExsjMy8qMyc3Qi9KMFwPZF9fZA9uLOyTiO4zh4+XiJOTg6euK5uro5+zz7+2LIgfdByKK+fv9EglJkS6FEEUDCx4USFCcQYQNSTxkqBBiRYoOFyJKmNGQhQ4KCHQbKUBBBwuCPoYc2a3kSUE6aLQoka6miRY0dMCUSbOmuJs5d870+ROnTiIxhxIFejRpT59MhT61aVQqURJRkfK8mhUDy6/ZMgjyCpalWCI8rhLtISit2pps/9G+hdt2brq4bu3itStuL1+/egdVKNvtA6HBhAcYHoTDbg5Cjec+ZuwYcmXKki1nxvx2sqDInQtNIOzB0OiypQvVeGvD0Gq1rVWzdj1bNmzat21fjU3o9e5DDcA+QBT86/BDMK7CQJSc6HLkyplHh+5cenXqPp8bap4dkQSwEryDRzTj6gzy5tETPX+o/Hr1Ptkbch8ffk35hejfR+QArAP+/iHiwlUuCEiggUQVeMiACSLok4KGMPiggzVBWIiEFSKCwD7dcKAhh9l4eIgKBaWjAiIkOmQiiiWKc+KILZLwoiEpSrQijCq6yGKOMu5oo46HFDAAAxoQoUF/BiAiJH2RRiKJyAkkvPADET8MiMKTUU5ZJQlXHgKllFRaiSWYW3ZpyJdaiulllmFyOWaabq5JppqFjABBCIVsEMEIhtiJJyF68lnIEDEEUQgQMgxhCKGGEoKoooMWemiii0rqKKWRNjrIo5VqKginmU4KKSGMijrJqaimquqqrE4SCAA7";
star[3]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl443kJuPnZqcoZ6PIAMgjqWnjamOPiQ+ra+xsI2utIy2s7qNCQMLjr2/vL6OLCQrxcfJyI3GzIzOy9KMFwPWF9TWA9iL1deMOyTiO+DiJOSL4ePl6+nm6Irq5+zziiIH2gci9vjW+vz59iUSksJcCiGKCBpEOLCguIMJHZKA2HBhRIsVHzIkZKGDAgLaQgpQ0MGCoI4fQ2obWfKkR5AqB7A0SUQHjRYlzOk00YKGDkE2ceo0x9Mn0Js5h5Io+rMmUqVLezYNmnQo06NClV51mtWqVEEYYorNAFZsTLJEwpoNiZYHVKU9/wS5faszLpG5dMXZxZt3b15zfv+SCPzXLpEKa619IIQ48eJBjdc+FoTjbw5ClfNeHpSZ7mbKljGH5jwatOZCE9Z6MJTa7GrUqg3VoGtDNm3bb2sXmp0bN1TdhHj/9q0UOKEGYh8gQh5T+SHmKp0bggEVBiLqSq0fwj5U+/Tq18FvF/89OyIJYiWcT78+pvpDM6DOQBRf6Xz48unnx29ff3/+Q91niANiOYAIgTEZeAiCKiloiAtQuYAIhEpJeAiFQ1n4YIQTcnihhxtWiAgC+WjDwYglWnPiIST6YyIiKhhkjgowyigOjYfE+NCMNe54Y48T8ZijjSTgaIiOQf54SIwBAzCgAREaEGgAIkw6CaWUVDb5ZJQDTHnICSS88AMRP0CIAiJgikmmmWiGOWaZJJz5pZtrxtmmmnDKaUiab7I5J55+FjICBCEUskEEIxgyaKGEHJqooIQaiqghQ8QQRCFAyDAEpZZiqimnlxKS6aaFVBrqIKOC6imphJi6qqqifjrJrLTWauutuEoSCAA7";
star[4]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjTeQnY+fjqGcno8gAyCOp6mNq6qojj4kPrGztbSNsriMureOCQMLv8HDwo3AxowsJCuOy82Nz87M09DK1IwXA9sX2dsD3Yva3N7kizsk6TuM6Ors6STr5/Dyiu3x7+6KIgffByL7+m37F9AfwET8DCoSkgJeCiELG6Z7GNEhxEQMLVaceBFRRo6GLHRQQOCbSQEKOlgQJJKkyW8oVbIcWfLlgJgribSs+RKnIB00WpSAR9RECxo6fgYdSjSdUaRKhTZ1ejQpEaBSpz61ipVp061RvRatKgiDzbMZyp61mZaI2bUm/9u+hbutLY+peHsIuou3qV4ifPvC+xtYMAnChgfvTZzuL5EKdAd8IASZ7uRBleFeFpR57WYiOBLnIBTa8OhBpQWfFpS672rQoknHJjQBrgdDtdfeLpT77G7atg3VEGxDOHHjfYsXGp4cOV7lhJg/P9Tg7ANE1W1ep24de/dDMPDCQBR+6njw4smnR29efftDEs5KQBTf5nz48unnPzQD7wxE/U31H3/+AVgggQIamOAhDpzlACIN2vQggw5CWOEhLuDlAiIZTrUhhhpyGCKIHopY4iEI+PMNB4ikONCKLaq4DYsoyjgAjYao4BA8KiCi40Q8+rhjOj0e8iMJEpFQZJqOQyopJJBEIlLAAAxoQIQGDRogJZVWYjmAlodMWeWVWW45ppdgGnICCS/8QMQPGaKAyJptvhnnnGy6CScJch5Cp553+pmnnXziWeeefRYyAgQhFLJBBCMYsmijhDwaqaKMOgqppJlWumkhQ8QQRCFAyDCEIaGOSkipp4IqKqmmovrqqrG6quogrMp6qyC5TuLrr8AGK+ywkgQCADs=";
star[5]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjZuMN5Cfj6GOo42liyADII6pq42trKqxrow+JD6OtriNurm3vruMCQMLjsPFjcfGxMvIjCwkK47Q0o3U09HY1YsXA94XjN3f4d4D4Nzl54ri5ow7JPA77vAk8ovv8fP59/T2iSIHyh0QoQigQIL/AnobWFDhAIYJDyoSkoJeCiETK8K7mNEixkQUPXbc+JGQhQ4KCJRbKUBBBwuCTqZcWa7ly5goVdIcYBMmEZk6afbEOXPnUCI6aLQoQa+piRY0dAhKurQpvadRpyplapUEVqlIt3b1ChUsVa5WvwrCsLNthrVt/3e+JcI27sq5de16w6u33FweY7v2EAQ4cNPBRAobhodY8eLGi+khJlKh7wdClfVeHpTZ7mZBneN+pmyZEI7IOUyjVr049aDTrVkbdj1ogl0PhmzHxV1Id1vehHzvBF77tqEahm0cT748sPJCyJ03H/u8UIO2DxBd35n90Haa3Q19XxneOnZEMMbCQK+efdf1h9K/d28VviEJbSUgwr9T/yH+NPl3X377EXjIDGPNgAiCXSl4YIILQvhgg4g40JYDFV6Y4U4YHmIhhxvS1KEhLozlAiIldnXiISlatSKJJqIY4yEICFQOB4jUuNCNOdroDY40+jgAkIbo+BCPh6hgEak9KiCi5EZMOrkkPE0mOSUJVRryJAkaYYlIAQMwoAERGlhowJdhjlnmAGceAqaYZJqJJpxrtmnIm2rKecgJJLzwAxE/lIgCInz6CaighPb5Z6AkDLqnooc2mqihjDpayAgQhFDIBhGMYAimmhLCqaeXZrppp5+aKiqqpYY6yKiGDBFDEIUAIcMQsc5a66250kqIrbgWIquvgwDb667BTqLsssw26+yzkQQCADs=";
star[6]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjZuMnYs3kKGPo46ljCADII6pq42trKqxrqiyjT4kPo64ure5u7+NCQMLjsPFwsTGysnIjMeOLCQr0dPV1I3S2IsXA94XjN3f4d4D4Nzl54ri5uTjizsk8juM8fP18iT08Pn7iSIHyh0QoQigQIL/AnobWFDhAIYJDzaUmEhIinwphCiyiFFjxYvyMm4ESUJkIQsdFBAox1KAgg4WBKFUybKcS5gyU66sOeBmTCIzd9b0mZMmT6JAdfLs+fKnDhotSuSbaqIFDR2Cnkadmq/q1axQpXIl4RUrEa1iuZYVhGEpzwxs/93WhEukrdxydO3eHZB3r7e+funyGEu4h6DBhLkaJoI4cb7FjR2TWEykwt4PhCzfxTxIs1zOgjy7BV35cmbTg3BIJpGDkGrJrVOvji3otWPagibI9WBIt1vehXwvBU5IOE/ig4zXRJ57t6Eajm08jz49sfRC0K0farD0ASLuPL1v7/6d/Pjw5dEfgkEYBiL2Y92vb/+e/iEJSyUgws9T//38+wH4X38BEnjIDITNgAiCYyl4YIILQniIA0s5gAiFPFk4YYUXcrhhhh2CeIgLhLmACIljmThiiSeyeAgCApXDASIwLiQjjTF6M+OLOQ6woyE1PnQjjzbqiIgKGOWjwqCRScqz5CFIhqQkk1I6iUgBAzCgAREaUGjAlVlu2eUAXx6CpZZcegkmmmOWaciZYqppZphpkonICSS88AMRP5CIwp157tknCX8egqeefPoJKKKDFlrICBCEUMgGEYxgCKSSEkKppY9GOmmll3qqKaidZjrIpqGaKgiqhQwRQxCFACHDEIa4CishstLa6quxzlorr7j6OsmwxBZr7LHIShIIADs=";
star[7]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjZuMnYufijeQo4+ljSADII6pq6iqrLCvroytsbSLPiQ+jrq8jb6OCQMLwsTGxY3DyYzLyM+NLCQrjtLU0dONFwPcF4zb3d/cA96L4OTi4ebj5Yrn7Yk7JPM7jPL09vMk9YoiB+MHRPT7xy3gQIACE/lDeLBgQkQLHTYcYDCRkBT6UghRdDHjRosY52k0ZKGDAgLjUgpQ0MGCoJInU45b2fKlSZQyB9B0SQQmTpk7bcbMGbTnzZw6WfL0ibSoDhotSuibaqIFDR2Cnkadqq/q1axQpXIl4RUrEQxIc2YQhDZtyrVn/92+ZSt3HNy2de/W5aZ3L1weYwP3EAQ4MNfBRAob1oeYSIW6Hwg9lht50GS3lQVdTpvZMWTJny2HFoRj8bwchEqbRj1I9WLWgya49WBIdlrahWwjxU1Id07esWfXFp6bOKEai20YQm5YeSHmgZ0XaoD0ASLqOa0fwi5TuyHuKb1Pr36d/HbzhmAEhoFI/Vj2h9xzhW9IAlIJiOznxH9Iv0z+9d2Xn4D9ERjgfojMENgMCS7Y4FgMHuIAUg4gMmFOFUpIoYUbaoghhx96KFOGhrgQmAuImDgWioeoyBWLhiAA0DgcICJjQTTaOCM3NR5yI0U5+rjjAD3GOGSRhfxIEJ+RiKiQkT4qNPnkPFEe4qRIUCJSwAAMaECEBhMaoCWXXoI5gJiHbNnll2GOuaaZaBqiZpltpkkmm2e6SWeeh5xAwgs/EPGDiSgg4iegghJq6J+BDkpCoYaMAEEIhWwQwQiRTlrppZlSSoilmBYiqaeDgNrppqESMiqqp37KaSFDxBBEIUDIMIQhsc5KSK23wiorrbZOIuywxBZr7LGTBAIAOw==";
star[8]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjZuMnYufiqGJN5CljiADIKiqrKuNqa+Msa61sK2NPiQ+jrq8jQkDC47Bw8DCxMjHxozFycyLzo0sJCuO1NaMFwPcF9rcA96L293f5ePg4ork4ebt6OeKOyT0O4zz9YsiB+AHIor7+v1LFJCbP4D8DA5EVHDAQYIJHS481PAhw4gWDwlJQY9ECiGKNnb8aMhCBwUEwKkUoKCDBUEmUaoEx9IlzJMpZw6o+ZJIzJwzed6UqVOoT5w6d7bs+TOp0aZFlwrSQaNFiY5YTbSgoWNq1atY6WnlKghDUp0Zyp6dmZaI2bXg/9q+hTtALl1udu/mpbsXblseYQPT6yEIsOCwhAVVoPuB0GK4jQc9XhtZMWPHlyVntgwZc+dBOA53zEEotGgSpAlNWOvB0OqzrQu9ThpbNWvXt2Xntg0bd+9CNUTbMBT88HBDDZI+QJRc5/JDzWc+R66ceXXo16k7t779EAzBMBB9Dxz+kISkEhCd15nePHr1792zhz9f/sz2htbfRzRD8Az+/iHiQFIOCEiggToVeMiACSI4k4KGMPiggypBWIiEFSLigmAuaMghIgj0Aw4HIIrIDYmHhGjQiCWueGKLDrGYookDoGiIijG+OKOLNSKiwkgdqeAjkPQIeUgBAzCgAYURGgxoACJIKsmkk1AmuWSTAzx5pJVTZlmllFhqaUiUV1K5JZhmjsllmIicQMILPxDxw4YotPlmnHOSUKchI0AQQiEbRDACn34CKiihfxIS6KCF9JnoIIsiaiijhDg6qaSKHtpooZlSOsgQMQRRCBAyDGEIqKISQqqpk7Tq6quwxiqrJIEAADs=";
star[9]="R0lGODlhqgARAOYAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1IczMzMfHx8bGxsLCwsHBwbq6urm5ube3t7a2trW1tbGxsbCwsK+vr66urq2traWlpaKiopycnJubm5mZmYuLi4qKin9/f3x8fHh4eHd3d3Nzc2ZmZmRkZGNjY19fXzU1NSIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAEUALAAAAACqABEAAAf/gESCg4SFhoeIiYqLjI2Oj5CRkocUkJWPl46ZjZuMnYufiqGJo4g3jyADII6pq42trKqxroywr7K3tIu2jD4kPo4JAwvBw8XEjcLIjMrHzsnG0MuLLCQrjRcD2heM2dvd2gPci97i4N/k4eOK5euJ7efmizsk9TuLIgfhByKK+fv9Ev3Txs+fPoIBEQ0cUFDgQYYJDy1sqPAhRYkWIxoSkqIeiRRCDFnooIBAuJMCFHSwIGhkyZPhUq5sSdIkzAEyWRJxaRNmTpovb/7cWfMmTpU6eRodqlQoUqA9UT4looNGixIes5poQUOHIAxGb2b4GhbmWCJgy4Y7m1btALZu/7XBjTvXbV21d8ue5ZG1b9Yegyq4/UBIsFrCgQcXVpz48GLHjcsiFmRY8mPLg3D47Zuj0ISyHgx9DhvaM2jRp02TRr1atdHShEa/Zj27UI3N9WwcamD0ASLeN33v7v2b+PDgxZEfhyncEHDmyaEfgrEZBiIJRiVcz779pvZD2L13h/ndUHjy40+WL3Reffpw6wnN2DwDkQOjDuzj138z/6H7/fEHk3+GADiggCcRWIiBCSIYjoKEuLCZC4ggsE84HFR4oTYZHmIhQRhqCCKHIjIUoocbDtChIR+aSCKKI6pY4kMrFqKCRx3VowIiBQzAgAZEaHCfATz6CKSQAxB5SHSPPwY5ZJFNIqmkIUwe+eSSRjqZJJRWbolllFdSmaWUiJxAwgs/EPGDhCgcMgIEIRSyQQQjGPJmnITMWWchd8pJp51w+rknIX3m+SefgRo66CCFDqInoHg6eiihiUq6qCBDxBBEIUDIMMQkoIYq6qikljpJIAA7";
star[10]="R0lGODlhqgARANUAAAAAAP////jGG//MHPjHHPLCHPHBHOi6HOa5HOO2HOG1HOS3HduwHNqvHNyxHdmvHNiuHNetHcylHcGcHb2ZHqqLHpt/Hpd8HpJ4HpF3HnpmH3hkH+e5HMmiHcCbHaqKHYxzH3djH3JfHzs1ISIiIv///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAACUALAAAAACqABEAAAb/QJJwSCwaj8ikcslsOp/QqPRIgVafV2e2uWV2l19lODlGlo2gAciZXjfbbHXczYS/5Xf60l7HMxMDC06Agk2Eg4GIhX+Jho2Mi0uHjpFJFwOYF0yXmZuYA5pLnKCenaKfoUqjqZaopaSnpkkiB58HIkq0triztZi3ub4DwL27wcbFv7xIusrHzsnDy0MWHQoEn9kCCh0WQtXX2Z/b3d/W2OID5N4k4Oji6+bh6fHt5+nq3Ozu+PX89PrkvdMW0N48eAUx4EuXQYjChdkakngIEZNEihUvVvykceOAjhtBZnTo8SNJjxJJVNj4gcjKii2HvIQYU8jMhTVVsnS5U2ZP/5s/dcLkOZTIBIgejBxdmLTIUnxNjSJVOtVpValMqWa1uhUr1CMN8D1AEjbdWLBiyaZFa1ZtW7bizhopG9dtXbjZ5BaRgE8CEr7p/B4BLE6wEcLZDO/t+5fxYMeHIS8O3JjyEQf4HCDBnE7z5cybQX/uHJr0aHGejXBGXZr16WypiyCw9YkDktm/at+mjcn2EdzDdP/mPcC3EeDCjMsmrpwIcuHHme/O3RtJgQEMNJDQgNmAdezauQ/wfuR69u3dv58XT96I+fDpy4NHP149/Pry18d3P5+9ffrtETECBCEUsUEEIxgxYIFEHJhgEQsaiKCCBEr4oIAVNjghhBkO4R4ghQx6uCGGIQrxIYclknAiiRZO4eKLMMYo44xTBAEAOw==";

//Run!!
//tlIMDB();