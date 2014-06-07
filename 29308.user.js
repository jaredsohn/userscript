// ==UserScript==
// @name           Omerta Plus
// @author         Kredu
// @namespace      http://zulu.tuxsp.pt/~dinismadeira/omerta/
// @identifier     http://zulu.tuxsp.pt/~dinismadeira/omerta/OmertaPlus.js
// @description    Omerta Plus
// @include        http://*.barafranca.*/*
// @include        http://*.omerta.*/*
// ==/UserScript==

var sets = new Array()
sets['site'] = 'http://kredu.homeip.net/'
sets['op_version'] = '2.4'

//version get
var url = location.href + ''
if (url.match('dm.barafranca')) sets['version'] = 'dm'
else if (url.match('deathmatch.barafranca')) sets['version'] = 'dm'
else if (url.match('.barafranca.com.pt')) sets['version'] = 'pt'
else if (url.match('.barafranca.com.br')) sets['version'] = 'br'
else if (url.match('.barafranca.com')) sets['version'] = 'com'
else if (url.match('.barafranca.nl')) sets['version'] = 'nl'
else if (url.match('.barafranca.de')) sets['version'] = 'de'
else if (url.match('.barafranca.gen.tr')) sets['version'] = 'tr'
else if (url.match('.barafranca.fr')) sets['version'] = 'fr'
else if (url.match('.barafranca.no')) sets['version'] = 'nd'
else sets['version'] = false

//title change
if (sets['version']) document.title = 'Omerta ('+ sets['version'].toUpperCase() +')'

//skin change
function updateskin(win) {
if (sets_get('skin',false)) {
	var links = win.document.getElementsByTagName('link')
	for (i = 0, j = links.length; i < j; i++) {
		if (links[i].href.match('/static/css/game/menu')) {
			links[i].href = '/static/css/game/menu'+sets_get('skin')+'.css'
			break
		}
	}
}
}
function updateskin_rec(win) {
updateskin(win)
for (var i = 0; i < win.frames.length; i++) { updateskin_rec(win.frames[i])	}
}
updateskin(window)

//bullet form
if(location.pathname == '/bullets2.php'){
	document.getElementsByName('amount_sys')[0].value = '400';
  unsafeWindow.onload = '';
  document.getElementsByName('ver_sys')[0].focus();
  }

  
//crime form
if(location.pathname + location.search == '/BeO/webroot/index.php?module=Crimes') {
	form = document.getElementsByTagName('form')[0]
	document.getElementsByTagName('form')[0].addEventListener("submit", function(event) { 
		for (i = 0; i < form.length; i++) {
			element = form.elements[i]
			if ((element.type == 'radio') && (element.checked)) sets_save('crime',element.value)
		}
	}, false);
	for (i = 0; i < form.length; i++) {
		element = form.elements[i]
		if ((element.type == 'radio') && (element.value == sets_get('crime'))) element.checked = true
		if (element.type == 'text') element.focus()
	}
}

//cars form
if(location.pathname + location.search == '/BeO/webroot/index.php?module=Cars') {
	var tds = document.getElementsByTagName('td')
	var pers = new Array()
	for (i = 0, j = tds.length; i < j; i++) if (regs = tds[i].innerHTML.match('^(\\d+)%$')) pers.push(Math.round(regs[1]))
	var maxperval = 0
	var maxperpos = 0
	form = document.getElementsByTagName('form')[0]
	for (i = 0, j = pers.length; i < j; i++) {
		if (pers[i] >= maxperval) { 
			maxperval = pers[i];
			maxperpos = i;
		}
	}
	var k = 0
	for (i = 0; i < form.length; i++) {
		element = form.elements[i]
		if (element.type == 'radio') { if (k == maxperpos) { element.checked = true; } k++; }
		if (element.type == 'text') element.focus()
	}
}

