// ==UserScript==
// @name       add user dit
// @namespace  http://inn.co.il/
// @version    0.5.7
// @run-at         document-end
// @grant       none
// @description  enter something useful
// @match      http://*.inn.co.il/Forum/Forum.aspx/*
// @match      http://*.inn.co.il/My/IM/Index*
// @copyright  2012+, You
// ==/UserScript==

document.head.onload=function(){console.log("acc");}



//var str='eval("Forum.UserHTML="+window.Forum.UserHTML.toString().replace("href=\\\"/Forum/lmf_Profile.aspx/\'+user.id+\'\\\"","onClick=\\\"get_user(\'+user.id+\')\\\""));';
//    var script=document.createElement('script');
//    script.innerHTML = str;
//document.body.appendChild(script);
//console.log(document.body);

document.addEventListener("load", function(e){
    
    //document.head.appendChild(script);
    //document.write = function(a,b,c,d){aa=a;bb=b;cc=c;dd=d;ee=this;}
});

console.log("c");
//var $ = unsafeWindow.$;

$(".ForumMessageAuthor").wrap('<span style="position: relative;display: inline-block;"/>');
console.log(window);
if (typeof aUsersCache != 'undefined'){
    console.log("b");
    Forum = {Users: aUsersCache};
    window.Forum = Forum;
    var isSa= true;
}
$("#divUserCard").wrap('<span style="position: relative;display: inline-block;"/>');
//$(".ForumMessageAuthor").hover(function(a0){get_user(a0.target.href.split("/")[5],this);});
$(".ForumMessageAuthor").bind('contextmenu', function(a0){get_user(a0.target.href.split("/")[5],this); return false; });
$("#divUserCard").bind('contextmenu', function() {var id=Tabs.Tabs[Tabs.Active].session.users[0];get_user(id,this); return false;})






//top: 9px;

$("body").append("<style>#arrow {position: absolute;right: -30px;font-size: 30px;color: #476d84;}\n#divUserBG #arrow {right: initial;left: -30px;}\n#uniqueid:hover {color: red !important;}\n #uniqueid {color: white !important;}\n.ProfileIn {font-family: Arial;font-size: 8pt !important;text-align: right;border-collapse: collapse;}\n.TC {width:60px; font-size: 8pt;font-weight:bold;}\n.TD {width:200px;overflow: hidden; font-size: 8pt; word-break:break-all  }\n.ProfileIn .Td {padding: 0px 3px;font-size: 8pt; float: right;} \n.ProfileIn .TdC {}\n.ProfileIn table td {padding:2px}\n.ProfileIn .Ttl {padding: 2px !important; color: black; border-bottom: dotted 2px #ddd;margin-bottom:3px; font-weight:bold}\n <style>");

window.curWin = function (content,self) {
    
    
    var d = $("<div>"); d[0].className="GenericWindow";
    $(self).parent().hover(null,function(){d.hide(500,function(){d.remove()})});
    d.append("<span id=\"arrow\">"+(isSa?"&#9668;":"&#9658;")+"</span>");
    d.append(content);
    
    d.hide();
    //$(d).prepend(innerHTML);display: inline-block;
    $(d).css("width",250).css("border-width",5).css("margin","0 25px").css("border-radius",5);//.css("top",pos.top).css("left",pos.left)$(d).css("width",670);$(d).css("display","inline-block");
    if (isSa){
        $(d).css("right",-300);
        	$(self).before(d);
    }
    else{
        $(d).css("right",$(self).width());
            $(self).after(d);
    }
    return d;
}


window.get_user=function(id,self){
    var pr = $(self).parent();
    if (pr.children().length>1) return;
    if (!Forum.Users[id].pro){
        var pro = $('<div id= "pro'+id+'" style="padding: 0;">');
        Forum.Users[id].pro = pro;
        curWin(pro,self);
        $.get("/Forum/lmf_Profile.aspx/"+id,function(data){
            //pro.hide();
            dBirth= {hebDate:function(){},greDate:function(){}}
            window.dBirth = dBirth;
            var myhtml=data.replace(/document.write/g," xxx =");
            vv = myhtml;
            dom = $(myhtml);
            var title = $(dom.find('b')[0]).text();
            var top = "<div class='Ttl NavyGradient'> <a href=\"/Forum/lmf_Profile.aspx/"+id+"\" id=\"uniqueid\" target=\"_blank\">"+title+"</a></div>";
            pro.append(top);
            bb = dom.find(".ProfileIn");
            bb.children().last().remove();
            bb.children().last().remove();
            bb.find(".TC").each(function() {
                var text = $(this).text();
                text = text.replace("הודעות בפורום:", "הודעות:").replace("מצב משפחתי","סטטוס");
                $(this).text(text);
            });
            pro.append(bb);
            
            pro.parent().css("top",-pro.parent().outerHeight()/8);
            $("#arrow").css("top",pro.parent().outerHeight()/8-15);
            pro.parent().stop().show(500);
            
        }); 
    }else{
        var pro = Forum.Users[id].pro;
        curWin(pro,self);
       
        pro.parent().css("top",-pro.parent().outerHeight()/8);
        $("#arrow").css("top",pro.parent().outerHeight()/8-15);
        pro.parent().stop().show(500);
    }
    
}