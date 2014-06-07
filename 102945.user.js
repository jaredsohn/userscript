// ==UserScript==
// @name           Organizer
// @namespace      henrik@ezy.se
// @include        http://ezy.webwerkstaden.se/inside/*
// ==/UserScript==

function safe(o) { if(!o) return null; return o.wrappedJSObject || o; }
String.prototype.trim = function() { return this.replace(/^\s+|^&nbsp;|\s+$|&nbsp;$/g, ''); }

window.addEventListener('keyup', function(e) {
	if(safe(e).keyCode == 27) {
		if(document.getElementById('helpshade'))
			document.getElementById('helpshade').style.display = 'none';

		if(document.getElementById('resultbox'))
			document.getElementById('resultbox').style.display = 'none';

		if(document.getElementById('userbox'))
			document.getElementById('userbox').style.display = 'none';
	}
}, false);

if(location.href.indexOf('http://ezy.webwerkstaden.se/inside/dagsrapporter/addSeveral.asp?datum=') >= 0)
{


	if(location.href.indexOf('&reported=') > 0)
	{
		var rep = location.href.substring(location.href.indexOf('&reported=')+10);
		if(rep.indexOf('&') > 0) rep = rep.substring(0, rep.indexOf('&'));

		rep = parseInt(rep);

		var total = 480;

		if(location.href.indexOf('&total=') > 0)
		{
			var total = location.href.substring(location.href.indexOf('&total=')+7);
			if(total.indexOf('&') > 0) total = total.substring(0, rep.indexOf('&'));

			total = parseInt(total);
		}

		var remaining = total - rep;

		var repToday = document.createElement('div');
		repToday.style.backgroundColor = '#DDDDDD';
		repToday.style.padding = '5px';
		repToday.style.MozBorderRadius = '4px';
		repToday.style.position = 'absolute';
		repToday.style.left = '250px';
		repToday.style.top = '10px';
		repToday.style.fontFamily = 'arial,helvetica';
		repToday.style.fontSize = '8pt';

		repToday.innerHTML = ('Rapporterat hittills denna dag: ' + minutesToString(rep) + ' (' + minutesToString(remaining) + ' kvar)');

		document.body.appendChild(repToday);
	}

	var sel = document.getElementsByTagName('select');
	for(var i = 0; i < sel.length; i+=2) {
		safe(sel[i]).onchange = "javascript:void(0);";
		sel[i].addEventListener('change', fetchProjects, false);
	}

	var d = location.href.substring(location.href.indexOf('?datum=')+7);
	document.forms[0].action += '?datum='+ d;

	var user = location.href.substring(location.href.indexOf('&user=')+6);
	if(user.indexOf('&') > 0) user = user.substring(0, user.indexOf('&'));


	displayCommentsTable(d,user);




	return;
}

function fetchProjects(e) {
	var i = safe(e.target).name;
	i = i.substring(i.length-1);

	var url = 'http://ezy.webwerkstaden.se/inside/dagsrapporter/add2.ezy?datum=2009-09-01&kund_id='+safe(e.target).value;

	getPage(url,function(res) {
			var res = res.responseText;
			res = res.substring(res.indexOf('<SELECT'));
			res = res.substring(res.indexOf('>')+1);
			res = res.substring(0, res.indexOf('</SELECT'));

			safe(e.target).parentNode.parentNode.parentNode.getElementsByTagName('select')[1].innerHTML = res;			
		}
	);

	return false;
}

if(location.href.indexOf('http://ezy.webwerkstaden.se/inside/dagsrapporter/addSeveral2.asp') >= 0)
{
	if(document.body.innerHTML.indexOf('Inlaggt') >= 0)
	{
		var d = location.href.substring(location.href.indexOf('?datum=')+7);
		if(d.indexOf('&') > 0) d = d.substring(0, d.indexOf('&'));

		d = new Date(d.replace(/\-/gi, "/"));

		if(d.getDate() > 20) d.setMonth(d.getMonth()+1);

		var y = d.getFullYear();
		var m = (d.getMonth()+1);

		setTimeout("location.href = 'http://ezy.webwerkstaden.se/inside/arbetstider/visa2.ezy?ar="+y+"&manad="+m+"';", 500);
	}

	return;
}

