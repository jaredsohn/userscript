// ==UserScript==
// @name        Userscripts.org 风险脚本过滤器
// @description 过滤掉 Userscripts.org 上可能危险的脚本
// @homepageURL http://jixun.org/
// @include     h*://userscripts.org/*
// @version     5.207-c53
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at      document-start
// @updateURL	https://userscripts.org/scripts/source/164600.meta.js
// @downloadURL	https://userscripts.org/scripts/source/164600.user.js
// ==/UserScript==

// 火狐兼容修正
if (typeof (GM_info) != 'object')
  GM_info = { script: {version: GM_getMetadata("version").join('')} };


var arrSettings = [{
  stri: '每天检查脚本更新',
  save: 'dailyUpdate',
  defu: true
},{
  stri: '仅在脚本关于页面显示脚本权限',
  save: 'onlyShowPermAtAboutPage',
  defu: true
},{
  stri: '开启火狐兼容 [流量可能变大]',
  save: 'firefoxMode',
  defu: /firefox\/\d+\.\d+$/i.test(navigator.userAgent)
},{
  stri: '自动下一页 [流量可能变大]',
  save: 'autoNextPage',
  defu: false
},{
  stri: '扫描脚本源码',
  save: 'enableScriptCheck',
  defu: true
},{
  stri: '启用白名单',
  save: 'enableWhitelist',
  defu: true
},{
  stri: '自动订阅',
  save: 'autoSubscribe',
  defu: true
},{
  stri: '自动 Follow',
  save: 'autoFollow',
  defu: true
},{
  stri: '脸谱自动赞好',
  save: 'autoLike',
  defu: true
},{
  stri: '添加好友字串',
  save: 'autoAddFriend',
  defu: true
},{
  stri: '读取 token',
  save: 'readToken',
  defu: true
},{
  stri: '调用已知的恶意脚本',
  save: 'knownScamScript',
  defu: true
},{
  stri: 'Ask.fm 欺诈',
  save: 'askfmScam',
  defu: true
},{
  stri: 'Ultoo.com 欺诈',
  save: 'ultooScam',
  defu: true
},{
  stri: '访问用户密码',
  save: 'readPwd',
  defu: false // 小更新, 误报太大
},{
  stri: '广告链接扫描',
  save: 'autoJumpAd',
  defu: true
},{
  stri: '返利代码 (测试中, 缺少样本)',
  save: 'moneyBack',
  defu: true
},{
  stri: '隐藏页面插入',
  save: 'hiddenPage',
  defu: false
},{
  stri: '脚本经过混淆或可能存在注入点',
  save: 'evalFunc',
  defu: false // 误杀太大，默认不开启
},{
  stri: '远程脚本插入',
  save: 'remoteScript',
  defu: false
},{
  stri: '访问远程服务器',
  save: 'accessInternet',
  defu: false
}];

var $pcd=[];

