// ==UserScript==
// @name           Journal Saver
// @namespace      http://solitude12.deviantart.com/
// @description    For every new journal your write, it saves the body field for next time!
// @include        http://my.deviantart.com/journal/
// ==/UserScript==
document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/<input class=\"aside-right beacon\" name=\"Add\" value=\"Add\" type=\"submit\">/, '<input class="aside-right beacon" name="Add" value="Add" id="jsubmit" type="submit">');
document.getElementsByTagName('body')[0].innerHTML = document.getElementsByTagName('body')[0].innerHTML.replace(/<textarea name="body"(.*)><\/textarea>/, '<textarea id="jbody" name="body"$1></textarea>');
function storeSettings(){GM_setValue( 'jbody', unsafeWindow.document.getElementById('jbody').value );}function applySettings() {if ( document.getElementById('jbody').value=="" ) {document.getElementById('jbody').value = GM_getValue( 'jbody', "" );}}document.getElementById('jsubmit').addEventListener("click", storeSettings, false);applySettings();