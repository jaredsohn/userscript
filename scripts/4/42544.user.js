// ==UserScript==

// @name           GreasyThug - Annotations

// @namespace      http://strd6.com

// @description    Super-simple website annotations! Share annotations publicly or among groups.

// @include        *

//

// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js

// @require     http://strd6.googlecode.com/svn/trunk/gm_util/d_money.js

// @require     http://strd6.googlecode.com/svn/trunk/gm_util/speakeasy.js

//

// @resource    annotationCSS   http://strd6.googlecode.com/svn/trunk/gm_util/strd6-gm.css

// ==/UserScript==



/** -GreasyThug-

 *  

 *  I've been called a greasy thug, too. It never stops hurting. 

 *  So here's what we're gonna do: We're gonna grease ourselves up 

 *  real good and trash that place with a baseball bat. - Homer

 */



/* 

jquery.event.drag.js ~ v1.4 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)  

Liscensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt

*/

(function(H){H.fn.drag=function(K,J,I){if(J){this.bind("dragstart",K)}if(I){this.bind("dragend",I)}return !K?this.trigger("drag"):this.bind("drag",J?J:K)};var D=H.event,B=D.special,F=B.drag={not:":input",distance:0,which:1,setup:function(I){I=H.extend({distance:F.distance,which:F.which,not:F.not},I||{});I.distance=G(I.distance);D.add(this,"mousedown",E,I)},teardown:function(){D.remove(this,"mousedown",E);if(this===F.dragging){F.dragging=F.proxy=null}C(this,true)}};function E(K){var J=this,I,L=K.data||{};if(L.elem){J=K.dragTarget=L.elem;K.dragProxy=F.proxy||J;K.cursorOffsetX=L.pageX-L.left;K.cursorOffsetY=L.pageY-L.top;K.offsetX=K.pageX-K.cursorOffsetX;K.offsetY=K.pageY-K.cursorOffsetY}else{if(F.dragging||(L.which>0&&K.which!=L.which)||H(K.target).is(L.not)){return }}switch(K.type){case"mousedown":H.extend(L,H(J).offset(),{elem:J,target:K.target,pageX:K.pageX,pageY:K.pageY});D.add(document,"mousemove mouseup",E,L);C(J,false);return false;case !F.dragging&&"mousemove":if(G(K.pageX-L.pageX)+G(K.pageY-L.pageY)<L.distance){break}K.target=L.target;I=A(K,"dragstart",J);if(I!==false){F.dragging=J;F.proxy=K.dragProxy=H(I||J)[0]}case"mousemove":if(F.dragging){I=A(K,"drag",J);if(B.drop){B.drop.allowed=(I!==false);B.drop.handler(K)}if(I!==false){break}K.type="mouseup"}case"mouseup":D.remove(document,"mousemove mouseup",E);if(F.dragging){if(B.drop){B.drop.handler(K)}A(K,"dragend",J)}C(J,true);F.dragging=F.proxy=L.elem=null;break}}function A(L,J,K){L.type=J;var I=D.handle.call(K,L);return I===false?false:I||L.result}function G(I){return Math.pow(I,2)}function C(J,I){if(!J){return }J.unselectable=I?"off":"on";J.onselectstart=function(){return I};if(document.selection&&document.selection.empty){document.selection.empty()}if(J.style){J.style.MozUserSelect=I?"":"none"}}})(jQuery);



/*

  GreasyThug - Annotations

  Everything from here on down 

  Copyright (c) 2009, STRd6 (http://strd6.com)  

  Liscensed under the MIT License 

*/



error = D$.error;

log = D$.log;

D$.debug(false);



/** Inject annotations CSS into page */

D$.injectResourceCSS(['annotationCSS']);



Speakeasy

  .generateResource('annotation')

  .configure({

    baseUrl: 'http://67.207.139.110:9000/',

    apiKey: '0' // Go to 67.207.139.110:9000 for an API key, only necessary for personal comments

  })

;



var Annotations = function($) {

  var cssNamespace = 'strd6-gm';

  

  function createDiv(ownerId) {

    log(ownerId);

    var div = $('<div />')

      .addClass(cssNamespace + '_annotation')

      .fadeTo(0, 0.75)

      .appendTo('body')

    ;

    

    if(ownerId > 0) {

      log(ownerId > 0);

      div.addClass(cssNamespace + '_owned');

    }



    return div;

  }

  

  var self = {

    display: function (annotation) {

      var id = annotation.id;

      

      createDiv(annotation.owner_id)

        .text(annotation.text)

        .css({

          top: annotation.top,

          left: annotation.left

        })

        .bind('drag', function( event ) {

          $( this ).css({

            top: event.offsetY,

            left: event.offsetX

          });

        })

        .bind('dragend', function( event ) {

          Speakeasy.annotation.update({id: id, top: $(this).css('top'), left: $(this).css('left')});

        })

      ;

    },

    

    createForm: function (x, y, ownerId) {

      var input = $("<input type='text'></input>");

    

      var div = createDiv(ownerId)

        .css({

          top: y,

          left: x

        })

        .append(

          $('<form action="#" method="get"></form>')

            .append(input)

            .submit( function() {

              var text = input.val();

              var annotation = {top: y, left: x, text: text, url: currentUrl, 'public': !ownerId, owner_id: ownerId};

              Speakeasy.annotation.create(annotation);

              self.display(annotation);

              

              div.remove();

              return false;

            })

            .keydown(function(event){

              // Remove when escape key is pressed

              if (event.keyCode == 27) {

                div.remove();

              }

            })

        )

      ;

      

      try {

        input.focus();

      } catch(e) {

        error(e);

      }

    }

    

  };

  

  return self;

}(jQuery);



// Attach all annotations for this page from remote server

var href = window.location.href;

currentUrl = href.substring(href.indexOf('://') + 3);

log(currentUrl);



Speakeasy.annotation.all({data: {url: currentUrl}}, function(annotations) {

  log(annotations);

  $.each(annotations, function(index, annotation) {

    Annotations.display(annotation);

  });

});



// Add annotation creation shizzy

$('body').click(function(e) {

  if(e.ctrlKey) {

    var ownerId = e.shiftKey ? 1 : 0;

    Annotations.createForm(e.pageX, e.pageY, ownerId);

    return false;

  }

});



