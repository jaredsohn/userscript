// ==UserScript==
// @name           OGame - Time2Titel
// @namespace      Woems
// @include        http://*.ogame.de*
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
} // $x("//a[@href]").forEach(function (a) {});
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
function createElement(type, attributes, parent){
  var node = document.createElement(type);
  for (var key in attributes) if (attributes.hasOwnProperty(key)) {
    if (key.charAt(0) == '@') node.setAttribute(key.substring(1), attributes[key]);
    else node[key] = attributes[key];
  }
  if (parent) parent.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function insertAfter(newNode, node) { return node.parentNode.insertBefore(newNode, node.nextSibling); }
function Interval(func, interval) { func(); window.setInterval(func,interval); } // Interval(function (){},1000);
function Timeout(func, interval) { window.setTimeout(func,interval); } // Timeout(function (){},1000);
function wait(c,f){ if (c()) f(); else window.setTimeout(function (){wait(c,f)},300,false); } //wait( function(){return count==0}, function(){alert('allfound')} );
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function get(url, cb) { GM_xmlhttpRequest({ method: "GET", url: url, onload: function(xhr) { var div=document.createElement("div"); div.innerHTML=xhr.responseText; cb(xhr.responseText,div,xhr); } }); }
// get("http://www.google.com", function inform(text,div,xhr) { GM_log(uneval(xhr)); });  // xhr.status, xhr.statusText, xhr.responseHeaders, xhr.responseText
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event); event.stopPropagation(); event.preventDefault(); }, true); }
//unsafeWindow.HTMLElement.prototype.onClick=function (func) { button.addEventListener("click", function(event){ func(event); event.stopPropagation(); event.preventDefault(); }, true) };
//GM_log=function (e){ alert(e); }
//GM_log=function (){}
//GM_log_org=GM_log; GM_log=function (txt){ GM_log_org(txt); alert(txt) };
/********************************/

function String2Time(str)
{
  var times=str.match(/(?:([0-9]+)h)? *(?:([0-9]+)m)? *(?:([0-9]+)s)?/).map(function (e){ return (e)?e:0; });
  time=times[1]*60*60+times[2]*60+times[3]*1;
  return time;
}

var server=window.location.host.match(/([a-z]*)\.ogame\.de/i)[1];
var page=window.location.search.match(/page=([^&]*)/i)[1];
var session=window.location.search.match(/session=([^&]*)/i)[1];

switch (page)
{
  case "overview": page_overview(); break;
  case "eventList": break;
  case "messages": break;
  case "showmessages": break;
  case "fleet2": break;
  case "fleet3": break;
  default: page_other(); /*GM_log("Seite nicht gefunden: "+page);*/ break;
}

function page_overview()
{
  Interval(function (){
    var mini="";
    var minZeit=999999;
    var shortest=-1;
    
    var a=[ { typ:'Countdown', abk: 'G' },
            { typ:'researchCountdown', abk: 'F' },
            { typ:'shipAllCountdown', abk: 'S' },
            { typ:'tempcounter', abk: 'A' } ];
    for (var i in a)
      if ($(a[i].typ) && $(a[i].typ).textContent && String2Time($(a[i].typ).textContent) < minZeit)
      { 
        minZeit=String2Time($(a[i].typ).textContent);
        shortest=i;
        mini=mini.toLowerCase()+a[i].abk.toUpperCase();
      } else {
        mini+=(($(a[i].typ) && $(a[i].typ).textContent)?a[i].abk.toLowerCase():'-')
      }
    document.title=((mini!="----")?mini+' | ':'')+((shortest!=-1)?$(a[shortest].typ).textContent+" | ":'')+getPageTitel()+"."+server+".OGame";
  },500);
}

function getPageTitel()
{
  page_translate=deserialize("page_translate",({trader:"Haendler", overview:"Uebersicht", station:"Anlagen", resources:"Versorgung", research:"Forschung", shipyard:"Schiffswerft", defense:"Verteidigung", fleet1:"Flotte", galaxy:"Galaxie", network:"Allianz", premium:"Offizierskasino", messages:"Nachrichten", tutorial:"Tutorial", changelog:"Changelog", buddies:"Buddies", notices:"Notizen", statistics:"Highscore", search:"Suche", preferences:"Einstellungen", resourceSettings:"Versorgungseinstellungen", fleet2:"Flottenversand II (++)", fleet3:"Flottenversand III (++)", techtree:"Techtree", techinfo:"techinfo"}));
  if (!page_translate[page])
  { 
    page_translate[page]=prompt("Seitenname ("+page+"):",page);
    alert(uneval(page_translate));
  }
  serialize("page_translate",page_translate);
  var planet=$x("//a[contains(@class,'active')]/span[@class='planet-name']");
  //GM_log(planet[0].textContent);
  //GM_log(uneval(planet[0].textContent));
  if (planet && planet[0] && planet[0].textContent)
    return (page_translate[page]?page_translate[page]:"'"+page+"'")+"."+planet[0].textContent;
  else
    return page_translate[page]?page_translate[page]:"'"+page+"'";
}

function page_other()
{
    document.title=getPageTitel()+"."+server+".OGame";

  Timeout(function (){
    if (session)
      window.location.href="http://draco.ogame.de/game/index.php?page=overview&session="+session;
  },60*1000);
}

/*
alert(uneval(document.location.toString().match(/http:\/\/(.*?)\.ogame\.de\/game\/index\.php\?(.*)/i)));
alert("Hash: "+window.location.hash);
alert("Host: "+window.location.host);
alert("Hostname: "+window.location.hostname);
alert("Href: "+window.location.href);
alert("Pathname: "+window.location.pathname);
alert("Port: "+window.location.port);
alert("Protocol: "+window.location.protocol);
alert("Search: "+window.location.search);
*/
