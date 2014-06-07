// ==UserScript==
// @name           pikabu comments highlighter 
// @namespace      pikabu
// @author         knight, soa_project@mail.ru
// @version        0.0.0.9
// @description    pikabu comments highlighter 
// @license        GNU General Public License
// @include        http://pikabu.ru/story/*
// @require        http://usefulscript.ru/js/jQueryRotateCompressed.2.2.js
// ==/UserScript==


function deleteDiv(_find, _name){
    
    $(_find).each(function() {	
        $(this).css('display', 'none');
    });
}

function setSize(_find, _name){
    
    $(_find).each(function() {	
        
        var width  = $(this).css('width');
        var height = $(this).css('height');
        
        
        var lim_width  = 210;
        var lim_height = 100;	
        
        var resized = 0;
        
        
        width  = width.replace("px",  ""); 
        height = height.replace("px", ""); 
        
        
        
        if (width > lim_width && resized == 0) {
            height =  height * (lim_width / width );
            width = lim_width;
            resized = 1;
        }
        
        if (height > lim_height && resized == 0) {
            width =  width * (lim_height / height);
            height = lim_height;
            resized = 1;
        }	
        
        if (resized==1) {
            $(this).css('width', width + 'px');
            $(this).css('height', height +  'px');
        }
        
        
    });
}

function rotateAll(_find, _name){
    
    
    //img.c_img
    var cntImg = 0;
    $(_find).each(function() {	
        
        
        if (cntImg ==0){
            
            if ($(this).attr('id')!="") {
                
                $(this).attr('id', _name + "_" +cntImg);
                
                var top    = $(this).position().top;
                
                var srcImg =   $(this).attr('src');
                
                
                $(this).after(
                    "<div class='login_f' style='border: 1px solid #d7d7d7; height: auto; border-radius: 5px; width:90px;top:"+top+"px;left:-1px;position:absolute !important;'>"+	
                    
                    //class="login_f" style="border: 1px solid #d7d7d7; height: auto; border-radius: 5px; position: relative"	
                    
                    '<table width="100%" cellspacing="0" cellpadding="0" border="0" id="story_main_t">'+
                    '<tbody><tr>'+
                    '<td width="100%" style="background-color: #efefef; border-radius: 5px 5px 0 0;" colspan="2" class="rating_bl">Вращение</td>'+
                    '</tr>'+
                    '<tr>'+
                    '<td valign="top" class="small_text most_comm_post_1391243">'+
                    '<div style="width: 90%; padding: 8px 10px 3px 15px;" class="most_comm_post_show">'+
                    
                    
                    "<p><a href=\"javascript:void();\" onClick=\"$('#"+_name+"_" +cntImg+ "').rotate(90);return false;\" >90 градусов</a></p>" +
                    "<p><a href=\"javascript:void();\" onClick=\"$('#"+_name+"_" +cntImg+ "').rotate(-90);return false;\" >-90 градусов</a></p>" +
                    "<p><a href=\"javascript:void();\" onClick=\"$('#"+_name+"_" +cntImg+ "').rotate(180);return false;\" >180 градусов</a></p>" +
                    "<p><a href=\"javascript:void();\" onClick=\"$('#"+_name+"_" +cntImg+ "').rotate(0);return false;\" >0 градусов</a></p>" +
                    
                    
                    //'<div style="padding-top: 2px; font: 12px Tahoma, Arial" class="info">2 новых комментария</div>'+
                    
                    '</div>'+
                    '</td>'+
                    '</tr>'+
                    //	'<tr>'+
                    //	'<td class="info"><a style="float:right; padding-right: 12px" href="/index.php?cmd=new_comm">показать все</a></td>'+
                    //	'</tr>'+
                    '</tbody></table>	'+
                    
                    
                    "</div>");	
            }
            cntImg = cntImg + 1;
        }
    });
    
    
}

