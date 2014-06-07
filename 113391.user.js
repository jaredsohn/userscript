// ==UserScript==
// @name           GameFAQs AMP Sorting
// @namespace      OTACON120
// @author         OTACON120
// @version        1.2.5
// @description    Gives the ability to sort GameFAQs Message Boards' "Active Messages" list
// @updateURL      http://userscripts.org/scripts/source/113391.meta.js
// @downloadURL    http://userscripts.org/scripts/source/113391.user.js
// @website        http://otacon120.com/user-scripts/gamefaqs-related/amp-sorting/
// @include        http://*.gamefaqs.com/boards/myposts.php*
// @match          http://*.gamefaqs.com/boards/myposts.php*
// ==/UserScript==

var i,
	topicsBody = document.getElementsByClassName('topics')[0].getElementsByTagName('tbody')[0],
	messagesRows = topicsBody.getElementsByTagName('tr'),
	removeRows = [],
	y;

for (i = 0; i < messagesRows.length; i++) {
	if (messagesRows[i].firstChild.colSpan == 5) {
		removeRows.push(messagesRows[i]);
	}
}
		
for (i = 0; i < removeRows.length; i++) {
	topicsBody.removeChild(removeRows[i]);
}

// set storage for pre-sorting variables
function gfaqsAMP_getValue(key, def) {
		return localStorage[key] || def;
}

function gfaqsAMP_setValue(key, value) {
	return localStorage[key]=value;
}

function gfaqsAMP_deleteValue(key) {
	return delete localStorage[key];
}

