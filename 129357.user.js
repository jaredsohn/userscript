// ==UserScript==
// @name           WF Message Groups
// @namespace      http://unidomcorp.com
// @description    A script to send messages to groups of players
// @include        http://*.war-facts.com/message.php
// @include        http://*.war-facts.com/bptrade.php?*
// @include        http://*.war-facts.com/sdtrade.php?*
// @version        1.3
// ==/UserScript==

// Version 1.0 = original version
// Version 1.1 = minor patch for H6 by Seko
// Version 1.3 = not so minor fix for FF4+ by Seko (addOption, form.group etc)

/* Greasemonkey 20080112 workaround */
function wrap(f) {
  return function() {
    setTimeout.apply(window, [f, 0].concat([].slice.call(arguments)));
  };
}
/* End of workaround */

// fix for addion options to select box; FF10+
function addOption(selectbox, text, value, defaultSelected, selected) {
  var optn = document.createElement("option");
  optn.text = text;
  optn.value = value;
  if (!value) {
		optn.setAttribute('style','text-decoration: underline;');
  }
  optn.defaultSelected = defaultSelected;
  optn.selected = selected;
  selectbox.options.add(optn);
}

var Groups = new Array();
var GroupKeys = new Array();
//getGroups()
//- Populates the Group object from user preferences (about:config)
unsafeWindow.getGroups = wrap(function() {
	if (GM_getValue('GroupsArray')) {
		Groups = unserialize(GM_getValue('GroupsArray'));
		GroupKeys = new Array();
		for (var i in Groups) GroupKeys.push(i);
	}
});

//saveGroups()
//- Saves the contents of the Group object to user preferences (about:config)
unsafeWindow.saveGroups = wrap(function() {
		GM_setValue('GroupsArray',serialize(Groups));
});

//createGroup()
//- Creates a new group and saves it to user preferences (about:config)
unsafeWindow.createGroup = function() {
	var groupname = prompt("How would you like to refer to this group?");
	if (groupname && Groups[groupname] === undefined) {
		Groups[groupname] = new Array();
		GroupKeys.push(groupname);
		unsafeWindow.saveGroups();
    addOption(document.getElementById('group_menu'),groupname,groupname,false,true);
	}
}

//deleteGroup(group name)
//- Removes the group name from the Groups array and saves it to user preferences (about:config)
// Does not actually delete the individual group array. Groups can be 'undeleted' by manually editing the Groups array.
unsafeWindow.deleteGroup = function(grpname) {
	var temp = new Array();
	for (var i in Groups)  if (i != grpname) temp[i] = Groups[i];
	Groups = temp; temp = undefined;
	unsafeWindow.saveGroups();
	unsafeWindow.displayGroups('manage');
}

//updateGroup(group name,select field)
//- Takes the current members from the select field and saves them to the specified group
unsafeWindow.updateGroup = function(grp,select) {
	var players = new Array();
    var selected = 0;
	for(var i=1; i < select.options.length; i++) {
			players.push(select.options[i].value);
			selected++;
	}

	if (selected) {
		Groups[grp] = players;
		unsafeWindow.saveGroups();
	}
}

//updateGroupList(group name, players_select field, group_select field)
//- Populates the group_select field with members of the specified group
unsafeWindow.updateGroupList = function(grp,plsel,grpsel) {
	if ( grp == '' ) {
		while (grpsel.options.length > 1) grpsel.remove(1);
    return;
  }
	if ( grp == 'new' ) {
		unsafeWindow.createGroup();
		return;
	}
	group = Groups[grp];
  while (grpsel.options.length > 1) grpsel.remove(1);
	for (var i = 0;i<plsel.options.length;i++) {
		if (group.indexOf(plsel.options[i].value) != -1) {
        addOption(grpsel,plsel.options[i].text,plsel.options[i].value);
    }
	}
}

//updatePlayerList(from select field, to select field)
//-Add/Removes players to/from the group_select field
unsafeWindow.updatePlayerList = function(frmsel,tosel) {
	if (frmsel.name != 'group_select') {
      addOption(tosel, frmsel.options[frmsel.selectedIndex].text, frmsel.options[frmsel.selectedIndex].value);
  }
	if (frmsel.name != 'players_select') {
      frmsel.remove(frmsel.selectedIndex);
  }
	frmsel.focus();
}

