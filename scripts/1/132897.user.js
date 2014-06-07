var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Ikariam City Select Reorder-er
// @author         overkill
// @namespace      overkill_gm
// @modified	   Faber
// @version        4.4
// @description    Lets you reorder your cities in the drop down
// @homepage       http://userscripts.org/scripts/show/132897
// @include        http://s*.ikariam.*/index.php*
// @include        http://m*.ikariam.*/index.php*
// @history		   4.4 Implemented City Reorder-er in museum view
// @history		   4.4 Moved settings from account data to game options
// @history		   4.3a Corrected bug for City Reorder-er in finances view
// @history		   4.3 Implemented City Reorder-er in finances view
// @history		   4.3 Implemented City Reorder-er in palace and palaceColony view
// @history		   4.3 Implemented City Reorder-er in port view
// @history		   4.3 Implemented City Reorder-er in tradeAdvisor view
// @history		   4.2 Corrected the parseMetadata code to work with Greasemonkey 0.9.18
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){
//	new code
	var headGM = function(x) {
        // return true if x is from the GM headers
        var RegExp = /\/\/ @/;
        return String(x).match(RegExp);
    } 
	var b=a.split(/[\r\n]+/).filter(headGM);
//	var b=a.split(/[\r\n]+/).filter(/\/\/ @/);  // old code
	var c={include:[],exclude:[]};
	for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);
	if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c
	}
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
    var parentElem = $('options_debug').parentNode;  // an arbitrary element with an id was chosen
//    var parentElem = $('options_changePass').parentNode;  // an arbitrary element with an id was chosen
    return parentElem.insertBefore(node("div", "", { textAlign: "center" },content),$X('./div['+place+']',parentElem));
  }
  var element, id;
  var opts  = '<h3><a href="http://userscripts.org/scripts/show/132897" target=_blank>Reorder Towns</a> v'+scriptMetadata['version']
  +' (Modified by <a href="http://userscripts.org/users/466106" target=_blank>Faber</a> - Original by <a href="http://userscripts.org/users/53907" target=_blank>Overkill</a>)'
  +'</h3><i>(will automatically save, no need to hit the "Save settings!" button)</i><br />'
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


//rearrange Balances page (new code by Faber)
function reorderBalances(){
	var cities = $x("//table[@id='balance']/tbody/tr");					//	Why the /tbody is necessary and what it does, I don't know, but now it works.... Looked it up, used for grouping, makes more sense now.
	var n = cities.length;
//	n = number of /tr
//	cities[0] 	(1st row) contains gold amount
//	cities[1] 	(2nd row) contains headers
//	cities[2] 	(3rd row) contains first city
//	cities[n-2]	(row n-1) contains last city
//	cities[n-1]	(row n  ) contains resultRow (Totals)
//	So n-3 is the total number of cities
	var row = {};
	var cityName, p;
	var cityCount = 0;
	var resultRow = cities[n-1]; // last row contains result/total
	p = cities[1].parentNode; // 	First city in city table
//	Let's match the selfCache[myCityList] with the cities and insert the cities row in order just before the totals
	for (var i = 0; i < myCityList.length; ++i) {  					// 	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {  		
																	//	Only continue if it is NOT an occupied AND NOT a deployed city 
			for (var j = 2; j < n-1; ++j) {							// 	cities[2] is the first city & cities[n-2] the last
				cityName = trim(cities[j].getElementsByTagName('td')[0].innerHTML);
				if (selfCache[myCityList[i]].name == cityName) {
					row = cities[j];
					row.className = (cityCount % 2)?  "alt" : ""; 	//	I don't understand the syntax, but I know what it does -> alternate dark/light and it works
					++cityCount;
					p.insertBefore(row,resultRow);
					j = n 											//	end loop, row is processed, there is probably a better statement, but don't know it.
				} 
			} 
		}
	}
}

//rearrange Balances page (old code)
/*
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
} */

//rearrange Imperium on palace and on palaceColony page (new code by Faber)
function reorderImperium(){
	var cities = $x("//table[@class='table01']/tbody/tr");
//	cities[0] 	(1st row) contains first city
//	table also contains occupied or deployed cities. Don't know how to exclude these rows. Doesn't seem te be necessary.
	var row = {};
	var cityName;
	var cityCount = 0;
//	cityCount: count number of cities (exclude occupied or deployed cities)
//	This is necessary because cities[] also contains the occupied harbours & cities. So can't use cities.length
	for (var i = 0; i < myCityList.length; ++i) {  					// 	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {
			++cityCount;
		}
	}
	var p = cities[0].parentNode									//	First element in table
	var hatch = 0;
//	Let's match the selfCache[myCityList] with the cities and insert the cities row in order just before the occupied harbours/cities
	for (var i = 0; i < myCityList.length; ++i) {  					//	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {  		
																	//	Only continue if it is NOT an occupied AND NOT a deployed city 
			for (var j = 0; j < cityCount; ++j) {					// 	cities[0] is the first city & cities[cityCount-1] the last
				cityName = trim(cities[j].getElementsByTagName('td')[1].innerHTML);
																	//	2nd td contains name city
				if (selfCache[myCityList[i]].name == cityName) {
					row = cities[j];
					row.className = (hatch % 2)?  "alt" : ""; 		//	I don't understand the syntax, but I know what it does -> alternate dark/light and it works. Looks nicer than original
					++hatch;
					p.appendChild(row);
					j = cityCount									//	end loop, row is processed, there is probably a better statement, but don't know it.
				} 
			} 
		}
	}
}


