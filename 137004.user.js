// ==UserScript==
// @name       diary smart quote
// @namespace  http://userscripts.org/scripts/show/137004
// @author     dpleshakov (http://userscripts.org/users/473776)
// @version    0.8
// @description  Smart quote
// @include      *://*.diary.ru/?newpost&quote_*
// @copyright  2012+, 
// ==/UserScript==

function CreatePost(authors, message) {
    if (authors.length == 0) {
      return message;
    }
    else if (authors.length == 1) {
      return "Пишет " + authors[authors.length - 1] + ":<br><br>" + message;
    }
    else {
      post = "Пишут ";
      for(var i = 0; i < authors.length - 1; i++) {
        post += authors[i] + ", ";
      }
      post += authors[authors.length - 1] + ":";
      post += "<br><br>";
      post += message;
    
      return post;
    }
}

textarea = document.getElementById("message");
messageOneQuoteExpr = new RegExp(/&lt;span class=["']*quote_text['"]*&gt;&lt;div class=['"]*blockquote['"]*&gt;[.\D\d]*&lt;\/div&gt;&lt;\/span&gt;/gm);
message = textarea.innerHTML.match(messageOneQuoteExpr);
if (message == 0) {
  messageExpr = new RegExp(/&lt;span class=["']*quote_text['"]*&gt;&lt;blockquote&gt;[.\D\d]*&lt;\/blockquote&gt;&lt;\/span&gt;/gm);
  message = textarea.innerHTML.match(messageExpr)[0];
}
if (message != "") {
  authorExpr = new RegExp(/(?!&lt;div align=['"]right['"]&gt;)&lt;b&gt;\d\d.\d\d.\d\d\d\d&lt;\/b&gt; в \d\d:\d\d&lt;\/div&gt;Пишет \[J\].*\[\/J\]:/g);
  authors = textarea.innerHTML.match(authorExpr);
  authorNameExpr = new RegExp(/\[J\].*\[\/J\]/g);
  authorNames = []
  if (authors.length == 1) {
    lineWithAuthorExpr = new RegExp(/Пиш(е|у)т (\[J\].*\[\/J\],*)*:/g);
    lineWithAuthor = textarea.innerHTML.match(lineWithAuthorExpr);
    message = message.replace(lineWithAuthorExpr, "");
    for(var countLine = 0; countLine < lineWithAuthor.length; countLine++) {
      authorNames = authorNames.concat(lineWithAuthor[countLine].match(authorNameExpr));
    }
  }
  else {  
    for (var i = 0; i < authors.length; i++) {
      authorNames.push(authors[i].match(new RegExp(authorNameExpr)));
    }
  }

  textarea.innerHTML = CreatePost(authorNames, message);
}