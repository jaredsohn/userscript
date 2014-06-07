// ==UserScript==
// @name           LT Read Helper - LibraryThing
// @namespace      http://userscripts.org/users/brightcopy
// @description    Creates categories on work page to help with reading tracking.
// @include        http://*.librarything.tld/work/*
// ==/UserScript==

var SCRIPT_NAME = 'LT Read Helper';  

var LEFT   = 0;
var MIDDLE = 1;
var RIGHT  = 2;

var SELECTED = 'ltbtn-selected';

var TO_READ  = { id:'ltrhToRead'  , img:'book-question.png' , position:LEFT   , promptPhrase:'unread'           , defaultCollectionID: 3 };
var READING  = { id:'ltrhReading' , img:'book-open.png'     , position:MIDDLE , promptPhrase:'reading'          , defaultCollectionID: 7 };
var READ     = { id:'ltrhRead'    , img:'book.png'          , position:MIDDLE , promptPhrase:'read'             , defaultCollectionName:'Read'};
var READ_BU  = { id:'ltrhReadBU'  , img:'book-brown.png'    , position:RIGHT  , promptPhrase:'read but unowned' , defaultCollectionID: 5 };
var allCategories = [TO_READ, READING, READ, READ_BU];
var categories = [];
var allCollections = [];

var collectionsSection;

var bookInfoElem = $x1('//table[@class="bookinformation"]/tbody');

var Node = document; // hack to get Node constants

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
      case XPathResult.NUMBER_TYPE:
          p = 'numberValue';
          break;
      case XPathResult.STRING_TYPE:
          p = 'stringValue';
          break;
      case XPathResult.BOOLEAN_TYPE:
          p = 'booleanValue';
          break;
      case XPathResult.ANY_UNORDERED_NODE_TYPE:
      case XPathResult.FIRST_ORDERED_NODE_TYPE:
          p = 'singleNodeValue';
          break;
      default:
          return d.evaluate(x, r, null, 
              t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    var result = d.evaluate(x, r, null, t, null);
    if (result != null)
      result = result[p];
    
    return result;
}

function $x1(x, r) {
  return $x(x, XPathResult.ANY_UNORDERED_NODE_TYPE, r)
} 

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(searchElement /*, fromIndex */)
  {
    "use strict";

    if (this === void 0 || this === null)
      throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0)
      return -1;

    var n = 0;
    if (arguments.length > 0)
    {
      n = Number(arguments[1]);
      if (n !== n) // shortcut for verifying if it's NaN
        n = 0;
      else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0))
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }

    if (n >= len)
      return -1;

    var k = n >= 0
          ? n
          : Math.max(len - Math.abs(n), 0);

    for (; k < len; k++)
    {
      if (k in t && t[k] === searchElement)
        return k;
    }
    return -1;
  };
}

function addClass(elem, classname) {
  var classes = elem.getAttribute('class').split(' ');
  if (classes.indexOf(classname) == -1) {
    classes.push(classname);
    elem.setAttribute('class', classes.join(' '));
  }
}

function removeClass(elem, classname) {
  var classes = elem.getAttribute('class').split(' ');
  var i = classes.indexOf(classname);
  if (i != -1) {
    classes.splice(i, 1);
    elem.setAttribute('class', classes.join(' '));
  }
}

function hasClass(elem, classname) {
  var classes = elem.getAttribute('class').split(' ');
  return (classes.indexOf(classname) != -1);
}

function Date_toYMD(date) {
  var year, month, day;
  year = String(date.getFullYear());
  month = String(date.getMonth() + 1);
  if (month.length == 1) {
      month = "0" + month;
  }
  day = String(date.getDate());
  if (day.length == 1) {
      day = "0" + day;
  }
  return year + "-" + month + "-" + day;
}

function req(url, fn) {
  GM_xmlhttpRequest({
    method:'GET',
    url:url,
    onload: fn,
    onerror: function(response) {
      console.log('req error: ', response);
    }
  });
}

