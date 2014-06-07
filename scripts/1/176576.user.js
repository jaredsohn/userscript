// ==UserScript==
// @name           النهب من صفحة التقارير
// @namespace      حرب القبائل
// @version        2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/game.php*&mode=all&screen=report
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
$.ajaxSetup({ cache: true });

switch(game_data.world){
    case "ae10":
    case "ae17":
    case "ae19":
    case "aep1":
        WS = 1;
        US = 1;
        break;
    case "ae16":
        WS = 2;
        US = 0.5;
        break;
    case "ae18":
        WS = 1.5;
        US = 0.75;
        break;
    case "aes1":
        WS = 400;
        US = 1;
        break;
}

var spd = WS*US;

if (!document.URL.match('screen=report')){
    if (!document.URL.match('screen=place')){
        UI.InfoMessage('السكربت يشتغل من صفحة التقارير',3000,true);
    }
}else if (!document.URL.match('screen=place')){
    if (!document.URL.match('screen=report')){
        UI.InfoMessage('السكربت يشتغل من صفحة التقارير',3000,true);
    }
}
    
    $(function(){
        if(document.URL.indexOf("light") >= 0){
            var light_c = document.URL.match(/\d+/g)[3];
            if(light_c == 3000){
                $("#units_form").find(".vis:eq(7)").find(".nowrap:eq(1)").find("a:eq(1)")[0].click();
            }else{
                $("#unit_input_light").val(light_c);
            }
        }else if(document.URL.indexOf("spear") >= 0){
            var spear_u = document.URL.match(/\d+/g)[3];
            if(spear_u == 8000){
                $("#units_form").find(".vis:eq(6)").find(".nowrap:eq(0)").find("a:eq(1)")[0].click();
            }else{
                $("#unit_input_spear").val(spear_u);
            }
        } 
            if(document.URL.indexOf("spy") >= 0){
                var spy_c = document.URL.match(/\d+/g)[4];
                $("#unit_input_spy").val(spy_c);
            }
    });

$("#report_list").each(function(){
    var villageID = document.URL.match(/\d+/g)[1];
    $(this).find("tr:first").find("th:eq(1)").after('<th><img src="/graphic/unit/unit_spear.png"></th>');
    $(this).find("tr:first").find("th:eq(1)").after('<th><img src="/graphic/unit/unit_light.png"></th>');
    $(this).find("th:last").after("<th></th><th></th>");
    $(this).find("tr").find("td:eq(1)").after('<td>\
<a href="/game.php?village=' + villageID + '&amp;target=trgt&amp;screen=place&amp;spear=aywoc&amp;spy=4" class="hell" onclick="$(this).parent(\'td\').parent(\'tr\').remove();" target="_blank">\
<img src="/graphic/unit/unit_spear.png" title="مقاتل الرمح">\
</a>\
</td>');
    $(this).find("tr").find("td:eq(1)").after('<td>\
<a href="/game.php?village=' + villageID + '&amp;target=trgt&amp;screen=place&amp;light=aywac&amp;spy=4" class="hell" onclick="$(this).parent(\'td\').parent(\'tr\').remove();" target="_blank">\
<img src="/graphic/unit/unit_light.png" title="فارس خفيف">\
</a>\
</td>');
});

$("#report_list").each(function(){
    var $this = $(this);
    var t = $this.html();
    $this.html(t.replace(/checkbox/g,"radio"));  
});

$("#report_list").find("tr").find("td:first").find("input:first").attr("name","rdo");

