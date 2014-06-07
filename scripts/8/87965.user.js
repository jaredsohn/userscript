// ==UserScript== 
// @name        Facebook Autopoke 
// @author      Michael Soh 
// @namespace   autopoke_5200 
// @description Automatically pokes back people listed on your home page. This script was inspired by Lukas Fragodt's Auto-Poke and EZ-Poke. 
// @version     3.4 (14 Sept 2010)
// @license     GPL 3.0 
// @include     http*://facebook.com/home.php* 
// @include     http*://*.facebook.com/home.php* 
// @include     http*://*.facebook.com/ 
// @include     http*://*.facebook.com/?* 
// @include     http*://*.facebook.com/#* 
//  
// @require     http://usocheckup.redirectme.net/5200.js
// 
// ==/UserScript== 
 
var debug = 0;
var retries = 40; 
var wait = 1500; // 1.5 seconds 
var subDomainRegExp = /http[s]?:\/\/(.*\.)facebook\.com/; 
var subDomain = ''; 
if (subDomainRegExp.exec(document.location) != 0) 
     subDomain = RegExp.$1; 
 
var debug_url = /&autopoke_debug=(\d+)/; 
if ((debug_url.exec(document.location) != 0) && (RegExp.$1 > debug)) { 
     debug = RegExp.$1; 
      
     alert('Autopoke debugging as been activated to level ' + debug); 
     GM_log('Autopoke debugging as been activated via URL to level ' + debug); 
} 

if (debug > 2) { 
     my_div = document.createElement('div'); 
     my_div.innerHTML = '<div style="height: 300px; width: 600px; ' + 
	     'background-color: #99FFCC; z-index: 100; position: fixed;' + 
	     'padding: 5px; ' +  
	     'right: 10px; bottom: 10px;" id="my_div">' +  
	     '<p><a id="close_fb_log">Close</a></p>' +
	     '<textarea style="width: 590px; height: 225px;" id="fb_log" nowrap readonly>' +  
	     '</textarea>' +
	     '<input type="submit" value="Submit for debugging" /></div>'; 

     document.body.insertBefore(my_div, document.body.firstChild);
     document.getElementById('close_fb_log').addEventListener("click", toggle_fb_log, true);
} 

if (debug > 0) FB_log('Current Location: ' + document.location); 
 
setTimeout(init, wait); 
 
// =-=-=-=-=- FUNCTIONS -=-=-=-=-= // 
function init() { 
     var html_tag = evaluate_xpath('.//html'); 
     var fb_lang = html_tag.snapshotItem(0).getAttribute('lang'); 
 
     if (debug > 0) { 
          var poke_div = evaluate_xpath('.//h4[contains(.,"Pokes")]'); 
 
          if (poke_div.snapshotLength == 1) { 
               poke_div.snapshotItem(0).innerHTML += ' <a href="#" id="auto_poke">Auto-poke</a>'; 
               evaluate_xpath('.//a[@id="auto_poke"]').snapshotItem(0).addEventListener('click', find_pokes, true); 
          } 
 
     } 
 
     find_pokes(); 
} 

function toggle_fb_log() {
     var fb_log = document.getElementById('my_div');
     if (fb_log.style.display != "none") {
	  fb_log.style.display = "none";
     } else {
	  fb_log.style.display = "block";
     }
}
 
