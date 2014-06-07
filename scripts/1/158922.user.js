(function () {
// ==UserScript==
// @name          uso - Searchin'
// @namespace     http://userscripts.org/users/37004
// @description   Enhances and moves the search box into the mainmenu
// @copyright     2011+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version       0.1.23.1esr1
// @icon          https://s3.amazonaws.com/uso_ss/icon/158922/large.png

// @include  /^https?://userscripts\.org(?::\d{1,5})?/?/

// @include  http://userscripts.org/*

// @include  https://userscripts.org/*

// @require  https://raw.github.com/Martii/GM_config/42d6367b3c8ccc1b8f32af7b23fce5078716ff14/gm_config.js
// @require  http://userscripts.org:8080/scripts/source/115323.user.js

// @resource  more https://s3.amazonaws.com/uso_ss/24276/large.gif
// @resource  uso https://s3.amazonaws.com/uso_ss/24277/large.png
// @resource  cse https://s3.amazonaws.com/uso_ss/24338/large.png
// @resource  gmc https://s3.amazonaws.com/uso_ss/24274/large.png

// @grant  GM_deleteValue
// @grant  GM_getResourceURL
// @grant  GM_getValue
// @grant  GM_log
// @grant  GM_setValue

// ==/UserScript==

  if (!document || !document.body || location.hash == "#posts-last")
    return;

  let protocol = "http" + (/^https:$/i.test(location.protocol) ? "s" : "") + ":";
  let port = /^80$/.test(location.port) ? "" : ":8080";

  if (typeof GM_configStruct != "undefined") {
    // Reclaim some memory
    delete GM_config;

    function insertHook() {
      let hookNode = document.getElementById("full_description");

      if (hookNode && !hookNode.firstChild)
        return hookNode.appendChild(document.createElement("div"));
      else
        return (hookNode)
            ? hookNode.insertBefore(document.createElement("div"), hookNode.firstChild)
            : document.body.appendChild(document.createElement("div"));
    }

    /* Common */
    let divNode = insertHook();

    let gmcHome = new GM_configStruct();
    gmcHome.id = "gmc158922home";

    gmcHome.init(
        divNode,
        ([
            '<img alt="searchIn" title="uso - searchIn" src="' + protocol + '//s3.amazonaws.com/uso_ss/icon/158922/large.png" />',
            '<p>Preferences</p>',
            '<span>',
              '<a href="' + protocol + '//github.com/sizzlemctwizzle/GM_config/wiki">',
                '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
              '</a>',
            '</span>'

         ]).join(""),

        /* Custom CSS */
        GM_setStyle({
            node: null,
            data:
              [
                "@media screen, projection {",
                      "#gmc158922home { position: static !important; z-index: 0 !important; width: auto !important; height: auto !important; max-height: none !important; max-width: none !important; margin: 0 0 0.5em 0 !important; border: 1px solid #ddd !important; clear: right !important; }",

                      "#gmc158922home_header a { display: inline; }",
                      "#gmc158922home_header img { vertical-align: middle; }",
                      "#gmc158922home_header > img { height: 32px; margin-right: 0.25em; width: 32px; }",
                      "#gmc158922home_header > p { display: inline; margin: 0; vertical-align: middle; }",
                      "#gmc158922home_header span { float: right; }",
                      "#gmc158922home_header span > a { display: inline; margin-left: 0.25em; }",
                      "#gmc158922home_wrapper { background-color: #eee; padding-bottom: 0.25em; }",
                      "#gmc158922home .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                      "#gmc158922home .config_var { clear: both; margin: 0.5em; padding: 0; }",
                      "#gmc158922home .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: 0.125em; }",
                      "#gmc158922home .section_desc { margin: 0.25em 1.5em !important; }",

                          ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                          ".gmc158922home-invisilink { text-decoration: none; color: #000; }",
                          ".gmc158922home-invisilink:hover { color: #000; }",

                      "#gmc158922home_buttons_holder { margin: 0.5em; }",
                      "#gmc158922home_saveBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                      "#gmc158922home_resetLink { margin-right: 1.5em; }",
                      "#gmc158922home_closeBtn { display: none; }",
                "}",

                "@media print {",
                   "#gmc158922home { display: none !important; }",
                "}"

              ].join("\n")
        }),

        /* Settings object */
        {
          'unstickSearchTab': {
              "type": 'checkbox',
              "label": 'Unstick the main menu search tab',
              "default": false
          }
        }
    );

    if (location.pathname.match(/\/scripts\/show\/158922\/?/i)) {
      gmcHome.open();
    }

    let gmc = new GM_configStruct();
    gmc.id = "gmc158922";

    gmc.init(
        document.body.insertBefore(document.createElement("div"), document.body.firstChild),
        ([
            '<a href="/scripts/show/158922" target="_top">',
              '<img alt="searchIn" title="uso - searchIn" src="' + protocol + '//s3.amazonaws.com/uso_ss/icon/158922/large.png" />',
            '</a>',
            '<p>Options</p>',
            '<span>',
              '<a href="' + protocol + '//github.com/sizzlemctwizzle/GM_config/wiki" target="_top">',
                '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
              '</a>',
            '</span>'

        ]).join(""),

        /* Custom CSS */
        GM_setStyle({
            node: null,
            data:
              [
                "@media screen, projection {",
                      "#gmc158922 { background-color: rgba(0, 0, 0, 0.66) !important; height: 100% !important; width: 100% !important; max-height: 100% !important; max-width: 100% !important; left: 0 !important; top: 0 !important; }",
                      "#gmc158922_wrapper { background-color: #eee; width: 30em; height: 40em; position: absolute; left: 50%; top: 50%; margin: -20em 0 0 -15em; border: 1px solid #ddd; }",

                      "#gmc158922_header a { display: inline; }",
                      "#gmc158922_header img { vertical-align: middle; }",
                      "#gmc158922_header > a img { height: 32px; margin-right: 0.25em; width: 32px; }",
                      "#gmc158922_header > p { display: inline; margin: 0; vertical-align: middle; }",
                      "#gmc158922_header span { float: right; }",
                      "#gmc158922_header span > a { display: inline; margin-left: 0.25em; }",
                      "#gmc158922 .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                      "#gmc158922 .config_var { clear: both; margin: 0.5em 1em; padding: 0; }",
                      "#gmc158922 .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: 0.125em; }",
                      "#gmc158922 .section_desc { margin: 0.25em 1.5em !important; }",

                      "#gmc158922 .section_header { margin: 0 1em; text-align: left; }",
                      "#gmc158922 .section_header img { margin: 0 0.25em; vertical-align: middle; }",

                          ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                          ".gmc158922-invisilink { text-decoration: none; color: #000; }",
                          ".gmc158922-invisilink:hover { color: #000; }",

                          "#gmc158922_field_searchInCSE { margin-left: 1em; }",
                          "#gmc158922_field_searchInCSE label { display: block; }",
                          "#gmc158922_field_searchInCSE span { position: relative; top: 0.125em; }",

                          "#gmc158922_field_lockInurl { margin-left: 1em; }",
                          "#gmc158922_field_lockInurl label { display: block; }",
                          "#gmc158922_field_lockInurl label:first-child { margin-bottom: 0; }",
                          "#gmc158922_field_lockInurl span { position: relative; top: 0.125em; }",

                          "#gmc158922_field_inurlLock { margin-left: 3em; width: 84%; }",

                      "#gmc158922_buttons_holder { margin: 0.5em; position: absolute; bottom: 0; right: 0; }",
                      "#gmc158922_saveBtn, #gmc158922_closeBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                      "#gmc158922_resetLink { margin-right: 1.5em; }",
                "}",

                "@media print {",
                   "#gmc158922 { display: none !important; }",
                "}"

              ].join("\n")
        }),

        /* Settings object */
        {
          'enableCSEfilter': {
              "section": ['<a href="http://www.google.com/cse/"><img src="' + GM_getResourceURL("cse") + '"></a> Google Custom Search Engine'],
              "label": 'Modify search results by applying a filter of: <p class="gmc-yellownote" style="margin: 0 0.5em;">NOTE: Only last known working query modifiers are shown</p>',
              "type": 'checkbox',
              "value": 'unchecked'
          },
          'searchInCSE': {
              "type": 'radio',
              "options": ['intitle:', 'inanchor:', 'intext:'],
              "default": 'intitle:'
          },
          'lockInurl': {
              "label": 'Search path generation for inurl:',
              "type": 'radio',
              "options": ['Contextual', 'Fixed'],
              "default": 'Contextual'
          },
          'inurlLock': {
              "type": "text",
              "default": "/scripts",
              "label": '<p class="gmc-yellownote" style="margin-left: 5em; ">Clear the path for everywhere and to enable the full dropdown quick list on second click</p>'
          }


        }
    );

    gmc.onOpen = function () {
      let saveBtn = document.getElementById("gmc158922_saveBtn");
      if (saveBtn)
        saveBtn.textContent = "Save \u0026 Close";

      let closeBtn = document.getElementById("gmc158922_closeBtn");
      if (closeBtn)
        closeBtn.textContent = "Cancel";

      let fixed = gmc.fields["inurlLock"].node;
      if (fixed) {
        fixed.setAttribute("list", "common-pathnames");
        fixed.setAttribute("autocomplete", "off"); // NOTE: documentation vague

        let datalistNode = document.createElement("datalist");
        datalistNode.id = "common-pathnames";
        datalistNode.classList.add("hid");

        let pathnames = {
          "Everywhere" : "",
          "Scripts" : "/scripts",
          "Source Codes" : "/scripts/review",
          "Users" : "/users",
          "Blogs" : "/articles",
          "Groups" : "/groups",
          "Guides" : "/guides",
          "Reviews" : "/scripts/reviews",
          "Forums/Discussions" : "/topics",
          "Tags" : "/tags"
        }

        for (let pathname in pathnames) {
          let optionNode = document.createElement("option");
          optionNode.value = pathnames[pathname];
          optionNode.textContent = pathname;

          datalistNode.appendChild(optionNode);
        }

        fixed.appendChild(datalistNode);
      }
    }

    gmc.onSave = function () {
      let
          section_search = document.getElementById("section_search"),
          cse_section_search = document.getElementById("cref_iframe_cse-search-box")
      ;

      if (gmc.get("lockInurl") == "Fixed" && !cse_section_search.classList.contains("hid"))
        section_search.classList.add("urllock");
      else
        section_search.classList.remove("urllock");

      gmc.close();
    }

    /*
      <form id="cref_iframe_cse-search-box" action="/search">
        <input type="hidden" value="http://userscripts.org/cse.xml" name="cref">
        <input type="hidden" value="FORID:9" name="cof">
        <input type="hidden" value="UTF-8" name="ie">
        <input type="text" size="31" name="q">
        <input type="submit" value="Search" name="sa">
      </form>

    */

    function parseQueryCSE(aValue) {

      if (!(/in.+?\:/.test(aValue))) {

        // ** Parse gmc for applicable filter
        let quo = false;
        if (gmc.get("enableCSEfilter"))
          aValue = aValue.trim().split(/[ ]+/).map(function (e) {
            e = e.trim();

            if (!quo) {
              if (/^["'].*/.test(e))
                quo = !quo;

              return (gmc.get("searchInCSE") + e);
            }
            else {
              if (quo && /["']$/.test(e))
                quo = !quo;

              return (e);
            }

          }).join(" ");

        // Check gmc for fixed
        if (gmc.get("lockInurl") == "Fixed") {
          if (gmc.get("inurlLock") != "")
            aValue += " inurl:" + gmc.get("inurlLock");
        }
        else {
          let pathname = location.pathname;

          if (! /^\/(?:groups|users)\/?/.test(pathname) )
            pathname = pathname.replace(/\/\d+(?:.*?)?\/?$/, ""); // Any other trailing beginning number strip it off

          // ** Homepage check
          if (/^\/$/.test(pathname)) {
            pathname = "/scripts";                                  // NOTE: Match USO default
          }

          // ** USO search page check
          if (/.+\/search\/?$/.test(pathname))
            pathname = pathname.replace(/\/search\/?$/, "");

          // ** Custom site search page check
          if (!(/^\/search\/?/.test(pathname)))
            aValue += " inurl:" + pathname;
          else {
            if (/^\/search\/?/.test(pathname)) {
              let inurl = location.search.match(/\+inurl\%3A\%2F(.+?)\&/);
              if (inurl)
                aValue += " inurl:/" + decodeURIComponent(inurl[1])
            }
          }
        }
      }

      return (aValue);
    }

    function onsubmitCSE(ev) {
        let xpr = document.evaluate(
          ".//input[@name='q']",
          ev.target,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        if (xpr && xpr.singleNodeValue) {
          let thisNode = xpr.singleNodeValue;

          if (thisNode.value == "") {
            ev.preventDefault();
            ev.stopPropagation();

            GM_deleteValue(":cse-last-query");
            location.assign("/search");
            return;
          }

          GM_setValue(":cse-last-query", thisNode.value);

          thisNode.value = parseQueryCSE(thisNode.value);
        }
        else
          console.error('FATAL ERROR: Search query NOT FOUND');
    }

    function onmouseoverCSE(ev) {
      ev.target.title = "Searchin' " + parseQueryCSE(ev.target.value).trim();
    }

    function createSearchCSE(aUrl) {

      let inputNodeSubmit = document.createElement("input");
      inputNodeSubmit.type = "submit";
      inputNodeSubmit.name = "sa";
      inputNodeSubmit.value = "";
      inputNodeSubmit.className = "go";

      let inputNodeQ = document.createElement("input");
      inputNodeQ.type = "text";
      inputNodeQ.title = "Search in ";
      inputNodeQ.setAttribute("placeholder", "in\u2026");
      inputNodeQ.name = "q";
      inputNodeQ.className = "input";
      inputNodeQ.value = GM_getValue(":cse-last-query", "");
      inputNodeQ.addEventListener("mouseover", onmouseoverCSE, false);

      let inputNodeIe = document.createElement("input");
      inputNodeIe.name = "ie";
      inputNodeIe.type = "hidden";
      inputNodeIe.value = "UTF-8";

      let inputNodeCof = document.createElement("input");
      inputNodeCof.name = "cof";
      inputNodeCof.type = "hidden";
      inputNodeCof.value = "FORID:9";

      let inputNodeCref = document.createElement("input");
      inputNodeCref.name = "cref";
      inputNodeCref.type = "hidden";
      inputNodeCref.value = protocol + "//userscripts.org" + port + "/cse.xml";

      let formNode = document.createElement("form");
      formNode.method = "get";
      formNode.action = "/search";
      formNode.id = "cref_iframe_cse-search-box";
      formNode.addEventListener("submit", onsubmitCSE, false);

      formNode.appendChild(inputNodeCref);
      formNode.appendChild(inputNodeCof);
      formNode.appendChild(inputNodeIe);
      formNode.appendChild(inputNodeQ);
      formNode.appendChild(inputNodeSubmit);

      return (formNode);
    }

    /*
      <div id="section_search">
        <form method="get" action="/scripts/search">
          <input type="text" title="Search" placeholder="Search scripts" name="q" class="input">
          <input type="submit" value="" name="submit" class="go">
        </form>
      </div>

    */

    function createSearchUSO(aUrl) {

      let inputNodeSubmit = document.createElement("input");
      inputNodeSubmit.type = "submit";
      inputNodeSubmit.name = "submit";
      inputNodeSubmit.value = "";
      inputNodeSubmit.className = "go";

      let inputNodeQ = document.createElement("input");
      inputNodeQ.type = "text";
      inputNodeQ.title = "Search";
      inputNodeQ.setAttribute("placeholder", "in\u2026");
      inputNodeQ.name = "q";
      inputNodeQ.className = "input";

      let formNode = document.createElement("form");
      formNode.method = "get";
      formNode.action = "/scripts/search";
      formNode.id = "uso-search-box";

      formNode.appendChild(inputNodeQ);
      formNode.appendChild(inputNodeSubmit);

      return (formNode);
    }


    // ** Start twiddling **
    let
      ubs = document.getElementById("userscripts_better_search"), // Detect ubs
      uac = false
    ;

    // Detect uac
    let xpr = document.evaluate(
      "//div[contains(concat(' ', normalize-space(@class), ' '), ' alt_topbottom ')]",
      document.body,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    if (xpr && xpr.singleNodeValue) {
      let thisNode = xpr.singleNodeValue;

      uac = true;
    }

    let mm = document.getElementById("mainmenu");
    if (!mm) {
      console.error('FATAL ERROR: Main menu does not exist');
      return;
    }

    function onresize(ev) {
      let xpr = document.evaluate(
        "//div[@id='top']/div[@class='container']",
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      if (xpr && xpr.singleNodeValue) {
        let thisNode = xpr.singleNodeValue;

        let width = parseFloat(getComputedStyle(thisNode, null).getPropertyValue("width").replace(/px$/i, "")); // NOTE: Returns normalized used instead of computed
        if (width <= 950) {
          let mainmenu = document.getElementById("mainmenu");
          if (mainmenu)
            mainmenu.style.setProperty("margin-right", (document.body.clientWidth - width) / 2 + "px", "");
        }
        else
          return true;

      }
      if (!ev)
        return false;
    }

    if (!onresize())
      addEventListener("resize", onresize, false);


    let height = getComputedStyle(mm, null).height.replace(/px$/, "") - 1 - 1; // NOTE: Extra pixel in rendering w FF

    let
        uso = GM_getResourceURL("uso"),
        cse = GM_getResourceURL("cse")
    ;

    let gCSS = GM_setStyle({
      media: "screen, projection",
      data:
        [
          ".hid { display: none; }",
          ".HID { display: none !important; }",

          "#header > .container { position: static; }",
          "#header #mainmenu { padding-top: 0; }",

          "#section_search .go {",
            "background: url(/images/search-icon.png) no-repeat scroll 0 0 transparent;",
            "border: medium none !important;",
            "box-shadow: none;",
            "cursor: pointer;",
            "height: 16px;",
            "padding: 0;",
            "width: 16px !important;",
          '}',

          "#header #mainmenu li a { display: inline-block; }",

          ((!ubs) ? "#section_search { border-bottom: thin solid #eee; border-left: thin solid #eee; }" : ""),
          "#section_search { width: " + ((!ubs) ? "180": "240") + "px; margin: 0; padding: 0;" + ((!ubs) ? " float: right;": "") + " }",
          "#section_search { height: " + height + "px; }",

          "#section_search form { height: inherit; }",
          "#section_search input[name=q] { height: inherit; }",

          "#section_search input { margin: 0; }",
          "#section_search .input {"
              + " font-size: inherit;"
              + " width: " + ((!ubs) ? "65%" : "190px") + " !important;"

              + " padding-top: 0;"
              + ((!ubs) ? " padding-right: " + ((!uac) ? "2.29" : "1.5") + "em;" : "")
              + " padding-bottom: 0;"
              + ((!ubs) ? " padding-left: 3em;" : "")

              + " background-color: #eee;"
              + " border: thin none;"
              + " float: left; "        // NOTE: Needed for USO generated CSE

              + ((!uac) ? "": " -moz-border-radius: " + ((!ubs) ? "0": "6px") + " 6px 0 0;")
              + ((!uac) ? "": " border-radius: " + ((!ubs) ? "0": "6px") + " 6px 0 0;")
          + " }",
          "#section_search .input:focus { background-color: #fff; }",

          "#section_search .searchin-opt { width: 16px; height: 16px; position: absolute; margin: 0.58em 0 0 -3em; background: url(" + GM_getResourceURL("gmc") + ") no-repeat scroll center center transparent; }",

          "#section_search #searchin { width: 32px; height: 16px; position: absolute; margin: " + ((!uac) ? "7px" : "0.58em") + " 0 0 0.25em; }",
          "#section_search .uso { background: url(" + GM_getResourceURL("uso") + ") no-repeat scroll left center, url(" + GM_getResourceURL("more") + ") no-repeat scroll right center transparent; }",
          "#section_search .cse { background: url(" + GM_getResourceURL("cse") + ") no-repeat scroll left center, url(" + GM_getResourceURL("more") + ") no-repeat scroll right center transparent; }",
          ".urllock { border-bottom-color: #000 !important; border-left-color: #000 !important; }",

          "#semenu { top: " + ((!uac) ? (height + 1) + "px" : "2.393em") + "; position: absolute; z-index: 2; margin: 0; list-style: none outside none; border-left: 1px solid #888; border-right: 1px solid #888; border-bottom: 1px solid #888; border-top: 1px solid #888; padding-left: 0; }",
          "#semenu > li { padding: 0.25em 1em 0.25em 0.5em; border-style: none !important; color: #000; -moz-border-radius: 0 !important; border-radius: 0 !important; margin: 0 !important; float: none !important; background: #eee url(ddata:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAQAAABamYz0AAAAAXNSR0IArs4c6QAAAB5JREFUCNdjuOfAxPCPieEvDP1D4v5DIv/iEEcIAgClTRkR4R/Z1AAAAABJRU5ErkJggg==) repeat-x scroll left top !important; }",
          "#semenu > li a { color: #fff !important; }",
          "#semenu > li:last-child  { border-top: thin dotted #aaa !important; }",
          "#semenu > li img  { vertical-align: middle; margin: 0 0.25em; }",
          "#semenu > li:hover { color: #fff !important; background-color: #06b !important; }",

          "#section_search .go { position: absolute; margin: " + ((!uac) ? "7px" : "0.58em") + " 0 0 " + ((!ubs) ? "-1.5" : "-1.2") + "em; }"

        ].join("\n")
    });

    // Restore native USO styling and put UBS in his... err its place ;)
    if (ubs) {
      GM_setStyle({
        node: gCSS,
        data:
          [
            '#install_script { bottom: auto !important; top: 10px !important; }',
            '#userscripts_better_search { margin: ' + ((!uac) ? '0.66':'0.6') + 'em 0 0 ' + ((!uac) ? '17.25':'14.75') + 'em !important; right: auto !important; background-position: center 1px !important; }'
          ].join("\n")
      });
    }

    let
        section_search = document.getElementById("section_search"),
        cse_section_search = null,
        uso_section_search = null,
        mainmenu = document.getElementById("mainmenu")
    ;

    // *** Check for CSE existance already from /search page ***
    if (!section_search) {
      cse_section_search = document.getElementById("cref_iframe_cse-search-box");

      if (cse_section_search) { // ** wrap in div and move pointer
        let divNode = document.createElement("div");
        divNode.id = "section_search";
        if (gmc.get("lockInurl") == "Fixed") {
          divNode.classList.add("urllock");
        }

        let xpr = document.evaluate(
          "//h2[.='Google Site Search']",
          document.body,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        );
        if (xpr && xpr.singleNodeValue) {
          let thisNode = xpr.singleNodeValue;

          thisNode.textContent = "Site Search";
        }

        document.evaluate(
          ".//input[@name='q']",
          cse_section_search,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          xpr
        );
        if (xpr && xpr.singleNodeValue) {
          let thisNode = xpr.singleNodeValue;

          thisNode.classList.add("input");
          thisNode.value = GM_getValue(":cse-last-query", "");
          thisNode.addEventListener("mouseover", onmouseoverCSE, false);
        }

        document.evaluate(
          ".//input[@name='sa']",
          cse_section_search,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          xpr
        );
        if (xpr && xpr.singleNodeValue) {
          let thisNode = xpr.singleNodeValue;

          thisNode.classList.add("go");
        }

        cse_section_search.parentNode.insertBefore(divNode, cse_section_search);
        divNode.appendChild(cse_section_search);

        cse_section_search.addEventListener("submit", onsubmitCSE, false);

        section_search = divNode;

        GM_deleteValue(":cse-last-query");
      }
    }
    else {
      let xpr = document.evaluate(
        ".//form",
        section_search,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      if (xpr && xpr.singleNodeValue) {
        let thisNode = xpr.singleNodeValue;

        if (!thisNode.id) {
          thisNode.id = "uso-search-box";
          uso_section_search = thisNode;

          if (location.pathname == "/") { // NOTE: Static watchpoint
            thisNode.parentNode.parentNode.removeChild(thisNode.parentNode.nextSibling);
            thisNode.parentNode.parentNode.removeChild(thisNode.parentNode.nextSibling); // NOTE: Remove br tag

            thisNode.parentNode.parentNode.removeChild(thisNode.parentNode.previousSibling);
            thisNode.parentNode.parentNode.removeChild(thisNode.parentNode.previousSibling); // NOTE: Remove h6
          }
        }
        else {
          console.error(
            [
              'id attribute for uso search box already exists',
              '',
              'Please leave a message at http://userscripts.org/topics/122744 '

            ].join('\n')
          );
          return;
        }
      }
    }

    // ** e.g. no search forms found at all e.g /tags **
    if (!section_search) {
      let divNode = document.createElement("div");
      divNode.id = "section_search";

      let xpr = document.evaluate(
        "//ul[@id='mainmenu']//li[contains(concat(' ', normalize-space(@class), ' '), ' active ')]",
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      );
      if (xpr && xpr.singleNodeValue) {
        let thisNode = xpr.singleNodeValue;

        cse_section_search = createSearchCSE();
      }
      else {
        cse_section_search = createSearchCSE();
      }

      divNode.appendChild(cse_section_search);
      if (gmc.get("lockInurl") == "Fixed") {
        divNode.classList.add("urllock");
      }

      section_search = document.body.appendChild(divNode); // NOTE: Very random location
    }

    // ** Draw in the engine selector and search tab **
    if (section_search && mainmenu) {
      let liNode = document.createElement("li");
      if (/^\/search/.test(location.pathname))
        liNode.classList.add("active");

      if (!ubs) {
        let aNode = document.createElement("a");
        aNode.href = "/search";
        aNode.textContent = "Search";

        liNode.appendChild(aNode);
      }
      liNode.appendChild(section_search);

      if (!ubs && uso_section_search && !cse_section_search) {
        cse_section_search = createSearchCSE();
        cse_section_search.classList.add("hid"); // NOTE: Initial

        section_search.appendChild(cse_section_search);
      }

      if (!ubs && gmcHome.get("unstickSearchTab")) {
        section_search.classList.add("hid");

        section_search.parentNode.addEventListener("mouseover", function (ev) {
          section_search.classList.remove("hid");
        }, false);

        section_search.parentNode.addEventListener("mouseout", function (ev) {
          section_search.classList.add("hid");
        }, false);
      }

      mainmenu.insertBefore(liNode, mainmenu.firstChild);

      if (!ubs) {

        let inputNodeSE = document.createElement("input");
        inputNodeSE.type = "image";
        inputNodeSE.id = "searchin";

        section_search.insertBefore(inputNodeSE, section_search.firstChild);

        inputNodeSE.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        inputNodeSE.addEventListener("click", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();

          // ** Build a menu **
          let semenu = document.getElementById("semenu");
          if (!semenu) {

            let ulNode = document.createElement("ul");
            ulNode.id = "semenu";

            function onclick (ev) {
              document.body.removeEventListener("click", onclick, false);
              if (ulNode && ulNode.parentNode)
                ulNode.parentNode.removeChild(ulNode);
            }
            document.body.addEventListener("click", onclick, false);

            if (ev.target.classList.contains("more")) {


              let liNodeSEuso = document.createElement("li");
              liNodeSEuso.textContent = "Userscripts.org";
              liNodeSEuso.addEventListener("click", function (ev) {
                let section_search = document.getElementById("section_search");
                if (section_search)
                    section_search.classList.remove("urllock");

                let inputNodeSE = section_search.firstChild;
                inputNodeSE.classList.remove("cse");
                inputNodeSE.classList.add("uso");

                let query;

                let cse_section_search = document.getElementById("cref_iframe_cse-search-box");
                if (cse_section_search) {
                  cse_section_search.classList.add("hid");

                  let xpr = document.evaluate(
                    ".//input[@name='q']",
                    cse_section_search,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                  );
                  if (xpr && xpr.singleNodeValue) {
                    let thisNode = xpr.singleNodeValue;

                    query = thisNode.value;
                  }
                }

                let uso_section_search = document.getElementById("uso-search-box");
                if (uso_section_search) {
                  uso_section_search.classList.remove("hid");
                  GM_deleteValue(":se-default");

                  let xpr = document.evaluate(
                    ".//input[@name='q']",
                    uso_section_search,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                  );
                  if (xpr && xpr.singleNodeValue) {
                    let thisNode = xpr.singleNodeValue;

                    if (query)
                      thisNode.value = query;
                  }
                }

                let e = document.createEvent("MouseEvents");
                e.initEvent("mouseout", true, false);
                ev.target.dispatchEvent(e);

                let semenu = document.getElementById("semenu");
                if (semenu)
                  semenu.parentNode.removeChild(semenu);

              }, false);

              let imgNodeSEuso = document.createElement("img");
              imgNodeSEuso.src = GM_getResourceURL("uso");
              liNodeSEuso.insertBefore(imgNodeSEuso, liNodeSEuso.firstChild);

              ulNode.appendChild(liNodeSEuso);
            }


            let liNodeSEcse = document.createElement("li");
            liNodeSEcse.textContent = "Google CSE";
            liNodeSEcse.addEventListener("click", function (ev) {
              let section_search = document.getElementById("section_search");
              if (section_search && gmc.get("lockInurl") == "Fixed")
                section_search.classList.add("urllock");

              let inputNodeSE = section_search.firstChild;
              inputNodeSE.classList.remove("uso");
              inputNodeSE.classList.add("cse");

              let query;

              let uso_section_search = document.getElementById("uso-search-box");
              if (uso_section_search) {
                uso_section_search.classList.add("hid");

                let xpr = document.evaluate(
                  ".//input[@name='q']",
                  uso_section_search,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                  null
                );
                if (xpr && xpr.singleNodeValue) {
                  let thisNode = xpr.singleNodeValue;

                  query = thisNode.value;
                }
              }


              let cse_section_search = document.getElementById("cref_iframe_cse-search-box");
              if (cse_section_search) {
                cse_section_search.classList.remove("hid");
                GM_setValue(":se-default", "cse");

                let xpr = document.evaluate(
                  ".//input[@name='q']",
                  cse_section_search,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                  null
                );
                if (xpr && xpr.singleNodeValue) {
                  let thisNode = xpr.singleNodeValue;

                  if (query)
                    thisNode.value = query;
                }
              }

              let e = document.createEvent("MouseEvents");
              e.initEvent("mouseout", true, false);
              ev.target.dispatchEvent(e);

              let semenu = document.getElementById("semenu");
              if (semenu)
                semenu.parentNode.removeChild(semenu);

            }, false);

            let imgNodeSEcse = document.createElement("img");
            imgNodeSEcse.src = GM_getResourceURL("cse");
            liNodeSEcse.insertBefore(imgNodeSEcse, liNodeSEcse.firstChild);

            ulNode.appendChild(liNodeSEcse);


            let liNodeSEmanage = document.createElement("li");
            liNodeSEmanage.textContent = "Manage Search Engines\u2026";
            liNodeSEmanage.addEventListener("click", function (ev) {
              gmc.open();

              let e = document.createEvent("MouseEvents");
              e.initEvent("mouseout", true, false);
              ev.target.dispatchEvent(e);

              let semenu = document.getElementById("semenu");
              if (semenu)
                semenu.parentNode.removeChild(semenu);

            }, false);

            let imgNodeSEmanage = document.createElement("img");
            imgNodeSEmanage.src = GM_getResourceURL("gmc");
            liNodeSEmanage.insertBefore(imgNodeSEmanage, liNodeSEmanage.firstChild);

            ulNode.appendChild(liNodeSEmanage);


            ev.target.parentNode.insertBefore(ulNode, ev.target.parentNode.firstChild.nextSibling);

            ev.target.parentNode.parentNode.addEventListener("mouseout", function (ev) {
              let thatNode = this.lastChild;
              while (thatNode) {
                if (thatNode.tagName.toLowerCase() == "ul")
                  thatNode.classList.add("hid");

                thatNode = thatNode.nextSibling;
              }

            }, false);
            ev.target.parentNode.parentNode.addEventListener("mouseover", function (ev) {
              let thatNode = this.lastChild;
              while (thatNode) {
                if (thatNode.tagName.toLowerCase() == "ul")
                  thatNode.classList.remove("hid");

                thatNode = thatNode.nextSibling;
              }

            }, false);

          }
          else
            semenu.parentNode.removeChild(semenu);

        }, false);


        let xpr = document.evaluate(
          ".//input[@name='q']",
          section_search,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        );

        if (xpr) {
          for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i); ++i) {
            thisNode.setAttribute("placeholder", "in\u2026");

            // ** Clear out stray value attribute on / with go button
            let go = document.evaluate(
              "//input[contains(concat(' ', normalize-space(@class), ' '), ' go ')]",
              document.body,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            );
            if (go && go.singleNodeValue) {
              let thisNode = go.singleNodeValue;

              thisNode.value = "";
            }

            switch (GM_getValue(":se-default")) {
              case "cse":
                if (uso_section_search) {
                  inputNodeSE.classList.add("cse");
                  inputNodeSE.classList.remove("uso");

                  cse_section_search.classList.remove("hid");
                  uso_section_search.classList.add("hid");

                  if (gmc.get("lockInurl") == "Fixed") {
                    section_search.classList.add("urllock");
                  }
                }
                break;
              case undefined:
              default:
                if (uso_section_search) {
                  inputNodeSE.classList.add("uso");
                  inputNodeSE.classList.remove("cse");

                  uso_section_search.classList.remove("hid");
                  cse_section_search.classList.add("hid");

                  if (gmc.get("lockInurl") == "Fixed") {
                    section_search.classList.remove("urllock");
                  }
                }
                break;
            }

            if (xpr.snapshotLength > 1)
              inputNodeSE.classList.add("more");
            else
              inputNodeSE.classList.add("cse");

          }
        }
      }
    }
    else
      console.error('FATAL ERROR: search NOT FOUND');
  }

})();
