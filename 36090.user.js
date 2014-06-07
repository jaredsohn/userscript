var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Overkill Ikariam Hot Fixes
// @namespace      overkill_gm
// @description    Quick Fixes For A Variety of Ikariam Issues. Configuration and help is in the source code
// @version        2.15.2
// @include        http://s*.ikariam.*/index.php*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @homepage       http://userscripts.org/scripts/show/36090
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}

GM_config.init(scriptMetadata.name + ' <a href="'+scriptMetadata.homepage+'">v' + scriptMetadata.version+'</a>', {
  blockadeTime:{
    section : ['Custom Configuration Options'],
    label : 'Blockade Time',
    title : 'change default blockade duration, to disable, set to 1, max is 8',
    type  : 'int',
    size  : 1,
    _def  : 8,
  },
  expandTownNames:{
    section : ['Visual Tweaks'],
    label : 'Expand Town Names',
    title : 'Gets rid of ellipses and shows full town names in ISLAND view',
    type  : 'checkbox',
    _def  : true, 
  },
  expandCargo:{
    label : 'Expand Cargo',
    title : 'expand the cargo views in the TRADE FLEET view',
    type  : 'checkbox',
    _def  : true, 
  },
  shrinkScores:{
    label : 'Shrink Scores',
    title : 'slightly compacts highscore table so you can view more per screen',
    type  : 'checkbox',
    _def  : true, 
  },
  dualMil:{
    label : 'Split Personality Advisers',
    title : 'Gives you the choice of viewing frequently used secondary adviser views by dividing the advisers in half',
    type  : 'checkbox',
    _def  : true, 
  },
  rememberWsView:{
    label : 'Remember Workshop View',
    title : 'Forces Ikariam to go to the last workshop view you were using',
    type  : 'checkbox',
    _def  : true, 
  },
  linkifyMap:{
    section : ['Enhanced Functionality'],
    label : 'Linkify Map',
    title : 'make islands into clickable links in the WORLD view',
    type  : 'checkbox',
    _def  : true, 
  },
  loginRedirect:{
    label : 'Redirect When Logged Out',
    title : 'skip to the login page when you get the logged out error page',
    type  : 'checkbox',
    _def  : true, 
  },
  realLoading:{
    label : 'Show Loading Times',
    title : 'take loading times from your military advisor and show them in your TRADE FLEET view',
    type  : 'checkbox',
    _def  : true, 
  },
  smartTransport:{
    label : 'Smart Transport Amounts',
    title : 'Enter the number of cargo ships or total amount of resources you want to send',
    type  : 'checkbox',
    _def  : true, 
  },
  predictPopulation:{
    section : ['Supplemental Information'],
    label : 'Predict Population',
    title : 'adds an indicator in the TOWN HALL view for when that town will be full',
    type  : 'checkbox',
    _def  : true, 
  },
  garrisonCount:{
    label : 'Garrison limit count',
    title : 'shows unit count towards your garrison limit in your TOWN HALL view',
    type  : 'checkbox',
    _def  : true, 
  },
  finance:{
    label : 'Supplemental Finances Info',
    title : 'show other useful info when viewing FINANCES',
    type  : 'checkbox',
    _def  : true, 
  },
  selfSpy:{
    section : ['Spying'],
    label : 'Self Spy',
    title : 'lets you spy on yourself to test spy defenses',
    type  : 'checkbox',
    _def  : true, 
  },
  spyTimes:{
    label : 'Spy arrival times',
    title : 'Shows how long it will take a spy to arrive at a town instead of the time it will arrive',
    type  : 'checkbox',
    _def  : true, 
  },
  spyWarehouse:{
    label : 'Warehouse Spy Reports',
    title : 'Guesses how many cargo ships to empty a warehouse. If you\'re lucky; will figure out the safe levels too',
    type  : 'checkbox',
    _def  : true, 
  },
},

""+<><![CDATA[
  body { font-family: sans-serif, helvetica, arial; }
  #config_header { font-size: 20px; text-align: right; }
  .section_header { -moz-border-radius: 6px 6px 0 0; margin: 0; }
  .section_header_holder { background: #eee; margin-top: 10px; padding-bottom: 3px; -moz-border-radius: 6px; }
  .config_var { margin: 0 3px; font-size: 13px; }
  .field_label { display : inline-block; min-width : 250px; }
  a { text-decoration: none; }
  a:hover { text-decoration: underline; }
]]></>


);
GM_registerMenuCommand('Configure '+scriptMetadata.name,GM_config.open);

//************************ END CONFIGURATION **************************//

var loadingImg = 'data:image/gif;base64,'+
    'R0lGODlhEAAQAPMAAP/vwP/vwP/vwP7uv/7uv/7uv/7uv/7uv/7uv/7uv/7uv/7uvwAAAAAAAAAA'+
    'AAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJ'+
    'CgAAACwAAAAAEAAQAAAEKxDISau9OE/Bu//cQBTGgWDhWJ5XSpqoIL6s5a7xjLeyCvOgIEdDLBqP'+
    'lAgAIfkECQoAAAAsAAAAABAAEAAABCsQyEmrvThPwbv/XJEMxIFg4VieV0qaqCC+rOWu8Yy3sgrz'+
    'oCBHQywaj5QIACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/9xhFMlAYOFYnldKmqggvqzl'+
    'rvGMt7IK86AgR0MsGo+UCAAh+QQJCgAAACwAAAAAEAAQAAAEMRDISau9OE/Bu/+cghxGkQyEFY7l'+
    'mVYraaKqIMpufbc0bLOzFyXGE25AyI5myWw6KREAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThP'+
    'wbv/nKQgh1EkA0GFwFie6SqIpImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAs'+
    'AAAAABAAEAAABDYQyEmrvThPwbv/HKUgh1EkAyGF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa6yYD'+
    'OYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThPwbv/nKUgh1EkAxFWY3mmK9WaqCqI'+
    'JA3fbP7aOFctNpn9QEiPZslsOikRACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704T8G7/xymIIex'+
    'EOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAEJhDISau9OE/B'+
    'u/+cthBDEmZjeWKpKYikC6svGq9XC+6e5v/AICUCACH5BAkKAAAALAAAAAAQABAAAAQrEMhJq704'+
    'T8G7/xy2EENSGOE1lmdqrSYqiGTsVnA7q7VOszKQ8KYpGo/ICAAh+QQJCgAAACwAAAAAEAAQAAAE'+
    'MRDISau9OE/Bu/+ctRBDUhgHElZjeaYr1ZqoKogkDd9s/to4Vy02mf1ASI9myWw6KREAIfkECQoA'+
    'AAAsAAAAABAAEAAABDYQyEmrvThPwbv/HLUQQ1IYByKF01ie6SqIpImqACu5dpzPrRoMpwPwhjLa'+
    '6yYDOYuaqHRKjQAAIfkECQoAAAAsAAAAABAAEAAABDYQyEmrvThPwbv/nLQQQ1IYB0KFwFie6SqI'+
    'pImq29zWMC6xLlssR3vdZEWhDwBqejTQqHRKiQAAIfkECQoAAAAsAAAAABAAEAAABDEQyEmrvThP'+
    'wbv/3EIMSWEciBWO5ZlWK2miqiDKbn23NGyzsxclxhNuQMiOZslsOikRADsAAAAAAAAAAAA=';

function debug() { var msg = []; for (var i = 0, n = arguments.length; i<n; ++i) msg.push(arguments[i]); setTimeout(function() { throw new Error("[debug] " + msg.join(' ')); }, 0);}

$ = document.getElementById;
function $x( xpath, root ) { var doc = root ? root.evaluate ? root : root.ownerDocument : document, next; var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = []; switch (got.resultType) { case got.STRING_TYPE: return got.stringValue; case got.NUMBER_TYPE: return got.numberValue; case got.BOOLEAN_TYPE: return got.booleanValue; default: while (next = got.iterateNext()) result.push( next ); return result; } } 
function $X( xpath, root ) { var got = $x( xpath, root ); return got instanceof Array ? got[0] : got; } 
function node(type, className, styles, content) { var n = document.createElement(type||"div"); if (className) n.className = className; if (styles) for (var prop in styles) n.style[prop] = styles[prop]; if (content) n.innerHTML = "string" == typeof content ? content : content.toXMLString(); return n; } 
function remove(node){ if (node) return node.parentNode.removeChild(node); }
function onClick(node, fn, capture, e) { node.addEventListener((e||"") + "click", fn, !!capture); }
function stripHTML(s){ return s.replace(/<[^>]*>/g, ""); }
function trim(str) {
	var	str = str.replace(/^\s\s*/, ''),
		ws = /\s/,
		i = str.length;
	while (ws.test(str.charAt(--i)));
	return str.slice(0, i + 1);
}
function serialize(name,val){
  if(document.domain)
      GM_setValue(name+'_'+document.domain , uneval(val));
}
function deserialize(name, def) {
  if(document.domain)
      return eval(GM_getValue(name+'_'+document.domain , (def || '({})') ));
}

function itime2Date(ikariamTime){
	var dateTimeString,thisDate,month,day,year,thisTime,hour,minute,second;
	dateTimeString = (ikariamTime || document.getElementById('servertime').innerHTML).split(" ");
	thisDate = dateTimeString[0].split(".");
	year     = parseInt(thisDate[2],10);
	month    = parseInt(thisDate[1],10) - 1;
	day      = parseInt(thisDate[0],10);
	thisTime = dateTimeString[1].split(":");
	hour     = parseInt(thisTime[0],10);
	minute   = parseInt(thisTime[1],10);
	second   = parseInt(thisTime[2] || 0,10);
	return new Date(year,month,day,hour,minute,second).getTime();
}
function fmtNumber(n) { // a similar snippet worth investigating is on wiki.greasepot.net
  var separator = unsafeWindow.LocalizationStrings['thousandSeperator'] || ',';
  if (!isNaN(n)) {
    n = Math.floor(n);
    var isNeg = (n < 0); n += ""; for (var i = (n.length - 3); i > isNeg; i -= 3) { n = n.slice(0, i) +separator+ n.slice(i); } return n;
  } else return n;
}
function getTrailingId(s){ return parseInt(s.substring(s.lastIndexOf('=') + 1),10); }

function durationHMS(seconds,depth){
  var temp = unsafeWindow.LocalizationStrings['timeunits']['short'], ret = [], prefix = '';
  if (seconds == 0) { return 'now'; }
  else if (seconds < 0) { seconds = -seconds; prefix = '-'; }
	var x = [ Math.floor(seconds / 86400) , Math.floor(seconds/3600) % 24 ,	Math.floor(seconds/60) % 60 , Math.ceil(seconds % 60) ];
	var y = [ temp.day                    , temp.hour                     , temp.minute,                  temp.second  ];
	for (var i = 0; i < x.length; ++i){ if (x[i] != 0) { ret.push(x[i].toString() + y[i]); } }
  if (depth && depth<ret.length) return prefix + ret.slice(0,depth).join(' ');
  else return prefix + ret.join(' ');
}
function hmsToSeconds(string){
  var units = unsafeWindow.LocalizationStrings['timeunits']['short'];  //{day:"D", hour:"h", minute:"m", second:"s"}
  var re = new RegExp("(\\d+"+units.day+")?\\s?(\\d+"+units.hour+")?\\s?(\\d+"+units.minute+")?\\s?(\\d+"+units.second+")?");
  var parsed = string.match(re);
  var seconds = (parseInt(parsed[1] || 0,10)*24*60*60) + (parseInt(parsed[2] || 0,10)*60*60) + (parseInt(parsed[3] || 0,10)*60) + parseInt(parsed[4] || 0,10);
  return seconds;
}
function addDynamicBox(title,content,position,id){
  if (document.body.id == 'renameCity') return;
  if (document.body.id == 'militaryAdvisorDetailedReportView') return;
  position = position || 0;
  var output;
  if (!title) {
    output = node('div','dynamic','',content);
    if (id) output.id = id;
  }
  else output = node('div','dynamic','','<h3 class="header">'+title+'</h3><div class="content"'+ (id ? ' id="'+id+'"' : '') +'>'+content+'</div><div class="footer"/>');
  var dynamicElement = $('breadcrumbs'), dynamicElements = $x("//div[contains(@class,'dynamic')]");
  if (position < dynamicElements.length) {
    dynamicElement = dynamicElements[position];
  } else if (dynamicElements.length && position >= dynamicElements.length) {
    dynamicElement = dynamicElements[dynamicElements.length-1];
  }
  return dynamicElement.parentNode.insertBefore(output,dynamicElement.nextSibling);
}

var temp;

function predictPopulationOverfull() {
  function _(s){
    var l = {
      en: { full:'Full in: ', stable:'Stable in: '}
    }
    var local = unsafeWindow.LocalizationStrings.language || 'en'; //For i18n
    return l[local][s] || '';
  }
  var satisfaction, curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "", happy;
	
	var ulstats = $X('.//ul[@class="stats"]',$('CityOverview'));
	if (ulstats) {
	  happy               = +$X('.//div[@class="value"]', $('happinessLarge')).textContent;
		curPopulation	    	= Number(ulstats.childNodes[1].childNodes[1].textContent);
		satisfaction        = curPopulation + happy;
		maxPopulationSpace	= Number(ulstats.childNodes[1].childNodes[3].textContent);
		
		//debug(" current : " + curPopulation + "\n maxSpace : " + maxPopulationSpace + "\n happy : " + happy + "\n satisfaction : " + satisfaction);

    var status = "full";
    if (curPopulation > 0 && maxPopulationSpace > 0) {
      if ((satisfaction <= maxPopulationSpace)) {
        timeLeftEx = 1/0.02*Math.log(Math.abs(happy));
        status = "stable"
      } else {
        timeLeftEx = 1/0.02*(Math.log(happy)-Math.log(satisfaction-maxPopulationSpace));
      }
      if ((satisfaction <= maxPopulationSpace) && (happy > 0)) {
        msg_extra  = "* (" + satisfaction + ")";
      }
      if (Math.abs(timeLeftEx) == Infinity) timeLeftEx = 0;
      var edit = $X('./div/span[last()]', $("happiness_small"));
      edit.innerHTML = _(status) + durationHMS(timeLeftEx*3600,2) + msg_extra;
		}
	}
}

function _linkifyMap(){
  var id, data, area, islands = unsafeWindow.map.islands, areas = $x('//a[@class="islandLink"]');
  //debug(uneval(islands));
  for (var i = areas.length; area = areas[--i]; ) { // should be faster than 'for each'
    data = area.href.substring(area.href.lastIndexOf('#')+1).split(':');
    if (id = islands[parseInt(data[0],10)][parseInt(data[1],10)][0]) {
      //var elemId = area.parentNode.id.replace('link_tile','');
      //$('cities'+elemId).innerHTML = islands[parseInt(data[0],10)][parseInt(data[1],10)][5];
      area.style.cursor = 'crosshair';
      area.href = "?view=island&id="+id;
    }
  }
}


// adviser backported awesome changes from http://userscripts.org/scripts/show/58179
var SplitPersonalities = function(){
  function init() {
    military();
    research();
    diplomat();
    style();
  }
  function style(){
    GM_addStyle(
         "#advisors #advMilitary a.normalevil{background-image:url(/skin/layout/advisors/general_premium.gif)}"
       + "#advisors #advMilitary a.normalactiveevil{background-image:url(/skin/layout/advisors/general_premium_active.gif)}"
       + "#advisors #advMilitary a.normalalertevil{background-image:url(/skin/layout/advisors/general_premium_alert.gif)}"
       + "#advisors #advMilitary a.premiumevil{background-image:url(/skin/layout/advisors/general.gif)}"
       + "#advisors #advMilitary a.premiumactiveevil{background-image:url(/skin/layout/advisors/general_active.gif)}"
       + "#advisors #advMilitary a.premiumalertevil{background-image:url(/skin/layout/advisors/general_alert.gif)}"

       + "#advisors #advResearch a.normalevil{background-image:url(/skin/layout/advisors/scientist_premium.gif)}"
       + "#advisors #advResearch a.normalalertevil{background-image:url(/skin/layout/advisors/scientist_premium_active.gif)}"
       + "#advisors #advResearch a.premiumevil{background-image:url(/skin/layout/advisors/scientist.gif)}"
       + "#advisors #advResearch a.premiumalertevil{background-image:url(/skin/layout/advisors/scientist_active.gif)}"

       + "#advisors #advDiplomacy a.normalevil{background-image:url(/skin/layout/advisors/diplomat_premium.gif)}"
       + "#advisors #advDiplomacy a.normalalertevil{background-image:url(/skin/layout/advisors/diplomat_premium_active.gif)}"
       + "#advisors #advDiplomacy a.premiumevil{background-image:url(/skin/layout/advisors/diplomat.gif)}"
       + "#advisors #advDiplomacy a.premiumalertevil{background-image:url(/skin/layout/advisors/diplomat_active.gif)}"

       + "#advisors a.twin:hover{ opacity:0.8; -moz-transform: rotate(5deg); }"
    );
  }
  function splitAdviser(id, rightTitle, leftTitle) {
    var original = document.getElementById(id).getElementsByTagName('a')[0];
    var copy = original.cloneNode(false);
    copy.className += "evil twin";
    copy.setAttribute('style', "width:51px; height:86px; position:absolute; background-position:right top; top:0; right:0;");
    document.getElementById(id).appendChild(copy);
    copy.title += leftTitle ? " (" + leftTitle + ")" : '';
    original.title += rightTitle ? " (" + rightTitle + ")" : '';
    return [original, copy];
  }
  function military() {
    var original, copy;
    [original, copy] = splitAdviser('advMilitary', 'Troop Movements', 'Combat Reports');
    original.href  = original.href.replace(/militaryAdvisorCombatReports/,'militaryAdvisorMilitaryMovements');
    copy.href  = original.href.replace(/militaryAdvisorMilitaryMovements/,'militaryAdvisorCombatReports');
  }
  function diplomat() {
    var original, copy;
    [original, copy] = splitAdviser('advDiplomacy', 'Inbox', 'Alliance');
    copy.href      = "/index.php?view=diplomacyAdvisorAlly";
  }
  function research() {
    var library = GM_getValue('library'+gameServer);
    if (library) {
      var original, copy;
      [original, copy] = splitAdviser('advResearch', '', 'Library');
      copy.href = $X('.//a',node('div','','',library)).href;
    }
  }
  return {
    init:init,
  }
}();

var garrisonCount = function(){
  function getForce(viewportId,collection){
    var sum = 0;
    for each (var unit in collection){
      sum += parseInt(trim(unit.nodeValue),10);
    }
    var counts = eval(GM_getValue('garrisonCount_'+gameServer)) || {};
    counts[viewportId] = sum;
    GM_setValue('garrisonCount_'+gameServer,uneval(counts));
    return !!sum;
  }
  function insertBefore(newNode,node){ return node.parentNode.insertBefore(newNode,node); }
  function troops(viewportId){
    return '<a href="index.php?view=cityMilitary-army&id='+viewportId+'">?</a>';
  }
  function init(){
    switch (document.body.id){
      case 'cityMilitary-army' :
      case 'cityMilitary-fleet' :
        var viewportId = getTrailingId($X('//*[@id="breadcrumbs"]/a[@class="city"]').href);
        getForce(viewportId,$x('//div[starts-with(@id,"tab")]/div[1]//table/tbody/tr[2]/td[text()>0]/text()'));
      break;
      case 'barracks' :
      case 'shipyard' :
        var viewportId = getTrailingId($X('//*[@id="breadcrumbs"]/a[@class="city"]').href);
        getForce(viewportId,$x('//div[@class="unitinfo"]/div[1][text()>0]/text()'));
      break;
      case 'blockade' :
      case 'plunder' :
        var viewportId = parseInt($X('//*[@id="citySelect"]/option[@selected="selected"]').value,10);
        getForce(viewportId,$x('//ul[@class="assignUnits"]/li/div[1]/text()'));
      break;
      case 'townHall' :
        var viewportId = getTrailingId($X('//*[@id="breadcrumbs"]/a[@class="city"]').href);
        var counts = eval(GM_getValue('garrisonCount_'+gameServer)) || {};
        insertBefore(
          node('span','','', (isNaN(counts[viewportId]) ? troops(viewportId) : counts[viewportId]) + '/') ,
          $X('//li[@class="garrisonLimit"]/span[@class="value occupied"]')
        );
      break;
    }
  }
  return {
    init:init,
  }
}();

// dependencies/inheritied : $x, node, itime2Date, durationHMS
var countdown = function(){
  function main(){
    var end, now = itime2Date();
    for each (var elem in $x('//*[@class="countdown"]')) {
      if (end = elem.getAttribute('rel').split(',')) {
        if (end[0] > now) elem.innerHTML = durationHMS((end[0]-now)/1000,end[1]);
        else { elem.innerHTML = '-'; elem.className = elem.className.replace(/countdown/,''); }
      }
    }
  }
  function init(){
    this.updateTimer = setInterval(main,1000);
  }
  function make(nodeType,end,depth){
    var now  = itime2Date();
    var elem = node(nodeType,'countdown','',durationHMS((end-now)/1000,depth));
    elem.setAttribute('rel',end+','+(depth || ''));
    return elem;
  }
  return {
    init: init,
    make: make,
  }
}();

// dependencies/inheritied : $x, $X, getTrailingId, itime2Date, serialize, deserialize, hmsToSeconds, countdown
var loading = {
  _merchantNavy : function(){
    var now = itime2Date() / 1000;
    var loading = deserialize('loading') || {};
    // this loop might be more efficient if i look up the other way, but too lazy to change it
    for each (var row in $x("//div[@id='mainview']/div/div[1]/table/tbody/tr[td[5] = 'loading']")){
      var me    = getTrailingId($X('./td[@class="source"]/a[1]',row).href);
      var notme = getTrailingId($X('./td[@class="target"]/a[1]',row).href);
      var date  = loading[me+'|'+notme];
      if (date && (date > now)) {
        $X('./td[5]',row).appendChild(countdown.make('div',date*1000));
      }
    }
  },
  _militaryAdvisorMilitaryMovements : function(){
    var loading = {};
    var now = itime2Date() / 1000;
    //find estimated
    for each (var row in $x("//div[@id='fleetMovements']//tr[td/img/@src='skin/resources/icon_time.gif']")) {
      var action = $X('./td[6]',row).title;
      if (action.indexOf('loading') != -1) {
        var date  = $X('./td[2]',row).innerHTML;
        var me    = getTrailingId($X('./td[4]/a[1]',row).href);
        var notme = getTrailingId($X('./td[8]/a[1]',row).href);
        loading[me+'|'+notme] = now + hmsToSeconds(date);
      }
    }
    serialize('loading',loading);
  },
};
// ********************* START *************************************
if ($('servertime')) {
countdown.init();
var gameServer = document.domain.replace(/ikariam\./,'');

var titleInfo = '';
switch (document.body.id) {
  case 'barracks' :
  case 'shipyard' :    
    var setDisplay = function(elem,value){ if (elem) elem.style.display = value; }
    var save = function(){
      var hiddenUnits = [];
      for each (var u in $x("./span",hiddenList)) hiddenUnits.push(u.innerHTML);
      GM_setValue('hiddenUnits',uneval(hiddenUnits));
    }
    var unhideUnitCtrl = function(unit){
      if (typeof(unit) == 'string') unit = [ unit ];
      for each (var u in unit) {
        setDisplay($X('//li[@class="unit '+u+'"]'),'none');
        onClick(hiddenList.appendChild(node('span','',{cursor:'pointer',paddingRight:'5px'},u)),function(e){
          setDisplay($X('//li[@class="unit '+this.innerHTML+'"]'),'');
          remove(this);
          save();
        });
      }
    }
    var hideUnitCtrl = function(unit){
      onClick($X("./div[1]/h4[1]",unit).appendChild(node('span','',{fontSize:'smaller',paddingLeft:'2px',verticalAlign:'super',color:'gray',cursor:'pointer'},'[&#8211;]')),function(e){ 
        //debug(unit , unit.style.display , unit.className);
        unit.style.display = 'none';
        unhideUnitCtrl(unit.className.replace(/unit /,''));
        save();
      });
    }
    var hiddenList = $('units').parentNode.appendChild(node('div','',{color:'gray',fontSize:'11px'},''));
    unhideUnitCtrl(eval(GM_getValue('hiddenUnits',[])));
    for each (var unit in $x("//ul[@id='units']/li")) { hideUnitCtrl(unit); }
  break;
  case 'blockade' :
    // ADD NEW OPTION TO DROP DOWN
    $('time').innerHTML = '<option value="0">0</option>' + $('time').innerHTML;
    // SET DEFAULT BLOCKADE DURATION
    var blockadeTime = GM_config.get('blockadeTime');
    if (blockadeTime != 1) {
      blockadeTime *= 3600;
      var opt = $X("//select[@id='time']/option[@value='"+blockadeTime+"']");
      if (opt) opt.selected = "selected"; // should i be operating on the select element instead? whatever this works
    }
  break;

  case 'embassy' :
    onClick($X("//*[@id='memberList']/thead/tr/th[3]").appendChild(node('span','',{cursor:'pointer'},'[+]')),function(){
      GM_addStyle('#mainview .cityInfo ul li ul { display:block; font-size: 10px; left:0; line-height:normal; margin:0; position:static;}');
    });
  break;
  case 'embassyGeneralAttacksToAlly' :
    if (location.href.indexOf('embassyGeneralAttacksToAlly')){
      var content = $X('.//div[@id="mainview"]/div[2]/div[@class="content"]').innerHTML;
      GM_setValue('embassyGeneralAttacksToAlly'+gameServer,location.href);
      GM_setValue('embassyGeneralAttacksToAllyBox'+gameServer,content);
    }
    break;
  case 'errorLoggedOut' :
    if (GM_config.get('loginRedirect:')) {
      var link = $X("//div[@id='text']/a");
      link = link.href ? link.href : 'http://ikariam.org';  // hard coded, oh well, shouldn't matter anyways
      document.location.replace(link);
    }
  break;
  case 'finances' :
    if (GM_config.get('finance')) {
      var hourlyIncome = +$X("//div[@id='mainview']/table[last()]/tbody/tr[4]/td[4]/text()").nodeValue.replace(/,/g,'');
      var gold = +$X("//table[@id='balance']/tbody[1]/tr/td[4]").innerHTML.replace(/,/g,'');
      //debug(hourlyIncome,gold);
      if (hourlyIncome > 0)
        $('balance').innerHTML += "<tbody>"
          +'<tr class="result"><td class="sigma">Per Day</td><td class="value res"/><td class="value res"/><td class="value res">'+fmtNumber(hourlyIncome*24)+'</td></tr>'
          +'<tr class="result"><td class="sigma">1 Million Gold Every</td><td class="value res"/><td class="value res"/><td class="value res">'+durationHMS(1e6/hourlyIncome*60*60)+'</td></tr>'
          +'</tbody>';
      else if (hourlyIncome < 0)
        $('balance').innerHTML += "<tbody>"
          +'<tr class="result"><td class="sigma">Per Day</td><td class="value res"/><td class="value res"/><td class="value res">'+fmtNumber(hourlyIncome*24)+'</td></tr>'
          +'<tr class="result"><td class="sigma">Empty In</td><td class="value res"/><td class="value res"/><td class="value res">'+durationHMS(-gold/hourlyIncome*60*60)+'</td></tr>'
          +'</tbody>';
    }
  break;
  case 'highscore' :
    if (GM_config.get('shrinkScores')) GM_addStyle('td.action img { height: 12px; }')
  break;
  case 'island' :
    if (true){  // show your deployedCities
      var citySelect = $('citySelect');
      $x('//ul[@id="cities"]/li[contains(@class,"city level")]').forEach(function(cityElem){
        var city_a = $X('./a',cityElem);
        if (city_a) {
        var temp,id = $X('./a',cityElem).id.substr(5);
          if (temp = $X('./option[@value="'+id+'"][contains(@class,"deployed")]',citySelect))
              cityElem.insertBefore(node('div','occupied ownOccupier'),cityElem.firstChild);  //.treatyOccupier yellow   .allyOccupier green    ownOccupier blue  foreignOccupier red
          // if ul.cityinfo > li.spy
        }
      });
    }
    
    if (GM_config.get('selfSpy')) { // todo, make more versatile, work w/ islands where you're alone
      var selfID = $X('//select[@id="citySelect"]/option[@selected="selected"]').value;
      var root = $('city_'+selfID);
      var toCloneNode = $X('//li[@class="espionage"]');
      if (root && toCloneNode){
        var cloneID = $X('../../a',toCloneNode).id.replace(/\D+/g,'');
        var spyNode = toCloneNode.cloneNode(true);
        spyNode.innerHTML = spyNode.innerHTML.replace(cloneID,selfID);
        $X('..//ul[@class="cityactions"]',root).appendChild(spyNode);
      }
    }
    
    if (GM_config.get('expandTownNames')) {
      for each (var cityElem in $x('./li[contains(@class,"city level")]', $('cities'))){
        var label, temp, name, status = '';
        //debug(trim(stripHTML($X('.//span[@class="textLabel"]',cityElem).innerHTML)));
        label = $X('.//span[@class="textLabel"]',cityElem);
        status = trim(stripHTML(label.innerHTML)).substr(-3);
          switch(status) {
            case '(i)' :
            case '(v)' :
            case '(x)' :
              status = ' ' + status
            break;
            default :
              status = '';
            break;
          }
        
        if (temp = $X('./table[@class="cityinfo"]/tbody/tr[@class="name"]/td[2]/text()',cityElem))
          name = temp.nodeValue;
          //var output = ''
        for (var i = 2,n = label.childNodes.length-2;i<n;++i){
          if (label.childNodes[i].innerHTML || (label.childNodes[i].nodeValue && trim(label.childNodes[i].nodeValue))) {
            //output += i + ' / ' + n + ' ' + label.childNodes[i] + label.childNodes[i].innerHTML + label.childNodes[i].nodeValue + "\n";
            if (label.childNodes[i].innerHTML) { label.childNodes[i].innerHTML = name + status; }
            else { label.childNodes[i].nodeValue = name + status; }
            break;
          }
        }
      }
    }
  break;
  case 'merchantNavy' :
    if (GM_config.get('expandCargo')) {
      setTimeout(function(){
        $x(".//div[@class='pulldown']/div[@class='content']",$('mainView')).forEach(function(pulldown,i) {
          var payload = {},newContent = '',
              payloads = $x(".//div[@class='payload']/img",pulldown);
          for (var j = 0; j<payloads.length; ++j) payload[payloads[j].title] = '';
          for (var item in payload) newContent += "<li>"+item+"</li>";
          pulldown.appendChild(node('ul','',{'marginLeft':'5em'},newContent));
          pulldown.style.height='auto';
        });
      },1);
    }


    if (GM_config.get('realLoading')) loading._merchantNavy();

  break;

  case 'militaryAdvisorReportView' :
    // add town name to <title> element for browsing history
    if ($('ergebnis'))  // pre Ikariam 0.3.2 update
    titleInfo = $X("//table[@id='ergebnis']/tbody/tr[1]/td/a").innerHTML;
    else  {
      var defender = $X("//div[@id='troopsReport']//div[starts-with(@class,'defender')]/span");
      if (defender) {
        titleInfo = stripHTML(defender.innerHTML);
      }
    }
  break;
  case 'militaryAdvisorMilitaryMovements' :
    if (GM_config.get('realLoading')) loading._militaryAdvisorMilitaryMovements();
      // layout hotfix
    //GM_addStyle('#militaryAdvisorMilitaryMovements #combatsInProgress .eventbar .status { float:none;} ');
  break;
  case 'academy' :
    GM_setValue('library'+gameServer,$('researchLibrary').innerHTML);
  break;
  case 'safehouseReports':
    if (GM_config.get('spyWarehouse') && $('resources')) {
      $X('//table[@id="resources"]').appendChild(node('tbody'));
      var sum = 0, safe = 0, lootableSum = 0, temp;
      for each (var amount in $x('//table[@id="resources"]/tbody/tr/td[2]')) {
        temp = parseInt(amount.innerHTML.replace(/\D/g,''));
        sum += temp;
        if (temp % 80 == 20) safe = temp;
      }
      $X('//table[@id="resources"]/tbody[2]').innerHTML += '<tr><td class="unitname"><img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" alt="Cargo Ships" title="Cargo Ships"></td><td class="count">'+Math.ceil(sum/500)+'</td></tr>'
      if (safe) {
        for each (var amount in $x('//table[@id="resources"]/tbody[1]/tr/td[2]')) {
          temp = parseInt(amount.innerHTML.replace(/\D/g,''));
          if (temp <= safe) {
            amount.style.color = '#900';
            amount.style.fontWeight = 'bold';
          }
          lootableSum += Math.max(parseInt(amount.innerHTML.replace(/\D/g,'')) - safe,0);
        }
        var warehouseLvl = (safe-20/80);
        $X('//table[@id="resources"]/tbody[2]').innerHTML += '<tr><td class="unitname"><img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" alt="Cargo Ships Guess" title="Cargo Ships (guess)"></td>'
        + '<td class="count" title="Based on a warehouse level: '+warehouseLvl+'">'+Math.ceil(lootableSum/500)+'</td></tr>';
      }
    }
  break;
  case 'sendSpy':
    if (GM_config.get('spyTimes')) {
      var temp = $X("//div[@id='missionSummary']/div[1]/div[2]/text()");
      if (temp) temp.nodeValue = durationHMS((itime2Date(temp.nodeValue) - itime2Date())/1000);
    }
  break;
  case 'townHall':
    if (GM_config.get('predictPopulation')) predictPopulationOverfull();
  break;
  case 'transport' :
    if (GM_config.get('smartTransport')) {
      var availableCargoships = parseInt($X('//div[@id="globalResources"]/ul[1]/li[2]/a/span[2]').innerHTML,10);
      $x('//*[@id="transportGoods"]//input[@class="textfield"]').forEach(function(slider){
        slider.addEventListener("change", function(){
          if (this.value <= availableCargoships) {
            this.value*=500;
            var evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            this.dispatchEvent(evt);
          }
        }, false);
      });
    }
  break;
  case 'workshop' :
    if (GM_config.get('rememberWsView')) {
      var tabs = $x('//div[@id="demo"]/ul/li');
      onClick(tabs[0],function(){ GM_deleteValue('rememberWsView'+gameServer); });
      onClick(tabs[1],function(){ GM_setValue('rememberWsView'+gameServer,'1'); });
      if (GM_getValue('rememberWsView'+gameServer)){
        tabs[0].className = '';         $('tab1').style.display = 'none';
        tabs[1].className = 'selected'; $('tab2').style.display = 'block';
      }
    }
  break;
  case 'worldmap_iso' :
    if (GM_config.get('linkifyMap')) {
      onClick($X('//div[@id="mapCoordInput"]/input[@name="submit"]'),_linkifyMap);
      for each (var elem in $x('//div[@id="mapControls"]/ul[@class="scrolling"]/li/a')) onClick(elem,_linkifyMap);
      _linkifyMap();
    }
  break;
  default :
}
document.title += ' - ' + document.body.id + (titleInfo ? ' (' + titleInfo + ')': '');


  // split personality military advisor
  if (GM_config.get('dualMil')) {
    SplitPersonalities.init();
  }

  if (GM_config.get('garrisonCount')) {
    garrisonCount.init();
  }
}

(function(){
  var embassyGeneralAttacksToAlly = GM_getValue('embassyGeneralAttacksToAlly'+gameServer);
  if (embassyGeneralAttacksToAlly) {
    GM_addStyle('#okGeneral br {display:none;} #okGeneral {font-size:10px;}');
    var box = addDynamicBox('<a href="'+embassyGeneralAttacksToAlly+'">Attacks On Alliance</a> <a href="'+embassyGeneralAttacksToAlly.replace(/ToAlly/,'FromAlly')+'">(From)</a> <span style="cursor:pointer;" title="refresh">&#8634</span>&nbsp;<span style="cursor:pointer;" title="clear">&#9747;</span>',GM_getValue('embassyGeneralAttacksToAllyBox'+gameServer,''),100,'okGeneral');
    if (box) {
      onClick($X('./h3/span[1]',box),function(){
        $('okGeneral').innerHTML = '<span style="color:gray; font-style:italic;">' + $('okGeneral').innerHTML + '</span>';
        GM_xmlhttpRequest({
          'method'  : 'GET',
          'url'     : embassyGeneralAttacksToAlly,
          'onload'  : function(responseDetails) {
              var div = node('div','','',responseDetails.responseText);
              var content = $X('.//div[@id="mainview"]/div[2]/div[@class="content"]',div);
              remove($X('.//tr[1]',content));
              $('okGeneral').innerHTML = content.innerHTML;
              GM_setValue('embassyGeneralAttacksToAllyBox'+gameServer,content.innerHTML);
            }
        });
        }
      );
      onClick($X('./h3/span[2]',box),function(){
        GM_deleteValue('embassyGeneralAttacksToAlly'+gameServer);
        GM_deleteValue('embassyGeneralAttacksToAllyBox'+gameServer);
        remove(this.parentNode.parentNode);
        }
      );
    }
  }

  /*
  if ($x('//select[@id="citySelect"]/../div/ul/li').length > 20) {
    GM_addStyle("#cityNav .citySelect .optionList li { height:18px; }");
  }
  */
  //.getElementsByTagName('li').length);
  

// Remove Useless Back Links

  var selectors = [
    '#transport #backTo',
    '#renameCity #backTo',
    '#backTo'
  ];
  //GM_addStyle(  selectors.join(',') + " { display:none; } "  );
  GM_addStyle(  "#container #backTo { display:none; } #backTo {display:none;} "  );
})();


GM_addStyle(
  '#facebook_button, #viewMilitaryImperium { display:none !important; }'
);



  
  // Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 id: '36090', // Script id on Userscripts.org
 days: 7, // Days to wait between update checks

 // Don't edit after this line, unless you know what you're doing ;-)
 name: scriptMetadata.name,
 version: scriptMetadata.version,
 time: new Date().getTime() | 0,
 call: function(response) { GM_xmlhttpRequest({ method: 'GET', url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js?update', headers: { 'User-agent': window.navigator.userAgent, 'Accept': 'application/atom+xml,application/xml,text/xml', }, onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);} }); }, 
 compare: function(xpr,response) { this.xversion=/\/\/\s*@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1]; this.xname=/\/\/\s*@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1]; if ( (this.xversion != this.version) && (confirm('A new version of the '+this.xname+' user script is available. Do you want to update?')) ) { GM_setValue('updated', this.time); GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js'); } else if ( (this.xversion) && (this.xversion != this.version) ) { if(confirm('Do you want to turn off auto updating for this script?')) { GM_setValue('updated', 'off'); GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call('return');}); alert('Automatic updates can be re-enabled for this script from the User Script Commands submenu.'); } else { GM_setValue('updated', this.time); } } else { if(response) alert('No updates available for '+this.name); GM_setValue('updated', this.time); } }, 
 check: function() { if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time); if ( (GM_getValue('updated', 0) != 'off') && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*this.days))) ) { this.call(); } else if (GM_getValue('updated', 0) == 'off') { GM_registerMenuCommand("Enable "+this.name+" updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);}); } else { GM_registerMenuCommand("Check "+this.name+" for updates", function(){GM_setValue('updated', new Date().getTime() | 0);CheckScriptForUpdate.call(true);}); } } 
};
if (self.location == top.location && GM_xmlhttpRequest) CheckScriptForUpdate.check();















