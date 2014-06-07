// ==UserScript==
// @name          EXPERT BBCODE FRAMEWORK
// @namespace     http://userscripts.org/GetEnterpriseContent.jsp?EID=983298183&cd=china&page=EnterpriseRenderer1
// @description   Advanced Shiichan BBCode Previewer Integration Suite.
// @include       http://dis.4chan.org/read/*
// ==/UserScript==


// EXPECT THESE FEATURES IN NEXT VERSIONS:
// - Improved scalability (working on all textareas, not only in threads).



////////////////////////////////////////////////////////////////////////////////////
//////
//////
//////   )   ___      ___   __     __)  _____     _____     _       _____) _____   
//////  (__/_____)  /(,  ) (, /|  /|   (, /   )  (, /   ___/__)   /       (, /   ) 
//////    /        /    /    / | / |    _/__ /     /   (, /       )__       /__ /  
//////   /        /    /  ) /  |/  |_   /      ___/__    /      /        ) /   \_  
//////  (______) (___ /  (_/   '     ) /     (__ /      (_____ (_____)  (_/        
//////                              (_/                        )                   
//////
//////  
//////



//////
////// STAGE 1: MAKING A LIST OF TOKENS OUT OF A STRING
////// WHICH IS AQUIRED FROM SOMEWHERE (TYPICALLY INPUT TEXTFIELD).
//////

// tokenize :: String -> [String]
tokenize = function(sauce)
{
    n = 0;               // Position in sauce string.
    s = '';              // Current character.
    tok = "";            // Current token.
    list = new Array();  // List of tokens.
    tag = 0;             // True if the current token is a tag.
    code = 0;            // True if text is screened inside [code] tag.

    //// Initial preformatting.
    sauce = sauce.replace(/ (?= )/g, "&nbsp;"); // For multiple spaces, will spam &nbsp;.
    sauce = sauce.replace(/^ (?=[^ ])/gm, "&nbsp;"); // For the initial space.
    sauce = sauce.replace(/^&gt;([^\n]*)/gm, "[quote]&gt;$1[/quote]"); // Quote feature.
    sauce = sauce.replace(/\n/g, "<br />\n"); // Somewhat unique FEATURE for newlines.
    
    for (n in sauce)
        {
            s = sauce[n];
            switch (s)
                {
                case '[':
                    if (tag && !code)  // Like in [o[[u][b][i].
                        {
                            error("Unclosed tag after " + tok + " at position " + n);
                            return list;
                        }
                    else
                        {
                            if (tok != "") list.push(tok);
                            tag = 1;
                            tok = s;
                        }
                    break;
                case ']':
                    if (!tag && !code)
                        {
                            error("Tag is too closed after " + tok + " at position " + n);
                        }
                    else
                        {
                            if (tok == "[code")
                                code = 1;
                            if (tok == "[/code")
                                code = 0;
                            list.push(tok + ']');
                            tag = 0;
                            tok = "";
                        }
                    break;
                default:
                    tok += s;
                }
        }
    list.push(tok);
    return list;
};

    

    
//////
////// MAKING AN ABSTRACT SYNTAX TREE FROM A LIST OF TOKENS.
//////

//// Token type is a pair of (type, text) which :: (TokenType, String)
//// Open-close pairs cannot intersect.

//// Reliable quasi-binary tree data structure for holding the AST.
//// Has Contents, Child and a pointer to Next element.
//// Tags can have both child and next, text only next.
function Node(type, c)
{
    this.type = type;   // Should be either "text" or "tag".
    this.c = c;         // [<C>]expert[/<C>] | EXPERT if text.
    this.child = null;  // [u]<CHILD>[/u].
    this.next = null;   // [o]expert[/o]<NEXT>.
    this.parent = null; // The top node.
    this.n = 0;
};

//// N-tier iterative tree builder.
// parser :: [String] -> BinaryTree
function parse(list)
{
    n = 0;
    lev = 0;             // Level of nestedness, lev >= 0.
    code = 0;
    stack = new Array();    // Stack of bbcode tags which are in effect.
    node = new Node("text", "");
    node.parent = null;
    tree = node;
    for (i in list)
        {
            tok = list[i]; 
            if (tok[0] == "[") // [spoiler] or [/spoiler].
                {
                    if (tok[1] == "/") // [/spoiler] for sure.
                        {
                            if (code && tok == "[/code]")
                                code = 0;
                            if (lev == 0 || code)
                                {
                                    node.type = "text";
                                    node.c = tok;
                                    node.n = n++;

                                    node.next = new Node("unkn", "empty");
                                    node.next.parent = node.parent;
                                    node = node.next;  // Moving forward.
                                }
                            else if (!code)
                                {
                                    if (tok.slice(2) == stack.pop().slice(1)) // "[/" vs "[".
                                        {
                                            lev--;
                                            
                                            node = node.parent; // Moving up.
                                            node.next = new Node("unkn", "empty");
                                            node.next.parent = node.parent;
                                            node = node.next;
                                        }
                                    else
                                        {
                                            error("Open/close tags mismatch: " + tok);
                                            // Continue?  Probably yes.
                                        }
                                }
                        } // "/"
                    else   // [spoiler]
                        {
                            if (!code)
                                {
                                    if (tok == "[code]")
                                        {
                                            code = 1;
                                        }
                                    lev++;
                                    stack.push(tok);

                                    node.type = "tag";
                                    node.c = tok;
                                    node.n = n++;

                                    node.child = new Node("unkn", "empty");
                                    node.child.parent = node;
                                    node = node.child; // Moving down.
                                }
                            else
                                {
                                    node.type = "text";
                                    node.c = tok;
                                    node.n = n++;

                                    node.next = new Node("unkn", "empty");
                                    node.next.parent = node.parent;
                                    node = node.next; // Moving forward.
                                }
                        }
                } // "["
            else  // Regular text.
                {
                    node.type = "text";
                    node.c = tok;
                    node.n = n++;

                    node.next = new Node("unkn", "empty");
                    node.next.parent = node.parent;
                    node = node.next; // Moving forward.
                } // text
        } // while()
    return tree;
};





