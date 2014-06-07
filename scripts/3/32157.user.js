// ==UserScript==
// @name          IS24ResultListHelper
// @namespace      IS24
// @include        http://www.immobilienscout24.de/*
// ==/UserScript==
var eventSource= (navigator.appName.indexOf('Opera') == -1) ? window : document; // I use this because I might want to make it cross browser later
eventSource.addEventListener( 'load', function( e ) { manipulateDOM(); }, false); //to be run on load of the page

function buildElement(tag,attributes,innerElements,listener){var element = document.createElement( tag );for (var attr in attributes){element.setAttribute(attr,attributes[attr]);}if (innerElements){for (var idx=0;idx <innerElements.length;idx++){element.appendChild(innerElements[idx]);}}if (listener){for (var idx=0;idx <listener.length;idx++){element.addEventListener(listener[idx].event,listener[idx].function,true);}}return element;}
function textNode(text)  {return document.createTextNode(text);}
function gebid(id){var el = document.getElementById(id);if (el) {return el;}else {return null;}}

  


var linksbuilded = false;
var objekte ={};
var objekteString = "objekte = "+GM_getValue('objekte','{}');
eval(objekteString);


var NORMAL=-1;
var IGNORE=0;
var HILITE=1;
var _to_=null;
function manipulateDOM(){
  var el = gebid('is24-resultlist-listview');
  if (el) {
    do_resultList(el);
  } else {
    //console.log('no resultList');
    var obid = -1;
    var els = document.getElementsByTagName('input');
    for (var i = 0; i< els.length; i++){
      if (els[i].name && els[i].name =='obIdControl' && els[i].type =='hidden'){
        obid = els[i].value;
      }
    }
    if (obid > 0){
      // ok we are on the realestate
      //console.log('but obid '+obid);  
      do_realEstate(obid);
    }
    document.getElementsByTagName('input');
    
  } 

  }

function do_realEstate(obid){
  var content = gebid('is24-content');
  var divs  = content.getElementsByTagName('div');
  var notFound = true;
  for (var i = 0;i<divs.length && notFound;i++){
    if (divs[i].className && divs[i].className=='is24-expose_new'){
      
      divs[i].getElementsByTagName('div')[0].id = obid;
      divs[i].appendChild(buildControlPanel(obid));
      //console.log(divs[i]);
      notFound = false;
    }
    
  }
              handleObject(obid);

}

function do_resultList(el){
var i2 = 0;
  var pN = null;
  var tb_=[];
  var list=[];
     

   var tbodys = el.getElementsByTagName('tbody');
    pN = tbodys[0].parentNode;
	  pN.setAttribute('style','border-collapse:separate;');
    var obid =-1;
    var obid1 =-1;
    
    var nodes = copyArray(tbodys[1].getElementsByTagName('tr'));
    for (var i = 0;i< nodes.length;i++){
      //console.log(nodes[i]);
      var links = nodes[i].getElementsByTagName('a');
      for (var j = 0;j< links.length;j++) {
        if (links[j].name && links[j].name == 'ExposePermaLink'){
          
          var match = /\/([0-9]+);jsessionid/.exec(links[j].href);
	        if (match){
	          obid = match[1];
		      }
        }
      }
      
    //}
       obid1 = 'adbeneath~'+obid;
        
        if (!tb_[obid]) {
          tb_[obid]=buildElement('tbody',{id:obid});
          list[list.length]=obid;
        }
        if (!tb_[obid1]) {
        list[list.length]=obid1;
          tb_[obid1]=buildElement('tbody',{id:obid1});
        }  
	    
	    if (isValid(nodes[i])){
        if (tb_[obid1]){
          tb_[obid].appendChild(tbodys[1].removeChild(nodes[i]));
        } //else console.log(obid);
      } else {
        if (tb_[obid1] && nodes[i].tagName) {
          tb_[obid1].appendChild(tbodys[1].removeChild(nodes[i]));
        }
      }      
    }
  
    if (pN!=null){
      for (var i=0;i< list.length;i++){
        if (tb_[list[i]] && tb_[list[i]].childNodes.length>0){
          pN.appendChild(tb_[list[i]]);
          if (list[i].charAt(0)!='a'){
            prepareObject(list[i]);
            handleObject(list[i]);
          }
        }
      }
    }

}

