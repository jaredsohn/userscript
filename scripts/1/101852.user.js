// ==UserScript== 
// @name        Facebook Autopoke 
// @author      Michael Soh 
// @namespace   autopoke_5200 
// @description Automatically pokes back people listed on your home page. This script was inspired by Lukas Fragodt's Auto-Poke and EZ-Poke. 
// @version     4.0
// @license     GPL 3.0 
// @include     http*://*.facebook.com/* 
// @exclude     http*://*.facebook.com/plugins/*
// @exclude     http*://*.facebook.com/widgets/*
// @exclude     http*://*.facebook.com/iframe/*
// @exclude     http*://*.channel.facebook.com/*
// @exclude     http*://*.facebook.com/ai.php*
//  
// @require     http://usocheckup.redirectme.net/5200.js
// 
// ==/UserScript== 
 
var debug = 0;
var log_limit = 500; // The max number of characters in each log entry.
var wait = 5; // in minutes
wait = wait * 60 * 1000; // in milliseconds

if (debug > 2) fb_log_div(); 
if (debug > 0) FB_log('Current Location: ' + document.location); 

var script_error = 0;
var fb_dtsg = get_var_value('fb_dtsg');
var post_form_id = get_var_value('post_form_id');
var ajaxify_vars = '__a=1';
 
init();

 
// =-=-=-=-=- FUNCTIONS -=-=-=-=-= //

function init() {
     var url = '' + document.location;
     var d = new Date();
     if (debug > 0) FB_log("init: " + d.toString());
     
     url += (url.match(/\?/) == null ? "?" : "&") + (d.getTime());
     if (debug > 1) FB_log("url to ping: " + url);

     var r = new XMLHttpRequest();
     r.open('GET', url, true);

     r.onreadystatechange = function () {
          if (r.readyState == 4) {
               if (r.status == 200) {
                    if (debug > 3) FB_log(r.responseText);

                    var poke_divs = evaluate_xpath(".//script[contains(.,'poke_dialog.php')]");
                    if (poke_divs.snapshotLength == 1) {
                         var div_regex = /"pagelet_pokes":"(.*)"/;
                         div_regex.exec(poke_divs.snapshotItem(0).innerHTML);
                         var poke_pagelet = new String(RegExp.$1);

                         poke_pagelet = decode_unicode(poke_pagelet);
                         if (debug > 3) FB_log('poke_pagelet: ' + poke_pagelet);
                         find_pokes(string_to_xml(poke_pagelet));
                    } else if (poke_divs.snapshotLength == 0) {
                         FB_log("No pokes found.");
                    } else {
                         FB_log("Auto-poke detected a different schema.  Quitting...");
                    }
               } else {
                    FB_log("Error loading page");
               }
          }
     };
     
     r.send(null);
}



