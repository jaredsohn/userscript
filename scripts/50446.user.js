var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name           Overkill Ikariam Hot Fixes
// @namespace      overkill_gm
// @description    Quick Fixes For A Variety of Ikariam Issues. Configuration and help is in the source code
// @version        2.5
// @include        http://s*.ikariam.*/*
// @exclude        http://board.ikariam.*
// @homepage       http://userscripts.org/scripts/show/36090
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}

// You can hide units you don't care about in the barracks. these unit names should work for multiple languages
/*
var hiddenUnits = [
'phalanx',
'swordsman',
'marksman',
'archer',
'slinger',
'cook',
'medic',
'steamgiant',
'mortar',
'catapult',
'ram',
'bombardier',
'gyrocopter'
];
*/
var hiddenUnits = [
];

// disable Ikariam Plus features
var disablePlus = false; // hide Ikariam Plus elements

// expand the cargo views in the Trade Ship view
var expandTrade = true;

// make islands into clickable links
var linkifyMap  = false;

// change default blockade duration, to disable, set = 1, max is 8
var blockadeTime = 8;

// skip to the login page when you get the logged out error page
var errorLoggedOut_Redirect = true;

// slightly compacts highscore table to view more per screen
var highscore_resized = true;

// lets you spy on yourself to test spy defenses
var selfSpy = true;

// adds an indicator in the town hall view for when that town will be full
var predictPopulation = false;

//************************ END CONFIGURATION **************************//

var linkifyMapTimer;
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

function debug() { var msg = ''; for (var i = 0, n = arguments.length; i<n; ++i) msg += arguments[i] + ' '; setTimeout(function() { throw new Error("[debug] " + msg); }, 0);}
function ddebug() { }

$ = document.getElementById;

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
function node(type, className, styles, content) {
  var n = document.createElement(type||"div");
  if (className) n.className = className;
  if (styles)
    for (var prop in styles)
      n.style[prop] = styles[prop];
  if (content)
    n.innerHTML = "string" == typeof content ? content : content.toXMLString();
  return n;
}
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

function addDynamicBox(title,content,position,id){
  position = position || 0;
  var output = node('div','dynamic','','<h3 class="header">'+title+'</h3><div class="content"'+ (id ? ' id="'+id+'"' : '') +'>'+content+'</div><div class="footer"/>');
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
  var satisfaction;

  var msg_TimeLeft = {'en':'Full in: '};
  var msg_Days     = {'en':'d '};
  var msg_Hours    = {'en':'h '};
  var msg_Minutes  = {'en':'m '};
  var msg_Never    = {'en':'never'};

  function timeRealToString(rTime, lang) {
    var sDays, sHours, sMinutes, sResult;
    if (rTime > 0) {
      sDays = Math.floor(rTime / 24);
      sHours = Math.floor(rTime - sDays * 24);
      sMinutes = Math.floor((rTime - sDays * 24 - sHours) * 60);
      sResult = (sDays == 0)?"":String(sDays) + msg_Days[lang];
      sResult += (sHours == 0)?"":String(sHours) + msg_Hours[lang];
      sResult += sMinutes + msg_Minutes[lang];
    } else {
      sResult = msg_Never[lang] + "(Max: " + satisfaction + ")";
      //sResult = msg_Never[lang] ;
    }
    return sResult;
  }

	var curPopulation, maxPopulationSpace, timeLeftEx, msg_extra = "", happy;
	var lang = msg_TimeLeft[navigator.language] ? navigator.language : 'en';
	
	var ulstats = $('CityOverview').childNodes[3].childNodes[3];
	if (ulstats) {
	  happy               = parseInt($('SatisfactionOverview').childNodes[5].childNodes[3].textContent,10);
		curPopulation	    	= Number(ulstats.childNodes[1].childNodes[1].textContent);
		satisfaction        = curPopulation + happy;
		maxPopulationSpace	= Number(ulstats.childNodes[1].childNodes[3].textContent);
		
		//debug(" current : " + curPopulation + "\n maxSpace : " + maxPopulationSpace + "\n happy : " + happy + "\n satisfaction : " + satisfaction);

    if (curPopulation > 0 && maxPopulationSpace > 0) {
      if ((satisfaction < maxPopulationSpace) && (happy > 0)) {
        timeLeftEx = 1/0.02*Math.log(happy);
        msg_extra  = "* (" + satisfaction + ")";
      } else {
  			timeLeftEx = 1/0.02*Math.log(happy/(satisfaction-maxPopulationSpace));
      }
      //debug("timeLeft : " + timeLeftEx);
      var newNode = node('li','space',{position:'relative','top':'72px'},msg_TimeLeft[lang] + timeRealToString(timeLeftEx, lang) + msg_extra);
      var insertedElement = ulstats.appendChild(newNode);
      //alert("did it work?");
		}
	}
}

