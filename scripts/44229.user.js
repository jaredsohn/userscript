// ==UserScript==
// @name           Wurzelimperium - Select Login Server (nach Zeit)
// @namespace      Woems
// @include        http://*wurzelimperium.de/*
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
function Timeout(func, interval) { window.setTimeout(func,interval); } // Timeout(function (){},1000);
function deserialize(name, def) { return eval(GM_getValue(name, (def || '({})'))); }
function serialize(name, val) { GM_setValue(name, uneval(val)); }
/********************************/

function fill(text,len,fillchar)
{
  var ret="";
  for (var i=0; i<len-text.length; i++)
    ret=ret+(fillchar||"0");
  return ret+text;
}

function date2text(date)
{
  var last=new Date(date*1000);
	return last.getDate() + "." + last.getMonth() + "." + last.getFullYear() + " " + last.getHours() + ":" + fill(last.getMinutes()+"",2) + "." + fill(last.getSeconds()+"",2);
}

function compareText (opt1, opt2) {
// not case sensitive
return opt1.text.toLowerCase() < opt2.text.toLowerCase() ? -1 :
opt1.text.toLowerCase() > opt2.text.toLowerCase() ? 1 : 0;
}

function compareTextCaseSensitive (opt1, opt2) {
// case sensitive
return opt1.text < opt2.text ? -1 :
opt1.text > opt2.text ? 1 : 0;
}

function compareAktiveFirst (opt1, opt2) {
  var lastServer=deserialize("zeit");
  if (lastServer[opt1.value.replace(/server/,"")])
    return -1;
  if (lastServer[opt2.value.replace(/server/,"")])
    return 1;
  var v1=opt1.value.replace(/server/,"")*1;
  var v2=opt2.value.replace(/server/,"")*1;
  return v1 < v2 ? -1 :
         v1 > v2 ? 1 : 0;
}


function SortListBox (pListBox, compareFunction) {
if (!compareFunction)
compareFunction = compareText;
var options = new Array (pListBox.options.length);
for (var i = 0; i < options.length; i++)
options[i] =
new Option (
pListBox.options[i].text,
pListBox.options[i].value,
pListBox.options[i].defaultSelected,
pListBox.options[i].selected
);
options.sort(compareFunction);
pListBox.options.length = 0;
for (var i = 0; i < options.length; i++)
pListBox.options[i] = options[i];
}

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var loc = document.location; 
var reg = /http:\/\/s(.*?)\.wurzelimperium\.de\/(.*?)\.php/i;
if (reg.exec(loc))
{
  var server = reg.exec(loc)[1];
  var page = reg.exec(loc)[2];
} else {
  var server = "";
  var page = "";
}

switch (page) {
case "" : do_login();break;
case "main"	  : do_main();break;
case "garten_map" : do_garten_map(); window.addEventListener('unload',function () { do_garten_map(); }, true); break;
case "verkauf_map": do_verkauf_map();break;
}

function do_verkauf_map()
{

}

function do_garten_map()
{
  //window.setInterval(function (){
   window.addEventListener('unload',function () {
    var lasttime = 9999999999;
    unsafeWindow.garten_zeit.forEach(function (z) {
      if (lasttime > z && z!=0)
        lasttime=z;
    });
    if (lasttime == 9999999999)
      lasttime=Math.round((new Date()).getTime()/1000).toString();
    var Serverzeit=deserialize("zeit");
    Serverzeit[server]=lasttime;
    serialize("zeit",Serverzeit);
    var diff=lasttime*1000-(new Date()).getTime();
    //GM_log("LastTime: "+lasttime*1000+"\nJetzt: "+(new Date()).getTime()+"Diff: "+diff);
    /*
    if (diff>5000)
      window.setTimeout(function () {
        alert("ACHTUNG");
      },diff+100000);
      */
  //},10000);
    }, true)
/*
  var lasttime = 9999999999;
  src=document.getElementsByTagName('SCRIPT')[0].innerHTML;
  regex=/garten_zeit\[([0-9]*)\] = ([0-9]*)/g;
  var Gartenzeiten=src.match(regex);
  for(var i=0 ;i< Gartenzeiten.length;i++){
  	Zeit=regex.exec(Gartenzeiten);
	  if (lasttime > 	Zeit[2] && Zeit[2]!=0)
      lasttime=Zeit[2];
  }
  var jetzt = new Date();
  if (lasttime == 9999999999)
    lasttime=Math.round(jetzt.getTime()/1000).toString();
  var Serverzeit=deserialize("zeit");
  Serverzeit[server]=lasttime;
  //GM_log(uneval(Serverzeit));
  serialize("zeit",Serverzeit);
*/  
  
  /*
  window.addEventListener('unload',function () {
    var lasttime = 9999999999;
    src=document.getElementsByTagName('SCRIPT')[0].innerHTML;
    regex=/garten_zeit\[([0-9]*)\] = ([0-9]*)/g;
    var Gartenzeiten=src.match(regex);
    for(var i=0 ;i< Gartenzeiten.length;i++){
  	Zeit=regex.exec(Gartenzeiten);
	  if (lasttime > Zeit[2] && Zeit[2]!=0)
      lasttime=Zeit[2];
    }
    var jetzt = new Date();
    if (lasttime == 9999999999)
      lasttime=Math.round(jetzt.getTime()/1000).toString();
    var Serverzeit=deserialize("zeit");
    Serverzeit[server]=lasttime;
    //GM_log(uneval(Serverzeit));
    serialize("zeit",Serverzeit);
  }, true)
  */
}