if(location.href.indexOf('http://ezy.webwerkstaden.se/inside/dagsrapporter/change3.ezy?rapport_id=') >= 0)
{
	var d = location.href.substring(location.href.indexOf('?rapport_id=')+12);
	document.forms[0].action += '?rapport_id='+d;

	var date = location.href.substring(location.href.indexOf('&date=')+6);
	
	if(date.indexOf('&') > 0) date = date.substring(0, date.indexOf('&'));
	
	
	//var user = location.href.substring(location.href.indexOf('&user=')+6);
	//if(user.indexOf('&') > 0) user = user.substring(0, user.indexOf('&'));

	var user = GM_getValue('username','???');
	if(user != '???')
	    displayCommentsTable(date,user);

	return;
}

if(location.href.indexOf('http://ezy.webwerkstaden.se/inside/dagsrapporter/change4.ezy?rapport_id=') >= 0)
{
	var d = location.href.substring(location.href.indexOf('&date=')+6);
	if(d.indexOf('&') > 0) d = d.substring(0, d.indexOf('&'));

	d = new Date(d.replace(/\-/gi, "/"));

	if(d.getDate() > 20) d.setMonth(d.getMonth()+1);

	if(document.body.innerHTML.indexOf('Ändrat') >= 0)
		setTimeout("location.href = 'http://ezy.webwerkstaden.se/inside/arbetstider/visa2.ezy?ar="+d.getFullYear()+"&manad="+(d.getMonth()+1)+"';", 500);

	return;
}

if(location.href.indexOf('http://ezy.webwerkstaden.se/inside/arbetstider/visa2.ezy') < 0) return;

var trs = document.getElementsByTagName('tr');

for(var i = 4; i < trs.length; i++)
{
	var tr = safe(trs[i]);

	var tds = tr.getElementsByTagName('td');
	if(tds.length < 8) continue;

	var total = safe(tds[5]);
	var reported = safe(tds[7]);

	
	total = total.innerHTML.trim().replace(':','');
	
	reported = reported.innerHTML;
	
	reported = reported.substr(reported.indexOf('"button">',0) + 9,reported.length-reported.indexOf('"button">',0)-9).trim();

	reported = reported.trim().replace(':','');
	
	//reported = reported.innerHTML.trim().replace(':','');

	if(total == '') continue;

	if(total.substring(0,1) == '0') total = total.substring(1);
	if(reported.substring(0,1) == '0') reported = reported.substring(1);

	total = parseInt(total);
	reported = parseInt(reported);

	if(isNaN(total))
	{
		var dateText = safe(tds[0]).innerHTML.replace(/<.*?>/gi, '').trim().split('/');
		var dt = new Date(new Date().getFullYear(), parseInt(dateText[1])-1, parseInt(dateText[0]));

		var pastDate = dt < new Date();
		var noEntry = safe(tds[2]).innerHTML.replace(/<.*?>/gi, '').trim().length == 0 && safe(tds[7]).innerHTML.trim() == '0:00';
		var weekend = safe(tds[1]).getAttribute('bgcolor').toLowerCase() == '#eeeeee';
		var dayOff = safe(tds[1]).innerHTML.indexOf('Anpassad standardtid: 0h') > 0;

		if(pastDate && noEntry && !weekend && !dayOff)
		{
			for(var x = 0; x < tds.length; x++)
			{
				var td = safe(tds[x]);
				td.style.backgroundColor = '#ffeeee';
			}
		}

		continue;
	}

	var key = 'override_'+getDateString(tr);

	var overDiffThreshold = (total - reported > 15);
	var noVacation = safe(tds[1]).innerHTML.toLowerCase().indexOf('semester') < 0 && safe(tds[1]).innerHTML.toLowerCase().indexOf('ledig') < 0;
	var overridden = GM_getValue(key, false);

	if(overDiffThreshold && noVacation && !overridden)
	{
		for(var x = 0; x < tds.length; x++)
		{
			var td = safe(tds[x]);
			td.style.backgroundColor = '#ffcccc';
		}

		var btn = document.createElement('span');
		btn.innerHTML = '<u style="cursor: pointer;">OK</u>';

		var td1 = safe(tds[1]);
		td1.appendChild(btn);

		btn.addEventListener('click', saveOverride, true);
	}

	var td7 = safe(tds[7]);

	var reportLink = document.createElement('a');
	reportLink.href = 'javascript:void("Lägg till")';
	reportLink.innerHTML = td7.innerHTML.trim();
	
	var editLink = document.createElement('a');
	editLink.href = 'javascript:void("Visa/Ändra")';
	editLink.innerHTML = '(Visa)';

	td7.innerHTML = '';
	td7.appendChild(reportLink);
	td7.appendChild(document.createTextNode(' '));
	td7.appendChild(editLink);

	reportLink.addEventListener('click', report, false);
	editLink.addEventListener('click', viewedit, false);
}

