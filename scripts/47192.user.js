// ==UserScript==
// @name          Google site search
// @namespace     http://chrisroos.co.uk/
// @description   Insert a 'google site search' search form to every page.  *NOTE* It's not visible by default, instead it appears at the top of the page when you hit the accesskey combo (ctrl-9 on Mac, shift+alt+9 on Windows).  Hide it again by pressing escape within the form.
// @include       *
// @exclude       http://www.google.co.uk*
// @exclude       http://www.google.com*
// ==/UserScript==

// TODO: ADD README
// TODO: Try use object.style.property = xxx to set styles.  That way I might be able to keep the style of the container consistent but hide/show it with display: none / block
// TODO: Refactor the code
// TODO: Make the search form consistent across sites, even though they specically style form elements in a certain way
// TODO: Deal with frames.  At the moment, a search box will be inserted into each frame.
// TODO: Truncate the length of the text displayed in the listbox for long urls

(function() {
  // Create an array of 'sites' (either the domain or domain + paths) that the user can use to search google with
  var sites = [window.location.host];
  if (window.location.pathname != '/') {
    // pathComponentsTemp will contain empty elements.  We iterate over this and populate pathComponents with just the non-empty elements
    var pathComponentsTemp = window.location.pathname.split('/');
    var pathComponents = [];
    for (var pathComponentIndex = 0; pathComponentIndex < pathComponentsTemp.length; pathComponentIndex++) {
      if (pathComponentsTemp[pathComponentIndex]) {
        pathComponents.push(pathComponentsTemp[pathComponentIndex]);
      }
    }
    // We can't use pathComponents.length in the for (...) statement because it changes as we pop() elements
    var pathComponentCount = pathComponents.length;
    for (var pathComponentIndex = 0; pathComponentIndex < pathComponentCount; pathComponentIndex++) {
      sites.push(window.location.host + '/' + pathComponents.join('/'));
      pathComponents.pop();
    }
  }
  
  var sitesSelect = document.createElement('select');
  sitesSelect.setAttribute('name', 'q');
  sitesSelect.setAttribute('style', 'margin-left: 5px;');
  sitesSelect.addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      // Submit the form when someone presses enter on the list box
      document.getElementById('greasemonkey-google-site-search-form').submit();
    } else if (event.keyCode == 27) {
      // Hide the search container when someone presses escape
      var container = document.getElementById('greasemonkey-google-site-search-container');
      container.setAttribute('style', 'position: absolute; left: -3000px;');
    }
  }, true);
  sites.sort(); // This should result in a list of sites ordered by length
  for (var i = 0; i < sites.length; i++) {
    var site = sites[i];
    var sitesOption = document.createElement('option');
    sitesOption.setAttribute('value', 'site:' + site);
    sitesOption.appendChild(document.createTextNode(site));
    sitesSelect.appendChild(sitesOption);
  }

  var s2 = document.createElement('input');
  s2.setAttribute('id', 'greasemonkey-google-site-search-q');
  s2.setAttribute('type', 'text');
  s2.setAttribute('name', 'q');
  s2.setAttribute('style', 'margin-left: 5px;');
  s2.addEventListener('keypress', function(event) {
    if (event.keyCode == 27) {
      // Hide the search container when someone presses escape
      var container = document.getElementById('greasemonkey-google-site-search-container');
      container.setAttribute('style', 'position: absolute; left: -3000px;');
    }
  }, true);

  var s3 = document.createElement('input');
  s3.setAttribute('type', 'submit');
  s3.setAttribute('name', 'sa'); // Is this name important?
  s3.setAttribute('value', 'google site search');
  s3.setAttribute('style', 'margin-left: 5px;');
  s3.addEventListener('keypress', function(event) {
    if (event.keyCode == 27) {
      // Hide the search container when someone presses escape
      var container = document.getElementById('greasemonkey-google-site-search-container');
      container.setAttribute('style', 'position: absolute; left: -3000px;');
    }
  }, true);

  var f = document.createElement('form');
  f.setAttribute('id', 'greasemonkey-google-site-search-form')
  f.setAttribute('action', 'http://www.google.co.uk/search');

  f.appendChild(s2);
  f.appendChild(sitesSelect);
  f.appendChild(s3);

  var d = document.createElement('div');
  d.setAttribute('id', 'greasemonkey-google-site-search-container');
  d.setAttribute('style', 'position: absolute; left: -3000px;')

  d.appendChild(f);

  var s4 = document.createElement('input');
  s4.setAttribute('id', 'greasemonkey-google-site-search-input-for-focus');
  s4.setAttribute('style', 'position: absolute; left: -3000px; top: 0')
  s4.setAttribute('type', 'text');
  s4.setAttribute('accesskey', 9);
  s4.addEventListener('focus', function(event) {
    var container = document.getElementById('greasemonkey-google-site-search-container');
    container.setAttribute('style', 'background-color: #ec5; position: absolute; top: 0; left: 0; width: 99%; padding: 5px; text-align: right; z-index: 1000000; border-bottom: solid 5px #fff');
    document.getElementById('greasemonkey-google-site-search-q').focus();
  }, true);
  
  document.body.insertBefore(d, document.body.firstChild);
  document.body.appendChild(s4);
})()