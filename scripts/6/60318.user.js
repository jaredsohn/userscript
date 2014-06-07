// ==UserScript==
// @name           Engine
// @namespace      http://www.onekin.org/Engine
// @description    Engine
// @include        *
// @copyright      2009, Cristobal Arellano (http://www.onekin.org/)
// @contributor          Oscar Diaz         (http://www.onekin.org/)
// @contributor          Jon Iturrioz       (http://www.onekin.org/)
// ==/UserScript==
var GM_ENABLED=document.wrappedJSObject ? true : false;
var doc=document;
var win=window;
//var doc=document.wrappedJSObject ? document.wrappedJSObject : document;
//var win=window.wrappedJSObject ? window.wrappedJSObject : window;
// Converts a pattern in this programs simple notation to a regular expression.
// thanks AdBlock! http://www.mozdev.org/source/browse/adblock/adblock/
function convert2RegExp( pattern ) {
  var s = new String(pattern);
  var res = new String("^");

  for (var i = 0 ; i < s.length ; i++) {
    switch(s[i]) {
      case "*" :
        res += ".*";
        break;

      case "." :
      case "?" :
      case "^" :
      case "$" :
      case "+" :
      case "{" :
      case "[" :
      case "|" :
      case "(" :
      case ")" :
      case "]" :
        res += "\\" + s[i];
        break;

      case "\\" :
        res += "\\\\";
        break;

      case " " :
        // Remove spaces from URLs.
        break;

      default :
        res += s[i];
        break;
    }
  }

  var tldRegExp = new RegExp("^(\\^(?:[^/]*)(?://)?(?:[^/]*))(\\\\\\.tld)((?:/.*)?)$")
  var tldRes = res.match(tldRegExp);
  if (tldRes) {
    // build the mighty TLD RegExp
    var tldStr = "\.(?:demon\\.co\\.uk|esc\\.edu\\.ar|(?:c[oi]\\.)?[^\\.]\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.(?:(?:pvt\\.)?k12|cc|tec|lib|state|gen)\\.(?:vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nv)\\.us|[^\\.]\\.vt|ne|ks|il|hi|sc|nh|ia|wy|or|ma|vi|tn|in|az|id|nc|co|dc|nd|me|al|ak|de|wv|nm|mo|pr|nj|sd|md|va|ri|ut|ct|pa|ok|ky|mt|ga|la|oh|ms|wi|wa|gu|mi|tx|fl|ca|ar|mn|ny|nvus|ne|gg|tr|mm|ki|biz|sj|my|hn|gl|ro|tn|co|br|coop|cy|bo|ck|tc|bv|ke|aero|cs|dm|km|bf|af|mv|ls|tm|jm|pg|ky|ga|pn|sv|mq|hu|za|se|uy|iq|ai|com|ve|na|ba|ph|xxx|no|lv|tf|kz|ma|in|id|si|re|om|by|fi|gs|ir|li|tz|td|cg|pa|am|tv|jo|bi|ee|cd|pk|mn|gd|nz|as|lc|ae|cn|ag|mx|sy|cx|cr|vi|sg|bm|kh|nr|bz|vu|kw|gf|al|uz|eh|int|ht|mw|gm|bg|gu|info|aw|gy|ac|ca|museum|sk|ax|es|kp|bb|sa|et|ie|tl|org|tj|cf|im|mk|de|pro|md|fm|cl|jp|bn|vn|gp|sm|ar|dj|bd|mc|ug|nu|ci|dk|nc|rw|aq|name|st|hm|mo|gq|ps|ge|ao|gr|va|is|mt|gi|la|bh|ms|bt|gb|it|wf|sb|ly|ng|gt|lu|il|pt|mh|eg|kg|pf|um|fr|sr|vg|fj|py|pm|sn|sd|au|sl|gh|us|mr|dz|ye|kn|cm|arpa|bw|lk|mg|tk|su|sc|ru|travel|az|ec|mz|lb|ml|bj|edu|pr|fk|lr|nf|np|do|mp|bs|to|cu|ch|yu|eu|mu|ni|pw|pl|gov|pe|an|ua|uk|gw|tp|kr|je|tt|net|fo|jobs|yt|cc|sh|io|zm|hk|th|so|er|cz|lt|mil|hr|gn|be|qa|cv|vc|tw|ws|ad|sz|at|tg|zw|nl|info\\.tn|org\\.sd|med\\.sd|com\\.hk|org\\.ai|edu\\.sg|at\\.tt|mail\\.pl|net\\.ni|pol\\.dz|hiroshima\\.jp|org\\.bh|edu\\.vu|net\\.im|ernet\\.in|nic\\.tt|com\\.tn|go\\.cr|jersey\\.je|bc\\.ca|com\\.la|go\\.jp|com\\.uy|tourism\\.tn|com\\.ec|conf\\.au|dk\\.org|shizuoka\\.jp|ac\\.vn|matsuyama\\.jp|agro\\.pl|yamaguchi\\.jp|edu\\.vn|yamanashi\\.jp|mil\\.in|sos\\.pl|bj\\.cn|net\\.au|ac\\.ae|psi\\.br|sch\\.ng|org\\.mt|edu\\.ai|edu\\.ck|ac\\.yu|org\\.ws|org\\.ng|rel\\.pl|uk\\.tt|com\\.py|aomori\\.jp|co\\.ug|video\\.hu|net\\.gg|org\\.pk|id\\.au|gov\\.zw|mil\\.tr|net\\.tn|org\\.ly|re\\.kr|mil\\.ye|mil\\.do|com\\.bb|net\\.vi|edu\\.na|co\\.za|asso\\.re|nom\\.pe|edu\\.tw|name\\.et|jl\\.cn|gov\\.ye|ehime\\.jp|miyazaki\\.jp|kanagawa\\.jp|gov\\.au|nm\\.cn|he\\.cn|edu\\.sd|mod\\.om|web\\.ve|edu\\.hk|medecin\\.fr|org\\.cu|info\\.au|edu\\.ve|nx\\.cn|alderney\\.gg|net\\.cu|org\\.za|mb\\.ca|com\\.ye|edu\\.pa|fed\\.us|ac\\.pa|alt\\.na|mil\\.lv|fukuoka\\.jp|gen\\.in|gr\\.jp|gov\\.br|gov\\.ac|id\\.fj|fukui\\.jp|hu\\.com|org\\.gu|net\\.ae|mil\\.ph|ltd\\.je|alt\\.za|gov\\.np|edu\\.jo|net\\.gu|g12\\.br|org\\.tn|store\\.co|fin\\.tn|ac\\.nz|gouv\\.fr|gov\\.il|org\\.ua|org\\.do|org\\.fj|sci\\.eg|gov\\.tt|cci\\.fr|tokyo\\.jp|net\\.lv|gov\\.lc|ind\\.br|ca\\.tt|gos\\.pk|hi\\.cn|net\\.do|co\\.tv|web\\.co|com\\.pa|com\\.ng|ac\\.ma|gov\\.bh|org\\.zw|csiro\\.au|lakas\\.hu|gob\\.ni|gov\\.fk|org\\.sy|gov\\.lb|gov\\.je|ed\\.cr|nb\\.ca|net\\.uy|com\\.ua|media\\.hu|com\\.lb|nom\\.pl|org\\.br|hk\\.cn|co\\.hu|org\\.my|gov\\.dz|sld\\.pa|gob\\.pk|net\\.uk|guernsey\\.gg|nara\\.jp|telememo\\.au|k12\\.tr|org\\.nz|pub\\.sa|edu\\.ac|com\\.dz|edu\\.lv|edu\\.pk|com\\.ph|net\\.na|net\\.et|id\\.lv|au\\.com|ac\\.ng|com\\.my|net\\.cy|unam\\.na|nom\\.za|net\\.np|info\\.pl|priv\\.hu|rec\\.ve|ac\\.uk|edu\\.mm|go\\.ug|ac\\.ug|co\\.dk|net\\.tt|oita\\.jp|fi\\.cr|org\\.ac|aichi\\.jp|org\\.tt|edu\\.bh|us\\.com|ac\\.kr|js\\.cn|edu\\.ni|com\\.mt|fam\\.pk|experts-comptables\\.fr|or\\.kr|org\\.au|web\\.pk|mil\\.jo|biz\\.pl|org\\.np|city\\.hu|org\\.uy|auto\\.pl|aid\\.pl|bib\\.ve|mo\\.cn|br\\.com|dns\\.be|sh\\.cn|org\\.mo|com\\.sg|me\\.uk|gov\\.kw|eun\\.eg|kagoshima\\.jp|ln\\.cn|seoul\\.kr|school\\.fj|com\\.mk|e164\\.arpa|rnu\\.tn|pro\\.ae|org\\.om|gov\\.my|net\\.ye|gov\\.do|co\\.im|org\\.lb|plc\\.co\\.im|net\\.jp|go\\.id|net\\.tw|gov\\.ai|tlf\\.nr|ac\\.im|com\\.do|net\\.py|tozsde\\.hu|com\\.na|tottori\\.jp|net\\.ge|gov\\.cn|org\\.bb|net\\.bs|ac\\.za|rns\\.tn|biz\\.pk|gov\\.ge|org\\.uk|org\\.fk|nhs\\.uk|net\\.bh|tm\\.za|co\\.nz|gov\\.jp|jogasz\\.hu|shop\\.pl|media\\.pl|chiba\\.jp|city\\.za|org\\.ck|net\\.id|com\\.ar|gon\\.pk|gov\\.om|idf\\.il|net\\.cn|prd\\.fr|co\\.in|or\\.ug|red\\.sv|edu\\.lb|k12\\.ec|gx\\.cn|net\\.nz|info\\.hu|ac\\.zw|info\\.tt|com\\.ws|org\\.gg|com\\.et|ac\\.jp|ac\\.at|avocat\\.fr|org\\.ph|sark\\.gg|org\\.ve|tm\\.pl|net\\.pg|gov\\.co|com\\.lc|film\\.hu|ishikawa\\.jp|hotel\\.hu|hl\\.cn|edu\\.ge|com\\.bm|ac\\.om|tec\\.ve|edu\\.tr|cq\\.cn|com\\.pk|firm\\.in|inf\\.br|gunma\\.jp|gov\\.tn|oz\\.au|nf\\.ca|akita\\.jp|net\\.sd|tourism\\.pl|net\\.bb|or\\.at|idv\\.tw|dni\\.us|org\\.mx|conf\\.lv|net\\.jo|nic\\.in|info\\.vn|pe\\.kr|tw\\.cn|org\\.eg|ad\\.jp|hb\\.cn|kyonggi\\.kr|bourse\\.za|org\\.sb|gov\\.gg|net\\.br|mil\\.pe|kobe\\.jp|net\\.sa|edu\\.mt|org\\.vn|yokohama\\.jp|net\\.il|ac\\.cr|edu\\.sb|nagano\\.jp|travel\\.pl|gov\\.tr|com\\.sv|co\\.il|rec\\.br|biz\\.om|com\\.mm|com\\.az|org\\.vu|edu\\.ng|com\\.mx|info\\.co|realestate\\.pl|mil\\.sh|yamagata\\.jp|or\\.id|org\\.ae|greta\\.fr|k12\\.il|com\\.tw|gov\\.ve|arts\\.ve|cul\\.na|gov\\.kh|org\\.bm|etc\\.br|or\\.th|ch\\.vu|de\\.tt|ind\\.je|org\\.tw|nom\\.fr|co\\.tt|net\\.lc|intl\\.tn|shiga\\.jp|pvt\\.ge|gov\\.ua|org\\.pe|net\\.kh|co\\.vi|iwi\\.nz|biz\\.vn|gov\\.ck|edu\\.eg|zj\\.cn|press\\.ma|ac\\.in|eu\\.tt|art\\.do|med\\.ec|bbs\\.tr|gov\\.uk|edu\\.ua|eu\\.com|web\\.do|szex\\.hu|mil\\.kh|gen\\.nz|okinawa\\.jp|mob\\.nr|edu\\.ws|edu\\.sv|xj\\.cn|net\\.ru|dk\\.tt|erotika\\.hu|com\\.sh|cn\\.com|edu\\.pl|com\\.nc|org\\.il|arts\\.co|chirurgiens-dentistes\\.fr|net\\.pa|takamatsu\\.jp|net\\.ng|org\\.hu|net\\.in|net\\.vu|gen\\.tr|shop\\.hu|com\\.ae|tokushima\\.jp|za\\.com|gov\\.eg|co\\.jp|uba\\.ar|net\\.my|biz\\.et|art\\.br|ac\\.fk|gob\\.pe|com\\.bs|co\\.ae|de\\.net|net\\.eg|hyogo\\.jp|edunet\\.tn|museum\\.om|nom\\.ve|rnrt\\.tn|hn\\.cn|com\\.fk|edu\\.dz|ne\\.kr|co\\.je|sch\\.uk|priv\\.pl|sp\\.br|net\\.hk|name\\.vn|com\\.sa|edu\\.bm|qc\\.ca|bolt\\.hu|per\\.kh|sn\\.cn|mil\\.id|kagawa\\.jp|utsunomiya\\.jp|erotica\\.hu|gd\\.cn|net\\.tr|edu\\.np|asn\\.au|com\\.gu|ind\\.tn|mil\\.br|net\\.lb|nom\\.co|org\\.la|mil\\.pl|ac\\.il|gov\\.jo|com\\.kw|edu\\.sh|otc\\.au|gmina\\.pl|per\\.sg|gov\\.mo|int\\.ve|news\\.hu|sec\\.ps|ac\\.pg|health\\.vn|sex\\.pl|net\\.nc|qc\\.com|idv\\.hk|org\\.hk|gok\\.pk|com\\.ac|tochigi\\.jp|gsm\\.pl|law\\.za|pro\\.vn|edu\\.pe|info\\.et|sch\\.gg|com\\.vn|gov\\.bm|com\\.cn|mod\\.uk|gov\\.ps|toyama\\.jp|gv\\.at|yk\\.ca|org\\.et|suli\\.hu|edu\\.my|org\\.mm|co\\.yu|int\\.ar|pe\\.ca|tm\\.hu|net\\.sb|org\\.yu|com\\.ru|com\\.pe|edu\\.kh|edu\\.kw|org\\.qa|med\\.om|net\\.ws|org\\.in|turystyka\\.pl|store\\.ve|org\\.bs|mil\\.uy|net\\.ar|iwate\\.jp|org\\.nc|us\\.tt|gov\\.sh|nom\\.fk|go\\.th|gov\\.ec|com\\.br|edu\\.do|gov\\.ng|pro\\.tt|sapporo\\.jp|net\\.ua|tm\\.fr|com\\.lv|com\\.mo|edu\\.uk|fin\\.ec|edu\\.ps|ru\\.com|edu\\.ec|ac\\.fj|net\\.mm|veterinaire\\.fr|nom\\.re|ingatlan\\.hu|fr\\.vu|ne\\.jp|int\\.co|gov\\.cy|org\\.lv|de\\.com|nagasaki\\.jp|com\\.sb|gov\\.za|org\\.lc|com\\.fj|ind\\.in|or\\.cr|sc\\.cn|chambagri\\.fr|or\\.jp|forum\\.hu|tmp\\.br|reklam\\.hu|gob\\.sv|com\\.pl|saitama\\.jp|name\\.tt|niigata\\.jp|sklep\\.pl|nom\\.ni|co\\.ma|net\\.la|co\\.om|pharmacien\\.fr|port\\.fr|mil\\.gu|au\\.tt|edu\\.gu|ngo\\.ph|com\\.ve|ac\\.th|gov\\.fj|barreau\\.fr|net\\.ac|ac\\.je|org\\.kw|sport\\.hu|ac\\.cn|net\\.bm|ibaraki\\.jp|tel\\.no|org\\.cy|edu\\.mo|gb\\.net|kyoto\\.jp|sch\\.sa|com\\.au|edu\\.lc|fax\\.nr|gov\\.mm|it\\.tt|org\\.jo|nat\\.tn|mil\\.ve|be\\.tt|org\\.az|rec\\.co|co\\.ve|gifu\\.jp|net\\.th|hokkaido\\.jp|ac\\.gg|go\\.kr|edu\\.ye|qh\\.cn|ab\\.ca|org\\.cn|no\\.com|co\\.uk|gov\\.gu|de\\.vu|miasta\\.pl|kawasaki\\.jp|co\\.cr|miyagi\\.jp|org\\.jp|osaka\\.jp|web\\.za|net\\.za|gov\\.pk|gov\\.vn|agrar\\.hu|asn\\.lv|org\\.sv|net\\.sh|org\\.sa|org\\.dz|assedic\\.fr|com\\.sy|net\\.ph|mil\\.ge|es\\.tt|mobile\\.nr|co\\.kr|ltd\\.uk|ac\\.be|fgov\\.be|geek\\.nz|ind\\.gg|net\\.mt|maori\\.nz|ens\\.tn|edu\\.py|gov\\.sd|gov\\.qa|nt\\.ca|com\\.pg|org\\.kh|pc\\.pl|com\\.eg|net\\.ly|se\\.com|gb\\.com|edu\\.ar|sch\\.je|mil\\.ac|mil\\.ar|okayama\\.jp|gov\\.sg|ac\\.id|co\\.id|com\\.ly|huissier-justice\\.fr|nic\\.im|gov\\.lv|nu\\.ca|org\\.sg|com\\.kh|org\\.vi|sa\\.cr|lg\\.jp|ns\\.ca|edu\\.co|gov\\.im|edu\\.om|net\\.dz|org\\.pl|pp\\.ru|tm\\.mt|org\\.ar|co\\.gg|org\\.im|edu\\.qa|org\\.py|edu\\.uy|targi\\.pl|com\\.ge|gub\\.uy|gov\\.ar|ltd\\.gg|fr\\.tt|net\\.qa|com\\.np|ass\\.dz|se\\.tt|com\\.ai|org\\.ma|plo\\.ps|co\\.at|med\\.sa|net\\.sg|kanazawa\\.jp|com\\.fr|school\\.za|net\\.pl|ngo\\.za|net\\.sy|ed\\.jp|org\\.na|net\\.ma|asso\\.fr|police\\.uk|powiat\\.pl|govt\\.nz|sk\\.ca|tj\\.cn|mil\\.ec|com\\.jo|net\\.mo|notaires\\.fr|avoues\\.fr|aeroport\\.fr|yn\\.cn|gov\\.et|gov\\.sa|gov\\.ae|com\\.tt|art\\.dz|firm\\.ve|com\\.sd|school\\.nz|edu\\.et|gob\\.pa|telecom\\.na|ac\\.cy|gz\\.cn|net\\.kw|mobil\\.nr|nic\\.uk|co\\.th|com\\.vu|com\\.re|belgie\\.be|nl\\.ca|uk\\.com|com\\.om|utazas\\.hu|presse\\.fr|co\\.ck|xz\\.cn|org\\.tr|mil\\.co|edu\\.cn|net\\.ec|on\\.ca|konyvelo\\.hu|gop\\.pk|net\\.om|info\\.ve|com\\.ni|sa\\.com|com\\.tr|sch\\.sd|fukushima\\.jp|tel\\.nr|atm\\.pl|kitakyushu\\.jp|com\\.qa|firm\\.co|edu\\.tt|games\\.hu|mil\\.nz|cri\\.nz|net\\.az|org\\.ge|mie\\.jp|net\\.mx|sch\\.ae|nieruchomosci\\.pl|int\\.vn|edu\\.za|com\\.cy|wakayama\\.jp|gov\\.hk|org\\.pa|edu\\.au|gov\\.in|pro\\.om|2000\\.hu|szkola\\.pl|shimane\\.jp|co\\.zw|gove\\.tw|com\\.co|net\\.ck|net\\.pk|net\\.ve|org\\.ru|uk\\.net|org\\.co|uu\\.mt|com\\.cu|mil\\.za|plc\\.uk|lkd\\.co\\.im|gs\\.cn|sex\\.hu|net\\.je|kumamoto\\.jp|mil\\.lb|edu\\.yu|gov\\.ws|sendai\\.jp|eu\\.org|ah\\.cn|net\\.vn|gov\\.sb|net\\.pe|nagoya\\.jp|geometre-expert\\.fr|net\\.fk|biz\\.tt|org\\.sh|edu\\.sa|saga\\.jp|sx\\.cn|org\\.je|org\\.ye|muni\\.il|kochi\\.jp|com\\.bh|org\\.ec|priv\\.at|gov\\.sy|org\\.ni|casino\\.hu|res\\.in|uy\\.com)"

    // insert it
    res = tldRes[1] + tldStr + tldRes[3];
  }
  return new RegExp(res + "$", "i");
}
function DOM(){
}

