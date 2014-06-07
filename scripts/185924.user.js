{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fswiss\fcharset0 Arial;}{\f1\fswiss\fcharset238{\*\fname Arial;}Arial CE;}{\f2\fswiss\fcharset163 Arial;}}
{\*\generator Msftedit 5.41.15.1515;}\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name         bv_Emo\par
// @namespace    http://devs.forumvi.com/\par
// @version      1.3\par
// @description  40 Beautiful Emoticons and Smiley Icon Packs.\par
// @copyright    2013+, Zzbaivong\par
// @include      http://*/chatbox*\par
// @icon         http://eemoticons.net/Upload/Cool%20Face%203/victory.png\par
// @downloadURL  http://userscripts.org/scripts/source/183615.user.js\par
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js\par
// @run-at       document-end\par
// @grant        none\par
// ==/UserScript==\par
var bv_i = 18; // item in page\par
/*\par
 * This jQuery plugin displays pagination links inside the selected elements. *\par
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)\par
 * @version 1.2\par
 */\par
jQuery.fn.pagination = function (c, a) \{\par
   a = jQuery.extend(\{\par
      items_per_page: bv_i,\par
      num_display_entries: 4,\par
      current_page: 0,\par
      num_edge_entries: 1,\par
      link_to: "javascript:;",\par
      prev_text: "<<",\par
      next_text: ">>",\par
      ellipse_text: "...",\par
      prev_show_always: !0,\par
      next_show_always: !0,\par
      callback: function () \{\par
         return !1\par
      \}\par
   \}, a || \{\});\par
   return this.each(function () \{\par
      function h() \{\par
         var b = Math.ceil(a.num_display_entries / 2),\par
            m = Math.ceil(c / a.items_per_page),\par
            d = m - a.num_display_entries,\par
            d = e > b ? Math.max(Math.min(e - b, d), 0) : 0,\par
            b = e > b ? Math.min(e + b, m) : Math.min(a.num_display_entries, m);\par
         return [d, b]\par
      \}\par
 \par
      function d(b, c) \{\par
         e = b;\par
         f();\par
         var d = a.callback(b, g);\par
         d || (c.stopPropagation ? c.stopPropagation() : c.cancelBubble = !0);\par
         return d\par
      \}\par
 \par
      function f() \{\par
         g.empty();\par
         var b = h(),\par
            f = Math.ceil(c / a.items_per_page),\par
            n = function (a) \{\par
               return function (b) \{\par
                  return d(a, b)\par
               \}\par
            \}, l = function (b, c) \{\par
               b = 0 > b ? 0 : b < f ? b : f - 1;\par
               c = jQuery.extend(\{\par
                  text: b + 1,\par
                  classes: ""\par
               \}, c || \{\});\par
               var d = b == e ? jQuery("<span class='current'>" + c.text + "</span>") : jQuery("<a>" + c.text + "</a>").bind("click", n(b)).attr("href", a.link_to.replace(/__id__/, b));\par
               c.classes && d.addClass(c.classes);\par
               g.append(d)\par
            \};\par
         a.prev_text && (0 < e || a.prev_show_always) && l(e - 1, \{\par
            text: a.prev_text,\par
            classes: "prev"\par
         \});\par
         if (0 < b[0] && 0 < a.num_edge_entries) \{\par
            for (var p = Math.min(a.num_edge_entries, b[0]), k = 0; k < p; k++) l(k);\par
            a.num_edge_entries < b[0] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(g)\par
         \}\par
         for (k = b[0]; k < b[1]; k++) l(k);\par
         if (b[1] < f && 0 < a.num_edge_entries)\par
            for (f - a.num_edge_entries > b[1] && a.ellipse_text && jQuery("<span>" + a.ellipse_text + "</span>").appendTo(g), k = Math.max(f - a.num_edge_entries, b[1]); k < f; k++) l(k);\par
         a.next_text && (e < f - 1 || a.next_show_always) && l(e + 1, \{\par
            text: a.next_text,\par
            classes: "next"\par
         \})\par
      \}\par
      var e = a.current_page;\par
      c = !c || 0 > c ? 1 : c;\par
      a.items_per_page = !a.items_per_page || 0 > a.items_per_page ? 1 : a.items_per_page;\par
      var g = jQuery(this);\par
      this.selectPage = function (a) \{\par
         d(a)\par
      \};\par
      this.prevPage = function () \{\par
         return 0 < e ? (d(e - 1), !0) : !1\par
      \};\par
      this.nextPage = function () \{\par
         return e < Math.ceil(c / a.items_per_page) - 1 ? (d(e + 1), !0) : !1\par
      \};\par
      f();\par
      a.callback(e, this)\par
   \})\par
\};\par
/*\par
 * bv_Emo\par
 * Copyright(c) 2013 Zzbaivong\par
 */\par
