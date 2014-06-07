// ==UserScript==
// @name        Geocache Map
// @namespace   geomapas

// @include     http://www.geocaching.com/map/*
// @include     http://www.geocaching.com/geocache/*
// @include     http://www.geocaching.com/track/*
// @version     1.1

// @grant       none
// ==/UserScript==

jQuery(document).ready(function($) {
    var cords = $('#uxLatLon').text();
    $('.CacheInformationTable').prepend('<iframe  width="100%"  height="450"  frameborder="0" style="border:0"  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBL3ALXmWcuxwsV3csSeBsD9rCUliYZhpc&q=' + cords + '"></iframe>');
    var ghref = $("a:contains('Google Maps')").attr('href');
    $('.CacheDetailNavigation ul').append('<li><a target="_blank" href="' + ghref + '">Google Maps</a></li>');
    var geohref = $("a:contains('Geocaching.com Map')").attr('href');
    $('.CacheDetailNavigation ul').append('<li><a target="_blank" href="' + geohref + '">Geocaching.com Map</a></li>');

    $(document).on('click', '.code', function() {
        $.fancybox({
            width : 1000,
            height : 600,
            autoScale : false,
            padding : 0,
            margin : 0,
            href : "http://coord.info/" + $(this).text(),
            //  scrolling: 'no',
            type : "iframe"
        });
    });

});
//Trackable
jQuery(document).ready(function($) {

    var track_map_url = $("a:contains('View Map')").attr('href');

    console.log(track_map_url);
    $.post(track_map_url, function(data) {
        var get_script = data.split('//<![CDATA[');
        var scode = get_script[3].split('//]]>');
        eval(scode[0]);
      
        var postas='<input type="text" name="code" value="'+$('.CoordInfoCode').text()+'" />';
        $.each(tbStops, function(index, val) {
          
            
          postas = postas+'<input type="text" name="data['+index+'][name]" value="'+val.n+'" />';
          postas = postas+'<input type="text" name="data['+index+'][lat]" value="'+val.ll[0]+'" />';
          postas = postas+'<input type="text" name="data['+index+'][lon]" value="'+val.ll[1]+'" />';
        });
       
        $('<div id="map" style="width:100%; height:450px; margin-bottom:15px;">'+
         '<form id="map_form" style="display:none;" action="http://qr.ite.lt/gc/" target="map_frame" method="post">'+postas+'</form>'+
         '<iframe name="map_frame" id="map_frame" width="100%" height="450" frameborder="0" style="border:0">'+
        '</div>').insertAfter('h2.WrapFix');
         $( "#map_form" ).submit();

        $.each(get_script, function(keys, datt) {
            //console.log(keys);
            // console.log(datt);

        })
    }, 'html')
}); 