function find_pokes(xml) {
     // Retrieve poke links via XPath
     var poke_divs = evaluate_xpath('.//div[@id[starts-with(.,"poke")]]', xml);
     var names     = evaluate_xpath('.//div[@id[starts-with(.,"poke")]]/div/a[1]', xml);
     var anchors   = evaluate_xpath('.//div[@id[starts-with(.,"poke")]]/div/a[2]', xml);

     if (debug > 0) FB_log('Poke back links found: ' + poke_divs.snapshotLength);
     
     for (var i=0; i < anchors.snapshotLength; i++) {
	  var ajax_ref = anchors.snapshotItem(i).getAttribute('ajaxify');
	  FB_log(i + " " + names.snapshotItem(i).textContent + ": " + ajax_ref);

	  var poke_uid_regexp = /poke_(\d+)/;
	  poke_uid_regexp.exec(poke_divs.snapshotItem(i).getAttribute('id'));
	  var poke_uid = RegExp.$1;

	  ajax_ref = ajax_ref.replace(/\?.*/, '');
	  ajax_ref = ajax_ref + "?uid=" + poke_uid + "&pokeback=1&" + ajaxify_vars;

          update_frontpage(poke_uid, 1);
	  poke_function(ajax_ref);
          
          if (script_error > 0) {
               FB_log('Unrecoverable error has occured.');
               i = anchors.snapshotLength + 10;
               turn_on_debugging();
          }
     } 
     
     if (anchors.snapshotLength == 0) { 
          FB_log('No pokes found.');
     } 
} 
 
 
function poke_function(poke_link) { 
     if (debug > 0) FB_log("Retrieving confirmation page(" + poke_link + ")");

     var poke_uid_regexp = /\?uid=(\d+)&pokeback/;
     poke_uid_regexp.exec(poke_link);
     var poke_uid = RegExp.$1;

     var post_data = 'uid=' + poke_uid + '&pokeback=1&__d=1&post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&lsd&post_form_id_source=AsyncRequest';

     var r = new XMLHttpRequest();
     r.open('POST', poke_link, true);

     r.onreadystatechange = function () {
          if (r.readyState == 4) {
               if (r.status == 200) {
                    if (debug > 2) FB_log(r.responseText, 1);

                    // Retrieve the "body" of the poke dialog along with
                    // the buttons that are being sent.
                    var div_regex = /"body":{"__html":"(.*)"},"buttons":\[(.*)\],/;
                    div_regex.exec(r.responseText);

                    var poke_response = RegExp.$1;
                    var buttons = RegExp.$2;

                    // Convert the string to xml for parsing.
                    poke_response = decode_unicode(poke_response);
                    if (debug > 2) FB_log('poke_response: ' + poke_response, 1);
                    var xml = string_to_xml(poke_response);
                    
                    if (debug > 2) FB_log('buttons: ' + buttons, 1);
                   
                    // Process the buttons that Facebook returned.  If
                    // it contains a "name" and "label", usually means
                    // that the user is being given a choice to choose
                    // "Poke" or "Cancel".
                    var button_regex = /^{"name":"(.*)","label":"(.*)"},"cancel"$/;

                    if (button_regex.test(buttons)) {
                         update_frontpage(poke_uid, 3);
                         button_regex.exec(buttons);
                         
                         var new_input_node = xml.createElement('input');
                         new_input_node.setAttribute('type', 'hidden');
                         new_input_node.setAttribute('name', RegExp.$1);
                         new_input_node.setAttribute('value', RegExp.$2);
                         
                         // Add the button to the xml.
                         xml.getElementsByTagName('div')[1].appendChild(new_input_node);
                         if (debug > 2) FB_log(xml_to_string(xml), 1);
                    }


                    // Retrieve the postURI.
                    var postURI_regex = /"postURI":\["(.*)",(.*)\]}}$/;
                    if (postURI_regex.test(r.responseText)) {
                         postURI_regex.exec(poke_response);

                         var new_input_node = xml.createElement('form');
                         new_input_node.setAttribute('id', 'postURI');
                         new_input_node.setAttribute('status', RegExp.$2);  // The autopoke script does not use this, but it is stored in case it needs it.
                         new_input_node.setAttribute('action', RegExp.$1.replace("\\\/", "\/", "g"));
                         
                         // Add the button to the xml.
                         xml.getElementsByTagName('div')[1].appendChild(new_input_node);
                         if (debug > 2) FB_log(xml_to_string(xml), 1);
                    }

                    if (parse_poke_response(xml)) execute_poke(xml);
               } else { // if status is not 200
                    update_frontpage(poke_uid, 12);
               }
          } // if readystate is not 4
     }; // end onReadyStateChange function

     r.setRequestHeader('Referer', document.location);
     r.setRequestHeader('Cookie', document.cookie);

     update_frontpage(poke_uid, 2);
     if (debug > 2) FB_log('post_data: ' + post_data);
     r.send(post_data);
}



