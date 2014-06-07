// First written by:
// @namespace      shoecream@luelinks.net
// I have edited the script according to facebook page as on August 02, 2011
// ==UserScript==
// @name           Facebook phonebook export
// @namespace      tag:wecacuee@gmail.com,fb-export
// @description    Exports facebook contacts
// @include        https://www.facebook.com/friends/edit/?sk=phonebook
// ==/UserScript==

function find_children (dom, callback) {
  // depth-first search of a DOM node's children. expects a callback that takes
  // one argument, a DOM node. returns an Array of DOM nodes for which the
  // callback returned true
  if (typeof callback != 'function') throw new TypeError();
  var stack = [];
  var children = dom.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (callback(children[i]))
      stack.push(children[i]);
    if (children[i].hasChildNodes()) {
      var newstack = find_children(children[i], callback);
      if (newstack.length) {
        for (var j = 0; j < newstack.length; j++) {
          stack.push(newstack[j]);
        }
      }
    }
  }
  return stack;
}


function search () {
  var getNum = function (dom) {
    if (dom.className == "fsl")
      return true;
  };

  var getId = function(dom) {
    var titles = dom.getElementsByTagName('a');
    for (var i = 0; i < titles.length; i++) {
      if (/\/profile.php\?id=\d+/i.test(titles[i].href)
         && titles[i].childNodes.length == 1
         && titles[i].childNodes[0].nodeName == "#text")    
      {
        // make csv not break by stripping out characters we don't like        
        return {
          href: titles[i].href,
          name: titles[i].textContent.replace(/[,'"]/g, '')
        };
      }
    }
  }


  var stripNum = function (no) {
    return no.replace(/[^\d]/g, '');
  }

  var dictionary = {};
  var rows = document.getElementsByClassName('phonebookEntry');
  for (var i = 0; i < rows.length; i++) {
    var set = getId(rows[i]);
    var fixed_name = set.name.replace(/^\s+|\s+$/g, '').replace(/\s{2,}/, ' ');
    dictionary[set.href] = {name: fixed_name};
    var numbers = find_children(rows[i], getNum);
	if (numbers.length >= 1) {
		dictionary[set.href].mobile = stripNum(numbers[0].textContent);
		if (numbers.length >= 2) {
			dictionary[set.href].land = stripNum(numbers[0].textContent);
		}
	}
  }
  alert(serialize(dictionary));
}

function serialize(obj) {
  var rows = ['Name,Mobile Phone,Home Phone'];
  for (var i in obj) {
    var cols = [];
    if (obj.hasOwnProperty(i) && obj[i]) {
      if (obj[i].mobile || obj[i].land) {
        cols.push(obj[i].name);
        cols.push(obj[i].mobile ? obj[i].mobile : '' );
        cols.push(obj[i].land   ? obj[i].land   : '' );
        rows.push(cols.join(','));
      }
    }
  }
  return rows.join('\n');
}

GM_registerMenuCommand('Grab Phone Numbers', search);
