// ==UserScript==
// @name       Simplenote Minimalist & Tag-List
// @namespace  http://use.i.E.your.homepage/
// @version    0.3
// @description  Adding enhancements and fixes for the UI and UX of the web app 'simple-note.appspot.com'
// @match      https://simple-note.appspot.com/*
// @copyright  2013+, Abidan Rivera
// ==/UserScript==

// Only do anything if jQuery isn't defined
if (typeof jQuery == 'undefined') 
{
    if (typeof $ == 'function') 
    {
        // warning, global var
        thisPageUsingOtherJSLibrary = true;
    }

    function getScript(url, success) 
    {
        var script = document.createElement('script');
        script.src = url;

        var head = document.getElementsByTagName('head')[0];
        var done = false;

        // Attach handlers for all browsers
        script.onload = script.onreadystatechange = function() 
        {
            if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) 
            {
                done = true;
                // callback function provided as param
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            };
        };
        head.appendChild(script);
    };

    // Original link: 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js'
    // new link: http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
    getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', function() 
              {
                  if (typeof jQuery=='undefined') 
                  {
                      // Super failsafe - still somehow failed...
                  }
                  else 
                  {
                      // jQuery loaded! Make sure to use .noConflict just in case
                      fancyCode();
                      if (thisPageUsingOtherJSLibrary) 
                      {
                          // Run your jQuery Code
                          main();
                      } 
                      else 
                      {
                          // Use .noConflict(), then run your jQuery Code
                      }
                  }
              }
              );

} 
else 
{
    // jQuery was already loaded
    // Run your jQuery Code
    // ---- ON Document ready:
    main();
};






//========================================================================//
//========================================================================//
function main()
{
    $(document).ready(function(){
        
        // Make better use of space in outer divs:
        //debugger;
        
        // -- COLORS::: Easy on the eye :)
        $('.app').css('background','#C0C0C0');
        $('.sidebar').css('background','#C0C0C0');
        
        // -- Container margins:        
        $('body div.wrapper').css('left','5px');
        $('body div.wrapper').css('right','5px');
        
        $('#fusion_ad').css('display','none'); // Don't know what is this... an add container???
        
        // -- Note List Items [ padding ]
        // ...we need to wait for the list to be populated first by 'Simplenote' App.
        window.setTimeout(function(){noteListWork();},2000); // first try
        window.setTimeout(function(){noteListWork();},4000); // second try :)
        
        // -- Note Details
        $('#txtarea').css({'font-size':'10px',
                           'background-color':'rgb(77, 89, 101)',
                           'color':'rgb(194, 214, 196)','text-shadow':'0 0 0',
                           'font-size':'12px'
                          });
        
        // -- Note Sidebar
        $('div.toolbar input').css('width','146px');
        $('div.toolbar ul.left-tools').css('margin','0 0 0 205px');
        $('div.app div.sidebar').css('width','200px');
        
        // Move the notes list panel:
        $('div.sidebar ul.notes').css(
            {
                'left' : '200px',
                'right' : '-290px',
                'top' : '45px'
        	}
        );
        
        // Now lets create the background panel:
        $('div.app div.sidebar').append('<div id="tags_panel"></div>')
        
        // GET/SET HEIGHTS:
        var side_bar_height = $('div.wrapper div.app div.sidebar').height();
        
        // Set css properties for the new panel:        
        $('#tags_panel').css(
            {
                'background' : 'rgb(212, 255, 199)',
                'width' : '200px',
                'height' : side_bar_height - 104,
                'position' : 'absolute',
                'left' : '-1px',
                'top' : '75px',
                'padding' : '0',
                'overflow' : 'auto',
                'z-index' : '5',
                'border' : 'solid gray 1px'
        	}
        );
        
        // taglist css: 
        $('.sideview .popover .menu .taglist').css(
            {
                'position' : 'absolute',
                'width' : '195px',
                'max-height' : side_bar_height - 105,
                'visibility' : 'visible',
                'left' : '30px',
                'top' : '0'
        	}
        );
        
        // Right panels:
        $('div.app div.tagbar').css({'left':'481px','background-color':'rgb(241, 241, 241)'});
        $('div.app div.note').css('left','481px');
        
        // Notify of UI enhancement: (optional)
        $('body').prepend('<div id="enhancer_label_notify">Interface has been enhanced :)</div>');
        // SET CSS:
        $('#enhancer_label_notify').css(
            {
                'position' : 'absolute',
                'width' : '300px',
                'height' : '25px',
                'background' :'rgb(48, 160, 13)',
                'text-align' : 'center',
                'left' : '50%',
                'margin' : '0 0 0 -150px',
                'color' : 'white',
				'border-bottom-left-radius' : '5px',
				'border-bottom-right-radius' : '5px',
                'padding' : '5px 0 0 0'
        	}
        );
        // end of work.
    });
    
    $('div.sidebar .notes li').live('click',function()
                {
                    // background: rgb(17, 89, 160);
                    // color: gray;
                    $(this).find('.note-preview-title').css('color','white');
                    $(this).find('.note-preview-date').css('color','rgba(255, 255, 255, 0.7)');
                    $(this).find('p.note-preview-line').css('color','rgba(255, 255, 255, 0.7)');
                });
    
    // for the window resize
    $(window).resize(function() {
        var side_bar_height = $('div.wrapper div.app div.sidebar').height();
        $('#tags_panel').css('height',side_bar_height - 104);
        $('ul.sideview div.menu ul.taglist').css('max-height',side_bar_height - 105);
    });
    
    function noteListWork()
    {
        //
        //debugger;
        
        $.each($('div.sidebar .notes li'),
               function()
               {
                   if ($(this) != undefined)
                   {
                       // COLORS:::
                       $(this).css(
                           {
                               'background-color' : '#3D4751',
                               'text-shadow' : '0 0 0',
                               'color' : 'rgb(226, 226, 226)',
                               'font-weight' : 'normal'
                           }
                       );
                       $(this).find('.note-preview-date').css('color','gray');
                       
                       // li padding:
                       $(this).css('padding','2px');
                       // title padding/font-size
                       $(this).find('.note-preview-title').css({'width':'auto','color':'rgb(226, 226, 226)','font-weight':'normal'});
                       $(this).find('.note-preview-title').css('padding','0px 45px 0px 0px'); // title padding
                       $(this).find('.note-preview-title').css('font-size','12px'); // title font-size
                       // preview note padding/font-size
                       $(this).find('p.note-preview-line').css('padding','0px 40px 0px 0px'); // preview line padding
                       $(this).find('p.note-preview-line').css('font-size','10px'); // preview line font-size
                   }
               }
               );
        
        // Find selected and do colors:
        $('div.sidebar .notes').find('li.selected').click()
    }
}