DOM.getElementsByAttribute=function(node,attr,value,tag) {
  var elements = new Array();
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var j=0;
  for (var i = 0; i < elsLen; i++) {
    if (els[i].getAttribute(attr)==value) {
      elements[j] = els[i];
      j++;
    }
  }
  return elements;
}
function Firefox(){
}

Firefox.W3CEvents=["DOMActivate", "DOMFocusIn", "DOMFocusOut", "focus", "blur", "textInput", "click", "dblclick", "mousedown", "mouseup", "mouseover", "mousemove", "mouseout", "keydown", "keyup", "mousemultiwheel", "mousewheel", "DOMSubtreeModified", "DOMNodeInserted", "DOMNodeRemoved", "DOMNodeRemovedFromDocument", "DOMNodeInsertedIntoDocument", "DOMAttrModified", "DOMCharacterDataModified", "DOMElementNameChanged", "DOMAttributeNameChanged", "load", "unload", "abort", "error", "select", "change", "submit", "reset", "resize", "scroll"];
Firefox.GeckoEvents=["DOMLinkAdded", "DOMLinkRemoved", "DOMWillOpenModalDialog", "DOMModalDialogClosed", "DOMWindowClose", "fullscreen", "PopupWindow", "DOMContentLoaded", "DOMTitleChanged", "PluginNotFound", "ValueChange", "DOMMenuItemActive", "DOMFrameContentLoaded", "windowZLevel"];
Firefox.Events=Firefox.W3CEvents.concat(Firefox.GeckoEvents);
Firefox.isLowLevelEvent=function(ev){
  var enc=false;
  for(var i=0;i<Firefox.Events.length&&!enc;i++){
    if(Firefox.Events[i]==ev){
      enc=true;
    }
  }
  return enc;
}
/*
 * Clase Hashtable similar a la de Java.
 */
