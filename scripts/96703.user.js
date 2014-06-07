// ==UserScript==
// @name           Trac Timeline Changeset Display
// @namespace      http://daryl.learnhouston.com/trac-changeset-display
// @description    Finds trac changesets in the timeline and displays in a clean view at the top of the screen.
// @include        http*://*trac*/timeline
// ==/UserScript==

try{

gm_trac_js = "function gm_trac_toggle(){" + 
"  current = document.getElementById('gm_trac_div_content').getAttribute('style');\n" +
"  new_state = current == 'display: none;' ? 'display: block;' : 'display: none;';\n" +
"  document.getElementById('gm_trac_div_content').setAttribute('style', new_state);\n\n" +
"  new_toggle_state = document.getElementById('gm_trac_nav_toggle').innerHTML == 'Show condensed change notes' ? 'Hide condensed change notes' : 'Show condensed change notes'\n" +
"  document.getElementById('gm_trac_nav_toggle').innerHTML = new_toggle_state;" +
"}";

gm_trac_js_element = document.createElement('script');
gm_trac_js_element.setAttribute('type', 'text/javascript');
gm_trac_js_element.innerHTML = gm_trac_js;


gm_trac_dd = document.getElementsByTagName('dd');

gm_trac_div = document.createElement('div');
gm_trac_div.setAttribute('id', 'gm_changesets');
gm_trac_div.setAttribute('style', 'border: 2px solid #000;');


gm_trac_div_content = document.createElement('div');
gm_trac_div_content.setAttribute('id', 'gm_trac_div_content');
gm_trac_div_content.setAttribute('style', 'display: none;');

gm_trac_nav = document.createElement('div');
gm_trac_nav.setAttribute('id', 'gm_trac_nav');
gm_trac_nav.innerHTML ='<a id="gm_trac_nav_toggle" href="javascript:gm_trac_toggle()">Show condensed change notes</a>';

for(i = 0; i < gm_trac_dd.length; i++){
        if(gm_trac_dd[i].getAttribute('class') == 'changeset'){
		elm = gm_trac_dd[i].cloneNode(true);
		gm_trac_div_content.appendChild(elm);
        }
}

gm_trac_div.appendChild(gm_trac_nav);
gm_trac_div.appendChild(gm_trac_div_content);

gm_trac_content = document.getElementById('content');
gm_trac_content.insertBefore(gm_trac_div, gm_trac_content.firstChild);
gm_trac_content.insertBefore(gm_trac_js_element, gm_trac_content.firstChild);

} catch(e){ alert(e)}






