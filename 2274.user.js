// ==UserScript==
// @name          TV Programme selector
// @namespace     http://www.atleta.hu/gm/port.hu
// @description   v0.3 A Port.hu-n az egyeni beallitasoknal TV musorok kivalasztasat teszi kenyelmesebbe (hasznalhatova)
// @include       http://www.port.hu/pls/w/tv.personal*
// @include       http://port.hu/pls/w/tv.personal*
// @include       http://www.port.hu/pls/tv/tv.personal*
// @include       http://port.hu/pls/tv/tv.personal*
// ==/UserScript==

/*        Author: Laszlo Marai / atleta
          Date:   2007-08-30
	  License: General Public License
*/

(
function() {
    const PROGRAMMES_XPATH = "//form/table/tbody/tr/td[1]/table/tbody/tr[position()>2]";

    var progs = toArray( document.evaluate( PROGRAMMES_XPATH,
                                    document, null, 0, null ) );
    var progTable = toArray( document.evaluate( PROGRAMMES_XPATH,
                                    document, null, 0, null ) );
    
    var selection = { selected: null };
    var handler = createClickHandler( selection );
    var first = 0;
    var last = progs.length - 1;
    var prevIndex = 1;
    
    progs[first].limit = true;
    progs[last].limit = true;
    
    for ( i = first; i <= last; i++ ) {
        progs[i].addEventListener( 'click', handler, true );
        
        // Try too guess the right ordinal for the channels that have '*' instead
        var ordinal = progs[i].cells[2].getElementsByTagName( "select" )[0];
        if ( ! Number( ordinal.options[ordinal.selectedIndex].value ) ) {
            ordinal.selectedIndex = prevIndex + 1;
        }
        
        prevIndex = ordinal.selectedIndex;
    }
    
    createButtons( progs[1].parentNode.insertRow( 1 ) );
    
    function createButtons( row ) {
        var cell = row.insertCell( 0 );
        cell.colSpan = 3;
        cell.innerHTML = //"<TABLE WIDTH='100%'><TBODY><TR><TD><DIV id='user.script.ButtonDown' align='center'>Le</DIV></TD><TD><DIV id='user.script.ButtonUp' align='center'>Fel</DIV></TD></TR></TBODY></TABLE>"
            "<TABLE WIDTH='100%'>" +
                "<TBODY>" +
                    "<TR>"+
                        "<TD>" +
                            "<!--A HREF='#' STYLE='text-decoration:none'-->" +
                                "<DIV id='user.script.ButtonDown' align='center'>" +
                                    "Le" +
                                "</DIV>" + 
                            "<!--/A-->" +
                        "</TD>" +
                        "<TD>" +
                            "<!--A HREF='#' STYLE='text-decoration:none'-->" + 
                                "<DIV id='user.script.ButtonUp' align='center'>" +
                                    "Fel" +
                                "</DIV>" +
                            "<!--/A-->" +
                        "</TD>" +
                    "</TR>" +
                "</TBODY>" +
            "</TABLE>";
        setupButton( "user.script.ButtonDown", createButtonHandler( new DownHelper() ) );
        setupButton( "user.script.ButtonUp", createButtonHandler( new UpHelper() ) );
    }
    
    function setupButton( name, handler ) {
        var button = document.getElementById( name );
        button.style.border = "2px solid";
        button.style.background = "#aeae20";
        button.style.MozUserSelect = "none";
        button.addEventListener( "click", handler, true );
        return button;
    }
    
    function toArray( xpathResult ) {
        var item;
        var array = [];
        
        while ( item = xpathResult.iterateNext() ) {
            array.push( item );
        }
        
        return array;
    }
    
    function createClickHandler( param ) {
        var previous;
        return function( event ) {
            if ( this != previous ) {
                this.saveBgr = this.style.background;
                this.style.background = "#ffff00";
                
                if ( previous ) {
                    previous.style.background = previous.saveBgr;
                }
                param.selected = this;
                previous = this;
            }
            
            event.stopPropagation();
            event.preventDefault();
        }
    }
    
    function createButtonHandler( helper ) {
        return function( event ) {
            var table = selection.selected.parentNode;
            var rows = helper.getRows( selection.selected );
            rows[1].cells[2].getElementsByTagName( "select" )[0].selectedIndex++;
            rows[0].cells[2].getElementsByTagName( "select" )[0].selectedIndex--;
            table.removeChild( rows[0] );
            table.insertBefore( rows[0], rows[1] );
        }
    }
    
    function DownHelper() {
        this.getRows = function( row ) {
            var nextRow = row.nextSibling;
            while ( nextRow.nodeName.toLowerCase() != "tr" ) {
                nextRow = nextRow.nextSibling;
            }
            
            return [nextRow, row];
        }
    }
    
    function UpHelper() {
        this.getRows = function( row ) {
            var prevRow = row.previousSibling;
            
            while ( prevRow.nodeName.toLowerCase() != "tr" ) {
                prevRow = prevRow.previousSibling;
            }
            
            return [row, prevRow];
        }
    }
}
)();
