// ==UserScript==
// @name           Export GitHub Issues
// @namespace      http://userscripts.org/users/tim
// @description    Can export issues by state and label
// @include        http://github.com/*/issues*
// @license        MIT (See file header)
// @copyright      (c) 2011 Tim Smart
// ==/UserScript==

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


const URL_EXPRESSION = /^.*\/(.*?)\/(.*?)\/issues.*$/;
const GITHUB_API_URL = 'http://github.com/api/v2/json';

var url = top.location.href.match(URL_EXPRESSION);
if (!url)
  return;

[, user, repo] = url;

// Now for the github api goodness
var GithubRequest = function() {
  arguments = Array.prototype.slice.call(arguments);
  this._options = arguments;
};
GithubRequest.prototype = {
  send: function(callback) {
    var self = this;

    GM_xmlhttpRequest({
      method: 'GET',
      url: GITHUB_API_URL + '/' + this._makeApiParams(),
      onload: function(xhr) {
        var response = JSON.parse(xhr.responseText);
        callback.call(self, response);
      }
    });
  },
  _makeApiParams: function() {
    return this._options.join('/');
  }
};

// Formatter
var formatOutput = function(source) {
  var output = '';

  for (var i = 0, issue; issue = source[i]; i++) {
    // Title
    output += "Title: " + issue.title + "\n";
    // State
    output += "State: " + issue.state + "\n";
    // Labels
    output += "Labels: " + issue.labels.join(', ') + "\n";
    // Created
    output += "Created On: " + issue.created_at + "\n";
    // Updated
    output += "Last Updated: " + issue.updated_at + "\n";
    // Body
    //output += "Body:\n" + issue.body + "\n";

    output += "\n\n";
  }

  return output;
};

// Make the callbacks
var menuCallback = function() {
  var state = prompt('What state should the issues be? ("open", "closed")', 'closed');
  state = state.toLowerCase();
  if ('closed' !== state && 'open' !== state) {
    alert('Invalid state!');
    return;
  }

  var labels = prompt('What labels should the issues have? (Seperated by ",")');
  labels = labels.toLowerCase();
  if ('' === labels)
    labels = false;
  else
    labels = labels.split(',');

  new GithubRequest('issues', 'list', user, repo, state).send(function(response) {
    if ("object" === typeof response.issues)
      var issues = response.issues;
    else {
      alert('Bad response!');
      return;
    }

    if (false !== labels) {
      issues = issues.filter(function(issue) {
        if (0 >= issue.labels.length)
          return false;

        for (var i = 0, label; label = issue.labels[i]; i++) {
          if (-1 !== labels.indexOf(label.toLowerCase()))
            return true;
        }
      });
    }

    issues = formatOutput(issues);
    GM_openInTab("data:text/plain;charset=utf-8," + encodeURIComponent(issues));
  });
};

GM_registerMenuCommand('Export Github Issues', menuCallback);

})();
