/**/
// ==UserScript==
// @name           BartonMod
// @namespace      http://mit.edu/gregp/www/barton-greasemonkey/
// @description    Set of improvements to the MIT Barton Library browsing and search system
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @include        https://library.mit.edu/*
// @include        http://library.mit.edu/*
// ==/UserScript==
/**/

/////////////////////////////////// DEBUG //////////////////////////////////////
if(unsafeWindow.console){
   GM_log = unsafeWindow.console.log;
}

/////////////////////////////////// XPATH //////////////////////////////////////
function xP(){
	function xPathInDoc(q,w,d){
		    return d.evaluate(q,w, null,
	        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}

	function xPathSnapshotToJQuery(s){
		var x = new Array();
		
		for(i=0;i<s.snapshotLength;i++){
			x.push($(s.snapshotItem(i)));
		}
		
		return $(x);
	}

	if(arguments.length < 3) var doc = document;
	else var doc = arguments[2];
	
	if(arguments.length < 2) var contain = document;
	else var contain = arguments[1];
	
	var query = arguments[0];
	
	return xPathSnapshotToJQuery(xPathInDoc(query,contain,doc));
}
function subXPath( q, doc ){ return xP(q,doc,doc); }
function containingClassXPath(className) {
  return "contains(concat(' ',normalize-space(@class),' '),' " + className + " ')";
}
function xPathLocationHasStringQ(xpath,str){
	var xpre = xP(xpath);	
	return !(xpre.length == 0 || !hasStringQ(xpre[0],str));
}

/////////////////////////////////// COLORS //////////////////////////////////////
function randInt(m){return Math.floor(Math.random() * m);}
function makeRed(w){color(w,"red");}
function color(w,c){w.css({"background-color":c});}
red = {"background-color":"red"};
green = {"background-color":"green"};
blue = {"background-color":"blue"};

/////////////////////////////////// DOM JUNK //////////////////////////////////////
function hasStringQ(){
	var transform;
	if(arguments.length > 2) transform = arguments[2];
	else transform = stripNbspTransform;
	
	return containsUnderTransform( $(arguments[0]).html(), arguments[1], transform );
}
function whitespaceQ( dom ){
	dom = $(dom).clone();
	dom.children().remove();
	return stripAllWhitespace( dom.html() ) == "";
}
/*function walkDownTable(node,check,funct){
	// TODO: make this work for non-children[0] solutions... take a nextFunction
	var i=0;
	while( check(node) ){
		var a=$("a",node.parent());
		a.each(funct);
		//a.css(red);
		i++;
		node = $(node.parent().next().children()[0]);
	}
	return i;
	//GM_log("found "+i+" subjects to mod.");
}*/

function walkDownTable(node,check,funct){
	return iterativeAct( node, check,
		function( cur ){
			return $(cur.parent().next().children()[0]);},
		function( cur ){
			var a=$("a",cur.parent());
			//a.css(red);
			a.each(funct);}
		);
}

function iterativeAct( beginNode, continueCheckQ, nextFinder, nodeAct ){
	// returns the number of nodes found
	var i=0;
	var node = $(beginNode);
	while( continueCheckQ(node) ){
		nodeAct( node );
		i++;
		node = nextFinder( node );
	}
	return i;
}

/////////////////////////////////// STRINGS //////////////////////////////////////
function removeSpanAndScript( htmstr ){
	return htmstr.replace(/[\s]*<script[\s\S]*?\/script>[\s]*/g,"").replace(/<span.*?>([\s\S]*?)<\/span>/g,'$1');
}
function stripJavascriptOpenWindow(hrefstr){
	return hrefstr.replace(/javascript:open_window\("(.*)"\);/g,"$1");
}
function stripAllWhitespace(str){
	if(typeof(str)!="string") return str;
	return str.replace(/&nbsp;/g," ").replace(/\s/g,"");
}
function trimWhitespace(str){
	return $.trim( str.replace(/&nbsp;/g," ") );
}
function stringAfter( str, seek ){
	var where = str.indexOf( seek );
	if( where == -1 ) return str;
	return str.substring( where + seek.length );
}
function replaceList( str, list ){
	for(var i=0; i<list.length; i+=2){
		if(list.length <= i+1) break;
		str = str.replace(list[i],list[i+1]);
	}
	return str;
}
function removeList( str, list ){
	var repl = Array();
	for(var i=0; i<list.length; i++){
		repl.push(new RegExp(list[i],"g"));
		repl.push("");
	}
	return replaceList(str,repl);
}
function containsUnderTransform(str,tar,trans){
	return trans(str).indexOf(trans(tar)) != -1;
}

/////////////////////////////////// FILTERS //////////////////////////////////////
function callNumberFilter(str){
	return removeList(" "+str.replace(/&nbsp;/g," "), [" CD"," RECORD"," DVD"," VDISC"," VIDEO"," SCORE"," BOOKS"]).slice(1);
}
function stripNbspTransform(temps){
	return temps.replace(/&nbsp;/g," ");
}
function authorTransform( htmstr ){
	return removeSpanAndScript( htmstr )
		.replace(/&nbsp;/g," ").replace(/[.]/g,"")
		.replace(" cmp","").replace(" prf","").replace(" itr","")
		.replace(" cnd","").replace(" arr","");
}
function subjectTransform( htmstr ){
	return removeSpanAndScript( htmstr )
		.replace(/&nbsp;/g," ").replace(/[.]/g,"");
}

/////////////////////////////////// LINK CODES //////////////////////////////////////
function callNumberBrowseHref(callno){
	return "?func=find-e&find_scan_code=SCAN_CND&request=" + callno;
}
function subjectBrowseHref(subj){
	return "?func=find-e&find_scan_code=SCAN_SUB&request=" + subj;
}
function authorBrowseHref(name){
	return "?func=find-e&find_scan_code=SCAN_AUT&request=" + name;
}
function publisherBrowseHref(pub){
	return "?func=find-a&find_code=WPB&request=" + pub;
}

var smallLink = {"font-size":"10px","margin-left":"10px"};
	
//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// LINK MODIFIERS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
function modAuthorLink( where ){
	// TODO: keep bold status
	where = $(where);
	where.after($("<a>(similar)</a>").css(smallLink).attr("href",where.attr("href"))).after($("<span> </span>"));	var name = authorTransform( where.html() );
	//GM_log( name );
	
	var iframe = $("<iframe>").css({"visibility":"hidden","display":"none"});
	where.after(iframe);
	
	var linkSearch = function(doc,where){
		var it = subXPath("/html/body/table/tbody/tr/td[2]/a", doc );
		var i=0;
		var cur;
		var ans = doc.location;
		
		for(var i=0;i<it.length;i++){
			cur = $(it[i]);//.children();
			cur.css(red);
			
			//GM_log( cur.html() );
			if( hasStringQ( cur, name, authorTransform ) ) {
				GM_log( ">>> Author Found - GOTO >>>" + cur.attr("href") );
				return ans = cur.attr("href");
				};
		}
		
		return ans;
	}

	
	where.attr("href","#");
	
	where.click( function(){
		var gotoFoundLink = function(){ window.location = linkSearch(this.contentDocument); };
		iframe.load( gotoFoundLink );
		iframe.attr("src", authorBrowseHref( name ) );
		return false;
		} );
}

function modSeriesLink( where ){
	//TODO
}

function modSubjectLink( where ){
	where = $(where);
	where.after($("<a>(similar)</a>").css(smallLink).attr("href",where.attr("href"))).after($("<span> </span>"));
	var subj = subjectTransform( where.html() );
	
	var iframe = $("<iframe>").css({"visibility":"hidden","display":"none"});
	where.after(iframe);
	
	var linkSearch = function(doc,where){
		var it = subXPath("/html/body/table/tbody/tr/td[2]/a", doc );
		var i=0;
		var cur;
		var ans = doc.location;
		
		for(var i=0;i<it.length;i++){
			cur = $(it[i]);
			
			//cur.css(red); // debug, but make sure to unhide the iframe too...
			//GM_log( cur.html() );
			
			if( hasStringQ( cur, subj, subjectTransform ) ) {
				GM_log( ">>> Subject Found - GOTO >>>" + cur.attr("href") );
				return ans = cur.attr("href");
				};
		}
		
		return ans;
	}
	

	where.attr("href",subjectBrowseHref(subj));
	where.click( function(){
		var gotoFoundLink = function(){ window.location = linkSearch(this.contentDocument); };
		iframe.load( gotoFoundLink );
		iframe.attr("src", where.attr("href") );
		return false;
		} );
}

function makeCallNumberLink( where ){
	// takes a dom element whose html contains the call number (and only the call number)
	where = $(where);
	var callnorote = where.html().replace(/&nbsp;/g," ");
	var callno = callNumberFilter( callnorote  );
	where.html('<a href="' + callNumberBrowseHref(callno) + '">' + callnorote + "</a>");

	var iframe = $("<iframe>").css({"visibility":"hidden","display":"none"});
	where.after(iframe);
	
	var linkSearch = function(doc,where){
		var it = subXPath("/html/body/table[5]/tbody/tr", doc );
		var i=0;
		var cur;
		
		for(var i=0;i<it.length;i++){
			cur = $(it[i]).children();
			
			//cur.css(red); // debug, but make sure to unhide the iframe too...
			
			if( hasStringQ( cur[0], callno ) ) {
				return $("a", cur[1]).attr("href");
				};
		}
		
		return doc.location;
	}
		
	where.click( function(){
		iframe.load( function(){
			window.location = linkSearch(this.contentDocument);
			});
		iframe.attr("src", callNumberBrowseHref( callno ) );
		return false;
		} );
}


//////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// ITEM MODIFIERS ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
function modItemContents( where ){
	where.children("br").remove();
	
	var temphtml = where.html();
	temphtml = temphtml.replace(/\+\+/g,"");
	temphtml = temphtml.replace(/&nbsp;/g," ");
	temphtml = temphtml.replace(/\.[ ]*Disc/g,"<br>Disc");
	temphtml = temphtml.replace(/Disc (.+?)[.] /g,"Disc $1<br>");
	temphtml = temphtml.replace(/ -- /g,"<br>");

	where.html( temphtml );
	// TODO: replace this with an interpretation state machine
}

function modItemLocation( where ){
	if(hasStringQ(where,"Request this from the Library Storage Annex")) return;
	if(hasStringQ(where,"Internet Resource")){
		return where.after($("<span>").html(where.html())).remove();
	}
	
	var ht = where.html().replace(/&nbsp;/g," ");
	var bar = ht.indexOf(" | ");
	//GM_log(ht);
	
	var callno = callNumberFilter( ht.slice( bar + 3 ) );
	//GM_log(callno);
	var callnolink = $("<a>"+callno+"</a>").attr('href', callNumberBrowseHref(callno) );
	
	where.html( ht.slice(0,bar) );
	where.after(callnolink);
	where.after($("<span>").html(ht.slice(bar,ht.indexOf(callno))));
	
	
	if(false) return;
	// TODO: make this not hang the search listing page
	
	var iframe = $("<iframe>").css({"visibility":"hidden","display":"none"});
	
	where.html();
	
	var linkSearch = function(doc){
		var it = subXPath("/html/body/p/table/tbody/tr/td[6]", doc );
		var i=0;
		var cur; var currow; var loc;
		var avail = new Array(0);
		var ans = doc.location;
		
		for(var i=0;i<it.length;i++){
			cur = $(it[i]);
			currow = cur.parent().children("td");
			loc = $(currow[0]).html() + " - " + $(currow[1]).html()
			
			if( containsUnderTransform( loc , where.html(), stripNbspTransform ) )
			{
				//GM_log( loc );
				cur.css(red); // debug, but make sure to unhide the iframe too...
				cur.parent().children('script').remove();
				var volInfo = cur.prev().prev().html().replace("<br>","");
				var info = "";
				
				info += cur.html().replace("<br>"," ");
				if( info == "In Library" ){
					info += " @ " + cur.prev().prev().prev().prev().html();
				}
				if (volInfo != ""){
					info += " {" + volInfo + "}";
				}

				avail.push( info );
			}
		}
		return avail;
	}
	
	var doit = function(){
		$(this).unbind('mouseover');
		
		//TODO: place the current status a little bit more nicely
		var st = {"padding":"0px 15px 0px","margin":"0px"};
		var list = $("<ul>").css(st);
		callnolink.after(list);
		list.children().remove();
		
		var makeAvail = function(){
			var avail = linkSearch(this.contentDocument);
			var availDom = $("<li>").html((""+avail).replace(/,/g,"<li>"));
			
			list.append(availDom);
			iframe.remove();
		};

		iframe.load( makeAvail );
		iframe.attr("src", where.attr("href") );
		where.after(iframe);
	}
	
	where.mouseover(doit);
}


function modItemPublisher( where ){
	var chi = where.children();
	var dobold = false;
	if(chi.length > 2){ // always two <script>s; if more, need to do some fancy footwork
		where.html( removeSpanAndScript( where.html() ) );
		dobold = true;
	} else {
		chi.remove();
	}
		
	var thehtml = trimWhitespace(where.html().replace(/&nbsp;/g," "));
		
	var pub;
	if( (pub = thehtml.replace(/.* : (.*?),.*/,"$1")) != thehtml ) {
		//GM_log(">>> Publisher Found: >>> " + pub);
	} else if( (pub = thehtml.replace(/.*, (.*?),? \[.*\]/,"$1")) != thehtml ) {
		// for "Milano, Galleria del Levante [1967]"
	} else if( (pub = thehtml.replace(/\[.*\] (.*); .*/,"$1")) != thehtml ) {
		// for "[Gaithersburg, Md.] U. S. National Bureau of Standards; for sale by the Supt. of Docs., U. S. Govt. Print. Off., Washington, 1968." 
	} else if( (pub = thehtml.replace(/.*?, (.*), .*?\./,"$1")) != thehtml ) {
		// for "London, Hilger, 1969."
	} else {
		// still problems:
		//		http://library.mit.edu/item/001129590
		//		http://library.mit.edu/item/001116616
		//		http://library.mit.edu/item/000219103
		return;
	}
	
	var actualPublisher = pub.replace("&amp;","&");
	//GM_log(">>> Publisher Found: >>> " + actualPublisher);
	//GM_log(publisherBrowseHref(actualPublisher));
	
	var publink = $("<a>").attr("href",publisherBrowseHref(pub)).html(actualPublisher);
	var pubstart = thehtml.indexOf(pub);
	var beforetxt = thehtml.slice( 0, pubstart );
	var aftertxt = thehtml.slice( pub.length + pubstart );
	
	where.html("");
	where.append($("<span>").html(beforetxt));
	if(dobold){
		where.append( $("<b>").append(publink) );
	}
	else where.append( publink );
	where.append($("<span>").html(aftertxt));
}

function modItemTitle( where ){
	where = $(where);
	var newit = $("<span>").html( where.html() + " " );
	where.after( newit );
	newit.after($("<a>").html("(uniform)").css(smallLink)
						.attr("href",where.remove().attr("href")));
}

function printObject( obj ){
	var str="{ ";
	
	for( key in obj ){
		str += "\"" + key + "\" : \"" + obj[key] + "\" , ";
	}
	
	if( str == "{ " ) str += " ";

	str = str.substr(0, str.length - 2) + "}";
	
	GM_log( str );
}

function stripComments( what ){
	return what.replace(/<!--[\s\S]*-->/g,"").replace(/\s+/g," ");
}

function getItemPageData(given){
	//function iterativeAct( beginNode, continueCheckQ, nextFinder, nodeAct )

	var itemInfo = new Object();

 	var it = $("tr",given);
	GM_log( it.length + " properties found." );

	var labelLoc, dataLoc;
	var curLabel = ""; var newLabel = "";

	for(var i = 0; i < it.length; i++){
		labelLoc = $("td:first",it[i]);
		newLabel = trimWhitespace( labelLoc.html() );
		if( newLabel != "" ) curLabel = newLabel;

		dataLoc = $("td:last",it[i]);
		dataLoc.children("script").remove();
		dataLoc.children("img").remove();
		
		if( undefined == itemInfo[curLabel] ){
			itemInfo[curLabel] = trimWhitespace( stripComments( dataLoc.html() ) );
		}
		else {
			itemInfo[curLabel] += "<br>" + trimWhitespace( stripComments( dataLoc.html() ) );
		}
	};

	var datatab = $("<table width='100%' cellspacing='2' id='bibData'>");
	var curRow;


	for( var k in itemInfo ){
		curRow=$("<tr>");
		curRow.append("<td class='td1' style='width:15%;padding:3px 8px;font-weight:bold;text-align:right;vertical-align:top;'>"+k+"</td>");
		curRow.append("<td class='bib' id='bib_"+k.replace(/\s/g,"")+"' style='text-align:left;'>"+itemInfo[k]+"</td>");
		datatab.append(curRow);
		//GM_log("\""+k+"\" : \""+itemInfo[k]+"\"");
	}
	
	//GM_log(datatab);

	return {"dom":datatab,"text":itemInfo};
}

function getPermalink( docnum ){ return $("<a>(permalink)</a>").css(smallLink).attr("href","http://library.mit.edu/item/"+docnum);}
function getResultLink( text ){ return $("<a>"+text+"</a>").attr("href","?func=short");}
function getBookshelfLink( docnum ){ return $("<a>(bookshelf)</a>").css(smallLink).attr("href","?func=myshelf-add-ful-1&doc_library=MIT01&doc_number="+docnum);}
function getEmailLink( docnum ){ return $("<a>(email)</a>").css(smallLink).attr("href","?func=full-mail-0&doc_library=MIT01&doc_number="+docnum);}
function getRefWorksLink( docnum ){ return $("<a>(refworks)</a>").css(smallLink).attr("href","?func=full_mail&doc_library=MIT01&format=999&option_type=&doc_number="+docnum);}

function getFormatLinks(){
	var linx = $("<span>").css({
		"float":"right",
		"position":"relative"
	}).html("format:<br>");

	//http://library.mit.edu/F/MCJ9G2ENFRSS4DNP4E5ASNV7U3G3H34PYXFPNNRT9FECEU9CSE-30968?func=full-set-set&set_number=028152&set_entry=000001&format=999 -- Full
	//http://library.mit.edu/F/MCJ9G2ENFRSS4DNP4E5ASNV7U3G3H34PYXFPNNRT9FECEU9CSE-30969?func=full-set-set&set_number=028152&set_entry=000001&format=040 -- Cite
	//http://library.mit.edu/F/MCJ9G2ENFRSS4DNP4E5ASNV7U3G3H34PYXFPNNRT9FECEU9CSE-30970?func=full-set-set&set_number=028152&set_entry=000001&format=001 -- MARC

	return linx;
}

function modItemPage(){
	var titel = $(".title:contains(Full Record)");
	if( titel.length < 1) return;
	var tabil = $("td.bib:first").parents("table"); // this is the locator -- assumes there are no floating things with bib class
	if( tabil.length < 1 ) return;
	GM_log("Modding Item Page!...");

	// get doc number
	var docnum = $(".title a").attr("href");
	docnum = docnum.slice(docnum.indexOf("item/")+5);
	titel.remove();
	//if( window.location.indexOf("func=direct"!= -1) ){
		//GM_log("item number = "+docnum);
	//} else {
		// TODO: DOES NOT WORK WITH ?func=direct&doc_number=000514206
			// window.location.indexOf("doc_number="+11));
	

	// cleaning up bib data
	var itemData = getItemPageData( tabil[0] );
	tabil.replaceWith(itemData["dom"]);

	// clean up Record _ of __
	var oldSD = $("td:contains(Record):first");
	var searchDescr = oldSD.html().trim();
	oldSD.parents("table").remove();
	var searchDeCut = searchDescr.indexOf(" of ")+4;
	$("[title=Refworks]").parents("table").remove();
	$("[title=Display MARC Tags]").parents("table").remove();
		// TODO: need to cull the set number and entry, send this to the getFormatLinks, and create Next & Prev navigation

	// create search header bar
	var searchHead = $("<td>").attr("colspan","2").css({"border-bottom":"1px solid","padding-bottom":"5px"});
	$("#bibData").prepend("<tr id='bibHeader'>");
	$("#bibHeader").append(searchHead);

	// put links into the search header bar
	searchHead.append(
		$("<span>"+searchDescr.substring(0,searchDeCut)+"</span>").css({"margin-left":"15%"}).append(
			getResultLink(searchDescr.substring(searchDeCut))
		));
	searchHead.append(getPermalink(docnum));
	searchHead.append(getBookshelfLink(docnum));
	searchHead.append(getEmailLink(docnum));
	searchHead.append(getRefWorksLink(docnum));

	//searchHead.append(getFormatLinks());

	//$("#bibHeader").append("<td id='prevHolder'>");
	//$("#bibHeader").append("<td id='nextHolder'>");

	// modding bib data & links	
	$("a",$("#bib_Location")).each(function(){modItemLocation( $(this) );});
	$("a",$("#bib_Title")).each(function(){modItemTitle( $(this) );});
	$("a",$("#bib_Author")).each(function(){modAuthorLink( $(this) );});
	$("a",$("#bib_OtherAuthor")).each(function(){modAuthorLink( $(this) );});
	$("a",$("#bib_Series")).each(function(){modSeriesLink( $(this) );});
	$("a",$("#bib_Subject")).each(function(){modSubjectLink( $(this) );});
	modItemContents( $("#bib_Contents") );
	modItemPublisher( $("#bib_Published") );
}

function modSearchListingPage(){
	if( !xPathLocationHasStringQ("/html/body/div[2]", "Brief Results") ) return;
	GM_log("Modding Search Listing Page...");
	
	x = xP("/html/body/form/table[2]/tbody/tr");
	
	for(var i=0;i<x.length;i++){
		x[i].children("script").remove();
	   	cur = x[i].children();
		if( $(cur[2]).html().indexOf("Author") != -1 ) {
	   		a=$("a",cur[3]);
	   		a.each(function(){ modAuthorLink( $(this) );});
	   	}
	   	else if( $(cur[2]).html().indexOf("Title") != -1 ) {
	   		a=$("a",cur[3]);
	   		a.each(function(){ modItemTitle( $(this) );});
	   	}
	   	else if( $(cur[2]).html().indexOf("Location") != -1 ) {
	   		a=$("a",cur[3]);
	   		a.each(function(){ modItemLocation( $(this) );});
	   	}
	   	else if( $(cur[2]).html().indexOf("Location") != -1 ) {
	   		a=$("a",cur[3]);
	   		a.each(function(){ modItemLocation( $(this) );});
	   	}
	}
}

function modLoanListingPage(){
	if( !xPathLocationHasStringQ("/html/body/div[2]", "Items on loan for:") ) return;
	GM_log("Modding Loan Listing Page...");
	
	x = xP("/html/body/p[3]/table[1]/tbody/tr/td[last()]");
	for(i=0;i<x.length;i++){
    	cur = $(x[i]);
    	makeCallNumberLink( cur );
	}
}


function modBookshelfPage(){
	if( !xPathLocationHasStringQ("/html/body/table[4]/tbody/tr/td", "Your Bookshelf") ) return;
	GM_log("Modding Bookshelf Page...");
	

	x = xP("/html/body/table[6]/tbody/tr/td[6]");
	for(i=0;i<x.length;i++){
    	cur = $(x[i]);
    	makeCallNumberLink( cur );
	}
}

function modHoldRequestPage(){
	if( !xPathLocationHasStringQ("/html/body/div[2]", "Hold Requests for:") ) return;
	GM_log("Modding Hold Request Page...");
	
	x = xP("/html/body/p[2]/table/tbody/tr/td[9]");
			
	for(i=1;i<x.length;i++){
    	cur = $(x[i]);
    	makeCallNumberLink( cur );
	}
}

function verticalCenter( elt ){
	var out = $("<div style='display:table-cell;position:static;vertical-align:middle;top:50%'>");
	var inn = $("<div style='position:relative;top:-50%;'>").append(elt);
	return out.append(inn);
}


function modTopJunk(){	
	var bod = $("body").css({"font-family":"Verdana, Arial, Helvetica, sans-serif"});
	$("script", bod).remove();
	var oldtop = $("table:eq(0)",bod);

	var links1CSS = {"float":"right","font-size":"11px","color":"#ccff99","margin-right":"10px","position":"relative","top":"8px"};
	var links1 = $("<div>").css({
		"height":"30px","width":"100%"
	});
	links1.append($("<a href='http://libraries.mit.edu/'>MIT Libraries</a>").css(links1CSS));
	links1.append($("<div>").css({"float":"left","height":"1px","width":"4%"}));
	links1.append($("a:first",oldtop).css(
		{"text-decoration":"none","position":"relative","top":"3px"} // Image link
		));
	links1.append($("<span>").html("<< gregp-mod >>").css(
		{"color":"white","font-size":"10px","position":"relative","top":"-5px"} 
		));
		
	// Replace the topbar with a css one...
	var topbar = $("<div>").addClass("headerbar").css({
		"background-color":"#336699","margin-top":"4px","width":"100%"
	});
	topbar.append(links1);
	topbar.append($("<div>").css({"background-color":"#669999","height":"6px","border-top":"1px solid white"}));
	topbar.append($("<div>").css({"background-color":"white","height":"1px"}));
	oldtop.remove();bod.prepend(topbar);

	// Deal with
	var loggedin = hasStringQ( $("#redbold"), "log out of Your Account" );
	if( loggedin ){
		links1.append($("<span>").html("<< Logged In >>").css(
			{"color":"#999","font-size":"10px","position":"relative","top":"-5px","margin-left":"10px"} 
		));
		$("#redbold").parents("table").remove();
	}



	var worldCatSearch = $("#wcl_searchbox").clone();
	$("#wcl_searchbox").parents("table").remove();

	$("body>br").remove();

	links1.append( $("body>table:first a").css(links1CSS) );
	$("[alt=Ask Us!]",links1).replaceWith("Ask Us");
	$("body>table:first").remove();

	
	var links2CSS = {"font-size":"11px","margin-right":"10px","position":"relative","top":"5px"};
	var links2 = $("<div>").css({
		"height":"25px",
		"width":"100%",
		"background-color":"fff",//"#9cc",
		"border-bottom":"1px solid #699",
		"margin-bottom":"10px"
	});
	$(".headerlinks").css({"margin-bottom":"10px"});//.prepend(links2);
	
	var rightl2 = $("<div style='float:right'>");
	var leftl2 = $("<div style='float:left'>");
	topbar.append(links2);
	links2.append(leftl2);
	links2.append(rightl2);
	
	rightl2.append($("<a href='?func=bor-info'>Your Account</a>").css(links2CSS));
	rightl2.append($("<a href='http://libraries.mit.edu/help/touchstone.html'>(Help)</a>").css(links2CSS));
	rightl2.append($("<a href='?func=myshelf-short'>Bookshelf</a>").css(links2CSS));
	rightl2.append($("<a href='?func=history'>History</a>").css(links2CSS));

	var locations={"Barker Engineering Library":"BARKER","Barker Reference Collection":"BARKERREFERENCE","Barker Journals":"BARKERJRNAL","Barker Stacks":"BARKERSTACKS","Dewey Library":"DEWEY","Dewey Reference Collection":"DEWEYREFERENCE","Dewey Journals":"DEWEYJRNAL","Dewey Stacks":"DEWEYSTACKS","Hayden Library - Humanities":"HUMANITIES","Hayden Humanities Reference":"HUMANITIESREF","Hayden Humanities Journals":"HUMANITIESJRNAL","Hayden Humanities Stacks":"HUMANITIESSTACKS","Hayden Library - Science":"SCIENCE","Hayden Science Reference":"SCIENCEREFERENCE","Hayden Science Journals":"SCIENCEJOURNALS","Hayden Science Stacks":"SCIENCESTACKS","Lewis Music Library":"LEWIS","Lewis Music Reference":"LEWISREFERENCE","Lewis Music Journals":"LEWISJOURNALS","Lewis Music Stacks":"LEWISSTACKS","Lewis Music Limited Access":"MUSICLIMITED","Rotch Library":"ROTCH","Rotch Reference":"ROTCHREFERENCE","Rotch Journals":"ROTCHJOURNALS","Rotch Stacks":"ROTCHSTACKS","Rotch Limited Access":"ROTCHLIMITED","Rotch Map Room":"ROTCHMAPROOM","Rotch Visual Collections":"ROTCHVISUAL","Hayden Reserves":"HAYDENRBR","Institute Archives":"ARCHIVES","Library Storage Annex":"LSA","Off-Campus Collection":"LSAOCC","Physics Reading Room":"PHYSICS","Women's Studies":"WSTM"};
	var types={"Books":"BOOKS","CD-ROMs and DVDROMs":"CDROMS","Electronic Resources":"ELECRS","Geographic Information Systems":"GIS","Government Documents":"GOVDOCS","Journals":"JOURNL","Maps":"MAPS","Microforms":"MICROFORMS","MIT Theses":"THESES","Plans/Architectural Drawings":"ARCHDRAW","Serials":"SERIALS","All Music Sound Recordings":"ALLMUSICRECS","All Video Recordings":"ALLVIDEO","- Audio Books":"AUDIOBOOKS","- Audio Tapes":"AUDIOTAPES","- CDs":"CDS","- DVDs":"DVD","- Films (8mm & 16mm)":"FILMS","- Music Scores":"SCORES","- Phonograph Records":"RECORDS","- Spoken Word Recordings":"SPOKENWORD","- Videocassettes":"VIDEOTAPES","-  Videodiscs":"VIDEODISCS"};
	var searchonly = function(){
		// to be called within the proper select only...
		var to = $(this).attr("value");
		if("" != to) window.location = "?func=file&file_name=find-a&local_base=" + to;
	}
	var optionCSS = {"font-size":"10px","position":"relative","top":"3px","margin-left":"10px"};

	var locs = $("<select>").click(searchonly).css(optionCSS);
	locs.append("<option value=''>-- Locations --</option>");
	for( var z in locations ){
		locs.append("<option value='"+locations[z]+"'>"+z+"</option>");
	}
	links2.append(locs);

	var typs = $("<select>").click(searchonly).css(optionCSS);
	typs.append("<option value=''>-- Item Types --</option>");
	for( var z in types){
		typs.append("<option value='"+types[z]+"'>"+z+"</option>");
	}
	links2.append(typs);

	leftl2.append($("<span>Full Search:</span>").css(links2CSS).css({"color":"#F90","margin-left":"20px"}));
	leftl2.append($("<a href='?func=file&file_name=find-b&local_base=MIT01PUB'>Basic Search</a>").css(links2CSS));
	leftl2.append($("<a href='?func=file&file_name=find-a&local_base=MIT01PUB'>Advanced Search</a>").css(links2CSS));

	$("table:first").remove();

//	var linkset = new Object();
//	linkset = {"Account":"?func=bor-info"};
//	for( var lnk in linkset ){
//		links2.append( $("<a>").html(lnk).attr("href",linkset[lnk].css(links2CSS) );
//	}
	//.css({"float":"right"});//*/
}


function modSearchPage(){
	if( !xPathLocationHasStringQ("/html/body/table[4]/tbody/tr/td/div", "Advanced Search") ) return;

	x = $(xP("/html/body/table[5]/tbody/tr/td[2]/form/table/tbody/tr[3]/td/input")[0]);

	function eachLink(keywords){
		window.open("http://library.mit.edu/F/736VX7H9IRSABMKVU9X7U9C7XNLJCXXAPX2HTK2JRPH9SQFPY2-56436?func=find-a&find_code=WTI&request=&request_op=AND&find_code=WAU&request=&request_op=AND&find_code=WRD&request="+keywords+"&adjacent=N&filter_code_2=WYR&filter_request_2=&local_base=MIT01PUB&filter_code_4=WLB&filter_request_4=&filter_code_3=WYR&filter_request_3=&filter_code_1=WLG&filter_request_1=&filter_code_5=WCL&filter_request_5=&Search=Search");
	}

	var searchallbox=$("<div>").css({"float":"right"}).hide();
	var searchallinput=$("<textarea rows='5' cols='50'>");
	var searchallgo=$("<a href='#'>Big Search</a>").click(function(){
		var intxt = searchallinput.attr("value");
		var inarr = intxt.split("\n");
		for( var j = 0; j < inarr.length; j++ ){
			eachLink(inarr[j]);
		}
	});

	searchallbox.append(searchallgo);
	searchallbox.append("<br>");
	searchallbox.append(searchallinput);

	searchallhider=$("<a href='#'>(toggle)</a>").css({"margin-left":"10px"}).click(function(){
		searchallbox.toggle();
	});

	x.after(searchallhider);
	x.after(searchallbox);
}

$(document).ready(function(){
	modSearchPage();
	
	modLoanListingPage();
	modBookshelfPage();
	modHoldRequestPage();

	modSearchListingPage();
	modTopJunk();
	modItemPage();
});

// TODO: replace empty search field with prior search if found
// ex: https://library.mit.edu/F/?func=find-e&find_scan_code=SCAN_CND&request=CD%20PhonCD%20P%20C552%20whi