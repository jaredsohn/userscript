// ==UserScript==
// @name           tupa_maps
// @namespace      tupa
// @include        http://w1.tupagame.com/maps.php*
// @include        http://w2.tupagame.com/maps.php*
// @include        http://w3.tupagame.com/maps.php*
// ==/UserScript==

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery 
}

function createBar(name){
    return $("<p>"+name+"</p>");
}

function getData(){
    data = unsafeWindow.mb.data;
    $.each( data, function(i, n){
        if (data[i]['type2'] == 1 && data[i]['type1'] == 1){
            //alert(data[i]['x']+":"+data[i]['y']);
            name = data[i]['x']+":"+data[i]['y'];
            var bar = createBar(name);
            bar.insertAfter($('#coor')).show();
        }
    }); 
}

$(document).ready(function(){
    setTimeout(getData,3000);
    //alert(unsafeWindow.mb.data)
    //alert('test');
    //alert(unsafeWindow.phpvar_mainUrl);
})