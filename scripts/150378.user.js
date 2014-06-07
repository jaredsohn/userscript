// ==UserScript==
// @name        Facebook - Add App To Page
// @description Adds an Add To Page link in the Basic section of the app summary page on Facebook Developers
// @namespace   http://userscripts.org/users/philklc
// @author      Phil Chan
// @copyright   Phil Chan
// @license     Public domain
// @include     http://developers.facebook.com/apps/*/summary*
// @include     https://developers.facebook.com/apps/*/summary*
// @grant       none
// @uso:script  150378
// ==/UserScript==

(function(w) {
  d = w.document;
  dialogIsActive = false;
  closeDialog = function() {
    dialogIsActive = false;
    dialogIframe.removeEventListener("load", dialogIframeOnload);
    dialogDiv.removeChild(dialogIframe);
    d.body.removeChild(dialogDiv);
  }
  i = function(l) { return d.getElementById(l) };
  d.addEventListener("DOMContentLoaded", function() {
    x = function() {
      u = i("secure_page_tab_url") || i("page_tab_url");
      b = d.getElementsByClassName("developerAppSummaryBanner");
      if (b.length>0) {
        w.clearInterval(v);
        i("headerArea").style.paddingRight = 0;
        h = i("developerAppHeader");
        if (u&&u.value) {
          myInput = d.createElement("input");
          myInput.setAttribute("type", "button");
          myInput.setAttribute("id", "__add_app_to_page");
          myInput.setAttribute("value", "Add to Page");
          myInput.addEventListener("click", function(e) {
            e.preventDefault();
            if (dialogIsActive == false) {
              dialogIsActive = true;
              dialogIframe = d.createElement("iframe");
              dialogIframe.setAttribute("src", "//facebook.com/dialog/pagetab?display=popup&app_id="+(location.href.split("/")[4])+"&next="+u.value);
              dialogIframe.setAttribute("style","border: 1px solid #555; background: #f2f4f8 url(data:image/gif;base64,R0lGODlhEAAQAKIAAJmqysrS4u7y9vb6+vb2+gAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCAAFACwAAAMAEAAKAAADLShEUqXMQTUGcaTekm3fXfNogiaZo1eJH0ai5SDGnexWt0DnN4OGPZ1OspgVEwAh+QQFCAAFACwAAAMABAALAAADCSgq1f4wyrlEAgAh+QQJCAAFACwAAAAACgAQAAADIggK1b7MNeiEpUUQIrD0zyJN4giSylica/mVGudZnRumYwIAIfkECQgABQAsAAAAABAAEAAAAzoIClXLLYIQ4IuS2hWFn1VzFQJBCOCmYKImcmz6rrHrwJh807k99qEdBKgaZoKj0kn386B8OAnsF0kAACH5BAkIAAUALAAAAAAQABAAAAM2WLrQoO4tGIKMtVILXQ7b5WVh13xlgZFqJZ4s4JpyPKuj1nI4rNev2u+2GvKKoF1wkoowe8EEACH5BAkIAAUALAAAAAAQABAAAAM+WLqs8KDJAkKIRSxrnQVCqBVc4F3iWJ6gqKzUl74cO5N1jLp4p7chmq+yC/ZMvxuMCFTlmLwja9JgUhkQQAIAIfkECQgABQAsAAACABAADAAAAydYuiWyIQbnFH1FTmp5lldXfVHYeJpppt4Ktug7uiU8snMcMctIBgkAIfkECQgABQAsAAACABAADAAAAy1YuryigpBXhKU3jkHg9RaxddVXXiOIXeKwWqqQnq/mqmpLZvnM05EJjtYoghIAIfkEBQgABQAsAAADABAACgAAAysoRFKlzImpxiCOWPyovpnVdNQmmWQ1jB9HTeg3vnIIpq3tejH6QrPFbpIAACH5BAQUAAAALAwAAwAEAAoAAAMPKEQ6s04IxyiJ982X2RIJADs=) no-repeat center center; width: 100%; height: 100%; position: absolute; left: -1px; top: -1px");
              dialogIframeOnload = function(e) {
                try {
                  buttons = this.contentWindow.document.querySelectorAll('input[type="submit"]');
                  for (i in buttons) {
                    buttons[i].addEventListener("click", function(e) {
                      if (this.getAttribute("name") == "cancel") {
                        e.preventDefault();
                        closeDialog();
                      }
                      dialogDiv.style.visibility = "hidden";
                      detectPageRedirect = function() {
                        if (dialogIsActive) {
                          try {
                            if (dialogIframe.contentWindow) dialogIframe.contentWindow.document;
                          } catch (e) {
                            w.clearInterval(v);
                            closeDialog();
                          }
                        } else {
                          w.clearInterval(v);
                        }
                      }
                      v = w.setInterval(detectPageRedirect, 200);
                    });
                  }
                } catch (e) {}
              };
              dialogIframe.addEventListener("load", dialogIframeOnload);
              dialogDiv = d.createElement("div");
              dialogDiv.setAttribute("style","z-index: 9999; position: fixed; top: 125px; left: 50%; width: 650px; height: 210px; margin-left: -325px; border: 10px solid rgba(82, 82, 82, 0.7); border-radius: 10px");
              dialogDiv.appendChild(dialogIframe);
              d.body.appendChild(dialogDiv);
            }
          });
          myLabel = d.createElement("label");
          myLabel.setAttribute("for", "__add_app_to_page");
          myLabel.setAttribute("class", "uiButton uiButtonSpecial");
          myLabel.setAttribute("style", "float: right");
          myLabel.appendChild(myInput);
          h.appendChild(myLabel);
        }
      }
    }
    v = w.setInterval(x, 200);
  });
})(unsafeWindow);