function _linkifyMap(){
  if (!$('overkillLoadingImg')) {
    var loading = node('img','',{ marginLeft: '1em'});
    loading.src = loadingImg;
    loading.id  = 'overkillLoadingImg';
    $('breadcrumbs').appendChild(loading);
  }
  linkifyMapTimer = setTimeout(remapMap,500);  // todo, trigger on ajax instead of fixed delay
}
function remapMap(){
  remove($('overkillLoadingImg'));
  var id, data, area, islands = unsafeWindow.map.islands, areas = $x('//a[@class="islandLink"]');
  for (var i = areas.length; area = areas[--i]; ) { // should be faster than 'for each'
    data = area.href.substring(area.href.lastIndexOf('#')+1).split(':');
    id = islands[parseInt(data[0],10)][parseInt(data[1],10)][0];
    if (id) {
      area.style.cursor = 'crosshair';
      area.href = "?view=island&id="+id;
    }
  }
}
function checkOption(name,style){
  $X('//*[@id="GF_toolbar"]/ul').appendChild(node('li','',style,"<a>"+name+"</a>"));
return true;
}



// START
var gameServer = document.domain.replace(/ikariam\./,'');

if (disablePlus) {
  var plusteaser = $x("//div[@id='advisors']//a[@class='plusteaser']");
  plusteaser.forEach(function(elem){ remove(elem); });
  plusteaser = $x("//div[@class='premiumExchange']");
  plusteaser.forEach(function(elem){ remove(elem); });
  var premiumIds = ['setPremiumTransports','viewCityImperium','viewMilitaryImperium','viewResearchImperium','viewDiplomacyImperium'];
  for each (var id in premiumIds) { remove($(id)); }
}
var titleInfo = '';
switch (document.body.id) {
  case 'barracks' :
    for each (var unit in hiddenUnits) { remove($X('//li[@class="unit '+unit+'"]')); }
  break;
  case 'blockade' :
    if (blockadeTime != 1) {
      blockadeTime *= 3600;
      var opt = $X("//select[@id='time']/option[@value='"+blockadeTime+"']");
      if (opt) opt.selected = "selected"; // should i be operating on the select element instead? whatever this works
    }
  break;
  case 'branchOffice' :
  break;
  case 'city' :
    if (disablePlus) remove($('reportInboxLeft'));
  break;
  case 'embassy' :
    GM_addStyle('#mainview .cityInfo ul li ul { display:block; font-size: 10px; left:0; line-height:normal; margin:0; position:static;}');
  break;
  case 'embassyGeneralAttacksToAlly' :
    if (location.href.indexOf('embassyGeneralAttacksToAlly')){
      var content = $X('.//div[@id="mainview"]/div[2]/div[@class="content"]').innerHTML;
      GM_setValue('embassyGeneralAttacksToAlly'+gameServer,location.href);
      GM_setValue('embassyGeneralAttacksToAllyBox'+gameServer,content);
    }
    break;
  case 'errorLoggedOut' :
    if (errorLoggedOut_Redirect) {
      var link = $X("//div[@id='text']/a");
      link = link.href ? link.href : 'http://ikariam.org';  // hard coded, oh well, shouldn't matter anyways
      document.location.replace(link);
    }
  break;
  case 'highscore' :
    if (highscore_resized) GM_addStyle('td.action img { height: 12px; }')
  break;
  case 'island' :
    if (checkOption('selfSpy')) {
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
    for each (var cityElem in $x('//ul[@id="cities"]/li[contains(@class,"city level")]')){
      var label,temp, name, status = '';
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
      
      if (temp = $X('./ul[@class="cityinfo"]/li[@class="name"][1]/text()',cityElem))
        name = temp.nodeValue;
        //var output = ''
      for (var i = 2,n = label.childNodes.length-2;i<n;++i){
        if (label.childNodes[i].innerHTML || (label.childNodes[i].nodeValue && trim(label.childNodes[i].nodeValue))) {
          //output += i + ' / ' + n + ' ' + label.childNodes[i] + label.childNodes[i].innerHTML + label.childNodes[i].nodeValue + "\n";
          if (label.childNodes[i].innerHTML) { label.childNodes[i].innerHTML = name + status; }
          else { label.childNodes[i].nodeValue = name + status; }
          break;
        //debug("found possible " + child.innerHTML);
        }
      }
      //debug(output);
      //debug("new name = " + name + status);

    }
  break;
  case 'merchantNavy' :
    if (expandTrade) {
      var pulldown,payloads,payload,newContent;
      for each(pulldown in $x(".//div[@class='pulldown']/div[@class='content']",$('mainView'))) {
        payload = {};
        payloads = $x(".//div[@class='payload']/img",pulldown);
        for (var j = 0; j<payloads.length; ++j) payload[payloads[j].title] = '';
        newContent = '';
        for (var item in payload) newContent += "<li>"+item+"</li>";
        pulldown.appendChild(node('ul','',{'marginLeft':'5em'},newContent));
        pulldown.style.height='auto';
      }
    }
  break;
  case 'militaryAdvisorReportView' :
    titleInfo = $X("//table[@id='ergebnis']/tbody/tr[1]/td/a").innerHTML;
  break;
  case 'safehouseReports':
    if ($('resources')) {
      var sum = 0;
      for each (var amount in $x('//table[@id="resources"]/tbody/tr/td[2]')) { sum += parseInt(amount.innerHTML.replace(/\D/g,'')); }
      $X('//table[@id="resources"]/tbody').innerHTML += '<tr><td class="unitname"><img src="skin/characters/fleet/40x40/ship_transport_r_40x40.gif" alt="Cargo Ships" title="Cargo Ships"></td><td class="count">'+Math.ceil(sum/500)+'</td></tr>'
    }
  break;
  case 'townHall':
    if (predictPopulation) {
      predictPopulationOverfull();
    }
  break;
  case 'worldmap_iso' :
    if (linkifyMap) {
      onClick($X('//div[@id="mapCoordInput"]/input[@name="submit"]'),_linkifyMap);
      for each (var elem in $x('//div[@id="mapControls"]/ul[@class="scrolling"]/li/a')) onClick(elem,_linkifyMap);
      _linkifyMap();
    }
  break;
  default :
}
document.title += ' - ' + document.body.id + (titleInfo ? ' (' + titleInfo + ')': '');


var embassyGeneralAttacksToAlly = GM_getValue('embassyGeneralAttacksToAlly'+gameServer);
if (embassyGeneralAttacksToAlly) {
  GM_addStyle('#okGeneral br {display:none;} #okGeneral {font-size:10px;}');
  var box = addDynamicBox('<a href="'+embassyGeneralAttacksToAlly+'">Attacks On Alliance</a> <span style="cursor:pointer;" title="refresh">&#8634</span>&nbsp;<span style="cursor:pointer;" title="clear">&#9747;</span>',GM_getValue('embassyGeneralAttacksToAllyBox'+gameServer,''),100,'okGeneral');
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