function getDateString(tr)
{
	var date = safe(tr.getElementsByTagName('td')[0]).innerHTML;
	date = date.replace(/\<[^\>]*\>/g, '').trim();

	var m = '0' + date.substring(date.indexOf('/')+1);
	var d = '0' + date.substring(0, date.indexOf('/'));

	m = m.substring(m.length-2);
	d = d.substring(d.length-2);

	return (new Date().getFullYear()) + '-' + m + '-' + d;
}

function report(e)
{
	var tr = safe(e.target.parentNode.parentNode);
	var d = getDateString(tr);	

	var worked = tr.getElementsByTagName('td')[5].innerHTML;
	if(worked.indexOf('<') > 0) worked = worked.substring(0, worked.indexOf('<'));

	var reported = tr.getElementsByTagName('td')[7].getElementsByTagName('a')[0].innerHTML;
	reported = reported.substr(reported.indexOf('"button">',0) + 9,reported.length-reported.indexOf('"button">',0)-9).trim();
	location.href = 'http://ezy.webwerkstaden.se/inside/dagsrapporter/addSeveral.asp?datum=' + d + '&user=' +GM_getValue('username','???') + '&reported=' + stringToMinutes(reported) + '&total=' + stringToMinutes(worked);
}

var viewAfterSave = null;
var activeTr = null;
function viewedit(e)
{
	var tr = safe(e.target.parentNode.parentNode);
	var d = getDateString(tr);

	activeTr = tr;

	var uid = parseInt(GM_getValue('userid', 0));
	if(uid == 0)
	{
		viewAfterSave = e;
		selectuser();
		return;
	}

	getPage('http://ezy.webwerkstaden.se/inside/dagsrapporter/visa2.ezy?datum_ja=1&fran_datum='+d+'&till_datum='+d+'&user_ja=1&user_id='+uid, function(res) {
			var res = res.responseText;
			RegExp.multiline = true;

			res = res.replace(/ /g, '¤');
			res = res.replace(/\s/g, '');

			res = res.split('<A¤href="change3.ezy?rapport_id=');

			var rs = [];

			for(var i = 1; i < res.length; i++)
			{
				var report = parseInt(res[i]);
				var customer = res[i].substring(res[i].indexOf('>')+7, res[i].indexOf('</')).replace(/¤/g, ' ').trim();

				res[i] = res[i].substring(res[i].indexOf('BGCOLOR="#')+10);
				res[i] = res[i].substring(res[i].indexOf('BGCOLOR="#')+10);
				res[i] = res[i].substring(res[i].indexOf('BGCOLOR="#')+10);

				var text = res[i].substring(res[i].indexOf('>')+7, res[i].indexOf('</')).replace(/¤/g, ' ').trim();

				res[i] = res[i].substring(res[i].indexOf('<NOBR>')+6);
				res[i] = res[i].substring(res[i].indexOf('<NOBR>')+6);
				res[i] = res[i].substring(res[i].indexOf('<NOBR>')+6);

				var time = res[i].substring(6);
				time = time.substring(0, time.indexOf('&nbsp;'));

				var r = { report: report, customer: customer, text: text, time: time };
				rs.push(r);
			}

			displayviewedit(rs);
		});
}

