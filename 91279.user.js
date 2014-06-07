// ==UserScript== 
// @name          IgnorEOL
// @version       69
// @namespace     dummy
// @description   Elimina post inutiles
// @include       http://www.elotrolado.net/hilo_*
// @include       http://www.elotrolado.net/foro_*
// @match         http://www.elotrolado.net/hilo_*
// @match         http://www.elotrolado.net/foro_*
// ==/UserScript== 

var ignore = new Array(); // CASE SENSITIVE
ignore[1] = "Mononitoto";
ignore[2] = "...";
ignore[3] = "...";
ignore[4] = "...";
ignore[5] = "...";
ignore[6] = "...r";
ignore[8] = "...";
ignore[9] = "...";
ignore[10] = "...";
ignore[11] = "...";
ignore[12] = "...";
ignore[13] = "...";
if (location.href.indexOf("http://www.elotrolado.net/hilo_") == 0) {
   var post;
   var quote;

   var postCount = 0;
   var userCount = 0;
   var quoteCount = 0;

   var useless = 0;

   var postAuthor = "";
   var quoteAuthor = "";

   var post = document.getElementsByClassName("post");
   for (postCount = 0; postCount < post.length; postCount++) {
      useless = 0;
      try {
         postAuthor = post[postCount].getElementsByClassName("author")[0].getElementsByTagName("a")[0].innerHTML;
         for (userCount = 0; userCount < ignore.length; userCount++) {
            if (postAuthor == ignore[userCount]) {
               post[postCount].style.display = "none";
               useless = 1;
               break;
            };
         };
         if (!useless) {
            try {
               var quote = post[postCount].getElementsByClassName("content")[0].getElementsByTagName("blockquote");
               for (quoteCount = 0; quoteCount < quote.length; quoteCount++) {
                  quoteAuthor = quote[quoteCount].getElementsByTagName("cite")[0].innerHTML;
                  for (userCount = 0; userCount < ignore.length; userCount++) {
                     if (quoteAuthor.indexOf(ignore[userCount]) == 0) {
                        quote[quoteCount].style.display = "none";
                        break;
                     };
                  };
               };
            } catch(e) { };
         };
      } catch(e) { };
   }
} else if (location.href.indexOf("http://www.elotrolado.net/foro_") == 0) {
   var post;

   var postCount = 0;
   var userCount = 0;

   var post = document.getElementsByClassName("row");
   for (postCount = 0; postCount < post.length; postCount++) {
      try {
         postAuthor = post[postCount].getElementsByTagName("dt")[0].getElementsByTagName("a");
         postAuthor = postAuthor[postAuthor.length - 1].innerHTML;
         console.log(postAuthor);
         for (userCount = 0; userCount < ignore.length; userCount++) {
            if (postAuthor == ignore[userCount]) {
               post[postCount].style.display = "none";
               useless = 1;
               break;
            };
         };
      } catch(e) { };
   };
};