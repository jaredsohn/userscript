// ==UserScript==
// @name           jQuery Selector Tester
// @namespace      http://strd6.com
// @description    Highlights elements on page to show what matches jQuery selectors
// @include        *
//
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js
// ==/UserScript==

/* 
jquery.event.drag.js ~ v1.4 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)  
Liscensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
*/
(function(H){H.fn.drag=function(K,J,I){if(J){this.bind("dragstart",K)}if(I){this.bind("dragend",I)}return !K?this.trigger("drag"):this.bind("drag",J?J:K)};var D=H.event,B=D.special,F=B.drag={not:":input",distance:0,which:1,setup:function(I){I=H.extend({distance:F.distance,which:F.which,not:F.not},I||{});I.distance=G(I.distance);D.add(this,"mousedown",E,I)},teardown:function(){D.remove(this,"mousedown",E);if(this===F.dragging){F.dragging=F.proxy=null}C(this,true)}};function E(K){var J=this,I,L=K.data||{};if(L.elem){J=K.dragTarget=L.elem;K.dragProxy=F.proxy||J;K.cursorOffsetX=L.pageX-L.left;K.cursorOffsetY=L.pageY-L.top;K.offsetX=K.pageX-K.cursorOffsetX;K.offsetY=K.pageY-K.cursorOffsetY}else{if(F.dragging||(L.which>0&&K.which!=L.which)||H(K.target).is(L.not)){return }}switch(K.type){case"mousedown":H.extend(L,H(J).offset(),{elem:J,target:K.target,pageX:K.pageX,pageY:K.pageY});D.add(document,"mousemove mouseup",E,L);C(J,false);return false;case !F.dragging&&"mousemove":if(G(K.pageX-L.pageX)+G(K.pageY-L.pageY)<L.distance){break}K.target=L.target;I=A(K,"dragstart",J);if(I!==false){F.dragging=J;F.proxy=K.dragProxy=H(I||J)[0]}case"mousemove":if(F.dragging){I=A(K,"drag",J);if(B.drop){B.drop.allowed=(I!==false);B.drop.handler(K)}if(I!==false){break}K.type="mouseup"}case"mouseup":D.remove(document,"mousemove mouseup",E);if(F.dragging){if(B.drop){B.drop.handler(K)}A(K,"dragend",J)}C(J,true);F.dragging=F.proxy=L.elem=null;break}}function A(L,J,K){L.type=J;var I=D.handle.call(K,L);return I===false?false:I||L.result}function G(I){return Math.pow(I,2)}function C(J,I){if(!J){return }J.unselectable=I?"off":"on";J.onselectstart=function(){return I};if(document.selection&&document.selection.empty){document.selection.empty()}if(J.style){J.style.MozUserSelect=I?"":"none"}}})(jQuery);

var SelectorTester = function(){
  var cssClass = 'highlighted';

  var form = $('<form></form>')
    .submit(apply)
    .css({
      'z-index': '1000',
      position: 'absolute',
      top: 50,
      left: 75,
      backgroundColor: 'blue',
      color: 'white',
      'font-family': 'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
      'font-weight': 'bold',
      'text-align': 'left'
    })
    .fadeTo(0, 0.75)
    .bind('dragstart', function( event ) {
      return $(event.target).is('.handle');
    })
    .bind('drag', function( event ) {
      $( this ).css({
        top: event.offsetY,
        left: event.offsetX
      });
    });
  
  var handle = $("<div class='handle'>jQuery Selector Tester</div>")
    .css({
      'padding':'2px 4px'
    })
    .appendTo(form);
  
  var selectorInput = $('<input></input>')
    .appendTo(form);
  
  var currentSelection = $('<div></div>')
    .appendTo(form);
  
  function apply() {
    var selector = selectorInput.val();
    clearPage();
    if (selector == '') {
      return false;
    } else {
      currentSelection.text(selector);
      $(selector).each(function() {
        
        var vpadding = parseInt($(this).css('padding-top'));
        vpadding += parseInt($(this).css('padding-bottom'));
        var w=$(this).width();
        var hpadding = parseInt($(this).css('padding-left'));
        hpadding += parseInt($(this).css('padding-right'));
        var w=$(this).width() + hpadding;
       
        var h=$(this).height()+vpadding;
        var t=$(this).offset().top;
        var l=$(this).offset().left;
        var overlay = $('<span></span>')
          .addClass(cssClass)
          .width(w).height(h)
          .css({top:t,left:l})
          .appendTo('body');
      });
    }
    
    return false;
  }

  function clearPage() {
    $('.' + cssClass).remove();
  }
  
  function addCSS(cssClass) {
    var style = document.createElement('style');
    style.type = 'text/css';

    style.innerHTML = '.'+ cssClass +' { position: absolute; background-color: #FF0000; opacity: 0.5; filter: alpha(opacity=50); border:1px solid white; z-index: 100;}';
    $('head').append(style);
  }
  
  return {
    initialize: function(cssClassName) {
      cssClass = cssClassName;
      addCSS(cssClass);
      form.appendTo('body');
      
      $(document).click(function(event) {
        clearPage();
      });
    }
  };
}();

SelectorTester.initialize('strd6-gm-highlighted');