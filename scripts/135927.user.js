// ==UserScript==
// @name       Mantis Enhanced
// @namespace  http://www.paperg.com/
// @version    0.1
// @description  UI enhancer for Mantis, provides keyboard shortcuts and UI touchups.
// @match      *dev.paperg.com/mantis/view_all_bug_page.php*
// @copyright  2012+, Andrew Gu
// ==/UserScript==

/*

USAGE: Applies to the view_all_bug_page.php page.

CTRL+S: show/hide the filter settings
CTRL+D: toggle between showing only unresolved tickets, showing only resolved/closed tickets, and showing all tickets.
CTRL+Q: reset all filters

Type a ticket number: 
    Any digits you type will automatically focus you into the "jump to bug" text box. As you type, matching bug numbers will be highlighted.
    Pressing ESC will clear the search. Pressing enter goes to the specified ticket (not a highlighted ticket).
*/

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
      var script2 = document.createElement("script");
      script2.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.18/jquery-ui.min.js");
      script2.addEventListener('load', function(){
        var script3 = document.createElement("script");
        script3.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script3);
      }, false);
      document.body.appendChild(script2);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
    var MY_NAME = $('td.login-info-left span[class="italic"]').text();
    var MY_NAME_U = MY_NAME.charAt(0).toUpperCase() + MY_NAME.substr(1).toLowerCase();
    
    var SHOW_ALL = 0;
    var SHOW_UNRESOLVED = 1;
    var SHOW_RESOLVED = 2;
    var showMode = SHOW_ALL;
    
    // Show/hide filter block that takes up a crapload of vertical screen space.
    function dynamic_filter() {
        // Compact header
        $('#filter_open > br').remove();
        $('div small:contains(Recently Visited)').css('float', 'right');
        
        // Filter UI
        var showhide = $('<input type="button" value="Show/Hide Filter">');
        showhide.click(function(){
            $('#filter_open table').toggle('blind', 300);
        });
        $('#filter_open').prepend(showhide);
        $('#filter_open table').hide('blind', 300);
    };
    
    function label_columns() {
        var column_indices = {};
        $('table#buglist tr.row-category td').each(function(index, elem){
            var classname = $(elem).find('a').first().text().toLowerCase().replace(/[\s]/g, '_');
            if (classname.length > 0)
                column_indices[index] = 'column_' + classname;
            else
                column_indices[index] = null;
        });
        
        $('table#buglist tr[valign="top"]').each(function(rowindex, rowelem){
            $(rowelem).addClass("ticket_row");
            $(rowelem).find('td').each(function(index, elem){
                if (column_indices[index] != null)
                    $(elem).addClass(column_indices[index]);
            });
       });
    };
    
    function padZeros(str, target) {
        while (str.toString().length < target)
            str = '0' + str;
        return str;
    };
    
    function prettify_columns() {
        // Mark updated days as today and yesterday.
        var d = new Date();
            var today = d.getFullYear() + '-' + padZeros(d.getMonth()+1,2) + '-' + padZeros(d.getDate(),2);
            var y = new Date();
            y.setDate(y.getDate() - 1);
            var yesterday = y.getFullYear() + '-' + padZeros(y.getMonth()+1,2) + '-' + padZeros(y.getDate(),2);
        
        $('td.column_updated span').removeClass('bold');
        $('td.column_updated').css('width', '90px').each(function(index, elem){
            var spannode = $(elem).find('span').first();
            if (spannode.length == 0)
                spannode = $(elem);
            var datestring = $(spannode).text();
            
            if (datestring == today)
            {
                $(spannode).html('today');
            }
            else if (datestring == yesterday)
            {
                $(spannode).html('yesterday');
            }
        });
        
        $('td.column_id a').each(function(index, elem) {
            // labelling all of the links by id to be easily locatable later.
            var ticketnumber = parseInt($(elem).text(), 10);
            $(elem).attr('id',"buglink_" + ticketnumber.toString());
            $(elem).parents('tr.ticket_row').attr('id', 'ticketrow_' + ticketnumber.toString());
        });
    };
    
    function label_rows() {
        $('tr.ticket_row').each(function(index, elem){
            if ($(elem).find('td.column_status:contains(resolved)').length > 0 
                || $(elem).find('td.column_status:contains(closed)').length > 0)
            {
                $(elem).addClass('resolved_ticket');
            }
            else
            {
                $(elem).addClass('unresolved_ticket');
            }
        });
    };
    
    // Apply bolding to tickets that are assigned to me (or if I'm QA contact).
    function mark_my_tickets() {
        $('tr.ticket_row').each(function(index, elem){
            // If assigned to me
            if ($(elem).find('td.column_status:contains(' + MY_NAME + ')').length > 0)
            {
                //$(elem).css('font-weight', 'bold');
                $(elem).addClass('em_ticket');
            }
            // Or if I am the QA contact
            else if ($(elem).find('td.:contains(' + MY_NAME_U + ')').length > 0)
            {
                //$(elem).css('font-weight', 'bold');
                $(elem).addClass('em_ticket');
            }
        });
        
        $('.em_ticket').css('font-weight', 'bold');
    };
    
    function check_ctrl_key(ev, key_str)
    {
        return (ev.which == key_str.toLowerCase().charCodeAt(0) || ev.which == key_str.toUpperCase().charCodeAt(0)) && ev.ctrlKey;
    };
        
    function is_number_key(evnt)
    {
        return evnt.keyCode >= 48 && evnt.keyCode <= 57 && !evnt.ctrlKey && !evnt.shiftKey && !evnt.altKey;
    };
    
    function update_bug_jump() {
        showMode = SHOW_ALL;
            
        var current_bug = parseInt($('#jump_text_field').attr('value'), 10);
        //$('.ticket_row td').css('background-color', 'transparent').css('color', '');
        //$('.ticket_row a').css('color', '');
        if (isNaN(current_bug))
        {
            $('.ticket_row').show();
        }
        else
        {
            // Highlight the bug
            $('.ticket_row').hide();
            var frows = $('tr.ticket_row:contains(0' + current_bug.toString() + ')');
            frows.show();
            //frows.find('td').css('background-color', '#00509f').css('color', '#ff9900');
            /*if (frows.length > 0)
            {
                frows[0].scrollIntoView();
            }*/
            //frows.find('td a').css('color', '#ff9900');            
        }
    };
    
    // Special hotkeys that do fancy stuff.
    function bind_hotkeys() {
        // Bindings for bug jump field to play nice
        $('form[action="/mantis/jump_to_bug.php"] input[name="bug_id"]').bind('keydown', function(evnt){
            evnt.stopPropagation();
        }).bind('keyup', function(evnt){
            // Special handling: ESC key backs out of the jump.
            if (evnt.keyCode == 27){
                $('#jump_text_field').attr('value', '').blur();
            }
            
            setTimeout(50, update_bug_jump());
        }).attr('id', 'jump_text_field');
        
        $(window).keydown(function(evnt){
            // CTRL+S to open/close filter panel
            if (check_ctrl_key(evnt, 's'))
            {
                evnt.preventDefault();
                $('#filter_open table').toggle('blind', 300);
                return false;
            }
            // CTRL+D to filter by resolved/unresolved
            else if (check_ctrl_key(evnt, 'd'))
            {
                evnt.preventDefault();
                
                showMode = (showMode + 1) % 3;
                
                if (showMode == SHOW_ALL) {
                    $('.resolved_ticket, .unresolved_ticket').show();
                }
                else if (showMode == SHOW_UNRESOLVED) {
                    $('.unresolved_ticket').show();
                    $('.resolved_ticket').hide();
                }
                else {
                    $('.unresolved_ticket').hide();
                    $('.resolved_ticket').show();
                }
                return false;
            }
            // CTRL+Q to jump to default view
            else if (check_ctrl_key(evnt, 'q'))
            {
                evnt.preventDefault();
                $('#filters_open form[name="list_queries_open"] select[name="source_query_id"]').attr('value', -1);
                document.forms.list_queries_open.submit();
                return false;
            }
            else if (is_number_key(evnt))
            {
                //$('#jump_text_field').focus().attr('value',evnt.keyCode - 48);
                $('#jump_text_field').attr('value', '').focus();
                //setTimeout(1, update_bug_jump());
            }
        });
    };

    dynamic_filter();
    label_columns();
    prettify_columns();
    label_rows();
    mark_my_tickets();
    bind_hotkeys();
}

// load jQuery and execute the main function
addJQuery(main);