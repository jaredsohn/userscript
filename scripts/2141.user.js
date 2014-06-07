// LJ Friend-Of Unhide
// Gavri Fernandez (gavri dot fernandez at gmail dot com)
// Homepage: http://www.livejournal.com/users/ga_woo/
//
// ------------x--------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          	LJ Friend-Of Unhide
// @description		This scripts restores the Friend-of info in profiles of LJers who have chosen to hide them.
// @include      	http://*.livejournal.com/profile
// @include      	http://*.livejournal.com/profile?mode=full
// @include             http://users.livejournal.com/*/profile
// @namespace           http://www.livejournal.com/users/ga_woo/
// ==/UserScript==
//XCalibur
if (document.evaluate(
		      "//div[contains(@id, 'Content')]/div/table/tbody/tr/td/b[contains(., 'Friend of')]",
		      document, 
		      null,
		      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		      null).snapshotLength != 0) return;
//Dystopia
if (document.evaluate(
                      "/html/body/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/b[contains(., 'Friend of')]",
                      document,
                      null,
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                      null).snapshotLength != 0) return;
//Lynx
if (document.evaluate(
                      "/html/body/table/tbody/tr/td/b[contains(., 'Friend of')]",
                      document,
                      null,
                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                      null).snapshotLength != 0) return;

var this_users_friends = new Array();
var other_users_friendofs;
var other_users_friendofs_htmlized;
var one_done;
var after_which_to_insert_possibilities;
//XCalibur
after_which_to_insert_possibilities = document.evaluate(
							    "//div[contains(@id, 'Content')]/div/table/tbody/tr/td/b[contains(., 'Friends') or contains(., 'Mutual Friends')]",
							    document,
							    null,
							    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
							    null);
//Dystopia
if (after_which_to_insert_possibilities.snapshotLength == 0) {
  after_which_to_insert_possibilities = document.evaluate(
                                "/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/b[contains(., 'Friends') or contains(., 'Mutual Friends')]",
                                document,
                                null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
}
//Lynx
if (after_which_to_insert_possibilities.snapshotLength == 0) {
  after_which_to_insert_possibilities = document.evaluate(
                                "/html/body/table/tbody/tr/td/b[contains(., 'Friends') or contains(., 'Mutual Friends')]",
                                document,
                                null,
                                XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                null);
}


var label;
var possibilities_length = after_which_to_insert_possibilities.snapshotLength;
if (possibilities_length > 1) {
  label = 'Also Friend of:';
}
else {
  label = 'Friend of:';
}

var after_which_to_insert = after_which_to_insert_possibilities.snapshotItem(possibilities_length - 1).parentNode.parentNode;

function get_this_user_name() {
  //XCalibur or Dystopia or Lynx or not logged in
  var welcome_name = document.evaluate(
                             "//form[contains(@id, 'Greeting')]/span/a/b",
                             document,
                             null,
                             XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                             null);
  if (welcome_name.snapshotLength != 0) {
    return welcome_name.snapshotItem(0).innerHTML;
  }
  else {//Dystopia or Lynx or not logged in
    var hello_name = document.evaluate(
                              "/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[1]",
                              document,
                              null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
    if (hello_name.snapshotLength != 0) {
      var greeting = hello_name.snapshotItem(0).innerHTML;
      return greeting.substring(7, greeting.length - 1);
        
    }
    else {//Lynx or not logged in
      var recent_entries = document.evaluate(
                              "/html/body/p[3]/a[3]",
                              document,
                              null,
                              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                              null);
      if (recent_entries.snapshotLength != 0) {
        var recent_entries_name = recent_entries.snapshotItem(0).href.substring(7, 13);
        return recent_entries_name;
      }
      else {//Not logged in
        return null;
      }
    }
  }
}
var this_user_name = get_this_user_name();

function get_other_user_name() {
  var username_array = new RegExp("//(.*)\.livejournal\.com").exec(window.location.href);
  return username_array[1];
}

var other_user_name = get_other_user_name();

var this_user_fdata = null;
if (this_user_name) {
  this_user_fdata = 'http://www.livejournal.com/misc/fdata.bml?user=' + this_user_name;
  GM_xmlhttpRequest({
	method: 'GET',
              url: this_user_fdata,
              onload: collect_this_user_data
              });
}
else {
  one_done = true;
}

var other_user_fdata = 'http://www.livejournal.com/misc/fdata.bml?user=' + other_user_name;
GM_xmlhttpRequest({
	method: 'GET',
		  url: other_user_fdata,
		  onload: collect_other_user_data
		  });

function collect_this_user_data(responseDetails) {
  var raw = responseDetails.responseText;
  var lines = raw.split("\n");
   for(var i = 0; i < lines.length; i++) {
     if (lines[i].substr(0, 1) == ">") {
       this_users_friends.push(lines[i].substring(2));
     }
   }
   if (one_done == true) {
     do_it();
   }
   one_done = true;
}

function collect_other_user_data(responseDetails) {
  var raw = responseDetails.responseText;
  var lines = raw.split("\n");
  var other_users_friendofs_set = new Object;
  for(var i = 0; i < lines.length; i++) {
     if (lines[i].substr(0, 1) == "<") {
       other_users_friendofs_set[lines[i].substring(2)] = true;
     }
  }
  
  if (possibilities_length > 1) {
    for(var j = 0; j < lines.length; j++) {
      if (lines[j].substr(0, 1) == ">") {
	delete other_users_friendofs_set[lines[j].substring(2)];
      }
    }
  }
  other_users_friendofs = new Array;
  
  for(var k in other_users_friendofs_set) {
    other_users_friendofs.push(k);
  }  
  
  if (one_done == true) {
    do_it();
  }
  one_done = true;
}

function do_it() {
  this_users_friends.sort();
  other_users_friendofs.sort();
  other_users_friendofs_htmlized = new Array();
  for(var i = 0; i < other_users_friendofs.length; i++) {
    other_users_friendofs_htmlized.push(format(other_users_friendofs[i]));
  }
  if (other_users_friendofs_htmlized.length == 0) return;
  var the = other_users_friendofs_htmlized.join(', ');
  insert_into_page(the);
}

function format(input) {
  var match = false;
  var htmlized = '<a href="http://' + input + '.livejournal.com/profile">' + input + '</a>';
  for (var i = 0; i < this_users_friends.length; i++) {
    if (this_users_friends[i] == input) {
      match = true;
      break;
    }
  }
  if (match) {htmlized = '<b>' + htmlized + '</b>';}
  return htmlized;
}

function insert_into_page(the) {
  var new_node = document.createElement('tr');
  
  var first_column = document.createElement('td');
  first_column.setAttribute('valign', 'top');
  first_column.setAttribute('align', 'right');  
  
  var bold_part = document.createElement('b'); bold_part.setAttribute('style', 'white-space: nowrap;');
  bold_part.appendChild(document.createTextNode(label));
  var italicized_part = document.createElement('i');
  italicized_part.appendChild(document.createTextNode('(Hidden)'));
			
  first_column.appendChild(bold_part);
  first_column.appendChild(document.createElement('br'));
  first_column.appendChild(italicized_part);

  var second_column = document.createElement('td');

  second_column.innerHTML = '<b>' + other_users_friendofs_htmlized.length + ':</b> ' + the;
  
  new_node.appendChild(first_column);
  new_node.appendChild(second_column);  

  after_which_to_insert.parentNode.insertBefore(new_node, after_which_to_insert.nextSibling);
}