function getPage(src, func) {
    var xhr = new window.XMLHttpRequest();
    xhr.onreadystatechange = function() { if(xhr.readyState ==4) func(xhr); };
    xhr.open("GET", src);
    // this fixes the content type glitch...
    xhr.overrideMimeType("text/html; charset=ISO-8859-1");
    xhr.send(null);
}

function displayviewedit(results)
{
	var userbox = document.getElementById('resultbox');
	if(!userbox)
	{
		userbox = document.createElement('div');
		userbox.id = 'resultbox';
		userbox.style.backgroundColor = 'white';
		userbox.style.border = '1px solid black';
		userbox.style.width = '198px';
		userbox.style.position = 'fixed';
		userbox.style.padding = '10px';
		userbox.style.fontSize = '12px';
		userbox.style.fontFamily = 'Trebuchet MS,Arial,Verdana,Helvetica,Univers,Zurich BT';
		userbox.style.left = (document.body.scrollWidth / 2 - 96) + 'px';
		userbox.style.top = '300px';
		userbox.style.zIndex = '2002';
		userbox.style.MozBorderRadius = '4px';

		document.body.appendChild(userbox);
	}

	if(!results || results.length == 0)
		userbox.innerHTML = 'Hittade inga rapporter för den här dagen...';
	else
	{
		userbox.innerHTML = '';
		for(var i = 0; i < results.length; i++)
		{
			var r = results[i];
			userbox.innerHTML += '<div></div>';

			var divs = userbox.getElementsByTagName('div');
			div = divs[divs.length-1];

			div.innerHTML += '<a href="http://ezy.webwerkstaden.se/inside/dagsrapporter/change3.ezy?rapport_id=' + r.report + '&date=' + getDateString(activeTr) + '" title="' + r.text.trim() + '">' + r.customer.trim() + ' (' + r.time.trim() + ')</a> - ';

			var a = document.createElement('a');
			a.innerHTML = '[x]';
			a.title = 'Ta bort';
			a.href = 'javascript:void("Ta bort");';
			a.id = 'del'+r.report;
			
			div.appendChild(a);
		}
	}

	var closebtn = document.createElement('a');
	closebtn.style.display = 'block';
	closebtn.innerHTML = 'Stäng';
	closebtn.href = 'javascript:void(0);';

	userbox.appendChild(closebtn);

	userbox.style.display = 'block';

	closebtn.addEventListener('click', function() { safe(document.getElementById('resultbox')).style.display = 'none'; safe(document.getElementById('helpshade')).style.display = 'none'; }, false);

	var links = userbox.getElementsByTagName('a');
	for(var i = 0; i < links.length; i++) {
		if(!links[i].id || links[i].id.substring(0,3) != 'del') continue;

		links[i].addEventListener('click', function(e) {
			var url = 'http://ezy.webwerkstaden.se/inside/dagsrapporter/del3.ezy?rapport_id=' + e.target.id.substring(3);

			getPage(url, function(res) {
				var del = e.target.parentNode;

				var edit = del.getElementsByTagName('a')[0].innerHTML;
				edit = edit.substring(edit.indexOf('(')+1);
				edit = edit.substring(0, edit.indexOf(')'));
				var current = stringToMinutes(edit);

				del.parentNode.removeChild(del);

				if(activeTr) {
					var activeTds = activeTr.getElementsByTagName('td');
					var reportLink = activeTds[7].getElementsByTagName('a')[0];
					var reported = stringToMinutes(reportLink.innerHTML);

					reported -= current;
					reportLink.innerHTML = minutesToString(reported);

					var worked = activeTds[5].innerHTML;
					if(worked.indexOf('<') > 0) worked = worked.substring(0, worked.indexOf('<'));
					worked = stringToMinutes(worked.trim());

					var color = (worked > reported+15) ? '#FFCCCC' : '#FFFFFF';
					for(var x = 0; x < activeTds.length; x++) { 
						activeTds[x].style.backgroundColor = color;
					}
				}
			});
		}, false);

	}

	var shade = document.getElementById('helpshade');
	if(!shade)
	{
		shade = document.createElement('div');
		shade.id = 'helpshade';
		shade.style.backgroundColor = 'gray';
		shade.style.opacity = '0.65';
		shade.style.zIndex = '2000';
		shade.style.position = 'fixed';
		shade.style.top = '0';
		shade.style.left = '0';
		shade.style.width = '100%';
		shade.style.height = '100%';

		document.body.appendChild(shade);
	}

	shade.style.display = 'block';
}

