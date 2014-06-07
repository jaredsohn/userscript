// ==UserScript==
// @name        MTurk Requester Bookmarks
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Add quick links for your favourite requesters to MTurk dashboard
// @include     https://www.mturk.com/mturk/dashboard
// @include     https://www.mturk.com/mturk/searchbar*
// @include     https://www.mturk.com/mturk/findhits*
// @include     https://www.mturk.com/mturk/viewhits*
// @include     https://www.mturk.com/mturk/viewsearchbar*
// @include     https://www.mturk.com/mturk/sortsearchbar*
// @include     https://www.mturk.com/mturk/sorthits*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @version     0.2
// @downloadURL https://userscripts.org/scripts/source/153363.user.js
// @updateURL   https://userscripts.org/scripts/source/153363.user.js
// ==/UserScript==

//
// 2012-12-03 0.1: First public version
//
// 2012-12-05 0.2: You can now add any links as bookmark (Copy paste some
//                 custom search from browsers address bar for example) 
//

(function ()
{
  //GM_deleteValue('REQUESTER BOOKMARKS');  

  var add_div = null;
  var input1;
  var input2;
  

  function remove_bookmark(requester, requesterId)
  {
    var t = GM_getValue('REQUESTER BOOKMARKS');
    if (t == null || t == '')
      return;
    else
      t = t.split(';');

    var bookmarks = '';
    for (var i=0; i<t.length; i++)
    {
      var bm = t[i].split(',');
      if (bm[1] == requesterId)
      {
        t.splice(i,1);
        break;
      }
    }
    bookmarks = t.join(';');
    GM_setValue('REQUESTER BOOKMARKS', bookmarks);
  }

  function add_bookmark(requester, requesterId)
  {
    var t = GM_getValue('REQUESTER BOOKMARKS');
    if (t == null || t == '')
      t = '';
    else
      t += ';';

    if (t.match(requesterId))
      return;

    t += requester + ',' + requesterId;

    GM_setValue('REQUESTER BOOKMARKS', t);
  }
  
  function get_bookmarks()
  {
    var bookmarks = [];
    
    var t = GM_getValue('REQUESTER BOOKMARKS');
    if (t == null || t == '')
      return bookmarks;
    
    t = t.split(/,|;/);
    for (var i=0; i<t.length; i+=2)
    {
      var bm = document.createElement('div');
      var link = document.createElement('a');
      link.textContent = t[i];
      
      if (t[i+1].match(/^https:|^http:/) != null)
        link.href = t[i+1];
      else
        link.href = 'https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId=' + t[i+1];

      remove_button = document.createElement('button');
      remove_button.textContent = 'x';
      remove_button.title = 'Remove this link';

      remove_button.style.height = '14px';
      remove_button.style.width = '14px';
      remove_button.style.fontSize = '9px';
      remove_button.style.border = '1px solid';
      remove_button.style.padding = '0px';
      remove_button.style.backgroundColor = 'transparent';
      remove_button.style.marginRight = '5px';
      
      bm.style.width = '100%';
      bm.style.padding = '2px';
      
      bm.appendChild(remove_button);
      bm.appendChild(link);
      remove_button.addEventListener("click", remove_bookmark_func(t[i], t[i+1], bm), false);

      bookmarks.push(bm);
    }
    
    return bookmarks;
  }

  function add_bookmark_dialog()
  {
    if (add_div == null)
    {
      add_div = document.createElement('div');
      add_div.style.display = 'block';

      add_div.style.position = 'fixed';
      add_div.style.width = '500px';
      //add_div.style.height = '150px';
      add_div.style.left = '50%';
      add_div.style.right = '50%';
      add_div.style.margin = '-250px 0px 0px -250px';
      //add_div.style.top = '400px';
      add_div.style.bottom = '300px';
      add_div.style.padding = '10px';
      add_div.style.border = '2px';
      add_div.style.textAlign = 'center';
      add_div.style.verticalAlign = 'middle';
      add_div.style.borderStyle = 'solid';
      add_div.style.borderColor = 'black';
      add_div.style.backgroundColor = 'white';
      add_div.style.color = 'black';
      add_div.style.zIndex = '100';

      input1 = document.createElement('input');
      input2 = document.createElement('input');
      var label1 = document.createElement('label');
      var label2 = document.createElement('label');
      var label3 = document.createElement('label');

      label1.textContent = 'Requester Name:  ';
      label2.textContent = 'Requester Id/URL:';
      label3.textContent = 'Bookmark list will be updated when you reload dashboard page. ' +
                           'On second input field you can put requesterId or any full URL. ' +
                           '(for example: https://www.mturk.com)';

      var add_button = document.createElement('button');
      add_button.textContent = 'Add bookmark';
      add_button.addEventListener("click", dialog_close_func(true), false);
      add_button.style.margin = '5px';
      var cancel_button = document.createElement('button');
      cancel_button.textContent = 'Cancel';
      cancel_button.addEventListener("click", dialog_close_func(false), false);
      cancel_button.style.margin = '5px';

      add_div.appendChild(label3);
      add_div.appendChild(document.createElement('br'));
      add_div.appendChild(label1);
      add_div.appendChild(input1);
      add_div.appendChild(document.createElement('br'));
      add_div.appendChild(label2);
      add_div.appendChild(input2);
      add_div.appendChild(document.createElement('br'));
      add_div.appendChild(cancel_button);
      add_div.appendChild(add_button);
      document.body.appendChild(add_div);
    }
    else
    {
      add_div.style.display = 'block';
    }
  }

  function get_requester_id(s) {
    var idx = 12 + s.search('requesterId=');
    return s.substr(idx);
  }
  
  function dialog_close_func(save)
  {
    return function()
    {
      if (save && input1.value.length > 0 && input2.value.length > 0)
        add_bookmark(input1.value, input2.value);
      input1.value = '';
      input2.value = '';
      add_div.style.display = 'none';
    };
  }   
  
  function add_bookmark_func(requester, requesterId)
  {
    return function()
    {
      if (confirm('Add requester "' + requester + '" to your dashboard?') == true)
        add_bookmark(requester, requesterId);
    };  
  }  

  function remove_bookmark_func(requester, requesterId, bm_div)
  {
    return function()
    {
      if (confirm('Remove requester "' + requester + '" from your dashboard?') == true)
      {
        remove_bookmark(requester, requesterId);
        bm_div.textContent = 'REMOVED';
      }
    };  
  }  

  
  if (window.location.href == 'https://www.mturk.com/mturk/dashboard')
  {
    var footer = document.getElementsByClassName('footer_separator')[0];
    if (footer == null)
      return;
 
    var extra_table = document.createElement('table');
    extra_table.width = '700';
    extra_table.style.boder = '1px solid black';
    extra_table.align = 'center';
    extra_table.cellSpacing = '0px';
    extra_table.cellPadding = '0px';
  
    var row1 = document.createElement('tr');
    var row2 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var whatsthis = document.createElement('a');
    var add_button = document.createElement('button');  
  
    var content_td = [];
    content_td[0] = document.createElement('td');
    content_td[1] = document.createElement('td');
    content_td[2] = document.createElement('td');
  
    row1.style.height = '25px';
    td1.setAttribute('class', 'white_text_14_bold');
    td1.style.backgroundColor = '#7fb448';//'#7fb4cf';
    td1.style.paddingLeft = '10px';
    td1.colSpan = '2';
    td1.innerHTML = 'Bookmarks ';
    td2.setAttribute('class', 'white_text_14_bold');
    td2.style.backgroundColor = '#7fb448';//'#7fb4cf';
    td2.style.paddingRight = '10px';
    td2.style.textAlign = 'right';
    //td2.style.widht = '200px';
    
    content_td[0].setAttribute('class', 'container-content');  
    content_td[1].setAttribute('class', 'container-content');  
    content_td[2].setAttribute('class', 'container-content');  
    
    content_td[0].style.width = '33%';
    content_td[1].style.width = '34%';
    content_td[2].style.width = '33%';
    content_td[0].style.verticalAlign = 'top';
    content_td[1].style.verticalAlign = 'top';
    content_td[2].style.verticalAlign = 'top';
  
    whatsthis.href = 'http://userscripts.org/scripts/show/153363';
    whatsthis.setAttribute('class', 'whatis');
    whatsthis.textContent = '(What\'s this?)';
  
    add_button.textContent = 'add new bookmark';
    add_button.title = 'Add new bookmark';
    add_button.style.fontSize = '9px';
    add_button.style.border = '1px solid';
    add_button.style.padding = '0px';
    add_button.style.color = 'white';  
    add_button.style.textAlign = 'right';
    add_button.style.backgroundColor = 'transparent';  
    add_button.addEventListener("click", function() { add_bookmark_dialog(); }, false);

    extra_table.appendChild(row1);
    row1.appendChild(td1);
    row1.appendChild(td2);
    td1.appendChild(whatsthis);
    td2.appendChild(add_button);
    extra_table.appendChild(row2);
    row2.appendChild(content_td[0]);
    row2.appendChild(content_td[1]);
    row2.appendChild(content_td[2]);

    var l=0;
    var bookmarks = get_bookmarks();
    while (l<bookmarks.length)
    {
      content_td[(l+3)%3].appendChild(bookmarks[l]);
      l += 1;
    }
    if (bookmarks.length == 0)
    {
      content_td[0].style.width = '20%';
      content_td[1].style.width = '60%';
      content_td[2].style.width = '20%';
      content_td[1].textContent = 'Use \'+\'-buttons on HITs page to add new bookmarks'; 
      content_td[1].style.textAlign = 'center';
    }

    footer.parentNode.insertBefore(extra_table, footer);
  }
  else
  {
    for (var item=0; item<10; item++) {
      var tooltip = document.getElementById('requester.tooltip--' + item);
      if (tooltip == null)
        break; // no need to continue
      var titleElement = document.getElementById('capsule' + item + '-0');
      var elements = tooltip.parentNode.parentNode.getElementsByTagName('a');
      var requester;
      var requesterId;

      for (var i=0; i<elements.length; i++)
      {
        if (elements[i].href.match(/requesterId=/))
        {
          requesterId = get_requester_id(elements[i].href);
          requester = elements[i].textContent.trim();
          break;
        }
      }

      button = document.createElement('button');
      button.textContent = '+';
      button.title = 'Add link to your dashboard';
      button.style.height = '14px';
      button.style.width = '14px';
      button.style.fontSize = '8px';
      button.style.border = '1px solid';
      button.style.padding = '0px';
      button.style.backgroundColor = 'transparent';

      button.addEventListener("click", add_bookmark_func(requester, requesterId), false);
      titleElement.parentNode.appendChild(button);
    }
  }
  
})();
