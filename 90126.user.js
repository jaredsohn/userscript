// ==UserScript==
// @name        IRCCloud Protected Channel Appearance
// @namespace   http://fluidapp.com
// @description Change the visual appearance of the input field for protected channels.
// @include     http://irccloud.com/*
// @include     https://irccloud.com/*
// @author      Martin Dittus
// ==/UserScript==

(function () {
  
  var oldSelectBufferHandler;

  // These will get the .protectedChannel CSS class applied
  // if the current channel is password-protected.
  var channelDivs = [
    '#buffer', '#bufferBelowExtras', 
    '#users', 
    '#chatInputContainer', '#input', '#chatInputBox',
  ];
  
  // Custom CSS. Insert your preferred mod here. 
  // Note: JS has no multi-line strings :(
  var customStyles = " \
    #input.protectedChannel { \
      background: #fbf5ef; \
    } \
    #chatInputBox.protectedChannel { \
      background: #fbf5ef; \
      background-image: url(https://irccloud.com/static/lock.png); \
      background-repeat: no-repeat; \
      background-position: right center; \
    } \
  ";
  
  function selectBufferHook(bufferView) { 
    oldSelectBufferHandler.apply(controller.view, arguments);
    var isProtected = $('.selectedStatus').is('.password');
    $.each(channelDivs, function(index, element){
      $(element).toggleClass('protectedChannel', isProtected)
    });
  } 

  if (window.fluid) {
    oldSelectBufferHandler = MainView.prototype.selectBuffer; 
    MainView.prototype.selectBuffer = selectBufferHook; 
    $('head').append('<style>' + customStyles + '</style>');
  }
})();
