// ==UserScript==
// @name           Douban Friends Analyzer
// @namespace      http://npchen.blogspot.com
// @description    友邻关系分析器 (v2.3.1)
// @include        http://www.douban.com/people/*/friend_list*
// @include        http://www.douban.com/contacts/listfriends
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         NullPointer
// @version        2.3.1
/* @reason
   v2.3.1 修正：在“某某的朋友”右侧显示人数。
   @end*/
// ==/UserScript==
var thisScript = {
   name: "友邻关系分析器",
   id: "15082",
   version:"2.3.1"
}

var updater = new Updater(thisScript);
updater.check();   


var my_douban_id = GM_getValue("my_douban_id", "");
function setDoubanID(){
	my_douban_id = prompt("请输入你的豆瓣id（在“我的豆瓣”页面的右上角可以找到它）", my_douban_id );
    GM_setValue("my_douban_id", my_douban_id);
}
GM_registerMenuCommand("设置你的豆瓣ID", setDoubanID);

if(typeof unsafeWindow.jQuery !== "undefined") {
  var jQuery = unsafeWindow.jQuery;
  var $ = jQuery 
}

function get_actionlink(id, prefix, title, func){
  var pp = $("<p></p>").attr("id",id).attr("class", "pl2");
  var alink = $("<a href=javascript:{}>"+title+"</a>").click(func);
  pp.append(prefix).append(alink);
  return pp;  
}

var browsing = true;
var windowurl = setwindowurl(window.location.href);
var inmypage = (windowurl=="http://www.douban.com/contacts/listfriends");
var neednum = !inmypage;
var friends;
var hisname;
var hisurl;

function switchmode(){
  if (browsing) {
    $("p#switchmode span").html("选择模式　");
    $("p#clearall").show();
    browsing=false; 
  }
  else {
    $("p#switchmode span").html("浏览模式　");
    $("p#clearall").hide();
    browsing=true;
  }
  $("div#browse_acts").toggle(); $("div#select_acts").toggle();
}

function clearallselection(){
   var selected = $("div.obss a[class=selected]");
   $.each(selected, function(){
        clear_selected($(this));
   })
}

function pic_action(){
  if(!browsing){
     if ($(this).attr("class")=="selected") 
        clear_selected($(this)); 
     else 
        select_creating($(this));
     return false;
  }
  return true;
}

function clear_selected(item){
    item.attr("class","");
    item.parent().css("background-color","white");

    var info = pic2info(item);
    $("p[id*="+info.id+"]").remove(); 
    for (i=0; i<3; i++){
      var r = get_result(info.id,i);
      white_them(r);
    }
}

function white_them(items){
    if (items.length>0) {
        $.each(items, function(){
            $(this).parent().css("background","white");
        })
    }
}

function pic2info(item){
     var t = item.parent().parent().find("dd a");
     var t_url = t.attr("href");
     var t_name = t.html();
     var t_id = t_url.substring(8, t_url.length-1);
     t_id = t_id.replace(/[^a-zA-Z0-9]/g,"z");
     return {id: t_id, name: t_name, url: t_url};
}

function select_creating(item){
     item.attr("class","selected");
     
     var info = pic2info(item);
     names[info.id]=info.name;
     urls[info.id]=info.url;
     
     var color = get_randomcolor();
     item.parent().css("background-color",color2str(color)); 
     bindcolor2id(color,info.id);  //reg name and url, 
         
     for (i=0; i<3; i++) {
        var pair_action = mutual_factory(info.id,i);
        $("div#select_acts").append(pair_action.on).append(pair_action.off);
     }   
}


function bindcolor2id(color, id){
    var c0 = {r: Math.round((color.r)*4/5)+1, 
              g: Math.round((color.g)*4/5)+1,
              b: Math.round((color.b)*4/5)+1};
    var c2 = {r: Math.round((color.r+220)/2), 
              g: Math.round((color.g+220)/2),
              b: Math.round((color.b+220)/2)};              
    var c1 = {r: Math.round((color.r+c2.r)/2), 
              g: Math.round((color.g+c2.g)/2),
              b: Math.round((color.b+c2.b)/2)};              
    colors[id+"fri"] = color2str(c0);
    colors[id+"con"] = color2str(c1);
    colors[id+"rev"] = color2str(c2);
}

