// ==UserScript==
// @name          Redmine enhancements for Opera
// @namespace     http://userscripts.org/scripts/show/72533
// @description   Moves pagination to top, right side bar collapsed and re-styled as top bar menu 
// @version       1.8 from 21 March 2011
// ==/UserScript==

/*
Author: Alexander Pavlov
Version: 1.8 from 21 March 2011
*/

// available profiles
var profiles = [
    {
        name : "My company profile",
        regexp : /redmine\.mycompany\.com/i,  // RegExp which allows to activate profile depending
        finishedStatuses : [4,5,6],            // IDs of statuses which denote finished issues (i.e Resolved,Closed,Rejected and so on)
        discussionStatuses : [3],              // IDs of statuses which denote issues being discussed (i.e Discussion and so on)
        lowPriorities : [1],                   // IDs of low priorities
        normalPriorities : [2],                // IDs of normal priorities
        highPriorities : [3,4,5],              // IDs of high priorities
        columnNamesForHighlightDiscussion : ['subject','estimated_hours'] // what columns should be marked with red '???' if issue is being discussed
    }
    ,{
        name : "Generic profile (based on redmine.org settings)",
        regexp : /(?:^|\.)redmine\..*$/i,
        finishedStatuses : [3,5], // Resolved, Closed
        discussionStatuses : [1], // New
        lowPriorities : [1], // Low
        normalPriorities : [2], // Normal
        highPriorities : [3,4], // High, Urgent
        columnNamesForHighlightDiscussion : ['subject','estimated_hours']
    }
];

// find profile
var activeProfile = null;
for (var i=0; i < profiles.length; i++) {
    if (profiles[i].regexp.test(window.location.hostname)) {
        activeProfile = profiles[i];
        break;
    }
}
		
