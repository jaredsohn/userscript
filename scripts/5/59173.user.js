// ==UserScript==
// @name          WorldCat to Wikipedia citation
// @description   Creates a Wikipedia citation based on the contents of a WorldCat listing
// @namespace     http://code.google.com/p/random-code/
// @include       http://www.worldcat.org/oclc/*
// @include       http://www.worldcat.org/issn/*
// ==/UserScript==

/*
  Detail:
  From a WorldCat link, generates wiki markup in the
  {{citation|...}} format for Wikipedia. See
  http://en.wikipedia.org/wiki/Template:Citation

  Notes
  =====
  Suggestions for improvement are welcome;
  Feedback on http://en.wikipedia.org/wiki/User_talk:Ash

  Changelog:
  2009-10-05 Created based on my other script http://userscripts.org/scripts/show/58747
  May be some remaining issues as this is a major re-write including getting detail for
  articles published in journals.
  	-06 Improved format of abstracts.
  	-08 Support for format type and language.
  	-10 Added recommended website detection and DOI.
  	-11 Better journal volume numbering and date extraction.
  	-12 Toggle url button and if OCLC url included when ISBN exists
  	-13 Add sort fields so name, year, title are at the beginning
  	-21 Improved volume and page range identification and added search dropbox
  	-23 Add 3-state ref button, toggling layout button and improve author sort order
  2010-11-02 Change to using {{harvnb}} template.

*/
var version='2 November 2010';
var utitle='', uisbn='', uauthor='', usummary=null, uoclc='', upub='', uyear='', uissn='', udoi=''; uurl='', uformat=''; // url versions
var helpText='<p><b>Instructions</b></p>\
<p style=margin-top:0.75em;>The citation above is automatically populated \
based on the WorldCat entry you are currently viewing. You can edit the text on this page \
inside the text box. For more help on the citation parameters see \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/Template:Citation target=_blank>\
[[template:citation]]</a>. Some handy buttons available are:<\p>\
<div style=margin-left:2em;margin-top:0.75em;>\
<p><input style=font-size:8pt; type=button value="Highlight text"> highlight all text ready for cut & paste\
<p><input style=font-size:8pt; type=button value="<==>"> expand the text for more easily readable layout\
<p><input style=font-size:8pt; type=button value="=><="> collapse the text\
<p><input style=font-size:8pt; type=button value=&laquo> <input style=font-size:8pt; type=button value=&raquo> increase/decrease the size of the edit text box\
<p><input type=button style=font-size:8pt;color:darkblue; value="&lt;ref&gt"> wrap the citation with ref tags to \
turn it into a footnote (click again to remove automatic name and again to remove tags)\
<p><input type=button style=font-size:8pt;color:red; value=Reset> undo all changes\
<p><input type=button style=font-size:8pt;color:darkblue; value=quote> add a quote (copy part of the text first, \
then paste it into the pop-up box)\
</div>\
<p style=margin-top:0.75em;><i>\
Feedback and bug reporting can be left on my Wikipedia user talk page \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/User_talk:Ash target=_blank>\
[[User talk:Ash]]</a>. \
Before you report a bug, check you have installed the latest version available on \
<a href=http://userscripts.org/scripts/show/59173 target=_blank>userscripts.org</a>.\
</i></p>\
<p style=margin-top:1.5em;color:grey;font-size:small;>Release date of this script: '+version+'</p>';


/**
 * Throughout, whitespace is defined as one of the characters
 *  "\t" TAB \u0009
 *  "\n" LF  \u000A
 *  "\r" CR  \u000D
 *  " "  SPC \u0020
 *
 * This does not use Javascript's "\s" because that includes non-breaking
 * spaces (and also some other characters).
 */


/**
 * Determine whether a node's text content is entirely whitespace.
 *
 * @param nod  A node implementing the |CharacterData| interface (i.e.,
 *             a |Text|, |Comment|, or |CDATASection| node
 * @return     True if all of the text content of |nod| is whitespace,
 *             otherwise false.
 */
function is_all_ws( nod )
{
  // Use ECMA-262 Edition 3 String and RegExp features
  return !(/[^\t\n\r ]/.test(nod.data));
}


/**
 * Determine if a node should be ignored by the iterator functions.
 *
 * @param nod  An object implementing the DOM1 |Node| interface.
 * @return     true if the node is:
 *                1) A |Text| node that is all whitespace
 *                2) A |Comment| node
 *             and otherwise false.
 */

function is_ignorable( nod )
{
  return ( nod.nodeType == 8) || // A comment node
         ( nod.nodeType == 3); // a text node
}