var lastSorted = gfaqsAMP_getValue('last_sorted', 4),
	ascDesc = gfaqsAMP_getValue('asc_or_desc', 1),
	stIsIE = /*@cc_on!@*/false,
	sorttable = {
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    
    if (!document.createElement || !document.getElementsByTagName) return;

	var style = document.createElement('style'),
		amtable,
		amth,
		i,
		sortText,
		x,
		currentDate = new Date(),
		currentDay = currentDate.getDate(),
		currentMonth = currentDate.getMonth() + 1,
		currentYear = currentDate.getFullYear(),
		timestamp,
		tsSplit,
		tsTime,
		tsDay,
		tsMonth,
		tsYear,
		ampm,
		timestampKey,
		totalPosts = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

	// add CSS for small visual tweaks
	style.setAttribute('type', 'text/css');
	style.innerHTML = 'th {padding: 0 !important;} #content #main_col .topics th a {padding: 0.2em; color: inherit !important; display: block !important; text-decoration: inherit !important; font-weight: inherit !important; font-style: inherit !important; font-size: inherit !important; cursor: pointer;} th a:hover { text-decoration: inherit !important;}';
	document.head.appendChild(style);

	
	amtable = document.getElementsByTagName('table')[0];
	amth = document.getElementsByTagName('th');
	amtable.id = "sortable";

	// set columns that shouldn't be sorted
	//amth[2].className = "sorttable_nosort";

	amth[2].id = "msgs";

	// make header text links
	for (i = 0; i < 5; i++) {
		sortText =	(amth[i].getElementsByTagName('a')[0] ? amth[i].getElementsByTagName('a')[0].innerHTML : amth[i].innerHTML);
		if (i == 4) {
			amth[i].className += " sorttable_sorted";
			amth[i].innerHTML = '<a>' + sortText + '<span id="sorttable_sortfwdind">&nbsp;&darr;</span></a>';
			amth[i].getElementsByTagName('a')[0].style.width = amth[i].getElementsByTagName('a')[0].scrollWidth + 'px';
		} else {
			amth[i].innerHTML = '<a>' + sortText + '</a>';
		}
		
		amth[i].getElementsByTagName('a')[0].setAttribute('onclick', 'setLastSorted(' + i + ')');
	}

	// add custom sort keys for proper sorting

	for (i = 0; i < totalPosts.length; i++) {
		for (x = 3; x < 5; x++) {
			timestamp = document.getElementsByTagName('tbody')[0].getElementsByTagName('tr')[i].getElementsByTagName('td')[x];
			tsSplit = timestamp.textContent.split(/\//);
			tsMonth = (tsSplit[0].length == 1 ? "0" + tsSplit[0] : tsSplit[0]);

			if (timestamp.textContent.indexOf(':') != -1) {
				tsSplit = tsSplit[1].split(" ");
				tsDay = (tsSplit[0].length == 1 ? "0" + tsSplit[0] : tsSplit[0]);
				tsSplit = tsSplit[1].replace(/:/, ' ');
				tsSplit = tsSplit.split(" ");
				ampm = tsSplit[1].substring(tsSplit[1].length - 2);

				if (tsSplit[0].length == 1) {
					tsTime = "0" + tsSplit[0] + tsSplit[1];
				} else if (ampm == "AM" && tsSplit[0] == 12) {
					tsSplit[0] = "00";
					tsTime = tsSplit[0] + tsSplit[1];
				} else {
					tsTime = tsSplit[0] + tsSplit[1];
				}

				if (ampm == "PM" && tsTime.substring(0, 2) != "12") {
					tsTime = 1200*1 + tsTime.substring(0, tsTime.length-2)*1;
				} else {
					tsTime = tsTime.substring(0, tsTime.length-2);
				}

				tsYear = (tsMonth > currentMonth || (tsMonth == currentMonth && tsDay > currentDay) ? currentYear - 1 : currentYear);
			} else {
				tsDay = tsSplit[1];
				tsYear = tsSplit[2];
				tsTime = '0000';
			}

			timestampKey = tsYear + tsMonth + tsDay + tsTime;
			timestamp.setAttribute('sorttable_customkey', timestampKey);
		}
	}
    
    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
    
    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.id.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }
    });
    
  },
  
  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }

    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];
    
    if (table.tHead.rows.length != 1) return; // can't cope with two header rows
    
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }
    if (sortbottomrows) {
      if (table.tFoot == null) {
        tfo = document.createElement('tfoot');
        table.appendChild(tfo);
      }
      for (var i=0; i<sortbottomrows.length; i++) {
        tfo.appendChild(sortbottomrows[i]);
      }
      delete sortbottomrows;
    }
    
    // work through each column and calculate its type
    headrow = table.tHead.rows[0].cells;
    for (var i=0; i<headrow.length; i++) {
      // manually override the type with a sorttable_type attribute
      if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
        mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
        if (mtch) { override = mtch[1]; }
	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	        headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
	      } else {
	        headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
	      }
	      // make it clickable to sort
	      headrow[i].sorttable_columnindex = i;
	      headrow[i].sorttable_tbody = table.tBodies[0];

	      st_addEvent(headrow[i],"click", function(e) {

		  var messageRows = document.getElementsByClassName('topics')[0].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
          if (this.className.search(/\bsorttable_sorted\b/) != -1) {
            // if we're already sorted by this column, just 
            // reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
			for (z = 0; z < messageRows.length; z++) {
				if (z == 0 || z % 2 == 0) {
					messageRows[z].className = '';
				} else {
					messageRows[z].className = 'even';
				}
			}
            this.className = this.className.replace('sorttable_sorted',
                                                    'sorttable_sorted_reverse');
            this.childNodes[0].removeChild(document.getElementById('sorttable_sortfwdind'));
            sortrevind = document.createElement('span');
            sortrevind.id = "sorttable_sortrevind";
            sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : '&nbsp;&uarr;';
            this.childNodes[0].appendChild(sortrevind);
			gfaqsAMP_setValue('asc_or_desc', 0);
            return;
          }
          if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
            // if we're already sorted by this column in reverse, just 
            // re-reverse the table, which is quicker
            sorttable.reverse(this.sorttable_tbody);
			for (z = 0; z < messageRows.length; z++) {
				if (z == 0 || z % 2 == 0) {
					messageRows[z].className = '';
				} else {
					messageRows[z].className = 'even';
				}
			}
            this.className = this.className.replace('sorttable_sorted_reverse',
                                                    'sorttable_sorted');
            this.childNodes[0].removeChild(document.getElementById('sorttable_sortrevind'));
            sortfwdind = document.createElement('span');
            sortfwdind.id = "sorttable_sortfwdind";
            sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&darr;';
            this.childNodes[0].appendChild(sortfwdind);
			gfaqsAMP_setValue('asc_or_desc', 1);
            return;
          }
          
          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }
          
          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&darr;';
          this.childNodes[0].appendChild(sortfwdind);

	        // build an array to sort. This is a Schwartzian transform thing,
	        // i.e., we "decorate" each row with the actual sort key,
	        // sort based on the sort keys, and then put the rows back in order
	        // which is a lot faster because you only do getInnerText once per row
	        row_array = [];
	        col = this.sorttable_columnindex;
	        rows = this.sorttable_tbody.rows;
	        for (var j=0; j<rows.length; j++) {
	          row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
	        }

	        sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
	        // row_array.sort(this.sorttable_sortfunction);
			row_array.reverse();
	        
	        tb = this.sorttable_tbody;
	        for (var j=0; j<row_array.length; j++) {
	          tb.appendChild(row_array[j][1]);
	        }

			for (z = 0; z < messageRows.length; z++) {
				if (z == 0 || z % 2 == 0) {
					messageRows[z].className = '';
				} else {
					messageRows[z].className = 'even';
				}
			}
            this.cl
			
			gfaqsAMP_setValue('asc_or_desc', 1);
	        
	        delete row_array;
			
	      });
	    }
    }
  },
  
  guessType: function(table, column) {
    // guess the type of a column based on its first non-blank row
    sortfn = sorttable.sort_alpha;
    for (var i=0; i<table.tBodies[0].rows.length; i++) {
      text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
      if (text != '') {
        if (text.match(/^-?[�$�]?[\d,.]+%?$/)) {
          return sorttable.sort_numeric;
        }
        // check for a date: dd/mm/yyyy or dd/mm/yy 
        // can have / or . or - as separator
        // can be mm/dd as well
        possdate = text.match(sorttable.DATE_RE)
        if (possdate) {
          // looks like a date
          first = parseInt(possdate[1]);
          second = parseInt(possdate[2]);
          if (first > 12) {
            // definitely dd/mm
            return sorttable.sort_ddmm;
          } else if (second > 12) {
            return sorttable.sort_mmdd;
          } else {
            // looks like a date, but we can't tell which, so assume
            // that it's dd/mm (English imperialism!) and keep looking
            sortfn = sorttable.sort_ddmm;
          }
        }
      }
    }
    return sortfn;
  },
  
  getInnerText: function(node) {
    // gets the text we want to use for sorting for a cell.
    // strips leading and trailing whitespace.
    // this is *not* a generic getInnerText function; it's special to sorttable.
    // for example, you can override the cell text with a customkey attribute.
    // it also gets .value for <input> fields.
    
    hasInputs = (typeof node.getElementsByTagName == 'function') &&
                 node.getElementsByTagName('input').length;
    
    if (node.getAttribute("sorttable_customkey") != null) {
      return node.getAttribute("sorttable_customkey");
    }
    else if (typeof node.textContent != 'undefined' && !hasInputs) {
      return node.textContent.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.innerText != 'undefined' && !hasInputs) {
      return node.innerText.replace(/^\s+|\s+$/g, '');
    }
    else if (typeof node.text != 'undefined' && !hasInputs) {
      return node.text.replace(/^\s+|\s+$/g, '');
    }
    else {
      switch (node.nodeType) {
        case 3:
          if (node.nodeName.toLowerCase() == 'input') {
            return node.value.replace(/^\s+|\s+$/g, '');
          }
        case 4:
          return node.nodeValue.replace(/^\s+|\s+$/g, '');
          break;
        case 1:
        case 11:
          var innerText = '';
          for (var i = 0; i < node.childNodes.length; i++) {
            innerText += sorttable.getInnerText(node.childNodes[i]);
          }
          return innerText.replace(/^\s+|\s+$/g, '');
          break;
        default:
          return '';
      }
    }
  },
  
  reverse: function(tbody) {
    // reverse the rows in a tbody
    newrows = [];
    for (var i=0; i<tbody.rows.length; i++) {
      newrows[newrows.length] = tbody.rows[i];
    }
    for (var i=newrows.length-1; i>=0; i--) {
       tbody.appendChild(newrows[i]);
    }
    delete newrows;
  },
  
  /* sort functions
     each sort function takes two parameters, a and b
     you are comparing a[0] and b[0] */
  sort_numeric: function(a,b) {
    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
    if (isNaN(aa)) aa = 0;
    bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
    if (isNaN(bb)) bb = 0;
    return aa-bb;
  },
  sort_alpha: function(a,b) {
    if (a[0].toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '')==b[0].toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '')) return 0;
    if (a[0].toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '')<b[0].toLowerCase().replace(/[^a-zA-Z 0-9]+/g, '')) return -1;
    return 1;
  },
  sort_ddmm: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; m = mtch[2]; d = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  sort_mmdd: function(a,b) {
    mtch = a[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt1 = y+m+d;
    mtch = b[0].match(sorttable.DATE_RE);
    y = mtch[3]; d = mtch[2]; m = mtch[1];
    if (m.length == 1) m = '0'+m;
    if (d.length == 1) d = '0'+d;
    dt2 = y+m+d;
    if (dt1==dt2) return 0;
    if (dt1<dt2) return -1;
    return 1;
  },
  
  shaker_sort: function(list, comp_func) {
    // A stable sort function to allow multi-level sorting of data
    // see: http://en.wikipedia.org/wiki/Cocktail_sort
    var b = 0;
    var t = list.length - 1;
    var swap = true;

    while(swap) {
        swap = false;
        for(var i = b; i < t; ++i) {
            if ( comp_func(list[i], list[i+1]) > 0 ) {
                var q = list[i]; list[i] = list[i+1]; list[i+1] = q;
                swap = true;
            }
        } // for
        t--;

        if (!swap) break;

        for(var i = t; i > b; --i) {
            if ( comp_func(list[i], list[i-1]) < 0 ) {
                var q = list[i]; list[i] = list[i-1]; list[i-1] = q;
                swap = true;
            }
        } // for
        b++;

    } // while(swap)
  }  
}
/* for Mozilla/Opera9 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", sorttable.init, false);
}

/* for Webkit */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
    var _timer = setInterval(function() {
        if (/loaded|complete/.test(document.readyState)) {
            sorttable.init(); // call the onload handler
        }
    }, 10);
}

