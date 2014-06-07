// ==UserScript==
// @name          HN Toolkit
// @namespace     http://news.ycombinator.com
// @description   Version 1.8 - Various useful things (blacklist/style, saved links, searchyc, splitview, PRE-fix, new preview, title rename) for Hacker News
// @include       http://news.ycombinator.com/*
// ==/UserScript==

/*
  Written by Xichekolas ... License: 'do whatever you want with it'.
  http://news.ycombinator.com/user?id=Xichekolas

  Changelog:
  1.8   - Added saved links, made new preview side-by-side, made blacklister more general.
  1.7   - Added title rename.
  1.63  - Fixed several small bugs and made blacklist apply to new links on main page.
  1.62  - Fixed event listener bug by switching to GM_xmlhttpRequest()
  1.61  - Fixed preview to work on index (silly me).
  1.6   - Added preview for new items.
  1.51  - Made PRE fix dynamic instead of some fixed amount. No more setting
           it to a random number of EMs.
  1.5   - Added the PRE layout fix given to us by gojomo. Also cleaned up
           some code and removed the describd stuff, since the site does
           that for us now.
  1.42  - Fixed splitview to work correctly after flag link was added.
  1.41  - Fixed splitview to not be so ugly and error prone.
  1.4   - Added splitview. (nirmal's brilliant idea: http://nirmalpatel.com/#hnsplitview)
  1.33  - Fixed Search YC display at bottom on pages without a footer
  <1.33 - I wasn't really versioning at this point, but rest assured that
           neat stuff happened.
*/

// Code is getting kinda messy... I should clean it up someday.
// Just assume the stuff below will work.
var body = document.getElementsByTagName('body')[0];

function byId(id) {
  return document.getElementById(id);
}

function add_listeners(id, cl, ol) {
  return function(ev) {
//    alert('here!');
    var elem = byId(id);
    if (top.location != document.location) { // If we are inside a frameset.
      if (ol) { // If the link is to an outside site, load both frames.
        elem.target = "article";
        elem.addEventListener('click', function(ev) {
          document.location = cl;
        }, false);
      } else { // Break out of frames.
        elem.target = "_top";
      }
    } else if (ol) { // Not in frames but an outside link, so create frames.
      elem.addEventListener('click', function(ev) {
        var fs = document.createElement('frameset');
        var f1 = document.createElement('frame');
        var f2 = document.createElement('frame');

        fs.cols = '50%, 50%';
        fs.appendChild(f1);
        fs.appendChild(f2);

        f1.src = elem.href;
        f1.name = 'article';
        f2.src = cl;
        f2.name = 'comments';

        document.title = elem.innerHTML;
        body.innerHTML = '';
        body.style['margin'] = 0;
        body.appendChild(fs);

        ev.preventDefault();
      }, false);
    }
  }
}

var blacklist = GM_getValue('hndomains', '');
if (blacklist.length > 0) {
  blacklist = blacklist.split(/\n/);
}

function getQueueArray() {
  var queue = GM_getValue('queue', '');
  if (queue.length > 0) {
    queue = queue.split('|');
  } else {
    queue = [];
  }
  return queue;
}

