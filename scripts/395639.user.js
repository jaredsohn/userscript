// ==UserScript==
// @name       Mobile.de Autos markieren und ausblenden
// @namespace  
// @version    0.1
// @description  This script is developed to to hide and mark cars in mobile.de.
// @match      http://suchen.mobile.de/*
// @copyright  2012+, You
// ==/UserScript==

var prefix = "mobileCarVars:";
var hideVisitedCars = GM_getValue(prefix + "filter");
var id;

function getCar(id){
    return GM_getValue(prefix + id);
};

function setCar(id, value){
    return GM_setValue(prefix + id, value);
};

function delCar(id){
    GM_deleteValue(prefix + id);
};


unsafeWindow.carVisited = function(id){
    setCar(id, 1);
    $("#btn_"+id).attr("onclick", "carUnVisit(" + id + ")");
    $("#btn_"+id).attr("value", "Besucht");
    $("#btn_"+id).attr("style", "float:right;background: #fff url(./../../resources/images/sprites/repeat_x_sprite.png) 0 bottom repeat-x;");
};

unsafeWindow.carUnVisit = function(id){
    delCar(id);
    $("#btn_"+id).attr("onclick", "carVisited(" + id + ")");
    $("#btn_"+id).attr("value", "Als Besucht markieren");
    $("#btn_"+id).attr("style", "float:right;background-color: greenyellow;background-image:none;");
};

unsafeWindow.FilterToggle = function(){
    if(GM_getValue(prefix + "filter") == 1){
        GM_setValue(prefix + 'filter', 0);
        $("#btn_filter").attr("value", "Besuchte Autos ausblenden");
    }else{
        GM_setValue(prefix + 'filter', 1);
        $("#btn_filter").attr("value", "Besuchte Autos einblenden");
    }    
    location.reload();    
};

// remove sponsored cars
$(".sponsored").hide();

// get all car container
var cars = $(".listEntry");

// add filter button
if(hideVisitedCars == 1){
	$(".sort-box").append('<input id="btn_filter" class="button" type="button" style="float:right;background-color: greenyellow;background-image:none;" value="Besuchte Autos einblenden" onclick="FilterToggle();">');    
}else{
    $(".sort-box").append('<input id="btn_filter" class="button" type="button" style="float:right;background-color: greenyellow;background-image:none;" value="Besuchte Autos ausblenden" onclick="FilterToggle();">');    
}

// process all car containers
cars.each(function(i, obj) {
    
    // get car id
    id = $(cars[i]).find(".parkCompare input").prop("id")
    
    // add visit button
    $(cars[i]).find(".vehicleDetails").find(".parking").append('<input id="btn_' + id + '" class="button" type="button" style="float:right;background-color: greenyellow;background-image:none;" value=""" onclick="">');       
    
    
    if(getCar(id) == 1){
    	// if car is already visited    
        if(hideVisitedCars == 1){
            // hide container if filter is on
    		$(cars[i]).find(".vehicleDetails").parent().hide();
        };
        // show unvisit button
   		$("#btn_"+id).attr("onclick", "carUnVisit(" + id + ")");
    	$("#btn_"+id).attr("value", "Besucht");
        $("#btn_"+id).attr("style", "float:right;background: #fff url(./../../resources/images/sprites/repeat_x_sprite.png) 0 bottom repeat-x;");
    }else{
        
        // if car is already not visited 
        $("#btn_"+id).attr("onclick", "carVisited(" + id + ")");
    	$("#btn_"+id).attr("value", "Als Besucht markieren");
        $("#btn_"+id).attr("style", "float:right;background-color: greenyellow;background-image:none;");
    };    
    
});


