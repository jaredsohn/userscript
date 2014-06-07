(function () {

// ==UserScript==
// @run-at        document-start
// @name          uso - Monkey Barrel
// @namespace     http://userscripts.org/users/37004
// @description   Enhanced menu system for Userscripts.org
// @copyright     2011+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.1.10.1esr1
// @icon          https://s3.amazonaws.com/uso_ss/icon/114843/large.png

// @include   /^https?://userscripts\.org(?::\d{1,5})?/?.*/

// @include   http://userscripts.org/*
// @include   https://userscripts.org/*

// @require   http://userscripts.org:8080/scripts/source/115323.user.js
// @require   https://raw.github.com/Martii/GM_config/42d6367b3c8ccc1b8f32af7b23fce5078716ff14/gm_config.js

// @resource  gmc https://s3.amazonaws.com/uso_ss/24274/large.png

// @grant GM_addStyle
// @grant GM_getResourceURL
// @grant GM_getValue
// @grant GM_log
// @grant GM_xmlhttpRequest
// @grant GM_setValue

// ==/UserScript==

/*

CHANGELOG
=========
http://userscripts.org/topics/89961

Please note this script uses native JSON and native classList which requires Firefox 3.6.x+ and Greasemonkey 0.9.8+

*/

  let protocol = "http" + (/^https:$/i.test(location.protocol) ? "s" : "") + ":";

  function findlastPost(aTopicid) {
    if (document && document.body)
      document.body.style.cursor = "progress";

    GM_xmlhttpRequest({
      retry: 5,
      url: "/topics/" + aTopicid + ".rss",
      method: "GET",
      onload: function (xhr) {
        switch (xhr.status) {
          case 502:
          case 503:
            if (--this.retry > 0)
              setTimeout(GM_xmlhttpRequest, 3000 + Math.round(Math.random() * 5000), this);
            else {
              if (document && document.body)
                document.body.style.cursor = "auto";
            }
            break;
          case 200:
            let doc = new DOMParser().parseFromString(xhr.responseText, "text/xml"),
                xpr = doc.evaluate(
                    "//channel/item/link",
                    doc.documentElement,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                );

            if (xpr && xpr.singleNodeValue) {
              let thisNode = xpr.singleNodeValue;

              if (/^https?:\/\/userscripts\.org(?::\d{1,5})?\/posts\/\d+\/?/i.test(thisNode.textContent)) {
                let url = thisNode.textContent.replace(/http:/i, location.protocol);
                GM_xmlhttpRequest({
                  retry: 5,
                  url: thisNode.textContent.replace(/http:/i, location.protocol),
                  method: "HEAD",
                  onload: function (xhr) {
                    // NOTE: Secure xhr is prevented currently on USO and GM_xhr currently has an issue with onreadystatechange in FF 7.0.1,
                    //       so rely upon finalUrl in unsecure mode but redirect to secure
                    switch (xhr.status) {
                      case 502:
                      case 503:
                        if (--this.retry > 0)
                          setTimeout(GM_xmlhttpRequest, 3000 + Math.round(Math.random() * 5000), this);
                        else {
                          if (document && document.body)
                            document.body.style.cursor = "auto";
                        }
                        break;
                      case 200:
                        if (document && document.body) {
                          document.body.style.cursor = "auto";
                          location.assign(xhr.finalUrl.replace(/^http:/i, location.protocol));
                        }
                        else {
                          location.replace(xhr.finalUrl.replace(/^http:/i, location.protocol));
                        }
                        break;
                      default:
                        if (document && document.body)
                          document.body.style.cursor = "auto";
                        break;
                    }
                  }
                });
              }
            }
            break;
          default:
            if (document && document.body)
              document.body.style.cursor = "auto";
          break;
        }
      }
    });
  }

  // ** Accelerator function event
  function lastPost(ev) {
    let topicid = ev.target.href.match(/\/topics\/(\d+)\#posts\-last/i);
    if (!topicid)
      return;

    ev.preventDefault();

    findlastPost(topicid[1]);
  };

  // ** "load into view" e.g. use accelerator if #posts-last in address bar
  if (location.hash == "#posts-last") {
    let topicid = location.pathname.match(/\/topics\/(\d+)/i);
    if (topicid) {
      stop();

      findlastPost(topicid[1]);
    }
    else
      history.replaceState({}, '', location.href.replace(/\#posts\-last$/, ""));
  }

  function onDOMContentLoaded() {
    if (!document || !document.body)
      return;

    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded, true);

    if (location.hash == "#posts-last" && location.pathname.match(/\/topics\/\d+$/))
      document.body.style.cursor = "progress";

    let gCSS = GM_setStyle({
        media: "screen, projection"
    });

    if (typeof GM_configStruct != "undefined") {
      // Save some memory
      delete GM_config;

      var gmc = new GM_configStruct();
      gmc.id = "gmc114843";

      var divNode = document.getElementById("full_description");

      if (divNode && !divNode.firstChild) {
        var newdivNode = document.createElement("div");
        divNode = divNode.appendChild(newdivNode);
      }
      else {
        var newdivNode = document.createElement("div");
        if (divNode)
          divNode = divNode.insertBefore(newdivNode, divNode.firstChild);
        else
          divNode = document.body.appendChild(newdivNode);
      }

      /* Nearest fix for a glitch on USO */
      let scriptNav = document.getElementById("script-nav");
      if (scriptNav && divNode && scriptNav.clientWidth != divNode.clientWidth)
        GM_setStyle({
            node: gCSS,
            data:
              [
                "div #full_description { width: 98.1%; }"

              ].join("\n")
        });

      let screenShots = document.getElementById("screenshots");
      if (screenShots)
        GM_setStyle({
            node: gCSS,
            data:
              [
                "#full_description { clear: left; }"

              ].join("\n")
        });

      /* Nearest fix for userscripts.org Alternate CSS */
      let fullDescription = document.getElementById("full_description");
      if (fullDescription && screenShots && fullDescription.clientWidth > parseInt(screenShots.clientWidth * 1.0275))
        GM_setStyle({
            node: gCSS,
            data:
              [
                "#screenshots { width: 97.5% !important; }"

              ].join("\n")
        });

      GM_setStyle({
          media: "print",
          data:
            [
              ".hid { display: none; }",
              "#gmc114843 { display: none !important; }"

            ].join("\n")
      });

      let onInit = function (doc) {
        /* Cleanup unused style in the GMC div portion of the DOM */
        if (doc) {
          let thisNode = doc.getElementById("gmc114843");
          if (thisNode)
            thisNode.removeAttribute("style");
        }
      }

      gmc.init(
          divNode,
//           gmc.onInit, // NOTE: Destruction of this function occurs after initial open with GMC 7e5dfecf87- so don't currently use
          [
              '<img alt="Monkey Barrel" title="uso - Monkey Barrel" src="' + protocol + '//s3.amazonaws.com/uso_ss/icon/114843/large.png" />',
              '<p>Preferences</p>',
              '<span>',
                '<a href="' + protocol + '//github.com/sizzlemctwizzle/GM_config/wiki/">',
                  '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
                '</a>',
              '</span>'

          ].join(""),
          /* Custom CSS */
          GM_setStyle({
              node: null,
              data:
                [
                  /* Homepage */
                  "@media screen, projection {",
                      /* GM_config USO styling fixups */
                      "#gmc114843 { position: static !important; z-index: 0 !important; width: auto !important; height: auto !important; max-height: none !important; max-width: none !important; margin: 0 0 0.5em 0 !important; border: 1px solid #ddd !important; clear: right !important; }",

                      "#gmc114843_header a { display: inline; }",
                      "#gmc114843_header img { max-height: 32px; margin-right: 0.125em; vertical-align: middle; }",
                      "#gmc114843_header > p { display: inline; margin: 0; vertical-align: middle; }",
                      "#gmc114843_header span { float: right; }",
                      "#gmc114843_header span > a { display: inline; margin-left: 0.25em; }",
                      "#gmc114843_wrapper { background-color: #eee; padding-bottom: 0.25em; }",
                      "#gmc114843 .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                      "#gmc114843 .config_var { clear: both; margin: 0.33em; padding: 0; }",
                      "#gmc114843 .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: -0.2em; }",
                      "#gmc114843 .section_header_holder { margin: 0.25em 0.5em !important; }",
                      "#gmc114843 .section_desc { margin: 0.25em 1.5em !important; }",

                          ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",

                          "#gmc114843_section_header_0 { background-color: inherit !important; border-style: none !important; color: inherit !important; font-size: inherit !important; text-align: left !important; }",
                          "#gmc114843_section_0 { margin: 0 1.5em !important; }",

                          "#gmc114843_jsonMenus_var { margin: -1em 0 !important; }",
                          "#gmc114843_jsonMenus_field_label { margin: 1em 0 !important; }",
                          "#gmc114843_field_jsonMenus { font-size: 1em; height: 15.2em; margin-top: 1em; max-width: 98.68%; min-width: 98.68%; min-height: 15.2em; }",

                      "#gmc114843 .reset, #gmc114843 .reset a, #gmc114843_buttons_holder { text-align: inherit; }",
                      "#gmc114843_buttons_holder { margin: 0.5em; }",
                      "#gmc114843_saveBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                      "#gmc114843_resetLink { margin-right: 1.5em; }",
                      "#gmc114843_closeBtn { display: none; }",
                  "}",

                  "@media print {",
                      ".hid { display: none; }",
                      "#gmc114843 { display: none !important; }",
                  "}"

                ].join("\n")
          }),

          /* Settings object */
          {
            'jsonMenus': {
                "section": ["Main menus"],
                "type": 'textarea',
                "label": "<p><em class='gmc-yellownote'>use <a href='http://json.org/'>JSON</a> data-interchange format.</em></p>",
                "default": JSON.stringify(
                             JSON.parse(
                                [
                                  '{',
                                    '"Monkey Barrel": [',
                                      '"/scripts/show/114843",',
                                      '{',
                                      '"recent posts": "/posts",',
                                      '"recent topics": "/topics",',
                                      '"recent comments": "/comments",',
                                      '"recent images": "/images",',
                                      '"": "",',
                                      '"recent spam": "/spam",',
                                      '"recent potential spam": "/posts?kind=all&spam=1",',
                                      '"recent potential spam by score": "/posts?kind=all&spam=score",',
                                      '"spam and malware \u00bb": "/topics/9#posts-last",',
                                      '"cookie stealing scripts \u00bb": "/topics/704#posts-last",',
                                      '" ": "",',
                                      '"custom search": "/search"',
                                      '}',
                                    ']',
                                  '}'

                                ].join("\n")
                             ), null, " ")
            },
            'enableUnpin': {
                "type": 'checkbox',
                "label": 'Unpin submenus',
                "default": true
            },
            'importGroups': {
                "type": 'checkbox',
                "label": 'Enable automatic import for subscribed Groups when clicked',
                "default": true
            },
            'addLastPostLinks': {
                "type": 'checkbox',
                "label": 'Add last post links to the Recent Topics on a script homepage',
                "default": true
            }
          }
      );


      gmc.onOpen = function () {
        onInit(document);

        gmc.fields["jsonMenus"].node.setAttribute("spellcheck", "false");
        gmc.fields["jsonMenus"].node.textContent = JSON.stringify(JSON.parse(gmc.get("jsonMenus")), null, " ");
      }

      gmc.onSave = function () {
        try {
          gmc.set("jsonMenus", JSON.stringify(JSON.parse(gmc.get("jsonMenus")), null, ""));

          gmc.write();
          gmc.close();
          gmc.open();
        }
        catch (e) {
          alert('ERROR: Invalid JSON for main menu.\n\nPlease correct or reset to defaults');
        }
      }

      if (location.pathname.match(/^\/scripts\/show\/114843/i)) {
        gmc.open(); // NOTE: First open
      }

      // -------------------------------------------------------------------------------------------------------------------------------------------------
      GM_setStyle({
        node: gCSS,
        data:
          [
            /* Fix USO */
            "#header #mainmenu { padding-top: 0; }",

            ".hid { display: none; }",
            ".mainmenu- { position: fixed; z-index: 1; margin: 0; list-style: none outside none; border-left: 1px solid #888; border-right: 1px solid #888; border-bottom: 1px solid #888; padding-left: 0; }",
            ".mainmenu- li { -moz-border-radius: 0 !important; border-radius: 0 !important; margin: 0 !important; float: none !important; background: #000 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAQAAABamYz0AAAAAXNSR0IArs4c6QAAAB5JREFUCNdjuOfAxPCPieEvDP1D4v5DIv/iEEcIAgClTRkR4R/Z1AAAAABJRU5ErkJggg==) repeat-x scroll left top !important; }",
            ".mainmenu- li a { color: #fff !important; }",
            ".mainmenu- .sep { border-bottom: thin dashed #aaa !important; }"

          ].join("\n")
      });

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

      if (gmc.get("enableUnpin")) {
        GM_setStyle({
          node: gCSS,
          data:
            [
              "#header > .container { position: static; }",
              ".mainmenu- { position: absolute; }"

            ].join("\n")
        });

      if (!onresize())
        addEventListener("resize", onresize, false);
      }

      // ** Event listeners
      function onmouseover(ev) {

        let thatNode = this.firstChild.nextSibling;
        while (thatNode) {
          if (thatNode.tagName.toLowerCase() == "ul")
            thatNode.classList.remove("hid");

          thatNode = thatNode.nextSibling;
        }
      };

      function onmouseout(ev) {
        let thatNode = this.firstChild.nextSibling;
        while (thatNode) {
          if (thatNode.tagName.toLowerCase() == "ul")
            thatNode.classList.add("hid");

          thatNode = thatNode.nextSibling;
        }
      };

      // ** Generator functions
      function createMenuItem(aTextContent, aHref) {
        if (aTextContent.trim() == "")
          return undefined;

        let aNode = document.createElement("a");
        aNode.href = aHref;
        aNode.textContent = aTextContent;

        if (aNode.href.match(/\/topics\/\d+\#posts\-last$/i))
          aNode.addEventListener("click", lastPost, false);

        let liNode = document.createElement("li");

        return liNode.appendChild(aNode).parentNode;
      }

      function createMenuItems(aList, aItems) {
        for (let item in aItems) {
          let menuItem = createMenuItem(item,aItems[item]);
          if (menuItem)
            aList.appendChild(menuItem);
          else if (aList.lastChild)
            aList.lastChild.classList.add("sep");
        }

        return aList;
      }

      function createMenu(aMenu) {
        let ulNode = document.createElement("ul");
        ulNode.className = "mainmenu-";
        ulNode.classList.add("hid");

        return createMenuItems(ulNode, aMenu[1]);
      }

      // ** Retrieve the stored menus
      let mainmenu;
      try {
        mainmenu = JSON.parse(gmc.get("jsonMenus"));
      }
      catch (e) {
        if (location.pathname != "/scripts/show/114843") {
          alert('ERROR: Invalid JSON for main menu found in uso - Monkey Barrel.\n\nPlease correct or reset to defaults');

          location.pathname = "/scripts/show/114843";
        }
        return;
      }

      // If on /groups and allowed then read in values from sidebar
      if (gmc.get("importGroups") && location.pathname == "/groups") {
        let xpr = document.evaluate(
              "//div[@id='right']/h3[starts-with(.,'Groups you created')]/following-sibling::ul[1]/li/a"
            + "|//div[@id='right']/h3[starts-with(.,'Groups you joined')]/following-sibling::ul[1]/li/a",
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        if (xpr.snapshotLength > 0) {
          if (!mainmenu["Groups"])
            mainmenu["Groups"] = [ "/groups", {} ];

          for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
            mainmenu["Groups"][1][thisNode.textContent] = thisNode.pathname;
          }

          // Resave the JSON menus silently
          gmc.set("jsonMenus", JSON.stringify(mainmenu, null, ""));

          gmc.write();

          if (gmc.isOpen)
            gmc.fields["jsonMenus"].node.textContent = JSON.stringify(JSON.parse(gmc.get("jsonMenus")), null, " ");
        }
      }


      if (gmc.get("addLastPostLinks")) {
        GM_setStyle({
          node: gCSS,
          data:
            [
              "#topics .postslast { padding: 0.125em 0.25em 0.125em 0.5em; }",
              "#topics td.count { text-align: right; background-color: #eee; }"

            ].join("\n")
        });

        let xpr = document.evaluate(
            "//div[@id='topics']//td/a[starts-with(@href, '/topics')]",
            document.body,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );
        if (xpr && xpr.snapshotLength > 0) {
          // NOTE: Assume table headers are present
          for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
            let aNode = document.createElement("a");
            aNode.href = thisNode.href;
            aNode.hash = "posts-last";
            aNode.title = "last post";
            aNode.textContent = thisNode.parentNode.nextSibling.textContent + "\u00a0\u00a0\u00bb";
            aNode.classList.add("lastpost");  // NOTE: USO native
            aNode.classList.add("postslast");
            aNode.addEventListener("click", lastPost, false);

            thisNode.parentNode.nextSibling.removeChild(thisNode.parentNode.nextSibling.firstChild);

            aNode = thisNode.parentNode.parentNode.lastChild.appendChild(aNode);
//            thisNode.parentNode.parentNode.lastChild.insertBefore(aNode, thisNode.parentNode.parentNode.lastChild.firstChild);
          }
        }
      }

      // ** Paint the menus
      let mm = document.getElementById("mainmenu");
      if (mm) {
        // Remove Jetpacks mainmenu item, if present. from userscripts alternate CSS
        let xpr = document.evaluate(
            "./li/a[.='Jetpacks']",
            mm,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        );
        if (xpr && xpr.singleNodeValue) {
          let thisNode = xpr.singleNodeValue;

          thisNode.parentNode.parentNode.removeChild(thisNode.parentNode);
        }

        // Twiddle
        document.evaluate(
            "./li/a[.='Monkey Barrel']",
            mm,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            xpr
        );
        if (xpr && xpr.singleNodeValue)
          return;

        mm.appendChild(createMenuItem("Monkey Barrel", "/scripts/show/114843"));

        // Get existing menu items and then send off to functions
        document.evaluate(
            "./li",
            mm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            xpr
        );

        for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
          let aNode = thisNode.firstChild;

          if (mainmenu[aNode.textContent]) {
            thisNode.appendChild(createMenu(mainmenu[aNode.textContent]));
            thisNode.addEventListener("mouseover", onmouseover, false);
            thisNode.addEventListener("mouseout", onmouseout, false);
          }
        }
      }

    }
  }

  document.addEventListener("DOMContentLoaded", onDOMContentLoaded, true);

})();
