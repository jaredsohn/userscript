// ==UserScript==
// @name           HACKUKDEALS
// @require   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @description    search,junk,cashback,pricecomparison,merchant,comments
// @include        http://www.hotukdeals.com/*
// @version        3.10
// ==/UserScript==


//------ ALL PAGES


// fix misc
jQuery.fn.swapWith = function(to) {
    return this.each(function() {
        var copy_to = $(to).clone(true);
        var copy_from = $(this).clone(true);
        $(to).remove();
       // $(to).replaceWith(copy_from);
        $(this).after(copy_to);
    });
};


$($('a[title="Ask"]')).swapWith($('a[title="Misc"]'));


// Slogan
$('#logo-tagline').text('HACKUKDEALS v3.08');
$('#new-logo-tagline').text('HACKUKDEALS v3.08');

//add the link to the old website
$('<a>').attr({
    href: 'http://www.hotukdeals.com/?tsv=2011-09',
    id: 'linktoold',
    style: 'color:white;' 
}).appendTo('.new-tagline-login-bar');
$('#linktoold').append('*old skin*');


//icons
$(".customise-deals-and-alerts").css('display', 'none');


// Modify Search 
$('<select>').attr({id: 'selectsearch'}).appendTo("#userbar-search");
$('<option>').attr({id: 'hukdsel',value:'2'}).appendTo("#selectsearch");
$('#hukdsel').append("hukd");
$('<option>').attr({id: 'googlesel',value:'1'}).appendTo("#selectsearch");
$('#googlesel').append("google");

$("#selectsearch").change(function() { 
if($("#selectsearch").val()== 1){
// Add google search
$("#userbar-search").attr('action', 'http://www.google.com/search'); 
$("#userbar-search").get(0).setAttribute('action', 'http://www.google.com/search'); 
$("#keywords").attr('name', 'q');
$('<input>').attr({
    type: 'hidden',
    id: 'sitesearch',
    name: 'sitesearch',
   value: 'hotukdeals.com' 
}).appendTo('#userbar-search');
}

if($("#selectsearch").val()== 2){
// Add google search
$("#userbar-search").attr('action', '/search'); 
$("#userbar-search").get(0).setAttribute('action', '/search'); 
$("#keywords").attr('name', 'keywords');;
}

});


