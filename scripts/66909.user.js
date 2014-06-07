// ==UserScript==
// @name           Auto Molehillempire
// @autor          Peyman
// @email          peymanpn@yahoo.com
// @namespace      Molehillempire
// @include        http://s*.molehillempire.com/main.php?page=garden
// ==/UserScript==
// 
// script based on Automolehill empire spanish script by rafa_kan
//
(
function() 
{
	function Alles() 
	{
	    var producto = getInnerHTML(obtener('SPAN'));
	    res=confirm("Are you sure you want to plant it all with " + producto.toLowerCase()  + "?");
	    
        if (res==true)
        {
		    var iArr = randArray(1, 204);
		    var i;
		    //location.href = "javascript: top.selectMode(2,true,top.selected);";
		    for(i=0; i<=203; i++) 
		    {
		        //He says he does not see a time that is between them in planting
			    //window.setTimeout(location.href = "javascript: top.cache_me(" + iArr[i] + ", top.garten.garten_prod[" + iArr[i] + "], top.garten.garten_kategorie[" + iArr[i] + "] );","10000");
			    location.href = "javascript: top.cache_me(" + iArr[i] + ", top.garten.garten_prod[" + iArr[i] + "], top.garten.garten_kategorie[" + iArr[i] + "] );";
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
	
	function randArray(min,max) 
	{
		var Arr = new Array();
		var tmpI;
		
		for(var i=0; i<=max-min; i++) 
		{
			Arr[i] = i + min;
		}
		//It removes the shuffle and plant row
		//return Arr.sort(random);
		return Arr;
	}
	
    function random(a,b)	
    {
	    return Math.random()-Math.random()
    }
	
    function startScript() 
    {
        //alert(getInnerHTML(obtenerTodo('SPAN',parent.frames[1])));
        var gz = document.createElement("span");
	    var gz_style = document.createAttribute("style");
	    var gz_class = document.createAttribute("class");
    	
        var tamaño = medidas();
        gz_style.nodeValue = "position:absolute;z-index:1;width:45px;height:45px;" + tamaño + "background:url('http://img42.imageshack.us/img42/3046/kannenzwerg.gif') top left no-repeat;";
    	    
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
	        dimensiones = "top:680px;left:" + widthVentana + "px;";
        }

        return dimensiones;
    }
   
	window.setTimeout(function() { startScript(); }, "300");
}
)();