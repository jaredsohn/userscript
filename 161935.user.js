// ==UserScript==
// @name        kudos hit ratio
// @namespace   
// @description kudos hit ratio
// @include     http://archiveofourown.org/*
// @include     https://archiveofourown.org/*
// @version     1.2
// @grant       none
// ==/UserScript==

var jQuery = unsafeWindow.jQuery;

jQuery.noConflict();

jQuery(document).ready ( function() 
{

    jQuery('ol.work li.work').each(function() 
    {
        workshitout(jQuery(this));
    });
  

    jQuery('ol.reading li.reading').each(function() 
    {
        workshitout(jQuery(this));
    });
  

    jQuery('ol.bookmark li.bookmark').each(function() 
    {
        workshitout(jQuery(this));
    });
  
  
    if(jQuery('p.kudos a[href^="/users/theaeblackthorn"]').length > 0 )  // CHANGE THIS TO YOUR USERNAME
    {
        jQuery('.work.meta').css('background-color', '#E5FCC2');
    }
  
  function workshitout(thing) {
        var stats = jQuery('.stats dt', thing);
        var this_parent = thing;
        var kudos_id = 0;
        var hit_id = 0;
        var chp_id = 0;
        var i = 0;
        stats.each(function() 
        {
            if (jQuery(this).html() == 'Kudos:') {
                kudos_id = i;  
            }
            if (jQuery(this).html() == 'Chapters:') {
                chp_id = i;  
            }
            if (jQuery(this).html() == 'Hits:') {
                hit_id = i;  
            }
            i++;
        });
        if (kudos_id != 0 && hit_id !=0 ) {
            var kudos_val = parseInt(jQuery('.stats dd:eq(' + kudos_id + ') a', thing).html());
            var hit_val = parseInt(jQuery('.stats dd:eq(' + hit_id + ')', thing).html());
          var ratio = kudos_val/hit_val;
            var bgcolor = 'ffffff';
            if (ratio < 0.04)
            {
                bgcolor = 'F3FACD';
            } else if (ratio >= 0.04 && ratio < 0.05) 
            {
                bgcolor = 'CDFAD0';            
            } else if (ratio >= 0.05 && ratio < 0.06) 
            {
                bgcolor = 'CDF9FA';            
            } else if (ratio >= 0.06 && ratio < 0.07) 
            {
                bgcolor = 'CDCEFA';            
            } else if (ratio >= 0.07 && ratio < 0.08) 
            {
                bgcolor = 'EBCDFA';            
            } else if (ratio >= 0.08) 
            {
                bgcolor = 'FACDCD';            
            }
            
            
            if (kudos_val >=500 ) {
                thing.css('border','5px solid #000000');
            }
            
            thing.css('background-color', '#' + bgcolor);
            jQuery('h4.heading', thing).html(            jQuery('h4.heading', thing).html() + ' - ' + (~~(ratio*1000))/1000)
        }
  }
 
});