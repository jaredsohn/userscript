// ==UserScript==
// @version		   0.3.1
// @name           UFO:AI translate helper
// @namespace      http://moss.vanyi.org/~pedro/GMHacks
// @description    Helps with some new widgets in translating pages @ UFO:AI.org.
// @include        http://ufoai.org/wiki/index.php?title=Translation:*&action=edit*
// @include        http://ufoai.org/wiki/index.php/List_of_msgid/*
// @downloadURL    http://userscripts.org/scripts/source/131882.user.js
// @updateURL      http://userscripts.org/scripts/source/131882.user.js
// @grant          GM_xmlhttpRequest
// @grant          GM_log
// ==/UserScript==

/********************************************
 * Changelog
 * v0.1         Initial release
 * v0.2         Feature: statistics for translated pages per language
 * v0.2.1       Fix: handling of empty <li> items in summary table
 * v0.3         Feature: en.glosbe.com integration for translation
 * v0.3.1       Fix: grant and some parsing fix  (2012.09.18) 
 *
 */       


var edit_loc =              //pages matching: translation
{
    '^http://ufoai\\.org/wiki/index\\.php\\?title=Translation:(.*)&action=edit(.*)?': location.search.substr(1)
};                                                                   
var table_loc =             //pages matching: summary tables
{
    '^http://ufoai\\.org/wiki/index\\.php/List_of_msgid/[A-Z](.*)?': ""
};                                                                   
var langtable = null;       //Summary table element
var orig_loaded = false;    //Has the original source text loaded? 
var trans_found = false;    // Has the translation been found?
var trans_lang = '';        // the language to translate to

var glosbe_map = {
    'bg_BG': 'bg',  //Bulgarian
    'de': 'de',     //German
    'el': 'el',     //Greek
    'fr': 'fr',     //French
    'it': 'it',     //Italian
    'es': 'es',     //Spanish
    'es_ES': 'es',  //Spanish
    'pl': 'pl',     //Polish
    'ru': 'ru',     //Russian
    'cs': 'cs',     //Czech
    'sv': 'sv',     //Swedish
    'da': 'da',     //Danish
    'et': 'et',     //Estonian
    'th': 'th',     //Thai
    'pt_BR': 'pt',  //Portuguese/Brazilian
    'ja': 'ja',     //Japanese
    'hu': 'hu',     //Hungarian
    'uk': 'uk',     //Ukrainian
    'zh_CN': 'zh',  //Chinese/Cantonian
    'sk': 'sk',     //Slovak
    'ko': 'ko',     //Korean
    'fi': 'fi',     //Finnish
    'tr': 'tr',     //Turkish
    'cht': 'cht',   //Cholon
    'nl_NL': 'nl'   //Dutch
};



/**************************************************************
 * Main part:
 * + Check which page is accessed and call the appropriate function to modify it
 **************************************************************/
//add functionality only if the user is logged in.
if (document.getElementById('pt-logout') != null)
{   
    for (var r in edit_loc)
    {
        if ((new RegExp(r)).test(window.location.href)) 
        {
            var t0 = (edit_loc[r].split(":"))[1];
            t0 = t0.split("&")[0];
            // translation page - add original text & translation aid
            if (t0.split("/")[1] != 'en')
            {
                trans_lang = t0.split("/")[1]; 
                addOriginal(t0.split("/")[0]);
            }        
        }
    }
    for (var r in table_loc)
    {
        if ((new RegExp(r)).test(window.location.href)) 
        {
            //language summary table page - add language combo box & stats
            keepOnlyOne();
        }
    }
}


/**************************************************************
 * Summary table processing part
 **************************************************************/
// adds statistics to the langauage span
function addStat(all_cnt, open_cnt)
{
    var done_cnt = all_cnt - open_cnt;
    var selspan = document.getElementById('lang_span');
    selspan.appendChild(document.createTextNode('Translated already: ' + done_cnt + '/' + all_cnt));
}

//removes statistics from the language span
function removeStat()
{
    var selspan = document.getElementById('lang_span');
    if (selspan.childNodes[2])
    {
        selspan.removeChild(selspan.childNodes[2]);
    }
}

