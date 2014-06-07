// ==UserScript==
// @name                FTD Betalicious NZB download link
// @description         Adds a NZB download link to FTD Betalicious
// @include             http://www.ftd.nu/betalicious/*
// @version             0.6
// ==/UserScript==
var AGE = '';           // Maximum age in days, leave empty for any age
var MAX = '250';        // Results per page
var SORT = 'agedesc';   // Order by age, newest first
var MINSIZE = '';       // Minimum size in MB, leave empty for no minumum size
var MAXSIZE = '';       // Maximum size in MB, leave empty for no maximum size
var DQ = '';            // Default query
var POSTER = '';        // Poster name
var NFO = '';           // Search nfo content for query
var HIDESPAM = '1';     // Hide possible spam, 1 = true, 0 = false
var MORE = '0';         // Show "Advanced search" panel, 1 = true, 0 = false
var GROUP = '';         // Search in groups

/**
sprintf() for JavaScript 0.7-beta1
http://www.diveintojavascript.com/projects/javascript-sprintf

Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
All rights reserved.
**/
var sprintf = (function() {
  function get_type(variable) {
    return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
  }
  function str_repeat(input, multiplier) {
    for (var output = []; multiplier > 0; output[--multiplier] = input) {/* do nothing */}
    return output.join('');
  }

  var str_format = function() {
    if (!str_format.cache.hasOwnProperty(arguments[0])) {
      str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
    }
    return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
  };

  str_format.format = function(parse_tree, argv) {
    var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
    for (i = 0; i < tree_length; i++) {
      node_type = get_type(parse_tree[i]);
      if (node_type === 'string') {
        output.push(parse_tree[i]);
      }
      else if (node_type === 'array') {
        match = parse_tree[i]; // convenience purposes only
        if (match[2]) { // keyword argument
          arg = argv[cursor];
          for (k = 0; k < match[2].length; k++) {
            if (!arg.hasOwnProperty(match[2][k])) {
              throw(sprintf('[sprintf] property "%s" does not exist', match[2][k]));
            }
            arg = arg[match[2][k]];
          }
        }
        else if (match[1]) { // positional argument (explicit)
          arg = argv[match[1]];
        }
        else { // positional argument (implicit)
          arg = argv[cursor++];
        }

        if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
          throw(sprintf('[sprintf] expecting number but found %s', get_type(arg)));
        }
        switch (match[8]) {
          case 'b': arg = arg.toString(2); break;
          case 'c': arg = String.fromCharCode(arg); break;
          case 'd': arg = parseInt(arg, 10); break;
          case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
          case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
          case 'o': arg = arg.toString(8); break;
          case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
          case 'u': arg = Math.abs(arg); break;
          case 'x': arg = arg.toString(16); break;
          case 'X': arg = arg.toString(16).toUpperCase(); break;
        }
        arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
        pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
        pad_length = match[6] - String(arg).length;
        pad = match[6] ? str_repeat(pad_character, pad_length) : '';
        output.push(match[5] ? arg + pad : pad + arg);
      }
    }
    return output.join('');
  };

  str_format.cache = {};

  str_format.parse = function(fmt) {
    var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
    while (_fmt) {
      if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
        parse_tree.push(match[0]);
      }
      else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
        parse_tree.push('%');
      }
      else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
        if (match[2]) {
          arg_names |= 1;
          var field_list = [], replacement_field = match[2], field_match = [];
          if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
            field_list.push(field_match[1]);
            while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
              if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
              }
              else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                field_list.push(field_match[1]);
              }
              else {
                throw('[sprintf] huh?');
              }
            }
          }
          else {
            throw('[sprintf] huh?');
          }
          match[2] = field_list;
        }
        else {
          arg_names |= 2;
        }
        if (arg_names === 3) {
          throw('[sprintf] mixing positional and named placeholders is not (yet) supported');
        }
        parse_tree.push(match);
      }
      else {
        throw('[sprintf] huh?');
      }
      _fmt = _fmt.substring(match[0].length);
    }
    return parse_tree;
  };

  return str_format;
})();

var vsprintf = function(fmt, argv) {
  argv.unshift(fmt);
  return sprintf.apply(null, argv);
};

