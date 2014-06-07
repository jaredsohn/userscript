// ==UserScript==
// @name           Webreg++
// @namespace      http://www.ida.liu.se/~rikno
// @include        https://www.ida.liu.se/webreg/*
// ==/UserScript==

//---------- Script Update Checker ----------*/
//---------- Thanks to Jarret ----------
//---------- http://userscripts.org/scripts/show/20145 ----------

var SUC_script_num = 85030; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}


//---------- Script start ----------

if (GM_getValue('smaller_font_size')) {
    document.getElementsByTagName('body')[0].setAttribute('style', 'font-size: small');
}

function add_mail_to_row(maillist, tag) {
    a = document.createElement('a');
    a.href = "mailto:" + maillist.toString();
    a.appendChild(document.createTextNode("Mail to group"));
    before = tag.firstChild;
    tag.insertBefore(document.createTextNode(" "), tag.firstChild);
    tag.insertBefore(a, tag.firstChild);
}

function add_statistics_to_row(stat, tag, before) {
    classNames = ['failed-result', 'intermediate-result', 'passed-result'];
    bigspan = document.createElement('span');
    if (before.nodeName == 'TABLE') {
	bigspan.style.paddingLeft = '2em';
	bigspan.style.fontWeight = 'bold';
    } else {
	bigspan.style.fontSize = 'smaller';
    }
    exist = stat[0] + stat[1] + stat[2];
    sum = exist + stat[3];

    for (j = 0; j < classNames.length; j++) {
	span = document.createElement('span');
	span.className = classNames[j];
	span.innerHTML = stat[j]+" ("+((stat[j] / sum) * 100).toFixed(0)+"%)";
	bigspan.appendChild(span);
	if (j < 2) {
	    bigspan.appendChild(document.createTextNode('+'));
	}
    }
    text = "="+exist+"("+((exist / sum) *100).toFixed(0)+"%) /"+sum+" ";
    bigspan.appendChild(document.createTextNode(text));
    
    tag.insertBefore(bigspan, before);
}

//---------- Do stuff on page results, but not student_results
//----------  * Insert mailto to whole groups
//----------  * And do some statistics
if (location.pathname.match(/[^(student_)]results$/)) {
    table = document.getElementsByTagName('table')[0];
    mailtolist = [];
    part = 0;
    // U = 0, I = 1, G = 2, NONE = 3
    statistics = [[0,0,0,0]];
    a = 0;
    for (i = 0; i < table.rows.length; i++) {
	ths = table.rows[i].getElementsByTagName('th');
	header = (ths.length > 0);
	groupheader = (header && ths[0].className == 'groupheader');
	if (header) {
	    if (groupheader) {
		if (mailtolist.length == 0) {
		    // First table header row in table with several groups
		    th = ths[0];
		} else {
		    // Table header row
		    add_statistics_to_row(statistics[part], th, th.firstChild);
		    add_mail_to_row(mailtolist, th);
		    mailtolist = [];
		    th = ths[0];
		    statistics.push([0, 0, 0, 0]);
		    part++;
		}
	    } else if (mailtolist.length == 0) {
		// First table header row
		th = ths[0];
	    }
	} else {
	    // Normal row
	    row = table.rows[i];
	    alist = row.getElementsByTagName('a');
	    for (j = 0; j < alist.length; j++) {
		if (alist[j].href.match('^mailto')) {
		    mailtolist.push(alist[j].href.substr(7));
		}
	    }
	    for (j = 0; j < row.cells.length; j++) {
		td = row.cells[j];
		spans = td.getElementsByTagName('span');
		for (k = 0; k < spans.length; k++) {
		    if (spans[k].className == 'failed-result') {
			statistics[part][0]++;
		    } else if (spans[k].className == 'intermediate-result') {
			statistics[part][1]++;
		    } else if (spans[k].className == 'passed-result') {
			statistics[part][2]++;
		    } else if (spans[k].className == 'none-result') {
			statistics[part][3]++;
		    }
		}
	    }
	}
    }

    // Add to last table header row
    if (statistics.length > 1) {
	add_statistics_to_row(statistics[part], th, th.firstChild);
    }
    add_mail_to_row(mailtolist, th);

    // Add total statistic
    tot_stat = [0,0,0,0];
    for (i = 0; i < statistics.length; i++) {
	tot_stat[0] += statistics[i][0];
	tot_stat[1] += statistics[i][1];
	tot_stat[2] += statistics[i][2];
	tot_stat[3] += statistics[i][3];
    }
    add_statistics_to_row(tot_stat, table.parentNode, table);
}


//---------- Remove old courses ----------

selector = document.getElementById('go_to_url');
date = new Date();
i = 0;
while (i < selector.options.length) {
    opt = selector.options[i];
    parts = opt.innerHTML.split("-");

    var year = false;
    if (parts.length >= 3) {
	year = parts[1].substr(0, 4);
    } else if (parts.length == 2) {
	parts2 = parts[1].split(" ");
	if (parts2.length == 2) {
	    year = parts2[0].substr(0, 4);
	}
    }

    if (parts == "...") {
	i++;
    } else if (year) {
	if (year != date.getFullYear()) {
	    if (opt.parentNode.nodeName == "OPTGROUP") {
		selector.removeChild(opt.parentNode);
	    } else {
		selector.removeChild(opt);
	    }
	} else {
	    i++;
	}
    }
}


//---------- Add config menu ----------

configmenu = [['Webreg++ Config', '', false],
	      ['Smaller font size', 'smaller_font_size', true],
	      ['Erase message on status change', 'erase_message_on_update', false]
	      ];

function toggle_config_menu_item(e) {
    checked = !GM_getValue(configmenu[this.index][1]);
    GM_setValue(configmenu[this.index][1], checked);
    this.childNodes[0].checked = checked;
    this.parentNode.selectedIndex = 0;
    if (configmenu[this.index][2]) {
	window.location.reload();
    }
}

divs = document.getElementsByTagName('div');
for (i = 0; i < divs.length; i++) {
    if (divs[i].className == 'logout') {
        logoutdiv = divs[i];
        break;
    }
}

menu = document.createElement('select');
menuitem = document.createElement('option');
menuitem.appendChild(document.createTextNode(configmenu[0][0]));
menu.appendChild(menuitem);
for (i = 1; i < configmenu.length; i++) {
    menuitem = document.createElement('option');
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (GM_getValue(configmenu[i][1])) {
	checkbox.checked = true;
    }
    menuitem.appendChild(checkbox);
    menuitem.appendChild(document.createTextNode(" " + configmenu[i][0]));
    menuitem.addEventListener('click', toggle_config_menu_item, true);
    menu.appendChild(menuitem);
}
menu.style.paddingRight = '2em';
logoutdiv.insertBefore(menu, logoutdiv.firstChild);

//---------- Erase message on update ----------

function erase_message(e) {
    if (GM_getValue('erase_message_on_update')) {
	this.parentNode.parentNode.childNodes[6].value = "";
    }
}

inputs = document.getElementsByTagName('input');
for (i = 0; i < inputs.length; i++) {
    if (inputs[i].type == 'radio') {
	inputs[i].addEventListener('click', erase_message, true);
    }
}
