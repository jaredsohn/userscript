// ==UserScript==
// @name           Insert Mises Article
// @namespace      https://mises.org/
// @description    Inserts a link to a Mises Article into the page
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @include        http://wiki.mises.org/*edit*
// @include        https://wiki.mises.org/*edit*
// @include        https://mises.org/daily/*
// @include        https://www.mises.org/daily/*
// @include        http://mises.org/daily/*
// @include        http://archive.mises.org/*
// @include        http://bastiat.mises.org/*
// @include        http://www.fee.org/*
// @include 	   http://mises.ca/posts/*
// ==/UserScript==


// Preparing for the action, defining variables and the like.

var MODE_ARTICLE = 1;  // Daily Article
var MODE_WIKI = 2;     // Mises Wiki
var MODE_BLOG = 3;     // "old" Mises Blog
var MODE_BASTIAT = 4;  // "new" Circle Bastiat Mises blog
var MODE_OTHER = 5;	   // some other page

var MAGIC_STRING = "+++++"; // a string that is not expected to be found in your usual URL, the epitome of lazy programming

var currentURL = document.URL;			// current URL
//var currentPage = window.location.pathname;    // current page name
var mode = "";							// we'll need this later

// This DIV holds the 'Remember' button:
rememberDiv = document.createElement('div');
rememberDiv.setAttribute('style','position:fixed;right:0px;top:0px;');
document.body.appendChild(rememberDiv);

// This DIV holds the 'Insert' buttons:
finalDiv = document.createElement('div');
finalDiv.setAttribute('style','position:fixed;right:0px;top:0px;');
document.body.appendChild(finalDiv);
outputText = document.getElementById('wpTextbox1');


// Functions

// doesn't check for duplicates
function createReference( id, author, url, title, note){
  // Creates a complete reference string, like: 
  // <ref name="Rothbard_cartel">Murray Rothbard. [http://mises.org/books/mespm.pdf Man, Economy and State], Chapter 10. Referenced 2010-07-16.</ref>
  //
  // "id" is the (hopefully) unique identifier of the reference; uses underscores instead of spaces
  // "author" is for the authority of origin or an actual author;
  // "url" is the url of the source page and 
  // "title" is the page title
  // "note" is a misc. note to round things out
  // turns parameters into: <ref name="ID">AUTHOR. [URL "TITLE"], NOTE. Referenced DATE.</ref>

  var d = new Date();

  var month = d.getMonth() + 1; if (month < 10) month = "0" + month;
  var day = d.getDate(); if (day < 10) day = "0" + day;
  var year = d.getFullYear();
  var refDate = year + "-" + month + "-" + day;

  var good_id = id.replace(' ', '_');

  reference = '<ref name="' + good_id + '">' + author + '. [' + url + ' "' + title + '"], ' + note + '. Referenced ' + refDate + '.</ref>';

  //GM_log("Reference made: " + reference);
  return reference;
}

// doesn't check for duplicates
function createGeneralArticleLink( author, url, title, date){
  // Creates a generic article link, like: 
  // [http://www.fee.org/library/detail/the-truth-about-savings-and-consumption The Truth about Savings and Consumption] (with video), ''FEE'', July 2013
  //
  // "author" is for the authority of origin or an actual author;
  // "url" is the url of the source page and 
  // "title" is the page title
  // "date" is the date of the article 
  // turns parameters into: [URL TITLE] {NOTE,} by AUTHOR, DATE

  article = '[' + url + ' ' + title + '] by ' + author + ', ' + date;

  //alert("Article link: " + article);
  return article;
}

function createArticleLink( id, title, author, date){
  // Creates an "md" template link to a Mises Daily article, like:
  // * {{md|ID |Title |Author |Date}}
  //
  // "ID" is the ID of the article
  // "Title" is its title
  // "Author" is the author
  // "Date" is the published date (note that if the article was republished, only the current article publishing date will be considered)
  // (all parameters are mandatory for the template)

  articleLink = '* {{md|' + id + '|' + title + '|' + author + '|' + date + '}}';

  //GM_log("Article link made: " + articleLink);
  return articleLink;

}