function prepareObject(obid){
   var container = gebid(obid);
   var tds = container.getElementsByTagName('td');
   for (var i=0;i<tds.length;i++){
    var str = ""+tds[i].className;    
    tds[i].className = str.replace(/is24-borderbottom/g,"").replace(/is24-col6/g,"");
    tds[i].setAttribute('style','');
    
  }
   
   var newRow = buildElement('tr',{},
                [
                  buildElement('td',{'colspan':'6','class':'is24-borderbottom'},
                  [
                    buildControlPanel(obid)
                  ])
                ]);
   
                
   var lineRow = buildElement('tr',{},
                [
                  buildElement('td',{'colspan':'6','class':'is24-borderbottom'},
                  [
                    textNode(' ')
                  ])
                ]);
          
   if (container.childNodes.length == 4){ 
     container.insertBefore(newRow,container.lastChild);
   } else { 
     container.appendChild(newRow);
     container.appendChild(lineRow);
   }
}

function buildControlPanel(obid){
return buildElement('table',{'style':'width:100%','summary':'controlpanel'},[buildElement('tr',{},
                [
                  buildElement('td',{'style':'vertical-align:top !important;width:10px;margin:0px;padding:0px !important;border: solid;background-color:buttonface !important;border-bottom-color:buttonshadow !important;border-left-color:buttonhighlight !important;border-width:2px !important;border-top-color:buttonhighlight !important;border-right-width:0px !important'},
                  [
                    buildElement('div',{'state':'-','style':'width:12px;height:12px;border-top-color:buttonshadow !important;border-right-color:buttonhighlight !important;border-left-color:buttonshadow !important;margin:2px;border-style:solid;border-width:2px !important;border-bottom-color:buttonhighlight !important;'},
                    [
                      buildElement('div',{'style':'cursor:pointer;margin-top:-2px;text-align:center;width:14px;height:14px;position:relative'},[textNode('-')])
                    ],[{event:'click','function':function(ev){collapse(this)}}])
                  ]),
                  buildElement('td',{'style':'border: solid;background-color:buttonface !important;border-bottom-color:buttonshadow !important;border-left-color:none !important;border-width:2px !important;border-top-color:buttonhighlight !important;border-right-width:0px !important;border-left-width:0px !important'},
                  [
                    buildElement('textarea',{id:'note_'+obid,'obid':obid,style:'width:100%;margin-right:5px;','rows':'4'},[],[{'event':'keyup','function':function(ev){saveNote(ev.target.getAttribute('obid'));}}])
                  ]),
                  buildElement('td',{'style':'border: solid;background-color:buttonface !important;border-bottom-color:buttonshadow !important;border-right-color:buttonshadow !important;border-width:2px !important;border-top-color:buttonhighlight !important;border-left-width:0px !important;width:120px;'},
                  [
                    buildElement('ul',{'style':'padding-left:5px !important'},buildLinkContainer(obid))
                  ])
                ])]);
}

function buildLinkContainer(obid){
  var links = [
    		                    buildElement('li',{'class':'is24-link-intern','style':'list-style-type: none !important;margin-left:0px !important;'},
                          [
								            buildElement('a',{'obid':obid,'title':'Ausblenden','href':'#'},
                            [textNode('Ausblenden')],
											      [{'event':'click','function':function(ev){ignore(ev.target.getAttribute('obid'));ev.preventDefault();return false;}}])
								          ]),
		                      buildElement('li',{'class':'is24-link-intern','style':'list-style-type: none !important;margin-left:0px !important;'},
         								  [
  								          buildElement('a',{'id':'note'+obid,'obid':obid,'title':'Hervorheben','href':'#'},
											      [textNode('Hervorheben')],
											      [{'event':'click','function':function(ev){hilite(ev.target.getAttribute('obid'));ev.preventDefault();return false;}}])
								          ]),
					                buildElement('li',{'class':'is24-link-intern','style':'list-style-type: none !important;margin-left:0px !important;'},
								          [
  								          buildElement('a',{'obid':obid,'title':'Reset','href':'#'},
											      [textNode('Reset')],
											      [{'event':'click','function':function(ev){reset(ev.target.getAttribute('obid'));ev.preventDefault();return false;}}])
								          ]),
                          buildElement('li',{'class':'is24-link-intern','style':'list-style-type: none !important;margin-left:0px !important;'},
								          [
  								          buildElement('a',{'obid':obid,'title':'Notiz löschen','href':'#'},
											      [textNode('Notiz löschen')],
											      [{'event':'click','function':function(ev){delNote(ev.target.getAttribute('obid'));ev.preventDefault();return false;}}])
								          ])
              ];
  return links;

}

