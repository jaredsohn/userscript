// ==UserScript==
// @name           btjunkie.org with IMDB Ratings (very dirty alpha version)
// @description    Uses IMDB movie ratings to resize and colorize the btjunkie.org's movie torrent links
// @include        http://btjunkie.org/*
// @author         source888 ( original script by Beatniak (original script by Keyvan Minoukadeh) )
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require        http://tablesorter.com/jquery.tablesorter.js
// ==/UserScript==

// color settings
var color = {
  def:"#62638F", // -------> sets default text slightly lighter
  bad:"#CF9B9B", // -------> rating 1 - 5
  r06:"#090", // ----------> rating 6
  r07:"#055F00", // -------> rating 7
  r08:"#000", // ----------> rating 8 and higher
  watched:"#1D5F9F", // ---> watched color
  activesort:"#B39E8E" // -> table header bg color for active sort
}
var removeAds = GM_getValue('removeAds', true);  // Remove the ads on the movie pages? Default is true.
var fullWidth = GM_getValue('fullWidth', false);  // Set full or normal width of the results table. Default is false.

// END OF SETTINGS

GM_registerMenuCommand('btjunkie.org with IMDB Ratings - '+ (removeAds ? "Don\'t r" : "R") +'emove ads', function() 
{
	GM_setValue('removeAds', !removeAds);
  location.reload();
});

GM_registerMenuCommand('btjunkie.org with IMDB Ratings - '+ (fullWidth ? "Don\'t s" : "S") +'et full width', function() 
{
	GM_setValue('fullWidth', !fullWidth);
  location.reload();
});

var icon = {
  sort:"data:image/gif;base64,R0lGODlhFQAJAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAkAAAIXjI+AywnaYnhUMoqt3gZXPmVg94yJVQAAOw==",
  desc:"data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjI8Bya2wnINUMopZAQA7",
  asc:"data:image/gif;base64,R0lGODlhFQAEAIAAACMtMP///yH5BAEAAAEALAAAAAAVAAQAAAINjB+gC+jP2ptn0WskLQA7"
}

var style = ".odd {background:#F2ECE7 !important} .even {background:#F6F1EE !important}";
    style += "#tableHead tr th.header {background:#D2B9A6 url("+icon.sort+") right center no-repeat;cursor:s-resize;}";
    style += "#tableHead tr.header th.headerSortDown {background:"+color.activesort+" url("+icon.desc+") right center no-repeat}";
    style += "#tableHead tr.header th.headerSortUp {background:"+color.activesort+" url("+icon.asc+") right center no-repeat}";
    style += "#pagination a {border:0 none;color:#000099 !important;}"; // set to original tpb CSS

if (fullWidth) { // set styles for full/normal width
    style += "#main-content, #main-content table#searchResult, #pagination {margin:0;}";
} else {
    style += "#main-content {margin:0;} #main-content table#searchResult, #pagination {max-width:1100px;margin:0 auto;}";    
}
if (removeAds) {
    style += ".ad, .ads, iframe {display:none;}";
    $(".ad, .ads, iframe").css('display','none');
}

function removePagination(){
  	var pagination = $("#searchResult tbody tr:not([id])").html();
		$("#searchResult tbody tr:not([id])").css('display','none');
    if(pagination) // top 100 pages don't have pagination
    {
    $("#main-content").append('<div id="pagination" style="text-align:center;background:#F6F1EE;padding:3px 0;">'+pagination+'</div>');
    }
}

// Script Update Checker by Jarett (http://userscripts.org/scripts/review/20145)
var SUC_script_num = 58258;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 43200000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

// The three functions below borrowed from Julien Couvreur's "Inline IMDB Ratings" script (http://userscripts.org/scripts/review/11360)
function findImdbID(url) {
  var m = url.match(/^http:\/\/(.*\.)?imdb.com\/title\/(tt\d*)/i);
  if (m) return m[2];
  return null;
}

function getMovieInfo(imdbUrl, index, callback) {
  var url = imdbUrl;
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(details) {
      callback(extractMovieInfo(details.responseText, index, url));
    }
  });
}

function extractMovieInfo(content, index, url) {
  var voted = content.match(/<span id="voteuser">(\d+)<\/span>/i);
  if(voted) {
    var watched = voted[1];
  }
  else {
    var watched = '';
  }
  var match = content.match(/<b>(\d.\d)\/10<\/b>/);
  var title = content.match(/<title>([^<]+)<\/title>/);
  return { rating: match[1], index: index, url: url, title: title[1], watched: watched };
}

