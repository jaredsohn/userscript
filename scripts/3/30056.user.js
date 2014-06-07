// ==UserScript==
// @name           Ikariam City Select Reorder-er
// @author	overkill
// @namespace      overkill_gm
// @version	0.6
// @description    Lets you reorder your cities in the drop down
// @include        http://*.ikariam.*/*
// @exclude        http://board.ikariam.*
// ==/UserScript==

/*
Homepage: http://userscripts.org/scripts/show/27630

*/
function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

function getListOfCities(){
	var city, islandResource;
	var cities = $x("./option",$('citySelect'));
	for (var i = 0; i < cities.length; ++i) {
		idToCity[cities[i].value] = trim(cities[i].innerHTML);
		islandResource = '';
		if (cities[i].selected) {
			islandResource = getResourcesType();
			currentCityId = cities[i].value;
			currentCity = trim(cities[i].innerHTML);
			//debug("island Resource is " + islandResource);
		}
		city = cities[i].value.toString() + islandResource;
		currentCityList.push(city);
	}
}
function writeCitySelectHTML(){
	var optionParent = $('citySelect');
	var optionElems  = $x('./option',optionParent);
	var liParent     = optionParent.previousSibling.childNodes[1];
	var liElems      = liParent.getElementsByTagName('li');
	var oldOptions   = {};
	var oldLis       = {};
	var n_cities     = optionElems.length;
	var id, newLi;
	for (var i = n_cities-1; i >= 0; --i) {
		oldOptions[optionElems[i].value] = optionElems[i].cloneNode(true);
		newLi = liElems[i].cloneNode(true);
		newLi.className = newLi.className.replace(/( first)|( last)|( active)/g,'');
		oldLis[optionElems[i].value]  = newLi;
		optionParent.removeChild(optionElems[i]);
		liParent.removeChild(liElems[i]);
	}
	for (i = 0; i < n_cities; ++i) {
		id = myCityList[i].replace(/\D+/g,'');
		optionParent.appendChild(oldOptions[id]);
		newLi = oldLis[id];
		if (id == currentCityId) { newLi.className += ' active'; }
		if (i == 0) { newLi.className += ' first'; }
		if (i == n_cities-1) { newLi.className += ' last'; }
		onClick(newLi, selectCity, false);
		liParent.appendChild(newLi);
	}
}
/*
function writeCitySelectHTMLOld(){
	var list        = $('citySelect');
	var active      = list.previousSibling.childNodes[0];
	list            = list.previousSibling.childNodes[1];
	var optionElems = list.getElementsByTagName('li');
	var n_cities    = optionElems.length;
	var output      = '';
	var id,img,resource,className;
	for (var i = 0; i < n_cities; ++i) {
		id       = myCityList[i].replace(/\D+/g,'');
		resource = myCityList[i].replace(/\d+/g,'');
		if (resource !== null) { img = '<img src="' + icon[resource] + '" height="14" alt="" \>'; }
		else { img = ''; }
		if (id==currentCityId) {
			className = 'class="active"';
			active.innerHTML = img + idToCity[id];
		} else {
			className = '';
		}
		output += '<li id="reorder'+id+'" ' + className + '>' + img + idToCity[id] + '</li>';
	}
	list.innerHTML = output;
	
	optionElems = list.getElementsByTagName('li');
	for (i = 0; i < n_cities; ++i) {
		onClick(optionElems[i], selectCity, false);
	}
	optionElems[0].className = "first";
	optionElems[optionElems.length-1].className = "last";
}
*/
// this doesn't quite work the way i want to, but it works, so i'm leaving it alone
function syncListOfCities(){
	//debug("syncListOfCities :  old " + myCityList);
	var n = myCityList.length;
	var n2 = currentCityList.length;
	//debug("syncing " + n + " to " + n2);
	var id, resource, saved_id, saved_resource;
	if ((n > 0) && (n == n2)) {
		for (var x = 0; x < n2; ++x){
			id       = currentCityList[x].replace(/\D+/,'');
			resource = currentCityList[x].replace(/\d+/,'');
			if (resource !== '') {
				for (var i = 0; i < n; ++i) {
					saved_id       = myCityList[i].replace(/\D+/,'');
					saved_resource = myCityList[i].replace(/\d+/,'');
					if ((saved_id == id) && (saved_resource != resource)) {
						myCityList[i] = currentCityList[x];
						//debug("Updated island " + id + " to have resource: " + resource);
						// i shold be breaking out of this for loop right here too, but I'm too lazy
					}
				}
			}
		}
	} else {
		//debug("syncListOfCities :  replaced " + myCityList);
		myCityList = currentCityList;
		return false;
	}
	//debug("syncListOfCities :  new " + myCityList);
	return true;
}