/**
 * Version of |previousSibling| that skips nodes that are entirely
 * whitespace or comments.  (Normally |previousSibling| is a property
 * of all DOM nodes that gives the sibling node, the node that is
 * a child of the same parent, that occurs immediately before the
 * reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest previous sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_before( sib )
{
  while ((sib = sib.previousSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |nextSibling| that skips nodes that are entirely
 * whitespace or comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The closest next sibling to |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function node_after( sib )
{
  while ((sib = sib.nextSibling)) {
    if (!is_ignorable(sib)) return sib;
  }
  return null;
}

/**
 * Version of |lastChild| that skips nodes that are entirely
 * whitespace or comments.  (Normally |lastChild| is a property
 * of all DOM nodes that gives the last of the nodes contained
 * directly in the reference node.)
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The last child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function last_child( par )
{
  var res=par.lastChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.previousSibling;
  }
  return null;
}

/**
 * Version of |firstChild| that skips nodes that are entirely
 * whitespace and comments.
 *
 * @param sib  The reference node.
 * @return     Either:
 *               1) The first child of |sib| that is not
 *                  ignorable according to |is_ignorable|, or
 *               2) null if no such node exists.
 */
function first_child( par )
{
  var res=par.firstChild;
  while (res) {
    if (!is_ignorable(res)) return res;
    res = res.nextSibling;
  }
  return null;
}

/**
 * Version of |data| that doesn't include whitespace at the beginning
 * and end and normalizes all whitespace to a single space.  (Normally
 * |data| is a property of text nodes that gives the text of the node.)
 *
 * @param txt  The text node whose data should be returned
 * @return     A string giving the contents of the text node with
 *             whitespace collapsed.
 */
function data_of( txt )
{
  var data = txt.data;
  // Use ECMA-262 Edition 3 String and RegExp features
  data = data.replace(/[\t\n\r ]+/g, " ");
  if (data.charAt(0) == " ")
    data = data.substring(1, data.length);
  if (data.charAt(data.length - 1) == " ")
    data = data.substring(0, data.length - 1);
  return data;
}

function cnvrt2title(str) {
	return str.toLowerCase().replace(/\b\w+\b/g, cnvrt);
    function cnvrt() {
    	if (arguments[arguments.length -2] == 0)
        	return arguments[0].replace(/^[a-z]/, cnvrt2);
        else if (/^(a|about|after|an|and|at|by|for|from|in|into|nor|of|on|onto|over|the|to|up|with|within)$/.test(arguments[0]) )
            return arguments[0];
        else
            return arguments[0].replace(/^[a-z]/, cnvrt2);
        }
	function cnvrt2() {
		return arguments[0].toUpperCase();
    }
}

