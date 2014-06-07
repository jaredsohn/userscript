// ==UserScript==
// @name   PayoutHistoryX
// @version 01.01.0023
// @description Version 01.01.0023
// @author  .paradise
// @include https://trader.iforex.com/webpl/frm.aspx
// @include https://fx.click-sec.com/fxop/top.do*
// @include https://fx.click-sec.com/fxop/order.do*
// @include https://fx.click-sec.com/fxop/payoutHistory*
// @include https://fx.click-sec.com/fxop/orderHistorySearch.do*
// @include https://fx-demo.click-sec.com/fxop/order.do*
// @include https://fx-demo.click-sec.com/fxop/payoutHistory.do*
// @include https://fx-demo.click-sec.com/fxop/orderHistorySearch.do*
// @include http://fxtrade.oanda.com/analysis/forex-order-book*
// @include http://fxtrade.oanda.com/analysis/open-position-ratios*
// @include http://fxtrade.oanda.com/lang/ja/analysis/forex-order-book*
// @include http://fxtrade.oanda.com/lang/ja/analysis/open-position-ratios*
// @exclude http://acid3.acidtests.org/*
// @run-at document-end
// ==/UserScript==
AUTO=-1;OFF=0;ON=1;

(function(){if(''!=document.title){function ifAddStr(ifSw,ifStr){if(!ifSw){ifStr=''}return(ifStr)};
  if(0<location.href.indexOf('://trader.iforex.com/webpl/frm.aspx')){setInterval("location.replace('/webpl/current.aspx');",5*60*1000);
  }else if((0<location.href.indexOf('://fxtrade.oanda.com/analysis/forex-order-book'))||(0<location.href.indexOf('://fxtrade.oanda.com/analysis/open-position-ratios'))){
    setTimeout("window.scroll(0,0);",1000);setInterval("lh=location.href;location.replace(lh.substr(0,(lh+'#').indexOf('#')));",30*1000);
  }else if((0<location.href.indexOf('://fxtrade.oanda.com/lang/ja/analysis/forex-order-book'))||(0<location.href.indexOf('://fxtrade.oanda.com/lang/ja/analysis/open-position-ratios'))){
    setTimeout("window.scroll(0,0);",1000);setInterval("lh=location.href;location.replace(lh.substr(0,(lh+'#').indexOf('#')));",30*1000);
  }else if(0<location.href.indexOf('.click-sec.com/fxop/orderHistorySearch.do')){if((!navigator.userAgent.match(/(Safari|Chrome)/))&&(0<location.href.indexOf('/orderHistorySearch.do?'))){
    setTimeout("window.scroll(0,96+140);",1);setInterval("lh=location.href;location.replace(lh.substr(0,(lh+'#').indexOf('#')));",30*1000);}else{setTimeout("window.scroll(0,0);",1000);}
  }else if(location.href.match(/(\.click-sec\.com\/fxop\/)(top|order)(\.do)/)){OrderLine=30;setTimeout("window.scroll(0,(document.getElementById('topSwf').offsetTop-5));",1000);if(!navigator.userAgent.match(/(Safari|Chrome)/)){
    setTimeout("if(d=document.getElementById('FOOTER')){d.innerHTML='<br><table width=100%><tr><td width=100% align=center valign=top>"+
    "<form name=OrderHistoryForm target=OrderHistory action=/fxop/orderHistorySearch.do method=get accept-charset=Windows-31J style=display:none;></form>"+
    "<input style=z-index:1;position:relative;right:0px;bottom:0px;width:982px;height:25px;font-weight:600;font-size:10pt;color:red; type=button value=リロード onFocus=this.blur(); "+
    "onmouseout=document.OrderHistoryForm.submit(); onclick=window.scroll(0,(document.getElementById(\\\"topSwf\\\").offsetTop-5));document.OrderHistoryForm.submit();>"+
    "<iframe name=OrderHistory height="+((OrderLine*53)+39)+" align=top width=1000 marginwidth=0 marginheight=0 frameborder=0 allowtransparency=true scrolling=no src=/fxop/orderHistorySearch.do?></iframe></td></tr></table>'+d.innerHTML}",1);}
  }else if(0<location.href.indexOf('.click-sec.com/fxop/payoutHistory')){setTimeout("window.scroll(0,0);",1000);
    setInterval("t=document.getElementById('timeLabel').innerHTML;w=t.replace(/[^日月火水木金土]/img,'');w=('日月火水木金土').indexOf(w);"+
    "if(0){document.title=t}t=t.replace(/(\\D)/img,',').split(',,').join(',').replace(',,',','+w+',');t=t.split(',');"+
    "if((0==parseInt(t[5])%5)&&(5==parseInt(t[6]))){document.opGetPayoutHistoryForm.submit()};",1000);
    fx=('USD/JPY,EUR/JPY,GBP/JPY,EUR/USD').split(',');ai=document.getElementsByTagName('tr');sw=false;
    fn=new Array(fx.length);for(f=0;fx.length>f;f++){fn[f]=0}  f1=new Array(fx.length);for(f=0;fx.length>f;f++){f1[f]='◇'}
    f2=new Array(fx.length);for(f=0;fx.length>f;f++){f2[f]='◇'}f3=new Array(fx.length);for(f=0;fx.length>f;f++){f3[f]='◇'}
    f4=new Array(fx.length);for(f=0;fx.length>f;f++){f4[f]='◇'}f5=new Array(fx.length);for(f=0;fx.length>f;f++){f5[f]='◇'}
    for(i=0;ai.length>i;i++){for(f=0;fx.length>f;f++){if(0<ai[i].innerHTML.indexOf('>'+fx[f]+'</span></td>')){
          ai[i].innerHTML=ai[i].innerHTML.replace('<td>','<td style=width:240px;font-size:12px; nowrap>');aj=ai[i].getElementsByTagName('td');fn[f]++;if(sw){sw=confirm(fn[f]+'\n'+ai[i].innerHTML);}
          f5[f]=f4[f];f4[f]=f3[f];f3[f]=f2[f];f2[f]=f1[f];f1[f]=aj[6].innerHTML;if(0<=f1[f].indexOf('↑')){f1[f]='▲'}else if(0<=f1[f].indexOf('↓')){f1[f]='▼'}else{f1[f]='◆'}
          if(4>fn[f]){if('▲'==f1[f]){f4[f]='△'}else if('▼'==f1[f]){f4[f]='▽'}}if(2>fn[f]){if('▲'==f1[f]){f5[f]='△'}else if('▼'==f1[f]){f5[f]='▽'}}
          wk=aj[5].innerHTML.replace(/^(0)$/,'0.000'+ifAddStr((3==f),'00'))+'　'+aj[4].innerHTML;
          wk=('#'+(fn[f]-4)+f5[f]+' #'+(fn[f]-3)+f4[f]+' '+aj[1].innerHTML+' #'+(fn[f])+f1[f]+wk+'').split('#-').join('-').split('#0').join('-0');
          wk=wk.split('▼').join('<font color=deepskyblue>▼</font>').split('▲').join('<font color=red>▲</font>');
          wk=wk.split('▽').join('<font color=deepskyblue>▽</font>').split('△').join('<font color=red>△</font>');
          aj[1].innerHTML=wk.split('◆').join('<font color=orange>◆</font>').split('◇').join('<font color=orange>◇</font>');
} } } } } })();