// ==UserScript==
// @name           Popup Script
// @namespace      حرب القبائل
// @version        1.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

if (game_data.player.premium == false) {
    var vis = $(".vis:eq(2)");
}else if (game_data.player.premium == true) { 
    var vis = $(".vis:eq(3)");
}
    
    $("body").append('<script type="text/javascript" language="JavaScript">\
var cX = 0;\
var rX = 0;\
function UpdateCursorPosition(e){\
cX = e.pageX;\
}\
function UpdateCursorPositionDocAll(e){\
cX = event.clientX;\
}\
if(document.all){\
document.onmousemove = UpdateCursorPositionDocAll;\
}else{\
document.onmousemove = UpdateCursorPosition;\
}\
function AssignPosition(d){\
if(self.pageYOffset){\
rX = self.pageXOffset;\
}else if(document.documentElement && document.documentElement.scrollTop){\
rX = document.documentElement.scrollright;\
}else if(document.body){\
rX = document.body.scrollright;\
}\
if(document.all){\
cX += rX;\
}\
}\
function HideContent(d){\
if(d.length < 1){\
return;\
}\
document.getElementById(d).style.display = "none";\
}\
function ShowContent(d){\
if(d.length < 1){\
return;\
}\
var dd = document.getElementById(d);\
AssignPosition(dd);\
dd.style.display = "block";\
}\
function ReverseContentDisplay(d){\
if(d.length < 1){\
return;\
}\
var dd = document.getElementById(d);\
AssignPosition(dd);\
if(dd.style.display == "none"){\
dd.style.display = "block";\
}else { dd.style.display = "none";\
}\
}\
</script>');

if(document.URL.indexOf("screen=mail") >= 0){
    $(vis).find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/group_id=0/g,"from=-1")); 
    });
    $(vis).find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace("href","link"));  
    });
    
    $(".top_bar:first").append('<div id="tool1" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:400px; overflow:auto; right:645px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool1\');return true;">غلق</a></div><table class="popup" style="min-width:380px;"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    
    $(vis).find("tr").find("td:eq(0)").find("a").attr("onclick","$(this).each(function(){\
$('.popup').find('.post').remove();\
var view = $('.popup').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(1)').find('.post');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool1');\
return true;");
    
}else if(document.URL.indexOf("screen=report") >= 0){
    $("#report_list").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));  
    });
    
    $(".top_bar:first").append('<div id="tool1" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:auto; overflow:auto; right:600px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool1\');return true;">غلق</a></div><div class="popup"></div></div>');
    
    $("#report_list").find("tr").find("td:eq(0)").find("span:eq(0)").find("a:eq(0)").attr("onclick","$(this).each(function(){\
$('.popup').find('.vis:first').remove();\
var view = $('.popup');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(3)');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool1');\
return true;");
}else if(document.URL.indexOf("screen=forum") >= 0){
    $(".nowrap:last").find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));  
    });
    
    $(".top_bar:first").append('<div id="tool1" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:725px; overflow:auto; right:520px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool1\');return true;">غلق</a></div><table class="popup"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    
    $(".nowrap:last").find("tr").find("td:eq(0)").find("a").attr("onclick","$(this).each(function(){\
$('.popup').find('form').remove();\
var view = $('.popup').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.bgContainer').find('form:eq(0)').attr('style','min-width:708px;');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool1');\
return true;");
}else if(document.URL.indexOf("screen=info_member") >= 0 || document.URL.indexOf("mode=members") >= 0){
    $(".vis:last").find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));
    });
    
    $(".top_bar:first").append('<div id="tool1" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:395px; overflow:auto; right:641px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool1\');return true;">غلق</a></div><table class="popup" style="min-width:380px;"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    $(".vis:last").find("tr").find("td:eq(0)").find("a").attr("onclick","$(this).each(function(){\
$('.popup').find('.vis').remove();\
var view = $('.popup').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('#content_value').find('td:eq(0)');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool1');\
return true;");
}
    
    $(".menu-item:eq(1)").find(".menu-column-item:first").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace("href","link"));
    });

$(".menu-item:eq(3)").find(".menu-column-item:last").each(function(){
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace("href","link"));  
});

function repla(){
    $("#report_list").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));  
    });
}

function replb(){
    $(".forum").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));  
    });
}

function report(){
    
    $(".top_bar:first").append('<div id="tool3" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:552px; overflow:auto; right:3px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool3\');return true;">غلق</a></div><div class="popb"></div></div>');
    
    $("#report_list").find("tr").find("td:eq(0)").find("span:eq(0)").find("a:eq(0)").attr("onclick","$(this).each(function(){\
$('.popb').find('.vis:first').remove();\
var view = $('.popb');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(3)');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool3');\
return true;");
}