function Hashtable(){
	var _hashtable = new Array();
	this.get = function(key){
		if (key == null){
    		throw "[Hashtable.get] NullPointerException: \"key\" parameter is null.";
    	} else if((typeof key) != "string"){
			throw "[Hashtable.get] IncorrectTypeException: \"key\" parameter must be a string.";
		} else {
			return _hashtable[key];
		}
	}
    this.put = function(key, value){
    	if (key == null){
    		throw "[Hashtable.put] NullPointerException: \"key\" parameter is null.";
    	} else if((typeof key) != "string"){
			throw "[Hashtable.put] IncorrectTypeException: \"key\" parameter must be a string.";
    	} else {
    		_hashtable[key] = value;	
    	}	
    }
    this.entrySet = function(){
    	var set = new Set();
    	for (item in _hashtable){
    		var keyvalue = new KeyValue();
    		keyvalue.setKey(item);
    		keyvalue.setValue(_hashtable[item]);
    		set.add(keyvalue);
    	}
    	return set;
    }
    this.keys = function(){
    	var set = new Set();
    	var it = this.entrySet().iterator();
    	while (it.hasNext()){
    		var act=it.next();
    		set.add(act.getKey());
    	}
    	return set;
    }
}
/*
 * Clase KeyValue similar a la de Java. Utilizada por la clase Hashtable.
 */
function KeyValue(){
	var _key;
	var _value;
	this.getKey = function(){
		return _key;
	}
	this.setKey = function(key){
		if (key == null){
    		throw "[KeyValue.setKey] NullPointerException: \"key\" parameter is null.";
    	} else if((typeof key) != "string"){
			throw "[KeyValue.setKey] IncorrectTypeException: \"key\" parameter must be a string.";
		} else {
    		_key = key;
    	}
	}
	this.getValue = function(){
		return _value;
	}
	this.setValue = function(value){
    	_value = value;
	}

}
/*
 * Clase Set similar a la de Java. Utilizada por la clase Hashtable.
 */
function Set(){
	var _set = new Array();
	var _currentIndex = -1;
	this.add = function(object){
		_currentIndex++;
		_set[_currentIndex] = object;
	}
	this.iterator = function(){
		return new IteratorNEW(_set);
	}
}
/*
 * Clase IteratorNEW similar a la de Java. Utilizada por la clase Hashtable.
 */
function IteratorNEW(data){
	if(data == null){
		throw "[IteratorNEW] NullPointerException: \"data\" parameter is null.";
	} else if(!(data instanceof Array)){
		throw "[IteratorNEW] IncorrectTypeException: \"data\" parameter must be an array.";
	}
	var _currentIndex = -1;
	var _lastIndex = data.length - 1;
	this.hasNext = function(){
		if(_currentIndex == _lastIndex){
			return false;
		} else { 
			return true;
		}
	}
    this.next = function(){
    	_currentIndex++;
    	return data[_currentIndex];
    }
}
function Property(name){
  this.lname=name;
  this.lrestrictions=new Hashtable();
}

