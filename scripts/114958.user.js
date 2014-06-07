// ==UserScript==
// @name           LaTeX Preview for /sci/
// @namespace      TN5 !/sci/TN5..
// @include        http://boards.4chan.org/sci/*
// @description    Adds a preview button above the posting form.  Hold down this button to see a preview of your post with equations rendered.
// @orig_author    71f8f12556abe601d230ac099af2e207
// ==/UserScript==

// Modded from http://userscripts.org/scripts/review/81801 by jeb3
// by adding handlers for $ and $$:
//   $a$   -> [math]a[/math]
//   $$b$$ -> [eqn]b[/math]
// Also adds alt+p to toggle previewing
// Some "weird" dollar combinations are handled properly, some aren't
// TODO: 
//   better handling of overlapping dollars and such,
//   allow escaping of dollar signs (currently, you'd better hope you
//   have at most 1 dollar in your posts if you don't want to disable GM
//   to post your message)

function load_all() {
    
    var input = document.getElementsByName("com")[0];
    var pbutton = document.createElement("input");
    pbutton.type = "button";
    pbutton.value = "Preview";
    var post = document.getElementsByName("post")[0];
    post.insertBefore(pbutton, post.firstChild);
    pbutton.addEventListener("mousedown", preview_on, false);
    pbutton.addEventListener("mouseup", preview_off, false);
    pbutton.addEventListener("mouseout", preview_off, false);
    var preview = document.createElement("blockquote");
    preview.style.display = "none";
    input.parentNode.appendChild(preview);
    
    var inputX = document.getElementsByName("com")[1];
    var previewX,postX;
    if (inputX) {
        postX = document.getElementsByName("post")[1];
        previewX = document.createElement("blockquote");
        previewX.style.display = "none";
        inputX.parentNode.appendChild(previewX);
    }
    
    function replace_dollars(html) {
        var html = "_" + html + "_";
        html = html.replace(/([^\$])\$\$([^\$]+?)\$\$(?=[^\$])/g,"$1[eqn]$2[/eqn]");
        html = html.replace(/([^\$])\$([^\$]+?)\$(?=[^\$])/g,"$1[math]$2[/math]");
        html = html.replace(/^_([^]*)_$/,"$1");
        return html;
    }
    
    function replace_dollars_on_post() {
        input.value  = replace_dollars(input.value);
        if (inputX) {
            inputX.value = replace_dollars(inputX.value);
        }        
        return true;
    }
    
    if (post) {
        post.addEventListener("submit", replace_dollars_on_post, false);
    }
    if (postX) {
        postX.addEventListener("submit", replace_dollars_on_post, false);
    }
    
    var status = false;
    function preview_on() {
        function f(input,post,preview) {
            var text = input.value;
            if (unsafeWindow.comment_converters) {
                for (var i = 0; i < unsafeWindow.comment_converters.length; i++) {
                    text = unsafeWindow.comment_converters[i](text);
                }
            }
            preview.innerHTML = "";
            preview.appendChild(document.createTextNode(text));
            var html = preview.innerHTML;
            if (post) {
                html = replace_dollars(html);
            }
            html = html.replace(/\n/g, "<br />");
            html = html.replace(/\[math\]/g, '<span class="math">');
            html = html.replace(/\[\/math\]/g, "</span>");
            html = html.replace(/\[eqn\]/g, '<div class="math">');
            html = html.replace(/\[\/eqn\]/g, "</div>");
            preview.innerHTML = html;
            input.style.display = "none";
            preview.style.display = "table-cell";
        }
        f(input,post,preview);
        if(inputX) {
            f(inputX,postX,previewX);
        }
        unsafeWindow.jsMath.Autoload.ReCheck();
        unsafeWindow.jsMath.Process();
        status = true;
    }
    
    function preview_off() {
        preview.style.display = "none";
        input.style.display = "inline-block";
        if (inputX) {
            previewX.style.display = "none";
            inputX.style.display = "inline-block";
        }
        status = false;
    }
    
    function toggle() {
        if (status) {
            preview_off();
        } else {
            preview_on();
        }
    }
    
    function keydown_handler(e) {
        if (e.keyCode==80 && e.altKey) {
            toggle();
        }
    }
    
    document.addEventListener("keydown", keydown_handler, false);

}

setTimeout(load_all,500);