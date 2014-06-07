//// ==UserScript==
// @name Salesforce Contact field cleaner
// @include https://*.salesforce.com/003/e?retURL=*
// @author Emir (legaloth@yahoo.com)
// @version 0.2
// @description This script adds a button to Salesforce Contact page. As a default behaviour Salesforce copies  Account Billing Address as new Contact's Mailing address. This button blanks out the Mailing Address fields and also the phone number for the form.

// ==/UserScript==

var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", function() {

$('td#topButtonRow input[name=cancel]').after('<input id="clrfrm" type="button"></input>');
    $('#clrfrm').addClass('btn').attr('title','Clear').attr('value','Clear Form').css('margin-left', '5px');

  $('#clrfrm').click(function() {
      $('#con10,#con19street,#con19city,#con19state,#con19zip,#con19country,#con11').val('');
});
    

});