// ==UserScript==
// @name           FTab(Floating Tabs)
// @namespace      http://www.uuware.com/js_ftab_en.htm
// @description    a cool movable window with tabpages
// @include        http://www.uuware.com/js_ftab_en.htm
// ==/UserScript==
          /*******************************************************************************
                              	FTab(Floating Tabs)
                              	Copyright (c) 2006-2009 uuware.com. All rights reserved.
                              	Developed by project@uuware.com, Visit http://www.uuware.com/ for details.
                              
                              	Permission is hereby granted, free of charge, to any person obtaining
                              	a copy of this software and associated documentation files (the
                              	"Software"), to deal in the Software without restriction, including
                              	without limitation the rights to use, copy, modify, merge, publish,
                              	distribute, sublicense, and/or sell copies of the Software, and to
                              	permit persons to whom the Software is furnished to do so, subject to
                              	the following conditions:
                              
                              	The above copyright notice and this permission notice shall be
                              	included in all copies or substantial portions of the Software.
                              
                              	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
                              	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
                              	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
                              	NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
                              	LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
                              	OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
                              	WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
                              *******************************************************************************/
                              /*******************************************************************************
                              FTab(Floating TabPage)
                              function FTab(tabID, left, top, width, height, style, showPageIndex)
                              can used like:(notice no 'new' as var o = new FTab(...), but no errors even use 'new'.)
                                var o = FTab(tabID,10,10,200,160,'title:1;minmax:1;close:1;move:0;status:1;resize:1;scroll:1;tab:1;tabrect:1;expandable:0;cookie:1;',0);
                                o.show(pageIndex);
                              also can like this:
                                FTab(tabID,10,10,200,160,'').show(pageIndex);
                              when create FTab,need this params(left, top, and others),but while next time only need tabID to refer to FTab.
                              for styles,default of all params is 1.if no title(title:0),then no close and minmax buttons even set them as 1,
                              and also no moving.and also if no status(status:0),then no resize.
                              
                              user's event:
                              FTabs.OnPageShow = function(ftab,index)
                              {
                                window.status='FTabs.OnPageShow, ftab id:'+ftab.id + ', index:' + index + '.';
                              }
                              FTabs.OnActing = function(ftab)
                              {
                                window.status='FTabs.OnActing, ftab id:'+ftab.id + '.';
                              }
                              FTabs.OnDeActing = function(ftab)
                              {
                                window.status='FTabs.OnDeActing, ftab id:'+ftab.id + '.';
                              }
                              FTabs.OnMinMax = function(ftab, isMin)
                              {
                                window.status='FTabs.OnMinMax, ftab id:'+ftab.id + ', isMin:' + isMin;
                              }
                              FTabs.OnHide = function(ftab)
                              {
                                window.status='FTabs.OnHide, ftab id:'+ftab.id + '.';
                              }
                              *******************************************************************************/
                              
                              var FTab_MSIE = (navigator.userAgent.indexOf('MSIE') >= 0 ? true : false); //used to judge as IE.
                              var FTab_JS = 'ftab.js'; //only used for get path of this js.
                              var FTab_PATH = ''; //path of style and also image.
                              //get relative style&image path(same to js's path)
                              var scripts = document.getElementsByTagName('script');
                              for(var i = 0; i < scripts.length; i++){
                                var src = scripts[i].getAttribute('src');
                                //here not see other dir's 'ftab.js'
                                if(src){
                                  if(src == FTab_JS){
                                    FTab_PATH = "";
                                    break;
                                  }
                                  if(src.length > FTab_JS.length && (src.substring(src.length - FTab_JS.length - 1) == '/' + FTab_JS
                                    || src.substring(src.length - FTab_JS.length - 1) == '\\' + FTab_JS)){
                                    FTab_PATH = src.substring(0, src.length - FTab_JS.length);
                                    break;
                                  }
                                }
                              }
                              var FTab_ZIndex = 1001;
                              var FTab_ActWin = null; //oMain for move window
                              FTabs = new Object(); //for user's event
                              
                              function FTab_GetCookie(name)
                              {
                                var start = document.cookie.indexOf(name+"=");
                                var len = start+name.length+1;
                                if((!start) && (name != document.cookie.substring(0,name.length))) return null;
                                if(start == -1) return null;
                                var end = document.cookie.indexOf(";",len);
                                if(end == -1) end = document.cookie.length;
                                return unescape(document.cookie.substring(len,end));
                              }
                              function FTab_SetCookie(name,value,expires,path,domain,secure)
                              {
                                if(expires) expires = expires * 60*60*24*1000;
                                else expires = 100 * 60*60*24*1000;
                                var today = new Date();
                                var expires_date = new Date( today.getTime() + (expires) );
                                var cookieString = name + "=" +escape(value) +
                                   ( (expires) ? ";expires=" + expires_date.toGMTString() : "") +
                                   ( (path) ? ";path=" + path : "") +
                                   ( (domain) ? ";domain=" + domain : "") +
                                   ( (secure) ? ";secure" : "");
                                document.cookie = cookieString;
                              }
                              function FTab_SaveConfig(name,showPageIndex,left,top,width,height,nState,nZIndex)
                              {
                                var sitems = null;
                                var sbuf = FTab_GetCookie(name + '.');
                                if(sbuf){
                                  sitems = sbuf.split('_');
                                }
                                if(!sitems || sitems.length != 8) {sitems = new Array();}
                                if(typeof(showPageIndex)=='number') sitems[0] = ''+showPageIndex;
                                if(typeof(left)=='number') sitems[1] = ''+left;
                                if(typeof(top)=='number') sitems[2] = ''+top;
                                if(width) sitems[3] = width;
                                if(height) sitems[4] = height;
                                if(typeof(nState)=='number') sitems[5] = ''+nState;
                                if(nZIndex) sitems[6] = nZIndex;
                                sbuf = '';
                                for(var i=0;i<7;i++) sbuf = sbuf + (sitems[i] ? sitems[i] : '') + '_'
                                FTab_SetCookie(name + '.', sbuf, 100);
                              }
                              
                              //used for resize
                              function FTab_MMoveTimer()
                              {
                                if(!FTab_ActWin || !FTab_ActWin.M_Moving) return false;
                                if(FTab_ActWin.M_StatusCnt >= 0 && FTab_ActWin.M_StatusCnt < 20){
                                  FTab_ActWin.M_StatusCnt++;
                                  setTimeout('FTab_MMoveTimer()', 10);
                                }
                              }
                              
                              //////////////////////////////////////////////////////////////////////////////
                              //FTab(Floating TabPage)
                              function FTab(tabID, left, top, width, height, style, showPageIndex)
                              {
                                var oMain = document.getElementById(tabID);
                                if(oMain == null || typeof(oMain) != 'object' || !oMain.hasChildNodes()) return null;
                                if(typeof(oMain.objSelf) == 'object' && oMain.m_ID == tabID) return oMain.objSelf;
                                if(oMain.m_ID != tabID || oMain.objCreated != 1)
                                {
                                  oMain.m_ID = tabID;
                                  oMain.objCreated = 1;
                                  oMain.objSelf = new FTab(tabID, left, top, width, height, style, showPageIndex);
                                  return oMain.objSelf;
                                }
                              
                                var isInitOK = false;
                                var tabPages = new Array();
                                var tabTitles = new Array();
                                var selectedIndex = 0;
                                var m_ID = tabID;
                                var oBody = null;
                                this.id = tabID;
                                this.m_ID = tabID;
                                oMain.tabPages = tabPages;
                              
                                //init,not show until show()
                                init();
                              
                                //private function
                                function isValid()
                                {
                                  return (oMain != null && isInitOK);
                                }
                              
                                //private function
                                function init()
                                {
                                  //style = 'title:1;minmax:1;close:1;move:0;status:1;resize:1;scroll:1;tab:1;tabrect:1;expandable:0;cookie:1;';
                                  if(typeof(style) != 'string') style = '';
                                  style = style.replace(' ', '');
                                  var noScroll = (style.indexOf('scroll:0')>=0);
                                  var noStatus = (style.indexOf('status:0')>=0);
                                  var noResize = (noStatus || style.indexOf('resize:0')>=0);
                                  var noTitle = (style.indexOf('title:0')>=0);
                                  var noMinMax = (noTitle || style.indexOf('minmax:0')>=0);
                                  var noClose = (noTitle || style.indexOf('close:0')>=0);
                                  var noMove = (noTitle || style.indexOf('move:0')>=0);
                                  var noTab = (style.indexOf('tab:0')>=0);
                                  var expandAble = (style.indexOf('expandable:1')>=0);
                                  var noCookie = (style.indexOf('cookie:0')>=0);
                                  var noTabRect = (noTitle && !noTab && style.indexOf('tabrect:0')>=0);
                                  if(expandAble){
                                    noTitle = false;
                                    noResize = true;
                                    noMinMax = true;
                                    noClose = true;
                                    noMove = true;
                                    noStatus = true;
                                  }
                              
                                  //get all Page
                                  var oPage = oMain.firstChild;
                                  while(oPage){
                                    if(oPage.nodeName=='DIV' && typeof(oPage.title)=='string'){
                                      tabPages.push(oPage);
                                    }
                                    oPage = oPage.nextSibling;
                                  }
                                  if(tabPages.length <= 0) return false;
                              
                                  oMain.className = 'ftab_main_parent';
                                  oMain.style.display = 'none';
                                  oMain.noMinMax = noMinMax;
                                  oMain.noClose = noClose;
                                  oMain.noResize = noResize;
                                  var sbuf = '<table id="' + m_ID + '_m_table';
                                  if(!noTabRect) sbuf += '" class="ftab_main"';
                                  else sbuf += '" class="ftab_main ftab_main_norect"';
                                  sbuf += ' width="100%" height="100%" CELLPADDING="0" CELLSPACING="0">';
                                  //add Title
                                  if(!noTitle){
                                    if(typeof(oMain.title) != 'string') oMain.title = '';
                                    sbuf += '<tr><td class="ftab_title"><div style="border:0;padding:0px;margin:0px;vertical-align:top;">';
                                    sbuf += '<span id="' + m_ID + '_t_title">';
                                    if(expandAble) sbuf += '<img src="'+FTab_PATH+'ftab_minus.gif" style="cursor:pointer;" id="' + m_ID + '_t_pm"/> ';
                                    sbuf += oMain.title + '</span><img src="'+FTab_PATH+'ftab_blank.gif" class="ftab_titleh"/>';
                                    if(!noMinMax) sbuf += '<img src="'+FTab_PATH+'ftab_min.gif" class="ftab_titleh" style="cursor:pointer;" id="' + m_ID + '_t_min"/>';
                                    if(!noClose) sbuf += '<img src="'+FTab_PATH+'ftab_close.gif" class="ftab_titleh" style="cursor:pointer;" id="' + m_ID + '_t_close"/>';
                                    sbuf += '</div></td></tr>';
                                  }
                                  //add Tab
                                  if(!noTab){
                                    if(!noTabRect) sbuf += '<tr><td class="ftab_tab">';
                                    else sbuf += '<tr><td class="ftab_tab ftab_tab_norect">';
                                    for(var i = 0; i < tabPages.length; i++){
                                      sbuf += '<span title='+tabPages[i].title+'><span class="ftab_deact" id="' + m_ID + '_p_title' + i + '">' + tabPages[i].title;
                                      sbuf += '</span><span class="ftab_deactr" id="' + m_ID + '_p_r' + i + '">  </span></span>';
                                    }
                                    sbuf += '<img src="'+FTab_PATH+'ftab_blank.gif" class="ftab_tabh';
                                    if(!noTabRect) sbuf += '"/>';
                                    else sbuf += ' ftab_tab_norecth"/>';
                                    sbuf += '</td></tr>';
                                  }
                                  //add Body
                                  if(!noTabRect) sbuf += '<tr><td class="ftab_body"';
                                  else sbuf += '<tr><td class="ftab_body ftab_body_norect"';
                                  sbuf += ' style="height:99%;vertical-align:top;" id="' + m_ID + '_m_body"></td></tr>';
                                  //add StatusBar
                                  if(!noStatus && !noTabRect){
                    
                                    sbuf += '<tr><td class="ftab_status">';
                                    sbuf += '<span id="' + m_ID + '_s_title"></span><img src="'+FTab_PATH+'ftab_blank.gif" class="ftab_statush"/>';
                                    if(!noResize) sbuf += '<img src="'+FTab_PATH+'ftab_resize.gif" class="ftab_statush" style="cursor:nw-resize;" id="' + m_ID + '_s_move"/>';
                                    sbuf += '</td></tr>';
                                  }
                                  sbuf += '</table>';
                              
                                  var div = document.createElement('DIV');
                                  oMain.insertBefore(div, oMain.firstChild);
                                  div.style.cssText = 'height:100%;width:100%;margin:0px;padding:0px;';
                                  div.innerHTML = sbuf;
                              
                                  oBody = document.getElementById(m_ID + '_m_body');
                                  var oTable = document.getElementById(m_ID + '_m_table');
                                  //add Body Contents
                                  for(var i = 0; i < tabPages.length; i++)
                                  {
                                    tabPages[i].className = 'ftab_bodysub';
                                    oBody.appendChild(tabPages[i]);
                                    sbuf = '' + tabPages[i].style.cssText;
                                    if(noScroll) sbuf = 'overflow-x:hidden;overflow-y:hidden;' + sbuf;
                                    else sbuf = 'overflow-x:auto;overflow-y:auto;' + sbuf;
                                    if(navigator.userAgent.indexOf('Opera')>=0 && !noScroll) sbuf = 'overflow:scroll;' + sbuf;
                                    tabPages[i].style.cssText = sbuf; //'margin:0px;padding:0px;' + 
                                  }
                              
                                  if(!noTitle){
                                    var oTmp = document.getElementById(m_ID + '_t_title').parentNode;
                                    oTmp.onselectstart = cancelEvent;
                                    oTmp.ondragstart = cancelEvent;
                                    oTmp.onmousedown = doMDown;
                                    if(expandAble){
                                      oTmp.onclick = function(){switchMinMax();return false;};
                                      oTmp.style.cursor = 'pointer';
                                    }
                                    if(!noMove){
                                      oTmp.style.cursor = 'move';
                                      oMain.style.position = 'absolute';
                                    }
                                    if(!noMinMax){
                                      var oTmp = document.getElementById(m_ID + '_t_min');
                                      oTmp.onclick = function(){switchMinMax();return false;};
                                    }
                                    if(!noClose){
                                      var oTmp = document.getElementById(m_ID + '_t_close');
                                      oTmp.onclick = function(){hide();return false;};
                                    }
                                  }
                              
                                  if(!noTab){
                                    for(var i = 0; i < tabPages.length; i++)
                                    {
                                      var oTmp = document.getElementById(m_ID + '_p_title' + i);
                                      oTmp.onselectstart = cancelEvent;
                                      oTmp.ondragstart = cancelEvent;
                                      oTmp.onmousedown = cancelEvent;
                                      oTmp.save_index = i;
                                      oTmp.onclick = function(){show(this.save_index);return false;};
                              
                                      var oTmp = document.getElementById(m_ID + '_p_r' + i);
                                      oTmp.onselectstart = cancelEvent;
                                      oTmp.ondragstart = cancelEvent;
                                      oTmp.onmousedown = cancelEvent;
                                      oTmp.save_index = i;
                                      oTmp.onclick = function(){show(this.save_index);return false;};
                                    }
                                  }
                                  oTable.onmousedown = doBringToFront;
                                  oBody.onmousedown = doBringToFront;
                                  oMain.onmousedown = doBringToFront;
                              
                                  var oTmp = document.getElementById(m_ID + '_s_title');
                                  if(oTmp){
                                    oTmp.parentNode.onselectstart = cancelEvent;
                                    oTmp.parentNode.ondragstart = cancelEvent;
                                    oTmp.parentNode.onmousedown = cancelEvent;
                                    var oTmp = document.getElementById(m_ID + '_s_move');
                                    if(oTmp) oTmp.onmousedown = doMDownStatus;
                                  }
                              
                                  var nState = 1;
                                  var nZIndex = 0;
                                  if(!noCookie){
                                    var sbuf = FTab_GetCookie(m_ID + '.');
                                    if(sbuf){
                                      var sitems = sbuf.split('_');
                                      if(sitems.length==8){
                                        if(sitems[0]!='') showPageIndex = sitems[0]/1;
                                        if(sitems[1]!='') left = sitems[1]/1;
                                        if(sitems[2]!='') top = sitems[2]/1;
                                        if(sitems[3]!='') width = sitems[3]/1;
                                        if(sitems[4]!='') height = sitems[4]/1;
                                        if(sitems[5]!='') nState = sitems[5]/1;
                                        if(sitems[6]!='') nZIndex = sitems[6]/1;
                                      }
                                    }
                                  }
                              
                                  if(typeof(showPageIndex) != 'number' || showPageIndex >= tabPages.length || showPageIndex < 0) showPageIndex = 0;
                                  isInitOK = true;
                                  show(showPageIndex);
                                  if(nZIndex > 0){
                                    oMain.style.zIndex = nZIndex;
                                    if(FTab_ZIndex < nZIndex) FTab_ZIndex = nZIndex;
                                    FTab_SaveConfig(m_ID, false,false,false,false,false,false,nZIndex);
                                    //alert(nZIndex);
                                  }
                              
                                  //if not noMove,must set left&top
                                  if(!noMove){
                                    if(typeof(left) != 'number') left = oMain.offsetLeft;
                                    if(typeof(top) != 'number') top = oMain.offsetTop;
                                  }
                                  if(typeof(left) == 'number') oMain.style.left = left + 'px';
                                  else if(typeof(left) == 'string') oMain.style.left = left;
                                  if(typeof(top) == 'number') oMain.style.top = top + 'px';
                                  else if(typeof(top) == 'string') oMain.style.top = top;
                              
                                  //if not noResize,must set width&height
                                  if(!noResize){
                                    if(typeof(width) != 'number') width = oTable.clientWidth;
                                    if(typeof(height) != 'number') height = oTable.clientHeight;
                                  }
                                  if(typeof(width) == 'number'){
                                    minWidth(oMain);
                                    if(width < oMain.M_MinWidth) width = oMain.M_MinWidth;
                                    oMain.style.width = width + 'px';
                                    for(var i = 0; i < tabPages.length; i++)
                                      tabPages[i].style.width = width + 'px';
                                  }
                                  else if(typeof(width) == 'string') oMain.style.width = width;
                                  if(typeof(height) == 'number'){
                                    oMain.M_OffsetH = (oMain.clientHeight - tabPages[selectedIndex].clientHeight);
                                    height -= oMain.M_OffsetH;
                                    if(height < 0) height = 0;
                                    height += oMain.M_OffsetH;
                                    oMain.style.height = height + 'px';
                                    oMain.M_OffsetH = height;
                                    var oTmp = document.getElementById(m_ID + '_t_title');
                                    if(oTmp) height -= oTmp.parentNode.clientHeight;
                                    var oTmp = document.getElementById(m_ID + '_p_title0');
                                    if(oTmp) height -= oTmp.parentNode.parentNode.clientHeight;
                                    var oTmp = document.getElementById(m_ID + '_s_title');
                                    if(oTmp) height -= oTmp.parentNode.clientHeight;
                                    oMain.M_OffsetH -= height;
                              
                                    for(var i = 0; i < tabPages.length; i++)
                                      tabPages[i].style.height = height + 'px';
                                    oBody.style.height = height + 'px';
                                  }
                                  else if(typeof(height) == 'string') oMain.style.height = height;
                              
                                  if(FTab_MSIE && !noMove){
                                    var iframe = document.createElement('<IFRAME id="' + m_ID + '_i_ifrm" scrolling="no" frameborder="0" src="about:blank" style="position:absolute;padding:0px;top:-1px;left:-1px;z-index:3;">');
                                    oMain.appendChild(iframe);
                                    oTable.parentNode.style.cssText = 'position:absolute;height:100%;width:100%;margin:0px;padding:0px;top:0px;left:0px;z-index:10;';
                                    iframe.style.width = (oTable.clientWidth+3) + 'px';
                                    iframe.style.height = (oTable.clientHeight+3) + 'px';
                                  }
                                  if(nState == 0) switchMinMax();
                              
                                  return this;
                                }
                              
                                //private function(obj = oMain)
                                function minWidth(obj)
                                {
                                  var oTmp = document.getElementById(obj.m_ID + '_t_title');
                                  if(oTmp){
                                    obj.M_MinWidth = oTmp.clientWidth + 15;
                                    if(!obj.noMinMax) obj.M_MinWidth += 20;
                                    if(!obj.noClose) obj.M_MinWidth += 20;
                                  }
                                  else obj.M_MinWidth = 32;
                              
                                  var minw2 = 0;
                                  for(var i = 0; i < obj.tabPages.length; i++){
                                    var oTmp = document.getElementById(obj.m_ID + '_p_title' + i);
                                    if(oTmp) minw2 += (oTmp.offsetWidth + 1);
                                    var oTmp = document.getElementById(obj.m_ID + '_p_r' + i);
                                    if(oTmp) minw2 += (oTmp.offsetWidth + 1);
                                  }
                                  if(obj.M_MinWidth < minw2) obj.M_MinWidth = minw2;
                              
                                  oTmp = document.getElementById(obj.m_ID + '_s_title');
                                  if(oTmp){
                                    minw2 = oTmp.clientWidth + 15;
                                    if(!obj.noResize) minw2 += 20;
                                    if(obj.M_MinWidth < minw2) obj.M_MinWidth = minw2;
                                  }
                                  return obj.M_MinWidth;
                                }
                              
                                this.doBringToFront = doBringToFront;
                                function doBringToFront(e, esrc)
                                {
                                  if(!esrc){
                                    if(document.all) e = event;
                                    if(e) esrc = e.target || e.srcElement;
                                    if(!esrc) return true;
                                  }
                                  while(esrc && esrc != document){
                                    if(esrc.m_ID && esrc.objCreated == 1){
                                      if(FTab_ActWin == esrc && esrc.style.zIndex >= FTab_ZIndex) return true;
                                      if(FTab_ActWin && FTab_ActWin.m_ID){
                                        var oTmp = document.getElementById(FTab_ActWin.m_ID + '_t_title');
                                        if(oTmp) oTmp.parentNode.className = 'ftab_title';
                                        if(FTabs && typeof(FTabs.OnDeActing) == 'function'){
                                          try{
                                            FTabs.OnDeActing(FTab_ActWin.objSelf);
                                          }catch(e){}
                                        }
                                      }
                                      FTab_ActWin = esrc;
                                      var oTmp = document.getElementById(esrc.m_ID + '_t_title');
                                      if(oTmp) oTmp.parentNode.className = 'ftab_title ftab_title_act';
                                      if(esrc.style && esrc.style.zIndex < FTab_ZIndex){
                                        //count parent
                                        var nparent = 1;
                                        var esrcparent = esrc;
                                        while(esrcparent && esrcparent != document){
                                          esrcparent = esrcparent.parentNode;
                                          if(esrcparent.m_ID && esrcparent.objCreated == 1 && esrcparent.style && esrcparent.style.position == 'absolute'){
                                            nparent++;
                                          }
                                        }
                                        FTab_ZIndex += nparent;
                                        if(FTab_ZIndex < 1001) FTab_ZIndex = 1001 + nparent;
                                        esrc.style.zIndex = FTab_ZIndex;
                                        FTab_SaveConfig(esrc.m_ID, false,false,false,false,false,false,esrc.style.zIndex);
                                        //set parent zIndex
                                        nparent = FTab_ZIndex;
                                        while(nparent > 1 && esrc && esrc != document){
                                          esrc = esrc.parentNode;
                                          if(esrc.m_ID && esrc.objCreated == 1 && esrc.style && esrc.style.position == 'absolute'){
                                            nparent -= 1;
                                            esrc.style.zIndex = nparent;
                                            FTab_SaveConfig(esrc.m_ID, false,false,false,false,false,false,esrc.style.zIndex);
                                          }
                                        }
                                      }
                                      break;
                                    }
                                    esrc = esrc.parentNode;
                                  }
                              
                                  if(FTab_ActWin && FTabs && typeof(FTabs.OnActing) == 'function'){
                                    try{
                                      FTabs.OnActing(FTab_ActWin.objSelf);
                                    }catch(e){}
                                  }
                                  return true;
                                }
                              
                                this.doMDownStatus = doMDownStatus;
                                function doMDownStatus(e)
                                {
                                  if(document.all)e = event;
                                  doBringToFront(e);
                                  if((e.button && e.button != 1) || (e.which && e.which != 1)) return false;
                                  FTab_ActWin = oMain;
                                  FTab_ActWin.M_InitX = e.clientX;
                                  FTab_ActWin.M_InitY = e.clientY;
                                  FTab_ActWin.M_StatusCnt = 20;
                                  FTab_ActWin.oBody = document.getElementById(oMain.m_ID + '_m_body');
                              
                                  FTab_ActWin.M_PosY = oMain.style.height.replace('px','')/1;
                                  FTab_ActWin.M_PosX = oMain.style.width.replace('px','')/1;
                                  FTab_ActWin.M_Moving = true;
                                  FTab_ActWin.M_MovingType = 2;
                                  FTab_ActWin.M_MinWidth = -1;
                                  FTab_ActWin.M_DocMMove = document.onmousemove;
                                  FTab_ActWin.M_DocMStop = document.onmouseup;
                                  document.onmousemove = doMMove;
                                  document.onmouseup = doMUp;
                                  return false;
                                }
                              
                                this.doMDown = doMDown;
                                function doMDown(e)
                                {
                                  if(document.all)e = event;
                                  doBringToFront(e);
                                  var oTmp = document.getElementById(m_ID + '_t_title');
                                  if(!oTmp || !oMain.style || oMain.style.position != 'absolute' || oTmp.parentNode.style.cursor == 'default') return false;
                                  if((e.button && e.button != 1) || (e.which && e.which != 1)) return false;
                                  FTab_ActWin = oMain;
                                  FTab_ActWin.M_InitX = e.clientX;
                                  FTab_ActWin.M_InitY = e.clientY;
                                  FTab_ActWin.M_PosX = oMain.style.left.replace('px','')/1;
                                  FTab_ActWin.M_PosY = oMain.style.top.replace('px','')/1;
                                  FTab_ActWin.M_Moving = true;
                                  FTab_ActWin.M_MovingType = 1;
                                  FTab_ActWin.M_DocMMove = document.onmousemove;
                                  FTab_ActWin.M_DocMStop = document.onmouseup;
                                  document.onmousemove = doMMove;
                                  document.onmouseup = doMUp;
                                  return false;
                                }
                                this.doMUp = doMUp;
                                function doMUp(e)
                                {
                                  if(!FTab_ActWin || !FTab_ActWin.M_Moving) return false;
                                  document.onmousemove = (FTab_ActWin.M_DocMMove ? FTab_ActWin.M_DocMMove : null);
                                  document.onmouseup = (FTab_ActWin.M_DocMStop ? FTab_ActWin.M_DocMStop : null);
                                  FTab_ActWin.M_Moving = false;
                                  if(FTab_ActWin.M_MovingType == 1){
                                    FTab_SaveConfig(FTab_ActWin.m_ID, false,FTab_ActWin.style.left.replace('px','')/1,FTab_ActWin.style.top.replace('px','')/1,false,false,false,false);
                                  }
                                  else{
                                    FTab_SaveConfig(FTab_ActWin.m_ID, false,false,false,FTab_ActWin.style.width.replace('px','')/1,FTab_ActWin.style.height.replace('px','')/1,false,false);
                                  }
                                  return false;
                                }
                                this.doMMove = doMMove;
                                function doMMove(e)
                                {
                                  if(!FTab_ActWin || !FTab_ActWin.M_Moving) return false;
                                  if(document.selection) document.selection.empty();
                                  else if(window.getSelection) window.getSelection().removeAllRanges();
                                  if(document.all){
                                    e = event;
                                    if(e.button != 1) return doMUp(e);
                                  }
                                  else if(e.which != 1) return doMUp(e);
                                  var leftPos = FTab_ActWin.M_PosX + e.clientX - FTab_ActWin.M_InitX;
                                  var topPos = FTab_ActWin.M_PosY + e.clientY - FTab_ActWin.M_InitY;
                                  if(topPos < 0) topPos = 0;
                                  if(leftPos < 0) leftPos = 0;
                                  if(FTab_ActWin.M_MovingType == 1){
                                    FTab_ActWin.style.left = leftPos + 'px';
                                    FTab_ActWin.style.top = topPos + 'px';
                                  }
                                  else{
                                    if(FTab_ActWin.M_StatusCnt >= 5){
                                      if(!FTab_ActWin.M_MinWidth || FTab_ActWin.M_MinWidth <= 0){
                                        minWidth(FTab_ActWin);
                                      }
                              
                                      if(leftPos < FTab_ActWin.M_MinWidth) leftPos = FTab_ActWin.M_MinWidth;
                                      var oTmp = document.getElementById(FTab_ActWin.m_ID + '_m_table');
                                      var cur = oTmp.clientWidth;
                                      FTab_ActWin.tabPages[selectedIndex].style.width = leftPos + 'px';
                                      FTab_ActWin.style.width = leftPos + 'px';
                                      if(cur >= oTmp.clientWidth - 10 && cur <= oTmp.clientWidth + 10){
                                        FTab_ActWin.tabPages[selectedIndex].style.width = oTmp.clientWidth + 'px';
                                        FTab_ActWin.style.width = oTmp.clientWidth + 'px';
                                        leftPos = oTmp.clientWidth;
                                      }
                              
                                      topPos -= FTab_ActWin.M_OffsetH;
                                      if(topPos < 6) topPos = 6;
                                      FTab_ActWin.tabPages[selectedIndex].style.height = topPos + 'px';
                                      FTab_ActWin.oBody.style.height = topPos + 'px';
                                      topPos += FTab_ActWin.M_OffsetH;
                                      FTab_ActWin.style.height = topPos + 'px';
                                      FTab_ActWin.tabPages[selectedIndex].style.height = (topPos-FTab_ActWin.M_OffsetH) + 'px';
                                      FTab_ActWin.oBody.style.height = (topPos-FTab_ActWin.M_OffsetH) + 'px';
                              
                                      var oTmp2 = document.getElementById(FTab_ActWin.m_ID + '_i_ifrm');
                                      if(oTmp2){
                                        var oTmp = document.getElementById(m_ID + '_m_table');
                                        oTmp2.style.width = (oTmp.clientWidth+3) + 'px';
                                        oTmp2.style.height = (oTmp.clientHeight+3) + 'px';
                                      }
                              
                                      FTab_ActWin.M_StatusCnt = 0;
                                      FTab_MMoveTimer();
                                    }
                                  }
                                  return false;
                                }
                              
                                this.cancelEvent = cancelEvent;
                                function cancelEvent()
                                {
                                  return false;
                                }
                              
                                //show TabPage
                                this.show = show;
                                function show(pageIndex)
                                {
                                  if(!isValid()) return false;
                                  doBringToFront(null, oMain);
                                  if(typeof(pageIndex) == 'number' && pageIndex < tabPages.length && pageIndex >= 0){
                                    var curH = tabPages[selectedIndex].style.height;
                                    var curW = tabPages[selectedIndex].style.width;
                                    selectedIndex = pageIndex;
                                    FTab_SaveConfig(m_ID, selectedIndex,false,false,false,false,false,false);
                                    for(var i = 0; i < tabPages.length; i++)
                                    {
                                      var div = document.getElementById(m_ID + '_p_title' + i);
                                      var divr = document.getElementById(m_ID + '_p_r' + i);
                                      if(i == pageIndex){
                                        tabPages[i].style.display = '';
                                        if(div) div.className = 'ftab_act';
                                        if(divr) divr.className = 'ftab_actr';
                                        tabPages[i].style.width = curW;
                                        tabPages[i].style.height = curH;
                                      }
                                      else{
                                        tabPages[i].style.display = 'none';
                                        if(div) div.className = 'ftab_deact';
                                        if(divr) divr.className = 'ftab_deactr';
                                      }
                                    }
                                  }
                                  oMain.style.display = '';
                                  if(FTabs && typeof(FTabs.OnPageShow) == 'function'){
                                    try{
                                      FTabs.OnPageShow(oMain.objSelf, selectedIndex);
                                    }catch(e){}
                                  }
                                  return true;
                                }
                              
                                this.switchMinMax = switchMinMax;
                                function switchMinMax()
                                {
                                  if(!isValid()) return false;
                                  doBringToFront();
                                  var oTmp = document.getElementById(m_ID + '_m_table');
                                  if(oTmp.rows.length < 2) return true;
                              
                                  if(oTmp.save_display && oTmp.save_display == 'none') oTmp.save_display = ''
                                  else{
                                    oTmp.save_display = 'none';
                                    oTmp.save_bheight = tabPages[selectedIndex].style.height;
                                    oTmp.save_height = oMain.style.height;
                                    oTmp.save_width = oMain.style.width;
                                  }
                                  var headh = oTmp.rows[0].clientHeight;
                                  for(var i = 1; i < oTmp.rows.length; i++){
                                    oTmp.rows[i].style.display = oTmp.save_display;
                                  }
                                  if(oTmp.save_display == 'none'){
                                    FTab_SaveConfig(m_ID, false,false,false,false,false,0,false);
                                    var headw = oTmp.clientWidth;
                                    if(!FTab_MSIE) headw+=6;
                                    oMain.style.height = headh + 'px';
                                    oMain.style.width = (headw+4) + 'px';
                                    var oTmp2 = document.getElementById(m_ID + '_t_min');
                                    if(oTmp2 && oTmp2.src) oTmp2.src = FTab_PATH+'ftab_max.gif';
                                    oTmp2 = document.getElementById(m_ID + '_t_pm');
                                    if(oTmp2 && oTmp2.src) oTmp2.src = FTab_PATH+'ftab_plus.gif';
                                    oTmp2 = document.getElementById(m_ID + '_i_ifrm');
                                    if(oTmp2) oTmp2.style.height = headh + 'px';
                                  }
                                  else{
                                    FTab_SaveConfig(m_ID, false,false,false,false,false,1,false);
                                    tabPages[selectedIndex].style.height = oTmp.save_bheight;
                                    oMain.style.height = oTmp.save_height;
                                    oMain.style.width = oTmp.save_width;
                                    var oTmp2 = document.getElementById(m_ID + '_t_min');
                                    if(oTmp2 && oTmp2.src) oTmp2.src = FTab_PATH+'ftab_min.gif';
                                    oTmp2 = document.getElementById(m_ID + '_t_pm');
                                    if(oTmp2 && oTmp2.src) oTmp2.src = FTab_PATH+'ftab_minus.gif';
                                    oTmp2 = document.getElementById(m_ID + '_i_ifrm');
                                    if(oTmp2) oTmp2.style.height = (oTmp.clientHeight+3) + 'px';
                                  }
                                  if(FTabs && typeof(FTabs.OnMinMax) == 'function'){
                                    try{
                                      FTabs.OnMinMax(oMain.objSelf, oTmp.save_display == 'none'); //ftab,isMin
                                    }catch(e){}
                                  }
                                  return true;
                                }
                              
                                this.hide = hide;
                                function hide()
                                {
                                  if(!isValid()) return false;
                                  oMain.style.display = 'none';
                                  if(FTabs && typeof(FTabs.OnHide) == 'function'){
                                    try{
                                      FTabs.OnHide(oMain.objSelf);
                                    }catch(e){}
                                  }
                                  return true;
                                }
                              
                                this.setTitle = setTitle;
                                function setTitle(str)
                                {
                                  if(!isValid()) return false;
                                  var div = document.getElementById(m_ID + '_t_title');
                                  if(div) div.innerHTML = str;
                                  oMain.title = str;
                                  minWidth(oMain);
                                  return true;
                                }
                              
                                this.setTabTitle = setTabTitle;
                                function setTabTitle(pageIndex, str)
                                {
                                  if(!isValid()) return false;
                                  if(typeof(pageIndex) == 'number' && pageIndex < tabPages.length && pageIndex >= 0){
                                    var div = document.getElementById(m_ID + '_p_title' + pageIndex);
                                    div.innerHTML = str;
                                    div.parentNode.title = str;
                                    tabPages[pageIndex].title = str;
                              
                                    if(!oMain.noResize){
                                      var nTitleW = document.getElementById(m_ID + '_m_table').clientWidth;
                                      oMain.style.width = nTitleW + 'px';
                                      if(!FTab_MSIE) nTitleW -= 6;
                                      tabPages[pageIndex].style.width = nTitleW + 'px';
                                    }
                                    minWidth(oMain);
                                  }
                                  return true;
                                }
                              
                                this.setBody = setBody;
                                function setBody(pageIndex, str)
                                {
                                  if(!isValid()) return false;
                                  if(typeof(pageIndex) == 'number' && pageIndex < tabPages.length && pageIndex >= 0) tabPages[pageIndex].innerHTML = str;
                                  return true;
                                }
                              
                                this.setURL = setURL;
                                function setURL(pageIndex, url)
                                {
                                  if(!isValid()) return false;
                                  if(typeof(pageIndex) == 'number' && pageIndex < tabPages.length && pageIndex >= 0){
                                    tabPages[pageIndex].style.cssText = 'overflow-x:hidden;overflow-y:hidden;' + tabPages[pageIndex].style.cssText;
                                    tabPages[pageIndex].innerHTML = '';
                                    var iframe = document.createElement('IFRAME');
                                    tabPages[pageIndex].style.cssText = 'margin:0px;padding:0px;' + tabPages[pageIndex].style.cssText;
                                    tabPages[pageIndex].appendChild(iframe);
                                    iframe.style.cssText = 'width:100%;height:100%;border:0;frameborder:no;';
                                    iframe.src = url;
                                    //TODO:do nothing next
                                    //iframe.onmousedown = doBringToFront;
                                  }
                                  return true;
                                }
                              
                                this.setStatus = setStatus;
                                function setStatus(str)
                                {
                                  if(!isValid()) return false;
                                  var div = document.getElementById(m_ID + '_s_title');
                                  if(div){
                                    var w = div.clientWidth;
                                    div.innerHTML = str;
                                    minWidth(oMain);
                                  }
                                  return true;
                                }
                              
                                //get selectedIndex
                                this.getSelectedIndex = getSelectedIndex;
                                function getSelectedIndex()
                                {
                                  return selectedIndex;
                                }
                              
                                //get selectedIndex
                                this.isHide = isHide;
                                function isHide()
                                {
                                  if(!isValid()) return false;
                                  return (oMain.style.display == 'none');
                                }
                              
                                //get selectedIndex
                                this.isMin = isMin;
                                function isMin()
                                {
                                  if(!isValid()) return false;
                                  var oTmp = document.getElementById(m_ID + '_m_table');
                                  return (oTmp.save_display == 'none');
                                }
                              
                                this.move = move;
                                function move(left, top, width, height)
                                {
                                  if(!isValid()) return false;
                                  if(typeof(left) == 'number') oMain.style.left = left + 'px';
                                  if(typeof(top) == 'number') oMain.style.top = top + 'px';
                              
                                  var min = isMin();
                                  if(!min && typeof(width) == 'number'){
                                    if(!oMain.M_MinWidth || oMain.M_MinWidth <= 0){
                                      minWidth(oMain);
                                    }
                                    if(width < oMain.M_MinWidth) width = oMain.M_MinWidth;
                                    var oTmp = document.getElementById(m_ID + '_m_table');
                                    var cur = oTmp.clientWidth;
                                    tabPages[selectedIndex].style.width = width + 'px';
                                    oMain.style.width = width + 'px';
                                    if(cur == oTmp.clientWidth){
                                      tabPages[selectedIndex].style.width = oMain.M_MinWidth + 'px';
                                      oMain.style.width = oMain.M_MinWidth + 'px';
                                    }
                                  }
                              
                                  if(!min && typeof(height) == 'number'){
                                    height -= oMain.M_OffsetH;
                                    if(height < 6) height = 6;
                                    tabPages[selectedIndex].style.height = height + 'px';
                                    oBody.style.height = height + 'px';
                                    height += oMain.M_OffsetH;
                                    oMain.style.height = height + 'px';
                                    tabPages[selectedIndex].style.height = (height-oMain.M_OffsetH) + 'px';
                                    oBody.style.height = (height-oMain.M_OffsetH) + 'px';
                                  }
                              
                                  if(!min && (typeof(width) == 'number' || typeof(height) == 'number')){
                                    var oTmp2 = document.getElementById(m_ID + '_i_ifrm');
                                    if(oTmp2){
                                      var oTmp = document.getElementById(m_ID + '_m_table');
                                      oTmp2.style.width = (oTmp.clientWidth+3) + 'px';
                                      oTmp2.style.height = (oTmp.clientHeight+3) + 'px';
                                    }
                                  }
                                }
                              
                                return this;
                              }
                              