// ==UserScript==
// @name           Google Scholar Citation Exporter
// @namespace      ScholarsLittleHelper
// @version          1.02
// @description    Extension of Mayank Lahiri's Google Scholar Citation Explorer that prints results to CSV, for further use in other applications
// @include        http://scholar.google.com/scholar*
// ==/UserScript==
window.slh_MAX_CITATIONS = 1000;
window.slh_CHUNKSIZE = 20;                 //sad monkey, circa Feb '13 google reduced the max results per get to <= 20
window.slh_MAX_AUTHOR_COUNT = 6; //max number of authors to incorporate in CSV output (pad to this many as well)
window.slh_SLEEP_BETWEEN_HITS = true; //better keep as true, or google likely to ban your IP
window.slh_SLEEP_DELAY_BETWEEN_HITS = 10000; //used to add up-to-value (in millisecs) to min pause (1.5secs)
                                                                               //intended to reduce prob of google getting annoyed at automated
                                                                               //request(s) and blocking IP or using captcha to verify human-at-the-helm 
//----------------------------------------------------------------------------
function slh_main()	{
//----------------------------------------------------------------------------
	// setup
	window.slh_ce_citations = new Object;
	window.slh_ce_citetext  = new Object;
	window.slh_ce_pc	    = 0;
	window.slh_ce_stattext  = " ";
	window.slh_parser_div = document.createElement('div');
	// parse the results on the current page
	window.slh_docs_on_page = slh_parser(document.body.innerHTML);
	window.slh_cited_docs_on_page = new Object;
	for(var i = 0; i < slh_docs_on_page.length; i++)
		if(slh_docs_on_page[i][1] > 0)	
			slh_cited_docs_on_page[slh_docs_on_page[i][0].toString()] = slh_docs_on_page[i].toString();
	// add UI elements to the page
	slh_add_checkboxes();
	slh_add_notification_div();
	slh_add_citexplore_div();
	slh_update_notification();
	window.addEventListener('resize', slh_resize, true);	
}//function slh_main()
//
// adds checkboxes next to results that can be selected
//
//----------------------------------------------------------------------------
function slh_add_checkboxes()	{
//----------------------------------------------------------------------------
	var allAnchors = document.getElementsByTagName('a');
	for(var a = 0; a < allAnchors.length; a++)	
		if(allAnchors[a].innerHTML.match(/Cited by/i))	{
			var doc_id = allAnchors[a].getAttribute('href').match(/cites=[0-9]+/i)[0].replace(/cites=/i, '');
			var checkbox_span = document.createElement('span');
			checkbox_span.innerHTML = "<input type='checkbox' id='slh_checkbox_"+doc_id+"'><font color='#aa0000'> Explore citations</font></input> ";
			allAnchors[a].parentNode.insertBefore(checkbox_span, allAnchors[a]);
			var elem = document.getElementById('slh_checkbox_'+doc_id);
			elem.addEventListener("click", slh_checkbox_clicked, true);
			elem.checked = (GM_getValue('slh_data'+doc_id) == undefined) ? false : true;
		}		
}//function slh_add_checkboxes()
//
// adds a light blue background notification area to the top of a Scholar results page
//
//----------------------------------------------------------------------------
function slh_add_notification_div()	{
//----------------------------------------------------------------------------
	var notify_div = document.createElement('div');
	notify_div.id = 'slh_notify_div';
	notify_div.style.border = "solid 1px black";
	notify_div.style.backgroundColor = "#d6e3ff";
	notify_div.style.padding = "10px";
	notify_div.style.marginBottom = "10px";
	notify_div.innerHTML = "<b>Scholar's Little Helper</b>: You have selected <a href='#' "+
        "id='slh_notify_docs_selected'>0 documents</a>. Click to start the <a href='#' "+
        "id='slh_action'>citation explorer</a>.<br><div style='display: none;' "+
        "id='slh_notify_doc_list'></div>";
    var hdr_table = document.getElementById('gs_ab');
	hdr_table.parentNode.insertBefore(notify_div, hdr_table.nextSibling);
	document.getElementById('slh_notify_docs_selected').addEventListener("click", slh_notify_show_sels, true);		
	document.getElementById('slh_action').addEventListener("click", slh_citexplore, true);		
}//function slh_add_notification_div()
//
// creates the main overlay DIV for the citation explorer
//
//----------------------------------------------------------------------------
function slh_add_citexplore_div()	{
//----------------------------------------------------------------------------
	var ce_div = document.createElement('div');
	var ce_bkg_div = document.createElement('div');
	ce_div.id = 'slh_ce_div';
	ce_div.style.position = 'absolute';
	ce_div.style.top = '175px';
	ce_div.style.backgroundColor = 'white';
	ce_div.style.left = '75px';
	ce_div.style.padding = '15px';
	ce_div.style.paddingBottom = '25px';
	ce_div.style.border = '10px solid gray';
	ce_div.style.zIndex = 200;
	ce_div.style.opacity= 1;
    ce_div.style.overflow = 'scroll';
	ce_div.style.overflowX = 'hidden';
	ce_div.style.overflowY = 'auto';
//	ce_div.style.visibility = 'hidden';
	ce_div.style.display = 'none';
	ce_bkg_div.id = 'slh_ce_bkg_div';
	ce_bkg_div.style.position = 'absolute';
	ce_bkg_div.style.backgroundColor = 'black';
	ce_bkg_div.style.top = '0px';
	ce_bkg_div.style.left = '0px';
	ce_bkg_div.style.opacity = '0.8';
	ce_bkg_div.style.zIndex = 190;		
//	ce_bkg_div.style.visibility = 'hidden';
	ce_bkg_div.style.display = 'none';
	var ih= "<b><table border=0 width='100%' cellpadding=0 cellspacing=0>"+
        "<tr><td valign='left'><b><font color='red'>Citation Explorer</font></b><br>Show all common citations for a "+
            "subset of documents you select.</td>"+
        "<td valign='middle' align='right'><b><span style='margin-right:30px'><a href='#' id='slh_print_csv_button'></a>"+
            "</b></td>"+
        "<td valign='middle' align='right'>"+
            "<b><span style='margin-right:30px'><a href='#' id='slh_print_button'></a>"+
            "</span></b></td>"+
		"<td><b><a href='#' id='slh_close_button'>Close</a></b></td></td></tr></table>"+
        "<div style='width: 100%; margin-top: 10px' id='slh_ce_main'></div>";
	ce_div.innerHTML = ih;
	document.body.appendChild(ce_div);
	document.body.appendChild(ce_bkg_div);
	document.getElementById('slh_close_button').addEventListener("click", slh_ce_close, true);
	document.getElementById('slh_print_csv_button').addEventListener("click", slh_ce_print_csv, true);
	document.getElementById('slh_print_button').addEventListener("click", slh_ce_print, true);
	slh_resize();
}//function slh_add_citexplore_div()
//
// responds to the browser window being resized
//
//----------------------------------------------------------------------------
window.slh_resize = function()	{
//----------------------------------------------------------------------------
	var ce_div = document.getElementById('slh_ce_div');
	var ce_bkg_div = document.getElementById('slh_ce_bkg_div');
	ce_div.style.width = (window.innerWidth-120) + "px";
	ce_div.style.height = (window.innerHeight-170) + "px";
	ce_bkg_div.style.width = window.innerWidth + "px";
	ce_bkg_div.style.height = (window.scrollMaxY + window.innerHeight) + "px";
	var prog = document.getElementById('slh_progress_bar');
	if(prog != undefined){
		prog.style.width = Math.round((window.slh_ce_pc/100.0) * (window.innerWidth-144)) + "px";
	}
};//window.slh_resize = function()
//
// shows/hides the document list in the notification area
//
//----------------------------------------------------------------------------
window.slh_notify_show_sels = function()	{
//----------------------------------------------------------------------------
	var x = document.getElementById('slh_notify_doc_list');
	x.style.display = (x.style.display== 'block') ? 'none' : 'block';
};//window.slh_notify_show_sels = function()
//
// updates the notification area
//
//----------------------------------------------------------------------------
window.slh_update_notification = function()	{
//----------------------------------------------------------------------------
	var docs = GM_listValues('slh_data');
	document.getElementById('slh_notify_docs_selected').innerHTML = docs.length + " document" + (docs.length==1?"":"s");
	var div_doclist = document.getElementById('slh_notify_doc_list');
	var ih = "<table border=0 cellpadding='0px' cellspacing='10px'>";
	for(var d = 0; d < docs.length; d++)	{
		var doc = GM_getValue(docs[d]);
		if(doc == undefined)
			continue;
		var cite_id = doc.match(/^[0-9]+/)[0];
		var doc_txt = doc.replace(/^.*?,.*?,/, '');
		ih += '<tr><td>' + doc_txt + 
			'</td><td valign="middle"><a href="#" id="slh_notify_remove_' +
			cite_id + '"><b>Remove from list</b></a></td></tr>';
	}	
	ih += "</table>";		// a little hackish because current FF doesn't seem to like direct innerHTML string appends
	div_doclist.innerHTML = ih;
	for(var d = 0; d < docs.length; d++)	{
		var doc = GM_getValue(docs[d]);
		if(doc == undefined)
			continue;
		var cite_id = doc.match(/^[0-9]+/)[0];
		document.getElementById('slh_notify_remove_'+cite_id).addEventListener('click', slh_notify_remove_item, true);		
	}
	var x = document.getElementById('slh_notify_div');
	if(docs.length == 0)
		x.style.display = 'none';
	else 
		x.style.display = 'block';
};//window.slh_update_notification = function()
//
// event handler for an item being removed from the notification area
//
//----------------------------------------------------------------------------
window.slh_notify_remove_item = function()	{
//----------------------------------------------------------------------------
	var doc_id = this.id.match(/[0-9]+/)[0];
	GM_deleteValue('slh_data'+doc_id);
	var x = document.getElementById('slh_checkbox_'+doc_id);
	if(x != null)
		x.checked = false;
	slh_update_notification();
};//window.slh_notify_remove_item = function()
//
// event handler for a checkbox being clicked
//
//----------------------------------------------------------------------------
window.slh_checkbox_clicked = function()	{
//----------------------------------------------------------------------------
	var doc_id = this.id.replace(/slh_checkbox_/, '');
	if(this.checked == true){
		GM_setValue('slh_data'+doc_id, slh_cited_docs_on_page[doc_id]);
    }else{
		GM_deleteValue('slh_data'+doc_id);
    }
	slh_update_notification();
};//window.slh_checkbox_clicked = function()
//----------------------------------------------------------------------------
window.slh_get_citation_id = function(citation){
//----------------------------------------------------------------------------
	var citedID = citation.match(/cites=[0-9]+/i);
	var relatedID = citation.match(/scholar\?q=related:.*?:/i);
	var clusterID =  citation.match(/cluster=[0-9]+/i);
	var doc_id = null;
	if (citedID != null){
		citedID[0] = citedID[0].replace(/cites=/ig, '');
		doc_id = citedID[0];
	}
	else if (relatedID != null) {
		// this doc has not been cited, try getting the related ID
		relatedID[0] = relatedID[0].replace(/scholar\?q=related:|:/ig,'');
		doc_id = relatedID[0];
	} else if (clusterID != null){
		// no cite id and no related id, try getting the cluster ID
		clusterID = clusterID[0].replace(/cluster=/ig,'');
		doc_id = clusterID[0];
	} else{
			// no cite id and no cluster id, generate a makeshift ID
			doc_id = "hash_"+ slh_hash(citation);
	}
	return doc_id;
};//window.slh_get_citation_id = function(citation)
// 
// a primitive little parser for Google Scholar pages
//
//----------------------------------------------------------------------------
window.slh_parser = function(doc)	{
//----------------------------------------------------------------------------
	var result = new Array();
	// find all documents with 1 or more citations
	doc = doc.replace(/[\n\r\f]/g, ' ');
	doc = doc.replace(/class=yC[01]/g, '');
    doc = doc.replace(/class=\"gs_rt\"/g,'');
	var Dox = doc.match(/<h3 >.*?Related articles\s*<\/a>/gi);
	if(Dox == null)	
		return result;
	// clean up results and collect in a nested array
	for(var i = 0; i < Dox.length; i++)	{
		var thisDoc = new Array();
		var doc_id = window.slh_get_citation_id(Dox[i]);
		var num_cited = Dox[i].match(/Cited by [0-9]+/i);
		if (num_cited==null)
			num_cited=0;
		else 
			num_cited = num_cited[0].replace(/Cited by /ig, '');
		if(num_cited > window.slh_MAX_CITATIONS)
			num_cited = window.slh_MAX_CITATIONS;
		thisDoc.push(doc_id, num_cited, Dox[i]);
		result.push(thisDoc);
	}
	return result;
};//window.slh_parser = function(doc)
//
// generic error handler
//
//----------------------------------------------------------------------------
window.slh_error = function(err)	{
//----------------------------------------------------------------------------
	alert(err);
	window.slh_ce_close();
};//window.slh_error = function(err)
//
// populate the CE window with the current intersection of citations
// 
//----------------------------------------------------------------------------
window.slh_ce_update_intersection = function()	{
//----------------------------------------------------------------------------
	var result = undefined;
	// calculate intersection
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		var root_cache = window.slh_ce_citecache[root[0]];
		if(document.getElementById('slh_ce_sel_'+r).checked)	{
			if(result == undefined)	
				result = root_cache.slice(0);
			else
				result = slh_ce_isect(result, root_cache);
			if(result.length == 0)
				break;
		}
	}
	// dump the results
	var ih = "";
	if(result != undefined && result.length > 0)	{
		for(var x = 0; x < result.length; x++)
			ih += window.slh_ce_txtcache[result[x]] + '<p>';
	}
	else
		ih = "No common citations.";
	document.getElementById('slh_ce_isect').innerHTML = ih;
};//window.slh_ce_update_intersection = function()	
    
