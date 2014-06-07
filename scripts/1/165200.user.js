// ==UserScript==
// @name        Smiles on Hostel
// @description Smilepack for Aphrodita
// @version     0.3
// @author      xandros & sashok
// @license     BSD
// @include     http://hostel.nstu.ru/*
// ==/UserScript==

function main(callback) {
    
    script = document.createElement('script');
    script.textContent = '(' + callback.toString() + ')();';
    document.body.appendChild(script);
}

function script() {
    
    var jquery = function(callback) 
    {
        var wrapper = function() 
        {
          callback();
        }
    
        if(typeof jQuery == 'undefined') 
        { 
          jQs = document.createElement('script');
          jQs.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js');
          jQs.addEventListener('load', wrapper);
          document.body.appendChild(jQs);
        } 
        else 
        {
          wrapper();
        }
    }
    var listen = function() 
    {
        var myscript = function() 
        {
            var $ = window.jQuery;
            var $smiles = "";
            if($('div.infldset>div>fieldset').length)
            {
                $.ajax({
                    dataType: 'html',
                    type:     'POST',           
                    url:      '/ajax/smiles.php', 
                    success:    function($smiles)
                    {
                        var $f = true;
                        var smile_button = '&nbsp;&nbsp;<img id="smile_button" src="http://hostel.nstu.ru/img/smile/smile.gif" title="Смайлики" style="cursor:pointer;" />';
                        var smile_panel = '<div id="smilebox" style="display:none;"><div id="smiles_bg" style="cursor:pointer;position:fixed;width:100%;height:100%;top:0;left:0;background-color:gray;opacity:0.8;z-index:99999;" title="Закрыть смайлики"></div><div id="smiled" class="box" style="position:absolute; left:0; border:none;z-index:999999;">'+$smiles+'</div></div>';
                        $('div.infldset>div>fieldset>a:eq(12)').after(smile_button);
                        $('div.infldset>div>fieldset').append(smile_panel);
                        $("#smile_button").click(function(e) 
                        {
                            $("#smilebox").fadeIn('fast',function()
                            {
                                var $w = $("#smiled").children("table").width();
                                var $m = ((screen.width-$w)/2);
                                $("#smiled").css({'margin-left': $m, 'top': $(window).scrollTop()});
                            }).hide();
    
                            $("#smilebox").fadeIn();
                        });
                        
                        $("#smilebox").click(function(e) 
                        {
                            $(this).fadeOut();
                        });
                        
                        $('img[id="smile"]').click(function(e) 
                        {
                            $textarea = $("textarea.post_text");
                            $textarea.val($textarea.val()+'[img=smile]'+$(this).attr('src')+'[/img]');
                        });
                    },   
                });
            }
        }
        jQuery(document).ready(myscript);
    }
    jquery(listen);
}
main(script);