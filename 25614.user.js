// ==UserScript==
// @name           Hotmail HTML Editor
// @namespace      Hotmail HTML Editor
// @include        http://by101w.bay101.mail.live.com/mail/InboxLight.aspx?n=435456125
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() 
{
  if(typeof unsafeWindow.jQuery == 'undefined') 
  { 
    window.setTimeout(GM_wait,100); 
  }
  else 
  { 
    $ = unsafeWindow.jQuery; letsJQuery(); 
  }
}
GM_wait();
          
// All your GM code must be inside this function
function letsJQuery() 
{    
  $('iframe#dapIfM0').hide();
  $('iframe#dapIfM0').remove();
                  
  $(document).ready(function() 
  {      
    function set_button(p_type)
    {
      if (p_type == 'code')
      {        
        v_button.find("img").css("background-image",$('#SaveDraft img').css("background-image"));        
        v_button.find("img").css("background-position","-64px 0");
        v_button.find("span").text("HTML Code");               
      }
      else if (p_type == 'design')
      {       
        v_button.find("img").css("background-image",$('#SaveDraft img').css("background-image"));        
        v_button.find("img").css("background-position","-64px 0");
        v_button.find("span").text("Design");  
      }        
    }
    
    function main()
    { 
      v_button_id = 'gm_button';
      v_textarea_id = 'gm_code_design';               
      if ($('#'+v_button_id).length == 0)
      {              
        v_cancel_button = $('img.i_cancel').parents("li");
        if (v_cancel_button.length != 0)
        {
          v_button = v_cancel_button.clone();
          v_cancel_button.after(v_button);                    
          v_button.attr({id:v_button_id}); 
          set_button('code');   
          
          v_button.find("a").attr({onclick:"",href:"#"});
          v_button.find("a").click(function()
          {
            v_tab         = $('div.MSN_EDITCONTAINER');
            v_iframe      = $('iframe.MSN_EDITFRAME');
            v_iframe_body = v_iframe.contents().find("body");
            v_textarea_id = 'gm_code_button';    
                  
            if (v_iframe.is(':visible'))
            {
              v_style = v_iframe.attr('style'); 
                     
              v_iframe.hide();
              v_tab.append('<textarea id="'+v_textarea_id+'" style="'+v_style+'">'+v_iframe_body.html()+'</textarea>');
              v_textarea = $('#'+v_textarea_id)
              v_textarea.css({'font-family':'"Courier New", Courier, monospace',
                              'font-size':'10pt'});
              set_button('design');
            }
            else
            {
              v_textarea = $('#'+v_textarea_id);
              v_iframe_body.html(v_textarea.val());
              v_iframe.show();
              v_textarea.remove();
              set_button('code');             
            }                 
      
          });                      
        }
      }         
      this.setTimeout(main,500);
    }      
    main();
  });
}