// ==UserScript==
// @name          SPOL for product code
// @author        gera_b
// @version       0.4.2
// @description   Script adds SPOL buttons to product code ending in site catalog
// @match         http://fotomag.com.ua/*
// @exclude       http://fotomag.com.ua/admin*
// ==/UserScript==

if (typeof document.getElementsByClassName('breadcrumbs')[0] != 'undefined'){
    var prodCode = document.getElementsByClassName('breadcrumbs')[0].nextElementSibling.nextElementSibling.textContent;
    idx = prodCode.indexOf(':') + 1;
    prodCode = parseInt(prodCode.substring(idx));

/* 	var oldCSSlink = document.createElement('LINK');
	oldCSSlink.rel = 'stylesheet';
	oldCSSlink.href = '/stat/css/old.css';
	oldCSSlink.type = 'text/css';
	document.body.insertBefore(oldCSSlink, null);
	
	var defaultCSSlink = document.createElement('LINK');
	defaultCSSlink.rel = 'stylesheet';
	defaultCSSlink.href = '/stat/admin/css/default.css';
	defaultCSSlink.type = 'text/css';
	document.body.insertBefore(defaultCSSlink, null);	 */
    
    var startScript = document.createElement('SCRIPT');
    startScript.type = 'text/javascript';
    //startScript.setAttribute = ('onload',"\n\t$(document).ready(function(){\n\t$('.nyroModal').nyroModal();\n\t});\n");
    startScript.innerHTML = "function goNyro(){$('.nyroModal').nyroModal();}";
    document.head.insertBefore(startScript, null);
	
	var lightboxCSSLink = document.createElement('LINK');
	lightboxCSSLink.rel = 'stylesheet';
	lightboxCSSLink.href = '/stat/js/jquery-ui-1.10.2.custom/css/ui-lightness/jquery-ui-1.10.2.custom.min.css';
	lightboxCSSLink.type = 'text/css';
	lightboxCSSLink.media = 'screen';
	document.body.insertBefore(lightboxCSSLink, null);
		  
	var nyroModalCSSLink = document.createElement('LINK');
	nyroModalCSSLink.rel = 'stylesheet';
	nyroModalCSSLink.href = '/stat/js/jquery.nyroModal/styles/nyroModal.css';
	nyroModalCSSLink.type = 'text/css';
	nyroModalCSSLink.media = 'screen';
	document.body.insertBefore(nyroModalCSSLink, null);    
		  
	var lightboxScriptLink = document.createElement('SCRIPT');
	lightboxScriptLink.src = '/stat/js/jquery-ui-1.10.2.custom/js/jquery-ui-1.10.2.custom.min.js';
	
    lightboxScriptLink.type = 'text/javascript';
	document.body.insertBefore(lightboxScriptLink, null); 
		  
	var nyroModalScriptLink = document.createElement('SCRIPT');
	//nyroModalScriptLink.src = '/stat/js/jquery.nyroModal.js';
    nyroModalScriptLink.src = '/stat/js/jquery.nyroModal/js/jquery.nyroModal.custom.js';
	nyroModalScriptLink.type = 'text/javascript';
	document.body.insertBefore(nyroModalScriptLink, null); 
    
    var infolinkCSSstyle = document.createElement('style');
    infolinkCSSstyle.type = 'text/css';
    infolinkCSSstyle.innerHTML = '.infolink {border: 1px solid #00F; background-color: #eee; text-decoration: none; padding: 0 2px;}';
    document.head.insertBefore(infolinkCSSstyle, null);
    
    var buttonS = document.createElement('a');
	buttonS.innerHTML = "S"
    buttonS.setAttribute('class','infolink');
    buttonS.setAttribute('target','_blank');
    buttonS.href = '/admin/index.php?action=product/list&q='+prodCode;
    document.getElementsByClassName('breadcrumbs')[0].nextElementSibling.appendChild(buttonS,null);
        
    var buttonP = document.createElement('a');
	buttonP.innerHTML = "P"
    buttonP.setAttribute('class','infolink');
    buttonP.setAttribute('target','_blank');
    buttonP.href = '/admin/index.php?action=items/item&itemid='+prodCode;
    document.getElementsByClassName('breadcrumbs')[0].nextElementSibling.appendChild(buttonP,null);
        
    var buttonO = document.createElement('a');
	buttonO.innerHTML = "O"
    buttonO.setAttribute('class','infolink');
    buttonO.setAttribute('target','_blank');
    buttonO.href = '/admin/index.php?action=set&search[item_id]='+prodCode+'&search[no_filters]=1&redir=/admin/index.php?action=orders';
    document.getElementsByClassName('breadcrumbs')[0].nextElementSibling.appendChild(buttonO,null);
        
    var buttonL = document.createElement('a');
	buttonL.innerHTML = "L"
    //buttonL.setAttribute('class','infolink nyroModal');
    buttonL.setAttribute('class','infolink nyroModal');
    buttonL.href = '/admin/index.php?action=product/binds&id='+prodCode;
    document.getElementsByClassName('breadcrumbs')[0].nextElementSibling.appendChild(buttonL,null);
    
    var startFunc = document.createElement('script');
		startFunc.innerHTML = 'setTimeout(\'goNyro();\',100)';
		document.body.appendChild(startFunc);
}

if (typeof document.getElementsByClassName('price')[0] != 'undefined'){
 	for (i=0; i<document.getElementsByClassName('price').length; i++){
    var uahPrice = parseInt(document.getElementsByClassName('price')[i].children[0].innerText);
    var usdPrice = document.createElement('span');
    usdPrice.innerText = " (" + Math.round(uahPrice / 8.2 * 100) / 100 + " usd)"
    document.getElementsByClassName('price')[i].appendChild(usdPrice);    }
}