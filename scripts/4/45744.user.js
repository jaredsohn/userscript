// ==UserScript==
// @name           BYBS Ikariam 100 Combat Reports
// @namespace      domz
// @description    Makes the Military advisor give first 100 CRs on the first page
// @version        1.0
// @include        http://*.ikariam.*/index.php?view=militaryAdvisorCombatReports*
// @exclude        http://board.ikariam.*
// @homepage       http://userscripts.org/scripts/show/34564
// ==/UserScript==

// I integrated Ikariam Attack Counter since it won't work with this AJAX http://ikariam.nfshost.com/

// variables to set up

var pagesToLoad  = 9;         // Additional Pages To Load, if you want 100 CRs, set equal to 9
var enableCounts = true;      // Activate attack counter script after retrieving CRs
var hilightColor = '#FAE877'; // Color to hilight cities attacked
var bashingColor = '#CAE877'; // Color to hilight cities attacked 6 times or greater in the past 24 hours.

// begin script

function debug(aMsg) { setTimeout(function() { throw new Error("[debug] " + aMsg); }, 0);}

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
function remove(node){
  return node.parentNode.removeChild(node);
}

function get(url, cb) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText); }
  });
}
function getCRs(page){
  if (page) {
    //debug("recieved page length: " + page.length);
    var insertCRs = $X(".//*[@id='finishedReports']/table/tbody",node("div", "", "", page));
    var rows = $x("./tr",insertCRs);
    //debug("rows: "+rows.length);
    if (tableBody) {
      var insertAfter = tableBody.lastChild;
      for (var i = 0; i < rows.length - 4; ++i){
        //debug([insertAfter.innerHTML,$X(".//td[@class='date']",insertAfter)]);
        if (insertAfter) { insertAfter = insertAfter.nextSibling; }
        insertAfter = tableBody.insertBefore(rows[i],insertAfter);
      }
    }
    if (enableCounts) { reportTimer = setTimeout(attack_counter,1000); }
  }
}

function getPages(){
  tableBody = $X("//*[@id='finishedReports']/table/tbody");
  var rows = $x("./tr",tableBody);
  if (rows.length == 14) {
    var newCRs = rows[10];
    var links = $x(".//a",newCRs);
    for (var i = 0; i < links.length && i < pagesToLoad; ++i){
      //debug(links[i].innerHTML);
      get(links[i].href,getCRs);
    }
    var newFoot = node("tfoot",'','');
    newFoot.appendChild(remove(rows[10]));
    newFoot.appendChild(remove(rows[11]));
    newFoot.appendChild(remove(rows[12]));
    newFoot.appendChild(remove(rows[13]));
    tableBody.parentNode.appendChild(newFoot);
    
  } else { return false; }
}

var tableBody;
var reportTimer;

if (document.body.id != "militaryAdvisorCombatReports") { return; }
getPages();






function trim(str) {
  var	str = str.replace(/^\s\s*/, ''),
    ws = /\s/,
    i = str.length;
  while (ws.test(str.charAt(--i)));
  return str.slice(0, i + 1);
}


function parsedate(date){
  date = trim(date);
  s=date.split(' ');
  d=s[0].split('.');
  t=s[1].split(':');
  return new Date('2008',d[1]-1,d[0],t[0],t[1]);  // I really shouldn't hard code this
  // new Date(year, month, date [, hour, minute, second, millisecond ])
}

function attack_counter(){

  var battlere = /^Battle for /;
  var seabatre = /^Sea battle near /;



  var towns = [];
  var counts = {};

  function townadd(name){
  	counts[name] = counts[name] ? counts[name] + 1 : 1;
  }

  var reports = document.getElementById('finishedReports').getElementsByTagName('tr');
  var servertime = parsedate(document.getElementById('servertime').innerHTML);
  var rows = 0;
  var end = 0;
  for(var i=0;i<reports.length;i++)
  //for(var i=0;i<reports.length && end == 0;i++)
  {
  	var cells = reports[i].getElementsByTagName('td');
  	for(var j=2;j<cells.length-1;j++)
  	{
  		if(cells[j].getAttribute('class') == "date")
  		{
  			var rtime = parsedate(cells[j].innerHTML);
  			if((servertime.getTime() - rtime.getTime()) < (1000*60*60*24)){
  				cells[j].innerHTML = "<b>" + cells[j].innerHTML + "</b>";
  				if(cells[j+1].getAttribute('class') == "subject won"
  				   || cells[j+1].getAttribute('class') == "subject won new"){
  					t = cells[j+1].getElementsByTagName('a')[0].getAttribute('title');
  					t = t.replace(battlere, '');
  					t = t.replace(seabatre, '');
  					townadd(t);
  				}
  				rows++;
  			} else {
  				end = 1;
  				break;
  			}

  		}
  	}

  }
  for(var i=0;i<rows;i++)
  {
  	var cell = reports[i].getElementsByTagName('td')[3]; //hardcoded offset, bad
  	if(cell == null)
  		continue;
  	if(!cell.getAttribute('class').match('won'))
  		continue;
  	t = cell.getElementsByTagName('a')[0].getAttribute('title');
  	t = t.replace(battlere, '');
  	t = t.replace(seabatre, '');

    if (counts[t]) {
  		cell.innerHTML += "[ " + counts[t] + " ]";
      cell.style.backgroundColor = (counts[t] >= 6) ? hilightColor : bashingColor;
      delete counts[t];
    }
  }
}