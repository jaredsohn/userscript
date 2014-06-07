// ==UserScript==
// @name           Dubizzle Signup Auto-fill
// @namespace      Dubizzle
// @description    Autofill all fields in registration
// @include        *.dubizzle.*/accounts/register/
// @exclude        *.dubizzle.com/accounts/register/
// @copyright      AhmadDukhan
// @version        1.0
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


randomnumber=Math.floor(Math.random()*999999);
email = "test"+Math.floor(Math.random()*999999)+"@test.uae";
password = "123";
fname = "Ahmad";
lname = "Dukhan";

$('#id_email').val(email);
$('#id_email2').val(email);
$('#id_password1').val(password);
$('#id_password2').val(password);
$('#id_first_name').val(fname);
$('#id_last_name').val(lname);
$('#id_gender').val("M");
$('#id_dob_day').val("1");
$('#id_dob_month').val("1");
$('#id_dob_year').val("1986");
$('#id_nationality').val("233");
$('#id_role').val("SM");
$('#id_education').val("4");
$('#id_third_party_emails').prop('checked', false);
$('#id_dubizzle_email_updates').prop('checked', false);
