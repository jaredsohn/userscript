var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Ikariam City Select Reorder-er
// @author         overkill
// @namespace      overkill_gm
// @version        4.1
// @description    Lets you reorder your cities in the drop down
// @homepage       http://userscripts.org/scripts/show/27630
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}
function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}
function stripHTML(s){ return s.replace(/<[^>]*>/g, ""); }
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); return node; }
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles) for (var prop in styles) n.style[prop] = styles[prop];
  if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function $(id) { return document.getElementById(id); }
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
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; }
function trim(str) {
	str = str.replace(/^\s\s*/, '');
	var ws = /\s/;
	var i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}
function in_array(needle, haystack) { for (var key in haystack) if (haystack[key] == needle) return true; return false; }
function durationHMS(seconds,depth){
  var temp = unsafeWindow.LocalizationStrings['timeunits']['short'], ret = [], prefix = '';
  if (seconds == 0) { return '0'; }
  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
	var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
	var y = [ temp.day                    , temp.hour                     , temp.minute,                  temp.second  ];
	for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
  else return prefix + ret.join(' ');
}
function distance(r1,r2){
	if (r1 && r2 && (typeof r1 == "string") && (typeof r2 == "string")) {	// uhm, has to be a better way of doing this
		r1=r1.split(':');
		r2=r2.split(':');
		if (r1.length && r2.length)	return Math.round(Math.sqrt(Math.pow(r1[0]-r2[0],2) + Math.pow(r1[1]-r2[1],2))*100)/100;
	}
	return false;
}
function generateSelfCache(){
  var cache = {},
  localization = unsafeWindow.LocalizationStrings.resources;
  // deployedCities coords
  // occupiedCities coords
  // coords
  
  //tradegoodX
  //deployedCities tradegood
  //occupiedCities tradegood  ?
  $x('./option',$('citySelect')).forEach(function(town){
    var townClasses = town.className.split(' ');
    switch (townClasses[townClasses.length-1]) {
      case 'coords' :
        // COORDS in town navigation
        cache[town.value] = {
          'name'     : town.innerHTML.replace('&nbsp;',' ').replace(/\[[0-9:\s]+\]\s+/,''),
          'position' : town.innerHTML.match(/\[([0-9:\s]+)\]/,'')[1].replace(/00/g,'100'),
        };
        if (town.title.indexOf(localization[1]) != -1) cache[town.value].tradegood = 1;
        else if (town.title.indexOf(localization[2]) != -1) cache[town.value].tradegood = 2;
        else if (town.title.indexOf(localization[3]) != -1) cache[town.value].tradegood = 3;
        else if (town.title.indexOf(localization[4]) != -1) cache[town.value].tradegood = 4;
        if (townClasses.length > 1) cache[town.value][townClasses[0]] = true;
      break;
      default :
        // TRADE GOOD in town navigation
        var coords = town.title;
        coords     = coords.substr(1,coords.length-2);
        cache[town.value] = {
          'name'      : town.innerHTML,
          'position'  : coords,
          'tradegood' : +town.className.charAt(town.className.indexOf('tradegood')+9),
        };
        if (townClasses.length > 1) cache[town.value][townClasses[0]] = true;
    }
  });
  //debug(uneval(cache));
  return cache;
}

function writeCitySelectHTML(){
	var optionParent = $('citySelect'), oldOptions = {};

	$x('./option',optionParent).forEach(function(optionElem,i){
		oldOptions[optionElem.value] = optionElem;
	});
	myCityList.forEach(function(id,i){
		optionParent.appendChild(oldOptions[id]);
	});
}

