(function () {

// ==UserScript==
// @name          uso - Dashboard Quick Menu
// @namespace     http://userscripts.org/users/37004
// @description   Enables user dropdown menu
// @copyright     2011+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       1.0.4.1esr1
// @icon          https://s3.amazonaws.com/uso_ss/icon/105402/large.png

// @include /^https?://userscripts\.org(?::\d{1,5})?/?/

// @include http://userscripts.org/*
// @include https://userscripts.org/*

// @require http://userscripts.org:8080/scripts/source/115323.user.js

// @grant GM_getValue
// @grant GM_setValue

// ==/UserScript==

/*

CHANGELOG
=========
http://userscripts.org/topics/77715

Please note this script uses native JSON and native classList which requires Firefox 3.6.x+

*/

  // Initialize the menu
  if (location.pathname == "/home") {
    let menu = {}, xpr = document.evaluate(
    "//ul[@class='subnav']//li[@class='menu']/a",
    document.body,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
    );
    if (xpr) {
      for (let i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
        menu[thisNode.textContent] = thisNode.pathname;

      GM_setValue(":/home", JSON.stringify(menu));
    }
  }

  // Attach the menu
  let xpr = document.evaluate(
    "//ul[@class='login_status']//a[@href='/home']",
    document.body,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  );
  if (xpr && xpr.singleNodeValue) {
    let thisNode = xpr.singleNodeValue.parentNode;

    function onmouseover(ev) {
      this.firstChild.nextSibling.classList.remove("hid");
    }

    function onmouseout(ev) {
      this.firstChild.nextSibling.classList.add("hid");
    }

    thisNode.addEventListener("mouseover", onmouseover, false);
    thisNode.addEventListener("mouseout", onmouseout, false);

    GM_setStyle({
      media: "screen, projection",
      data:
        [
          /* Fix USO */
          "#top > .container { position: static; }",
          "#header #mainmenu { padding-top: 0; }",

          ".hid { display: none; }",
          ".usermenu- { position: absolute; z-index: 1; margin: 0; list-style: none outside none; margin-left: -1.5em; }",
          ".usermenu- li { border-radius: 0 !important; margin: 0 !important; float: none !important; background: #ff7c00 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAQAAABamYz0AAAAAXNSR0IArs4c6QAAAB5JREFUCNdjuOfAxPCPieEvDP1D4v5DIv/iEEcIAgClTRkR4R/Z1AAAAABJRU5ErkJggg==) repeat-x scroll left top !important; padding: 0 1.5em; }",
          ".usermenu- li a { color: #fff !important; }"

        ].join("\n")
    });

    let ulNode = document.createElement("ul");
    ulNode.className = "usermenu-";
    ulNode.classList.add("hid");

    let menu = JSON.parse(GM_getValue(":/home", "{}"));
    for (let item in menu) {
      let aNode = document.createElement("a");
      aNode.textContent = item;
      aNode.href = menu[item];

      let liNode = document.createElement("li");
      liNode.appendChild(aNode);

      ulNode.appendChild(liNode);
    }

    thisNode.appendChild(ulNode);
  }

})();