function randomString(n) {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var string_length = n;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

function authorSplit(a, fl) { // Attempt to get lastname, first name ordered
	a=a.replace(/\s+/g," ");
	var myA=a.split(' '), myS='', myF='';
	// check for organizations or oddities
	if(a.match(/association|organi|inc\.|charity|trust|society|archive|[\(\[\{\.\,]| (&|&amp;) /i)!==null){
		return (fl==1 ? a : myF);
	}
	// check for nobiliary particles if name is more than one word
	if (myA.length>1 && (myA[myA.length-2].match(/^von$|^van$|^de$/i)!==null) && (myA.length<5)) { // Needs expansion
		myS=myA[myA.length-2]+' '+myA[myA.length-1];
    	myF=myA.slice(0,myA.length-2).join(' ');
	} else if (myA.length<5) {
	   	myS=myA[myA.length-1];
	    myF=myA.slice(0,myA.length-1).join(' ');
	    if(myS.replace(/[\.\s]/g,"").length<2){
	    	var swap=myS;
	    	myS=myF;myF=swap;
	    }
	} else {myS=a}; // Skip strangely long names, likely organizations*/
	return (fl==1 ? myS : myF);
}

function infoFromBook() {
	var s = '';
	var nauthors=1;
    var neditors=1;
    // Get title
    var bibdata=document.getElementById('bibdata');
    if(bibdata!==null){utitle=bibdata.childNodes[1].innerHTML}else{utitle="unknown"};
    utitle=utitle.replace(/\[/g,"&#91;").replace(/]/g,"&#93;")
    	.replace(/[\.\;\,]*$/,"").replace(/<.*>/g,"").replace(/[\n\r]/g,""); // cleanup
    s+=" |title="+utitle;
    // Check for WorldCat recommended URL
    var xurl=document.getElementById('links-all856');
    if(xurl!==null){xurl=xurl.getElementsByTagName('a')};
    if(xurl!==null){
    	uurl=xurl[0].href;
    	if(uurl.match(/url=/)!==null){
    		uurl=uurl.split(/url=/)[1].split(/%26checksum/)[0];
    		uurl=uurl.replace(/%3A/g,":").replace(/%2F/g,"/").replace(/%3F/g,"?")
    			.replace(/%3D/g,"=").replace(/%26/g,"&").replace(/%(|25)5F/g,"_"); // tidy
    		if(uurl.length<8){uurl=''}; // Trivial case
    		// Check for DOI websites
    		if(uurl.match("http://dx.doi.org/")!==null ||
    			uurl.match("http://www.palgraveconnect.com/doifinder/")!==null ||
    			uurl.match("http://dx.medra.org/")!==null
    			){
    			udoi=uurl.split(/doi.org\/|doifinder\/|dx.medra.org\//)[1];
    			uurl='';
    		}
    	}else{uurl=''}
    }
    // Look for all other <th> tags
    var bibHead=document.getElementsByTagName('th');// th = Author:, Publisher:, Edition/Format:
    if(bibHead!==null){
    	var c='';for(var i in bibHead){c+="|"+i+"|"+bibHead[i].innerHTML+"|"};GM_log("<th> list = ("+c+")");
    	for(var i=0;i<bibHead.length;i++){
    		c=bibHead[i].innerHTML;
    		if(c.match(/Author:/)!==null){
    			var authors=bibHead[i].nextSibling.nextSibling.childNodes;
    			var count=0;
    			for(var n=0;n<=authors.length-1;n++){
    				if ((!is_ignorable(authors[n])) && (count<4)){// skip text nodes between anchors
    					count++;
    					var author=authors[n].innerHTML;
    					author=author.replace(/[;,\.:-]$/,""); // clean up
      					GM_log("author"+count+" (node "+n+") = "+author);
      					if (authorSplit(author,0)!==''){
      						s+=" |last"+(count==1?'':count)+"="+authorSplit(author,1);
      						s+=" |first"+(count==1?'':count)+"="+authorSplit(author,0);
      						if(count==1){uauthor=authorSplit(author,1)};
      					} else if(author.match(/online service/i)!==null) {
      						count--; // skip if silly author match
      					} else {
      						s+=" |author"+(count==1?'':count)+"="+author;
      						if(count==1){uauthor=author};
      					}
      				}
      			}
      		}
      		if(c.match(/ISBN:/)!==null){
    			uisbn=bibHead[i].nextSibling.nextSibling.innerHTML.split(" ");
    			uisbn=uisbn[uisbn.length-1];
      			GM_log("uisbn = "+uisbn);
      			s+=" |isbn="+uisbn;
      		}
      		if(c.match(/ISSN:/)!==null){
    			uissn=node_after(bibHead[i]).innerHTML.replace(/\D/g,"");
      			GM_log("uissn = "+uissn);
      			s+=" |issn="+uissn;
      		}
      		if(c.match(/OCLC Number:/)!==null){
    			uoclc=node_after(bibHead[i]).innerHTML;
      			GM_log("OCLC = "+uoclc);
      			if(uisbn==''){s+=" |oclc="+uoclc}; // only default to OCLC if ISBN does not exist
      		}
      		if(c.match(/Publication:/)!==null){
    			var upublication=node_after(bibHead[i]);
    			var vol,loc;
    			loc=upublication.innerHTML.replace(/&amp;/g,"&");
    			// Find year in publication field
    			if(loc.match(/\(\d{4}\)/)!==null){
    				uyear=loc.match(/\(\d{4}\)/)[0].replace(/\D/g,"");
    			}
    			if(loc.match(/\(\d{4}\D\d{2}\D\d{2}\)/)!==null){ //full date numeric
    				uyear=loc.match(/\(\d{4}\D/)[0].replace(/\D/g,"");
    			}
    			// Includes text of date?
    			if(loc.match(/\(\w{3,10}\D(| )(\d{1,2}|)\D(| )\d{4}\)/)!==null){
    				uyear=loc.match(/\d{4}\)/)[0].replace(/\D/g,"");
    			}
    			if(uyear!==''){
    				if(s.search(" |year=")>-1){
    					s=s.replace(/ \|year=\d{4}/,""); // rm year from publisher
    				}
    				s+=" |year="+uyear;
    				if(loc.match(/\[.*\d{4}.\d{4,}\]/)==null){ // keep if complex range
    					loc=loc.replace(/(|[,;\.]) \(\d{4}\)/,"")
    						.replace(/\(\w{3,10}\D(| )(\d{1,2}|)\D(| )\d{4}\)/,"");
    				}
    			}
    			if(loc.search('</a>')>0){
    				vol=loc.split('</a>')[0].split('>')[1];
    				vol=vol.replace(/[\.,;:]$/,"");
    				if(vol.match(/[^\w\s]/)==null){vol=cnvrt2title(vol)};
    				s+=" |journal="+vol;
    				loc=loc.split('</a>')[1];
    			}
    			// Check for page range (I think 'str.'='pp.' in czech?)
    			if(loc.match(/(:|,) ?(p\.)?(str\.)? ?\d+-\d+$/)!==null){
    				s+=" |pages="+loc.match(/(:|,) ?(p\.)?(str\.)? ?\d+-\d+$/)[0]
    					.replace(/[\s:,]/g,"").replace(/p\.|str\./,"");
    				loc=loc.replace(/(:|,) ?(p\.)?(str\.)? ?\d+-\d+$/,"");
    			} else if (loc.match(/: \d+$/)!==null){ // Single page ref
    				s+=" |page="+loc.match(/: \d+$/)[0].replace(/[\D]/g,"");
    				loc=loc.replace(/: \d+$/,"");
    			}
    			loc=loc.replace(/^([\s\.\,\;\:\-](\s*))/,""); // tidy start
    			// Check for volume number after checking for embedded year
    			if(loc.match(/(^|v|vol|volume)\.? ?\d+,? ?/i)!==null){
    				var vol=loc.match(/(^|v|vol|volume)\.? ?\d+,? ?/i)[0].replace(/\D/g,"");
    				if(vol.match(/\d{4}/)!==null && uyear=='' &&
    					parseInt(vol.match(/\d{4}/)[0])<2040){ // Year probably in freaky place
    					uyear=vol.match(/\d{4}/)[0];
    					if(vol.length<6){vol=''};
    					s+=" |year="+uyear;
    				}
    				if(vol!==''){s+=" |volume="+vol};
    				loc=loc.replace(/^(|v|vol|Vol|volume)\.? ?\d+,? ?/i,"");
    				// Check for sub-section number
    				if(loc.match(/^(Part|no\.|number|n\.) \d+/i)!==null){
    					s+="."+loc.match(/\d+/)[0]; // add subsection to volume number
    					loc=loc.replace(/^(Part|no\.|number|n\.) \d+[\.,;:]*/i,"");
    				}
    			}
    			loc=loc.replace(/^\s+|\s+$/,"");
      			if(loc.length>0){s+=" |location="+loc};
      		}
      		if(c.match(/Publisher:/)!==null){
    			upub=node_after(bibHead[i]).innerHTML;
      			GM_log("upub = "+upub);
      			upub=upub.replace(/&amp;/g,"xampx");
      			var year=upub.match(/\d{4}/);
      			if(year!==null && uyear==''){uyear=year[0];s+=" |year="+uyear};
      			if(upub.match(/\[.*\d{4}.{4,}\]/)==null){ // keep if complex range
      				upub=upub.replace(/(|,|;|\.)(| )(|©|c)([\(\[]|)(\d{1,2}.\d{1,2}.|)\d{4}(\?|)([\)\]]|)/,"");
    			}
      			upub=upub.split(';')[0]; // pick first publisher
      			if(upub.split(' : ').length>1){upub=upub.split(' : ')[1]}; // trim country
      			upub=upub.replace(/[\.\s-;:,]+$/,""); // trim any trailing punctuation
      			upub=upub.replace(/xampx/,"&amp;");
      			if(upub.length>2){ // ignore if only contained the year
      				s+=" |publisher="+upub;
      			}
      		}
      		if(c.match(/Edition\/Format:/)!==null){
      			uformat=node_after(bibHead[i]).innerHTML;
      			// assume anything after last colon is language
				var ulang=uformat;
				ulang=ulang.split(':')[ulang.split(':').length-1]
					.replace(/<.*>/g,"").replace(/\W/g,"");
      			GM_log("ulang = "+ulang);
      			if(ulang!=='English'	// Trap mis-matches for foreign languages
      				&& ulang.match(/script|document|book/i)==null	// eg. Manuscript
      				&& ulang.match(/\d/)==null 
      				&& ulang.match(/rev$|ed$|^EN$/i)==null
      				&& ulang.match(/Article/i)==null
      				){s+=" |language="+ulang};
      			// assume first item before colon is format
      			uformat=uformat.split(':')[0].replace(/<.*>/g,"")
      				.replace(/[^\w\s\-\/]/g,"").replace(/^\s+/,"");
   				GM_log("uformat = "+uformat);
   				// if not book or article add format
   				if(uformat.match(/thesis|video|audio|image|music|visual/i)!==null){
   					s+=" |format="+uformat.replace(/\s+$/,"");
   				}
   			}
   			if(c.match(/Series:/)!==null){
   				var series=node_after(bibHead[i]).innerHTML;
   				series=series.replace(/<.*?>/g,"").replace(/\s+/g," ").replace(/^\s|\s$/g,"");
   				s+=" |series="+series;
   			}
      	}
    }
    if(udoi!==''){s+=" |doi="+udoi}; // if exists, doi at end
    var abstractTxt=document.getElementById('details-abstract');
    if(abstractTxt!==null){
    	abstractTxt=node_after(abstractTxt);
    	usummary=abstractTxt.innerHTML.replace(/[\r\f\n]|<[^>]*>/g," ").replace(/\'/g,"&rsquo;").replace(/"/g,"&rdquo;").replace(/\s\s+/g," ");
    	GM_log("SET usummary = "+usummary);
    }
	return s;
}

function showCitationFromInfo(info, url) {
	var s = '{{citation', testUrl=false;
    s += info;
    if(uurl==''){ // check if there was a recommended url
      	uurl=url;
    }else{testUrl=true};
    if(uurl!=='' && (uisbn!==''||uurl.match(/worldcat.org/)==null)){s += /*' |url=' + uurl +*/ '}}'}else{s+='}}'};
    // sort into preferred order
    var ord=new Array("author[4-9]=","first4","last4","author3","first3","last3","first2","last2",
    	"title=","year=","author1?=", "first1?=", "last1?="); // Reverse order
    for(var i=0;i<ord.length;i++){
   		if(s.search(ord[i])>0){
      		var m='\\|'+ord[i]+'[^\\|]+';
      		if(s.match(m)!==null){
      			var mm=s.match(m)[0];
      	  		s=s.replace(/(\{\{citation )/,"$1"+mm);
      	  		s=s.split(mm)[0]+mm+s.split(mm)[1]+s.split(mm)[2];
      	  	}
      	 }
      }
      // Toggle pre-existing citation box
      var test=document.getElementById('cite');
      if(test!==null){
      	test.parentNode.parentNode.removeChild(test.parentNode);
      	document.getElementById('myCite').getElementsByTagName('button')[0].innerHTML="Show&nbsp;citation";
      	} else {
      	document.getElementById('myCite').getElementsByTagName('button')[0].innerHTML="Hide&nbsp;citation";
      	// Create citation box buttons
      	var tb = document.getElementById('banner-cont');
      	var cite=document.createElement('div');
      	var taRows=parseInt(s.length/70);
      	var plusRows=0; // How many rows are too long for text box
      	for(var i=0;i<s.split(' |').length;i++){if(s.split(' |')[i].length>75){++plusRows}};
      	s.replace(/'/g,"&#146;"); // change single quotes
      	// Create summary / abstract
      	var sSummary=s.replace(/}}$/,(usummary!=='' ? " |quote="+usummary+"}}" : "}}"));
      	var ref=s; // Generate ref name of the style "Smith1990"
      	ref=ref.replace(/[^\w\|\s'-=\{\}]/g,""); // erase foreign chars
      	ref=(ref.match(/last1?=[-\w']+ /)!==null ? ref.match(/last(|1)=(([-\w']+) )+/)[0].replace(/last1?=/,"").replace(/ /g,"") : "")+
      		(ref.match(/author1?=/)!==null ? ref.match(/author1?=[-\w\s']+/)[0].replace(/author1?=/,"").replace(/ /g,"") : "")+
      		(ref.match(/year=/)!==null ? ref.match(/year=\d{4}/)[0].replace(/year=/,"") : "");
      	if(ref.match(/^\d/)!==null){ref="auto-"+randomString(2)+"-"+ref};
      	// Create Harvard style template
      	var harvRef=s;
      	harvRef="{{harvnb"+
      		(harvRef.match(/last(|1)=[-\w']+ /)!==null ? 
      			"|"+harvRef.match(/last(|1)=(([-\w'\.]+) )+/)[0].replace(/last(|1)=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/author(|1)=([-\w'\.]+)/)!==null ? 
      			"|"+harvRef.match(/author(|1)=(([-\w'\.]+) )+/)[0].replace(/author(|1)=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last2=([-\w'\.]+) /)!==null ?
      			"|"+harvRef.match(/last2=(([-\w'\.]+) )+/)[0].replace(/last2=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/author2=([-\w'\.]+) /)!==null ? 
      			"|"+harvRef.match(/author2=(([-\w'\.]+) )+/)[0].replace(/author2=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last3=([-\w'\.]+) /)!==null ?
      			"|"+harvRef.match(/last3=(([-\w'\.]+) )+/)[0].replace(/last3=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last4=([-\w'\.]+) /)!==null ?
      			"|"+harvRef.match(/last4=(([-\w'\.]+) )+/)[0].replace(/last4=/,"").replace(/ $/,"") : "")+
			(harvRef.match(/year=/)!==null ? "|"+harvRef.match(/year=\d{4}/)[0].replace(/year=/,"") : "")+
			"}}";
		var magcite="{{mag |"+utitle+" |"+upub+" |"+uissn+(uoclc!==''?" |"+uoclc:"")+"}}";
		var copac="http://copac.ac.uk/search?" + // Create copac link
			("au="+uauthor+"&ti="+utitle+"&sort-order=ti%2C-date")
			.replace(/[^\w\s=\&]/g,"").replace(/\s/g,"+");
		var search=(utitle+" "+uauthor)
			.replace(/\b[^\s]{1,2}\b/g,"").replace(/[^\w\-\s]/,"")
			.replace(/\s+/g,"+").replace(/[,\.:;]/g,"");
		var worldcat="http://www.worldcat.org/search?q="+(uisbn.length>1 ? "bn%3A"+uisbn : 
			"%20ti%3A"+utitle+"%20au%3A"+uauthor+(uyear>0?"%20yr%3A"+uyear:""))+
			"&qt=advanced&dblist=638";
		var gbooks="http://books.google.com/books?q="+
			(uisbn.length>1 ? uisbn:utitle+" "+uauthor)
			.replace(/[^\w\s]/g,"").replace(/\s/g,"+");
		// TEXT BOX
      	cite.innerHTML = '\n<form name=cite id=cite><p style="font-size:12pt;font-weight:bold;margin-bottom:0px;">'+
      	'<span title="Edit and copy citation, useful additional fields include &quot;quote&quot; and &quot;page&quot;">'+
      	'Wikipedia citation</span> <input style="font-size:8pt" type="button" value="Highlight Text" title="Click to highlight all text for copying" '+
      	'onClick="javascript:this.form.citation.focus();this.form.citation.select();"> '+
      	 // Database droplist
      	' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
<a id=golink name=golink target="_blank" style="font-size:8pt" \
href="'+gbooks+'">Search</a>&nbsp;\
<SELECT NAME="droplist" id=droplist title="Search for &quot;'+
utitle.split(':')[0].replace(/[^\w\s]/g,"")+'&quot; at selected site" \
ONCHANGE="javascript:document.getElementById(&quot;golink&quot;).href=\
this.form.droplist.options[this.form.droplist.selectedIndex].value;" \
style="font-size:8pt;">\
<OPTION SELECTED="SELECTED" VALUE="'+gbooks+'+">Google Books</OPTION>\
<OPTION VALUE="'+copac+'">Copac</OPTION>\
<option value="http://www.librarything.com/search_works.php?q=\
'+search+'&go=Go">Library Thing</option>\
<option value="http://catalogue.bl.uk/F/?func=find-b&request='+
search+'&find_code=WRD&adjacent=N">British Library</option>\
</SELECT> \
</p>\n'+
      	'<p style="margin-top:2px;margin-bottom:0px;">'+
      	// +URL button
      	'<input id="b_url" style="font-size:8pt" type="button" value="URL" '+
      	'onClick="javascript:var v=this.form.citation;'+
      	'if(this.form.citation.value.match(/\\|(| )*url(| )=/)!==null){'+
      	'this.form.b_url.value=&quot;URL&quot;;'+
      	'v.value=v.value.replace(/(\\n|| )*\\|(| )*url(| )=(| )[^}\\n\\|]*/,&quot; &quot;)'+
      	'}else{this.form.b_url.value=&quot;No URL&quot;;'+
      	'v.value=v.value.replace(/}}$/,&quot; |url='+uurl+' }}&quot;)}";> '+
      	// +(only if found) test URL link
      	(testUrl ? '<a style="font-size:8pt" title="Test recommended website in new tab." '+
      	'href="'+uurl+'" target=_blank >Test URL</a> ' : '')+
      	// +abstract button (if text exists)
      	(usummary!==null ? '<input style="font-size:8pt" type="button" title="Insert quote from &quot;Book overview&quot;" '+
      	'value="Add abstract" '+
		'onClick="javascript:getElementById(&quot;citebox&quot;).rows+='+
		parseInt(usummary.length/70)+
      	';this.form.citation.value=&quot;'+sSummary+'&quot;";> ' : '' )+
      	// +ref button with smart 3 state behaviour
      	'<input title="Add automatically named reference tags for footnote" name="bRef" id="bRef" '+
      	'style="font-size:8pt;color:darkblue" type="button" value="<ref>" '+
      	'onClick="javascript:var v=this.form.citation,t=this.form.bRef;'+
      	'v.value='+	
      	'(v.value.search(/\\<ref name\\=/)>-1 ? '+
      	'v.value.replace(/(\\<ref) name\\='+ref+' /,&quot;$1&quot;)'+ //2nd click
      	' : (v.value.search(/\\<ref( *)>/)>-1 ? '+
      	'v.value.replace(/\\<ref>|<.ref>/g,&quot;&quot;)'+ //3rd click
      	' : v.value.replace(/^{{|^\\*{{/,&quot;<ref name='+ref+ //1st click
      	' >{{&quot;).replace(/}}$/,&quot;}}</ref>&quot;)));'+
      	'if(v.value.search(/ref name=/)>0){t.title=&quot;Click to remove ref name&quot;;t.style.color=&quot;darkgreen&quot;}'+ // Colour changer
      	'else if(v.value.search(/\\<ref\\>/)>-1){t.title=&quot;Click to remove ref tags&quot;;t.style.color=&quot;red&quot;}'+
      	'else{t.title=&quot;Add automatically named reference tags for footnote&quot;;t.style.color=&quot;darkblue&quot;};"> '+
      	// +Mag button
      	(uisbn=='' && uformat.match(/magazine|journal/i)!==null ? '<input '+
      	'title="Show the simple alternative {{mag}} template citation." '+
      	'style="color:darkblue;font-size:8pt" type="button" value="{{mag}}" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows=1;this.form.citation.value='+      	'&quot;'+magcite+'&quot;;getElementById(&quot;addfields&quot;).style.display=&quot;none&quot;"> ':'')+
		// +Harvard button
      	'<input title="Create Harvard style cross-reference to full citation" '+
      	'style="color:darkblue;font-size:8pt" type="button" value="H" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows=1;this.form.citation.value='+	
      	'&quot;'+harvRef+'&quot;;getElementById(&quot;addfields&quot;).style.display=&quot;none&quot;"> '+
      	// +Add bullet button
      	'<input title="Bullet" style="color:darkblue;font-size:8pt" type="button" value="*" '+		
      	'onClick="javascript:this.form.citation.value='+
      	'this.form.citation.value.replace(/^{{/,&quot;*{{&quot;);"> '+
      	// +Reset button
      	'<input title="Reset the citation text, wiping out changes" '+
      	'style="color:red;font-size:8pt" type="button" value="Reset" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows='+taRows+
      	';this.form.citation.value=\''+s.replace(/'/g,"&#146;").replace(/"/g,"&quot;")+'\';getElementById(&quot;addfields&quot;).style.display=&quot;&quot;;'+
      	'this.form.bRef.style.color=&quot;darkblue&quot;";> '+ // Reset ref button
      	// Text area start
      	'<p style="font-size:medium;">'+
      	'<table><tr><td><textarea style="padding:0.5em;border-color:black;border-style:solid;border-width:1px;" rows='+taRows+
      	' cols=85 name=citation id=citebox>'+s+'</textarea></td>'+
      	'<td valign=top>'+
     	// Squeeze & Expand
      	'<td valign=top align=center>'+
      	'<input id="bSqueeze" name="bSqueeze" title="Reduce size by removing some spaces" '+// Squeeze
      	'type="button" style="display:none;" value="=><=" onClick="javascript:getElementById(&quot;citebox&quot;).rows='+taRows+
      	';this.form.citation.value='+
      	'this.form.citation.value.replace(/\\n*\\s* /g,&quot; &quot;)'+
      	'.replace(/\\n/g,&quot;&quot;).replace(/ = /g,&quot;=&quot;)'+
      	'.replace(/\\| /g,&quot;|&quot;).replace(/ }}/g,&quot;}}&quot;);'+
      	'this.form.bSqueeze.style.display=&quot;none&quot;;'+
      	'this.form.bExpand.style.display=&quot;&quot;;"> '+
      	''+
      	'<input id="bExpand" name="bExpand" title="Long layout" '+		// Expand
      	'type="button" value="<==>" onClick="javascript:this.form.citation.value='+
      	'this.form.citation.value.replace(/\\n*\\s*\\|/g,&quot;\\n |&quot;).replace(/\\n*\\s*}}/g,&quot;\\n}}&quot;)'+
      	'.replace(/\\?id=/,&quot;idxxx&quot;).replace(/(\\w)=(\\w)/g,&quot;$1 = $2&quot;).replace(/idxxx/,&quot;?id=&quot;);'+
      	'getElementById(&quot;citebox&quot;).rows=this.form.citation.value.split(/\\n/).length+'+plusRows+';'+
      	'this.form.bSqueeze.style.display=&quot;&quot;;'+
      	'this.form.bExpand.style.display=&quot;none&quot;"> '+
      	'<br>'+
      	'<input title="Take one row off textbox" '+		// Nudge -1
      	'type="button" value="&laquo;" onClick="javascript:'+
      	'var r=getElementById(&quot;citebox&quot;);if(r.rows>1){r.rows-=1};"> '+
      	'<input title="Add one row to textbox" '+		// Nudge +1
      	'type="button" value="&raquo;" onClick="javascript:'+
      	'getElementById(&quot;citebox&quot;).rows+=1;"> '+
      	'</td></tr></table></p>\n'+ // Text area end
      	'<p style="margin-top:2px;margin-bottom:2px;font-size:8pt;">'+
      	// +help
      	'<input id=showHelp title="Show instructions" '+
      	'type=button value="Help" '+
      	'onClick="javascript:var h=getElementById(&quot;helpText&quot;),t=this.form.showHelp;'+
      	'if(t.value==&quot;Help&quot;){'+
      	'h.style.display=null;'+
      	't.value=&quot;Hide help&quot;;t.style.color=&quot;red&quot;}else{'+
      	'h.style.display=&quot;none&quot;;'+
      	't.value=&quot;Help&quot;;t.style.color=&quot;black&quot;}'+
      	';" > '+
      	// Additional fields
      	'<span id=addfields> Add field: '+
      	// +page
      	'<input title="Add a page number to the citation (e.g. 55 displays as p.55)" '+
      	'style="color:darkblue" type=button value=page '+
      	'onClick="javascript:var p=prompt(&quot;Page number&quot;);if(p.length>0){'+
      	'this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |page=&quot;+p+&quot; }}&quot;)};" > '+
      	// +pages
      	'<input title="Add range of page numbers to the citation (eg. 23-5 displays as pp.23-5). '+
      	'Do not use with page=." style="color:darkblue" type=button value=pages '+	
      	'onClick="javascript:var p=prompt(&quot;Page range&quot;);if(p.length>2){'+
      	'this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |pages=&quot;+p+&quot; }}&quot;)};" > '+
      	// +quotation
      	 '<input title="Add quotation to the citation" style="color:darkblue" type=button value=quote '+
      	'onClick="javascript:var q=prompt(&quot;Quotation&quot;);if(q.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |quote=&quot;+q+&quot; }}&quot;)};" > '+
      	// +OCLC
      	 '<input title="Add OCLC (Online Computer Library Center ID number), such as 3185581 (superfluous when ISBN is given)"'+
      	 ' style="color:darkblue" type=button value=oclc '+
      	'onClick="javascript:var c=prompt(&quot;OCLC number&quot;,'+uoclc+');if(c.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |oclc=&quot;+c+&quot; }}&quot;)};" > '+
      	// +DOI
      	'<input title="Add DOI - The Digital Object Identifier System is a managed system for persistent identification of content-related entities on digital networks."'+
      	' style="color:darkblue" type=button value="doi" '+
      	'onClick="javascript:var c=prompt(&quot;DOI number&quot;,&quot;'+udoi+'&quot;);if(c.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |doi=&quot;+c+&quot; }}&quot;)};" ></span> '+
      	'</p><div id="helpText" style="display:none"><p><table><tr>'+
      	'<td style="padding:2em;background:#C8FFC8;">'+
      	helpText+'</td></tr></table></p></div>'+
      	'</form>';
      	with(cite.style){
      		backgroundColor='lightblue';
      		border='solid black 1px';
      		padding='8px';
      		margin='2px';
			marginTop='1em';
			width='720px';
		}
      	tb.parentNode.insertBefore(cite,tb); // Insert before titlebar
      	}
    }


    function showCitationFromPage() {
      var u = cleanURI();//location.href;
      var book = u.split('&')[0];
      GM_log('Getting info from '+book);
      var info = infoFromBook();
     showCitationFromInfo(info, u);
    }
    
    function cleanURI() {
    return location.href.split('&')[0].split('?')[0];
    }

    //Add a main buttons to the top bar
    function add_link(text, title, func, id) {
      var bar = document.getElementById('useracct');
      var link = document.createElement('a');
      var tlink= document.createElement('td');
      link.title = title;
      link.innerHTML = text;
      link.style.textDecoration = 'none';
      link.style.fontSize='8pt';
      link.id=id;
		link.innerHTML='\n'+link.innerHTML;
      var dofunc = function(event) {
        event.stopPropagation();
        event.preventDefault();
        func();
      };
      link.addEventListener('click', dofunc, false);
      tlink.appendChild(link);
      bar.parentNode.parentNode.insertBefore(tlink, bar.parentNode.previousSibling);
    }

GM_log('Adding link to top');
add_link('<button style="margin-left:2px;">Show&nbsp;citation</button>', 'Show a Wikipedia formatted citation for this book', showCitationFromPage,'myCite');
