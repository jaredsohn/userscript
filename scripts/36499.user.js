// ==UserScript==
// @name           LJ oldstyles
// @author				 Shifuimam
// @namespace      
// @description    Brings back the ability to use the two now-defunct styles on Livejournal.com (Xcolibur and Dystopia)
// @include        http://www.livejournal.com/manage/settings/index2.bml?cat=display
// ==/UserScript==
var foo = document.getElementsByClassName('display_option');
var dlab = document.getElementsByClassName('display_label');

for(i = 0; i < dlab.length; i++) {
	if(dlab[i].innerHTML.indexOf('Site Scheme') != -1) {
		var x = i;
	}
}

var bar = foo[x].getElementsByTagName('input');
if(foo[x].innerHTML.indexOf('dystopia') != -1) {
	var foobar = bar[bar.length - 2];
} else {
	var foobar = bar[bar.length - 1];
}

if(foo[x].innerHTML.indexOf('xcolibur') == -1) {	
	omg = document.createElement('span');
	var wtf = '<input id="LJ__Setting__SiteScheme_sitescheme_xcolibur" type="radio" name="LJ__Setting__SiteScheme_sitescheme" value="xcolibur" /><label class="radiotext" for="LJ__Setting__SiteScheme_sitescheme_xcolibur">Xcolibur</label>';
	omg.innerHTML = wtf;
	foo[x].insertBefore(omg, foobar);
}
                                           
if(foo[x].innerHTML.indexOf('dystopia') == -1) {
	omg = document.createElement('span');
	var wtf = '<input id="LJ__Setting__SiteScheme_sitescheme_dystopia" type="radio" name="LJ__Setting__SiteScheme_sitescheme" value="dystopia" /><label class="radiotext" for="LJ__Setting__SiteScheme_sitescheme_dystopia">Dystopia</label>';
	omg.innerHTML = wtf;
	foo[x].insertBefore(omg, foobar);
}