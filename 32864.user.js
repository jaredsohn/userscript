// ==UserScript==
// @name          /b/ypass v0.2
// @summary       Modifies your posts to get around 4chan /b/ word filters. Originally the work of tkirby, I tweaked it to remove three more wordfilters.
// @description   Modifies your posts on 4chan so that penis, vagina, buttsex, two, peanut butter and femanon don't trigger the wordfilters. Originally the work of tkirby, http://userscripts.org/users/51887.
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://*.4chan.org/*/*.html*
// ==/UserScript==

(function() {  // vim won't indent correctly without this -> )

    // To add filter words, append them to this array. Words must be in 
    // regex notation and must be put into two capture groups (.)(.) 
    // A blank, zero-width Unicode character will be inserted between these
    // groups which avoids them getting word filtered.
    //
    // Example: /(vag)(ina)/gi  <- will cause a zero-width soft-hyphen to be 
    //                             inserted painlessly into 'vagina'
    //
    const FILTER_WORDLIST = [
        /(pen)(is)/gi, 
        /(vag)(ina)/gi,
        /(butt)(sex)/gi,
        /(tw)(o)/gi,
        /(pea)(nut)/gi,
        /(fema)(non)/gi];

    const SEPARATOR = "\u00AD";

    var bypass_checkbox = null;
    var comment_textarea = null;

    function enable_bypass()
    {
        // dont try to run on 404'd pages
        if (!document.getElementById("navtop")) {
            return;
        }

        add_checkbox_to_post_form();
        window.addEventListener('submit', bypass_filter, true);
    }

    function add_checkbox_to_post_form()
    {
        var bypass_row = document.createElement('tr');
        bypass_row.appendChild(document.createElement('td'));

        var bypass_titlecell = document.createElement('td');
        bypass_titlecell.setAttribute('class', 'postblock');
        bypass_titlecell.appendChild(document.createTextNode('Wordfilter'));
        bypass_row.appendChild(bypass_titlecell);

        bypass_checkbox = document.createElement('input');
        bypass_checkbox.setAttribute('id', 'bypass_filter');
        bypass_checkbox.setAttribute('name', 'bypass_filter');
        bypass_checkbox.setAttribute('type', 'checkbox');

        if (GM_getValue('bypass_filter', true)) {
            bypass_checkbox.setAttribute('checked', 'checked');
        }

        var bypass_label = document.createElement('label');
        bypass_label.setAttribute('for', 'bypass_filter');
        bypass_label.appendChild(bypass_checkbox);
        bypass_label.appendChild(document.createTextNode('bypass'));

        var bypass_contentcell = document.createElement('td');
        bypass_contentcell.appendChild(bypass_label);

        bypass_row.appendChild(bypass_contentcell);

        // TODO: use xpath and make more specific
        comment_textarea = document.getElementsByName('com')[0];

        comment_row = comment_textarea.parentNode.parentNode;
        comment_row.parentNode.insertBefore(bypass_row, comment_row.nextSibling);
    }

    function bypass_filter(event)
    {
        if (event.target.name != 'post') {
            return
        }

        GM_setValue('bypass_filter', bypass_checkbox.checked);
        if (!bypass_checkbox.checked) {
            return;
        }

        for (word in FILTER_WORDLIST) {
            comment_textarea.value = comment_textarea.value.replace(
                    FILTER_WORDLIST[word], '$1' + SEPARATOR + '$2');
        }
    }

    window.addEventListener("load", function() { enable_bypass(); }, false);

})();