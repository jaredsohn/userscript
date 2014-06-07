// ==UserScript==
// @name          Hide multiple results from one domain
// @description   Hides multiple results from the same domain in google
// @version       0.6
// @author        Dale Swanson 
// @namespace     http://daleswanson.org/
// @homepage      http://userscripts.org/scripts/show/11213
// @icon          http://www.google.com/favicon.ico
// @include       *.google.*/search*
// ==/UserScript==

(function(){
  // *** BEGIN CONFIGURATION *** //
  
  var MAXRESULTS = 2; //maximum allowed results from any one domain (in a row)
  var INDENT = "2em"; //ammount to indent hidden results after they are shown
  
  // *** END CONFIGURATION *** //

  var showcode;
  var newcontent;
  var thisurl, thisresult, urls;
  var multiplecount=0;
  //this is the class google uses for each result
  //each result is a <li> with class 'g':
  //<li class="g">
  var results = document.getElementsByClassName('g');
  var prevurl="www.google.com";
  var urls = ["www.google.com"];
  
  for (i = 0; i < results.length; i++)
  {//each result is stored in results
    thisresult = results[i].innerHTML; //grab contents so that we can find url
    
    urls = results[i].getElementsByTagName('a'); //grab urls, first one should be result
    if(urls[0] === undefined) 
    {//fix a bug where items with no links would crash script
      urls = ["http://www.google.com/"];
    }
    thisurl = urls[0].toString(); //thisurl should contain the full url for this result now
    
    thisurl = thisurl.replace(/^.*tp.*:\/\//,''); //strip out http:// and similar
    thisurl = thisurl.replace(/\/.*/,''); //strip out stuff after domain
    //thisurl should contain just the domain now  
    
    //there are a lot of ways to go from here:
    //1. we could just see if domain matches previous and then hide result (easy)
    //2. we could count domain, and see if it is > some set cut off (more options)
    //2.1 if we do that we should decide if count should be reset when a differnt domain is found
    
    //3. we could process domain and allow a varied level of url to count eg:
    //en.wikipedia.org vs de.wikipedia.org
    //4. the alternative to that would be just to strip www from the front, maybe some other common ones
    
    thisurl = thisurl.replace(/^www\./,''); //strip out www.
    
    
    //GM_log("\nURL"+i+": "+thisurl)
    if (thisurl == prevurl)
    {//it's a multiple
      multiplecount++;
    }
    else
    {//not a multiple
      //GM_log("\nNot multiple")
      if (multiplecount > MAXRESULTS) 
      {// end of a string of multiples, add code to show them
        //greasemonkey doesn't allow running functions on page by default
        //this is a way around that, store fct in variable, then execute as bookmarklet
        showcode = "javascript:(function() {"+
        "var results = document.getElementsByClassName('"+prevurl+"');"+
        "for (i=0; i<results.length; i++) {results[i].style.display = ''; }"+
        "document.getElementById('show"+prevurl+"').style.display = 'none';"+
        " } )()";
        
        elem="Click to show "+(multiplecount-MAXRESULTS)+" more results from "+prevurl;
        newcontent = document.createElement('p'); //empty paragraph
        newcontent.id = 'show'+prevurl;
        newcontent.setAttribute('onclick', showcode); //adds js to show hidden results onclick
        newcontent.setAttribute('style','font-size:0.8em;color:#222;cursor:pointer;margin-left:'+INDENT); //style the text
        newcontent.appendChild(document.createTextNode(elem)); //adds text
        results[i].parentNode.insertBefore(newcontent, results[i]); //inserts new link
      }
      multiplecount=1; //reset the count
    }
    
    if (multiplecount > MAXRESULTS) 
    {//over max, so hide it
      results[i].className = "g "+thisurl; //add domain to class so it can be unhidden later
      results[i].style.marginLeft = INDENT; //indent when shown
      results[i].style.display = 'none'; //hide it
    }
    prevurl = thisurl;
  } 
  
  if (multiplecount > MAXRESULTS) 
  {// end of a string of multiples, add code to show them
    //greasemonkey doesn't allow running functions on page by default
    //this is a way around that, store fct in variable, then execute as bookmarklet
    showcode = "javascript:(function() {"+
    "var results = document.getElementsByClassName('"+prevurl+"');"+
    "for (i=0; i<results.length; i++) {results[i].style.display = ''; }"+
    "document.getElementById('show"+prevurl+"').style.display = 'none';"+
    " } )()";
    
    elem="Click to show "+(multiplecount-MAXRESULTS)+" more results from "+prevurl;
    newcontent = document.createElement('p'); //empty paragraph
    newcontent.id = 'show'+prevurl;
    newcontent.setAttribute('onclick', showcode); //adds js to show hidden results onclick
    newcontent.setAttribute('style','font-size:0.8em;color:#222;cursor:pointer;margin-left:'+INDENT); //style the text
    newcontent.appendChild(document.createTextNode(elem)); //adds text
    results[results.length].parentNode.insertBefore(newcontent, results[results.length]); //inserts new link
  } 
  
  urls = null;
  results = null;
})();