///////////////////////////////////////// START OPTIONS
function showOptions(){
  function moveUp(){
    var clicked = this.parentNode;
    clicked.parentNode.insertBefore(clicked,clicked.previousSibling);
    saveListFromOption();
  }
  function moveDown(){
    var clicked = this.parentNode;
    clicked.parentNode.insertBefore(clicked,clicked.nextSibling.nextSibling);
    saveListFromOption();
  }
  // will add content to the OPTIONS page in place-th place (optional) and encapsulate it in a div. returns the DIV element of the options
  function addOptionsToPage(content,place){
    place = place || 5; // place must be > 0 and a number
    var parentElem = $('options_changePass').parentNode;  // an arbitrary element with an id was chosen
    return parentElem.insertBefore(node("div", "", { textAlign: "center" },content),$X('./div['+place+']',parentElem));
  }
  var element, id;
  var opts  = '<h3>Reorder Towns v'+scriptMetadata['version']+' (by <a href="http://userscripts.org/users/281685">Sathington Willoughby</a>)</h3><i>(Use the "Save settings!" button to refresh)</i><br />'
  +'<br/>Collect: <span class="button">Mine</span><span class="button">Deployed</span><span class="button">Occupied</span><br/><br/>'
  +'<ul id="city_reorder" style="width:300px; margin:3px auto;">';
	for (var i = 0; i < myCityList.length ; ++i) {
		id    = myCityList[i];
    var style = '';
    if (selfCache[id].deployedCities) style = ' class="deployedCities"';
    else if (selfCache[id].occupiedCities) style = ' class="occupiedCities"';
		opts += '<li id="reorder'+ myCityList[i] +'"'+style+'><span>' + selfCache[id].name + '</span><span class="ok_up">&#9650;</span><span class="ok_down">&#9660;</span></li>';
	}

	opts += '</ul>Put Transport Helper<select>';
  opts += '<option' + ((transporterContainer == '')                ? ' selected' : '') + ' value="">disabled</option>';
  opts += '<option' + ((transporterContainer == 'globalResources') ? ' selected' : '') + ' value="globalResources">top</option>';
  opts += '<option' + ((transporterContainer == 'mainview')        ? ' selected' : '') + ' value="mainview">bottom</option>';
  opts += '<option' + ((transporterContainer == 'Overkill Bar')    ? ' selected' : '') + '>Overkill Bar</option>';
	opts += '</select>';
  var newDiv = addOptionsToPage(opts,3);
  newDiv.id = "options_cityOrder";

  for each (element in $x('.//span[@class="ok_up"]'  ,newDiv)){ onClick(element,moveUp); }
  for each (element in $x('.//span[@class="ok_down"]',newDiv)){ onClick(element,moveDown); }
  onClick($X('.//span[@class="button"][1]',newDiv),function(){
    $x('./li',$('city_reorder'))
    .sort(function(a,b){ return  (b.className == "") - (a.className == ""); })
    .forEach(function(element){ $('city_reorder').appendChild(element); });
    saveListFromOption();
  });
  onClick($X('.//span[@class="button"][2]',newDiv),function(){
    $x('./li',$('city_reorder'))
    .sort(function(a,b){ return (b.className == "deployedCities") - (a.className == "deployedCities"); })
    .forEach(function(element){ $('city_reorder').appendChild(element); });
    saveListFromOption();
  });
  onClick($X('.//span[@class="button"][3]',newDiv),function(){
    $x('./li',$('city_reorder'))
    .sort(function(a,b){ return (b.className == "occupiedCities") - (a.className == "occupiedCities"); })
    .forEach(function(element){ $('city_reorder').appendChild(element); });
    saveListFromOption();
  });
  //onClick($X('.//select',newDiv),saveListFromOption);
  $X('.//select',newDiv).addEventListener("change", saveListFromOption, false);
  GM_addStyle(
  '#city_reorder span:first-child { display:inline-block; width: 200px; }'
  + '#city_reorder span + span { cursor: pointer; }'
  + '#city_reorder > .deployedCities { background-color:#BBF4A3 }'
  + '#city_reorder > .occupiedCities { background-color:#FFC6BF }'
  );
}
function saveListFromOption(){
	myCityList = $x("./li",$('city_reorder'))
  .map(function(elem){ return parseInt(elem.id.replace(/^reorder/,''),10); });

  //debug('saving ' + uneval(myCityList));
  //debug('saving use_bar ' + $X('..//select',$('city_reorder')).value);
	GM_setValue('cities_'+server,uneval(myCityList));
  GM_setValue('use_bar',$X('..//select',$('city_reorder')).value);
}
///////////////////////////////////////// END OPTIONS


