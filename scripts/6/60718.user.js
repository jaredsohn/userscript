// ==UserScript==
// @name           Pink Paper to Wikipedia citation
// @namespace      Wikipedia
// @include        http://news.pinkpaper.com/*
// ==/UserScript==

/*
Description
This Greasemonkey script takes any article page from the Pink Paper and creates a
Wikipedia citation for it.

Edit history
2009-10-28 Creation based on similar script.

*/
// Last update
var version='28 October 2009';

// Global variables
var utitle='', uauthor='', usummary='', udate='', 
	uyear='', uref=''; uurl='', upub='[[Pink Paper]]',
	now=new Date(), monthNames=new Array(
	"January","February","March","April","May","June","July",
	"August","September","October","November","December");

var helpText='<p><b>Instructions</b></p>\
<p style=margin-top:0.75em;>The citation above is automatically populated \
based on the Pink Paper article you are currently viewing. \
You can edit the text on this page \
inside the text box. Note that if you are viewing a non-article page \
(such as an article index page) the citation may be a bit naff. If you are looking \
at a blog, make sure you are on a particular blog entry rather than a list of blog entries. \
For more help on the citation parameters see \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/Template:Cite_news target=_blank>\
[[template:cite news]]</a>. Some handy buttons available are:<\p>\
<div style=margin-left:2em;margin-top:0.75em;>\
<input type=button value="Highlight text"> highlight all text ready for cut & paste\
<br><input type=button value="<==>"> expand the text for more easily readable layout\
<br><input type=button value="=><="> collapse the text\
<br><input type=button value=&laquo> <input type=button value=&raquo> increase/decrease the size of the edit text box\
<br><input type=button style=color:darkblue; value="&lt;ref&gt"> wrap the citation with ref tags to \
turn it into a footnote (click twice to remove automatic name)\
<br><input type=button style=color:red; value=Reset> undo all changes\
<br><input type=button style=color:darkblue; value=quote> add a quote (copy part of the article first, then paste it into \
the pop-up box)\
</div>\
<p style=margin-top:0.75em;><i>\
Feedback and bug reporting can be left on my Wikipedia user talk page \
<a style="font-size:80%" href=http://en.wikipedia.org/wiki/User_talk:Ash target=_blank>\
[[User talk:Ash]]</a>. \
Before you report a bug check, you have installed the latest version available on \
<a href=http://userscripts.org/scripts/show/60718 target=_blank>userscripts.org</a>.\
</i></p>\
<p style=margin-top:1.5em;color:grey;>Release date of this script: '+version+'</p>';

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

