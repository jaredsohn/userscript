// ==UserScript==
// @name        Gmail Drag And Drop
// @namespace   http://fluidapp.com
// @description Gmail Drag-and-drop file attachments
// @include     http://mail.google.com/*
// @include     http://*.google.com/mail/*
// @include     https://mail.google.com/*
// @include     https://*.google.com/mail/*
// @author      Kevin Barry
// ==/UserScript==

(function () {
    
	if (!window.fluid) {
		return;
	}

    /* Magic constants from gmail source */
    var FileUploadClass = 'LIODqc';
    var AttachAFilePosition = 5;

    var canvas_frame = document.getElementById('canvas_frame');
    if (!canvas_frame) {
        return;
    }

    // Used to send clicks to gmail's span-links
    function sendClick(el) {
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false, false, 0, null);
        var canceled = !el.dispatchEvent(evt);
        if (canceled) {
            // alert('we were canceled');
            // A handler called preventDefault. Too bad.
            return 0;
        }
        return 1;
    };

    function AfterDrop(el) {
        el.style.removeProperty('top');
        el.style.removeProperty('bottom');
        el.style.removeProperty('left');
        el.style.removeProperty('right');
        el.style.removeProperty('position');
        el.style.removeProperty('opacity');
    
        document.getElementById('canvas_frame').contentDocument.
            getElementsByClassName('fN')[0].parentNode.style.
                removeProperty('border');
        return true;
    };
    
    function PrepareForDrop(el) {
        el.onchange = function() { AfterDrop(el) };

        el.style.setProperty('opacity', 0);
        el.style.setProperty('top',     0);
        el.style.setProperty('bottom',  0);
        el.style.setProperty('left',    0);
        el.style.setProperty('right',   0);
        el.style.setProperty('position', 'absolute');

        document.getElementById('canvas_frame').contentDocument.
            getElementsByClassName('fN')[0].parentNode.style.
                setProperty('border', '5px dashed orange');
        el.ondragleave = function() { AfterDrop(el) };
        return true;
    };

        
    setTimeout(function() {
        var canvas_doc = canvas_frame.contentDocument;
        canvas_doc.body.ondragenter = function() {
            // Check if we need to click 'Attach a file'
            var Uploads = canvas_doc.getElementsByClassName(FileUploadClass);
            var AttachFile = Uploads[Uploads.length - 1];
            if ( !AttachFile || AttachFile.value != '') {
                var AttachFileLink = canvas_doc.getElementsByClassName('el')[AttachAFilePosition];
                if (AttachFileLink.innerHTML != 'Attach a file') {
                    // Try to find Attach a file link
                    for (var i = AttachAFilePosition; i < 10; i++) {
                        AttachFileLink = canvas_doc.getElementsByClassName('el')[i];
                        if (AttachFileLink.innerHTML == 'Attach a file' ||
                            AttachFileLink.innerHTML == 'Attach another file')
                        {
                            break;
                        }
                        AttachFileLink = null;
                    }
                }
                if (!AttachFileLink) {
                    //alert("Couldn't find attach a file link");
                    return;
                }

                // Found the link, send a click
                if ( !sendClick(AttachFileLink)) {
                    return;
                }
                // Find all upload boxes and grab the latest one
                // (the one we just created)
                Uploads = canvas_doc.getElementsByClassName(FileUploadClass);
                AttachFile = Uploads[Uploads.length - 1];
            }

            PrepareForDrop(AttachFile);

            return true;

        } // ondragenter
    }, 6000);

})();
