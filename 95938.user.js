// linkedin_pubmed_entry user script
// version 1.3
// 2013.04.22
// Copyright (c) 2013, J Ireland, Alternate Allele Consulting
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey script that allows the user to automatically
// fill in the publication entry form by supplying a PubMed ID.  Use
// at your own risk.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          LinkedIn PubMed Entry
// @namespace     http://alternateallele.com
// @description   Populate LinkedIn's publication page with a PubMed ID.
// @include       http://www.linkedin.com/profile/edit*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant         GM_xmlhttpRequest
// ==/UserScript==


// month translations
var MONTHS = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12,
		      'January': 1, 'February': 2, 'March': 3, 'April': 4, 'June': 6, 'July': 7, 'August': 8, 'September': 9, 
		      'October': 10, 'November': 11, 'December': 12, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
		      10: 10, 11: 11, 12: 12, '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9};



// Request queue code from: http://blog.maxaller.name/2009/01/accessing-gm_xmlhttprequest-from-event-handlers-bound-by-jquery/
var ajaxQueue = [];
var processAjaxQueue = function(){
  if (ajaxQueue.length > 0) {
    for (ajax in ajaxQueue) {
      var obj = ajaxQueue[ajax];
      // http://diveintogreasemonkey.org/api/gm_xmlhttprequest.html
      GM_xmlhttpRequest(obj);
    }
    ajaxQueue = [];
  }
}
setInterval(function(){
  processAjaxQueue();
}, 100);
 
function gmAjax(obj){
  ajaxQueue.push(obj);
}


// name comparison routine

function nameCompare(myName, lastName, foreName) {
	var score = 0;
	
	// last name appears somewhere in my name
	if (myName.search(RegExp(lastName,'i')) >= 0) {
		score += 10;
		
		// more points if last name is last!
		if (myName.search(RegExp(lastName + '$','i')) >= 0) {
			score += 1;
		}
				
	}
	
	// first name appears somewhere in my name
	if (myName.search(RegExp(foreName,'i')) >= 0) {
		score += 2;
		
		// more points if first name is first!
		if (myName.search(RegExp('^' + foreName,'i')) >= 0) {
			score += 1;
		}
	}
	
	// small points if first initial comes first
	fi = foreName.substring(0,1);
	if (myName.search(RegExp('^' + fi,'i')) >= 0) {
		score += 1;	
	}
	
	return score;
};


// replicate LI's remove fnct on author list

function removeAuthor() {
	var p = $('li.item').length;
	var li = $(this.parentNode.parentNode);
	var ul = li.parent();
	//alert($('input',li).val());
	if (p == 1) {
		// don't remove last element
		ul.addClass("min");
		$('input',li).val("");
		return;
	}
	if (p == 10) {
		ul.removeClass("max");
	}
	// shuffle contents up and remove the last li
	while (li.next('.item').length > 0) {
		var nextli = li.next('.item');
		var shift_name = $('input:first',nextli).val();
		$('input:first',li).val(shift_name);
		li = nextli;
	}
	li.remove();
	
}


// replicate LI's add fnct on author list

