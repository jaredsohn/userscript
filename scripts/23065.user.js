// ==UserScript==
// @name           Gladiatus Arena
// @namespace      n\a
// @include        *gladiatus.no*mod=arena*
// ==/UserScript==

var stats = new Array();

var ex = ".//a[@title='Oversikt']";
	tag = document.evaluate( 
  	ex,
    	document,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) { 
  ajax2(tag.snapshotItem(0).href, 0)
  }

  		    
function getStats(code, id, num, stat)
{
	var ex = ".//span[@id='"+id+"']";
	tag = document.evaluate( 
  	ex,
    	code,
    	null,
    	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    	null);

	if (tag.snapshotLength) { 
  return(tag.snapshotItem(0).innerHTML)
  
  }
}
function ajax2(url, num)
{
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    stats[num] = new Array();
    stats[num][0] = getStats(pulled, 'char_level');
    stats[num][1] = getStats(pulled, 'char_f1');
    stats[num][2] = getStats(pulled, 'char_f2');
    stats[num][3] = getStats(pulled, 'char_f4');
    stats[num][4] = getStats(pulled, 'char_panzer');
    
    dmg = getStats(pulled, 'char_schaden');
    stats[num][5] = dmg.split('-')[0].replace(/^\s+|\s+$/g, ''); 
    stats[num][6] = dmg.split('-')[1].replace(/^\s+|\s+$/g, '');
    
    div = doSomethingWithClasses("arena_table")[1];
link = new Array();
link[1] = div.childNodes[1].childNodes[1].childNodes[2].childNodes[3].childNodes[0];
link[2] = div.childNodes[1].childNodes[1].childNodes[4].childNodes[3].childNodes[0];
link[3] = div.childNodes[1].childNodes[1].childNodes[6].childNodes[3].childNodes[0];
link[4] = div.childNodes[1].childNodes[1].childNodes[8].childNodes[3].childNodes[0];
 
ajax(link[1].href, '1');
ajax(link[2].href, '2');
ajax(link[3].href, '3');
ajax(link[4].href, '4'); 
}
  		    });

}
function ajax(url, num)
{
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    onload: function(responseDetails) 
    {
	  pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText; 
    stats[num] = new Array();
    stats[num][0] = getStats(pulled, 'char_level');
    stats[num][1] = getStats(pulled, 'char_f1');
    stats[num][2] = getStats(pulled, 'char_f2');
    stats[num][3] = getStats(pulled, 'char_f4');
    stats[num][4] = getStats(pulled, 'char_panzer');
    
    dmg = getStats(pulled, 'char_schaden');
    stats[num][5] = dmg.split('-')[0].replace(/^\s+|\s+$/g, ''); 
    stats[num][6] = dmg.split('-')[1].replace(/^\s+|\s+$/g, ''); 
    if (num > 0)
    {simulate(num);}
    }
  		    });
}

function doSomethingWithClasses(theClass) {
a = 0;
x = new Array();
var allPageTags=document.getElementsByTagName("div");
for (i=0; i<allPageTags.length; i++) {
if (allPageTags[i].className==theClass) {

x[a] = allPageTags[i];
a++;
}
}
return x;
}


function simulate(num)
{
data = "rema=rema&remd=remd&aname=a&dname=d&levela=" + stats[0][0]+"&leveld=" + stats[num][0]+"&skilla=" + stats[0][1]+"&skilld=" + stats[num][1]+"&agilitya=" + stats[0][2]+"&agilityd=" + stats[num][2]+"&charismaa=" + stats[0][3]+"&charismad=" + stats[num][3]+"&armoura=" + stats[0][4]+"&armourd=" + stats[num][4]+"&damagea=" + stats[0][5]+"&damaged=" + stats[num][5]+"&damagema=" + stats[0][6]+"&damagemd=" + stats[num][6]+"&sims=500&submit=Simulate";



    GM_xmlhttpRequest({
    method: "POST",
    url: 'http://www.gladiatustools.com/calc.php',
    headers:{'Content-type':'application/x-www-form-urlencoded'},
    data:encodeURI(data),
    onload: function(responseDetails) 
    {
    pulled = document.createElement('div');
    pulled.innerHTML = responseDetails.responseText;
    if(responseDetails.responseText.search('Winner: a') > 0)
    {
    link[num].innerHTML = link[num].innerHTML + '(' +stats[num][0] + '-Win)';
    }else if(responseDetails.responseText.search('Winner: b') > 0)
    {
    link[num].innerHTML = link[num].innerHTML + '(' +stats[num][0] + '-Lose)';
    }else{
    link[num].innerHTML = link[num].innerHTML + '(' +stats[num][0] + '-Draw)';
    }

                    

    }
  		    });
}
