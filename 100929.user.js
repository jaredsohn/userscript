// ==UserScript==
// @name Neobuxox_mods
// @description This script allows to copy the ToS directly from forum and chat
// @namespace http://userscripts.org/users/319715
// @author Proxen
// @include http://www.neobux.com/forum/*
// @include http://www.neobux.com/chat/*
// @include http://www.neobux.com/m/t/
// @license GNU General Public License v3.0
// @version 0.1.4
// ==/UserScript==

// Changelog
// 2011-04-10 : End of lines (<br>) problem fixed
// 2011-04-19 : From now on, the text is automatically pasted into the text-area if available
// 2011-04-19 : The ToS rule is now added at the start of the quote
// version 0.1.3
// 2011-07-14 : Added another select to paste predefined messages
// version 0.1.4
// 2011-07-29 : Added an option to save the time when you finish moderating

//Si esta en ToS actualiza valores automaticamente
if( location.href == "http://www.neobux.com/m/t/")
{
	        //Variables
	        var nbo_tablas = document.getElementsByTagName("table");
	        var nbo_mtabla = 0;
	        var nbo_mtablaf = 0;
	        var nbo_mtablac = 0;
	        var nbo_mlistaVal = new Array();
	        var nbo_mlistaInd = new Array();
	        
	        //Obtiene la tabla buena
		    for(var i = 0; i < nbo_tablas.length; i++)
		    {
		        if(nbo_tablas[i].getAttribute("style") == "text-align:justify")
		        {
		            nbo_mtabla = nbo_tablas[i];
		        }
		    }
		    
		    //Recorre filas y elige las columnas en las que actuar
		    nbo_mtablaf = nbo_mtabla.rows;
		    for(var i = 0; i < nbo_mtablaf.length; i++)
		    {
		        nbo_mtablac = nbo_mtablaf[i].getElementsByTagName("td");
		        //Si es las columna buena guarda en GM_setValue
		        if(nbo_mtablac[0].getAttribute("class") == "nr")
		        {
		            nbo_mlistaInd.push(nbo_mtablac[0].innerHTML);
		            nbo_mlistaVal.push(nbo_mtablac[0].innerHTML + " " + nbo_mtablac[1].innerHTML.replace(/<br>/gi," "));
		        }
		    }
		    GM_setValue('nbo_ind',nbo_mlistaInd.join('||'));
		    GM_setValue('nbo_val',nbo_mlistaVal.join('||'));
}
	
