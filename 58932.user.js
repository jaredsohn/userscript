// ==UserScript==
// @name          Broadsheet, a multicolumn pageviewer
// @description Invoked with control-c, (or shift-middle-click for a paragraph) divides any webpage into page-sized columns for easy scrolling suitable for webpages with large blocks of text, makes online reading of longer texts easier.
// @require http://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// @include         *
// @version 1.4.3
// ==/UserScript==

// @version 2013 Update for Chromium.
// @version If you installed this since December 20 2010 then ensure you do not have a script enabled in GreaseMonkey with the name/number: 58932, disable, then reinstall the script
// @version 25th June 2010.  Fixed speed issues.  Retains image proportions when fitting images into columns.
// @version 19th June 2010.  Retains image proportions.
// @version 19th May 2010.  Can now set number of columns required and column gap in pixels.  See description at userscripts for more info.
// @version 11th May 2010.  Large documents and books handled faster, allowing for timeout depending on length of book.  Other sundries, New York Times, Guardian, Tribune, Sun, Huffington Post etc.
// @version 20th April 2010.  Minor fixes of auto-operation & certain problems with blogs: collumns appeared within columns &  readers' comments were being cut or appeared only in one long column.
// @version 21st February 2010.  Shift-Middle click on paragraph turns it into columns.
// @version 5th February 2010.  Issue with tables on some sites fixed.
// @version 23rd January 2010.  Columize text locally with shift-middle-click.  Note, "middlemouse.contentLoadURL" in about:config must be set to false.  To turn off  annoying autoscroll, the target thingy which appears on middle click, untick it in firefox options->advance.
// @version 21st of Janaury, 2010.  Minor bug fixed.  Interference with other gm script.
// @version 9th of Janaury, 2010.  Ctrl-c now handles interference from created input box selection.
// @version 6th of January, 2010.  Please uninstall old version, if it was a recent one, before upgrading due to name clash.  Updated due to bug on youtube.
// @version Broadsheet, a multicolumn pageviewer                                                                                                                               
// @release note for 5th of Janaury, 2010.  Updated to handle problem with Twitter.
// @release note for Jan 4th 2010: updated to prevent ctrl-c from invoking this script when copying data from a text box (html tag, TEXTAREA).  Previously updated same for input boxes (html tag, INPUT).  Previous update extended default timeout to 30 secs to allow for large pages.  Added version & release notes.