//-------if multiple listings page
if($('.m-settings-sidebar').length){


// newsletter
$(".m-newsletter-subscription").css('display', 'none');
//blogs
$(".m-widget-blog").css('display', 'none');
//banner
$(".m-sidebar-banner").css('display', 'none');

//Local deals
$(".m-widget-localized_holder").remove();
$(".m-widget-localized").remove();
$('.s-column-main li a:last[title*="deals"]').css('display', 'none');  

//inline adverts
$(".newsletter-subscription-inline").css('display', 'none');

$(".m-settings-sidebar").css('display', 'none');


    

//Subscribed deals sidebar widget +Followed sidebar (nested load)
$('<div id="followed" style="display:none;"  class="module m-settings-sidebar"><div class="inner"><div class="header"><h3>Recent Activity</h3><div class="body"> <div class="your-tab"> <ul id="loadhere2" class="list"></ul></div></div></div></div></div></div>').appendTo('.s-sidebar .s-sidebar-inner');
$('<div id="subscribed" style="display:none;" class="module m-settings-sidebar"><div class="inner"><div class="header"><h3>Subscribed  Threads</h3><div class="body"> <div class="your-tab"> <ul id="loadhere" class="list"></ul></div></div></div></div></div></div>').appendTo('.s-sidebar .s-sidebar-inner');
var profilelink = "http://www.hotukdeals.com/profile/  .s-profile-deals:nth-child(2) table tbody tr td a:nth-child(3)";    
    $('#loadhere').load(profilelink, function(data){
 
        $('#subscribed a').wrap(  '<li class="subs" />' ); 
  $('#subscribed a').css("text-overflow", "ellipsis").css("overflow","hidden").css("width", "224px").css("white-space","nowrap");     
$('#subscribed .subs a').removeClass("expired-strike"); 
$('#subscribed .header ').css("border-bottom", "none"); 
$('#loadhere').css("border-bottom", "none");
$('#subscribed').css("height", "280px"); 

$('#subscribed').css("display", "none"); 

        
$('#followed').css("height", "600px");
$('#followed').css("height", "600px");
        
    
$('#followed').css("overflow", "auto");
    
$('#followed').css("overflow-x", "hidden");
    
$('#followed').css("overflow-y", "auto");
        
        
        
$('<a class="more-user-activity-count">more activity</a>').appendTo('.s-sidebar .s-sidebar-inner');      

var page = 1;
var profilelink2 = "/widget?w=show_user_activity&page=" + page.toString() + " .individual-user-activity ";
        
//var profilelink2 = "/widget?w=show_user_activity&page=1 .individual-user-activity ";    
$('#loadhere2').load(profilelink2, function(data){  
    
$('#followed .header ').css("border-bottom", "none");   
$('#followed .avatar ').css("display", "none"); 
$('#followed .time ').css("font-size", "60%");    
$('#followed a').css("text-overflow","ellipsis").css("overflow","hidden").css("width","224px").css("white-space", "normal");
$('#loadhere2').css("border-bottom", "none"); 
$('.m-settings-sidebar .header ul li a').css("line-height", "auto").css("height","auto").css("margin", "0").css("padding", "0");     
 $('.individual-user-activity p').css("line-height", "10px");    
 $('.individual-user-activity p').css("width", "200px");       
    
    
//$("#subscribed").fadeIn("fast");    

 
    $("#followed").fadeIn("fast");    

    

});
        
        
    
$(".more-user-activity-count").click(function() {
 page = page + 1;    

    profilelink2 =  "/widget?w=show_user_activity&page=" + page.toString() + " .individual-user-activity ";        
    $('#loadhere2').empty();      
    $('#loadhere2').load(profilelink2, function(data){   
$('#followed .header ').css("border-bottom", "none");   
$('#followed .avatar ').css("display", "none"); 
$('#followed .time ').css("font-size", "60%");    
$('#followed a').css("text-overflow","ellipsis").css("overflow","hidden").css("width","224px").css("white-space", "normal");
$('#loadhere2').css("border-bottom", "none"); 
$('.m-settings-sidebar .header ul li a').css("line-height", "auto").css("height","auto").css("margin", "0").css("padding", "0");     
 $('.individual-user-activity p').css("line-height", "10px");      
$('.individual-user-activity p').css("width", "200px");  
    });
        
        });    
                                         
    
    
    
    
    });

//quick fix for 21/06 bug
$(".m-items-listings-text-only  tbody tr td").css("padding", "5px 2px 5px 0");
    


// If new layout (nested)
if($(".new-tagline-login-bar").length){

  
// If new layout menu bar
if($("#t-content").length){

//Transform categories to horizontal menu     
$('#t-content').css('display', 'inline-block').css('top', '0').css('position','static').css('width', '100%');
$('#t-content li a').css('width', 'auto').css('text-align', 'center').css('display','inline-block');
$('#t-content li a:visited').css('display', 'inline-block').css('width', 'auto');
$('#t-content li').css('display', 'inline-block').css('width', 'auto');

$('#topics-dropdown').attr('id', 'hackedDrop');
$('#t-content').insertAfter('#s-tabs-new');
$('#hide-tools-link').insertAfter('.m-pagination');
$('#show-tools-link').insertAfter('.m-pagination');
$('.current a').append(":  " + $('#t-link').text()  );
$('.current').css('width', '230px').css('margin-right', '5px');
$('#topics-dropdown').css('id', 'something');
$("#t-link").remove();
$("#ld-link").remove();    
$('.label-filter-topics').remove();   
}

}//end if new layout





//else for individual pages
}
else
{




//remove badges
$(".badges").css('visibility', 'hidden');
$(".m-listing-user-details .footer").css('visibility', 'hidden');
// Fix avatars
$(".crossed-out  .avatar-badges-container").css('display', 'none'); 

//Remove buttons
$(".twitter-tweet-button").remove();
$(".facebook-like-button").remove();
$(".google-plus-button").remove();

  
// If new layout menu bar
if($(".new-tagline-login-bar").length){

//Fix Top Pagination in new layout
//$('.redesign-pagination').clone().prependTo('#redesign-comment-list-header');




//Unhide Comment Actions on new layout and hearts
$('.comment-actions').attr('class', 'hackedComment');
$(".hackedComment").css('display', 'block').css('float', 'right');;
$(".hackedComment a").addClass('hAction');
$(".hackedComment").addClass('hAction');
$(".hackedComment span").addClass('hAction');
$(".hAction").css('padding-left', '6px').css('padding-right', '6px').css('text-transform','uppercase').css('border-left', '0px solid #A29282').css('padding-left','6px').css('font-size', '10px');
$('.you-like').attr('class', 'nohomo');



//Top Comments animated hide and show
$("#redesign-top-comment-list").css('display', 'none');
  $("#redesign-comment-list-container h2").click(function () {
    if ($("#redesign-top-comment-list").is(":hidden")) {
      $("#redesign-top-comment-list").slideDown("slow");
    } else {
      $("#redesign-top-comment-list").slideUp();
    }
});
}


//------ DEALS PAGE
// Identfy if deal page
if ($(".gotodeal").length)  {

//Cleaning
//Dealspawn 
$(".dealspwn-item-feed").css('display', 'none');
//mobot 
$(".mobot-item-feed").css('display', 'none');
$(".pepper-links").css('display', 'none');


//identify shop
var shoptitle = " ";
shoptitle = $(".s-item-listing-detailed .tags a").attr("title");
shoptitle = shoptitle.slice(0, -6); 


//get shop linkname
linkname = $(".s-item-listing-detailed .tags a").attr("href");
linkname = linkname.slice(32, linkname.length); 

//get review link
var reviewlink = "http://www.hotukdeals.com/reviews/" + linkname;


// add review container
$('<p>').attr({
    id: 'reviewContainer' 
}).prependTo(".tags");

// add shop review link
$('<a>').attr({
    id: 'reviews' 
}).prependTo("#reviewContainer");

$('#reviews').attr('href', reviewlink);
$('#reviews').text(shoptitle + " reviews   ");

// load review summary
$('<span>').attr({
    id: 'loadedreview' 
}).appendTo("#reviewContainer");
var reviewpiclink = reviewlink + " .review-count";
$('#loadedreview').load(reviewpiclink);
$('<br><br>').appendTo('#reviewContainer');



//add links to topcashback
var tcb= "http://www.topcashback.co.uk/search/merchants/?s=" + shoptitle;
$('<a>').attr({
    id: 'TCBLink'     
}).appendTo('.s-item-listing-detailed .side');
$('#TCBLink').append("Top CashBack");
$('#TCBLink').attr('href', tcb);
$('<br><br>').appendTo('#TCBLink');


//add links to quidco 
var quidco = "http://www.quidco.com/search/retailers/?login=Search&search=" + shoptitle;
$('<a>').attr({
    id: 'QUIDLink'     
}).appendTo('.s-item-listing-detailed .side');
$(' #QUIDLink').append("Quidco");
$(' #QUIDLink').attr('href', quidco);
$('<br><br>').appendTo('#QUIDLink');




//identify deal product
var itemname = "";
itemname = $(".item-listing h1 a").text();
var stopper = itemname.indexOf('');
if(stopper>3){
itemname= itemname.substring( 0, stopper ); 
}



// add link to google search
var googleprod = "http://www.google.co.uk/search?hl=en&tbm=shop&q=" + itemname;
$('<a>').attr({
    id: 'GOOGLELink'     
}).appendTo('.s-item-listing-detailed .side');
$('#GOOGLELink').append("Google Shopping");
$('#GOOGLELink').attr('href', googleprod);
$('<br><br>').appendTo('#GOOGLELink');


if ($.trim(shoptitle) == 'Amazon') {

// Add camelcamelforAmazon
var CAMELprod = "http://uk.camelcamelcamel.com/products?sq=" + itemname;
$('<a>').attr({
    id: 'CAMELLink'     
}).appendTo('.s-item-listing-detailed .side');
$('#CAMELLink').append("CamelCamelCamel");
$('#CAMELLink').attr('href', CAMELprod);
$('<br><br>').appendTo('#CAMELLink');

// add nectar 
$('<a>').attr({
    id: 'Nectar'     
}).appendTo('.s-item-listing-detailed .side');
$('#Nectar').append("Nectar Points");
$('#Nectar').attr('href',    "http://www.nectar.com/shop-at/amazon.eshops" );
        

}


} /// End if deal page

}// end individual deal




//-------Profile page

//  fix current tab width
if ($(".s-profile-sidebar").length)  {
$('.current').css('width', '180px');
$(".m-profile-sidebar-content:eq(3)").css('display', 'none');
}





//floating sidebar always in view
//$('.s-sidebar .s-sidebar-inner').css({ "width":"inherit" });
//
//  var elementPosTop = $('.s-sidebar .s-sidebar-inner').position().top;
//        $(window).scroll(function()
//        {
//            var wintop = $(window).scrollTop(), docheight = $(document).height(),winheight // = $(window).height();
//            //if top of element is in view
//            if (wintop > elementPosTop)
//            {
//$('.s-sidebar .s-sidebar-inner').css({ "position":"fixed", "top":"10px" });
//         
//}
 //           else
  //          {
 //               //reset back to normal viewing
//                $('.s-sidebar').css({ "position":"inherit" });
//       $('.s-sidebar .s-sidebar-inner').css({ "top":"inherit" });
//      $('.s-sidebar .s-sidebar-inner').css({ "right":"inherit" });            
//            }
//        });