// ==UserScript==
// @name          Test3
// @fullname      Test3
// @author        xxxx
// @include       http://81.90.173.67/slovnik/ajax.php*
// @require       http://userscripts.org/scripts/source/54389.user.js
// @require       http://userscripts.org/scripts/source/53965.user.js
// ==/UserScript==
var local = new Array();
local[0] = 'http://81.90.173.67/slovnik/ajax_get.php?start_table_limit=0&start_row_limit=5';
local[1] = 'http://www.pravidla.cz/hledej.php?qr=';
document.getElementById('start').addEventListener("click", start, true);
document.getElementById('stop').addEventListener("click", stop, true);
function start(){
local[2] = 1;
get_page();
}

function stop(){
local[2] = 0;
}

function get_page(){
if (local[2] == 1){
var tvary = "";
var prevedeno = "";
var req = new HttpRequest();
req.open('get', local[0], function(e)
{
var params = e.responseText.split(";;");
var info = "<table><tr><td>id:</td><td>"+params[0]+"</td></tr>"+"<tr><td>slovo:</td><td>"+params[3]+"</td></tr>"+"<tr><td>url:</td><td>"+params[1]+"</td></tr>"+"<tr><td>tabulka:</td><td>"+params[2]+"</td></tr></table>";
document.getElementById('info').innerHTML = info;

var url = local[1]+params[1];
GM_xmlhttpRequest({ method: 'GET', url: url, overrideMimeType: 'text/plain; charset=windows-1250', onload: function(req) { 
var html = req.responseText;
if(html == "Pravidla.cz<br/>IP adresa je blokovana. Pokud si myslite ze neopravnene, napiste nam.")
{var blok = "blok";}
			var re = new RegExp('eveden na(.*)</p>', 'gim');
			var matches = html.match(re);

if (matches && matches.length) {
				
    prevedeno = "&prevedeno="+matches[0];
} 

			var re = new RegExp('TVARY:</span>(.*)</div>', 'gim');
			var matches = html.match(re);

if (matches && matches.length) {
				
    tvary = "&tvary="+matches[0];
} 



var content = '<div style="height:120px;width:250px;overflow:scroll;">'+req.responseText+'</div>';


document.getElementById('content').innerHTML = content; 
if (blok != "blok"){

      
var data = "id="+params[0]+prevedeno+tvary+"&table="+params[2];

GM_xmlhttpRequest({
  method: "GET",
  url: "http://81.90.173.67/slovnik/ajax_set.php?"+data,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(response) {
     /*****************************odpoved**********************/
document.getElementById('content_set').innerHTML = response.responseText;
next_page();

  }
});
}
  } 
});



});
req.send();
}
}

function next_page(){
window.setTimeout(get_page, 5000);
}

