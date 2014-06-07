// ==UserScript==
// @name           TripIt Itinerary Colours
// @namespace      #FelixRohrbach
// @description    For users of Tripit.
// @include        *www.tripit.com/*
// @grant       none
// @version        1.0.0
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

var colourParts = function () {
$('img.type_image.type_image_air').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_car').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_rail').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_cruise').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_transport').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_transport_ground').parent().parent().css("border-left","10px solid #406DCC");
$('img.type_image.type_image_transport_ferry').parent().parent().css("border-left","10px solid #406DCC");

$('img.type_image.type_image_map').parent().parent().css("border-left","10px solid #299708");
$('img.type_image.type_image_directions_driving').parent().parent().css("border-left","10px solid #299708");
$('img.type_image.type_image_note').parent().parent().css("border-left","10px solid #299708");

$('img.type_image.type_image_lodging').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_activity').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_activity_meeting').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_activity_concert').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_activity_theatre').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_activity_tour').parent().parent().css("border-left","10px solid #E96C00");
$('img.type_image.type_image_restaurant').parent().parent().css("border-left","10px solid #E96C00");
}
colourParts();