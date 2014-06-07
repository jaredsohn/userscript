// ==UserScript==
// @name           Fix Categories
// @namespace      shoecream@luelinks.net
// @description    Helps you fix categories
// @include        http://links.endoftheinter.net/linkme.php*
// ==/UserScript==
var XHR = {};

XHR.createQueryString = function(obj) {
  var ret = [];
  for (var i in obj) {
    ret.push([i, encodeURIComponent(obj[i])].join('='));
  }
  return ret.join('&');
}

XHR.createDoc = function(r, callback) {
  var doc = document.implementation.createDocument('', '', null);
  var html = document.createElement('html');
  html.innerHTML = r.responseText;
  doc.appendChild(html);
  r.doc = doc;
  callback(r);
}

// adds an extra 'doc' property to the response object that contains
// the document element of the response
XHR.post = function(url, callback, data) {
  GM_xmlhttpRequest({
      method: 'POST',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': XHR.createQueryString(data).length,
      },
      data: XHR.createQueryString(data),
      onload: function(r) {
        XHR.createDoc(r, callback)
      }
    });
}

XHR.get = function(url, callback) {
  GM_xmlhttpRequest({
      method: 'GET',
      url: url,
      headers: {
        'User-Agent': navigator.userAgent,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      onload: function(r) {
        XHR.createDoc(r, callback)
      }
    });
}

function find_parent(dom, callback) {
  if (typeof callback != 'function') throw new TypeError();
  do {
    if (callback(dom.parentNode)) {
      return dom.parentNode;
    }
  } while (dom = dom.parentNode);
  return;
}

var a = document.getElementsByClassName('body')[0].childNodes;

var addedby;
var add_flag = false;

for (var i = 0; i < a.length; i++) {
  if (a[i].textContent.search('Options:') > - 1) add_flag = true;

  if (add_flag && a[i].href && /linkreport\.php/.test(a[i].href)) {
    addedby = a[i];
    break;
  }
}

var span = document.createElement('span');
span.appendChild(document.createTextNode(' | '));

var link = document.createElement('a');
link.id = 'x-script-fixme';
span.appendChild(link);
link.innerHTML = 'Fix Categories';
link.href = '#';
link.addEventListener('click', get_edit_link, false);

addedby.parentNode.insertBefore(span, addedby.nextSibling);

//var pageid = document.location.search.match(/l=(\d+)/)[1];

var pageid = (function () {
    var outer;
    [].forEach.call(document.getElementsByTagName('a'), function (ee) {
        if (outer) return;
        if (ee.textContent === 'Report Link') {
          var temp1 = ee.href.match(/linkreport\.php\?l=(\d+)/);
          outer = temp1[1];
        }
      });
    return outer;
  })()

function get_edit_link(e) {
  e.preventDefault();

  e.target.innerHTML = 'Waiting (GET)...'
  XHR.get('http://links.endoftheinter.net/add.php?edit=' + pageid, onload_edit);
}


function onload_edit(response) {
  var table = find_parent(response.doc.getElementById('c512'), function(node) {
      if (/^table$/i.test(node.nodeName)) return true;
    })
  var ourtable = response.doc.importNode(table, true);
  ourtable.id = 'x-cat-table';
  var displaydiv = document.createElement('div');
  displaydiv.id = 'x-displaydiv';
  displaydiv.setAttribute('style', 'position:absolute; left: 130px; top: 80px; width: 350px; border: 5px solid black; background: white; padding: 1em; margin:3em;');
  updatebutton = document.createElement('input');
  updatebutton.type = 'button';
  updatebutton.value = 'Update';
  cancelbutton = updatebutton.cloneNode(true);
  cancelbutton.value = 'Cancel';
  updatebutton.addEventListener('click', onclick_update, false);
  cancelbutton.addEventListener('click', onclick_cancel, false);
  displaydiv.appendChild(ourtable);
  displaydiv.appendChild(updatebutton);
  displaydiv.appendChild(cancelbutton);
  document.body.appendChild(displaydiv);


  function highlight (attrib, value) {
    [].forEach.call(ourtable.getElementsByTagName('input'), function (element) {
        console.log(element);
        if (element.checked) {
          element.parentNode.style[attrib] = value;
        } else {
          element.parentNode.style[attrib] = '';
        }
      });
  }

  highlight('backgroundColor', 'lightgreen');
  highlight('border', '2px solid pink');
  ourtable.addEventListener('click', function (e) {
      highlight('backgroundColor', 'lightgreen');
    }, false);

  function onclick_update(e) {
    e.target.disabled = true;
    var postdata = {};
    var delta = {
      removed: [],
      added: []
    };
    var tableinputs = ourtable.getElementsByTagName('input');
    [].forEach.call(tableinputs, function(element) {
        var corresponding = response.doc.getElementById(element.id);
        if (corresponding.checked !== element.checked) {
          var label = element.nextElementSibling.textContent;
          delta[element.checked ? 'added': 'removed'].push(label);
          corresponding.checked = element.checked;
        }
      });

    var inputs = response.doc.getElementsByTagName('input');
    [].forEach.call(inputs, function(ele) {
        if (ele.name) {
          if (ele.type != 'checkbox' || (ele.type == 'checkbox' && ele.checked)) {
            postdata[ele.name] = ele.value;
          }
        }
      });

    postdata['desc'] = response.doc.getElementsByTagName('textarea')[0].value;

    delete postdata['delete'];

    XHR.post('http://links.endoftheinter.net/add.php', on_link_update, postdata);

    function on_link_update(response) {
      XHR.get('http://endoftheinter.net/admin.php?l=' + pageid, on_get_admin);
      function on_get_admin(response) {
        var tops = response.doc.getElementsByClassName('message-top');
        for (var ii = 0; ii < tops.length; ii++) {
          var reporter = tops[ii].getElementsByTagName('a')[0];
          if (reporter.textContent !== 'Albatross') {
            if (confirm('Multiple reporters on link. Abort?')) {;
              cancelbutton.click()
              return;
            }
          }
        }
        // Albatross is the only reporter here
        var reportstring = '';
        if (delta.added.length > 0)
          reportstring += 'Added ' + delta.added.join(', ') + '. ';
        if (delta.removed.length > 0)
          reportstring += 'Removed ' + delta.removed.join(', ') + '. ';
        if (!reportstring) return; // what the hell are we doing

        reportstring += '(via semi-robot)';


        XHR.post('http://endoftheinter.net/admin.php', function(re) {
            cancelbutton.click();
            document.location.reload();
          },
          {
            l: pageid,
            a: 2,
            r: 'Categories',
            s: reportstring,
            submit: 'Submit'
          });
      }
    }

  }

  function onclick_cancel(e) {
    displaydiv.parentNode.removeChild(displaydiv);
    document.getElementById('x-script-fixme').textContent = 'Fix Categories';
  }
}