function getResourcesType() {
	var script = unsafeWindow.updateResources.toString();
	if (script.search(/value_wine/) != -1)         { return 'wine'; }
	else if (script.search(/value_marble/) != -1)  { return 'marble'; }
	else if (script.search(/value_crystal/) != -1) { return 'crystal'; }
	else if (script.search(/value_sulfur/) != -1)  { return 'sulfur'; }
	return '';
}


function saveListFromOption(){
	//debug("saving list");
  var li = $x("./li",$('city_reorder'));
	myCityList = [];
  for (var i = 0; i < li.length; i++) {
		myCityList.push(li[i].id.replace(/^reorder/,''));
	}
  debug('saving ' + uneval(myCityList));
	GM_setValue('cities',uneval(myCityList));
}

function moveUp(row){
	var clicked = this.parentNode;
	var cloned  = clicked.cloneNode(true);
	var ul = this.parentNode.parentNode;
	var li = ul.getElementsByTagName('li');
	for (var i = 1; i < li.length; ++i){
		if (li[i] == clicked) {
			cloned = ul.insertBefore(cloned,li[i-1]);
			ul.removeChild(clicked);
			spanUp   = cloned.childNodes[2];
			spanDown = cloned.childNodes[3];
			onClick(spanUp,   moveUp,   false);
			onClick(spanDown, moveDown, false);
			saveListFromOption();
		}
	}
	return true;
}

function moveDown(row){
	var clicked = this.parentNode;
	var cloned  = clicked.cloneNode(true);
	var ul = this.parentNode.parentNode;
	var li = ul.getElementsByTagName('li');
	for (var i = 0; i < li.length-1; ++i){
		if (li[i] == clicked) {
			cloned = ul.insertBefore(cloned,li[i+1].nextSibling);
			ul.removeChild(clicked);
			spanUp   = cloned.childNodes[2];
			spanDown = cloned.childNodes[3];
			onClick(spanUp,   moveUp,   false);
			onClick(spanDown, moveDown, false);
			saveListFromOption();
		}
	}
	return true;
}
function stripHTML(s){
  return s.replace(/<[^>]*>/g, "");
}
// called when a new city is chosen. rewrites the citySelect form and submits it
function selectCity(event){
	var optionParent = $('citySelect');
	var optionElems  = $x('./option',optionParent);
	var liParent     = optionParent.previousSibling.childNodes[1];
	var liElems      = liParent.getElementsByTagName('li');
	var n_cities     = optionElems.length;
	
	var x = 0;
	while ((x < n_cities) && (this != liElems[x])) { ++x; }
	if (x >= n_cities) {
		alert("An error has occured. Please Disable this script and contact the author.");
		return;
	}
	//debug(this.parentNode.parentNode.parentNode.parentNode.parentNode);
	for (var i = n_cities-1; i >= 0 ; --i) {
		optionElems[i].selected = i == x;
	}
	
	//debug(active.className);
	var active       = optionParent.previousSibling.childNodes[0];
	var newClass = liElems[x].className.match(/tradegood./);
	if (newClass) { active.className = "avatarCities "+newClass[0]+" dropbutton"; }
	active.innerHTML = liElems[x].innerHTML;
	// don't bother changing title
	
	var form = this.parentNode.parentNode.parentNode.parentNode.parentNode;	// errr... this is silly =P
	form.submit();
}