//adds combo box with languages
function processLangs()
{
    var hdr = langtable.childNodes[1].childNodes[0];
    var j = 0;
    var languages = new Array();
    
    //enumerate languages
    for (var i=1; i<hdr.childNodes.length; i+=2 )
    {
        if (i > 5)
        {
            languages[j] = hdr.childNodes[i].childNodes[0].data;
            j++;
        } 
    }
    
    var selspan = document.createElement('span');
    selspan.setAttribute('id', 'lang_span');
	selspan.appendChild(document.createTextNode('Choose language to view:'));
     
    //the combo box
    var sel = document.createElement('select');
	sel.style.color = '#dddddd';
    sel.style.background = 'rgba(55,55,55,0.0)';
    sel.style.border = '1px solid #dddddd';
    sel.style.marginLeft = '5px';
	sel.style.marginRight = '7px';
    
    var opt = document.createElement('option');
    opt.value = ' all ';
    opt.appendChild(document.createTextNode(' all '));
    sel.appendChild(opt); 
    for (j=0; j<languages.length; j++)
    {
        opt = document.createElement('option');
        opt.setAttribute('value', languages[j]);
        opt.appendChild(document.createTextNode(languages[j]));
        sel.appendChild(opt);
    }
    //if changed, keep only the selected language 
    sel.addEventListener('change', function(){keepLang(this)});
    selspan.appendChild(sel);
    langtable.parentNode.insertBefore(selspan, langtable);  
}

//removes not needed columns 
function keepLang(combo)
{
    var hdr = langtable.childNodes[1].childNodes[0];
    var idx = 1;
    var lang = combo.value; 
	var all_text_count = -1; //header row is not needed
	var open_text_count = 0;
    
    //get the index of the selected language
    //this is not the visible, real index, but within the html tree
    for (idx=1; idx<hdr.childNodes.length; idx+=2 )
    {
        if (hdr.childNodes[idx].childNodes[0].data == lang)
        {
            break;
        }
    }
    
    //hiding not needed columns
    for (var j = 0; j<langtable.childNodes[1].childNodes.length; j+=2)
    {
        var row = langtable.childNodes[1].childNodes[j]; 
		all_text_count++;
        for (var k=row.childNodes.length-1; k>0; k -= 2)
        {
            var cell = row.childNodes[k];
            //keeping msgid, status, en and the desired language unless it's 'all' 
            if ( lang == ' all ' || k == 1 || k == 3 || k == 5 || k == idx)
            {
                cell.style.display = 'table-cell';
            }
            else
            {
                cell.style.display = 'none';
            }  
			
            //statatistics: how many are open?
            if (k == idx && j != 0) //for that language, without header
            {
                //				td     ul           li            span/a 
                var spanlink = cell.childNodes[1].childNodes[0].childNodes[1];
                if (spanlink)
                {
                    //wiki link is [open]
                    if (spanlink.tagName.toUpperCase() == 'SPAN' && spanlink.childNodes[0].data == '[open]')
                    {
                        open_text_count++;
                    }
                    //link is there, but page does not exist
                    if (spanlink.tagName.toUpperCase() == 'A' && spanlink.getAttribute('class') == 'new')
                    {
                        open_text_count++;
                    }
                }
                else
                {
                    open_text_count++;
                }
            }			
        }                               
    } 
    //add or remove stats
    if (lang != ' all ')
    {
        removeStat();
        addStat(all_text_count, open_text_count);
    }
    else
    {
        removeStat();
    }
}

//IF for findin the summary table and adding the language combo box
function keepOnlyOne()
{    
    //first find the todo list table
    var tables = document.getElementsByTagName('table');
    for (var i=0; i<tables.length; i++)
    {
        if (tables[i].getAttribute('class') == 'todolist')
        {
            langtable = tables[i];
            break;
        }
    }
    
    //add combo box and wait for user changing it
    processLangs();    
}


/**************************************************************
 * Translation pages part
 **************************************************************/ 
