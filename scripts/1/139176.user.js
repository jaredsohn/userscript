// ==UserScript==
// @name       Memrise pronunciation
// @namespace  
// @version    5.5.1
// @description  Pronounce word during memrise test
// @grant       none
// @match      http://www.memrise.com/*
// @copyright  2012+, Blue Bird
// ==/UserScript==
var forvo_key = 'xxx'; // REPLACE xxx WITH YOUR OWN FORVO KEY, GET A FREE KEY AT http://api.forvo.com/login/
window.memrise = String(null);
window.memrise_last = String(null);
window.player_number = 1;
// check if a new word is displayed every check_interval ms
check_interval = 200;
// create an element for script info
var mempron_div = document.createElement('div');
mempron_div.innerHTML = '<div id="memrise-pronunciation"></div><iframe id="player1" style="position: absolute; visibility: hidden;" src=""></iframe><iframe id="player2" style="position: absolute; visibility: hidden;" src=""></iframe>';
document.getElementById('left-area').appendChild(mempron_div);
if (window.XMLHttpRequest)
{
    xmlhttp = new XMLHttpRequest();
}
else
{
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
var url = document.URL;
if (url.indexOf('course')>0)
{
	url = url.split('/').slice(0, 6).join('/');
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}
else
{
    lang = url.split('/')[5];
    lang = lang.split('-').shift();
    lang = lang.charAt(0).toUpperCase() + lang.slice(1);
    set_mempron_info(lang, forvo_key);
}
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        doc = xmlhttp.responseText;
        tofind = '<span class="ico ico-grey ico-arr-right ico-s"></span>';
		
        // get index of last tofind (>-symbol)
        index1 = doc.lastIndexOf(tofind)  + 55;
        index2 = doc.indexOf("</div>", index1);
        temp = doc.substring(index1, index2);
        lang = temp.substring(temp.indexOf("\">") + 2, temp.indexOf("</a>"));
        lang = lang.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); // trim spaces
        
        set_mempron_info(lang, forvo_key);
    }
}
setInterval(function() {
    try
    {
        word_definition = document.getElementsByClassName('hint-text');
        if (word_definition.length > 0)
        {
            todo = word_definition[0].innerText;
        }
        else
        {
            todo = "";
        }
        
        temp = document.getElementsByClassName('row column primary')
        if(temp.length > 0)
        {
            window.memrise = temp[0].innerText.replace("Word", "");
            if (lang == "Maths")
            {
                window.memrise = window.memrise.replace("Definition", "");
            }
        }
        
        correct_divs = document.getElementsByClassName('correct');
        if (correct_divs.length > 0)
        {
            if (document.getElementsByClassName('marking-icon tick').length > 0)
            {
                if (todo == "Select the correct Definition for the Word above:")
                {
                    window.memrise = document.getElementsByClassName('qquestion')[0].innerText;
                }
                else
                {
                    if (correct_divs[0].value)
                    {
                        window.memrise = correct_divs[0].value;
                    }
                    else
                    {
                        temp = correct_divs[0].innerHTML;
                        index1 = temp.indexOf("val\">") + 5;
                        index2 = temp.indexOf("</span>", index1);
                        window.memrise = temp.substring(index1, index2);
                    }
                }
            }
        }
        
        if (window.memrise_last != window.memrise)
        {
            window.memrise_last = window.memrise;
            var url = 'http://mempron.comli.com/mempron.php?lang=' + lang + '&fullword=' + memrise + '&forvokey=' + forvo_key;
            
            if (window.player_number == 1)
            {
            	document.getElementById('player1').src = url;
                window.player_number = 2;
            }
            else
            {
                document.getElementById('player2').src = url;
                window.player_number = 1;
            }
        }
    }
    catch (e)
    {
    }
    }, check_interval);
function write_to_div(text)
{
    document.getElementById('memrise-pronunciation').innerHTML = text;
}
function set_mempron_info(lang, forvo_key)
{
    if (forvo_key == 'xxx')
    {
        write_to_div('<br><br>Thanks for using <a href="http://userscripts.org/scripts/show/139176">Memrise pronunciation</a> <br><br><b style="color:red;">For Forvo pronunciation to work, you need to get a free API key from Forvo at <a href="http://api.forvo.com/account/">http://api.forvo.com/account</a> <br><br>Paste the key in the beginning of the script (replace xxx with your key).</b>');
    }
    else
    {
        write_to_div('<br><br>Thanks for using <a href="http://userscripts.org/scripts/show/139176">Memrise pronunciation</a><br><br>Recognized test language is ' + lang);
    }
}