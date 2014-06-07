// ==UserScript==
// @name Bytes.com Code Highlighting
// @description Adds basic code highlighting to Bytes.com
// @run-at document-start
// @match http://bytes.com/*
// @match http://www.bytes.com/*
// @include http://bytes.com/*
// @include http://www.bytes.com/*
// @version 2.4.5
// ==/UserScript==

if(typeof window.bytes != 'object') {
    window.bytes = {};
}

/**
 * Bytes.com Code Highlighter.
 * Highlights the code boxes in the Bytes.com forums.
 */
window.bytes.highlighter = {

    containers : [],
		
    /**
     * Regular expression patterns used by the fetch_code and updated_container
     * methods. (The patterns used for the actual highlighting are in the patterns object.)
     */
    regexp : {
        find_spans : /(<(\/)?span([^>]*)>)/g,
        is_end_tag : /<\//,
        replace_nbsp : /&nbsp;/ig
    },

    /**
     * The patterns that should be used by the highlighter.
     */
    language : "php",

    /**
     * The default language the highlighter uses
     */
    default_language : "php",
    
    /**
     * Executes the highlighter. Makes sure "this" is set properly. 
     *  ("this" is set to the window object when called from the window.onload event.)
     */
    onload : function() {
    	window.bytes.highlighter.main.call(window.bytes.highlighter);
    },
    
    /**
     * Main entry point for the highlighter.
     */
    main : function() {
        
        var nav_container = document.getElementsByClassName('navbar_box')[0];
        if(typeof nav_container.getElementsByClassName == "function")
        {
            console.log("Found box...");
            var nav_links = nav_container.getElementsByClassName('navbar');
            if(nav_links && nav_links.length > 0)
            {
                console.log("Found element...")
                var language_link = nav_links[0].getElementsByTagName('a')[0];
                var forum_language = language_link.innerHTML;
                console.log("Language: " + forum_language);

                this.language = this.find_pattern_language(forum_language);
                
            }
        }

        this.containers = document.getElementsByClassName('codeHolder');
        for(var c = 0; c < this.containers.length; c++)
        {
            var codeContent = this.containers[c].getElementsByClassName("codeContent")[0];
            var codeHeader = this.containers[c].getElementsByClassName("codeHeader")[0];
            this.add_header_link(codeHeader, codeContent);
            this.highlight_codeContent(codeContent, this.language);

            if(this.containers[c].style.width == "500px") {
                this.containers[c].style.width = "540px"
                codeContent.style.width = "";
            }
        }
    },

    /**
     * Finds which highlighting type (language) the given language should use.
     * Most languages are grouped with a number of similar languages, so the
     * exact name of the language may not exists in the patterns array. This
     * finds the closest existing language that exists for the given language.
     */
    find_pattern_language : function(language)
    {
        // Determine which language to use.
        // TODO: Add SQL specific patterns.
        var languages = {
            //'php' : ['c', 'php', 'python', 'java', 'c sharp', 'perl', 'javascript', 'flash', 'asp.net', 'coldfusion', 'html css', 'mobile development'],
            'vb'  : ['vb', 'visual basic 4 / 5 / 6', 'visual basic .net', 'asp / active server pages', 'asp.net', 'microsoft access / vba']
            //'sql' : ['mysql', 'oracle', 'oracle', 'postgresql', 'sql server', 'db2']
        }
        for(var name in languages)
        {
            for(var i = 0; i < languages[name].length; i++)
            {
                if(languages[name][i] == language)
                {
                    return name;
                }
            }
        }
        return this.default_language;
    },

    /**
     * Adds the "Highlight/Clear Highlighting" links to the given header element.
     * @param header The "codeHeader" elment to be modified.
     * @param codeContent The "codeContent" sibling to the given "codeHeader" elemnet.
     */
    add_header_link : function(header, codeContent)
    {
        codeContent.setAttribute('is_highlighted', this.language);

        // Create the "None" button
        var none_link = document.createElement('span');
        none_link.className = 'codeLink';
        none_link.style.cssFloat = "right";
        none_link.innerHTML = "None";
        none_link.style.fontWeight = (codeContent.getAttribute('is_highlighted') == 'false' ? "bold" : "normal");
        header.appendChild(none_link);

        // Create the PHP divider button
        var divider_php = document.createElement('span');
        divider_php.className = 'codeDivider';
        divider_php.style.cssFloat = "right";
        divider_php.innerHTML = '|';
        header.appendChild(divider_php);

        // Create the "PHP" button
        var php_link = document.createElement('span');
        php_link.className = 'codeLink';
        php_link.style.cssFloat = "right";
        php_link.innerHTML = "PHP";
        php_link.style.fontWeight = (codeContent.getAttribute('is_highlighted') == 'php' ? "bold" : "normal");
        header.appendChild(php_link);

        // Create the vb divider button
        var divider_vb = document.createElement('span');
        divider_vb.className = 'codeDivider';
        divider_vb.style.cssFloat = "right";
        divider_vb.innerHTML = '|';
        header.appendChild(divider_vb);

        // Create the "VB" button
        var vb_link = document.createElement('span');
        vb_link.className = 'codeLink';
        vb_link.style.cssFloat = "right";
        vb_link.innerHTML = "VB";
        vb_link.style.fontWeight = (codeContent.getAttribute('is_highlighted') == 'vb' ? "bold" : "normal");
        header.appendChild(vb_link);

        // Add click events
        var click_callback = function(lang)
        {
            window.bytes.highlighter.clear_codeContent(codeContent);
            if(lang != 'none') {
                window.bytes.highlighter.highlight_codeContent(codeContent, lang);
            }
            vb_link.style.fontWeight = lang == 'vb' ? 'bold' : 'normal';
            php_link.style.fontWeight = lang == 'php' ? 'bold' : 'normal';
            none_link.style.fontWeight = lang == 'none' ? 'bold' : 'normal';
        }

        vb_link.addEventListener('click', function(){ click_callback('vb'); }, false);
        php_link.addEventListener('click', function(){ click_callback('php'); }, false);
        none_link.addEventListener('click', function(){ click_callback('none'); }, false);
    },

    /**
     * Highlight the given ".codeContent" element.
     */
    highlight_codeContent : function(elem, language) {
        var code = this.fetch_code(elem);
        code = this.highlight(code, language);
        this.update_container(elem, code);
    },

    /**
     * Clear highlighting from the given ".codeContent" element.
     */
    clear_codeContent : function(elem) {
        var code = this.fetch_code(elem);
        code = this.clear(code);
        this.update_container(elem, code);
    },
    
    /**
     * Fetches the code from the given container and returns it
     * as a single string.
     */
    fetch_code : function(container) {
        var code = "";
        var lines = container.getElementsByTagName('ol')[0].getElementsByTagName('li');
        var lines_count = lines.length;
        for(var l = 0; l < lines_count; l++) {
            if(lines[l].innerHTML == '&nbsp;' || lines[l].innerHTML == ' ' || lines[l].innerHTML == '') {
                code += "\n&nbsp;"; // Compensate for the lack of new-line chars in empty lines.
            }
            else {
                code += lines[l].innerHTML;
            }
        }
        // Replace HTML spaces with plain/text spaces.
        code = code.replace(this.regexp.replace_nbsp, ' ');
        
        // Bug #1 (xD) If the first and last lines are empty, remove them.
        // (Extra lines are added when the [code][/code] tags are on separate lines.)
        code = code.replace(/^ *\n{1}/i, '').replace(/\n{1} *$/i, '');
        
        return code;
    },
    
    /**
     * Updates the container using the given code.
     */
    update_container : function(elem, code) {
        var ol = elem.getElementsByTagName('ol')[0];
        var line_open_previous_span = false;
        var lines = code.split(/\n/);
        var lines_count = lines.length;
        
        var output = '';
        for(var l = 0; l < lines_count; l++) {
            var line = lines[l] + "\n";
            
            // Check if the <span>...</span> tags in the line match up.
            // If they don't, the last opened <span> needs to be opened again in the following lines, until
            // the closing </span> is reached. (spans can do not bleed over <li> elements)
            var spans = line.match(this.regexp.find_spans);
            var offset = 0;
            var last_span_open = '';
            if(spans && spans.length > 0) {
                for(var sp = 0; sp < spans.length; sp++) {
                    if(this.regexp.is_end_tag.test(spans[sp])) {
                        --offset;
                    }
                    else {
                        ++offset;
                        last_span_open = spans[sp].substring(5, spans[sp].length - 1);
                    }
                }
            }
            
            // If a span was not closed in the previous line, re-open it now.
            if(line_open_previous_span) {
                line = '<span' + line_open_previous_span + '>' + line;
            }
            
            // Complete the <span> matching routine. (The above lines needed to be done first)
            if(offset > 0) {
                line_open_previous_span = last_span_open;
            }
            else if(offset < 0) {
                line_open_previous_span = false;
            }
            
            // If a span was re-opened, but a closing span was not found in this line, close it again.
            // (It will be re-openend in the next line)
            if(line_open_previous_span && offset == 0) {
                line = line + '</span>';
            }
            output += '<li class="codeLI" style="white-space: pre;">' + line + '</li>';
        }
        ol.style.whiteSpace = 'pre';
        ol.style.fontFamily = "monospace";
        ol.innerHTML = output;
    },

    /**
     * Clears the code of any highlighting previously added by the "highlight"
     * function. (Just removes all <span> and <a> elements.)
     */
    clear : function(code)
    {
        var pattern = /<(span|a)[^>]*>/ig
        var replace = '';
        code = code.replace(pattern, replace);
        return code;
    },

    /**
     * Adds highlighting to the given code string.
     * Keywords, search-chars and replacement strings are fetched
     * from the "patterns" object.
     */
    highlight : function(code, language)
    {
        var output = "";

        if(!language || language == '' || typeof this.patterns[language] == "undefined") {
            language = this.default_language;
        }

        // Tag-injection replaces.
        var is_searching = false;
        var matched_elem = null;
        var code_length = code.length;
        for(var i = 0; i < code_length; i++)
        {
            var key = is_searching ? "end" : "start";
            var skip_current = false;
            for(var okey in this.patterns[language].chars)
            {
                // If a matched element is stored, skipp all the other elements.
                if(matched_elem != null && okey != matched_elem)
                {
                    continue;
                }
                var sub = code.substr(i, this.patterns[language].chars[okey][key]["length"]);
                if(this.patterns[language].chars[okey][key]["regexp"].test(sub))
                {
                    var inside = this.patterns[language]["chars"][okey][key]["inside"];
                    if((!is_searching && !inside) || (is_searching && inside))
                    {
                        // add sub, i += sub.length, add tag, skip adding current char.
                        output += sub;
                        i += (sub.length - 1); // -1 to compensate for the i being incremented this iteration.
                        output += this.patterns[language].tags[okey][key];
                        skip_current = true;
                    }
                    else
                    {
                        //add tag, no changes to i.
                        output += this.patterns[language].tags[okey][key];
                    }

                    // Go back one iteration if the current char is a closing
                    // tag not meant to be a part of the match.
                    // (Skip adding it this iteration so it won't double it the
                    //  repeating iteration.)
                    if(is_searching && !inside)
                    {
                        i -= 1;
                        skip_current = true;
                    }

                    matched_elem = !is_searching ? okey : null;
                    is_searching = !is_searching;

                    break;
                }
            }
            if(!skip_current)
            {
                output += code.charAt(i);
            }
        }

        // Global replaces.
        for(var glob_name in this.patterns[language].global)
        {
            output = output.replace(this.patterns[language].global[glob_name]["regexp"], this.patterns[language].global[glob_name]["replace"]);
        }

        return output;
    },

    /**
     * Patterns for highlighting various elements of the code.
     */
    patterns : {
        "php" : {
            global : {
                "keywords" : { // TODO: Move the Python keywords into a Python pattern.
                    "regexp" : /(?![^<]*\<\/span\>)\b(my|raise|def|self|try|catch|table|Not|Null|Auto_Increment|VarChar|Date|Time|Text|DateTime|Blob|Primary|Key|Foreign|Index|void|int|short|char|string|extern|unsigned|typedef|struct|float|double|echo|print|false|true|and|or|xor|__file__|__line__|array|as|break|case|cfunction|class|const|continue|declare|default|die|do|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|extends|for|foreach|function|include|include_once|global|if|new|old_function|return|static|switch|use|require|require_once|var|while|__function__|__class__|__method__|abstract|interface|public|implements|private|protected|throw|alias|boolean|byte|decimal|dim|double|each|end|enum|finally|get|gosub|inherits|integer|long|module|mod|me|next|nothing|redim|shared|structure|sub|exit|goto|typeof|when|select|create|insert|into|update|delete|truncate|grant|order|group|by|limit|from|where)\b/ig,
                    "replace" : "<span style=\"color: #008800;\">$1</span>"
                }
            },
            tags : {
                "variable1" : {
                    "start" : '<span style="color: #0000ff;">',
                    "end"   : '</span>'
                },
                "function1" : {
                    "start" : '<span style="color: #000000; font-weight: bold;">',
                    "end"   : '</span>'
                },
                "class1" : {
                    "start" : '<span style="color: #004488;">',
                    "end"   : '</span>'
                },
                "method1" : {
                    "start" : '<span style="color: #004488;">',
                    "end"   : '</span>'
                },
                "method2" : {
                    "start" : '<span style="color: #000088; font-weight: bold; font-style: oblique;">',
                    "end"   : '</span>'
                },
                "method3" : {
                    "start" : '<span style="color: #004488;">',
                    "end"   : '</span>'
                },
                "string1" : {
                    "start" : '<span style="color: #ff0000;">',
                    "end"   : '</span>'
                },
                "string2" : {
                    "start" : '<span style="color: #ff0000;">',
                    "end"   : '</span>'
                },
                "comment1" : {
                    "start" : '<span style="color: #ff8800;">',
                    "end"   : '</span>'
                },
                "comment2" : {
                    "start" : '<span style="color: #ff8800;">',
                    "end"   : '</span>'
                },
                "comment3" : {
                    "start" : '<span style="color: #ff8800;">',
                    "end"   : '</span>'
                }

            },
            chars : {
                'variable1' : {
                    "start" : {
                        "regexp" : /\$[\w\d_]/i,
                        "length" : 2,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/i,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'function1' : {
                    "start" : {
                        "regexp" : /function /i,
                        "length" : 9,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/\(/i,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'class1' : {
                    "start" : {
                        "regexp" : /new /i,
                        "length" : 4,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/i,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'method1' : {
                    "start" : {
                        "regexp" : /&gt;/,
                        "length" : 4,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'method2' : {
                    "start" : {
                        "regexp" : /::/,
                        "length" : 2,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'method3' : { // TODO: Move this into a C/JavaScript/C# pattern
                    "start" : {
                        "regexp" : /\./,
                        "length" : 1,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'string1' : {
                    "start" : {
                        "regexp" : /"/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/"/,
                        "length" : 1,
                        "inside" : true
                    }
                },
                'string2' : {
                    "start" : {
                        "regexp" : /'/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/'/,
                        "length" : 1,
                        "inside" : true
                    }
                },
                'comment1' : {
                    "start" : {
                        "regexp" : /\/\//,
                        "length" : 2,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/\n/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'comment2' : {
                    "start" : {
                        "regexp" : /#/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/\n/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'comment3' : {
                    "start" : {
                        "regexp" : /\/\*/,
                        "length" : 2,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/\*\//,
                        "length" : 2,
                        "inside" : true
                    }
                }
            }
        },
        "vb" : {
            global : {
                "keywords" : {
                    "regexp" : /(?![^<]*\<\/span\>)\b(AddHandler|AddressOf|Alias|And|AndAlso|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|CBool|CByte|CChar|CDate|CDec|CDbl|Char|CInt|Class|CLng|CObj|Const|Continue|CSByte|CShort|CSng|CStr|CType|CUInt|CULng|CUShort|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else|ElseIf|End|EndIf|Enum|Erase|Error|Event|Exit|False|Finally|For|Friend|Function|Get|GetType|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|MustInherit|MustOverride|MyBase|MyClass|Namespace|Narrowing|New|Next|Not|Nothing|NotInheritable|NotOverridable|Object|Of|On|Operator|Option|Optional|Or|OrElse|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|REM|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|Short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|True|Try|TryCast|TypeOf|Variant|Wend|UInteger|ULong|UShort|Using|When|While|Widening|With|WithEvents|WriteOnly|Xor|#Const|#Else|#ElseIf|#End|#If)\b/ig,
                    "replace" : "<span style=\"color: #0000ff;\">$1</span>"
                }
            },
            tags : {
                'sub1' : {
                    'start' : '<span style="color: #004488; font-weight: bold;">',
                    'end'   : '</span>'
                },
                'sub2' : {
                    'start' : '<span style="color: #004488; font-weight: bold;">',
                    'end'   : '</span>'
                },
                "method1" : {
                    "start" : '<span style="color: #004488;">',
                    "end"   : '</span>'
                },
                'comment1' : {
                    'start' : '<span style="color: #00aa00;">',
                    'end'   : '</span>'
                },
                "string1" : {
                    "start" : '<span style="color: #ff0000;">',
                    "end"   : '</span>'
                },
                "string2" : {
                    "start" : '<span style="color: #ff0000;">',
                    "end"   : '</span>'
                }
            },
            chars : {
                'sub1' : {
                    'start' : {
                        'regexp' : /Private Sub /i,
                        'length' : 12,
                        'inside' : false
                    },
                    "end" : {
                        "regexp" :/\(/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'sub2' : {
                    'start' : {
                        'regexp' : /Public Sub /i,
                        'length' : 11,
                        'inside' : false
                    },
                    "end" : {
                        "regexp" :/\(/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'method1' : {
                    "start" : {
                        "regexp" : /\./,
                        "length" : 1,
                        "inside" : false
                    },
                    "end" : {
                        "regexp" :/[^\w\d_]/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'comment1' : {
                    "start" : {
                        "regexp" : /\'/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/\n/,
                        "length" : 1,
                        "inside" : false
                    }
                },
                'string1' : {
                    "start" : {
                        "regexp" : /"/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/"/,
                        "length" : 1,
                        "inside" : true
                    }
                },
                'string2' : {
                    "start" : {
                        "regexp" : /'/,
                        "length" : 1,
                        "inside" : true
                    },
                    "end" : {
                        "regexp" :/'/,
                        "length" : 1,
                        "inside" : true
                    }
                }
            }
        }
    }
};
window.bytes.highlighter.onload();