function color2str(color){
    var c = ("#"+num2FF(color.r)+num2FF(color.g)+num2FF(color.b));
    return c;
}

function num2FF(num){
    var n = num.toString(16);
    if (n.length==1) return "0"+n;
    else return n;
}

function get_randomcolor(){
    var colorr=Math.round(Math.random()*255)+1;
    var colorg=Math.round(Math.random()*255)+1;
    var colorb=Math.round(Math.random()*255)+1;
    return {r:colorr, g:colorg, b:colorb};
}


var text = {
    url: ["friend_list", "contact_list", "rev_contacts"],
    title: ["高亮其中$$$的朋友","高亮其中$$$关注的人","高亮其中关注$$$的人"],
    unpre: ["其中有￥￥￥个人是$$$的朋友　","其中有￥￥￥个人是$$$的关注对象　","其中有￥￥￥个人关注$$$　"],
    color: ["coral", "orange", "DarkSeaGreen"],
    suffix : ["fri","con","rev"] //用于<p>标签等需要id的地方
}

var colors=new Array();
var names=new Array();
var urls=new Array();
var results = {myfri:new Array(), mycon:new Array(), myrev:new Array()};

function get_name(id){
    if (browsing) return "我";
    else return names[id]
}

function get_result(id, type){
    var index = id+text.suffix[type];
    if (results[index]==undefined) results[index]=new Array();
    return results[index];
}

function init_results(){ 
    results["myfri"]=new Array();
    results["mycon"]=new Array();
    results["myrev"]=new Array();
}

function iswhite(a){
  return a.parent().css("background-color")=="rgb(255, 255, 255)";
}

function get_unhighlight(id, type){
    var pid = id + text.suffix[type];
    var uid = "u"+pid;
    
    return function(){
        $("p#"+pid).show(); $("p#"+uid).hide();
        var r = get_result(id,type);  
        white_them(r);
    }
}

function get_highlight(id, type){
    var u = (browsing)?("http://www.douban.com/people/"+my_douban_id+"/")
                      :("http://www.douban.com"+urls[id]);  
    var target_url = u+text.url[type]+" div#in_table";
       
    var pid = id+text.suffix[type];   
    var uid = "u"+pid; 
    var tid = "t"+pid;
    
    return function() {
      $("p#"+pid).hide(); $("p#"+uid).show();
      var r = get_result(id, type);     
      if (r==0) {//||(r.length==0)(r==undefined)||
        $("<div id='"+tid+"'/>").load(target_url, function(){
           process(id, type);
         }).appendTo("body").hide();
      }
      else { 
         process(id,type);
      }
    }
}

function process(id, type){
    var pid = id+text.suffix[type]; 
    var uid = "u"+pid; 
    var tid = "t"+pid;
    
    var un_action = get_unhighlight(id, type);
    var bg_color = (browsing)?text.color[type]
                             :colors[pid];

    var target_people = $("div#"+tid+" div.obss dl.obu dt a");
    var target_urls = new Array(target_people.length);
    
    var i=0; 
    var j=0;
    $.each(target_people, function(){target_urls[i++]=$(this).attr("href")+"friend_list/"}); //fill the target_urls array.
    
    var result = get_result(id, type);
    $.each(friends, function(){
      var u = $(this).attr("href");
      if ($.inArray(u, target_urls)!=-1) {
          $(this).parent().css("background-color",bg_color);  
          result[j++]=$(this);
      }
    });
    if (j>0) $("p#hideur").show();
    var str = text.unpre[type].replace("$$$",get_name(id)).replace("￥￥￥",j);
    var sslink = get_actionlink(uid, str, "取消高亮", un_action);
    $("p#"+uid).html(sslink.html()).css("color", bg_color); 
    $("p#"+uid).hover(function(){flashit(id,type)},function(){});
    $("p#"+uid).click(function(){flashit(id,type)});
    $("p#"+uid+" a").click(un_action);        
}

