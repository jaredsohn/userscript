// ==UserScript==
// @name           Wiki Log
// @namespace      kol.interface.unfinished
// @description    Intepretes your KOL quest log as HTML with wiki markup codes and templates.
// @include        http://*kingdomofloathing.com/questlog.php?which=4*
// @include        http://127.0.0.1:*/questlog.php?which=4*
// ==/UserScript==

// version 11.0
//  A top-down parser for a subset of wiki markup codes, allowing for 
//   mostly cut-and-paste replication of wiki content.  A new syntax is added 
//   to allow template definitions, which enables template support.  Full 
//   details are way too long to be contained here; see forum posts and/or
//     http://www.snoopycat.ca/kolimages/wikilogdoc.html
//
// Notice:
// Parser code developed and copyright 2009 Clark Verbrugge.
// This work may be freely copied and used in whole or part as
// long as the above attribution is included.

// utility function to find pwdhash so it can be inserted in URLs
// if requested.
function findPwdhash() {
    var somef=window.parent.frames;
    var goo = null;
    for(var j=0;j<somef.length;j++) {
        if (somef[j].name=="charpane") {
            goo=somef[j];
            var page = goo.document.documentElement.innerHTML;
            var find = 'pwdhash = ';
            if (page.indexOf(find) >= 0) {
                var i = page.indexOf(find);
                var j = find.length;
                var ps = page.substr(i+j+2);
                var foundit = page.substr(i+j+1,ps.indexOf('"')+1);
                return foundit;
            }
        }
    }
    return null;
}

// main entry function; finds the text, calls the parser, and
// inserts the resulting html
function insertHTML() {
    var listing = document.getElementsByTagName('form');
    for (var i=0;i<listing.length;i++) {
        var x = listing[i];
        if (x.getAttribute('action')=='questlog.php?which=4') {
            var z = document.createElement('div');
            var ta = document.getElementsByTagName('textarea')[0];
            if (ta) {
                var v = ta.innerHTML.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
                // have our incoming text, now pass it to the parser
                // grab pwdhash; it will be stored and made available as a template expansion
                var localpwdhash = findPwdhash();
                v = parseOuter(v,localpwdhash);
                z.innerHTML=v;
                x.parentNode.insertBefore(z,x);
            } 
        }
    }
}

// ------------------ start of parser code 
// raw input string
var inValue;
// index into raw input string
var inPtr;
// current character
var nextChar;
// previous character
var prevChar;
// a hack to simplify parsing complexity
var lastBraces;
// current token
var nextToken;
// token values
var NORMAL="NORMAL";
var URLSTART="URLSTART";      // [[
var URLEND="URLEND";          // ]]
var EURLEND="EURLEND";         // ]
var EURLSTART="EURLSTART";     // [
var PIPE="PIPE";              // |
var CPIPE="CPIPE";            // | at the beginning of a line
var PIPE2="PIPE2";            // ||
var TABLESTART="TABLESTART";  // {|
var TABLEEND="TABLEEND";      // |}
var TABLEROW="TABLEROW";      // |-
var BANG="BANG";              // !
var BANG2="BANG2";            // !!
var BOLD="BOLD";              // '''
var ITALS="ITALS";            // ''
var H2="H2";                  // ==
var H3="H3";                  // ===
var H4="H4";                  // ====
var HR="HR";                  // ----
var LINEFORMAT="LINEFORMAT";  // *:#; at the beginning of a line 
var PRE="PRE";                // space at the beginning of a line 
var TEMPLATEDEFSTART="TEMPLATEDEFSTART";      // {:
var TEMPLATEDEFEND="TEMPLATEDEFEND";          // :}
var TEMPLATESTART="TEMPLATESTART";            // {{
var TEMPLATEEND="TEMPLATEEND";                // }}
var TEMPLATEARGSTART="TEMPLATEARGSTART";      // {{{
var TEMPLATEARGEND="TEMPLATEARGEND";          // }}}
var TABLEROW="TABLEROW";      // |-
var NL="NL";                  // \n or \n\n

// constant used for main token set
var outerTokensFirst={URLSTART:true,EURLSTART:true,TABLESTART:true,BOLD:true,ITALS:true,H2:true,H3:true,H4:true,HR:true,LINEFORMAT:true,PRE:true,NL:true,TEMPLATEDEFSTART:true,TEMPLATEARGSTART:true,TEMPLATESTART:true};
var outerTokensNext={URLSTART:true,EURLSTART:true,TABLESTART:true,BOLD:true,ITALS:true,NL:true,TEMPLATEDEFSTART:true,TEMPLATEARGSTART:true,TEMPLATESTART:true};

var templates = {} ;          // associative array for templates (name->code)

function parseOuter(v,localpwdhash) {
    var delims={};
    templates = {};
    if (localpwdhash) {
        templates['#pwdhash']=localpwdhash;
    }
    resetLex();
    inValue = v;
    var outtext=parseP(delims,outerTokensFirst,outerTokensNext);
    return outtext;
}

// to clone the tokens object
function cloneTokens(tokens) {
    var newt={};
    for (var t in tokens) {
        if (tokens[t])
            newt[t]=true;
    }
    return newt;
}