function do_main()
{
    //window.setInterval(function () {
  var jetzt = new Date();
  var lastServer=deserialize("last");
  lastServer[server]=jetzt.getTime();
  serialize("last",lastServer);
  
  var Serverzeit=deserialize("zeit");
  var ausgabe="";
  for(var i in Serverzeit)
  {
    var format=["", ""];
    if (i==server) { format[0]="<b>"+format[0]; format[1]=format[1]+"</b>"; }
    if (Serverzeit[i]<jetzt.getTime()/1000) { format[0]="<font color=red>"+format[0]; format[1]=format[1]+"</font>"; }
    ausgabe+=format[0]+"Server "+i+": "+date2text(Serverzeit[i])+format[1]+"<br>";
  }
  //alert(ausgabe.split("<br>").join("\n"));
  if ($("ServerListByTime"))
    $("ServerListByTime").innerHTML=ausgabe;
  else
  {
    var div = createElement('div', {'id': 'ServerListByTime', 'style': 'text-align:left;border: 2px solid black; position:absolute; top:2px; left:2px; padding:5px; z-index:1; background-color:darkgreen; color:white;'}, document.body);
    div.innerHTML=ausgabe;
  }
    //},10000);
}

function do_login()
{
  // Server, der am laengsten nicht benutzt wurde, suchen
  var lastServer=deserialize("zeit");
  var date=0;
  var server=0;
  //GM_log(uneval(lastServer));
  for (var i in lastServer)
  {
    if (lastServer[i]<date || date==0)
    {
      date=lastServer[i];
	    server=i;
    }
  }

  // ID fuer das Auswahlmenue der Server setzen
  if ($x('//select[@class="loginput link"][@name="server"]')[0])
    $x('//select[@class="loginput link"][@name="server"]')[0].id="serverlist";

  // Server auswaehlen
  $x('id("serverlist")/option').forEach(function (option) {
    if (option.value=="server"+server)
      option.selected=true;
  });
  SortListBox($('serverlist'), compareAktiveFirst);
}


/*
<head>
</head>
<body>
<script language='JavaScript' type='text/javascript'>
function compareText (opt1, opt2) {
// not case sensitive
return opt1.text.toLowerCase() < opt2.text.toLowerCase() ? -1 :
opt1.text.toLowerCase() > opt2.text.toLowerCase() ? 1 : 0;
}

function compareTextCaseSensitive (opt1, opt2) {
// case sensitive
return opt1.text < opt2.text ? -1 :
opt1.text > opt2.text ? 1 : 0;
}

function SortListBox (pListBox, compareFunction) {
if (!compareFunction)
compareFunction = compareText;
var options = new Array (pListBox.options.length);
for (var i = 0; i < options.length; i++)
options[i] =
new Option (
pListBox.options[i].text,
pListBox.options[i].value,
pListBox.options[i].defaultSelected,
pListBox.options[i].selected
);
options.sort(compareFunction);
pListBox.options.length = 0;
for (var i = 0; i < options.length; i++)
pListBox.options[i] = options[i];
}
</script>
<form name='Form1' method='post'>

<select name='ListBox1' size='10' id='ListBox1' >
<option value='Wigan'>Wigan</option>
<option value='David'>David</option>
<option value='Lancashire'>Lancashire</option>
<option value='Michelle'>Michelle</option>
<option value='Hilda'>Hilda</option>
<option value='Ron'>Ron</option>
<option value='Jack'>Jack</option>
<option value='Anthony'>Anthony</option>
<option value='albert'>albert</option>
</select>
<INPUT TYPE='button' VALUE='sort' onClick='SortListBox(document.Form1.ListBox1, compareText)' >
</form>
</body>
</html> 
*/
