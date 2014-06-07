// ==UserScript==
// @name                                 Fancy Code Tag
// @copyright                            Copyright(C)2009 Public Domain
// @namespace                            http://userscripts.org/scripts/show/56737
// @version                              3
// @description                          Syntax highlighter with line number and tab substitution.
// @Languages                       Java, JSP, C/C++
// This javascript adds syntax highlighting, line numbers, and replaces tab with spaces to the [code] tags found on forums. Its been tested on Opera 9 and Firefox on java-forums.org and cboard.cprogramming.com

// To Use: just copy and paste this code into the URL of the web browser like so: 
//          <pre>  <b>javascript:</b> <i> {  copy and paste this script } </i> </pre>
// Then you can bookmark this url and call on it as a bookmarklet, or use it with Opera or Greesemonkey

// Note: You may need to supply the code tag signature for specific sites.

// Changes:
// v2: added CSS, regex for preprocessor directives (so tokenizer can be reused for c/c++).
// v2.2: added C/C++ language.
// v3: added JSP and toolbar for selections.
// ==/UserScript==

/*ERROR: when used as bookmarklet on firefox, block comments colors don't appear... */

/* -------------------USER CONFIG------------------------------- */
var discardInnerHTML = true; /* causes problems if click selection twice */
var addLineNumbers = true;
var autoSyntaxHighlight = false;
var defaultLang = "java"; /* java, jsp, cpp*/
var replaceTabs = true;
var replace_tab_with = "  ";
var max_length_limit = 8000; /* limit autoSyntaxHighlight */

/* Read the forums html source and get the tag signatures. */
var code_tag_signature = { 
  tag:"pre",
  attribute:"dir", /* for class, use className */
  value:"ltr",
};

/* Using Notepad++ theme */
const STYLE_SHEET =
'span.word.inst{color: blue; font-weight: bold;}'+
'span.word.type{color: purple;}'+
'span.word.custom{color: purple;}'+
'span.comment{color: green;}'+
'span.comment.block{font-style: italic;}'+
'span.comment.doc{color: teal;}'+
'span.literal.number{color: orange; font-weight: bold}'+
'span.literal.string{color: gray;}'+
'span.literal.char{color: gray; font-weight: bold;}'+
'span.annotation{color: gray; font-weight: bold;}'+
'span.preprocessor{color: brown;}'+
'ol.code li{font-family: monospace;}'+
/*'ol.code > li{background-color: white;}'+
'ol.code{background-color: lightgray;}'+*/
'span.xml,span.jsp .tag{color: blue;}' +
'span.jsp .tag{background-color: yellow;}' +
'span.jsp.action{background-color: lightgray;}' +
'span.jsp .comment{color: green;}' +
'span.jsp .text.directive .word{font-weight:bold;}' +

'span.xml.comment{color: green;}' +
'span.xml.attribute{color: brown;}' +
'span.xml.value{color: gray;}' +

'span.jsp.el{color: red;}' +
'div.fct.toolbar table.fct{font-size:10;}'+
'';

/* Custom Classes & keywords */
const JAVA_CUSTOM_WORDS = 'Object String System Byte Integer Character Long Double Float Short Exception IOException JApplet Applet JFrame Frame Logger toString main';

const CPP_CUSTOM_WORDS = 'exit malloc free calloc';
/* --------------------END CONFIG----------------------------------- */


var debug = false;