function collapse(obj){
  var displ = '';
  if (obj.state && obj.state=='+') {
    obj.state='-';    
    displ = '';
  } else {
    obj.state='+';
    displ = 'none';
  }
  obj.getElementsByTagName('div')[0].innerHTML = obj.state;
  var tabl = document.getElementsByTagName('table');
  for (var i = 0;i< tabl.length;i++){
    if (tabl[i].summary && tabl[i].summary == 'controlpanel'){
      var tds = tabl[i].getElementsByTagName('td');
      for (var i2 = 1;i2< tds.length;i2++){
        tds[i2].style.display=displ;
      }  
    }
  }
}

function handleObject(obid){
  changeAppearance(obid);
  var obj = gebid('note_'+obid);
  obj.value = getObjekt(obid).note;  
}

function copyArray(arr){
  var arra = [];
  for (var i=0;i<arr.length;i++){
    arra[arra.length] = arr[i];
  }
  return arra;
}

function isValid(element){
  var ret = false;
  if (element.tagName=='TR'){ 
    ret = true;
    // Wir wollen Fair bleiben und lassen die Werbung in Ruhe 
    var el = element.getElementsByTagName('td');
	  for (var i = 0;i< el.length;i++){
	    if (el[i].className == 'is24-banner'){
	      ret = false;
	    }
	  }
  }
  return ret ;
}


function ignore(objektNummer){
  changeState(objektNummer,IGNORE);
  changeAppearance(objektNummer);
}

function hilite(objektNummer){
  changeState(objektNummer,HILITE);
  changeAppearance(objektNummer);
}
function reset(objektNummer){
  changeState(objektNummer,NORMAL);
  changeAppearance(objektNummer);
}
function saveNote(objektNummer){
  getObjekt(objektNummer).note=gebid('note_'+objektNummer).value;
  if (_to_ != null){
    window.clearTimeout(_to_);
    _to_=null;
  }
  _to_ = window.setTimeout(save,1000);
}
function changeAppearance(obid){
  var state = getObjekt(obid).state;
  var opac=1;
  var col='#fff';
  switch (state) {
    case IGNORE:
      opac=0.3;
      col = '#dedede';
      style = 'opacity:'+opac+'; background-color:'+col+' !important;';
      break;
    case HILITE:
      opac=1;
      col = '#afa';
      style = 'opacity:'+opac+'; background-color:'+col+' !important;';
      break;
  default:
      style = '';
    break;
  }
  var obj = gebid(obid);
	obj.setAttribute('style',style );
}


function delNote(objektNummer){
  getObjekt(objektNummer).note = '';
  gebid('note_'+objektNummer).value ='';
  save();
}


function changeState(objektNummer,newState){
  if (objekte[objektNummer]){
     objekte[objektNummer].state=newState;
  } else {
     objekte[objektNummer]={state:newState,note:''};
  }
  save();
}

function save(){
GM_setValue('objekte',makeJSON());  
}

function makeJSON(){

  var json = "{";
  var first = true;
  for (var idx in objekte){
    if (objekte[idx].state != -1 || objekte[idx].note != ''){
	    if (!first) json = json+',';
		json = json + "'"+idx+"':{state:"+objekte[idx].state+",note:'"+objekte[idx].note+"'}";
	    first = false;
	}
  }
  json = json + '}';
  //console.log(json);
  return json;
}
 
function getObjekt(objektnummer){
  var ret = {state:-1,note:''};
  if (typeof(objektnummer) != 'undefined'){
    if (typeof(objekte[objektnummer])!="undefined"){
      ret = objekte[objektnummer];
    } else {
      objekte[objektnummer] = ret;
    }
  }
  return ret;
}

function getState(objektnummer){
  return getObjekt(objektnummer).state;
}
function getNote(objektnummer){
  return getObjekt(objektnummer).note;
}

