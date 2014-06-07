// ==UserScript==
// @name        Microchip WebTicket Cleanup
// @namespace   com.maltera
// @description Re-organizes Microchip's WebTicket interface to be more usable.
// @include     http://www.microchip.com/support/IndividualTicket.aspx?*
// @grant       none
// @run-at      document-start
// @version     1.3
// ==/UserScript==
//
// Written in 2013 by Sam Hanes <sam@maltera.com>
// 
// To the extent possible under law, the author(s) have
// dedicated all copyright and related and neighboring
// rights to this software to the public domain worldwide.
// This software is distributed without any warranty.  
// 
// For details see:
// http://creativecommons.org/publicdomain/zero/1.0/

// extract the ticket number from the URL and update the page title
// we do this as early as possible to prevent flicker
var ticketNumber = 
    /[?&]TicketNo=([^&]*)(?:&|$)/i
    .exec( document.location.search )[ 1 ];
document.title = ticketNumber + ' - Microchip WebTicket';

// hide the document contents to prevent flicker as we change them
document.documentElement.style.display = 'none';

document.addEventListener( 'DOMContentLoaded', function (event) {
    // removes phone access number from ticket title
    document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_lblTktHead'
        ).textContent = 'Ticket ' + ticketNumber;

    
    // replaces the usesless input for the severity, which is read-only
    var severity = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucDisplayTkt_ddlSeverity'
        );
    severity.style.display = 'none';
        
    var severityInput = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucDisplayTkt_ddlSeverity_Input'
        );
                
    severity.parentNode.appendChild(
            document.createTextNode( severityInput.value ) );


    // replaces the useless editor for the description, which is read-only
    var desc = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucDisplayTkt_editorDes'
        );
    desc.style.display = 'none';
    
    var descValue = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucDisplayTkt'
            + '_editorDesContentHiddenTextarea'
        );
    
    var descNew = document.createElement( 'div' );
    descNew.innerHTML = decodeURIComponent( descValue.defaultValue );
    desc.parentNode.insertBefore( descNew, desc );

    // hide the tab strip
    document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_radTicketPage'
        ).style.display = 'none';

    // find the comment section
    var commentParent = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_rpvcomnt'
        );

    var commentBefore = commentParent.firstChild;
        
    var title = document.createElement( 'div' );
    title.className = 'NormalBold';
    title.style.marginTop = '1em';
    title.appendChild( document.createTextNode( 'Comments:' ) );
    commentParent.insertBefore( title, commentBefore );
    
    // hide the existing table of comments
    // AUGH, there's no selector for the wrapper table
    // instead, find the child which contains the actual table
    var commentTable;
    for (var idx = 0; idx < commentParent.childNodes.length; idx++) {
        var child = commentParent.childNodes[ idx ];
        if (1 /*ELEMENT_NODE*/ != child.nodeType) continue;
        
        commentTable = child.querySelector( 
                '#ctl00_ctl00_ctl00_PageContent_SubPageContent'
                + '_cphPageContent_ucActivity_gridActivity_ctl00' );
        if (null != commentTable) {
            child.style.display = 'none';
            break;
        }
    }
    
    var comments = document.createElement( 'ul' );
    comments.className = 'gm-comments';
    comments.style.listStyle = 'none';
    comments.style.marginLeft = '12px';
    comments.style.paddingLeft = '0';
    commentParent.insertBefore( comments, commentBefore );

    for (var rowIdx = 0; rowIdx < commentTable.rows.length; rowIdx++) {
        var metaRow = commentTable.rows[ rowIdx ];
        if (!metaRow.classList.contains( 'rgRow' )
                && !metaRow.classList.contains( 'rgAltRow' ))
            continue;
        
        var bodyRow = commentTable.rows[ rowIdx + 1 ];
        
        var comment = document.createElement( 'li' );
        comment.className = 'gm-comment';
        comments.appendChild( comment );
        
        var header = document.createElement( 'div' );
        header.className = 'gm-comment-header NormalBold';
        comment.appendChild( header );
        
        var date = document.createElement( 'span' );
        date.className = 'gm-comment-date';
        date.style.display = 'inline-block';
        date.style.minWidth = '20ex';
        date.textContent = metaRow.cells[ 3 ].textContent;
        header.appendChild( date );
        
        var author = document.createElement( 'span' );
        author.className = 'gm-comment-author';
        author.style.display = 'inline-block';
        author.style.minWidth = '30ex';
        author.textContent = metaRow.cells[ 2 ].textContent;
        header.appendChild( author );
        
        var body = document.createElement( 'div' );
        body.className = 'gm-comment-body';
        body.style.paddingLeft = '1.5em';
        body.innerHTML = bodyRow.cells[ 1 ].innerHTML;
        comment.appendChild( body );
    }

    // hide the comment form and add a button to show it
    var commentForm = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucActivity_pnlcomments'
        );
    if (null !== commentForm) {
        commentForm.style.display = 'none';
        
        var commentButton = document.createElement( 'a' );
        commentButton.href = '#';
        commentButton.style.color = 'blue';
        commentButton.style.marginLeft = '12px';
        commentButton.textContent = 'Add a Comment';
        //commentButton.className = 'bigbutton';
        commentForm.parentNode.insertBefore( commentButton, commentForm );
        commentButton.addEventListener( 'click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            
            commentButton.style.display = 'none';
            commentForm.style.display = null;
        }, true );
    
        // hide disabled "allow sharing" input
        document.getElementById(
                'ctl00_ctl00_ctl00_PageContent_SubPageContent'
                + '_cphPageContent_ucActivity_chkmchpauthorised'
            ).parentNode.style.display = 'none';
    }
        
        
    // move the attachments section before the comments
    var attachmentParent = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_rpvattach'
        );
    commentParent.parentNode.insertBefore(
            attachmentParent, commentParent );
    attachmentParent.style.display = 'block';
    
    title = document.createElement( 'div' );
    title.className = 'NormalBold';
    title.textContent = 'Attachments:';
    attachmentParent.parentNode.insertBefore(
            title, attachmentParent );
    
    // hide the add attachment form and add a button to show it
    var attachmentForm = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucAttachments_pnlAttachment'
        );
    if (null !== attachmentForm) {
        attachmentParent.appendChild( attachmentForm );
        attachmentForm.style.display = 'none';
        
        var attachmentButton = document.createElement( 'a' );
        attachmentButton.href = '#';
        attachmentButton.textContent = 'Add an Attachment';
        attachmentButton.style.color = 'blue';
        attachmentButton.style.marginLeft = '12px';
        //attachmentButton.className = 'bigbutton';
        attachmentParent.insertBefore( attachmentButton, attachmentForm );
        attachmentButton.addEventListener( 'click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            
            attachmentButton.style.display = 'none';
            attachmentForm.style.display = null;    
        }, true );
    }
    
    // re-organize the attachments table
    var attachments = document.getElementById(
            'ctl00_ctl00_ctl00_PageContent_SubPageContent'
            + '_cphPageContent_ucAttachments_gdvAttachment'
        );
    for (var rowIdx = 0; rowIdx < attachments.rows.length; rowIdx++) {
        var row = attachments.rows[ rowIdx ];
        
        if (row.classList.contains( 'gridRow' )) {
            var buttonCell = row.cells[ 5 ];
            if (buttonCell) {
                var before;
                
                // change the delete button from an icon to text
                var delLink = buttonCell.getElementsByTagName( 'a' )[ 0 ];
                if (delLink) {
                    delLink.title = 'delete this attachment';
                    delLink.textContent = 'Delete';
                    before = delLink;
                } else {
                    before = buttonCell.firstChild;
                }
                
                // move the edit button to the same column
                var editLink = row.cells[ 0 ].getElementsByTagName( 'a' )[ 0 ];
                editLink.title = 'edit this attachment';
                buttonCell.insertBefore( editLink, before );
                buttonCell.insertBefore(
                        document.createTextNode( ' ' ), before );
            }
        } else if (row.classList.contains( 'gridHeader' )) {
            // don't call the buttons column 'Delete'
            if ('undefined' !== typeof row.cells[ 5 ])
                row.cells[ 5 ].textContent = '';
            
            // fix the poorly chosen background color
            row.style.backgroundColor = '#CCCCCC';
        }
        
        // remove the column which formerly contained the edit button
        row.removeChild( row.cells[ 0 ] );
    }
    
    // show the document contents, now that we're done changing them
    document.documentElement.style.display = null;
}, false );
