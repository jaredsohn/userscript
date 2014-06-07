// ==UserScript==
// @name       Simulate trello clipboard
// @namespace  http://hxgdzyuyi.github.io/
// @version    0.1
// @description  默认 ctrl+c 复制网址
// @match      http://*/*
// @match      https://*/*
// @copyright  2012+, You
// ==/UserScript==

// copy from http://stackoverflow.com/questions/17527870/how-does-trello-access-the-users-clipboard/17528590?utm_source=javascriptweekly&utm_medium=email

var utils = {
  nodeName: function(node, name){
    return !!(node.nodeName.toLowerCase() === name)
  }
}
var textareaId = 'trello-clipboard'
  , containerId = textareaId + '-container'
  , container
  , textarea

var createTextarea = function(){
  container = document.querySelector('#' + containerId)
  if (!container) {
    container = document.createElement('div')
    container.id = containerId
    container.setAttribute('style', [
      , 'position: fixed;'
      , 'left: 0px;'
      , 'top: 0px;'
      , 'width: 0px;'
      , 'height: 0px;'
      , 'z-index: 100;'
      , 'opacity: 0;'
    ].join(''))
    document.body.appendChild(container)
  }
  container.style.display = 'block'
  textarea = document.createElement('textarea')
  textarea.setAttribute('style', [
    , 'width: 1px;'
    , 'height: 1px;'
    , 'padding: 0px;'
  ].join(''))
  textarea.id = textareaId
  container.innerHTML = ''
  container.appendChild(textarea)
  textarea.appendChild(document.createTextNode(location.href))
  textarea.focus()
  textarea.select()
}

var keyDonwMonitor = function(e){
  var code = e.keyCode || e.which;
  if (!(e.ctrlKey || e.metaKey) || code !== 67) {
    return
  }
  var target = e.target
  if (utils.nodeName(target, 'textarea')
    || utils.nodeName(target, 'input')) {
    return
  }
  if (window.getSelection
    && window.getSelection()
    && window.getSelection().toString()) {
    return
  }
  if (document.selection
    && document.selection.createRange().text) {
    return
  }
  setTimeout(createTextarea, 0)
}

var keyUpMonitor = function(e){
  var code = e.keyCode || e.which;
  if (e.target.id !== textareaId || code !== 67) { return }
  container.style.display = 'none'
}

document.addEventListener('keydown', keyDonwMonitor)
document.addEventListener('keyup', keyUpMonitor)