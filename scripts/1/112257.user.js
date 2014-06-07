// violinflashcards
// version 0.1
// 2010-07-12
// Copyright (c) 2011. inbar stingrayviolin@gmail.com 
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
    // ==UserScript==
    // @name           Stingray Violin
    // @namespace      http://www.violinflashcards.com/
    // @description    Display the notes on the fingerboard
    // @include        http://www.violinflashcards.com/*
    // ==/UserScript==
//    document.body.style.background = "green";
     
     
    var doInterval;
    function replaceSRC(){
      var allImg=document.getElementsByTagName("img"), i=0, img;
      while(img=allImg[i++])
      {

      }
    }
     
    doInterval = setInterval(replaceSRC,1000);
    replaceSRC();

