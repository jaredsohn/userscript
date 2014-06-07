// ==UserScript==
// @name        LibraryThing autocomplete tags
// @namespace   http://userscripts.org/users/maxstarkenburg
// @description When adding tags to a book, your previously used tags will be offered for autocompletion
// @include     http*://*librarything.tld/addbooks
// @include     http*://*librarything.tld/catalog_bottom.php*
// @include     http*://*librarything.tld/work/*
// @include     http*://*librarything.tld/addnew.php*
// @version     4.6
// @grant       GM_xmlhttpRequest
// ==/UserScript==

// Use $j instead of $ so as to not interfere with Prototype
var $j = unsafeWindow.jQuery;

// Variables used to set up validPage. 
var url = document.URL, 
    editableCatalogTags = false, 
    editableBookTags = false;
if (url.indexOf("/catalog_bottom") > -1 || url.indexOf("/addnew.php") > -1) editableCatalogTags = $j('td[ondblclick="LT_editData(event,\'lt-tag\');"]').length || $j("input[name='form_tags']"); 
if (url.indexOf("/work/") > -1) editableBookTags = $j("#tagEditSpan").length || $j("#book_editForm").length;
var validPage = url.indexOf("/addbooks") > -1 || editableCatalogTags || editableBookTags;

// Only bother with this script if we're somewhere we can enter/edit tags. 
// /catalog_bottom.php* and /work/* are ambiguous and we might otherwise do too much 
// heavy lifting while viewing others' catalogs, others' works, or non-editable work pages.
if (validPage) {

  // Give the autocomplete dropdown some styling, courtesy of jQuery UI
  $j("head").append('<link type="text/css" rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/smoothness/jquery-ui.min.css"/>')

  // A few touch-ups to behave better with LT styling, plus make it scrollable if many tags are found
  // Also styling for the sort order options
  $j("head").append('<style type="text/css">\
    .ui-autocomplete a { color: #222 !important } \
    .ui-autocomplete { max-height: 200px; overflow-y: auto; overflow-x: hidden; z-index: 500; font-size: .8em; } \
    .catalogpage .ui-autocomplete { font-size: 1em; } \
    .workpagetageditbox-autocomplete { width: 100%; background: #ffc; border: 1px solid #dd9; padding: 0.3em; margin-right: 10px; height: 100px; font-family: Arial; font-size: 13px; } \
    .gm-autocomplete-sort { text-align: right; padding: 1em .5em .5em; opacity: .8; font-size: .85em; } \
    .catalogpage .gm-autocomplete-sort { font-size: .9em; } \
    .ui-autocomplete:not(.gm-autocomplete-hovered) .gm-autocomplete-sort { display: none; } \
    .gm-autocomplete-sort span:before { content: "\u2611 "; } \
    .gm-autocomplete-sort span.gm-autocomplete-sort-unselected:hover { text-decoration: underline; cursor: pointer; } \
    .gm-autocomplete-sort span.gm-autocomplete-sort-unselected:before { content: "\u2610 "; } \
  </style>');

  // Append this to end of <body>, since adding as a @resource above in GM doesn't seem to work without jQuery, yet 
  // adding jQuery as a @resource above conflicts with the jQuery already in LT, thus breaking autocomplete. Harumph.
  $j("body").append('<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>')

  // Declare some global variables outside GM_xmlhttpRequest so they can be used elsewhere
  var tags = [], tagsAlpha, tagsFreq, tag, minlength = 3;
  var sortOrder = localStorage.LTautocompleteSort ? localStorage.LTautocompleteSort : "frequency";

  // Get the list of tags (plus their frequency) from one's tags page and put them in an array called "tags"
  GM_xmlhttpRequest({
    method: "GET",
    url: "/tags.php",
    onload: function(responseDetails) {
      var resp = responseDetails.responseText;
      var tagsRegEx = /catalog.php\?tag=.*?>(.*?)<\/a> \(([0-9,]*)\)/g;
      // The following loop is based on that by htw at http://stackoverflow.com/a/844049/752122
      while (tag = tagsRegEx.exec(resp)) {
        var tagnum = {};
        tagnum.tag = tag[1];
        tagnum.quantity = tag[2];
        tags.push(tagnum);
      }
      // The first half of the array is the tags by frequency, the second by alphabetical order
      // Depending on the user's preferences, choose which half to use for the tags array
      var halfTags = tags.length / 2;
      tagsAlpha = tags.splice(halfTags, halfTags);
      tagsFreq  = tags.splice(0, halfTags);
      tags = sortOrder == "alpha" ? tagsAlpha : tagsFreq;
      // Set minLength, which is based on how many tags one has
      minlength = getMinLength();
    }
  });

  // Set autcomplete's minLength dynamically based on how many tags one has.  Browser performance 
  // of users with large tag sets will suffer if it's too low.  These are rough approximations.  YMMV.
  function getMinLength() {
    if (tags.length > 5000 || tags.length == 0) return 3;
    else if (tags.length > 1000) return 2;
    else return 1;
  }
  
  /* The main event.  Keying down in one of these selectors calls the jQuery UI plug-in that makes the menu 
     of suggestions appear when one is typing in a tag field.

     The selectors are: 
     - "input[name='form_tags']" is for the "Add books" page (/addbooks) or the "Power Edit" form
     - "textarea[onkeypress*='lt-tag']" is for the listings in catalog view
     - "#form_tags" is for the "Edit your book" page
     - "textarea.workpagetageditbox" is for the "Your book information" on a book page (note this is handled slightly differently)
     - ".gm-autocomplete-current-input" is a hack to allow immediate change in sort order while preventing weird resulting behavior

     The code in tagAutoComplete(), split(), and extractLast() is based on the example code 
     at http://jqueryui.com/autocomplete/#multiple, with several custom edits and additions.
  */
  $j(".content").on("keydown", "input[name='form_tags'], textarea[onkeypress*='lt-tag'], #form_tags, input[name='form_tags'], .gm-autocomplete-current-input", function(evt) {
      tagAutoComplete($j(this),evt);
    });
  // Handle the "Your book information" page slightly differently
  $j(".content").on("keydown", "textarea.workpagetageditbox", function(evt) {
      /* This part's a bit of a hack, but... if you're editing tags from the "Your book information" on a book page, 
         current behavior on clicking Enter is to save the form. But if the autocomplete menu is open and one of the 
         options is selected, you want clicking Enter to instead add the tag to the textarea.  I couldn't find a way 
         to interrupt the current behavior if the autocomplete menu was open, so instead I override the textarea's 
         class and put it back later (on mousedown of the Cancel/Save buttons).  
      */
      if(evt.keyCode === $j.ui.keyCode.ENTER) {
        $j(this).removeClass("workpagetageditbox").addClass("workpagetageditbox-autocomplete");
      }
      tagAutoComplete($j(this),evt);
  });
    
  function tagAutoComplete(selector,evt) {
    selector.autocomplete({
      // Make minLength variable, since low values create performance havoc with large tag sets
      minLength: minlength,
      source: function( request, response ) {
        // Hack to base matches on word boundary, beginning of string, or after space (instead of anywhere in word) 
        // from djs at http://stackoverflow.com/a/11569276/752122 
        // and Miroslav Popovic at http://blog.miroslavpopovic.com/jqueryui-autocomplete-filter-words-starting-with-term
        var matcher = new RegExp("(^|\\b|\\s)" + $j.ui.autocomplete.escapeRegex( extractLast( request.term ) ), "i");
        var data = $j.grep(tags, function (value) {
          return matcher.test(value.tag);
        });
        response(data);
      },
      focus: function() {
        // prevent value inserted on focus
        return false;
      },
      select: function( evt, ui ) {
        var terms = split( this.value );
        // remove the current input
        terms.pop();
        // add the selected item
        terms.push( ui.item.tag );
        // add placeholder to get the comma-and-space at the end
        terms.push( "" ); // Comment this line if you don't want ", " tacked on automatically
        this.value = terms.join( ", " );
        // If you're using tab to select on of the items, don't move out of the form
        // Thanks to Tomm at http://stackoverflow.com/a/6893369/752122 for clueing me in when other attempts didn't work.
        if (evt.keyCode === $j.ui.keyCode.TAB) {
          evt.preventDefault();
        }
        return false;
      },
      search: function() {
        // Make sure minLength is used for each comma-delimited value (not just first one). 
        // This "search:" snippet by Christian Varga at http://stackoverflow.com/a/10068115/752122
        var term = extractLast( this.value );
        if ( term.length < minlength ) {
          return false;
        }
        // If a change in the term prevents the menu's mouseleave from getting triggered, go ahead and do that
        autoMenu = $j(this).data("uiAutocomplete").menu.element;
        if (autoMenu.not(":hover")) {
          autoMenu.mouseleave();
        }
      },
      // Add a toggle for changing the order the suggestions are displayed in
      open: function() {
        var msg, footer = '<li class="gm-autocomplete-sort" ';
        if (sortOrder == "alpha") {
          msg = 'title="Currently sorting the suggestions alphabetically">Sort by <span title="Switch to ordering the suggestions by how often you\'ve used that tag" class="gm-autocomplete-sort-unselected">frequency</span> <span>alpha</span>';
        } else {
          msg = 'title="Currently sorting the suggestions by how often you\'ve used that tag">Sort by <span>frequency</span> <span title="Switch to ordering the suggestions alphabetically" class="gm-autocomplete-sort-unselected">alpha</span>';
        }
        footer = footer + msg + "</li>";
        $j(this).data("uiAutocomplete").menu.element.append(footer);
        // There's gotta be a better way, but I need a hook for the order switcher
        $j(this).addClass("gm-autocomplete-current-input");
      }, 
      // Remove hook added in "open:"
      close: function() {
        $j(this).removeClass("gm-autocomplete-current-input") 
      },
    })
    .data( "uiAutocomplete" )._renderItem = function( ul, item ) {
      return $j( "<li>" )
        .append( "<a>" + item.tag + ' <span style="opacity: .6">(' + item.quantity + ")</span></a>")
        .appendTo( ul );
    };
  }
  function split( val ) {
    return val.split( /,\s*/ );
  }
  function extractLast( term ) {
    return split( term ).pop();
  }

  // Put the normal class back on the .workpagetageditbox textarea so that Save will work again.
  $j("#quickEditTagControls").on("mousedown","span[onclick]", function(e) {
    $j(".workpagetageditbox-autocomplete").addClass("workpagetageditbox").removeClass("workpagetageditbox-autocomplete");
  });
  
  // Remove the menu in case it sticks around when saving the field via Enter.
  $j('td[ondblclick="LT_editData(event,\'lt-tag\');"]').on("keypress","textarea", function(evt){
    if(evt.keyCode === $j.ui.keyCode.ENTER) {
      $j(".ui-autocomplete").hide();
    }
  });
  
  // When the user changes the sort order, make the switch immediately, remember their choice, and prevent the toggle from disappearing
  $j("body").on("click", ".gm-autocomplete-sort-unselected", function(evt) {
    // Set these as variables first because they seem to get lost later post-manipulation
    var sortChoice = $j(this);
    var menu = sortChoice.closest(".ui-autocomplete");
    // Set the sortOrder variable to their new choice
    sortOrder = sortChoice.text();
    // Store the preference in localStorage so that it sticks
    localStorage.LTautocompleteSort = sortOrder;
    // Use the tags array that goes with their new choice
    tags = sortOrder == "alpha" ? tagsAlpha : tagsFreq;
    // Switch classes so that the "checkboxes" are updated to reflect their choice
    sortChoice.removeClass("gm-autocomplete-sort-unselected").siblings().addClass("gm-autocomplete-sort-unselected");
    // Trigger a search so that the new order displays right away (double .autocomplete to prevent some error ... don't really understand)
    $j(".gm-autocomplete-current-input").autocomplete().autocomplete("search");
    // The above search might have triggered a mouseout, making the sort toggle disappear, so bring it back
    menu.mouseenter();
  });
  
  // I was trying to leave this to just :hover, but I needed a different way to trigger the order switcher back 
  // on after it gets changed, and my attempts in .gm-autocomplete-sort-unselected's click() didn't work
  $j("body").on({
    mouseenter: function () {
      $j(this).addClass("gm-autocomplete-hovered");
    },
    mouseleave: function () {
      $j(this).removeClass("gm-autocomplete-hovered");
    }
  }, ".ui-autocomplete"); 
  
}
