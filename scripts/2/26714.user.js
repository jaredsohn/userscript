// Convert POD to HTML GreaseMonkey Script
//
// This script read the POD directives and convert it to HTML
// 
// ==UserScript==
// @name Pod2Html
// @namespace http://e.funnekotter.man
// @Convert perl POD to HTML
// @include http://*.pod
// @include http://*.pm
// ==/UserScript==

if (!document.getElementsByTagName('div')[0]) {

    var text = document.getElementsByTagName('body')[0].textContent;
    var anyPod = 0;

    if (document.URL.match(/\.pod$/)) {
        anyPod = 1;
        if (text) {
            text = "<div class=\"pod\">" +
                   formatPodBlock(text) +
                   "</div>";;
        }
    }
    else if (document.URL.match(/\.pm$/)) {
        // Find all the POD blocks within the perl
        // and format them
        if (matches = text.match(/(?:^|\n)=begin((?:.|\n)+?)\n=cut/)) {
            anyPod = 1;
            var block = matches[0];
            block = "<div class=\"pod\">"+formatPodBlock(block)+"</div>";
            text = text.replace(/(?:^|\n)=begin((?:.|\n)+?)\n=cut/,
                                block);
        }
        else if (matches = text.match(/(?:^|\n)__END__\n((?:.|\n)+)/)) {
            anyPod = 1;
            var block = matches[0];
            block = "<div class=\"pod\">"+formatPodBlock(block)+"</div>";
            text = text.replace(/((?:\n|.)*?(?:\n))__END__/,
                                "<pre>$1</pre>\n__END__");
            text = text.replace(/(?:^|\n)__END__((?:.|\n)+)/,
                                block);
        }
        else if (matches = text.match(/(?:^)((?:.|\n)+?)\n=cut/)) {
            anyPod = 1;
            var block = matches[0];
            block = "<div class=\"pod\">"+formatPodBlock(block)+"</div>";
            text = text.replace(/(?:^)((?:.|\n)+?)\n=cut/,
                                block+"\n<pre>") + "</pre>";
        }

    }

    if (!anyPod) {
        text = "<div><pre>" +
            text +
            "</pre></div>";
    }

    var newDoc=document.open("text/html","replace");
    newDoc.write(text);
    newDoc.close();
    

}

function formatPodBlock(text) {
    text = replaceAngles(text);
    text = replaceParas(text);
    text = replaceEscaping(text);
    text = replaceFormatting(text, "C", "code");
    text = replaceFormatting(text, "I", "I");
    text = replaceFormatting(text, "B", "B");
    text = replaceHeadings(text);
    text = replaceOverBack(text);
    text = replaceItems(text);
    text = replaceCodeBlocks(text);
    text = text.replace(/=encoding .*/, "");
    text = text.replace(/=for .*/, "");
    return text;
}


function replaceFormatting(text, type, tag) {
    var regex = new RegExp(type + "&lt;&lt;&lt;((?:.|\n)*?)&gt;&gt;&gt;", "g");
    text = text.replace(regex, "<"+tag+">$1</"+tag+">");
    var regex = new RegExp(type + "&lt;&lt;((?:.|\n)*?)&gt;&gt;", "g");
    text = text.replace(regex, "<"+tag+">$1</"+tag+">");
    regex = new RegExp(type + "&lt;((?:.|\n)*?)&gt;", "g");
    text = text.replace(regex, "<"+tag+">$1</"+tag+">");
    return text;
}

function replaceSimpleCmdInfix(text, cmd, tag) {
    var regex = new RegExp("(?:^|\n)=" + cmd + " *(.*)", "g");
    text = text.replace(regex, "<"+tag+">$1</"+tag+">\n");
    return text;
}

function replaceSimpleCmdInfixTillNextCmd(text, cmd, tag) {
    var regex = new RegExp("(?:^|\n)=" + cmd + " *((:?.|\n)*?)(?=\n=)", "g");
    text = text.replace(regex, "<"+tag+">$1</"+tag+">\n=");
    return text;
}

function replaceItems(text) {
    var regex = new RegExp("(?:^|\n)=item(.*)((:?.|\n)*?)(?=\n=)", "g");
    text = text.replace(regex, "<li>$1\n$2</li>\n");
    return text;
}

function replaceSimpleCmdPrefix(text, cmd, tag) {
    var regex = new RegExp("(?:^|\n)=" + cmd + " *(.*)", "g");
    text = text.replace(regex, "<"+tag+">$1\n");
    return text;
}

