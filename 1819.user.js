// JIRA Worklog Helper user script
// version 0.92
// 2005-08-31
// Copyright (c) 2005, Leonard Lin
// Released under the GPLv2 license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// JIRA has built in worklogging, which is a great feature w/ some very nice 
// reporting (I especially like the accuracy and developer reports), but sadly 
// worklogging is done in a separate screen and is rather inconvenient.
//
// This script simplifies work logging for JIRA:
// * Tracks the work time for an issue if you're use the 'Start Progress' link
// * Adds inline worklog form for 'Stop Progress', prefilled with tracked time
// * Resolve/Close display a worklog form, prefilled with any tracking info
//
// This has been tested to work with default templates on JIRA 3.3+, however
// Due to the nature of the additions (DOM replacements, workflow-based action)
// you may have to make modifications to the script if you have different 
// workflow IDs or document structure
//
// TODO: 
// * separate tests to make it easier for different versions
// * autoclear cookied times for completed items? (right now keeps 10 day 
//   cookie for all work items)
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JIRA Worklog Helper
// @namespace     http://greasemonkey.randomfoo.net/jira/
// @description   JIRA worklog helper application
// @include       http://your.jira.url/*
// ==/UserScript==

(function() {

  // Run for proper pages
  var x;
  var url = document.location.href.split("/");
  if(x = url.pop()) {
    if(x.indexOf("CommentAssignIssue!default.jspa?") == 0) {
      if( (x.indexOf("action=2") != -1)  || (x.indexOf("action=5") != -1) )
        modifyIssueWorkflowPage(url);
    } else if (x = url.pop()) {
      if(x == "browse") {
        modifyIssuePage(url);
      }
    }
  } 

  // Add Worklog form to Workflow Pages
  function modifyIssueWorkflowPage(url) {
    url.pop();
    var baseurl = url.join("/") + "/";
    var id = x.split("=").pop();
    var time = getStoredTime(id);
        
    // Override Submit to record worklog first
    document.jiraform.addEventListener("submit", function(e) {
      if(t = document.getElementById("timeLogged").value) {
        s = baseurl + "secure/LogWork.jspa?id=" + id + "&timeLogged=" + t + "&newEstimate=" + document.getElementById("newEstimate").value + "&adjustEstimate=new&comment=" + escape(document.getElementById("wlcomment").value);
        i = new Image;
        i.src = s;
        
        clearStoredTime(id);
      }
    }, false);
      

    // Publish the Worklog Form
    var el = document.jiraform.childNodes[1].childNodes[1].childNodes[10];
    el.innerHTML = '<td align="right" style="padding-top:5px">Worklog:</td> \
                    <td bgcolor="white"> \
                      <div style="margin: 10px 0;"> \
                        Time Spent: <input id="timeLogged" value="' + time + '" size="5" /> \
                        Time Remaining: <input id="newEstimate" value="0" size="5" /> \
                        <input type="hidden" id="adjustEstimate" id="new_estimate_id" align=absmiddle value="new" ><br /> \
                        <textarea id="wlcomment" cols="30" rows="2" wrap="virtual" style="width:50%"></textarea> \
                      </div> \
                    </td>';
  }
  
  
  // Add Worklog form-mods to Issue Pages
  function modifyIssuePage(url) {
    var baseurl = url.join("/") + "/";
    var id = document.jiraform.id.value;
    
       
    // Start Progress
    if(el = document.getElementById("action_id_4"))
      // Store Time on Start Progress
      el.addEventListener("click", function(e) {
        setStoredTime(id);
      }, false);

    
    // Stop Progress
    if(el = document.getElementById("action_id_301")) {
      // Submit Time on Stop Progress
      el.addEventListener("click", function(e) {
        // Submit Time
        if(t = document.getElementById("timeLogged").value) {
          s = baseurl + "secure/LogWork.jspa?id=" + id + "&timeLogged=" + t + "&adjustEstimate=auto&comment=" + escape(document.getElementById("wlcomment").value);
          i = new Image;
          i.src = s;
          
          clearStoredTime(id);
        }
      }, false);
      
      // Render Form
      var time = getStoredTime(id);
      p = document.createElement("div");
      p.innerHTML = '<div style="margin: 2px 5px; font-size: 11px"> \
                     <div align="right">Time Spent: <input id="timeLogged" value="' + time + '" size="5" style="font-size:11px;text-align:right;" /> \
                     <textarea id="wlcomment" cols="20" wrap="virtual" style="width:100%; height: 3em; margin-top:4px; font-size:9px; font-family:verdana"></textarea> \
                     </div>';
      el.parentNode.parentNode.appendChild(p);
      
    }
  }

  function setStoredTime(id) {
    newwork = "WORK=";
  
    c = document.cookie.split("; ");
    
    // WORK cookie doesn't exist, lets just make it
    if(document.cookie.indexOf(newwork) == -1) {
      document.cookie = newwork + id + ":" + new Date().getTime() + "; expires=" + expDate(10) + "; path=/";
      return;
    }
    
    for(i = 0; i < c.length; i++) {
      if(c[i].substr(0, 5) == "WORK=") {
        kv = c[i].split("=");
        t = kv[1].split(":");
      
        // New value
        newwork += id + ":" + new Date().getTime() + ":";
        
        // Old stuff
        while(tid = t.shift()) {
          ttime = t.shift();
          
          if(tid != id) {
            newwork += tid + ":" + ttime + ":";
          }
        }
        // chomp last ":"
        newwork = newwork.substr(0, newwork.length-1);
        
        document.cookie = newwork + "; expires=" + expDate(10) + "; path=/";
      }
    }
  
  
  }

  // Tries to find Stored Time
  function getStoredTime(id) {
    if(document.cookie.length == 0) return '';
    
    c = document.cookie.split("; ");
    for(i = 0; i < c.length; i++) {
      if(c[i].substr(0, 5) == "WORK=") {
        kv = c[i].split("=");
        t = kv[1].split(":");
        
        while(tid = t.shift()) {
          ttime = t.shift();
          
          if(tid == id) {
            return Math.ceil((new Date().getTime() - ttime)/(1000*60)) + "m";
          }
        }
      }
    }
    return '';
  } 
    
  
  function clearStoredTime(id) {
    newwork = "WORK=";
    if(document.cookie.length == 0) return;
    
    c = document.cookie.split("; ");
    for(i = 0; i < c.length; i++) {
      if(c[i].substr(0, 5) == "WORK=") {
        kv = c[i].split("=");
        t = kv[1].split(":");
        
      
        while(tid = t.shift()) {
          ttime = t.shift();
          
          if(tid != id) {
            newwork += tid + ":" + ttime + ":";
          }
        }
        // chomp last ":"
        newwork = newwork.substr(0, newwork.length-1);
        
        // empty
        if(newwork == "WORK") {
          document.cookie = newwork + "=; expires=" + expDate(-1) + "; path=/";
        } else {
          document.cookie = newwork + "; expires=" + expDate(10) + "; path=/";
        }
      }
    }
  } 

  // Return Cookie expiration date
function expDate(i) {
    exp = i * 24 * 60 * 60 * 1000;
    var date = new Date();
    date.setTime(date.getTime() + (exp));
    return date.toGMTString();
  }



})();
