// ==UserScript==
// @name            Runescape Utility
// @author          HerBrightSkies//JP
// @namespace       http://bootme.hopto.org/
// @description     A all-in-one utility for runescape.
// @license         Creative Commons Attribution License
// @version	        0.0.2
// @include         http://*.runescape.com/*
// @released        2009-04-17
// @updated         2009-04-17
// @compatible      Greasemonkey
// ==/UserScript==

function addCss(cssCode) {
var styleElement = document.createElement("style");
  styleElement.type = "text/css";
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = cssCode;
  } else {
    styleElement.appendChild(document.createTextNode(cssCode));
  }
  document.getElementsByTagName("head")[0].appendChild(styleElement);
}
function search2(item) {
//0 image
//1 name
//2 URL
//3 Price
//4 Change
var itempic = document.getElementById('itempic');
var name = document.getElementById('name');
var price = document.getElementById('price');
itempic.innerHTML = '<a href="'+item[0][2]+'"><img src="'+item[0][0]+'"/></a>';
name.innerHTML = item[0][1];
price.innerHTML = item[0][3]+' ('+item[0][4]+')';
}
function startsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
}
function endsWith(str, suffix) {
    return str.match(suffix+"$")==suffix;
}

function replaceAll(Source,stringToFind,stringToReplace){
  var temp = Source;
    var index = temp.indexOf(stringToFind);
        while(index != -1){
            temp = temp.replace(stringToFind,stringToReplace);
            index = temp.indexOf(stringToFind);
        }
        return temp;
}


function search() {
var param = document.getElementById('sb').value;
price(param);
}
function rs() {
var menu = document.getElementById('menubox');
menu.innerHTML="";
var ads = document.getElementById("tb");
if(ads!=null)
ads.style.display="none";
var frame = document.createElement('iframe');
menu.style.border="0";
menu.style.height="40px";
menu.width="100%";
frame.style.width="100%";
menu.style.padding="0";
menu.style.margin="0";
menu.style.borderSpacing="0";

frame.style.border="0";
frame.style.height="40px";
frame.style.width="100%";
frame.style.padding="0";
frame.style.margin="0";
frame.style.overflow="hidden";
frame.src="http://services.runescape.com/m=itemdb_rs/utility.php?";
menu.appendChild(frame);
}

function utility() {
document.body.style.margin="0";
document.body.style.padding="0";
document.body.innerHTML="<center><div id=menubox></div></center>";
var menu = document.getElementById("menubox");
menu.innerHTML='';
var toolbar = document.createElement('table');
var tooltr = document.createElement('tr');
var searchtd = document.createElement('td');
addCss('table,td,tr {padding:0;margin:0;border:0;border-spacing:0;border-collapse:collapse;}');
menu.appendChild(toolbar);
toolbar.appendChild(tooltr);
var sb = document.createElement('input');

sb.setAttribute('type', 'input');
sb.style.background="url(http://i39.tinypic.com/2z9cke1.jpg)";
sb.style.height="27";
sb.style.width="150";
sb.style.color = "#f0cd87";
sb.style.padding = "5";
sb.setAttribute("id","sb");
sb.style.marginTop="6px";
menu.style.height="40px";
menu.style.background = "url(http://i44.tinypic.com/axjjw8.png)";
sb.style.border="none";
tooltr.appendChild(searchtd);
searchtd.appendChild(sb);
var searchbutton = document.createElement('button');
searchbutton.setAttribute("id", "searchbutton")
addCss("button#searchbutton{background: url(http://i44.tinypic.com/2rmqfr5.jpg) top center no-repeat;margin-left:3px;border:none;height:33px;width:35px;} button#searchbutton:hover{background-image:url(http://i44.tinypic.com/m7dm2r.jpg);}button#searchbutton:active{background-image: url(http://i40.tinypic.com/30288w7.png);");
addCss("#menubox td {color:#D09D00;font: 10pt courier;padding-left:20px;}");
addCss("img {height:32px;border:0;}");
var name = document.createElement('td');
name.setAttribute('id','name')
var itempic = document.createElement('td');
itempic.setAttribute('id','itempic')
var price = document.createElement('td');
price.setAttribute('id','price')

searchtd.appendChild(searchbutton);
itempic.innerHTML = "<img src=\"http://i43.tinypic.com/xcjg9k.gif\"/>";
name.innerHTML = "Brought to you by Rsbot.org, LostPkerz, and Redemption-RS";
price.innerHTML = "Developed by HerBrightSkies";
tooltr.appendChild(itempic);
tooltr.appendChild(name);
tooltr.appendChild(price);
searchbutton.addEventListener('click',function (e) {
 search();
},true);
sb.addEventListener('keypress',function (event) {
if(event.keyCode==13)search();
},true);

var ads = document.getElementById("tb");
if(ads!=null)
ads.style.display="none";
}
function price(query) {

    var ajaxRequest;
    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
        } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
    // Create a function that will receive data sent from the server
    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
var parse = ajaxRequest.responseText;
parse=parse.substring(parse.indexOf("<tbody>")+8);
parse=parse.substring(0,parse.indexOf("</tbody>"));
parse=replaceAll(parse, '<tr class="row_b">', "");
parse=replaceAll(parse, "<tr>", "");
parse=replaceAll(parse, "</tr>", "");
parse=replaceAll(parse, "<td>", "");
parse=replaceAll(parse, "</td>", "");
parse=replaceAll(parse, "\n\n", "\n");
block = parse.split(' relevance">');
var item = new Array(block.length-1);
for (i=0;i<block.length-1;i++) {
item[i] = new Array(5);
var blocktext = block[i];
var line = blocktext.split("\n");
item[i][0] = line[1].substring(10,line[1].indexOf('" alt="')); //Item Image
item[i][1] = line[1].substring(line[1].indexOf('alt="')+5,line[1].length-2); //Item Name
item[i][2] = line[2].substring(9, line[2].indexOf('">')); //Item URL
item[i][3] = line[3]; //Price
item[i][4] = line[4].substring(line[4].indexOf('">')+2, line[4].indexOf('</span')); //Price Change
}
search2(item);
        }
    }
    ajaxRequest.open("GET", "/m=itemdb_rs/results.ws?query="+query, true);
    ajaxRequest.send(null);
}


if(endsWith(location.pathname,"utility.php")) {
utility();
} else if(startsWith(location.hostname, "world")) {
rs();
}
unsafeWindow.zap = function() { }; 

unsafeWindow.unzap = function() { };