function showQueue() {
  var main_tr = document.evaluate("//table//tr[3]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  var content = '<td><ol>';
  var queue = getQueueArray();
  for (var i = 0; i < queue.length; i += 3) {
    content += "<li><a href='" + queue[i+1] + "'>" + queue[i].split('__').join(' ') + "</a> | <a href='" + queue[i+2] + "'>comments</a> | <a href='#' class='hntqrem'>remove</a></li>";
  }
  content += "</ol></td>";
  main_tr.innerHTML = content;

  var xpath_rems = document.evaluate("//a[@class='hntqrem']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var n = 0; n < xpath_rems.snapshotLength; n++) {
    var link = xpath_rems.snapshotItem(n);
    link.addEventListener('click', remFromQueue(n*3), true);
  }
}

function saveToQueue(savetag) {
  return function(ev) {
    var atag = savetag.parentNode.parentNode.previousSibling.lastChild.firstChild;
    var queue = getQueueArray();
    var newitem = atag.innerHTML.split(' ').join('__');
    queue.push(newitem);
    queue.push(atag.href);
    queue.push(atag.parentNode.parentNode.nextSibling.lastChild.childNodes[4].href);
    byId('hnqueue').innerHTML = "saved links (" + Math.floor(queue.length / 3) + ")";
    queue = queue.join('|');
    GM_setValue('queue', queue);
    savetag.parentNode.replaceChild(document.createTextNode('saved'), savetag);
  }
}

function remFromQueue(i) {
  return function(ev) {
    var queue = getQueueArray();
    var firsthalf = Math.max(i, 0);
    var lasthalf = Math.min(queue.length, i+3);
    queue = queue.slice(0, firsthalf).concat(queue.slice(lasthalf));
    byId('hnqueue').innerHTML = "saved links (" + Math.floor(queue.length / 3) + ")";
    queue = queue.join('|');
    GM_setValue('queue', queue);
    showQueue();
  }
}


function applyStyles(listeners) {
  var xpathnodes = document.evaluate("//td[@class='title']//a[not(starts-with(@href, '/x?'))]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var queue = GM_getValue('queue', '');

  for (var n = 0; n < xpathnodes.snapshotLength; n++) {
    var thisnode = xpathnodes.snapshotItem(n);
    var link = thisnode.href.toLowerCase();
    
    for (var i = 0; i < blacklist.length; i++) {
      if (blacklist[i].length > 0) {
        var entry = blacklist[i].split('->');
        var styles = 'display: none;';
        if (entry.length > 1) {
          styles = entry.pop();
        }
        entry = entry[0].toLowerCase().replace(/^\s+|\s+$/g, '');
        var regex = new RegExp(entry);
        if (link.match(regex) || thisnode.innerHTML.toLowerCase().match(regex)) {
          var grandpa = thisnode.parentNode.parentNode;
          grandpa.style.cssText += styles;
          grandpa.nextSibling.style.cssText += styles;
          grandpa.nextSibling.nextSibling.style.cssText += styles;
        }
      }
    }

    var secondline = thisnode.parentNode.parentNode.nextSibling.lastChild;

    if (GM_getValue('hnsplitview', false) && (link.indexOf("ycombinator.com/x?fnid") < 0)) {
      thisnode.id = "splitlink" + n;
      var comments = secondline.childNodes[4].href;
      var outside_link = link.indexOf("ycombinator.com/item") < 0;
      if (listeners) {
        window.addEventListener('load', add_listeners(thisnode.id, comments, outside_link), true);
      } else {
        add_listeners(thisnode.id, comments, outside_link)();
      }
    }

    if (GM_getValue('hnqueue', false)) {
      if (queue.indexOf(link) > -1) {
        secondline.innerHTML += " | saved";
      } else {
        secondline.innerHTML += " | <a href='#' id='" + n + "_hntsave' class='hntsave'>save</a>";
      }
    }
  }

  var xpathsaves = document.evaluate("//a[@class='hntsave']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var n = 0; n < xpathsaves.snapshotLength; n++) {
    var thisnode = xpathsaves.snapshotItem(n);
    
    thisnode.addEventListener('click', saveToQueue(thisnode), true);
  }
}

if (GM_getValue('hntitle', 'Hacker News') != 'Hacker News') {
  // Set actual page title.
  var fragments = document.title.split('|');
  fragments[0] = GM_getValue('hntitle', 'Hacker News') + (fragments.length > 1 ? ' ' : '');
  document.title = fragments.join('|');
  
  // Change title in top left too.
  var titlehref = document.evaluate("//span[@class='pagetop']//a[@href='news']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  if (titlehref.snapshotLength > 0) {
    var title_el = titlehref.snapshotItem(0);
    title_el.innerHTML = GM_getValue('hntitle', title_el.innerHTML);
  }
}

if (GM_getValue('hnnewview', false) && window.location.href.match(new RegExp("^http://news.ycombinator.com(/$|/news.*)"))) {
  GM_xmlhttpRequest({
    method: 'GET',
    url:    'http://news.ycombinator.com/newest',
    onload: function(xhr) {
      var xpathContainer = document.evaluate("//table/tbody", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
      if (xpathContainer.snapshotLength > 0) {
        // Fix the header and footer so it handles what we are about to do.
        var container = xpathContainer.snapshotItem(0);
        var firstrow = container.childNodes[0];
        firstrow.firstChild.colSpan = "2";
        var lastrow = container.childNodes[3];
        lastrow.firstChild.colSpan = "2";

        var target_tr = container.childNodes[2];
        target_tr.vAlign = 'top';

        var response = xhr.responseText;

        // Really need a better way to do this than a sandbox. Feel free to enlighten me.
        var newdiv = document.createElement('div');
        newdiv.id = 'hnnewview_sandbox';
        newdiv.style.position = 'absolute';
        newdiv.style.top = '0px';
        newdiv.style.left = '-5454px';
        body.appendChild(newdiv);
        newdiv.innerHTML = response.substring(response.indexOf('<center>') + 8, response.lastIndexOf('</center>'));

        var xpathnp = document.evaluate("//div[@id='hnnewview_sandbox']//table//tr[3]/td", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        var newpage = xpathnp.snapshotItem(0);
        target_tr.innerHTML += "<td width='50%'><h3>New Items</h3>" + newpage.innerHTML + "</td>";
        target_tr.firstChild.innerHTML = "<h3>Top Items</h3>" + target_tr.firstChild.innerHTML;
        
        newdiv.parentNode.removeChild(newdiv);
      }
      applyStyles(false);
    }
  });
} else {
  applyStyles(true); // No need to wait for new items to load, apply styles now.
}

if (GM_getValue('hnprefix', false)) {
  var xpathpres = document.evaluate("//span[@class='comment']//pre", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var n = 0; n < xpathpres.snapshotLength; n++) {
    var thispre = xpathpres.snapshotItem(n);
    var reduction = (thispre.parentNode.parentNode.parentNode.firstChild.firstChild.width || 0) + 120;
    var width = Math.max((window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800) - reduction, 300);

    thispre.style.backgroundColor = '#FFFFFF';
    thispre.style.maxWidth = width + 'px';
  }
}

// Everything below is for the settings UI.
if (GM_getValue('hnsearchyc', false)) {
  var searchForm = "<form name=\"search\" method=\"post\" action=\"http://searchyc.com/search/yc\" style=\"margin: 4px; padding: 0px;\">" +
      "<input type=\"text\" size=\"30\" name=\"search[id]\" id=\"search_id\" style=\"margin-right: 10px; line-height: 12pt;\"/>" + 
      "<input type=\"submit\" value=\"Search YC\" name=\"commit\"/></form>";
  
  if (GM_getValue('hnsearchycbot', false)) {
    var yclinks = document.evaluate("//span[@class='yclinks']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if (yclinks.snapshotLength > 0) {
      var yclparent = yclinks.snapshotItem(yclinks.snapshotLength - 1).parentNode;
      var newDiv = document.createElement('div');
      newDiv.innerHTML = searchForm
      yclparent.insertBefore(newDiv, yclparent.lastChild);
    } else {
      var center = document.getElementsByTagName('center')[0];
      center.innerHTML += "<div style=\"width: 85%; text-align: right;\">" + searchForm + "</div>";
    }
  } else {
    var center = document.getElementsByTagName('center')[0];
    center.innerHTML = "<div style=\"width: 85%; text-align: right;\">" + searchForm + "</div>" + center.innerHTML;
  }
}

var submitlink = document.evaluate("//a[@href='submit']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if (submitlink.snapshotLength > 0) {
  var slparent = submitlink.snapshotItem(0).parentNode;
  var editlink = " | <a id=\"hntoolkit\" href=\"#\">toolkit</a>";
  slparent.innerHTML += editlink;

  if (GM_getValue('hnqueue', false)) {
    editlink = " | <a id=\"hnqueue\" href=\"#\">saved links (" + Math.floor(GM_getValue('queue', '').split('|').length / 3) + ")</a>";
    slparent.innerHTML += editlink;
  }

  function checked(value) {
    return GM_getValue(value, false) ? " checked=\"checked\"" : "";
  }

  var checkboxes = {'prefix': {text: 'Apply PRE Fix?', style: ''},
                    'splitview': {text: 'Open links in split view?', style: ''},
                    'newview': {text: 'Show new items on front page?', style: ''},
                    'queue': {text: 'Enable saved links?', style: ''},
                    'searchyc': {text: 'Display SearchYC?', style: ''},
                    'searchycbot': {text: 'Bottom of page', style: 'margin-left: 2em;'}};

  var editorHTML = "<div id=\"bleditbox\" style=\"" +
    "position: absolute; z-index: 54; border: 2px solid red; top: 100; left: -1000; background-color: white; display: none; padding: 1em;\">" + 
    "<h1 style=\"margin: 0px;\">Hacker News Toolkit</h1>" +
    "<a href=\"http://userscripts.org/scripts/show/25039\">http://userscripts.org/scripts/show/25039</a><br/><br/>" +
    "One rule per line in the format regex->styles.<br/>The default style is to hide the match,<br/>so you can simply put the regex to blacklist.<br/>Your regex can just be a domain name.<br/>" +
    "<textarea id=\"bldomains\" rows=\"5\" cols=\"54\">"+GM_getValue('hndomains', '')+"</textarea><br/>" +
    "<br/>Page Title:<br/> <input type=\"text\" id=\"bltitle\" value=\""+GM_getValue('hntitle', 'Hacker News')+"\" size=\"54\"><br/>";
    
  for (name in checkboxes) {
    var style = (checkboxes[name].style.length > 0 ? " style=\""+checkboxes[name].style+"\" " : '');
    editorHTML += "<br/><input type=\"checkbox\" id=\"bl"+name+"\""+checked('hn'+name) + style + "> " + checkboxes[name].text;
  }

  body.innerHTML += editorHTML + "<br/><br/><div style=\"position: absolute; bottom: 1em; right: 1em;\"><input type=\"submit\" id=\"blcancel\" value=\"Cancel\">" + 
    "<input type=\"submit\" id=\"blsave\" value=\"Save\"></div></div>";

  function closeSettings(ev) {
    for (name in checkboxes) {
      byId('bl'+name).checked = GM_getValue('hn'+name, false);
    }

    byId('bldomains').value = GM_getValue('hndomains', '');
    byId('bltitle').value = GM_getValue('hntitle', 'Hacker News');
    byId('bleditbox').style['display'] = 'none';
    return false;
  }

  byId('hntoolkit').addEventListener('click', function(ev) {
    if (byId('bleditbox').style['display'] == 'none') {
      var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 800;
      byId('bleditbox').style['display'] = 'block';
      byId('bleditbox').style['left'] = (w - byId('bleditbox').offsetWidth) / 2;
      byId('bldomains').focus();
    } else {
      closeSettings(ev);
    }
    return false;
  }, true);

  byId('blcancel').addEventListener('mouseup', closeSettings, true);

  byId('blsave').addEventListener('mouseup', function(ev) {
    for (name in checkboxes) {
      GM_setValue('hn'+name, byId('bl'+name).checked);
    }

    GM_setValue('hntitle', byId('bltitle').value);
    GM_setValue('hndomains', byId('bldomains').value);
    window.location.reload();
    return false;
  }, true);

  byId('hnqueue').addEventListener('click', function(ev) { showQueue(); }, true);
}