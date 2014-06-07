// ==UserScript==
// @name           Guardian to Wikipedia citation
// @namespace      Wikipedia
// @include        http://*.guardian.co.uk/*
// ==/UserScript==

/*
Description: Create a nicely formatted Wikipedia citation from a Guardian.co.uk
article page. Uses the {{cite news}} template. Button only displays on article
pages.

Version History:
2009-10-15 Initial version, may not pick up date/author on some blog entries
	-20 Extended to work on pages found in old format and observer.guardian.co.uk,
		minor author name format stripping.
	-23 Extended name and date testing from blog entries; added toggling buttons.

*/

var version='23 October 2009';
var utitle='', uisbn='', uauthor='', usummary=null, uoclc='', udate='', 
	upub='The Guardian', uyear='', uissn='', udoi=''; uurl='', uformat='',
	monthNames=new Array(
	"January","February","March","April","May","June","July",
	"August","September","October","November","December");
var helpText='<p><b>Instructions</b></p>\
<p style=margin-top:0.75em;>The citation above is automatically populated \
based on the Guardian article you are currently viewing. You can edit the text on this page \
inside the text box. For more help on the citation parameters see \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/Template:Cite_news target=_blank>\
[[template:cite news]]</a>. Some handy buttons available are:<\p>\
<div style=margin-left:2em;margin-top:0.75em;>\
<p><input type=button value="Highlight text"> highlight all text ready for cut & paste\
<p><input type=button value="{}"> expand the text for more easily readable layout\
<p><input type=button value="}{"> collapse the text\
<p><input type=button value=&laquo> <input type=button value=&raquo> increase/decrease the size of the edit text box\
<p><input type=button style=color:darkblue; value="&lt;ref&gt"> wrap the citation with ref tags to \
turn it into a footnote (click twice to remove automatic name)\
<p><input type=button style=color:red; value=Reset> undo all changes\
<p><input type=button style=color:darkblue; value=quote> add a quote (copy part of the article first, then paste it into \
the pop-up box)\
</div>\
<p style=margin-top:0.75em;><i>\
Feedback and bug reporting can be left on my Wikipedia user talk page \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/User_talk:Ash target=_blank>\
[[User talk:Ash]]</a>. \
Before you report a bug check, you have installed the latest version available on \
<a href=http://userscripts.org/scripts/show/59913 target=_blank>userscripts.org</a>.\
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

function first_last(a,n){
	if(a==''){return};
	if(n==1){n=''};
	if(authorSplit(a,0)!==''){ // i.e. there's a first name
   		return " |last"+n+"="+authorSplit(a,1)+" |first"+n+"="+authorSplit(a,0);
   	    }else{
   	    return " |author"+n+"="+a;
   	    }
}

