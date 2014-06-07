// Copyright 2010 Andrea Forni 
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.


// ==UserScript==
// @name           JIRA: Version Control Table
// @namespace      http://userscripts.org/scripts/show/72352
// @description    Reorganizes the entries in the version control tab. The files committed for the particular issue are grouped into projects and branches they belong. In this way is possible to see all the files committed for the given project in the given branch. For each file, a descending list of commit dates is displayed.
// @include        *jira*/browse/*-*
// @require        http://github.com/forni/jQuery4Greasemonkey/raw/master/jquery-1.4.2.js
// @version        0.1
// @author         Andrea Forni
// ==/UserScript==

/* The default language of the Jira application in which this script will run. */
var default_language = "IT";

/*****************************************************************************/
/*** Dictionary class                                                      ***/
/*****************************************************************************/
/* The Dictionary class is used to adapt the script to the language used
 * by the Jira version in which the script will run. */
function Dictionary(lang) {
  this.lang = lang;
  /* The structure of the dictionary is the following:
   * 1st level: the language. 
   * 2rd level: the specific voices for the given language. */
  this.dictionary = {
    "IT": {
      /* The regular expression is used to extract the single fields
       * of a timestamp string.
       * The Italian format is: "dd/mm/yy HH:MM" */
      "date_regexp": /(..)\/(..)\/(..) (..):(..)/,
      /* Takes in input a match object and returns a list 
       * of the single parts of the date in the following order:
       * 0. the day of month (from 1-31)
       * 1. the month (from 0-11)
       * 2. the year (four digits)
       * 3. the hours (from 0-23)
       * 4. the minutes (from 0-59) */
      "date_filler": function(m) { 
        return Array(m[1], new Number(m[2])-1, "20"+m[3], m[4], m[5]);
      },
      /* Takes in input a Date object and returns a string 
       * representing it. */
      "date_formatter": function(dateObj) {
        var day     = dateObj.getDate();
        var month   = dateObj.getMonth() + 1; // month starts from zero
        var year    = dateObj.getFullYear();
        var hours   = dateObj.getHours();
        var minutes = dateObj.getMinutes();

        if(day     < 10) day     = "0" + day;
        if(month   < 10) month   = "0" + month;
        if(hours   < 10) hours   = "0" + hours;
        if(minutes < 10) minutes = "0" + minutes;
        return day +"/"+ month +"/"+ year +" "+ hours +":"+ minutes;
      },
      /* The regular expression matches the text displayed when there
       * are no commit for the Jira issue. */
      'no_commit_regexp': /.*nessun commit.*/,
      /* The name of the Version Control tab. */
      'tab_title_text': "Controllo versioni"
    } 
  };

  this.get = function(voice) { return this.dictionary[this.lang][voice]; };
};


/*****************************************************************************/
/*** Greasemonkey specific code                                            ***/
/*****************************************************************************/
GM_addStyle([
  ".jira_gm-highlight {background-color: #ffffd4;}"
].join("\n\n"));

/*****************************************************************************/
/*** New Array methods                                                     ***/
/*****************************************************************************/
Array.prototype.keys = function() {
  var keys = new Array();
  for(key in this)
    if((typeof this[key]) != "function")
        keys.push(key);

  return keys;
}

Array.prototype.select = function(selectFunction) {
  var result = new Array();
  for(var i = 0; i < this.length; i++)
    if(selectFunction(i, this[i]))
      result.push(this[i]);
  return result;
}

Array.prototype.collect = function(collectFunction) {
  var result = new Array();
  for(var i = 0; i < this.length; i++)
    result.push(collectFunction(i, this[i]));
  return result;
}

Array.prototype.uniq = function() {
  var sorted = this.sort();
  var result = new Array();
  var prev_val = "";
  for(var i = 0; i < sorted.length; i++) {
    if(prev_val != sorted[i]) {
      prev_val = sorted[i];
      result.push(prev_val);
    }
  }
  return result;
}

