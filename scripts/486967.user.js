// ==UserScript==
// @name		众测_新项目对话框通知
// @namespace		test_baidu_com_notification_alert
// @version		2.24
// @last_modify		11:39 2014-01-24 
// @description		定时扫描礼券数,项目列表和礼品列表,当发生变化时进行对话框通知(项目下线\礼品下架不通知)
// @author		小三
// @include		http://test.baidu.com/
// @include		http://test.baidu.com/crowdtest/project/index
// @include		http://test.baidu.com/crowdtest/activity/*
// @include		http://test.baidu.com/crowdtest/cloudapp/*
// @include		http://test.baidu.com/crowdtest/yidong/*
// @include		http://test.baidu.com/crowdtest/report/*
// @include		http://test.baidu.com/crowdtest/message/*
// @include		http://test.baidu.com/crowdtest/uer/*
// @include		http://test.baidu.com/crowdtest/n/*
// @include		http://test.baidu.com/crowdtest/help/*
// @grant		unsafeWindow
// @grant		GM_log
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @grant		GM_xmlhttpRequest
// @grant		GM_setClipboard
// @grant		GM_Notification
// ==/UserScript==




//GM_deleteValue('score');		//清礼券记录
//GM_deleteValue('items');		//清项目记录
//GM_deleteValue('gifts');		//清礼品记录(常规)
//GM_deleteValue('giftd');		//清礼品记录(达人)
//GM_deleteValue('last_notify');	//清最后通知
//alert('GM Value Clear OK.');

