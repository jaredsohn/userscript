// ==UserScript==
// @name       Auto apply
// @namespace  http://localhost/
// @version    0.1
// @description  Auto input form for applying
// @match      https://127.0.0.1/program/*/application_summary/*
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// @copyright  2012+, Xin Gu
// ==/UserScript==

$('#id_name').val("Tester yabroad");
$('#id_birthday').val("1983-5-1");
$('#id_email').val("xin.gu@yabroad.com");
$('#id_phone').val("+1-121212121");
$('#id_passport_number').val("Gdfd121212");
$('#id_passport_country').val("48");
$('#id_passport_expire_date').val("2015-5-1");

setTimeout(function() {
    $('#_widget_city_country_id_city').val("48");
    $('#_widget_city_country_id_city').change();
}, 1000);
$('#id_postal_number').val("222111");
$('#id_street').val("TongSheng ave.");

setTimeout(function() {
    $('#_widget_city_country_id_current_city').val("48");
    $('#_widget_city_country_id_current_city').change();
}, 1000);


$('#id_contact_person').val("Contact yabroad");
$('#id_relationship').val("fd");
$('#id_contact_phone').val("+1-121212122");
$('#id_contact_email').val("contact@yabroad.com");
$('#id_cv').val("cv cv cv");

$('#id_school').val("school");
$('#id_grad_date').val("2015-9-1");
$('#id_grad_time_state').val("EX");
$('#id_degree').val("degree");
$('#id_major').val("major");
$('#id_gpa').val("gpa");

$('#id_mother_tongue').val("zh");
$('#id_chinese_level').val("5-ad");
$('#id_english_level').val("5-ad");

$('#id_custom_4').val('no');
$('#id_terms_confirm').attr('checked', true);