Property.prototype.name=function(){
  return this.lname;
}

Property.prototype.getRestriction=function(key){
  return this.lrestrictions.get(key);
}

Property.prototype.setRestriction=function(key,val){
  this.lrestrictions.put(key,val);
}

/*
 * Clase que contiene la definición de un concepto (moddingInterface).
 * Contiene:
 *       - el nombre del concepto
 *       - las propiedades que contiene este concepto
 */
function Concept(name,properties){
  this.lname=name;
  this.lproperties=properties;
}

Concept.prototype.name=function(){
  return this.lname;
}

Concept.prototype.properties=function(){
  return this.lproperties;
}
/*
 * Clase que contiene la definición de un evento publishing (moodingInterface).
 * Contiene:
 *       - el id del evento publishing (único)
 *       - el concepto sobre el que se origina el evento o payload
 *       - el evento DOM que se origina sobre el concepto o uiEventType
 *       - si el evento es cancelable o no
 */
function PublishingEvent(id,payload,uieventtype,cancelable){
  this.lid=id;
  this.lpayload=payload;
  this.luieventtype=uieventtype;
  this.lcancelable=cancelable;
}

PublishingEvent.prototype.id=function(){
  return this.lid;
}

PublishingEvent.prototype.payloadType=function(){
  return this.lpayload;
}

PublishingEvent.prototype.uiEventType=function(){
  return this.luieventtype;
}

PublishingEvent.prototype.cancelable=function(){
  return this.lcancelable;
}
/*
 *
 */
function ProcessingEvent(id,payloadType,operationType,targetConcept){
  this.lid=id;
  this.lpayloadType=payloadType;
  this.loperationType=operationType;
  this.ltargetConcept=targetConcept;
}

ProcessingEvent.prototype.execute=function(comp,ev){
  var concept=ev.params[0];
  var payload=ev.params[1];
  if(this.ltargetConcept==concept.tagName&&this.checkType(payload)){
    if(this.loperationType=="appendChild"){
      concept.appendChild(payload);
    }else if(this.loperationType=="removeChild"){
      concept.removeChild(payload);   
    }
  }
}

ProcessingEvent.prototype.checkType=function(child){
  if(child.wrappedJSObject){
    child=child.wrappedJSObject;
  }

  var re = new RegExp("(\[|\ )"+this.lpayloadType+"(\]|\ )");
  var res = re.exec(child.constructor) ? true : false;

  return res;  
}/*
 *
 */
function SEvent(kind,cancelable,comp){
  var lkind=kind;
  var lcomp=comp;
  var lcancelable=cancelable;
  var lcancelled=false;
  var ltype;
  var ltarget;
  var lcontext;
  var lparams;

  this.__defineGetter__("kind",function(){
    return lkind;
  });
    
  this.__defineGetter__("type",function(){
    return ltype;
  });

  this.__defineGetter__("target",function(){
    return ltarget;
  });

  this.__defineGetter__("currentTarget",function(){
    return ltarget;
  });

  //ToChange ToSecure
  this.__defineSetter__("target",function(t){
    ltarget=t;
  });

  this.__defineSetter__("currentTarget",function(t){
    ltarget=t;
  });
  
  this.__defineGetter__("cancelable",function(){
    return lcancelable;
  });
  
  this.__defineGetter__("context",function(){
    return lcontext;
  });
  
  this.__defineGetter__("params",function(){
    return lparams;
  });
  
  this.__defineGetter__("payload",function(){
    if(lkind=="ProcessingEvents"){
    	return lparams[1];
    }else{
    	return lparams[0];
    }
  });  

  /*
   *
   */
  this.stopPropagation=function(){
    if(this.cancelable){
      lcancelled=true;
    }
  }

  /*
   *
   */
  this.preventDefault=function(){
  }
  
  /*
   *
   */
  this.initEvent=function(){
    ltype=arguments[0];
    lparams=Array.prototype.slice.call(arguments,1,arguments.length-1);
    lcontext=arguments[arguments.length-1];
  }  
   
  /*
   *
   */
  this.initProcessingEvent=function(type){
    lkind="ProcessingEvents";  
    this.initEvent.apply(this,arguments);
  }
  
  /*
   *
   */
  this.initNavigationalEvent=function(type){
    lkind="NavigationalEvents";   
    this.initEvent.apply(this,arguments);    
  } 
}
/*
 * Clase que parsea los conceptos y eventos (publishing, processing y navigational) y crea sus clases de definición (moodingInterface).
 */
function ModdingInterfaceJSONParser(json){
  this.lrestrictionsType=["optional","minimum","maximum","pattern","maxLength","mminLength","maxItems","minItems","format","maxDecimal"];
  this.ljson=json;
  this.lconceptNodes=new Hashtable();
  this.lpublishingEventNodes=new Hashtable();
  this.lprocessingEventNodes=new Hashtable();
  this.parseNodes();
}

ModdingInterfaceJSONParser.prototype.conceptNodes=function(){
  return this.lconceptNodes;
}

ModdingInterfaceJSONParser.prototype.publishingEventNodesID=function(){
  return this.lpublishingEventNodes;
}

ModdingInterfaceJSONParser.prototype.processingEventNodesID=function(){
  return this.lprocessingEventNodes;
}

ModdingInterfaceJSONParser.prototype.parseNodes=function(){
  this.parseConceptNodes(this.ljson["ScriptingConcepts"]);
  this.parsePublishingEventNodes(this.ljson["PublishingEvents"]);
  this.parseProcessingEventNodes(this.ljson["ProcessingEvents"]);
}

/*
 * Parsea los conceptos (nombre + propiedades).
 */
ModdingInterfaceJSONParser.prototype.parseConceptNodes=function(concepts){  
  for(var i=0;i<concepts.length;i++){         //Parsea los conceptos
    var concept=concepts[i];
    var nconcept=concept["conceptId"];
    var prop=new Hashtable();
    var properties=concept["attributes"];
    for(var j=0;j<properties.length;j++){      //Parsea las propiedades y se las añade al concepto que le pertenezcan
      var attr=properties[j];
      var nprop=attr["attributeId"];
      var propN=new Property(nprop);
      propN.setRestriction("type",attr["type"]);
      for(var k=0;k<this.lrestrictionsType.length;k++){
        var r=this.lrestrictionsType[k];
        var rest=attr[r];
        if(rest){
          propN.setRestriction(r,rest);
        }
      }
      prop.put(nprop,propN);
    } 
    
    var conceptN=new Concept(nconcept,prop);
    this.lconceptNodes.put(nconcept,conceptN);    
  }
}


/*
 * Parsea los eventos publishing (id + payload + evento_bajo_nivel + cancelable?).
 */
ModdingInterfaceJSONParser.prototype.parsePublishingEventNodes=function(publishingEvents){  
  for(var i=0;i<publishingEvents.length;i++){ 
    var pubEvent=publishingEvents[i];
    var id=pubEvent["id"];    
    var payloadType=pubEvent["payloadType"];
    var uiEventType=pubEvent["uiEventType"];
    var cancelable=pubEvent["cancelable"];
    
    var publishingEventN=new PublishingEvent(id,payloadType,uiEventType,cancelable);
    this.lpublishingEventNodes.put(id,publishingEventN);   
  }
}

/*
 * Parsea los eventos processing (id + payload + operacion + concepto_destino).
 */
ModdingInterfaceJSONParser.prototype.parseProcessingEventNodes=function(processingEvents){
  for(var i=0;i<processingEvents.length;i++){ 
    var procEvent=processingEvents[i];
    var id=procEvent["id"];
    var payloadType=procEvent["payloadType"];
    var operationType=procEvent["operationType"];
    var targetConcept=procEvent["targetConcept"]; 
 
    var processingEventN=new ProcessingEvent(id,payloadType,operationType,targetConcept);
    this.lprocessingEventNodes.put(id,processingEventN);   
  }
}
/*
 * Clase que parsea los instancias de los conceptos y crea el "DOM Virtual" (DOM+transformation).
 */
function InstanceJSONParser(comp,json){
  this.lcomp=comp;
  this.lpage=comp.page();
  this.ljson=json;
  this.lroot;
  this.liconceptNodes=new Hashtable();  
  this.parseConceptNodes(comp.concepts());
}

InstanceJSONParser.prototype.rootElement=function(){
  return this.lroot;
}

InstanceJSONParser.prototype.iconceptNodes=function(){
  return this.liconceptNodes;
}