//displayGroups(current value of selection)
//- Displays group recipients, group management or hides the group module.
// This one needs to be cleaned up a bit
unsafeWindow.displayGroups = function(selection) {
	var groups = document.getElementById('groups');
	// Group selection
	if(selection == "group") {
		// Create the table
		var table = document.createElement('table');
		table.setAttribute('width', '98%');
		var row = document.createElement('tr');
		table.appendChild(row);
		// Get the rows/cells ready
		var rows = 1, cells = 1;
		// multirow is the cell that may span more than 1 row
		var multirow = document.createElement('td');

		// If there are any groups, create a table layout to display them for selection
		if (GroupKeys.length > 0) {
			for (var i = 0, len = GroupKeys.length; i < len; i++) {
				var thiscell = document.createElement('td');
				thiscell.setAttribute('class', 'head');
				var thisgroup = document.createElement('input');
				thisgroup.setAttribute('value',GroupKeys[i]);
				thisgroup.setAttribute('type','checkbox');
				thisgroup.setAttribute('name','group');
				thiscell.appendChild(thisgroup);
				thiscell.appendChild(document.createTextNode(' '+GroupKeys[i]));
				row.appendChild(thiscell);

				if ( i == 2 || ( i == GroupKeys.length-1 && i < 3) ) {
					row.appendChild(multirow);
				}

				if (i == GroupKeys.length-1 && rows > 1 && cells % 3) {
					thiscell = document.createElement('td')
					thiscell.setAttribute('colspan',3-(cells%3));
					thiscell.setAttribute('class','head');
					thiscell.innerHTML = '&nbsp;';
					row.appendChild(thiscell)
				}


				if ( !(cells % 3) ) {
					row = document.createElement('tr');
					table.appendChild(row);
					rows++;
				}

				cells++;
			}
		// Else, tell the user they need to add a group
		} else {
			var thiscell = document.createElement('td');
			thiscell.setAttribute('class', 'head');
			thiscell.innerHTML = 'Please add at least one group.';
			row.appendChild(thiscell);
			row.appendChild(multirow);
		}
		// Buttons etc
		multirow.setAttribute('rowspan',rows); // For some reason, table.rows.length will not work.
		multirow.setAttribute('align','center');
		multirow.setAttribute('valign','center');
		multirow.setAttribute('class', 'head');
		var manage = document.createElement('input');
		manage.setAttribute('type','button');
		manage.setAttribute('class','special');
		manage.setAttribute('value','Manage Groups');
		manage.setAttribute('onclick','displayGroups("manage");');
		multirow.appendChild(manage);
		// if the message textarea doesn't exist, create a div element to display our status.
		if (!document.getElementsByName('message')[0]) {
			var msg = document.createElement('div');
			msg.setAttribute('id','msg_log');
			msg.setAttribute('style','width: 60%;background-color: #5AAFAD;border: thin solid #bac4c6;color: black;font-weight:500;');
			groups.appendChild(msg);
			table.setAttribute('width','60%');
		}
		// This is what makes everything magically appear
		groups.replaceChild(table,groups.childNodes[1]);
		groups.replaceChild(document.createTextNode('Select Recipient(s):'),groups.firstChild);
		groups.style.display = "block";
	}
	// Group Management
	else if(selection == "manage") {
		// Create the table
		var table = document.createElement('table');
		table.setAttribute('width', '98%');
		if (!document.getElementsByName('message')[0]) table.setAttribute('width','60%');
		// Create the row
		var row = document.createElement('tr');
		table.appendChild(row);
		// First cell with list of players and go back link
		var cell1 = document.createElement('td');
		cell1.setAttribute('class','head');
		cell1.setAttribute('width','40%');
		var group_menu = document.createElement('select');
		group_menu.setAttribute('name','group_menu');
		group_menu.setAttribute('id','group_menu');
		group_menu.setAttribute('onchange','updateGroupList(this.value,this.form.players_select,this.form.group_select)');
    addOption(group_menu, 'Select Group or New');
    addOption(group_menu, '-New Group-','new');
		for (var i = 0, len = GroupKeys.length; i < len; i++) {
      addOption(group_menu, GroupKeys[i], GroupKeys[i]);
		}
		cell1.appendChild(group_menu);
		cell1.appendChild(document.createElement('p'));

		var select = document.evaluate("//select[@name='player' or @name='bpplayer' or @name='sdplayer']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
		var players_select = document.createElement('select');
		players_select.setAttribute('size','5');
		players_select.setAttribute('name','players_select');
		players_select.setAttribute('id','players_select');
		for (var i=0;i<select.options.length;i++) {
			if (select.options[i].value == 'empire')  { // Do it here, because we may not always have a 'To Empire'
        addOption(players_select, 'Empire','empire');
			}
			else if (!isNaN(select.options[i].value)) {
        addOption(players_select, select.options[i].text,select.options[i].value);
			}
		}
		cell1.appendChild(players_select);
		cell1.appendChild(document.createElement('br'));
		var goback = document.createElement('a');
		goback.setAttribute('onclick','displayGroups("group")');
		goback.innerHTML = "Go Back".fontsize(1);
		cell1.appendChild(document.createElement('p'));
		cell1.appendChild(goback);

		// Second cell with the magic add/remove buttons
		var cell2 = document.createElement('td');
		cell2.setAttribute('class','head');
		cell2.setAttribute('width','10%');
		cell2.setAttribute('align','center');
		var add = document.createElement('input');
		add.setAttribute('type','button');
		add.setAttribute('style','width:30px;');
		add.setAttribute('value','->');
		add.setAttribute('onclick','updatePlayerList(this.form.players_select,this.form.group_select);');
		cell2.appendChild(add);
		var rem = document.createElement('input');
		rem.setAttribute('type','button');
		rem.setAttribute('style','width:30px;');
		rem.setAttribute('value','<-');
		rem.setAttribute('onclick','updatePlayerList(this.form.group_select,this.form.players_select);');
		cell2.appendChild(rem);

		// Third cell with the group members and save/delete buttons.
		var cell3 = document.createElement('td');
		cell3.setAttribute('class','head');
		cell3.setAttribute('width','40%');
		var group_select = document.createElement('select');
		group_select.setAttribute('size','5');
		group_select.setAttribute('name','group_select');
		group_select.setAttribute('id','group_select');
		group_select.setAttribute('style','width:200px;');
    addOption(group_select, 'Members of this Group');
		cell3.appendChild(group_select);
		var save = document.createElement('input');
		save.setAttribute('type','button');
		save.setAttribute('class','special');
		save.setAttribute('value','Save Group');
		save.setAttribute('style','width:100px;');
		save.setAttribute('onclick','updateGroup(this.form.group_menu.value,this.form.group_select);');
		cell3.appendChild(document.createElement('br'));
		cell3.appendChild(save);
		var del = document.createElement('input');
		del.setAttribute('type','button');
		del.setAttribute('class','warn');
		del.setAttribute('value','Delete Group');
		del.setAttribute('style','width:100px;');
		del.setAttribute('onclick','deleteGroup(this.form.group_menu.value);');
		cell3.appendChild(del);

		// Well, if we don't append these cells to the row, then they are just existing in the twilight zone.
		row.appendChild(cell1);
		row.appendChild(cell2);
		row.appendChild(cell3);

		// This is what makes everything magically appear
		groups.replaceChild(table,groups.childNodes[1]);
		groups.replaceChild(document.createTextNode('Manage Groups:'),groups.firstChild);
		groups.style.display = "block";
	}
	// Else, get rid of all the extra form elements and hide the div.
	else {
		var groups = document.getElementById('groups');
		groups.innerHTML = "<p>I'm Hiding</p><p>Peeky-Boo</p>";
		groups.style.display = "none";
	}
}

//processMessage(the form object)
//- Sends the message/blueprint/ship design to the select player/groups.
// This one is the 'hack job' to make it work properly with all three.
unsafeWindow.processMessage = function(form) {
  var select = document.evaluate("//select[@name='player' or @name='bpplayer' or @name='sdplayer']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
  if (select.value != 'group') form.submit();
  var grElems = document.getElementsByName('group');
  var groups = new Array();
  var checked = 0;
	for(var i=0; i < grElems.length; i++) {
		if(grElems[i].checked) {
			groups.push(grElems[i].value);
			checked++;
		}
	}

	if (checked) {
		var recipients = new Array();
		for(var i=0; i < groups.length; i++) {
			recipients = recipients.concat(Groups[groups[i]]);
		}


		// Remove Duplicates
		recipients = window.removeDups(recipients);
    var msgElem = document.getElementsByName('message')[0]
		for (var i=0; i<recipients.length; i++) {
			var pars = '';
			for (var j=0; j<form.elements.length; j++) {
				if (form.elements[j].name != 'player' && form.elements[j].name != 'bpplayer' && form.elements[j].name != 'sdplayer' && form.elements[j].name != 'message') {
					pars += form.elements[j].name + '=' + encodeURIComponent(form.elements[j].value) + '&';
				}
				if (form.elements[j].name == 'player' || form.elements[j].name == 'bpplayer' || form.elements[j].name == 'sdplayer') {
					pars += form.elements[j].name + '=' + recipients[i] + '&';
				}
				if (form.elements[j].name == 'message') {
					pars += 'message='+encodeURIComponent(msgElem.value+'\n\n[Group Messaging: Message '+(i+1)+' of '+recipients.length+']')+'&';
				}
			}
			sendMessage(recipients[i],pars);
		}
		// We got the data, now lets make things pretty.
		if (msgElem) msgElem.value = '\n\n___________________________Original Message_____________________________\n'+msgElem.value;

	}
}

window.sendMessage = wrap(function(recipient,pars) {

// Send the Message
		GM_xmlhttpRequest({
			method: 'POST',
			url: window.location.href,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				},
			data: pars,
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
				if (text == '') {GM_log('Received a blank page while trying to send a message to '+recipient); sendMessage(recipient,pars); return;} // In case we receive a blank page
				var msg = document.getElementsByName('message')[0];
				msg = msg ? msg : document.getElementById('msg_log');
				var msgtext = text.match(/Your message to .* has been sent!/);
				//GM_log(msgtext)
				var tradetext = text.match(/(You have shared this blueprint with.*)<\/p><p><b>/);
				//GM_log(tradetext)
				var tradehas = text.match(/<p class=info>(.*already has a copy of this blueprint\.)<\/p>/);
				//GM_log(tradehas)
				var sdtext = text.match(/(You have shared this design with.*)<\/p><p><b>/);
				//GM_log(sdtext);
				if (msgtext) { msg.value = msgtext+'\n'+msg.value;}
				if (tradetext) { msg.innerHTML = tradetext[1]+'<br/>'+msg.innerHTML;}
				if (tradehas) { msg.innerHTML = tradehas[1]+'<br/>'+msg.innerHTML;}
				if (sdtext) { msg.innerHTML = sdtext[1]+'<br/>'+msg.innerHTML;}
			}
		});

});

