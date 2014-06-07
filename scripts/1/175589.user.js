// ==UserScript==
// @name                HIT Export for mturkforum.com
// @author              Chet Manley
// @version             0.1.2
// @description         HIT Export for mturkforum.com
// @include             https://www.mturk.com/mturk/findhits*
// @include             https://www.mturk.com/mturk/preview*
// @include             https://www.mturk.com/mturk/searchbar*
// @include             https://www.mturk.com/mturk/sorthits*
// @include             https://www.mturk.com/mturk/sortsearchbar*
// @include             https://www.mturk.com/mturk/viewhits*
// @include             https://www.mturk.com/mturk/viewsearchbar*
// @require             http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

// v0.1.2, 2013-08-12   Updated short timer from 15 to 20 minutes.
//                      ---------------------------------------------------------------------------
// v0.1.1, 2013-08-12   Updated with userscripts.org URL.
//                      ---------------------------------------------------------------------------
// v0.1, 2013-08-11     Basic HIT export.
//                      ---------------------------------------------------------------------------

$(document).ready(function () {
    var mturkHome = 'https://www.mturk.com';
    var toHome = 'http://turkopticon.differenceengines.com/';
    var template = new Array();

    var i = 0;
    $('a[id^="capsule"]').each(function () {
        var title = $('#capsule' + i + '-0');
        var titleText = title.text().trim();

        var requester = $('#requester\\.tooltip--' + i + '').parent().parent().children('td.capsule_field_text').children();
        var requesterName = requester.text().trim();
        var requesterLink = requester.attr('href');
        var requesterID = requesterLink.split('requesterId=')[1];

        var description = $('#capsule' + i + 'target td.capsule_field_text').first();
        var descriptionText = description.text().trim();

        var timeAllotted = $('#duration_to_complete\\.tooltip--' + i + '').parent().parent().children('td.capsule_field_text');
        var timeAllottedText = timeAllotted.text().trim();
        var timeAllottedArray = timeAllottedText.split(' ');
        if(timeAllottedArray[1] == 'minutes' && timeAllottedArray[0] <= 20) {
            timeAllottedText += ' [u](short timer)[/u]';
        }

        var reward = $('#reward\\.tooltip--' + i + '').parent().parent().children('td.capsule_field_text').children();
        var rewardText = reward.text().trim();

        var link = title.parent().parent().children().last().children().last().children().last();
        var linkText = (link.attr('href')) ? link.attr('href').trim() : '';
        var acceptLinkText = linkText.replace('preview', 'previewandaccept');
        var linkTextPrompt = (linkText.length > 0) ? '[url=' + mturkHome + linkText + '][color=#eb0505]View this HIT[/color][/url]' : 'Preview not available due to qualifications';
        var linkTextPrompt = '[b]' + linkTextPrompt + '[/b]';

        var qualifications = $('#qualificationsRequired\\.tooltip--' + i + '').parent().parent().parent().children();
        var qualificationsText = '';
        qualifications.each(function () {
            var qual = $(this).children('tr td').first().text().trim();
            if (qual == 'Qualifications Required:') {
                return true;
            }
            qualificationsText += '\r\n' + qual + ', ';
            qualificationsText = qualificationsText.replace(/[\n\r\t]/g, '');
        });
        qualificationsText = qualificationsText.substr(0, qualificationsText.length - 2);
        qualificationsText = (qualificationsText.length > 0) ? qualificationsText : 'None';
        var qualificationsArray = qualificationsText.split(', ');
        var qualificationsString = '';
        for (var j = 0; j < qualificationsArray.length; j++) {
            qualificationsString += '\r\n' + qualificationsArray[j];
        }

        template[i] = '[b]Title:[/b] ' + titleText
            + '\r\n[b]Requester:[/b] [url=' + mturkHome + requesterLink + '][color=#eb0505]' + requesterName + '[/color][/url] [' + requesterID + '] [[url=' + toHome + requesterID + '][color=#eb0505]TO[/color][/url]]'
            + '\r\n[b]Description:[/b] ' + descriptionText
            + '\r\n[b]Timer:[/b] ' + timeAllottedText
            + '\r\n[b]Reward:[/b] ' + rewardText
            + '\r\n[b]Qualifications:[/b] ' + qualificationsText
            + '\r\n\r\n' + linkTextPrompt
            + '\r\n[right][size="1"][url=https://userscripts.org/scripts/show/175589][color=#eb0505]Grab this script and help me test it.[/color][/url][/size][/right]';

        $(this).parent().append('<button id="showExport_' + i + '" style="border: none; padding: 0; margin: 0 0 0 10px; background: none; font-size: inherit; color: #eb0505; cursor: pointer;">[Export]</button>');
        i++;
    });

    $('button[id^="showExport_"]').click(function() {
        var id = $(this).attr('id');
        var index = id[id.length-1];
        var templatePrompt = prompt('Press Ctrl+C to copy and press Enter.', template[index]);
    });
});