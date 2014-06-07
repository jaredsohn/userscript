// ==UserScript==
// @name           Scholar star
// @namespace      jauco.nl
// @description    Adds the option to 'star' scholar items and searches
// @include        http://scholar.google.*
// ==/UserScript==

//******************************************************************************
//Minified JSON code from JSON.org
if(!Object.prototype.toJSONString){Array.prototype.toJSONString=function(){var a=[],i,l=this.length,v;for(i=0;i<l;i+=1){v=this[i];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(v.toJSONString());}}else{a.push('null');}
break;case'string':case'number':case'boolean':a.push(v.toJSONString());}}
return'['+a.join(',')+']';};Boolean.prototype.toJSONString=function(){return String(this);};Date.prototype.toJSONString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getFullYear()+'-'+f(this.getMonth()+1)+'-'+f(this.getDate())+'T'+f(this.getHours())+':'+f(this.getMinutes())+':'+f(this.getSeconds())+'"';};Number.prototype.toJSONString=function(){return isFinite(this)?String(this):'null';};Object.prototype.toJSONString=function(){var a=[],k,v;for(k in this){if(this.hasOwnProperty(k)){v=this[k];switch(typeof v){case'object':if(v){if(typeof v.toJSONString==='function'){a.push(k.toJSONString()+':'+v.toJSONString());}}else{a.push(k.toJSONString()+':null');}
break;case'string':case'number':case'boolean':a.push(k.toJSONString()+':'+v.toJSONString());}}}
return'{'+a.join(',')+'}';};(function(s){var m={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'};s.parseJSON=function(filter){var j;function walk(k,v){var i;if(v&&typeof v==='object'){for(i in v){if(v.hasOwnProperty(i)){v[i]=walk(i,v[i]);}}}
return filter(k,v);}
if(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.test(this)){try{j=eval('('+this+')');}catch(e){throw new SyntaxError('parseJSON');}}else{throw new SyntaxError('parseJSON');}
if(typeof filter==='function'){j=walk('',j);}
return j;};s.toJSONString=function(){if(/["\\\x00-\x1f]/.test(this)){return'"'+this.replace(/([\x00-\x1f\\"])/g,function(a,b){var c=m[b];if(c){return c;}
c=b.charCodeAt();return'\\u00'+
Math.floor(c/16).toString(16)+
(c%16).toString(16);})+'"';}
return'"'+this+'"';};})(String.prototype);}
//******************************************************************************

//Object to store all sites
var savedSites = new Object;
var savedQueries = new Object;
savedSites = GM_getValue("savedSites","{}").parseJSON();
savedQueries = GM_getValue("savedQueries","{}").parseJSON();
//star images
var starOn = "data:image/gif,GIF89a%0F%00%0F%00%C4%1F%00_a%E1%16%15%9D%97%90%24-.%D2TPS%8D%91%E8%FF%FB%16%FE%F8%2FNM%AD%19%19%C6.-%5B%9D%97%5E%FE%F5%0F%C9%C0!lg%8Etq%AFsn0%92%8E%96%E5%DB%05%EE%E4%09%AD%B1%EDAC%D6%F3%E8%07%BE%C3%F0%9A%9E%EA~%81%E6%DB%D3R%BE%B6%04%CA%CF%F2RO%87%5C%5B%BA%FF%FF%FF!%F9%04%01%00%00%1F%00%2C%00%00%00%00%0F%00%0F%00%00%05%83%E0'%8EY%02%8Ch%3ADI%EAb%DE%D1e.%0AD%C6R%BDE%3Fh%86F%22%D3%C3%7C*%15%8F%F2q00%1C%08%0F%22QI8%0E%D8%26%83a%C0N%08%09L%82%D0%D8%9A%19%93%0D!P%F8p*%81%B2%D9%22P%0C.%A8%8A%C3%B9%B5%10%06.%15%0B%06%12%12%13%13%02-(%17%3F%12%02%04%02%12%0D%01F%24%08%12%10%01%03%01%10j'%23%00%0Akmb%0A%0A%3B%23%14%03%15%14%23%17Um%1F!%00%3B";
var starOff = "data:image/gif,GIF89a%0F%00%0F%00%B3%0F%00%FF%FF%FF%CC%E3%FB%EA%FB%FF%BB%DB%FE%B1%D6%FE%D3%ED%FF%D2%E4%FA%AC%D3%FE%B6%D8%FE%C1%E1%FF%C4%DE%FC%DE%EA%F8%DC%F2%FF%B9%D8%FD%D8%E7%F9%FF%FF%FF!%F9%04%01%00%00%0F%00%2C%00%00%00%00%0F%00%0F%00%00%04%60%F0%C9%19%8E%9A8%93B%B27%09P%04%1E60%80%80%7CA%7B%00%F0%D1%06%C63%20I%1E%C0b%9E%0C%8DC%81G%242%0E%86M%D1H%A8-%10%83%25%20AX%60%1AC%A2%E0%E0A%08%96%1D%CC%82%C0%CB%02%065%CA%0E%80%20%10%BE%8C%01F%918%92%0C%C2B%03%E3%40%20%1C%13%0B%0DM%12%11%00%3B"

