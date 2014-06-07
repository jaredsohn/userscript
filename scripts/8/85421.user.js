// ==UserScript==
// @name          Gmail Labels Icons
// @description   Add icons to Gmail labels
// @author        Khaled Alhourani
// @include       http://mail.google.com/*
// @include       https://mail.google.com/*
// @require       http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @version       1.0
// ==/UserScript==


// Path
var path = window.location.pathname;

// Icons
var icons_url = "http://koko.holooli.com/icons/";
var icons = ["administrative-docs", "archives", "bank", "basket", "bookmark", "business-contact", "busy", "calendar", "check", "contact", "credit-card", "customers", "email", "full-time", "home", "pencil", "world", "settings"];

for (var i = 0; i < icons.length; i++) {
  icons[i] = icons_url + icons[i] + '.png';
}

var layout = '';
for (var i = 0; i < icons.length; i++) {
  layout += '<span><img src="' + icons[i] + '"/></span>';
}

layout = '<div id="gmail_lables_icons">' + layout + '</div>';


// Style
var css = "#gmail_lables_icons {border:1px solid #ccc; padding:4px; width:120px;} #gmail_lables_icons span {cursor:pointer; margin:2px 4px;} #gmail_lables_icons span:hover {background-color:#fff;}";
GM_addStyle(css);


// Insert icons into Gmail label widget
function insertIcons() {
  if (!$("#gmail_lables_icons").length) {
    $(".pN").prepend(layout);
    window.setTimeout(insertIcons, 500);
    return;
  }
}


function removeBackgroundAndBorder(obj) {
  obj.css("background-color", "transparent");
  obj.css("border-color", "transparent");
}


function addBackground(obj, css_image, height, width) {
  obj.css("background-image", css_image);
  obj.css("background-repeat", "no-repeat");
  obj.css("height", height);
  obj.css("width", width);
} 


// @todo: add desc.
function replaceLabels() {
  // Get all values from GM
  var vals = [];
  for each (var val in GM_listValues()) {
    var current_path = val.substr(0, path.length);

    if (current_path == path) {
      var label_name = val.substr(path.length + 1);
      var label = null;
      var icon_css = 'url("' + icons_url + GM_getValue(val) + '")';

      $(".TN span.nU a").filter(function() {
	if ($(this).text() === label_name) {
	  label = $(this)
	}
      });

      if (label) {
	var label_obj = label.parent().parent().find(".pM");

	removeBackgroundAndBorder($(label_obj));
	removeBackgroundAndBorder($(label_obj).children("div"));

	addBackground($(label_obj), icon_css, "16px", "16px");

	$(label_obj).find(".p8").empty();
	$(label_obj).css("margin-right", "2px");
	$(label_obj).parent().css("height", "16px");
	$(label_obj).parent().css("width", "16px");
      }
    }
  }
}


// Iconize the labelsnull
function iconize() {
  // Check to see if we have a fully loaded page
  var parent = document.getElementsByClassName('no')[0];
  if (!parent) { window.setTimeout(iconize, 500); return; }

  var label_obj = null;

  // on click event for label
  $(".TN .pM").click(function() {
    label_obj = this;
    insertIcons();

    // @todo: remove this call
    replaceLabels();
  });

  // on click event for icons
  $("#gmail_lables_icons span").live('click', function() {
    // Prepare some icon variables
    var icon_url = $(this).children("img").attr("src");
    var icon_css = 'url("' + $(this).children("img").attr("src") + '")';
    var icon_name = icon_url.substr(icons_url.length);

    // Hide current colors
    removeBackgroundAndBorder($(label_obj));
    removeBackgroundAndBorder($(label_obj).children("div"));

    // Add the icon of choice
    addBackground($(label_obj), icon_css, "16px", "16px");

    // Set the current icon in GM
    // Label name or caption is unique, so use it with the current path as a unique name
    var name = path + '_' + $(label_obj).parent().parent().find("span.nU a").text();
    var value = icon_name;
    GM_setValue(name, value);
  });

  // Replace labels colors with the icons that the user has chosen
  // @todo: remove this call and put in init or something
  replaceLabels();
}


// Add event listener!
window.addEventListener('load', iconize, false);