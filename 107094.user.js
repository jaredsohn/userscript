// ==UserScript==
// @name  Google+ Commander
// @author suVene(original: mattn)
// @version 0.3.6
// @namespace https://github.com/suvene/googlepluscommander
// @description keybinds for Google+. you can use j/k to scroll, and type 'c' to comment, 's' to share, '+' to +1.
// @include https://plus.google.com/*
// @match https://plus.google.com/*
// ==/UserScript==

(function() {
  // User Options start

  var AutoPagerize = true; // true or false

  // User Options end

  function invokeMouseEvent(elem, evname) {
    var e = document.createEvent('MouseEvents');
    e.initMouseEvent(evname, true, true, e.view||window, 0, 0, 0, 0, 0,
      false, false, false, false, 0, null);
    elem.dispatchEvent(e);
  }

  function click(elem) {
    invokeMouseEvent(elem, 'click');
  }

  function mousedown(elem) {
    invokeMouseEvent(elem, 'mousedown');
  }

  function mouseup(elem) {
    invokeMouseEvent(elem, 'mouseup');
  }

  function plus(elem) {
    var elems = elem.getElementsByTagName('button');
    for (var n = 0; n < elems.length; n++) {
      if (elems[n].getAttribute('g:type') == 'plusone') {
        click(elems[n]);
        break;
      }
    }
  }

  function tools(elem) {
    var ret = [];
    var elems = elem.getElementsByTagName('button');
    for (var n = 0; n < elems.length; n++) {
      if (elems[n].getAttribute('g:type') == 'plusone') {
        var next = elems[n];
        while (next) {
          if (next.nodeType == 1 && next.getAttribute('role') == 'button')
            ret.push(next);
          next = next.nextSibling;
        }
      }
    }
    return ret;
  }

  function expand(elem) {
    var elems = elem.getElementsByTagName('span');
    for (var n = 0; n < elems.length; n++) {
      if (elems[n].getAttribute('role') == 'button' && elems[n].getAttribute('class').match('a-b-f-i-gc')) {
        click(elems[n]);
      }
    }
  }

  function getPermalinks(elem) {
    var ret = [];
    var elems = elem.getElementsByTagName('a');
    for (var n = 0; n < elems.length; n++) {
      if (elems[n].getAttribute('href').match('/posts/')) {
        ret.push(elems[n]);
      }
      // how gets the child permalinks ?
    }
    return ret;
  }

  function newEntry() {
    var elems = getElementsByTagAndClassName('div', 'n-Nd');
    if (elems.length > 0) {
      window.scrollTo(0, 0);
      click(elems[0]);
      return true;
    }
    return false;
  }

  function closeForm(elem) {
    if (elem.id.match(/\.f$/)) {
      var cancel = findCancelElement(elem);
      if (cancel) {
        elem.blur();
        cancel.focus();
        if (cancel.id.match(/\.c$/)) {
          click(cancel);
        } else {
          mousedown(cancel);
          mouseup(cancel);
        }
        return true;
      }
    }
    return false;
  }

  function submitForm(elem) {
    if (elem.id.match(/\.f$/)) {
      var submit = findSubmitElement(elem);
      if (!submit) {
        submit = getElementsByTagAndClassName('div', 'n-Ja-xg',
                   elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode)[0];
      }
      if (submit) {
        elem.blur();
        submit.focus();
        mousedown(submit);
        mouseup(submit);
        return true;
      }
    }
    return false;
  }

  function getItems() {
    var items = [];
    var elems = document.getElementsByTagName('div');
    for (var n = 0; n < elems.length; n++) {
      var e = elems[n];
      if (e.id.substring(0, 7) == 'update-') {
        items.push(e);
      }
    }
    return items;
  }

  function getOffset(elem){
    var y = 0;
    while(elem.parentNode){
      y += elem.offsetTop;
      elem = elem.parentNode;
    }
    return y;
  }

  var globalKeymap = {
    'gg': function(e) {
      var elems = getItems();
      var elem = elems[0];
      window.scrollTo(0, getOffset(elem) - 100);
      click(elem);
      return true;
    },
    'G': function(e) {
      var elems = getItems();
      var elem = elems[elems.length-1];
      window.scrollTo(0, getOffset(elem) - 100);
      click(elem);
      return true;
    },
    'n': function(e) {
      click(document.getElementById('gbi1'));
      return true;
    },
    'gh': function(e) {
      location.href = 'https://plus.google.com/';
      return true;
    },
    'gP': function(e) {
      var s = location.href.match('/([0-9]{21})/');
      if (s) {
        location.href = 'https://plus.google.com/' + s[1] + '/photos';
      } else {
        location.href = 'https://plus.google.com/photos';
      }
      return true;
    },
    'gp': function(e) {
      var s = location.href.match('/([0-9]{21})/');
      if (s) {
        location.href = 'https://plus.google.com/' + s[1];
      } else {
        location.href = 'https://plus.google.com/me';
      }
      return true;
    },
    'gc': function(e) {
      location.href = 'https://plus.google.com/circles';
      return true;
    },
    '/': function(e) {
      window.scrollTo(0, 0);
      document.getElementById('oz-search-box').focus();
    },
    'gna': function(e) {
      location.href = 'https://plus.google.com/notifications/all';
      return true;
    },
    'gnc': function(e) {
      location.href = 'https://plus.google.com/notifications/circle';
      return true;
    },
    'gno': function(e) {
      location.href = 'https://plus.google.com/notifications/otherposts';
      return true;
    },
    'gnm': function(e) {
      location.href = 'https://plus.google.com/notifications/myposts';
      return true;
    },
    'gnM': function(e) {
      location.href = 'https://plus.google.com/notifications/mentions';
      return true;
    },
    'gnP': function(e) {
      location.href = 'https://plus.google.com/notifications/phototags';
      return true;
    }
  };

  var itemKeymap = {
    'i': function(e) {
      if (newEntry()) {
        return true;
      }
      return false;
    },
    'c': function(e) {
      if (!e.ctrlKey) {
        click(tools(e.target)[0]);
        return true;
      }
      return false;
    },
    'n': function(e) {
      click(document.getElementById('gbi1'));
      return true;
    },
    's': function(e) {
      click(tools(e.target)[1]);
      return true;
    },
    'm': function(e) {
      var menus = getElementsByTagAndClassName("div", "d-ra-p", e.target);
      var mute = menus[menus.length-2];
      mousedown(mute);
      mouseup(mute);
    },
    '+': function(e) {
      plus(e.target);
      return true;
    },
    '*': function(e) {
      expand(e.target);
      return true;
    },
    'e': function(e) {
      click(tools(e.target)[2]);
      return true;
    }
  };
  for (var k in globalKeymap) {
    itemKeymap[k] = globalKeymap[k]
  }

  var stack = "";
  var timer = 0;
  function handleKeys(e, m) {
    var c = String.fromCharCode(e.which ? e.which :
        e.keyCode ? e.keyCode : e.charCode);
    stack += c;
    var u = 0;
    for (var k in m) {
      if (k == stack) {
        e.preventDefault();
        var f = m[stack];
        if (f) {
          stack = "";
          if (f(e)) return true;
        }
        return false;
      } else if (k.substring(0, stack.length) == stack) {
        u++;
      }
    }
    try { clearTimeout(timer) } catch(ee) {};
    if (u) {
      e.preventDefault();
      timer = setTimeout(function() {
        var f = m[stack];
        stack = "";
        if (f) f(e);
      }, 2000);
    } else {
      stack = "";
    }
  }

  function installGlobalKeys(elem) {
    elem.addEventListener('keypress', function(e) {
      if (e.target.id.substring(0, 7) == 'update-') return;
      if (e.target.nodeName.toLowerCase() == 'input') return;
      if (e.target.getAttribute('g_editable') == 'true') return;
      return handleKeys(e, globalKeymap);
    }, false)
  }

  function installItemKeys(elem) {
    elem.addEventListener('keypress', function(e) {
      if (e.target.id.substring(0, 7) != 'update-') return;
      return handleKeys(e, itemKeymap);
    }, false)
    elem.className += ' gpcommander';
  }

  function installEditorKeys(elem) {
    elem.addEventListener('keyup', function(e) {
      var hooked = false;
      if (hasClass(e.target, 'editable')) {
        var kc = e.keyCode ? e.keyCode : e.charCode;
        switch (kc) {
          case 13: // enter
            if (e.ctrlKey || e.altKey) {
              hooked = submitForm(e.target);
            }
            break;
          default:
            var c = String.fromCharCode(kc);
            if (!e.shiftKey) {
              c = c.toLowerCase();
            }
            if (e.ctrlKey && kc == 219) {
              c = '\x1b'; // C-[ muriyari !!
            }
            switch (c) {
              case '\x1b': // escape
                if (e.target.innerHTML.replace(/<[^>]+>/g, '').length == 0) {
                  hooked = closeForm(e.target);
                }
                break;
            }
        }
      }
      if (!hooked) {
        e.preventDefault();
      }
    }, false)
    elem.className += ' gpcommander';
  }

  function hasClass(elem, clazz) {
    var zz = elem.className.split(/\s+/g);
    for (var m = 0; m < zz.length; m++) {
      if (zz[m] == clazz) return true;
    }
    return false;
  }

  function getElementsByTagAndClassName(tag, clazz, node) {
    var retval = [];
    var elems = (node || document).getElementsByTagName(tag);
    for (var i = 0, I = elems.length; i < I; ++i) {
      var e = elems[i];
      if (hasClass(e, clazz)) {
        retval.push(e);
      }
    }
    return retval;
  }

  function findElement(elem, matcher) {
    if (matcher(elem)) {
      return elem;
    }
    for (var child = elem.firstChild; child; child = child.nextSibling) {
      var found = findElement(child, matcher);
      if (found) {
        return found;
      }
    }
    return undefined;
  }

  function findElementFromNext(elem, matcher) {
    for (var curr = elem.nextSibling; curr; curr = curr.nextSibling) {
      var found = findElement(curr, matcher);
      if (found) {
        return found;
      }
    }
    if (elem.parentNode) {
      return findElementFromNext(elem.parentNode, matcher);
    } else {
      return undefined;
    }
  }

  function findCancelElement(elem) {
    return findElementFromNext(elem, function(e) {
      return e.id && e.id.match(/\.c(ancel)?$/);
    });
  }

  function findSubmitElement(elem) {
    return findElementFromNext(elem, function(e) {
      return e.id && e.id.match(/\.post?$/);
    });
  }

  function installEvernoteClip(elem) {
    var ns = tools(elem);
    var url = getPermalinks(elem);
    var ln = ns[ns.length - 1];
    var n = document.createTextNode('  -  ');
    ln.parentNode.appendChild(n);
    // n = document.createElement('span');
    // n.appendChild(document.createTextNode('ClipEver'));
    n = document.createElement('img');
    n.setAttribute('src', 'http://static.evernote.com/article-clipper.png');
    n.setAttribute('class', 'd-h');
    n.setAttribute('role', 'button');
    n.setAttribute('tabindex', '0');
    n.setAttribute('onclick', "Evernote.doClip({styling: 'full', url: '" + url + "', code: '____2531', contentId: '" + elem.id + "'})");
    ln.parentNode.appendChild(n);
  }

  function installExternalScripts() {
    var n = document.createElement('script');
    n.setAttribute('type', 'text/javascript');
    n.setAttribute('src', 'http://static.evernote.com/noteit.js');
    document.getElementsByTagName('head')[0].appendChild(n);
  }

  function install() {
    var elems = document.getElementsByTagName('div');
    for (var n = 0; n < elems.length; n++) {
      var e = elems[n];
      if (e.id.substring(0, 7) == 'update-' && !hasClass(e, 'gpcommander')) {
        installItemKeys(e);
        //installEvernoteClip(e);
      } else if (hasClass(e, 'editable') && !hasClass(e, 'gpcommander')) {
        installEditorKeys(e);
      }
    }
  }

  function installScrollListener() {
    window.addEventListener('scroll', function() {
      if (AutoPagerize) {
        var b = parseInt((window.scrollY + window.innerHeight) / document.height + 0.1);
        if (b) {
          click(document.getElementsByClassName('a-f-zd-gb-h')[0]);
        }
      }
    }, false);
  }

  window.setInterval(install, 1000);
  installGlobalKeys(document.body);
  installExternalScripts();
  installScrollListener();

})()
