// ==UserScript==
// @name       MisFacturas.net Comentarios automaticos
// @version    0.1
// @description	                Agrega un texto pre-definido en los comentarios de MisFacturas.net
// @description	                Script creado por DeSoftware.mx
// @include			https://boveda.misfacturas.net/misfacturas.net/MisFacturas.html
// @copyright  2014, DeSoftware.mx
// @require https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require https://github.com/sizzlemctwizzle/GM_config/raw/master/gm_config.js
// ==/UserScript==





    var idComentarios = '#txt-cfds-comentarios-input';
    
    function waitForKeyElements (
    selectorTxt,    /* Required: The jQuery selector string that
                        specifies the desired element(s).
                    */
    actionFunction, /* Required: The code to run when elements are
                        found. It is passed a jNode to the matched
                        element.
                    */
    bWaitOnce,      /* Optional: If false, will continue to scan for
                        new elements even after the first match is
                        found.
                    */
    iframeSelector  /* Optional: If set, identifies the iframe to
                        search.
                    */
) {
    var targetNodes, btargetsFound;

    if (typeof iframeSelector == "undefined")
        targetNodes     = $(selectorTxt);
    else
        targetNodes     = $(iframeSelector).contents ()
                                           .find (selectorTxt);

    if (targetNodes  &&  targetNodes.length > 0) {
        btargetsFound   = true;
        /*--- Found target node(s).  Go through each and act if they
            are new.
        */
        targetNodes.each ( function () {
            var jThis        = $(this);
            var alreadyFound = jThis.data ('alreadyFound')  ||  false;

            if (!alreadyFound) {
                //--- Call the payload function.
                var cancelFound     = actionFunction (jThis);
                if (cancelFound)
                    btargetsFound   = false;
                else
                    jThis.data ('alreadyFound', true);
            }
        } );
    }
    else {
        btargetsFound   = false;
    }

    //--- Get the timer-control variable for this selector.
    var controlObj      = waitForKeyElements.controlObj  ||  {};
    var controlKey      = selectorTxt.replace (/[^\w]/g, "_");
    var timeControl     = controlObj [controlKey];

    //--- Now set or clear the timer as appropriate.
    if (btargetsFound  &&  bWaitOnce  &&  timeControl) {
        //--- The only condition where we need to clear the timer.
        clearInterval (timeControl);
        delete controlObj [controlKey]
    }
    else {
        //--- Set a timer, if needed.
        if ( ! timeControl) {
            timeControl = setInterval ( function () {
                    waitForKeyElements (    selectorTxt,
                                            actionFunction,
                                            bWaitOnce,
                                            iframeSelector
                                        );
                },
                300
            );
            controlObj [controlKey] = timeControl;
        }
    }
    waitForKeyElements.controlObj   = controlObj;
}
    



 
	waitForKeyElements ("div#x-auto-75", function(jNode){
        
         
        function cargarConfiguracion(){
                        //jNode.val(localStorage.getItem('comentarios'));
            
            
            GM_config.init('Información del médico.',{
                'informacion':    { label: 'Información médica:', type: 'textarea', rows: 10, cols:50, default: 'Cédula Profesional:' }
            },                  
            {
               open: function() {              
                      GM_config.resizeFrame('200px','100px'); // resize the config window              
                  },
                save: function() { alert('La información se guardo correctamente'); GM_config.close(); }
          }
                          
          );
            GM_config.open();  
        }

        
        
        jNode.find("table tbody tr").append('<td role="presentation" align="RIGHT" valign="TOP"><div id="x-auto-desoftware-1" class=" x-component">&nbsp;|&nbsp;</div></td><td role="presentation" align="RIGHT" valign="TOP"><div id="x-auto-desoftware-2" class=" x-component">&nbsp;<a href="#" id="btncargarconfiguracion">Cédula Profesional</a>&nbsp;</div></td>');

        $("#btncargarconfiguracion").click(function(){
            cargarConfiguracion();
        });
        
    });

    
    waitForKeyElements (idComentarios, function(jNode){
        
        
          jNode.blur(function(){
                 localStorage.setItem('comentarios',jNode.val());
          });
        
        console.log(GM_config.read().informacion);
        	jNode.val(GM_config.read().informacion);
        
        
          if (localStorage.getItem('comentarios')){
         		//jNode.val(localStorage.getItem('comentarios'));              
          }
        
    
        
    });




