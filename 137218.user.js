// ==UserScript==
// @name 	    GCTableSorter
// @description  Makes list and tables sortable (on geocaching.com)
// @include        http://*.geocaching.com/bookmarks/view.*
// @include        http://*.geocaching.com/my/logs.*
// @include        http://*.geocaching.com/seek/nearest.*
// @grant          GM_addStyle 
// @grant          GM_log
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
 
//Copyright (C) 2012  Skywalker90

var $;
var jQuery;
//var anzRowsLoad = 1000;
var table;
var toolTipData = new Array();
var gcVoteInitStarted = false;
var isPremium = false;

//tableSorter images  * Copyright (c) 2007 Christian Bach * Licence: MIT (http://www.opensource.org/licenses/mit-license.php)
var tableSorterDown = 'data:image/png;base64,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%3D%3D';
var tableSorterUp = 'data:image/png;base64,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%3D';
var tableSorterBoth = 'data:image/png;base64,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%3D%3D';
//tableSorter images end

 if (typeof(GM_addStyle) == "undefined" || (GM_addStyle.toString && GM_addStyle.toString().indexOf("not supported") != -1)) {
    GM_addStyle = function(style){
        var styleElement = document.createElement('style');
        styleElement.innerHTML = style;
        document.body.appendChild(styleElement);
    }
}

var init = function (){
	if (typeof(opera) != "undefined"){
		window.addEventListener('DOMContentLoaded', activate, true);
	}
	else{
		activate();
	}
}

var activate = function(){
	this.$ = this.jQuery = window.jQuery.noConflict(true);
    
	isPremium =  ($("#ctl00_litPMLevel").length > 0 && $("#ctl00_litPMLevel")[0].textContent.indexOf("Premium") != -1);
	//load tablesorter jquery plugin
	tableSorterLoad($);
	initSorters();
	
	if (document.URL.search("\/bookmarks\/view\.aspx") >= 0) {
		handleBookmarkList();
	}
	
	if (document.URL.search("\/my\/logs\.aspx") >= 0) {
		handleLogList();
	}
	
	if (document.URL.search("\/seek\/nearest\.aspx") >= 0) {
		handleNearest();
	}
}

var handleBookmarkList =function(){
	//load tooltip jquery plugin
	tooltipLoad($);
	initToolTips();

	$("[id*=dataRow2]").each(function(i,e){ 
		//gcCode = $(e).prev().children("td")[2].children[0].innerText;
		($(e).prev()[0]).title = ($(e).children()[1]).innerText;		
		$($(e).prev()[0]).qtip({position: {
             target: 'mouse',
             adjust: { x: 5, y: 5 },
             viewport: $(window)
        }});
		//text = ($(e).children()[1]).innerText;
		
		//toolTipData[gcCode]=text;
		$(e).remove();
	});


	$("[rowspan*=2]").attr("rowspan",1);

	table = $(".Table.NoBottomSpacing");

	$(table).tablesorter({ 
		headers: {
			0:{ sorter:'checkbox' },
			1: { sorter:'dist' },            
			4: { sorter: false },
            5: { sorter:'gcVote' }
		},
		widgets: ["zebra"],  		
		widgetOptions: {
		    zebra: ["SolidRow", "AlternatingRow"]
		}
	}); 
	
	//WaitForGcVote
	$(table).find('thead')[0].addEventListener ("DOMNodeInserted", function(e){		
        if(!gcVoteInitStarted){
            gcVoteInitStarted = true;	            
            $(table).trigger("updateAll");
        }		
	});
	
    var voteElements = $('.Table td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 });
    if(voteElements.length > 0){
        voteElements.bind("DOMNodeInserted", function(e){		
            if(!gcVoteInitStarted && $('.Table td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 }).length == 0){
                $('.Table td').filter('[name^="td"]').unbind("DOMNodeInserted");
                gcVoteInitStarted = true;	            
                $(table).trigger("updateAll");
            }		
        });
    }
    else{
        $(table).trigger("updateAll");
    }
	
	$('#ctl00_ContentBody_ListInfo_cboItemsPerPage').after("<p><a style='cursor:pointer;' id='loadAllLinesLink'>Load all lines</a></p>");
    $('#loadAllLinesLink').click(function(){
        startGetBookmarkPages();
    });
}

var handleLogList =function(){
	table = $(".Table")[0];
	var head = document.createElement("thead");
	
	head.innerHTML="<tr><th/><th/><th>Date</th><th>Name</th><th>Location</th><th/></tr>";
	table.insertBefore(head, table.children[0]);
	
	$(table).tablesorter({ 
		dateFormat : "mmddyyyy",
		headers: {	
			0: { sorter: "imageTitle" },
			1: { sorter: false },
			2: { sorter: "shortDate" },
			5: { sorter: false },
            6: { sorter:'gcVote' }
		},
		widgets: ["zebra"],  		
		widgetOptions: {
		    zebra: ["SolidRow", "AlternatingRow"]
		}
	}); 
	
	//WaitForGcVote
	$(table).find('thead')[0].addEventListener ("DOMNodeInserted", function(e){		
        if(!gcVoteInitStarted){
            gcVoteInitStarted = true;	            
            $(table).trigger("updateAll");
        }		
	});
	
    var voteElements = $('.Table td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 });
    if(voteElements.length > 0){
        voteElements.bind("DOMNodeInserted", function(e){		
            if(!gcVoteInitStarted && $('.Table td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 }).length == 0){
                $('.Table td').filter('[name^="td"]').unbind("DOMNodeInserted");
                gcVoteInitStarted = true;	            
                $(table).trigger("updateAll");
            }		
        });
    }
    else{
        $(table).trigger("updateAll");
    }
}

var handleNearest =function(){	
	table = $(".SearchResultsTable")[0];
	
	var header = $($(table).children("tbody")[0].firstChild).hide();
	
	var head = document.createElement("thead");
	
	$(head).append(header);
	
	$(head).find("[colspan*=2]").attr("colspan",1).before('<th>  Type </div> </th>');
	
	$(table).children("tbody").before(head);
	
	$(head.children[0]).show();
	
	if(isPremium){
		$(table).tablesorter({ 
			headers: {
				0:{ sorter:'checkbox' },
				1: { sorter:'dist' },
				2: { sorter: false },
				3: { sorter: "imageTitle" },
				4: { sorter: "imageTitleInA" },
				5: { sorter: "desc" },
				6: { sorter: "hasChildren" },
				7: { sorter: false },
				8: { sorter: false },
				9: { sorter: false },
				10: { sorter: false },
                11: { sorter:'gcVote' }
			},
			widgets: ["zebra"],  		
			widgetOptions: {
			    zebra: ["SolidRow", "AlternatingRow"]
			}
		}); 
	}
	else
	{
		$(table).tablesorter({ 
			headers: {
				0:{ sorter:'checkbox' },
				1: { sorter:'dist' },
				2: { sorter:'favPoints' },
				3: { sorter: "imageTitle" },
				4: { sorter: "imageTitleInA" },
				5: { sorter: "desc" },
				6: { sorter: "hasChildren" },
				7: { sorter: false },
				8: { sorter: "shortDateSpecial" },
				9: { sorter: "shortDateSpecial" },
				10: { sorter: false },
                11: { sorter:'gcVote' }
			},
			widgets: ["zebra"],  		
			widgetOptions: {
			    zebra: ["SolidRow", "AlternatingRow"]
			}
		}); 
	}
	//WaitForGcVote
	$(table).find('thead')[0].addEventListener ("DOMNodeInserted", function(e){		
        if(!gcVoteInitStarted){
            gcVoteInitStarted = true;	            
            $(table).trigger("updateAll");
        }		
	});
	
    var voteElements = $('.SearchResultsTable td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 });
    if(voteElements.length > 0){
        voteElements.bind("DOMNodeInserted", function(e){		
            if(!gcVoteInitStarted && $('.SearchResultsTable td').filter('[name^="td"]').filter(function(i,e){ return $(e).children().length == 0 }).length == 0){
                $('.SearchResultsTable td').filter('[name^="td"]').unbind("DOMNodeInserted");
                gcVoteInitStarted = true;	            
                $(table).trigger("updateAll");
            }		
        });
    }
    else{
        $(table).trigger("updateAll");
    }
    
    $('#ctl00_ContentBody_LocationPanel1_lnkNewSearch').parent().after("<li><a style='cursor:pointer;' id='loadAllLinesLink'>Load all lines</a></li>");
    $('#loadAllLinesLink').click(function(){
        startGetListPages();
    });
}

var initSorters = function(){
	GM_addStyle("th.tablesorter-header { background-image: url("+tableSorterBoth+");  background-repeat: no-repeat; background-position: center right; cursor: pointer;}"+
			   "th.tablesorter-headerAsc { background-image: url("+tableSorterDown+"); background-repeat: no-repeat; background-position: center right;}"+
			   "th.tablesorter-headerDesc { background-image: url("+tableSorterUp+");  background-repeat: no-repeat; background-position: center right;}"+
               "th.sorter-false {background-image: none; padding: 4px;}");
	
	$.tablesorter.addParser({ 
        // set a unique id 
        id: 'dist', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s) { 		
		// format your data for normalization 	
		if(s == ""){
			return 0;
		}
		
		var dist = /[0-9]+\.[0-9]+/.exec(s);
		if(dist == null){
			dist = /[0-9]+/.exec(s);
			dist[0] = dist[0] + ".0";
		}
		
		return $.tablesorter.formatFloat(dist[0]); 	   
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    });      
    
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'imageTitle', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 
		return (cell.children.length>0?cell.children[0].title:"");
        }, 
        // set type, either numeric or text 
        type: 'text' 
    });      

       $.tablesorter.addParser({ 
        // set a unique id 
        id: 'imageTitleInA', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 
		return ((cell.children.length>0&&cell.children[0].children.length>0)?cell.children[0].children[0].title:"");
        }, 
        // set type, either numeric or text 
        type: 'text' 
    });      

    
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'checkbox', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 	
		if(cell.children.length < 1)
		{
			return -1;
		}
		
		if(cell.children[0].onchange == null)
		{
			cell.children[0].onchange = function() { $(table).trigger("update"); };
		}
		return (cell.children[0].checked?1:0);
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    });      
    
      $.tablesorter.addParser({ 
        // set a unique id 
        id: 'gcVote', 
        is: function(s, table, cell, cellIndex) { 
            // return false so this parser is not auto detected 
            //return $(cell).find('td [name^="td"]').length > 0; 
            return false;   
        }, 
        format: function(s, table, cell, cellIndex) { 		
		if (!cell.children[0] || !cell.children[0].children[0] || !cell.children[0].children[0].children[1])
		{
			return $.tablesorter.formatFloat("0.0");
		}
		
		var img = cell.children[0].children[0].children[1];
		
		var title = img.title;
		valueString= title.match(/[0-9]\.[0-9]/);
		if(valueString.length != 1)
		{
			return $.tablesorter.formatFloat("0.0");
		}
		
		return $.tablesorter.formatFloat(valueString[0]);
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    });    
    
	$.tablesorter.addParser({ 
        // set a unique id 
        id: 'favPoints', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 		
		if (s == "")	{
			return $.tablesorter.formatFloat("0.0");
		}
		else{
			return $.tablesorter.formatFloat(s);
		}
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    });  
    
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'desc', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 			
		return s;
        }, 
        // set type, either numeric or text 
        type: 'text' 
    });   
    
    $.tablesorter.addParser({ 
        // set a unique id 
        id: 'hasChildren', 
        is: function(s) { 
		// return false so this parser is not auto detected 
		return false; 
        }, 
        format: function(s, table, cell, cellIndex) { 		
		if(cell.children.length>0){
			if($(cell).find('[name="first aid icon"]').length >0 ) {
				return 1;
			}
			else{
				return 2;
			}
		}
		else{
			return 0;
		}
        }, 
        // set type, either numeric or text 
        type: 'numeric' 
    });  
    
	$.tablesorter.addParser({
		id: "shortDateSpecial",
		is: function (s) {
		    return false;
		}, format: function (s, table) {
		    var c = table.config;
		    s = /[0-9][0-9][/-][0-9][0-9][/-][0-9][0-9][0-9][0-9]/;
		    s = s.replace(/\-/g, "/");
		    if (c.dateFormat == "us") {
			// reformat the string in ISO format
			s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
		    } else if (c.dateFormat == "uk") {
			// reformat the string in ISO format
			s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
		    } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
			s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
		    }
            var date = new Date(s).getTime();
            if(date == "Invalid Date"){
                return 0.0;
            }
		    return $.tablesorter.formatFloat(date);
		}, type: "numeric"
	});
	
}

