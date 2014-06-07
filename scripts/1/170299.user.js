// ==UserScript==
// @name           cnbeta 助手
// @description    cnbeta 评论找回 文章收藏 快速评论和打分 页面优化 分享增强 
// @include        http://cnbeta.com/articles/*
// @include        http://www.cnbeta.com/articles/*
// @include        http://cnbeta.com/
// @include        http://www.cnbeta.com/
// @namespce       itkso.com
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          unsafeWindow
// @icon            http://www.cnbeta.com/favicon.ico
// @require         http://static.cnbetacdn.com/assets/js/jquery.js
// @updateURL       https://userscripts.org/scripts/source/170299.meta.js
// @downloadURL     https://userscripts.org/scripts/source/170299.user.js
// @license         MIT License
// @version         0.5.1
// @run-at          document-end
// @author          @nowind
// ==/UserScript==
(function()
 {
     "use strict";
     //调试开关 总控所有输出
     function Log(s){
         var _LOG=0;
         if(_LOG)
         {console.log(s);}
     }
     // 获取不安全的win 
     function MustGetUnsafeWin()
     {
         if(window.unsafeWindow){return window.unsafeWindow;}
         //  脚本注入,在部分chrome中会失败
         var c=document.createElement('div');
         c.setAttribute('onclick','return window');
         return c.onclick();
     }
     //添加样式
     function MustAddStyle(s)
     {
         if(window.GM_addStyle)
         {GM_addStyle(s);}
         else
         {
             $('head').append($('<style/>').html(s));
         }
     }
     
     var 
     isRun=function(){if($('.CBset').length>0||$('.SidePic').length>0)return true;return false;},
     picCSS='.SidePic{background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOoAAADcCAYAAAB+tz3+AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAABOBSURBVHhe7d15bBzXfQfw3x7k8r4PkRTJpUhKsqojtlTncp04VZTDjhukSBs3QgInteKrcJr2jxZ2/zDSoGiBukCSNkbiRnHrFmhTpGmTIE5rx/UftY3KcmInMXVYpEiK9yVeIrnkLjvftzPWcrk8dnZ2xTfz/QDrmdld0vbj+86bN/PejO9S78CqGFZjKxJbWTaWMWzhLcqivXv3mmv6ubawKMNjk6wzOaSCGluJSH7QL5WVlVJUVCSBQMD8mLLhwoULWge1u2/QCCjrTC753urpXc3zi+zatUsV9srKikSjUfNjchoqte5BvXS5T1hncgd1xo9DF+wVUeCRSIQFTltinck9P/oXSCz2iqur7GfQ1lhncs84gFkVv98vMXVCgGg7WGdyzQiq0VH1+bhnpLSwzuSWCioR7WwMKpEGGFQiDTCoRBpgUIk0wKASaYBBJdJAVoP64i/H5YFv/EwefPLn8uxrI+a7RBu7evWqGgt98eJFmZycNN+lrAV1cjYi337usjTXFkn7rmJ55n/65IdnhsxPidZbXl6W4eFhKSgoUK+RkRGZmJgwP/W2rAV1eGpRorFV+cS7GuWPPt4p795XJf/20oAKMFEqGOCP0U41NTXS3NwsZWVlMjY2pgLsddlrUefigawozlPLT93erIL70jnuISk1DPKHYDColnV1dSq4MzMzatvLshbUN/tnpaQgKPUVBWq7ujRfrfeMXFPbRMnm5+fV1Ln8/Hy1nZeXp9YXFxfVtpdlJajT88vyyvlJOdZZKT6f+aYhFPTLcpQzLmg9tKazs7NSWlpqvhOHWToc/J+FoC6vxOQbP+5W63ff2qCWlsXlqAorUSIEcXBwUK2jf5oIU+kwU8frfOfPn1/FbUGuXdv+ISl2cK9cmFQnjADleLClTAJ+n3zn+V7pHpmXL3yoTW47cL3QFyJRuf/vfiYdDcVyrKNSggG/+n5+0CehvIBUGYfG4boi9Z6bueFWLNZ/fzp1BtDXxAkjS3FxsQohzvQuLCxIY2OjlJeXm5/GQ4p/V2FhoWpp8V3rhZYWfVmcHXZ7kFFnbAUVYXzu9VFzKw5lhQCXFeXJ54+3ylEjjIn+78KUfPWHb5lbqdVXhORLv9UpTdWF5jvu49WgIoxTU1Pm1loIHO6/lHzYi2APDAyYW6mhD7t7924JhULmO+5jO6j3fvWsvGd/ldx3ok1t43D30Wd+JbfdVCMfvLlOCvM3vyMdAh0z/hGLrcqK8VqMxGRgckFOP3dZnYB6/PcOmN90H68G9dy5c6q1bGiId4dwuNvd3a3eq6qqUi3kVqy+KpZobZeWltQOACegwuGw+syNUGdsdRgRzJqy63uwPKPfWV6cJ3e/s2HLkAJaXxzi4ufw/cqSPHXo/M59VeqwmdwH4cJZXAsOV9GSok+6nZBC8mEvDp1xrRWHzW5n+8wOWkMnXVuKysXBOSO08VPz5D5Wi+gU3P0Qrbp13dXNbvgpWAwz/Mp3z8ljxqFzV/+svO/X1p71I0o2NDQkvb290tPTo4JaUVFhfuJeNzyonzselkc/uV/+8rMH1YmoCQ4xpC2gn9va2irt7e2qNfXCEMMbHlSL3+iz4nA6GHD3qXZyFg6n3X55Bm5oUMdmltTh7pt9M3L6+V6ZW1xR11iJNoLWE4e7GG6IM77opyZf1nGjGxrUoclFebN/Rl6/PC0vdU1IZ2OJHA5fv+BNlAyXZBBSvHCdFYMhSkpKzE/dy9GgpntSD6H87fc0yT23N8u+plJZiTp7VpDcB6Gsra1VM2sQUqfPJO9UO6KPGlmJSc/IvDTXuHdEEjkLAx4wq8bNI5ISZRRUjPX90avDahxvugaNw95/f2VQ/vV/r8iX/+WczC+tyAcO15qfklthrC/u2mDnuTX42fHxcTWZHJdn0D/FU+W8IKOg/tOL/TI1F5GfvjGmttOZwoYJ5fuNw926spBqTe881iAdDe7va3gdbq+CKW3WuN90AouhghhOhxFOaE2rq6vV4a8XZBTUOw7VysjVJTnaXqH6p3/y9C/l9HO96i4OW10PLQoF5KbmUuNVprZryjgiyQswOAEto3WmFuN9cfYWJ4a2uh5qBRUvSByS6Ha2BuX/8elfqGue772pWl3/RB/zJ6+NqDG7swsrajggYHt3dZHUludLSWFQAmqcZvx6KZbR6Kq8emlKRo2w//XnDqvvu51XB+VfunRJnfjBIHxc90RLilYVAxZwCGs9DBnb6HcihNbQQHzful6KJSaYI9TWgAe3Q52xFdS3hubkyWd7kuajlstDd+6R4lBQ+sevyYXBOekenpeBiQUZN1rX+cWVdWd18XOY0nby/S1qUL4XeDWoGDiPyeHJ81GbmppUS4nLLvh9+B6+gyAivKnO6iLI9fX16ue9wHZQyT6vBpXsQ53ZEZdniGhzDCqRBhhUIg0wqEQaYFCJNMCgEmmAQSXSAINKpAEGlUgDDCqRBhhUIg0wqEQaYFCJNMCgEmmAQSXSAINKpAE1cdwLNzDeSebm5rSfOM46k1tv3+GBcsctd3ig3OGtWHKMt2KhdPFWLESaYFCJNMCgEmmAQSXSAINKpAEGlUgDDCqRBhhUIg0wqEQaYFCJNJDVoE7PL8vzb4yaW0RbS3waOV2X1aD+55kh+d7LgxIz/jV4BibRViYmJmR8fFz8ftaZRFkLKlrTF94YU8ufGksvPcad7LFaUyynp6dZZxJkLahoTSMrMbX+/ZevyHJUuIekTaE1tZ4wPjIyopasM3FZCerUXLw1tVydj8izZwe4h6QNJfdNl5eXZWyMR2KWrAT1BwmtqeX7L/dLJLrKPSSllNiaWoaHh9WSdSYLQZ2ai8gLv7jemlrQV/3xq4PcQ9I6G53pxfujo6OsMwbHg/qDM8OynNSaWv6DrSqlkKo1tbCvGudIUOcWV6Rv7JqcuTiVsjW1zFxbln9+oUcm5lYk9Z+FvCIajcrS0pLMzs5uet0UrerAwIDEYql3/l6R9j2TfvLaiPSMXpPJ2Yg6zJ0wlsn90e0oDgWltb5I2uqKJFxfrJb1lQXiMz93Ky/eM2lyclIWFxfVCSIED8uNWtDNoFUtKChY88rPzzc/dS/UmbSDemloXr7y3XO2wrmVwvyAHGmrkC98KCx5wayc57rhvBjUhYUF6evry0qriIERpaWl0tDQID6fO3fztm5u1t5QLA/f2S7+LBRKVWlIPnu8Q8rLSngCwUUKCwulsbExK0FCi9rc3CzFxcWurjO2mq1b2ivkMx9oMbeccbitUv7i3pvV4S8OjfAi90CrV19fb245A79z//79EgqFXF9nbB9fHj9SJx+7tcHcyszxmxvkz+45JCUFQYlEIgypS1VWVkp1dbW5lZmamhrp7OxU/VYv1JmMOoK/c9tuee9N9gseR0Kf+c098uCde41DaVFnAXGygdyrrq5OysvLzS17du/eLa2trWrdK3Umo6Cix3HfiTY50FIWfyNND921Tz7+7mZ1BhAFjlP25H448YM+pR3hcFgdQnutzmQUVAgGfPLFj3VInrFMV31FgVri1L3Xr5N5CU4qoVW0c3LJuhzjtTqTcVBhMRKV5Wj618UwAALsXFMjvaEltPN3tw5zvVZnHAlqz8i8uZaeybmIWrr1+hdtDC2iHdZJI6/VGWeCOmrvqV4z894sdLIfVKtFZVBt6B6216JOzS2pJYPqPWxR0+NIUC9v0KLiumhr3cZn9zD1DRhU79koqLguipFMG2FQbcKgfOukkKWhqlBOfbhTvvnIu+RvTh2Txz99SH59b7VRuOYXTFPz8T4qeQvClnztE6OLWlpa5PDhw3LgwAHp6OhIeb3Vq9fZMw5q4omkQ+EK+dPfPShff+BW+fCxRgn6VtWes72+QB65a4888fkj8hHj/YL8+NxC3KIF2KJ6S2JrimGACOXBgweltrZWXXLB5xi3i/HBGH2E9zH4Htii2nRlfEF+40CN/NW975DHTx6RYx1Vxl5vWc2YwNCuxGtdtWX58unbm+Rrp94hJ+8IS9AsfAbVWzBQAa0lZuDgVVZWpgKYqs4Eg8G3hwsmzpDxWp1Je5pbsmhsVQJ+n7oQjQJO59DE+FHJzwuqvSX+QF7gxWluyXANFEGzU2cA4fVancm4RUVIAYWWboHjR/EzXilwirNaQzt1BrxYZzIOKhFlH4NKpAEGlUgDDCqRBhhUIg0wqEQaYFCJNMCgEmmAQSXSAINKpAEGlUgDDCqRBhhUIg0wqEQa8K3ypro555b5qJQ7auJ4SUmJuUm5MDc3p31QWWdy6+07PFDusEWldGV8KxZKD2/FQuly5FYsRJR9DCqRBhhUIg0wqEQaYFCJNMCgEmmAQSXSAINKpAEGlUgDDCqRBhhUIg3YGuv7es+0fOu/euSq+Wh/J1QU58l9J9rkSNv6p0y7idfH+mLm0NDQkK2nuG0Ej2HEs1PdOqPH9lhfp0MK+H1P/fdlCQTiTyMnd3I6pIDfNzw87Oq6YyuoTofUMjUXUQ+3JfdyOqQWPLHczXVnx/VRvfbId3KOm+uOrT7qySfOmGtrfe+x95lrW/vEn79orq2F3+HmeY5e76N2dXWZa2sdPXrUXNva2bNnzbW18DvcWHeyMh8VBbWdF1GyVPUk1cuLHG1RncAWdefLRovqBLaoRHRDsY+aY2xR2UdNF/uotKOkqiepXl7EPmqOsUVlHzVd7KMSaSKnfdSN+qWJ2KLufDeij7pRvzQRW9Q0oKA2ehFtJlWdsV5exz5qjrFFZR81XeyjEmnCVlAxdzQbKko4c8btMHc0G/LyslMndwpbQf39E22Oh6qqNCQP37VP+LhWd8MEb6dDhd/X2trq6rpjq48KmKSL+X/W1KKu/ml59Omfq3XLiVsa5NRHOsW/zelHKOhIJCLRaNR8x3283keF5LqDuz4Y9VCtW2pqaqSlpWXbU9fcXHcy6qOiQBYWFtQfC6/FxSXzEyP9xuue94fl/o/ulZjxPes7W73w+9wcUopbX3cWzU/iGhsbVQuJ7yXWj81ebq87jp9MCvh98vDd++WTt7WqWffYyxFtB1rPcDisDo9Zd9ZyLKglBQGpNPqtj37qkNxxuF4VMgqbaCs4FMZJpo6ODqmurmbdScGxoDZVF8rf3n+zHGmrkKWlpazdG4fcJxQKyb59+6S0tJR1ZwOOHvrGYjH2M8kW1p3NOd5HJSLnMahEGmBQiTTAoBJpgEEl0gCDSqQBBpVIAwwqkQYYVCINMKhEGmBQiTTAoBJpgEEl0gCDSqQBBpVIAwwqkQYYVCINqNuFlpSUmJuUC7g9pu63C2Wdya237+tLueOW+/pS7ti+ATfZwxtwU7r4kCgiTTCoRBpgUIk0wKASaYBBJdIAg0qkAQaVSANaBRXXkzZ7EbkVW1QiDTCoRBpgUIk0wKASaYBBJdIAg0qulurqgPXSCYNKpIGsBXVsbExOPnFGLYm2A3Wlq6uLdSaFrAR1dHRU/vAfL6t1LMfHx9U60UZQZ6x6giXrzFpZCeqXnuk11+K++A89MjU1ZW4RrYVQTkxMmFtxaFVZZ65zPKjJBW75g9NvseAppY0OdYeHh1lnTI4GFSF95Olutf7YR0vla/d2qKWFYaVkiTt2n88nu3btUksLwxrnWFBRmFZIYc+ePdLU1CStra3rwjozM2NukZehzqBvCghnYp1JDqvXORJUFDgCaPn2w0ekoqJClpaWpLCwUFpaWtaE9cGnzptr5FWoM1YArZAm15nEsE5PT5tr3pRxUJNDikBaBR6NRtV7uLicHFavF7yXJYYUEkOaXGessA4ODnq6zmQUVBRcckhR6IkFbkkO60N/f0HdMZ68BXUmMaQIYnJILanC6tU6YzuoKHCEzWKFFIWeXOCW5LDe/80uhtVDUGcQNot1yJsqpBarzlj6+/s9WWdsBTVVSNvb29/eM24mueAZVm9IFVKrzmwUUgvqjNWqghfDmnZQZ2dn14W0s7NTysvLN90zJkLBW60qIKx8PIJ7oc4khzSxzmxHOBxeF1Yv1Zm0g/rAt86Za9dDWlpauu2QWlDwiWE99eSvGFYXQkivXLlibl0Pabp1pqCgYF1Y+/r6PFNn0gpq4uFGJiEFq+ATMazu40RILclhXV1d9UxY0woqDlEh05BaUPBPPXjI3IrDIU0gEDC3yC0yDaklVVi9UGdsnUxyosAtyWH98o9mJBQKmVvkBk6F1JIqrG6vM2kH9elHbnGswC2pWlZyB7R0TobUYoUVv98LTz9P+0HGGN4ViUQcK/BEKPT8/HyJxWLqj5oMZ4s3o0NfBf8PXnqQMVo6v9+/I+uMLn1b/D+k3aIuLCxkpcABvxe/P1WBk57wt2SdyZytPioR5RaDSqQBBpVIAwwqkQYYVCINpH15ZqtLJDcSL8/kRjqXZ240t1yeSTuolBkGNbfcElQe+hJpgEEl0gAPfXPMS4e+mx127gQ6HfoyqDnmpaCSM9hHJdKECirm81lz+4i2i3Umd4yg+tQUIUxFItou7NxZZ3LH7zMKG32NYDDIPSRtU3znzjqTO35/ME89YgDz+jAB1+33nqHMWTt31pnc8V3qHViNrUQklBeQyspKdQcHFnx26X7W99LlPslDp8loTVlnckMFFStGWiW2smwsY9jCW5RFOge1u2/QqCsRKSrIN9+h7BL5f6+29fPXjHR5AAAAAElFTkSuQmCC") !important;}',
     uWin=MustGetUnsafeWin(),
         
         //文章信息
         Article =
             {
                 // 语法糖,防止出现null
                 id:parseInt((/[0-9]{4,6}/.exec(location.href))+'',10),
                 notArt:true,
                 title:$('#news_title').html(),
                 //取发布时间
                 publish_date:(function(){
                     var author = $('.date');
                     if(author.length<1){return new Date();}
                     var t = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/.exec(author.html());
                     return new Date(t[1],t[2]-1,t[3],t[4],t[5],t[6]);
                 })()
             },
                 // 评论相关函数
                 CB_comment=
                     {
                         //定义常量
                         GETTER_STYlE:'#yigle_net_yueguangbaohe{border-radius:5px;overflow:hidden;position:fixed;top:20px;right:50px;width:50px;height:50px;background:black;cursor:pointer;opacity:0.9;} #y_tips{position: fixed;bottom: 25px;right: 5px;width: 260px;padding: 6px;color: rgb(255, 255, 255);background-color: rgb(0, 0, 0);text-align: center;}'
                         +'.commt_list .comment_avatars,blockquote .re_mark,blockquote .title,.rating_box ,.commt_list > nav,.article .navi,#post_sync{display:none !important;}'+
                         ' .commt_list .comment_body {padding-left:5px !important;} span.datetime{cursor: pointer;}'+
                         '.post_commt .textarea_wraper{display:inline;} .commt_sub{right: 100px;top: 1px;position:absolute !important;} #post_tips{top: 80px;} .commt_list dd {margin: 0px !important;}'+
                         '.commt_list blockquote,.commt_list blockquote p.re_text{margin:0 0 0 10px !important;padding: 0px !important;} .pm{padding-left:10px;padding-right:10px}',
                         
                         //按照月光宝盒定义
                         BOX_ID:'yigle_net_yueguangbaohe',
                         // 提示显示时长
                         TIP_TIME:4500,
                         //定义元素
                         boxEl:document.createElement('div'),
                         moonEl:document.createElement('canvas'), 
                         
                         // 获取的数据
                         showLv:0,//控制评论显示的优先级
                         isReq:false,
                         // 其他
                         isFirst:true,
                         
                         //画图标 来自月光宝盒
                         draw_a_moon:function (auto){
                             Log('enter draw_a_moon');
                             GM_setValue('auto',auto);
                             var context;
                             this.boxEl.style.backgroundColor =auto ? '#adcaec' : 'black';
                             this.boxEl.style['z-index']=100;
                             this.moonEl.title = auto ? '右击切换到手动模式' : '右击切换到自动模式';
                             $(this.moonEl).attr('auto',!!auto);
                             context = this.moonEl.getContext('2d');
                             context.clearRect(0,0,300,300);
                             //var x = -1;
                             //var y = -1;
                             context.beginPath();
                             context.fillStyle = '#ffffff';
                             context.strokeStyle = '#ffffff';
                             context.arc(19, 25, 20, -1.5*Math.PI/2, 1.5*Math.PI/2);
                             context.fill();
                             context.arc(19, 25, 20, -1.5*Math.PI/2, 1.5*Math.PI/2);
                             context.closePath();
                             
                             context.stroke();
                             context.beginPath();
                             context.fillStyle = auto ? '#adcaec' : 'black';
                             context.strokeStyle = auto ? '#adcaec' : 'black';
                             context.arc(2, 25, 25, -Math.PI/2, Math.PI/2);
                             context.fill();
                             context.arc(2, 25, 25, -Math.PI/2, Math.PI/2);
                             context.closePath();
                             context.stroke();
                             if(!this.isFirst)this.TipAdd('进入'+(auto?'自动':'手动')+'模式');
                             else this.isFirst=false;
                             Log('leave draw_a_moon');
                         },
                         // 添加Tip 提示 来自月光宝盒
                         TipAdd:function (s)
                         {
                             Log('enter TipAdd');
                             $('#y_tips').remove();
                             var tip=document.createElement('div');
                             $(tip).attr('id','y_tips');
                             $(tip).html(s);
                             $('body').append(tip);
                             try{
                                 $(tip).fadeOut(this.TIP_TIME,function(){$(this).remove();});
                             }
                             catch(e)//fx似乎有点问题
                             {      
                                 Log('fadeOut error!');
                                 try{
                                     window.setTimeout(function(){var x=document.getElementById('y_tips');x.parentNode.removeChild(x);},CB_comment.TIP_TIME-1000);
                                 }
                                 catch(e1)
                                 {Log(e1.message);}//sorry,no idea here..
                             }
                             Log('leave TipAdd');
                         },
                         // 判断是否过期
                         ifDated :function (){
                             Log('enter ifDated');
                             
                             var publish_day = Article.publish_date,
                                 
                                 //今天0时的时间戳
                                 date = new Date(),
                                 today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
                             return ((date-publish_day)/(24*3600*1000)) >= 1;
                         },
                         // 通过hook网页的代码来设置评论
                         // ifSql控制是否写到websql
                         setComment:function (data,ifSql)
                         {
                             try{
                                 Log('start json parse');
                                 var ret,newdata;
                                 //  未还原的字符
                                 if(typeof data=='string'){
                                     //是新格式?
                                     newdata=data.match(/^okcb\d*\((.*)\)$/);
                                     //去掉头
                                     if(newdata)
                                         data=newdata[1];
                                     //还原
                                     ret=JSON.parse(data);
                                 }
                                 else //否则直接使用
                                     ret=data;
                                 //新格式要对结果base64
                                 if(typeof ret.result == 'string'){
                                     ret.result=JSON.parse(uWin.$.cbcode.de64(ret.result,true,8));
                                 }
                                 //是否有评论
                                 if(typeof ret.result.cmntstore ==='undefined' ||ret.result.cmntlist.length<1)return;
                                 //websql操作
                                 if(ifSql&&window.openDatabase)
                                 {
                                     var db=window.openDatabase('cbComment','1.0','For cb Helper',10*1024*1024);
                                     db.transaction(function (tx) {  
                                         tx.executeSql('CREATE TABLE IF NOT EXISTS cbdata (id unique, data)');
                                         var data=JSON.stringify(ret);
                                         tx.executeSql('select id,data from cbdata where id=?',[Article.id],function(tx,ts){
                                             if(ts.rows.length<1)tx.executeSql('insert into cbdata (id, data) values(?,?)',[Article.id,data]);
                                             else tx.executeSql('update cbdata set data=? where id=?',[data,Article.id]);
                                         });
                                     });
                                 }
                                 // 10.10 修正内容清空
                                 $('#J_commt_list').html('');
                                 $('#J_hotcommt_list').html('');
                                 //hook并实现评论显示
                                 uWin.GV.COMMENTS.CMNTDICT=ret.result.cmntdict;
                                 uWin.GV.COMMENTS.CMNTLIST=ret.result.cmntlist;
                                 uWin.GV.COMMENTS.HOTLIST=ret.result.hotlist;
                                 uWin.GV.COMMENTS.CMNTSTORE=ret.result.cmntstore;
                                 uWin.GV.COMMENTS.SHOWNUM=ret.result.cmntlist.length;
                                 uWin.GV.COMMENTS.MORENUM=100;
                                 uWin.GV.COMMENTS.MOREPAGE=1;
                                 uWin.GV.COMMENTS.PAGE=1;
                                 // 拓展变量作用域
                                 var genList,genHotList,_hook,self,loadCmt,cmtList,lastT,more,
                                     initData,bindAction,fixed_top;
                                 var GV=uWin.GV;
                                 var CB=uWin.CB;
                                 Log('eval begin');
                                 // 去掉函数调用以及声明
                                 eval('_hook='+uWin.$.cmtOnload.toString().replace('initData(1)','').replace(/var/g,''));
                                 Log('_hook start');
                                 _hook('.commt_list');
                                 $("#comment_num").html(ret.result.comment_num);
                                 $("#view_num").html(ret.result.view_num);
                                 $(".post_count").html('共有<em>'+ret.result.comment_num+'</em>条评论，显示<em>'+ret.result.join_num+'</em>条').fadeIn();
                                 uWin.initData=initData;
                                 uWin.genList=genList;
                                 genList();
                                 Log('genHotList start');
                                 $("#J_hotcommt_list").parent().show();
                                 genHotList();
                                 bindAction();
                                 return true;
                             }
                             catch(e)
                             {Log(e.message); return false;}
                         },
                         // 获取内容
                         GetContent :function()
                         {
                             Log('enter GetContent');
                             // 文章id
                             var id=Article.id,
                                 //2个停用的源
                                 //  yg_url = 'http://yueguang.sinaapp.com/?id=' + id,
                                 // iz_url = 'http://py.imorz.tk/tools/cb/hotcomment/'+id,
                                 my_url = 'http://aws.itkso.com/node/cb/'+id,
                                 offical_url = 'http://api.cnbeta.com/capi/phone/comment?article=' +id;
                             //从个人服务器获取数据
                             function fetchMyUrl()
                             {
                                 GM_xmlhttpRequest({
                                     timeout:1000*30,//服务器比较破没办法
                                     method: "GET",
                                     url:my_url,
                                     onload: function(response) {
                                         CB_comment.iz_Req=true;
                                         var data=response.responseText;
                                         if( data.length>1)
                                         {
                                             if(CB_comment.setComment(data,true)){
                                             CB_comment.showLv=4;
                                                CB_comment.TipAdd('个人服务器获取数据成功');}
                                         }
                                         else
                                         {
                                             CB_comment.TipAdd('个人服务器没有收录此页面评论数据');
                                         }
                                         
                                     }
                                 });
                             }
                             // 官方
                             function fetchOfficalPhoneUrl()
                             {
                                 GM_xmlhttpRequest({
                                     method: "GET",
                                     url:offical_url,
                                     onload: function(response) {
                                         if(CB_comment.showLv>3)return;
                                         CB_comment.iz_Req=true;
                                         var data=JSON.parse(response.responseText);
                                         // 官方手机api返回数组型,需转成需要的形式
                                         if( data.length>0)
                                         {
                                             var newdata={u:[],cmntdict:{},hotlist:[]},lis=[],sto={};
                                             data.forEach(function(i)
                                                          {
                                                              sto[i.tid]={tid:i.tid,
                                                                          name:'CB官方API',//用户名
                                                                          comment:i.comment,
                                                                          reason:i.against,
                                                                          date:i.date,
                                                                          score:i.support,
                                                                          host_name:'里世界'//ip
                                                                         };
                                                              lis.push({tid:i.tid,parent:''});
                                                          });
                                             newdata.cmntlist=lis;
                                             newdata.cmntstore=sto;
                                             newdata.comment_num=newdata.join_num=lis.length;
                                             Log(newdata);
                                             if(CB_comment.setComment({result:newdata},false)){
                                             	CB_comment.showLv=3;
                                                 CB_comment.TipAdd('官方手机API获取数据成功');}
                                         }
                                         else
                                         {
                                             CB_comment.TipAdd('官方手机API未得到数据');
                                         }
                                     }
                                 });
                             }
                             function fetchData()
                             {
                                 fetchOfficalPhoneUrl();
                                 fetchMyUrl();
                             }
                             // 先查询本地是否有数据
                             if(window.openDatabase)
                             {
                                 var db=openDatabase('cbComment','1.0','For cb Helper',10*1024*1024);
                                 db.transaction(function (tx) {  
                                     tx.executeSql('CREATE TABLE IF NOT EXISTS cbdata (id unique, data)');
                                     tx.executeSql('select id,data from cbdata where id=?',[Article.id],function(tx,ts){
                                         if(ts.rows.length<1)
                                         {fetchData();}
                                         else 
                                         {CB_comment.setComment(ts.rows.item(0).data,false);}
                                     });
                                 });
                             }
                             else 
                             {
                                 fetchData();
                             }
                         },
                         // 显示
                         ShowContent:function()
                         {
                             if(!this.isReq)
                             {
                                 this.isReq=true;
                                 this.GetContent();
                             }
                         },
                         //添加移动站内容
                         AddMobileComment:function()
                         {
                             var url='http://m.cnbeta.com/wap/comments.htm?id='+Article.id;
                             GM_xmlhttpRequest({
                                 method: "GET",
                                 url:url,
                                 onload: function(response) {
                                     CB_comment.iz_Req=true;
                                     var data=response.response;
                                     //Log(data);
                                     if (CB_comment.showLv<1)
                                     {
                                         Log($(data).filter('.content'));
                                         $('#J_commt_list').html($($(data).filter('.content')));
                                         CB_comment.showLv=1;
                                     }
                                     CB_comment.TipAdd('移动站数据抓取成功'); 
                                 }
                             });
                         },
                         //初始化
                         init_Comment:function()
                         {
                             // 没过期不显示
                             Log('enter init_Comment');
                             //优化评论,不要那么的多 在DOM变动的时候处理
                             $('.commt_list').on('DOMNodeInserted',
                                                 function(e)
                                                 {
                                                     if(e.target.nodeName!='DL')return true;
                                                     $(e.target).find('.datetime').html('<span ref="p" class="pm">+1</span><span ref="m" class="pm">-1</span>点击出现支持反对');
                                                     $(e.target).find('.re_mark').hide();
                                                     return true;
                                                 });
                             // 处理上面添加的按钮的事件 通过冒泡想上一级发送
                             $('#J_commt_list dl').live('click',function(e1)
                                                        {
                                                            if(e1.target.className=='datetime')
                                                            {
                                                                Log('you click show bar');
                                                                $(this).find('.re_mark').show();
                                                                return false;
                                                            }
                                                            else if(e1.target.className=='pm')
                                                            {
                                                                var pm=$(e1.target).attr('ref'),
                                                                    node='.comment_body>.re_mark a[action-type=against]';
                                                                if(pm=='p')
                                                                    node= '.comment_body>.re_mark a[action-type=support]';
                                                                uWin.jQuery(this).find(node).click();
                                                                if(pm=='p')CB_comment.TipAdd('支持了一下');
                                                                else CB_comment.TipAdd('反对了一下');
                                                            }
                                                                });
                             //按照月光宝盒的要求写入
                             this.boxEl.id = this.BOX_ID;
                             $(this.boxEl).append(this.moonEl);
                             $('body').append(this.boxEl); 
                             //判断是否启动自动模式
                             var Auto=GM_getValue('auto',false);
                             this.draw_a_moon(Auto);
                             //是否过期
                             
                             if(!this.ifDated())
                             {
                                 $(this.moonEl).click(function()
                                                      {
                                                          CB_comment.AddMobileComment();
                                                          return false;
                                                      });
                                 return;
                             }
                             
                             //自动的话显示评论
                             if(Auto)
                                 this.ShowContent();
                             //右键转为自动模式,左键显示过期评论
                             $(this.moonEl).mousedown(function(e)
                                                      { 
                                                          if(e.which==3)
                                                          {
                                                              var status=($(this).attr('auto')=='false');
                                                              CB_comment.draw_a_moon(status);
                                                              $(this).attr('auto',status);
                                                          }
                                                          CB_comment.ShowContent();
                                                          return false;
                                                      });
                             // 取消默认右键打开上下文菜单
                             $(this.moonEl).bind('contextmenu',function(e){
                                 return false;
                             });
                             Log('leave init_Comment');
                         }// function init_Comment
                     },// var CB_comment
                         
                         CB_Widget={
                             // 收藏列表
                             favs:[],
                             // 标志是否显示收藏
                             showFav:false,
                             // css
                             Widget_CSS:'.dig_box a:link{background-position:  -141px 0px !important;} .dig_box a:hover{background-position:  0px 0px !important;}'+
                            
                             '.fav_box a:link{background-position:  -141px -55px !important;} .fav_box a:hover{background-position:  0px -55px !important;}'+
                             '.cmt_box a:link{background-position:  -141px -110px !important;} .cmt_box a:hover{background-position:  0px -110px !important;}'+
                              '.back_box a:link{background-position: -141px -165px !important;} .back_box a:hover{background-position: 0 -165px !important;} .del{margin-left:5px}'+
                             '.left_content{margin-left: -490px;width: 200px;background-color: white;opacity: 0.7;border-radius: 0 9px 9px 0;overflow-y: auto;}.left_content dd{color: black !important;}'+
                             '',
                             // 初始化总侧边工具
                             init_widget:function()
                             {
                                 //评论框按钮设置id下边会添加一个评论框按钮样式
                                 $('.cmt_box').attr('id','cmt_box_btn');
                                 //右边的内容框
                                 this.initContent();
                                 //添加返回
                                 $('<div>',{class:'left_art_box back_box cmt_box'}).html('<a href="/">喷水网</a>').appendTo('#left_art');
                                 $('.left_art_box a').addClass('SidePic');
                                 //事件重新设置
                                 this.ReBindListener();
                                 
                             },
                             initContent:function(){
                                 var cmtDiv=$('<div/>',{id:'cmtDiv'}).html('<textarea id="comment_text1" style="border:1px solid ;background-color: transparent; margin-top: 0px; margin-bottom: 0px; height: 120px;width:90%;display:block; " placeholder="填写评论" ></textarea>'+
                                                                           '<img id="safecode1" style="display:block;width:70px;margin-top: 5px;display: inline;" /> <input style="top: -20px;position: relative; width:70px;display:none;" type="text" id="vcode1" />').hide();
                                 var favDiv=$('<div/>',{id:'favDiv'}).hide();
                                 $('<div/>',{class:'left_art left_content'}).css('z-index','88888').appendTo($('.wrapper')).html(cmtDiv).append(favDiv).hide();
                             },
                             ReBindListener:function(){
                                 $('#left_art').off('mouseover');
                                 $('#left_art').mouseleave(function(){t=$(this);if(!t.hasClass('left_art_short'))t.addClass('left_art_short');});
                                 $('#left_art').mouseenter(function(){$(this).removeClass('left_art_short');});
                                 $('#dig_btn a').attr({title:'打分',id:'P5'}).html('<span id="N5" style="line-height: 2em;font-size:20px;">☆+5</span>').mouseover(
                                     function(){$('#N5').html('☆+5');return true;});
                                 $('#dig_btn span').css('z-index','789').mouseover(
                                     function(){$('#N5').html('☆-5'); return false;});
                                 $('#P5').off('click');
                                 $('#favorite_btn').attr('id','favorite_btn_');
                                 this.HideContentLinstener();
                                 
                             },
                             //主页要生成
                             initHome:function()
                             {
                                 if($('#left_art').length>0)return;
                                 $('<div/>',{id:'left_art',class:'left_art left_art_short'}).appendTo('.main_content');
                                 $('<div/>',{class:'left_art_box dig_box',id:'Back'}).html('<a title="" class="SidePic" href="#"></a>').appendTo('#left_art');
                                 $('<div/>',{class:'left_art_box fav_box',id:'favorite_btn_'}).html('<a title="显示收藏" class="SidePic" href="#">收藏</a>').appendTo('#left_art');
                                 this.initContent();
                                 this.init_Favs();
                                 this.ReBindListener();
                             },
                             init:function()
                             {
                                 this.init_widget();
                                 this.init_Favs();
                                 this.init_mark();
                                 this.init_comment(); 
                             },
                             HideContentLinstener:function()
                             {
                                 // 键盘和鼠标关掉评论框
                                 $('body').keydown(function(e){
                                     if(e.which==27)
                                         $('.left_content').hide();
                                     return true;
                                 });
                                 $('body').mousedown(function(e){
                                     if(e.which==1&&($(e.target).is('div')||$(e.target).is('p')||$(e.target).is('body')||$(e.target).is('section')))
                                         $('.left_content').hide();
                                     return true;
                                 });
                             },
                             // 初始化评论按钮
                             init_comment:function()
                             {
                                 // 评论框在指针到达时开始显示
                                 $('#cmt_box_btn').mouseover(
                                     function(){
                                         $('.left_content').show();
                                         $('#cmtDiv').show();
                                         $('#favDiv').hide();
                                         $('#comment_text1').focus();
                                     });
                                 
                                 // 刷新验证码
                                 function _imgload()
                                 {
                                     $.ajax({
                                         url: "\/captcha.htm?refresh=1",
                                         dataType: 'json',
                                         cache: false,
                                         success: function(data) {
                                             $('#safecode1').attr('src', data.url);
                                             $('body').data('captcha.hash', [data.hash1, data.hash2]);
                                         }
                                     });
                                     return false;
                                 }
                                 $('#safecode1').click(_imgload);
                                 // 处理回车显示验证码发送
                                 $('#comment_text1').keydown(function(e){
                                     switch(e.which)
                                     { case 13:
                                             //uWin.reloadcode(1);
                                             _imgload();
                                             $('#vcode1').show();
                                             $('#vcode1').focus();
                                             break;
                                         case 27:
                                             $('.left_content').hide();
                                             break;
                                         default:
                                             return true;
                                     }
                                     return false;
                                 });
                                 //发送评论
                                 $('#vcode1').keydown(function(e){
                                     if(e.which==13)
                                     {
                                         var id = Article.id;
                                         //把 内容写到对应位置,发送
                                         $('.form_input').attr('value',$(this).attr('value'));
                                         $('textarea[name="nowcomment"]').attr('value',$('#comment_text1').attr('value'));
                                         $('#post_btn').click();
                                         CB_comment.TipAdd('快速评论ing！！');
                                         $('.left_content').hide();
                                         $('#favorite_btn_').click();
                                         return false;
                                     }
                                     else return true;
                                 });
                             },
                             // 打分
                             init_mark:function()
                             {
                                 $('#P5').bind('click',function(){
                                     $('li[data-score=5]').click();
                                     CB_comment.TipAdd('5打分OK！！');
                                     return false;
                                 });
                                 $('#N5').click(function(){
                                     $('li[data-score=-5]').click();
                                     CB_comment.TipAdd('-5打分OK！！');
                                     return false;
                                 });
                             },
                             init_Favs:function()
                             {
                                 //收藏,从设置中获取
                                 $('.fav_box').show();
                                 this.favs=GM_getValue('favs','[]');
                                 if(this.favs =='undefined')this.favs=[];
                                 else{
                                     try{this.favs=JSON.parse(this.favs);}
                                     catch(e)
                                     {this.favs=[];}
                                 }
                                 $('.fav_box em').html(this.favs.length);
                                 // 添加到收藏
                                 $('#favorite_btn_').bind('click',function(){
                                     Log('click add_fav');
                                     if(Article.notArt){$(this).unbind('click');return;}
                                     $('.left_content').hide();
                                     var id = Article.id;
                                     //判断是否已存在
                                     if((CB_Widget.favs.join(',')+',').indexOf(id+',')>-1)
                                     {
                                         CB_comment.TipAdd('文章id:'+id+'已收藏!');
                                         return false;
                                     }
                                     //否则添加
                                     CB_comment.TipAdd('收藏文章id'+id+'成功!');
                                     CB_Widget.favs.push([id,Article.title]);
                                     GM_setValue('favs',JSON.stringify(CB_Widget.favs));
                                     $('.fav_box em').html(this.favs.length);
                                 }).mouseenter(function(){
                                     var s='';
                                     for (var i in CB_Widget.favs)
                                         s+='<dd><a class="art_title" href="/articles/'+CB_Widget.favs[i][0]+'.htm" >'+ CB_Widget.favs[i][1]+'</a><strong class="del" refid="'+CB_Widget.favs[i][0]+'" >删除</strong>';
                                     $('#favDiv').html(s).show();
                                     $('.left_content').show();
                                     $('#cmtDiv').hide();
                                 });
                                 //删除
                                 $('.del').live('click',function()
                                                {
                                                    
                                                    for(var  i in CB_Widget.favs)
                                                        if( CB_Widget.favs[i][0].toString() == $(this).attr('refid'))
                                                        {
                                                            CB_comment.TipAdd('删除收藏文章id'+CB_Widget.favs[i][0]+'成功!');
                                                            CB_Widget.favs.splice(i,1);
                                                            GM_setValue('favs',JSON.stringify(CB_Widget.favs));
                                                            $('cmtDiv').hide();
                                                            break;
                                                        }
                                                        });
                                 				$('.fav_box em').html(this.favs.length);
                             }
                         },//CB_Widget
                             HomePage={
                                 CSS:'.alllist .realtime_list{padding:0;}.alllist .realtime_list .update_time{right:10px !important;} .hate{opacity: .2;} .listtop{padding: 4px 6px;cursor: pointer;}'+
                                 '.realtime_list dt{width:100% !important} .CBset{margin-top:10px;padding:4px 0 0 10px !important;} #CBSwitch input[type=checkbox]{margin-left:8px;}',
                                 isOrig:false,
                                 isChange:false,
                                 OpenNew:false,//是否打开新窗
                                 hateTopic:'',//默认过滤
                                 //过滤标题
                                 filter:function()
                                 {
                                     if(HomePage.hateTopic=='')return;
                                     var reg=new RegExp(HomePage.hateTopic);
                                     function filterTitle(x){var z=$(x).find('dt a'),y=GM_getValue('filterMove',true);
                                                             if(!HomePage.OpenNew)z.attr('target','');
                                                              if(z.html().search(reg)>-1){
                                                                              if(!y)$(x).addClass('hate');
                                                                              else $(x).remove();
                                                              }
                                                            }
                                     $('.alllist dl').each(function(){filterTitle(this);});
                                     $('#allnews_all .items_area').on('DOMNodeInserted',
                                                                      function(e)
                                                                      {
                                                                          if(e.target.nodeName!='DL')return true;
                                                                          filterTitle(e.target);
                                                                      });
                                 },
                                 setting:function()
                                 {
                                     //获取过滤字符
                                     this.hateTopic=GM_getValue('hateTopic','小米');
                                     //添加设置页
                                     $('<li/>').addClass('tab_item').html('<a class="two">设置</a>').appendTo($('.cb_box:last nav ul'));
                                     // 设置界面
                                     var s='<p class="notice CBset" >文章标题过滤:多个关键词用|隔开<br/>'+
                                         '<input id="filterIn" style="width:150px" type="text" placeholder="多个关键词用|隔开" /><button id="filterOk">保存</button>'+
                                         ' <input type="checkbox" name="filterMove" style="margin-left:10px;" />直接移除</p>'+
                                         '<p class="notice CBset" id="CBSwitch">开关(刷新生效)<br/>'+
                                         '<input type="checkbox" name="global" />全局<input type="checkbox" name="share" />分享</p>';
                                     var a=$('<div/>').attr('id','side_set').hide().appendTo($('.side_news_list'));
                                     a.html(s);
                                     a.find(':checkbox').click(function(){GM_setValue($(this).attr('name'),this.checked);}).each(
                                         function(){if(GM_getValue($(this).attr('name'),true))$(this).attr('checked','true');});
                                     $('#filterIn').val(this.hateTopic);
                                     $('#filterOk').click(
                                         function()
                                         {
                                             GM_setValue('hateTopic',$('#filterIn').val());
                                             alert('设置成功,刷新生效');
                                         }
                                     );
                                     //必须调用原win的jQuery
                                     function set(){uWin.jQuery('.side_news_nav').tabs('.side_news_list>div',{event:'mouseover'});};
                                     uWin.setTimeout(set,1000);
                                     $('#setting').click(set);
                                 },
                                 init:function()
                                 {
                                     this.OpenNew=GM_getValue('OpenNew',false);//新窗
                                     this.isOrig=GM_getValue('org',false);//是否是原始风格
                                     
                                     //恢复官方样式
                                     var Original_Style=function()
                                     {
                                         if(!HomePage.isChange)return;
                                         //$('.realtime_list .brief').show();
                                         $('.realtime').parent().find(':first').before($('.hotpush'));
                                         $('.main_content_left > section').show();
                                         $('.content_body .realtime').append($('.realtime_list'));
                                     };
                                     //精简样式
                                     var New_Style=function(){
                                         HomePage.isChange=true;
                                         Log('enter New');
                                         Log($('.realtime_list'));
                                         Log($('#allnews_all .items_area :first'));
                                         $('#allnews_all .items_area :first').before($('.realtime_list'));
                                         $('.realtime_list').before($('.hotpush'));
                                         $('.main_content_left > section').not(':last').hide();
                                         $('.realtime_list .brief').remove();
                                     };
                                     // 修改样式
                                     var do_change=function()
                                     {
                                         Log('enter do_change');
                                         Log(HomePage.isOrig);
                                         if(HomePage.isOrig)
                                         {
                                             Original_Style();
                                             $('#Back a').html('精简');
                                             $('#Back a').attr('title','精简');
                                         }
                                         else{New_Style();
                                              $('#Back a').html('原始');
                                              $('#Back a').attr('title','原始');
                                             }
                                     };
                                     Log('enter homepage init');
                                     do_change();
                                     $('.allinfo .blue_bar').append($('.J_realtime').clone());
                                     var s='<span id="setting" class="fr listtop">设置</span>'+
                                         '<span class="fr listtop"><input type="checkbox" id="OpenNew" '+(this.OpenNew?'checked="true"':'')+ ' />新</span>';
                                     $('.allinfo .blue_bar').append(s);
                                     // 新窗按钮的事件
                                     function target(){if(HomePage.OpenNew)
                                         $('a[target="_blank"]').attr('target','');
                                                       else $('a[target=""]').attr('target','_blank');
                                                       HomePage.OpenNew=!HomePage.OpenNew;
                                                       GM_setValue('OpenNew',HomePage.OpenNew);
                                                      }                                               
                                     $('#OpenNew').click(target);
                                     
                                     this.OpenNew=!this.OpenNew;
                                     target();
                                     //左侧的widget修正
                                     $('#Back').click(
                                         function()
                                         {
                                             HomePage.isOrig=!HomePage.isOrig;
                                             GM_setValue('org',HomePage.isOrig);
                                             do_change();
                                         }
                                     );
                                     // 打开设置和过滤
                                     this.setting();
                                     this.filter();
                                 }
                             },
                                 CB_share={
                                     // 分享,来自 自古CB出评论脚本
                                     //sina_url:'http://service.weibo.com/share/share.php?title={{title}}&url={%url%}&appkey=696316965',
                                     CSS:'.genPic{margin-left:10px;cursor:pointer;color:#EB192D;} .yellow_bar h4{display:inline} #changeTemp{display:block !important;}',
                                     templateO:'{%comment%} ——「{%title%} {%tag%}',
                                     template:GM_getValue('template','{%comment%} ——「{%title%}」 {%tag%}'),
                                     init:function()
                                     {
                                         $('.hotcomments').on('DOMNodeInserted',
                                                              function(e)
                                                              {
                                                                  
                                                                  if(e.target.nodeName!='LI')return true;
                                                                  var t=$(e.target);
                                                                  if(t.find('.genPic').length>0)return true;
                                                                  var con= $(e.target).find('em').html();
                                                                  //对字数多的出现生成长图按钮
                                                                  if(con.length>140){
                                                                      var n=$('<span/>').addClass('genPic').html('生成长图');
                                                                      t.find('.title .time').after(n);}
                                                                  return true;
                                                              });
                                         //控制分享内容
                                         $('#popshare li a').attr('onclick','').live('click',function(){
                                             var tid = $(this).parents("#popshare").attr('data-tid');
                                             var conNode=$('#hotcon'+tid);
                                             var sharetitle=
                                                 CB_share.template.replace('{%comment%}',conNode.html().substr(0,80))
                                             .replace('{%title%}',Article.title)
                                             .replace('{%tag%}','#自古CB出评论# #CB评论#')
                                             .replace('{%tag1%}','#自古CB出评论#')
                                             ;
                                             var op={title:sharetitle,content:sharetitle};
                                             var pic=conNode.attr('pic');
                                             newopen=uWin.open;
                                             // 如果有图片,必须加上,通过hook open实现,通用性较低,新浪微博和qq可用
                                             if(pic)
                                             {
                                                 op.pic=pic;
                                                 uWin.open=function(a,b,c){if(b=='cnbetashare')a=a+'&pic='+pic+'&pics='+pic;newopen(a,b,c)};
                                             }
                                             uWin.shareJump(this,op);
                                             uWin.open=newopen;
                                         });
                                         $('.genPic').live('click',function()
                                                           {
                                                               var conNode=$(this).parents('div.comContent').find('em');
                                                               var title=conNode.html();
                                                               //获取长图的按钮
                                                               var pic=null;
                                                               GM_xmlhttpRequest({
                                                                   timeout:1000*30,
                                                                   method: "POST",
                                                                   url:'http://www.taichangle.com/taichangle.php',
                                                                   data:'text='+encodeURIComponent(title),
                                                                   headers: {
                                                                       "Content-Type": "application/x-www-form-urlencoded"
                                                                   },
                                                                   synchronous:true,
                                                                   onload: function(response) {
                                                                       var data=JSON.parse(response.responseText);
                                                                       if(data.errno==0)
                                                                       {
                                                                           pic='http://www.taichangle.com/'+data.image_url;
                                                                           CB_comment.TipAdd('长图获取成功!');
                                                                       }
                                                                       else
                                                                       {
                                                                           CB_comment.TipAdd('长图获取失败:'+data.error);
                                                                       }
                                                                       if(pic)
                                                                       {
                                                                           conNode.attr('pic',pic);
                                                                       }
                                                                   }
                                                               });
                                                               return false;
                                                           });
                                         $('.hotcomments header').append('<button class="fr" id="changeTemp">更改分享模板</button>');
                                         //参考 自古CB出评论 添加了官方的标签
                                         $('#changeTemp').click(function(){
                                             var template_input = window.prompt("「自古CB出评论」模板设置\n\n可用变量：\n{%title%} - 文章标题；\n{%comment%} - 评论正文；\n"+
                                                                                "{%tag%} - 标签；\n{%tag1%} - 单标签；\n\n默认值：" + CB_share.templateO + "\n\n", CB_share.template);
                                             if (template_input !== null && CB_share.template !== template_input) {
                                                 GM_setValue("template", template_input);
                                                 CB_share.changeTemp(template_input);
                                                 
                                             }
                                         });
                                     },
                                     changeTemp:function(s)
                                     {
                                         CB_share.template=s;
                                     }
                                 };
     //去除广告,建议是使用adp去除的
     function RemoveAD ()
     {
         Log('enter AdRemove');
         if(isRun())return;
         $('script').each(function(){if(this.src)return;if(this.src.match('baidu|google')||$(this).html().match('baidu|google'))$(this).remove();});
         $('iframe').remove();
         $('div[id*=baidu]').remove();
         $('div[id*=tanxssp]').remove();
         $('[class*=gbox]').not('[class*=imgbox]').remove();
         $('.adsbygoogle').remove();
         $('.bd_r').remove();
         $('#right4').remove();
         $('iframe').remove();
         $('#job_box').hide().parents('.cber').find('header').append('(点击展开)').click(function(){$('#job_box').show()});
     }
     function init()
     {
         Log('enter init');
         MAINCSS='iframe{display:none !important;}'
         if(isRun())return;
         window.setTimeout(RemoveAD,2000);
         var isMainPage=Article.notArt=isNaN(Article.id);
         //如果全局打开的
         if(GM_getValue('global',true))
         {
             MustAddStyle(picCSS+CB_comment.GETTER_STYlE+CB_Widget.Widget_CSS+HomePage.CSS+CB_share.CSS+MAINCSS);
             
             if(isMainPage)
             {
                 CB_Widget.initHome();
                 HomePage.init();
                 
                 return;
             }
             CB_Widget.init();
             $('#Back').remove();
             $('.cb_box a[target="_blank"]').attr('target','');
             CB_comment.init_Comment();
             if(GM_getValue('share',true))//分享
                 CB_share.init();
         }
         else//否则只显示设置
         {
             MustAddStyle(HomePage.CSS);
             if(isMainPage)HomePage.setting();
         }
     } 
     
     // 运行
     if(!uWin){Log('unsafeWindow no support!!!!!');return;}
     RemoveAD();
     init();
     if(!uWin.$)uWin.$=$;
     window.setTimeout(init,1000);
     window.setTimeout(RemoveAD,3000);
     function receiveMessage(msg)
     {
         if(msg.data=='show')
             init();
     }
     window.addEventListener("message", receiveMessage, false);
     $('<script/>',{'type':'text/javascript','defer':'defer'}).html('window.postMessage("show","*");').appendTo('body');
     
 }
)();// ==UserScript==
// @name           cnbeta 助手
// @description    cnbeta 评论找回 文章收藏 快速评论和打分 页面优化 分享增强 
// @include        http://cnbeta.com/articles/*
// @include        http://www.cnbeta.com/articles/*
// @include        http://cnbeta.com/
// @include        http://www.cnbeta.com/
// @namespce       itkso.com
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          unsafeWindow
// @icon            http://www.cnbeta.com/favicon.ico
// @require         http://static.cnbetacdn.com/assets/js/jquery.js
// @updateURL       https://userscripts.org/scripts/source/170299.meta.js
// @downloadURL     https://userscripts.org/scripts/source/170299.user.js
// @license         MIT License
// @version         0.5.2
// @run-at          document-end
// @author          @nowind
// ==/UserScript==
(function()
 {
     "use strict";
     //调试开关 总控所有输出
     function Log(s){
         var _LOG=0;
         if(_LOG)
         {console.log(s);}
     }
     // 获取不安全的win 
     function MustGetUnsafeWin()
     {
         if(window.unsafeWindow){return window.unsafeWindow;}
         //  脚本注入,在部分chrome中会失败
         var c=document.createElement('div');
         c.setAttribute('onclick','return window');
         return c.onclick();
     }
     //添加样式
     function MustAddStyle(s)
     {
         if(window.GM_addStyle)
         {GM_addStyle(s);}
         else
         {
             $('head').append($('<style/>').html(s));
         }
     }
     
     var 
     isRun=function(){Log('enter isrun');if($('.CBset').length>0||$('.SidePic').length>0)return true;return false;},
     picCSS='.SidePic{background-image: url("data:image/png;base64,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") !important;}',
     uWin=MustGetUnsafeWin(),
         
         //文章信息
         Article =
             {
                 // 语法糖,防止出现null
                 id:parseInt((/[0-9]{4,6}/.exec(location.href))+'',10),
                 notArt:true,
                 title:$('#news_title').html(),
                 //取发布时间
                 publish_date:(function(){
                     var author = $('.date');
                     if(author.length<1){return new Date();}
                     var t = /([0-9]{4})-([0-9]{2})-([0-9]{2}) ([0-9]{2}):([0-9]{2}):([0-9]{2})/.exec(author.html());
                     return new Date(t[1],t[2]-1,t[3],t[4],t[5],t[6]);
                 })()
             },
                 // 评论相关函数
                 CB_comment=
                     {
                         //定义常量
                         GETTER_STYlE:'#yigle_net_yueguangbaohe{border-radius:5px;overflow:hidden;position:fixed;top:20px;right:50px;width:50px;height:50px;background:black;cursor:pointer;opacity:0.9;} #y_tips{position: fixed;bottom: 25px;right: 5px;width: 260px;padding: 6px;color: rgb(255, 255, 255);background-color: rgb(0, 0, 0);text-align: center;}'
                         +'.commt_list .comment_avatars,blockquote .re_mark,blockquote .title,.rating_box ,.commt_list > nav,.article .navi,#post_sync{display:none !important;}'+
                         ' .commt_list .comment_body {padding-left:5px !important;} span.datetime{cursor: pointer;}'+
                         '.post_commt .textarea_wraper{display:inline;} .commt_sub{right: 100px;top: 1px;position:absolute !important;} #post_tips{top: 80px;} .commt_list dd {margin: 0px !important;}'+
                         '.commt_list blockquote,.commt_list blockquote p.re_text{margin:0 0 0 10px !important;padding: 0px !important;} .pm{padding-left:10px;padding-right:10px}',
                         
                         //按照月光宝盒定义
                         BOX_ID:'yigle_net_yueguangbaohe',
                         // 提示显示时长
                         TIP_TIME:4500,
                         //定义元素
                         boxEl:document.createElement('div'),
                         moonEl:document.createElement('canvas'), 
                         
                         // 获取的数据
                         showLv:0,//控制评论显示的优先级
                         isReq:false,
                         // 其他
                         isFirst:true,
                         
                         //画图标 来自月光宝盒
                         draw_a_moon:function (auto){
                             Log('enter draw_a_moon');
                             GM_setValue('auto',auto);
                             var context;
                             this.boxEl.style.backgroundColor =auto ? '#adcaec' : 'black';
                             this.boxEl.style['z-index']=100;
                             this.moonEl.title = auto ? '右击切换到手动模式' : '右击切换到自动模式';
                             $(this.moonEl).attr('auto',!!auto);
                             context = this.moonEl.getContext('2d');
                             context.clearRect(0,0,300,300);
                             //var x = -1;
                             //var y = -1;
                             context.beginPath();
                             context.fillStyle = '#ffffff';
                             context.strokeStyle = '#ffffff';
                             context.arc(19, 25, 20, -1.5*Math.PI/2, 1.5*Math.PI/2);
                             context.fill();
                             context.arc(19, 25, 20, -1.5*Math.PI/2, 1.5*Math.PI/2);
                             context.closePath();
                             
                             context.stroke();
                             context.beginPath();
                             context.fillStyle = auto ? '#adcaec' : 'black';
                             context.strokeStyle = auto ? '#adcaec' : 'black';
                             context.arc(2, 25, 25, -Math.PI/2, Math.PI/2);
                             context.fill();
                             context.arc(2, 25, 25, -Math.PI/2, Math.PI/2);
                             context.closePath();
                             context.stroke();
                             if(!this.isFirst)this.TipAdd('进入'+(auto?'自动':'手动')+'模式');
                             else this.isFirst=false;
                             Log('leave draw_a_moon');
                         },
                         // 添加Tip 提示 来自月光宝盒
                         TipAdd:function (s)
                         {
                             Log('enter TipAdd');
                             $('#y_tips').remove();
                             var tip=document.createElement('div');
                             $(tip).attr('id','y_tips');
                             $(tip).html(s);
                             $('body').append(tip);
                             try{
                                 $(tip).fadeOut(this.TIP_TIME,function(){$(this).remove();});
                             }
                             catch(e)//fx似乎有点问题
                             {      
                                 Log('fadeOut error!');
                                 try{
                                     window.setTimeout(function(){var x=document.getElementById('y_tips');x.parentNode.removeChild(x);},CB_comment.TIP_TIME-1000);
                                 }
                                 catch(e1)
                                 {Log(e1.message);}//sorry,no idea here..
                             }
                             Log('leave TipAdd');
                         },
                         // 判断是否过期
                         ifDated :function (){
                             Log('enter ifDated');
                             
                             var publish_day = Article.publish_date,
                                 
                                 //今天0时的时间戳
                                 date = new Date(),
                                 today = new Date(date.getFullYear(),date.getMonth(),date.getDate());
                             return ((date-publish_day)/(24*3600*1000)) >= 1;
                         },
                         // 通过hook网页的代码来设置评论
                         // ifSql控制是否写到websql
                         setComment:function (data,ifSql)
                         {
                             try{
                                 Log('start json parse');
                                 var ret,newdata;
                                 //  未还原的字符
                                 if(typeof data=='string'){
                                     //是新格式?
                                     newdata=data.match(/^okcb\d*\((.*)\)$/);
                                     //去掉头
                                     if(newdata)
                                         data=newdata[1];
                                     //还原
                                     ret=JSON.parse(data);
                                 }
                                 else //否则直接使用
                                     ret=data;
                                 //新格式要对结果base64
                                 if(typeof ret.result == 'string'){
                                     ret.result=JSON.parse(uWin.$.cbcode.de64(ret.result,true,8));
                                 }
                                 //是否有评论
                                 if(typeof ret.result.cmntstore ==='undefined' ||ret.result.cmntlist.length<1)return;
                                 //websql操作
                                 if(ifSql&&window.openDatabase)
                                 {
                                     var db=window.openDatabase('cbComment','1.0','For cb Helper',10*1024*1024);
                                     db.transaction(function (tx) {  
                                         tx.executeSql('CREATE TABLE IF NOT EXISTS cbdata (id unique, data)');
                                         var data=JSON.stringify(ret);
                                         tx.executeSql('select id,data from cbdata where id=?',[Article.id],function(tx,ts){
                                             if(ts.rows.length<1)tx.executeSql('insert into cbdata (id, data) values(?,?)',[Article.id,data]);
                                             else tx.executeSql('update cbdata set data=? where id=?',[data,Article.id]);
                                         });
                                     });
                                 }
                                 // 10.10 修正内容清空
                                 $('#J_commt_list').html('');
                                 $('#J_hotcommt_list').html('');
                                 //hook并实现评论显示
                                 uWin.GV.COMMENTS.CMNTDICT=ret.result.cmntdict;
                                 uWin.GV.COMMENTS.CMNTLIST=ret.result.cmntlist;
                                 uWin.GV.COMMENTS.HOTLIST=ret.result.hotlist;
                                 uWin.GV.COMMENTS.CMNTSTORE=ret.result.cmntstore;
                                 uWin.GV.COMMENTS.SHOWNUM=ret.result.cmntlist.length;
                                 uWin.GV.COMMENTS.MORENUM=100;
                                 uWin.GV.COMMENTS.MOREPAGE=1;
                                 uWin.GV.COMMENTS.PAGE=1;
                                 // 拓展变量作用域
                                 var genList,genHotList,_hook,self,loadCmt,cmtList,lastT,more,
                                     initData,bindAction,fixed_top;
                                 var GV=uWin.GV;
                                 var CB=uWin.CB;
                                 Log('eval begin');
                                 // 去掉函数调用以及声明
                                 eval('_hook='+uWin.$.cmtOnload.toString().replace('initData(1)','').replace(/var/g,''));
                                 Log('_hook start');
                                 _hook('.commt_list');
                                 $("#comment_num").html(ret.result.comment_num);
                                 $("#view_num").html(ret.result.view_num);
                                 $(".post_count").html('共有<em>'+ret.result.comment_num+'</em>条评论，显示<em>'+ret.result.join_num+'</em>条').fadeIn();
                                 uWin.initData=initData;
                                 uWin.genList=genList;
                                 genList();
                                 Log('genHotList start');
                                 $("#J_hotcommt_list").parent().show();
                                 genHotList();
                                 bindAction();
                                 return true;
                             }
                             catch(e)
                             {Log(e.message); return false;}
                         },
                         // 获取内容
                         GetContent :function()
                         {
                             Log('enter GetContent');
                             // 文章id
                             var id=Article.id,
                                 //2个停用的源
                                 //  yg_url = 'http://yueguang.sinaapp.com/?id=' + id,
                                 // iz_url = 'http://py.imorz.tk/tools/cb/hotcomment/'+id,
                                 my_url = 'http://aws.itkso.com/node/cb/'+id,
                                 offical_url = 'http://api.cnbeta.com/capi/phone/comment?article=' +id;
                             //从个人服务器获取数据
                             function fetchMyUrl()
                             {
                                 GM_xmlhttpRequest({
                                     timeout:1000*30,//服务器比较破没办法
                                     method: "GET",
                                     url:my_url,
                                     onload: function(response) {
                                         CB_comment.iz_Req=true;
                                         var data=response.responseText;
                                         if( data.length>1)
                                         {
                                             if(CB_comment.setComment(data,true)){
                                             CB_comment.showLv=4;
                                                CB_comment.TipAdd('个人服务器获取数据成功');}
                                         }
                                         else
                                         {
                                             CB_comment.TipAdd('个人服务器没有收录此页面评论数据');
                                         }
                                         
                                     }
                                 });
                             }
                             // 官方
                             function fetchOfficalPhoneUrl()
                             {
                                 GM_xmlhttpRequest({
                                     method: "GET",
                                     url:offical_url,
                                     onload: function(response) {
                                         if(CB_comment.showLv>3)return;
                                         CB_comment.iz_Req=true;
                                         var data=JSON.parse(response.responseText);
                                         // 官方手机api返回数组型,需转成需要的形式
                                         if( data.length>0)
                                         {
                                             var newdata={u:[],cmntdict:{},hotlist:[]},lis=[],sto={};
                                             data.forEach(function(i)
                                                          {
                                                              sto[i.tid]={tid:i.tid,
                                                                          name:'CB官方API',//用户名
                                                                          comment:i.comment,
                                                                          reason:i.against,
                                                                          date:i.date,
                                                                          score:i.support,
                                                                          host_name:'里世界'//ip
                                                                         };
                                                              lis.push({tid:i.tid,parent:''});
                                                          });
                                             newdata.cmntlist=lis;
                                             newdata.cmntstore=sto;
                                             newdata.comment_num=newdata.join_num=lis.length;
                                             Log(newdata);
                                             if(CB_comment.setComment({result:newdata},false)){
                                             	CB_comment.showLv=3;
                                                 CB_comment.TipAdd('官方手机API获取数据成功');}
                                         }
                                         else
                                         {
                                             CB_comment.TipAdd('官方手机API未得到数据');
                                         }
                                     }
                                 });
                             }
                             function fetchData()
                             {
                                 fetchOfficalPhoneUrl();
                                 fetchMyUrl();
                             }
                             // 先查询本地是否有数据
                             if(window.openDatabase)
                             {
                                 var db=openDatabase('cbComment','1.0','For cb Helper',10*1024*1024);
                                 db.transaction(function (tx) {  
                                     tx.executeSql('CREATE TABLE IF NOT EXISTS cbdata (id unique, data)');
                                     tx.executeSql('select id,data from cbdata where id=?',[Article.id],function(tx,ts){
                                         if(ts.rows.length<1)
                                         {fetchData();}
                                         else 
                                         {CB_comment.setComment(ts.rows.item(0).data,false);}
                                     });
                                 });
                             }
                             else 
                             {
                                 fetchData();
                             }
                         },
                         // 显示
                         ShowContent:function()
                         {
                             if(!this.isReq)
                             {
                                 this.isReq=true;
                                 this.GetContent();
                             }
                         },
                         //添加移动站内容
                         AddMobileComment:function()
                         {
                             var url='http://m.cnbeta.com/wap/comments.htm?id='+Article.id;
                             GM_xmlhttpRequest({
                                 method: "GET",
                                 url:url,
                                 onload: function(response) {
                                     CB_comment.iz_Req=true;
                                     var data=response.response;
                                     //Log(data);
                                     if (CB_comment.showLv<1)
                                     {
                                         Log($(data).filter('.content'));
                                         $('#J_commt_list').html($($(data).filter('.content')));
                                         CB_comment.showLv=1;
                                     }
                                     CB_comment.TipAdd('移动站数据抓取成功'); 
                                 }
                             });
                         },
                         //初始化
                         init_Comment:function()
                         {
                             // 没过期不显示
                             Log('enter init_Comment');
                             //优化评论,不要那么的多 在DOM变动的时候处理
                             $('.commt_list').on('DOMNodeInserted',
                                                 function(e)
                                                 {
                                                     if(e.target.nodeName!='DL')return true;
                                                     $(e.target).find('.datetime').html('<span ref="p" class="pm">+1</span><span ref="m" class="pm">-1</span>点击出现支持反对');
                                                     $(e.target).find('.re_mark').hide();
                                                     return true;
                                                 });
                             // 处理上面添加的按钮的事件 通过冒泡想上一级发送
                             $('#J_commt_list dl').live('click',function(e1)
                                                        {
                                                            if(e1.target.className=='datetime')
                                                            {
                                                                Log('you click show bar');
                                                                $(this).find('.re_mark').show();
                                                                return false;
                                                            }
                                                            else if(e1.target.className=='pm')
                                                            {
                                                                var pm=$(e1.target).attr('ref'),
                                                                    node='.comment_body>.re_mark a[action-type=against]';
                                                                if(pm=='p')
                                                                    node= '.comment_body>.re_mark a[action-type=support]';
                                                                uWin.jQuery(this).find(node).click();
                                                                if(pm=='p')CB_comment.TipAdd('支持了一下');
                                                                else CB_comment.TipAdd('反对了一下');
                                                            }
                                                                });
                             //按照月光宝盒的要求写入
                             this.boxEl.id = this.BOX_ID;
                             $(this.boxEl).append(this.moonEl);
                             $('body').append(this.boxEl); 
                             //判断是否启动自动模式
                             var Auto=GM_getValue('auto',false);
                             this.draw_a_moon(Auto);
                             //是否过期
                             
                             if(!this.ifDated())
                             {
                                 $(this.moonEl).click(function()
                                                      {
                                                          CB_comment.AddMobileComment();
                                                          return false;
                                                      });
                                 return;
                             }
                             
                             //自动的话显示评论
                             if(Auto)
                                 this.ShowContent();
                             //右键转为自动模式,左键显示过期评论
                             $(this.moonEl).mousedown(function(e)
                                                      { 
                                                          if(e.which==3)
                                                          {
                                                              var status=($(this).attr('auto')=='false');
                                                              CB_comment.draw_a_moon(status);
                                                              $(this).attr('auto',status);
                                                          }
                                                          CB_comment.ShowContent();
                                                          return false;
                                                      });
                             // 取消默认右键打开上下文菜单
                             $(this.moonEl).bind('contextmenu',function(e){
                                 return false;
                             });
                             Log('leave init_Comment');
                         }// function init_Comment
                     },// var CB_comment
                         
                         CB_Widget={
                             // 收藏列表
                             favs:[],
                             // 标志是否显示收藏
                             showFav:false,
                             // css
                             Widget_CSS:'.dig_box a:link{background-position:  -141px 0px !important;} .dig_box a:hover{background-position:  0px 0px !important;}'+
                            
                             '.fav_box a:link{background-position:  -141px -55px !important;} .fav_box a:hover{background-position:  0px -55px !important;}'+
                             '.cmt_box a:link{background-position:  -141px -110px !important;} .cmt_box a:hover{background-position:  0px -110px !important;}'+
                              '.back_box a:link{background-position: -141px -165px !important;} .back_box a:hover{background-position: 0 -165px !important;} .del{margin-left:5px}'+
                             '.left_content{margin-left: -490px;width: 200px;background-color: white;opacity: 0.7;border-radius: 0 9px 9px 0;overflow-y: auto;}.left_content dd{color: black !important;}'+
                             '',
                             // 初始化总侧边工具
                             init_widget:function()
                             {
                                 //评论框按钮设置id下边会添加一个评论框按钮样式
                                 $('.cmt_box').attr('id','cmt_box_btn');
                                 //右边的内容框
                                 this.initContent();
                                 //添加返回
                                 $('<div>',{class:'left_art_box back_box cmt_box'}).html('<a href="/">喷水网</a>').appendTo('#left_art');
                                 $('.left_art_box a').addClass('SidePic');
                                 //事件重新设置
                                 this.ReBindListener();
                                 
                             },
                             initContent:function(){
                                 var cmtDiv=$('<div/>',{id:'cmtDiv'}).html('<textarea id="comment_text1" style="border:1px solid ;background-color: transparent; margin-top: 0px; margin-bottom: 0px; height: 120px;width:90%;display:block; " placeholder="填写评论" ></textarea>'+
                                                                           '<img id="safecode1" style="display:block;width:70px;margin-top: 5px;display: inline;" /> <input style="top: -20px;position: relative; width:70px;display:none;" type="text" id="vcode1" />').hide();
                                 var favDiv=$('<div/>',{id:'favDiv'}).hide();
                                 $('<div/>',{class:'left_art left_content'}).css('z-index','88888').appendTo($('.wrapper')).html(cmtDiv).append(favDiv).hide();
                             },
                             ReBindListener:function(){
                                 $('#left_art').off('mouseover');
                                 $('#left_art').mouseleave(function(){t=$(this);if(!t.hasClass('left_art_short'))t.addClass('left_art_short');});
                                 $('#left_art').mouseenter(function(){$(this).removeClass('left_art_short');});
                                 $('#dig_btn a').attr({title:'打分',id:'P5'}).html('<span id="N5" style="line-height: 2em;font-size:20px;">☆+5</span>').mouseover(
                                     function(){$('#N5').html('☆+5');return true;});
                                 $('#dig_btn span').css('z-index','789').mouseover(
                                     function(){$('#N5').html('☆-5'); return false;});
                                 $('#P5').off('click');
                                 $('#favorite_btn').attr('id','favorite_btn_');
                                 this.HideContentLinstener();
                                 
                             },
                             //主页要生成
                             initHome:function()
                             {
                                 if($('#left_art').length>0)return;
                                 $('<div/>',{id:'left_art',class:'left_art left_art_short'}).appendTo('.main_content');
                                 $('<div/>',{class:'left_art_box dig_box',id:'Back'}).html('<a title="" class="SidePic" href="#"></a>').appendTo('#left_art');
                                 $('<div/>',{class:'left_art_box fav_box',id:'favorite_btn_'}).html('<a title="显示收藏" class="SidePic" href="#">收藏</a>').appendTo('#left_art');
                                 this.initContent();
                                 this.init_Favs();
                                 this.ReBindListener();
                             },
                             init:function()
                             {
                                 this.init_widget();
                                 this.init_Favs();
                                 this.init_mark();
                                 this.init_comment(); 
                             },
                             HideContentLinstener:function()
                             {
                                 // 键盘和鼠标关掉评论框
                                 $('body').keydown(function(e){
                                     if(e.which==27)
                                         $('.left_content').hide();
                                     return true;
                                 });
                                 $('body').mousedown(function(e){
                                     if(e.which==1&&($(e.target).is('div')||$(e.target).is('p')||$(e.target).is('body')||$(e.target).is('section')))
                                         $('.left_content').hide();
                                     return true;
                                 });
                             },
                             // 初始化评论按钮
                             init_comment:function()
                             {
                                 // 评论框在指针到达时开始显示
                                 $('#cmt_box_btn').mouseover(
                                     function(){
                                         $('.left_content').show();
                                         $('#cmtDiv').show();
                                         $('#favDiv').hide();
                                         $('#comment_text1').focus();
                                     });
                                 
                                 // 刷新验证码
                                 function _imgload()
                                 {
                                     $.ajax({
                                         url: "\/captcha.htm?refresh=1",
                                         dataType: 'json',
                                         cache: false,
                                         success: function(data) {
                                             $('#safecode1').attr('src', data.url);
                                             $('body').data('captcha.hash', [data.hash1, data.hash2]);
                                         }
                                     });
                                     return false;
                                 }
                                 $('#safecode1').click(_imgload);
                                 // 处理回车显示验证码发送
                                 $('#comment_text1').keydown(function(e){
                                     switch(e.which)
                                     { case 13:
                                             //uWin.reloadcode(1);
                                             _imgload();
                                             $('#vcode1').show();
                                             $('#vcode1').focus();
                                             break;
                                         case 27:
                                             $('.left_content').hide();
                                             break;
                                         default:
                                             return true;
                                     }
                                     return false;
                                 });
                                 //发送评论
                                 $('#vcode1').keydown(function(e){
                                     if(e.which==13)
                                     {
                                         var id = Article.id;
                                         //把 内容写到对应位置,发送
                                         $('.form_input').attr('value',$(this).attr('value'));
                                         $('textarea[name="nowcomment"]').attr('value',$('#comment_text1').attr('value'));
                                         $('#post_btn').click();
                                         CB_comment.TipAdd('快速评论ing！！');
                                         $('.left_content').hide();
                                         $('#favorite_btn_').click();
                                         return false;
                                     }
                                     else return true;
                                 });
                             },
                             // 打分
                             init_mark:function()
                             {
                                 $('#P5').bind('click',function(){
                                     $('li[data-score=5]').click();
                                     CB_comment.TipAdd('5打分OK！！');
                                     return false;
                                 });
                                 $('#N5').click(function(){
                                     $('li[data-score=-5]').click();
                                     CB_comment.TipAdd('-5打分OK！！');
                                     return false;
                                 });
                             },
                             init_Favs:function()
                             {
                                 //收藏,从设置中获取
                                 $('.fav_box').show();
                                 this.favs=GM_getValue('favs','[]');
                                 if(this.favs =='undefined')this.favs=[];
                                 else{
                                     try{this.favs=JSON.parse(this.favs);}
                                     catch(e)
                                     {this.favs=[];}
                                 }
                                 $('.fav_box em').html(this.favs.length);
                                 // 添加到收藏
                                 $('#favorite_btn_').bind('click',function(){
                                     Log('click add_fav');
                                     if(Article.notArt){$(this).unbind('click');return;}
                                     $('.left_content').hide();
                                     var id = Article.id;
                                     //判断是否已存在
                                     if((CB_Widget.favs.join(',')+',').indexOf(id+',')>-1)
                                     {
                                         CB_comment.TipAdd('文章id:'+id+'已收藏!');
                                         return false;
                                     }
                                     //否则添加
                                     CB_comment.TipAdd('收藏文章id'+id+'成功!');
                                     CB_Widget.favs.push([id,Article.title]);
                                     GM_setValue('favs',JSON.stringify(CB_Widget.favs));
                                     $('.fav_box em').html(this.favs.length);
                                 }).mouseenter(function(){
                                     var s='';
                                     for (var i in CB_Widget.favs)
                                         s+='<dd><a class="art_title" href="/articles/'+CB_Widget.favs[i][0]+'.htm" >'+ CB_Widget.favs[i][1]+'</a><strong class="del" refid="'+CB_Widget.favs[i][0]+'" >删除</strong>';
                                     $('#favDiv').html(s).show();
                                     $('.left_content').show();
                                     $('#cmtDiv').hide();
                                 });
                                 //删除
                                 $('.del').live('click',function()
                                                {
                                                    
                                                    for(var  i in CB_Widget.favs)
                                                        if( CB_Widget.favs[i][0].toString() == $(this).attr('refid'))
                                                        {
                                                            CB_comment.TipAdd('删除收藏文章id'+CB_Widget.favs[i][0]+'成功!');
                                                            CB_Widget.favs.splice(i,1);
                                                            GM_setValue('favs',JSON.stringify(CB_Widget.favs));
                                                            $('cmtDiv').hide();
                                                            break;
                                                        }
                                                        });
                                 				$('.fav_box em').html(this.favs.length);
                             }
                         },//CB_Widget
                             HomePage={
                                 CSS:'.alllist .realtime_list{padding:0;}.alllist .realtime_list .update_time{right:10px !important;} .hate{opacity: .2;} .listtop{padding: 4px 6px;cursor: pointer;}'+
                                 '.realtime_list dt{width:100% !important} .CBset{margin-top:10px;padding:4px 0 0 10px !important;} #CBSwitch input[type=checkbox]{margin-left:8px;}',
                                 isOrig:false,
                                 isChange:false,
                                 OpenNew:false,//是否打开新窗
                                 hateTopic:'',//默认过滤
                                 //过滤标题
                                 filter:function()
                                 {
                                     if(HomePage.hateTopic=='')return;
                                     var reg=new RegExp(HomePage.hateTopic);
                                     function filterTitle(x){var z=$(x).find('dt a'),y=GM_getValue('filterMove',true);
                                                             if(!HomePage.OpenNew)z.attr('target','');
                                                              if(z.html().search(reg)>-1){
                                                                              if(!y)$(x).addClass('hate');
                                                                              else $(x).remove();
                                                              }
                                                            }
                                     $('.alllist dl').each(function(){filterTitle(this);});
                                     $('#allnews_all .items_area').on('DOMNodeInserted',
                                                                      function(e)
                                                                      {
                                                                          if(e.target.nodeName!='DL')return true;
                                                                          filterTitle(e.target);
                                                                      });
                                 },
                                 setting:function()
                                 {
                                     //获取过滤字符
                                     this.hateTopic=GM_getValue('hateTopic','小米');
                                     //添加设置页
                                     $('<li/>').addClass('tab_item').html('<a class="two">设置</a>').appendTo($('.cb_box:last nav ul'));
                                     // 设置界面
                                     var s='<p class="notice CBset" >文章标题过滤:多个关键词用|隔开<br/>'+
                                         '<input id="filterIn" style="width:150px" type="text" placeholder="多个关键词用|隔开" /><button id="filterOk">保存</button>'+
                                         ' <input type="checkbox" name="filterMove" style="margin-left:10px;" />直接移除</p>'+
                                         '<p class="notice CBset" id="CBSwitch">开关(刷新生效)<br/>'+
                                         '<input type="checkbox" name="global" />全局<input type="checkbox" name="share" />分享</p>';
                                     var a=$('<div/>').attr('id','side_set').hide().appendTo($('.side_news_list'));
                                     a.html(s);
                                     a.find(':checkbox').click(function(){GM_setValue($(this).attr('name'),this.checked);}).each(
                                         function(){if(GM_getValue($(this).attr('name'),true))$(this).attr('checked','true');});
                                     $('#filterIn').val(this.hateTopic);
                                     $('#filterOk').click(
                                         function()
                                         {
                                             GM_setValue('hateTopic',$('#filterIn').val());
                                             alert('设置成功,刷新生效');
                                         }
                                     );
                                     //必须调用原win的jQuery
                                     function set(){uWin.jQuery('.side_news_nav').tabs('.side_news_list>div',{event:'mouseover'});};
                                     uWin.setTimeout(set,1000);
                                     $('#setting').click(set);
                                 },
                                 init:function()
                                 {
                                     this.OpenNew=GM_getValue('OpenNew',false);//新窗
                                     this.isOrig=GM_getValue('org',false);//是否是原始风格
                                     
                                     //恢复官方样式
                                     var Original_Style=function()
                                     {
                                         if(!HomePage.isChange)return;
                                         //$('.realtime_list .brief').show();
                                         $('.realtime').parent().find(':first').before($('.hotpush'));
                                         $('.main_content_left > section').show();
                                         $('.content_body .realtime').append($('.realtime_list'));
                                     };
                                     //精简样式
                                     var New_Style=function(){
                                         HomePage.isChange=true;
                                         Log('enter New');
                                         Log($('.realtime_list'));
                                         Log($('#allnews_all .items_area :first'));
                                         $('#allnews_all .items_area :first').before($('.realtime_list'));
                                         $('.realtime_list').before($('.hotpush'));
                                         $('.main_content_left > section').not(':last').hide();
                                         $('.realtime_list .brief').remove();
                                     };
                                     // 修改样式
                                     var do_change=function()
                                     {
                                         Log('enter do_change');
                                         Log(HomePage.isOrig);
                                         if(HomePage.isOrig)
                                         {
                                             Original_Style();
                                             $('#Back a').html('精简');
                                             $('#Back a').attr('title','精简');
                                         }
                                         else{New_Style();
                                              $('#Back a').html('原始');
                                              $('#Back a').attr('title','原始');
                                             }
                                     };
                                     Log('enter homepage init');
                                     do_change();
                                     $('.allinfo .blue_bar').append($('.J_realtime').clone());
                                     var s='<span id="setting" class="fr listtop">设置</span>'+
                                         '<span class="fr listtop"><input type="checkbox" id="OpenNew" '+(this.OpenNew?'checked="true"':'')+ ' />新</span>';
                                     $('.allinfo .blue_bar').append(s);
                                     // 新窗按钮的事件
                                     function target(){if(HomePage.OpenNew)
                                         $('a[target="_blank"]').attr('target','');
                                                       else $('a[target=""]').attr('target','_blank');
                                                       HomePage.OpenNew=!HomePage.OpenNew;
                                                       GM_setValue('OpenNew',HomePage.OpenNew);
                                                      }                                               
                                     $('#OpenNew').click(target);
                                     
                                     this.OpenNew=!this.OpenNew;
                                     target();
                                     //左侧的widget修正
                                     $('#Back').click(
                                         function()
                                         {
                                             HomePage.isOrig=!HomePage.isOrig;
                                             GM_setValue('org',HomePage.isOrig);
                                             do_change();
                                         }
                                     );
                                     // 打开设置和过滤
                                     this.setting();
                                     this.filter();
                                 }
                             },
                                 CB_share={
                                     // 分享,来自 自古CB出评论脚本
                                     //sina_url:'http://service.weibo.com/share/share.php?title={{title}}&url={%url%}&appkey=696316965',
                                     CSS:'.genPic{margin-left:10px;cursor:pointer;color:#EB192D;} .yellow_bar h4{display:inline} #changeTemp{display:block !important;}',
                                     templateO:'{%comment%} ——「{%title%} {%tag%}',
                                     template:GM_getValue('template','{%comment%} ——「{%title%}」 {%tag%}'),
                                     init:function()
                                     {
                                         $('.hotcomments').on('DOMNodeInserted',
                                                              function(e)
                                                              {
                                                                  
                                                                  if(e.target.nodeName!='LI')return true;
                                                                  var t=$(e.target);
                                                                  if(t.find('.genPic').length>0)return true;
                                                                  var con= $(e.target).find('em').html();
                                                                  //对字数多的出现生成长图按钮
                                                                  if(con.length>140){
                                                                      var n=$('<span/>').addClass('genPic').html('生成长图');
                                                                      t.find('.title .time').after(n);}
                                                                  return true;
                                                              });
                                         //控制分享内容
                                         $('#popshare li a').attr('onclick','').live('click',function(){
                                             var tid = $(this).parents("#popshare").attr('data-tid');
                                             var conNode=$('#hotcon'+tid);
                                             var sharetitle=
                                                 CB_share.template.replace('{%comment%}',conNode.html().substr(0,80))
                                             .replace('{%title%}',Article.title)
                                             .replace('{%tag%}','#自古CB出评论# #CB评论#')
                                             .replace('{%tag1%}','#自古CB出评论#')
                                             ;
                                             var op={title:sharetitle,content:sharetitle};
                                             var pic=conNode.attr('pic');
                                             newopen=uWin.open;
                                             // 如果有图片,必须加上,通过hook open实现,通用性较低,新浪微博和qq可用
                                             if(pic)
                                             {
                                                 op.pic=pic;
                                                 uWin.open=function(a,b,c){if(b=='cnbetashare')a=a+'&pic='+pic+'&pics='+pic;newopen(a,b,c)};
                                             }
                                             uWin.shareJump(this,op);
                                             uWin.open=newopen;
                                         });
                                         $('.genPic').live('click',function()
                                                           {
                                                               var conNode=$(this).parents('div.comContent').find('em');
                                                               var title=conNode.html();
                                                               //获取长图的按钮
                                                               var pic=null;
                                                               GM_xmlhttpRequest({
                                                                   timeout:1000*30,
                                                                   method: "POST",
                                                                   url:'http://www.taichangle.com/taichangle.php',
                                                                   data:'text='+encodeURIComponent(title),
                                                                   headers: {
                                                                       "Content-Type": "application/x-www-form-urlencoded"
                                                                   },
                                                                   synchronous:true,
                                                                   onload: function(response) {
                                                                       var data=JSON.parse(response.responseText);
                                                                       if(data.errno==0)
                                                                       {
                                                                           pic='http://www.taichangle.com/'+data.image_url;
                                                                           CB_comment.TipAdd('长图获取成功!');
                                                                       }
                                                                       else
                                                                       {
                                                                           CB_comment.TipAdd('长图获取失败:'+data.error);
                                                                       }
                                                                       if(pic)
                                                                       {
                                                                           conNode.attr('pic',pic);
                                                                       }
                                                                   }
                                                               });
                                                               return false;
                                                           });
                                         $('.hotcomments header').append('<button class="fr" id="changeTemp">更改分享模板</button>');
                                         //参考 自古CB出评论 添加了官方的标签
                                         $('#changeTemp').click(function(){
                                             var template_input = window.prompt("「自古CB出评论」模板设置\n\n可用变量：\n{%title%} - 文章标题；\n{%comment%} - 评论正文；\n"+
                                                                                "{%tag%} - 标签；\n{%tag1%} - 单标签；\n\n默认值：" + CB_share.templateO + "\n\n", CB_share.template);
                                             if (template_input !== null && CB_share.template !== template_input) {
                                                 GM_setValue("template", template_input);
                                                 CB_share.changeTemp(template_input);
                                                 
                                             }
                                         });
                                     },
                                     changeTemp:function(s)
                                     {
                                         CB_share.template=s;
                                     }
                                 };
     //去除广告,建议是使用adp去除的
     function RemoveAD ()
     {
         Log('enter AdRemove');
         if(isRun())return;
         $('script').each(function(){if(this.src)return;if(this.src.match('baidu|google')||$(this).html().match('baidu|google'))$(this).remove();});
         $('iframe').remove();
         $('div[id*=baidu]').remove();
         $('div[id*=tanxssp]').remove();
         $('[class*=gbox]').not('[class*=imgbox]').remove();
         $('.adsbygoogle').remove();
         $('.bd_r').remove();
         $('#right4').remove();
         $('iframe').remove();
         $('#job_box').hide().parents('.cber').find('header').append('(点击展开)').click(function(){$('#job_box').show()});
     }
     function init()
     {
         Log('enter init');
         var MAINCSS='iframe{display:none !important;}';
         Log(isRun()?'run':'not run');
         if(isRun())return;
         Log('first run');
         window.setTimeout(RemoveAD,2000);
         var isMainPage=Article.notArt=isNaN(Article.id);
         //如果全局打开的
         if(GM_getValue('global',true))
         {
             MustAddStyle(picCSS+CB_comment.GETTER_STYlE+CB_Widget.Widget_CSS+HomePage.CSS+CB_share.CSS+MAINCSS);
             
             if(isMainPage)
             {
                 CB_Widget.initHome();
                 HomePage.init();
                 
                 return;
             }
             CB_Widget.init();
             $('#Back').remove();
             $('.cb_box a[target="_blank"]').attr('target','');
             CB_comment.init_Comment();
             if(GM_getValue('share',true))//分享
                 CB_share.init();
         }
         else//否则只显示设置
         {
             MustAddStyle(HomePage.CSS);
             if(isMainPage)HomePage.setting();
         }
     } 
     
     // 运行
     if(!uWin){Log('unsafeWindow no support!!!!!');return;}
     RemoveAD();
     init();
     if(!uWin.$)uWin.$=$;
     window.setTimeout(init,1000);
     window.setTimeout(RemoveAD,3000);
     function receiveMessage(msg)
     {
         if(msg.data=='show')
             init();
     }
     window.addEventListener("message", receiveMessage, false);
     $('<script/>',{'type':'text/javascript','defer':'defer'}).html('window.postMessage("show","*");').appendTo('body');
     
 }
)();