//----------------------------------------------------------------------------
window.slh_ce_isect = function(a1, a2)	{
//----------------------------------------------------------------------------
	var p1 = 0;
	var p2 = 0;
	var isect = new Array();
	while(p1 < a1.length && p2 < a2.length)	
		if(a1[p1].toString() == a2[p2].toString())	{
			isect.push(a1[p1]);
			p1++;
			p2++;
		} else	
			if(a1[p1].toString() < a2[p2].toString())
				p1++;
			else
				p2++;
		return isect;
};//window.slh_ce_isect = function(a1, a2)
//
// the main citation explorer mini-application
// consider this the entry point for it, or a modal dialog on top of
// Google Scholar
//
//----------------------------------------------------------------------------
window.slh_citexplore = function()	{
//----------------------------------------------------------------------------
	// check if we have enough documents to compare (i.e., more than 1)
	var docs = GM_listValues('slh_data');
	if(docs.length < 2)	{
		alert("Please select at least two documents before starting the citation explorer.");
		return;		
	}
	// show our "dialog box" and get a handle to our div
	var ce_nd  = document.getElementById('slh_notify_div').parentNode;
	ce_nd.style.overflow = 'hidden';
	var ce_div = document.getElementById('slh_ce_div');
	var ce_bkg_div = document.getElementById('slh_ce_bkg_div');
//	ce_div.style.visibility = 'visible';
//	ce_bkg_div.style.visibility = 'visible';	
	ce_div.style.display = 'inline';
	ce_bkg_div.style.display = 'inline';	
	var ce_mainwnd = document.getElementById('slh_ce_main');
	if(ce_mainwnd == null)
		return slh_error('Cannot start citation explorer.');
	// set up initial window elements (progress bar and a table for showing progress details)
	var ih= "<div id='slh_progress_bar' style='width: 5px; background-color: #d6e3ff; border: 1px solid gray; "+
        "color: #aa0000; padding-top: 10px; padding-bottom: 10px; font-size: 16pt; font-weight: bold; "+
        "text-align: center;'>0%</div><font size=-1>Downloaded <b><span id='slh_progress_bar_text'>0 of 0"+
        "</span></b> citations.<br><b>Status: </b><span id='slh_progress_txtstatus'> </span></font>"+
		"<p><table border=0 cellpadding='10px' cellspacing='10px' id='slh_ce_prog_table'>"+
		"<tr><td><b>Citations</b></td><td><b>Document</b></td></tr>"
		+"</table>";
	ce_mainwnd.innerHTML = ih;		
	var slh_ce_prog_table = document.getElementById('slh_ce_prog_table');
	// prepare the citation root list:
	// PRE: none
    var main_div = document.getElementById('gs_top');
	main_div.style.zIndex=-1;
	window.slh_ce_roots = new Array();
	window.slh_ce_at_root = 0;
	window.slh_ce_total_cites = 0;
	for(var d = 0; d < docs.length; d++)	{
		var doc = GM_getValue(docs[d]);
		var doc_id = doc.match(/^[0-9iA-Za-z]+/)[0];
		var doc_num_cited = parseInt(doc.match(/,[0-9]+/)[0].substring(1));
		var doc_txt = doc.replace(/^.*?,.*?,/, '');
		var curDoc = new Array();
		curDoc.push(doc_id, doc_num_cited, doc_txt);
		window.slh_ce_roots.push(curDoc);
		window.slh_ce_total_cites += doc_num_cited;
	}
	// POST: slh_ce_roots[0...#roots] = [ [doc_id, doc_num_cited, doc_txt], ... ]
	//	     slh_ce_total_cites = total # of citations for all checked documents
	// set the initial state for the citation downloader
	window.slh_down_quit_flag = false;
	window.slh_ce_at_root = 0;
	window.slh_ajax_result = new Array();
	return slh_get_citations();
};//window.slh_citexplore = function()
//
// gets all citing documents using either the internal cache or ajax requests
// to the server
// PRE:  slh_ce_roots[0...#roots] = [ [doc_id, doc_num_cited, doc_txt], ... ]
// POST: slh_ce_citations{doc_id t} = [citing doc 1, ... ] for all 't' in [0...#roots]
//       slh_ce_citetext{doc_id t} = "<citation html for t>"
//       calls slh_downloader_finished() when all roots have a citation list in slh_ce_citations
//
//----------------------------------------------------------------------------
window.slh_get_citations = function()  {
//----------------------------------------------------------------------------
	if(window.slh_ce_at_root >= window.slh_ce_roots.length) {
		// clear up the call stack a bit
		document.getElementById('slh_ce_main').innerHTML = "";
		window.setTimeout(slh_downloader_finished, 300);
		return;
	}
	var root = window.slh_ce_roots[window.slh_ce_at_root];
	// add row for current root to progress table
	if(window.slh_ajax_result.length == 0 && root[1] > 0) {
		// add the information to the progress table
		var row = document.getElementById('slh_ce_prog_table').insertRow(1);
		var t1 = document.createElement('div');
		var t2 = document.createElement('div');
		t1.innerHTML = root[2];
		t2.innerHTML = '0 of '+(root[1]>slh_MAX_CITATIONS?slh_MAX_CITATIONS+"+":root[1]);
		t2.style.fontSize = '16pt';
		var cell1 = row.insertCell(0).appendChild(t2);
		var cell2 = row.insertCell(1).appendChild(t1);		
		window.slh_down_statcell = t2;		
		window.slh_down_statcell2 = t1;
	}
	// check if each root is already in the cache (no need to hit server then)
	if(root[0] in window.slh_ce_citations)  {
		// already in the cache (slh_ce_citations)
		window.slh_ajax_result.length = root[1]>slh_MAX_CITATIONS?slh_MAX_CITATIONS:root[1];
		slh_citation_downloader_status();
		window.slh_ce_at_root++;
		if(window.slh_ajax_result.length > 0)
			window.slh_ajax_result = new Array();
		window.setTimeout(slh_get_citations, 50);
		return;
	} else {
		// not in cache, check progress on current ajax request needs to be initiated
        var flag = root[1]<window.slh_MAX_CITATIONS?root[1]:window.slh_MAX_CITATIONS;
		if(window.slh_ajax_result.length >= flag)	{
			// done with this root
			window.slh_ce_citations[root[0]] = window.slh_ajax_result;
			slh_citation_downloader_status();
			window.slh_ce_at_root++;
			window.slh_ajax_result = new Array();
			window.setTimeout(slh_get_citations, 50);
			return;
		} else {
			// need more ajax requests
			window.slh_ajax_url = 'http://scholar.google.com/scholar?num='+window.slh_CHUNKSIZE+
				'&hl=en&lr=lang_en&safe=off&cites='+root[0]+'&start='+window.slh_ajax_result.length+'&sa=N';
           // alert("window.slh_get_citations::slh_ajax_url="+slh_ajax_url);
           // if flag set, wait minimum of 1.5 secs and up to window.slh_SLEEP_DELAY_BETWEEN_HITS
            var request_delay = window.slh_SLEEP_BETWEEN_HITS ? 1500 + Math.floor(Math.random()*window.slh_SLEEP_DELAY_BETWEEN_HITS) : 50;
            window.setTimeout(slh_ajax_hit_server, request_delay);
			window.slh_ce_stattext = "Waiting for a bit ("+ window.numberWithCommas(request_delay)+" ms) ...";
			slh_citation_downloader_status();
			return;
		}
	}
};//window.slh_get_citations = function() 
//----------------------------------------------------------------------------
window.slh_ajax_hit_server = function()  {
//----------------------------------------------------------------------------
	window.slh_ce_stattext = "Requesting more citations.";
    //alert("window.slh_ajax_hit_server::window.slh_ajax_url="+window.slh_ajax_url);
	GM_xmlhttpRequest({
        method: 'GET',
        url: window.slh_ajax_url,
        headers: {'Accept': 'text/html',
        'User-agent': 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9a3pre) Gecko/20070330'	},
        onload: slh_ajax_success,
        onerror: slh_ajax_error });
};//window.slh_ajax_hit_server = function()
    
    
//----------------------------------------------------------------------------
window.slh_ajax_error = function(resp)	{
//----------------------------------------------------------------------------
	alert("Error "+resp.status+" parsing response from the server.");
	slh_ce_close();
};//window.slh_ajax_error = function(resp)
    
