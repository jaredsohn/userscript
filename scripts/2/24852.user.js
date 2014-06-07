// ==UserScript==
// @name           90% Familiar Run Checker
// @namespace      hunsley@gmail.com
// @description    Grabs highest percentage runs for each familiar from koldb, and displays them on your terrarium page
// @include        *kingdomofloathing.com/familiar.php*
// @include        *kingdomofloathing.com/charpane.php*
// ==/UserScript==

//Written on request: http://forums.kingdomofloathing.com:8080/vb/showpost.php?p=2766395&postcount=532
//Version 1.1  05/11/2008  Fixed display issue for familiars with exactly one kill
//Version 1.2  06/04/2008  Update button was not appearing properly when using any familiar without a nonzero run.
//Version 1.3  01/14/2009  Fixed for KOLDB change displaying different percentages after ascension, and floating-point percentages.

//Grab the character name from the character pane
if (window.location.pathname == "/charpane.php") {
	// Get the current name
	var charName = document.getElementsByTagName("b")[0].textContent;
	GM_setValue('curCharName',charName);
	return false;
}
else {
	var charName = GM_getValue('curCharName','UNDEFINED');
	if(charName == 'UNDEFINED') {
		return false;
	}
}

var familiarArray = new Array();
var i=0,j=0;

textnodes = document.evaluate('//text()',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for (i=0;i<textnodes.snapshotLength;i++) {
	s = textnodes.snapshotItem(i).data;
	if(s.match(/(, the)?[\d,]+-pound (.*) \([\d,]+ exp(erience)?, [\d,]+ kills?\)/)) {
		//GM_log("found matching string");
		familiarArray[j] = new Object;
		familiarArray[j].node = textnodes.snapshotItem(i);
		(s.match(/^, the /))?familiarArray[j].first = "no":familiarArray[j].first = "yes";
		familiarArray[j].type = s.replace(/(, the )?[\d,]+-pound (.*) \([\d,]+ exp(erience)?, [\d,]+ kills\)/,"$2").replace(/\s/g,'');
		familiarArray[j].bestRun = 0;
		//GM_log("type of found line is: "+familiarArray[j].type);
		j++;
	}
}

SetupJSON();

//var foo = {"BabyGravyFairy":"91"};
//GM_setValue(charName + '.runsDB','UNDEFINED');

ParseDB();

//Grabs the array of saved familiar run %s from the preferences.
//It then parses it, and adds the runs to the familiar lines on the page.
//If no DB is found, it automatically sends an httprequest to create one
function ParseDB() {
	//GM_log("ParseDB");
	runsDBString = GM_getValue(charName + '.runsDB','UNDEFINED');
	if(runsDBString == 'UNDEFINED') {
		ScrapeKoldb();
		return false;
	}

	runsDB = JSON.parse(runsDBString);
	
	for(var i=0;i<familiarArray.length;i++) {
		//GM_log("type in array is: "+familiarArray[i].type+"\ni: "+i);
		if(runsDB[familiarArray[i].type] || (familiarArray[i].first == "yes")) {
			runTd = document.createElement('td');
			percentNum = parseInt(runsDB[familiarArray[i].type]);
			if(percentNum > 90.0) {
				color = 'green';
			}
			else if(percentNum == 90.0) {
				color = 'orange';
			}
			else {
				color = 'red';
			}
			if (runsDB[familiarArray[i].type]) {
				runPercentText = document.createTextNode(parseFloat(runsDB[familiarArray[i].type])+'%');
			}
			else {
				runPercentText = document.createTextNode('0%');
			}
			runTd.style.color = color;
			if(familiarArray[i].first == "yes") {
				//GM_log("special div for first node");
				var runTab = document.createElement('table');
				var runTr = document.createElement('tr');
				var runTd2 = document.createElement('td');
				updateButton = document.createElement('input');
				with(updateButton) {
					type = 'button';
					class = 'button';
					value = 'Update %s';
					addEventListener('click',ScrapeKoldb,false);
				}
				runTd.appendChild(runPercentText);
				runTr.appendChild(runTd);
				runTd2.appendChild(updateButton);
				runTr.appendChild(runTd2);
				runTab.appendChild(runTr);
				AddPercentNode(i,runTr);
			}
			else {
				//GM_log("normal td for other nodes");
				runTd.appendChild(runPercentText);
				AddPercentNode(i,runTd);
			}
		}
		else {
			runTd = document.createElement('td');
			runTd.appendChild(document.createTextNode('0%'));
			runTd.style.color = 'red';
			AddPercentNode(i,runTd);
		}
	}
}

function AddPercentNode(index,node) {
	node.id = familiarArray[index].type+'Percent';
	var replacedNode = document.getElementById(familiarArray[index].type+'Percent');
	if(replacedNode) {
		replacedNode.parentNode.replaceChild(node,replacedNode);
	}
	else {
		if(familiarArray[index].first == "yes") {
			//GM_log("processing first node");
			familiarArray[index].node.parentNode.replaceChild(node,familiarArray[index].node.previousSibling.previousSibling.previousSibling);
		}
		else {
			familiarArray[index].node.parentNode.parentNode.appendChild(node);
		}
	}
}

function ScrapeKoldb() {
	//GM_log("ScrapeKoldb");

	runsDB = new Object;

	url = 'http://koldb.com/player.php?name=' + encodeURI(charName);
	GM_xmlhttpRequest({
		method:'GET',
		url:url,
		onload:function(response) {
			var holder=document.createElement('html');
			holder.innerHTML = response.responseText;
			var runTableTextNodes = document.evaluate('.//th[.="Familiar"]/ancestor::table[1]//text()',holder,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
			//GM_log("number of text nodes found: "+runTableTextNodes.snapshotLength);
			for(var i=0;i<runTableTextNodes.snapshotLength;i++) {
				node = runTableTextNodes.snapshotItem(i);
				s = node.data;
				if (s.match(/%/)) {
					//familiar % text node.  now go get the alt text on the image to find out what type
					if (typeof node.parentNode.firstChild.title != 'undefined') {
						familiarType = node.parentNode.firstChild.title.replace(/\s/g,'');
						percent = parseFloat(s.replace(/[^\d\.]/g,''));
						//GM_log("s:"+s+"\npercent:"+percent);
						if(!runsDB[familiarType] || (parseFloat(runsDB[familiarType])<percent)) {
							runsDB[familiarType] = percent;
							//GM_log(familiarType+" is now "+percent);
						}
					}
				}
			}
		GM_setValue(charName + '.runsDB',JSON.stringify(runsDB));
		ParseDB();
		}
	});
}

// http://json.org/json2.js
function SetupJSON() {
	if(!this.JSON){JSON=function(){function f(n){return n<10?'0'+n:n;}
	Date.prototype.toJSON=function(){return this.getUTCFullYear()+'-'+
	f(this.getUTCMonth()+1)+'-'+
	f(this.getUTCDate())+'T'+
	f(this.getUTCHours())+':'+
	f(this.getUTCMinutes())+':'+
	f(this.getUTCSeconds())+'Z';};var escapeable=/["\\\x00-\x1f\x7f-\x9f]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==='string'){return c;}
	c=a.charCodeAt();return'\\u00'+Math.floor(c/16).toString(16)+
	(c%16).toString(16);})+'"':'"'+string+'"';}
	function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
	if(typeof rep==='function'){value=rep.call(holder,key,value);}
	switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
	gap+=indent;partial=[];if(typeof value.length==='number'&&!(value.propertyIsEnumerable('length'))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
	v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}
	if(typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}
	v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
	return{stringify:function(value,replacer,space){var i;gap='';indent='';if(space){if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}}
	if(!replacer){rep=function(key,value){if(!Object.hasOwnProperty.call(this,key)){return undefined;}
	return value;};}else if(typeof replacer==='function'||(typeof replacer==='object'&&typeof replacer.length==='number')){rep=replacer;}else{throw new Error('JSON.stringify');}
	return str('',{'':value});},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
	return reviver.call(holder,key,value);}
	if(/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
	throw new SyntaxError('JSON.parse');},quote:quote};}();}
}