// ==UserScript==
// @name           Wurzelimperium - AutoEinkauf
// @namespace      Woems
// @include        http://s*.wurzelimperium.de*
// ==/UserScript==

/******** BASE FUNCTIONS ********/
function $(ID) {return document.getElementById(ID)}
function $xs(xpath, rootdir) {return document.evaluate(xpath, rootdir || document, null, 9, null).singleNodeValue;}
function $x(p, context) {
  var i, arr = [], xpr = document.evaluate(p, context || document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}
function loop(xpath, func, rootdir) {
	xpath = document.evaluate(xpath, rootdir || document, null, 6, null);
	var I = xpath.snapshotLength;
	while(--I>=0) func(xpath.snapshotItem(I));
}
function createElement(type, attributes, append){
  var node = document.createElement(type);
  for (var attr in attributes) if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
  if (append) append.appendChild(node);
  return node;
} // Example usage: var styles = createElement('link', {rel: 'stylesheet', type: 'text/css', href: basedir + 'style.css'});
function remove(node) {if(node)node.parentNode.removeChild(node);return remove;}
function Interval(func, interval) { func(); window.setInterval(func,interval); }
function Timeout(func, interval) { window.setTimeout(func,interval); }  // Timeout(function () {},1000);
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
function onClick(button,func,type) { button.addEventListener(type || "click",function(event){ func(event.target,event); event.stopPropagation(); event.preventDefault(); }, true); }
//GM_log=function (){}
/********************************/

var loc=document.location.toString().match(/http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/);

var sites=deserialize("sites",{});
//var sites={};
if (!sites[loc[2]])
  sites[loc[2]]=prompt(loc[2],loc[2]);
serialize("sites",sites);

switch (loc[2]) {
  case "verkauf" : do_wimpl_verkaufliste(); break;
  case "stadt/markt" : do_ankauf(); break;
  default: break;
}

function dump(obj)
{
  var variablen="";
  var objekte="";
  var functionen="";
  if (typeof obj!="object") return obj;
  for (i in obj)
    switch (typeof obj[i])
    {
      case "function":
        functionen+=""+obj[i]+"\n\n";
        break;
      case "object":
        var tmp="";
        try {
        for (j in obj[i])
          switch (typeof obj[i][j])
          {
            case "function":
              tmp+=j+": function () { ... },\n";
              break;
           case "object":
              tmp+="  "+j+": { ... },\n";
              break;
           case "string":
              tmp+=j+": '"+obj[i][j]+"',\n";
              break;
           case "number":
           case "boolean":
              tmp+=j+": "+obj[i][j]+",\n";
              break;
          }
        } catch(e) { tmp="..."; };
        objekte+="var "+i+" = {\n"+tmp+"}\n\n";
        break;
      case "string":
        variablen+="var "+i+" = '"+obj[i]+"'\n\n";
        break;
      case "number":
      case "boolean":
        variablen+="var "+i+" = "+obj[i]+"\n\n";
        break;
      default:
        //GM_log("Error: " +typeof obj[i]+" - "+obj[i]);
        break;
    }
  return variablen+objekte+functionen;
}

//GM_log("Name: "+unsafeWindow.rackElement[15].name+" "+loc[2]);

function do_wimpl_verkaufliste()
{
  var KundenID=$xs("//input[@name='kunde']").value;
  $x("/html/body/div[2]/div").forEach(function (line) {
    //GM_log(line.textContent);
    //GM_log(uneval(line.textContent.match(/([0-9]*)x (.*?) *$/)));
    var zutat=line.textContent.match(/([0-9]*)x (.*?) *$/);
    var einkauf=deserialize(loc[1]+"einkauf",{});
    if (!einkauf[KundenID]) einkauf[KundenID]=new Object();
    einkauf[KundenID][zutat[2]]=zutat[1]*1;
    //var einkauf={};
    serialize(loc[1]+"einkauf",einkauf);
  });
    //var einkauf=deserialize(loc[1]+"einkauf",{}); GM_log(uneval(einkauf));
  $x("//input[@name='verkauf_ja'] | //input[@name='verkauf_nein']").forEach(function (button) {
    button.addEventListener("click",function(event){
/*
      var einkauf=deserialize(loc[1]+"einkauf",{});
      var tmp=new Object();
      for (i in einkauf)
        if (i!=KundenID)
          tmp[KundenID]=einkauf[KundenID];
        //else alert("Kunde "+KundenID+" gelöscht");
      serialize(loc[1]+"einkauf",tmp);
      //event.stopPropagation(); event.preventDefault();
*/
      var einkauf=deserialize(loc[1]+"einkauf",{});
    }, true);
  });
  alert(dump(einkauf));
  serialize(loc[1]+"einkauf",{});
  /*
  l=0; for (var i in einkauf) l++;
  var styles = createElement('input', {className: 'msg_input link', type: 'submit', style: 'width: 40px; margin-left: 10px;', value: l+'reset', name: 'wimpl_reset', id: 'wimpl_reset' },$xs("//span[input]"));
  onClick(styles, function (f) {
    serialize(loc[1]+"einkauf",{});
  });
  /*
  var z="";
  for (i in unsafeWindow.parent.parent)
  try {
    if (unsafeWindow.parent.parent[i] && typeof unsafeWindow.parent.parent[i]=="object" && unsafeWindow.parent.parent[i].window) //&& m[i].getElementById('helfer_all'))
      z+=i+"\n";
  } catch(e) { alert(i+" Error:\n"+e); }
      alert(z);
  GM_log(dump(unsafeWindow.parent.parent));
  //GM_log(unsafeWindow.parent.parent.verkauf.document.getElementById('helfer_all').innerHTMl);
  */
}

function do_ankauf()
{
  if (document.location.search=="") // Produkte kaufen
  {
    $x("//input").forEach(function (f) { GM_log(f.name+"="+f.value); });
    var Angebot=$xs("/html/body/div[@id='angebot_kaufen']/table/tbody/tr[3]/td").textContent.match(/Angeboten wird (.*)x (.*) für (.*) wT\/St.ck\./);
    // 1=Anz 2=Name 3=Preis
    //GM_log(uneval(Angebot));
    //var PflanzenID=$xs("//input[@name='v']").value;
    //GM_log(uneval(unsafeWindow.parent.parent.rackElement[15]));
    //GM_log(unsafeWindow.parent.parent.rackElement[15].name);
    var inputMenge=$xs("//input[@name='buy_menge']");
    var vorhandeneMenge=0;
    var benoetigteMenge=0;
    var einkauf=deserialize(loc[1]+"einkauf",{});
    for (i in einkauf)
      benoetigteMenge+=(einkauf[i][Angebot[2]]*1 || 0);
    unsafeWindow.parent.parent.rackElement.forEach(function (f) {
      if (Angebot[2]==f.name)
        vorhandeneMenge=f.number;
    });
    //alert("Benötigt: "+ benoetigteMenge+"\nVorhanden: "+vorhandeneMenge);
    var zukaufen=benoetigteMenge-vorhandeneMenge;
    inputMenge.value=(zukaufen<=0)? 0 : (zukaufen > inputMenge.value*1)? inputMenge.value: zukaufen;
    inputMenge.style.backgroundColor=(zukaufen<=0)? "red" : (zukaufen > inputMenge.value*1)? "lightblue": "lightgreen";
  }
}
