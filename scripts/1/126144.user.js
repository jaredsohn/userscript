// ==UserScript==
// @name AmberCutie Forums Thanks Tracker
// @version	0.3.2
// @description	Detects thank you sincerity for AmberCutie thank yous! Now with Ingrate Count!
// @include	http://www.ambercutie.com/forums*
// ==/UserScript==
if (0 === window.location.href.indexOf('http://www.ambercutie.com/forums/viewforum.php')) {
    var acfThreads = localStorage['acfThreads'] ? JSON.parse(localStorage['acfThreads']) : {};

    var tableRows = document.querySelectorAll('tr');
    for (var i = 0; i < tableRows.length; i++) {
        var subj = tableRows[i].querySelector('a.topictitle');
        if (subj) {
            var topic = subj.innerHTML;
            var views = tableRows[i].querySelector('td:nth-child(5) p').innerHTML;
            acfThreads[topic] = views;
        }
    }
    localStorage['acfThreads'] = JSON.stringify(acfThreads);
}


if (0 === window.location.href.indexOf('http://www.ambercutie.com/forums/viewtopic.php')) {

    var acfThreads = localStorage['acfThreads'] ? JSON.parse(localStorage['acfThreads']) : {};
    var topic = document.querySelector('div#pageheader a.titles').innerHTML;

    var posts = document.querySelectorAll('td.profile');
    for (var i = 0; i < posts.length; i++) {
        var thanksNotes = posts[i].parentNode.querySelectorAll('.viewtopic_thanks dd a.username-coloured');
        for (var j = 0; j < thanksNotes.length; j++) {
            var sincerityComment;
            var sincerity = Math.floor(Math.random() * 3) + 1;
            switch (sincerity) {
                case 1:
                    sincerityComment = 'Sincere. Yay!';
                    break;

                case 2:
                    sincerityComment = 'Sarcasm. Boo!';
                    break;

                case 3:
                    sincerityComment = 'Oops. Meh.';
                    break;
            }
            sincerityComment = " (" + sincerityComment + ")";
            thanksNotes[j].innerHTML = thanksNotes[j].innerHTML + sincerityComment;
        }
        var details = posts[i].querySelector('span.postdetails');
        if (details) {
            //add ingrate count
            var ingrateCount = acfThreads[topic] ? (acfThreads[topic] - thanksNotes.length) : "I got confused.";
            details.innerHTML = details.innerHTML + "<dd><strong>IngrateCount: </strong>" + ingrateCount + "</dd>";
        }

    }
}

function dateDiffInDays(date1, date2) {
    return (date1 - date2) / 1000 / 60 / 60 / 24;
}
function roundNumber(number, digits) {
    var multiple = Math.pow(10, digits);
    var rndedNum = Math.round(number * multiple) / multiple;
    return rndedNum;
}