function hello(){
    $(".wac:last").find("#attack_spy").find("b").parent().contents().filter(function(){
        return this.nodeType != 1;
    }).wrap("<span></span>");
    
    $(".wac:last").find("span:contains('الخشاب')").attr("id","wood");
    $(".wac:last").find("span:contains('حفرة الطمي')").attr("id","stone");
    $(".wac:last").find("span:contains('منجم الحديد')").attr("id","iron");
    $(".wac:last").find("span:contains('المخازن')").attr("id","store");
    $(".wac:last").find("span:contains('المخابئ')").attr("id","hide");
    
    $(".wac:last").find("#attack_spy").find("tr:eq(0)").find("td:eq(0)").find(".grey").remove();
    
    var local_village = game_data.village.coord.split("|");   
    var remote_village = $(".wac:last").find(".village_anchor:last").find("a:eq(0)").text().split(" ");
    var remote = remote_village[2].split("|");
    var rma = remote[1].match(/\d+/)[0];
    var rmb = remote[0].match(/\d+/)[0];
    var distance = Math.sqrt(Math.pow(local_village[0] - rmb, 2) + Math.pow(local_village[1] - rma, 2)).toFixed(2);
    var dlight = ((distance*600)/spd);
    var dspear = ((distance*1080)/spd);
    
    var a = $("#serverTime").html().split(":");
    var aa = (a[0]*3600)+(a[1]*60)+(a[2]*1);
    
    var b = $(".wac:last").find(".nopad").find(".vis:eq(1)").find("tr:eq(1)").find("td:eq(1)").html().split(" ");
    var bb = b[4].split(":");
    var bbb = (bb[0]*3600)+(bb[1]*60)+(bb[2]*1);
    
    var r = aa-bbb;
    
    var d = $("#serverDate").html().split("/");
    var dd = d[0];
    
    var e = $(".wac:last").find(".nopad").find(".vis:eq(1)").find("tr:eq(1)").find("td:eq(1)").html().split(",");
    var ee = e[0].split(" ");
    var eee = ee[2];
    
    var day = dd-eee;
    
    if(day >= 1){
        var z = (r+((24*3600)*day))+dlight;
        var z1 = (r+((24*3600)*day))+dspear;
    }else if(day == 0){
        var z = r+dlight;
        var z1 = r+dspear;
    }
        
        var u = $(".wac:last").find("#wood + b").text().match(/\d+/g)[0];
    var v = $(".wac:last").find("#stone + b").text().match(/\d+/g)[0];
    var w = $(".wac:last").find("#iron + b").text().match(/\d+/g)[0];
    var x = $(".wac:last").find("#store + b").text().match(/\d+/g)[0];
    var y = $(".wac:last").find("#hide + b").text().match(/\d+/g)[0];
    
    switch(u){
        case"1":L=30;break;case"2":L=35;break;case"3":L=41;break;case"4":L=47;break;case"5":L=55;break;case"6":L=64;break;
        case"7":L=74;break;case"8":L=86;break;case"9":L=100;break;case"10":L=117;break;case"11":L=136;break;case"12":L=158;break;
        case"13":L=184;break;case"14":L=214;break;case"15":L=249;break;case"16":L=289;break;case"17":L=337;break;case"18":L=391;break;
        case"19":L=455;break;case"20":L=530;break;case"21":L=616;break;case"22":L=717;break;case"23":L=833;break;case"24":L=969;break;
        case"25":L=1127;break;case"26":L=1311;break;case"27":L=1525;break;case"28":L=1774;break;case"29":L=2063;break;case"30":L=2400;break;
    }switch(v){
        case"1":M=30;break;case"2":M=35;break;case"3":M=41;break;case"4":M=47;break;case"5":M=55;break;case"6":M=64;break;
        case"7":M=74;break;case"8":M=86;break;case"9":M=100;break;case"10":M=117;break;case"11":M=136;break;case"12":M=158;break;
        case"13":M=184;break;case"14":M=214;break;case"15":M=249;break;case"16":M=289;break;case"17":M=337;break;case"18":M=391;break;
        case"19":M=455;break;case"20":M=530;break;case"21":M=616;break;case"22":M=717;break;case"23":M=833;break;case"24":M=969;break;
        case"25":M=1127;break;case"26":M=1311;break;case"27":M=1525;break;case"28":M=1774;break;case"29":M=2063;break;case"30":M=2400;break;
    }switch(w){
        case"1":N=30;break;case"2":N=35;break;case"3":N=41;break;case"4":N=47;break;case"5":N=55;break;case"6":N=64;break;
        case"7":N=74;break;case"8":N=86;break;case"9":N=100;break;case"10":N=117;break;case"11":N=136;break;case"12":N=158;break;
        case"13":N=184;break;case"14":N=214;break;case"15":N=249;break;case"16":N=289;break;case"17":N=337;break;case"18":N=391;break;
        case"19":N=455;break;case"20":N=530;break;case"21":N=616;break;case"22":N=717;break;case"23":N=833;break;case"24":N=969;break;
        case"25":N=1127;break;case"26":N=1311;break;case"27":N=1525;break;case"28":N=1774;break;case"29":N=2063;break;case"30":N=2400;break;
    }switch(x){
        case"1":S=1000;break;case"2":S=1229;break;case"3":S=1512;break;case"4":S=1859;break;case"5":S=2285;break;case"6":S=2810;break;
        case"7":S=3454;break;case"8":S=4247;break;case"9":S=5222;break;case"10":S=6420;break;case"11":S=7893;break;case"12":S=9705;break;
        case"13":S=11932;break;case"14":S=14670;break;case"15":S=18037;break;case"16":S=22177;break;case"17":S=27266;break;case"18":S=33523;break;
        case"19":S=41217;break;case"20":S=50675;break;case"21":S=62305;break;case"22":S=76604;break;case"23":S=94184;break;case"24":S=115798;break;
        case"25":S=142373;break;case"26":S=175047;break;case"27":S=215219;break;case"28":S=264611;break;case"29":S=325337;break;case"30":S=400000;break;
    }switch(y){
        case"1":T=150;break;case"2":T=200;break;case"3":T=267;break;case"4":T=356;break;case"5":T=474;break;case"6":T=632;break;
        case"7":T=843;break;case"8":T=1125;break;case"9":T=1500;break;case"10":T=2000;break;
    }
    
    var ll = ((L/3600)*WS);
    var mm = ((M/3600)*WS);
    var nn = ((N/3600)*WS);
    var res = $(".wac:last").find("#attack_spy").find("tr:eq(0)").find("td:eq(0)").text().split(" ");
    var o = res[1];
    var p = res[3];
    var q = res[5];
    var LL = ((z*ll)+(o*1)).toFixed(0);
    var SS = S-T;
    if(LL > SS){
        var LL = SS;
    }
    var LL1 = ((z1*ll)+(o*1)).toFixed(0);
    if(LL1 > SS){
        var LL1 = SS;
    }
    var MM = ((z*mm)+(p*1)).toFixed(0);
    if(MM > S){
        var MM = SS;
    }
    var MM1 = ((z1*mm)+(p*1)).toFixed(0);
    if(MM1 > SS){
        var MM1 = SS;
    }
    var NN = ((z*nn)+(q*1)).toFixed(0);
    if(NN > SS){
        var NN = SS;
    }
    var NN1 = ((z1*nn)+(q*1)).toFixed(0);
    if(NN1 > SS){
        var NN1 = SS;
    }
    var target = $(".wac:last").find(".village_anchor:last").find("a:eq(0)").attr("href").match(/\d+/g)[1];
    var final = ((((LL*1)+(MM*1)+(NN*1))/80)+1).toFixed(0);
    if(final > 3000){
        var final = 3000;
    }
    var final1 = ((((LL1*1)+(MM1*1)+(NN1*1))/25)+2).toFixed(0);
    if(final1 > 8000){
        var final1 = 8000;
    }
    $("#report_list").find("tr").find("td:first").find(":checked").parent("td").parent("tr").find("td:eq(2),td:eq(3)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/trgt/g,""+target+""));
    });
    $("#report_list").find("tr").find("td:first").find(":checked").parent("td").parent("tr").find("td:eq(2)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/aywac/g,""+final+""));  
    });
    $("#report_list").find("tr").find("td:first").find(":checked").parent("td").parent("tr").find("td:eq(3)").each(function(){
        var $this = $(this);
        var t = $this.html();
        $this.html(t.replace(/aywoc/g,""+final1+""));  
    });
    if(null!==final1){
        $(".wac:last").remove();
        $("#report_list").find("tr").find("td:first").find(":checked").nextAll("span:first").find("a:first").attr("style","color:#0000ff");
    }
}

$("#report_list").find("tr").find("td:first").find("input:first").attr('onclick','$(this).nextAll("span:first").find("a:first").each(function(){\
$("#report_list").after("<div class=\'wac\' style=\'display:none\'></div>");\
var url = $(this).attr("href");\
$.ajax({\
url:url,\
datatype:"html",\
cache:true,\
success :function(data){\
var report = $(data).find(".vis:eq(1)");\
$(".wac:first").append(report);\
}\
});\
});');

$("#report_list").find("tr").attr('onmousemove','hello()');