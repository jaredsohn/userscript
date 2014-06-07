// ==UserScript==
// @name           Link Tools
// @namespace      shoecream@luelinks.net
// @description    Some tools for our favorite moderators
// @include        http://links.endoftheinter.net/linkme.php*
// @include        https://links.endoftheinter.net/linkme.php*
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

function find_children (dom, callback) {
  if (typeof callback != 'function') throw new TypeError();
  var stack = [];
  var children = dom.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (callback(children[i]))
      stack.push(children[i]);
    if (children[i].hasChildNodes()) {
      var newstack = find_children(children[i], callback);
      if (newstack.length) {
        // flatten the array
        for (var j = 0; j < newstack.length; j++) {
          stack.push(newstack[j]);
        }
      }
    }
  }
  return stack;
}

function element_before (dom) {
  while (dom = dom.previousSibling) {
    if (!(dom.nodeType == 8 || dom.nodeType == 3))
      return dom;
  }
  return null;
}

function element_after (dom) {
  while (dom = dom.nextSibling) {
    if (!(dom.nodeType == 8 || dom.nodeType == 3))
      return dom;
  }
  return null;
}

function new_element (tag, args) {
  if (!tag) throw new Error;
  var myele = document.createElement(tag);
  for (var ii in args) {
    if (args.hasOwnProperty(ii)) {
      switch (ii) {
      case '_onclick':
        if (typeof args[ii] === 'function') {
          myele.addEventListener('click', args[ii], false);
        }
        break;
      case '_innerHTML':
        myele.innerHTML = args[ii];
        break;
      case '_textContent':
        myele.textContent = args[ii];
        break;
      case 'style':
        if (Object.prototype.toString.call(args[ii]) === '[object String]') {
          myele.setAttribute(ii, args[ii]);
        } else {
          for (var jj in args[ii]) {
            myele.style[jj] = args[ii][jj];
          }
        }
        break;
      default:
        myele.setAttribute(ii, args[ii]);
      }
    }
  }
  return myele;
}

function append_list (dom, app) {
  for (var ii = 0; ii < app.length; ii++) {
    try { dom.appendChild(app[ii]) } catch (e) {}
  }
}


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

var hook = find_children(document.getElementsByClassName('body')[0],
  function (ee) {
    if (/^b$/i.test(ee.nodeName) && ee.textContent === 'Description:')
      return true;
  }
)[0]; // get the first one we find


var hook_target = element_before(element_before(hook));

// find the user that added the link
var addedby = find_children(document.getElementsByClassName('body')[0],
  function (ee) {
    if (/^b$/i.test(ee.nodeName) && ee.textContent === 'Added by:')
      return true;
  }
)[0];

var profile = element_after(addedby);
if (profile.href && /profile\.php\?/.test(profile.href)) {
  var pm = profile.href.replace('links.', '')
  .replace('profile', 'postmsg')
  .replace('user', 'puser');
}

var span = document.createElement('span');
span.innerHTML = '<br><b>Moderator:</b> <a href="' + pm + '">PM User</a> | ';

var link = new_element('a', {
    id: 'x-script-fixme',
    href: '#',
    _textContent: 'Fix Categories',
    _onclick: get_edit_link
  });
span.appendChild(link);

var report = new_element('a', {
    id: 'x-script-lazyreport',
    _textContent: 'Lazy Report',
    href: '#',
    _onclick: get_report_link
  });
span.appendChild(document.createTextNode(' | '));
span.appendChild(report);

var dead = new_element('a', {
    id: 'x-script-deadlink',
    _textContent: 'Watch Link',
    href: '#',
    _onclick: get_dead_link
  });

span.appendChild(document.createTextNode(' | '));
span.appendChild(dead);

function get_dead_link (ee) {
  ee.preventDefault();
  if (ee.target.getAttribute('disabled') == 'disabled') return;
  ee.target.setAttribute('disabled', 'disabled');
  ee.target.innerHTML = '<s>Dead Link</s>';

  var deaddiv = new_element('div', {
      id: 'x-deaddiv',
      style: 'position:absolute; left: 130px; top: 80px; width: 450px; border: 5px solid black; background: white; padding: 1em; margin:3em;',
      _innerHTML: '<center>Loading...</center>'
    });
  document.body.appendChild(deaddiv);


  XHR.get('http://eti.no-jons.com/deadlinks.php', get_dead_service);

  function get_dead_service (response) {
    if (response.doc.getElementById('logged-out')) {
      deaddiv.innerHTML = '<center>Logging in...</center>';
      XHR.post('http://eti.no-jons.com/deadlinks.php', get_dead_service, {
          // this is the greatest code i have written
          username: find_children(document.getElementsByClassName('userbar')[0],
            function (nodes) {
              return /profile\.php/.test(nodes.href)
            })[0].textContent.replace(/\s+\(\d+\)/, ''),
          login: 'stuff'
        }
      )
    } else {
      var submitform = document.adoptNode(response.doc.getElementsByTagName('form')[0]);
      deaddiv.innerHTML = '';
      deaddiv.appendChild(submitform);
      deaddiv.getElementsByTagName('input')[0].value = pageid;
      find_children(deaddiv,
        function (node) {
          if (node.type == 'submit') return 1;
        })[0].addEventListener('click', post_dead_service, false);

      var cancelbut = new_element('input', {
          type: 'button',
          value: 'Cancel',
          _onclick: cancel_dead
        });
      submitform.appendChild(cancelbut);
    }
  }

  function cancel_dead () {
    deaddiv.parentNode.removeChild(deaddiv)
  }

  function post_dead_service (event) {
    event.preventDefault();
    var submitform = deaddiv.getElementsByTagName('form')[0];
    var qstring = {};
    [].forEach.call(submitform.getElementsByTagName('input'),
      function (input) {
        qstring[input.name] = input.value;
      });
    qstring.expiry = submitform.getElementsByTagName('select')[0].value;
    qstring.comments = submitform.getElementsByTagName('textarea')[0].value;
    XHR.post('http://eti.no-jons.com/deadlinks.php', cancel_dead, qstring);
  }
}

