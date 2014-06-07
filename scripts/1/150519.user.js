// ==UserScript==
// @name        Tieba Tail
// @include     http://tieba.baidu.com/*
// @version     2013.10.19
// @grant GM_getValue
// @grant GM_setValue
// @updateURL      http://userscripts.org/scripts/source/150519.user.js
// @downloadURL    http://userscripts.org/scripts/source/150519.user.js
// @grant unsafeWindow
// ==/UserScript==
//读取尾巴

var _window = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
var $ = _window.$;

(function l_init()
{
  if(document.querySelector(".ui_btn.ui_btn_m.j_submit.poster_submit"))
  {
    var tail = GM_getValue('tails', navigator.userAgent + '\n' + '这条留言是我喊春哥发表的，你也要用春哥发表留言？去你妈的吧！');
    var tails = tail.split('\n');
    //LH值越高，字串前空格越多
    var lh = 35;
    var selecttail = [""];
    var style = GM_getValue('fontstyle', '2');
    var mytail = GM_getValue('currenttail', '0|2').split('|');
    var rantail = GM_getValue('rantail', 1);
    if (rantail == 1) {
      var mytail = Math.round(Math.random() * (tails.length - 1)) + "";
    }
    var space = "　";
    var color1 = ""; //字体part1
    var color2 = ""; //字体part2
    //增加单选框
    $(".j_poster_signature.poster_signature span").after('<label>尾巴类型</label><select id="sltList" name="selectDropDown" style="position:relative; left:5px"><option name="style1" value="1">无</option><option name="style1" value="2">普通</option><option  name="style1" value="9">粗体</option><option name="style1" value="3" >灰色</option><option name="style1" value="4">红色</option><option  name="style1" value="7">红色粗体</option></select>&nbsp;&nbsp;随机尾巴<input type="checkbox" value="ranTail" id="rantail">');
    //增加发表按钮
    $('.poster_posting_status.j_posting_status').after('<span id="reply"><a type="button" value="Tail" class="j_submit ui_btn ui_btn_m" id="Tail"><span><em>Tail</em></span></a></span>');
    //添加尾巴选择框
    var mytails = '<div id="slectbox"><div id="slect-in" style="CURSOR:pointer;">选择尾巴</div><ul id="option-box">';
    for (var i = 0; i < tails.length; i++)
    mytails += '<li><input type="checkbox" name="mytail" id="mytail' + i + '"/><label for="t' + i + '">' + tails[i].slice(0, 7) + '..' + '</label></li>';
    mytails += '<li><a id="adittail" style="CURSOR:pointer;">编辑尾巴</a></li>'
    $('.poster_reply').after(mytails);
    //悬浮层
    var floatdiv = '<div id="float"><textarea id="floatedit"></textarea><input type="button" id="yesc" class="subbtn_bg" value="确定"></input><input type="button" id="noc" class="subbtn_bg" value="取消"></input></div>';
    $('.edui-editor-body').after(floatdiv);
    window.tailselect = function () {
      $("#slect-in").click(function () {
        $("#option-box").slideToggle();
      });
    };
    tailselect();
    switch (style) {
    case '1':
      $('option[name="style1"][value="1"]').get(0).selected = true;
      break;
    case '2':
      $('option[name="style1"][value="2"]').get(0).selected = true;
      break;
    case '3':
      $('option[name="style1"][value="3"]').get(0).selected = true;
      break;
    case '4':
      $('option[name="style1"][value="4"]').get(0).selected = true;
      break;
    case '7':
      $('option[name="style1"][value="7"]').get(0).selected = true;
      break;
    case '9':
      $('option[name="style1"][value="9"]').get(0).selected = true;
      break;
    }
    switch (rantail) {
    case 0:
      break;
    case 1:
      $('#rantail').attr('checked', 'checked');
      break;
    }
    //编辑尾巴
    window.adittail = function () {
      $('#float').toggle();
      $('#floatedit').val(tail);
    
      function yesc() {
        tail = $('#floatedit').val();
        tails = tail.split('\n');
        GM_setValue('tails', tail);
        $('#float').hide();
      }
    
      function noc() {
        $('#float').hide();
      }
      var y = document.getElementById("yesc");
      y.addEventListener("click", yesc, false);
      var n = document.getElementById("noc");
      n.addEventListener("click", noc, false);
    }
    //载入时选择记忆的尾巴
    if (rantail == 1) {
      $('#mytail' + mytail).attr('checked', 'checked');
    } else {
      for (var i = 0; i < mytail.length + 1; i++) {
        for (var j = 0; j < tails.length; j++) {
          if (mytail[i] == j + "") {
            $('#mytail' + j).attr('checked', 'checked');
            break;
          }
        }
      }
    }
    //发表函数
    window.Tail = function () {
      GM_setValue('currenttail', '');
      GM_setValue('fontstyle', $('option[name="style1"]:selected').val());
      if ($('#rantail').attr('checked') == 'checked') GM_setValue('rantail', 1);
      else GM_setValue('rantail', 0);
      style = $('option[name="style1"]:selected').val();
        switch(style)
        {
          case '1':
          $('.ui_btn.ui_btn_m.j_submit.poster_submit').click();return 0;
          break;
          case '3':
          color1 = '<span class=\"apc_src_wrapper\">';
          color2 = '</span>';
          space += "　　　　　　";
          break;
          case '4':
          color1 = '<font color=\"#E10602\">';
          color2 = '</font>';
          break;
          case '7':
          color1 = '<span class="edit_font_color"><strong>';
          color2 = '</strong></span>';
          break;
          case '9':
          color1 = '<strong>';
          color2 = '</strong>';
          break;
        }
        var cnt = $("#ueditor_replace").html();
        cnt = cnt + "<br><br><br><br><br>";
        //获得选中尾巴并保存当前值
        var st = 0; //selecttail脚标
        for (var j = 0; j <= tails.length; j++) {
          if ($('#mytail' + j).attr('checked') == 'checked') {
            GM_setValue('currenttail', GM_getValue('currenttail') + j + '|');
            selecttail[st] = tails[j];
            st++;
          }
        }
        //GM_setValue('currenttail',GM_getValue('currenttail').slice(0,GM_getValue('currenttail').length-1));
        //判断设定空格长度
        var spacelength = selecttail[0].length;; //空格长度
        for (var j = 0; j < selecttail.length; j++) {
          var tailtf = selecttail[j];
          var tailtemp = tailtf.length;
          var smallchar = 1;
          for (var i = 0; i < tailtf.length; i++) {
            if (tailtf[i].charCodeAt(0) <= 256) smallchar++;
          }
          for (var i = 1; i <= smallchar; i++) {
            if (i % 2 == 0) tailtemp--;
          }
          if (spacelength < tailtemp) spacelength = tailtemp;
        }
        if (spacelength < lh) {
          for (var i = 0; i < lh - spacelength; i++) {
            space += "　";
          }
        }
        if (style == 7 || style == 9) space = space.slice(0, space.length - 4);
        for (var i = 0; i < selecttail.length; i++) 
        {
            selecttail[i] = color1 + space + "————" + selecttail[i] + color2;
            cnt += selecttail[i] + (style==3?"":"<br>");
          }
          if(style==3)
          {
            cnt+='<img class="BDE_Image" width="1" height="1" src="http://imgsrc.baidu.com/forum/pic/item/4a50db03918fa0ecbbe378e8269759ee3c6ddbab.jpg" pic_type="3">'
          }
        $("#ueditor_replace").html(cnt);
        $('.ui_btn.ui_btn_m.j_submit.poster_submit span').click();
    }
    //事件监听
    var f = document.getElementById("Tail");
    f.addEventListener("click", Tail, false);
    var m = document.getElementById("adittail");
    m.addEventListener("click", adittail, false);
    //快捷键 shift+enter
    
    window.hotkey=function (event) 
    {
      if (event.shiftKey && event.keyCode == 13) 
      {
        if ($("#ueditor_replace").is(":focus")) Tail();
      }
    }
    document.onkeydown = hotkey;
    $('#floatedit').css({
      'width': '600px',
      'height': '300px',
      'color': '#8FC844',
      'background': '#F3EFE3',
      'border': '3px #FF7F3E solid'
    });
    $('#float').css({
      'position': 'fixed',
      'bottom': '40%',
      'left': '25%',
      'width': '600px',
      'height': '300px',
      'z-index': '9999999',
      'CURSOR': 'hand',
      'display': 'none'
    });
    $('#slectbox').css({
      'position': 'absolute',
      'right': '6px',
      'display': 'inline',
      'width': '150px',
      'background': '#red',
      'border': '1px grey',
      'z-index': '9999999'
    });
    $('#option-box').css({
      'display': 'none',
      'border': 'none'
    });
    $('#slect-in').css({
      'CURSOR':'pointer',
      'text-align': 'left',
      'font-size': '18px',
      'color': '#FF7F3E'
    });
    $('#option-box a').css({
      'text-align': 'center',
      'font-size': '18px',
      'color': '#FF7F3E'
    });
    $('#reply').css({
      'position': 'relative',
      'left': '-15px'
    });
  }
  else
    setTimeout(l_init,100);
})();