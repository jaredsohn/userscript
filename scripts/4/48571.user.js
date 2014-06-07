// Scorehero-Rock Band 2 Top Scores Script
//
// --------------------------------------------------------------------
//
//	
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           ScoreHero - RB2 Top Scores
// @version        1.4
// @namespace      http://userscripts.org/scripts/show/48571
// @description    Shows the top scores on the "View Player's Scores" and "Submit your Scores" pages on ScoreHero: RockBand 2. Supports all instruments, all group types, all difficulties, etc.  Updated to fix a bug with sorted scores.
// @include        http://rockband.scorehero.com/manage_scores.php?*
// @include        http://rockband.scorehero.com/scores.php?*
// @author		   Tidwell
// ==/UserScript==
// 

// Adding in jquery
var $;

// Add jQuery
var GM_JQ = document.createElement("script");
GM_JQ.src = "http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js";
GM_JQ.type = "text/javascript";
document.body.appendChild(GM_JQ);

// Check if jQuery's loaded
var checker=setInterval(function(){
	if(typeof ($ = unsafeWindow.jQuery) != "undefined") {
		clearInterval(checker);
		letsJQuery();
	}
},100);




// the actual code
function letsJQuery() {
	//console.log(Date());
	/*Lets figure out what settings they are using by getting the Query Data from the URL*/
	query = location.href;
	query = query.replace('http://rockband.scorehero.com/manage_scores.php', '');
	query = query.replace('http://rockband.scorehero.com/scores.php', '');
	
	/*Make Request to script and get back json data*/
	$.getJSON("http://www.aarontidwell.com/scorepics/get_sh_tops_2.0.php"+query+"&jsoncallback=?", function(redata){
		/*Cycle through and show the top scores*/
		display_tops(redata);
		//console.log(Date());
	});
}

function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

//ripped from: http://www.netlobo.com/url_query_string_javascript.html
function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function format_title(songtitle) {
	songtitle = songtitle.replace('&amp', '');
	songtitle = songtitle.replace(re, "");
	return songtitle;
}

function display_tops(allscores) {
	allrows = $('.headrow').parent().children('tr');
	row_list = Array();
	
	//num cells we have to traverse to find the scores field changes depending on which page were on
	if (location.href.indexOf('manage_scores.php') == -1) {
		numcell = 5;
	}
	else {
		numcell = 4;
	}
	
	//get the list of rows that contain songs
	$.each(allrows, function(index, item) {
		if ($($(item).children()[0]).hasClass('tier1') != true && $(item).hasClass('headrow') == false && typeof(item) != 'undefined') {
			row_list[row_list.length] = item; 		
		}
	});

	//regex for songname parsing
	re = new RegExp("[^A-Za-z0-9]", "g");
	
	//need to strip all that bullshit out of titles so it doesnt break if they have sorted
	if (gup('sort')) {
		revisedscores = {};
		$.each(allscores, function(songname, info) {
			mysongname = format_title(songname);
			revisedscores[mysongname] = info; 
		});
		allscores = revisedscores;
	}
	


	i = -1; //i will track what row we are on
	$.each(allscores, function(songname, info) {
		i++;
		//get the html inside the score tablecell
		score_elem = $($(row_list[i]).children('td')[numcell]);
		
		//if they have sorted by something else, we need to change to have the correct top-score
		if (gup('sort')) {
			songtitle = $($(row_list[i]).children('td')[numcell-2]).children('a').html();
			songtitle = format_title(songtitle);
			info = allscores[songtitle];
		}
		
		do_score_calcs_and_replace(score_elem, info);
		
		
	});
	
	//if they sorted we need to also manually fill in the final row
	if (gup('sort')) {
		container = $('.headrow').parent().children('tr');
		score_elem = $($(container[container.length-1]).children('td')[numcell-2]);
		songtitle = $(score_elem).children('a').html();
   		songtitle = format_title(songtitle);
   		//now that we got the title, redefine the score_element
   		score_elem = $($(container[container.length-1]).children('td')[numcell]);
		info = allscores[songtitle];
		do_score_calcs_and_replace(score_elem, info);
	}
}

function do_score_calcs_and_replace(score_elem, info) {
	scoreparse = score_elem.html();
	if (scoreparse != '<span class="error">NO SCORES SUBMITTED</span>') {
		//if they have a picture or video link
		if (scoreparse.indexOf('</a>') != -1) {
			//if they have a video
			if (scoreparse.indexOf('/images/video.gif') != -1) {
				//check to see if they ALSO have a screenshot (why?)
				if (scoreparse.indexOf('<a alt="View Screenshot"') != -1) {
					//if they do, grab the score from inside the screenshot link
					scoreparse = $(score_elem.children('a')[0]).html();
				}
				//otherwise just deal with the video
				else {
					//split it (html is:   123,456 <a href=....  so we can split on the space)
					scoreparse = scoreparse.split(' ');
					scoreparse = scoreparse[0];
				}

			}
			else {
				//just picture, so get their score from inside that
				scoreparse = $(score_elem.children('a')[0]).html();
			}
		}
								
		//split it in case they have the Gold-Star plugin
		scoreparse = scoreparse.split('<br>');
		
	
		//do the math (gatta do the .replace twice because there could be 2 commas)
		scoredif = scoreparse[0].replace(',','').replace(',','') - info.score.replace(',','').replace(',','');
		//make sure we still have a #
		if (isNaN(scoredif)) {
			scoredif = '';
		}
		else {
			scoredif = ' <span style="font-size: 8px; color: green;">('+addCommas(scoredif)+')</span>';
		}
		/*insert the score*/
		htmldata = '<br /><span style="font-size: 10px; color: #6600CC">'+info.score + scoredif+'</span>';
		score_elem.append(htmldata);
	}
	else {
		//console.log('No Score Container found for: '+songname);
	}
}

