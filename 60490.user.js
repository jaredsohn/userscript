// ==UserScript==
// @name           RTM 4X Redesign
// @namespace      http://superrush.blog65.fc2.com/
// @version        1.1
// @description    
// @include        http://www.rememberthemilk.com/home/*
// @include        https://www.rememberthemilk.com/home/*
// ==/UserScript==
/**
 * css redesign
 */
(function(d, h, ss) {

	d.title = 'Remember The Milk (Redesign)';

	ss = d.createElement('style');
	ss.type ='text/css';

	/* logo */
	ss.appendChild(d.createTextNode('#appheaderlogo {background: none !important; height: 2em !important;}'));
	ss.appendChild(d.createTextNode('#appheaderlogo:after {content: "Remember The Milk" !important; font-size: 131% !important; font-weight: bold !important;}'));

	/* name */
	ss.appendChild(d.createTextNode('#personName {display: none !important;}'));

	/* header */
	ss.appendChild(d.createTextNode('#searchbox {padding-top: 2px !important;}'));
	ss.appendChild(d.createTextNode('#searchbox div {margin-left: 10px !important;}'));
	ss.appendChild(d.createTextNode('#listFilter {width: 450px !important;}'));
	ss.appendChild(d.createTextNode('#searchtogglewrap {width: auto !important;}'));
	ss.appendChild(d.createTextNode('#statusbox {height: 3.2em !important; padding-top: 10px !important;}'));
	ss.appendChild(d.createTextNode('#break {padding: 0 !important; line-height: 0 !important;}'));

	/* smartlist */
	ss.appendChild(d.createTextNode('.xtabs .xtab_smartlist {background: transparent url(/img/left_white.png) no-repeat scroll left top !important; background-position: 0 -150px !important;}'));
	ss.appendChild(d.createTextNode('.xtabs .xtab_smartlist a{background: transparent url(/img/right_white.png) no-repeat scroll right top !important; background-position: 100% -150px !important; color: #999 !important;}'));

	/* task */
	ss.appendChild(d.createTextNode('#add-box {border-top: none !important;}'));
	ss.appendChild(d.createTextNode('.col_date {width: 50px !important;}'));
	ss.appendChild(d.createTextNode('.xtd_task_name {font-size: 93% !important; padding-right: 10px !important;}'));
	ss.appendChild(d.createTextNode('.xtd_tag {float: right !important; font-size: 93% !important; padding: 0 !important; color: #000 !important;}'));
	ss.appendChild(d.createTextNode('.xtd_date {font-size: 77% !important; padding: 0 !important;}'));
	ss.appendChild(d.createTextNode('.taskduetoday {color: green !important;}'));
	ss.appendChild(d.createTextNode('.taskoverdue {color: #c33 !important; text-decoration: none !important;}'));
/*
	ss.appendChild(d.createTextNode('.prio1 {background-color: #ff3333 !important;}'));
	ss.appendChild(d.createTextNode('.prio2 {background-color: #ff9933 !important;}'));
	ss.appendChild(d.createTextNode('.prio3 {background-color: #359AFF !important;}'));
*/

	/* detailsbox */
	ss.appendChild(d.createTextNode('#detailsbox{top: 0 !important;}'));

	/* note */
	ss.appendChild(d.createTextNode('#listbox {width: 470px !important;}'));
	ss.appendChild(d.createTextNode('#list {width: 470px !important;}'));
	ss.appendChild(d.createTextNode('#detailsbox {width: 495px !important;}'));
	ss.appendChild(d.createTextNode('#details {width: 495px !important;}'));
	ss.appendChild(d.createTextNode('#detailsoverflow {height: 100% !important;}'));
	ss.appendChild(d.createTextNode('#detailswrap {width: 493px !important;}'));
	ss.appendChild(d.createTextNode('#detailsoverflow.has-overflow .notewidth {width: 436px !important;}'));
	ss.appendChild(d.createTextNode('.notextitle {color: green !important; margin-bottom: 10px !important;}'));
	ss.appendChild(d.createTextNode('.notewidth {width: 436px !important;}'));
	ss.appendChild(d.createTextNode('.notexedit textarea {padding-left: 3px !important;}'));
	ss.appendChild(d.createTextNode('.notextext {width: 436px !important; font-family: "MS Gothic" !important; line-height: 1.3 !important; margin-bottom: 10px !important;}'));
	ss.appendChild(d.createTextNode('.notextimestamp {margin-left: 230px !important;}'));
	ss.appendChild(d.createTextNode('.taskcloudbox {width: 495px !important;}'));
	ss.appendChild(d.createTextNode('#keywrap {width: 493px !important;}'));

	h.appendChild(ss);

})(document, document.getElementsByTagName('head')[0]);

/**
 * clear condition
 */
(function(d, e, a, dv) {

	a = d.createElement('a');
	a.href = '#';
	a.style.cssText = 'margin-right: 5px;';
	a.appendChild(d.createTextNode('clear'));
	a.addEventListener('click', function() {
		e = d.getElementById('listFilter');
		e.value = '';
		e.focus();
	}, false);
	dv = d.getElementById('searchtogglewrap');
	dv.insertBefore(a, dv.firstChild);

})(document);

/**
 * add condition "noteContains:"
 */
(function(d, e, a, dv) {

	a = d.createElement('a');
	a.href = '#';
	a.style.cssText = 'margin-right: 5px;';
	a.appendChild(d.createTextNode('noteContains:'));
	a.addEventListener('click', function() {
		e = d.getElementById('listFilter');
		e.value = 'noteContains:';
		e.focus();
		e.setSelectionRange(e.value.length, e.value.length);
	}, false);

	dv = d.getElementById('searchtogglewrap');
	dv.insertBefore(a, dv.firstChild);

})(document);

/**
 * memo sort button
 */
(function(d, e, i, ar, nd, id, bt, dv) {

	bt = d.createElement('input');
	bt.type = 'button';
	bt.value = 'sort';
	bt.addEventListener('click', function() {
		ar = new Array();
		e = d.getElementById('notes');
		for (i = 0; e.childNodes.length > i; i++) {
			nd = e.childNodes.item(i);
			if (nd.nodeType == 1) {
				ar.push(nd.firstChild.firstChild.textContent + '||' + nd.id);
			}
		}
		ar.sort().reverse();
		for (i = 0; ar.length > i; i++) {
			id = ar[i].split('||');
			e.insertBefore(d.getElementById(id[1]), e.firstChild);
		}
	}, false);

	dv = d.getElementById('notesbox');
	dv.insertBefore(bt, dv.firstChild);

})(document);