function setDate(book_id, dateField, newDate, fn) {
  req('/ajax_modifyData.php?datatype=lt-' + dateField + '&id=' + dateField + book_id + 
       '&newData=' + (newDate ? Date_toYMD(newDate) : ''), 
       fn);
}

function setStartDate(book_id, newDate, fn) {
  setDate(book_id, 'datestarted', newDate, fn);
}

function setEndDate(book_id, newDate, fn) {
  setDate(book_id, 'dateread', newDate, fn);
}

function clearStartDate(book_id, fn) {
  setDate(book_id, 'datestarted', undefined, fn);
}

function clearEndDate(book_id, fn) {
  setDate(book_id, 'dateread', undefined, fn);
}

function doEventDispatch(elm) {
  var evt = null;

  if(document.createEvent)
    evt = document.createEvent('MouseEvents');
  if(elm && elm.dispatchEvent && evt && evt.initMouseEvent) {
    evt.initMouseEvent(
        'click',
        true,     // Click events bubble
        true,     // and they can be cancelled
        document.defaultView,  // Use the default view
        1,        // Just a single click
        0,        // Don't bother with co-ordinates
        0,
        0,
        0,
        false,    // Don't apply any key modifiers
        false,
        false,
        false,
        0,        // 0 - left, 1 - middle, 2 - right
        null);    // Click events don't have any targets other than
                  // the recipient of the click
    elm.dispatchEvent(evt);
  }
} 

function findCollectionsSectionItem(collection) {
  var result = $x1('a[@href="/catalog.php?collection=' + collection.id + '"]', collectionsSection);
  return result;
}

function addCollectionSectionItem(collection) {
  var item = findCollectionsSectionItem(collection);
  
  if (!item) {
    collectionsSection.appendChild(document.createTextNode(', '));
    var a = collectionsSection.appendChild(document.createElement('a'));
    a.setAttribute('target', '_top');
    a.setAttribute('href', '/catalog.php?collection=' + collection.id);
    a.setAttribute('style', 'white-space: nowrap;');
    a.appendChild(document.createTextNode(collection.name));
  }
}

function removeCollectionSectionItem(collection) {
  var item = findCollectionsSectionItem(collection);
  
  if (item) {
    var node = item.previousSibling;
    
    if (!node || node.nodeType != Node.TEXT_NODE) {
      node = item.nextSibling;

      if (!node || node.nodeType != Node.TEXT_NODE)
        node = undefined;
    }
    
    if (node)
      node.parentNode.removeChild(node);
    
    item.parentNode.removeChild(item);
  }
}

function addTo(book_id, category, fn) {
  if (category.hide)
    fn();
  else
    req('/ajax_collectionsToggleBook.php?addRemove=1&bookid=' + book_id + '&c_id=' + category.collection.id,
        function () {
          category.collection.selected = true;
          setCollectionSelected(category.collection, true);
          addCollectionSectionItem(category.collection);
          
          fn();
        }
    );
}

function removeFrom(book_id, category, fn) {
  if (category.hide)
    fn();
  else
    req('/ajax_collectionsToggleBook.php?addRemove=0&bookid=' + book_id + '&c_id=' + category.collection.id,
        function () {
          category.collection.selected = false;
          setCollectionSelected(category.collection, false);
          removeCollectionSectionItem(category.collection);
          
          fn();
        }
    );
}

