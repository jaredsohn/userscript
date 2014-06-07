// ==UserScript==
// @name           Moddingbox(20080829)
// @namespace      Moddingbox
// @description    Moddingbox(20080829)
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
function XML(){
}

/*
 * Transforma el fichero XML con el XSLT.
 */
XML.transformXML=function(xslt,xml){
    var proc = new XSLTProcessor();
    proc.importStylesheet(xslt);
    var ser=new XMLSerializer();  //Homogeneizar UPPERCASE-LOWERCASE para el XSLT
    var txt=ser.serializeToString(xml);
    xml=new DOMParser().parseFromString(txt.replace(/<!DOCTYPE([^>])*>/ig,""),"text/xml");
    return proc.transformToDocument(xml);  
}

XML.loadDocument=function(content,f){
  var iframe = doc.createElement("iframe");
  iframe.style.visibility = "hidden";
  iframe.style.position = "absolute";
  doc.body.appendChild(iframe);

  // give it a URL so that it will create a .contentDocument property. Make
  // the URL be the current page's URL so that we can communicate with it.
  // Otherwise, same-origin policy would prevent us.
  iframe.contentWindow.location.href = location.href;

  // write the received content into the document
  iframe.contentDocument.open();//"text/html");
  iframe.contentDocument.write(content);
  iframe.contentDocument.close();

  // wait for the DOM to be available, then do something with the document
  iframe.contentDocument.addEventListener("DOMContentLoaded", function() {f(iframe.contentDocument);doc.body.removeChild(iframe);}, false);
}

XML.createEmptyPage=function(){
  return new DOMParser().parseFromString("<html><head><title/></head><body/></html>","text/xml");
}
function XMLHttpRequestManager(){
}

/*
 * Recuperar el XML embebido en la página web o usando XMLHttpRequest.
 */
XMLHttpRequestManager.getXML=function(docu,ref,f,isDOM){
  var sharp=ref.indexOf("#");
  if(sharp>-1){
    var ct=docu.getElementById(ref.substring(sharp+1));
    if(!ct){
      ct=DOM.getElementsByAttribute(docu,"id",ref.substring(sharp+1),"a")[0];
    }
    f(new DOMParser().parseFromString(ct.textContent, "text/xml"));
  }else{
    if(GM_ENABLED){
      this.getXMLGM(ref,f,isDOM);
    }else{
      this.getXMLFirefox(ref,f,isDOM);
    }
  }
}

/*
 * XMLHttpRequest de Firefox. Solo para debugging.
 */
XMLHttpRequestManager.getXMLFirefox=function(ref,f,isDOM){
  var xml;
  var req = new XMLHttpRequest();
  req.onreadystatechange=function(){
    if (req.readyState == 4) {
      if(req.status == 0 || req.status == 200){
         if(isDOM){
           XML.loadDocument(req.responseText,f);     
         }else{
           f(new DOMParser().parseFromString(req.responseText, "text/xml"));
         }
      }
    }
  }
  req.open('GET', ref, true);
  req.send(null);
}

/*
 * XMLHttpRequest de GreaseMonkey. Seguridad relajada, permite hacer peticiones a fuera del dominio actual.
 */