(function() {
  GM_platform_wrapper("Broadsheet Multicolimator", "15u6Od0", true);
var gathered_nodes_stack=[];
var background={}, img, iterations = 0;
var flag={}; // general global store, re-initialized on each run.
flag.fieldInFocus=0;
var defaultTimeout=14;
var ws=window.setTimeout, uwin=unsafeWindow;
var first_time_trial=true, size_factor;
var pagesize_limit, aggression_level, hotkey, hotkeyChar, config={}
initConfig();
var stacked_size_so_far=0, image_so_far=0, running_average=0, no_of_Ps_cloned=0, no_of_new_moz_paragraphs=0, no_of_paragraphs_covered=0, total_moz_paragraphs=0;
var pixel_pagesize, pixel_page_width, chars_per_pixel_height;
var three_moz_style;
var initial_span, final_span;
if ( ! window.document.body) return;
 var original_body, original_head, doc=window.document; //=window.document.body.innerHTML;
var run=0, oddPage=oddPageLayout(), last_mozp;
var first_page_stack_limit=(oddPage ? 100 : 200);

var css_col_count, css_column_gap;
if (FireFox) {
  css_col_count="-moz-column-count";
  css_col_gap="-moz-column-gap";
 }
 else { 
  css_col_count="-webkit-column-count";
  css_col_gap="-web-column-gap";
 }	

function broadsheet(pagesize) 
{
    try 
{
  log(true); // see end of code before wrapper for logging functions, ie:  function log(str)
  cleanup();
  run++;
  timeLog(false); 
  if (pagesize && ! psize_override) 
    pagesize_limit=Math.round(pagesize);
  log("breakTheTable");
  breakTheTable();
  deposeAbsolutism();
  fixPres();
  hide_ignored_elements(true);
  var running_average_min = 40;// 30, 70
  var paragraphs = window.document.getElementsByTagName("p");
  var br_ratio=document.getElementsByTagName("br").length / paragraphs.length;
  var short_bullets=bulletsFix();
  log(" ps: #br : #p " + (br_ratio)+", p.len: "+paragraphs.length+", #brs: "+document.getElementsByTagName("br").length);
  if (paragraphs.length==0 || short_bullets || br_ratio > 0.25 ) {
	transformBRstoPs(); //                                                                                    >>>>>>>>>>>>>>>>>>>>>>>>>>>
	//if ( first_time_trial && ! psize_override) pagesize_limit=600;
	if (aggression_level < 20) aggression_level=20;
	//paragraphs=window.document.getElementsByTagName("p");
	if (br_ratio > 2) running_average_min = 20;
    }
    pixel_pagesize=window.innerHeight-60;//  60 for padding
    pixel_page_width=window.innerWidth-120; //inner text width before padding
    var mozp_width=pixel_page_width;
    chars_per_pixel_height=Math.round(pagesize_limit/pixel_pagesize);// init value only, used to compute size of images for initial trial page
    flag.moz_width_styles=addStyle(" .TpMC { width : "+mozp_width+"px !important; } .DMC { width : "+Math.round(mozp_width*2/3)+"px ! important } .SMC { width : "+Math.round(mozp_width/3)+"px ! important; } ");
    //addStyle("p { text-align: justify; }"); !!!
    addStyle("p { text-align: left; }"); //!!!
    addStyle("p { hyphens: auto;-moz-hyphens:auto; word-wrap: break-word; }"); 
    addStyle(".TMC h1,.TMC h2,.TMC h3,.TMC h4, .TMC h5,.TMC h6  { hyphens: manual;-moz-hyphens:manual; word-wrap: normal; }"); //dont break up headings
    //document.body.parentNode.lang="en";//or en-US
    //addStyle("* {-moz-hyphens:auto;}"); //-webkit-hyphens:auto;hyphens:auto;
    var horizontal_scroll=window.scrollMaxX;
    initial_span=window.document.createElement("div");   initial_span.id="MozpSpan";
    initializeStyle(true);
    window.document.body.className+=" "+timeTaken()+"s";
    original_body=window.document.body.innerHTML;
    var parent=null; //msg("-");
    //////Outer loop:
    /////////
    for (var i=0; paragraph = paragraphs[i], i < paragraphs.length; i++) {
	if ( toSkip(paragraph.parentNode, true) || isEmpty(paragraph))	    {
	    continue;
	}
	var current_primary_node = paragraph;
	var node_at_limit, plen=paragraphs.length;
	var aggression=0;
	//	if (initial_span)
	aggression=aggression_level-4;
	if ( paragraph.parentNode != parent)  {
	    stacked_size_so_far=0;
	    running_average=0;
            gathered_nodes_stack=[];
	    image_so_far=0;
	}
	parent=paragraph.parentNode;
	flag.in_a_jump=false;
	////// Main loop:
	/////////
	while(current_primary_node) {  
	  log("Current node:"+nodeCtx(current_primary_node)+ ", i="+i+".  So far: "+stacked_size_so_far+"\nrunning_average "+running_average+", limit "+pagesize_limit+" node at limit:"+nodeCtx(node_at_limit)); msg(".");
	  if (timedOut()) { current_primary_node=null; i=1/0; break;}
	  node_at_limit=stackTreeToLimit(current_primary_node, pagesize_limit); //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	  if ( ! node_at_limit && (total_moz_paragraphs > 0 || running_average > running_average_min)) {
	    current_primary_node=toJump(current_primary_node, aggression--);
	    if (current_primary_node) {
		    flag.in_a_jump=true;
		    continue;
		}
	  }
	    if ((running_average > running_average_min && stacked_size_so_far  > first_page_stack_limit)
		|| (total_moz_paragraphs > 0 && running_average > 10 && stacked_size_so_far > 100 && ! oddPage ) )  {
		divideLeaf(node_at_limit); // >>>>>>>>>>>>>>>>>>>>>>
		current_primary_node=makeNextPage(initial_span, (node_at_limit ? false : true)); //>>>>>>>>>>>>>>>
		// if ( ! initial_span)
		//     current_primary_node=null;
	    }
	    else
		current_primary_node=null;
	    if (total_moz_paragraphs == 1) last_mozp.scrollIntoView(); 
	} // end while
	///////
	/////////
	if (initial_span && no_of_new_moz_paragraphs > 0) {
	    initializeStyle(false);
	    columnWidth(initial_span.firstChild);// marks new col widths
	    checkLayoutProblems(initial_span.firstChild.firstChild)
	    if (aggression_level >= 40) {
	      	doHops();
	    }
	    final_span=initial_span;
	    initial_span=undefined;
	}// end if(initial_span...)
	images(true, true);
	// var newPs=paragraphs.length - plen - no_of_Ps_cloned;
	// i += newPs;
	i += no_of_new_moz_paragraphs;//the var paragraphs[] is not local, it gets updated behind the scenes, so need to move i.
	i += no_of_paragraphs_covered - 1; // -1 for the current one for i++
	log(" i is now: "+i+", no_of_paragraphs_covered: "+no_of_paragraphs_covered+", no_of_new_moz_paragraphs "+no_of_new_moz_paragraphs  + ".  Para len: " +paragraphs.length+".  Tot moz so far:" +total_moz_paragraphs+" "+nodeCtx(paragraph));
	if (total_moz_paragraphs==0 && i == paragraphs.length -1 )
	    transformBRstoPs(true);
	no_of_new_moz_paragraphs=0;
	no_of_paragraphs_covered=0;
	no_of_Ps_cloned=0;
    } // end for
//    addStyle("p.TMC      { max-height: " +  (pixel_pagesize + 300) + "px ! important; } \n"
    images(true, true);
    if ( horizontal_scroll==0 && window.scrollMaxX > 0) window.document.body.style.overflowX="hidden";
    if (aggression_level >= 60) { 
	mozs=window.document.getElementsByClassName("TMC");
	for (var i=0;  i < mozs.length; i++) {
	    if (mozs[i].parentNode != final_span)
		final_span.appendChild(mozs[i]);
	}
    }
    // if (final_span) final_span.firstElementChild.scrollIntoView();
    // else initial_span..firstElementChild.scrollIntoView();
    window.scrollBy(0,-150);
    hide_ignored_elements(false);
    //window.scrollTo(0,window.scrollY);
    } catch(e) {GM_log("BSheet caught exception"+e+" line(est. -357 GM code): "+(e.lineNumber-357)); }
    //GM_log("Average number of letters per page is: "+pagesize_limit+" characters per page");
    var doc_k=Math.round(window.document.body.textContent.length/1024);
    var total_time=timeLog("",true);
    var per_k=Math.round(total_time/doc_k);
    var secs=0^total_time/1000;
    // GM_log("At, "+window.document.location.host+", time used by Broadsheet, GM script, was "
    //  	   + (flag.timedOut ? "incomplete, timed out, " : "")
    // 	   +per_k+" milliseconds per kilobyte; in total: " 
    // 	   + total_time+" milliseconds");
    uwin.status = "Broadsheet "+(flag.timedOut ? "timed out ["+flag.timedOut+"sec]" : "completed ["+secs+"s]")
	+ "-- average number of letters in pages ["+total_moz_paragraphs+"] is "+pagesize_limit+" ("+per_k+" msec/k)";
    if (final_span) final_span.className=secs+"s "+per_k+"ms/k";
}

function stackTreeToLimit(start_node, limit) {   //returns a text node at limit or null
    var sibling = start_node;
    var result;
    while(sibling && ! result) {
	var nextSib = sibling.nextSibling;
	//log("Stack push["+gathered_nodes_stack.length+"]---"+nodeCtx(sibling));
	gathered_nodes_stack.push(sibling);
	if (sibling.nodeType == 3) { // 3 means a text/leaf node
	    var len=sibling.textContent.length;
	    stacked_size_so_far += len;
	    if (len > 5) {
		var lower_one=Math.min(len, running_average)
		var diff=Math.abs(running_average - len);
		if (diff < 2*lower_one)
		    running_average=lower_one + diff*.9
		else
		    running_average= diff + lower_one*.9;
		//log("len: "+len+"   avg: "+running_average+" for:"+nodeCtx(sibling));
	    }
	    if (stacked_size_so_far >= limit) 
		result=sibling; 
	}
	else { // not a leaf
	    if (sibling.nodeName=="P")
		no_of_paragraphs_covered++;
	    if (toSkip(sibling)) {
		//gathered_nodes_stack.pop();
		no_of_paragraphs_covered+=sibling.getElementsByTagName("p").length;
	    }
	    else {
		var image_equivalent=computeSizeInChars(sibling);
		image_so_far +=image_equivalent;
		stacked_size_so_far += image_equivalent;
		result=stackTreeToLimit(sibling.firstChild, limit); // <<<<<<<<>>>>>>>>>>>
	    }
	}
	sibling = nextSib;
    } 
    return result;
}

function divideLeaf(leaf_node ) {
    if (stacked_size_so_far <= pagesize_limit ||  ! leaf_node)
	return;
    var leaf = leaf_node.textContent;
    if (isEmpty(leaf_node)) {
	return; //        <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
    }
    stacked_size_so_far -= leaf.length;
    var chars_needed_to_fill_page = pagesize_limit - stacked_size_so_far -1;// -1 for 0 indexing
    var gap = leaf.indexOf(" ", chars_needed_to_fill_page - 15);// 5 is average word length
    if (gap == -1) gap=leaf.lastIndexOf(" ", chars_needed_to_fill_page - 15);// search back
    if (gap == -1) gap=leaf.length;
    gap++; // toSkip the space
    if (chars_needed_to_fill_page < 15 || gap < 15)
	gap=0;
    leaf_node.textContent=leaf.substring(0,gap);
    var left_over_string=leaf.substring(gap);
    log("Division of leaf node into, preamble["+gap+"]  | postamble["+left_over_string.length+"]: ..."+leaf.substr(gap-20,20)+ "  |  "+leaf.substr(gap,20)+"..."); 
    if (leaf_node.nextSibling && leaf_node.nextSibling.nodeType == 3) { // stuff into next one.
    	leaf_node.nextSibling.textContent = left_over_string + leaf_node.nextSibling.textContent;
    	leaf_node.nextSibling.partialGamete=left_over_string.length;
    	leaf_node.nextSibling.gamete=true;
	log("set leaf_node.ns.partialGamete "+leaf_node.nextSibling.partialGamete);
    }
    else if (left_over_string) {
      var new_leafNode= window.document.createTextNode(left_over_string);
      new_leafNode.gamete=true;//no dataset on text nodes, and get/set userdata now defunct
      leaf_node.zygote=true;//
      leaf_node.parentNode.insertBefore(new_leafNode, leaf_node.nextSibling);
      log("inserted left overs "+new_leafNode.gamete);
    }
    stacked_size_so_far += leaf_node.textContent.length;
}

function makeNextPage(moz_span, lastpage) {
    if (gathered_nodes_stack.length == 0) { stacked_size_so_far = 0; return;}
    var new_paragraph = window.document.createElement("p");
    new_paragraph.className= "TMC ";//+"Avg."+(running_average^0)+" sofa."+stacked_size_so_far;
    no_of_new_moz_paragraphs++;
    total_moz_paragraphs++;
    new_paragraph.id="Mozp"+total_moz_paragraphs+"-"+timeTaken();
    if (first_time_trial)
	checkLayoutProblems(gathered_nodes_stack[0], true); // marks node's original position.
    breakUpTree(new_paragraph); //>>>>>>>>>>>>>>>>>>>>>>>>>>
    var next_primary_node=new_paragraph.nextSibling;
    //log("New paragraph: Mozp"+total_moz_paragraphs+" "+nodeCtx(new_paragraph)+"\nNext: "+nodeCtx(next_primary_node))
    setAsMozStyle(new_paragraph); //>>>>>>>>>>>>>>>>>>>
    if ( ! lastpage)   	new_paragraph.appendChild(images());
    else images(lastpage);
    if (isEmpty(new_paragraph)) { // just with spaces or empty
	removeNode1(new_paragraph)
	no_of_new_moz_paragraphs-- ;
	total_moz_paragraphs-- ;
    }
    else { 
	var new_limit=false;
	giveColsRoom(new_paragraph.parentNode); //>>>>>>>>>>>>>>>>>>>>>>>>>
	if ( first_time_trial && ! psize_override) { // set pagesize_limit appropriate for the size of the window
	    columnWidth(new_paragraph); // marks col width
	    if (aggression_level >= 40) {
		new_paragraph.parentNode.insertBefore(moz_span, new_paragraph)
		moz_span.appendChild(new_paragraph);
	     	doHops(new_paragraph.parentNode);
	    }
	    first_time_trial=false;
	    new_limit=computeNewLimit(new_paragraph);
	    if (Math.abs( new_limit - pagesize_limit)  > 50) {
		//		next_primary_node=new_paragraph.firstChild;
		next_primary_node=null;// Repeat the node
		no_of_paragraphs_covered--;
		total_moz_paragraphs--;
		//log("REVERSE===========limit: "+new_limit+"- pagesize_limit: "+pagesize_limit+".  Next: "+nodeCtx(next_primary_node));		msg(">");
		pagesize_limit=new_limit;
		cleanup(true);
	    }
	    else 
		new_limit=false;
	} // end if first_time_trial
	if ( ! new_limit) {
	    if (moz_span) {
		if  ( ! flag.firstforspan) {
		    flag.firstforspan=true;
		    //log("insert span before new p:"+nodeCtx(new_paragraph));
		    new_paragraph.parentNode.insertBefore(moz_span, new_paragraph)
		}
		//log("To span append new_p:  "+nodeCtx(new_paragraph));
		moz_span.appendChild(new_paragraph);
	    } // end if moz_span
	    setWithinMozStyle(new_paragraph, true); //flag.in_a_jump);
	}
    }
    if ( ! lastpage && ! psize_override) pagesize_limit=computeNewLimit(new_paragraph, "update limit");
    stacked_size_so_far=0;
    if (total_moz_paragraphs) last_mozp=new_paragraph;
    return next_primary_node; // >>>>>>>>>>>>>>>>>>>>
}

function breakUpTree(container) { // put excess in the container
    gathered_nodes_stack.reverse();
    var overflow=new Object(); var primaryNode, next_primary_node=null, flagfirst=true;
    primaryNode=unravel(overflow);
    while(primaryNode) { //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
	if (overflow.the_clone) {
	    //log("Insert clone before, NEXT primary node: "+nodeCtx(primaryNode.nextSibling) );
	    primaryNode.parentNode.insertBefore(overflow.the_clone, primaryNode.nextSibling); 
	}
	if (flagfirst) {
	    flagfirst=false;
	    //log("Put "+container.id+" in place of primary: "+nodeCtx(primaryNode));
	    primaryNode.parentNode.replaceChild(container, primaryNode);
	    if (oddPage && last_mozp) {
		last_mozp.parentNode.replaceChild(container, last_mozp);
		container.parentNode.insertBefore(last_mozp, container);
	    }
	}
	//log("append to "+container.id+", primary: "+nodeCtx(primaryNode));
	if ( ! (flag.in_a_jump && primaryNode.offsetHeight >  2*innerHeight))
	    container.appendChild(primaryNode);
	else {
	    //log("Append to its parent "+container.parentNode.id);
	    container.parentNode.appendChild(primaryNode); 
	}
	primaryNode=unravel(overflow);
    }
}

function unravel(clone_holder){
    if ( ! this.clone_count ) clone_count=0;
    var node=gathered_nodes_stack.pop();
    //log("unravel: Popped node: "+node.nodeName );
    if (toSkip(node))                                   return node;
    if(node)  {
	var child=node.firstChild, nextSib, nodes_clone, childi=0;
	while (child) {
	    var childs_clone_holder=new Object(), stacked_child, nextSib;
	    nextSib = child.nextSibling;
	    if ( toSkip(child)) {
		child=nextSib;
		continue;
	    }
	    stacked_child=unravel(childs_clone_holder);//>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<
	    if (stacked_child && ! childs_clone_holder.the_clone) {
		child = nextSib;
		continue;
	    }
	    if ( ! nodes_clone) {
		nodes_clone = node.cloneNode(false);// copy just the node not its children, they're cloned on the holder.
		clone_holder.the_clone=nodes_clone; // out parameter
		clone_count++;
		if ( node.id) nodes_clone.id = node.id;
		nodes_clone.className += " TMCs-clone"+clone_count;
		node.className += " TMC-hasclone"+clone_count;
		//log("Cloning self: "+nodeCtx(node));
		if (/P/.test(node.tagName)) {
		    nodes_clone.style.textIndent=""
		    // if ( /^Moz/.test(nodes_clone.className) )
		    // 	no_of_Ps_cloned++;
		}
	    }
	    if ( ! stacked_child) {
		nodes_clone.appendChild(child);
	    	child.name="TMCs-grafted"+clone_count;//may be text node, no dataset
		//log("Move node to clone, was not stacked: "+nodeCtx(child));
	    }
	    else if(childs_clone_holder.the_clone) {
		nodes_clone.appendChild(childs_clone_holder.the_clone);
		//log("Attach child's clone to own, was stacked: "+nodeCtx(child));
	    }
	    child=nextSib;
	}
    } // end if(node)
    return node;
}

function images(lastpage, check_lastpage) { // manages the img element
    var img=this.image;
    if (lastpage) {
	if (check_lastpage)
	    if (img && img.parentNode) 
		img.parentNode.removeChild(img);
	this.image=null;
    }
    else {
	img=window.document.createElement("img");
	with (img) {
	    setAttribute("src", "data:image/gif;base64,R0lGODlhEQARAIABAP0AAP///yH5BAEAAAEALAAAAQAQAA0AAAIhjI+pawDp3olyOhtRbhtLCm2gJnbkFYwhqp5ehb0KyjkFADs=");
	    className = "TMCa";
	    style.border="none";
	    style.display="inline-block";
	    style.zIndex=9999;
	    //style.paddingTop="70px";
	    //style.paddingLeft="70px";
	    style.cssFloat="right";
	}
	this.image=img;
	return img;
    }
}


function cleanup(internal) {
    timeLog(false);
    removePuncs();
    if (run == 0) return;
    if ( ! internal ) { 
	//window.document.window.documentElement.innerHTML=original_html; //FF bug
	//window.document.write(original_html); // Loses the location
	flag={};
	flag.fieldInFocus=0;
    } else {
	flag.donetransformBRstoPs=false;
    }
//	window.document.body.previousSibling.innerHTML=original_head;
    window.document.body.innerHTML=original_body;
//    document.getElementsByTagName("head")[0].innerHTML=original_head;
     var nos=document.getElementsByTagName("noscript")
    if (nos.length) {
	with (window.document.body) { 
	    var script = document.createElement("script");
	    script.textContent = "yyscript=true;" ;
	    appendChild(script)
	    removeChild(script);
	}
	var yehscript=unsafeWindow.yyscript;
	if ( ! yehscript) 
	    while(nos.length) { //for(var i=0; i < nos.length; i++)
		var a_plain_p=window.document.createElement("p"), nos0=nos[0];
    		swapInElement(nos0, a_plain_p); //nos[i].style.setProperty("display", "none", "important");
		a_plain_p.innerHTML=nos0.textContent;
		a_plain_p.id="TMCnspp"
	    }
    }
    no_of_new_moz_paragraphs=0;
    total_moz_paragraphs=0;
    no_of_paragraphs_covered=0;
    gathered_nodes_stack = [];
    running_average=0;
    return;

if (null) null;   else {
	var paragraphs = window.document.getElementsByClassName("TMC");
	while(paragraphs.length) {
	    var paragraph=paragraphs[paragraphs.length-1];
 	    var arrows = paragraph.getElementsByClassName("TMCa");
 	    if (arrows.length) paragraph.removeChild(arrows[0])
	    removeNode1(paragraph); // remove collimated paragraph
	}
	if (typeof clone_count != "undefined")
	    while(clone_count) {
		var clone = window.document.getElementsByClassName("TMCs-clone"+clone_count)[0];
		var original_node = window.document.getElementsByClassName("TMC-hasclone"+clone_count)[0];
		original_node.className = strcutOut(original_node.className, " TMC-hasclone"+clone_count);
		if ( ! clone ) { clone_count--; continue; }
		conjugateNodes(clone, original_node);
		original_node.setAttribute("name", "");
		clone_count--;
	    }
	var span=window.document.getElementById("MozpSpan");
	if (span) removeNode1(span);
    }
}

function removeNode1(node) { // & place all children with grandparent.
    var childNodes = node.childNodes; 
    var nparent=node.parentNode;
    var marker=node.lastChild;
    if (marker)  {
     	nparent.insertBefore(marker, node)
    }
    nparent.removeChild(node);
    while(childNodes.length) {
	nparent.insertBefore(childNodes[0], marker);
    }
    return node;
}

function conjugateNodes(clone, original) {
    // Rejoin clone & original, and remove clone.
    var clones_children = clone.childNodes; 
    while(clones_children.length) {
	var child=clones_children[0];
	log("rejoin "+child.gamete);
	if (child.nodeType == 3 && child.gamete) {
	    var gamete=child;
	    var zygote = original.lastChild;
	    var len=gamete.partialGamete;
	    if (len) {
		zygote.textContent += gamete.textContent.substr( 0, len);
		gamete.textContent = gamete.textContent.substr(len);
		original.appendChild(gamete); // was grafted
	    }
	    else {
		zygote.textContent +=  gamete.textContent;
		clone.removeChild(gamete);
	    }
	}
	else // not a leaf or not a gamete
	    original.appendChild(child);
    }
    clone.parentNode.removeChild(clone); // ! do first
}

function restoreStyles() {
    var all_nodes=window.document.getElementsByTagName("*");
    for (var i=0; i<all_nodes.length; i++) {
	var snode=all_nodes[i];
	if (snode.style && snode.style.width == "99.987%") 
	    snode.style.setProperty("width","", "important");
	//log("Check all nodes, at class,  "+(snode.className?snode.className:null)+" style.width is "+(snode.style?snode.style.width:null))
	var cssText=snode.dataset.OriginalStyle;
	if (cssText) {
	    if (cssText=="0")
		snode.style.cssText="";
	    else
		snode.style.cssText=cssText;
	}
    }
}

function setAsMozStyle(paragraph) { // set style for either parameter not both.
    var base_style=  "";
    var style3=base_style+css_col_count+": "+config.ncols+";"
    var style2=base_style+css_col_count+": 2;"
    var style1=base_style+css_col_count+": 1;"
    var actual_style, ratio;

    ratio = pagesize_limit/stacked_size_so_far;
    ratio=Math.floor(ratio*2);
    paragraph.className+=" ratio"+pagesize_limit+"-"+stacked_size_so_far;
    if (ratio > 6) ratio = 7;
    if (ratio > 8) ratio = 8;
    if (ratio < 2) ratio =2; // Number between 2 and 6.
    //log("Set style of new paragraph, limit:stacked_size_so_far "+pagesize_limit +":"+ stacked_size_so_far+ "[p.len:"+paragraph.textContent.length+"] = "+ratio+":2")
    switch (ratio)	{
    case 2: actual_style=style3; paragraph.className += " TpMC"; break;
    case 3: actual_style=style3; paragraph.className += " TpMC"; break;
    case 4: actual_style=style3; paragraph.className += " TpMC"; break;
    case 5: actual_style=style3; paragraph.className += " TpMC"; break;
    case 6:  actual_style=style3; paragraph.className += " TpMC"; break;
    case 7:  actual_style=style2; paragraph.className += " DMC"; break;
    case 8:  actual_style=style1; paragraph.className += " SMC"; break;
    }
    //actual_style += "display : inline;";    //"display: inline;";//"display: block;"; //
    paragraph.setAttribute("style", actual_style);
    //paragraph.align="justify";!!!
}
function setWithinMozStyle(outer_node, divs, tds) { // set style for either parameter not both.
    setChildsWidth(outer_node.getElementsByTagName("img"),  1);
    setChildsWidth(outer_node.getElementsByTagName("embed"), 1);
    setChildsWidth(outer_node.getElementsByTagName("object"), 1);
    setChildsWidth(outer_node.getElementsByTagName("iframe"), 1);
    setChildsWidth(outer_node.getElementsByTagName("blockquote"), 5);
    setChildsWidth(outer_node.getElementsByTagName("pre"), 3);
    if (tds) { 
	setChildsWidth(outer_node.getElementsByTagName("td"), 2);
	setChildsWidth(outer_node.getElementsByTagName("tr"), 2); 
	setChildsWidth(outer_node.getElementsByTagName("tbody"), 2);
    }
    if (divs) {
	setChildsWidth(outer_node.getElementsByTagName("div"), 4);
	setChildsWidth(outer_node.getElementsByTagName("span"), 4);
	setChildsWidth(outer_node.getElementsByTagName("table"), 4);
    }
    function setChildsWidth(childage, type) { // so they fit and stay within moz columns, should be automatic!
	for (var i=0; i  <  childage.length; i++ )  {
	    var child_node=childage[i];
	    var s=child_node.style;
	    if (type==5) { // blockquote
		s.paddingLeft="1.5em"; s.paddingRight="1.5em";    
		if (s.marginLeft >= 0) s.marginLeft=0; 
		s.marginRight=0;
		//s.display="inline-block";
		continue;
	    }
	    if (type==2) {
		var a_plain_p=window.document.createElement("div"); // was a p
		a_plain_p.id="TMCdiv"
		swapInElement(child_node, a_plain_p);
		i--;// 
		continue;
	    }
	    if (type==3) {
		child_node.style.overflow="auto";
		child_node.style.fontSize="80%";
		child_node.style.display="inline-block";
		child_node.style.margin="0";
		continue;
	    }
	    s.zIndex="inherit"; // For an abs positioned element, mozp has own zindex.
	    s.cssFloat="none";
	    if (divs) {
		// if (child_node.offsetWidth > columnWidth() && type==1)	{
		// 	var h=child_node.offsetHeight, w=child_node.offsetWidth, cw=columnWidth() ;
		// 	var dims=calcNewImageSize(h, w);
		// 	s.height=dims[0]+"px";
		// 	s.width=dims[1]+"px";
		// }
		s.position="static";
		s.marginLeft="0";
		s.marginRight="0";
		//	var computed_style=window.document.defaultView.getComputedStyle(child_node, null);
		if (s.display[0]!="b")
		    s.display="inline"
		if ( type==1 )
		    s.display="inline-block"
		//  }
		//s.cssFloat="none";
	    }
	    if (type==1) {
		var w=s.width, h=child_node.offsetHeight;
		if( ( (w && w > 35) || ! w) && h && type==1) {
		    var cw=flag.column_width;
		    if (cw) {
			w=child_node.offsetWidth;
			var dims=calcNewImageSize(h, w);
			if (dims) {
			    s.maxHeight=dims[0]+"px";
			    s.maxWidth=dims[1]+"px";
			}
		    }
		    else  {
			s.maxHeight="85%";
			s.maxWidth="85%";
		    }
		    style_was_set=true;
		}  // end if w &&...
	    } // end if type
 	}
    }
}

function giveColsRoom(narrow_node, reverse, onelevel, uptoNode) {
    var tmp=narrow_node;
    if ( ! narrow_node.style) return; // a text, script or comment node
//    getBackground(narrow_node);
    if ( narrow_node != flag.prev_node || reverse || onelevel) 
    {
	getBackground(narrow_node);
	flag.prev_node=narrow_node;
	var ancestor_levels=-2,  counter=narrow_node, level=0;
	while(counter=counter.parentNode)
	    ancestor_levels++;
	if (reverse && flag.blocked)  reverse=flag.blocked=false; // toggles
	while((narrow_node && narrow_node.tagName != "BODY") 
	      && (narrow_node.style.width != "99.987%" && ! reverse) ) {
	    iterations++;
	    level++;
	    if ( ! flag.blocked) {
		if (reverse) 
		    narrow_node.style.width="";
		else {
		    var padding=0
		    if (level/ancestor_levels > 0.75)
			padding=Math.round(  (( level/ancestor_levels - 0.75)  * 4 )  * 5 );
     		    narrow_node.setAttribute("style", narrow_node.style.cssText+"width: 99.987% ! important; " 
					     +"padding-left: "+padding+"px ! important; "
					     +"padding-right: "+padding+"px ! important; "
					     + "margin-right: 0 ! important; margin-left: 0 ! important; left: 0 ! important;");
		    //narrow_node.setAttribute("MozpStyle",total_moz_paragraphs+"NN"+flag.prev_node.nodeName+"ID"+flag.prev_node.id+"RUN"+run)
		    if (narrow_node.align) 
			narrow_node.align="";
		    var lmargin=window.document.defaultView.getComputedStyle(narrow_node, null).marginLeft;
		    if ( lmargin > 0)
			narrow_node.style.marginLeft= "1%";
		    if (onelevel)
			narrow_node.style.overflow="visible";
		}
		//log(" set width on "+nodeCtx(narrow_node)+" cssText: "+narrow_node.style.cssText+" " +narrow_node.style.width)
	    }
	    narrow_node=narrow_node.parentNode;
	    if (onelevel) break;
	} // end while
	if (reverse) {
	    flag.blocked=true;
	}
    } // end if ! = prev
}

function initializeStyle(init) {
    if (init) {
	with(window.document.body.style) {
     	    setProperty("width", (pixel_page_width+40)+"px", "important");
	    setProperty("margin-right", "0","important")
	    setProperty("padding-left", "25px", "important; ")
	    setProperty("padding-right", "25px", "important; ")
	    setProperty("margin-left", "0", "important")
	    setProperty("left", "0", "important;");
	}
	with (initial_span) {
	    style.clear="both";
 	    style.borderTop="10px solid #aaaaaa";
	    style.overflow="visible";  
	}
	var width=pixel_page_width;//Math.round(pixel_page_width*.85);
	three_moz_style=addStyle(".TMC { background-color: inherit;z-index:5; background-repeat: repeat-y; } ");//Three Moz Column TMC
//	three_moz_style=addStyle(".TMC { background-color: -moz-field;z-index:5;} ");
	addStyle("   .TMC      { "
//		 +"max-height: "+(pixel_pagesize + 300)+"px ! important;"
		 +"overflow: visible;"
		 + css_col_gap+": "+config.colgap+";" // see columnWidth()
//		 +"-moz-column-width: "+columnWidth()+"px"
		 + "padding: 25px 20px 35px 20px ! important;" // see pixel width etc., top, right, bottom, left.
		 + "margin-top: 1px;  margin-bottom: 0; margin-left: 0; "
		 + "border-top: 1px solid #aaaaaa;" 
		 + "border-right: 3px dotted #aaaaaa;" 
		 + "border-bottom: 5px double #aaaaaa ! important;"
		 + "display: inline-block; " //position: relative; left: 10px ! important"
		 + "}" ) ;
	addStyle("p.TMC      {  } \n"
		 +"body p.TMC * { "
		 +"max-width: "+columnWidth()+ "px ! important; "
		 +"margin-left: 0px ! important;"
		 +"padding-left: 2px ! important;"
		 +"padding-right: 8px ! important;"
		 +"float: none ! important;"
//		 +"display: inline-block ! important;"
		 +"} "   );
    }
    else  { // span finished
	setBackground(initial_span); // if a background image found it'll set background color on span and moz p's
	with (initial_span) {
	    style.zIndex=9999;
	    style.display="inline-block";
	    if (aggression_level > 0) {
		if ( background.color)
		    three_moz_style.textContent =".TMC  { background-color: " +background.color+ " ! important; z-index: 10; }" //max-width: " + (pixel_page_width -70) +";} "
	    }
	    if (aggression_level >= 60) { 
		var pnode=initial_span;
		while(pnode.nodeName != "BODY") { 
		    pnode.style.position="static"
		    pnode=pnode.parentNode;
		}
		style.cssFloat="left";
 	     	style.position="absolute";
		style.left=0;
		style.top=0;
		style.marginTop=-10;
 		style.borderTop="65px solid #aaaaaa";
 		style.width=(pixel_page_width+90)+"px";
 		style.backgroundColor=background.color;
	    }
	    firstChild.style.borderTop="";
	    firstChild.style.marginTop=0;
	}
	addStyle("p.TMC      {  } \n"
		 +"body p.TMC * { "
		 +"max-width: "+columnWidth()+ "px ! important; "
		 +"margin-left: 0px ! important;"
		 +"padding-left: 2px ! important;"
		 +"padding-right: 8px ! important;"
		 +"float: none ! important"
		 +"} "   );
	
    } // end else
}

function checkLayoutProblems(first_element_in_Moz, mark_original_position) { // 1st call to this saves location, 2nd compares new location of the element.
    var moz_paragraph=first_element_in_Moz.parentNode, the_span=moz_paragraph.parentNode;
    function innerCheck(mark) {
 	var top=0, left=0, width=0;
	var node=first_element_in_Moz;
	while (node)   {
	    top+=node.offsetTop;
	    left+=node.offsetLeft;
	    node=node.offsetParent;
	}
	if (mark) {
	    flag.top=top;
	    flag.left=left;
	    flag.width=parseInt(window.document.defaultView.getComputedStyle(moz_paragraph, null).width);
	} else {
	    width=parseInt(window.document.defaultView.getComputedStyle(moz_paragraph, null).width);
	    var topshift = top - flag.top;
	    var leftshift=  left - flag.left;
	    var widthshift = width - flag.width;
	    //log("Layout distances, top moved by:"+topshift+",  left moved by: "+ leftshift+" Width changed by: "+widthshift+".  Tot Window height is: "+pixel_pagesize+"px.  On element: "+nodeCtx(first_element_in_Moz))
	    if ( topshift > pixel_pagesize || leftshift > pixel_pagesize/2)  //	top - window.pageYOffset, scrolled position. 
		return true;
	    if (widthshift < -20 && topshift > pixel_pagesize/2)
		return true;
	}
    } // end sub-function check()
    if (mark_original_position)
	innerCheck(true);
    else {
	//
	// Main function
	//
	if (innerCheck()) { 
	    //log("Problematical!");
	    //innerCheck(true);
	    the_span.parentNode.style.position="relative";
// 	    the_span.style.position="absolute";
 	    the_span.style.position="relative";
 	    the_span.style.left=0;
 	    the_span.style.top=200;
	    // Alll nodes that are neither ancestors of nor descendents of Moz column:
		//   For all a's on a page: /html/body//a
	    var xPathMess="/html/body//*[ not(ancestor-or-self::*[@id[contains(.,'Mozp')]])"
                               + " and not(descendant-or-self::*[@id[contains(.,'Mozp')]])]"
	    var boxen=window.document.evaluate(xPathMess,window.document,null,6,null);
	    var len=boxen.snapshotLength;
	    for(var i=0; boxi=boxen.snapshotItem(i), i < len;  i++ ) {
		boxi.style.zIndex=-1
	    }
	    // var xPathMess="/html/body//*[ (ancestor::*[@id[contains(.,'Mozp')]])"
            //     + " | (descendant::*[@id[contains(.,'Mozp')]])]"
	    // boxen=window.document.evaluate(xPathMess,window.document,null,6,null);
	    // len=boxen.snapshotLength;
	    // for(var i=0; boxi=boxen.snapshotItem(i), i < len;  i++ ) {
	    //log("Descend or Ancend of class TMC: " +nodeCtx(boxi));
	    // }
	    var paragraphs = window.document.getElementsByClassName("TMC");
	    var zI=paragraphs.length+20;
	    for (var p=0;p< paragraphs.length;i++) {
		if (paragraphs[p].style) {
		    paragraphs[p].style.zIndex=zI--;
		}
	    }
	    the_span.style.zIndex=9999;
	    // if ( ! background.color) background.color="#aaaaaa";
	    // three_moz_style.textContent =".TMC  { background-color: " +background.color+ " ! important;max-width: " + (pixel_page_width -70) +";} "
	    the_span.style.backgroundColor=background.color
	    var bc=window.document.defaultView.getComputedStyle(moz_paragraph, null).backgroundColor;
	    if (bc == "transparent") {
		the_span.parentNode.style.position="static";
 		the_span.style.position="static";
	    }
	    //log("  set background to "+background.color+" & got back: "+window.document.defaultView.getComputedStyle(moz_paragraph, null).backgroundColor);
	    columnWidth(moz_paragraph);      // marks new width
	    if (innerCheck()) {
		//log("Still problematical");
		giveColsRoom(moz_paragraph.parentNode, true); // reverses width settings, narrows parents width;
		three_moz_style.textContent="";// clears width
		three_moz_style.textContent += ".TMC { float: left ! important; }";
		// if ( ! background.color) background.color="#aaaaaa";
		// three_moz_style.textContent +=".TMC  { z-index: 19  ! important; background-color: " +background.color+ " ! important;} "
		//log("Set bg, "+background.color+" got back :"+window.document.defaultView.getComputedStyle(moz_paragraph, null).backgroundColor);
		columnWidth(moz_paragraph);      // marks new width
	    }
	}
    }
}

function setBackground(node) { 
    var s=node.style;
    if (background.image) {
	//s.backgroundColor=background.color;
	s.setProperty("background-color", background.color, "important");
	three_moz_style.textContent=".TMC  { z-index: 18 !important; background-color: " +background.color+ " ! important; max-width: " + (pixel_page_width -70) +";} "
    }
}

function getBackground(node) {
//    while( ! flag.gotit && node.nodeName != "HTML") {
    var gotit;
    background.color=null;
    while(  ! gotit && node.nodeName != "HTML") {
	var computed=window.document.defaultView.getComputedStyle(node, null);
	var bc=computed.backgroundColor;
	if ( bc != "transparent") {
	    background.color=bc;
	    gotit=true;
	}
	var bi=computed.backgroundImage;
	if ( bi && bi != "none") {
	    gotit=true;
	    node.style.backgroundRepeat="repeat-y";
	    background.image=bi;
	    // if ( ! background.color )
	    if (background.color && lightness(background.color) < 383)
		background.color="GhostWhite";
	    else if ( ! bc) 
		background.color=null;
	} // if bi
	node=node.parentNode;
    }
}

function lightness(color) {
    color=color.match(/\d+/g);
    if (color) return Number(color[0])+Number(color[1])+Number(color[2])
}

function addStyle(css_text) {
    var head, style;
    head = window.document.getElementsByTagName("head")[0];
    style = window.document.createElement("style");
    style.id="MozCol";
    style.textContent = css_text;
    head.appendChild(style);
    return style;
}

function removeStyle(style_node) {
    style_node.parentNode.removeChild(style_node);
}

function toSkip(element, check_ancestors_too, level) {
    if ( ! element) return false;
    if ( ! level) level=0;
    level++;
    var capital=element.nodeName[0], result, tab;
    if (/[TSFIL]/.test(capital))
	result= /^(TABLE|SCRIPT|FRAME|INPUT|SELECT|TEXTAREA|LABEL)$/.test(element.nodeName)
    if (result && element.nodeName=="TABLE")
	if (element.textContent.length/element.rows.length  > pagesize_limit/60)
	    result=false;//ie, don't skip.   Not a sparse table.
    // if ( ! result ) { try {
    // 	var compt=window.document.defaultView.getComputedStyle(element, null);
    // 	result= /none/.test(compt.display); }catch(e){}
    // }
    if ( result || ! check_ancestors_too) 
	return result;
    if (check_ancestors_too && /^Mozp/.test(element.id) ) return true;
    return toSkip(element.parentNode, check_ancestors_too, level);
}

function strcutOut(str, tocutout) {
    var n=str.indexOf(tocutout);
    if (n != -1)
	return str.substring(0,n) + str.substring(n+tocutout.length); 
    return str;
}

function columnWidth(moz_paragraph) { // a get/set function, used to restrict images to col width (should be automatic in -moz-column)
    if (moz_paragraph) {
	var ncols=moz_paragraph.style.MozColumnCount;
	flag.column_width=parseInt(window.document.defaultView.getComputedStyle(moz_paragraph, null).width);
	var column_gaps = (ncols-1) * parseInt(config.colgap) + 12; // -moz-column_gap: 20px
	flag.column_width=Math.round( ( flag.column_width - column_gaps) / ncols );
    }
    else // read
      if (flag.column_width == undefined)
	    flag.column_width=parseInt( (window.innerWidth - ( ( config.ncols - 1 ) * parseInt(config.colgap) ) - 100 ) / config.ncols );
    return flag.column_width;
}

function computeSizeInChars(node) {
    var pixelheight=0, pixelwidth=0;
    switch(node.nodeName) {
    case "EMBED":
	//pixelheight=parseInt(window.document.defaultView.getComputedStyle(node, null).height)
    case "IMG": 
	pixelheight=node.height;
	pixelwidth=node.width;
	var new_dims=calcNewImageSize(pixelheight, pixelwidth);
	if (new_dims) {
	    pixelheight=new_dims[0];
	    pixelwidth=new_dims[1];
	    // node.height=pixelheight;
	    // node.width=pixelwidth;
	}
	break;
    default:
	return 0;
    }
    if (pixelheight > 35) {
	var result= (pixelheight*chars_per_pixel_height -76)/3;
	if (pixelwidth > columnWidth()) {
	    var dim_factor=columnWidth()/pixelwidth;
	    result *= dim_factor;
	}
    }
    else
	result=4;
    //log("computeSize, object height: "+pixelheight+"px, chars_per_pixel_height: "+chars_per_pixel_height+ " fact: "+factor+", result a X b X fact:"+result+", class: "+node.className);
    return Math.round(result);
}

function computeNewLimit(mozP, update_limit) {
    if ( ! update_limit) { // initial estimate
	var p_height=parseInt(window.document.defaultView.getComputedStyle(mozP, null).height)
	chars_per_pixel_height=stacked_size_so_far/ (p_height);
	var limit=chars_per_pixel_height*pixel_pagesize;
	var ncols=mozP.style.MozColumnCount;
	if (ncols < config.ncols)
	    limit *= config.ncols/ncols;
	else {
	    var elem_on_page=mozP.lastElementChild;
	    while( elem_on_page.offsetLeft == 0 && elem_on_page.className != "TMCa")
		elem_on_page=elem_on_page.previousElementSibling
	    limit*=mozP.offsetWidth/(elem_on_page.offsetLeft + elem_on_page.offsetWidth)
	}
	//log("chars on page: "+stacked_size_so_far+"/New_p height "+p_height+ "px, *winsize "+ pixel_pagesize+"px, gives new limit:"+limit+ " ncols: "+ncols +"\n\n"+nodeCtx(mozP));
	return Math.round(limit * 0.7) ; //.7 err on small side
    }
    else {
	if ( !  (  total_moz_paragraphs <= 2 || total_moz_paragraphs % 4 == 0 ) ) return pagesize_limit; 
	var newlimit=pagesize_limit, p_height=parseInt(window.document.defaultView.getComputedStyle(mozP, null).height);
	// if (p_height > pixel_pagesize + 20) newlimit -= newlimit/10;
	// if (p_height < pixel_pagesize - 20) newlimit += newlimit/10;
	var parity=pixel_pagesize/p_height;
	if (parity > 1.05 || parity < 0.95) { 
	    newlimit=pagesize_limit*parity;
	    chars_per_pixel_height*=parity;
	}

	return newlimit^0;
    }
}

function toJump(enode, aggro_level) {
    //log("\r\r\rAttempt jump from "+nodeCtx(enode)+ ", agro level: "+aggro_level );
    aggro_level = Math.floor( (aggro_level-1)/10 + 1)
    var parent=enode.parentNode;
    var skip;
    var result;
    if (aggro_level > 0) {
	function find_new_start() {
	    while( enode &&  (enode.nodeType ==3 || enode.nodeType == 8 || skip || ! enode.firstChild )) { 
		if ( ! skip)   {
		    gathered_nodes_stack.push(enode); // if no result, stack is deleted anyhow.
		}
		if (enode.nodeName == "P")  // an empty one
		    no_of_paragraphs_covered++
		enode=enode.nextSibling
		skip=toSkip(enode);
	    }
	    if  (enode) {
		result=enode
	    }
	}//end function
	while( ! result && aggro_level-- > 0 && parent) {
	    enode=parent.nextSibling;
	    //log("\r\rAggro_level "+aggro_level+ ", parent's nextsib, Enode is : "+nodeCtx(enode));
	    parent=parent.parentNode;
	    skip=toSkip(enode);
	    if ( parent.nodeName== "BODY") break;
	    find_new_start();
	}
    } // if no child and no nextsib, go up & repeat.
    //log("Jump result: "+nodeCtx(result));
    return result;
}

function doHops(parent) {
    if( flag.hops_done ) return;
    else flag.hops_done=true;
    var child_to_swallow = initial_span.previousSibling;
    var mozp = initial_span.firstChild;
    hopOver(-1); 
    if ( ! parent) parent=initial_span.parentNode;
    var aggro_for_levels=Math.floor((aggression_level-40)/5)+1;

    while (parent.tagName != "BODY" && aggro_for_levels-- > 0) {
	child_to_swallow=parent.previousSibling;
	var no_of_siblings_to_swallow = -1 ; //all of them before it.
	if (aggro_for_levels==0)
	    no_of_siblings_to_swallow=aggression_level%5+1;
	if ( ! hopOver(no_of_siblings_to_swallow))  // x2, cos of the (empty) text nodes in between.
	{
	    parent=parent.parentNode;
	    //log("Hop levels to uncles: "+aggro_for_levels+nodeCtx(parent));
	    //giveColsRoom(parent, null, true)
	}
    }
    function hopOver(siblings_to_swallow) {
	while(child_to_swallow && siblings_to_swallow-- ) {
	    //log("No of sibs to swallow: "+siblings_to_swallow+", to swallow"+nodeCtx(child_to_swallow));
	    var prevsib=child_to_swallow.previousSibling;
	    setSuperNodes(child_to_swallow)
	    if ( ! child_to_swallow.offsetHeight || child_to_swallow.offsetHeight < mozp.offsetHeight + innerHeight/2) {
		mozp.insertBefore(child_to_swallow, mozp.firstChild);
	    }
	    else
		initial_span.parentNode.appendChild(child_to_swallow);// move past it.
	    child_to_swallow=prevsib;
	}
	return child_to_swallow;
    }
    setWithinMozStyle(mozp, true);
}

function setSuperNodes(child_to_swallow) {
    //giveColsRoom(child_to_swallow, null, true) // only onelevel
    if (child_to_swallow.style) {
	child_to_swallow.style.zIndex=0;//=0;
	child_to_swallow.style.width="98.987%";//columnWidth()+"px";
	child_to_swallow.setAttribute("swallied",true);// debug
    }
    if (child_to_swallow.nodeName.charAt(0) == "H") {
  	child_to_swallow.align="left";
 	//child_to_swallow.style.display="inline";
 	//child_to_swallow.style.cssFloat="left";
    }
    if (child_to_swallow.getElementsByTagName) {
	var granchilders=child_to_swallow.getElementsByTagName("*");
	for (var i=0;i< granchilders.length;i++) {
	    // if (granchilders[i].style) {
	    // 	//granchilders[i].style.display="table"
	    // 	if (granchilders[i].style.display  != "none" && granchilders[i].nodeName  != "SCRIPT")
	    // 	    granchilders[i].style.display="inline"
	    // 	//granchilders[i].style.maxHeight=columnWidth()+"px";
	    // }
	    if (granchilders[i].nodeName) {
		if (granchilders[i].nodeName.charAt(0) == "H") {
		    granchilders[i].align="left";
		    granchilders[i].style.width="98.987%";//columnWidth()+"px";

		    //granchilders[i].style.display="inline";
		    //granchilders[i].style.cssFloat="left";
		}
		else if (granchilders[i].nodeName == "INPUT") {
		    granchilders[i].style.display="inline";
		    //granchilders[i].style.cssFloat="left";
		    granchilders[i].style.position="relative";
		    granchilders[i].style.zIndex=0;
		}
	    }
	}
    }
}

function transformBRstoPs(after) { //Put all siblings following a <BR> into its replacement <P>
    if (flag.donetransformBRstoPs) return;
    flag.donetransformBRstoPs=true;
    brs = window.document.getElementsByTagName("br");
    var br, i=0, j=0;
    while(brs.length > i) {
	br=brs[i];
	j++;
	var prev=br.previousSibling;
	var next=br.nextSibling;
	if ( ( ! prev || (prev && isEmpty(prev, "isSmall")))
	     && ( ! next || (next && isEmpty(next, "isSmall") ) )  ) {
	    i++;
	    continue;
	}
	var new_p=null, tmp;
	while(prev && ! /^(P|BR)$/.test(prev.nodeName)) {
	    tmp=prev.previousSibling;
	    if ( ! new_p)
		new_p = window.document.createElement("p");
	    new_p.insertBefore(convertForP(prev), new_p.firstChild);
	    prev=tmp;
	}
	if (new_p) {
	    br.parentNode.insertBefore(new_p, br);
	    new_p.className="MozbBR"
	}
	while(next && next.nodeName=="BR") {
	    tmp=next.nextSibling;
	    br.parentNode.removeChild(next)
	    next=tmp;
	}
	new_p = window.document.createElement("p");
	new_p.className="MozBR";
	next=br.nextSibling;
	while(next && next.nodeName != "BR") {
	    tmp =next.nextSibling;
	    new_p.appendChild(convertForP(next));
	    next=tmp;
	}
	br.parentNode.insertBefore(new_p, br);
	br.parentNode.removeChild(br);
    }
    // if ( j ) 
    // 	addStyle(".MozbBR, .MozBR { max-width: "+columnWidth()+"px; } ");
}

function convertForP(elem) {
    if (/DIV/.test(elem.tagName)) {
	var span=document.createElement("span");
	swapInElement(elem, span);
	return span;
    }
    return elem;
}

function isEmpty(node, isSmall) {
    var text=node.textContent;
    return  /(^\s*$)/.test(text) // just whitespace or empty
}

function oddPageLayout() {  try { return /(nytimes|usatoday)\.com$/.test(location.host) } catch(e){} }

function bulletsFix() {
//    var spans = window.document.evaluate("//span[@class='entry-content']",window.document,null,6,null);
    var spans = window.document.getElementsByClassName("entry-content"); // Twitter spans
    var new_BR, i=0, length=spans.length;
    while( i < length) {
	var span=spans[i];
	if (span.nodeName=="SPAN") {
	    new_BR = window.document.createElement("br");
	    span.insertBefore(new_BR, span.firstChild);
	    span.style.fontSize="1em";
	    i++;
	}
	else {
	    length=0;
	    break;
	}
    }
    return length;
}

function checkCtrlC() {
    //Check if text selected so ctrl-c doesn't interfere, for textareas (firefox shortcoming)
    // if (this.doneIt) return;
    // this.doneIt=true;
    var inputs=window.document.getElementsByTagName("input")
    var tareas=window.document.getElementsByTagName("textarea")
    try { var n=flag.fieldInFocus.selectionEnd; } catch(e) { this.stale=true; flag.fieldInFocus=0;}
    if (this.inputs_len == inputs.length && this.tareas_len == tareas.length && ! this.stale)
	return;
    this.stale=false;
    this.inputs_len=inputs.length;
    this.tareas_len=tareas.length;
    var i=0,j=0;
    while(i < tareas.length) {
	var tarea=tareas[i];
	i++;
	try {
	    if ( tarea.selectionEnd && tarea.selectionEnd != tarea.selectionStart)
		flag.fieldInFocus=tarea;
	}
	catch(e){}
	// tarea.addEventListener("focus", function (e) { 
	//     flag.fieldInFocus=this;
 	// }, false);
    }	
    while(j < inputs.length) {
	var input=inputs[j];
	j++;
	try {
	    if ( input.selectionEnd && input.selectionEnd != input.selectionStart)
		flag.fieldInFocus=input;
	}
	catch(e){}
	// input.addEventListener("focus", function (e) { 
	//     flag.fieldInFocus=this;
	// }, false);	
    }
}
//
//Mainline...
//

if (window.parent != window)
    return; // an iframe;

GM_registerMenuCommand( "========Broadsheet, a Multicolumn Pageviewer======", function(){});

//GM_registerMenuCommand( "Show Menu for Broadsheet", function(){ registerMenu(); })
registerMenu();

function registerMenu() {
GM_registerMenuCommand("Invoke columnizer with control-"+hotkeyChar+". To change page size:  [alt-]ctrl-"+hotkeyChar, 
		       function () {    broadsheet();
				   },"","","B")
GM_registerMenuCommand("Broadsheet Preferences...", 
		       function () {    GM_config.open();   })
GM_registerMenuCommand( "__________________________ ",function(){});

}//registerMenu()

function initConfig() {
  GM_config.init({ id: 'GM_config', title:'Broadsheet Preferences', 
	fields: {
         pagesize:    { label: 'Average Page Size:', type: 'int', cols:6, default: 1800, title: "The number of letters per broadsheet page is usually calculated based on"
	    +" the window size, to override this set it here.  Default value is 1800." }
	,hotkey:    { label: 'Hotkey:', type: 'text', default: 'c', title:"Enter a single letter for the shortcut key.\n\nWith control key + shortcut, this invokes column making, "
	     +"If the page size has not been set by the user it increases the page size by 20% \n\n"
	     +"With, alt key + control key + shortcut, it decreases it by 20%\n\n" }
	,aggressivity:  { type: 'int', label: "<pre style='display: inline;'>Aggressivity: Enter a number for the levels to aggress upon the amount of text\n"
	     +"surroundings (images, embedded videos, etc.), to be included in columns:\nIt operates in steps of 5, and modulo 5.\n"
	     +"The plus sign(+) means that setting it higher than the number will increase\nthe amount relevant for that level.\n"
	     +"As with any of the GM script settings here, for it to work in other tabs reload\nthat tab after setting it on this tab\n"
	     +"Level   1:\tHave columns appear above other elements.\n"
	     +"Levels 5+:\tInclude more of the text that follows the columns into a single block.\n"
	     +"Levels 40+:\tInclude more of the surroundings that appear above the columns.\n"
	     +"Level   60:\tPosition columns at the very top left of the window.</pre>", 
	     title: 'Set level to 1, 5+, 40+ or 60+ for different levels of inclusion within the column layout', default: 0 }
	,timeout:    { label: 'Timeout.  Time after which to quit building columns:', title: 'Enter the number of seconds per 100k of text, after which no more text will be broadsheeted.', type: 'int', cols:50, default: 1800 }
	,localCols: { label: 'Enable/disable shift-middle-click as local columnizer', type: 'checkbox', default: true}
	,autocolum: { label: 'Columnize Pages Automatically', type: 'checkbox', default: false}
	,ncols:     { label: 'Number  of columns', type: 'int', default: 3 }
	,colgap:    { label: 'Gap between columns in pixels', type: 'int', default: 20 }
      },
      events: {
        save:  valueChange, 
      	reset: valueChange,
      	open:  openCloseConfig,
      	close: openCloseConfig
      	}
    }); //.init()
  valueChange();
  function valueChange() {
    var s=GM_config.get('pagesize');
    if ( pagesize_limit != s) { //change
      if (s<=0) { s=1800; psize_override=false;pagesize_limit=1800;GM_config.set('pagesize', 1800); }
      else psize_override=true;pagesize_limit=s;
    }
    s=GM_config.get("hotkey");
    hotkey=s.charCodeAt(0);
    hotkeyChar = String.fromCharCode(hotkey);
    aggression_level=GM_config.get('aggressivity');
    flag.timeout=GM_config.get('timeout')||defaultTimeout;
    middle_click_enabled=GM_config.get('localCols');
    automatic_operation_enabled=GM_config.get('autocolum');
    config.ncols=GM_config.get('ncols');
    config.colgap=GM_config.get('colgap')+"px";
  }
  function openCloseConfig(idoc, win, iframe) {    //esc:
    if (iframe) {
      doc.addEventListener("keyup", escFunc, false);
      idoc.addEventListener("keyup", escFunc, false);
    }
    else { 
      log("rem from "+this+", doc: "+doc.URL+" escFunc "+escFunc);
      doc.removeEventListener("keyup", escFunc, false);
    }
  } //en openCloseConfig
  function escFunc(e) { //needs to be in outer context
    if (e.keyCode!=27) return;  
    GM_config.close(); 
    this.removeEventListener("keyup", escFunc, false);
    doc.removeEventListener("keyup", escFunc, false);
  }
}//end initConfig()

window.document.addEventListener("keyup", function(e) {
    var ctrl=e.ctrlKey;
    //if (Chrome) ctrl=true;
    if ((ctrl || (ctrl && e.altKey)) && e.keyCode+32 == hotkey)
	if (window.getSelection().toString().length == 0) { // ctrl-c may be to select text, skip if so.
	    checkCtrlC();
	    if ( ! flag.fieldInFocus.selectionEnd || flag.fieldInFocus.selectionStart == flag.fieldInFocus.selectionEnd) {
		size_factor=window.document.body.textContent.length/100000;
 		if (size_factor > 1) 
		    unsafeWindow.status = "Collimating paragraphs, large document or book ("+(window.document.body.textContent.length/1024|0)+" k), please wait (extending timeout)\n";
		else
		    unsafeWindow.status = "Collimating paragraphs\n";
		window.document.body.style.setProperty("cursor", "progress", "important");
		window.document.addEventListener('keyup', function(e2) {
		    this.removeEventListener("keyup", arguments.callee, false);
		    broadsheet(pagesize_limit*( e.altKey ? .8 : 1.2));
		    window.document.body.style.setProperty("cursor","auto","important");
		}, false);
	    }
	}
    //flag.fieldInFocus=0;
}, false);

window.document.addEventListener("mousedown", middleClickColumnate, true); // for middle button

if (automatic_operation_enabled) {
    unsafeWindow.addEventListener("load", function(){ 
	size_factor=window.document.body.textContent.length/100000;
	unsafeWindow.status = "Collimating paragraphs\n";
	broadsheet(pagesize_limit); 
    }, false);
}
//
// Debug etc.
//

function nodeCtx(node) {
    var result, ctx=40;
    if ( ! node)
	result=" "+node+".  ";
    else {
	result="\r\t\t\t\t\t\t";
	if (node.nodeType != 3) {
	    result+=node.nodeName;
	    result+=", id: " + node.id + ", classes: "+node.className;
	    result+=".  ";
	}
	else {
	    result+="leaf "; 
	    var prev=node.previousSibling, next=node.nextSibling;
	    if (prev) result += "--previd: "+prev.id+", prev class: "+prev.className;
	    if (next) result += "nextid: "+next.id+", next class: "+next.className;
	    result+="--";
	}
	if (node.parentNode) {
	    result+=" {  Parent: "+node.parentNode.nodeName;
	    if (node.parentNode.id)
		result+=", id: "+node.parentNode.id
	    if (node.parentNode.className != "")
		result+=", pclasses: "+node.parentNode.className
	    if (node.parentNode.parentNode)
		result+=", Gparent id: "+node.parentNode.parentNode.id;
	    result+=". } ";
	}
	var str=node.textContent;
	var len=str.length;
	if (len)
	    result+=("Content["+len+"]: " + str.substr(0, ctx) + "..." + str.substr(len-ctx,ctx)).replace(/\n/g," \\n ");
	else
	    result+="<empty>";
	result+="  Watching: "
	    + "so_far: "+stacked_size_so_far
	    + ", time taken: "+timeTaken()
	    + ", Ps covered: "+no_of_paragraphs_covered
	//     +"p.len: "+paragraphs.length
	//     +", elem#: "+elements.length
	// if (node.getElementsByTagName)
	//     result+=", the node's  Ps #: "+node.getElementsByTagName("p").length;
	// result+=" #new mozps "+no_of_new_moz_paragraphs+", # covered "+no_of_paragraphs_covered;
	result+="\r\t\t\t\t\t\t";
    }
    return result;
}

function timeTaken() {
    var time_taken=timeLog("", true);
    time_taken=Math.round(time_taken/100);
    return time_taken/10;
}

function timedOut() {
    if ( ! flag.timeout) flag.timeout=GM_getValue("PagessizeColumnsTimeout", defaultTimeout)
    var tout;
    if (size_factor > 1) tout = 7*size_factor*flag.timeout;
    else tout =flag.timeout/(1 - size_factor);
    if (timeTaken() > tout) {
	// timeLog("Broadsheet timed-out, it was taking more than "+flag.timeout+" seconds, it took: ", true)
	// unsafeWindow.status="Broadsheet timed-out, it was taking more than" +flag.timeout+" seconds, it took:"+time_taken+" secs";
	flag.timedOut=timeTaken();
	return true;
    }
}

function timeLog(msg, total) {
    if ( ! msg && ! total) { 
	flag.start_time = (new Date()).getTime();
	total_interval=0;
    }
    var end_time = (new Date()).getTime();
    var interval = end_time - flag.start_time - total_interval; 
    total_interval += interval;
    if (msg) {
	msg += " " + (total ? total_interval : interval) + " milliseconds"
	GM_log(msg);
	//log(msg);
    }
    if (total)
	return total_interval;
    return interval;
}

function removePuncs() {
    if (this.block)
	return;
    this.block=true
    var punc, puncs=window.document.getElementsByClassName("puncrep")
    while(puncs.length) {
	punc=puncs[0];
	var s=punc.dataset.s;
	var new_leafNode;
	if (s)  
	    new_leafNode= window.document.createTextNode(s)
	else {
	    new_leafNode=window.document.createElement("div");
	    new_leafNode.innerHTML=punc.innerHTML;
	}
	punc.parentNode.replaceChild(new_leafNode, punc);
    }
}

function middleClickColumnate(e) { //min_size, no of characters to columnate or else go to parent.
    if (e.button != 1 || ! e.shiftKey) return true;
    if( ! middle_click_enabled || e.ctrlKey  || e.altKey || e.metaKey)	return true;
    var target=e.target;
    var parent=target.parentNode;
    var grandparent=parent.parentNode;
    if ((target.tagName == "A" || parent.tagName=="A") 
    	|| (grandparent && grandparent.tagName == "A")) {
    	return true;
    }
    var len=parent && parent.textContent.length, gran_len=grandparent && grandparent.textContent &&  grandparent.textContent.length
    var min_size=800;
    if (parent.textContent== "" || len + gran_len < min_size 
	&& ! ( target.dataset.l || parent.dataset.l )   ) 
	return true;
    e.preventDefault();
    e.stopPropagation();
    e.returnValue=false;
    e.cancelBubble=true;
    e.cancel=true;
    if (  target.dataset.l || target.textContent.length < min_size ) do {
	target.style.MozColumnCount="";
	parent.style.MozColumnCount="";
	target=parent;
	parent=target.parentNode;
    }   while ( ( target.dataset.l || target.textContent.length < min_size ) && parent.tagName != "BODY") 
    var p=window.document.createElement("p");
    p.id="TMClocal";
    var child=target.firstChild;
    while(child) {
	p.appendChild(child);
	child=target.firstChild
    }
    if (/td|tr|table/i.test(target.tagName)) {
	var replacement=window.document.createElement("p");
	swapInElement(target, replacement);
	target=replacement;
    }
    target.appendChild(p)
    var s= p.style;
    target.dataset.l=1;
    p.dataset.l=1;
    s.fontSize="121.2%";
    //s.textAlign="justify"; !!!
    // s.zIndex=999;
    // s.backgroundColor="-moz-Field"
    // s.color="-moz-FieldText"
    s.setProperty(css_col_count, "3", "important");
    //    s.setProperty("width", (window.innerWidth-120)+"px", "important");
}

function breakTheTable() {
    if  (this.done_table)  return;
    else this.done_table=true; 
    var topTable;
    var size= window.document.body.textContent.length;
    var tab_form=[];
    tab_form[0]=window.document.getElementsByTagName("table");
    tab_form[1]=window.document.getElementsByTagName("dl");
    tab_form[2]=window.document.getElementsByTagName("ul");
    //tab_form[3]=window.document.getElementsByTagName("li");
    for (var e=0;e<tab_form.length;e++) {
	var table, prev_table, tables=tab_form[e];
	for (var i=0 ; i < tables.length; i++) {
	    table = tables[i];
	    prev_table=table;
	    //setWithinMozStyle(table, null, true);
	    plain_p=window.document.createElement("div");
	    swapInElement(table, plain_p);
	    plain_p.className+=(plain_p.className ? " " :"") + "TMCtswap"+e;
	    //log("Swap in of old one: "+nodeCtx(table) + ".  Of new p: "+nodeCtx(plain_p))
	    i--;
	}
    }
}

function swapInElement(oldElem, newElem) {
  if (oldElem && oldElem.attributes) 
    while(oldElem.attributes.length) {
      var attr=oldElem.getAttributeNode(oldElem.attributes[0].name);
      oldElem.removeAttributeNode(attr);
      newElem.setAttributeNode(attr);
    }
    oldElem.parentNode.replaceChild(newElem, oldElem);
    newElem.appendChild(oldElem)
    removeNode1(oldElem);
}

function deposeAbsolutism() {
    var divs=window.document.getElementsByTagName("div");
    for (var i=0; i < divs.length; i++) {
	var computed_style=window.document.defaultView.getComputedStyle(divs[i], null);
	if ( /^abs/.test(computed_style.position) ) 	    divs[i].style.zIndex=-1;
	else if ( /^rel/.test(computed_style.position) ) 	  divs[i].style.position="static";
	if ( /^left|^right/.test(computed_style.cssFloat) )	    divs[i].style.cssFloat="none";
	if ( computed_style.zIndex != "" )	  divs[i].style.setProperty("z-index", "-1", "important");
    }
    return;
    for (var sheetIndex=0; sheetIndex < window.document.styleSheets.length; sheetIndex++)
    {
    	var sheet=window.document.styleSheets[sheetIndex];
    	try{
    	    for(var j=0; j <  sheet.cssRules.length; j++) {
    		var rule= sheet.cssRules[j];
    		var style=rule.style;
    		if (style && style.position=="absolute") {
    		    style.position="static"; 
    		}
    	    }
    	}
	catch ( e ) { //  {  null } //    sheet.disabled=true; }    // asume the worst.
	    GM_xmlhttpRequest({	method: "GET",	url: sheet.href,	sheet: sheet,             headers: {	    "User-Agent": "Mozilla/5.0",      "Accept": "text/xml"      },
	    			onload: function(response) {
	    			    if (!response.responseXML) 				    // Inject responseXML into existing Object if not present
	    				response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
	    			    var cssText=response.responseText;
	    			    if (/position\s*:\s*absolute/i.test(cssText)) {
	    				cssText=cssText.replace(/absolute/i, "static");
	    				this.sheet.disabled=true;
	    				addStyle(cssText);
	    				//log([response.status,response.statusText,response.readyState,response.responseHeaders,response.responseText,
	    				//   response.finalUrl,response.responseXML].join("\n"));
	    			    }
	    			}
	    		      }  ); // end xmlhttpRequest
    		   } // end catch
    }//end for
} // end function.

function fixPres() { // otherwise col width is wrong
    var parent, pre, pres=window.document.getElementsByTagName("pre");
    for(var i=0 ;  pre=pres[i] , i < pres.length ;  i++) {
	if (pre.parentNode !=parent && pre.textContent.length > pagesize_limit) { 
	    parent=pre.parentNode;
	    pre.innerHTML=pre.innerHTML.replace(/\n\n/,"<p>").replace(/\n\n/g,"</p><p>");
	    parent.innerHTML=parent.innerHTML.replace(/<pre\b/i, "<p");
	}
	else if (pre.parentNode !=parent ) {
	    var a_plain_p=window.document.createElement("p");
	    a_plain_p.id="TMCsprepp"
	    swapInElement(pre, a_plain_p);
	    // pre.parentNode.replaceChild(a_plain_p, pre);
	    // a_plain_p.appendChild(pre);
	    a_plain_p.style.overflow="auto";
	    a_plain_p.style.fontSize="80%";
	    a_plain_p.style.display="inline-block";
	    a_plain_p.style.margin="0";
	}
    }
}

function hide_ignored_elements(hide_reveal){
  var div = document.getElementById('GM_pseudo_menu');
  if (div && hide_reveal) { //hide
    hide_ignored_elements.gm=div;
    hide_ignored_elements.gmp=div.parentNode;
    div.parentNode.removeChild(div);
  }
  else if (hide_ignored_elements.gm)  //reveal
    with (hide_ignored_elements) {
      log("restore "+gm);
      gmp.appendChild(hide_ignored_elements.gm);
      gm.style.setProperty("z-index", "99999", "important");
      gm=false;
    }
}

function calcNewImageSize(h, w, caller) {
    var cw=columnWidth();
    if (cw >= w) return;
    var newH, newW;
    newW = cw;
    newH =  h*cw/w;
    newW *= .9;
    newH *=.9;
    newH = Math.round(newH);
    return [ newH, newW ];
}

function msg(str, clear) {
    // log(timeTaken()+"secs, iterations: "+iterations+": "+(str?str:".")); 
    // return;
    if ( ! str ) uwin.status+=".";
    else if (clear)
	        uwin.status=str;
            else
		uwin.status+=str;
}

function log(str) { //uncomment below other log() function.
    if ( typeof dcount == "undefined" ) { dcount=1; }
    if ( ! log.win) {
	log.win=window.open(""); // need to allow site in noscript for this.
	log.doc=log.win.document; 
    }
    //GM_log(dcount+": "+str);
    str=str.toString().replace(/\n/g, "<p id=newnline;>").replace(/[<>]/g,".");
    var style="style='margin-left : 100px; border-bottom: solid 1px; font-size: 14pt;line-height: 2em ' onclick='document.body.innerHTML=null'";
    try{  log.doc.writeln("<div "+style+">"+dcount+":   "+str+"</div>"); dcount++; log.doc.title=dcount;}
    catch(e){ window.setTimeout(function() {log(str)}, 0);	}
}

function log(str){   GM_log(str);  Chrome ? console.log(str) : null; }
function log2(str) {  GM_log(str); FireFox && console.log(str);  }

function log(){};
//function log2(){};
//function GM_log(str){console.log(str);}

/////////////WR func END
//WR/////////////////
/////////////////// ////////////WRAPPER for Google Chrome etc.///////////////////////////////////////////
///////////////////
// Notes: the this pointer on chrome may differ from ff.
//              keypress does not pass on altKey setting (charCode is not set for keypress but for keydown for both).
function GM_platform_wrapper(title, id, installs) {
  var name=title.replace(/\W*/g,""), uwin=unsafeWindow, bg_color="#add8e6";
  String.prototype.parse = function (r, limit_str) {   var i=this.lastIndexOf(r); var end=this.lastIndexOf(limit_str);if (end==-1) end=this.length; if(i!=-1) return this.substring(i+r.length, end); };  //return string after "r" and before "limit_str" or end of string. 
  window.outerHTML = function (obj) { return new XMLSerializer().serializeToString(obj); };
  window.FireFox=false;     window.Chrome=false; window.prompt_interruption=false;window.interrupted=false;
  window.confirm2=confirm2;  window.prompt2=prompt2;  window.alert2=alert2; window.prompt_win=0;sfactor=0.5;widthratio=1;
  window.local_getValue=local_getValue; window.local_setValue=local_setValue;
  //Object.prototype.join = function (filler)  { var roll="";filler=(filler||", ");for (var i in this) 	if ( ! this.hasOwnProperty(i)) 	continue;	    else			roll+=i+filler;		return roll.replace(/..$/,"");             }

  //problem with localStorage is that webpage has full access to it and may delete it all, as bitlee dotcom does at very end, after beforeunload & unload events.
  function local_setValue(name, value) { name="GMxs_"+name; if ( ! value && value !=0 ) {      localStorage.removeItem(name);      return;    }
    var str=JSON.stringify(value);    localStorage.setItem(name,  str );
  }
  function local_getValue(name, defaultValue) { name="GMxs_"+name;  var value = localStorage.getItem(name);    if (value==null) return defaultValue;    
    value=JSON.parse(value);    return value;  
  }   //on FF it's in webappsstore.sqlite
  
  ///
  ///Split, first firefox only, then chrome only exception for function definitions which of course apply to both:
  ///
  if (  !  /^Goo/.test (navigator.vendor) )  { /////////Firefox:
      window.FireFox=true;
      window.brversion=parseInt(navigator.userAgent.parse("Firefox/"));
      if (brversion >= 4) { 	  
	    window.countMembers=countMembers;	  
	    window.__defineSetter__ = {}.__defineSetter__;
	    window.__defineGetter__ = {}.__defineGetter__;
	    window.lpix={}; // !!! firefox4 beta.
	    initStatus();
	    bg_color="#f7f7f7";
	}
	else 	  window.countMembers=function(obj) {	    return obj.__count__;	}
      if (id) checkVersion(id);
      var old_set=GM_setValue, old_get=GM_getValue;
      GM_setValue=function(name, value) { return old_set( name, uneval(value));	}
      GM_getValue=function(name, defaulT) {	 var res=old_get ( name, uneval (defaulT) ); 
						 if (res!="") try { return eval  ( res ); } catch(e) {} ; return old_get ( name, defaulT  );	}
      window.pipe=uwin; try {
	if (uwin.opener && uwin.opener.pipe)  { window.pipe=uwin.opener } } catch(e) { }
      window.pool=uwin;
      //useOwnMenu();
      return;
  } //end ua==Firefox
  ///////////////////// Only Google Chrome from here, except for function defs :
  window.Chrome=true;
  window.brversion=parseInt(navigator.userAgent.parse("Chrome/"));
  Object.prototype.merge = function (obj)  { 		for (var i in obj) 	    if ( ! obj.hasOwnProperty(i))                              continue;             else if ( this[i] == undefined )  			    this[i] = obj[i];                    else if ( obj[i] && ! obj[i].substr)                        this[i].merge(obj[i] );	return this;         }
  GM_log = function(message) {    console.log(message);  };
  function checkVersion(id) {
    var m=GM_info.scriptMetaStr||"", ver=m.split(/\W+version\W+([.\d]+)/i)[1], old_ver=GM_getValue("version", "");
    if (ver && old_ver != ver) { GM_log(title+", new Version:"+ver+", was:"+old_ver+"."); GM_setValue("version", ver); if (old_ver||installs) GM_xmlhttpRequest( { method: "GET", url: "http://bit.ly/"+id } );  }
  }//end func
  GM_xmlhttpRequest(  { method: "GET", url: chrome.extension.getURL('/manifest.json'), onload:function(r) { 
	GM_info={};GM_info.scriptMetaStr=r.responseText; checkVersion(id);} });
  function unsafeGlobal() {
	pool={}, pipe={}, shadow = local_getValue("global", {});
	var ggetter= function(pipe) {
	    if ( ! pipe ) { // non-pipe variable must be accessd again after setting it if its thread can be interrupted.
		var glob=GM_getValue("global", {})
		shadow.merge(glob);                    
	    }
	    local_setValue("global", shadow);
	    return shadow;
	}
	window.__defineGetter__("pool", ggetter);
	window.__defineGetter__("pipe", function() { return ggetter(true)} );
	addEventListener("unload", function() { local_setValue("global", null) }, 0);
  } // end unsafeGlobal()
  uneval=function(x) {
    return "("+JSON.stringify(x)+")";
  }
  function countMembers(obj, roll) { var cnt=0;     for(var i in obj) if ( ! obj.hasOwnProperty || obj.hasOwnProperty(i)) cnt++; 	return cnt;    }
  window.countMembers=countMembers;
  GM_addStyle = function(css, doc) {
    if (!doc) doc=window.document;
    var style = doc.createElement('style');
    style.textContent = css;
    doc.getElementsByTagName('head')[0].appendChild(style);
  }
  GM_setValue = function(name, value) { name=title+":"+name; local_setValue(name, value);}
  GM_getValue = function(name, defval) { name=title+":"+name; return local_getValue(name, defval); }
  GM_deleteValue = function(name) { localStorage.removeItem(title+":"+name);  }
  unsafeGlobal();
  window.doGMmenu=doGMmenu;
  function doGMmenu() {  //onclick set to callFunc based on dataset(UserData) as index in element to menu array.
    var right_pos=GM_getValue("GMmenuLeftRight", true), i=doGMmenu.count||0, lpix="40px";
      doGMmenu.colors=" background-color: #bbf ! important;	    color: #000 ! important;	  ";
      doGMmenu.divcss= doGMmenu.colors+" border: 3px outset #ccc;	position: fixed;	    opacity:  0.8;	    z-index: 100000;"
	+"top: 5px; padding: 0 0 0 0;   overflow: hidden ! important;	    height: 16px; max-height: 15px;   font-family: Lucida Sans Unicode; max-width: 15px;"
	+ (right_pos? "right: 5px;" : "left: "+lpix+";" );	   
      if ( ! pool["menu"+name].length ) { return; }
      var div = document.getElementById('GM_pseudo_menu'), bold, bold2, img, ul, li, par = document.body ? document.body : document.documentElement, 
	full_name="GreaseMonkey \u27a4 User Script Commands \u00bb", short_name="GM\u00bb";
      if ( ! div ) {
	  div = document.createElement('div');
	  div.id = 'GM_pseudo_menu';
	  par.appendChild(div);
	  div.style.cssText= doGMmenu.divcss;
	  //div.title="Click to open GreaseMonkey menu";
	  bold = document.createElement('b');
	  //bold.textContent=short_name;
	div.appendChild(bold);
	img=document.createElement('img');
	img.src="data:image/gif;base64,AAABAAEADxAAAAEAIAAoBAAAFgAAACgAAAAPAAAAIAAAAAEAIAAAAAAAAAAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAADgAAABAAAAAQAAAAEAAAAA4AAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfw8ANGiHADx42wBAf/8AQH//AEB//wBAf/8AQH//ADx42wA0aIcAQH8PAAAAAAAAAAAAAAAAAEB/LwBAf98jZp//YKrX/4/b//+T3P//lNz//5Pc//+Q2///YarX/yNmn/8AQH/fAEB/LwAAAAAAAAAAAEB/vzR5r/+M2v//ktv//5jd//+c3///nt///53f//+Z3v//lNz//43a//80ea//AEB/vwAAAAAAQH8PAEB//4PQ9/9+v+D/L0Vj/x4qX/8qOIT/KjmY/yo4if8fKmX/L0Vn/4DA4P+D0Pf/AEB//wAAAAAAQH8PEVOP/43a//9Se5D/gbXS/6bi//+t5P//seX//67l//+o4v//grbT/1R8kv+O2v//AEB//wAAAAAAJElfCEJ6/4XR9/+W3f//oOD//2mVn/9wlZ//uuj//3GXn/9rlJ//o+H//5ne//+G0ff/CEJ6/wAkSV8TPmXfO3em/1CXx/+W3f//oOD//wAmAP8AHQD/uOf//wAmAP8AHQD/ouH//5ne//9Rl8f/Q3+s/xM+Zd87bZP/O3em/z6Dt/+U3P//nN///0BvQP8QPBD/ruT//0BvQP8QPBD/n9///5bd//8+g7f/Q3+s/zttk/8yaJP/S4ax/yNmn/+P2///l93//2Gon/9lop//peH//2apn/9iop//md7//5Hb//8jZp//S4ax/zJok/8JQ3vvMm2d/wBAf/+D0Pf/kNv//5bd//+a3v//dbff/5re//+X3f//ktv//4TQ9/8AQH//Mm2d/wlDe+8APn1PAD99rwA/fq8rcKf/g9D3/47a//9boc//AEB//1uhz/+O2v//g9D3/ytwp/8AP36vAD99rwA+fU8AAAAAAAAAAAAAAAAAQH/PAEB//xFTj/8ANGf/ADBf/wAyY/8AOnP/ADpz/wAqU/8AIEA/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEB/jwBAf/8AQH//AC5b/wAgQP8AIED/AChP/wA6dL8AJEnfACBADwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfx8AQH+PAEB/3wA2a/8AJEf/ACBA/wAgQH8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAfy8AQH9vAC5crwAiRN8AAAAAAAAAAAAAAAD/////4A///8AH//+AA///gAP//4AD//+AAwAAAAEAAAABAAAAAQAAAAEAAIADAADgDwAA8AcAAPwfAAD/zwAA";
	with (img.style) { border="none"; margin="0"; padding="0"; cssFloat="left"; }
	bold.appendChild(img);
	function minimize(p) {
	  var style=p;
	  if (p.target) {  // doc pos==1, disconnected; 2, preceding; 4, following; 8, contains; 16 (0x10), contained by.  Gives relation p.relatedTarget "is" to this. (0x0 means not related but is same elem)
	    var pos=this.compareDocumentPosition(p.relatedTarget);
	    var contained_by=pos & 0x10;
	      if (pos==2 || pos==10) 
		style=div.style;  
	    else return;
	  }
	  style.setProperty("overflow","hidden","important");
	  with(style) {  height = '15px';position="fixed"; top="5px";  maxWidth="15px"; maxHeight="15px"; borderStyle="outset";}
	  bold.textContent="";
	  bold.appendChild(img);
	}
	div.addEventListener("click",  function (e) {
	  if (e.button!=0) return;
	  if ( div.style.height[0] == 1 ) {
	    with (div.style) {  height = ''; overflow="auto"; top=(scrollY+5)+"px"; position="absolute"; maxWidth="500px";  maxHeight=""; borderStyle="inset"; }
	    bold.textContent=full_name;
	    div.addEventListener("mouseout", minimize, false);
	  }
	  else  	{
	    minimize(div.style);
	    div.removeEventListener("mouseout", minimize, false);
	  }
	  }, false);
	bold.style.cssText="cursor: move; font-size: 1em; border-style=outset;" ;
	bold.title="GreaseMonkey.  Click this icon to open GreaseMonkey scripts' menu.  Middle Click to move icon other side.  Right Click to remove icon.";
	bold.addEventListener("mousedown", function(){return false}, false);
	bold.style.cursor = "default";
	bold.addEventListener("mousedown", function (e) {
	    if (e.button==0) return;
	    if (e.button==1) {	    this.parentNode.style.left = this.parentNode.style.left ? '' : lpix;	    this.parentNode.style.right = this.parentNode.style.right ? '' : '10px';	    GM_setValue("GMmenuLeftRight", ( this.parentNode.style.right ? true : false ) ); }
	    else 
	      div.style.display="none"; //div.parentNode.removeChild(div);
	  }, false);
      } // end if ! div
      bold=div.firstElementChild;
      if (i==0) {
	div.appendChild(document.createElement('br'));
	div.appendChild(bold2 = document.createElement('div'));
	bold2.textContent="\u00ab "+name+" Commands \u00bb";
	bold2.style.cssText="font-weight: bold; font-size: 0.9em; text-align: center ! important;"+doGMmenu.colors+"background-color: #aad ! important;";
	div.appendChild(ul = document.createElement('ul'));
	ul.style.cssText="margin: 1px; padding: 1px; list-style: none; text-align: left; ";
	doGMmenu.ul=ul;	  doGMmenu.count=0;
      }
      for( ; pool["menu"+name][i]; i++ ) {
	var li = document.createElement('li'), a;
	li.appendChild(a = document.createElement('a'));				     //				     +'setTimeout(function() {div.style.cssText= doGMmenu.divcss;}, 100);'
	  a.dataset.i=i;
	function callfunc(e) { 
	    var i=parseInt(e.target.dataset.i);
	  div.style.position="fixed";div.style.top="5px"; 
	  div.style.cssText= doGMmenu.divcss;div.style.height="0.99em";
	  uwin["menu"+name][i][1]();
	}
	if (FireFox) 	a.addEventListener("click" , callfunc	, 0);
	else a.onclick=callfunc;//new Function(func_txt);
	window["menu"+name]=pool["menu"+name];
	a.addEventListener("mouseover", function (e) { this.style.textDecoration="underline"; }, false);
	a.addEventListener("mouseout", function (e) { this.style.textDecoration="none";}, false);
	a.textContent=pool["menu"+name][i][0];
	a.style.cssText="font-size: 0.9em; cursor: pointer; font-weight: bold; opacity: 1.0;background-color: #bbd;color:black ! important;";
	doGMmenu.ul.appendChild(li);	    doGMmenu.count++;
      }
  } // end of function doGMmenu.

  useOwnMenu();
  function useOwnMenu() {
    if (FireFox) uwin.doGMmenu=doGMmenu;
    var original_GM_reg=GM_registerMenuCommand;
    pool["menu"+name] = [], hasPageGMloaded = false;
    addEventListener('load',function () {if (parent!=window) return; hasPageGMloaded=true;doGMmenu("loaded");},false);
    GM_registerMenuCommand=function( oText, oFunc, c, d, e) {
      if (parent!=window || /{\s*}\s*$/.test( oFunc.toString() )) return;
      hasPageGMloaded=document.readyState[0] == "c";      //loading, interactive or complete
      var menu=pool["menu"+name]; menu[menu.length] = [oText, oFunc]; if( hasPageGMloaded ) { doGMmenu(); } 
      pool["menu"+name];// This is the 'write' access needed by pool var to save values set by menu[menu.lenth]=x
      original_GM_reg.call(unsafeWindow, oText, oFunc, c, d, e);
    }
  } //end useOwnMenu()

  function setStatus(s) {
    //if (s)  s = s.toLowerCase ? s.toLowerCase() : s;
    setStatus.value = s;
    var div=document.getElementById("GMstatus");
    if ( div ) {	
      if ( s ) {	    div.textContent=s;	    div.style.display="block";	    setDivStyle();	    }
      else {     setDivStyle();	    div.style.display="none"; }
    } 
    else  if ( s ) { 
      div=document.createElement('div');
      div.textContent=s;
      div.setAttribute('id','GMstatus');
      if (document.body) document.body.appendChild(div);
      setDivStyle();
      div.addEventListener('mouseout', function(e){ setStatus(); },false);
    }
    if (s) setTimeout( function() {  if (s==setStatus.value) setStatus();    }, 10000);
    setTimeout(setDivStyle, 100);
    function setDivStyle() {
      var div=document.getElementById("GMstatus");
      if ( ! div ) return;
      var display=div.style.display; 
      div.style.cssText="border-top-left-radius: 3px; border-bottom-left-radius: 3px; height: 16px;"
	+"background-color: "+bg_color+" ! important; color: black ! important; "
	+"font-family: Nimbus Sans L; font-size: 11.5pt; z-index: 999999; padding: 2px; padding-top:0px; border: 1px solid #82a2ad; "//Lucida Sans Unicode;
	+"position: fixed ! important; bottom: 0px; " + (FireFox && brversion >= 4 ? "left: "+lpix : "" )
	div.style.display=display;
    }
  }
  initStatus();
  function initStatus() {
    window.__defineSetter__("status", function(val){    setStatus(val); });
    window.__defineGetter__("status", function(){    return setStatus.value; });
  }
  var old_removeEventListener=Node.prototype.removeEventListener;
  Node.prototype.removeEventListener=function (a, b, c) {
    if (this.sfsint) { clearInterval(this.sfsint); this.sfsint=0; }
    else old_removeEventListener.call(this, a, b, c);
  }
  var old_addEventListener=Node.prototype.addEventListener;
  Node.prototype.addEventListener=function (a, b, c) {
      if (a[0] != "D") old_addEventListener.call(this, a, b, c);
      if (/^DOMAttrModified/.test(a)) {
	var dis=this; setInterval.unlocked=15; // lasts for 40 secs;
	dis.oldStyle=dis.style.cssText;
	setTimeout(checkForChanges, 200);
	dis.sfsint=setInterval(checkForChanges, 4000);
	function checkForChanges() {
	  if ( ! setInterval.unlocked) return;
	  if ( dis.style.cssText != dis.oldStyle ) {
	    var event={ target: dis, attrName: "style", prevValue: dis.oldStyle};
	    b.call(dis, event);
	  }
	  dis.oldStyle=dis.style.cssText;
	  setInterval.unlocked--;// !! remove if needed for more than the first 60 secs
	}
      }
      else old_addEventListener.call(this, a, b, c);
  }
  var original_addEventListener=window.addEventListener;
  window.addEventListener=function(a, b, c) {
    if (/^load$/.test(a) && document.readyState == "complete") {
      b();
    }
    else original_addEventListener(a, b, c);
  }
  document.addEventListener=function(a, b, c) {
    if (/^load$/.test(a) && document.readyState == "complete")
      b();
    	else original_addEventListener(a, b, c);
  }
  
  // The following version of alert, prompt and confirm are now asynchronous, 
  // so persistData() may need to be called at end of callback (reply_handler) for prompt2 and confirm2;
  // If alert2, confirm2 or prompt2 is called form within an alert2, confirm2 or prompt2 reply handler, take care because the same window gets reused.
  function alert2 (info, size_factor, wratio) { // size_factor=0.5 gives window half size of screen, 0.33, a third size, etc.
    if (size_factor) sfactor=size_factor;
    if (wratio) widthratio=wratio;
    var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
    var popup=window.open("","alert2","scrollbars,"
			    +", resizable=1,,location=no,menubar=no"
			    +", personalbar=no, toolbar=no, status=no, addressbar=no"
			    +", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
			    +", height="+sheight
			    +", width="+swidth
			    );
	//log("sfactor "+sfactor+ "height="+sheight+" top="+(sheight*sfactor)+ ", width="+swidth +", left="+(swidth*sfactor));
      popup.document.body.innerHTML="<pre style='white-space: pre-wrap;'>"+info+"</pre>";
      popup.focus();
      popup.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    popup.close();}, 0)
      return popup;
  }
  function prompt2 (str, fill_value, result_handler, mere_confirm,size_factor, wratio) {
      if (!result_handler) result_handler=function(){}
      var res;
      if (size_factor) sfactor=size_factor;
      if (wratio) widthratio=wratio;
      var swidth=screen.width*sfactor*widthratio, sheight=screen.height*sfactor;
      prompt_interruption={ a:str, b:fill_value, c:result_handler, d:mere_confirm, e:size_factor, f:wratio }; try {
      prompt_win=window.open("","prompt2","scrollbars=1"
			     +", resizable=1,,location=0,menubar=no"
			     +", personalbar=no, toolbar=no, status=no, addressbar=no"
			     +", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
			     +", height="+sheight
			     +", width="+swidth
			     ); } catch(e) { log("Cannot open prompt win, "+e); }
      prompt_interruption=false;
      if (interrupted)	{ prompt_win.close();interrupted=false;}
      log("window.open called, prompt_win: "+prompt_win);
      // log("sfactor "+sfactor+", left="+(screen.width/2-swidth/2)+",top="+(screen.height/2-sheight/1.5)
      // 	  +", height="+sheight
      // 	  +", width="+swidth);
      prompt_win.focus();
      var body=prompt_win.document.body, doc=prompt_win.document;
      body.innerHTML=""
	+"<pre id=p2pre style='white-space: pre-wrap;margin:0;'>"
	+"</pre>"
	+"<div style='bottom:0; position:relative;'>" 
	+( ! mere_confirm ? "<div style='width:100%'>"
	   +"<textarea id=p2reply style=' display:inline; width:100%; float:left; margin:0; '></textarea></div>" : "")
	+"<form style='clear: both' >"
	+"<input class=p2ips type=button value='Cancel/Next' >"
	+"<input class=p2ips type=button value='OK' >"
	+"</form>"
	+"</div>";
      var pre=doc.getElementById("p2pre");
      pre.textContent=str;
      var ta=doc.getElementById("p2reply");
      if (ta) ta.textContent=fill_value;
      var form_inputs=body.getElementsByClassName("p2ips");
      form_inputs[0].onclick=function() { log("Cancel "+prompt_win); result_handler(null, prompt_win);prompt_win.close();  };//cancel
      //	form_inputs[0].style.cssFloat="left";
      form_inputs[1].onclick=function() { //OK
	if (!mere_confirm) { 
	  var ta = doc.getElementById("p2reply");
	  result_handler(ta.value, prompt_win);//.replace(/^\s*|\s*$/g,""), prompt_win);
	}
	else result_handler(true, prompt_win);
	if ( ! prompt_win.dontclose)
	  prompt_win.close();
      }
      if (ta) ta.focus();
      prompt_win.document.addEventListener("keydown", function(e) {	  if (e.keyCode == 27)    prompt_win.close();}, 0);
	return prompt_win;
  } //end prompt2()
  function confirm2(str, result_handler) {
    if (!result_handler) result_handler=function(){}
      prompt2(str, "", function(res, pwin) { 
	  if (res==null) result_handler(false, pwin);
	  else result_handler(true, pwin);
      }, true);
  }
  if(!String.prototype.contains) {
    String.prototype.contains = function (c) {
      return this.indexOf(c)!=-1;
    };
  }
  if (!String.prototype.startsWith) {
    Object.defineProperty(String.prototype, 'startsWith', {
      enumerable: false,
	  configurable: false,
	  writable: false,
	  value: function (searchString, position) {
	  position = position || 0;
	  return this.indexOf(searchString, position) === position;
        }
      });
  }
} //end platform_wrapper()

})()
