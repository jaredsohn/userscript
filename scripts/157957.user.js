// ==UserScript==
// @name       WebEwid (BANINO)
// @namespace  http://xxx/
// @version    0.1
// @description  Enable WebEwid Functions
// @match      https://83.17.249.146/webewid/*
// @copyright  2013+, Kazz
// ==/UserScript==

var lista_ul = document.getElementById("tree_warstwy");
if(lista_ul != null)
{
	var lista_input = lista_ul.getElementsByTagName("input");
 	for (var i = 0; i < lista_input.length; i++) {  
            if(lista_input[i].type == 'checkbox')
            {
                var old_onclick = lista_input[i].getAttribute("onclick");
                if( old_onclick != 'warstwa(this);')
                {
                    console.log(old_onclick);
                    lista_input[i].setAttribute("onclick","warstwa(this);"); 
                }
            }
 }
}

var nav = document.getElementById("navig");
if(nav != null)
{
    var all_a = nav.getElementsByTagName("td")[0].getElementsByTagName("a");
    all_a[7].setAttribute("href","javascript:guzik8();");
    all_a[8].setAttribute("href","javascript:guzik11();");
    
}