function getCoordOfCity(){
	// check if breadcrumbs correspond to currentCity
	var city = $x("//*[@class='city']",$('breadcrumbs'));
	if (city.length == 1) {
		if (city[0].firstChild.nodeValue == currentCity) { 
			var x = $('breadcrumbs');
			var match = x.innerHTML.match(/\[(.+)\]/);	// can't narrow this down any further since it's so inconsistent
			//debug(match[1]);
			if (match) { cityCoords[currentCityId] = match[1]; }
		}
	}
}

//rearrange Balances page
function reorderBalances(){
	var cities = $x(".//tr",$('balance'));
	var n = cities.length;
	var rows = {};
	var cityName, id, p;
	if ((n > 3) && (n == myCityList.length+2)) {
		var resultRow = cities[n-1];
		p = cities[0].parentNode;
		for (var i = n-2; i > 0; --i) {
			cityName = trim(cities[i].getElementsByTagName('td')[0].innerHTML);
			rows[cityName] = cities[i].cloneNode(true);
			p.removeChild(cities[i]);
		}
		for (i = 0; i < n-2; ++i) {
			id = myCityList[i].replace(/\D+/g,'');
			rows[idToCity[id]].className = (i % 2)?  "alt" : "";
			p.insertBefore(rows[idToCity[id]],resultRow)
		}
	}
}

// show options
function showOptions(){
	// from score linker
	//debug("showing options");
  var mybox = node("div", "", { textAlign: "center" });
	var opts  = '<h3>Reorder</h3>(will automatically save, no need to hit the "Save settings!" button)<br /><ul id="city_reorder" style=\"width:300px; margin-left:auto; margin-right:auto\">';
	var id, resource;
	//debug("myCityList.length " + myCityList.length);
	for (var i = 0; i < myCityList.length ; ++i) {
		id       = myCityList[i].match(/\d+/);
		resource = myCityList[i].match(/\D+/);
		opts += '<li id="reorder'+ myCityList[i] +'"><img src="' + icon[resource] + '" alt="" \><span style="padding-left: 10px; padding-right:15px; width:200px">' + idToCity[id] + '</span><span id="up'+id+'">&#9650;</span><span id="down'+id+'" cl>&#9660;</span></li>'+"\n";
	}
	opts += '</ul>';
	mybox.innerHTML = opts;
	
  var pwd = $('options_changePass');
  pwd.appendChild(mybox);
	
  //var up = $x('//li[@type="checkbox" and contains(@id,"Score")]');
	var ul = $('city_reorder');
  var up = ul.getElementsByTagName("span");
	//debug("up " + up.length);
  for (i = 0; i < up.length; i++) {
		if (up[i].id.search(/^up/) != -1) { onClick(up[i], moveUp, false); }
		else if (up[i].id.search(/^down/) != -1) { onClick(up[i], moveDown, false); }
		//up.onclick = "moveUp('this');";
	}
}

/**************************************** HELPER FUNCTIONS *********************************************/

function onClick(node, fn, capture, e) {
  node.addEventListener((e||"") + "click", fn, !!capture);
}

function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles) for (var prop in styles) n.style[prop] = styles[prop];
  if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}

function $(id) {
  return document.getElementById(id);
}

function $x( xpath, root ) {
  var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
  var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];
  switch (got.resultType) {
    case got.STRING_TYPE:
      return got.stringValue;
    case got.NUMBER_TYPE:
      return got.numberValue;
    case got.BOOLEAN_TYPE:
      return got.booleanValue;
    default:
      while (next = got.iterateNext())
        result.push( next );
      return result;
  }
}

function $X( xpath, root ) {
  var got = $x( xpath, root );
  return got instanceof Array ? got[0] : got;
}

function trim(str) {
	str = str.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}