function execute_poke(xml) {
     var poke_uid = evaluate_xpath('.//input[@name="uid"]', xml).snapshotItem(0).getAttribute('value');;

     var postURI = evaluate_xpath('.//form[@id="postURI"]', xml).snapshotItem(0).getAttribute('action');
     postURI += "?__a=1";
     var input_nodes = evaluate_xpath('.//input', xml);
     var post_data = "__d=1&lsd=&post_form_id_source=AsyncRequest&fb_dtsg=" + fb_dtsg;

     for (var i = 0; i < input_nodes.snapshotLength; i++) {
          if (input_nodes.snapshotItem(i).hasAttribute('value'))
               post_data += "&" + input_nodes.snapshotItem(i).getAttribute('name') + "=" + input_nodes.snapshotItem(i).getAttribute('value');
          else 
               post_data += "&" + input_nodes.snapshotItem(i).getAttribute('name') + "=";
     }


     var r = new XMLHttpRequest();
     r.open('POST', postURI, true);

     r.onreadystatechange = function () {
          if (r.readyState == 4) {
               var poke_status = 0;

               if (r.status == 200) {
                    if (debug > 2) FB_log("Response for UID " + poke_uid + ": " + r.responseText, 1);

                    // Successful pokes have an autohide "handler"
                    var poke_successful = /"handler":"","autohide"/;
                    var poke_error = /"title":{"__html":"Error"}/;
                    
                    if (poke_error.test(r.responseText))
                         poke_status = 110;
                    else if (poke_successful.test(r.responseText))
                         poke_status = 100;
                    else
                         poke_status = 30;
               } else {
                    poke_status = 40;
               }

               update_frontpage(poke_uid, poke_status);
               return poke_status;
          }
     }; // end onReadyStateChange function

     r.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
     r.setRequestHeader('Referer', document.location);
     r.setRequestHeader('Cookie', document.cookie);

     if (debug > 1) FB_log("Post data for UID " + poke_uid + ": " + post_data);
     if (debug > 1) FB_log("PostURI: " + postURI);
     update_frontpage(poke_uid, 4);
     r.send(post_data);
}

/* Helper Functions */

function update_frontpage(uid, poke_step) {
     var user_div = evaluate_xpath('.//div[@id[contains(.,"' + uid + '")]]/div/a[@ajaxify[contains(.,"' + uid + '")]]');

     if (user_div.snapshotLength == 0)
          FB_log('User ' + uid + ' could not be found on the frontpage.  Continuing anyway.');
     else if (user_div.snapshotLength > 1)
          FB_log('User ' + uid + ' returned multiple nodes.  Continuing anyway.');
     else {
          var poke_anchor = user_div.snapshotItem(0);

          switch (poke_step) {
               case 1:
                    poke_anchor.textContent = "Initializing...";
                    break;
               case 2:
                    poke_anchor.textContent = "Obtaining poke lock...";
                    break;
               case 3:
                    poke_anchor.textContent = "Lock confirmed; preparing to poke...";
                    break;
               case 4:
                    poke_anchor.textContent = "Transmitting poke information...";
                    break;
               case 11:
                    poke_anchor.textContent = "Error 11: could not initialize.";
                    break;
               case 12:
                    poke_anchor.textContent = "Error 12: Could not issolate poke lock.";
                    break;
               case 13:
                    poke_anchor.textContent = "Error 13: Facebook return an unexpected response.";
                    break;
               case 100:
                    poke_anchor.textContent = "Auto-poked!";
                    poke_anchor.removeAttribute('ajaxify');
                    poke_anchor.setAttribute('title', 'Poke count: ' + count_poke(uid));
                    break;
               case 110:
                    poke_anchor.textContent = "Already poked";
                    poke_anchor.removeAttribute('ajaxify');
                    break;
               default:
                    poke_anchor.textContent = "Error 400: Unknown error.";
                    break;
          }
     }

     if ((poke_step > 10) && ((poke_step % 10) > 0))
          script_error = 1;

     return poke_step;
}

// Returns 1 if the user can be poked.

function get_var_value(name) {
     if (debug > 2) FB_log('Attempting to retrieve value for variable ' + name);
     var return_value = null;
     var n = evaluate_xpath('.//*[@name="' + name + '"]');

     if (n.snapshotLength > 0) 
          return_value = n.snapshotItem(0).getAttribute('value');

     if (debug > 2) FB_log(name + ' = (' + return_value + ')');
     return return_value;
}

function parse_poke_response(xml) {
     var return_value = 0;
     var pokable = evaluate_xpath('.//input[@name="pokeback"]', xml);

     if (pokable.snapshotLength == 1) return_value = 1;

     return return_value;
}

function FB_log(log_string, full) {
     if (debug >= 3) full = 1;

     if (debug > 2) {
	  var logspace = document.getElementById('fb_log');
          if ((!full) && (debug <= 5) && (log_string.length > log_limit)) logspace.value += log_string.substr(0, log_limit) + "... (" + (log_string.length - log_limit) + " characters)\n";
          else logspace.value += log_string + "\n";

	  logspace.scrollTop = logspace.scrollHeight;
     }

     GM_log(log_string);
}

function toggle_fb_log() {
     var fb_log = document.getElementById('my_div');
     if (fb_log.style.display != "none") {
	  fb_log.style.display = "none";
     } else {
	  fb_log.style.display = "block";
     }
}