/*
 * Parsea las instancias concretas de cada concepto definido.
 */
InstanceJSONParser.prototype.parseConceptNodes=function(concepts){
  var it=concepts.keys().iterator();
  var sconcepts=this.ljson["scrapers"];
  var nodes=new WNodeList(new Array());    
  while(it.hasNext()){
    var insts=new Array();
    var conceptName=it.next();
    var conceptDef=concepts.get(conceptName);
    
    var sconcept=this.getScrapper("scrapedConcept",conceptName,sconcepts);
    var xp=sconcept["XPath"];
    var f=sconcept["function"];
    var enodes=this.extractNodes(this.lpage,xp,f);
        
    var sattrs=sconcept["attributeScrapers"];
    var propDefs=conceptDef.properties();
    var it2=propDefs.keys().iterator();
    while(it2.hasNext()){
      var propName=it2.next();
      var propDef=concepts.get(propName);
      
      var sattr=this.getScrapper("scrapedAttribute",propName,sattrs);   
      var xpa=sattr["XPath"];
      var fa=sattr["function"];
           
      for(var j=0;j<enodes.length;j++){
        var node=enodes[j];
        var eattrs=this.extractNodes(node,xpa,fa);
        var array=new Array();
        for(var k=0;k<eattrs.length;k++){ 
          var prop=eattrs[k];
          if(prop.innerHTML){
            prop=prop.innerHTML;
          }
          //Validate
          var wsubElement=new WElement(this.lcomp,propName,null,new WNodeList(new Array()),prop);
          array[k]=wsubElement;
        }
     

        var wElement=new WElement(this.lcomp,conceptName,node,new WNodeList(array),null);
        insts[j]=wElement;
      
        nodes.put(wElement,nodes.length);              
      }

    }
    this.liconceptNodes.put(conceptName,insts);
  }
  this.lroot=new WElement(this.lcomp,"root",this.lpage,nodes,null);
}