addhooks();
insertStars(document);

function addhooks(){
  place = document.evaluate('/html/body/table/tbody/tr/td/form/table/tbody/tr[3]/td[3]/font', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  elm = document.createElement('br');
  place.appendChild(elm);
  elm = document.createElement('a');
  elm.id = "showSaved";
  elm.href = "javascript:;";
  elm.innerHTML = "Starred <img src=\""+starOn+"\" border='0'/>";
  place.appendChild(elm);
  elm.addEventListener('click', showSavedResult, true);
  place = document.evaluate('/html/body/table/tbody/tr/td/form', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
  elm = document.createElement('span');
  elm.id = "gmMessage";
  place.appendChild(elm);
}


function insertStars(doc){
  
  searchResults = doc.evaluate('//p[@class="g"]//a[contains(@href,"oi=citation")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if (searchResults.snapshotLength == 0){
    clearLink = doc.getElementById('gmMessage');
    re = /(.*)\/[^\?]*(.*)/
    kw = re.exec(doc.location.href);
    clearLink.innerHTML = " (You need to <a href=\""+kw[1]+"/scholar_preferences"+kw[2]+"\">enable</a> citations for star scholar to work)"
    clearLink.style.color = "red";
  }
  for (var i = 0; i < searchResults.snapshotLength; i++) {
    result = searchResults.snapshotItem(i);
    star = doc.createElement('img');
    star.id = result.href;
    star.className = "star";
    star.alt = "Mark this item with a star";
    result.parentNode.parentNode.insertBefore(star, result.parentNode.parentNode.childNodes[0]);
    star.addEventListener("click", function(e){
      if (isStarred(e.target.id)){
        delSite(e.target.id);
        e.target.src = starOff;
      }
      else {
        addSite(e.target.id, e.target.parentNode);
        e.target.src = starOn;
      }
    
    }, false);
  }
  starResults(doc);
}

function isStarred(name){
  return (name in savedSites)
}

function addSite(name, container){
  snippet = container.cloneNode(true);
  snippet.removeChild(snippet.childNodes[0]);
  savedSites[name]=Array(document.location.href,'<p class="g">'+snippet.innerHTML+"</p>");
  if (document.location.href in savedQueries)
    savedQueries[document.location.href][name] = true;
  else {
    savedQueries[document.location.href] = new Object;
    savedQueries[document.location.href][name] = true;
  }
  GM_setValue("savedSites",savedSites.toJSONString());
  GM_setValue("savedQueries",savedQueries.toJSONString());
}

function delSite(name){
  if (name in savedQueries[savedSites[name][0]])
    delete savedQueries[savedSites[name][0]][name];
  var i = 0;
  for (var j in savedQueries[savedSites[name][0]])
    i++;
  if (i == 1)
    delete savedQueries[savedSites[name][0]];
  delete savedSites[name];
  GM_setValue("savedSites",savedSites.toJSONString());
  GM_setValue("savedQueries",savedQueries.toJSONString());
}

function clearSearches(){
  GM_setValue('savedSites','{}');
  savedSites = {};
  GM_setValue('savedQueries','{}');
  savedQueries = {};
  starResults(document);
  alert("cleared!");
}

function showSavedResult(){
  WinId = window.open("","newwin","width=800,height=600,scrollbars=yes,menubar=yes,location=yes,status=yes,toolbar=yes,directories=yes,resizable=yes");
  WinId.document.open(); 
  WinId.document.write("<html><head><style> .odd {background-color: #FFB;}li>a { background-color:#BBDDFF; color:black; padding-bottom:0.2em; padding-left:0.2em; padding-right:0.2em; padding-top:0.2em; } li { border: thin black solid; list-style: none; margin:0.5em; padding:1em; } </style></head><body>");
  WinId.document.write("<a href=\"javascript:;\" id='exportResults'>Export</a> - <a href=\"javascript:;\" id='clearResults'>Clear</a> - <a href=\"javascript:;\" id='saveResults'>Save to file</a> - <a href=\"javascript:;\" id='loadResults'>Load</a><hr/>");
  for (var q in savedQueries){
    if (q == "toJSONString")
      continue;
    re = /q=([^&]+)/
    keyWords = re.exec(q);
    if (keyWords != null)
      WinId.document.write("<li><a href=\""+q+"\">"+doDecode(keyWords[1])+"</a><br/>");
    else
      WinId.document.write("<li><a href=\""+q+"\">HACK:info not available, check url</a><br/>");
    var odd = false;
    for (var i in savedQueries[q]){
      if (i == "toJSONString")
        continue;
      WinId.document.write("<div ");
      if (odd){
        WinId.document.write("class=\"odd\"");
      }
      WinId.document.write(">");
      WinId.document.write(savedSites[i][1]);
      WinId.document.write("</div>");
      odd = !odd;
    }
    WinId.document.write("</li>");
  }
  WinId.document.write("</ul></body></html>");
  WinId.document.close();
}

function starResults(doc){
  searchResults = doc.evaluate('//p[@class="g"]/img[@class="star"]', doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < searchResults.snapshotLength; i++)
    searchResults.snapshotItem(i).src = isStarred(searchResults.snapshotItem(i).id) ? starOn : starOff;
}
/*
function starResults(){
  searchResults = document.evaluate('//p[@class="g"]/img[@class="star"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < searchResults.snapshotLength; i++)
    searchResults.snapshotItem(i).src = isStarred(searchResults.snapshotItem(i).id) ? starOn : starOff;
}
*/
function saveSavedResult(){
  WinId = window.open('','newwin','width=400,height=500,,scrollbars=yes,menubar=yes');
  WinId.document.open();
  WinId.document.write("//You can save this list by pressing file->save and choosing \"text-file\" as content type");
  WinId.document.write("<pre>");
  WinId.document.write(formatObject(savedSites.toJSONString()));
  WinId.document.write(formatObject(savedQueries.toJSONString()));
  WinId.document.write("</pre>");
  WinId.document.close();
}

function formatObject(str){
  str = str.replace(/</g,"&lt;");
  str = str.replace(/{/g,"<br/>{<br/>");
  str = str.replace(/}/g,"<br/>}<br/>");
  str = str.replace(/\"],/g,"\"],<br/>");
  return str;
}

function showItem(idx) {
    WinId = window.open('','newwin','width=400,height=500');
    var Text = ''
    Text += '<center>';
    Text += '<h3>Item: ' + theItem[idx].item +'</h3>';
    Text += '<h3>Model: ' + theItem[idx].model +'</h3>';
    Text += '<h3>Price: ' + theItem[idx].price +'</h3>';
    Text += '<p><img src="' + theItem[idx].imageurl +'">';
    WinId.document.open();
    WinId.document.write(Text);
    WinId.document.close();
}

function doDecode(s){
  s=unescape(s);
  var retVal = "";
  var i =0;
  while ( i < s.length ) {
    if (s[i] == "+") {
      retVal += " ";
    }
    else {
      retVal += s[i];
    }
    i++;
  }
  return retVal;
}