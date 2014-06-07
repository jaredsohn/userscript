// ==UserScript==
// @name    Rouges Gallery Report Tool
// @include http://urbandead.com/map.cgi*
// @include http://www.urbandead.com/map.cgi*
// @include http://iamscott.net/*
// @exclude http://urbandead.com/map.cgi?logout
// @exclude http://www.urbandead.com/map.cgi?logout
// ==/UserScript==

/*
Rouges Gallery Report Tool
Generates PK Reports for the game Urban Dead to the brainstock PK Report Thread.
The author can be contacted on the brainstock forums: http://s1.zetaboards.com/brainstock/profile/781392/
*/

var pk;
var check_rg_n;
var report_finished;
var prefscreen_on;
var picurl;
var savedtool = GM_getValue('tool',false);
var savedpkthread = GM_getValue('pkthread',false);

if (savedtool == false || savedpkthread == false) {
	changescreen('prefscreen_on');
	addbutton();
}
//else if (query("//a[@href='map.cgi?logout' and @class='y']") == false) //No logout button found - player not logged in.
//	return;
else
	addbutton();

function menu() {
	message('Click on "Report" to generate a PK Report or "Preferences" to change the settings.');
}

function report() {
	if (report_finished == false) return;
	report_finished = false;
	
	if (GM_getValue('tool') == 'none') {
		picurl = '';
		check = pkers();
		if (check) check_rg()
		//- showreport() is called from check_rg()
	}
	else {
		check = pkers()
		if (check) getpic()
		//responsepic() is called from getpic()		
		//check_rg() is called from responsepic()
		//- showreport() is called from check_rg()
	}
	return;
}

function UI() { //Adapted from DSS Satellite Phone.
	root = document.createElement('div');
	root.id = 'greasemonkeyroot' //Variable name kevan wont choose - used in hidefeatures()
	var box = document.createElement('div');
	box.setAttribute('class', 'sms');
	
	var titlep = document.createElement('p');
	titletext = document.createTextNode('Rouges Gallery Report Tool');

	// The panel switch functions.
	
	prefscreen = makebutton('Preferences','smss');
	prefscreen.addEventListener('click',(function() { changescreen('prefscreen_on')}),false);
	prefscreen.style.cssFloat = 'right';

	reportscreen = makebutton('Report','smss');
	reportscreen.addEventListener('click',(function() { changescreen('reportscreen_on')}),false);
	reportscreen.style.cssFloat = 'right';
	
	// The bottom buttons.
	var butp = document.createElement('p');
	butp.style.textAlign = 'right';
	close = makebutton('Close','smss');
	close.addEventListener('click',(function() { changescreen('mainscreen_off')}),false);

	// The hr separating the active UI from the close button and titletext from active UI
	topseparator = document.createElement('hr');
	bottomseparator = document.createElement('hr');

	// loading,indicates an operation is in progress.
	throbber = document.createElement('p');
	throbber.appendChild(document.createTextNode('Loading'));
	throbber.style.display = 'none';
	throbber.style.textDecoration = 'blink';
	
	// container
	containerbox = document.createElement('div');
	
	// II. Assemble everything
	titlep.appendChild(titletext);
	titlep.appendChild(prefscreen);
	titlep.appendChild(reportscreen);

	butp.appendChild(close);
	
	box.appendChild(titlep);
	box.appendChild(topseparator);
	box.appendChild(throbber);
	box.appendChild(containerbox);
	box.appendChild(bottomseparator);
	box.appendChild(butp);
	root.appendChild(document.createElement('br'));
	root.appendChild(document.createElement('br'));
	root.appendChild(document.createElement('br'));
	root.appendChild(box);
	var s = query("//td[@class='gp']/div");
	if (s)
		s[0].parentNode.insertBefore(root, s[0].nextSibling);
	else {
		var s = query("//body[last()]");
		s[0].appendChild(root)
	}
}

function getpic() {
	switch (GM_getValue('tool')) {
	case 'iwit' : var toolurl = 'http://iwitness.urbandead.info/wSubPA.php';break;
	//case 'udwit' : var toolurl = 'http://udwitness.oddnetwork.org/submit.php';break;
	case 'dumbwit' : var toolurl = 'http://iamscott.net/cgi-bin/dumbwit.pl';break;
	default :
	changescreen('prefscreen_on');
	return;
	}
	
	if (GM_getValue('tool') == 'udwit')
		//var data = 'private=0&screenshot='+encodeURIComponent(hidefeatures())
		var data = 'private=0&screenshot='+encodeURIComponent(document.body.innerHTML)		
	else {
		var wP = 'PUBLIC';
		var wC = '';
		var wT = document.lastModified;
		var wZ = new Date().getTimezoneOffset();
		var wV = '23';
		//var wS = hidefeatures(); Option to hide info such as co-ords other in building etc...to be included in next version. 
		var wS = document.body.innerHTML;
		var data = 'wP=' + encodeURIComponent(wP) + '&wC=' + encodeURIComponent(wC) + '&wT=' + encodeURIComponent(wT) + '&wZ=' + encodeURIComponent(wZ) + '&wV=' + encodeURIComponent(wV) + '&wS=' + encodeURIComponent(wS);
	}
	post(toolurl,'picresponse',data);
}

