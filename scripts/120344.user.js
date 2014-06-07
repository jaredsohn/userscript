// ==UserScript==
// @name          Facebook Ticker/Sidebar Remover
// @author        bwhite94
// @include       *.facebook.com/*
// @version       1.2.5
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==
// 
// If you find any bugs, please contact me at fancy.fire(at)yahoo
// Or feel free to create a discussion on the UserScripts page


// DEV NOTES:
// Currently, only hides ads and feed ticker at page load.. needs a work-around
// Clicking links displays ads and embedded feed ticker (hides upon page-refresh)

// check if we're on facebook
    if($('#blueBar').length != 0){

        $(document).ready(function(){

                        // check globals
                        var display_ticker = GM_getValue("display_fbfeed", "0");
                        if(display_ticker == 0){
                            $("#pagelet_rhc_ticker").hide();
                            $("#pagelet_ticker").hide();
                            $(".fbSidebarGripper").hide();
                            display_ticker = 'checked="yes"';
                            }else{
                            display_ticker = '';
                            }
                            
                        var hide_ads = GM_getValue('hide_ads', '1');
                        if(hide_ads == 1){
                            $('.ego_column').hide();
                            hide_ads = 'checked="yes"';
                        }
                        
        // Define functions
        function hideTick(){
            $("#pagelet_rhc_ticker").hide();
            $("#pagelet_ticker").hide();
            $(".fbSidebarGripper").hide();
            $(".fbChatSidebarBody").css('height','100%');
            $(".fbChatSidebarBody").css('margin-bottom','25px');
            GM_setValue("display_fbfeed","0");
        }
            
        function showTick(){            
            $("#pagelet_rhc_ticker").show();
            $("#pagelet_ticker").show();
            $(".fbSidebarGripper").show();
            GM_setValue("display_fbfeed","1");
        }
        
        function hideSidebar(){
            // hide sidebar
            if(GM_getValue('display_sidebar','1') == 1){
                $('#pagelet_sidebar').hide();
                GM_setValue('display_sidebar','0');
                hide_sidebar = 'checked="yes"';
            }else{
                $('#pagelet_sidebar').show();
                GM_setValue('display_sidebar','1');
                hide_sidebar = '';
            }
        }
        
        // initial check for sidebar hiding on-page-load
        var display_sidebar = GM_getValue('display_sidebar','1')
        if(display_sidebar == 0){
            $('#pagelet_sidebar').hide();
            hide_sidebar = 'checked="yes"';
        }else{
            hide_sidebar = '';
        }
        

        //create control panel
        $("<style type='text/css'>  .cfgopt{padding:3px; font-size:15px;}  </style>").appendTo('body');
        $('body').append('<div id="control_panel" style="padding:5px; border:2px solid #FF9933; background-color:#FFCC66; position:fixed; bottom:3px; left:45%; zIndex:100;"></div>');
        $('#control_panel').html('<a id="cpsetting"><img src="http://i.imgur.com/U4M4n.png" width="11px" height="11px"></a>');
        
        // place settings div and style
        var cpheight = $('#control_panel').outerHeight();
        cpheight = cpheight + 3 + 3;        
        $('body').append('<div id="minimize" style="padding-top:3px; padding-bottom:3px; border:2px solid #FF9933; background-color:#FFCC66; position:fixed; bottom:' + cpheight + 'px; width:200px; left:38%; zIndex:100; display:none"></div>');   
        $('#minimize').html('<div id="minleft""></div><div id="minright"></div>\
            <hr width="100%" style="clear:both; width:80%; background-color:#FF9933;">\
            <center><a href="http://bit.ly/vDgF0z" title="This link will send you to the install page of the script." target="_blank">[Update]</a> | \
            <a href="http://bit.ly/tc1pUC" title="More honest ratings, means more installs." target="_blank">[Rate]</a> | \
            <a href="http://bit.ly/vqOBSU" title="The script\'s about page. Holds patch log, etc.">[About]</a></center>');
        
            // populate settings col css
            $('#minleft').css({'float':'left',
                'width':'145px',
                'line-height':'20px',
                'border-right':'1px solid #FF9933',
                'text-align':'right',
                'padding-right':'5px'});
            $('#minright').css({'float':'right',
                'width':'45px',
                'line-height':'20px',
                'text-align':'left',
                'padding-left':'2px'});
            
            // populate left col settings
            $('#minleft').html('<b><u>Hide Elements</u></b>:<br/>\
                Always Minimize Feed Ticker:<br/>\
                Hide Ads:<br/>Hide Sidebar:');
            
            //populate right col settings
            $('#minright').html('<br/><input type="checkbox" id="hide_ticker" ' + display_ticker + '><br/>\
                <input type="checkbox" id="hide_ads" ' + hide_ads + '><br />\
                <input type="checkbox" id="hide_sidebar" '+ hide_sidebar +'>');

                        // If ads are hidden
                        $('#hide_ads').bind('click',function(){
                            $('.ego_column').toggle();
                            if(GM_getValue('hide_ads') == 0){
                                GM_setValue('hide_ads','1');
                            }else{
                                GM_setValue('hide_ads','0');
                            }
                        });
                        
                        // If ticker checkbox is clicked
                        $('#hide_ticker').bind('click',function(){
                            if(GM_getValue('display_fbfeed') == 0){
                                showTick();
                            }else{
                                hideTick();
                            }
                        });
                        
                        // if sidebar checkbox clicked
                        $('#hide_sidebar').bind('click',hideSidebar);
            
        // display minimize options
        $('#cpsetting').bind('click',function(){
            $('#minimize').slideToggle();
        });
            
    // end main function
    });

}