//Si no esta en ToS entonces dibuja los select y demas
if( location.href.indexOf("www.neobux.com/forum/") != -1 || location.href.indexOf("chat/top.html") != -1)
{
    //Obtiene el body
    var nbo_mbody = document.getElementsByTagName("body")[0];
    
    //Dibuja la ultima hora desde la que continuar
    //Obtiene la ultima hora de la cookie nbo_finishModerating
    var i,x,y,ARRcookies=document.cookie.split(";");
    var nbo_finishModerating = "";
    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x=="nbo_finishModerating")
        {
            nbo_finishModerating = unescape(y);
        }
    }
    
    //Crea y anade al body el div que contiene la hora desde la que continuar
    var nbo_mdiv = document.createElement('div');
    nbo_mdiv.setAttribute('style','height:15px;width:200px;position:fixed;bottom:00px;left:71px;font-size:10px;');
    nbo_mdiv.setAttribute('id','nbo_finishModerating');
    nbo_mdiv.innerHTML = nbo_finishModerating;
    nbo_mbody.appendChild(nbo_mdiv);
    
    //Dibuja y anade al body el boton de ultima moderacion
    nbo_finishModeratingDate = new Date();
    nbo_finishModerating = nbo_finishModeratingDate.getFullYear()+'/'+(nbo_finishModeratingDate.getMonth()+1)+'/'+nbo_finishModeratingDate.getDate()+' '+nbo_finishModeratingDate.getHours()+':'+nbo_finishModeratingDate.getMinutes()+':'+nbo_finishModeratingDate.getSeconds();
    var nbo_mbot = document.createElement('button');
    nbo_mbot.setAttribute('style','height:20px;width:70px;vertical-align:middle;position:fixed;bottom:0px;left:0px;');
    nbo_mbot.setAttribute('onclick','nbo_finishModeratingDate = new Date(); nbo_finishModerating = nbo_finishModeratingDate.getFullYear()+\'/\'+(nbo_finishModeratingDate.getMonth()+1)+\'/\'+nbo_finishModeratingDate.getDate()+\' \'+nbo_finishModeratingDate.getHours()+\':\'+nbo_finishModeratingDate.getMinutes()+\':\'+nbo_finishModeratingDate.getSeconds();nbo_finishModeratingDate.setDate(nbo_finishModeratingDate.getDate() + 7);document.cookie = \'nbo_finishModerating=\'+nbo_finishModerating+\';expires=\'+nbo_finishModeratingDate.toUTCString()+\';path=/;\';document.getElementById(\'nbo_finishModerating\').innerHTML=nbo_finishModerating;');
    nbo_mbot.innerHTML = "Finished!";
    nbo_mbody.appendChild(nbo_mbot);
    
        
    //Obtiene los datos guardados
    var nbo_mlistaInd = new Array();
    var nbo_mlistaVal = new Array();
    
    //Si hay datos guardados dibuja el select
    if(GM_getValue('nbo_ind','') && GM_getValue('nbo_val',''))
    {
        nbo_mlistaInd = GM_getValue('nbo_ind','').split('||');
        nbo_mlistaVal = GM_getValue('nbo_val','').split('||');
    
        //Crea el select de Messages
	    var nbo_msel = document.createElement('select');
	    nbo_msel.setAttribute('style','height:20px;width:80px;position:fixed;bottom:0px;right:0px;');
	    nbo_msel.setAttribute('onchange','if(document.getElementById("msgb") != null){ nbo_msjBox = document.getElementById("msgb"); '
            + 'if(nbo_msjBox && nbo_msjBox.selectionStart) { nbo_str1 = nbo_msjBox.value.substr(0,nbo_msjBox.selectionStart); nbo_str2 = nbo_msjBox.value.substr(nbo_msjBox.selectionStart); nbo_msjBox.value = nbo_str1 + "[q]" + this.value + "[/q]" + nbo_str2; } '
            + 'else{ nbo_msjBox.value = "[q]" + this.value + "[/q]"; }' 
            + ' }else{ alert(this.value); }');
        //Anade la opcion de Messages al select Messages
	    opt = document.createElement('option');
	    opt.value = "Default Messages";
	    opt.innerHTML = "Messages";
	    nbo_msel.appendChild(opt);
        //Anade la opcion de Directos al select Messages
        //Start option1
        var nbo_option = "Los requisitos que tiene que cumplir un referido directo para que pueda ser vendido son:\n- Que lleve más de 60 días contigo.\n- Que tenga una media superior a 2.0 desde que está contigo.\n- Que tenga una media superior a 2.0 en los últimos 5 días.\n- Algunas reglas internas que solamente conoce la administración de NeoBux.\n\nSi el referido cumple todos estos requisitos podrás venderlo recibiendo en tu saldo de alquiler:\n- $1 si su media está entre 2 y 3.99.\n- $2 si su media está entre 4 y 5.99.\n- $3 si su media es superior a 6.";
	    opt = document.createElement('option');
	    opt.value = nbo_option;
	    opt.innerHTML = "Directos";
	    nbo_msel.appendChild(opt);
	    //End option1
	    //Anade la opcion de NeoPuntos al select Messages
	    //Start option2
	    var nbo_option = "La única forma de conseguir NeoPuntos a día de hoy es viendo anuncios. Por cada anuncio visto, sea del tipo que sea, recibes un NeoPunto.\n\nPuedes canjear los NeoPuntos por:\n-Dinero en el saldo de alquiler.\n-Aumentar tu límite de referidos directos (500 NeoPuntos 1 hueco extra).\n-Comprar la golden con 30000 NeoPuntos.\n\nSi quieres cambiar los NeoPuntos por dinero en el saldo de alquiler te pego aquí el dinero que conseguirías:\n- 250 NeoPuntos = $0.10\n- 500 NeoPuntos = $0.25\n- 1000 NeoPuntos = $0.60\n- 2500 NeoPuntos = $1.75\n- 5000 NeoPuntos = $4.00\n- 10000 NeoPuntos = $9.00\n- 20000 NeoPuntos = $20.00\n- 40000 NeoPuntos = $44.00\n\nPara cambiar los NeoPuntos por dinero en el saldo de alquiler tienes que ir a la página del [url=https://www.neobux.com/c/rba/]saldo de alquiler[/url] y elegir NeoPoints como forma de añadir dinero.";
	    opt = document.createElement('option');
	    opt.value = nbo_option;
	    opt.innerHTML = "NeoPuntos";
	    nbo_msel.appendChild(opt);
	    //End option2
	    
	    //Anade al body el select Messages
	    nbo_mbody.appendChild(nbo_msel);

        //Crea el select de ToS
        var nbo_msel = document.createElement('select');       
        nbo_msel.setAttribute('style', 'height:20px;width:50px;position:fixed;bottom:0px;right:81px;');
        nbo_msel.setAttribute('onchange','if(document.getElementById("msgb") != null){ nbo_msjBox = document.getElementById("msgb"); '
        + 'if(nbo_msjBox && nbo_msjBox.selectionStart) { nbo_str1 = nbo_msjBox.value.substr(0,nbo_msjBox.selectionStart); nbo_str2 = nbo_msjBox.value.substr(nbo_msjBox.selectionStart); nbo_msjBox.value = nbo_str1 + "[q]" + this.value + "[/q]" + nbo_str2; } '
        + 'else{ nbo_msjBox.value = "[q]" + this.value + "[/q]"; }' 
        + ' }else{ alert(this.value); }');
                
        //Anade la opcion de ToS al select ToS
	    opt = document.createElement('option');
        opt.value = "ToS";
        opt.innerHTML = "ToS";
        nbo_msel.appendChild(opt);
        //Anade los puntos del ToS guardados en GM_ al select ToS
        for (i=0; i<nbo_mlistaInd.length; i++)
        {
             opt = document.createElement('option');
             opt.value = nbo_mlistaVal[i];
             opt.innerHTML = nbo_mlistaInd[i];
             nbo_msel.appendChild(opt);
        }
        //Anade al body el select ToS
        nbo_mbody.appendChild(nbo_msel);
    }
}