//traffic form
if(location.pathname == '/smuggling.php') {
  var string = document.getElementsByTagName("td")[0].innerHTML + ''
  if (regs = string.match(RegExp("(.*)<br>(.*)<br>(.*)<br>(.*)","mi"))) {
    var maxbooze = print_r(regs[2].match("[^\\\d]*(\\\d+)[^\\\d]*"))[1]
    var maxnarcs = print_r(regs[2].match("[^\\\d]*(\\\d+)[^\\\d]*"))[1]
  }
  
  //sell booze

  var action = new Array();
  action['booze'] == false;
  action['narcs'] == false;
	if (document.getElementsByName('typebooze')[0].checked) {
	GM_log("sell booze");
	
	}
	//buy booze
	else {
	GM_log("buy booze");
	
	
	
	}
	//sell drugs
	if (document.getElementsByName('typedrugs')[0].checked) {
	GM_log("sell drugs");
	
	
	}
	//buy drugs
	else {
	GM_log("buy drugs");
	
	
	
	}
}

//bank form
if(location.pathname == '/bank.php') {
	table = document.getElementsByTagName("table")[2]
	regs = table.innerHTML.match(RegExp('(\\\$ ?[\\d,]+)','g'))
	if (regs.length == 1) table.innerHTML = table.innerHTML.replace(regs[0],'<a href="#" onClick="document.getElementsByName(\'amounttpob\')[0].value = \'' + regs[0].replace('$', '').replace(/\,/g, '') +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + regs[0] + '</a>')
	else {
		table.innerHTML = table.innerHTML.replace(regs[0],'<a href="#" onClick="document.getElementsByName(\'amounttpob\')[0].value = \'' + regs[0].replace('$', '').replace(/\,/g, '') +'\'; document.getElementsByTagName(\'input\')[8].checked = true;">' + regs[0] + '</a>')
		table.innerHTML = table.innerHTML.replace(regs[2],'<a href="#" onClick="document.getElementsByName(\'amounttpob\')[0].value = \'' + regs[2].replace('$', '').replace(/\,/g, '') +'\'; document.getElementsByTagName(\'input\')[7].checked = true;">' + regs[2] + '</a>')
	}
}

//add skin change option
if(location.pathname == '/profile.php') {
	string = ''
	string += '<br><br><form id="omertaplusform"><table align="center" class="thinline" cellspacing="0" cellpadding="2" rules="none" width="300">';
	string += '<tr><td align="center" class="tableheader"><b>Omerta Plus</b></td></tr>';
	string += '<tr><td height="1" bgcolor="black"></td></tr>';
	var skins = ["Azul clássico","Verde corrida","Vermelho de Sangue","Cinzento Blusão","Amarelo Whiskey","Preto","Rosa Melão","Azul","Rosa Choque"]
	string += '<tr><td>Skin: <select name="skin">';
	for(i=0, j=skins.length; i<j; i++) string += '<option value="'+(i + 1)+'"'+(sets_get('skin',1) == (i + 1) ? 'selected="selected"' : '')+'>'+skins[i]+'</option>';
	string += '</select></td></tr>';
	string += '<tr><td align="center"><input type="button" id="omertaplus" value="Save"></td></tr>'
	string += '</table></form>';
var profile = document.createElement("div");
profile.innerHTML += string;
document.getElementsByTagName("body")[0].appendChild(profile);

	document.getElementById('omertaplus').addEventListener("click", function(event) {
		form = document.getElementById('omertaplusform')
		var name;
		var type;
		for (var i = 0; i < form.length; i++) {
			name = form.elements[i].tagName.toUpperCase();
			type = form.elements[i].type.toUpperCase();
			if(name == "INPUT" || name == "SELECT" || name == "TEXTAREA") {
				if(type == "RADIO" || type == "CHECKBOX" ) {
					if(form.elements[i].checked) sets_save(form.elements[i].name,escape(form.elements[i].value));
				} 
				else sets_save(form.elements[i].name,escape(form.elements[i].value));
			}
		}
		updateskin_rec(top)
		alert('Changes saved!')
	}, false);
}

