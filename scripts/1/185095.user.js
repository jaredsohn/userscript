// ==UserScript==
// @name        GitHub Labels on Pull Requests
// @namespace   https://github.com/iguananaut/userscripts
// @description Adds label management to GitHub pull request pages just like normal issues
// @include     http*://github.com/*/*/pull/*
// @version     0.1
// @downloadURL https://raw.github.com/iguananaut/userscripts/master/github/labels_on_pull_requests/GitHub_Labels_on_Pull_Requests.user.js
// @grant       GM_xmlhttpRequest
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @require     http://builds.handlebarsjs.com.s3.amazonaws.com/handlebars.runtime-v1.1.2.js
// @require     https://raw.github.com/iguananaut/userscripts/master/github/labels_on_pull_requests/label_manager.handlebars.js
// ==/UserScript==

var ghDiscussionLabelsTemplate = Handlebars.templates.label_manager;

var ghUrlParts = document.URL.match("^https://github.com/([a-zA-Z0-9_-]+)/([a-zA-Z0-9_-]+)/pull/([0-9]+)");
var ghRepoUser = ghUrlParts[1];
var ghRepoName = ghUrlParts[2];
var ghPRNumber = ghUrlParts[3];


var ghCSRFToken = $("meta[name=csrf-token]").attr("content");

var ghRepoUrlBase = "https://api.github.com/repos/" + ghRepoUser + "/" + ghRepoName;
var ghIssuePostUrl = "/" + ghRepoUser + "/" + ghRepoName + "/issues/labels/modify_assignment";

var ghRepoLabels;
var ghIssueLabels;

// TODO: Make this less bad...
function ghAppendDiscussionLabels() {
  if (ghRepoLabels === undefined || ghIssueLabels == undefined) {
    return;
  }
  
  var labelstyleCSS = ['<style type="text/css" media="screen">'];

  $.each(ghRepoLabels, function(k, v) {
    // For each label in the repo mark whether it is selected in this issue
    v.selected = false;
    $.each(ghIssueLabels, function(k2, v2) {
      if (v.name == v2.name) {
        v.selected = true;
        return false;
      }
    });

    // Append CSS values for the labelstyle class for this label
    // GitHub uses some combination of color adjustments to pick good
    // foreground text colors to go against backgrounds of the label colors
    // It would be difficult to reverse engineer *exactly* what algorithm
    // they're using, and I couldn't find too many clues online.  But this
    // seems to get a pretty similar effect.
    var className = ".labelstyle-" + v.color;
    var rgbColor = hexToRgb(v.color);
    labelstyleCSS.push("span" + className +
                       "{ background: #" + v.color + " !important; " +
                       "color: " + rgbContrastColor(rgbColor) + " !important; }");
    labelstyleCSS.push(".label-select-menu " + className +
                       ".selected { background: " + rgbaString(rgbColor, 0.12) + " !important; " +
                       "color: " + rgbDarkAddition(rgbColor, hexToRgb("#333333")) + " !important; }");
  });

  labelstyleCSS.push("</style>");

  $("head").append(labelstyleCSS.join("\n"));
  
  var context = {labels: ghRepoLabels, issueLabels: ghIssueLabels, dataUrl: ghIssuePostUrl,
               issue: ghPRNumber, csrf_token: ghCSRFToken};

  $("div.discussion-sidebar").append("<hr></hr>").append(ghDiscussionLabelsTemplate(context));
}

GM_xmlhttpRequest({
  method: "GET",
  url: ghRepoUrlBase + "/labels",
  headers: {"Accept": "application/json"},
  onload: function(response) {
    // TODO: Error handling
    ghRepoLabels = JSON.parse(response.responseText);
    // Sort the labels lexicographically; not sure what order they're coming out
    // by default but it seems GH does this client-side _/o_O\_
    ghRepoLabels.sort(function(a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    ghAppendDiscussionLabels();
  }
});

GM_xmlhttpRequest({
  method: "GET",
  url: ghRepoUrlBase + "/issues/" + ghPRNumber + "/labels",
  headers: {"Accept": "text/json"},
  onload: function(response) {
    // TODO: Error handling
    ghIssueLabels = JSON.parse(response.responseText);
    ghAppendDiscussionLabels();
  }
});


/* Utilities */
/* Borrowed from here: http://stackoverflow.com/a/5624139/982257 */
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


/* Given an RGB color; convert to YIQ color space to determine an appropriate
 * contrast color for text on a background of the given color (currently just
 * selects between #333333 and white) */
function rgbContrastColor(rgb) {
  var yiq = ((rgb.r * 299) + (rgb.g * 587) + (rgb.b * 114)) / 1000;
  return yiq >= 128 ? "#333333" : "#ffffff";
}


function rgbDarkAddition(rgb1, rgb2) {
  return "#" + Math.floor((rgb1.r + rgb2.r) / 2).toString(16) +
         Math.floor((rgb1.g + rgb2.g) / 2).toString(16) +
         Math.floor((rgb1.b + rgb2.b) / 2).toString(16);
}

/* Converts the given RGB color (as returned by hexToRgb) to an rgba value for
 * CSS with the given alpha */
function rgbaString(rgb, alpha) {
  return "rgba(" +
         [rgb.r.toString(), rgb.g.toString(), rgb.b.toString()].join(", ") +
         ", " + alpha.toString() + ")";
}