var initToolTips = function(){
    /* qTip2 v2.1.1 None | qtip2.com | Licensed MIT, GPL | Thu Jul 11 2013 14:03:07 */
	GM_addStyle(".qtip{position:absolute;left:-28000px;top:-28000px;display:none;max-width:280px;min-width:50px;font-size:10.5px;line-height:12px;direction:ltr;box-shadow:none;padding:0}.qtip-content{position:relative;padding:5px 9px;overflow:hidden;text-align:left;word-wrap:break-word}.qtip-titlebar{position:relative;padding:5px 35px 5px 10px;overflow:hidden;border-width:0 0 1px;font-weight:700}.qtip-titlebar+.qtip-content{border-top-width:0!important}.qtip-close{position:absolute;right:-9px;top:-9px;cursor:pointer;outline:medium none;border-width:1px;border-style:solid;border-color:transparent}.qtip-titlebar .qtip-close{right:4px;top:50%;margin-top:-9px}* html .qtip-titlebar .qtip-close{top:16px}.qtip-titlebar .ui-icon,.qtip-icon .ui-icon{display:block;text-indent:-1000em;direction:ltr}.qtip-icon,.qtip-icon .ui-icon{-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px;text-decoration:none}.qtip-icon .ui-icon{width:18px;height:14px;line-height:14px;text-align:center;text-indent:0;font:400 bold 10px/13px Tahoma,sans-serif;color:inherit;background:transparent none no-repeat -100em -100em}.qtip-focus{}.qtip-hover{}.qtip-default{border-width:1px;border-style:solid;border-color:#F1D031;background-color:#FFFFA3;color:#555}.qtip-default .qtip-titlebar{background-color:#FFEF93}.qtip-default .qtip-icon{border-color:#CCC;background:#F1F1F1;color:#777}.qtip-default .qtip-titlebar .qtip-close{border-color:#AAA;color:#111}");
}

var startGetBookmarkPages = function(){
    $('#loadAllLinesLink').text('Please wait...').unbind("click");
    
    if($('.PageBuilderWidget').text().indexOf('Page: 1 of 1'+String.fromCharCode(160)+'-') != -1){
        addPager();
        $('#loadAllLinesLink').text('All lines loaded');
        return;
    }
    
    var hiddenForm = $('form');
    var viewStateCount = $(hiddenForm).find("#__VIEWSTATEFIELDCOUNT")[0].value;
    var postDataString = /*"__EVENTTARGET=ctl00%24ContentBody%24pgrTop%24lbGoToPage_"+pageNumber+"*/ "__EVENTTARGET=ctl00$ContentBody$ListInfo$cboItemsPerPage&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATEFIELDCOUNT=" + encodeURIComponent(viewStateCount);
    postDataString += (($(hiddenForm).find("#__VIEWSTATE").length == 1) ? ("&__VIEWSTATE=" + encodeURIComponent($(hiddenForm).find("#__VIEWSTATE")[0].value)) : "");

    for (i = 1; i < viewStateCount; i++) {
        postDataString += (($(hiddenForm).find("#__VIEWSTATE" + i).length == 1) ? ("&__VIEWSTATE" + i + "=" + encodeURIComponent($(hiddenForm).find("#__VIEWSTATE" + i)[0].value)) : "");
    }

    postDataString += "&ctl00$ContentBody$ListInfo$cboItemsPerPage=1000";

    var request = new window.XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            if (navigator.userAgent.indexOf("Firefox")!=-1) {
                setTimeout(function () {
                    handleBookmarkPageData(request.responseText);
                }, 0);
            } else {
                handleBookmarkPageData(request.responseText);
            }
        } else if (request.readyState == 4) {
            alert("Error while getting pages: " + request.status + " " + request.statusText);
        }
    };
    request.open("POST", document.URL, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(postDataString);
}

var handleBookmarkPageData = function(data){
    var newBody = $(data).find('.Table tbody');
    $('.Table').find('tbody').replaceWith(newBody);
    $("[id*=dataRow2]").each(function(i,e){		
		($(e).prev()[0]).title = ($(e).children()[1]).innerText;		
		$($(e).prev()[0]).qtip({position: {
             target: 'mouse',
             adjust: { x: 5, y: 5 },
             viewport: $(window)
        }});	
		$(e).remove();
	});
    $("[rowspan*=2]").attr("rowspan",1);
    $(table).trigger("updateAll");  
    addPager();
    
    $('#loadAllLinesLink').text('All lines loaded');     
}


var addPager = function(){
    loadPager();
    $(table).prev().remove();
    
    $(table).next().replaceWith(
    '<div id="pager" class="pager">'+
    '  <form>'+
    '    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH7SURBVDhPjZNNaxRBEIYLgnjRQy4rBBSixCCTJYqJi+hqFL9YDNGL6MGDYHIZD8YEPfiBC6K/YP6AiD9BJEgIS0bEg4iEkBFPHjyIK8JePAiv9XSmZddEsKDome56n6qu7ra/rX/JBiotG3dvVJbsSnC+fY61Mmyj+eK2yrKN1T5aOqW+bEZD+ayq7Rvu17QzP//LskOrlhJDbClbtyBuWd2DmjeVFPd1QA90UI9VC873HY3qugaLcz+sSWwPBGop7jzSuJ7osBgBRRhzD33Oq+mc+eoQ1wQx+6JsMkfxXVU3+EVt/QO5pO3F2DtL0RrNuaAtGZkIYNz9zDSyaD3i5JVpXkmIYTz5yTK0ABrT2pNTJn7P99oNQLzruQXAnPaFBMT4NnK0xjHRaZrFQgQgOP3Fwnf8B0B2Ys9+szbaAEiV9AAGn24OuKXhAKFSXysBXgbnHLtN2RFAcHdFAIhj/sRa3II3ovHTstsupAoABCcL6wIcCHOzGgoxV7VDx1tlEzmK/R8svaz+cIEiBI8AhPyzRvaJFSuGF8tjxLgUpz5b04+zQzYCY6l4BNPAiVXr1F52XSSMa+nl1J3cnPxuhb8DsSV6gpgq/PKo/taK2otNrjIWIE6tLlt69I1lx95b7sC2j+0jry33rNnehX88pm5jXzTH/T+es9lv8tnDOgps134AAAAASUVORK5CYII=" class="first"/>'+
    '    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAINSURBVDhPjZO7a1RREMY/EDst0qwgCCZxE2RZVExcRFcT8cWiaCVaWAhqcy2MiiI+cEH0L7hNCgsRsRARkSAWEpZcEQsJQYJXrCwsxBVhGwthnN/Ze9aND3BgOK/5vvnOnDn63QZmtbrU0rh7ozSrY8GZ+x5nRdif5ocrSnMaq71XcsiWpaetnE1ZtX3G/YStyQ78ULplUQkxxBawrgVwS3UPap61Sn7NNtl122y3rBac+SXbYCdtMN//TU1il5DAWoA7N23cbttWY4QokrF3w/dcTWfvZydxTABzL2STOYKverYLVrErVu35eVvfIzliK/OxN0rAiuIctuUpmfrB6x5rCZg1+8Qw7vqgFCwEjVM2nCETJ3jovnoE52zU1k5315yRiCR+jQyseCYqTbEADN1T8AgAHAgedddkJ3bfF7XBBoLEKoEA5vJT2eDdXwqGH/j6jq8fKqiBBKV7PkUCl8E7x2pf9gzlJwpOMA4ZDgFx7E2+i1fwQjS+K73o2VARZY7MdAExK8qmrBxijtsq29kqishTbFxQctQGQgNR5QiKBAAZY4KJt8pHXxTPiNEUuz+q6c/ZoQ4ERqk4c/ZQNrGoTu1ZXyNhtKXLqTtz8+BX5f4PjCtRE8Bk9+ax+mvltZm/tDIWSJy1Oqdk+yulO+aVOWHbx/a2l8o8azry/B+fqd+4F8Vx/4/vLP0EC77De6ZFjCcAAAAASUVORK5CYII=" class="prev"/>'+
    '    <span class="pagedisplay"></span>'+
    '    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAICSURBVDhPjZMxa1RBFIUviJ0WaTYgWKxrEmRZVExcRFcTSVQWRSvRwkJQmydoVCJiFBdC/AWvlxBExFrEQsKSJ2IhIhJ8YmVhIa4I21gIx/vNvgkbo+CFw8ybOefMvXfm2Z8xsGRbSm0bczRLS3Y2gLmvsVfQ1odvbiot22j9oyUntSG9pKFsWrXOZcd5bc2O/7J074olcOAWsl4EcdsaTmpdVTW/o926qz2aVz2A+U3t1AWV82M/rAV3jQmuhbg7pzHd1z4xYhTNWLvna55N98hXN3FNEFMXaXNyFF/TiG6rtoppDYUxmpzW5nz0jSVojeac0saUkyDMeqqVR7YqAtsWe983VA0cxsOfLEWLQfOiKhlpgiB4aAGIbjkZA3BFlVASh3gZGVrjmug0zWIjngi2P7FQDvPygqnyuPcN9+g366ANBomq6wwgM7IWxF4WI99kOvUlGnga3HPsNvX1i69rxxoxPNYmPsQSvBHNn5bO+MlkwWYkky4oP7CQGT2Bc06DOtQumshV7HpnyRkNhAcUbyKKQb+YA8bfWz7yorhGgkcx+dlafp1dxBBjqoA5a5Q3vmLd+rO+h0TwLD2dhju3Tny33P8DURI9QUwW/njUeG15/elfnjIRTNy1tmzJgVeWHnxrmRt2fOzsf2mZn5oOP//Hz9Qf1EVzHP/xO5v9BmWPwzL3ga6jAAAAAElFTkSuQmCC" class="next"/>'+
    '    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIASURBVDhPjZPPi41hFMdPSRbDYjZXTVmMi0mvGzLjJi5DfnUjbISyUNi8Fn5F8iO3xF/w/gOSJGtp0jTd5pUsJGnyysrCQq7U3Vior/N53vdhuJRTp+fpPOf7PT8f+1OGZ2yk1rUJ13Ztxo4G5e423iq3QfHHxbVZG2++s/SAFmSntTI/p0bvjOsJLcv3fbds45yl+OBbwUoJ4K613KlzVklxXet1Qxt0W82g3C9rrU5qtNj71Tr4/kYCawXu39KE7miTOCGKZNhuus2z6e/+5CSOCWDqIm0iR/BhLdFVNQY0kvh7Mf7SUrBGcw5qYUYkHK55qvUHpmMa+glcfs+0ZtpCNvhcVKId7y0DC0H7lOo5aaIBcN+CHtIiXXHnSAA5JJxeRg7WGBOdplk8xIjoikemXR/Le/K0JCA6vns+Ww9sIEiVDBDUH5ZACEbv/iK4oNUhU7dXBJ4Gc47dJkIER0AkgBw/bNvfxhK8Ee1vll3yR7KIAMDnNRYUcDJVEuBzXEu1rVs1kVGse23pEQ2HBYqTiGAUYAQTYPKNFWPT1RgRlmLnB+v4OPuAcYypotyxUd7knPWbT+YtEsJaejotZ+7s/2KF/wNREj0BTBYsV+uFFc3Hf1llJJA4a2PW0i3PLdv6ynIn7PnZ2/zMco+arZr6x2eaL9RFc1z/4zub/QBp7sLwsYDv1wAAAABJRU5ErkJggg==" class="last"/>'+
    '    <select class="pagesize">'+
    '      <option  value="10">10</option>'+
    '      <option selected="selected" value="20">20</option>'+
    '      <option value="30">30</option>'+
    '      <option value="40">40</option>'+
    '      <option value="50">50</option>'+
    '      <option value="100">100</option>'+
    '      <option value="200">200</option>'+
    '      <option value="500">500</option>'+
    '      <option value="1000">1000</option>'+
    '    </select>'+
    '  </form>'+
    '</div>');    

    $(table).tablesorterPager({
        container: $(".pager"),
        output: '{startRow} to {endRow} ({totalRows})',
        // starting page of the pager (zero based index)
        page: 0,
        // Number of visible rows 
        size: 20
    });
}

var startGetListPages = function(){
    $('#loadAllLinesLink').text('Please wait...').unbind("click");
    
    if($('.PageBuilderWidget').text().indexOf('Page: 1 of 1'+String.fromCharCode(160)+'-') != -1){
        addPager();
        $('#loadAllLinesLink').text('All lines loaded');
        return;
    }
    
    $.get(document.URL, function (siteData) {
        if (navigator.userAgent.indexOf("Firefox")!=-1) {
            setTimeout(function () {
                handleListPageData(siteData, document.URL, []);
            }, 0);
        } else {
            handleListPageData(siteData, document.URL, []);
        }        
    });
}

var getListPage = function(url, pageNumber, currentPage, data) {
    var hiddenForm = $(currentPage).filter("form");
    var viewStateCount = $(hiddenForm).find("#__VIEWSTATEFIELDCOUNT")[0].value;
    var postDataString = /*"__EVENTTARGET=ctl00%24ContentBody%24pgrTop%24lbGoToPage_"+pageNumber+"*/ "__EVENTTARGET=ctl00%24ContentBody%24pgrTop%24ctl08&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATEFIELDCOUNT=" + encodeURIComponent(viewStateCount);
    postDataString += (($(hiddenForm).find("#__VIEWSTATE").length == 1) ? ("&__VIEWSTATE=" + encodeURIComponent($(hiddenForm).find("#__VIEWSTATE")[0].value)) : "");

    for (i = 1; i < viewStateCount; i++) {
        postDataString += (($(hiddenForm).find("#__VIEWSTATE" + i).length == 1) ? ("&__VIEWSTATE" + i + "=" + encodeURIComponent($(hiddenForm).find("#__VIEWSTATE" + i)[0].value)) : "");
    }

    postDataString += "&navi_search=";

    var request = new window.XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            if (navigator.userAgent.indexOf("Firefox")!=-1) {
                setTimeout(function () {
                    handleListPageData(request.responseText, url, data);
                }, 0);
            } else {
                handleListPageData(request.responseText, url, data);
            }
        } else if (request.readyState == 4) {
            alert("Error while getting pages: " + request.status + " " + request.statusText);
        }
    };
    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(postDataString);
}