function infoFromBook() {
	var s = '';
    // Get title
    var mainInfo=document.getElementById('main-article-info');
    if(mainInfo!==null){
    	var mhead=first_child(mainInfo);
    	utitle=mhead.innerHTML;
    	GM_log("Title = "+utitle);
    	var shead=node_after(mhead);
    	if(shead!==null){
 	   		utitle+=": "+shead.innerHTML;
 	   	}
    }else{
    	// Could be an archive article
    	var gadiv=document.getElementById('GuardianArticle');
    	if(gadiv!==null){
    		var h1=gadiv.getElementsByTagName('h1');
    		if(h1!==null){
    			utitle=h1[0].innerHTML;
    		}
    		var fonts=gadiv.getElementsByTagName('font');
    		GM_log("fonts = "+fonts.length);
    		if(fonts!==null){
    			if(udate==''){
    				udate=fonts[1].innerHTML.split('<b>')[1].split('<br>')[0];
    				if(udate.match(/\d+\s\w+\s\d{4}/)!==null){udate=udate.match(/\d+\s\w+\s\d{4}/)[0]}
    				if(udate!==null){GM_log("udate (archive)="+udate)};
    				if(udate==null||udate==undefined||udate.length<1){udate=''}else{s+=" |date="+udate};
    			}
    		}
    	}else{utitle="Title not found"};
    }
    utitle=utitle.replace(/\[/g,"&#91;").replace(/]/g,"&#93;")
    	.replace(/[\.\;\,]*$/,"").replace(/<.*>/g,"")
    	.replace(/\s*[\u0149\u2022\u2019]\s*/g," - ") // bullets
    	.replace(/[\n\r]/g,""); // cleanup
    s+=" |title="+utitle;
    // Try to get date from meta data (other candidates: description)
    var meta=document.getElementsByTagName('meta');
    //GM_log("table = "+meta.length);
    if(meta!==null && meta.length>3){
    	var msummary='', mdate='';
    	for(var i in meta){
    		switch(meta[i].name){
    			 case "DC.date.issued":
    			 	udate=meta[i].content;
    			 	GM_log("udate (from "+meta[i].name+") = "+udate);
    			 	if(udate.search(/\d{4}/)>-1){uyear=udate.match(/\d{4}/)};
    			 	uref="Guardian"+uyear;
    			 	udate=udate.replace(/\D/g,"");
    			 	if(udate.length==8 && udate.match(/\d{8}/)!==null){
    			 		udate=udate.match(/\d\d$/)[0]+" "+
    					monthNames[udate.replace(/....(\d\d)../,"$1")-1]+
    					" "+udate.match(/\d{4}/)[0];
    				};
    			 	break;

    		}
    	}
    }
    // Get byline (author)
    var allli=document.getElementsByTagName('li');
    //GM_log("#li's = "+allli.length);
    var count=0;
    if(allli.length>0){
    	while (count<allli.length && allli[count].className!=="byline"){
   	    	++count;
   	    }
   	    if(count<allli.length){
   	    	uauthor=first_child(allli[count]);
   	    	var uauthor2='';
   	    	if(uauthor==null){ // No author, possibly staff author marked
   	    		uauthor=allli[count].innerHTML.replace(/\s+/g," ")
   	    			.replace(/^\s*/,"").replace(/\s*$/,"");
   	    	}else{
   	    		if(node_after(uauthor)!==null){
   	    			var uauthor2=node_after(uauthor).innerHTML;
   	    			}
   	    		uauthor=uauthor.innerHTML;
   	    	}
   	    	uauthor=uauthor.replace(/<.*?>/g,""); // Trim any odd formatting
   	    	s+=first_last(uauthor,1);
   	    	/*if(authorSplit(uauthor,0)!==''){
   	    		s+=" |last="+authorSplit(uauthor,1)+" |first="+authorSplit(uauthor,0);
   	    	}else{
   	    		s+=" |author="+uauthor;
   	    	}*/
   	    	if(uauthor2!==''){s+=first_last(author2,2)};
   	    }
    }
    if(uauthor==''){ // check for blog byline for author and date
    	GM_log("** byline not found, looking for blog-byline");
    	var alldiv=document.getElementsByTagName('div');
    	count=0;
    	//GM_log("#div's = "+alldiv.length);
    	if(alldiv.length>0){
    		while(count<alldiv.length && alldiv[count].className!=="blog-byline"){
    			++count;
    		}
    		if(count<alldiv.length){
    			uauthor=node_after(first_child(alldiv[count]));
    			//GM_log("test div "+count+" div.length = "+uauthor.length);
    			if(uauthor.length>0){uauthor=uauthor.innerHTML}else{uauthor=alldiv[count].innerHTML}
    			if(uauthor=="Posted by"){ // Accidently picked up leading text?
    				GM_log('** Picked up Posted by');
    				uauthor=node_after(uauthor)!==null?node_after(uauthor).innerHTML:alldiv[count].innerHTML;
    			}
    			if(uauthor.length<8 && uauthor.search(/\d\d.\d\d/)>-1){ // Accidently picked up time?
    			// Go up one level
    				GM_log('** Grabbed author looks like date? '+uauthor.innerHTML);
    				uauthor=alldiv[count]!==null?alldiv[count].innerHTML:'';
    			}
    			if(uauthor.search(/</)>0){ // Must be whole kaboodle
    				uauthor=uauthor.replace(/\s/g," ")
    					.replace(/<.*?<\/.*?>/g,"")
    					.replace(/<.*?>/g,"");// delete remaining tags
    				uauthor=uauthor.replace(/\w+ \d{1,2} \w{3,10} \d{4}/g,"");// strip date
    				uauthor=uauthor.replace(/^\s+|\s+$/g,"");// trim
    			}
				if(uauthor.length>0){ // if author null then blog date is probably wrong too
					GM_log("Author from blog-byline = "+uauthor);
    				udate=alldiv[count].innerHTML.match(/\d{1,2}\s\w{4,}\s\d{4}/)[0];
    				if(udate==null){udate=''};
    				if(alldiv[count].innerHTML.match(/Sunday/)!==null){upub="The Observer"};
    				GM_log("date (from posted by <div>) = "+udate);
				}else{uauthor=''};
    		}
    		if(uauthor!==''){
   	    		if(authorSplit(uauthor,0)!==''){
   	    			s+=" |last="+authorSplit(uauthor,1)+" |first="+authorSplit(uauthor,0);
   	    		}else{
   	    			s+=" |author="+uauthor;
   	    		}
    		}
		}
	alldiv='';allli='';count=0;
    }
   
   
    // Get date from <li>
    var count=0;
    if(allli.length>0 && udate==''){
    	while (count<allli.length && allli[count].className!=="publication"){
   	    	++count;
   	    }
   	    if(count<allli.length){
    	udate=allli[count].innerHTML.replace(/<.*>/g,"").replace(/^[\s,]*/,"")
    		.replace(/\s+/g," ").replace(/.\d*.\d\d.(BS|GM)T\s*?$/,"")
    		.replace(/\s*$/,"");
    	if(udate.match(/Sunday/)!==null){upub="The Observer"};
    	udate=udate.replace(/\s?\w+day.(.*)/,"$1"); // strip the text day
    	GM_log("date (from <li>) = "+udate);
   	    }
    }
    // Output date
    if(udate!==''){s+=" |date="+udate};
    //publisher
    if(cleanURI().match(/observer.guardian/)!==0){upub="The Observer"};
    s+=" |newspaper="+upub;
	return s;
}

