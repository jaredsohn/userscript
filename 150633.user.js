// ==UserScript==
// @name       Colin Mailer
// @namespace  Colin mailer
// @version    1
// @description  Colin Mailer
// @match      http://*erepublik.com/*
// @copyright  2012, sugarfree
// ==/UserScript==

// Storage
var MMdb = null;
try {
	MMdb = !window.globalStorage ? window.localStorage : window.globalStorage[location.hostname];
	if (MMdb == null || MMdb == undefined || MMdb == "undefined") {
		MMdb = !unsafeWindow.globalStorage ? unsafeWindow.localStorage : unsafeWindow.globalStorage[location.hostname];
    }
}
catch(e) {
}
if(MMdb == null) {
    alert("Couldn't set storage. Derp!");
	return;
}

var p = unsafeWindow;

// chrome
if(window.navigator.vendor.match(/Google/)) {
  var div = document.createElement("div");
  div.setAttribute("onclick", "return window;");
  p = div.onclick();
};
var jQuery = p.jQuery;

// Vital functions
function eliminateDuplicates(arr) {
  var i,
      len=arr.length,
      out=[],
      obj={};

  for (i=0;i<len;i++) {
    obj[arr[i]]=0;
  }
  for (i in obj) {
    out.push(i);
  }
  return out;
}

p.MM_loadNext = function() {
  var MM_loc = window.location.href.split("/");
  var MM_curID = MM_loc[MM_loc.length-1].replace("#", "");
  if(MM_idlist[(MM_idlist.indexOf(MM_curID)+1)]) setTimeout(function() {window.location.href = "http://www.erepublik.com/en/main/messages-compose/"+MM_idlist[(MM_idlist.indexOf(MM_curID)+1)];}, 1500);
  else {
    alert("Last ID reached!");
    MM_running = "no";
    MMdb.setItem("MM_running", MM_running);
  }
}

// Get variables
var MM_idlist = MMdb.getItem("MM_idlist");
if(MM_idlist) MM_idlist = eliminateDuplicates(MM_idlist.split(","));
else {
  MM_idlist = [];
}
var MM_subject = MMdb.getItem("MM_subject") ? MMdb.getItem("MM_subject") : "";
var MM_body = MMdb.getItem("MM_body") ? MMdb.getItem("MM_body") : "";
var MM_on = MMdb.getItem("MM_on");
if(!MM_on) {
  MMdb.setItem("MM_on", "no");
  MM_on = "no";
}
var MM_running = MMdb.getItem("MM_running");
if(!MM_running) {
  MMdb.setItem("MM_running", "no");
  MM_running = "no";
}

// Check if MMer is ON etc
if(MM_on == "yes" && window.location.href.indexOf("/main/messages-compose/") != -1) {
  MM_cur_id = window.location.href.split("/")[6];
  if(MM_idlist.indexOf(MM_cur_id) != -1) {

    // Rewrite handle_form
    p.handle_form = function(object) {
      var form  = jQuery(object).parents("form");
      if (form[0].id == 'message_form') {
        jQuery(form[0]).hide();
        jQuery('#sending_message_indicator').show();
      }
      jQuery.post(form.attr('action'), form.serialize(), p.callback, 'html');
      setTimeout(p.MM_loadNext(), 1500);
    }

  }

  // Send MM button
  if(MM_running == "no") {
    jQuery("div.coloured").append('<a href="#" class="fluid_blue_dark_medium"><span class="bold" id="send_mm">Send MM</span></a>')
    jQuery("span#send_mm").click(function() {
      if(window.location.href == "http://www.erepublik.com/en/main/messages-compose/"+MM_idlist[0]) {
        MM_running = "yes";
        MMdb.setItem("MM_running", MM_running);
        p.handle_form(jQuery("a[title='submit']"));
      }
      else window.location.href = "http://www.erepublik.com/en/main/messages-compose/"+MM_idlist[0];
      return false;
    });
  }

  if((MM_running == "yes" && MM_idlist.indexOf(MM_cur_id) != -1) || MM_idlist.indexOf(MM_cur_id) == 0) {
    jQuery("#citizen_subject")[0].value = MM_subject;
    jQuery("#citizen_message")[0].value = MM_body;
    if(MM_running == "yes" && jQuery("div#recaptchaContainer").length == 0) setTimeout(function() {p.handle_form(jQuery("a[title='submit']"));},1000);
  }
}

// Create User Interface
jQuery("li#menu5 ul").append('<li><a href="#" id="MM_menu">Mass Messager</a></li>');
jQuery("body").append('<div id="MM_GUI"><table align="center"><tr><td>Subject:</td><td><input type="text" id="MM_subject" value="'+MM_subject+'" size="65"></td></tr><tr><td>ID list</td><td><input type="text" id="MM_idlist" value="'+MM_idlist.join()+'" size="65"></td></tr><tr><td>Message</td><td><textarea cols="50" rows="12" id="MM_body">'+MM_body+'</textarea></td></tr><tr><td>Status</td><td><input type="radio" name="MM_status" id="MM_status_on"'+(MM_on == "yes" ? " CHECKED" : "")+'>ON <input type="radio" name="MM_status" id="MM_status_off"'+(MM_on == "no" ? " CHECKED" : "")+'>OFF</td></tr><tr><td>Running? (Should be NO)</td><td><input type="radio" name="MM_running" id="MM_running_on"'+(MM_running == "yes" ? " CHECKED" : "")+'>YES <input type="radio" name="MM_running" id="MM_running_off"'+(MM_running == "no" ? " CHECKED" : "")+'>NO</td></tr><tr><td colspan="2"><a href="#" id="MM_save"><span class="bold">Save</span></a> | <a href="#" id="MM_save_start"><span class="bold">Save and start</span></a></td></tr></table></div>');
jQuery("div#MM_GUI").css("display", "none");
jQuery("div#MM_GUI").css("position", "absolute");
jQuery("div#MM_GUI").css("margin-left", "30%");
jQuery("div#MM_GUI").css("margin-right", "70%");
jQuery("div#MM_GUI").css("text-align", "center");
jQuery("div#MM_GUI").css("width", "40%");
jQuery("div#MM_GUI").css("height", "300px");
jQuery("div#MM_GUI").css("top", "20%");
jQuery("div#MM_GUI").css("background-color", "white");
jQuery("div#MM_GUI").css("z-index", "10000");
jQuery("a#MM_menu").click(function() {
  jQuery("div#MM_GUI").css("display", "block");
  return false;
});
function MM_save_data() {
  MM_subject = jQuery("input#MM_subject").val();
  MMdb.setItem("MM_subject", MM_subject);
  MM_body = jQuery("textarea#MM_body").val();
  MMdb.setItem("MM_body", MM_body);
  MM_idlist = eliminateDuplicates(jQuery("input#MM_idlist").val().replace(/[^0-9,]/g, '').replace(/,[,]*/g, ',').split(","));
  MMdb.setItem("MM_idlist", MM_idlist.join(","));
  if(jQuery("input#MM_status_on:checked").val() == "on") MM_on = "yes";
  else MM_on = "no";
  MMdb.setItem("MM_on", MM_on);
  if(jQuery("input#MM_running_on:checked").val() == "on") MM_running = "yes";
  else MM_running = "no";
  MMdb.setItem("MM_running", MM_running);
  jQuery("div#MM_GUI").css("display", "none");
}
jQuery("a#MM_save").click(function() {
  MM_save_data();
  return false;
});
jQuery("a#MM_save_start").click(function() {
  MM_save_data();
  window.location.href = "http://www.erepublik.com/en/main/messages-compose/"+MM_idlist[0];
  return false;
});