var handleListPageData = function(siteData, url, lines) {
    var matches = /(Page: <b>)([0-9]+)(<\/b> of <b>)([0-9]+)(?=<\/b>)/.exec(siteData);
    var siteNumber = parseInt(matches[2]);
    var totalSiteNumber = parseInt(matches[4]);

    //GM_log("siteNumber: " + siteNumber + "/" + totalSiteNumber);
    
    var data = $(siteData).find('.SearchResultsTable').find('tbody').find('.Data');
    
    for(var b=0;b<data.length;b++){
        lines.push(data[b]);
    }
    
    if (siteNumber < totalSiteNumber) {
        getListPage(url, siteNumber + 1, siteData, lines);        
    } else {
        handleAllSitePagesLoaded(lines);
    }
}

var handleAllSitePagesLoaded = function(lines) {
    var newBody = $('<tbody> </tbody>');
    for(var a=0;a<lines.length;a++){
        $(newBody).append(lines[a]);
    }
    $('.SearchResultsTable').find('tbody').replaceWith(newBody);
    $(table).trigger("updateAll");
    addPager();
    $('#loadAllLinesLink').text('All lines loaded');
}

/*!
* TableSorter 2.10.8 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach
*/
var tableSorterLoad = function(f){f.extend({tablesorter:new function(){function c(d){"undefined"!==typeof console&&"undefined"!==typeof console.log?console.log(d):alert(d)}function t(d,b){c(d+" ("+((new Date).getTime()-b.getTime())+"ms)")}function r(d,b,a){if(!b)return"";var e=d.config,c=e.textExtraction,l="",l="simple"===c?e.supportsTextContent?b.textContent:f(b).text():"function"===typeof c?c(b,d,a):"object"===typeof c&&c.hasOwnProperty(a)?c[a](b,d,a):e.supportsTextContent?b.textContent:f(b).text();return f.trim(l)} function j(d){var b=d.config,a=b.$tbodies=b.$table.children("tbody:not(."+b.cssInfoBlock+")"),e,u,l,p,n,k,h="";if(0===a.length)return b.debug?c("*Empty table!* Not building a parser cache"):"";a=a[0].rows;if(a[0]){e=[];u=a[0].cells.length;for(l=0;l<u;l++){p=b.$headers.filter(":not([colspan])");p=p.add(b.$headers.filter('[colspan="1"]')).filter('[data-column="'+l+'"]:last');n=b.headers[l];k=g.getParserById(g.getData(p,n,"sorter"));b.empties[l]=g.getData(p,n,"empty")||b.emptyTo||(b.emptyToBottom?"bottom": "top");b.strings[l]=g.getData(p,n,"string")||b.stringTo||"max";if(!k)a:{p=d;n=a;k=-1;for(var f=l,m=void 0,t=g.parsers.length,F=!1,D="",m=!0;""===D&&m;)k++,n[k]?(F=n[k].cells[f],D=r(p,F,f),p.config.debug&&c("Checking if value was empty on row "+k+", column: "+f+': "'+D+'"')):m=!1;for(;0<=--t;)if((m=g.parsers[t])&&"text"!==m.id&&m.is&&m.is(D,p,F)){k=m;break a}k=g.getParserById("text")}b.debug&&(h+="column:"+l+"; parser:"+k.id+"; string:"+b.strings[l]+"; empty: "+b.empties[l]+"\n");e.push(k)}}b.debug&& c(h);b.parsers=e}function v(d){var b=d.tBodies,a=d.config,e,u,l=a.parsers,p,n,k,h,q,m,H,j=[];a.cache={};if(!l)return a.debug?c("*Empty table!* Not building a cache"):"";a.debug&&(H=new Date);a.showProcessing&&g.isProcessing(d,!0);for(h=0;h<b.length;h++)if(a.cache[h]={row:[],normalized:[]},!f(b[h]).hasClass(a.cssInfoBlock)){e=b[h]&&b[h].rows.length||0;u=b[h].rows[0]&&b[h].rows[0].cells.length||0;for(n=0;n<e;++n)if(q=f(b[h].rows[n]),m=[],q.hasClass(a.cssChildRow))a.cache[h].row[a.cache[h].row.length- 1]=a.cache[h].row[a.cache[h].row.length-1].add(q);else{a.cache[h].row.push(q);for(k=0;k<u;++k)if(p=r(d,q[0].cells[k],k),p=l[k].format(p,d,q[0].cells[k],k),m.push(p),"numeric"===(l[k].type||"").toLowerCase())j[k]=Math.max(Math.abs(p)||0,j[k]||0);m.push(a.cache[h].normalized.length);a.cache[h].normalized.push(m)}a.cache[h].colMax=j}a.showProcessing&&g.isProcessing(d);a.debug&&t("Building cache for "+e+" rows",H)}function x(d,b){var a=d.config,e=d.tBodies,c=[],l=a.cache,p,n,k,h,q,m,r,j,D,s,v;if(l[0]){a.debug&& (v=new Date);for(j=0;j<e.length;j++)if(p=f(e[j]),p.length&&!p.hasClass(a.cssInfoBlock)){q=g.processTbody(d,p,!0);p=l[j].row;n=l[j].normalized;h=(k=n.length)?n[0].length-1:0;for(m=0;m<k;m++)if(s=n[m][h],c.push(p[s]),!a.appender||!a.removeRows){D=p[s].length;for(r=0;r<D;r++)q.append(p[s][r])}g.processTbody(d,q,!1)}a.appender&&a.appender(d,c);a.debug&&t("Rebuilt table",v);b||g.applyWidget(d);f(d).trigger("sortEnd",d)}}function A(d){var b=[],a={},e=0,u=f(d).find("thead:eq(0), tfoot").children("tr"),l, p,n,k,h,q,m,j,r,s;for(l=0;l<u.length;l++){h=u[l].cells;for(p=0;p<h.length;p++){k=h[p];q=k.parentNode.rowIndex;m=q+"-"+k.cellIndex;j=k.rowSpan||1;r=k.colSpan||1;"undefined"===typeof b[q]&&(b[q]=[]);for(n=0;n<b[q].length+1;n++)if("undefined"===typeof b[q][n]){s=n;break}a[m]=s;e=Math.max(s,e);f(k).attr({"data-column":s});for(n=q;n<q+j;n++){"undefined"===typeof b[n]&&(b[n]=[]);m=b[n];for(k=s;k<s+r;k++)m[k]="x"}}}d.config.columns=e;var v,B,x,A,z,y,C,w=d.config;w.headerList=[];w.headerContent=[];w.debug&& (C=new Date);A=w.cssIcon?'<i class="'+w.cssIcon+'"></i>':"";w.$headers=f(d).find(w.selectorHeaders).each(function(d){B=f(this);v=w.headers[d];w.headerContent[d]=this.innerHTML;z=w.headerTemplate.replace(/\{content\}/g,this.innerHTML).replace(/\{icon\}/g,A);w.onRenderTemplate&&(x=w.onRenderTemplate.apply(B,[d,z]))&&"string"===typeof x&&(z=x);this.innerHTML='<div class="tablesorter-header-inner">'+z+"</div>";w.onRenderHeader&&w.onRenderHeader.apply(B,[d]);this.column=a[this.parentNode.rowIndex+"-"+ this.cellIndex];var b=g.getData(B,v,"sortInitialOrder")||w.sortInitialOrder;this.order=/^d/i.test(b)||1===b?[1,0,2]:[0,1,2];this.count=-1;this.lockedOrder=!1;y=g.getData(B,v,"lockedOrder")||!1;"undefined"!==typeof y&&!1!==y&&(this.order=this.lockedOrder=/^d/i.test(y)||1===y?[1,1,1]:[0,0,0]);B.addClass(w.cssHeader);w.headerList[d]=this;B.parent().addClass(w.cssHeaderRow);B.attr("tabindex",0)});E(d);w.debug&&(t("Built headers:",C),c(w.$headers))}function y(d,b,a){var e=d.config;e.$table.find(e.selectorRemove).remove(); j(d);v(d);G(e.$table,b,a)}function E(d){var b,a=d.config;a.$headers.each(function(d,c){b="false"===g.getData(c,a.headers[d],"sorter");c.sortDisabled=b;f(c)[b?"addClass":"removeClass"]("sorter-false")})}function C(d){var b,a,e,c=d.config,l=c.sortList,p=[c.cssAsc,c.cssDesc],g=f(d).find("tfoot tr").children().removeClass(p.join(" "));c.$headers.removeClass(p.join(" "));e=l.length;for(b=0;b<e;b++)if(2!==l[b][1]&&(d=c.$headers.not(".sorter-false").filter('[data-column="'+l[b][0]+'"]'+(1===e?":last":"")), d.length))for(a=0;a<d.length;a++)d[a].sortDisabled||(d.eq(a).addClass(p[l[b][1]]),g.length&&g.filter('[data-column="'+l[b][0]+'"]').eq(a).addClass(p[l[b][1]]))}function z(d){var b=0,a=d.config,e=a.sortList,c=e.length,l=d.tBodies.length,p,g,k,h,q,m,j,r,s;if(!a.serverSideSorting&&a.cache[0]){a.debug&&(p=new Date);for(k=0;k<l;k++)q=a.cache[k].colMax,s=(m=a.cache[k].normalized)&&m[0]?m[0].length-1:0,m.sort(function(l,p){for(g=0;g<c;g++){h=e[g][0];r=e[g][1];j=/n/i.test(a.parsers&&a.parsers[h]?a.parsers[h].type|| "":"")?"Numeric":"Text";j+=0===r?"":"Desc";/Numeric/.test(j)&&a.strings[h]&&(b="boolean"===typeof a.string[a.strings[h]]?(0===r?1:-1)*(a.string[a.strings[h]]?-1:1):a.strings[h]?a.string[a.strings[h]]||0:0);var k=f.tablesorter["sort"+j](d,l[h],p[h],h,q[h],b);if(k)return k}return l[s]-p[s]});a.debug&&t("Sorting on "+e.toString()+" and dir "+r+" time",p)}}function I(d,b){d.trigger("updateComplete");"function"===typeof b&&b(d[0])}function G(d,b,a){!1!==b&&!d[0].isProcessing?d.trigger("sorton",[d[0].config.sortList, function(){I(d,a)}]):I(d,a)}function J(d){var b=d.config,a=b.$table,e,c;b.$headers.find(b.selectorSort).add(b.$headers.filter(b.selectorSort)).unbind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter").bind("mousedown.tablesorter mouseup.tablesorter sort.tablesorter keypress.tablesorter",function(a,e){if(1!==(a.which||a.button)&&!/sort|keypress/.test(a.type)||"keypress"===a.type&&13!==a.which||"mouseup"===a.type&&!0!==e&&250<(new Date).getTime()-c)return!1;if("mousedown"=== a.type)return c=(new Date).getTime(),"INPUT"===a.target.tagName?"":!b.cancelSelection;b.delayInit&&!b.cache&&v(d);var n=(/TH|TD/.test(this.tagName)?f(this):f(this).parents("th, td").filter(":first"))[0];if(!n.sortDisabled){var k,h,q,m=d.config,j=!a[m.sortMultiSortKey],r=f(d);r.trigger("sortStart",d);n.count=a[m.sortResetKey]?2:(n.count+1)%(m.sortReset?3:2);m.sortRestart&&(h=n,m.$headers.each(function(){if(this!==h&&(j||!f(this).is("."+m.cssDesc+",."+m.cssAsc)))this.count=-1}));h=n.column;if(j){m.sortList= [];if(null!==m.sortForce){k=m.sortForce;for(q=0;q<k.length;q++)k[q][0]!==h&&m.sortList.push(k[q])}k=n.order[n.count];if(2>k&&(m.sortList.push([h,k]),1<n.colSpan))for(q=1;q<n.colSpan;q++)m.sortList.push([h+q,k])}else if(m.sortAppend&&1<m.sortList.length&&g.isValueInArray(m.sortAppend[0][0],m.sortList)&&m.sortList.pop(),g.isValueInArray(h,m.sortList))for(q=0;q<m.sortList.length;q++)n=m.sortList[q],k=m.headerList[n[0]],n[0]===h&&(n[1]=k.order[k.count],2===n[1]&&(m.sortList.splice(q,1),k.count=-1));else if(k= n.order[n.count],2>k&&(m.sortList.push([h,k]),1<n.colSpan))for(q=1;q<n.colSpan;q++)m.sortList.push([h+q,k]);if(null!==m.sortAppend){k=m.sortAppend;for(q=0;q<k.length;q++)k[q][0]!==h&&m.sortList.push(k[q])}r.trigger("sortBegin",d);setTimeout(function(){C(d);z(d);x(d)},1)}});b.cancelSelection&&b.$headers.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"});a.unbind("sortReset update updateRows updateCell updateAll addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(".tablesorter ")).bind("sortReset.tablesorter", function(a){a.stopPropagation();b.sortList=[];C(d);z(d);x(d)}).bind("updateAll.tablesorter",function(a,b,e){a.stopPropagation();g.refreshWidgets(d,!0,!0);g.restoreHeaders(d);A(d);J(d);y(d,b,e)}).bind("update.tablesorter updateRows.tablesorter",function(a,b,e){a.stopPropagation();E(d);y(d,b,e)}).bind("updateCell.tablesorter",function(e,c,g,k){e.stopPropagation();a.find(b.selectorRemove).remove();var h,q,m;h=a.find("tbody");e=h.index(f(c).parents("tbody").filter(":first"));var u=f(c).parents("tr").filter(":first"); c=f(c)[0];h.length&&0<=e&&(q=h.eq(e).find("tr").index(u),m=c.cellIndex,h=b.cache[e].normalized[q].length-1,b.cache[e].row[d.config.cache[e].normalized[q][h]]=u,b.cache[e].normalized[q][m]=b.parsers[m].format(r(d,c,m),d,c,m),G(a,g,k))}).bind("addRows.tablesorter",function(c,g,f,k){c.stopPropagation();var h=g.filter("tr").length,u=[],m=g[0].cells.length,t=a.find("tbody").index(g.parents("tbody").filter(":first"));b.parsers||j(d);for(c=0;c<h;c++){for(e=0;e<m;e++)u[e]=b.parsers[e].format(r(d,g[c].cells[e], e),d,g[c].cells[e],e);u.push(b.cache[t].row.length);b.cache[t].row.push([g[c]]);b.cache[t].normalized.push(u);u=[]}G(a,f,k)}).bind("sorton.tablesorter",function(b,e,c,g){b.stopPropagation();a.trigger("sortStart",this);var h,u,m,j=d.config;b=e||j.sortList;j.sortList=[];f.each(b,function(a,b){h=[parseInt(b[0],10),parseInt(b[1],10)];if(m=j.headerList[h[0]])j.sortList.push(h),u=f.inArray(h[1],m.order),m.count=0<=u?u:h[1]%(j.sortReset?3:2)});C(d);a.trigger("sortBegin",this);z(d);x(d,g);"function"===typeof c&& c(d)}).bind("appendCache.tablesorter",function(a,b,e){a.stopPropagation();x(d,e);"function"===typeof b&&b(d)}).bind("applyWidgetId.tablesorter",function(a,e){a.stopPropagation();g.getWidgetById(e).format(d,b,b.widgetOptions)}).bind("applyWidgets.tablesorter",function(a,b){a.stopPropagation();g.applyWidget(d,b)}).bind("refreshWidgets.tablesorter",function(a,b,e){a.stopPropagation();g.refreshWidgets(d,b,e)}).bind("destroy.tablesorter",function(a,b,e){a.stopPropagation();g.destroy(d,b,e)})}var g=this; g.version="2.10.8";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,headers:{},ignoreCase:!0,sortForce:null,sortList:[],sortAppend:null,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"simple", textSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,initialized:null,tableClass:"tablesorter",cssAsc:"tablesorter-headerAsc",cssChildRow:"tablesorter-childRow",cssDesc:"tablesorter-headerDesc",cssHeader:"tablesorter-header",cssHeaderRow:"tablesorter-headerRow",cssIcon:"tablesorter-icon",cssInfoBlock:"tablesorter-infoOnly",cssProcessing:"tablesorter-processing",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[], empties:{},strings:{},parsers:[]};g.log=c;g.benchmark=t;g.construct=function(d){return this.each(function(){if(!this.tHead||0===this.tBodies.length||!0===this.hasInitialized)return this.config&&this.config.debug?c("stopping initialization! No thead, tbody or tablesorter has already been initialized"):"";var b=f(this),a=this,e,u="",l=f.metadata;a.hasInitialized=!1;a.isProcessing=!0;a.config={};e=f.extend(!0,a.config,g.defaults,d);f.data(a,"tablesorter",e);e.debug&&f.data(a,"startoveralltimer",new Date); e.supportsTextContent="x"===f("<span>x</span>")[0].textContent;e.supportsDataObject=1.4<=parseFloat(f.fn.jquery);e.string={max:1,min:-1,"max+":1,"max-":-1,zero:0,none:0,"null":0,top:!0,bottom:!1};/tablesorter\-/.test(b.attr("class"))||(u=""!==e.theme?" tablesorter-"+e.theme:"");e.$table=b.addClass(e.tableClass+u);e.$tbodies=b.children("tbody:not(."+e.cssInfoBlock+")");A(a);if(a.config.widthFixed&&0===f(a).find("colgroup").length){var p=f("<colgroup>"),n=f(a).width();f(a.tBodies[0]).find("tr:first").children("td").each(function(){p.append(f("<col>").css("width", parseInt(1E3*(f(this).width()/n),10)/10+"%"))});f(a).prepend(p)}j(a);e.delayInit||v(a);J(a);e.supportsDataObject&&"undefined"!==typeof b.data().sortlist?e.sortList=b.data().sortlist:l&&(b.metadata()&&b.metadata().sortlist)&&(e.sortList=b.metadata().sortlist);g.applyWidget(a,!0);0<e.sortList.length?b.trigger("sorton",[e.sortList,{},!e.initWidgets]):e.initWidgets&&g.applyWidget(a);e.showProcessing&&b.unbind("sortBegin.tablesorter sortEnd.tablesorter").bind("sortBegin.tablesorter sortEnd.tablesorter", function(b){g.isProcessing(a,"sortBegin"===b.type)});a.hasInitialized=!0;a.isProcessing=!1;e.debug&&g.benchmark("Overall initialization time",f.data(a,"startoveralltimer"));b.trigger("tablesorter-initialized",a);"function"===typeof e.initialized&&e.initialized(a)})};g.isProcessing=function(d,b,a){d=f(d);var e=d[0].config;d=a||d.find("."+e.cssHeader);b?(0<e.sortList.length&&(d=d.filter(function(){return this.sortDisabled?!1:g.isValueInArray(parseFloat(f(this).attr("data-column")),e.sortList)})),d.addClass(e.cssProcessing)): d.removeClass(e.cssProcessing)};g.processTbody=function(d,b,a){if(a)return d.isProcessing=!0,b.before('<span class="tablesorter-savemyplace"/>'),a=f.fn.detach?b.detach():b.remove();a=f(d).find("span.tablesorter-savemyplace");b.insertAfter(a);a.remove();d.isProcessing=!1};g.clearTableBody=function(d){f(d)[0].config.$tbodies.empty()};g.restoreHeaders=function(d){var b=d.config;b.$table.find(b.selectorHeaders).each(function(a){f(this).find(".tablesorter-header-inner").length&&f(this).html(b.headerContent[a])})}; g.destroy=function(d,b,a){d=f(d)[0];if(d.hasInitialized){g.refreshWidgets(d,!0,!0);var e=f(d),c=d.config,l=e.find("thead:first"),p=l.find("tr."+c.cssHeaderRow).removeClass(c.cssHeaderRow),n=e.find("tfoot:first > tr").children("th, td");l.find("tr").not(p).remove();e.removeData("tablesorter").unbind("sortReset update updateAll updateRows updateCell addRows sorton appendCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd ".split(" ").join(".tablesorter ")); c.$headers.add(n).removeClass(c.cssHeader+" "+c.cssAsc+" "+c.cssDesc).removeAttr("data-column");p.find(c.selectorSort).unbind("mousedown.tablesorter mouseup.tablesorter keypress.tablesorter");g.restoreHeaders(d);!1!==b&&e.removeClass(c.tableClass+" tablesorter-"+c.theme);d.hasInitialized=!1;"function"===typeof a&&a(d)}};g.regex=[/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,/(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/, /^0x[0-9a-f]+$/i];g.sortText=function(d,b,a,e){if(b===a)return 0;var c=d.config,l=c.string[c.empties[e]||c.emptyTo],f=g.regex;if(""===b&&0!==l)return"boolean"===typeof l?l?-1:1:-l||-1;if(""===a&&0!==l)return"boolean"===typeof l?l?1:-1:l||1;if("function"===typeof c.textSorter)return c.textSorter(b,a,d,e);d=b.replace(f[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");e=a.replace(f[0],"\\0$1\\0").replace(/\\0$/,"").replace(/^\\0/,"").split("\\0");b=parseInt(b.match(f[2]),16)||1!==d.length&& b.match(f[1])&&Date.parse(b);if(a=parseInt(a.match(f[2]),16)||b&&a.match(f[1])&&Date.parse(a)||null){if(b<a)return-1;if(b>a)return 1}c=Math.max(d.length,e.length);for(b=0;b<c;b++){a=isNaN(d[b])?d[b]||0:parseFloat(d[b])||0;f=isNaN(e[b])?e[b]||0:parseFloat(e[b])||0;if(isNaN(a)!==isNaN(f))return isNaN(a)?1:-1;typeof a!==typeof f&&(a+="",f+="");if(a<f)return-1;if(a>f)return 1}return 0};g.sortTextDesc=function(d,b,a,e){if(b===a)return 0;var c=d.config,f=c.string[c.empties[e]||c.emptyTo];return""===b&& 0!==f?"boolean"===typeof f?f?-1:1:f||1:""===a&&0!==f?"boolean"===typeof f?f?1:-1:-f||-1:"function"===typeof c.textSorter?c.textSorter(a,b,d,e):g.sortText(d,a,b)};g.getTextValue=function(d,b,a){if(b){var c=d?d.length:0,g=b+a;for(b=0;b<c;b++)g+=d.charCodeAt(b);return a*g}return 0};g.sortNumeric=function(d,b,a,c,f,l){if(b===a)return 0;d=d.config;c=d.string[d.empties[c]||d.emptyTo];if(""===b&&0!==c)return"boolean"===typeof c?c?-1:1:-c||-1;if(""===a&&0!==c)return"boolean"===typeof c?c?1:-1:c||1;isNaN(b)&& (b=g.getTextValue(b,f,l));isNaN(a)&&(a=g.getTextValue(a,f,l));return b-a};g.sortNumericDesc=function(d,b,a,c,f,l){if(b===a)return 0;d=d.config;c=d.string[d.empties[c]||d.emptyTo];if(""===b&&0!==c)return"boolean"===typeof c?c?-1:1:c||1;if(""===a&&0!==c)return"boolean"===typeof c?c?1:-1:-c||-1;isNaN(b)&&(b=g.getTextValue(b,f,l));isNaN(a)&&(a=g.getTextValue(a,f,l));return a-b};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5",A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d", C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(d){var b,a="[",c=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray={};for(b in c)"string"===typeof b&&(a+=c[b],g.characterRegexArray[b]= RegExp("["+c[b]+"]","g"));g.characterRegex=RegExp(a+"]")}if(g.characterRegex.test(d))for(b in c)"string"===typeof b&&(d=d.replace(g.characterRegexArray[b],b));return d};g.isValueInArray=function(d,b){var a,c=b.length;for(a=0;a<c;a++)if(b[a][0]===d)return!0;return!1};g.addParser=function(d){var b,a=g.parsers.length,c=!0;for(b=0;b<a;b++)g.parsers[b].id.toLowerCase()===d.id.toLowerCase()&&(c=!1);c&&g.parsers.push(d)};g.getParserById=function(d){var b,a=g.parsers.length;for(b=0;b<a;b++)if(g.parsers[b].id.toLowerCase()=== d.toString().toLowerCase())return g.parsers[b];return!1};g.addWidget=function(d){g.widgets.push(d)};g.getWidgetById=function(d){var b,a,c=g.widgets.length;for(b=0;b<c;b++)if((a=g.widgets[b])&&a.hasOwnProperty("id")&&a.id.toLowerCase()===d.toLowerCase())return a};g.applyWidget=function(d,b){d=f(d)[0];var a=d.config,c=a.widgetOptions,j=[],l,p,n;a.debug&&(l=new Date);a.widgets.length&&(a.widgets=f.grep(a.widgets,function(b,d){return f.inArray(b,a.widgets)===d}),f.each(a.widgets||[],function(a,b){if((n= g.getWidgetById(b))&&n.id)n.priority||(n.priority=10),j[a]=n}),j.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),f.each(j,function(g,h){h&&(b?(h.hasOwnProperty("options")&&(c=d.config.widgetOptions=f.extend(!0,{},h.options,c)),h.hasOwnProperty("init")&&h.init(d,h,a,c)):!b&&h.hasOwnProperty("format")&&h.format(d,a,c,!1))}));a.debug&&(p=a.widgets.length,t("Completed "+(!0===b?"initializing ":"applying ")+p+" widget"+(1!==p?"s":""),l))};g.refreshWidgets=function(d,b, a){d=f(d)[0];var e,j=d.config,l=j.widgets,p=g.widgets,n=p.length;for(e=0;e<n;e++)if(p[e]&&p[e].id&&(b||0>f.inArray(p[e].id,l)))j.debug&&c("Refeshing widgets: Removing "+p[e].id),p[e].hasOwnProperty("remove")&&p[e].remove(d,j,j.widgetOptions);!0!==a&&g.applyWidget(d,b)};g.getData=function(d,b,a){var c="";d=f(d);var g,l;if(!d.length)return"";g=f.metadata?d.metadata():!1;l=" "+(d.attr("class")||"");"undefined"!==typeof d.data(a)||"undefined"!==typeof d.data(a.toLowerCase())?c+=d.data(a)||d.data(a.toLowerCase()): g&&"undefined"!==typeof g[a]?c+=g[a]:b&&"undefined"!==typeof b[a]?c+=b[a]:" "!==l&&l.match(" "+a+"-")&&(c=l.match(RegExp("\\s"+a+"-([\\w-]+)"))[1]||"");return f.trim(c)};g.formatFloat=function(c,b){if("string"!==typeof c||""===c)return c;var a;c=(b&&b.config?!1!==b.config.usNumberFormat:"undefined"!==typeof b?b:1)?c.replace(/,/g,""):c.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(c)&&(c=c.replace(/^\s*\(/,"-").replace(/\)/,""));a=parseFloat(c);return isNaN(a)?f.trim(c):a};g.isDigit= function(c){return isNaN(c)?/^[\-+(]?\d+[)]?$/.test(c.toString().replace(/[,.'"\s]/g,"")):!0}}});var j=f.tablesorter;f.fn.extend({tablesorter:j.construct});j.addParser({id:"text",is:function(){return!0},format:function(c,t){var r=t.config;c&&(c=f.trim(r.ignoreCase?c.toLocaleLowerCase():c),c=r.sortLocaleCompare?j.replaceAccents(c):c);return c},type:"text"});j.addParser({id:"digit",is:function(c){return j.isDigit(c)},format:function(c,t){var r=j.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),t);return c&& "number"===typeof r?r:c?f.trim(c&&t.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"});j.addParser({id:"currency",is:function(c){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((c||"").replace(/[,. ]/g,""))},format:function(c,t){var r=j.formatFloat((c||"").replace(/[^\w,. \-()]/g,""),t);return c&&"number"===typeof r?r:c?f.trim(c&&t.config.ignoreCase?c.toLocaleLowerCase():c):c},type:"numeric"});j.addParser({id:"ipAddress",is:function(c){return/^\d{1,3}[\.]\d{1,3}[\.]\d{1,3}[\.]\d{1,3}$/.test(c)}, format:function(c,f){var r,s=c?c.split("."):"",v="",x=s.length;for(r=0;r<x;r++)v+=("00"+s[r]).slice(-3);return c?j.formatFloat(v,f):c},type:"numeric"});j.addParser({id:"url",is:function(c){return/^(https?|ftp|file):\/\//.test(c)},format:function(c){return c?f.trim(c.replace(/(https?|ftp|file):\/\//,"")):c},type:"text"});j.addParser({id:"isoDate",is:function(c){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(c)},format:function(c,f){return c?j.formatFloat(""!==c?(new Date(c.replace(/-/g,"/"))).getTime()|| "":"",f):c},type:"numeric"});j.addParser({id:"percent",is:function(c){return/(\d\s*?%|%\s*?\d)/.test(c)&&15>c.length},format:function(c,f){return c?j.formatFloat(c.replace(/%/g,""),f):c},type:"numeric"});j.addParser({id:"usLongDate",is:function(c){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(c)||/^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(c)},format:function(c,f){return c?j.formatFloat((new Date(c.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||"",f):c},type:"numeric"}); j.addParser({id:"shortDate",is:function(c){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((c||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(c,f,r,s){if(c){r=f.config;var v=r.headerList[s];s=v.dateFormat||j.getData(v,r.headers[s],"dateFormat")||r.dateFormat;c=c.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===s?c=c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===s?c=c.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/, "$3/$2/$1"):"yyyymmdd"===s&&(c=c.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"))}return c?j.formatFloat((new Date(c)).getTime()||"",f):c},type:"numeric"});j.addParser({id:"time",is:function(c){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(c)},format:function(c,f){return c?j.formatFloat((new Date("2000/01/01 "+c.replace(/(\S)([AP]M)$/i,"$1 $2"))).getTime()||"",f):c},type:"numeric"});j.addParser({id:"metadata",is:function(){return!1},format:function(c,j,r){c=j.config; c=!c.parserMetadataName?"sortValue":c.parserMetadataName;return f(r).metadata()[c]},type:"numeric"});j.addWidget({id:"zebra",priority:90,format:function(c,t,r){var s,v,x,A,y,E,C=RegExp(t.cssChildRow,"i"),z=t.$tbodies;t.debug&&(y=new Date);for(c=0;c<z.length;c++)s=z.eq(c),E=s.children("tr").length,1<E&&(x=0,s=s.children("tr:visible"),s.each(function(){v=f(this);C.test(this.className)||x++;A=0===x%2;v.removeClass(r.zebra[A?1:0]).addClass(r.zebra[A?0:1])}));t.debug&&j.benchmark("Applying Zebra widget", y)},remove:function(c,j,r){var s;j=j.$tbodies;var v=(r.zebra||["even","odd"]).join(" ");for(r=0;r<j.length;r++)s=f.tablesorter.processTbody(c,j.eq(r),!0),s.children().removeClass(v),f.tablesorter.processTbody(c,s,!1)}})};
//tablesorter end

/*! tablesorter pager plugin minified - updated 5/27/2013 */
var loadPager = function(){
    GM_addStyle('.tablesorter-pager{padding:5px}td.tablesorter-pager{background-color:#d9e6b9;margin:0}.tablesorter-pager img{vertical-align:middle;margin-right:2px;cursor:pointer}.tablesorter-pager .pagedisplay{padding:0 5px;width:auto;white-space:nowrap;text-align:center}.tablesorter-pager select{margin:0;padding:0}.tablesorter-pager.disabled{display:none}.tablesorter-pager .disabled{opacity:.5;filter:alpha(opacity=50);cursor:default}');        
    (function(f){f.extend({tablesorterPager:new function(){this.defaults={container:null,ajaxUrl:null,customAjaxUrl:function(b,a){return a},ajaxObject:{dataType:"json"},ajaxProcessing:function(){return[0,[],null]},output:"{startRow} to {endRow} of {totalRows} rows",updateArrows:!0,page:0,size:10,fixedHeight:!1,removeRows:!1,cssFirst:".first",cssPrev:".prev",cssNext:".next",cssLast:".last",cssGoto:".gotoPage",cssPageDisplay:".pagedisplay",cssPageSize:".pagesize",cssErrorRow:"tablesorter-errorRow",cssDisabled:"disabled", totalRows:0,totalPages:0,filteredRows:0,filteredPages:0};var t=this,u=function(b,a){var d=b.cssDisabled,e=!!a,c=Math.min(b.totalPages,b.filteredPages);b.updateArrows&&(b.$container.find(b.cssFirst+","+b.cssPrev)[e||0===b.page?"addClass":"removeClass"](d),b.$container.find(b.cssNext+","+b.cssLast)[e||b.page===c-1?"addClass":"removeClass"](d))},q=function(b,a,d){var e,c,g;e=b.config;c=f(b).hasClass("hasFilters")&&!a.ajaxUrl;a.totalPages=Math.ceil(a.totalRows/a.size);a.filteredRows=c?e.$tbodies.eq(0).children("tr:not(."+ (e.widgetOptions&&e.widgetOptions.filter_filteredRow||"filtered")+","+e.selectorRemove+")").length:a.totalRows;a.filteredPages=c?Math.ceil(a.filteredRows/a.size)||1:a.totalPages;if(0<=Math.min(a.totalPages,a.filteredPages)&&(g=a.size*a.page>a.filteredRows,a.startRow=g?1:0===a.filteredRows?0:a.size*a.page+1,a.page=g?0:a.page,a.endRow=Math.min(a.filteredRows,a.totalRows,a.size*(a.page+1)),c=a.$container.find(a.cssPageDisplay),e=a.output.replace(/\{(page|filteredRows|filteredPages|totalPages|startRow|endRow|totalRows)\}/gi, function(b){return{"{page}":a.page+1,"{filteredRows}":a.filteredRows,"{filteredPages}":a.filteredPages,"{totalPages}":a.totalPages,"{startRow}":a.startRow,"{endRow}":a.endRow,"{totalRows}":a.totalRows}[b]}),c.length&&(c["INPUT"===c[0].tagName?"val":"html"](e),a.$goto.length))){g="";c=Math.min(a.totalPages,a.filteredPages);for(e=1;e<=c;e++)g+="<option>"+e+"</option>";a.$goto.html(g).val(a.page+1)}u(a);a.initialized&&!1!==d&&f(b).trigger("pagerComplete",a)},r=function(b,a){var d,e=b.config.$tbodies.eq(0); if(a.fixedHeight&&(e.find("tr.pagerSavedHeightSpacer").remove(),d=f.data(b,"pagerSavedHeight")))d-=e.height(),5<d&&(f.data(b,"pagerLastSize")===a.size&&e.children("tr:visible").length<a.size)&&e.append('<tr class="pagerSavedHeightSpacer '+b.config.selectorRemove.replace(/(tr)?\./g,"")+'" style="height:'+d+'px;"></tr>')},x=function(b,a){var d=b.config.$tbodies.eq(0);d.find("tr.pagerSavedHeightSpacer").remove();f.data(b,"pagerSavedHeight",d.height());r(b,a);f.data(b,"pagerLastSize",a.size)},s=function(b, a){if(!a.ajaxUrl){var d;d=b.config;var e=d.$tbodies.eq(0).children("tr:not(."+d.cssChildRow+")"),c=e.length,f=a.page*a.size,p=f+a.size,k=d.widgetOptions&&d.widgetOptions.filter_filteredRow||"filtered",h=0;for(d=0;d<c;d++)e[d].className.match(k)||(e[d].style.display=h>=f&&h<p?"":"none",h++)}},y=function(b,a){a.size=parseInt(a.$size.val(),10)||a.size;f.data(b,"pagerLastSize",a.size);u(a);a.removeRows||(s(b,a),f(b).bind("sortEnd.pager filterEnd.pager",function(){s(b,a)}))},A=function(b,a,d,e,c){if("function"=== typeof d.ajaxProcessing){var g,p,k,h,l,m=f(a),n=a.config,z=m.find("thead th").length,j="";b=d.ajaxProcessing(b,a)||[0,[]];g=isNaN(b[0])&&!isNaN(b[1]);m.find("thead tr."+d.cssErrorRow).remove();if(c)f('<tr class="'+d.cssErrorRow+'"><td style="text-align:center;" colspan="'+z+'">'+(0===e.status?"Not connected, verify Network":404===e.status?"Requested page not found [404]":500===e.status?"Internal Server Error [500]":"parsererror"===c?"Requested JSON parse failed":"timeout"===c?"Time out error":"abort"=== c?"Ajax Request aborted":"Uncaught error: "+e.statusText+" ["+e.status+"]")+"</td></tr>").click(function(){f(this).remove()}).appendTo(m.find("thead:first")),n.$tbodies.eq(0).empty();else{d.totalRows=b[g?1:0]||d.totalRows||0;e=b[g?0:1]||[];c=e.length;l=b[2];if(e instanceof jQuery)n.$tbodies.eq(0).empty().append(e);else if(e.length){if(0<c)for(b=0;b<c;b++){j+="<tr>";for(g=0;g<e[b].length;g++)j+="<td>"+e[b][g]+"</td>";j+="</tr>"}n.$tbodies.eq(0).html(j)}l&&l.length===z&&(h=(p=m.hasClass("hasStickyHeaders"))? n.$sticky.children("thead:first").children().children():"",k=m.find("tfoot tr:first").children(),m.find("th."+n.cssHeader).each(function(a){var b=f(this),c;b.find("."+n.cssIcon).length?(c=b.find("."+n.cssIcon).clone(!0),b.find(".tablesorter-header-inner").html(l[a]).append(c),p&&h.length&&(c=h.eq(a).find("."+n.cssIcon).clone(!0),h.eq(a).find(".tablesorter-header-inner").html(l[a]).append(c))):(b.find(".tablesorter-header-inner").html(l[a]),p&&h.length&&h.eq(a).find(".tablesorter-header-inner").html(l[a])); k.eq(a).html(l[a])}))}n.showProcessing&&f.tablesorter.isProcessing(a);m.trigger("update");d.totalPages=Math.ceil(d.totalRows/d.size);q(a,d);r(a,d);d.initialized&&m.trigger("pagerChange",d)}d.initialized||(d.initialized=!0,f(a).trigger("pagerInitialized",d))},v=function(b,a,d){d.isDisabled=!1;var e,c,g,j,k=a.length;e=d.page*d.size;var h=e+d.size;if(!(1>k)){d.initialized&&f(b).trigger("pagerChange",d);if(d.removeRows){h>a.length&&(h=a.length);f.tablesorter.clearTableBody(b);for(j=f.tablesorter.processTbody(b, b.config.$tbodies.eq(0),!0);e<h;e++){g=a[e];k=g.length;for(c=0;c<k;c++)j.appendChild(g[c])}f.tablesorter.processTbody(b,j,!1)}else s(b,d);d.page>=d.totalPages&&B(b,d);q(b,d);d.isDisabled||r(b,d);f(b).trigger("applyWidgets")}},C=function(b,a){a.ajax?u(a,!0):(a.isDisabled=!0,f.data(b,"pagerLastPage",a.page),f.data(b,"pagerLastSize",a.size),a.page=0,a.size=a.totalRows,a.totalPages=1,f(b).find("tr.pagerSavedHeightSpacer").remove(),v(b,b.config.rowsCopy,a));a.$size.add(a.$goto).each(function(){f(this).addClass(a.cssDisabled)[0].disabled= !0})},j=function(b,a,d){if(!a.isDisabled){var e=Math.min(a.totalPages,a.filteredPages);0>a.page&&(a.page=0);a.page>e-1&&0!==e&&(a.page=e-1);if(a.ajax){var c,e=a.ajaxUrl?a.ajaxUrl.replace(/\{page([\-+]\d+)?\}/,function(b,c){return a.page+(c?parseInt(c,10):0)}).replace(/\{size\}/g,a.size):"",g=b.config.sortList,j=a.currentFilters||[],k=e.match(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/),h=e.match(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/),l=[];k&&(k=k[1],f.each(g,function(a,b){l.push(k+"["+b[0]+"]="+b[1])}), e=e.replace(/\{\s*sort(?:List)?\s*:\s*(\w*)\s*\}/g,l.length?l.join("&"):k),l=[]);h&&(h=h[1],f.each(j,function(a,b){b&&l.push(h+"["+a+"]="+encodeURIComponent(b))}),e=e.replace(/\{\s*filter(?:List)?\s*:\s*(\w*)\s*\}/g,l.length?l.join("&"):h));"function"===typeof a.customAjaxUrl&&(e=a.customAjaxUrl(b,e));c=e;var m=f(document),e=b.config;""!==c&&(e.showProcessing&&f.tablesorter.isProcessing(b,!0),m.bind("ajaxError.pager",function(d,e,f,g){c.match(f.url)&&(A(null,b,a,e,g),m.unbind("ajaxError.pager"))}), a.ajaxObject.url=c,a.ajaxObject.success=function(c){A(c,b,a);m.unbind("ajaxError.pager");"function"===typeof a.oldAjaxSuccess&&a.oldAjaxSuccess(c)},f.ajax(a.ajaxObject))}else a.ajax||v(b,b.config.rowsCopy,a);f.data(b,"pagerLastPage",a.page);f.data(b,"pagerUpdateTriggered",!0);a.initialized&&!1!==d&&f(b).trigger("pageMoved",a)}},w=function(b,a,d){d.size=a;d.$size.val(a);f.data(b,"pagerLastPage",d.page);f.data(b,"pagerLastSize",d.size);d.totalPages=Math.ceil(d.totalRows/d.size);j(b,d)},E=function(b, a){a.page=0;j(b,a)},B=function(b,a){a.page=Math.min(a.totalPages,a.filteredPages)-1;j(b,a)},F=function(b,a){a.page++;a.page>=Math.min(a.totalPages,a.filteredPages)-1&&(a.page=Math.min(a.totalPages,a.filteredPages)-1);j(b,a)},G=function(b,a){a.page--;0>=a.page&&(a.page=0);j(b,a)},D=function(b,a,d){var e=a.$size.removeClass(a.cssDisabled).removeAttr("disabled");a.$goto.removeClass(a.cssDisabled).removeAttr("disabled");a.isDisabled=!1;a.page=f.data(b,"pagerLastPage")||a.page||0;a.size=f.data(b,"pagerLastSize")|| parseInt(e.find("option[selected]").val(),10)||a.size;e.val(a.size);a.totalPages=Math.ceil(Math.min(a.totalPages,a.filteredPages)/a.size);d&&(f(b).trigger("update"),w(b,a.size,a),y(b,a),r(b,a))};t.appender=function(b,a){var d=b.config.pager;d.ajax||(b.config.rowsCopy=a,d.totalRows=a.length,d.size=f.data(b,"pagerLastSize")||d.size,d.totalPages=Math.ceil(d.totalRows/d.size),v(b,a,d))};t.construct=function(b){return this.each(function(){if(this.config&&this.hasInitialized){var a,d,e=this.config,c=e.pager= f.extend({},f.tablesorterPager.defaults,b),g=this,p=g.config,k=f(g),h=c.$container=f(c.container).addClass("tablesorter-pager").show();c.oldAjaxSuccess=c.oldAjaxSuccess||c.ajaxObject.success;e.appender=t.appender;k.unbind("filterStart.pager filterEnd.pager sortEnd.pager disable.pager enable.pager destroy.pager update.pager pageSize.pager").bind("filterStart.pager",function(a,b){f.data(g,"pagerUpdateTriggered",!1);c.currentFilters=b}).bind("filterEnd.pager sortEnd.pager",function(){f.data(g,"pagerUpdateTriggered")? f.data(g,"pagerUpdateTriggered",!1):(j(g,c,!1),q(g,c,!1),r(g,c))}).bind("disable.pager",function(a){a.stopPropagation();C(g,c)}).bind("enable.pager",function(a){a.stopPropagation();D(g,c,!0)}).bind("destroy.pager",function(a){a.stopPropagation();C(g,c);c.$container.hide();g.config.appender=null;f(g).unbind("destroy.pager sortEnd.pager filterEnd.pager enable.pager disable.pager")}).bind("update.pager",function(a){a.stopPropagation();s(g,c)}).bind("pageSize.pager",function(a,b){a.stopPropagation(); w(g,parseInt(b,10)||10,c);s(g,c);q(g,c,!1);c.$size.length&&c.$size.val(c.size)}).bind("pageSet.pager",function(a,b){a.stopPropagation();c.page=(parseInt(b,10)||1)-1;c.$goto.length&&c.$goto.val(c.size);j(g,c);q(g,c,!1)});a=[c.cssFirst,c.cssPrev,c.cssNext,c.cssLast];d=[E,G,F,B];h.find(a.join(",")).unbind("click.pager").bind("click.pager",function(){var b,e=f(this),h=a.length;if(!e.hasClass(c.cssDisabled))for(b=0;b<h;b++)if(e.is(a[b])){d[b](g,c);break}return!1});c.$goto=h.find(c.cssGoto);c.$goto.length&& (c.$goto.unbind("change").bind("change",function(){c.page=f(this).val()-1;j(g,c)}),q(g,c,!1));c.$size=h.find(c.cssPageSize);c.$size.length&&c.$size.unbind("change.pager").bind("change.pager",function(){c.$size.val(f(this).val());f(this).hasClass(c.cssDisabled)||(w(g,parseInt(f(this).val(),10),c),x(g,c));return!1});c.initialized=!1;k.trigger("pagerBeforeInitialized",c);D(g,c,!1);"string"===typeof c.ajaxUrl?(c.ajax=!0,p.widgetOptions.filter_serversideFiltering=!0,p.serverSideSorting=!0,j(g,c)):(c.ajax= !1,f(this).trigger("appendCache",!0),y(g,c));x(g,c);c.ajax||(c.initialized=!0,f(g).trigger("pagerInitialized",c))}})}}});f.fn.extend({tablesorterPager:f.tablesorterPager.construct})})(jQuery);
}

	
/* qTip2 v2.1.1 None | qtip2.com | Licensed MIT, GPL | Thu Jul 11 2013 14:03:06 */
var tooltipLoad = function(){
    (function(t,e,i){(function(t){"use strict";"function"==typeof define&&define.amd?define(["jquery","imagesloaded"],t):jQuery&&!jQuery.fn.qtip&&t(jQuery)})(function(s){function o(t,e,i,o){this.id=i,this.target=t,this.tooltip=C,this.elements=elements={target:t},this._id=z+"-"+i,this.timers={img:{}},this.options=e,this.plugins={},this.cache=cache={event:{},target:s(),disabled:T,attr:o,onTooltip:T,lastClass:""},this.rendered=this.destroyed=this.disabled=this.waiting=this.hiddenDuringWait=this.positioning=this.triggering=T}function n(t){return t===C||"object"!==s.type(t)}function r(t){return!(s.isFunction(t)||t&&t.attr||t.length||"object"===s.type(t)&&(t.jquery||t.then))}function a(t){var e,i,o,a;return n(t)?T:(n(t.metadata)&&(t.metadata={type:t.metadata}),"content"in t&&(e=t.content,n(e)||e.jquery||e.done?e=t.content={text:i=r(e)?T:e}:i=e.text,"ajax"in e&&(o=e.ajax,a=o&&o.once!==T,delete e.ajax,e.text=function(t,e){var n=i||s(this).attr(e.options.content.attr)||"Loading...",r=s.ajax(s.extend({},o,{context:e})).then(o.success,C,o.error).then(function(t){return t&&a&&e.set("content.text",t),t},function(t,i,s){e.destroyed||0===t.status||e.set("content.text",i+": "+s)});return a?n:(e.set("content.text",n),r)}),"title"in e&&(n(e.title)||(e.button=e.title.button,e.title=e.title.text),r(e.title||T)&&(e.title=T))),"position"in t&&n(t.position)&&(t.position={my:t.position,at:t.position}),"show"in t&&n(t.show)&&(t.show=t.show.jquery?{target:t.show}:t.show===x?{ready:x}:{event:t.show}),"hide"in t&&n(t.hide)&&(t.hide=t.hide.jquery?{target:t.hide}:{event:t.hide}),"style"in t&&n(t.style)&&(t.style={classes:t.style}),s.each(B,function(){this.sanitize&&this.sanitize(t)}),t)}function h(t,e){for(var i,s=0,o=t,n=e.split(".");o=o[n[s++]];)n.length>s&&(i=o);return[i||t,n.pop()]}function d(t,e){var i,s,o;for(i in this.checks)for(s in this.checks[i])(o=RegExp(s,"i").exec(t))&&(e.push(o),("builtin"===i||this.plugins[i])&&this.checks[i][s].apply(this.plugins[i]||this,e))}function l(t){return A.concat("").join(t?"-"+t+" ":" ")}function c(t){if(this.tooltip.hasClass(M))return T;clearTimeout(this.timers.show),clearTimeout(this.timers.hide);var e=s.proxy(function(){this.toggle(x,t)},this);this.options.show.delay>0?this.timers.show=setTimeout(e,this.options.show.delay):e()}function u(t){if(this.tooltip.hasClass(M))return T;var e=s(t.relatedTarget),i=e.closest(F)[0]===this.tooltip[0],o=e[0]===this.options.show.target[0];if(clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this!==e[0]&&"mouse"===this.options.position.target&&i||this.options.hide.fixed&&/mouse(out|leave|move)/.test(t.type)&&(i||o))try{t.preventDefault(),t.stopImmediatePropagation()}catch(n){}else{var r=s.proxy(function(){this.toggle(T,t)},this);this.options.hide.delay>0?this.timers.hide=setTimeout(r,this.options.hide.delay):r()}}function p(t){return this.tooltip.hasClass(M)||!this.options.hide.inactive?T:(clearTimeout(this.timers.inactive),this.timers.inactive=setTimeout(s.proxy(function(){this.hide(t)},this),this.options.hide.inactive),i)}function f(t){this.rendered&&this.tooltip[0].offsetWidth>0&&this.reposition(t)}function g(t,i,o){s(e.body).delegate(t,(i.split?i:i.join(V+" "))+V,function(){var t=v.api[s.attr(this,k)];t&&!t.disabled&&o.apply(t,arguments)})}function m(t,i,n){var r,h,d,l,c,u=s(e.body),p=t[0]===e?u:t,f=t.metadata?t.metadata(n.metadata):C,g="html5"===n.metadata.type&&f?f[n.metadata.name]:C,m=t.data(n.metadata.name||"qtipopts");try{m="string"==typeof m?s.parseJSON(m):m}catch(y){}if(l=s.extend(x,{},v.defaults,n,"object"==typeof m?a(m):C,a(g||f)),h=l.position,l.id=i,"boolean"==typeof l.content.text){if(d=t.attr(l.content.attr),l.content.attr===T||!d)return T;l.content.text=d}if(h.container.length||(h.container=u),h.target===T&&(h.target=p),l.show.target===T&&(l.show.target=p),l.show.solo===x&&(l.show.solo=h.container.closest("body")),l.hide.target===T&&(l.hide.target=p),l.position.viewport===x&&(l.position.viewport=h.container),h.container=h.container.eq(0),h.at=new b(h.at,x),h.my=new b(h.my),t.data(z))if(l.overwrite)t.qtip("destroy");else if(l.overwrite===T)return T;return t.attr(L,i),l.suppress&&(c=t.attr("title"))&&t.removeAttr("title").attr(P,c).attr("title",""),r=new o(t,l,i,!!d),t.data(z,r),t.one("remove.qtip-"+i+" removeqtip.qtip-"+i,function(){var t;(t=s(this).data(z))&&t.destroy()}),r}var v,y,b,w,_,x=!0,T=!1,C=null,j="x",q="y",W="top",E="left",S="bottom",O="right",R="center",B={},z="qtip",L="data-hasqtip",k="data-qtip-id",A=["ui-widget","ui-tooltip"],F="."+z,D="click dblclick mousedown mouseup mousemove mouseleave mouseenter".split(" "),X=z+"-fixed",$=z+"-default",Y=z+"-focus",I=z+"-hover",M=z+"-disabled",N="_replacedByqTip",P="oldtitle";BROWSER={ie:function(){for(var t=3,i=e.createElement("div");(i.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->")&&i.getElementsByTagName("i")[0];);return t>4?t:0/0}(),iOS:parseFloat((""+(/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i.exec(navigator.userAgent)||[0,""])[1]).replace("undefined","3_2").replace("_",".").replace("_",""))||T},y=o.prototype,y.render=function(t){if(this.rendered||this.destroyed)return this;var e=this,i=this.options,o=this.cache,n=this.elements,r=i.content.text,a=i.content.title,h=i.content.button,d=i.position,l="."+this._id+" ",c=[];return s.attr(this.target[0],"aria-describedby",this._id),this.tooltip=n.tooltip=tooltip=s("<div/>",{id:this._id,"class":[z,$,i.style.classes,z+"-pos-"+i.position.my.abbrev()].join(" "),width:i.style.width||"",height:i.style.height||"",tracking:"mouse"===d.target&&d.adjust.mouse,role:"alert","aria-live":"polite","aria-atomic":T,"aria-describedby":this._id+"-content","aria-hidden":x}).toggleClass(M,this.disabled).attr(k,this.id).data(z,this).appendTo(d.container).append(n.content=s("<div />",{"class":z+"-content",id:this._id+"-content","aria-atomic":x})),this.rendered=-1,this.positioning=x,a&&(this._createTitle(),s.isFunction(a)||c.push(this._updateTitle(a,T))),h&&this._createButton(),s.isFunction(r)||c.push(this._updateContent(r,T)),this.rendered=x,this._setWidget(),s.each(i.events,function(t,e){s.isFunction(e)&&tooltip.bind(("toggle"===t?["tooltipshow","tooltiphide"]:["tooltip"+t]).join(l)+l,e)}),s.each(B,function(t){var i;"render"===this.initialize&&(i=this(e))&&(e.plugins[t]=i)}),this._assignEvents(),s.when.apply(s,c).then(function(){e._trigger("render"),e.positioning=T,e.hiddenDuringWait||!i.show.ready&&!t||e.toggle(x,o.event,T),e.hiddenDuringWait=T}),v.api[this.id]=this,this},y.destroy=function(t){function e(){if(!this.destroyed){this.destroyed=x;var t=this.target,e=t.attr(P);this.rendered&&this.tooltip.stop(1,0).find("*").remove().end().remove(),s.each(this.plugins,function(){this.destroy&&this.destroy()}),clearTimeout(this.timers.show),clearTimeout(this.timers.hide),this._unassignEvents(),t.removeData(z).removeAttr(k).removeAttr("aria-describedby"),this.options.suppress&&e&&t.attr("title",e).removeAttr(P),this._unbind(t),this.options=this.elements=this.cache=this.timers=this.plugins=this.mouse=C,delete v.api[this.id]}}return this.destroyed?this.target:(t!==x&&this.rendered?(tooltip.one("tooltiphidden",s.proxy(e,this)),!this.triggering&&this.hide()):e.call(this),this.target)},w=y.checks={builtin:{"^id$":function(t,e,i,o){var n=i===x?v.nextid:i,r=z+"-"+n;n!==T&&n.length>0&&!s("#"+r).length?(this._id=r,this.rendered&&(this.tooltip[0].id=this._id,this.elements.content[0].id=this._id+"-content",this.elements.title[0].id=this._id+"-title")):t[e]=o},"^prerender":function(t,e,i){i&&!this.rendered&&this.render(this.options.show.ready)},"^content.text$":function(t,e,i){this._updateContent(i)},"^content.attr$":function(t,e,i,s){this.options.content.text===this.target.attr(s)&&this._updateContent(this.target.attr(i))},"^content.title$":function(t,e,s){return s?(s&&!this.elements.title&&this._createTitle(),this._updateTitle(s),i):this._removeTitle()},"^content.button$":function(t,e,i){this._updateButton(i)},"^content.title.(text|button)$":function(t,e,i){this.set("content."+e,i)},"^position.(my|at)$":function(t,e,i){"string"==typeof i&&(t[e]=new b(i,"at"===e))},"^position.container$":function(t,e,i){this.tooltip.appendTo(i)},"^show.ready$":function(t,e,i){i&&(!this.rendered&&this.render(x)||this.toggle(x))},"^style.classes$":function(t,e,i,s){this.tooltip.removeClass(s).addClass(i)},"^style.width|height":function(t,e,i){this.tooltip.css(e,i)},"^style.widget|content.title":function(){this._setWidget()},"^style.def":function(t,e,i){this.tooltip.toggleClass($,!!i)},"^events.(render|show|move|hide|focus|blur)$":function(t,e,i){tooltip[(s.isFunction(i)?"":"un")+"bind"]("tooltip"+e,i)},"^(show|hide|position).(event|target|fixed|inactive|leave|distance|viewport|adjust)":function(){var t=this.options.position;tooltip.attr("tracking","mouse"===t.target&&t.adjust.mouse),this._unassignEvents(),this._assignEvents()}}},y.get=function(t){if(this.destroyed)return this;var e=h(this.options,t.toLowerCase()),i=e[0][e[1]];return i.precedance?i.string():i};var H=/^position\.(my|at|adjust|target|container|viewport)|style|content|show\.ready/i,Q=/^prerender|show\.ready/i;y.set=function(t,e){if(this.destroyed)return this;var o,n=this.rendered,r=T,l=this.options;return this.checks,"string"==typeof t?(o=t,t={},t[o]=e):t=s.extend({},t),s.each(t,function(e,o){if(!n&&!Q.test(e))return delete t[e],i;var a,d=h(l,e.toLowerCase());a=d[0][d[1]],d[0][d[1]]=o&&o.nodeType?s(o):o,r=H.test(e)||r,t[e]=[d[0],d[1],o,a]}),a(l),this.positioning=x,s.each(t,s.proxy(d,this)),this.positioning=T,this.rendered&&this.tooltip[0].offsetWidth>0&&r&&this.reposition("mouse"===l.position.target?C:this.cache.event),this},y._update=function(t,e){var i=this,o=this.cache;return this.rendered&&t?(s.isFunction(t)&&(t=t.call(this.elements.target,o.event,this)||""),s.isFunction(t.then)?(o.waiting=x,t.then(function(t){return o.waiting=T,i._update(t,e)},C,function(t){return i._update(t,e)})):t===T||!t&&""!==t?T:(t.jquery&&t.length>0?e.children().detach().end().append(t.css({display:"block"})):e.html(t),o.waiting=x,(s.fn.imagesLoaded?e.imagesLoaded():s.Deferred().resolve(s([]))).done(function(t){o.waiting=T,t.length&&i.rendered&&i.tooltip[0].offsetWidth>0&&i.reposition(o.event,!t.length)}).promise())):T},y._updateContent=function(t,e){this._update(t,this.elements.content,e)},y._updateTitle=function(t,e){this._update(t,this.elements.title,e)===T&&this._removeTitle(T)},y._createTitle=function(){var t=this.elements,e=this._id+"-title";t.titlebar&&this._removeTitle(),t.titlebar=s("<div />",{"class":z+"-titlebar "+(this.options.style.widget?l("header"):"")}).append(t.title=s("<div />",{id:e,"class":z+"-title","aria-atomic":x})).insertBefore(t.content).delegate(".qtip-close","mousedown keydown mouseup keyup mouseout",function(t){s(this).toggleClass("ui-state-active ui-state-focus","down"===t.type.substr(-4))}).delegate(".qtip-close","mouseover mouseout",function(t){s(this).toggleClass("ui-state-hover","mouseover"===t.type)}),this.options.content.button&&this._createButton()},y._removeTitle=function(t){var e=this.elements;e.title&&(e.titlebar.remove(),e.titlebar=e.title=e.button=C,t!==T&&this.reposition())},y.reposition=function(i,o){if(!this.rendered||this.positioning||this.destroyed)return this;this.positioning=x;var n,r,a=this.cache,h=this.tooltip,d=this.options.position,l=d.target,c=d.my,u=d.at,p=d.viewport,f=d.container,g=d.adjust,m=g.method.split(" "),v=h.outerWidth(T),y=h.outerHeight(T),b=0,w=0,_=h.css("position"),C={left:0,top:0},j=h[0].offsetWidth>0,q=i&&"scroll"===i.type,z=s(t),L=f[0].ownerDocument,k=this.mouse;if(s.isArray(l)&&2===l.length)u={x:E,y:W},C={left:l[0],top:l[1]};else if("mouse"===l&&(i&&i.pageX||a.event.pageX))u={x:E,y:W},i=!k||!k.pageX||!g.mouse&&i&&i.pageX?(!i||"resize"!==i.type&&"scroll"!==i.type?i&&i.pageX&&"mousemove"===i.type?i:(!g.mouse||this.options.show.distance)&&a.origin&&a.origin.pageX?a.origin:i:a.event)||i||a.event||k||{}:k,"static"!==_&&(C=f.offset()),L.body.offsetWidth!==(t.innerWidth||L.documentElement.clientWidth)&&(r=s(L.body).offset()),C={left:i.pageX-C.left+(r&&r.left||0),top:i.pageY-C.top+(r&&r.top||0)},g.mouse&&q&&(C.left-=k.scrollX-z.scrollLeft(),C.top-=k.scrollY-z.scrollTop());else{if("event"===l&&i&&i.target&&"scroll"!==i.type&&"resize"!==i.type?a.target=s(i.target):"event"!==l&&(a.target=s(l.jquery?l:elements.target)),l=a.target,l=s(l).eq(0),0===l.length)return this;l[0]===e||l[0]===t?(b=BROWSER.iOS?t.innerWidth:l.width(),w=BROWSER.iOS?t.innerHeight:l.height(),l[0]===t&&(C={top:(p||l).scrollTop(),left:(p||l).scrollLeft()})):B.imagemap&&l.is("area")?n=B.imagemap(this,l,u,B.viewport?m:T):B.svg&&l[0].ownerSVGElement?n=B.svg(this,l,u,B.viewport?m:T):(b=l.outerWidth(T),w=l.outerHeight(T),C=l.offset()),n&&(b=n.width,w=n.height,r=n.offset,C=n.position),C=this.reposition.offset(l,C,f),(BROWSER.iOS>3.1&&4.1>BROWSER.iOS||BROWSER.iOS>=4.3&&4.33>BROWSER.iOS||!BROWSER.iOS&&"fixed"===_)&&(C.left-=z.scrollLeft(),C.top-=z.scrollTop()),(!n||n&&n.adjustable!==T)&&(C.left+=u.x===O?b:u.x===R?b/2:0,C.top+=u.y===S?w:u.y===R?w/2:0)}return C.left+=g.x+(c.x===O?-v:c.x===R?-v/2:0),C.top+=g.y+(c.y===S?-y:c.y===R?-y/2:0),B.viewport?(C.adjusted=B.viewport(this,C,d,b,w,v,y),r&&C.adjusted.left&&(C.left+=r.left),r&&C.adjusted.top&&(C.top+=r.top)):C.adjusted={left:0,top:0},this._trigger("move",[C,p.elem||p],i)?(delete C.adjusted,o===T||!j||isNaN(C.left)||isNaN(C.top)||"mouse"===l||!s.isFunction(d.effect)?h.css(C):s.isFunction(d.effect)&&(d.effect.call(h,this,s.extend({},C)),h.queue(function(t){s(this).css({opacity:"",height:""}),BROWSER.ie&&this.style.removeAttribute("filter"),t()})),this.positioning=T,this):this},y.reposition.offset=function(t,i,o){function n(t,e){i.left+=e*t.scrollLeft(),i.top+=e*t.scrollTop()}if(!o[0])return i;var r,a,h,d,l=s(t[0].ownerDocument),c=!!BROWSER.ie&&"CSS1Compat"!==e.compatMode,u=o[0];do"static"!==(a=s.css(u,"position"))&&("fixed"===a?(h=u.getBoundingClientRect(),n(l,-1)):(h=s(u).position(),h.left+=parseFloat(s.css(u,"borderLeftWidth"))||0,h.top+=parseFloat(s.css(u,"borderTopWidth"))||0),i.left-=h.left+(parseFloat(s.css(u,"marginLeft"))||0),i.top-=h.top+(parseFloat(s.css(u,"marginTop"))||0),r||"hidden"===(d=s.css(u,"overflow"))||"visible"===d||(r=s(u)));while(u=u.offsetParent);return r&&(r[0]!==l[0]||c)&&n(r,1),i};var U=(b=y.reposition.Corner=function(t,e){t=(""+t).replace(/([A-Z])/," $1").replace(/middle/gi,R).toLowerCase(),this.x=(t.match(/left|right/i)||t.match(/center/)||["inherit"])[0].toLowerCase(),this.y=(t.match(/top|bottom|center/i)||["inherit"])[0].toLowerCase(),this.forceY=!!e;var i=t.charAt(0);this.precedance="t"===i||"b"===i?q:j}).prototype;U.invert=function(t,e){this[t]=this[t]===E?O:this[t]===O?E:e||this[t]},U.string=function(){var t=this.x,e=this.y;return t===e?t:this.precedance===q||this.forceY&&"center"!==e?e+" "+t:t+" "+e},U.abbrev=function(){var t=this.string().split(" ");return t[0].charAt(0)+(t[1]&&t[1].charAt(0)||"")},U.clone=function(){return new b(this.string(),this.forceY)},y.toggle=function(t,i){var o=this.cache,n=this.options,r=this.tooltip;if(i){if(/over|enter/.test(i.type)&&/out|leave/.test(o.event.type)&&n.show.target.add(i.target).length===n.show.target.length&&r.has(i.relatedTarget).length)return this;o.event=s.extend({},i)}if(this.waiting&&!t&&(this.hiddenDuringWait=x),!this.rendered)return t?this.render(1):this;if(this.destroyed||this.disabled)return this;var a,h,d=t?"show":"hide",l=this.options[d],c=(this.options[t?"hide":"show"],this.options.position),u=this.options.content,p=this.tooltip.css("width"),f=this.tooltip[0].offsetWidth>0,g=t||1===l.target.length,m=!i||2>l.target.length||o.target[0]===i.target;return(typeof t).search("boolean|number")&&(t=!f),a=!r.is(":animated")&&f===t&&m,h=a?C:!!this._trigger(d,[90]),h!==T&&t&&this.focus(i),!h||a?this:(s.attr(r[0],"aria-hidden",!t),t?(o.origin=s.extend({},this.mouse),s.isFunction(u.text)&&this._updateContent(u.text,T),s.isFunction(u.title)&&this._updateTitle(u.title,T),!_&&"mouse"===c.target&&c.adjust.mouse&&(s(e).bind("mousemove."+z,this._storeMouse),_=x),p||r.css("width",r.outerWidth(T)),this.reposition(i,arguments[2]),p||r.css("width",""),l.solo&&("string"==typeof l.solo?s(l.solo):s(F,l.solo)).not(r).not(l.target).qtip("hide",s.Event("tooltipsolo"))):(clearTimeout(this.timers.show),delete o.origin,_&&!s(F+'[tracking="true"]:visible',l.solo).not(r).length&&(s(e).unbind("mousemove."+z),_=T),this.blur(i)),after=s.proxy(function(){t?(BROWSER.ie&&r[0].style.removeAttribute("filter"),r.css("overflow",""),"string"==typeof l.autofocus&&s(this.options.show.autofocus,r).focus(),this.options.show.target.trigger("qtip-"+this.id+"-inactive")):r.css({display:"",visibility:"",opacity:"",left:"",top:""}),this._trigger(t?"visible":"hidden")},this),l.effect===T||g===T?(r[d](),after()):s.isFunction(l.effect)?(r.stop(1,1),l.effect.call(r,this),r.queue("fx",function(t){after(),t()})):r.fadeTo(90,t?1:0,after),t&&l.target.trigger("qtip-"+this.id+"-inactive"),this)},y.show=function(t){return this.toggle(x,t)},y.hide=function(t){return this.toggle(T,t)},y.focus=function(t){if(!this.rendered||this.destroyed)return this;var e=s(F),i=this.tooltip,o=parseInt(i[0].style.zIndex,10),n=v.zindex+e.length;return i.hasClass(Y)||this._trigger("focus",[n],t)&&(o!==n&&(e.each(function(){this.style.zIndex>o&&(this.style.zIndex=this.style.zIndex-1)}),e.filter("."+Y).qtip("blur",t)),i.addClass(Y)[0].style.zIndex=n),this},y.blur=function(t){return!this.rendered||this.destroyed?this:(this.tooltip.removeClass(Y),this._trigger("blur",[this.tooltip.css("zIndex")],t),this)},y.disable=function(t){return this.destroyed?this:("boolean"!=typeof t&&(t=!(this.tooltip.hasClass(M)||this.disabled)),this.rendered&&this.tooltip.toggleClass(M,t).attr("aria-disabled",t),this.disabled=!!t,this)},y.enable=function(){return this.disable(T)},y._createButton=function(){var t=this,e=this.elements,i=e.tooltip,o=this.options.content.button,n="string"==typeof o,r=n?o:"Close tooltip";e.button&&e.button.remove(),e.button=o.jquery?o:s("<a />",{"class":"qtip-close "+(this.options.style.widget?"":z+"-icon"),title:r,"aria-label":r}).prepend(s("<span />",{"class":"ui-icon ui-icon-close",html:"&times;"})),e.button.appendTo(e.titlebar||i).attr("role","button").click(function(e){return i.hasClass(M)||t.hide(e),T})},y._updateButton=function(t){if(!this.rendered)return T;var e=this.elements.button;t?this._createButton():e.remove()},y._setWidget=function(){var t=this.options.style.widget,e=this.elements,i=e.tooltip,s=i.hasClass(M);i.removeClass(M),M=t?"ui-state-disabled":"qtip-disabled",i.toggleClass(M,s),i.toggleClass("ui-helper-reset "+l(),t).toggleClass($,this.options.style.def&&!t),e.content&&e.content.toggleClass(l("content"),t),e.titlebar&&e.titlebar.toggleClass(l("header"),t),e.button&&e.button.toggleClass(z+"-icon",!t)},y._storeMouse=function(i){this.mouse={pageX:i.pageX,pageY:i.pageY,type:"mousemove",scrollX:t.pageXOffset||e.body.scrollLeft||e.documentElement.scrollLeft,scrollY:t.pageYOffset||e.body.scrollTop||e.documentElement.scrollTop}},y._bind=function(t,e,i,o,n){var r="."+this._id+(o?"-"+o:"");e.length&&s(t).bind((e.split?e:e.join(r+" "))+r,s.proxy(i,n||this))},y._unbind=function(t,e){s(t).unbind("."+this._id+(e?"-"+e:""))};var V="."+z;s(function(){g(F,["mouseenter","mouseleave"],function(t){var e="mouseenter"===t.type,i=s(t.currentTarget),o=s(t.relatedTarget||t.target),n=this.options;e?(this.focus(t),i.hasClass(X)&&!i.hasClass(M)&&clearTimeout(this.timers.hide)):"mouse"===n.position.target&&n.hide.event&&n.show.target&&!o.closest(n.show.target[0]).length&&this.hide(t),i.toggleClass(I,e)}),g("["+k+"]",D,p)}),y._trigger=function(t,e,i){var o=s.Event("tooltip"+t);return o.originalEvent=i&&s.extend({},i)||this.cache.event||C,this.triggering=x,this.tooltip.trigger(o,[this].concat(e||[])),this.triggering=T,!o.isDefaultPrevented()},y._assignEvents=function(){var o=this.options,n=o.position,r=this.tooltip,a=o.show.target,h=o.hide.target,d=n.container,l=n.viewport,g=s(e),m=(s(e.body),s(t)),y=o.show.event?s.trim(""+o.show.event).split(" "):[],b=o.hide.event?s.trim(""+o.hide.event).split(" "):[],w=[];/mouse(out|leave)/i.test(o.hide.event)&&"window"===o.hide.leave&&this._bind(g,["mouseout","blur"],function(t){/select|option/.test(t.target.nodeName)||t.relatedTarget||this.hide(t)}),o.hide.fixed?h=h.add(r.addClass(X)):/mouse(over|enter)/i.test(o.show.event)&&this._bind(h,"mouseleave",function(){clearTimeout(this.timers.show)}),(""+o.hide.event).indexOf("unfocus")>-1&&this._bind(d.closest("html"),["mousedown","touchstart"],function(t){var e=s(t.target),i=this.rendered&&!this.tooltip.hasClass(M)&&this.tooltip[0].offsetWidth>0,o=e.parents(F).filter(this.tooltip[0]).length>0;e[0]===this.target[0]||e[0]===this.tooltip[0]||o||this.target.has(e[0]).length||!i||this.hide(t)}),"number"==typeof o.hide.inactive&&(this._bind(a,"qtip-"+this.id+"-inactive",p),this._bind(h.add(r),v.inactiveEvents,p,"-inactive")),b=s.map(b,function(t){var e=s.inArray(t,y);return e>-1&&h.add(a).length===h.length?(w.push(y.splice(e,1)[0]),i):t}),this._bind(a,y,c),this._bind(h,b,u),this._bind(a,w,function(t){(this.tooltip[0].offsetWidth>0?u:c).call(this,t)}),this._bind(a.add(r),"mousemove",function(t){if("number"==typeof o.hide.distance){var e=this.cache.origin||{},i=this.options.hide.distance,s=Math.abs;(s(t.pageX-e.pageX)>=i||s(t.pageY-e.pageY)>=i)&&this.hide(t)}this._storeMouse(t)}),"mouse"===n.target&&n.adjust.mouse&&(o.hide.event&&this._bind(a,["mouseenter","mouseleave"],function(t){this.cache.onTarget="mouseenter"===t.type}),this._bind(g,"mousemove",function(t){this.rendered&&this.cache.onTarget&&!this.tooltip.hasClass(M)&&this.tooltip[0].offsetWidth>0&&this.reposition(t)})),(n.adjust.resize||l.length)&&this._bind(s.event.special.resize?l:m,"resize",f),n.adjust.scroll&&this._bind(m.add(n.container),"scroll",f)},y._unassignEvents=function(){var i=[this.options.show.target[0],this.options.hide.target[0],this.rendered&&this.tooltip[0],this.options.position.container[0],this.options.position.viewport[0],this.options.position.container.closest("html")[0],t,e];this.rendered?this._unbind(s([]).pushStack(s.grep(i,function(t){return"object"==typeof t}))):s(i[0]).unbind("."+this._id+"-create")},v=s.fn.qtip=function(t,e,o){var n=(""+t).toLowerCase(),r=C,h=s.makeArray(arguments).slice(1),d=h[h.length-1],l=this[0]?s.data(this[0],z):C;return!arguments.length&&l||"api"===n?l:"string"==typeof t?(this.each(function(){var t=s.data(this,z);if(!t)return x;if(d&&d.timeStamp&&(t.cache.event=d),!e||"option"!==n&&"options"!==n)t[n]&&t[n].apply(t,h);else{if(o===i&&!s.isPlainObject(e))return r=t.get(e),T;t.set(e,o)}}),r!==C?r:this):"object"!=typeof t&&arguments.length?i:(l=a(s.extend(x,{},t)),v.bind.call(this,l,d))},v.bind=function(t,e){return this.each(function(o){function n(t){function e(){l.render("object"==typeof t||r.show.ready),a.show.add(a.hide).unbind(d)}return l.disabled?T:(l.cache.event=s.extend({},t),l.cache.target=t?s(t.target):[i],r.show.delay>0?(clearTimeout(l.timers.show),l.timers.show=setTimeout(e,r.show.delay),h.show!==h.hide&&a.hide.bind(h.hide,function(){clearTimeout(l.timers.show)})):e(),i)}var r,a,h,d,l,c;return c=s.isArray(t.id)?t.id[o]:t.id,c=!c||c===T||1>c.length||v.api[c]?v.nextid++:c,d=".qtip-"+c+"-create",l=m(s(this),c,t),l===T?x:(v.api[c]=l,r=l.options,s.each(B,function(){"initialize"===this.initialize&&this(l)}),a={show:r.show.target,hide:r.hide.target},h={show:s.trim(""+r.show.event).replace(/ /g,d+" ")+d,hide:s.trim(""+r.hide.event).replace(/ /g,d+" ")+d},/mouse(over|enter)/i.test(h.show)&&!/mouse(out|leave)/i.test(h.hide)&&(h.hide+=" mouseleave"+d),a.show.bind("mousemove"+d,function(t){l._storeMouse(t),l.cache.onTarget=x}),a.show.bind(h.show,n),(r.show.ready||r.prerender)&&n(e),i)})},v.api={},s.each({attr:function(t,e){if(this.length){var i=this[0],o="title",n=s.data(i,"qtip");if(t===o&&n&&"object"==typeof n&&n.options.suppress)return 2>arguments.length?s.attr(i,P):(n&&n.options.content.attr===o&&n.cache.attr&&n.set("content.text",e),this.attr(P,e))}return s.fn["attr"+N].apply(this,arguments)},clone:function(t){var e=(s([]),s.fn["clone"+N].apply(this,arguments));return t||e.filter("["+P+"]").attr("title",function(){return s.attr(this,P)}).removeAttr(P),e}},function(t,e){if(!e||s.fn[t+N])return x;var i=s.fn[t+N]=s.fn[t];s.fn[t]=function(){return e.apply(this,arguments)||i.apply(this,arguments)}}),s.ui||(s["cleanData"+N]=s.cleanData,s.cleanData=function(t){for(var e,i=0;(e=s(t[i])).length;i++)if(e.attr(L))try{e.triggerHandler("removeqtip")}catch(o){}s["cleanData"+N].apply(this,arguments)}),v.version="2.1.1",v.nextid=0,v.inactiveEvents=D,v.zindex=15e3,v.defaults={prerender:T,id:T,overwrite:x,suppress:x,content:{text:x,attr:"title",title:T,button:T},position:{my:"top left",at:"bottom right",target:T,container:T,viewport:T,adjust:{x:0,y:0,mouse:x,scroll:x,resize:x,method:"flipinvert flipinvert"},effect:function(t,e){s(this).animate(e,{duration:200,queue:T})}},show:{target:T,event:"mouseenter",effect:x,delay:90,solo:T,ready:T,autofocus:T},hide:{target:T,event:"mouseleave",effect:x,delay:0,fixed:T,inactive:T,leave:"window",distance:T},style:{classes:"",widget:T,width:T,height:T,def:x},events:{render:C,move:C,show:C,hide:C,toggle:C,visible:C,hidden:C,focus:C,blur:C}}})})(window,document);
};	
//Tooltip plugin end

//Constructor
init();