//rearrange Balances page
function reorderBalances(){
	var cities = $x("//table[@id='balance']/tbody/tr");
	var n = cities.length;
	if (n > 3) {
    var row, rows = {};
    var cityName, p;
		var resultRow = cities[n-2];
		p = cities[0].parentNode;
		for (var i = n-3; i > 0; --i) {
			cityName = trim(cities[i].getElementsByTagName('td')[0].innerHTML);
			if (!rows[cityName]) rows[cityName] = p.removeChild(cities[i]); // if multiple cities have the same name, ignore after the 1st city
		}
		for (i = 0; i < myCityList.length; ++i) {
      if (row = rows[selfCache[myCityList[i]].name]){
        row.className = (i % 2)?  "alt" : "";
        p.insertBefore(row,resultRow);
      }
    }
	}
}

function writeTransportBoxHTML(){
  var html = "<form method='get' action='index.php' style='float:right;'><select id='overkillTransport' name='destinationCityId' onchange='this.parentNode.submit()'>"
  +myCityList.map(function(id){
    var d;
		var dOutput  = ((d = distance(selfCache[currentCityId].position,selfCache[id].position)) !== false) ? ' (' + durationHMS(Math.max(1200*d,600)) + ')' : '';
    return '<option value="'+id+'"'
      +(id==currentCityId ? ' selected="selected"' : '')
      +(selfCache[id].deployedCities ? ' class="deployedCities"' : '')
      +(selfCache[id].occupiedCities ? ' class="occupiedCities"' : '')
      +'>' + selfCache[id].name + dOutput + '</option>'
  }).join('')
  +"</select><input type=\"hidden\" name=\"view\" value=\"transport\" /></form>";
  switch (transporterContainer) {
    case 'mainview' :
      GM_addStyle("#overkillTransport { background:wheat; font-size:8pt; border: 0 none; margin:0; padding:0; height:15px; }");
      GM_addStyle("#overkillTransport option { padding: 0; }");
      $(transporterContainer).appendChild(node('div','',{position:'absolute'},html));
    break;
    case 'globalResources' :
      GM_addStyle("#overkillTransport { background:cornsilk; font-size:7pt; border: 1 none; margin:1; padding:0; height:15px; width:175px; }");
      GM_addStyle("#overkillTransport option { padding: 0; }");
      $(transporterContainer).appendChild(node('div','',{position:'absolute',top:'-11px',left:'120px'},html));
    break;
    case 'Overkill Bar' :
      GM_addStyle("#overkillTransport { font-size:8pt; border: 0 none; margin: 0 0 0 4px; padding:0; height:15px; }");
      GM_addStyle("#overkillTransport option { padding: 0; }");
      var barTab = overkillBar(html+'Transport');
      overkillBar_add(barTab,'<a href="'+scriptMetadata['homepage']+'">Version: '+scriptMetadata['version']+'</a>');
      overkillBar_add(barTab,'<a href="/index.php?view=options#city_reorder">Change Options</a>');
    break;
  }
  GM_addStyle(
    '#overkillTransport > .deployedCities { background-color:#BBF4A3 }'
    + '#overkillTransport > .occupiedCities { background-color:#FFC6BF }'
  );
}

if ($('servertime') && unsafeWindow.IKARIAM){
  // global variabless
  var server = document.domain;
  var currentCityId   = parseInt($X('//select[@id="citySelect"]/option[@selected]').value,10);
  var selfCache       = generateSelfCache();
  var myCityList      = eval(GM_getValue('cities_'+server,[]));    // load saved order
  var transporterContainer = GM_getValue('use_bar','globalResources');

  // reconcile saved list of cities with current list of cities
  var change = false;
  for (var i = myCityList.length-1; i>=0; --i)
      if (!selfCache[myCityList[i]]) { myCityList.splice(i,1); change = true; }
  for (var id in selfCache) {
    id = parseInt(id,10);
    if (!in_array(id,myCityList)) { myCityList.push(id); change = true; }
  }
  if (change) GM_setValue('cities_'+server,uneval(myCityList));

  if (myCityList.length > 1) {
    writeCitySelectHTML();
    //if (document.body.id == 'finances') reorderBalances();
  }
  if (document.body.id == 'options') showOptions();
  if (transporterContainer) writeTransportBoxHTML();
}






