// ==UserScript==
// @name           FanFiction.Net - Extended Functionality.
// @author         Sean Davies
// @version        3.32
// @description    Remove Menu rollover effect, filter stories by various criteria such as characters, word count, category or keywords. Highlight various character's, both good and bad.
// @include        http://*.fanfiction.net/*
// @include        https://*.fanfiction.net/*
// ==/UserScript==

///////////////////////////////////////---SETTINGS---///////////////////////////////////////////////////////

// Settings:
// Enabled - 1
// Disabled - 0

// Remove story containing specified characters and/or character pairing.
var storyRemove = "1";

// Highlight storys containing specified characters.
var charHighlight = "1";

// Remove stories with specified catergory.
var catRemove = "0";

// Only display stories above a specified word count.
var wordCount = "0";

// Only display stories that don't contain certain words.
var wordRemove = "0";

// Remove Share options.
var shareRemove = "1";

// Characters and/or character pair stories to remove.
var removeChars = ['Draco M.','Ginny W.', 'Bellatrix L.', 'Severus S.', 'Voldemort', 'Tom R. Jr.', 'Cho C.', 'Bella', 'Lucius M.'];

// Characters to highlight in green.
var goodChars = ['Harry P.','Fawkes', 'Edward', 'Jasper', 'Hermione G.', 'Sirius B.', 'Dean T.', 'Seamus F.', 'Blaise Z.','Luna L.', 'Jacob', 'Ron W.', 'Cedric D.']

// Characters to highlight in red.
var badChars = ['Draco M.','Ginny W.', 'Bellatrix L.', 'Bella', 'Severus S.', 'Voldemort', 'Tom R. Jr.', 'Cho C.'];

// Story Catergorys To Remove
var removeCat = ['Romance'];

// Lowest word count to display stories (Numbers only).
var lowWordCount = 10000;

// Remove stories whose summary contains any of the following words (words must be lowercase).
var remWords = ['slash', 'mpreg'];

// Keep stories whose summary contains any of the following words (words must be lowercase).
var keepWords = ['no slash'];

///////////////////////////////////////---END SETTINGS---///////////////////////////////////////////////////////

var data = document.getElementsByTagName('div');

if(storyRemove == "1")
{
    for (i = 0; i < removeChars.length; i++)
    {
        for(j = 0; j < data.length; j++)
        {
            if (data[j].className == "z-padtop2 xgray")
            {
                var remChar = removeChars[i].replace("&", "&amp;");

                if(data[j].innerHTML.match(remChar))
                {
                    var div = data[j].parentNode;
                    div = div.parentNode;
                    div.style.display = 'none';
                }
            }
        }
    }
}

if(charHighlight == "1")
{
    for (i = 0; i < goodChars.length; i++) {
        for(j = 0; j < data.length; j++) {
            if (data[j].className == "z-padtop2 xgray"){
                if(data[j].innerHTML.match(goodChars[i])) {
                    var html = data[j].innerHTML;

                    html = html.replace(goodChars[i], "<span style=\"color:green; font-weight: bold;\">" + goodChars[i] + "</span>");

                    data[j].innerHTML = html;
                }
            }
        }
    }

    for (i = 0; i < badChars.length; i++) {
        for(j = 0; j < data.length; j++) {
            if (data[j].className == "z-padtop2 xgray"){
                if(data[j].innerHTML.match(badChars[i])) {
                    var html = data[j].innerHTML;

                    html = html.replace(badChars[i], "<span style=\"color:red; font-weight: bold;\">" + badChars[i] + "</span>");

                    data[j].innerHTML = html;
                }
            }
        }
    }
}

if(catRemove == "1")
{
    for (i = 0; i < removeCat.length; i++)
    {
        for(j = 0; j < data.length; j++)
        {
            if (data[j].className == "z-padtop2 xgray")
            {
                if(data[j].innerHTML.match(removeCat[i]))
                {
                    var div = data[j].parentNode;
                    div = div.parentNode;
                    div.style.display = 'none';
                }
            }
        }
    }
}

if(wordCount == "1")
{
    for(i = 0; i < data.length; i++)
    {
        if (data[i].className == "z-padtop2 xgray")
        {
            var html = data[i].innerHTML;
            var text = html.split("Words: ");
            var txt = text[1].split("-");
            var count = txt[0].replace(",", "");

            if(count < lowWordCount)
            {
                var div = data[i].parentNode;
                div = div.parentNode;
                div.style.display = 'none';
            }
        }
    }
}

if(wordRemove == "1")
{
    for (i = 0; i < remWords.length; i++)
    {
        for(j = 0; j < data.length; j++)
        {
            if (data[j].className == "z-indent z-padtop")
            {
                var dat = data[j].innerHTML.toLowerCase();

                if(dat.match(keepWords[i]))
                {
                    next;
                }
                else if(dat.match(remWords[i]))
                {
                    var div = data[j].parentNode;
                    div.style.display = 'none';
                }
            }
        }
    }
}

if(shareRemove == "1")
{

	for(i = 0; i < data.length; i++)
	{
		if (data[i].className == "a2a_kit a2a_default_style")
		{
				var div = data[i];
				div.style.display = 'none';
		}
	}
}

//Script update checker from http://userscripts.org/scripts/review/20145
var SUC_script_num = 73219;
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
