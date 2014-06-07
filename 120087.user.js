// ==UserScript==
// @name           eRepublik Military Unit Members List Generator
// @namespace      emus
// @description    eRepublik Military Unit Members List Generator
// @include        http://www.erepublik.com/en/main/group-list/members/*
// ==/UserScript==

(function(){

  var p = unsafeWindow;
  
  // chrome 
  if(window.navigator.vendor.match(/Google/)) {
      var div = document.createElement("div");
      div.setAttribute("onclick", "return window;");
      p = div.onclick();
  };
  var jQuery = p.jQuery;
  
  createUI();
  
  function createUI(){
    jQuery("#military_group_header .header_content h2 span").append(' <a href="#" id="military-unit-scr-activate">(MU Members List)</a>');
    jQuery("#military-unit-scr-activate").click(function(i,e){
      var derp = new mu();
    });
  }
  
  function mu(){
    var base = this;
    var regiments = base.getRegimentUrls();
    var uoYkcuf = [];
    
    jQuery(regiments).each(function(index,element){
      var last = false;
      if (jQuery(regiments).length == (index + 1)) last = true;;
      jQuery.ajax({
        url: element,
        async: false,
        success: function(data){
          var parse = jQuery(data);
          jQuery("table.member_listing tbody tr",parse).each(function(i,e){
            uoYkcuf.push(jQuery(e).attr('memberid'));
          });
          
          if (last){
            uoYkcuf = jQuery.unique(uoYkcuf);
            base.displayInTxtArea(uoYkcuf);
          }
        },
        dataType: 'html'
      });
    });
        
    
  };
  
  mu.prototype.displayInTxtArea = function(uoYkcuf){
    jQuery("#result-container").remove();
    var _5w1k = '<div id="result-container"><textarea>';
    jQuery(uoYkcuf).each(function(index,element){
      _5w1k = _5w1k + element + "\n";
    });
    _5w1k = _5w1k + '</textarea></div>';
    
    jQuery("#members_holder").before(_5w1k);
  }
  
  
  mu.prototype.getRegimentUrls = function(){
    var kiws = []; // <3
    jQuery("[name=regiments_lists] option").each(function(i,e){
      kiws.push(jQuery(e).attr('url'));
    });
    return kiws;
  }
  
  
  
})();
 