function duration(seconds){
	var x = [Math.floor(seconds / 86400) ,	Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 ,	Math.round(seconds % 60) ];
	var y = ['d'                         , 'h'                            , 'm'                         , 's'];
	var r = [];
	for (var i = 0; i < x.length; ++i){ if (x[i] > 0) { r.push(x[i].toString() + y[i]); } }
	return r.join(' ');
}

function distance(r1,r2){
	if ((typeof r1 == "string") && (typeof r2 == "string")) {	// uhm, has to be a better way of doing this
		r1=r1.split(':');
		r2=r2.split(':');
		if (r1.length && r2.length){
			var x1 = r1[0];
			var x2 = r2[0];
			var y1 = r1[1];
			var y2 = r2[1];
			return Math.round(Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2))*100)/100;
		}
	}
	return false;
}

function writeTransportBoxHTML(){
	var ikNewElement = document.createElement('div');
	ikNewElement.id = 'transportBox';
	$('mainview').appendChild(ikNewElement);

	var list        = $('citySelect');
	list            = list.previousSibling.childNodes[1];
	var optionElems = list.getElementsByTagName('li');
	var n_cities    = optionElems.length;
	var output      = '';
	var id, coords, d, selected, dOutput;
	var curCoords = cityCoords[currentCityId];

	for (var i = 0; i < n_cities; ++i) {
		id       = myCityList[i].replace(/\D+/g,'');
		selected = (id == currentCityId) ? ' selected ' : '';
		if ((d = distance(curCoords,cityCoords[id])) !== false) { dOutput = ' (' + duration(60*20*(d+1)) + ')'; }
		else { dOutput = ''; }
		output += '<option value="'+id+'" ' + selected + '>' + idToCity[id] + dOutput + '</option>';
	}
	$("transportBox").innerHTML = "<form method=\"GET\" action=\"index.php\"><select name=\"destinationCityId\" onchange=\"this.parentNode.submit()\">"+output+"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /></form>";
}

// global variabless
var currentCity;
var currentCityId;
var currentCityList = []; // pre-re-ordrered list of cities
var idToCity = {};
var icon = {
		sulfur:"/skin/resources/icon_sulfur.gif",
		crystal:"/skin/resources/icon_glass.gif",
		marble:"/skin/resources/icon_marble.gif",
		wine:"/skin/resources/icon_wine.gif"
	};
var myCityList = eval(GM_getValue('cities','[]'));	// load saved order
var cityCoords = eval(GM_getValue('coords','({})'));	// load saved coordinates

getListOfCities();
getCoordOfCity();
syncListOfCities();
writeCitySelectHTML();

// save list
GM_setValue('cities',myCityList.toSource());
GM_setValue('coords',cityCoords.toSource());

// special pages
switch(document.body.id) {
	case 'options'  : showOptions(); break;
	case 'finances' : reorderBalances(); break;
}


// transporter code, based on  darkyndy's Ikariam: Ikariam Transporter
/*
GM_addStyle(
"" + <><![CDATA[
'#cityNav .dropbutton img { position:relative; top:2px; background:none; padding-right:4px; }' +
'#cityNav .optionList img { position:relative; top:2px; background:none; padding-right:4px; }' +	//the same, but i'm thinking about differentiating these two
'#transportBox { position:absolute; left:0px; top:28px; }' +
//'#transportBox { position:absolute; left:241px; top:175px; z-index:98;}' +
'#transportBox select { font-size:8pt; background-color:#fff7e2; border:0px none; width:16px; }' +
'#transportBox select:focus { width:auto; }'
]]></>);
*/
GM_addStyle(   
"" + <><![CDATA[
#cityNav .dropbutton img { position:relative; top:2px; background:none; padding-right:4px; }
#cityNav .optionList img { position:relative; top:2px; background:none; padding-right:4px; }
#transportBox { position:absolute; left:0px; top:28px; }
#transportBox select {
  font-size:8pt;
  background-color:#fff7e2;
  border: 0px none;
  margin: 0px;
  padding: 0px;
  width:16px;
}
#transportBox select:focus { width:auto; }
]]></>);

writeTransportBoxHTML();
