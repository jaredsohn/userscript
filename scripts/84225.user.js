// ==UserScript==
// @name           FurAffinity Filter Colors
// @namespace      http://userscripts.org/users/208586
// @include        http://www.furaffinity.net/msg/submissions*
// @include        http://www.furaffinity.net/msg/others*
// ==/UserScript==

// Version 1.0

var thisPage;
var configOpen=false;
var configChange;
var filters=[];
var nonFilterSettings;
init();

function init() {
   if (document.getElementById("filter_color_run")) {
      return;
   }
   // FFFFFFF
   // CSS RULEZ GO DIE NAO
   killCSSRule('div#messagecenter-other ul.message-stream li.hover');
   killCSSRule('div#messagecenter-other ul.message-stream li.checked');
   killCSSRule('div#messagecenter-other ul.message-stream table.checked');
   killCSSRule('div#messagecenter-submissions table.checked');
   addLink();
   setPrototypes();
   if (!setup()) {
      return;
   }
   nonFilterSettings={
      'autoRefresh'  :"Automatically Refresh page after changes are made",
      'submissionsOn':"Apply to Submissions",
      'journalsOn'   :"Apply to Journals"
   };
   parseFilters();
   var temp=/^http:\/\/www\.furaffinity\.net\/msg\/(others|submissions)/i;
   try {
      switch (temp.exec(window.location.toString())[1]) {
         case 'others':
            thisPage='journals';
            break;
         case 'submissions':
            thisPage='submissions';
            break;
         default:
            return;
      }
   } catch (e) {
      // Assume no new items... wha?
      return;
   }
   run();
}
function setup() {
   if (GM_getValue("setup")) {
      return true;
   }
   GM_setValue("setup",true);
   GM_setValue("filters","");
   GM_setValue("submissionsOn",true);
   GM_setValue("journalsOn",true);
   GM_setValue("autoRefresh",true);
   new Filter(
      "Site Owner",      // name
      "dragoneer",       // reg
      true,              // journals
      true,              // submissions
      true,              // matchName
      true,              // matchUser
      true,              // noCase
      "",                // fore
      "#666600"          // back
   );
   new Filter(
      "Admins",          // name
      "damaratus, daxdaz, Dax, foxamoore, Fox Amoore, ahkahna, bijouxdefoxxe, Bijoux de'Foxxe, glaide, kyoujin, silverrwolfe, Silver R. Wolfe, pinkuh, rhainor, wicht",
      true,              // journals
      true,              // submissions
      false,             // matchName
      true,              // matchUser
      true,              // noCase
      "",                // fore
      "#000066"          // back
   );
   new Filter(
      "Support Admins",  // name
      "carenathziroth, Carenath, chase, dior, irreverent, surgat, warmock, witchiebunny, xaerun",
      true,              // journals
      true,              // submissions
      false,             // matchName
      true,              // matchUser
      true,              // noCase
      "",                // fore
      "#006600"          // back
   );
   new Filter(
      "Technical Staff", // name
      "net-cat, tsawolf, yak",
      true,              // journals
      true,              // submissions
      false,             // matchName
      true,              // matchUser
      true,              // noCase
      "",                // fore
      "#660000"          // back
   );
   return false;
}
function openConfig(first) {
   if (configOpen) {
      window.alert("The configuration window is already open!");
      return;
   }
   configOpen=true;
   configChange=false;
   var table=mkElem("table");
   table.style.position="absolute"; //fixed";
   table.style.left="0px";
   table.style.top="0px";
   table.id="configTable";
   var width=Math.min(document.body.offsetWidth,window.innerWidth);
   var height=document.body.offsetHeight;//Math.min(document.body.offsetHeight,window.innerHeight);
   table.style.width=width+"px";
   table.style.height=height+"px";
   var tr=mkElem("tr");
   var td=mkElem("td");
   td.style.width=width+"px";
   td.style.height=height+"px";
   td.style.backgroundImage="url(data:image/png;base64,"+
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0"+
      "U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAPSURBVHjaYmBgYLgJEGAAAN4A2iRyhfgA"+
      "AAAASUVORK5CYII=)";  // size:1x1, color:#000000, opacity:85%
   td.style.textAlign="center";
   tr.appendChild(td);
   table.appendChild(tr);
   document.body.appendChild(table);
   var win=mkElem("div");
   win.style.textAlign='center';
   win.style.border='7px double #c0c0c0';
   win.style.marginLeft='5px';
   win.style.marginRight='5px';
   win.style.padding='5px';
   win.style.backgroundColor="#333399";
   var xRow=mkElem("div");
   xRow.style.textAlign="right";
   xRow.style.paddingRight="1ex";
   var x=mkElem("span");
   x.id="configClose";
   x.style.fontFamily="Monospace";
   x.style.fontSize="6ex";
   x.style.fontWeight="900";
   x.style.color="#ff0000";
   x.style.cursor="pointer";
   x.innerHTML="X";
   x.addEventListener('mouseover',function() {this.style.color="#ffffff";},false);
   x.addEventListener('mouseout' ,function() {this.style.color="#ff0000";},false);
   x.addEventListener('click'    ,function() {closeConfig();},false);
   xRow.appendChild(x);
   win.appendChild(xRow);
   var settings=mkElem("div");
   var checks=nonFilterSettings;
   for (var key in checks) {
      var check=mkElem('input');
      check.type='checkbox';
      check.checked=GM_getValue(key);
      check.id=key;
      check.addEventListener('change',function() {
         configChange=true;
         document.getElementById('configSave').disabled=false;
      },false);
      settings.appendChild(check);
      settings.appendChild(mkNode(checks[key]));
      settings.appendChild(mkElem("br"));
   }
   var fTable=document.createElement("table");
   fTable.id="filterTable";
   fTable.style.marginLeft="auto";
   fTable.style.marginRight="auto";
   var vars=Filter.prototype.getVars();
   vars.splice(0,0,"move");
   var fHeader=mkElem("tr");
   var fAdder=mkElem("tr");
   var fTa;
   var fTaInput;
   for (var key in vars) {
      var fTh=mkElem("th");
      var help;
      var display;
      if (vars[key]=='move') {
         help="Click the arrows to change the order of precedence.";
         display="Move";
      } else {
         help=Filter.prototype.help(vars[key]);
         display=Filter.prototype.varToDisplay(vars[key]);
      }
      fTh.appendChild(mkNode(display));
      fTh.style.cursor="help";
      fTh.style.border="1px solid #ffffff";
      fTh.title=help;
      fHeader.appendChild(fTh);
      fTa=mkElem("td");
      fTa.style.borderTop='2px solid #ffffff';
      if (vars[key]!='move') {
         var typ=Filter.prototype.getTypeFor(vars[key]);
         fTaInput=mkElem("input");
         if (typ=="") {
            fTaInput.disabled=true;
            fTaInput.size="1";
            fTaInput.style.textAlign='center';
            fTaInput.style.border='0px';
            fTaInput.style.backgroundColor='#333399';
            fTaInput.style.color='#c0c0c0';
            typ="text";
         }
         fTaInput.type=typ;
         fTaInput.name=vars[key];
         if (fTaInput.type=='text') {
            fTaInput.style.fontFamily="monospace";
            fTaInput.addEventListener('focus',function() {this.select();},false);
            if ((/^(fore|back)$/i).test(fTaInput.name)) {
               fTaInput.size="7";
            }
         }
         setInputValue(Filter.prototype.getDefaultFor(vars[key]),fTaInput);
         fTa.appendChild(fTaInput);
      }
      fAdder.appendChild(fTa);
   }
   fTh=mkElem("th");
   fTh.appendChild(mkNode("Remove"));
   fTh.style.border="1px solid #ffffff";
   fTh.style.cursor="help";
   fTh.title="Click to remove a filter";
   fHeader.appendChild(fTh);
   fTa=mkElem("td");
   fTa.style.borderTop='2px solid #ffffff';
   fTaInput=mkElem("input");
   fTaInput.type="button";
   fTaInput.value="Add";
   fTaInput.addEventListener('click',function() {
      if (!saveFilters(true)) {
         return;
      }
      closeConfig(true);
      openConfig();
   },false);
   fTa.appendChild(fTaInput);
   fTable.appendChild(fHeader);
   fAdder.appendChild(fTa);
   var img;
   var len=filters.length;
   for (var i in filters) {
      var fTr=mkElem("tr");
      fTr.className='filterRow';
      for (var key in vars) {
         var fTd=mkElem("td");
         if (vars[key]=='move') {
            var btns=["up","down"];
            for (var j in btns) {
               img=mkElem('img');
               img.src=getImage(btns[j]);
               img.alt="["+btns[j]+"]";
               img.style.cursor="pointer";
               img.addEventListener('click',function() {
                  var diff=this.alt=='[up]';
                  var par=this;
                  while (!(/^tr$/i).test(par.tagName)) {
                     par=par.parentNode;
                  }
                  var tElems=par.parentNode.getElementsByClassName('filterRow');
                  var elems=Array.prototype.slice.call(tElems);
                  var pos=0;
                  while (elems[pos]!=par) {pos++;}
                  if (pos==(diff?0:elems.length-1)) {
                     return;
                  }
                  if (diff) {
                     par.parentNode.removeChild(par);
                     elems[pos-1].parentNode.insertBefore(par,elems[pos-1]);
                  } else {
                     elems[pos+1].parentNode.removeChild(elems[pos+1]);
                     par.parentNode.insertBefore(elems[pos+1],par);
                  }
                  configChange=true;
                  document.getElementById('configSave').disabled=false;
               },false);
               fTd.appendChild(img);
            }
         } else {
            var typ=Filter.prototype.getTypeFor(vars[key]);
            var val=filters[i].get(vars[key]);
            fTdInput=mkElem("input");
            if (typ=="") {
               fTdInput.disabled=true;
               fTdInput.size=(""+val).length;
               fTdInput.style.textAlign='center';
               fTdInput.style.border='0px';
               fTdInput.style.backgroundColor='#333399';
               fTdInput.style.color='#c0c0c0';
               typ="text";
            }
            fTdInput.name=vars[key];
            fTdInput.type=typ;
            if (fTdInput.type=='text') {
               fTdInput.style.fontFamily="monospace";
               fTdInput.addEventListener('focus',function() {this.select();},false);
               if ((/^(fore|back)$/i).test(fTdInput.name)) {
                  fTdInput.size="7";
               }
            }
            fTdInput.addEventListener('change',function() {
               configChange=true;
               document.getElementById('configSave').disabled=false;
            },false);
            setInputValue(filters[i].get(vars[key]),fTdInput);
            fTd.appendChild(fTdInput);
         }
         fTr.appendChild(fTd);
      }
      fTd=mkElem("td");
      fTdInput=mkElem("input");
      fTdInput.type='button';
      fTdInput.addEventListener('click',function() {
         if (!window.confirm("Are you sure you want to delete this filter?")) {
            return;
         }
         var tr=this;
         while (!(/^tr$/i).test(tr.tagName)) {
            tr=tr.parentNode;
         }
         tr.parentNode.removeChild(tr);
         configChange=true;
         document.getElementById('configSave').disabled=false;
      },false);
      fTdInput.value="X";
      fTd.appendChild(fTdInput);
      fTr.appendChild(fTd);
      fTable.appendChild(fTr);
   }
   fTable.appendChild(fAdder);
   settings.appendChild(fTable);
   win.appendChild(settings);
   var save=document.createElement("input");
   save.id="configSave";
   save.value="Save Changes*";
   save.type='button';
   save.disabled=true;
   save.addEventListener(
      'click',
      function() {
         if (!saveFilters()) {
            return;
         }
         configChange=false;
         this.disabled=true;
      },
      false
   );
   win.appendChild(save);
   var t=[
      mkElem("hr"),
      mkNode("*Changes take effect after the page has been reloaded")
   ];
   if (first) {
      t.push(mkElem("hr"));
      t.push(mkNode(
         "Although window will only automatically appear once,"
      ));
      t.push(mkElem("br"));
      t.push(mkNode(
         "you can open it at any time by clicking "+
         "the link at the bottom of the page."
      ));
   }
   for (var i in t) {
      win.appendChild(t[i]);
   }
   td.appendChild(win);
   var xy=getXYpos(win);
   window.scrollTo(xy["x"]-8,xy["y"]-8);
}
function closeConfig(add) {
   if (
      !add&&
      configChange&&
      !window.confirm("Are you sure? Your changes will be lost.")
   ) {
      return;
   } 
   var elem=document.getElementById('configTable');
   elem.parentNode.removeChild(elem);
   configOpen=false;
   if (!add&&GM_getValue("autoRefresh")) {
      window.location.reload();
   }
}
function addLink() {
   var div=mkElem("div");
   div.style.textAlign="center";
   div.id="filter_color_run";
   var link=mkElem("div");
   link.addEventListener('click',function() {
      openConfig();
   },false);
   link.style.cursor='pointer';
   link.appendChild(mkNode("Open Color Filter Configuration"));
   div.appendChild(link);
   document.body.appendChild(div);
}
function run() {
   var items=[];
   var filtered=[];
   var inputs=document.getElementsByName(thisPage+"[]");
   for (var i=0; i<inputs.length; i++) {
      items.push(new Item(inputs[i],i));
   }
   for (var i=0; i<filters.length&&items.length>0; i++) {
      var appliesTo=filters[i].siftThrough(items);
      if (appliesTo.length===0) {
         continue;
      }
      filtered.push(new ItemFilterSet(filters[i],appliesTo));
   }
   for (var i=0; i<filtered.length; i++) {
      filtered[i].setColors();
   }
}
function saveFilters(full) {
   var fTable=document.getElementById('filterTable');
   if (!fTable||!configOpen) {
      window.alert("Configuration window is not open!");
      return null;
   }
   var nons=nonFilterSettings;
   for (var key in nons) {
      GM_setValue(key,document.getElementById(key).checked);
   }
   var vars={};
   var dets=[];
   var checks=[];
   var newFilters=[];
   var trs=fTable.getElementsByTagName("tr");
   for (var i=1; i<trs.length-(full?0:1); i++) {
      var inputs=trs[i].getElementsByTagName("input");
      var temp=[];
      for (var j=0; j<inputs.length-1; j++) {
         if (typeof vars[inputs[j].name]=="undefined") {
            vars[inputs[j].name]=[];
         }
         if ((/^(name|reg)$/).test(inputs[j].name)) {
            var dis=Filter.prototype.varToDisplay(inputs[j].name);
            if (inputs[j].value=="") {
               window.alert("The "+dis+" cannot be left blank!");
               inputs[j].focus();
               return false;
            } else if (
               inputs[j].name=="name"&&
               vars[inputs[j].name].indexOf(inputs[j].value)!=-1
            ) {
               window.alert(dis+"s must be unique!");
               inputs[j].focus();
               return false;
            }
         } else if ((/^autoCheck$/).test(inputs[j].name)) {
            checks[i]=inputs[j];
         }
         vars[inputs[j].name][i]=inputs[j].type=='checkbox'
                                 ?inputs[j].checked
                                 :inputs[j].value;
         var value=Filter.prototype.encode(vars[inputs[j].name][i]);
         temp.push(inputs[j].name+":"+value);
      }
      newFilters.push(temp.join(";"));
      temp.splice(0,1);
      var det=temp.join(";");
      if (dets.indexOf(det)!=-1) {
         window.alert(
            "The filter named '"+vars["name"][i]+"' is not unique.  Please "+
            "change at least one of its details to continue."
         );
         return false;
      }
      dets.push(temp.join(";"));
   }
   GM_setValue("filters",newFilters.join("|"));
   parseFilters();
   return true;
}
function parseFilters() {
   filters=[];
   var rawFilters=GM_getValue('filters').split("|");
   for (var i in rawFilters) {
      if (rawFilters[i]!="") {
         filters.push(new Filter(rawFilters[i]));
      }
   }
}
function Filter(nam,rg,jou,sub,mn,mu,nc,fg,bg) {
   var varNames=Filter.prototype.getVars();
   var vars={};
   for (var i in varNames) {
      vars[varNames[i]]="";
   }
   // see init at end
   this.matches=function(str) {
      return vars["reg"].test(str);
   };
   this.siftThrough=function(arr) {
      var matched=[];
      if (
         thisPage=="journals"   &&!(
            vars["journals"]&&GM_getValue("journalsOn")
         )||
         thisPage=="submissions"&&!(
            vars["submissions"]&&GM_getValue("submissionsOn")
         )
      ) {
         return matched;
      }
      for (var i=0; i<arr.length; i++) {
         if (
            vars["matchName"]&&this.matches(arr[i].getName())||
            vars["matchUser"]&&this.matches(arr[i].getUser())
         ) {
            matched.push(arr[i]);
            arr.splice(i,1);
            i--;
         }
      }
      return matched;
   };
   this.getName=function() {
      return vars["name"];
   };
   this.toString=function() {
      var str=[];
      var vs=Filter.prototype.getVars();
      for (var key in vs) {
         var v=vs[key]=='reg'?'rawReg':vs[key];
         str.push(vs[key]+":"+Filter.prototype.encode(vars[v]));
      }
      return str.join(";");
   };
   this.get=function(key) {
      var val=vars[key];
      if (key=="reg") {
         val=vars["rawReg"];
      }
      return val;
   };
   if (typeof rg=="undefined") {
      var rawString=nam;
      var rawVars=rawString.split(/;/g);
      for (var key in rawVars) {
         var temp=rawVars[key].split(/:/g);
         var decode;
         if ((/^(true|false)$/).test(temp[1])) {
            decode=temp[1]=="true"?true:false;
         } else {
            decode=Filter.prototype.decode(temp[1]);
         }
         vars[varNames[key]]=decode;
      }
   } else {
      for (var i in varNames) {
         vars[varNames[i]]=Filter.arguments[i];
      }
      filters.push(this);
      GM_setValue("filters",filters.join("|"));
   }
   vars["rawReg"]=vars["reg"];
   var temp;
   if ((temp=(/\/(.+)\/([gi])*/).exec(vars["reg"]))!==null) {
      vars["reg"]=new RegExp(
         temp[1],
         (vars["noCase"]?"i":"")+((typeof temp[2]!="undefined")?temp[2]:"")
      );
   } else {
      var reg=regQuote(vars["reg"]).split(/,+ */).join("|");
      vars["reg"]=new RegExp("\\b("+reg+")\\b",vars["noCase"]?"i":"");
   }
}
function Item(input,i) {
   var check=input;
   var name='';
   var user='';
   var container=input;
   while (!(/^li$/i).test(container.tagName)) {
      container=container.parentNode;
   }
   switch (thisPage) {
      case 'journals':
         var links=container.getElementsByTagName("a");
         if (typeof links[0]!="undefined") {
            name=links[0].innerHTML;
            user=links[1].innerHTML;
         }
         break;
      case 'submissions':
         var info=container.getElementsByClassName("info")[0];
         name=info.getElementsByTagName("span")[0].innerHTML;
         try {
            user=info.getElementsByTagName("a")[0].innerHTML;
         } catch (e) {}
         break;
   }
   this.getName=function() {
      return name;
   };
   this.getUser=function() {
      return user;
   };
   this.setFG=function(c) {
      container.style.color=c;
   }
   this.setBG=function(c) {
      container.style.backgroundColor=c;
   }
}
function ItemFilterSet(f,arr) {
   var filter=f;
   var items=arr;
   this.setColors=function() {
      for (var i in items) {
         items[i].setFG(filter.get("fore"));
         items[i].setBG(filter.get("back"));
      }
   }
}
function setPrototypes() {
   Filter.prototype.encode=function(str) {
      return (""+str)
         .replace(/%/g,"%25")
         .replace(/\|/g,"%7C")
         .replace(/:/g,"%3A")
         .replace(/;/g,"%3B")
         .replace(/'/g,"%2C")
         .replace(/"/g,"%22");
   };
   Filter.prototype.decode=function(str) {
      return (""+str)
         .replace(/%22/g,'"')
         .replace(/%2C/g,"'")
         .replace(/%3B/g,";")
         .replace(/%3A/g,":")
         .replace(/%7C/g,"|")
         .replace(/%25/g,"%");
   };
   Filter.prototype.varToDisplay=function(str) {
      switch (str) {
         case 'name':        return "Name";
         case 'reg':         return "Term";
         case 'journals':    return "Journals";
         case 'submissions': return "Submissions";
         case 'matchName':   return "Match Name";
         case 'matchUser':   return "Match User";
         case 'noCase':      return "Case Insensitive";
         case 'fore':        return "Foreground Color";
         case 'back':        return "Background Color";
         default:            return "Unknown";
      }
   };
   Filter.prototype.help=function(str) {
      switch (str) {
         case 'name':
            return "The name of the filter";
         case 'reg':
            return "The way to match items; it can be a string or a regular expression";
         case 'journals':
            return "Check to apply the filter to journals";
         case 'submissions':
            return "Check to apply the filter to submissions";
         case 'matchName':
            return "Check to match the item's name";
         case 'matchUser':
            return "Check to match the item's poster";
         case 'noCase':
            return "Check to make the term match in a case insensitive manner";
         case 'fore':
            return "The foreground/text/font color";
         case 'back':
            return "The background/highlight color";
         default:
            return "There is no help available for this field";
      }
   };
   Filter.prototype.getVars=function() {
      return ["name","reg","journals","submissions","matchName",
              "matchUser","noCase","fore","back"];
   };
   Filter.prototype.getTypeFor=function(key) {
      return (/^(name|reg|fore|back)$/).test(key)?"text":"checkbox";
   };
   Filter.prototype.getDefaultFor=function(key) {
      return (/^(name|reg|fore|back)$/).test(key)?"":true;
   };
}
function setInputValue(val,input) {
   if (!(/^input$/i).test(input.tagName)) {
      input.innerHTML=val;
   } else if (input.type=="checkbox") {
      if (typeof val!="boolean") {
         val=""+val=="true";
      }
      input.checked=val;
   } else {
      input.value=val;
   }
}
function regQuote(str) {
   addCharArray();
   var symbols="\\"+"\\.+*?[^]$(){}=!<>|:-/".toCharArray().join("\\");
   return (str+"").replace(new RegExp("(["+symbols+"])","g"),"\\"+"$1");
}
function addCharArray() {
   if (!String.prototype.toCharArray) {
      String.prototype.toCharArray=function() {
         return this.split(/.??/);
      }
   }
}
function getXYpos(elem) {
   if (!elem) {
      return {"x":0,"y":0};
   }
   var xy={"x":elem.offsetLeft,"y":elem.offsetTop}
   var par=getXYpos(elem.offsetParent);
   for (var key in par) {
      xy[key]+=par[key];
   }
   return xy;
}
function mkNode(str) {
   return document.createTextNode(str);
}
function mkElem(type) {
   return document.createElement(type);
}
function getImage(type) {
   var str="data:image/png;base64,";
   switch (type) {
      case "up":
         str+="iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAAK/INwWK"+
               "6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAM1SURBVHja"+
               "rJVPSFRRGMXPa3RqQitNc8w0M4UMhMIyNINQEqIoCgIpWkRB1KY2LYK2bVpNq2gR"+
               "tYogKIrAcBGCYtE/IsNGMUudSjS1sTQdZ+b1u/PeLJJiJuuD83zvm3vP9+/cq2Xr"+
               "jNK0c+AjuPmL1w78dnFGmqTHwSUQAePgYaoNi9IgPSBNXpU+8Drklabu8FKTalOq"+
               "jBuo/pas5x5ljVE2nim/T3Z1q1Swg6+uhRCTVeievO1eVYxK5bBG8fZOSf3TyxXb"+
               "0QL5Tjx9f9OKjdLnB8psz1IVpA2Qbsa7BTTGpQ2fJE9HkfSlRdZZf7rEbBhpVUZH"+
               "viohrYO0EO8KF8WgHt96yK3OcmmiFfLlqYjzpbE2LeosUvkwzYBgJV6vnP7KfTc5"+
               "biPz0iHIH1cxXJO570/ERA23JLIoC0nV8USYhH13RWZAi2WB1aY1NL34Pd9PaqXp"+
               "25B75w+PaNN3WFCtkkE2xBINEdyiGxoBX13CXLDK2aFSEIM8yvw+Ldkj1V7HcyRJ"+
               "7KHOW9KrBvn7KT/q9NGQEkNB2EJLyHTpDVl2kbKndqmEc7LR7X0ZmJuTZt/SxezD"+
               "ZB3mNJ42xEQZ2KesoFQVcbIwRoV6zs8hGhqrvC/lnSABr2aG2zQRrNEkZWwl+hrW"+
               "VZiKZqRnb6QZ/ynIR9k5d1QW0dbQvLVuuYMu6eA6uGoeQXrIFA1+oN3divrb9I6h"+
               "WQwvI+4Mk6UKTZJQLy+FZxgeH16mkht3MjXXDAdNgyWQ1j2F9KB7RyRtPEEe3/5e"+
               "75jgC8uZgcf0n9gZ5uObUcUsTvoaYcEAvhe4+qnP3t6DcPfiCf9G64TPb1KsflQ9"+
               "BdJLy0lozujMPGZduUVRyTCld/G3j7ridSzLbXQ18SdDCgWNitaHFUSX3ZkcRDji"+
               "mUm5LSYSp2CYWmLZZLoJslVNblNSGZdQ0V5F6lv18bVPHuYUzUucIoiXQVaJw5SQ"+
               "w1HIMeV3p3v7I60OVNAs23db0TAlI01lm1ZkuhdAGQPK2c/LU/2t2QEjx2NcIM5V"+
               "g7SSR9pIqRk80kLNDph/WWfn3xUnwV39q9mByzwvJonPg2v6X2YHLvC88lOAAQBN"+
               "vgOffG0doQAAAABJRU5ErkJggg==";
         break;
      case "down":
         str+="iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAAK/INwWK"+
               "6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAM4SURBVHja"+
               "rFRLSFRhFP7unTsjOTVj6ozm+GBSGosKygeWZWEgROIicGObXBqBblq0KVoFrYp2"+
               "EbSIVoZQGEEwYjk2ZLoowyBfNT7HER3JctR59P1z/3BQ06m8cO7/Ouc753zn/L8S"+
               "Q/NtANfxr1/s7sY9peWayqGJcgs79Sktl/m/o8rlDcrVHQCt4/+hmKoJ2/cpDf8B"+
               "Ws1/K8UglhpJ4jBJCVGsj4DMRU6e/yVoOTDfBgRNcUhkQ4mhMQj0WaEFgIiZfo4u"+
               "AXk1PPUkCesCprqgfLTBsACE07l1TFCxQiezgJ3i+AaYPLuAiXaeHkkC1AEE3NA8"+
               "NmSPAFnEMDFALEuO1VUyEAYOcSzmgeaxAn43T4q2ALUBc26o3Q4UTTMMBriPGNoK"+
               "ZPFSgKgRMOr+cZycu/wsAaNA4JXcXf/RcbAdSrcLznGgJAoUcNdE24jgOEUA7yEv"+
               "djpnMSPc4xQlVChkQdVuJyN/yZ30BFAWaLYNytty5PuAssia6znBrFC1xKm4Bxwg"+
               "/xZglKtwvKhAKaMoHGNqneT6A8H95H6G3gdaYXhdjXwql1I5D3pjsTwYF8U/yInx"+
               "sYj7JsmxIXS4CQM9QFooXmfkio4kuIW0+ObL8d38DDFlAuafdcilTjHR8mWkXyn9"+
               "TGSxmJMC0aqNbLdmebr6BPA2IOcTUMEiFsrrw+bDjEhTRpYm6dot12QDXsbnY51j"+
               "pzuA1Fq+H0vaGnXGRuZmxVToAnoHSQHTdEp2hUSkmkGOyyJ1Si83fAw9VtFH0IsC"+
               "dP2VZp+k1lPBizGnbjApozInOBCRKhTRru9pPpJDnZNDbJTzBF34DaauayN6s1Dh"+
               "RD9GWZV3PJ7WXepXV855D9DDxRCrHD01AWScI2ggEUjbpEfpdS/BKzsxHC6CiXas"+
               "BLIksODay8lntnm4kmB2Ealvw/OxVrwNH6vh74L2Jhv7GbYrquc3TNAvmYy8itnl"+
               "niVoz2bG2hZXlrxl1SBc1YVBPlKT03rEP0h0tIyEOGoFIX8y1rZ5ZPoJzlTPuLE4"+
               "ywvCqJHB/rBc4qRjK0M1iRfMy7aoZ+Ov6P1nucLf0+2MtCTf3BfiNkG/aw+SMfgl"+
               "wABiifYXPW0vJQAAAABJRU5ErkJggg==";
   }
   return str;
}

// Stolen from http://www.hunlock.com/blogs/Totally_Pwn_CSS_with_Javascript
function getCSSRule(ruleName,deleteFlag) {
   ruleName=ruleName.toLowerCase();
   if (document.styleSheets) {
      for (var i=0; i<document.styleSheets.length; i++) {
         var styleSheet=document.styleSheets[i];
         var ii=0;
         var cssRule=false;
         do {
            if (styleSheet.cssRules) {
               cssRule = styleSheet.cssRules[ii];
            } else {
               cssRule = styleSheet.rules[ii];
            }
            if (cssRule)  {
               if (cssRule.selectorText.toLowerCase()==ruleName) {
                  if (deleteFlag=='delete') {
                     if (styleSheet.cssRules) {
                        styleSheet.deleteRule(ii);
                     } else {
                        styleSheet.removeRule(ii);
                     }
                     return true;
                  } else {
                     return cssRule;
                  }
               }
            }
            ii++;
         } while (cssRule)
      }
   }
   return false;
}
function killCSSRule(ruleName) {
   return getCSSRule(ruleName,'delete');
}
function addCSSRule(ruleName) {
   if (document.styleSheets) {
      if (!getCSSRule(ruleName)) {
         if (document.styleSheets[0].addRule) {
            document.styleSheets[0].addRule(ruleName, null,0);
         } else {
            document.styleSheets[0].insertRule(ruleName+' { }', 0);
         }
      }
   }
   return getCSSRule(ruleName);
} 