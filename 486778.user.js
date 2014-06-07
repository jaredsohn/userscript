// ==UserScript==
// @name		众测_新项目对话框通知
// @namespace		test_baidu_com_notification_alert
// @version		2.14
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
      fdiv.style.right='14px';
      fdiv.style.color='#CCCCCC';
      fdiv.style.fontSize='10px';
      fdiv.innerHTML='加载通知....';
      document.getElementsByTagName('BODY')[0].appendChild(fdiv);
      var fchk=document.createElement('INPUT');
      fchk.setAttribute('type','checkbox');
      fchk.setAttribute('id','fchk');
      fchk.setAttribute('title','是否自动复制到剪贴板');
      fchk.addEventListener('change', function(){GM_setValue('auto_clipboard',(this.checked?'true':'false'));}, true);
      fchk.style.display='block';
      fchk.style.position='fixed';
      fchk.style.zIndex='9';
      fchk.style.top='-1px';
      fchk.style.right='-1px';
      if(GM_getValue('auto_clipboard','false')=='true')fchk.checked=true;
      document.getElementsByTagName('BODY')[0].appendChild(fchk);
   }

   var C_RF_MINUTE = 1;		// 刷新间隔(分钟)





   var msg='';
   var step=0;
   var s_score=0,  c_score=0;	// 保存的礼券数, 当前礼券数
   var s_items=[], c_items=[];	// 保存的项目集, 当前项目集
   var s_gifts=[], c_gifts=[];	// 保存的礼品集, 当前礼品集(常规)
   var s_giftd=[], c_giftd=[];	// 保存的礼品集, 当前礼品集(达人)
   loop_count=C_RF_MINUTE*120+1;

   var fn=function(){
      loop_count++;
      if(loop_count<C_RF_MINUTE*120){
         if(loop_count%10==0){
            fdiv.style.color='#CC0000';
         }else if(loop_count%10==1){
            fdiv.style.color='#CCCCCC';
         }
         return;
      }else if(fdiv.style.color!='#009900'){
         fdiv.style.color='#009900';
      }
      if(loop_count>C_RF_MINUTE*2*120 && loop_count%20==0){
         // 扫描过程30秒超时后刷新
         location.reload();
         return;
      }
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
                  s+=',"'+c_items[i]+'","'+c_items[i+1].replace(/(["\[\]\{\}])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
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
                     m=JSONData.aaData[i][j].match(/<a\s[^>]*?href="(http:.*?\/giftid\/\d+)"[^>]*>\s*([^<]+)\s*<\/a>/i);
                     if(m) c_gifts.push(m[1],m[2]);
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
                  if(!f) msg+=c_gifts[i+1]+' 上架.  '+c_gifts[i]+'\n';
                  s+=',"'+c_gifts[i]+'","'+c_gifts[i+1].replace(/(["\[\]\{\}])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
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
                     m=JSONData.aaData[i][j].match(/<a\s[^>]*?href="(http:.*?\/giftid\/\d+)"[^>]*>\s*([^<]+)\s*<\/a>/i);
                     if(m) c_giftd.push(m[1],m[2]);
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
                  if(!f) msg+='达人区 '+c_giftd[i+1]+' 上架.  '+c_giftd[i]+'\n';
                  s+=',"'+c_giftd[i]+'","'+c_giftd[i+1].replace(/(["\[\]\{\}])/gi,'\\$1').replace(/\r|\n/gi,'')+'"';
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
      if(msg){
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
      step=loop_count=0;
      // 最后检查信息
      fdiv.innerHTML='@ '+tm;
   };
   gm_timer_loop=window.setInterval(fn, 500);
}());