function showCitationFromInfo(info, url) {
      var s = '{{cite news', testUrl=false;
      s += info;
      if(uurl==''){ // check if there was a recommended url
      	uurl=url;
      }else{testUrl=true};
      if(uurl!=='' && (uisbn!==''||uurl.match(/worldcat.org/)==null)){s += ' |url=' + uurl + '}}'}else{s+='}}'};
      // sort into preferred order
      var ord=new Array("year=", "author2","author(|1)", "first(|1)=", "last(|1)=", "title="); // Reverse order
      for(var i=0;i<ord.length;i++){
      	if(s.search(ord[i])>0){
      	  var m='\\|'+ord[i]+'[^\\|]+';
      	  if(s.match(m)!==null){
      	  	var mm=s.match(m)[0];
      	  	s=s.replace(/(\{\{cite news )/,"$1"+mm);
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
      	var tb = document.getElementById('global-nav'); // insert before this div
      	if(tb==null){tb=document.getElementById('myCite')};
      	var cite=document.createElement('div');
      	var taRows=parseInt(s.length/70);
      	var plusRows=0; // How many rows are too long for text box
      	for(var i=0;i<s.split(' |').length;i++){if(s.split(' |')[i].length>75){++plusRows}};
      	s.replace(/'/g,"&#146;"); // change single quotes
      	// Create summary / abstract
      	var sSummary=s.replace(/}}$/,(usummary!=='' ? " | quote="+usummary+"}}" : "}}"));
      	var ref=s; // Generate ref name of the style "Smith1990"
      	ref=ref.replace(/[^\w\|\s'-=\{\}]/g,""); // erase foreign chars
      	ref=(ref.match(/last1?=[-\w']+ /)!==null ? ref.match(/last(|1)=(([-\w']+) )+/)[0].replace(/last1?=/,"").replace(/ /g,"") : "")+
      		(ref.match(/author1?=[-\w\s']+/)!==null ? ref.match(/author1?=[-\w\s']+/)[0].replace(/author1?=/,"").replace(/ /g,"") : "")+
      		(ref.match(/date=\d+\s\w+\s\d{4}/)!==null ? ref.match(/date=\d+\s\w+\s\d{4}/)[0].replace(/.*(\d{4})/,"$1") : "");
      	if(ref.match(/^\d|^\s*$/)!==null){ref="Guardian"+randomString(2)+"-"+ref};
		var gnews="http://news.google.com/news?q="+utitle.split(':')[0];
		var independent="http://www.independent.co.uk/search/index.jsp?eceExpr="+
			utitle.split(':')[0].replace(/\s/g,"+");
		cite.className='blogs';
      	cite.innerHTML = '\n<form name=cite id=cite><p style="font-size:12pt;margin-bottom:0px;">'+
      	'<span title="Edit and copy citation, useful additional fields include &quot;quote&quot; and &quot;page&quot;">'+
      	'Guardian to Wikipedia citation</span> <input style="font-size:8pt" type="button" value="Highlight Text" title="Click to highlight all text for copying" '+
      	'onClick="javascript:this.form.citation.focus();this.form.citation.select();"> '+
      	 // Newspaper search droplist
      	' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
<SELECT NAME="droplist" id=droplist title="Search for &quot;'+
utitle.split(':')[0].replace(/[^\w\s]/g,"")+'&quot; at selected site" >\
<OPTION SELECTED="SELECTED" VALUE="'+gnews+'+">Google News</OPTION>\
<OPTION VALUE="'+gnews+'+site:independent.co.uk">The Independent</OPTION>\
<OPTION VALUE="'+gnews+'+site:timesonline.co.uk">The Guardian</OPTION>\
<OPTION VALUE="'+gnews+'+site:bbc.co.uk">BBC News</OPTION>\
<OPTION VALUE="'+gnews+'+site:telegraph.co.uk">The Telegraph</OPTION>\
<OPTION VALUE="'+gnews+'+site:thesun.co.uk">The Sun</OPTION>\
<OPTION VALUE="'+gnews+'+site:cnn.com">CNN</OPTION>\
<OPTION VALUE="'+gnews+'+site:nytimes.com">New York Times</OPTION>\
<OPTION VALUE="http://www.wired.com/search?query='+utitle.split(':')[0]+'">Wired News</OPTION>\
</SELECT><INPUT TYPE="BUTTON" VALUE="Go" \
ONCLICK="javascript:location.href=this.form.droplist.options[this.form.droplist.selectedIndex].value;">\
'+
      	'</p>\n'+
      	'<p style="margin-top:2px;margin-bottom:0px;">'+
      	// +URL button
      	'<input id="b_url" style="font-size:8pt" type="button" value="'+
      	(uisbn==''?'':'No ')+'URL" '+
      	'onClick="javascript:var v=this.form.citation;'+
      	'if(this.form.citation.value.match(/\\|(| )*url(| )=/)!==null){'+
      	'this.form.b_url.value=&quot;URL&quot;;'+
      	'v.value=v.value.replace(/(\\n|| )*\\|(| )*url(| )=(| )[^}\\n\\|]*/,&quot; &quot;)'+
      	'}else{this.form.b_url.value=&quot;No URL&quot;;'+
      	'v.value=v.value.replace(/}}$/,&quot; | url='+uurl+' }}&quot;)}";> '+
      	// +ref button with smart 3 state behaviour
      	'<input title="Add automatically named reference tags for footnote" name="bRef" id="bRef" '+
      	'style="font-size:8pt;color:darkblue" type="button" value="<ref>" '+
      	'onClick="javascript:var v=this.form.citation,t=this.form.bRef;'+
      	'v.value='+	
      	'(v.value.search(/\\<ref name\\=/)>-1 ? '+
      	'v.value.replace(/(\\<ref) name\\='+uref+' /,&quot;$1&quot;)'+ //2nd click
      	' : (v.value.search(/\\<ref( *)>/)>-1 ? '+
      	'v.value.replace(/\\<ref>|<.ref>/g,&quot;&quot;)'+ //3rd click
      	' : v.value.replace(/^{{|^\\*{{/,&quot;<ref name='+uref+ //1st click
      	' >{{&quot;).replace(/}}$/,&quot;}}</ref>&quot;)));'+
      	'if(v.value.search(/ref name=/)>0){t.title=&quot;Click to remove ref name&quot;;'+
      		't.style.color=&quot;darkgreen&quot;}'+ // Colour changer
      	'else if(v.value.search(/\\<ref\\>/)>-1){t.title=&quot;Click to remove ref tags&quot;;'+
      		't.style.color=&quot;red&quot;}'+
      	'else{t.title=&quot;Add automatically named reference tags for footnote&quot;;'+
      		't.style.color=&quot;darkblue&quot;};"> '+
      	// Add bullet
      	'<input title="Bullet" style="color:darkblue;font-size:8pt" type="button" value="*" '+		
      	'onClick="javascript:this.form.citation.value='+
      	'this.form.citation.value.replace(/^{{/,&quot;*{{&quot;);"> '+
      	// +Reset button
      	'<input title="Reset the citation text, wiping out changes" '+
      	'style="color:red;font-size:8pt" type="button" value="Reset" '+
      	'onClick="javascript:getElementById(&quot;citebox&quot;).rows='+taRows+
      	';this.form.citation.value=\''+s.replace(/'/g,"&#146;").replace(/"/g,"&quot;")+'\';getElementById(&quot;addfields&quot;).style.display=&quot;&quot;;'+
      	'this.form.bRef.style.color=&quot;darkblue&quot;;'+ // Reset ref button
      	'this.form.bSqueeze.style.display=&quot;none&quot;;'+
      	'this.form.bExpand.style.display=&quot;&quot;;"> '+ // Reset expand button
      	// Text area start
      	'<p style="font-size:medium;">'+
      	'<table><tr><td><textarea style="padding:0.5em;border-color:black;border-style:solid;border-width:1px;" rows='+taRows+
      	' cols=85 name=citation id=citebox>'+s+'</textarea></td>'+
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
      	'<p style="margin-top:2px;margin-bottom:2px;font-size:8pt;" id=addfields>'+
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
      	'  Add field: '+
      	// +page
      	'<input title="Add a page number to the citation (e.g. 55 displays as p.55)" '+
      	'style="color:darkblue" type=button value=page '+
      	'onClick="javascript:var p=prompt(&quot;Page number&quot;);if(p.length>0){'+
      	'this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; | page=&quot;+p+&quot; }}&quot;)};" > '+
      	// +quotation
      	 '<input title="Add quotation to the citation" style="color:darkblue" type=button value=quote '+
      	'onClick="javascript:var q=prompt(&quot;Quotation&quot;);if(q.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |quote=&quot;+q+&quot; }}&quot;)};" > '+
      	'</p><div id="helpText" style="display:none"><p><table><tr>'+
      	'<td style="padding:2em;">'+
      	helpText+'</td></tr></table></p></div>'+
        '</form>';
      	cite.style.backgroundColor='lightblue';
      	cite.style.border='solid black 1px';
      	cite.style.padding='8px';
      	cite.style.margin='2px';
		cite.style.marginTop='1em';
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
      //Check this is an article page
      var test=document.getElementById('article-wrapper');
      if(test==null && cleanURI().match(/20|\.htm/)==null){return};
      var bar = document.getElementById('search');
      if(bar==null){bar=document.getElementById('GuardianArticle')};
      var link = document.createElement('a');
      link.title = title;
      link.innerHTML = text;
      link.style.textDecoration = 'none';
      link.style.fontSize='8pt';
      link.id=id;
      var dofunc = function(event) {
        event.stopPropagation();
        event.preventDefault();
        func();
      };
      link.addEventListener('click', dofunc, false);
      bar.parentNode.insertBefore(link,bar);
    }

//GM_log('Adding link to top');
add_link('<button style="margin-left:2em;margin-top:0.9em;">Show&nbsp;citation</button>',
	'Show a Wikipedia formatted citation for this article',
	showCitationFromPage,'myCite');

