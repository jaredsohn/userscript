// ==UserScript==
// @name        Auto-Frakthandling
// @namespace   xxx
// @description Automatiserad frakthandlingssystem
// @include     https://po.unifaun.se*
// @include     xxx
// @require 	    http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// @version     0.1
// ==/UserScript==
// Base url of page to collect addresses on.
var customer_info_url_base = "http://www.nosmoke.se/admin/index.php?route=sale/order/invoice";
// When object of this class is clicked on the above page addresses are collected 
var object_class_to_click = ".address";
// Pacsoft online user id
var my_pacsoft_uid = "xxx";
// Pacsoft online password 
var my_pacsoft_pwd = "xxx";
// Name on image next to favorite <img name="xxxxxxxx">
var favorite_html_name = "act_ShipmentJobFavoriteSearchActions_SearchResultEdit_RowId_10704";
// Senders packsoft customer number
var my_packsoft_customer_nr = "xxx";
// Class of <p> with customer name etc...
var customer_name_class      = ".customer_name";
var customer_address1_class  = ".customer_address1";
var customer_address2_class  = ".customer_address2";
var customer_postcode_class  = ".customer_postcode";
var customer_email_class     = ".customer_email";
var customer_telephone_class = ".customer_telephone";
var customer_order_id_class  = ".customer_order_id";
var customer_names      = new Array();
var customer_address1s  = new Array();
var customer_address2s  = new Array();
var customer_postcodes  = new Array();
var customer_emails     = new Array();
var customer_telephones = new Array();
var customer_order_ids  = new Array();
// Attach the collect_addresses function to a object on the page with addresses
if (window.location.href.indexOf(customer_info_url_base) > -1){
  $(object_class_to_click).click(collect_addresses);
}
// The login page of packsoft online
else if (GM_getValue("trigger")=="1" && $('input[name="act_LoginActions_Login"]')[0]) {
  $('input[name="CompanyLogin"]').val(my_pacsoft_uid);
  $('input[name="UserPass"]').val(my_pacsoft_pwd);
  GM_setValue("trigger", "2");
  setTimeout(function() {$('input[name="act_LoginActions_Login"]').trigger('click');},100);
}
// Packsoft home screen, go to my favorite named Varubrev
else if (GM_getValue("trigger")=="2" && document.location.href.indexOf("Action=act_SystemActions_Body")>-1) {
  GM_setValue("trigger", "3");
  GM_setValue("session_link", document.location.href.split("&")[0].split("?")[1]);
  document.location = "webapp?"+GM_getValue("session_link")+"&Action="+favorite_html_name;  
}
// Fill the first page of the form press next (do while there is addresses left) 
else if (GM_getValue("trigger")=="3" && GM_getValue("no_of_customers")>0 && $('input[name="act_ShipmentJobEdit1Actions_Next"]')[0]) {  
  $('input[name="RECEIVERName"]').val(GM_getValue("customer_names").split("¤")[GM_getValue("no_of_customers")-1]);
  $('input[name="RECEIVERDeliveryAddress1"]').val(GM_getValue("customer_address1s").split("¤")[GM_getValue("no_of_customers")-1]);
  $('input[name="RECEIVERDeliveryAddress2"]').val(GM_getValue("customer_address2s").split("¤")[GM_getValue("no_of_customers")-1]);
  $('input[name="RECEIVERDeliveryZipcode"]').focus(); 
  $('input[name="RECEIVERDeliveryZipcode"]').val(GM_getValue("customer_postcodes").split("¤")[GM_getValue("no_of_customers")-1]);
  $('input[name="RECEIVERDeliveryZipcode"]').blur(); 
  $('input[name="RECEIVERSms"]').focus(); 
  $('input[name="RECEIVERSms"]').val(GM_getValue("customer_telephones").split("¤")[GM_getValue("no_of_customers")-1]);
  $('input[name="RECEIVEREmail"]').val(GM_getValue("customer_emails").split("¤")[GM_getValue("no_of_customers")-1]);
  setTimeout(function() {$('input[name="act_ShipmentJobEdit1Actions_Next"]').trigger("click");},100);
}
// Fill the second page of the form click "lagra" (do while there is addresses left) 
else if (GM_getValue("trigger")=="3" && GM_getValue("no_of_customers")>0 && $('input[name="act_ShipmentJobEdit2Actions_Store"]')[0]) {    
  $('input[name="ShipmentSndReference"]').val(GM_getValue("customer_order_ids").split("¤")[GM_getValue("no_of_customers")-1]);    
  $('select[name="SenderCustNo"]').val(my_packsoft_customer_nr);        
  $('input[name="AddonsNOTSMS"]').attr('checked', true);     
  GM_setValue("no_of_customers", GM_getValue("no_of_customers")-1);
  if (GM_getValue("no_of_customers")==0)
    GM_setValue("trigger", "4");
  setTimeout(function() {$('input[name="act_ShipmentJobEdit2Actions_Store"]').trigger("click");},100);                         
}
// Go to "Lagrade utskrifter"
else if (GM_getValue("trigger")=="4" && $('input[name="act_ShipmentJobEdit1Actions_Next"]')[0]) {    
  GM_setValue("trigger", "0");
  document.location = "webapp?"+GM_getValue("session_link")+"&Action=act_MenuActions_Item&Target=body&ItemHandler=ShipmentJobSearchActions";  
}
// This function collects addresses stores them and then opens packsoft online
// This function is attached to a object on the page with addresses
// It is triggered when the user clicks the object
function collect_addresses() {      
  $(customer_name_class).each(function (i, elem)   { customer_names[i]=$(elem).text().replace("¤",""); });
  $('.customer_address1').each(function (i, elem)  { customer_address1s[i]=$(elem).text().replace("¤",""); });
  $('.customer_address2').each(function (i, elem)  { customer_address2s[i]=$(elem).text().replace("¤",""); });
  $('.customer_postcode').each(function (i, elem)  { customer_postcodes[i]=$(elem).text().replace("¤",""); });
  $('.customer_email').each(function (i, elem)     { customer_emails[i]=$(elem).text().replace("¤",""); });
  $('.customer_telephone').each(function (i, elem) { customer_telephones[i]=$(elem).text().replace("¤",""); });
  $('.customer_order_id').each(function (i, elem)  { customer_order_ids[i]=$(elem).text().replace("¤",""); });
    
  GM_setValue("customer_names", customer_names.join("¤"));
  GM_setValue("customer_address1s", customer_address1s.join("¤"));
  GM_setValue("customer_address2s", customer_address2s.join("¤"));
  GM_setValue("customer_postcodes", customer_postcodes.join("¤"));
  GM_setValue("customer_emails", customer_emails.join("¤"));
  GM_setValue("customer_telephones", customer_telephones.join("¤"));
  GM_setValue("customer_order_ids", customer_order_ids.join("¤"));
    
  GM_setValue("no_of_customers", customer_names.length);
  GM_setValue("trigger", "1");
  alert("Collected " + customer_names.length + " customer addresses.");
  window.open("https://po.unifaun.se");
}