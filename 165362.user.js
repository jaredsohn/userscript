// ==UserScript==
// @name       room draw enhancer
// @version    1.41
// @grant      none
// @source     https://userscripts.org/scripts/review/165362.js
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @match      http://my.pomona.edu/ics/applications/cus/roompicks/default.aspx
// @copyright  2013, Luke Sedney
// ==/UserScript==
 
// short is from room draw page, long is from room review url
var names = [
{ short:"CL-I", long:"clarki"},
{ short:"CL-V", long:"clarkv"},
{ short:"N-CL", long:"nortonclark"},
{ short:"POM", long:"pomonahall"},
{ short:"SMI", long:"smiley"},
{ short:"SNTG", long:"sontag"},
{ short:"GIBS", long:"gibson"},
{ short:"HAR", long:"harwood"},
{ short:"WIG", long:"wig"},
{ short:"C245", long:"cottage245"},
{ short:"C241", long:"cottage241"},
{ short:"LWRY", long:"lawry"},
{ short:"MUDD", long:"muddblaisdell"},
{ short:"BLSD", long:"muddblaisdell"},
{ short:"WALK", long:"walker"}];
 

// results from these dorms will not be shown
// example:
// var nope = ["LWRY", "MUDD"];
var nope = [];
if (nope.length > 0){
    $("body").prepend( "<p> <br> buildings hidden: " + nope.toString() + "<\p>");
}

// hide labels
$("tr th").hide();    
$("tr td:first-child").hide();

var last_dorm = "";
var full_name = "";
// each room has its own table   
$("table").each(function( index, element ) {
    // find what dorm the room is in
    var cur_dorm = $("tr td:first-child", element).text();
    nope.map( function (word) {
        if (cur_dorm.indexOf(word) !== -1 ){
            $(element).hide();
        }
    })
 
    // make a section for each building
    if ($(element).is(":visible")){
        if (last_dorm != cur_dorm){
            for (var i = 0; i < names.length; i++){
                if(cur_dorm.indexOf(names[i].short) !== -1){
                    full_name = names[i].long;
                }
            }
            // label the section
            if (cur_dorm.indexOf("BLSD") !== -1){
                $(element).before( "<p style='clear:both'> <br>" + "blaisdell" + "<\p>" );
            } else if (cur_dorm.indexOf("MUDD") !== -1){
                $(element).before( "<p style='clear:both'> <br>" + "mudd" + "<\p>" );
            } else {
                $(element).before( "<p style='clear:both'> <br>" + full_name + "<\p>" );
            }
        }

        // find link to housing review page
        var room = $("tr td:nth-child(2)", element).text();
        var floor = room.charAt(0);
        // need to special case some dorms
        var number = room;
        switch(full_name){
            case "walker":
                if(room<700){
                    floor = "1";;
                } else {
                    floor = "2";
                }
                break;
            case "clarkv":
                if (floor === "S" && room.match(/\d+/) < 10){
                    floor = "1";
                } else if (floor === "S"){
                    floor = "2";
                } else if (room.match(/\d+/) < 450){
                    floor = "1";
                } else {
                    floor = "2";
                }
                break;
            case "nortonclark":
                if (number < 24){
                    floor = "1";
                    number = room.replace(/^0+/, '');
                } else if (number < 35){
                    floor = "2";
                    number = room.replace(/^0+/, '');
                }
                break;
            case "lawry":
                floor = room.charAt(1);
                break;
            case "gibson":
                floor = 1;
                break;
            case "cottage245":
                floor = 1;
                break;
            case "cottage241":
                floor = 1;
                break;
            case "harwood":
                if (number < 100){
                    floor = "0";
                    number = room.replace(/^0+/, '');
                }
                break;
            case "wig":
                if (number < 100){
                    floor = "0";
                }
                break;
            case "muddblaisdell":
                if (number < 100){
                    floor = "0";
                    number = room.replace(/^0+/, '');
                }
                break;
        }

        var url = "http://aspc.pomona.edu/housing/browse/" + full_name + "/" + floor + "/" + number;
        // insert the link
        $("tr td:nth-child(2)", element).replaceWith("&nbsp; <a href=" + url + ">" + room + "</a> &nbsp;");
        if (url == ""){
            console.log("none found: " + cur_dorm)
        }
    last_dorm = cur_dorm;
    }
});