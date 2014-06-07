// ==UserScript==
// @name           TF2Outpost Backpack Value
// @version        1.0
// @description    Shows how rich they are
// @include        http://www.tf2outpost.com/*
// @run-at         document-end
// ==/UserScript==


$('.trade').each(function ()
{
  var x = this;
  href = $(this).find('.details a').attr("href");
  $.post(href, function (data)
  {
    $.post($(data).find(".details").find('a').eq(0).attr('href'), function(data)
           {
               sid = $(data).find('.tools').eq(1).find('[href^=steam]').attr('href').split('/')[4];
               GM_xmlhttpRequest({
                   method: "GET",
                   url: "http://backpack.tf/api/IGetUsers/v2/?steamids="+sid+"&format=json",
                   onload: function(response)
                   {
                       buds = JSON.parse(response['responseText'])['response']['players'][0]['backpack_value']/(7*20);
                       
                       ib = 256 - (buds*15);
                       db = 256 - ib;
                       
                       
                       if(ib < 0)
                        ib = 0;
                       if(db < 0)
						db = 0;
                       
                       if(ib > 255)
                      	ib = 255;
                       if(db > 255)
                       	db = 255;
                       
                       ib = Math.ceil(.3*ib);
                       db = Math.ceil(.3*db);
                    
                       
                       $(x).append("<div>Player worth: "+buds.toFixed(1)+" buds</div>");

                       $(x).find('.contents').css('background-color', 'rgb('+db+','+ib+','+20+')');
                   }
               });

           });
  });
});
