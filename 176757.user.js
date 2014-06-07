// ==UserScript==
// @name           Renare blocket.se
// @description    Tar bort reklam och onödig skit från blocket.se
// @include        *blocket.se/*
// @version        2013-08-28 15:00
// ==/UserScript==


// Customizations
GM_addStyle([

   //startsidan
'.fif{display: none !important;}', //Banner överst
'.eas_expander{display: none !important;}',
'.index_980{display: none !important;}',
'.vertical_slider{display: none !important;}', //möterplatsen
'.verticals{display: none !important;}',
'.box{display: none !important;}',
'.motesplatsen{display: none !important;}',
'#new_since_last_time_hidden{display: none !important;}', //nytt sedan sist
'.footer_country{display: none !important;}', //länder längst ner

    
   //annonserimg
// '.box_space{display: none !important;}', //galleriet och reklam mm till högers
'.top_items{display: none !important;}', //överst mötesplatsen, nyheter, väder mm
'#eas_67{display: none !important;}',    
'.triple_banner{display: none !important;}', //till höger shopping, jobb, tips mm
'#last_viewed_container{display: none !important;}', //vänster nytt sen sist
'#latest_search_container{display: none !important;}', //vänster sökningar
'#ehandel_iframe{display: none !important;}', //längst ner lediga jobb
'#service_finder{display: none !important;}', //servicefinder
'.flank-puff{display: none !important;}', //sälja bostad höger
'.mobile_kill{display: none !important;}', //tips tryggare bilaffär vänster   

    
   //annons
'#right_bar_campaigns{display: none !important;}', //höger reklam
'#right_bar_campaigns{display: none !important;}', //reklam över
'#motesplatsen_list_view{display: none !important;}', //mötesplatsen
'#news{display: none !important;}', //nyheter väder
'#triple_banner_bottom_vi{display: none !important;}', //blocket shopping
'.car_extradata_below_placement{display: none !important;}', //surrendo försäkring
'.car_extradata_below{display: none !important;}',
'.index_980{display: none !important;}',
'.index_980{display: none !important;}',
'.index_980{display: none !important;}',

    
   //shopping
'.eas-wrapper{display: none !important;}', //banner överst
'.eas-wrapper eas-wrapper-above-spiral-large{display: none !important;}', //reklam över
'.eas-wrapper-above-spiral-large{display: none !important;}', //reklam över
    
    
].join(''));