// ==UserScript==
// @name            Kaixin001 Helper
// @namespace       RealSex
// @description     kaixin001助手
// @include         http://*.kaixin001.tld/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @require         http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.1/jquery-ui.js
// ==/UserScript==


//2009-5-26
//增加全部好友列表，方便直接选择，而不用点左右邻居
//增加刷新按钮，可以直接刷新当前好友的数据
//增加做事按钮，一次性完成对当前花园的浇水、除草、捉虫、收获、犁地
//增加全做按钮，把全部好友循环进行一次“做事”的功能.

//2009-06-22
//增加牧场辅助功能
(function() {
    var isDebug = true;
    $(document).ready(function() {
        //设置jQuery同步模式
        $.ajaxSetup({ async: false, cache: false, global: false });
        //if($(this).attr("title") === '') return;

        //extStyle.load();

        if (thisPage.isGarden) { (new Garden()).loadFunc(); };
        if (thisPage.isHouse) { (new House()).loadFunc(); };
        if (thisPage.isRanch) { (new Ranch()).loadFunc(); };

        $("#head").attr("style", "background : #6B86B3");
        $("img[src=http://img.kaixin001.com.cn/i2/kaixinlogo.gif]").attr("src", "");
        $(".m1t").attr("style", "background : #6B86B3");

    });

    var settings = {
        adrHouse: /\/!house\/index.php(\?fuid=\d+)$/,
        adrHouse1: /\/!house\/index.php/,
        adrHouse2: /\/~house\/index.php/,
        adrGarden: /\/!house\/garden\/index.php(#\d+)$/,
        adrGarden1: /\/!house\/garden\/index.php/,
        adRanch: /\/!house\/ranch\/index.php(#d+)$/,
        adRanch1: /\/!house\/ranch\/index.php/,
        r: function() { return Math.random(); },
        rt: function() {
            var t = arguments[0] ? arguments[0] : 0;
            return Math.round(Math.random() * 10) * 50 + 100 + t * 500; //按批次，设置时间
        }
    };

    var thisPage = {
        isHouse: settings.adrHouse.test(location.href) || settings.adrHouse1.test(location.href) || settings.adrHouse2.test(location.href),
        isGarden: settings.adrGarden.test(location.href) || settings.adrGarden1.test(location.href),
        isRanch: settings.adRanch.test(location.href) || settings.adRanch1.test(location.href)
    };


    var Garden = function() {
        var sMyid, sVerify, aFriends = [];
        var sUrlfarm = "http://www.kaixin001.com/!house/!garden//getconf.php"
        , sUrlAllfriend = "http://www.kaixin001.com/interface/suggestfriend.php"
        , urlwater = "http://www.kaixin001.com/!house/!garden/water.php"
        , urlgrass = "http://www.kaixin001.com/!house/!garden/antigrass.php"
        , urlvermin = "http://www.kaixin001.com/!house/!garden/antivermin.php"
        , urlget = "http://www.kaixin001.com/!house/!garden/havest.php"
        , urlplough = "http://www.kaixin001.com/!house/!garden/plough.php";

        //农场数据XML格式转为JSON格式
        farmxml2json = function(sxml) {
            if (sxml) {
                try {
                    var jsonfarms = { farm: [] };
                    var f, s = "";
                    var farms = $("garden", sxml)[0].getElementsByTagName("item");
                    for (var i = 0, n = farms.length; i < n; i++) {
                        f = farms[i];
                        var sts = f.getElementsByTagName("status")[0];
                        //只保留可用土地的数据
                        if (sts.innerHTML != "1") continue;

                        var jsonf = {};
                        jsonf["farmnum"] = f.getElementsByTagName("farmnum")[0].innerHTML;
                        jsonf["fuid"] = f.getElementsByTagName("fuid")[0].innerHTML;
                        jsonf["shared"] = f.getElementsByTagName("shared")[0].innerHTML;
                        jsonf["water"] = f.getElementsByTagName("water")[0].innerHTML; //水：water小于5需要浇
                        jsonf["cropsid"] = f.getElementsByTagName("cropsid")[0].innerHTML; //犁地：crops为空，seedid非空，cropsid不等于0
                        jsonf["cropsstatus"] = f.getElementsByTagName("cropsstatus").length > 0 ? f.getElementsByTagName("cropsstatus")[0].innerHTML : ""; //犁地状态
                        jsonf["grass"] = f.getElementsByTagName("grass")[0].innerHTML; //杂草：grass=1有，0无
                        jsonf["vermin"] = f.getElementsByTagName("vermin")[0].innerHTML; //虫子：vermin=1有，0无
                        jsonf["grow"] = f.getElementsByTagName("grow").length > 0 ? f.getElementsByTagName("grow")[0].innerHTML : ""; //生长期，grow等于totalgrow表示可以收获
                        jsonf["totalgrow"] = f.getElementsByTagName("totalgrow").length > 0 ? f.getElementsByTagName("totalgrow")[0].innerHTML : ""; //总生长期
                        jsonf["seedid"] = f.getElementsByTagName("seedid").length > 0 ? f.getElementsByTagName("seedid")[0].innerHTML : ""; //种子ID
                        jsonf["name"] = f.getElementsByTagName("name").length > 0 ? f.getElementsByTagName("name")[0].innerHTML : ""; //种子名称
                        jsonf["crops"] = f.getElementsByTagName("crops").length > 0 ? f.getElementsByTagName("crops")[0].innerHTML : ""; //生长状态（描述）
                        jsonf["pic"] = f.getElementsByTagName("pic").length > 0 ? f.getElementsByTagName("pic")[0].innerHTML : ""; //图片
                        jsonf["fruitpic"] = f.getElementsByTagName("fruitpic").length > 0 ? f.getElementsByTagName("fruitpic")[0].innerHTML : ""; //水果图片（房子）
                        jsonfarms["farm"].push(jsonf);
                    }
                    return jsonfarms;
                }
                catch (e) { return null }
            }
            return null;
        }
        farmxmlresult2json = function(sxml) {
            if (sxml) {
                var jsonresult = {};
                //var dt = $("data", sxml);
                //var d = dt[0];
                var dt;
                dt = document.getElementById("dvResult");
                if (!dt) {
                    dt = document.createElement("div");
                    $(dt).attr({ id: "dvResult", style: "display:none" });
                    if (isDebug) $("#dv_testout").prepend(dt); ;
                    //if (isDebug) $("#dv_testout").prepend("创建dvResult");
                }
                dt.innerHTML = sxml;
                var d = dt.getElementsByTagName("data")[0];
                jsonresult["ret"] = d.getElementsByTagName("ret")[0].innerHTML;
                try {
                    jsonresult["anti"] = d.getElementsByTagName("anti")[0].innerHTML;
                } catch (e) { jsonresult["anti"] = "0"; }

                return jsonresult;
            }
            return null;
        }
        getFuid = function() {
            var str = window.location.href.split("#");
            var fuid = str.length > 1 ? str[1] : sMyid;
            return fuid == 0 ? sMyid : fuid;
        }

        setVerify = function() {
            var sc = $("script");
            var ibgn, iend;
            for (var i = 0, n = sc.length; i < n; i++) {
                var s = sc[i].innerHTML;
                var ibgn = s.indexOf("var g_verify");
                if (ibgn > -1) {
                    ibgn = s.indexOf("\"", ibgn);
                    iend = s.indexOf("\";", ibgn);
                    sVerify = s.substring(ibgn + 1, iend);
                    return;
                }
            }
            sVerify = "";
        }

        setmyid = function() {
            if (!sVerify) { setVerify() }
            if (sVerify) sMyid = sVerify.split("_")[0];
        }

        _goodFuncLoop = function(friends) {
            //浇水功能
            waterFunc = function(i_frd, i_f, i_t) {
                var frd = i_frd, f = i_f, t = i_t;
                var pars = { seedid: 0, verify: escape(sVerify), fuid: frd.id, farmnum: f.farmnum, r: settings.r() };
                var data = $.get(urlwater, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("浇水" + f.farmnum + "" + jret.ret + santi);
            }

            //除草功能
            grassFunc = function(i_frd, i_f, i_t) {
                var frd = i_frd, f = i_f, t = i_t;
                var pars = { fuid: frd.id, seedid: 0, verify: escape(sVerify), farmnum: f.farmnum, r: settings.r() };
                var data = $.get(urlgrass, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("除草" + f.farmnum + "" + jret.ret + santi);
            }

            //捉虫功能
            verminFunc = function(i_frd, i_f, i_t) {
                var frd = i_frd, f = i_f, t = i_t;
                var pars = { fuid: frd.id, seedid: 0, verify: escape(sVerify), farmnum: f.farmnum, r: settings.r() };
                var data = $.get(urlvermin, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("捉虫" + f.farmnum + "" + jret.ret + santi);
            }


            //收获功能
            getFunc = function(i_frd, i_f, i_t) {
                var frd = i_frd, f = i_f, t = i_t;
                var pars = { fuid: frd.id, seedid: 0, verify: escape(sVerify), farmnum: f.farmnum, r: settings.r() };
                var data = $.get(urlget, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("收获" + "(" + f.name + ")" + "" + jret.ret + santi);
                //收获完之后犁地
                //犁地：cropsstatus=3,是自己的地或自己种在别人家的爱心地
                if (frd.id == sMyid || f.fuid == sMyid) { ploughFunc(frd, f); }
            }

            //犁地功能
            ploughFunc = function(i_frd, i_f, i_t) {
                var frd = i_frd, f = i_f, t = i_t;
                var pars = { fuid: frd.id, seedid: 0, verify: escape(sVerify), farmnum: f.farmnum, r: settings.r() };
                var data = $.get(urlplough, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("犁地" + f.farmnum + "" + jret.ret + santi);
            }

            _dowork = function(i_frd, data) {
                var jsonfarms = farmxml2json(data);
                if (!jsonfarms) return;
                for (i = 0, ic = jsonfarms["farm"].length; i < ic; i++) {
                    var frd = i_frd;
                    var f = jsonfarms["farm"][i];
                    //浇水：小于5需要浇
                    if (f.water < 5) { waterFunc(frd, f); }

                    //杂草：grass=1有，0无
                    if (f.grass == "1") { grassFunc(frd, f); }

                    //虫子：vermin=1有，0无
                    if (f.vermin == "1") { verminFunc(frd, f); }

                    //收获:生长期grow等于totalgrow,并且cropsstatus==1表示可以收获(cropsstatus==2表示已偷过)
                    //不收获好友地里的牧草(太多) 
                    if (f.grow != "" && f.grow == f.totalgrow && (f.cropsstatus == 1 || f.cropsstatus == 2) && (f.seedid != "63" && frd.id != sMyid || frd.id == sMyid) && f.crops.indexOf("已偷") <= 0) { getFunc(frd, f); }

                    //犁地：cropsstatus=3,是自己的地或自己种在别人家的爱心地
                    if ((f.cropsstatus == 3 || f.cropsstatus == -1) && (frd.id == sMyid || f.fuid == sMyid)) { ploughFunc(frd, f); }
                }
            }

            if (isDebug) $("#dv_testout").empty();
            for (var x = 0, xc = friends.length; x < xc; x++) {
                var frd = friends[x];
                //获取当前好友的花园数据
                var pars = { verify: sVerify, fuid: frd.id, sr: settings.r };
                if (isDebug) $("#dv_testout").append("<div id='_test" + frd.id + "'>" + frd.name + ":</div>");
                var data = $.get(sUrlfarm, pars).responseText;
                _dowork(frd, data);
            }
            if (isDebug) $("#dv_testout").append("操作结束！");
        }

        goodFunc = function() {
            var f, fuid = getFuid();
            for (var i = 0, ic = aFriends.length; i < ic; i++) {
                f = aFriends[i];
                if (f.id == fuid) {
                    _goodFuncLoop([f]);
                    return;
                }
            }

            //循环
            var iTime = document.getElementById("_txtTime").value;
            if (iTime) {
                window.setTimeout(goodFunc, iTime * 60000);
            }
        }

        addGoodFunc = function() {
            var _h_btn = document.createElement('input');
            $(_h_btn).attr({ id: "_btn_good", type: "button", value: "做事", title: "浇水,除草,捉虫,收获,犁地" });
            $(".ml5").prepend(_h_btn);
            $(_h_btn).click(goodFunc);
        }

        addRefreshFunc = function() {
            $(".ml5").prepend("<input onclick='gotoFriend(g_fuid)' value='刷新' type='button'/>");
        }

        //增加好友列表
        addFriendFunc = function() {
            $(".ml5").prepend("<div id='_dv_friend' style='width:100%'></div>");
            var pars = { pars: "", type: "all", _: "" };
            var data = $.post(sUrlAllfriend, pars).responseText;
            var fs = eval("(" + data + ")"), f;
            aFriends = [];
            for (var i = 0, ic = fs.length; i < ic; i++) {
                f = fs[i];
                var divf = document.createElement("div");
                var d = $(divf);
                d.attr({ style: 'float:left ;width:70px', id: f.uid });
                d.append("<a href=\"javascript:gotoFriend('" + f.uid + "')\"><img src=\"" + f.icon20 + "\" />" + f.real_name.substring(0, 4) + "</a>");
                $("#_dv_friend").append(d);
                aFriends.push({ id: f.uid, name: f.real_name });
            }
        }


        addCustomTblFunc = function() {
            var a = $(".house_navbg:eq(1)");
            a.after('<div class="house_navbg"><a class="sl2" href="/!house/ranch/index.php"><img align="absmiddle" src="http://img.kaixin001.com.cn/i2/house/gd2.gif"/>牧场</a></div>');
        }

        workAllFunc = function() {
            _goodFuncLoop(aFriends);
            //循环
            var iTime = document.getElementById("_txtTime").value;
            if (iTime) {
                window.setTimeout(workAllFunc, iTime * 60000);
            }
        }

        addWorkAllFunc = function() {
            var _h_btn = document.createElement('input');
            $(_h_btn).attr({ id: "_btn_goodall", type: "button", value: "全做", title: "浇水,除草,捉虫,收获,犁地" });
            $(".ml5").prepend(_h_btn);
            $(_h_btn).click(workAllFunc);
        }

        addRepeatTime = function() {
            var _h_btn = document.createElement('select');
            $(_h_btn).attr({ id: "_txtTime", value: "", title: "设置重复操作时间的间隔" });
            $(_h_btn).append("<option value=''></option>");
            $(_h_btn).append("<option value='1'>1</option>");
            $(_h_btn).append("<option value='2'>2</option>");
            $(_h_btn).append("<option value='5'>5</option>");
            $(_h_btn).append("<option value='10'>10</option>");
            $(_h_btn).append("<option value='20'>20</option>");
            $(_h_btn).append("<option value='30'>30</option>");
            $(_h_btn).append("<option selected value='60'>60</option>");
            $(".ml5").prepend(_h_btn);
        }

        this.loadFunc = function() {
            setmyid();          //初始化操作
            if (isDebug) $(".info_ts").before("<div id='dv_testout' style='width:100% ;'>Debug Out</div>"); //debug
            addFriendFunc();

            addRepeatTime();
            addWorkAllFunc();
            addGoodFunc();      //做事
            addRefreshFunc();   //刷新
            addCustomTblFunc();
        }
    }


    var House = function() {
        var sUrlAllfriend = "http://www.kaixin001.com/interface/suggestfriend.php";        //增加好友列表
        addFriendFunc = function() {
            //var sp=$(".house_nav");
            //sp.after("<div id='_dv_friend' style='width:100%'></div>");
            var sp = $(".house_nav + div").children(".l:eq(1)").children(".c + div");
            sp.empty();
            sp.append("<div id='_dv_friend' style='width:250px;float:left'></div>");
            var pars = { pars: "", type: "all", _: "" };
            var data = $.post(sUrlAllfriend, pars).responseText;
            var fs = eval("(" + data + ")"), f;
            for (var i = 0, ic = fs.length; i < ic; i++) {
                f = fs[i];
                var divf = document.createElement("div");
                var d = $(divf);
                d.attr({ style: 'float:left ;width:80px', id: f.uid });
                //d.append("<img src=\"" + f.icon20 + "\" />&nbsp;<a href=\"javascript:stayhouse2('" + f.uid + "',0,0)\">抢</a><br/><a href=\"javascript:gotoUser("+ f.uid +")\">"+f.real_name+"</a><br/>");
                d.append("<a href=\"javascript:stayhouse2('" + f.uid + "',0,0)\"><img src=\"" + f.icon20 + "\" title='抢来我家住'/></a>&nbsp;<a href=\"javascript:gotoUser(" + f.uid + ")\">" + f.real_name.substring(0, 4) + "</a>&nbsp;");
                $("#_dv_friend").append(d);
            }
        }

        addCustomTblFunc = function() {
            var a = $(".house_navbg:eq(1)");
            a.after('<div class="house_navbg"><a class="sl2" href="/!house/ranch/index.php"><img align="absmiddle" src="http://img.kaixin001.com.cn/i2/house/gd2.gif"/>牧场</a></div>');
        }

        this.loadFunc = function() {
            if (isDebug) $(".info_ts").before("<div id='dv_testout' style='width:100% ;'>Debug Out</div>"); //debug
            addCustomTblFunc();

            addFriendFunc();
        }

    }

    var Ranch = function() {
        var sMyid, sVerify, aFriends = [];
        var sUrlranch = "http://www.kaixin001.com/!house/!ranch//getconf.php"
        , sUrlAllfriend = "http://www.kaixin001.com/interface/suggestfriend.php"
        , urlwater = "http://www.kaixin001.com/!house/!ranch//water.php"
        , urlfood = "http://www.kaixin001.com/!house/!ranch//food.php"
		, urlproduct = "http://www.kaixin001.com/!house/!ranch//product.php"
        , urlget = "http://www.kaixin001.com/!house/!ranch//havest.php"
		, urlmhavest = "http://www.kaixin001.com/!house/!ranch//mhavest.php";

        //牧场数据XML格式转为JSON格式
        ranchxml2json = function(sxml) {
            if (!sxml) { return null; }
            try {
                var jsonRanch = { animals: [], product2: [] }; //动物,农产品
                var parser = new DOMParser();
                var dom = parser.parseFromString(sxml, "application/xml");
                var sconf = dom.getElementsByTagName('conf')[0];

                //水量
                jsonRanch["water"] = sconf.getElementsByTagName("water")[0].textContent;
                var stmp = sconf.getElementsByTagName("watertips")[0].textContent;
                jsonRanch["needwater"] = stmp.indexOf("需加水") > 0 ? 1 : 0;

                //牧草量
                jsonRanch["grass"] = sconf.getElementsByTagName("grass")[0].textContent;
                jsonRanch["needgrass"] = sconf.getElementsByTagName("grasstips")[0].textContent.indexOf("需添加") > 0 ? 1 : 0;

                jsonRanch["policeurl"] = $("account", sxml)[0].getElementsByTagName("policeurl")[0].innerHTML;

                var itm;
                //动物
                var animals = $("animals", sxml)[0].getElementsByTagName("item");
                for (var i = 0, n = animals.length; i < n; i++) {
                    itm = animals[i];
                    var jsonf = {};
                    jsonf["animalsid"] = itm.getElementsByTagName("animalsid")[0].innerHTML;
                    jsonf["aname"] = itm.getElementsByTagName("aname")[0].innerHTML; //动物名字
                    jsonf["uid"] = itm.getElementsByTagName("uid")[0].innerHTML;
                    jsonf["aid"] = itm.getElementsByTagName("aid")[0].innerHTML;
                    jsonf["status"] = itm.getElementsByTagName("status")[0].innerHTML; //状态：0(生长),1(生产期),2(收获期)
                    jsonf["fstatus"] = itm.getElementsByTagName("fstatus")[0].innerHTML; //挨饿状态:0(正常),1(挨饿)
                    jsonf["tips"] = itm.getElementsByTagName("tips")[0].innerHTML; //描述
                    jsonf["bproduct"] = itm.getElementsByTagName("bproduct")[0].innerHTML; //生产状态：0(无),1(生产中),2(可生产)
                    jsonRanch["animals"].push(jsonf);
                }

                //农产品
                var product2 = $("product2", sxml)[0].getElementsByTagName("item");
                for (var i = 0, n = product2.length; i < n; i++) {
                    itm = product2[i];
                    var jsonf = {};
                    jsonf["num"] = itm.getElementsByTagName("num")[0].innerHTML; //数量
                    jsonf["stealnum"] = itm.getElementsByTagName("stealnum")[0].innerHTML; //被偷数量
                    jsonf["uid"] = itm.getElementsByTagName("uid")[0].innerHTML;
                    jsonf["aid"] = itm.getElementsByTagName("aid")[0].innerHTML;
                    jsonf["skey"] = itm.getElementsByTagName("skey")[0].innerHTML; //动物名字
                    jsonf["type"] = itm.getElementsByTagName("type")[0].innerHTML; //描述
                    jsonf["pname"] = itm.getElementsByTagName("pname")[0].innerHTML; //产品名字
                    jsonf["tips"] = itm.getElementsByTagName("tips")[0].innerHTML; //描述
                    jsonRanch["product2"].push(jsonf);
                }
                return jsonRanch;
            }
            catch (e) { return null }
        }
        farmxmlresult2json = function(sxml) {
            if (sxml) {
                var jsonresult = {};
                var dt;
                dt = document.getElementById("dvResult");
                if (!dt) {
                    dt = document.createElement("div");
                    $(dt).attr({ id: "dvResult", style: "display:none" });
                    if (isDebug) $("#dv_testout").prepend(dt); ;
                }
                dt.innerHTML = sxml;
                var d = dt.getElementsByTagName("data")[0];
                jsonresult["ret"] = d.getElementsByTagName("ret")[0].innerHTML;
                try {
                    jsonresult["anti"] = d.getElementsByTagName("anti")[0].innerHTML;
                } catch (e) { jsonresult["anti"] = "0"; }
                return jsonresult;
            }
            return null;
        }
        getFuid = function() {
            var str = window.location.href.split("#");
            var fuid = str.length > 1 ? str[1] : sMyid;
            return fuid == 0 ? sMyid : fuid;
        }

        setVerify = function() {
            var sc = $("script");
            var ibgn, iend;
            for (var i = 0, n = sc.length; i < n; i++) {
                var s = sc[i].innerHTML;
                var ibgn = s.indexOf("var g_verify");
                if (ibgn > -1) {
                    ibgn = s.indexOf("\"", ibgn);
                    iend = s.indexOf("\";", ibgn);
                    sVerify = s.substring(ibgn + 1, iend);
                    return;
                }
            }
            sVerify = "";
        }

        setmyid = function() {
            if (!sVerify) { setVerify() }
            if (sVerify) sMyid = sVerify.split("_")[0];
        }

        _goodFuncLoop = function(friends) {
            //加水功能
            waterFunc = function(frd) {
                var pars = { id: 0, skey: "", type: 0, seedid: 0, verify: escape(sVerify), fuid: frd.id, foodnum: 1, r: settings.r() };
                var data = $.post(urlwater, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("加水" + jret.ret + santi);
            }

            //加牧草功能
            grassFunc = function(frd, iglass) {
                var pars = { id: 0, skey: "", type: 0, seedid: 63, verify: escape(sVerify), fuid: frd.id, foodnum: iglass, r: settings.r() };
                var data = $.get(urlfood, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("加牧草(" + iglass + ")" + jret.ret + santi);
            }

            //收获动物功能
            animalFunc = function(frd, a) {
                var pars = { fuid: frd.id, animalsid: a.animalsid, verify: escape(sVerify), r: settings.r() };
                var data = $.get(urlmhavest, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("收获(" + a.aname + ")" + jret.ret + santi);
            }

            //送动物生产功能
            productFunc = function(frd, a) {
                var pars = { fuid: frd.id, animalsid: a.animalsid, verify: escape(sVerify), r: settings.r() };
                var data = $.get(urlproduct, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("生产(" + a.aname + ")" + jret.ret + santi);
            }


            //收获功能
            getFunc = function(frd, f) {
                var pars = { id: 0, skey: f.skey, type: f.type, seedid: 0, verify: escape(sVerify), fuid: frd.id, foodnum: 1, r: settings.r() };
                var data = $.post(urlget, pars).responseText;
                var jret = farmxmlresult2json(data);
                var santi = jret.anti == "1" ? "<font color=red>阻止</font>&nbsp;," : "&nbsp;,";
                if (isDebug) $("#_test" + frd.id).append("收获" + "(" + f.pname + ")" + "" + jret.ret + santi);
            }

            _dowork = function(frd, data) {
                var jsonfarms = ranchxml2json(data);
                if (!jsonfarms) return;
                if (isDebug) $("#_test" + frd.id).append(jsonfarms.policeurl == "" ? "" : "<font color=red>巡查员!</font>");
                try {
                    //需要加水
                    if (jsonfarms["needwater"] == "1" && jsonfarms["water"] != "") { waterFunc(frd); }
                } catch (e) { }
                //取自有牧草数量
                //判断animals中是否有处于挨饿状态的动物,如果有,则根据animals的数量增加牧草
                //如果自有牧草数量足够,则添加牧草
                try {
                    var iglass = 0;
                    for (i = 0, ic = jsonfarms["animals"].length; i < ic; i++) {
                        var a = jsonfarms["animals"][i];
                        if (a.fstatus == "1") { iglass = jsonfarms["animals"].length; break }
                    }
                    if (iglass > 0) grassFunc(frd, iglass);
                } catch (e) { }

                //对动物的操作
                for (i = 0, ic = jsonfarms["animals"].length; i < ic; i++) {
                    var a = jsonfarms["animals"][i];

                    //收获动物:如果是自己的牧场,并且动物到收肉期 状态：0(生长),1(待产),2(收获期)
                    try {
                        if (frd.id == sMyid && a.status == "2") animalFunc(frd, a);
                    } catch (e) { }

                    //送去生产,bproduct==2
                    try {
                        if (a.bproduct == "2") productFunc(frd, a);
                    } catch (e) { }
                }
                //收获农产品(policeurl为空表示没有巡查员)
                if (jsonfarms.policeurl == "")
                    for (i = 0, ic = jsonfarms["product2"].length; i < ic; i++) {
                    var f = jsonfarms["product2"][i];
                    //收获:num-stealnum大于0
                    try {
                        if (f.num - f.stealnum > 0) { getFunc(frd, f); }
                    } catch (e) { }
                }
            }

            if (isDebug) $("#dv_testout").empty();
            for (var x = 0, xc = friends.length; x < xc; x++) {
                var frd = friends[x];
                try {
                    //获取当前好友的牧场数据
                    var pars = { verify: sVerify, fuid: frd.id, sr: settings.r };
                    if (isDebug) $("#dv_testout").append("<div id='_test" + frd.id + "'>" + frd.name + ":</div>");
                    var data = $.get(sUrlranch, pars).responseText;
                    _dowork(frd, data);
                } catch (e) { }
            }
            if (isDebug) $("#dv_testout").append("操作结束！");
        }

        goodFunc = function() {
            var f, fuid = getFuid();
            for (var i = 0, ic = aFriends.length; i < ic; i++) {
                f = aFriends[i];
                if (f.id == fuid) {
                    _goodFuncLoop([f]);
                    return;
                }
            }
            //循环
            var iTime = document.getElementById("_txtTime").value;
            if (iTime) {
                window.setTimeout(goodFunc, iTime * 60000);
            }
        }

        addGoodFunc = function() {
            var _h_btn = document.createElement('input');
            $(_h_btn).attr({ id: "_btn_good", type: "button", value: "做事", title: "加水,赶去生产,收获农产品" });
            $(".ml5").prepend(_h_btn);
            $(_h_btn).click(goodFunc);
        }

        addRefreshFunc = function() {
            $(".ml5").prepend("<input onclick='gotoFriend(g_fuid)' value='刷新' type='button'/>");
        }

        //增加好友列表
        addFriendFunc = function() {
            $(".ml5").prepend("<div id='_dv_friend' style='width:100%'></div>");
            var pars = { pars: "", type: "all", _: "" };
            var data = $.post(sUrlAllfriend, pars).responseText;
            var fs = eval("(" + data + ")"), f;
            aFriends = [];
            for (var i = 0, ic = fs.length; i < ic; i++) {
                f = fs[i];
                var divf = document.createElement("div");
                var d = $(divf);
                d.attr({ style: 'float:left ;width:70px', id: f.uid });
                d.append("<a href=\"javascript:gotoFriend('" + f.uid + "')\"><img src=\"" + f.icon20 + "\" />" + f.real_name.substring(0, 4) + "</a>");
                $("#_dv_friend").append(d);
                aFriends.push({ id: f.uid, name: f.real_name });
            }
        }


        workAllFunc = function() {
            _goodFuncLoop(aFriends);

            //循环
            var iTime = document.getElementById("_txtTime").value;
            if (iTime) {
                window.setTimeout(workAllFunc, iTime * 60000);
            }
        }

        addWorkAllFunc = function() {
            var _h_btn = document.createElement('input');
            $(_h_btn).attr({ id: "_btn_goodall", type: "button", value: "全做", title: "加水,赶去生产,收获农产品" });
            $(".ml5").prepend(_h_btn);
            $(_h_btn).click(workAllFunc);
        }

        addCustomTblFunc = function() {
            var a = $(".house_navbg:eq(1)");
            a.after('<div class="house_navbg"><a class="sl2" href="/!house/ranch/index.php"><img align="absmiddle" src="http://img.kaixin001.com.cn/i2/house/gd2.gif"/>牧场</a></div>');
        }

        addRepeatTime = function() {
            var _h_btn = document.createElement('select');
            $(_h_btn).attr({ id: "_txtTime", value: "", title: "设置重复操作时间的间隔" });
            $(_h_btn).append("<option value=''></option>");
            $(_h_btn).append("<option value='1'>1</option>");
            $(_h_btn).append("<option value='2'>2</option>");
            $(_h_btn).append("<option value='5'>5</option>");
            $(_h_btn).append("<option selected value='10'>10</option>");
            $(_h_btn).append("<option  value='20'>20</option>");
            $(_h_btn).append("<option value='30'>30</option>");
            $(_h_btn).append("<option value='60'>60</option>");
            $(".ml5").prepend(_h_btn);
        }

        testFunc = function() {
            if (isDebug) $("#dv_testout").append("<br/>" + (new Date()).getTime());
            //循环
            var iTime = document.getElementById("_txtTime").value;
            if (iTime) {
                window.setTimeout(testFunc, iTime * 1000);
            }

        }
        addtest = function() {
            var _h_btn = document.createElement('input');
            $(_h_btn).attr({ type: "button", value: "test" });
            $(".ml5").prepend(_h_btn);
            $(_h_btn).click(testFunc);
        }

        this.loadFunc = function() {
            setmyid();          //初始化操作
            if (isDebug) $(".info_ts").before("<div id='dv_testout' style='width:100% ;'>Debug Out</div>"); //debug
            addFriendFunc();

            addRepeatTime();
            addWorkAllFunc();
            addGoodFunc();      //做事
            addRefreshFunc();   //刷新
            addCustomTblFunc();

            //addtest();
        }
    }


})()




