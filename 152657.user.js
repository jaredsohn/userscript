// ==UserScript==
// @name        MTurk Great HIT Export
// @namespace   localhost
// @author      ThirdClassInternationalMasterTurker
// @description Export HIT description as vBulletin formatted text with turkopticon link and all relevant data
// @include     https://www.mturk.com/mturk/searchbar*
// @include     https://www.mturk.com/mturk/findhits*
// @include     https://www.mturk.com/mturk/viewhits*
// @include     https://www.mturk.com/mturk/viewsearchbar*
// @include     https://www.mturk.com/mturk/sortsearchbar*
// @include     https://www.mturk.com/mturk/sorthits*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @version     1.0
// @downloadURL https://userscripts.org/scripts/source/152657.user.js
// @updateURL   https://userscripts.org/scripts/source/152657.user.js
// ==/UserScript==

//
// 2012-11-19 0.2: Added customizable template
//
// 2012-11-20 0.3: Fixed: verifies that HIT link is correct
//
// 2012-11-26 0.4: Try to get requester and requesterId right even if some other script has changed the page.
//                 Added requester link to default template.
// 
// 2012-11-26 0.5: Partially works with Opera (No customisation)
//
// 2012-12-02 1.0: Added @downloadURL and @updateURL
//

(function ()
{
  var EDIT = false;
  var HITS = [];
  var HIT;

  DEFAULT_TEMPLATE  = '[b]Title:[/b] {title}\n';
  DEFAULT_TEMPLATE += '[b]Requester:[/b] [url=https://www.mturk.com/mturk/searchbar?selectedSearchType=hitgroups&requesterId={requesterId}][COLOR="blue"]{requester}[/COLOR][/url]';
  DEFAULT_TEMPLATE += ' [{requesterId}] ([url=http://turkopticon.differenceengines.com/{requesterId}][COLOR="blue"]TO[/COLOR][/url])';
  DEFAULT_TEMPLATE += '\n[b]Description:[/b] {description}';
  DEFAULT_TEMPLATE += '\n[b]Reward:[/b] {reward}';
  DEFAULT_TEMPLATE += '\n[b]Qualifications:[/b] {qualifications}';
  DEFAULT_TEMPLATE += '\n[b]Link:[/b] [url="{link}"][COLOR="blue"]{link}[/COLOR][/url]';
  DEFAULT_TEMPLATE += '\n[right][size=-2]Powered by non-amazonian script monkeys 😃[/size][/right]\n';

  var TEMPLATE;

  if (typeof GM_getValue === 'undefined')
    TEMPLATE = null;
  else
    TEMPLATE = GM_getValue('HITExport Template');
  if (TEMPLATE == null)
  {
    TEMPLATE = DEFAULT_TEMPLATE;
  }

  function get_requester_id(s) {
    var idx = 12 + s.search('requesterId=');
    return s.substr(idx);
  }

  function apply_template(hit_data)
  {
    var txt = TEMPLATE;
  
    var vars = ['title', 'requester', 'requesterId', 'description', 'reward', 'qualifications', 'link', 'time', 'hits_available'];
  
    for (var i=0; i<vars.length; i++)
    {
      t = new RegExp('\{' + vars[i] + '\}', 'g');
      txt = txt.replace(t, hit_data[vars[i]]);
    }  
    textarea.value = txt;
  }

  function export_func(item)
  {
    return function()
    {
      HIT = item;
      EDIT = false;
      edit_button.textContent = 'Edit Template';
      apply_template(HITS[HIT]);
      div.style.display = 'block';
      textarea.select();
    }
  }

  function hide_func(div)
  {
    return function()
    {
      if (EDIT == false)
        div.style.display = 'none';
    }  
  }

  function default_func()
  {
    return function()
    {
      GM_deleteValue('HITExport Template');
      TEMPLATE = DEFAULT_TEMPLATE;
      EDIT = false;
      edit_button.textContent = 'Edit Template';
      apply_template(HITS[HIT]);
    }  
  }


  function edit_func()
  {
    return function()
    {
      if (EDIT == true)
      {
        EDIT = false;
        TEMPLATE = textarea.value;
        edit_button.textContent = 'Edit Template';
        apply_template(HITS[HIT]);
      }
      else
      {
        EDIT = true;
        edit_button.textContent = 'Show Changes';
        save_button.disabled = false;
        textarea.value = TEMPLATE;
      }
    }  
  }

  function save_func()
  {
    return function()
    {
      if (EDIT)
        TEMPLATE = textarea.value;
      GM_setValue('HITExport Template', TEMPLATE);
    }  
  }

  for (var item=0; item<10; item++) {
    var tooltip = document.getElementById('requester.tooltip--' + item);
    if (tooltip == null)
      break; // no need to continue
    var titleElement = document.getElementById('capsule' + item + '-0');
    var requesterId = tooltip.parentNode.parentNode.getElementsByTagName('a');

    var hit_data = {};
    hit_data.title = titleElement.textContent.trim();

    for (var i=0; i<requesterId.length; i++)
    {
      if (requesterId[i].href.match(/requesterId=/))
      {
        hit_data.requesterId = get_requester_id(requesterId[i].href);
        hit_data.requester = requesterId[i].textContent.trim();
        break;
      }
    }

    hit_data.description = document.getElementById('description.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
    hit_data.reward = document.getElementById('reward.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
    hit_data.time = document.getElementById('duration_to_complete.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();
    hit_data.hits_available = document.getElementById('number_of_hits.tooltip--' + item).parentNode.parentNode.childNodes[3].textContent.trim();

    var linkElements = titleElement.parentNode.parentNode.getElementsByTagName('a');

    if (linkElements != null)
    for (var i=0; i<linkElements.length; i++)
    {
      if (linkElements[i] != null && linkElements[i].textContent == 'View a HIT in this group')
      {
        hit_data.link = linkElements[i].href;
        break;
      }
    }
  
    var qElements = document.getElementById('qualificationsRequired.tooltip--' + item).parentNode.parentNode.parentNode.getElementsByTagName('tr');

    var qualifications = [];
    for (var i=1; i<qElements.length; i++)
    {
      qualifications.push(qElements[i].childNodes[1].textContent.trim().replace(/\s+/g,' '));
    }  
    hit_data.qualifications = qualifications.join(', ');

    HITS[item] = hit_data;
  
    button = document.createElement('button');
    button.textContent = 'vB';
    button.title = 'Export this HIT description as vBulletin formatted text';

    button.style.height = '14px';
    button.style.width = '20px';
    button.style.fontSize = '8px';
    button.style.border = '1px solid';
    button.style.padding = '0px';
    button.style.backgroundColor = 'transparent';

    button.addEventListener("click", export_func(item), false);
    titleElement.parentNode.appendChild(button);
  }

  var div = document.createElement('div');
  var textarea = document.createElement('textarea');
  var div2 = document.createElement('label');

  div.style.position = 'fixed';
  div.style.width = '500px';
  div.style.height = '235px';
  div.style.left = '50%';
  div.style.right = '50%';
  div.style.margin = '-250px 0px 0px -250px';
  div.style.top = '300px';
  div.style.padding = '5px';
  div.style.border = '2px';
  div.style.backgroundColor = 'black';
  div.style.color = 'white';
  div.style.zIndex = '100';

  textarea.style.padding = '2px';
  textarea.style.width = '500px';
  textarea.style.height = '200px';
  textarea.title = '{title}\n{requester}\n{requesterId}\n{description}\n{reward}\n{qualifications}\n{link}\n{time}\n{hits_available}';

  div.textContent = 'Press Ctrl+C to copy to clipboard. Click textarea to close';
  div.style.fontSize = '12px';
  div.appendChild(textarea);
  div2.textContent += 'Powered by non-amazonian script monkeys 😃';
  div2.style.position = 'fixed';
  div2.style.right = '230px';
  div2.style.fontSize = '9px';

  var edit_button = document.createElement('button');
  var save_button = document.createElement('button');
  var default_button = document.createElement('button');

  edit_button.textContent = 'Edit Template';
  edit_button.setAttribute('id', 'edit_button');
  edit_button.style.height = '18px';
  edit_button.style.width = '100px';
  edit_button.style.fontSize = '10px';
  edit_button.style.paddingLeft = '3px';
  edit_button.style.paddingRight = '3px';
  edit_button.style.backgroundColor = 'white';
     
  save_button.textContent = 'Save Template';
  save_button.setAttribute('id', 'save_button');
  save_button.style.height = '18px';
  save_button.style.width = '100px';
  save_button.style.fontSize = '10px';
  save_button.style.paddingLeft = '3px';
  save_button.style.paddingRight = '3px';
  save_button.style.backgroundColor = 'white';
  save_button.style.marginLeft = '5px';

  default_button.textContent = ' D ';
  default_button.setAttribute('id', 'default_button');
  default_button.style.height = '18px';
  default_button.style.width = '20px';
  default_button.style.fontSize = '10px';
  default_button.style.paddingLeft = '3px';
  default_button.style.paddingRight = '3px';
  default_button.style.backgroundColor = 'white';
  default_button.style.marginLeft = '5px';
  default_button.title = 'Return default template';

      
  div.appendChild(edit_button);
  div.appendChild(save_button);
  div.appendChild(default_button);
  save_button.disabled = true;

  div.appendChild(div2);
  div.style.display = 'none';
  textarea.addEventListener("click", hide_func(div), false);
  edit_button.addEventListener("click", edit_func(), false);
  save_button.addEventListener("click", save_func(), false);
  default_button.addEventListener("click", default_func(), false);
  document.body.insertBefore(div,document.body.firstChild);
})();
