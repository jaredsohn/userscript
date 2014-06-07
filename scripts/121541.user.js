// ==UserScript==
// @name           Stack Exchange Retag helper
// @namespace      Rob W
// @author         Rob W
// @description    Configurable helper to enable a quicker retagging of questions at Stack Overflow
// @include        http://stackoverflow.com/questions/*
// @include        http://stackoverflow.com/q/*
// @include        http://stackoverflow.com/search?*
// @include        http://stackoverflow.com/posts/*/edit*
// @version        2.1
// ==/UserScript==


/* CONFIG */
// Use lowercase tags
// Usage: "tag-to-be-renamed": ["choice-1", "choice-2", "etc"]
var mapper = {
    "prototype": ["prototypejs", "prototype-programming"]
};
// true: Question will not collapse at the question overview (http://stackoverflow.com/questions/tagged/prototype)
// false: Question will collapse
var noCollapseOnHover = true;

// true: No confirmation when clicking at the retag button.
// false: Confirmation dialog when clicking at the retag button
var noConfirmOnClick = false;

// true: Shrinks questions at the search/tag page, to enable a quick access to questions for retagging
//       Only activates if the tag is previously defined at the `mapper` hash
var activeOnOverview = true;

/* END OF CONFIG*/

/* ### USAGE ###
 * At all times: SHIFT+ESC will toggle the added features.
 * - It's possible to edit a tag, and use this script to replace a certain tag with another tag
 * - When a retag button is clicked, a retag request is submitted to the server
 */

/*
 * Revision history
 * - 27 dec 2011: Published
 * - 28 dec 2011: Added support for <10k users.
 */

