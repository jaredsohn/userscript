// ==UserScript==
// @name       S1 优化阅读体验
// @namespace  http://mooninsky.net/
// @require http://code.jquery.com/jquery-1.8.0.min.js
// @version    1.25
// @description  优化S1论坛体验
// @match      http://bbs.saraba1st.com/*
// @match      http://saraba1st.com/*
// @match      http://www.saraba1st.com/*
// @copyright  2012+, Claud Xiao
// @run-at document-start
// ==/UserScript==
//Style and disable Ads

var idshow = 'false';
function filterSite(){
    GM_addStyle(
        ".tac.mb5 {display:none!important} " + 
        "#shortcut {display:none!important} " +
        ".forum-list-popout {overflow:hidden} " +
        ".floot_left {display:none;} " +
        "#cproIframe2 {display:none;} " +
        ".read_h1, .read_h1 a {font-size:13px;font-weight:normal;margin:10px;} " + 
        ".f14 {font-family:微软雅黑!important;font-size:10pt}"
    );
    
}
//Avator simplification, ignore all default avators in old attachment sys
function filterAvator(){
    console.log("Enter:FilterAvator");
    //var imgs= document.evaluate("//a[contains(@class,'face_img')]/img",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var imgs= document.evaluate("//img",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for(var i=0; i<imgs.snapshotLength; i++){
        if(/img.saraba1st.com\/attachments\/upload/i.test(imgs.snapshotItem(i).getAttribute('src'))){
            console.log("Replaced img:"+imgs.snapshotItem(i).getAttribute('src'));
            imgs.snapshotItem(i).setAttribute('src','http://bbs.saraba1st.com/2b/images/s1/logo.png');
        }
    }
}
//Scripting clean;
function endAction(){
    console.log("Enter:EndAction");
    $('#cate_children').hide();
    $('#cate_ann').hide();
    $('#cate_commend').hide();
    //filterAvator(); //Filter Avator
    var scripts = document.getElementsByTagName('script');
    for (var J = scripts.length-1;  J >=0;  --J)
    {
        if (/baidu/i.test (scripts[J].src) || /scorecardresearch/i.test (scripts[J].src)|| /bidsystem/i.test (scripts[J].src)  )
        {
            console.log ("Killed External Scripting", scripts[J].src);
            scripts[J].parentNode.removeChild (scripts[J]);        
        }
    }
    
    
    /*  scripts = document.getElementsByTagName('iframe');
    for (var J = scripts.length-1;  J >=0;  --J)
    {
    console.log ("Killed External iframe", scripts[J].src);
    scripts[J].parentNode.removeChild (scripts[J]);        
    }  
    */
    
    bnames =  $('.readName.b');
    bnames.each (function(index){
        $(this).parents('.read_t').find('a.s2.b.cp').html($(this).text());
        $(this).parents('.read_t').find('a.s2.b.cp').bind('hover', function(){
            if(idshow=="true"){
                return;
            }
            $('.floot_left').hide();
            $(this).parents('.read_t').find('.floot_left').show();
        });
    });
    
    $('.tpc_content a').attr('onclick','');
    
    
      if($("a:contains('返回列表')").length>0){
          $('#top').hide();
          $('#header').hide();
          $('body').append("<div id='gobottom' class='addbutton' style='position:fixed;bottom:90px;right:-2px;color:grey;cursor:pointer;padding-left:10px;padding-right:10px;font-size:10px;background:rgba(255,255,255,0.8);border:1px solid grey;border-radius:3px;'>底端</div>");
          $('body').append("<div id='gotop' class='addbutton' style='position:fixed;bottom:70px;right:-2px;color:grey;cursor:pointer;padding-left:10px;padding-right:10px;font-size:10px;background:rgba(255,255,255,0.8);border:1px solid grey;border-radius:3px;'>顶端</div>");
$('body').append("<div id='load-list' class='addbutton' style='position:fixed;bottom:10px;right:-2px;color:grey;cursor:pointer;padding-left:10px;padding-right:10px;font-size:10px;background:rgba(255,255,255,0.8);border:1px solid grey;border-radius:3px;'>列表</div>");          
          $('body').append("<div id='toggleid' class='addbutton' style='position:fixed;bottom:30px;right:-2px;color:grey;cursor:pointer;padding-left:10px;padding-right:10px;font-size:10px;background:rgba(255,255,255,0.8);border:1px solid grey;border-radius:3px;'>信息</div>");
          $('body').append("<div id='toggletop' class='addbutton' style='position:fixed;bottom:50px;right:-2px;color:grey;cursor:pointer;padding-left:10px;padding-right:10px;font-size:10px;background:rgba(255,255,255,0.8);border:1px solid grey;border-radius:3px;'>顶栏</div>");

        $('#load-list').attr('href',$("a:contains('返回列表')").attr('href'));
        $('#gotop').click(function(){
                 $('body').scrollTop(0);
        });
        $('#gobottom').click(function(){
                 $('body').scrollTop(document.height);
        });
          $('.addbutton').css('box-shadow','-2px -2px 1px rgba(100,100,100,0.3) ');  
          $('.addbutton').hover(
              function(){
                  $(this).css('color','black').css('padding-right', '20px').css("border","1px solid black");
              },
              function(){
                $(this).css('color','grey').css('padding-right', '10px').css("border","1px solid grey");
              }
          );

        $('#load-list').click(function(){}, function(){
            $('#load-list').html("Loading List");
            var tmpList = $('<div></div>');
            tmpList.load($(this).attr('href') + ".subject .subject_t", function(){
                $('#load-list').html("列表");
                $('#mask-top').show();
                $('#post-list').empty().show();
                $('#post-list').append('<table id="plist" style="margin-top:30px;margin-left:30px;margin-bottom:30px;"></table>');
                tmpList.find('a.subject_t').each(function(index){
                    
                    console.log($(this));
                    $('#plist').append("<tr><td style='background:#F6F7EB;border-bottom:1px dotted grey;margin-bottom:8px;'><a href='" +$(this).attr('href')+ "'>"+$(this).text()+"</a></td></tr>");
                });
                
            });
        });
    };  
    
    $('body').append("<div id='mask-top' style='cursor:pointer;display:none;background:rgba(0,0,0,0.2);position:fixed;width:110%;height:110%;top:-3px;left:-5%;'></div>");
    $('body').append("<div id='post-list' style='padding-bottom:5px;overflow-y:scroll;display:none;position:fixed; width:500px;top:-3px;right:-10px;height:100%;background:#F6F7EB;'></div>");
    $('#post-list').css({
        "border-left":"2px solid rgba(0,0,0,0.7)"
    });
    
    $('#mask-top').click(function(){
        $('#mask-top').hide();
        $('#post-list').hide();
    });
    
    $('#toggleid').click(function(){
        if(idshow=='true'){
            idshow = 'false';
            $('.floot_left').hide();
        } else {
            idshow = 'true';
            $('.floot_left').show();
        }
    });
    $('#toggletop').click(function(){
        if($('#header').css('display')!= 'none'){
                    $('#header').hide();
        			$('#top').hide();
        } else {
                    $('#header').show();
        			$('#top').show();
        }

    });
    //stop();
}
//Organized actions
function init(){
    filterSite();
    document.addEventListener("DOMContentLoaded", endAction, false);
    
}
//Run!
init();
