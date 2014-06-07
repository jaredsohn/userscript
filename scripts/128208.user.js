// ==UserScript==
// @name           Where my therad at
// @include        *//boards.4chan.org/*/res/*
// ==/UserScript==
var board = document.location.href.match(/http:\/\/boards\.4chan\.org(\/.*?\/)|https:\/\/boards\.4chan\.org(\/.*?\/)/i);
if (!board[1]) board[1] = board[2];
var main = document.getElementsByName("delform")[0];
var is404;

function doIndex(pg)
{
var b = document.getElementById('shouldi');
var c = document.getElementById('timerbox');
if(!is404 && b.checked === true){
	if(isNaN(c.value)) var timer = 60;
	if(c.value > 600) var timer = 600;
	if(c.value < 30) var timer = 30;
	if(!timer) var timer = parseInt(c.value);

    xhr = new XMLHttpRequest();
    xhr.open("GET", board[0] + pg, true);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.onreadystatechange = function(aEvt)
        {
            if(xhr.readyState == 4)
            {
                if(xhr.status == 200)
                {
                    var html = xhr.responseText.match(/(<span class="filesize">|<img src="http:\/\/static\.4chan\.org\/image\/filedeleted\.gif" alt="File deleted\.">)([^<]|<[^h]|<h[^r]|<hr[^>])*?<span id="nothread[0-9]*?">[^]*?(<\/blockquote><span class="omittedposts">[^]*?<\/span>|<\/blockquote>)/gi);
                    if(html)
                    {
                        var l = html.length;
                        for(var i = 0; i < l; i++)
                        {
							var no = html[i].match(/<a href="res\/([0-9]*)">Reply<\/a>/i)[1];
							var threadNo = document.location.pathname.split('/');
							threadNo = threadNo[threadNo.length-1];
							if(threadNo == no)
							{
								document.getElementById('page').innerHTML = pg;
								var found = true;
								break;
							}
                        }
                    }
                }
                
				if(found) {setTimeout(doIndex(0), timer * 10);}else{
					if(pg < 15)
					{
						doIndex(pg + 1);
					}
					else
					{
						document.getElementById('page').innerHTML = "404'd";
						var is404 = true;
					}
				}
            }
        };
    xhr.send(null);
	}
}

var ui = document.createElement('center');
ui.innerHTML = '<table border="0" style="width: 100%"><tbody><tr><td style="width: 33%;text-align: right;">Timer(600-30s):&nbsp;<input type="text" value="60" maxlength="4" size="4" id="timerbox">&nbsp;&nbsp;</td><td style="width: 33%">&nbsp;<center><font size="20" color="red" id="page">&nbsp;</font></center>&nbsp;</td><td style="width: 33%;text-align:left;">&nbsp;&nbsp;<span id="checkcheck"><label for="shouldi">Checking</label><input type="checkbox" id="shouldi" value="false"></span></td></tr></tbody></table>';
main.parentNode.insertBefore(ui, main);
document.getElementById('checkcheck').addEventListener("click", function(){
	if(document.getElementById('shouldi').checked === true)doIndex(0);
}, false);