/*
OVERKILL BAR -- add everything below this to script to enable the overkill bar. Add a new tab and initialize the bar with

  var tab = overkillBar('tab title');

*/
function overkillBar(title){
  if (!$('overkillBar')){
    var div = node('div','','','<ul></ul>');
    div.id = "overkillBar";
    document.body.appendChild(node('div','',{"height":"3em;"},'&nbsp;'));
    document.body.appendChild(div);
    var ul = $X('./ul',div);
    ul.appendChild(node('li','','','<h2 style="font-weight:bold;">OVERKILL</h2><ul><li><a href="http://userscripts.org/users/53907/scripts">Homepage</a></li></ul>'));
    //test
    //styleBar();
    //production
    GM_addStyle('#overkillBar ul{margin:0;padding:0;border:0;list-style-type:none;display:block}#overkillBar ul li{margin:0;padding:0;border:0;display:block;float:left;position:relative;z-index:5}#overkillBar ul li:hover{z-index:10000}#overkillBar ul li li{float:none}#overkillBar ul ul{visibility:hidden;position:absolute;z-index:10;left:0;bottom:0}#overkillBar ul li:hover>ul{visibility:visible;bottom:100%}#overkillBar ul li li:hover>ul{bottom:0;left:100%}#overkillBar ul:after,#overkillBar ul ul:after{content:".";height:0;display:block;visibility:hidden;overflow:hidden;clear:both}#overkillBar ul ul{ background:none;padding:30px 30px 10px 30px;margin:0 0 -10px -30px}#overkillBar ul ul ul{padding:30px 30px 30px 10px;margin:0 0 -30px -10px}#overkillBar{ position:fixed; bottom:0px; width:100%; z-Index:10}#overkillBar h2{ font-size:14px}#overkillBar ul{color:#eee;background:#234}#overkillBar ul ul li{color:#eee;background:#234; font-size:smaller}#overkillBar ul ul{width:15em}#overkillBar ul a{text-decoration:none;color:#eee;padding:.4em 1em;display:block;position:relative}#overkillBar ul a:hover,#overkillBar ul li:hover>a{color:#fc3}#overkillBar ul li{ padding:3px; white-space:nowrap}#overkillBar ul li{border:1px solid #ccc}#overkillBar ul>li+li{border-left:0}#overkillBar ul ul>li+li{border-left:1px solid}#overkillBar ul ul>li+li{border-top:0}#overkillBar ul li li:hover>ul{bottom:5px;left:90%}#overkillBar em{ font-style:italic}');
  }
  var ul = $X('./ul',$('overkillBar'));
  var tab = ul.appendChild(node('li','','','<h2>'+title+'</h2>'));
  return tab.appendChild(node('ul','','',''));
}
function overkillBar_add(barTab,content){
  return barTab.appendChild(node('li','','',"string" == typeof content ? content : content.toXMLString()));
}
function overkillBarOptions(barTab){
  var gameServer = document.domain.replace(/ikariam\./,'');
  this.save = function(){
    var copy = {};
    for (thing in this)
      if ((typeof this[thing] !== 'function') && (typeof this[thing] !== 'object'))
        copy[thing] = this[thing];
      //debug("save : "+uneval(copy));
    GM_setValue('_okbarOptions_'+gameServer,uneval(copy));
  }
  this.setTab = function(barTab){
    this.barTab = barTab;
  }
  this.addInput = function(label,defaultValue){
    var options = this;
    var labelName = stripHTML(label);
    //debug(label + ' ' + labelName);
    if (!options[labelName]) { options[labelName] = defaultValue || ''; }
    var ctrl = options.barTab.appendChild(node('li','',{cursor:'pointer'},label+': '+(options[labelName]?options[labelName]:'not set')));
    onClick(ctrl,function(){
      var newValue = prompt('New '+labelName,options[labelName]);
      if (newValue !== null) options[labelName] = newValue;
      this.innerHTML = label+': '+(options[labelName]?options[labelName]:'not set');
      options.save();
    });
  }
  this.addCB = function(label,defaultValue){
    var options = this;
    var labelName = trim(stripHTML(label));
    //debug(label + ' ' + labelName);
    if (typeof options[labelName] != 'boolean') { options[labelName] = !!defaultValue; }
    var ctrl = options.barTab.appendChild(node('li','',{cursor:'pointer'},label+' '+(options[labelName]?'&#10003':'')));
    onClick(ctrl,function(){
      options[labelName] = !options[labelName];
      this.innerHTML = label+' '+(options[labelName]?'&#10003':'');
      options.save();
    });
  }
  this.barTab = barTab;
  var options = eval(GM_getValue('_okbarOptions_'+gameServer),{});
  for (thing in options) this[thing] = options[thing];
}