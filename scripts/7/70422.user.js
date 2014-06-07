// ==UserScript==
// @name           gc.se++
// @namespace      http://www.rikard.nordin.pp.se
// @include        http://www.geocaching.se/forum/*
// ==/UserScript==

//---------- Script Update Checker ----------
//---------- Thanks to Jarret ----------
//---------- http://userscripts.org/scripts/show/20145 ----------

var SUC_script_num = 70422; // Change this to the number given to the script by userscripts.org (check the address bar)

try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}

//---------- Script start ----------

function run_select_open_new_window() {

    if (GM_getValue('select_open_new_window')) {
	
	pagecontent = document.getElementById('pagecontent');

	if (pagecontent) {
	    postbodies = pagecontent.getElementsByTagName('div');
	    for (var i = 0; i < postbodies.length; i++) {
		if (postbodies[i].className.match('postbody')) {
		    atags = postbodies[i].getElementsByTagName('a');
		    for (var j = 0; j < atags.length; j++) {
			atags[j].target = '_blank';
		    }
		}
	    }
	}
    }
}

function update_select_open_new_window(event) {
    GM_setValue('select_open_new_window', this.checked);
}

function update_keep_menubar_at_top(event) {
    GM_setValue('keep_menubar_at_top', this.checked);
}

function show_preferences_panel(event) {
    ul = li.parentNode;
    ulchildren = ul.getElementsByTagName('li');

    links = ['http://www.geocaching.se/forum/ucp.php?i=prefs&mode=personal',
	     'http://www.geocaching.se/forum/ucp.php?i=prefs&mode=post',
	     'http://www.geocaching.se/forum/ucp.php?i=prefs&mode=view'];

    for (i = 0; i < links.length; i++) {
	li = ulchildren[i];
	a = document.createElement('a');
	a.href = links[i];
	a.appendChild(li.childNodes[1].firstChild);
	li.removeChild(li.lastChild);
	li.appendChild(a);
    }

    li = this.parentNode;
    b = document.createElement('b');
    b.appendChild(this.firstChild);
    li.appendChild(b);

    //---------- Fill form ----------
    
    form = document.getElementById('ucp');

    div = form.getElementsByTagName('div')[0].firstChild.firstChild.firstChild;
    div.removeChild(div.firstChild);
    div.appendChild(document.createTextNode('Ändra inställningar för gc.se++'));
    
    tbody = form.getElementsByTagName('tbody')[0];
    lastrow = tbody.rows[tbody.rows.length - 1];
    while(tbody.rows[0] != lastrow) {
	tbody.removeChild(tbody.rows[0]);
    }
    buttons = lastrow.getElementsByTagName('input');
    while (buttons.length > 0) {
	lastrow.cells[0].removeChild(buttons[0]);
    }
    lastrow.cells[0].appendChild(document.createTextNode('(Ändringarna sparas automatiskt)'));

    options = [['Öppna länkar i nya fönster', 'select_open_new_window', update_select_open_new_window],
	       ['Behåll menyraden överst på skärmen', 'keep_menubar_at_top', update_keep_menubar_at_top]
	      ];
    
    for(i = 0; i < options.length; i++) {
	opt_text = options[i][0];
	gm_value = options[i][1];
	opt_func = options[i][2];
	
	tr = document.createElement('tr');
	
	td = document.createElement('td');
	td.className = 'row1';
	td.width = '50%';
	
	b = document.createElement('b');
	b.className = 'genmed';
	b.appendChild(document.createTextNode(opt_text));
	td.appendChild(b);
	tr.appendChild(td);

	td = document.createElement('td');
	td.className = 'row2';
    
	cb = document.createElement('input');
	cb.setAttribute('type', 'checkbox');
	cb.addEventListener('change', opt_func, true);
	if (GM_getValue(gm_value)) {
	    cb.checked = true;
	}
	td.appendChild(cb);
	tr.appendChild(td);
	
	tbody.insertBefore(tr, lastrow);
    }
}

function open_unread_threads(number) {
    taggar = document.getElementsByTagName("a");
    lankar = [];
    for(i = 0; i < taggar.length; i++) {
	min_href = taggar[i].getAttribute('href');
	if (min_href != null && min_href.match("unread$") == "unread") {
	    lankar.push(min_href);
	}
    }
    
    open_no = GM_getValue('open_unread_threads_no');
    if (open_no == null || open_no == 0) {
	from = 0;
    } else {
	from = lankar.length - open_no;
	if (from < 0) {
	    from = 0;
	}
    }
    for(i = from; i < lankar.length; i++) {
	window.open(lankar[i]);
    }
}

function select_open_unread_threads_no(e) {
    GM_setValue('open_unread_threads_no', this.value);
}

function create_select_box(options, values, func, variable) {
    selectbox = document.createElement('select');
    selected = 0;
    if (variable != null) {
	v = GM_getValue(variable);
	if (v != null) {
	    selected = v;
	}
    }
    
    for (i = 0; i < options.length; i++) {
	option = document.createElement('option');
	if (values == null) {
	    option.value = i;
	} else {
	    option.value = values[i];
	}
	if (func != null) {
	    option.addEventListener('click', func, true);
	}
	if (option.value == v) {
	    option.selected = 'selected';
	}    
	option.innerHTML = options[i];
	selectbox.appendChild(option);
    }
    return selectbox;
}

tab = document.getElementById('contentrow').getElementsByTagName('table');
td = tab[0].getElementsByTagName('td')[0];

td.appendChild(document.createTextNode(' | '));
newa = document.createElement('a');

newa.addEventListener('click', open_unread_threads, true);
newa.setAttribute('href', '');
newa.appendChild(document.createTextNode('Öppna'));
td.appendChild(newa);

selectbox = create_select_box(['Alla', '5', '10', '20', '30', '40'],
			      [0, 5, 10, 20, 30, 40],
			      select_open_unread_threads_no,
			      'open_unread_threads_no');
td.appendChild(selectbox);
td.appendChild(document.createTextNode(' olästa trådar'));

if (window.location.href.match("^http://www.geocaching.se/forum/ucp.php\\?i=pref") ||
    window.location.href == "http://www.geocaching.se/forum/ucp.php?i=165") {
    ucp_left = document.getElementById('ucp-left');
    ul = ucp_left.getElementsByTagName('ul')[0];
    li = document.createElement('li');
    a = document.createElement('a');
    a.addEventListener('click', show_preferences_panel, true);
    a.appendChild(document.createTextNode('Ändra inställningar för gc.se++'));
    a.style.cursor = 'pointer';
    li.appendChild(document.createTextNode('» '));
    li.appendChild(a);
    ul.appendChild(li);
}
    
if (tab.length == 6) {
    tab[5].parentNode.insertBefore(tab[0].cloneNode(true), tab[5]);
} else {
    tab[6].parentNode.insertBefore(tab[0].cloneNode(true), tab[6]);
}

run_select_open_new_window();

if (GM_getValue('keep_menubar_at_top')) {
    topbar = document.getElementById('top');
    topbar.style.marginTop = '40px';
    navbar = document.getElementById('navigation');
    navbar.style.position = 'fixed';
    navbar.style.top = '0px';
    navbar.style.left = '0px';
    navbar.style.width = '100%';
    if (window.location.href.match("&view=unread#unread$")) {
	window.scrollBy(0, -80);
    }
}
