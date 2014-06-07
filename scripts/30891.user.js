// ==UserScript==
// @name            Estiah Inventory Notes
// @namespace       EIN
// @require	        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @require         http://www.json.org/json2.js
// @include         http://www.estiah.com/character/inventory*
// @include         http://www.estiah.com/market/shop/inventory*
// ==/UserScript==

// Wrapper for all Estiah Mods
if (typeof EstiahMod == "undefined") {
    var EstiahMod = {};
}

EstiahMod.InventoryNotes = function () {
    // Private members ============================================================================
    var editingID = 0;
    
    var in_array = function(needle, haystack, strict) {
    /* --------------------------------------------------------------------------------------------
     * +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
     *     example 1: in_array('van', ['Kevin', 'van', 'Zonneveld']);
     *     returns 1: true
     * --------------------------------------------------------------------------------------------
     */
        var found = false, key, strict = !!strict;
     
        for (key in haystack) {
            if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
                found = true;
                break;
            }
        }
     
        return found;
    };
    
    var showNoteEditor = function(itemID, itemName) {
    /* --------------------------------------------------------------------------------------------
     * Display the note editor for the item with the provided itemID and itemName
     * --------------------------------------------------------------------------------------------
     */
		if ('undefined' !== typeof($('#note-editor'))) {
            $('#a-note').unbind();
            $('#note-editor').remove();
        }
        
        // Save the ID of the item we're editing
        editingID = itemID;
        
        // Display the note editor window
        $('.stats').append('<div id="note-editor" class="stat" style="width: 260px; display: none"><textarea id="txa-note" cols="32" rows="1" style="font-size: small">' + GM_getValue('note' + itemID, 'No note saved.') + '</textarea><div style="float: right"><a id="a-note" onclick="return false" href="Save Note">[Save]</a></div>' + itemName);
        $('#note-editor').show('normal');
        
        // Save the note text when [Save] link is clicked
        $('#a-note').bind('click', function() {
            var note = $('#txa-note').val();
            
            // Save the note
            GM_setValue('note' + editingID, note);
            
            // Get a list of all notes saved so far
            var noteIDs = GM_getValue('noteIDs', '').split(',');
            
            // If no noteIDs, start with empty array
            if ( (1 == noteIDs.length) && ('' == noteIDs[0]) ) {
                noteIDs = [];
            }
            
            // If this note is new
            if (false == in_array(editingID, noteIDs)) {
                // Save new list with this note ID
                noteIDs[noteIDs.length] = editingID;
                GM_setValue('noteIDs', noteIDs.join(','));
            }
            
            // Change the note on-page
            $('#note' + editingID).remove();
            $('#SystemInfoItem' + editingID).append('<div id="note' + editingID + '" class="description" style="color: #FFD134">' + note + '</div>');
            
            // Remove the textarea
            $('#a-note').unbind();
            $('#note-editor').hide('normal', function() { $(this).remove(); } );
        } );
    };
    
    // Public members =============================================================================
    var pub = {};
    
    pub.init = function() {
    /* --------------------------------------------------------------------------------------------
     * Initializes controls and data for this module
     * --------------------------------------------------------------------------------------------
     */
        $('.inventory .item').each(function() {
            // Add note link
            $(this).children('.functions').append('<a onclick="return false" class="note-link" href="Add Note">[Note]</a>').css('width', 140).css('float', 'right').css('margin-top', '-12px');
            
            // Add saved note
            var itemID = this.id.replace('InventoryItem', '');
            $('#SystemInfoItem' + itemID).append('<div id="note' + itemID + '" class="description" style="color: #FFD134">' + GM_getValue('note' + itemID, '') + '</div>');
        });
        
        $('.note-link').each(function() {
            $(this).bind('click', function() {
                var itemID = $(this).parent().parent().attr('id').replace('InventoryItem', '');
                var itemName = $(this).parent().parent().children('.name').children().text();
                showNoteEditor(itemID, itemName);
            });
        });
        
        GM_setValue('noteIDs', '');
    };
    
    return pub;
} ();

$(document).ready(EstiahMod.InventoryNotes.init);