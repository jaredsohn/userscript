// ==UserScript==
// @name           Kertbirodalom seged
// @autor          Koponya
// @namespace      Kertbirodalom
// @include        http://s*.kertbirodalom.hu/main.php?page=garden
// ==/UserScript==
(
function() 
{
	function Alles() 
	{
	    var producto;
		var res = "ures";
		try
		{
			producto = getInnerHTML(obtener('SPAN'));
		}
		catch(e)
		{
			if(document.getElementById("bedientext").innerHTML == "Betakarítás")
				res=confirm("Betakarítasz mindent?");
			else if(document.getElementById("bedientext").innerHTML == "Öntözés")
				res=confirm("Meglocsolsz mindent?");
			else res=false;
		}
		if((res == "ures") && (producto != "Ez a polc üres"))
			res=confirm("Üres területek bevetése ezzel: " +producto+ "?");
		
	    
        if (res==true)
        {
		    var i;
		    for(i=1; i<=204; i++) 
		    {
		        var js = "javascript: ";
				js += "if(";
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5].split('\\\'')[0].split('\\\"')[0] != 'unkraut_04.gif') && ";//ha nem gaz
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5].split('\\\'')[0].split('\\\"')[0] != 'steine_04.gif') && ";//ha nem kő
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5].split('\\\'')[0].split('\\\"')[0] != 'baumstumpf_04.gif') && ";//ha nem fatörzs
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5].split('\\\'')[0].split('\\\"')[0] != 'maulwurf_04.gif')";//ha nem vakond
				if(document.getElementById("bedientext").innerHTML == "Betakarítás")/////////////////////////////////////////////////////////////////ha betakarítás akkor 
					js += " && (top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].substr(-6) == '04.gif')";//érett-e
				js += ") ";
				js += "top.cache_me(" + i + ", top.garten.garten_prod[" + i + "], top.garten.garten_kategorie[" + i + "] );";//akkor katt rá :)

			    location.href = js;
		    }
		}
	}
	
	function obtener(searchClass,node,tag)
    {
	    var classElements = new Array();
	    if (node == null)
		    node = document;
	    if (tag == null)
		    tag = '*';
	    var els = node.getElementsByTagName(searchClass);
	    var elsLen = els.length;
	    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	    var j = 0;
	    for (i = 0; i < elsLen; i++) 
	    {
		    if (els[i].innerHTML.substring(0,3) == "<b>") 
		    {
			    classElements[j] = els[i];
			    j++;
		    }
	    }
	    return classElements;
    }
		
	function obtenerTodo(searchClass,node,tag)
    {
	    var classElements = new Array();
	    if (node == null)
		    node = document;
	    if (tag == null)
		    tag = '*';
	    var els = node.getElementsByTagName(searchClass);
	    var elsLen = els.length;
	    var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	    var j = 0;
	    for (i = 0; i < elsLen; i++) 
	    {
		    classElements[j] = els[i];
		    j++;
	    }
	    return classElements;
    }
	
    function getInnerHTML(elements)
    {
        var elsLen = elements.length;
        return elements[elsLen-1].innerHTML.replace("<b>","").replace("</b>","");
    }
	
    function random(a,b)	
    {
	    return Math.random()-Math.random()
    }
	
    function startScript() 
    {
        //alert(getInnerHTML(obtenerTodo('SPAN',parent.frames[1])));
        gz = document.createElement("span");
	    var gz_style = document.createAttribute("style");
	    var gz_class = document.createAttribute("class");
    	
        var tamano = medidas();
        gz_style.nodeValue = "position:absolute;z-index:1;width:45px;height:45px;" + tamano + "background:url('"+gzImg+"') top left no-repeat;";
    	    
	    gz_class.nodeValue = "link";
	    gz.setAttributeNode(gz_style);
	    gz.setAttributeNode(gz_class);
	    _eventPanel = gz;
	    document.getElementsByTagName("body")[0].appendChild(gz);
	    _eventPanel.addEventListener( "click", Alles, true );
	    _eventPanel.addEventListener( "mousedown", Settings, true );
    }	
   
    function medidas()
    {
	    var height=650; var width=0;
        if(document.getElementById("upsimtoolbar")) height += 30;
		if((document.getElementById("contentwrapper").getElementsByTagName("div")[0].style.height) == "250px") height += 125;
		//setTimeout("alert(top.verkauframe.document.getElementById('helfer_all').getElementsByTagName('span').length);",1000);
		// for NN4 and IE4
        if (self.screen) 
        {     
            width = screen.width;
            //height = screen.height
            var widthVentana = window.innerWidth;
            var heightVentana = window.innerHeight;
            widthVentana = (widthVentana / width) * 730 ;
	        dimensiones = "top:"+height+"px;left:" + (window.innerWidth/2 + 171) + "px;";
        }

        return dimensiones;
    }
	
	function run()
	{
		setTimeout(run,300);
		if(document.getElementById('stadt').style.display != 'none') gz.style.display = "none";
		else gz.style.display = "block";
	}
	var gz;
	var gzImg = "data:image/gif;base64,R0lGODlhGQAtAPcAADhFCBAeHlVaAEVPA19jBAcOHktRXj9BRTkwK0RJUzQsKV1hAnV4fE5WAVhlHTs7PTQ4PxcNBSs7D1pfACwvNGNsfEM+PRoqGTE1PGt0h0pKSl9gYiogGUVERQcKA6ODezc8RV9nDVBQU2xuc2BjZYGHk1dfbqaorBYZEQsXCx4UBSokI3FhXzEzM01NTmdxfoVuaFtkdHB4iScqLFhXWHl6fWhxhHyGmFBWZIxzbJZ6chMiE0k8Nzs0MkpOU5l8dmJdXUdOWkdkQG13ij9FUGZORFJVWnpgWEo2JkpBQ3plYGBlBzMqI3JcVnF7jkM4NXR9kmNRTVRTUZqAeUpMT2ZpbYGEi0MtDXV2eTstI2pzhZWDf3diXFxUTsCdk1pIQlxcXVNaaUJHSVlMR1Vda7aVjEQ2MldIRDUnEp+pvE0+OYRqYyIVEzdiYmpdTzBFUV5rdpSapmteWk9lLsaimZF3cId1cMi3tNSupGJYVZmitIJ+fL/G0U1EOCQYB0ZWZigZAlFGSG96gDcjBlJDPz08M4mPm3pvbXZ0c317dlZfIV1MRmNlaIKMoIhuZ4NmXFk4SUI1PEJjT2xYU/DCtVFaZ4h9e5+AdjA6Kr29wTpFVGpWT0lNSomRoEtGS1tQP6GQjUlOWJ6mtZyIg4+HfS5jio6SmFNca11hbLe5vdClmU1IRxkjMnlpYruakZyfpHZhXDIlI4iKjf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAALMALAAAAAAZAC0AAAj/AGcJHEiwoMGDCAUKSMiQIAACDRsGGLAgIsMAAARUtGiwAMYGEyByJFjggoQBAkSOnOXxAoABDRaotFjAo4SXDVI6GNnyJsoJC5bwDOAzp8wQQmgSfSlA45IQDnZGDOASpoCQUOcknQoA5wSsDrSWaniB1YweFpJ4SqDpjSIHbdo0pKCgyJE1OXR8+HBJB4s3khq2QMDikJ0fH8p4oYNH1Zg/DQ/0kAOEgaXEoE5kumMhIg0FCBSY6VJnChAgW0Y9iLhhhQIeHBBwUYIASZEmGiI+QMDji5oVhKIo+NKEy4iILcwcgQHryaY1k2C4qsMgoogVjxwleRAIjB06lPKc/7BIAcEqMZEgicDiRYkPjh1aHHjgQwQVRhvEWOFI5YCLAyRUAQYJI2zwikUcaOCCER0wwEAVJFhRgxQWeTADDS48wEANI4ggCyc7VJhCBxp0UAMWNGxAggchRpRCCjtYIMUeiGhgAQoodEFKRAhgggIbESgQCxtPRMDED1NswdAZMOjAgUBjyCFQImrkkEMUS7LwgxsEVVBdK1nwsAhDGJCBikAjkFGBAUGYIlAWHKiAUAQgdJZAKC9kYAAFFdgwUCEeRIBGQUyo0AMFs/ggyAsVQACHDVq8MFAEfgwqkAqADHKFQDMEAUcMRJiQQQZD+ClQH1wS9MkVSAyUQCUGGF8whBONQKHFSrMQgUMGN6SRhhMl4IqBCUPIcAMUNwS7EgUJxFCBDDLEgANBJxgSGQREGIDDKSaAgAEIEBihRwlxNPRtAgaEYUACB0AAwQF8iFJuQwkEEcZBqXSCK0MBAQA7";
	window.setTimeout(function() { startScript(); }, "500");
	window.setTimeout(function() { run(); }, "600");
}
)();