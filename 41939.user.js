// ==UserScript==
// @name           ARTE+7 Download Links
// @namespace      http://userscripts.org/users/80029
// @description    Adds download link for videos for ARTE+7 site.
// @version        0.4
// @include        http://plus7.arte.tv/fr/detailPage/*
// @include        http://plus7.arte.tv/de/detailPage/*
// ==/UserScript==


function GetFriendlyDesctiption(Format, Quality, Labels)
{
    if ( Quality == 'HQ' )
    {
        return Format + Labels['HQ'];
    }
    if ( Quality == 'MQ' )
    {
        return Format + Labels['MQ'];
    }

    return document.getElementById('pref_' + Format + '_' + Quality).textContent;
}

function CompareFormats(Left, Right)
{
    if ( Left.format > Right.format )
    {
        return -1;
    }
    if ( Left.format < Right.format )
    {
        return 1;
    }

    if ( Left.quality < Right.quality )
    {
        return -1;
    }
    if ( Left.quality > Right.quality )
    {
        return 1;
    }
}

function InsertDownloadLinks(AvailableFormats, CurrentsLabels, Count)
{
    var ScriptName = 'ARTE+7 Download Links';
    var LocationInsertBeffore = document.getElementById('noter');
    if ( !LocationInsertBeffore )
    {
        if ( Count >= 30 )
        {
            alert(ScriptName + CurrentsLabels['Error']);

            return;
        }

        // let's try again a bit later
        setTimeout(function(){InsertDownloadLinks(AvailableFormats, CurrentsLabels, Count + 1);}, 200);

        return;
    }
    LocationInsertBeffore = LocationInsertBeffore.firstChild;

    var NewElement = document.createElement('div');
    NewElement.setAttribute('style', 'background-color:#5D0911 ; text-align: left ; margin: -10px 0pt 10pt 0px ; padding:0 10px 10px 10px ;');
    NewElement.innerHTML += '<h4 style="background-color:#5D0911" >' + CurrentsLabels['Title'] + '</h4>';

    AvailableFormats.forEach(function(Format)
    {
        NewElement.innerHTML += '<a style="font-size:1.1em ; font-weight:bold ; color:#fd7d10 ; " href="'
            + Format.url.replace(".wmv", ".asx") + '">'
            + GetFriendlyDesctiption(Format.format, Format.quality, CurrentsLabels) + '</a><br/>';
    });

    LocationInsertBeffore.parentNode.insertBefore(NewElement, LocationInsertBeffore);
}

function AddLabel(Labels, Id, Fr, De)
{
    Labels['fr'][Id] = Fr;
    Labels['de'][Id] = De;
}

function Main()
{
    var Labels = new Object();
    Labels['de'] = new Object();
    Labels['fr'] = new Object();
    AddLabel(Labels, 'HQ', ' bonne qualité', ' good quality');
    AddLabel(Labels, 'MQ', ' basse qualité', ' low quality');
    AddLabel(Labels, 'Title', 'Liens directs', 'Directs Links');
    AddLabel(Labels, 'Error', ' ne peut fonctionner', " can't work");

    var AvailableFormats = unsafeWindow.availableFormats;
    AvailableFormats.sort(CompareFormats)

    InsertDownloadLinks(AvailableFormats, Labels[unsafeWindow.locale], 0);
}

Main();
