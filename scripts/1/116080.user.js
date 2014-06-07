// ==UserScript==
// @name           google - add quotes
// @namespace      http://electrotype
// @include        http://www.google.tld/*
// @include        https://www.google.tld/*
// @include        http://google.tld/*
// @include        https://google.tld/*

// ==/UserScript==

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        main();
    }
}

// main
function main() 
{
	// add quotes on submit
	$("form").submit(function(){
	  addQuotes();
	});
	
	// amanage enter key too
	$("input").keydown(function(event){
	  if(event.keyCode == 13)
	  {
	    addQuotes();
	  }
	});
	
	var done = false;
	function addQuotes(ev) 
	{
	  if(done)
	  {
	 	return; 
	  }
	  done = true;
	
	  var searchQuery = $('input:text').val();
	  
	  var tokens = new Array();
	  
	  var inQuotes = false;
	  var inTerm = false;
	  var buff = "";
	  
	  // split terms
	  for(var i = 0; i < searchQuery.length; i++)
	  {
	    var oneChar = searchQuery.charAt(i);
	  	if(oneChar == '"')
	  	{
	  		if(inQuotes)
	  		{
	  			inQuotes = false;
	  			buff = buff + oneChar;
	  			tokens.push(buff);
	  			buff = "";
	  			continue;
	  		}
	  		else
	  		{
	  			buff = buff + oneChar;
	  			inQuotes = true;
	  			inTerm = false;
	  			continue;
	  		}
	  	}
	  	else if(oneChar == ' ')
	  	{
	  		if(!inQuotes)
	  		{
	  			if(inTerm)
	  			{
		  			inTerm = false;
		  			tokens.push(buff);
		  			buff = "";
		  			continue;
	  			}
				continue;
	  		}
	  	}
	  	else if(!inQuotes)
	  	{
	  		inTerm = true;
	  	}

	  	buff = buff + oneChar;
	  }
	  
	  // the remaining is a term
	  if(buff.length > 0)
	  {
	  	if(inQuotes && buff.length > 1)
	  	{
	  		// close missing closing quote
	  		buff += '"';
	  		tokens.push(buff);
	  	}
	  	else if(inTerm)
	  	{
	  		tokens.push(buff);
	  	}
	  }
	  
	  // create the final search query with quotes
	  var searchQueryFinal = "";
	  for(var i = 0; i < tokens.length; i++)
	  {
	  	// special google search, do not touch
	  	if(tokens[i].charAt(0) != "+" && 
	  	   tokens[i].charAt(0) != "-" && 
	  	   tokens[i].charAt(0) != "~" && 
	  	   tokens[i].charAt(0) != '"' && 
	  	   tokens[i] != "|" &&
	  	   tokens[i].toUpperCase() != "OR" &&
	  	   tokens[i].toUpperCase() != "AND" &&
	  	   tokens[i].indexOf(":") == -1 &&
	  	   tokens[i].indexOf("..") == -1 &&
	  	   tokens[i].indexOf("*") == -1)
	  	{
	  		searchQueryFinal += '"' + tokens[i] + '" '
	  	}
	  	else
	  	{
	  		searchQueryFinal += tokens[i] + ' '
	  	}
	  }
	  
	  // change search query in input
	  $('input:text').val(searchQueryFinal);
	  
	  return true;
	};
	
}


