// ==UserScript==
// @name           CleanRLS
// @namespace      AJ
// @description    Remove movies with less than a specificed rating or no. of votes
// @include        http://www.rlslog.net/category/*movies*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==


// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function debug(log_txt) {
    if (console != undefined) {
        console.log(log_txt);
    }
}

// the guts of this userscript
function main() {
	var minRating = 6;
	var minVotes = 2000;

	$.expr[":"].containsNoCase = function(el, i, m) {
	    var search = m[3];
	    if (!search) return false;
	    return eval("/" + search + "/i").test($(el).text());
	};  
	
	var moviesRemovedCozOfRating = new Array();
	var moviesRemovedCozOfVotes = new Array();
	var moviesOK = new Array();

	
	var totalMovies = $("div.entry").length;
	
	// Move 'Next Page' to top
	$("div.entry").eq(0).before($("a:containsNoCase('next page')").parent().html())
	try{
		$("a:contains('Next Page')").eq(0).focus();
	} catch(err){}

	// Clean out movie entries
	$("div.entry").each(function(){
	    var movieName = $.trim($("h3",this).text()).replace(/(.*)\s\d\d\d\d.*/,'$1');
	    var ratingElemParentText = $("strong:containsNoCase('rating')",this).parent().text();
	    var ratingValue = ratingElemParentText.match(/\d\.\d/i);
	    var noOfVotes = ratingElemParentText.match(/[\d,]* votes/)
            noOfVotes = noOfVotes != null ? noOfVotes.toString().replace(/[^\d]/gi,"") : 0;	
	    
	    if (ratingValue ==null  || ratingValue < minRating ){
	        //debug("Removing : " + movieName + "\nRating: " + ratingValue);
		moviesRemovedCozOfRating.push(movieName + "(" +ratingValue+")");
	        $(this).remove();        
	    } else if ( noOfVotes==0 || noOfVotes < minVotes){
	        //debug("Removing : " + movieName + "\nVotes: " + noOfVotes);    
		moviesRemovedCozOfVotes.push(movieName + "(" +noOfVotes +")");
	        $(this).remove();        
	    } else {
	    	//debug("*******" + movieName + "***********");
		moviesOK.push(movieName + "(" +ratingValue + " , " + noOfVotes +" )");
	    }
	});

	var summary = "GOOD Movies : NEWLINE" + moviesOK.join("NEWLINE") 
		+ "NEWLINENEWLINELess Rating :("+ moviesRemovedCozOfRating.length +")NEWLINETAB" + moviesRemovedCozOfRating.join("NEWLINETAB") 
		+ "NEWLINENEWLINELess Votes  :("+ moviesRemovedCozOfVotes.length  +")NEWLINETAB" + moviesRemovedCozOfVotes.join("NEWLINETAB");

	var htmlSummary = summary.replace(/NEWLINE/g,"<br>").replace(/TAB/g,"&nbsp;&nbsp;&nbsp;");
	var textSummary = summary.replace(/NEWLINE/g,"\n").replace(/TAB/g,"\t");
	
	//debug(textSummary);
	$("div.entry").eq(0).before( htmlSummary);

	// If all movies were removed, goto next page
	if( totalMovies == (moviesRemovedCozOfRating.length + moviesRemovedCozOfVotes.length)){
		//alert("All Removed :( ")
		//alert($("a:containsNoCase('next page')").attr("href"));
		window.location = $("a:containsNoCase('next page')").attr("href") ; 
	}
}

// load jQuery and execute the main function
addJQuery(main);