function selectButton(button) {
  try {
  
  var book_id = document.getElementById('mainCover').parentNode.getAttribute('href').split('/').pop();
  if (!book_id)
    return console.log(SCRIPT_NAME + ' error: book_id not found');

  if (button == TO_READ.element) {
    clearStartDate(book_id, function () {
        clearEndDate(book_id, function () {
            addTo(book_id, TO_READ, function () {
                removeFrom(book_id, READING, function () {
                    removeFrom(book_id, READ, function () {
                        removeFrom(book_id, READ_BU,
                            function () { startup() 
                        })
                    })
                })
            })
        })
    });
  }
  else if (button == READING.element) {
    clearEndDate(book_id, function () {
        setStartDate(book_id, new Date(), function () {
            addTo(book_id, READING, function () {
                removeFrom(book_id, TO_READ, function () {
                    removeFrom(book_id, READ, function () {
                        removeFrom(book_id, READ_BU, function () {
                            startup() 
                        })
                    })
                })
            })
        })
    });
  }
  else if (button == READ.element) {
    setEndDate(book_id, new Date(), function () {
        addTo(book_id, READ, function () {
            removeFrom(book_id, TO_READ, function () {
                removeFrom(book_id, READING, function () { 
                    removeFrom(book_id, READ_BU, function () {
                        startup() 
                    })
                })
            })
        })
    });
  }
  else if (button == READ_BU.element) {
    setEndDate(book_id, new Date(), function () {
        addTo(book_id, READ, function () {
            addTo(book_id, READ_BU, function () {
                removeFrom(book_id, TO_READ, function () {
                    removeFrom(book_id, READING, function () {
                        startup() 
                    })
                })
            })
        })
    });
  }
  else
    console.log('no button');
  
  } catch (e) {
    console.log(e);
  }
}

function addButton(e, category, position) {
  var span = document.createElement('span');
  span.setAttribute('class', 'ltbtn ltbtn-inline-block ltbtn-ff3'
      + (!category.collection ? '' : (category.collection.selected ? ' ' + SELECTED : ''))
      + (categories.length && category != categories[categories.length-1] ? ' ltbtn-collapse-right' : '')
      + (categories.length && category != categories[0] ? ' ltbtn-collapse-left' : '')
      );

  span.setAttribute('title', category.collection ? category.collection.name : category.name);
  span.setAttribute('id', category.id);
  span.innerHTML =
      '<a href="#">'
      + '<div class="ltbtn-outer-box ltbtn-inline-block">'
      + '<div class="ltbtn-inner-box ltbtn-inline-block">'
      + '<div class="ltbtn-pos"><div class="ltbtn-top-shadow">'
      + '</div><div class="ltbtn-content" style="padding: 4px 2px 7px 4px;"><div class="ltbtn-body">' 
      + '<img src="http://static.librarything.com/pics/fugue21/' + category.img + '">'
      + '</div></div></div></div></div></a>';

  if (category.hide)
    span.setAttribute('style', 'display: none');

  e.appendChild(span);
  
  category.element = span;
  
  return span;
}

function buttonClick(e) {
  selectButton(this);
}

function getCollectionName(collection_id) {
  for (var i = 0; i < allCollections.length; i++)
    if (allCollections[i].id == collection_id)
      return allCollections[i].name;
  
  return '';
}

function getCollectionID(name) {
  var collection = getCollectionByName(name);
  if (collection)
    return collection.id;
}

function getCollectionByName(name) {
  for (var i = 0; i < allCollections.length; i++)
    if (allCollections[i].name.toLowerCase() == name.toLowerCase())
      return allCollections[i];
}

function getCollectionByID(id) {
  for (var i = 0; i < allCollections.length; i++)
    if (allCollections[i].id == id)
      return allCollections[i];
}

function settingsButtonClick() {
  try {
    for (var i = 0; i < allCategories.length; i++) {
      var category = allCategories[i];
      
      var value = undefined;
      
      while (undefined === (value = 
          promptFor(category.promptPhrase,
            typeof category.defaultCollectionName == 'string' ? category.defaultCollectionName : getCollectionName(category.defaultCollectionID),
            category.collection ? category.collection.name : ''))
          );
      
      if (value == null)
        break;
      else if (value == 'hide')
        GM_setValue(category.id + '.hide', true)
      else if (value) {
        GM_setValue(category.id + '.id', value);
        GM_deleteValue(category.id + '.hide');
      }
    }
    
    startup();
  } catch (e) { console.log(e) }
}