//prices
if ((location.pathname == '/marquee.php') || (location.pathname == '/marquee2.php')) {
	function getprices(text) {
		text = text.split('\n')
		sets['oldprices'] = sets['prices']
		var section = ''
		for (i = 0; i < text.length; i++) {
			if (regs = text[i].match('\\\[(.+)\\\]')) section = regs[1]
			else if (regs = text[i].match('([^=]+)=(.*)')) {
				if (section == 'prices') {
					if (regs[1] == sets['version']) {
						sets['prices'] = regs[2].split(" ")
						writeprices();
						if (((sets['oldprices'][8] != sets['prices'][8]) && (sets['oldprices'][8] != '0')) || (sets['prices'][1] == 0)) get(location.protocol+'//'+location.host+'/prices.php',updateprices)
					}
				}
			}
		}
	}
	function updateprices(text) {
    GM_log("Updating prices from Omerta...");
		var citys = new Array()
		citys = [4,0,7,2,5,3,1,6]
		var regs = text.match(RegExp('\\\$ ?[\\d,]+','g'))
		if ((regs == null) || (regs.length < 112)) return;
		for (i = 5, j = 0; i <= 54; i += 7, j++) sets['prices'][citys[j]] = regs[i].replace(RegExp('[^\\d]','g'),'')
		for (i = 0; i < 8; i++) if (sets['oldprices'][i] != sets['prices'][i]) {
			writeprices()
			var string = sets['prices'][0]
			for (i = 1; i < 8; i++) string += '%20' + sets['prices'][i]
			get ('http://zulu.tuxsp.pt/~dinismadeira/omerta/prices/prices.php?do=setprice&version='+sets['version']+'&value='+string, setprices)
			break;
		}
	}
	function setprices (text) { }
	function writeprices () {
		sets_save('prices',sets['prices'].join(' '));
		var citys = new Array()
		citys = ["Chicago","Baltimore","New York","Philadelphia","Detroit","Las Vegas","Corleone","Palermo"]
		var prices = new Array()
		prices['max'] = 0;
		prices['min'] = 0;
		for (i = 0; i < 8; i++) {
			prices[i] = sets['prices'][i]
			if (prices[i] > prices['max']) prices['max'] = prices[i]
			if ((prices[i] < prices['min']) || (prices['min'] == 0)) prices['min'] = prices[i]
		}
		if (prices['max'] != prices['min']) for (i = 0; i < 8; i++) {
			if (prices[i] == '0') prices[i] = '?????'
			else if (prices[i] == prices['max']) prices[i] = '<font color="red"><b>$'+number_format(prices[i])+'</b></font>'
			else if (prices[i] == prices['min']) prices[i] = '<font color="green"><b>$'+number_format(prices[i])+'</b></font>'
			else prices[i] = '$'+number_format(prices[i])
		}
		var string = '<div id="marquee" align="center">-- Cocaine | '
		for (i = 0; i < 8; i++) string += citys[i] + ': ' + prices[i] + ' | '
		var time = new Date()
		time.setTime(sets['prices'][8] * 1000)
		time = [time.getHours(),time.getMinutes()]
		if (time[0] < 10) time[0] = '0'+time[0]
		if (time[1] < 10) time[1] = '0'+time[1]
		string += time[0] + ':' + time[1] + ' --</div>'
		document.body.innerHTML = string
	}
	sets['prices'] = sets_get('prices','0 0 0 0 0 0 0 0 0 #') + '';
	sets['prices'] = sets['prices'].split(" ");
	get ('http://zulu.tuxsp.pt/~dinismadeira/omerta/prices.ini?rand='+Math.random(), getprices);
	writeprices();
  setTimeout("document.location = document.location",60000)
}
function parsetimers (text) {
  var timers = new Array();
  if (regs = text.match(RegExp('var oTimer = new Timer.*','ig'))) {
    for (id in regs) {
      timers[id] = new Array();
      timers[id]['label'] = regs[id].match('var oTimer = new Timer\\\("(.*)"')[1];
    }
    if (regs = text.match(RegExp('oTimer.setTime.*','ig'))) {
      for (id in regs) {
        timers[id]['value'] = regs[id].match('oTimer.setTime\\\((.*)\\\)')[1];
      }
    }
  }
  var output = new Array();
  for (id in timers) output[timers[id]['label']] = timers[id]['value'];
  return output;
}
function parsestatus (text) {
  if (unsafeWindow.top.crime == undefined) unsafeWindow.top.crime = 0;
  if (unsafeWindow.top.car == undefined) unsafeWindow.top.car = 0;
  if (unsafeWindow.top.flight == undefined) unsafeWindow.top.flight = 0;
  if (regs = text.match('var i_nc_time = (.+);')) unsafeWindow.top.crime = regs[1];
  if (regs = text.match('var i_nca_time = (.+);')) unsafeWindow.top.car = regs[1];
  if (regs = text.match('var i_nf_time = (.+);')) unsafeWindow.top.flight = regs[1];
    var timers = parsetimers(text);
    if (timers['nc'] != undefined) unsafeWindow.top.crime = timers['nc'];
    if (timers['nca'] != undefined) unsafeWindow.top.car = timers['nca'];
    if (timers['nf'] != undefined) unsafeWindow.top.flight = timers['nf'];

  if (regs = text.match('<td>\\\$(.*)<')) unsafeWindow.top.cash = regs[1]
  if (regs = text.match(RegExp('(<table(?:.*)%</td(?:.*)</table>)','g'))) {
    unsafeWindow.top.rp = regs[0].replace('#EAC137','#7a7a7a').replace('red','#1a0080')
    unsafeWindow.top.life = regs[1].replace('green','#7a7a7a').replace('red','#1a0080')
    unsafeWindow.top.ks = regs[2].replace('white','#7a7a7a').replace('red','#1a0080')
  }
}

