// ==UserScript== 
// @name Vote Me Not - quick save 
// @namespace http://karma.net.nz/ 
// @description Allows you to quickly save threads to votemenot.co.nz 
// @include http://www.trademe.co.nz/Community/MessageBoard/Messages.aspx* 
// ==/UserScript== 
// Embed a function into the page so it can be called by in-page scripts. 
function embedFunction(s) {
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function createElement(type, attributes){
  var node = document.createElement(type);
  for (var attr in attributes) {
    if (attributes.hasOwnProperty(attr)){
      node.setAttribute(attr, attributes[attr]);
    }
  }
  return node;
}

function createButton() {
  var div = createElement('div', {style: 'text-align:right;margin-bottom:-00px;'});
  
  var btn = createElement('input', {type: 'button', id: 'votemenot_btn',
                                    value: 'Save to VoteMeNot',
                                    onclick: 'sendRequest()'});
                                           
  var tbl1 = document.getElementById('mainContent');
  var tbl2 = tbl1.getElementsByTagName('table')[0];
  var h1 = tbl2.getElementsByTagName('h1')[0];
  

  div.appendChild(btn);
  h1.parentNode.insertBefore(div, h1.nextSibling);
}

function sendRequest() {
  var id = window.location.href.match(/id=(\d+)/)[1];
  
  var url = 'http://www.votemenot.co.nz/api.php?id='+id;
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  
  var btn = document.getElementById('votemenot_btn');
  btn.value = 'Saved!';
  btn.disabled = true;
}

embedFunction(sendRequest);
createButton();
