// ==UserScript==
// @name           show rating for single movie
// @namespace      kevin
// @include        http://yyets.com/showresource-movie-*.html
// @description    This script is used to fetch the rating/grade for the movie in yyets.com. 
//                 
// ==/UserScript==

/*
   There are so many movies in yyets.com for downloading, interesting ones or time-killer. 
 I don't want to spend almost two hours on a poor movie. But I cann't find whether the movie
 is interesting or not before I go through it. Fortunately, we have the web sites which rate
 the movie such as Mtime, douban, and IMDB.
 
   This script is to get the rating/grade value from the web service and show on the web of 
 yyets.com.
   
   Here, because there is no interface to get the grade from Mtime, this script only provides
 the link to search the movie.

*/


function generate_mtime_grade(movie)
{	
	//get_mtime_grade(movie);
	return '<a href="http://search.mtime.com/search/movie?'+movie+'">'+
	       '<b>\u65F6\u5149\u7F51\u8BC4\u5206</b>'+
	       '</a>';	       
}

function generate_douban_grade(movie)
{	
	return '<a href="http://movie.douban.com/subject_search?search_text='+movie+'&cat=1002">'+
	       '<b>\u8C46\u74E3\u8BC4\u5206</b>'+
	       '</a>';	       
}

function update_douban_grade(imdb_id, div_id)
{
  var douban_gd = "N/A";
  GM_xmlhttpRequest({
		       method: 'GET',
		       url: 'http://api.douban.com/movie/subject/imdb/'+imdb_id,
		       headers: {
		              'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		              'Accept': 'application/atom+xml,application/xml,text/xml',
 	                },
 	           onload: function(responseDetails) { 
 	                        //GM_log(responseDetails.responseText);
 	                        var parser = new DOMParser();
 	         	            var dom = parser.parseFromString(responseDetails.responseText,
 	         	                                             "application/xml");	
 	         	            var gds = dom.getElementsByTagName('gd:rating'); 
 	         	            if(gds.length == 1)
 	         	            {
 	         	              douban_gd = gds[0].getAttribute("average"); 	         	              
 	         	            }
 	         	            else
 	         	            {
 	         	              GM_log("not find element gd");
 	         	            }
 	         	            GM_log(imdb_id+": "+douban_gd);
 	         	            
 	         	            var div_inserted = document.getElementById(div_id);
 	         	            div_inserted.innerHTML = div_inserted.innerHTML.replace('\u8C46\u74E3\u8BC4\u5206',
 	         	                                                                    '\u8C46\u74E3\u8BC4\u5206'+": "+douban_gd);
 	         	      }
 	          });
}

function generate_imdb_grade(movie, div_id)
{
	movie = movie+"";
	movie = movie.replace(/\s/g, "+");
	var grade = "";
	var imdbid = "";
	GM_xmlhttpRequest({
		       method: 'GET',
		       url: 'http://www.deanclatworthy.com/imdb/?q='+movie+'&type=xml',
		       headers: {
		              'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		              'Accept': 'application/atom+xml,application/xml,text/xml',
 	                },
 	         onload: function(responseDetails) { 
 	         	   //GM_log(responseDetails.responseText);
 	         	   var parser = new DOMParser();
 	         	   var dom = parser.parseFromString(responseDetails.responseText,
 	         	                                    "application/xml");	
 	         	   var imdbids = dom.getElementsByTagName('imdbid')
 	         	   if(imdbids.length == 1)
 	         	   {
 	         	     imdbid = imdbids[0].textContent;
 	         	     GM_log(movie+": "+imdbid);
 	         	     update_douban_grade(imdbid, div_id);
 	         	   }
 	         	   else
 	         	   {
 	         	     GM_log("not found imdbid for '"+movie+"'"); 	         	     
 	         	   }                            	         	   
 	         	            	
 	         	   var entries = dom.getElementsByTagName('rating'); 	         	   
 	         	   if(entries.length == 1)
 	         	   {
 	         	   	 grade = entries[0].textContent;
 	         	   	 GM_log(movie+": "+grade); 
 	         	   }
 	         	   else
 	         	   {
 	         	   	 grade = 'N/A';
 	         	   	 GM_log("Film '"+movie+"' not found");
 	         	   }
 	         	   var div_inserted = document.getElementById(div_id);
 	         	   div_inserted.innerHTML = div_inserted.innerHTML+
 	         	   	                        '<b>IMDB: '+grade+'</b>'; 	         	   
 	         	}
  });
  
}

function trim_space(str)
{
	str.replace('\uFF0C', ',');
	str.replace('\u3002', '.');
	str.replace('\uFF1A', ':');
	str.replace('\u201C', '"');
	str.replace('\u201D', '"');
	str.replace('\u2018', "'");
	str.replace('\u2019', "'");	
	
	return str.match(/[a-zA-Z][a-zA-Z0-9,\.:\"\s\']*[a-zA-Z0-9]/);
}

var mainbox = document.getElementById('mainbox');
var dtrmain = document.evaluate(
                                 ".//div[@class='dtrmain']",
                                 mainbox,
                                 null,
	                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                               null).snapshotItem(0);
if(dtrmain)
{ 
	title_obj = document.evaluate(
                                ".//h2",
                                mainbox,
                                null,
	                              XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	                              null).snapshotItem(0);
  title_line = title_obj.textContent;
  if(title_line)
	{
		var start_idx_chn = title_line.indexOf('\u300A');
		var end_idx_chn = title_line.indexOf('\u300B', start_idx_chn);
		var start_idx_eng = title_line.indexOf('(', end_idx_chn);
		var end_idx_eng = title_line.indexOf(')', start_idx_eng);
		
		
		if( (start_idx_chn>0) && (end_idx_chn>start_idx_chn) &&
		    (start_idx_eng>0) && (end_idx_eng>start_idx_eng) )
		{
			var movie_name_chn = title_line.substr(start_idx_chn+1, end_idx_chn-start_idx_chn-1); 
			var movie_name_eng = title_line.substr(start_idx_eng+1, end_idx_eng-start_idx_eng-1); 
		  movie_name_eng = trim_space(movie_name_eng);
		  GM_log(movie_name_chn );
		  GM_log(movie_name_eng );
		  
		  var grade = document.createElement('h3');
		  grade.innerHTML = '<div id=movie_item_by_kevin>'+
		                    '<span>\u3010\u8BC4\u5206\u3011</span> '+ //【评分】
		                    generate_mtime_grade(movie_name_chn)+
		                    ' '+
		                    generate_douban_grade(movie_name_chn)+
		                    ' </div>';
		  title_obj.parentNode.insertBefore(grade, title_obj.nextSibling);
		  generate_imdb_grade(movie_name_eng,'movie_item_by_kevin');  
		  
		}	                                 
	}
}