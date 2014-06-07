// ==UserScript==
// @name        GitHub-Diff-Whitespace
// @namespace   http://jason.karns.name
// @version     1.2.0
// @match       https://github.com/*/commit/*
// @match       https://github.com/*/compare/*
// @match       https://github.com/*/pull/*
// ==/UserScript==

( function( querystring ){
  var querystringToObject = function( querystring ){
    var params = {};
    querystring.replace(
        new RegExp( '([^?=&]+)(=([^&]*))?', 'g' ),
        function( $0, $1, $2, $3 ) { params[ $1 ] = $3; }
    );
    return params;
  };

  var objectToQueryString = function( params ){
    var values = [];
    for( var param in params ){
      var value = ( params[ param ] === null ? '' : params[ param ] );
      values.push( encodeURIComponent( param ) + '=' + encodeURIComponent( value ) );
    }
    return values.join( '&' ).replace( /%20/g, '+' );
  };

  var toggleW = function( params, whitespace ){
    if( whitespace ){
      delete params.w;
    }
    else {
      params.w = true;
    }
    return params;
  };

  var addWhitespaceToggleButton = function( button_group, querystring ){
    var code = document.createElement( 'code' ); // this is a hack to fix some weird height issues with their CSS
    code.textContent = ' ';

    var a = document.createElement( 'a' );
    a.className = button_group.querySelector( 'a' ).className + ' ' + toggler_classname;
    a.href = '?' + querystring;
    a.title = 'Toggle Whitespace';
    a.textContent = ' \u2423';
    a.appendChild(code);

    button_group.insertBefore( a, button_group.firstChild );
  };

  var addWhitespaceToggleButtons = function( querystring ){
    Array.prototype.forEach.call(
      document.querySelectorAll( button_group_selector ),
      function( button_group, index, button_groups ){
        addWhitespaceToggleButton( button_group, querystring );
      }
    );
  };

  var invertButtonGradients = function(){
    var sheet = document.createElement('style');
    var selector = button_group_selector + ' .' + toggler_classname;
    sheet.innerHTML = selector + "{ background: -moz-linear-gradient(#EAEAEA,#FAFAFA);" +
                                  " background: -webkit-linear-gradient(#EAEAEA,#FAFAFA);}" +
               selector + ":hover { background: -moz-linear-gradient(#3072B3, #599BDC);" +
                                  " background: -webkit-linear-gradient(#3072B3,#599BDC);}";
    document.body.appendChild(sheet);
  };


  var button_group_selector = '.diff-view .actions .button-group';
  var toggler_classname = 'toggle-whitespace';
  var params = querystringToObject( querystring );
  var whitespace = Boolean(params.w);
  querystring = objectToQueryString( toggleW( params, whitespace ) );
  addWhitespaceToggleButtons( querystring );

  if(whitespace) { invertButtonGradients(); }

})( location.search );
