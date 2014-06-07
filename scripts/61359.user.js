// ==UserScript==
// @name           redditorage
// @namespace      *
// @description    Reveal the age of a reddit user.
// @include        http://www.reddit.com/r/*
// ==/UserScript==


$('.comment').each(function(i) {
    var tagline = $(this).find('.tagline:first')
    tagline.append("<div class='author_age'>get author's age</div>")
});
$('.author_age').click(function () { 
    $.ajax({
      type: "GET",
      url: $(this).parent().find('.author:first').attr('href'),
      dataType: "html",
      success: function(msg){
        patt=/\<span class="age"\>([\w\s]+)\<\/span\>/g;
        result = patt.exec(msg)
        alert(result[1])
      }
    });
});