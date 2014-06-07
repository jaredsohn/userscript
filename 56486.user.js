// ==UserScript==
// @name citeUlike
// @namespace http://www.citeulike.org/
// @description Enhancement scripts for citeUlike
// @include http://www.citeulike.org/*
// @match http://www.citeulike.org/*
// @version  201102051022
// ==/UserScript==
// Helper scripts for citeUlike
/*jslint browser: true, forin: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, newcap: true, immed: true */
/*global window, jQuery,clexpand,jkmegamenu,toggle_article_details */

//  initialisation function (runs automatically on loading)

function aps_main(evt) {

var
                                       //====================================
                                       //====================================
                                       // HERE ARE SOME VALUES YOU CAN CHANGE:

                                       // you can set each one to true or false:

    removeAdverts = true,              // TRUE means that adverts are suppressed
    showTagsOnPostScreen = true,       // TRUE means tags are displayed by default when posting a new item
    showAbstractOnPostScreen = true,   // TRUE means the abstract is displayed by default when posting a new item
    showMoreMenu = true,               // TRUE means that five commonly-used menu items are added to the top menu bar
    removeRedundantMyCopyLinks = true, // TRUE means that redundant "my copy" links will be removed from display
    showDetailsInLibrary = true,       // TRUE means that items will be shown with all detail in "My Library"
    identifyPapersByCULmembers = true, // TRUE means that you can filter lists of papers to show only those authored by CUL members

                                       // AND THAT'S THE END OF THE BITS YOU CAN CHANGE
                                       //====================================
                                       //====================================


//------------------------------------------------------------------
//   DO NOT MESS WITH ANYTHING BELOW HERE !
//

    spacer,              // the element used to space elements out on the main menu bar
    myUsername,          // the user's CiteULike username
    url,                 // the URL of the current page
    $= window.jQuery;    // the jQuery element


function apslog(txt) {
  //return console.log(txt);
}

// utility routine to insert [My Copy] links into Citegeist lists

function insertMyCopyIntoCitegeist() {
  var thisLink = "";

  $("#citegeist-content").find("a.othrusr[href=/user/" +  myUsername + "]").
    closest("td").
    find("a.title").
      each( function getHref(){ thisLink = this.href; } ).
      end().
    find("a:contains('[My Copy]')").
      show().
      attr("href", "/user/" + myUsername + thisLink.replace(/^.*(\/article)/, "$1"));
}



// utility routine to move a CUL member tag outside the "other" into the visible section


function movePublicantsToVisiblePlace(){
  var dagger = $(this).next("span");
  $(this.parentNode).
    before(this).
    before(dagger).
    before(" ");
}


// utility routine to suggest new connections, based on papers in a user's library
// authored by CUL members


function suggestConnections(e) {

  apslog("entering suggestConnections now");
  
  var pageNum = 0,
      papersTable = $("<table>"),
      connectionsDiv = $("<div>").
                        css({ textAlign: "center"} ).
                        append(
                          $("<img>").attr({
                            src: "http://static.citeulike.org/img/ajax-loader-white.gif",
                            alt: "loading..."
                            })
                        ).
                        append(papersTable.hide());

  function getOnePageOfLibrary(ajaxResponse) {

    var culAuthors, authorTable;

    $("a.publicant", ajaxResponse).
      filter(function() { return $(this).text() === myUsername; }).
        removeClass("publicant").
        end().
      closest("td").
        filter(":has(a.publicant)").
          appendTo($("<tr>").appendTo(papersTable)).
          find(".andOthers a.publicant").each(movePublicantsToVisiblePlace);

    if (!pageNum || $("a:contains(Next)",ajaxResponse).length) {
      // go get another library page
      $.get("/user/" + myUsername + "/page/" + (++pageNum), getOnePageOfLibrary, "html");
      return;

    }

    // now we have got all of the library pages

    // remove the "waiting" icon
    connectionsDiv.find("img:first").remove();

    culAuthors = $($.unique($("a.publicant",papersTable)));

    // if we've got no CUL members who've claimed any of our library papers, quit now

    if (!culAuthors.length) {
      connectionsDiv.
        empty().
        text("There are not yet any papers in your library that have been identified by CiteULike members as authored by them");
      return;
    }

    // now make a pretty list of the CUL members, and offer [connect] and [watch] buttons for each one

    authorTable = $("<table>").prependTo(connectionsDiv);

    culAuthors.each(function addAuthors() {

        var linkname,
            that = $(this),
            thisuser = that.text(),

            newrow = $("<tr>").appendTo(authorTable).append(
                      $("<td>").append(that.clone())
                    ),

            links = {
              Watch:  "/watch?username=" + thisuser,
              Profile: "/profile/" + thisuser,
              Connect: "/connections/" + myUsername + "/ask/" + thisuser + "/profile/",
              Papers: "/profile/" + thisuser + "/publications"
              };

          for (linkname in links) {
            newrow.append( $("<td>").append(
              $("<a>").
                addClass("actionbutton").
                text("[" + linkname + "]").
                attr("href", links[linkname])
              ));
          }

      });

    // and finally, display the switch to toggle display of papers in our library by CUL authors

    $("<h3>").
      insertBefore(papersTable).
      append(
        $("<a>").
          text("Click here to show/hide papers by CiteULike members in your library").
          attr("href", "#").
          click(function() { papersTable.toggle(); return false; })
      );

  }

  $(e.target).replaceWith(connectionsDiv);

  // now retrieve all pages of the library, one by one.
  getOnePageOfLibrary(false);

  // strip out all of the rows
  return false;
}



// create a box on the profile page, with a link to enable users to automatically
// scan their library for papers by CUL members

function createSuggestionsBox() {

  $("h2:contains(Research Fields)").closest("div").
    css({ width: "350px", display: "inline-block" }). // TODO why not get window width and manually calculate location and width?
    after(
      $("<div>").
        css({
          display: "inline-block",
          verticalAlign: "top",
          margin: "20px",
          width: "300px",
          border: "1px solid #CCCCCC",
          padding:"10px" } ).
        append( $("<h2>").text("Suggested connections") ).
        append(
          $("<a>").
            attr("href", "#").
            click(suggestConnections).
            text("Click here to find suggested connections, from those CiteULike members who have authored papers in my library")
          )
      );

  return false;
}



// utility routine to toggle between all papers, and papers just by CUL members


function showCULpapers(e) {

  var that = $(e.target),
      showJustCULpapers = !that.data("showJustCULpapers"),
      rowsToTweak = $("tr:has(td.list_item)", that.data("withinDom"));

  that.data("showJustCULpapers", showJustCULpapers);

  if (showJustCULpapers) {

    rowsToTweak.
      not(":has(a.publicant)").hide().end().
      find(".andOthers a.publicant").each(movePublicantsToVisiblePlace);
    that.
      data("filterText",that.text()).
      text("Show all papers");

  } else {

    rowsToTweak.filter(":hidden").show();
    that.text(that.data("filterText"));

  }

  return false;
}



// utility routine to create the link on the page, to allow user to filter a
// list of papers to show only those papers authored by CUL members


function showCULAuthors() {

  // scan a DOM element to look for papers that have been claimed by CUL members as their own.
  // These authors are tagged by CUL with the "publicant" class, so we can search
  // for xPath a.publicant, as the author names are links.

  var byCULmembers = $("tr:has(a.publicant)", this);

  if (!byCULmembers.length) { return ; }

  // there are some articles on this page by CUL members
  // add text just before table, to flag this up

  $("<div>").insertBefore(byCULmembers.eq(0).closest("table")).append(
    $("<a>").
      attr({ href:"#" }).
      text("Reveal the " + byCULmembers.length +
            " of these papers authored by CiteULike members").
      data("showJustCULpapers",false).
      data("withinDom", "#" + this.id).
      click(showCULpapers)
  );

}



// utility routine to wait for elements on the portal page to be ajax-loaded,
// before scanning them for papers authored by CUL members


function waitForTable(id) {

  var that = $("#" + id),
      count = that.data("waitCounter") || 0;

  if (that.find("table:first").length) {
    //unsafeWindow.console.log("loaded portlet " + id);
    that.trigger("gotPortlet");
    that.unbind("gotPortlet");
  } else if (count++ < 4) {
    that.data("waitCounter", count);
    setTimeout(function() { waitForTable(id); }, 2000);
  }

}



// utility routine to add a menu item to the top menu bar


function addMenuItem(newItem) {
  spacer.
    before(
      $("<td></td>").addClass("item").append(newItem.addClass("plain"))
    ).
    before( spacer.clone() );
}


//------------------------------------------------------------------


function doStuff() { // things we run when the page is ready

  var i, oneOfMyPages,
      myMenu = $("#my-citeulike a"),     // the main menu bar
      pageanchor = window.location.href.replace(/^.*\#([^\/]*)*$/, "$1"),
      otherMenu = $("#other-cul-menu");  // the citeULike menu relating to another user, if present (for example, when viewing someone else's library)

  url = window.location.href.replace(/\#[^\/]*$/, "");
  spacer = $("table.menu tr:first td.filler").prev();
  myUsername = $("a[href*=/user/]:first").text();

  // clone the first five links (except portal) from the "My CiteUlike" menu, onto the main menu toolbar

  if (showMoreMenu) {
    spacer.before( spacer.clone() );
    for (i = 1; i < 6; i++ ) {
      addMenuItem(myMenu.eq(i).clone());
    }
  }


  // make the "citeUlike" and "myCiteULike" buttons into links, to portal and profile respectively
  // also, when "Person X's CiteULike" button is shown, make that into a link to their profile

  $("#cul-menu").wrapInner( $("<a>").attr("href", "/").addClass("plain") );
  $("#my-cul-menu").wrapInner( $("<a>").attr("href", "/profile/" + myUsername).addClass("plain") );
  otherMenu.wrapInner(
    $("<a>").
      attr("href", "/profile/" + otherMenu.find("span.cultxt").text().replace("'s CiteULike", "")).
      addClass("plain") );


  // assign the accesskey "t" to the trigger to show/hide tags

  $("#yt-arrow").parents("a").attr({ accesskey: "t" });


  // remove redundant "my copy" label

  if ( removeRedundantMyCopyLinks ) {
    oneOfMyPages = new RegExp("/user/" + myUsername + "|" + "/search/.*username." + myUsername);
    if (oneOfMyPages.test(url) ) { $("a[id*=mycopy_]").remove(); }
  }


  // hide details in library

  if ( !showDetailsInLibrary && $.isFunction(toggle_article_details) ) {
      toggle_article_details(false);
  }



  // we only do toggling of tags and abstract if we are on a 'post' or 'copy' page

  if ((url.indexOf('/post') > -1 || url.indexOf('/copy') > -1 ) && clexpand &&
      !( url.indexOf('/post_url.adp') > -1 || url.indexOf('/post_unknown.adp') > -1 ) ) {

    // tags are shown by default, so toggle them to hidden, if required
    if (!showTagsOnPostScreen) { clexpand("yt"); }

    // abstract is hidden by default, so toggle it to shown, if required
    if (showAbstractOnPostScreen) { clexpand("abstract"); }

  }


  // search for papers by CUL members, unless the URL includes "/publications"
  // (we suppress those latter cases, because we know we're already looking at a CUL member's papers)

  if (identifyPapersByCULmembers && !url.match("/publications")) {
    if (
        // the following are boxes loaded after a delay, on the portal page, so we'll put a delay in before testing them
        !$("#portlet-watchlist,#portlet-citegeist,#portlet-library,#portlet-activity,#portlet-recs").
          bind("gotPortlet", showCULAuthors).
          length
        ) {
      $("#list_table,#citegeist-content,#recs_list_table").each(showCULAuthors);
    }

  }


  // add a button to the user's own profile page to scan entire library for
  // papers by CUL users, to suggest as connections


  if (url.match(new RegExp("/profile/" + myUsername + "$"))) {
    createSuggestionsBox();
  }


  //  identify documents in CiteGeist that are already in my library

  if (url.match("/citegeist")) {
    insertMyCopyIntoCitegeist();
  } else {
    $("#portlet-citegeist-content").bind("gotPortlet", insertMyCopyIntoCitegeist);
  }


  // set up triggers on portlets so they each fire custom event "gotPortlet" when they load

  $("[id^=portlet-]").each(function() { waitForTable(this.id); });


  // remove adverts

  if (removeAdverts) {
    $("#topright").prevAll("div").andSelf().hide();
    $(".campaigns,.logo,#navleft").hide();
    $(".contentonly,.leftindent,.contentmain").css({ marginLeft : 0 });
    $("td.item").css({ padding: "0 3px" });


    //if browser is Google Chrome, we need to manually force the relocation of the megamenus. Nasty but effective
    
    if ($.browser.safari) {
      for (i=0; i<jkmegamenu.megamenus.length; i++){
        var megamenu = jkmegamenu.megamenus[i];
        megamenu.offsetx = megamenu.$anchorobj.offset().left;
        megamenu.offsety = megamenu.$anchorobj.offset().top;
      }
    }
    
    $(window).triggerHandler("resize");
    
  }

  // and finally make sure that we are displaying the place we should be

  setTimeout(function() {
      document.getElementById(pageanchor).scrollIntoView();
    }, 300);

}

$(document).ready(doStuff);

}

// Google Chrome makes us jump through a couple of hoops to get a Greasemonkey
// script to execute at the right time with the right privileges.
// This is as close as I can get, though for some reason it doesn't always work
// in Chrome (either it's triggering at the wrong time, or not at all - I'm not sure which)

var script = document.createElement("script");
script.type = "application/javascript";
script.textContent = aps_main;
document.body.appendChild(script);
window.addEventListener("load", function() {
  location.href = "javascript:void(aps_main());";
}, false);
