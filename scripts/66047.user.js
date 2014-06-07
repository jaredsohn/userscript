// ==UserScript==
// @name           Best Youtube Downloader
// @author        Mega69
// @description   Inserts a donwload box in the description of the video
// @license       GPL 3
// @namespace      BestYoutubeDownloader__
// @include        http://*.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @include        http://*.dirpy.com/studio/*
// @include        http://dirpy.com/studio/*
// ==/UserScript==


(function() {




  if( location.href.indexOf("http://www.youtube.com") == 0 || location.href.indexOf("http://youtube.com") == 0) {

  
    
            var BY = {
            
              'opt': {
                'MP4 High Quality': ["18"],
                'MP4 HD 1280X720': ["22", "when available"],
                'MP4 HD 1920X1080': ["37", "when available"],
                'FLV Normal Quality': [""],
                'FLV High Quality': ["34", "when available"],
                'FLV Higher Quality': ["35", "when available"],
                '3GP Low Quality': ["13"],
                '3GP Normal Quality': ["17"],
                'MP3 High Quality': function() {
                  var url = "http://www.dirpy.com/studio/" + BY.yt.getConfig('SWF_ARGS')['video_id'];
                  if(BY.customization['GoToDirpy'][1] == "true") {
                    BY.openExternalSite(url);
                  } 
                  else
                    BY.iframe.setAttribute("src", url + '?bestyoutubedirectdownload=');
                },
                'GIF Animated': function() {
                  BY.openExternalSite("http://www.gifsoup.com/create/step1?youtube_url=http://www.youtube.com/watch?v=" +
                    BY.yt.getConfig('SWF_ARGS')['video_id']);
                },
                'Convert...': function() {
                  BY.openExternalSite("http://www.zamzar.com/url/?u=http://www.youtube.com/watch?v=" +
                    BY.yt.getConfig('SWF_ARGS')['video_id']);
                }
              },
              
              
              'moviePlayer': document.getElementById("movie_player"),
              'detailsVideo': document.getElementById("watch-url-embed-wrapper"),
              'customizationBox': document.createElement("form"),
              'form': document.createElement("form"),
              'label': document.createElement("label"),
              'select': document.createElement("select"),
              'input': document.createElement("input"),
              'button': document.createElement("button"),
              'iframe': document.createElement("iframe"),
              
              
              'styles': <css><![CDATA[
  
                #BYDCustomizationBox {
                    display: none;
                    padding: 5px;
                    border-top: solid 1px #ccc;
                    background: #fff;
                }
                
                #BYDCustomizationBox div {
                    display: block;
                }
                
                #BYDCustomizationBox label {
                    margin-left:3px;
                }
                
                #BYDCustomizationBox .hLink_container {
                    font: 11px Arial;
                    text-align: right;
                }
                
                #BYDCustomizationBox .hLink {
                    color: #03c;
                    cursor: pointer;
                }
                
                #BYDForm {
                  margin-left: 11px;
                  padding-bottom: 4px;
                }
                
                #BYDForm label {
                  display: block;
                  color: #666666;
                  line-height: 18px;
                  font-size: 11px;
                  font-weight: bold;
                  margin-right: 5px;
                  position: relative;
                  top: 3px;
                }
                
                #BYDForm select {
                  background-color: #ebebe4;
                  border: solid 1px #7f9db9;
                  width: 160px;
                  height: 18px;
                  font: 10px Arial;
                }
                
                #BYDForm input {
                  position: relative;
                  top: 2px;
                  width: 92px;
                  height: 20px;
                  font: 10px Arial;
                }
                
                #BYDForm button {
                  cursor: pointer;
                  width: 18px;
                  height: 18px;
                  position: relative;
                  bottom: 2px;
                  margin-left: 3px;
                  background: #fff url(data:image/png;base64,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%3D);
                }
                
                #BYDForm iframe {
                  width:0px;
                  height:0px;
                  border:0px;
                }
                
              ]]></css>,
              
              
              'customization': {
                'RememberLastFormat': ["Remember the last download format", "true"],
                'OpenExternalTab': ["Open external sites in an new tab", "true"],
                'GoToDirpy': ["Go to Dirpy.com when MP3 is chosen", "false"]

              },
              
              
              'createCustomizationBox': function() {
                var i, checkbox, label, div;
                for(i in BY.customization) {
                  if(BY.customization.constructor.prototype[i] !== BY.customization[i]) {
                    BY.customization[i][1] = GM_getValue(i, BY.customization[i][1]);
                    checkbox = document.createElement("input");
                    checkbox.setAttribute("type", "checkbox");
                    checkbox.setAttribute("name", i); 
                    if(BY.customization[i][1] == "true") checkbox.setAttribute("checked", "checked");
                    checkbox.addEventListener("click", BY.changeCostumization, 1); 
                    label = document.createElement("label");
                    label.setAttribute("for", BY.customization[i][0]);
                    label.appendChild(document.createTextNode(BY.customization[i][0]));
                    div = document.createElement("div");
                    div.appendChild(checkbox);
                    div.appendChild(label);
                    BY.customizationBox.appendChild(div);
                  }
                }
                var close = document.createElement("div"), 
                    closeLink = document.createElement("a");  
                close.setAttribute("class", "hLink_container");
                closeLink.setAttribute("class", "hLink");
                closeLink.addEventListener("click", BY.toogleCustomizationBox, 1);
                closeLink.appendChild(document.createTextNode("close"));
                close.appendChild(document.createTextNode("("));
                close.appendChild(closeLink);
                close.appendChild(document.createTextNode(")"));
                BY.customizationBox.appendChild(close);
                BY.customizationBox.setAttribute("id", "BYDCustomizationBox");
                document.getElementById("watch-customize-embed-div").parentNode.appendChild(BY.customizationBox);
              },
              
              
              'changeCostumization': function() {
                var name = this.getAttribute("name"),
                    set = BY.customization[name][1] = this.checked ? "true" : "false";
                GM_setValue(name, set);
              },
              
          
              'toogleCustomizationBox': function(ev) {
                ev.preventDefault();
                BY.customizationBox.style.display = ( BY.customizationBox.style.display != "block" ? "block" : "none" );
              },
              
              
              'appendOptions': function() {
                var opt, i, last = GM_getValue('LastFormat', ""),
                  fmt_map = decodeURIComponent(BY.yt.getConfig('SWF_ARGS')['fmt_map']);
                for(i in BY.opt) {
                  if(
                    BY.opt.constructor.prototype[i] !== BY.opt[i] && (
                    BY.opt[i][1] != "when available" ||
                    fmt_map.indexOf(BY.opt[i][0] + '/') != -1
                  )) {
                    opt = document.createElement("option");
                    opt.setAttribute("value", BY.opt[i][0] || BY.opt[i]);
                    opt.appendChild(document.createTextNode(i));
                    if(
                      BY.customization['RememberLastFormat'][1] == "true" && 
                      !!last && last == i
                    )
                      opt.defaultSelected = true;
                    BY.select.appendChild(opt);
                  }
                }
              },
              
              
              'clickDownload': function(ev) {
                ev.preventDefault();
                var sel = BY.select.getElementsByTagName("option")[BY.select.selectedIndex];
                GM_setValue('LastFormat', sel.childNodes[0].nodeValue);
                if(sel.getAttribute("value").indexOf("function") == -1) {
                  BY.iframe.setAttribute("src", 'http://youtube.com/get_video?' +
                    'video_id=' + BY.yt.getConfig('SWF_ARGS')['video_id'] + 
                    '&l=' + ( BY.yt.getConfig('SWF_ARGS')['l'] || '' ) + 
                    '&sk=' + BY.yt.getConfig('SWF_ARGS')['sk'] +
                    '&t=' + BY.yt.getConfig('SWF_ARGS')['t'] +
                    ( sel.value ? '&fmt=' + sel.value : '' )
                  )
                } else {
                  BY.opt[sel.childNodes[0].nodeValue]();
                }
              },
              
              
              'openExternalSite': function(url) {
                if(BY.customization['OpenExternalTab'][1] == "true")
                  GM_openInTab(url)
                else
                  location.href = url;
              },
              
              
              'initialize': function() {
                BY.yt = unsafeWindow.yt;
                GM_addStyle(BY.styles);
                BY.createCustomizationBox();
                BY.appendOptions();
                BY.form.setAttribute("id", "BYDForm");
                BY.label.setAttribute("for", "Download");
                BY.label.appendChild(document.createTextNode("Download"));
                BY.input.setAttribute("type", "submit");
                BY.input.setAttribute("value", "DOWNLOAD");
                BY.input.addEventListener("click", BY.clickDownload, 1);
                BY.button.addEventListener("mouseover", function() { this.style.backgroundPosition = "18px 0px"; }, 1);
                BY.button.addEventListener("mouseout", function() { this.style.backgroundPosition = "0px 0px"; }, 1);
                BY.button.addEventListener("click", BY.toogleCustomizationBox, 1);
                BY.form.appendChild(BY.label);
                BY.form.appendChild(BY.select);
                BY.form.appendChild(BY.input);
                BY.form.appendChild(BY.button);
                BY.form.appendChild(BY.iframe);
                BY.detailsVideo.appendChild(BY.form);
              }
          
            }
              
            BY.initialize();     
    
    
    
  } else if(location.href.indexOf("http://www.dirpy.com") == 0 || location.href.indexOf("http://dirpy.com") == 0) {
  
  
  
            if(location.href.indexOf("bestyoutubedirectdownload") != -1)
              window.addEventListener("load", function() {
                var b = document.getElementById("transcoder-download-box"),
                i = setInterval(function() {
                  if(b.offsetWidth != 0) {
                    clearInterval(i);
                    document.getElementById("studio-form").submit();
                  }
                }, 500);
              }, 1);
  
  
  
  }
  
  
  

})();