function picresponse(text) {
	var div = newdiv(text)
	switch (GM_getValue('tool')) {
	case 'iwit' : var s = query("//a[contains(@href,'urbandead.info/')]",div);break;
	//case 'udwit' : var s = query("//a[contains(@href,'http://udwitness.oddnetwork.org/private') or contains(@href,'http://udwitness.oddnetwork.org/report')]",div);break;
	case 'dumbwit' : var s = query("//a[starts-with(@href,'http://iamscott.net') and text()='here']",div);break;
		default :
		changescreen('prefscreen_on');
		return;
	}
	if (s)
		picurl = s[0].href;
	else {
		message('Evidence could not be created. Change the preferences to another screenshot-service and try again.');
		report_finished = true;
		return; //Stop script.
	}	
	check_rg();
}

function showreport(text) {
	if (report_finished == true)
	return;

	var string = generatevictims(text.split(';'));
	
	openpk = makebutton('Click to Open PK Report','y','#f99');
	openpk.addEventListener('click',(function () {window.open('http://s1.zetaboards.com/brainstock/post/?mode=2&type=1&f=1017811&t='+GM_getValue('pkthread')+'&post='+string)}),false) 
	pop = makebutton('Pop Up PK Report','y','#f99');
	pop.addEventListener('click',(function () { popup_pkreport(string) }),false) 
	changescreen('showreport');		
	containerbox.appendChild(openpk);
	containerbox.appendChild(pop);
	report_finished = true;
	return;
}

function generatevictims(vic) {
	var nvic = {};
	for (i=0;i<vic.length;i++)
		nvic[vic[i].split('=')[1]] = vic[i].split('=')[0]; //Object with victims names and ids.
	var st = '%0A%0D Evidence: ' + picurl;
	
	for (i=0;i<pk.length;i++)
		st += "%0A%0D Killer's ID: [url="+pk[i][1]+"]"+pk[i][0]+"[/url]%0A%0D Victim's ID: [url=http://urbandead.com/profile.cgi?id="+nvic[pk[i][2]]+"]"+pk[i][2]+"[/url]%0A%0D"
	return st;
}

function popup_pkreport(string) {
	var str = string.replace(/%0A%0D/g,'\n');
	var x = document.createElement('div');var y = document.createElement('textarea');
	y.cols = '100';y.rows = '10'; x.appendChild(y);y.textContent = str;containerbox.appendChild(x);
	pop.removeEventListener('click',popup_pkreport,false) 
}

function pkers() { //Add all PK's to array pk.
	check_rg_n = -1; //Global Variable - Reset to -1 each time pkers() is called.
	pk = [];
	var n = 0;
	var s = query("//td[@class='gp']//li//text()[starts-with(.,' killed')]/../a[1][not(text()='A zombie')]");
	if (s) {
		for (i=0;i<s.length;i++) {
			pattern = s[i].parentNode.textContent.match(/\skilled\s(.*)\swith\s/)
			if (pattern && pattern[1] != 'a zombie') {
				pk[n] = [s[i].textContent,s[i].href,pattern[1]]
				n++
			}
		}
	}
	var s = query("//td[@class='gp']//li/b[contains(text(),'You were killed by')]/a[1][not(text()='a zombie')]") //Player killed by pker
	if (s) {
		var name = s[0].textContent;
		var href = s[0].href;
		var s = query("//p[@class='gt']//a[contains(@href,'profile.cgi?id=')]");
		if (s) {
			pk[n] = [name,href,s[0].textContent]; //[pkname,pkid,victimname]
			n++;
		}
		else { 
			var s = query("//td[@class='cp']//ul[@class='menu']//a[contains(@href,'profile.cgi?id=')]"); //UDTool
			if (s) {
				pk[n] = [name,href,s[0].textContent]; //[pkname,pkid,victimname]
				n++;
			}
		}
	}
	if (n == 0) { //Using n as pk.length can be inaccurate   
		message("Error: No PK's were detected on the page.");   
		report_finished = true;
		return false; 
	}
	victims = [] //Get UDID's Of Victims
	for (i=0;i<pk.length;i++) {
		victims.push(pk[i][2]);
	}
	victims.unique();
	return true;
}