function flashit(id,type){
    var r=get_result(id, type); 
    if (r.length>0){
        $.each(r,function(){
            $(this).fadeTo("fast", 0.33);
            $(this).fadeTo("fast", 1); 
            $(this).fadeTo("fast", 0.33);
            $(this).fadeTo("fast", 1); 
            // $(this).fadeTo("normal", 0.33);
            // $(this).fadeTo("normal", 1); 
        })
    } 
}
    
function mutual_factory(id, type){
    var pid = id + text.suffix[type];
    var uid = "u"+pid;
    
    var action = get_highlight(id, type);
    var title = text.title[type].replace("$$$", get_name(id));
    
    var act_on = get_actionlink(pid, ">", title, action);
    var act_off = create_loader(uid);
        
    return {on: act_on, off: act_off}
}

function hideur(){
    friends.filter(function(){
        return iswhite($(this))
    }).parent().parent().hide();
    $("p#hideur").hide(); $("p#showur").show();
}

function showur(){
    friends.parent().parent().show(); 
    $("p#showur").hide(); $("p#hideur").show();
}

function build_contactsAdder(type){
    var pid = (type==1)?"con_":"re_con_";
    var tid = "temp"+type;
          
    return function(){
         $("p#"+pid+"on").hide(); $("p#"+pid+"off").show(); 
         var con_url = (inmypage)?(hisurl+text.url[type])
                       :("http://www.douban.com"+hisurl+text.url[type]);
             con_url += " div#in_table";
         if ($("div#"+tid).html()==null) {   
             $("<div id='"+tid+"'/>").load(con_url,function(){
                process_addcons(type);
             //   $("#searbar span.submit a.butt:first").empty();
             }).appendTo("body").hide(); 
         }
         else {
             process_addcons(type);
         }
     }
}

function process_addcons(type){     
     var pid = (type==1)?"con_":"re_con_";
     var rid = (type==1)?"#in_table1":"#in_table2";
     var rt = $("div"+rid);
     var tid = "temp"+type;

     var ht = $("div#"+tid+" div.obss").html();  
     rt.children("div.obss").html(ht);
     rt.show();     
     
     friends = $("div.obss dl.obu dt a");

     var newrt = (type==1)?$("div#in_table1"):$("div#in_table2");
     var newfriends = newrt.find("div.obss dl.obu dt a");
     $.each(newfriends, function(){
        $(this).click(pic_action);
        $(this).attr("href", $(this).attr("href")+"friend_list/");
        $(this).parent().css("background-color","white");
     });

     newrt.find("h1").html(newrt.find("h1").html()+" ("+newfriends.length+")")
     init_results();

     var clear_action = get_clearaction(type);

     var ulink_title = (type==1)?("去除"+hisname+"关注的人")
                                :("去除关注"+hisname+"的人");
     var unlink = get_actionlink("","－",ulink_title,clear_action);
     $("p#"+pid+"off").attr("class", "pl2").html(unlink.html()).click(clear_action);
     rt.children("h1").click(function(){rt.children("div.obss").toggle();})
     window.location.href=windowurl+rid;
}

function get_clearaction(type){
    var rid = (type==1)?"#in_table1":"#in_table2";
    var rt = $("div"+rid);
    var pid = (type==1)?"con_":"re_con_";
    var title_h1 = (type==1)?(hisname+"关注的人"):("关注"+hisname+"的人");

    return function(){
        $("p#"+pid+"on").show(); $("p#"+pid+"off").hide();
        rt.hide();
        rt.find("div.obss").empty();
        rt.find("h1").html(title_h1);
        $("p#"+pid+"off").attr("class","").html("Loading中，请稍候");   
        friends = $("div.obss dl.obu dt a");  
        init_results();       
    }      
}

function setwindowurl(url){
    var sign=url.indexOf("#");
    if (sign>-1) return url.substring(0,sign);   
    else return url;
}

function create_loader(id){
  return $("<p>Loading中，请稍候</p>").attr("id",id).css("color","grey").hide();
}

