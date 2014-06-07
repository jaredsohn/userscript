// ==UserScript==
// @name           auto-completion of @replies in stackexchange comments
// @namespace      stackoverflow
// @description    Provides auto-completion of @replies in comments on Stack Exchange sites. Type "@" followed by the beginning of the username, then hit Ctrl+Space to auto-complete.
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
// ==/UserScript==

//Script "homepage": http://stackapps.com/questions/2341/auto-completion-of-user-name-for-replies-in-comments

(function(){
  function with_jquery(f) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + f.toString() + ")(jQuery)";
    document.body.appendChild(script);
  }; 
  
  with_jquery(function($)
  {
    var suffix = ': ';
    
    $('textarea[name=comment]').live('keypress', function(e) {
      if(!(e.ctrlKey && e.which == 0x20 && !e.altKey))
        return;
      
      //how far back from current cursor position to look for @ symbol
      var MAX_LEN = 15;
      if(this.selectionStart != this.selectionEnd)
        return;
      
      var cursor = this.selectionStart;
      var text = $(this).val();
      var before = text.substring(0, cursor);
      var after = text.substring(cursor, text.length);
      
      var names = getNames($(this));
      var started = '';
      
      //scan backwards through text before cursor, looking for @ symbol
      for(var i = before.length - 1; i>=0 && i>= before.length - MAX_LEN; i--)
      {
        if(before.charAt(i) == '@')
        {
          //started now contains the part of the user name that has been typed
          started = before.substring(i+1, before.length);
          break;
        }
      }
      
      var startedLen = started.length; //because this might change when anglicized...
      
      started = anglicize(started);
      started = started.replace(/\s+/g, ''); //remove all spaces
      
      if(started.length == 0)
        return;
      
      var matches = new Array();
      $.each(names, function() {
        if(startsWithIgnoreCase(anglicize(this.toString()), started))
          matches.push(this.toString());
      });
      
      if(matches.length < 1)
        return;
      
      var name = commonStartIgnoreCase(matches);
      
      before = before.substring(0, before.length - startedLen) + name;
      if(matches.length == 1)
        before += suffix;
      
      $(this).val(before + after);
      this.selectionStart = this.selectionEnd = before.length;
      return false;
    });
    
    //Get a list of names of users who have either asked this question, provided this
    //answer (if comment is left on an answer), or left a comment on this answer.
    function getNames($ta)
    {
      var names = $ta.data('names'); //array of user names
      if(names != undefined)
        return names;
      
      var names = new Array();
      
      //callback for $().each(). adds element's .text() to the names array
      var addName = function() {
        var name = $(this).text();
        
        name = name.replace('\u2666',''); //remove moderator diamond
        name = name.replace(/\s+/g, ''); //remove whitespace
        
        if(name == '')
          return;
        
        //if it's not in the list, add it
        if($.inArray(name, names) < 0)
          names.push(name);
      };
      
      //get the name of the person who asked this question
      $('.post-signature.owner>.user-info>.user-details>a[href^="/users/"]:first').each(addName);
      
      //get the name of the person who provided this answer (if comment is left on answer)
      var $ans = $ta.parents('.answer:first');
      $('.post-signature>.user-info>.user-details>a[href^="/users/"]', $ans).each(addName);
      
      //add each person active in this comment thread
      var $com = $ta.parents('.comments:first');
      $('.comment-user', $com).each(addName);
      
      //names.sort();
      
      //store list of names so we don't have to look it up again next time
      $ta.data('names', names);
      
      return names;
    }
    
    //Returns true if s starts with t, ignoring case
    function startsWithIgnoreCase(s, t)
    {
      if(typeof s != 'string')
        return false;
      if(typeof t != 'string')
        return false;
      
      s = s.toUpperCase();
      t = t.toUpperCase();
      
      if(t.length == 0)
        return true;
      if(s.length < t.length)
        return false;
      
      return s.substring(0, t.length) == t;
    }
    
    //Returns the common starting substring of all strings in the given array
    function commonStartIgnoreCase(matches)
    {
      if(matches.length < 1)
        return '';
      if(matches.length == 1)
        return matches[0];
      
      var ret = '';
      for(var i = 0; i < matches[0].length; i++)
      {
        var chr = matches[0].charAt(i).toUpperCase();
        var allMatch = true;
        for(var j = 1; allMatch && j < matches.length; j++)
          allMatch = (chr == matches[j].charAt(i).toUpperCase());
        
        if(allMatch)
          ret += matches[0].charAt(i);
        else
          break;
      }
      return ret;
    }
    
    //makes string englishier
    function anglicize(s)
    {
      var foreign = ['\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5'
                    ,'\u00c6'
                    ,'\u00c7'
                    ,'\u00c8\u00c9\u00ca\u00cb'
                    ,'\u00cc\u00cd\u00ce\u00cf'
                    ,'\u00d1'
                    ,'\u00d2\u00d3\u00d4\u00d5\u00d6\u00d8'
                    ,'\u00d9\u00da\u00db\u00dc'
                    ,'\u00dd'                  
                    ,'\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5'
                    ,'\u00e6'
                    ,'\u00e7'
                    ,'\u00e8\u00e9\u00ea\u00eb'
                    ,'\u00ec\u00ed\u00ee\u00ef'
                    ,'\u00f1'
                    ,'\u00f2\u00f3\u00f4\u00f5\u00f6\u00f8'
                    ,'\u00f9\u00fa\u00fb\u00fc'
                    ,'\u00fd\u00ff'
      ];
      
      var english = ['A'
                    ,'AE'
                    ,'C'
                    ,'E'
                    ,'I'
                    ,'N'
                    ,'O'
                    ,'U'
                    ,'Y'
                    ,'a'
                    ,'ae'
                    ,'c'
                    ,'e'
                    ,'i'
                    ,'n'
                    ,'o'
                    ,'u'
                    ,'y'
      ];
      
      for(var i = 0; i < foreign.length; i++)
        s = s.replace(new RegExp('[' + foreign[i] + ']', "g"), english[i]);
      
      return s;
    }
    
  });
})();
