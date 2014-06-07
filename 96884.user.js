// ==UserScript==
// @name           add IMDb rating next to all IMDb links (+voter count)
// @author         Ali
// @description    Adds movie ratings and number of voters to any imdb link. Modified version of http://userscripts.org/scripts/show/9174
// @include        *
// @exclude        http://*imdb.*/*
// @version        2013-05-12
// @namespace      http://userscripts.org/scripts/show/96884
// @grant          GM_xmlhttpRequest
// @downloadURL    http://www.alibakir.com/upload/addimdbratings.js
// @updateURL      http://www.alibakir.com/upload/addimdbratings.js
// ==/UserScript==
var IMDBpluginlinks = document.links;
var IMDBcontinueelement=document.createElement("button");
IMDBcontinueelement.innerHTML="Get rating";    

function processIMDBLinks(s){
    IMDBcontinueelement.style.display = 'none';
    var r=0;
    for (IMDBi = s; IMDBi < IMDBpluginlinks.length; IMDBi++) {
    	if (IMDBpluginlinks[IMDBi].href.indexOf("/title/") != -1 && IMDBpluginlinks[IMDBi].href.indexOf("imdb.") != -1){
            if(r>300){
                IMDBcontinueelement.onclick=function(){ processIMDBLinks(IMDBi); };
                IMDBcontinueelement.style.display='inline';
                IMDBpluginlinks[IMDBi].parentNode.insertBefore(IMDBcontinueelement, IMDBpluginlinks[IMDBi]);
                break;
            }
            r++; 
    		GM_xmlhttpRequest({
    			method: 'get',
    			headers: {
    			},
    			url: IMDBpluginlinks[IMDBi].href,
    			onload: function (IMDBi){return function(result) {
    				 rating = result.responseText.match(/Users rated this (.*) \(/);
    				 votes = result.responseText.match(/\((.*) votes\) -/);
    				 IMDBpluginlinks[IMDBi].parentNode.insertBefore(document.createElement("span"), IMDBpluginlinks[IMDBi]).innerHTML = (rating ? "<b> [" + rating[1] + " - "+votes[1]+"] </b>" : "<b style='color: red;'>[NA] </b>&nbsp;");
    			}}(IMDBi)
    		});
    	}
    }
}
processIMDBLinks(0);