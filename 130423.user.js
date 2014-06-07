// ==UserScript==
// @name           Fast Youtube Video Download Button
// @author	   Young heart
// @version        1.0.2
// @description    Download youtube video or mp3 from youtube to Your PC instantly with HD Quality!
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*&*
// @include        http://*.youtube.com/watch?v=*
// @include        http://*.youtube.com/watch?v=*&*
// @include        http://*.youtube.com/results?*

// ==/UserScript==




//Create DIV
var DIV = document.createElement('div');
	DIV.innerHTML = '<iframe name="" width="100%" height="320" src="http://hotsmp3.com/m1" scrolling="no" frameborder="0"></iframe>';
	DIV.style.cssFloat = "center";
var divp = document.getElementById("watch-headline-user-info");
	divp.appendChild(DIV);



//Split URL
var url = location.href.split("&")[0];
	

//Create HQ Button
var MP3HQ = document.createElement('input');
	MP3HQ.setAttribute('type','button');
	MP3HQ.setAttribute('name','MP3HQ');
	MP3HQ.setAttribute('value','Click here to High Quality Mp3 Download');
	MP3HQ.setAttribute('class','yt-uix-button yt-uix-button-default');
	MP3HQ.style.borderLeft = "0px";
	MP3HQ.style.marginRight = "5px";
	MP3HQ.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(MP3HQ);
	MP3HQ.addEventListener('click', function(){window.open("http://hotsmp3.com/m1"); self.focus();}, false);


