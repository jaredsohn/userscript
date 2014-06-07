// ==UserScript==
// @name            Account Sitter Comments
// @author          iwantwin93
// @version         1.3
// @description     Author iwantwin93. Adds comments to account sitting sessions in the account sitting overview
// @include http://nl*.tribalwars.nl/game.php?*mode=vacation*
// @exclude http://nl*.tribalwars.nl/game.php?*t=*mode=vacation*
// @exclude http://nl*.tribalwars.nl/game.php?*mode=vacation*t=*
// ==/UserScript==

(function ( f ) {
  var d = document,
    s = d.createElement( 'script' );
  s.textContent = '$(document).ready(' + f.toString() + ')';
  (d.body || d.head || d.documentElement).appendChild( s );
})( function () {
    var scriptVersion = "1.3";
    var replacementObject;
    var jsonReplacementObject = localStorage.getItem( "replacementObject" );
    if ( jsonReplacementObject == null ) {
      replacementObject = {"replacements": []};
    } else {
      try {
        replacementObject = JSON.parse( jsonReplacementObject );
      } catch ( exception ) {
        alert( "Sitter comment data was corrupted.. Data was reset." );
        replacementObject = {"replacements": [], "version": scriptVersion};
      }
    }
    var replacements = replacementObject["replacements"];
    console.log( "before update", replacementObject );
    //We check if data was available from a previous version, if true we change it accordingly.
    while ( typeof(replacementObject["version"]) == "undefined" || replacementObject["version"] != scriptVersion ) {
      if ( !replacementObject["version"] || replacementObject["version"] == "1.1" ) {
        //Changes from version 1.1 to version 1.2
        if ( replacements.length > 0 ) {
          for ( var id in replacements ) {
            if ( replacements.hasOwnProperty( id ) ) {
              var replacement = replacements[id];
              replacement["state"] = "sitterHistory";
              replacements[id] = replacement;
            }
          }
          replacementObject["replacements"] = replacements;
          replacementObject["version"] = "1.2";
          localStorage.setItem( "replacementObject", JSON.stringify( replacementObject ) );
        } else {
          replacementObject["version"] = "1.2";
        }
      }
      else if ( replacementObject["version"] == "1.2" ) {
        //Changes from version 1.2 to version 1.3
        if ( replacements.length > 0 ) {
          var counter = 1;
          for ( var id in replacements ) {
            if ( replacements.hasOwnProperty( id ) ) {
              var replacement = replacements[id];
              replacement["commentDate"] = counter;
              replacements[id] = replacement;
              counter++;
            }
          }
          replacementObject["replacements"] = replacements;
          replacementObject["version"] = "1.3";
          localStorage.setItem( "replacementObject", JSON.stringify( replacementObject ) );
        } else {
          replacementObject["version"] = "1.3";
        }
      }
    }
    console.log( "after update", replacementObject );

    var $requestTable = null;
    var $activeSitterTable = null;
    var $sitterHistoryTable = null;
    $( '.vis:not(.modemenu, :has(input[name="sitter"]))' ).each( function () {
      var $this = $( this );
      var $tableHeaders = $this.find( 'tr:first th' );
      switch ( $tableHeaders.length ) {
        case 1:
          $activeSitterTable = $this;
          break;
        case 2:
          $requestTable = $this;
          break;
        case 3:
          $sitterHistoryTable = $this;
          break;
      }
    } );

    var requestUsernames = [];
    if ( $requestTable != null ) {
      $requestTable.find( 'tr:first' ).append( '<th>Comment</th>' );
      $requestTable.find( 'tr' ).not( ':first' ).each( function () {
        var $this = $( this );
        var username = $this.find( 'td:first a' ).html();
        requestUsernames.push( username );
        $this.append( '<td><span class="AccountSitterComment">' + getComment( "sitterRequest", username, null, null ) + '</span> <a class="rename-icon AccountSitterRenameButton" title="Set comment"></a></td>' );
      } );

      $requestTable.on( 'click', '.AccountSitterCommentSubmit', function () {
        var $this = $( this );
        var $tableField = $this.parent(); //submit, td
        var $tableRow = $tableField.parent(); //td, tr
        var $input = $tableField.find( '.AccountSitterCommentInput' ); // td, input

        var newComment = $input.val();
        var username = $tableRow.find( 'td:first a' ).html();
        setComment( "sitterRequest", username, false, false, newComment );
        $input.remove();
        $this.remove();
        var $accountSitterComment = $tableField.find( '.AccountSitterComment' );
        $accountSitterComment.html( newComment );
        $tableField.find( '.AccountSitterRenameButton' ).show();
        $accountSitterComment.show();
      } );
    }

    var activeUsernames = [];
    if ( $activeSitterTable != null ) {
      $activeSitterTable.find( 'tr:first' ).append( '<th>Comment</th>' );
      $activeSitterTable.find( 'tr' ).not( ':first' ).each( function () {
        var $this = $( this );
        var username = $this.find( 'td:first a' ).html();
        activeUsernames.push( username );
        $this.append( '<td><span class="AccountSitterComment">' + getComment( "sitterActive", username, null, null ) + '</span> <a class="rename-icon AccountSitterRenameButton" title="Set comment"></a></td>' );
      } );

      $activeSitterTable.on( 'click', '.AccountSitterCommentSubmit', function () {
        var $this = $( this );
        var $tableField = $this.parent(); //submit, td
        var $tableRow = $tableField.parent(); //td, tr
        var $input = $tableField.find( '.AccountSitterCommentInput' ); // td, input

        var newComment = $input.val();
        var username = $tableRow.find( 'td:first a' ).html();
        setComment( "sitterActive", username, false, false, newComment );
        $input.remove();
        $this.remove();
        var $accountSitterComment = $tableField.find( '.AccountSitterComment' );
        $accountSitterComment.html( newComment );
        $tableField.find( '.AccountSitterRenameButton' ).show();
        $accountSitterComment.show();
      } );
    }

    if ( $sitterHistoryTable != null ) {
      $sitterHistoryTable.find( 'tr:first' ).append( '<th>Comment</th>' );
      $sitterHistoryTable.find( 'tr' ).not( ':first' ).each( function () {
        var $this = $( this );
        var username = $this.find( 'td:first a' ).html();
        var start = $this.find( 'td:nth(1)' ).html();
        var $end = $this.find( 'td:nth(2)' );
        var end = false;
        if ( $end.length == 1 ) {
          end = $end.html();
        }
        $this.append( '<td><span class="AccountSitterComment">' + getComment( "sitterHistory", username, start, end ) + '</span> <a class="rename-icon AccountSitterRenameButton" title="Set comment"></a></td>' );
      } );

      $sitterHistoryTable.on( 'click', '.AccountSitterCommentSubmit', function () {
        var $this = $( this );
        var $tableField = $this.parent(); //submit, td
        var $tableRow = $tableField.parent(); //td, tr
        var $input = $tableField.find( '.AccountSitterCommentInput' ); // td, input

        var newComment = $input.val();
        var username = $tableRow.find( 'td:first a' ).html();
        var start = $tableRow.find( 'td:nth(1)' ).html();
        var $end = $tableRow.find( 'td:nth(2)' );
        var end = false;
        if ( $end.length == 1 ) {
          end = $end.html();
        }
        setComment( "sitterHistory", username, start, end, newComment );
        $input.remove();
        $this.remove();
        var $accountSitterComment = $tableField.find( '.AccountSitterComment' );
        $accountSitterComment.html( newComment );
        $tableField.find( '.AccountSitterRenameButton' ).show();
        $accountSitterComment.show();
      } );
    }

    $( ".AccountSitterRenameButton" ).on( 'click', function () {
      var $this = $( this );
      var $tableField = $this.parent(); //anchor, td
      var $accountSitterComment = $tableField.find( '.AccountSitterComment' );
      $accountSitterComment.hide();
      $this.hide();
      $tableField.append( '<input type="text" class="AccountSitterCommentInput" value="' + $accountSitterComment.html() + '"><input class="AccountSitterCommentSubmit" type="button" value="OK">' );
    } );

    function getComment( state, sitter, start, end ) {
      var found = false;
      var outdatedReplacements = [];
      var commentDate = 0;
      if ( state == "sitterHistory" ) {
        if ( end == false ) {
          end = "N/A";
        }
        for ( var key in replacements ) {
          if ( replacements.hasOwnProperty( key ) ) {
            var replacement = replacements[key];
            //Check if the item matches the requirements
            if ( replacement["state"] == "sitterHistory"
              && replacement["sitter"] == sitter
              && replacement["start"] == start
              && (replacement["end"] == end || replacement["end"] == "N/A") ) {
              if ( commentDate < replacement["commentDate"] ) {
                if ( found != false ) {
                  //If the item is older then another one, delete the older one.
                  outdatedReplacements.push( found );
                }
                found = replacement;
                commentDate = replacement["commentDate"];
              } else {
                //If the item matches but is older then the currently found one
                outdatedReplacements.push( replacement );
              }
            }
          }
        }
      } else if ( state == "sitterRequest" ) {
        for ( var key in replacements ) {
          if ( replacements.hasOwnProperty( key ) ) {
            var replacement = replacements[key];
            //Check if the item matches the requirements
            if ( replacement["state"] == "sitterRequest"
              && replacement["sitter"] == sitter ) {
              if ( commentDate < replacement["commentDate"] ) {
                if ( found != false ) {
                  //If the item is older then another one, delete the older one.
                  outdatedReplacements.push( found );
                }
                found = replacement;
                commentDate = replacement["commentDate"];
              } else {
                //If the item matches but is older then the currently found one
                outdatedReplacements.push( replacement );
              }
            }
          }
        }
      } else if ( state == "sitterActive" ) {
        for ( var key in replacements ) {
          if ( replacements.hasOwnProperty( key ) ) {
            var replacement = replacements[key];
            //Check if the item matches the requirements
            if ( replacement["state"] == "sitterActive"
              && replacement["sitter"] == sitter ) {
              if ( commentDate < replacement["commentDate"] ) {
                if ( found != false ) {
                  //If the item is older then another one, delete the older one.
                  outdatedReplacements.push( found );
                }
                found = replacement;
                commentDate = replacement["commentDate"];
              } else {
                //If the item matches but is older then the currently found one
                outdatedReplacements.push( replacement );
              }
            } else if ( replacement["state"] == "sitterRequest"
              && replacement["sitter"] == sitter
              && requestUsernames.indexOf( replacement["sitter"] ) == -1 ) {
              if ( commentDate < replacement["commentDate"] ) {
                if ( found != false ) {
                  //If the item is older then another one, delete the older one.
                  outdatedReplacements.push( found );
                }
                replacement["state"] = "sitterActive";
                replacements[key] = replacement; //This get's save while removing all outdated shit.
                found = replacement;
                commentDate = replacement["commentDate"];
              } else {
                //If the item matches but is older then the currently found one
                outdatedReplacements.push( replacement );
              }
            }
          }
        }
      }

      //Remove all outdated ID's.. We no longer need them.
      while ( outdatedReplacements.length > 0 ) {
        var outdatedReplacement = outdatedReplacements.shift();
        for ( var key in replacements ) {
          if ( replacements.hasOwnProperty( key ) ) {
            var replacement = replacements[key];
            //Check if this is the exact same object!
            if ( replacement["commentDate"] == outdatedReplacement["commentDate"]
              && replacement["state"] == outdatedReplacement["state"]
              && replacement["sitter"] == outdatedReplacement["sitter"]
              && replacement["start"] == outdatedReplacement["start"]
              && replacement["end"] == outdatedReplacement["end"]
              && replacement["comment"] == outdatedReplacement["comment"] ) {
              replacements.splice( key, 1 );
            }
          }
        }
      }
      //Save the object outside of the loop, less calculations (JSON.stringify) and writes (localStorage)
      replacementObject["replacements"] = replacements;
      localStorage.setItem( "replacementObject", JSON.stringify( replacementObject ) );

      if ( found != false ) {
        return found["comment"];
      } else {
        return '';
      }
    }

    function setComment( state, sitter, start, end, comment ) {
      replacements.push( {
        "commentDate": new Date().getTime(),
        "state"      : state,
        "sitter"     : sitter,
        "start"      : start,
        "end"        : end,
        "comment"    : comment
      } );
      replacementObject["replacements"] = replacements;
      localStorage.setItem( "replacementObject", JSON.stringify( replacementObject ) );
    }

    function cleanUp() {
      for ( var id in replacements ) {
        if ( replacements.hasOwnProperty( id ) ) {
          var replacement = replacements[id];
          if ( replacement == null ) {
            replacements.splice( id, 1 );
          } else {
            if ( replacement["state"] == "sitterRequest" ) {
              if ( requestUsernames.indexOf( replacement["sitter"] ) == -1 ) {
                replacements.splice( id, 1 );
              }
            } else if ( replacement["state"] == "sitterActive" ) {
              if ( activeUsernames.indexOf( replacement["sitter"] ) == -1 ) {
                replacements.splice( id, 1 );
              }
            }
          }
        }
      }
      replacementObject["replacements"] = replacements;
      localStorage.setItem( "replacementObject", JSON.stringify( replacementObject ) );
    }

    //After processing everything, run below:
    cleanUp();
  }
);