// ==UserScript==
// @name          4chan_fliptext
// @summary       Allows to flip words in 4chan posts
// @description   Allows to flip words in 4chan posts
// @include       http://*.4chan.org/*/res/*.html*
// @include       http://*.4chan.org/*/*.html*
// ==/UserScript==

(function() {  // vim won't indent correctly without this -> )

    var fliptable = {
    a : '\u0250',
    b : 'q',
    c : '\u0254',
    d : 'p',
    e : '\u01DD',
    f : '\u025F',
    g : '\u0183',
    h : '\u0265',
    i : '\u0131',
    j : '\u027E',
    k : '\u029E',
    l : 'l',
    m : '\u026F',
    n : 'u',
    o : 'o',
    p : 'd',
    q : 'b',
    r : '\u0279',
    s : 's',
    t : '\u0287',
    u : 'n',
    v : '\u028C',
    w : '\u028D',
    y : '\u028E',
    z : 'z',
    '\u00E4' : '\u01DD\u0250',
    /* ä */'\u00F6' : '\u01DDo',
    /* ö */'\u00FC' : '\u01DDn',
    /* ü */'\u00DF' : 'ss',
    /* ß */'\u00E1' : '\u0250',
    /* á */'\u00E0' : '\u0250',
    /* à */'\u00E2' : '\u0250',
    /* â */'\u0105' : '\u0250',
    /* a */'\u00E7' : '\u0254',
    /* ç */'\u0107' : '\u0254',
    /* c */'\u00E9' : '\u01DD',
    /* é */'\u00E8' : '\u01DD',
    /* è */'\u00EA' : '\u01DD',
    /* ê */'\u0119' : '\u01DD',
    /* e */'\u00ED' : '\u0131',
    /* í */'\u00EC' : '\u0131',
    /* ì */'\u00EE' : '\u0131',
    /* î */'\u0142' : 'l',
    /* l */'\u00F1' : 'u',
    /* ñ */'\u0144' : 'u',
    /* n */'\u00F3' : 'o',
    /* ó */'\u00F2' : 'o',
    /* ò */'\u00F4' : 'o',
    /* ô */'\u015B' : 's',
    /* s */'\u00FA' : 'n',
    /* ú */'\u00F9' : 'n',
    /* ù */'\u00FB' : 'n',
    /* û */'\u00FD' : '\u028E',
    /* ý */'\u017A' : 'z',
    /* z */'\u017C' : 'z',
    /* z */1 : '\u21C2',
    2 : '\u1105',
    3 : '\u1110',
    4 : '\u3123',
    5 : '\u078E',
    /* or u03DB */6 : '9',
    7 : '\u3125',
    8 : '8',
    9 : '6',
    0 : '0',
    '.' : '\u02D9',
    ',' : "\'",
    "\'" : ',',
    "\"" : ',,',
    "´" : ',',
    "`" : ',',
    ';' : '\u061B',
    '!' : '\u00A1',
    '\u00A1' : '!',
    '?' : '\u00BF',
    '\u00BF' : '?',
    '[' : ']',
    ']' : '[',
    '(' : ')',
    ')' : '(',
    '{' : '}',
    '}' : '{',
    '<' : '>',
    '>' : '<',
    '_' : '\u203E',
    '\r' : '\n'
    };

    var comment_textarea = null;

    function enable_fliptext()
    {
        // dont try to run on 404'd pages
        if (!document.getElementById("navtop")) {
            return;
        }

        init_fliptable();
        set_up_controls();
    }

    function set_up_controls()
    {
        var flip_icon = document.createElement('img');
        flip_icon.src = flip_img;
        flip_icon.setAttribute('style', 'padding:0px; margin:0px');
        flip_icon.align = 'top';

        var flip_link = document.createElement('a');
        flip_link.setAttribute('id', 'mf_flip_link');
        flip_link.addEventListener('click', flip_selection, false);
        flip_link.style.cursor = "pointer";
        flip_link.title = 'Flip selected text';
        flip_link.appendChild(flip_icon);

        comment_textarea = $X("//form[@name='post']//textarea[@name='com']");

        comment_cell = $X("//form[@name='post']//textarea[@name='com']/ancestor::td");
        comment_cell.appendChild(flip_link);
    }

    window.addEventListener("load", function() { enable_fliptext(); }, false);

    function init_fliptable() {
        for (i in fliptable) { 
            if (fliptable[fliptable[i]] == undefined) { 
                fliptable[fliptable[i]] = i;
            }
        }
    }

    function flip_selection()
    {
        text = get_selection(comment_textarea);
        if (text) {
            flipped = flip_string(text);
            replace_selection(flipped, comment_textarea)
        } else {
            comment_textarea.value = flip_string(comment_textarea.value);
        }
    }

    function flip_string(s)
    {
        s = s.toLowerCase();
        var result = new Array(s.length);
        for (var i = s.length - 1; i >= 0; --i) { 
            var o = s.charAt(i);
            var f = fliptable[o];
            result[s.length - 1 - i] = f != undefined ? f : o;
        } return result.join('');
    }

    function get_selection(textarea)
    {
        return textarea.value.substring(textarea.selectionStart,textarea.selectionEnd)
    }

    function replace_selection(text, textarea)
    {
        var selection_start = textarea.selectionStart;
        var selection_end = textarea.selectionEnd;
        var pretext = textarea.value.substring(0,selection_start);
        var posttext = textarea.value.substring(textarea.selectionEnd);
        textarea.value = pretext + text + posttext; 

        textarea.focus();
        textarea.setSelectionRange(selection_start, selection_end);
    }

    // list nodes matching this expression, optionally relative to the node `root'
    function $x( xpath, root )
    {
        var doc = root ? root.evaluate ? root : root.ownerDocument : document, next;
        var got = doc.evaluate( xpath, root||doc, null, 0, null ), result = [];

        switch (got.resultType) {
            case got.STRING_TYPE:
                return got.stringValue;
            case got.NUMBER_TYPE:
                return got.numberValue;
            case got.BOOLEAN_TYPE:
                return got.booleanValue;
            default:
                while ((next = got.iterateNext()))
                    result.push( next );
                return result;
        }
    }

    function $X( xpath, root )
    {
        var got = $x( xpath, root );
        return got instanceof Array ? got[0] : got;
    }
    var flip_img = "data:image/gif;base64,R0lGODlhIwAgAOf%2FAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4%2BPj8%2FP0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5%2Bfn9%2Ff4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo%2BPj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp%2Bfn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq%2Bvr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6%2Bvr%2B%2Fv8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs%2FPz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t%2Ff3%2BDg4OHh4eLi4uPj4%2BTk5OXl5ebm5ufn5%2Bjo6Onp6erq6uvr6%2Bzs7O3t7e7u7u%2Fv7%2FDw8PHx8fLy8vPz8%2FT09PX19fb29vf39%2Fj4%2BPn5%2Bfr6%2Bvv7%2B%2Fz8%2FP39%2Ff7%2B%2Fv%2F%2F%2FywAAAAAIwAgAAAI%2FgCBCRxIsKDBgwb%2FAfvHsKHDhxAjOoSlUKLFiw8pLpTHsaPHjyBDdtT4D5vJkyhTqlx5kmS2lzBjypxJEyZJbThz6tSGaKfPn9pIchtKtCgbKquKDrW2TalSkt2iSpXKBkycMFOjEruWNStJb2DDgmWj5VSrMojEeoPlTK1akuDiygV3dNUyXq%2FKrJq7Cdfcv%2BBIhhtM%2BCgVKpR0HQ5DOBygUI0jhyNJrrJly2z6cDJzuTIVL507kyxHunTpRmUYJTJN%2BjBr1iTNyZ49mxWYQaFom%2BN2OJxu2iTRCR8%2BnBiVNruIo4tGpYw25cRJpptOnfq15s2qp%2FN1nJn26iTVyokfP37c4W7k1Z26TSs9eZLs4sufX4XK%2FPiJUmO6P59ku%2F8ABrgGGQH%2Bh4ZmaRQYIEnwNOjgg56I4qBhiClGRRgPOkhSPBx26CEvunhY1115reJhhySJxJE00HxEllloiUQSPTTWaCM64thIY1VX6WgjSfUEKeSQ6ZAzpJB1HTkkSfY06eSTUEKJSJRPkoTPlVhmqeWWXGJJUj5ghinmmGSWGSZJ%2FKSp5ppstummmiT1I%2BecdNZp551zagTLnnz26eefgPqJ0aCEBgQAOw%3D%3D";

})();
