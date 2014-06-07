// Copyright 2007, Paul Komarek
//
// OVERVIEW:
//
// Version: 1.12
//
// When you visit any page related to a specific Google Custom Search
// Engine, this script displays a small, gray status bar in the
// lower-right corner of your browser.  For example, try searching for
// [quinoa] at the Food and Agriculture Organization of the United Nations.
// The result page, linked below, will trigger the status bar:
//
//   http://www.fao.org/google_result_en.htm?cx=018170620143701104933%3Aqq82jsfba7w&q=quinoa&x=0&y=0&cof=FORID%3A9#987
//
// This status bar includes this information:
//
// * The search engine's title, which links to the search engine's
//   Google-hosted homepage.
// * A search blank -- hit enter to search, there is no button.
// * A "gadget" link: when clicked, you are asked if you would like
//   to add the corresponding Custom Search Gadget to your Google
//   Personalized Homepage ( http://google.com/ig ).
//
// If you appear to own the search engine, you will also see
//
// * The search engine's statistics in a compact format, linking to
//   the engine's statistics page.  Format is (day/week/month/overall).
// * A link to the search engine's control panel, context, and your
//   annotations.
// * The search engine's unique id.  This is purposely not a hyperlink
//   (e.g. to the control panel), to enable easy cut-and-paste of the
//   unique id.  For example, in a typical unix-ish system you can
//   double click on the unique id, and it will be automatically copied
//   into the windowing system's clipboard.
//
// OTHER DETAILS:
//
// The title and search box are fetched from the publicly-accessible
// Customn Search Gadget specification.  Until the xmlhttp request for
// the gadget spec succeeds, you'll see a "Homepage" link instead of
// the title, and no searchbox.  The statistics are fetched via
// xmlhttp from the search engine's control panel.  Until that fetch
// succeeds, the owner-information (listed above) won't be displayed.
// Both of these xmlhttp fetches are asynchronous, and hence you might
// notice the corresponding user-interface elements changing after a
// second or two (after the fetch is completed).
//
// If the gadget spec is fetched successfully, it is fairly likely it
// will be parsed correctly.  The stats information is parsed with a
// regex, which I consider more fragile because it doesn't come from
// structured data.
//
// This script is pre-configured to trigger on all pages with "cx=" in
// the URL.  A second filter checks for the more complicated pattern
// ...?...cx=...:...
//
//
// ==UserScript==
// @name          Google Custom Search Engine Quicklinks
// @namespace     http://komarix.org
// @description   Provides quicklinks and some summary info for a Google Custom Search Engine.
// @include       *cx=*
// ==/UserScript==

// Check whether href (probably) belongs to a CSE.
function isGoogleCustomSearchEngine(href) {
  // To be a Google Custom Search Engine, the href should be something
  // like [proto://]a.b[.c[.d...]]/...?[...]cx=<number>[:|%3A]<string>.
  // This function is a little bit long, but simple.  It exits as soon as
  // it can, for efficiency on most urls.
  var dotPos = href.indexOf(".", 0);
  if (dotPos < 0) return false;

  var sepPos = href.indexOf("/", dotPos+1);
  if (sepPos < 0) return false;

  var queryPos = href.indexOf("?", sepPos+1);
  if (queryPos < 0) return false;

  var cxPos = href.indexOf("cx=", queryPos+1);
  if (cxPos < 0) return false;

  // We want to find ":" or "%3A".
  var colonPos = href.indexOf(":", cxPos+3);
  if (colonPos < 0) {
    colonPos = href.indexOf("%3A", cxPos+3);
    if (colonPos < 0) return false;
  }

  var endPos = href.indexOf("&", colonPos+1);
  if (endPos < 0) endPos = href.length;

  var gid_string = href.substring(cxPos+3, colonPos-1);
  var gid_val = parseInt(gid_string, 16);
  if (gid_val == NaN) return false;

  var cseid = href.substring(colonPos+1);
  if (cseid == "") return false;

  return true;
}

