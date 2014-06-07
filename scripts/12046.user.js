// ==UserScript==
// @name           ALC Search Popup
// @version        0.3.1
// @description    Search a selection in SPACE ALC and do popup of results.
// @author         Shinya
// @namespace      http://www.code-404.net/
// @compatibility  Firefox 2.0 3.0
// @include        *
// @Note           Can't move popup area if the page's MIME type is "application/xhtml+xml". X-<
// ==/UserScript==

(function(){
  var searchALC = {
    
    // == Key config ==========
    useCtrl:  false,
    useShift: false,
    useAlt:   true,
    startKey: "w",
    // == Key config end ======
    
    term: "",
    popupX: -1,
    popupY: -1,
    
    init: function(){
      document.addEventListener("keydown", searchALC.keyCheck, false);
      document.addEventListener("mouseup", searchALC.isToggle, false);
    },
    
    keyCheck: function(event){
      if(!(event.ctrlKey == searchALC.useCtrl &&
        event.shiftKey == searchALC.useShift &&
        event.altKey == searchALC.useAlt &&
        String.fromCharCode(event.keyCode).toLowerCase() == searchALC.startKey.toLowerCase())) return;
      var word = searchALC.wordCheck();
      if(!word) return;
      searchALC.request(event, word);
      event.preventDefault();
    },
    
    isToggle: function(event){
      if(event.button != 0) return;
      var toggle = GM_getValue("toggle", false);
      if(toggle) return;
      var word = searchALC.wordCheck();
      if(!word || !word.match(/^[\w\.\!\' -]+$/)) return;
      searchALC.request(event, word);
    },
    
    wordCheck: function(){
      var word = window.getSelection().toString();
      word = word.replace(/\u3000/g, " "); // Multi-byte space
      word = word.replace(/^ +/, "");
      word = word.replace(/ +$/, "");
      if (!word || word == "" || word.toLowerCase() == searchALC.term.toLowerCase()) return null;
      return word;
    },
    
    request: function(event, word){
      searchALC.term = word;
      
      areaElement.createPopup(word);
      areaElement.loading(true, document.getElementById("alc-search-popup"));
      
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://eow.alc.co.jp/" + encodeURIComponent(word) + "/UTF-8/",
        onload: function(response){
          var popup = document.getElementById("alc-search-result");
          if(!popup){
            areaElement.createPopup(word);
            areaElement.loading(true, document.getElementById("alc-search-popup"));
            popup = document.getElementById("alc-search-result");
          }
          
          var temp = document.createElement("div");
          try{
            temp.innerHTML = unescape(escape(response.responseText).match(/%3Cul%3E.*%3C\/ul%3E/i));
          }
          catch(error){
          }
          
          var result;
          if(temp.firstChild == null){
            result = document.createElement("p");
            var invalidLink = document.createElement("a");
            invalidLink.setAttribute("href", "http://eow.alc.co.jp/" + encodeURIComponent(word) + "/UTF-8/");
            invalidLink.appendChild(document.createTextNode(word));
            result.appendChild(invalidLink);
            result.appendChild(document.createTextNode(": Invalid Page."));
          }
          else if($X(".//x:ul[1]/x:ul", temp)[0] != null){
            result = document.createElement("p");
            result.appendChild(document.createTextNode(word + ": Not Found."));
          }
          else {
            result = $X(".//x:ul[1]", temp)[0];
            var external = $X(".//x:a[@target]", result);
            for(var i = 0, l = external.length; i < l; i++){
              external[i].removeAttribute("target");
            }
            var fullLink = $X(".//x:a[starts-with(@href, 'javascript')]", result);
            for(var i = 0, l = fullLink.length; i < l; i++){
              // javascript:goFullText("MB000625", "1700035")
              var query = fullLink[i].getAttribute("href").match(/goFullText\(\"([\w-]+)\"\, \"(\d+)\"\)/);
              if(query != null){
                fullLink[i].setAttribute(
                  "href",
                  "http://eow.alc.co.jp/" + encodeURIComponent(word) + "/UTF-8/?ref=ex&exp="
                  + query[1] + "&dn=" + query[2] + "&dk=EJ"
                );
              }
            }
          }
          
          if(popup.firstChild.id == "alc-search-powered"){
            try{
              popup.insertBefore(result, popup.firstChild);
            }
            catch(error){
              areaElement.removePopup();
              return;
            }
          }
          else {
            popup.replaceChild(result, popup.firstChild);
          }
          
          if(popup.scrollHeight > 400){
            popup.scrollTop = 0;
          }
          
          areaElement.loading(false, document.getElementById("alc-search-popup"));
        },
      });
    },
  }
  
  var areaElement = {
    createPopup: function(word){
      var showing = document.getElementById("alc-search-popup");
      if(showing == null){
        // CSS
        var css = document.createElement("link");
        css.setAttribute("id", "alc-search-css");
        css.setAttribute("rel", "stylesheet");
        css.setAttribute("type", "text/css");
        css.setAttribute("href", "data:text/css;base64,QGNoYXJzZXQgInV0Zi04IjsKCiNhbGMtc2VhcmNoLXBvcHVwIHsKCW1hcmdpbjogMDsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDFweCBkb3R0ZWQgIzAwMDsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJY29sb3I6ICMwMDA7Cglmb250LWZhbWlseTogIkx1Y2lkYSBTYW5zIFVuaWNvZGUiLCAiTVMgVUkgR290aGljIiwgQXJpYWwsICKCbIJyIIJvg1ODVoNig04iLCBPc2FrYSwgc2Fucy1zZXJpZjsKCWZvbnQtc2l6ZTogMTAwJTsKCWxpbmUtaGVpZ2h0OiAxOwoJbGV0dGVyLXNwYWNpbmc6IDFweDsKCW92ZXJmbG93OiBoaWRkZW47Cglwb3NpdGlvbjogZml4ZWQ7Cgl0b3A6IDVweDsKCXJpZ2h0OiA1cHg7Cgl3aWR0aDogNDAwcHg7CgltYXgtd2lkdGg6IDQwMHB4OwoJbWluLXdpZHRoOiA0MDBweDsKCWhlaWdodDogNDIxcHg7Cgl6LWluZGV4OiAxMDAwMDsKfQoKI2FsYy1zZWFyY2gtdGl0bGUgewoJbWFyZ2luOiAwOwoJcGFkZGluZzogMDsKCWJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgIzAwMDsKCWJhY2tncm91bmQ6ICNlZWU7Cgljb2xvcjogIzAwMDsKCXRleHQtYWxpZ246IGxlZnQ7Cgl2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOwoJY3Vyc29yOiBtb3ZlOwoJb3ZlcmZsb3c6IGhpZGRlbjsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogMHB4OwoJbGVmdDogMHB4OwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDIwcHg7Cgl6LWluZGV4OiAxMDAwMTsKCW9wYWNpdHk6IDAuOTsKfQoKI2FsYy1zZWFyY2gtdGV4dCB7CgltYXJnaW46IC00LjVwdCAwcHQgMHB0IDBwdDsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDAgbm9uZTsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJY29sb3I6ICMwMDA7Cglmb250LXNpemU6IDlwdDsKCWxpbmUtaGVpZ2h0OiAxOwoJZm9udC13ZWlnaHQ6IGJvbGQ7Cgl0ZXh0LWFsaWduOiBsZWZ0OwoJdmVydGljYWwtYWxpZ246IG1pZGRsZTsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogNTAlOwoJbGVmdDogMTBweDsKCXotaW5kZXg6IDEwMDAyOwp9CgojYWxjLXNlYXJjaC1jbG9zZSB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwOwoJY3Vyc29yOiBwb2ludGVyOwoJb3ZlcmZsb3c6IGhpZGRlbjsKCXBvc2l0aW9uOiBhYnNvbHV0ZTsKCXRvcDogMDsKCXJpZ2h0OiAxMHB4OwoJd2lkdGg6IDIwcHg7CgltYXgtd2lkdGg6IDIwcHg7CgltaW4td2lkdGg6IDIwcHg7CgloZWlnaHQ6IDE1cHg7Cgl6LWluZGV4OiAxMDAwMzsKfQoKI2FsYy1zZWFyY2gtYnV0dG9uIHsKCW1hcmdpbjogMDsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDAgbm9uZTsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJY29sb3I6ICMwMDA7Cglmb250LXNpemU6IDEwMCU7CglsaW5lLWhlaWdodDogMTsKCXZlcnRpY2FsLWFsaWduOiB0b3A7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiAjZmZmOwoJdGV4dC1hbGlnbjogbGVmdDsKCWNvbG9yOiAjMDAwOwoJZm9udC1zaXplOiAxMnB0OwoJbGluZS1oZWlnaHQ6IDEuNTsKCW92ZXJmbG93OiBhdXRvOwoJcG9zaXRpb246IGFic29sdXRlOwoJdG9wOiAyMXB4OwoJbGVmdDogMHB4OwoJd2lkdGg6IDEwMCU7CgloZWlnaHQ6IDQwMHB4OwoJei1pbmRleDogMTAwMDM7CglvcGFjaXR5OiAwLjk7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCB1bCB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwOwoJZm9udC1zaXplOiAxMDAlOwoJbGluZS1oZWlnaHQ6IDEuNTsKfQoKI2FsYy1zZWFyY2gtcmVzdWx0IHVsIGxpIHsKCW1hcmdpbjogLjdlbSAuN2VtIC43ZW0gMS41ZW07CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwOwoJZm9udC1zaXplOiAxMDAlOwoJbGluZS1oZWlnaHQ6IDEuNTsKCWxpc3Qtc3R5bGU6IGRpc2Mgb3V0c2lkZTsKfQoKI2FsYy1zZWFyY2gtcmVzdWx0IHAgewoJbWFyZ2luOiAuN2VtOwoJcGFkZGluZzogMDsKCWJvcmRlcjogMCBub25lOwoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7Cgljb2xvcjogIzAwMDsKCWZvbnQtc2l6ZTogMTAwJTsKCWxpbmUtaGVpZ2h0OiAxLjU7Cgl0ZXh0LWFsaWduOiBjZW50ZXI7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCBmb250LAojYWxjLXNlYXJjaC1yZXN1bHQgc3BhbiwKI2FsYy1zZWFyY2gtcmVzdWx0IHN0cm9uZyB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7Cglmb250LXNpemU6IDEwMCU7CglsaW5lLWhlaWdodDogMTsKfQoKI2FsYy1zZWFyY2gtcmVzdWx0IHN0cm9uZyB7Cglmb250LXdlaWdodDogYm9sZDsKfQoKI2FsYy1zZWFyY2gtcmVzdWx0IHVsIGxpIHNwYW4ubWlkYXNoaSB7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwMDhCOwoJZm9udC13ZWlnaHQ6IGJvbGQ7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCB1bCBsaSBmb250LnNlYXJjaHdvcmRmb250IHsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJY29sb3I6ICNiZjAwMDA7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCB1bCBsaSBkaXYgewoJbWFyZ2luOiAwZW0gMGVtIDBlbSAuNWVtOwoJcGFkZGluZzogMDsKCWJvcmRlcjogMCBub25lOwoJYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7Cgljb2xvcjogIzAwMDsKCWZvbnQtc2l6ZTogMTAwJTsKCWxpbmUtaGVpZ2h0OiAxLjU7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCBvbCB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwOwoJZm9udC1zaXplOiAxMDAlOwoJbGluZS1oZWlnaHQ6IDEuNTsKfQoKI2FsYy1zZWFyY2gtcmVzdWx0IG9sIGxpIHsKCW1hcmdpbjogLjNlbSAwZW0gLjNlbSAxLjVlbTsKCXBhZGRpbmc6IDA7Cglib3JkZXI6IDAgbm9uZTsKCWJhY2tncm91bmQ6IHRyYW5zcGFyZW50OwoJY29sb3I6ICMwMDA7Cglmb250LXNpemU6IDEwMCU7CglsaW5lLWhlaWdodDogMS41OwoJbGlzdC1zdHlsZTogZGVjaW1hbCBvdXRzaWRlOwp9CgojYWxjLXNlYXJjaC1yZXN1bHQgYSB7CgltYXJnaW46IDA7CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7Cglmb250LXNpemU6IDEwMCU7CglsaW5lLWhlaWdodDogMTsKCXRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lOwoJY3Vyc29yOiBwb2ludGVyOwp9CgojYWxjLXNlYXJjaC1yZXN1bHQgYTo6YmVmb3JlLAojYWxjLXNlYXJjaC1yZXN1bHQgYTo6YWZ0ZXIgewoJY29udGVudDogIiI7Cn0KCiNhbGMtc2VhcmNoLXJlc3VsdCBhOmxpbmsgewoJY29sb3I6ICMzMGY7CgliYWNrZ3JvdW5kOiBub25lOwp9CgojYWxjLXNlYXJjaC1yZXN1bHQgYTp2aXNpdGVkIHsKCWNvbG9yOiAjOTBjOwoJYmFja2dyb3VuZDogbm9uZTsKfQoKI2FsYy1zZWFyY2gtcG93ZXJlZCB7CgltYXJnaW46IC43ZW07CglwYWRkaW5nOiAwOwoJYm9yZGVyOiAwIG5vbmU7CgliYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsKCWNvbG9yOiAjMDAwOwoJZm9udC1zaXplOiA5cHQ7CglsaW5lLWhlaWdodDogMTsKCWZvbnQtc3R5bGU6IG5vcm1hbDsKCXRleHQtYWxpZ246IHJpZ2h0Owp9CgojYWxjLXNlYXJjaC1sb2FkaW5nIHsKCW1hcmdpbjogMDsKCXBhZGRpbmc6IDA7CgliYWNrZ3JvdW5kOiAjMDAwIHVybChkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhJQUFnQVBVQUFQJTJGJTJGJTJGd0FBQVByNiUyQnNURXhPam82UER3OE5EUTBINSUyQmZwcWFtdmIyOXVibTV2ejglMkZKS1Nrb2FHaHVMaTRyaTR1S0Nnb096czdLNnVydHpjM0Q0JTJCUGxaV1ZtQmdZSHg4Zktpb3FPN3U3a3BLU214c2JBd01EQUFBQU03T3pzakl5TmpZMkN3c0xGNWVYaDRlSGt4TVRMQ3dzQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFDSCUyRkMwNUZWRk5EUVZCRk1pNHdBd0VBQUFBaCUyRmhwRGNtVmhkR1ZrSUhkcGRHZ2dZV3BoZUd4dllXUXVhVzVtYndBaCUyQlFRSkNnQUFBQ3dBQUFBQUlBQWdBQUFHJTJGMENBY0Vna0ZqZ2NSM0hKSkU0U3hFR25NeWdLbWt3SnhSS2RWb2NGQlJSTGZGQW9qNkdVT2hRb0ZBVnlzVUxSak5kZlFGZ2hMeHJPREVKNFFtNWlmVVVYWndRQWd3QnZFWElHQmtVRVp4dU1YZ0FKYjFkRUNXTUFCQWNIREVwREVHY1RCUU1EQlF0dmNXMFJid3VFQ0tNSEVMRUpGNU5GQ3htMUFBdDdjSDROdUFPZGNzVVJ5MFFDRDdnWWZjV2dUUVVRQjZaa3I2NkhvZURDU3dJRjV1Y0Z6M0lDN08wQ0M2eng4WXVIaFclMkYzQ3ZMeWZQWDQlMkJPWG96S25Ec3NCZHUzRyUyRnhJSFRwR0FnT1VQclppbUFKQ2ZEUFlmRGluMlRRJTJCeGVCbldiSGkzN1NDNFlJWWtRaGR5N0Z2TGRwd1d2akEwSnlVJTJGSVN5SXg0eFM2c2dma05TNG1lMnJ0VktrZ3cwSkNiOFlNWmRqd3FNUTJuSVk4QmJjVVFOVkNQN0c0TVFxMUtSaXZSN3RpREV1RUZyZ2dBQ0g1QkFrS0FBQUFMQUFBQUFBZ0FDQUFBQWIlMkZRSUJ3U0NRbU5CcENjY2trRWdSRUE0VmlLQTZhek04QkVaMVdoNkxPQmxzMEhBNWZnSlE2SEhRNkluS1JjV2hBMWQ1aHFNTXB5SWtPWnc5Q2ExOFFid2QlMkZSUmhuZm9VQUJSd2RJM0lFU2tRRlp4QjRiQWR2VjBZSlF3a0RBeDklMkJiV2NFQ1FZR0NRNXZGRVFDRVFvS0MwSUxIcVVEQm5jQ0dBNUxCaUhDQUFzRnRncW9Rd1M4QXc2NGY4bTJFWGRGQ3hPOElOUEtvbVFDQmdQTVdBdkwwbiUyRmZmJTJCallBdTd2QXV4eThPJTJGbXl2Zlg4JTJGZjclMkZBcnElMkJ2MFcwSE1ucjl6QWVFMEtKbFFrSklHQ2ZFMEUlMkJQdERxOXFmRE1vZ0RrR21ySUJDYk5RVVpJRG9zTnExa1VzRVpKQlcwZFklMkZiMFpzTFZpUUlNRk1XJTJCUktLZ2pGenA0Zk5va1BJZGtpJTJCWThKTlZ4QTc5akt3SEFJMEc5Skd3NXRDcURXVGlGUmhWaHRtaFZBMTZjTUpUSjFPblZJTW8xY3kxS1ZJNU5oRUFBaCUyQlFRSkNnQUFBQ3dBQUFBQUlBQWdBQUFHJTJGMENBY0Vna0NocU5RbkhKSkNZV1JNZmg0Q2dhbWt6RndCT2RWb2NOQ2dOYkpBd0doS0dVT2pSUUtBMXk4WE9HQXRaZmdJV2lTY2lKQldjVFFuaENEMjhRZjBVZ1p3SjNYZ0FKR2hRVmNnS09SbWRYaFJCdlYwUU1ZMElMQ2dvUm1JUm5DUUlPRGdJRWJ4dEVKU01kSFo4QUdhVUtCWFlMSUVwRkV4WnBBRzYySFJSRkFyc0tmbjhGSXNnamlVd0p1OEZrSkxZY0I5bE1Dd1VLcUZnR0hTSjVjblolMkZ1RVVMbCUyRkNYNjMlMkZ4OEtUTnUlMkJSa3pQajl6YyUyRjAlMkZDbDRWMCUyRkFQRElFNngwY3NyQkp3eWJYOURGaEJoQ0xnQWlsSXZ6UlZVcmlLSEdsZXYwSnR5dUR2bXNaVVpsY0lpQ0RuWXU3S3NaMFVtckJnZ1JQN24xRHFjREpFemNpT2dId2N3VHlaRVVtSUtFTUZWSXFneUlqcFo0dGpkVHhxUkNNUFlWTUJZRFY2dGF2VVo4eWN6cGtLd0J4SHNWV3RhcW81dE1nQUNINUJBa0tBQUFBTEFBQUFBQWdBQ0FBQUFiJTJGUUlCd1NDUXVCZ05CY2NrMEZndklRdEhSWkNZVUdTSjBJQjJXRG85cVVhQlFLSVhiTHNCeE9KVEV4VWg1bUI0aURvMHpYRWhXSk5CUlFnWnRBM3RQWlFzQWRRSU5Cd3h3QW5wQ0MyVlNkUU50VkVRU0VrT1VDaEdTVndvTEN3VUZwbTBRUkFNVkZCUVRReGxsQ3FoMGtrSUVDRjBURzY4VUcyTzBmb1lKRGI4VllWYTBhbFVYcnhvUWYxV21abnNURkEwRWhnQ0pockZNQzVIamtkNTdXMGpwRHNQRHVGVURIZkh5SFJ6c3ROTjc4UFB4SE9MazVkd2NwQnVvYVlrNU9BZmhYSEczaEF5JTJCS2dMa2dOb3pxd3pEYmdXWUpReVhzVXdHWEtOQTZmbllNSU8zaVBlSXBCd3lxbFNDQktVcUVRazVFNllSbVgyVWRBVDVrRW5IS2tRNWhYamtOcVRQdEtBQVJsMXNJckdveFNGTnVTRUZNTldvVkN4RXBpcXlSbFFZMTY1d0VIRUxBZ0FoJTJCUVFKQ2dBQUFDd0FBQUFBSUFBZ0FBQUclMkYwQ0FjRWdzS2hTTG9uSkpUQklGUjBHeHdGd21GSmxubEFnYVRLcEZxRUlxRkpNQmhjRUFCQzVHamtQejBLTjJ0c3ZIQkg0c0pLZ2RkMU5IU1hJTGFoOXRBbWRDQzBkVWNnNXFWRVFmaUl4SEVZdFhTQUNLbldvR1hBd0hCd1JER1VjS0JYWUZpMElKSG1RRUVLUUhFR0dwQ25wM0FpVzFES0ZXcVpOZ0dLUU5BNjVGQ3dWOGJRUUhKY1J0ZHM5TUM0clppdFZnQ1FiZjRBWUV1Ym5LVEFZVTZlb1VHdVNwdTNmbzYlMkJrYTJOcmJnUUFFNGVDbVM5eFZBT1c3WXE3SWdBNEhwaTBSOEVaQmhEc2hPblRnY090Zk0wY0FsVGlnSUxGRGlBRkZOams4azBHWmdBeE9Cb3pvdUlISU95S2JGaXhJa0VDbUl5SUhPRWlFV2JQSlRUUTVGeGNWT01DZ3pVVkNXd0FjeVpKdnp5NDVBRFlWWk5Jd1RsSUFWZk5CN1hSVkRMeEVXTFE0RTlKc0txJTJCclRkc015aGNFQUNINUJBa0tBQUFBTEFBQUFBQWdBQ0FBQUFiJTJGUUlCd1NDd3FGSXVpY2tsTUVnVkhRVkhLVkNZVW1XZVVXRkFrcXRPdEVLcWdBc2dGY0RGeUhKTE5tYlphNngyTHlkODU5NWg4QzQ4UmFnSm1RZ3RIYVg1WFpVWUtRNFlLRVlTS2ZWS1BhVU1aSHdNRGVRQnhoMDRBQllTRkdVNEpCcHNEQm1GSGRYTUxJS29mQkV5S0NwZGdzcHNPb1VzTFhhUkxDUU1nd2t5JTJCWUoxRkM0UE9nOGxWQWc3VTFRNWRydG5IU3c0SDN0OEhEZG5aeTJEZDRONE56YyUyRlFlcUxXMWJuTTdyWHVWOXRFQmhRUTVVb0NiSkRtV0tCQVFjTURaTmh3UlZOQ1lBTkJDaFpZRWJrVkNaT3dBU0VjQ0RGUTRTRURJcTZXVFZxUUlNRUNCeDA2aUNBQ1FRUEJpU2FiSERxelJVVEtBUk1oU0ZDRHJjJTJCV05RSWNPb1J3NSUyQlpJSGo4QURxU0VRQlFBd0tLTGhJem93RUVlR0tRMG93SVlrUEtqSGloWm9CS2kwS0ZFMDFiNHpnN2g0eTRJQUNINUJBa0tBQUFBTEFBQUFBQWdBQ0FBQUFiJTJGUUlCd1NDd3FGSXVpY2tsTUVnVkhRVkhLVkNZVW1XZVVXRkFrcXRPdEVLcWdBc2dGY0RGeUhKTE5tYlphNngyTHlkODU5NWg4QzQ4UmFnSm1RZ3RIYVg1WFpVVUplUUNHQ2hHRWluMVNrR2x1YkVoRGNZZE9BQVdFaFJsT0MxMkhZVWQxZXFlUm9rT0tDcGhnclk1TXBvdHFoZ1dmdW5xUHQ0UENnNzFncGdYSXlXU3FxcTlNQlFQUjB0SE16TTVMME5QU0M4UEN4VlVDeWVMWDM4JTJCJTJGQUZmWFJBNEhBJTJCcGptb0ZxQ0FjSERRYTNyYnh6QlJEMUJ3Z2NNRklsaWRNckF4WUlDSEhBNE44RElxcHNVV0ozd0FFQkNoUWFFQm5Rb0I2UlJyMHVBUmpRb2NNQUFBMHc0bk16NElPYVUwbElta1NuZ1lLRmMzWld5VHdKQUFMR0s0Zm5OQTNaT2FRQ0JRMjJ3UGdSUWxTSUFZd1Nma0hKTXJRa1R5RWJLRnpGeWRRcTE1Y2NPQWpVRXdRQUlma0VDUW9BQUFBc0FBQUFBQ0FBSUFBQUJ2OUFnSEJJTENvVWk2SnlTVXdTQlVkQlVjcFVKaFNaWjVSWVVDU3EwNjBRcXFBQ3lBVndNWElja3MyWnRscnJIWXZKM3puM21Id0xqeEZxQW1aQ0MwZHBmbGRsUlFsNUFJWUtFWVNLZlZLUWFXNXNTRU54aDA0QUJZU0ZHVTRMWFlkaFIzVjZwNUdpUTRvS21HQ3Rqa3ltaTJxR0JaJTJCNmVvJTJCM2c4S0R2WUxEeEtySnVYTmt5czZxcjB6Tnlndkh4TCUyRlYxc1ZEMjlLJTJGQUZmUlJRVUREdDFQbW9GcUhnUHRCTGV0dk13RzdRTWVzMEt4a2tJRklRTktEaEJnS3ZDaDNnUWlxbXh0Nk5EQkFBRUlFQWdVT0hDZ0JCRUg5WWcwNnVXQUlRVUFCaWhRTUFDZ0JFVUhUUndvVUVPQkljcVFJODgwT0lEZ201QUJEQThJZ1VrU3dBQXlpajElMkZqZWpBQVJQUElRd09OQkNuQkFKRENFT09DbkZBOGNPdkVoMUNFSkVxQk1JQkVEYUxjQTNMSklFR0RlJTJGMEJBRUFJZmtFQ1FvQUFBQXNBQUFBQUNBQUlBQUFCdjlBZ0hCSUxDb1VpNkp5U1V3U0JVZEJVY3BVSmhTWlo1UllVQ1NxMDYwUXFxQUN5QVZ3TVhJY2tzMlp0bHJySFl2SjN6bjNtSHdManhGcUFtWkNDMGRwZmxkbFJRbDVBSVlLRVlTS2ZWS1FhVzVzU0VOeGgwNEFCWVNGR1U0TFhZZGhSM1Y2cDVHaVE0b0ttR0N0amt5bWkycUdCWiUyQjZlbyUyQjNnOEtEdllMRHhLckp1WE5reXM2cXIwek55Z3ZIeEwlMkZWMXNWRER0aSUyRkJRY2NBOHlyWUJBakhSMGpjNTNMUlFZVTZSMFVCbk80UnhtaUclMkZJakpVSUpGdW9WS2VDQmlnQk41UUNrNDNCZ0ZnTUtGQ1lVR0RBZ0ZFVVFSR0lSWWJDaDJ4QUNFRGNBY0hEZ1FEY1FGR2Y5czdWa0EwUUNJMHQyVzBEUnc2OGg4Q2hBRUVMU0pFOHhpakJ2VnFDZ0lVOVBqd0ElMkJVTnpHNUFIRUI5eGtEcGs0UU1HdkFSUXNFRGxLeE1DQUxEZUxjQTBycUVFRGxXQ0NBQUFoJTJCUVFKQ2dBQUFDd0FBQUFBSUFBZ0FBQUclMkYwQ0FjRWdzS2hTTG9uSkpUQklGUjBGUnlsUW1GSmxubEZoUUpLclRyUkNxb0FMSUJYQXhjaHlTelptMld1c2RpOG5mT2ZlWWZBdVBFV29DWmtJTFIybCUyQlYyVkZDWGtBaGdvUmhJcDlVcEJwYm14SVEzR0hUZ0FGaElVWlRndGRoMkZIZFhxbmthSkRpZ3FZWUsyT1RLYUxhb1lGbjdwNmowd09BOFBFQXc2JTJGWjRQS1Vod2R6czhkRUw5a3Fxck4wTTdTZXRUVkNzTEZ3OGQ2Qzh2S3ZVUUV2JTJCZFZDUkFhQm5OUXRrd1BGUlFVRlhPZHVVb1RHJTJGY1VOa3lZZyUyQnRJQmxFTUFGWVlNQWFCdUNla3htaGFKZVNlQmdpT0hodzRRRUNBQXdjQ0xoR0pSVVFDZzNSRENteVVWbUJZbWxPaUdxbUJzUEdseXo5WWtBbHhzSkVocUN1YkFCUzlBc1BnUUFNcUxRZk0wb1RNd0VaNFFwTE93dk1MeEFFRVhJQkc1YWN6cXRhdXQ0WU5YUklFQUNINUJBa0tBQUFBTEFBQUFBQWdBQ0FBQUFiJTJGUUlCd1NDd3FGSXVpY2tsTUVnVkhRVkhLVkNZVW1XZVVXRkFrcXRPdEVLcWdBc2dGY0RGeUhKTE5tYlphNngyTHlkODU5NWg4QzQ4UmFoQVFSUXRIYVg1WFpVVUplUUFHSFIwakEwU0tmVktHQ21sdWJFaENCU0dSSFNRT1F3Vm1Rd3NaVGd0ZGgwVVFIS0lIbTJxdUNoR29waHVpSkhPM2prd09GQjJVYW9ZRlRuTUdlZ0RLUlFRRzB0TUdCTTFuQXRuYUFCb1UzdDhVRDgxa1IlMkJVSzNlRGU0bnJrNWdyUjFOTFdlZ3ZhOXM5Y3pmaFZBZ01OcFdxZ0JHTmlnTUdCQXd6bXhCR2poQUNFZ3djZ3pBUFRxbHdHWFE4Z01nQWhaSUdIV201V2plbFVaOGpCQmdQTVRCZ3dJTUdDUmdzeWdWU2tnTWlIQnlEN0RXRG14NVd1TWtacURMQ1U0Z2ZBcTJzQUNyQUVXRlNSTGpVZldEb3BDcURUTlFJc0oxTEYweXpEQUE5MFVIVjVlbzBxVWpCOG1nVUJBQ0g1QkFrS0FBQUFMQUFBQUFBZ0FDQUFBQWIlMkZRSUJ3U0N3cUZJdWlja2swRklpQ282QTRaU29ablJCVVNpd29FdFlpcE5PQkRLT0tLZ0Q5REJOSEhVNGJyYzRjM2NVQmVTT2s5NDlnZUVRVVpBNXJYQUJIRVc0UEQwVU9aQlNIYVFBSmlFTUpnUUFURkJRVkJrUUhaS0FDVXd0SGJYMFJSMG1WRnAwVUZ3UkNCU1FEU2dzWnJRdGVxRVVQR3JBUW1tRzlDaEZxUkFrTXNCZDR4c1JMQkJzVW9HNm5CYTE0RTRJQTJrVUZEdUxqRHFsNHBlaWxBQTBIN2U0SDF1ZEg4JTJGUHM3JTJCM3hibWowcU9UajVtRVdwRVAzRFVxM2dsWVdPQmdBY0VtVWFOSSUyQkRCandBWSUyQmRTMFVTR0pnNHdBQkVYTVl5Sk52RThVT0dJU0tWQ05DbGFoNHhqZzYwV1VLeUlOT0NVd3JNelZSQVJNR0VOV1E0biUyRmpwTlRLVG0xNUolMkZDVEsyZTBNb0QlMkJVS21IRXM0b25WRFZWbXlxZHBBYk5SNGNLVGpxTlNvdHMwN0VqenpKaDFTMElBRHNBQUFBQUFBQUFBQUElM0QpIG5vLXJlcGVhdCA1MCUgNTAlOwoJcG9zaXRpb246IGFic29sdXRlOwoJd2lkdGg6IDQwMHB4OwoJaGVpZ2h0OiA0MjFweDsKCXotaW5kZXg6IDEwMDA1OwoJb3BhY2l0eTogMC41Owp9");
        css.setAttribute("media", "screen, tv, projection");
        var head = document.getElementsByTagName("head")[0];
        if(head == null){
          head = document.createElement("head");
          var html = document.getElementsByTagName("html")[0];
          html.insertBefore(head, html.firstChild);
        }
        head.appendChild(css);
        
        
        // HTML
        var popupArea = document.createElement("div");
        popupArea.setAttribute("id", "alc-search-popup");
        
        var titleBar = document.createElement("div");
        titleBar.setAttribute("id", "alc-search-title");
        var titleText = document.createElement("span");
        titleText.setAttribute("id", "alc-search-text")
        titleText.appendChild(document.createTextNode("ALC Search: " + word));
        titleBar.appendChild(titleText);
        titleBar.addEventListener("mousedown", areaElement.setMove, false);
        
        var closeButton = document.createElement("div");
        closeButton.setAttribute("id", "alc-search-close");
        var closeImg = document.createElement("img");
        closeImg.setAttribute("id", "alc-search-button");
        closeImg.setAttribute("width", 20);
        closeImg.setAttribute("height", 15);
        closeImg.setAttribute("alt", "Close");
        closeImg.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAPCAYAAADkmO9VAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAAlwSFlzAAAOwwAADsMBx2%2BoZAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIFYzLjA4pLOz5QAAAOpJREFUOE9jYGBg%2BA%2FE1AJgs%2BhmoDHQMhBWQ3I%2BiA0Tx%2BYrvC6cA3X9LSAtCcQOUD5IUzeOMMJrIMgQkGEgRSDD10HZh%2FEEOMEwzEZyFUgxCPtRYiBIL8hFMMPwuQ4ewfhiOQaLC0FhiQvg9TIPUhiCwg%2FmUoJh%2BBeHdeixDAo7mNercOj5CRK%2FDsQaaApAaQ3kEhBGTiIgS2DiIB8gAwEg5zlIABQm%2B%2FGEC7FS84EKE2CK24GMBmJ1YlEHMmg5sjgHkAOyYTsQS5BgMMibIH3rgRhkBgbwgIbDeyANiwBcNEgNKMzg3gSZBgBymlArpNbh0gAAAABJRU5ErkJggg%3D%3D");
        closeImg.addEventListener("click", areaElement.removePopup, false);
        closeButton.appendChild(closeImg);
        
        var resultArea = document.createElement("div");
        resultArea.setAttribute("id", "alc-search-result");
        var powered = document.createElement("address");
        powered.setAttribute("id", "alc-search-powered");
        powered.appendChild(document.createTextNode("Powered by "));
        powered.appendChild(document.createElement("a"));
        powered.lastChild.setAttribute("href", "http://www.alc.co.jp/");
        powered.lastChild.appendChild(document.createTextNode("SPACE ALC"));
        powered.appendChild(document.createTextNode("."));
        resultArea.appendChild(powered);
        
        popupArea.appendChild(titleBar);
        popupArea.appendChild(closeButton);
        popupArea.appendChild(resultArea);
        
        if(searchALC.popupX != -1 && searchALC.popupY != -1){
          with(popupArea.style){
            left = searchALC.popupX;
            top = searchALC.popupY;
          }
        }
        
        document.body.appendChild(popupArea);
        
        popupArea.addEventListener("click", function(event){
          event.stopPropagation();
        }, false);
        
        document.addEventListener("keydown", areaElement.removePopup, false);
        document.addEventListener("click", areaElement.removePopup, false);
      }
      else {
        var titleText = document.getElementById("alc-search-text");
        titleText.replaceChild(document.createTextNode("ALC Search: " + word), titleText.firstChild);
      }
    },
    
    removePopup: function(event){
      if(event && event.type == "keydown"){
        // X marks the spot or ESC
        if(String.fromCharCode(event.keyCode).toLowerCase() == "x" || event.keyCode == "27"){
          event.preventDefault();
        }
        else{
          return;
        }
      }
      else if(event && event.type == "click" && event.button != 0){
        return;
      }
      
      searchALC.term = "";
      
      // HTML
      document.body.removeChild(document.getElementById("alc-search-popup"));
      
      // CSS
      document.getElementsByTagName("head")[0].removeChild(document.getElementById("alc-search-css"));
      
      document.removeEventListener("keydown", areaElement.removePopup, false);
      document.removeEventListener("click", areaElement.removePopup, false);
    },
    
    loading: function(boolean, parent){
      if(boolean){
        var div = document.createElement("div");
        div.setAttribute("id", "alc-search-loading");
        parent.appendChild(div);
      }
      else{
        parent.removeChild(parent.lastChild);
      }
    },
    
    setMove: function(event){
      var popup = document.getElementById("alc-search-popup");
      
      searchALC.popupX = event.clientX - popup.offsetLeft;
      searchALC.popupY = event.clientY - popup.offsetTop;
      
      var bar = document.getElementById("alc-search-title");
      
      bar.addEventListener("mousemove", areaElement.movePopup, false);
      bar.addEventListener("mouseup", areaElement.removeMove, false);
      bar.addEventListener("mouseout", areaElement.removeMove, false);
    },
    
    removeMove: function(event){
      var bar = document.getElementById("alc-search-title");
      
      with(bar.parentNode.style){
        searchALC.popupX = left;
        searchALC.popupY = top;
      }
      
      bar.removeEventListener("mousemove", areaElement.movePopup, false);
      bar.removeEventListener("mouseup", areaElement.removeMove, false);
      bar.removeEventListener("mouseout", areaElement.removeMove, false);
    },
    
    movePopup: function(event){
      var popup = document.getElementById("alc-search-popup");
      
      with(popup.style){
        left = event.clientX - searchALC.popupX;
        top = event.clientY - searchALC.popupY;
      }
    },
  }
  
  GM_registerMenuCommand("ALC Search Popup - Toggle Fast", function(){
    var toggle = GM_getValue("toggle", false);
    GM_setValue("toggle", !toggle);
  });
  
  /*
   * $X function from nulog
   * http://lowreal.net/logs/2006/03/16/1
   *
   * Thanks, cho45.
   */
  function $X (exp, context) {
    if (!context) context = document;
    var resolver = function(prefix){
      var o = document.createNSResolver(context)(prefix);
      return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
    }
    var exp = document.createExpression(exp, resolver);
    
    var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
    switch(result.resultType){
      case XPathResult.STRING_TYPE : return result.stringValue;
      case XPathResult.NUMBER_TYPE : return result.numberValue;
      case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
      case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
        result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
        var ret = [];
        for(var i = 0, len = result.snapshotLength; i < len ; i++){
          ret.push(result.snapshotItem(i));
        }
        return ret;
      }
    }
    return null;
  }
  
  if(document.body) searchALC.init();
})();