//inserts the original text as a textarea 
function insertTextArea()
{
    var globalW = document.getElementById('globalWrapper'); 
    var c1 = document.getElementById('column-one'); 
    var editForm = document.getElementById('editform');
    
    // create a table for placing the two columns
    var editTable = document.createElement('table');
    editTable.style.width = '99%';
    
    var editRow = document.createElement('tr');
    
    //cell for the editable textarea
    var editCell = document.createElement('td');
    //cell for the textarea with the source text
    var editOrigCell = document.createElement('td');
    editOrigCell.style.width = '47%';
    editOrigCell.style.verticalAlign = 'top';
    editOrigCell.style.marginRight = '3px';
    
    //caption: Original text
    var editCaption = document.createElement('p');
    editCaption.appendChild(document.createTextNode('Original text:')); 
    
    //adding new textarea    
    var editArea = document.createElement('textarea');
    editArea.setAttribute('id', 'wpTextbox1');
    editArea.setAttribute('name', 'wpTextbox1');
    editArea.setAttribute('cols', '80');
    editArea.setAttribute('rows', '25');
    editArea.setAttribute('readonly', 'true');
    editArea.style.background = 'rgba(55,55,55,0.0)';
    editArea.style.color = '#dddddd';
    editArea.style.border = '1px solid white';
    editArea.style.position = 'relative';
    editArea.style.top = '-7px';
    
    //original divs: caption and textarea
    editOrigCell.appendChild(editCaption);
    editOrigCell.appendChild(editArea);
    
    //editing textarea is replaced on the right cell
    editCell.appendChild(editForm);
    
    editRow.appendChild(editOrigCell);
    editRow.appendChild(editCell);
    
    editTable.appendChild(editRow);
    
    globalW.insertBefore(editTable, c1);
    
    return editArea;
}

//updatnig the text in a given textarea
function updateTextArea(editArea, _text)
{
    //first removing the original text
    for (var i=editArea.childNodes.length-1; i>=0; i--)
    {
        editArea.removeChild(editArea.childNodes[i]);
    }
    //adding new text
    editArea.appendChild(document.createTextNode(_text));
}

//fetch the original english text
function getOriginal(from)
{
  var editArea = insertTextArea();
  var respXML = '';
  
  GM_xmlhttpRequest({
        method:  'GET',
        url:     from,
        headers: { 'User-agent': navigator.userAgent },
        onreadystatechange:  function(response)
        {
            if (response.readyState === 4)
            {
                if (response.status === 200)
                {                        
                    //fetch only the textarea contents
                    if (!response.responseXML)
                    {
                        respXML = new DOMParser()
                            .parseFromString(response.responseText, 'text/xml');
                    } else {
                        respXML = response.responseXML;
                    }
                    var textdiv = null;
                    var o = respXML.getElementsByTagName('textarea');
                    for (var i = 0; i<o.length; i++)
                    {
                        if (o[i].getAttribute('id') == 'wpTextbox1')
                        {
                            textdiv = o[i];
                            break;
                        } 
                    }
                    if (null != textdiv)
                    {
                        //inject it to the current page
                        updateTextArea(editArea, textdiv.childNodes[0].data);
                        addTransArea(editArea);
                        editArea.addEventListener('select', function(){selectPhrase(this)});                
                        orig_loaded = true;
                    }
                    else
                    {
                        updateTextArea(editArea, 'ERROR: English source text is not found. Page layout changed.');                
                    }
                }
                else
                {
                    updateTextArea(editArea, 'ERROR: English source text is not found. Page is not available.');
                }
            }
            else if (!orig_loaded)
            {
                updateTextArea(editArea, 'loading...');
            }
        },
        onerror: function (res)
        {
            GM_log('XHR Error: \n' + res.responseText);
        }
    });
}

//adds elements for the tranlsation aid - en.glosbe.com integration
function addTransArea(editArea)
{
    var transArea = document.createElement('textarea');
    var transSpan = document.createElement('span');
    var transPhrase = document.createElement('input');
    var transBtn = document.createElement('input');
    
    //textarea with the translated words 
    transArea.setAttribute('cols', '60');
    transArea.setAttribute('rows', '7');
    transArea.setAttribute('readonly', 'true');
    transArea.setAttribute('id', 'transArea');    
    transArea.style.background = 'rgba(55,55,55,0.0)';
    transArea.style.color = '#dddddd';
    transArea.style.border = '1px solid white';
    transArea.style.width = '90%';
    transArea.style.position = 'relative';
    transArea.style.top = '6px';
    
    //the phrase to be translated
    transPhrase.setAttribute('type', 'text');
    transPhrase.setAttribute('id', 'phrase');
    transPhrase.style.background = 'rgba(200,200,200,0.3)';
    transPhrase.style.color = '#ffff88';
    transPhrase.style.border = '1px solid white';
    transPhrase.style.marginRight = '5px';
    transPhrase.style.width = '40%';
    
    //the button to start translation
    transBtn.setAttribute('type', 'button');
    transBtn.setAttribute('value', 'Translate');
    transBtn.style.marginLeft = '2px';
    transBtn.style.background = '#444444';
    transBtn.style.color = '#dddddd';
    transBtn.style.border = '1px solid white';
    transBtn.addEventListener('mouseover', function(){this.style.border = '1px solid yellow'});
    transBtn.addEventListener('mouseout', function(){this.style.border = '1px solid white'});
    transBtn.addEventListener('click', function(){translatePhrase()});            
    
    //layout: in one row (caption, phrase, button)
    transSpan.appendChild(document.createTextNode('Translate this: '));
    transSpan.appendChild(transPhrase);
    transSpan.appendChild(transBtn);
    
    editArea.parentNode.appendChild(transSpan);
    editArea.parentNode.appendChild(transArea);
}

