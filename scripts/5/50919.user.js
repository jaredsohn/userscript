// ==UserScript==
// @name           	3dl.am Direktlinks
// @namespace      	*
// @description	        Zeigt die Direktlinks bei Downloads von 3dl.am an !
// @include        	http://*3dl.am/download/*/*/out.html
// ==/UserScript==

function getNewLink(url)
{
	//text=text.replace('ä', '&auml;');
	//erstellen des requests
	var req = null;
	try
	{
    	req = new XMLHttpRequest();
	}
	catch (ms)
	{
		try
		{
    		req = new ActiveXObject('Msxml2.XMLHTTP');
    	}
    	catch (nonms)
		{
    		try
			{
    	    	req = new ActiveXObject('Microsoft.XMLHTTP');
    	  	}
    	  	catch (failed){
    	    	req = null;
    	  	}
		}
	}
  	if (req == null)
    	alert('Error creating request object!');
   
  	req.open('GET', url)
  	
	req.onreadystatechange = function()
	{
    	switch(req.readyState) 
		{
      		case 4:
        		if(req.status!=200) 
				{
          			alert('Fehler:'+req.status);
        		}
				else
				{
          			var nnewurl = "E";
          			tmp=req.responseText;

          			x1 = tmp.split('<frame src="');
          			for(f=1; f<x1.length; f++)
          			{
						x2 = x1[f].split('"');
						if(x2[0].substr(0,5) != '/?act')
						{
							nnewurl = x2[0];
						}
          			}
          			if(nnewurl == '')
          			{
          				nnewurl = "Fehler";
          			}
          
          			newUrls[newUrls.length] = nnewurl;
          			ps = document.getElementsByTagName("input");
          
          			for(k=0; k<ps.length; k++)
		  			{
            			if(ps[k].value == oldUrls[newUrls.length-1])
					{
              			ps[k].parentNode.innerHTML += "<br>" + "<a href='" + newUrls[newUrls.length-1] + "'>" + newUrls[newUrls.length-1] + "</a>";
            		}
          		}
          		document.getElementById("allLinks").value += newUrls[newUrls.length-1]+"\n";
        	}
        	break;
      	default:
        	return false;
        break;     
    	}
  	}
  	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  	req.send(null);
}

abc=1;
newUrls = [];
oldUrls = [];
ps=document.getElementsByTagName("input");
for(i in ps)
{
	if(ps[i].value.search(/\/link\/.+/) > 0)
	{
    	oldUrls[oldUrls.length] = ps[i].value;
    	getNewLink(ps[i].value);
    	abc=i;
  	}
}

ps[abc].parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML += "<br><textarea id='allLinks' onfocus='this.select();' style='width:100%;height:200px'></textarea>"