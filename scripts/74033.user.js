// ==UserScript==
// @name           utopiabuild
// @namespace      squirtle
// @include        http://utopia-game.com/wol/game/build
// ==/UserScript==
// THIS IS HORRIBLE CODE DO NOT READ IT YOUR EYES WILL BLEED

// this is just the default thing loaded the first time if you don't have a
// greasemonkey value set for the build
default_build = "0,0,99,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1"

// must use split because greasemonkey saves string not array
build = GM_getValue("build",default_build).split(",");

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
  function letsJQuery() {
    // add save button
    $("#btnBuild").before("<input type='button' id='savenpop' value='save and populate' >");

    var land = $("#resource-bar th")[12].innerHTML.replace(",","");
    var b="wat u want";
    var i=2;
    var j=0;
    var s = "wat u has";
    var total=0;
    while (i<=$("#build-buildings tr").children().length){
      if (i > 10) { // past first row?
        // you own
        a = parseInt( $("#build-buildings tr").children()[i-1].innerHTML.replace(",","") );
        $("#build-buildings tr").children()[i-1].id = j + "built";
        // in progress
        b = parseInt( $("#build-buildings tr").children()[i].innerHTML.replace(",","") );
        $("#build-buildings tr").children()[i].id = j + "inprog";
        
        total = a+b;
        s = Math.round( total/land * 1000 )/10; //bitches don't know about my rounding!
//        $("#build-buildings input.quantity")[j].value = Math.round( land * build[j]/100 ) - total; // populate input
        b = "<input style='width:1.5em' class='gotta_catch_em_all' value='" + build[j] + "' value='text' />"; // add wat u want field
        j++;
      }
      // build new cell
      $("<td>" + s + "</td>").insertAfter( $( $("#build-buildings tr").children()[i] ) );
      $("<td>" + b + "</td>").insertAfter( $( $("#build-buildings tr").children()[i] ) );
      i+=6;
    }

    $("#savenpop")[0].onclick = function(){
        var bidx=0;
        $(".gotta_catch_em_all").each(function(){
          build[bidx++] = this.value;
        });
        // must use .join because we can't save arrays?, so we use strings
        GM_setValue("build", build.join(","));

        for (var j=0; j<$("input.quantity").length; j++){
            // we get the total buildings built
            total = parseInt( $("#" + j + "built")[0].innerHTML.replace(",","") ) + parseInt( $("#" + j + "inprog")[0].innerHTML.replace(",","") );
            // and set the things to build to max(0, total)
            $("#build-buildings input.quantity")[j].value = Math.max( 0, Math.round( land * build[j]/100 ) - total);
        }
        
        this.value = 'saved';
        
        setTimeout( function()( $("#savenpop").val("save and populate") ), 4000 );
    };
  }