//handler for selecting a phrase in the original text
function selectPhrase(editArea)
{
    var startPos = editArea.selectionStart;
    var endPos = editArea.selectionEnd;
    var selPhrase = editArea.value.substring(startPos, endPos);
    var _phrase = document.getElementById('phrase');
    if (_phrase)
    {
        _phrase.value = selPhrase;
    }                             
}

//updating the contents of the translation textarea
function updateTransArea(data, finished)
{
    var _area = document.getElementById('transArea');
    if (_area)
    {
        if (!finished || !trans_found)
        {
            //searching...
            updateTextArea(_area, data);
        }
        else
        {
            //parsing 
            trans_found = false;           
            // - first the direct meanings
            var e = data.getElementsByTagName('span');
            var transText = '';
            for (var i = 0; i < e.length; i++)
            {
                if (e[i].getAttribute('class') == 'translation' )
                {
                    transText += '- ' + e[i].childNodes[0].data + '\n';
                }
            }
            // - then the descriptions for helping the translation
            transText += '\n\t Descriptive meanings: \n';
            e = data.getElementsByTagName('div');
            for (var i = 0; i < e.length; i++)
            {
                if (e[i].getAttribute('class') == 'meaning-text' )
                {
                    transText += '+ ' + e[i].childNodes[0].data + '\n';
                }
            }            
            updateTextArea(_area, transText);            
        }
    }    
}

//fetches the translation from en.glosbe.com
function fetchTranslation(from, _phrase)
{
    var respXML = '';
    GM_xmlhttpRequest({
        method:  'GET',
        url:     from,
        headers: { 'User-agent': navigator.userAgent },
        onreadystatechange:  function(response)
        {
            if (response.readyState === 4)
            {
                if (response.status === 200)
                {
                    //fetched successfully: get the XML from the response
                    if (!response.responseXML)
                    {
                        respXML = new DOMParser()
                            .parseFromString(response.responseText, 'text/xml');
                    } else {
                        respXML = response.responseXML;
                    }
                    
                    trans_found = true;
                    updateTransArea(respXML, true);
                }
                else
                {
                    //could not found the word
                    updateTransArea('Failed to fetch translation for [' + _phrase + '].', false);
                }
            } else {
                //search is not yet finished
                updateTransArea('Searching...', false);
            }
        },
        onerror: function (res)
        {
            GM_log('XHR Error: \n' + res.responseText);
        }
    });                    
}

//initiates trnaslation of the selected or written phrase
function translatePhrase()
{
    var _phrase = document.getElementById('phrase');
    var lang = glosbe_map[trans_lang]; //map the language
    if (_phrase)
    {
        if (_phrase.value.length > 0)
        {
            //calling en.glosbe.com/en/language/phrase
            var transFrom = 'http://en.glosbe.com/en/' + lang + '/' + _phrase.value.toLowerCase();
            //do it via YQL, as en.glosbe.com does not respond directly - same domain policy
            //YQL API accepts requests from anywhere 
            var yql = 'http://query.yahooapis.com/v1/public/yql?q=';
            yql += encodeURIComponent('select * from html where url="' + transFrom + '" and compat="html5"');
            yql += '&format=xml';
            //fetch it!
            fetchTranslation(yql, _phrase);
        }
    }
}

//IF for adding the original english text
function addOriginal(page)
{
    var en_loc = 'http://ufoai.org/wiki/index.php?title=Translation:' + page + '/en&action=edit';
    getOriginal(en_loc);
}   