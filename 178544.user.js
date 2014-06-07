// ==UserScript==
// @name           Siap
// @description    Siap
// ==/UserScript==

( function ( $, window, document, undefined ) {

if ( !window.siap )
   return;

window.siap.form = {};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.form.notification = function ( id, html, type, attr ) {
   var tpl = '<div class="ic-cont"><div class="ic ic-{type} {tips}">{html}</div></div>';
   var tplTips = '<span class="rnd5 drop-sdw"><span></span>{html}</span>';
   var o, next;

   id = typeof id == 'string' ? $( '#' + id ) : $( id );
   html = !html || type == 'load' ? '' : tplTips.replace( '{html}', html );
   type = type || 'help';

   o = tpl.replace( '{html}', html )
          .replace( '{type}', type )
          .replace( '{tips}', type == 'load' ? '' : 'tips' );

   o = $( o );
   next = id.nextAll( '.ic-cont' );
   id = next.length > 0 ? next.eq( next.length - 1 ) : id;

   attr && o.attr( attr );
   id.after( o );
};

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.form.validate = ( function () {

   // validation patterns
   var patterns = {
      url:      /^http(s|):\/\/([a-z0-9-]+\.)+[a-z]{2,4}(:\d+)?((\/[a-z0-9-_.%~]*)*)?(\?[^? ]*)?$/i,
      email:    /^[a-z0-9-_.]+@([a-z0-9-]+\.)+[a-z]{2,4}$/i,
      digit:    /^\d+$/,
      chr:      /^[A-Za-z]+$/,
      decimal:  /^\d+(\.\d+)?$/,
      npsn:     /^\d{8}$/,
      nisn:     /^[09]\d{9}$/,
      name:     /^[A-Za-z0-9-'.,\s]+$/,
      username: /^[A-Za-z0-9-_]{3,30}$/
   };

   return {
      url: function ( o, callback ) {
         var success = !!o.match( patterns.url );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      email: function ( o, callback ) {
         var success = !!o.match( patterns.email );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      npsn: function ( o, callback ) {
         var success = !!o.match( patterns.npsn );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      nisn: function ( o, callback ) {
         var success = !!o.match( patterns.nisn );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      digit: function ( o, callback ) {
         var success = !!o.match( patterns.digit );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      chr: function ( o, callback ) {
         var success = !!o.match( patterns.chr );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      decimal: function ( o, callback ) {
         var success = !!o.match( patterns.decimal );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      name: function ( o, callback ) {
         var success = !!o.match( patterns.name );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      username: function ( o, callback ) {
         var success = !!o.match( patterns.username );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      },

      custom: function ( o, regex, callback ) {
         var success = !!o.match( regex );

         if ( typeof callback == 'function' ) {
            callback( success );
         } else {
            return success;
         }
      }
   };

} )();

////////////////////////////////////////////////////////////////////////////////////////////////////

window.siap.form.filter = ( function () {

   // filter patterns
   var patterns = {
      digit:    /[^\d]+/,
      chr:      /[^A-Za-z]+/,
      decimal:  /[^\d\.]+/,
      name:     /[^A-Za-z0-9-'.,\s]+/,
      username: /[^A-Za-z0-9-_]+/
   };

   return {
      digit: function ( o ) {
         var val = o.value.replace( patterns.digit, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      },

      chr: function ( o ) {
         var val = o.value.replace( patterns.chr, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      },

      decimal: function ( o ) {
         var val = o.value.replace( ',', '.' ).replace( patterns.decimal, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      },

      name: function ( o ) {
         var val = o.value.replace( patterns.name, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      },

      username: function ( o ) {
         var val = o.value.replace( patterns.username, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      },

      custom: function ( o, regex ) {
         var val = o.value.replace( regex, '' );

         if ( o.value != val ) {
            o.value = val;
         }
      }
   };

} )();

////////////////////////////////////////////////////////////////////////////////////////////////////

} )( jQuery, window, window.document );
