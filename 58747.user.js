// ==UserScript==
// @name          Wikipedia citation from Google Books
// @description   Generates {{citation}} wiki markup from Google Books links
// @namespace     http://code.google.com/p/random-code/
// @require       http://ecmanaut.googlecode.com/svn/trunk/lib/gm/wget.js
// @include       http://books.google.tld/*
// @include       http://books.google.com/*
// ==/UserScript==
//
// Copyright (c) 2009-2012, Fae
// Released under Creative Commons Attribution ShareAlike 2.5

/*
  Description
  
  From a Google Books link, generates wiki markup in the
  {{citation|...}} format, suitable for inclusion on Wikipedia:
  http://en.wikipedia.org/wiki/Template:Citation

  For example, when at the URL:
  http://books.google.com/books?id=_tnwmvHmVwMC&pg=PA5&dq=%22The+trouble+is%22
  you can click "Show citation" to get
  {{citation | title=Asymptotic Methods in Analysis | author1=N. G. de Bruijn | edition=3, illustrated | year=1981 | publisher=Courier Dover Publications | isbn=9780486642215 | page=5 | url=http://books.google.com/books?id=_tnwmvHmVwMC&pg=PA5&dq=%22The+trouble+is%22}}
  which is in the right format for Wikipedia, more or less.

  Changelog:
  Earlier history trimmed as this is a variation.
  2009-09-28 A number of cosmetic and bug fixes.
  - Now handles multiple line titles.
  - Alert box changed to editable text area with optional format buttons.
  - Trim button added to give a cut down version of the book page.
  - Citation format breaks name into first and last names (not 100% accurate but good for 95%+ of situations).
  - Auto-naming of ref tag based on author name and year.
  2009-09-29 Fixed bug with hyphenated surnames and wrong matches for nobiliary particle
  2009-09-30 Added sort to bring name, year, title at the lead of citation and improve Harvard cite,
    skip firstname/lastname split for foreign characters.
  2009-10-06 Bugfix on Publisher using "&", surnames using "'" and Harvard citation building
	-17 Add inbuilt help button
	-21 Add droplist of searches
	-23 Make ref button fully toggling, expand button now toggles, url button toggles, 
	editors button toggles, fix box width, improve search droplist
  2010-01-13 Change default to editors not showing.
  2010-05-09 Allow c+cedilla in author name. Change contact details. Default to no url.
  2010-10-12 Repair after unexpected metadata formats when GBooks introduce Export Citation.
  2010-11-02 Use {{harvnb}} rather than {{harv}}.
  2012-06-29 Some slightly dirty fixes after Google changed their layout, significantly.
*/

var version='29 June 2013';
var utitle='', uisbn='', uauthor='', uyear='', ueditors=''; // globals
var helpText='<p><b>Instructions</b></p>\
<p style=margin-top:0.75em;>The citation above is automatically populated \
based on the Google Books entry you are currently viewing (on the overview page). You can edit the text on this page \
inside the text box. For more help on the citation parameters see \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/Template:Citation target=_blank>\
[[template:citation]]</a>. Note that Google Books listings sometimes unnecessarily duplicate \
the authors as editors, click the "No editors" button to remove them. Some other \
handy buttons available are:<\p>\
<div style=margin-left:2em;margin-top:0;>\
<input type=button value="Highlight text"> highlight all text ready for cut & paste\
<br><input type=button value="<==>"> expand the text for more easily readable layout\
<br><input type=button value="=><="> collapse the text\
<br><input type=button value=&laquo> <input type=button value=&raquo> decrease/increase the size of the edit text box\
<br><input type=button style=color:darkblue; value="&lt;ref&gt"> wrap the citation with ref tags to \
turn it into a footnote (click again to remove the automatic name and yet again to remove tags)\
<br><input type=button style=color:red; value=Reset> undo all changes\
<br><input type=button style=color:darkblue; value=quote> add a quote (copy part of the text first, \
then paste it into the pop-up box)\
</div>\
<p style=margin-top:0.75em;><i>\
Note that some non-ascii characters in author names may be blanked out.\
</i></p>\
<p style=margin-top:0.75em;><i>\
Feedback and bug reporting can be left on the script discussion page \
<a style="font-size:80%" href=http://userscripts.org/scripts/discuss/58747 target=_blank>\
discuss</a>. \
Before you report a bug, check you have installed the latest version available on \
<a href=http://userscripts.org/scripts/show/58747 target=_blank>userscripts.org</a>.\
</i></p>\
<p style=margin-top:1.5em;color:grey;font-size:small;>Release date of this script: '+version+'</p>';

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