XMLHttpRequestManager.getXMLGM=function(ref,f,isDOM){
  GM_xmlhttpRequest({
      method: 'GET',
      url: ref,
      onload: function(responseDetails) {
         if(isDOM){
           XML.loadDocument(responseDetails.responseText,f);     
         }else{
           f(new DOMParser().parseFromString(responseDetails.responseText, "text/xml"));
         }
      }
  });
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
function NavigationalEvent(id,url){
  this.lid=id;
  this.lurl=url;
}

NavigationalEvent.prototype.execute=function(comp,ev){
  comp.navigate(this.lurl+ev.params[0],ev.context);
}

/*
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
function ModdingInterfaceXMLParser(xml){
  this.lrdfNS="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  this.lrdfsNS="http://www.w3.org/2000/01/rdf-schema#";
  this.lowlNS="http://www.w3.org/2002/07/owl#" ;
  this.lmodNS="http://www.onekin.org/scripting#";
  this.lcoreNS="http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/";
  this.lhtmlNS="http://www.w3.org/TR/2003/REC-DOM-Level-2-HTML-20030109/";
  this.leventNS="http://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/";
  this.lcssNS="http://www.w3.org/TR/2000/REC-DOM-Level-2-Style-20001113/";
  this.lxml=xml;
  this.lconceptNodes=new Hashtable();
  this.lpublishingEventNodes=new Hashtable();
  this.lprocessingEventNodes=new Hashtable();
  this.lnavigationalEventNodes=new Hashtable();
  this.parseConceptNodes();
  this.parsePublishingEventNodes();
  this.parseProcessingEventNodes();
  this.parseNavigationalEventNodes();
}

ModdingInterfaceXMLParser.prototype.conceptNodes=function(){
  return this.lconceptNodes;
}

ModdingInterfaceXMLParser.prototype.publishingEventNodesID=function(){
  return this.lpublishingEventNodes;
}

ModdingInterfaceXMLParser.prototype.processingEventNodesID=function(){
  return this.lprocessingEventNodes;
}

ModdingInterfaceXMLParser.prototype.navigationalEventNodesID=function(){
  return this.lnavigationalEventNodes;
}

/*
 * Parsea los conceptos (nombre + propiedades + restricciones).
 */
ModdingInterfaceXMLParser.prototype.parseConceptNodes=function(){
  var concepts=this.lxml.getElementsByTagNameNS(this.lmodNS,"Concept");
  var properties=this.lxml.getElementsByTagNameNS(this.lowlNS,"DatatypeProperty");
    
  for(var i=0;i<concepts.length;i++){         //Parsea los conceptos
    var concept=concepts.item(i);
    var nconcept=concept.getAttributeNS(this.lrdfNS,"ID");
    var conceptN=new Concept(nconcept,new Array());
    this.lconceptNodes.put(nconcept,conceptN);
  }
  
  for(var i=0;i<properties.length;i++){      //Parsea las propiedades y se las añade al concepto que le pertenezcan
    var prop=properties.item(i);
    var nprop=prop.getAttributeNS(this.lrdfNS,"ID");
    var nconcept=prop.getElementsByTagNameNS(this.lrdfsNS,"domain").item(0).getAttributeNS(this.lrdfNS,"resource").substring(1);
    //var ntype=nprop.getElementsByTagNameNS(this.rdfsNS,"range").item(0).getAttributeNS(this.rdfNS,"resource");
    var cprop=this.lconceptNodes.get(nconcept).properties();
    cprop[cprop.length]=nprop;
  } 
}


/*
 * Parsea los eventos publishing (id + payload + evento_bajo_nivel + cancelable?).
 */
ModdingInterfaceXMLParser.prototype.parsePublishingEventNodes=function(){
  var publishingEvents=this.lxml.getElementsByTagNameNS(this.lmodNS,"PublishingEvent");
    
  for(var i=0;i<publishingEvents.length;i++){ 
    var publishingEvent=publishingEvents.item(i);
    var id=publishingEvent.getAttributeNS(this.lrdfNS,"ID");
    var payloadType=publishingEvent.getElementsByTagNameNS(this.lmodNS,"payloadType").item(0).getAttributeNS(this.lrdfNS,"resource").substring(1);
    var uiEventType=this.checkAndClean(publishingEvent.getElementsByTagNameNS(this.lmodNS,"uiEventType").item(0).getAttributeNS(this.lrdfNS,"resource"),this.leventNS);
    var cancelable=publishingEvent.getElementsByTagNameNS(this.lmodNS,"cancelable").item(0).firstChild.textContent;
    
    var publishingEventN=new PublishingEvent(id,payloadType,uiEventType,cancelable);
    this.lpublishingEventNodes.put(id,publishingEventN);   
  }
}

/*
 * Parsea los eventos processing (id + payload + operacion + concepto_destino).
 */
ModdingInterfaceXMLParser.prototype.parseProcessingEventNodes=function(){
  var processingEvents=this.lxml.getElementsByTagNameNS(this.lmodNS,"ProcessingEvent");
    
  for(var i=0;i<processingEvents.length;i++){ 
    var processingEvent=processingEvents.item(i);
    var id=processingEvent.getAttributeNS(this.lrdfNS,"ID");
    var payloadType=this.checkAndClean(processingEvent.getElementsByTagNameNS(this.lmodNS,"payloadType").item(0).getAttributeNS(this.lrdfNS,"resource"),this.lhtmlNS);
    var operationType=this.checkAndClean(processingEvent.getElementsByTagNameNS(this.lmodNS,"operationType").item(0).getAttributeNS(this.lrdfNS,"resource"),this.lcoreNS);
    var targetConcept=processingEvent.getElementsByTagNameNS(this.lmodNS,"targetConcept").item(0).getAttributeNS(this.lrdfNS,"resource").substring(1);    
     
    var processingEvent=new ProcessingEvent(id,payloadType,operationType,targetConcept);
    this.lprocessingEventNodes.put(id,processingEvent);   
  }
}

/*
 * Parsea los eventos navigational (id + prefijo_url).
 */
ModdingInterfaceXMLParser.prototype.parseNavigationalEventNodes=function(){
  var navigationalEvents=this.lxml.getElementsByTagNameNS(this.lmodNS,"NavigationalEvent");
    
  for(var i=0;i<navigationalEvents.length;i++){ 
    var navigationalEvent=navigationalEvents.item(i);
    var id=navigationalEvent.getAttributeNS(this.lrdfNS,"ID");
    var payloadType=navigationalEvent.getElementsByTagNameNS(this.lmodNS,"payloadType").item(0).firstChild.textContent;
     
    var nEvent=new NavigationalEvent(id,payloadType);
    this.lnavigationalEventNodes.put(id,nEvent);   
  }
}

/*
 * Comprueba y elimina el namespace de las restricciones.
 */
ModdingInterfaceXMLParser.prototype.checkAndClean=function(str,type){
  var res;
  var a=str.indexOf(type);
  if(a==0){
    res=str.substring(type.length);
  }else{
    res=str;
  }
  return res;
}
/*
 * Clase que parsea los instancias de los conceptos y crea el "DOM Virtual" (DOM+transformation).
 */
function InstanceXMLParser(comp,xml){
  this.lrdfNS="http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  this.lxmlns="http://www.w3.org/2000/xmlns/";
  this.lbaseNS=xml.firstChild.getAttributeNS(this.lxmlns,"base");
  this.lmodNS="http://www.onekin.org/scripting#";
  this.lcomp=comp;
  this.lpage=comp.page();
  this.lxml=xml;
  this.liconceptNodesInter=new Hashtable();
  this.lroot;
  this.liconceptNodes=new Hashtable();  
  this.parseConceptNodes(comp.concepts());
}

InstanceXMLParser.prototype.rootElement=function(){
  return this.lroot;
}

InstanceXMLParser.prototype.iconceptNodes=function(){
  return this.liconceptNodes;
}

/*
 * Parsea las instancias concretas de cada concepto definido.
 */
InstanceXMLParser.prototype.parseConceptNodes=function(concepts){
  var it=concepts.entrySet().iterator(); 
  var nodes=new WNodeList(new Array()); 
  for(var i=0;it.hasNext();i++){ 
    var clas=it.next().getValue();
    var name=clas.name();
    var props=clas.properties();
    var instances=this.lxml.getElementsByTagNameNS(this.lbaseNS,name);
    var insts=new Array();
    for(var j=0;j<instances.length;j++){  //Parsea las instancias de un concepto en concreto
      var inst=instances.item(j);
      var cid=inst.getAttributeNS(this.lrdfNS,"ID");
      var array=new Array();
      var t=0;
      for(var k=0;k<props.length;k++){
        var propname=props[k];
        var nodeValue=inst.getElementsByTagNameNS(this.lbaseNS,propname);
        for(var l=0;l<nodeValue.length;l++){ //Parsea las instancias de las propiedades de cada concepto
          var prop=nodeValue.item(l);
          var value;
          if(prop.childNodes.length==2){
            value=prop.lastChild.textContent;
          }else{
            value="";
          }
          var wsubElement=new WElement(this.lcomp,propname,this.extractRealNode(prop),new WNodeList(new Array()),value);
          array[t]=wsubElement;
          t++;
        }
      }
      var wElement=new WElement(this.lcomp,clas.name(),this.extractRealNode(inst),new WNodeList(array),null);
      this.liconceptNodesInter.put(cid,wElement);
      insts[j]=wElement;
      
      nodes.put(wElement,nodes.length);
    }
    this.liconceptNodes.put(name,insts);
  }
  this.lroot=new WElement(this.lcomp,"root",this.lpage,nodes,null);
}

/*
 * Extrae el nodo del DOM real apartir del xpath almacenado durante la transformación.
 * Este nodo real se almacena con el nodo virtual para poder capturar los eventos que se realicen sobre él.
 */
InstanceXMLParser.prototype.extractRealNode=function(node){
  var xpath=node.getElementsByTagNameNS(this.lmodNS,"XPath").item(0).firstChild.textContent;
  return this.lpage.evaluate(xpath,this.lpage,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
}
/*
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
 * Clase que wrappea un CSSStyleDeclaration del DOM. Es un CSSStyleDeclaration  del "DOM Virtual".
 * El comportamiento es el mismo que el de la clase CSSStyleDeclaration del DOM.
 * Un ejemplo de uso es cuando se va a aplicar un estilo a una Elemento determinado.
 * Contiene:
 *       - El elemento original del DOM sobre el cuál se va aplicar el estilo
 *       - Las restricciones de estilo sobre el elemento
 */
function WCSSStyleDeclaration(element,def){
  var lelement=element;
  var ldef=def;
  
  /*
   * Devuelve la valor de la propiedad del estilo.
   * Se comprueba si cumple la restricción de estilo antes de devolverlo.
   * El comportamiento es igual a la función getPropertyValue del DOM.
   */ 
  this.getPropertyValue=function(pname){
    var val;
    if(ldef[pname]){
      val=lelement.getPropertyValue(pname);
    }
    return val;
  }
  
  /*
   * Elimina la propiedad del estilo.
   * Se comprueba si cumple la restricción de estilo antes eliminarla.
   * El comportamiento es igual a la función removeProperty del DOM.
   */ 
  this.removeProperty=function(pname){
    if(ldef[pname]){
      val=lelement.removeProperty(pname);
    }
  }
  
  /*
   * Fija el valor de la propiedad del estilo.
   * Se comprueba si cumple la restricción de estilo de fijar el valor.
   * El comportamiento es igual a la función setProperty del DOM.
   */   
  this.setProperty=function(pname,value,prior){
    if(ldef[pname]){
      val=lelement.setProperty(pname,value,prior);
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
function PublisherComposite(cev,msgBroker){
  this.lcompositeEvent=cev;
  this.lmsgBroker=msgBroker;
  this.lev=null;
  this.lsubs=null;
  this.lev1=null;
  this.lev2=null;
}

PublisherComposite.prototype=new Publisher(null,new Array());
PublisherComposite.prototype.listener=function(ev){
  this.uninstall();
  if(this.lev1){
    this.lev2=ev;
    var realev=EventFactory.createEvent("SequenceEvents",true,this.lmsgBroker.lComp);
    realev.initSequenceEvent(this.lcompositeEvent.type,this.lev1,this.lev2,true);
    this.lmsgBroker.publishEvent(this.lcompositeEvent.type,realev);
  }else{
    this.lev1=ev;
    this.install(this.lcompositeEvent.secondEvent);   
    this.lmsgBroker.createPublisherSpec(this.lcompositeEvent);
  }
}

PublisherComposite.prototype.install=function(evStr){
  var ins=this;
  if(!evStr){
    evStr=this.lcompositeEvent.firstEvent;
  }  
  this.lev=evStr;
  this.lsubs=new Subscriber(function(ev){ins.listener(ev);});
  this.lmsgBroker.addSubscriber(evStr,this.lsubs);
}

PublisherComposite.prototype.uninstall=function(){
  this.lmsgBroker.removeSubscriber(this.lev,this.lsubs);
  this.lev=null;
  this.lsubs=null;  
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
  }else{
    publisher=new PublisherComposite(p1,p2);
  }
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
/*
 *
 */
function CEvent(cancelable,comp){
  var lcomp=comp;
  var lcancelable=cancelable;
  var lcancelled=false;
  var ltype;
  var ltarget;
  var lcontext;
  var levent1;
  var levent2;

  this.__defineGetter__("kind",function(){
    return "SequenceEvent";
  });
    
  this.__defineGetter__("type",function(){
    return ltype;
  });
  
  this.__defineGetter__("firstEvent",function(){
    return levent1;
  });
  
  this.__defineGetter__("secondEvent",function(){
    return levent2;
  });    
  
  this.__defineGetter__("cancelable",function(){
    return lcancelable;
  });
  
  this.__defineGetter__("context",function(){
    return lcontext;
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
  this.initSequenceEvent=function(type,ev1,ev2,isInstance){
    ltype=type;
    levent1=ev1;
    levent2=ev2;
    if(!isInstance){
      comp.addCompositeEventDefinition(this);
    }
  } 
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
function UserRegistration(page){
  this.panelReg=null;
  this.id=null;
  this.panelLog=null;
  this.lpage=page;
  this.createRegistration();
  this.createPanel();
}

UserRegistration.prototype.addRegistration=function(){
  this.lpage.body.appendChild(this.panelReg);
}

UserRegistration.prototype.removeRegistration=function(){
  this.lpage.body.removeChild(this.panelReg);
}

UserRegistration.prototype.addPanel=function(){
  this.lpage.body.appendChild(this.panelLog);
}

UserRegistration.prototype.removePanel=function(){
  this.lpage.body.removeChild(this.panelLog);
}

UserRegistration.prototype.createRegistration=function(){
  var box=this.lpage.createElement('div');
  box.setAttribute('style','position: absolute; top: 35px; left: 35px; background-color:white;');  
  var reg=this.lpage.createElement('a');
  reg.href='#';
  var ins=this;
  reg.addEventListener('click',function(ev){ins.handlerReg(ev);},true);
  var p=this.lpage.createElement('p');
  p.setAttribute('style','font-size: x-large;text-align: center;');  
  p.textContent='Register now!!';
  
  var image = this.lpage.createElement('img');
  image.src = "modicon.png";
  image.border='none';
 
  reg.appendChild(image);
  reg.appendChild(p);
  box.appendChild(reg);
  this.panelReg=box;
}

UserRegistration.prototype.createPanel=function(){
  var box=this.lpage.createElement('div');
  box.setAttribute('style','position: absolute; top: 35px; left: 35px; background-color: purple; color: white; padding: 10px 15px 10px 15px;');

  var txt1=this.lpage.createTextNode('Thanks for joining the ICWE periphery.');
  var br1=this.lpage.createElement('br')
  var txt2=this.lpage.createTextNode('Please introduce your user ID at userscripts.org');
  var form=this.lpage.createElement('form');
    
  var p1=this.lpage.createElement('p');
  var lab1=this.lpage.createTextNode('userscript.org user ID');    
  var br2=this.lpage.createElement('br')
  var in1=this.lpage.createElement('input');
  in1.type="text";
  in1.name="id";
  in1.size=30; 
  p1.appendChild(lab1);
  p1.appendChild(br2);
  p1.appendChild(in1);

  var ins=this;

  var in2=this.lpage.createElement('input');
  in2.type="submit";
  in2.name="singup";
  in2.value="Sign up!";
  in2.addEventListener('click',function(ev){ins.handlerSubmit(ev);},true); 
  var in3=this.lpage.createElement('input');
  in3.type="submit";
  in3.name="cancel";
  in3.value="Cancel";
  in3.addEventListener('click',function(ev){ins.handlerCancel(ev);},true); 
     
 
  form.appendChild(p1);  
  form.appendChild(in2);
  form.appendChild(in3);  
  
  box.appendChild(txt1);
  box.appendChild(br1);
  box.appendChild(txt2);
  box.appendChild(form);  
  
  this.id=in1;
  this.panelLog=box;  
}

UserRegistration.prototype.handlerReg=function(ev){
  ev.preventDefault();
  this.removeRegistration();
  this.addPanel();  
}

UserRegistration.prototype.handlerSubmit=function(ev){
  ev.preventDefault();
  var val=this.id.value;
  var ref='http://userscripts.org/users/'+val;
  var ins=this;
  GM_xmlhttpRequest({
      method: 'GET',
      url: ref,
      onload: function(responseDetails) {
         if(responseDetails.status==404||responseDetails.status==500){
           alert('Seems this user ID does not exists at userscripts.org. Please check the spelling.');     
         }else if(responseDetails.status==200){
           alert('Your userscript ID has been successfully registered. ICWE periphery will hear about you!');
           ins.removePanel();                      
         }else{
           alert('Unknow response: '+responseDetails.status+' '+responseDetails.statusText);
         }
      }
  });
}

UserRegistration.prototype.handlerCancel=function(ev){
  ev.preventDefault();
  this.removePanel();
  this.addRegistration();
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
  }
}

Component.prototype.context=function(){
  return this.lcontext;
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
  var moddEnable=DOM.getElementsByAttribute(this.lpage,"profile","http://www.onekin.org/scriptingFriendly","head").length>0;
  
  if(moddEnable){
    //Cargar todos los Events agrupados por ids
    //Cargar todos los Concepts agrupados por conceptNames
    //var ur=new UserRegistration(this.lpage);
    //ur.addRegistration();
    this.loadDefinitions();
  }else{
    var head=this.lpage.getElementsByTagName('head').item(0);
    var ins=this;
    head.addEventListener('DOMAttrModified',function(ev){if(ev.attrName=="profile"&&ev.newValue=="http://www.onekin.org/scriptingFriendly"){ins.printRegIcon();ins.loadDefinitions();}},true);
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
function ComponentRemote(ref){  
  Component(this);
  this.lref=ref;
  this.lpath=null;
  this.lfun=null;
  this.lpage=null;
  
  this.lbusy=true;
  
  this.ltaskqueue=new Array();
}

ComponentRemote.prototype=new Component();

ComponentRemote.prototype.navigate=function(url,context){
  this.lcontext=context;
  var ins=this;
  XMLHttpRequestManager.getXML(null,url,function(xml){ins.setPage(xml);},true);
}

ComponentRemote.prototype.enqueue=function(ev){
  this.ltaskqueue[this.ltaskqueue.length]=ev;
}

ComponentRemote.prototype.init=function(){ //INIT
  var ins=this;
  if(this.lfun){
    this.setMoodingInterface(XML.createEmptyPage());
  }else{
    XMLHttpRequestManager.getXML(null,this.lref,function(xml){ins.setMoodingInterface(xml);},true);
  }
}

ComponentRemote.prototype.setFunc=function(fun){
  this.lfun=fun;
}

ComponentRemote.prototype.func=function(){
  return this.lfun;
}

ComponentRemote.prototype.setMoodingInterface=function(xml){
  this.lmoddingInterface=xml;
  if(this.lfun){
    this.lfun(this.lmoddingInterface);
  }
  var moddEnable=DOM.getElementsByAttribute(this.lmoddingInterface,"profile","http://www.onekin.org/scriptingSpecs","head").length>0;
  if(moddEnable){
    this.loadDefinitions();
    this.lbusy=false;
    this.dispatchEvent(null);    
  }
}

ComponentRemote.prototype.setPage=function(xml){
  this.lpage=xml;
  this.lmessageBroker.removePublishers();
  //this.installListeners();
  if(this.lfun){
    this.lfun(this.lpage);
  }
  this.load();
}

ComponentRemote.prototype.load=function(){
  if(this.lmoddingInterface){
    //Cargar todos los Events agrupados por ids
    //Cargar todos los Concepts agrupados por conceptNames
    this.loadInstances(); 
    this.lbusy=false;
    this.dispatchEvent(null);
  }
}

ComponentRemote.prototype.dispatchEvent=function(ev){
  if(ev){
    if(!this.lbusy){  
      this.lbusy=true;
      this.realDispatchEvent(ev);
    }else{
      this.enqueue(ev);
    }
  }else{
    if(!this.lbusy){
      if(this.ltaskqueue.length>0){
        var head=this.ltaskqueue[0];
        this.ltaskqueue=this.ltaskqueue.slice(1,this.ltaskqueue.length);
        this.dispatchEvent(head);
      }    
    }
  }
}

ComponentRemote.prototype.addEventListener=function(type,listener,flag){ //in DOMString type, in EventListener listener, in boolean useCapture
  this.realAddEventListener(type,listener);
}

ComponentRemote.prototype.removeEventListener=function(type,listener,flag){ //in DOMString type, in EventListener listener, in boolean useCapture
  this.realRemoveEventListener(type,listener);
}
function ComponentFactory(){
}

ComponentFactory.createComponent=function(iformat,tunebox,ref){
  var res=null;
  if(!ref){
    res=new ComponentLocal(tunebox,iformat);  
  }else{ 
    res=new ComponentRemote(iformat,tunebox,ref);  
  }
  return res;
}
function ComponentBuilder(component){
  this.lcomponent=component;
}

ComponentBuilder.prototype.build=function(tunebox){
  /*if(this.lcomponent.liformat=="XML"){
    this.XML();
  }else if(this.lcomponent.liformat=="JSON"){
    this.JSONRDF();  
  }else{*/
    this.XML();
  //}
}

ComponentBuilder.prototype.XML=function(){
  this.loadDefinitionsXML();
}

ComponentBuilder.prototype.loadDefinitionsXML=function(){
  var conceptEventsRef=DOM.getElementsByAttribute(this.lcomponent.lpage,"rel","moddingInterface","link")[0].getAttribute("href"); //HTMLLinkElement con la referencia a las definiciones
  var ins=this;
  XMLHttpRequestManager.getXML(this.lcomponent.lpage,conceptEventsRef,function(xml){ins.lcomponent.lmoddingInterface=xml;ins.loadDefinitionAsync();},false);
}

ComponentBuilder.prototype.loadDefinitionAsync=function(){
  var parser=new ModdingInterfaceXMLParser(this.lcomponent.lmoddingInterface);
  
  this.buildDef(parser);
  
  if(this.lcomponent.linst_flag){
    this.loadInstancesXML();
  }
}

ComponentBuilder.prototype.loadInstancesXML=function(){
  var transRef=DOM.getElementsByAttribute(this.lcomponent.lpage,"rel","transformation","link")[0].getAttribute("href"); //HTMLLinkElement con la referencia a las definiciones
  var ins=this;
  XMLHttpRequestManager.getXML(this.lcomponent.lpage,transRef,function(xml){ins.lcomponent.ltransformation=xml;ins.loadInstancesAsync();},false);
}

ComponentBuilder.prototype.loadInstancesAsync=function(){  
  var xml=XML.transformXML(this.lcomponent.ltransformation,this.lcomponent.lpage);
  var parser=new InstanceXMLParser(this.lcomponent,xml);

  this.buildInst(parser);
  
  this.lcomponent.lmessageBroker.updatePublishers();  
}
/*
ComponentBuilder.prototype.JSONRDF=function(){
  var mparser=new ModdingInterfaceJSONParser(this.lcomponent.lpage.wrappedJSObject.scriptingInterface);
  this.buildDef(mparser);
  var ns=this.lcomponent.lpage.wrappedJSObject.JSONTransformation["ns"];
  var jsoni=this.lcomponent.lpage.wrappedJSObject.JSONTransformation[ns+"root"](xml2json(this.lcomponent.lpage));
  var iparser=new InstanceJSONParser(this.lcomponent,JSON.parse(jsoni),ns);
  this.buildInst(iparser);
}
*/
ComponentBuilder.prototype.buildDef=function(parser){
  this.lcomponent.lconcepts=parser.conceptNodes();
  this.lcomponent.lpublishingEventsByID=parser.publishingEventNodesID();
  this.lcomponent.lprocessingEventsByID=parser.processingEventNodesID();
  this.lcomponent.lnavigationalEventsByID=parser.navigationalEventNodesID();
  
  this.lcomponent.addSubscribers(this.lcomponent.lprocessingEventsByID);
  this.lcomponent.addSubscribers(this.lcomponent.lnavigationalEventsByID);  
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
/*
Tunebox.prototype.deployComponent=function(ref){
  var res=null;
  if(location.href==ref){
    res=this.base;
  }else{
    var mi=this.searchInyector(ref);
    if(mi){
      iformat=mi.iformat();
      res=ComponentFactory.createComponent(ref,iformat);
      var ins=this;
      res.setFunc(function(xml){mi.install(xml);});
    }
    this.ltoInit[this.ltoInit.length]=res;  
  }
  return res;
}*/

Tunebox.prototype.initComponents=function(){
  for(var i=0;i<this.ltoInit.length;i++){
    var comp=this.ltoInit[i];
    comp.init(this);
  }
}
/*
Tunebox.prototype.searchInyector=function(ref){
  var res=null;
  for(var i=0;i<this.GLOBAL_REGISTRY.length&&!res;i++){
    var reg=this.GLOBAL_REGISTRY[i];
    if(reg.test(ref)){
      res=reg;
    }
  }
  return res;
}*/

/*
Tunebox.prototype.registerScriptingInterface=function(url,iface,extract,iformat){
  var iny=new InyectorRegistry(url,iface,extract,iformat);
  if(iny.test(win.location.href)){
    this.base.liformat=iformat;
    iny.install(doc);
  }
  this.GLOBAL_REGISTRY[this.GLOBAL_REGISTRY.length]=iny;
}*/

Tunebox.prototype.main=function(){
  this.initComponents();
}

var tuneboxSingleton=new Tunebox();

win.tuneboxSingleton=tuneboxSingleton;
//win.deployComponent=function(ref){return tuneboxSingleton.deployComponent(ref);}
//TOFIXwin.registerScriptingInterface=function(jsonClass){return tuneboxSingleton.registerScriptingClass(jsonClass);}

//win.addEventListener("load",function(){tuneboxSingleton.main();},true);
tuneboxSingleton.main();