function check_rg(text) { //Recursion - Check RG to see if victim is PKer.
	if (text) {
		var div = newdiv(text);
		var s = query('//td/a[text()="'+pk[check_rg_n][2]+'"]',div);
			if (s) { 
			pk.splice(check_rg_n,1) //All elements move down 1 postion as element is removed.
			check_rg_n--;
			}
			if (typeof pk[check_rg_n + 1] === 'undefined') { //Break out of loop. Continue with script.
				if (pk.length > 0) {
					post('http://profiles.urbandead.net/query','showreport','name='+victims.join(';')); //- Next part of script. showreport() 
					return;
				}
				else {
					message("Error: No PK's were detected on the page. The victim is on the Rouges Gallery."); //Stop script.
					report_finished = true;
					setloading(false)
					return;
				}
			}
		check_rg_n++;
		post('http://ud-malton.info/Rogues_Gallery.cgi','check_rg','Type=Name&State=Search&Term='+pk[check_rg_n][2]);
	}
	else {
	check_rg_n++;
	post('http://ud-malton.info/Rogues_Gallery.cgi','check_rg','Type=Name&State=Search&Term='+pk[check_rg_n][2]);
	}
}

function hidefeatures() { 
	var div = newdiv(document.body.innerHTML);
	
	//Hide Rouges Gallery UI
	var s = query("//div[@id='greasemonkeyroot']",div);
	if (s) s[0].parentNode.removeChild(s[0]);
	
	//Hide everything below 'Since your last turn'.
	var gt = document.createElement('div'); //Replace div[@class='gt']
	gt.style.height = '100';
	gt.style.backgroundColor = "gray";
	
	var inventory = document.createElement('div'); //Replace Possible Actions and Inventory
	inventory.style.height = '300';
	inventory.style.backgroundColor = "gray";

	var s_ul = query("//td[@class='gp']//ul",div);
	var s_td = query("//td[@class='gp']",div);
	var s_td_clone = s_td[0].cloneNode(false);
	var s_td_parent = s_td[0].parentNode ;

	if (s_ul && s_td) {
	s_td_parent.removeChild(s_td[0]);
	s_td_clone.appendChild(gt);
	s_td_clone.appendChild(s_ul[0]);
	s_td_clone.appendChild(document.createElement('br'));
	s_td_clone.appendChild(document.createElement('br'));
	s_td_clone.appendChild(inventory);
	s_td_parent.appendChild(s_td_clone);
	}
	
	//Hide 3 X 3 Map
	var s = query("//table[@class='c' or @class='c fxMap']",div) //UDToolbar compatible
	if (s) {
		var map_box = document.createElement('div');
		map_box.style.dispaly = 'block';
		map_box.style.width = '300';
		map_box.style.height = '300';	
		map_box.style.backgroundColor = "gray";
		s[0].parentNode.replaceChild(map_box,s[0])
	}	
	
	//Removes UDWidget walking map
	var s = query("//table[@id='wm_table']");
	if (s) s[0].parentNode.removeChild(s[0]);
	
	return div.innerHTML;
}

function addbutton() {
	var reportb = makebutton('Send PK Report To Rouges Gallery','y','#f99');
	reportb.addEventListener('click',(function() {changescreen('mainscreen_on')}),false);
	var s = query("//a[@href='donate.html' and @class='y']/..");
	if (s) {
		var p = document.createElement('p');
		s[0].appendChild(p)
		p.appendChild(reportb);
		return;
	}
	
	var s = query("//td[@class='cp']");
	if (s) {
		s[0].appendChild(reportb)
		return;
	}
	else
		document.body.insertBefore(reportb,document.body.lastChild);
}

function preferences() {
	pref = document.createElement('div');

	none = document.createElement('input');none.type = 'radio';none.name = 'tool';
	iwit = document.createElement('input');iwit.type = 'radio';iwit.name = 'tool';
	//udwit = document.createElement('input');udwit.type = 'radio';udwit.name = 'tool';
	dumbwit = document.createElement('input');dumbwit.type = 'radio';dumbwit.name = 'tool';
	
	pref.appendChild(document.createTextNode('1) Select which screenshot-service will be included in PK Reports.'));
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createTextNode('None'));
	pref.appendChild(none);
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createTextNode('IWitness'));
	pref.appendChild(iwit);
	//pref.appendChild(document.createElement('br'));
	//pref.appendChild(document.createTextNode('UDwitness'));
	//pref.appendChild(udwit);
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createTextNode('Dumbwitness'));
	pref.appendChild(dumbwit);
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createTextNode('2) Enter the full URL of the PK Reporting thread on Brainstock: '));
	
	inputpkthread = document.createElement('input');
	inputpkthread.type = 'text';
	inputpkthread.style.width = '500px';
	
	var pkthread = GM_getValue('pkthread',false);
	if (pkthread !== false) inputpkthread.value = 'http://s1.zetabords.com/brainstock/topic/'+pkthread;

	switch (GM_getValue('tool')) {
	case 'iwit' : iwit.checked = true; break;
	//case 'udwit' : udwit.checked = true; break;
	case 'dumbwit' : dumbwit.checked = true; break;
	case 'none' : none.checked = true; break;
	}
	savepref = makebutton('Save','smss');
	savepref.addEventListener('click',prefsave,false);
	cancelpref = makebutton('Cancel','smss');
	cancelpref.addEventListener('click',(function(){changescreen('prefscreen_off')}),false);
	
	pref.appendChild(inputpkthread);
	pref.appendChild(document.createElement('br'));
	pref.appendChild(document.createElement('br'));
	pref.appendChild(savepref);
	pref.appendChild(cancelpref);
	containerbox.appendChild(pref);
}

