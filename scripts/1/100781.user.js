// ==UserScript==
// @id             AppTab4modsde
// @name           AppTab4modsde
// @include        http://forum.mods.de/bb/index.php*
// @author         Kambfhase
// @version        0.2
// ==/UserScript==

var first=true;

(function self(){ // IIFE
    GM_xmlhttpRequest({
      method: "GET",
      url: "xml/bookmarks.php",
      onload: function( response) {
        response=response.responseText;

        var r = /newposts="(\d+)"/;
        
        if( !r.test( response)){
            return; // was kam denn da zurück?
        }
        
        r = r.exec( response)[ 1]; // Zahl der neuen Posts

        if( first){
            first = false;
            if( r !== "0"){
                // wir sind mit neuen Posts auf der Seite gestartet. Also Titel anpassen
                window.document.title = (r === "1" ? "Ein neuer Post":r + " neue Posts")+" - mods.de - Forum";
                return;
            }
        } 
        
        if( r !== "0"){
            // neue Posts \o/ neu laden!
            window.location.reload();
        } else {
            // noch nichts neues /o\
            setTimeout( self, /* Math.PI**/60*1000);
        }
        
      }
    });
})();
