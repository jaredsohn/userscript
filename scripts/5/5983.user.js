// ==UserScript==
// @name          Peeron LEGO Sets Button
// @namespace     http://peeron.com/
// @description   Make xxxx-x text into a little peeron button+popup
// @include       http://lugnet.com/*
// @include       http://fbtb.net/*
// @include       http://legofan.com/*
// @include       http://lego.com/*
// @include       http://1000steine.*/*
// @include       http://classic-castle.com/*
// @include       http://classic-space.com/*
// @include       http://jlug.net/*
// @include       http://isodomos.com/*
// @include       http://br-eng.info/*
// @include       http://*brick*/*
// @include       http://*.lugnet.com/*
// @include       http://*.fbtb.net/*
// @include       http://*.legofan.com/*
// @include       http://*.lego.com/*
// @include       http://*.1000steine.*/*
// @include       http://*.classic-castle.com/*
// @include       http://*.classic-space.com/*
// @include       http://*.isodomos.com/*
// @include       http://*.br-eng.info/*
// ==/UserScript==
// $Id: peeron_links.user.js 1029 2006-10-12 15:58:04Z dan $

var ignore_re, apprend_re, textnodes, matches, cache, div_template, frameid, add_once_flag;
frameid = 0;
add_once_flag = 0;
cache = {};

// what tags (and children of) do we just ignore?
ignore_re = /^(input|select|option)$/i;

// what tags (and children of) do we append the button to (instead of embedding it)
apprend_re = /^(a|b|strong|i|em)$/i;

if (!GM_xmlhttpRequest) {
    GM_log('Please upgrade to the latest version of Greasemonkey.');
    return;
}

// find all the text on the page
textnodes = document.evaluate(
    "//text()",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);

// Create the master peeron button, but don't show it yet.
var toggle_buttons = document.createElement('div');
toggle_buttons.innerHTML = "<a id='peeron_toggle_buttons' href='#' " +
               'onclick="togglePeeronObj(\'peeron_button\'); return false">' +
               "Peeron: <span id='peeron_frame_count'>0</span></a>";
var frame_count = toggle_buttons.firstChild.childNodes.item(1);

var re = /\b(\d{3,6}-\d{1,2}|\d{4})\b/g;
for (var i = 0; i < textnodes.snapshotLength; i++) {
    node = textnodes.snapshotItem(i);

    matches = re.exec(node.data);
    if (matches) {
      if (! search_parents(node, ignore_re)) {
        GM_log("checking peeron for " + matches);
        check_peeron(node, matches);
      }
    }
}

function search_parents(node, re) {
    // check all the node's parents, see if they match the provided re
    while (node) {
      if (String(node.nodeName).match(re)) {
        GM_log("Parent " + node + " matched " + re);
        return node;
      }

      node = node.parentNode;
    }

    return null;
}

function add_once() {
  if (add_once_flag) {
    return;
  }

  add_once_flag = 1;

  // Add the peeron toggle button / progress bar
  document.body.appendChild(toggle_buttons)

  // Build the popup
  add_global_style(' .peeron_popup {  background-color: #fff67f; opacity: 0.95;' +
      'color: #000000; border-color: #000000; border-style: solid;' +
      'border-width: 1; padding: 0px; float: left; width: 500px; ' +
      'z-index: 1; display: none; position: absolute; } ' +
    '.peeron_close { float: right; } ' +
    '.peeron_sets { padding: 0px; margin: 5px; } ' +
    'ul.peeron_set { padding: 0; margin: 0; } ' +
    'ul.peeron_set>li { list-style: none; padding-left: 5px; } ' +
    'li.peeron_set { display: block; clear: left; height: 105px; } ' +
    'a.peeron_link { text-decoration: none; color: #001; display: block; } ' +
    'li.peeron_set:hover { background-color: #ffff80; } ' +
    'li.peeron_setname { font-weight: bold; } ' +
    'img.peeron_setpic { float: left; border: 0; } ' +
    'span.peeron_nosetpic { float: left; border: solid thin gray; ' +
      'line-height: 70px; vertical-align: middle; width: 80; height: 80; ' +
      'background-color: #eee; text-align: center; } ' +
    '.peeron_data { float: left;}' +
    '.peeron_button { position: relative; display: none; }' +
    '#peeron_toggle_buttons { position: fixed; bottom: 0; left: 0; opacity: 0.5;' +
      'background-color: white; border: solid thin black; text-decoration: none; }');

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.text = 'function togglePeeronObj(id) {' +
       '   var obj = document.getElementById(id); ' +
       '   if (! obj) { ' +
       '     var objs = document.getElementsByTagName("span");' +
       '     for (var i=0; i< objs.length; i++) {' +
       '       if (objs.item(i).className == id) {' +
       '         var curstyle = getComputedStyle(objs.item(i), "").' +
                                          'getPropertyValue("display");' +
       '         if (curstyle == "none") { objs.item(i).style.display="inline";' +
       '         } else { objs.item(i).style.display="none"; };' +
       '       }' +
       '     }' +
       '     return false;' +
       ' };' +
       '   var curstyle = getComputedStyle(obj, "").getPropertyValue("display"); ' +
       '   if (curstyle == "none") { obj.style.display="block";' +
       '   } else { obj.style.display="none"; }; ' +
       '   return false; ' +
       ' }';
  document.body.appendChild(script);
}

