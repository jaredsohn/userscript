// ==UserScript==
// @name           Size and color of rating according to it
// @namespace      dirty
// @description    Увеличивает размер и меняет цвет шрифта оценки в зависимости от рейтинга. Делает оценку 0 белой. Работает на новой верстке. 
// @include        http://dirty.ru/comments/*
// @include        http://*.dirty.ru/comments/*
// ==/UserScript==

var divs = getElementsByClassName('vote_result');
var divslen = divs.length;
var comment;
var rating;
var good_limit = 300;
//px
var indent_step = 20;
var max_tree_deep = 15;

for(var i = 0; i < divslen; i++) {
    comment = divs[i];
    rating = getRating(comment);
    if ((rating>good_limit*2))
        comment.style.color = "#0000"+d2h(rating);
    if ((rating>good_limit) && (rating<good_limit*2))
        comment.style.color = "#00"+d2h(good_limit*2-rating-1)+d2h(rating);
    if (rating>0 && rating<=good_limit)
        comment.style.color = "#00"+d2h(rating)+"00";
    if (rating<0 && rating >=-good_limit)
        comment.style.color = "#"+d2h(rating)+"0000";
    if (rating<-good_limit)
        comment.style.color = "#ff0000";
//    if (rating==0)
//        comment.style.color = "#000000";
    if(rating<0)
        rating=0;
    comment.style.fontSize = Math.min(16,9+2*Math.log(Math.abs(rating)+1)) + "px";
}
var style = '';
for (i = 1; i < 30; i++) {
    style += getIndentStyle(i);
}
style += ' .comment { margin-bottom: 10px; } ';
style += ' .comment_inner { padding: 3px; } ';
style += ' .indent_0 { margin-top: 20px; } ';
addGlobalStyle(style);

function getIndentStyle(indent) {
    if(indent < max_tree_deep) {
        return ' .indent_' + indent + ' { padding-left: ' + indent * indent_step + 'px; } ';
    } else {
        return ' .indent_' + indent + ' { padding-left: ' + indent * max_tree_deep + 'px; } ';
    }
}

function getRating(div) {
    return parseInt(div.innerHTML, 10);
}

function d2h(d) {
    d=Math.abs(d);
    d=d%good_limit;
    d=good_limit/4+3*d/4;
    d=Math.round(256*d/good_limit);
    var str=d.toString(16);
    if (str.length==2) 
        return str;
    else
        return "0"+str;
}

/*
Developed by Robert Nyman, http://www.robertnyman.com
Code/licensing: http://code.google.com/p/getelementsbyclassname/
*/
function getElementsByClassName (className, tag, elm) {
    if (document.getElementsByClassName) {
        getElementsByClassName = function (className, tag, elm) {
            elm = elm || document;
            var elements = elm.getElementsByClassName(className),
            nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
            returnElements = [],
            current;
            for(var i=0, il=elements.length; i<il; i+=1){
                current = elements[i];
                if(!nodeName || nodeName.test(current.nodeName)) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    else if (document.evaluate) {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = "",
            xhtmlNamespace = "http://www.w3.org/1999/xhtml",
            namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
            returnElements = [],
            elements,
            node;
            for(var j=0, jl=classes.length; j<jl; j+=1){
                classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
            }
            try	{
                elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
            }
            catch (e) {
                elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
            }
            while ((node = elements.iterateNext())) {
                returnElements.push(node);
            }
            return returnElements;
        };
    }
    else {
        getElementsByClassName = function (className, tag, elm) {
            tag = tag || "*";
            elm = elm || document;
            var classes = className.split(" "),
            classesToCheck = [],
            elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
            current,
            returnElements = [],
            match;
            for(var k=0, kl=classes.length; k<kl; k+=1){
                classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
            }
            for(var l=0, ll=elements.length; l<ll; l+=1){
                current = elements[l];
                match = false;
                for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
                    match = classesToCheck[m].test(current.className);
                    if (!match) {
                        break;
                    }
                }
                if (match) {
                    returnElements.push(current);
                }
            }
            return returnElements;
        };
    }
    return getElementsByClassName(className, tag, elm);
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { 
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
