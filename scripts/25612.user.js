// ==UserScript==
// @name           Yahoo HTML Editor
// @namespace      Yahoo HTML Editor
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
  $(document).ready(function() 
  {  
    function set_button(p_type)
    {
      if (p_type == 'code')
      {
        v_button.find(".button").css("background-position","-1611px 0");
        v_button.find(".labelCell").text("HTML Code");               
      }
      else if (p_type == 'design')
      {
        v_button.find(".button").css("background-position","-2663px 0");
        v_button.find(".labelCell").text("Design");  
      }        
    }
    
    function main()
    {     
      v_button_id = 'gm_button';
      v_textarea_id = 'gm_code_design';      
      if ($('#'+v_button_id).length == 0)
      {      
        v_cancel_button = $('#btnTbl_close_tab');          
        if (v_cancel_button.length != 0)
        {          
          v_button = v_cancel_button.clone();
          v_cancel_button.after(v_button);                    
          v_button.attr({id :v_button_id,cmd:""}); 
          set_button('code');
          
          v_button.click(function()
          {
            v_tab         = $('div.TabItemActive');
            v_iframe      = v_tab.find('iframe#compArea_test_1');
            v_iframe_body = v_iframe.contents().find("body");                
                  
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
      this.setTimeout(main,1000);
    }      
    main();
  });
}