////// 
////// LAST STAGE
////// RENDER JAVASCRIPT INTO HTML
////// 

// bb :: String -> (String, String)
function bb(arg)
{
    switch (arg)
        {
        case "[sup]":
            return ["<sup>", "</sup>"];
            break;
        case "[sub]":
            return ["<sub>", "</sub>"];
            break;
        case "[u]":
            return ["<span style=\"text-decoration:underline\">", "</span>"];
            break;
        case "[o]":
            return ["<span style=\"text-decoration:overline\">", "</span>"];
            break;
        case "[s]":
            return ["<del>", "</del>"];
            break;
        case "[b]":
            return ["<b>", "</b>"];
            break;
        case "[i]":
            return ["<i>", "</i>"];
            break;
        case "[m]":
            return ["<tt>", "</tt>"];
            break;
        case "[code]":
            return ["<code class=\"prettyprint\">", "</code>"];
            break;
        case "[spoiler]":
            return ['<span style="color: rgb(0, 0, 0); background-color: rgb(0, 0, 0);"'
                    + 'class="spoiler" onmouseover="this.style.color=\'#FFF\';" '
                    + 'onmouseout="this.style.color=this.style.backgroundColor=\'#000\'">', "</span>"];
            break;
        case "[quote]":
            return ['<span class="quote">', '</span>'];
        default:
            return ["", ""];
        } // switch ()            
};

// render :: Tree -> String
function render(tree)
{
    s = "";

    if (tree == null || tree.type == "unkn")
        return "";

    // Innovative head-recursion.
    if (tree.type == "tag")
        {
            s += bb(tree.c)[0];      // Opening html tag.
            s += render(tree.child); // Down.
            s += bb(tree.c)[1];      // Closing html tag.
            s += render(tree.next);  // Forward.
        }
    else if (tree.type == "text")
        s += ( tree.c + render(tree.next) );
    return s;
};






//////
////// MISCELLANEOUS PATENTED FUNCTIONAL INNOVATIONS
//////

// map :: (a -> b) -> [a] -> [b]
function map(fn, a)
{
    b = [];
    for (i = 0; i < a.length; i++)
        b[i] = fn(a[i]);
    return b;
};

// reduce :: (a -> b -> b) -> b -> [a] -> b
function reduce(fn, init, a)
{
    b = init;
    for (i in a)
        b = fn(b, a[i]);
    return b;
};

// pass :: () -> ()
function pass()
{
    nothingOfValue = 0;
};

// error :: String -> IO ()
function error(s)
{
    document.getElementById("stderr").innerHTML += (s + "<br />");
};






////////////////////////////////////////////////////////////////////////////////////
//////  
//////      __  _______  _  ____ ________  __  ________  _______   ________
//////     /  |/  / __ \/ |/ / //_/ __/\ \/ / / ___/ _ \/ __/ _ | / __/ __/
//////    / /|_/ / /_/ /    / ,< / _/   \  / / (_ / , _/ _// __ |_\ \/ _/  
//////   /_/  /_/\____/_/|_/_/|_/___/   /_/  \___/_/|_/___/_/ |_/___/___/  
//////                                                                  
//////

function compileBBcode(event)
{
    document.getElementById("stderr").innerHTML="";
    html = render(parse(tokenize(document.getElementsByTagName("textarea")[0].value)));
    preview = document.getElementById("guido");
    preview.innerHTML = html;
};

(function() {

butanstyle = "text-decoration:underline overline; font-style:oblique; font-weight:bold;";
guidostyle = "border-style:dashed; border-width:1px;";
errorstyle = "border-style:dashed; border-width:1px; color:#ff0000;";

document.getElementsByTagName("td")[8].innerHTML += ' <input type="button" id="expertbbcode" style="'
    + butanstyle
    + '" value="COMPILE BBCODE" />';
document.getElementById("expertbbcode").addEventListener('click', compileBBcode, true);

// Solution deployment area.
forcedindent = document.createElement("div");
forcedindent.id = "guido";
forcedindent.style.border="1px dotted";
document.body.appendChild(forcedindent, document.getElementsByTagName("form")[0].firstChild);

forcedstderr = document.createElement("div");
forcedstderr.id = "stderr";
forcedstderr.style.border="1px dotted";
forcedstderr.style.color="red";
document.body.appendChild(forcedstderr, document.getElementsByTagName("form")[0].lastChild);

})()


