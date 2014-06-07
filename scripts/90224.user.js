// ==UserScript==
// @name           Links de Descargas Directas
// @namespace      LddD
// @description    Extrae links de los servidores de descargas. Extract links from download servers.
// @version        1.2
// @include        *
// @exclude        *#iframe*
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatability  Firefox 3.0+, Chrome 4+, Flock 2.0+
// @require http://sizzlemctwizzle.com/updater.php?id=90224&days=5
// ==/UserScript==

var all =document.getElementsByTagName('*');
var variable='';
var g=0;
var h=0;  

/*MEGAUPLOAD*/
function VALORESMU(){

  for(var k=0, element; element=all[k++];){
    ID=element.id;
      href=element.getAttribute('href');
      if(ID=='export-link'){
        alert(variable);
        break;
      }
      if(href){
        if(href.substr(0,29)=='http://www.megaupload.com/?d='){
          variable+=element.getAttribute('href')+'\n';
          ID=ID.replace('object-icon-link','object-filename');
        }
      }
  }
}

/*DUCKLOAD*/
function VALORESDL(){
 
  var all =document.getElementsByTagName('*');     
  var variable=''; 
  g=0;h=0; 
  Links='';   
  for(var k=0, element; element=all[k++];){    
    ID=element.name;
      valores=element.getAttribute('value');                    
      if(ID=='movie'){ 
          try {                     
            Spliteado=valores.split('&');
            Link_url=Spliteado[2]; 
            Links+=Link_url.substr(3)+'\n';
          }catch(er){  }   
      }                                      
  }
  alert(Links);                                         
}

/*KICKLOAD*/
function VALORESKL(){
  for(var k=0, element; element=all[k++];){
    ID=element.id;
      href=element.getAttribute('href');
      if(ID=='button_export'){
        alert(variable);
        break;
      }
      if(href){
        if(href.substr(0,25)=='http://kickload.com/file/'){
          variable+=element.getAttribute('href')+'\n';
        }
      }
  }
}
/*FILEFROG*/
function VALORESFFROG(){

  for(var k=0, element; element=all[k++];){
    ID=element.id;
      src=element.getAttribute('src');
      if(ID=='go'){
        alert(variable);
        break;
      }
      if(src=='images/download.png'){
          variable+=elementanterior.getAttribute('href')+'\n';
          src='';
      }
      elementanterior=element;
  }
}


/*SHAREHOSTER*/
function VALORESSH(){

  for(var k=0, element; element=all[k++];){
    ID=element.id;
      titulo=element.getAttribute('title');
      if(element.name=='checkall'){
        alert(variable);
        break;
      }
      if(titulo=='Download'){
          variable+='http://www.sharehoster.com/'+element.getAttribute('href')+'\n';
          titulo='';
      }
  }

}


/*FILEBASE.TO*/
function VALORESFB(){
  valor=0;
  for(var k=0, element; element=all[k++];){
    ID=element.id;
      name=element.getAttribute('name');
      if(valor==1){
        valor=0;
        variable+=element.getAttribute('href')+'\n';
      }
      if(ID=='footer'){
        alert(variable);
      }
      if(name=='checkedfiles[]'){
        valor=1;
      }
    }
    variable='';
}


/*SHRAGLE - CHECKBOX SELECTED*/
function VALORESSHG(){
  valor=0;
  for(var k=0, element; element=all[k++];){
    ID=element.id;
    
      if(ID.substr(0,5)=='name_'){
          href=element.getAttribute('href')+'\n';
      }
      if(element.name=='id[]'){
        if(element.checked==true){
          variable+=href;
        }
      }
    }
    alert(variable);
    variable='';
}



function paginaespecifica(){
  RUTA=window.location+'';
  if(RUTA.substr(0,23)=='http://www.duckload.com'){
      VALORESDL();
  }else if(RUTA.substr(0,27)=='http://kickload.com/uploads'){
       VALORESKL();
  }else if(RUTA.substr(0,26)=='http://www.megaupload.com/'){
       VALORESMU();
  }else if(RUTA.substr(0,27)=='http://www.filefrog.to/file'){
       VALORESFFROG();
  }else if(RUTA.substr(0,30)=='http://filebase.to/user/files/' || RUTA.substr(0,30)=='http://filebase.to/index3.php?' || RUTA.substr(0,28)=='http://filebase.to/index.php'){
       VALORESFB();
  }else if(RUTA.substr(0,32)=='http://sharehoster.com/index.php'){
        VALORESSH();
  }else if(RUTA.substr(0,32)=='http://www.shragle.com/index.php'){
        VALORESSHG();
  }

}
var Add_menu_commands = true;
if(Add_menu_commands) GM_registerMenuCommand("Mostrar Links de Descarga", paginaespecifica, null, null, "R");

