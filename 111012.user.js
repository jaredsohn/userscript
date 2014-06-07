// ==UserScript==
// @name           Plurk quick mute
// @namespace      http://www.plurk.com/
// @include        http://www.plurk.com/*
// ==/UserScript==

(function (d, func) {
    var h = d.getElementsByTagName('head')[0];
    var s1 = d.createElement("script");
    s1.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js");
    s1.addEventListener('load', function() {
        var s2 = d.createElement("script");
        s2.textContent = "jQuery.noConflict();(" + func.toString() + ")(jQuery);";
        h.appendChild(s2);
    }, false);
    h.appendChild(s1);
})(document, function($) {

    // ここにメインの処理を書く
     if ($("#timeline_holder").hasClass("click_mute") == false)
     {
    $("#timeline_cnt .plurk_cnt .td_qual").live("click", function (e) {
                  
           //e.preventDefault();


          //$("#timeline_cnt .plurk.link_extend .manager .mute").click();
          //alert($("#timeline_cnt .plurk.link_extend .manager .mute").length);
          var _td_qual = $(this);
          var _plurk_cnt = _td_qual.parents(".plurk_cnt:first");
         
          var _mute_option = _plurk_cnt.find(".manager .mute");
         
          if (_mute_option.length == 0)
                 return;
         
          var _enable_mute = _mute_option.hasClass("unmute");
          if (_enable_mute)
               return;
         
          setTimeout(function () {
               _td_qual.find(".mute-msg").remove();
              
               var _msg = $("<div></div >")
                    .addClass("mute-msg")
                    //.css("position","relative")
                    //.css("top", "-20px")
                    .css("font-size", "small")
                    //.css("line-height", "-1px")
                    //.css("background-color", "#FFF")
                    //.css("text-align", "left")
                    .appendTo(_td_qual);
               
               if (_enable_mute)
                      _msg.html("unmuted");
               else
                      _msg.html("muted");
              
               setTimeout(function () {
                      _msg.fadeOut(function () {
                         _msg.remove();
                    });
               }, 3000);
          }, 0);
         
          _mute_option.click();
          this.style.backgroundColor = null;
           //setTimeout(function () {
                 //if ($("#form_holder:visible").length > 0)
                 //if (_enable_mute)
                    //_plurk_cnt.click();
           //}, 1000);
           
     });
     $("#timeline_cnt .plurk_cnt .td_qual").live("mouseover", function () {
          //$("#timeline_cnt .plurk.link_extend .manager .mute").click();
          //alert($("#timeline_cnt .plurk.link_extend .manager .mute").length);
          var _mute_option = $(this).parents(".plurk_cnt:first").find(".manager .mute");
          var _has_mute = (_mute_option.length > 0);
          if (_has_mute)
          {
               if (_mute_option.hasClass("unmute"))
                    this.style.backgroundColor = "#CCCCCC";
               else
                    this.style.backgroundColor = "#FFFF00";
          }
     });
     $("#timeline_cnt .plurk_cnt .td_qual").live("mouseout", function () {
          //$("#timeline_cnt .plurk.link_extend .manager .mute").click();
          //alert($("#timeline_cnt .plurk.link_extend .manager .mute").length);
          this.style.backgroundColor = null;
     });

          $("#timeline_holder").addClass("click_mute");
          
          //移除使用者名稱的連結
          /*
          $("#timeline_cnt").mousemove(function () {
          	$(this).find("a.name:not(.href-removed)")
          		.removeAttr("href")
          		.addClass("href-removed");
          	$("#plurk_ads").remove();
          });
          */
     }     //if ($("#timeline_holder").hasClass("click_mute") == false)
});
