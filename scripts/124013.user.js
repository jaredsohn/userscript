// ==UserScript==
// @name           unwatchedNumber
// @namespace      kra
// @include        *followmy.tv/show_list
// @include        *followmy.tv/dashboard
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head').item(0);
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.numbers { float:left; text-align:center;background:#fff;color:#666;padding:0px 3px;border-radius:3px;margin:0px 0px 0px 4px;font-size:0.7em;border:1px solid #ccc; }');

wait();

function wait() {

	if(document.getElementById("db-items"))
	{
	show = document.getElementById('db-items');
	}
	if(document.getElementById("episodes"))
	{
	show = document.getElementById('episodes');
	};
    
    check = show.getElementsByTagName("div").item(0).innerHTML;
    if (check == "Loading your data...") {
    	    setTimeout(wait,200); 
    } else {
            ready();           
    }
  }

function ready() {

if(document.getElementById("db-items"))
{
var divi = document.getElementById('db-items');
}
if(document.getElementById("episodes"))
{
var divi = document.getElementById('episodes'); 
};

var aNodeList = divi.getElementsByTagName("a");

for( var i = 0; i < aNodeList.length; i++ ) { 
	if (aNodeList[i].href.indexOf("/shows/") != -1){
	
		GM_xmlhttpRequest({
			method: 'get',
			url: aNodeList[i].href,
			onload: function (i) {return function(result) { 
			
					unwatched = result.responseText.match(/<span class="cnt">(.*)<\/span>/);
					
					numbers = document.createElement("div");
					numbers.className = 'numbers';
					numbers.innerHTML = unwatched[1];
					aNodeList[i].parentNode.insertBefore(numbers, aNodeList[i].nextSibling);
			
			}}(i)
		});
	}
}

}