function createBlogLink( id, title, author, date){
  // Creates an "mb" template link to a Mises Blog article, like:
  // * {{mb|ID |Title |Author |Date}}
  //
  // "ID" is the ID of the article
  // "Title" is its title
  // "Author" is the author
  // "Date" is the published date (note that if the article was republished, only the current article publishing date will be considered)
  // (all parameters are mandatory for the template)

  articleLink = '* {{mb|' + id + '|' + title + '|' + author + '|' + date + '}}';

  //GM_log("Article link made: " + articleLink);
  return articleLink;

}

function createBastiatLink( id, title, author, date){
  // Creates an "cb" template link to a Circle Bastiat blog article, like:
  // * {{cb|ID |Title |Author |Date}}
  //
  // "ID" is the ID of the article
  // "Title" is its title
  // "Author" is the author
  // "Date" is the published date (note that if the article was republished, only the current article publishing date will be considered)
  // (all parameters are mandatory for the template)

  articleLink = '* {{cb|' + id + '|' + title + '|' + author + '|' + date + '}}';

  //GM_log("Article link made: " + articleLink);
  return articleLink;

}

// Inserting text at cursor position, from http://pastebin.parentnode.org/78
function insertAtCaret(obj, text) {
		if(document.selection) {
			obj.focus();
			var orig = obj.value.replace(/\r\n/g, "\n");
			var range = document.selection.createRange();

			if(range.parentElement() != obj) {
				return false;
			}

			range.text = text;
			
			var actual = tmp = obj.value.replace(/\r\n/g, "\n");

			for(var diff = 0; diff < orig.length; diff++) {
				if(orig.charAt(diff) != actual.charAt(diff)) break;
			}

			for(var index = 0, start = 0; 
				tmp.match(text) 
					&& (tmp = tmp.replace(text, "")) 
					&& index <= diff; 
				index = start + text.length
			) {
				start = actual.indexOf(text, index);
			}
		} else if(obj.selectionStart) {
			var start = obj.selectionStart;
			var end   = obj.selectionEnd;

			obj.value = obj.value.substr(0, start) 
				+ text 
				+ obj.value.substr(end, obj.value.length);
		}
		
		if(start != null) {
			setCaretTo(obj, start + text.length);
		} else {
			obj.value += text;
		}
}
	
function setCaretTo(obj, pos) {
		if(obj.createTextRange) {
			var range = obj.createTextRange();
			range.move('character', pos);
			range.select();
		} else if(obj.selectionStart) {
			obj.focus();
			obj.setSelectionRange(pos, pos);
		}
}
//

function getElementByXpath(path) {
	// Returns the element with the xpath.
    return document.evaluate(path, document, null, 9, null).singleNodeValue;
}


function getMetaValue(meta_name) {
  // from here: http://stackoverflow.com/questions/6105335/handling-meta-data-with-javascript
    var my_arr = document.getElementsByTagName("meta");
    for (var counter = 0; counter < my_arr.length; counter++) {
        //console.log(my_arr[counter].getAttribute('property'));

        if (my_arr[counter].getAttribute('property') == meta_name) {
            return my_arr[counter].content;
        }
    }
    return "N/A";

}

function toPascalCase(str) {
  // Capitalizes correctly the string - first letter of each word should be uppercase, the rest lowercase
    var arr = str.toLowerCase().split(/\s|_/);
    for(var i=0,l=arr.length; i<l; i++) {
        arr[i] = arr[i].substr(0,1).toUpperCase() + 
                 (arr[i].length > 1 ? arr[i].substr(1).toLowerCase() : "");
    }
    return arr.join(" ");
}

function takeOut(str, begin, end){
  // Finds the string between begin and end in str, and strips off white characters. If there are several matches, returns only the first one.
  // Returns empty string if not found.

  //GM_log('Looking for something between' + begin + ' and ' + end);

  //GM_log("takeOut(): "+ begin+" "+end + ' ' + str.length);
  var theBegin = str.indexOf(begin);
  if(theBegin == -1){
    //GM_log("takeOut(): Didn't find string between "+begin+" and "+end);
    return "";
  }
  var afterBegin = theBegin + begin.length;
  //GM_log("takeOut(): " + str.indexOf(end, afterBegin) + ' ' + afterBegin);
  var found = str.slice( afterBegin, str.indexOf(end,afterBegin) );

  //GM_log('Search found:' + found);
  return found.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // strip white space function from http://blog.stevenlevithan.com/archives/faster-trim-javascript

}