//----------------------------------------------------------------------------
window.slh_ajax_success = function(resp)    {
//----------------------------------------------------------------------------
    if(parseInt(resp.status) != 200)
        return slh_ajax_error(resp);
    var root = window.slh_ce_roots[window.slh_ce_at_root];
    window.slh_ce_stattext = "Received more citations.";
    // process the results
    var parsed = slh_parser(resp.responseText);
    for(var d = 0; d < parsed.length; d++)	{
        var docid = parsed[d][0];
        window.slh_ajax_result.push(docid);
        window.slh_ce_citetext[docid] = parsed[d][2];		
    }
    //are there additional pages listed at the bottom of the page
    var cur_page=1;
    var no_luck = resp.responseText.match(/Sorry,? we didn/i); //Google printed message it could find related articles
    var more_pages = resp.responseText.match(/<div id=\"gs_n\".*?<\/div>/gi); //div id with Google icon and page numbers at bottom of screen
    var last_page=false;
    if(no_luck != null)	{
        //google printed message it could not find related articles, set vars and keep going
        last_page=true; 
        root[1] = 0;
    } else if (more_pages==null) {
        debugger;
        //google displays all available citations, so no google icone and page numbers at bottom of page
        last_page=true;
    } else {
        //get number of pages shown at bottom of screen
        var page_nums = more_pages[0].match(/gs_ico_nav_page\"><\/span>[0-9]+/ig); //class id for page numbers at bottom of screen
        var cur_page = more_pages[0].match (/gs_ico_nav_current\"><\/span><b>[0-9]<\/b>+/ig); //class id for current page number
if (cur_page==null)
    debugger;
        if (cur_page==null || (more_pages[0].match (/visibility:hidden\">Next/ig)!=null)) {
            last_page=true;
        } else {
            cur_page = cur_page[0].replace(/.*<b>|<\/b>/ig,'');         //isolate the current page number
        }
    }
    // update citation estimates
    if(last_page) { 
        root[1] = window.slh_ajax_result.length; // no more results
    }
    slh_citation_downloader_status();
    var request_delay = window.slh_SLEEP_BETWEEN_HITS ? 1500 + Math.floor(Math.random()*window.slh_SLEEP_DELAY_BETWEEN_HITS : 50;
    window.setTimeout(slh_get_citations, request_delay);
};//window.slh_ajax_success = function(resp)
//----------------------------------------------------------------------------
window.slh_citation_downloader_status = function()	{
//----------------------------------------------------------------------------
	// calculate progress
	var total_prog = 0;
	var total_cites = 0;
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		if(window.slh_ce_at_root > r)	{
			total_cites += parseInt(window.slh_ce_citations[root[0]].length);
			total_prog += parseInt(window.slh_ce_citations[root[0]].length);
		} else	{
			if(window.slh_ce_at_root == r)  {
				total_cites += parseInt(root[1]);
				total_prog  += parseInt(window.slh_ajax_result.length);
			} else 
				total_cites += parseInt(root[1]);
		}
	}
	// update progress indicators
	var pc = Math.round(total_prog*100.0 / total_cites);
	document.getElementById('slh_progress_bar').innerHTML = pc + "%";
	document.getElementById('slh_progress_bar').style.width = Math.round((pc/100.0) * (document.getElementById('slh_ce_div').style.width.match(/[0-9]+/)[0]-24)) + "px";
	document.getElementById('slh_progress_bar_text').innerHTML = total_prog+' of '+total_cites;
	document.getElementById('slh_progress_txtstatus').innerHTML = window.slh_ce_stattext;
	var act_root = window.slh_ce_roots[window.slh_ce_at_root];
	if(act_root != null && "slh_down_statcell" in window)
		window.slh_down_statcell.innerHTML = window.slh_ajax_result.length+' of '+(act_root[1]>window.slh_MAX_CITATIONS?window.slh_MAX_CITATIONS:act_root[1]);
	window.slh_ce_pc = pc;
};//window.slh_citation_downloader_status = function()
//
// post-downloading screen setup
// to be called from slh_get_citations() after all citations have been successfully downloaded.
// PRE: slh_ce_citations{doc_id} = [ citing doc 1, ... ]
//      slh_ce_citetext{doc_id} = "<citation html>"
//      slh_ce_roots is populated with the roots
//
//----------------------------------------------------------------------------
window.slh_downloader_finished = function()	{
//----------------------------------------------------------------------------
	window.slh_ce_stattext = "Done.";
	var ce_mainwnd = document.getElementById('slh_ce_main');
	ce_mainwnd.innerHTML = "<table border=0 cellpadding='5px' cellspacing='5px' id='slh_ce_selector_table'>"+
        "<tr style='background-color: #d6e3ff;'><td><b>Document #</b></td><td>"+
		"<b>Include</b></td><td><b>Citation</b></td></tr></table><hr><div id='slh_ce_isect'>"+
        "</div><p><hr><font size=-2>Copyright &copy; 2009 "+
        "<a href='http://compbio.cs.uic.edu/~mayank/software/slh/'>Mayank Lahiri</a>, version 1.2</font>";
	document.getElementById('slh_print_button').innerHTML = "Printable HTML version";
    document.getElementById('slh_print_csv_button').innerHTML = "Printable CSV version";
	// add documents to the intersection selector table
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		var cites = window.slh_ce_citations[root[0]];
		cites.sort();
		// add to the table
		var row = document.getElementById('slh_ce_selector_table').insertRow(-1);	
		row.style.backgroundColor = 'white';
		var t1 = document.createElement('div');
		var t2 = document.createElement('div');
		var t3 = document.createElement('div');
		t1.innerHTML = r+1;
		t1.style.textAlign = 'center';
		t2.innerHTML = "<input type='checkbox' checked='true' id='slh_ce_sel_" + r +
            "' style='width: 50px; height: 80px; padding: 0px;'> </input>";      
        var google_found_cites = root[2].match(/Cited by [0-9]+/i);
        google_found_cites = google_found_cites[0].replace(/Cited by /i,'');
        var percentage_retrieved = root[1]/google_found_cites;
		t3.innerHTML = root[2].replace(/<div class=\"gs_fl\">/i, "<div class=\"gs_fl\">Retrieved " 
                                       + root[1] + " citations (~" + 
                                       Math.round(percentage_retrieved * 100) +"%) ");
		t1.style.fontSize = '24pt';
		row.insertCell(0).appendChild(t1);
		row.insertCell(1).appendChild(t2);		
		row.insertCell(2).appendChild(t3);		
		document.getElementById('slh_ce_sel_'+r).addEventListener("click", slh_ce_update_intersection, true);
	}
	slh_ce_update_intersection();
};//window.slh_downloader_finished = function()
//
// updates the document list with the currently selected (via checkboxes)
// intersection set
//
// can be called independently but also the click event handler for checkboxes
//
//----------------------------------------------------------------------------
window.slh_ce_update_intersection = function()	{
//----------------------------------------------------------------------------
	// calculate intersection
	var result = undefined;
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		var cites = window.slh_ce_citations[root[0]];
		if(document.getElementById('slh_ce_sel_'+r).checked)	{
			if(result == undefined)	
				result = cites.slice(0);    // deep copies cites to result
			else
				result = slh_ce_isect(result, cites);
			if(result.length == 0)
				break;
		}
	}
	// POST: result holds the current intersection
	// dump the results
	var ih;
	if(result != undefined && result.length > 0)	{
		ih = result.length + " results.<p>";
		for(var x = 0; x < result.length; x++)
			ih += window.slh_ce_citetext[result[x]] + '<p>';
	}
	else
		ih = "No common citations.";
	document.getElementById('slh_ce_isect').innerHTML = ih;
};//window.slh_ce_update_intersection = function()	
    
    
//----------------------------------------------------------------------------
window.slh_ce_isect = function(a1, a2)	{
//----------------------------------------------------------------------------
	var p1 = 0;
	var p2 = 0;
	var isect = new Array();
	while(p1 < a1.length && p2 < a2.length)	
		if(a1[p1].toString() == a2[p2].toString())	{
			isect.push(a1[p1]);
			p1++;
			p2++;
		} else	
			if(a1[p1].toString() < a2[p2].toString())
				p1++;
			else
				p2++;
		return isect;
};//window.slh_ce_isect = function(a1, a2)
//
// close citation explorer mini-window
// abort any pending XMLHttp requests gracefully
//
//----------------------------------------------------------------------------
window.slh_ce_close = function() {
//----------------------------------------------------------------------------
	// hide the DIVs and set the download thread quitting flag
 
	var ce_div = document.getElementById('slh_ce_div');
	var ce_bkg_div = document.getElementById('slh_ce_bkg_div');
//	ce_div.style.visibility = 'hidden';
//	ce_bkg_div.style.visibility = 'hidden';	
	ce_div.style.display = 'none';
	ce_bkg_div.style.display = 'none';	
	var ce_nd  = document.getElementById('slh_notify_div').parentNode;
	ce_nd.style.overflow = 'auto';
	window.slh_down_quit_flag = true;
	document.getElementById('slh_print_button').innerHTML = "";
	document.getElementById('slh_print_csv_button').innerHTML = "";
    var main_div = document.getElementById('gs_top');
    main_div.style.zIndex='Auto';
};//window.slh_ce_close = function()
//
// very simple hash function -- do not use ANYWHERE else but here
//
//----------------------------------------------------------------------------
window.slh_hash = function(txt)	{
//----------------------------------------------------------------------------
	var result = "";
	var t = "";
	window.slh_parser_div.innerHTML = txt;
	var r = window.slh_parser_div.getElementsByTagName('*');	
	if(r == null)	{
		slh_error("Cannot PARSE!!");
		return;
	} else
		for(var i = 0; i < r.length; i++)
			if(r[i].innerHTML.match(/</) == null)
				t = t + '--' + r[i].innerHTML;
	for(var i = 0; i < t.length; i+=3)	{
		var c = t.charAt(i);
		if(c.match(/[a-zA-Z0-9]/))
			result = result + c;
	}
	return result;
};//window.slh_hash = function(txt)
//
// generates a printable version of the citation list
//
//----------------------------------------------------------------------------
window.slh_ce_print_sorter = function(b,a)	{
//----------------------------------------------------------------------------
	return window.slh_temp_isect[a].length < slh_temp_isect[b].length ? -1 : 
		(slh_temp_isect[a].length > slh_temp_isect[b].length ? 1 : 0);
};//window.slh_ce_print_sorter = function(b,a)
    
//----------------------------------------------------------------------------
window.slh_ce_print = function()	{
//----------------------------------------------------------------------------
	var pwin = window.open('', 'Google Scholar Citation Explorer Results-to-go',
	 			'resizable=yes,toolbar=no,location=no,menubar=yes,personalbar=no,status=no,scrollbars=yes');
	pwin.document.body.innerHTML = '<head></head>';
	var ih = "<table border=0 cellpadding='5px' cellspacing='5px' "+
			"id='slh_ce_selector_table'><tr style='background-color: #d6e3ff;'>"+
			"<td><b>Document #</b></td><td>Citation</td></tr>";
	// transfer stylesheets to printy window
	var styles = document.getElementsByTagName('style');
	for(var s = 0; s < styles.length; s++)	{
		var styl = styles[s].cloneNode(true);
		pwin.document.getElementsByTagName('head')[0].appendChild(styl);
	}
	// add root citations
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		ih += "<tr><td style='font-size: 28pt; text-align: center'>"+(r+1)+"</td><td>"+root[2]+"</td></tr>";
	}
	ih += "</table><p><hr><font size=-2>Generated by Google Scholar Citation Explorer<pre>http://compbio.cs.uic.edu/~mayank/software/slh/</pre></font><p>";
	// sort all citations by number of intersections in common
	window.slh_temp_isect = new Object(); var clist = new Array();
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
		var cites = window.slh_ce_citations[root[0]];
		for(var c = 0; c < cites.length; c++)
			if(cites[c] in window.slh_temp_isect)
				window.slh_temp_isect[cites[c]].push(r);
			else	{
				window.slh_temp_isect[cites[c]] = new Array();
				window.slh_temp_isect[cites[c]].push(r);
				clist.push(cites[c]);
			}
	}
	clist.sort(slh_ce_print_sorter);
	// print citations
	ih += "<table border=0 cellpadding = '5px' cellspacing = '5px'><tr style='background-color: #d6e3ff'>";
	for(var r = 0; r < window.slh_ce_roots.length; r++)
		ih += '<td style="font-size: 28pt; font-weight: bold">'+(r+1)+'</td>';
	ih += '<td></td></tr>';
	for(var c = 0; c < clist.length; c++)	{
		var ct = clist[c];
		var citingdocs = window.slh_temp_isect[ct];
		ih += '<tr>';
		var at = 0;
		for(var d = 0; d < window.slh_ce_roots.length; d++)	{
			ih += '<td style="font-size: 28pt; font-weight: bold">';
			if(d > citingdocs[at])
				at++;
			else 
				if(d == citingdocs[at])	{
					at++;
					ih += 'X';
				}
			ih += '</td>';
		}
		ih += '<td>'+window.slh_ce_citetext[ct]+'</td>';
		ih += '</tr>';
	}
	ih += '</table>';
	window.slh_temp_isect = undefined;	// mark for garbage collection
	pwin.document.body.innerHTML += ih;
};//window.slh_ce_print = function()
    
    
//----------------------------------------------------------------------------
window.slh_ce_citation_urls_string=function(citation){
//----------------------------------------------------------------------------
    var result="\"" + window.slh_get_citation_id(citation) + "\",";
    //get citation's primary URL
    var url = citation.match(/http:.*?\"/);
    if (url != null){
        result += "\"" + url + ",";
    } else
    	result += ",";
    //get citations cites= URL
    url = citation.match(/\/scholar\?cites=[0-9]+.*?\"/ig);
    if (url != null){
    	url[0] = "http://scholar.google.com" + url[0];
    	result += "\"" + url[0] + ",";
    } else
    	result += ",";
    
    //get citations related articles URL
    url = citation.match(/\/scholar\?q=related:.*?\"/ig);
    if (url != null){
    	url[0] = "http://scholar.google.com" + url[0];
        result += "\"" + url[0] + ",";
    } else
    	result += ",";
    
    //get citations "All versions" URL (aka cluster)
    url = citation.match(/cluster=[0-9]+.*?\"/ig);
    if (url != null){
    	url[0] = "http://scholar.google.com" + url[0];
        result += "\"" + url[0] + ",";
    } else
    	result += ",";
    return result;
};//window.slh_ce_citation_urls_string=function(citation)
    
//----------------------------------------------------------------------------
window.slh_ce_citation_title=function(citation){
//----------------------------------------------------------------------------
    var result="";
    var title=citation.match (/<h3\s>.*?<\/h3>/i);//get just the title
    if (title!=null){        
	    title=title[0].replace(/<.*?>/ig,''); //get rid of markup
	    title=title.replace(/\s*\[PDF\]*\s*|\s*\[CITATION\]*\s*|\s*\[HTML\]*\s*|\s*\[DOC\]*\s*/ig,'');
	    title=title.replace(/\"/ig,'\'');
	    result += "\"" + title + "\""; //put title in quotes, avoids commas in titles dorking CSV
    }
    return result + ",";
};//window.slh_ce_citation_title_string=function(citation)
//----------------------------------------------------------------------------
window.slh_ce_citation_count=function(citation){
//----------------------------------------------------------------------------
    var result="";
    var citedBy = citation.match(/Cited by [0-9]*/); //grab "cited by..."
    if (citedBy==null)
        citedBy=0;
    else
        citedBy = citedBy[0].replace(/Cited by /ig, ''); //get only the count
    result += citedBy;
    return result + ",";
};//window.slh_ce_citation_count=function(citation)
//----------------------------------------------------------------------------
window.slh_ce_citation_journal_title=function(citation){
//----------------------------------------------------------------------------
    var result="";
    	//check journal or such name exists
    var sourceString=citation.match (/<div class=\"gs_a\">.*?-.*?<\/div>|<div class=\"gs_a\">.*?\-.*?\-/ig);  //grab string of source
    if	(sourceString!=null){
        sourceString=sourceString[0].replace(/<a href=.*?>|<\/a>/,'');                       //get rid of any hyperlinks to authors
	    sourceString=sourceString.replace(/<div class=\"gs_a\">.*?-\s+|\&hellip;\s*/ig,'');  //get rid of authors and ellipses
	    sourceString=sourceString.replace(/\"/,'\\"');                                       //change quotes in journal to escaped quotes
	    sourceString=sourceString.replace(/,*\s*[0-9]{4}\s*\-\s*.*?<\/div>|\s*&hellip;\s*|\s*…\s*/ig,''); //get rid of year & hyphens with spaces
	    sourceString=sourceString.replace(/\s*\-\s*.*?<\/div>|\s*<\/div>/ig,''); //get rid of year & hyphens with spaces & </div> tag
	    result += "\"" + sourceString + "\"";
    }
    return result + ",";
};//window.slh_ce_citation_journal_title=function(citation)
//----------------------------------------------------------------------------
window.slh_ce_citation_publisher=function(citation){
//----------------------------------------------------------------------------
    var result="";
    	//check journal or such name exists
    var sourceString=citation.match (/<div class=\"gs_a\">.*?\-.*?<\/div>|<div class=\"gs_a\">.*?\-.*?\-/ig);  //grab string of source
    if	(sourceString!=null){
        /* get rid of authors, journal and year (usually delimtied by two hyphens, 
            but when there is no journal title, there is only one hyphen before the publisher */
	    sourceString=sourceString[0].replace(/<div class=\"gs_a\">.*?\s+-\s+.*?-\s+|\s*<\/div>|<div class=\"gs_a\">.*?\s+-\s+/ig,''); 
	    sourceString=sourceString.replace(/\s*&hellip;\s*|\s*…\s*|&hellip;|…/ig,''); 
	    sourceString=sourceString.replace(/\"/ig,'\'');
	    result += "\"" + sourceString + "\"";
    }
    return result + ",";
};//window.slh_ce_citation_publisher=function(citation)
//----------------------------------------------------------------------------
window.slh_ce_citation_year=function(citation){
//----------------------------------------------------------------------------
    var result="";
    var year=citation.match (/<div class=\"gs_a\">.*?,*\s*[0-9]{4}\s*-.*?<\/div>/ig); //get year published
//    var year=citation.match (/<div class=\"gs_a\">.*?-\s*[0-9]{4}.*?<\/div>/ig); //get year published
    if (year!=null){
	    year=year[0].match (/,\s*[0-9]{4}\s*-|\s*-\s*[0-9]{4}\s*-\s*/ig); //get the year closest to the publisher (avoids years in titles)
        if (year!=null){       
            year=year[0].match (/[0-9]{4}/); //get rid of final bits of markup
            result += year[0];
        }
    }
    if (result==""){
        result = "1492";
    }
    return result;
};//window.slh_ce_citation_year=function(citation)
//----------------------------------------------------------------------------
window.slh_ce_citation_author_string=function(citation){
//----------------------------------------------------------------------------
    var result="";
    var authorString=citation.match (/<div class=\"gs_a\">.*?\-\s+|<div class=\"gs_a\">.*?<\/div>/ig); //get author(s)
    if (authorString != null){
        authorString=authorString[0].replace(/<a href=.*?>|<\/a>/ig,''); //get rid of hrefs to user/author google scholar links
        authorString=authorString.replace(/<div class=\"gs_a\">|…\s*|\s+\-\s+|\&hellip;/ig,''); //get rid of div markup
    
        var authorsArray=authorString.split(", "); //split multiple authors
        for (var i=0; i< authorsArray.length; i++){
            var singleAuthor = authorsArray[i];
            var singleAuthorArray = singleAuthor.split(" ");
            //convert to LName, FName format and quote it for CSV use (avoids comma splitting LName & FNames)
            result += ",\"" + singleAuthorArray[singleAuthorArray.length-1] + ",";
            for (var j=0; j< singleAuthorArray.length-1; j++){
                result += " " + singleAuthorArray[j];        	
            }
            result += "\"";
        }    
        for (var j=window.slh_MAX_AUTHOR_COUNT-authorsArray.length; j>0; j--)
            result += ",";
    }
    return result;
};//window.slh_ce_citation_author_string=function(citation) 
    
// TODO: submit this and other modifications to original author for update of code base
//----------------------------------------------------------------------------
window.slh_ce_citation_as_csv =function(citation){
//----------------------------------------------------------------------------
    var result="";
    result += window.slh_ce_citation_urls_string(citation);
    result += window.slh_ce_citation_title(citation);
    result += window.slh_ce_citation_count(citation);
    result += window.slh_ce_citation_journal_title(citation);
    result += window.slh_ce_citation_publisher(citation);
    result += window.slh_ce_citation_year(citation);
    result += window.slh_ce_citation_author_string(citation);
    result += ",1" + "<br />";
    return result;
}; //window.slh_ce_citation_as_csv =function(citation)
    
    
//----------------------------------------------------------------------------
window.slh_ce_print_csv = function()	{
//----------------------------------------------------------------------------
	var pwin = window.open('', 'Google Scholar Citation Explorer Results-to-go', 
                           'resizable=yes,toolbar=no,location=no,menubar=yes,personalbar=no,status=yes,scrollbars=yes');
	pwin.document.body.innerHTML = '<head></head>';
	var ih = "citationId,citationUrl,citedByUrl,relatedArticlesUrl,clusteredArticles,title,"+
			"citedByCount,journal,publisher,year,";
	for(var z = 0; z < window.slh_MAX_AUTHOR_COUNT; z++){
		ih += "author" + z + ","
	}
	ih += "link<br />";
	// add root citations to the string to print (these are the citations
	// selected by the user for intersection comparison)
    var citeSoFar="";
    debugger;
	for(var r = 0; r < window.slh_ce_roots.length; r++)	{
		var root = window.slh_ce_roots[r];
        var citationString = window.slh_ce_citation_as_csv(root[2]);
		citeSoFar += citationString;
	}
    ih += citeSoFar;
	//now print all the "cited by" citations (the forward links)
	var cList = new Array();
	var citationKey=null;
    citeSoFar="";
	for (citationKey in window.slh_ce_citetext) {
		cList = window.slh_ce_citetext[citationKey];		
		citeSoFar =  window.slh_ce_citation_as_csv(cList);
		ih += citeSoFar;
	} //for each cited by entry	
	//now print all the (src, tgt, edge) sparse links
    citeSoFar="<br />citedBy,cited,link<br />";
	for (citationKey in window.slh_ce_citations) {
		var cList = window.slh_ce_citations[citationKey];
		for (var c = 0; c < cList.length; c++){
		    citeSoFar += "\"" + cList[c] + "\",\"" + citationKey + "\",1" + "<br />";
		}
	} //for each cited by entry	
    ih += citeSoFar;
	pwin.document.body.innerHTML += ih;
};//window.slh_ce_print_csv = function()    
//----------------------------------------------------------------------------
window.numberWithCommas = function(x)   {
//----------------------------------------------------------------------------
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
};//window.numberWithCommas = function(x)
    
slh_main();