$(".top_bar:first").append('<div id="tool2" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:680px; overflow:auto; right:568px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool2\');return true;">غلق</a></div><table class="popa" style="min-width:380px;"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
$(".menu-item:eq(1)").find(".menu-column-item:first").find("a").attr("onclick","$(this).each(function(){\
$('.popa').find('#report_list').remove();\
var view = $('.popa').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('#report_list');\
$(view).append(pup);\
if(null!==pup){\
repla();\
report();\
}\
}\
});\
});\
ShowContent('tool2');\
return true;");

function replc(){
    $(".popd").find(".nowrap").find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/href/g,"link"));  
    });
}

function thread(){
    $(".top_bar:first").append('<div id="tool6" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:534px; overflow:auto; right:8px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool6\');return true;">غلق</a></div><table class="pope" align="center"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    
    $(".popd").find(".nowrap").find("tr").find("td:eq(0)").find("a").attr("onclick","$(this).each(function(){\
$('.pope').find('form').remove();\
var view = $('.pope').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.bgContainer').find('form:eq(0)').attr('style','width:515px;');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool6');\
return true;");
}

function forum(){
    
    $(".top_bar:first").append('<div id="tool5" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:480px; overflow:auto; right:555px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool5\');return true;">غلق</a></div><div class="popd"></div></div>');
    
    $(".forum").find("a").attr("onclick","$(this).each(function(){\
$('.popd').find('.nowrap:first').remove();\
var view = $('.popd');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.nowrap:last');\
$(view).append(pup);\
if(null!==pup){\
$('.popd').find('.nowrap').find('th:nth-child(3)').remove();\
$('.popd').find('.nowrap').find('th:nth-child(3)').remove();\
$('.popd').find('.nowrap').find('td:nth-child(3)').remove();\
$('.popd').find('.nowrap').find('td:nth-child(3)').remove();\
replc();\
thread();\
}\
}\
});\
});\
ShowContent('tool5');\
return true;");
}

$(".top_bar:first").append('<div id="tool4" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:200px; overflow:auto; right:1048px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool4\');return true;">غلق</a></div><table class="popc" style="max-width:190px;" align="center"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
$(".menu-item:eq(3)").find(".menu-column-item:last").find("a").attr("onclick","$(this).each(function(){\
$('.popc').find('.forum').remove();\
var view = $('.popc').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.forum');\
$(view).append(pup);\
$('.forum').before('<br>');\
if(null!==pup){\
replb();\
forum();\
}\
}\
});\
});\
ShowContent('tool4');\
return true;");

$(".menu-item:eq(2)").find(".menu-column-item:first").each(function(){
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace("href","link"));
});

function repld(){
    $(".popf").find(".vis:first").find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/group_id=0/g,"from=-1")); 
    });
    $(".popf").find(".vis:first").find("tr").find("td:eq(0)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace("href","link"));  
    });
}

function mail(){
    
    $(".top_bar:first").append('<div id="tool8" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:480px; overflow:auto; right:56px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool8\');return true;">غلق</a></div><div class="popg"></div></div>');
    
    $(".popf").find(".vis:first").find("tr").find("td:eq(0)").find("a").attr("onclick","$(this).each(function(){\
$('.popg').find('.post').remove();\
var view = $('.popg');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(1)').find('.post');\
$(view).append(pup);\
}\
});\
});\
ShowContent('tool8');\
return true;");
}
if (game_data.player.premium == false) {
    $(".top_bar:first").append('<div id="tool7" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:700px; overflow:auto; right:549px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool7\');return true;">غلق</a></div><table class="popf" align="center"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    $(".menu-item:eq(2)").find(".menu-column-item:first").find("a").attr("onclick","$(this).each(function(){\
$('.popf').find('.vis:first').remove();\
var view = $('.popf').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(2)');\
$(view).append(pup);\
if(null!==pup){\
repld();\
mail();\
}\
}\
});\
});\
ShowContent('tool7');\
return true;");
}else if (game_data.player.premium == true) { 
    $(".top_bar:first").append('<div id="tool7" style="display:none; position:absolute; border:2px solid rgb(128, 64, 0); background-image:url(http://cdn2.tribalwars.net/graphic/index/iconbar-mc.png); padding:5px; max-height:500px; width:700px; overflow:auto; right:549px; top:136px;"><div style="text-align:right;"><a href="#" onclick="HideContent(\'tool7\');return true;">غلق</a></div><table class="popf" align="center"><tbody><tr><td colspan="3"></td></tr></tbody></table></div>');
    $(".menu-item:eq(2)").find(".menu-column-item:first").find("a").attr("onclick","$(this).each(function(){\
$('.popf').find('.vis:first').remove();\
var view = $('.popf').find('td:first');\
var url = $(this).attr('link');\
$.ajax({\
url:url,\
datatype:'html',\
cache:true,\
success :function(data){\
var pup = $(data).find('.vis:eq(3)');\
$(view).append(pup);\
if(null!==pup){\
repld();\
mail();\
}\
}\
});\
});\
ShowContent('tool7');\
return true;");
}