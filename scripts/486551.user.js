// ==UserScript==
// @name XtraSize
// ==/UserScript==

$('#dialog').dialog(
 autoOpen: false,
 height: 300,
 width: 350,
 modal: true,
 buttons: 
 'Send': function() 
 $( this ).dialog( "close" );
 $('#add-opinion-info').html('<span style="color:green">Thank you for giving us your opinion.</span>');
 setTimeout(fadeOutOpinionInfo, 3000);
 
,
 Cancel: function() 
 $( this ).dialog( "close" );
 
 );
 
 $('.armour').on("click",function()
 $(this).find('input').prop('checked', true);
 );
