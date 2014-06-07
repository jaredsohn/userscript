// ==UserScript==
// @name	Communities
// @description   Automatic addition of all communities in orkut (max 1000). Start the script by opening a community.
// @include	http://www.orkut.com/CommunityJoin.aspx?cmm=*
// @include	http://www.orkut.com/Community.aspx?cmm=*
// @include	http://www.orkut.com/CommPending.aspx?cmm=*
// ==/UserScript==
function submitForm(el, action, js) {
      var formelements = document.getElementsByTagName('form');
      var form = formelements[0];
      var node = document.createElement('input');
      node.setAttribute("type", "submit");
      node.setAttribute("name", "Action." + action);
      node.setAttribute("style", "display: none;");
      form.appendChild(node);
      node.click();
      form.removeChild(node);
}
function start() {
count = window.location.href.match(/[0-9]+/);
var str = "http://www.orkut.com/CommunityJoin.aspx?cmm=" + (++count);
window.location.href= str;
var fo = document.getElementsByTagName("form");
if (fo.length) {
submitForm(this, 'join', '');
}
}
window.addEventListener("load",start,"false");