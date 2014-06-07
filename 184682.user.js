// ==UserScript==
// @name        FormFiller Helper
// @namespace   https://zornco.com/
// @require     https://code.jquery.com/jquery.js
// @include     http://www.insidewyomingfootball.com/recruit_admin50/questionnaires/questionnaire.php?id=1
// @version     1
// @grant       none
// ==/UserScript==

$ = jQuery.noConflict(true); //stop jQuery from breaking some pages that use $ as a var already

$.ajax({
    url: 'https://zornco.com/formfiller/info/',
    xhrFields: {
        withCredentials: true
    },
    success: function(data){
        if(data) {
            unsafeWindow.console.log(data);
        }
        $.each(data, function(key, value) {
            $('#'+key).val(value);
        });
    },
    dataType: "json"
});

$.each( obj, function( key, value ) {
alert( key + ": " + value );
});