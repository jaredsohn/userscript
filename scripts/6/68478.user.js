// ==UserScript==
// @name        full screen
// @namespace   http://fluidapp.com
// @description What does this do?
// @include     *
// @author      Someone
// ==/UserScript==

(function () {
    if (window.fluid) {
    // do yer thang!

      document.onkeyup = function(event){
        if (event.keyCode === 70) toggleFullScreen();
      }

      var IN_FULL_SCREEN = false, original_styles = {};
      function toggleFullScreen(){
        try{
          var entries = document.getElementById('entries');

          with(entries.style){

            if (IN_FULL_SCREEN){
              IN_FULL_SCREEN = false;
              position        = original_styles.position;
              top             = original_styles.top;
              right           = original_styles.right;
              bottom          = original_styles.bottom;
              left            = original_styles.left;
              height          = original_styles.height;
              width           = original_styles.width;
              zIndex          = original_styles.zIndex;
              backgroundColor = original_styles.backgroundColor;
            }else{
              IN_FULL_SCREEN = true;
              original_styles.position        = position;
              original_styles.top             = top;
              original_styles.right           = right;
              original_styles.bottom          = bottom;
              original_styles.left            = left;
              original_styles.height          = height;
              original_styles.width           = width;
              original_styles.zIndex          = zIndex;
              original_styles.backgroundColor = backgroundColor;

              position = "fixed";
              top = right = bottom = left = 0;
              height = width = '100%';
              zIndex = 1000;
              backgroundColor = 'white';
            }
          }

        }catch(e){
          alert('FULL SCREEN ERROR: '+e.message);
        }
      }
    }
})();