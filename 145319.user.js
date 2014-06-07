// ==UserScript==
// @name           Fidelity Mutual Fund Info Augmenter
// @namespace      http://www.someurlthingherethatsprettyunique.com/blah/FidelityMutualFundInfo
// @include        https://fundresearch.fidelity.com/mutual-funds/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==

/*

  Author: MCE

  Pulls info from morningstar.com and places it on a Fidelity Mutual Fund Summary page.
  
  Version: 1.0
    1.0 - First Release, works as of 9/6/2012
    1.1 - Release, works as of 3/1/2014

*/


//var symbol = $('input[name="symbol"]').val(); 
var symbol = $('.subhead').text(); 
//var extraInfoURL = "http://quote.morningstar.com/fund/snapdata.ashx?region=USA&culture=en-US&t=" + symbol;
//param "s" should be the index for comparison, however no easy way to get it so we omit it
var extraInfoURL = "http://performance.morningstar.com/Performance/fund/performance-history-1.action?t=" + symbol + "&s=&ndec=2&ep=true&align=m&y=5&culture=en_US&region=usa&comparisonRemove=false&ops=clear&cur=USD&loccat=&taxadj=&restr=true&pageCacheFlag=true&productCode=COM&version=&benchmarkSecId=&benchmarktype="
var mainholder = $("<div class='component' />");
var holder = $("<div class='component-info mfl-data-table' />");

var doneIt = false;
console.log(extraInfoURL);

GM_xmlhttpRequest({
  method: "GET",
  url: extraInfoURL,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/xml"            // If not specified, browser defaults will be used.
  },
  onreadystatechange: function(response) {
    if(!doneIt)
    {
        doneIt = true;
        mainholder.insertAfter("#summary-left div.component");
	mainholder.append(holder);
        holder.append("<div class='header'><h2>Morningstar Performance Data <a style='color:white; padding-left:25px' target='_blank' href='http://quote.morningstar.com/fund/f.aspx?t=" + symbol + "'>More...</a></div>");
        holder.append("<span id='waitSpinnerArea' class='mediumtext'>" + GetSpinner() + " Retrieving Data...</span>");
    }
  
  },
  onload: function(response) {
	// Inject responseXML into existing Object if not present
	//console.log($("#framelessNav").length);
	//eval(response.responseText);
	//console.log(mspr_PerformanceSum);
	//var obj = $(mspr_PerformanceSum.toString());

	var html = response.responseText.toString();
	  
	  //remove script tags
	regexp= new RegExp (/<script[^>]*>([\s\S]+?)<\/script>/gi);
	var obj = $(html);
	  
	  //find just the data table
	var tab = obj.find("table.r_table3");
	  tab.addClass("mfl-data-table-tabular");
	//GM_log("cnt:" + 	tab.find("tbody tr:nth-child(2n+1)").length);
	tab.find("tbody tr:nth-child(2n+1)").addClass("alt-rowcolor");
	tab.attr("style","");
	//tab("tr:nth-child(2n+1)").addClass("alt-rowcolor");
	  //tab.addClass("dash-bottom-border");

	$("#waitSpinnerArea").remove();
	holder.append(tab);
  }
});

      function GetSpinner()
        {
            return "<img id='waitspinner' hspace='5' alt='BG Ico' src='data:image/png;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH+GkNyZWF0ZWQgd2l0aCBhamF4bG9hZC5pbmZvACH5BAAKAAAAIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQACgABACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkEAAoAAgAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkEAAoAAwAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkEAAoABAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQACgAFACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQACgAGACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAAKAAcALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=='/>";
        }

