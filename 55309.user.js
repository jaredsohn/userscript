// ==UserScript==
// @name          Preview in Bugzilla
// @namespace     http://userscripts.org/scripts/show/55309
// @version       0.2
// @description   Adds preview to bugzilla.mozilla.org.
// @include       https://bugzilla.mozilla.org/enter_bug.cgi?*
// @include       https://bugzilla.mozilla.org/show_bug.cgi?*
// @include       https://bugzilla.mozilla.org/post_bug.cgi
// @include       https://bugzilla.mozilla.org/attachment.cgi?*
// @include       https://bugzilla.mozilla.org/attachment.cgi
// @include       https://bugzilla.mozilla.org/process_bug.cgi
// @include       https://landfill.bugzilla.org/*/enter_bug.cgi?*
// @include       https://landfill.bugzilla.org/*/show_bug.cgi?*
// @include       https://landfill.bugzilla.org/*/post_bug.cgi
// @include       https://landfill.bugzilla.org/*/attachment.cgi?*
// @include       https://landfill.bugzilla.org/*/attachment.cgi
// @include       https://landfill.bugzilla.org/*/process_bug.cgi
// @license       This program is in the public domain.
// ==/UserScript==

void function(){
  // vvv Configuration vvv
  var ENABLED_BY_DEFAULT = false;
  var DIRTY_TIMEOUT = 500; // Length of wait in milliseconds
  // ^^^ Configuration ^^^

  function encodeAsFormValue(s)
  {
    return s.replace(/[\x00-\x1F!\"#\$%&\'\(\)\*\+,\/\:;<=>\?@\[\\\]\^`\{\|\}]/g, function(str){
      var code = str.charCodeAt(0);
      if (code <= 0x0F)
        return '%0' + code.toString(16);
      else
        return '%' + code.toString(16);
    }).replace(/ /g, '+');
  }

  var ENTITIES = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '\"',
    apos: '\''
  };
  function decodeEntityReferences(html)
  {
    return html.replace(/&(?:#(?:x([0-9A-Fa-f]+)|([0-9]+))|([a-z]+));/g, function(str, hex, dec, entityName){
      if (hex)
        return String.fromCharCode('0x' + hex);
      else if (dec)
        return String.fromCharCode(dec);
      else
      {
        if (ENTITIES[entityName])
          return ENTITIES[entityName];
        else
          return '';
      }
    });
  }

  function sendXHRWithContinuation(xhr, body, oncomplete)
  {
    function onreadystatechange(event) {
      if (xhr.readyState == 4)
      {
        xhr.removeEventListener('readystatechange', onreadystatechange, false);
        oncomplete(event);
      }
    }
    xhr.addEventListener('readystatechange', onreadystatechange, false);
    xhr.send(body);
  }

  function findAncestor(node, tagName)
  {
    tagName = tagName.toUpperCase();
    for (node = node.parentNode; node && node.tagName.toUpperCase() != tagName; node = node.parentNode)
      ;
    return node;
  }

  var commentArea = document.getElementById('comment');
  var commitBtn = document.getElementById('commit') || document.getElementById('create') || document.getElementById('update');
  if (!commentArea || !commitBtn)
    return;

  var previewCheckbox = document.createElement('input');
  previewCheckbox.type = 'checkbox';
  previewCheckbox.id = 'preview-checkbox';
  var messageDiv = document.createElement('div');
  messageDiv.style.display = 'none';
  var previewArea = document.createElement('pre');
  previewArea.style.display = 'none';
  var ancestorTr = findAncestor(commentArea, 'tr');
  var ancestorTable = findAncestor(ancestorTr, 'table');
  if (document.evaluate('th', ancestorTr, null, XPathResult.BOOLEAN_TYPE, null).booleanValue)
  {
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(previewCheckbox);
    var label = document.createElement('label');
    label.htmlFor = 'preview-checkbox';
    label.appendChild(document.createTextNode('Preview:'));
    th.appendChild(label);
    tr.appendChild(th);
    var td = document.createElement('td');
    td.appendChild(messageDiv);
    td.appendChild(previewArea);
    tr.appendChild(td);
    tbody.appendChild(tr);
    ancestorTable.appendChild(tbody);
  }
  else
  {
    var tbody = document.createElement('tbody');
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    if (document.evaluate('count(td)', ancestorTr, null, XPathResult.NUMBER_TYPE, null).numberValue == 2)
      td.colSpan = 2;
    var previewHeading = document.createElement('div');
    previewHeading.appendChild(previewCheckbox);
    var label = document.createElement('label');
    label.htmlFor = 'preview-checkbox';
    with ({elem: document.createElement('b')})
    {
      elem.appendChild(document.createTextNode('Preview'));
      label.appendChild(elem);
    }
    label.appendChild(document.createTextNode(':'));
    previewHeading.appendChild(label);
    td.appendChild(previewHeading);
    td.appendChild(messageDiv);
    td.appendChild(previewArea);
    tr.appendChild(td);
    tbody.appendChild(tr);
    ancestorTable.appendChild(tbody);
  }

  var enabled = false;
  var timerId = null;
  var xhr = null;
  var error = false;
  var previewSource;
  var aborted = false;
  function updatePreview()
  {
    if (xhr)
    {
      GM_log('updatePreview is called while xhr != null', 2);
      return;
    }
    var text = commentArea.value;
    if (text == previewSource)
    {
      messageDiv.style.display = 'none';
      messageDiv.textContent = '';
    }
    else if (text == '')
    {
      previewSource = '';
      messageDiv.style.display = 'none';
      messageDiv.innerHTML = '';
      previewArea.innerHTML = '';
      previewArea.style.display= '';
    }
    else
    {
      xhr = new XMLHttpRequest();
      xhr.open('POST', 'page.cgi', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      sendXHRWithContinuation(xhr, 'id=linked.html&text=' + encodeAsFormValue(text),
        function() {
          if (aborted)
          {
            aborted = false;
            return;
          }
          if (xhr.status == 200 || xhr.status == 0)
          {
            // Parse HTML in a VERY ad-hoc way (until bug 102699 is fixed?)
            // previewArea.textContent = xhr.responseText; // For debug
            var match = xhr.responseText.match(/<pre class="bz_comment_text">([^<]*)<\/pre>/);
            if (match)
            {
              previewSource = text;
              messageDiv.style.display = 'none';
              messageDiv.innerHTML = '';
              previewArea.innerHTML = decodeEntityReferences(match[1]);
              previewArea.style.display= '';
              xhr = null;
              return;
            }
          }
          messageDiv.textContent = 'retrieval failed.';
          messageDiv.style.display = '';
          previewArea.style.display= 'none';
          previewArea.innerHTML = '';
          xhr = null;
          error = true;
        });
    }
  }
  function enablePreview()
  {
    if (enabled)
      return;
    enabled = true;
    previewSource = null;
    updatePreview();
  }
  function cancelTimer()
  {
    if (timerId != null)
    {
      clearTimeout(timerId);
      timerId = null;
    }
  }
  function markAsDirty()
  {
    // GM_log('commentArea.oninput');
    if (enabled && !error)
    {
      cancelTimer();
      if (xhr)
      {
        aborted = true;
        xhr.abort();
        if (aborted)
          GM_log('commentArea.oninput: aborted is not cleared', 2);
        xhr = null;
      }
      timerId = setTimeout(updatePreview, DIRTY_TIMEOUT);
    }
  }
  commentArea.addEventListener('input', markAsDirty, false);
  var commentsSection = document.getElementById('comments');
  if (commentsSection)
  {
    // Register an event handler on an ancestor of the target of the click event
    // for the bubbling phase so that our handler is called *after* the original handler.
    commentsSection.addEventListener('click', function(event){
      var target = event.target;
      if (target)
      {
        var onclickAttr = target.getAttribute('onclick');
        if (onclickAttr && onclickAttr.indexOf('replyToComment(') >= 0)
          markAsDirty();
      }
    }, false);
  }
  if (ENABLED_BY_DEFAULT)
  {
    previewCheckbox.checked = true;
    enablePreview();
  }
  previewCheckbox.addEventListener('click', function() {
    // GM_log('previewCheckbox.onclick');
    if (enabled)
    {
      cancelTimer();
      if (xhr)
      {
        aborted = true;
        xhr.abort();
        if (aborted)
          GM_log('previewCheckbox.onclick: aborted is not cleared', 2);
        xhr = null;
      }
      previewSource = null;
      messageDiv.style.display = 'none';
      messageDiv.innerHTML = '';
      previewArea.style.display= 'none';
      previewArea.innerHTML = '';
      enabled = false;
    }
    else
      enablePreview();
  }, false);
}();

