// ==UserScript==
// @name           Netflix Search Field Hot-linker
// @namespace      
// @include        http://www.netflix.com/*
// @description    Hot-links Netflix search field results to actual Movie page URLs instead of search pages.
// @author         Christopher Bachmann
// @version        1.0
// ==/UserScript==

if (!unsafeWindow.AutoCompleteSearch)
	return;

var AutoCompleteSearch = unsafeWindow.AutoCompleteSearch;
var Link = unsafeWindow.Link;
var searchResultKeyHandler = unsafeWindow.searchResultKeyHandler;

AutoCompleteSearch.toItemURL = function(_34){
	if(this.currentInputId===AutoCompleteSearch.Q_SEARCH_FIELD_ID){
		return [Link.pageURL(AutoCompleteSearch.ADD_TO_Q_URI),AutoCompleteSearch.ADD_TO_Q_PARAMS["MOVIEID"],_34.id,AutoCompleteSearch.SEARCH_QUERY_PARAMS["TRACKID"],AutoCompleteSearch.currentQueueTrkId].join("");
	}else{
		return [Link.pageURL("Movie"),AutoCompleteSearch.ADD_TO_Q_PARAMS["MOVIEID"],_34.id].join("");
		// another movie-page url plus tracking id
		//return [Link.pageURL("Movie/" + escape(_34.title) + "/"),_34.id,"?trkid=",AutoCompleteSearch.currentTrkId,"&lnkctr=srchrd-sr"].join("");
		// original search-form url left for historical value
		//return [Link.pageURL(AutoCompleteSearch.getSearchURI()),AutoCompleteSearch.SEARCH_QUERY_PARAMS.QUERY,escape(_34.title),AutoCompleteSearch.SEARCH_QUERY_PARAMS.COORDINATES,(AutoCompleteSearch.SEARCH_MODE&AutoCompleteSearch.SEARCH_MODES.PV_SEARCH)?[AutoCompleteSearch.SEARCH_QUERY_PARAMS.PREVIOUSLY_VIEWED,"1"].join(""):""].join("");
	}
}

AutoCompleteSearch.IP_SEARCH_FIELD_ID = "inpageSearchTerm";

searchResultKeyHandler.handleReturn = function(e){
	if(window.event){
		window.event.cancelBubble=true;
	}else{
		e.stopPropagation();
	}
	if(AutoCompleteSearch.currentInputId==AutoCompleteSearch.Q_SEARCH_FIELD_ID||AutoCompleteSearch.currentInputId==AutoCompleteSearch.IP_SEARCH_FIELD_ID||AutoCompleteSearch.currentInputId==AutoCompleteSearch.SEARCH_FIELD_ID){
		try{
			var _3f=document.getElementById(AutoCompleteSearch.RESULTS_ID);
			var _40=_3f.getElementsByTagName("a");
			var row=searchResultKeyHandler.handleVerticalArrows.locateRow(searchResultKeyHandler.CURRENT_FOCUS_INDEX,_40);
			window.location.href=row.href;
		}
		catch(e){
		}
	}
}
searchResultKeyHandler.keyHandlerMap={UP_ARROW:searchResultKeyHandler.handleVerticalArrows.eventHandler,DOWN_ARROW:searchResultKeyHandler.handleVerticalArrows.eventHandler,ESCAPE:searchResultKeyHandler.handleEscape,RETURN:searchResultKeyHandler.handleReturn};

