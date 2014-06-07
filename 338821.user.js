// ==UserScript==
// @name        test_jquery2
// @namespace   test_EIN2
// @include     https://research.relsci.com/*
// @include     https://research.cdsqc.com/LinkingAndStandardization/Linking/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

/*
var $ = unsafeWindow.jQuery;
alert($(searchString).width());
*/


this.$ = this.jQuery = jQuery.noConflict(true);

$(document).ready(function(){
    
    //ReSize home page
    $("#linkingResult .search-panel .searchTable").height(280);
    $("#linkingResult .search-panel .similar-box").height(365);
    
    $('#createNew').on("click", function(){
       // alert("dfdfdfd");
      // $("#createEntityOptions .inputName input[name$='linkedEntityName']").width(500);
      $("input[name$='linkedEntityName']").width(300);
    });
    

});


/*
$(document).ready(function(){
    $('form#searchForm #_searchText').val("test1");
//    $('searchForm').submit();
});
*/

/*
$(document).ready(function()
{
    $("#createNew").on("click",function(){
        var test = $("#createEntityOptions .inputName").val();
        alert(test);
        
    });
    
     $("#escalate").on("click",function(){
        var test = $("#_escalationText").val("dfdfd");
        alert(test);
        
    });

});
*/




