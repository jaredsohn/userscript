// ==UserScript==
// @name           Google Logo Slide Show
// @namespace      h13i32maru
// @include        http://www.google.*/
// ==/UserScript==
(function()
{
  GME = {
    GMEVersion : "20100609",
    scriptNameSpace : "h13i32maru",
    scriptName : "GoogleLogoSLideShow",
    scriptURL : "http://userscripts.org/scripts/show/42881",
    scriptVersion : "20100608",
    scriptVersionJS : "http://h13i32maru.sakura.ne.jp/gm/google_logo_slide_show/version.js" ,
    //{{{isGM : function()
    isGM : function()
    {
      if(typeof(unsafeWindow) == "object"){ return true;}
      else{ return false; }
    },
    //}}}
    //{{{getValue : function(key , _default , notConvert)
    getValue : function(key , _default , notConvert)
    {
      if(window.localStorage)
      {
        var value = window.localStorage.getItem(key);
        if(value != null)
        {
          //localStorageは文字のみの扱いのみなので、型変換を行う。
          //ただしnotConvertがtrueの場合、型変換を行わない
          if(notConvert != false)
          {
            if(value == "true"){ value = true; }
            else if(value == "false"){ value = false; }
            else if(value.match(/^[0-9.]+$/)){ value = Number(value); }
          }
          return value;
        }
        else { return _default}
      }
      else if(typeof(GM_getValue) == "function")
      {
        return GM_getValue(key , _default);
      }
      else
      {
        throw "window.localStorage and GM_getValue are not defined";
      }
    },
    //}}}
    //{{{setValue : function(key , value)
    setValue : function(key , value)
    {
      if(window.localStorage)
      {
        window.localStorage.setItem(key , value);
      }
      else if(typeof(GM_setValue) == "function")
      {
        GM_setValue(key , value);
      }
      else
      {
        throw "window.localStorage and GM_setValue are not defined";
      }
    },
    //}}}
    //{{{deleteValue : function(key)
    deleteValue : function(key)
    {
      if(window.localStorage)
      {
        window.localStorage.removeItem(key);
      }
      else if(typeof(GM_deleteValue) == "function")
      {
        GM_deleteValue(key);
      }
      else
      {
        throw "window.localStorage and GM_deleteValue are not defined";
      }
    },
    //}}}
    //{{{listValues : function()
    listValues : function()
    {
      if(window.localStorage)
      {
        //localStorage.length is not availabled in user script
        var list = [];
        var key;
        try{
          for(var i = 0 ; ; i++)
          {
            key = window.localStorage.key(i);
            if(!key){ break; }
            list.push(key);
          }
        }
        catch(e)
        {
        }
        return list;
      }
      else if(typeof(GM_listValues) == "function")
      {
        return GM_listValues();
      }
      else
      {
        throw "window.localStorage and GM_listValues are not defined";
      }
    },
    //}}}
    //{{{addStyle : function(text , id)
    addStyle : function(text , id)
    {
      if(document.getElementById(id)){ return; }

      var e = document.createElement("style");
      if(id){ e.id = id; }
      e.textContent = text;
      document.getElementsByTagName("head")[0].appendChild(e);
    },
    //}}}
    //{{{xmlhttpRequest : function(param)
    xmlhttpRequest : function(param)
    {
      if(typeof(GM_xmlhttpRequest) == "function")
      {
        GM_xmlhttpRequest(param);
      }
      else
      {
        GME.sendRequest(param.url , true , param.method , param.data || "" , param.onload , "");
      }
    },
    //}}}
    //{{{log : function(data)
    log : function(data)
    {
      if(typeof(GM_log) == "function")
      {
        GM_log(data);
      }
      else if(typeof(console.log) == "function")
      {
        consoloe.log(data);
      }
    },
    //}}}
    //{{{openInTab : function(url)
    openInTab : function(url)
    {
      if(typeof(GM_openInTab) == "function")
      {
        GM_openInTab(url);
      }
      else
      {
        window.open(url);
      }
    },
    //}}}
    //{{{sendRequest : function(url , async , method , data , callback , callbackArgument)
    sendRequest : function(url , async , method , data , callback , callbackArgument)
    {
      var req = new XMLHttpRequest;

      if(async){
        req.onreadystatechange = function(){ if(req.readyState == 4) callback(req , callbackArgument); }
      }

      if(method.toUpperCase() == "GET" && data.length > 0){
        url += "?" + data;
        data = "";
      }

      req.open(method , url , async);
      req.setRequestHeader("Content-Type" , "application/x-www-form-urlencoded; charset=UTF-8");
      req.send(data);
      if(!async){ callback(req , callbackArgument);}
    },
    //}}}
    //{{{addStyleEx : function(id , resourceName , url)
    addStyleEx : function(id , resourceName , url)
    {
      if(typeof(GM_getResourceText) == "function")
      {
        GME.addStyleResource(id , resourceName);
      }
      else
      {
        GME.addStyleURL(id , url);
      }
    },
    //}}}
    //{{{addStyleURL : function(id , url)
    addStyleURL : function(id , url)
    {
      var e = document.createElement("link");
      e.id = id;
      e.rel = "stylesheet";
      e.type = "text/css";
      e.href = url;
      document.getElementsByTagName("head")[0].appendChild(e);
    },
    //}}}
    //{{{addStyleResource : function(id , resourceName)
    addStyleResource : function(id , resourceName)
    {
      if(typeof(GM_getResourceText) == "function")
      {
        var e = document.createElement("style");
        e.id = id;
        e.textContent = GM_getResourceText(resourceName);
        document.getElementsByTagName("head")[0].appendChild(e);
      }
    },
    //}}}
    //{{{addScriptURL : function(id , url)
    addScriptURL : function(id , url)
    {
      var s = document.createElement("script");
      s.id = id;
      s.type = "text/javascript";
      s.src = url;
      document.body.appendChild(s);
    },
    //}}}
    //{{{removeById : function(id)
    removeById : function(id)
    {
      var e = document.getElementById(id);
      if(e)
      {
        e.parentNode.removeChild(e);
        return true;
      }
      else
      {
        return false;
      }
    },
    //}}}
    //{{{insertBefore : function(elm , after)
    insertBefore : function(elm , after)
    {
      after.parentNode.insertBefore(elm , after);
    },
    //}}}
    //{{{checkVersion : function()
    checkVersion : function()
    {
      document.addEventListener(GME.scriptNameSpace + "CheckVersion" , execCheckVersion , false);
      GME.addScriptURL(GME.scriptNameSpace + "-check-version" , GME.scriptVersionJS);

      function execCheckVersion(ev)
      {
        //var latestVersion = ev.command;
        var latestVersion = document.getElementById(GME.scriptNameSpace + "-latest-version").textContent;
        if(GME.scriptVersion < latestVersion)
        {
          if(GME.getValue("checkVersion" , true) == false){ return; }

          GME.setValue("checkVersion" , false);

          //GMでは上書きインストールで良いが、Chromeでは一度アンインストールが必要
          var installText = GME.scriptName + "の新しいバージョンがリリースされています。\n以下のダウンロードサイトから最新版をインストールすることができます。\n" + GME.scriptURL;
          if(GME.isGM() == false)
          {
            installText += "\n\n※Google Chromeの場合、一度" + GME.scriptName +"をアンインストールしてから最新版をインストールしてください";
          }
          installText += "\n\nダウンロードサイトへ移動しますか?";

          if(confirm(installText))
          {
            //event内ではGM_openInTabが使えない?
            //GME.openInTab(GME.scriptURL);

            window.open(GME.scriptURL , "_self");
          }
        }
        else
        {
          GME.setValue("checkVersion" , true);
        }
      }
    }
    //}}}
  };

  var googleLogoList = [
  //{{{ 1999
  "http://www.google.co.jp/intl/en/logos/turkeylogo.jpg",
  "http://www.google.co.jp/intl/en/logos/googleburn.jpg",
  "http://www.google.co.jp/intl/en/logos/googlebeta.jpg",
  "http://www.google.co.jp/intl/en/logos/unclesam.gif",
  "http://www.google.co.jp/intl/en/logos/googlepump.gif",
  "http://www.google.co.jp/intl/en/logos/turkey_home2.gif",
  "http://www.google.co.jp/intl/en/logos/snowmanC.gif",
  //}}}
  //{{{ 2000
  "http://www.google.co.jp/intl/en/logos/logo_newyear.gif",
  "http://www.google.co.jp/intl/en/logos/groundhog.gif",
  "http://www.google.co.jp/intl/en/logos/valentine.gif",
  "http://www.google.co.jp/intl/en/logos/stpattys.gif",
  "http://www.google.co.jp/intl/en/logos/easter_logo.jpg",
  "http://www.google.co.jp/intl/en/images/doodle_alien5.jpg",
  "http://www.google.co.jp/intl/en/images/doodle_alien4.jpg",
  "http://www.google.co.jp/intl/en/images/doodle_alien3.gif",
  "http://www.google.co.jp/intl/en/images/doodle_alien2.gif",
  "http://www.google.co.jp/intl/en/images/doodle_alien1.gif",
  "http://www.google.co.jp/intl/en/logos/moms2000.gif",
  "http://www.google.co.jp/intl/en/logos/Title_Fathers.gif",
  "http://www.google.co.jp/intl/en/images/doodle2_fourth4.gif",
  "http://www.google.co.jp/intl/en/images/doodle2_fourth3.jpg",
  "http://www.google.co.jp/intl/en/images/doodle2_fourth2.gif",
  "http://www.google.co.jp/intl/en/images/doodle2_fourth1.gif",
  "http://www.google.co.jp/intl/en/images/Title_Bastille.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle11.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle10.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle9.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle8.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle7.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle6.gif",
  "http://www.google.co.jp/intl/en/logos/olympic_doodle5.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle4.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle3.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle2.gif",
  "http://www.google.co.jp/intl/en/logos/olympics_doodle1.gif",
  "http://www.google.co.jp/intl/en/logos/halloween_anim.gif",
  "http://www.google.co.jp/intl/en/logos/election_logo.gif",
  "http://www.google.co.jp/intl/en/logos/shichigosan.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving00_logo.gif",
  "http://www.google.co.jp/intl/en/logos/holiday_penguins00.gif",
  //}}}
  //{{{ 2001
  "http://www.google.co.jp/intl/en/logos/newyear01.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear.gif",
  "http://www.google.co.jp/intl/en/logos/valentine01.gif",
  "http://www.google.co.jp/intl/en/logos/holi.gif	",
  "http://www.google.co.jp/intl/en/logos/stpatricks2.gif",
  "http://www.google.co.jp/intl/en/logos/easter01.gif",
  "http://www.google.co.jp/intl/en/logos/earthday.gif",
  "http://www.google.co.jp/intl/en/logos/mom2001.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday01.gif",
  "http://www.google.co.jp/intl/en/logos/canada_day.gif",
  "http://www.google.co.jp/intl/en/logos/july4.gif",
  "http://www.google.co.jp/intl/en/logos/bastilleday.gif",
  "http://www.google.co.jp/intl/en/logos/swiss.gif",
  "http://www.google.co.jp/intl/en/logos/korea.gif",
  "http://www.google.co.jp/intl/en/logos/halloween01.gif",
  "http://www.google.co.jp/intl/en/logos/monet_logo.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving01.gif",
  "http://www.google.co.jp/intl/en/logos/nobel.gif",
  "http://www.google.co.jp/intl/en/logos/holiday01-4.gif",
  "http://www.google.co.jp/intl/en/logos/holiday01-3.gif",
  "http://www.google.co.jp/intl/en/logos/holiday01-2.gif",
  "http://www.google.co.jp/intl/en/logos/holiday01-1.gif",
  //}}}
  //{{{ 2002
  "http://www.google.co.jp/intl/en/logos/newyear02.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-12.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-11.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-10_crp.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-9.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-8.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-7.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-6.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-5.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-4.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-3.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-2.gif",
  "http://www.google.co.jp/intl/en/logos/w_olympics_02-1.gif",
  "http://www.google.co.jp/intl/en/logos/mondrian.gif",
  "http://www.google.co.jp/intl/en/logos/stpatricks_02.gif",
  "http://www.google.co.jp/intl/en/images/pigeons_sm.jpg",
  "http://www.google.co.jp/intl/en/logos/earthday02.gif",
  "http://www.google.co.jp/intl/en/logos/stgeorge02.gif",
  "http://www.google.co.jp/intl/en/logos/childrens_day02.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day02.gif",
  "http://www.google.co.jp/intl/en/logos/dilbert_1.gif",
  "http://www.google.co.jp/intl/en/logos/worldcup.gif",
  "http://www.google.co.jp/intl/en/logos/dragon.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday02.gif",
  "http://www.google.co.jp/intl/en/logos/musique.gif",
  "http://www.google.co.jp/intl/en/logos/canada_day02.gif",
  "http://www.google.co.jp/intl/en/logos/july4th02.gif",
  "http://www.google.co.jp/intl/en/logos/bastilleday02.gif",
  "http://www.google.co.jp/intl/en/logos/warhol.gif",
  "http://www.google.co.jp/intl/en/logos/4th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/picasso.gif",
  "http://www.google.co.jp/intl/en/logos/halloween02.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving02.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_02_fifth.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_02_quad.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_02_III.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_02_deux.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_02_1.gif",
  //}}}
  //{{{ 2003
  "http://www.google.co.jp/intl/en/logos/newyear03.gif",
  "http://www.google.co.jp/intl/en/logos/mlk.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear03.gif",
  "http://www.google.co.jp/intl/en/logos/valentine03.gif",
  "http://www.google.co.jp/intl/en/logos/michelangelo.gif",
  "http://www.google.co.jp/intl/en/logos/einstein.gif",
  "http://www.google.co.jp/intl/en/logos/earthday03.gif",
  "http://www.google.co.jp/intl/en/logos/dna.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day03.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday03.gif",
  "http://www.google.co.jp/intl/en/logos/escher.gif",
  "http://www.google.co.jp/intl/en/logos/july4th03.gif",
  "http://www.google.co.jp/intl/en/logos/hitchcock.gif",
  "http://www.google.co.jp/intl/en/logos/5th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/halloween03.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving03.gif",
  "http://www.google.co.jp/intl/en/logos/flight.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_03_oh.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_03_sah.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_03_s.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_03_e.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_03_1.gif",
  //}}}
  //{{{ 2004
  "http://www.google.co.jp/intl/en/logos/newyear04.gif",
  "http://www.google.co.jp/intl/en/logos/mars_rover.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear04.gif",
  "http://www.google.co.jp/intl/en/logos/julia.gif",
  "http://www.google.co.jp/intl/en/logos/valentines04.gif",
  "http://www.google.co.jp/intl/en/logos/leapyear.gif	",
  "http://www.google.co.jp/intl/en/logos/stpatricks_04.gif",
  "http://www.google.co.jp/intl/en/logos/persian_newyear.gif",
  "http://www.google.co.jp/intl/en/images/lunar_google.gif",
  "http://www.google.co.jp/intl/en/logos/earthday04.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day04.gif",
  "http://www.google.co.jp/intl/en/logos/venus.gif",
  "http://www.google.co.jp/intl/en/logos/james_joyce.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday04.gif",
  "http://www.google.co.jp/intl/en/logos/july4th04.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_opening.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_swimming.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_archery.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_fencing.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_weightlifting.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_soccer.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_tennis.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_table.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_synchro_swim.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_hurdles.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_taekwondo.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_gymnastics.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_volleyball.gif",
  "http://www.google.co.jp/intl/en/logos/summer2004_closing.gif",
  "http://www.google.co.jp/intl/en/logos/ray.gif",
  "http://www.google.co.jp/intl/en/logos/6th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/xprize.gif",
  "http://www.google.co.jp/intl/en/logos/halloween04.gif",
  "http://www.google.co.jp/intl/en/logos/vote2004.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving04.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_04_o.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_04_sah.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_04_sam.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_04_dul.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday_04_1.gif",
  //}}}
  //{{{ 2005
  "http://www.google.co.jp/intl/en/logos/newyear05.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear05.gif",
  "http://www.google.co.jp/intl/en/logos/valentine05.gif",
  "http://www.google.co.jp/intl/en/logos/intl_women.gif",
  "http://www.google.co.jp/intl/en/logos/stpatricks_05.gif",
  "http://www.google.co.jp/intl/en/logos/persian_newyear05.gif",
  "http://www.google.co.jp/intl/en/logos/water_day05.gif",
  "http://www.google.co.jp/intl/en/logos/van_gogh.gif",
  "http://www.google.co.jp/intl/en/logos/natl_library.gif",
  "http://www.google.co.jp/intl/en/logos/da_vinci.gif",
  "http://www.google.co.jp/intl/en/logos/earthday05.gif",
  "http://www.google.co.jp/intl/en/logos/natl_teachers.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day05.gif",
  "http://www.google.co.jp/intl/en/logos/frank_lloyd_wright.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday05.gif",
  "http://www.google.co.jp/intl/en/logos/july4th05.gif",
  "http://www.google.co.jp/intl/en/logos/google_moon.gif",
  "http://www.google.co.jp/intl/en/logos/7th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/halloween05.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving05.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday05_5.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday05_4.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday05_3.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday05_2.gif",
  "http://www.google.co.jp/intl/en/logos/winter_holiday05_1.gif",
  //}}}
  //{{{ 2006
  "http://www.google.co.jp/intl/en/logos/newyear06.gif",
  "http://www.google.co.jp/intl/en/logos/braille.gif",
  "http://www.google.co.jp/intl/en/logos/mlk06.gif",
  "http://www.google.co.jp/intl/en/logos/mozart.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear06.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_closing.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_hockey.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_figure_skating.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_alpine.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_curling.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_freestyle.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_ski_jump.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_speedskating.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_luge.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_icedance.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_snowboarding.gif",
  "http://www.google.co.jp/intl/en/logos/olympics06_opening.gif",
  "http://www.google.co.jp/intl/en/logos/mars06.gif",
  "http://www.google.co.jp/intl/en/logos/stpatricks_06.gif",
  "http://www.google.co.jp/intl/en/logos/persian_newyear06.gif",
  "http://www.google.co.jp/intl/en/logos/earthday06.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day06.gif",
  "http://www.google.co.jp/intl/en/logos/conan_doyle.gif",
  "http://www.google.co.jp/intl/en/logos/worldcup06_us.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday06.gif",
  "http://www.google.co.jp/intl/en/logos/july4th06.gif",
  "http://www.google.co.jp/intl/en/logos/8th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/halloween06.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving06.gif",
  "http://www.google.co.jp/intl/en/logos/edvard_munch.gif",
  "http://www.google.co.jp/intl/en/logos/holiday06_5.gif",
  "http://www.google.co.jp/intl/en/logos/holiday06_4.gif",
  "http://www.google.co.jp/intl/en/logos/holiday06_3.gif",
  "http://www.google.co.jp/intl/en/logos/holiday06_2.gif",
  "http://www.google.co.jp/intl/en/logos/holiday06_1.gif",
  //}}}
  //{{{ 2007
  "http://www.google.co.jp/intl/en/logos/newyear07.gif",
  "http://www.google.co.jp/intl/en/logos/mlk07.gif",
  "http://www.google.co.jp/intl/en/logos/valentine07.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear07g.gif",
  "http://www.google.co.jp/intl/en/logos/stpatricks_07.gif",
  "http://www.google.co.jp/intl/en/logos/persian07.gif",
  "http://www.google.co.jp/intl/en/logos/yuri_gagarin.gif",
  "http://www.google.co.jp/intl/en/logos/earthday07.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day07.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday07.gif",
  "http://www.google.co.jp/intl/en/logos/july4th07.gif",
  "http://www.google.co.jp/intl/en/logos/9th_birthday.gif",
  "http://www.google.co.jp/intl/en/logos/google_sputnik.gif",
  "http://www.google.co.jp/intl/en/logos/pavarotti.gif",
  "http://www.google.co.jp/intl/en/logos/halloween07.gif",
  "http://www.google.co.jp/intl/en/logos/veterans07.gif",
  "http://www.google.co.jp/intl/en/logos/thanksgiving07.gif",
  "http://www.google.co.jp/intl/en/logos/holiday07_5.gif",
  "http://www.google.co.jp/intl/en/logos/holiday07_4.gif",
  "http://www.google.co.jp/intl/en/logos/holiday07_3.gif",
  "http://www.google.co.jp/intl/en/logos/holiday07_2.gif",
  "http://www.google.co.jp/intl/en/logos/holiday07_1.gif",
  //}}}
  //{{{ 2008
  "http://www.google.co.jp/intl/en/logos/newyear08.gif",
  "http://www.google.co.jp/intl/en/logos/mlk08.gif",
  "http://www.google.co.jp/intl/en/logos/lego08.gif",
  "http://www.google.co.jp/intl/en/logos/lunarnewyear08.gif",
  "http://www.google.co.jp/intl/en/logos/valentine08.gif",
  "http://www.google.co.jp/intl/en/logos/leapyear08.gif",
  "http://www.google.co.jp/intl/en/logos/bell08.gif",
  "http://www.google.co.jp/intl/en/logos/stpatricks_08.gif",
  "http://www.google.co.jp/intl/en/logos/persian_newyear08.gif",
  "http://www.google.co.jp/intl/en/logos/spring08.gif",
  "http://www.google.co.jp/intl/en/logos/earthday08.gif",
  "http://www.google.co.jp/intl/en/logos/jeffkoons.gif",
  "http://www.google.co.jp/intl/en/logos/mothers_day08.gif",
  "http://www.google.co.jp/intl/en/logos/laser08.gif",
  "http://www.google.co.jp/intl/en/logos/waltergropius.gif",
  "http://www.google.co.jp/intl/en/logos/us_doodle4google08.gif",
  "http://www.google.co.jp/intl/en/logos/everest08.gif",
  "http://www.google.co.jp/intl/en/logos/balloon08.gif",
  "http://www.google.co.jp/intl/en/logos/velasquez.gif",
  "http://www.google.co.jp/intl/en/logos/fathersday08.gif",
  "http://www.google.co.jp/intl/en/logos/summersolstice08.gif",
  "http://www.google.co.jp/intl/en/logos/july4th08.gif",
  "http://www.google.co.jp/intl/en/logos/chagall.gif",
  "http://www.google.com/logos/nasa50th.gif",
  "http://www.google.com/logos/closing_ceremonies.gif",
  "http://www.google.com/logos/olympics08_baseball.gif",
  "http://www.google.com/logos/olympics08_martialarts.gif",
  "http://www.google.com/logos/olympics08_highjump.gif",
  "http://www.google.com/logos/olympics08_trackfield.gif",
  "http://www.google.com/logos/olympics08_swimming.gif",
  "http://www.google.com/logos/olympics08_pingpong.gif",
  "http://www.google.com/logos/olympics08_soccer.gif",
  "http://www.google.com/logos/olympics08_rowing.gif",
  "http://www.google.com/logos/olympics08_badminton.gif",
  "http://www.google.com/logos/olympics08_basketball.gif	",
  "http://www.google.com/logos/olympics08_rings.gif",
  "http://www.google.com/logos/olympics08_rhythm.gif",
  "http://www.google.com/logos/olympics08_diving.gif",
  "http://www.google.com/logos/olympics08_weightlifting.gif",
  "http://www.google.com/logos/olympics08_cycling.gif",
  "http://www.google.com/logos/olympics08_opening.gif",
  "http://www.google.com/logos/lhc.gif",
  "http://www.google.com/logos/autumn08.gif",
  "http://www.google.com/logos/10th_birthday.gif",
  "http://www.google.com/logos/halloween08.gif",
  "http://www.google.com/logos/electionday2008.gif",
  "http://www.google.com/logos/veteransday2008.gif",
  "http://www.google.com/logos/magritte08.gif",
  "http://www.google.com/logos/thanksgiving08.gif",
  "http://www.google.co.jp/logos/holiday08_5.gif",
  "http://www.google.co.jp/logos/holiday08_4.gif",
  "http://www.google.co.jp/logos/holiday08_3.gif",
  "http://www.google.co.jp/logos/holiday08_2.gif",
  "http://www.google.co.jp/logos/holiday08_1.gif"
  //}}}
  ];

  //{{{toggleSlide()
  function toggleSlide()
  {
    this.intervalId = null;
    if(intervalId)
    {
      clearInterval(intervalId);
      intervalId = null;
    }
    else
    {
      intervalId = setInterval(slideShow , 1500);
    }
  }
  //}}}
  //{{{slideShow()
  function slideShow()
  {
    var i = Math.floor(Math.random() * googleLogoList.length);
    logo.src = googleLogoList[i];
  }
  //}}}

  var logo = document.getElementById("logo");
  if(!logo){ return; }

  var logoTag = logo.tagName.toLowerCase();
  if(logoTag == "div")
  {
    var img = document.createElement("img");
    img.style.verticalAlign = "bottom";

    logo.style.backgroundImage = "none";
    logo.style.textAlign = "center";
    logo.style.width = "auto";
    logo.style.height = "150px";
    logo.style.lineHeight = "150px";
    logo.removeChild(logo.firstChild);
    logo.appendChild(img);
    logo = img;
  }
  logo.setAttribute("title" , "stop/start by click");
  logo.removeAttribute("width");
  logo.addEventListener("click" , toggleSlide , true);
  logo.parentNode.removeAttribute("href");

  toggleSlide();

  GME.checkVersion();
})();
