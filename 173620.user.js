// ==UserScript==
// @name        Comprobante MC Fix
// @namespace   http://userscripts.org/users/468940
// @author      Alberto Magana <albertoxm@gmail.com>
// @description Extensión para limpiar y ajustar el comprobante de salida de microcréditos.
// @include     http://montepioempenos.com.mx/testx/mc.html
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @grant       GM_addStyle
// @version     1.0
// ==/UserScript==
    
    function addGlobalStyle() {
        //var css = ' @media print {  body * { visibility:hidden;  }    #printable, #printable * {  visibility:visible;  }    #printable { /* aligning the printable area */    position:absolute;   left:0;    top:0;    }  }';
        
        var css =  '#printable, #printable * {  visibility:visible;  } ';
        
        var head, style;
        head = document.getElementsByTagName('head')[0];
        if (!head) { return; }
        style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        head.appendChild(style);
        
    }
    
    function addCss(cssString) { 
        var head = document.getElementsByTagName('head')[0]; 
        if (!head) { return; }
        var newCss = document.createElement('style'); 
        newCss.type = "text/css"; 
        newCss.innerHTML = cssString; 
        head.appendChild(newCss); 
        alert(cssString);
    } 
    

//addGlobalStyle(' @media print {  body * { visibility:hidden;  }    #printable, #printable * {  visibility:visible;  }    #printable { /* aligning the printable area */    position:absolute;   left:0;    top:0;    }  }');


// Agregar estilo para impresión
GM_addStyle('@media print {  body * { visibility:hidden;  } #printable, #printable * {  visibility:visible;  } #printable { position:absolute;  left:0; top:0; width:100%; margin:0; float:none; } }');
// Cambiar ID para aplicar estilo
$("#printables").attr('id','printable');       
    


/*
Exception: GM_addStyle is not defined
@Scratchpad/1:47
*/