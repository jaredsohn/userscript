// ==UserScript==
// @name           Toggle Autocomplete On
// @namespace      http://toggle.autocomplete.on/kepp
// @description    Toggles elements with autocomplete set to off to autocomplete on
// @include        http://*
// @include        https://*
// @grant          none
// @updateURL      http://userscripts.org/scripts/source/17453.meta.js
// @version        20130830
// ==/UserScript==

/*

20130830 - Update metadata @grant, @updateURL
         - Update location hack, use location.replace, change comments

20100228 - XPath selection of autocomplete nodes simplified.
         - Added watch for content inserted after initial page load.
         - Added check to ensure autocomplete is not disabled when form is
           submitted.
           

*/

( function() {

  location.replace( "javascript:(" + function() {

    function setAutocompleteOn() {
      var res = document.evaluate("//@autocomplete", document, null,
                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

      for ( var i = 0, att; att = res.snapshotItem( i ); i++ ) {
        att.nodeValue = "on";
      }
    }
    setAutocompleteOn();


    /* handle elements inserted after initial document load */
    var id = 0;
    function collectEvents() {
      clearTimeout( id );
      id = setTimeout( function() {
        setAutocompleteOn();
      }, 1000 );
    }
    window.addEventListener( "DOMNodeInserted", collectEvents, false );


    /* handle case where form is submitted using javascript

       strip out any javascript setting autocomplete off
       need to find some other way to do this */
    HTMLFormElement.prototype._gm_submit = HTMLFormElement.prototype.submit;

    var acRe = /(\.|setAttribute\(['" ])autocomplete(['" ])([, "'=]+off)/g;
    if ( acRe.test( HTMLFormElement.prototype.submit.toString() ) ) {

      eval( "HTMLFormElement.prototype._gm_submit =" +
            HTMLFormElement.prototype.submit.toString()
            .replace( acRe, "$1_autocomplete$2$3" ) );
    }

    HTMLFormElement.prototype.submit = function() {
      setAutocompleteOn(); /* ensure autocomplete is on */
      this._gm_submit();
    };

  } + "() )" );

}() );


/* TEST PAGE
<html><head>
<meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">

</head><body>

<form id="form" onsubmit="" action="http://www.google.com/search">

<input autocomplete="off" name="q"  type="text"></input>
<input type="submit"></input>
<input onclick="startSubmit();" value="Start Submit" type="button"></input>
<input onclick="insertInput( event );" value="Insert Input" type="button"></input>

</form>


<script type="text/javascript">

// handle javascript submit
function xSubmit() {
  this.q.setAttribute("autocomplete", "off");
  this._submit();
  alert("xs:" + this.q.getAttribute("autocomplete"));
};

HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = xSubmit;

function startSubmit() {
  setTimeout(function() {
    form.q.setAttribute("autocomplete", "off");
    form.submit();
  }, 5000 );
}

function insertInput( event ) {
  var input = document.createElement( "input" );
  input.setAttribute( "type", "text" );
  input.setAttribute( "autocomplete", "off" );
  event.target.form.appendChild( input );
}

</script>

</body></html>
*/
