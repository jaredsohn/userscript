// ==UserScript==
// @name           Kertbirodalom seged
// @autor          Koponya
// @namespace      Kertbirodalom
// @include        http://s*.kertbirodalom.*/main.php?page=garden
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
				res=confirm("Betakarí­tasz mindent?");
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
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5] != 'unkraut_04.gif') && ";//ha nem gaz
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5] != 'steine_04.gif') && ";//ha nem kĹ?
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5] != 'baumstumpf_04.gif') && ";//ha nem fatörzs
				js += "(top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].split('/')[5] != 'maulwurf_04.gif')";//ha nem vakond
				if(document.getElementById("bedientext").innerHTML == "Betakarítás")/////////////////////////////////////////////////////////////////ha betakarítás akkor 
					js += " && (top.garten.document.getElementById('f" + i + "').style.background.split('(')[1].split(')')[0].substr(-6) == '04.gif')";//ĂŠrett-e
				js += ") ";
				js += "top.cache_me(" + i + ", top.garten.garten_prod[" + i + "], top.garten.garten_kategorie[" + i + "] );";//akkor katt rĂĄ :)

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
    	
        var tamaĂąo = medidas();
        gz_style.nodeValue = "position:absolute;z-index:1;width:45px;height:45px;" + tamaĂąo + "background:url('http://img42.imageshack.us/img42/3046/kannenzwerg.gif') top left no-repeat;";
    	    
	    gz_class.nodeValue = "link";
	    gz.setAttributeNode(gz_style);
	    gz.setAttributeNode(gz_class);
	    _eventPanel = gz;
	    document.getElementsByTagName("body")[0].appendChild(gz);
	    _eventPanel.addEventListener( "click", Alles, true );
    	
    }	
   
    function medidas()
    {
        var dimensiones = "top:680px;right:0px;"
	    //Seleccionar resolucion
	    var height=0; var width=0;
        // for NN4 and IE4
        if (self.screen) 
        {     
            width = screen.width;
            height = screen.height
            var widthVentana = window.innerWidth;
            var heightVentana = window.innerHeight;
            widthVentana = (widthVentana / width) * 730 ;
	        dimensiones = "top:805px;left:" + (window.innerWidth/2 + 160) + "px;";
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
	window.setTimeout(function() { startScript(); }, "300");
	window.setTimeout(function() { run(); }, "400");
}
)();