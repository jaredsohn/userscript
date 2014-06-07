// ==UserScript==
// @name           Adjust Media Library Desc Size
// @namespace      medialibrary
// @description    Change the size of the media library description area.
// @include        http://w3.tap.ibm.com/medialibrary/media_edit*
// ==/UserScript==

function resizeEditor(){
    var f = document.getElementById( "description___Frame" );
    console.log( " f is " + f );

    if( f !== null ){
      f.height = "500px";
      f.style.height = "500px";
    }else{
      console.error( "ERROR: Unable to find the description frame. " );
    }

    f = document.getElementsByClassName( 'v12-form' );

    if( f !== null ){
      var i=0;
      for( i = 0; i < f.length; ++i){
        f[i].style.width = "100%";
      }
    }else{
      console.error( "ERROR: Unable to find the table. " );
    }

    f = null;
}

console.log( "Adjust adding document listener" );
setTimeout( resizeEditor, 1000 );