// ==UserScript==
// @name           CommentsEditor
// @namespace      http:// yoksel.ru/
// @description    Html-editor for comments on Livejournal.com
// @include        *livejournal.com*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==

GM_addStyle("#mybuttons {\
       margin: 5px 0px 5px; \
       vertical-align: top; \
       } \
    #mybuttons button { \
       height: 25px; \
       vertical-align: top; \
       } \
    #mybuttons span { \
        height: 25px; \
        vertical-align: top; \
        border-radius: 5px; \
        background: #ccc; \
        cursor: pointer; \
        }   \
    #comment-preview {  \
        clear:both; \
        margin: 10px 0px; \
        }     \
    .custom-item span { \
        cursor: pointer; \
    }     \
");

$.noConflict(); 
jQuery(document).ready(function($) {
                 
    $("textarea").each(function(id,obj){
        if($(obj).attr("name") == "body"){
            var outfield = "<div id='comment-preview'><div id='output'></div></div>";
            
           
         if($(obj).hasClass("b-updateform-textarea")){
                if($(obj).hasClass("b-spelling-textarea")){
                    $(".b-spelling").after( outfield );
                    add_buttons($(".b-updateform-buttons-firstsection"),"short");
                }
                else{
                    $(obj).after( outfield );//
                    add_buttons(obj,"full");
                }
            }
            else{
                $(obj).after( outfield );//
                add_buttons(obj,"full");
            }
           $(obj).keydown(update).keyup(update).mousedown(update).mouseup(update).mousemove(update);
        }
        
    })



function add_buttons(obj,type){
    var enable_buttons = true;
    
    $("form").each(function(id,obj){
        if($(obj).attr("name") == "supportForm"){
            enable_buttons = false;
           }
    });
    
    var elem_tag = "span"; // button
    var str = "<div id='mybuttons' class='buttonsSet'>";
        str += "<button place='&lt;b&gt;^^&lt;/b&gt;'><b>B</b></button> ";
        str += "<button place='&lt;i&gt;^^&lt;/i&gt;'><b><i>I</i></b></button> ";
        str += "<button place='&lt;s&gt;^^&lt;/s&gt;'><b><s>&nbsp;S&nbsp;</s></b></button> "
        str += "<button place='&lt;i&gt;&lt;font color=#336699&gt;&gt; ^^&lt;/font&gt;&lt;/i&gt;'>Quote</button> ";
        str += "<button place='&lt;img src=^^&gt;'>Img</button> ";
        str += "<button place='&lt;a href=\"^^\"&gt;название ссылки&lt;/a&gt;'><u>A</u></button> ";
    	str += "<button place='<lj-spoiler>^^</lj-spoiler>'>[Spoiler]</button> ";
        str += "<button place='&lt;lj user=^^&gt;'><img src='http://l-stat.livejournal.com/img/userinfo.gif'></button> ";
        str += "<button place='&lt;lj comm=^^&gt;'><img src='http://l-stat.livejournal.com/img/community.gif'></button> ";
        str += "</div>";
    
    var str_short = "<li class='b-updateform-buttons-item custom-item'><span place='<i><font color=#336699>> ^^</font></i>'><b style='font-size: 13px; cursor: pointer'>Quote</b></span> </li>"; 
        str_short += "<li class='b-updateform-buttons-item custom-item'><span place='<lj-spoiler>^^</lj-spoiler>'><b style='font-size: 13px; cursor: pointer'>[Spoiler]</b></span></li>";
    	//str_short += "<li class='b-updateform-buttons-item custom-item'><span place='<lj user=^^>'><img src='http://l-stat.livejournal.com/img/userinfo.gif'></span></li>";
        //str_short += "<li class='b-updateform-buttons-item custom-item'><span place='<lj comm=^^>'><img src='http://l-stat.livejournal.com/img/community.gif'></span></li>";
        
     if(enable_buttons == true){  
        if(type == "short"){
            str = str_short;
            $(obj).append(str );
            }
        else{
            $(obj).before(str );
            }       
     }    
             
    $('.custom-item span,.buttonsSet button').click(function() {///.buttonsSet button,
            test_replace($(this).attr('place'));
            return false;
        });
}

//--------------------------------------------------------------------------

function update() {
    var old = $(this).val();
    var repl = old.replace('/\s\n\s/','<br>');
    repl = repl.replace(/\n/g,'<br>');

	var repl2 = repl.replace(/<lj\s+user="?(\w+)"?\s{0,}\/{0,}\>/g, function(link,name){
	return output_link(link,name,"user");
			});
    repl2 = repl2.replace(/<lj\s+comm="?(\w+)"?\s{0,}\/{0,}\>/g, function(link,name){
	return output_link(link,name,"comm");
			});

    $('#output').html(repl2);
}

//--------------------------------------------------------------------------

function output_link(link,name,type){
    var url = name.match(/^_|_$/) ? 'http://www.livejournal.com/users/' + name: 'http://' + name + '.livejournal.com';
    var pic = "userinfo";
    if(type == "comm"){
        pic = "community";
    }
    var result = '<span class="ljuser ljuser-name_" lj:user="' + name + '" style="white-space:nowrap"><a href="' + url + '/profile"><img src="http://www.livejournal.com/img/'+ pic +'.gif" alt="[info]" width="16" height="16" style="vertical-align: bottom; border: 0; padding-right: 1px;" class=" ContextualPopup"></a><a href="' + url + '"><b>' + name + '</b></a></span>';
    return result; 
}

//--------------------------------------------------------------------------

function test_replace(patt){
    var elem = $("textarea#body,textarea#commenttext,textarea.textbox");
    var elem_value = $(elem).val();
    var text_lenght = $(elem)[0].selectionEnd - $(elem)[0].selectionStart;
    
    var text_start = elem_value.substr(0,$(elem)[0].selectionStart);
    var text_end = elem_value.substr($(elem)[0].selectionEnd,$(elem).val().length);
    
    var text_src = elem_value.substr($(elem)[0].selectionStart, text_lenght);
    var text_replace = patt.replace("^^",text_src);
    var text_result = text_start + text_replace + text_end;
    
    $(elem).val(text_result);
    return false;
}
});