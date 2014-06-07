// ==UserScript==
// @name            KeePass AutoType Enhancer
// @namespace       http://www.brainassassin.com/
// @description     Put the domain into the title and focus the username field to quickly enable KeePass AutoType feature.
// @include         http://*
// @include         https://*
// @version         0.4.3
// ==/UserScript==

// SETTINGS -------------------------------------
var onlyInsideVP     = true;   // only jump to input field if it's inside the viewport
var ignoreSubdomains = false;   // don't put subdomains into the title
var returnAllSubDoms = false;   /* if true, all sub-domains will show up in the title as long as ignoreSubdomains = false
                                  if set to false, only the third-level domain will be shown */
var sDelimiter       = " | ";  // delimiter when domain is added to title

// CODE -----------------------------------------

/**
 * Check whether the control in question is inside the viewport.
 */
function isCtrlInVP(elm) {
  var delta, cTop = cLeft = 0;
  if (!onlyInsideVP) {
    return true;
  }
  delta = [window.pageYOffset, window.pageXOffset];
  do {
    if (typeof elm.offsetTop != "undefined") cTop += elm.offsetTop;
    if (typeof elm.offsetLeft != "undefined") cLeft += elm.offsetLeft;
  } while (elm = elm.offsetParent);
  return (cTop > delta[0] && cTop < delta[0] + window.innerHeight && cLeft > delta[1] && cLeft < delta[1] + window.innerWidth);
}

/**
 * Return all input tags of types password and text.
 */
function getTags() {
  var filtered = new Array(), tagList = document.getElementsByTagName('input');
  for (var i = 0, l = tagList.length, tag = null; i<l; i++) {
    tag = tagList[i];
    // we're only interested in these two types
    if (tag.type == "password" || tag.type == "text") {
      filtered.push(tag);
    }
  }
  return filtered;
}

/**
 * Find all input fields in the document, determine the right control
 * and set the focus on it.
 */
function findPasswordField(sElem, doc) {
  var f = getTags();
  var iLength = f.length;

  for (var i = 0, txtPass, txtUser; i < iLength; i++) {
    txtPass = f[i];
    if (txtPass.type == "password") {
      if (i == 0) {
        txtUser = txtPass;
      } else {
        for (var j = i-1, sText=null, bBreak=false; j >= 0; --j) {
          txtUser = f[j];
          bBreak = (txtUser.type == "text");
          if (bBreak) {
            if (getCssProp(txtUser, "display") != "none") {
              break;
            } else {
              bBreak = false;
            }
          }
        }
      }
      setFocusOnCtrl(txtUser);
      return true;
    }
  }
  return false;
}

/**
 * Return the final computed value of an element's CSS property.
 */
function getCssProp(elem, prop) {
  return window.getComputedStyle(elem, null).getPropertyValue(prop);
}

/**
 * Display hostname in title bar with or without subdomains.
 * Look for the domain name in the title first and try to append the top-level domain.
 * If that's not possible, simply add the hostname at the end of the title.
 */
function setTitle() {
  var sHostName = window.location.href;
  var escChar = "\\";
  var sCache = /(\/search?\?q=cache:|\/cache\.aspx\?q=|gigablast\.com\/get\?q=|web\.archive\.org\/web\/)/i;

  if (sHostName.search(sCache) != -1) {
    // stop script execution
    return;
  }
  sHostName = window.location.hostname;

  var oTitle = document.title;
  var sFull  = getDomainName(sHostName, false);
  var sText, sDomain = "", sTLD = "", sSub = "", pos = 0;
  if (sFull == getDomainName(sHostName, true)) {
    // no subdomains
    sDomain = sFull.slice(0, sFull.indexOf("."));
    sTLD = sFull.slice(sFull.indexOf("."));
  } else {
    var newHost = prepURL(sHostName);
    sTLD = getTLD(newHost);
    newHost = newHost.slice(0, newHost.length - sTLD.length);
    sDomain = newHost.slice(newHost.lastIndexOf(".") + 1);
    newHost = newHost.slice(0, newHost.lastIndexOf("."));
    if (returnAllSubDoms) {
      var labels = getSubDomains(newHost);
      for (var i = 0; i < labels.length; i++) {
        sSub += labels[i] + (i + 1 < labels.length ? "." : "");
      }
    } else {
      sSub = getSubDomains(newHost);
      if (sSub.length > 0) sSub = sSub[sSub.length - 1];
    }
  }
  if (ignoreSubdomains) {
    sText = new RegExp(sDomain + escChar + sTLD, "i");
  } else {
    sText = new RegExp((sSub != "" ? sSub + escChar + "." : sSub) + sDomain + escChar + sTLD, "i");
  }

  if (!sText.test(oTitle)) {
    // if part of the name (second-level domain + tld) is already in the title ...
    if (oTitle.search(new RegExp(sDomain + escChar + sTLD, "i")) != -1) {
      // ... simply add the subdomain to it
      pos = oTitle.toLowerCase().indexOf(sDomain.toLowerCase());
      oTitle = oTitle.slice(0, pos) + sSub + "." + oTitle.slice(pos);
    } else {
      // if part of the name (second-level domain) is already in the title ...
      if (oTitle.search(new RegExp(sDomain, "i")) != -1) {
        // ... add subdomain and told to it
        var pos = oTitle.toLowerCase().indexOf(sDomain.toLowerCase());
        oTitle = oTitle.slice(0, pos) + (ignoreSubdomains ? "" : (sSub != "" ? sSub + "." : sSub)) + oTitle.slice(pos, pos + sDomain.length) + sTLD + oTitle.slice(pos + sDomain.length);
      } else {
        // add the complete hostname at the end
        if (ignoreSubdomains) {
          sFull = sDomain + sTLD;
        } else {
          sFull = (sSub != "" ? sSub + "." : sSub) + sDomain + sTLD;
        }
        oTitle += sDelimiter + sFull;
      }
    }
    document.title = oTitle;
  }
}