// Some code below borrowed from Keyvan Minoukadeh's "The Pirate Bay + IMDB Ratings" script (http://userscripts.org/scripts/show/35126)
$(document).ready(function() {
		var title, re, found, url1, url2, res;		
		$("tab_results tr.header th").eq(0).html('<a id="sortButton" style="cursor:s-resize;display:block" title="sort by rating">IMDB</a>');
		$("#searchResult tbody, tbody a").css('color', color.def);
		//$("td.vertTh").text('...');
		//$(".LightOrange").text('...');
		
		
	
		

	  /* start tablesorting --------------------------------------------------- */
    $.tablesorter.defaults.widgets = ['zebra'];
	  $("#searchResult").tablesorter({
      //debug: true,
      headers:{
        0:{sorter:'digit'},
        2:{sorter:false},
        3:{sorter:false},
        4:{sorter:false},
        5:{sorter:false},
        6:{sorter:false}
      }
    });
		$("#sortButton").click(function() {
			$("#sortButton").css('display', 'inline');
      $("#searchResult").tablesorter({
        sortList: [[0,0],[5,0]],
        headers:{
          2:{sorter:false},
          3:{sorter:false},
          4:{sorter:false},
          5:{sorter:false},
          6:{sorter:false}
        }        
      });
		});	  
    $("body").append('<style>'+style+'</style>');
		/* end tablesorting ----------------------------------------------------- */
		
		$(".detLink,.BlckUnd").each(function(i) {
			//$(this).parent().parent().attr('id', 'row'+i);
			$(this).parent().parent().parent().parent().parent().parent().attr('id', 'row'+i);
			$(this).css('white-space', 'nowrap');
			title = $(this).text();
			
			//alert(title);
			
			// get rid of irrelevant text
			re = /([^\(\[]+)/i;
			found = title.match(re);
			title = found[0].replace(/\./g, "+");
			title = title.replace(/(PROPER|SUBBED|UNSUBBED|unrated|XviD|REPACK|RECODE)/gi, ''); // scene tags (didn't include limited & internal!)
			title = title.replace(/(DVDSCR|dvdrip|DVD5|DVD9|DVDR|DVD|screener|cam|r3|r5|LINE|STV|TELESYNC|TELECINE|VHSRip|WORKPRINT|AC3|H264|BluRayRip|BluRay|720p|1080p|x264)/gi, ''); // sources (didn't include TS & TC)
			title = title.replace(/(aXXo|KLAXXON|kingben|FxM|PUKKA|DASH||MAXSPEED|FxM|bulldozer|ltt|AKCPE|BeStDivX|DivxMonkey|STG|crazy-torrent)/gi, ''); // uploader names
			title = title.replace(/(tracker.BTARENA.org|.avi|No Rars|NORARS|norar|SWESUB|NLSUB|Multisub)/gi, ''); // URL's in title and other fuckups
			
      title = title.replace(/ /g, "+");
			url1 = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';
			
			GM_xmlhttpRequest({
			  method:"GET",
			  index:i,
			  url:url1,
			  onload:function(details) {
          var res;
				  res = eval('(' + details.responseText + ')');
				  url2 = res.responseData.results[0].unescapedUrl;
				  if (findImdbID(url2) != null) {
					  getMovieInfo(url2, this.index, function(imdb) 
            { 
              if(imdb.watched) // You've already seen this movie!
              {
                rating_color = color.watched;
                imdb.rating = imdb.rating+' (you rated:'+imdb.watched+')'; 
              }
  						else // Set default colors for every score range 
              {
                if(imdb.rating < 6) 
                  {rating_color = color.bad;}
    						else if(imdb.rating >= 6 && imdb.rating < 7) 
                  {rating_color = color.r06;}
                else if(imdb.rating >= 7 && imdb.rating < 8) 
                  {rating_color = color.r07;}
                else 
                  {rating_color = color.r08;}
              }
				  // Set the color and size for the links
				  $("#row"+imdb.index+", #row"+imdb.index+" a.BlckUnd").css('color', rating_color)
				  $("#row"+imdb.index+" .BlckUnd").css('color', rating_color).animate({fontSize: (imdb.rating*20)+'%'}, 500);
				  $("#row"+imdb.index+" ").append('<a href="'+imdb.url+'" title="'+imdb.title+'" style="color:'+rating_color+'">'+imdb.rating+'</a>');
					  });
				  } 
          else 
          {
					 //$("#row"+this.index+" th").html('<b>:(</b>'); // <b>  needed for correct sorting
				  }
        }
			});
		});
		removePagination(); // remove the pagination TD for sorting without the pagination
});