//removeDups(array)
//- Returns an array with duplicates removed
window.removeDups = function(b) {

	var a = new Array();
	for (var i=0; i<b.length; i++) {
		var dup = 1;
		for (var j=0; j<a.length; j++) {
			if (a[j] == b[i]) dup=0;
		}
		if (dup) a.push(b[i]);
	}
	return a;

}

//removeItem(array,string)
//- Returns an array with elements matching string removed
window.removeItem = function(a,b) {

	var c = new Array();
	for (var i=0; i<a.length; i++) {
		if (a[i] != b) c.push(a[i]);
	}
	return c;

}

// onLoad event
// Without this, none of this would even work.
window.addEventListener("load", function() {
	var select = document.evaluate("//select[@name='player' or @name='bpplayer' or @name='sdplayer']", document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext();
	if (!select) return;

	// Add the onsubmit event to the form
	var formObj=document.getElementsByTagName('form')[0];
	formObj.setAttribute('onsubmit','processMessage(this);return false;');

	// Add the onchange event to the select element
	select.setAttribute("onchange", "displayGroups(this.value);");

	// Create the '[Send to Group]' option
	var option = document.createElement('option');
	option.innerHTML = '[Send to Group]';
	option.setAttribute('value','group');

	// Different pages need them inserted at different places
	if (select.name == 'player') select.insertBefore(option, select.childNodes[1]);
	if (select.name == 'bpplayer' || select.name == 'sdplayer') select.insertBefore(option, select.childNodes[2]);

	// Create the groups div
	var groups = document.createElement('div');
	groups.setAttribute('style','display: none;');
	groups.setAttribute('id','groups');
	groups.innerHTML = "<p>I'm Hiding</p><p>Peeky-Boo</p>";

	// Append the groups (div) element to the end of the parent form element of select.
	select.parentNode.appendChild(groups);

  // workaround: since it is in wrap(), its not get called just in time in displayGroups()
  unsafeWindow.getGroups();

}, false);




//
// External Scripts not written by me, but needed here.
//======================================================


/* utf.js - UTF-8 <=> UTF-16 convertion
 *
/* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp> & 2006 Ma Bingyao <andot@ujn.edu.cn>
 * Version: 2.0
 * LastModified: Jun 18, 2006
 * This library is free.  You can redistribute it and/or modify it.
 */

/*
 * Interfaces:
 * utf8 = utf16to8(utf16);
 * utf16 = utf16to8(utf8);
 */

function utf16to8(str) {
    var out, i, j, len, c, c2;
    out = [];
    len = str.length;
    for (i = 0, j = 0; i < len; i++, j++) {
        c = str.charCodeAt(i);
        if (c <= 0x7f) {
            out[j] = str.charAt(i);
        }
        else if (c <= 0x7ff) {
            out[j] = String.fromCharCode(0xc0 | (c >>> 6),
                                         0x80 | (c & 0x3f));
        }
        else if (c < 0xd800 || c > 0xdfff) {
            out[j] = String.fromCharCode(0xe0 | (c >>> 12),
                                         0x80 | ((c >>> 6) & 0x3f),
                                         0x80 | (c & 0x3f));
        }
        else {
            if (++i < len) {
                c2 = str.charCodeAt(i);
                if (c <= 0xdbff && 0xdc00 <= c2 && c2 <= 0xdfff) {
                    c = ((c & 0x03ff) << 10 | (c2 & 0x03ff)) + 0x010000;
                    if (0x010000 <= c && c <= 0x10ffff) {
                        out[j] = String.fromCharCode(0xf0 | ((c >>> 18) & 0x3f),
                                                     0x80 | ((c >>> 12) & 0x3f),
                                                     0x80 | ((c >>> 6) & 0x3f),
                                                     0x80 | (c & 0x3f));
                    }
                    else {
                       out[j] = '?';
                    }
                }
                else {
                    i--;
                    out[j] = '?';
                }
            }
            else {
                i--;
                out[j] = '?';
            }
        }
    }
    return out.join('');
}

function utf8to16(str) {
    var out, i, j, len, c, c2, c3, c4, s;

    out = [];
    len = str.length;
    i = j = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
            // 0xxx xxxx
            out[j++] = str.charAt(i - 1);
            break;
            case 12: case 13:
            // 110x xxxx   10xx xxxx
            c2 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x1f) << 6) |
                                            (c2 & 0x3f));
            break;
            case 14:
            // 1110 xxxx  10xx xxxx  10xx xxxx
            c2 = str.charCodeAt(i++);
            c3 = str.charCodeAt(i++);
            out[j++] = String.fromCharCode(((c  & 0x0f) << 12) |
                                           ((c2 & 0x3f) <<  6) |
                                            (c3 & 0x3f));
            break;
            case 15:
            switch (c & 0xf) {
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
                // 1111 0xxx  10xx xxxx  10xx xxxx  10xx xxxx
                c2 = str.charCodeAt(i++);
                c3 = str.charCodeAt(i++);
                c4 = str.charCodeAt(i++);
                s = ((c  & 0x07) << 18) |
                    ((c2 & 0x3f) << 12) |
                    ((c3 & 0x3f) <<  6) |
                     (c4 & 0x3f) - 0x10000;
                if (0 <= s && s <= 0xfffff) {
                    out[j] = String.fromCharCode(((s >>> 10) & 0x03ff) | 0xd800,
                                                  (s         & 0x03ff) | 0xdc00);
                }
                else {
                    out[j] = '?';
                }
                break;
                case 8: case 9: case 10: case 11:
                // 1111 10xx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=4;
                out[j] = '?';
                break;
                case 12: case 13:
                // 1111 110x  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx  10xx xxxx
                i+=5;
                out[j] = '?';
                break;
            }
        }
        j++;
    }
    return out.join('');
}