/**
 * Return sub-, second-, and top-level domain of an address.
 * url ...... hostname or complete, valid URL
 * ignSub ... [default: false] if true, subdomains will be ignored
 */
function getDomainName(url, ignSub) {
  var tld = "", labels = null, result = "";

  if (ignSub === undefined) { ignSub = false; }

  url = prepURL(url);
  tld = getTLD(url);
  url = url.slice(0, url.length - tld.length);
  if (ignSub) {
    labels = getSubDomains(url);
    if (labels != null) {
      if (labels.length > 0) {
        // only get the third-level domain, commonly referred to as sub-domain
        result = labels[labels.length - 1];
      } else {
        // no subdomain detected
        result = labels[0];
      }
    } else {
      result = "";
    }
  } else {
    result = url;
  }
  return result + tld;
}

/**
 * Return all sub-domains in an array.
 * Make sure, top-level and second-level domains are stripped before using this function.
 * DOESN'T check for valid sub-domains.
 */
function getSubDomains(url) {
  if (url == null || url.length == 0) { return null; }

  var labels = prepURL(url).split(".");
  return labels;
}

/**
 * Return the top-level domain from the passed url.
 */
function getTLD(url) {
  var rgexp = "";

  rgexp = /(\.[a-z]{2,3}\.[a-z]{2})$/i;   // .co.uk or .com.au
  if (rgexp.exec(url) == null) {
    rgexp = /(\.[a-z]{2,6})$/i;   // .us or .museum
    rgexp.exec(url);
  }
  return RegExp.$1;
}

/**
 * Strip protocol and www. from an URL
 */
function prepURL(url) {
  // if a complete URL is passed, get the hostname
  if (url.indexOf("//") > 0) { url = url.split("/")[2]; }
  // remove www. (ww2, ww18, etc.) if there to save some space and return value
  // Thank you D. S. Kinney for pointing out the numbers
  return url.replace(/^ww[a-zA-Z0-9]*\./i, "");
}

/**
 * Set the focus on the control with regard to the viewport
 */
function setFocusOnCtrl(ctrl) {
  if (isCtrlInVP(ctrl)) {
    ctrl.focus();
    ctrl.select();
  }
}

/**
 * Keydown event handler (CTRL+ALT+S to force focus).
 */
function shortcut(e) {
  if (e.altKey && e.ctrlKey) {
    // ctrl + alt + s
    if (e.keyCode == 83) {
      runScript(true);
    }
  }
}

/**
 * Find all the text/password fields and set the focus on the appropriate field.
 * Via forceFocus controls not within the current viewport can be focused.
 */
function runScript(forceFocus) {
  var sProt = window.location.protocol, iLen = 0, cSnap, iFrames;

  // allow only http(s) protocol. this shouldn't be an issue at all but you'll never know.
  if (!sProt.match(/https?:/i)) return;
  if (forceFocus) onlyInsideVP = false;

  findPasswordField();
}

if (unsafeWindow.top == unsafeWindow.self) {
  setTitle();
  GM_registerMenuCommand("Set focus on username field", function() {runScript(true);}, "s", "control alt", "s");
  document.addEventListener('keydown', shortcut, false);
  window.setTimeout(function() {runScript(false);}, 150);
}