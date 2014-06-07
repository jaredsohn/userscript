// ==UserScript==
// @name        ao3 navigation and lazy tweaks
// @author	    theaeblackthorn
// @namespace	http://noseyhedgehog.co.uk
// @description ao3 navigation and lazy tweaks
// @include     http://archiveofourown.org/*
// @include     https://archiveofourown.org/*
// @include     http://*.archiveofourown.org/*
// @include     https://*.archiveofourown.org/*
// @version     1.4
// @grant       none
// ==/UserScript==

var jQuery = unsafeWindow.jQuery;

jQuery.noConflict();

jQuery(document).ready ( function() 
{
    var username = 'theaeblackthorn'; // CHANGE THIS TO YOUR USERNAME

    if(jQuery('p.kudos a[href^="/users/'+username+'"]').length > 0 )  
    {
        jQuery('.work.meta').css('background-color', '#E5FCC2');
    }


    jQuery(document).on('keydown', function (e) { 
    
        if(!jQuery('textarea').is(":focus") && !jQuery('input').is(":focus")){

            if(e.which == 83 )// if 's' hit, subscribe to this fic
            {
                if (jQuery('#new_subscription').length > 0)
                {
                    jQuery('#new_subscription').submit();
                }
            }
            if(e.which == 75)// if 'k' hit, give this fic kudos
            {
                if (jQuery('#new_kudo').length > 0)
                {
                    jQuery('#new_kudo').submit();
                }
            }
            if(e.which == 77)// if 'm' hit, mark this fic to read later
            {
                var location = jQuery('li.mark a').attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
            }
            if(e.which == 68 )// if 'd' hit, download the mobi version of this
            {
                var location = jQuery('li.download .secondary a').first().attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
            }
            if(e.which == 163 )// if # selected, set to view complete only & english and reload page
            {
                jQuery('#work_search_language_id').val('1');
                var complete_status = jQuery('#work_search_complete').prop('checked');
                 jQuery('#work_search_complete').prop('checked', !complete_status );
                 jQuery('#work_filters').submit();
            }
        
            if(e.which == 37)  // left
            {
             //   alert(location);
               // jQuery('li.previous a').css('background-color','purple');
    
                var location = jQuery('li.previous a').attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
                
            } else if(e.which == 39)  // right
            {   
                var location = jQuery('li.next a').attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
            } else if(e.which == 66)  // if b selected, bookmark the fic
            {   
                jQuery('#bookmark-form form').submit();
                
            } else if(e.which == 87)  // if w selected, show entire fic, not chapters
            {   
                var location = jQuery('li.entire a').attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
                
            } else if(e.which == 67)  // if c selected, show chapters, not entire fic
            {   
                var location = jQuery('li.bychapter a').attr('href');
                if (location!=null)
                {
                    window.location.href = location;
                }
                
            }  
        
        }
    });
 



});
	
