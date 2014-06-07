// ==UserScript==
// @name          stackoverflow comments formatting shortcuts
// @namespace     stackoverflow
// @description   Adds Ctrl+B (bold), Ctrl+I (italic), Ctrl+K (code), and Ctrl+L (link) keyboard shortcuts to comments.
// @include       http://stackoverflow.com/*
// @include       http://meta.stackoverflow.com/*
// @include       http://superuser.com/*
// @include       http://meta.superuser.com/*
// @include       http://serverfault.com/*
// @include       http://meta.serverfault.com/*
// @include       http://askubuntu.com/*
// @include       http://meta.askubuntu.com/*
// @include       http://answers.onstartups.com/*
// @include       http://meta.answers.onstartups.com/*
// @include       http://nothingtoinstall.com/*
// @include       http://meta.nothingtoinstall.com/*
// @include       http://seasonedadvice.com/*
// @include       http://meta.seasonedadvice.com/*
// @include       http://crossvalidated.com/*
// @include       http://askdifferent.com/*
// @include       http://meta.crossvalidated.com/*
// @include       http://stackapps.com/*
// @include       http://*.stackexchange.com/*
// @exclude       http://chat.stackexchange.com/*
// @exclude       http://api.*.stackexchange.com/*
// @exclude       http://data.stackexchange.com/*
// @exclude       http://area51.stackexchange.com/*
// @author        Kip Robinson - http://stackoverflow.com/users/18511/kip
// ==/UserScript==

(function(){
  function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 
  
  with_jquery(function($) {
    $('textarea[name=comment]').live('keydown', function(e) {
      //Ctrl+[BIKL]
      if(e.ctrlKey && !e.altKey && (e.which == 66 || e.which == 73 || e.which == 75 || e.which == 76))
      {
        //all text
        var text = $(this).val();
        
        //text before selection
        var before = text.substring(0,this.selectionStart);
        
        //selectect text
        var selected = text.substring(this.selectionStart,this.selectionEnd);
        
        //text after selection
        var after = text.substring(this.selectionEnd,text.length);
        
        //length of selection
        var selLen = selected.length;
        
        //markup character that will go before/after section. (Note: link is handled a bit differently.)
        var markup = '';
        var isLink = false;
        if(e.which == 66)
          markup = '**';
        else if(e.which == 73)
          markup = '*';
        else if(e.which == 75)
          markup = '`';
        else
          isLink = true;
        
        //markup length
        var mLen = markup.length;
        
        //replace is what the selected text will be replaced with
        var replace = '';
        if(selLen == 0)
        {
          //nothing selected. just print the markup
          if(isLink)
          {
            var url = prompt('Please input link URL');
            var linkText = prompt('Please input link text');
            replace = '[' + linkText + '](' + url + ')';
          }
          else
          {
            replace = markup;
          }
        }
        else if(!isLink && selLen > 2*mLen
                && selected.substring(0,mLen) == markup
                && selected.substring(selLen - mLen, selLen) == markup)
        {
          //We have selected something that starts and ends with the markup. We will remove the markup in
          //this case. For example, "*sometext*" becomes just "sometext". This is not available for links.
          replace = selected.substring(mLen, selLen - mLen);
        }
        else
        {
          //we have selected something. put the markup before and after it.
          if(isLink)
          {
            var url = prompt('Please input link URL');
            replace = '[' + selected + '](' + url + ')';
          }
          else
          {
            replace = markup + selected + markup;
          }
        }
        
        //now update the text
        $(this).val(before + replace + after);
        
        if(selLen > 0)
        {
          //if something was selected, make the result selected too.
          this.selectionStart = before.length;
          this.selectionEnd = before.length + replace.length;
        }
        else
        {
          //nothign was selected, so put the cursor at the end of the updated text.
          this.selectionEnd = this.selectionStart = before.length + replace.length;
        }
        
        e.stopPropagation(); //prevent bubbling (new-school)
        return false; //prevent bubbling (old-school)
      }
    });
  });
})();