var $ = unsafeWindow.jQuery;
var is10kplus = $('.reputation-score').text().replace(/\D/g,'') >= 1e4;
var isTagged = activeOnOverview && (location.pathname.match(/\/questions\/tagged\/([^/+]+)/i) || decodeURIComponent(location.search).match(/\[([^\]]+)\]/i));
var isRealEditPage= /^\/posts\/\d+\/edit/i.test(location.pathname);
// If page == /tagged/ or search?q=, and a retag can be applied,
if (isTagged && isTagged[1].toLowerCase() in mapper) {
    $('head').append('<style type="text/css" id="added-by-robw-retag-style">' + 
    '.question-summary {height:1em;}' + 
    '.question-summary.added-by-robw{opacity:0.2;}' + 
    '.question-summary.pin-by-robw,' + (noCollapseOnHover?'':'.question-summary:hover')+'{height:auto;opacity:1;outline:1px solid #555}' +
    '#added-by-robw-button {position:fixed;top:5px;left:5px;padding:10px;max-width:100px;cursor:pointer;display:block !important;}' +
    '</style>');
    if (!is10kplus) {
        // 10k- users don't have access to inline tag editing.
        $('.question-hyperlink').each(function(){
            this.href = '/posts/' + this.href.match(/\d+/) + '/edit';
        });
    }
    $('.question-summary').mousedown(function(e){
        var a = /^a$/i.test(e.target.parentNode.tagName) ? e.target.parentNode : e.target; // Deal with highlights at search
        if (e.target.className == 'question-hyperlink') this.className += ' added-by-robw';
        else $(this).toggleClass('pin-by-robw');
    });
    // Keybind to toggle: SHIFT + ESC
    $(window).bind('keydown', function(e){
        if (e.shiftKey && e.which == 27) {
            var stylesheet = document.getElementById('added-by-robw-retag-style');
            stylesheet.disabled = !stylesheet.disabled;
        }
    });
    $('<button style="display:none;" id="added-by-robw-button" title="Clicking here will summon a confirmation dialog for each link. If one pop-up is blocked, the loop terminates.">Open each question.</button>').click(function(){
        this.disabled = true;
        var count = 0;
        try {
            $('.question-hyperlink').each(function(){
                var questionSummary = this.parentNode.parentNode.parentNode, success=!1;
                if(questionSummary.className.indexOf('added-by-robw') != -1) return;
                if(confirm((count+1)+'\tOpen new tab, containing the following question?\n\n' + this.textContent+'\n'))
                    success = window.open(this.href) !== null;
                if(success) {
                    questionSummary.className += ' added-by-robw';
                    count++;
                }
                return success;
            });
        }catch(e){throw e;}finally{
            alert(count + ' tab' + (count?'s have':' has') + ' been opened.');
            this.disabled = false;
        }
    }).appendTo('body');
} else if (isRealEditPage || document.getElementById('answers-header')) {
    // This variable will contain HTML if a retag is possible
    var tobeappended = '';
    var tagElements = ($('#tagnames').val()||'').replace(/^\s+|\s+$/g,'').toLowerCase().split(/\s+/);
    if (!tagElements[0]) {
        $('.post-taglist .post-tag').each(function(){tagElements.push(this.textContent.toLowerCase());});
    }
    $.each(mapper, function(tag, mapTo) { // Create closure
        var isTagged = 0;
        for(var i=tagElements.length; i>=0; i--) {
            if (isTagged = tagElements[i] == tag) break;
        }
        if (!isTagged) return;
        for (var i=0; i<mapTo.length; i++) {
            var newtag = mapTo[i];
            tobeappended += '<a class="post-tag" title="'+newtag+'" name="gm_retagger">'+newtag+'</a>';
        }
        tobeappended += '<a class="post-tag" title="" name="gm_retagger">+ Remove +</a>';
        var gm_retagger = $('<div id="added-by-robw-back-to-tags" style="display:none;"><a class="post-tag" style="padding:8px" href="/questions/tagged/'+tag+'"># tag:'+tag+'</a></div>'+
        '<div id="added-by-robw-retag-container" style="display:none;"><div id="gm_tag_status">1) Manual retag 2) Click at one of the buttons to retag.<br />SHIFT + ESC to toggle this panel</div>'+tobeappended).appendTo('body');
        gm_retagger.click(function(e){
            if(e.target.name == 'gm_retagger') {
                e.preventDefault();
                if (isRealEditPage || noConfirmOnClick || confirm(tag + '\n\n\t--->\n\n' + e.target.title)) replacetag(tag, e.target.title);
            }
        });
    });
    // If a retag can be done, add events and styles
    if (tobeappended) {
        // shift + ESC to toggle
        $(window).bind('keydown', function(e){
            if(e.shiftKey && e.which == 27) {
                var stylesheet = document.getElementById('added-by-robw-retag-style');
                stylesheet.disabled = !stylesheet.disabled;
            }
        });
        
        $('head').append('<style type="text/css" id="added-by-robw-retag-style">' +
        '#added-by-robw-back-to-tags,#added-by-robw-retag-container{display:block !important;}' + 
        '#added-by-robw-back-to-tags{position:fixed;left:0;width:100%;background:rgba(0,0,0,0.5);top:0;height:30px;left:0;width:auto;}' +
        '#added-by-robw-retag-container{position:fixed;left:0;width:100%;background:rgba(0,0,0,0.5);top:30px;padding:0 0 50px;}' +
        '#gm_tag_status{width:100%;margin:5px 0 130px;padding:5px;height:2.2em;color:#eee;font-size:150%;background:rgba(0,0,0,0.55)}' +
        '[name="gm_retagger"]{padding:10px;margin:5px;font-size:200%;}' +
        
        (isRealEditPage ? 
            '#gm_tag_status {margin-bottom:0px;}' +
            '#added-by-robw-retag-container {padding-bottom:0px;height:260px;}' + 
            'form.post-form {position:absolute;top:300px;}' + 
            'form > .form-item, .form-submit {position:fixed;top:185px;z-index:1;padding:0 10px 5px;background:rgba(255,255,255,0.5);}' +
            'form > .form-item + .form-item {top:145px;}'  +
            'form > .form-item + .form-item > label {display:none;}' +
            'form > .form-item:hover ~ .form-submit {display:none;}' +
            'form > .form-item:nth-child(8):hover ~ .form-submit {display:block;}' +
            '.form-submit {top:238px;}' + 
            '.wmd-preview {background:#FFF;margin-bottom:50px;}'
        :
            '.tagged {position:fixed;left:0;width:100%;background:rgba(0,0,0,0.5);top:30px;padding:0 0 50px;left:auto;width:auto;}' +
            '.post-taglist {background:rgba(255,255,255,0.8);position:fixed;z-index:1;top:87px;padding-left:15px;}' +
            '.edit-tags-wrapper {padding-bottom:0;}'+
            '.module .tagged {position:fixed;top:0;right:0;padding:10px;background:#FFF;z-index:1}' +
            '#tag-menu {position:fixed;}'
        )
        +
        '</style>');
    }

    function replacetag(replacetag, withtag){
        // Atempt to get the white-space separated list of tags through the text field (only after manually clicking tag edit)
        var tags = $('#tagnames').val()||"", newtags;
        if (!tags) {
            // If no text box was present, get the tags through the default list of anchors
            $('.post-taglist a.post-tag').each(function(){
                tags += $(this).text() + ' ';
            });
        }
        // Replace old tag with suggested tag
        newtags = tags.replace(new RegExp('(\\s|^)' + replacetag.replace(/([[^$.|?*+(){}])/g,'\\$1') +'(\\s|$)','i'), '$1' + withtag + '$2');
        if (newtags.toLowerCase() == tags.toLowerCase()) {
            $('#gm_tag_status').text('OK - Tags not changed');
        } else {
            if (isRealEditPage) {
                $('#gm_tag_status').text('Updated tag values. Press submit to submit the edit.');
                $('.tag-editor > span').html('');
                $('.tag-editor input').val(newtags + ' ').change();
                $('#tagnames').val(newtags);
                if (noConfirmOnClick || confirm(tags + '\n\n\t--->\n\n\t' + newtags)) $('#submit-button').closest('form').submit();
            } else {
                $('#gm_tag_status').text('Requesting... '+newtags+'...');
                /* AJAX METHOD - This one send a request for a retag*/
                $.ajax({
                    type: 'POST',
                    url: '/posts' + location.pathname.match(/\/q(?:uestions)?(\/\d+)/)[1] + '/edit-tags',
                    data: { 'fkey': unsafeWindow.StackExchange.options.user.fkey, 'tagnames': newtags },
                    dataType: 'html',
                    success: function(h) {
                        $('#gm_tag_status').html('OK - Tags updated: ' + newtags + '<br /><a href=".">Refresh page</a>');
                        $('.edit-tags-wrapper').html(h);
                    },
                    error: function(r) {
                        r = r.responseText;
                        $('#gm_tag_status').text(r && r.length < 300 ? 'ERROR: ' + r : 'ERROR: HTTP 500');
                    }
                });
            }
        }
    }
}