function st_addEvent(element, type, handler) {
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else {
		// assign each event handler a unique ID
		if (!handler.$$guid) handler.$$guid = st_addEvent.guid++;
		// create a hash table of event types for the element
		if (!element.events) element.events = {};
		// create a hash table of event handlers for each element/event pair
		var handlers = element.events[type];
		if (!handlers) {
			handlers = element.events[type] = {};
			// store the existing event handler (if there is one)
			if (element["on" + type]) {
				handlers[0] = element["on" + type];
			}
		}
		// store the event handler in the hash table
		handlers[handler.$$guid] = handler;
		// assign a global event handler to do all the work
		element["on" + type] = handleEvent;
	}
};
// a counter used to create unique IDs
st_addEvent.guid = 1;

function removeEvent(element, type, handler) {
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else {
		// delete the event handler from the hash table
		if (element.events && element.events[type]) {
			delete element.events[type][handler.$$guid];
		}
	}
};

function handleEvent(event) {
	var returnValue = true;
	// grab the event object (IE uses a global event object)
	event = event || fixEvent(((this.ownerDocument || this.document || this).parentWindow || window).event);
	// get a reference to the hash table of event handlers
	var handlers = this.events[event.type];
	// execute each event handler
	for (var i in handlers) {
		this.$$handleEvent = handlers[i];
		if (this.$$handleEvent(event) === false) {
			returnValue = false;
		}
	}
	return returnValue;
};