function promptFor(setting, defaultValue, currentValue) {
  var value = prompt('Enter the name of the ' + setting + ' collection.\n' +
      'Leave empty to reset to the default (' + defaultValue + 
      ').\nEnter the word "hide" to hide this button.', currentValue);

  if (value == null)
    return null;
  else if (value.toLowerCase() == 'hide' 
        || value.toLowerCase() == '"hide"' 
        || value.toLowerCase() == "'hide'")
    return 'hide';
  else {
    if (value == '')
      value = defaultValue;
    
    var id = getCollectionID(value);
    
    if (id == undefined) {
      alert('No collection found named ' + value + '.');
      return undefined;
    }
    else
      return id;
  }
}

function setupReadArea(elem) {
  var old = document.getElementById('ltrhButtons');
  if (old)
    old.parentNode.removeChild(old);

  var tr = document.createElement('tr');
  tr.setAttribute('id', 'ltrhButtons');
  tr.setAttribute('class', 'memberinfo');

  var lbl = document.createElement('td');
  lbl.appendChild(document.createTextNode('Read'));
  lbl.setAttribute('colspan', 3);
  lbl.setAttribute('class', 'left');
  lbl.setAttribute('style', 'vertical-align:middle');
  tr.appendChild(lbl);

  var ctr = document.createElement('td');
  ctr.setAttribute('style', 'white-space:nowrap; vertical-align:middle');
  tr.appendChild(ctr);
  
  var div = document.createElement('div');
  div.setAttribute('style', 'position:relative');
  ctr.appendChild(div);

  for (var i = 0; i < categories.length; i++)
    addButton(div, categories[i]).addEventListener('click', buttonClick, false);

  var btn = document.createElement('a');
  var img = document.createElement('img');
  btn.appendChild(img);
  img.setAttribute('src', 'http://static.librarything.com/pics/fugue21/gear.png');
  btn.setAttribute('href', '#');
  btn.setAttribute('style', 'position:absolute; right:0; top:8px');
//  btn.setAttribute('style', 'padding-left: 30px');
  btn.setAttribute('title', 'Reading settings');
  btn.addEventListener('click', settingsButtonClick, false);
  div.appendChild(btn);
  
  elem.appendChild(tr);
}

var menuBuilderMenuItemSelected = 'menuBuilderMenuItemSelected';

function getCollectionSelected(collection) {  
  return hasClass(collection.elem, menuBuilderMenuItemSelected);
}

function setCollectionSelected(collection, value) {  
  if (value)
    addClass(collection.elem, menuBuilderMenuItemSelected);
  else
    removeClass(collection.elem, menuBuilderMenuItemSelected);
}

function readCollections() {
  var elems = $x('//div[@class="menuBuilderMenu"]/a');

  allCollections = [];
  categories = [];
  
  for (var i = 0; i < elems.snapshotLength; i++) {
    var elem = elems.snapshotItem(i);
    if (elem.hasAttribute('c_id')) {
      var c = {elem:elem, id:elem.getAttribute('c_id'), name:elem.textContent};
      c.selected = getCollectionSelected(c);
      allCollections.push(c);
    }
  }

  for (var i = 0; i < allCategories.length; i++) {
    var category = allCategories[i];
    category.collection = undefined; // reset
    
    category.hide = GM_getValue(category.id + '.hide');
    category.collectionID = GM_getValue(category.id + '.id');
    if (category.collectionID == undefined)
      category.collectionID = category.defaultCollectionID;

    category.collection = 
        category.collectionID == undefined
        ? getCollectionByName(category.defaultCollectionName)
        : getCollectionByID(category.collectionID);
      
    if (!category.hide)
      categories.push(category);

//    console.log(category.id + ': ' + category.collectionID + ', ' + category.collection.name + ', ' + category.collection.selected);
  }
}

function startup() {
  collectionsSection = $x1('//table[@class="bookinformation"]/tbody//span[@lt_collectionui_type="horizontalList"]', bookInfoElem);
  readCollections();
  setupReadArea(bookInfoElem);
}

try {

if (!bookInfoElem)
  return console.log('No form_rating element');
else
  startup();

} catch (e) { console.log(e) }