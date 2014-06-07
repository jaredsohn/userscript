// ==UserScript==

// @name           Userscripts.org Script Manager 

// @namespace      http://azrael.awardspace.co.uk/

// @description    Add more buttons to the 'Your Scripts' page.

// @include        http://*userscripts.org/users/*;scripts

// ==/UserScript==


GM_addStyle(' \n\
#edit {display: block; float: right;} \n\
#edit a:link, #edit a:visited {text-decoration: none; border: 1px solid #fff; padding: 3px 10px 3px 10px; background: #fff;} \n\
#edit a:hover, #edit a:active {border-left: 1px solid #ddd; border-top: 1px solid #ddd; border-bottom: 1px solid #999; border-right: 1px solid #999;} \n\
.delete:hover {background: #c00 !important; color: #fff; border-left: 1px solid #f00; border-top: 1px solid #f00; border-bottom: 1px solid #900; border-right: 1px solid #900;} \
')

if (document.getElementById('content').getElementsByTagName('h1')[0].innerHTML == 'Your Scripts') {
	scripts = document.getElementById('content').getElementsByTagName('table')[0].getElementsByTagName('a');
	for (i=0; i < scripts.length; i=i+4) {
		if (scripts[i].innerHTML != ' [edit] ') {
			edit = document.createElement('span');
			edit.id = "edit";
			edithref = scripts[i].href.replace('show','edit');
			esrchref = scripts[i].href.replace('show','edit_src');
			delhref  = scripts[i].href.replace('show','delete');
			edit.innerHTML = '<a href="'+edithref+'">edit</a>';
			edit.innerHTML+= '<a href="'+esrchref+'">edit src</a>';
			edit.innerHTML+= '<a href="'+delhref +'" onclick="if (confirm(\'Are you sure you want to remove this script from the repository?\')) { var f = document.createElement(\'form\'); f.style.display = \'none\'; this.parentNode.appendChild(f); f.method = \'POST\'; f.action = this.href;f.submit(); };return false;" class="delete">delete</a>';
			scripts[i].parentNode.insertBefore(edit,scripts[i]);
}	}	}