// Note: we only bother defining our functions and variables if we are
// visiting a Google Custom Search Engine.
if (isGoogleCustomSearchEngine(window.location.href)) {
    function makeAnchor(anchorNode, href) {
        // Utility fucntion to convert a DOM node into a hyperlink.
        var a = document.createElement("a");
        a.appendChild(anchorNode);
        a.href = href;
        a.style.color = "blue";
        return a;
    }

    function makeTextAnchor(text, href) {
        // Utility function to convert text into a hyperlink.
        return makeAnchor(document.createTextNode(text), href);
    }

    // Parse url for search engine identifier.
    function getCx(href) {
      var start_pos = href.indexOf("cx=", 0);
      var stop_pos = href.indexOf("&", start_pos+3);
      if (stop_pos < 0) stop_pos = href.length;
      var cx = href.substring(start_pos+3, stop_pos);
      return cx;
    }

    function splitCx(cx) {
        // Convert Custom Search Engine unique id,
        // e.g. 005239880967462049052%3Awkrcafutrc0, into
        // 005239880967462049052 and wkrcafutrc0.
        var ucx = unescape(cx);
        var pos = ucx.indexOf(':');
        var gid = ucx.substring(0, pos);
        var cseid = ucx.substring(pos+1);
        return [gid, cseid];
    }

    function parseGadgetXml(gadgetXml) {
        // Parses search engine title and search-box form from Custom
        // Search Gadget specification.
        var cseTitle = "";
        var gadgetForm = "";

        var parser = new DOMParser();
        var dom = parser.parseFromString(gadgetXml, "application/xml");

        var prefs = dom.getElementsByTagName('ModulePrefs')[0];
        cseTitle = prefs.getAttribute('title');

        var content = dom.getElementsByTagName('Content')[0];
        var cdata = content.childNodes[1].data;
        var gadgetDom = parser.parseFromString(cdata, "application/xml");
        var gadgetFormElement = gadgetDom.getElementsByTagName("form")[0];

        // Remove button from form.
        for (var idx=0; idx < gadgetFormElement.childNodes.length; ++idx) {
            var c = gadgetFormElement.childNodes[idx];
            if (c.nodeName == "input" && 'submit' == c.getAttribute('type')) {
                gadgetFormElement.removeChild(c);
                break;
            }
        }

        // Make form inline.
        gadgetFormElement.setAttribute("style", "display: inline;");

        var serializer = new XMLSerializer();
        gadgetForm = serializer.serializeToString(gadgetFormElement);

        return [cseTitle, gadgetForm];
    }

    function addSearchBlankUsingGadgetFetch(responseDetails) {
        // This is the callback from the xmlhttp fetch of the Custom
        // Search Gadget specification.  After a successful fetch, it
        // will add the search engine title and a search box to the
        // left side of the status bar.
        var status = responseDetails['status'];
        if (200 == status) {
            var gadgetXml = responseDetails['responseText'];
            var parts = parseGadgetXml(gadgetXml);
            cseTitle = parts[0];
            gadgetForm = parts[1];

            // Add search engine title, linking to the search engine homepage.
            var cx = getCx(window.location.href);
            homepageNode.textContent = cseTitle;

            // Add search-box form.
            var searchForm = document.createElement("span");
            searchForm.innerHTML = gadgetForm;
            everyoneSpan.insertBefore(searchForm, homepageNode.parentNode.nextSibling);
        }
    }

    function addStatsCallbackFactory(timespan) {
        // Create the callback function for xmlhttp fetches of the
        // day, week, month, and overall stats from the search
        // engine's control panels.  We are exploiting javascript
        // closures to avoid writing four nearly-identical callbacks.
        var callback = function(responseDetails) {
            if (!statsNodes[timespan]) return;

            var status = responseDetails['status'];
            if (200 == status) {
                var statsHtml = responseDetails['responseText'];
                var statsRegex = /\(total queries: (\S+)\)/;
                var regexResult = statsRegex.exec(statsHtml, "g");
                if (regexResult) {
                    var totalQueries = regexResult[1];
                    statsNodes[timespan].innerHTML = totalQueries;
                }

                // If we get stats, we assume we are the owner of this
                // Custom Search Engine, and enable the ownerSpan.
                ownerSpan.style.display = "inline";
            }
        }

        return callback;
    }

    function fetchPage(url, accept, callbackFn) {
        // Utility function to make xmlhttp request, in the
        // Greasemonkey style.
        GM_xmlhttpRequest({method: 'GET',
                                       url: url,
                                       headers: { 'Accept': accept },
                                       onload: callbackFn
                                                   });
    }

    function makeControlDiv() {
        // Utility function to create outer-most container for the
        // status bar.
        var div = document.createElement("div");
        div.style.background = "lightgray";
        div.style.position = "fixed";
        div.style.bottom = 0;
        div.style.right = 0;
        div.style.fontSize = "12px";
        div.style.color = "black";
        div.style.fontFamily = "courier";
        div.style.padding = "4px 10px 4px 4px";
        return div;
    }

    function makeStatsSummary(parent) {
        // Add search engine statistics, wrapped in an anchor pointing to
        // the stats page.
        statsSpan = document.createElement("span");
        statsSpan.style.display = "inline";

        statsSpan.appendChild(document.createTextNode("("));
        statsSpan.appendChild(statsNodes["day"]);
        statsSpan.appendChild(document.createTextNode("/"));
        statsSpan.appendChild(statsNodes["week"]);
        statsSpan.appendChild(document.createTextNode("/"));
        statsSpan.appendChild(statsNodes["month"]);
        statsSpan.appendChild(document.createTextNode("/"));
        statsSpan.appendChild(statsNodes["overall"]);
        statsSpan.appendChild(document.createTextNode(")"));

        return statsSpan;
    }



    //////////////////////////////////
    // MAIN
    ///////////////

    // Variables for the status bar container.
    var cx = getCx(window.location.href);
    var controlDiv = makeControlDiv();

    var everyoneSpan = document.createElement("span");
    controlDiv.appendChild(everyoneSpan);

    var ownerSpan = document.createElement("span");
    ownerSpan.style.display = "none";
    controlDiv.appendChild(ownerSpan);

    // Variable for the text node that links to the homepage.
    var homepageNode = document.createTextNode("Homepage");

    // Variables for the statistics info and its html elements.
    var statsNodes = {
        "day": document.createElement("span"),
        "week": document.createElement("span"),
        "month": document.createElement("span"),
        "overall": document.createElement("span")
    };
    statsNodes["day"].innerHTML = "0";
    statsNodes["week"].innerHTML = "0";
    statsNodes["month"].innerHTML = "0";
    statsNodes["overall"].innerHTML = "0";

    // -------------------------------------------------------------
    // The next few user interface elements are
    // useful whether or not we own the Google Custom Search Engine
    // or have a Google login cookie.

    // Start asynchronous xmlhttp fetch for gadget xml specification.
    // If successful, add the CSE title and search blank.
    var parts = splitCx(cx);
    gid = parts[0];
    cseid = parts[1];

    var homepageUrl = "http://www.google.com/coop/cse?cx=" + cx;
    everyoneSpan.appendChild(makeAnchor(homepageNode, homepageUrl));
    everyoneSpan.appendChild(document.createTextNode(" "));

    var gadgetUrl = "http://www.google.com/coop/api/" + gid
        + "/cse/" + cseid + "/gadget";
    fetchPage(gadgetUrl, "application/xml", addSearchBlankUsingGadgetFetch);

    // Add "add gadget to Google Personalized Homepage" link.
    var addGadgetUrl = "http://fusion.google.com/add?moduleurl=" 
        + escape(gadgetUrl);
    everyoneSpan.appendChild(makeTextAnchor("Add Gadget", addGadgetUrl));
    everyoneSpan.appendChild(document.createTextNode(" "));

    // -------------------------------------------------------------
    // The stuff below here is useless unless we own the
    // Google Custom Search engine and have a Google login cookie.
    // It will be hidden until a stats fetch (see below) succeeds.

    // Add search engine statistics, wrapped in an anchor pointing to
    // the stats page.
    var statsSpan = makeStatsSummary(ownerSpan);
    var statsUrl = "http://www.google.com/coop/manage/cse/stats?cx=" + cx;
    ownerSpan.appendChild(makeAnchor(statsSpan, statsUrl));
    ownerSpan.appendChild(document.createTextNode(" "));

    // Get stats html.  When successful, the stats nodes (e.g. day_node)
    // will be updated.
    fetchPage(statsUrl + "&view=day", "text/html",
              addStatsCallbackFactory("day"));
    fetchPage(statsUrl + "&view=week", "text/html",
              addStatsCallbackFactory("week"));
    fetchPage(statsUrl + "&view=month", "text/html",
              addStatsCallbackFactory("month"));
    fetchPage(statsUrl + "&view=overall", "text/html",
              addStatsCallbackFactory("overall"));

    // Add link to the search engine's control panel, context, and
    // annotations
    var panelUrl = "http://www.google.com/coop/manage/cse?cx=" + cx;
    ownerSpan.appendChild(makeTextAnchor("panel", panelUrl));
    ownerSpan.appendChild(document.createTextNode(" "));

    var contextUrl = "http://www.google.com/coop/api/" + gid + "/cse/" + cseid;
    ownerSpan.appendChild(makeTextAnchor("context", contextUrl));
    ownerSpan.appendChild(document.createTextNode(" "));

    var annoUrl = "http://www.google.com/coop/api/" + gid + "/annotations/";
    ownerSpan.appendChild(makeTextAnchor("annotations", annoUrl));
    ownerSpan.appendChild(document.createTextNode(" "));

    ownerSpan.appendChild(document.createTextNode(" "));
    ownerSpan.appendChild(document.createTextNode(unescape(cx), panelUrl));

    // Now that we've finished most of our work, add the status bar
    // (aka control div) to document.  The xmlhttp fetches might still
    // be in progress.
    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(controlDiv);
}
