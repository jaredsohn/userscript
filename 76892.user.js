// ==UserScript==

// @name           Kapibados - Login Server

// @namespace      Leon

// @include        http://*kapibados.de/*

// ==/UserScript==



function $(id) {

  return document.getElementById(id);

}



function $x(p, context) {

  if (!context) context = document;

  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);

  return arr;

}



function deserialize(name, def) {

  return eval(GM_getValue(name, (def || '({})')));

}



function serialize(name, val) {

  GM_setValue(name, uneval(val));

}



/////////////////////////////////////////////////////

/////////////////////////////////////////////////////

/////////////////////////////////////////////////////

/////////////////////////////////////////////////////




/http:\/\/s([0-9]*)\./.exec(location.href);

if (RegExp.$1)

{

  var jetzt = new Date();

  var lastServer=deserialize("lastServer35");

  lastServer[RegExp.$1]=jetzt.getTime();

  serialize("lastServer35",lastServer);

}




var lastServer=deserialize("lastServer35");

var date=0;

var server=0;



for (var i in lastServer)

{

  if (lastServer[i]<date || date==0)

  {

    date=lastServer[i];

	server=i;

  }

}




/*
if ($x("/html/body/div[2]/div/form/span[2]/select")[0])

  $x("/html/body/div[2]/div/form/span[2]/select")[0].id="serverlist";

if ($x("/html/body/div[2]/div/form/span[2]/select")[0])

  $x("/html/body/div[2]/div/form/span[2]/select")[0].id="serverlist";

if ($x("/html/body/div[2]/div/div[2]/form/span[2]/select")[0])

  $x("/html/body/div[2]/div/div[2]/form/span[2]/select")[0].id="serverlist";

if ($x("/html/body/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/span/select")[0])

  $x("/html/body/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/span/select")[0].id="serverlist";
*/
if ($x('//select[@class="loginput link"][@name="server"]')[0])

  $x('//select[@class="loginput link"][@name="server"]')[0].id="serverlist";


  

$x('id("serverlist")/option').forEach(function (option) {

  if (option.value=="server"+server)

    option.selected=true;

});