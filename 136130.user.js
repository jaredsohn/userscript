// ==UserScript==
// @name           jgq
// @namespace      jgq
// @description    jgq
// @include        http://sp.pf.mbga.jp/*
// @run-at         document-start
// @version        6.71
// ==/UserScript==

FS = unsafeWindow.FS = {};
FS.version = 6.71;

unsafeWindow.orientation = 1;
unsafeWindow.ontouchstart = 1;

unsafeWindow.rand = rand = function (min, max) {
    // Returns a random number  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/rand    // +   original by: Leslie Hoare
    // +   bugfixed by: Onno Marsman
    // %          note 1: See the commented out code below for a version which will work with our experimental (though probably unnecessary) srand() function)
    // *     example 1: rand(1, 1);
    // *     returns 1: 1    
    var argc = arguments.length;
    if (argc === 0) {
        min = 0;
        max = 2147483647;
    } else if (argc === 1) {        throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

unsafeWindow.array_push = array_push = function (inputArr) {
    // Pushes elements onto the end of the array  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/array_push    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: Note also that IE retains information about property position even
    // %        note 1: after being supposedly deleted, so if you delete properties and then
    // %        note 1: add back properties with the same keys (including numeric) that had    // %        note 1: been deleted, the order will be as before; thus, this function is not
    // %        note 1: really recommended with associative arrays (objects) in IE environments
    // *     example 1: array_push(['kevin','van'], 'zonneveld');
    // *     returns 1: 3
    var i = 0,        pr = '',
        argv = arguments,
        argc = argv.length,
        allDigits = /^\d$/,
        size = 0,        highestIdx = 0,
        len = 0;
    if (inputArr.hasOwnProperty('length')) {
        for (i = 1; i < argc; i++) {
            inputArr[inputArr.length] = argv[i];        }
        return inputArr.length;
    }
 
    // Associative (object)
    for (pr in inputArr) {
        if (inputArr.hasOwnProperty(pr)) {
            ++len;
            if (pr.search(allDigits) !== -1) {
                size = parseInt(pr, 10);
                highestIdx = size > highestIdx ? size : highestIdx;
            }
        }
    }
    for (i = 1; i < argc; i++) {
        inputArr[++highestIdx] = argv[i];
    }
    return len + i - 1;
}

unsafeWindow.in_array = in_array = function (needle, haystack, argStrict) {
    // Checks if the given value exists in the array  
    // 
    // version: 1109.2015
    // discuss at: http://phpjs.org/functions/in_array    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: vlado houba
    // +   input by: Billy
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);    // *     returns 1: true
    // *     example 2: in_array('vlado', {0: 'Kevin', vlado: 'van', 1: 'Zonneveld'});
    // *     returns 2: false
    // *     example 3: in_array(1, ['1', '2', '3']);
    // *     returns 3: true    // *     example 3: in_array(1, ['1', '2', '3'], false);
    // *     returns 3: true
    // *     example 4: in_array(1, ['1', '2', '3'], true);
    // *     returns 4: false
    var key = '',        strict = !! argStrict;
 
    if (strict) {
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
    } else {
        for (key in haystack) {
            if (haystack[key] == needle) {
                return true;
            }
        }
    } 
    return false;
}

//"domcontentloaded","beforescriptexecute","afterscriptexecute","domnodeinserted".
unsafeWindow.addEventListener("beforescriptexecute", function(e) {
    // document.orientation = 1;
    //     document.ontouchstart = 1;
    // document.body.innerHTML = document.body.innerHTML.replace(/onload=/ig, 'onload1=');
    console = unsafeWindow.console;
    if (unsafeWindow.$) {$ = unsafeWindow.$;};
    if (document && document.body && e.target.text.match(/document\.orientation/i) || e.target.text.match(/document\.ontouchstart/i)) {
        unsafeWindow.console.log(e);
        unsafeWindow.console.log('e.target.text:' + e.target.text);
        e.stopPropagation();
        e.preventDefault();
        document.body.style.width = '480px';
        document.body.style.margin = '0 auto';
    };
    // document.body.innerHTML = str + document.body.innerHTML;
}, false);

$ = null;
FS.console = console = {};
// #box_relative {
//   position: absolute;
//   left: 30px;
//   top: 20px;
// }
FS.console.log = function(log){
    // unsafeWindow.console.log(log);
    if (!$ || !$('#box_relative #console_log')) {return;};
    if ($('#box_relative #console_log p').length > 30) {$('#box_relative #console_log p').first().remove()};
    $('#box_relative #console_log').append('<p style="padding: 5px; margin: 2px 0px;background-color:#' + rand(100000, 999999) + ';">' + log + '</p>');
};
FS.timeInterval = 0;
FS.xuanluTimes = 0;
FS.timeOut = 60000;
//60000 = 1min
FS.clockId = 0;

FS.SURL = 'http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fquest%3Frnd%3D';
FS.first_quest_url = 'http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fquest%2Fmission_list%2F2%3Frnd%3D';
FS.go_renwu = 1;
FS.startAll = function() {
    $ = unsafeWindow.$;
    $('body').empty();
    //body
    document.body.style.width = '100%';
    document.body.innerHTML = '<div id="bahamutemain">\
							<div style="margin-left: 440px;float:left;width:320px;" id="putongrenwuClock"><span name="time">-------</span>&nbsp;&nbsp;&nbsp;&nbsp;TimeOut: <span style="color: red;" name="clock">0</span></div>\
							<div style="margin-left: 30px;float:left;width:320px;" id="xianshirenwuClock"><span name="time">-------</span>&nbsp;&nbsp;&nbsp;&nbsp;TimeOut: <span style="color: red;" name="clock">0</span></div>\
							<div style="margin-left: 440px;float:left;width:320px;" id="putongrenwuMa"><div id="putongrenwu_status"></div><div id="putongrenwu">putongrenwu</div></div>\
							<div style="margin-left: 30px;float:left;width:320px;" id="xianshirenwuMa"><div id="xianshirenwu_status"></div><div id="xianshirenwu">xianshirenwu</div></div>\
							<div style="margin-left: 30px;float:left;width:120px;" id="">\
							<input checked="checked" type="checkbox" id="contribute" value="contribute" /><label for="contribute">contribute</label><br />\
							<input checked="checked" type="checkbox" id="startRenWu" value="startRenWu" /><label for="startRenWu">startRenWu</label><br />\
							<input checked="checked" type="checkbox" id="startBattle" value="startBattle" /><label for="startBattle">startBattle</label><br />\
							</div>\
							</div>';
    $('body').append('<div id="box_relative">\
            <input style="margin-left: 30px;" type="button" onclick="FS.stopAll();$(this).attr(\'onclick\', \'FS.startAll();\');$(this).val(\'start\');" value="stop" /> ver: ' + FS.version + ' \
            <div id="console_log" style="height: 800px;"></div>\
        </div>');
    box_relative = $('#box_relative');
    box_relative.css('position', 'absolute');
    box_relative.css('left', '10px');
    box_relative.css('top', '20px');
    box_relative.css('width', '400px');
    $('body').css('word-wrap', 'break-word');
    
    FS.console.log('waigua start. version = ' + FS.version);
    FS.stop();
    // FS.timeInterval = setInterval(function(){FS.one()}, 60000);//60000 = 1min
    if (FB) {
        clearTimeout(FB.timeOut);
        FB.timeOut = setTimeout(function(){FB.start();}, 10*1000); // 20s 后开始
    };
    if (FR) {
        // FR.one();
    }
    FS.one();

    return true;
}

FS.start = function(timeOut) {
    timeOut = timeOut ? timeOut: FS.timeOut;
    FS.timeOut = timeOut;
    FS.stop();
    FS.clock(timeOut);
    FS.timeInterval = setInterval(function() {
        FS.clock(timeOut);
        FS.one();
    },
    timeOut);
    //60000
    FS.console.log('FS ---> start. TimeOut: ' + timeOut / 1000);
}

FS.clock = function(time) {
    if (FS.clockId) {
        clearInterval(FS.clockId);
    }
    var clockHtml = '#putongrenwuClock';
    FS.now(clockHtml);

    var clockHtmlId = clockHtml + '>[name=clock]';
    $(clockHtmlId).html(Math.ceil(time / 1000));
    FS.clockId = setInterval(function() {
        $(clockHtmlId).html(Math.ceil($(clockHtmlId).html() - 1));
    },
    1000);
}

FS.now = function(id) {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    $(id + '>[name=time]').html(year + "-" + month + "-" + day + " " + hour + ":" + ":" + minute + ":" + second);
}

FS.stop = function() {
    if (FS.timeInterval) {
        clearInterval(FS.timeInterval);
    }
    if (FS.clockId)
    {
        clearInterval(FS.clockId);
    }
    FS.console.log('FS ----> stop');
    return true;
}

FS.stopAll = function() {
    FS.stop();
    if (FR) {
        FR.stop();
    }
    if (FB) {
        FB.stop();
    }
    return true;
}

FS.one = function(doNotReset) {
    if ($('#startRenWu').prop("checked") == false) {
        FS.start(1000*60*1.2);// 一分钟后再来一次
        FS.console.log('FS ---> one : 任务关闭，等待开启 ');
        return;
    };
    FS.console.log('FS ---> one : 普通任务启动。 reset! ');
    if (doNotReset == 1) {
        //do not
    } else {
        FS.xuanluTimes = 0;
    }
    var url = FS.go_renwu ? FS.SURL + rand(111111111, 999999999) : FS.first_quest_url + rand(111111111, 999999999);
    if(FS.timeOut < 70000){ //1分钟以下的执行
        url = FS.first_quest_url + rand(111111111, 999999999);
    }
    $.ajax({
      url: url,
      success: function(data){
          data = FS.dealData(data);
          $('#putongrenwu').empty();
          $('#putongrenwu').html('<div id="putongrenwu_status">in one</div>' + data);
          //check boss
          if ($('#accesskey_5').val() == "ボスと戦う") {
              FS.two($('#accesskey_5').closest('form').attr('action'), 'boss');
          };
          //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fsmart_phone_flash%2FquestConvert%2F2%2F4%3Frnd%3D590020710
          var reg = /<form[^>]+action=('|")([^>]+?2Fsmart_phone_flash%2FquestConvert%2F[^>]+?)\1/i;
          //2%2F4==2/4  //to do change url
          var temp = data.match(reg);
          if (temp && temp[2]) {
              var renwu_url = temp[2];
              FS.console.log('in renwu tourl ' + renwu_url);
              //rewu
              //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fsmart_phone_flash%2FquestConvert%2F4%2F1%3Frnd%3D17676872
              //reg = /value="実行する"/ig;
              var tili_min = 0;
              var tili_max = 0;
              var jinyan_min = 0;
              var jinyan_max = 0;
              temp = data.match(/体　力:<\/span>(\d+)\/(\d+)/);
              if (temp && temp[1] && temp[2])
              {
                  tili_min = temp[1];
                  tili_max = temp[2];
              }
              temp = data.match(/経験値:<\/span>(\d+)\/(\d+)/);
              if (temp && temp[1] && temp[2])
              {
                  jinyan_min = temp[1];
                  jinyan_max = temp[2];
              }
              FS.console.log('tili_min: ' + tili_min + ' tili_max: ' + tili_max + ' jinyan_min: ' + jinyan_min + ' jinyan_max: ' + jinyan_max);
              // 可能升级了，如果在战斗等待中，就准备重启战斗
              if (FB && (tili_max - tili_min) == 0 && (FB.battle_waite == true && parseInt($('#xianshirenwuClock [name=clock]').text()) > 6*60) ) {
                  FB.stop();    //  停止当前的战斗
                  clearTimeout(FB.timeOut);
                  FB.timeOut = setTimeout(function(){FB.start();}, 1000*60*7); // 7分钟后 后开始
              };
              // renwu tiao jian pan ding
              if ( ((tili_max - tili_min) <= parseInt(tili_max/2)) || ((jinyan_max - jinyan_min) > 10 && (jinyan_max - jinyan_min) <= (parseInt(tili_min) + 30)) ) {
                  //kuai
                  FS.start(1000*60*2);
                  FS.two(renwu_url, 'renwu');
              } else if ((jinyan_max - jinyan_min) <= 10) {
                  FS.start(1000*60*1);//start 1 point ren wu
                  FS.two(renwu_url, 'renwu');
              } else {
                  //man
                  FS.start(rand(1000*60*22, 1000*60*28));// rand 12-18 min
                  FS.console.log('普通任务，体力：' + tili_min);
                  $('#putongrenwu #putongrenwu_status').html('<div style="color:red;">one 体力不足</div>');
              }
              return;

          } else {
              FS.start( 1000*60*30 );//30 min
              $('#putongrenwu #putongrenwu_status').html('<div>one error</div>');
          }
      },
      error:function(){
          FS.console.log('刷新页面 session');
          window.open('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D'+ rand(111111111, 999999999), '_playflashform');
          FS.start(1000*60*1.2);// 一分钟后再来一次
      }
    });
}

FS.two = function(url, type) {
    $.post(url,
    function(data) {
        var temp = data.match(/JumpinJack\(("|')([^"']+)\1/i);
        data = FS.dealData(data);
        switch (type) {
        case 'renwu':
            if (temp && temp[2]) {
                $.get(temp[2],
                function(data) {
                    FS.console.log('over renwu url = ' + temp[2]);
                });
            } else {
                FS.console.log('error renwu');
                $('#putongrenwu #putongrenwu_status').html('<div>error renwu</div>');
            }
            break;

        case 'boss':
            FS.console.log('普通任务：boss come,attack!');
            window.open('about:blank', '_playflashform');   //早点开
            var reg = /<form[^>]+action=('|")([^>]+?smart_phone_flash[^>]+?)\1/i;
            var temp = data.match(reg);
            if (temp && temp[2]) {
                data = str_replace(temp[0], temp[0].replace(/<form /ig, '<form target="_playflashform" id="putongrenwuboss" '), data);
                FS.console.log('普通任务 booss form url = ' + temp[2]);
                $('#putongrenwu').html('<div id="putongrenwu_status">boss attack</div>' + data);
                $('#putongrenwuboss').submit();
                return;
            } else {
                $('#putongrenwu #putongrenwu_status').html('<div>boss error</div>');
            }
            break;
            
        default:
            break;
        }
        return;

    });
}

FS.dealData = function(data) {
    data = data.replace(/\r/ig, '').replace(/\n/ig, '');
    data = data.replace(/^.*?<body>/ig, '');

    data = data.replace(/<\/body>/ig, '');
    data = data.replace(/<\/html>/ig, '');

    data = data.replace(/<script([^>]+?)>/ig, '<script1><!-- ');
    data = data.replace(/<\/script>/ig, '//--></script1>');

    data = data.replace(/id=('|")loading\1/ig, 'style="display:none"');
    data = data.replace(/onunload=('|")unloadBye\(\)\1/ig, 'style="display:block"');

    return data;
}

//-------------------------------------------------------------------------//
//xian shi ren wu
FR = unsafeWindow.FR = {};
FR.timeOut = 1200000;
//60000 = 1min
FR.timeInterval = 0;
FR.clockId = 0;
FR.xuanluTimes = 0;
FR.SURL = 'http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fevents%2Fevent_008_quest%2Fmission_list%3Frnd%3D';

FR.clock = function(time) {
    if (FR.clockId) {
        clearInterval(FR.clockId);
    }
    var clockHtml = '#xianshirenwuClock';
    FS.now(clockHtml);
    var clockHtmlId = clockHtml + '>[name=clock]';
    $(clockHtmlId).html(Math.ceil(time / 1000));
    FR.clockId = setInterval(function() {
        $(clockHtmlId).html(Math.ceil($(clockHtmlId).html() - 1));
    },
    1000);
}

FR.start = function(timeOut) {
    timeOut = timeOut ? timeOut: FR.timeOut;
    FR.stop();
    FR.clock(timeOut);
    FR.timeInterval = setInterval(function() {
        FR.clock(timeOut);
        FR.one();
    },
    timeOut);
    //60000
    FS.console.log('FR ---> start. TimeOut: ' + timeOut / 1000);
}

FR.stop = function() {
    if (FR.timeInterval) {
        clearInterval(FR.timeInterval);
    }
    if (FR.clockId)
    {
        clearInterval(FR.clockId);
    }
    FS.console.log('FR ----> stop');

    return true;
}

FR.one = function(doNotReset) {
    // default 慢
    FS.console.log('FR ---> one : 限时任务启动。 reset! ');
    FR.start( 1000*60*rand(8, 11) );//10 min
    //20min
    if (doNotReset == 1) {
        //do not
    } else {
        FR.xuanluTimes = 0;
    }
    $.ajax({
    url: FR.SURL + rand(111111111, 999999999),
    success: function(data){
        data = FS.dealData(data);
        $('#xianshirenwu').empty();
        $('#xianshirenwu').html('<div id="xianshirenwu_status">in one</div>' + data);
        var reg = /<form[^>]+action=('|")([^>]+?)\1/i;
        var temp = data.match(reg);
        if (temp && temp[2]) {
          reg = /value="先に進む"/ig;
          if (data.match(reg)) {
              //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fapp_manage%2Fpost_redirection%2F%3Furl%3Devents%252Fevent_008_quest%252Fplay%252F1%252F1%252F%26rnd%3D466988129
              reg = /<form[^>]+action=('|")([^>]+2Fpost_redirection[^>]+252Fplay[^>]+?)\1/i;
              temp = data.match(reg);
              var renwu_url = temp[2];
              //FS.console.log('限时任务：url: ' + renwu_url);
              var tili_min = 0;
              var tili_max = 0;
              var jinyan_min = 0;
              var jinyan_max = 0;
              temp = data.match(/体　力:<\/span>(\d+)\/(\d+)/);
              if (temp && temp[1] && temp[2])
              {
                  tili_min = temp[1];
                  tili_max = temp[2];
              }
              temp = data.match(/経験値:<\/span>(\d+)\/(\d+)/);
              if (temp && temp[1] && temp[2])
              {
                  jinyan_min = temp[1];
                  jinyan_max = temp[2];
              }
              FS.console.log('限时任务：体力: ' + tili_min + ' - ' + tili_max + ' 经验: ' + jinyan_min + ' - ' + jinyan_max);
              // if (tili_min >= 100) {
              //                   //kuai
              //                   FR.start(1000*60*4);
              //               } else if ((jinyan_max - jinyan_min) <= 30) {
              //                   FR.start(1000*60*5);
              //               }
              var is_big_boss = false;
              var renwuForm = null;
              window.open('about:blank', '_playflashform'); 
              $('#xianshirenwu form').each(function(){
                  $(this).attr('target', '_playflashform'); // 调整 form target
                  var sub = $(this).find('input:submit');   // 检查button
                  if (sub.val() == '戦闘準備へ') {
                      FS.console.log('优先 BIG BOSS');
                      $(this).attr('target', '_playflashform'); 
                      $(this).submit();
                      is_big_boss = true;
                  };
                  if (sub.val() == '先に進む') {
                        if ((is_big_boss && (tili_max - tili_min) <= parseInt(tili_max/6))
                             || (!is_big_boss && tili_min > 70)
                             || ((jinyan_max - jinyan_min) <= (parseInt(tili_min) + 30))) {
                            var tout = is_big_boss ? (1000*60*3) : 1000;
                            renwuForm = $(this);
                            $(this).attr('target', '_playflashform'); 
                            FS.console.log('将做个任务 after: -' + tout/1000);
                            FS.console.log('因 限时任务 调整时间');
                            FR.start(1000*60*5);
                            setTimeout(function(){
                                FS.console.log('提交任务');
                                var accesskey_5 = $('#xianshirenwu #accesskey_5');
                                if (accesskey_5 && accesskey_5.val() == '先に進む') {
                                    renwuForm = accesskey_5.closest('form');
                                };
                                renwuForm.attr('target', '_playflashform');
                                renwuForm.submit();
                            }, tout);
                      } else if(is_big_boss) {
                          FS.console.log('因 BIG BOSS 调整时间');
                          FR.start(1000*60*5);
                      };
                  };
              });
              if (renwuForm)
              {
                  // FR.two(renwu_url, 'renwu');
              } else {
                  $('#xianshirenwu #xianshirenwu_status').html('<div style="color:red;">限时任务：任务条件不足，未启动！</div>');
              }
              return;
          }

          reg = /value="道のりを選ぶ"/ig;
          if (data.match(reg)) {
              FS.console.log('限时任务：in xuanlu');
              FR.two(temp[2], 'xuanlu');
              return;
          }
          reg = /value="ボスと戦う"/ig;
          if (data.match(reg)) {
              FS.console.log('限时任务：boss');
              FR.two(temp[2], 'boss');
              return;
          }
          $('#xianshirenwu #xianshirenwu_status').html('<div style="color:red;">one error</div>');
        } else {
          $('#xianshirenwu #xianshirenwu_status').html('<div style="color:red;">one error</div>');
        }
    },
    error:function(){
      FS.console.log('限时任务请求失败！ 刷新页面 session！');
      window.open('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D'+ rand(111111111, 999999999), '_playflashform');
      FR.start(1000*60*1);// 一分钟后再来一次
    }
    });
}

FR.two = function(url, type) {
    window.open('about:blank', '_playflashform');   //早点开
    if (type == 'renwu') {
        $('#xianshirenwu form').each(function(){
            if (sub.val() == '先に進む') {
                $(this).attr('target', '_playflashform');
                $(this).submit();
            };
        });
        FS.console.log('限时任务：over renwu');
        return;
    } else {
        $.post(url, function(data) {
            data = FS.dealData(data);
            switch (type) {
                case 'xuanlu':
                    FS.console.log('限时任务：deal xuanlu');
                    var temp = data.match(/<a[^>]+href=("|')([^>]+2Fdo_open[^>]+)\1/i);
                    FS.console.log('选录：temp = ' + temp);
                    if (temp && temp[2]) {
                        $('#xianshirenwu').html('<div>xuanlu page</div>' + data);
                        FS.console.log('xuanlu url = ' + temp[2]);
                        FR.xuanlu(temp[2]);
                    } else {
                        $('#xianshirenwu').html('<div>xuanlu error</div>' + data);
                    }
                    break;

                case 'boss':
                    FS.console.log('限时任务：boss come,do not!');
                    var reg = /<form[^>]+action=('|")([^>]+?smart_phone_flash[^>]+?)\1/i;
                    var temp = data.match(reg);
                    if (temp && temp[2]) {
                        data = str_replace(temp[0], temp[0].replace(/<form /ig, '<form target="_playflashform" id="xianshirenwuboss" '), data);
                        FS.console.log('booss form url = ' + temp[2]);
                        $('#xianshirenwu').html('<div>boss attack</div>' + data);
                        $('#xianshirenwuboss').submit();
                        return;
                    } else {
                        $('#xianshirenwu').html('<div>boss error</div>' + data);
                    }
                    break;

                default:
                    break;
            }
            return;
        });
    }
}

FR.xuanlu = function(url) {
    $.get(url,
    function(data) {
        if (FR.xuanluTimes >= 1) {
            $('#xianshirenwu').html($('#xianshirenwu').html() + '<div>xuanlu over</div>' + data);
        } else {
            FR.xuanluTimes++;
            FR.one(1);
        }
    });
}
//----------------------end-------------------------//

//----------------------battle-------------------------//
FB = unsafeWindow.FB = {};
FB.timeOut = 0;
FB.select_uses = [];
FB.battle_uses = [];
FB.uris        = [];
//60000 = 1min
FB.team = 'Z';
FB.search_times = 0; // 查询次数过高后，自动提高目标防御力 max 100;
FB.battle_i = 0;
FB.battle_try = 0; // max 3
FB.battle_ak = 0; // attack times max 3
FB.battle_waite = false;
FB.timeInterval = 0;
FB.clockId = 0;
FB.xuanluTimes = 0;
FB.max_point_df = 25; // 默认目标防御力
FB.max_point_up = 65; // up 目标防御力
FB.max_point_st = 0;
FB.run_day = 0;
FB.last_day = 0;
FB.lock = true;
FB.SURL = 'http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fbattle%3Frnd%3D';

FB.clock = function(time) {
    if (FB.clockId) {
        clearInterval(FB.clockId);
    }
    var clockHtml = '#xianshirenwuClock';
    FS.now(clockHtml);
    var clockHtmlId = clockHtml + '>[name=clock]';
    time = time ? time : 0;
    var setp = time ? -1 : 1;
    $(clockHtmlId).html(Math.ceil(time / 1000));
    FB.clockId = setInterval(function() {
        $(clockHtmlId).text(Math.ceil(parseInt($(clockHtmlId).text()) + setp));
    },
    1000);
}

FB.start = function(bturl, max_point, reset) {
    FB.stop();
    FB.clock();
    FB.SURL = bturl ? bturl : FB.SURL;
    FB.max_point_st = FB.max_point = max_point ? max_point : FB.max_point_df;
    reset = !!reset;
    if(reset){
        FB.select_uses = [];
    }
    FB.lock = false;
    FS.console.log('FB ---> start. max_point:' + FB.max_point);
    var now = new Date();
    // 每天重置一次对手
    FB.run_day = now.getDate();
    if (!FB.last_day && now.getHours() >= 5) {
        FB.last_day = now.getDate();
    } else if (FB.last_day != FB.run_day && now.getHours() >= 5) {
        FB.last_day = FB.run_day;
        FB.battle_uses = [];
    };
    FB.search_times = 0;
    FB.battle_try = 0; //reset
    FB.get_attack_person();
}

FB.stop = function() {
    if (FB.timeInterval) {
        clearInterval(FB.timeInterval);
    }
    if (FB.clockId) {
        clearInterval(FB.clockId);
    }
    if (FB.timeOut) {
        clearTimeout(FB.timeOut);
    };
    FB.lock = true;
    FS.console.log('FB ----> stop');
    return true;
}

FB.get_attack_person = function() {
    if ($('#startBattle').prop("checked") == false) {
        clearTimeout(FB.timeOut);
        FB.timeOut = setTimeout(function(){FB.start();}, 1000*60*1.5);
        FS.console.log('FB ---> get person. 任务关闭，等待开启 ');
        return;
    };
    if (FB.lock) {return;};
    // default 慢
    FS.console.log('FB ---> get person. max_point: '+FB.max_point+' s_times: ' + FB.search_times);
    if (FB.uris && FB.uris[FB.battle_i]) {
        FS.console.log('FB ---> 继续处理上次未完成任务！ ');
        FB.getattackinfo();
        return;
    };
    // GET 开始一个新任务
    $.ajax({
    url: FB.SURL + rand(111111111, 999999999),
    success: function(data){
        data = FS.dealData(data);
        $('#xianshirenwu').empty();
        $('#xianshirenwu #xianshirenwu_status').text('list one');
        $('#xianshirenwu').html(data);
        FB.battle_i = 0;    // 新任务，重置
        FB.battle_ak = 0;   // 新任务，重置
        FB.battle_try = 0; //reset
        FB.uris = data.match(/("|')[^"']+Fbahamut%2Fbattle%2Fbattle_check[^"']+\1/ig);
        if (FB.uris) {
            clearTimeout(FB.timeOut);
            FB.timeOut = setTimeout(function(){FB.getattackinfo();}, 5000);// 5 秒法则
        } else {
            clearTimeout(FB.timeOut);
            FB.timeOut = setTimeout(function(){FB.start();}, 60*1000*30);// 30分钟后再来一次
        };
    },
    error:function(){
      FS.console.log('限时任务请求失败！ 刷新页面 session！');
      window.open('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D'+ rand(111111111, 999999999), '_playflashform');
      clearTimeout(FB.timeOut);
      FB.timeOut = setTimeout(function(){FB.start();}, 60*1000*1.5);// 一分钟后再来一次
    }
    });
}

FB.getattackinfo = function (){
    if (FB.lock) {return;};
	if(FB.uris[FB.battle_i]){
		//http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fbattle%2Fbattle_check%2F1365675%2F22%2F6%2F7%3Frnd%3D282711356
		var url = FB.uris[FB.battle_i].replace(/['"]/ig, '');
		var temp = url.match(/2Fbattle_check%2F(\d+)/i);
		var uid = 0;
		if (temp && temp[1]) {
		    uid = temp[1];
		} else {
		    $('#xianshirenwu_status').text('无法获取URL的 uid');
		    return;//no uid
		};
		if (in_array(uid, FB.select_uses) || in_array(uid, FB.battle_uses)) {
            //已经检查
            FB.battle_i++;
            //FB.search_times++; // 重复的不算
            FB.getattackinfo();
            return;
		} else  {
		    
		};
		$.ajax({
            url: url,
            success: function(data){
                $('#xianshirenwu_status').text('当前对象： ' + url);
    		    data = FS.dealData(data);
                data = data.replace(/id=('|")loading\1/ig, 'style=\'display:none\'');
                data = data.replace(/type=('|")submit\1/ig, 'style="display:none" type="submit"');
                $('#xianshirenwu').empty();
                $('#xianshirenwu').html(data);
    			var temp = data.match(/防戦力:<\/span>\d+/ig);
    			var defPoint = -1;
    			if (temp && temp[1])
    			{
    				temp = temp[1].match(/\d+/);
    				defPoint = temp[0];
    				FB.battle_try = 0; //reset
    			}
    			if (data.match(/に奪われていました/ig)) {
    			    FS.console.log('奪われていました ' + uid);
    			    defPoint = 99999;
    			};
    			if(defPoint > FB.max_point){
    			    // 查找失败
    			    array_push(FB.select_uses, uid);// 添加排除
    			    // 屏蔽点击
    				$('form').each(function(){
    				    $(this).attr('target', '_playflashform');
    				    $(this).attr('disabled', 'disabled');
    				});
    				clearTimeout(FB.timeOut);
                    FB.timeOut = setTimeout(function(){
    				    FB.search_times++;FB.battle_i++;FB.battle_try = 0;
    				    if (FB.search_times > 200) {
    				        FS.console.log('查询数大于 200， 升级目标防御力 ' + FB.max_point_up);
    				        FB.max_point = FB.max_point_up; // 升级目标防御力
    				    };
    				    FB.getattackinfo();
    				}, 5000);// 5 秒法则 // 下一个
    				return;
    			} else if (defPoint == -1) { // 出错了
    			    FB.error_do('检查页面， 页面内容分析 出错');
    			    return;
    			} else { // 找到目标了
    			    // reset 
    			    if (FB.battle_ak == 0) {
    			        // 发现目标对手
    			        FS.console.log('发现目标对手，重置 search_times：0 max_point： ' + FB.max_point);
    			        FB.max_point = FB.max_point_st;
        			    FB.search_times = 0;
    			    };
    			    // 攻击对手3次
    			    FB.team = defPoint < 15 ? 'Z' : 'X';
    			    var self_attack_point = 45;
    			    if (defPoint > 25) {
    			        FB.team = ''; // 默认队伍上吧
    			        self_attack_point = 80;
    			    };
    			    FS.console.log('battle: ' + url);
    			    temp = data.match(/>攻戦力:<\/span>(\d+)/i);
    			    var at_time_out = 10;
    			    FB.battle_waite = false;
    			    if (temp && parseInt(temp[1]) < self_attack_point) {
    			        at_time_out = 1000 * 60 * 60; // 一个小时后见
    			        FB.clock(at_time_out);
    			        $('#xianshirenwu_status').html('战力不足，等待中 ： ' + (FB.battle_ak + 1) + '<br />' + url);
    			        FS.console.log('战力不足，等待中...... ' + (FB.battle_ak + 1));
    			        FB.battle_waite = true;
    			    };
    			    clearTimeout(FB.timeOut);
                    FB.timeOut = setTimeout(function(){
    			        $('#xianshirenwu_status').text('准备循环战斗 ： ' + url);
    			        FS.console.log('准备循环战斗，等待中......');
    			        FB.battle_waite = false;
    			        at_time_out = 1000*60*1.5;
    			        FB.clock(at_time_out);
    			        clearInterval(FB.timeInterval); // 停止先
                        FB.timeInterval = setInterval(function() {
                            FB.clock();
                            if (!url || FB.battle_try >= 3 || FB.battle_ak >= 3) {
                                clearInterval(FB.timeInterval); // 停止自己
                                if (!in_array(uid, FB.battle_uses)) {
                			        array_push(FB.battle_uses, uid);// 添加排除
                			    };
                                if (FB.battle_ak >= 3) {    // 正常攻击结束
                                    FB.battle_i++;
                                    FB.battle_ak = 0;   // 新任务，重置
                                    FB.start(); // 重开始
                                } else {
                                    FB.error_do('FB.attack 条件错误');
                                };
                                return;
                            };
                            FB.attack(url);
                        },
                        at_time_out);
    			    }, at_time_out);
    			    return;
    			}
    		},
            error:function(){
                FB.error_do('检查页面， get 出错');
            }
        });
	} else {
		clearTimeout(FB.timeOut);
        FB.timeOut = setTimeout(function(){FB.get_attack_person();}, 5000);// 5 秒法则 // 下一组
	}
}

FB.attack = function  (url) {
    if (FB.lock) {return;};
    $('#xianshirenwu_status').text('战斗中... ' + (FB.battle_ak + 1));
    $.ajax({
        url: url,
        success: function(data){
		    data = FS.dealData(data);
            data = data.replace(/id=('|")loading\1/ig, 'style=\'display:none\'');
            data = data.replace(/type=('|")submit\1/ig, 'style="display:none" type="submit"');
            $('#xianshirenwu').empty();
            $('#xianshirenwu').html(data);
            // 刷新完成，找表单
            var deck_id_val = '0';
            var teamUrl = '';
            $('#xianshirenwu form select[name=deck_id] option').each(function(index){
                if (index == 0) {
                    teamUrl = $(this).closest('form').attr('action');
                };
                if($(this).text() == FB.team) {
                    deck_id_val = $(this).attr('value');
                } 
            });
            if (deck_id_val == '0') {   //  战队 0，要求攻击力必须大于80
		        temp = data.match(/>攻戦力:<\/span>(\d+)/i);
		        if (!temp) {
		             FB.error_do('FB.attack 查询战力错误');
		             return;
		        } else if (parseInt(temp[1]) < 80) {
			        var at_time_out = 1000 * 60 * 60; // 一个小时后见
			        FB.clock(at_time_out);
			        $('#xianshirenwu_status').html('0队伍 战力不足，等待中 ： ' + (FB.battle_ak + 1) + '<br />' + url);
			        FS.console.log('0队伍 战力不足，等待中...... ' + (FB.battle_ak + 1));
			        FB.battle_waite = true;
			        clearInterval(FB.timeInterval);
			        clearTimeout(FB.timeOut);
                    FB.timeOut = setTimeout(function(){
                        FB.clock();
    			        FB.battle_waite = false;
    			        FB.getattackinfo();
    			    }, at_time_out);
    			    return;
			    } else {
			       // go on
			    };
		    };
            $.ajax({
                url: teamUrl,
                type: "POST",
                data: {deck_id : deck_id_val},
                success: function(data){
                    FS.console.log('FB.attack 战队选择完成');
                    data = FS.dealData(data);
                    data = data.replace(/id=('|")loading\1/ig, 'style=\'display:none\'');
                    data = data.replace(/type=('|")submit\1/ig, 'style="display:none" type="submit"');
                    $('#xianshirenwu').empty();
                    $('#xianshirenwu').html(data);
                    $('form').each(function(){
    			        $(this).attr('target', '_playflashform');
    			    });
                    var accesskey_5 = $('#xianshirenwu #accesskey_5');
                    if (accesskey_5 && accesskey_5.val() == 'ﾊﾞﾄﾙ開始') {
                        accesskey_5.css('display', 'none');
                        accesskey_5.closest('form').submit(); // 提交攻击
                        FB.battle_ak++;
                        FS.console.log('攻击对手： ' + FB.battle_ak);
                        // 攻击完成
                        // 判断一下个人拥有金币量，超过 1000，给公会去！
                        clearTimeout(FB.timeOut);
                        FB.timeOut = setTimeout(function(){
                            if ($('#contribute').prop("checked")) {
                              $.get('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D' + rand(111111111, 999999999), function(data, textStatus, xhr) {
                                data = FS.dealData(data);
                                $('#xianshirenwu').empty();
                                $('#xianshirenwu').html(data);
                                var temp = $('body').text().match(/ルピ：[^\d]+(\d+)/);
                                if (temp && temp[1] && temp[1] > 1000) {
                                  var coin = temp[1] - temp[1]%1000;
                                  $.get('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fknights%2Fdonate_lupi_confirm%3Flupi%3D'+ coin +'%26rnd%3D' + rand(111111111, 999999999), function(data, textStatus, xhr) {
                                    data = FS.dealData(data);
                                    $('#xianshirenwu').empty();
                                    $('#xianshirenwu').html(data);
                                    $('#xianshirenwu form').each(function(){
                                      if ($(this).find('input[type=submit]').val() == '寄付する') {
                                        $(this).prop('target', '_playflashform');
                                        $(this).submit();
                                        $('#xianshirenwu_status').html('寄付する: ' + coin);
                                        FS.console.log('寄付する： ' + coin);
                                      };
                                    });
                                  });
                                };
                              });
                            };
              			    }, 1000*60);
                        // 攻击极富处理完成
                    } else {
                        FB.error_do('攻击停止 页面错误');
                    };
                },
                error:function(){
                    FB.error_do('FB.attack 战队选择错误');
                }
            });
		},
        error:function(){
            FB.error_do('FB.attack 入口错误', true);
        }
    });
}
FB.error_do = function  (log, reset) {
    reset = !!reset;
    FS.console.log(log);
    if (FB.timeInterval) {
        clearInterval(FB.timeInterval);
    }
    // 出错，1分钟后，再来一次
    if (FB.battle_try < 3) {
        if (reset) {
            window.open('http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D'+ rand(111111111, 999999999), '_playflashform');
        };
        $('#xianshirenwu_status').html('waite...... battle_try：' + FB.battle_try + "<br />" + FB.uris[FB.battle_i]);
        FB.battle_try++;
        clearTimeout(FB.timeOut);
        FB.timeOut = setTimeout(function(){FB.getattackinfo();}, 60*1000*rand(1, 2));
    } else {
        $('#xianshirenwu_status').html('意外终止!!!!!!!! battle_try：' + FB.battle_try + "<br />" + FB.uris[FB.battle_i]);
        FS.console.log('意外终止, 15 分钟后重启！');
        FB.stop();
        clearTimeout(FB.timeOut);
        FB.timeOut = setTimeout(function(){FB.start();}, 60*1000*15);// 15分钟后再来一次
        return;
    };
}

// 独立战斗 ----------------------------
FS.select_uses = [];
FS.battle_uses = [];
FS.battle = function(bturl, max_point, reset) {
    $('html').css('background-color', '#111110');
    $('html').empty();
    $('html').html('wait.......');
    if (!bturl) {bturl = 'http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fbattle%3Frnd%3D' + rand(111111111, 999999999);};
    max_point = max_point ? max_point : 25;
    reset = !!reset;
    if(reset){
        FS.select_uses = [];
    }
    var get_attack_person = function (){
        $.get(bturl, function(data){
            data = data.replace(/id=('|")loading\1/ig, 'style=\'display:none\'');
            $('html').empty();
            $('html').html(data);
            //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fbattle%2Fbattle_check%2F65726318%2F22%2F1%2F1%3Frnd%3D559850604
            var temp = data.match(/("|')[^"']+Fbahamut%2Fbattle%2Fbattle_check[^"']+\1/ig);
            var i = 0;
            var getattackinfo = function (uris){
            	if(uris[i]){
            		//http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fbattle%2Fbattle_check%2F1365675%2F22%2F6%2F7%3Frnd%3D282711356
            		var url = uris[i].replace(/['"]/ig, '');
            		i++;
            		console.log(i);
            		var temp = url.match(/2Fbattle_check%2F(\d+)/i);
            		var uid = 0;
            		if (temp && temp[1]) {
            		    uid = temp[1];
            		} else {
            		    return;//no uid
            		};
            		if (in_array(uid, FS.select_uses) || in_array(uid, FS.battle_uses)) {
                        //已经检查
                        getattackinfo(uris);
                        return;
            		} else  {
            		    
            		};
            		$.get(url, function(data){
                        data = data.replace(/id=('|")loading\1/ig, 'style=\'display:none\'');
                        data = data.replace(/type=('|")submit\1/ig, 'style="display:none" type="submit"');
                        $('html').empty()
                        $('html').html(data);
            			var temp = data.match(/防戦力:<\/span>\d+/ig);
            			var attackPoint = -1;
            			if (temp && temp[1])
            			{
            				temp = temp[1].match(/\d+/);
            				attackPoint = temp[0];
            			}
            			if (data.match(/に奪われていました/ig)) {
            			    console.log('奪われていました');
            			    attackPoint = 99999;
            			};
            			if(attackPoint > max_point){
            			    // 查找失败
            			    array_push(FS.select_uses, uid);// 添加排除
            			    // 屏蔽点击
            				$('form').each(function(){
            				    $(this).attr('target', '_playflashform');
            				    $(this).attr('disabled', 'disabled');
            				});
            				clearTimeout(FB.timeOut);
                            FB.timeOut = setTimeout(function(){getattackinfo(uris);}, 5000);// 5 秒法则
            				return;
        				} else if (attackPoint == -1) { // 出错了
        				    $('html').empty();
        				    $('html').text('waite......');
        				    clearTimeout(FB.timeOut);
                            FB.timeOut = setTimeout(function(){getattackinfo(uris);}, 60*1000);
        				    return;
            			} else {
            			    array_push(FS.battle_uses, uid);// 添加排除
            			    // 查找成功。
            			    $('form select[name=deck_id] option[value=0]').remove();
            			    $('form').each(function(){
            			        $(this).attr('target', '_playflashform');
            			        $(this).find('input:submit').css('display', '');
            			    });
            			    var accesskey_5 = $('#accesskey_5');
                            if (accesskey_5 && accesskey_5.val() == 'ﾊﾞﾄﾙ開始') {
                                accesskey_5.css('display', 'none');
                                var battleForm = accesskey_5.closest('form');
                                battleForm.attr('disabled', 'disabled');
                                accesskey_5.attr('disabled', 'disabled');
                            };
                            $('html').append('<div id="box_relative"><input type="button" onclick="FS.battle();" value="Battle R Start" /><br /><br />\
                                            battle url:<input type="text" value="'+ url +'" /><br /><br />\
                                            battle ids:<input type="text" value="'+ FS.battle_uses +'" /><br /><br />\
                                            </div>');
                            var box_relative = $('#box_relative');
                            box_relative.css('position', 'absolute');
                            box_relative.css('left', '30px');
                            box_relative.css('top', '20px');
            			}
            		});
            	} else {
            		clearTimeout(FB.timeOut);
                    FB.timeOut = setTimeout(function(){get_attack_person();}, 5000);// 5 秒法则
            	}
            }
            getattackinfo(temp);

        });
    }
    get_attack_person();
}
//----------------------end-------------------------//


//处理 boss o
if (window.name == '_playflashform') {
    // 15 秒后检查，等待页面完全加载完
    setTimeout(function(){
        if (location.href.match(/http:\/\/sp\.pf\.mbga\.jp\/12007160\/\?/ig)) {
            FS.console.log('点 flash 条件成立');
            if(document.getElementById('container')) {
                FS.console.log('container 存在哦');
                var cont = document.getElementById('container');
                cont.style.top = 0;
                //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fsmart_phone_flash%2Fconvert%2FeventsSsSsevent_008_raidSsSsappear_boss_swf%3Ftim%3D1339152589%26rnd%3D38989781
                var evtD = document.createEvent("MouseEvents");//340
                evtD.initMouseEvent("mousedown", true, true, window, 1, 200, 4500, 162, 178, false, false, false, false, 0, null);
                var evtU = document.createEvent("MouseEvents");//340
                evtU.initMouseEvent("mouseup",   true, true, window, 1, 200, 4500, 162, 178, false, false, false, false, 0, null);
                var evtO = document.createEvent("MouseEvents");//340
                evtO.initMouseEvent("mouseover", true, true, window, 1, 200, 4500, 162, 178, false, false, false, false, 0, null);
                var evtM = document.createEvent("MouseEvents");//340
                evtM.initMouseEvent("mousemove", true, true, window, 1, 200, 4500, 162, 178, false, false, false, false, 0, null);
                //设置2秒点击一次的点击事件
                setInterval(function() {
                    cont.style.top = 0;
                    cont.focus();
                    var pp = document.elementFromPoint(162, 178);
                    pp.focus();
                    pp.dispatchEvent(evtM);
                    pp.dispatchEvent(evtO);
                    pp.dispatchEvent(evtD);
                    pp.dispatchEvent(evtO);
                    pp.dispatchEvent(evtU);
                    // var overU = document.getElementById('container').dispatchEvent(evtU);
                    console.log(pp);
                    console.log('点 了');
                },
                1000 * 1);
            } else {
                FS.console.log('container 不存在，放弃');
                if (typeof($)  == 'function') {
                    $('form').each(function(){
                        var sub = $(this).find('input:submit');
                        var select = $('form select[name=deck_id]');
                        var temp = $('body').html().match(/攻戦力:<\/span>\S*?(\d+)/i);
                        if (temp && select && select.val() == 0 && sub.val() == '戦闘開始') {
                            //残り:1時間2分54秒
                            var tempMin = $('body').html().match(/残り\S*?(\d+)分/i);
                            var tempHour = $('body').html().match(/残り\S*?(\d+)時間/i);
                            var tempSen = $('body').html().match(/残り\S*?(\d+)秒/i);
                            //条件说明：当前攻战力大于 40，立即执行； 当前攻击力大于 20，判定时间：没有小时，5分钟就要完了的时候，或者没有分钟，只有秒钟的时候，立即执行！
                            if (temp
                                 && temp[1]
                                 && ( temp[1] >= 50
                                      || ( (!tempHour || parseInt(tempHour[1]) < 1)
                                             && temp[1] >= 30
                                             && ( (tempMin && parseInt(tempMin[1]) <= 5) || (!tempMin && tempSen && parseInt(tempSen[1]) > 1) ) ) )
                                 && select.val() == 0) {
                                $(this).attr('target', '_playflashform');
                                $(this).submit();
                            } else if(select.val() == 0) {
                                $('a').each(function(){
                                    if($(this).text() == '→さらに戦友を呼ぶ'){
                                        $.get($(this).attr('href'));
                                        console.log('→さらに戦友を呼ぶ');
                                    }
                                });
                            };
                            //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fevents%2Fevent_008_raid%2Fdo_call%2F4008758%2F1%3Frnd%3D470494775
                            //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fevents%2Fevent_008_raid%2Fdo_call%2F4008758%2F0%3Frnd%3D582219363
                        } else if (temp && select && sub.val() == '選択' && select.val() != 0 && $('body').html().match(/戦闘開始/i)) {
                            select.val(0);
                            $(this).attr('target', '_playflashform');
                            $(this).submit();
                        } else if (temp && select && select.val() == 0) {
                            $('a').each(function(){
                                if($(this).text() == '→さらに戦友を呼ぶ'){
                                    $.get($(this).attr('href'));
                                    console.log('→さらに戦友を呼ぶ');
                                }
                            });
                        };
                    });
                };
            }
        } else {
            //无视
        };
    }, 1000 * 7);
} else if (location.href.match(/http:\/\/sp\.pf\.mbga\.jp\/12007160\/\?.+?2Fmypage/ig)) {
    //http://sp.pf.mbga.jp/12007160/?guid=ON&url=http%3A%2F%2F203.131.198.133%2Fbahamut%2Fmypage%3Frnd%3D702843655
    setTimeout(function(){
        if (!$ && unsafeWindow.$) {$ = unsafeWindow.$;};
        if (!$) {return;};
        $('body').append('<div id="box_relative"><input type="button" onclick="FS.startAll();" value="RenWu  Start" /><br /><br /><input type="button" onclick="FS.battle();" value="Battle  Start" /></div>');
        box_relative = $('#box_relative');
        box_relative.css('position', 'absolute');
        box_relative.css('left', '30px');
        box_relative.css('top', '20px');
    }, 1000 * 15);
};

//other
function str_replace (search, replace, subject, count) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}
