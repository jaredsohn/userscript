(function () {
  "use strict";

// ==UserScript==
// @name          uso - installWith
// @namespace     http://userscripts.org/users/37004
// @description   Adds option to install script with an icon and/or updater plus the original script advisor. "So easy, a cavemonkey can do it"
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       2.0.4.1esr1
// @icon          https://s3.amazonaws.com/uso_ss/icon/68219/large.png

// @include /^https?://userscripts.org(?::\d{1,5})?/?$/
// @include /^https?://userscripts\.org(?::\d{1,5})?/scripts/
// @include /^https?://userscripts\.org(?::\d{1,5})?/topics//
// @include /^https?://userscripts\.org(?::\d{1,5})?/reviews//
// @include /^https?://userscripts\.org(?::\d{1,5})?/users/.+?/scripts/
// @include /^https?://userscripts\.org(?::\d{1,5})?/users/.+?/favorites/
// @include /^https?://userscripts\.org(?::\d{1,5})?/groups/\d+/scripts/
// @include /^https?://userscripts\.org(?::\d{1,5})?/tags//
// @include /^https?://userscripts\.org(?::\d{1,5})?/home/(?:scripts|favorites)/
// @include /^https?://userscripts\.org(?::\d{1,5})?/posts//

// @include http://userscripts.org/
// @include http://userscripts.org/scripts*
// @include http://userscripts.org/topics/*
// @include http://userscripts.org/reviews/*
// @include http://userscripts.org/users/*/scripts*
// @include http://userscripts.org/users/*/favorites*
// @include http://userscripts.org/groups/*/scripts*
// @include http://userscripts.org/tags/*
// @include http://userscripts.org/home/scripts*
// @include http://userscripts.org/home/favorites*
// @include http://userscripts.org/posts*

// @include https://userscripts.org/
// @include https://userscripts.org/scripts*
// @include https://userscripts.org/topics/*
// @include https://userscripts.org/reviews/*
// @include https://userscripts.org/users/*/scripts*
// @include https://userscripts.org/users/*/favorites*
// @include https://userscripts.org/groups/*/scripts*
// @include https://userscripts.org/tags/*
// @include https://userscripts.org/home/scripts*
// @include https://userscripts.org/home/favorites*
// @include https://userscripts.org/posts*


// @exclude /^https?://userscripts\.org(?::\d{1,5})?/scripts/diff//
// @exclude /^https?://userscripts\.org(?::\d{1,5})?/scripts/version//

// @exclude http://userscripts.org/scripts/diff/*
// @exclude http://userscripts.org/scripts/version/*

// @exclude https://userscripts.org/scripts/diff/*
// @exclude https://userscripts.org/scripts/version/*

// @updateURL   http://userscripts.org:8080/scripts/source/68219.meta.js
// @installURL  http://userscripts.org:8080/scripts/source/68219.user.js
// @downloadURL http://userscripts.org:8080/scripts/source/68219.user.js

// @resource icon  https://s3.amazonaws.com/uso_ss/icon/68219/large.png
// @resource gmc   https://s3.amazonaws.com/uso_ss/24274/large.png
// @resource usoc  https://s3.amazonaws.com/uso_ss/24278/large.png
// @resource uso   https://s3.amazonaws.com/uso_ss/24277/large.png
// @resource clear https://s3.amazonaws.com/uso_ss/24273/large.gif
// @resource more  https://s3.amazonaws.com/uso_ss/24276/large.gif
// @resource less  https://s3.amazonaws.com/uso_ss/24275/large.gif

// @resource list http://beta.usocheckup.dune.net/list.json

//@require https://secure.dune.net/usocheckup/68219.js?method=install&open=window&maxage=1&custom=yes&topicid=45479&id=usoCheckup
//@require http://userscripts.org/scripts/source/61794.user.js

// @require https://raw.githubusercontent.com/Martii/UserScripts/dc7d27fef916db3bea640139bd852b2c75a08ff8/lib/GM_setStyle/GM_setStyle.js
// @require https://raw.githubusercontent.com/Martii/GM_config/a0d0066ffaefb5fbb3402c3d46ac705e8b4124d8/gm_config.js

// @grant GM_addStyle
// @grant GM_deleteValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_registerMenuCommand
// @grant GM_setClipboard
// @grant GM_setValue
// @grant GM_xmlhttpRequest

// ==/UserScript==

  if (!document || !document.body)
    return;

  const
      gTHIS = this,
      gJSE = !!(typeof window.wrappedJSObject == "object" && typeof window.wrappedJSObject.jQuery == "function"),

      gPROTOCOL = location.protocol,
      gPORTX = /^80$/.test(location.port) ? "" : ":8080",
      gHOSTNAME = location.hostname,
      gPATHNAME = location.pathname,
      gISHOMEPAGE = /^\/scripts\/show\//.test(gPATHNAME),
      gHASH = location.hash,
      gCSS = GM_setStyle({
          media: "screen, projection",
          data: ".hid { display: none; } .HID { display: none !important } .blah { color: #f00 !important; } .halb { background-color: #f00 !important; }"
      }),
      gUAC = !!document.body.querySelector(".alt_topbottom"),
      gHALT404 = true,
      gRETRIES = 4,
      gDELAYRETRYMIN = 3000,
      gDELAYRETRYMAX = 8000,

      gHEADLENADJ = 800, // NOTE: Inset
      gTITLELENADJ = 800, // NOTE: Outset
      gANONDIVISOR = 2.20,

      gLIST = GM_getResourceText("list").replace(/[\n\r\s]*\}[\n\r\s]*$/, '')
  ;

  let
      gGROUPS,

      gANODES,
      gQNODES,

      gBYTESMAX,
      gBYTESMIN,

      gIdle = true,
      gISFRAMELESS = false,

      gLoginMsgShown,
      gLoginTrying,
      gLoginTried
  ;

  try {
    gISFRAMELESS = (window == window.top);
  }
  catch (e) {}

  /**
   *
   */

  function byteLength(aString) {
    return unescape(encodeURIComponent(aString)).length;
  }

  /**
   *
   */
  function genReport(aReports, aReported, aMarkdown) {

    let
        i = 0,
        maxList = 30,
        post = ""
    ;

    if (aMarkdown) {
      aReports.split(",").forEach(function (e, i, a) {
          if (i % maxList == 0) {
            if (i != 0)
              post += '\n';
            post += 'Potentially unwanted scripts\n\n';
          }

          let found;
          aReported.split(",").forEach(function (e1, i1, a1) {
            if (e1 == e)
              found = true;
          });

          if (!found)
            post += '* [' + e + '](' + e + ')\n';
          else
            post += '* ' + e + '\n';
          i++;
      });
    }
    else {
      post = aReports.split(',').map(function (aE) {
          let found;
          aReported.split(",").forEach(function (e1, i1, a1) {
            if (e1 == aE)
              found = true;
          });

          let item;
          if (!found)
            item = '\n<li><a href="' + aE + '">' + aE + '</a></li>';
          else
            item = '\n<li>' + aE + '</li>';

          if (i % maxList == 0) {
            aE = (i ? '\n</ul>\n' : '') + '<p>Potentially unwanted scripts</p>\n<ul>' + item;
          }
          else
            aE = item;

          i++;
          return aE;

      }).join('') + '\n</ul>';
    }

    return post;
  }
  /**
   *
   */
  function doReport(aReports) {
    GM_xmlhttpRequest({
      retry: gRETRIES,
      url: "/topics/9.rss",
      method: "GET",
      onload: function(aR) {
        switch(aR.status) {
          case 404:
            if (gHALT404)
              this._retry = 0;
          case 500:
          case 502:
          case 503:
            if (gJSE && this.retry-- > 0) {
              setTimeout(GM_xmlhttpRequest, gDELAYRETRYMIN + Math.round(Math.random() * (gDELAYRETRYMAX - gDELAYRETRYMIN)), this); // NOTE: Detached
              break; // NOTE: Watchpoint
            }
          case 200:
            let
                parser = new DOMParser(),
                xml = parser.parseFromString(aR.responseText, "text/xml"),
                reported = []
            ;

            let descriptions = xml.querySelectorAll("item description");
            for (let i = 0, thisDescription; thisDescription = descriptions[i++];) {
              let docfrag = document.createDocumentFragment();

              let nodeDiv = document.createElement("div");
              nodeDiv.innerHTML = thisDescription.textContent;

              docfrag.appendChild(nodeDiv);
              let anchors = docfrag.querySelectorAll("a");
              for (let j = 0, thisAnchor; thisAnchor = anchors[j++];) {

                let matches;

                matches = thisAnchor.href.match(/^https?:\/\/userscripts\.org(\/users\/\d+)\/?/);
                if (matches)
                  reported.push(matches[1]);
                else if (matches = thisAnchor.href.match(/^https?:\/\/userscripts\.org(?::\d{1,5})?\/scripts\/show(\/\d+)\/?/))
                  reported.push(matches[1]);
                else if (matches = thisAnchor.href.match(/^https?:\/\/userscripts\.org(?::\d{1,5})?(\/\d+)\/?/))
                  reported.push(matches[1]);
              }

            }

            let count = 0, reports = aReports.split(",");
            reports.forEach(function (e, i, a) {
              reported.forEach(function (e1, i1, a1) {
                if (e1 == e)
                  ++count;
              });
            });

            if (count > 0 && count == reports.length)
              ; // Do nothing
            else {
              let thisNode = document.querySelector("#content .posts tbody > tr:last-child .author .edit a.utility"), isReply;
              if (thisNode) {
                let dateNode = document.querySelector("#content .posts tbody > tr:last-child .author .date abbr");
                if (dateNode) {
                  let dateLastPost = new Date(dateNode.title);
                  if ((Date.now() - dateLastPost) > (60 * 60 * 1000))
                    thisNode = undefined;
                }
                else {
                  if (gmcHome.get("enableDebugging"))
                    console.warn('Last posting date not found...reverting to reply mode');
                  thisNode = undefined;
                }
              }

              if (!thisNode) {
                thisNode = document.querySelector("#content > p a.utility");
                isReply = true;
              }


              if (thisNode && (thisNode.textContent == "Reply to topic" || thisNode.textContent == "Edit post")) {
                setTimeout(function () {
                  thisNode.click();

                  let that, retry = 4;
                  if (!isReply) {
                    setTimeout(that = function () {
                      let post_body = document.querySelector("#edit textarea#edit_post_body");
                      if (post_body) {
                        let UCF = !!document.querySelector("#edit .previewBtn");
                        if (UCF)
                          post_body.value = post_body.textContent +  '\n' + genReport(aReports, reported.join(','), document.querySelector("#edit #post_markdown").checked);
                        else
                          post_body.textContent += '\n' + genReport(aReports, reported.join(','), document.querySelector("#edit #post_markdown").checked);
                      }
                      else {
                        if (retry-- > 0);
                          setTimeout(that, 500);
                      }
                    }, 0);
                  }
                  else {
                    setTimeout(that = function () {
                      let post_body = document.querySelector("#reply textarea#post_body");
                      if (post_body) {
                        let UCF = !!document.querySelector("#reply .previewBtn");
                        if (UCF)
                          post_body.value = genReport(aReports, reported.join(','), document.querySelector("#reply #post_markdown").checked);
                        else
                          post_body.value = genReport(aReports, reported.join(','), document.querySelector("#reply #post_markdown").checked);
                      }
                      else {
                        if (retry-- > 0);
                          setTimeout(that, 500);
                      }
                    }, 0);
                  }
                }, 1000); // NOTE: Give UCF this much initial time to load before triggering click otherwise USO default shows depending on script order/count
              }
            }
            break;
        }
      }
    });
  }

  /**
   *
   */
  function init() {

    gANODES = document.body.querySelectorAll(".script-meat, .userjs");
    gQNODES = [];

    /** Initial gCSS fix for tagging **/ // NOTE: This fix may be different in later FF versions
    GM_setStyle({
      node: gCSS,
      data:
        [
          "th { border-bottom-style: none; }"

        ].join("\n")
    });

    if (/(^\/users\/.+?\/(?:scripts|favorites)|^\/home\/(?:scripts|favorites))/.test(gPATHNAME) || (/^\/$/.test(gPATHNAME)) && gUAC)
      GM_setStyle({
        node: gCSS,
        data:
          [
            "#main th:first-child, #content th:first-child { border-left-width: 10px; padding-left: 7px; }",
            "table.forums tr td.script-meat { background-color: #eee; border-left: 10px solid #eee; }"

          ].join("\n")
      });
    else if (/^\/groups\/\d+\/scripts/.test(gPATHNAME))
      GM_setStyle({
        node: gCSS,
        data:
          [
            "#main th:first-child, #content th:first-child { border-right-width: 10px; padding-left: 7px; }",
            "table.forums tr td.script-meat { background-color: #eee; border-left: 10px solid #eee; }"

          ].join("\n")
      });
    else
      GM_setStyle({
        node: gCSS,
        data:
          [
            "#main th:first-child, #content th:first-child { padding-left: 16px; }",
            "table.forums tr td.script-meat { background-color: #eee; border-left: 18px solid #eee; }"

          ].join("\n")
      });

    GM_setStyle({
      node: gCSS,
      data:
        [
          "table.forums tr td.script-meat { background-color: #eee; border-left-color: #eee; }",
          "#install_script a.userjs { background: #ccc no-repeat scroll 0 0; border: 1px solid #ddd; border-left: 10px solid #888; border-radius: 0.25em; }",
          "#install_script a.userjs:hover { background: #ccc no-repeat scroll 0 0; }",

          "table.forums tr td.saU, #install_script a.saU { background-color: #ccc; border-left-color: #aaa; }",
          "table.forums .actions { float: right; font-size: 0.9em; margin-left: 1em; }",
          "table.forums .actions span { font-size: 0.8em; }",
          "table.forums .actions .action, table.forums .actions .toggle { color: #444; margin-left: 0.5em; text-decoration: none; }",

          "table.forums .actions .more { background: transparent url(" + GM_getResourceURL("more") + ") no-repeat scroll center bottom; cursor: pointer; height: 5px; padding: 4px 4px 0 4px; margin-left: 0.25em; width: 9px; }",
          "table.forums .actions .less { background: transparent url(" + GM_getResourceURL("less") + ") no-repeat scroll center bottom; cursor: pointer; height: 9px; padding: 0 6px; margin-left: 0.25em; width: 5px; }",

          "table.forums a.title { font-weight: bold; }",

          "table.forums tr td.saEMBED, #install_script a.saEMBED { background-image: linear-gradient(to left, #888, rgba(136,136,136,0.25), rgba(136,136,136,0)) !important; }",

          "table.forums tr td.saXCLUDE, #install_script a.saXCLUDE { background: #fff none repeat scroll 0 0; color: #000; }",
          "#install_script a.saXCLUDE:hover { background: #fff none repeat scroll 0 0; color: #000; }",
          "table.forums tr td.sabXCLUDE, #install_script a.sabXCLUDE { border-left-color: #ddd; }",

          "table.forums tr td.saLOW, #install_script a.saLOW { background: #d6efc2 repeat scroll 0 0; }",
          "#install_script a.saLOW:hover { background: #d6efc2 repeat scroll 0 0; }",
          "table.forums tr td.sabLOW, #install_script a.sabLOW { border-left-color: #b0d813; }",

          "table.forums tr td.saGUARD, #install_script a.saGUARD { background: #d5edf8 repeat scroll 0 0; }",
          "#install_script a.saGUARD:hover { background: #d5edf8 repeat scroll 0 0; }",
          "table.forums tr td.sabGUARD, #install_script a.sabGUARD { border-left-color: #92cae4; }",

          "table.forums tr td.saELEVATE, #install_script a.saELEVATE, table tr.unlisted { background: #fbfad5 repeat scroll 0 0; }",
          "#install_script a.saELEVATE:hover { background: #fbfad5 repeat scroll 0 0; }",
          "table.forums tr td.sabELEVATE, #install_script a.sabELEVATE { border-left-color: #fbf700; }",

          "table.forums tr td.saHIGH, #install_script a.saHIGH { background: #fbe5b0 repeat scroll 0 0; }",
          "#install_script a.saHIGH:hover { background: #fbe5b0 repeat scroll 0 0; }",
          "table.forums tr td.sabHIGH, #install_script a.sabHIGH { border-left-color: #fbbf5d; }",

          "table.forums tr td.saSEVERE, #install_script a.saSEVERE { background: #fbe3e4 repeat scroll 0 0; }",
          "#install_script a.saSEVERE:hover { background: #fbe3e4 repeat scroll 0 0; }",
          "table.forums tr td.sabSEVERE, #install_script a.sabSEVERE { border-left-color: #fb7e83; }",

          "table.forums tr td.sabABORT, #install_script a.saABORT { background: #000 none repeat scroll 0 0; color: #fff; }",
          "#install_script a.saABORT:hover { background: #000 none repeat scroll 0 0; color: #fff; }",

          "@-moz-keyframes saB { from { background: #888; } to { background: #fff; } }",
          ".saB { background: transparent none repeat scroll 0 0; -moz-animation: 1.5s ease 0s alternate none infinite saB !important; }",

          ".delusr { color: #fff; }",
          ".dim { opacity: 0.25; }",
          ".dim:hover { opacity: 1; }",

          ".byline { font-size: 0.9em; }",
          ".byline a:last-child { font-style: italic; }"

      ].join("\n")
    });

    let contentNode = document.getElementById("content");

    if (!gJSE && contentNode && document.title != "500 Server Error – Userscripts.org") {
      let nodeA = document.createElement("a");
      nodeA.href = "/scripts/show/68219";
      nodeA.textContent = "installWith";

      let nodeSpan = document.createElement("span");
      nodeSpan.textContent = "Enabling this sites JavaScript is highly recommended to improve your experience with ";

      let nodeP = document.createElement("p");
      nodeP.classList.add("notice");
      nodeP.classList.add("info");

      nodeSpan.appendChild(nodeA);
      nodeSpan.appendChild(document.createTextNode("."));
      nodeP.appendChild(nodeSpan);

      if (/^\/users\/\d+\/scripts/.test(gPATHNAME))
        contentNode.parentNode.insertBefore(nodeP, contentNode);
      else
        contentNode.insertBefore(nodeP, contentNode.firstChild);
    }

    addEventListener("resize", onViewportChange, false);
    addEventListener("scroll", onViewportChange, false);
    onViewportChange();
  }

  /**
   *
   */
  function firstValueOf(aMb, aKey, aPrefix) {
    if (aPrefix) {
      if (aMb[aPrefix] && aMb[aPrefix][aKey])
        return ((typeof aMb[aPrefix][aKey] == "string") ? aMb[aPrefix][aKey] : aMb[aPrefix][aKey][0]);
    }
    else {
      if (aMb[aKey])
        return ((typeof aMb[aKey] == "string") ? aMb[aKey] : aMb[aKey][0]);
    }

    return undefined;
  }

  /**
   *
   */
  function lastValueOf(aMb, aKey, aPrefix) {
    if (aPrefix) {
      if (aMb[aPrefix] && aMb[aPrefix][aKey])
        return ((typeof aMb[aPrefix][aKey] == "string") ? aMb[aPrefix][aKey] : aMb[aPrefix][aKey][aMb[aPrefix][aKey].length - 1]);
    }
    else {
      if (aMb[aKey])
        return ((typeof aMb[aKey] == "string") ? aMb[aKey] : aMb[aKey][aMb[aKey].length - 1]);
    }

    return undefined;
  }

  /**
   *
   */
  function toArray(aName, aMb) {
    if (aMb) {
      if (aMb[aName])
        return Array.isArray(aMb[aName]) ? aMb[aName] : [aMb[aName]];
    }
    else
      return [aName];

    return undefined;
  }

  /**
   *
   */
  function addValue(aValue, aName, aMb) {
    if (aMb[aName]) {
      aMb[aName] = toArray(aName, aMb);
      aMb[aName].push(aValue);
    }
    else
      aMb[aName] = aValue;

    return aMb[aName]; // TODO: Opt
  }

  /**
   *
   */
  function parseMeta(aString) {
    aString = aString.toString();
    let
        re = /\/\/ @(\S+)(?:\s+(.*))?/,
        headers = {},
        name, prefix, header, key, value,
        lines = aString.split(/[\r\n]+/).filter(function (e, i, a) {
          return (e.match(re));
        })
    ;
    for (let i = 0, line; line = lines[i++];) {
      [, name, value] = line.replace(/\s+$/, "").match(re);
      switch (name) {
        case "licence":
          name = "license";
          break;
      }
      [key, prefix] = name.split(/:/).reverse();
      if (key) {
        if (prefix) {
          if (!headers[prefix])
            headers[prefix] = new Object;
          header = headers[prefix];
        }
        else
          header = headers;

        if (header[key]) {
          if (!Array.isArray(header[key]))
            header[key] = new Array(header[key]);
          header[key].push(value || "");
        }
        else
          header[key] = value || "";
      }
    }
    if (headers["license"])
      headers["licence"] = headers["license"];

    return (headers.toSource() != "({})") ? headers : undefined;
  }

  /**
   *
   */
  function isViewing(thisNode) {
    if (!thisNode || thisNode.nodeType !== 1)
      return false;

    if (!gJSE || gmcHome.get("disableViewportHold"))
      return true; /** Work-around for !javascript.enabled issue **/

    let html, rect;
    html = document.documentElement;
    rect = thisNode.getBoundingClientRect(); // BUG: Needs gJSE to return meaningful values on FF 20+?

    return (
      !!rect
      && rect.top <= html.clientHeight
      && rect.right >= 0
      && rect.bottom >= 0
      && rect.left <= html.clientWidth
    );
  }

  /**
   *
   */
  function addToQspList(aQsp, aItem) {
    if (aItem)
      aQsp += (!aQsp) ? aItem : "," + aItem;
    return aQsp;
  }

  /**
   *
   */
  function appendToQs(aQs, aQsp) {
    if (aQsp)
      aQs += (!aQs) ? "?" + aQsp : "&" + aQsp;
    return aQs;
  }

  /**
   *
   */
  function nag(ev) {
    ev.preventDefault();

    if (!gmcHome.get("skipVerifyExclusion"))
      if (confirm('Are you sure?'))
        if (confirm('Are you really sure?'))
          if(confirm('Are you really, really sure?\n\nLast chance before impending doom?')) {
            ev.target.removeEventListener("click", nag, false);
            ev.target.click();
          }
  }

  /**
   *
   */
  function pingCount(ev) {
    let matches = ev.target.pathname.match(/(\d+)(?:\/\d+)?\.user\.js$/)
    if (matches) {
      let scriptId;
      [, scriptId] = matches;

      GM_xmlhttpRequest({
        retry: gRETRIES,
        url: "http" + ((/^https:$/i.test(gPROTOCOL) || gmcHome.get("forceInstallSecure")) ? "s" : "") + "://userscripts.org" + gPORTX + "/scripts/source/" + scriptId + ".user.js",
        method: "HEAD",
        onload: function(aR) {
          switch(aR.status) {
            case 403:
              if (gmcHome.get("enableDebugging"))
                console.warn('Recently unlisted script');
              break;
            case 404:
              if (gHALT404)
                this._retry = 0;
            case 500:
            case 502:
            case 503:
              if (gJSE && this.retry-- > 0)
                setTimeout(GM_xmlhttpRequest, gDELAYRETRYMIN + Math.round(Math.random() * (gDELAYRETRYMAX - gDELAYRETRYMIN)), this); // NOTE: Detached
              else {
                if (gmcHome.get("enableDebugging"))
                  console.warn('Unable to increment script count for update method: ' + xhr.status);
              }
              break;
            case 200:
              break;
          }
        }
      });

    }
  }
  /**
   *
   */
  function create(aNode, aScriptId, aMb, aProviders, aKU, aUsoCMethod) {

    let thisNode = aNode.parentNode;

    let userjsNode = thisNode.querySelector(".userjs");
    if (!userjsNode)
      return;

    GM_setStyle({
      node: gCSS,
      data:
        [
          "#install_script .userjs { font-size: 1.1em !important; }",
          "#install_script a.helpWith {",
          "  background: #5173d9 linear-gradient(to bottom, #92cae4, rgba(213,237,248,0)) repeat scroll 0 0;",
          "  border: 1px solid #999;",
          "  -moz-border-radius: 1em;",
          "  border-radius: 1em;",
          "  color: #fff;",
          "  float: right;",
          "  font-weight: bold;",
          "  height: 1.5em;",
          "  margin-top: 6px;",
          "  text-decoration: none;",
          "  width: 1.4em;",
          "}",
          "#install_script a.helpWith:hover { background: #ddd; }",
          "#install_script select.updateWith { height: 24px; font-size: 0.9em; width: 88%; border: 3px solid #888; }",
          "#install_script select.updateWith option.separator { border-top: thin dotted #666; }",
          "#install_script select.updateWith img { background: none no-repeat scroll center center transparent; height: 16px; margin: 0.25em 0.25em 0.25em 0; vertical-align: middle; width: 16px; }",
          "#install_script select.updateWith img.indent { margin-left: 0.6em; }"

        ].join("\n")
    });

    userjsNode.textContent = userjsNode.textContent + " with";

    let helpNode = thisNode.querySelector(".help");
    helpNode.classList.add("helpWith");
    helpNode.textContent = "?";

    let nodeImg = document.createElement("img");
    nodeImg.src = GM_getResourceURL("uso");

    let nodeText = document.createTextNode("userscripts.org (default)");

    let nodeOption = document.createElement("option");
    nodeOption.value = "uso";
    nodeOption.title = "Use native provider";

    let nodeSelect = document.createElement("select");
    nodeSelect.id = "provider_id";
    nodeSelect.classList.add("updateWith");
    nodeSelect.addEventListener("change", function (ev) {
      if (aKU)
        gmc.set("providerPref1", this.value);
      else
        gmc.set("providerPref2", this.value);

      gmc.write();

      switch (this.value) {
        case "uso":
          aNode.removeEventListener("click", pingCount, false);

          if (gISHOMEPAGE)
            gmc.close();

          aNode.href = "/scripts/source/" + aScriptId + ".user.js";
          if (gmcHome.get("forceInstallSecure"))
             aNode.protocol = "https:";

          if (gmcHome.get("forceInstallRecent")) {
            aNode.pathname = aNode.pathname
                .replace(/\/source\//, "/version/")
                .replace(/(\.user\.js)$/, "/" + lastValueOf(aMb, "version", "uso") + "$1");

            aNode.addEventListener("click", pingCount, false);
          }

          break;
        default:
          aNode.removeEventListener("click", pingCount, false);

          if (gISHOMEPAGE)
            gmc.close();

          let thisProvider, sname, qs, max, min;
          for (let i = 0, thisProvider; thisProvider = aProviders[i++];) {
            [,,,,, sname,, qs, max, min] = thisProvider;
            if (sname == this.value)
              break;
          }

          let origin, useBeta, mirrorDomain = gmcHome.get("mirrorDomain"), useSSL = (mirrorDomain == "secure");
            if (this.value == "usoCB") {
              useBeta = true;
              origin =  "http://beta.usocheckup.dune.net";
            }
            else {
              if (useSSL)
                origin = "https://secure.dune.net";
              else if (mirrorDomain == "primary")
                origin = "http://usocheckup.dune.net";
              else
                origin = "http://usocheckup.redirectme.net";
            }

          let pathname = (useSSL && !useBeta ? "/usocheckup/" : "/") + aScriptId + ".user.js";

          let search = "";
            search = appendToQs(search, /^usoC/.test(this.value) ? "": "updater=" + this.value);
            search = appendToQs(search, max ? max + "=" + gmc.get("updaterMaxage") : "");

            if (min && gmc.get("updaterMinage") != "1")
              search = appendToQs(search, min ? min + "=" + gmc.get("updaterMinage") : "");

            if (gmcHome.get("allowAOU"))
              search = appendToQs(search, "allow=aou");

            search = appendToQs(search, qs.replace(/\$1/, aScriptId));

            let
                atUsoAvatar = lastValueOf(aMb, "avatar", "uso"),
                atUsoIcontype = lastValueOf(aMb, "icontype", "uso"),
                iconQspList = ""
            ;
            iconQspList = addToQspList(iconQspList, atUsoAvatar);

            if (true && atUsoIcontype)
              iconQspList = addToQspList(iconQspList, atUsoIcontype);

            if (iconQspList)
              search = appendToQs(search, "icon=" + (gmc.get("useGravatarIcon") || gmc.get("useScriptIcon") ? "1," : "0,") + iconQspList);

          let hash = "#.user.js";

          aNode.href = origin + pathname + search + hash;

          /** Finish up gmc **/
          if (gISFRAMELESS && gISHOMEPAGE) {
            gmc.fields["useGravatarIcon"].settings.label = "<img style='margin-right: 0.5em;' src='http" + (/^https:$/i.test(gPROTOCOL) ? "s" : "") + "://www.gravatar.com/avatar/" + atUsoAvatar + "?r=pg&s=48&default=identicon' alt='Use this authors gravatar when available if not present' title='Use this authors gravatar when available if not present' />";
            gmc.fields["useScriptIcon"].settings.label = "<img src='" + gPROTOCOL + "//s3.amazonaws.com/uso_ss/icon/" + aScriptId + "/large." + atUsoIcontype + "'  alt='Favor this scripts USO icon when available if not present' title='Favor this scripts USO icon when available if not present'/>";

            gmc.open();

            if (max)
              gmc.fields["updaterMaxage"].node.parentNode.classList.remove("hid");
            else
              gmc.fields["updaterMaxage"].node.parentNode.classList.add("hid");

            if (min)
              gmc.fields["updaterMinage"].node.parentNode.classList.remove("hid");
            else
              gmc.fields["updaterMinage"].node.parentNode.classList.add("hid");

            if (/^usoC/.test(this.value)) {
              switch (this.value) {
                case "usoCOS":
                case "usoCbU":
                  gmc.fields["indirectMethod"].node.parentNode.classList.add("hid");
                  gmc.fields["directMethod"].node.parentNode.classList.add("hid");
                  break;
                case "usoCM":
                  if (aUsoCMethod) {
                    gmc.fields["indirectMethod"].node.parentNode.classList.add("hid");
                    gmc.fields["directMethod"].node.parentNode.classList.add("hid");
                  }
                  else {
                    gmc.fields["directMethod"].node.parentNode.classList.remove("hid");
                    gmc.fields["indirectMethod"].node.parentNode.classList.add("hid");
                  }
                  break;
                case "usoCOI":
                  gmc.fields["indirectMethod"].node.parentNode.classList.add("hid");
                  gmc.fields["directMethod"].node.parentNode.classList.remove("hid");
                  break;
                default:
                  gmc.fields["indirectMethod"].node.parentNode.classList.remove("hid");
                  gmc.fields["directMethod"].node.parentNode.classList.add("hid");
                  break;
              }
            }
            else {
              gmc.fields["indirectMethod"].node.parentNode.classList.add("hid");
              gmc.fields["directMethod"].node.parentNode.classList.add("hid");
            }
          }

          if (/^usoC/.test(this.value)) {
            switch (this.value) {
              case "usoCOS":
              case "usoCbU":
                aNode.search = aNode.search.replace(/method\=(?:show|install|update)/i, "method=show");
                break;
              case "usoCM":
                if (aUsoCMethod)
                  aNode.search = aNode.search.replace(/method\=(?:show|install|update)/i, "method=" + aUsoCMethod);
                else
                  aNode.search = aNode.search.replace(/method\=(?:show|install|update)/i, "method=" + gmc.get("directMethod"));

                if (/method\=update/.test(aNode.search))
                  aNode.addEventListener("click", pingCount, false);
                break;
              case "usoCOI":
                aNode.search = aNode.search.replace(/method\=(?:show|install|update)/i, "method=" + gmc.get("directMethod"));

                if (gmc.get("directMethod") == "update")
                  aNode.addEventListener("click", pingCount, false);
                break;
              default:
                aNode.search = aNode.search.replace(/method\=(?:show|install|update)/i, "method=" + gmc.get("indirectMethod"));

                if (gmc.get("directMethod") == "update")
                  aNode.addEventListener("click", pingCount, false);
                break;
            }
          }
          break;
      }
    }, false);

    nodeOption.appendChild(nodeImg);
    nodeOption.appendChild(nodeText);
    nodeSelect.appendChild(nodeOption);

    for (let i = 0, thisProvider; thisProvider = aProviders[i++];) {
      let stock, indent, icon, lname, separator, sname, tooltip;
      [stock, indent, icon, lname, separator, sname, tooltip] = thisProvider;

      nodeText = document.createTextNode(lname);

      nodeImg = document.createElement("img");
      nodeImg.src = /^http/.test(icon) ? icon : "http" + (/^https:$/i.test(gPROTOCOL) ? "s" : "") + "://www.gravatar.com/avatar/" + icon + "?r=PG&s=92&default=identicon";
      if (indent)
        nodeImg.classList.add("indent");

      nodeOption = document.createElement("option");
      nodeOption.value = sname;
      nodeOption.title = tooltip;
      if (separator)
        nodeOption.classList.add("separator");

      nodeOption.appendChild(nodeImg);
      nodeOption.appendChild(nodeText);

      if (stock)
        nodeSelect.insertBefore(nodeOption, nodeSelect.firstChild.nextSibling); // NOTE: Reversed order
      else if (!aKU)
        nodeSelect.appendChild(nodeOption);
    }

    thisNode.insertBefore(nodeSelect, helpNode);

    let providerPreference;

    if (aKU)
      providerPreference = gmc.get("providerPref1");
    else
      providerPreference = gmc.get("providerPref2");

    for (let i = 0, thatNode; thatNode = nodeSelect.options[i]; ++i)
      if (thatNode.value == providerPreference) {
        nodeSelect.selectedIndex = i;
        break;
      }

    let ev = new CustomEvent("change");
    nodeSelect.dispatchEvent(ev);
  }

  /**
   *
   */
  function advise(aSa, aNode, aMb, aEmbed, aReduce, aCollapse, aHide) {
    //if (gmcHome.get("enableDebugging")) {
      //console.groupCollapsed(JSON.stringify(aMb, null, " ")); // BUG: FF 27 doesn't collapse these
      //console.groupEnd();
    //}

    let
      title,
      max,
      deletedUser,
      advisories =
        [
          "ABORT",
          "SEVERE",
          "HIGH",
          "ELEVATE",
          "GUARD",
          "LOW",
          "XCLUDE",
          "EMBED",
          "UNKNOWN",
          "INFO"
        ]
    ;

    advisories.forEach(function (e, i, a) {
      if (aSa[e]) {
        if (!max)
          max = e;

        if (!title)
          title = e + ":";
        else
          title += "\n" + e + ":";

        title += "\n  " + aSa[e].join("\n  ");
      }

      let sa = Array.isArray(aSa[e]) ? aSa[e] : [aSa[e]], advisory;
      for (let i = 0, len = sa.length; advisory = sa[i++];) {

        // NOTE: Post actions
        if (e == "ABORT" && aSa[e] == "Deleted user") {
          aReduce = true;
          aCollapse = true;
          if (gmcHome.get("alwaysHideDeletedUser"))
            aNode.parentNode.classList.add("hid");
          else
            deletedUser = true;
        }
      }
    });


    if (max) {
      if (aEmbed)
        aNode.classList.add("saEMBED");

      aNode.classList.add("sa" + max);
      aNode.classList.add("sab" + max);
    }

    if (title)
      aNode.title = title;

    if (max == "INFO") {
      aNode.title = "UNKNOWN:\n  Undetermined\n" + aNode.title;
      pushAdvisory(aSa, "UNKNOWN", "Undetermined");
    }

    /** Sidebar **/
    if (gISHOMEPAGE) {
      let hookNode = document.getElementById("script_sidebar");
      if (hookNode) {

        GM_setStyle({
          node: gCSS,
          data:
            [
              "#script_sidebar h7 { display: block; font-weight: bold; }",
              "#script_sidebar h7 dl { margin-bottom: 0; font-size: 0.9em; }",
              "#script_sidebar h7 dt { font-weight: bold; padding: 0.25em 0.5em 0.5em 0.66em;  }",
              "#script_sidebar h7 dd { font-weight: normal; font-style: italic; padding-left: 0.5em; padding-right: 0.33em; }",

              ".advisories { background-image: linear-gradient(to top, #ddd, rgba(255,255,255,0)); border: thin solid #aaa !important; border-radius: 0.25em 0.25em; cursor: default; font-family: sans-serif; font-weight: normal !important; padding: 0.25em 0.75em; text-align: left; width: auto; }",
              ".advisories:hover { background-image: linear-gradient(to top, #bfe1ff, rgba(237,249,255,0)); }",
              ".advisories a { margin-top: -0.0625em; position: absolute; right: 0.5em; }",
              ".advisories img { max-height: 1.5em; }",

              ".barlight { background-color: #eee; }",
              ".barmedium { background-color: #ddd; }"
            ].join("\n")
        });

        advisories.reverse().forEach(function (e, i, a) {
          if (aSa[e]) {
            let nodeH7 = document.createElement("h7");
            nodeH7.textContent = e;
            hookNode.insertBefore(nodeH7, hookNode.firstChild);

            let nodeDiv = document.createElement("div");
            nodeDiv.classList.add("sa");

            for (let j = 0, thisSummary; thisSummary = aSa[e][j]; j++) {

              let thisDescription = thisSummary.split("\n").map(function (e) { return e.trim(); });

              let nodeDl = document.createElement("dl");

              let nodeDt = document.createElement("dt");
              nodeDt.textContent = thisDescription[0];
              if (j % 2 == 0)
                nodeDt.classList.add("barlight");

              for (let k = 1, thisClarification; thisClarification = thisDescription[k]; k++) {
                let nodeDd = document.createElement("dd");
                nodeDd.textContent = thisClarification;

                if (k % 2 == 1)
                  nodeDd.classList.add("barmedium");

                nodeDt.appendChild(nodeDd);
              }

              nodeDl.appendChild(nodeDt);
              nodeDiv.appendChild(nodeDl);
              nodeH7.appendChild(nodeDiv);
            }
          }
        });


        let nodeImg = document.createElement("img");
        nodeImg.src = GM_getResourceURL("icon");
        nodeImg.title = "uso - installWith";
        nodeImg.alt = "installWith";

        let nodeA = document.createElement("a");
        nodeA.href = "/scripts/show/68219";

        let nodeH6 = document.createElement("h6");
        nodeH6.classList.add("advisories");
        nodeH6.textContent = "Advisor";
        nodeH6.addEventListener("click", function () {
          gmcFilters.open();
          let aid = lastValueOf(aMb, "author", "uso");
          if (aid) {
            gmcFilters.fields["lastScriptWrightId"].node.value = lastValueOf(aMb, "author", "uso"); // NOTE: Watchpoint
            gmcFilters.fields["lastScriptWrightId"].node.title = lastValueOf(aMb, "name", "uso");
          }
          else
            gmcFilters.fields["lastScriptWrightId"].node.value = "";

          gmcFilters.fields["lastUserScriptId"].node.value = lastValueOf(aMb, "script", "uso");
          gmcFilters.fields["lastUserScriptId"].node.title = lastValueOf(aMb, "title", "uso");
        }, false);

        nodeA.appendChild(nodeImg);
        nodeH6.appendChild(nodeA);

        hookNode.insertBefore(nodeH6, hookNode.firstChild);
      }
    }
    else {
      if (aHide && !/(^\/users\/.+?\/scripts|^\/home\/scripts|^\/scripts\/show\/\d+)/.test(gPATHNAME))
        aNode.parentNode.classList.add("hid");

      let actionsNodeDiv = document.createElement("div");
      actionsNodeDiv.classList.add("actions");

      aNode.insertBefore(actionsNodeDiv, aNode.firstChild);

      let titleNode, descNode;
      if (aMb) {
        titleNode = aNode.querySelector(".title");
        if (titleNode) {

          if (aCollapse) {
            titleNode.classList.add("dim");
            if (deletedUser)
              titleNode.classList.add("delusr");
          }

          let
            maxLength = 50, // NOTE: Watchpoint
            atName = lastValueOf(aMb, "name"),
            atUsoScript = lastValueOf(aMb, "script", "uso"),
            title = titleNode.textContent
          ;

          let filterNodeA = document.createElement("a");
          filterNodeA.classList.add("action");
          filterNodeA.href = "#";
          filterNodeA.textContent = "advisor";
          filterNodeA.addEventListener("click", function (ev) {
            ev.preventDefault();

            gmcFilters.open();

            let aid = lastValueOf(aMb, "author", "uso");
            if (aid) {
              gmcFilters.fields["lastScriptWrightId"].node.value = lastValueOf(aMb, "author", "uso"); // NOTE: Watchpoint
              gmcFilters.fields["lastScriptWrightId"].node.title = lastValueOf(aMb, "name", "uso");
            }
            else
              gmcFilters.fields["lastScriptWrightId"].node.value = "";

            gmcFilters.fields["lastUserScriptId"].node.value = lastValueOf(aMb, "script", "uso");
            gmcFilters.fields["lastUserScriptId"].node.title = lastValueOf(aMb, "title", "uso");
          }, false);

          let sourceNodeA = document.createElement("a");
          sourceNodeA.classList.add("action");
          sourceNodeA.href = "/scripts/review/" + atUsoScript;
          sourceNodeA.textContent = "source";

          actionsNodeDiv.appendChild(sourceNodeA);
          actionsNodeDiv.appendChild(filterNodeA);

          if (atName) {
            let matches = title.match(/(.*)\.\.\.$/);
            if (matches && atName.length > maxLength)
              title = matches[1].trim();

            let
                titlex = title.substr(0, maxLength).trim(),
                atNamex = atName.substr(0, titlex.length)
            ;
            if (atNamex != titlex) {
              titleNode.title = "@name " + atName;

              if (titlex.replace("\u200d", "", "g").trim() == "") { // NOTE: Watchpoint
                titleNode.textContent = atName;
                titleNode.classList.add("halb");
              }
              else
                titleNode.classList.add("blah");
            }
            else
              titleNode.title = "@name " + titleNode.title.trim();
          }
        }

        descNode = aNode.querySelector(".desc");
        if (descNode) {
          let
              maxLength = 250, // NOTE: Watchpoint
              atDescription = lastValueOf(aMb, "description"),
              desc = descNode.textContent
          ;
          if (atDescription) {
            let matches = desc.match(/(.*)\.\.\.$/);
            if (matches && atDescription.length > maxLength)
              desc = matches[1].trim();

            let
                descx = desc.substr(0, maxLength).toLowerCase().trim(),
                atDescriptionx = atDescription.substr(0, descx.length).toLowerCase()
            ;
            if (atDescriptionx != descx) {
              descNode.classList.add("blah");
              descNode.title = "@description " + atDescription;
            }
            else
              descNode.title = "@description " + atDescription;
          }
          else {
            descNode.classList.add("blah");
            descNode.title = "undefined @description";
          }
        }
      }

      let nodeImg = document.createElement("img");
      nodeImg.classList.add("more");
      nodeImg.src = GM_getResourceURL("clear");
      nodeImg.alt = "hide";
      nodeImg.addEventListener("click", unhideClick, false);

      actionsNodeDiv.appendChild(nodeImg);


      if (!/^(?:\/home\/scripts|\/users\/.+?\/scripts)/.test(gPATHNAME)) {
        let bylineNodeDiv = document.createElement("div");
        bylineNodeDiv.classList.add("byline");
        if (aCollapse) {
          bylineNodeDiv.classList.add("pus");
          if (!gmcHome.get("alwaysShowAuthorId"))
            bylineNodeDiv.classList.add("hid");
          else
            bylineNodeDiv.classList.add("dim");
        }

        if (descNode)
          aNode.insertBefore(bylineNodeDiv, descNode);
        else
          aNode.appendChild(bylineNodeDiv);

        if (aMb) {
          let
            atUsoAuthor = lastValueOf(aMb, "author", "uso"),
            atUsoName = lastValueOf(aMb, "name", "uso"),
            atUsoVanity = lastValueOf(aMb, "vanity", "uso")
          ;

          if ((atUsoVanity && atUsoName) || atUsoAuthor) {
            bylineNodeDiv.appendChild(document.createTextNode("By "));

            if (atUsoVanity && atUsoName) {
              let vanityNodeA = document.createElement("a");
              vanityNodeA.href = "/users/" + atUsoVanity;
              vanityNodeA.textContent = atUsoName;

              bylineNodeDiv.appendChild(vanityNodeA);
            }

            if (atUsoAuthor) {
              bylineNodeDiv.appendChild(document.createTextNode(" ("));

              let authorNodeA = document.createElement("a");
              authorNodeA.href = "/users/" + atUsoAuthor;
              authorNodeA.textContent = atUsoAuthor;

              bylineNodeDiv.appendChild(authorNodeA);

              bylineNodeDiv.appendChild(document.createTextNode(")"));
            }

          }
        }
      }

      if (aReduce) {
        nodeImg.classList.remove("more");
        nodeImg.classList.add("less");
        nodeImg.alt = "show";

        if (descNode)
          descNode.classList.add("hid");

        qNodes(gANODES);
      }
    }

  }

  /**
   *
   */
  function pushAdvisory(aSa, aAdvisory, aComment) {
    aComment = toArray(aComment);

    if (!aSa[aAdvisory])
      aSa[aAdvisory] = new Array();

    for (let i = 0, comment; comment = aComment[i++];) {
      let found;
      for (let j = 0, commented; commented = aSa[aAdvisory][j++];)
        if (comment == commented)
          found = true;

      if (!found)
        aSa[aAdvisory].push(comment);
    }
  }

  /**
   *
   */
  function validateAOU(aURL, aScriptId, aRe1, aRe2, aCb) {
    let matches = aURL.match(aRe1), match, REL;
    if (matches) {
      REL = true;
      [, match] = matches;

      aURL = gPROTOCOL + "//" + gHOSTNAME + "/scripts/source/" + match;
    }

    let protocols = aURL.match(/^(\w+:)/), protocol;
    if (protocols) {
      [, protocol] = protocols;

      let SSL, sid, source, ISI, DDS, RHV, BT;
      switch (protocol) {
        case "https:":
          SSL = true;
        case "http:":
          let matches = aURL.match(aRe2);
          if (matches) {
            let sid, source;
            [, sid, source] = matches;

            if (sid != aScriptId)
              ISI = true;

            if (source && source != "meta")
              DDS = true;
          }
          else {
            if (/^https?:\/\/userscripts.org(?::\d{1,5})?\/scripts\/\w+\/\d+.*\.(?:user|meta)\.js/.test(aURL))
              BT = true;
            else
              RHV = true;
          }
          break;
      }

      aCb(REL, SSL, ISI, RHV, BT, DDS);
    }
  }

  /**
   *
   */
  function parseList(aGroups, aCb) {
    for (let group in aGroups) {
      let scopes = aGroups[group]; // NOTE: Watchpoint
      for (let scope in scopes) {
        let target = scopes[scope];

        for (let i = 0, len = target.length; i < len;) {
          let
              abstract,
              patterns,
              patternsx = {}
          ;
          [abstract, patterns] = [target[i], typeof target[i + 1] != "undefined" ? target[i + 1] : undefined];

          ++i;
          let
              advisory,
              summary
          ;
          if (typeof abstract == "string")
            [, advisory, summary] = abstract.match(/(\w+) (.*)/);
          else
            continue;


          ++i;
          if (typeof patterns == "object") {
            if (Array.isArray(patterns)) {
              if (typeof patterns[0] != "string")
                continue;

              for (let i = 0, pattern; pattern = patterns[i++];)
                patternsx[pattern] = "";
            }
            else
              patternsx = patterns;
          }
          else
            continue;

          let j = 0, tips, provider, collector, block, reduce, collapse, hide;
          for (; target[i + j] && typeof target[i + j] != "string"; ++j) {
            let optflag = target[i + j];

            if (!!optflag[0]) {
              let verb;
              [, verb] = optflag;

              switch (verb) {
                case "tip": // `tip1,tip2,...`
                  let comments;
                  [,, comments] = optflag;

                  if (typeof comments == "string")
                    tips = comments.split(",");

                  break;
                case "provide":
                  optflag.shift();
                  optflag.shift();

                  // NOTE: No validation

                  provider = optflag;

                  break;
                case "collect":
                  optflag.shift();
                  optflag.shift();

                  // NOTE: No validation

                  collector = optflag;

                  break;
                case "block":
                  block = true;
                  break;
                case "reduce":
                  reduce = true;
                  break;
                case "collapse":
                  collapse = true;
                  break;
                case "hide":
                  hide = true;
                  break;
              }
            }

          }

          i += (j - 1);

          aCb(scope, patternsx, advisory, summary, tips, block, reduce, collapse, hide, provider, collector);
        }

      }
    }
  }

  /**
   *
   */
  function unhideClick(ev) {
    ev.preventDefault();

    let targetNode = ev.target;

    if (targetNode.classList.contains("less")) {
      targetNode.classList.remove("less");
      targetNode.classList.add("more");
      targetNode.alt = "hide";
    }
    else {
      targetNode.classList.remove("more");
      targetNode.classList.add("less");
      targetNode.alt = "show";
    }

    let requeue;

    let descNode = targetNode.parentNode.parentNode.querySelector(".desc");
    if (descNode) {

      if (!descNode.classList.contains("hid")) {
        descNode.classList.add("hid");
        requeue = true;
      }
      else
        descNode.classList.remove("hid");
    }
    else {
      if (gmcHome.get("enableDebugging"))
        console.error("Description node not found");
    }

    let bylineNode = targetNode.parentNode.parentNode.querySelector(".byline");
    if (bylineNode) {
      if (!gmcHome.get("alwaysShowAuthorId") && !bylineNode.classList.contains("hid") && bylineNode.classList.contains("pus")) {
        bylineNode.classList.add("hid");
        requeue = true;
      }
      else
        bylineNode.classList.remove("hid");
    }
    else {
      if (gmcHome.get("enableDebugging"))
        console.warn("Byline node not found");
    }

    if (requeue)
      qNodes(gANODES);
  }

  /**
   *
   */
  function parse(aSa, aNode, aScriptId, aMb, aSource) {
    let
        block,
        lib,

        KU,
        usoCMethod,
        ISI,
        DDS,
        RHV,
        BT,
        RN,
        REL,
        SSL,

        EMBED,

        REDUCE,
        COLLAPSE,
        HIDE
    ;

    let excludes = toArray("exclude", aMb);
    if (excludes)
      for (let i = 0, exclude; exclude = excludes[i++];) {
        if (exclude == "*") {
          pushAdvisory(aSa, "XCLUDE", "Possible library support file detected");
          block = true;
          lib = true;

          if (gISHOMEPAGE && !gmcHome.get("skipVerifyExclusion"))
            aNode.addEventListener("click", nag, false);

          break;
        }
      }

    let updateURL = lastValueOf(aMb, "updateURL");
    if (updateURL)
      validateAOU(
        updateURL,
        aScriptId,
        /^(\d+.*\.(?:meta|user)\.js)$/,
        /^https?:\/\/(?:.*\.)?userscripts\.org(?::\d{1,5})?\/scripts\/source\/(\d+).*\.(meta|user)\.js/,
        function (aREL, aSSL, aISI, aRHV, aBT, aDDS) {
          if (aISI) { ISI = true; REDUCE = true; }
          if (aREL) REL = true;
          if (aSSL) SSL = true;
          if (aRHV) RHV = true;
          if (aBT) BT = true;
          if (aDDS) DDS = true;
        }
      );

    let
        downloadURL = lastValueOf(aMb, "downloadURL"),
        installURL = lastValueOf(aMb, "installURL")
    ;
    [
      installURL,
      downloadURL

    ].forEach(function (e, i, a) {
      if (e)
        validateAOU(
          e,
          aScriptId,
          /^(\d+.*\.user\.js)$/,
          /^https?:\/\/(?:.*\.)?userscripts\.org(?::\d+)?\/scripts\/source\/(\d+).*\.user\.js/,
          function (aREL, aSSL, aISI, aRHV, aBT) {
            if (aISI) { ISI = true; REDUCE = true; }
            if (aREL) REL = true;
            if (aSSL) SSL = true;
            if (aRHV) RHV = true;
            if (aBT) BT = true;
          }
        );
    });

    let grants = toArray("grant", aMb);
    if (grants)
      for (let i = 0, grant; grant = grants[i++];) {
        if (grant == "none") {
          block = (lib) ? block : !gmcHome.get("allowUpdatersOnAOUgrantnone");
          RN = (lib) ? RN : true;
          break;
        }
      }

    let
        atRequires = toArray("require", aMb),
        atIncludes = toArray("include", aMb),
        atMatches = toArray("match", aMb),
        atUsoScript = lastValueOf(aMb, "script", "uso"),
        atUsoAuthor = lastValueOf(aMb, "author", "uso"),
        atUsoTitle = lastValueOf(aMb, "title", "uso"),
        atUsoDesc = lastValueOf(aMb, "desc", "uso"),
        providers = []
    ;

    let rewrite, json, GROUPS;

    try {  // TODO: Watchpoint
      GROUPS = JSON.parse(gLIST + '}');

      let jsonFilters = gmcFilters.get("jsonFilters");
      json = JSON.parse(jsonFilters);

      gGROUPS = JSON.parse(gLIST + ',"user":{' + jsonFilters.replace(/^[\n\r\s]*\{/, '') + '}');
    }
    catch (e) {
      if (gmcHome.get("enableDebugging"))
        console.warn('JSON parsing error...skipping user advisories');

      gGROUPS = JSON.parse(gLIST + '}');
    }


    parseList(gGROUPS, function (aScope, aPatterns, aAdvisory, aSummary, aTips, aBlock, aReduce, aCollapse, aHide, aProvider, aCollector) {
      for (let pattern in aPatterns) {

        let matches = pattern.match(/^\/(.*)\/(i?g?m?y?)$/), patternx = pattern;
        if (matches)
          patternx = new RegExp(matches[1].replace(/\$1/, aScriptId), matches[2]);

        if (aScope == "updater" && atRequires)
          for (let i = 0, atRequire; atRequire = atRequires[i++];) {
            let matches = (typeof patternx == "object") ? atRequire.match(patternx) : (atRequire == patternx) ? [atRequire, patternx] : null;
            if (matches) {
              if (/usocheckup/.test(matches[0])) {
                let matches = atRequire.match(/method\=(\w+)/);
                if (matches)
                  usoCMethod = matches[1];
                else
                  usoCMethod = "show";
              }

              let sid = matches[1];
              if (sid == aScriptId || sid == null) {
                pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));
                KU = true;
              }
              else {
                pushAdvisory(aSa, "SEVERE", aSummary + "\n    Possible malformed updater syntax");
                REDUCE = true;
                block = true;
                break;
              }
            }

          }

        if (aScope == "@include" && atMatches)
          for (let i = 0, atMatch; atMatch = atMatches[i++];)
            if (atMatch.search(patternx) > -1) {
              pushAdvisory(aSa, aAdvisory, aSummary);
              if (aReduce) REDUCE = true;
              break;
            }

        if (aScope == "@include" && atIncludes) {
          for (let i = 0, atInclude; atInclude = atIncludes[i++];)
            if (atInclude.search(patternx) > -1) {
              pushAdvisory(aSa, aAdvisory, aSummary);
              if (aReduce) REDUCE = true;
              break;
            }
        }
        else if (!atMatches && !atIncludes && !lib ) {
          REDUCE = true;
          pushAdvisory(aSa, "ELEVATE", "Possible implicit global web inclusion");
        }

        if (/^\@uso:author(?:$|\s)/.test(aScope) && atUsoAuthor)
          if (atUsoAuthor.search(patternx) > -1) {
            if (aSummary == "Potentially unwanted script") {
              block = true;
              REDUCE = true;
              COLLAPSE = true;
              if (gmcHome.get("alwaysHidePus"))
                HIDE = true;
            }

            pushAdvisory(aSa, aAdvisory, aSummary + (aTips ? "\n      " + aTips.join("\n      ") : ""));
            if (aBlock)
              block = true;

            if (aReduce)
              REDUCE = true;

            if (aCollapse)
              COLLAPSE = true;
          }

        if (/^\@uso:script(?:$|\s)/.test(aScope) && atUsoScript)
          if (atUsoScript.search(patternx) > -1) {
            if (aSummary == "Potentially unwanted script") {
              block = true;
              REDUCE = true;
              COLLAPSE = true;
              if (gmcHome.get("alwaysHidePus"))
                HIDE = true;
            }

            pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));
            if (aBlock)
              block = true;

            if (aReduce)
              REDUCE = true;

            if (aCollapse)
              COLLAPSE = true;
          }

        if (aScope == "@uso:title" && atUsoTitle) {
          if (atUsoTitle.search(patternx) > -1) {
            if (aSummary == "Potentially unwanted script") {
              block = true;
              REDUCE = true;
              COLLAPSE = true;
              if (gmcHome.get("alwaysHidePus"))
                HIDE = true;
            }

            pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));
            if (aBlock)
              block = true;

            if (aReduce)
              REDUCE = true;

            if (aCollapse)
              COLLAPSE = true;

            if (json && aCollector && !/^(?:\/home\/scripts|\/users\/.+?\/scripts|\/scripts\/show\/\d+)/.test(gPATHNAME)) {
              let scope, advisorysummary;
              [scope, advisorysummary] = aCollector;

              let collect, id;
              switch (scope) {
                case "@uso:author":
                  collect = true;
                  id = atUsoAuthor;
                  break;
              }

              if (collect && id) {
                if (!json[scope]) {
                  json[scope] = [advisorysummary, []];
                  rewrite = true;
                }

                let found, ids = json[scope][1]; // TODO:
                ids.forEach(function (e, i, a) {
                  if (e == id)
                    found = true;
                });

                if (!found && json[scope + " (private)"]) {
                  ids = json[scope + " (private)"][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found && GROUPS && GROUPS["collections"][scope]) {
                  ids = GROUPS["collections"][scope][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found) {
                  json[scope][1].push(id); // TODO:
                  rewrite = true;
                }
              }

            }


          }
        }

        if (aScope == "@uso:desc" && atUsoDesc) {
          if (atUsoDesc.search(patternx) > -1) {
            if (aSummary == "Potentially unwanted script") {
              block = true;
              REDUCE = true;
              COLLAPSE = true;
              if (gmcHome.get("alwaysHidePus"))
                HIDE = true;
            }

            pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));
            if (aBlock)
              block = true;

            if (aReduce)
              REDUCE = true;

            if (aCollapse)
              COLLAPSE = true;

            if (json && aCollector && !/^(?:\/home\/scripts|\/users\/.+?\/scripts|\/scripts\/show\/\d+)/.test(gPATHNAME)) {
              let scope, advisorysummary;
              [scope, advisorysummary] = aCollector;

              let collect, id;
              switch (scope) {
                case "@uso:author":
                  collect = true;
                  id = atUsoAuthor;
                  break;
              }

              if (collect && id) {
                if (!json[scope]) {
                  json[scope] = [advisorysummary, []];
                  rewrite = true;
                }

                let found, ids = json[scope][1]; // TODO:
                ids.forEach(function (e, i, a) {
                  if (e == id)
                    found = true;
                });

                if (!found && json[scope + " (private)"]) {
                  ids = json[scope + " (private)"][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found && GROUPS && GROUPS["collections"][scope]) {
                  ids = GROUPS["collections"][scope][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found) {
                  json[scope][1].push(id); // TODO:
                  rewrite = true;
                }
              }

            }
          }
        }

        if (aScope == "updaterEmbed" && aSource) {
          if (aSource.search(patternx) > -1 && aScriptId != 68219 && aScriptId != 69307) {
            EMBED = true;
            pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));
          }
        }

        if (aScope == "search" && aSource) {
          if (aSource.search(patternx) > -1) {
            if (aSummary == "Potentially unwanted script") {
              block = true;
              REDUCE = true;
              COLLAPSE = true;
              if (gmcHome.get("alwaysHidePus"))
                HIDE = true;
            }

            pushAdvisory(aSa, aAdvisory, aSummary + (aPatterns[pattern] ? " " + aPatterns[pattern] : "") + (aTips ? "\n      " + aTips.join("\n      ") : ""));

            if (aReduce)
              REDUCE = true;

            if (json && aCollector && !/^(?:\/home\/scripts|\/users\/.+?\/scripts|\/scripts\/show\/\d+)/.test(gPATHNAME)) {
              let scope, advisorysummary;
              [scope, advisorysummary] = aCollector;

              let collect, id;
              switch (scope) {
                case "@uso:author":
                  collect = true;
                  id = atUsoAuthor;
                  break;
              }

              if (collect && id) {
                if (!json[scope]) {
                  json[scope] = [advisorysummary, []];
                  rewrite = true;
                }

                let found, ids = json[scope][1]; // TODO:
                ids.forEach(function (e, i, a) {
                  if (e == id)
                    found = true;
                });

                if (!found && json[scope + " (private)"]) {
                  ids = json[scope + " (private)"][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found && GROUPS && GROUPS["collections"][scope]) {
                  ids = GROUPS["collections"][scope][1]; // TODO:
                  ids.forEach(function (e, i, a) {
                    if (e == id)
                      found = true;
                  });
                }

                if (!found) {
                  json[scope][1].push(id); // TODO:
                  rewrite = true;
                }
              }

            }

          }
        }

        if (aProvider)
          providers.push(aProvider);

      }

    });

    if (json && rewrite) {
      json["@uso:author"][1].sort(function (a, b) { return a - b });
      gmcFilters.set("jsonFilters", JSON.stringify(json, null, "")); // TODO:
      gmcFilters.write();
    }

    /** **/
    let
        msgDDS = "AOU\n    Possible DDoS attack script and/or Privacy Loss",
        msgRHV = "AOU\n    Possible Remotely Hosted Version or bad target",
        msgBT =  "AOU\n    Possible bad target and/or Privacy Loss",
        msgISI = "AOU\n    Possible incorrect scriptid applied for updates",
        msgRN = "Restricted (content scope) namespace script"
    ;

    if (DDS)
      pushAdvisory(aSa, "SEVERE", msgDDS);
    if (RHV)
      pushAdvisory(aSa, "HIGH", msgRHV);
    if (BT)
      pushAdvisory(aSa, "HIGH", msgBT);
    if (RN)
      pushAdvisory(aSa, "ELEVATE", msgRN);
    if (ISI)
      pushAdvisory(aSa, "SEVERE", msgISI);

    if (KU && RN) {
      pushAdvisory(aSa, "ABORT", "Known updater and restricted (content scope) namespace are incompatible");
      block = true;
    }

    advise(aSa, aNode, aMb, EMBED, REDUCE, COLLAPSE, HIDE);

    if (/^\/(?:scripts|topics)\//.test(gPATHNAME)) {
      if (block || (gmcHome.get("allowAOU") && (DDS || RHV || BT)) || (gmcHome.get("allowAOU") && ISI) || aMb["uso"]["unlisted"] == "") {
        if (gmcHome.get("forceInstallSecure"))
          aNode.protocol = "https:";

        if (gmcHome.get("forceInstallRecent"))
          aNode.pathname = aNode.pathname
              .replace(/\/source\//, "/version/")
              .replace(/(\.user\.js)$/, "/" + lastValueOf(aMb, "version", "uso") + "$1");
      }
      else
        create(aNode, atUsoScript, aMb, providers, KU, usoCMethod);
    }
  }

  /**
   *
   */
  function unitSizer(aNumber) {
    if (typeof aNumber == "string")
      aNumber = parseInt(aNumber);

    return (
      (aNumber >= 1024)
          ? (aNumber >= 1048576)
              ? parseInt(aNumber / 1024 / 1024 * 100) / 100 + " MiB"
              : parseInt(aNumber / 1024 * 100) / 100 + " KiB"
          : aNumber + " B"
    );
  }

  /**
   *
   */
  function onError() { // NOTE: GM BUG with aR so don't use

    if (gmcHome.get("enableNabAuthorId")) {
      let contentNode = document.getElementById("content");
      if (contentNode) {

        let loginMsgNode = contentNode.querySelector("p.notice a[href$=login]");
        if (!loginMsgNode && !gLoginTried) {
          gLoginMsgShown = true;

          let nodeP;

          if (document.body.classList.contains("anon") && gmcHome.get("enableNabAuthorId")) {
            let loginNodeA = document.createElement("a");
            loginNodeA.href = "/login";
            loginNodeA.textContent = "login";

            let installWithNodeA = document.createElement("a");
            installWithNodeA.href = "/scripts/show/68219";
            installWithNodeA.textContent = "installWith";

            let nodeSpan = document.createElement("span");
            nodeSpan.textContent = "You may be able to reduce your bandwidth usage with a visit to the ";

            nodeP = document.createElement("p");
            nodeP.classList.add("notice");
            nodeP.classList.add("info");

            nodeSpan.appendChild(loginNodeA);
            nodeSpan.appendChild(document.createTextNode(" page while using "));
            nodeSpan.appendChild(installWithNodeA);
            nodeSpan.appendChild(document.createTextNode("."));

            nodeP.appendChild(nodeSpan);

            if (/^\/users\/\d+\/scripts/.test(gPATHNAME))
              contentNode.parentNode.insertBefore(nodeP, contentNode);
            else
              contentNode.insertBefore(nodeP, contentNode.firstChild);
          }

          if (gmcHome.get("enableAutoSession")) {
            gLoginTrying = true;

            GM_xmlhttpRequest({
              retry: gRETRIES,
              url: "http" + ((/^https:$/i.test(gPROTOCOL) || gmcHome.get("forceInstallSecure")) ? "s" : "") + "://userscripts.org" + gPORTX + "/login",
              method: "HEAD",
              onload: function (aR) {
                switch(aR.status) {
                  case 404:
                    if (gHALT404)
                      this._retry = 0;
                  case 500:
                  case 502:
                  case 503:
                    if (gJSE && this.retry-- > 0)
                      setTimeout(GM_xmlhttpRequest, gDELAYRETRYMIN + Math.round(Math.random() * (gDELAYRETRYMAX - gDELAYRETRYMIN)), this); // NOTE: Detached
                    else {
                      if (gmcHome.get("enableDebugging"))
                        console.warn('Unable to establish session');
                    }
                    break;
                  case 200:
                    gBYTESMIN = undefined;
                    gLoginTried = true;
                    gLoginTrying = false;
                    break;
                  default:
                    if (gmcHome.get("enableDebugging"))
                      console.warn('Untrapped status code: ' + aR.status);
                    break;
                }
              }
            });
          }

        }
      }
      gBYTESMIN = 0; // NOTE: Watchpoint
      gBYTESMAX = parseInt(gBYTESMAX / gANONDIVISOR);
    }

    gIdle = true;
    onViewportChange();
  }

  /**
   *
   */
  function onLoad(aR) {
    switch (aR.status) {
      case 404:
        if (gHALT404)
          this._retry = 0;
      case 500:
      case 502:
      case 503:
        if (gJSE && this._retry-- > 0)
          setTimeout(GM_xmlhttpRequest, gDELAYRETRYMIN + Math.round(Math.random() * (gDELAYRETRYMAX - gDELAYRETRYMIN)), this); // NOTE: Detached
        else {
          if (/\.meta\.js$/.test(this.url)) {
            pushAdvisory(this._sa, "ABORT", "Unable to retrieve script metadata");

            this._mb = {};
            this._mb["uso"] = {};
            this._mb["uso"]["script"] = this._scriptId;
          }
          else if (/\.user\.js$/.test(this.url))
            pushAdvisory(this._sa, "ABORT", "Unable to retrieve script source");
          else
            pushAdvisory(this._sa, "UNKNOWN", "Unable to retrieve authorship");

          advise(this._sa, this._node, this._mb);

          this._node.classList.remove("saB");
          gQNODES.shift();
          xhr.call(gTHIS, this);
        }
        break;
      case 200:
      case 206:
        if (/\.meta\.js$/.test(this.url)) {

          this._mb = parseMeta(aR.responseText);
          if (!this._mb) {
            pushAdvisory(this._sa, "ABORT", "Unable to retrieve script metadata");
            advise(this._sa, this._node, this._mb);

            this._node.classList.remove("saB");
            gQNODES.shift();
            xhr.call(gTHIS, this);
            return;
          }

          let pageMetaVersion = document.querySelector("meta[name='uso:version']");
          if (pageMetaVersion && gISHOMEPAGE)
            if (lastValueOf(this._mb, "version", "uso") != pageMetaVersion.content) {
              pushAdvisory(this._sa, "ABORT", "meta.js @uso:version and page @uso:version DO NOT MATCH");
              advise(this._sa, this._node, this._mb);

              this._node.classList.remove("saB");
              gQNODES.shift();
              xhr.call(gTHIS, this);
              return;
            }

          if (lastValueOf(this._mb, "script", "uso") != this._scriptId) {
            pushAdvisory(this._sa, "SEVERE", "Malformed metadata block");

            addValue(this._scriptId, "script", this._mb["uso"]);
          }

          /** Create phantom key(s) if detected **/
          if (this._node.classList.contains("userjs")) {
            if (/\?token=/.test(this._node))
              this._mb["uso"]["unlisted"] = "";
          }
          else {
            let emNode = this._node.querySelector("em");
            if (emNode && emNode.textContent == "unlisted")
              this._mb["uso"]["unlisted"] = "";
          }

          let titleNode = this._node.querySelector(".title") || this._node.parentNode.parentNode.querySelector(".title");
          if (titleNode)
            addValue(titleNode.textContent, "title", this._mb["uso"]);
          else
            addValue("", "title", this._mb["uso"]);

          let descNode = this._node.querySelector(".desc");
          if (descNode)
            addValue(descNode.textContent, "desc", this._mb["uso"]);
          else {
            let summaries = document.querySelectorAll("#root #content .script_summary");
            for (let i = 0, thisNode; thisNode = summaries[i++];) {
              let bNode = thisNode.querySelector("p b");
              if (bNode && bNode.textContent.match(/^Script\sSummary\:$/i)) {
                descNode = bNode.nextSibling;

                addValue(descNode.textContent.replace(/^[\r\n]/, "").replace(/[\r\n]$/, ""), "desc", this._mb["uso"]);
              }
            }
          }
          if (!descNode)
            addValue("", "desc", this._mb["uso"]);

          let user_idNode = document.body.querySelector("#heading .author a");
          if (user_idNode) {
            addValue(user_idNode.getAttribute("user_id"), "author", this._mb["uso"]);
            addValue(user_idNode.textContent, "name", this._mb["uso"]);

            let matches = user_idNode.getAttribute("gravatar").match(/^.+?(?:gravatar_id\=(.+?)|\/avatar\/(.+?))[\?\&]/);
            if (matches)
              addValue(matches[1] || matches[2], "avatar", this._mb["uso"]);
            else
              addValue("", "avatar", this._mb["uso"]);
          }
          else if (/^\/users\/.+?\/scripts/.test(gPATHNAME)) {
            user_idNode = document.querySelector("#section .container h2 a"); //document.querySelector(".avatar a");
            if (user_idNode) {
              let aid = user_idNode.pathname.match(/\/(\d+)$/);
              if (aid) {
                addValue(aid[1], "author", this._mb["uso"]);
                addValue(user_idNode.textContent, "name", this._mb["uso"]);

                let gravatarNode = document.querySelector(".avatar a img");
                if (gravatarNode) {
                  let gid = gravatarNode.src.match(/^.+?(?:gravatar_id\=(.+?)|\/avatar\/(.+?))[\?\&]/);
                  if (gid)
                    addValue(gid[1] || gid[2], "avatar", this._mb["uso"]);
                }
                else
                  addValue("", "avatar", this._mb["uso"]);
              }
              else {
                addValue("", "author", this._mb["uso"]);
                addValue("", "name", this._mb["uso"]);
                addValue("", "avatar", this._mb["uso"]);
              }
            }
            else {
              addValue("", "author", this._mb["uso"]);
              addValue("", "name", this._mb["uso"]);
              addValue("", "avatar", this._mb["uso"]);
            }
          }
          else {
            addValue("", "author", this._mb["uso"]);
            addValue("", "name", this._mb["uso"]);
            addValue("", "avatar", this._mb["uso"]);
          }


          let iconNode = document.getElementById("icon");
          if (iconNode) {
            let matches = iconNode.pathname.match(/\.(\w+)$/);
            if (matches) {
              addValue(matches[1], "icontype", this._mb["uso"]);
            }
            else
              addValue("", "icontype", this._mb["uso"]);
          }
          else
            addValue("", "icontype", this._mb["uso"]);

          addValue(aR.responseText.length.toString(), "metajssize", this._mb["uso"]);

          let stats = [];

          let matches = aR.responseText.match(/\n/g); // NOTE: Meta should always have at least one newline
          if (matches) {
            addValue((matches.length + 1).toString(), "metajslines", this._mb["uso"]);
            stats.push(unitSizer(lastValueOf(this._mb, "metajssize", "uso")) + " with " + lastValueOf(this._mb, "metajslines", "uso") + " lines");
          }

          let ws, nws;
          matches = aR.responseText.match(/\s/g);
          if (matches) {
            ws = matches.length;
            addValue(ws.toString(), "metajsws", this._mb["uso"]);
          }

          matches = aR.responseText.match(/\S/g);
          if (matches) {
            nws = matches.length;
            addValue(nws.toString(), "metajsnws", this._mb["uso"]);
          }

          stats.push(parseInt(ws / (ws + nws) * 10000) / 100 + "% whitespace");

          pushAdvisory(this._sa, "INFO", "Raw meta.js\n    " + stats.join("\n    "));

          /** **/
          if (this._mb["uso"]["unlisted"] == "") // NOTE: Self unlisting phantom if present
            pushAdvisory(this._sa, "ELEVATE", "Unlisted script");

          if ((
              /^\/$/.test(gPATHNAME) && gmcHome.get("scanMainDepth") == "deep" ||
              /^\/tags\//.test(gPATHNAME) && gmcHome.get("scanTagsDepth") == "deep" ||
              /^\/scripts(?:\/?$|\/search\/?$)/.test(gPATHNAME) && gmcHome.get("scanScriptsDepth") == "deep" ||
              /^\/groups\/\d+\/scripts/.test(gPATHNAME) && gmcHome.get("scanGroupsDepth") == "deep" ||
              /(^\/users\/.+?\/(?:scripts|favorites)|^\/home\/(?:scripts|favorites))/.test(gPATHNAME) && gmcHome.get("scanScriptWrightDepth") == "deep" ||
              /^\/(?:scripts\/show|topics)/.test(gPATHNAME) && !gmcHome.get("disableScanDeep")
              ) &&
              this._mb["uso"]["unlisted"] != ""
          ) {
            this.url = this.url.replace(/\/source\/(\d+)\.meta\.js$/, "/version/$1/" + lastValueOf(this._mb, "version", "uso") + ".user.js");
            this._retry = gRETRIES;
            GM_xmlhttpRequest.call(gTHIS, this);
          }
          else {
            addValue("", "userjs", this._mb["uso"]);

            let atUsoAuthor = lastValueOf(this._mb, "author", "uso");

            if (gmcHome.get("enableNabAuthorId") && !atUsoAuthor && !/^\/home\/scripts/.test(gPATHNAME)) {
              this.url = "/scripts/show/" + this._scriptId;

              this.headers = { "Range": "bytes=" + (gBYTESMIN ? gBYTESMIN : 0) + "-" + (gBYTESMAX ? gBYTESMAX : "") };

              if (gmcHome.get("enableDebugging"))
                console.info(this.headers.Range);

              this._retry = gRETRIES;
              GM_xmlhttpRequest.call(gTHIS, this);
            }
            else {
              parse(this._sa, this._node, this._scriptId, this._mb);

              this._node.classList.remove("saB");
              gQNODES.shift();
              xhr.call(gTHIS, this);
            }
          }
        }
        else if (/\.user\.js$/.test(this.url)) {

          /** Add some keys **/
          addValue(aR.responseText, "userjs", this._mb["uso"]);
          addValue(aR.responseText.length.toString(), "userjssize", this._mb["uso"]);

          let stats = [];

          let matches = aR.responseText.match(/\n/g); // NOTE: Script should always have at least one newline
          if (matches) {
            addValue((matches.length + 1).toString(), "userjslines", this._mb["uso"]);
            stats.push(unitSizer(lastValueOf(this._mb, "userjssize", "uso")) + " with " + lastValueOf(this._mb, "userjslines", "uso") + " lines");
          }

          let ws, nws;
          matches = aR.responseText.match(/\s/g);
          if (matches) {
            ws = matches.length;
            addValue(ws.toString(), "userjsws", this._mb["uso"]);
          }

          matches = aR.responseText.match(/\S/g);
          if (matches) {
            nws = matches.length;
            addValue(nws.toString(), "userjsnws", this._mb["uso"]);
          }

          stats.push(parseInt(ws / (ws + nws) * 10000) / 100 + "% whitespace");

          pushAdvisory(this._sa, "INFO", "Raw user.js\n    " + stats.join("\n    "));

          let atUsoAuthor = lastValueOf(this._mb, "author", "uso");

          if (gmcHome.get("enableNabAuthorId") && !atUsoAuthor && !/^\/home\/scripts/.test(gPATHNAME)) {
            this.url = "/scripts/show/" + this._scriptId;

            this.headers = { "Range": "bytes=" + (gBYTESMIN ? gBYTESMIN : 0) + "-" + (gBYTESMAX ? gBYTESMAX : "") };

            if (gmcHome.get("enableDebugging"))
              console.info(this.headers.Range);

            this._retry = gRETRIES;
            GM_xmlhttpRequest.call(gTHIS, this);
          }
          else {
            /** Remove some keys **/
            let userjs = lastValueOf(this._mb, "userjs", "uso").replace(/\s+\/\/\s@(?:updateURL|installURL|downloadURL|exclude)\s+.*[^\n\r]/gm, "");

            parse(this._sa, this._node, this._scriptId, this._mb, userjs);

            this._node.classList.remove("saB");
            gQNODES.shift();
            xhr.call(gTHIS, this);
          }
        }
        else if (/\/scripts\/show\/\d+$/.test(this.url)) {
          let
              parser = new DOMParser(),
              doc = parser.parseFromString(aR.responseText, "text/html"),
              retry
          ;

          let titleNode = doc.querySelector(".title");
          if (titleNode)
            addValue(titleNode.textContent, "title", this._mb["uso"]);

          // TODO: "desc" if resolved

          let author = doc.querySelector("span.author");
          if (author) {
            let vcard = author.querySelector("a");
            if (vcard) {
              addValue(vcard.getAttribute("user_id"), "author", this._mb["uso"]);

              let matches = vcard.getAttribute("gravatar").match(/^.+?(?:gravatar_id\=(.+?)|\/avatar\/(.+?))[\?\&]/);
              if (matches)
                addValue(matches[1] || matches[2], "avatar", this._mb["uso"]);

              matches = vcard.getAttribute("href").match(/\/users\/(.*)/);
              if (matches)
                addValue(matches[1] || matches[2], "vanity", this._mb["uso"]);

              addValue(vcard.textContent, "name", this._mb["uso"]);
            }
            else {
              if (author.textContent == "By deleted user") {
                pushAdvisory(this._sa, "ABORT", "Deleted user");
              }
            }
          }
          else {
            gBYTESMIN = undefined; // NOTE: Force a reset during login
            retry = true;  // NOTE: Rerun current request
            if (gmcHome.get("enableDebugging")) {
              console.error('No ScriptWright id found in fragment for url: ' + this.url);
              console.warn(aR.responseText);
            }
          }

          this.headers = undefined;

          if (!retry) {
            let userjs;

            /** Optionally remove some keys **/
            if (this._mb["uso"]["userjs"])
              userjs = lastValueOf(this._mb, "userjs", "uso").replace(/\s+\/\/\s@(?:updateURL|installURL|downloadURL|exclude)\s+.*[^\n\r]/gm, "");

            parse(this._sa, this._node, this._scriptId, this._mb, userjs);

            this._node.classList.remove("saB");
            gQNODES.shift();
          }

          if (gQNODES.length > 0) {
            // Recalculate low and high bytes for next node
            if (!this.headLength)
              this.headLength = byteLength(doc.documentElement.getElementsByTagName("head")[0].innerHTML) - byteLength(doc.title) + gHEADLENADJ;

            let titleTextNode = gQNODES[0].querySelector("a.title").textContent;
            let lenTitle = byteLength(titleTextNode);
            if (/\.\.\.$/.test(titleTextNode) && titleTextNode.length == 50)
              lenTitle = 255 * 4; // WATCHPOINT: Set to max bytes of unicode since unknown

            lenTitle += byteLength(" for Greasemonkey");

            let len = this.headLength - lenTitle;



            let low = len + lenTitle;
            let high = parseInt(len) + (lenTitle * 2) + (80 * 2) + gTITLELENADJ;

            if (gBYTESMIN !== 0) {
              gBYTESMIN = low;
              gBYTESMAX = high;
            }
            else {
              gBYTESMIN = 0;

              if (gLoginTrying)
                gBYTESMAX = high;
              else
                gBYTESMAX = parseInt(high / gANONDIVISOR);
            }
          }
          else {
            gBYTESMIN = undefined;
            gBYTESMAX = undefined;

          }

          if (retry) {
            this._retry = gRETRIES;
            GM_xmlhttpRequest.call(gTHIS, this);
          }
          else
            xhr.call(gTHIS, this);
        }
        break;
      default:
        pushAdvisory(this._sa, "ABORT", "Untrapped status code: " + aR.status);
        advise(this._sa, this._node, this._mb);

        this._node.classList.remove("saB");
        gQNODES.shift();
        xhr.call(gTHIS, this);
        break;
    }
  }

  /**
   *
   */
  function xhr(aReq) {
    if (gQNODES.length > 0) {
      gIdle = false;

      let thisNode = gQNODES[0];
      if (thisNode) {
        thisNode.classList.add("saB");

        let thatNode;
        if (thisNode.classList.contains("userjs"))
          thatNode = thisNode;
        else
          thatNode = thisNode.querySelector(".title");

        let scriptId;
        [, scriptId] = thatNode.pathname.match(/(\d+).*$/);

        aReq._retry = gRETRIES;
        aReq._sa = {};
        aReq._node = thisNode;
        aReq._scriptId = scriptId;
        aReq._mb = null;
        aReq.url = "/scripts/source/" + scriptId + ".meta.js";

        GM_xmlhttpRequest(aReq);
      }
    }
    else {
      gIdle = true;
    }
  }

  /**
   *
   */
  function qNodes(aNodes) {
    for (let i = 0, thisNode; thisNode = aNodes[i++];)
      if (isViewing(thisNode) && !thisNode.classList.contains("saU")) {
        thisNode.classList.add("saU");
        gQNODES.push(thisNode);
      }

    if (gIdle)
      xhr({
        method: "GET",
        onload: onLoad,
        onerror: onError
      });
  }

  /**
   *
   */
  function onViewportChange() {
    qNodes(gANODES);
  }

  /**
   *
   */
  function insertHook() {
    let hookNode = document.getElementById("full_description");

    if (hookNode && !hookNode.firstChild)
      return hookNode.appendChild(document.createElement("div"));
    else if (hookNode)
      return (hookNode.insertBefore(document.createElement("div"), hookNode.firstChild));
    else {
      hookNode = document.getElementById("content");

      if (hookNode) {
        let nodeDiv = document.createElement("div");

        let full_descriptionNodeDiv = document.createElement("div");
        full_descriptionNodeDiv.id = "full_description";

        full_descriptionNodeDiv.appendChild(nodeDiv);

        return hookNode.appendChild(full_descriptionNodeDiv);
      }
      else {
        if (gmcHome.get("enableDebugging"))
          console.log("ERROR: USO DOM change detected... appending GMC remote to EoD");
        return document.body.appendChild(document.createElement("div"));
      }
    }
  }

  /**
   *   main'ish
   */

  /** Clean up USO for framed presentation **/
  if (!gISFRAMELESS && /^\/scripts\/show\/\d+#heading/.test(gPATHNAME + gHASH)) {

    aNodes = document.body.querySelectorAll("a");
    for (let i = 0, thisNode; thisNode = aNodes[i++];)
      thisNode.target = "_top";

    GM_setStyle({
      node: gCSS,
      data:
        [
          "div.container { width: auto; margin: 0; }",
          "div#content { width: 100% !important; left: 0; }",
          "div#heading { height: 66px; min-height: 0; }",
          "div#details h1.title { max-height: 2.05em; overflow: hidden; }",
          "#section > .container { width: auto !important; }",
          "#section_search { display: none !important; }",
          "#install_script { bottom: auto !important; top: 10px !important; margin-right: 5px; }"

        ].join("\n")
    });
  }

  /** Nearest fix(es) for any glitches with UAC/USO **/
  if (gUAC)
    GM_setStyle({
      node: gCSS,
      data: [
        "div #full_description { width: 98.6%; }",

        "#screenshots { width: 98% !important; }",
        "#activity, #topics { float: inherit !important; }" // Alternative: "h6 { clear: both; }",

      ].join("\n")
    });
  else
    GM_setStyle({
      node: gCSS,
      data: [
        "div #full_description { width: 97.9%; }"

      ].join("\n")
    });


  /** **/
  if (typeof GM_configStruct == "undefined") {
    if (gmcHome.get("enableDebugging")) {
      let msg = 'Fatal error. GM_config not found';
      console.error(msg);
    }
    return;
  }

  GM_config = undefined;

  let gmcHome = new GM_configStruct();
  gmcHome.id = "gmc68219home";

  gmcHome.init(
    gISHOMEPAGE ? insertHook() : "",
    [
      '<img alt="installWith" title="uso &ndash; installWith" src="' + GM_getResourceURL("icon") + '" />',
      '<p>Preferences</p>',
      '<span>',
        '<a href="/guides/24/">',
          '<img alt="usoCheckup" title="Powered in part by usoCheckup" src="' + GM_getResourceURL("usoc") + '" />',
        '</a>',
        '<a href="' + gPROTOCOL + '//github.com/sizzlemctwizzle/GM_config/wiki/">',
            '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
        '</a>',
      '</span>'

    ].join(""),

    GM_setStyle({
      node: null,
      data:
        [
          "@media screen, projection {",
                "#gmc68219home { position: static !important; z-index: 0 !important; width: auto !important; height: auto !important; max-height: none !important; max-width: none !important; margin: 0 0 0.5em 0 !important; border: 1px solid #ddd !important; clear: right !important; }",

                "#gmc68219home_header a { display: inline; }",
                "#gmc68219home_header img { max-height: 32px; margin-right: 0.125em; vertical-align: middle; }",
                "#gmc68219home_header > p { display: inline; margin: 0; vertical-align: middle; }",
                "#gmc68219home_header span { float: right; }",
                "#gmc68219home_header span > a { display: inline; margin-left: 0.25em; }",
                "#gmc68219home_wrapper { background-color: #eee; padding-bottom: 0.25em; }",
                "#gmc68219home .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                "#gmc68219home .config_var { clear: both; margin: 0.33em; padding: 0; }",
                "#gmc68219home .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: -0.2em; }",
                "#gmc68219home .section_header_holder { margin: 0.25em 0.5em !important; }",
                "#gmc68219home .section_desc { margin: 0.25em 1.5em !important; }",

                    ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                    ".gmc68219home-invisilink { text-decoration: none; color: #000; }",
                    ".gmc68219home-invisilink:hover { color: #000; }",

                    "#gmc68219home_wrapper textarea,",
                    "#gmc68219home_wrapper input",
                    "{ font-size: 1em; }",

                    "#gmc68219home_wrapper input[type='text']",
                    "{ text-align: right; width: 2em; }",

                    "#gmc68219home_maxHeightListSa_var,",
                    "#gmc68219home_scanScriptWrightDepth_var,",
                    "#gmc68219home_scanScriptsDepth_var,",
                    "#gmc68219home_scanGroupsDepth_var,",
                    "#gmc68219home_scanTagsDepth_var,",
                    "#gmc68219home_scanMainDepth_var,",
                    "#gmc68219home_enableAutoSession_var,",
                    "#gmc68219home_alwaysShowAuthorId_var,",
                    "#gmc68219home_alwaysHidePus_var,",
                    "#gmc68219home_alwaysHideDeletedUser_var",
                    "{ margin-left: 2em !important; }",


                "#gmc68219home .reset, #gmc68219home .reset a, #gmc68219home_buttons_holder { text-align: inherit; }",
                "#gmc68219home_buttons_holder { margin: 0.5em; }",
                "#gmc68219home_saveBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                "#gmc68219home_resetLink { margin-right: 1.5em; }",
                "#gmc68219home_closeBtn { display: none; }",
          "}",

          "@media print {",
              "#gmc68219home { display: none !important; }",
          "}"

        ].join("\n")
    }),
    {
      'forceInstallSecure': {
          "section": [],
          "type": 'checkbox',
          "label": 'Force userscripts.org installations to use secure when browsing the site in unsecure',
          "default": false
      },
      'forceInstallRecent': {
          "type": 'checkbox',
          "label": 'Force userscripts.org installations to use the most recently detected version',
          "default": false
      },
      'mirrorDomain': {
          "section": [,''],
          "label": 'Mirror domain name for usoCheckup <em class="gmc-yellownote">Select primary ONLY or secure OPTIONALLY if behind a domain blocklist that prevents the redirect</em>',
          "type": 'radio',
          "options": ['redirect', 'primary', 'secure'],
          "default": 'redirect'
      },
      'allowAOU': {
          "type": 'checkbox',
          "label": 'Allow Add-on Updater <em class="gmc-yellownote">WARNING: Greasemonkey versions 0.9.13+ can be <strong>UNSAFE</strong> with invalid <a class="gmc68219home-invisilink" href="' + gPROTOCOL + '//sf.net/apps/mediawiki/greasemonkey/index.php?title=Metadata_Block#.40updateURL">@updateURL</a> values</em>',
          "default": false
      },
      'allowUpdatersOnAOUgrantnone': {
          "section": [,''],
          "type": 'checkbox',
          "label": 'Allow updaters to be added on scripts that have <code><a class="gmc68219home-invisilink" href="' + gPROTOCOL + '//sf.net/apps/mediawiki/greasemonkey/index.php?title=Metadata_Block#.40grant">@grant</a> none</code> <em class="gmc-yellownote">WARNING: Some scripts may not work properly</em>',
          "default": false
      },
      'skipVerifyExclusion': {
          "type": 'checkbox',
          "label": 'Skip verify for installation of exclusion scripts <em class="gmc-yellownote">Not recommended</em>',
          "default": false
      },
      'disableScanDeep': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Disable deep scanning for individual script home pages <em class="gmc-yellownote">WARNING: Turning this option on may provide less accurate results</em>',
        "default": false
      },
      'limitMaxHeightSa': {
          "type": 'checkbox',
          "label": 'Limit maximum height of all shown item types in the sidebar',
          "default": false
      },
      'maxHeightListSa': {
          "type": 'unsigned number',
          "label": 'em maximum height of all shown item types',
          "default": 10
      },
      'enableScanScriptWright': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Enable ScriptWright script pages scanning <em class="gmc-yellownote">WARNING: Deep scanning may be CPU and bandwidth intensive</em>',
        "default": false
      },
      'scanScriptWrightDepth': {
          "type": 'radio',
          "options": ['shallow', 'deep'],
          "default": 'shallow'
      },
      'enableScanGroups': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Enable Group script pages scanning <em class="gmc-yellownote">WARNING: Deep scanning may be CPU and bandwidth intensive</em>',
        "default": false
      },
      'scanGroupsDepth': {
          "type": 'radio',
          "options": ['shallow', 'deep'],
          "default": 'shallow'
      },
      'enableScanScripts': {
        "type": "checkbox",
        "label": 'Enable Scripts pages scanning <em class="gmc-yellownote">WARNING: Deep scanning may be CPU and bandwidth intensive</em>',
        "default": false
      },
      'scanScriptsDepth': {
          "type": 'radio',
          "options": ['shallow', 'deep'],
          "default": 'shallow'
      },
      'enableScanTags': {
        "type": "checkbox",
        "label": 'Enable Tags pages scanning <em class="gmc-yellownote">WARNING: Deep scanning may be CPU and bandwidth intensive</em>',
        "default": false
      },
      'scanTagsDepth': {
          "type": 'radio',
          "options": ['shallow', 'deep'],
          "default": 'shallow'
      },
      'enableScanMain': {
        "type": "checkbox",
        "label": 'Enable Popular scripts pages scanning <em class="gmc-yellownote">WARNING: Deep scanning may be CPU and bandwidth intensive</em>',
        "default": false
      },
      'scanMainDepth': {
          "type": 'radio',
          "options": ['shallow', 'deep'],
          "default": 'shallow'
      },
      'enableNabAuthorId': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Enable ScriptWright info request when unavailable <em class="gmc-yellownote">BETA: This may be bandwidth intensive and can be slow during high traffic periods</em>',
        "default": false
      },
      'enableAutoSession': {
        "type": "checkbox",
        "label": 'Auto attempt to establish a session with userscripts.org <em class="gmc-yellownote">WARNING: This should reduce bandwidth some but usually has less privacy</em>',
        "default": false
      },
      'alwaysShowAuthorId': {
        "type": "checkbox",
        "label": 'Always show ScriptWright info in mixed ScriptWright script lists',
        "default": false
      },
      'alwaysHideDeletedUser': {
        "type": "checkbox",
        "label": 'Always hide a deleted ScriptWright in mixed ScriptWright script lists',
        "default": false
      },
      'alwaysHidePus': {
        "type": "checkbox",
        "label": 'Always hide Potentially Unwanted scripts in mixed ScriptWright script lists',
        "default": false
      },
      'disableViewportHold': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Disable Viewport hold <em class="gmc-yellownote">WARNING: This uses more bandwidth and can be slow during high traffic periods</em>',
        "default": false
      },
      'enableDebugging': {
        "section": [,''],
        "type": "checkbox",
        "label": 'Enable debugging <em class="gmc-yellownote">WARNING: Includes console methods, and alerts that may block script execution, for any known potential issues and monitoring</em>',
        "default": false
      }
    }
  );

  gmcHome.onSave = function() {
    let write = false;
    let reopen = false;

    GM_setStyle({
        node: gCSS,
        data:
          [
            "#script_sidebar h7 div.sa { max-height: " + (gmcHome.get("limitMaxHeightSa") ? gmcHome.get("maxHeightListSa") + "em" : "none") + "; }"

          ].join("\n")
    });

    if (write) gmc.write();
    if (reopen) { gmc.close(); gmc.open(); }
  }

  /** **/
  if (gmcHome.get("limitMaxHeightSa"))
    GM_setStyle({
        node: gCSS,
        data:
          [
            "#script_sidebar h7 div.sa { max-height: " + gmcHome.get("maxHeightListSa") + "em; overflow: auto; }"

          ].join("\n")
    });

  if (gISFRAMELESS && /\/scripts\/show\/68219\/?$/.test(gPATHNAME)) {
    gmcHome.open();
  }

  /**
   *
   */
  let gmc = new GM_configStruct();
  gmc.id = "gmc68219";

  gmc.init(
    gISHOMEPAGE ? insertHook() : "",
    (
      (
        (/\/scripts\/show\/68219\/?$/.test(gPATHNAME))
        ? [
            '<img alt="installWith" title="uso - installWith" src="' + GM_getResourceURL("icon") + '" />'

          ].join("")
        : [
            '<a href="/scripts/show/68219">',
              '<img alt="installWith" title="uso - installWith" src="' + GM_getResourceURL("icon") + '" />',
            '</a>'

          ].join("")
      )
      + [
          '<p>Options</p>',
          '<span>',
            '<a href="/guides/24/">',
              '<img alt="usoCheckup" title="Powered in part by usoCheckup" src="' + GM_getResourceURL("usoc") + '" />',
            '</a>',
            '<a href="' + gPROTOCOL + '//github.com/sizzlemctwizzle/GM_config/wiki">',
              '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
            '</a>',
          '</span>'
        ].join("")
      ),
    /* Custom CSS */
    GM_setStyle({
        node: null,
        data:
          [
          "@media screen, projection {",
                "#gmc68219 { position: static !important; z-index: 0 !important; width: auto !important; height: auto !important; max-height: none !important; max-width: none !important; margin: 0 0 0.5em 0 !important; border: 1px solid #ddd !important; clear: right !important; }",

                "#gmc68219_header a { display: inline; }",
                "#gmc68219_header img { max-height: 32px; margin-right: 0.125em; vertical-align: middle; }",
                "#gmc68219_header > p { display: inline; margin: 0; vertical-align: middle; }",
                "#gmc68219_header span { float: right; }",
                "#gmc68219_header span > a { display: inline; margin-left: 0.25em; }",
                "#gmc68219_wrapper { background-color: #eee; padding-bottom: 0.25em; }",
                "#gmc68219 .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                "#gmc68219 .config_var { clear: both; margin: 0.33em; padding: 0; }",
                "#gmc68219 .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: -0.2em; }",
                "#gmc68219 .section_header_holder { margin: 0.25em 0.5em !important; }",
                "#gmc68219 .section_desc { margin: 0.25em 1.5em !important; }",

                    ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                    ".gmc68219-invisilink { text-decoration: none; color: #000; }",
                    ".gmc68219-invisilink:hover { color: #000; }",

                    "#gmc68219 .config_header { margin-bottom: 0.5em; }",

                    "#gmc68219_useGravatarIcon_var,",
                    "#gmc68219_useScriptIcon_var",
                    "{ display: inline !important; }",

                    "#gmc68219_useGravatarIcon_field_label img,",
                    "#gmc68219_useScriptIcon_field_label img",
                    "{ max-height: 48px; max-width: 48px; vertical-align: middle; }",

                    "#gmc68219_field_updaterMaxage,",
                    "#gmc68219_field_updaterMinage",
                    "{ height: 1em; margin: 0 0.25em; min-height: 0.8em; max-height: 2.1em; text-align: right; width: 2.5em; }",

                "#gmc68219 .reset, #gmc68219 .reset a, #gmc68219_buttons_holder { text-align: inherit; }",
                "#gmc68219_buttons_holder { margin: 0.5em; }",
                "#gmc68219_saveBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                "#gmc68219_resetLink { margin-right: 1.5em; }",
                "#gmc68219_closeBtn { display: none; }",
          "}",

          "@media print {",
              "#gmc68219 { display: none !important; }",
          "}"

          ].join("\n")
    }),
    /* Settings Object */
    {
      "useGravatarIcon": {
        "section": [],
        "type": "checkbox",
        "label": '',
        "default": false
      },
      "useScriptIcon": {
        "type": "checkbox",
        "label": '',
        "default": false
      },
      "updaterMaxage": {
          "type": "unsigned integer",
          "label": 'day(s) maximum between checks for this script',
          "default": 30
      },
      "updaterMinage": {
        "type": "unsigned integer",
        "label": 'hour(s) minimum before starting a check for this script',
        "default": 1
      },
      'indirectMethod': {
          "label": 'Method <em class="gmc-yellownote">Select update to use the most recently detected version.</em>',
          "type": 'radio',
          "options": ['show', 'install', 'update'],
          "default": 'show'
      },
      'directMethod': {
          "label": 'Method <em class="gmc-yellownote">Select update to use the most recently detected version.</em>',
          "type": 'radio',
          "options": ['install', 'update'],
          "default": 'install'
      },

      'providerPref1': { "type": 'hidden', "default": "uso" },
      'providerPref2': { "type": 'hidden', "default": "uso" }
    }
  );

  gmc.onSave = function() {
    let write = false;
    let reopen = false;
      if (gmc.get("updaterMinage") > gmc.get("updaterMaxage") * 24 ) {
        gmc.set("updaterMinage", 1);
        write = true;
      }
    if (write) gmc.write();
    if (reopen) { gmc.close(); gmc.open(); }

    let ev = new CustomEvent("change");

    let selectNode = document.getElementById("provider_id");
    selectNode.dispatchEvent(ev);
  }


  GM_config = undefined;

  let gmcFilters = new GM_configStruct();
  gmcFilters.id = "gmc68219filters";

  gmcFilters.init(
    document.body.insertBefore(document.createElement("div"), document.body.firstChild),
    (
      (
        (/\/scripts\/show\/68219\/?$/.test(gPATHNAME))
        ? [
            '<img alt="installWith" title="uso - installWith" src="' + GM_getResourceURL("icon") + '" />'

          ].join("")
        : [
            '<a href="/scripts/show/68219">',
              '<img alt="installWith" title="uso - installWith" src="' + GM_getResourceURL("icon") + '" />',
            '</a>'

          ].join("")
      )
      + [
          '<p>Advisor</p>',
          '<span>',
            '<a href="/guides/24/">',
              '<img alt="usoCheckup" title="Powered in part by usoCheckup" src="' + GM_getResourceURL("usoc") + '" />',
            '</a>',
            '<a href="' + gPROTOCOL + '//github.com/sizzlemctwizzle/GM_config/wiki">',
              '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
            '</a>',
          '</span>'
        ].join("")
      ),
    /* Custom CSS */
    GM_setStyle({
        node: null,
        data:
          [
            "@media screen, projection {",
                "#gmc68219filters { background-color: rgba(0, 0, 0, 0.66) !important; height: 100% !important; width: 100% !important; max-height: 100% !important; max-width: 100% !important; left: 0 !important; top: 0 !important; }",
                "#gmc68219filters_wrapper { background-color: #eee; width: 45em; height: 40em; position: absolute; left: 45%; top: 50%; margin: -20em 0 0 -15em; border: 1px solid #ddd; }",

                "#gmc68219filters_header a { display: inline; }",
                "#gmc68219filters_header img { vertical-align: middle; }",
                "#gmc68219filters_header > a img { height: 32px; margin-right: 0.25em; width: 32px; }",
                "#gmc68219filters_header > img { height: 32px; margin-right: 0.25em; width: 32px; }",
                "#gmc68219filters_header > p { display: inline; margin: 0; vertical-align: middle; }",
                "#gmc68219filters_header span { float: right; }",
                "#gmc68219filters_header span > a { display: inline; margin-left: 0.25em; }",
                "#gmc68219filters .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                "#gmc68219filters .config_var { clear: both; margin: 0 1em; padding: 0; }",
                "#gmc68219filters .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: 0.125em; }",
                "#gmc68219filters .section_desc { margin: 0.25em 1.5em !important; }",

                "#gmc68219filters .section_header { margin: 0 1em; text-align: left; }",
                "#gmc68219filters .section_header img { margin: 0 0.25em; vertical-align: middle; }",

                    ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                    ".gmc68219filters-invisilink { text-decoration: none; color: #000; }",
                    ".gmc68219filters-invisilink:hover { color: #000; }",

                    "#gmc68219filters .field_label { top: -0.25em; }",

                    "#gmc68219filters_postPUStoSAM_var { margin-bottom: 0.25em !important; margin-top: 1.25em !important; }",
                    "#gmc68219filters_field_postPUStoSAM { height: 2.5em; width: 38.75em; }",

                    "#gmc68219filters_openSAMtopic_var,",
                    "#gmc68219filters_disableSAMCSS_var",
                    "{",
                    "  margin-top: 0.125em !important; margin-bottom: 0.25em !important; margin-left: 1.75em !important; ",
                    "}",

                    "#gmc68219filters_section_0 { margin-top: 0 !important; }",

                    "#gmc68219filters_section_desc_0 { border-style: none !important; text-align: left !important; font-style: italic; }",
                    "#gmc68219filters_section_desc_0 span:first-child { margin-left: 10.5em; }",
                    "#gmc68219filters_section_desc_0 span:last-child { float: right; margin-right: 10.25em; }",


                    "#gmc68219filters_clearUserScriptIds_var",
                    "{ display: inline !important; margin-right: 0 !important; }",

                    "#gmc68219filters_field_clearUserScriptIds",
                    "{ font-size: 0.9em; width: 6em; }",


                    "#gmc68219filters_clearUserScriptPrivIds_var",
                    "{ display: inline !important; margin-right: 0 !important; margin-left: 3em !important; }",

                    "#gmc68219filters_field_clearUserScriptPrivIds",
                    "{ font-size: 0.9em; width: 8em; }",



                    "#gmc68219filters_moveUserScriptIds_var,",
                    "#gmc68219filters_moveUserScriptPrivIds_var",
                    "{ display: inline !important; margin-right: 0 !important; margin-left: 0 !important; }",
                    "#gmc68219filters_field_moveUserScriptIds,",
                    "#gmc68219filters_field_moveUserScriptPrivIds",
                    "{ font-size: 0.9em; width: 10.75em; }",

                    "#gmc68219filters_copyUserScriptIds_var,",
                    "#gmc68219filters_copyUserScriptPrivIds_var",
                    "{ display: inline !important; margin-right: 0 !important; margin-left: 0 !important; }",
                    "#gmc68219filters_field_copyUserScriptIds,",
                    "#gmc68219filters_field_copyUserScriptPrivIds",
                    "{ font-size: 0.9em; width: 6em; }",

                    "#gmc68219filters_usePlain_var { display: inline !important; margin: 0 !important; }",

                    "#gmc68219filters_copyScriptWrightIds_var,",
                    "#gmc68219filters_copyScriptWrightPrivIds_var",
                    "{ display: inline !important; margin-left: 0 !important; margin-right: 0 !important; }",

                    "#gmc68219filters_field_copyScriptWrightIds,",
                    "#gmc68219filters_field_copyScriptWrightPrivIds",
                    "{ font-size: 0.9em; width: 6em; }",


                    "#gmc68219filters_moveScriptWrightIds_var",
                    "{ display: inline !important; margin-left: 0 !important; margin-right: 0 !important; }",

                    "#gmc68219filters_field_moveScriptWrightIds",
                    "{ font-size: 0.9em; width: 10.75em; }",


                    "#gmc68219filters_moveScriptWrightPrivIds_var",
                    "{ display: inline !important; margin-left: 5.5em !important; margin-right: 0 !important; }",

                    "#gmc68219filters_field_moveScriptWrightPrivIds",
                    "{ font-size: 0.9em; width: 10.75em; }",



                    "#gmc68219filters_clearScriptWrightIds_var",
                    "{ display: inline !important; margin-left: 0 !important; }",

                    "#gmc68219filters_field_clearScriptWrightIds",
                    "{ font-size: 0.9em; width: 6em; }",


                    "#gmc68219filters_clearScriptWrightPrivIds_var",
                    "{ display: inline !important; margin-left: 0 !important; }",

                    "#gmc68219filters_field_clearScriptWrightPrivIds",
                    "{ font-size: 0.9em; width: 8em; }",



                    "#gmc68219filters_field_jsonFilters { height: 11em; min-height: 11em; max-height: 11em; font-size: 1.1em; resize: none; width: 38.2em; min-width: 38.2em; max-width: 38.2em; margin-top: 0.5em; }",
                    "#gmc68219filters_jsonFilters_field_label > p { margin-bottom: 0.25em; margin-top: 0.25em; }",


                    "#gmc68219filters_insertUserScriptIdToPU_var { display: inline !important; }",
                    "#gmc68219filters_field_insertUserScriptIdToPU { height: 2.25em; width: 8.5em; }",
                    "#gmc68219filters_lastUserScriptId_var { display: inline !important; margin-left: 0 !important; }",
                    "#gmc68219filters_field_lastUserScriptId { width: 8.125em; margin-top: 0; text-align: right; }",

                    "#gmc68219filters_lastScriptWrightId_var { display: inline !important; }",
                    "#gmc68219filters_field_lastScriptWrightId { width: 8.125em; margin-top: 0; text-align: right; }",
                    "#gmc68219filters_insertScriptWrightIdToPU_var { display: inline !important; margin-left: 0 !important; }",
                    "#gmc68219filters_field_insertScriptWrightIdToPU { height: 2.25em; width: 8.5em; }",

                "#gmc68219filters_buttons_holder { margin: 0.5em; margin-top: 1em; padding-top: 0; text-align: inherit; bottom: 0; right: 0; }",
                "#gmc68219filters .saveclose_buttons { margin: 0.5em 10px; }",
                "#gmc68219filters_saveBtn { float: right; margin-right: 0.4em !important; width: 10em;",
                "#gmc68219filters_resetLink { margin-right: 1.5em; }",
            "}",

            "@media print {",
                "#gmc68219filters { display: none !important; }",
            "}"

          ].join("\n")
    }),
    /* Settings Object */
    {
      'postPUStoSAM': {
          "type": "button",
          "label": 'Queue Potentially Unwanted (PU) Ids to Spam and Malware',
          "script": function () {
            try {
              let json, write, post, GROUPS;

              GROUPS = JSON.parse(gLIST + '}');
              json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

              let jsonFull = JSON.parse('{"user":' + gmcFilters.fields["jsonFilters"].node.value + '}');

              let reports = [];

              let pendingReports = GM_getValue(":pendingReports");
              if (pendingReports) {
                pendingReports.split(',').forEach(function (e, i, a) {
                  reports.push(e);
                });
              }

              parseList(jsonFull, function (aScope, aPatterns, aAdvisory, aSummary, aTips, aBlock, aReduce, aCollapse, aHide, aProvider, aCollector) {
                switch (aScope) {
                  case "@uso:script":
                  case "@uso:author":
                    if (/Potentially\sunwanted\sscript/.test(aSummary)) {
                      for (let pattern in aPatterns) {
                        let matches = pattern.match(/^\"?(\d+)\"?$/);
                        if (matches) {
                          let id = matches[1];

                          if (aScope == "@uso:script") {
                            if (!json["@uso:script (private)"]) {
                              json["@uso:script (private)"] = ["GUARD Potentially unwanted script", []];
                              write = true;
                            }

                            let privateSids = json["@uso:script (private)"][1]; // TODO:
                            let found;
                            privateSids.forEach(function (e, i, a) {
                              if (e == id)
                                found = true;
                            });

                            if (!found && GROUPS && GROUPS["collections"]["@uso:script"]) {
                              let globalSids = GROUPS["collections"]["@uso:script"][1]; // TODO:
                              globalSids.forEach(function (e, i, a) {
                                if (e == id)
                                  found = true;
                              });
                            }

                            if (!found) {
                              privateSids.push(id);
                              write = true;
                              reports.push('/' + id);
                            }

                          }
                          else {
                            if (!json["@uso:author (private)"]) {
                              json["@uso:author (private)"] = ["GUARD Potentially unwanted script", []];
                              write = true;
                            }

                            let privateAids = json["@uso:author (private)"][1]; // TODO:
                            let found;
                            privateAids.forEach(function (e, i, a) {
                              if (e == id)
                                found = true;
                            });

                            if (!found && GROUPS && GROUPS["collections"]["@uso:author"]) {
                              let globalAids = GROUPS["collections"]["@uso:author"][1]; // TODO:
                              globalAids.forEach(function (e, i, a) {
                                if (e == id)
                                  found = true;
                              });
                            }

                            if (!found) {
                              privateAids.push(id);
                              write = true;
                              reports.push('/users/' + id);
                            }

                          }
                        }
                      }
                    }
                    break;
                }
              });

              if (write) {
                json["@uso:author"][1] = [];
                json["@uso:script"][1] = [];

                gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                gmcFilters.set("jsonFilters", JSON.stringify(json, null, ""));

                GM_setValue(":pendingReports", reports.sort(function (a, b) {
                    let re = /(\d+)$/;
                    return a.match(re)[1] - b.match(re)[1];
                }).sort(function (a, b) {
                    let re = /^(.*\/)\d+$/;
                    if (a.match(re)[1] < b.match(re)[1])
                      return -1;
                    if (a.match(re)[1] > b.match(re)[1])
                      return 1

                    return 0;
                }).toString());

                post = true;
              }

              let openSAMtopic = gmcFilters.fields["openSAMtopic"].node.checked;
              if (openSAMtopic != gmcFilters.get("openSAMtopic")) {
                gmcFilters.set("openSAMtopic", openSAMtopic);
                write = true;
              }

              if (write)
                gmcFilters.write();

              if (post && openSAMtopic) {
                gmcFilters.close();
                location.href = "/topics/9#posts-last";
              }
            }
            catch (e) {
              alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
            }

          }
      },
      'openSAMtopic': {
          "type": "checkbox",
          "label": 'Auto open the <a href="/topics/9#posts-last"></>Spam and Malware</a> topic on queue',
          "default": false
      },
      'clearUserScriptIds' : {
          "type": "button",
          "label": 'Clear PU',
          "script": function () {
            try {
              let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

              json["@uso:script"][1] = [];

              gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
            }
            catch (e) {
              alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
            }
          }
      },
      'moveUserScriptIds': {
          "type": "button",
          "label": 'Move PU to private',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let sids = json["@uso:script"][1];
                if (sids.length > 0) {
                  let GROUPS = JSON.parse(gLIST + '}');

                  sids.sort(function (a, b) { return a - b });

                  if (!json["@uso:script (private)"])
                    json["@uso:script (private)"] = ["GUARD Potentially unwanted script", []];

                  let privateSids = json["@uso:script (private)"][1]; // TODO:
                  sids.forEach(function (e, i, a) {
                    let found;
                    privateSids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                    });

                    if (!found && GROUPS && GROUPS["collections"]["@uso:script"]) {
                      let globalSids = GROUPS["collections"]["@uso:script"][1]; // TODO:
                      globalSids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                      });
                    }

                    if (!found)
                      privateSids.push(e);
                  });

                  json["@uso:script (private)"][1] = privateSids.sort(function (a, b) { return a - b });
                  json["@uso:script"][1] = [];

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'copyUserScriptIds' : {
          "type": "button",
          "label": 'Copy PU',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let aids = json["@uso:script"][1];

                if (aids.length > 0) {
                  aids.sort(function (a, b) { return a - b });

                  if (gmcFilters.fields["usePlain"].node.checked)
                    GM_setClipboard(
                        aids.join('\n'), "text"
                    );
                  else
                    GM_setClipboard(
                        aids.map(function (aE) {
                          return '"' + aE + '"'
                        }).join(',\n'), "text"
                    );
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'usePlain': {
          "type": "checkbox",
          "label": '',
          "default": false
      },
      'copyScriptWrightIds' : {
          "type": "button",
          "label": 'Copy PU',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let aids = json["@uso:author"][1];

                if (aids.length > 0) {
                  aids.sort(function (a, b) { return a - b });

                  if (gmcFilters.fields["usePlain"].node.checked)
                    GM_setClipboard(
                        aids.join('\n'), "text"
                    );
                  else
                    GM_setClipboard(
                        aids.map(function (aE) {
                          return '"' + aE + '"'
                        }).join(',\n'), "text"
                    );
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'moveScriptWrightIds': {
          "type": "button",
          "label": 'Move PU to private',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let aids = json["@uso:author"][1];
                if (aids.length > 0) {
                  let GROUPS = JSON.parse(gLIST + '}');

                  aids.sort(function (a, b) { return a - b });

                  if (!json["@uso:author (private)"])
                    json["@uso:author (private)"] = ["GUARD Potentially unwanted script", []];

                  let privateAids = json["@uso:author (private)"][1]; // TODO:
                  aids.forEach(function (e, i, a) {
                    let found;
                    privateAids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                    });

                    if (!found && GROUPS && GROUPS["collections"]["@uso:author"]) {
                      let globalAids = GROUPS["collections"]["@uso:author"][1]; // TODO:
                      globalAids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                      });
                    }

                    if (!found)
                      privateAids.push(e);
                  });

                  json["@uso:author (private)"][1] = privateAids.sort(function (a, b) { return a - b });
                  json["@uso:author"][1] = [];

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'clearScriptWrightIds' : {
          "type": "button",
          "label": 'Clear PU',
          "script": function () {
            try {
              let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

              json["@uso:author"][1] = [];

              gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
            }
            catch (e) {
              alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
            }
          }
      },
      'clearUserScriptPrivIds' : {
          "section" : [,'<span class="gmc-yellownote">Group Script shortcuts</span><span class="gmc-yellownote">Group Author shortcuts</span>'],

          "type": "button",
          "label": 'Clear private',
          "script": function () {
            try {
              let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

              json["@uso:script (private)"][1] = [];

              gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
            }
            catch (e) {
              if (!/is\sundefined$/.test(e.message))
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
            }
          }
      },
      'moveUserScriptPrivIds': {
          "type": "button",
          "label": 'Move private to PU',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let privateSids = json["@uso:script (private)"][1];
                if (privateSids.length > 0) {
                  let GROUPS = JSON.parse(gLIST + '}');

                  privateSids.sort(function (a, b) { return a - b });

                  if (!json["@uso:script"])
                    json["@uso:script"] = ["GUARD Potentially unwanted script", []];

                  let sids = json["@uso:script"][1]; // TODO:
                  privateSids.forEach(function (e, i, a) {
                    let found;
                    sids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                    });

                    if (!found && GROUPS && GROUPS["collections"]["@uso:script"]) {
                      let globalSids = GROUPS["collections"]["@uso:script"][1]; // TODO:
                      globalSids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                      });
                    }

                    if (!found)
                      sids.push(e);
                  });


                  json["@uso:script"][1] = sids.sort(function (a, b) { return a - b });
                  json["@uso:script (private)"][1] = [];

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'moveScriptWrightPrivIds': {
          "type": "button",
          "label": 'Move private to PU',
          "script": function () {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

                let privateAids = json["@uso:author (private)"][1];
                if (privateAids.length > 0) {
                  let GROUPS = JSON.parse(gLIST + '}');

                  privateAids.sort(function (a, b) { return a - b });

                  if (!json["@uso:author"])
                    json["@uso:author"] = ["GUARD Potentially unwanted script", []];

                  let aids = json["@uso:author"][1];
                  privateAids.forEach(function (e, i, a) {
                    let found;
                    aids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                    });

                    if (!found && GROUPS && GROUPS["collections"]["@uso:author"]) {
                      let globalAids = GROUPS["collections"]["@uso:author"][1]; // TODO:
                      globalAids.forEach(function (e1, i1, a1) {
                      if (e == e1)
                        found = true;
                      });
                    }

                    if (!found)
                      aids.push(e);
                  });

                  json["@uso:author"][1] = aids.sort(function (a, b) { return a - b });
                  json["@uso:author (private)"][1] = [];

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
          }
      },
      'clearScriptWrightPrivIds' : {
          "type": "button",
          "label": 'Clear private',
          "script": function () {
            try {
              let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);

              json["@uso:author (private)"][1] = [];

              gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
            }
            catch (e) {
              if (!/is\sundefined$/.test(e.message))
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
            }
          }
      },
      'jsonFilters': {
          "type": 'textarea',
          "label": "<p><em class='gmc-yellownote'>use <a href='http://json.org/'>JSON</a> data-interchange format</em></p>",
          "default": JSON.stringify(
              JSON.parse(
                [
                    '{',
                    ' "@uso:author": [',
                    '  "GUARD Potentially unwanted script",',
                    '  [',
                    '   "authorid1"',
                    '  ]',
                    ' ],',
                    ' "@uso:script": [',
                    '  "GUARD Potentially unwanted script",',
                    '  [',
                    '   "scriptid1"',
                    '  ]',
                    ' ]',
                    '}'

                ].join("\n")
              ), null, " ")
      },
      'insertUserScriptIdToPU': {
          "type": "button",
          "label": 'Script to PU',
          "script": function () {
            let sid = gmcFilters.fields["lastUserScriptId"].node.value;
            if (sid != "") {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);
                let GROUPS = JSON.parse(gLIST + '}');

                let found, scripts = json["@uso:script"][1]; // TODO:
                scripts.forEach(function (e, i, a) {
                  if (e == sid)
                    found = true;
                });

                if (!found && json["@uso:script (private)"]) {
                  scripts = json["@uso:script (private)"][1]; // TODO:
                  scripts.forEach(function (e, i, a) {
                    if (e == sid)
                      found = true;
                  });
                }

                if (!found && GROUPS && GROUPS["collections"]["@uso:script"]) {
                  let globalSids = GROUPS["collections"]["@uso:script"][1]; // TODO:
                  globalSids.forEach(function (e, i, a) {
                  if (e == sid)
                    found = true;
                  });
                }

                if (!found) {
                  if (!json["@uso:script"])
                    json["@uso:script"] = ["GUARD Potentially unwanted script", []];

                  json["@uso:script"][1].push(sid);

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
            }
          }
      },
      'lastUserScriptId': {
          "type": "text",
          "default": ""
      },
      'lastScriptWrightId': {
          "type": "text",
          "default": ""
      },
      'insertScriptWrightIdToPU': {
          "type": "button",
          "label": 'Author to PU',
          "script": function () {
            let aid = gmcFilters.fields["lastScriptWrightId"].node.value;
            if (aid != "") {
              try {
                let json = JSON.parse(gmcFilters.fields["jsonFilters"].node.value);
                let GROUPS = JSON.parse(gLIST + '}');

                let found, authors = json["@uso:author"][1]; // TODO:
                authors.forEach(function (e, i, a) {
                  if (e == aid)
                    found = true;
                });

                if (json["@uso:author (private)"]) {
                  authors = json["@uso:author (private)"][1]; // TODO:
                  authors.forEach(function (e, i, a) {
                    if (e == aid)
                      found = true;
                  });
                }

                if (!found && GROUPS && GROUPS["collections"]["@uso:author"]) {
                  let globalAids = GROUPS["collections"]["@uso:author"][1]; // TODO:
                  globalAids.forEach(function (e, i, a) {
                    if (e == aid)
                      found = true;
                    });
                  }

                if (!found) {
                  if (!json["@uso:author"])
                    json["@uso:author"] = ["GUARD Potentially unwanted script", []];

                  json["@uso:author"][1].push(aid);

                  gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(json, null, " ");
                }
              }
              catch (e) {
                alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
              }
            }
          }
      }

    }
  );

  gmcFilters.onOpen = function () {
    try {
      gmcFilters.fields["jsonFilters"].node.value = JSON.stringify(JSON.parse(gmcFilters.get("jsonFilters")), null, " ");
    }
    catch (e) {}

    gmcFilters.fields["usePlain"].node.title = "Use plain ids for clipboard copy";
    gmcFilters.fields["jsonFilters"].node.setAttribute("spellcheck", "false");
    gmcFilters.fields["jsonFilters"].node.setAttribute("wrap", "off");

    gmcFilters.fields["lastScriptWrightId"].node.setAttribute("readonly", "readonly");
    gmcFilters.fields["lastScriptWrightId"].node.setAttribute("placeholder", "No ScriptWright Id");

    gmcFilters.fields["lastUserScriptId"].node.setAttribute("readonly", "readonly");
    gmcFilters.fields["lastUserScriptId"].node.setAttribute("placeholder", "No User Script Id");

    let saveBtn = document.getElementById("gmc68219filters_saveBtn");
    if (saveBtn)
      saveBtn.textContent = "Save \u0026 Close";

    let closeBtn = document.getElementById("gmc68219filters_closeBtn");
    if (closeBtn)
      closeBtn.textContent = "Cancel";
  }

  gmcFilters.onSave = function () {
    try {
      gmcFilters.set("jsonFilters", JSON.stringify(JSON.parse(gmcFilters.get("jsonFilters")), null, ""));

      gmcFilters.write();
      gmcFilters.close();
    }
    catch (e) {
      alert('ERROR: Invalid JSON for advisories.\n\nPlease correct or reset to defaults');
      gmcFilters.open();
    }
  }

  gmcFilters.onClose = function () {
    try {
      let junk = JSON.stringify(JSON.parse(gmcFilters.get("jsonFilters")), null, "");
    }
    catch (e) {
      alert('ERROR: Invalid JSON for advisories.\n\nAll user defined advisories will be skipped until corrected.');
    }
  }

  /**
   *
   */
  GM_setStyle({
    node: gCSS,
    data:
      [
        "table.forums tr td.script-meat { background-color: #eee; }"

      ].join("\n")
  });

  let authenticated = document.querySelector("body.loggedin");

  if (/^\/topics\/9\/?$/.test(gPATHNAME) || /^\/posts\/?$/.test(gPATHNAME)) {
    GM_setStyle({
      node: gCSS,
      data:
        [
          ".columnize { column-width: 10em; -moz-column-width: 10em; }"

        ].join("\n")
    });

    let posts = document.querySelectorAll("#content .posts .entry-content p~ul");
    for (let i = 0, thisNode; thisNode = posts[i++];)
      if (thisNode.previousSibling && thisNode.previousSibling.textContent.match(/Potentially\sunwanted\sscripts/i))
        thisNode.classList.add("columnize");
  }

  let pendingReports = GM_getValue(":pendingReports");
  if (/^\/topics\/9\/?$/.test(gPATHNAME) && authenticated && pendingReports) {
    let paginationLast = document.querySelector("#content .pagination .next_page");
    if (paginationLast && !paginationLast.classList.contains("disabled")) {
      let url = paginationLast.previousSibling.previousSibling.href;
      if (url)
        location.replace(url + "#footer");
    }
    else {
      if (!gmcFilters.get("openSAMtopic")) {
        if (confirm("You seem to have pending reports.\n\nDo you wish to post now?\n\nPlease note if cancelled the reports will be removed from the queue")) {
          GM_deleteValue(":pendingReports");
          doReport(pendingReports);
        }
      }
      else {
        GM_deleteValue(":pendingReports");
        doReport(pendingReports);
      }
    }

  }
  else {
    if (
      /^\/$/.test(gPATHNAME) && gmcHome.get("enableScanMain")
      || /^\/tags\//.test(gPATHNAME) && gmcHome.get("enableScanTags")
      || /^\/scripts(?:\/?$|\/search\/?$)/.test(gPATHNAME) && gmcHome.get("enableScanScripts")
      || /^\/groups\/\d+\/scripts/.test(gPATHNAME) && gmcHome.get("enableScanGroups")
      || /(^\/users\/.+?\/(?:scripts|favorites)|^\/home\/(?:scripts|favorites))/.test(gPATHNAME) && gmcHome.get("enableScanScriptWright")
      || /^\/scripts\/show\//.test(gPATHNAME)
      || /^\/topics\//.test(gPATHNAME)
    ) {
      init();
    }
  }

})();