if(!this.gbcitation && window === window.top) {
  var gbcitation = function () {

    function do_doc(url, func) { wget(url, func, /*runGM=*/false, /*div=*/false); }
    function assert(cond, str) { if (!cond) { throw new Error('Assertion failed: ' + str); } }
    String.prototype.startsWith = function(str) { return (this.indexOf(str) === 0); };

    function infoFromBook(doc) {
      var s = '';
      var nauthors=1;
      var neditors=1;
      var metadata_rows = doc.getElementById('metadata_content_table').childNodes[0].childNodes;
      for(var ti=0;ti<metadata_rows.length;++ti) {
        var mrow = metadata_rows[ti].childNodes;
        if(mrow==undefined){mrow=''};
        try{assert(mrow.length === 2, "Unexpected metadata format")}catch(err){continue};
        try{assert(mrow[0].className === 'metadata_label', "metadata_label does not exist")}catch(err){continue};
        try{assert(mrow[1].className === 'metadata_value', "metadata_value does not exist")}catch(err){continue};
        var label = mrow[0].innerHTML;
        label=label.replace(/<span [^>]*?>/g,"").replace(/<.span>/g,"");
        if (label.startsWith('Author') ||
			label.startsWith('Title') ||
			label.startsWith('Compile') ||
			label.startsWith('Edit') ||
			label.startsWith('Publish') ||
			label.startsWith('ISBN')) {} else {
        	GM_log('infoFromBook(): Ignoring ' + label);
        	continue;
        }
        GM_log('infoFromBook(): label is "' + label+'"');

        var values = mrow[1].childNodes;
        var value = '';
        for(var vi=0; vi<values.length; ++vi) {
          if(vi%2 === 1 && !label.startsWith('Title')) {
            assert(values[vi].nodeValue === ', ', "even ones are commas");
            continue;
          }
          value += (value==='' ? '' : ',') + values[vi].innerHTML;
        }
        value = value.replace(/\[/g,"&#91;").replace(/]/g,"&#93;").replace(/<span [^>]*?>/g,"").replace(/<.span>/g,"");
        GM_log('infoFromBook(): value is "' + value+'"');

        if(label === 'Title') { 
        	utitle=value.split(",,")[0].replace(/(&amp;|.)nbsp;/gi," ");
          s += ' | title=' + utitle;
          utitle=utitle.replace(/[^\w ]/g," ").replace(/\s\s+/g," ");
          continue;
        }
        if(label === 'Author' || label === 'Authors' || label === 'Translated by') {
          var authors=value.split(',');
          // u00C7 = c+cedilla
          // u00E9 = e+acute
          // u00E8 = e+grave
          if(value.match(/[^A-Za-z\-\u00C7\u00E9\u00E8\',\s\.]|Soci.t.|Society|Organization|Association/i)!==null) {
          	uauthor=authors[0].replace(/[^A-Za-z0-9\u00C7\u00E9\u00E8\'-]/g," ").replace(/\s\s+/g," ");
          	s += ' | author='+uauthor;
          } else {
          	for(var aj=0; aj<authors.length; ++aj) { // Attempt to get lastname, first name ordered
          		var myA=authors[aj].split(' '), myS='', myF='', auLast='';
          		// nobiliary particles
          		if ((myA[myA.length-2].match(/^von$|^van$|^de$/i)!==null) && (myA.length<5)) { // Needs expansion
          			myS=myA[myA.length-2]+' '+myA[myA.length-1];
          			myF=myA.slice(0,myA.length-2).join(' ');
          			} else if (myA.length<5) {
          			myS=myA[myA.length-1];
            		myF=myA.slice(0,myA.length-1).join(' ');
            		} else {myS=authors[aj]}; // Skip strangely long names, likely organizations
            	if(myF==''){
            		if(nauthors==1){s += ' | author1='+myS;uauthor=myS};	// If not first author then long names are normally organizations
            		} else {
            		if(authors.length==1){
            			uauthor=myS;
            			s += ' | first=' + myF + ' | last='+myS; // Only one author
            			} else {
            			if(nauthors==1){uauthor=myS};
            			s += ' | first'+nauthors+'=' + myF + ' | last'+nauthors+'='+myS;
            			}
            		}
            	if(label==='Translated by') { s+=' (transl.)'; }
            	++nauthors;
            	}
          }
          continue;
        }
        if(label === 'Compiled by' || label === 'Editor' || label === 'Editors') {
          var editors = value.split(',');
          for(var ej=0; ej<editors.length; ++ej) {
          	var temp=' | editor'+neditors+'='+editors[ej];
            //s += temp; blocked out due to authors tending to be duplicated as editors so defaulting to no editors
            if(ueditors.search(temp.replace(/\|/g,"."))==-1){ // Get duplicates without this test
            	ueditors+=temp;
            }
            ++neditors;
          }
          continue;
        }
        if(label === 'Edition') {
	  value=value.split(",")[0]; // Remove any superfluous details
          if(value !== 'illustrated') { s += ' | edition='+value; }
          continue;
        }
        if(label === 'Publisher') {
          value=value.replace(/\&amp\;/g,"&");
          var year = value.match(/\d+$/); //A trailing sequence of digits
          if(year !== null) { // (!) Assumption that year will always be at end of publisher
            s = ' | year='+year[0] + s; uyear=year[0];
            s += ' | publisher='+value.substring(0,value.length-year[0].length-2); //2 is for ', '
          } else {
            s += ' | publisher='+value;
          }
          continue;
        }
        if(label === 'Published') {
          var pyear = value.match(/\d+$/);
          if(pyear !== null) {
            s = ' | year='+pyear[0] + s;
          }
          continue;
        }
        if(label === 'ISBN') {
          isbn = value.match(/\d+$/); //A trailing sequence of digits
          if(isbn===null || isbn.length<1) {
          	uisbn='';
            s='No match for trailing ISBN in "'+value+'".';
          } else {
          	uisbn=isbn[0];
            s += ' | isbn='+isbn;
          }
          GM_log('(Debug) When ISBN set s="'+s+'"');
          continue;
        }
        s="Dont know what to do with "+label+": " + value +' ';
        GM_log("Dont know what to do with "+label+": " + value +' ');
      } // End for loop
    GM_log('End of infoFromBook(), return s.');
	return s;
} // End function

function showCitationFromInfo(info, url) {
    GM_log("At showCitationFromInfo");
	var s = '{{citation';
    s += info;
    // Page number checker - not working due to page redesign?
    // Only works for snippet views and takes first match only
	var searchV=document.getElementById('search_v');
		if(searchV!==null){
			var pageV=searchV.getElementsByTagName("td");
			for(var i=0;i<pageV.length-1;i++){
				var sourcePage=pageV[i].innerHTML;
				if(sourcePage.search("Page ")>-1){
					s+=" | page="+sourcePage.match(/\d+/)[0];
					i=pageV.length;
				}
			}
		}
    s += ' }}'; //' | url=' + url + '}}';
    // sort into preferred order
    var ord=new Array("author[4-9]=","first4","last4","author3","first3","last3","first2","last2",
    	"title=","year=","author1?=", "first1?=", "last1?="); // Reverse order
    for(var i=0;i<ord.length;i++){
    	if(s.search(ord[i])>0){
    		var m='\\| '+ord[i]+'[^\\|]+';
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
      	with(document.getElementById('myCite').getElementsByTagName('button')[0]){
      		style.backgroundColor=""; // default
      		innerHTML="Show citation";
      	}
      } else {
      	with(document.getElementById('myCite').getElementsByTagName('button')[0]){
      		style.backgroundColor="lightblue";
      		innerHTML="Hide citation";
      	}
      	// Create citation box buttons
      	var tb = document.getElementsByTagName('table');tb=tb[4];
      	var cite=document.createElement('div');
      	var taRows=parseInt(s.length/70);
      	var plusRows=0; // How many rows are too long for text box
      	for(var i=0;i<s.split(' |').length;i++){if(s.split(' |')[i].length>75){++plusRows}};
      	s.replace(/'/g,"&#146;"); // change single quotes
      	var summary=document.getElementById('synopsistext');
      	if(summary!==null){ // tidy summary text, strip HTML
      		summary=summary.innerHTML.replace(/[\|\}\{]/g,"/")
			.replace(/=/g,"-")
			.replace(/<(|\/)(i|b|em|strong)>/gi,"")
			.replace(/<(|\/)(p|br)>/gi," ")
      		.replace(/<.*>/g,"")
      		.replace(/ ( )+/g," ")
      		.replace(/"/g,"&#146;");
      		if(summary.length<6){summary=null}; // ignore trivial results
      	};
      	var sSummary=s.replace(/}}$/,(summary!==null ? " | quote="+summary+"}}" : "}}"));
      	var ref=s; // Generate ref name of the style "Smith1990"
      	ref=(ref.match(/last/)!==null ? ref.match(/last(|1)=(([-\w']+) )+/)[0].replace(/last(|1)=/,"").replace(/ /g,"") : "")+
      		(ref.match(/author(|1)=[-\w\s']+/)!==null ? ref.match(/author(|1)=[-\w\s']+/)[0].replace(/author(|1)=/,"").replace(/ /g,"") : "")+
      		(ref.match(/year=/)!==null ? ref.match(/year=\d{4}/)[0].replace(/year=/,"") : "");
      	if(ref.match(/^\d/)!==null){ref="auto-"+randomString(2)+"-"+ref};
      	// Create Harvard style template
      	var harvRef=s;
      	harvRef="{{harvnb"+
      		(harvRef.match(/last(|1)=/)!==null ? 
      			"|"+harvRef.match(/last(|1)=(([-\w']+) )+/)[0].replace(/last(|1)=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/author(|1)=/)!==null ? 
      			"|"+harvRef.match(/author(|1)=(([-\w']+) )+/)[0].replace(/author(|1)=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last2/)!==null ?
      			"|"+harvRef.match(/last2=(([-\w']+) )+/)[0].replace(/last2=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/author2/)!==null ? 
      			"|"+harvRef.match(/author2=(([-\w']+) )+/)[0].replace(/author2=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last3/)!==null ?
      			"|"+harvRef.match(/last3=(([-\w']+) )+/)[0].replace(/last3=/,"").replace(/ $/,"") : "")+
      		(harvRef.match(/last4/)!==null ?
      			"|"+harvRef.match(/last4=(([-\w']+) )+/)[0].replace(/last4=/,"").replace(/ $/,"") : "")+
			(harvRef.match(/year=/)!==null ? "|"+harvRef.match(/year=\d{4}/)[0].replace(/year=/,"") : "")+
			"}}";
		var copac="http://copac.ac.uk/search?" + // Create copac link
			"au="+uauthor+"&ti="+utitle+"&sort-order=ti%2C-date";
		var worldcat="http://www.worldcat.org/search?q="+(uisbn.length>1 ? "bn%3A"+uisbn : 
			"%20ti%3A"+utitle+"%20au%3A"+uauthor+(uyear>0?"%20yr%3A"+uyear:""))+
			"&qt=advanced&dblist=638";
		var spacer='';
		for(var i=0;i<70;i++){spacer+='&nbsp;'};
      	cite.innerHTML = '\n<form name=cite id=cite><p style="font-size:12pt;font-weight:bold;margin-bottom:0px;">'+
      	'<span title="Edit and copy citation, useful additional fields include &quot;quote&quot; and &quot;page&quot;">'+
      	'Wikipedia citation</span> <input type="button" value="Highlight Text" title="Click to highlight all text for copying" '+
      	'onClick="javascript:this.form.citation.focus();this.form.citation.select();"> '+
      	 // Database droplist
      	spacer+'\
<a id=golink name=golink target="_blank" style="font-size:8pt" \
href="'+worldcat+'">Go</a>&nbsp;\
<select name="droplist" id=droplist title="Search for &quot;'+
utitle.split(':')[0].replace(/[^\w\s]/g,"")+'&quot; at selected site" \
onchange="javascript:document.getElementById(&quot;golink&quot;).href=\
this.form.droplist.options[this.form.droplist.selectedIndex].value;" \
style="font-size:8pt;">\
<option selected="selected" VALUE="'+worldcat+'+">WorldCat</option>\
<option VALUE="'+copac+'">Copac</option>\
<option value="http://www.librarything.com/search_works.php?q='+
	uauthor+' '+utitle+'&go=Go">Library Thing</option>\
<option value="http://catalogue.bl.uk/F/?func=find-b&request='+
	utitle.replace(/\b\w{1,2}\b/g,"").replace(/\s/g,"+")+" "+uauthor+
	'&find_code=WRD&adjacent=N">British Library</option>\
<option value="http://www.greenmetropolis.com/search.asp?book_title='+utitle+'&author_name=&'+uauthor+
	'&Format=All&scope=InStock&Results=1&search.x=36&search.y=17&search=search">Greenmetropolis</option>\
<option value="http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Dstripbooks&field-keywords='+
	utitle+'">Amazon Books</option>\
</SELECT>\
'+
      	'<p style="margin-top:2px;margin-bottom:0px;">'+
      	// +URL button
      	'<input id="b_url" style="font-size:8pt" type="button" value="Add URL" '+
      	'onClick="javascript:var v=this.form.citation;'+
      	'if(this.form.citation.value.match(/\\|(| )*url(| )=/)!==null){'+
      	'this.form.b_url.value=&quot;Add URL&quot;;'+
      	'v.value=v.value.replace(/(\\n| )*\\|( )*url(| )=(| )[^}\\n\\|]*/,&quot; &quot;)'+
      	'}else{this.form.b_url.value=&quot;Remove URL&quot;;'+
      	'v.value=v.value.replace(/}}$/,&quot;| url='+url+' }}&quot;)}";> '+
      	// +editors button
      	'<input id=rmEds title="Add or remove editors; useful if the authors have been duplicated as editors" '+
      	'type="button" value="Editors" onClick="javascript:var v=this.form.citation;'+
      	'if(v.value.search(/editor1/)<0){v.value=v.value.replace(/ ?}}/,&quot;'+ueditors+
      	'}}&quot;);this.form.rmEds.value=&quot;No editors&quot;}else{'+
      	'v.value='+
      	'v.value.replace(/(\\n )*\\|( )*editor\\d ?= ?[^\\|\\n|}]*/g,&quot;&quot;);'+
      	'this.form.rmEds.value=&quot;Editors&quot;;}"> '+
      	// +summary button (if text exists)
      	(summary!==null ? '<input type="button" title="Insert quote from &quot;Book overview&quot;" '+
      	'value="Add summary" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows+='+parseInt(summary.length/70)+
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
		// +Harvard button
      	'<input title="Create Harvard style cross-reference to full citation" '+
      	'style="color:darkblue" type="button" value="H" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows=1;this.form.citation.value='+	
      	'&quot;'+harvRef+'&quot;;getElementById(&quot;addfields&quot;).style.display=&quot;none&quot;"> '+
      	'<input title="Bullet" style="color:darkblue" type="button" value="*" '+		// Add bullet
      	'onClick="javascript:this.form.citation.value='+
      	'this.form.citation.value.replace(/^{{/,&quot;*{{&quot;);"> '+
      	// +Reset button
      	'<input title="Reset the citation text, wiping out changes" '+
      	'style="color:red;font-size:8pt" type="button" value="Reset" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows='+taRows+
      	';this.form.citation.value=\''+s.replace(/'/g,"&#146;").replace(/"/g,"&quot;")+'\';getElementById(&quot;addfields&quot;).style.display=&quot;&quot;;'+
      	'this.form.bRef.style.color=&quot;darkblue&quot;;'+ // Reset ref button
      	'this.form.b_url.value=&quot;Add URL&quot;;'+ // Reset url button
      	'this.form.bSqueeze.style.display=&quot;none&quot;;'+
      	'this.form.bExpand.style.display=&quot;&quot;;"> '+ // Reset expand button
      	// Text area start
      	'<p style="font-size:10pt;margin-top:2px;margin-bottom:2px;">'+
      	'<table><tr><td><textarea style="padding:6px;border-color:black;border-style:solid;border-width:1px;" rows='+taRows+
      	' cols=85 name=citation id=citebox>'+s+'</textarea></td>'+
     	// Squeeze & Expand
      	'<td valign=top align=center>'+
      	'<input id="bSqueeze" name="bSqueeze" title="Reduce size by removing some spaces" '+	// Squeeze
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
      	'</table></p>\n'+ // Text area end
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
      	'(/}}$/,&quot; | page=&quot;+p+&quot; }}&quot;)};" > '+
      	// +pages
      	'<input title="Add range of page numbers to the citation (eg. 23-5 displays as pp.23-5). '+
      	'Do not use with page=." style="color:darkblue" type=button value=pages '+	
      	'onClick="javascript:var p=prompt(&quot;Page range&quot;);if(p.length>2){'+
      	'this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; | pages=&quot;+p+&quot; }}&quot;)};" > '+
      	// +quotation
      	 '<input title="Add quotation to the citation" style="color:darkblue" type=button value=quote '+
      	'onClick="javascript:var q=prompt(&quot;Quotation&quot;);if(q.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; | quote=&quot;+q+&quot; }}&quot;)};" > '+
      	// +OCLC
      	 '<input title="Add OCLC (Online Computer Library Center ID number), such as 3185581 (superfluous when ISBN is given)"'+
      	 ' style="color:darkblue" type=button value=oclc '+
      	'onClick="javascript:var c=prompt(&quot;OCLC number&quot;);if(c.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; | oclc=&quot;+c+&quot; }}&quot;)};" > '+
      	'</p><div id="helpText" style="display:none"><p><table><tr>'+
      	'<td style="padding:1em;background:#C8FFC8;">'+
      	helpText+'</td></tr></table></p></div>'+
      	'</form>';
      	// Format citation box
      	with(cite.style){
      		backgroundColor='lightblue';
      		border='solid black 1px';
      		padding='8px';
      		margin='2px';
			marginTop='1em';
			width='760px';
		}
      	tb.parentNode.insertBefore(cite,tb); // Insert before titlebar
        //alert(cite.value);
      	}
    }


    function showCitationFromPage() {
      var u = cleanURI();//location.href;
      var book = u.split('&')[0];
      GM_log('showCitationFromPage(): Getting info from '+book);
      do_doc(book, function(doc) {
          GM_log('showCitationFromPage(): start infoFromBook()');      
          var info = infoFromBook(doc);
          GM_log('showCitationFromPage(): start showCitationFromInfo()');
          showCitationFromInfo(info, u);
        });
    }
    
	// Display only the basics about the book
    function trimPage() { 
      //var bn=document.getElementById('buttons'); // Preview button
      //if(bn!==null){bn.innerHTML=''};
	var bookContent=document.getElementById('metadata_content_table').parentNode; // More book information
	var buy=document.getElementById('menu_td');
	if(buy!==null){buy.style.width='0px';buy.innerHTML=''}; // Remove left hand bar
	var summary=document.getElementById('synopsistext');	// Get synopsis
	var citations=document.getElementById('citations_module'); // citations to this book
	if(citations!==null){citations=citations.parentNode};
	var mainTable=document.getElementById('viewport_table');
	mainTable.innerHTML='';		// Wipe clean
	mainTable.appendChild(bookContent);		// Add basic book details
	if(summary!==null){		// Add book synopsis
		summary.innerHTML="\n<h3 class=about_title>Book overview</h3>"+
			"<div style='font-size:10pt;padding:4pt;'>"+
			summary.innerHTML+"</div>";
		mainTable.appendChild(summary);
		}
	if(citations!==null){		// References from other books
		citations.className='dummy';
		mainTable.appendChild(citations);
		}
    }

    function cleanURI() {
      var o = (location.href!==null ? location.href : " "); var hash = o.indexOf('#');
      if(hash > -1) { o = o.substr(0,hash); }
      var q = o.indexOf('?'), prefix = o.substr(0,q+1), u = o.substr(q+1), nu='';
      var parts = u.split('&');
      for(var i=0; i<parts.length; ++i) {
        var [p, v, e] = parts[i].split('='); assert(typeof e === 'undefined');
        GM_log(p + ' is ' + v);
        if(p!=='hl' &&               //language of the interface
           p!=='ei' &&               //Some user-specific (cookie-specific?) constant
           p!=='ots' && p!=='sig' && //Similar long sigs, don't know what
           p!=='source' &&           //how you got there: gbs_hpintrst, bl(?) etc.
           p!=='lr' &&               //restrict searches to a language
           p!=='as_brr' &&           //as_brr=3 restricts to books with preview
           p!=='printsec' &&         //e.g. printsec=frontcover
           p!=='sa' &&               //e.g. sa=X
           p!=='oi' &&               //e.g. oi=book_result
           p!=='ct' &&               //e.g. ct=result
			p!=='dq' &&
			p.search('as_')<0 &&	//Search restrictions
			p!=='vq' &&
			p!=='q' &&			//Search within book
			p!=='client' &&		//Name of browser
			p!=='sitesec' &&	//Subsection listing
			p!=='resnum') {
			nu += (nu!=='' ? '&' : '')+p+'='+v;
        }
      }
      nu = prefix + nu;
      GM_log('new url is ' + nu);
      return nu;
    }

    //Add a link/button to the top bar
    function add_link(text, title, func, id) {
    	    var bar = document.getElementsByTagName('table'); bar=bar[4];
      GM_log('Inside add link function');
      var link = document.createElement('a');
      	link.title = title;
    	link.innerHTML = text;
    	link.style.textDecoration = 'none';
		link.innerHTML='\n'+link.innerHTML;
		link.id=id;
      var dofunc = function(event) {
        event.stopPropagation();
        event.preventDefault();
        func();
      };
      link.addEventListener('click', dofunc, false);
      bar.parentNode.insertBefore(link, bar); // Add citation buttons before bar
    }
    GM_log('Adding links to top bar');
    add_link('<button style="margin-left:8px;margin-top:8px;">Clean up link</button>', 'Remove useless parameters from URI', function() { location.href = cleanURI(); }, 'myClean');
    if(document.getElementById('metadata_content_table')!==null){ // Only show for suitable items (i.e. not magazines)
    	add_link('<button style="margin-left:2px;">Show citation</button>', 'Show a Wikipedia formatted citation for this book', showCitationFromPage,'myCite');
	}
    add_link('<button style="margin-left:2px;">Trim</button>', 'Only show the essential information', trimPage, 'myTrim' );
  }();
 }