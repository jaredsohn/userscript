// ==UserScript==
// @name tabifyLinqpad
// @description use jquery tabs on named outputs of a linqpad run
// ==/UserScript==
$('body div:first').prepend("<div id='tabs'><ul></ul></div>"); //add tab container
$('body div table.headingpresenter')//add tab headers and move content
    .each(function(i,e){
        var fragId='tab-'+i;
    $('body div#tabs ul').append('<li><a href="#'+fragId+'"><span>'+i+'</span></a></li>');
        $(e).attr('id',fragId).detach().appendTo('div#tabs');
});
$('body div#tabs').tabs();​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​