const LANG_JAVA = {
  REGEX_PATTERN:/<\/?[^>]+?>|\/\*(?:.|\s)*?\*\/|["](?:\\["]|\\\n|[^"\n])*["]|'(?:\\'|\\\n|[^'\n])*'|\/\/[^\n]*$|\d+\.?\d*\w?|@\w+|\s+|\w+|\W/gim,
  TYPE_WORDS:'public private protected class interface abstract static final void package byte short int long float char double boolean const enum native synchronized strictfp volatile transient',
  INSTRUCTION_WORDS:'import new return null instanceof break continue if else do while for switch case default true false try catch finally throws throw assert extends implements super this goto',
  CUSTOM_WORDS:JAVA_CUSTOM_WORDS,
};

const LANG_JSP = {
  REGEX_PATTERN:/<\/?[^>]+?>|\$\{.+?\}|\&lt;\!--(?:.|\s)*?--\&gt;|\&lt;%(?:.|\s)*?%\&gt;|\&lt;\/?\w+?\s*?\/?\&gt;|\&lt;(jsp\:\w+?\&gt;)(?:.|\s)+?\&lt;\/\1|\&lt;\/?jsp\s*\:(?:.|\s)+?\/\&gt;|\&lt;!DOCTYPE.+?\&gt;|\&lt;\w+?\:?\s*(?:\w+?\s*\=\s*.+?\s*)+?\s*\/?\&gt;|\w+|.|\s+/gim,
  TYPE_WORDS:'',
  INSTRUCTION_WORDS:'',
  CUSTOM_WORDS:'',
  
  DIRECTIVE:{
    TYPE_WORDS:'page include taglib',
    INSTRUCTION_WORDS:'import contentType pageEncoding session isELIgnored buffer autoFlush info errorPage isErrorPage isThreadSafe language extends file uri prefix',
    CUSTOM_WORDS:'',
  },
  
  SCRIPTLET:{ /* need a space between concats */
    TYPE_WORDS:LANG_JAVA.TYPE_WORDS+' out request response session application pageContext config exception page',
    INSTRUCTION_WORDS:LANG_JAVA.INSTRUCTION_WORDS,
    CUSTOM_WORDS:LANG_JAVA.CUSTOM_WORDS,
  },
};

const LANG_CPP = {
  REGEX_PATTERN:/<\/?[^>]+?>|\/\*(?:.|\n)*?\*\/|["](?:\\["]|\\\n|[^"\n])*["]|'(?:\\'|\\\n|[^'\n])*'|\/\/.*\n|\d+\.?\d*\w?|#(?:(?!\/\*)(?!\/\/)[^\n])*|\s+|\w+|\W/gim,
  TYPE_WORDS:'asm auto bool,	char class const double enum explicit extern float friend inline int long mutable private protected public register short signed static struct template typename union unsigned virtual void volatile',
  INSTRUCTION_WORDS:'break case catch const_cast continue default delete do dynamic_cast else false for goto if namespace new operator reinterpret_cast return sizeof static_cast switch this throw true try typedef typeid using while',
  CUSTOM_WORDS:CPP_CUSTOM_WORDS
};

function parseCodeTag(tagInfo){ /* MAIN */
  var match_found = false;  
  var tags=document.body.getElementsByTagName(tagInfo.tag);
  for(var i=0; i<tags.length; ++i){
    var pattern = eval("/^"+ tagInfo.value +"$/g");
    if(pattern.test(tags[i][tagInfo.attribute])){
      match_found = true;
      addToolBar(tags[i]);
      if(autoSyntaxHighlight && tags[i].innerHTML.length < max_length_limit)
        syntaxHighlight(tags[i],defaultLang);
    }
  }
  if(match_found) addStyleSheet(STYLE_SHEET);
}

function syntaxHighlight(tag, str){
  var lang = getLanguage(str);
  
  var tokenArray = tokenize(tag.innerHTML,lang.REGEX_PATTERN);
  tag.innerHTML = evalToken(tokenArray, lang);
  
  convertTabToSpace(tag,replaceTabs);
	addRuler(tag,addLineNumbers);
}

function addToolBar(tag){
  var toolbar = document.createElement("div");
  toolbar.id = "Fancy_Code_Tag_Toolbar";
  toolbar.className = "fct toolbar";
  toolbar.innerHTML = '<table class="ftc" border=0 align="right"><tr>' +
'<td><b>FCT Options: </b></td>' +
'<td> <a name="tln" href="#">ToogleLineNum</a> |</td>' +
'<td> <a name="java" href="#">Java</a> |</td>' +
'<td> <a name="jsp" href="#">JSP</a> |</td>' +
'<td> <a name="cpp" href="#">C/C++</a></td>' +
'</tr></table>';
  
  toolbar.getElementsByTagName("a")[0].addEventListener('click', 
    function(e){onClickHandler(e,addRuler,tag,!addLineNumbers)}, true);
    
  toolbar.getElementsByTagName("a")[1].addEventListener('click', 
    function(e){onClickHandler(e,syntaxHighlight,tag,'java')}, true);
  
  toolbar.getElementsByTagName("a")[2].addEventListener('click', 
    function(e){onClickHandler(e,syntaxHighlight,tag,'jsp')}, true);
  
  toolbar.getElementsByTagName("a")[3].addEventListener('click', 
    function(e){onClickHandler(e,syntaxHighlight,tag,'cpp')}, true);
  
  tag.parentNode.insertBefore(toolbar,tag);
}

function onClickHandler(event,action,tag,param2){
  action(tag,param2);
  event.preventDefault();
}
function getLanguage(str){
  var lang;
  if(/java/i.test(str)) lang = LANG_JAVA;
  else if(/jsp/i.test(str)) lang = LANG_JSP;
  else if(/cpp|c|c\+\+/i.test(str)) lang = LANG_CPP;
  else lang = LANG_JAVA;
  return lang;
}
function addStyleSheet(css){
  var styleTag = document.createElement("style");
  styleTag.id = "Fancy_Code_Tag";
  styleTag.type = "text/css";
  styleTag.innerHTML = css;
  document.getElementsByTagName("head")[0].appendChild(styleTag);
}
function convertTabToSpace(tab,bool){
  if(bool) tab.innerHTML = tab.innerHTML.replace(/\t/g, replace_tab_with);
}
function addRuler(tag,bool){
  addLineNumbers = bool; /* need err check for undefined val */
  if(bool){
    tag.innerHTML = '<ol class="code"><li>' +
      tag.innerHTML.replace(/\r?\n|<br ?\/?>/gim,' \n<\/li><li>') +
      '<\/li><\/ol>';
  }
  else{
    tag.innerHTML = tag.innerHTML.replace(/<ol class=\"code\"><li>|<\/li><\/ol>/gim,'').replace(/ \n<\/li><li>/gim,'\n');
  }
}

function tokenize(input, pattern){
  input = input.replace(/\r?\n|<br ?\/?>/gim,'\n'); /* \r & <br> causes problems parsing string literals  and line comments*/
  
  if(discardInnerHTML)
    input = input.replace(/<\/?[^>]+?>/gim,"");
  
  return input.match(pattern);
}

function evalToken(tokenArray, lang) {
  var html_tag = /^<\/?[^>]+>$/i; /* skipped */
  
  var comment_line = /^\/\/.*\s/;
  var comment_block = /^\/\*(?:.|\s)*?\*\/$/;
  var comment_doc = /^\/\*\*(?:.|\s)*?\*\/$/;
  var charstr = /^(["'])(?:\\\n|[^\n])*\1$/;
  var num_literal = /^\d+\.?\d*\w?$/i;
  var word = /^\w+$/;
  var annotation = /^@\w+$/;
  var preprocessor = /^#.*$/;
  
  /* JSP */
  var xml = /^\&lt;/;
  var EL = /^\$\{.+\}$/;

  var className, ret = "";

  /*DEBUG*/
  /*window.open("debug").document.write('<pre>'+ tokenArray.join('<font color="red">|<\/font>') + '<\/pre>'); */

  for (var i = 0; i < tokenArray.length; i++) {
    var token = tokenArray[i];
    
    /*DEBUG*/
    if(debug) ret += '<font color="red">|<\/font>';

    if(discardInnerHTML && html_tag.test(token)){
      continue;
    }

    if(num_literal.test(token) && lang!=LANG_JSP){
      className = "literal number";
    }
    else if(charstr.test(token)){
      if(/^'.*/.test(token)){
        className = "literal char";
      }else{
        className = "literal string";
      }
    }
    else if (comment_block.test(token)) {
      if (lang==LANG_JAVA && comment_doc.test(token))
        className = "comment doc";
      else
        className = "comment block";
    }
    else if (comment_line.test(token) && lang!=LANG_JSP) {
      className = "comment line";
    }
    else if(annotation.test(token)){
      className = "annotation";
    }
    else if(preprocessor.test(token)){
      if(lang==LANG_CPP)
        className = "preprocessor";
      else
        className = "";
    }
    else if(word.test(token)){
      className = evalKeyword(token, lang);
    }
    else if(xml.test(token)){
      if(lang==LANG_JSP && /^\&lt;%--/.test(token)){
        className = "jsp comment";
      }
      else if(lang==LANG_JSP && /^\&lt;%/.test(token)){
        token = parseJSP_Tag(token);
        className = "jsp";
      }
      else if(lang==LANG_JSP && /^\&lt;jsp/.test(token)){
        token = parseJSP_Action(token);
        className = "xml jsp action";
      }
      else if(/^&lt;\!--/.test(token)){
        className = "xml comment";
      }
      else{
        className = "xml";
        token = parseXMLDoc(token,className);
      }
    }
    else if(lang==LANG_JSP && EL.test(token)){
      className = "jsp el";
    }
    else {
      className="";
    }
    ret += combineToken(token, className);
  }
  return ret;
}

function parseJSP_Tag(token){
  var className;
  if(/^\&lt;%!/.test(token)){
    className = "declaration ";
    var temp = tokenize(token.slice(6,-5),LANG_JAVA.REGEX_PATTERN);
    token = combineToken('\&lt;%!',className+'tag') + 
            combineToken(evalToken(temp,LANG_JAVA),className+'text') +
            combineToken('%\&gt;',className+'tag');
  }
  else if(/^\&lt;%@/.test(token)){
    className = "directive ";
    var temp = tokenize(token.slice(6,-5),LANG_JAVA.REGEX_PATTERN);
    token = combineToken('\&lt;%@',className+'tag') + 
            combineToken(evalToken(temp,LANG_JSP.DIRECTIVE),className+'text') +
            combineToken('%\&gt;',className+'tag');
  }
  else if(/^\&lt;%=/.test(token)){
    className = "expression ";
    var temp = tokenize(token.slice(6,-5),LANG_JAVA.REGEX_PATTERN);
    token = combineToken('\&lt;%=',className+'tag') + 
            combineToken(evalToken(temp,LANG_JSP.SCRIPTLET),className+'text') +
            combineToken('%\&gt;',className+'tag');
  }
  else if(/^\&lt;%/.test(token)){
    className = "scriptlet ";
    var temp = tokenize(token.slice(5,-5),LANG_JAVA.REGEX_PATTERN);
    token = combineToken('\&lt;%',className+'tag') + 
            combineToken(evalToken(temp,LANG_JSP.SCRIPTLET),className+'text') +
            combineToken('%\&gt;',className+'tag');
  }
  return token;
}

function parseJSP_Action(token){
  var className;
  if(/^\&lt;jsp\:declaration/.test(token)){
    className = "declaration ";
    var temp = tokenize(token,LANG_JAVA.REGEX_PATTERN);
    token = combineToken(evalToken(temp,LANG_JAVA),className+'text');
  }
  else if(/^\&lt;jsp\:directive/.test(token)){
    className = "directive ";
    var temp = tokenize(token,LANG_JAVA.REGEX_PATTERN);
    token = combineToken(evalToken(temp,LANG_JSP.DIRECTIVE),className+'text');
  }
  else if(/^\&lt;jsp\:expression/.test(token)){
    className = "expression ";
    var temp = tokenize(token,LANG_JAVA.REGEX_PATTERN);
    token = combineToken(evalToken(temp,LANG_JSP.SCRIPTLET),className+'text');
  }
  else if(/^\&lt;jsp\:scriptlet/.test(token)){
    className = "scriptlet ";
    var temp = tokenize(token,LANG_JAVA.REGEX_PATTERN);
    token = combineToken(evalToken(temp,LANG_JSP.SCRIPTLET),className+'text');
  }
  else {
    className = "";
    var temp = tokenize(token,LANG_JAVA.REGEX_PATTERN);
    token = combineToken(evalToken(temp,LANG_JSP),className+'text');
  }
  return token;
}

function parseXMLDoc(token, className){
  var temp = token.split(/(\w+\s*\=|["](?:\\["]|\\\n|[^"\n])*["]|'(?:\\'|\\\n|[^'\n])*'|\s)/gim);
  if(temp.length > 1){
    for(var a=0; a<temp.length; ++a){
      if(/^"|'(?:.|\s)*'|"$/.test(temp[a])){
        temp[a] = combineToken(temp[a],className+" value");
      }
      else if(/^\w+\s*\=$/.test(temp[a])){
        temp[a] = combineToken(temp[a].slice(0,-1),className+" attribute") + "=";
      }
    }
  }
  return temp.join("");
}

function combineToken(token, className){
  if(className=="") return token;
  var beginTag = '<span class="';
  var midTag = '">';
  var endTag = '<\/span>';
  token = token.replace(/(\n+)/g,endTag+'$1'+beginTag+className+midTag);
  return beginTag + className + midTag + token + endTag;
}

function evalKeyword(token, lang){
  var regex = new RegExp('\\b'+token+'\\b');
  var className = "";
  if(regex.test(lang.INSTRUCTION_WORDS)){
    className = "inst word";
  }
  if(regex.test(lang.TYPE_WORDS)){
    className = "type word";
  }
  if(regex.test(lang.CUSTOM_WORDS)){
    className = "custom word";
  }
  return className;
}

document.onload = parseCodeTag(code_tag_signature);