function getArticleProperties(){ 
  // gets the Mises Daily article properties and saves them
  var title = getMetaValue("og:title");
  //alert(title);
  GM_setValue("IMA_title", title);
  //alert(GM_getValue("IMA_title"));
  
  // expected url format: http://mises.org/daily/4074/Rothbard-the-Teacher
  var url = getMetaValue("og:url");
  var id = takeOut(url, "mises.org/daily/", "/" );
  //alert(id);
  GM_setValue("IMA_id", id);

  var pageContent = document.documentElement.innerHTML;

  // expected format: <meta name="author" content="Doug  French"/>
  var author = takeOut(pageContent, '<meta name="author" content="', '"' );
  //var author = getMetaValueType("author", "content");
  //alert(author);
  author = author.replace(/ +(?= )/g,''); // remove multiple spaces
  GM_setValue("IMA_author", author);
 
  // expected format (contains newlines):
  // <strong>Mises Daily:</strong>
  // Thursday, January 28, 2010
  // by 
  var date0 = takeOut(pageContent, "<strong>Mises Daily:</strong>", "<a");
  //alert(date0);
  var date1 = takeOut(date0, "day,", "by"); // expected: January 28, 2010
 // alert(date1); 
  var date2 = date1.split(" ");
  GM_setValue("IMA_date", date2[0]+" "+date2[2]); // month and year
  //alert(date2[0]+" "+date2[2]);
  
  GM_setValue("IMA_url", currentURL);

  GM_setValue("IMA_source", MODE_ARTICLE);
}

function getBlogProperties(){ 
  // gets the Mises Blog post properties and saves them - this function is for the "old" Mises Blog

  var title = document.title;    // current page name
  //alert(title);
  GM_setValue("IMA_title", title);
  //alert(GM_getValue("IMA_title"));
  
  // expected format: http://archive.mises.org/17824/
  var id = takeOut(currentURL, "archive.mises.org/", "/" );
  //alert(id);
  GM_setValue("IMA_id", id);

  var pageContent = document.documentElement.innerHTML;

  // expected format: <span class="author"><a href="http://archive.mises.org/author/ryan_mcmaken/" title="Posts by Ryan McMaken" rel="author">Ryan McMaken</a></span>
  var author = takeOut(pageContent, ' rel="author">', '</a>' );
  //var author = getMetaValueType("author", "content");
  //alert(author);
  author = author.replace(/ +(?= )/g,''); // remove multiple spaces
  GM_setValue("IMA_author", author);
  //alert(author);
 
  // expected format (contains newlines):
  // <abbr class="published" title="2012-02-17">February 17, 2012</abbr>
  var date0 = takeOut(pageContent, '<abbr class="published" ', "/abbr>");
  //alert(date0);
  var date1 = takeOut(date0, '">', "<"); // expected: January 28, 2010
 // alert(date1); 
  var date2 = date1.split(" ");
  GM_setValue("IMA_date", date2[0]+" "+date2[2]); // month and year
  //alert(date2[0]+" "+date2[2]);
  
  GM_setValue("IMA_url", currentURL);

  GM_setValue("IMA_source", MODE_BLOG);
}

function getBastiatProperties(){ 
  // gets the Circle Bastiat blog post properties and saves them - this function is for the "new" Mises Blog

  var title = document.title;    // current page name, expected format: "Paul vs. Paul: the Video :: The Circle Bastiat"
  //alert(title);
  var title2 = takeOut(title, "", ":: The Circle Bastiat");
  GM_setValue("IMA_title", title2);
  //alert(GM_getValue("IMA_title"));
  
  // expected format: http://bastiat.mises.org/2012/04/paul-vs-paul-the-video/
  var id = takeOut(currentURL + MAGIC_STRING, "bastiat.mises.org/", MAGIC_STRING );
  //alert(id);
  GM_setValue("IMA_id", id );

  var pageContent = document.documentElement.innerHTML;

  // expected format: By <span class="author"><a href="http://bastiat.mises.org/author/sanchez/" title="Daniel J. Sanchez">Daniel J. Sanchez</a></span>
  var author = takeOut(pageContent, ' class="author">', '</span>' );
  //var author = getMetaValueType("author", "content");
  //alert(author);
  var author2 = takeOut(author, '">', '</a>'); // remove multiple spaces
  GM_setValue("IMA_author", author2);
  //alert(author2);
 
  // expected format:
  // <span class="month">April</span>
  // <span class="day">30<span class="day-suffix">th</span><span class="day-comma">,</span></span>
  // <span class="year">2012</span>

  var date0 = takeOut(pageContent, '<span class="month">', '</span>');
  var date1 = takeOut(pageContent, '<span class="year">', '</span>');
  GM_setValue("IMA_date", date0+" "+date1); // month and year
  //alert(date0+" "+date1);
  
  GM_setValue("IMA_url", currentURL);

  GM_setValue("IMA_source", MODE_BASTIAT);
}