http://userscripts.org/scripts/show/90224
(function(){

// constants
var SCRIPT = {
	 name: "Links de Descargas Directas"
	,namespace: "http://userscripts.org/people/248570"
	,source: "http://userscripts.org"      // script homepage/description URL
			+ "/scripts/show/90224"
	,identifier: "http://userscripts.org"  // script URL
			+ "/scripts/source/90224.user.js"
	,version: "1.1"                        // version (for example purposes, always disagrees with server)
	,date: "2010-10-11"                    // update date
};
var UPDATE = {
	 lastCheck: 0
	,script: {}
	,getValue: (typeof(GM_getValue)!='undefined' && GM_getValue) || function(n,d){return d;}
	,setValue: (typeof(GM_setValue)!='undefined' && GM_setValue) || function(n,v){return v;}
	,httpRequest: (typeof(GM_xmlhttpRequest)!='undefined' && GM_xmlhttpRequest) || function(){}
	,init: function(objScript) {
		for (var name in objScript) { if (!(name in this)) {
			this[name] = this.script[name] = this.getValue('_UPDATE_' + name, objScript[name]);
		} }
		this.lastCheck = this.getValue('_UPDATE_' + 'lastCheck', 0);
	}
	,check: function(intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, blnForce) {
		this.init(objScript);
		var interval = Math.max(parseFloat(intCheckDays) * 24 * 60 * 60 * 1000, 0) || Infinity;
		var diff = (new Date()) - parseInt(this.lastCheck,10);
		if(!blnForce && !this.isNewer(this, objScript, fnIsNewer) && !(diff > interval)){ return false; }
		if (blnForce || (diff > interval)) {
			var t = this;
			return this.httpRequest({method: 'GET', url: strUrl, onload: function(r){
				t.setValue('_UPDATE_' + 'lastCheck', t.lastCheck = '' + (new Date()).getTime());
				t.parse(r.responseText, [intCheckDays, strUrl, objScript, fnOnNewer, fnIsNewer, false]);
			}});
		}
		try{ fnOnNewer(this, objScript); }catch(x){}
	}
	,parse: function(strResponse, arrCheckArgs) {
		var re = /\/\/\s*(?:@(\S+)\s+(.*?)\s*(?:$|\n)|(==\/UserScript==))/gm, match = true, name;
		while (match && (match = re.exec(strResponse))) {
			if(match[3]){ match = null; continue; }
			name = match[1];
			if(name in this.script){ this.setValue('_UPDATE_' + name, this[name] = match[2]); }
			else if(!(name in this)){ this[name] = match[2]; }
		}
		this.check.apply(this, arrCheckArgs || []);
	}
	,isNewer: function(objUpdate, objScript, fnIsNewer) {
		if(!objUpdate){ objUpdate = this; }
		if(!objScript || (objUpdate.date > objScript.date)){ return true; }
		try {
			return fnIsNewer(objUpdate, objScript);
		}
		catch (x) {
			return (!(objUpdate.date < objScript.date) && (objUpdate.version != objScript.version));
		}
	}
};

function showUpdate (objUpdate, objScript) {
	if(!arguments.length){ return UPDATE.check(2.5, SCRIPT.identifier, SCRIPT, arguments.callee); }
	var title = objUpdate.name + ' ' + objUpdate.version + ', released ' + objUpdate.date;
	var elBefore = document.body.firstChild;
	document.body.appendChild($E('div', {style: 'position:absolute;position:fixed;bottom:0;left:0;'
			+ 'padding:0.2em 0.35em;color:black;background:white;font-weight:bold;font-size:small;'}
		,$E('a', {href: objScript.source, title: title}, objScript.name + ' has been ')
		,$E('a', {href: objScript.identifier, title: title, style: 'color:red;background:#ddd;'},
				'updated!')
	));
}

var $E = function createElement (strName, objAttributes, varContent /*, varContent, ...*/) {
    var el = document.createElement(strName);
    try{
        for (var attribute in objAttributes) {
            el.setAttribute(attribute, objAttributes[attribute]);
        }
    }catch(x){}
    if (arguments.length > 3 || (!/^(string|undefined)$/.test(typeof(varContent)) && !(varContent instanceof Array))) {
    	varContent = Array.prototype.slice.call(arguments, 2);
    }
    if (varContent instanceof Array) {
        for (var L = varContent.length, i = 0, c; i < L; i++) {
            c = varContent[i];
            el.appendChild(c && typeof(c) == 'object' && 'parentNode' in c
            		? c : document.createTextNode(c));
        }
    }
    else if (varContent) {
    	el.innerHTML = varContent;
    }
    return el;
}

window.addEventListener("load", function(){showUpdate();}, true);

})();