jQuery(document).ready(function()
                       {
                           
                           var  nameHtml = '';
                           var  nameStr  = '';
                           var  newCountInt = 0;
                           var  myCountInt = 0;
                           var  myStyle  = " style='background-color:lightblue !important;' ";
                           var  newStyle = " style='background-color:rgb(255,255,204) !important;' ";
                           var  str = "";
                           //Найдем как нас зовут 
                           $('h4').each(function() 
                                        {
                                            str =  $(this).html();
                                            reg =  new RegExp("\/profile\/(.*?)\">", "gim");
                                            res = reg.exec(str, "$1");
                                            if (res != null){
                                                nameStr = res[1];
                                                nameHtml = $(this);
                                            }
                                        });
                           
                           
                           //Пометим наши комментарии и новые чужие
                           $('td.info_c').each(function() 
                                               {
                                                   str =  $(this).html();
                                                   
                                                   reg =  new RegExp("\/profile\/"+nameStr, "gim");
                                                   
                                                   res = reg.exec(str, "$1");
                                                   
                                                   if (res != null){
                                                       $(this).html(
                                                           "<a name='my_comment_"+myCountInt+"'></a><div "+myStyle+" >" + str + "</div>"+
                                                           "<a href='#my_comment_"+(myCountInt+1)+"'>[Следующий мой комментарий]</a>" +
                                                           "<a href='#my_comment_"+(myCountInt-1)+"'>[Предыдущий мой комментарий]</a>" 
                                                       );
                                                       myCountInt = myCountInt + 1;
                                                       
                                                       
                                                       
                                                   }		
                                               });  
                           
                           $('td.comment_msg_new').each(function() {
                               str = $(this).html();
                               $(this).html(
                                   "<a name='new_comment_"+newCountInt+"'></a><div "+newStyle+" >" + str + "</div>"+
                                   "<a href='#new_comment_"+(newCountInt+1)+"'>[Следующий новый комментарий]</a>" +
                                   "<a href='#new_comment_"+(newCountInt-1)+"'>[Предыдущий новый комментарий]</a>" 
                               );
                               newCountInt = newCountInt + 1;		
                               
                           });
                           
                           //Вращение картинок
                           //$(".c_img").rotate(90);
                           
                           
                           //rotateAll('img.c_img', 'comm_img');
                           
                           setSize('img.c_img', 'comm_img');
                           //setSize('img[style=""]', 'main_img');
                           
                           rotateAll('img[style=""]', 'main_img_0');
                           
                           deleteDiv('div.cc_image', 'cc_image');
                           
                           
                           
                           var cntMenu = 0;
                           
                           $('div.login_f').each(function() {
                               
                               if (cntMenu == $('div.login_f').length - 3 ){
                                   
                                   $(this).before(
                                       "<div  class='login_f' style='border: 1px solid #d7d7d7; height: auto; border-radius: 5px; position:relative !important;'>"+	
                                       
                                       //class="login_f" style="border: 1px solid #d7d7d7; height: auto; border-radius: 5px; position: relative"	
                                       
                                       '<table width="100%" cellspacing="0" cellpadding="0" border="0" id="story_main_t">'+
                                       '<tbody><tr>'+
                                       '<td width="100%" style="background-color: #efefef; border-radius: 5px 5px 0 0;" colspan="2" class="rating_bl">Статистика</td>'+
                                       '</tr>'+
                                       '<tr>'+
                                       '<td valign="top" class="small_text most_comm_post_1391243">'+
                                       '<div style="width: 90%; padding: 8px 10px 3px 15px;" class="most_comm_post_show">'+
                                       
                                       
                                       "<p><a href='#my_comment_0'>"+
                                       "Моих коментариев:</a> <b>" + myCountInt + "</b>" +
                                       "</p>"+
                                       "<p><a href='#new_comment_0'>"+
                                       "Новых коментариев:</a> <b>" + newCountInt + "</b>" 	 +
                                       "</p>"+
                                       
                                       //'<div style="padding-top: 2px; font: 12px Tahoma, Arial" class="info">2 новых комментария</div>'+
                                       
                                       '</div>'+
                                       '</td>'+
                                       '</tr>'+
                                       //	'<tr>'+
                                       //	'<td class="info"><a style="float:right; padding-right: 12px" href="/index.php?cmd=new_comm">показать все</a></td>'+
                                       //	'</tr>'+
                                       '</tbody></table>	'+
                                       
                                       
                                       "</div>");
                                   
                                   return true;
                                   
                               }
                               cntMenu = cntMenu + 1;
                               
                               
                               
                           });		
                           
                           
                       });