/*
   Implementation notes:

   At any moment, the preview is one of the following 5 states:
   * Disabled: User has chosen not to show preview.
   * Clean: Preview is shown and it corresponds to the current content of the textarea.
   * Dirty: The textarea has been changed; request to server has not been sent; timer is set.
   * Sent: Request to server has been sent; waiting for the response.
   * Error: Server has returned an error or an unrecognizable response.

   Switching between Disabled and the other states can be made only by user action.
   If user enables preview (this implies the state is Disabled):
   * If the textarea is empty, set the preview source to empty and switch to Clean.
   * Otherwise, set the preview source to null (which is not equal to any string), send the request and switch to Sent.
   If user changed the content of textarea:
   * If the state is Dirty, kill the current timer and set a fresh timer.
   * If the state is Clean, set a timer and switch to Dirty.
   * If the state is Sent, abort the request, set a timer and switch to Dirty.
   * Otherwise, nothing happens.
   If the timer fires (this implies the state is Dirty):
   * If the content of textarea is equal to the preview source, switch to Clean.
   * If the textarea is empty, set the preview source to empty, clear the preview and switch to Clean.
   * Otherwise, send the request and switch to Sent.
   If the request is finished (this implies the state is Sent):
   * If this is a result of the call of abort(), do nothing.
   * If the result is error or the response cannot be parsed, switch to Error.
   * Otherwise, update the preview and the preview source and switch to Clean.
   If user disables preview:
   * If the state is Sent, abort the request and switch to Disabled.
   * Otherwise, switch to Disabled.
 */
