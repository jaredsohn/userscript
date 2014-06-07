// ==UserScript==
// @name        Reddit_darkifier
// @namespace   http://localhost
// @description makes reddit darker
// @include     http://www*.reddit.com/*
// @exclude     http://www*.reddit.com/r/*/comments/*
// @version     1
// @grant       none
// @run-at      document-end
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==
   
    // spans
    var span_number, span_word;
    span_number = document.getElementsByClassName('number');
    span_word = document.getElementsByClassName('word');
    var h6 = document.body.getElementsByTagName('h6');
    
    
    var side_anzeige = 0;
    var hoverlinks = document.getElementsByClassName('hover');
    var side = document.body.getElementsByClassName('side');
    var side_spacer = document.body.getElementsByClassName('spacer');
    
        
    var body = document.body;
    var side = document.body.getElementsByClassName('side');
    var titellinks = document.body.getElementsByClassName('title');
    var kopfleiste = document.getElementById('header-bottom-left');
    var text = document.getElementsByClassName('md');
    // var odd_posts = document.getElementsByClassName('odd'); //Im anderen Script
    var commentarea = document.getElementsByClassName('commentarea');
    var p = document.getElementsByTagName('p');
    var headlinks = document.getElementsByTagName('ul');
    // var list_items = document.getElementsByTagName('li'); //Im anderen Script
    
    kopfleiste.style.position = 'relative';
    kopfleiste.style.backgroundColor = 'rgba(0,0,0,0.7)';
    body.style.backgroundColor = 'rgba(0,0,0,0.85)';
    var goldvertisement = document.getElementsByClassName('goldvertisement');
    
    // Node form erzeugen
    // var zNode = document.createElement('form');
    // zNode.innerHTML = '<label id="chk_text" style="margin-left:92%; color:#E6B800;"> <input type="checkbox" name="chk_show_side" id="show_side" style="vertical-align:bottom;" /><b>side anzeigen </b></label>';
    // zNode.setAttribute ('name', 'form_checkbox');
    kopfleiste.innerHTML = '<form name="form_checkbox"> <label id="chk_text" style="position:absolute; margin-top:1.87%; margin-left:67.5%; vertical-align:bottom; color:#E6B800;"> <input type="checkbox" name="chk_show_side" id="show_side" style="vertical-align:bottom;" /><b>Sidebar anzeigen </b></label></form>' + kopfleiste.innerHTML;
    // header.parentNode.insertBefore(zNode, header.nextSibling);
    
    for(var zae = 0; zae < goldvertisement.length; zae++)
    {    
        goldvertisement[zae].style.boxShadow = 'none';
        goldvertisement[zae].style.color = '#E6B800';
        goldvertisement[zae].style.border = '1px solid #E6B800';
    }

    for(var zal = 0; zal < p.length; zal++)
    {    
        p[zal].style.color = '#AAAAAA';
    }

    var div_nub = document.getElementsByClassName('nub');
    for(var tz = 0; tz < div_nub.length; tz++)
    {div_nub[tz].style.backgroundColor = 'rgb(45,45,45)';}
    

    
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
    
    for (var i = 0; i < side.length; i++)
    {
        side[i].style.backgroundColor = 'rgba(100,100,100,0.15)';
        side[i].style.display = 'none';
        side[i].style.color = '#999999';
    }

    for (var l = 0; l < text.length; l++)
    {
        text[l].style.color = '#999999';
    }
    // Side spans-verbessern
    for (var b = 0; b < span_number.length; b++)
    {
        span_number[b].color = '#999999';
    }
    // Side spans-verbessern
    for (var f = 0; f < span_number.length; f++)
    {
        span_word[f].color = '#999999';
    }

    for (var j = 0; j < titellinks.length; j++)
    {
        titellinks[j].style.color = '#E6B800';
    }
    for (var k = 0; k < headlinks.length; k++)
    {
        headlinks[k].style.color = 'rgba(0,0,0,0.7)';
    }
    for (var l = 0; l < commentarea.length; l++)
    {
        commentarea[l].style.backgroundColor = 'rgba(0,0,0,0.0)';
    }
    
    for (var m = 0; m < post_hintergrund.length; m++)
    {
        post_hintergrund[m].style.backgroundColor = 'rgba(0,0,0,0.5)';
        // post_hintergrund[m].style.color = '#E6B800';
    }