function get_report_link(ee) {
  ee.preventDefault();  
  var values = {
    1: 'Invalid Description',
    2: 'Dead Link',
    3: 'Categories*',
    4: 'Duplicate Link',
    5: 'Other',
  }
  if (ee.target.getAttribute('disabled') == 'disabled') return;
  ee.target.setAttribute('disabled', 'disabled');
  ee.target.innerHTML = '<s>Lazy Report</s>';

  var reportdiv = new_element('div', {
      id: 'x-reportdiv',
      style: 'position:absolute; left: 130px; top: 80px; width: 450px; border: 5px solid black; background: white; padding: 1em; margin:3em; font-size:larger'
    });

  var leftdiv = new_element('div', { style: 'float: left' } );
  reportdiv.appendChild(leftdiv);



  for (var ii = 1; ii < 6; ii++) {
    var inputer = new_element('input', {
        type: 'radio',
        name: 'r',
        value: ii,
        _onclick: onclick_report
      });
    var label = new_element('label');
    label.appendChild(inputer);
    label.appendChild(new_element('span', {_innerHTML: values[ii] + '<br>'}))
    leftdiv.appendChild(label);
  }

  var rightdiv = new_element('div', { style: 'float: right; display:none' });
  var r4 = new_element('span', { style: 'display: none',
      _textContent: 'Which link is this a duplicate of?' });
  var rdefault = new_element('span', { style: 'display: none',
      _textContent: 'Please describe what is wrong with this link.' });
  var rtextarea = new_element('textarea', { cols: 38, style: 'display: block'});
  var rsubmit = new_element('input', { type: 'button', value: 'Submit' } );
  var rcancel = new_element('input', { type: 'button', value: 'Cancel' } ); 
  rcancel.addEventListener('click', onclick_cancel, false);
  rsubmit.addEventListener('click', onclick_submit, false);  
  append_list(rightdiv, [r4, rdefault, rtextarea, rsubmit, rcancel]);
  reportdiv.appendChild(rightdiv);

  document.body.appendChild(reportdiv);

  function onclick_report (eee) {
    switch (+eee.target.value) {
    case 3:
      rightdiv.style.display = 'none';
      onclick_submit()
      break;
    case 4:
      rightdiv.style.display = 'block';
      r4.style.display = 'inline';
      rdefault.style.display = 'none';
      break;
    default:
      r4.style.display = 'none';
      rdefault.style.display = 'inline';            
      rightdiv.style.display = 'block';
    }
  }

  var locked = 0; // spurious click events fire in ff
  function onclick_submit (eee) {
    if (locked) return;
    locked = 1; // yes i know this isn't the right way to do it
    reportdiv.appendChild(document.createTextNode('Submitting...'));
    var myvalue = find_children(leftdiv, function(node) {
        if (node.checked) return 1;
      })[0].value;
    XHR.post('http://links.endoftheinter.net/linkreport.php?l=' + pageid,
      onclick_cancel,
      {
        r: myvalue,
        c: rtextarea.value,
        submit: 'Report'
      }
    );
    setTimeout(function () { locked = 0 }, 0); // not actually 0 ms!
  }

  function onclick_cancel (eee) {
    ee.target.setAttribute('disabled', '');
    ee.target.innerHTML = 'Lazy Report';
    reportdiv.parentNode.removeChild(reportdiv);
  }


}



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
  var displaydiv = new_element('div', {
      id: 'x-displaydiv',
      style: 'position:absolute; left: 130px; top: 80px; width: 350px; border: 5px solid black; background: white; padding: 1em; margin:3em;'
    });

  var updatebutton = new_element('input', { type: 'button', value: 'Update',
      _onclick: onclick_update });
  var cancelbutton = new_element('input', { type: 'button', value: 'Cancel',
      _onclick: onclick_cancel });
  append_list(displaydiv, [ourtable, updatebutton, cancelbutton]);
  document.body.appendChild(displaydiv);


  function highlight (attrib, value) {
    [].forEach.call(ourtable.getElementsByTagName('input'), function (element) {
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


hook_target.parentNode.insertBefore(span, hook_target);
