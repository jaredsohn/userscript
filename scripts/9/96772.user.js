// ==UserScript==

// @name          ImageFapViewer

// @namespace     sdf

// @include       *imagefap.com/pictures/*

// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js

// @require       http://sorgalla.com/projects/jcarousel/lib/jquery.jcarousel.min.js

// ==/UserScript==





/*add jcaroussel css */



GM_addStyle(".jcarousel-skin-tango .jcarousel-container {     -moz-border-radius: 10px;     background: grey;     border: 1px solid #346F97; }  .jcarousel-skin-tango .jcarousel-direction-rtl { 	direction: rtl; }  .jcarousel-skin-tango .jcarousel-container-horizontal {     width: 245px;     padding: 20px 40px; }  .jcarousel-skin-tango .jcarousel-container-vertical {     width: 75px;     height: 245px;     padding: 40px 20px; }  .jcarousel-skin-tango .jcarousel-clip-horizontal {     width:  245px;     height: 75px; }  .jcarousel-skin-tango .jcarousel-clip-vertical {     width:  75px;     height: 245px; }  .jcarousel-skin-tango .jcarousel-item {     width: 75px;     height: 75px; }  .jcarousel-skin-tango .jcarousel-item-horizontal { 	margin-left: 0;     margin-right: 10px; }  .jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-item-horizontal { 	margin-left: 10px;     margin-right: 0; }  .jcarousel-skin-tango .jcarousel-item-vertical {     margin-bottom: 10px; }  .jcarousel-skin-tango .jcarousel-item-placeholder {     background: #fff;     color: #000; }  /**  *  Horizontal Buttons  */ .jcarousel-skin-tango .jcarousel-next-horizontal {     position: absolute;     top: 43px;     right: 5px;     width: 32px;     height: 32px;     cursor: pointer;     background: transparent url(http://sorgalla.com/projects/jcarousel/skins/tango/next-horizontal.png) no-repeat 0 0; }  .jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-next-horizontal {     left: 5px;     right: auto;     background-image: url(prev-horizontal.png); }  .jcarousel-skin-tango .jcarousel-next-horizontal:hover {     background-position: -32px 0; }  .jcarousel-skin-tango .jcarousel-next-horizontal:active {     background-position: -64px 0; }  .jcarousel-skin-tango .jcarousel-next-disabled-horizontal, .jcarousel-skin-tango .jcarousel-next-disabled-horizontal:hover, .jcarousel-skin-tango .jcarousel-next-disabled-horizontal:active {     cursor: default;     background-position: -96px 0; }  .jcarousel-skin-tango .jcarousel-prev-horizontal {     position: absolute;     top: 43px;     left: 5px;     width: 32px;     height: 32px;     cursor: pointer;     background: transparent url(http://sorgalla.com/projects/jcarousel/skins/tango/prev-horizontal.png) no-repeat 0 0; }  .jcarousel-skin-tango .jcarousel-direction-rtl .jcarousel-prev-horizontal {     left: auto;     right: 5px;     background-image: url(http://sorgalla.com/projects/jcarousel/skins/tango/next-horizontal.png); }  .jcarousel-skin-tango .jcarousel-prev-horizontal:hover {     background-position: -32px 0; }  .jcarousel-skin-tango .jcarousel-prev-horizontal:active {     background-position: -64px 0; }  .jcarousel-skin-tango .jcarousel-prev-disabled-horizontal, .jcarousel-skin-tango .jcarousel-prev-disabled-horizontal:hover, .jcarousel-skin-tango .jcarousel-prev-disabled-horizontal:active {     cursor: default;     background-position: -96px 0; }  /**  *  Vertical Buttons  */ .jcarousel-skin-tango .jcarousel-next-vertical {     position: absolute;     bottom: 5px;     left: 43px;     width: 32px;     height: 32px;     cursor: pointer;     background: transparent url(next-vertical.png) no-repeat 0 0; }  .jcarousel-skin-tango .jcarousel-next-vertical:hover {     background-position: 0 -32px; }  .jcarousel-skin-tango .jcarousel-next-vertical:active {     background-position: 0 -64px; }  .jcarousel-skin-tango .jcarousel-next-disabled-vertical, .jcarousel-skin-tango .jcarousel-next-disabled-vertical:hover, .jcarousel-skin-tango .jcarousel-next-disabled-vertical:active {     cursor: default;     background-position: 0 -96px; }  .jcarousel-skin-tango .jcarousel-prev-vertical {     position: absolute;     top: 5px;     left: 43px;     width: 32px;     height: 32px;     cursor: pointer;     background: transparent url(prev-vertical.png) no-repeat 0 0; }  .jcarousel-skin-tango .jcarousel-prev-vertical:hover {     background-position: 0 -32px; }  .jcarousel-skin-tango .jcarousel-prev-vertical:active {     background-position: 0 -64px; }  .jcarousel-skin-tango .jcarousel-prev-disabled-vertical, .jcarousel-skin-tango .jcarousel-prev-disabled-vertical:hover, .jcarousel-skin-tango .jcarousel-prev-disabled-vertical:active {     cursor: default;     background-position: 0 -96px; }.jcarousel-skin-tango .jcarousel-container-horizontal {width: 95%;} .jcarousel-skin-tango .jcarousel-clip-horizontal {width: 100%;} ");