function fixEvent(event) {
	// add W3C standard event methods
	event.preventDefault = fixEvent.preventDefault;
	event.stopPropagation = fixEvent.stopPropagation;
	return event;
};
fixEvent.preventDefault = function() {
	this.returnValue = false;
};
fixEvent.stopPropagation = function() {
  this.cancelBubble = true;
}

// array-like enumeration
if (!Array.forEach) { // mozilla already supports this
	Array.forEach = function(array, block, context) {
		for (var i = 0; i < array.length; i++) {
			block.call(context, array[i], i, array);
		}
	};
}

// generic enumeration
Function.prototype.forEach = function(object, block, context) {
	for (var key in object) {
		if (typeof this.prototype[key] == "undefined") {
			block.call(context, object[key], key, object);
		}
	}
};

// character enumeration
String.forEach = function(string, block, context) {
	Array.forEach(string.split(""), function(chr, index) {
		block.call(context, chr, index, string);
	});
};

// globally resolve forEach enumeration
var forEach = function(object, block, context) {
	if (object) {
		var resolve = Object; // default
		if (object instanceof Function) {
			// functions have a "length" property
			resolve = Function;
		} else if (object.forEach instanceof Function) {
			// the object implements a custom forEach method so use that
			object.forEach(block, context);
			return;
		} else if (typeof object == "string") {
			// the object is a string
			resolve = String;
		} else if (typeof object.length == "number") {
			// the object is array-like
			resolve = Array;
		}
		resolve.forEach(object, block, context);
	}
};