function replaceSimpleCmdPostfix(text, cmd, tag) {
    var regex = new RegExp("(?:^|\n)=" + cmd + " *(.*)", "g");
    text = text.replace(regex, "$1</"+tag+">\n");
    return text;
}

function replaceHeadings(text) {
    var regex = new RegExp("(?:^|\n)=head([0-9]+) *(.*)", "g");
    text = text.replace(regex, "<h$1>$2</h$1>\n");
    return text;
}

function replaceCodeBlocks(text) {
    var regex = new RegExp("(?:^|\n)([ \t]+[^ \t](?:.|\n)*?)(?=\n[^ \t\n])", "g");
    text = text.replace(regex, "<pre>$1</pre>\n");
    return text;
}

function replaceParas(text) {
    var regex = new RegExp("(?:^|\n)([^ \t=\n](?:.|\n)*?)(?=(\n[ \t])|(\n\n))", "g");
    text = text.replace(regex, "<p>$1</p>\n");
    return text;
}

function replaceAngles(text) {
    text = text.replace(/</g, "&lt;");
    text = text.replace(/>/g, "&gt;");
    return text;
}

function replaceOverBack(text) {
    var regex = new RegExp("(?:^|\n)=over.*", "g");
    text = text.replace(regex, "<ul>");
    regex = new RegExp("(?:^|\n)=back.*", "g");
    text = text.replace(regex, "</ul>");
    return text;
}

function replaceEscaping(text) {
    var regex = new RegExp("E&lt;([^&]+)&gt;", "g");
    text = text.replace(regex, "&$1;");
    return text;
}




//
// CSS Stuff Below Here
//

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("\
body {\
background-color:#FFFFFF;\
color:black;\
font-family:verdana,arial,sans-serif;\
font-size:0.9em;\
font-size-adjust:none;\
font-stretch:normal;\
font-style:normal;\
font-variant:normal;\
font-weight:normal;\
line-height:1.5em;\
width:730px;\
}\
ul {\
list-style-type:square;\
}\
a {\
color:#003399;\
text-decoration:none;\
}\
.RIGHT {\
text-align:right;\
}\
.HOME {\
text-align:right;\
text-decoration:underline;\
}\
.error {\
color:#DD0000;\
}\
a:visited {\
color:#663399;\
}\
a:link:hover {\
color:#8B0000;\
text-decoration:underline;\
}\
a:visited:hover {\
color:#8B0000;\
text-decoration:underline;\
}\
td {\
font-size:14px;\
}\
.SHADED {\
background-color:#D2B48C;\
font-family:helvetica,sans-serif;\
font-size:14px;\
font-weight:bold;\
}\
.BANNER {\
background-color:#191970;\
border-bottom:4px solid #3399FF;\
border-top:4px solid #3399FF;\
color:#FFFFFF;\
font-family:helvetica,sans-serif;\
font-size:18px;\
font-weight:bold;\
letter-spacing:2px;\
padding-bottom:0.5em;\
padding-left:0.5em;\
padding-top:0.5em;\
}\
#nav {\
display:none;\
}\
.noprint {\
display:none;\
}\
#NAV {\
background-color:#EEEEEE;\
border-left:1px solid #191970;\
border-right:1px solid #191970;\
font-size:0.8em;\
margin:-1px 0em 0em;\
padding:7px;\
width:180px;\
}\
.topNAV {\
}\
.sideNAV {\
background-image:url(/simages/onion/onion-160x160a.gif);\
background-position:center bottom;\
background-repeat:no-repeat;\
}\
#MAIN {\
margin-left:1em;\
margin-top:1em;\
}\
#MAIN td {\
font-size:12px;\
}\
hr {\
color:#191970;\
padding-bottom:0.5em;\
padding-top:0.5em;\
text-align:center;\
}\
h3 {\
color:#000000;\
font-family:verdana,helvetica,sans-serif;\
font-size:14px;\
font-weight:bolder;\
}\
h1,h2 {\
color:#003399;\
}\
tr {\
vertical-align:top;\
}\
td.NOVERTPAD {\
padding-bottom:0pt;\
padding-top:0pt;\
}\
img.border {\
background:white none repeat scroll 0%;\
border:1px solid #191970;\
margin:2px;\
padding:4px;\
}\
p.fancyp:first-letter {\
float:left;\
font-family:serif;\
font-size:215%;\
padding:1px;\
}\
.pod pre {\
background:#EEEEEE none repeat scroll 0%;\
border:1px solid #888888;\
color:black;\
padding:1em;\
white-space:pre;\
}\
pre {\
line-height:1.4;\
}");