/*****************************************************************************/
/*** Entry class                                                           ***/
/*****************************************************************************/
function Entry() {
  this.files = new Array();

  this.getAuthor = function() {return this.author}
  this.setAuthor = function(author) {this.author = author}
  
  this.getProject = function() {return this.project}
  this.setProject = function(project) {this.project = project}
  
  this.getBranch = function() {return this.branch}
  this.setBranch = function(branch) {this.branch = branch}
  
  this.getDate = function() {return this.date}
  this.setDate = function(date) {this.date = date}
  
  this.getFiles = function() {return this.files}
};

/*****************************************************************************/
/*** Parser class                                                          ***/
/*****************************************************************************/
function Parser(dictionary) {
  this.dict = dictionary;

  /* Each entry is composed by an header (action-details)
   * and a body (action-body). */
  this.parse = function parse(entry) {
    entryObj = new Entry(); 
    details = $(entry).children('.action-details').first();
    this.parseVCDetails(details, entryObj);
    body = $(entry).children('.action-body').first();
    this.parseVCBody(body, entryObj);

    return entryObj;
  }
  
  this.parseVCDetails = function parseVCDetails(details, entryObj) {
    author = $.trim($(details).children('a').first().text());
    entryObj.setAuthor(author);
    detailsStr = $.trim($(details).text());
    detailsRegexp = /.*committed (.*) file(s)? to '(.*?)'\s+(on branch '(.*)')?\s+- (.*)$/
    if(detailsStr.match(detailsRegexp)) {
    match = detailsRegexp.exec(detailsStr);
    entryObj.setProject(match[3]);
    branch = match[5];
    if(branch == undefined)
      branch = "HEAD";
    entryObj.setBranch(branch);
    var commitDate = this.parseDate(match[6]);
    entryObj.setDate(commitDate);
    }
    return entryObj;
  }

  this.parseDate = function parseDate(stringDate) {
    var commitDate = new Date();
    var dateRegexp = this.dict.get("date_regexp");
    var match = dateRegexp.exec(stringDate);
    var fields = this.dict.get("date_filler")(match);

    commitDate.setDate(fields[0]);
    commitDate.setMonth(fields[1]);
    commitDate.setFullYear(fields[2]);
    commitDate.setHours(fields[3]);
    commitDate.setMinutes(fields[4]);
    return commitDate;
  }
  
  this.parseVCBody = function parseVCBody(body, entryObj) {
    var trs = $(body).children('table');
    trs = $(trs).children('tbody'); 
    trs = $(trs).children('tr:last'); 
    trs = $(trs).children('td:last');
    trs = $(trs).children('table');
    trs = $(trs).children('tbody');
    trs = $(trs).children('tr');
    $(trs).each(function(index){
      var tds = $(this).children('td');
      var state = $.trim($(tds).eq(0).text());
      var file = $.trim($(tds).eq(1).text());
      entryObj.getFiles().push(new Array(file, state));
    });
  }
};

/*****************************************************************************/
/*** Order entries function                                                ***/
/*****************************************************************************/
function orderEntries(entries) {
  var result = new Array();
  var branches = entries.collect(function(i, el) {return el.getBranch();}).uniq();
  for(var i = 0; i < branches.length; i++) {
    var branch = branches[i];
    var project_entries = entries.
                          select(function(i, el) {return el.getBranch() == branch});
    result[branch] = new Array();
    for(var j = 0; j < project_entries.length; j++) {
      var entry = project_entries[j];
      var proj = entry.getProject();
      if( result[branch][proj] == undefined)
        result[branch][proj] = new Array();
      for(var k = 0; k < entry.getFiles().length; k++) {
        var filename = entry.getFiles()[k][0];
        var state = entry.getFiles()[k][1];
        if(result[branch][proj][filename] == undefined)
          result[branch][proj][filename] = new Array();
        result[branch][proj][filename][entry.getDate()] = state;
      }
    }

  }
  return result;
}