//donator banner
if ((location.pathname == '/mid.php') || (location.pathname == '/mid2.php')) {
  function update() {
    unsafeWindow.document.form1.car.value = duration(unsafeWindow.top.car - 1)
    unsafeWindow.document.form1.crime.value = duration(unsafeWindow.top.crime - 1)
    unsafeWindow.document.form1.flight.value = duration(unsafeWindow.top.flight - 1)
    unsafeWindow.top.crime--;
    unsafeWindow.top.car--;
    unsafeWindow.top.flight--;
    unsafeWindow.top.updateid = setTimeout(update,1000);
  }
  function writestatus() {
    if (unsafeWindow.top.crime == undefined) return;
		document.body.innerHTML = '<table border=0 cellpadding="2" align=center height=95><tr valign=top><td><iframe src="mailbox.php" width=60 height=70 frameborder=0 scrolling=no></iframe></td><td><table><tr><td><b>P</b>osition:</td><td>'+unsafeWindow.position+'</td></tr><tr><td><b>P</b>oints:</td><td>'+unsafeWindow.points+'</td></tr><tr><td><b>C</b>ash:</td><td><a href=bank.php target=main>$'+unsafeWindow.top.cash+'</a></td></tr></table></td><td align="left"><form name="form1" style="display: inline"><table><tr><td><a href="BeO/webroot/index.php?module=Crimes" target=main><b>C</b>rime:</a></td><td><input class=top type=text style="border: 0" name="crime" value="0" size="3"></td></tr><tr><td><a href="BeO/webroot/index.php?module=Cars" target=main><b>C</b>ar:</a></td><td><input class=top type=text style="border: 0" name="car" value="0" size="3"></td></tr><tr><td><a href=travel.php target=main><b>F</b>light:</a></td><td><input class=top type=text style="border: 0" name="flight" value="0" size="3"></td></tr></table></form></td><td align="left"><table cellpadding="0" cellspacing="0"><tr><td><b>P</b>rogresso no estatuto:&nbsp;</td><td>'+unsafeWindow.top.rp+'</td></tr><tr><td><b>S</b>aúde:</td><td>'+unsafeWindow.top.life+'</td></tr><tr><td><b>P</b>ontaria:</td><td>'+unsafeWindow.top.ks+'</td></tr></table></td><td></td></tr></table>'
		if (!unsafeWindow.top.updateid) update();
	}
	function getstatus() {
		get(location.protocol+'//'+location.host+'/information.php', updatestatus)
		window.setTimeout(getstatus,rand(50000,65000));
	}
	function updatestatus(text) {
		parsestatus(text);
		writestatus();
	}
	var x = xpath('//table//tbody//tbody').snapshotItem(0).getElementsByTagName('td')
	unsafeWindow.position = x[1].innerHTML
	unsafeWindow.points = x[3].innerHTML
	unsafeWindow.top.updateid = false
	writestatus();
	window.setTimeout(getstatus,rand(1000,10000));
}
//parse status
if (location.pathname == '/information.php') {
	parsestatus(document.body.innerHTML)
}

//prison break
if (location.pathname == '/jail.php')
{
	var done, i;
	form = document.getElementsByTagName('form')[0];
	done = false;
	for (i = 0; i < form.length; i++)
	{
		element = form.elements[i];
		if (!done && element.type == 'radio')
		{
			done = true;
			element.checked = true;
		}
		if (element.type == 'text')
		{
			element.focus();
		}
	}
}