/* function used by the script */



/* returns value from GET parameter given by name */

function getGET( name )

{

  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

  var regexS = "[\\?&]"+name+"=([^&#]*)";

  var regex = new RegExp( regexS );

  var results = regex.exec( window.location.href );

  if( results == null )

    return "";

  else

    return results[1];

}



function showImgViaIndex(i){

    img = $(".thumb:eq("+i+")");

    showImg(img.attr('src'),img.attr('rel'),i);

}



function showImg(thumb,link,index){



    current_pic = index;



    $("#gmGalleryImages").find("img:visible").hide();



    if($("#full_"+index).length==1){

        /*allready loaded so we just show it */

        $("#full_"+index).show();

    } else {

        $.get(link,function(data){



            full = $(data).find("#mainPhoto").attr('src');

            height = document.body.scrollHeight - 100;



            $("<img id='full_"+current_pic+"' height='"+height+"' src='"+full+"'>").appendTo($("#gmGalleryImages"));

        });

    }

}



function setupCallback(){

    /* cleanup the original page */

    $("body").css("background-color","black");

    $("center").remove();

    $(".tnaBarBlueWrap").remove();



    $(".thumb").click(function(){

       showImg($(this).attr('src'),$(this).attr('rel'),$(this).attr('pos'));

    });



    showImgViaIndex(0);



    $('#gmGalleryThumbs').jcarousel();





}



var current_pic;

var total;



$(document).ready(function(){



    $(document).keydown(function(e){

        if(e.keyCode == 37){

            //left

            if(current_pic>0){

                showImgViaIndex(current_pic -1);

            }

        } else if (e.keyCode == 39){

            //right

            if(current_pic<(total-1)){

                showImgViaIndex(current_pic + 1);

            }

        }

    });



    /* first thing first let's move to the ONE page view */

    if(getGET("view")!=2){

        location.href = location.href+"?view=2";

    } else {



        var thumb;

        var link;



        $("body").append("<ul id='gmGalleryThumbs' class='jcarousel-skin-tango'></ul>");

        $("body").append("<div style='text-align:center' id='gmGalleryImages'></div>");

        $("body").append("<div style='position:fixed;left:10;bottom:10;font-size:15px;font-weight:bold;'><a href='javascript:history.go(-2)'>Back to browsing</a></div>");



        /* now we identify all the thumbs */

        total = $("#gallery").find("img").length;



        $("#gallery").find("img").each(function(index){

            thumb = $(this).attr('src');

            link = "http://www.imagefap.com"+$(this).parent().attr('href');

            $("#gmGalleryThumbs").append("<li><img class='thumb' width=75 pos='"+index+"' rel='"+link+"' src='"+thumb+"' /></li>");

        });



        setupCallback();



    }





});
