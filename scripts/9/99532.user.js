// ==UserScript==
// @name			Casual Collective+
// @namespace		CC+ by t2t2 & kiko
// @description		Adds new features to the Casual Collective!
// @include			http://old.casualcollective.com/*
// @include			http://www.old.casualcollective.com/*
// @exclude			http://www.old.casualcollective.com/chat
// @resource		ccplusLogo http://dl.dropbox.com/u/17091/CCplus/CCplus2.png
//
// ==/UserScript==

var version = 33
if(document.location.pathname.indexOf('/radio') != 0 && document.getElementById('sb-selectors')) {
	newCheck = GM_getValue('lastVersion', false)
	if(!newCheck) {
		GM_setValue('lastVersion', version)
	}
	if(GM_getValue('lastVersion', version) < version) {
		oldVersion = GM_getValue('lastVersion', version)
		GM_setValue('lastVersion', version)
	}
	
	// Finds elements using CSS rules
	var cssQuery=function(){var version="2.0.2";var C=/\s*,\s*/;var cssQuery=function(s,fr){try{var m=[];var u=arguments.callee.caching&&!fr;var b=(fr)?(fr.constructor==Array)?fr:[fr]:[document];var se=parseSelector(s).split(C),i;for(i=0;i<se.length;i++){s=_2(se[i]);if(isMSIE&&s.slice(0,3).join("")==" *#"){s=s.slice(2);fr=_4([],b,s[1])}else fr=b;var j=0,t,f,a,c="";while(j<s.length){t=s[j++];f=s[j++];c+=t+f;a="";if(s[j]=="("){while(s[j++]!=")")a+=s[j];a=a.slice(0,-1);c+="("+a+")"}fr=(u&&cache[c])?cache[c]:select(fr,t,f,a);if(u)cache[c]=fr}m=m.concat(fr)}delete cssQuery.error;return m}catch(e){cssQuery.error=e;return[]}};cssQuery.toString=function(){return"function cssQuery() {\n  [version "+version+"]\n}"};var cache={};cssQuery.caching=false;cssQuery.clearCache=function(s){if(s){s=_2(s).join("");delete cache[s]}else cache={}};var modules={};var loaded=false;cssQuery.addModule=function(n,s){if(loaded)eval("s="+String(s));modules[n]=new s()};cssQuery.valueOf=function(c){return c?eval(c):this};var selectors={};var pseudoClasses={};var AttributeSelector={match:/\[([\w-]+(\|[\w-]+)?)\s*(\W?=)?\s*([^\]]*)\]/};var attributeSelectors=[];selectors[" "]=function(r,f,t,n){var e,i,j;for(i=0;i<f.length;i++){var s=getElementsByTagName(f[i],t,n);for(j=0;(e=s[j]);j++){if(thisElement(e)&&compareNamespace(e,n))r.push(e)}}};selectors["#"]=function(r,f,i){var e,j;for(j=0;(e=f[j]);j++)if(e.id==i)r.push(e)};selectors["."]=function(r,f,c){c=new RegExp("(^|\\s)"+c+"(\\s|$)");var e,i;for(i=0;(e=f[i]);i++)if(c.test(e.className))r.push(e)};selectors[":"]=function(r,f,p,a){var t=pseudoClasses[p],e,i;if(t)for(i=0;(e=f[i]);i++)if(t(e,a))r.push(e)};pseudoClasses["link"]=function(e){var d=getDocument(e);if(d.links)for(var i=0;i<d.links.length;i++){if(d.links[i]==e)return true}};pseudoClasses["visited"]=function(e){};var thisElement=function(e){return(e&&e.nodeType==1&&e.tagName!="!")?e:null};var previousElementSibling=function(e){while(e&&(e=e.previousSibling)&&!thisElement(e))continue;return e};var nextElementSibling=function(e){while(e&&(e=e.nextSibling)&&!thisElement(e))continue;return e};var firstElementChild=function(e){return thisElement(e.firstChild)||nextElementSibling(e.firstChild)};var lastElementChild=function(e){return thisElement(e.lastChild)||previousElementSibling(e.lastChild)};var childElements=function(e){var c=[];e=firstElementChild(e);while(e){c.push(e);e=nextElementSibling(e)}return c};var isMSIE=true;var isXML=function(e){var d=getDocument(e);return(typeof d.mimeType=="unknown")?/\.xml$/i.test(d.URL):Boolean(d.mimeType=="XML Document")};var getDocument=function(e){return e.ownerDocument||e.document};var getElementsByTagName=function(e,t){return(t=="*"&&e.all)?e.all:e.getElementsByTagName(t)};var compareTagName=function(e,t,n){if(t=="*")return thisElement(e);if(!compareNamespace(e,n))return false;if(!isXML(e))t=t.toUpperCase();return e.tagName==t};var compareNamespace=function(e,n){return!n||(n=="*")||(e.scopeName==n)};var getTextContent=function(e){return e.innerText};function _4(r,f,id){var m,i,j;for(i=0;i<f.length;i++){if(m=f[i].all.item(id)){if(m.id==id)r.push(m);else if(m.length!=null){for(j=0;j<m.length;j++){if(m[j].id==id)r.push(m[j])}}}}return r};if(![].push)Array.prototype.push=function(){for(var i=0;i<arguments.length;i++){this[this.length]=arguments[i]}return this.length};var N=/\|/;function select(fr,t,f,a){if(N.test(f)){f=f.split(N);a=f[0];f=f[1]}var r=[];if(selectors[t]){selectors[t](r,fr,f,a)}return r};var S=/^[^\s>+~]/;var ST=/[\s#.:>+~()@]|[^\s#.:>+~()@]+/g;function _2(s){if(S.test(s))s=" "+s;return s.match(ST)||[]};var W=/\s*([\s>+~(),]|^|$)\s*/g;var I=/([\s>+~,]|[^(]\+|^)([#.:@])/g;var parseSelector=function(s){return s.replace(W,"$1").replace(I,"$1*$2")};var Quote={toString:function(){return"'"},match:/^('[^']*')|("[^"]*")$/,test:function(s){return this.match.test(s)},add:function(s){return this.test(s)?s:this+s+this},remove:function(s){return this.test(s)?s.slice(1,-1):s}};var getText=function(t){return Quote.remove(t)};var E=/([\/()[\]?{}|*+-])/g;function regEscape(s){return s.replace(E,"\\$1")};cssQuery.addModule("css-level2",function(){selectors[">"]=function(r,f,t,n){var e,i,j;for(i=0;i<f.length;i++){var s=childElements(f[i]);for(j=0;(e=s[j]);j++)if(compareTagName(e,t,n))r.push(e)}};selectors["+"]=function(r,f,t,n){for(var i=0;i<f.length;i++){var e=nextElementSibling(f[i]);if(e&&compareTagName(e,t,n))r.push(e)}};selectors["@"]=function(r,f,a){var t=attributeSelectors[a].test;var e,i;for(i=0;(e=f[i]);i++)if(t(e))r.push(e)};pseudoClasses["first-child"]=function(e){return!previousElementSibling(e)};pseudoClasses["lang"]=function(e,c){c=new RegExp("^"+c,"i");while(e&&!e.getAttribute("lang"))e=e.parentNode;return e&&c.test(e.getAttribute("lang"))};AttributeSelector.NS_IE=/\\:/g;AttributeSelector.PREFIX="@";AttributeSelector.tests={};AttributeSelector.replace=function(m,a,n,c,v){var k=this.PREFIX+m;if(!attributeSelectors[k]){a=this.create(a,c||"",v||"");attributeSelectors[k]=a;attributeSelectors.push(a)}return attributeSelectors[k].id};AttributeSelector.parse=function(s){s=s.replace(this.NS_IE,"|");var m;while(m=s.match(this.match)){var r=this.replace(m[0],m[1],m[2],m[3],m[4]);s=s.replace(this.match,r)}return s};AttributeSelector.create=function(p,t,v){var a={};a.id=this.PREFIX+attributeSelectors.length;a.name=p;t=this.tests[t];t=t?t(this.getAttribute(p),getText(v)):false;a.test=new Function("e","return "+t);return a};AttributeSelector.getAttribute=function(n){switch(n.toLowerCase()){case"id":return"e.id";case"class":return"e.className";case"for":return"e.htmlFor";case"href":if(isMSIE){return"String((e.outerHTML.match(/href=\\x22?([^\\s\\x22]*)\\x22?/)||[])[1]||'')"}}return"e.getAttribute('"+n.replace(N,":")+"')"};AttributeSelector.tests[""]=function(a){return a};AttributeSelector.tests["="]=function(a,v){return a+"=="+Quote.add(v)};AttributeSelector.tests["~="]=function(a,v){return"/(^| )"+regEscape(v)+"( |$)/.test("+a+")"};AttributeSelector.tests["|="]=function(a,v){return"/^"+regEscape(v)+"(-|$)/.test("+a+")"};var _3=parseSelector;parseSelector=function(s){return _3(AttributeSelector.parse(s))}});cssQuery.addModule("css-level3",function(){selectors["~"]=function(r,f,t,n){var e,i;for(i=0;(e=f[i]);i++){while(e=nextElementSibling(e)){if(compareTagName(e,t,n))r.push(e)}}};pseudoClasses["contains"]=function(e,t){t=new RegExp(regEscape(getText(t)));return t.test(getTextContent(e))};pseudoClasses["root"]=function(e){return e==getDocument(e).documentElement};pseudoClasses["empty"]=function(e){var n,i;for(i=0;(n=e.childNodes[i]);i++){if(thisElement(n)||n.nodeType==3)return false}return true};pseudoClasses["last-child"]=function(e){return!nextElementSibling(e)};pseudoClasses["only-child"]=function(e){e=e.parentNode;return firstElementChild(e)==lastElementChild(e)};pseudoClasses["not"]=function(e,s){var n=cssQuery(s,getDocument(e));for(var i=0;i<n.length;i++){if(n[i]==e)return false}return true};pseudoClasses["nth-child"]=function(e,a){return nthChild(e,a,previousElementSibling)};pseudoClasses["nth-last-child"]=function(e,a){return nthChild(e,a,nextElementSibling)};pseudoClasses["target"]=function(e){return e.id==location.hash.slice(1)};pseudoClasses["checked"]=function(e){return e.checked};pseudoClasses["enabled"]=function(e){return e.disabled===false};pseudoClasses["disabled"]=function(e){return e.disabled};pseudoClasses["indeterminate"]=function(e){return e.indeterminate};AttributeSelector.tests["^="]=function(a,v){return"/^"+regEscape(v)+"/.test("+a+")"};AttributeSelector.tests["$="]=function(a,v){return"/"+regEscape(v)+"$/.test("+a+")"};AttributeSelector.tests["*="]=function(a,v){return"/"+regEscape(v)+"/.test("+a+")"};function nthChild(e,a,t){switch(a){case"n":return true;case"even":a="2n";break;case"odd":a="2n+1"}var ch=childElements(e.parentNode);function _1(i){var i=(t==nextElementSibling)?ch.length-i:i-1;return ch[i]==e};if(!isNaN(a))return _1(a);a=a.split("n");var m=parseInt(a[0]);var s=parseInt(a[1]);if((isNaN(m)||m==1)&&s==0)return true;if(m==0&&!isNaN(s))return _1(s);if(isNaN(s))s=0;var c=1;while(e=t(e))c++;if(isNaN(m)||m==1)return(t==nextElementSibling)?(c<=s):(s>=c);return(c%m)==s}});cssQuery.addModule("css-standard",function(){isMSIE=eval("false;/*@cc_on@if(@\x5fwin32)isMSIE=true@end@*/");if(!isMSIE){getElementsByTagName=function(e,t,n){return n?e.getElementsByTagNameNS("*",t):e.getElementsByTagName(t)};compareNamespace=function(e,n){return!n||(n=="*")||(e.prefix==n)};isXML=document.contentType?function(e){return/xml/i.test(getDocument(e).contentType)}:function(e){return getDocument(e).documentElement.tagName!="HTML"};getTextContent=function(e){return e.textContent||e.innerText||_0(e)};function _0(e){var t="",n,i;for(i=0;(n=e.childNodes[i]);i++){switch(n.nodeType){case 11:case 1:t+=_0(n);break;case 3:t+=n.nodeValue;break}}return t}}});loaded=true;return cssQuery}();
	// For cross-browser:
	if(!Array.prototype.forEach){Array.prototype.forEach=function(a){var b=this.length;if(typeof a!="function")throw new TypeError();var c=arguments[1];for(var i=0;i<b;i++){if(i in this)a.call(c,this[i],i,this)}}}
	// Unique array entries
	Array.prototype.unique=function(){var r=new Array();o:for(var i=0,n=this.length;i<n;i++){for(var x=0,y=r.length;x<y;x++){if(r[x]==this[i]){continue o}}r[r.length]=this[i]}return r}
	// JSON functions, I know FF3.5 has native functions for it but not everyone has it.
	function JSONError(a){this.message=a||"";this.name="JSONError"};JSONError.prototype=new Error; JSON=new function(){this.decode=function(){var a,result,self,tmp;if($$("toString")){switch(arguments.length){case 2:self=arguments[0];a=arguments[1];break;case 1:if($[typeof arguments[0]](arguments[0])===Function){self=this;a=arguments[0]}else self=arguments[0];break;default:self=this;break};if(rc.test(self)){try{result=e("(".concat(self,")"));if(a&&result!==null&&(tmp=$[typeof result](result))&&(tmp===Array||tmp===Object)){for(self in result)result[self]=v(self,result)?a(self,result[self]):result[self]}}catch(z){}}else{throw new JSONError("bad data");}};return result};this.encode=function(){var a=arguments.length?arguments[0]:this,result,tmp;if(a===null)result="null";else if(a!==undefined&&(tmp=$[typeof a](a))){switch(tmp){case Array:result=[];for(var i=0,j=0,k=a.length;j<k;j++){if(a[j]!==undefined&&(tmp=JSON.encode(a[j])))result[i++]=tmp};result="[".concat(result.join(","),"]");break;case Boolean:result=String(a);break;case Date:result='"'.concat(a.getFullYear(),'-',d(a.getMonth()+1),'-',d(a.getDate()),'T',d(a.getHours()),':',d(a.getMinutes()),':',d(a.getSeconds()),'"');break;case Function:break;case Number:result=isFinite(a)?String(a):"null";break;case String:result='"'.concat(a.replace(rs,s).replace(ru,u),'"');break;default:var i=0,key;result=[];for(key in a){if(a[key]!==undefined&&(tmp=JSON.encode(a[key])))result[i++]='"'.concat(key.replace(rs,s).replace(ru,u),'":',tmp)};result="{".concat(result.join(","),"}");break}};return result};this.toDate=function(){var a=arguments.length?arguments[0]:this,result;if(rd.test(a)){result=new Date;result.setHours(i(a,11,2));result.setMinutes(i(a,14,2));result.setSeconds(i(a,17,2));result.setMonth(i(a,5,2)-1);result.setDate(i(a,8,2));result.setFullYear(i(a,0,4))}else if(rt.test(a))result=new Date(a*1000);return result};var c={"\b":"b","\t":"t","\n":"n","\f":"f","\r":"r",'"':'"',"\\":"\\","/":"/"},d=function(n){return n<10?"0".concat(n):n},e=function(c,f,e){e=eval;delete eval;if(typeof eval==="undefined")eval=e;f=eval(""+c);eval=e;return f},i=function(e,p,l){return 1*e.substr(p,l)},p=["","000","00","0",""],rc=null,rd=/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/,rs=/(\x5c|\x2F|\x22|[\x0c-\x0d]|[\x08-\x0a])/g,rt=/^([0-9]+|[0-9]+[,\.][0-9]{1,3})$/,ru=/([\x00-\x07]|\x0b|[\x0e-\x1f])/g,s=function(i,d){return"\\".concat(c[d])},u=function(i,d){var n=d.charCodeAt(0).toString(16);return"\\u".concat(p[n.length],n)},v=function(k,v){return $[typeof result](result)!==Function&&(v.hasOwnProperty?v.hasOwnProperty(k):v.constructor.prototype[k]!==v[k])},$={"boolean":function(){return Boolean},"function":function(){return Function},"number":function(){return Number},"object":function(o){return o instanceof o.constructor?o.constructor:null},"string":function(){return String},"undefined":function(){return null}},$$=function(m){function $(c,t){t=c[m];delete c[m];try{e(c)}catch(z){c[m]=t;return 1}};return $(Array)&&$(Object)};try{rc=new RegExp('^("(\\\\.|[^"\\\\\\n\\r])*?"|[,:{}\\[\\]0-9.\\-+Eaeflnr-u \\n\\r\\t])+?$')}catch(z){rc=/^(true|false|null|\[.*\]|\{.*\}|".*"|\d+|\d+\.\d+)$/}};
	// Wait for something
	function waitFor(c,f){if (c())f(); else window.setTimeout(function(){waitFor(c,f);},300,false);}
	// xml-json-xml functions - http://goessner.net/download/prj/jsonxml/
	function json2xml(i,k){var g=function(d,f,e){var a="";if(d instanceof Array)for(var j=0,h=d.length;j<h;j++)a+=e+g(d[j],f,e+"\t")+"\n";else if(typeof d=="object"){j=false;a+=e+"<"+f;for(h in d)if(h.charAt(0)=="@")a+=" "+h.substr(1)+'="'+d[h].toString()+'"';else j=true;a+=j?">":"/>";if(j){for(h in d)if(h=="#text")a+=d[h];else if(h=="#cdata")a+="<![CDATA["+d[h]+"]]\>";else if(h.charAt(0)!="@")a+=g(d[h],h,e+"\t");a+=(a.charAt(a.length-1)=="\n"?e:"")+"</"+f+">"}}else a+=e+"<"+f+">"+d.toString()+"</"+f+ ">";return a},b="";for(var c in i)b+=g(i[c],c,"");return k?b.replace(/\t/g,k):b.replace(/\t|\n/g,"")};function xml2json(i,k){var g={toObj:function(b){var c={};if(b.nodeType==1){if(b.attributes.length)for(var d=0;d<b.attributes.length;d++)c["@"+b.attributes[d].nodeName]=(b.attributes[d].nodeValue||"").toString();if(b.firstChild){for(var f=d=0,e=false,a=b.firstChild;a;a=a.nextSibling)if(a.nodeType==1)e=true;else if(a.nodeType==3&&a.nodeValue.match(/[^ \f\n\r\t\v]/))d++;else a.nodeType==4&&f++;if(e)if(d<2&&f<2){g.removeWhite(b);for(a=b.firstChild;a;a=a.nextSibling)if(a.nodeType==3)c["#text"]=g.escape(a.nodeValue); else if(a.nodeType==4)c["#cdata"]=g.escape(a.nodeValue);else if(c[a.nodeName])if(c[a.nodeName]instanceof Array)c[a.nodeName][c[a.nodeName].length]=g.toObj(a);else c[a.nodeName]=[c[a.nodeName],g.toObj(a)];else c[a.nodeName]=g.toObj(a)}else if(b.attributes.length)c["#text"]=g.escape(g.innerXml(b));else c=g.escape(g.innerXml(b));else if(d)if(b.attributes.length)c["#text"]=g.escape(g.innerXml(b));else c=g.escape(g.innerXml(b));else if(f)if(f>1)c=g.escape(g.innerXml(b));else for(a=b.firstChild;a;a=a.nextSibling)c["#cdata"]= g.escape(a.nodeValue)}if(!b.attributes.length&&!b.firstChild)c=null}else if(b.nodeType==9)c=g.toObj(b.documentElement);else alert("unhandled node type: "+b.nodeType);return c},toJson:function(b,c,d){var f=c?'"'+c+'"':"";if(b instanceof Array){for(var e=0,a=b.length;e<a;e++)b[e]=g.toJson(b[e],"",d+"\t");f+=(c?":[":"[")+(b.length>1?"\n"+d+"\t"+b.join(",\n"+d+"\t")+"\n"+d:b.join(""))+"]"}else if(b==null)f+=(c&&":")+"null";else if(typeof b=="object"){e=[];for(a in b)e[e.length]=g.toJson(b[a],a,d+"\t"); f+=(c?":{":"{")+(e.length>1?"\n"+d+"\t"+e.join(",\n"+d+"\t")+"\n"+d:e.join(""))+"}"}else f+=typeof b=="string"?(c&&":")+'"'+b.toString()+'"':(c&&":")+b.toString();return f},innerXml:function(b){var c="";if("innerHTML"in b)c=b.innerHTML;else{var d=function(f){var e="";if(f.nodeType==1){e+="<"+f.nodeName;for(var a=0;a<f.attributes.length;a++)e+=" "+f.attributes[a].nodeName+'="'+(f.attributes[a].nodeValue||"").toString()+'"';if(f.firstChild){e+=">";for(a=f.firstChild;a;a=a.nextSibling)e+=d(a);e+="</"+ f.nodeName+">"}else e+="/>"}else if(f.nodeType==3)e+=f.nodeValue;else if(f.nodeType==4)e+="<![CDATA["+f.nodeValue+"]]\>";return e};for(b=b.firstChild;b;b=b.nextSibling)c+=d(b)}return c},escape:function(b){return b.replace(/[\\]/g,"\\\\").replace(/[\"]/g,'\\"').replace(/[\n]/g,"\\n").replace(/[\r]/g,"\\r")},removeWhite:function(b){b.normalize();for(var c=b.firstChild;c;)if(c.nodeType==3)if(c.nodeValue.match(/[^ \f\n\r\t\v]/))c=c.nextSibling;else{var d=c.nextSibling;b.removeChild(c);c=d}else{c.nodeType== 1&&g.removeWhite(c);c=c.nextSibling}return b}};if(i.nodeType==9)i=i.documentElement;i=g.toJson(g.toObj(g.removeWhite(i)),i.nodeName,"\t");return"{\n"+k+(k?i.replace(/\t/g,k):i.replace(/\t|\n/g,""))+"\n}"};	

	var options = new Array()
	function addOption(oid, oname, odesc, oextra) {
		options[oid] = new Object()
		options[oid].name = oname
		options[oid].desc = odesc
		options[oid].value = GM_getValue('option_'+oid, false)
		options[oid].extra = oextra
	}
	
	// Current options
	addOption(2, 'Hide items in the news feed', 'Hides alerts in feed and on Collective page', true)
	addOption(3, 'Stop tabs from turning orange', 'Gives control over when tabs should turn orange and when not', true)
	addOption(4, 'Stop messages button from turning orange', 'Messages button will not turn orange on pages you selected', true)
	addOption(5, 'Quick games jumper', 'Easy way to jump to a game', false)
	addOption(6, 'Take notes in the notes tab', 'Adds a notebook to your empty notes tab', false)
	addOption(7, 'Linkify', 'Turns anything that looks like a link into a link', false)
	addOption(9, 'Message sorter', 'Sorts messages by the other person in conversation, what else do you need to know?', false)
	addOption(11, 'Minions Tracker', 'Tracks your minions gameplay and gives useful information about it.', false)
	addOption(12, 'txtPaste', 'Paste format-less text into editor.', false)
//	addOption(13, 'Pow Chat', '<span style="color: red;">HIGHLY EXPERIMENTAL - DO NOT TRY UNLESS EXPERIENCED!</span><br /> Replaces the chat interface with a much more friendlier version', false)
	addOption(14, 'I reject you, server!', 'Attempt to fix CC radio popup thinking it\'s off air by not removing the widget.<br />(De-)activates after reload of radio window', false)
	addOption(16, 'Timezone estimation', 'Attempts to guess user\'s local time according to the set location.<br /><span style="color: #999">Powered by <a href="http://www.geonames.org/">geonames.org</a></span>', false)
	addOption(17, 'Hotkey Combos', 'Assign URLs to Hotkey combinations.<br /><span style="color: #999">by CoolPerson1414</span>', true)
	addOption(18, 'Invite All', 'Allows you to check/uncheck all names on the invite page.<br /><span style="color: #999">by CoolPerson1414</span>', false)
	addOption(19, 'My Game', 'Adds a button to the Multiplayer games page to show information about the game you are in.', false)
	addOption(20, 'GiftGird', 'Displays gifts in a gird view', false)
	addOption(21, 'Fix sidebar avatars', 'Fixes avatars in sidebar (and possibly some other bugs as result of being outdated)<br /><span style="color: #999">fix found by Orngjce223</span>', false)
	addOption(22, 'Compete Page via CC Extras', 'Replaces compete page with something that works... More or less.<br /><span style="color: #999">Powered by <a href="http://www.ccextras.net">CC Extras.net</a></span>', false)

	GM_addStyle('#CCplusMenu {height: 22px; width: 100%; margin-top: 2px;}'+
				'#CCPlusModules {position: absolute; border-color: #A4C0DB #A5C1DB #A5C1DB; border-style: solid; border-width: 1px; height: 400px; width: 298px; background: #FFF; z-index: 9000;}'+
				'.CCPlusModule {height: 398px; overflow: auto; width: 296px; padding: 1px;}'+
				'#CCplusConfig .cba-off, #CCplusConfig .cba-on { width: 593px; margin-bottom: 1px; }'+
				'#CCplusConfig .cba { width: 593px; margin-bottom: 1px; padding-left: 0px; }'+
				'#CCplusConfig input[type="text"]{ font-size: 13px; margin: 2px 0px; padding: 0px; width: 400px;}'+
				'#CCplusConfig label {font-size: 12px; margin: 4px 8px 2px 0px; padding: 0px; width: 100px; display: block; float: left;}'+
				'#CCplusConfig select {font-size: 9px;} #CCplusConfig select option {font-size: 11px;}'+
				'#CCplusConfig .CCplusScriptSettings {border-top: 1px solid #A5C1DB; padding-top: 5px; clear: both;}'+
				'#CCPlusOpenMain span { padding-top: 3px; padding-bottom: 2px; } '+
				'.ccplus-sb-a-line {border: 1px solid #A4C0DB; margin: 3px;}'+ // So notes tab won't get confused
				'.ccplus-sb-a-line .sb-a-title {padding: 3px;}'+
				'.ccplus-sb-a-line .sb-a-body {padding: 3px;}'+
				'#content {min-height: 822px;}'+
				'.ccp-featureinfo {font-size: 90%; font-style: italic;}'
				);
	var userMenu = document.createElement('div');
	userMenu.id = 'CCplusMenu';
	userMenu.innerHTML =	'<span class="usel usel-gray" id="CCPlusOpenMain" onClick="CCPlusopenTab(\'Main\')"><span><img id="ccplusLogo" src="http://storage.casualcollective.com/images/global/blank.gif" style="background: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwwAADsMBx2+oZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjM2qefiJQAAALlJREFUOE/NUkkKwzAMVPKdtsdAH1n64F4cj6MxI0WBHGsssLWMRovZ35xm1u9xfp+tUdr33VSoD8QRTOmGRw6qQOB3AqESAf6G00nAoutfuX0TUQDKFjtAYABEiglA0GuPcgl3AGbGKwasdUxBMkCv/2wfxIIDuy4gw67TqEpApkW6hv/T/1dTme50AID2g4CToS6cjiiU0A1rmt9RQlq4DKCZq/eYgjOIW+hI5dalTYRrGVxu3B3lDrHmmbFF64knAAAAAElFTkSuQmCC\') no-repeat; height: 17px; width: 16px;" style="cursor: pointer;" title="Open CC+" /></span></span>';
	document.getElementById('sidebar').insertBefore(userMenu, document.getElementById('sb-twitter'))
	var modules = document.createElement('div')
	modules.id = 'CCPlusModules'
	modules.innerHTML =	'<div id="CCPlusModuleMain" class="CCPlusModule" style="display: none;">'+
						'<a href="http://www.casualcollective.com/#clubs/Casual_Collective_plus" style="color: #000; font-size: 18px; text-decoration: none; font-weight: bold;">Casual Collective +</a><p>Current version: v'+version+'</p><a href="http://www.casualcollective.com/#account/manage" style="color: #000;">Edit settings &raquo;</a><br /><br /><span style="font-size: 20px; font-weight: bold; cursor: pointer; border-bottom: 1px dashed #999;" id="ccplusthemeslink">CC+ themes directory</span><br /><br />'+
						'</div>';
	modules.style.display = 'none'
	document.getElementById('sb-tabs').insertBefore(modules, document.getElementById('sb-tabs').firstChild)
	document.body.appendChild(document.createElement("script")).innerHTML='var CCPluscurrentTab = \'none\'; function CCPlusopenTab(Newtab) { if (CCPluscurrentTab == \'none\') { document.getElementById(\'CCPlusModule\'+Newtab).style.display = \'block\'; document.getElementById(\'CCPlusModules\').style.display = \'block\'; document.getElementById(\'CCPlusOpen\'+Newtab).className = \'usel usel-grayon\'; CCPluscurrentTab = Newtab; } else if (CCPluscurrentTab == Newtab) { document.getElementById(\'CCPlusModule\'+Newtab).style.display = \'none\'; document.getElementById(\'CCPlusModules\').style.display = \'none\'; document.getElementById(\'CCPlusOpen\'+Newtab).className = \'usel usel-gray\'; CCPluscurrentTab = \'none\'; } else { document.getElementById(\'CCPlusModule\'+CCPluscurrentTab).style.display = \'none\'; document.getElementById(\'CCPlusOpen\'+CCPluscurrentTab).className = \'usel usel-gray\'; document.getElementById(\'CCPlusModule\'+Newtab).style.display = \'block\'; document.getElementById(\'CCPlusOpen\'+Newtab).className = \'usel usel-grayon\'; CCPluscurrentTab = Newtab;}}; var ccTabChanger = sbTabs.show; sbTabs.show = function(b, a) {if(CCPluscurrentTab != \'none\') {CCPlusopenTab(CCPluscurrentTab)}; return ccTabChanger.apply(sbTabs, new Array(b, a))};';
	// Selfupdate functions, checks for news and other awesome stuff.
	function setRead() {
		GM_setValue('lastRead', Date.now().toString())
		window.setTimeout(function() {document.getElementById('CCPlusOpenMain').removeEventListener('click', setRead, true)}, 50)
	}
	function addInfo() {
		newsCache = JSON.decode(GM_getValue('newscache', '{}'))
		if(newsCache.latest) {
			var setMainRed = false
			if(version < newsCache.latest) {
				document.getElementById('CCPlusModuleMain').appendChild(document.createElement('div')).innerHTML='<span style="font-weight: bold;">Update to CC+ is available!</style> <a href="http://dl.dropbox.com/u/17091/CCplus/CCplus.user.js">Get it now!</a>'
				setMainRed = true // So it won't get called multiple times
			}
			var lastread = GM_getValue('lastRead', 0)
			if(Date.parse(newsCache.news[0].time) > lastread) {
				setMainRed = true
				document.getElementById('CCPlusOpenMain').addEventListener("click", setRead, true)
			}
			newsCache.news.forEach(function(item) {
				var newsItem = document.createElement('div');
				newsItem.className = 'ccplus-sb-a-line'
				if(lastread < Date.parse(item.time)) {
					newsItem.style.backgroundColor = '#FFF0F0'
				}
				newsItem.innerHTML = '<div class="sb-a-title">'+item.title+'</div><div class="sb-a-body"><span class="f-t-edited">Posted on: '+item.time+'</span><br />'+item.body+'</div>'
				document.getElementById('CCPlusModuleMain').appendChild(newsItem)
			});
			if(setMainRed) {
				document.getElementById('CCPlusOpenMain').className = 'usel usel-red'
			}
		}
	}
	if((Date.now() - GM_getValue('lastUpdate', 0)) >= 21600000) { // 6 hours
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://dl.dropbox.com/u/17091/CCplus/updatecheck.txt",
			headers:{
				"User-Agent":navigator.userAgent
			},
			onload:function(response) {
				// Cache the data for use very soon
				GM_setValue('newscache', response.responseText)
				addInfo()
			}
		});
		GM_setValue('lastUpdate', Date.now().toString())
	} else {
		addInfo()
	}

	function addTab(id, content) {
		newTab = document.createElement('span')
		newTab.className = 'usel usel-gray'
		newTab.id = 'CCPlusOpen'+id
		newTab.innerHTML = '<span>'+content+'</span>'
		newTab.setAttribute('onclick', 'CCPlusopenTab(\''+id+'\')')
		document.getElementById('CCplusMenu').appendChild(newTab)
		
		newTabContent = document.createElement('div')
		newTabContent.className = 'CCPlusModule'
		newTabContent.id = 'CCPlusModule'+id
		newTabContent.innerHTML = ''
		newTabContent.style.display = 'none'
		document.getElementById('CCPlusModules').appendChild(newTabContent)
	}
	

	// Update checker
	var checkingUpdate = 0
	function checkUpdate() {
		if(!checkingUpdate) {
			checkingUpdate = 1
			document.getElementById('CCplusUpdateLink').innerHTML = 'Checking for update...'
			GM_xmlhttpRequest({
				method:"GET",
				url:"http://dl.dropbox.com/u/17091/CCplus/CCplus_latest.txt",
				headers:{
					"User-Agent":navigator.userAgent
				},
				onload:function(response) {
					if(response.responseText > version) {
						updateLink = document.getElementById('CCplusUpdateLink')
						updateLink.innerHTML = 'New version is out! '
						downloadLink = document.createElement('a');
						downloadLink.href = 'http://dl.dropbox.com/u/17091/CCplus/CCplus.user.js'
						downloadLink.innerHTML = 'Download it now!'
						updateLink.appendChild(downloadLink);
					} else {
						document.getElementById('CCplusUpdateLink').innerHTML = 'Up to date!'
					}
				}
			});
		}
	}
	function addOption(script, name, type, text, vdefault) {
		value = GM_getValue('option_'+script+'_'+name, vdefault)
		switch (type) {
			case 'switch':
				document.getElementById('CCPlusScript'+script).innerHTML += '<br style="clear: both;"/><a class="cba-'+(value ? 'on' : 'off')+'" href="javascript:void(0);" onclick="checkBox(this,$(this).getNext(),1);">'+text+'</a><input type="checkbox" '+(value ? 'checked="checked" ':'')+' name="'+name+'" style="display: none;"/>'
				break;
			case 'int':
				document.getElementById('CCPlusScript'+script).innerHTML += '<br style="clear: both;"/><span class="cba"><input type="text" '+(value ? 'value="'+value+'" ':'')+' name="'+name+'" class="CCPlusint" size="10"/> '+text+'</span>'
				break;
			case 'rad':
				document.getElementById('CCPlusScript'+script).innerHTML += '<br style="clear: both;"/><input style="width:10px;" type="radio"'+(value ? 'checked="checked" ':'checked=""')+' name="radSet'+script+'"/><span>'+text+'</span><br/>'
				break;
			case 'text':
				document.getElementById('CCPlusScript'+script).innerHTML += '<br style="clear: both;"/><label>'+text+'</label><input type="text" '+(value ? 'value="'+value+'" ':'')+' name="'+name+'" class="CCPlustext" size="10"/></span>'
				break;
		}
	}
	function settingsSaver() {
		cssQuery('input.ccPlusOption').forEach(function(element){
			GM_setValue('option_'+element.name, (element.checked))
			options[element.name].value = element.checked
			if(document.getElementById('CCPlusScript'+element.name)) {
				cssQuery('div#CCPlusScript'+element.name+' input').forEach(function(scriptElement) {
					if(scriptElement.type == 'checkbox') {
						GM_setValue('option_'+element.name+'_'+scriptElement.name, scriptElement.checked)
					} else if(scriptElement.type == 'text' && scriptElement.className == 'CCPlusint') {
						var value = parseInt(scriptElement.value, 10)
						if (value > -1) {
							GM_setValue('option_'+element.name+'_'+scriptElement.name, value)
						}
					} else if(scriptElement.type == 'radio') {
						GM_setValue('option_'+element.name+'_radio', scriptElement.value)
					} else if(scriptElement.type == 'text' && scriptElement.className == 'CCPlustext') {
						var value = scriptElement.value;
						GM_setValue('option_'+element.name+'_'+scriptElement.name, value)
					}
				});
			}
		});
		recentlyChanged = true;
		unsafeWindow.ccHistory.update();
	}
	function addAStyle(id, css) {
		// Also adds ID to style tag, so it can be easily removed when needed
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		style.id = id;
		document.getElementsByTagName('head')[0].appendChild(style);
	}



	/* var powChat = {
		displaymode: false, // Whether rooms are shown
		connected: false, // Connected to meebo
		version: 0.01,

		rooms: [], // List of room ids
		roomdata: {}, // Data for rooms
		currRoom: false,
		rid: false,
		sid: false,
		userdata: {},
		knownUsers: {},
		console: {
			element: null,
			log: function(title, data) {
				if(powChat.console.element) {
					powChat.console.element.value += '---'+title+'---'+"\n\n"+(data ? data+"\n\n" : '')
					powChat.console.element.scrollTop = powChat.console.element.scrollHeight
				}
			}
		},
		// Functions
		init: function () {
			addTab(13, 'Chat')
			document.getElementById('CCPlusModule13').className += ' CCPluspowChat'
			document.getElementById('CCPlusModule13').innerHTML = '<div style="font-size: 32px; font-weight: bold;">powChat v.'+powChat.version+'</div><span style="font-size: 9px;">Subscript of CC+ - Made by t2t2</span><br /><br /><span style="color: red;">Not connected</span>'
			unsafeWindow.cc.oldShowChat = unsafeWindow.cc.showChat
			unsafeWindow.cc.showChat = function(roomid) {window.setTimeout(function() {powChat.connect(roomid)}, 0)}
			addAStyle('powchat', '.CCPluspowChat {padding: 0; width: 298px; height: 400px;} .CCPluspowChat #powChatRooms {height: 20px; border-bottom: 1px solid #A4C0DB;} #powChatListActive {width: 217px; float: left; overflow: hidden; height: 20px;} #powChatListActive .currentChat {cursor: default; font-weight: bold; border-right: 1px solid #A5C1DB; font-size: 10px; height: 12px; padding: 4px; float: left;} #powChatRoomListLink {display: block; text-decoration: none; color: #000; font-weight: bold; font-size: 14px; padding: 2px 4px; float: right; border-left: 1px solid #A5C1DB; border-right: 1px solid #A5C1DB;} #powChatClose {float: right; display: block; height: 16px; width: 16px; padding: 2px;} #powChatContainers {height: 373px; width: 292px; padding: 3px;} .powChatUsers{border: 1px solid #A4C0DB; width: 286px; overflow: auto; padding: 2px; height: 100px; font-size: 11px;} .powUserCount {float: right; color: #999;} .powUserCount:after {content: " people"} .powChatMessages {overflow-y: scroll; width: 286px; border: 1px solid #A4C0DB; padding: 2px; height: 233px; margin-top: 3px; font-size: 11px;} .powChatTextBox {width: 286px; border: 1px solid #A4C0DB; padding: 2px; height: 16px; margin-top: 3px; font-size: 11px;}')
			
			// For console:
			
			var powConsole = document.createElement('textarea');
			powConsole.id = 'powchatConsole';
			powConsole.className = 'mceNoEditor';
			document.getElementById('sidebar').insertBefore(powConsole, document.getElementById('sb-twitter'))
			addAStyle('powchatconsolecss', '#powchatConsole {background: url("http://cdn.casualcollective.com/images/site/boxbgsm.png") repeat-y scroll 0 0 transparent; border: 1px solid #A5C1DB; margin-top: 10px; width: 298px; height: 298px; overflow-y: scroll; font-size: 9px; font-family: Verdana;} #content {min-height: 1122px;}')
			powChat.console.element = document.getElementById('powchatConsole')
			
		},
		connect: function(roomid) {
			powChat.console.log('Connecting...')
			if(powChat.currRoom === false) {
				if((Date.now().toString() - GM_getValue('chatcheck', 0)) < 30000) {
					alert('Error! Chat can only be active in one tab at a time.'+"\n\n"+'Also, due to technical reasons, please wait 30 seconds before attempting to connect to the chat again!')
					return false;
				}
				GM_setValue('chatcheck', Date.now().toString())
				if(!powChat.displaymode) {
					unsafeWindow.CCPlusopenTab('13')
					document.getElementById('CCPlusModule13').innerHTML = '<div id="powChatRooms"><div id="powChatListActive"><div class="currentChat">Loading...</div></div><a id="powChatClose" href="javascript:void(0);" title="Disconnect"><img src="http://www.casualcollective.com/theme/default/images/icons/sweetie/16-em-cross.png" /></a><a id="powChatRoomListLink" href="javascript:void(0);">Full list</a></div><div id="powChatContainers"></div>'
					document.getElementById('powChatClose').addEventListener('click', function() {powChat.disconnect()}, true)
					powChat.displaymode = true
					powChat.userdata = {iconurl: "http://dl.dropbox.com/u/17091/CCplus/thelogo.png", nickname: "[CC+] "+unsafeWindow.user.username, profile_url: "http://www.casualcollective.com/#clubs/Casual_Collective_plus", profile_url_text: "Powered by CC+"}
				}

				GM_xmlhttpRequest({
					method: 'POST',
					url: 'http://www.casualcollective.com/ajax/chat/join',
					data: 'id='+roomid,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded"
					},
					onload: function(response) {
						powChat.console.log(response.finalUrl, response.responseText)
						if (response.status == 200) {
							try {
								meebodata = JSON.decode(response.responseText)
							} catch(e) {
								alert(e.message);
								return;
							}
							powChat.rooms[powChat.rooms.length] = meebodata.widgetlabel
							powChat.roomdata[meebodata.widgetlabel] = meebodata

							powChat.roomdata[meebodata.widgetlabel].userlist = []
							powChat.roomdata[meebodata.widgetlabel].queue = []
							powChat.currRoom = meebodata.widgetlabel
							document.getElementById('powChatListActive').childNodes[0].innerHTML = meebodata.groupname
							var chatBox = document.createElement('div');
								chatBox.id = 'powChat-'+meebodata.widgetlabel
								chatBox.className = 'powChatViewBox'
								chatBox.innerHTML = '<div class="powChatUsers"></div><div class="powChatMessages"></div><input class="powChatTextBox"></input>'
							document.getElementById('powChatContainers').appendChild(chatBox)
							document.getElementById('powChat-'+meebodata.widgetlabel).childNodes[2].addEventListener('keyup', function(event) {
								if(event.keyCode == '13') {
									powChat.sendMessage(meebodata.widgetlabel)
								}
							}, true);
							powChat._askMeebo(meebodata.widgetlabel)
						} else {
							alert(response.responseText)
						}
					}
				});
			} else {
				alert('Currently, only 1 room at a time is supported!')
			}
		},
		disconnect: function(byhost) {
			// STOP! Hammer time!
			if(byhost) {
				powChat.currRoom = false
				powChat.displaymode = false
				powChat.connected = false
				document.getElementById('CCPlusModule13').innerHTML = '<div style="font-size: 32px; font-weight: bold;">powChat v.'+powChat.version+'</div><span style="font-size: 9px;">Subscript of CC+ - Made by t2t2</span><br /><br /><span style="color: red;">Not connected</span>'
				GM_setValue('chatcheck', 0)
			} else {
				tempRoom = powChat.currRoom
				powChat.currRoom = false
				powChat.displaymode = false
				powChat.updatefunction(tempRoom)
			}
		},
		nuke: function() {
			
		},
		// Gets instructions from meebo.
		_askMeebo: function(roomid) {
			GM_setValue('chatcheck', Date.now().toString())
			requrl = roomid.substr(0,1)+'/'+roomid.substr(1,1)+'/'+roomid.substr(2)
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://widgetconfig.meebo.com/'+requrl,
				onload: function(response) {
					powChat.console.log(response.finalUrl, response.responseText)
					if (response.status == 200) {
						response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");

						responseJSON = JSON.decode(xml2json(response.responseXML, ''))
						powChat.roomdata[roomid].roomloc = responseJSON.m.p[3].@v
						powChat.roomdata[roomid].server = powChat.roomdata[roomid].roomloc.split('@')[1]
						powChat.roomdata[roomid].status = 0
						powChat.roomdata[roomid].connections = 0
						powChat.roomdata[roomid].rid = Math.floor(Math.random()*90071992547) // Should allow about 9007109182748444 requests
						powChat.updatefunction(roomid)
					} else {
						alert(response.responseText)
					}
				}
			});
		},

		updatefunction: function(roomid) {
			if(powChat.currRoom === false && !powChat.connected) { // When connection has ended, currently just ends script.
				return false
			}
			GM_setValue('chatcheck', Date.now().toString())
			var askfor = {
				body: {
					"@xmlns": "http://jabber.org/protocol/httpbind"
				}
			}
			// Request data
			askfor.body.@rid = ++powChat.roomdata[roomid].rid
			if(powChat.roomdata[roomid].status == 0) { // First connections
				powChat.connected = true
				askfor.body.@to = powChat.roomdata[roomid].server
				askfor.body["@xml:lang"] = 'en'
				askfor.body.@content = 'text/xml; charset=utf-8'
				askfor.body.@hold = '1'
				askfor.body.@wait = '30'
			} else if(powChat.roomdata[roomid].status == 1) { // Authendicate
				askfor.body.@sid = powChat.roomdata[roomid].sid
				powChat.roomdata[roomid].connectionUID = 'guest'+Math.floor(Math.random()*999999)
				askfor.body.iq = {
					'@id': 'login',
					'@type': 'set',
					'query': {
						'@xmlns': 'jabber:iq:auth',
						'username': powChat.roomdata[roomid].connectionUID,
						'resource': 'meebome',
						'password': 'mm'
					}
				}
				powChat.roomdata[roomid].status = 2
			} else if(powChat.roomdata[roomid].status == 2) { // Wait for login response
				askfor.body.@sid = powChat.roomdata[roomid].sid
			} else if(powChat.roomdata[roomid].status == 3) { // Logged on!
				askfor.body.@sid = powChat.roomdata[roomid].sid
				// Send username and random ID
				var id
				if(!(id = GM_getValue('chat_id', false))) {
					var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz+/='.split('');
					id = ''
					for (var i = 0; i < 40; i++) {
						id += chars[Math.floor(Math.random() * chars.length)];
					}
					GM_setValue('chat_id', id)
				}
				powChat.roomdata[roomid].uniqID = id
				askfor.body.presence = {
					'@from': powChat.roomdata[roomid].connectionUID+'@'+powChat.roomdata[roomid].server+'/meebome',
					'@xmlns': 'jabber:client',
					nick: {
						'@xmlns': 'http://jabber.org/protocol/nick',
						'#text': powChat.userdata.nickname
					},
					uid: {
						'@id': powChat.roomdata[roomid].uniqID,
						'@xmlns': 'meebo:uid'
					}
				}
				powChat.roomdata[roomid].status = 4 // Nothing to expect here.
				window.setTimeout(function() {powChat.updatefunction(roomid)}, 300) // Start cooking the other one.
			} else if(powChat.roomdata[roomid].status == 4) {
				askfor.body.@sid = powChat.roomdata[roomid].sid
				// Send user's avatar etc
				askfor.body.iq = {
					'@id': 'vcards',
					'@type': 'set',
					'vCard': {
						'@xmlns': 'vcard-temp',
						'PHOTO': {
							'EXTVAL': powChat.userdata.iconurl
						},
						'URL': powChat.userdata.profile_url,
						'TITLE': powChat.userdata.profile_url_text,
					}
				}
			} else if(powChat.roomdata[roomid].status == 5) { // Join the room
				askfor.body.@sid = powChat.roomdata[roomid].sid
				askfor.body.presence = {
					'@to': powChat.roomdata[roomid].roomloc+'/'+powChat.userdata.nickname,
					'@xmlns': 'jabber:client',
					'x': {
						'@xmlns': 'http://jabber.org/protocol/muc'
					},
					'uid': {
						'@id': powChat.roomdata[roomid].uniqID,
						'@xmlns': 'jabber:uid'
					}
				}
				powChat.roomdata[roomid].status = 6
			} else if(powChat.roomdata[roomid].status == 6) {
				askfor.body.@sid = powChat.roomdata[roomid].sid
				if(powChat.roomdata[roomid].queue.length > 0) {
					powChat.roomdata[roomid].queue.forEach(function(todo) {
						if(todo.type == 'message') {
							if(!(askfor.body.message instanceof Array)) {
								askfor.body.message = []
							}
							askfor.body.message.push({
								'@type': 'groupchat',
								'@to': powChat.roomdata[roomid].roomloc,
								'@from': powChat.roomdata[roomid].connectionUID+'@'+powChat.roomdata[roomid].server+'/meebome',
								'@xmlns': 'jabber:client',
								'body': todo.message,
								'uid': {
									'@id': powChat.roomdata[roomid].uniqID,
									'@xmlns': 'jabber:uid'
								}
							});
						}
					});
					powChat.roomdata[roomid].queue = []
				}
			}
			if(powChat.currRoom === false && powChat.connected) {
				askfor.body.@type = 'terminate'
				askfor.body.presence = { "@type":'unavailable', "@xmlns": 'jabber:client'}
			}
			// Do the request
			powChat.roomdata[roomid].connections++
			params = json2xml(askfor)
			powChat.console.log('Sending: '+powChat.roomdata[roomid].rid, params)
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://'+powChat.roomdata[roomid].server+'/mm',
				data: params,
				onload: function(response) {
					if(!powChat.currRoom && !powChat.connected || !document.getElementById('powChatRooms')) {
						return false
					}
					if(response.status == 404) {
						powChat.disconnect(true)
						return
					}
					powChat.console.log('Recieved: '+powChat.roomdata[roomid].rid, response.responseText)
					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
					responseJSON = JSON.decode(xml2json(response.responseXML, ''))
					// Deal with answered data
					if(responseJSON.body.@sid) { // Only happens on first contact according to spec.
						powChat.roomdata[roomid].sid = responseJSON.body.@sid // Needed for every further connection
						powChat.roomdata[roomid].status = 1
					} else if (powChat.roomdata[roomid].status == 2 && responseJSON.body.iq.@id == 'login') { // Was the login successful?
						if(responseJSON.body.iq.@type == 'result') { // Did we get on?
							powChat.roomdata[roomid].status = 3 // Success!
						} else {
							alert('Doh, something wen\'t wrong during logon :(')
							powChat.disconnect(true)
							return
						}
					} else if(powChat.roomdata[roomid].status == 3) { // Sent username, technically impossible.
						powChat.roomdata[roomid].status = 4 // Nothing to expect here.
					} else if(powChat.roomdata[roomid].status == 4) {
						if(responseJSON.body.iq && responseJSON.body.iq.@id == 'vcards') { // Sent datas, check if 
							powChat.roomdata[roomid].status = 5 // Nothing to expect here.
						}
					} else { // Response to joining the room, and other stuff
						if(responseJSON.body.presence) { // Joins/Leaves
							if(!(responseJSON.body.presence instanceof Array)) {
								responseJSON.body.presence = [responseJSON.body.presence]
							}
							responseJSON.body.presence.forEach(function(userinfo) {
								if(userinfo['@type'] == 'error') {
									powChat.userdata.nickname += ' '
									powChat.roomdata[roomid].status = 5
									// Meebo does the same thing, essencially.
								} else if(userinfo['@type'] && userinfo['@type'] == 'unavailable') { // Remove user
									powChat.roomdata[roomid].userlist.splice(powChat.roomdata[roomid].userlist.indexOf(userinfo['@from']), 1)
								} else { // Add user
									currentuser = userinfo['@from']
									powChat.knownUsers[currentuser] = {
										username: userinfo['@from'].split('/')[1],
									}
									powChat.roomdata[roomid].userlist.push(currentuser)
								}
							});
							powChat.userlistUpt(roomid)
						}
						if(responseJSON.body.message) {
							if(!(responseJSON.body.message instanceof Array)) {
								responseJSON.body.message = [responseJSON.body.message]
							}
							responseJSON.body.message.forEach(function(recievedmsg) {
								if(recievedmsg['@type'] == 'groupchat' && recievedmsg.body) { // Seperate messages
									if(document.getElementById('CCPlusOpen13').className == 'usel usel-gray')
										document.getElementById('CCPlusOpen13').className = 'usel usel-red'
									document.getElementById('powChat-'+roomid).childNodes[1].appendChild(document.createElement('div')).innerHTML = '<strong>'+powChat.knownUsers[recievedmsg['@from']].username.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')+'</strong>: '+recievedmsg.body.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
									document.getElementById('powChat-'+roomid).childNodes[1].scrollTop = document.getElementById('powChat-'+roomid).childNodes[1].scrollHeight
								} else if(recievedmsg['@type'] == 'chat') {
								}
							});
						}
					}
					// Start new request
					powChat.roomdata[roomid].connections--
					if(powChat.roomdata[roomid].connections < 1) {
						powChat.updatefunction(roomid)
					}
					delete response
					delete responseJSON
				}
			});
		},
		userlistUpt: function(roomid) {
			tempUserList = []
			powChat.roomdata[roomid].userlist.forEach(function(user) {
				tempUserList.push({
					username: powChat.knownUsers[user].username,
				});
			})
			tempUserList.sort(function(a, b) {
				var x = a.username.toLowerCase();
				var y = b.username.toLowerCase();
				return ((x < y) ? -1 : ((x > y) ? 1  : 0))
			});
			
			document.getElementById('powChat-'+roomid).childNodes[0].innerHTML = '<span class="powUserCount">'+tempUserList.length+'</span>'
			tempUserList.forEach(function(user) {
				document.getElementById('powChat-'+roomid).childNodes[0].appendChild(document.createElement('div')).innerHTML = user.username
			});
			document.getElementById('powChat-'+roomid).childNodes[0]
			delete tempUserList
		},
		sendMessage: function(roomid) {
			powChat.roomdata[roomid].queue.push({
				type: 'message',
				message: document.getElementById('powChat-'+roomid).childNodes[2].value
			});
			powChat.updatefunction(roomid)
			document.getElementById('powChat-'+roomid).childNodes[2].value = ''
		}
	};
	*/
	
	
	var first = true
	var cache = new Array();
	var bypass = false;
	var recentlyChanged = false;
	function runCCPlus_page() {
		// Global variables
		var onPage = window.location.hash.replace('#', '').split('?')[0].split('/')
		var configOn = false
		
		// Cache setup
		if(first) {
			cache[3] = new Object()
			cache[6] = new Object()
			cache[11] = new Object()
			cache[12] = new Object()
			cache[17] = new Object()
			cache[21] = new Object()
		}
		
		if(onPage[0] == 'clubs' && onPage[1] == 'Help_and_Support' && onPage[2] == 'Forum' && onPage[4] == 'newthread') {
			var ccPlusAlertField = document.getElementById('forum').childNodes[0].childNodes[0].insertRow(1).insertCell(-1)
			ccPlusAlertField.colSpan = 2
			ccPlusAlertField.className = 'nt'
			ccPlusAlertField.style.cssText = 'font-weight: bold;'
			ccPlusAlertField.innerHTML = '<span style="color: red;">Note!</span> The bug you may be reporting might be a CC+ bug. Please disable CC+, reload the page (using browsers reload function) and try to duplicate the bug. If it still exists, this is most probably a CC bug and should be posted! If the bug is gone, but back when you enable CC+ again, post it in <a href="http://www.casualcollective.com/#groups/Casual_Collective_plus/forum">our forums</a>'
		}
		if(onPage[0] == 'account' && onPage[1] == 'manage' && !onPage[2]) {
			configOn = true
			var configMenu = document.createElement('div');
			configMenu.id = 'CCplusConfig';
			configMenu.className = 'groupblock'
			configMenu.innerHTML =	'<h1 class="active" style="border-bottom: none;"><span style="float: left; height: 30px;">Casual collective +</span><span style="float: right; font-size: 10px; height: 30px; cursor: pointer;" id="CCplusUpdateLink">Check for update!</span></h1><div class="gb-contentnb"><table id="ccPlusOptionsTable" class="boxform" cellspacing="1"><tbody></tbody></table></div>';
			document.getElementById('pagecontent').appendChild(configMenu)
			options.forEach(function(OInfo, OId) {
				optionRow = document.getElementById('ccPlusOptionsTable').insertRow(-1).insertCell(-1)
				optionRow.innerHTML = '<a href="javascript:void(0);" onclick="checkBox(this,$(this).getNext(),1);" class="cba-'+(OInfo.value?'on':'off')+'">'+OInfo.name+'</a><input type="checkbox" name="'+OId+'" id="ccPlusChoice'+OId+'" class="ccPlusOption" '+(OInfo.value?'checked ':'')+'style="display: none;" />'+(OInfo.extra ? '<a class="button-edit" href="#" style="float: right;" onClick="if(document.getElementById(\'CCPlusScript'+OId+'\').style.display == \'block\') {document.getElementById(\'CCPlusScript'+OId+'\').style.display = \'none\'} else {document.getElementById(\'CCPlusScript'+OId+'\').style.display = \'block\'}; return false;" ><span>Settings</span></a>':'')+'<div class="ccp-featureinfo">'+OInfo.desc+'</div>'
				if(OInfo.extra) {
					var scriptconfig = document.createElement('div')
					scriptconfig.id = 'CCPlusScript'+OId
					scriptconfig.className = 'CCplusScriptSettings'
					scriptconfig.style.display = 'none'
					optionRow.appendChild(scriptconfig);
				}
			});
			var saveLinkRow = document.getElementById('ccPlusOptionsTable').insertRow(-1).insertCell(-1)
			saveLinkRow.innerHTML = '<div class="but but-gray"><a id="CCPlusSaveOptionsLink" href="#" onClick="return false;"><span>Save changes</span></a></div>'
			document.getElementById('CCplusUpdateLink').addEventListener("click", checkUpdate, false)
			document.getElementById('CCPlusSaveOptionsLink').addEventListener("click", settingsSaver, false)
		}
		
		// Remove news feeds
		if(options[2].value == true) {
			elements = new Array()
			if(GM_getValue('option_2_scores', false)) {
				elements = elements.concat(cssQuery('.a-l-highscore'))
			}
			if(GM_getValue('option_2_shouts', false)) {
				elements = elements.concat(cssQuery('.a-l-shout'))
			}
			if(GM_getValue('option_2_twitter', false)) {
				elements = elements.concat(cssQuery('.a-l-twitter'))
			}
			if(GM_getValue('option_2_reply', false)) {
				elements = elements.concat(cssQuery('.a-l-forum'))
			}
			if(GM_getValue('option_2_gift', false)) {
				elements = elements.concat(cssQuery('.a-l-sendgift, .a-l-receivegift'))
			}
			if(GM_getValue('option_2_award', false)) {
				elements = elements.concat(cssQuery('.a-l-award'))
			}
			elements.forEach(function(element) {
				element.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
			});
		}
		if(configOn) {
			document.getElementById('CCPlusScript2').innerHTML = 'Hide:'
			addOption(2, 'scores', 'switch', 'High scores', false)
			addOption(2, 'shouts', 'switch', 'Shouts', false)
			addOption(2, 'twitter', 'switch', 'Twitter updates', false)
			addOption(2, 'reply', 'switch', 'Replies', false)
			addOption(2, 'gift', 'switch', 'Gifts', false)
			addOption(2, 'award', 'switch', 'Awards', false)
		}
		
		// Disable orange tabs
		if(options[3].value == true) {
			if(!document.getElementById('CCPlusOranges')) {
				cache[3].active = false;
				cache[3].manual = false;
				cache[3].settings = new Array();
				cache[3].oldFunct = unsafeWindow.sbTabs.addHighlight
				cache[3].oldDsel = unsafeWindow.sbTabs.removeHighlight
				
				orangeSwitch = function(automatic) {
					if(cache[3].active) {
						if(automatic == true && cache[3].manual) return;
						cache[3].active = false;
						document.getElementById('CCPlusOranges').title = 'Click to block red tabs'
						document.getElementById('CCPlusOranges').style.textShadow = ''
						if(cache[3].settings.length > 0) {
							cache[3].settings.forEach(function(tab) {
								cache[3].oldFunct.call(unsafeWindow.sbTabs, tab, false)
							});
						}
						cache[3].settings = new Array()
						if(automatic != true) cache[3].manual = false;
					} else {
						cache[3].active = true;
						if(automatic != true) cache[3].manual = true;
						document.getElementById('CCPlusOranges').title = 'Blocking red tabs (Click to unblock)'
						document.getElementById('CCPlusOranges').style.textShadow = '#F00 0px 0px 6px, #F00 0px 0px 4px, #F00 0px 0px 2px'
						unsafeWindow.sbTabs.sels.forEach(function(element, order) {
							if(element.className.indexOf('dsel-red') >= 0) {
								unsafeWindow.sbTabs.removeHighlight.call(unsafeWindow.sbTabs, order, true)
								cache[3].settings.push(order)
							}
						});
					}
				}
				allowShowing = function(b, a) {
					if(cache[3].active) {
						cache[3].settings.push(b)
						return false
					} else {
						cache[3].oldFunct.call(unsafeWindow.sbTabs, b, a)
						return true
					}
				}
				removeDupes = function(a) {
					if(cache[3].active) {
						location = cache[3].settings.indexOf(a)
						if(location != -1) {
							cache[3].settings.splice(location, 1)
						}
					}
				}
				
				newTab = document.createElement('span')
				newTab.className = 'usel usel-gray sb-s-r'
				newTab.id = 'CCPlusOranges'
				newTab.innerHTML = '<span style="color: #F00;">&#8226;</span>'
				newTab.title = 'Click to block red tabs'
				newTab.addEventListener("click", orangeSwitch, true)
				document.getElementById('CCplusMenu').appendChild(newTab)
				
				unsafeWindow.sbTabs.addHighlight = function(b, a) {
					window.setTimeout(function() {allowShowing.call(null, b, a)}, 0)
				}
				unsafeWindow.sbTabs.removeHighlight = function(a, ccplusover) {
					if(!ccplusover) window.setTimeout(function() {removeDupes.call(null, a)}, 0)
					cache[3].oldDsel.call(unsafeWindow.sbTabs, a)
				}
			}
			if(((GM_getValue('option_3_games', false) && onPage[0] == 'games' && onPage[1]) || (GM_getValue('option_3_clubs', false) && onPage[0] == 'clubs') || (GM_getValue('option_3_teams', false) && onPage[0] == 'teams') || (GM_getValue('option_3_profile', false) && onPage[0] == 'profiles') || (GM_getValue('option_3_forums') && (onPage[0] == 'forums' || onPage[0] == 'groups' && onPage[2] == 'forum')) || GM_getValue('option_3_all', false)) && !cache[3].active) {
				orangeSwitch(true)
			} else if (cache[3].active) {
				orangeSwitch(true)
			}
		} else if(document.getElementById('CCPlusOranges')) {
			if(cache[3].active) orangeSwitch()
			unsafeWindow.sbTabs.addHighlight = cache[3].oldFunct
			unsafeWindow.sbTabs.removeHighlight = cache[3].oldDsel
		}
		if(configOn) {
			document.getElementById('CCPlusScript3').innerHTML = 'Auto-Disable on:'
			addOption(3, 'games', 'switch', 'Games page', false)
			addOption(3, 'clubs', 'switch', 'Club pages', false)
			addOption(3, 'teams', 'switch', 'Team pages', false)
			addOption(3, 'profile', 'switch', 'Profile', false)
			addOption(3, 'forums', 'switch', 'Forums', false)
			addOption(3, 'all', 'switch', 'All pages (override)', false)
		}
		
		// Disable messages button
		if(options[4].value == true) {
			if((GM_getValue('option_4_games', false) && onPage[0] == 'games' && onPage[1]) || (GM_getValue('option_4_groups', false) && onPage[0] == 'groups') || (GM_getValue('option_4_profile', false) && onPage[0] == 'profiles') || (GM_getValue('option_4_forums') && (onPage[0] == 'forums' || onPage[0] == 'groups' && onPage[2] == 'forum')) || GM_getValue('option_4_all', false)) {
				if(!document.getElementById('ccPlusAntiOrangeMessage')) {
					addAStyle('ccPlusAntiOrangeMessage', '#userbox a.unreadmessages {background-position: -74px -237px; left: 95px;}')
				}
			} else {
				if(document.getElementById('ccPlusAntiOrangeMessage')) {
					document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusAntiOrangeMessage'))
				}
			}
		}
		if(configOn) {
			document.getElementById('CCPlusScript4').innerHTML = 'Disable on:'
			addOption(4, 'games', 'switch', 'Games page', false)
			addOption(4, 'groups', 'switch', 'Groups pages', false)
			addOption(4, 'profile', 'switch', 'Profile', false)
			addOption(4, 'forums', 'switch', 'Forums', false)
			addOption(4, 'all', 'switch', 'All pages (override)', false)
		}
		
		// Quick games launch
		if(options[5].value == true) {
			if(recentlyChanged && document.getElementById('CCPlusModule5') && document.getElementById('CCPlusModule5').style.display == 'block') {
				unsafeWindow.CCPlusopenTab(5) // closes tab if it's open
				document.getElementById('CCplusMenu').removeChild(document.getElementById('CCPlusOpen5'))
				document.getElementById('CCPlusModules').removeChild(document.getElementById('CCPlusModule5'))
			}
			if(!document.getElementById('CCPlusModule5')) {
				addTab(5, 'Games')
				document.getElementById('CCPlusModule5').innerHTML = '<div class="ccplus-sb-a-line"><div class="sb-a-title">Multiplayer Games</div><div class="sb-a-body"><a href="http://www.casualcollective.com/#games/Buggle_Connect" class="gameicon gi-3"><span>Buggle Connect</span></a><a href="http://www.casualcollective.com/#games/Desktop_Armada" class="gameicon gi-2"><span>Desktop Armada</span></a><a href="http://www.casualcollective.com/#games/Desktop_TD_Pro" class="gameicon gi-13"><span>DTD Pro</span></a><a href="http://www.casualcollective.com/#games/Farragomate" class="gameicon gi-5"><span>Farragomate</span></a><a href="http://www.casualcollective.com/#games/Minions" class="gameicon gi-4"><span>Minions</span></a><a href="http://www.casualcollective.com/#games/minions on ice" class="gameicon gi-11"><span>MoI</span></a><a target="_blank" href="http://apps.facebook.com/backyardmonsters/?ref=ccplus" class="gameicon" style="background: url(\'http://dl.dropbox.com/u/17091/CCplus/gameIcons/bym.png\');"><span>Backyard Monsters (Facebook)</span></a><div style="clear: both;"></div></div></div><div class="ccplus-sb-a-line"><div class="sb-a-title">Single Player Games</div><div class="sb-a-body"><a href="http://www.casualcollective.com/#games/Attack_of_the_Buggles" class="gameicon gi-8"><span>AotB</span></a><a href="http://www.casualcollective.com/#games/Buggle_Stars" class="gameicon gi-9"><span>Buggle Stars</span></a><a href="http://www.casualcollective.com/#games/Flash_Element_TD_2" class="gameicon gi-7"><span>FETD2</span></a><a href="http://www.casualcollective.com/#games/Push" class="gameicon gi-15"><span>Push</span></a><a href="http://www.casualcollective.com/#games/Splitter_2" class="gameicon gi-14"><span>Splitter 2</span></a><a href="http://www.casualcollective.com/#games/The_Space_Game" class="gameicon gi-10"><span>The Space Game</span></a><a href="http://www.casualcollective.com/#games/TSG_Missions" class="gameicon gi-16"><span>TSG Missions</span></a><a href="http://apps.facebook.com/desktopdefender/?ref=ccplus" target="_blank" class="gameicon" style="background: url(\'http://dl.dropbox.com/u/17091/CCplus/gameIcons/DD.png\')"><span>Desktop Defender (Facebook)</span></a><br style="clear: both;" /></div></div>'
				addAStyle('ccPlusGameSwitch', '#CCPlusModule5 .gameicon { float: left; margin-bottom: 1px; margin-right: 1px; width: 65px;}')
			}
		} else if (recentlyChanged) {
			if(document.getElementById('CCPlusModule5')) {
				if(document.getElementById('CCPlusModule5').style.display = 'block')
					unsafeWindow.CCPlusopenTab(5) // closes tab if it's open
					
				document.getElementById('CCplusMenu').removeChild(document.getElementById('CCPlusOpen5'))
				document.getElementById('CCPlusModules').removeChild(document.getElementById('CCPlusModule5'))
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusGameSwitch'))
			}
		}
		// New Notes Tab
		if(options[6].value == true) {
			if(!document.getElementById('ccPNBNew')) {
				addAStyle('ccPlusNotebookCSSstyle', '#sb-a-noalerts {border-bottom: none; margin: 3px; padding: 0px;} #sb-a-noalerts .sb-a-title {padding-bottom: 10px;} .CCPlusNotepadNote {text-align: left; font-size: 80%; padding: 3px; min-height: 16px; border-top: 1px solid #A4C0DB;} .CCPlusNotepadNote .NotePadButtons {display: none; float: right;} .CCPlusNotepadNote:hover .NotePadButtons{display: block;} .CCPlusNotepadNote .NotePadButtons a {float: left; margin-right: 2px;} #ccPNBNew {border-top: 1px solid #A4C0DB;}');
				document.getElementById('sb-a-noalerts').innerHTML = '<div class="sb-a-title">You haven\'t received any new notes!</div>'
				var notes = GM_getValue('option_6_notes', false)
				var newField = document.createElement('div')
					newField.id = 'ccPNBNew'
					newField.className = 'sb-a-actions'
					newField.innerHTML = '<input type="text" value="" size="30" id="newNoteContents" style="float: left;" onkeyup="if(event.keyCode == \'13\') CCPlusNotebook(\'add\');" /><div class="but but-gray"><a onclick="CCPlusNotebook(\'add\'); return false;" href="#"><span>Add</span></a></div>'
				document.getElementById('sb-a-noalerts').appendChild(newField)
				if(notes) {
					notes = JSON.decode(notes)
					notes.forEach(function(value, index) {
						var text = document.createTextNode(value)
						var newnote = document.createElement('div')
							newnote.id = 'ccPlusNotesId-'+index
							newnote.className = 'sb-a-body CCPlusNotepadNote'
							newnote.innerHTML = '<div class="NotePadButtons"><a href="#" title="Edit" class="button-edit" onClick="CCPlusNotebook(\'edit\', '+index+'); return false;"><span>Edit</span></a><a href="#" title="Delete" class="button-close" onClick="CCPlusNotebook(\'delete\', '+index+'); return false;"><span>Delete</span></a></div>'
							newnote.appendChild(text)
						document.getElementById('sb-a-noalerts').insertBefore(newnote, document.getElementById('ccPNBNew'))
					});
				}
				cache[6].edit = false
				cache[6].editing = false
				NoteBookFunctions = function (action, value) {
					var notes = GM_getValue('option_6_notes', false)
					if(notes) {
						notes = JSON.decode(notes)
					} else {
						notes = new Array()
					}
					var changed = false
					if(action == 'add') {
						if(document.getElementById('newNoteContents').value) {
							notes.push(document.getElementById('newNoteContents').value)
							document.getElementById('newNoteContents').value = ''
							changed = true
						}
					} else if (action == 'edit') {
						if(cache[6].edit) {
							document.getElementById('ccPlusNotesId-'+cache[6].editing).innerHTML = '<div class="NotePadButtons"><a href="#" title="Edit" class="button-edit" onClick="CCPlusNotebook(\'edit\', '+cache[6].editing+'); return false;"><span>Edit</span></a><a href="#" title="Delete" class="button-close" onClick="CCPlusNotebook(\'delete\', '+cache[6].editing+'); return false;"><span>Delete</span></a></div>'
							document.getElementById('ccPlusNotesId-'+cache[6].editing).appendChild(document.createTextNode(notes[cache[6].editing]))
						}
						cache[6].edit = true
						cache[6].editing = value
						document.getElementById('ccPlusNotesId-'+value).innerHTML = '<div class="but but-gray" title="Save" style="float: right; width: auto; margin: 0;"><a onClick="CCPlusNotebook(\'save\', '+value+'); return false;"><span>Save</span></a></div><input type="text" size="30" id="noteContents'+value+'" onkeyup="if(event.keyCode == \'13\') CCPlusNotebook(\'save\', '+value+');" />'
						document.getElementById('noteContents'+value).setAttribute('value', notes[value])
					} else if (action == 'delete') {
						notes.splice(value, 1)
						changed = true
					} else if (action == 'save') {
						if(document.getElementById('noteContents'+value).value) {
							notes.splice(value, 1, document.getElementById('noteContents'+value).value)
						}
						changed = true
					}
					
					if(changed) {
						// Redraw notes
						cssQuery('.CCPlusNotepadNote').forEach(function(element) {
							element.parentNode.removeChild(element)
						});
						notes.forEach(function(value, index) {
							var newnote = document.createElement('div')
								newnote.id = 'ccPlusNotesId-'+index
								newnote.className = 'sb-a-body CCPlusNotepadNote'
								newnote.innerHTML = '<div class="NotePadButtons"><a href="#" title="Edit" class="button-edit" onClick="CCPlusNotebook(\'edit\', '+index+'); return false;"><span>Edit</span></a><a href="#" title="Delete" class="button-close" onClick="CCPlusNotebook(\'delete\', '+index+'); return false;"><span>Delete</span></a></div>'
								newnote.appendChild(document.createTextNode(value))
							document.getElementById('sb-a-noalerts').insertBefore(newnote, document.getElementById('ccPNBNew'))
						});
						// End of redraw
						GM_setValue('option_6_notes', JSON.encode(notes))
					}
				}
				unsafeWindow.CCPlusNotebook = function(action, value) { // Safe transport function
					window.setTimeout(function() {NoteBookFunctions(action, value)}, 0)
				}
			}

		} else if (recentlyChanged && !options[6].value) {
			if(document.getElementById('ccPNBNew')) {
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusNotebookCSSstyle'))
				document.getElementById('sb-a-noalerts').innerHTML = 'You haven\'t received any new notes!<br/><br/><span class="small">Notes will let you know about things that other members do that involve you and require your attention. For example, when someone comments on your blog, adds you as a friend or promotes you in a group. When you have new notes the Note tab will turn orange.</span>'
			}
		}
		
		// Linkify
		if(options[7].value == true) {
			(function(){ try {
				var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
				var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
				document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				var i, el, l, m, p, span, txt, 
				urlRE=/((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
				for (i=0; el=res.snapshotItem(i); i++) {
					txt=el.textContent;
					span=null;
					p=0;
					while (m=urlRE.exec(txt)) {
						if (null==span) {
							span=document.createElement('span');
					}
					l=m[0].replace(/\.*$/, '');
					span.appendChild(document.createTextNode(txt.substring(p, m.index)));
					a=document.createElement('a');
					a.className='linkifyplus';
					a.appendChild(document.createTextNode(l));
					if (-1==l.indexOf('://')) l='mailto:'+l;
					a.setAttribute('href', l);
					span.appendChild(a);
					p=m.index+m[0].length;
				}
				if (span) {
					span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
					el.parentNode.replaceChild(span, el);
				}
			}
			} catch(e) {dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');} })();
		}
		
		// Message sorter
		if(options[9].value == true && onPage[0] == 'account' && onPage[1] == 'messages') {
			var names = new Array()
			cssQuery('table.message[id^="messagetable"]').forEach(function(element){ // Creates list of messages
				names.push(element.childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerHTML, element.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML)
			});
			names = names.unique().sort() // Removes duplicates and sorts it
			sorterInfo = document.getElementById('am_messages').childNodes[1].insertRow(0).insertCell(-1)
			sorterInfo.colSpan = 2
			sorterInfo.innerHTML = 'Display messages only between you and: '
			sorterRow = document.getElementById('am_messages').childNodes[1].rows[0].insertCell(-1)
			sorterRow.colSpan = 3
			sorterRow.innerHTML = '<select id="CCPlusUserChooser"><option value="0" style="font-weight: bold;">Everybody</option><option>'+names.join('</option><option>')+'</option></select>'
			function sorterFunction() {
				showWith = document.getElementById('CCPlusUserChooser').value
				cssQuery('table.message[id^="messagetable"]').forEach(function(element){ // Recreates list of entries, in case of (for example) deletion
					if((element.childNodes[0].childNodes[0].childNodes[2].childNodes[0].innerHTML == showWith || element.childNodes[0].childNodes[0].childNodes[3].childNodes[0].innerHTML == showWith) || showWith == 0) {
						element.style.display = ''
					} else {
						element.style.display = 'none'
						if(element.nextSibling.style.height != '0px' && element.nextSibling.id == '')
							document.body.appendChild(document.createElement("script")).innerHTML='var evt = document.createEvent(\'HTMLEvents\'); evt.initEvent(\'click\', true, true); document.getElementById(\'m-sh-'+element.id.replace('messagetable_', '')+'\').dispatchEvent(evt);';
					}
				});
			}
			document.getElementById('CCPlusUserChooser').addEventListener('change', sorterFunction, true)
		}
		// Minions Tracker
		if(document.getElementById('CCPMTCSS')) {
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('CCPMTCSS'))
		}
		if(options[11].value == true) {
			if(onPage[0] == 'games' && onPage[1] == 'Minions') {
				var username = cssQuery('#userbox .username')[0].innerHTML
				var minionsT = document.createElement('div')
					minionsT.id = 'CCPMT'
					minionsT.className = 'boxcenterfull'
					minionsT.innerHTML = '<div class="boxhead"><span style="float: left; height: 30px;">Minions Tracker</span><a href="http://www.casualcollective.com/#groups/Minions_Tracker" style="float: right; font-size: 10px; height: 30px;">Powered by Minions Tracker</a></div><div class="boxcontentpad"><div id="CCPMTmenu"><div style="float: left; margin-top: 3px;"><a href="#" onClick="CCPMTcb(\'cc_plus/suggestion.php?user='+username+'\'); return false;">Minion Suggester</a> | <a href="#CCPMTprofile" onClick="CCPMTcb(\'cc_plus/profile.php?user='+username+'\'); return false;">My Profile</a> | <a href="#CCPMTleaders" onClick="CCPMTcb(\'cc_plus/leaderboard.php?user='+username+'\'); return false;">Leader Boards</a></div><div class="but but-gray"><a href="#CCPMTupdate" onClick="return false;"><span>Update Data</span></a></div></div><img src="http://www.casualcollective.com/theme/default/images/loading/ajaxload.gif" id="CCPMTajax" style="display: none; margin-left: 220px;" /><div id="CCPMTcontent"></div></div>'
				document.getElementById('pagecontent').insertBefore(minionsT, document.getElementById('pagecontent').childNodes[1])
				addAStyle('CCPMTCSS', '#CCPMT a {color: black;} #CCPMTmenu {border-bottom: 1px solid #A5C1DB; height: 24px;} #CCPMTmenu .but {float: right; width: auto; margin: 0;} #CCPMTmenu .but a {margin-right: 0;} #CCPMTcontent {padding-top: 10px;}')
				cache[11].loading = false
				function MTload(page) {
					if(!cache[11].loading) {
						document.getElementById('CCPMTcontent').innerHTML = ''
						cache[11].loading = true
						document.getElementById('CCPMTajax').style.display = 'inline'
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://mt.clonedrone.com/'+page,
							onload: function(response) {
								document.getElementById('CCPMTcontent').innerHTML = response.responseText
								cache[11].loading = false
								document.getElementById('CCPMTajax').style.display = 'none'
							},
							onerror: function(response) {
								document.getElementById('CCPMTcontent').innerHTML += 'Error nr. '+response.status+': '+response.responseText+'<br />Please try later!'
								cache[11].loading = false
								document.getElementById('CCPMTajax').style.display = 'none'
							}
						});
					}
				}
				unsafeWindow.CCPMTcb = function (page) {
					window.setTimeout(function() {MTload(page)}, 0) // Give enough time for page to update
				}
				function MTupdate() {
					if(!cache[11].loading) {
						cache[11].loading = true
						document.getElementById('CCPMTcontent').innerHTML = 'Updating your data...<br />It is normal for this to take up to 30 seconds, the results of update will be written here:<br /><br />'
						document.getElementById('CCPMTajax').style.display = 'inline'
						var username = cssQuery('#userbox .username')[0].innerHTML
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://mt.clonedrone.com/update.php?user='+username,
							onload: function(response) {
								response.responseText.split("\n").forEach(function(value) {
									document.getElementById('CCPMTcontent').appendChild(document.createTextNode(value))
									document.getElementById('CCPMTcontent').innerHTML += '<br />'
								});
								cache[11].loading = false
								document.getElementById('CCPMTajax').style.display = 'none'
							},
							onerror: function(response) {
								document.getElementById('CCPMTcontent').innerHTML += 'Error nr. '+response.status+': '+response.responseText+'<br />Please try later!'
								cache[11].loading = false
								document.getElementById('CCPMTajax').style.display = 'none'
							}
						});
					}
				}
				document.getElementById('CCPMTmenu').childNodes[1].childNodes[0].addEventListener('click', MTupdate, true)
			}
		}
		// txtPaste
		if(options[12].value == true && !cache[12].changed) {
			document.body.appendChild(document.createElement("script")).innerHTML='initMCE = function(){assetReady("tinyMCE", function() {tinyMCE.init({plugins: "style,inlinepopups,spellchecker,paste",themes: "advanced",mode: "specific_textareas",editor_deselector: "mceNoEditor",theme: "advanced",theme_advanced_buttons1: "bold,italic,underline,strikethrough,separator,bullist,numlist,undo,redo,link,unlink,spellchecker,separator,pastetext",theme_advanced_buttons2: "",theme_advanced_buttons3: "",theme_advanced_toolbar_location: "top",theme_advanced_toolbar_align: "left",dialog_type: "modal",convert_urls: false,relative_urls: false})})}	'
			cache[12].changed = true
		} else if (recentlyChanged && options[12].value == false && cache[12].changed) {
			document.body.appendChild(document.createElement("script")).innerHTML='initMCE = function(){assetReady("tinyMCE", function() {tinyMCE.init({plugins: "style,inlinepopups,spellchecker",themes: "advanced",mode: "specific_textareas",editor_deselector: "mceNoEditor",theme: "advanced",theme_advanced_buttons1: "bold,italic,underline,strikethrough,separator,bullist,numlist,undo,redo,link,unlink,spellchecker",theme_advanced_buttons2: "",theme_advanced_buttons3: "",theme_advanced_toolbar_location: "top",theme_advanced_toolbar_align: "left",dialog_type: "modal",convert_urls: false,relative_urls: false})})}	'
			cache[12].changed = false
		}
		// powChat
		/*
		if(options[13].value == true && !document.getElementById('CCPlusModule13')) {
			powChat.init()
		} else if (recentlyChanged && options[13].value == false && document.getElementById('CCPlusModule13')) {
			powChat.nuke()
		}
		*/
		// Timezone Estimate
		if(options[16].value == true && onPage[0] == 'profiles' && onPage[1] && !onPage[2]) {
			if(document.getElementById('p-map')) {
				waitFor(
					function(){if(!unsafeWindow.wLocation) return false; if(unsafeWindow.wLocation.id != document.getElementById('profileid').value) return false; if(unsafeWindow.wLocation.map.options.pos) return true; else return false;},
					function() {
						GM_xmlhttpRequest({
							method: 'GET',
							url: 'http://ws.geonames.org/timezoneJSON?username=t2t2&lat='+unsafeWindow.wLocation.map.options.pos[0]+'&lng='+unsafeWindow.wLocation.map.options.pos[1],
							onload: function(response) {
								var timedata = JSON.decode(response.responseText)
								if(timedata.time && timedata.countryName)
									document.getElementById('pagecontent').firstChild.firstChild.lastChild.innerHTML += '<span style="float:right;color:#666666;font-size:90%;font-style:italic;font-weight:normal;height: 30px;">'+timedata.time+' ('+timedata.countryName+')</span>'
								else
									document.getElementById('pagecontent').firstChild.firstChild.lastChild.innerHTML += '<span style="float:right;color:#666666;font-size:90%;font-style:italic;font-weight:normal;height: 30px;">Unknown time (Lives in the bottom of the sea?)</span>'
							}
						});
					}
				);
			}
		}
		// Keyboard combos (ALT + [1-0])
		if(recentlyChanged && cache[17].bridge && options[17].value == false) {
			window.removeEventListener('keyup', cache[17].bridge, false);
			cache[17] = new Object;
		}
		if(options[17].value == true) {
			cache[17].funct = function(e) {
				if(e.altKey && e.keyCode >= 48 && e.keyCode <= 57) {
					if (e.keyCode == 48 && GM_getValue('option_17_combo0', false)) { // Alt + 0
						window.location = GM_getValue('option_17_combo0', false)
						return true;
					}
					if (e.keyCode == 49 && GM_getValue('option_17_combo1', false)) { // Alt + 1
						window.location = GM_getValue('option_17_combo1', false)
						return true;
					}
					if (e.keyCode == 50 && GM_getValue('option_17_combo2', false)) { // Alt + 2
						window.location = GM_getValue('option_17_combo2', false)
						return true;
					}
					if (e.keyCode == 51 && GM_getValue('option_17_combo3', false)) { // Alt + 3
						window.location = GM_getValue('option_17_combo3', false)
						return true;
					}
					if (e.keyCode == 52 && GM_getValue('option_17_combo4', false)) { // Alt + 4
						window.location = GM_getValue('option_17_combo4', false)
						return true;
					}
					if (e.keyCode == 53 && GM_getValue('option_17_combo5', false)) { // Alt + 5
						window.location = GM_getValue('option_17_combo5', false)
						return true;
					}
					if (e.keyCode == 54 && GM_getValue('option_17_combo6', false)) { // Alt + 6
						window.location = GM_getValue('option_17_combo6', false)
						return true;
					}
					if (e.keyCode == 55 && GM_getValue('option_17_combo7', false)) { // Alt + 7
						window.location = GM_getValue('option_17_combo7', false)
						return true;
					}
					if (e.keyCode == 56 && GM_getValue('option_17_combo8', false)) { // Alt + 8
						window.location = GM_getValue('option_17_combo8', false)
						return true;
					}
					if (e.keyCode == 57 && GM_getValue('option_17_combo9', false)) { // Alt + 9
						window.location = GM_getValue('option_17_combo9', false)
						return true;
					}
				}
				return true;
			}
			cache[17].bridge = function(e) {
				window.setTimeout(function() {cache[17].funct.call(this, e)}, 0)
			}
			window.addEventListener('keyup', cache[17].bridge, false);
		}
		if(configOn) {
			document.getElementById('CCPlusScript17').innerHTML = 'Please enter full URL (For example: http://www.casualcollective.com/#discuss)'
			addOption(17, 'combo1', 'text', 'Alt+1 URL', false)
			addOption(17, 'combo2', 'text', 'Alt+2 URL', false)
			addOption(17, 'combo3', 'text', 'Alt+3 URL', false)
			addOption(17, 'combo4', 'text', 'Alt+4 URL', false)
			addOption(17, 'combo5', 'text', 'Alt+5 URL', false)
			addOption(17, 'combo6', 'text', 'Alt+6 URL', false)
			addOption(17, 'combo7', 'text', 'Alt+7 URL', false)
			addOption(17, 'combo8', 'text', 'Alt+8 URL', false)
			addOption(17, 'combo9', 'text', 'Alt+9 URL', false)
			addOption(17, 'combo0', 'text', 'Alt+0 URL', false)
		}
		
		// Invite All
		if(options[18].value && onPage[2] == 'invite' && !document.getElementById('massInvButton')) {
			document.getElementById('sendbutton').parentNode.innerHTML += '<div class="but but-gray" id="massInvButton"><a onclick="var inviteAmount = document.getElementsByClassName(\'unchecked\').length; for(i=0;i<inviteAmount;i++){document.getElementsByClassName(\'unchecked\')[0].onclick()}"><span>Check All</span></a></div>';
			document.getElementById('massInvButton').innerHTML += '<a onclick="var uninvAmount = document.getElementsByClassName(\'checked\').length; for(i=0;i<uninvAmount;i++){document.getElementsByClassName(\'checked\')[0].onclick()}"><span>Uncheck All</span></a>'
		}

		// My game
		if(options[19].value && onPage[0] == 'games' && (onPage[1] == 'Buggle_Connect' || onPage[1] == 'Desktop_Armada' || onPage[1] == 'Desktop_TD_Pro' || onPage[1] == 'Farragomate' || onPage[1] == 'Minions' || onPage[1] == 'minions on ice' || onPage[1] == 'minions%20on%20ice')) {
			var myGame = document.createElement('div')
				myGame.className = 'but but-gray g-rightlink'
				myGame.innerHTML = '<a href="#" onclick="userBox.showGame(user.id, event, this);return false;"><span>Find my game!</span></a>'
				myGame.style.marginBottom = '5px'
			document.getElementById('pagecontent').insertBefore(myGame, document.getElementById('pagecontent').childNodes[0])
			document.getElementById('g-container').parentNode.style.clear = 'both'
		}
		// Gird Gifts
		if(document.getElementById('girdgifts')) {
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('girdgifts'))
		}
		if(options[20].value && onPage[0] == 'profiles' && onPage[2] == 'upgrades') {
			addAStyle('girdgifts', '.wi-scroll {height: auto;} .wi-gifts {width: auto !important; height: auto;} .wi-icon {margin-bottom: 16px;}')
		}
		// Sidebar Avatars
		if(options[21].value) {
			cache[21].oldValue = ''+unsafeWindow.CMS_STRURL
			unsafeWindow.CMS_STRURL = 'http://storage.cloud.casualcollective.com/'
		} else if(recentlyChanged) {
			unsafeWindow.CMS_STRURL = cache[21].oldValue
		}
		// CC Extras Compete
		if(options[22].value && onPage[0] == 'compete') {
			if(document.getElementById('pagecontent').childNodes.length == 1) { // In case anything gets changed on compete page, the script _should_ turn itself off.
				document.getElementById('pagecontent').innerHTML = '<div class="groupblock"><h1 class="active" style="line-height: 2.1em; border-bottom: none;">Compete<a href="http://www.ccextras.net" style="font-size: 9px; float: right; color: #000;">Powered by CC Extras</a></h1><table id="ccplusCompete" class="f-table f-board"></table><div id="ccplusCompeteLoading"><img src="http://www.casualcollective.com/theme/default/images/loading/ajaxload.gif" style="margin: 0px 215px;" /></div></div>'
				GM_xmlhttpRequest({
					method: 'GET',
					url: 'http://ccextras.net/json.php',
					onload: function(response) {
						var competitions = JSON.decode(response.responseText)
						document.getElementById('ccplusCompete').innerHTML = '<tr><th class="f-aname row1" colspan="4" style="font-weight: bold;">Tournaments</th></tr><tr><td class="row1 f-info f-head">Game</td><td class="row1 f-subject f-head">Name</td><td class="row1 f-info f-head" style="width: 30%;">Time</td><td class="row1 f-info f-head" style="width: 10%;">Teams</td></tr>'
						for(var key in competitions.tournaments) {
							document.getElementById('ccplusCompete').childNodes[0].innerHTML += '<tr><td class="row2 f-info">'+competitions.tournaments[key].game+'</td><td class="row2 f-info"><a href="'+competitions.tournaments[key].link+'" target="_blank">'+competitions.tournaments[key].name+'</a></td><td class="row2 f-info"><a href="'+competitions.tournaments[key].datelink+'" target="_blank">'+competitions.tournaments[key].date+'</a></td><td class="row2 f-info"><a href="'+competitions.tournaments[key].teamlink+'" target="_blank">'+competitions.tournaments[key].teams+'</a></td></tr>'
						}
						document.getElementById('ccplusCompete').childNodes[0].innerHTML += '<tr><th class="f-aname row1" colspan="4" style="font-weight: bold;">Ladders</th></tr><tr><td class="row1 f-info f-head">Game</td><td class="row1 f-subject f-head" style="width: 50%;" colspan="2">Name</td><td class="row1 f-info f-head" style="width: 10%;">Players</td></tr>'
						for(var key in competitions.ladders) {
							document.getElementById('ccplusCompete').childNodes[0].innerHTML += '<tr><td class="row2 f-info">'+competitions.ladders[key].game+'</td><td class="row2 f-info" colspan="2"><a href="'+competitions.ladders[key].link+'" target="_blank">'+competitions.ladders[key].name+'</a></td><td class="row2 f-info">'+competitions.ladders[key].teams+'</td></tr>'
						}
						document.getElementById('pagecontent').childNodes[0].removeChild(document.getElementById('ccplusCompeteLoading'))
					}
				});
			}
		}
		
		if(recentlyChanged) recentlyChanged = false
		if(first) first = false
	}
	function runCCPlus_update() { // about every 10 seconds
		// Linkify
		if(options[7].value == true) {
			(function(){ try {
				var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
				var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
				document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				var i, el, l, m, p, span, txt, 
				urlRE=/((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
				for (i=0; el=res.snapshotItem(i); i++) {
					txt=el.textContent;
					span=null;
					p=0;
					while (m=urlRE.exec(txt)) {
						if (null==span) {
							span=document.createElement('span');
					}
					l=m[0].replace(/\.*$/, '');
					span.appendChild(document.createTextNode(txt.substring(p, m.index)));
					a=document.createElement('a');
					a.className='linkifyplus';
					a.appendChild(document.createTextNode(l));
					if (-1==l.indexOf('://')) l='mailto:'+l;
					a.setAttribute('href', l);
					span.appendChild(a);
					p=m.index+m[0].length;
				}
				if (span) {
					span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
					el.parentNode.replaceChild(span, el);
				}
			}
			} catch(e) {dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');} })();
		}
	}
	function runCCPlus_lupdate() { // about every 60 seconds
		// Remove news feeds
		if(options[2].value == true) {
			elements = new Array()
			if(GM_getValue('option_2_scores', false)) {
				elements = elements.concat(cssQuery('.a-l-highscore'))
			}
			if(GM_getValue('option_2_shouts', false)) {
				elements = elements.concat(cssQuery('.a-l-shout'))
			}
			if(GM_getValue('option_2_twitter', false)) {
				elements = elements.concat(cssQuery('.a-l-twitter'))
			}
			if(GM_getValue('option_2_reply', false)) {
				elements = elements.concat(cssQuery('.a-l-forum'))
			}
			if(GM_getValue('option_2_gift', false)) {
				elements = elements.concat(cssQuery('.a-l-sendgift'))
			}
			if(GM_getValue('option_2_award', false)) {
				elements = elements.concat(cssQuery('.a-l-award'))
			}
			elements.forEach(function(element) {
				element.parentNode.parentNode.parentNode.parentNode.style.display = 'none'
			});
		}
		// Linkify
		if(options[7].value == true) {
			(function(){ try {
				var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
				var res = document.evaluate("//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
				document, null,	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 
				var i, el, l, m, p, span, txt, 
				urlRE=/((?:https?|ftp):\/\/[^\s'"'<>()]*|[-\w.+]+@(?:[-\w]+\.)+[\w]{2,6})/gi;
				for (i=0; el=res.snapshotItem(i); i++) {
					txt=el.textContent;
					span=null;
					p=0;
					while (m=urlRE.exec(txt)) {
						if (null==span) {
							span=document.createElement('span');
					}
					l=m[0].replace(/\.*$/, '');
					span.appendChild(document.createTextNode(txt.substring(p, m.index)));
					a=document.createElement('a');
					a.className='linkifyplus';
					a.appendChild(document.createTextNode(l));
					if (-1==l.indexOf('://')) l='mailto:'+l;
					a.setAttribute('href', l);
					span.appendChild(a);
					p=m.index+m[0].length;
				}
				if (span) {
					span.appendChild(document.createTextNode(txt.substring(p, txt.length)));
					el.parentNode.replaceChild(span, el);
				}
			}
			} catch(e) {dump('Linkify Plus Error ('+e.lineNumber+'): '+e+'\n');} })();
		}
	}
	
	// Hooks (Functions that clamp themselves on CC)
	var ajaxloadHide = unsafeWindow.ccHistory.hideLoad
	unsafeWindow.ccHistory.hideLoad = function() {
		window.setTimeout(function() {runCCPlus_page()}, 50) // Give enough time for page to update
		return ajaxloadHide.apply(unsafeWindow.ccHistory)
	}
	var ccTick = unsafeWindow.cc.tick;
	unsafeWindow.cc.tick = function() {
		window.setTimeout(function() {runCCPlus_update()}, 50) // Give enough time for page to update
		return ccTick.apply(unsafeWindow.cc)
	}
	var ccLTick = unsafeWindow.cc.lTick;
	unsafeWindow.cc.lTick = function() {
		window.setTimeout(function() {runCCPlus_lupdate()}, 50) // Give enough time for page to update
		return ccLTick.apply(unsafeWindow.cc)
	}
	
	// Theme changer
	function CCplusThemeload(thing, info) {
		if(!unsafeWindow.CCplusThemeDirectory)
			return showThemeDirectory(thing, info)
		if(unsafeWindow.CCplusThemeDirectory.options.width < 878)
			unsafeWindow.CCplusThemeDirectory.options.width = 878
		if(document.getElementById('ccplusthemepreview'))
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccplusthemepreview'))
		if(document.getElementById('ccPlusCurrentStyle') && document.getElementById('ccPlusCurrentStyle').disabled)
			document.getElementById('ccPlusCurrentStyle').disabled = false;
		if(thing == 'editor') {
			unsafeWindow.CCplusThemeDirectory.loadIn({html: 'Loading...'})
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ccextras.net/ccplusthemes/themesearch.php?sort=high&elmnt=time&user='+escape(encodeURI(unsafeWindow.user.username)),
				onload: function(response) {
					var newcontent = '<a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">&laquo; Back to directory</a><br />Hello there! What do you want to edit?<hr />Long introduction text here, someday. I\'m not really good at writing.<hr /><div class="ccPlusStyle" style="padding: 4px;"><div style="font-weight: bold;">Create a new theme</div><br /><a href="#" onClick="CCplusThemeSecurer(\'editor\', \'new\'); return false;" class="themecreatebtn">Start messing!</a></div><div class="ccPlusStyle" style="padding: 4px;"><div style="font-weight: bold;">Modify a theme stored locally</div><br />'
					var localstorage = JSON.decode(GM_getValue('storedthemes', '[]'))
					if(localstorage.length) {
						newcontent += 'Select a theme:<br /><select id="ccplusthemelocal" style="width: 200px;">'
						localstorage.forEach(function(element, index) {
							newcontent += '<option value="'+index+'">'+element.title+'</option>'
						});
						newcontent += '</select><a href="javascript:void(0);" onClick="CCplusThemeSecurer(\'delete\'); return false;">Delete</a><br /><br /><a href="#" onClick="CCplusThemeSecurer(\'editor\', \'local\'); return false;" class="themecreatebtn">Make it better!</a>'
					} else {
						newcontent += 'You have no themes saved locally at the moment.'
					}
					newcontent += '</div><div class="ccPlusStyle" style="padding: 4px;"><div style="font-weight: bold;">Get a published theme</div><br />'
					var published = JSON.decode(response.responseText)
					if(!published.system) {
						newcontent += 'Select a theme:<br /><select id="ccplusthemepublished" style="width: 200px;">'
						published.forEach(function(element) {
							newcontent += '<option value="'+element.id+'">'+element.name+'</option>'
						});
						newcontent += '</select><br /><br /><a href="#" onClick="CCplusThemeSecurer(\'editor\', \'published\'); return false;" class="themecreatebtn">Make it better!</a>'
					} else {
						newcontent += 'You have no themes published at the moment.'
					}
					newcontent += '</div><br style="clear: both;" />'
					unsafeWindow.CCplusThemeDirectory.loadIn({html: newcontent})
				}
			});
		} else if(thing == 'preview') {
			unsafeWindow.CCplusThemeDirectory.loadIn({html: 'Loading...'})
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ccextras.net/ccplusthemes/themecss.php?id='+info,
				onload: function(response) {
					themedata = JSON.decode(response.responseText)
					if(themedata.system) {
						unsafeWindow.CCplusThemeDirectory.loadIn({html: '<a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">&laquo; Back to directory</a><br />'+theme.sytem})
					} else {
						if(document.getElementById('ccPlusCurrentStyle')) {
							document.getElementById('ccPlusCurrentStyle').disabled = true
						}
						addAStyle('ccplusthemepreview', themedata.css)
						unsafeWindow.CCplusThemeDirectory.loadIn({html: '<div class="ccplususetheme green" onClick="CCplusThemeSecurer(\'use\', '+info+');">Use it!</div><div class="ccplususetheme red" onClick="CCplusThemeGetData(\'style\', '+info+');">Don\'t!</div><br style="clear: both;" />', width: 186})
					}
				}
			});
		} else if(thing == 'comment') {
			var request = 'themeid='+escape(encodeURI(info))
			request += '&ccuser='+escape(encodeURI(unsafeWindow.user.username))
			formelements = Array.prototype.slice.call(document.getElementById('ccpluscomment').elements) // Thx Stack Overflow
			formelements.forEach(function(element) {
				if(element.name == 'commentcontents') {
					request += '&message='+escape(encodeURI(element.value))
				} else if(element.name == 'rating' && element.checked) {
					request += '&rating='+escape(encodeURI(element.value))
				}
			});
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'http://ccextras.net/ccplusthemes/themecomment.php',
				data: request,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				onload: function(response) {
					reply = JSON.decode(response.responseText)
					if(reply.system == 'Comment edited' || reply.system == 'Comment posted') {
						CCplusThemeload('style', info)
					} else {
						alert(reply.system)
					}
				}
			});
		} else if(thing == 'style') { // Style details
			unsafeWindow.CCplusThemeDirectory.loadIn({html: 'Loading...'})
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ccextras.net/ccplusthemes/themeinfo.php?id='+info,
				onload: function(response) {
					theme = JSON.decode(response.responseText)
					if(theme.system) {
						newcontent = '<a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">&laquo; Back to directory</a><br />'+theme.sytem
					} else {
						newcontent = '<a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">&laquo; Back to directory</a><div class="ccplusthemedetails"><div style="float: right; opacity: 0.3; line-height: 0.8em; font-size: 48px;">'+theme.info.ratings+'</div><div style="float: left; margin: 0 1em 1em 0;"><img src="'+theme.info.previewurl+'" width="200" height="150" /></div><h1>'+theme.info.name+'</h1><span class="f-t-edited" style="margin-bottom: 4px;">by '+theme.info.user+'</span><p style="margin-bottom: 1em;">'+theme.info.desc.replace("\r\n\r\n", '</p><p style="margin-bottom: 1em;">').replace("\r\n", '<br />')+'</p>'+(GM_getValue('styleid', false) == info ? (GM_getValue('styleversion', false) == theme.info.version ? '<span style="font-weight: bold;">You are currently using this theme!</span>' : '<div class="ccplususetheme green" onClick="CCplusThemeGetData(\'preview\', '+theme.info.id+');">Update!</div>') : '<div class="ccplususetheme" onClick="CCplusThemeGetData(\'preview\', '+theme.info.id+');">Preview theme</div>')+'</div><hr style="clear: both;"/>'
						if(theme.comments) {
							newcontent += '<h2>Comments: ('+theme.comments.length+')</h2>'
							theme.comments.forEach(function(element) {
								newcontent += '<div class="ccplusthemecomment"><div class="ccPlusStyleRating">'+element.rating+'</div><span style="font-weight: bold;">'+element.ccuser+'</span> @ '+element.time+':<p>'+element.message.replace("\r\n\r\n", '</p><p style="margin-top: 1em;">').replace("\r\n", '<br />')+'</p></div>'
							})
						}
						newcontent += '<h2>Leave a comment:</h2><form id="ccpluscomment" name="ccpluscomment"><textarea name="commentcontents" cols="103" rows="6"></textarea><br />Rating:<br />1 <input type="radio" name="rating" value="1" /> <input type="radio" name="rating" value="2" /> <input type="radio" name="rating" value="3" /> <input type="radio" name="rating" value="4" /> <input type="radio" name="rating" value="5" /> 5<br /><a href="#" onClick="CCplusThemeGetData(\'comment\', '+theme.info.id+'); return false;">Submit!</a></form>'
					}
					unsafeWindow.CCplusThemeDirectory.loadIn({html: newcontent})
				},
				onerror: function(response) {
					unsafeWindow.CCplusThemeDirectory.loadIn({html: '<span style="color: red; font-weight: bold;">Uh oh!</span><br />Something went wrong, but don\'t worry! We have sent out drones to find the issue so hopefully it will be fixed soon :)'})
				}
			});
		} else { // Directory
			additionalReq = ''
			if (info == 'top') {
				additionalReq = 'sort=high&elmnt=rating'
			} else if (info == 'comments') {
				additionalReq = 'sort=high&elmnt=comments'
			} else if (info == 'mine') {
				additionalReq = 'sort=high&elmnt=time&user='+escape(encodeURI(unsafeWindow.user.username))
			} else if (info == 'search') {
				additionalReq = 'sort=high&elmnt=time&name='+escape(encodeURI(document.getElementById('ccplusthemesearch').value))
			} else {
				additionalReq = 'sort=high&elmnt=time'
				info = 'new'
			}
			unsafeWindow.CCplusThemeDirectory.loadIn({html: 'Loading...'})			
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ccextras.net/ccplusthemes/themesearch.php?'+additionalReq,
				onload: function(response) {
					if(response.status == 200) {
						if(response.responseText) {
							themes = JSON.decode(response.responseText)
						} else {
							themes = new Array()
						}
						
						var currentThemeId = GM_getValue('styleid', false);
						newcontent = '<div style="border-bottom: 1px solid #A5C1DB;"><div style="float: left;"><a href="#ccplus/dir/top" onClick="CCplusThemeGetData(\'dir\', \'top\'); return false;">Best themes</a> | <a href="#ccplus/dir/comments" onClick="CCplusThemeGetData(\'dir\', \'comments\'); return false;">Most commented</a> | <a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">Newest</a> | <a href="#ccplus/dir/mine" onClick="CCplusThemeGetData(\'dir\', \'mine\'); return false;">Mine</a></div><div style="float: right; text-align: right;">'+(currentThemeId ? '<a onclick="CCplusThemeGetData(\'style\', '+currentThemeId+'); return false;" href="#ccplus/style/'+currentThemeId+'">Using a theme</a> (<a href="javascript:void(0)" onClick="if(confirm(\'Are you sure?\')) {CCplusThemeSecurer(\'stop\')}">Stop using it?</a>)' : 'Currently not using a theme')+'<br />Search: <input type="text" id="ccplusthemesearch" /><div class="but but-gray g-rightlink"><a href="#ccplus/dir/search" onClick="CCplusThemeGetData(\'dir\', \'search\'); return false;"><span>Search</span></a></div></div><a id="ccplusthemenew" href="#ccplus/editor" onClick="CCplusThemeGetData(\'editor\'); return false;">Enter the editor</a><br style="clear: both;" /></div>'
						if(themes.system) {
							newcontent += themes.system
						} else {
							themes.forEach(function(element) {
								newcontent += '<a class="ccPlusStyle" href="#ccplus/style/'+element.id+'" onClick="CCplusThemeGetData(\'style\', '+element.id+'); return false;"><div class="ccPlusStyleInfo"><div class="ccPlusStyleRating">'+element.rating+'</div><span style="font-weight: bold; font-size: 14px;">'+element.name+'</span><br />by '+element.user+'</div><div class="ccPlusDirVer">v'+element.version+'</div><img src="'+element.previewurl+'" width="200" height="150" /></a>'
							});
						}
						newcontent += '<br style="clear: both;" />'
						unsafeWindow.CCplusThemeDirectory.loadIn({html: newcontent})
					} else {
						unsafeWindow.CCplusThemeDirectory.loadIn({html: '<span style="color: red; font-weight: bold;">Uh oh!</span><br />Something went wrong, but don\'t worry! We have sent out drones to find the issue so hopefully it will be fixed soon :)'})
					}
				},
				onerror: function(response) {
					unsafeWindow.CCplusThemeDirectory.loadIn({html: '<span style="color: red; font-weight: bold;">Uh oh!</span><br />Something went wrong, but don\'t worry! We have sent out drones to find the issue so hopefully it will be fixed soon :)'})
				}
			});
		}
	}
	var themeEditorCache = new Object;
	function CCplusThemeSecurerStuff(thing, info) {
		if(thing == 'editor') {
			if((info == 'new' || info == 'local' || info == 'published') && !themeEditorCache.running) {
				if(info == 'local') {
					theid = document.getElementById('ccplusthemelocal').value
				} else if(info == 'published') {
					theid = document.getElementById('ccplusthemepublished').value
				}
				addAStyle('ccPlusEditor', '.CCplusEditorPart {float: left; padding-right: 9px; border-right: 1px solid #A5C1DB; margin-right: 10px;}')
				themeEditorCache.running = true
				themeEditorCache.customCSS = '';
				themeEditorCache.styleID = false;
				themeEditorCache.styleIDtype = false;
				
				unsafeWindow.CCplusThemeDirectory.hide()
				if(document.getElementById('ccPlusCurrentStyle')) {
					document.getElementById('ccPlusCurrentStyle').disabled = true;
				}
				var deck = document.createElement('div')
				deck.id = 'CCPlusThemeEdit'
				deck.className =	'dialog';
				deck.style.cssText = 'position: fixed; bottom: 0px; z-index: 10000; min-width: 1000px; width: 100%;'
				deckContent =	'<div class="header" style="border-top-width: 1px;"><a href="javascript:void(0);" onClick="CCplusThemeSecurer(\'editor\', \'close\'); return false;">Close editor</a><a href="javascript:void(0);" onClick="CCplusThemeSecurer(\'editor\', \'save\'); return false;" style="margin-right: 12px;" id="CCplusSaveLink">Save</a><a href="javascript:void(0);" onClick="CCplusThemeSecurer(\'editor\', \'lower\'); return false;" style="margin-right: 12px;">Expand / Collapse</a><span onClick="CCplusThemeSecurer(\'editor\', \'mode\');" style="cursor: pointer; text-decoration: underline;" id="CCplusEditorMode">Mode: CSS</span></div>'+
								'<div id="CCplusEditorContents" class="content" style="height: 240px; border-bottom: none;">'+
								'<div id="CCplusEditorModeCSS"><div class="CCplusEditorPart" style="width: 600px;"><h3>Enter the CSS code</h3><textarea id="CCplusEditorCSSEntry" class="mceNoEditor" style="height: 197px; width: 594px;"></textarea></div><div class="CCplusEditorPart" style="width: 358px; padding-right: 0; margin-right: 0; border-right: none;"><h3>Test it out!</h3><div class="but but-gray"><a href="javascript:void();" onClick="CCplusThemeSecurer(\'editor\', \'updateCSS\'); return false;"><span>Click here to Update Style</span></a></div></div></div>'+
								'<div id="CCplusEditorSave" style="display: none;"><div class="CCplusEditorPart" style="width: 300px; height: 240px;"><h3>Name of the Theme</h3><input type="text" id="CCplusStyleTitle" name="CCplusStyleTitle" style="width: 294px;" /></div><div class="CCplusEditorPart" style="width: 300px; height: 240px;"><h3>Description</h3><textarea type="text" id="CCplusStyleDescription" name="CCplusStyleDescription" style="width: 294px; height: 198px;" class="mceNoEditor"></textarea></div><div class="CCplusEditorPart" style="width: 300px; height: 240px; border-right: none;"><h3>Save Slot</h3><select id="CCplusEditorSaveSlot" style="width: 300px;">'
				var localstorage = JSON.decode(GM_getValue('storedthemes', '[]'))
				localstorage.forEach(function(element, index) {
					deckContent += '<option value="'+index+'">'+index+': '+element.title+'</option>'
				});
				deckContent +=	'<option value="new" selected="selected">- New slot</option></select><h3 style="margin-top: 15px;">Publish it in the gallery?</h3><a class="cba-off" onclick="checkBox(this,$(this).getNext(),1);" href="javascript:void(0);" style="width: 260px;">Yes, please show it to the world</a><input id="CCplusEditorPublish" type="checkbox" style="display: none;" name="CCplusEditorPublish" /><h3 style="margin-top: 15px;">Preview image (only for gallery)</h3><input type="text" id="CCplusStylePreview" name="CCplusStylePreview" style="width: 294px;" /><div style="float: right; font-size: 9px;">200 by 150 please</div><div class="but but-gray" style="margin-top: 25px; clear: both;"><a href="javascript:void();" onClick="CCplusThemeSecurer(\'editor\', \'savebutton\'); return false;"><span>Click here to save it!</span></a></div></div></div>'+
								'</div>'
				deck.innerHTML = deckContent
				document.body.appendChild(deck)
				style = document.createElement('style');
				style.type = 'text/css';
				style.id = 'CCplusEditorStyle';
				document.getElementsByTagName('head')[0].appendChild(style);
				if(info == 'local') {
					themeEditorCache.styleID = theid;
					themeEditorCache.styleIDtype = 1;
					themeEditorCache.customCSS = localstorage[theid].style
					document.getElementById('CCplusEditorStyle').innerHTML = localstorage[theid].style
					document.getElementById('CCplusEditorCSSEntry').value = localstorage[theid].style
					document.getElementById('CCplusStyleTitle').value = localstorage[theid].title
					document.getElementById('CCplusStyleDescription').value = localstorage[theid].description
					document.getElementById('CCplusStylePreview').value = localstorage[theid].previewurl
					document.getElementById('CCplusEditorSaveSlot').value = theid
				} else if(info == 'published') {
					themeEditorCache.styleID = theid;
					themeEditorCache.styleIDtype = 2;
					document.getElementById('CCplusEditorCSSEntry').value = 'Please wait, loading theme...'
					document.getElementById('CCplusEditorCSSEntry').disabled = true
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://ccextras.net/ccplusthemes/themecss.php?id='+theid,
						onload: function(response) {
							stylesh = JSON.decode(response.responseText)
							if(stylesh.system) {
								alert('Oopsies, an error!'+"\n"+stylesh.sytem)
							} else {
								document.getElementById('CCplusEditorStyle').innerHTML = stylesh.css
								document.getElementById('CCplusEditorCSSEntry').value = stylesh.css
								document.getElementById('CCplusEditorCSSEntry').disabled = false
							}
						}
					});
					GM_xmlhttpRequest({
						method: 'GET',
						url: 'http://ccextras.net/ccplusthemes/themeinfo.php?id='+theid,
						onload: function(response) {
							styleinf = JSON.decode(response.responseText)
							if(styleinf.system) {
								alert('Oopsies, an error!'+"\n"+styleinf.sytem)
							} else {
								document.getElementById('CCplusStyleTitle').value = styleinf.info.name
								document.getElementById('CCplusStyleDescription').innerHTML = styleinf.info.desc
								document.getElementById('CCplusStylePreview').value = styleinf.info.previewurl
							}
						}
					});
				}
				unsafeWindow.onbeforeunload = pageLeaveAsk
			} else if(info == 'lower' && themeEditorCache.running) {
				if(document.getElementById('CCPlusThemeEdit').style.bottom == '0px') {
					document.getElementById('CCPlusThemeEdit').style.bottom = '-262px'
				} else {
					document.getElementById('CCPlusThemeEdit').style.bottom = '0px'
				}
			} else if(info == 'close' && themeEditorCache.running) {
				document.body.removeChild(document.getElementById('CCPlusThemeEdit'))
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusEditor'))
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('CCplusEditorStyle'))
				if(document.getElementById('ccPlusCurrentStyle') && document.getElementById('ccPlusCurrentStyle').disabled)
					document.getElementById('ccPlusCurrentStyle').disabled = false;
				themeEditorCache = new Object;
				unsafeWindow.onbeforeunload = unsafeWindow.doBeforeUnload
			} else if(info == 'updateCSS' && themeEditorCache.running) {
				document.getElementById('CCplusEditorStyle').innerHTML = document.getElementById('CCplusEditorCSSEntry').value
				themeEditorCache.customCSS = document.getElementById('CCplusEditorCSSEntry').value;
			} else if(info == 'save' && themeEditorCache.running) {
				if (document.getElementById('CCPlusThemeEdit').style.bottom == '-262px') {
					document.getElementById('CCPlusThemeEdit').style.bottom = '0px'
				}
				if (themeEditorCache.customCSS != document.getElementById('CCplusEditorCSSEntry').value) {
					if(confirm('You have updated CSS but haven\'t previewed it yet! Do you want to do it now?'+"\n\n"+'(You\'ll have to do it some time anyway)')) {
						document.getElementById('CCplusEditorStyle').innerHTML = document.getElementById('CCplusEditorCSSEntry').value
						themeEditorCache.customCSS = document.getElementById('CCplusEditorCSSEntry').value;
					} else {
						return false
					}
				}
				document.getElementById('CCplusEditorMode').style.textDecoration = 'none'
				document.getElementById('CCplusSaveLink').style.textDecoration = 'underline'
				document.getElementById('CCplusEditorModeCSS').style.display = 'none'
				document.getElementById('CCplusEditorSave').style.display = 'block'
			} else if(info == 'savebutton' && themeEditorCache.running) {
				if(!document.getElementById('CCplusStyleTitle').value || !document.getElementById('CCplusStyleDescription').value) {
					alert('Please fill all fields!');
					return false;
				}
				var localstorage = JSON.decode(GM_getValue('storedthemes', '[]'))
				var datatosave = new Object;
				datatosave.title = document.getElementById('CCplusStyleTitle').value
				datatosave.description = document.getElementById('CCplusStyleDescription').value
				datatosave.style = themeEditorCache.customCSS
				datatosave.previewurl = document.getElementById('CCplusStylePreview').value
				if(document.getElementById('CCplusEditorSaveSlot').value == 'new') {
					localstorage[localstorage.length] = datatosave
				} else {
					localstorage[document.getElementById('CCplusEditorSaveSlot').value] = datatosave
				}
				GM_setValue('storedthemes', JSON.encode(localstorage))
				alert('Local save complete!')
				if(document.getElementById('CCplusEditorPublish').checked) {
					var request = ''
					if(themeEditorCache.styleIDtype == 2) {
						request += 'themeid='+escape(encodeURI(themeEditorCache.styleID))+'&'
					}
					request += 'name='+escape(encodeURI(datatosave.title))
					request += '&user='+escape(encodeURI(unsafeWindow.user.username))
					request += '&desc='+escape(encodeURI(datatosave.description))
					request += '&css='+escape(encodeURI(datatosave.style))
					request += '&previewurl='+escape(encodeURI(datatosave.previewurl))
					GM_xmlhttpRequest({
						method: 'POST',
						url: 'http://ccextras.net/ccplusthemes/themecreate.php',
						data: request,
						headers: {
							"Content-Type": "application/x-www-form-urlencoded"
						},
						onload: function(response) {
							reply = JSON.decode(response.responseText)
							if(reply.errorcode < 2) {
								CCplusThemeSecurerStuff('editor', 'close')
								location.href = "javascript:void((new infoPop()).show('<h3>Sweet!</h3>Your theme has been entered to the moderation queue.<br /><br />But hold on, that\\'s not all, yet.<br /><br />In order to signature this change, please send the following code in a message <a href=\"#account/messages?to=t2t2\">to t2t2</a>: <span style=\"color: #090;\">"+reply.acceptid+"</span>', $('CCPlusOpenMain')))"
							} else {
								if(reply.errorcode == 2) {
									alert('Couldn\'t publish the theme: At least one of the fields is empty')
								} else if(reply.errorcode == 3) {
									alert('According to the server, this theme name is already in use!'+"\n"+'Please rename it and try again')
								} else if(reply.errorcode == 4) {
									alert('Oh man, the server threw an unknown error, the worst of their kind,'+"\n"+'Please try again later while we figure out this internet thingy...'+"\n"+'If problem persits, please message either t2t2 or clonetrooper949.'+"\n\n"+'Response:'+"\n\n"+response.responseText)
								}
							}
						}
					});
				}
			} else if(info == 'mode' && themeEditorCache.running) {
				if (document.getElementById('CCPlusThemeEdit').style.bottom == '-262px') {
					document.getElementById('CCPlusThemeEdit').style.bottom = '0px'
				}
				if(document.getElementById('CCplusEditorSave').style.display == 'block') {
					document.getElementById('CCplusSaveLink').style.textDecoration = 'none'
					document.getElementById('CCplusEditorMode').style.textDecoration = 'underline'
					document.getElementById('CCplusEditorSave').style.display = 'none'
					document.getElementById('CCplusEditorModeCSS').style.display = 'block'
				}
			}
		} else if(thing == 'delete') {
			if(confirm('Are you sure?')) {
				var localstorage = JSON.decode(GM_getValue('storedthemes', '[]'))
				localstorage.splice(document.getElementById('ccplusthemelocal').value, 1)
				GM_setValue('storedthemes', JSON.encode(localstorage))
				CCplusThemeload('editor')
			}
		} else if(thing == 'use') {
			unsafeWindow.CCplusThemeDirectory.loadIn({html: 'Loading...'})
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccplusthemepreview'))
			if(document.getElementById('ccPlusCurrentStyle')) {
				document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusCurrentStyle'))
			}
			GM_xmlhttpRequest({
				method: 'GET',
				url: 'http://ccextras.net/ccplusthemes/themecss.php?id='+info,
				onload: function(response) {
					themedata = JSON.decode(response.responseText)
					if(themedata.system) {
						unsafeWindow.CCplusThemeDirectory.loadIn({html: '<a href="#ccplus/dir/new" onClick="CCplusThemeGetData(\'dir\', \'new\'); return false;">&laquo; Back to directory</a><br />'+theme.sytem, width: 878})
					} else {
						addAStyle('ccPlusCurrentStyle', themedata.css)
						GM_setValue('currentstyle', themedata.css)
						GM_setValue('styleversion', themedata.version)
						GM_setValue('styleid', info)
						unsafeWindow.CCplusThemeDirectory.hide()
					}
				}
			});
		} else if(thing == 'stop') {
			GM_setValue('currentstyle', '')
			GM_setValue('styleversion', false)
			GM_setValue('styleid', false)
			CCplusThemeload('dir', 'new')
			document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusCurrentStyle'))
		}
	}
	function pageLeaveAsk() {
		return 'Are you sure that you want to leave the page?'+"\n\n"+'You will lose any unsaved changes in Theme editor.'
	}
	function showThemeDirectory(arg1, arg2) {
		if(themeEditorCache.running) return false;
		addAStyle('ccPlusImagesDirectory', '.ccPlusStyle {text-decoration: none; color: #000; border: 1px solid #A5C1DB; height: 150px; width: 200px; margin: 5px 5px 0 5px; float: left; position:relative;} .ccPlusStyleInfo {padding: 4px; background: rgba(255, 255, 255, 0.8); position: absolute; top: 0; left: 0; width: 192px; height: 32px; overflow: hidden;} #ccplusthemenew {color: #000; font-weight: bold; height: 16px; width: 94px; margin: 0 373px; background: #F4F4A3; border: 1px solid #F2C4A2; display: block; text-align: center; padding: 4px 5px;} .ccPlusStyleRating {position: absolute; top: 0; right: 0; opacity: 0.2; line-height: 0.8em; font-size: 48px;} .ccPlusDirVer {position: absolute; bottom: 0; right: 0; color: rgba(0, 0, 0, 0.5); line-height: 1em; font-size: 10px; background: rgba(255, 255, 255, 0.7); border-top: 1px solid #A5C1DB; border-left: 1px solid #A5C1DB; padding: 2px 3px;} .ccplusthemedir a {color: #000000;} .ccplusthemedetails h1 {font-weight: bold; font-size: 16px;} .ccplususetheme {border: 1px solid #999; background: #EEE; -moz-border-radius: 5px; width: 100px; height: 16px; padding: 6px; margin: 10px auto; text-align: center; font-weight: bold; cursor: pointer;} .ccplususetheme:hover {background: #CCC;} .ccplususetheme.green {background: #CFC; border-color: #090; color: #090; float: left; margin: 0; width: 50px;} .ccplususetheme.green:hover {background: #9F9;} .ccplususetheme.red {background: #FCC; border-color: #900; color: #900; float: right; margin: 0; width: 50px;} .ccplususetheme.red:hover {background: #F99;} .ccplusthemecomment {position: relative; min-height: 35px; border: 1px solid #999; padding: 2px; margin: 3px 0;} .themecreatebtn {color: #000; font-weight: bold; height: 30px; width: 182px; margin: 0 auto; background: #F4F4A3; border: 1px solid #F2C4A2; display: block; text-align: center; padding: 4px 5px; font-size: 22px;}')
		document.body.appendChild(document.createElement("script")).innerHTML='CCplusThemeDirectory = new Dialog({title:"CC+ theme directory", html:"Loading...", onHide:function(){document.getElementsByTagName(\'head\')[0].removeChild(document.getElementById(\'ccPlusImagesDirectory\')); if(document.getElementById(\'ccplusthemepreview\')) document.getElementsByTagName(\'head\')[0].removeChild(document.getElementById(\'ccplusthemepreview\')); if(document.getElementById(\'ccPlusCurrentStyle\') && document.getElementById(\'ccPlusCurrentStyle\').disabled) document.getElementById(\'ccPlusCurrentStyle\').disabled = false; CCplusThemeDirectory = false;}, width: 878, className:"dialog ccplusthemedir", maskOpacity: 0.2}); CCplusThemeDirectory.show(); CCplusThemeGetData(\''+arg1+'\', \''+arg2+'\')'
	}
	unsafeWindow.CCplusThemeGetData = function(thing, info) {
		window.setTimeout(function() {CCplusThemeload.call(null, thing, info)}, 0)
	}
	unsafeWindow.CCplusThemeSecurer = function(thing, info) { // Don't be fooled by the name, it's not THAT secure...
		window.setTimeout(function() {CCplusThemeSecurerStuff.call(null, thing, info)}, 0)
	}
	document.getElementById('ccplusthemeslink').addEventListener("click", showThemeDirectory, false)
	if(GM_getValue('styleid', false)) {
		addAStyle('ccPlusCurrentStyle', GM_getValue('currentstyle', ''))
	}
	if((Date.now() - GM_getValue('lastThemeUpdate', 0)) >= 86400000 && GM_getValue('styleid', false)) { // 1 day
		GM_xmlhttpRequest({
			method:"GET",
			url:"http://ccextras.net/ccplusthemes/themecss.php?id="+GM_getValue('styleid', false)+'&version='+GM_getValue('styleversion', false),
			headers:{
				"User-Agent":navigator.userAgent
			},
			onload:function(response) {
				themedata = JSON.decode(response.responseText)
				if(themedata.system == 'Invalid ThemeID') {
					GM_setValue('currentstyle', '')
					GM_setValue('styleversion', false)
					GM_setValue('styleid', false)
					if(document.getElementById('ccPlusCurrentStyle')) {
						document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusCurrentStyle'))
					}
				} else if(themedata.system) {
					GM_setValue('lastThemeUpdate', Date.now().toString())
				} else {
					if(themedata.version > GM_getValue('styleversion', false) && themedata.css) {
						if(document.getElementById('ccPlusCurrentStyle')) {
							document.getElementsByTagName('head')[0].removeChild(document.getElementById('ccPlusCurrentStyle'))
						}
						GM_setValue('currentstyle', themedata.css)
						GM_setValue('styleversion', themedata.version)
						addAStyle('ccPlusCurrentStyle', themedata.css)
					}
					GM_setValue('lastThemeUpdate', Date.now().toString())
				}
			}
		});
	} 

	// initMCE, you have annoyed me long enough. (Changes to mode, editor_deselector)
	document.body.appendChild(document.createElement("script")).innerHTML='initMCE = function(){assetReady("tinyMCE", function() {tinyMCE.init({plugins: "style,inlinepopups,spellchecker",themes: "advanced",mode: "specific_textareas",editor_deselector: "mceNoEditor",theme: "advanced",theme_advanced_buttons1: "bold,italic,underline,strikethrough,separator,bullist,numlist,undo,redo,link,unlink,spellchecker",theme_advanced_buttons2: "",theme_advanced_buttons3: "",theme_advanced_toolbar_location: "top",theme_advanced_toolbar_align: "left",dialog_type: "modal",convert_urls: false,relative_urls: false})})}	'
	
	// Shhh...
	var state = 0, konami = [38,38,40,40,37,39,37,39,66,65]; 
	window.addEventListener("keydown", function(e) { 
		if ( e.keyCode == konami[state] ) state++; 
	    else state = 0; 
	    if ( state == 10 ) 
		window.location = 'http://www.casualcollective.com/#games/Dummygame'
	}, true);
} else if ((document.location.pathname == '/radio' || document.location.pathname == '/radio/') && GM_getValue('option_14', false)) { // Forces radio into believing that it's always on.
	document.body.insertBefore(document.body.children[0].children[0], document.body.children[0])
	document.body.children[0].style.cssText = 'background-color:#F8F8F8;border:1px solid #A5C1DB;margin:0 3px 4px;text-align:center;width:405px;'
}