//apend script
var script = document.createElement("script");
script.setAttribute('type','text/javascript');
script.setAttribute('src',sets['site']+'omertaplus.js.php?version=' + sets['op_version'] + '&href=' + location.href);
document.getElementsByTagName("head")[0].appendChild(script);

//functions
function sets_save(name,value) {
if (value == undefined) value = true
return GM_setValue(sets['version']+'_'+name,value)
}
function sets_get(name,value) {
if (value == undefined) value = true
return GM_getValue(sets['version']+'_'+name,value)
}

function xpath(query) {
	return document.evaluate(query, document, null, 6, null);
}

function del(query) {
	var elem = xpath(query).snapshotItem(0);
	try { elem.parentNode.removeChild(elem); }
	catch(err) {}
}

function delall(query){
	var allelem = xpath(query);
	for (var i = 0; i < allelem.snapshotLength; i++ ) {
		var elem = allelem.snapshotItem(i);
		try { elem.parentNode.removeChild(elem); }
		catch(err) {}
	}
}

function getID(id) {
	return document.getElementById(id);
}

function getTAG(tag) {
	return document.getElementsByTagName(tag);
}

function getELNAME(name){
	return document.getElementsByName(name);
}

function cEL(name){
	return document.createElement(name);
}

function print_r( input, _indent ) {
	// Recuo

	var indent            =    ( typeof( _indent ) == 'string' ) ? _indent + '    ' : '    '
	var parent_indent    =    ( typeof( _indent ) == 'string' ) ? _indent : '';

	var output            =    '\n';

	// Tipo de Elemento do Array

	switch( typeof( input ) )
	{
	case 'string':
		output        =    "'" + input + "'\n";
		break;

	case 'number':
		output        =    input + "\n";
		break;

	case 'boolean':
		output        =    ( input ? 'true' : 'false' ) + "\n";
		break;

	case 'object':
		output        =    ( ( input.reverse ) ? 'Array' : 'Object' ) + "\n";

		output       +=    parent_indent + "(\n";

		for( var i in input )
		{
			output +=    indent + '[' + i + '] => ' + print_r( input[ i ], indent );
		}

		output       +=    parent_indent + ")\n"
		break;
	}

	return output;
}

function embedFunction(s) {
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createElement(type, attributes){
	var node = document.createElement(type);
	for (var attr in attributes) if (attributes.hasOwnProperty(attr)){
		node.setAttribute(attr, attributes[attr]);
	}
	return node;
}

function remove(element) {
	element.parentNode.removeChild(element);
}

function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function get(url, cb) {
	GM_xmlhttpRequest({
method: "GET",
url: url,
onload: function(xhr) { cb(xhr.responseText); }
	});
}

function post(url, data, cb) {
	GM_xmlhttpRequest({
method: "POST",
url: url,
headers:{'Content-type':'application/x-www-form-urlencoded'},
data:encodeURI(data),
onload: function(xhr) { cb(xhr.responseText); }
	});
}

function escapeRegexp(s) {
	return s.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
}

function number_format(number) {
number += ''
return number.replace(/(\d)(?=(\d{3})+\b)/g,'$1,')
}

function duration(secs) {
  if (secs <= 0) return "Now";
  y = Math.floor(secs / 31557600); secs %= 31557600;
  d = Math.floor(secs / 86400); secs %= 86400;
  h = Math.floor(secs / 3600); secs %= 3600;
  m = Math.floor(secs / 60); secs %= 60;
  s = secs;
  if (y >= 1) y = y+"A "; else y = "";
  if (d >= 1) d = d+"D "; else d = "";
  if (h >= 1) h = h+"H "; else h = "";
  if (m >= 1) m = m+"M "; else m = "";
  if (s >= 1) s = s+"S"; else s = "";
  return y+d+h+m+s;
}

function durations(secs) {
  if (secs <= 0) return "Now";
  else return secs + 'S'
}

function rand(min,max) {
return Math.round(Math.random() * (max - min)) + min
}

function parse_nexttime(string) {
  var time = 0;
  if (regs = string.match(RegExp("(?:(\\\d+)H )?(?:(\\\d+)M )?(\\\d+)S","i"))) {
    time = Math.round(regs[1]) * 3600 + Math.round(regs[2]) * 60 + Math.round(regs[3])
  }
  return time;
}
//EOF