function saveOverride(e)
{
	var tr = safe(e.target.parentNode.parentNode.parentNode);
	var d = getDateString(tr);

	GM_setValue('override_'+d, true);

	var tds = tr.getElementsByTagName('td');
	for(var i = 0; i < tds.length; i++)
	{
		var td = safe(tds[i]);
		td.style.backgroundColor = 'white';
	}
	safe(tds[1]).innerHTML = safe(tds[1]).innerHTML.replace(/<span.*?>.*?OK.*?<\/span>/,'');
}

var cdiv = document.createElement('div');

var div = document.createElement('div');
div.style.paddingTop = '3px';
div.style.fontFamily = 'Trebuchet MS,Arial,Verdana,Helvetica,Univers,Zurich BT';
div.style.fontSize = '12px';
div.style.textAlign = 'left';
div.id = 'hourReport';
div.innerHTML = '<b>Rapporterade timmar denna vecka</b>';

var addbtn = document.createElement('input');
addbtn.type = 'button';
addbtn.value = 'Välj användare';

addbtn.addEventListener('click', selectuser, false);

var agenda = document.createElement('div');
agenda.style.paddingTop = '3px';
agenda.style.fontFamily = 'Trebuchet MS,Arial,Verdana,Helvetica,Univers,Zurich BT';
agenda.style.fontSize = '12px';
agenda.style.textAlign = 'left';
agenda.id = 'hourAgenda';

cdiv.appendChild(div);
cdiv.appendChild(agenda);
cdiv.appendChild(addbtn);
document.body.insertBefore(cdiv, safe(document.getElementById('htmlhelp')));

var clear = document.createElement('div');
clear.style.clear = 'both';
document.body.insertBefore(clear, safe(document.getElementById('htmlhelp')));

safe(document.getElementsByTagName('table')[0]).style.cssFloat = 'left';

var uid = parseInt(GM_getValue('userid', 0));

if(uid > 0)
	getreport(uid);

function getreport(uid)
{
var fromdate = new Date();
fromdate.setDate(fromdate.getDate()-fromdate.getDay()+1);

var todate = new Date();

var fromdatetxt = fromdate.getFullYear() + '-' + ('0'+(fromdate.getMonth()+1)).substring(('0'+(fromdate.getMonth()+1)).length-2) + '-' + ('0'+fromdate.getDate()).substring(('0'+fromdate.getDate()).length-2);
var todatetxt = todate.getFullYear() + '-' + ('0'+(todate.getMonth()+1)).substring(('0'+(todate.getMonth()+1)).length-2) + '-' + ('0'+todate.getDate()).substring(('0'+todate.getDate()).length-2);

getPage('http://ezy.webwerkstaden.se/inside/dagsrapporter/visa2.ezy?datum_ja=1&fran_datum='+fromdatetxt+'&till_datum='+todatetxt+'&user_ja=1&user_id='+uid,
	function(res) {
		div.innerHTML = '<b>Rapporterade timmar denna vecka</b>';
		RegExp.multiline = true;

		var res = res.responseText;
		res = res.replace(/[\n\s]/g, ' ');

		var trpat = /\<td.*?\>.*?\<a href=\"change3\.ezy.*?\>&nbsp;(.*?)\<\/a\>.*?&nbsp;(\d+:\d+).*?<\/td\>/gim;

		var matches = res.split(trpat).splice(1);

		matches = matches.splice(0, matches.length-1);

		if(matches.length == 0) return;

		matches[0] = matches[0].substring(matches[0].lastIndexOf('&nbsp;')+6);
		var projects = [];
		projects.keys = [];

		var currProject = '';
		for(var i = 0; i < matches.length; i++)
		{
			var m = matches[i];
			if(m)
			{
				if(/^\d+:\d+$/.test(m))
				{
					var h = parseInt(m.substring(0, m.indexOf(':')));
					var min = parseInt(m.substring(m.indexOf(':')+1));

					if(!projects[currProject])
					{
						projects[currProject] = 0;
						projects.keys.push(currProject);
					}

					projects[currProject] += h*60+min;
					
				}
				else
				{
					currProject = m;
				}
			}
		}

		for(var i = 0; i < projects.keys.length; i++)
		{
			var name = projects.keys[i];
			var time = projects[name];

			div.innerHTML += '<div>'+name+' - '+minutesToString(time)+'</div>';
		}
	});
}

