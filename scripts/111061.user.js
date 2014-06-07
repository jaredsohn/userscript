// ==UserScript==
// @name           Export GitHub Issues with Basic Authentication
// @namespace      http://userscripts.org/users/adessens
// @description    Can export GitHub issues by state, label, and milestone. Basic Authentication supported.
// @version        1.0
// @author         Andre Dessens
// @include        /^https?://github\.com/.*/issues.*/
// @license        MIT (See file header)
// @copyright      (c) 2011 Tim Smart
// ==/UserScript==

// Disclaimer: This script is based on Tim Smart's original Export GitHub Issues script:
// (http://userscripts.org/scripts/show/68105)

// The MIT License
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function() {


const URL_EXPRESSION = /^.*\/(.*?\/.*?)\/issues.*$/;
const GITHUB_API_URL = 'https://api.github.com';
const ONE_DAY=1000*60*60*24;

var url = top.location.href.match(URL_EXPRESSION);
if (!url)
  return;

[, repo] = url;

// Now for the github api goodness
var GithubRequest = function() {
  arguments = Array.prototype.slice.call(arguments);
  this._options = arguments;
};
GithubRequest.prototype = {
  send: function(callback) {
    var response;
    var tempResponse;

    var page = 1;
    var self = this;

    var username = prompt("Username (leave blank if authentication not required):");
    var password = prompt("Password:");

    var url = GITHUB_API_URL;
    var auth = username+":"+password;
    auth = btoa(auth);

    do
    {
      tempResponse = null;
      url += '/repos/'+this._options[0];
      url += '/issues?milestone='+this._options[1];
      url += '&state='+this._options[2];
      url += '&page='+page+'&per_page=50';
      if (this._options[3] != "") url += '&labels='+this._options[3];


      if (username == "") {
        //No authentication provided
        GM_xmlhttpRequest({
          method: 'GET',
          url: url,
          onload: function(xhr) {
            tempResponse = JSON.parse(xhr.responseText);
          }
        });
      } else {
        //Authentication provided
        GM_xmlhttpRequest({
          method: 'GET',
          url: url,
          headers: {'Authorization': 'Basic '+auth},
          onload: function(xhr) {
            tempResponse = JSON.parse(xhr.responseText);
          }
        });
      }

      for (var i=0; tempResponse == null; i++)
      {
        if (i == 10)
        {
          alert("Response Timeout.");
          callback.call(self, null);
        }
        alert("Request batch "+page+". Click 'OK' to proceed.");
      }

      url = GITHUB_API_URL;
      page++;

      if (response == null) {
        response = tempResponse;
      } else {
          response = response.concat(tempResponse);
      }

      alert("Number of issues acquired: "+tempResponse.length+" (Running Total: "+response.length+")");
    }
    while (tempResponse.length != 0 && page <= 10);
    callback.call(self, response);
  }
};

// Formatter
var formatOutput = function(source) {
  var output = '';

    output += "ID \t";
    output += "State \t";
    output += "Title \t";
    //output += "Body \t";

    output += "Assignee \t";
    output += "Reporter \t";

    output += "Created \t";
    output += "Open Since \t";
    output += "Updated \t";
    output += "Last Updated \t";
    output += "Closed \t";

    output += "Comments \t";
    output += "Milestone \t";
    output += "Labels";
    output += "\n";

  for (var i = 0, issue; issue = source[i]; i++) {
    // ID
    output += issue.number + "\t";
    // State
    output += issue.state + "\t";
    // Title
    output += issue.title + "\t";
    // Body
    //output += issue.body + "\t";

    // Assignee
    output += (issue.assignee == null)?"\t":issue.assignee.login + "\t";
    // Reporter
    output += issue.user.login + "\t";

    // Created
    var created = new Date(issue.created_at);
    output += (created.getMonth()+1) + "/" + created.getDate() + "/" + created.getFullYear() + " " + created.getHours() + ":" + created.getMinutes() + "" + "\t";
    // Open Since
    var openSince = (new Date()-created)/ONE_DAY;
    output += Math.floor(openSince) + " days - " + Math.round(24*(openSince-Math.floor(openSince))) + " hrs " + "\t";
    // Updated
    var updated = new Date(issue.updated_at);
    output += (updated.getMonth()+1) + "/" + updated.getDate() + "/" + updated.getFullYear() + " " + updated.getHours() + ":" + updated.getMinutes() + "" + "\t";
    //Last Updated
    var lastUpdated = (new Date()-updated)/ONE_DAY;
    output += Math.floor(lastUpdated) + " days - " + Math.round(24*(lastUpdated-Math.floor(lastUpdated))) + " hrs " + "\t";
    // Closed
    var closed = new Date(issue.closed_at);
    (issue.state == "closed")?output += (closed.getMonth()+1) + "/" + closed.getDate() + "/" + closed.getFullYear() + " " + closed.getHours() + ":" + closed.getMinutes() + "" + "\t":output += "\t";

    // Comments
    output += issue.comments + "\t";
    // Milestone
    output += issue.milestone.title + "\t";
    //Labels
    if (issue.labels != null) {
      for (var j = 0; j < issue.labels.length; j++)
      {
        output += issue.labels[j].name;
        (j < issue.labels.length-1)?output += ",":"";
      }
    }

    output += "\n";
  }

  return output;
};

// Make the callbacks
var menuCallback = function() {
  repo = prompt('Repository name:', repo);

  var milestone = prompt('Milestone number (none = no milestone, * = any milestone):', '*');

  var state = prompt('Issue state ("open", "closed"):', 'open');
  state = state.toLowerCase();
  if ('closed' !== state && 'open' !== state) {
    alert('Invalid state!');
    return;
  }

  var labels = prompt('Labels (Seperated by ","):');
  labels = labels.toLowerCase();
  if ('' === labels)
    labels = false;
  else
    labels = labels.split(',');

  new GithubRequest(repo, milestone, state, labels).send(function(response) {
    if ("object" === typeof response) {
      var issues = response;
    } else {
      alert('Bad response! ');
      return;
    }

    issues = formatOutput(issues);
    GM_openInTab("data:text/plain;charset=utf-8," + encodeURIComponent(issues));
  });
};

GM_registerMenuCommand('Export GitHub Issues', menuCallback);

})();
