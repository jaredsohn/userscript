// ==UserScript==
// @name           AutoDelicious
// @namespace      http://ejohn.org/
// @description    Adds Auto-Complete capabilities to the del.icio.us posting page.
// @include        http://del.icio.us/*
// ==/UserScript==

// Version 3 (2005-03-27):
//  - Added support for more characters.
// Version 2 (2005-03-26):
//  - Is now case agnostic. You can now type 'T' and complete out 'television'
//    (for example).
// Version 1 (2005-03-25):
//  - Initial release.

// Pages that this extends: (from http://del.icio.us/post/)
//  - The 'post to del.icio.us' bookmarklet - autocompletion works and sorts
//    by tag popularity. (Recommended Usage)
//  - Does not work with 'popup post to del.icio.us', as it does not provide a
//    list of your tags,
//  - The 'experimental post to del.icio.us' bookmarklet - autocompletion
//    works but is not sorted by popularity.

// Known Issues:
//  - Will only complete the last tag being entered
//  - Sometimes if you type really fast it will complete the tag automatically

(function() {
  var page = null;
  var input = document.getElementsByTagName( "input" );
  for ( var i = 0; i < input.length && page == null; i++ )
    if ( input[i].getAttribute( "name" ) == 'tags' )
        page = input[i];
  
  if ( page != null ) {
    page.lastWord = "";
    page.tags = new Array();
    page.setAttribute( "autocomplete", "off" );
    
    page.onkeypress = function( e ) {
        if ( e.keyCode == 9 || e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 39 ) {
          this.value = this.value + " ";
          return false;
        } else if ( e.keyCode == 38 || e.keyCode == 40 ) {
          if ( e.keyCode == 38 ) {
            this.wordPos++;
            if ( this.wordPos == this.curList.length )
              this.wordPos = 0;
          } else {
            this.wordPos--;
            if ( this.wordPos == -1 )
              this.wordPos = this.curList.length - 1;
          }
          if ( this.curList.length > 0 ) {
            this.value = 
              this.value.substr( 0, this.curPos ) + this.curList[ this.wordPos ];
            this.setSelectionRange( this.curPos + this.curWord.length,
              this.value.length );
            this.focus();
          }
          return false;
        } else if ( this.working == true ) {
          return false;
        }
    };
    
    page.onkeyup = function( e ) {
      if ( ( window.getSelection().length == 0 && e.keyCode == 8 ) || e.keyCode == 9 || 
           e.keyCode == 27 || e.keyCode == 13 || (e.keyCode >= 37 && e.keyCode <= 40) ) {
        return false;
      } else if ( e.keyCode == 32 ) {
        this.lastWord = "";
      } else {
        if ( e.keyCode == 8 )
          this.value = this.value.substr( 0, this.curPos + this.curWord.length - 1 );
        this.curPos = ( this.value.lastIndexOf( ' ' ) > -1 ? this.value.lastIndexOf( ' ' ) + 1 : 0 );
        this.curWord = this.value.substr( this.curPos, this.value.length );
        this.lowerWord = this.curWord.toLowerCase();
        
        if ( this.curWord.length == 0 ) return true;
        if ( this.lastWord.length == 0 || this.curWord.indexOf( this.lastWord ) == -1 ) {
          this.wordPos = 0;
          this.curList = new Array();
          for ( var i in this.tags )
            if ( i.toLowerCase().indexOf( this.lowerWord ) == 0 ) this.curList.push( i );
            
          var sorted = new Array();
          for ( var i = 0; i < this.curList.length; i++ ) {
            var ins = false;
            for ( var j = 0; j < sorted.length; j++ )
              if ( this.tags[ this.curList[ i ] ] > this.tags[ sorted[ j ] ] ) {
                sorted.splice( j, 0, this.curList[ i ] );
                j = sorted.length;
                ins = true;
              }
            if ( ! ins ) sorted.push( this.curList[ i ] );
          }
          this.curList = sorted;
        } else {
          var newList = new Array();
          for ( var i = 0; i < this.curList.length; i++ )
            if ( this.curList[i].toLowerCase().indexOf( this.lowerWord ) == 0 ) {
              if ( i == this.wordPos ) this.wordPos = newList.length;
              newList.push( this.curList[ i ] );
            } else if ( i == this.wordPos ) {
              this.wordPos = newList.length - 1;
              if ( this.wordPos < 0 ) this.wordPos = 0;
            }
          this.curList = newList;
        }
          
        if ( this.curList.length > 0 ) {
           this.value = this.value.substr( 0, this.curPos + this.curWord.length ) + this.curList[ this.wordPos ].substr( this.curWord.length, this.curList[ this.wordPos ].length );
           this.setSelectionRange( this.curPos + this.curWord.length, this.value.length );
        }
          
        this.lastWord = this.curWord;
      }
    };
    
    var div = document.getElementsByTagName( "div" );
    for ( var i = 0; i < div.length; i++ )
      if ( div[i].className == 'delPost' ) {
        var a = div[i].getElementsByTagName( "a" );
        for ( var j = 0; j < a.length; j++ )
          page.tags[ a[j].innerHTML ] = 1;
      } else if ( div[i].className == 'delTag' ) {
        var word = div[i].childNodes[3].innerHTML;
        var reg = /(\S+)/;
        word = (reg.exec( word ))[0];
        //word.match( /(\S+)/ );
        //word = word.exec
        //word = word.replace( /\s\n\r/g, '' );
        var num = div[i].childNodes[1].innerHTML;
        num = num.replace( /\D/g, '' ) - 0;
        page.tags[ word ] = num;
      }
  }
})();