function getFEEProperties(){ 
  // gets the properties from a FEE.org page and saves them

  var pageContent = document.documentElement.innerHTML;

  var title = takeOut(pageContent, '<h1 class="active">', '</h1>');
  //alert(title);
  GM_setValue("IMA_title", title);
  //alert(GM_getValue("IMA_title"));
  
  // expected format: <a href="http://www.fee.org/authors/detail/charles-w-baird">CHARLES W. BAIRD</a>
  var author = takeOut(pageContent, '<a href="http://www.fee.org/authors/detail/', 'a>' );
  //var author = getMetaValueType("author", "content");
  //alert(author);
  var author2 = toPascalCase(takeOut(author, '">', '</')); // remove multiple spaces???
  GM_setValue("IMA_author", author2);
  //alert(author2);
 
  // expected format:
  // <h5>OCTOBER 01, 2005 by <a href="http://www.fee.org/authors/detail/

  var date0 = takeOut(pageContent, '<h5>', ' by <a href="http://www.fee.org/authors/detail/').toLowerCase();
  var date1 = date0.split(' ');
  GM_setValue("IMA_date", toPascalCase(date1[0])+" "+date1[2]); // month and year
  //alert(date1[0]+" "+date1[2]);
  
  GM_setValue("IMA_url", currentURL);

  GM_setValue("IMA_source", MODE_OTHER);
}

function getMisesCAProperties(){ 
  // gets the Mises Institute Canaday Daily article properties and saves them
  var pageContent = document.documentElement.innerHTML;

  // Expected format (with some whitespace around): <h2><span class="blue">Rent Seeking and Library Science</span></h2>
  var title0 = takeOut(pageContent, '<h2>', '</h2>' );
  var title = takeOut(title0, '<span class="blue">', '</span>' );
  //alert(title);
  GM_setValue("IMA_title", title);
  //alert(GM_getValue("IMA_title"));
  
  // expected format: <a href="http://mises.ca/posts/author/logan-albright/" title="Posts by Logan Albright" rel="author">Logan Albright</a></span>
  var author0 = takeOut(pageContent, '<a href="http://mises.ca/posts/author/', '</span>' );
  var author = takeOut(author0, '">', '</a>' );
  //var author = getMetaValueType("author", "content");
  //alert(author);
  GM_setValue("IMA_author", author);
 
  // expected format (contains newlines):
  // <span class="article-date red">Tuesday, September 10th, 2013</span> by 
  var date0 = takeOut(pageContent, '<span class="article-date red">', "span> by");
  //alert(date0);
  var date1 = takeOut(date0, "day,", '<'); // expected: January 28, 2010
 // alert(date1); 
  var date2 = date1.split(" ");
  GM_setValue("IMA_date", date2[0]+" "+date2[2]); // month and year
  //alert(date2[0]+" "+date2[2]);
  
  GM_setValue("IMA_url", currentURL);

  GM_setValue("IMA_source", MODE_OTHER);
}

function makeRef(){
  // this builds the reference and enters it into the text
  var ref = createReference( "Reinhart_Different", "Carmen M. Reinhart and Kenneth S. Rogoff", "http://press.princeton.edu/titles/8973.html", "This Time is Different", "''Princeton University Press'', ISBN 978-0-691-14216-6");
  if(outputText) insertAtCaret(outputText, ref);
  GM_log(ref);

}

