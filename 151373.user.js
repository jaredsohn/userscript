// ==UserScript==
// @name        Post2TumblrWithMyTags
// @namespace   www.tumblr.com/share*
// @include     http://www.tumblr.com/share*
// @version     1
// ==/UserScript==

// My list of tags combinations

    var Tags = new Array ();
    var tag_used = undefined;
    var delete_cnt = 0;

// Cookie Setter
function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

// Cookie Getter
function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            LetsJQuery();
        }
    }
    
// Add option to listbox
    function add_opt(options, opt)
    {
           new_opt = $('<option/>').text(opt)
                                    .attr("class", "myTumblrTag")
                                    .dblclick(function() {
                                        $(this).remove();
                                        delete_cnt = delete_cnt + 1;
                                    })           
                                    .click(function() {
                                        $("textarea#post_tags").text($(this).text()).trigger("onchange");
                                    });
                                    
           options.append(new_opt);
           return options;
    }
// Wait for essential page elemnts being available
    function LetsJQuery() {
        $(document).ready(function() {
            new_list = $('<select/>').attr("size","10").attr("style", "float: right; height: 460px");
            cnt = 0;
            while (true)
            {
                cnt = cnt + 1;
                value = getCookie("Tags" + cnt);            
                if (value)
                {
                    Tags.push(value);                    
                } else {
                    break;
                }
            }        
            Tags.sort();
            for (var i=0; i<Tags.length; i++)
             {
               new_list = add_opt(new_list, Tags[i]);
             }
            $("textarea#post_tags").parent().attr("style","height: 480px; padding: 10px 0px; width: 600px;"); 
            $("textarea#post_tags").parent().append(new_list);        
        });
		$("div.option").css("width", "600px");
        $("textarea#post_tags").change(function() {
            tag_used = $(this).val();
        });
        $("div#post_controls").click(function() {
            // Refresh cookies
            i = 0;
            new_tag = 1;
            $(".myTumblrTag").each( function() {
                i = i + 1;
                value = $(this).text();
                if (tag_used && value == tag_used)
                {
                    new_tag = 0;
                }
                console.log(value);                
                setCookie("Tags" + i,value,365);            
            });
            if (new_tag)            
            {
                if (tag_used)
                {
                    i = i + 1;
                    setCookie("Tags" + i,tag_used,365);
                    console.log(tag_used);
                }
            }
            if (delete_cnt > 0)
            {
                i = i + 1;
                setCookie("Tags" + i,"",365);
                console.log("Deleting Tags" + i);            
            }
        });        
    }