function getSearchquery()
{
  if(spotTable = document.getElementsByClassName('spotinfotable')[0])
  {
    var spotRow = 0;
    for(spotRow = 0; spotTable.rows[spotRow].cells[0].innerHTML.match(/Zoekterm/) == null; spotRow++)
    {
      //
    }
    var searchQuery = spotTable.rows[spotRow].cells[2].childNodes[0].innerHTML;
    return searchQuery;
  }
  return null;
}

function setSearchquery(searchQuery)
{
  if(spotTable = document.getElementsByClassName('spotinfotable')[0])
  {
    var spotRow = 0;
    for(spotRow = 0; spotTable.rows[spotRow].cells[0].innerHTML.match(/Zoekterm/) == null; spotRow++)
    {
      //
    }
    spotTable.rows[spotRow].cells[2].childNodes[0].innerHTML = searchQuery;
    return true;
  }
  return false;
}

function getServers()
{
  if(spotTable = document.getElementsByClassName('spotinfotable')[0])
  {
    var spotRow = 0
    for(spotRow = 0; spotTable.rows[spotRow].cells[0].innerHTML.match(/Nieuwsgroep\(en\)/) == null; spotRow++)
    {
      //
    }
    var servers = spotTable.rows[spotRow].cells[2].innerHTML;
    var serversArray = servers.split('<br>');
    servers = serversArray[0];
    if(servers.toLowerCase() == 'Anders.zie.post.info'.toLowerCase())
    {
      servers = '';
    }
    return servers;
  }
  return '';
}

function nzbindexQuery()
{
  var query = sprintf(
    'http://nzbindex.nl/search/?q=%s&age=%s&max=%s&g[]=%s&sort=%s&minsize=%s&maxsize=%s&dq=%s&poster=%s&nfo=%s&hidespam=%s&more=%s', 
    encodeURI(searchQuery),
    AGE, 
    MAX, 
    '', // getServers doesn't work for NZBindex :'(
    SORT, 
    MINSIZE, 
    MAXSIZE, 
    DQ, 
    POSTER,
    NFO,
    HIDESPAM,
    MORE);
  return query;
}

function binsearchQuery()
{
  var query = sprintf(
    'http://binsearch.info/?q=%s&m=&max=%s&adv_g=%s&adv_age=%s&adv_sort=date&minsize=%s&maxsize=%s&font=&postdate=', 
    encodeURI(searchQuery),
    MAX, 
    getServers(),
    AGE,
    MINSIZE,
    MAXSIZE);
  return query;
}

function yabsearchQuery()
{
  var query = sprintf(
    'http://www.yabsearch.nl/search/%s',
    encodeURI(searchQuery));
  return query;
}

var copyToClipboard = function(string) {

	//URL of zeroclipboard JS
	var zeroclipboard_js = 'http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.js';
	
	//URL of zeroclipboard SWF
	var zeroclipboard_swf = 'http://zeroclipboard.googlecode.com/svn/trunk/ZeroClipboard.swf';
	
	//Creating and adding a script element to the head of the page
	var scriptref = document.createElement('script');
	scriptref.setAttribute('type', 'text/javascript');
	scriptref.setAttribute('src', zeroclipboard_js);
	document.getElementsByTagName('head')[0].appendChield(scriptref);
	
	alert(typeof(ZeroClipboard) + ZeroClipboard);
	
}

var searchQuery = getSearchquery();
if(searchQuery != null)
{
	copyToClipboard('test');
    var downloadHTML = 'Bestandsnaam: ' + searchQuery + ' <br /> Download van: ';
    // nzbindex.nl
    downloadHTML += sprintf(
      '<a href="%s" target="_blank" title="Download &ldquo;%s&rdquo;">nzbindex.nl</a> ',
      nzbindexQuery(), 
      searchQuery);
    // separator
    downloadHTML += ' | ';
    // binsearch.info
    downloadHTML += sprintf(
      '<a href="%s" target="_blank" title="Download &ldquo;%s&rdquo;">binsearch.info</a>', 
      binsearchQuery(), 
      searchQuery);
    // separator
    downloadHTML += ' | ';
    // yabsearch.nl
    downloadHTML += sprintf(
      '<a href="%s" target="_blank" title="Download &ldquo;%s&rdquo;">yabsearch.nl</a>', 
      yabsearchQuery(), 
      searchQuery);
    //
    setSearchquery(downloadHTML);
}
else
{
  // Nothing to do :)
}