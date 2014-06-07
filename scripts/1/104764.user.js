// ==UserScript==
// @id             gist:raw master URL
// @name           gist:raw master URL
// @namespace      http://efcl.info
// @description    add raw master URL link in gist.
// @include        https://gist.github.com/*
// @exclude        https://gist.github.com/gists
// @exclude        https://gist.github.com/starred
// @exclude        https://gist.github.com/mine
// ==/UserScript==
// raw URL rule
// http://wa.cocolog-enshu.com/pseudodiary/2011/06/gist-raw-url-72.html
(function() {
    var codes = document.querySelectorAll('.file .actions > a');
    if (!codes) {
        return;
    }
    var pathname = getGistPathname();
    for (var i = 0,len = codes.length; i < len; i++) {
        var code = codes[i];
        // code.hrefは絶対URLが取得されるため
        var codeFilename = code.getAttribute("href").split('/').pop();
        var rawLink = document.createElement("a");
        var rawURL = "https://raw.github.com/gist/" + pathname + "/" + codeFilename;
        rawLink.href = rawURL;
        rawLink.className = "raw-master-link"
        // for Scriptish
        if (typeof GM_setClipboard !== "undefined") {
            rawLink.setAttribute("role", "button");
            styledButton();
            rawLink.addEventListener("click", function(evt) {
                evt.preventDefault();
                GM_setClipboard(rawURL);
                GM_notification("Copy " + rawURL);
            }, false);
        }
        rawLink.appendChild(document.createTextNode(codeFilename));
        rawLink.style.marginLeft = "2em";
        // insert
        code.parentNode.appendChild(rawLink);
    }
    function styledButton() {
        GM_addStyle(String(<>
            <![CDATA[
        .raw-master-link {
          text-decoration: none;
          background: #e3e3e3;
          border: 1px solid #bbb;
          -moz-border-radius: 3px;
          -webkit-border-radius: 3px;
          border-radius: 3px;
          -moz-box-shadow: inset 0 0 1px 1px #f6f6f6;
          -webkit-box-shadow: inset 0 0 1px 1px #f6f6f6;
          box-shadow: inset 0 0 1px 1px #f6f6f6;
          color: #333;
          font-family: "helvetica neue", helvetica, arial, sans-serif;
          font-size: 12px;
          font-weight: bold;
          line-height: 1;
          padding: 4px 2px 5px;
          text-align: center;
          text-shadow: 0 1px 0 #fff;
          width: 150px;
        }

        .raw-master-link:hover {
          background: #d9d9d9;
          -moz-box-shadow: inset 0 0 1px 1px #eaeaea;
          -webkit-box-shadow: inset 0 0 1px 1px #eaeaea;
          box-shadow: inset 0 0 1px 1px #eaeaea;
          color: #222;
          cursor: pointer;
        }

        .raw-master-link:active {
          background: #d0d0d0;
          -moz-box-shadow: inset 0 0 1px 1px #e3e3e3;
          -webkit-box-shadow: inset 0 0 1px 1px #e3e3e3;
          box-shadow: inset 0 0 1px 1px #e3e3e3;
          color: #000;
        }
        ]]></>));
    }

    function getGistPathname() {
        return location.pathname.substring(1);
    }
})();
/* TEST URL
 noname + file type
 https://gist.github.com/847161
 named file
 https://gist.github.com/1011905
 private repo
 https://gist.github.com/8cd7996b0c6efbcb0648
 multiple files
 https://gist.github.com/609613
 file name contain "-"
 https://gist.github.com/1073755
 */