// insert functions into <head> so they run, then remove
function contentEval(source) {
	insertScript = document.createElement('script');
	insertScript.setAttribute('type', 'text/javascript');
	insertScript.textContent = source;

	document.head.appendChild(insertScript);
	document.head.removeChild(insertScript);
}

if (/WebKit/i.test(navigator.userAgent)) {
	contentEval(
		'preSortInterval = setInterval(\'preSort()\', 500);'
	);
}

contentEval(
	function preSort() {
		var amth = document.getElementsByTagName('th'),
			lastSorted = gfaqsAMP_getValue('last_sorted', 4),
			ascDesc = gfaqsAMP_getValue('asc_or_desc', 1),
			sortEvent = document.createEvent('MouseEvents'),
			y;
		sortEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		if (ascDesc == 0) {
			if (lastSorted != 4) {
				for (y = 0; y < 2; y++) {
					amth[lastSorted].dispatchEvent(sortEvent);
					if (/WebKit/i.test(navigator.userAgent) && document.getElementById('sorttable_sortrevind')) {
						clearInterval(preSortInterval);
					}
				}
			} else {
				amth[lastSorted].dispatchEvent(sortEvent);
				if (/WebKit/i.test(navigator.userAgent) && document.getElementById('sorttable_sortfwdind')) {
					clearInterval(preSortInterval);
				}
			}
		} else if (lastSorted != 4) {
			amth[lastSorted].dispatchEvent(sortEvent);
			if (/WebKit/i.test(navigator.userAgent) && document.getElementById('sorttable_sortfwdind')) {
				clearInterval(preSortInterval);
			}
		}
	}
);

contentEval(
	function gfaqsAMP_getValue(key, def) {
		return localStorage[key] || def;
	}
);

contentEval(
	function gfaqsAMP_setValue(key, value) {
		return localStorage[key]=value;
	}
);

contentEval(
	function gfaqsAMP_deleteValue(key) {
		return delete localStorage[key];
	}
);

contentEval(
	function setLastSorted(colNum){
		gfaqsAMP_setValue('last_sorted', colNum);
	}
);

// set onload for pre-sorting
var sortScript = document.createElement('script');
sortScript.setAttribute('type', 'text/javascript');
sortScript.textContent = 'window.onload = preSort;';

document.head.appendChild(sortScript);
document.head.removeChild(sortScript);