// ==UserScript==
// @name           USO Custom Script Search
// @namespace      http://userscripts.org/users/tim
// @include        http://*userscripts.org/*
// @author         Tim Smart
// @copyright      2010 (c) Tim Smart. All rights reserved.
// @license        Creative Commons BY-NC-SA http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

var CONFIG = {
  // Prepend this to the search query.
  prepend: '',

  // Search action to perform
  action:  'http://www.google.com/cse',

  // The name for the search box.
  name:    'q',

  // Hidden input elements to add.
  // Default values are the hidden elements
  // required for Google searches.
  hidden:  {
    hl: 'en',
    ie: 'UTF-8',
    cx: '008207032259106071796:8dqwjp0pxaa'
  }
};

var form        = document.getElementById('script_search'),
    query_input = document.getElementById('script_q');

// Can we find the script search form to modify?
if (form && query_input) {
  form.setAttribute('action', CONFIG.action);
  query_input.name = CONFIG.name;

  var key, input;

  // Add the hidden fields.
  for (key in CONFIG.hidden) {
    if (CONFIG.hidden.hasOwnProperty(key)) {
      input       = document.createElement('input');
      input.type  = 'hidden';
      input.name  = key;
      input.value = CONFIG.hidden[key];
      form.appendChild(input);
    }
  }

  // Add the prepend listener.
  form.addEventListener('submit', function (event) {
    query_input.value = CONFIG.prepend + query_input.value;
  }, false);
}
