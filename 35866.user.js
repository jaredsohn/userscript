// ==UserScript==
// @name          Gmail Bottom Posting v3
// @namespace     http://z3c.info/
// @description   Inserts the caret _after_ the quoted text when replying to emails using Gmail. Please view source for full credits.
// @include       https://mail.google.tld/mail/*
// @include       http://mail.google.tld/mail/*
// @include       https://mail.google.tld/a/*
// @include       http://mail.google.tld/a/*
// ==/UserScript==

/**
 * Original script author: Herik N (http://userscripts.org/scripts/show/8041)
 *
 * Modified by: Rob Wilkerson (http://userscripts.org/scripts/show/14256)
 * Comments:
 * This is Henrik N's script with a few trivial modifications to support
 * Gmail's new interface and a couple of cosmetic "improvements" that I prefer.
 * The credit  is his.
 *
 * Modified by: Damir Zekić
 * Comments:
 * Added some sexy OO and support for rich-text editor.
 */

function RichTextFormatter(editor)
{
    var body = editor.document.body;

    this.isReply = function()
    {
        // Gmail seems to put two different reply lines depending on the type
        // of the mail being replied to
        // * replying to plain-text mails:
        //   2008/10/23 J Smith <j.smith@gmail.com>
        // * replying to HTML mails:
        //   On Thu, Oct 23, 2008 at 09:30, J Smith <jsmith@gmail.com> wrote:
        //
        // In first case in rich-text editor there is no colon in the end.
        return body.innerHTML.match(
            /^\<br\>\<br\>\<div class="\w+"\>\w+.*?\<br\>/);
    };

    this.format = function()
    {
        // remove signature from quotes
        var bq = body.getElementsByTagName('blockquote');
        for (var i = 0; i < bq.length; i++) {
            var qt = bq[i].innerHTML;
            qt = qt.replace(/\<br\>\n?\-\-(.|\n)*/, '');
            bq[i].innerHTML = qt;
        }

        // remove initial and trailing breaklines
        var t = body.innerHTML;
        t = t.replace(/^(\<br\>)+/, '');
        t = t.replace(/(\<br\>)+$/, '');
        body.innerHTML = t;
    };

    this.setCaretPosition = function()
    {
        var range = editor.getSelection().getRangeAt(0);
        // offset is based on number of nodes in body tag
        var caretOffset = 2;
        range.setStart(body, caretOffset);
    };
}

function PlainTextFormatter(editor)
{
    var body = editor.value;

    this.isReply = function()
    {
        return body.match(/^\n\n\w.*?:\n>/);
    };

    this.format = function()
    {
        // strip initial and trailing line breaks
    	body = body.replace(/^\n+/, '');
    	body = body.replace(/\n+$/, '');

        // remove signature from quoted text
        body = body.replace(/\> \-\- ?\n(> .*\n)+(>\n)?/, '');

        // assign new body
        editor.value = body;
    };

    this.setCaretPosition = function()
    {
    	var signatureBegins = body.lastIndexOf("\n-- \n");
    	var endOfContent = caretPosition = (signatureBegins == -1)
            ? body.length
            : signatureBegins;

        // there is a signature
    	if (signatureBegins != -1) {
            caretPosition--;
    	} 

    	editor.scrollTop = editor.scrollHeight;
    
        // a tiny timeout is necessary, or the caret won't move
    	setTimeout(
            function() {  
                // place caret at end
                editor.setSelectionRange(caretPosition, caretPosition);
    		}, 
    		1
    	);
    };
}

function format(editor)
{
    var tf = (editor.name == "body")
        ? new PlainTextFormatter(editor)
        : new RichTextFormatter(editor);

    if (tf.isReply()) {
        tf.format();
        tf.setCaretPosition();
    }
}

if (frames.length > 3) {
    // frame in which Gmail UI is rendered
    var canvasFrame = frames[3];

    // handle all changes to the DOM Subtree
    canvasFrame.addEventListener(
        'DOMSubtreeModified',
        function() {
            if (canvasFrame.frames.length > 0) {
                // editor frame
                var editorFrame = canvasFrame.frames[0];

                // wait for editor frame to load
                editorFrame.addEventListener(
                    'load',
                    function() {
                        format(editorFrame);
                    },
                    false);
            }
        },
        true);
}

document.addEventListener(
    'focus',
    function(e) {
    	// bail if the focused element is not a reply form
    	if (!e.target.id || e.target.name != 'body') {
     		return;
    	}

        format(e.target);
    }, 
    true
);
