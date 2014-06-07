// ==UserScript==
// @name UVM Net fixer
// @description UVM Net fixer
// @namespace uvmnetfixer
// @grant    none
// @include https://bannerautoservuvm.uvmnet.edu/*
// ==/UserScript==

bGbl_ChangeEventListenerInstalled   = false;
window.addEventListener ("load", MainAction, false);


function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;

        /*--- Notes:
                (1) If the ajax loads to a specific node, add this
                    listener to that, instead of the whole body.
                (2) iFrames may require different handling.
        */
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

    var inputs = window.document.getElementsByTagName('input');
    
    
    for(var i=0; i < inputs.length; i++)
    {
        if( getAttr(inputs[i]) === 'Imprimir'){
            inputs[i].setAttribute('onclick','goToPrint()');
        }
    };
    
    function getAttr(e){
        var l = e.value;
        return l;
    };
    
    append(NewScript1);
    
    function append(s) {     
        script = document.createElement('script');
        script.setAttribute('language', 'javascript');
        document.head.appendChild(script).innerHTML = s.toString().replace(/^function.*{|}$/g, '');
    }
    
    function NewScript1(){
        function goToPrint(){
            var cvecons = '';
            datos_send.action = "bwlkegrb.P_Imp_Inasiste_new";
            datos_send.target = "_blank";
            datos_send.submit();
        };
    };
}



function HandleDOM_ChangeWithDelay (zEvent)
{
    /*--- DOM changes will come hundreds at a time, we wait a fraction
          of a second after the LAST change in a batch.
    */
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222); //-- 222 milliseconds
}