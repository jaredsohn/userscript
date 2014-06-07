// ==UserScript==
// @name        inflatable switchblade
// @namespace   agentOfChaos
// @description Adds a button linking directly to the current strip's reactions page on sluggy.net
// @include     http://www.sluggy.com/*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==
/*
 * Author: agentOfChaos
 * All the code is GPLv3
 * enjoy!
 */
var $ = unsafeWindow.jQuery;
var basePage;
var base="http://www.sluggy.net/forum/";
var months=["January","February","March","April","May","June","July","August","September","October","November","December"];
var baseURL="http://www.sluggy.net/forum/viewforum.php?f=4&start=";
var interruptSearch=false;
var target="Daily";
var req=new Array(50);
var numreq;
function deltaG( date2, date1 )
{
  //Get 1 day in milliseconds
  var one_day=1000*60*60*24;
  // Convert both dates to milliseconds
  var date1_ms = date1.getTime();
  var date2_ms = date2.getTime();
  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
function arrot(val, notch)
{
  var divis=Math.floor(val/notch);
  return divis*notch;
}
function dateFromSlugURL(url)
{
  var sect=url.split("/");
  var len=sect.length;
  var offset=0;
  var datestr=sect[len-1];
  var ys,ms,ds,year,day,month;
  var date;
  if (len<=6) return new Date(); // homepage: select current date
  if (datestr.length>6)offset=2; // year in 4 digits
  ys=datestr.substr(0+offset,2);
  ms=datestr.substr(2+offset,2);
  ds=datestr.substr(4+offset,2);
  if (ys>=97)
  {
    year="19" + ys;
  }
  else year="20" + ys;
  month=ms-1;
  day=ds;
  date=new Date(year,month,day);
  return date;
}
function getBBpageId(today, stripdate)
{
  var delta=deltaG(today,stripdate);
    console.log("delta: "+delta)
  var coeff=527/3347; // hackish linear error correction
  delta=delta-(coeff*delta);
  return arrot(delta,20);
}
function spiral(num) // maps number set N to Z
{
    if (num%2==0) return num/2;
    else return -((num+1)/2);
}
function find_string(body,it)
{
  if (body.match(it)) return true;
  else return false;
}
function run_search(cont)
{
  var num=spiral(cont);
  var loc=basePage+(num*20);
  var url=baseURL + loc;
  // request page via XMLHTTP
  console.log("Beginning request "+url);
  req[cont]=GM_xmlhttpRequest({
  method: "GET",
  url: url,
  headers: {
    "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
    "Accept": "text/html"            // If not specified, browser defaults will be used.
    },
  onload: function(response) {
    var code=response.responseText;
      console.log("recived response: "+response.status);
      if (find_string(code,target))
      {
          for (var c=0; c<numreq; c++)req[c].abort();
	      interruptSearch=true;
          console.log("found: " + code.substr(0,100) + " ...");
          extract_link(code);
      }
    }
  });
}
function extract_link(code)
{
    console.log("extracting link...");
    var box=document.createElement("div"); // create a dummy html element for processing
    var items;
    var dest;
    box.innerHTML=code;
    items=box.getElementsByTagName("a");
    console.log("elements: "+items.length);
    for (var cont=0; cont<items.length; cont++) // scan every <a> element for target
    {
        if (find_string(items[cont].innerHTML,target))
        {
            console.log("final url: "+items[cont].href);
            dest=items[cont].href.split("/");
            UI_buttonGo(base+dest[dest.length-1]);
            break;
        }
    }
    console.log("done!");
    
}
function loop_search(radius)
{
    var stop=(2*radius)+1;
    var pos;
    numreq=stop;
    for (var cont=0; cont<stop && !interruptSearch; cont++)
    {
	console.log("searching ..." + cont);
       run_search(cont);
    }
}
function UI_buttonWait()
{
    $(".buttons.fg-buttonset").prepend("<a id=\"locutus\" class=\"fg-button fg-button-icon-left ui-corner-all ui-state-default\" href=\"#\"><span class=\"ui-icon ui-icon-help\"></span>Reactions</a>");
}
function UI_buttonGo(link)
{
    $("#locutus").remove();
    $(".buttons.fg-buttonset").prepend("<a target=\"_blank\" id=\"locutus\" class=\"fg-button fg-button-icon-left ui-corner-all ui-state-default\" href=\""+link+"\"><span class=\"ui-icon ui-icon-comment\"></span>Reactions</a>");
}
function UI_buttonVote()
{
    $(".buttons.fg-buttonset").prepend("<a target=\"_blank\" class=\"fg-button fg-button-icon-left ui-corner-all ui-state-default\" href=\"http://topwebcomics.com/vote/14089/default.aspx\"><span class=\"ui-icon ui-icon-help\"></span>Vote!</a>");
}
function UI_navarea_grow()
{
    $("#comic_navigation").css("width","860px");
    $(".fg-buttonset").css("margin-left","50px");
}
function main()
{
  UI_buttonWait();
  UI_buttonVote();
  UI_navarea_grow()
  var today=new Date();
  var url=location.href;
  var comicday=dateFromSlugURL(url);
  var pageID=getBBpageId(today,comicday);
  basePage=pageID;
    target=months[comicday.getMonth()] + " [^,]*\\b" + comicday.getDate() + "\\b[^,]*, " + comicday.getFullYear();
  console.log("target acquired: " + target);
  loop_search(10);
}
main();