function create_intable(type){
    var title_h1 = (type==1)?(hisname+"关注的人"):("关注"+hisname+"的人");
    var id_t = "in_table"+type;
    var th = $("<h1/>").html(title_h1);
    var dh = $("<div/>").append(th);
    var dh1 = $("<div/>").attr("class","clear");
    var dh2 = $("<div/>").attr("class","obss");
    var di = $("<div/>").attr("id",id_t).append(dh).append(dh1).append(dh2).hide();
    var root = neednum?$("div#in_table"):$("div#in_tablem");
    root.append(di);
    th.click(function(){dh2.toggle()})
}

$(document).ready(function(){
    $("div#in_table div#user h1").click(function(){$("div#in_table div.obss").toggle();})
    friends = $("div.obss dl.obu dt a");
    friends.click(pic_action);
    $.each(friends, function(){
        $(this).attr("href", $(this).attr("href")+"friend_list/");
        $(this).parent().css("background-color","white");
    });
    var mode=$("<span>浏览模式　</span>").css("color","red");
    var switcher = get_actionlink("switchmode",mode, "切换", switchmode);
    
    if ( $("div#user div.usernav").html()==null) inmypage = true;
    
    hisname = $("div#maxw h1:last").html();
    hisname = (inmypage)?"我"
                        :hisname.substring(0,hisname.length-3);
    hisurl = (inmypage)?("http://www.douban.com/people/"+my_douban_id+"/")
                       :$("div#user div.usernav a:first").attr("href"); 
    create_intable(1); create_intable(2);                   
    var add_contacts = build_contactsAdder(1);
    var add_rev_contacts = build_contactsAdder(2);
                    
    var contacts_on = get_actionlink("con_on", "+", "显示"+hisname+"关注的人",add_contacts);
    var contacts_off = create_loader("con_off");
    var rev_contacts_on = get_actionlink("re_con_on", "+", "显示关注"+hisname+"的人",add_rev_contacts);
    var rev_contacts_off = create_loader("re_con_off");
    
    var p_hideur = get_actionlink("hideur",">","隐藏未被高亮的人",hideur).hide();
    var p_showur = get_actionlink("showur",">","显示所有人",showur).hide();
    
    var p_clearall = get_actionlink("clearall",">","清除全部高亮",clearallselection).hide();
    var title_h2 = $("<h2/>").html("友邻关系分析器");    
    var browse_div = $('<div id="browse_acts"/>')
            .append("点击左侧列表中用户的头像继续浏览该用户的好友").append($("<p/>"))
            .show();
    if (my_douban_id=="") {
        var warning = $("<p/>").html("豆瓣ID未设置！请右键点击Firefox状态栏上的GreaseMonkey图标，选择：用户脚本命令->设置你的豆瓣ID，完成设置后请按F5刷新页面。").css("color","red");
        browse_div.append(warning);
    }
    var select_div = $('<div id="select_acts"/>')
            .append("请从选择左侧列表中用户的头像开始……").append($("<p/>"))
            .hide();
    
    var analyzer_div = $('<div id="analyzer"/>')   
        .append(title_h2).append(switcher).append(browse_div).append(select_div)
        .append($("<hr/>")).append(p_hideur).append(p_showur).append(p_clearall)
        .append(contacts_on).append(contacts_off)
        .append(rev_contacts_on).append(rev_contacts_off).append($("<hr/>")); 
    
    //var tags_div = $('<div id="fr_tags"/>').html('熟人 好友');
    
    if(inmypage) { //自己的豆瓣好友页面
        var root = neednum?$("div#tabler"):$("div#tablerm");
        //analyzer_div.append(tags_div).append($('<hr/>'));
        root.prepend(analyzer_div); 
    }
    else {
        for (i=0; i<3; i++) {
           var pair_action = mutual_factory("my",i);
           browse_div.append(pair_action.on).append(pair_action.off);
        }
        $("div#tabler").prepend(analyzer_div);
    }
    
    if (neednum){ // /people/*/ 类页面中出现本人的情况
  //  if (inmypage)
    $("div#maxw h1:first").html($("div#maxw h1:first").html()+" ("+friends.length+")");
   // else 
   // $("div#maxw h1:eq(1)").html($("div#maxw h1:eq(1)").html()+" ("+friends.length+")");
    }
  
})