function fb_log_div() {
     my_div = document.createElement('div'); 
     my_div.setAttribute('style', 'height: 300px; width: 600px; ' + 
               'background-color: #99FFCC; z-index: 100; position: fixed;' +
	       'padding: 5px; ' +  
	       'right: 10px; bottom: 10px;');
     my_div.setAttribute('id', 'my_div');

     my_div.innerHTML = '<p><a id="close_fb_log">Close</a></p>' +
	     '<textarea style="width: 590px; height: 225px;" id="fb_log" nowrap readonly>' +  
	     '</textarea>';

     document.body.insertBefore(my_div, document.body.firstChild);
     document.getElementById('close_fb_log').addEventListener("click", toggle_fb_log, true);
}

function turn_on_debugging() {
     if (confirm('The autopoke script generated ' +
               'an error.  If you would like, you can enable debugging. ' + 
               'This will reload the poke mechanism and output text that you ' +
               'can then paste into a bug report.  Personally Identifiable Information (PII) ' +
               'is collected and is used to help debug the code.  If you are unsure if ' +
               'you want to continue, click CANCEL now.')) {
          debug = 5;

          fb_log_div();
          init();
     }
}


//=-=-=-=-=- POKE WAR COUNT -=-=-=-=-=//
function count_poke(uid) {
     var current_count = get_poke_count(uid);
     var xml = get_pokewar_log();
     var new_count = parseInt(current_count, 10) + 1;

     if (debug > 1) FB_log('Current poke count: ' + current_count);

     if (current_count == 0) {
          var new_node = xml.createElement('belligerent');
          new_node.setAttribute('uid', uid);
          new_node.setAttribute('count', 1);
          xml.getElementsByTagName('pokewar')[0].appendChild(new_node);
     } else {
          var node = evaluate_xpath('.//belligerent[@uid=' + uid + ']', xml);
          node.snapshotItem(0).setAttribute('count', new_count);
     }
     
     if (debug > 2) FB_log(xml_to_string(xml), 1);
     store_pokewar(xml);

     return new_count;
}

function store_pokewar(xml) {
     GM_setValue('pokewar', xml_to_string(xml));
}

function get_poke_count(uid) {
     var count = 0;
     var xml = get_pokewar_log();
     var node = evaluate_xpath('.//belligerent[@uid=' + uid + ']', xml);

     if (node.snapshotLength == 1) {
          count = node.snapshotItem(0).getAttribute('count');
     }

     return count;
}


function get_pokewar_log() {
     var pokewar_battle_log = GM_getValue('pokewar', '<pokewar />');
     var xml = string_to_xml(pokewar_battle_log);

     return xml;
}



//=-=-=-=-=- STANDARD FUNCTIONS -=-=-=-=-=//
 
function evaluate_xpath(xpath_query, xml) { 
     if (!xml) xml = document;

     if (debug >= 2) FB_log(xpath_query); 
     var nodes = xml.evaluate(xpath_query, xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
     if (debug >= 2) FB_log('nodes returned: ' + nodes.snapshotLength); 
 
     return nodes; 
}

function decode_unicode(s) {
     var new_s = "";

     if (s.length > 0) {
          if (debug > 2) FB_log('Decoding the following string (length: ' + s.length + '): ' + s);

          unicode_regex = /\\u[a-z0-9]{4}/gi;
          new_s = s.match(unicode_regex);
     
          for (var i = 0; i < new_s.length; i++) {
               var hex_regex = /\\u([a-z0-9]{4})/;
               var hex = hex_regex.exec(new_s[i]);
               
               var current = "0x" + hex[1];
               if (debug > 2) FB_log("(" + current + ") == (" + String.fromCharCode(current) + "), new_s[i]:" + new_s[i]);
			   
			   s = s.replace(new_s[i], String.fromCharCode(current));
          }
		  
          s = s.replace(/\\/gi, "");
          s = s.replace(/\\\//gi, "\/");
     }
	 if (debug > 2) FB_log('Decoded String: (length: ' + s.length + '): ' + s);
	 
     return s;
}

function string_to_xml(s) {
     var parser = new DOMParser();
     var dom = parser.parseFromString(s, 'text/xml');

     return dom;
}

function xml_to_string(xml) {
     var serializer = new XMLSerializer();
     var prettyString = serializer.serializeToString(xml);

     return prettyString;
}
