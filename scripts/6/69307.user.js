
(function () {
  "use strict";

// ==UserScript==
// @name          uso - Count Issues
// @namespace     http://userscripts.org/users/37004
// @description   Counts issues on USO
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @contributor   sizzlemctwizzle (http://userscripts.org/users/27715)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       1.0.1.1esr4
// @icon          https://s3.amazonaws.com/uso_ss/icon/69307/large.png

// @include   /^https?://userscripts\.org(?:\:\d+)?/scripts//
// @include   /^https?://userscripts\.org(?:\:\d+)?/topics//
// @include   /^https?://userscripts\.org(?:\:\d+)?/reviews//
// @exclude   /^https?://userscripts\.org(?:\:\d+)?/scripts/diff//
// @exclude   /^https?://userscripts\.org(?:\:\d+)?/scripts/version//

// @include   http://userscripts.org/scripts/*/*
// @include   https://userscripts.org/scripts/*/*
// @include   http://userscripts.org/topics/*
// @include   https://userscripts.org/topics/*
// @include   http://userscripts.org/reviews/*
// @include   https://userscripts.org/reviews/*
// @exclude   http://userscripts.org/scripts/diff/*
// @exclude   https://userscripts.org/scripts/diff/*
// @exclude   http://userscripts.org/scripts/version/*
// @exclude   https://userscripts.org/scripts/version/*

// @updateURL   http://userscripts.org:8080/scripts/source/69307.meta.js
// @installURL  http://userscripts.org:8080/scripts/source/69307.user.js
// @downloadURL http://userscripts.org:8080/scripts/source/69307.user.js

// @require http://userscripts.org:8080/scripts/source/115323.user.js
// @require https://raw.github.com/einars/js-beautify/master/js/lib/beautify.js
// @require http://userscripts.org:8080/scripts/version/87269/575920.user.js
// @require https://raw.github.com/Martii/GM_config/a0d0066ffaefb5fbb3402c3d46ac705e8b4124d8/gm_config.js

// @resource icon https://s3.amazonaws.com/uso_ss/icon/69307/large.png
// @resource gmc  https://s3.amazonaws.com/uso_ss/24274/large.png
// @resource reload https://s3.amazonaws.com/uso_ss/24280/large.png

// @grant GM_getResourceURL
// @grant GM_getValue
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setValue
// @grant GM_xmlhttpRequest

// ==/UserScript==

  /** CHANGELOG: http://userscripts.org/topics/46434#posts-last **/

  if (!document || !document.body || location.hash == "#posts-last")
    return;

  /**
   *
   */
  function getScript_nameNode() {
    let xpr = document.evaluate(
    "//h2[contains(concat(' ', normalize-space(@class), ' '), ' title ')]/a|//h2[contains(concat(' ', normalize-space(@class), ' '), ' title ')]",
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );

    return (xpr.snapshotItem((xpr.snapshotLength > 1) ? 1 : 0));
  }

  /**
   *
   */
  function getScript_summaryNodes() {
    let xpr = document.evaluate(
    "//div[contains(concat(' ', normalize-space(@class), ' '), ' script_summary ')]",
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    if (xpr) {
      let nodes = [];
      for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
        nodes.push(thisNode);

      return (nodes.length) ? nodes : undefined;
    }
  }

  /**
   *
   */
  function getScriptid() {
    let scriptid = location.pathname.match(/\/scripts\/.+\/(\d+)/i);
    if (!scriptid) {
      if (script_nameNode && script_nameNode.pathname)
        scriptid = script_nameNode.pathname.match(/\/scripts\/show\/(\d+)/i);
    }
    return (scriptid) ? scriptid[1] : undefined;
  }

  /**
   *
   */
  function countIssues(aNodeHook, aNodeSpan, aDoc) {
    if (aNodeHook.firstChild.nodeType == 1)
      aNodeHook.firstChild.textContent += " ";
    else
      aNodeHook.textContent += " ";

      if (aDoc) {
        let
          countYes = 0,
          countNo = 0
        ;

        [
          "broken_votes",
          "copy_votes",
          "harmful_votes",
          "spam_votes",
          "vague_votes"
        ].forEach(function (e, i, a) {
          let xpr = aDoc.evaluate(
            "//a[contains(@href,'/scripts/issues/" + scriptid + "#" + e + "')]",
            aDoc.body,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          );
          if (xpr && xpr.singleNodeValue) {
            let thisNode = xpr.singleNodeValue;

            let matches = thisNode.textContent.match(/(\d+) of (\d+) voted yes/i);
            if (matches) {
              countYes += parseInt(matches[1]);
              countNo += parseInt(matches[2]) - parseInt(matches[1]);
            }
          }
        });

        aNodeSpan.textContent = countYes;
        if (countYes > countNo)
          aNodeSpan.classList.add("blah");
      }
      else
        aNodeSpan.classList.add("blah");

    if (aNodeHook.firstChild.nodeType == 1)
      aNodeHook.firstChild.appendChild(aNodeSpan);
    else
      aNodeHook.appendChild(aNodeSpan);
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
    for (let line in lines) {
      [, name, value] = lines[line].replace(/\s+$/, "").match(re);
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
          if (!(header[key] instanceof Array))
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
  function simpleTranscodeDotNotation(aLine, aCounter, aLoop) { // NOTE: Fuzzy
    let matched =  aLine.match(/\[\"(\w+)\"\]/);
    if (matched) {
      aLine = aLine.replace(matched[0], "." + matched[1]);
      ++aCounter;
      return [aLine, aCounter, true];
    }
    else
      return [aLine, aCounter, false];
  }

  function simpleTranscodeURLdecode(aLine, aCounter, aLoop) { // NOTE: Fuzzy
    let matched = aLine.match(/\%([\d(?:A-F|a-f)]{2})/);
    if (matched) {
      aLine = aLine.replace(matched[0], String.fromCharCode(parseInt("0x" + matched[1], 16)), "");
      ++aCounter;
      return [aLine, aCounter, true];
    }
    else
      return [aLine, aCounter, false];
  }

  function simpleTranscodeHex(aLine, aCounter, aLoop) { // NOTE: Fuzzy
    let matched = aLine.match(/\\x([\d(?:A-F|a-f)]{2})/);
    if (matched) {
      aLine = aLine.replace(matched[0], String.fromCharCode(parseInt("0x" + matched[1], 16)), "");
      ++aCounter;
      return [aLine, aCounter, true];
    }
    else
      return [aLine, aCounter, false];
  }

  function simpleTranscode(aSource, aCounter) {
    aSource = js_beautify(aSource.replace(/[“”]/g, '"'), {indent_size: 1, indent_char: '\t'});

    let dummy = 0;

    let lines = aSource.split(/[\r\n]/);
    for (let i = 0, loop; i < lines.length; i++) {
      loop = true;
      while (loop)
        [lines[i], aCounter, loop] = simpleTranscodeHex(lines[i], aCounter, loop);

      loop = true;
      while (loop)
        [lines[i], dummy, loop] = simpleTranscodeDotNotation(lines[i], dummy, loop);

      loop = true;
      while (loop)
        [lines[i], dummy, loop] = simpleTranscodeURLdecode(lines[i], dummy, loop);
    }
    aSource = lines.join("\n");

    return [aSource, aCounter];
  }

  /**
   *
   */
  function displayValueResource(aNodeUl, aNodeLi, aResourceName, aTextContent, aTitle, aHref, aForced) {

    if (aResourceName) {
      let nodeSpan = document.createElement("span");
      nodeSpan.classList.add("resourceName");
      nodeSpan.textContent = aResourceName;

      aNodeLi.appendChild(nodeSpan);
    }

    let nodeA;
    if (aHref) {
      nodeA = document.createElement("a");
      nodeA.href = aHref;
      nodeA.rel = "nofollow";
      nodeA.textContent = aTextContent;
      if (aForced)
        nodeA.classList.add("blah");

      aNodeLi.appendChild(nodeA);
    }

    if (!aResourceName || !aHref) {
      aNodeLi.textContent = aTextContent;
      if (aForced)
        aNodeLi.classList.add("blah");
    }

    if (aTitle)
      aNodeLi.title = aTitle;

    aNodeUl.appendChild(aNodeLi);

    return nodeA;
  }

  /**
   *
   */
  function checkUSOValue(aNodeA, aScriptid) {
    GM_xmlhttpRequest({
      retry: 5,
      method: "HEAD",
      url: "/scripts/show/" + aScriptid,
      onload: function(xhr) {
        switch (xhr.status) {
          case 500:
          case 502:
          case 503:
            if (this.retry-- > 0)
              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
            else
              aNodeA.classList.add("unknown");
            break;
          case 200:
            aNodeA.classList.add("checked");
            break;
          case 404:
            if (!halt404) {
              if (this.retry-- > 0) {
                setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
                break;
              }
            }
          default:
            aNodeA.classList.add("blah");
            break;
        }
    }});
  }

  /**
   *
   */
  function displayValue(aNodeUl, aNodeLi, aTextContent, aTitle, aHref, aForced) {
    let nodeA;
    if (aHref) {
      nodeA = document.createElement("a");
      nodeA.href = aHref;
      nodeA.rel = "nofollow";
      nodeA.textContent = aTextContent;
      if (aForced)
        nodeA.classList.add("blah");

      aNodeLi.appendChild(nodeA);
    }
    else {
      aNodeLi.textContent = aTextContent;
      if (aForced)
        aNodeLi.classList.add("blah");
    }

    if (aTitle)
      aNodeLi.title = aTitle;

    aNodeUl.appendChild(aNodeLi);

    return nodeA;
  }

  /**
   *
   */
  function displayName(aHookNode, aName, aValues, aForced) {
    if (typeof aValues == "string")
      aValues = new Array(aValues);

    let nodeImg = document.createElement("img");
    nodeImg.src = GM_getResourceURL("icon");
    nodeImg.title = "uso - Count Issues";
    nodeImg.alt = "Count Issues";

    let homepageNodeA = document.createElement("a");
    homepageNodeA.href = "/scripts/show/69307";

    homepageNodeA.appendChild(nodeImg);

    let nodeSpan = document.createElement("span");
    nodeSpan.textContent = (aValues) ? aValues.length : "0";
    if (aForced)
      nodeSpan.classList.add("blah");

    let nodeA = document.createElement("a");
    nodeA.href = protocol + "//sf.net/apps/mediawiki/greasemonkey/index.php?title=Metadata_Block#.40" + aName;
    nodeA.textContent = "@" + aName;

    let nodeH6 = document.createElement("h6");
    nodeH6.appendChild(nodeA);
    nodeH6.appendChild(document.createTextNode(" "));
    nodeH6.appendChild(nodeSpan);
    nodeH6.appendChild(homepageNodeA);

    aHookNode.appendChild(nodeH6);

    if (aValues) {
      let nodeUl = document.createElement("ul");

      let matches, re;

      for (let value in aValues) {
        let valued = aValues[value];

        let nodeLi = document.createElement("li");

        switch (aName) {
          case "downloadURL":
          case "installURL":
            re = new RegExp("^(?:https?:\\/\\/userscripts\\.org(?:\\:\\d+)?\\/scripts\\/source\\/)?(\\d+)\\.user\\.js", "i");
            matches = valued.match(re);
            if (matches && matches[1] == scriptid) {
              let itemNode = displayValue(nodeUl, nodeLi, valued, valued, "/scripts/show/" + matches[1]);
              if (gmcHome.get("checkAgainstHomepageUSO"))
                checkUSOValue(itemNode, matches[1]);
            }
            else {
              re = new RegExp("^file:", "i");
              matches = valued.match(re);
              if (matches)
                displayValue(nodeUl, nodeLi, valued, valued);
              else {
                nodeSpan.classList.add("blah");
                displayValue(nodeUl, nodeLi, valued, valued, valued, true);
              }
            }
            break;
          case "icon":
            matches = valued.match(/^(https?:\/\/.*)/i);
            if (matches)
              displayValue(nodeUl, nodeLi, matches[1], matches[1], matches[1]);
            else {
              matches = valued.match(/^(data:image\/(\S+?);?\w+?,.*)/i);
              if (matches && matches[2].toLowerCase() != "svg+xml" && matches[2].toLowerCase() != "x-svg") {
                let nodeImg = document.createElement("img");
                nodeImg.src = matches[1];
                nodeImg.classList.add("aoicon");
                nodeImg.title = "~" + parseInt(matches[1].length / 1024 * 10) / 10 + "K " + matches[1].match(/^data:(?:\w+\/\S+?;?\w+?,)?/i) + "\u2026";
                nodeLi.appendChild(nodeImg);

                nodeUl.appendChild(nodeLi);
              }
              else
                displayValue(nodeUl, nodeLi, valued);
            }
            break;
          case "namespace":
            matches = valued.match(/^(https?:\/\/.*)/i);
            if (matches)
              displayValue(nodeUl, nodeLi, matches[1], matches[1], matches[1]);
            else
              displayValue(nodeUl, nodeLi, valued, valued);
            break;
          case "require":
            re = new RegExp("^(?:https?:\\/\\/(?:www\\.|greasefire\\.)?userscripts\\.org(?:\\:\\d+)?\\/scripts\\/(?:source|version)\\/)?(\\d+)(?:\\/\\d+)?\\.(?:user|meta)\\.js", "i");
            matches = valued.match(re);
            if (matches) {
              let itemNode = displayValue(nodeUl, nodeLi, valued, valued, "/scripts/show/" + matches[1]);
              if (gmcHome.get("checkAgainstHomepageUSO"))
                checkUSOValue(itemNode, matches[1]);
            }
            else
              displayValue(nodeUl, nodeLi, valued, valued, valued);
            break;
          case "resource":
            matches = valued.match(/^(\S+)\s+(https?:\/\/.*)/i);
            if (matches && matches.length > 2) {
              let
                resourceName = matches[1],
                url = matches[2]
              ;
              re = new RegExp("^(?:https?:\\/\\/(?:www\\.|greasefire\\.)?userscripts\\.org(?:\\:\\d+)?\\/scripts\\/(?:source|version)\\/)?(\\d+)(?:\\/\\d+)?\\.(?:user|meta)\\.js", "i");
              matches = url.match(re);
              if (matches) {
                let itemNode = displayValueResource(nodeUl, nodeLi, resourceName, url, url, "/scripts/show/" + matches[1]);
                if (gmcHome.get("checkAgainstHomepageUSO"))
                  checkUSOValue(itemNode, matches[1]);
              }
              else
                displayValueResource(nodeUl, nodeLi, resourceName, url, url, url);
            }
            else {
              displayValueResource(nodeUl, nodeLi, null, valued, valued, null, true);
            }
            break;
          case "updateURL":
            re = new RegExp("^(?:https?:\\/\\/userscripts\\.org(?:\\:\\d+)?\\/scripts\\/source\\/)?(\\d+)\\.meta\\.js", "i");
            matches = valued.match(re);
            if (matches && matches[1] == scriptid) {
              let itemNode = displayValue(nodeUl, nodeLi, valued, valued, "/scripts/show/" + matches[1]);
              if (gmcHome.get("checkAgainstHomepageUSO"))
                checkUSOValue(itemNode, matches[1]);
            }
            else {
              re = new RegExp("^(?:about:|file:)", "i");
              matches = valued.match(re);
              if (matches)
                displayValue(nodeUl, nodeLi, valued, valued);
              else {
                nodeSpan.classList.add("blah");
                displayValue(nodeUl, nodeLi, valued, valued, valued, true);
              }
            }
            break;
          default:
            displayValue(nodeUl, nodeLi, valued);
            break;
        }

      }

      aHookNode.appendChild(nodeUl);
    }
  }

  /**
   *
   */
  function displayFound(aHookNode, aObj) {

    let nodeUl = document.createElement("ul");
    nodeUl.classList.add("finds");

    let counter = 0;
    for (let [name, value] in Iterator(aObj)) { // NOTE: Watchpoint

      let nodeLi = document.createElement("li");
      if (counter % 2)
        nodeLi.classList.add("bar");
      nodeLi.title = name;

      let nodeSpan = document.createElement("span");
      nodeSpan.textContent = value;

      nodeLi.appendChild(nodeSpan);
      nodeLi.appendChild(document.createTextNode(name));
      nodeUl.appendChild(nodeLi);

      counter++;
    }

    let xpr = document.evaluate(
      ".//span",
      aHookNode,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    if (xpr && xpr.singleNodeValue) {
      let thisNode = xpr.singleNodeValue;

      if (thisNode.textContent == "")
        thisNode.textContent = counter;
      else
        thisNode.textContent = counter + ":" + thisNode.textContent;
    }
    aHookNode.parentNode.insertBefore(nodeUl, aHookNode.nextSibling);
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
              ? parseInt(aNumber / 1024 / 1024 * 10) / 10 + " MiB"
              : parseInt(aNumber / 1024 * 10) / 10 + " KiB"
          : aNumber + " B"
    );
  }

  /**
   *
   */
  function onClickHunt(ev) {
    let hookNode = ev.target;
    hookNode.removeEventListener("click", onClickHunt, false);

    hookNode.classList.add("throb");
    GM_xmlhttpRequest({
      retry: 5,
      url: "/scripts/version/" + scriptid + "/" + lastValueOf(mb, "version", "uso") + ".user.js",
      method: "GET",
      onload: function (xhr) {
        switch (xhr.status) {
          case 404:
            if (halt404)
              this.retry = 0;
          case 500:
          case 502:
          case 503:
            if (this.retry-- > 0)
              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
            else
              hookNode.classList.remove("throb");
            break;
          case 200:
            let responseText = xhr.responseText;

            if (gmcHome.get("showSize")) {
              let xpr = document.evaluate(
              "//li/a[starts-with(., 'Source')]",
                document.body,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              );
              if (xpr && xpr.singleNodeValue) {
                let thisNode = xpr.singleNodeValue;

                thisNode.textContent += " ";
                let nodeSpan = document.createElement("span");
                nodeSpan.textContent = unitSizer(responseText.length);
                thisNode.appendChild(nodeSpan);
              }
            }

            /** Pre deob **/
            let findspre = {};

            let res = gmcHome.get("showStringsStringPre").split("\n");
            for (let re in res) {
              let rez = res[re].trim();
              if (rez) {
                let matches = responseText.match(new RegExp(rez, "gm"));
                for (let match in matches)
                  findspre[matches[match]] = (matches[match] in findspre) ? findspre[matches[match]] + 1 : 1;
              }
            }

            if (gmcHome.get("deobJsCode")) {
              try {
                responseText = JsCode.deobfuscate(responseText);
              }
              catch (e) {
                let msg = 'Aborting JsCode\n' + e.name + '\n' + e.message;
                console.warn(msg);
              }
            }

            let hexCount;
            if (gmcHome.get("deobST")) {
              try {
                [responseText, hexCount] = simpleTranscode(responseText, 0);
              }
              catch(e) {
                let msg = 'Aborting Simple Transcode\n' + e.name + '\n' + e.message;
                console.warn(msg);
              }
            }

            /** Post deob **/
            let postfinds = {};

            res = gmcHome.get("showStringsString").split("\n");
            for (let re in res) {
              let rez = res[re].trim();
              if (rez) {
                let matches = responseText.match(new RegExp(res[re], "gm"));
                for (let match in matches)
                  postfinds[matches[match]] = (matches[match] in postfinds) ? postfinds[matches[match]] + 1 : 1;
              }
            }

            document.evaluate(
              ".//span",
              hookNode,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              xpr
            );
            if (xpr && xpr.singleNodeValue) {
              let thisNode = xpr.singleNodeValue;

              if (postfinds.toSource() != "({})")
                displayFound(hookNode, postfinds);
              else
                thisNode.textContent = "0";

              if (findspre.toSource() != "({})")
                displayFound(hookNode, findspre);
              else
                thisNode.textContent = "0:" + thisNode.textContent;
            }

            hookNode.classList.remove("throb");
            hookNode.classList.remove("lost");
            hookNode.classList.add("found");

            break;
        }
      }
    });

  }

  /**
   *
   */
  function renumber(aHookNode) {
    let numberNode = document.getElementById("number");

    if (numberNode.hasChildNodes())
      while (numberNode.hasChildNodes())
        numberNode.removeChild(numberNode.firstChild);

    numberNode.classList.remove("err");

    // Calculate width of numbers
    let newlines = aHookNode.textContent.match(/\n/g);
    if (newlines)
      newlines = newlines.length;
    else
      newlines = 0;

    let digits = (parseInt(newlines) + 1).toString().length;
    let textWidth = parseInt(getComputedStyle(aHookNode, null).getPropertyValue("font-size").replace(/px/, "") / 1.5); // NOTE: Fuzzy

    numberNode.style.setProperty("width", (textWidth * digits) + "px", "");

    // Create numbers
    let line = 1;
    do {
      let nodeA = document.createElement("a");
      nodeA.id = "line-" + line;
      nodeA.href = "#line-" + line;
      nodeA.textContent = line;
      if (line % 10 == 0 || line == 1)
        nodeA.classList.add("surge");

      let nodeDiv = document.createElement("div");

      nodeDiv.appendChild(nodeA);
      numberNode.appendChild(nodeDiv);
    } while (line++ <= newlines);

    // Show numbers
    numberNode.classList.remove("HID");

    aHookNode.parentNode.insertBefore(numberNode, aHookNode);
    aHookNode.style.setProperty("margin-left", numberNode.offsetWidth + "px", "");
  }

  /**
   *
   */
  function onMouseoverVersion(ev) {
    let targetNode = ev.target;

    if (!targetNode.title && !targetNode.classList.contains("throb")) {
      targetNode.classList.add("throb");

      let matches = targetNode.href.match(/\/(\d+)\.user\.js$/);
      if (!matches) {
        let msg = 'Fatal error... Unable to locate diffid... Aborting this try';
        console.error(msg);
      }

      let diffid = matches[1];

      GM_xmlhttpRequest({
        method: "GET",
        url: "/scripts/version/" + scriptid + "/" + diffid + ".meta.js",
        onload: function (xhr) {
          targetNode.classList.remove("throb");
          switch (xhr.status) {
            case 200:
              targetNode.removeEventListener("mouseover", onMouseoverVersion, false);

              let
                  diffMb = parseMeta(xhr.responseText),
                  title = ""
              ;

              let names = gmcHome.get("showVersionsKeysString").split(",");
              for (let name in names) {
                let prefix, key;
                [key, prefix] = names[name].split(/:/).reverse();

                if (!prefix && typeof diffMb[key] != "undefined")
                  title += '@' + key + ' ' + diffMb[key] + '\n';
                else if (prefix && diffMb[prefix][key])
                  title += '@' + prefix + ":" + key + ' ' + diffMb[prefix][key] + '\n';
              }

              if (title != "")
                targetNode.title = title;

              if (gmcHome.get("archiveMode")) {

                let dateid = "";
                if (gmcHome.get("archiveDate")) {
                  let utc = new Date(diffMb["uso"]["timestamp"]);
                  dateid = utc.toLocaleFormat(".%Y%m%d%H%M.%S"); // NOTE: Watchpoint
                }

                let hashid = "";
                if (gmcHome.get("archiveHash")) {
                  hashid = "." + diffMb["uso"]["hash"];
                }

                let thatNode = targetNode.previousSibling.previousSibling;
                thatNode.setAttribute("download", thatNode.getAttribute("download").replace(/\.user\.js$/, dateid + hashid + ".user.js"));
                thatNode.title = thatNode.title.replace(/\.user\.js$/, dateid + hashid + ".user.js");
              }

              break;

            default:
              console.log('Untrapped status code of : ' + xhr.status);
              break;
          }
        }
      });
    }
  }

  /**
   *
   */
  function getVersions(aUrl, aPreviousVersionsNode) {
    GM_xmlhttpRequest({
      retry: 5,
      method: "GET",
      url: aUrl,
      onload: function (xhr) {
        switch (xhr.status) {
          case 404:
            if (halt404)
              this.retry = 0;
          case 500:
          case 502:
          case 503:
            if (this.retry-- > 0)
              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
            else {
              if (aPreviousVersionsNode)
                aPreviousVersionsNode.parentNode.classList.remove("throb");

              let msg = 'Unable to retrieve the versions page at ' + aUrl;
              console.warn(msg);
            }
            break;
          case 200:
            let
                parser = new DOMParser(),
                doc = parser.parseFromString(xhr.responseText, "text/html")
            ;

            // ** Nab pagination **
            let paginationNode;
            let xpr = doc.evaluate(
              "//div[contains(concat(' ', normalize-space(@class), ' '), ' pagination ')]",
              doc.body,
              null,
              XPathResult.FIRST_ORDERED_NODE_TYPE,
              null
            );
            if (xpr && xpr.singleNodeValue) {
              let thisNode = xpr.singleNodeValue;

              paginationNode = thisNode.cloneNode(true);
            }

            // ** Nab versions **
            let versionsNode;
            doc.evaluate(
              "//div[@id='root']/div[contains(concat(' ', normalize-space(@class), ' '), ' container ')]/div[@id='content']/ul[not(@id)]/li",
              doc.body,
              null,
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              xpr
            );

            if (xpr) {
              let nodeUl = document.createElement("ul");
              for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
                let
                    dateNode = thisNode.firstChild,
                    diffNode = thisNode.firstChild.nextSibling
                ;

                let dateid = dateNode.textContent.replace(/\n\[/, "").trim();

                if (gmcHome.get("showVersionsLocale")) {
                  // Adjust only if logged out
                  let xpr = doc.evaluate(
                    "//ul[contains(concat(' ', normalize-space(@class), ' '), ' login_status ')]//a[starts-with(@href, '/login')]",
                    doc.body,
                    null,
                    XPathResult.FIRST_ORDERED_NODE_TYPE,
                    null
                  );
                  if (xpr && xpr.singleNodeValue) {
                    let utc = new Date(dateid + " UTC");
                    dateid = utc.toLocaleFormat("%b %d, %Y %H:%M"); // NOTE: Watchpoint
                  }
                }

                let matches = diffNode.getAttribute("href").match(/\/scripts\/version\/\d+\/(\d+)\.user\.js/);
                if (!matches) {
                  let msg = 'Fatal error in determining diffid... Aborting?';
                  console.error(msg);
                  return; // die from this function
                }

                let diffid = matches[1];

                  let installNodeA = document.createElement("a");
                  installNodeA.href = "/scripts/version/" + scriptid + "/" + diffid + ".user.js";
                  installNodeA.textContent = dateid;

                  if (gmcHome.get("showVersionsKeys"))
                    installNodeA.addEventListener("mouseover", onMouseoverVersion, false);

                  let downloadNodeA;
                  if (gmcHome.get("archiveMode")) {
                    downloadNodeA = document.createElement("a");
                    downloadNodeA.href = "/scripts/version/" + scriptid + "/" + diffid + ".user.js#";
                    downloadNodeA.textContent = "download";
                    downloadNodeA.title = scriptid + "." + diffid + ".user.js";
                    downloadNodeA.setAttribute("download", scriptid + "." + diffid + ".user.js");
                  }

                  let diffNodeA = document.createElement("a");
                  diffNodeA.href = "/scripts/diff/" + scriptid + "/" + diffid;
                  diffNodeA.textContent = "changes";
                  diffNodeA.title = "\u2206 symmetric difference";
                  diffNodeA.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.target.parentNode.classList.add("throb");

                    let targetNode = ev.target;
                    GM_xmlhttpRequest({
                      retry: 5,
                      method: "GET",
                      url: targetNode.pathname,
                      onload: function (xhr) {
                        switch (xhr.status) {
                          case 404:
                            if (halt404)
                              this.retry = 0;
                          case 500:
                          case 502:
                          case 503:
                            if (this.retry-- > 0)
                              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
                            else {
                              // Clear retrieving Selection markers
                              let listNode = targetNode.parentNode.parentNode;

                              let itemNode = listNode.firstChild;
                              while (itemNode) {
                                itemNode.classList.remove("throb");
                                itemNode = itemNode.nextSibling;
                              }
                            }
                            break;
                          case 200:
                            let
                                parser = new DOMParser(),
                                doc = parser.parseFromString(xhr.responseText, "text/html")
                            ;

                            let xpr = doc.evaluate(
                              "//pre",
                              doc.body,
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null
                            );
                            if (xpr && xpr.singleNodeValue) {
                              let sourceNode = document.getElementById("source");
                              sourceNode.innerHTML = xpr.singleNodeValue.innerHTML;

                              // Clear all Selection markers
                              let listNode = targetNode.parentNode.parentNode;

                              let itemNode = listNode.firstChild;
                              while (itemNode) {
                                itemNode.classList.remove("current");
                                itemNode.classList.remove("throb");
                                itemNode = itemNode.nextSibling;
                              }

                              // Set current selection marker
                              itemNode = targetNode.parentNode;
                              itemNode.classList.add("current");

                              enableCTTS();

                              // Hide numbering and reset margin for now if present
                              let numberNode = document.getElementById("number");
                              if (numberNode)
                                numberNode.classList.add("HID");

                              sourceNode.style.removeProperty("margin-left");
                            }

                            let currenturlNode = document.getElementById("currenturl");
                            if (currenturlNode)
                              currenturlNode.setAttribute("placeholder", targetNode.protocol + "//" + targetNode.hostname + targetNode.pathname);

                            break;
                        }
                      }
                    });
                  }, false);

                  let viewNodeA = document.createElement("a");
                  viewNodeA.href = "/scripts/version/" + scriptid + "/" + diffid + ".user.js#";
                  viewNodeA.textContent = "view";
                  viewNodeA.title = "\u2229 intersection";
                  viewNodeA.addEventListener("click", function (ev) {
                    ev.preventDefault();
                    ev.target.parentNode.classList.add("throb");

                    let targetNode = ev.target;
                    GM_xmlhttpRequest({
                      retry: 5,
                      method: "GET",
                      url: targetNode.pathname,
                      onload: function (xhr) {
                        switch (xhr.status) {
                          case 404:
                            if (halt404)
                              this.retry = 0;
                          case 500:
                          case 502:
                          case 503:
                            if (this.retry-- > 0)
                              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
                            else {
                              // Clear retrieving Selection markers
                              let listNode = targetNode.parentNode.parentNode;

                              let itemNode = listNode.firstChild;
                              while (itemNode) {
                                itemNode.classList.remove("throb");
                                itemNode = itemNode.nextSibling;
                              }
                            }
                            break;
                          case 200:
                            let responseText = xhr.responseText;

                            if (responseText.match(/[\r\n]$/))
                              responseText = responseText.replace(/[\r\n]*$/, "");

                            let sourceNode = document.getElementById("source");
                            sourceNode.textContent = responseText;

                            // Clear all Selection markers
                            let listNode = targetNode.parentNode.parentNode;

                            let itemNode = listNode.firstChild;
                            while (itemNode) {
                              itemNode.classList.remove("current");
                              itemNode.classList.remove("throb");
                              itemNode = itemNode.nextSibling;
                            }

                            // Set current selection marker
                            listNode = targetNode.parentNode;
                            listNode.classList.add("current");

                            enableCTTS();

                            // If source is < 20KB then autohighlight just like USO does
                            if (xhr.responseText.length < 20480)
                              (wrappedJSObject || window).sh_highlightDocument();

                            if (gmcHome.get("showLineNumbers"))
                              renumber(sourceNode);

                            let currenturlNode = document.getElementById("currenturl");
                            if (currenturlNode)
                              currenturlNode.setAttribute("placeholder", targetNode.protocol + "//" + targetNode.hostname + targetNode.pathname);

                            break;
                        }
                      }
                    });
                  }, false);

                let nodeLi = document.createElement("li");
                nodeLi.appendChild(document.createTextNode("["));
                nodeLi.appendChild(viewNodeA);
                nodeLi.appendChild(document.createTextNode("|"));
                nodeLi.appendChild(diffNodeA);

                if (downloadNodeA) {
                  nodeLi.appendChild(document.createTextNode("|"));
                  nodeLi.appendChild(downloadNodeA)
                }

                nodeLi.appendChild(document.createTextNode("]"));
                nodeLi.appendChild(installNodeA);

                nodeUl.appendChild(nodeLi);

              } /** /for thisNode **/

              let versionsNodeDiv = document.getElementById("versions");
              if (versionsNodeDiv) {
                while (versionsNodeDiv.hasChildNodes())
                  versionsNodeDiv.removeChild(versionsNodeDiv.firstChild);
              }
              else {
                versionsNodeDiv = document.createElement("div");
                versionsNodeDiv.id = "versions";
                versionsNodeDiv.className = "pagetear";

                GM_setStyle({
                    node: gCSS,
                    data:
                      [
                        "#versions p  { margin: 0; }",
                        "#versions p > a { color: #000; font-weight: bold; margin-right: 0.25em; text-decoration: none; }",
                        "#versions p > span { color: #666; font-size: 0.8em; }",
                        "#versions ul { -moz-column-width: " + (!gmcHome.get("archiveMode") ? "19" : "22") + "em; column-width: " + (!gmcHome.get("archiveMode") ? "19" : "22") + "em; list-style: none; margin-bottom: 0.5em; }",
                        "#versions ul a { margin-left: 0.25em; margin-right: 0.25em; }",
                        "#versions ul a:last-child { color: #000; margin-left: 0.5em; text-decoration: none; }",
                        "#versions .current { background-color: #ddd; }",

                      ].join("\n")
                });
              }

              let sourceurlNode = document.getElementById("sourceurl");
              if (sourceurlNode)
                sourceurlNode.parentNode.insertBefore(versionsNodeDiv, sourceurlNode);
              else {
                let msg = 'Hook node for versions and diffs not found';
                console.error(msg);
                return; // die this function
              }

              /** Replace pagination **/
              if (paginationNode) {
                while (versionsNodeDiv.hasChildNodes())
                  versionsNodeDiv.removeChild(versionsNodeDiv.firstChild);

                versionsNodeDiv.appendChild(paginationNode);

                document.evaluate(
                  "//div[contains(concat(' ', normalize-space(@class), ' '), ' pagination ')]/a",
                  document.body,
                  null,
                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                  xpr
                );
                if (xpr)
                  for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
                    thisNode.addEventListener("click", function (ev) {
                      ev.preventDefault();

                      ev.target.classList.add("throb");
                      getVersions(ev.target.pathname + ev.target.search);
                    }, false);
                  }
              }

              /** (Re)create pseudo-header **/
              let nodeSpan = document.createElement("span");
              nodeSpan.textContent = countVersions;

              let nodeA = document.createElement("a");
              nodeA.href = "/scripts/versions/" + scriptid;
              nodeA.textContent = "Source versions and diffs:";

              let nodeP = document.createElement("p");

              nodeP.appendChild(nodeA);
              nodeP.appendChild(nodeSpan);

              if (paginationNode)
                versionsNodeDiv.insertBefore(nodeP, paginationNode);
              else
                versionsNodeDiv.appendChild(nodeP);

              versionsNodeDiv.appendChild(nodeUl);

              if (aPreviousVersionsNode)
                aPreviousVersionsNode.parentNode.parentNode.removeChild(aPreviousVersionsNode.parentNode);

            } /** /xpr existance **/

            break;

        } /** /switch xhr.status **/
      }
    });

  }

  /**
   *
   */
  function onClickVersions(ev) {
    ev.preventDefault();
    ev.target.removeEventListener("click", onClickVersions, false);

    let thisNode = ev.target;

    if (!countVersions) {
      let matches = thisNode.textContent.match(/^(\d+)/);
      if (matches)
        countVersions = parseInt(matches[1]) + 1;
      else
        countVersions = "?";
    }

    let noticeNode = thisNode.parentNode;
    noticeNode.classList.add("throb");

    getVersions("/scripts/versions/" + scriptid, thisNode);
  }

  /**
   *
   */
  function setUrlErr(aMsg) {
    let refreshurlNode = document.getElementById("refreshurl");
    if (refreshurlNode) {
      refreshurlNode.classList.remove("connecting");
      refreshurlNode.classList.remove("loading");
    }

    let urlbarNode = document.getElementById("urlbar");
    if (urlbarNode)
      urlbarNode.classList.add("err");

    if (aMsg)
      console.error(aMsg);
  }

  /**
   *
   */
  function clearUrlErr() {
    let urlbarNode = document.getElementById("urlbar");
    if (urlbarNode)
      urlbarNode.classList.remove("err");
  }

  /**
   *
   */
  function loadUrl(aUrl) {
      let refreshurlNode = document.getElementById("refreshurl");
      if (refreshurlNode)
        refreshurlNode.classList.add("connecting");

      try {
        GM_xmlhttpRequest({
          state: "connecting",
          retry: 5,
          method: "GET",
          url: aUrl,
          onabort: function (xhr) {
            this.state = "reload";
            setUrlErr('Error aborted ' + this.url + ' url');
          },
          onerror: function (xhr) {
            this.state = "reload";
            setUrlErr('Error retrieving ' + this.url + ' url');
          },
          ontimeout: function (xhr) {
            this.state = "reload";
            setUrlErr('Error timed out ' + this.url + ' url');
          },
          onprogress: function (xhr) {
            if (this.state == "connecting") {
              this.state = "loading";
              let refreshurlNode = document.getElementById("refreshurl")
              if (refreshurlNode)
                refreshurlNode.classList.add("loading");
            }
          },
          onload: function (xhr) {
            switch (xhr.status) {
              case 404:
                if (halt404)
                  this.retry = 0;
              case 500:
              case 502:
              case 503:
                if (this.retry-- > 0) {
                  this.state = "connecting";
                  let refreshurlNode = document.getElementById("refreshurl")
                  if (refreshurlNode)
                    refreshurlNode.classList.remove("loading");
                  setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
                }
                else {
                  this.state = "reload";
                  setUrlErr('Error retrying ' + xhr.finalUrl + ' url');
                }
                break;
              case 200:
                this.state = "processing";
                let refreshurlNode = document.getElementById("refreshurl")
                if (refreshurlNode)
                  refreshurlNode.classList.add("processing");

                // start twiddling
                let sourceNode = document.getElementById("source");

                while (sourceNode.hasChildNodes())
                  sourceNode.removeChild(sourceNode.firstChild);

                sourceNode.textContent = xhr.responseText.trim();

                enableCTTS();

                // If source is < 20KB then autohighlight just like USO does
                if (xhr.responseText.length < 20480)
                  (wrappedJSObject || window).sh_highlightDocument();

                if (gmcHome.get("showLineNumbers"))
                  renumber(sourceNode);

                let currenturlNode = document.getElementById("currenturl");
                if (currenturlNode) {
                  let finalUrl = xhr.finalUrl;

                  currenturlNode.setAttribute("placeholder", finalUrl);
                  currenturlNode.value = "";

                  let currenturlsNode = document.getElementById("currenturls");
                  if (currenturlsNode) {
                    let
                        found = false,
                        xpr = document.evaluate(
                          "./option",
                          currenturlsNode,
                          null,
                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                          null
                        )
                    ;
                    if (xpr)
                      for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
                        if (thisNode.value == finalUrl) {
                          found = true;
                          break;
                        }

                    if (!found) {
                      let nodeOption = document.createElement("option");
                      nodeOption.value = finalUrl;

                      currenturlsNode.insertBefore(nodeOption, currenturlsNode.firstChild);
                    }
                  }
                }

                this.state = "reload";
                if (refreshurlNode) {
                  refreshurlNode.classList.remove("connecting");
                  refreshurlNode.classList.remove("loading");
                  refreshurlNode.classList.remove("processing");
                }

                break;
              default:
                this.state = "reload";
                setUrlErr('Error reponse ' + xhr.status + ' for ' + xhr.finalUrl + ' url');
                break;
            }
          }
        });
      }
      catch (e) {
        setUrlErr();
      }
    }

  function enableCTTS() {
    let xpr = document.evaluate(
      "//button[.='Change Tabs to Spaces']",
      document.body,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );
    if (xpr && xpr.singleNodeValue) {
      let thisNode = xpr.singleNodeValue;

      thisNode.removeAttribute("disabled");
      thisNode = thisNode.nextSibling;
      thisNode.removeAttribute("disabled");
    }
  }

  /**
   *    main()
   */
  let
      halt404 = true,
      delayRetryMin = 3000,
      delayRetryMax = 8000,
      delayFind = 0,
      protocol = "http" + (/^https:$/i.test(location.protocol) ? "s" : "") + ":",
      pathname = location.pathname,
      script_nameNode = getScript_nameNode(),
      script_summaryNodes = getScript_summaryNodes(),
      scriptid = getScriptid(),
      mb,
      gCSS = GM_setStyle({
        media: "screen, projection",
        data:
          [
            ".hid { display: none; }",
            ".HID { display: none !important }",

            ".throb { animation: 1s ease 0s alternate none infinite script-nav-throb; }",
            "@keyframes script-nav-throb { from { background-color: #ddd; } to { background-color: #fff; } }",
            ".blah { color: #f00 !important; }",

            ""
          ].join("\n")
      }),
      countVersions,
      gmcHome,
      gmcTextareas = [
        "hideNavTabString",
        "hideH6String",
        "showKeysString",
        "insertH6StringMd",
        "showStringsStringPre",
        "showStringsString",
        "insertH6StringFinds",
        "showVersionsKeysString"
      ],
      uac = false
  ;

  /** Detect UAC **/
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

    // Nearest fix(es) for any glitches with UAC
    GM_setStyle({
      node: gCSS,
      data: [
        "#screenshots { width: 98% !important; }",
        "#activity, #topics { float: inherit !important; }" // Alternative: "h6 { clear: both; }",

      ].join("\n")
    });
  }

  if (typeof GM_configStruct == "undefined") {
    let msg = 'Fatal error. GM_config not found';
    console.error(msg);
    return;
  }

  // Let the GC know to remove some preallocated memory
  GM_config = undefined;

  /** Create data store and default UI **/
  gmcHome = new GM_configStruct();
  gmcHome.id = "gmc69307home";

  let full_descriptionNode = document.getElementById("full_description");
  if (full_descriptionNode && !full_descriptionNode.firstChild) {
    let nodeDiv = document.createElement("div");
    full_descriptionNode = divNode.appendChild(nodeDiv);
  }
  else {
    let nodeDiv = document.createElement("div");
    if (full_descriptionNode)
      full_descriptionNode = full_descriptionNode.insertBefore(nodeDiv, full_descriptionNode.firstChild);
    else
      full_descriptionNode = document.body.appendChild(nodeDiv);
  }

  gmcHome.init(
    full_descriptionNode,
    [
      '<img alt="Count Issues" title="uso &ndash; Count Issues" src="' + GM_getResourceURL("icon") + '" />',
      '<p>Preferences</p>',
      '<span>',
        '<a href="' + protocol + '//github.com/sizzlemctwizzle/GM_config/wiki/">',
            '<img alt="GM_config" title="Powered in part by GM_config" src="' + GM_getResourceURL("gmc") + '" />',
        '</a>',
      '</span>'

    ].join(""),

    GM_setStyle({
      node: null,
      data:
        [
          "@media screen, projection {",
                "#gmc69307home { position: static !important; z-index: 0 !important; width: auto !important; height: auto !important; max-height: none !important; max-width: none !important; margin: 0 0 0.5em 0 !important; border: 1px solid #ddd !important; clear: right !important; }",

                "#gmc69307home_header a { display: inline; }",
                "#gmc69307home_header img { vertical-align: middle; }",
                "#gmc69307home_header > img { height: 32px; margin-right: 0.25em; width: 32px; }",
                "#gmc69307home_header > p { display: inline; margin: 0; vertical-align: middle; }",
                "#gmc69307home_header span { float: right; }",
                "#gmc69307home_header span > a { display: inline; margin-left: 0.25em; }",
                "#gmc69307home_wrapper { background-color: #eee; padding-bottom: 0.25em; }",
                "#gmc69307home .config_header { background-color: #333; color: #fff; font-size: 1.57em; margin: 0; padding: 0 0.5em; text-align: left; }",
                "#gmc69307home .config_var { clear: both; margin: 0.33em; padding: 0; }",
                "#gmc69307home .field_label { color: #333; font-size: 100%; font-weight: normal; margin: 0 0.25em; position: relative; top: -0.2em; }",
                "#gmc69307home .section_header_holder { margin: 0.25em 1.5em !important; }",
                "#gmc69307home .section_desc { margin: 0.25em 1.5em !important; }",

                    ".gmc-yellownote { background-color: #ffd; font-size: 0.66em !important; }",
                    ".gmc69307home-invisilink { text-decoration: none; color: #000; }",
                    ".gmc69307home-invisilink:hover { color: #000; }",

                    "#gmc69307home_wrapper textarea,",
                    "#gmc69307home_wrapper input",
                    "{ font-size: 1em; }",

                    "#gmc69307home_wrapper input[type='text']",
                    "{ text-align: right; width: 2em; }",

                      "#gmc69307home_field_hideNavTabString,",
                      "#gmc69307home_field_hideH6String,",
                      "#gmc69307home_field_showKeysString,",
                      "#gmc69307home_field_insertH6StringMd,",
                      "#gmc69307home_field_showStringsStringPre,",
                      "#gmc69307home_field_showStringsString,",
                      "#gmc69307home_field_insertH6StringFinds,",
                      "#gmc69307home_field_showVersionsKeysString",
                      "{ margin-left: 1.7em; min-width: 95.1%; max-width: 95.1%; word-break: break-all; }",

                      "#gmc69307home_field_hideNavTabString,",
                      "#gmc69307home_field_hideH6String",
                      "{ max-height: 3em; }",

                      "#gmc69307home_field_showKeysString,",
                      "#gmc69307home_field_insertH6StringMd,",
                      "#gmc69307home_field_insertH6StringFinds,",
                      "#gmc69307home_field_showVersionsKeysString",
                      "{ max-height: 9em; }",

                      "#gmc69307home_maxHeightListMd_field_label,",
                      "#gmc69307home_maxHeightListFinds_field_label,",
                      "#gmc69307home_fontSize_field_label",
                      "{ position: static !important; top: auto !important; }",

                        "#gmc69307home_trimSourceCode_var,",

                        "#gmc69307home_hideH6Reinforce_var,",

                        "#gmc69307home_checkAgainstHomepageUSO_var,",
                        "#gmc69307home_insertH6Md_var,",
                        "#gmc69307home_insertH6StringMd_var,",
                        "#gmc69307home_limitMaxHeightMd_var,",

                        "#gmc69307home_showStringsAuto_var,",
                        "#gmc69307home_deobST_var,",
                        "#gmc69307home_deobJsCode_var,",
                        "#gmc69307home_showSize_var,",
                        "#gmc69307home_insertH6Finds_var,",
                        "#gmc69307home_insertH6StringFinds_var,",
                        "#gmc69307home_limitMaxHeightFinds_var,",
                        "#gmc69307home_maxHeightListFinds_var",

                        "#gmc69307home_showVersionsSource_var,",
                        "#gmc69307home_maxContainer_var,",
                        "#gmc69307home_showVersionsLocale_var,",
                        "#gmc69307home_showVersionsKeys_var,",
                        "#gmc69307home_showVersionsKeysString_var,",
                        "{ margin-left: 2em !important; }",

                        "#gmc69307home_archiveMode_var",
                        "{ margin-left: 2em !important; }",

                        "#gmc69307home_archiveDate_var,",
                        "#gmc69307home_archiveHash_var",
                        "{ margin-left: 3.5em !important; }",

                        "#gmc69307home_maxHeightListMd_var,",
                        "#gmc69307home_maxHeightListFinds_var",
                        "{ margin-left: 4em !important; }",

                        "#gmc69307home_hideNavTabString_field_label,",
                        "#gmc69307home_hideH6String_field_label,",
                        "#gmc69307home_showKeysString_field_label,",
                        "#gmc69307home_insertH6StringMd_field_label,",
                        "#gmc69307home_showStringsStringPre_field_label,",
                        "#gmc69307home_showStringsString_field_label,",
                        "#gmc69307home_insertH6StringFinds_field_label,",
                        "#gmc69307home_showVersionsKeysString_field_label",
                        "{ margin-left: 1.75em !important; }",

                "#gmc69307home .reset, #gmc69307home .reset a, #gmc69307home_buttons_holder { text-align: inherit; }",
                "#gmc69307home_buttons_holder { margin: 0.5em; }",
                "#gmc69307home_saveBtn { margin: 0.5em !important; padding: 0 3.0em !important; }",
                "#gmc69307home_resetLink { margin-right: 1.5em; }",
                "#gmc69307home_closeBtn { display: none; }",
          "}",

          "@media print {",
              "#gmc69307home { display: none !important; }",
          "}"

        ].join("\n")
    }),
    {
      'hideNavTab': {
          "section": [],
          "type": 'checkbox',
          "label": 'Hide navigation tab(s) if present',
          "default": false
      },
      'hideNavTabString': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate tab names</em>',
          "default": "Share"
      },
      'trimSourceCode': {
          "type": 'checkbox',
          "label": 'Trim " Code" from the "Source Code" tab <em class="gmc-yellownote">useful for more screen real estate</em>',
          "default": false
      },

      'hideH6': {
          "section": [, ""],
          "type": 'checkbox',
          "label": 'Hide header(s) if present in sidebar',
          "default": false
      },
      'hideH6String': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate headers</em>',
          "default": "Share"
      },
      'hideH6Reinforce': {
          "type": 'checkbox',
          "label": 'Reinforce hidden status',
          "default": true
      },

      'showKeys': {
          "section": [, ""],
          "type": 'checkbox',
          "label": 'Show metadata block key(s) if present or different than USO in sidebar',
          "default": true
      },
      'showKeysString': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate keys</em>',
          "default": "name,icon,description,version,copyright,license,namespace,updateURL,downloadURL,installURL,grant,require,resource,run-at,include,match,exclude"
      },
      'checkAgainstHomepageUSO': {
          "type": 'checkbox',
          "label": 'Check USO script urls for homepage existence <em class="gmc-yellownote">Rate and Limiting may apply</em>',
          "default": false
      },
      'insertH6Md': {
          "type": 'checkbox',
          "label": 'Insert item types before these headers if present <em class="gmc-yellownote">leave blank for first - disable for last</em>',
          "default": false
      },
      'insertH6StringMd': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate headers</em>',
          "default": "Groups,Admin for script,Tags,Other Scripts by Author"
      },
      'limitMaxHeightMd': {
          "type": 'checkbox',
          "label": 'Limit maximum height of all shown item types',
          "default": false
      },
      'maxHeightListMd': {
          "type": 'unsigned number',
          "label": 'em maximum height of all shown item types',
          "default": 10
      },

      'showStrings': {
          "section": [, ""],
          "type": 'checkbox',
          "label": 'Show Lost and Found in sidebar',
          "default": false
      },
      'showStringsStringPre': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use newlines to separate regular expression ready strings before deobfuscation is attempted</em>',
          "default": "p,a,c,k,e,[dr]\ncookie\nGM_xmlhttpRequest\nXMLHttpRequest\nlocation\nexport\n\\b(?:un)?eval\\b\n(?:https?:\\/\\/.*?\\.google\\.com)?\\/?blank\\.html?"
      },
      'showStringsString': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use newlines to separate regular expression ready strings after deobfuscate is attempted</em>',
          "default": "cookie\nGM_xmlhttpRequest\nXMLHttpRequest\nlocation\nexport\n\\b(?:un)?eval\\b\n(?:https?:\\/\\/.*?\\.google\\.com)?\\/?blank\\.html?"
      },
      'showStringsAuto': {
          "type": 'checkbox',
          "label": 'Auto show <em class="gmc-yellownote">WARNING: slower browsing experience and uses more immediate bandwidth</em>',
          "default": false
      },

      'deobST': {
          "type": 'checkbox',
          "label": 'Deobfuscate with Simple Transcode',
          "default": true
      },

      'deobJsCode': {
          "type": 'checkbox',
          "label": 'Deobfuscate with JsCode',
          "default": false
      },

      'showSize': {
          "type": 'checkbox',
          "label": 'Show approximate file size in script navigation bar',
          "default": false
      },
      'insertH6Finds': {
          "type": 'checkbox',
          "label": 'Insert item types before these headers if present <em class="gmc-yellownote">leave blank for first - disable for last</em>',
          "default": false
      },
      'insertH6StringFinds': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate headers</em>',
          "default": "Groups,Admin for script,Tags,Other Scripts by Author"
      },
      'limitMaxHeightFinds': {
          "type": 'checkbox',
          "label": 'Limit maximum height of all shown item types',
          "default": false
      },
      'maxHeightListFinds': {
          "type": 'unsigned number',
          "label": 'em maximum height of all shown item types',
          "default": 10
      },

      'fontSize': {
          "section": [, ""],
          "type": 'unsigned number',
          "label": 'em font size for all items found under the specified item type',
          "default": 1
      },
      'showVersionsSource': {
          "section": [, ""],
          "type": 'checkbox',
          "label": 'Show inline Versions and Diffs on Source Code page',
          "default": true
      },
      'maxContainer': {
          "type": 'checkbox',
          "label": 'Use the maximum container width <em class="gmc-yellownote">active <a href="/scripts/show/34698">userscripts.org alternate CSS</a> required</em>',
          "default": false
      },
      'showVersionsLocale': {
          "type": 'checkbox',
          "label": 'Use Locale instead of UTC when logged out',
          "default": true
      },
      'showVersionsKeys': {
          "type": 'checkbox',
          "label": 'Show metadata block key(s) if present in tooltip',
          "default": false
      },
      'showVersionsKeysString': {
          "type": 'textarea',
          "label": '<em class="gmc-yellownote">use commas to separate keys</em>',
          "default": "name,namespace,version,uso:hash"
      },
      'archiveMode': {
          "type": 'checkbox',
          "label": 'Use archive mode',
          "default": false
      },
      'archiveDate': {
          "type": 'checkbox',
          "label": 'Include date stamp in the filename <em class="gmc-yellownote">hover over the visible dates to retrieve the full date from the meta.js</em>',
          "default": false
      },
      'archiveHash': {
          "type": 'checkbox',
          "label": 'Include file hash in the filename <em class="gmc-yellownote">hover over the visible dates to retrieve the sha1 hash from the meta.js</em>',
          "default": false
      },
      'showLineNumbers': {
          "type": 'checkbox',
          "label": 'Show line numbers on Source Code page <em class="gmc-yellownote">BETA</em>',
          "default": false
      },

      'hideNavTabStringHeight': { "type": 'hidden', "default": "16px" },
      'hideH6StringHeight': { "type": 'hidden', "default": "16px" },
      'showKeysStringHeight': { "type": 'hidden', "default": "16px" },
      'insertH6StringMdHeight': { "type": 'hidden', "default": "16px" },
      'showStringsStringPreHeight': { "type": 'hidden', "default": "96px" },
      'showStringsStringHeight': { "type": 'hidden', "default": "96px" },
      'insertH6StringFindsHeight': { "type": 'hidden', "default": "16px" },
      'showVersionsKeysStringHeight': { "type": 'hidden', "default": "16px" }
    }
  );

  gmcHome.onOpen = function () {
    gmcHome.fields["showStringsStringPre"].node.setAttribute("wrap", "off");
    gmcHome.fields["showStringsString"].node.setAttribute("wrap", "off");
  }

  gmcHome.onSave = function () {
    let
        write = false,
        open = false
    ;

    GM_setStyle({
        node: gCSS,
        data:
          [
            ".md ul { max-height: " + (gmcHome.get("limitMaxHeightMd") ? gmcHome.get("maxHeightListMd") + "em" : "none") + "; }"

          ].join("\n")
    });

    let names = gmcHome.get("showKeysString").split(",");
    for (let i = 0, len = names.length; i < len; ++i) {
      names[i] = names[i].trim();
    }
    names = names.join(",");

    if (names != gmcHome.get("showKeysString")) {
      gmcHome.set("showKeysString", names);
      write = open = true;
    }

    GM_setStyle({
        node: gCSS,
        data:
          [
            ".finds { max-height: " + (gmcHome.get("limitMaxHeightFinds") ? gmcHome.get("maxHeightListFinds") + "em" : "none") + "; }"

          ].join("\n")
    });


    gmcTextareas.forEach(function (e, i, a) {
      GM_setStyle({
          node: gCSS,
          data:
            [
              "textarea#gmc69307home_field_" + e + " { height: " + gmcHome.get(e + "Height") + "; }"

            ].join("\n")
      });

      let height = gmcHome.fields[e].node.clientHeight + "px";
      if (height != gmcHome.get(e + "Height")) {
        gmcHome.set(e + "Height", height);
        write = true;
      }
    });

    GM_setStyle({
        node: gCSS,
        data:
          [
            ".md li, .finds li { font-size: " + gmcHome.get("fontSize") + "em ; }"

          ].join("\n")
    });

    if (write) gmcHome.write();
    if (open) { gmcHome.close(); gmcHome.open(); }
  }

  if (/\/scripts\/show\/69307\/?$/.test(pathname)) {

    gmcTextareas.forEach(function (e, i, a) {
      GM_setStyle({
          node: gCSS,
          data:
            [
              "textarea#gmc69307home_field_" + e + " { height: " + gmcHome.get(e + "Height") + "; }"

            ].join("\n")
      })
    });

    gmcHome.open();

    document.getElementById("gmc69307home").removeAttribute("style");

    gmcTextareas.forEach(function (e, i, a) {
      gmcHome.fields[e].node.setAttribute("spellcheck", "false");
    });
  }

  /**
   *        Hide script-nav entries and optionally trim Source Code label while doing it
   */
  if (gmcHome.get("hideNavTab")) {
    let xpr = document.evaluate(
    "//ul[@id='script-nav']/li",
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    if (xpr)
      for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {

        let tabs = gmcHome.get("hideNavTabString").split(",");
        for (let tab in tabs) {
          let name = tabs[tab].trim();
          if (name) {
            let re = "\\s*" + name;
            if (thisNode.textContent.match(new RegExp(re, "")))
              thisNode.classList.add("hid");
          }
        }

        if (gmcHome.get("trimSourceCode")) {
          let xpr = document.evaluate(
            "..//*[starts-with(text(), 'Source Code')]",
            thisNode,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          );
          if (xpr && xpr.singleNodeValue) {
            let thisNode = xpr.singleNodeValue;

            thisNode.textContent = "Source";
          }
        }
      }
  }

  /**
   *        Hide USO headers in sidebar if present
   */
  if (gmcHome.get("hideH6")) {
    let xpr = document.evaluate(
      "//div[@id='right']//h6",
      document.body,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    if (xpr)
      for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
        let headers = gmcHome.get("hideH6String").split(",");
        for (let header in headers) {
          let name = headers[header].trim();
          if (name) {
            let re = "\\s*" + name;
            if (thisNode.textContent.match(new RegExp(re, ""))) {
              thisNode.classList.add("hid");

              let thatNode = thisNode.nextSibling;
              let loop = true;
              while (loop) {
                if (thatNode.tagName)
                  if (thatNode.tagName.toLowerCase() != "h6")
                    switch (thatNode.tagName.toLowerCase()) {
                      case "script":
                        break;
                      default:
                        if (thatNode.id != "fans")
                          if (gmcHome.get("hideH6Reinforce"))
                            thatNode.classList.add("HID");
                          else
                            thatNode.classList.add("hid");
                        break;
                    }
                  else
                    loop = false;
                thatNode = thatNode.nextSibling;
                if (!thatNode)
                  loop = false;
              }
            }
          }
        }
      }
  }

  if (scriptid) {
    /**
    *    Count Issues
    */

    let xpr = document.evaluate(
      "//ul[@id='script-nav']/li[contains(., 'Issues')]",
      document.body,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    if (xpr && xpr.singleNodeValue) {
      let thisNode = xpr.singleNodeValue;

      let nodeSpan = document.createElement("span");
      nodeSpan.textContent = "?";

      let re = new RegExp("^\/scripts\/issues\/" + scriptid + "\/?$");
      if (re.test(location.pathname))
        countIssues(thisNode, nodeSpan, document);
      else {
        thisNode.classList.add("throb");

        GM_xmlhttpRequest({
          retry: 5,
          method: "GET",
          url: "/scripts/issues/" + scriptid,
          onload: function (xhr) {
            switch (xhr.status) {
              case 404:
                if (halt404)
                  this.retry = 0;
              case 500:
              case 502:
              case 503:
                if (this.retry-- > 0)
                  setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
                else {
                  nodeSpan.classList.add("blah");

                  countIssues(thisNode, nodeSpan);

                  thisNode.classList.remove("throb");
                }
                break;
              case 200:
                let
                    parser = new DOMParser(),
                    doc = parser.parseFromString(xhr.responseText, "text/html")
                ;

                countIssues(thisNode, nodeSpan, doc);

                thisNode.classList.remove("throb");
                break;
              default:
                countIssues(thisNode, nodeSpan);

                thisNode.classList.remove("throb");
                break;
            }
          }
        });
      }
    }

    /** A bunch of other stuff **/

    /**
     *          mb specific
     */
    GM_xmlhttpRequest({
      retry: 5,
      url: "/scripts/source/" + scriptid + ".meta.js",
      method: "GET",
      onload: function (xhr) {
        switch (xhr.status) {
          case 404:
            if (halt404)
              this.retry = 0;
          case 500:
          case 502:
          case 503:
            if (this.retry-- > 0)
              setTimeout(GM_xmlhttpRequest, delayRetryMin + Math.round(Math.random() * (delayRetryMax - delayRetryMin)), this);
            else {
              let msg = 'Unable to retrieve the metadata block';
              console.error(msg);
              return; // die this function
            }
            break;
          case 200:
            mb = parseMeta(xhr.responseText);
            if (!mb) {
              let msg = 'Metadata block is missing';
              console.error(msg);
              return; // die this function
            }

            /** Start twiddling **/

            /**
             *        name key validation on every page of script
             */
            let name = lastValueOf(mb, "name");
            if (name != script_nameNode.textContent.trim()) {
              script_nameNode.classList.add("blah");
              script_nameNode.title = "@name " + name;
            }


            /**
             *        Items specific to script homepage
             */
            if (/\/scripts\/show\//.test(pathname)) {

              /**
               *        If diffid is missing or differs abort
               */
              let xpr = document.evaluate(
                "//meta[@name='uso:version']",
                document.head,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              );
              if (xpr && xpr.singleNodeValue) {
                let thisNode = xpr.singleNodeValue;

                if (lastValueOf(mb, "version", "uso") != thisNode.getAttribute("content")) {
                  let msg = 'Fatal error comparing current meta.js to page meta... Aborting';
                  console.error(msg);
                  return;
                }
              }
              else {
                let msg = 'Fatal error determining version... Aborting';
                console.error(msg);
                return;
              }

              /**
               *        Description, Version, etc. validation
               */

              script_summaryNodes.forEach(function (e, i, a) {
                let xpr = document.evaluate(
                "./p/b[.='Script Summary:' or .='Version:']/following-sibling::text()",
                  e,
                  null,
                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                  null
                );
                if (xpr) {
                  let nodes = [];
                  for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
                    switch (thisNode.previousSibling.textContent.toLowerCase().trim()) {
                      case "script summary:":
                        if (mb["description"]) {
                          if (thisNode.textContent.trim() != lastValueOf(mb, "description")) {
                            thisNode.parentNode.classList.add("blah");
                            thisNode.parentNode.title = "@description " + lastValueOf(mb, "description");
                          }
                        }
                        else {
                          if (thisNode.textContent.trim() != "") {
                            thisNode.parentNode.classList.add("blah");
                            thisNode.parentNode.title = "undefined @description";
                          }
                        }
                        break;
                      case "version:":
                        if (thisNode.textContent.trim() != lastValueOf(mb, "version")) {
                          thisNode.parentNode.classList.add("blah");
                          thisNode.parentNode.title = "@version " + lastValueOf(mb, "version");
                        }
                        break;
                    }
                }
              });

              /**
               *        Sidebar stuff
               */

              let script_sidebarNode = document.getElementById("script_sidebar");
              if (script_sidebarNode) {
                /**
                 *       Metadata
                 */
                if (gmcHome.get("showKeys")) {
                  GM_setStyle({
                    node: gCSS,
                    data:
                      [
                        ".md { margin-bottom: 0.75em; }",
                        ".md h6 > a { color: #000; text-decoration: none; }",
                        ".md h6 > a:hover { color: #000; }",
                        ".md h6 span { color: #666; font-size: 0.7em; }",
                        ".md h6 a:last-child { float: right; opacity: 0; }",
                        ".md h6 a:hover { opacity: 1; }",
                        ".md h6 img { max-height: 1.5em; }",
                        ".md .blah { color: #f00 !important; }",
                        ".md .blah:hover { color: #ff4500; }",
                        ".md .checked { color: #006400 !important; }",
                        ".md .checked:hover { color: #008000; }",
                        ".md .unknown { color: #000 !important; }",
                        ".md .unknown:hover { color: #808080; }",
                        ".md ul { border-width: 0; font-size: x-small; margin: 0; overflow: auto; padding: 0 !important; width: 100%; }",
                        ".md li { color: #808080; white-space: nowrap; }",

                        ".aoicon { max-height: 48px; max-width: 48px; }",
                        ".resourceName { margin-right: 0.5em; }",

                        ""
                      ].join("\n")
                  });

                  if (gmcHome.get("limitMaxHeightMd"))
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".md ul { max-height: " + gmcHome.get("maxHeightListMd") + "em; }"

                          ].join("\n")
                    });

                  GM_setStyle({
                      node: gCSS,
                      data:
                        [
                          ".md li, .finds li { font-size: " + gmcHome.get("fontSize") + "em ; }"

                        ].join("\n")
                  });

                  let nodeDiv = document.createElement("div");
                  nodeDiv.classList.add("md");

                  let names = gmcHome.get("showKeysString").split(",");
                  for (let name in names) {

                    let
                        named = names[name],
                        mbNamed = mb[named]
                    ;

                    switch (named) {
                      case "name":
                        if (mbNamed)
                          if (typeof mbNamed == "string") {
                            if (mbNamed != script_nameNode.textContent)
                              displayName(nodeDiv, named, mbNamed, true);
                          }
                          else
                            displayName(nodeDiv, named, mbNamed, true);
                        else
                          console.error('Fatal error... @name should always exist in meta.js');
                        break;
                      case "namespace":
                        if (mbNamed)
                          if (typeof mbNamed == "string")
                            displayName(nodeDiv, named, mbNamed);
                          else
                            displayName(nodeDiv, named, mbNamed, true);
                        else
                          displayName(nodeDiv, named, null, true);
                        break;
                      case "description":
                        if (/\/scripts\/show\//.test(pathname))
                          script_summaryNodes.forEach(function (e, i, a) {
                            let xpr = document.evaluate(
                            "./p/b[.='Script Summary:']/following-sibling::text()",
                              e,
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null
                            );
                            if (xpr && xpr.singleNodeValue) {
                              let thisNode = xpr.singleNodeValue;

                              if (mbNamed)
                                if (typeof mbNamed == "string") {
                                  if (mbNamed != thisNode.textContent.trim())
                                    displayName(nodeDiv, named, mbNamed, true);
                                }
                                else
                                  displayName(nodeDiv, named, mbNamed, true);
                            }

                          });
                        else {
                          if (mbNamed)
                            if (typeof mbNamed == "string")
                              displayName(nodeDiv, named, mbNamed);
                            else
                              displayName(nodeDiv, named, mbNamed, true);
                        }
                        break;
                      case "version":
                        if (/\/scripts\/show\//.test(pathname))
                          script_summaryNodes.forEach(function (e, i, a) {
                            let xpr = document.evaluate(
                            "./p/b[.='Version:']/following-sibling::text()",
                              e,
                              null,
                              XPathResult.FIRST_ORDERED_NODE_TYPE,
                              null
                            );
                            if (xpr && xpr.singleNodeValue) {
                              let thisNode = xpr.singleNodeValue;

                              if (mbNamed)
                                if (typeof mbNamed == "string") {
                                  if (mbNamed != thisNode.textContent.trim())
                                    displayName(nodeDiv, named, mbNamed, true);
                                }
                                else
                                  displayName(nodeDiv, named, mbNamed, true);
                            }

                          });
                        else {
                          if (mbNamed)
                            if (typeof mbNamed == "string")
                              displayName(nodeDiv, named, mbNamed);
                            else
                              displayName(nodeDiv, named, mbNamed, true);
                        }
                        break;
                      case "include":
                        let
                          notify = true,
                          mbEXCLUDE = mb["exclude"];
                        ;

                        if (mbEXCLUDE) {
                          let excludes = (typeof mbEXCLUDE == "string") ? [mbEXCLUDE] : mbEXCLUDE;
                          for (let exclude in excludes)
                            if (excludes[exclude] == "*") {
                              notify = false;
                              break;
                            }
                        }

                        if (mbNamed)
                          displayName(nodeDiv, named, mbNamed);
                        else
                          displayName(nodeDiv, named, null, notify);

                        break;
                      case "updateURL":
                      case "installURL":
                      case "downloadURL":
                      case "run-at":
                      case "icon":
                        if (mbNamed)
                          if (typeof mbNamed == "string")
                            displayName(nodeDiv, named, mbNamed);
                          else
                            displayName(nodeDiv, named, mbNamed, true);
                        break;
                      default:
                        if (mbNamed)
                          displayName(nodeDiv, named, mbNamed);
                        else {
                          let key, prefix;
                          [key, prefix] = names[name].split(/:/).reverse();

                          if (prefix && mb[prefix] && mb[prefix][key])
                            displayName(nodeDiv, prefix + ":" + key, mb[prefix][key]);
                        }
                        break;
                    }
                  }

                  if (gmcHome.get("insertH6Md")) {
                    let items = gmcHome.get("insertH6StringMd").split(","), xpe;
                    for (let i = 0, len = items.length; i < len; ++i) {
                      if (i == 0)
                        xpe = "//div[@id='script_sidebar']//h6[contains(., '" + items[i]+ "')]";
                      else
                        xpe += "|//div[@id='script_sidebar']//h6[contains(., '" + items[i]+ "')]";
                    }

                    let xpr = document.evaluate(
                      xpe,
                      document.body,
                      null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                      null
                    );
                    if (xpr && xpr.singleNodeValue) {
                      let thisNode = xpr.singleNodeValue;

                      if (thisNode.parentNode.id == "script_sidebar")
                        script_sidebarNode.insertBefore(nodeDiv, thisNode);
                      else
                        script_sidebarNode.insertBefore(nodeDiv, thisNode.parentNode);
                    }
                    else
                      script_sidebarNode.appendChild(nodeDiv);
                  }
                  else
                    script_sidebarNode.appendChild(nodeDiv);

                }

                /**
                 *       Lost and Found
                 */

                if (gmcHome.get("showStrings")) {
                  GM_setStyle({
                    node: gCSS,
                    data:
                      [
                        ".lost span, .found span { color: #666; font-size: 0.7em; }",

                        ".lost { background-image: linear-gradient(to top, #ddd, rgba(255,255,255,0)); border: thin solid #aaa !important; border-radius: 0.25em 0.25em; cursor: default; font-family: sans-serif; font-weight: normal !important; padding: 0.25em 0.75em; text-align: left; width: auto; }",
                        ".lost:hover { background-image: linear-gradient(to top, #bfe1ff, rgba(237,249,255,0)); }",
                        ".lost a { margin-top: -0.0625em; position: absolute; right: 0.5em; }",
                        ".lost img { max-height: 1.5em; }",

                        ".found {}",
                        ".found a { margin-top: -0.0625em; position: absolute; right: 0.5em; }",
                        ".found img { float: right; max-height: 1.5em; }",
                        ".found a:last-child { float: right; opacity: 0; }",
                        ".found a:hover { opacity: 1; }",

                        ".finds { border-width: 0; font-size: x-small; margin: 0; margin-bottom: 1em; overflow: auto; padding: 0 !important; width: 100%; word-break: break-all; }",
                        ".finds li { color: #666; padding-left: 0.5em; text-align: left; }",
                        ".finds span { background-color: #f80; border-radius: 1.3em 0 0 1.3em; color: #fff; float: right; font-family: serif; font-size: 0.9em; font-weight: bold; margin-left: 0.25em; margin-right: 0.5em; padding-left: 0.7em; padding-right: 0.5em; text-align: right; }",
                        ".finds .bar { background-color: #eee; }",

                        ""
                      ].join("\n")
                  });

                  if (gmcHome.get("limitMaxHeightFinds"))
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".finds { max-height: " + gmcHome.get("maxHeightListFinds") + "em; }"

                          ].join("\n")
                    });

                  GM_setStyle({
                      node: gCSS,
                      data:
                        [
                          ".md li, .finds li { font-size: " + gmcHome.get("fontSize") + "em ; }"

                        ].join("\n")
                  });

                  let nodeImg = document.createElement("img");
                  nodeImg.src = GM_getResourceURL("icon");
                  nodeImg.title = "uso - Count Issues";
                  nodeImg.alt = "Count Issues";

                  let nodeA = document.createElement("a");
                  nodeA.href = "/scripts/show/69307";

                  let nodeSpan = document.createElement("span");

                  let nodeH6 = document.createElement("h6");
                  nodeH6.textContent = "Lost and Found ";
                  nodeH6.classList.add("lost");
                  nodeH6.addEventListener("click", onClickHunt, false);

                  nodeA.appendChild(nodeImg);

                  nodeH6.appendChild(nodeSpan);
                  nodeH6.appendChild(nodeA);



                  if (gmcHome.get("insertH6Finds")) {
                    let items = gmcHome.get("insertH6StringFinds").split(","), xpe;
                    for (let i = 0, len = items.length; i < len; ++i) {
                      if (i == 0)
                        xpe = "//div[@id='script_sidebar']//h6[contains(., '" + items[i]+ "')]";
                      else
                        xpe += "|//div[@id='script_sidebar']//h6[contains(., '" + items[i]+ "')]";
                    }

                    let xpr = document.evaluate(
                      xpe,
                      document.body,
                      null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                      null
                    );
                    if (xpr && xpr.singleNodeValue) {
                      let thisNode = xpr.singleNodeValue;

                      if (thisNode.parentNode.id == "script_sidebar")
                        script_sidebarNode.insertBefore(nodeH6, thisNode);
                      else
                        script_sidebarNode.insertBefore(nodeH6, thisNode.parentNode);
                    }
                    else
                      script_sidebarNode.appendChild(nodeH6);
                  }
                  else
                    script_sidebarNode.appendChild(nodeH6);


                  if (gmcHome.get("showStringsAuto")) {
                    let e = new CustomEvent("click");
                    nodeH6.dispatchEvent(e);
                  }

                }
              }
            }

            /**
             *        Items specific to source homepage
             */

            if (/\/scripts\/review\//.test(pathname)) {

              let xpr = document.evaluate(
                "//div[@id='section']//div[contains(concat(' ', normalize-space(@class), ' '), ' container ')]",
                document.body,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
              );
              if (xpr && xpr.singleNodeValue) {
                let hookNode = xpr.singleNodeValue;

                GM_setStyle({
                    node: gCSS,
                    data:
                      [
                        "#fans_content { border-bottom: 1px dotted #ddd !important; margin-bottom: 0 !important; }",
                        ".pagetear { background-color: #fff; border-bottom: 1px dotted #ddd; font-size: 13px; padding: 10px;}",
                        "#sourceurl { margin-bottom: 0.9em; }",
                        "#sourceurl div { border: 1px solid #ccc; border-radius: 3px; margin: 0; }",
                        "#sourceurl #currenturl { background-color: transparent; border-style: none; color: #999; margin: 0 3px; width: 98%; }",
                        "#sourceurl #refreshurl { background-color: transparent; height: 16px; margin-top: 0.4em; position: absolute; right: 1.5em; width: 16px; }",

                        ".reload { background-image: url(" + GM_getResourceURL("reload") + "); }",
                        ".connecting { background-image: url(chrome://browser/skin/tabbrowser/connecting.png); }",
                        ".loading { background-image: url(chrome://browser/skin/tabbrowser/loading.png); }",
                        ".processing { background-image: url(chrome://global/skin/icons/loading_16.png); }",

                        ".err { background-color: #fdd !important; border-color: #dbb !important; }",
                        "#currenturls { display: none; }"

                      ].join("\n")
                });

                let imageNodeInput = document.createElement("input");
                imageNodeInput.type = "image";
                imageNodeInput.id = "refreshurl";
                imageNodeInput.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                imageNodeInput.classList.add("reload");
                imageNodeInput.alt = "refresh";
                imageNodeInput.addEventListener("click", function (ev) {
                  if (!ev.target.previousSibling.value && ev.target.previousSibling.placeholder != "Load url")
                    loadUrl(ev.target.previousSibling.placeholder, ev.target);
                }, false);

                let nodeDatalist = document.createElement("datalist");
                nodeDatalist.id = "currenturls";

                [
                  "http://userscripts.org/scripts/source/",
                  "https://userscripts.org/scripts/source/",
                  "http://",
                  "https://"

                ].forEach(function (e, i, a) {
                  let nodeOption = document.createElement("option");
                  nodeOption.value = e;

                  nodeDatalist.appendChild(nodeOption);
                });

                let urlNodeInput = document.createElement("input");
                urlNodeInput.type = "text";
                urlNodeInput.placeholder = "Load url";
                urlNodeInput.id = "currenturl";
                urlNodeInput.setAttribute("list", "currenturls");
                urlNodeInput.addEventListener("keypress", function (ev) {
                  clearUrlErr();

                  if (ev.keyCode == 13)
                    if (ev.target.value)
                      loadUrl(ev.target.value, imageNodeInput);
                }, false);

                let nodeDiv = document.createElement("div");
                nodeDiv.id = "urlbar";

                let containerNodeDiv = document.createElement("div");
                containerNodeDiv.id = "sourceurl";
                containerNodeDiv.className = "pagetear";

                nodeDiv.appendChild(urlNodeInput);
                nodeDiv.appendChild(imageNodeInput);
                nodeDiv.appendChild(nodeDatalist);

                containerNodeDiv.appendChild(nodeDiv);

                hookNode.appendChild(containerNodeDiv);
              }

              GM_setStyle({
                  node: gCSS,
                  data:
                    [
                      "div.toolbar_menu li, div.toolbar_menu li div { display: inline; margin-right: 0.25em; }"

                    ].join("\n")
              });

              document.evaluate(
                "//pre[@id='source']",
                document.body,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                xpr
              );
              if (xpr && xpr.singleNodeValue) {
                let hookNode = xpr.singleNodeValue;

                if (!hookNode.hasChildNodes()) // NOTE: Caching issue encountered on USO so reload until it is present
                  location.reload();

                /** Create standardized div framing **/
                let toolbarBottomNode = document.createElement("div");
                toolbarBottomNode.classList.add("toolbar_menu");

                let toolbarTopNode = document.createElement("div");
                toolbarTopNode.classList.add("toolbar_menu");

                let rightNode = document.createElement("div");
                rightNode.classList.add("right");

                let leftNode = document.createElement("div");
                leftNode.id = "left";
                GM_setStyle({
                    node: gCSS,
                    data:
                      [
                          "#left { float: left; }"

                      ].join("\n")
                });

                let topNode = document.createElement("div");

                let subcontentNode = document.createElement("div");

                subcontentNode.appendChild(topNode);
                subcontentNode.appendChild(leftNode);
                subcontentNode.appendChild(rightNode);

                hookNode.parentNode.insertBefore(subcontentNode, hookNode);

                rightNode.appendChild(toolbarTopNode);
                rightNode.appendChild(hookNode);
                rightNode.appendChild(toolbarBottomNode);

                /** Check for UAC buttons and modify them **/

                let wrapNodes = [];
                document.evaluate(
                  "//button[@id='wrap-button1' or @id='wrap-button2']",
                  document.body,
                  null,
                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                  xpr
                );
                if (xpr) {
                  if (xpr.snapshotLength > 0)
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".wrap-button { width: 11.5em; }"

                          ].join("\n")
                    });

                  for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
                    thisNode.removeAttribute("style");
                    thisNode.classList.add("wrap-button");

                    let nodeDiv = document.createElement("div");
                    let nodeLi = document.createElement("li");

                    nodeDiv.appendChild(thisNode);
                    nodeLi.appendChild(nodeDiv);

                    wrapNodes.push(nodeLi);
                  }
                }

                let cttsNodes = [];
                document.evaluate(
                  "//button[.='Change Tabs to Spaces']",
                  document.body,
                  null,
                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                  xpr
                );
                if (xpr) {
                  if (xpr.snapshotLength > 0)
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".changetabs-button { width: 13.5em; }",
                            ".changetabs-input { height: 1.3em; margin: 0 0 !important; margin-left: 0.3em !important; padding: 0 !important; position: relative; top: 0; width: 1.5em !important; }"

                          ].join("\n")
                    });

                  for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);) {
                    thisNode.removeAttribute("style");
                    thisNode.classList.add("changetabs-button");

                    let nextSiblingNode = thisNode.nextSibling;
                    nextSiblingNode.removeAttribute("style");
                    nextSiblingNode.classList.add("changetabs-input");

                    let nodeDiv = document.createElement("div");
                    let nodeLi = document.createElement("li");

                    nodeDiv.appendChild(thisNode);
                    nodeDiv.appendChild(nextSiblingNode);
                    nodeLi.appendChild(nodeDiv);

                    cttsNodes.push(nodeLi);
                  }
                }

                if (wrapNodes[0])
                  toolbarTopNode.appendChild(wrapNodes[0]);
                if (cttsNodes[0])
                  toolbarTopNode.appendChild(cttsNodes[0]);

                /** Create beautify **/
                if (typeof js_beautify != "undefined") {

                  let nodeButton = document.createElement("button");
                  nodeButton.type = "button";
                  nodeButton.textContent = "Beautify";
                  nodeButton.addEventListener("click", function (ev) {
                    hookNode.textContent = js_beautify(hookNode.textContent.replace(/[“”]/g, '"'), { indent_size: 1, indent_char: '\t' });

                    if (gmcHome.get("showLineNumbers")) {
                      renumber(hookNode);
                      let numberNode = document.getElementById("number");
                      if (numberNode)
                        numberNode.classList.add("err");
                    }

                    // If source is < 20KB then autohighlight just like USO does
                    if (hookNode.textContent.length < 20480)
                      (wrappedJSObject || window).sh_highlightDocument();

                    enableCTTS();

                    ev.target.blur();
                  }, false);

                  let nodeDiv = document.createElement("div");

                  let nodeLi = document.createElement("li");

                  nodeDiv.appendChild(nodeButton);
                  nodeLi.appendChild(nodeDiv);

                  toolbarTopNode.appendChild(nodeLi);
                }
                else {
                  let msg = 'js_beautify Object is missing';
                  console.warn(msg);
                }

                /** Create deobfuscate **/
                let nodeButton = document.createElement("button");
                nodeButton.type = "button";
                nodeButton.textContent = "Deobfuscate";
                nodeButton.addEventListener("click", function (ev) {

                  let
                      textContent = hookNode.textContent,
                      diff = false
                  ;
                  if (gmcHome.get("deobJsCode")) {
                    try {
                      textContent = JsCode.deobfuscate(textContent);
                      diff = textContent != hookNode.textContent;
                    }
                    catch (e) {
                      let msg = 'Aborting JsCode\n' + e.name + '\n' + e.message;
                      console.warn(msg);
                    }
                  }

                  let hexCount;
                  if (gmcHome.get("deobST")) {
                    try {
                      [textContent, hexCount] = simpleTranscode(textContent, 0);
                      diff = textContent != hookNode.textContent;
                    }
                    catch(e) {
                      let msg = 'Aborting Simple Transcode\n' + e.name + '\n' + e.message;
                      console.warn(msg);
                    }
                  }

                  if (diff) {
                    hookNode.textContent = textContent;

                    if (gmcHome.get("showLineNumbers")) {
                      renumber(hookNode);
                      let numberNode = document.getElementById("number");
                      if (numberNode)
                        numberNode.classList.add("err");
                    }

                    // If source is < 20KB then autohighlight just like USO does
                    if (hookNode.textContent.length < 20480)
                      (wrappedJSObject || window).sh_highlightDocument();
                  }

                  enableCTTS();
                  ev.target.blur();
                }, false);

                let nodeDiv = document.createElement("div");
                let nodeLi = document.createElement("li");

                nodeDiv.appendChild(nodeButton);
                nodeLi.appendChild(nodeDiv);


                toolbarTopNode.appendChild(nodeLi);

                if (wrapNodes[1])
                  toolbarBottomNode.appendChild(wrapNodes[1]);

                /**  Move syntax highlight if present **/
                let syntax_highlight_select = document.getElementById("syntax-highlight-select");
                if (syntax_highlight_select) {
                  let copy_text_button =  document.getElementById("copy-text-button");
                  if (copy_text_button) {
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".copy-text { margin-left: 0 !important; }"

                          ].join("\n")
                    });

                    let nodeDiv = document.createElement("div");
                    let nodeLi = document.createElement("li");

                    nodeDiv.appendChild(copy_text_button);
                    nodeLi.appendChild(nodeDiv);

                    toolbarTopNode.appendChild(nodeLi);
                  }

                  let syntax_highlight_button = document.getElementById("syntax-highlight-button");

                  if (syntax_highlight_button) {
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            ".syntax-highlight { margin-left: 0 !important; }"

                          ].join("\n")
                    });

                    let nodeDiv = document.createElement("div");
                    let nodeLi = document.createElement("li");

                    nodeDiv.appendChild(syntax_highlight_select);
                    nodeDiv.appendChild(syntax_highlight_button);
                    nodeLi.appendChild(nodeDiv);

                    toolbarTopNode.appendChild(nodeLi);
                  }
                }

                /** Virtual link versions **/
                if (gmcHome.get("showVersionsSource")) {

                  if (gmcHome.get("maxContainer") && uac)
                    GM_setStyle({
                        node: gCSS,
                        data:
                          [
                            "#section > .container { width: 98.75% !important; }"

                          ].join("\n")
                    });

                  let contentNode = document.getElementById("content");
                  if (contentNode) {
                    document.evaluate(
                      ".//a[@href='/scripts/versions/" + scriptid + "']",
                      contentNode,
                      null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                      xpr
                    );
                    if (xpr) {
                      let thisNode;

                      if (!xpr.singleNodeValue) {
                        let nodeA = document.createElement("a");
                        nodeA.href = "/scripts/versions/" + scriptid;
                        nodeA.textContent = "0 previous versions";

                        let nodeP = document.createElement("p");
                        nodeP.classList.add("notice");

                        nodeP.appendChild(document.createTextNode("There are "));
                        nodeP.appendChild(nodeA);
                        nodeP.appendChild(document.createTextNode(" of this script."));

                        contentNode.insertBefore(nodeP, contentNode.firstChild);

                        thisNode = nodeA;
                      }
                      else
                        thisNode = xpr.singleNodeValue;

                      if (thisNode)
                        thisNode.addEventListener("click", onClickVersions, false);
                    }
                  }
                  else {
                    let msg = 'Content node not found for inline versions and diffs';
                    console.error(msg);
                    return; // NOTE: Watchpoint
                  }
                }

                /**
                *
                */
              }

              if (gmcHome.get("showLineNumbers")) {
                let xpr = document.evaluate(
                  "//pre[@id='source']",
                  document.body,
                  null,
                  XPathResult.FIRST_ORDERED_NODE_TYPE,
                  null
                );
                if (xpr && xpr.singleNodeValue) {
                  let sourceNode = xpr.singleNodeValue;

                  if (!sourceNode.hasChildNodes()) // NOTE: Caching issue encountered on USO so reload until it is present
                    location.reload();

                  let nodePre = document.createElement("pre");
                  nodePre.id = "number";
                  nodePre.classList.add("number");
                  nodePre.addEventListener("click", function (ev) {
                    let targetNode = ev.target;

                    if (targetNode.id.match(/line\-\d+/)) {
                      let xpr = document.evaluate(
                          "./div[contains(concat(' ', normalize-space(@class), ' '), ' active ')]",
                          nodePre,
                          null,
                          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                          null
                      );

                      if (xpr) {
                        for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
                          thisNode.classList.remove("active");

                        targetNode.parentNode.classList.add("active");
                      }
                    }
                  }, false);

                  nodePre.classList.add("HID"); // NOTE: Prevents flicker and render failure

                  // Copy once selector rules from #source element
                  let css = ".number { ";
                      let properties = getComputedStyle(sourceNode, null);
                      for (let property in properties)
                        css += (properties[property] + ":" + properties.getPropertyValue(properties[property]) + "; ");
                  css += " }";

                  GM_setStyle({
                      node: gCSS,
                      data: css
                  });

                  // Apply custom styling
                  GM_setStyle({
                      node: gCSS,
                      data:
                        [
                          ".number { background-color: #eee; border-right-style: none !important; display: inline; float: left; height: auto; margin: 0 !important; margin-top: 0 !important; overflow: hidden !important; padding-left: 2px; padding-right: 2px; text-align: right;  }",
                          ".number a { color: #666; font-size: 0.75em; padding-right: 2px; text-decoration: none; }",
                          ".number a.surge { color: #000; font-size: 1em; }",

                          ".number .entry { background-image: -moz-linear-gradient(center bottom , #999 5%, rgba(120, 120, 120, 0.7), #999 95%); box-shadow:0 0 50px 25px rgba(85, 85, 85, 0.7); }",
                          ".number .entry > a { color: #fff; }",

                          ".number .active { background-image: -moz-linear-gradient(center bottom , #7576a0 5%, rgba(0, 0, 120, 0.7), #7576a0 95%); box-shadow:0 0 50px 25px rgba(0, 0, 85, 0.7); }",
                          ".number .active > a { color: #fff; }",

                          "#content pre#source { margin-top: 0; }",
                          "#content pre#source[wrap='off'] { overflow-x: auto !important; white-space: pre; }",
                          "#content pre#source[wrap='on'] { margin-left: 0 !important; white-space: pre-wrap; word-break: break-all; }",

                          "#number[wrap='off'] { display: inline; }",
                          "#number[wrap='on'] { display: none; }"

                        ].join("\n")
                  });

                  let nodeDiv = document.createElement("div");

                  nodeDiv.appendChild(nodePre);

                  sourceNode.parentNode.insertBefore(nodeDiv, sourceNode);
                  nodeDiv.appendChild(sourceNode);

                  renumber(sourceNode);

                  let matches = location.hash.match(/^#(line-\d+)/);
                  if (matches) {
                    let xpr = document.evaluate(
                      "//a[@id='" + matches[1] + "']",
                      document.body,
                      null,
                      XPathResult.FIRST_ORDERED_NODE_TYPE,
                      null
                    );
                    if (xpr && xpr.singleNodeValue) {
                      let thisNode = xpr.singleNodeValue;

                      thisNode.parentNode.classList.add("entry");
                      thisNode.scrollIntoView();
                    }
                  }

                }
              }


            } /** /if on source code page test **/


            /**
             *
             */
            break; /** /case "200": **/

        } /** /switch (xhr.status) **/


      }
    });
  }

})();
