// ==UserScript==
// @name          notesforgooglescholar
// @namespace     http://www.monperrus.net/martin/
// @author        Martin Monperrus <martin.monperrus@gmail.com>
// @description   Enables you to take notes on search results of Google Scholar
// @license       GNU Lesser General Public License (LGPL)
// @version       0.1
// @include       http://scholar.google.tld/*
// @require       http://www.monperrus.net/martin/ListManager.js
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

/** Redirecting the log to firebug */
if(unsafeWindow.console){
   console = unsafeWindow.console;
   console.log('log enabled');
}

/** The main function of notesforgooglescholar */
function notesforgooglescholar_main() {
  // for each result of google scholar
  $(".gs_r").each(
  function (index, result) {
      
    // getting the paper title
    var text = $(result).find('.gs_rt').text();
    
    // we create a DIV object to contain the listmanager
    var container = $('<div/>');      
    
    // creating a new list manager
    // and putting it into the container
    var listManager = new ListManager('notesforgooglescholar/'+text).setLabel('Note: ').display(container);
    
    // hide the List manager
    // it appears only when one clicks on notes
    container.hide();
    container.appendTo(result);
    
    // adding a link to toggle the note widget
    var noteLink = $('<a href="javascript:void(0)">Notes ('+listManager.elements().length+')</a>');
    noteLink.click(function() {container.toggle();});
    var noteEnvelop = $('<span> - </span>');
    noteEnvelop.append(noteLink);
    $(result).find('.gs_fl a').last().after(noteEnvelop);
  });
  // a last touch of CSS
  ListManager.loadDefaultCss();
}

// using this alternative storage object for ListManager (see the @require)
// we keep the notes from different Google domains
// e.g. scholar.google.fr and scholar.google.com
// on the contrary, using localStorage would return different lists
LocalStorageListBackend._storage = {
  setItem: function(k,v) { GM_setValue(k,v); },
  // localStorage.getItem returns null if no such key exists while GM_getValue returns undefined)
  getItem: function(k) { return GM_getValue(k) || null; }
};

notesforgooglescholar_main();