/* phpserializer.js - JavaScript to PHP serialize / unserialize class.
 *
 * This class is designed to convert php variables to javascript
 * and javascript variables to php with a php serialize unserialize
 * compatible way.
 *
 * Copyright (C) 2006 Ma Bingyao <andot@ujn.edu.cn>
 * Version: 3.0f
 * LastModified: Nov 30, 2006
 * This library is free.  You can redistribute it and/or modify it.
 * http://www.coolcode.cn/?p=171
 */

function serialize(o) {
    var p = 0, sb = [], ht = [], hv = 1;
    var classname = function(o) {
        if (typeof(o) == "undefined" || typeof(o.constructor) == "undefined") return '';
        var c = o.constructor.toString();
        c = utf16to8(c.substr(0, c.indexOf('(')).replace(/(^\s*function\s*)|(\s*$)/ig, ''));
        return ((c == '') ? 'Object' : c);
    };
    var is_int = function(n) {
        var s = n.toString(), l = s.length;
        if (l > 11) return false;
        for (var i = (s.charAt(0) == '-') ? 1 : 0; i < l; i++) {
            switch (s.charAt(i)) {
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9': break;
                default : return false;
            }
        }
        return !(n < -2147483648 || n > 2147483647);
    };
    var in_ht = function(o) {
        for (k in ht) if (ht[k] === o) return k;
        return false;
    };
    var ser_null = function() {
        sb[p++] = 'N;';
    };
    var ser_boolean = function(b) {
        sb[p++] = (b ? 'b:1;' : 'b:0;');
    };
    var ser_integer = function(i) {
        sb[p++] = 'i:' + i + ';';
    };
    var ser_double = function(d) {
        if (isNaN(d)) d = 'NAN';
        else if (d == Number.POSITIVE_INFINITY) d = 'INF';
        else if (d == Number.NEGATIVE_INFINITY) d = '-INF';
        sb[p++] = 'd:' + d + ';';
    };
    var ser_string = function(s) {
        var utf8 = utf16to8(s);
        sb[p++] = 's:' + utf8.length + ':"';
        sb[p++] = utf8;
        sb[p++] = '";';
    };
    var ser_array = function(a) {
        sb[p++] = 'a:';
        var lp = p;
        sb[p++] = 0;
        sb[p++] = ':{';
        for (var k in a) {
            if (typeof(a[k]) != 'function') {
                is_int(k) ? ser_integer(k) : ser_string(k);
                __serialize(a[k]);
                sb[lp]++;
            }
        }
        sb[p++] = '}';
    };
    var ser_object = function(o) {
        var cn = classname(o);
        if (cn == '') ser_null();
        else if (typeof(o.serialize) != 'function') {
            sb[p++] = 'O:' + cn.length + ':"';
            sb[p++] = cn;
            sb[p++] = '":';
            var lp = p;
            sb[p++] = 0;
            sb[p++] = ':{';
            if (typeof(o.__sleep) == 'function') {
                var a = o.__sleep();
                for (var kk in a) {
                    ser_string(a[kk]);
                    __serialize(o[a[kk]]);
                    sb[lp]++;
                }
            }
            else {
                for (var k in o) {
                    if (typeof(o[k]) != 'function') {
                        ser_string(k);
                        __serialize(o[k]);
                        sb[lp]++;
                    }
                }
            }
            sb[p++] = '}';
        }
        else {
            var cs = o.serialize();
            sb[p++] = 'C:' + cn.length + ':"';
            sb[p++] = cn;
            sb[p++] = '":' + cs.length + ':{';
            sb[p++] = cs;
            sb[p++] = "}";
        }
    };
    var ser_pointref = function(R) {
        sb[p++] = "R:" + R + ";";
    };
    var ser_ref = function(r) {
        sb[p++] = "r:" + r + ";";
    };
    var __serialize = function(o) {
        if (o == null || o.constructor == Function) {
            hv++;
            ser_null();
        }
        else switch (o.constructor) {
            case Boolean: {
                hv++;
                ser_boolean(o);
                break;
            }
            case Number: {
                hv++;
                is_int(o) ? ser_integer(o) : ser_double(o);
                break;
            }
            case String: {
                hv++;
                ser_string(o);
                break;
            }
/*@cc_on @*/
/*@if (@_jscript)
            case VBArray: {
                o = o.toArray();
            }
@end @*/
            case Array: {
                var r = in_ht(o);
                if (r) {
                    ser_pointref(r);
                }
                else {
                    ht[hv++] = o;
                    ser_array(o);
                }
                break;
            }
            default: {
                var r = in_ht(o);
                if (r) {
                    hv++;
                    ser_ref(r);
                }
                else {
                    ht[hv++] = o;
                    ser_object(o);
                }
                break;
            }
        }
    };
    __serialize(o);
    return sb.join('');
}