var gm_timer_loop,loop_count=0;
(function(){
   var C_RF_MINUTE = 0.5;		// 刷新间隔(分钟)
   var C_ICON = '';			// 桌面通知图标(对话框版无效)
   var C_TITLE = '';			// 桌面通知标题(对话框版无效)
   var C_SND_W = '';			// 通知提示音(错误,对话框版无效)
   var C_SND_O = '';			// 通知提示音(消息,对话框版无效)
   var C_GIFT2SPEC = [			// 立秒的礼品数组[GIFT ID, SPEC ID, 个数, '说明 / 礼券'] 
	[282,	279,	-1,	'百度棒球帽'],
	[298,	295,	-1,	'百度指甲套装'],
	[307,	304,	2,	'百度熊靠垫'],
	[436,	433,	-1,	'闪迪 32G U盘'],
	[507,	524,	-1,	'百度众测购物包'],
	[508,	525,	-1,	'百度众测折叠雨伞'],
	[509,	526,	-1,	'百度众测4GU盘(青花版)'],
	[557,	575,	-1,	'美的微波炉'],
	[572,	594,	-1,	'高质微纤毛巾三条装'],
	[577,	599,	-1,	'收纳套装'],
	[579,	601,	-1,	'EDUP无线网卡'],
	[584,	606,	-1,	'公牛3米插座'],
	[588,	610,	-1,	'闪迪MicroSDHC存储卡16G'],
	[599,	621,	-1,	'爱国者移动电源'],	//1月20日14:00
	[606,	628,	-1,	'百度移动硬盘500G'],	//1月20日11:00
	[607,	629,	-1,	'百度钱包'],
	[618,	640,	-1,	'iPod shuffle2G'],
	[619,	641,	-1,	'九阳豆浆机'],		//1月20日09:00
//下线	[627,	649,	-1,	'益盾防辐射眼镜 / 16000礼券'],
	[628,	650,	-1,	'魅族 MX3 16G 3G手机'],
	[629,	651,	-1,	'时尚男士牛皮斜挎包'],
	[630,	652,	-1,	'依波男士石英表'],
//下线	[631,	653,	-1,	'依波女士石英表'],
	[632,	654,	-1,	'iPad Air（16G WiFi版）'],
//下线	[633,	655,	-1,	'触控触摸屏手套'],
//下线	[634,	656,	-1,	'迪士尼经典办公杯'],
//下线	[635,	657,	-1,	'联想s5000-wifi'],
//下线	[636,	658,	-1,	'联想yogatablet-8寸'],
//下线	[637,	659,	-1,	'联想yogatablet-10寸'],
	[638,	660,	-1,	'雪荞茶礼盒装'],
//下线	[639,	661,	-1,	'雪荞茶家庭分享装'],
//下线	[640,	662,	-1,	'品胜移动电源  电霸四代5000mAh'],
//下线	[641,	663,	-1,	'品胜移动电源  彩豆5000mAh'],
//下线	[642,	664,	-1,	'品胜无线2.4G标准型鼠标M103-mini'],
//下线	[643,	665,	-1,	'品胜无线2.4G标准型鼠标M600'],
//下线	[644,	666,	-1,	'品胜 耳塞式立体声蓝牙耳机(LE001)黑色'],
	[645,	667,	-1,	'彩阳暖手暖脚宝'],
	[646,	668,	-1,	'不锈钢笔式餐具三件套颜色随机'],
	[647,	669,	-1,	'飞利浦 有尘袋吸尘器'],
	[648,	670,	-1,	'惠普 彩色喷墨打印机'],
//下线	[649,	671,	-1,	'test23434'],
//下线	[650,	672,	-1,	'联想yogai3-4G'],
//下线	...
//下线	[656,	678,	-1,	'联想笔记本系列'],
	[657,	679,	-1,	'美的4L 电脑版电饭煲'],
	[658,	680,	-1,	'明高室内外温湿度计'],
	[659,	681,	-1,	'九安电子血压计'],
//下线	[664,	686,	-1,	'法国公爵塔米娜瓦AOP'],
	[665,	687,	-1,	'超声波加湿器（白色）'],
	[666,	688,	-1,	'三星32G存储卡 升级版'],
	[667,	689,	-1,	'美的电磁炉'],
//下线	[668,	690,	-1,	'笔记本散热器'],
	[669,	691,	-1,	'笔记本散热器'],
	[670,	692,	-1,	'SATA-3固态硬盘(PX-128M5S)'],
	[671,	693,	-1,	'床上四件套'],
//下线	[672,	694,	-1,	'护眼台灯（银色）'],
	[673,	695,	-1,	'护眼台灯（银色）'],
//674-681下线
	[682,	704,	-1,	'纽曼移动电源（白色）'],		//青花凤字
	[683,	705,	-1,	'创维42英寸LED电视（银色）'],
	[684,	706,	-1,	'飞利浦SA3SPK04K/93播放器'],
	[685,	707,	-1,	'小度wifi'],
	[686,	708,	-1,	'果蔬解毒机（韩国进口）'],
	[687,	709,	-1,	'家用无油无烟炸锅'],
	[688,	710,	-1,	'美的立式消毒柜'],
	[689,	711,	-1,	'全自动洗衣机（浅灰色）'],
	[690,	712,	-1,	'罗西尼皮带石英男表'],
	[691,	713,	-1,	'酷派3G手机（白色）移动版'],
	[692,	714,	-1,	'台电7.9英寸平板电脑'],
	[693,	715,	-1,	'TCL42英寸云电视（黑色）'],
	[694,	716,	-1,	'多功能蓝牙插卡数码微型便携小音箱（精灵蓝）'],
	[695,	717,	-1,	'明基自拍神器（白色）'],
	[696,	718,	-1,	'TCL42英寸智能液晶电视（黑色）'],
	[697,	719,	-1,	'拉杆箱黑色'],
	[698,	720,	-1,	'iPad mini第二代（银色）'],	//1月20日12:00
	[699,	721,	-1,	'华为P6-C00（黑色联通版）'],
	[700,	722,	-1,	'蓝魔i9平板电脑（银色）'],
	[701,	723,	-1,	'友基Rainbow手写板（白色）'],
	[702,	724,	-1,	'西部数据 1TB移动硬盘'],	//同下,双上线
	[703,	725,	-1,	'西部数据 1TB移动硬盘'],
	[704,	726,	-1,	'海尔家用吸尘器'],
	[705,	727,	-1,	'长帝全温型多功能电烤箱'],	//1月20日10:00
	[706,	728,	-1,	'加州原野快乐万家年货坚果礼盒(2014版)1500g'],	//1月20日13:00
	[707,	729,	-1,	'黑色猫头鹰双肩包'],		//1月20日15:00
	[708,	730,	-1,	'新春8件套（福字对联等）'],	//1月20日16:00
	[-1,	-1,	-1,	'结束']
   ];
   var C_SECKILL_TIME = false;					// 秒杀进行时(动态变量,不停的扫描礼品,自动秒杀)
   var C_PROVINCE_ID = 0;					// 秒杀使用的地址[省份编号]
   var C_CITY_ID = 0;						// 秒杀使用的地址[城市编号]
   var C_COUNTY_ID = 0;					// 秒杀使用的地址[县区编号]
   var C_DELIVERY_ADDR_ID = 0;				// 秒杀使用的地址[完整地址编号]
   var C_DELIVERY_ADDRESS = '秒杀使用的地址';			// 秒杀使用的地址[详细地址文本]
   var C_CN_NAME = '姓名';					// 秒杀使用的地址[收件人姓名]
   var C_TELEPHONE = '手机号';				// 秒杀使用的地址[联系电话]
   var V_YII_CSRF_TOKEN = '';					// 动态变量(Cookie的YII_CSRF_TOKEN值)


   var msg='';
   var step=0;
   var s_score=0,  c_score=0;	// 保存的礼券数, 当前礼券数
   var s_items=[], c_items=[];	// 保存的项目集, 当前项目集
   var s_gifts=[], c_gifts=[];	// 保存的礼品集, 当前礼品集(常规)
   var s_giftd=[], c_giftd=[];	// 保存的礼品集, 当前礼品集(达人)
   var m_gift_ids=[];
   loop_count=C_RF_MINUTE*240+1;

   var $=function(id){return document.getElementById(id);};
   HTMLElement.prototype.subTag=function(tag){return this.getElementsByTagName(tag);};
   var fdiv=$('fdiv');
   if(!fdiv){
      var tstr=GM_getValue('last_notify','桌面通知最后检查时间').replace(/↙/gi,'\n');
      fdiv=document.createElement('A');
      fdiv.setAttribute('id','fdiv');
      fdiv.setAttribute('sdata',tstr);
      fdiv.setAttribute('title',tstr.replace(/\s+http:.+\n/gi,'\n'));
      fdiv.addEventListener('click', function(){GM_setClipboard(fdiv.getAttribute('sdata').replace(/(^|\n)(【._.】|※).*(\n|$)/gi,'$1....$3').split('\n== ')[0].replace(/\n/gi,'\r\n'));fdiv.style.color='#0000CC';}, true);
      fdiv.addEventListener('dblclick', function(){GM_setClipboard(fdiv.getAttribute('sdata').replace(/(^|\n)(【._.】|※).*(\n|$)/gi,'$1....$3').replace(/\n/gi,'\r\n'));fdiv.style.color='#0000CC';}, true);
      fdiv.setAttribute('href','javascript:void(0);');
      fdiv.style.display='block';
      fdiv.style.position='fixed';
      fdiv.style.zIndex='9';
      fdiv.style.top='0px';
      fdiv.style.right='24px';
      fdiv.style.color='#CCCCCC';
      fdiv.style.fontSize='10px';
      fdiv.innerHTML='加载通知....';
      document.getElementsByTagName('BODY')[0].appendChild(fdiv);
      var fchk=document.createElement('INPUT');
      fchk.setAttribute('type','checkbox');
      fchk.setAttribute('id','fchk');
      fchk.setAttribute('title','自动复制到剪贴板');
      fchk.addEventListener('change', function(){GM_setValue('auto_clipboard',(this.checked?'true':'false'));}, true);
      fchk.style.display='block';
      fchk.style.position='fixed';
      fchk.style.zIndex='9';
      fchk.style.top='-1px';
      fchk.style.right='10px';
      if(GM_getValue('auto_clipboard','false')=='true')fchk.checked=true;
      document.getElementsByTagName('BODY')[0].appendChild(fchk);
      var fcms=document.createElement('INPUT');
      fcms.setAttribute('type','checkbox');
      fcms.setAttribute('id','fcms');
      fcms.setAttribute('title','连续秒杀模式');
      fcms.addEventListener('change', function(){C_SECKILL_TIME=(this.checked?true:false);GM_setValue('auto_seckill',C_SECKILL_TIME);if(C_SECKILL_TIME)loop_count=C_RF_MINUTE*240+1;}, true);
      fcms.style.display='block';
      fcms.style.position='fixed';
      fcms.style.zIndex='9';
      fcms.style.top='-1px';
      fcms.style.right='-1px';
      if(GM_getValue('auto_seckill','false')=='true')fcms.checked=true;
      document.getElementsByTagName('BODY')[0].appendChild(fcms);
      if(/http:\/\/test\.baidu\.com\/crowdtest\/n\/gift\/showGift\/giftid\/\d+/gi.test(location.href)){
         // 显示礼品参数
         var texp='\t['+$('gift_id_input').value+',\t'+$('default_spec_id_input').value+',\t-1,\t\''+$('gift_name_div').getElementsByTagName('DIV')[0].innerHTML.replace(/^\s+|\s+$/gi,'')+' / '+$('gift_value_div').getElementsByTagName('DIV')[0].innerHTML.replace(/<span.*span>|[\n\r\s]+/gi,'')+'\'],';
         if($('change_gift_div').innerHTML.indexOf('已下线')>=0)texp='//下线'+texp;
         fexp=document.createElement('SPAN');
         fexp.style.display='block';
         fexp.style.position='fixed';
         fexp.style.zIndex='9';
         fexp.style.top='12px';
         fexp.style.right='0px';
         fexp.style.color='#CCCCCC';
         fexp.style.fontSize='10px';
         fexp.setAttribute('sdata',texp+'\r');
         fexp.addEventListener('click', function(){GM_setClipboard(fexp.getAttribute('sdata'));}, true);
         fexp.innerHTML=texp;
         document.getElementsByTagName('BODY')[0].appendChild(fexp);
      }
   }

   // 提取YII_CSRF_TOKEN
   (function(){
      var c=document.cookie.split('; '),kv;
      for(var i=0;i<c.length;i++){
         kv=c[i].split('=');
         if(kv[0]=='YII_CSRF_TOKEN') V_YII_CSRF_TOKEN = kv[1];
      }
   }());

   var fn=function(){
      loop_count++;
      if(loop_count<C_RF_MINUTE*240){
         if(loop_count%20<=1){
            fdiv.style.color='#CC0000';
         }else if(loop_count%20<=3){
            fdiv.style.color='#CCCCCC';
         }
         return;
      }else if(fdiv.style.color!='#009900'&&fdiv.style.color!='#000099'){
         fdiv.style.color='#009900';
      }
      if(document.getElementsByTagName('BODY')[0].getAttribute('gm_notify')){
         // 其它脚本独占,停表退出
         fdiv.style.color='#CCCCCC';
         fdiv.innerHTML='已暂停执行';
         clearInterval(gm_timer_loop);
         return;
      }
      if(loop_count==C_RF_MINUTE*240+24){
         // 扫描过程6秒超时后重启进程
         step=0;
         fdiv.style.color='#000099';
         return;
      }else if(loop_count>=C_RF_MINUTE*240+120 && loop_count%40==0){
         // 扫描过程30秒超时后刷新
         location.reload();
         return;
      }
      // 其它帐号只启用秒杀
      // [代码已移除]
      // 提取当前礼券数
      if(step<1){
         step=1;
         var score_page_url = 'http://test.baidu.com/crowdtest/activity/gotoActivityMarket?rand='+Math.random();
         GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 1500,
            url: score_page_url,
            onload: function(response){
               try{
                  c_score = parseInt(response.responseText.match(/<a\s+.*?id="gift_score"[^>]*>(\d+)<\/a>/i)[1]);
               }catch(e){
                  msg+='※ 木取到礼券数肿么办呢?\n';
                  step=2;
                  return;
               }
               s_score = parseInt(GM_getValue('score', '0'));
               // 分析礼券数
               if(c_score!=s_score) msg+=(c_score>s_score?'【^_^】空降':'【T_T】不见')+'了【'+(c_score-s_score)+'】礼券,现有【'+c_score+'】礼券\n';
               // 保存礼券数
               GM_setValue('score', c_score);
               step=2;
            },
            onerror: function(){
               msg+='※ 木取到礼券数肿么办呢?\n';
               step=2;
            }
         });
      }

      // Ajax请求项目JSON
      if(step<3){
         step=3;
         var item_json_url = 'http://test.baidu.com/crowdtest/n/project/getProject/?sEcho=3&iColumns=3&sColumns=&iDisplayStart=0&iDisplayLength=100&sSearch=&bRegex=false&sSearch_0=&bRegex_0=false&bSearchable_0=true&sSearch_1=&bRegex_1=false&bSearchable_1=true&sSearch_2=&bRegex_2=false&bSearchable_2=true&all_pro_type=0%2C1%2C2%2C3%2C4%2C5%2C10&pro_type=all&tester_status=all&need_act=0&from=test&rand='+Math.random();
         GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 1500,
            url: item_json_url,
            onload: function(response){
               var JSONData,aaData,m,i,j,f,s='';
               eval('JSONData='+response.responseText);
               if(!JSONData||!JSONData.aaData){
                  msg+='※ 木取到项目数据肿么办呢?\n';
                  step=4;
                  return;
               }
               s_items = eval(GM_getValue('items', '[]'));
               for(i=0;i<JSONData.aaData.length;i++){
                  for(j=0;j<JSONData.aaData[i].length;j++){
                     m=JSONData.aaData[i][j].match(/<a\s+href="(http:.*?\/proid\/\d{4,})".*title="\s*([^"]+)\s*"/i);
                     if(m) c_items.push(m[1],m[2]);
                  }
               }
               // 分析对比项目数据
               for(i=0;i<c_items.length;i+=2){
                  f=false;
                  for(j=0;j<s_items.length;j+=2){
                     if(s_items[j]==c_items[i]){
                        f=true;
                        break;
                     }
                  }
                  if(!f) msg+=c_items[i+1]+' 上线.  '+c_items[i]+'\n';
                  s+=',"'+c_items[i]+'","'+c_items[i+1].replace(/(["\[\]\{\}\(\)])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
               }
               // 保存项目集
               if(c_items.length>=1) GM_setValue('items', '['+s.substr(1)+']');
               c_items.length=0;
               s_items.length=0;
               step=4;
            },
            onerror: function(){
               msg+='※ 木取到项目数据肿么办呢?\n';
               c_items.length=0;
               s_items.length=0;
               step=4;
            }
         });
      }
      if(step<4)return;

      // Ajax请求礼品JSON(常规,type=1)
      if(step<5){
         step=5;
         var gift_json_url = 'http://test.baidu.com/crowdtest/n/gift/getGiftList?sEcho=8&iColumns=4&sColumns=&iDisplayStart=0&iDisplayLength=200&type=1&mygift_type=0&rand='+Math.random();
         GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 1500,
            url: gift_json_url,
            onload: function(response){
               var JSONData,aaData,m,i,j,f,s='';
               eval('JSONData='+response.responseText);
               if(!JSONData||!JSONData.aaData){
                  msg+='※ 木取到常规礼品数据肿么办呢?\n';
                  step=6;
                  return;
               }
               s_gifts = eval(GM_getValue('gifts', '[]'));
               for(i=0;i<JSONData.aaData.length;i++){
                  for(j=0;j<JSONData.aaData[i].length;j++){
                     m=JSONData.aaData[i][j].match(/<a\s[^>]*?href="(http:.*?\/giftid\/\d+)"[^>]*>\s*([^<]+)\s*<\/a>[\r\n\t\s]*<br \/>[\r\n\t\s]*<span(\s+class="discount_gift")?>/i);
                     if(m) c_gifts.push(m[1],(m[3]!=undefined?m[2]:'〖秒杀〗'+m[2]));
                  }
               }
               // 分析对比礼品数据
               for(i=0;i<c_gifts.length;i+=2){
                  f=false;
                  for(j=0;j<s_gifts.length;j+=2){
                     if(s_gifts[j]==c_gifts[i]){
                        f=true;
                        break;
                     }
                  }
                  if(c_gifts[i+1].indexOf('〖秒杀〗')<0){	// 倒计时秒杀礼品不进行脚本秒杀
                     var tx = c_gifts[i].replace(/^(.+\/giftid\/)|(\D*$)/gi,'');
                     for(j=0;j<C_GIFT2SPEC.length;j++){
                        if(parseInt(tx)==C_GIFT2SPEC[j][0]){
                           m_gift_ids.push(tx);
                           break;
                        }
                     }
                  }
                  if(!f) msg+=c_gifts[i+1]+' 上架.  '+c_gifts[i]+'\n';
                  s+=',"'+c_gifts[i]+'","'+c_gifts[i+1].replace(/(["\[\]\{\}\(\)])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
               }
               // 保存礼品集
               if(c_gifts.length>=1) GM_setValue('gifts', '['+s.substr(1)+']');
               c_gifts.length=0;
               s_gifts.length=0;
               step=6;
            },
            onerror: function(){
               msg+='※ 木取到常规礼品数据肿么办呢?\n';
               c_gifts.length=0;
               s_gifts.length=0;
               step=6;
            }
         });
      }
      if(step<6)return;

      // Ajax请求礼品JSON(达人,type=3)
      if(step<7){
         step=7;
         var giftd_json_url = 'http://test.baidu.com/crowdtest/n/gift/getGiftList?sEcho=9&iColumns=4&sColumns=&iDisplayStart=0&iDisplayLength=200&type=3&mygift_type=0&rand='+Math.random();
         GM_xmlhttpRequest({
            method: 'GET',
            synchronous: false,
            timeout: 1500,
            url: giftd_json_url,
            onload: function(response){
               var JSONData,aaData,m,i,j,f,s='';
               eval('JSONData='+response.responseText);
               if(!JSONData||!JSONData.aaData){
                  msg+='※ 木取到达人礼品数据肿么办呢?\n';
                  step=8;
                  return;
               }
               s_giftd = eval(GM_getValue('giftd', '[]'));
               for(i=0;i<JSONData.aaData.length;i++){
                  for(j=0;j<JSONData.aaData[i].length;j++){
                     m=JSONData.aaData[i][j].match(/<a\s[^>]*?href="(http:.*?\/giftid\/\d+)"[^>]*>\s*([^<]+)\s*<\/a>[\r\n\t\s]*<br \/>[\r\n\t\s]*<span(\s+class="discount_gift")?>/i);
                     if(m) c_giftd.push(m[1],(m[3]!=undefined?m[2]:'〖秒杀〗'+m[2]));
                  }
               }
               // 分析对比礼品数据
               for(i=0;i<c_giftd.length;i+=2){
                  f=false;
                  for(j=0;j<s_giftd.length;j+=2){
                     if(s_giftd[j]==c_giftd[i]){
                        f=true;
                        break;
                     }
                  }
                  if(c_giftd[i+1].indexOf('〖秒杀〗')<0){	// 倒计时秒杀礼品不进行脚本秒杀
                     var tx = c_giftd[i].replace(/^(.+\/giftid\/)|(\D*$)/gi,'');
                     for(j=0;j<C_GIFT2SPEC.length;j++){
                        if(parseInt(tx)==C_GIFT2SPEC[j][0]){
                           m_gift_ids.push(tx);
                           break;
                        }
                     }
                  }
                  if(!f) msg+='达人区 '+c_giftd[i+1]+' 上架.  '+c_giftd[i]+'\n';
                  s+=',"'+c_giftd[i]+'","'+c_giftd[i+1].replace(/(["\[\]\{\}\(\)])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
               }
               // 保存礼品集
               if(c_giftd.length>=1) GM_setValue('giftd', '['+s.substr(1)+']');
               c_giftd.length=0;
               s_giftd.length=0;
               step=8;
            },
            onerror: function(){
               msg+='※ 木取到达人礼品数据肿么办呢?\n';
               c_giftd.length=0;
               s_giftd.length=0;
               step=8;
            }
         });
      }
      if(step<8)return;

      // 调用通知
      var dt=new Date();
      var dh='0'+dt.getHours(),dm='0'+dt.getMinutes(),ds='0'+dt.getSeconds();
      var tm=dh.substr(dh.length-2,2)+':'+dm.substr(dm.length-2,2)+':'+ds.substr(ds.length-2,2);
      if(msg&&!C_SECKILL_TIME){		//秒杀模式屏蔽通知,防止阻塞进程
         var msgl=msg.split('\n');
         if(!(msg.substr(0,1)=='※'&&msgl.length<=2)){
            alert(msg.replace(/\s+http:.+\n/gi,'\n'));
            msg='== '+tm+' ================\n'+msg;
            var tmsg=GM_getValue('last_notify','').split('↙');
            for(var i=0;i<Math.min(tmsg.length,5);i++){
               if(tmsg[i]!='')msg+='↙'+tmsg[i];
            }
            GM_setValue('last_notify',msg);
            msg=msg.replace(/↙/gi, '\n');
            fdiv.setAttribute('sdata',msg);
            msg=msg.replace(/\s+http:.+\n/gi,'\n');
            fdiv.setAttribute('title',msg);
            if(GM_getValue('auto_clipboard','false')=='true')fdiv.click();
         }
      }
      msg='';
      // 最后检查信息
      fdiv.innerHTML='@ '+tm;
      // 自动秒杀
      if(m_gift_ids.length>0){
         var miaosa_url = 'http://test.baidu.com/crowdtest/n/gift/confirmExchange/'
         for(var i=0;i<m_gift_ids.length;i++){
            var idx=-1;
            for(j=0;j<C_GIFT2SPEC.length;j++){
               if(parseInt(m_gift_ids[i])==C_GIFT2SPEC[j][0]){
                  idx=j;
                  break;
               }
            }
            if(idx==-1) continue;	// 跳过非自动秒杀的礼品
            var miaosa_data = 'YII_CSRF_TOKEN='+V_YII_CSRF_TOKEN+
                              '&gift_id='+C_GIFT2SPEC[idx][0]+
                              '&spec_id='+C_GIFT2SPEC[idx][1]+
                              '&amount=1'+
                              '&selfhelp=0'+
                              '&site=test'+
                              '&address%5Bcn_name%5D='+encodeURIComponent(C_CN_NAME)+
                              '&address%5Btelephone%5D='+C_TELEPHONE+
                              '&address%5Bdelivery_addr_id%5D='+C_DELIVERY_ADDR_ID+
                              '&address%5Bdelivery_address%5D='+encodeURIComponent(C_DELIVERY_ADDRESS)+
                              '&address%5Bprovince_id%5D='+C_PROVINCE_ID+
                              '&address%5Bcity_id%5D='+C_CITY_ID+
                              '&address%5Bcounty_id%5D='+C_COUNTY_ID;
            for(var j=0;j<C_GIFT2SPEC[idx][2];j++){
               // 不使用GM_xmlhttpRequest,否则无法直接发送cookie
               var xmlhttp = new XMLHttpRequest();
               xmlhttp.open('POST', miaosa_url, false);
               xmlhttp.onreadystatechange = function(){
                  if(xmlhttp.readyState==4){
                     if(xmlhttp.status==200){
                     }
                  }
               };
               xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
               xmlhttp.send(miaosa_data);
            }
            C_GIFT2SPEC[idx][2]=-1;	//提交完以后立即停止,防止多秒
         }
         m_gift_ids.length=0;
      }
      if(C_SECKILL_TIME){
         step=4;
         loop_count=C_RF_MINUTE*240+1;
      }else{
         step=loop_count=0;
      }
   };
   gm_timer_loop=window.setInterval(fn, 250);
}());