// inject CSS&JS
if (activeProfile != null) window.addEventListener("DOMContentLoaded", function() {
	// determine active project
	var projectUidRegExp = new RegExp('/search/index/(.+)')
	var projectUid = null;
	if (document.getElementById('quick-search') != null) {
		var searchaction = document.getElementById('quick-search').getElementsByTagName("form")[0].action
		if (projectUidRegExp.test(searchaction)) {
			projectUid = projectUidRegExp.exec(searchaction)[1];
		}
	}

	// version DD
  var versionDD = document.getElementById("issue_fixed_version_id")
	if (versionDD != null) {
		var top = versionDD.top;
		var left = versionDD.left + versionDD.width	
		var popup = '<div id="versionPopup" class="box" style="border:black solid 2px;background-color:#d7d7d7;position:absolute;top:'+top+'px;left:'+left+'px;z-index:1"><p>																																																					\
			 <label for="version_name">Name<span class="required"> *</span></label>																												\
			 <input id="version_name" name="version[name]" size="60" type="text" value="">																								\
			 </p><p>																																																											\
			 <label for="version_description">Description</label>                                                                          \
			 <textarea accesskey="e" class="wiki-edit" cols="60" id="version_description" name="version[description]" rows="10"></textarea>\
			 </p><p>																																																												\
			 <label for="version_effective_date">Date</label>																																								\
			 <input id="version_effective_date" name="version[effective_date]" size="10" type="text">																				\
			 <img alt="Calendar" class="calendar-trigger" id="version_effective_date_trigger" src="/images/calendar.png">										\
			</p>																																																														\
		  <div align="right"> <input value="Create" size="10" type="button" onclick="createNewVersion()">																\
		  <input value="Cancel" size="10" type="button" onclick="hideVersionPopup()"></div>																											\
			</div>																																																											\
		'
		var div = document.createElement("div");
		div.innerHTML = popup;

		document.createNewVersion = function() {
			var name = versionDD.form.elements["version[name]"].value;
			var desc = versionDD.form.elements["version[description]"].value;
			var effective_date = versionDD.form.elements["version[effective_date]"].value;
			if (name == "") {
			    return;
            }
			var ajaxUrl = '/projects/add_version/'+projectUid
                + '?version[name]=' + encodeURIComponent(name)
                + '&version[description]=' + encodeURIComponent(desc)
                + '&version[effective_date]=' + encodeURIComponent(effective_date)
            new Ajax.Request(ajaxUrl, {
                method:'post',
                asynchronous:false,
                evalScripts:false,
                onSuccess: function(transport) {
                    var versionIdRegEx = new RegExp('<a href="/versions/show/(\\d+)">'+name+'</a>')
                    var matchingResults = versionIdRegEx.exec(transport.responseText);
                    if (matchingResults == null) {
                        alert("Ops! Cannot retrieve version id. Try to reload page, probably it would appear in dropdown menu.")
                    } else {
                        versionDD.options[versionDD.options.length] = new Option(name, matchingResults[1]);
                        versionDD.selectedIndex = versionDD.options.length-1;
                    }
                    versionDD.parentNode.removeChild(div);
                }
            });
		}
		document.hideVersionPopup = function() {
			versionDD.parentNode.removeChild(div);
		}
		document.addNewVersionClicked = function() {
			versionDD.parentNode.appendChild(div);
  		    Calendar.setup({inputField : 'version_effective_date', ifFormat : '%Y-%m-%d', button : 'version_effective_date_trigger' });
		}

		var addNewLink = document.createElement("a");
		addNewLink.setAttribute("onclick", "document.addNewVersionClicked()");
		addNewLink.className = "small";
		addNewLink.innerText = "New version";
		versionDD.parentNode.insertBefore(addNewLink, versionDD.nextElementSibling);
	}
	// end version DD customization code


var css = document.createElement('style');
css.type = 'text/css';

// re-define CSS styles
var styles = '																																		\
  #wrapper, #wrapper2 {padding: 0px !important; }                                 \
  #footer div.bgl, #footer div.bgr {background-Image:none }                       \
	#header, #top-menu, #main, #footer {                             							  \
		margin:0px !important;                                                        \
	}                                                                               \
	div#ads {display:none}                                                          \
	#main-menu li a {                                                               \
		padding-left: 5px !important;                                                 \
		padding-right: 5px !important;                                                \
		border-top:1px solid #eeeeee;                                                 \
		border-left:1px solid #eeeeee;                                                \
		border-right:1px solid #eeeeee;                                               \
	}                                                                               \
	table.list th, table.list td {                                                  \
		text-align:left;                                                              \
		padding:2px 10px 2px 0px !important;                                          \
		border: 1px solid lightgrey;                                                  \
	}                                                                               \
	                                                                                \
	                                                                                \
	tr.issue td.subject, tr.issue td.category , tr.issue td.assigned_to             \
		, tr.issue td.fixed_version, table.list th {                                  \
	white-space: normal !important;                                                 \
	}                                                                               \
	                                                                                \
	html > body div#content {                                                       \
		width:auto !important;                                                        \
		padding:1px !important;                                                       \
		clear:both  !important;                                                       \
	}                                                                               \
	                                                                                \
	html > body div#content table.list {                                            \
		width:100% !important;                                                      	\
	}                                                                               \
	                                                                                \
	#sidebar {                                                                      \
		float: none !important;                                                       \
		width: 100% !important;                                                       \
		position: relative;                                                           \
		z-index: 0;                                                                   \
		min-height: 0px !important;                                                   \
		padding: 5px 0px 5px 0px !important;                                          \
		display:inline !important;                                                    \
	}                                                                               \
	                                                                                \
	div#sidebar > * {                                                               \
		display:none;                                                                 \
	}                                                                               \
	                                                                                \
	div#sidebar > FORM > * {                                                        \
		display:none;                                                                 \
	}                                                                               \
	                                                                                \
	                                                                                \
	#sidebar h3, #sidebar FORM, #sidebar FORM h3 {                                  \
		display: inline;                                                              \
		border: none !important;                                                      \
		cursor:pointer;                                                               \
	}                                                                               \
	                                                                                \
	#sidebar h3:hover {  																                            \
		text-decoration: underline !important;                                        \
		color:blue !important;                                                        \
	}                                                                               \
	                                                                                \
	.pagination, .icon {                                                            \
		margin-right:10px;                                                            \
	}                                                                               \
	                                                                                \
	.context-menu-selection, .context-menu-selection a, .context-menu-selection td {\
		color: white !important;                                                      \
		background-color: blue !important;                                            \
	}                                                                               \
	                                                                                \
	.attachments:before {                                                           \
		content:'+"'Attachments';"+'			                                              \
		font-weight:bold;                                                             \
		border-top: #cccccc 1px solid;                                                \
		display:block;                                                                \
		padding-top:5px;                                                              \
		margin-bottom:10px;                                                           \
	}                                                                               \
	div.journal h4 ~ ul, div.journal div.wiki {                                     \
		display:none;             			                                              \
	}                                                                               \
';                                                                              
    // green subject on issue form for finished issues
    if (activeProfile.finishedStatuses.length > 0) {
        for (var i=0; i < activeProfile.finishedStatuses.length; i++) {
            // redmine 0.8
            styles += '\ndiv[class~="issue"][class~="status-'+activeProfile.finishedStatuses[i]+'"] > h3 {color:green !important;}';
            // redmine 0.9+
            styles += '\ndiv[class~="issue"][class~="status-'+activeProfile.finishedStatuses[i]+'"] > div.subject h3 {color:green !important;}';
        }
    }
    // red subject on issue form for issues being discussed
    if (activeProfile.discussionStatuses.length > 0) {
        for (var i=0; i < activeProfile.discussionStatuses.length; i++) {
            // redmine 0.8
            styles += '\ndiv[class~="issue"][class~="status-'+activeProfile.discussionStatuses[i]+'"] > h3 {color:red !important;}';
            // redmine 0.9+
            styles += '\ndiv[class~="issue"][class~="status-'+activeProfile.discussionStatuses[i]+'"] > div.subject h3 {color:red !important;}';
        }
    }
    // red ??? sign after value in choosen columns for issues being discussed
    if (activeProfile.discussionStatuses.length > 0 && activeProfile.columnNamesForHighlightDiscussion.length > 0) {
        for (var i=0; i < activeProfile.discussionStatuses.length; i++) {
            for (var j=0; j < activeProfile.columnNamesForHighlightDiscussion.length; j++) {
                styles += '\ntr[class~="issue"][class~="status-'+activeProfile.discussionStatuses[i]+'"] td.'+activeProfile.columnNamesForHighlightDiscussion[j]+":after {content:'???';font-weight:bold;color:red;}\n";
            }
        }
    }
    // add even/odd colouring for low priority in search
    if (activeProfile.lowPriorities.length > 0) {
        for (var i=0; i < activeProfile.lowPriorities.length; i++) {
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.lowPriorities[i]+'"][class~="odd"] td {background-color:#D3F9BC;}';
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.lowPriorities[i]+'"][class~="even"] td {background-color:#BCF799;}';
        }
    }
    // add even/odd colouring for normal priority in search
    if (activeProfile.normalPriorities.length > 0) {
        for (var i=0; i < activeProfile.normalPriorities.length; i++) {
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.normalPriorities[i]+'"][class~="odd"] td {background-color:#F4F4F4;}';
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.normalPriorities[i]+'"][class~="even"] td {background-color:#FFF4FF;}';
        }
    }
    // add even/odd colouring for high priority in search
    if (activeProfile.highPriorities.length > 0) {
        for (var i=0; i < activeProfile.highPriorities.length; i++) {
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.highPriorities[i]+'"][class~="odd"] td {background-color:#FFEEDD;}';
            styles += '\ntr[class~="issue"][class~="priority-'+activeProfile.highPriorities[i]+'"][class~="even"] td {background-color:#FFDDCC;}';
        }
    }

    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
	
	// customize title
  var ticketTitleRegEx = /^[^#]*#(\d+):(.*)$/;
  if (ticketTitleRegEx.test(document.title)) {
    var matchingResults = ticketTitleRegEx.exec(document.title);
    document.title = matchingResults[1]+matchingResults[2]
  } else {
	  var titleRegEx = /^([^\s]+) - (.*)$/;
	  if (titleRegEx.test(document.title)) {
	    var matchingResults = titleRegEx.exec(document.title);
	    document.title = matchingResults[1].substr(0,3)+":"+matchingResults[2]
	  }
  }
    
	// customize sidebar 
	var h3list = document.getElementById("sidebar").getElementsByTagName("h3");      
	for(var i=0; i<h3list.length; i++) {
		h3list[i].onclick = function (e) {
			var h3 = e.currentTarget;
			for(var elt=h3.nextElementSibling; elt != null && elt.tagName != "H3"; elt = elt.nextElementSibling) {
					if (typeof(elt.tagName) != "undefined" && elt.tagName != "SCRIPT" && elt.tagName != "IFRAME") {
						if (elt.style.display != "run-in") {
							elt.style.display="run-in";
					  }	else {
  						elt.style.display="none";
						}				  	
					}
			}
		}
	}
	
	// customize pagination
	var plist = document.getElementById("content").getElementsByTagName("p");      
	var pagination = null;
	for(var p=0; p<plist.length; p++) {
		if (plist[p].className == "pagination") {
			pagination = plist[p];
			break;
		}
	}	
	if (pagination != null) {
			var divlist = document.getElementById("content").getElementsByTagName("div");      
			var contextual = null;
			for(var d=0; d<divlist.length; d++) {
				if (divlist[d].className == "contextual") {
					contextual = divlist[d];
					break;
				}									
			}						
			if (contextual == null) {
				contextual = document.createElement("div");
				contextual.className = "contextual";
				document.getElementById("content").insertBefore(contextual, document.getElementById("content").firstElementChild);
			}
			pagination.parentNode.removeChild(pagination)
			pagination.style.display="inline";
			contextual.insertBefore(pagination, contextual.firstElementChild)					
	}

	// find wiki links and urls
  var wikiPageRegEx = /^\[\[(.+)\]\]$/;
  var urlRegEx = /^((https?)|(s?ftp)|(file))\:\/\/\S+$/;
  //var urlRegEx = /^http\:\/\/.+$/;
	$$('p.author + table td > p').each(function(td) {
			if(td.children.length == 0) {
				var t = td.innerText;
  			if (wikiPageRegEx.test(t)) {
    			var matchingResults = wikiPageRegEx.exec(t);
    			td.innerHTML = "<a href='/wiki/"+projectUid+"/"+matchingResults[1]+"'>"+matchingResults[1]+"</a>"
				} else if (urlRegEx.test(t)) {
    			td.innerHTML = "<a href='"+t+"'>"+t+"</a>"
				}
			}	
		});
			
	// customize ticket change log
	document.expand_all_journal_logs = function () {
		$$('a.expand_log_record').each(function(expand) {
			if (expand.style.display != "none") {
				expand.onclick();
			}
		});
	}
	document.collapse_all_journal_logs = function () {
		$$('a.collapse_log_record').each(function(collapse) {
			if (collapse.style.display != "none") {
				collapse.onclick();
			}
		});
	}
	document.change_journal_log_view = function (journal, index) {
		// check entry conditions
		if (journal.getElementsByTagName("h4").length != 1) {
			// do nothing
			return;
		}
		// find date reference
		var h4 = journal.getElementsByTagName("h4")[0];
	  var dateRefRegEx = /^.*\/activity\b.*from=.*$/;
  	var a_list = h4.getElementsByTagName("a");
  	var dateRef = null;
		for (var ai=0; ai < a_list.length; ai++) {
			if (dateRefRegEx.test(a_list[ai].href)) {
				dateRef = a_list[ai];
				break;
			}
		}
		if (dateRef != null && dateRef.title != null) {
			var span = document.createElement("span");
			span.innerHTML = '&#160;('+dateRef.title+')';
			h4.appendChild(span);
		}

		// find hidden elements
		var siblings = new Array();
		for (var s = h4.nextElementSibling;s != null && s.parentNode == journal; s = s.nextElementSibling) {
			siblings[siblings.length] = s;
		}
		if (siblings.length == 0) {
			return;
		}
		// Expand link
		var expand = document.createElement("a");
		expand.className="expand_log_record";
		expand.onclick = function() {
			for (var i=0; i<siblings.length; i++) {
				siblings[i].style.display = "run-in"
			}
			expand.style.display="none";
			collapse.style.display="inline";
		}
		expand.innerText="Expand"

		// Collapse link
		var collapse = document.createElement("a");
		collapse.style.display="none";
		collapse.className="collapse_log_record";
		collapse.onclick = function() {
			for (var i=0; i<siblings.length; i++) {
				siblings[i].style.display = "none"
			}
			expand.style.display="inline";
			collapse.style.display="none";
		}
		collapse.innerText="Collapse"
		
		// Expand all link
		var expandAll = document.createElement("a");
		expandAll.onclick = document.expand_all_journal_logs;
		expandAll.innerText="Expand all"

		// Collapse all link
		var collapseAll = document.createElement("a");
		collapseAll.onclick = document.collapse_all_journal_logs;
		collapseAll.innerText="Collapse all"

		var span = document.createElement("span");
		span.style="float:right;padding-right:20px";
		span.appendChild(expand);
		span.appendChild(collapse);
		span.appendChild(document.createTextNode(" / "));
		span.appendChild(expandAll);
		span.appendChild(document.createTextNode(" / "));
		span.appendChild(collapseAll);
		h4.appendChild(span);
	}
	$$('div.journal').each(document.change_journal_log_view);
}, false);