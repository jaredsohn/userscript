// ==UserScript==
// @name           Amazon_WishList
// @namespace      com.virtait
// @include        http://www.amazon.com/*wishlist*
// ==/UserScript==
function parseQueryString(url)
{
    var params = null;
    try 
    {	
	    var qstr = url.split('?');
	    if (qstr.length>1)
	    {
	        var nvs = qstr[1].split('&');
	        params = new Array();
	        for (i=0; i<nvs.length; i++)
	        {
	            nv = nvs[i].split('=');
	            params[i] = [nv[0], nv[1]];
	        }        
	    }
    }
    catch(err) {}; 
    return params;    
}

function getValue(params, name)
{
    try 
    {
	    for(i=0; i<params.length; i++)
	    {
	        if (params[i][0].toLowerCase()==name.toLowerCase())
	        {
	            return params[i][1];
	        }
	    }
    }
    catch(err) {};
    return null;
}

var argv = parseQueryString(window.location.href);
var percent1 = getValue(argv, 'percent');
var percent = (percent1 ? eval(percent1) : 40);

var items = document.evaluate(
		    '//tbody[@class="itemWrapper"]',
		    document,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
		    
for (i=0; i<items.snapshotLength; i++)
{
	try 
	{
    var nod = document.createElement('div');
    nod.innerHTML = items.snapshotItem(i).innerHTML;

    var title = document.evaluate(
		    '//span[@class="small productTitle"]',
		    nod,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);	
    var title1 = title.snapshotItem(0).textContent;        

    var orgP = document.evaluate(
		    '//span[@class="strikeprice wlProductInfoRow"]',
		    nod,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null);
    var orgP1 = orgP.snapshotItem(0).textContent.replace("$","");

    var curP = document.evaluate(
		    '//span[@class="wlPriceBold"]',
		    nod,
		    null,
		    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		    null); 
    var curP1 = curP.snapshotItem(0).textContent.replace("$","");    

    var save = eval("Math.round((1-"+curP1+"/"+orgP1+")*100)"); 

    var htm = "";
 
    if (save>=percent)
    {
        htm = "<tr><td></td><td colspan='4' style='font-size:18px; font-weight: bold; color: Red; text-decoration: blink; background-color: Silver;'>Save " + save +"%</td></tr><tr><td colspan='5' style='height:4px;'></td></tr>";
    }
    else 
    {
        htm = "<tr><td></td><td colspan='4' style='font-size:18px; font-weight: bold; color: Blue; background-color: Silver;'>Save " + save +"%</td></tr><tr><td colspan='5' style='height:4px;'></td></tr>";
    }
    var cnode = items.snapshotItem(i);
    cnode.innerHTML = htm+cnode.innerHTML;
  }
  catch (err) {}  
}		    
