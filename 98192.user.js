// ==UserScript==
// @name           contarcontadores
// @namespace      www.javaworld.com
// @include        http://www.ccpll.org/directory.php?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
jQuery(function(){
	var letra = GM_getValue("letra"); 
	if(letra!=""){
		var code = letra.charCodeAt(0)+1;
		var cant = GM_getValue("cantidad") + $('table table tr').length-1;
		GM_setValue("cantidad",cant);		 
		var l = "";
		if(code<=90){
			l = String.fromCharCode(code);
			GM_setValue("letra",l);			
			window.location="http://www.ccpll.org/directory.php?letra="+l+"&estado=H";
		}else{
			alert(cant);
			GM_setValue("letra","");
			GM_setValue("cantidad",0);
		}
	}else{
		GM_setValue("letra","A");
		GM_setValue("cantidad",0);
		window.location="http://www.ccpll.org/directory.php?letra=A&estado=H";
	}	
});
