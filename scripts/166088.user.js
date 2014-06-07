// ==UserScript==
// @name          Tieba_Tail_Plus
// @include       http://tieba.baidu.com/f*
// @include       http://tieba.baidu.com/p/*
// @description   百度贴吧自动回复内容/小尾巴脚本 *快捷回复:Shift+Enter
// @version       2013.10.31.1
// @grant         GM_xmlhttpRequest
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         unsafeWindow
// @downloadURL   https://userscripts.org/scripts/source/166088.user.js
// @updateURL     https://userscripts.org/scripts/source/166088.meta.js
// @icon          http://h.hiphotos.baidu.com/album/s%3D740%3Bq%3D90/sign=b3bb49b55ab5c9ea66f301e7e502c73d/d53f8794a4c27d1e553b447a1ad5ad6eddc4386a.jpg
// @author        XiaotianChen
// @namespace     http://userscripts.org/users/XiaotianChen
// ==/UserScript==

// 这个脚本和某些贴吧脚本可能有冲突,如不能使用,可尝试只保留一个脚本 


var _window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var $ = _window.$;

(function l_init()
{
  if(document.querySelector(".ui_btn.ui_btn_m.j_submit.poster_submit"))
  {
    //=============//
    var theBr="<br>　——";

    var Bookmark="<br>"+'<img class="BDE_Image" height="11" width="560" src="http://imgsrc.baidu.com/forum/w%3D580/sign=6ca77dcee5dde711e7d243fe97edcef4/b03533fa828ba61e111605e44134970a314e5905.jpg"></img>';
    //============//

    Date.prototype.pattern=function(fmt) {         
       var o = {         
       "M+" : this.getMonth()+1, //月份         
       "d+" : this.getDate(), //日         
       //"h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //12小时制         
       "h+" : this.getHours(), //24小时制         
       "H+" : this.getHours(), //小时         
       "m+" : this.getMinutes(), //分         
       "s+" : this.getSeconds(), //秒         
       "q+" : Math.floor((this.getMonth()+3)/3), //季度         
       "S" : this.getMilliseconds() //毫秒         
       };        
      var week = {         
       "0" : "天",         
       "1" : "一",         
       "2" : "二",         
       "3" : "三",         
       "4" : "四",         
       "5" : "五",         
       "6" : "六"        
       };         
       if(/(y+)/.test(fmt)){         
           fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
       }         
       if(/(E+)/.test(fmt)){        
         fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);         
       }         
       for(var k in o){         
           if(new RegExp("("+ k +")").test(fmt)){         
               fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
           }         
       }         
       return fmt;         
    }
    //定义时间    
    var date =new Date().pattern(" EEE 第q季度");//var date =new Date().pattern("yyyy年MM月dd日 第q季度 EEE hh时mm分ss秒S毫秒");
    
    var CalendarData = new Array(100);

    var madd = new Array(12);

    var tgString = "甲乙丙丁戊己庚辛壬癸";

    var dzString = "子丑寅卯辰巳午未申酉戌亥";

    var numString = "一二三四五六七八九十";

    var monString = "正二三四五六七八九十冬腊";

    var weekString = "日一二三四五六";

    var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";

    var cYear, cMonth, cDay, TheDate;

    CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 
0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 
0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 
0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 
0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 
0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 
0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 
0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 
0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 
0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 
0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 
0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);

    madd[0] = 0;

    madd[1] = 31;

    madd[2] = 59;

    madd[3] = 90;

    madd[4] = 120;

    madd[5] = 151;

    madd[6] = 181;

    madd[7] = 212;

    madd[8] = 243;

    madd[9] = 273;

    madd[10] = 304;

    madd[11] = 334;

    function GetBit(m, n) {
        return (m >> n) & 1;
    }
    function e2c() {
        TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
        var total, m, n, k;
        var isEnd = false;
        var tmp = TheDate.getYear();
        if (tmp < 1900) {
            tmp += 1900;
        }
        total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;

        if (TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
            total++;
        }
        for (m = 0; ; m++) {
            k = (CalendarData[m] < 0xfff) ? 11 : 12;
            for (n = k; n >= 0; n--) {
                if (total <= 29 + GetBit(CalendarData[m], n)) {
                    isEnd = true; break;
                }
                total = total - 29 - GetBit(CalendarData[m], n);
            }
            if (isEnd) break;
        }
        cYear = 1921 + m;
        cMonth = k - n + 1;
        cDay = total;
        if (k == 12) {
            if (cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth = 1 - cMonth;
            }
            if (cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
                cMonth--;
            }
        }
    }

    function GetcDateString() {
        var tmp = "";
        tmp += tgString.charAt((cYear - 4) % 10);
        tmp += dzString.charAt((cYear - 4) % 12);
        tmp += "(";
        tmp += sx.charAt((cYear - 4) % 12);
        tmp += ")年 ";
        if (cMonth < 1) {
            tmp += "(闰)";
            tmp += monString.charAt(-cMonth - 1);
        } else {
            tmp += monString.charAt(cMonth - 1);
        }
        tmp += "月";
        tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : (cDay < 21) ? "二十" : ((cDay < 30) ? "廿" : "三十"));
        if (cDay % 10 != 0 || cDay == 10) {
            tmp += numString.charAt((cDay - 1) % 10);
        }
        return tmp;
    }
    function GetLunarDay(solarYear, solarMonth, solarDay) {
        //solarYear = solarYear<1900?(1900+solarYear):solarYear;
        if (solarYear < 1921 || solarYear > 2020) {
            return "";
        } else {
            solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
            e2c(solarYear, solarMonth, solarDay);
            return GetcDateString();
        }
    }
    //调用
    var D = new Date();
    var yy = D.getFullYear();
    var mm = D.getMonth() + 1;
    var dd = D.getDate();
    var ww = D.getDay();
    var ss = parseInt(D.getTime() / 1000);
    if (yy < 100) yy = "19" + yy;
    function GetCNDate() {
        return GetLunarDay(yy, mm, dd);
    }
    var d = "农历: "+GetCNDate();

    //定义输出时间格式
    var Today = d + date;

    //------------//
    //获取本地信息尾巴
    //获取操作系统信息
    var imfor="来自";

    userAgent=window.navigator.userAgent.toLowerCase();

    var OSlogo="";

    var screen=window.screen.width+"*"+window.screen.height;
    if(userAgent.indexOf("windows")>=1){
        var OSlogo='<img changedsize="true" pic_type="0" class="BDE_Image" src="http://imgsrc.baidu.com/forum/pic/item/7a3897510fb30f2424afaf25ca95d143ad4b030b.jpg" width="32" height="32">';
       if(userAgent.indexOf("wow64")>=1){var bit="(64位&nbsp;"+screen+")&nbsp;";}
       else
        {var bit="(32位&nbsp;"+screen+")&nbsp;";}
    }
    else
      {var bit="("+screen+")&nbsp;";} 

    if(userAgent.indexOf("windows nt 6.1")>=1){var S="Windows 7";}
    else
        if(userAgent.indexOf("windows nt 6.3")>=1){var S="Windows 8.1";}
    else
        if(userAgent.indexOf("windows nt 6.2")>=1){var S="Windows 8";}
    else
        if(userAgent.indexOf("windows nt 6.0")>=1){var S="Windows Vista";}
    else
        if(userAgent.indexOf("windows nt 5.1")>=1){var S="Windows XP";}
    else
        if(userAgent.indexOf("windows nt 5.2")>=1){var S="Windows 2003";}
    else
        if(userAgent.indexOf("linux")>=1){var S="Linux";}
    else
        if(userAgent.indexOf("mac")>=1){var S="MacOS";}
    else
        var S=" 非主流";
 /*else {
        var name=navigator.appName;
        if(name=="Microsoft Internet Explorer"){"你用的是IE浏览器！";}
     }*/
    var OS =OSlogo+ '<font color="#FF0000">' + S + '</font>' + bit;

    //获取浏览器信息
    var Blogo="";
    var fxlogo='<img changedsize="true" pic_type="0" class="BDE_Image" src="http://imgsrc.baidu.com/forum/s%3D1100%3Bq%3D90/sign=eab5c7cf7af40ad111e4c3e2671c2aae/574e9258d109b3de7c4c149fcdbf6c81810a4c52.jpg" width="32" height="32"></img>';
    var chlogo='<img changedsize="true" pic_type="0" class="BDE_Image" src="http://imgsrc.baidu.com/forum/s%3D680%3Bq%3D90/sign=3af9b5d40df431adb8d240317b0ddd92/d043ad4bd11373f00a4c3fd9a50f4bfbfbed0400.jpg" width="32" height="32"></img>';
    var ielogo='<imgchangedsize="true" pic_type="0"  class="BDE_Image" src="http://imgsrc.baidu.com/forum/s%3D680%3Bq%3D90/sign=16af1afd4610b912bbc1f5f6f3c68d3e/d6ca7bcb0a46f21f65b70315f7246b600d33aef1.jpg" width="32" height="32"></img>';
    var oplogo='<img changedsize="true" pic_type="0" class="BDE_Image" src="http://imgsrc.baidu.com/forum/s%3D680%3Bq%3D90/sign=216305a6f603918fd3d13ec2610657aa/9d82d158ccbf6c81c24e7eaebd3eb13533fa407e.jpg" width="37" height="40"></img>';

    //document.write("你用的是火狐浏览器！版本是：Firefox/"+versionName+"<br>");


    if ((userAgent.indexOf('msie') >= 0) && (navigator.userAgent.indexOf('microsoft internet explorer') < 0)){
       Blogo=ielogo;
       var Findex=userAgent.indexOf("msie");
       var versionName=userAgent.substr(Findex+"msie ".length,4);
       var Browser="IE "+versionName;
    }
    else
        if (userAgent.indexOf('firefox') >= 0){
           Blogo=fxlogo;
           var Findex=userAgent.indexOf("firefox/");
           var versionName=userAgent.substr(Findex+"firefox/".length,4);
           var Browser="Firefox "+versionName;
     }
    else
        if (userAgent.indexOf('opera') >= 0){
        Blogo=oplogo;
        var Findex=userAgent.indexOf("opera ");
        var versionName=userAgent.substr(Findex+"opera ".length,4);
        var Browser="Opera "+versionName;
     }
    else
        if (userAgent.indexOf('chrome') >= 0){
        Blogo=chlogo;
        var Findex=userAgent.indexOf("chrome/");
        var versionName=userAgent.substr(Findex+"chrome/".length,4);
        var Browser="Chrome "+versionName;
     }
    else
        {var Browser=" 非主流";}
    
      var Browser=Blogo+'<font color="#FF0000">'+Browser+'</font>'+"浏览器";

    var imfor=imfor+OS+"系统&"+Browser;
    
    //------土豪金图片------//
    var iPhone = '<img changedsize="true" pic_type="0" class="BDE_Image" src="http://imgsrc.baidu.com/forum/pic/item/55563fd12f2eb9380ab9a8ded7628535e4dd6f73.jpg" width="267" height="15"></img>';
    //============//

    var AddColor='</strong></font>';

    var huifu=["回帖，让楼主得到安慰、尊严、自信、存在感，<br>而我，只能得到一点点经验，<br>但，我还是要恳请lz，不要感慨和阻拦我如此地无私...拜！","曾经有人问我。。。楼主的帖子算不算好贴。。。我没有回答。。。由于我想起了一位传说中的大师----古龙先生的一段话：“天涯远不远？。。。天涯实在一点也不远。。。由于人已经在天涯。。。天涯还远吗?”<br>　　好帖啊。。。<br>　　难得一见的好贴。。。<br>　　楼主的文章简直是惊天地。。。泣鬼神。。。<br>　　图文并茂。。。嬉笑怒骂。。。<br>　　指点系词。。。激扬文字。。。<br>　　带给我们的仅仅是视觉上的感受吗?<br>　　大错特错。。。<br>　　楼主的文章带给我们的是心灵深处的震撼。。。<br>　　楼主的文章是宣言书。。。楼主的文章是宣传队。。。楼主的文章是播种机。。。楼主的文章带来的是读者的欣喜和系词的繁荣。。<br>我对楼主的景仰如同滔滔江水。。。连绵不尽。。。又如黄河泛滥。。。一发。。。而不可收拾。。。楼主的文笔实在用笔墨难以形容。。。熄了灯。。。打着赤脚。。。将整个人都倦在大班椅里。。。喝着清茶看那一个个帖子在mop之间","Last year I bought a watch<br>昨年、私はテーブルを買った<br>어제, 개인 불독 を は 테 ー っ 따 구입<br>ปีที่แล้วผมซื้อตาราง","小时候老师在黑板上讲解“帅”的含义,我不懂，同桌的女孩红著脸递给我一面镜子，一瞬间我明白了...","觉水","觉厉",""];
    
    var hf=GM_getValue('huifuContent','0');

    var huifustyle=['<font color="#FF0000">','<strong>','<font color="#FF0000"><strong>',""];
    
    var hs=GM_getValue('hStyle','0');
    
    var weiba=[Bookmark+theBr+imfor+theBr+Today,Bookmark+theBr+navigator.userAgent+theBr+Date(),"<br>——像火狐一样为自由而生<br>"+iPhone,""];
      
    var wb=GM_getValue('weibaContent','0');

    var weibastyle=['<font color="#FF0000">','<strong>','<font color="#FF0000"><strong>',""];
    
    var ws=GM_getValue('wStyle','0');
    
     //添加选择框按钮
    $(".poster_component.editor_content_wrapper.ueditor_container").after('<label>回复内容</label><select id="huifuList" name="selectDropDown" style="left:5px"><option name="huifu" id="huifu1">随机内容</option><option  name="huifu" id="huifu2">挽尊</option><option  name="huifu" id="huifu3">好帖</option><option  name="huifu" id="huifu4">MLGB</option><option name="huifu" id="huifu5">帅的含义</option><option name="huifu" id="huifu6">觉水</option><option name="huifu" id="huifu7">觉厉</option><option name="huifu" id="huifu8">自己输入</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>内容格式</label><select id="huifustyleList" name="selectDropDown" style="left:5px"><option name="huifustyle" id="huifustyle1">红色</option><option  name="huifustyle" id="huifustyle2">加粗</option><option  name="huifustyle" id="huifustyle3">红色加粗</option><option  name="huifustyle" id="huifustyle4">默认</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>尾巴内容</label><select id="weibaList" name="selectDropDown" style="left:5px"><option name="weiba" id="weiba1">随机尾巴</option><option  name="weiba" id="weiba2">中文UA+农历</option><option  name="weiba" id="weiba3">UA+Date</option><option  name="weiba" id="weiba4">FX吧座右铭</option><option  name="weiba" id="weiba5">无</option></select>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label>尾巴格式</label><select id="weibastyleList" name="selectDropDown" style="left:5px"><option name="weibastyle" id="weibastyle1">红色</option><option  name="weibastyle" id="weibastyle2">加粗</option><option  name="weibastyle" id="weibastyle3">红色加粗</option><option  name="weibastyle" id="weibastyle4">默认</option></select><br><br>')//position:relative; 
    //添加尾巴发表按钮
    $('.poster_posting_status.j_posting_status').after('<span id="reply"><a type="button" value="Tail" title="Shift+Enter快捷发表" class="j_submit ui_btn ui_btn_m" id="Tail"><span><em>尾巴发表</em></span></a></span>');

    document.getElementById("huifu2").value=huifu[0];
    document.getElementById("huifu3").value=huifu[1];
    document.getElementById("huifu4").value=huifu[2];
    document.getElementById("huifu5").value=huifu[3];
    document.getElementById("huifu6").value=huifu[4];
    document.getElementById("huifu7").value=huifu[5];
    document.getElementById("huifu8").value=huifu[6];

    document.getElementById("huifustyle1").value=huifustyle[0];
    document.getElementById("huifustyle2").value=huifustyle[1];
    document.getElementById("huifustyle3").value=huifustyle[2];
    document.getElementById("huifustyle4").value=huifustyle[3];
    
    document.getElementById("weiba2").value=weiba[0];
    document.getElementById("weiba3").value=weiba[1];
    document.getElementById("weiba4").value=weiba[2];
    document.getElementById("weiba5").value=weiba[3];

    document.getElementById("weibastyle1").value=weibastyle[0];
    document.getElementById("weibastyle2").value=weibastyle[1];
    document.getElementById("weibastyle3").value=weibastyle[2];
    document.getElementById("weibastyle4").value=weibastyle[3];

    switch(hf)
    {
      case '0':$('option[name="huifu"][id="huifu1"]').get(0).selected = true;break;
      case '1':$('option[name="huifu"][id="huifu2"]').get(0).selected = true;break;
      case '2':$('option[name="huifu"][id="huifu3"]').get(0).selected = true;break;
      case '3':$('option[name="huifu"][id="huifu4"]').get(0).selected = true;break;
      case '4':$('option[name="huifu"][id="huifu5"]').get(0).selected = true;break;
      case '5':$('option[name="huifu"][id="huifu6"]').get(0).selected = true;break;
      case '6':$('option[name="huifu"][id="huifu7"]').get(0).selected = true;break;
      case '7':$('option[name="huifu"][id="huifu8"]').get(0).selected = true;break;
    }

    switch(hs)
    {
      case '0':$('option[name="huifustyle"][id="huifustyle1"]').get(0).selected = true;break;
      case '1':$('option[name="huifustyle"][id="huifustyle2"]').get(0).selected = true;break;
      case '2':$('option[name="huifustyle"][id="huifustyle3"]').get(0).selected = true;break;
      case '3':$('option[name="huifustyle"][id="huifustyle4"]').get(0).selected = true;break;
    }
      
    switch(wb)
    {
      case '0':$('option[name="weiba"][id="weiba1"]').get(0).selected = true;break;
      case '1':$('option[name="weiba"][id="weiba2"]').get(0).selected = true;break;
      case '2':$('option[name="weiba"][id="weiba3"]').get(0).selected = true;break;
      case '3':$('option[name="weiba"][id="weiba4"]').get(0).selected = true;break;
      case '4':$('option[name="weiba"][id="weiba5"]').get(0).selected = true;break;
    }

    switch(ws)
    {
      case '0':$('option[name="weibastyle"][id="weibastyle1"]').get(0).selected = true;break;
      case '1':$('option[name="weibastyle"][id="weibastyle2"]').get(0).selected = true;break;
      case '2':$('option[name="weibastyle"][id="weibastyle3"]').get(0).selected = true;break;
      case '3':$('option[name="weibastyle"][id="weibastyle4"]').get(0).selected = true;break;
    }

    //============//


    //发表函数
    window.Tail = function () {
        
        GM_setValue('huifuContent',$("#huifuList").get(0).selectedIndex.toString());
        hf=$("#huifuList").get(0).selectedIndex.toString();
        var H;
        if (hf==0){H=huifu[Math.round(Math.random()*(huifu.length-1))];}
        else H=$('#huifuList').val();

        GM_setValue('hStyle',$("#huifustyleList").get(0).selectedIndex.toString());
        hs=$("#huifustyleList").get(0).selectedIndex.toString();
        var S1=$('#huifustyleList').val();

        GM_setValue('weibaContent',$("#weibaList").get(0).selectedIndex.toString());
        wb=$("#weibaList").get(0).selectedIndex.toString();
        var W;
        if (wb==0){W=weiba[Math.round(Math.random()*(weiba.length-1))];}
        else W=$('#weibaList').val();

        GM_setValue('wStyle',$("#weibastyleList").get(0).selectedIndex.toString());
        ws=$("#weibastyleList").get(0).selectedIndex.toString();
        var S2=$('#weibastyleList').val();

        
        //======内容输出======//
        var cnt = $("#ueditor_replace").html();
        cnt = S1 + H + cnt + AddColor + "<br>" + S2 + W+ AddColor;
       
        $("#ueditor_replace").html(cnt);
        $('.ui_btn.ui_btn_m.j_submit.poster_submit span').click();
    }
    //事件监听
    var f = document.getElementById("Tail");
    f.addEventListener("click", Tail, false);
    //快捷键 shift+enter
    
    window.hotkey=function (event) 
    {
      if (event.shiftKey && event.keyCode == 13) 
      {
        Tail();//if ($("#ueditor_replace").is(":focus")) Tail();
      }
    }
    document.onkeydown = hotkey;
  }
  else
    setTimeout(l_init,100);
})();