function unserialize(ss) {
    var p = 0, ht = [], hv = 1; r = null;
    var unser_null = function() {
        p++;
        return null;
    };
    var unser_boolean = function() {
        p++;
        var b = (ss.charAt(p++) == '1');
        p++;
        return b;
    };
    var unser_integer = function() {
        p++;
        var i = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
        p++;
        return i;
    };
    var unser_double = function() {
        p++;
        var d = ss.substring(p, p = ss.indexOf(';', p));
        switch (d) {
            case 'NAN': d = NaN; break;
            case 'INF': d = Number.POSITIVE_INFINITY; break;
            case '-INF': d = Number.NEGATIVE_INFINITY; break;
            default: d = parseFloat(d);
        }
        p++;
        return d;
    };
    var unser_string = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var s = utf8to16(ss.substring(p, p += l));
        p += 2;
        return s;
    };
    var unser_array = function() {
        p++;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var a = [];
        ht[hv++] = a;
        for (var i = 0; i < n; i++) {
            var k;
            switch (ss.charAt(p++)) {
                case 'i': k = unser_integer(); break;
                case 's': k = unser_string(); break;
                case 'U': k = unser_unicode_string(); break;
                default: return false;
            }
            a[k] = __unserialize();
        }
        p++;
        return a;
    };
    var unser_object = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var cn = utf8to16(ss.substring(p, p += l));
        p += 2;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
            eval(['function ', cn, '(){}'].join(''));
        }
        var o = eval(['new ', cn, '()'].join(''));
        ht[hv++] = o;
        for (var i = 0; i < n; i++) {
            var k;
            switch (ss.charAt(p++)) {
                case 's': k = unser_string(); break;
                case 'U': k = unser_unicode_string(); break;
                default: return false;
            }
            if (k.charAt(0) == '\0') {
                k = k.substring(k.indexOf('\0', 1) + 1, k.length);
            }
            o[k] = __unserialize();
        }
        p++;
        if (typeof(o.__wakeup) == 'function') o.__wakeup();
        return o;
    };
    var unser_custom_object = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var cn = utf8to16(ss.substring(p, p += l));
        p += 2;
        var n = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        if (eval(['typeof(', cn, ') == "undefined"'].join(''))) {
            eval(['function ', cn, '(){}'].join(''));
        }
        var o = eval(['new ', cn, '()'].join(''));
        ht[hv++] = o;
        if (typeof(o.unserialize) != 'function') p += n;
        else o.unserialize(ss.substring(p, p += n));
        p++;
        return o;
    };
    var unser_unicode_string = function() {
        p++;
        var l = parseInt(ss.substring(p, p = ss.indexOf(':', p)));
        p += 2;
        var sb = [];
        for (var i = 0; i < l; i++) {
            if ((sb[i] = ss.charAt(p++)) == '\\') {
                sb[i] = String.fromCharCode(parseInt(ss.substring(p, p += 4), 16));
            }
        }
        p += 2;
        return sb.join('');
    };
    var unser_ref = function() {
        p++;
        var r = parseInt(ss.substring(p, p = ss.indexOf(';', p)));
        p++;
        return ht[r];
    };
    var __unserialize = function() {
        switch (ss.charAt(p++)) {
            case 'N': return ht[hv++] = unser_null();
            case 'b': return ht[hv++] = unser_boolean();
            case 'i': return ht[hv++] = unser_integer();
            case 'd': return ht[hv++] = unser_double();
            case 's': return ht[hv++] = unser_string();
            case 'U': return ht[hv++] = unser_unicode_string();
            case 'r': return ht[hv++] = unser_ref();
            case 'a': return unser_array();
            case 'O': return unser_object();
            case 'C': return unser_custom_object();
            case 'R': return unser_ref();
            default: return false;
        }
    };
    return __unserialize();
}
