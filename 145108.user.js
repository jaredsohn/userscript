// ==UserScript==
// @name      xtm-string-length
// @namespace     https://github.com/konsubuntu
// @description   Adds character length to source and target in XTM
// @include     https://www.xtm-cloud.com*/my-inbox-pages.action*
// @unwrap
// @grant       none
// @version     0.4
// ==/UserScript==

/**
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <henrik.willert@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * ----------------------------------------------------------------------------
 */
 
/**
 * Known Bug: 
 * The displayed string length is sometimes 
 * one keystroke behind the actual length.
 * Work around: Just press an arrow key to update.
 */
 
function initStringLength() {
  if (myParent = document.getElementById('myInboxIframe')) {
    if (myChild = myParent.contentDocument) {
      if (myChild = myChild.getElementById('editorIframeId')) {
        if (myFrame = myChild.contentDocument) {
          if (myFrame.getElementById("xtm-monkey-updateStringLengthFor")) {
            return;
          }
          if (mySourceElement = myFrame.getElementById('sourceContent0')) {
            script = document.createElement('script');
            script.setAttribute("type", "application/javascript");
            script.setAttribute("id", "xtm-monkey-updateStringLengthFor");
            script.appendChild(myFrame.createTextNode('' + updateStringLengthFor));
            myFrame.body.appendChild(script);
          }
          myIterator = 0;
          while (mySourceElement) {

            // We're trusting, that XTM got HTML escaped output
            myTargetLength = $("<div/>").html(myFrame.getElementById('content' + myIterator).innerHTML.trim()).text().length;
            mySourceLength = $("<div/>").html(mySourceElement.innerHTML.trim()).text().length;

            editorRow = 'editorRow' + myIterator;

            myDiv = document.createElement('div');
            myDiv.setAttribute('id', 'mySourceLength'+ myIterator);
            myDiv.setAttribute('style', 'color:grey;');
            myDiv.innerHTML = "String length: " + mySourceLength;
            myFrame.getElementById(editorRow).getElementsByClassName('source_editor')[0].appendChild(myDiv);
            
            myDiv = document.createElement('div');
            myDiv.setAttribute('id', 'myTargetLength'+ myIterator);
            myDiv.setAttribute('style', 'color:grey;');
            myDiv.innerHTML = "String length: " + myTargetLength;
            myFrame.getElementById(editorRow).getElementsByClassName('translate_editor')[0].appendChild(myDiv);
          
            
            oldOnKeyPress = myFrame.getElementById('content' + myIterator).getAttribute('onkeypress');
            myFrame.getElementById('content' + myIterator).setAttribute('onkeypress', oldOnKeyPress + 'updateStringLengthFor(' + myIterator + ');');

            myIterator++;
            mySourceElement = myFrame.getElementById('sourceContent' + myIterator);
          }
        }
      }
    }
  }
}

function updateStringLengthFor(line) {
  if (myContent = document.getElementById("content" + line)) {
    // We\'re trusting, that XTM got HTML escaped output 
    myContentLength = $("<div/>").html(document.getElementById("content" + line).innerHTML.trim()).text().length
    document.getElementById("myTargetLength" + line).innerHTML = "String length: " + myContentLength;
  }
};


script = document.createElement('script');
script.appendChild(document.createTextNode('' + updateStringLengthFor + initStringLength));
document.head.appendChild(script);


setInterval("initStringLength();", 5000);