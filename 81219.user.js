// ==UserScript==
// @name           PassThePopcorn - new button
// @namespace      http://notsecret.dyndns.org
// @description    Add a new button to the browse page and tag all uploads since the last time this button has been pressed as "New"
// @author         p4lindromica
// @include	       http://*passthepopcorn.me/torrents.php*
// @include        https://*passthepopcorn.me/torrents.php*
// @exclude	       http://*passthepopcorn.me/torrents.php?id=*
// @exclude        https://*passthepopcorn.me/torrents.php?id=*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
//
// @date          07/26/2009
// @version       0.3
// @since         07/25/2009
// ==/UserScript==
//
// THIS SCRIPT WILL HAVE TO BE UPDATED ONCE THERE ARE MOVIES THAT HAVE BEEN UPLOADED OVER ONE YEAR AGO
// I DO NOT KNOW HOW I WILL NEED TO PARSE THE TIMES
//
// CHANGELOG
// 0.4 - 07/26/2009 - modified includes: now works on search pages
// 0.3 - 07/26/2009 - removed alerts
// 0.2 - 07/25/2009 - added button near searching in addition to menu command
// 0.1 - 07/25/2009 - first version of script

// conversion to ms array
var conv = new Array();
conv['minutes'] = conv['minute'] = 60000;
conv['hours'] = conv['hour'] = 3600000;
conv['days'] = conv['day'] = 86400000;
conv['weeks'] = conv['week'] = 604800000;
conv['months'] = conv['month'] = conv['day'] * 30;


/* time format
Just now
27 minutes
1 hour and 18 minutes
1 day and 11 minutes
1 day, 1 hour
1 week and 33 minutes
1 week, 1 hour
1 month and 52 minutes
1 month, 1 hour
*/

// returns absolute time in ms based on a relative time in the above format
function parse_time(rel_time, now) {
  var pt1, pt2;
  
  // just now
  var match = rel_time.match(/^just now/i);
  if (match)
    return now;
  // only minutes
  match = rel_time.match(/^(..?) minute/i);
  if (match)
    return now - 60000 * match[1];
  // separated by and
  match = rel_time.match(/^(.*) and (.*)$/i);
  if (match)
  {
    pt1 = match[1];
    pt2 = match[2];
    
    // parse 1st part
    match = pt1.match(/(..?) (minutes?|hours?|days?|weeks?|months?)/)
    pt1 = match[1] * conv[match[2]];
    
    // parse 2nd part
    match = pt2.match(/(..?) (minutes?|hours?|days?|weeks?|months?)/)
    pt2 = match[1] * conv[match[2]];
    return now - (pt1+pt2);
  }
  // separated by comma
  match = rel_time.match(/^(.*), (.*)$/i);
  if (match)
  {
    pt1 = match[1];
    pt2 = match[2];
    
    // parse 1st part
    match = pt1.match(/(..?) (minutes?|hours?|days?|weeks?|months?)/)
    pt1 = match[1] * conv[match[2]];
    
    // parse 2nd part
    match = pt2.match(/(..?) (minutes?|hours?|days?|weeks?|months?)/)
    pt2 = match[1] * conv[match[2]];
    
    return now - (pt1+pt2);
  }
  // only 1 unit
  match = rel_time.match(/(..?) (minutes?|hours?|days?|weeks?|months?)/)
  if (match)
    return now - (match[1] * conv[match[2]]);
  // if all else fails
  else
    return 0;
}

var now = new Date();
now = now.getTime()



$('#torrent_table .group td.nobr:even').each(function(){

  if (parse_time($(this).html(), now) > GM_getValue('last_new', 0))
    $(this).html($(this).html() + ' <span style="color: orange; font-weight: bold;">(New)</span>')
})

$('#torrent_table .group_torrent td.nobr:even').each(function(){

  if (parse_time($(this).html(), now) > GM_getValue('last_new', 0))
    $(this).html($(this).html() + ' <div style="color: orange; font-weight: bold; display: inline;">(New)</span>')
});

GM_registerMenuCommand('New btn: I\'ve seen the (New) torrents', update_time);

function update_time() {
  GM_setValue('last_new', now + '');
  location.reload(true);
}

// utility fn
function insertAfter(newElement,targetElement) {
  //target is what you want it to go after. Look for this elements parent.
  var parent = targetElement.parentNode;
  
  //if the parents lastchild is the targetElement...
  if(parent.lastchild == targetElement) {
    //add the newElement after the target element.
    parent.appendChild(newElement);
    } else {
    // else the target has siblings, insert the new element between the target and it's next sibling.
    parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

$('input[type="button"]').attr('id', 'lastbtn')

var btn = document.createElement('span');
btn.style.marginLeft = '5px';
btn.id = "btn";
// insert new div into DOM
insertAfter(btn, document.getElementById('lastbtn'));

unsafeWindow.update = function() {
  window.setTimeout(GM_setValue, 0, "last_new", now +"");
  location.reload(true);
};

btn.innerHTML = '<input style="color: orange; font-weight: bold;" type="button" onclick="update();" value="Reset new">'