function prefsave() {
	var err = false;
	if (iwit.checked) GM_setValue('tool','iwit');
	//else if (udwit.checked) GM_setValue('tool','udwit');
	else if (dumbwit.checked) GM_setValue('tool','dumbwit');
	else if (none.checked) GM_setValue('tool','none');
	else { 
		alert('1) No screenshot-service selected. Select one and then click "Save"');
		err = true;
	}
	if (threadid = inputpkthread.value.match(/brainstock\/topic\/(\d+)(\/|$)/i))
	GM_setValue('pkthread',threadid[1]);
	else { 
		alert('2) URL of PK Reporting thread has not been entered properly. Please enter it and then click "Save".');
		err = true; 
	}
	if (err) return;
	alert('Preferences Saved Successfully');
	changescreen('prefscreen_off');
}

function setloading(on) {
if (on)
throbber.style.display = 'block';
else
throbber.style.display = 'none';
}

function changescreen(new_screen) {
	if (new_screen == 'mainscreen_on') 
		if (typeof root == 'object' && mainscreen_on == true)
			return;
		else {
			mainscreen_on = true;
			UI();
			menu();
			return;
		}
	if (new_screen == 'mainscreen_off') 
		if (typeof root == 'object' && mainscreen_on == false)
			return;
		else {
			mainscreen_on = false;
			prefscreen_on = false;
			root.parentNode.removeChild(root);
			return;
		}
		
	if (new_screen == 'prefscreen_on') 
		if (typeof pref == 'object' && prefscreen_on == true)
			return;
		else { 
			if (typeof root !== 'object') { UI(); mainscreen_on = true; } 
			prefscreen_on = true;
			report_finished = true; // Stops Report from completeing. 
			setloading(false); //Incase Report is in process. 
			removechild(containerbox)
			preferences();
			return;
		}
	
	if (new_screen == 'reportscreen_on') {
		prefscreen_on = false;
		removechild(containerbox)
		report();
	}
	
	if (new_screen == 'prefscreen_off') {
		prefscreen_on = false;
		menu();
	}
}
//----------- Utility Functions ----------------------//

function removechild(parent) {
	while(parent.firstChild) parent.removeChild(parent.firstChild);
	return;
}

function message(text) {
if (prefscreen_on == true) return;
removechild(containerbox);
containerbox.appendChild(document.createTextNode(text));
}

function post(url,cb,data) {
	if (report_finished == true) return;
	setloading(true);
	
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		data: data,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		onload: function(response) {
			callback(response,cb);
		}
	});
}

function callback(response,cb) {
	setloading(false);

	if (response.readyState != 4) {
	message("Error: Server not responding correctly.");
	report_finished = true;
	return;
	}
	if (response.status != 200) {
	report_finished = true;
	message("Error: Server not repsonding correctly.");
	return;
	}
	switch (cb) {
	case 'showreport' : showreport(response.responseText);break;
	case 'picresponse' : picresponse(response.responseText);break;
	case 'check_rg' : check_rg(response.responseText);break;
	}
}

function newdiv(s) {
	div = document.createElement('div');
	div.innerHTML = s;
	return div;
}

Array.prototype.unique = function () {
	var hash = new Object();
	for (j = 0; j < length; j++) {hash[this[j]] = true}
	var array = new Array();
	for (value in hash) {array.push(value)};
	return array;
}

function query(query,doc) {
	var array,s;
	array = [];
	doc = doc || document;
	s = document.evaluate(query,doc,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i=0,node; (node=s.snapshotItem(i)); i++)
		array.push(node);
	if (array.length >= 1)
		return array;
	else
		return false;
}

function makebutton(label,element_class,color) {
	var input = document.createElement('input');
	if(element_class)
	input.setAttribute('class', element_class);
	input.setAttribute('type', 'button');
	if(label)
	input.setAttribute('value', label);
	if (color)
	input.style.color = color;
	return input;
}