var newStyle = document.createElement('style');\par
newStyle.type = 'text/css';\par
newStyle.innerHTML = '\\\par
*\{margin:0;padding:0\}\\\par
html,body\{height:100%;width:100%\}\\\par
body\{font-family:"Segoe UI",Tahoma,Helvetica,Sans-Serif;font-size:11pt;letter-spacing:.02em;line-height:14pt\}\\\par
#bv_main *\{box-sizing:border-box!important;-moz-box-sizing:border-box!important\}\\\par
#bv_main\{background:none repeat scroll 0 0 #FFF;border:1px solid #DDD;bottom:-247px;float:left;left:-330px;position:fixed;transition:all .5s;-webkit-transition:all .5s;z-index:999;padding:10px!important\}\\\par
#bv_main:hover\{bottom:0;left:0\}\\\par
#bv_main > div\{border-top:1px solid #0084FF;text-align:center;width:355px;padding:5px!important\}\\\par
#tab_emo\{background:url(http://i.imgur.com/s0Pcl2k.png) no-repeat scroll right top transparent;height:30px;width:100%\}\\\par
#tab_emo li\{display:inline;list-style:none outside none\}\\\par
#tab_emo a\{color:#0084FF!important;display:inline-block;height:30px;line-height:30px;text-decoration:none;padding:0 10px!important\}\\\par
#tab_emo a.active\{background:#0084FF;color:#FFF!important\}\\\par
#bv_emo,#bv_about\{display:none\}\\\par
.bv_content\{border-bottom:1px dashed #ECECEC;font-size:12px;height:187px;margin-bottom:10px!important;padding:5px!important\}\\\par
.bv_content a\{background:none no-repeat center transparent;display:inline-block;height:55px;width:55px\}\\\par
.bv_content:hover a\{opacity:.5\}\\\par
.bv_content a:hover\{background-color:#F6FCBC;opacity:1\}\\\par
.bv_content a.copyright\{background:none transparent;opacity:1\}\\\par
.bv_pag\{display:inline-block;font-size:80%;height:26px;line-height:14px\}\\\par
.bv_pag a\{color:#15B;background:#F8F0B3;text-decoration:none\}\\\par
.bv_pag a,.bv_pag span\{display:block;float:left;margin-bottom:5px!important;margin-right:5px!important;padding:.3em .5em!important\}\\\par
.bv_emoticon\{text-indent:-9999px\}\\\par
.bv_pag .current,.bv_pag a:hover\{background:#26B;color:#FFF\}\\\par
.bv_pag .current.prev,.bv_pag .current.next\{background:#B6B6B6\}\\\par
';\par
document.getElementsByTagName('head')[0].appendChild(newStyle);\par
var data = \{\par
   fbemo: \{\par
      r: "http://dl.dropboxusercontent.com/u/126946313/smiley/",\par
      meep: \{\par
         t: "Meep",\par
         u: "meep/meep",\par
         e: 32,\par
         f: ".png"\par
      \},\par
      pusheen: \{\par
         t: "Pusheen",\par
         u: "pusheen/pusheen",\par
         e: 42,\par
         f: ".png"\par
      \},\par
      bun: \{\par
         t: "Bun",\par
         u: "bun/bun",\par
         e: 40,\par
         f: ".png"\par
      \},\par
      prickly: \{\par
         t: "Prickly Pear",\par
         u: "prickly/prickly",\par
         e: 46,\par
         f: ".png"\par
      \}\par
   \},\par
   eemo: \{\par
      r: "http://eemoticons.net/Upload/",\par
      rabbit: \{\par
         t: "Rabbit",\par
         u: "Rabbit/th_",\par
         n: "10 100 101 102 103 104 105 107 108 11 110 112 113 114 115 116 117 118 119 12 120 121 122 123 124 125 126 127 13 14 15 16 17 18 2 20 21 22 23 24 25 26 27 28 3 30 31 32 33 34 35 36 37 38 39 4 40 42 43 44 45 46 47 48 49 5 50 51 52 53 54 55 56 57 58 59 6 60 61 62 63 64 65 66 67 68 69 7 70 71 72 73 74 75 76 77 78 79 8 80 81 82 83 84 9 92 93 94 95 96 97 98 99".split(" ")\par
      \},\par
      cutesheep: \{\par
         t: "Cute Sheep",\par
         u: "Cute Sheep/Cute Sheep Emoticon 0",\par
         n: "00 01 02 03 04 05 06 07 08 09".split(" "),\par
         b: 10,\par
         e: 20\par
      \},\par
      leaf: \{\par
         t: "Leaf",\par
         u: "Leaf/leaf",\par
         n: [""],\par
         b: 2,\par
         e: 21\par
      \},\par
      yokiegirl: \{\par
         t: "Yokie Girl",\par
         u: "Yokie Girl/",\par
         n: "000000;000001;000002;000003;000004;Yokie Girl 0000;Yokie Girl 0001;Yokie Girl 0002;Yokie Girl 0003;Yokie Girl 0004;Yokie Girl 0005;Yokie Girl 0006;Yokie Girl 0007;Yokie Girl 0008;Yokie Girl 0009;Yokie Girl 0010;Yokie Girl 0011;Yokie Girl 0012;Yokie Girl 0013;Yokie Girl 0014;Yokie Girl 0015;Yokie Girl 0016;Yokie Girl 0017;Yokie Girl 0018;Yokie Girl 0019;Yokie Girl 0020;Yokie Girl 0021;Yokie Girl 0022;Yokie Girl 0023;Yokie Girl 0024;Yokie Girl 0025;Yokie Girl 0026;Yokie Girl 0027;Yokie Girl 0028;Yokie Girl 0029;Yokie Girl 0030;Yokie Girl 0031;Yokie Girl 0032;Yokie Girl 0033;Yokie Girl 0035;Yokie Girl 0036;Yokie Girl 0037;Yokie Girl 0038;Yokie Girl 0039;Yokie Girl 0040;Yokie Girl 0041;Yokie Girl 0042;Yokie Girl 0043;Yokie Girl 0044;Yokie Girl 0045;Yokie Girl 0046;Yokie Girl 0047;Yokie Girl 0048;Yokie Girl 0049;Yokie Girl 0050;Yokie Girl 0051;Yokie Girl 0052;Yokie Girl 0053;Yokie Girl 0054;Yokie Girl 0055;Yokie Girl 0056;Yokie Girl 0057;Yokie Girl 0058;Yokie Girl 0059;Yokie Girl 0060;Yokie Girl 0061;Yokie Girl 0062;Yokie Girl 0063;Yokie Girl 0064;Yokie Girl 0065;Yokie Girl 0066;Yokie Girl 0067;Yokie Girl 0069;Yokie Girl 0070;Yokie Girl 0071;Yokie Girl 0072;Yokie Girl 0073;Yokie Girl 0074;Yokie Girl 0076;Yokie Girl 0077;Yokie Girl 0078;Yokie Girl 0079;Yokie Girl 0080;Yokie Girl 0081;Yokie Girl 0082;Yokie Girl 0083;Yokie Girl 0084;Yokie Girl 0085;Yokie Girl 0086;Yokie Girl 0087;Yokie Girl 0088;Yokie Girl 0090;Yokie Girl 0091;Yokie Girl 0092;Yokie Girl 0093;Yokie Girl 0094;Yokie Girl 0095;Yokie Girl 0096;Yokie Girl 0097;Yokie Girl 0099".split(";")\par
      \},\par
      coolface1: \{\par
         t: "Cool Face 1",\par
         u: "Cool Face 1/",\par
         n: "1cool_byebye 1cool_choler 1cool_dribble 1cool_look_down 2cool_after_boom 2cool_beated 2cool_burn_joss_stick 2cool_confident 2cool_go 2cool_hell_boy 2cool_misdoubt 2cool_sad 2cool_sexy_girl 3cool_adore 3cool_angry 3cool_embarrassed 3cool_nosebleed 3cool_shame 4cool_baffle 4cool_beauty 4cool_cold 4cool_confuse 4cool_doubt 4cool_hungry 4cool_oh 5cool_bad_smelly 5cool_beat_plaster 5cool_big_smile 5cool_ops 5cool_still_dreaming 5cool_sweat 6cool_ah 6cool_beat_brick 6cool_beat_shot 6cool_boss 6cool_smile 6cool_sure 6cool_surrender 6cool_what 7cool_extreme_sexy_girl 7cool_feel_good 7cool_spiderman 7cool_waaaht 8cool_amazed 8cool_cool 8cool_cry 8cool_matrix 8cool_rap 8cool_tire 9cool_canny 9cool_haha 9cool_pudency 9cool_sweet_kiss 9cool_too_sad".split(" ")\par
      \},\par
      coolface3: \{\par
         t: "Cool Face 3",\par
         u: "Cool Face 3/",\par
         n: "amazing anger bad_egg bad_smile beaten big_smile big_smile black_heart Cry cry electric_shock exciting eyes_droped Girl girl greedy grimace Haha haha happy horror money nothing nothing_to_say red_heart scorn secret_smile shame shocked super_man the_iron_man unhappy unhappy victory what".split(" "),\par
         f: ".png"\par
      \},\par
      gunny: \{\par
         t: "Gunny",\par
         u: "Gunny/",\par
         n: "000000;ga sleep;ga-baby;ga-bo-tay;ga-cam-dong;ga-cham-hoi;ga-chay;ga-cry;ga-dance;ga-danh-rang;ga-die;ga-dieu;ga-gian;ga-happy;ga-hoa-mat;ga-karaoke;ga-kenh-kieu;ga-le-luoi;ga-ngap;ga-ngu;ga-sac-mau;ga-sat-thu;ga-say-xin;ga-thap-nhang;ga-to-tinh".split(";")\par
      \},\par
      kanade: \{\par
         t: "Kanade Avatar",\par
         u: "Kanade Avatar/Kanade 0",\par
         n: "00 01 02 03 04 05 06 07 08 09".split(" "),\par
         b: 10,\par
         e: 61,\par
         f: ".jpg"\par
      \},\par
      neko: \{\par
         t: "Neko",\par
         u: "Neko/neko 0",\par
         n: "00 01 02 03 04 05 06 07 08 09".split(" "),\par
         b: 10,\par
         e: 56\par
      \}\par
   \},\par
   umh: \{\par
      r: "http://blog.uhm.vn/emo/",\par
      babysoldier: \{\par
         t: "Baby Soldier",\par
         e: 122\par
      \},\par
      binhsua: \{\par
         t: "Milk Bottle",\par
         e: 173\par
      \},\par
      bagiaxanh: \{\par
         t: "Green Scarf",\par
         e: 57\par
      \},\par
      banhbao: \{\par
         t: "Dango",\par
         e: 55\par
      \},\par
      bobototo: \{\par
         t: "Bobo Toto",\par
         e: 97\par
      \},\par
      bpopo: \{\par
         t: "Cool Face 2",\par
         e: 87\par
      \},\par
      caodo: \{\par
         t: "Red Fox",\par
         e: 39\par
      \},\par
      chikas: \{\par
         t: "Chikas",\par
         e: 116\par
      \},\par
      echxanh: \{\par
         t: "Green Frog",\par
         e: 86\par
      \},\par
      girlcatinh: \{\par
         t: "Little Girl",\par
         e: 70\par
      \},\par
      meoden: \{\par
         t: "Black Cat",\par
         e: 22\par
      \},\par
      meotrang: \{\par
         t: "White Cat",\par
         e: 28\par
      \},\par
      meemo: \{\par
         t: "Meemo Rabbit",\par
         e: 47\par
      \},\par
      panda: \{\par
         t: "Panda",\par
         e: 93\par
      \},\par
      kytu: \{\par
         t: "Cute Characters",\par
         e: 102\par
      \},\par
      heoden: \{\par
         t: "HeyHey Pig",\par
         e: 110\par
      \},\par
      heohong: \{\par
         t: "BeyBey Pig",\par
         e: 35\par
      \},\par
      heotron: \{\par
         t: "Lovely Pig",\par
         e: 43\par
      \},\par
      hamster: \{\par
         t: "Hamster",\par
         e: 45\par
      \},\par
      hamsterhong: \{\par
         t: "Pink Hamster",\par
         e: 27\par
      \},\par
      hodo: \{\par
         t: "Bofu",\par
         e: 70\par
      \},\par
      onion: \{\par
         t: "Onion",\par
         e: 139\par
      \},\par
      laluot: \{\par
         t: "Tuzki Rabbit",\par
         e: 78\par
      \},\par
      thotrang: \{\par
         t: "White Rabbit",\par
         e: 60\par
      \},\par
      vitcon: \{\par
         t: "Cute Ducks",\par
         e: 29\par
      \},\par
      yoyocici: \{\par
         t: "YoYo CiCi",\par
         e: 210\par
      \},\par
      yahoo: \{\par
         t: "Yahoo",\par
         e: 79\par
      \}\par
   \}\par
\}, bv_current, bv_url, bv_path, bv_type, bvE = \{\par
      create_emo: function (c, a) \{\par
         var h = eval("data." + c + "." + a);\par
         $("#_emo").text(h.t);\par
         bv_url = eval("data." + c).r;\par
         bv_path = h.u;\par
         void 0 == bv_path && (bv_path = a + "/");\par
         var d = h.n;\par
         void 0 == d && (d = []);\par
         var f = h.b;\par
         void 0 == f && (f = 1);\par
         var e = h.e,\par
            g = [];\par
         if (void 0 != e)\par
            for (var b = f; b <= e; b++) g[b - f] = b;\par
         bv_type = h.f;\par
         void 0 == bv_type && (bv_type = ".gif");\par
         bv_current = d.concat(g);\par
         $("#bv_emo .bv_pag").pagination(bv_current.length, \{\par
            callback: bvE.bv_emo\par
         \});\par
         $("#_emo").click()\par
      \},\par
      create_list: function (c) \{\par
         $.each(c, function (a, c) \{\par
            $.each(this, function (d, f) \{\par
               if ("r" != d) \{\par
                  var e = f.u;\par
                  void 0 == e && (e = d + "/");\par
                  var g = f.e;\par
                  void 0 == g && (g = f.n[0]);\par
                  var b = f.f;\par
                  void 0 == b && (b = ".gif");\par
                  $("#bv_list .bv_content").append('<a title="' + f.t + '" style="background-image:url(' + encodeURI(c.r + e + g + b) + ')" id="' + d + '" alt="' + a + '" class="click_emo" href="#' + d + '"></a>')\par
               \}\par
            \})\par
         \})\par
      \},\par
      bv_emo: function (c) \{\par
         $("#bv_emo .bv_content").empty();\par
         for (var a = bv_i * c; a < bv_i * c + bv_i; a++)\par
            if (void 0 != bv_current[a]) \{\par
               var h = encodeURI(bv_url + bv_path + bv_current[a] + bv_type);\par
               $("#bv_emo .bv_content").append('<a class="bv_emoticon" style="background-image:url(' + h + ')" href="javascript:;">[img]' + h + '[/img]</a>')\par
            \}\par
      \},\par
      bv_list: function (c) \{\par
         c = bv_i * (c + 1);\par
         $("#bv_list .bv_content a").hide();\par
         $("#bv_list .bv_content a:lt(" + c + ")").show();\par
         $("#bv_list .bv_content a:lt(" + (c - bv_i) + ")").hide()\par
      \},\par
      start: function () \{\par
         bvE.create_list(data);\par
         bvE.create_emo("fbemo", "meep")\par
      \}\par
   \};\par
$(function () \{\par
   $("#message").length && ($("body").append('<div id="bv_main"><ul id="tab_emo"><li><a id="_list"href="#menu">Danh s\\u00e1ch</a></li><li><a id="_emo"href="#smiley">Meep</a></li><li><a id="_about"href="#about">Th\\u00f4ng tin</a></li></ul><div id="bv_list"><div class="bv_content"></div><div class="bv_pag"></div></div><div id="bv_emo"><div class="bv_content"></div><div class="bv_pag"></div></div><div id="bv_about"><div class="bv_content" style="text-align:justify"><span style="font-size: 24px; line-height: normal"><strong><font color="#ff3333">bv_Emo</font></strong></span> <small>(version 1.3)</small><br><br><em>\u7912?ng d\u7909?ng \f1\'f0\u432?\u7907?c ph\'e1t tri\u7875?n cho chatbox forumotion, t\u7893?ng h\u7907?p 40 b\u7897? bi\u7875?u t\u432?\u7907?ng vui t\u7915? nhi\u7873?u ngu\u7891?n kh\'e1c nhau, l\u7907?i d\u7909?ng BBcode image \'f0\u7875? ch\f0\'e8n v\'e0o tin nh\u7855?n.<br>\f1\'d0\u7875? s\u7917? d\u7909?ng, b\u7841?n ch\u7881? c\u7847?n CLICK v\f0\'e0o bi\u7875?u t\f2\'fd\u7907?ng.<br><br>Chi ti\\u1ebft xem t\\u1ea1i: <a class="copyright" href="http://devs.forumvi.com/" target="_blank" alt="DEVs">http://devs.forumvi.com</a></em></div><div class="bv_pag">Copyright \\u00a9 2013 <strong>Zzbaivong</strong>. All rights reserved.</div></div></div>'), bvE.start(), $(".click_emo").click(function () \{\par
      bvE.create_emo($(this).attr("alt"), this.id)\par
   \}), $(document).on("click", ".bv_emoticon", function () \{\par
      $("#message").val($("#message").val() + $(this).text()).focus();\par
      $("#chatbox_footer form").submit();\par
   \}), $("#bv_list .bv_pag").pagination($("#bv_list a").length, \{\par
      callback: bvE.bv_list\par
   \}), $("#_list").addClass("active"), $("#tab_emo a").click(function () \{\par
      $("#tab_emo .active").removeClass();\par
      $(this).addClass("active");\par
      $("#bv_main > div").hide();\par
      $("#bv" + this.id).show()\par
   \}))\par
\});\f0\par
}