function cnvrt2title(str) { // TitleCase
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

function randomString(n) { // Handy for when refs not generated
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
	if(a.match(/association|organi|inc\.|charity|trust|society|archive|[\(\[\{\,]| (&|&amp;) /i)!==null){
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
	if(n==1||n==undefined){n=''};
	if(authorSplit(a,0)!==''){ // i.e. there's a first name
   		return " |last"+n+"="+authorSplit(a,1)+" |first"+n+"="+authorSplit(a,0);
   	    }else{
   	    return " |author"+n+"="+a;
   	    }
}

function tidy(str){ // remove leading and trailing unwanted chars
	return str.replace(/[\s\r\n]+/g," ")
		.replace(/^[\s\.,;:-]+|[\s:;,-]+$/g,"")
		.replace(/'/g,"\u0027")
		.replace(/\[\{/g,"(").replace(/\]\}/g,")");
}

function strip(str){ // remove formatting
	return tidy(str.replace(/<.*?>/g,""));
}

function getId(txt){ // list of prospect IDs separated by commas
	var ObArr=txt.split(',');
	for (var i=0;i<ObArr.length;i++){
		var Ob=document.getElementById(ObArr[i].replace(/ /g,""));
		if(Ob!==null){return Ob} // Return first existing object
	}
	// None exists
	return false;
}

// Find first matching tag content by optional className and optionally ignoring some items
function getFirstTag(name,classname,ignore,parent){
	if(parent==undefined){parent=document};
    var tags=parent.getElementsByTagName(name);
    if(tags!==null){
    	for(var i in tags){
    		if(classname==undefined||tags[i].className==classname){
    			var t=tags[i].innerHTML;
    			if(t.length>1){
    				if(ignore==undefined||t.search(ignore)==-1){return strip(t)};
    			}
    		}
    	}
    }
    return '';
}

function infoFromPaper() { // *********************
	var s = '';
    var meta=document.getElementsByTagName('meta');
    GM_log("table = "+meta.length);
    if(meta!==null && meta.length>3){
    	var mtitle='', msummary='', mdate='';
    	for(var i in meta){
    		switch(meta[i].name){
    			case "Headline": case "Title":
    				mtitle=meta[i].content.replace(/\s/g," ");
    				break;
    			case "Description" : case "DESCRIPTION": case "description" :
    				msummary=meta[i].content.replace(/&#34;|"/g,"'");
    				GM_log("usummary = "+usummary);
    				break;
    			case "OriginalPublicationDate":
    				udate=meta[i].content.split(" ")[0].replace(/\//g,"-");
    				uref="BBC"+udate.replace(/\D/g,"");
    				udate=udate.match(/\d\d$/)[0]+" "+
    				monthNames[udate.replace(/.*-(\d\d)-.*/,"$1")-1]+
    				" "+udate.match(/\d{4}/)[0];
    				break;
    			 case "created":case "modified":case "DisplayDate":
    			 	udate=meta[i].content.split('T')[0].replace(/\D/g,"");
    			 	uref="BBC"+udate;
    			 	if(udate.length==8 && udate.match(/\d{8}/)!==null){
    			 		udate=udate.match(/\d\d$/)[0]+" "+
    					monthNames[udate.replace(/....(\d\d)../,"$1")-1]+
    					" "+udate.match(/\d{4}/)[0];};
    			 	break;
    		}
    	}
    	if(mtitle==''){mtitle=msummary;msummary=''};
    	if(msummary!==''){usummary=msummary};
    	utitle=mtitle;
    }
    var spans=document.getElementsByTagName('span');
    //GM_log("spans = "+spans.length);
    // Get byline (from blogs)
    if(spans!==null){
    	for(var i in spans){
    		switch(spans[i].className){
    			case "date_published":
    				if(udate==''){
    					udate=spans[i].innerHTML;//.replace(/.*(\d{1,2} \w{3,10} 20\d\d).*/,"$1");
    				}
    			break;
    		}
    	}
    }
    // Grab date from comment bar
    var pdate=getFirstTag('div','DateCommentRow');
    GM_log("pdate = "+pdate);
    if(pdate!==''){udate=pdate.match(/\d{1,2} \w{3,9} \d{4}/)[0]}
    // Author from byline
    var divHead=getId('StoryHeader');
    if(divHead!==null){
    	ps=divHead.getElementsByTagName('p');
    	if(ps!==null){
    		for(var i in ps){
    			switch(ps[i].className){
    				case "ByLine":
    					uauthor=ps[i].innerHTML;
    					if(uauthor!==undefined && uauthor.length>2){s+=first_last(uauthor)};
    					break;
    			}
    		}
    	}
    }

    // Prefer h1 tag for title
    h1=document.getElementsByTagName('h1');
    if(h1!==null){
    	h1=h1[0].innerHTML;
    	utitle=h1.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")
    		.replace(/<.*?>/g,"");
    }
    if(utitle==''){ // default to web page title
    	utitle=document.getElementsByTagName('title');
    	utitle=(utitle==null?'':utitle[0].innerHTML).replace(/\|/,"-");
    }
    var accessDate="20"+now.getYear().toString().substr(1)+"-"+
    (now.getMonth()>8?now.getMonth()+1:"0"+(now.getMonth()+1))+"-"+now.getDate();
    // Set up uref
    if(udate.match(/\d{4}/)!==null){uyear=udate.match(/\d{4}/)[0]};
    uref=authorSplit(uauthor,1).replace(/\s/g,"")+uyear;
    if(uref.length<5){uref="Wired"+(uyear.length>3?uyear:udate.replace(/\D/g,""))};
    if(uref=="Wired"){uref=uref+accessDate.replace(/\D/g,"")};
    // Finish output
    s+=(udate==''?'':" |date="+udate)+" |title="+utitle+
    " |newspaper="+upub+" |accessdate="+accessDate;
    GM_log("udate:"+udate+"//utitle:"+utitle+"//uref:"+uref+"//uauthor:"+uauthor);
    return s;
}

function sortResult(s){
	var ord=new Array("accessdate=","publisher=","newspaper=","date=",
		"first1?=","last1?=","author=","title="); // Reverse order
    for(var i=0;i<ord.length;i++){
    	if(s.search(ord[i])>0){
      		var m='\\| ?'+ord[i]+'[^\\|]+';
      		if(s.match(m)!==null){
      	  		var mm=s.match(m)[0];
      	  		s=s.replace(/(\{\{cite (news|web) )/,"$1"+mm);
      	  		s=s.split(mm)[0]+mm+s.split(mm)[1]+s.split(mm)[2];
    		}
   		}
   	}
   	return s;
}

function showCitationFromInfo(info, url) {
      var s = '{{cite '+news(), testUrl=false;
      s += info;
      if(uurl==''){ // check if there was a recommended url
      	uurl=url
      	if(uref==''){uref=uurl};
      }else{testUrl=true};
      if(uurl!==''){s += ' |url=' + uurl + '}}'}else{s+='}}'};
      // sort into preferred order
      s=sortResult(s);
      // Toggle pre-existing citation box
      var test=document.getElementById('cite');
      if(test!==null){
      	test.parentNode.parentNode.removeChild(test.parentNode);
      		with(document.getElementById('myCite').getElementsByTagName('input')[0]){
      			value="Show citation";
      			//style.backgroundColor="transparent";
      		}
      	} else {
      		with(document.getElementById('myCite').getElementsByTagName('input')[0]){
      			value="Hide citation";
      			//style.backgroundColor="lightblue";
      		}
      	// Create citation box buttons
      	var tb = document.getElementById('citearea'); // insert before this div
      	var cite=document.createElement('div');
      	var taRows=parseInt(s.length/70)+1;
      	var plusRows=0; // How many rows are too long for text box
      	for(var i=0;i<s.split(' |').length;i++){if(s.split(' |')[i].length>75){++plusRows}};
      	s.replace(/'/g,"&#146;"); // change single quotes
      	// Create summary / abstract
      	var sSummary=s.replace(/}}$/,(usummary!=='' ? " | quote="+usummary+"}}" : "}}"));
      	var search=utitle.split(':')[0].replace(/\s/g,"+");
		var gnews="http://news.google.com/archivesearch?q="+search;
		var gyear="&as_user_hdate="+uyear+"&as_user_ldate="+uyear;
		var guardian="http://browse.guardian.co.uk/search?search="+utitle.split(':')[0];
		//cite.className='blogs';
      	cite.innerHTML = '\n<form name=cite id=cite><p style="font-size:12pt;margin:0px;">'+
      	'<span title="Edit and copy citation, useful additional fields include &quot;quote&quot; and &quot;page&quot;">'+
      	'Wikipedia citation</span> <input style="font-size:8pt" type="button" value="Highlight Text" title="Click to highlight all text for copying" '+
      	'onClick="javascript:this.form.citation.focus();this.form.citation.select();"> '+
      	 // Newspaper droplist
      	' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; \
</SCRIPT>\
<SELECT NAME="droplist" id=droplist title="Search for &quot;'+
utitle.split(':')[0].replace(/[^\w\s]/g,"")+'&quot; at selected site" >\
<OPTION SELECTED="SELECTED" VALUE="'+gnews+'+">Google News</OPTION>\
<OPTION VALUE="http://www.google.com/search?q='+search+'">Google</OPTION>\
<OPTION VALUE="'+gnews+'+site:independent.co.uk">The Independent</OPTION>\
<OPTION VALUE="'+gnews+'+site:timesonline.co.uk">The Guardian</OPTION>\
<OPTION VALUE="'+gnews+'+site:bbc.co.uk">BBC News</OPTION>\
<OPTION VALUE="'+gnews+'+site:telegraph.co.uk">The Telegraph</OPTION>\
<OPTION VALUE="'+gnews+'+site:thesun.co.uk">The Sun</OPTION>\
<OPTION VALUE="'+gnews+'+site:cnn.com">CNN</OPTION>\
<OPTION VALUE="'+gnews+'+site:nytimes.com">New York Times</OPTION>\
<OPTION VALUE="http://www.wired.com/search?query='+search+'&siteAlias=all">Wired News</OPTION>\
</SELECT><INPUT TYPE="BUTTON" VALUE="Go" \
ONCLICK="javascript:location.href=this.form.droplist.options[this.form.droplist.selectedIndex].value;">\
'+
      	'</p>\n'+
      	'<p style="margin-top:2px;margin-bottom:0px;">'+
      	// +Less button
      	'<input id="b_url" style="font-size:8pt" type="button" value="Less" '+
      	'onClick="javascript:'+
      	'this.form.citation.value=this.form.citation.value.replace(/\\|(loc|ref)( *)=[^\\|}]*/g,&quot;&quot;)'+
      	'.replace(/\\[http[^\\|]+The Times\\]/,&quot;[http://archive.timesonline.co.uk The Times]&quot;)";> '+
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
      	// +(optional) summary
      	(usummary.length>0 ? 
      	'<input title="Add summary of article as quotation" '+
      	'style="color:darkblue;font-size:8pt" type="button" value="Summary" '+		
      	'onClick="javascript:var v=this.form.citation;if(v.value.match(/quote( *)=/)==null){'+
      	'v.value=v.value.replace(/}}$/,&quot; |quote='+usummary+'}}&quot;)};"> '
		:'')+
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
      	'</td></tr></table>\n'+ // Text area end
      	// +help
      	'<p style="margin:0px;font-size:8pt;"><input id=showHelp title="Show instructions" '+
      	'type=button value="Help" '+
      	'onClick="javascript:var h=getElementById(&quot;helpText&quot;),t=this.form.showHelp;'+
      	'if(t.value==&quot;Help&quot;){'+
      	'h.style.display=null;'+
      	't.value=&quot;Hide help&quot;;t.style.color=&quot;red&quot;}else{'+
      	'h.style.display=&quot;none&quot;;'+
      	't.value=&quot;Help&quot;;t.style.color=&quot;black&quot;}'+
      	';" > '+
      	'<span id=addfields> Add field: '+
		// +author
      	'<input title="Add an author to the citation" '+
      	'style="color:darkblue" type=button value=author '+
      	'onClick="javascript:var a=prompt(&quot;Author&quot;,&quot;'+uauthor+'&quot;);if(a.length>0){'+
      	'this.form.citation.value=this.form.citation.value'+
      	'.replace(/ \\|( *)author[^\\|}]*|(}})$/,&quot; |$1author=&quot;+a+&quot;$2&quot;)}else{'+
      	'this.form.citation.value=this.form.citation.value.replace(/\\|( *)author[^\\|}]*/,&quot;&quot;)};" > '+
      	// +quotation
      	 '<input title="Add quotation to the citation" style="color:darkblue" type=button value=quote '+
      	'onClick="javascript:var q=prompt(&quot;Quotation&quot;);if(q.length>3){this.form.citation.value=this.form.citation.value.replace'+
      	'(/}}$/,&quot; |quote=&quot;+q+&quot; }}&quot;)};" > '+
      	'</p></span><div id="helpText" style="display:none"><p><table><tr>'+
      	'<td style="padding:2em;background-color:lightgreen;">'+
      	helpText+'</td></tr></table></p></div>'+
        '</form>';
      	cite.style.backgroundColor='lightblue';
      	cite.style.border='solid black 1px';
      	cite.style.padding='8px';
      	cite.style.margin='2px';
		cite.style.marginTop='0em';
      	tb.parentNode.insertBefore(cite,tb); // Insert before titlebar
      	}
    }


    function showCitationFromPage() {
      var u = cleanURI();//location.href;
      var page = u.split('&')[0];
      GM_log('Getting info from '+page);
      var info = infoFromPaper();
     showCitationFromInfo(info, u);
    }
    
    function cleanURI() {
    return location.href.split('&')[0];
    }
    
    function news(){
    if(cleanURI().match(/^http:\/\/news/)!==null){return 'news'}else{return 'web'};
    }

    //Add a main buttons to the top bar
    function add_link(text, title, func, id) {
      //Check this is an article
      if(cleanURI().length<25||cleanURI().match(/wired.com\/\w*\/?$/)!==null){return};
      //var bar = document.getElementsByTagName('div');
      //if(bar!==null){bar=bar[0]}else{return};
      bar=document.getElementById('StoryHeader');
      if(bar!==null){bar=bar.parentNode}else{
      	bar=document.getElementById('Clear');
      	if(bar==null){return}else{bar=bar.parentNode};
      }; // 'page' not used on product reviews
      var link = document.createElement('a');
      var citearea=document.createElement('div');
      citearea.id="citearea";
      link.title = title;
      link.innerHTML = text;
      link.style.textDecoration = 'none';
      link.style.fontSize='5pt';
      link.id=id;
      link.style.marginLeft='0em';
      link.style.float='left';
      var dofunc = function(event) {
        event.stopPropagation();
        event.preventDefault();
        func();
      };
      link.addEventListener('click', dofunc, false);
      bar.parentNode.insertBefore(link,bar);
      bar.parentNode.insertBefore(citearea,bar);
    }

//GM_log('Adding link to top');
add_link('<div class="clearer"></div><div style="background-color:lightblue;height:10pt;">\
<input type=button value="Show citation" \
style="height:4pt;font-size:6pt;text-decoration:none;" \
onmouseover="javascript:;\
this.height=&quot;14pt&quot;;this.style.fontSize=&quot;8pt&quot;;this.style.backgroundColor=null;"\
onmouseout="javascript:this.style.fontSize=&quot;6pt&quot;;this.height=&quot;4pt;&quot;"></div>', 
	'Show a Wikipedia formatted citation for this article',
	showCitationFromPage,'myCite');