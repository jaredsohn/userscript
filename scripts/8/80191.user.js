// ==UserScript==
// @name           Bungie Quote Last
// @namespace      Iggyhopper
// @description    Adds a button to quote the last person of any quote pyramid
// @include        http://*bungie.net*createpost.aspx*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

function Main()
{
    var PosterName = $("#ctl00_mainContent_postForm_skin_originalPost_skin_usernameLink").text();
    var $TextBoxBody = $("#ctl00_mainContent_postForm_skin_body");
    var $OriginalPost = $("#ctl00_mainContent_postForm_skin_originalPost_skin_PostBlock");
    var $ButtonQuoteLast = $("#ctl00_mainContent_postForm_skin_quoteButton").clone().attr("id", "BQL_QuoteLastButton").attr("href", "javascript:void(0);").text("quote last").prependTo($("#ctl00_mainContent_postForm_skin_quoteButton").parent()).click(function()
    {
        var $N = $OriginalPost.clone();
        $N.find("span").each(function()
        {
            var $this = $(this);
            if ($this.next().attr("tagName") == "BR") $this.next().remove();
            if ($this.children(":first").attr("tagName") == "B") $this.remove();
        });
        $N.contents(":last[textContent *= 'Edited on']").prev().andSelf().remove();
        $TextBoxBody.val($TextBoxBody.val().substring(0, $TextBoxBody.attr("selectionStart")) + "[quote][b]Posted by:[/b] " + PosterName + "\n" + HTML2BB($N.html()) + "[/quote]" + $TextBoxBody.val().substring($TextBoxBody.attr("selectionStart"), $TextBoxBody.val().length));
    });
    
    var $ButtonQuoteSelected = $("#ctl00_mainContent_postForm_skin_quoteButton").clone().attr("id", "BQL_QuoteSelectedButton").attr("href", "javascript:void(0);").text("quote selected").prependTo($("#ctl00_mainContent_postForm_skin_quoteButton").parent()).click(function()
    {
        var $N = $OriginalPost.clone();
        $TextBoxBody.val($TextBoxBody.val().substring(0, $TextBoxBody.attr("selectionStart")) + "[quote][b]Posted by:[/b] " + PosterName + "\n" + getSelection().toString() + "[/quote]" + $TextBoxBody.val().substring($TextBoxBody.attr("selectionStart"), $TextBoxBody.val().length));
    });
}

function HTML2BB(S)
{
    S = S.replace("<i>", "[i]", "g");
    S = S.replace("</i>", "[/i]", "g");
    S = S.replace("<b>", "[b]", "g");
    S = S.replace("</b>", "[/b]", "g");
    S = S.replace("<u>", "[i]", "g");
    S = S.replace("</u>", "[/i]", "g");
    S = S.replace("<br>", "\n", "g");
    S = S.replace(/<a.*href="(.*)".*?>(.*)<\/a>/gi, "[url=$1]$2[/url]");
    S = S.replace(/<a.*href="mailto:.*">(.*)<\/a>/gi, "[email]$1[/email]");
    S = S.replace(/<img.*\/>/gi, "")
    return S;
}

Main();