// ==UserScript==
// @name           LinkedIn Remove Contact
// @namespace      com.mohamedmansour.linkedin.removecontacts
// @description    Removes Contact from LinkedIn Easily
// @version        1.0
// @include        http://*.linkedin.com/profile/view?id=*
// @include        https://*.linkedin.com/profile/view?id=*
// ==/UserScript==

var CONNECTIONS_SERVICE_URL = 'http://www.linkedin.com/connections';
var CSRF_SERVICE_URL = CONNECTIONS_SERVICE_URL + '?displayBreakConnections';
var CSRF_TOKEN_PATTERN = '<input type="hidden" name="csrfToken" value="(ajax:\\d+)">';
var PROFILE_CONTAINER_SELECTOR = '.profile-actions-secondary';
var INVITE_SELECTOR = 'a[name="inviteLink"]';

function getCSRFToken(callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: CSRF_SERVICE_URL,
    onload: function(response) {
      var csrfMatch = response.responseText.match(CSRF_TOKEN_PATTERN);
      if (csrfMatch) {
        callback(csrfMatch[1]);
      }
      else {
        callback(false);
      }
    }
  });
}

function removeConnections(ids, callback) {
  getCSRFToken(function(token) {
    if (!token) {
      callback(false);
      return;
    }

    var formData = new FormData();
    formData.append('csrfToken', token);
    ids.forEach(function(id, idx) {
      formData.append('connectionChooser', id);
    });
    formData.append('breakConnections', 'Remove Connections');

    GM_xmlhttpRequest({
      method: 'POST',
      url: CONNECTIONS_SERVICE_URL,
      data: formData,
      onload: function(response) {
        callback(true);
      }
    });
  });
}

function getQueryParametersObject() {
  var query = location.search.substr(1);
  var data = query.split('&');
  var result = {};
  for(var i = 0; i < data.length; i++) {
    var item = data[i].split('=');
    result[item[0]] = item[1];
  }
  return result;
}

function removeConnectionClicked(e) {
  var profileID = queryObject.id;
  e.target.innerText = 'Removing connection ...';
  e.target.onclick = function() {return false;};
  e.target.style.cursor = 'wait';
  removeConnections([profileID], function(status) {
    if (status) {
      window.location.reload();
    }
    else {
      alert('Something went wrong removing connection.');
    }
  });
  return false;
}

function renderRemoveConnectionLink() {
  var inviteSelector = document.querySelector(INVITE_SELECTOR);
  if (inviteSelector && inviteSelector.innerText.trim() === 'Connect') {
    return;
  }

  var profileDOM = document.querySelector(PROFILE_CONTAINER_SELECTOR);

  var removeConnectionDOM = document.createElement('a');
  removeConnectionDOM.innerText = 'Remove Connection';
  removeConnectionDOM.href = '#';
  removeConnectionDOM.onclick = removeConnectionClicked;

  var aboutDOM = document.createElement('a');
  aboutDOM.innerText = '  (?)';
  aboutDOM.setAttribute('target', '_blank');
  aboutDOM.setAttribute('href', 'http://mohamedmansour.com/chrome/linkedin-remove/');
  
  var listDOM = document.createElement('li');
  listDOM.appendChild(removeConnectionDOM);
  listDOM.appendChild(aboutDOM);

  profileDOM.appendChild(listDOM);
}


// Do not run in iframes
if (window.top === window.self) {
  var queryObject = getQueryParametersObject();
  renderRemoveConnectionLink();
}