function find_pokes() { 
     // Retrieve poke links via XPath 
     var anchors = evaluate_xpath('.//a[@id[starts-with(.,"poke")]]'); 
 
     if (anchors.snapshotLength > 0) { 
          if (debug > 0) FB_log('Poke back links found: ' + anchors.snapshotLength) 
          var pokeRegExp = /id=(\d*)/; 
          for (var i = 0; i < anchors.snapshotLength; i++) { 
               pokeRegExp.exec(anchors.snapshotItem(i).href); 
               poke_function(anchors.snapshotItem(i).href, anchors.snapshotItem(i)); 
          } 
     } else { 
          retries--; 
          FB_log('No pokes found. Retries left: ' + retries); 
          if (retries > 0)           
               setTimeout(find_pokes, wait); 
     } 
} 
 
 
function poke_function(poke_link, poke_node) { 
     var uid_match = /uid=(\d+)&can_poke=(\d+)/; 
     uid_match.exec(poke_link); 
     var poke_uid = RegExp.$1; 
 
     poke_link += "&__a=1&__d=1"; 
     if (debug > 0) FB_log("Retrieving confirmation page(" + poke_link + ")"); 
 
     GM_xmlhttpRequest({ 
          method:'GET', 
          url:poke_link, 
          onload: function(response) { 
               if (response.status == 200) { 
                    if (response.responseText.indexOf('You are about to poke') != -1) { 
                         poke_node.innerHTML = 'Reading confirmation page (' + poke_uid + ')...'; 
                         if (debug >= 2) FB_log("Text:" + response.responseText); 
                         execute_poke(poke_uid, poke_node); 
                    } else if (response.responseText.indexOf('has not received your last poke yet') != -1) { 
                         poke_node.removeAttribute('href'); 
                         poke_node.innerHTML = 'Already poked!'; 
                    } else { 
                         poke_node.removeAttribute('href');  
                         poke_node.innerHTML = 'Auto-Poke failed! [1.1]';  
                         FB_log("Auto-Poke failed -- Error Code 1.1: While retreiving the poke confirmation page, the script was unable to determine whether the user had already been poked or is about to be poked.  This is likely the result of Facebook changing their code again.");  
                         FB_log(response.responseText); 
                     } 
              } else { 
                    poke_node.innerHTML = 'Auto-Poke failed! [1.2]'; 
                    FB_log("Auto-Poke failed -- Error Code 1.2: The poke confirmation page returned a non-200 OK response\n\nfacebook returned:" + response.status + response.statusText); 
              } 
          } 
     }); // end of GM_xmlhttpRequest 
 
} 
 
function execute_poke(poke_uid, poke_node) { 
     FB_log('cookie: ' + document.cookie); 
     var post_form_id = evaluate_xpath('.//*[@id="post_form_id"]').snapshotItem(0).value; 
     var fb_dtsg = evaluate_xpath('.//*[@name="fb_dtsg"]').snapshotItem(0).value; 
     var post_data = 'uid=' + poke_uid + '&pokeback=1&post_form_id=' + post_form_id + '&fb_dtsg=' + fb_dtsg + '&post_form_id_source=AsyncRequest'; 
 
     poke_node.innerHTML = 'Executing autopoke (' + poke_uid + ')...'; 
     if (debug > 0) FB_log('post_data: ' + post_data); 
 
     //Submit the poke. 
     GM_xmlhttpRequest({ 
          method:'POST', 
          url:'http://' + subDomain + 'facebook.com/ajax/poke.php?__a=1', 
          headers:{ 
               'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8', 
               'Referer':document.location, 
               'Cookie':document.cookie, 
          }, 
          data:post_data, 
          onload: function (response) { 
               if (response.status == 200) { 
                    //Poke either already happened, was successful, or failed. 
                    if (response.responseText.indexOf('has not received your last poke yet') != -1) { 
                         poke_node.removeAttribute('href'); 
                         poke_node.innerHTML = 'Already poked!'; 
                    } else if (response.responseText.indexOf('You have poked') != -1) { 
                         poke_node.removeAttribute('href'); 
                         poke_node.innerHTML = 'Auto-Poked!'; 
                    } else { 
                         poke_node.innerHTML = 'Poke failed! [2.1]'; 
                         FB_log("Auto-Poke failed -- Error Code 2.1: Facebook gave an unexpected response to the poke."); 
                         FB_log(response.responseText); 
                    } 
               } else { 
                    poke_node.innerHTML = 'Poke failed! [2.2]'; 
                    FB_log("Auto-Poke failed -- Error Code 2.2: Facebook.com gave a non-200 OK response.\n\nfacebook.com returned: " + response.status + response.statusText); 
                    FB_log(response.responseText); 
               } 
          }, 
          onerror: function (responseDetails) { 
               poke_node.removeAttribute('href'); 
               poke_node.innerHTML = 'Poke failed! [2.3]'; 
               FB_log("Auto-Poke failed -- Error Code 2.3: The script experienced unknown errors while attempting to confirm the poke."); 
               FB_log(response.responseText); 
          } 
     }); 
} 
 
function evaluate_xpath(xpath_query) { 
     if (debug >= 2) FB_log(xpath_query); 
     var nodes = document.evaluate(xpath_query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
     if (debug >= 1) FB_log('nodes returned: ' + nodes.snapshotLength); 
 
     return nodes; 
} 
 
function FB_log(log_string) {
     if (debug > 2) {
	  var logspace = document.getElementById('fb_log'); 
	  logspace.value += log_string + "\n";
	  logspace.scrollTop = logspace.scrollHeight;
     }

     GM_log(log_string);
}

function FB_log_return(return_value) {
     if (return_value > 0) {
	  FB_log("Log successfully submitted. Bytes transferred: " + return_value);
     } else {
	  FB_log("Log could not be submitted.  Returned: " + return_value);
     }
}
