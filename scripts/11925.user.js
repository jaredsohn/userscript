// ==UserScript==
// @name           my_scroll_bar
// @namespace      gm_my_scroll_bar
// @description    my scrollbar
// ==/UserScript==
height_container=document.compatMode.indexOf('CSS')>=0?document.documentElement.clientHeight:document.body.clientHeight;
ratio_watch=height_container/window.document.body.offsetHeight;
if (ratio_watch<0.96 && window.document.body.clientWidth>200){
if (document.compatMode.indexOf('CSS')>=0) //reverse documentElement and body for availability of mouse scorllwheel
   {var tmp_scroll=document.documentElement.scrollTop;
    document.body.style.overflowY='hidden';
    document.documentElement.scrollTop=tmp_scroll;//restore scrolltop destroyed by hidding overflow
   }
else
    {var tmp_scroll=document.body.scrollTop;
     document.documentElement.style.overflowY='hidden';
     document.body.scrollTop=tmp_scroll;//restore scrolltop destroyed by hidding overflow
    }
mid_container=height_container/2;
position_left=(document.compatMode.indexOf('CSS')>=0?document.documentElement.clientWidth:document.body.clientWidth)-18;
if (document.compatMode.indexOf('CSS')>=0)
   {document.documentElement.style.paddingRight='18px';
   }
else
    {document.body.style.paddingRight='18px';
    }
height_pointer=height_container/(2-ratio_watch);
height_move=height_container-height_pointer;
height_watch=height_pointer*ratio_watch;
div_watch_top=document.createElement('div');
div_watch_top.style.cssText='position:fixed;width:20px;opacity:0.7;z-index:1000;'
                        +'left:'+(position_left-20)+'px;'
                        +'height:'+((height_container-height_watch)/2)+'px;'
                        +'top:0px;';
div_watch_top.innerHTML='<img src="http://diyism.com/!misc/roll_top.png" style="width:100%;height:100%;">';
div_watch_bottom=document.createElement('div');
div_watch_bottom.style.cssText='position:fixed;width:20px;opacity:0.7;z-index:1000;'
                        +'left:'+(position_left-20)+'px;'
                        +'height:'+((height_container-height_watch)/2)+'px;'
                        +'top:'+(mid_container+height_watch/2)+'px;';
div_watch_bottom.innerHTML='<img src="http://diyism.com/!misc/roll_bottom.png" style="width:100%;height:100%;">';
div_pointer=document.createElement('div');
div_pointer.style.cssText='position:fixed;padding:0px;width:14px;opacity:1;z-index:999;background-color:#E5ECF9;border:1px solid #3366CC;'
                          +'left:'+position_left+'px;'
                          +'height:'+height_pointer+'px;'
                          +'top:'+(mid_container+height_move/2-((document.compatMode.indexOf('CSS')>=0?document.documentElement.scrollTop:document.body.scrollTop)*height_move/(window.document.body.offsetHeight-height_container)+height_pointer/2))+'px;';
div_pointer.innerHTML='<span style="display:-moz-inline-box;vertical-align:middle;width:0px;height:100%;"></span><span style="display:-moz-inline-box;vertical-align:middle;font-size:12px;font-family:arial;"><div>...</div></span>';
to_div = document.createElement('div');
to_div.style.cssText='position:fixed;opacity:0;z-index:1000;width:14px;cursor:default;'
                      +'left:'+position_left+'px;'
                      +'height:'+height_container+'px;'
                      +'top:'+(mid_container-height_container/2)+'px';
window.to_div_move=function(event)
                {var tmp=(window.document.body.offsetHeight-height_container)*(mid_container+height_move/2-event.clientY)/height_move;
                 if (document.compatMode.indexOf('CSS')>=0)
                    {document.documentElement.scrollTop=tmp;
                    }
                 else
                     {document.body.scrollTop=tmp;
                     }
                }
window.div_pointer_move=function()
                        {div_pointer.style.top=mid_container+height_move/2-((document.compatMode.indexOf('CSS')>=0?document.documentElement.scrollTop:document.body.scrollTop)*height_move/(window.document.body.offsetHeight-height_container)+height_pointer/2)+'px';
                        }
to_div.addEventListener("mousemove",to_div_move, false);
document.body.appendChild(div_pointer);
document.body.appendChild(div_watch_top);
document.body.appendChild(div_watch_bottom);
document.body.appendChild(to_div);
window.addEventListener('scroll', div_pointer_move, false);


div1_stop=0;
div1_step=1;
window.div1_scroll=function() //in grease monkey, you must add "window." to the name of permernant function
                  {if (!div1_stop)
                      {if (document.compatMode.indexOf('CSS')>=0)
                          {document.documentElement.scrollTop+=div1_step;
                          }
                       else
                           {document.body.scrollTop+=div1_step;
                           }
                       setTimeout(div1_scroll,10);
                      }
                  }
window.div1_move=function(event)
                {if (this==div_watch_top)
                    {div1_step=(event.clientY-(div_watch_top.offsetTop+(height_container-height_watch)/2))/10;
                    }
                 else
                     {div1_step=(event.clientY-div_watch_bottom.offsetTop)/10;
                     }
                }
window.div1_over=function()
                {div1_stop=0;
                 div1_scroll();
                }
window.div1_out=function()
               {div1_stop=1;
               }
div_watch_top.addEventListener("mouseover",div1_over, false);
div_watch_bottom.addEventListener("mouseover",div1_over, false);
div_watch_top.addEventListener("mouseout",div1_out, false);
div_watch_bottom.addEventListener("mouseout",div1_out, false);
div_watch_top.addEventListener("mousemove",div1_move, false);
div_watch_bottom.addEventListener("mousemove",div1_move, false);

window.key_scroll=function(event)
                  {var key=event.keyCode;
                   if (key==63232 || key==38 || key==119)//up
                      {if (document.compatMode.indexOf('CSS')>=0)
                          {document.documentElement.scrollTop+=15;
                          }
                       else
                           {document.body.scrollTop+=15;
                           }
                       event.preventDefault();//in grease monkey, "retrun false;" won't stop the event
                      }
                   else if (key==63233 || key==40 || key==121)//down
                           {if (document.compatMode.indexOf('CSS')>=0)
                               {document.documentElement.scrollTop-=15;
                               }
                            else
                                {document.body.scrollTop-=15;
                                }
                            event.preventDefault();
                           }
                   else
                       {return true;
                       }
                  }
window.addEventListener('keypress', function(e){key_scroll(e)}, false);
}//if (ratio_watch<0.96)