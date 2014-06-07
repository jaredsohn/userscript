// ==UserScript==
// @name            PolWars GUI
// @author          Maxlin
// @homepage        http://userscripts.org/scripts/show/156437
// @downloadURL     http://userscripts.org/scripts/source/156437.user.js
// @updateURL       http://userscripts.org/scripts/source/156437.meta.js
// @icon            http://s3.amazonaws.com/uso_ss/icon/156437/large.png?1369024058
// @description     PolWars GUI 
// @namespace       *
// @version         2.3
// @include         http://*polwars.pl*
// @exclude         http://www.polwars.pl/chat/*
// @exclude         http://www.polwars.pl/stash/*
// @run-at          document-end
// ==/UserScript==

function GM_wait(){
    if(typeof unsafeWindow.jQuery=="undefined"){
        window.setTimeout(GM_wait,1e3)
        }else{
        $=unsafeWindow.jQuery}
        }
function trim13(e){e=e.replace(/^\s+/,"");
    for(var t=e.length-1;t>=0;t--){
        if(/\S/.test(e.charAt(t))){
            e=e.substring(0,t+1);
            break
        }
    }return e
}

function $p(e,t,n,r){
    if(t.length>0){
        $.post(e,t.pop(),function(){n.call();$p(e,t,n,r)})}
    else{r.call()}}function $t(){
        var e,t,n,r,i;i=new $g.$e;$(i).css({"max-width":"240px"});r=$g.$b("Importuj");$(r).click(function(){$(".button").addClass("disabled").unbind("click");var e=new Array;var t=$("#players select:first option:selected").val();$("#players input:checkbox").slice(1).each(function(){if($(this).is(":checked")){e.push({info:"",name:$(this).parent().find("a:last").html(),type:t})}});
        var n=Math.round(100/e.length*100);$p("/phone/contacts/add/",e,function(){var e=$(i).find("div.percent");$(e).css("width",(e[0].style.width.replace(/[^0-9.]*/g,"")*1+n/100).toFixed(2)+"%")},function(){window.location.href="/phone/contacts/"+(t=="enemy"?"enemies":t+"s")})});$("#players").parent().prev("td").append("<HR style='position:relative;top:2px;right:-10px'><P>Wklej:</P>");
        $("#players").show().prepend("<hr/><select style='background-color:#fff4de;vertical-align:baseline;margin-right:10px'><option value='victim'>Ofiary</option><option value='enemy'>Wrogowie</option><option value='friend'>Przyjaciele</option><option value='black'>Czarna Lista</option></style>",r,"<br/><b style='color:#945903;font:bold 90% Tahoma,sans-serif,Arial'>Ładuję ...:</b>",i,"<hr/>",$("<input type='checkbox' style='padding-right:10px'/>").click(function(){var e=$("#players input:checkbox").slice(1);if($(this).is(":checked")){$(e).attr("checked","checked")}else{$(e).removeAttr("checked")}}),"<br/>").find("span.user").each(function(){$(this).prepend("<input type='checkbox'>")})}function $p(e,t,n){if(t.length>0){$.post(e,t.pop(),function(){n.call();$p(e,t,n)})}else{window.location.reload(true)}}function $c(){var e,t,n;t=new $g.$e;e=new $g.$b("Usuń zaznaczone");$(e).click(function(){$(".button").attr("disabled","disabled").addClass("disabled").unbind("click");var e=new Array;$("table.list-users input:checkbox").slice(1).each(function(){if($(this).is(":checked")){n=$(this).parent().find("span.user a:last");e.push({action:"delete",id:$(n).attr("href").replace(/player|\//g,""),nickname:$(n).html(),type:"contact"})}});
        var r=Math.round(100/e.length);$p("/phone/contacts/",e,function(){var e=$(t).find("div.percent");$(e).css("width",Number(e[0].style.width.replace(/[^0-9]*/g,""))+r+"%")})});$(".list-users tr").each(function(){n=$(this).find("td:first span.user a:last");$("<input/>").attr({type:"checkbox",value:n.html()}).insertBefore($(this).find("i:first"))});$("<tr />").append($("<td/>").append($("<input />").attr({type:"checkbox"}).click(function(){var e=$("table.list-users input:checkbox").slice(1);if($(this).is(":checked")){$(e).attr("checked","checked")}else{$(e).removeAttr("checked")}})),$("<td/>").css({"text-align":"right","vertical-align":"bottom",padding:"0 5px"}).append($("<b/>").css({color:"#945903"}).html("Postęp:")),$("<td/>").append(e,t)).insertBefore(".list-users tr:first")}
        function showFullInventory(){$(".object-thumbs").css({height:"auto",overflow:"hidden"})}
        function buyItemsWindowShow(){if($(".alert.buyItem-loaded").length>0){if($(".alert.buyItem-loaded").is(":visible")){return}else{$(".alert.buyItem-loaded").show()}}else{$("<script/>").attr({type:"text/javascript",src:"https://gist.github.com/raw/4656649/6237f7ba8a7c3678de95ce02e3cdb76dbbcee668/WawaWars%20Sklep"}).appendTo("head")}}
        function kFormatter(e){return e>99?(e/1e3).toFixed(1).replace(".",",")+"k":e}
        var GM_JQ=document.createElement("script");GM_JQ.src="http://jquery.com/src/jquery-latest.js";GM_JQ.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(GM_JQ);GM_wait();$(document).ready(function(){function e(e,t){return"<div onclick=\"document.location.href = '"+t+'\'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+e+"</div></span></div>"}function t(e,t){return'<div id="'+t+'" class="button"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+e+"</div></span></div>"}if($("#timeout").attr("timer")>3){
        setTimeout(function(){myfunc()},
        
    // Duży zegarek scrollowany wraz ze stroną
    $("#timeout").attr("timer")*1e3)}
    $("#servertime").css({color: "black",top:"335px",background: "#fbe6af",border: "4px solid #fbd290",borderRadius: "10px",width: "100px",padding: "10px 35px 10px 20px",position: "fixed",top: "20px"});
    $("#servertime").css("font-size","25px");
    $("#servertime").css("left","20px");
    $("#servertime").css("font-weight","bold");
    $("#servertime").css("z-index","3");
    
    //Zwezenie kolumn

    $(".dopings-cell").css("width","40%");
    $("#dopings-accordion,#dopings-accordion dd").css("width","262px");
    $(".pet-cell").css("width","8%");
    $("#pet-accordion,#pet-accordion dd").css("width","76px");
    
    
    
        $("#stats-accordion").css("height","275px");        
        $("#statistics-accordion").css("height","275px");
        $('center[style="padding-top:3px;"]').css("display","none");
        $(".inventary .object-thumb").css({width:"46px",height:"64px"});
        $("#personal").css({background: "url(http://www.moswar.ru/css/1064/../images/decor/_personal.png) no-repeat 50% -920px", height: "272px"});
    
    $(".home table.inventary dd .object-thumbs").css("height", "409px");
    $("table.inventary dd .object-thumbs").css("height", "500px");
    $("table.inventary dd .object-thumbs").css("overflow", "hidden");
    
    
    
    
    // Nowy widok pokazywania kasy/rudy/ropy/wz
    $(".wallet-4").css({background: "url(http://www.moswar.ru/css/1064/../images/decor/_personal.png) no-repeat 50% -719px", height: "42px", marginTop: "33px"});
    $(".wallet-4 li").css("width", "63px");
    $(".tugriki-block").html($(".tugriki-block").html().replace('<br>','&nbsp;'));
    $(".ruda-block").html($(".ruda-block").html().replace('<br>','&nbsp;'));
    $(".neft-block").html($(".neft-block").html().replace('<br>','&nbsp;'));
    $(".med-block").html($(".med-block").html().replace('<br>','&nbsp;'));
    $(".neft-block").css("margin-top", "7px");
    $(".column-left .neft").css({float: "left", margin: "0 0 0 6px"});
    $(".column-left .med").css({float: "left", margin: "0 0 0 6px"});

    // Wyłączenie tutoriala
    $("#tutorial-pers").css("display", "none");

    // Zakreśla zdobyte kolekcje na zielono
    $(".count:contains('100%')").parent().css({background: "#CCF168 url(images/asd.jpg) no-repeat 0 0"});
    $(".count:contains('100%')").parent().find("img").css({background: "none"});

    // Jezdzenie samochodami bez przewijania
    $(".cars-trip-accordion").css({height:"2430px"});
    $("div.cars-trip-accordion ul").css({width:"660px"});
    $("i.arrow-right-circle").css({display:"none"});
    $("i.arrow-left-circle").css({display:"none"});
    $("div.cars-trip-scroll-bar-container").css({display:"none"});
    $("ul.jcarousel-list.jcarousel-list-horizontal  li").css("margin-bottom","5px");
    
    //Liczba punktów do końca lvl
    $.get("http://www.wawawars.pl/player/",function(e){if(/([0-9]+)\/([0-9]+)/.test($(e).find(".exp").text())){var t=parseInt(RegExp.$1,10);var n=parseInt(RegExp.$2,10);
    $(".pers-statistics .bars .exp").append(" <=>  "+(n-t)+"")}});

    
        $(".inventary .object-thumb").css("margin","1px 1px 4px 0px");
        $(".inventary .padding img").css({width:"52px",height:"52px"});
        $(".inventary .padding").css({padding:"0px",width:"53px"});
        $(".inventary .padding").css("min-height","53px");
        $(".equipment-cell .object-thumbs").css("padding","2px 0px 2px 0px");
        $(".inventary .count").css({color:"black",top:"40px"});
        $(".inventary .count").css("font-weight","bold");
        $("#fight-perplayer-results").toggle();
        $("#personal .wanted").css("font-size","0px");
    // Menu boczne z ikonkami
    var n='<div style="background: #FFFFFF; border-radius: 10px 10px 10px 10px; border: 2px solid #dc9151; left: 180px; padding: 10px 11px 10px 5px;z-index: 99999; position: fixed; text-align: center; top: 180px; width: 20px;"><a href="/petarena/train/417803"><span style="height: 24px; width: 23px; margin: 2px auto; display: block;"><img src="/@/images/obj/pets/4-4-icon.png" /></span></a><a href="/metro/"><i class="icon metrotaken-cy1-icon" style="height: 20px; width: 23px; margin: 2px 4px; display: block;"></i></a><a href="/factory/"><span class="petric" style="height: 21px; width: 23px; margin: 2px auto; display: block;"><i></i></span></a><a href="/neft/"><span class="neft" style="height: 18px; width: 23px; margin: 2px auto; display: block;"><i></i></span></a><a href="/casino/"><span class="fishki" style="height: 20px; width: 23px; margin: 2px auto; display: block;"><i></i></span></a><a href="/huntclub/wanted/"><i class="icon hunting-kill " style=" height: 20px; width: 23px; margin: 3px 4px; display: block;"></i></i></a><a href="/automobile/ride"><i class="icon car-icon"style="height: 16px; width: 23px; margin: 2px auto; display: block;"></i></i></a></div>';
    $("#personal div.phone").after(n);
    
        $("div.wanted").css("cursor","pointer").attr("title","Policja").click(function(){document.location.href="/police/"});
        var r=encodeURIComponent(window.location);
        var i="http%3A%2F%2Fwww.wawawars.pl%2Fplayer%2F";
        if(r===i){window.addEventListener("load",function(){function e(){var e,r,i,s,o,u,a,f,c,h;t();
        $(".object-thumbs").css({height:"auto",overflow:"hidden"});
        $(".hint").remove();
        $("dl#dopings-accordion div.object-thumbs div.object-thumb div.action:not(.disabled)").each(function(){a=/(?!\/player\/use\/)[0-9]+(?=\/';(\n)?)/g.exec(String($(this)[0].getAttribute("onclick")));if(a.length>0){var e=/(?=\/?)[a-zA-Z0-9-]+(?=\.png(\n)?$)/g.exec(String($(this).parents("div.object-thumb").find("img:first").attr("src")))[0];if(e!="drugs5"&&e!="drugs4"){a="unchecked"}else{a=""}c=$("<div />").css({bottom:"1",left:"0",position:"absolute"}).append('<input type="checkbox" class="m4w" '+a+" />");$(this).parents("div.object-thumb").css({height:"64px","margin-bottom":"7px"}).append(c).click(function(e){if(e.target.type!="checkbox")$(":checkbox",this).attr("checked",function(){return!this.checked})})}});f=$("div#content table.inventary td.equipment-cell div[rel='normal'] div.object-thumbs div.object-thumb");f.each(function(){if($(this).find("div.action").length==0||!String($(this).find("div.action:first")[0].getAttribute("onclick")).match(/\/player\/dress\/[0-9]+\/';/g)){$(this).remove()}else{c=$("<div />").css({bottom:"1",left:"0",position:"absolute"}).append('<input type="checkbox" checked="checked" class="m3w" />');$(this).css({height:"64px","margin-bottom":"7px"}).append(c).click(function(e){if(e.target.type!="checkbox")$(":checkbox",this).attr("checked",function(){return!this.checked})})}});$("#content table.layout td.slots-cell ul.slots").find("li").not(".avatar,.slot-pet").each(function(){if($(this).find("img").length>0){e=$("<div />").css({bottom:"0",left:"0",position:"absolute"}).append('<input type="checkbox" checked="checked" class="m1w" />');$(this).append(e).click(function(e){if(e.target.type!="checkbox")$(":checkbox",this).attr("checked",function(){return!this.checked})})}});r=$("<button />").addClass("button").css("margin","0 10px 7px 0").append('<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Ściągnij wybrane</div></span>');b2=r.clone(true);b3=r.clone(true);b3.click(function(){$(".button").addClass("disabled").unbind("click");h=new Array;$(".m4w:checked").each(function(){l=/\/player\/use\/[0-9]+\/(?=';(\n)?$)/g.exec(String($(this).parents(".object-thumb").find("div.action:first")[0].getAttribute("onclick")));h.push(l[0])});n(h)}).find("div.c").text("Jedz wybrane");b2.click(function(){$(".button").addClass("disabled").unbind("click");h=new Array;$(".m3w:checked").each(function(){l=/\/player\/dress\/[0-9]+\/(?=';(\n)?$)/g.exec(String($(this).parents(".object-thumb").find("div.action:first")[0].getAttribute("onclick")));h.push(l[0])});n(h)}).find("div.c").text("Wybierz ubranie");r.click(function(){$(".button").addClass("disable").unbind("click");h=new Array;$(".m1w:checked").each(function(){u=$(this).parents("li").find("img").attr("src");$(f).find("div.action").each(function(){if($(this).parents("div.padding").find("img").attr("src")==u){l=/\/player\/withdraw\/[0-9]+\/(?=';(\n)?$)/g.exec(String($(this)[0].getAttribute("onclick")));h.push(l[0])}})});n(h)});i=$("<b />").css({color:"#945903",font:"bold 90% Tahoma,sans-serif,Arial"}).html("Postęp:");s=$("<div />").addClass("exp").html("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%' id='m2w'></div></div></div>");o=$("<tr />").append("<td align='center' /><td align='center' /><td class='progress' />");$(o).find("td:nth-child(1)").append(b3).end().find("td:nth-child(2)").append(r,b2).end().find("td:nth-child(3)").append(i,s);$("#content table.layout tbody").append(o)}function t(){var e,t,n,r,i,s;e="dl.vtabs div.object-thumbs";t=function(e){return $(e).parents("div.object-thumb").find("div.count")};$(e).each(function(){$(this).find("div.object-thumb img").each(function(){n=String(/(?=\/)?[a-zA-Z0-9-]+\.png$/g.exec(String($(this).attr("src"))));i=$(e).find("img[src*='"+n+"']");if(i.length>1){r=0;i.each(function(){s=t(this);if(!s.html()){r+=1}else{r+=Number(s.html().replace("#",""))}});if(!t(i[0]).html())$("<div class='count' />").insertAfter($(i[0]));t(i[0]).html("#"+r);i.not(":first").parents("div.object-thumb").remove();return}})})}function n(e){if(e.length>0){var t=Math.round(100/e.length);$.get(e.pop(),function(r){$("#m2w").css("width",t+"%");n(e)})}else{window.location.reload(true)}}b=$("<button />").addClass("button").css("padding","0px 0px 2px 20px").append('<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Zdejmij<SP> / <SP>Ubierz<SP> / <SP>Jedz</div></span>').click(function(){e()}).insertAfter("dl#statistics-accordion >dd")},false);$("#statistics-accordion > dd").css("height","auto");var s,o,u,a,f,c;s="dl.vtabs div.object-thumbs";o=function(e){return $(e).parents("div.object-thumb").find("div.count")};$(s).each(function(){$(this).find("div.object-thumb img").each(function(){u=String(/(?=\/)?[a-zA-Z0-9-]+\.png$/g.exec(String($(this).attr("src"))));f=$(s).find("img[src*='"+u+"']");if(f.length>1){a=0;f.each(function(){c=o(this);if(!c.html()){a+=1}else{a+=Number(c.html().replace("#",""))}});if(!o(f[0]).html())$("<div class='count' />").insertAfter($(f[0]));o(f[0]).html("#"+a);f.not(":first").parents("div.object-thumb").remove();return}})});$(".inventary .count").css({color:"black",top:"40px"});$(".inventary .count").css("font-weight","bold");var h=parseInt($(".exp .bar .percent").css("width"));$(".exp").append(h-1+"%");$("ul.stats").css("cursor","pointer").attr("title","Siłownia VIP!").click(function(){document.location.href="/trainer/vip/"})}$("div.side-invite").each(function(e,t){$(t).remove();var n=parseInt($(".life .bar .percent").css("width"));$("#personal .life").append(n-1+" % Życia");var n=parseInt($(".bars .life .percent").css("width"));$(".bars .life").append(n-1+" % Życia")});var p=0;$(".stats-cell").find("dd:first").find("div.label").each(function(e,t){p=p+parseInt($(t).find("span").text())});$(".stats-cell").find("dt:first div div").text("Statystyki: "+p);$("div.header").append('<br clear="all"/>');$("div.header").append('<div style="text-align:center;" id="wildwest-menu"></div>');$(".counters").remove();$(".footer").remove();$(".loading-top").remove();var p=new Array;p[0]=0;p[1]=0;$("ul.stats").each(function(e,t){$(t).find("div.label span.num").each(function(t,n){p[e]=parseInt(p[e])+parseInt($(n).text())})});var d=$(".fighter2 span.user a").text();var v=$(".result span.tugriki").text();var m='<br/><br/><br/><br/><form class="contacts-add" id="contactForm" name="contactForm" action="/phone/contacts/add/" method="post"><div class="block-bordered">';m=m+'<input class="name" type="hidden" name="name" value="'+d+'">';m=m+'<input class="comment" type="hidden" name="info" value="'+v+'"></td>';m=m+'<input class="comment" type="hidden" value="victim" name="type"></td>';m=m+'<button class="button" onclick="$(\'#contactForm\').trigger(\'submit\');"><span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">Dodaj!</div></span></button></td>';m=m+"</form>";$(".viewanimation").before(e("Idź do Alejek","/alley/"));$(".viewanimation").after(m);var g='<form style="padding-left:15px;padding-right:15px;" action="/clan/profile/" name="massForm" id="massForm" class="clan-rupor" method="post">';g=g+'<input type="hidden" value="clan_message" name="action">';g=g+'<textarea name="text"></textarea><br/>'+t("Grypsownia!!!","button_szhertva")+"</form><br/>";
        $("#tutorial-pers").before(g);$("#button_szhertva").click(function(){$("#massForm").submit()});
        var y=parseInt(p[0])-parseInt(p[1])-10;
        if(y<0){$(".button-fight div.c").text("OSTROŻNIE!!!")}
        var w=$(".fighter1 span.level").text();
        var E=$(".fighter2 span.level").text();
        $(".fighter1 span.level").text(w+" - "+p[0]);
        $(".fighter2 span.level").text(E+" - "+p[1])});
        $g={$b:function(e){return $("<button class='button' style='margin-right:5px' />").append('<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+e+"</div></span>")},$e:function(){return $("<div />").addClass("exp").append("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%'></div></div></div>")}};
        
        // Wyświetlanie czasów + czy wybiłeś danej osobie zęba, należy podać niżej swój NICK
        var nick = $("#personal b").text();
        var nick = nick.slice(0,nick.length - 5);
        if($("div[rel='block_step1']:visible"))
            $("tr[rel='clan2'] td:nth-child(2) a:last-child").each(function(){
                $(this).after("<u id='tim"+$(this).attr("href").substr(-6,5)+"'>...</u>");
                $.get($(this).attr("href"),function(e){
                var t=e.match(/\/([0-9a-f]+)\/animation/m);
                var n=e.match(/<br>(\d\d:\d\d:\d\d) \(/m);
                $("#tim"+t[1]).text(n[1])})
            });
            
            if($("div[rel='block_step2']:visible"))
            $("tr[rel='clan1'] td:nth-child(3) a:last-child").each(function(){
                $(this).after("<u id='tim"+$(this).attr("href").substr(-6,5)+"'>...</u>");
                $.get($(this).attr("href"),function(e){
                var t=e.match(/\/([0-9a-f]+)\/animation/m);
                var n=e.match(/<br>(\d\d:\d\d:\d\d) \(/m);
                $("#tim"+t[1]).text(n[1])})
            });
            
            if($("div[rel='block_step2']:visible"))
            $("tr[rel='clan1'] td:nth-child(3) a").each(function(){
                $(this).after("<u id='atim"+$(this).attr("href").substr(-6,5)+"' style='float: right; background: red; color: #ffffff; font-size: 10px;'></u>");
                $.get($(this).attr("href"),function(e){
                var t=e.match(/\/([0-9a-f]+)\/animation/m);
                
        // TUTAJ WSTAW SWÓJ NICK        
                var ile=e.match(/Maxlin/igm).length;
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                if(ile > 2) {wybity = "(X)";} else { wybity = "";}
                $("#atim"+t[1]).text(wybity)})
            });
            if($("div[rel='block_step1']:visible"))
            $("tr[rel='clan2'] td:nth-child(2) a").each(function(){
                $(this).after("<u id='atim"+$(this).attr("href").substr(-6,5)+"' style='float: right; background: red; color: #ffffff; font-size: 10px;'></u>");
                $.get($(this).attr("href"),function(e){
                var t=e.match(/\/([0-9a-f]+)\/animation/m);
                
        // TUTAJ WSTAW SWÓJ NICK        
                var ile=e.match(/Maxlin/igm).length;
        // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                if(ile > 2) {wybity = "(X)";} else { wybity = "";}
                $("#atim"+t[1]).text(wybity)})
            });
            
        
            
    $g={$b:function(e){return $("<button class='button' style='margin-right:5px' />").append('<span class="f"><i class="rl"></i><i class="bl"></i><i class="brc"></i><div class="c">'+e+"</div></span>")},$e:function(){return $("<div />").addClass("exp").append("<div class='bar' style='width:100%'><div><div class='percent' style='width:0%'></div></div></div>")}};
    $c();
    $("#servertime").before("<br><span style='position:absolute;right:30px'> <a href='/shop/'>Sklep</a> <a href='/berezka/'>101</a><a href='/shaurburgers/'>Praca</a><a href='/sovet/'>Rada</a> <a href='/bank/'>Bank</a>  <a href='/clan/profile/warstats/'>Wojna</a> </span> </span>");
    var source=function(){
        var e=parseInt($("span[rel='money']").text().replace(",",""));
        if(e>=750){var t=Math.floor(e/750);
        var n=$("input[name='ore']").closest("form").find("button[class='button']");
        var r='<button style="margin-top: 4px;" class="button" type="button">'+'<span class="f">'+'<i class="rl"></i>'+'<i class="bl"></i>'+'<i class="brc"></i>'+'<div class="c">Kup rudę za wszystkie monety. Dostaniesz  '+t+" rudy.</div>"+"</span>"+"</button>";
        var i=$(r);i.bind("click",t,function(){var e="Czy jesteś pewien, że chcesz kupić "+t+" rudy za wszystkie monety? Będzie cię to kosztować "+t*750+" syrenek.";
        if(window.confirm(e)){
        $("input[name='ore']").val(t).trigger("keyup");n.trigger("click")}
        });
        i.insertAfter("#bank-deposit-robbery")}};
        source="("+source+")();";
        var script=document.createElement("script");
        script.setAttribute("type","application/javascript");
        script.textContent=source;document.body.appendChild(script);
        document.body.removeChild(script);
        var clan_online=$("i.online").length;
        $("div.clan-members>h3").append(" / Online ("+clan_online+")");
        var all_money=parseInt($('span[rel="money"]').text().replace(",",""));
        var all_ore=parseInt($('span[rel="ore"]').text().replace(",",""));
        var all_neft=parseInt($('span[rel="oil"]').text().replace(",",""));
        $('span[rel="money"]').text(kFormatter(all_money));
        //$('span[rel="ore"]').text(kFormatter(all_ore));
        //$('span[rel="oil"]').text(kFormatter(all_neft));
        $("li i.online").parent().css("background-color","#a3ffa3");
        
        // Zakreślanie w TWT ataków i obrony
        $("span.name-resident b").css("color","#880000");$("span.name-arrived b").css("color","#008800");
        var name=$("li.me.alive span.user a").text();
        var name2=$("li.me.dead span.user a").text();
        if($("li.me.alive").length){
            $("div.text p:contains('"+name+"')").not("p.killed").css({background: "#FFDCA5", borderRadius: "4px", borderLeft: "3px solid #EB551A", paddingLeft: "15px"});
            $("div.text p").find("span:eq(0):contains('"+name+"')").parent().not("p.killed").not("p.bang").css({background: "#DFF8CE", borderRadius: "4px", borderLeft: "3px solid #5AC719", paddingLeft: "15px"});
            $("div.text p").find("span:eq(1):contains('"+name+"')").parent().not("p.killed").not("p.bang").css({background: "#DFF8CE", borderRadius: "4px", borderLeft: "3px solid #5AC719", paddingLeft: "15px"});

        }
        if($("li.me.dead").length){
            $("div.text p:contains('"+name2+"')").not("p.killed").css({background: "#FFDCA5", borderRadius: "4px", borderLeft: "3px solid #EB551A", paddingLeft: "15px"});
            $("div.text p").find("span:eq(0):contains('"+name2+"')").parent().not("p.killed").not("p.bang").css({background: "#DFF8CE", borderRadius: "4px", borderLeft: "3px solid #5AC719", paddingLeft: "15px"});
            $("div.text p").find("span:eq(1):contains('"+name2+"')").parent().not("p.killed").not("p.bang").css({background: "#DFF8CE", borderRadius: "4px", borderLeft: "3px solid #5AC719", paddingLeft: "15px"});

        }
        
        /* Przełączanie pomiędzy ostatnimi walkami - lewo / prawo
        $(document).keydown(function(e){
    switch(e.which) {
        case 37: // left
            var potnij = window.location.href;
            var potnij2 = potnij.slice(29,50);
            var idzdo = parseInt(potnij2) - 1;
            var url = "http://"+window.location.host+"/fight/"+idzdo;
            window.location = url;
        break;

        case 38: // up
        break;

        case 39: // right
            var potnij = window.location.href;
            var potnij2 = potnij.slice(29,50);
            var idzdo = parseInt(potnij2) + 1;
            var url = "http://"+window.location.host+"/fight/"+idzdo;
            window.location = url;
        break;

        case 40: // down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault();
});*/