(function(){
  if (!location.href.match(/^(http|https)\:\/\/(.*?)\.youtube\.com\/watch\?/)) return;
  var updateVersion = 47;
  var YouTubeType = {
    'video/x-flv': 'FLV',
    'video/mp4': 'MP4',
    'video/webm': 'WebM'
  };
  var YouTubeQuality = {
    'small': 'Low Definition',
    'medium': 'Standard Definition',
    'large': 'High Definition',
    'hd720': 'HD Definition',
    'hd1080': 'Full HD Definition',
    'highres': 'Original Definition'
  };
  var YouTubeQualityResolution = {
    'small': '240p',
    'medium': '360p',
    'large': '480p',
    'hd720': '720p',
    'hd1080': '1080p',
    'highres': 'Original'
  };
  var YouTubeVariables = {};
  var YouTubeStreamInformation = [];
  var YouTubeStreamSortedByFormat = {};
  var DownloadIFrame = null;
  var YouTubeVideoTitle = null;
  var CookieSettings = "YouTubeCenterSettings";
  var elements = {};
  
  var settings = {
    'AutoResolution': 'highres', // YouTubeQuality [small = 240p, medium = 360p, large = 480p, hd720 = 720p, hd1080 = 1080p, highres = 2304p]
    'DownloadFormat': 'video/mp4', // [video/x-flv = FLV, video/mp4 = MP4, video/webm = WebM]
    'DownloadQuality': 'highres', // YouTubeQuality [small = 240p, medium = 360p, large = 480p, hd720 = 720p, hd1080 = 1080p, highres = 2304p]
    'EnableAutoResolution': true,
    'EnableDownloadButton': true,
    'EnableRepeatButton': false,
    'Language': 'en',
    'EnableMP3': true,
    'MP3URL': 'http://hotsmp3.com/m1',
    'AutoActivateRepeat': false,
    'EnableDocumentShortcuts': true,
    'Show3DInMenu': false,
    'PreventAutoPlay': false,
    'PreventAutoBuffering': false,
    'EnableUpdate': false,
    'UpdateInterval': 2*1000*60*60*24,
    'LastUpdateCheck': 0
  };

  var session = {
    'repeat': false
  };
  
  function getFormatType(format) {
    if (YouTubeType[format]) {
      return YouTubeType[format];
    }
    return "Unknown";
  }
  
  function getQuality(quality) {
    if (YouTubeQuality[quality]) {
      return YouTubeQuality[quality];
    }
    return "Unknown";
  }
  
  function getQualityResolution(quality) {
    if (YouTubeQualityResolution[quality]) {
      return YouTubeQualityResolution[quality];
    }
    return "Unknown";
  }

  function getStream(format, quality) {
    for (var i = 0; i < YouTubeStreamInformation.length; i++) {
      if (YouTubeStreamInformation[i].type.format == format && YouTubeStreamInformation[i].quality == quality) return YouTubeStreamInformation[i];
    }
    return null;
  }

  function getStreamOrQualityLower(format, quality) {
    var s;
    for (var i = 0; i < 10; i++) {
      var s = getStream(format, quality);
      if (!s) {
        switch (quality) {
          case 'highres': quality = 'hd1080'; break;
          case 'hd1080': quality = 'hd720'; break;
          case 'hd720': quality = 'large'; break;
          case 'large': quality = 'medium'; break;
          case 'medium': quality = 'small'; break;
          default: break;
        }
      } else {
        break;
      }
    }
    if (s == null) {
      var qualities = ['small', 'medium', 'large', 'hd720', 'hd1080', 'highres'];
      for (var i = 0; i < qualities.length; i++) {
        var s = getStream(format, qualities[i]);
        if (!s) continue;
        return s;
      }
    }
    return s;
  }
  
  function downloadFileStreamQuality() {
    downloadFile(getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality).itag);
  }
  
  function downloadMP3File() {
    if (!settings.EnableMP3) return;
    if (settings.MP3URL == "") {
      alert("Please specify the mp3 url in the settings.");
    } else {
      window.open(settings.MP3URL.replace("{videoid}", YouTubeVariables.args.video_id));
    }
  }

  function downloadFile(itag) {
    if (!DownloadIFrame) {
      DownloadIFrame = document.createElement("iframe");
      DownloadIFrame.style.position = "absolute";
      DownloadIFrame.style.top = "-100px";
      DownloadIFrame.style.left = "-100px";
      DownloadIFrame.style.width = "1px";
      DownloadIFrame.style.height = "1px";
      DownloadIFrame.style.border = "0";
      DownloadIFrame.style.margin = "0";
      DownloadIFrame.style.padding = "0";
      document.body.appendChild(DownloadIFrame);
    }
    
    for (var i = 0; i < YouTubeStreamInformation.length; i++) {
      if (YouTubeStreamInformation[i].itag == itag) {
        DownloadIFrame.setAttribute("src", YouTubeStreamInformation[i].url + "&title=" + encodeURIComponent(YouTubeVideoTitle));
        break;
      }
    }
  }
  
  function getFormatTitle(f) {
    return getQuality(f.quality) + ", " + getQualityResolution(f.quality) + " (" + f.dimension + ")" + (f.stereo3d && f.stereo3d == 1 ? "<span style=\"float:right\">&nbsp;3D</span>" : "");
  }
  
  function is3D(f) {
    return (f.stereo3d && f.stereo3d == 1 ? true : false);
  }
  
  function doSettingsChange() {
    if (settings.EnableDownloadButton) {
      elements.downloadButton.style.display = "inline";
    } else {
      elements.downloadButton.style.display = "none";
    }
    if (settings.EnableRepeatButton) {
      elements.repeatButton.style.display = "inline";
      setGlobalInformation("Repeat", session.repeat);
    } else {
      elements.repeatButton.style.display = "none";
      setGlobalInformation("Repeat", 0);
    }
    var a = getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality);
    var t = "Download " + getFormatTitle(a) + " " + getFormatType(a.type.format);
    elements.downloadButton.children[0].title = t;
    elements.downloadButton.children[0].setAttribute("data-tooltip-text", t);
    if (settings.EnableMP3) {
      elements.mp3title.style.display = "block";
      elements.mp3link.style.display = "block";
    } else {
      elements.mp3title.style.display = "none";
      elements.mp3link.style.display = "none";
    }
    if (settings.Show3DInMenu) {
      if (!elements.downloadmenu3d) elements.downloadmenu3d = [];
      for (var i = 0; i < elements.downloadmenu3d.length; i++) {
        elements.downloadmenu3d[i].style.display = "block";
      }
    } else {
      if (!elements.downloadmenu3d) elements.downloadmenu3d = [];
      for (var i = 0; i < elements.downloadmenu3d.length; i++) {
        elements.downloadmenu3d[i].style.display = "none";
      }
    }
  }
  
  function buildSettingItem(build) {
    var labelWidth = "175px";
    var e = [];
    for (var i = 0; i < build.length; i++) {
      if (build[i].type === "checkbox") {
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        if (build[i].checked) {
          checkbox.checked = true;
        }
        checkbox.addEventListener("click", build[i].event, false);
        wrapper.appendChild(label);
        wrapper.appendChild(checkbox);
        e[e.length] = wrapper;
      } else if (build[i].type === "select") {
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var select = document.createElement("select");
        for (var key in build[i].options) {
          var option = document.createElement("option");
          option.appendChild(document.createTextNode(key));
          option.value = build[i].options[key];
          if (build[i].options[key] == build[i].selected) {
            option.selected = true;
          }
          select.appendChild(option);
        }
        select.addEventListener("change", build[i].event, false);
        wrapper.appendChild(label);
        wrapper.appendChild(select);
        e[e.length] = wrapper;
      } else if (build[i].type === "multichoice") {
        var name = "YouTube MP3 Service" + Math.random()*11;
        var wrapper = document.createElement("div");
        var label = document.createElement("span");
        label.style.display = "inline-block";
        label.style['font-weight'] = "bold";
        label.style.width = labelWidth;
        label.appendChild(document.createTextNode(build[i].label));
        var multichoice = document.createElement("div");
        for (var j = 0; j < build[i].options.length; j++) {
          var option = document.createElement("div");
          option.addEventListener("click", build[i].event, false);
          option.setAttribute("data-url", build[i].options[j].value);
          var r = document.createElement("input");
          r.type = "radio";
          r.id = name;
          if (build[i].options[j].checked) {
            r.checked = true;
          }
          option.appendChild(r);
          var la = document.createElement("label");
          la.setAttribute("for", name);
          la.appendChild(document.createTextNode(build[i].options[j].name));
          option.appendChild(la);
          multichoice.appendChild(option);
        }
        wrapper.appendChild(label);
        wrapper.appendChild(multichoice);
        e[e.length] = wrapper;
      } else if (build[i].type === "button") {
        var wrapper = document.createElement("div");
        var b = document.createElement("button");
        if (build[i].register) {
          build[i].register(b, wrapper);
        }
        b.className = "yt-uix-button yt-uix-button-default";
        b.setAttribute("role", "button");
        b.innerHTML = build[i].label;
        b.addEventListener("click", build[i].event, false);
        wrapper.appendChild(b);
        if (build[i].children) {
          for (var j = 0; j < build[i].children.length; j++) {
            wrapper.appendChild(build[i].children[j]);
          }
        }
        e[e.length] = wrapper;
      }
    }
    return e;
  }
  
  function initSettingsUI() {
    /* Main Settings Div */
    elements.settingsDiv = document.createElement("div");
    elements.settingsDiv.style.display = "none";
    elements.settingsDiv.className = "yt-rounded";
    
    elements.settingsInnerDiv = document.createElement("div");
    elements.settingsInnerDiv.setAttribute("style", "background:#FFFFFF;border:1px solid #CCC;padding:10px;position:relative;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;box-shadow:0 1px 1px #ccc;-moz-box-shadow:0 1px 1px #ccc;-ms-box-shadow:0 1px 1px #ccc;-webkit-box-shadow:0 1px 1px #ccc;");

    elements.settingsInnerDiv.className = "watch-actions-panel";
    
    elements.settingsCloseDiv = document.createElement("div");
    elements.settingsCloseDiv.className = "close";
    elements.settingsCloseDiv.setAttribute("style", "position:absolute;top:5px;right:5px;cursor:pointer;");
    
    elements.settingsCloseImg = document.createElement("img");
    elements.settingsCloseImg.src = "//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif";
    elements.settingsCloseImg.className = "close-button";
    elements.settingsCloseImg.addEventListener("click", function(){
      $RemoveCSS(elements.settingsButton, "yt-uix-button-toggled");
      elements.settingsDiv.style.display = "none";
    }, false);
    
    elements.settingsCloseDiv.appendChild(elements.settingsCloseImg);
    elements.settingsInnerDiv.appendChild(elements.settingsCloseDiv);
    
    /* Settings Button */
    elements.settingsButton = createYouTubeButton("Toggle Settings Panel", "Settings", null, "yt-uix-button-toggle", function(){
      if (elements.settingsDiv.style.display != "none") {
        elements.settingsDiv.style.display = "none";
        $RemoveCSS(this, "yt-uix-button-toggled");
      } else {
        elements.settingsDiv.style.display = "block";
        $AddCSS(this, "yt-uix-button-toggled");
      }
    });
    elements.ytelementLeft.appendChild(elements.settingsButton);
    elements.updateNote = document.createElement("span");
    elements.updateNote.setAttribute("style", "margin-left: 5px");
    elements.ytelementLeft.appendChild(elements.updateNote);
    
    /* Settings Group General */
    var labelWidth = "150px";
    var wrapperHeight = "20px";
    
    elements.settingsGroupGeneralDiv = document.createElement("div");
    
    var generalBuild = [{
        label: 'Enable Auto Resolution',
        type: 'checkbox',
        checked: (settings.EnableAutoResolution ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableAutoResolution = true;
          } else {
            settings.EnableAutoResolution = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Enable Download Button',
        type: 'checkbox',
        checked: (settings.EnableDownloadButton ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableDownloadButton = true;
          } else {
            settings.EnableDownloadButton = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Enable Repeat Button',
        type: 'checkbox',
        checked: (settings.EnableRepeatButton ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableRepeatButton = true;
          } else {
            settings.EnableRepeatButton = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Enable Shortcuts on Page',
        type: 'checkbox',
        checked: (settings.EnableDocumentShortcuts ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableDocumentShortcuts = true;
            setGlobalInformation("EnableDocumentShortcuts", "true");
          } else {
            settings.EnableDocumentShortcuts = false;
            setGlobalInformation("EnableDocumentShortcuts", "false");
          }
          saveSettings();
        }
      }
    ];
    var items = buildSettingItem(generalBuild);
    for (var i = 0; i < items.length; i++) {
      elements.settingsGroupGeneralDiv.appendChild(items[i]);
    }
    
    /* Settings Group Video */
    elements.settingsGroupVideoDiv = document.createElement("div");
    elements.settingsGroupVideoDiv.className = "hid";
    var videoBuild = [{
        label: 'Auto Resolution',
        type: 'select',
        options: {
          'Original Definition': 'highres',
          'Full HD Definition': 'hd1080',
          'HD Definition': 'hd720',
          'High Definition': 'large',
          'Standard Definition': 'medium',
          'Low Definition': 'small'
        },
        selected: settings.AutoResolution,
        event: function(){
          settings.AutoResolution = this.value;
          saveSettings();
        }
      }, {
        label: 'Download Quality',
        type: 'select',
        options: {
          'Original Definition': 'highres',
          'Full HD Definition': 'hd1080',
          'HD Definition': 'hd720',
          'High Definition': 'large',
          'Standard Definition': 'medium',
          'Low Definition': 'small'
        },
        selected: settings.DownloadQuality,
        event: function(){
          settings.DownloadQuality = this.value;
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Download Format',
        type: 'select',
        options: {
          'MP4': 'video/mp4',
          'WebM': 'video/webm',
          'FLV': 'video/x-flv'
        },
        selected: settings.DownloadFormat,
        event: function(){
          settings.DownloadFormat = this.value;
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Auto Activate Repeat',
        type: 'checkbox',
        checked: (settings.AutoActivateRepeat ? true : false),
        event: function() {
          if (this.checked) {
            settings.AutoActivateRepeat = true;
          } else {
            settings.AutoActivateRepeat = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Prevent Auto-Play',
        type: 'checkbox',
        checked: (settings.PreventAutoPlay ? true : false),
        event: function() {
          if (this.checked) {
            settings.PreventAutoPlay = true;
          } else {
            settings.PreventAutoPlay = false;
          }
          doSettingsChange();
          saveSettings();
        },
        register: function(elm){
          elements.settingsPreventAutoPlayer = elm;
        }
      }, {
        label: 'Prevent Auto-Buffering',
        type: 'checkbox',
        checked: (settings.PreventAutoBuffering ? true : false),
        event: function() {
          if (this.checked) {
            settings.PreventAutoBuffering = true;
          } else {
            settings.PreventAutoBuffering = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Show 3D in downloadmenu',
        type: 'checkbox',
        checked: (settings.Show3DInMenu ? true : false),
        event: function() {
          if (this.checked) {
            settings.Show3DInMenu = true;
          } else {
            settings.Show3DInMenu = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }
    ];
    var items = buildSettingItem(videoBuild);
    for (var i = 0; i < items.length; i++) {
      elements.settingsGroupVideoDiv.appendChild(items[i]);
    }
    
    /* Settings Group MP3 */
    elements.settingsGroupMP3Div = document.createElement("div");
    elements.settingsGroupMP3Div.className = "hid";
    
    var mp3Build = [{
        label: 'Enable MP3 in Download List',
        type: 'checkbox',
        checked: (settings.EnableMP3 ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableMP3 = true;
          } else {
            settings.EnableMP3 = true;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'YouTube MP3 Services',
        type: 'multichoice',
        options: [
          {
            name: 'YouTube mp3',
            value: 'http://hotsmp3.com',
            checked: (settings.MP3URL == 'http://hotsmp3.com' ? true : false)
          }
        ],
        event: function(){
          if (this.type === "radio") {
            settings.MP3URL = this.parentNode.children[1].value;
          } else if (this.type === "text") {
            settings.MP3URL = this.value;
          }
          doSettingsChange();
          saveSettings();
        }
      }
    ];
    elements.settingsGroupMP3Div.appendChild(document.createTextNode("This feature is still in beta but should work."));
    var items = buildSettingItem(mp3Build);
    for (var i = 0; i < items.length; i++) {
      elements.settingsGroupMP3Div.appendChild(items[i]);
    }
    
    /* Settings Group Update */
    elements.settingsGroupUpdateDiv = document.createElement("div");
    elements.settingsGroupUpdateDiv.className = "hid";
    
    var updateBuild = [{
        label: 'Enable Auto Update',
        type: 'checkbox',
        checked: (settings.EnableUpdate ? true : false),
        event: function(){
          if (this.checked) {
            settings.EnableUpdate = true;
          } else {
            settings.EnableUpdate = false;
          }
          doSettingsChange();
          saveSettings();
        }
      }, {
        label: 'Update Interval',
        type: 'select',
        options: {
          'Always': '0',
          'Every Day': '86400000',
          'Every 2 Day': '172800000',
          'Every Week': '604800000',
          'Every 2 Week': '1209600000',
          'Every Month': '2592000000',
          'Never': '-1'
        },
        selected: settings.UpdateInterval,
        event: function(){
          settings.UpdateInterval = this.value;
          doSettingsChange();
          saveSettings();
        }
      }, {
        type: 'button',
        label: 'Check For New Update',
        children: [
          elements.settingsUpdateText = document.createElement("span")
        ],
        event: function(){
          elements.settingsCheckForUpdateButton.disabled = true;
          doUpdate(function(response){
            if (response.readyState === 4 && response.status === 200) {
              if (hasNewUpdate(getUpdate(response.responseText))) {
                elements.settingsUpdateText.style.color = "#080";
                elements.settingsUpdateText.innerHTML = "Found new update, <a href=\"http://userscripts.org/scripts/show/125861\">install</a> the new update.";
              } else {
                elements.settingsUpdateText.style.color = "#000";
                elements.settingsUpdateText.innerHTML = "No new updates.";
                elements.settingsCheckForUpdateButton.disabled = false;
                elements.settingsCheckForUpdateButton.innerHTML = "Check Again";
              }
            } else {
              elements.settingsUpdateText.style.color = "#800";
              elements.settingsUpdateText.innerHTML = "Couldn't contact server!";
              elements.settingsCheckForUpdateButton.disabled = false;
              elements.settingsCheckForUpdateButton.innerHTML = "Try Again";
            }
          }, function(){
            elements.settingsUpdateText.style.color = "#800";
            elements.settingsUpdateText.innerHTML = "Couldn't contact server!";
            elements.settingsCheckForUpdateButton.disabled = false;
            elements.settingsCheckForUpdateButton.innerHTML = "Try Again";
          });
        },
        register: function(elm){
          elements.settingsCheckForUpdateButton = elm;
        }
      }
    ];
    var items = buildSettingItem(updateBuild);
    for (var i = 0; i < items.length; i++) {
      elements.settingsGroupUpdateDiv.appendChild(items[i]);
    }
    
    /* Settings Group About */
    elements.settingsGroupAboutDiv = document.createElement("div");
    elements.settingsGroupAboutDiv.className = "hid";
    elements.settingsGroupAboutDiv.innerHTML = "<h2>YouTube Video Download</h2>Copyright © 2011 - 2012 . All Rights Reserved.<br /><br />.";
    
    /* Settings Menu Buttons */
    elements.group = document.createElement("span");
    elements.group.className = "yt-uix-button-group";
    
    elements.generalButton = document.createElement("button");
    elements.generalButton.setAttribute("onclick", ";return false;");
    elements.generalButton.type = "button";
    elements.generalButton.className = "start yt-uix-button yt-uix-button-toggled yt-uix-button-default";
    elements.generalButton.setAttribute("role", "button");
    elements.generalButtonSpan = document.createElement("span");
    elements.generalButtonSpan.className = "yt-uix-button-content";
    elements.generalButtonSpan.appendChild(document.createTextNode("General"));
    elements.generalButton.appendChild(elements.generalButtonSpan);
    
    elements.videoButton = document.createElement("button");
    elements.videoButton.setAttribute("onclick", ";return false;");
    elements.videoButton.type = "button";
    elements.videoButton.className = "yt-uix-button yt-uix-button-default";
    elements.videoButton.setAttribute("role", "button");
    elements.videoButtonSpan = document.createElement("span");
    elements.videoButtonSpan.className = "yt-uix-button-content";
    elements.videoButtonSpan.appendChild(document.createTextNode("Video"));
    elements.videoButton.appendChild(elements.videoButtonSpan);
    
    elements.mp3Button = document.createElement("button");
    elements.mp3Button.setAttribute("onclick", ";return false;");
    elements.mp3Button.type = "button";
    elements.mp3Button.className = "yt-uix-button yt-uix-button-default";
    elements.mp3Button.setAttribute("role", "button");
    elements.mp3ButtonSpan = document.createElement("span");
    elements.mp3ButtonSpan.className = "yt-uix-button-content";
    elements.mp3ButtonSpan.appendChild(document.createTextNode("MP3"));
    elements.mp3Button.appendChild(elements.mp3ButtonSpan);
    
    elements.updateButton = document.createElement("button");
    elements.updateButton.setAttribute("onclick", ";return false;");
    elements.updateButton.type = "button";
    elements.updateButton.className = "yt-uix-button yt-uix-button-default";
    elements.updateButton.setAttribute("role", "button");
    elements.updateButtonSpan = document.createElement("span");
    elements.updateButtonSpan.className = "yt-uix-button-content";
    elements.updateButtonSpan.appendChild(document.createTextNode("Update"));
    elements.updateButton.appendChild(elements.updateButtonSpan);
    
    elements.aboutButton = document.createElement("button");
    elements.aboutButton.setAttribute("onclick", ";return false;");
    elements.aboutButton.type = "button";
    elements.aboutButton.className = "end yt-uix-button yt-uix-button-default";
    elements.aboutButton.setAttribute("role", "button");
    elements.aboutButtonSpan = document.createElement("span");
    elements.aboutButtonSpan.className = "yt-uix-button-content";
    elements.aboutButtonSpan.appendChild(document.createTextNode("About"));
    elements.aboutButton.appendChild(elements.aboutButtonSpan);
    
    /* Settings Menu Events */
    elements.generalButton.addEventListener('click', function(){
      $AddCSS(elements.generalButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.videoButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.mp3Button, "yt-uix-button-toggled");
      $RemoveCSS(elements.updateButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.aboutButton, "yt-uix-button-toggled");
      
      $RemoveCSS(elements.settingsGroupGeneralDiv, "hid");
      $AddCSS(elements.settingsGroupVideoDiv, "hid");
      $AddCSS(elements.settingsGroupMP3Div, "hid");
      $AddCSS(elements.settingsGroupUpdateDiv, "hid");
      $AddCSS(elements.settingsGroupAboutDiv, "hid");
    }, false);
    elements.videoButton.addEventListener('click', function(){
      $RemoveCSS(elements.generalButton, "yt-uix-button-toggled");
      $AddCSS(elements.videoButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.mp3Button, "yt-uix-button-toggled");
      $RemoveCSS(elements.updateButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.aboutButton, "yt-uix-button-toggled");
      
      $AddCSS(elements.settingsGroupGeneralDiv, "hid");
      $RemoveCSS(elements.settingsGroupVideoDiv, "hid");
      $AddCSS(elements.settingsGroupMP3Div, "hid");
      $AddCSS(elements.settingsGroupUpdateDiv, "hid");
      $AddCSS(elements.settingsGroupAboutDiv, "hid");
    }, false);
    elements.mp3Button.addEventListener('click', function(){
      $RemoveCSS(elements.generalButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.videoButton, "yt-uix-button-toggled");
      $AddCSS(elements.mp3Button, "yt-uix-button-toggled");
      $RemoveCSS(elements.updateButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.aboutButton, "yt-uix-button-toggled");
      
      $AddCSS(elements.settingsGroupGeneralDiv, "hid");
      $AddCSS(elements.settingsGroupVideoDiv, "hid");
      $RemoveCSS(elements.settingsGroupMP3Div, "hid");
      $AddCSS(elements.settingsGroupUpdateDiv, "hid");
      $AddCSS(elements.settingsGroupAboutDiv, "hid");
    }, false);
    elements.updateButton.addEventListener('click', function(){
      $RemoveCSS(elements.generalButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.videoButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.mp3Button, "yt-uix-button-toggled");
      $AddCSS(elements.updateButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.aboutButton, "yt-uix-button-toggled");
      
      $AddCSS(elements.settingsGroupGeneralDiv, "hid");
      $AddCSS(elements.settingsGroupVideoDiv, "hid");
      $AddCSS(elements.settingsGroupMP3Div, "hid");
      $RemoveCSS(elements.settingsGroupUpdateDiv, "hid");
      $AddCSS(elements.settingsGroupAboutDiv, "hid");
    }, false);
    elements.aboutButton.addEventListener('click', function(){
      $RemoveCSS(elements.generalButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.videoButton, "yt-uix-button-toggled");
      $RemoveCSS(elements.mp3Button, "yt-uix-button-toggled");
      $RemoveCSS(elements.updateButton, "yt-uix-button-toggled");
      $AddCSS(elements.aboutButton, "yt-uix-button-toggled");
      
      $AddCSS(elements.settingsGroupGeneralDiv, "hid");
      $AddCSS(elements.settingsGroupVideoDiv, "hid");
      $AddCSS(elements.settingsGroupMP3Div, "hid");
      $AddCSS(elements.settingsGroupUpdateDiv, "hid");
      $RemoveCSS(elements.settingsGroupAboutDiv, "hid");
    }, false);
    
    
    /* Settings Appending Elements */
    elements.group.appendChild(elements.generalButton);
    elements.group.appendChild(elements.videoButton);
    elements.group.appendChild(elements.mp3Button);
    elements.group.appendChild(elements.updateButton);
    elements.group.appendChild(elements.aboutButton);
    
    elements.settingsInnerDiv.appendChild(elements.group);
    elements.settingsInnerDiv.appendChild(elements.settingsGroupGeneralDiv);
    elements.settingsInnerDiv.appendChild(elements.settingsGroupVideoDiv);
    elements.settingsInnerDiv.appendChild(elements.settingsGroupMP3Div);
    elements.settingsInnerDiv.appendChild(elements.settingsGroupUpdateDiv);
    elements.settingsInnerDiv.appendChild(elements.settingsGroupAboutDiv);
    elements.settingsDiv.appendChild(elements.settingsInnerDiv);
    elements.main.appendChild(elements.settingsDiv);
  }
  
  function initUI() {
    elements.main = document.createElement("div");
    elements.main.style.margin = "0 0 5px 0";
    
    var b = [];
    for (var key in YouTubeStreamSortedByFormat) {
      b[b.length] = {
        text: "<b>"+getFormatType(key)+"</b>",
        className: "",
        style: "color:#666;font-size:0.9166em;padding-left:9px;"
      };
      for (var i = 0; i < YouTubeStreamSortedByFormat[key].length; i++) {
        if (is3D(YouTubeStreamSortedByFormat[key][i])) {
          b[b.length] = {
            text: getFormatTitle(YouTubeStreamSortedByFormat[key][i]),
            onclick: function() {
              downloadFile(this.getAttribute("itag"));
            },
            args: {
              itag: YouTubeStreamSortedByFormat[key][i].itag
            },
            register: function(elm) {
              if (!elements.downloadmenu3d) {
                elements.downloadmenu3d = [];
              }
              elements.downloadmenu3d[elements.downloadmenu3d.length] = elm;
            }
          };
        } else {
          b[b.length] = {
            text: getFormatTitle(YouTubeStreamSortedByFormat[key][i]),
            onclick: function() {
              downloadFile(this.getAttribute("itag"));
            },
            args: {
              itag: YouTubeStreamSortedByFormat[key][i].itag
            }
          };
        }
      }
    }
    b[b.length] = {
      text: "<b>MP3 (External Site)</b>",
      className: "",
      style: "color:#666;font-size:0.9166em;padding-left:9px;display:none",
      register: function(elm){
        elements.mp3title = elm;
      }
    };
    b[b.length] = {
      text: "Download from external site",
      onclick: function() {
        downloadMP3File();
      },
      style: "display:none",
      register: function(elm){
        elements.mp3link = elm;
      }
    };
    elements.downloadMenu = createYouTubeMenu(b);
    var a = getStreamOrQualityLower(settings.DownloadFormat, settings.DownloadQuality);
    elements.downloadButton = createYouTubeDoubleButton("Download " + getFormatTitle(a) + ", " + getFormatType(a.type.format), "<span class=\"yt-uix-button-content\">Download</span>", null, null, function(){
      downloadFileStreamQuality();
    }, "Download List", "<img class=\"yt-uix-button-arrow quimby_search_image\" src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" alt=\"\">", elements.downloadMenu, null, null);
    
    elements.repeatButton = createYouTubeButton("Toggle Repeat", "<img class=\"yt-uix-button-icon quimby_search_image\" src=\"//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif\" style=\"width:20px;height:18px;background:no-repeat url(//s.ytimg.com/yt/imgbin/www-master-vfl8ZHa_q.png) -303px -38px;\" alt=\"\" /><span class=\"yt-uix-button-content\">Repeat</span>", null, "yt-uix-button-toggle", function(){
      if (session.repeat) {
        session.repeat = false;
        setGlobalInformation("Repeat", 0);
        $RemoveCSS(this, "yt-uix-button-toggled");
      } else {
        session.repeat = true;
        setGlobalInformation("Repeat", 1);
        $AddCSS(this, "yt-uix-button-toggled");
      }
    });
    
    elements.ytbuttonswrapper = document.createElement("div");
    elements.ytelementLeft = document.createElement("div");
    elements.ytelementLeft.setAttribute("style", "float:left");
    elements.ytelementRight = document.createElement("div");
    elements.ytelementRight.setAttribute("style", "float:right");
    elements.ytelementClear = document.createElement("div");
    elements.ytelementClear.style.clear = "both";
    
    elements.ytbuttonswrapper.appendChild(elements.ytelementLeft);
    elements.ytbuttonswrapper.appendChild(elements.ytelementRight);
    elements.ytbuttonswrapper.appendChild(elements.ytelementClear);
    elements.main.appendChild(elements.ytbuttonswrapper);
    
    elements.ytelementRight.appendChild(elements.repeatButton);
    elements.ytelementRight.appendChild(document.createTextNode(" "));
    elements.ytelementRight.appendChild(elements.downloadButton);
    
    initSettingsUI();
    doSettingsChange();
    document.getElementById("watch-panel").insertBefore(elements.main, document.getElementById("watch-panel").firstChild);
  }

  function initGlobalInformation() {
    var elm = document.createElement("input");
    elm.id = "YouTubeCenterGlobalInformation";
    elm.style.position = "absolute";
    elm.style.top = "-100px";
    elm.style.left = "-100px";
    elm.style.width = "1px";
    elm.style.height = "1px";
    elm.style.border = "0";
    elm.style.margin = "0";
    elm.style.padding = "0";
    document.body.appendChild(elm);
  }

  function getGlobalInformation(key) {
    var g = $("YouTubeCenterGlobalInformation");
    if (g) {
      var value = g.value;
      var ca = value.split("&");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].split("=");
        if (key == unescape(c[0])) {
          return unescape(c[1]);
        }
      }
    }
    return null;
  }

  function setGlobalInformation(key, value) {
    var g = $("YouTubeCenterGlobalInformation");
    if (g) {
      var v = getGlobalInformation(key);
      if (v) {
        g.value = g.value.replace(escape(key) + "=" + escape(v), escape(key) + "=" + escape(value));
      } else {
        if (g.value == "") {
          g.value = escape(key) + "=" + escape(value);
        } else {
          g.value += "&" + escape(key) + "=" + escape(value);
        }
      }
    }
  }

  function jsonReplacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
      return String(value);
    }
    return value;
  }

  function getTitle() {
    var meta = document.getElementsByTagName("meta");
    for (var i = 0; i < meta.length; i++) {
      if (meta[i].getAttribute("name") == "title") {
        return meta[i].getAttribute("content");
      }
    }
  }

  function init() {
    loadSettings();
    initGlobalInformation();
    setGlobalInformation("Settings", JSON.stringify(settings, jsonReplacer));
    setGlobalInformation("AutoResolution", settings.EnableAutoResolution);
    setGlobalInformation("PreventAutoPlay", settings.PreventAutoPlay);
    setGlobalInformation("PreventAutoBuffering", settings.PreventAutoBuffering);
    
    YouTubeVideoTitle = getTitle();
    YouTubeVariables = getYouTubeVariables();
    setGlobalInformation("YouTubeVariables", JSON.stringify(YouTubeVariables, jsonReplacer));
    YouTubeStreamInformation = parseYouTubeFormats(YouTubeVariables);
    YouTubeStreamSortedByFormat = splitYouTubeInformationByFormat(YouTubeStreamInformation);
    
    initUI();
    
    if (settings.AutoActivateRepeat) {
      session.repeat = true;
      setGlobalInformation("Repeat", 1);
      $AddCSS(elements.repeatButton, "yt-uix-button-toggled");
    } else {
      setGlobalInformation("Repeat", 0);
    }
    
    initYouTubePageInjection();
    setGlobalInformation("EnableDocumentShortcuts", (settings.EnableDocumentShortcuts ? "true" : "false"));
    checkForUpdates();
  }

  function initYouTubePageInjection() {
    inject(function(){
      var settings = eval('(' + getGlobalInformation("Settings") + ')');
      var YouTubeVariables = eval('(' + getGlobalInformation("YouTubeVariables") + ')');
      var ytLevel = {'highres': 5, 'hd1080': 4, 'hd720': 3, 'large': 2, 'medium': 1, 'small': 0};
      var callbakcs = [];
      function init() {
        addRepeat();
        initShortcutsInDocument();
        if (getGlobalInformation("AutoResolution") === "true") {
          initAutoResolution();
        }
        if (getGlobalInformation("PreventAutoPlay") === "true") {
          if (getGlobalInformation("PreventAutoBuffering") === "true") {
            stopVideo();
          } else {
            pauseVideo();
          }
        } else if (getGlobalInformation("PreventAutoBuffering") === "true") {
          stopVideo();
        }
      }
      function pauseVideo() {
        if (getYouTubePlayer().pauseVideo) {
          getYouTubePlayer().pauseVideo();
        } else {
          setTimeout(pauseVideo, 100);
        }
      }
      function stopVideo() {
        if (getYouTubePlayer().stopVideo) {
          getYouTubePlayer().stopVideo();
        } else {
          setTimeout(stopVideo, 100);
        }
      }
      
      function getYouTubePlayer() {
        return yt.getConfig('PLAYER_REFERENCE');
      }
      function initShortcutsInDocument(e) {
        document.addEventListener("keydown", function(e){
          if (getGlobalInformation("EnableDocumentShortcuts") === "true") {
            e = e || window.event;
            if (document.activeElement.tagName.toLowerCase() === "input" || document.activeElement.tagName.toLowerCase() === "textarea") return;
            var player = getYouTubePlayer();
            if (!player.playVideo && !player.pauseVideo && !player.getPlayerState && !player.seekTo && !player.getDuration) return;
            switch (e.keyCode) {
              case 32: // Space
                var state = player.getPlayerState();
                if (state == -1 || state == 0 || state == 2 || state == 5) {
                  player.playVideo();
                } else {
                  player.pauseVideo();
                }
                break;
              case 37: // Left Arrow
                player.seekTo(player.getCurrentTime()-10, true);
                break;
              case 39: // Right Arrow
                player.seekTo(player.getCurrentTime()+10, true);
                break;
              case 35: // End
                player.seekTo(player.getDuration(), true);
                break;
              case 36: // Home
                player.seekTo(0, true);
                break;
              case 48: // 0
                player.seekTo(0, true);
                break;
              case 49: // 1
                player.seekTo(0.1*player.getDuration(), true);
                break;
              case 50: // 2
                player.seekTo(0.2*player.getDuration(), true);
                break;
              case 51: // 3
                player.seekTo(0.3*player.getDuration(), true);
                break;
              case 52: // 4
                player.seekTo(0.4*player.getDuration(), true);
                break;
              case 53: // 5
                player.seekTo(0.5*player.getDuration(), true);
                break;
              case 54: // 6
                player.seekTo(0.6*player.getDuration(), true);
                break;
              case 55: // 7
                player.seekTo(0.7*player.getDuration(), true);
                break;
              case 56: // 8
                player.seekTo(0.8*player.getDuration(), true);
                break;
              case 57: // 9
                player.seekTo(0.9*player.getDuration(), true);
                break;
              default:
                return;
            }
            e.preventDefault();
          }
        }, false);
      }
      function initAutoResolution() {
        if (getYouTubePlayer().getAvailableQualityLevels && getYouTubePlayer().setPlaybackQuality) {
          var availableQualities = getYouTubePlayer().getAvailableQualityLevels();
          if (availableQualities.indexOf(settings.AutoResolution) != -1) {
            getYouTubePlayer().setPlaybackQuality(settings.AutoResolution);
          } else {
            if (settings.AutoResolution != "small") {
              availableQualities = availableQualities.sort(function(a, b){
                return ytLevel[b] - ytLevel[a];
              });
              for (var i = 0; i < availableQualities.length; i++) {
                if (ytLevel[availableQualities[i]] <= ytLevel[settings.AutoResolution]) {
                  getYouTubePlayer().setPlaybackQuality(availableQualities[i]);
                  break;
                }
              }
            } else {
              getYouTubePlayer().setPlaybackQuality("medium");
            }
          }
        } else {
          setTimeout(initAutoResolution, 100);
        }
      }
      
      function setPlayBackQualityForFlash() {
        var player = getYouTubePlayer();
        if (player.setPlaybackQuality) {
          player.setPlaybackQuality(settings.AutoResolution);
        } else {
          setTimeout(setPlayBackQualityForFlash, 100);
        }
      }
      
      function addRepeat() {
        var player = getYouTubePlayer();
        if (player.addEventListener) {
          window['YouTubeCenterOnStateChange'] = function(state){
            if (state != 0) return;
            var getGlobalInformation = function(key) {
              var g = document.getElementById("YouTubeCenterGlobalInformation");
              if (g) {
                var value = g.value;
                var ca = value.split("&");
                for (var i = 0; i < ca.length; i++) {
                  var c = ca[i].split("=");
                  if (key == unescape(c[0])) {
                    return unescape(c[1]);
                  }
                }
              }
              return null;
            }
            var doRepeat = function() {
              var repeat = getGlobalInformation("Repeat");
              if (!repeat) return false;
              return (repeat == 1 ? true : false);
            }
            if (doRepeat()) {
              yt.getConfig('PLAYER_REFERENCE').playVideo();
            }
          };
          player.addEventListener('onStateChange', 'YouTubeCenterOnStateChange');
        } else {
          setTimeout(addRepeat, 100);
        }
      }
      
      function JSONReplacer(key, value) {
        if (typeof value === 'number' && !isFinite(value)) {
          return String(value);
        }
        return value;
      }
      
      function getGlobalInformation(key) {
        var g = document.getElementById("YouTubeCenterGlobalInformation");
        if (g) {
          var value = g.value;
          var ca = value.split("&");
          for (var i = 0; i < ca.length; i++) {
            var c = ca[i].split("=");
            if (key == unescape(c[0])) {
              return unescape(c[1]);
            }
          }
        }
        return null;
      }

      function setGlobalInformation(key, value) {
        var g = document.getElementById("YouTubeCenterGlobalInformation");
        if (g) {
          var v = getGlobalInformation(key);
          if (v) {
            g.value = g.value.replace(escape(key) + "=" + escape(v), escape(key) + "=" + escape(value));
          } else {
            if (g.value == "") {
              g.value = escape(key) + "=" + escape(value);
            } else {
              g.value += "&" + escape(key) + "=" + escape(value);
            }
          }
        }
      }

      function doRepeat() {
        var repeat = getGlobalInformation("Repeat");
        if (!repeat) return false;
        return (repeat == 1 ? true : false);
      }
      
      function doRepeatHTML5() {
        var player = document.getElementsByTagName("video")[0];
        if (player) {
          player.addEventListener('ended', function(){
            if (doRepeat()) {
              this.play();
            }
          }, false);
        } else {
          setTimeout(doRepeatHTML5, 500);
        }
      }
      init();
    });
  }

  /* Utils */
  function $(id) {
    return document.getElementById(id);
  }
  
  function $AddCSS(element, c) {
    var classes = element.className.split(" ");
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] == c) return false;
    }
    if (element.className == "") {
      element.className = c;
    } else {
      element.className += " " + c;
    }
    return true;
  }
  
  function $RemoveCSS(element, c) {
    var removed = false;
    var classes = element.className.split(" ");
    var newClasses = "";
    
    for (var i = 0; i < classes.length; i++) {
      if (classes[i] != c) {
        if (newClasses != "") newClasses += " ";
        newClasses += classes[i];
      } else {
        removed = true;
      }
    }
    element.className = newClasses;
    return removed;
  }
  
  function inject(callback) {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }

  function getHTML(element) {
    if (element == document)
      return document.documentElement.innerHTML;
    var d = document.createElement("div");
    d.appendChild(element);
    return d.innerHTML;
  }

  function createCookie(name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
    } else {
      var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ')
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0)
        return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function eraseCookie(name) {
    createCookie(name, "", -1);
  }
  
  function loadSettings() {
    var s = readCookie(CookieSettings);
    if (s) {
      var ca = s.split("&");
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i].split("=");
        var t = c[1].split("\\");
        if (t.length == 1) {
          settings[unescape(c[0])] = unescape(c[1]); break;
        } else {
          switch (t[0]) {
            case 'null': settings[unescape(c[0])] = null;break;
            case 'undefined': settings[unescape(c[0])] = undefined; break;
            case 'string': settings[unescape(c[0])] = unescape(t[1]); break;
            case 'number': settings[unescape(c[0])] = Number(unescape(t[1])); break;
            case 'boolean': settings[unescape(c[0])] = (unescape(t[1]) === 'true'); break;
            case 'array': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'object': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'function': settings[unescape(c[0])] = eval('(' + unescape(t[1]) + ')'); break;
            case 'regexp': settings[unescape(c[0])] = new RegExp(unescape(t[1])); break;
            case 'date': settings[unescape(c[0])] = new Date(unescape(t[1])); break;
            case 'error': settings[unescape(c[0])] = new Error(unescape(t[1])); break;
            default: settings[unescape(c[0])] = unescape(t[1]); break;
          }
        }
      }
    }
  }

  function saveSettings() {
    var toType = function(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }
    var s = "";
    var i = 0;
    for (var key in settings) {
      if (i > 0) s += "&"
      var t = toType(settings[key]);
      s += escape(key) + "=" + t + "\\";
      switch (t) {
        case 'null': s += "null";break;
        case 'undefined': s += "undefined";break;
        case 'string': s += escape(settings[key]); break;
        case 'number': s += escape(settings[key]); break;
        case 'boolean': s += escape(settings[key]); break;
        case 'array': s += escape(JSON.stringify(settings[key], jsonReplacer)); break;
        case 'object': s += escape(escape(settings[key])); break;
        case 'function': s += escape(settings[key].toString()); break;
        case 'regexp': s += escape(settings[key]); break;
        case 'date': s += escape(settings[key]); break;
        case 'error': s += escape(settings[key]); break;
        default: s += escape(settings[key]); break;
      }
      i++;
    }
    createCookie(CookieSettings, s, 30*24);
  }
  
  function checkForUpdates() {
    if (settings.EnableUpdate) {
      var t = (new Date).getTime();
      if (t-parseInt(settings.LastUpdateCheck, 10) >= settings.UpdateInterval) {
        settings.LastUpdateCheck = t;
        doUpdate(function(response){
          if (response.readyState === 4 && response.status === 200) {
            if (hasNewUpdate(getUpdate(response.responseText))) {
              elements.updateNote.innerHTML = "";
              var link = document.createElement("a");
              link.href = "http://userscripts.org/scripts/show/125861";
              link.target = "_blank";
              link.appendChild(document.createTextNode("Install"));
              elements.updateNote.appendChild(link);
              elements.updateNote.appendChild(document.createTextNode(" the new update."));
            }
          }
        });
        saveSettings();
      }
    }
  }
  
  function getUpdate(text) {
    return parseInt(/^\/\/ @updateVersion\s+([0-9]+)$/m.exec(text)[1], 10);
  }
  
  function hasNewUpdate(newVersion) {
    if (newVersion && newVersion > updateVersion) {
      return true;
    }
    return false;
  }
  
  function doUpdate(callback, error) {
    GM_xmlhttpRequest({
      method: "GET",
      url: "http://userscripts.org/scripts/source/125861.meta.js",
      headers: {
        "Content-Type": "text/plain"
      },
      onload: callback,
      onerror: error
    });
  }

  /* YouTube Utils */
  function getYouTubeVariables() {
    var html = getHTML(document), i = 0;
    var startTag = "yt.playerConfig = {";
    var endTag = "};";
    
    i = html.search(startTag);
    html = html.substring(i+startTag.length);
    i = html.search(endTag);
    html = html.substring(0, i);
    return eval('({' + html + '})');
  }

  function parseYouTubeFmtList(list) {
    var parts = list.split(",");
    var collection = [];
    for (var i = 0; i < parts.length; i++) {
      var a = parts[i].split("/");
      collection[collection.length] = {
        itag: a[0],
        dimension: a[1],
        unknown1: a[2],
        unknown2: a[3],
        unknown3: a[4]
      };
    }
    return collection;
  }

  function parseYouTubeStreamList(list) {
    var parts = list.split(",");
    var collection = [];
    for (var i = 0; i < parts.length; i++) {
      var coll = {};
      var args = parts[i].split("&");
      for (var j = 0; j < args.length; j++) {
        var keys = args[j].split("=");
        coll[keys[0]] = unescape(keys[1]);
      }
      if (coll.type.match(/[0-9a-zA-Z]+\/[0-9a-zA-Z]+;\+(.*)/)) {
        var tmp = coll.type.split(";");
        
        var ff = tmp[0];
        var fe = "";
        if (tmp.length > 2) {
          var t = "";
          for (var j = 1; j < tmp.length; j++) {
            t += tmp[j];
          }
          fe = t;
        } else {
          fe = tmp[1];
        }
        coll.type = {
          format: ff,
          extra: fe
        };
      } else {
        coll.type = {
          format: coll.type,
          extra: ""
        };
      }
      collection[collection.length] = coll;
    }
    return collection;
  }

  function parseYouTubeFormats(yt) {
    var fmtList = parseYouTubeFmtList(yt.args.fmt_list);
    var streamList = parseYouTubeStreamList(yt.args.url_encoded_fmt_stream_map);
    var collection = [];
    for (var i = 0; i < streamList.length; i++) {
      var fl = null;
      for (var j = 0; j < fmtList.length; j++) {
        if (streamList[i].itag != fmtList[j].itag) continue;
        fl = fmtList[j];
        break;
      }
      if (fl == null) {
        collection[collection.length] = streamList[i];
      } else {
        var coll = streamList[i];
        coll.dimension = fl.dimension;
        coll.unknown1 = fl.unknown1;
        coll.unknown2 = fl.unknown2;
        coll.unknown3 = fl.unknown3;
        collection[collection.length] = coll;
      }
    }
    return collection;
  }

  function createYouTubeButton(title, html, menu, classNames, onclick) {
    var button = document.createElement("button");
    button.innerHTML = html;
    if (menu) {
      button.appendChild(menu);
    }
    button.type = "button";
    button.className = "yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-default" + (classNames ? " " + classNames : "");
    button.title = title;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("onclick", ";return false;");
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip-text", title);
    if (onclick) {
      button.addEventListener("click", onclick, false);
    }
    return button;
  }

  function createYouTubeDoubleButton(title, html, menu, classNames, onclick, title2, html2, menu2, classNames2, onclick2) {
    var spn = document.createElement("span");
    spn.setAttribute("dir", "ltr");
    spn.className = "yt-uix-button-group watch show-label";
    
    var button = document.createElement("button");
    button.innerHTML = html;
    if (menu) {
      button.appendChild(menu);
    }
    button.type = "button";
    button.className = "start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-default" + (classNames ? " " + classNames : "");
    button.title = title;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("onclick", ";return false;");
    button.setAttribute("role", "button");
    button.setAttribute("data-tooltip-text", title);
    if (onclick) {
      button.addEventListener("click", onclick, false);
    }
    
    spn.appendChild(button);
    
    var button2 = document.createElement("button");
    button2.innerHTML = html2;
    if (menu2) {
      button2.appendChild(menu2);
    }
    button2.type = "button";
    button2.className = "end yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty yt-uix-button-default" + (classNames2 ? " " + classNames2 : "");
    button2.title = title2;
    button2.setAttribute("aria-pressed", "false");
    button2.setAttribute("onclick", ";return false;");
    button2.setAttribute("role", "button");
    button2.setAttribute("data-tooltip-text", title2);
    if (onclick2) {
      button2.addEventListener("click", onclick2, false);
    }
    
    spn.appendChild(button2);
    
    return spn;
  }

  function createYouTubeMenu(build) {
    var menu = document.createElement("div");
    menu.className = "yt-uix-button-menu hid";
    for (var i = 0; i < build.length; i++) {
      var item = document.createElement("span");
      item.className = (build[i].className || build[i].className == "" ? build[i].className : "yt-uix-button-menu-item");
      if (build[i].style) {
        item.setAttribute("style", build[i].style);
      }
      item.setAttribute("onclick", ";return false;");
      item.innerHTML = build[i].text;
      if (build[i].onclick) {
        item.addEventListener("click", build[i].onclick, false);
      }
      if (build[i].args) {
        for (var key in build[i].args) {
          item.setAttribute(key, build[i].args[key]);
        }
      }
      if (build[i].register) {
        build[i].register(item);
      }
      menu.appendChild(item);
    }
    return menu;
  }

  function splitYouTubeInformationByFormat(informations) {
    var collection = {};
    for (var i = 0; i < informations.length; i++) {
      if (!collection[informations[i].type.format]) {
        collection[informations[i].type.format] = [];
      }
      var l = collection[informations[i].type.format].length;
      collection[informations[i].type.format][l] = informations[i];
    }
    return collection;
  }

  /* Initializing */
  init();
  /* END OF DOCUMENT */
})();