// parses a template definition
function parseTemplateDef(delims,outerTokens) {
    var tn = lexTemplateIdentifier(TEMPLATEDEFEND); // extract the template identifier
    // now at template def end, or code separator
    var tc='';
    if (nextToken==PIPE) {
        var tokens = {PIPE:true,TEMPLATEDEFEND:true};
        lex(tokens); // move past pipe
        tc = lexTemplateCode();
    }
    templates[tn]=tc;
    lex(outerTokens); // move past delimiter
    while (nextToken==NL && !delims[NL]) { // and discard subsequent NLs
        lex(outerTokens);
    }
    //alert('storing '+tn+' as "'+templates[tn]+'", and nexttoken is '+nextToken);
    return ''; // returns no text to insert
}


// extract a template identifier name
function lexTemplateIdentifier(term1) {
    var id='';
    var tokens={PIPE:true};
    tokens[term1] = true;
    lex(tokens); // move past start of template
    skipWS(tokens);// can't begin with whitespace
    while (nextToken!=PIPE && nextToken!=term1) {
        id += nextChar;
        lex(tokens);
    }
    // no trailing WS either
    id = id.replace(/ *$/,'');
    if (!id.match(/[a-zA-Z_0-9_ #:-]/))
        throw new Error('Malformed template definition name: '+id);
    return id;
}

function lexTemplateCode() {
    var tokens = {TEMPLATEDEFEND:true};
    var tc='';
    while (nextToken!=TEMPLATEDEFEND) {
        tc += nextChar;
        if (!lex(tokens))
            break;
    }
    return tc;
}

// parses an actual template, performing actual expansion.
// this may include recursive parsing.
function parseTemplate(delims) {
    var oldprevChar = prevChar; // record old previous char
    var ts = inPtr-2; // record entry point for later rewinding
    var tn = parseTemplateIdentifier(); // get template name
    var args;
    var tc;           // actual code to insert
    if (tn=='#expr') {
        args = parseTemplateArgs(false);  // and parse any arguments
        tc = expandExpr(args[1]);
    } else if (tn=='#if') {
        // if is special; we cannot evaluate all the arguments
        // until we know the result of the first
        tc=expandIf();
    } else if (tn=='#ifeq') {
        // ifeq is special; we cannot evaluate all the arguments
        // until we know the result of the first two
        tc=expandIfeq();
    } else if (tn=='#switch') {
        // switch is special; we cannot evaluate all the arguments
        // until we know the result of the first 
        tc=expandSwitch();
    } else if (tn=='#lc') {
        // lowercase argument
        args = parseTemplateArgs(true);
        if (args[1])
            tc = args[1].toLowerCase();
        else 
            tc = '';
    } else if (tn=='#uc') {
        // lowercase argument
        args = parseTemplateArgs(true);
        if (args[1])
            tc = args[1].toUpperCase();
        else 
            tc = '';
    } else {          // user template invocation
        args = parseTemplateArgs(true);  // and parse any arguments
        tc = templates[tn];
        if (!tc) // missing template throw new Error('Missing template: '+tn);
            tc = '<font color="red" title="No template definition for '+tn.replace(/\"/g,'%22')+'">'+tn+'</font>';
        else {
            tc = substitute(tc,args);
            tc = evalTemplateBody(tc); // evaluate
        }
    }
    //alert('Expanded('+tn+') to "'+tc+'"');

    // idea: insert template body, args-substituted, in place
    //       of the template call, and let parsing continue
    //       from our current spot.
    prevChar='';
    nextChar=oldprevChar;
    inValue = inValue.substr(0,ts)+tc+inValue.substr(inPtr);
    if (inValue.length>100000) { // sanity check
        inPtr=inValue.substr(0,ts).length+tc.length;
        return '**Infinite recursion?**';
    } else {
        inPtr=ts;
    }
    return ''; // nothing to add to current output
}

// parse the body for arguments and substitute accordingly
function substitute(body,args) {
    var tokens={TEMPLATEARGSTART:true};
    var b = '';
    var s = saveLex();
    resetLex();
    inValue = body;
    do {
        // get next chunk of text; recursively parsing templates
        b += parseP(tokens,tokens,tokens);
        // expand template arguments
        if (nextToken!='') { // arg
            var adelim={TEMPLATEARGEND:true};
            // parse argument name
            var a = parseP(adelim,adelim,adelim);
            var deflt = a;
            if (a.match(/\|$/)) {
                deflt = '';
                a = a.substr(0,a.length-1);
            } 
            b += (args[a]!=undefined) ? args[a] : deflt;
        }
    } while(nextToken!='');
    restoreLex(s);
    return b;
}

function evalTemplateBody(body) {
    var tokens={TEMPLATESTART:true}
    var delims={}
    var s = saveLex();
    resetLex();
    inValue = body;
    var b = parseP(delims,tokens,tokens);
    restoreLex(s);
    return b;
}

// parse the template identifier name
function parseTemplateIdentifier() {
    var tokens={PIPE:true,TEMPLATESTART:true,TEMPLATEEND:true};
    var delims={PIPE:true,TEMPLATEEND:true};
    var id = parseP(delims,tokens,tokens);
    return trim(id);
}

// | x=text followed by end of template or a bar
function parseTemplateArgs(assigs,maxa) {
    var tokens = cloneTokens(outerTokensNext); //{PIPE:true,TEMPLATESTART:true,TEMPLATEDEFSTART:true,TEMPLATEARGSTART:true,TEMPLATEEND:true};
    var delims = {PIPE:true,TEMPLATEEND:true};
    var argc = 1;
    var args = {};
    var count = 0;
    while(nextToken==PIPE) {
        count++;
        if (maxa && count>maxa)
            break;
        var v = parseP(delims,tokens,tokens);
        if (v.match(/^\s*[a-zA-Z_0-9_#:-][a-zA-Z_0-9_#: -]*$/)) {
            args[argc++]=trim(v);
            //alert('plain argument: '+v);
        } else if (assigs && v.match(/^\s*[a-zA-Z_0-9_#:-][a-zA-Z_0-9_#: -]*=/)) {
            var vname = trim(v.substr(0,v.indexOf('=')));
            var vvalue = v.substr(v.indexOf('=')+1);
            args[vname]=vvalue;
            //alert('assign argument: '+v.substr(0,v.indexOf('='))+'='+v.substr(v.indexOf('=')+1));
        } else {
            args[argc++]=v;
            //alert('index argument: '+v);
        }
    }
    return args;
}

// skip a single template argument. assumes at a pipe symbol
function skipTemplateArg() {
    var tokens=cloneTokens(outerTokensNext);
    tokens[TEMPLATEEND]=true;
    tokens[URLEND]=true;
    tokens[EURLEND]=true;
    tokens[TEMPLATEARGEND]=true;
    tokens[NL]=false;
    tokens[PIPE]=true;
    var depth=0;
    do {
        if (!lex(tokens))
            break;
        if (nextToken==TEMPLATESTART || nextToken==URLSTART || nextToken==EURLSTART || nextToken==TEMPLATEARGSTART)
            depth++;
        else if (nextToken==TEMPLATEEND || nextToken==URLEND || nextToken==EURLEND || nextToken==TEMPLATEARGEND)
            depth--;
        if (depth<0)
            break;
    } while(depth>0 || nextToken!=PIPE);
}

// special expansion of {{#if|c|x|y}}
// recursively parses c and returns (!c || c=='false') ? x : y
function expandIf() {
    var ceval = parseTemplateArgs(false,1)[1];
    var tc = '';

    if (!ceval || ceval=='false') {
        if (nextToken==PIPE) {
            skipTemplateArg();
            if (nextToken==PIPE) {
                var args = parseTemplateArgs(false);
                tc = args[1];
            } else
                tc = '';
        } else
            tc = '';
    } else {
        if (nextToken==PIPE) {
            var args = parseTemplateArgs(false,1);
            if (nextToken==PIPE) {
                skipTemplateArg();
            }
            tc = args[1];
        } else
            tc = '';
    }
    return tc;
}

// special expansion of {{#ifeq|a|b|x|y}}
// recursively parses a and b and returns ((a==b)) ? x : y
function expandIfeq() {
    var argsab = parseTemplateArgs(false,2);
    var tc = '';

    if (argsab[1]!=argsab[2]) {
        if (nextToken==PIPE) {
            skipTemplateArg();
            if (nextToken==PIPE) {
                var args = parseTemplateArgs(false);
                tc = args[1];
            } else
                tc = '';
        } else
            tc = '';
    } else {
        if (nextToken==PIPE) {
            var args = parseTemplateArgs(false,1);
            if (nextToken==PIPE) {
                skipTemplateArg();
            }
            tc = args[1];
        } else
            tc = '';
    }
    return tc;
}

// special expansion of {{#switch|a|r=s|t=u|..}}
// parses a and then returns whichever of the switch arguments it
// matches
function expandSwitch() {
    var ceval = parseTemplateArgs(false,1)[1];
    var tokens={PIPE:true,TEMPLATESTART:true,TEMPLATEEND:true};
    var tc = '';
    ceval = trim(ceval);
    var r=new RegExp('^[\\s]*'+ceval+'=','');
    while (nextToken==PIPE) {
        if (inValue.substr(inPtr).match(r)) {
            // found the match
            var args = parseTemplateArgs(true,1);
            tc = args[ceval];
            while (nextToken==PIPE)
                skipTemplateArg();
        } else {
            // no match
            skipTemplateArg();
        }
    }
    return tc;
}

// special expansion of {{#expr|x}}
// recursively parses x until it turns into a ground expression,
// and then evaluates it as a numeric or logical expression
// returning the final result.  If it does not reduce entirely
// to numbers and arithmetic operators an error occurs.
// Note: minimal error checking here, and given the use of eval
// this is a big 'security hole' if we cared.
function expandExpr(expr) {
    var ground = evalTemplateBody(expr);
    if (!ground.match(/[ 0-9.+*/=!<>]/)) {
        ground='';
        //throw new Error('Invalid #expr: "'+args[1]+'" reduces to non-arithmetic: "'+ground+'"');
    }
    //alert('evaluating '+x);
    var e=eval(ground);
    return e;
}


// urls and image tags [[..]], converting them into real hrefs and img tags.
// nb: content must be at least one character long.
function parseURL(delims) {
    var tokens = {URLEND:true,PIPE:true,TEMPLATESTART:true,TEMPLATEARGSTART:true};
    var delims = {URLEND:true,PIPE:true};

    // extract url itself, up to first pipe
    var u = parseP(delims,tokens,tokens);
    u = u.replace(/^\s*/,'').replace(/\s*$/,''); // and ignore leading/trailing spaces
    var udisplay = u; // displayed text within url

    // now see what kind of url we have

    if (!u.match(/^image:/i)) {
        // URLS
        if (u.match(/^wikipedia:/i)) {
            // wikipedia links
            u = u.substr(10);
            udisplay = u;
            u = 'http://en.wikipedia.org/wiki/'+u.replace(/\s/g,'_');
        } else {
            // translate into kolwiki url
            u = 'http://kol.coldfront.net/thekolwiki/index.php/'+u.replace(/\s/g,'_');
        }

        // create actual url tag; nb make sure quotes are escaped
        // probably should do full escaping
        // target used to ensure link opens in another window
        u = '<a href="'+u.replace(/\"/g,'%22')+'" target="_blank">';

        // see if there's a display argument, and if so use that rather than udisplay
        if (nextToken==PIPE) {
            delims[PIPE] = false; // don't stop until the url ends
            udisplay = parseP(delims,outerTokensNext,outerTokensNext);
        }
        u += udisplay+'</a>';
        return u;
    }
    // an image
    u = u.substr(6);
    // translate into kol image
    // and extract base name for the title
    udisplay = u.replace(/^([^/]*\/)*/,'').replace(/\..*$/,'');
    u = 'http://images.kingdomofloathing.com/'+u;

    u = '<img src="'+u.replace(/\"/g,'%22')+'"';

    // an image can have up to 2 args, a title, and a width
    // in either order.  To distinguish them the last one with
    // a numeric start is used.
    // in both cases this is simple text with no formatting
    // so a pipe or urlend is necessary to end, but no
    // actual error checking is done here.
    var args=new Array(2);
    args[0] = (nextToken==PIPE) ? parseP(delims,tokens,tokens) : '';
    args[1] = (nextToken==PIPE) ? parseP(delims,tokens,tokens) : '';
    if (args[1]!='') {
        if (args[1].match(/^[0-9]/)) {
            u += ' title="'+args[0].replace(/\"/g,'%22')+'"';
            u += ' width="'+args[1].replace(/\"/g,'%22')+'"';
        } else {
            u += ' title="'+args[1].replace(/\"/g,'%22')+'"';
            u += ' width="'+args[0].replace(/\"/g,'%22')+'"';
        }
    } else if (args[0]!='') {
        if (args[0].match(/^[0-9]/)) {
            u += ' width="'+args[0].replace(/\"/g,'%22')+'"';
        } else {
            u += ' title="'+args[0].replace(/\"/g,'%22')+'"';
        }
    }

    u += '">';
    return u;
}

// external urls and image tags [..], converting them into real hrefs and img tags.
// nb: content must be at least one character long.
function parseEURL(delims) {
    var tokens = {EURLEND:true,PIPE:true,TEMPLATESTART:true,TEMPLATEARGSTART:true};
    var delims = {EURLEND:true,PIPE:true};

    // extract url itself, up to first pipe
    var u = parseP(delims,tokens,tokens);
    u = u.replace(/^\s*/,'').replace(/\s*$/,''); // and ignore leading/trailing spaces
    var udisplay = u; // displayed text within url

    // now see what kind of url we have

    if (!u.match(/^image:/i)) {
        // URLS
        // create actual url tag; nb make sure quotes are escaped
        // probably should do full escaping
        // target used to ensure link opens in another window
        //u = '<a href="'+u.replace(/\"/g,'%22')+'" target="_blank">';
        u = '<a href="'+u.replace(/\"/g,'%22')+'">';

        // see if there's a display argument, and if so use that rather than udisplay
        if (nextToken==PIPE) {
            delims[PIPE] = false; // don't stop until the url ends
            udisplay = parseP(delims,outerTokensNext,outerTokensNext);
        }
        u += udisplay+'</a>';
        return u;
    }
    // an image
    u = u.substr(6);
    u = '<img src="'+u.replace(/\"/g,'%22')+'"';

    // an image can have up to 2 args, a title, and a width
    // in either order.  To distinguish them the last one with
    // a numeric start is used.
    // in both cases this is simple text with no formatting
    // so a pipe or urlend is necessary to end, but no
    // actual error checking is done here.
    var args=new Array(2);
    args[0] = (nextToken==PIPE) ? parseP(delims,tokens,tokens) : u;
    args[1] = (nextToken==PIPE) ? parseP(delims,tokens,tokens) : '';
    if (args[1]!='') {
        if (args[1].match(/^[0-9]/)) {
            u += ' title="'+args[0].replace(/\"/g,'%22')+'"';
            u += ' width="'+args[1].replace(/\"/g,'%22')+'"';
        } else {
            u += ' title="'+args[1].replace(/\"/g,'%22')+'"';
            u += ' width="'+args[0].replace(/\"/g,'%22')+'"';
        }
    } else if (args[0]!='') {
        if (args[0].match(/^[0-9]/)) {
            u += ' width="'+args[0].replace(/\"/g,'%22')+'"';
        } else {
            u += ' title="'+args[0].replace(/\"/g,'%22')+'"';
        }
    }

    u += '">';
    return u;
}

// parse a table definition
function parseTable(delims) {
    var t='<table ';
    // get table args until we get to either a header or a row or end of table
    var tokens={URLSTART:true,EURLSTART:true,TEMPLATESTART:true,TEMPLATEARGSTART:true};
    var argdelims={TABLEROW:true,TABLEEND:true,BANG:true,PIPE:true};
    // args really are x=y or x="y", but no error checking
    t += trim(parseP(argdelims,tokens,tokens)) + '>';

    // handle cells before the first row
    // since the pipe may be on the same line, search for pipes rather than cpipes
    if (nextToken==BANG || nextToken==PIPE) {
        t += '<tr>';
        do {
            if (nextToken==BANG) {
                t += parseTableCellLine('th');
            } else if (nextToken==PIPE || nextToken==CPIPE) {
                t += parseTableCellLine('td');
            }
        } while (nextToken==BANG || nextToken==PIPE || nextToken==CPIPE);
        t += '</tr>';
    }

    while (nextToken==TABLEROW) {
        // do headers until we get a real row or end of table
        t += parseTableRow();
    }
    t += '</table>';
    return t;
}

// parses the current row assuming at a new row symbol.
function parseTableRow() {
    var tokens={URLSTART:true,EURLSTART:true,TEMPLATESTART:true,TEMPLATEARGSTART:true};
    var argdelims={TABLEROW:true,TABLEEND:true,BANG:true,PIPE:true};

    var t = '<tr '+trim(parseP(argdelims,tokens,tokens))+'>';
    while (nextToken==BANG || nextToken==PIPE || nextToken==CPIPE) {
        if (nextToken==BANG) {
            t += parseTableCellLine('th');
        } else if (nextToken==PIPE || nextToken==CPIPE) {
            t += parseTableCellLine('td');
        }
    }
    return t+'</tr>';
}

// parses a cell line, assuming currently at the cell start symbol (! or |)
//   (<args> |)? <cell> (<celldiv> (<args> |)? <cell>)*
// leaves the pointer at a CPIPE, TABLEROW, or TABLEEND
// elt is one of 'th' or 'td'.
function parseTableCellLine(elt) {
    var th = '';
    var argdelims = {TABLEROW:true,TABLEEND:true,PIPE:true,CPIPE:true,BANG:true,BANG2:true,PIPE2:true};
    var celldelims = {TABLEROW:true,TABLEEND:true,CPIPE:true,BANG:true,BANG2:true,PIPE2:true};
    var celltokensFirst = cloneTokens(outerTokensFirst);
    celltokensFirst[PRE] = false; // don't recognize leading spaces

    do {
        th += '<'+elt;
        var s = trimHTML(parseP(argdelims,celltokensFirst,outerTokensNext));
        // if we stopped at a pipe then we parsed arguments,
        // otherwise we parsed an entire cell content
        // and are at the table/row end or one of the
        // next cell markers
        if (nextToken==PIPE) {
            th += ' ' + trim(s);
            // the cell itself is then everything up to
            // either a celldiv on the same line, or a
            // pipe on a new line
            s = trimHTML(parseP(celldelims,celltokensFirst,outerTokensNext));
        }
        // finish constructing cell
        th += '>'+s+'</'+elt+'>';

        // and keep parsing cells while we're still hitting
        // celldivs
    } while (nextToken==BANG2 || nextToken==PIPE2);

    return th;
}

// parses an H? heading definition
function parseH(delims,h,hcode,outerTokens) {
    var myoutertokens = cloneTokens(outerTokens); 
    myoutertokens[NL]=true; // just in case
    var tokens = cloneTokens(outerTokensNext); // what we allow inside a heading; basically urls, bold/itals and templates
    tokens[h]=true; // need to recognize our terminator
    tokens[TABLESTART]=false; // no tables though
    var mydelims = {NL:true}; // no newlines
    mydelims[h]=true;         // and stop at the next heading delimiter

    // parse the text inside
    var heading=parseP(mydelims,tokens,tokens);
    // should leave us at our delimiter
    if (nextToken==NL)
        throw new Error("May not have a newline in heading");
    lex(myoutertokens); // move past delimiter
    while (nextToken==NL && !delims[NL]) { // and discard subsequent NLs
        lex(myoutertokens);
    }
    return '<'+hcode+'>'+heading+'</'+hcode+'>';
}

// parses a lineformat code. consumes its terminator code
function parseLineformat(delims,outerTokens) {
    var mytokens = cloneTokens(outerTokensNext); 
    var mytokensFirst = cloneTokens(outerTokens); 
    mytokensFirst[LINEFORMAT]=true;
    var mydelims = {NL:true};
    var myformat = nextChar.replace(/\s/g,''); // extract format code
    var list = buildFormatcode(myformat);

    do {
        list += parseP(mydelims,mytokens,mytokens);
        if (nextToken==NL) {
            lex(mytokensFirst);
        }
        var nextformat = (nextToken==LINEFORMAT) ? nextChar.replace(/\s/g,'') : '';
        list += nextFormatcode(myformat,nextformat);
        myformat = nextformat;
    } while(nextToken==LINEFORMAT);
    if (nextToken==NL && !delims[NL]) {
        lex(mytokensFirst);
    }
    return list;
}

// parses a pre code. consumes its terminator code
function parsePre(delims,outerTokens) {
    var mytokens = cloneTokens(outerTokensNext); 
    var mytokensFirst = cloneTokens(outerTokens); 
    mytokensFirst[PRE]=true;
    var mydelims = {NL:true};
    var s = '<pre>';

    do {
        s += parseP(mydelims,mytokens,mytokens);
        if (nextToken==NL) {
            lex(mytokensFirst);
        }
        if (nextToken==PRE)
            s += '\n';
    } while(nextToken==PRE);
    if (nextToken==NL && !delims[NL]) {
        lex(mytokensFirst);
    }
    s += '</pre>';
    return s;
}

// returns the opening code corresponding to the given
// line format
function buildFormatcode(format) {
    return format.replace(/:/g,'<dl><dd>').replace(/\*/g,'<ul><li>').replace(/#/g,'<ol><li>').replace(/;/g,'<dl><dt>');
}

// returns the difference in html between the old
// and new formats
function nextFormatcode(oldformat,newformat) {
    // find longest match between newformat and oldformat; 
    // this part doesn't need to be changed
    var i = 0;
    var lastf;
    for (;i<oldformat.length && i<newformat.length;i++) {
        if (oldformat.charAt(i)!=newformat.charAt(i))
            break;
        lastf = oldformat.charAt(i);
    }
    oldformat = oldformat.substr(i);
    newformat = newformat.substr(i);
    var code = '';
    var outcodes = {'*':'</ul>',':':'</dl>','#':'</ol>',';':'</dl>'};
    var incodes = {'*':'<li>',':':'<dd>','#':'<li>',';':'<dt>'};
    for (i=oldformat.length-1;i>=0;i--) {
        code += outcodes[oldformat.charAt(i)];
    }
    if (lastf && newformat.length==0)
        code += incodes[lastf];

    return code+buildFormatcode(newformat);
}


// parse paragraphs of text starting from the current character
function parseP(delims,tokensFirst,tokensNext) {
    var mytokensFirst = cloneTokens(tokensFirst); // outerTokensFirst
    var mytokensNext = cloneTokens(tokensNext);  // outerTokensNext
    for (var d in delims) { // add in delims
        mytokensFirst[d]=true;
        mytokensNext[d]=true;
    }
    var s = '';

    if (!lex(mytokensFirst))
        return '';
    var state = 0;
    var foundToken = (delims[nextToken]) ? '' : nextToken;
    do {
        var t = '';
        // gather text on current line

        do {
            while (nextToken==NORMAL) {
                t += nextChar;
                if (!lex(mytokensNext))
                    break;
            }
            foundToken = (delims[nextToken]) ? '' : nextToken;
            if (foundToken!='' && foundToken!=NL && mytokensNext[nextToken]) {
                // not at the end, found a table or template or something
                // so recursively parse it
                //branch and parse appropriately
                t += parseNonP(delims,((t=='') ? mytokensFirst : mytokensNext),mytokensNext);
                foundToken = (delims[nextToken]) ? '' : nextToken;
            }
        } while (foundToken!='' && foundToken!=NL && (nextToken==NORMAL || mytokensNext[nextToken]));
        // until at a NL (or a delimiter or EOF or line formatting code)

        // a delim is like an eof
        foundToken = (delims[nextToken]) ? '' : nextToken;
            
        // t is the entire line to be processed
        // if it starts with a line format, or heading marker, then
        // process it accordingly
        if (foundToken==LINEFORMAT) {
            // line format
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += parseLineformat(delims,mytokensFirst);
        } else if (foundToken==HR) {
            // hr
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += '<hr />';
            lex(mytokensFirst);
            while (nextToken==NL && !delims[NL]) { // and discard subsequent NLs
                lex(mytokensFirst);
            }
        } else if (foundToken==H4) {
            // h4
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += parseH(delims,H4,'h4',mytokensFirst);
        } else if (foundToken==H3) {
            // h3
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += parseH(delims,H3,'h3',mytokensFirst);
        } else if (foundToken==H2) {
            // h2
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += parseH(delims,H2,'h2',mytokensFirst);
        } else if (foundToken==PRE) {
            // pre
            if (state==1) { // close off any prior paragraphs
                s += '</p>';
                state = 0;
            }
            s += parsePre(delims,mytokensFirst);
        } else {
            // the path of regular text; construct paragraphs
            // we should only get here if the token is currently NL or EOF or a delimiter
            if (t.length==0 || t.match(/^[\s]*$/)) { // empty string
                if (state==0) {
                    if (foundToken!=NL) { // eof or delimiter
                        break; // nothing to add
                    }
                    s += '<p><br />\n';
                    state = 1;
                } else {
                    s += '</p>';
                    state = 0;
                    if (foundToken!=NL) {
                        break;
                    }
                }
            } else { // text not empty
                if (state==0) {
                    if (foundToken!=NL) { // eof or delimiter
                        s += t;
                        break;
                    }
                    s += '<p>'+t+'\n';
                    state = 1;
                } else {
                    if (foundToken!=NL) { // eof or delimiter
                        s += t+'</p>';
                        break;
                    }
                    s += t+'\n';
                    // stay in same state
                }
            }
            lex(mytokensFirst);
        }
    } while (true); 
    
    return s;
}


function parseNonP(delims,tokens,tokensNext) {
    var outtext='';
    if (tokens[URLSTART] && nextToken==URLSTART) {
        outtext = parseURL(delims);
        lex(tokensNext); // move past url end
    } else if (tokens[EURLSTART] && nextToken==EURLSTART) {
        outtext = parseEURL(delims);
        lex(tokensNext); // move past url end
    } else if (tokens[TABLESTART] && nextToken==TABLESTART) {
        outtext = parseTable(delims);
        lex(tokensNext); // move past table end
    } else if (tokens[TEMPLATEDEFSTART] && nextToken==TEMPLATEDEFSTART) {
        outtext = parseTemplateDef(delims,tokens);
    } else if (tokens[TEMPLATEARGSTART] && nextToken==TEMPLATEARGSTART) {
        var delims={TEMPLATEARGEND:true};
        outtext = '{{{'+parseP(delims,delims,delims)+'}}}';
        lex(tokensNext); // move past templatearg end
    } else if (tokens[TEMPLATESTART] && nextToken==TEMPLATESTART) {
        outtext = parseTemplate(delims); 
        lex(tokens); // reread first character
    } else if (tokens[BOLD] && nextToken==BOLD) {
        var mydelims = cloneTokens(delims);
        mydelims[BOLD] = true;
        outtext = "<b>"+parseP(mydelims,tokensNext,tokensNext)+"</b>";
        if (nextToken==BOLD)
            lex(tokensNext); // move to next token
    } else if (tokens[ITALS] && nextToken==ITALS) {
        var mydelims = cloneTokens(delims);
        mydelims[ITALS] = true;
        outtext = "<i>"+parseP(mydelims,tokensNext,tokensNext)+"</i>";
        if (nextToken==ITALS)
            lex(tokensNext); // move to next token
    } else
        throw new Error ('Unexpected code in parseNonP: token='+nextToken);
    return outtext;
}

// skip over any whitespace characters
function skipWS(tokens,maxskip) {
    var i=0;
    while ((nextToken==NORMAL && nextChar.match(/\s/)) || nextToken==NL) {
        if (maxskip) {
            i++;
            if (i>maxskip)
                break;
        }
        if (!lex(tokens))
            return false;
    }
    return true;
}

// remove leading/trailing ws
function trim(s) {
    return s.replace(/^[\s][\s]*/,'').replace(/[\s]*[\s]$/,'');
}

// remove leading <p><br />* and trailing </p>
function trimHTML(s) {
    var t = s;
    if (t.match(/^\<p\>.*\<\/p\>$/))
        t = t.replace(/^\<p\>/,'').replace(/\<\/p\>$/,'');
    if (t.match(/^\<br \/\>/))
        t = t.replace(/^\<br \/\>/,'');
    return t;
}


// lex one character/symbol.  Returns true if got a character,
// and fills in nextChar, nextSymbol and prevChar, or
// false if end of stream.  Input argument provides an
// associative array of recognizable tokens.
function lex(tokens) {
    if (inValue.length>inPtr) {
        prevChar = nextChar;
        nextChar = inValue.charAt(inPtr);
        if (nextChar=='\\') {
            inPtr++;
            nextToken=NORMAL;
            if (inValue.length>inPtr)
                nextChar = inValue.charAt(inPtr);
            else {
                nextChar = '';
                nextToken = '';
                return false;
            }
        } else {
            var nextnextChar = (inValue.length>inPtr+1) ? inValue.charAt(inPtr+1) : '';
            var nextnextnextChar = (inValue.length>inPtr+2) ? inValue.charAt(inPtr+2) : '';
            var nextnextnextnextChar = (inValue.length>inPtr+3) ? inValue.charAt(inPtr+3) : '';
            var formatstr = null;
            if (nextChar=='\<' && inValue.indexOf('\<nowiki\>',inPtr)==inPtr) {
                var ending = inValue.indexOf('\<\/nowiki\>',inPtr+8);
                if (ending<0) {
                    // no ending tag..hmm..
                    nextChar = inValue.substr(inPtr+8);
                    inPtr = inValue.length-1;
                } else {
                    nextChar = inValue.substr(inPtr+8,ending-inPtr-8);
                    inPtr = ending+8;
                }
                if (nextChar.length==0) { // empty content; skip it
                    inPtr++;
                    return lex(tokens);
                }
                nextToken = NORMAL;
            } else if (tokens[URLSTART] && nextChar=='[' && nextnextChar=='[') {
                nextChar="[[";
                nextToken=URLSTART;
                inPtr++;
            } else if (tokens[URLEND] && nextChar==']' && nextnextChar==']') {
                nextChar="]]";
                nextToken=URLEND;
                inPtr++;
            } else if (tokens[EURLSTART] && nextChar=='[') {
                nextChar="[";
                nextToken=EURLSTART;
            } else if (tokens[EURLEND] && nextChar==']') {
                nextChar="]";
                nextToken=EURLEND;
            } else if (tokens[TABLESTART] && nextChar=='{' && nextnextChar=='|') {
                nextChar="{|";
                nextToken=TABLESTART;
                inPtr++;
            } else if (tokens[TABLEEND] && nextChar=='|' && nextnextChar=='}') {
                nextChar="|}";
                nextToken=TABLEEND;
                inPtr++;
            } else if (tokens[TABLEROW] && nextChar=='|' && nextnextChar=='-') {
                nextChar="|-";
                nextToken=TABLEROW;
                inPtr++;
            } else if (tokens[PIPE2] && nextChar=='|' && nextnextChar=='|') {
                nextChar="||";
                nextToken=PIPE2;
                inPtr++;
            } else if (tokens[CPIPE] && prevChar=='\n' && nextChar=='|') {
                nextToken=CPIPE;
            } else if (tokens[PIPE] && nextChar=='|') {
                nextToken=PIPE;
            } else if (tokens[BANG2] && nextChar=='!' && nextnextChar=='!') {
                nextChar="!!";
                nextToken=BANG2;
                inPtr++;
            } else if (tokens[BANG] && nextChar=='!') {
                nextToken=BANG;
            } else if (tokens[BOLD] && nextChar=='\'' && nextnextChar=='\'' && nextnextnextChar=='\'') {
                nextChar="'''";
                nextToken=BOLD;
                inPtr++;
                inPtr++;
            } else if (tokens[HR] && nextChar=='-' && nextnextChar=='-' && nextnextnextChar=='-' && nextnextnextnextChar=='-') {
                nextChar="----";
                nextToken=HR;
                inPtr++;
                inPtr++;
                inPtr++;
            } else if (tokens[H4] && nextChar=='=' && nextnextChar=='=' && nextnextnextChar=='=' && nextnextnextnextChar=='=') {
                nextChar="====";
                nextToken=H4;
                inPtr++;
                inPtr++;
                inPtr++;
            } else if (tokens[H3] && nextChar=='=' && nextnextChar=='=' && nextnextnextChar=='=') {
                nextChar="===";
                nextToken=H3;
                inPtr++;
                inPtr++;
            } else if (tokens[H2] && nextChar=='=' && nextnextChar=='=') {
                nextChar="==";
                nextToken=H2;
                inPtr++;
            } else if (tokens[ITALS] && nextChar=='\'' && nextnextChar=='\'') {
                nextChar="''";
                nextToken=ITALS;
                inPtr++;
            } else if (tokens[LINEFORMAT] && inValue.substr(inPtr).match(/^[:;*#][:l*#]*/)) {
                var formatstr = inValue.substr(inPtr).match(/^[:;*#][:;*#]*/)[0];
                nextChar=formatstr;
                inPtr += formatstr.length-1;
                nextToken=LINEFORMAT;
            } else if (tokens[PRE] && nextChar==' ') {
                nextChar=' ';
                nextToken=PRE;
            } else if (tokens[TEMPLATEDEFSTART] && nextChar=='{' && nextnextChar==':') {
                nextChar="{:";
                nextToken=TEMPLATEDEFSTART;
                inPtr++;
            } else if (tokens[TEMPLATEDEFEND] && nextChar==':' && nextnextChar=='}') {
                nextChar=":}";
                nextToken=TEMPLATEDEFEND;
                inPtr++;
            } else if (tokens[TEMPLATEARGSTART] && nextChar=='{' && nextnextChar=='{' && nextnextnextChar=='{' &&  nextnextnextnextChar!='{') {
                nextChar="{{{";
                nextToken=TEMPLATEARGSTART;
                lastBraces=TEMPLATEARGSTART;
                inPtr++;
                inPtr++;
            } else if (tokens[TEMPLATEARGEND] && prevChar!='}' && lastBraces==TEMPLATEARGSTART && nextChar=='}' && nextnextChar=='}' && nextnextnextChar=='}') {
                nextChar="}}}";
                nextToken=TEMPLATEARGEND;
                inPtr++;
                inPtr++;
            } else if (tokens[TEMPLATESTART] && nextChar=='{' && nextnextChar=='{') {
                nextChar="{{";
                nextToken=TEMPLATESTART;
                lastBraces=TEMPLATESTART;
                inPtr++;
            } else if (tokens[TEMPLATEEND] && nextChar=='}' && nextnextChar=='}') {
                nextChar="}}";
                nextToken=TEMPLATEEND;
                inPtr++;
            } else if (tokens[NL] && nextChar=='\n') {
                nextToken=NL;
            } else
                nextToken=NORMAL;
        }
        inPtr++;
        return true;
    }
    nextChar = '';
    nextToken = '';
    return false;
}

// save the current lex state and return a structure for later
// restoration.
function saveLex() {
   return {nextChar:nextChar,nextToken:nextToken,prevChar:prevChar,lastBraces:lastBraces,inPtr:inPtr,inValue:inValue,templates:templates};
}

// restore the lex state from the given structure.
function restoreLex(s) {
   nextChar = s.nextChar;
   nextToken = s.nextToken;
   prevChar = s.prevChar;
   lastBraces = s.lastBraces;
   inPtr = s.inPtr;
   inValue = s.inValue;
   templates = s.templates;
}

// reset the lex state as if it were starting fresh
// does not change the input string though.
function resetLex() {
   nextChar = '';
   nextToken = null;
   prevChar = '';
   lastBraces = null;
   inPtr = 0;
}
// ------------------ end of parser code 

insertHTML();
