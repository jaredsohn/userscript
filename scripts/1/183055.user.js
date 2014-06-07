// ==UserScript==
// @name       Dropbox Grid View Style
// @namespace  http://use.i.E.your.homepage/
// @version    1.2
// @description  Grid style view for dropbox :)
// @match      https://www.dropbox.com/home/Photos
// @match      https://www.dropbox.com/home/type-here-any-folder-name-you-want-grid-style
// @match      https://www.dropbox.com/home/type-here-any-folder-name-you-want-grid-style
// @copyright  2012+, You
// ==/UserScript==

// Change Log:
/*
v. 1.1 Initial release
v. 1.2 Fixes and enhancements. Ready for public use :)
*/

function dpbx(){
    
    var new_source_url = "";
    
    $j.each($j(".thumbnail"), function(index) {
        // build high-resolution img url:
        new_source_url = $j(this).attr("data-src").replace('jpeg/32x32/1/','jpeg/32x32/3/') + "?size=320x240";
        
        // set image source url to the new high-res:
        $j(this).attr('src',new_source_url );
    });
    //========== CSS Fixes:::
    
    $j('.browse-file').css({
        display: 'inline-block',
        border: 'solid rgb(204, 204, 204) 0.1em',
        'border-radius': '8px',
        margin: '5px',
        width: '165px',
        height: '250px',
        cursor: 'pointer'
    });
    
    $j('.filename-col').css({
        float: 'none ',
        position: 'relative',
        width: '100%',
        margin: '0px',
        padding: '0px',
        height: '225px',
        'word-wrap': 'break-word',
        cursor: 'pointer'
    });
    
    $j('.filename-col img').css({
        width: 'auto',
        'max-width': '100%',
        'max-height': '180px',
        height: 'auto',
        display: 'block',
        float: 'none'
    });
    
    $j('.filename-link').css({
        color: '#406072',
        'font-size': '11px'
    });
    
    $j('.sprite.sprite_web.s_web_folder_32.icon').css({
        display: 'block',
        float: 'none',
        height: '32px',
        'margin-bottom': '100px'
    });
    
    // Hide the 'file type' text:
    $j('.kind').css('display','none');
    
    // Modified date-time fixes:
    $j('.modified').css({
        border: 'solid rgb(190, 190, 190) 0.1em',
        padding: '0 0.1em 0 0.1em',
        color: 'gray',
        margin: '0px auto',
        width: '125px',
        'text-align': 'center',
        height: '16px',
        'font-size': '11px',
        'border-radius': '8px',
        background: 'rgb(220, 224, 226)',
        cursor: 'pointer'
    });
    
    $j('.modified-time').css({
        display: 'block',
        margin: '-8px 0 0 0',
        height: '16px',
        padding: '0px',
        'vertical-align': 'text-top',
        cursor: 'pointer'
    });
    
    
    
    // HOVER effects ::: extra:
    $j( ".browse-file" ).hover(
        function() {
            $j(this).css('border-color','rgb(46, 109, 158)');
  		}, function() {
    		$j(this).css('border-color','rgb(204, 204, 204)');
  		}
	);
    
    // On demand - reload script / choose grid size:    
    $j('body').prepend('<div class="dpbx_btn_hover" id="dpbx_grid_view">Reload Grid View Style</div>');    
    $j('#dpbx_grid_view').css(
        {
            display: 'block',
            position: 'fixed',
            width: '150px',
            height: '20px',
            top: '3px',
            left: '0px',
            'margin-left': '10px',            
            'z-index': '999',
            background: 'rgb(0, 112, 255)',
            color: 'rgb(159, 233, 252)',
            padding: '1px 3px',
            'border-radius': '4px',
            'text-align': 'center',
            cursor: 'pointer'
        }
    );    
    $j('#dpbx_grid_view').click(
        function()
        {
            dpbx();
        }
    );
    //
    
    $j('body').prepend("<div class='dpbx_btn_hover' id='dbpx_sm_grid'>Small Grid</div>");  
    $j('#dbpx_sm_grid').css(
        {
            display: 'block',
            position: 'fixed',
            width: '100px',
            height: '20px',
            top: '26px',
            left: '0px',
            'margin-left': '10px',            
            'z-index': '999',
            background: 'rgb(0, 112, 255)',
            color: 'rgb(159, 233, 252)',
            padding: '1px 3px',
            'border-radius': '4px',
            'text-align': 'center',
            cursor: 'pointer'
        }
    );     
    $j('#dbpx_sm_grid').click(
        function()
        {
            small_grid_img();
        }
    );
    
    $j('body').prepend("<div class='dpbx_btn_hover' id='dbpx_big_grid'>Big Grid</div>");
    $j('#dbpx_big_grid').css(
        {
            display: 'block',
            position: 'fixed',
            width: '100px',
            height: '20px',
            top: '49px',
            left: '0px',
            'margin-left': '10px',            
            'z-index': '999',
            background: 'rgb(0, 112, 255)',
            color: 'rgb(159, 233, 252)',
            padding: '1px 3px',
            'border-radius': '4px',
            'text-align': 'center',
            cursor: 'pointer'
        }
    );    
    $j('#dbpx_big_grid').click(
        function()
        {
            big_grid_img();
        }
    );
    
    // Buttons hover effect:
    $j( ".dpbx_btn_hover" ).hover(
        function() {
            $j(this).css('background-color','rgb(94, 164, 255)');
  		}, function() {
    		$j(this).css('background-color','rgb(0, 112, 255)');
  		}
	);
    //-------[ end.//
}

// Set grid height:
function small_grid_img()
{
    $j('.filename-col img').css({
        width: 'auto',
        'max-width': '100%',
        'max-height': '100px',
        height: 'auto',
        display: 'block'
    });
    $j('.filename-col').css({
        height: '145px'
    });
    $j('.browse-file').css({
        height: '170px'
    });
    $j('.sprite.sprite_web.s_web_folder_32.icon').css({
        'margin-bottom': '20px',
        width: '100%',
        height: '32px'
    });
}

function big_grid_img()
{
    $j('.filename-col img').css({
        width: 'auto',
        'max-width': '100%',
        'max-height': '180px',
        height: 'auto',
        display: 'block'
    });
    $j('.filename-col').css({
        height: '225px'
    });
    $j('.browse-file').css({
        height: '250px'
    });
    $j('.sprite.sprite_web.s_web_folder_32.icon').css({
        'margin-bottom': '100px',
        width: '100%',
        height: '32px'
    });
}

// Set a timer to wait for jQuery:
function start()
{
    setTimeout(function(){dpbx();},3000);
}

if(window.attachEvent) {
    window.attachEvent('onload', start());
} else {
    if(window.onload) {
        var curronload = window.onload;
        var newonload = function() {
            curronload();
            start();
        };
        window.onload = newonload;
    } else {
        window.onload = start();
    }
}