function minutesToString(time) {
	var m = time%60;
	var h = ((time-m)/60).toString();

	m = '0'+m.toString();
	m = m.substring(m.length-2);

	return h+':'+m;
}

function stringToMinutes(time) {
	var h = parseInt(time.substring(0, time.indexOf(':')), 10);
	var m = parseInt(time.substring(time.indexOf(':')+1), 10);

	return h*60+m;
}

function selectuser()
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ezy.webwerkstaden.se/inside/dagsrapporter/visa_user.ezy',
		onload: function(res)
		{
			res = res.responseText;
			res = res.substring(res.indexOf('<SELECT'));
			res = res.substring(0, res.indexOf('</SELECT>')+9);

			var userbox = document.getElementById('userbox');
			if(!userbox)
			{
				userbox = document.createElement('div');
				userbox.id = 'userbox';
				userbox.style.backgroundColor = 'white';
				userbox.style.border = '1px solid black';
				userbox.style.width = '198px';
				userbox.style.position = 'fixed';
				userbox.style.padding = '10px';
				userbox.style.left = (document.body.scrollWidth / 2 - 96) + 'px';
				userbox.style.top = '300px';
				userbox.style.zIndex = '2002';

				userbox.style.MozBorderRadius = '4px';
		
				userbox.innerHTML = res + "&nbsp;";

				var btn = document.createElement('input');
				btn.type = 'button';
				btn.value = 'OK';

				btn.addEventListener('click', saveuser, false);

				userbox.appendChild(btn);

				document.body.appendChild(userbox);

				var sel = safe(userbox.getElementsByTagName('select')[0]);
				var usrid = parseInt(GM_getValue('userid', 0));

				if(usrid > 0) sel.value = usrid;
			}

			userbox.style.display = 'block';

			var shade = document.getElementById('helpshade');
			if(!shade)
			{
				shade = document.createElement('div');
				shade.id = 'helpshade';
				shade.style.backgroundColor = 'gray';
				shade.style.opacity = '0.65';
				shade.style.zIndex = '2000';
				shade.style.position = 'fixed';
				shade.style.top = '0';
				shade.style.left = '0';
				shade.style.width = '100%';
				shade.style.height = '100%';

				document.body.appendChild(shade);
			}

			shade.style.display = 'block';
		}
	});
}

function saveuser()
{
	var sel = safe(document.getElementById('userbox').getElementsByTagName('select')[0]);
	GM_setValue('userid', sel.value);
	GM_setValue('username', sel[sel.selectedIndex].innerHTML);
	//alert(sel[sel.selectedIndex].innerHTML);
	
	getreport(parseInt(sel.value));

	document.getElementById('helpshade').style.display = 'none';
	document.getElementById('userbox').style.display = 'none';

	if(viewAfterSave)
	{
		viewedit(viewAfterSave);
		viewAfterSave = null;
	}
}

function getResource(url) {

	var baseUrl = 'http://' + url + '.pastebay.com/';
	GM_xmlhttpRequest({
		method: 'GET',
		url: baseUrl,
		onload: function(res) {
			res = res.responseText;

			newUrl = res.substring(res.indexOf(baseUrl));
			newUrl = newUrl.substring(0, newUrl.indexOf('"'));

			getPastebay(url, newUrl);
		}
	});
}