function addAuthor(authorName) {
	if (typeof(authorName) != 'string') {
		authorName = "";
	}
	authorName = authorName.replace(/[\>\<]/g,""); // look out for bad stuff...
	var liItems = $('li.item');
	var q = liItems[liItems.length-1];
	var ul = $('li.item').parent();
	var cnt = liItems.length;
	if (ul.hasClass("min")) {
		cnt = 0;
	}	
	
	authorCloneHtml = liItems[0].innerHTML;
	var authorClone = document.createElement(liItems[0].tagName);
	authorClone.className = liItems[0].className;
	authorCloneHtml = authorCloneHtml.replace(/<script[^>]*>([\S\s]*?)<\/script>/g, "");
	authorCloneHtml = authorCloneHtml.replace(/(id|name|for)(="{0,1}.+?)\d+(.*?"{0,1})/g, "$1$2" + cnt + "$3");
	//authorCloneHtml = authorCloneHtml.replace(/(<input[^>]*value=\")[^\"]*/, "$1" + authorName);
	authorCloneHtml = authorCloneHtml.replace(/(class=\"yui-ac-input\")/, '$1 value="' + authorName + '"');

	authorClone.innerHTML = authorCloneHtml;
	q.parentNode.insertBefore(authorClone, q.nextSibling);

	// add remove fnct
	$('.remove-item:last',q).unbind('click').click(removeAuthor);
	
	// 
	if (ul.hasClass("min")) {
		// were at min so remove min class and remove first li which acts as prototype
		ul.removeClass("min");
		liItems.eq(0).remove();
	
	}
	
	// check for end
	if ($('li.item').length == 10) {
		ul.addClass("max");
	}
}

function pubmedRequest(pubmedId) {
	var reference = new Object();
	
	gmAjax({
	    method: 'GET',
	    url: 'http://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=' + pubmedId + '&retmode=xml&rettype=citation',
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/atom+xml,application/xml,text/xml'
	    },
	    onload: function(responseDetails) {
	    	if (responseDetails.status != 200) {
	        	alert('Error with PubMed lookup.  Status code: '+ responseDetails.status + ' ' + responseDetails.statusText);
	        }
	        else {
	        	var pubtext = responseDetails.responseText;
	        	
	        	parser=new DOMParser();
	        	xmlDoc=parser.parseFromString(pubtext,"text/xml");
	        	
	        	var arttitle = xmlDoc.getElementsByTagName("ArticleTitle")[0].childNodes[0].nodeValue;
	        	reference.title = arttitle

	        	var title = xmlDoc.getElementsByTagName("Title")[0].childNodes[0].nodeValue;
	        	reference.pub_title = title;
	        	
	        	try {
	        		//var pubabstract = xmlDoc.getElementsByTagName("AbstractText")[0].childNodes[0].nodeValue;
	        		var pubabstracts = xmlDoc.getElementsByTagName("AbstractText");
	        		var ptext = "";
	        		for (var i = 0; i < pubabstracts.length; i++) {
	        			pa = pubabstracts[i];
	        			var label = pa.getAttribute("Label");
	        			if (label) {
	        				ptext += label + ": ";
	        			}
	        			ptext += pa.childNodes[0].nodeValue + "\n";
	        		}
	        		reference.abstract = ptext;
	        		//reference.abstract = pubabstract;	        		
	        	}
	        	catch(err) {
	        		// abstract not always defined
	        		reference.abstract = null;
	        	}
	        	var pubdate = xmlDoc.getElementsByTagName("PubDate")[0];
	        	var pubyear = pubdate.getElementsByTagName("Year")[0].childNodes[0].nodeValue;
	        	reference.pub_year = pubyear;
	        	
	        	var pubmonthNodes = pubdate.getElementsByTagName("Month");
	        	if (pubmonthNodes[0] != null) {
	        		var pubmonth = pubmonthNodes[0].childNodes[0].nodeValue;
	        		reference.pub_month = MONTHS[pubmonth];
	        	}
	        	else {
	        		reference.pub_month = null;
	        	}
        	
	        	var pubdayNodes = pubdate.getElementsByTagName("Day");
	        	if (pubdayNodes[0] != null) {
	        		var pubday = pubdayNodes[0].childNodes[0].nodeValue;
	        		reference.pub_day = pubday;
	        	}
	        	else {
	        		reference.pub_day = null;
	        	}
	        	
        		reference.url = 'http://www.ncbi.nlm.nih.gov/pubmed/' + pubmedId;
        		
        		var authorNodes = xmlDoc.getElementsByTagName("Author");
        		reference.authors = [];
        		for (i=0; i < authorNodes.length; i++) {
            		var authorNode = authorNodes[i];
            		var author = Object();
            		author.last_name = authorNode.getElementsByTagName("LastName")[0].childNodes[0].nodeValue;
            		author.first_name = authorNode.getElementsByTagName("ForeName")[0].childNodes[0].nodeValue;
            		reference.authors.push(author);
        		}
        		
        		fillForm(reference);
	        }
	    }
	});
}


function doiRequest(doiId) {
	var ref = new Object();
	
	gmAjax({
	    method: 'GET',
	    url: 'http://dx.doi.org/' + doiId,
	    headers: {
	        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
	        'Accept': 'application/vnd.citationstyles.csl+json'
	    },
	    onload: function(responseDetails) {
	    	if (responseDetails.status != 200) {
	        	alert('Error with DOI lookup.  Status code: '+ responseDetails.status + ' ' + responseDetails.statusText);
	        }
	        else {
	        	var jr = JSON.parse(responseDetails.responseText);
	        	('title' in jr) ? ref.title = jr['title'] : ref.title = null;
	        	('container-title' in jr) ? ref.pub_title = jr['container-title'] : ref.pub_title = null;
	        	('URL' in jr) ? ref.url = jr['URL'] : ref.url = null;
	        	
	        	// parse date
	        	if ('issued' in jr) {
	        		var pub_date = jr['issued'];
	        		var dp = pub_date['date-parts'][0];
	        		ref.pub_year = dp[0];
	        		ref.pub_day= dp[2];
	        		ref.pub_month = dp[1];
	        	}
	        	
	        	// loop through authors
        		ref.authors = [];
        		for (i=0; i < jr['author'].length; i++) {
            		var authorObj = jr['author'][i];
            		var author = Object();
            		author.last_name = authorObj['family'];
            		author.first_name = authorObj['given'];
            		ref.authors.push(author);
        		}
        		
        		fillForm(ref);
	        }
	    }
	});
}

// Fill out LI form given lit reference data

function fillForm(ref) {
	
	// determine username
	//var myName = $('a.username')[0].innerHTML;
	var myName = $("img.member-photo,img.profile-photo").attr('alt');
	//myName = myName.replace(/\s*\<span.*/, "");
	myName = myName.replace(/^\s+/,"");
	//alert(myName);

	// fill in form from reference object
	if (ref.title != null) $('#pubTitle-editPublicationForm').val(ref.title);
	if (ref.pub_title != null) $('#pubPublisher-editPublicationForm').val(ref.pub_title);
	if (ref.abstract != null) $('#pubSummary-editPublicationForm').val(ref.abstract);
    if (ref.pub_year != null) $('#year-pubDate-editPublicationForm').val(ref.pub_year);
    if (ref.pub_month != null) $('#month-pubDate-editPublicationForm').val(ref.pub_month);
    if (ref.pub_day != null) $('#date-pubDate-editPublicationForm').val(ref.pub_day);
    if (ref.url != null) $('#pubUrl-editPublicationForm').val(ref.url);
         	
    // find myself (threshold for good match is 10
    var bestScore = 9;
    var bestName = -1;
    var nauthors = ref.authors.length;
        	
    for (i=0; i < nauthors; i++) {
        var author = ref.authors[i];
        var similarityScore = nameCompare(myName, author.last_name, author.first_name);
        		
        if (similarityScore > bestScore) {
        	bestScore = similarityScore;
        	bestName = i;
        }
    }        	

    // max authors LI allows is 10 (not counting myself)
    // - work out author list and whether we should use 'et al'
    var maxAuthors = 10 + (bestName >= 0 && bestName < 10);
    var useEtal = false;
    if (nauthors > maxAuthors) {
        useEtal = true;
        nauthors = maxAuthors;
    }
            		
    // wipe out existing authors
    $('li.item:gt(0)').remove();
        	
    // clean up ul classes
    var ul = $('li.item').parent();
    ul.addClass("min");
    ul.removeClass("max");
        	
    for (i=0; i < nauthors; i++) {
        if (i == bestName) {
        	// this is me!
        	continue;
        }
        var author = ref.authors[i];
        		
        if ((i == maxAuthors - 1) && useEtal) { 
        	addAuthor("et al");
        }
        else {
        	addAuthor(author.first_name + " " + author.last_name);
        }
        	
        // blow away LI functions with our own
        $('li.add-item span:first').remove();
        var newSpan = $('<span>Add another author</span>');
        newSpan.click(addAuthor);
        $('li.add-item').prepend(newSpan);
		var pubSubmitButton = $("input[data-trk='profile-edit-publication-submit']")
		console.log(pubSubmitButton)



	 
	}
		
}


function lookupPubmed() {

	var pubmedId = $('#pubmedId').val();
	
	// determine if PubMed or DOI and do lookup
	var is_doi = false;
	var doi_pat = new RegExp("\..*\/");
	if (doi_pat.test(pubmedId)) {
		is_doi = true;
	}
	var ref = null;
	if (is_doi) {
		pubmedId = pubmedId.replace(/\s/g,""); // get rid of white space
		doiRequest(pubmedId);
	}
	else {
		// pubmed id should be an int
		pubmedId = pubmedId.replace(/\D/g,""); // get rid of non-numbers
		pubmedRequest(pubmedId);
	}
	
}

function insert_blank_form() {
	// create the PubMed text box
	// LI now embeds the form as a comment and doesn't create until "Add" pressed
	var pbf = $('#publication-blank-form').contents()[0];
	var blank_form = pbf.nodeValue;
	var formText = '<li><label for="pubmedId">PubMed ID or DOI</label><div class="fieldgroup"><span class="error" id="pubmedId-error"></span>';
	formText += '<span style="width:100%"><input style="width:64%" type="text" id="pubmedId" value="" />';
	formText += '<input style="width:10%; background: url(' + "'/scds/common/u/img/sprite/sprite_global_v8.png') no-repeat scroll 0 -2197px transparent; border: medium none;color: #0076A8;cursor: pointer;height: 20px;line-height: 1em;margin: 3px 5px 0 0;padding: 0;text-indent: -1234px; width: 18px;" + '" ';
	formText += ' value="Pubmed Search" name="pubmedsearch" onclick="$(' + "'#blankdiv'" + ').trigger(' + "'click'" + ');"></span></div></li>';
	var new_blank_form = blank_form.replace('<li><label for="pubTitle-editPublicationForm"',formText + '<li><label for="pubTitle-editPublicationForm"')
	pbf.nodeValue = new_blank_form;

	var blankDiv = '<div id="blankdiv" style="visibility:hidden"></div>';
	$('#publication-blank-form').before(blankDiv);
	$('#blankdiv').click(lookupPubmed);
	console.log('pubmed form insert complete');
}

insert_blank_form();

$( "body" ).bind(
	"DOMNodeInserted",
	function( objEvent ){
		if ( $(objEvent.target).attr('id') == "background-publications-container" ) {
			console.log($( objEvent.target ).text());
			//alert("Adding blank form!");
			insert_blank_form();
		}		
	}
);
 

