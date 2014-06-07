// ElectroFox Designs (Max Smiley)
// http://www.efoxdesigns.com
// GPL
// ==UserScript==
// @name           Find My Site
// @version        1.11
// @namespace      http://www.google.com
// @description    Find which page of Google search results contains your site, for a given search phrase.
// @include        http://www.google.com/*
// ==/UserScript==

try //highlight Do not use Google Instant on prefs page
{
    document.getElementById('suggmid').nextElementSibling.setAttribute('style','background: none repeat scroll 0 0 #EBF2FC; border: 2px dashed #CDDCF9; padding: 2px;');
    document.getElementById('suggmid').nextElementSibling.innerHTML = document.getElementById('suggmid').nextElementSibling.innerHTML + ' (Check this option if using the Find My Site Userscript.)';
}
catch (e) {} //we're not on the prefs page

var searchButtons = document.evaluate("//span[@class='ds']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
if (searchButtons.snapshotLength != 2)
    searchButtons = document.evaluate("//div[@class='ds']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

var existingButton = searchButtons.snapshotItem(0);
var findButton = document.createElement(existingButton.nodeName);
findButton.setAttribute('class','ds');

if (existingButton.parentNode.nodeName == "CENTER") // if instant search is on
{
    searchButtons = document.evaluate("//div[@id='sbds']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    existingButton = searchButtons.snapshotItem(0);
    findButton.innerHTML = existingButton.innerHTML;
}
else
    findButton.innerHTML = existingButton.innerHTML;

findButton.children[0].children[0].setAttribute('id','find_my_site_button');
findButton.children[0].children[0].setAttribute('value','Find My Site!');
findButton.children[0].children[0].setAttribute('title','Find My Site!');
findButton.children[0].children[0].setAttribute('style','background: transparent; font: 15px arial,sans-serif; color: #FFF; overflow: visible; height: 27px;');
findButton.children[0].style.width = "96px";
findButton.children[0].style.margin = "0px 0px 0px 0.5em";

if (GM_getValue("searching","false") != "false")
    findButton.children[0].children[0].setAttribute('value','Searching...');

if (existingButton.parentNode.previousElementSibling.getAttribute('width') == '100%')
{
    existingButton.parentNode.nextElementSibling.children[0].children[0].style.left = '120px'; //move safe search preference to the right
    var td = document.createElement('td');
    td.appendChild(findButton);
    existingButton.parentNode.parentNode.appendChild(td);
    document.getElementById('find_my_site_button').addEventListener('click',find_my_site,true);
}
else
{
    try
    {
        if (existingButton.parentNode.parentNode.previousElementSibling.getAttribute('width') == '100%') //instant search
        {
            findButton.addEventListener('click',instant_warning, false);
            findButton.setAttribute('class','');
            var td = document.createElement('td');
            var div = document.createElement('div');
            div.setAttribute('class','nojsb');
            div.setAttribute('style','display: block;');
            div.appendChild(findButton);
            td.appendChild(div);
            existingButton.parentNode.parentNode.parentNode.appendChild(td);
            document.getElementById('find_my_site_button').setAttribute('type','button');
            //document.getElementById("ires").addEventListener("DOMSubtreeModified", search_page, true);
        }
        else
        {
            existingButton.parentNode.appendChild(findButton); //regular search, on main search page
            document.getElementById('find_my_site_button').addEventListener('click',find_my_site,true);
        }
    }
    catch (e) { existingButton.parentNode.appendChild(findButton); document.getElementById('find_my_site_button').addEventListener('click',find_my_site,true); } //regular search, on main search page
}

search_page();

//functions
function find_my_site(e)
{
    var searchbox = document.evaluate("//input[@name='q']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    var search = searchbox.snapshotItem(0).value;
    if (search == "")
    {
        searchbox.snapshotItem(0).value = prompt("Enter search phrase:");
        search = searchbox.snapshotItem(0).value;
    }
    if (searchbox.value == "")
    {
        alert("Please enter a search term.");
        return false;
    }
    var site = prompt("Enter domain to search for (do not include http:// or www.):",GM_getValue('domain',''))
    if (site == "")
    {
        alert("Domain cannot be blank");
        return false;
    }
    if (site.indexOf('https://') == 0)
        site = site.substring(8);
    if (site.indexOf('http://') == 0)
        site = site.substring(7);
    if (site.indexOf('www.') == 0)
        site = site.substring(4);
    GM_setValue('domain',site);
    var maxtries = prompt("Enter the maximum number of pages to look through:",GM_getValue('maxtries','20'));
    GM_setValue('maxtries',maxtries);
    GM_setValue('searching',search);
    GM_setValue('page',1);
}

function search_page()
{
    if (GM_getValue("searching","false") == "false")
        return;
    var cites = document.evaluate("//cite", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    for (var i = 0; i < cites.snapshotLength; i++) {
        if (cites.snapshotItem(i).textContent.indexOf(GM_getValue('domain')) != -1)
        {
            var rank = (cites.snapshotLength * (GM_getValue('page') - 1)) + i + 1;
            alert(GM_getValue('domain') + ' was found as result #' + (i + 1) + ' on page ' + GM_getValue('page') + ' of the Google search for "' + GM_getValue('searching') + '", giving it an overall rank of ' + rank + ' for that search.');
            GM_setValue('searching','false');
            document.getElementById('find_my_site_button').setAttribute('value','Find My Site!');
            try { cites.snapshotItem(i).parentNode.parentNode.previousElementSibling.previousElementSibling.setAttribute('style','background: none repeat scroll 0 0 #EBF2FC; border: 1px solid #CDDCF9;'); } //vspi highlight box.
            catch (err) { cites.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.previousElementSibling.setAttribute('style','background: none repeat scroll 0 0 #EBF2FC; border: 1px solid #CDDCF9;'); } //vspi hightlight box for video results.
            return;
        }
    }
    if ( GM_getValue('page') < GM_getValue('maxtries') && GM_getValue('page') < 101 )
    {
        GM_setValue('page',GM_getValue('page',100) + 1);
        window.location = document.getElementById('pnnext').href;
    }
    else
    {
        document.getElementById('find_my_site_button').setAttribute('value','Find My Site!');
        alert('Sorry, ' + GM_getValue('domain') + ' was not found within the first ' + GM_getValue('maxtries') + ' pages of search results for "' + GM_getValue('searching') + '".');
        GM_setValue('searching','false');
    }
}

function instant_warning()
{
    if ( confirm('This version of Find My Site doesn\'t work with Google Instant. Click OK to turn Google Instant off.') )
        window.location.href = 'http://www.google.com/preferences#suggon';
    else
        return false;
}