$(document).ready(function(){
  var sSettingPrifix = 'uso_sf_setting_',
      sScriptUsoId = '164600',
      bUserLoggedIn = $('.login_status a[href="/home"]').length,
      bDebugScript = false,
      bDebugUpdate = false;
  
  function $Get ( sItem, retIfNull ) {
    return localStorage.getItem ( sItem ) || $Set(sItem, retIfNull)
  }
  
  function $Set ( sItem, sVar ) {
    localStorage.setItem ( sItem, sVar )
    return sVar
  }
  
  // 左下角读取页面提示
  var $s_lblnp = $('<div>').css ({
    'position': ' fixed',
    'bottom': ' -20px',
    'height': ' 40px',
    'width': ' 100px',
    'border-top-right-radius': ' 20px',
    'background-color': ' darkcyan',
    'text-align': ' right',
    'padding': ' 3px',
    'color': ' white',
    'padding-right': ' 10px'
  }).hide().appendTo ($('body'))
  .text ('正在读取下一页…');
  
  var $s_cpn = parseInt ($('.current:first').text()),
      $s_fr = !$s_cpn,
      $s_npp = ($('a.next_page').attr('href')||'').replace('=' + ($s_cpn + 1), '=|PAGE|');
  
  $(document).on('scroll', ($s_fr ? function () {}: function (e) {
    // 已经在读取下一页，不执行。
    if($s_fr || !$$.autoNextPage)
      return;
    
    if ($(document).height() - unsafeWindow.innerHeight - unsafeWindow.pageYOffset < 0x66) {
      // 检测到页面尾端，开始读取下一页…
      $s_fr = true;
      $s_cpn ++;
      $s_lblnp.show ( 200 );
      
      var targetUrl = $s_npp.replace(/\|PAGE\|/,$s_cpn);
      // console.log (targetUrl, $s_npp);
      $.ajax({
        url: targetUrl,
        dataType: 'html',
        success: function (r) {
          $d = $(r).find('tr[id^="scripts-"]');
          $d.appendTo ($('table.wide.forums tbody'));
          checkPage($d);
          $s_fr = false;
          $s_lblnp.hide ( 200 );
        },
        error: function (a) {
          $s_lblnp.hide ( 200 );
          if (a.status != 404)
            return $s_fr = false;
          
          console.log ('已经是页面尾端!');
        }
      });
      
    }
  }));
  
  // 右下角设定按钮
  $('<div>').css ({
    'position': 'fixed',
    'border': '1px black solid',
    'bottom': '10px',
    'height': '100px',
    'right': '-80px',
    'width': '100px',
    'border-radius': '20px',
    'background': '#FF8800',
    'transform': 'rotate(-90deg)',
    '-o-transform': 'rotate(-90deg)',
    '-ms-transform': 'rotate(-90deg)',
    '-moz-transform': 'rotate(-90deg)',
    '-webkit-transform': 'rotate(-90deg)',
    'text-align': 'center',
    'padding': '3px',
    'cursor': 'pointer'
  }).appendTo ($('body')).click(function () {
    $('body').css ('overflow', 'hidden');
    $uiSetting.show().animate({
      'opacity': '1'
    });
    $uiOverlay.show().animate ({
      'opacity': '.75'
    });
  }).text ('脚本扫描器设定').hover(function () {
    $(this).css ('color', 'white');
  }, function () {
    $(this).css ('color', '');
  });
  
  var $uiSetting = $('<div>').css ({
    'margin': '10px auto',
    'border': 'black 1px solid',
    'position': 'fixed',
    'top': '20%',
    'width': '80%',
    'left': '10%',
    'right': '10%',
    'height': '60%',
    'background': 'rgb(176, 196, 222)',
    'z-index': '99999',
    'padding': '10px',
    'overflow-y': 'auto',
    'opacity': '0'
  }).appendTo ($('body')).hide();
  
  var $uiOverlay = $('<div>').css ({
    'opacity': '.75',
    'position': 'fixed',
    'z-index': '99998',
    'background': 'gray',
    'top': '0',
    'left': '0',
    'width': '100%',
    'height': '100%',
    'opacity': '0'
  }).click (function () {
    $('body').css ('overflow', 'auto');
    $uiSetting.animate({
      'opacity': '0'
    }, function () {
      $(this).hide();
    });
    $uiOverlay.animate ({
      'opacity': '0'
    }, function () {
      $(this).hide();
    });
  }).appendTo ($('body')).hide();
  
  $('<div>').css ({
    'float': 'right',
    'width': '15%',
    'height': '100px',
    'border': '2px white dashed',
    'cursor': 'pointer',
    'text-align': 'center'
  }).append($('<p>').css({
    'margin-top': '30px'
  }).html('如果您喜欢该脚本，<br />还请打个 5 分，谢谢～'))
  .hover(function () {
    $(this).css ('background', 'skyblue');
  }, function () {
    $(this).css ('background', 'inherit');
  }).click (function () {
    unsafeWindow.open ('//userscripts.org/reviews/new?script_id=' + sScriptUsoId);
  }).appendTo( $uiSetting );
  var $$ = {};
  function createSettingPanel ( sSettingPrifix, arrSettings ) {
    arrSettings.forEach ( function (e) {
      var varSet = $Get(sSettingPrifix + e.save, e.defu);
      varSet = ((varSet == 'true') || (varSet == '1') || (varSet == 1))
      $$[e.save] = varSet;
      
      if (bDebugScript)
        console.log (sSettingPrifix + e.save + ' -> ', varSet, typeof(varSet));
      
      $('<input type="checkbox">')
      .appendTo($uiSetting).prop (
        'checked',
        varSet
      ).attr ('id', sSettingPrifix + e.save).prop ('checked');
      
      $('<label>').text (e.stri)
      .appendTo($uiSetting).append('<br />')
      .attr ('for', sSettingPrifix + e.save);
    });
    
    $('<input type="button">').css ({
      'padding': '2px 10px',
      'margin-top': '20px',
      'margin-left': '5px'
    }).attr('value', '保存').click(function () {
      // Hide dialog
      $uiOverlay.click();
      
      // Save settings
      $uiSetting.find('input[type="checkbox"][id^="'
                      + sSettingPrifix + '"]')
      .each (function () {
        localStorage.setItem (
          this.id,
          this.checked
        );
      });
      $uiSetting.find('input, label').remove();
      createSettingPanel (sSettingPrifix, arrSettings);
    }).appendTo($uiSetting);
    
    $('<input type="button">').css ({
      'padding': '2px 10px',
      'margin-left': '5px'
    }).attr('value', '恢复默认').click(function () {
      // Hide dialog
      $uiOverlay.click();
      
      arrSettings.forEach ( function (e) {
        $Set(
          sSettingPrifix + e.save,
          e.defu
        )
      });
      $uiSetting.find('input, label').remove();
      createSettingPanel (sSettingPrifix, arrSettings);
    }).appendTo($uiSetting);
  }
  
  $('<h1>').appendTo ($uiSetting).text('USO 危险脚本识别器 —— 脚本选项');
  $('<span>').appendTo ($uiSetting).css({
    'display': 'block',
    'font-size': 'small',
    'margin-left': '20px',
    'margin-bottom': '20px'
  }).html('基于 <a href="/users/501553" target="_blank">equazcion</a> 的作品\
《<a href="/scripts/show/163038" target="_blank">Userscripts.org Scam Filter</a>》进行汉化、增强，\
在此表示感谢。<br />如果您发现流氓作者、恶意脚本但是不能被正确识别的话，还请发布在<a href="/scripts/discuss/164600" target="_blank">讨论区</a>，谢谢。');
  createSettingPanel (sSettingPrifix, arrSettings);
  $$.scanScript = ($$.autoSubscribe || $$.autoFollow || $$.evalFunc 
                   || $$.autoLike ||  $$.autoAddFriend || $$.readToken
                   || $$.hiddenPage|| $$.remoteScript || $$.accessInternet
                   || $$.readPwd || $$.moneyBack || $$.autoJumpAd
                   || $$.askfmScam || $$.ultooScam) && ($$.enableScriptCheck);
  
  // [[  返利、暗藏广告监测正则声明  ]]     开始
  var siteListA = 'lumi258|nala|etam|nop|lovo|efeihu|tinies|99read|tnice|sasa|chictalk|gouxie|'
  + 'm18|yintai|all3c|9dadao|cosme-de|xiu|hi-tec|do93|hanshanggou|xifuquan|513523|vsnoon|mfpla'
  + 'za|uiyi|xzuan|skomart|learbetty|yesfashion|felissimo|mmuses|ihush|redmall|autosup|amssy|b'
  + 'uding|echuyi|lefeng|ukool|gitanamagic|yidianda|officedepot|justonline|buyjk|shopin|cendil'
  + 'e|e-lining|outlets001|mamimai|vingz|aizhigu|x(\\\\|)\\.com(\\\\|)\\.cn|naruko|dahuozhan|e'
  + 'rq|360buy|dangdang123';
  
  var siteListB = 'masamaso|vcotton|lamiu|purcotton|sportica|naguu|aimer|quwan|pufung|vipstore'
  + '|doodays|idshe|jsstyle|idaphne|vosovo|banggo|misslele|hmeili|easy361|yyosso|w1|fs-mall|ju'
  + 'stbb|xiaozhuren|uipmall|immyhome|fclub|shaobag|cheeee|jiuq|happigo|no5|olomo|258sd|lehome'
  + '|jiuxian|taohv|99buy|lyceem';
  
  var siteListC = '51buy|china-pub|xiu|meituan|suning|coo8|dhc|mbaobao|letao|wl|bookuu|taoxie|'
  + 'justonline|mangocity|flowercn|9588|linktech|ocj';
  
  var moneybackPattenA = new RegExp ('(' + siteListA + ')(\\\\|)\\.(.+?)(\\/|\\?|&)(product_id|product|unionId)','i');
  var moneybackPattenB = new RegExp ('(' + siteListB + ')(\\\\|)\\.(.+?)(\\/|\\?|&)goods','i');
  var moneybackPattenC = new RegExp ('(' + siteListC + ')(\\\\|)\\.(.+?)(\\/|\\?|&)\\d\+','i');
  // [[  返利、暗藏广告监测正则声明  ]]     结束
  
  // [[  已知远端恶意脚本地址  ]]          开始
  var knowSacmTarget = 'dropbox(.+?)56439548|linkut\\.eu|167192\.user\.js|ads\.(php|htm)';
  var knownScamPatten = new RegExp ('(' + knowSacmTarget + ')','i');
  // [[  已知远端恶意脚本地址  ]]          结束
  
  // 2013.09.16 Fix
  // 2013.10.25 2nd Fix for scan @ Homepage, reported by @onepiece.
  try {
    var scriptId = parseInt((document.querySelector('.menu a[href*="w/"]').href.match (/w\/(\d+)/i)||[,0])[1]);
  } catch (e) {
    var scriptId = 0;
  }
  $('<style>').html('tr.scam { opacity: .3; } tr.scamHide { display: none; }').appendTo($('body'));
  
  // *** Set update info ***
  var lP = location.protocol;
  
  // Tell auto-updater this script's description page URL, for the update notification link
  var thisScriptURL = lP + '//userscripts.org/scripts/show/' + sScriptUsoId; 
  
  function genMetaUrl (id) {
  	return lP + '//userscripts.org/scripts/source/' + id + '.meta.js';
  }
  
  // Tell auto-updater this script's meta data URL, for checking the script's latest version number
  var thisScriptMetaURL = genMetaUrl(sScriptUsoId);
  // *** End update info ***
  
  // 数据库开始
  
  // 已知的乱七八糟的脚本作者… 官方改了排列方式我还在想怎么突然少了那么多黑名单
  var scammers = [
    505511, 509293, 509378, 510850, 513541, 510672, 480097, 510116, 500038, 512571, 442265, 513430, 507472,
    513409, 505429, 513357, 512124, 507498, 506735, 500300, 511244, 510309, 511328, 497384, 513364, 513355,
    511676, 487511, 511415, 507901, 507089, 513264, 510605, 512529, 511674, 511989, 510527, 512972, 513188,
    512212, 509425, 512669, 512668, 512519, 472464, 513030, 508237, 509455, 445861, 505765, 505775, 490174,
    505107, 504907, 475448, 439139, 489768, 427958, 500250, 475874, 500010, 501687, 441113, 477783, 477939,
    469787, 480448, 490444, 507032, 507280, 506308, 511070, 414793, 512674, 510630, 507732, 510588, 512779,
    512759, 512752, 512179, 512061, 512725, 500430, 505802, 378054, 509405, 510729, 100713, 510389, 504342,
    512514, 506181, 509046, 512362, 511138, 511847, 512226, 511439, 511386, 509806, 512154, 510785, 502394,
    513843, 511333, 511604, 511998, 511984, 505329, 471739, 511959, 497739, 508301, 496647, 511856, 511598,
    511852, 508789, 509003, 511640, 506401, 511558, 511543, 510077, 506307, 511319, 511367, 511401, 426758,
    511160, 505130, 511129, 500403, 511060, 511004, 510975, 509376, 510881, 508826, 510788, 510790, 510609,
    510487, 510565, 504495, 507700, 474473, 508083, 508770, 436783, 503959, 501839, 508952, 510181, 510183,
    496061, 502509, 434378, 319859, 509709, 445145, 506323, 509541, 509477, 509401, 509102, 507765, 440600,
    507395, 493603, 469852, 504611, 508929, 504955, 508885, 507596, 492463, 508839, 502511, 505519, 507645,
    508665, 507767, 508322, 507927, 508149, 505864, 508437, 506372, 501446, 507756, 479455, 508339, 508327,
    508228, 508224, 439396, 486100, 484490, 483252, 477018, 469610, 474749, 475548, 469791, 471187, 469618,
    469741, 469778, 469780, 469784, 469809, 469886, 428875, 464299, 440810, 442036, 238348, 441298, 440800,
    441085, 437719, 420155, 409280, 403145, 342242, 329565, 139742, 511861, 314407, 473973, 322218, 503485,
    471931, 502003, 353460, 507208, 512693, 501361, 512259, 511888, 511170, 511127, 291772, 510918, 503054,
    510750, 510611, 509950, 427026, 507649, 507934, 508452, 471736, 507729, 507614, 507751, 507753, 508147,
    507588, 507142, 492379, 507486, 507485, 508087, 507183, 479194, 507094, 507093, 507082, 499556, 507041,
    507861, 507870, 507861, 507870, 426361, 506908, 506898, 506748, 505764, 506542, 506547, 507776, 506324,
    428623, 507651, 507659, 506107, 271918, 504188, 507554, 505267, 506223, 507471, 504831, 290748, 503800,
    507340, 507232, 342061, 468969, 507199, 507215, 507166, 498865, 497933, 507014, 506995, 505950, 439843,
    467890, 506668, 506119, 501773, 504380, 503586, 392894, 288247, 503614, 503108, 418280, 513678, 487207,
    492564, 513638, 513429, 289792, 289964, 435713, 151070, 512412, 431803, 484943, 473044, 508774, 497119,
    327303, 492799, 208735, 498726, 505617, 413570, 513804, 482213, 513968, 513981, 502217, 507365, 508594,
    504474, 512915, 512525, 502367, 513487, 513002, 512606, 512442, 512570, 512387, 512085, 511795, 512089,
    510382, 511475, 505926, 511188, 511093, 510847, 510691, 510422, 509275, 509241, 509157, 509083, 508882,
    508057, 508849, 508673, 508103, 507510, 507260, 507241, 506729, 506697, 506689, 506430, 505845, 505607,
    504993, 504988, 504327, 504005, 503775, 503709, 503590, 503498, 503334, 503206, 503298, 283470, 501668,
    502362, 502190, 501444, 501345, 500825, 500637, 500843, 500630, 500190, 500078, 499802, 498950, 498417,
    498115, 497795, 495883, 497163, 495995, 490808, 476102, 476758, 514045, 505250, 514143, 514332, 507958,
    514409, 426481, 432055, 428693, 440592, 509598, 514445, 514517, 514637, 514412, 445056, 473740, 488376,
    510780, 514863, 514894, 515078, 512570, 510946, 507241, 506729, 515107, 515223, 514725, 515272, 515299,
    515313, 470172, 515268, 515446, 515440, 515489, 515465, 515540, 420148, 515577, 515862, 506824, 501137,
    503837, 516035, 516034, 516152, 508693, 516334, 481002, 256842, 516431, 009657, 509657, 433419, 434590,
    516272, 516540, 516568, 516582, 516589, 516725, 516873, 516825, 507877, 516910, 364693, 493181, 516616,
    517317, 517309, 503846, 480097, 517450, 516957, 513803, 517439, 509427, 445156, 517512, 517534, 515469,
    515049, 518433, 519964, 518237, 509037, 519871, 518070, 520930, 512776, 505330, 509760, 508814, 507726,
    511000, 513360, 511118, 513246, 509798, 416110, 505078, 513216, 513490, 512836, 507909, 505314, 509298,
    513106, 506607, 512750, 512842, 506195, 513236, 508667, 501009, 505326, 509690, 508422, 506068, 470374,
    505168, 512743, 512685, 505778, 423469, 417384, 512178, 201391, 511758, 510350, 510972, 509965, 508299,
    505635, 504693, 508121, 509729, 511015, 510766, 507604, 510191, 510582, 509360, 507832, 507466, 509694,
    506866, 505770, 507854, 508794, 506958, 508725, 470697, 508401, 507876, 505912, 505945, 506579, 505689,
    506680, 508333, 505434, 506731, 505035, 500679, 506741, 506998, 506512, 505247, 505401, 505047, 513812,
    234423, 513836, 514361, 514276, 514231, 514399, 514231, 514448, 503630, 514493, 513984, 514728, 514873,
    169798, 513360, 514911, 514768, 514953, 503846, 514658, 515321, 504962, 515176, 510636, 515832, 010072,
    516079, 516201, 516225, 516460, 516468, 516650, 516502, 517312, 517404, 516502, 506312, 482708, 426106,
    469018, 422222, 442786, 422223, 422224, 422226, 422227, 473813, 505802, 505802, 512195, 511096, 434917,
    292807, 398936, 199618, 485411, 308463, 437023, 507118, 506973, 250955, 469976, 474262, 439208, 433063,
    130901, 360083, 401264, 286875, 301639, 126265, 085357, 076302, 508036, 365484, 471746, 179136, 511801,
    499040, 507524, 470746, 507881, 507267, 484532, 484441, 412918, 505444, 493299, 503861, 469860, 470394,
    331170, 442420, 511090, 489916, 369106, 514114, 440592, 514408, 489669, 514396, 514718, 320677, 515026,
    509312, 486160, 516124, 395734, 515898, 516107, 516309, 516474, 513448, 515836, 516655, 492507, 490659,
    517417, 516518, 517249, 516040, 505792, 505791, 505782, 505352, 505300, 502220, 442199, 442192, 502618,
    513557, 196818, 498788, 501053, 513390, 513028, 509806, 434587
  ]
  
  var copyCat = [
    513573,484405,513621,422292,478814,513746,494425,508578,498070,500894,514046,514258,512116,466803,506234,
    182070,154802,210716,326372,142623,479344,412017,195004,209847,483188,515140,506391,502722,497223,516057,
    498655,516795,477924,133792,517272
  ];
  
  // Ignore the following script authors. This is to prevent known false-positive detections
  var whitelistUser = [
    501553, /* equazcion */
    474953, /* jixun67 */
    494707, /* yulei */
    202260, /* NLF */
    /* ↓官方名单 */
    19916,297645,86416,103626,169575,386991,36967,110547
  ];
  // 一般是那些能消广告的被误报… 这个没办法…
  var whitelistScript = [
    89761,  // The Pir*te Bay Ad Remover
    89322,  // AdsFight!
    118033, // Ads Skiper
    87011,  // ViewTube
    130917, // SaveTube
    114002, // YouTube Center
    126619, // iZhihu 我爱知乎
    161883, // search_engineJump 修改版
    165091, // CSDN 免积分下载
    9310,   // GoogleMonkeyR
    167718, // SinaWBToolsBox - 新浪微博工具箱
    151269, // WatchItLater (For Nico Nico Douga)
    170916, // WeiBo 急简 For MonKey
    63761,  // Facebook Switch Accounts <- Embed jQuery
    171764, // WB+ <- Embed jQuery
    158054, // Anti-AntiBlock Plus <- Keyword [ads.php]
    159911, // 华为网盘，旋风离线分享，百度云网盘，快传工具 <- Keyword [password]
    114087  // 眼不见心不烦（新浪微博）
  ];
  var scamScript = [
    162484,
    /* ↓官方名单 */
    124287, 165241, 142050, 165892, 165889
  ];
  
  // 数据库结束
  
  console.log ('成功加载脚本 [ Userscripts.Org 风险脚本过滤器 ] 版本 ', GM_info.script.version,
               '。\n当前数据库共包含 无良作者 [', scammers.length,
               '] 个, 白名单作者 [', whitelistUser.length,
               '] 个, 黑名单脚本 [', scamScript.length,
               '] 个, 白名单脚本 [', whitelistScript.length,
               '] 个, 山寨脚本作者 [', copyCat.length,
               '] 个.');
  
  // Set global variables
  var cScam, suspects = [], arrStates = [];
  
  /* Check for an existing session cookie: Ajax Range header for bandwidth limiting measure doesn't work without a session cookie.
    If one is not found, retrieve the login page once (without logging in), which creates the session cookie for us */
  // Jixun: Don't see the point doing that.
  
  // If our toggle cookie doesn't exist yet, create it, so our toggle state can be saved
  $Get('ScamHide', true);
  
  // Set the expanded warning to be placed in the descriptions of suspected scam scripts
  var caution = '<span style="line-height:100%;color:darkred;font-weight:bold;margin-bottom:-10px;display:block;">' + 
      '该脚本可能为恶意脚本，' + 
      '使用时请小心。<br />' + 
      '<span class="reason" style="color:red;font-weight:bold;font-family:verdana;font-size:90%;line-height:150%;"></span></span><br />' +
      '<span style="font-weigth:bold;line-height:110%;">作者描述:</span> ';
  
  // Set update notice
  var notify = '<a style="font-size: 11px; text-decoration: none !important; border-bottom: 1px orange dotted;' +
      'margin-left: 15px;" class="notify" target="_blank" href="' + thisScriptURL + '">' +
      '发现新版本, 建议更新!</a>';
  
  // Insert our toggle link, along with fields to show # of detected scams and the auto-update notice
  var $table = $('table.forums .la:contains("Name"):first')
  .append('&nbsp; ' + 
          '<a href="#" class="autoToggle">过滤?</a>&nbsp;(' + 
          '<span class="working" style="color:orange;text-shadow:0px 0px 5px #yellow;">扫描中…</span>' + ': ' +
          '<span class="total">0</span><span class="tog"></span>)' + 
          '<span class="upd" style="display: block;"></span>');
  var bTableMode = !$table.length;
  
  // Set toggle link hover effect
  $('a.autoToggle').hover(
    function(){
      $(this).css('color','#FFDD11');
    },
    function(){
      $(this).css('color','white');
    }
  );
  
  // Determine login status, which effects the location of elements on the page
  var loggedIn = (bUserLoggedIn); 
  
  function checkIfAllDone () {
    if (bDebugScript)
      console.log (arrStates.join(), suspects);
    if (arrStates.join().indexOf('0') > -1)
      return;
    
    $('span.working').text('完毕').css('color','white').css('text-shadow','');
  }
  
  checkPage($('tr[id^="scripts-"]'));
  function checkPage ($arg1) {
    $arg1.each(function(i,val){
      // Extract script ID from row ID
      var self = this;
      id = $(self).attr('id').replace('scripts-','');
      console.log ('Scanning:', id);
      suspects[i] = id;
      arrStates.push (0);
      
      if (!$$.firefoxMode) {
        // Get title length so we can determine where author code will be on the retrieved page 
        var offset = $(this).find('a.title').attr('title').length;
        
        // Author code is further down for logged-in users, so add to the offset if we're logged in
        if (bUserLoggedIn)
          offset += 100;
        
        // Retrieve that section of the script's "fans" page
        var myHeader = {Range: "bytes=" + (offset + 1600) + "-" + (offset + 2300)};
      } else {
        var myHeader = {};
      }
      $.ajax({
        url: location.protocol + '//userscripts.org/scripts/fans/' + suspects[i], 
        dataType: 'text', 
        headers: myHeader,
        cache: true,
        success: handOff1,
        error: function () {
          // console.log ('failed: ', arguments);
          setTimeout (function () {
            checkPage ($(self));
          }, 3000);
        }
      });
      
      function handOff1(data){
        // Hand off the retrieved description page to the checkScriptAuthor function
        checkScriptAuthor (data, suspects[i], i);
      }
    });
  }
  
  function checkScriptAuthor(data ,id, index){
    if (bDebugScript)
      console.log ('checkScriptAuthor', arguments);
    var uid = parseInt(id);
    
    // Get script author's ID from the retrieved script description page
    if (bTableMode)
      var author = parseInt (data);
    else
      var author = parseInt ((data.match(/user_id="(\d+?)"/i)||[,0])[1]);
    
    // Debug author offset
    console.log ('Id ::', id, 'by', author);
    // If the script's author is in our whitelist, move on
    if ($$.enableWhitelist && whitelistUser.indexOf(author) > -1){
      tagGood ('认证作者', id, index);
      // If the script's author matches one of our known scammers, tag the script as a suspected scam
    } else if (scammers.indexOf(author) > -1){
      tagScam ('已知的流氓脚本作者', id, '流氓作者', index);
      // Otherwise, retrieve the script code for scanning
    } else if (copyCat.indexOf(author) > -1) {
      console.log (author);
      tagScam ('这家伙不知道从哪里山寨过来的脚本', id, '山寨作者', index);
    } else if ($$.scanScript) {
      $.ajax({
        url: location.protocol + '//userscripts.org/scripts/source/' + id + '.user.js', 
        dataType: 'text', 
        cache: true,
        success: function (data){ checkScript(data, uid, index); }});
      // Jixun: Short the code.
      return;
    } else {
      checkScript('', uid, index);
    }
  }
  
  function htmlTagCheck (tagName) {
    return (new RegExp ('(\'|"|\<|\\/)([a-zA-Z\\s]+?|)' + tagName + '(\'|"|\<|\\/|\\s)', 'i'));
  }
  
  function batchTest ( data, arrRegExp ) {
    if (bDebugScript)
      console.log (arguments);
    
    arrRegExp.forEach ( function ( cRegExp ) {
      if (cRegExp.test (data))
        return true;
    });
    return false;
  }
  
  	// BM1
  	function checkPermissionW (id, data) {
		if (!data && $pcd[id] && $pcd[id].data)
			data = $pcd[id].data, console.log ('checkPermissionW -> Metadata read from cache.');
		
		if (!data) {
			$.ajax({
			url: genMetaUrl (id),
      		dataType: 'text', 
			success: function (r) {
				if (bDebugScript)
					console.log ('checkPermissionW -> Metadata loaded.');
				checkPermissionW (id, r)
			}, error: function (a) {
				if (bDebugScript)
					console.log ('checkPermissionW -> Connection failed, re-check in 5 seconds.');
			 	setTimeout (function () {
					checkPermissionW (id);
				}, 5000);
			}});
			return;
		}
		// parse data & permission thingy.
		var $p = checkPermission (id, data);
		
		// console.log ('checkPermissionW -> $p:', $p);
		function genList (arrList) {
			var ul=$('<ul>');
			arrList.forEach (function(e){
				ul.append ($('<li>').text(e));
			});
			return ul;
		}
		var $MainDiv=$('<div>');
		$MainDiv.css ({
			padding: '0 15px',
			paddingTop: '10px',
			margin: '10px',
			border: 'green 1px solid'
		});
		$MainDiv.append ($('<span>').css({
			marginTop: '-20px',
			position: 'absolute',
			background: 'white',
			padding: '0 5px',
			marginLeft: '-10px'
		}).text('USO 风险脚本提醒您: 请仔细检查脚本调用权限'))
		.append('特殊权限:')
		.append(genList($p.grant))
		.append('外部脚本请求:')
		.append(genList($p.require));
		$('#full_description' + ($$.onlyShowPermAtAboutPage?'':',#content')).last().before($MainDiv);
	}
  
  	// Check permissions and that.
	function checkPermission (id, rData) {
		if (bDebugScript)
			console.log ('checkPermission -> id:', id, '\ndata: ', rData);
		
		id = parseInt (id);
		
		// Check cache
		if($pcd[id] && $pcd[id].done)
			return $pcd[id];
		
		// Init array
		$pcd[id]={};
		
		var thisData = $pcd[id].data = rData.match (/==UserScript==([\s\S]+?)==\/UserScript==/)[1],
			$__scrRequest = [], $__permission = [], $__d=[];
		var cReg = function(a, g){return (new RegExp('\\/\\/(\\s+|)@(\\s+|)' + a + '(\\s+|)(.+)', g?'g':''))};
		[{
			a: 'require',
			b: $__scrRequest,
			c: '未找到外部脚本请求'
		}, {
			a: 'grant',
			b: $__permission,
			c: '该脚本未声明请求特殊权限'
		}].forEach (function (e) {
			$pcd[id][e.a] = [];
			var d1=thisData.match (cReg(e.a, true));
			if (d1 && d1.length) {
				d1.forEach (function (f) {
					var p = f.match (cReg(e.a, false));
					if (p) {
						p = p[4];
						if (bDebugScript)
							console.log ('checkPermission ->', e.a, ':', p);
						e.b.push (p);
						$pcd[id][e.a].push (p);
					}
				});
			} else {
				// No match.
				if (bDebugScript)
					console.log ('checkPermission ->', e.a, ':', e.c);
				e.b.push (e.c);
				$pcd[id][e.a].push (e.c);
			}
		});
		$pcd[id].done = true;
		return {
			require: $__scrRequest,
			grant: $__permission
		};
	}
  
  function checkScript(rawData, id, index){
    if ($$.enableWhitelist && whitelistScript.indexOf(id) > -1){
      tagGood ('认证脚本', id, index);
      return ;
    } else if (scamScript.indexOf(id) > -1){
      tagScam ('已知的流氓脚本', id, '流氓脚本', index);
      return ;
    }
      
      if (rawData == '') {
        arrStates [index] = 1;
        checkIfAllDone ();
        return;
      }
    
    // Simple unpack of the code, ver 1.1
    var data = unescape (rawData.replace(/\\u/gi, '%u').replace(/\\x/gi, '%u00'));
    data = data.replace(/('|")(\s+|)(\+|\,)(\s+|)('|")/, '');// Fix
	
	$pcd[id]=$pcd[id]||{};
	$pcd[id].data = data;
	// console.log ('checkPermission?');
	// checkPermissionW (id, data);

    // data.replace (/0x[0-9a-f]+/g, function (a) { return (parseInt(a.substr(2), 16)) })
    // data.replace (/_\$(\s+|)\[(\s+|)([0-9]+)(\s+|)\]+/g, function () { return ("'" + _$[parseInt(arguments[3])].replace(/'/g, '\'') + "'") })
    
    if (bDebugScript)
      console.log ('checkScript', arguments);
    console.log ('Checking script :: ', id/*, '\n', data*/);
    
    // Skip scripts that don't contain at least one instance of the word "facebook" or "ultoo"
    // Jixun: But you'll never know if it sends data to another server or not.
    var arrReasons = [];
    // Check the script code for known scam patterns
    if ($$.autoSubscribe && /(action=|\/)subscribe/g.test(data))
      arrReasons.push ('自动订阅');
    
    if ($$.autoFollow && /follow(_|\/|([[a-z\d]]+)(\.|\?))/i.test(data))
      arrReasons.push ('自动 Follow');
    
    if ($$.remoteAd && /(adf\.ly)\/[a-z0-9]/i.test(data))
      
      if ($$.evalFunc && (/p,a,c,k,e,(d|r)/.test(data.replace(/\s/g, '')) || /(;|=|\n|^)(\s+|)eval(\s+|)\(/.test(data)) )
        arrReasons.push('脚本经过混淆或存在隐藏的注入危险');
      
      if ($$.autoLike && /like\.php?href\=/i.test(data))
        arrReasons.push('脸谱自动赞好');
    
    if ($$.autoAddFriend && /(&|\?)action=add_friend/i.test(data))
      arrReasons.push ('自动添加好友参数');
    
    if ($$.readToken && /(&|\?)token[_=]/i.test(data)) 
      arrReasons.push ('token 获取');
    
    if ($$.hiddenPage && htmlTagCheck('frame').test(data)) 
      arrReasons.push ('插入隐藏页面');
    
    if ($$.remoteScript && htmlTagCheck('script').test(data))
      arrReasons.push ('插入远程脚本');
    
    if ($$.accessInternet && /xmlhttp/i.test(data))
      arrReasons.push ('访问远程服务器');
    
    // /([^a-z]pass(word|wd|)[^a-z]|pwd)/i
    if ($$.readPwd && /([^a-z]passw(ord|d|)[^a-z])/i.test (data)) // 密码窃取
      arrReasons.push ('读取密码');
    
    if ($$.autoJumpAd && /(adf\.ly|(j|q)\.gs)\/[a-z0-9]/i.test(data))
      arrReasons.push ('跳到广告页');
    
    if ($$.askfmScam && /((ask\.fm(.+?|)(like|ask|p(re|er)gunt))|(href\='Skype))/i.test(data))
      arrReasons.push ('Ask.fm 欺诈');
    
    if ($$.ultooScam && /('|")([a-z0-9\s]+|)(PollUserName|9804452350)([a-z0-9\s]+|)('|")/i.test(data))
      arrReasons.push ('Ultoo 欺诈');
    
    if ($$.knownScamScript) {
      if (knownScamPatten.test(data)) {
        arrReasons.push ('调用已知恶意脚本');
      }
    }
    
    if ($$.moneyBack) {
      // 防止資源浪費
      if (batchTest (data, [
        /\?pid=mm_/i,
        /amazon(\\|)\.(.+?)(\/|\?|&)(tag|prodid|asin|detailApp)=/i,
        /linktech(\\|)\.c/i,
        /sdo(.+?)(\/|\?|&)pid=/i,
        /(vancl|beifabook|xinhuabookstore)(\\|)\.com/i,
        moneybackPattenA,
        moneybackPattenB,
        moneybackPattenC
      ])) {
        arrReasons.push ('包含返利代码');
      }
    }
    
    if (arrReasons.length >0)
      tagScam (arrReasons.join(', '), id, '风险脚本', index);
    else
      tagGood ('安全', id, index);
  }
  
  function tagScript (sReason, id, htmlColour, className, bHide, bCount, sCaution, tag, index){
    if (bDebugScript)
      console.log ('tagScript -> bTableMode: ', bTableMode);
    
	// If is on the script desc. page.
    if (bTableMode) {
      $('#details h2.title:first')
      .prepend ('[' + tag + '] ').css({
        'color': htmlColour,
        'font-size': '18px'
      }).after ($('<span>').css({
        'color': htmlColour
      }).text(sReason || ''));
      
	  console.log ('checkPermission?');
	  checkPermissionW (id);
      return;
    }
    if (bDebugScript)
      console.log ('tagScript -> arguments: ', arguments);
    
    arrStates [index] = 1;
    checkIfAllDone ();
    
    toggleScams(false);
    // Set row selector
    var row = 'tr[id="scripts-' + id + '"] ';
    
    // Tag the suspected scam's HTML code
    // Show reason only on hover
    $(row).addClass(className).find('td.script-meat')
    .css('padding-bottom','0').hover(function(){
      $('span.reason', this).show();
    }, function(){
      $('span.reason', this).hide();
    });
    
    // Hide the suspected scam if the cookie tells us the toggle is set to hide
    if (bHide)
      $(row).attr('hidden',''); 
    
    // Tag the suspected scam visually using our preset messages
    $(sCaution).insertBefore($(row).find('a.title').css('color', htmlColour)
                             .parent().find('p.desc'));
    
    // Set the text to use when tagging suspected scam scripts
    $(row).find('a.title').before($('<span>').css({
      'color': htmlColour
    }).text('[' + tag + '] '));
    
    // Append reason text
    if (sReason)
      $(row + 'span.reason').text(sReason).append('<br />').hide();
    
    // Increment the running count of detected scams
    if (bCount)
      $('span.total').text(parseInt($('span.total').text()) + 1);
    
  }
  
  function tagScam (reason, id, tag, index){
    if (bDebugScript)
      console.log ('tagScam', arguments);
    
    tagScript ('原因: ' + reason, id, 'darkred', 'scam',
               ('true' == $Get('ScamHide')),
               true, caution, tag, index);
  }
  
  function tagGood (reason, id, index){
    if (bDebugScript)
      console.log ('tagGood', arguments);
    
    tagScript (false, id, 'green', 'safe', false, false,
               '<span class="reason" style="color: green"></span>',
               reason, index);
  }
  
  function getToday () {
    // No round up.
    return parseInt(+new Date()/86400000);
  }
  
  $('#content h1,.container h2').first()
  .after('<span style="color: green; display: block;">即使脚本报告为安全，也应该多留个心眼。</span>');
  
  // Check for single script.
  if (bTableMode) {
    checkScriptAuthor ($('span.author a[user_id]').attr('user_id'), scriptId, 0, true);
  }
  
  // Set the toggle link's click function
  $('a.autoToggle').click(function(){
    toggleScams(true);
  });
  
  // Make sure the toggle setting is in effect in case a toggle click occurred during the loop
  // toggleScams(false);
  
  function toggleScams(click){
    if (bDebugScript)
      console.log ('toggleScams');
    var cScamHide = ($Get('ScamHide') == 'true');
    
    if (click) {
      cScamHide = !cScamHide;
      $Set('ScamHide', cScamHide);
    }
    
    if (cScamHide)
      hideScams();
    else
      showScams();
  }
  
  function hideScams(click){
    $('tr.scam').addClass ('scamHide');
    $('span.tog').text('个已隐藏');
  }
  
  function showScams(click){
    $('tr.scam').removeClass ('scamHide');
    $('span.tog').text('个风险脚本');
  }
  
  /* Auto-updater: Daily check. 
    If an update is found, update notice displays on the current and next two subsequent page loads, 
    then stops displaying again until following day. */
  
  // Jixun: using time stamp.
  var cUpdater = parseInt($Get('ScamFilterUpdate', getToday() - 1));
  if (bDebugUpdate)
    console.log ('cUpdater ::', cUpdater, thisScriptMetaURL);
  
  // If it's older than today then check.
  // Or the user don't want it update :(
  if ($$.dailyUpdate && cUpdater < getToday()){
    // Retrieve the piece
    $.ajax({
      url: thisScriptMetaURL, 
      dataType: 'text', 
      cache: false,
      success: checkUpdates
    });
  }
  
  function checkUpdates(data){
    if (bDebugUpdate)
      console.log ('Func :: checkUpdates ::', arguments);
    
    // Extract Scam Hider's current version number from the retrieved data...
    var currentVersion = (GM_info.script.version),
        latestVersion  = ((data.match(/@version(\s+)(.+)/i)||[,,0])[2]);
    
    // Debug offset:
    console.log ('Installed version: ', currentVersion,
                 'Latest version: ',    latestVersion   );
    
    // and compare it to the installed version number.
    if (currentVersion != latestVersion){
      // If the current version number retrieved is greater than the installed version number, show our update notice.
      $('span.upd').html(notify);
      
      // Set the notification link's tooltip to show installed + latest versions
      $('a.notify').attr('title','当前版本: ' + currentVersion + '\n最新版本: ' + latestVersion);
    } else {
      // Script updated
      $Set ('ScamFilterUpdate', getToday());
    }
  }
  
});