function add_global_style(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

function add_peeron_button(node, str, xmlText) {
    if (! node.parentNode) {
      GM_log(str + " has no parent "+node.parentNode+"("+ node.textContent + ")");
      return;
    }

    if (str.match(/^\d+$/) && str > 1900 && str < 2100) {
      // GM_log("ignoring " + str);
      return;
    }

    add_once();

    if (typeof(XPCNativeWrapper) == "function") {
      var dp = new XPCNativeWrapper(window, "DOMParser()");
      var parser = new dp.DOMParser();
      var xmlDoc = parser.parseFromString(xmlText, "application/xhtml+xml");
    }

    GM_log("add_peeron: " + str);
    var sets = xmlDoc.getElementsByTagName('setinfo');

    if (sets.length > 0) {
      var id = get_tag(sets[0], 'id');
      var peeronid = get_attr(sets[0], 'id', 'peeronid');
      var dv = clone_popup(sets, peeronid);

      //  create the actual button
      var button = '<span class="peeron_button"> ' +
                   '<a href="http://www.peeron.com/inv/sets/' + id +
                   '" onclick="togglePeeronObj(\'peeron_popup_' + 
                      dv.getAttribute('peeron_frameid') +
                   '\'); return false">' +
                   '<img src="http://peeron.com/open/peeronlogo-20.gif"'   +
                   ' width="20" height="20" border="1" /></a>' +
                   dv.innerHTML + '</span>';

      // where does the button go?
      var newnode = document.createElement('span');
      var container = search_parents(node, apprend_re);
      if (container) {
        GM_log("Appending button for " + str + " to " + container);
        newnode.innerHTML = button;
        container.parentNode.insertBefore(newnode, container.nextSibling);
      } else {
        GM_log("Adding button for " + str);
        var parts = node.textContent.split(str, 2);
        newnode.innerHTML = String.concat(parts[0], str, button, parts[1]);
        node.parentNode.replaceChild(newnode, node);
      }
      frame_count.innerHTML = frameid;
    }
}

function get_tag(obj, tag) {
  return obj.getElementsByTagName(tag).item(0).textContent;
}

function get_attr(obj, tag, attr) {
  return obj.getElementsByTagName(tag).item(0).getAttribute(attr);
}

function clone_popup(sets, str) {
  var frame = document.createElement('div');
  frameid = frameid + 1;
  frame.setAttribute("id", "peeron_popup_" + frameid);

  add_global_style("div#peeron_popup_"+ frameid + 
                   " { z-index: 1; display: none; position: absolute; width: 500px;}");

  frame.appendChild(document.createElement('ul'));
  frame.firstChild.setAttribute('class', 'peeron_popup');

  var divhtml = '<div class="peeron_popup" id="peeron_popup_' + frameid + '">' +
                '<a href="/" class="peeron_close" ' +
                'onclick="togglePeeronObj(\'peeron_popup_' + frameid +
                '\'); return false">[X]</a><ul class="peeron_sets">';

  for (var i=0; i < sets.length; i++) {
    var set = sets.item(i);
    var img;
    if (get_tag(set, 'thumbnail')) {
      img = '<img class="peeron_setpic"' +
            'src="'+ get_tag(set, 'thumbnail') +'"' +
            'height="'+ get_attr(set, 'thumbnail', 'height') + '"' + 
            'width="'+ get_attr(set, 'thumbnail', 'width') +'" />';
    } else {
      img = '<span class="peeron_nosetpic">N/A</span>';
    }
    
    divhtml = divhtml + 
      '<a class="peeron_link" href="http://peeron.com/inv/sets/' +
        get_tag(set, 'id') + '"><div>' +
      '<li class="peeron_set">' +
      '  <ul class="peeron_set">' +
      '    <li class="peeron_setpic">' + img + '</li>' +
      '    <li class="peeron_setname">'+ get_tag(set, 'id') +': ' +
             get_tag(set, 'name') + '</li>' +
      '    <li>'+ get_tag(set, 'theme') +'</li>' +
      '    <li class="peeron_data"><strong>Pcs</strong><br />' + 
             get_tag(set, 'pcs') +'</li>' +
      '    <li class="peeron_data"><strong>Figs</strong><br />' + 
             get_tag(set, 'figs') +'</li>' +
      '    <li class="peeron_data"><strong>Year</strong><br />' + 
             get_tag(set, 'year') +'</li>' +
      '    <li class="peeron_data"><strong>MSRP</strong><br />' + 
             get_tag(set, 'msrp') +'</li>' +
      '  </ul>' +
      '</li></div></a>'
  }

  divhtml = divhtml + '</ul></div>';
  var dv = document.createElement('div');
  dv.innerHTML = divhtml;
  dv.setAttribute('peeron_frameid', frameid);

  return dv;
}

function check_peeron(node, matches) {
    for (var m=0; m < matches.length; m++) {
      var str = matches[m];
      if (cache[str]) { return; }

      cache[str] = 1;
      GM_xmlhttpRequest({
          method: 'GET',
          url: 'http://peeron.com/cgi-bin/invcgis/api/x_set?setid='+str,
          headers: { 'X-Peeron-GM-Sets': '0.1' },
          onload: function(res) { if (res.responseText) {
                                      add_peeron_button(node, str, res.responseText); 
                                  }},
        });
      // GM_log(str);
    }
}