function getPastebay(id, url) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: url + '?p=organizer1017',
		onload: function(res) {
			res = res.responseText;
			res = res.substring(res.indexOf('<div class="de1">')+17);
			res = res.substring(0, res.indexOf('No virus found in this incoming message'));
			res = res.replace(/&nbsp;/g, " ");

			gotResource(id, res);
		}
	});
}

var uid = parseInt(GM_getValue('userid', 0));

function gotResource(id, res) {
	if(id == 'orgplan') {
		res = res.split('Â');

		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://ezy.webwerkstaden.se/inside/dagsrapporter/visa_user.ezy',
			onload: function(res2)
			{
				var search = '<OPTION VALUE="'+uid+'">';
				res2 = res2.responseText;
				res2 = res2.substring(res2.indexOf(search)+search.length);
				res2 = res2.substring(0, res2.indexOf('<'));
				var name = res2;

				for(var i = 0; i < res.length; i++) {
					var find = res[i].substring(0, res[i].indexOf(':'));
					find = find.replace(/\s/g, '').toLowerCase();

					if(find == name.toLowerCase()) {
						displayAgenda(res[i].substring(res[i].indexOf(':')+2));
						return;
					}
				}

			}
		});

	}
}

function displayAgenda(a) {
	document.getElementById('hourAgenda').innerHTML = '<b>Veckans planering</b><br/>'+a;
}


function displayCommentsTable(d,user)
{
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://itemtracker.ezyserver.se/svn_log2.aspx?svnuser=' +user +'&date=' +d +'&login=6422E4E4-17DA-46D6-9436-EE7D2E10AE2C',
    		onload: function(response) {
			
			var res = response.responseText;
			res = res.substring(res.indexOf('<table'));
			res = res.substring(res.indexOf('>')+1);
			res = res.substring(0, res.indexOf('</table'));
			res = "<table style='width:952px'><tr><td colspan='6'><h2>Subversion kommentarer</h2></td></tr>" +res +"</table>";
			
			var svnlogtable = document.createElement("div");
			svnlogtable.innerHTML = res;
			
			document.body.appendChild(svnlogtable);


    		}
	});

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://itemtracker.ezyserver.se/bugcomments.aspx?btuser=' +user +'&date=' +d +'&login=6422E4E4-17DA-46D6-9436-EE7D2E10AE2C',
    		onload: function(response) {
			
			var res = response.responseText;
			res = res.substring(res.indexOf('<table'));
			res = res.substring(res.indexOf('>')+1);
			res = res.substring(0, res.indexOf('</table'));
			res = "<table style='width:952px'><td colspan='6'><h2>Itemtracker kommentarer</h2></td></tr>" +res +"</table>";
			
			var bucommentstable = document.createElement("div");
			bucommentstable.innerHTML = res;
			
			document.body.appendChild(bucommentstable);


    		}
	});

	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://itemtracker.ezyserver.se/bugsassignedtome.aspx?btuser=' +user +'&login=6422E4E4-17DA-46D6-9436-EE7D2E10AE2C',
    		onload: function(response) {
			
			var res = response.responseText;
			res = res.substring(res.indexOf('<table'));
			res = res.substring(res.indexOf('>')+1);
			res = res.substring(0, res.indexOf('</table'));
			res = "<table style='width:952px'><td colspan='6'><h2>Items tilldelade mig <span style='font-size:10px'>  (uppdaterade inom 2 månader)</span></h2> </td></tr>" +res +"</table>";
			
			var bugsassignedtometable = document.createElement("div");
			bugsassignedtometable.innerHTML = res;
			
			document.body.appendChild(bugsassignedtometable);


    		}
	});


}


if(uid > 0)
	getResource('orgplan');

/*
// POST

http://organizer.pastebay.com/pastebay.php
parent_pid
format		text
code2		test
protected
poster		gm
paste		Send
expiry		f
pam
*/

var SUC_script_num = 48152;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}