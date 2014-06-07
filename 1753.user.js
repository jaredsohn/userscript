// ==UserScript==
// @name          Autocreate episode
// @description	  Automatically creates skeleton episode page
// @include       http://tviv.info/*
// ==/UserScript==

/*
  Autocreate greasemonkey script for tviv.info wiki
  Copyright (c) 2005, Released under BSD license (do as you please with this script)
  Created by Tamas Kerecsen
  See http://tviv.info/wiki/User:Kerecsen
*/



(function () 
{

  var episodeSkeleton = 
  "{{stub}}\n<small>''Guest Stars'': ... </small>\n\n==Plot Overview==\n\n==Notes==\n==Arc Advancement==\n===Happenings===\n\n===Characters===\n\n"+
  "===Referbacks===\n\n==Trivia==\n===The Show===\n\n===Behind the Scenes===\n\n===Allusions and References===\n\n===Memorable Moments===\n\n" +
  "==Quotes==\n\n==Reviews==\n<!-- please edit these manually after you decide on a grade -->\n* '''Overall Grade''': <small>no reviews yet</small>\n" +
  "* '''Review Breakdown''': <small>A+: 0 A: 0 A-: 0 B+: 0 B: 0 B-: 0 C+: 0 C: 0 C-: 0 D: 0 F: 0</small>\n"+
  "<!-- please edit these manually after you decide on a grade -->\n\n";
  


  generateNewEp = function (event)
  {
     var href = event.target.getAttribute ("hhref");
     var myWindow = window.open (href, "");
     myWindow.addEventListener ("load", pageLoaded, true);
  }
  
  pageLoaded = function (event)
  {
      GM_log ("!!!!!!!!!!!!!I'm loaded!!!!!!!");

      if (event.target.editform.wpTextbox1.value != "")
      {
        GM_log ("Text field not empty -> bailing out");
        return;
      }

      var text;
      var qm = event.target.URL.indexOf('?');
      if (qm < 0)
      {
        GM_log ("ERROR: no url parameters found!");
        return;
      }
      var nv = event.target.URL.substring(qm+1).split('&');
      var params = new Object ();
      for(i = 0; i < nv.length; i++)
      {
        var eq = nv[i].indexOf('=');
        params[nv[i].substring(0,eq)] = unescape(nv[i].substring(eq + 1));
      }  
      
      text = 
         "{{Episode| episodetitle = " + params["epname"] +
      "\n|showtitle = " + params["showTitle"] +
      "\n|season = " + params["season"] +
      "\n|episodeimage =  " +
      "\n|episodenumber = " + params["sequentialNumber"] +
      "\n|airdate = " + params["airDate"] +
      "\n|productionnumber = " + params["prodCode"] +
      "\n|writer = " + 
      "\n|director = " + 
      "\n|previouslynumber = " + params["prevProdCode"] +
      "\n|previouslytitle = " + params ["prevEpName"] +
      "\n|nextnumber = " + params ["nextProdCode"] +
      "\n|nexttitle = " + params ["nextEpName"] +
      "\n|\n}}\n\n";
      
      text += episodeSkeleton;
      text += "[[Category:" + params["showTitle"] + "/Episodes|" + params["epname"] + "]]\n";
      text += "<small>Created with the invaluable help of [[User:Kerecsen/Greasemonkey|Tigs]], the TV IV Greasemonkey Script</small>\n"
      event.target.editform.wpTextbox1.value = text;

  }
  
  getHeader = function ()
  { 
     var headings = document.getElementsByTagName ("h1");
     if (headings) {
     	return headings[0].firstChild.data;
     }
  }
  
  function strtrim(str) {
     //Match spaces at beginning and end of text and replace
     //with null strings
     return str.replace(/^\s+/,'').replace(/\s+$/,'');
  }
  
  var tables = document.getElementsByTagName ("table");
  for (var i = 0; i < tables.length; ++i)
  {
     if (tables[i].rows[0] != null && tables[i].rows[0].cells[0] != null && tables[i].rows[0].cells[0].innerHTML.match(/<b>#<\/b>/))
     {
     	var currentTable = tables[i];
     	
        var airDateColumn = 3;
        var firstRow = currentTable.rows[0];
        for (var col = 0; col < firstRow.cells.length; ++col)
        {
            if (firstRow.cells[col].innerHTML.match(/Airdate/))
            {
               airDateColumn = col;
               break;
            }
        }
             
        var season = "&mdash;";
        var showTitle = null;
        header = getHeader ();
        headerChunks = header.split (/\//);
        if (headerChunks.length > 0) 
        {
            season = headerChunks[headerChunks.length-1];
            for (var j = 0; j < headerChunks.length-1; ++j)
            {
               if (showTitle == null) 
               {
                  showTitle = "";
               }
               else
               {
                  showTitle += "/";
               }
               showTitle += headerChunks[j];
            }
        }
     	
        var episodes = new Array (currentTable.rows.length);
        // 1-> skip header
     	for (var nrow = 1; nrow < currentTable.rows.length; ++nrow)
     	{
     	   if (currentTable.rows[nrow].cells.length > 1)
     	   {
     	   
              titleCell = currentTable.rows[nrow].cells[2];
              var link = null;
              var links = titleCell.getElementsByTagName ("a");
              if (links != null) 
              {
                 if (links.length > 0 && links[0].firstChild.nodeType == document.TEXT_NODE)
                 {
                     link = links[0];
                 }
              }
              var epname = "&mdash;";
              if (link != null)
              {
                 epname = link.firstChild.data;
              }
              else
              {
                 if (titleCell.firstChild != null && titleCell.firstChild.nodeType == document.TEXT_NODE)
                 {
                    epname = strtrim (titleCell.firstChild.data);
                 }
              }
              var sequentialNumber = "&mdash;"
              var prodCode = "&mdash;"
              var airDate = "&mdash;"
              var firstCell = tables[i].rows[nrow].cells[0];
              if (firstCell.firstChild != null && firstCell.firstChild.nodeType == document.TEXT_NODE)
              {
                 prodCode = strtrim (firstCell.firstChild.data);
              }
              var secondCell = tables[i].rows[nrow].cells[1];
              if (secondCell.firstChild != null && secondCell.firstChild.nodeType == document.TEXT_NODE)
              {
                 sequentialNumber = strtrim (secondCell.firstChild.data);
              }
              var airDateCell = tables[i].rows[nrow].cells[airDateColumn];
              if (airDateCell.firstChild != null && airDateCell.firstChild.nodeType == document.TEXT_NODE)
              {
                 airDate = strtrim (airDateCell.firstChild.data);
              }
             
              episodes[nrow] = new Object();
              episodes[nrow]["epname"] = epname;
              episodes[nrow]["sequentialNumber"] = sequentialNumber;
              episodes[nrow]["prodCode"] = prodCode;
              episodes[nrow]["airDate"] = airDate;
              episodes[nrow]["link"] = link;
           }
        }
        
        var prevEpName = "&mdash;";
	var prevProdCode = "&mdash;";

        for (var nrow = 1; nrow < currentTable.rows.length; ++nrow)
        {
            var link = episodes[nrow]["link"];
            if (link != null && link.getAttribute("class") == "new")
	    {
	         var nextProdCode = "&mdash;";
	         var nextEpName = "&mdash;";
	         if (nrow < currentTable.rows.length-1)
	         {
	            nextProdCode = episodes[nrow+1]["prodCode"];
	            nextEpName = episodes[nrow+1]["epname"];
	         }
	         href = link.href;
	         link.href = "#";
	         var hhref= href
	              + "&epname="+escape(episodes[nrow]["epname"])
	              + "&sequentialNumber="+escape(episodes[nrow]["sequentialNumber"])
	              + "&prevEpName="+escape(prevEpName)
	              + "&prevProdCode=" + escape(prevProdCode) 
	              + "&nextEpName=" + escape (nextEpName) 
	              + "&nextProdCode=" + escape (nextProdCode) 
	              + "&showTitle=" + escape(showTitle) 
	              + "&season="+ escape(season)
	              + "&airDate=" + escape(episodes[nrow]["airDate"]) 
	              + "&prodCode=" + escape (episodes[nrow]["prodCode"]);
	         link.setAttribute ("hhref", hhref);
	         link.addEventListener ("click", generateNewEp, true);
	     }
	     prevEpName = episodes[nrow]["epname"];
	     prevProdCode = episodes[nrow]["prodCode"];
         }
     
     }
  }



})();