/*****************************************************************************/
/*** From Entries to HTML                                                  ***/
/*****************************************************************************/
function entriesToHtml(entries, dict) {
    var ordered_entries = orderEntries(entries);
    var branches = ordered_entries.keys();
    var html = "<a name='jira_gm-top'><div class='actionContainer'><h1>Summary</h1></a>";
    html += "<h2>Branches: ";
    for (var i = 0; i < branches.length; i++) {
        branch = branches[i];
        html += "<a href='#jira_gm-"+branch+"'>"+branch+"</a>";
        if(i < branches.length-1)
          html += " - "
    }
    html += "</h2>"
    html += "<div id='jira_gm-branches'>";
    for (var i = 0; i < branches.length; i++) {
      branch = branches[i];
      html += "<div>"
      html += "<a name='jira_gm-"+branch+"'><h2>"+branch+"</h2></a> (<a href='#jira_gm-top'>top</a>)"
      html += "<table class='confluenceTable'>"
      projects = ordered_entries[branch].keys().sort();
      for(var j = 0; j < projects.length; j++) {
        var proj = projects[j];
        html += "<tr><td colspan='3' style='padding-top: 7px;'><b>"+proj+"</b></td></tr>"
        html += "<tr><th class='confluenceTh'>#</th><th class='confluenceTh'>Filename</th><th class='confluenceTh'>Data</th></tr>"
        var files = ordered_entries[branch][proj].keys().sort();
        for(var k = 0; k < files.length; k++) {
          var filename = files[k];
          var dates = ordered_entries[branch][proj][filename].keys()
                        .collect(function(i,el){ return new Date(el); })
                        .sort(function(a,b){return (b.getTime() - a.getTime())});
          html += "<tr class='jira_gm-files'><td class='confluenceTd'>"+(k+1)+"</td><td class='confluenceTd'>"+filename+"</td><td class='confluenceTd'>";
          for(var z = 0; z < dates.length; z++) {
            var dateval = dates[z];
            var sep = ' > ';
            var state = ordered_entries[branch][proj][filename][dateval];
            if(z == dates.length-1)
              sep = "";
            html += dict.get('date_formatter')(dateval) + " (" + state + ")" + sep;
          } 
          html += "</td></tr>";
        }
      } 
      html += "</table>"
      html += "</div>"
    }
    html += "</div>";
    html += "</div>";
    return html;
}

/*****************************************************************************/
/*** Some test functions                                                   ***/
/*****************************************************************************/
/* Returns true if the Jira page is visualizing the section "section_name",
 * false otherwise.
 * The section name is the title of the tab (for example "All", "Comments",
 * "Work Log", "Change History", "Activity Stream", ...). */
function isRightSection(section_name) {
  /* Searches a label with section_name: tests the existence of the label */
  var sectionExists = $('#issue_actions_container').prev().find('td b:contains("'+section_name+'")');
  /* Searches a label with section_name wrapped in a <a> element: tests that 
   * the label is not currently selected. */
  var wrongSection = $('#issue_actions_container').prev().find('td b > a:contains("'+section_name+'")');
  return(sectionExists.length > 0 && wrongSection.length == 0);
}

/* Returns true if the "Version Control" section is empty, false otherwise. */
function isVersionControlSectionEmpty(dict) {
  var actionContainer = $('.actionContainer');
  var len = actionContainer.length;
  return ( len == 1 && $.trim(actionContainer.text()).match(dict.get('no_commit_regexp')));
}

/*****************************************************************************/
/*** MAIN                                                                  ***/
/*****************************************************************************/
$(document).ready(function() {  
    var dictionary = new Dictionary(default_language);
    if( isRightSection(dictionary.get('tab_title_text')) &&
        !isVersionControlSectionEmpty(dictionary) ) 
    {
      /* Parse each entry and puts it into the "entries" array */
      var entries = new Array();
      var parser = new Parser(dictionary);
      $('.actionContainer').each(function(index){
        entry = parser.parse(this);
        entries[index] = entry;
      });
      /* If at least one entry has been found, the HTML is
       * generated and attached to the page. */
      if(entries.length > 0) {
        html_table = entriesToHtml(entries, dictionary);
        $('#issue_actions_container').first().prepend(html_table);

        $('.jira_gm-files').dblclick(function(e) {
          $(this).toggleClass("jira_gm-highlight");
        }); 
      }
    }
});