function makeLink(){
  // builds the link and enters it into the text

  var title = GM_getValue("IMA_title");
  if(title == ""){ // nothing?
    return;
  }
  var id = GM_getValue("IMA_id");
  var author = GM_getValue("IMA_author");
  var date = GM_getValue("IMA_date");
  var source = GM_getValue("IMA_source");
  var url = GM_getValue("IMA_url");

  //var alink = createArticleLink( 4074, "Rothbard the Teacher", "Doug French", "May 1995")
  if(source == MODE_ARTICLE){
    var alink = createArticleLink( id, title, author, date)
  }
  if(source == MODE_BLOG){
    var alink = createBlogLink( id, title, author, date)
  }
  if(source == MODE_BASTIAT){
    var alink = createBastiatLink( id, title, author, date)
  }
  if(source == MODE_OTHER){
    var alink = createGeneralArticleLink( author, url, title, date)
  }
  
  //alert(source + ' ' + alink);
  if(outputText) insertAtCaret(outputText, alink);
  GM_log(alink);

}

function makeRef(){
  // makes a reference and enters it into the text
  
  var title = GM_getValue("IMA_title");
  if(title == ""){ // nothing?
    return;
  }
  var id = GM_getValue("IMA_id");
  var author = GM_getValue("IMA_author");
  var date = GM_getValue("IMA_date");
  var source = GM_getValue("IMA_source");
  var url = GM_getValue("IMA_url");
  var note = "";

  //var alink = createArticleLink( 4074, "Rothbard the Teacher", "Doug French", "May 1995")
  if(source == MODE_ARTICLE){
    note = "''Mises Daily''";
  }
  if(source == MODE_BLOG){
    note = "''Mises Blog''";
  }
  if(source == MODE_BASTIAT){
    note = "''The Circle Bastiat''";
  }

  var author_parts = author.split(" ");
  var good_id = author_parts[author_parts.length-1]  + '_' + id; 	// last word plus the numerical id

  var ref = createReference( good_id, author, url, title, note);
  if(outputText) insertAtCaret(outputText, ref);
  GM_log(ref);

}

function constructControl(element, func, info, label){
  // Constructs the control interface DIV within the element, 
  // with info text (can be formatted - don't use if there are several elements!) 
  // and a label for the button.
  // func will be the Even Listener added to the object

  if(info != ""){
    element.innerHTML = info;
  }
  var div0 = document.createElement('div');
  div0.setAttribute('style','position:relative;right:0px;top:0px;');
  
  var btn = document.createElement('input');
  btn.setAttribute('type',"button");
  btn.setAttribute('value',label);
  btn.setAttribute('style','position:relative;right:0px;top:0px;z-Index:1000;');
  //btn.style.position = 'relative'; //necessary to use z-index
  //btn.style.zIndex = 1000;
 
  btn.addEventListener("click", func, true); // <- HERE to add
  div0.appendChild(btn);
  element.appendChild(div0);
  
}

// Here's where the action starts.

if(currentURL.indexOf("mises.org/daily/") != -1){
  mode = MODE_ARTICLE;
  constructControl( rememberDiv, getArticleProperties, "", "Remember Article...");
}
if(currentURL.indexOf("archive.mises.org/") != -1){
  mode = MODE_BLOG;
  constructControl( rememberDiv, getBlogProperties, "", "Remember Blog...");
}
if(currentURL.indexOf("bastiat.mises.org/") != -1){
  mode = MODE_BASTIAT;
  constructControl( rememberDiv, getBastiatProperties, "", "Remember Blog...");
}
if(currentURL.indexOf("wiki.mises.org/") != -1){
  mode = MODE_WIKI;
  constructControl( finalDiv, makeRef, "", "Insert Reference...");
  constructControl( finalDiv, makeLink, "", "Insert Link...");
}
if(currentURL.indexOf("www.fee.org/") != -1){
  mode = MODE_OTHER;
  constructControl( rememberDiv, getFEEProperties, "", "Remember Article...");
}
if(currentURL.indexOf("mises.ca/") != -1){
  mode = MODE_OTHER;
  constructControl( rememberDiv, getMisesCAProperties, "", "Remember Article...");
}
//alert(mode);