//rearrange cities on TradeRoute part of page (new code by Faber)
function reorderTradeRoute(){
	var tradeRouteStart = $x("//li[@class='startCity']");
	var tradeRouteEnd = $x("//li[@class='endCity']");
	var row = {};
	var tradeStart = tradeRouteStart[0].getElementsByTagName('option');
	var tradeEnd = tradeRouteEnd[0].getElementsByTagName('option');
	var n = tradeStart.length;
	var p = tradeStart[0].parentNode; 										// First element in table
	var q = tradeEnd[0].parentNode; 										// First element in table
//	n = number of cities + 1
//	tradeStart[0] 	(1st row) contains header
//	tradeStart[1] 	(2nd row) contains first city
//	tradeStart[n-1] (row n  ) contains last city
	var cityName;
//	cityCount: count number of cities (exclude occupied or deployed cities)
//	for (var i = 0; i < myCityList.length; ++i) {  					// 	myCityList also includes occupied or deployed cities
//		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {
//			++cityCount;
//		}
//	}
//	Let's match the selfCache[myCityList] with the cities and insert the cities row in order just before the totals
	for (var i = 0; i < myCityList.length; ++i) {  					// 	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {  		
																	//	Only continue if it is NOT an occupied AND NOT a deployed city 
			for (var j = 1; j <= n; ++j) {							// 	tradeStart/End[0] is the first city & tradeStart/End[n-1] the last
				cityName = trim(tradeStart[j].innerHTML);
				if (selfCache[myCityList[i]].name == cityName) {
					row = tradeStart[j];
					p.appendChild(row);
					row = tradeEnd[j];
					q.appendChild(row);
					j = n 											//	end loop, row is processed, there is probably a better statement, but don't know it.
				} 
			} 
		}
	}
}

//rearrange cities on port page (new code by Faber)
function reorderPort(){
//First rearrange cities on TradeRoute part of page -> reorderTradeRoute();
	reorderTradeRoute();
//
//	var cities = $x("//ul[@class='cities clearfix']"); var cityBox = cities[0].getElementsByTagName('li');
//		Does the same as var cityBox = $x("//ul[@class='cities clearfix']/li");
//		Without /li -> one row, with /li a row per /li tag
	var cityBox = $x("//ul[@class='cities clearfix']/li");
	var n = cityBox.length;
	var p = cityBox[0].parentNode; 										// First element in table
//	cityBox[0] 	 (1st row) contains first city
//	cityBox[n-1] (row n  ) contains last city
//	active city is never shown, so n+1 equals number of cities
	var row = {};
	var cityName;
//	Let's match the selfCache[myCityList] with the cities and insert the cities row in order just before the totals
	for (var i = 0; i < myCityList.length; ++i) {  						// 	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {  		
																		//	Only continue if it is NOT an occupied AND NOT a deployed city 
			for (var j = 0; j < n; ++j) {								//  cityBox[0] is the first city & cityBox[n-1] the last
				cityName = trim(cityBox[j].getAttribute('title'));
//				cityBox[j].innerHTML = cityName							//	Was for testing
				if (selfCache[myCityList[i]].name == cityName) {
//					cityBox[j].innerHTML = cityName + n;					//	Was also for testing
					row = cityBox[j];
					p.appendChild(row);
					j = n 												//	end loop, row is processed, there is probably a better statement, but don't know it.
				} 
			} 
		}
	}
}

//rearrange cities on Cultural Treaties assign page (new code by Faber)
function reorderCultural(){
	var cities = $x("//div[@id='moveCulturalGoods']");
	var cityBox = cities[0].getElementsByTagName('li');				// Can't get it to work in another way. But it works
	var n = cityBox.length;
	var p = cityBox[0].parentNode; // 	First city in city table
//	n = number of /li -> number of cities
//	cityBox[0] 		(1st row) contains first city
//	cityBox[n-1]	(row n  ) contains last city
	var row = {};
	var cityName;
//	Let's match the selfCache[myCityList] with the cities and insert the cities row in order just before the totals
	for (var i = 0; i < myCityList.length; ++i) {  					// 	myCityList also includes occupied or deployed cities
		if (!selfCache[myCityList[i]].occupiedCities && !selfCache[myCityList[i]].deployedCities) {  		
																	//	Only continue if it is NOT an occupied AND NOT a deployed city 
			for (var j = 0; j < n; ++j) {							// 	cityBox[0] is the first city & cityBox[n-1] the last
				cityName = trim(cityBox[j].getElementsByTagName('div')[0].innerHTML);
																	//	First Div contains name of city
				if (selfCache[myCityList[i]].name == cityName) {
					row = cityBox[j];
					p.appendChild(row);
					j = n 											//	end loop, row is processed, there is probably a better statement, but don't know it.
				} 
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
      GM_addStyle("#overkillTransport { background:wheat; font-size:8pt; border: 0 none; margin:0; padding:0; height:15px; }");
      GM_addStyle("#overkillTransport option { padding: 0; }");
      $(transporterContainer).appendChild(node('div','',{position:'absolute',top:'-11px'},html));
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
	if (document.body.id == 'finances') reorderBalances();
	if (document.body.id == 'palace' || document.body.id == 'palaceColony') reorderImperium();
	if (document.body.id == 'tradeAdvisorTradeRoute') reorderTradeRoute();
	if (document.body.id == 'port') reorderPort();
	if (document.body.id == 'culturalPossessions_assign') reorderCultural();
  }
  if (document.body.id == 'options' && document.getElementById('options_debug')) showOptions();
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