(function () {

// ==UserScript==
// @name           uso - Syntax Highlight
// @namespace      http://userscripts.org/users/37004
// @description    Allows you to copy and highlight source on source code pages, even if it's over 100KB
// @copyright      2010+, Marti Martz (http://userscripts.org/users/37004)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license        Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version        1.2.2.1esr1
// @icon           https://s3.amazonaws.com/uso_ss/icon/85835/large.png

// @include    /^https?:\/\/userscripts\.org(?:\:\d+)?\/scripts\/review\//

// @include    http://userscripts.org/scripts/review/*

// @include    https://userscripts.org/scripts/review/*

// @resource sh_javascript  http://userscripts.org:8080/scripts/source/86011.user.js
// @resource sh_diff        http://userscripts.org:8080/scripts/source/152916.user.js
// @resource sh_html        http://userscripts.org:8080/scripts/source/86236.user.js
// @resource sh_css         http://userscripts.org:8080/scripts/source/86192.user.js
// @resource sh_xml         http://userscripts.org:8080/scripts/source/86143.user.js
// @resource sh_none        http://userscripts.org:8080/scripts/source/86191.user.js

// @require http://userscripts.org:8080/scripts/source/115323.user.js

// @grant GM_getResourceText
// @grant GM_setClipboard

// ==/UserScript==

  let win = window.wrappedJSObject || window;

  let xpr = document.evaluate(
    "//div[@class='toolbar_menu']|//div[@class='numb']|//pre[@class='number']|//pre[@id='source']",
    document.body,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  if (xpr && xpr.singleNodeValue) {
    let hookNode = xpr.singleNodeValue;

    switch (hookNode.getAttribute("class")) {
      case "numb":
        hookNode = hookNode.parentNode;
        break;
      case "number":
        hookNode = hookNode.parentNode;
        break;
    }

    let sourceNode = document.getElementById("source");
    sourceNode.setAttribute("class", "sh_sourceCode");
    win.sh_highlightDocument();

    document.evaluate(
      "//head",
      document.documentElement,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      xpr
    );
    if (xpr && xpr.singleNodeValue) {

      let gCSS = GM_setStyle({
        media: "screen, projection",

        data: [
            "pre[class~='sh_diff'] {",
              "line-height: 1.3em;",
            "}",

            "pre.sh_diff code {",
              "font-family: 'Monaco','Bitstream Vera Sans Mono','Courier New',monospace;",
              "padding: 0.05em 0;",
            "}",

            "pre.sh_sourceCode .sh_oldfile {",
              "color: #000;",
              "background: none repeat scroll 0 0 #fcc;",
              "display: inline-block;",
              "width: 100%;",
            "}",

            "pre.sh_sourceCode .sh_newfile {",
              "color: #000;",
              "background: none repeat scroll 0 0 #cfc;",
              "display: inline-block;",
              "width: 100%;",
            "}",

            "pre.sh_sourceCode .sh_difflines {",
              "color: #000;",
              "background: none repeat scroll 0 0 #ccc;",
              "display: inline-block;",
              "width: 100%;",
            "}"
        ].join("\n")
      });

      headNode = xpr.singleNodeValue;

      let buttonNode = document.createElement("button");
      buttonNode.setAttribute("id", "syntax-highlight-button");
      buttonNode.setAttribute("class", "syntax-highlight");
      buttonNode.textContent = 'Highlight';
      buttonNode.addEventListener("click", function(ev) {
        let selectNode = document.getElementById("syntax-highlight-select");
        if (selectNode) {
          let preNode = document.getElementById("source");
          preNode.setAttribute("class", "sh_sourceCode");
          win.sh_highlightDocument();

          let scriptNode = document.createElement("script");
          scriptNode.setAttribute("type", "application/javascript;version=1.8");

          let value = selectNode.options[selectNode.selectedIndex].value;
          switch(value) {
            case "sh_javascript":
              GM_setStyle({
                node: gCSS,
                data:
                  [
                    "pre.sh_sourceCode .sh_type { color: #0f0; }"

                  ].join("\n")
              });
              break
            case "sh_html":
            case "sh_xml":
              GM_setStyle({
                node: gCSS,
                data:
                  [
                    "pre.sh_sourceCode .sh_type { color: #00f; }"

                  ].join("\n")
              });
              break;
          }
          if (value) {
            preNode.setAttribute("class", preNode.getAttribute("class") + " " + value);
            scriptNode.textContent = GM_getResourceText(value);
            document.body.appendChild(scriptNode);
            document.body.removeChild(scriptNode);
          }

          win.sh_highlightDocument();

          if (value == "sh_diff") {
            if (preNode.firstChild.nodeType == 1 && preNode.firstChild.tagName.toLowerCase() == "code")
              ; // NOTE: Do nothing
            else {
              let codeNode = document.createElement("code");

              while (preNode.hasChildNodes())
                codeNode.appendChild(preNode.firstChild);

              preNode.appendChild(codeNode);
            }
          }

          ev.target.blur();
        }
      }, false);

      function mouseOver(ev) {
        ev.target.removeEventListener("mouseover", mouseOver, false);

        let
          buttonNode = document.getElementById("syntax-highlight-button"),
          sourceNode = document.getElementById("source")
        ;
        if (buttonNode && sourceNode)
          buttonNode.setAttribute("title", '(Re)Highlighting ~'
            + (parseInt(sourceNode.innerHTML.length / 1024 * 10) / 10)
            + 'K in the DOM may take a while, possibly freezing your browser while it works');
      }

      function mouseOut(ev) {
        ev.target.addEventListener("mouseover", mouseOver, false);
      }

      buttonNode.addEventListener("mouseover", mouseOver, false);
      buttonNode.addEventListener("mouseout", mouseOut, false);

      let selectNode = document.createElement("select");
      selectNode.setAttribute("id", "syntax-highlight-select");
      selectNode.setAttribute("class", "syntax-highlight");
      selectNode.setAttribute("title", 'Choose your syntax highlighting language');

      let options = {
        "js": [ "sh_javascript", "JavaScript 1.7+" ],
        "diff": [ "sh_diff", "gnu diffutils (userscripts.org mod)" ],
        "htm": [ "sh_html", "HyperText Markup Language" ],
        "css": [ "sh_css", "Cascading Style Sheets" ],
        "xml": [ "sh_xml", "Extensible Markup Language" ],
        "": [ "sh_none", "No syntax highlighting" ]
      };

      for (let option in options) {
        let optionNode = document.createElement("option");
        optionNode.value = options[option][0];
        optionNode.text = option;
        optionNode.title = options[option][1];
        selectNode.appendChild(optionNode);
      }

      /** Create copy text **/
      let copyNodeButton = document.createElement("button");
      copyNodeButton.setAttribute("id", "copy-text-button");
      copyNodeButton.setAttribute("class", "copy-text");
      copyNodeButton.textContent = "Copy";
      copyNodeButton.addEventListener("click", function (ev) {
        GM_setClipboard(sourceNode.textContent + "\n", "text");
      });

      let copyNodeDiv = document.createElement("div");
      let copyNodeLi = document.createElement("li");

      copyNodeDiv.appendChild(copyNodeButton);

      if (typeof GM_setClipboard == "undefined")
        copyNodeButton.setAttribute("disabled", "disabled");

      if (hookNode.className == "toolbar_menu") {
        GM_setStyle({
          node: gCSS,
          data:
            [
              "#copy-text-button { margin-left: 0.3em; }",
              "#syntax-highlight-button { margin-left: 0.3em; }"

            ].join("\n")
        });

        let divNode = document.createElement("div");

        let liNode = document.createElement("li");

        divNode.appendChild(selectNode);
        divNode.appendChild(buttonNode);

        liNode.appendChild(divNode);

        hookNode.appendChild(copyNodeLi);
        hookNode.appendChild(liNode);
      }
      else {
        GM_setStyle({
          node: gCSS,
          data:
            [
              "#copy-text-button { margin-left: 0.5em; }",
              ".syntax-highlight { margin-left: 0.5em; }",
              "#syntax-highlight-button { margin-left: 0.3em; }"

            ].join("\n")
        });

        hookNode.parentNode.insertBefore(copyNodeButton, hookNode);
        hookNode.parentNode.insertBefore(selectNode, hookNode);
        hookNode.parentNode.insertBefore(buttonNode, hookNode);
      }

      let pNode;
      document.evaluate(
        "//p[@class='notice']",
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        xpr
      );
      if (xpr && xpr.singleNodeValue) {
        pNode = xpr.singleNodeValue;

        let thisNode = pNode.nextSibling.nextSibling;
        if (thisNode.tagName == "SCRIPT" && Node.textContent == "window.onload = function() { sh_highlightDocument(); }")
          thisNode.parentNode.removeChild(thisNode);
      }

      document.evaluate(
        "//a[contains(., 'Add Syntax Highlighting')] | //p[contains(., 'the source is over 100KB')]",
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        xpr
      );
      if (xpr && xpr.singleNodeValue) {
        thisNode = (xpr.singleNodeValue.tagName.toLowerCase() == "a") ? xpr.singleNodeValue.parentNode : xpr.singleNodeValue;
        thisNode.parentNode.removeChild(thisNode);

        if (pNode && pNode.nextSibling.nextSibling.nextSibling == selectNode)
          GM_setStyle({
            node: gCSS,
            data:
              [
                "#syntax-highlight-select { margin-left: 0; }"

              ].join("\n")
          });
      }
      else {
        let ev = document.createEvent("HTMLEvents");
        ev.initEvent("click", true, true);
        buttonNode.dispatchEvent(ev);

        if (pNode && pNode.nextSibling.nextSibling.nextSibling.nextSibling == selectNode)
          GM_setStyle({
            node: gCSS,
            data:
              [
                "#syntax-highlight-select { margin-left: 0; }"

              ].join("\n")
          });
      }
    }
  }

})();
