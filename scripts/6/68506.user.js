(function() {

// ==UserScript==
// @name          usoCheckup - bottomsUp Theme
// @namespace     http://userscripts.org/users/37004
// @description   DOM iframe Notifications in reverse order instead of JavaScript confirm/alert boxes
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.16
// @exclude *
// ==/UserScript==

  if (typeof usoCheckup != "undefined") {
    var frameless = false;
    try {
      frameless = (window == window.top);
    }
    catch (e) {}

  // Clean up USO for presentation if uso has been included and no other supporting script is available
  if (!frameless && window.location.href.match(/^http[s]{0,1}:\/\/userscripts\.org\/scripts\/show\/.*#heading/i)) {
    var thisNode;

    // Change all links to _top
    var xpr = document.evaluate(
      "//a",
      document.body,
      null,
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    if (xpr)
      for (var i = 0, thisNode; thisNode = xpr.snapshotItem(i++);)
        thisNode.setAttribute("target", "_top");

    GM_addStyle(
        "div.container { width: auto; margin: 0; }"
      + "div#content { width: 100% !important; left: 0; }"
      + "div#heading { height: 66px; min-height: 0; }"
      + "div#details h1.title { max-height: 2.05em; overflow: hidden; }"
      + "#section > .container { width: auto !important; }"
      + "#section_search { display: none !important; }"
      + "#install_script { bottom: auto !important; top: 10px !important; margin-right: 5px; }"
    );
  }
  else {
      GM_addStyle(
        [
          "div#usoc {",
            "position: fixed;",
            "border-radius: 0;",
            "top: 0;",
            "left: 0;",
            "width: 100%;",
            "z-index: 99999999;",
            "font: normal normal 14px sans-serif;",
            "margin: 0 !important;",
            "padding: 0;",
            "border: 0;",
          "}",

          "div#banner {",
            "border-radius: 0;",
            "width: 100%;",
            "margin: 0 !important;",
            "padding: 2px 4px !important;",
          "}",


          "div.usocMessage {",
            "background-color: #ff9;",
            "padding: 0;",
//             "border-bottom: 1px black solid;",
            "font-weight: bold;",
            "width: 100%;",
            "border-radius: 0;",
            "margin: 0 !important;",
          "}"

        ].join("\n")
      );          
  }

    /*
        Define a custom alert widget
    */

    usoCheckup.widgets("alert", function(details) {
      var remoteVersion = parseInt(usoCheckup.lastValueOf("version", details.remoteMeta["uso"]));
      var localVersion = parseInt(usoCheckup.lastValueOf("version", usoCheckup.localMeta["uso"]));

      if (remoteVersion > localVersion) {
        if (details.mismatched || details.unlisted)
          bottomsUp(
              usoCheckup.lastValueOf("name", usoCheckup.localMeta),
              usoCheckup.strings("updateAvailable") + " "
                  + ((usoCheckup.localMeta["version"]) ? usoCheckup.lastValueOf("version", usoCheckup.localMeta) + ' ': '')
                  + "(" + localVersion
                  + ") \u0394 "
                  + ((details.remoteMeta["version"]) ? usoCheckup.lastValueOf("version", details.remoteMeta) + ' ': '')
                  +  "(" + remoteVersion + ")",
              "show"
          );
        else
          bottomsUp(
              usoCheckup.lastValueOf("name", usoCheckup.localMeta),
              usoCheckup.strings("updateAvailable") + " "
                  + ((usoCheckup.localMeta["version"]) ? usoCheckup.lastValueOf("version", usoCheckup.localMeta) + ' ': '')
                  + "(" + localVersion
                  + ") \u0394 "
                  + ((details.remoteMeta["version"]) ? usoCheckup.lastValueOf("version", details.remoteMeta) + ' ': '')
                  +  "(" + remoteVersion + ")",
              "default"
          );
      }
      else if (details.forced)
        bottomsUp(
            usoCheckup.lastValueOf("name", usoCheckup.localMeta),
            usoCheckup.strings("updateUnavailable"),
            "show"
        );
    });

    /*
        Define a custom query widget
    */

    usoCheckup.widgets("query", function () {
      GM_registerMenuCommand(
        usoCheckup.lastValueOf("name", usoCheckup.localMeta) + ": " + usoCheckup.strings("queryWidget"),
        function() {
          if (!document.getElementById("toggle" + usoCheckup.localMeta["uso"]["script"]))
            usoCheckup.request(true);
        }
      );
    });

    /*
        Define a custom toggle widget
    */

    usoCheckup.widgets("toggle", function () {
      GM_registerMenuCommand(
        usoCheckup.lastValueOf("name", usoCheckup.localMeta) + ": " + usoCheckup.strings("toggleWidget"),
        function () {
          var checkboxNode = document.getElementById("toggle" + usoCheckup.localMeta["uso"]["script"]);
          if (usoCheckup.enabled === true) {
            usoCheckup.enabled = false;
            if (checkboxNode) {
              checkboxNode.setAttribute("title", usoCheckup.strings("updaterOff"));
              checkboxNode.checked = false;
            }
            else
              bottomsUp(
                  usoCheckup.lastValueOf("name", usoCheckup.localMeta),
                  usoCheckup.strings("updaterOff")
              );
          }
          else {
            usoCheckup.enabled = true
            if (checkboxNode) {
              checkboxNode.setAttribute("title", usoCheckup.strings("updaterOn"));
              checkboxNode.checked = true;
            }
            else
              bottomsUp(
                  usoCheckup.lastValueOf("name", usoCheckup.localMeta),
                  usoCheckup.strings("updaterOn")
              );
          }
        }
      );
    });

    /*
        Define a helper function
    */

    function bottomsUp (message, delta, method, details) {

      var bodyNode = document.evaluate(
        "//body",
        document.documentElement,
        null,
        XPathResult.ANY_UNORDERED_NODE_TYPE,
        null
      );

      if (bodyNode && bodyNode.singleNodeValue) {
        thisNode = bodyNode.singleNodeValue;

        var usocNode = document.getElementById("usoc") || document.createElement("div");
        usocNode.id = "usoc";
        usocNode.setAttribute("style", "text-align: left;");
        thisNode.insertBefore(usocNode, thisNode.firstChild);

          var containerNode = document.createElement("div");
          containerNode.setAttribute("class", "usocMessage");
          containerNode.setAttribute("style", "background-color: #000; font-weight: 900;");

            var iframeNode = document.createElement("iframe");
            iframeNode.setAttribute("scrolling", "no");
            iframeNode.setAttribute("frameborder", "0");
            iframeNode.setAttribute("style", "width: 100%; height: 104px; padding: 0; margin: 0; display: none;");
          containerNode.appendChild(iframeNode);

            var bannerNode = document.createElement("div");
            bannerNode.setAttribute("id", "banner");
            bannerNode.setAttribute("style", "border-bottom: 0.4em solid #f80; margin: 0; padding: 0; color: white; background-color: black;");

              var iconNode = document.createElement("img");
              iconNode.alt = iconNode.title = usoCheckup.updaterMeta["name"];
              iconNode.setAttribute("style", "margin: 0.1em 0.3em 0.1em 0.3em; vertical-align: middle;");
              iconNode.src = "data:image/png;base64,"
                + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAABGdBTUEAALGPC/xhBQAAAAFz"
                + "UkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAA"
                + "AAlwSFlzAAALEwAACxMBAJqcGAAAAAl2cEFnAAAAEAAAABAAXMatwwAAAalJREFUKM+tkL9O"
                + "wlAUxs9tjC1IIUGQAGoMMxITMXEkJvgEjLD1DfjjA7D47yEYiBshzhKdcCB0IGHoQBhkEEmu"
                + "0PZCCdUeBwrRDrp4c3NzkvP7vnPPB/BfJ5PJ9Ho9RPwbJYRIktRqtcbjMWOsXC7/Icjn8+12"
                + "m1LKGDNNMxwO/+ZdKBRkWaaU6rquqmogEPjNu1QqdTqdJU0pVRTFsiwHw62rVCrl9XobjYbL"
                + "5VosFv1+fzQaVatVx94b60qSpPl8zvO8aZrdbjcUCsXjcU3TDMNAREKIc0I2m43FYsFgUJbl"
                + "SCRSq9UMw0in0wAwnU4rlcpSw30fVywWRVEURbHZbOZyudlsxhhDRMZYIpGwg3HslEwm6/X6"
                + "ZDLx+/2CIPA8r+u62+32+Xy2AG9+KpDcvZ2eX9wTjlvShmm9X+0mD2xzDj5hffED4ANPcrev"
                + "w6EgCJqmGdamerN7vAe47H5+SwkACIFncubjPIPBABFF/870KnAUtVvOlOyYXx7Hqq4oCtn0"
                + "zK7Dh9HVT1cvsS4B0DZABAvh4cU73Do+4572twERyIomBBDhC2QQ0ThPhF0EAAAAAElFTkSu"
                + "QmCC";
              iconNode.addEventListener("click", function() {
                usoCheckup.openUrl("http://userscripts.org/guides/24", true);
              }, false);
            bannerNode.appendChild(iconNode);

              var showNode = document.createElement("img");
              showNode.alt = showNode.title = usoCheckup.strings("showConfirm");
              showNode.setAttribute("style", "margin: 0.1em 0.3em 0.1em 0.3em; vertical-align: middle;");
              showNode.src = "data:image/png;base64,"
                + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dE"
                + "AP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kBBw8qDDTTMXAAAAJM"
                + "SURBVDjLrZPNS5RRFMafc+59Z5wZGj8SqkkxjXFE+qBV7Vu4MfIfUGgTwWA0VJsoCaTaKBZJ"
                + "bhOjdYUbg2rVohZBhNXYaCHiF8aUNer7ce9pMfo2lrs6cBf38NzfOfc+9wD/GPRn4mGh2DBD"
                + "dH7Z4tQGKH21fyCfqklOGaYJry75YFff2Z+Veq7cDBWK3c+FP742fHkeqm0VrLQXtHNguhwv"
                + "GIktFfMbucGOHQGDhWLPK8ujRaFEvWI0OgotUQXNDIiUxSIpx/XHN3KDXdsAY4Vi06TwiA+i"
                + "PY5Cc1ThcFzjUExDEyAikE0IiWjHC0ZLV4ZTIWAKdGHFUrxGMVKblZd9gxc/PKwxA6AKCIFE"
                + "kk5pPRcCVgSdESZUK8I+hzDrGbwsTONZXy+O5Z9ieCEPCCDWhs/OVk6HABfU4hAQZ0ZMMWZc"
                + "g09j97D04S3WjI9rc+/w1Xgg+m0aiRwEAA0AVgDB5hKBFYDpb8+lLACByuKtDjRkxgBwRRAA"
                + "aIgotHdn0dR+FAntoL/xCHbrCEAod0GAMBVCQDVh3BPBd2Ox4FpkYgqZA804fv0u3mQ6kN2b"
                + "LleuuIIlehICWsQOJSBr34zFfGAw51pkqjROJqOIb9nHXG4dgBCt+omqoRCQba2bbSabNQJZ"
                + "9C2m3QCT6wE+uwZGBLx1mAAhCjytehK3eue3/cQb6dr7bTBnWGxpMbD44hlMuT4CY8OpsUQL"
                + "nqM7Y3cuPd5xFm621o6eINO2H3YgIjbvG2u8qPPeaPXIj+hzpfrqdOz2xQn8z/gFFu8F2KEV"
                + "9hIAAAAASUVORK5CYII=";
              showNode.addEventListener("click", function() {
                if (iframeNode.style.display != "inline") {
                  iframeNode.style.display = "inline";
                  iframeNode.setAttribute("src", usoCheckup.updateUrl["show"] + "#heading");
                }
              }, false);
            bannerNode.appendChild(showNode);

            if (method && !document.getElementById("toggle" + usoCheckup.localMeta["uso"]["script"])) {
              var checkboxNode = document.createElement("input");
                checkboxNode.setAttribute("style", "top: 0; margin: 0.08em 0.3em 0.2em 0.3em; vertical-align: middle;");
                checkboxNode.setAttribute("id", "toggle" + usoCheckup.localMeta["uso"]["script"]);
                checkboxNode.setAttribute("type", "checkbox");
                if (usoCheckup.enabled) {
                  checkboxNode.setAttribute("checked", "checked");
                  checkboxNode.setAttribute("title", usoCheckup.strings("updaterOn"));
                }
                else
                  checkboxNode.setAttribute("title", usoCheckup.strings("updaterOff"));
                checkboxNode.addEventListener("click", function(e) {
                  usoCheckup.enabled = !usoCheckup.enabled;
                  e.target.setAttribute("title", (usoCheckup.enabled) ? usoCheckup.strings("updaterOn") : usoCheckup.strings("updaterOff"));
                }, false);
              bannerNode.appendChild(checkboxNode);
            }

              var closeallNode = document.createElement("img");
              closeallNode.alt = closeallNode.title = usoCheckup.strings("closeAllMessages");
              closeallNode.setAttribute("style", "float: right; margin: -1px 3px; vertical-align: middle;");
              closeallNode.src = "data:image/png;base64,"
                + "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAAXNSR0IArs4c6QAAAQhQTFRF"
                + "AAAAZ2leaGlea21ha25gbG5gbW5hbW5ibnFjhIZng4Z7hId8hoh8hYh/iItpiotpiIp+ioxq"
                + "ioxriIt/iIuAiYuBiYyBjI5sjY5sio2Ci42Di46DjI6DjZBtj5BtjI+FjY+Fj5Fsj5FukZFt"
                + "j5CGkZNtj5GHkZNuj5GIkZNvk5NtjpKGk5Nuk5NvlJVukpZulJZukpSKlZZvlpZvkpWJk5aL"
                + "lphxlJeMlJeNlZeOlpiOl5iPl5mQnZ5xmZySnZ5zmZ2Rmp2UnqBzm56VoKJzo6V0paV1qKp2"
                + "sbSstLevuLuzuby0ur21vcC4vcG5v8O7wcS8w8a+w8e/xMjAxcnBys7Gy87GzdHJDClU5QAA"
                + "AAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfZCwwFKQSBA/D3AAAA"
                + "nElEQVQY02NggAILKGBAA0gCEHkLdHkLBncOMwiHk8UNLMAebKoJ4uvxejGDBZy0wyx0GRiM"
                + "5H3FbMECDFom4eaqqmoBCsoQMxgYlAxDHe0CNeQQ1so6hwQ5iCNZZmAV4G+pg8SX9LOx9hFW"
                + "h/GNBbxV+IWkPXn0IXx7Lk8pPgYGQVEPbluwAKuHDB+IlhDxYAQLuLIpQo1icgFRAO9QFp74"
                + "kAY/AAAAAElFTkSuQmCC";
              closeallNode.addEventListener("click", function() {
                this.parentNode.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode.parentNode);
              }, false);
            bannerNode.appendChild(closeallNode);

              var closeNode = document.createElement("img");
              closeNode.alt = closeNode.title = usoCheckup.strings("closeMessage");
              closeNode.setAttribute("style", "float: right; margin: 3px 3px; vertical-align: middle;");
              closeNode.src = "data:image/png;base64,"
                + "iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAMAAABhq6zVAAAAAXNSR0IArs4c6QAAAQhQTFRF"
                + "AAAAZ2leaGlea21ha25gbG5gbW5hbW5ibnFjhIZng4Z7hId8hoh8hYh/iItpiotpiIp+ioxq"
                + "ioxriIt/iIuAiYuBiYyBjI5sjY5sio2Ci42Di46DjI6DjZBtj5BtjI+FjY+Fj5Fsj5FukZFt"
                + "j5CGkZNtj5GHkZNuj5GIkZNvk5NtjpKGk5Nuk5NvlJVukpZulJZukpSKlZZvlpZvkpWJk5aL"
                + "lphxlJeMlJeNlZeOlpiOl5iPl5mQnZ5xmZySnZ5zmZ2Rmp2UnqBzm56VoKJzo6V0paV1qKp2"
                + "sbSstLevuLuzuby0ur21vcC4vcG5v8O7wcS8w8a+w8e/xMjAxcnBys7Gy87GzdHJDClU5QAA"
                + "AAF0Uk5TAEDm2GYAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfZCwsRKSlCJJ+XAAAA"
                + "hUlEQVQI12Nw5zBjAANOFjcG9mBTTRBbj9eLmcFJO8xCl4HBSN5XzJaBQcsk3FxVVS1AQRmk"
                + "QMkw1NEuUEMOolXWOSTIQRzCZjCwCvC31IGyJf1srH2E1UFsYwFvFX4haU8efQYGey5PKT4G"
                + "BkFRD25bBlYPGT6QAgkRD0YGVzZFqFYmFwBtwhDuMUnV7gAAAABJRU5ErkJggg==";
              closeNode.addEventListener("click", function() {
                this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
              }, false);
            bannerNode.appendChild(closeNode);

              var textNode = document.createTextNode(message);
            bannerNode.appendChild(textNode);

              var spanNode = document.createElement("span");
              spanNode.setAttribute("style", " font-weight: normal; margin-left: 0.5em;");
              spanNode.textContent = delta;
            bannerNode.appendChild(spanNode);

          containerNode.appendChild(bannerNode);

        usocNode.insertBefore(containerNode, usocNode.firstChild);
      }
    };
  }
})();
