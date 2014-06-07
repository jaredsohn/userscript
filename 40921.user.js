// ==UserScript==
// @name           LJtalkAgeHighlight
// @namespace      http://userscripts.org/users/78454
// @description    highlight posts by age in Livejournal
// @include        http://*.livejournal.com/*

// @version        0.1
// @creator        Thomas Shaddack
// @ff_min_version 1.5
// @ff_max_version 3.*
// ==/UserScript==

// Script compiler at http://sorl.net/dev/xpi/

(function() {

var doldest=0;
var dnewest=999999999999;

var dnow=new Date();

function strtodate(s)
{
  var dy=s.substr(0,4);
  var dm=s.substr(5,2);
  var dd=s.substr(8,2);
  var dhm=s.substr(11,8);
  var d=new Date(dm+' '+dd+', '+dy+' '+dhm );
  return d;
}


// return delta time from LJ datetime string and date object, in minutes
function getdeltadate(s,d)
{ var dd=strtodate(s);
  var ddelta=Math.floor((dnow.getTime()-dd.getTime())/60000);
  if(dnewest>ddelta)dnewest=ddelta;
  if(doldest<ddelta)doldest=ddelta;
  return ddelta;
}


function getHex(dec)
{
  var hexArray = new Array( "0", "1", "2", "3",
                            "4", "5", "6", "7",
                            "8", "9", "A", "B",
                            "C", "D", "E", "F" );

  var code1 = (Math.floor(dec / 16)) % 16;
  var code2 = (dec % 16);
  var decToHex = hexArray[code1]+hexArray[code2];
  return (decToHex);
}


// here is the color assignment
// delta is the diff in minutes between current time and date of the post
// min, max are times for newest and oldest post on the page
// newesttime is timespan where absolute-newest post should be highlighted
// Colorizing is done as such:
// for oldest post in range, color 007fff is assigned
// for newest post in range, color ff7f00 is assigned
// red and blue are linearly interpolated between 00..ff and ff..00
// for absolute timing highlight, 00..7f is added to the green 7f,
// linearly interpolated between current time (7f added) to newesttime (0 added)

function getdeltacolor(delta,min,max,newesttime)
{ 
  if(delta>max){cr=0;cg=0;cb=255;}else
  if(delta<min){cr=255;cg=0;cb=0;}else
  if(max==min){cr=255;cg=0;cb=0;}else
  {
   ddelta=delta-min;
   delta1=Math.round((ddelta*255)/(max-min));
   if(delta1>255)delta1=255;
   cr=255-delta1;
   cb=delta1;
   cg=127;
  }
  if(delta<newesttime)cg=cg+128-Math.floor((delta*127)/newesttime);

  return(getHex(cr)+getHex(cg)+getHex(cb));
}


function handledatetag(o,skip)
{ 
  var s=o.innerHTML.substr(o.innerHTML.indexOf("200"));
  var ddelta=getdeltadate(s,dnow);
  var d=strtodate(s);
  if(skip)return; // just finding newest/oldest
  var col=getdeltacolor(ddelta,dnewest,doldest,480);
    var deltam=ddelta%60;if(deltam<10)deltam='0'+deltam;
    var deltah=(Math.floor(ddelta/60))%24;
    var deltad=Math.floor(ddelta/1440);
    var postage="";
    if(deltad>0)postage=deltad+'d';
    postage=postage+deltah+'h'+deltam+'m';
  o.innerHTML='<span style="background-color:#'+col+'" title="'+postage+' ago">'+o.innerHTML+'</span>';
}


var alltags=document.getElementsByTagName('font');
var o;
for(var t=0;t<alltags.length;t++){
  o=alltags[t];
   if(o.size!="-1")continue;
   if(o.innerHTML.indexOf("200") < 0 )continue;
   if(o.innerHTML.indexOf("200") > 2 )continue;
   handledatetag(o,1);
  }

alltags=document.getElementsByTagName('i');
for(var t=0;t<alltags.length;t++){
  o=alltags[t];
   if(o.innerHTML.indexOf("200") < 0 )continue;
   if(o.innerHTML.indexOf("200") > 2 )continue;
   handledatetag(o,1);
  }



alltags=document.getElementsByTagName('font');
for(var t=0;t<alltags.length;t++){
  o=alltags[t];
   if(o.size!="-1")continue;
   if(o.innerHTML.indexOf("200") < 0 )continue;
   if(o.innerHTML.indexOf("200") > 2 )continue;
   handledatetag(o,0);
  }

alltags=document.getElementsByTagName('i');
for(var t=0;t<alltags.length;t++){
  o=alltags[t];
   if(o.innerHTML.indexOf("200") < 0 )continue;
   if(o.innerHTML.indexOf("200") > 2 )continue;
   handledatetag(o,0);
  }

})();