InstanceJSONParser.prototype.extractNodes=function(node,xpath,func){
  var res;
  if(xpath){
    var nodes=this.lpage.evaluate(xpath,node,
        null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    res=new Array();
    for(var i=0;i<nodes.snapshotLength;i++){
      res[i]=nodes.snapshotItem(i);
    }
 
  }else if(func){
    res=func(node);
    if(!(res instanceof Array)){
      res=[res];
    }    
  }
  return res;
}

InstanceJSONParser.prototype.getScrapper=function(prop,value,arr){
  var res;
  for(var i=0;i<arr.length&&!res;i++){
    var elem=arr[i];
    if(elem[prop]==value){
      res=elem;
    }
  }
  return res;
}/*
 * Clase que wrappea un elemento del DOM. Es un elemento del "DOM Virtual".
 * El comportamiento es el mismo que el de la clase Element del DOM.
 * Un ejemplo de uso es cuando se devuelve dentro de un WNodeList al hacer getElementsByTagName.
 * Contiene:
 *       - El nombre del concepto
 *       - El elemento original del DOM el cuál wrappea
 *       - Su elemento padre
 *       - Sus elementos hijos
 *       - El valor contenido en el propio nodo
 */
function WElement(comp,name,element,child,value){
  var lcomp=comp;
  var lname=name;
  var lelement=element;
  var lparent=parent;
  var lchild=child;
  var lvalue=value;
  for(var i=0;i<child.length;i++){
    child.item(i).parentNode=this;
  }

  this.__defineGetter__("wrappedElement",function(){
    return lelement;
  });
  
  this.__defineGetter__("ownerComponent",function(){
    return lcomp;
  });
  
  this.__defineGetter__("tagName",function(){
    return lname;
  });

  this.__defineGetter__("nodeName",function(){
    return lname;
  });
  
  this.__defineGetter__("nodeValue",function(){
    return lvalue;
  });
  
  this.__defineGetter__("parentNode",function(){
    return lparent;
  });
  
  this.__defineSetter__("parentNode",function(a){
    lparent=a;
  });
  
  this.__defineGetter__("childNodes",function(){
    return lchild;
  });

  this.__defineGetter__("firstChild",function(){
    return lchild.item(0);
  });

  this.__defineGetter__("lastChild",function(){
    return lchild.item(lchild.length-1);
  });

  this.__defineGetter__("previousSibling",function(){
    return null;
  });

  this.__defineGetter__("nextSibling",function(){
    return null;
  });
  
  this.__defineGetter__("innerHTML",function(){
    return lelement.innerHTML;
  });  
  
  /*
   * Devuelve todos los nodos descendientes que tengan ese tagName.
   * El comportamiento es similar a la función getElementsByTagName 
   * con la diferencia de que aquí los nodos no son del tipo "A" o "IMG" sino que son conceptos como "tag" o "date".
   */
  this.getElementsByTagName=function(tag){
    var res=new Array();
    var j=0;
    for(var i=0;i<lchild.length;i++){
      var act=lchild.item(i);
      if(act.tagName==tag){ // Busca en sus hijos
        res[j]=act;
        j++;
      }
      var subact=act.getElementsByTagName(tag);
      for(var k=0;k<subact.length;k++){  // Y en los hijos de sus hijos (recursivo)
        res[j]=subact.item(k);
        j++;    
      }
    }
    return new WNodeList(res);
  }
  
  /*
   * Añade un nuevo Nodo antes del hijo que se le indica.
   * El comportamiento es igual a la función insertBefore del DOM.
   */
  //ToSecure  ToRevise
  this.insertBefore=function(nchild,ochild){
    var enc=false;
    for(var i=0;i<lchild.length&&!enc;i++){
      var act=lchild.item(i);
      if(act.wrappedElement==ochild.wrappedElement){
        enc=true;
        //ochild.parentNode.insertBefore(nchild,ochild.wrappedElement);
        this.addExtensionChild(nchild,ochild.wrappedElement,i);
      }
    }
  }

  /*
   * Añade un nuevo Nodo al final del elemento.
   * Se comprueba si cumple la restricción de contenido antes de añadirlo.
   * El comportamiento es igual a la función appendChild del DOM.
   */
  //ToSecure
  this.appendChild=function(child){
    if(lname!="scriptExtension"){
      this.addExtensionChild(child,null,lchild.length-1);
    }else{
      var ne=new WElement(lcomp,child.getAttribute("scriptId"),child,new WNodeList(new Array()),null);
      ne.parentNode=this;
      lchild.insert(ne,lchild.length);
      lelement.appendChild(child);    
    }
  }

  /*
   * Añade los elementos de los scripts agrupados dentro de un nodo span.
   * Con esto facilitamos la gestión del contenido añadido por los scripts.
   */ 
  this.addExtensionChild=function(child,ochild,i){
    var pcontainer=lchild.item(i);
    if(pcontainer.tagName!="scriptExtension"){
      pcontainer=new WElement(lcomp,"scriptExtension",doc.createElement("span"),new WNodeList(new Array()),null);
      lchild.insert(pcontainer,i+1);
      pcontainer.parentNode=this;
      if(ochild){
        ochild.parentNode.insertBefore(pcontainer.wrappedElement,ochild);
      }else{
        lelement.appendChild(pcontainer.wrappedElement);
      }
    }   
    pcontainer.appendChild(child);
  }
  
  this.removeChild=function(child){
    if(lname!="scriptExtension"){
      this.removeExtensionChild(child);
    }else{
      var enc=false;    
      for(var i=0;i<lchild.length&&!enc;i++){
        var act=lchild.item(i);
        if(act.wrappedElement==child){
          enc=true;
          lchild.remove(i);
        }
      }    
      lelement.removeChild(child);
    }
  }

  this.removeExtensionChild=function(child){
    var pcontainer=lchild.item(lchild.length-1);
    pcontainer.removeChild(child);
  }

  this.__defineGetter__("style",function(){
    return lstyle;
  });
  
  this.dispatchEvent=function(ev){
    ev.currenTarget=this;
    ev.target=this;
    ev.params.splice(0,0,this);
    lcomp.messageBroker().publishEvent(ev.type,ev);
  }
}
/*
 * Clase que wrappea un evento del DOM. Es un evento del "DOM Virtual".
 * El comportamiento es el mismo que el de la clase Event del DOM.
 * Un ejemplo de uso es cuando se devuelve un evento a un listener al darse el evento.
 * Contiene:
 *       - El evento original del DOM el cuál wrappea
 *       - El elemento del "DOM Virtual" sobre el cuál se ha provocado
 *       - Las restricciones de acción sobre el evento (cancelable?)
 */
function WEvent(event,wElement,def,ctx){
  var levent=event;
  var lelement=wElement;
  var ldef=def;
  var ltarget;
  var lcontext=ctx;
  
  if(event){
    var childs=lelement.childNodes;
    for(var i=0;i<childs.length&&!ltarget;i++){
      var act=childs.item(i);
      if(act.wrappedElement==levent.target){
        ltarget=act;
      }
    }
  }
  if(!ltarget){
    ltarget=lelement;
  }
  
  this.__defineGetter__("kind",function(){
    return "PublishingEvent";
  });
    
  this.__defineGetter__("type",function(){
    return ldef.uiEventType();
  });

  this.__defineGetter__("target",function(){
    return ltarget;
  });

  this.__defineGetter__("currentTarget",function(){
    return lelement;
  });

  this.__defineGetter__("cancelable",function(){
    return ldef.cancelable;
  });
  
  this.__defineGetter__("context",function(){
    return lcontext;
  });

  /*
   * Cancela la propagación del evento.
   * Se comprueba si cumple la restricción de cancelación antes de realizarla.
   * El comportamiento es igual a la función stopPropagation.
   */
  this.stopPropagation=function(){
    if(ldef.cancelable){
      levent.stopPropagation();
    }
  }

  /*
   * Cancela la acción por defecto del evento.
   * Se comprueba si cumple la restricción de cancelación antes de realizarla.
   * El comportamiento es igual a la función preventDefault.
   */
  this.preventDefault=function(){
    if(ldef.cancelable){
      levent.preventDefault();
    }
  }
}
/*
 * Clase que almacena una lista de nodos del "DOM Virtual".
 * El comportamiento es el mismo que el de la clase NodeList del DOM.
 * Un ejemplo de uso es cuando se devuelve una lista de nodos en las función getElementsByTagName.
 */
function WNodeList(array){
  var larray=array;

  this.item=function(i){return larray[i];}
  this.insert=function(element,i){larray.splice(i,0,element);}
  this.put=function(a,i){larray[i]=a;}
  this.remove=function(i){larray.splice(i,1);}  
  this.__defineGetter__("length",function(){return larray.length;});
}
function ElementListener(elem){
  this.lelem=elem;
  this.llistenerIn=null;
  this.llistenerOut=null;
  this.lwlistenerIn=null;
  this.lwlistenerOut=null;
  this.lin=false;
}

ElementListener.prototype.element=function(){
  return this.lelem;
}

ElementListener.prototype.listenerIn=function(){
  return this.llistenerIn;
}

ElementListener.prototype.listenerOut=function(){
  return this.llistenerOut;
}

ElementListener.prototype.executeIn=function(ev){
  if(!this.lin){
    this.lin=true;
    if(this.llistenerIn){
      this.llistenerIn(ev);
    }
  }
}

ElementListener.prototype.executeOut=function(ev){
  if(this.lin&&this.isOutside(ev.clientX,ev.clientY)){
    this.lin=false;
    if(this.llistenerOut){
      this.llistenerOut(ev);
    }
  }
}

ElementListener.prototype.setListenerIn=function(lin){
  this.llistenerIn=lin;
}

ElementListener.prototype.setListenerOut=function(lout){
  this.llistenerOut=lout;
}

ElementListener.prototype.installMouse=function(){
  var ins=this;
  this.lwlistenerIn=function(ev){ins.executeIn(ev);};
  this.lwlistenerOut=function(ev){ins.executeOut(ev);};
  this.lelem.addEventListener("mouseover",this.lwlistenerIn,true); 
  this.lelem.addEventListener("mouseout",this.lwlistenerOut,true); 
}

ElementListener.prototype.uninstallMouseout=function(){
  this.lelem.removeEventListener("mouseover",this.lwlistenerIn,true);
  this.lelem.removeEventListener("mouseout",this.lwlistenerOut,true);  
}

ElementListener.prototype.isOutside=function(x,y){
  var el=this.lelem;
  var pos=this.getAbsolutePos(el);
  return !(pos.x<x&&x<(pos.x+el.clientWidth)&&pos.y<y&&y<(pos.y+el.clientHeight));
}

ElementListener.prototype.getAbsolutePos = function(el) {  //getClientRects in firefox for performance
  var SL = 0, ST = 0;
  var is_div = /^div$/i.test(el.tagName);
  if (is_div && el.scrollLeft){SL = el.scrollLeft;}
  if (is_div && el.scrollTop){ST = el.scrollTop;}
  var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
  if (el.offsetParent) {
    var tmp = this.getAbsolutePos(el.offsetParent);
    r.x += tmp.x;
    r.y += tmp.y;
  }
  return r;
}

function MouseManager(){
  this.lelem=new Array();
}

MouseManager.prototype.addEventListener=function(elem,type,listener){
  var elemlis=this.search(elem);
  if(!elemlis){  
    elemlis=new ElementListener(elem);
    this.lelem[this.lelem.length]=elemlis;
    elemlis.installMouse();
  }
  this.setListenerToElemListener(elemlis,type,listener); 
}

MouseManager.prototype.removeEventListener=function(elem,type,listener){
  var elemlis=this.search(elem);
  if(elemlis){
    this.setListenerToElemListener(elemlis,type,null);    
    if(elemlis.listenerIn()==null&&listenerOut()==null){
      var i=this.lelem.indexOf(elemlis);
      this.lelem.splice(i,1);
      elemlis.uninstallMouse();      
    }
  }
}

MouseManager.prototype.setListenerToElemListener=function(elemlis,type,listener){
  if(type=="mouseover"){
    elemlis.setListenerIn(listener);
  }else if(type=="mouseout"){
    elemlis.setListenerOut(listener);    
  } 
}

MouseManager.prototype.search=function(elem){
  var res=null;
  for(var i=0;i<this.lelem.length&&!res;i++){
    var act=this.lelem[i];
    res=act.element()==elem?act:null;
  }
  return res;
}

var MouseManagerSingleton=new MouseManager();
/*
 * Clase que se añade como listener de un concepto (varias instancias) del DOM. Hay una clase por cada evento publishing.
 * Contiene:
 *       - La descripción del evento publishing
 *       - La lista de elementos del "DOM Virtual" sobre los que se añade el listener especificado en el evento publishing
 *       - El MessageBroker que se encargará de avisar a los listeners de los scripts suscrítos a este evento publishing 
 *
 * Cuando se da un evento de bajo nivel, esta clase se encarga de:
 *       - crear las infraestructura de alto nivel que se le devuelve a los scripts
 *       - avisar a todos los scripts subscritos a través del MessageBroker
 *
 */
function Publisher(publishingEvent,msgBroker,lwElement){
  this.lpublishingEvent=publishingEvent;
  this.lmsgBroker=msgBroker;
  this.llwElement=lwElement;  
}

Publisher.prototype.publishingEvent=function(){
  return this.lpublishingEvent;
}


/*
 * Instala el Hook sobre todos los elementos del DOM.
 */
Publisher.prototype.install=function(){
  for(var i=0;i<this.llwElement.length;i++){
    var wElement=this.llwElement.item(i);
    var hook=this;
    if(this.lpublishingEvent.uiEventType()=="mouseover"||this.lpublishingEvent.uiEventType()=="mouseout"){
      MouseManagerSingleton.addEventListener(wElement.wrappedElement,this.lpublishingEvent.uiEventType(),function(event){hook.lowLevelListener(event);});
    }else{
      wElement.wrappedElement.addEventListener(this.lpublishingEvent.uiEventType(),function(event){hook.lowLevelListener(event);},true);
    }
  }
}

/*
 * Desinstala el Hook sobre todos los elementos del DOM.
 */
Publisher.prototype.uninstall=function(){
  for(var i=0;i<this.llwElement.length;i++){
    var wElement=this.llwElement.item(i);
    var hook=this;
    if(this.lpublishingEvent.uiEventType()=="mouseover"||this.lpublishingEvent.uiEventType()=="mouseout"){
      MouseManagerSingleton.removeEventListener(wElement.wrappedElement,this.lpublishingEvent.uiEventType(),function(event){hook.lowLevelListener(event);});
    }else{
      wElement.wrappedElement.removeEventListener(this.lpublishingEvent.uiEventType(),function(event){hook.lowLevelListener(event);},true);
    }
  }
}

/*
 * Crea la infraestructura del alto nivel (WEvent y WElement) y publica el evento.
 */
Publisher.prototype.lowLevelListener=function(event){
  var wElement=this.search(this.llwElement,event.currentTarget);
  var wEvent=EventFactory.createEvent("PublishingEvents",event,wElement,this.lpublishingEvent,{});
  this.lmsgBroker.publishEvent(this.lpublishingEvent.id(),wEvent);
}

/*
 * Busca sobre cuál de los elementos del "DOM Virtual" se ha provocado el evento.
 */
Publisher.prototype.search=function(lwElement,target){
  var enc=false;
  for(var i=0;i<this.llwElement.length&&!enc;i++){
    var wElement=this.llwElement.item(i);
    if(wElement.wrappedElement==target){
      enc=wElement;
    }
  }
  return enc;
}
/*
 * Especialización del Publisher para el evento load.
 * Este evento es especial porque solo se lanza una vez y se debe
 * almacenar para que cuando un script se suscriba, se ejecute de inmediato.
 */
function PublisherLoad(publishingEvent,msgBroker,lwElement){
  this.lpublishingEvent=publishingEvent;
  this.lmsgBroker=msgBroker;
  this.llwElement=lwElement;  
  this.lcontext=null;
}
PublisherLoad.prototype=new Publisher(null,new Array());
PublisherLoad.prototype.install=function(){}
PublisherLoad.prototype.uninstall=function(){}
PublisherLoad.prototype.notify=function(listener){ 
  for(var i=0;i<this.llwElement.length;i++){
    var wElement=this.llwElement.item(i);
    var wEvent=EventFactory.createEvent("PublishingEvents",null,wElement,this.lpublishingEvent,this.lcontext);  
    this.lmsgBroker.notify(listener,wEvent);
  }
}

PublisherLoad.prototype.setContext=function(context){ 
  this.lcontext=context;
}
/*
 *
 */
function PublisherFactory(){
}

PublisherFactory.createPublisher=function(p1,p2,p3){
  var publisher=null;
  if(p3){
    if(p1.uiEventType()=="load"){
      publisher=new PublisherLoad(p1,p2,p3);
    }else{
      publisher=new Publisher(p1,p2,p3);
    }
  }/*else{
    publisher=new PublisherComposite(p1,p2);
  }*/
  return publisher;
}
/*
 *
 */
function Subscriber(func){
  this.lfunc=func;
}

Subscriber.prototype.func=function(){
  return this.lfunc;
}

Subscriber.prototype.processEvent=function(wEvent){
  this.lfunc(wEvent);
}
/*
 *
 */
function MessageBroker(inst){  //Revise
  if(inst){
    inst.lsubscriptions=new Hashtable();
  }
  
  if(inst==null){
    this.lsubscriptions=new Hashtable();
  }
}

MessageBroker.prototype.addSubscriber=function(type,subscriber){
  var tsubscription=this.lsubscriptions.get(type);
  if(!tsubscription){
    tsubscription=new Array();
    this.lsubscriptions.put(type,tsubscription);
  }
  tsubscription[tsubscription.length]=subscriber;  
}

MessageBroker.prototype.removeSubscriber=function(type,subscriber){ 
  var tsubscription=this.lsubscriptions.get(type);
  var enc=false;  
  if(tsubscription){
    for(i=0;i<tsubscription.length&&!enc;i++){
      if(tsubscription[i].func()==subscriber.func()){
        enc=true;
        tsubscription.splice(i,1);   
      }
    }
  
    if(tsubscription.length==0){
      this.lsubscriptions.put(type,null);
    }
  }
  return enc;
}

MessageBroker.prototype.publishEvent=function(type,wEvent){
  var llistener=this.lsubscriptions.get(type);
  if(llistener){
    llistener=llistener.slice();//Copia local a la hora de publicar eventos, evita bucles fire-subscribe
    for(var i=0;i<llistener.length;i++){
      var listener=llistener[i];
      this.notify(listener,wEvent);
    }
  }
}

MessageBroker.prototype.notify=function(listener,wEvent){
  try{  //catch exceptions?
    listener.processEvent(wEvent);
  }catch(error){GM_log(error);}
}
/*
 *
 */
function MessageBrokerComp(Comp){  //Revise
  MessageBroker(this);
  this.lComp=Comp;
  this.lpublishers=new Hashtable();  
}

MessageBrokerComp.prototype.parent=new MessageBroker();

MessageBrokerComp.prototype.addSubscriber=function(type,subscriber){
  this.parent.addSubscriber.call(this,type,subscriber); 
  var publishingEvent=this.lComp.publishingEventsByID().get(type);
  if(publishingEvent){   
    var publisher=this.createPublisher(publishingEvent);
    if(publishingEvent.uiEventType()=="load"){
      publisher.notify(subscriber);
    }
  }
  var compositeEvent=this.lComp.compositeEventsByID().get(type);  
  if(compositeEvent){   
    var publisher=this.createPublisherSpec(compositeEvent);
  }  
}

MessageBrokerComp.prototype.updatePublishers=function(){
  var itev=this.lsubscriptions.keys().iterator();
  while(itev.hasNext()){
    var act=itev.next();
    var publishingEvent=this.lComp.publishingEventsByID().get(act);
    if(publishingEvent){
      var publisher=this.createPublisher(publishingEvent);
      if(publishingEvent.uiEventType()=="load"){
        var llisteners=this.lsubscriptions.get(act);
        for(var i=0;i<llisteners.length;i++){
          publisher.setContext(this.lComp.context());
          publisher.notify(llisteners[i]);
        }
      }
    }
  }
}

MessageBrokerComp.prototype.createPublisher=function(publishingEvent){
  var publisher=this.lpublishers.get(publishingEvent.id());
  if(!publisher){  //Si no existe el hook para este tipo de evento, se crea uno nuevo
    var publisher=PublisherFactory.createPublisher(publishingEvent,this,this.lComp.VDom().getElementsByTagName(publishingEvent.payloadType()));      
    this.lpublishers.put(publishingEvent.id(),publisher);
    publisher.install();
  }
  return publisher;
}

MessageBrokerComp.prototype.createPublisherSpec=function(compositeEvent){
  var publishers=this.lpublishers.get(compositeEvent.type);
  if(!publishers){
    publishers=new Array();
    this.lpublishers.put(compositeEvent.type,publishers);  
  }
  var publisher=PublisherFactory.createPublisher(compositeEvent,this);      
  publishers[publishers.length]=publisher;
  publisher.install();
  return publisher;
}

MessageBrokerComp.prototype.removeSubscriber=function(type,subscriber){ 
  var enc=this.parent.removeSubscriber.call(this,type,subscriber);
  if(enc){
    var tsubscription=this.lsubscriptions.get(type);  
    if(!tsubscription){
      var publisher=this.lpublishers.get(type);
      if(publisher instanceof Array){
        for(var i=0;i<publisher.length;i++){
          publisher[i].uninstall();
        }
      }else{
       publisher.uninstall();
      }
      this.lpublishers.put(type,null);
    }
  }
  return enc;
}

MessageBrokerComp.prototype.removePublishers=function(){ 
  this.lpublishers=new Hashtable(); 
}

MessageBrokerComp.prototype.publishEvent=function(type,wEvent){
  this.parent.publishEvent.call(this,type,wEvent);
}

MessageBrokerComp.prototype.notify=function(listener,wEvent){
  this.parent.notify.call(this,listener,wEvent);
}
function EventFactory(){
}

EventFactory.createEvent=function(p1,p2,p3,p4,p5){
  var ev=null;
  if(p1=="ProcessingEvents"||p1=="NavigationalEvents"){
    ev=new SEvent(p1,p2,p3);
  }else if(p1=="PublishingEvents"){
    ev=new WEvent(p2,p3,p4,p5);
  }else if(p1=="SequenceEvents"){
    ev=new CEvent(p2,p3);
  }
  return ev;
}
/*
 * Clase Principal del GreaseMonkey++. 
 * Se encarga de: 
 *   - cargar la definición del moddinInterface y generar el "DOM Virtual".
 *   - gestionar los eventos del moddingInterface y los típicos del DOM.
 */
 
/*
 * Inicializa GreaseMonkey++ antes de que se cargue la página. 
 * Wrappea las funciones "add//removeEventListener" del DOM.
 */
function Component(inst,tunebox,iformat){ 
  if(inst){
    inst.ltunebox=tunebox;
    inst.lconcepts=new Hashtable();                           //Array asociativo nameConcept-->concept
  
    inst.lpublishingEventsByID=new Hashtable();               //Array asociativo idPublishingEvent-->publishing event
    inst.lmessageBroker=new MessageBrokerComp(inst);          //Gestor de Eventos
    
    inst.lprocessingEventsByID=new Hashtable();               //Array asociativo idProcessingEvent-->processing event
    inst.lnavigationalEventsByID=new Hashtable();             //Array asociativo idNavigationalEvent-->navigational event   
    
    inst.lcompositeEventsByID=new Hashtable();
  
    inst.lroot;
    
    inst.lmoddingInterface=null;
    inst.ltransformation=null;  
    
    inst.liformat=iformat;  
    
    inst.lcb=new ComponentBuilder(inst);  
  
    inst.scriptId=0;
    inst.lcontext=null;
    
    inst.iface=false;
    inst.initialized=false;
  }
}

Component.prototype.context=function(){
  return this.lcontext;
}

Component.prototype.ifacePrepared=function(){
  this.iface=true;
  if(this.initialized){
    this.init();
  }
}

Component.prototype.page=function() {
  return this.lpage;
}

Component.prototype.installListeners=function() {
  var ins=this;
  this.lpage.addEventListener=function(type,listener,flag){ins.addEventListener(type,listener,flag);};
  this.lpage.removeEventListener=function(type,listener,flag){ins.removeEventListener(type,listener,flag);};
  this.lpage.getScriptId=function(){return ins.getScriptId();};
}

Component.prototype.VDom=function() {
  return this.lroot;
}

Component.prototype.concepts=function() {
  return this.lconcepts;
}

Component.prototype.publishingEventsByID=function() {
  return this.lpublishingEventsByID;
}

Component.prototype.compositeEventsByID=function() {
  return this.lcompositeEventsByID;
}

Component.prototype.messageBroker=function() {
  return this.lmessageBroker;
}

/*
 * Carga el moddingInterface (definiciones OWL).
 */
Component.prototype.loadDefinitions=function(){
  this.lcb.build(this.ltunebox);
  this.lmessageBroker.updatePublishers();    
}

Component.prototype.addSubscribers=function(levDef){
  var it=levDef.keys().iterator();
  while(it.hasNext()){
    var kevDef=it.next();
    var listener=levDef.get(kevDef);
    var ins=this;
    this.lmessageBroker.addSubscriber(kevDef,new Subscriber(function(ev){ins.realDispatchEvent(ev);}));
  }
}

Component.prototype.dispatchEvent=function(ev){
  this.messageBroker().publishEvent(ev.type,ev);
}

Component.prototype.realDispatchEvent=function(ev){
  var toExec=null;
  if(ev.kind=="ProcessingEvents"){
    toExec=this.lprocessingEventsByID.get(ev.type); 
  }else if(ev.kind=="NavigationalEvents"){
    toExec=this.lnavigationalEventsByID.get(ev.type);  
  }
  if(toExec){
    toExec.execute(this,ev);
  }
}

//Devuelve un identificador único cada vez que se le invoca (identificar cada script)
Component.prototype.getScriptId=function(){
  this.scriptId++;
  return this.scriptId;
}

Component.prototype.createEvent=function(kind){
  return EventFactory.createEvent(kind,true,this);
}

Component.prototype.createElement=function(type){
  return this.lpage.createElement(type);
}

Component.prototype.realAddEventListener=function(type,listener){
  this.lmessageBroker.addSubscriber(type,new Subscriber(listener));
}

Component.prototype.realRemoveEventListener=function(type,listener){
  this.lmessageBroker.removeSubscriber(type,new Subscriber(listener));
}

Component.prototype.addCompositeEventDefinition=function(def){
  this.lcompositeEventsByID.put(def.type,def);
}
function ComponentLocal(tunebox,mode){
  Component(this,tunebox,mode);
  
  this.lpage=doc;
  this.linst_flag=true;
  this.addEventListenerOld=doc.addEventListener;
  this.removeEventListenerOld=doc.removeEventListener;
  
  this.installListeners();
}

ComponentLocal.prototype=new Component();

/*
 * Inicialización de GreaseMonkey++ (contenido de la página disponible).
 * Si la página es moddeable; carga las definiciones de los eventos y
 * carga los las apariciones de los conceptos en el "DOM Virtual".
 * Si la página no es moddeable; deswrappea las funciones "add//removeEventListener" del DOM.
 */
ComponentLocal.prototype.init=function(){
  if(this.iface){
    this.loadDefinitions();
  }else{
    this.initialized=true;
  }
}

/*
 * Función GreaseMonkey++ que wrappea la función "addEventListener" original del DOM.
 * Si todavía no se ha cargado la página, duerme la llamada hasta que esto ocurra.
 * Comprueba si tiene que registrar el listener con la definición del moddingInterface.
 */
ComponentLocal.prototype.addEventListener=function(type,listener,flag){ //in DOMString type, in EventListener listener, in boolean useCapture
  if(!Firefox.isLowLevelEvent(type)){
    this.realAddEventListener(type,listener);
  }else{
    this.addEventListenerOld(type,listener,flag);
  }
}

/*
 * Función GreaseMonkey++ que wrappea la función "removeEventListener" original del DOM.
 * Comprueba si tiene que desregistrar el listener con la definición del moddingInterface.
 */
ComponentLocal.prototype.removeEventListener=function(type,listener,flag){ //in DOMString type, in EventListener listener, in boolean useCapture
  if(!Firefox.isLowLevelEvent(type)){
    this.realRemoveEventListener(type,listener);
  }else{
    this.removeEventListenerOld(type,listener,flag);  
  }
}
function ComponentFactory(){
}

ComponentFactory.createComponent=function(iformat,tunebox,ref){
  var res=null;
    res=new ComponentLocal(tunebox,iformat);  
  return res;
}
function ComponentBuilder(component){
  this.lcomponent=component;
}

ComponentBuilder.prototype.build=function(tunebox){
  this.JSON(tunebox);  
}


ComponentBuilder.prototype.JSON=function(tunebox){
  var IGR=tunebox.IFACE_GLOBAL_REGISTRY;
  var CGR=tunebox.CLASS_GLOBAL_REGISTRY;
  for(var i=0;i<CGR.length;i++){
    var cls=CGR[i];
    var mparser=new ModdingInterfaceJSONParser(IGR[cls["implements"]]);
    this.buildDef(mparser);
    var iparser=new InstanceJSONParser(this.lcomponent,cls);
    this.buildInst(iparser);    
  }
}

ComponentBuilder.prototype.buildDef=function(parser){
  this.lcomponent.lconcepts=parser.conceptNodes();
  this.lcomponent.lpublishingEventsByID=parser.publishingEventNodesID();
  this.lcomponent.lprocessingEventsByID=parser.processingEventNodesID();
  
  this.lcomponent.addSubscribers(this.lcomponent.lprocessingEventsByID);
}

ComponentBuilder.prototype.buildInst=function(parser){
  this.lcomponent.lroot=parser.rootElement();
}

function Tunebox(){
  this.IFACE_GLOBAL_REGISTRY=new Array();
  this.CLASS_GLOBAL_REGISTRY=new Array();
  this.ltoInit=new Array(); 
  this.base=ComponentFactory.createComponent(null,this);
  this.ltoInit[this.ltoInit.length]=this.base;
  window.doc=this.base;
}

Tunebox.prototype.initComponents=function(){
  for(var i=0;i<this.ltoInit.length;i++){
    var comp=this.ltoInit[i];
    comp.init(this);
  }
}


Tunebox.prototype.registerScriptingClass=function(jsonClass){
  var site=convert2RegExp(jsonClass["baseWebsite"]);
  if(site.test(win.location.href)){
    var ifaceURL=jsonClass["implements"];
    var IGR=this.IFACE_GLOBAL_REGISTRY;
    var base=this.base;
    GM_xmlhttpRequest({method: 'GET', url: ifaceURL,
      onload: function(responseDetails) {
        IGR[ifaceURL]=JSON.parse(responseDetails.responseText.match(/{(.|\n|\r|\t)*}/)[0]);
        base.ifacePrepared();   
      }});	 
    this.CLASS_GLOBAL_REGISTRY[this.CLASS_GLOBAL_REGISTRY.length]=jsonClass;
  }
}

Tunebox.prototype.main=function(){
  this.initComponents();
}

if(win.tuneboxSingleton==null){
  var tuneboxSingleton=new Tunebox();

  win.tuneboxSingleton=tuneboxSingleton;
  //win.deployComponent=function(ref){return tuneboxSingleton.deployComponent(ref);}
  win.registerScriptingClass=function(jsonClass){return tuneboxSingleton.registerScriptingClass(jsonClass);}

  //win.addEventListener("load",function(){tuneboxSingleton.main();},true);
  tuneboxSingleton.main();
}

