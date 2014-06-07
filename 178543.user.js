// ==UserScript==
// @name           Siap
// @description    Siap
// ==/UserScript==

( function ( $, window, document, undefined ) {

window.siap = {};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.loadScript = function ( url, async ) {
   var dom = document.createElement( 'script' );
   var s = document.getElementsByTagName( 'script' )[0];

   dom.type = 'text/javascript';
   dom.async = !!async;
   dom.src = url;
   s.parentNode.insertBefore( dom, s );
}

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.date = ( function () {
   var months = [ false,
      'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
      'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember' ];

   var shortMonths = [ false,
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' ];

   return {
      toLocale: function ( date, min ) {
         if ( typeof date != 'string' ) {
            return '';
         } else {
            date = date.split( '-' );
            date[1] = ( min ? shortMonths[ Number( date[1] ) ] : months[ Number( date[1] ) ] );
            date.reverse();

            return date.join( ' ' );
         }
      },

      manageConstraint: function ( od, om, oy ) {
         od = $( typeof od == 'string' ? '#' + od : od );
         om = $( typeof om == 'string' ? '#' + om : om );
         oy = $( typeof oy == 'string' ? '#' + oy : oy );

         od.add( om ).add( oy ).change( function () {
            var d = Number( od.val() );
            var m = Number( om.val() );
            var y = Number( oy.val() );

            if ( m == 2 && y % 4 == 0 && d > 29 ) {
               od.val( '29' );
            } else if ( m == 2 && y % 4 != 0 && d > 28 ) {
               od.val( '28' );
            } else if ( ( m == 4 || m == 6 || m == 9 || m == 11 ) && d > 30 ) {
               od.val( '30' );
            }
         } );
      }
   };

} )();

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.cookie = ( function () {
   var pastDate = new Date( 1970, 1, 1 );

   return {
      get: function ( name ) {
         var cookies;
         var cookie = null;

         if ( document.cookie ) {
            cookies = document.cookie.split( ';' );
            $.each( cookies, function () {
               var val = $.trim( this ).split( '=' );
               if ( val[0] == name ) {
                  cookie = val[1];
                  return false;
               }
            });
         }

         return cookie;
      },

      set: function ( name, value, expires ) {
         if ( typeof expires == 'object' ) {
            expires = expires.toUTCString();
         } else if ( typeof expires != 'string' ) {
            expires = null;
         }

         document.cookie = name + '=' + value + ( expires ? ';expires=' + expires : '' );
      },

      clear: function ( name ) {
         this.set( name, '', pastDate );
      }
   };
} )();

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.ajaxTimeout = 10000;

window.siap.ajaxLoading = ( function () {
   var timer;
   var d = $( '<div class="disabler" />' );
   var s = $( [
      '<div class="wraper disabler-status">',
         '<div class="rnd5 warn warn-info warn-load">',
            '<div class="rnd5 warn-ic">',
               '<div class="rnd5 rnd-r warn-msg">',
                  '<span>Processing !</span> Harap tunggu, data sedang diproses ...',
               '</div>',
            '</div>',
         '</div>',
      '</div>'
   ].join( '' ) );

   return {
      show: function () {
         $( document.body ).append( d ).append( s );

         this.show = function () {
            timer = window.setTimeout( function () {
               d.show();
               s.show();
            }, 10 );
         };

         this.show();
      },

      hide: function () {
         window.clearTimeout( timer );
         window.setTimeout( function () {
            s.hide();
            d.hide();
         }, 400 );
      }
   };
} )();

window.siap.ajax = function ( url, data, callback ) {

   if ( typeof callback == 'function' ) {
      callback = { success: callback };
   }

   callback = $.extend( {
      start: siap.ajaxLoading.show,
      success: function () {},
      timeout: function () {},
      error: function () {},
      complete: function () {},
      stop: siap.ajaxLoading.hide
   }, callback || {} );

   callback.start();

   // TODO: onsuccess and oncomplete should have been inside try..catch to prevent ajaxLoading fails to close.
   return $.ajax( {
      url: url || '/',
      type: 'post',
      data: data || {},
      dataType: 'json',
      timeout: siap.ajaxTimeout,
      success: function ( json, status, xhr ) {
         if ( json ) {
            callback.success( json );
         } else {
            callback.error( xhr, status );
         }
      },
      complete: function ( xhr, status ) {
         if ( status == 'timeout' ) {
            callback.timeout( xhr, status );
         } else if ( status != 'success' ) {
            callback.error( xhr, status );
         }

         callback.complete( xhr, status );
         callback.stop();
      }
   } );

};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.history = ( typeof dhtmlHistory == 'undefined' ? {} : ( function () {

   var listener = function () {};

   // using Really Simple History (RSH) library
   dhtmlHistory.create( {
      toJSON: JSON.stringify,
      fromJSON: JSON.parse
   } );

   function hashChangeListener( hash, data ) {
      listener( hash, data );
   }

   return {
      initialize: function ( _listener ) {
         dhtmlHistory.initialize();
         dhtmlHistory.addListener( hashChangeListener );

         if ( typeof _listener == 'function' ) {
            listener = _listener;
         }
      },

      add: function ( hash, data ) {
         dhtmlHistory.add( hash, data );
      }
   };
} )() );

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.table = function ( o ) {
   o = $( typeof o == 'string' ? '#' + o : o );

   o.addRow = function ( data, opt ) {
      var tr = $( '<tr />' );
      opt = opt || [];

      $.each( data || [], function ( i, item ) {
         var td = $( '<td />' );

         opt[i] && td.attr( opt[i] );
         td.append( item );
         tr.append( td );
      } );

      o.append( tr );
   };

   o.insertRow = function ( data, opt, index ) {
      var trs = o.find( 'tr' ), prev = trs.eq( Math.max( 0, Math.min( trs.length - 1, index ) ) );
      var tr = $( '<tr />' );
      opt = opt || [];

      $.each( data || [], function ( i, item ) {
         var td = $( '<td />' );

         opt[i] && td.attr( opt[i] );
         td.append( item );
         tr.append( td );
      } );

      prev.before( tr );
   };

   return o;

};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.option = function ( o ) {
   o = $( typeof o == 'string' ? '#' + o : o );

   o.populate = function ( data, selected, extra ) {
      var html;

      if ( extra ) {
         html = '<option value="' + extra[0] + '">' + extra[1] + '</option>';
         o.append( html );
      }

      $.each( data || [], function () {
         html = '<option value="' + this[0] + '"'
              + ( this[0] == selected ? ' selected="selected"' : '' ) + '>' + this[1] + '</option>';

         o.append( html );
      } );
   };

   return o;

};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.autocomplete = function ( o, data ) {

   // constants
   var KEY_UP = 38;
   var KEY_DOWN = 40;
   var KEY_ENTER = 13;

   var span, div, ul, current = {};

   o = typeof o == 'string' ? $( o ) : o;
   data = data || [];

   current.search = false;
   current.data = [];
   current.index = false;

   o.attr( 'autocomplete', 'off' );
   o.wrap( '<span class="autocomplete" />' );
   o.after( '<div class="ac-box"><ul /></div>' );

   span = o.closest( '.autocomplete' );
   div = span.children( '.ac-box' );
   ul = div.children( 'ul' );

   o.focus( function () {
      if ( current.data.length > 0 ) {
         div.show();
      }
   } );

   o.keyup( function ( e ) {
      var lis, li;

      if ( e.keyCode != KEY_DOWN && e.keyCode != KEY_UP && e.keyCode != KEY_ENTER ) {
         current.search = e.target.value.toLowerCase().replace( /^\s+/, '' ).replace( /\s+$/, '' );
         current.data = [];
         ul.empty();

         if ( current.search ) {
            for ( var i = 0; i < data.length; i++ ) {
               if ( data[ i ][ 1 ].toLowerCase().search( current.search ) > -1 ) {
                  li = $( '<li class="ac-li-' + i + '">' + data[ i ][ 1 ] + '</li>' );
                  current.data[ current.data.length ] = data[ i ];
                  ul.append( li );
               }
            }

            if ( current.data.length > 0 ) {
               if ( current.index === false ) {
                  current.index = 0;
               } else if ( current.index >= current.data.length ) {
                  current.index = current.data.length - 1;
               }

               lis = ul.children( 'li' );

               lis.click( function () {
                  var index = this.className.replace( /^ac-li-(\d+).*$/, '$1' );

                  current.index = Number( index );
                  o.val( this.innerHTML );
                  div.hide();
               } );

               lis.mouseover( function () {
                  lis.removeClass( 'on' );
                  $( this ).addClass( 'on' );
               } );

               ul.mouseout( function () {
                  lis.removeClass( 'on' ).eq( current.index ).addClass( 'on' );
               } );

               lis.eq( current.index ).addClass( 'on' );
               div.show();

            } else {
               div.hide();
            }
         } else {
            div.hide();
         }
      }
   } );

   o.keydown( function ( e ) {
      var count = current.data.length;

      if ( e.keyCode == KEY_DOWN ) {
         current.index = current.index < count - 1 ? current.index + 1 : 0;
         ul.children( 'li' ).removeClass( 'on' ).eq( current.index ).addClass( 'on' );

      } else if ( e.keyCode == KEY_UP ) {
         current.index = current.index > 0 ? current.index - 1 : count - 1;
         ul.children( 'li' ).removeClass( 'on' ).eq( current.index ).addClass( 'on' );

      } else if ( e.keyCode == KEY_ENTER ) {
         o.val( ul.children( 'li' ).eq( current.index ).html() );
         div.hide();

      }
   } );

   return {
      reload: function ( data ) {
         data = data || [];
      },

      val: function() {
         return data[current.index] ? data[current.index][0] : '';
      }
   };

};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.popupTemplate = '';

window.siap.popup = function ( id, template ) {
   var div = $(
      '<div id="', id, '">',
         '<div id="', id, '-layer"></div>',
         '<div id="', id, '-ct">', ( template || siap.popupTemplate ), '</div>',
      '</div>' );

   var divLayer = div.children( '#' + id + '-layer' );
   var divCt = div.children( '#' + id + '-ct' );

   $( document.body ).append( div );

   div.css({
      display: 'none',
      left: 0,
      position: 'absolute',
      top: 0
   });

   divLayer.css({
      opacity: 0.5,
      position: 'absolute'
   });

   divCt.css({
      overflow: 'hidden',
      position: 'relative'
   });

   $( document.body ).append( div );

   return {
      id: id,

      show: function () {
         var width = window.innerWidth;
         var height = window.innerHeight;

         div.css({ width: width, height: height });
         divLayer.css({ width: width, height: height });
         divCt.css({ width: width, height: height });
         div.show();
      },

      hide: function () {
         div.hide();
      }
   };
};

////////////////////////////////////////////////////////////////////////////////////////////////////

} )( jQuery, window, window.document );
