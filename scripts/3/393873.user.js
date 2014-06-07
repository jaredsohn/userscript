// ==UserScript==
// @name       Auto-matríc
// @namespace  https://www.facebook.com/fernando.freitas.alves
// @version    0.1a
// @description  Executa um script de auto-matríc quando existir vaga
// @match      
// @author     Fernando Freitas Alves
// @copyright  2014+, Fernando Freitas Alves
// @include    http://matricula.ufabc.edu.br/matricula*
// ==/UserScript==

window.setTimeout(function()
{
    startBtStr = '<b>(iniciar)<b> | ';
    stopBtStr  = '<b>(parar)<b> | ';
    debug_InnerHTML_default = '<b>Auto-matrícula</b> – Desenvolvido por <a href=\'mailto:teo.interstei@gmail.com\'> Fernando Freitas Alves</a>';
    
    auto = getStoreValue("auto");
    if (auto == 'null' || auto == 'undefined' || auto == 'false') auto = false;
    else auto = Boolean(auto);
    
    userTime  = getStoreValue("userTime");
    if (userTime  == 'null' || userTime  == 'undefined') userTime  = 3;
    
    userInput = getStoreValue("userInput");
    if (userInput == 'null' || userInput == 'undefined') userInput = null;
    
    insertCSS('#amButton { position:absolute;' +
     	    		      'top:6px;' +
       	 	 	          'left:10px;' +
       	 	 	          'color:#FFFFFF;' +
       	 	  	          'text-align: left;' +
              			  'cursor:pointer }' +
    	      '#amButton a{color:#FFFFFF}');
	button = insertElement('span',
                           'amButton',
                           startBtStr,
                           autoMatricula_prompt,
                           'top');
    
    insertCSS('#amDebug { position:absolute;' +
     	    		     'top:6px;' +
       	 	 	         'left:82px;' +
       	 	 	         'color:#FFFFFF;' +
       	 	  	         'text-align: left }' +
    	      '#amDebug a{color:#FFFFFF}');
    debug = insertElement('span',
                          'amDebug',
                          debug_InnerHTML_default,
                          null,
                          'top');
    
    if (auto) autoMatricula();
    else pararMatricula();
}, 0)

function insertCSS(css)
{
    head  = document.head || document.getElementsByTagName('head')[0];
    style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet)
         style.styleSheet.cssText = css;
    else style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

function insertElement(type, id, innerHTML, onclick, target)
{
    element = document.createElement(type);
    if (id != '' && id !== null)
    	element.id = id;
    if (innerHTML !== null && innerHTML != '')
    	element.innerHTML = innerHTML;
    if (onclick !== null && onclick != '')
    	element.onclick = onclick;
	document.getElementById(target).appendChild(element);
    return document.getElementById(id);
}

function autoMatricula_prompt()
{
    userInput = prompt('Entre com o nome exato ou o nome genérico da disciplina.' + 
                       '\n\nCaso o nome digitado for genérico, a auto-matrícula buscara pela primeira disciplina com esse nome que esteja livre.', userInput).trim().toUpperCase();
    userTime  = prompt('Qual o intervalo (em segundos) que deseja que a página auto-recarregue caso não haja vagas disponíveis?', userTime);
    setStoreValue("userInput", userInput);
    setStoreValue("userTime", userTime);
    autoMatricula();
}

function autoMatricula()
{
    if (userInput !== null && userInput != '' &&
        userTime  !== null && userTime  != '')
    {
        submitBt = document.getElementsByName('commit')[0]
        elements = document.getElementsByTagName('label');
        fnd = false;
        for (i = 0; !fnd && i < elements.length; i++)
        {
            elementTxt = elements[i].innerText.toUpperCase();
            if (elementTxt.indexOf(userInput) != -1)
            {
                fnd  = true;
                auto = true;
                setStoreValue("auto", auto);
                button.innerHTML = stopBtStr;
                button.onclick   = pararMatricula;
                debug.innerHTML = 'Identificando vagas... [' + userInput + ']';
                vagas  = getIntFromStr(elementTxt, '-', ' VAGAS');
                requis = getIntFromStr(elementTxt, '/', ' REQUISIÇÕES DE MATRÍCULA');
                if (vagas > requis)
                {
                    debug.innerHTML = 'SUCESSO!!! Vaga liberada. Efetuando matrícula... [' + userInput + ']';
                    document.getElementById(elements[i].htmlFor).checked = true;
                    resetStore();
                    submitBt.click();
                }
                else
                {
                    sec = userTime;
                    cntDown = window.setInterval(function()
                    {
                        if (auto)
                        {
                            debug.innerHTML = 'TURMA LOTADA. Recarregando a página em ' + sec + ' segundos... [' + userInput + ']';
                            if (sec == 0)
                            {
                                clearInterval(cntDown);
                                location.reload(true);
                            }
                            sec = sec - 1;
                        }
                        else clearInterval(cntDown);
                    }, 1000);
                }
            }
        }
        if (!fnd)
        {
            debug.innerHTML = 'TURMA NÃO ENCONTRADA. Confira e tente digitar novamente.';
            resetStore();
        }
    }
    else pararMatricula();
}

function getIntFromStr(originalStr, leftStr, rightStr)
{
    idxTxt = originalStr.indexOf(rightStr);
    subTxt = originalStr.substring(0, idxTxt);
    idxTxt = subTxt.lastIndexOf(leftStr);
    subTxt = subTxt.substring(idxTxt + 1, subTxt.length);
    return parseInt(subTxt);
}

function pararMatricula()
{
    resetStore();
    button.innerHTML = startBtStr;
    button.onclick   = autoMatricula_prompt;
    debug.innerHTML  = debug_InnerHTML_default;
}

function resetStore()
{
    auto = false;
    setStoreValue("auto", auto);
    //userTime = 3;
    //setStoreValue("userTime", userTime);
    //userInput = null;
    //setStoreValue("userInput", userInput);
}

function setStoreValue(key, value)
{
    if (localStorage)
        localStorage.setItem(key, value);
    else $.cookies.set(key, value);
}

function getStoreValue(key) {
    if (localStorage)
         return localStorage.getItem(key);
    else return $.cookies.get(key);
}