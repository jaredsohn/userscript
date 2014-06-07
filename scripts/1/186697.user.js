// ==UserScript==
// @name        Reddit_darkifier_comment_section
// @namespace   http://localhost
// @include     http://www*.reddit.com/r/*/comments/*
// @version     1
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// @run-at      document-end
// ==/UserScript==

    // div-container u. body
    var body = document.body;
    var odd_posts = document.getElementsByClassName('odd');
    var linkinfo = document.getElementsByClassName('linkinfo');
    var kopfleiste = document.getElementById('header-bottom-left');
    var side = document.body.getElementsByClassName('side');
    var side_spacer = document.body.getElementsByClassName('spacer');
    var sitetable = document.getElementById('siteTable');
    var header = document.getElementById('header');
    var div_nub = document.getElementsByClassName('nub');

    // Text
    var titellinks = document.body.getElementsByClassName('title');
    var hoverlinks = document.getElementsByClassName('hover');
    var text = document.getElementsByClassName('md');
    var h6 = document.body.getElementsByTagName('h6');
    var list_items = document.getElementsByTagName('li');

    // spans
    var span_number, span_word;
    span_number = document.getElementsByClassName('number');
    span_word = document.getElementsByClassName('word');

    // Variablen
    var side_anzeige = 0;
 
    // Button erzeugen
    kopfleiste.innerHTML = '<form name="form_checkbox"> <label id="chk_text" style="position:absolute; margin-top:3.6%; margin-left:67.5%; vertical-align:bottom; color:#E6B800;"> <input type="checkbox" name="chk_show_side" id="show_side" style="vertical-align:bottom;" /><b>Sidebar anzeigen </b></label></form>' + kopfleiste.innerHTML;
    
    //Side Anzeigen/Ausblenden
    $('#show_side').click(function ()
     {        
         var chkbx = document.getElementById('show_side');
         var chk_text = document.getElementById('chk_text');
         
         if(side_anzeige == 0)    
         {
              for (var z = 0; z < side.length; z++)
              {
                  // chkbx.style.display = 'none';
                  // chk_text.style.display = 'none';
                  side[z].style.display = 'block';
              } 
             
              for(var test = 0; test < h6.length; test++)
              {
                  h6[test].style.display = 'none';
              }
             
          side_anzeige = 1;
             
         } 
         
         else 
         {
              for (var y = 0; y < side.length; y++)
              {
                  side[y].style.display = 'none';
              }
             
              for(var test1 = 0; test1 < h6.length; test1++)
              {
                   h6[test1].style.display = 'block';
              }
             
            side_anzeige = 0;
         }
    });
    
    // Basic background colors
    body.style.backgroundColor = 'rgba(0,0,0,0.85)';
    kopfleiste.style.backgroundColor = 'rgba(0,0,0,0.7)';
    kopfleiste.style.position = 'relative';
         
    for (var i = 0; i < side.length; i++)
    {
        side[i].style.backgroundColor = 'rgb(45,45,45)';
        side[i].style.display = 'none';
    }

    for (var c = 0; c < side_spacer.length; c++)
    {
        side_spacer[c].style.backgroundColor = 'rgba(0,0,0,0.25)';
    }
    
    for (var m = 0; m < odd_posts.length; m++)
    {
        odd_posts[m].style.backgroundColor = 'rgba(0,0,0,0.2)';
    }

    for(var zae = 0; zae < linkinfo.length; zae++)
    {
       linkinfo[zae].style.backgroundColor = 'rgba(100,120,110,0.2)';
    }

    for(var tz = 0; tz < div_nub.length; tz++)
    {
        div_nub[tz].style.backgroundColor = 'rgb(45,45,45)';
    }

    //Basic font colors
    for (var j = 0; j < titellinks.length; j++)
    {
        titellinks[j].style.color = '#E6B800';
    }

    for (var l = 0; l < text.length; l++)
    {
        text[l].style.color = '#999999';
    }

    for (var n = 0; n < list_items.length; n++)
    {
        list_items[n].style.color = '#82B09D';
    }

    for (var va = 0; va < side.length; va++)
    {
        side[va].style.color = '#999999';
    }
    
    // Side spans-verbessern
    for (var b = 0; b < span_number.length; b++)
    {
        span_number[b].color = '#009999';
    }

    // Side spans-verbessern
    for (var f = 0; f < span_number.length; f++)
    {
        span_word[f].color = '#009999';
    }
    
    // side Hoverlinks
    for (var v = 0; v < hoverlinks.length; v++)
    {
        hoverlinks[v].style.color = '#E6B800';
    }
    

    

